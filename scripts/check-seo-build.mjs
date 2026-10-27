import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import {loadFacts} from './product-facts-lib.mjs';

const root = process.cwd();
const build = path.join(root, 'build');
const facts = await loadFacts(root);
const errors = [];
const pages = new Map();
const decode = (text) => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"');
const attributes = (tag) => Object.fromEntries(
  [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), decode(value)]),
);

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else if (entry.name.endsWith('.html')) files.push(file);
  }
  return files;
}

for (const file of await walk(build)) {
  const html = await readFile(file, 'utf8');
  const relative = path.relative(build, file).split(path.sep).join('/');
  if (relative.endsWith('404.html')) continue;
  const pathname = `/${relative.replace(/(?:^|\/)index\.html$/, '/').replace(/\.html$/, '')}`.replace(/\/+/g, '/');
  const url = new URL(pathname, facts.urls.home).href;
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const canonical = links.filter((link) => link.rel === 'canonical');
  if (canonical.length !== 1) errors.push(`${relative}: expected one canonical URL`);
  if (!meta.some((item) => item.name === 'description' && item.content?.trim())) {
    errors.push(`${relative}: missing description`);
  }
  const page = {
    relative, canonical: canonical[0]?.href,
    alternates: links.filter((link) => link.hreflang),
    noindex: meta.some((item) => item.name === 'robots' && /noindex/.test(item.content)),
  };
  pages.set(url, page);
}

for (const [url, page] of pages) {
  if (!pages.has(page.canonical)) errors.push(`${page.relative}: canonical target does not exist: ${page.canonical}`);
  for (const alternate of page.alternates) {
    const target = pages.get(alternate.href);
    if (!target || target.canonical !== alternate.href) {
      errors.push(`${page.relative}: hreflang ${alternate.hreflang} points to a missing/fallback URL: ${alternate.href}`);
    }
    if (target && !target.alternates.some((back) => back.href === page.canonical)) {
      errors.push(`${page.relative}: hreflang does not link back to ${page.canonical}`);
    }
  }
  if (url !== page.canonical && page.noindex) {
    errors.push(`${page.relative}: fallback canonical must not conflict with noindex`);
  }
}

const robots = await readFile(path.join(build, 'robots.txt'), 'utf8');
let sitemapEntries = 0;
for (const locale of Object.values(facts.locales)) {
  const prefix = locale.path ? `${locale.path}/` : '';
  const sitemapUrl = new URL(`${prefix}sitemap.xml`, facts.urls.home).href;
  if (!robots.includes(`Sitemap: ${sitemapUrl}`)) errors.push(`robots.txt: missing ${sitemapUrl}`);
  const sitemap = await readFile(path.join(build, prefix, 'sitemap.xml'), 'utf8');
  for (const [, value] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = decode(value);
    const page = pages.get(url);
    sitemapEntries++;
    if (!page || page.canonical !== url || page.noindex) {
      errors.push(`${prefix}sitemap.xml: includes missing, noncanonical or noindex URL ${url}`);
    }
  }
}
const publicFacts = JSON.parse(await readFile(path.join(build, 'product-facts.json'), 'utf8'));
if (JSON.stringify(publicFacts) !== JSON.stringify(facts)) errors.push('built product-facts.json is stale');
const llms = await readFile(path.join(build, 'llms.txt'), 'utf8');
if (!llms.includes(facts.product.currentRelease.version) || !llms.includes(facts.privacy.aixTransfer)) {
  errors.push('built llms.txt is missing current release/privacy facts');
}

if (errors.length) {
  for (const error of errors) console.error(`[seo] ${error}`);
  process.exitCode = 1;
} else {
  console.log(`[seo] ${pages.size} HTML pages, ${sitemapEntries} sitemap URLs, all locale alternates and product artifacts agree`);
}
