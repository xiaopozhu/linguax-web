#!/usr/bin/env node
// 全站文档页验收：frontmatter 完整性（title / description / keywords）
// 标准来源：docs/superpowers/specs/2026-07-15-docs-site-standards.md §1
// 型号页的更强约束由 check-model-pages.mjs 单独负责

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = join(__dirname, '..', 'docs');
const DESC_MAX = 160;

const failures = [];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === 'superpowers') continue; // 内部规划文档不参与
      out.push(...walk(p));
    } else if (name.endsWith('.md') && !name.startsWith('_')) {
      out.push(p);
    }
  }
  return out;
}

function checkFile(p) {
  const rel = relative(DOCS_DIR, p);
  const raw = readFileSync(p, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) {
    failures.push(`[FAIL] ${rel}: 缺少 frontmatter`);
    return;
  }
  const fm = m[1];

  if (!/^title:/m.test(fm)) failures.push(`[FAIL] ${rel}: 缺少 title`);

  const desc = fm.match(/^description:\s*["']?(.*?)["']?\s*$/m);
  if (!desc) {
    failures.push(`[FAIL] ${rel}: 缺少 description`);
  } else if (desc[1].length > DESC_MAX) {
    failures.push(`[FAIL] ${rel}: description 长度 ${desc[1].length} > ${DESC_MAX}`);
  }

  if (!/^keywords:/m.test(fm)) failures.push(`[FAIL] ${rel}: 缺少 keywords`);
}

const files = walk(DOCS_DIR);
console.log(`[check-docs-pages] 校验 ${files.length} 个文档页...`);
for (const f of files) checkFile(f);

if (failures.length > 0) {
  console.error(`\n${failures.length} 处不合规：`);
  for (const f of failures) console.error(f);
  process.exit(1);
}
console.log(`[ok] 全部 ${files.length} 个文档页 frontmatter 完整`);
