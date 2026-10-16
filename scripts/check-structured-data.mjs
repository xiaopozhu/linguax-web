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
