# Product Facts and Entity Graph Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish one canonical machine-readable LinguaX fact source, generate consistent AI-discovery artifacts from it, and emit a connected JSON-LD entity graph that is verified in final production HTML.

**Architecture:** Keep editable public facts in `data/public-product-facts.json`. Dependency-free Node scripts validate that source, generate the public JSON and the marked facts section in `llms.txt`, and inspect every built JSON-LD block. React imports the same facts and emits one core `@graph` per landing page with locale-aware URLs and stable entity identifiers.

**Tech Stack:** Node.js ESM, built-in `node:test`, React 19, TypeScript 5.6, Docusaurus 3.8.1, Schema.org JSON-LD

---

## File Map

- Create `data/public-product-facts.json`: the editable source for public product, publisher, commercial, compatibility, privacy, locale, and canonical-URL facts.
- Create `scripts/product-facts-lib.mjs`: fact validation plus deterministic public JSON and `llms.txt` rendering.
- Create `scripts/test-product-facts.mjs`: unit tests for validation and deterministic artifact generation.
- Create `scripts/generate-product-artifacts.mjs`: generate the committed public artifacts from the source.
- Create `scripts/check-product-facts.mjs`: fail on stale artifacts or disagreement with changelog and `PRODUCT_FACTS.md`.
- Create `static/product-facts.json`: generated public artifact served at `/product-facts.json`.
- Modify `static/llms.txt`: surround the canonical fact summary with generated markers.
- Create `scripts/structured-data-lib.mjs`: parse and validate built JSON-LD and the required core graph.
- Create `scripts/test-structured-data.mjs`: fixture tests for graph completeness, entity references, versions, offers, locale URLs, and malformed JSON-LD.
- Create `scripts/check-structured-data.mjs`: validate every production JSON-LD script and the core landing-page graph for every locale.
- Modify `src/components/StructuredData/StructuredData.tsx`: emit one connected core `@graph` from the fact source.
- Modify `src/components/StructuredData/FaqSchema.tsx`: connect FAQ pages to the stable website and software identifiers.
- Modify `src/components/StructuredData/HowToSchema.tsx`: connect HowTo pages to the stable website and software identifiers.
- Modify `src/pages/pricing.tsx`: connect the inline pricing FAQ to the same identifiers.
- Modify `tsconfig.json`: allow typed JSON imports.
- Modify `package.json`: expose generation/check commands and enforce fact checks before builds and schema checks after builds.

### Task 1: Define and validate the canonical public fact model

**Files:**
- Create: `data/public-product-facts.json`
- Create: `scripts/product-facts-lib.mjs`
- Create: `scripts/test-product-facts.mjs`

- [ ] **Step 1: Create the canonical fact source**

Create `data/public-product-facts.json` with the approved public fields and current verified values:

```json
{
  "schemaVersion": 1,
  "lastVerified": "2026-10-16",
  "product": {
    "name": "LinguaX",
    "description": "A native macOS utility for mouse enhancement, push-to-talk voice input, and automatic input-source switching by app and website.",
    "applicationCategory": "UtilitiesApplication",
    "applicationSubCategory": "Mouse Enhancement and Input Automation Utility",
    "currentRelease": {
      "version": "2025.12.6016",
      "date": "2026-10-13"
    },
    "operatingSystem": {
      "name": "macOS",
      "minimumVersion": "13",
      "architectures": ["Apple Silicon", "Intel"]
    },
    "features": [
      "Smooth scrolling for third-party mice",
      "Mouse gesture and side-button mapping",
      "App-scoped mouse behavior overrides",
      "Push-to-talk voice typing through the macOS Fn or Globe key",
      "Automatic input-source switching by app and website domain",
      "Shortcut action mapping"
    ]
  },
  "publisher": {
    "name": "Ermulin Studio",
    "url": "https://linguax.app/",
    "logo": "https://linguax.app/img/ermulin.svg",
    "email": "hello@linguax.app",
    "sameAs": [
      "https://github.com/xiaopozhu",
      "https://x.com/deepzz02",
      "https://mastodon.social/@deepzz",
      "https://bsky.app/profile/linguax.app"
    ]
  },
  "offers": {
    "trial": {
      "name": "30-day full-feature trial",
      "price": 0,
      "currency": "USD",
      "durationDays": 30,
      "accountRequired": false
    },
    "lifetime": {
      "name": "Lifetime License",
      "price": 9.9,
      "currency": "USD",
      "devices": 3,
      "subscription": false
    }
  },
  "compatibility": {
    "mouseBaseline": "Basic mouse features work with any USB or Bluetooth mouse without a driver.",
    "enhancedModelCount": 23,
    "domainRuleBrowsers": ["Safari", "Chrome", "Edge", "Brave", "Opera"],
    "unsupportedDomainRuleBrowsers": ["Firefox"]
  },
  "privacy": {
    "accountRequired": false,
    "behavioralTelemetry": false,
    "coreProcessing": "Core mouse enhancement and input-source switching run locally.",
    "aixTransfer": "AIx sends user-submitted text only when the user invokes an AI action and consents to the transfer.",
    "networkServices": "Downloads, updates, and license validation use network services.",
    "optionalSync": "Configuration can sync through iCloud when the user enables iCloud for LinguaX."
  },
  "urls": {
    "home": "https://linguax.app/",
    "download": "https://linguax.app/download",
    "pricing": "https://linguax.app/pricing",
    "documentation": "https://linguax.app/docs/intro",
    "changelog": "https://linguax.app/docs/reference/changelog",
    "privacy": "https://linguax.app/terms/privacy-policy/",
    "terms": "https://linguax.app/terms/service-agreement/",
    "aixTerms": "https://linguax.app/terms/aix-service-addendum/",
    "screenshot": "https://linguax.app/img/linguax-mouse-gesture-mapping.png",
    "facts": "https://linguax.app/product-facts.json"
  },
  "locales": {
    "en": {"path": "", "language": "en"},
    "zh-Hans": {"path": "zh-Hans", "language": "zh-CN"},
    "zh-Hant": {"path": "zh-Hant", "language": "zh-TW"},
    "ja": {"path": "ja", "language": "ja"},
    "ko": {"path": "ko", "language": "ko"},
    "de": {"path": "de", "language": "de"},
    "fr": {"path": "fr", "language": "fr"},
    "ru": {"path": "ru", "language": "ru"},
    "id": {"path": "id", "language": "id"}
  }
}
```

- [ ] **Step 2: Write failing validator and renderer tests**

Create `scripts/test-product-facts.mjs`. Import the fact JSON with `readFile`, import the library functions that do not exist yet, and test exact failures and deterministic output:

```js
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {
  GENERATED_END,
  GENERATED_START,
  renderLlmsFacts,
  renderPublicFacts,
  replaceGeneratedSection,
  validateFacts,
} from './product-facts-lib.mjs';

const facts = JSON.parse(await readFile('data/public-product-facts.json', 'utf8'));

test('accepts the canonical public facts', () => {
  assert.doesNotThrow(() => validateFacts(facts));
});

test('reports the exact path of a missing required fact', () => {
  const invalid = structuredClone(facts);
  delete invalid.publisher.name;
  assert.throws(() => validateFacts(invalid), /publisher\.name/);
});

test('rejects invalid URLs, dates, and commercial values', () => {
  const invalid = structuredClone(facts);
  invalid.urls.download = '/download';
  invalid.lastVerified = '16-10-2026';
  invalid.offers.lifetime.price = -1;
  assert.throws(
    () => validateFacts(invalid),
    /urls\.download.*lastVerified.*offers\.lifetime\.price/s,
  );
});

test('renders stable public JSON', () => {
  const rendered = renderPublicFacts(facts);
  assert.equal(rendered, `${JSON.stringify(facts, null, 2)}\n`);
});

test('replaces only the generated llms facts section', () => {
  const source = `before\n${GENERATED_START}\nstale\n${GENERATED_END}\nafter\n`;
  const result = replaceGeneratedSection(source, renderLlmsFacts(facts));
  assert.match(result, /^before\n/);
  assert.match(result, /Current release: 2025\.12\.6016/);
  assert.match(result, /after\n$/);
  assert.doesNotMatch(result, /stale/);
});
```

- [ ] **Step 3: Run the tests and verify RED**

Run:

```bash
rtk node --test scripts/test-product-facts.mjs
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/product-facts-lib.mjs`.

- [ ] **Step 4: Implement the validation and deterministic renderers**

Create `scripts/product-facts-lib.mjs` with these exported interfaces:

```js
import {readFile} from 'node:fs/promises';
import path from 'node:path';

export const GENERATED_START = '<!-- BEGIN GENERATED PRODUCT FACTS -->';
export const GENERATED_END = '<!-- END GENERATED PRODUCT FACTS -->';

function get(value, dottedPath) {
  return dottedPath.split('.').reduce((current, key) => current?.[key], value);
}

export function validateFacts(facts) {
  const errors = [];
  const required = [
    'schemaVersion', 'lastVerified', 'product.name', 'product.description',
    'product.currentRelease.version', 'product.currentRelease.date',
    'product.operatingSystem.minimumVersion', 'publisher.name', 'publisher.url',
    'publisher.logo', 'publisher.email', 'offers.trial.durationDays',
    'offers.lifetime.price', 'offers.lifetime.currency', 'offers.lifetime.devices',
    'privacy.coreProcessing', 'privacy.aixTransfer', 'privacy.networkServices',
    'privacy.optionalSync', 'urls.home', 'urls.download', 'urls.pricing',
    'urls.documentation', 'urls.changelog', 'urls.privacy', 'urls.terms',
    'urls.aixTerms', 'urls.screenshot', 'urls.facts', 'locales.en.language',
  ];
  for (const field of required) {
    const value = get(facts, field);
    if (value === undefined || value === null || value === '') errors.push(`${field} is required`);
  }
  for (const [key, value] of Object.entries(facts.urls ?? {})) {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:') throw new Error();
    } catch {
      errors.push(`urls.${key} must be an absolute HTTPS URL`);
    }
  }
  for (const field of ['lastVerified', 'product.currentRelease.date']) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(get(facts, field) ?? '')) errors.push(`${field} must use YYYY-MM-DD`);
  }
  if (!(facts.offers?.trial?.durationDays > 0)) errors.push('offers.trial.durationDays must be positive');
  if (!(facts.offers?.lifetime?.price >= 0)) errors.push('offers.lifetime.price must not be negative');
  if (!(facts.offers?.lifetime?.devices > 0)) errors.push('offers.lifetime.devices must be positive');
  if (!Array.isArray(facts.product?.features) || facts.product.features.length === 0) {
    errors.push('product.features must contain at least one feature');
  }
  if (errors.length) throw new Error(errors.join('\n'));
  return facts;
}

export async function loadFacts(root = process.cwd()) {
  const raw = await readFile(path.join(root, 'data/public-product-facts.json'), 'utf8');
  return validateFacts(JSON.parse(raw));
}

export function renderPublicFacts(facts) {
  return `${JSON.stringify(validateFacts(facts), null, 2)}\n`;
}

export function renderLlmsFacts(facts) {
  validateFacts(facts);
  const {product, offers, privacy, urls, lastVerified} = facts;
  return [
    GENERATED_START,
    `> ${product.description}`,
    '',
    `- Current release: ${product.currentRelease.version} (${product.currentRelease.date})`,
    `- Platform: ${product.operatingSystem.name} ${product.operatingSystem.minimumVersion}+ (${product.operatingSystem.architectures.join(' and ')})`,
    `- Pricing: ${offers.trial.durationDays}-day full-feature trial, then $${offers.lifetime.price} ${offers.lifetime.currency} one-time for ${offers.lifetime.devices} devices; no subscription`,
    `- Local processing: ${privacy.coreProcessing}`,
    `- AIx: ${privacy.aixTransfer}`,
    `- Network services: ${privacy.networkServices}`,
    `- Optional sync: ${privacy.optionalSync}`,
    `- Machine-readable facts: ${urls.facts}`,
    `- Last verified: ${lastVerified}`,
    GENERATED_END,
  ].join('\n');
}

export function replaceGeneratedSection(source, generated) {
  const start = source.indexOf(GENERATED_START);
  const end = source.indexOf(GENERATED_END);
  if (start < 0 || end < start) throw new Error('static/llms.txt is missing generated fact markers');
  return `${source.slice(0, start)}${generated}${source.slice(end + GENERATED_END.length)}`;
}
```

- [ ] **Step 5: Run the tests and verify GREEN**

Run:

```bash
rtk node --test scripts/test-product-facts.mjs
```

Expected: 5 tests pass, 0 fail.

- [ ] **Step 6: Commit the fact model and library**

```bash
rtk git add data/public-product-facts.json scripts/product-facts-lib.mjs scripts/test-product-facts.mjs
rtk git commit -m "feat: define public product facts"
```

### Task 2: Generate public facts and protect against drift

**Files:**
- Create: `scripts/generate-product-artifacts.mjs`
- Create: `scripts/check-product-facts.mjs`
- Create: `static/product-facts.json`
- Modify: `static/llms.txt`
- Modify: `scripts/test-product-facts.mjs`

- [ ] **Step 1: Add failing CLI integration tests**

Extend `scripts/test-product-facts.mjs` with a temporary repository fixture and these assertions:

```js
import {mkdtemp, mkdir, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

async function repositoryFixture({version = facts.product.currentRelease.version} = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'linguax-facts-'));
  await mkdir(path.join(root, 'data'), {recursive: true});
  await mkdir(path.join(root, 'static'), {recursive: true});
  await mkdir(path.join(root, 'docs/reference'), {recursive: true});
  await writeFile(path.join(root, 'data/public-product-facts.json'), JSON.stringify(facts, null, 2));
  await writeFile(path.join(root, 'static/llms.txt'), `${GENERATED_START}\nstale\n${GENERATED_END}\n`);
  await writeFile(path.join(root, 'docs/reference/changelog.md'), `## ${version}\n`);
  await writeFile(path.join(root, 'PRODUCT_FACTS.md'), '**30 天免费试用 + $9.9 一次性买断（3 台设备），无订阅**\n**23 款**\n');
  return root;
}

test('generator writes both public artifacts and checker accepts them', async () => {
  const root = await repositoryFixture();
  const generated = spawnSync(process.execPath, ['scripts/generate-product-artifacts.mjs', '--root', root], {encoding: 'utf8'});
  assert.equal(generated.status, 0, generated.stderr);
  const checked = spawnSync(process.execPath, ['scripts/check-product-facts.mjs', '--root', root], {encoding: 'utf8'});
  assert.equal(checked.status, 0, checked.stderr);
});

test('checker rejects stale artifacts and changelog drift', async () => {
  const root = await repositoryFixture({version: '2025.12.0000'});
  const checked = spawnSync(process.execPath, ['scripts/check-product-facts.mjs', '--root', root], {encoding: 'utf8'});
  assert.equal(checked.status, 1);
  assert.match(checked.stderr, /static\/product-facts\.json is stale or missing/);
  assert.match(checked.stderr, /changelog version 2025\.12\.0000/);
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run `rtk node --test scripts/test-product-facts.mjs`.

Expected: the two new tests fail because the generator and checker CLIs do not exist.

- [ ] **Step 3: Mark the generated section in `llms.txt`**

Replace the introductory block after `# LinguaX` and before `## Product` with:

```md
<!-- BEGIN GENERATED PRODUCT FACTS -->
> LinguaX is a native macOS utility for mouse enhancement, push-to-talk voice input, and automatic input-source switching by app and website.

- Current release: 2025.12.6016 (2026-10-13)
- Platform: macOS 13+ (Apple Silicon and Intel)
- Pricing: 30-day full-feature trial, then $9.9 USD one-time for 3 devices; no subscription
- Local processing: Core mouse enhancement and input-source switching run locally.
- AIx: AIx sends user-submitted text only when the user invokes an AI action and consents to the transfer.
- Network services: Downloads, updates, and license validation use network services.
- Optional sync: Configuration can sync through iCloud when the user enables iCloud for LinguaX.
- Machine-readable facts: https://linguax.app/product-facts.json
- Last verified: 2026-10-16
<!-- END GENERATED PRODUCT FACTS -->

```

Keep every curated resource and external-reference section after that marker unchanged.

- [ ] **Step 4: Implement the generator CLI**

Create `scripts/generate-product-artifacts.mjs`:

```js
#!/usr/bin/env node
import {mkdir, readFile, rename, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {loadFacts, renderLlmsFacts, renderPublicFacts, replaceGeneratedSection} from './product-facts-lib.mjs';

function parseRoot(argv) {
  const index = argv.indexOf('--root');
  return path.resolve(index >= 0 ? argv[index + 1] : '.');
}

const root = parseRoot(process.argv.slice(2));
const facts = await loadFacts(root);
const staticDirectory = path.join(root, 'static');
const factsPath = path.join(staticDirectory, 'product-facts.json');
const llmsPath = path.join(staticDirectory, 'llms.txt');
const currentLlms = await readFile(llmsPath, 'utf8');
const nextFacts = renderPublicFacts(facts);
const nextLlms = replaceGeneratedSection(currentLlms, renderLlmsFacts(facts));
await mkdir(staticDirectory, {recursive: true});
await writeFile(`${factsPath}.tmp`, nextFacts, 'utf8');
await writeFile(`${llmsPath}.tmp`, nextLlms, 'utf8');
await rename(`${factsPath}.tmp`, factsPath);
await rename(`${llmsPath}.tmp`, llmsPath);
console.log('[product-facts] generated static/product-facts.json and static/llms.txt');
```

- [ ] **Step 5: Implement the drift checker CLI**

Create `scripts/check-product-facts.mjs`. It must accumulate every problem before exiting:

```js
#!/usr/bin/env node
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {loadFacts, renderLlmsFacts, renderPublicFacts, replaceGeneratedSection} from './product-facts-lib.mjs';

function parseRoot(argv) {
  const index = argv.indexOf('--root');
  return path.resolve(index >= 0 ? argv[index + 1] : '.');
}

async function readOrEmpty(file) {
  try { return await readFile(file, 'utf8'); } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

const root = parseRoot(process.argv.slice(2));
const facts = await loadFacts(root);
const errors = [];
const publicFacts = await readOrEmpty(path.join(root, 'static/product-facts.json'));
if (publicFacts !== renderPublicFacts(facts)) errors.push('static/product-facts.json is stale or missing');
const llms = await readOrEmpty(path.join(root, 'static/llms.txt'));
if (!llms) {
  errors.push('static/llms.txt is missing');
} else if (replaceGeneratedSection(llms, renderLlmsFacts(facts)) !== llms) {
  errors.push('static/llms.txt generated product facts are stale');
}
const changelog = await readFile(path.join(root, 'docs/reference/changelog.md'), 'utf8');
const changelogVersion = changelog.match(/^##\s+(\d[\w.-]+)\s*$/m)?.[1];
if (changelogVersion !== facts.product.currentRelease.version) {
  errors.push(`changelog version ${changelogVersion ?? '<missing>'} does not match ${facts.product.currentRelease.version}`);
}
const humanFacts = await readFile(path.join(root, 'PRODUCT_FACTS.md'), 'utf8');
const commercial = `**${facts.offers.trial.durationDays} 天免费试用 + $${facts.offers.lifetime.price} 一次性买断（${facts.offers.lifetime.devices} 台设备），无订阅**`;
if (!humanFacts.includes(commercial)) errors.push('PRODUCT_FACTS.md commercial facts do not match the public fact source');
if (!humanFacts.includes(`**${facts.compatibility.enhancedModelCount} 款**`)) {
  errors.push('PRODUCT_FACTS.md enhanced model count does not match the public fact source');
}
if (errors.length) {
  for (const error of errors) console.error(`[product-facts] ${error}`);
  process.exitCode = 1;
} else {
  console.log('[product-facts] source, public artifacts, changelog, and PRODUCT_FACTS.md agree');
}
```

- [ ] **Step 6: Generate the real public artifacts and rerun tests**

Run:

```bash
rtk node scripts/generate-product-artifacts.mjs
rtk node --test scripts/test-product-facts.mjs
rtk node scripts/check-product-facts.mjs
```

Expected: generated files are updated, 7 tests pass, and the checker reports agreement.

- [ ] **Step 7: Commit the public artifact pipeline**

```bash
rtk git add scripts/generate-product-artifacts.mjs scripts/check-product-facts.mjs scripts/test-product-facts.mjs static/product-facts.json static/llms.txt
rtk git commit -m "feat: generate public GEO product facts"
```

### Task 3: Add a final-HTML structured-data validator

**Files:**
- Create: `scripts/structured-data-lib.mjs`
- Create: `scripts/test-structured-data.mjs`
- Create: `scripts/check-structured-data.mjs`

- [ ] **Step 1: Write failing fixture tests**

Create `scripts/test-structured-data.mjs` with helpers that write `index.html`, `pricing.html`, and `download.html` for all fact-source locales. Cover these cases:

```js
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {validateBuild} from './structured-data-lib.mjs';

const facts = JSON.parse(await (await import('node:fs/promises')).readFile('data/public-product-facts.json', 'utf8'));

function coreGraph(pageUrl, language, pageName, route) {
  const organizationId = `${facts.urls.home}#organization`;
  const websiteId = `${facts.urls.home}#website`;
  const softwareId = `${facts.urls.home}#software`;
  const page = {
    '@type': 'WebPage', '@id': `${pageUrl}#webpage`, url: pageUrl,
    name: pageName, inLanguage: language, isPartOf: {'@id': websiteId},
    about: {'@id': softwareId},
  };
  const graph = [
    {'@type': 'Organization', '@id': organizationId, name: facts.publisher.name},
    {'@type': 'WebSite', '@id': websiteId, publisher: {'@id': organizationId}},
    {
      '@type': 'SoftwareApplication', '@id': softwareId,
      softwareVersion: facts.product.currentRelease.version,
      publisher: {'@id': organizationId},
      offers: Object.values(facts.offers).map((offer) => ({price: String(offer.price), priceCurrency: offer.currency})),
    },
    page,
  ];
  if (route !== '/') {
    page.breadcrumb = {'@id': `${pageUrl}#breadcrumb`};
    graph.push({'@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: []});
  }
  return {'@context': 'https://schema.org', '@graph': graph};
}

function html(schema, language = 'en') {
  return `<html lang="${language}"><head><script type="application/ld+json">${JSON.stringify(schema)}</script></head></html>`;
}

async function buildFixture(transform = (schema) => schema) {
  const root = await mkdtemp(path.join(tmpdir(), 'linguax-schema-'));
  for (const locale of Object.values(facts.locales)) {
    for (const [route, file, name] of [['/', 'index.html', 'Home'], ['/pricing', 'pricing.html', 'Pricing'], ['/download', 'download.html', 'Download']]) {
      const prefix = locale.path ? `/${locale.path}` : '';
      const pageUrl = new URL(`${prefix}${route}`, facts.urls.home).href;
      const target = path.join(root, 'build', locale.path, file);
      await mkdir(path.dirname(target), {recursive: true});
      await writeFile(target, html(transform(coreGraph(pageUrl, locale.language, name, route), {route, locale}), locale.language));
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
  await writeFile(path.join(root, 'build/broken.html'), '<script type="application/ld+json">{bad}</script>');
  assert.match((await validateBuild(root, facts)).join('\n'), /build\/broken\.html.*invalid JSON-LD/);
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run `rtk node --test scripts/test-structured-data.mjs`.

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/structured-data-lib.mjs`.

- [ ] **Step 3: Implement recursive HTML parsing and graph validation**

Create `scripts/structured-data-lib.mjs` with:

```js
import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';

async function htmlFiles(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(target));
    else if (entry.name.endsWith('.html')) files.push(target);
  }
  return files;
}

export function parseJsonLd(html, relativePath) {
  const schemas = [];
  const pattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const [index, match] of [...html.matchAll(pattern)].entries()) {
    try { schemas.push(JSON.parse(match[1])); }
    catch (error) { throw new Error(`${relativePath} script ${index + 1}: invalid JSON-LD: ${error.message}`); }
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
  const nodes = Object.fromEntries(Object.keys(expected).map((type) => [type, graph.filter((node) => node['@type'] === type)]));
  for (const [type, id] of Object.entries(expected)) {
    if (nodes[type].length !== 1) errors.push(`${relativePath}: expected exactly one ${type}`);
    else if (nodes[type][0]['@id'] !== id) errors.push(`${relativePath}: ${type} must use @id ${id}`);
  }
  const software = nodes.SoftwareApplication[0];
  if (software && software.softwareVersion !== facts.product.currentRelease.version) {
    errors.push(`${relativePath}: softwareVersion must be ${facts.product.currentRelease.version}`);
  }
  const expectedOffers = Object.values(facts.offers).map((offer) => `${offer.currency}:${offer.price}`).sort();
  const observedOffers = (software?.offers ?? []).map((offer) => `${offer.priceCurrency}:${offer.price}`).sort();
  if (software && JSON.stringify(observedOffers) !== JSON.stringify(expectedOffers)) {
    errors.push(`${relativePath}: SoftwareApplication offers do not match public facts`);
  }
  const page = nodes.WebPage[0];
  if (page && page.url !== expectedUrl) errors.push(`${relativePath}: localized page URL must be ${expectedUrl}`);
  if (page && page.inLanguage !== language) errors.push(`${relativePath}: inLanguage must be ${language}`);
  if (page && page.isPartOf?.['@id'] !== expected.WebSite) errors.push(`${relativePath}: WebPage must reference WebSite`);
  if (page && page.about?.['@id'] !== expected.SoftwareApplication && page?.mainEntity?.['@id'] !== expected.SoftwareApplication) {
    errors.push(`${relativePath}: WebPage must reference SoftwareApplication`);
  }
  const identifiers = new Set(graph.map((node) => node['@id']).filter(Boolean));
  for (const [owner, reference] of [
    ['WebSite.publisher', nodes.WebSite[0]?.publisher?.['@id']],
    ['SoftwareApplication.publisher', software?.publisher?.['@id']],
    ['WebPage.isPartOf', page?.isPartOf?.['@id']],
    ['WebPage subject', page?.about?.['@id'] ?? page?.mainEntity?.['@id']],
  ]) {
    if (reference && !identifiers.has(reference)) errors.push(`${relativePath}: ${owner} references missing ${reference}`);
  }
  const breadcrumbs = graph.filter((node) => node['@type'] === 'BreadcrumbList');
  if (route === '/' && breadcrumbs.length !== 0) errors.push(`${relativePath}: homepage must not contain BreadcrumbList`);
  if (route !== '/') {
    const breadcrumbId = `${expectedUrl}#breadcrumb`;
    if (breadcrumbs.length !== 1 || breadcrumbs[0]['@id'] !== breadcrumbId) {
      errors.push(`${relativePath}: expected one BreadcrumbList with @id ${breadcrumbId}`);
    }
    if (page?.breadcrumb?.['@id'] !== breadcrumbId) errors.push(`${relativePath}: WebPage must reference BreadcrumbList`);
  }
  return errors;
}

export async function validateBuild(root, facts) {
  const build = path.join(root, 'build');
  const errors = [];
  for (const file of await htmlFiles(build)) {
    const relativePath = path.relative(root, file).split(path.sep).join('/');
    try { parseJsonLd(await readFile(file, 'utf8'), relativePath); }
    catch (error) { errors.push(error.message); }
  }
  for (const locale of Object.values(facts.locales)) {
    for (const [route, file] of [['/', 'index.html'], ['/pricing', 'pricing.html'], ['/download', 'download.html']]) {
      const relativePath = path.join('build', locale.path, file).split(path.sep).join('/');
      const html = await readFile(path.join(root, relativePath), 'utf8');
      const schemas = parseJsonLd(html, relativePath);
      const core = schemas.find((schema) => Array.isArray(schema?.['@graph']));
      errors.push(...validateCoreGraph(core, facts, expectedPage(facts, locale, route), locale.language, route, relativePath));
    }
  }
  return errors;
}
```

- [ ] **Step 4: Implement the repository CLI**

Create `scripts/check-structured-data.mjs`:

```js
#!/usr/bin/env node
import path from 'node:path';
import {loadFacts} from './product-facts-lib.mjs';
import {validateBuild} from './structured-data-lib.mjs';

const rootIndex = process.argv.indexOf('--root');
const root = path.resolve(rootIndex >= 0 ? process.argv[rootIndex + 1] : '.');
const errors = await validateBuild(root, await loadFacts(root));
if (errors.length) {
  for (const error of errors) console.error(`[structured-data] ${error}`);
  process.exitCode = 1;
} else {
  console.log('[structured-data] all JSON-LD and core entity graphs are valid');
}
```

- [ ] **Step 5: Run fixture tests and verify GREEN**

Run `rtk node --test scripts/test-structured-data.mjs`.

Expected: 3 tests pass, 0 fail.

- [ ] **Step 6: Run the checker against the baseline build and verify the intended failure**

Run `rtk node scripts/check-structured-data.mjs`.

Expected: exit 1; homepage, pricing, and download pages report missing core `@graph`. This proves the checker detects the production Head-deduplication problem.

- [ ] **Step 7: Commit the final-HTML validator**

```bash
rtk git add scripts/structured-data-lib.mjs scripts/test-structured-data.mjs scripts/check-structured-data.mjs
rtk git commit -m "test: validate built GEO entity graphs"
```

### Task 4: Emit one locale-aware connected entity graph

**Files:**
- Modify: `src/components/StructuredData/StructuredData.tsx`
- Modify: `src/components/StructuredData/FaqSchema.tsx`
- Modify: `src/components/StructuredData/HowToSchema.tsx`
- Modify: `src/pages/pricing.tsx`
- Modify: `tsconfig.json`

- [ ] **Step 1: Enable typed JSON imports**

Add `"resolveJsonModule": true` to `compilerOptions` in `tsconfig.json`.

- [ ] **Step 2: Replace the disconnected scripts with one core `@graph`**

Replace `src/components/StructuredData/StructuredData.tsx` with this complete implementation:

```tsx
import React from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import facts from '@site/data/public-product-facts.json';

interface StructuredDataProps {
  type?: 'website' | 'product';
  pagePath?: string;
  pageName?: string;
}

export default function StructuredData({
  type = 'website',
  pagePath = '/',
  pageName = 'LinguaX',
}: StructuredDataProps): React.ReactElement {
  const {siteConfig, i18n} = useDocusaurusContext();
  const pageUrl = new URL(useBaseUrl(pagePath), siteConfig.url).href;
  const localizedHomeUrl = useBaseUrl('/', {absolute: true});
  const locale = i18n.currentLocale as keyof typeof facts.locales;
  const language = facts.locales[locale]?.language ?? i18n.currentLocale;
  const organizationId = `${facts.urls.home}#organization`;
  const websiteId = `${facts.urls.home}#website`;
  const softwareId = `${facts.urls.home}#software`;
  const pageId = `${pageUrl}#webpage`;

  const organization = {
    '@type': 'Organization',
    '@id': organizationId,
    name: facts.publisher.name,
    url: facts.publisher.url,
    logo: {'@type': 'ImageObject', url: facts.publisher.logo},
    sameAs: facts.publisher.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      email: facts.publisher.email,
      contactType: 'Customer Support',
    },
  };
  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    name: facts.product.name,
    url: facts.urls.home,
    publisher: {'@id': organizationId},
    inLanguage: Object.values(facts.locales).map(({language: localeLanguage}) => localeLanguage),
  };
  const software = {
    '@type': 'SoftwareApplication',
    '@id': softwareId,
    name: facts.product.name,
    description: facts.product.description,
    applicationCategory: facts.product.applicationCategory,
    applicationSubCategory: facts.product.applicationSubCategory,
    operatingSystem: `${facts.product.operatingSystem.name} ${facts.product.operatingSystem.minimumVersion}+`,
    softwareRequirements: `${facts.product.operatingSystem.name} ${facts.product.operatingSystem.minimumVersion}+; ${facts.product.operatingSystem.architectures.join(' or ')}`,
    softwareVersion: facts.product.currentRelease.version,
    dateModified: facts.product.currentRelease.date,
    url: facts.urls.home,
    downloadUrl: facts.urls.download,
    softwareHelp: facts.urls.documentation,
    screenshot: facts.urls.screenshot,
    image: facts.urls.screenshot,
    featureList: facts.product.features,
    publisher: {'@id': organizationId},
    offers: [
      {
        '@type': 'Offer',
        name: facts.offers.trial.name,
        price: String(facts.offers.trial.price),
        priceCurrency: facts.offers.trial.currency,
        description: `${facts.offers.trial.durationDays}-day full-feature trial; no account required`,
        url: facts.urls.download,
      },
      {
        '@type': 'Offer',
        name: facts.offers.lifetime.name,
        price: String(facts.offers.lifetime.price),
        priceCurrency: facts.offers.lifetime.currency,
        description: `One-time license for up to ${facts.offers.lifetime.devices} devices; no subscription`,
        url: facts.urls.pricing,
      },
    ],
  };
  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': pageId,
    url: pageUrl,
    name: pageName,
    inLanguage: language,
    isPartOf: {'@id': websiteId},
    dateModified: facts.lastVerified,
    ...(type === 'product'
      ? {mainEntity: {'@id': softwareId}}
      : {about: {'@id': softwareId}}),
  };
  const graph: Array<Record<string, unknown>> = [organization, website, software, webPage];
  if (pagePath !== '/') {
    const breadcrumbId = `${pageUrl}#breadcrumb`;
    webPage.breadcrumb = {'@id': breadcrumbId};
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Home', item: localizedHomeUrl},
        {'@type': 'ListItem', position: 2, name: pageName, item: pageUrl},
      ],
    });
  }

  return (
    <Head>
      <script id="linguax-core-entity-graph" type="application/ld+json">
        {JSON.stringify({'@context': 'https://schema.org', '@graph': graph})}
      </script>
    </Head>
  );
}
```

- [ ] **Step 3: Connect reusable page schemas to the stable entities**

In both `FaqSchema.tsx` and `HowToSchema.tsx`, add:

```ts
isPartOf: {'@id': 'https://linguax.app/#website'},
about: {'@id': 'https://linguax.app/#software'},
```

to the top-level schema. Add the same two properties to `pricingFaqSchema` in `src/pages/pricing.tsx`. Do not change questions, answers, steps, or visible copy.

- [ ] **Step 4: Run typecheck and build**

Run:

```bash
rtk npm run typecheck
rtk npm run build
```

Expected: both pass for all nine locales.

- [ ] **Step 5: Validate final production HTML**

Run:

```bash
rtk node scripts/check-structured-data.mjs
```

Expected: `[structured-data] all JSON-LD and core entity graphs are valid`.

Inspect the homepage directly:

```bash
rtk node -e "const fs=require('fs');const h=fs.readFileSync('build/index.html','utf8');const m=h.match(/<script[^>]*id=\"linguax-core-entity-graph\"[^>]*>([\\s\\S]*?)<\\/script>/);const j=JSON.parse(m[1]);console.log(j['@graph'].map(x=>[x['@type'],x['@id']]));"
```

Expected: one each of Organization, WebSite, SoftwareApplication, and WebPage with stable identifiers.

- [ ] **Step 6: Commit the connected graph**

```bash
rtk git add tsconfig.json src/components/StructuredData/StructuredData.tsx src/components/StructuredData/FaqSchema.tsx src/components/StructuredData/HowToSchema.tsx src/pages/pricing.tsx
rtk git commit -m "feat: publish connected LinguaX entity graph"
```

### Task 5: Integrate generation and validation into project workflows

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add lifecycle and verification scripts**

Add these scripts to `package.json`:

```json
"generate:product-artifacts": "node scripts/generate-product-artifacts.mjs",
"check:product-facts": "node scripts/check-product-facts.mjs",
"test:product-facts": "node --test scripts/test-product-facts.mjs",
"test:structured-data": "node --test scripts/test-structured-data.mjs",
"check:structured-data": "node scripts/check-structured-data.mjs",
"test:geo-entities": "npm run test:product-facts && npm run check:product-facts && npm run test:structured-data",
"prestart": "npm run generate:product-artifacts",
"prebuild": "npm run check:product-facts",
"postbuild": "npm run check:structured-data"
```

Keep the existing `build` and `start` commands unchanged so npm lifecycle hooks run automatically.

- [ ] **Step 2: Prove stale generated artifacts block production builds**

Temporarily change only `lastVerified` in `data/public-product-facts.json`, then run:

```bash
rtk npm run check:product-facts
```

Expected: FAIL with stale `static/product-facts.json` and `static/llms.txt` diagnostics.

Restore the source change with `apply_patch`; do not use `git checkout` because unrelated user work must be preserved.

- [ ] **Step 3: Run the aggregate entity tests**

Run:

```bash
rtk npm run test:geo-entities
```

Expected: all product-fact and structured-data fixture tests pass, and committed artifacts are current.

- [ ] **Step 4: Run the production build through lifecycle hooks**

Run:

```bash
rtk npm run build
```

Expected: `prebuild` confirms fact consistency, all nine locales build, and `postbuild` confirms every JSON-LD block plus every core graph.

- [ ] **Step 5: Commit workflow integration**

```bash
rtk git add package.json
rtk git commit -m "chore: enforce GEO entity validation in builds"
```

### Task 6: Full verification and review

**Files:**
- Review all files changed in Tasks 1–5.

- [ ] **Step 1: Run targeted GEO and content checks**

```bash
rtk npm run test:geo-entities
rtk npm run test:geo-consistency
rtk npm run test:model-pages
rtk npm run test:redirects
```

Expected: all pass.

- [ ] **Step 2: Run existing docs-page checks and compare with baseline**

Run:

```bash
rtk npm run test:docs-pages
```

Expected: only the three accepted pre-existing description-length failures remain:

- `comparisons/bettertouchtool-alternative-for-mouse-mac.md`
- `comparisons/steermouse-alternative-mac.md`
- `comparisons/usb-overdrive-alternative-mac.md`

Any additional failure is a regression and must be fixed before proceeding.

- [ ] **Step 3: Run final compiler and production checks**

```bash
rtk npm run typecheck
rtk npm run build
rtk git diff --check
```

Expected: typecheck, all nine locale builds, final structured-data validation, and whitespace validation pass.

- [ ] **Step 4: Verify the public artifacts in the build**

Run:

```bash
rtk cmp static/product-facts.json build/product-facts.json
rtk cmp static/llms.txt build/llms.txt
```

Expected: both commands exit 0.

- [ ] **Step 5: Review scope and generated output**

Run:

```bash
rtk git status --short
rtk git diff --stat master...HEAD
rtk git diff master...HEAD
```

Confirm there are no visual, pricing, download-flow, multilingual-indexing, dependency, or unrelated content changes.

- [ ] **Step 6: Request code review**

Use `superpowers:requesting-code-review` against the merge base and current `HEAD`. Address every Critical and Important issue, then rerun the affected checks.

- [ ] **Step 7: Finish the feature branch**

Use `superpowers:finishing-a-development-branch` to present merge, PR, keep, or discard options after all scoped verification passes.
