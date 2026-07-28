#!/usr/bin/env node
// 重定向表验收。改动 worker/index.js 里的 REDIRECTS_301 / MD_SUFFIX / GONE_PATHS 后跑一次。
//
//   npm run build && npm run test:redirects
//
// 需要 build 产物:第 3、5、7 项要拿真实页面比对。
// 常量与 resolveRedirect 直接从 worker/index.js 源码 eval 出来,
// 核对的是真实生效的代码,而不是另写一份会走样的副本。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

if (!fs.existsSync(path.join(REPO, 'build'))) {
  console.error('✗ 找不到 build/,请先跑 npm run build');
  process.exit(1);
}
const src = fs.readFileSync(path.join(REPO, 'worker/index.js'), 'utf8');

const defs = src.slice(
  src.indexOf('const REDIRECTS_301'),
  src.indexOf('async function handleRequest'),
);
// eslint-disable-next-line no-eval
const M = eval(
  `${defs}; ({REDIRECTS_301, LOCALES, LOCALE_PREFIX, MD_SUFFIX, GONE_PATHS, resolveRedirect})`,
);

const froms = Object.keys(M.REDIRECTS_301);
const tos = Object.values(M.REDIRECTS_301);
let fail = 0;
const bad = (m) => {
  console.log('   ✗', m);
  fail += 1;
};
const step = (label, fn) => {
  const before = fail;
  console.log(label);
  fn();
  if (fail === before) console.log('   ✓');
};

// 本站 trailingSlash: false,产出的是 docs/intro.html 而不是 docs/intro/index.html。
// 两种形态都认,避免把真实存在的页面误判成缺失。
const pageExists = (p) => {
  const rel = p.replace(/^\//, '');
  return (
    fs.existsSync(path.join(REPO, 'build', `${rel}.html`)) ||
    fs.existsSync(path.join(REPO, 'build', rel, 'index.html'))
  );
};

console.log(`重定向表:${froms.length} 条,${new Set(tos).size} 个不同目标\n`);

step('[1] 无自指', () => {
  froms.forEach((f) => {
    if (M.REDIRECTS_301[f] === f) bad(`${f} 指向自己`);
  });
});

step('[2] 无链式重定向(目标又是另一条的来源会导致多跳)', () => {
  tos.forEach((t) => {
    if (froms.includes(t)) bad(`${t} 既是目标又是来源`);
  });
});

step('[3] 所有目标页在 build 中真实存在', () => {
  [...new Set(tos)].forEach((t) => {
    if (!pageExists(t)) bad(`目标不存在:${t}`);
  });
});

step('[4] 英文站每条 from 都能命中', () => {
  froms.forEach((f) => {
    const got = M.resolveRedirect(f);
    if (got !== M.REDIRECTS_301[f]) bad(`${f} → ${got}`);
  });
});

step(`[5] 带语言前缀时命中正确且目标存在(${froms.length}×${M.LOCALES.length} 组合)`, () => {
  M.LOCALES.forEach((loc) => {
    froms.forEach((f) => {
      const want = `/${loc}${M.REDIRECTS_301[f]}`;
      const got = M.resolveRedirect(`/${loc}${f}`);
      if (got !== want) bad(`/${loc}${f} → ${got},应为 ${want}`);
      else if (!pageExists(want)) bad(`目标缺失:${want}`);
    });
  });
});

step('[6] 三类规则互不冲突', () => {
  froms.forEach((f) => {
    if (M.MD_SUFFIX.test(f)) bad(`${f} 同时命中 .md 规则`);
    const stripped = f.replace(M.LOCALE_PREFIX, '') || '/';
    if (M.GONE_PATHS.has(stripped)) bad(`${f} 同时命中 410 规则`);
  });
  [...M.GONE_PATHS].forEach((g) => {
    if (M.REDIRECTS_301[g]) bad(`${g} 同时在重定向表里`);
  });
});

step('[7] 站点全部真实 URL 均不被任何规则误命中', () => {
  const urls = [];
  (function walk(dir, base = '') {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p, `${base}/${e.name}`);
      else if (e.name === 'index.html') urls.push(base || '/');
      else if (e.name.endsWith('.html')) urls.push(`${base}/${e.name.replace(/\.html$/, '')}`);
    }
  })(path.join(REPO, 'build'));

  let hit = 0;
  urls.forEach((u) => {
    const norm = u.replace(/\/+$/, '') || '/';
    if (M.resolveRedirect(norm)) {
      bad(`真实页面被重定向吃掉:${u}`);
      hit += 1;
    }
    if (M.MD_SUFFIX.test(norm)) bad(`真实页面命中 .md 规则:${u}`);
    if (M.GONE_PATHS.has(norm.replace(M.LOCALE_PREFIX, '') || '/')) bad(`真实页面命中 410:${u}`);
  });
  console.log(`   扫描 ${urls.length} 个真实页面,误命中 ${hit} 个`);
});

// Search Console 曾报 404 的 URL,留作回归用例:改动规则时确保它们不会重新变回 404
step('[8] 历史 404 回归用例', () => {
  const reported = [
    '/docs/troubleshooting/conflict-with-other-ime-tools',
    '/zh-Hant/docs/core-concepts/profiles-and-priority',
    '/de/friends',
    '/zh-Hans/docs/mouse-plus/recipes/fix-choppy-mouse-scrolling-macos.md',
    '/ru/docs/features/website-language-mapping',
    '/ja/friends',
    '/fr/docs/core-concepts/app-rules-vs-website-rules',
    '/fr/docs/features/website-language-mapping',
    '/id/docs/features/website-language-mapping',
    '/ja/docs/push-to-talk/push-to-talk-voice-typing-mac.md',
  ];
  reported.forEach((u) => {
    const norm = u.replace(/\/+$/, '') || '/';
    const r = M.resolveRedirect(norm);
    const md = norm.match(M.MD_SUFFIX);
    const gone = M.GONE_PATHS.has(norm.replace(M.LOCALE_PREFIX, '') || '/');
    if (r) console.log(`   301 ${u}\n       → ${r}`);
    else if (md) console.log(`   301 ${u}\n       → ${md[1]}`);
    else if (gone) console.log(`   410 ${u}`);
    else bad(`仍然 404:${u}`);
  });
});

console.log();
console.log(fail ? `✗ 共 ${fail} 项不通过` : '✓ 全部核对通过');
process.exit(fail ? 1 : 0);
