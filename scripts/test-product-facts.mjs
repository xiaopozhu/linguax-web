import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp, mkdir, readFile, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
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

async function repositoryFixture({version = facts.product.currentRelease.version} = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'linguax-facts-'));
  await mkdir(path.join(root, 'data'), {recursive: true});
  await mkdir(path.join(root, 'static'), {recursive: true});
  await mkdir(path.join(root, 'docs/reference'), {recursive: true});
  await writeFile(
    path.join(root, 'data/public-product-facts.json'),
    JSON.stringify(facts, null, 2),
  );
  await writeFile(
    path.join(root, 'static/llms.txt'),
    `${GENERATED_START}\nstale\n${GENERATED_END}\n`,
  );
  await writeFile(path.join(root, 'docs/reference/changelog.md'), `## ${version}\n`);
  await writeFile(
    path.join(root, 'PRODUCT_FACTS.md'),
    '**30 天免费试用 + $9.9 一次性买断（3 台设备），无订阅**\n**23 款**\n',
  );
  return root;
}

test('generator writes both public artifacts and checker accepts them', async () => {
  const root = await repositoryFixture();
  const generated = spawnSync(
    process.execPath,
    ['scripts/generate-product-artifacts.mjs', '--root', root],
    {encoding: 'utf8'},
  );
  assert.equal(generated.status, 0, generated.stderr);
  const checked = spawnSync(
    process.execPath,
    ['scripts/check-product-facts.mjs', '--root', root],
    {encoding: 'utf8'},
  );
  assert.equal(checked.status, 0, checked.stderr);
});

test('checker rejects stale artifacts and changelog drift', async () => {
  const root = await repositoryFixture({version: '2025.12.0000'});
  const checked = spawnSync(
    process.execPath,
    ['scripts/check-product-facts.mjs', '--root', root],
    {encoding: 'utf8'},
  );
  assert.equal(checked.status, 1);
  assert.match(checked.stderr, /static\/product-facts\.json is stale or missing/);
  assert.match(checked.stderr, /changelog version 2025\.12\.0000/);
});
