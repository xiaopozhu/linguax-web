#!/usr/bin/env node
/**
 * 从 linguax-app 的型号识别列表同步出 web 站点用的兼容性数据。
 *
 *   node scripts/sync-mouse-database.mjs           # 生成 src/data/mouse-compatibility.json
 *   node scripts/sync-mouse-database.mjs --check   # 只校验,不写文件(CI 用)
 *
 * app 仓库路径由 LINGUAX_APP_PATH 指定,默认取同级目录的 ../linguax-app。
 *
 * 为什么生成物要入 git:构建机上没有 app 仓库。这个脚本只在 app 的识别列表变动时
 * 手工跑一次,生成的 JSON 是站点的唯一数据源。
 *
 * ⚠️ 只输出可从源码核实的字段。DPI / SmartShift 支持**不在**其中 —— 那是运行时
 * 探测的能力,型号层面不存在权威答案,页面上也不能列成"是/否"。
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..');

const APP_PATH = process.env.LINGUAX_APP_PATH || join(REPO, '..', 'linguax-app');
const SOURCE = join(APP_PATH, 'LinguaX', 'Resources', 'MouseDatabase.json');
const DEST = join(REPO, 'src', 'data', 'mouse-compatibility.json');
const MODELS_DIR = join(REPO, 'docs', 'mouse-plus', 'models');

const CHECK_ONLY = process.argv.includes('--check');

/**
 * 槽位的固定展示顺序 —— 按物理位置排(侧键 → 拇指 → 滚轮相关 → 顶部环)。
 * 表格按这个顺序对齐每一行,于是每个型号的槽位构型成为一枚可横向对比的"指纹"。
 */
const SLOT_ORDER = ['S1', 'S2', 'S3', 'S4', 'T', 'M', 'SM', 'WL', 'WR', 'AR'];

/**
 * 型号名 → docs/mouse-plus/models/ 下的文件 slug。
 * 不做模糊匹配:文件名和型号名的对应关系并不规则(Lift → logitech-lift),
 * 猜错会生成死链。这里显式维护,并在下面校验目标文件确实存在。
 */
const GUIDE_SLUGS = {
  'MX Master 4': 'mx-master-4',
  'MX Master 3S': 'mx-master-3s',
  'MX Master 3': 'mx-master-3',
  'MX Anywhere 3S': 'mx-anywhere-3s',
  'MX Anywhere 3': 'mx-anywhere-3',
  Lift: 'logitech-lift',
};

const fail = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

if (!existsSync(SOURCE)) {
  fail(
    `找不到 app 的型号数据:${SOURCE}\n` +
      `  用 LINGUAX_APP_PATH 指定 linguax-app 仓库位置,例如:\n` +
      `  LINGUAX_APP_PATH=/path/to/linguax-app node scripts/sync-mouse-database.mjs`,
  );
}

const raw = JSON.parse(readFileSync(SOURCE, 'utf8'));
if (!Array.isArray(raw.devices) || raw.devices.length === 0) {
  fail('源数据里没有 devices 数组');
}

// ---------- 提炼 ----------

const devices = raw.devices.map((d) => {
  const configurable = d.buttons.filter((b) => b.configurable);
  const named = configurable.map((b) => b.slot).filter(Boolean);
  const unknown = named.filter((s) => !SLOT_ORDER.includes(s));
  if (unknown.length) {
    fail(`${d.model} 出现未知槽位代号 ${unknown.join(', ')} —— 请先更新 SLOT_ORDER`);
  }
  return {
    brand: d.brand,
    model: d.model,
    vid: d.vendorIDHex,
    pid: d.productIDHex,
    slots: SLOT_ORDER.filter((s) => named.includes(s)), // 按固定顺序归一化
    // G502 系列有若干 configurable 但 slot 为 null 的按键,如实计数而不是假装不存在
    unnamed: configurable.length - named.length,
    total: configurable.length,
    guide: GUIDE_SLUGS[d.model] ? `/docs/mouse-plus/models/${GUIDE_SLUGS[d.model]}` : null,
  };
});

// ---------- 校验 ----------

// 落地页链接必须真的存在,否则 onBrokenLinks: throw 会让构建失败
const availableSlugs = new Set(
  readdirSync(MODELS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, '')),
);
for (const [model, slug] of Object.entries(GUIDE_SLUGS)) {
  if (!availableSlugs.has(slug)) {
    fail(`GUIDE_SLUGS 里 ${model} 指向 ${slug}.md,但该文件不存在于 docs/mouse-plus/models/`);
  }
}

// 型号数变动时提醒同步三处文案 —— 这三处曾长期互不一致(25+ / 20+ / 约20)
const EXPECTED_COUNT = 23;
if (devices.length !== EXPECTED_COUNT) {
  console.warn(
    `⚠️  型号数由 ${EXPECTED_COUNT} 变为 ${devices.length}。请同步更新:\n` +
      `   - docs/mouse-plus/device-compatibility.md(标题、正文、表格)\n` +
      `   - PRODUCT_FACTS.md §8\n` +
      `   - README.md 兼容性一节\n` +
      `   确认后把本脚本里的 EXPECTED_COUNT 改成 ${devices.length}。`,
  );
}

// ---------- 排序 ----------

// Logitech 是数据主体,放前面;同品牌内按型号名
const BRAND_RANK = { Logitech: 0, Microsoft: 1, Razer: 2, Apple: 3 };
devices.sort((a, b) => {
  const r = (BRAND_RANK[a.brand] ?? 9) - (BRAND_RANK[b.brand] ?? 9);
  return r !== 0 ? r : a.model.localeCompare(b.model, 'en');
});

const payload = {
  $comment:
    '由 scripts/sync-mouse-database.mjs 从 linguax-app 的 MouseDatabase.json 生成,请勿手工编辑。',
  modelCount: devices.length,
  slotOrder: SLOT_ORDER,
  devices,
};

const serialized = `${JSON.stringify(payload, null, 2)}\n`;

// ---------- 输出 ----------

if (CHECK_ONLY) {
  if (!existsSync(DEST)) fail(`${DEST} 不存在,请先不带 --check 跑一次`);
  if (readFileSync(DEST, 'utf8') !== serialized) {
    fail('src/data/mouse-compatibility.json 与 app 的型号数据不一致,请重新跑同步脚本');
  }
  console.log(`✓ 数据一致(${devices.length} 款型号)`);
  process.exit(0);
}

writeFileSync(DEST, serialized);

const withGuide = devices.filter((d) => d.guide).length;
const noSlots = devices.filter((d) => d.total === 0);
const withUnnamed = devices.filter((d) => d.unnamed > 0);

console.log(`✓ 写入 ${DEST}`);
console.log(`  ${devices.length} 款型号,其中 ${withGuide} 款有落地页`);
console.log(`  无可映射槽位:${noSlots.map((d) => d.model).join(', ') || '无'}`);
console.log(
  `  含未命名槽位:${withUnnamed.map((d) => `${d.model}(+${d.unnamed})`).join(', ') || '无'}`,
);
