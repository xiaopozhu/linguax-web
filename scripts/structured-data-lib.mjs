import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';

async function htmlFiles(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await htmlFiles(target));
    } else if (entry.name.endsWith('.html')) {
      files.push(target);
    }
  }
  return files;
}

export function parseJsonLd(html, relativePath) {
  const schemas = [];
  const pattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const [index, match] of [...html.matchAll(pattern)].entries()) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch (error) {
      throw new Error(
        `${relativePath} script ${index + 1}: invalid JSON-LD: ${error.message}`,
      );
    }
  }
  return schemas;
}

function expectedPage(facts, locale, route) {
  const prefix = locale.path ? `/${locale.path}` : '';
  return new URL(`${prefix}${route}`, facts.urls.home).href;
}

function validateCoreGraph(schema, facts, expectedUrl, language, route, relativePath) {
  const errors = [];
  const graph = schema?.['@graph'];
  if (!Array.isArray(graph)) return [`${relativePath}: missing core @graph`];

  const expected = {
    Organization: `${facts.urls.home}#organization`,
    WebSite: `${facts.urls.home}#website`,
    SoftwareApplication: `${facts.urls.home}#software`,
    WebPage: `${expectedUrl}#webpage`,
  };
  const nodes = Object.fromEntries(
    Object.keys(expected).map((type) => [
      type,
      graph.filter((node) => node['@type'] === type),
    ]),
  );

  for (const [type, id] of Object.entries(expected)) {
    if (nodes[type].length !== 1) {
      errors.push(`${relativePath}: expected exactly one ${type}`);
    } else if (nodes[type][0]['@id'] !== id) {
      errors.push(`${relativePath}: ${type} must use @id ${id}`);
    }
  }

  const software = nodes.SoftwareApplication[0];
  if (software && software.softwareVersion !== facts.product.currentRelease.version) {
    errors.push(
      `${relativePath}: softwareVersion must be ${facts.product.currentRelease.version}`,
    );
  }
  const expectedOffers = Object.values(facts.offers)
    .map((offer) => `${offer.currency}:${offer.price}`)
    .sort();
  const observedOffers = (software?.offers ?? [])
    .map((offer) => `${offer.priceCurrency}:${offer.price}`)
    .sort();
  if (software && JSON.stringify(observedOffers) !== JSON.stringify(expectedOffers)) {
    errors.push(`${relativePath}: SoftwareApplication offers do not match public facts`);
  }

  const page = nodes.WebPage[0];
  if (page && page.url !== expectedUrl) {
    errors.push(`${relativePath}: localized page URL must be ${expectedUrl}`);
  }
  if (page && page.inLanguage !== language) {
    errors.push(`${relativePath}: inLanguage must be ${language}`);
  }
  if (page && page.isPartOf?.['@id'] !== expected.WebSite) {
    errors.push(`${relativePath}: WebPage must reference WebSite`);
  }
  if (
    page
    && page.about?.['@id'] !== expected.SoftwareApplication
    && page.mainEntity?.['@id'] !== expected.SoftwareApplication
  ) {
    errors.push(`${relativePath}: WebPage must reference SoftwareApplication`);
  }

  const identifiers = new Set(graph.map((node) => node['@id']).filter(Boolean));
  for (const [owner, reference] of [
    ['WebSite.publisher', nodes.WebSite[0]?.publisher?.['@id']],
    ['SoftwareApplication.publisher', software?.publisher?.['@id']],
    ['WebPage.isPartOf', page?.isPartOf?.['@id']],
    ['WebPage subject', page?.about?.['@id'] ?? page?.mainEntity?.['@id']],
  ]) {
    if (reference && !identifiers.has(reference)) {
      errors.push(`${relativePath}: ${owner} references missing ${reference}`);
    }
  }

  const breadcrumbs = graph.filter((node) => node['@type'] === 'BreadcrumbList');
  if (route === '/' && breadcrumbs.length !== 0) {
    errors.push(`${relativePath}: homepage must not contain BreadcrumbList`);
  }
  if (route !== '/') {
    const breadcrumbId = `${expectedUrl}#breadcrumb`;
    if (breadcrumbs.length !== 1 || breadcrumbs[0]['@id'] !== breadcrumbId) {
      errors.push(
        `${relativePath}: expected one BreadcrumbList with @id ${breadcrumbId}`,
      );
    }
    if (page?.breadcrumb?.['@id'] !== breadcrumbId) {
      errors.push(`${relativePath}: WebPage must reference BreadcrumbList`);
    }
  }
  return errors;
}

export async function validateBuild(root, facts) {
  const build = path.join(root, 'build');
  const errors = [];
  for (const file of await htmlFiles(build)) {
    const relativePath = path.relative(root, file).split(path.sep).join('/');
    try {
      parseJsonLd(await readFile(file, 'utf8'), relativePath);
    } catch (error) {
      errors.push(error.message);
    }
  }

  for (const locale of Object.values(facts.locales)) {
    for (const [route, file] of [
      ['/', 'index.html'],
      ['/pricing', 'pricing.html'],
      ['/download', 'download.html'],
    ]) {
      const relativePath = path.join('build', locale.path, file).split(path.sep).join('/');
      const html = await readFile(path.join(root, relativePath), 'utf8');
      const schemas = parseJsonLd(html, relativePath);
      const core = schemas.find((schema) => Array.isArray(schema?.['@graph']));
      errors.push(...validateCoreGraph(
        core,
        facts,
        expectedPage(facts, locale, route),
        locale.language,
        route,
        relativePath,
      ));
    }
  }
  return errors;
}
