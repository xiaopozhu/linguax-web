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
