#!/usr/bin/env node
import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const PUBLISHED_ROOTS = ['src', 'docs', 'blog', 'static', 'i18n'];
const PUBLISHED_EXTENSIONS = new Set(['.md', '.mdx', '.ts', '.tsx', '.json', '.txt']);
const RULES = [
  {
    id: 'legacy-route',
    pattern: /\/docs\/(?:releases\/changelog|use-cases\/auto-switch-input-source-app-domain-mac)/gi,
  },
  {id: 'legacy-size', pattern: /\bunder[- ]5\s*MB\b/gi},
  {
    id: 'absolute-offline-claim',
    pattern: /\b(?:nothing leaves your Mac|nothing is sent anywhere)\b/gi,
  },
];

function parseRoot(argv) {
  const index = argv.indexOf('--root');
  return path.resolve(index >= 0 ? argv[index + 1] : '.');
}

function isExcluded(relativePath) {
  return relativePath === 'docs/superpowers' || relativePath.startsWith('docs/superpowers/');
}

async function collectFiles(root, relativeDirectory) {
  const directory = path.join(root, relativeDirectory);
  let entries;
  try {
    entries = await readdir(directory, {withFileTypes: true});
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    if (isExcluded(relativePath)) continue;
    if (entry.isDirectory()) {
      files.push(...await collectFiles(root, relativePath));
    } else if (PUBLISHED_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(relativePath);
    }
  }
  return files;
}

export async function scan(root) {
  const violations = [];
  for (const sourceRoot of PUBLISHED_ROOTS) {
    for (const relativePath of await collectFiles(root, sourceRoot)) {
      const lines = (await readFile(path.join(root, relativePath), 'utf8')).split('\n');
      lines.forEach((line, lineIndex) => {
        for (const rule of RULES) {
          rule.pattern.lastIndex = 0;
          if (rule.pattern.test(line)) {
            violations.push({relativePath, line: lineIndex + 1, rule: rule.id, text: line.trim()});
          }
        }
      });
    }
  }
  return violations;
}

async function main() {
  const root = parseRoot(process.argv.slice(2));
  const violations = await scan(root);
  if (violations.length === 0) {
    console.log('[geo-consistency] no known contradictions found');
    return;
  }
  for (const violation of violations) {
    console.error(
      `${violation.relativePath}:${violation.line} [${violation.rule}] ${violation.text}`,
    );
  }
  process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
