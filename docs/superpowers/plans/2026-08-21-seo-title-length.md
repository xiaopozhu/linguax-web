# SEO Title Length Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep every generated multilingual HTML title at 60 Unicode characters or fewer while preserving the primary search intent of every affected page.

**Architecture:** A build-output audit enforces the limit against real rendered titles. A local Docusaurus title formatter prevents duplicate LinguaX branding, while source front matter and translation messages provide deliberately concise, query-focused titles instead of runtime truncation.

**Tech Stack:** Docusaurus 3.8.1, React 19, TypeScript 5.6, Node.js ESM, Markdown/MDX, Docusaurus i18n JSON.

---

### Task 1: Add the failing rendered-title audit

**Files:**
- Create: `scripts/audit-seo-titles.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add the audit script**

Create a dependency-free Node script that recursively scans `build/**/*.html`, extracts and decodes `<title>`, counts Unicode code points, reports missing or over-60 titles, and exits with status 1 on violations.

```js
import fs from 'node:fs';
import path from 'node:path';

const MAX_TITLE_LENGTH = 60;
const BUILD_DIR = path.resolve('build');
const namedEntities = new Map([
  ['amp', '&'], ['apos', "'"], ['gt', '>'], ['lt', '<'],
  ['nbsp', ' '], ['quot', '"'],
]);

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code.startsWith('#x')) return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    if (code.startsWith('#')) return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    return namedEntities.get(code.toLowerCase()) ?? entity;
  });
}

function collectHtmlFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectHtmlFiles(entryPath);
    return entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

if (!fs.existsSync(BUILD_DIR)) {
  console.error('Missing build directory. Run npm run build first.');
  process.exit(1);
}

const violations = [];
const files = collectHtmlFiles(BUILD_DIR);
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) {
    violations.push({file, length: 0, title: '[missing title]'});
    continue;
  }
  const title = decodeEntities(match[1]).trim();
  const length = [...title].length;
  if (length > MAX_TITLE_LENGTH) violations.push({file, length, title});
}

if (violations.length > 0) {
  console.error(`Found ${violations.length} SEO title violation(s):`);
  for (const violation of violations) {
    console.error(`${violation.length}\t${path.relative(BUILD_DIR, violation.file)}\t${violation.title}`);
  }
  process.exit(1);
}

console.log(`Checked ${files.length} HTML files: all titles are ${MAX_TITLE_LENGTH} characters or fewer.`);
```

- [ ] **Step 2: Expose the command**

Add this package script:

```json
"audit:titles": "node scripts/audit-seo-titles.mjs"
```

- [ ] **Step 3: Verify the red state**

Run: `npm run audit:titles`

Expected: exit 1 with 251 current rendered titles above 60 characters.

### Task 2: Deduplicate the LinguaX brand suffix

**Files:**
- Create: `src/theme/ThemeProvider/TitleFormatter/index.tsx`

- [ ] **Step 1: Add the formatter override**

```tsx
import React, {type ComponentProps, type ReactNode} from 'react';
import {TitleFormatterProvider} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/ThemeProvider/TitleFormatter';

type Formatter = ComponentProps<typeof TitleFormatterProvider>['formatter'];

const formatter: Formatter = (params) => {
  const title = params.title?.trim();
  if (title?.toLocaleLowerCase().includes(params.siteTitle.toLocaleLowerCase())) {
    return title;
  }
  return params.defaultFormatter(params);
};

export default function ThemeProviderTitleFormatter({children}: Props): ReactNode {
  return (
    <TitleFormatterProvider formatter={formatter}>
      {children}
    </TitleFormatterProvider>
  );
}
```

- [ ] **Step 2: Run type checking**

Run: `npm run typecheck`

Expected: exit 0.

### Task 3: Shorten English source titles

**Files:**
- Modify: `src/pages/index.tsx`
- Modify: `src/pages/download.tsx`
- Modify: `src/pages/pricing.tsx`
- Modify: `src/pages/tools/mouse-compatibility.tsx`
- Modify: `src/pages/tools/mouse-scroll-test.tsx`
- Modify: `src/pages/tools/pair-logitech-receiver.tsx`
- Modify: `blog/2025-07-02-best-input-method-switcher-developers.md`
- Modify: `blog/2026-04-18-how-to-fix-choppy-mouse-scrolling-mac.md`
- Modify: `blog/2026-07-23-install-linguax-homebrew-cask-macos.md`
- Modify: `blog/2025-06-18-introducing-linguax.md`
- Modify: `blog/2025-07-09-linguax-vs-input-source-pro.md`
- Modify: `blog/2026-01-08-macos-mouse-smooth-scroll-enhancement.md`
- Modify: `blog/2026-04-18-map-mouse-side-buttons-macos.md`
- Modify: `blog/2026-07-11-push-to-talk-on-mac-with-a-mouse.md`
- Modify: `blog/2025-07-16-top-macos-productivity-tools-multilingual.md`
- Modify: `blog/2025-06-25-ultimate-guide-macos-input-method-switching.md`
- Modify: `docs/comparisons/bettermouse-alternative-mac.md`
- Modify: `docs/comparisons/logi-options-plus-alternative-macos.md`
- Modify: `docs/comparisons/mos-vs-linearmouse-vs-mac-mouse-fix.md`
- Modify: `docs/mouse-plus/models/logitech-g-pro-x-superlight.md`
- Modify: `docs/mouse-plus/models/logitech-g-pro-x-superlight-2.md`
- Modify: `docs/mouse-plus/models/logitech-lift.md`
- Modify: `docs/mouse-plus/models/mx-anywhere-3s.md`
- Modify: `docs/mouse-plus/models/mx-ergo.md`
- Modify: `docs/mouse-plus/models/mx-master-3.md`
- Modify: `docs/mouse-plus/models/mx-master-3s.md`
- Modify: `docs/mouse-plus/models/mx-master-4.md`
- Modify: `docs/mouse-plus/recipes/disable-mouse-acceleration-mac.md`
- Modify: `docs/mouse-plus/recipes/fix-choppy-mouse-scrolling-macos.md`
- Modify: `docs/mouse-plus/recipes/map-mouse-side-buttons-macos.md`
- Modify: `docs/mouse-plus/recipes/reverse-scroll-direction-mouse-only-mac.md`
- Modify: `docs/push-to-talk/push-to-talk-voice-typing-mac.md`

- [ ] **Step 1: Replace page and tool defaults**

Use these exact default messages:

| Route | Title |
|---|---|
| `/` | `LinguaX: Mac Mouse Enhancement & Input Automation` |
| `/download` | `Download LinguaX for Mac – Free 30-Day Trial` |
| `/pricing` | `LinguaX Pricing: $9.9 Lifetime, No Subscription` |
| `/tools/mouse-compatibility` | `Mac Mouse Compatibility by Model` |
| `/tools/mouse-scroll-test` | `Mac Mouse Scroll Test: Diagnose Choppy Scrolling` |
| `/tools/pair-logitech-receiver` | `Pair Logitech Bolt, Unifying & Lightspeed Receiver` |

- [ ] **Step 2: Replace blog front-matter titles**

| File slug | Title |
|---|---|
| `best-input-method-switcher-developers` | `Best Mac Input Method Switcher for Developers` |
| `how-to-fix-choppy-mouse-scrolling-mac` | `How to Fix Choppy Mouse Scrolling on Mac` |
| `install-linguax-homebrew-cask-macos` | `Install LinguaX on Mac with Homebrew Cask` |
| `introducing-linguax` | `Introducing LinguaX: Native Mac Mouse Enhancement` |
| `linguax-vs-input-source-pro` | `Input Source Pro Alternative for Mac` |
| `macos-mouse-smooth-scroll-enhancement` | `Fix Jittery Mac Mouse Scrolling with LinguaX` |
| `map-mouse-side-buttons-macos` | `Map Mouse Side Buttons on Mac` |
| `push-to-talk-on-mac-with-a-mouse` | `Push-to-Talk on Mac with a Mouse Button` |
| `top-macos-productivity-tools-multilingual` | `5 Mac Productivity Tools for Multilingual Users` |
| `ultimate-guide-macos-input-method-switching` | `Mac Input Method Switching: Complete Guide` |

- [ ] **Step 3: Replace documentation front-matter titles**

| Route suffix | Title |
|---|---|
| `comparisons/bettermouse-alternative-mac` | `BetterMouse Alternative for Mac` |
| `comparisons/logi-options-plus-alternative-macos` | `Logi Options+ Alternative for Mac (2026)` |
| `comparisons/mos-vs-linearmouse-vs-mac-mouse-fix` | `Mos vs LinearMouse vs Mac Mouse Fix (2026)` |
| `models/logitech-g-pro-x-superlight` | `G Pro X Superlight on Mac: Remap Side Buttons` |
| `models/logitech-g-pro-x-superlight-2` | `G Pro X Superlight 2 on Mac: Button Mapping` |
| `models/logitech-lift` | `Logi Lift on Mac: Side-Button Mapping` |
| `models/mx-anywhere-3s` | `MX Anywhere 3S on Mac: Button Mapping` |
| `models/mx-ergo` | `MX Ergo on Mac: Side-Button Mapping` |
| `models/mx-master-3` | `MX Master 3 on Mac: Button Mapping` |
| `models/mx-master-3s` | `MX Master 3S on Mac: Button Mapping` |
| `models/mx-master-4` | `MX Master 4 on Mac: Button Mapping & PTT` |
| `recipes/disable-mouse-acceleration-mac` | `Disable Mouse Acceleration on Mac` |
| `recipes/fix-choppy-mouse-scrolling-macos` | `Fix Choppy Mouse Scrolling on Mac` |
| `recipes/map-mouse-side-buttons-macos` | `Map Mouse Side Buttons on Mac` |
| `recipes/reverse-scroll-direction-mouse-only-mac` | `Reverse Mouse Scroll on Mac, Keep Trackpad Natural` |
| `push-to-talk/push-to-talk-voice-typing-mac` | `Push-to-Talk Voice Typing on Mac` |

### Task 4: Synchronize localized SEO titles

**Files:**
- Modify: `i18n/en/code.json`
- Modify: `i18n/zh-Hans/code.json`
- Modify: `i18n/zh-Hant/code.json`
- Modify: `i18n/ja/code.json`
- Modify: `i18n/ko/code.json`
- Modify: `i18n/de/code.json`
- Modify: `i18n/fr/code.json`
- Modify: `i18n/ru/code.json`
- Modify: `i18n/id/code.json`
- Modify: affected localized Markdown files under `i18n/*/docusaurus-plugin-content-docs/current/`

- [ ] **Step 1: Update all six page/tool title keys**

Set `landing.home.meta.title`, `landing.download.meta.title`, `landing.pricing.meta.title`, `compatTool.meta.title`, `scrollTool.meta.title`, and `pairTool.meta.title` to the following values, in that order:

| Locale | Home | Download | Pricing | Compatibility | Scroll test | Receiver pairing |
|---|---|---|---|---|---|---|
| `en` | `LinguaX: Mac Mouse Enhancement & Input Automation` | `Download LinguaX for Mac – Free 30-Day Trial` | `LinguaX Pricing: $9.9 Lifetime, No Subscription` | `Mac Mouse Compatibility by Model` | `Mac Mouse Scroll Test: Diagnose Choppy Scrolling` | `Pair Logitech Bolt, Unifying & Lightspeed Receiver` |
| `zh-Hans` | `LinguaX：Mac 鼠标增强与输入法自动切换` | `下载 LinguaX Mac 版：免费试用` | `LinguaX 定价：$9.9 买断，无订阅` | `Mac 鼠标型号兼容性` | `Mac 鼠标滚动测试：诊断卡顿` | `配对 Logitech Bolt、Unifying、Lightspeed 接收器｜LinguaX` |
| `zh-Hant` | `LinguaX：Mac 滑鼠增強與輸入法自動切換` | `下載 LinguaX Mac 版：免費試用` | `LinguaX 定價：$9.9 買斷，無訂閱` | `Mac 滑鼠型號相容性` | `Mac 滑鼠捲動測試：診斷卡頓` | `配對 Logitech Bolt、Unifying、Lightspeed 接收器｜LinguaX` |
| `ja` | `LinguaX：Macマウス強化と入力自動化` | `Mac版LinguaXをダウンロード｜無料体験` | `LinguaX料金：$9.9買い切り・サブスクなし` | `Macマウス互換性データベース` | `Macマウススクロールテスト｜カクつきを診断` | `Logitechレシーバーをブラウザでペアリング` |
| `ko` | `LinguaX: Mac 마우스 강화 및 입력 자동화` | `Mac용 LinguaX 다운로드: 무료 체험` | `LinguaX 가격: $9.9 평생 이용, 구독 없음` | `Mac 마우스 모델별 호환성` | `Mac 마우스 스크롤 테스트: 끊김 진단` | `Logitech 리시버 브라우저 페어링` |
| `de` | `LinguaX: Mac-Maus-Optimierung & Eingabeautomatisierung` | `LinguaX für Mac herunterladen – 30 Tage gratis` | `LinguaX: $9.9 Lifetime-Preis, kein Abo` | `Mac-Maus-Kompatibilität nach Modell` | `Mac-Maus-Scrolltest: Ruckeln diagnostizieren` | `Logitech-Empfänger im Browser koppeln` |
| `fr` | `LinguaX : amélioration de souris Mac et saisie auto` | `Télécharger LinguaX pour Mac – essai gratuit` | `LinguaX : $9.9 à vie, sans abonnement` | `Compatibilité des souris Mac par modèle` | `Test de défilement Mac : corriger les saccades` | `Appairer un récepteur Logitech dans le navigateur` |
| `ru` | `LinguaX: улучшение мыши Mac и автоматизация ввода` | `Скачать LinguaX для Mac — бесплатно на 30 дней` | `LinguaX: $9.9 навсегда, без подписки` | `Совместимость мышей Mac по моделям` | `Тест прокрутки Mac: диагностика рывков` | `Подключить приёмник Logitech в браузере` |
| `id` | `LinguaX: Peningkatan Mouse Mac & Otomatisasi Input` | `Unduh LinguaX untuk Mac – Uji Coba 30 Hari` | `Harga LinguaX: $9.9 Selamanya, Tanpa Langganan` | `Kompatibilitas Mouse Mac per Model` | `Tes Scroll Mouse Mac: Diagnosis Tersendat` | `Pasangkan Receiver Logitech di Browser` |

- [ ] **Step 2: Update localized documentation front matter**

Apply concise native-language equivalents of the English titles to any localized Markdown page that still exceeds the rendered limit. Do not replace an existing localized title with English.

- [ ] **Step 3: Validate JSON syntax**

Run: `node -e "for (const locale of ['en','zh-Hans','zh-Hant','ja','ko','de','fr','ru','id']) JSON.parse(require('node:fs').readFileSync('i18n/'+locale+'/code.json','utf8'))"`

Expected: exit 0 with no output.

### Task 5: Reach green and verify the full site

**Files:**
- Modify only title sources reported by the audit if any violation remains.

- [ ] **Step 1: Build every locale**

Run: `npm run build`

Expected: exit 0 for all nine locales.

- [ ] **Step 2: Run the title audit**

Run: `npm run audit:titles`

Expected: exit 0 and a summary reporting all 819 generated HTML titles at 60 characters or fewer.

- [ ] **Step 3: Fix any residual localized violation**

If the audit reports a title, shorten only that title's locale source while preserving its leading search term, rebuild, and rerun the audit until it reports zero violations.

- [ ] **Step 4: Run type checking and repository checks**

Run: `npm run typecheck`

Expected: exit 0.

Run: `git diff --check`

Expected: exit 0.

- [ ] **Step 5: Review the final diff**

Confirm that changes are limited to the audit command, title formatter, title strings, translations, and the approved design/plan documentation. Confirm no URL, canonical, description, or unrelated content changed.
