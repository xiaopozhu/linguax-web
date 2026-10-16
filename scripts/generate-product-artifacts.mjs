#!/usr/bin/env node
import {mkdir, readFile, rename, writeFile} from 'node:fs/promises';
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
