import assert from 'node:assert/strict';
import {mkdtemp, mkdir, readFile, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {validateBuild} from './structured-data-lib.mjs';

const facts = JSON.parse(await readFile('data/public-product-facts.json', 'utf8'));

function coreGraph(pageUrl, language, pageName, route) {
  const organizationId = `${facts.urls.home}#organization`;
  const websiteId = `${facts.urls.home}#website`;
  const softwareId = `${facts.urls.home}#software`;
  const page = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageName,
    inLanguage: language,
    isPartOf: {'@id': websiteId},
    about: {'@id': softwareId},
  };
  const graph = [
    {'@type': 'Organization', '@id': organizationId, name: facts.publisher.name},
    {'@type': 'WebSite', '@id': websiteId, publisher: {'@id': organizationId}},
    {
      '@type': 'SoftwareApplication',
      '@id': softwareId,
      softwareVersion: facts.product.currentRelease.version,
      publisher: {'@id': organizationId},
      offers: Object.values(facts.offers).map((offer) => ({
        price: String(offer.price),
        priceCurrency: offer.currency,
      })),
    },
    page,
  ];
  if (route !== '/') {
    page.breadcrumb = {'@id': `${pageUrl}#breadcrumb`};
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [],
    });
  }
  return {'@context': 'https://schema.org', '@graph': graph};
}

function html(schema, language = 'en') {
  return `<html lang="${language}"><head><script type="application/ld+json">${JSON.stringify(schema)}</script></head></html>`;
}

async function buildFixture(transform = (schema) => schema) {
  const root = await mkdtemp(path.join(tmpdir(), 'linguax-schema-'));
  for (const locale of Object.values(facts.locales)) {
    for (const [route, file, name] of [
      ['/', 'index.html', 'Home'],
      ['/pricing', 'pricing.html', 'Pricing'],
      ['/download', 'download.html', 'Download'],
    ]) {
      const prefix = locale.path ? `/${locale.path}` : '';
      const pageUrl = new URL(`${prefix}${route}`, facts.urls.home).href;
      const target = path.join(root, 'build', locale.path, file);
      await mkdir(path.dirname(target), {recursive: true});
      await writeFile(
        target,
        html(transform(coreGraph(pageUrl, locale.language, name, route), {route, locale}), locale.language),
      );
    }
  }
  return root;
}

test('accepts complete core graphs for every locale landing page', async () => {
  const root = await buildFixture();
  assert.deepEqual(await validateBuild(root, facts), []);
});

test('reports missing entities, stale versions, and locale URL errors', async () => {
  const root = await buildFixture((schema, {route, locale}) => {
    if (route === '/' && locale.path === 'de') {
      schema['@graph'] = schema['@graph'].filter((node) => node['@type'] !== 'Organization');
      schema['@graph'].find((node) => node['@type'] === 'SoftwareApplication').softwareVersion = '2026';
      schema['@graph'].find((node) => node['@type'] === 'WebPage').url = facts.urls.home;
    }
    return schema;
  });
  const errors = await validateBuild(root, facts);
  assert.match(errors.join('\n'), /build\/de\/index\.html.*Organization/);
  assert.match(errors.join('\n'), /build\/de\/index\.html.*softwareVersion/);
  assert.match(errors.join('\n'), /build\/de\/index\.html.*localized page URL/);
});

test('reports malformed JSON-LD anywhere in the build', async () => {
  const root = await buildFixture();
  await writeFile(
    path.join(root, 'build/broken.html'),
    '<script type="application/ld+json">{bad}</script>',
  );
  assert.match(
    (await validateBuild(root, facts)).join('\n'),
    /build\/broken\.html.*invalid JSON-LD/,
  );
});
