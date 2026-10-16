#!/usr/bin/env node
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {
  loadFacts,
  renderLlmsFacts,
  renderPublicFacts,
  replaceGeneratedSection,
} from './product-facts-lib.mjs';

function parseRoot(argv) {
  const index = argv.indexOf('--root');
  return path.resolve(index >= 0 ? argv[index + 1] : '.');
}

async function readOrEmpty(file) {
  try {
    return await readFile(file, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

const root = parseRoot(process.argv.slice(2));
const facts = await loadFacts(root);
const errors = [];
const publicFacts = await readOrEmpty(path.join(root, 'static/product-facts.json'));
if (publicFacts !== renderPublicFacts(facts)) {
  errors.push('static/product-facts.json is stale or missing');
}

const llms = await readOrEmpty(path.join(root, 'static/llms.txt'));
if (!llms) {
  errors.push('static/llms.txt is missing');
} else if (replaceGeneratedSection(llms, renderLlmsFacts(facts)) !== llms) {
  errors.push('static/llms.txt generated product facts are stale');
}

const changelog = await readFile(path.join(root, 'docs/reference/changelog.md'), 'utf8');
const changelogVersion = changelog.match(/^##\s+(\d[\w.-]+)\s*$/m)?.[1];
if (changelogVersion !== facts.product.currentRelease.version) {
  errors.push(
    `changelog version ${changelogVersion ?? '<missing>'} does not match ${facts.product.currentRelease.version}`,
  );
}

const humanFacts = await readFile(path.join(root, 'PRODUCT_FACTS.md'), 'utf8');
const commercial = `**${facts.offers.trial.durationDays} 天免费试用 + $${facts.offers.lifetime.price} 一次性买断（${facts.offers.lifetime.devices} 台设备），无订阅**`;
if (!humanFacts.includes(commercial)) {
  errors.push('PRODUCT_FACTS.md commercial facts do not match the public fact source');
}
if (!humanFacts.includes(`**${facts.compatibility.enhancedModelCount} 款**`)) {
  errors.push('PRODUCT_FACTS.md enhanced model count does not match the public fact source');
}

if (errors.length) {
  for (const error of errors) console.error(`[product-facts] ${error}`);
  process.exitCode = 1;
} else {
  console.log('[product-facts] source, public artifacts, changelog, and PRODUCT_FACTS.md agree');
}
