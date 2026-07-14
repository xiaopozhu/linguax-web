#!/usr/bin/env node
// 型号落地页验收脚本
// 校验 docs/mouse-plus/models/*.md 满足 SEO 与结构约束
// 来源：docs/superpowers/specs/2026-07-14-mouse-model-landing-and-pairing-tool-design.md §8.1

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MODELS_DIR = join(__dirname, '..', 'docs', 'mouse-plus', 'models');

// 阈值（可在 spec 调整时统一修改）
const TITLE_MIN = 30;      // 兼容较短型号名
const TITLE_MAX = 70;
const DESC_MAX = 160;      // description 上限（Google 通常截断到 155-160）
const KEYWORDS_MIN = 3;
const WORDS_MIN = 800;
const H2_MIN = 3;
const INTERNAL_LINK_MIN = 5;

const failures = [];

function fail(file, reason) {
  failures.push(`[FAIL] ${basename(file)}: ${reason}`);
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { frontmatter: null, body: raw };
  const fm = {};
  let currentKey = null;
  let listBuffer = null;
  for (const line of m[1].split('\n')) {
    // 列表项（keywords、tags 常见）
    if (/^\s*-\s+/.test(line)) {
      if (listBuffer) listBuffer.push(line.replace(/^\s*-\s+/, '').trim());
      continue;
    }
    const kv = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    const val = kv[2];
    if (val === '' || val === '|' || val === '>') {
      // 后面是列表或多行
      listBuffer = [];
      fm[key] = listBuffer;
      currentKey = key;
    } else {
      fm[key] = val.replace(/^["']|["']$/g, '');
      listBuffer = null;
      currentKey = null;
    }
  }
  return { frontmatter: fm, body: m[2] };
}

function countWords(text) {
  // 剥掉 code fence、frontmatter 已剥、剥 JSX 组件 tag
  const cleaned = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`~>|\-]/g, ' ');
  return cleaned.split(/\s+/).filter(w => w.length > 0).length;
}

function countH2(text) {
  return (text.match(/^##\s+/gm) || []).length;
}

function countInternalLinks(text) {
  // 匹配 markdown 内部链接：./ 或 / 开头，或不含协议头
  const links = text.match(/\[[^\]]+\]\(([^)]+)\)/g) || [];
  return links.filter(l => {
    const url = l.match(/\(([^)]+)\)/)[1];
    return !/^https?:\/\//.test(url) && !url.startsWith('mailto:') && !url.startsWith('#');
  }).length;
}

function hasFaqSchema(text) {
  // 允许有 FAQPage JSON-LD，或者显式的 ## FAQ 章节（渐进式约束：先接受任一）
  // 兼容 JSON 字符串 (双引号) 与 MDX 里 JS 对象字面量 (单引号)
  const hasJsonLd = /['"]@type['"]\s*:\s*['"]FAQPage['"]/i.test(text);
  const hasFaqSection = /^##\s+(FAQ|Frequently Asked Questions)/im.test(text);
  return hasJsonLd || hasFaqSection;
}

function checkFile(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(raw);
  if (!frontmatter) {
    fail(filePath, 'missing YAML frontmatter');
    return;
  }

  // frontmatter 字段
  const title = frontmatter.title;
  if (!title) fail(filePath, 'frontmatter.title 缺失');
  else if (title.length < TITLE_MIN || title.length > TITLE_MAX)
    fail(filePath, `title 长度 ${title.length} 超出 [${TITLE_MIN}, ${TITLE_MAX}]`);

  const desc = frontmatter.description;
  if (!desc) fail(filePath, 'frontmatter.description 缺失');
  else if (desc.length > DESC_MAX)
    fail(filePath, `description 长度 ${desc.length} 超上限 ${DESC_MAX}`);

  const keywords = frontmatter.keywords;
  if (!Array.isArray(keywords) || keywords.length < KEYWORDS_MIN)
    fail(filePath, `keywords 数量 ${Array.isArray(keywords) ? keywords.length : 0} < ${KEYWORDS_MIN}`);

  if (!frontmatter.sidebar_label)
    fail(filePath, 'frontmatter.sidebar_label 缺失');

  // 正文
  const words = countWords(body);
  if (words < WORDS_MIN)
    fail(filePath, `正文词数 ${words} < ${WORDS_MIN}`);

  const h2 = countH2(body);
  if (h2 < H2_MIN)
    fail(filePath, `H2 数量 ${h2} < ${H2_MIN}`);

  const links = countInternalLinks(body);
  if (links < INTERNAL_LINK_MIN)
    fail(filePath, `内链数 ${links} < ${INTERNAL_LINK_MIN}`);

  if (!hasFaqSchema(body))
    fail(filePath, '缺少 FAQPage JSON-LD 或 ## FAQ 章节');
}

function main() {
  if (!existsSync(MODELS_DIR)) {
    console.log('[skip] models 目录不存在，无待校验文件');
    process.exit(0);
  }

  const files = readdirSync(MODELS_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'))
    .map(f => join(MODELS_DIR, f));

  if (files.length === 0) {
    console.log('[skip] models 目录为空，无待校验文件');
    process.exit(0);
  }

  console.log(`[check-model-pages] 校验 ${files.length} 个型号页...`);
  for (const f of files) checkFile(f);

  if (failures.length > 0) {
    console.error(`\n${failures.length} 处不合规：`);
    for (const m of failures) console.error(m);
    process.exit(1);
  }
  console.log(`[ok] 全部 ${files.length} 个型号页通过校验`);
}

main();
