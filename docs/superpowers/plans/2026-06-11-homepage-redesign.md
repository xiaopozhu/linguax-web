# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 重整三个主要落地页（首页、定价页、下载页）的内容结构和叙事层次，Mouse+ 独立大区块、PTT 专属展示、SEO Method Y（品牌 H1 + 关键词 H2 + 关键词 meta title）。

**Architecture:** 所有页面均为 Docusaurus TSX 页面，共用 `src/css/landing.css`。文字内容通过 `<Translate>` 组件国际化，新增字符串同步写入 `i18n/en/code.json`。不引入新组件库，仅增量扩展现有 CSS 类。

**Tech Stack:** Docusaurus 3, React/TSX, existing `landing.css` design tokens, `<Translate>` i18n, `useBaseUrl`, `ThemedImage`

**Mockup reference:** 三个 HTML mockup 已在 `linguax-web/` 根目录，可随时在浏览器预览对照：
- `mockup-homepage.html`
- `mockup-pricing.html`
- `mockup-download.html`

---

## 文件清单

| 操作 | 文件 |
|---|---|
| Modify | `src/css/landing.css` |
| Modify | `src/pages/index.tsx` |
| Modify | `src/pages/pricing.tsx` |
| Modify | `src/pages/download.tsx` |
| Modify | `i18n/en/code.json`（每个 Task 同步更新，仅追加新 key） |

---

## Task 1: CSS — 新增所有新区块样式

**Files:**
- Modify: `src/css/landing.css`（在文件末尾，`@media` 之前插入）

- [ ] **Step 1: 在 `landing.css` 末尾的 `@media (max-width: 920px)` 块之前，插入以下 CSS**

```css
/* ── Section label ── */
.lx-section-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--lx-primary-strong);
  margin-bottom: 6px;
}

/* ── Feature Pills (Hero) ── */
.lx-feature-pills {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.lx-pill {
  border: 1px solid var(--lx-line);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--lx-muted);
  background: var(--lx-card);
}

.lx-pill-active {
  border-color: var(--lx-primary);
  color: var(--lx-primary-strong);
  background: var(--lx-primary-soft);
}

[data-theme='dark'] .lx-pill {
  background: var(--lx-bg-soft);
}

[data-theme='dark'] .lx-pill-active {
  background: rgba(255, 143, 102, 0.14);
}

/* ── Mouse+ Feature Block ── */
.lx-feature-block {
  background: linear-gradient(135deg, var(--lx-card) 60%, var(--lx-primary-soft) 100%);
  border: 1px solid var(--lx-line);
  border-radius: 20px;
  padding: 28px;
  margin-top: 18px;
}

[data-theme='dark'] .lx-feature-block {
  background: linear-gradient(135deg, var(--lx-card) 60%, rgba(255, 143, 102, 0.07) 100%);
}

.lx-feature-block-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--lx-primary-soft);
  border: 1px solid #ffd4c3;
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 700;
  color: var(--lx-primary-strong);
  margin-bottom: 14px;
}

[data-theme='dark'] .lx-feature-block-tag {
  background: rgba(255, 143, 102, 0.14);
  border-color: rgba(255, 143, 102, 0.3);
}

.lx-feature-block h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 20px;
  color: var(--lx-title);
  margin-bottom: 8px;
}

.lx-feature-block > p {
  color: var(--lx-muted);
  font-size: 14px;
  max-width: 560px;
  margin-bottom: 20px;
}

.lx-sub-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.lx-sub-card {
  border: 1px solid var(--lx-line);
  border-radius: 14px;
  background: var(--lx-card);
  padding: 14px 16px;
}

.lx-sub-card-icon {
  font-size: 20px;
  margin-bottom: 8px;
  display: block;
}

.lx-sub-card h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--lx-title);
  margin-bottom: 4px;
}

.lx-sub-card p {
  font-size: 13px;
  color: var(--lx-muted);
  line-height: 1.55;
  margin: 0;
}

.lx-screenshot-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* ── Push-to-Talk Block ── */
.lx-ptt-block {
  background: linear-gradient(135deg, var(--lx-pain-bg) 40%, #fff4ef 100%);
  border: 1px solid var(--lx-pain-line);
  border-radius: 20px;
  padding: 28px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: center;
  margin-top: 18px;
}

[data-theme='dark'] .lx-ptt-block {
  background: linear-gradient(135deg, #211a16 40%, #1e1510 100%);
  border-color: var(--lx-pain-line);
}

.lx-ptt-label {
  display: inline-block;
  background: #ffeae0;
  border: 1px solid #ffd4c3;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  color: var(--lx-primary-strong);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

[data-theme='dark'] .lx-ptt-label {
  background: rgba(255, 143, 102, 0.14);
  border-color: rgba(255, 143, 102, 0.3);
}

.lx-ptt-block h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 20px;
  color: var(--lx-title);
  margin-bottom: 10px;
  line-height: 1.2;
}

.lx-ptt-block > div > p {
  color: var(--lx-muted);
  font-size: 14px;
  line-height: 1.65;
  margin-bottom: 14px;
}

.lx-ptt-how {
  border: 1px solid #ffd4c3;
  border-radius: 12px;
  background: var(--lx-card);
  padding: 14px;
  font-size: 13px;
}

[data-theme='dark'] .lx-ptt-how {
  border-color: var(--lx-pain-line);
}

.lx-ptt-how-step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
}

.lx-ptt-how-step:last-child {
  margin-bottom: 0;
}

.lx-ptt-step-num {
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--lx-primary-soft);
  color: var(--lx-primary-strong);
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lx-ptt-step-text {
  color: var(--lx-text);
  line-height: 1.5;
}

.lx-ptt-compat {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 14px;
}

.lx-ptt-compat-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--lx-muted);
}

.lx-compat-tag {
  border: 1px solid var(--lx-line);
  border-radius: 8px;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--lx-muted);
  background: var(--lx-card);
}

.lx-ptt-visual {
  background: linear-gradient(160deg, var(--lx-card) 50%, var(--lx-primary-soft) 100%);
  border: 1px solid #ffd4c3;
  border-radius: 16px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
}

[data-theme='dark'] .lx-ptt-visual {
  background: linear-gradient(160deg, var(--lx-card) 50%, rgba(255, 143, 102, 0.1) 100%);
  border-color: var(--lx-pain-line);
}

.lx-ptt-visual-icon {
  font-size: 48px;
  line-height: 1;
}

.lx-ptt-visual-caption {
  font-size: 13px;
  color: var(--lx-muted);
  font-weight: 600;
}

.lx-ptt-visual-sub {
  font-size: 11px;
  color: var(--lx-line);
  margin-top: 4px;
}

/* ── Input Source Two-Column Block ── */
.lx-two-col-block {
  background: var(--lx-card);
  border: 1px solid var(--lx-line);
  border-radius: 20px;
  padding: 24px;
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

.lx-two-col-block h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  color: var(--lx-title);
  margin-bottom: 10px;
}

.lx-two-col-block p {
  color: var(--lx-muted);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 10px;
}

.lx-rule-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lx-rule-row {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--lx-line);
  border-radius: 10px;
  background: var(--lx-bg-soft);
  padding: 10px 12px;
  font-size: 13px;
}

.lx-rule-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.lx-rule-text {
  flex: 1;
}

.lx-rule-app-name {
  font-weight: 700;
  color: var(--lx-title);
  font-size: 13px;
}

.lx-rule-input-name {
  color: var(--lx-muted);
  font-size: 12px;
}

.lx-rule-badge {
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  background: #e8f5ec;
  color: #2e7d52;
  flex-shrink: 0;
}

[data-theme='dark'] .lx-rule-badge {
  background: #1a3626;
  color: #6fcf97;
}

/* ── Comparison table cell colors ── */
.lx-cell-yes {
  color: #2e7d52;
  font-weight: 700;
}

.lx-cell-no {
  color: var(--lx-muted);
}

.lx-cell-partial {
  color: #b97a30;
  font-weight: 600;
}

[data-theme='dark'] .lx-cell-yes { color: #6fcf97; }
[data-theme='dark'] .lx-cell-partial { color: #f6a623; }

/* ── Guide List (card style) ── */
.lx-guide-list {
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.lx-guide-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 14px;
  background: var(--lx-card);
  border: 1px solid var(--lx-line);
  border-radius: 10px;
  font-size: 14px;
  color: var(--lx-text);
  text-decoration: none;
  font-weight: 500;
  transition: border-color 180ms ease;
}

.lx-guide-link:hover {
  border-color: #b5c7bf;
  text-decoration: none;
  color: var(--lx-text);
}

.lx-guide-link-arrow {
  margin-left: auto;
  color: var(--lx-muted);
  font-size: 12px;
}

/* ── Pricing: Value Points ── */
.lx-value-item {
  border: 1px solid var(--lx-line);
  border-radius: 14px;
  background: var(--lx-card);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: var(--lx-shadow);
}

.lx-value-icon {
  font-size: 22px;
  line-height: 1;
}

.lx-value-item h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--lx-title);
  margin: 0;
}

.lx-value-item p {
  font-size: 13px;
  color: var(--lx-muted);
  line-height: 1.5;
  margin: 0;
}

/* ── Pricing: Upgrade Hint ── */
.lx-upgrade-hint {
  background: #f0faf4;
  border: 1px solid #b3e0c5;
  border-radius: 12px;
  padding: 12px 14px;
  margin-top: 14px;
  font-size: 13px;
  color: #2e5c42;
  line-height: 1.6;
}

[data-theme='dark'] .lx-upgrade-hint {
  background: #1a2e22;
  border-color: #2e5c42;
  color: #a8d5b8;
}

/* ── Pricing: Feedback Strip ── */
.lx-feedback-strip {
  background: linear-gradient(90deg, var(--lx-pain-bg), #fff4ef);
  border: 1px solid var(--lx-pain-line);
  border-radius: 14px;
  padding: 14px 18px;
  margin-top: 18px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 13px;
}

[data-theme='dark'] .lx-feedback-strip {
  background: linear-gradient(90deg, #211a16, #1e1510);
}

.lx-feedback-strip-icon {
  font-size: 22px;
  flex-shrink: 0;
  margin-top: 1px;
}

.lx-feedback-strip-text {
  color: var(--lx-text);
  line-height: 1.6;
}

/* ── Download: Compat Strip ── */
.lx-compat-strip {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  background: var(--lx-bg-soft);
  border: 1px solid var(--lx-line);
  border-radius: 10px;
  padding: 10px 14px;
  margin-top: 16px;
  font-size: 12px;
  color: var(--lx-muted);
}

.lx-compat-strip-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.lx-compat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7bbf99;
  flex-shrink: 0;
}

/* ── Download: Onboard Grid ── */
.lx-onboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.lx-onboard-card {
  border: 1px solid var(--lx-line);
  border-radius: 14px;
  background: var(--lx-card);
  padding: 16px;
  position: relative;
  padding-top: 42px;
  box-shadow: var(--lx-shadow);
}

.lx-onboard-num {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--lx-primary-soft);
  color: var(--lx-primary-strong);
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lx-onboard-card h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--lx-title);
  margin-bottom: 6px;
}

.lx-onboard-card p {
  font-size: 13px;
  color: var(--lx-muted);
  line-height: 1.55;
  margin-bottom: 10px;
}

.lx-onboard-tag {
  display: inline-block;
  border-radius: 999px;
  background: var(--lx-bg-soft);
  border: 1px solid var(--lx-line);
  padding: 2px 9px;
  font-size: 11px;
  font-weight: 600;
  color: var(--lx-muted);
}

/* ── Download: Pricing Nudge ── */
.lx-pricing-nudge {
  border: 1px solid #bad1c5;
  border-radius: 14px;
  background: linear-gradient(135deg, #f6fbf8, #ebf4ef);
  padding: 16px 18px;
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

[data-theme='dark'] .lx-pricing-nudge {
  background: linear-gradient(135deg, #1f2d26, #182318);
  border-color: #2e5c42;
}

.lx-pricing-nudge-text {
  font-size: 13px;
  color: #2e5c42;
  line-height: 1.6;
}

[data-theme='dark'] .lx-pricing-nudge-text {
  color: #a8d5b8;
}

.lx-pricing-nudge-price {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 22px;
  color: var(--lx-title);
  white-space: nowrap;
  text-align: center;
}

.lx-pricing-nudge-price span {
  font-size: 12px;
  color: var(--lx-muted);
  font-family: 'Manrope', sans-serif;
  display: block;
}
```

- [ ] **Step 2: 在 `@media (max-width: 920px)` 块内已有规则末尾添加响应式**

找到现有的 `@media (max-width: 920px)` 块，在最后一条规则后追加：

```css
  .lx-sub-grid,
  .lx-onboard-grid {
    grid-template-columns: 1fr;
  }

  .lx-ptt-block,
  .lx-two-col-block {
    grid-template-columns: 1fr;
  }

  .lx-screenshot-row {
    grid-template-columns: 1fr;
  }

  .lx-pricing-nudge {
    flex-direction: column;
    align-items: flex-start;
  }
```

- [ ] **Step 3: TypeScript 编译检查**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web && npx tsc --noEmit
```

预期输出：无错误（CSS 变更不影响 TypeScript）

- [ ] **Step 4: Commit**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web
git add src/css/landing.css
git commit -m "style: add CSS classes for homepage redesign sections"
```

---

## Task 2: 首页 — Hero 区块重写 + Pain 区块文案更新

**Files:**
- Modify: `src/pages/index.tsx`（替换 Hero section 和 Pain section）
- Modify: `i18n/en/code.json`（更新和新增相关 key）

- [ ] **Step 1: 更新 `i18n/en/code.json`，替换 Hero 相关 key，新增 Pills key**

找到 `i18n/en/code.json` 中以下已有 key，将其 `message` 更新为新值（保留原有 key，不要修改 description 字段是否存在）：

```json
"landing.home.meta.title": {
  "message": "LinguaX – Mouse Enhancement, Push-to-Talk & Input Automation for macOS"
},
"landing.home.meta.description": {
  "message": "LinguaX gives third-party mice a pro macOS feel — smooth scrolling, gesture and side-button mapping, and push-to-talk voice typing — plus automatic input-source switching. Free trial, $9.9 lifetime."
},
"landing.home.hero.chip": {
  "message": "macOS 13+ · Apple Silicon & Intel · Menu bar app"
},
"landing.home.hero.title.line1": {
  "message": "Your third-party mouse."
},
"landing.home.hero.title.line2": {
  "message": "Finally at home on macOS."
},
"landing.home.hero.description": {
  "message": "LinguaX is a macOS utility for mouse enhancement, push-to-talk voice input, and automatic input-source switching — smooth scrolling, gesture and button mapping, and input source rules by app and website."
},
"landing.home.note": {
  "message": "Pricing: free trial, then a one-time Lifetime purchase ($9.9), no subscription."
},
"landing.home.pain.card1.title": {
  "message": "Third-party mice never quite feel right"
},
"landing.home.pain.card1.description": {
  "message": "Scrolling feels choppy, inertia is off, and macOS gives you almost no tuning controls for non-Apple mice."
},
"landing.home.pain.card2.title": {
  "message": "Side buttons are wasted real estate"
},
"landing.home.pain.card2.description": {
  "message": "Most third-party button mapping tools are clunky or app-unaware. You end up ignoring the buttons."
},
"landing.home.pain.card3.title": {
  "message": "Voice and language switching still breaks focus"
},
"landing.home.pain.card3.description": {
  "message": "Reaching for a key to start dictation, then manually switching input source — every single time."
}
```

然后在文件中追加以下新 key（可在文件末尾、最后 `}` 之前的任意位置追加）：

```json
"landing.home.pills.mouse": {
  "message": "Mouse+ Enhancement"
},
"landing.home.pills.ptt": {
  "message": "Push-to-Talk Voice"
},
"landing.home.pills.input": {
  "message": "Input Source Automation"
},
"landing.home.pain.title": {
  "message": "Small frictions that add up every day"
}
```

注意：`landing.home.pain.title` 可能已存在，确认已有 key 的值是否需要更新（若已是此值则跳过）。

- [ ] **Step 2: 替换 `index.tsx` 中的 Hero section**

找到现有 Hero section（从 `<section className="lx-hero lx-reveal">` 到其关闭 `</section>`），整体替换为：

```tsx
<section className="lx-hero lx-reveal">
  <div className="lx-chip">
    <Translate id="landing.home.hero.chip" description="Home hero chip">macOS 13+ · Apple Silicon &amp; Intel · Menu bar app</Translate>
  </div>
  <h1>
    <Translate id="landing.home.hero.title.line1" description="Home hero title line1">Your third-party mouse.</Translate>
    <span className="highlight">
      <Translate id="landing.home.hero.title.line2" description="Home hero title line2">Finally at home on macOS.</Translate>
    </span>
  </h1>
  <p>
    <Translate id="landing.home.hero.description" description="Home hero description">
      LinguaX is a macOS utility for mouse enhancement, push-to-talk voice input, and automatic input-source switching — smooth scrolling, gesture and button mapping, and input source rules by app and website.
    </Translate>
  </p>
  <div className="lx-actions">
    <a className="lx-btn lx-btn-primary" href={downloadUrl}>
      <Translate id="landing.home.cta.download" description="Home download cta">Download Free</Translate>
    </a>
    <a className="lx-btn lx-btn-ghost" href={pricingUrl}>
      <Translate id="landing.home.cta.pricing" description="Home pricing cta">See Pricing</Translate>
    </a>
  </div>
  <div className="lx-note">
    <Translate id="landing.home.note" description="Home note">Pricing: free trial, then a one-time Lifetime purchase ($9.9), no subscription.</Translate>
    {releaseInfo?.version ? ` ${translate({
      id: 'landing.home.note.versionPrefix',
      message: 'Current version:',
      description: 'Home current version label'
    })} v${releaseInfo.version}` : ''}
    {' '}
    <a href={changelogUrl}>
      <Translate id="landing.home.note.changelog" description="Home changelog link">See latest changelog</Translate>
    </a>
  </div>
  <div className="lx-feature-pills">
    <span className="lx-pill lx-pill-active">
      🖱 <Translate id="landing.home.pills.mouse" description="Home pill mouse">Mouse+ Enhancement</Translate>
    </span>
    <span className="lx-pill lx-pill-active">
      🎙 <Translate id="landing.home.pills.ptt" description="Home pill ptt">Push-to-Talk Voice</Translate>
    </span>
    <span className="lx-pill">
      ⌨️ <Translate id="landing.home.pills.input" description="Home pill input">Input Source Automation</Translate>
    </span>
  </div>
</section>
```

- [ ] **Step 3: 替换 Pain section**

找到现有第一个 Pain section（含 `lx-card-pain` 的区块），替换为：

```tsx
<section className="lx-section lx-reveal">
  <div className="lx-section-label">The problem</div>
  <h2><Translate id="landing.home.pain.title" description="Pain section title">Small frictions that add up every day</Translate></h2>
  <div className="lx-grid lx-grid-3">
    <article className="lx-card lx-card-pain lx-stagger">
      <h3><Translate id="landing.home.pain.card1.title" description="Pain card1 title">Third-party mice never quite feel right</Translate></h3>
      <p><Translate id="landing.home.pain.card1.description" description="Pain card1 description">Scrolling feels choppy, inertia is off, and macOS gives you almost no tuning controls for non-Apple mice.</Translate></p>
    </article>
    <article className="lx-card lx-card-pain lx-stagger">
      <h3><Translate id="landing.home.pain.card2.title" description="Pain card2 title">Side buttons are wasted real estate</Translate></h3>
      <p><Translate id="landing.home.pain.card2.description" description="Pain card2 description">Most third-party button mapping tools are clunky or app-unaware. You end up ignoring the buttons.</Translate></p>
    </article>
    <article className="lx-card lx-card-pain lx-stagger">
      <h3><Translate id="landing.home.pain.card3.title" description="Pain card3 title">Voice and language switching still breaks focus</Translate></h3>
      <p><Translate id="landing.home.pain.card3.description" description="Pain card3 description">Reaching for a key to start dictation, then manually switching input source — every single time.</Translate></p>
    </article>
  </div>
</section>
```

- [ ] **Step 4: 删除现有 Diff Cards section 和 Steps section**

找到以下两个 section 并删除（这两个区块的内容被新的 Mouse+ 和 PTT 区块替代）：
- 含 `landing.home.diff.title` 的 section
- 含 `landing.home.steps.title` 的 section

- [ ] **Step 5: TypeScript 检查**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web && npx tsc --noEmit
```

预期：无错误

- [ ] **Step 6: 启动开发服务器，视觉验证 Hero + Pain**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web && npm run start
```

打开 `http://localhost:3000`，验证：
- Hero H1 显示 "Your third-party mouse. / Finally at home on macOS."
- 副标题以 GEO proof block 开头
- 三个 Feature Pills 显示
- Pain section 三张卡片文案已更新

- [ ] **Step 7: Commit**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web
git add src/pages/index.tsx i18n/en/code.json
git commit -m "feat(home): rewrite Hero section, update Pain section, add Feature Pills"
```

---

## Task 3: 首页 — Mouse+ 独立区块

**Files:**
- Modify: `src/pages/index.tsx`（在 Pain section 之后插入）
- Modify: `i18n/en/code.json`（追加新 key）

- [ ] **Step 1: 追加 Mouse+ 相关 i18n key 到 `code.json`**

```json
"landing.home.mouseplus.section.label": {
  "message": "Core feature"
},
"landing.home.mouseplus.title": {
  "message": "Mouse Enhancement for macOS"
},
"landing.home.mouseplus.description": {
  "message": "Everything your third-party mouse needs to feel like it belongs on macOS."
},
"landing.home.mouseplus.block.tag": {
  "message": "Mouse+ Enhancement"
},
"landing.home.mouseplus.block.title": {
  "message": "Smooth, mappable, per-app configurable"
},
"landing.home.mouseplus.block.description": {
  "message": "Works with any USB or Bluetooth mouse. No driver install needed — just LinguaX."
},
"landing.home.mouseplus.sub1.title": {
  "message": "Smooth Scrolling"
},
"landing.home.mouseplus.sub1.description": {
  "message": "Tunable scroll curve for any mouse. Adjust speed and inertia. Per-app overrides when one app needs a different sensitivity."
},
"landing.home.mouseplus.sub2.title": {
  "message": "Gesture & Button Mapping"
},
"landing.home.mouseplus.sub2.description": {
  "message": "Map clicks, long-press, and directional drags to real actions: app launch, system controls, media, or custom scripts."
},
"landing.home.mouseplus.sub3.title": {
  "message": "App-Scoped Overrides"
},
"landing.home.mouseplus.sub3.description": {
  "message": "Override any button or scroll behavior for a specific app without touching the global config."
},
"landing.home.mouseplus.shot1.alt": {
  "message": "LinguaX Mouse+ smooth scrolling and feel tuning"
},
"landing.home.mouseplus.shot1.caption": {
  "message": "Smooth scrolling and feel tuning"
},
"landing.home.mouseplus.shot2.alt": {
  "message": "LinguaX Mouse+ button mapping and app overrides"
},
"landing.home.mouseplus.shot2.caption": {
  "message": "Button mapping and app-scoped settings"
}
```

- [ ] **Step 2: 在 Pain section 之后插入 Mouse+ section**

```tsx
<section className="lx-section lx-reveal">
  <div className="lx-section-label">
    <Translate id="landing.home.mouseplus.section.label" description="Mouse+ section label">Core feature</Translate>
  </div>
  <h2>
    <Translate id="landing.home.mouseplus.title" description="Mouse+ section title">Mouse Enhancement for macOS</Translate>
  </h2>
  <p className="lx-section-desc">
    <Translate id="landing.home.mouseplus.description" description="Mouse+ section description">Everything your third-party mouse needs to feel like it belongs on macOS.</Translate>
  </p>
  <div className="lx-feature-block">
    <div className="lx-feature-block-tag">
      🖱 <Translate id="landing.home.mouseplus.block.tag" description="Mouse+ block tag">Mouse+ Enhancement</Translate>
    </div>
    <h3>
      <Translate id="landing.home.mouseplus.block.title" description="Mouse+ block title">Smooth, mappable, per-app configurable</Translate>
    </h3>
    <p>
      <Translate id="landing.home.mouseplus.block.description" description="Mouse+ block description">Works with any USB or Bluetooth mouse. No driver install needed — just LinguaX.</Translate>
    </p>
    <div className="lx-sub-grid">
      <div className="lx-sub-card lx-stagger">
        <span className="lx-sub-card-icon">〰️</span>
        <h4><Translate id="landing.home.mouseplus.sub1.title" description="Mouse+ sub1 title">Smooth Scrolling</Translate></h4>
        <p>
          <Translate id="landing.home.mouseplus.sub1.description" description="Mouse+ sub1 description">
            Tunable scroll curve for any mouse. Adjust speed and inertia. Per-app overrides when one app needs a different sensitivity. See the <a href={smoothScrollGuideUrl}>smooth scrolling guide</a>.
          </Translate>
        </p>
      </div>
      <div className="lx-sub-card lx-stagger">
        <span className="lx-sub-card-icon">✳️</span>
        <h4><Translate id="landing.home.mouseplus.sub2.title" description="Mouse+ sub2 title">Gesture &amp; Button Mapping</Translate></h4>
        <p>
          <Translate id="landing.home.mouseplus.sub2.description" description="Mouse+ sub2 description">
            Map clicks, long-press, and directional drags to real actions: app launch, system controls, media, or custom scripts. <a href={sideButtonGuideUrl}>Map side buttons →</a>
          </Translate>
        </p>
      </div>
      <div className="lx-sub-card lx-stagger">
        <span className="lx-sub-card-icon">⧉</span>
        <h4><Translate id="landing.home.mouseplus.sub3.title" description="Mouse+ sub3 title">App-Scoped Overrides</Translate></h4>
        <p>
          <Translate id="landing.home.mouseplus.sub3.description" description="Mouse+ sub3 description">Override any button or scroll behavior for a specific app without touching the global config.</Translate>
        </p>
      </div>
    </div>
    <div className="lx-screenshot-row">
      <figure className="lx-shot lx-stagger">
        <ThemedImage
          alt={translate({ id: 'landing.home.mouseplus.shot1.alt', message: 'LinguaX Mouse+ smooth scrolling and feel tuning', description: 'Mouse+ screenshot 1 alt' })}
          sources={{ light: useBaseUrl('/img/linguax-mouse.png'), dark: useBaseUrl('/img/linguax-mouse-dark.png') }}
        />
        <figcaption><Translate id="landing.home.mouseplus.shot1.caption" description="Mouse+ screenshot 1 caption">Smooth scrolling and feel tuning</Translate></figcaption>
      </figure>
      <figure className="lx-shot lx-stagger">
        <ThemedImage
          alt={translate({ id: 'landing.home.mouseplus.shot2.alt', message: 'LinguaX Mouse+ button mapping and app overrides', description: 'Mouse+ screenshot 2 alt' })}
          sources={{ light: useBaseUrl('/img/linguax-mouse-settings.png'), dark: useBaseUrl('/img/linguax-mouse-settings-dark.png') }}
        />
        <figcaption><Translate id="landing.home.mouseplus.shot2.caption" description="Mouse+ screenshot 2 caption">Button mapping and app-scoped settings</Translate></figcaption>
      </figure>
    </div>
  </div>
</section>
```

注意：`smoothScrollGuideUrl` 和 `sideButtonGuideUrl` 已在文件顶部通过 `useBaseUrl` 定义，可直接使用。

- [ ] **Step 3: TypeScript 检查**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web && npx tsc --noEmit
```

- [ ] **Step 4: 视觉验证**

刷新 `http://localhost:3000`，验证：
- Mouse+ 区块出现在 Pain 之后
- 三个子功能卡排列正确
- 两张截图正确加载（light/dark mode 各测试一次）

- [ ] **Step 5: Commit**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web
git add src/pages/index.tsx i18n/en/code.json
git commit -m "feat(home): add Mouse+ standalone feature section with screenshots"
```

---

## Task 4: 首页 — Push-to-Talk 专属区块

**Files:**
- Modify: `src/pages/index.tsx`（在 Mouse+ section 之后插入）
- Modify: `i18n/en/code.json`（追加新 key）

- [ ] **Step 1: 追加 PTT 相关 i18n key**

```json
"landing.home.ptt.section.label": {
  "message": "Standout feature"
},
"landing.home.ptt.title": {
  "message": "Push-to-Talk Voice Typing on Mac"
},
"landing.home.ptt.description": {
  "message": "Hold a mouse side button to start voice dictation. Release to stop. Your hands never leave the mouse."
},
"landing.home.ptt.label": {
  "message": "How it works"
},
"landing.home.ptt.block.title": {
  "message": "One hold. Instant dictation."
},
"landing.home.ptt.block.description": {
  "message": "LinguaX maps a mouse side button to hold the macOS Fn / Globe key. While held, macOS Dictation activates. Release the button and dictation stops — just like a walkie-talkie."
},
"landing.home.ptt.step1": {
  "message": "Map any side button to \"Hold Globe Key\" in the Mapping panel"
},
"landing.home.ptt.step2": {
  "message": "Hold the button — macOS Dictation starts immediately"
},
"landing.home.ptt.step3": {
  "message": "Release — dictation stops. No keyboard required."
},
"landing.home.ptt.compat.label": {
  "message": "Works with:"
},
"landing.home.ptt.visual.hold": {
  "message": "Hold side button"
},
"landing.home.ptt.visual.active": {
  "message": "Voice dictation active"
}
```

- [ ] **Step 2: 在 Mouse+ section 之后插入 PTT section**

```tsx
<section className="lx-section lx-reveal">
  <div className="lx-section-label">
    <Translate id="landing.home.ptt.section.label" description="PTT section label">Standout feature</Translate>
  </div>
  <h2>
    <Translate id="landing.home.ptt.title" description="PTT section title">Push-to-Talk Voice Typing on Mac</Translate>
  </h2>
  <p className="lx-section-desc">
    <Translate id="landing.home.ptt.description" description="PTT section description">Hold a mouse side button to start voice dictation. Release to stop. Your hands never leave the mouse.</Translate>
  </p>
  <div className="lx-ptt-block">
    <div>
      <div className="lx-ptt-label">
        <Translate id="landing.home.ptt.label" description="PTT how it works label">How it works</Translate>
      </div>
      <h3>
        <Translate id="landing.home.ptt.block.title" description="PTT block title">One hold. Instant dictation.</Translate>
      </h3>
      <p>
        <Translate id="landing.home.ptt.block.description" description="PTT block description">
          LinguaX maps a mouse side button to hold the macOS Fn / Globe key. While held, macOS Dictation activates. Release the button and dictation stops — just like a walkie-talkie.
        </Translate>
        {' '}
        <a href={pushToTalkGuideUrl}>
          <Translate id="landing.home.ptt.guide.link" description="PTT guide link">Full setup guide →</Translate>
        </a>
      </p>
      <div className="lx-ptt-how">
        <div className="lx-ptt-how-step">
          <div className="lx-ptt-step-num">1</div>
          <span className="lx-ptt-step-text">
            <Translate id="landing.home.ptt.step1" description="PTT step 1">Map any side button to "Hold Globe Key" in the Mapping panel</Translate>
          </span>
        </div>
        <div className="lx-ptt-how-step">
          <div className="lx-ptt-step-num">2</div>
          <span className="lx-ptt-step-text">
            <Translate id="landing.home.ptt.step2" description="PTT step 2">Hold the button — macOS Dictation starts immediately</Translate>
          </span>
        </div>
        <div className="lx-ptt-how-step">
          <div className="lx-ptt-step-num">3</div>
          <span className="lx-ptt-step-text">
            <Translate id="landing.home.ptt.step3" description="PTT step 3">Release — dictation stops. No keyboard required.</Translate>
          </span>
        </div>
      </div>
      <div className="lx-ptt-compat">
        <span className="lx-ptt-compat-label">
          <Translate id="landing.home.ptt.compat.label" description="PTT compat label">Works with:</Translate>
        </span>
        <span className="lx-compat-tag">macOS Dictation</span>
        <span className="lx-compat-tag">Wispr Flow</span>
        <span className="lx-compat-tag">superwhisper</span>
        <span className="lx-compat-tag">Any push-to-talk app</span>
      </div>
    </div>
    <div className="lx-ptt-visual">
      <div className="lx-ptt-visual-icon">🎙</div>
      <div className="lx-ptt-visual-caption">
        <Translate id="landing.home.ptt.visual.hold" description="PTT visual caption hold">Hold side button</Translate>
      </div>
      <div className="lx-ptt-visual-sub">↓ Fn/Globe held down ↓</div>
      <div className="lx-ptt-visual-caption">
        <Translate id="landing.home.ptt.visual.active" description="PTT visual caption active">Voice dictation active</Translate>
      </div>
    </div>
  </div>
</section>
```

注意：在文件顶部确认 `pushToTalkGuideUrl` 已通过 `useBaseUrl('/docs/use-cases/push-to-talk-voice-typing-mac')` 定义（现有代码应已存在）。追加 i18n key：

```json
"landing.home.ptt.guide.link": {
  "message": "Full setup guide →"
}
```

- [ ] **Step 3: TypeScript 检查**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web && npx tsc --noEmit
```

- [ ] **Step 4: 视觉验证**

刷新首页，验证 PTT 区块：
- 左列：标签 + 标题 + 说明 + 三步骤 + 兼容标签
- 右列：大图标 + 说明文字

- [ ] **Step 5: Commit**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web
git add src/pages/index.tsx i18n/en/code.json
git commit -m "feat(home): add Push-to-Talk standalone section with GEO proof block"
```

---

## Task 5: 首页 — 其余区块（Input Source、对比表、受众、指南、兼容、FAQ）

**Files:**
- Modify: `src/pages/index.tsx`
- Modify: `i18n/en/code.json`

- [ ] **Step 1: 追加新 i18n key**

```json
"landing.home.input.section.label": {
  "message": "Companion feature"
},
"landing.home.input.title": {
  "message": "Automatic Input Source Switching"
},
"landing.home.input.block.title": {
  "message": "Your input context follows your focus"
},
"landing.home.input.block.p1": {
  "message": "Set one rule per app and one per domain. LinguaX switches input source automatically whenever context changes."
},
"landing.home.input.block.p2": {
  "message": "Falls back to your default input source when no rule matches. Works in the background, invisible when working correctly."
},
"landing.home.compare.title": {
  "message": "LinguaX vs Logi Options+: Mouse Enhancement for macOS"
},
"landing.home.compare.description": {
  "message": "How LinguaX compares to Logi Options+ and macOS built-in controls for third-party mice."
},
"landing.home.compare.col.feature": { "message": "Feature" },
"landing.home.compare.col.lx": { "message": "LinguaX" },
"landing.home.compare.col.logi": { "message": "Logi Options+" },
"landing.home.compare.col.macos": { "message": "macOS Built-in" },
"landing.home.compare.row1.feature": { "message": "Works with any third-party mouse" },
"landing.home.compare.row1.lx": { "message": "✓ Yes" },
"landing.home.compare.row1.logi": { "message": "Logitech only" },
"landing.home.compare.row1.macos": { "message": "Limited" },
"landing.home.compare.row2.feature": { "message": "Smooth scrolling (tunable)" },
"landing.home.compare.row2.logi": { "message": "✓ Yes" },
"landing.home.compare.row2.macos": { "message": "✗ No" },
"landing.home.compare.row3.feature": { "message": "Per-app scroll override" },
"landing.home.compare.row3.logi": { "message": "Partial" },
"landing.home.compare.row3.macos": { "message": "✗ No" },
"landing.home.compare.row4.feature": { "message": "Side button to any action" },
"landing.home.compare.row4.macos": { "message": "✗ No" },
"landing.home.compare.row5.feature": { "message": "Push-to-talk voice input" },
"landing.home.compare.row5.logi": { "message": "✗ No" },
"landing.home.compare.row5.macos": { "message": "✗ No" },
"landing.home.compare.row6.feature": { "message": "Input source automation" },
"landing.home.compare.row6.logi": { "message": "✗ No" },
"landing.home.compare.row6.macos": { "message": "✗ No" },
"landing.home.compare.row7.feature": { "message": "Pricing" },
"landing.home.compare.row7.lx": { "message": "Free trial + $9.9 lifetime" },
"landing.home.compare.row7.logi": { "message": "Free (Logitech only)" },
"landing.home.compare.row7.macos": { "message": "Free (limited)" },
"landing.home.audience.item4": {
  "message": "People who have tried Logi Options+ or macOS built-in controls and found them too limited or device-locked."
},
"landing.home.faq.q5": {
  "message": "Does LinguaX work with any mouse, or only Logitech?"
},
"landing.home.faq.a5": {
  "message": "Any USB or Bluetooth mouse. No brand restriction, no driver needed."
}
```

- [ ] **Step 2: 在 PTT section 之后插入 Input Source section**

```tsx
<section className="lx-section lx-reveal">
  <div className="lx-section-label">
    <Translate id="landing.home.input.section.label" description="Input section label">Companion feature</Translate>
  </div>
  <h2>
    <Translate id="landing.home.input.title" description="Input section title">Automatic Input Source Switching</Translate>
  </h2>
  <div className="lx-two-col-block">
    <div>
      <h3><Translate id="landing.home.input.block.title" description="Input block title">Your input context follows your focus</Translate></h3>
      <p>
        <Translate id="landing.home.input.block.p1" description="Input block p1">Set one rule per app and one per domain. LinguaX switches input source automatically whenever context changes.</Translate>
      </p>
      <p>
        <Translate id="landing.home.input.block.p2" description="Input block p2">Falls back to your default input source when no rule matches. Works in the background, invisible when working correctly.</Translate>
        {' '}
        <a href={inputAutomationGuideUrl}>
          <Translate id="landing.home.input.guide.link" description="Input guide link">Setup guide for app and domain rules →</Translate>
        </a>
      </p>
    </div>
    <div className="lx-rule-list">
      {[
        { icon: '💻', app: 'Xcode', input: '→ English', badge: 'App Rule' },
        { icon: '💬', app: 'WeChat', input: '→ 中文 (Pinyin)', badge: 'App Rule' },
        { icon: '🌐', app: 'linear.app', input: '→ English', badge: 'Domain Rule' },
        { icon: '🌐', app: 'zhihu.com', input: '→ 中文 (Pinyin)', badge: 'Domain Rule' },
      ].map((rule) => (
        <div key={rule.app} className="lx-rule-row">
          <span className="lx-rule-icon">{rule.icon}</span>
          <div className="lx-rule-text">
            <div className="lx-rule-app-name">{rule.app}</div>
            <div className="lx-rule-input-name">{rule.input}</div>
          </div>
          <span className="lx-rule-badge">{rule.badge}</span>
        </div>
      ))}
    </div>
  </div>
</section>
```

追加 i18n key：

```json
"landing.home.input.guide.link": {
  "message": "Setup guide for app and domain rules →"
}
```

- [ ] **Step 3: 在 Input Source section 之后插入 Comparison Table section**

```tsx
<section className="lx-section lx-reveal">
  <h2>
    <Translate id="landing.home.compare.title" description="Comparison table title">LinguaX vs Logi Options+: Mouse Enhancement for macOS</Translate>
  </h2>
  <p className="lx-section-desc">
    <Translate id="landing.home.compare.description" description="Comparison table description">How LinguaX compares to Logi Options+ and macOS built-in controls for third-party mice.</Translate>
  </p>
  <div className="lx-table-wrap">
    <table className="lx-table">
      <thead>
        <tr>
          <th><Translate id="landing.home.compare.col.feature" description="Compare col feature">Feature</Translate></th>
          <th><Translate id="landing.home.compare.col.lx" description="Compare col lx">LinguaX</Translate></th>
          <th><Translate id="landing.home.compare.col.logi" description="Compare col logi">Logi Options+</Translate></th>
          <th><Translate id="landing.home.compare.col.macos" description="Compare col macos">macOS Built-in</Translate></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Translate id="landing.home.compare.row1.feature" description="Compare row1 feature">Works with any third-party mouse</Translate></td>
          <td className="lx-cell-yes"><Translate id="landing.home.compare.row1.lx" description="Compare row1 lx">✓ Yes</Translate></td>
          <td className="lx-cell-partial"><Translate id="landing.home.compare.row1.logi" description="Compare row1 logi">Logitech only</Translate></td>
          <td className="lx-cell-partial"><Translate id="landing.home.compare.row1.macos" description="Compare row1 macos">Limited</Translate></td>
        </tr>
        <tr>
          <td><Translate id="landing.home.compare.row2.feature" description="Compare row2 feature">Smooth scrolling (tunable)</Translate></td>
          <td className="lx-cell-yes">✓ Yes</td>
          <td className="lx-cell-yes"><Translate id="landing.home.compare.row2.logi" description="Compare row2 logi">✓ Yes</Translate></td>
          <td className="lx-cell-no"><Translate id="landing.home.compare.row2.macos" description="Compare row2 macos">✗ No</Translate></td>
        </tr>
        <tr>
          <td><Translate id="landing.home.compare.row3.feature" description="Compare row3 feature">Per-app scroll override</Translate></td>
          <td className="lx-cell-yes">✓ Yes</td>
          <td className="lx-cell-partial"><Translate id="landing.home.compare.row3.logi" description="Compare row3 logi">Partial</Translate></td>
          <td className="lx-cell-no"><Translate id="landing.home.compare.row3.macos" description="Compare row3 macos">✗ No</Translate></td>
        </tr>
        <tr>
          <td><Translate id="landing.home.compare.row4.feature" description="Compare row4 feature">Side button to any action</Translate></td>
          <td className="lx-cell-yes">✓ Yes</td>
          <td className="lx-cell-yes">✓ Yes</td>
          <td className="lx-cell-no"><Translate id="landing.home.compare.row4.macos" description="Compare row4 macos">✗ No</Translate></td>
        </tr>
        <tr>
          <td><Translate id="landing.home.compare.row5.feature" description="Compare row5 feature">Push-to-talk voice input</Translate></td>
          <td className="lx-cell-yes">✓ Yes</td>
          <td className="lx-cell-no"><Translate id="landing.home.compare.row5.logi" description="Compare row5 logi">✗ No</Translate></td>
          <td className="lx-cell-no"><Translate id="landing.home.compare.row5.macos" description="Compare row5 macos">✗ No</Translate></td>
        </tr>
        <tr>
          <td><Translate id="landing.home.compare.row6.feature" description="Compare row6 feature">Input source automation</Translate></td>
          <td className="lx-cell-yes">✓ Yes</td>
          <td className="lx-cell-no"><Translate id="landing.home.compare.row6.logi" description="Compare row6 logi">✗ No</Translate></td>
          <td className="lx-cell-no"><Translate id="landing.home.compare.row6.macos" description="Compare row6 macos">✗ No</Translate></td>
        </tr>
        <tr>
          <td><Translate id="landing.home.compare.row7.feature" description="Compare row7 feature">Pricing</Translate></td>
          <td className="lx-cell-yes"><Translate id="landing.home.compare.row7.lx" description="Compare row7 lx">Free trial + $9.9 lifetime</Translate></td>
          <td><Translate id="landing.home.compare.row7.logi" description="Compare row7 logi">Free (Logitech only)</Translate></td>
          <td><Translate id="landing.home.compare.row7.macos" description="Compare row7 macos">Free (limited)</Translate></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

- [ ] **Step 4: 更新 Audience section — 新增第 4 条**

找到现有 Audience section（含 `landing.home.audience.item3` 的 `<ul>`），在 item3 之后追加：

```tsx
<li>
  <Translate id="landing.home.audience.item4" description="Audience item4">
    People who have tried Logi Options+ or macOS built-in controls and found them too limited or device-locked.
  </Translate>
</li>
```

- [ ] **Step 5: 替换 Popular Guides section 为卡片列表样式**

找到现有 Guides section（含 `landing.home.guides.title`），替换为：

```tsx
<section className="lx-section lx-reveal">
  <h2><Translate id="landing.home.guides.title" description="Home guides section title">Popular guides for real-world workflows</Translate></h2>
  <ul className="lx-guide-list">
    <li>
      <a className="lx-guide-link" href={pushToTalkGuideUrl}>
        🎙 <Translate id="landing.home.guides.item5" description="Home guide item 5">How to push-to-talk for voice typing with a mouse button</Translate>
        <span className="lx-guide-link-arrow">→</span>
      </a>
    </li>
    <li>
      <a className="lx-guide-link" href={smoothScrollGuideUrl}>
        〰️ <Translate id="landing.home.guides.item1" description="Home guide item 1">How to fix choppy mouse scrolling on macOS</Translate>
        <span className="lx-guide-link-arrow">→</span>
      </a>
    </li>
    <li>
      <a className="lx-guide-link" href={sideButtonGuideUrl}>
        🖱 <Translate id="landing.home.guides.item2" description="Home guide item 2">How to map mouse side buttons on macOS</Translate>
        <span className="lx-guide-link-arrow">→</span>
      </a>
    </li>
    <li>
      <a className="lx-guide-link" href={inputAutomationGuideUrl}>
        ⌨️ <Translate id="landing.home.guides.item4" description="Home guide item 4">How to auto switch input source by app and website domain</Translate>
        <span className="lx-guide-link-arrow">→</span>
      </a>
    </li>
    <li>
      <a className="lx-guide-link" href={logiAlternativeGuideUrl}>
        ⚖️ <Translate id="landing.home.guides.item3" description="Home guide item 3">How to evaluate a Logi Options+ alternative on macOS</Translate>
        <span className="lx-guide-link-arrow">→</span>
      </a>
    </li>
  </ul>
</section>
```

- [ ] **Step 6: 替换 Compatibility section — 缩减为 2 卡片**

找到现有 Compatibility section（3 卡片），替换为：

```tsx
<section className="lx-section lx-reveal">
  <h2><Translate id="landing.home.compat.title" description="Compatibility section title">Compatibility and privacy</Translate></h2>
  <div className="lx-grid lx-grid-3" style={{gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'}}>
    <article className="lx-card lx-stagger">
      <h3><Translate id="landing.home.compat.card1.title" description="Compatibility card1 title">Built for modern macOS</Translate></h3>
      <p><Translate id="landing.home.compat.card1.description" description="Compatibility card1 description">macOS 13+ on Apple Silicon and Intel. Runs as a menu bar background app. No driver install needed.</Translate></p>
    </article>
    <article className="lx-card lx-stagger">
      <h3><Translate id="landing.home.compat.card2.title" description="Compatibility card2 title">Local-first, diagnosable</Translate></h3>
      <p><Translate id="landing.home.compat.card2.description" description="Compatibility card2 description">All rules run locally. Optional iCloud sync. Built-in diagnostics and changelog-driven updates for long-term stability.</Translate></p>
    </article>
  </div>
</section>
```

- [ ] **Step 7: 更新 FAQ — 新增 Q5，更新 Q1**

找到现有 FAQ section，在最后一个 Q/A 对之后追加：

```tsx
<h3><Translate id="landing.home.faq.q5" description="Home FAQ question5">Does LinguaX work with any mouse, or only Logitech?</Translate></h3>
<p><Translate id="landing.home.faq.a5" description="Home FAQ answer5">Any USB or Bluetooth mouse. No brand restriction, no driver needed.</Translate></p>
```

同时更新 Q1 文案（找到含 `landing.home.faq.q1` 的节点，更新 i18n key message）：

在 `code.json` 中更新：
```json
"landing.home.faq.q1": {
  "message": "Is LinguaX mainly for mouse enhancement?"
},
"landing.home.faq.a1": {
  "message": "Yes. Mouse+ is the main focus — smooth scrolling, gesture/button mapping, and per-app overrides. Push-to-talk voice input and input source automation are included as companion features."
}
```

- [ ] **Step 8: TypeScript 检查 + 生产构建**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web && npx tsc --noEmit && npm run build
```

预期：TypeScript 无错误，build 成功，无 broken links 警告

- [ ] **Step 9: Commit**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web
git add src/pages/index.tsx i18n/en/code.json
git commit -m "feat(home): add Input Source section, comparison table, update audience/guides/compat/FAQ"
```

---

## Task 6: 定价页 — 内容增量更新

**Files:**
- Modify: `src/pages/pricing.tsx`
- Modify: `i18n/en/code.json`

- [ ] **Step 1: 追加定价页 i18n key**

```json
"landing.pricing.hero.title": {
  "message": "Try it in real work first. Upgrade when it sticks."
},
"landing.pricing.hero.description": {
  "message": "Start with a 30-day full-feature trial. If Mouse+ smooth scrolling, gesture mapping, and voice input fit your daily routine, upgrade once — $9.9, no subscription."
},
"landing.pricing.value.section.label": {
  "message": "What you're getting"
},
"landing.pricing.value.section.title": {
  "message": "Three things that justify the upgrade"
},
"landing.pricing.value.item1.icon": { "message": "🖱" },
"landing.pricing.value.item1.title": { "message": "Mouse feels right every day" },
"landing.pricing.value.item1.description": {
  "message": "Smooth scrolling and app-scoped button mapping that work consistently across all your apps."
},
"landing.pricing.value.item2.icon": { "message": "🎙" },
"landing.pricing.value.item2.title": { "message": "Voice input without a keyboard" },
"landing.pricing.value.item2.description": {
  "message": "Hold a side button to dictate. Release to stop. Works with macOS Dictation, Wispr Flow, superwhisper."
},
"landing.pricing.value.item3.icon": { "message": "⌨️" },
"landing.pricing.value.item3.title": { "message": "Input source switches itself" },
"landing.pricing.value.item3.description": {
  "message": "App and domain rules change your input method automatically. You stop thinking about it."
},
"landing.pricing.upgrade.hint": {
  "message": "When to upgrade: When LinguaX is already saving you real time in daily work and you want to keep that setup long-term."
},
"landing.pricing.feedback.strip.text": {
  "message": "If your feature feedback is accepted and shipped, we'll grant you a 1-year LinguaX license. Email us from the app."
}
```

- [ ] **Step 2: 更新 Hero H1 和副标题**

找到 pricing.tsx 中的 Hero section，更新 H1 和 `<p>` 内容：

将 `<h1>` 内的 `<Translate>` 改为：
```tsx
<h1>
  <Translate id="landing.pricing.hero.title" description="Pricing hero title">
    Try it in real work first. Upgrade when it sticks.
  </Translate>
</h1>
<p>
  <Translate id="landing.pricing.hero.description" description="Pricing hero description">
    Start with a 30-day full-feature trial. If Mouse+ smooth scrolling, gesture mapping, and voice input fit your daily routine, upgrade once — $9.9, no subscription.
  </Translate>
</p>
```

同时更新 `pageTitle` 和 `pageDescription`：
```tsx
const pageTitle = translate({
  id: 'landing.pricing.meta.title',
  message: 'LinguaX Pricing – Free Trial + $9.9 Lifetime, No Subscription',
  description: 'Pricing page title'
});
```

- [ ] **Step 3: 在 pricing section 之前插入 Three Value Points section**

找到 `<section className="lx-section lx-reveal">` 内含 `lx-pricing-grid` 的 section，在它之前插入：

```tsx
<section className="lx-section lx-reveal">
  <div className="lx-section-label">
    <Translate id="landing.pricing.value.section.label" description="Pricing value section label">What you're getting</Translate>
  </div>
  <h2>
    <Translate id="landing.pricing.value.section.title" description="Pricing value section title">Three things that justify the upgrade</Translate>
  </h2>
  <div className="lx-grid lx-grid-3">
    <div className="lx-value-item lx-stagger">
      <span className="lx-value-icon">🖱</span>
      <h4><Translate id="landing.pricing.value.item1.title" description="Pricing value item1 title">Mouse feels right every day</Translate></h4>
      <p><Translate id="landing.pricing.value.item1.description" description="Pricing value item1 description">Smooth scrolling and app-scoped button mapping that work consistently across all your apps.</Translate></p>
    </div>
    <div className="lx-value-item lx-stagger">
      <span className="lx-value-icon">🎙</span>
      <h4><Translate id="landing.pricing.value.item2.title" description="Pricing value item2 title">Voice input without a keyboard</Translate></h4>
      <p><Translate id="landing.pricing.value.item2.description" description="Pricing value item2 description">Hold a side button to dictate. Release to stop. Works with macOS Dictation, Wispr Flow, superwhisper.</Translate></p>
    </div>
    <div className="lx-value-item lx-stagger">
      <span className="lx-value-icon">⌨️</span>
      <h4><Translate id="landing.pricing.value.item3.title" description="Pricing value item3 title">Input source switches itself</Translate></h4>
      <p><Translate id="landing.pricing.value.item3.description" description="Pricing value item3 description">App and domain rules change your input method automatically. You stop thinking about it.</Translate></p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: 在 Lifetime plan card 的购买按钮之后添加 upgrade hint**

找到 Lifetime plan card（`lx-plan-featured`），在 `<button>` 之后追加：

```tsx
<div className="lx-upgrade-hint">
  <Translate id="landing.pricing.upgrade.hint" description="Pricing upgrade hint">
    When to upgrade: When LinguaX is already saving you real time in daily work and you want to keep that setup long-term.
  </Translate>
</div>
```

- [ ] **Step 5: 精简 Feature Comparison Table**

找到现有的 Feature Comparison Table section，替换 `<tbody>` 内容为以下分组结构（保留 `<thead>`、`<table>` 结构不变）：

```tsx
<tbody>
  <tr>
    <td colSpan={3} style={{fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em', background: 'var(--lx-bg-soft)', color: 'var(--lx-muted)'}}>Mouse+</td>
  </tr>
  <tr><td><Translate id="landing.pricing.comparison.mouse.smooth" description="Comparison mouse smooth">Smooth scrolling (tunable)</Translate></td><td>✓ Full</td><td>✓ Full</td></tr>
  <tr><td><Translate id="landing.pricing.comparison.mouse.mapping" description="Comparison mouse mapping">Button &amp; gesture mapping</Translate></td><td>✓ Full</td><td>✓ Full</td></tr>
  <tr><td><Translate id="landing.pricing.comparison.mouse.override" description="Comparison mouse override">App-scoped overrides</Translate></td><td>✓ Full</td><td>✓ Full</td></tr>
  <tr><td><Translate id="landing.pricing.comparison.mouse.ptt" description="Comparison mouse ptt">Push-to-talk voice input</Translate></td><td>✓ Full</td><td>✓ Full</td></tr>
  <tr>
    <td colSpan={3} style={{fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em', background: 'var(--lx-bg-soft)', color: 'var(--lx-muted)'}}>Automation &amp; Actions</td>
  </tr>
  <tr><td><Translate id="landing.pricing.comparison.auto.app" description="Comparison auto app">App rules (unlimited)</Translate></td><td>✓</td><td>✓</td></tr>
  <tr><td><Translate id="landing.pricing.comparison.auto.domain" description="Comparison auto domain">Domain rules (browser)</Translate></td><td>✓</td><td>✓</td></tr>
  <tr><td><Translate id="landing.pricing.comparison.auto.shortcut" description="Comparison auto shortcut">Shortcut action mapping</Translate></td><td>✓</td><td>✓</td></tr>
  <tr>
    <td colSpan={3} style={{fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em', background: 'var(--lx-bg-soft)', color: 'var(--lx-muted)'}}>License</td>
  </tr>
  <tr><td><Translate id="landing.pricing.comparison.license.duration" description="Comparison license duration">Duration</Translate></td><td style={{color: 'var(--lx-muted)'}}>30 days</td><td><Translate id="landing.pricing.comparison.license.lifetime" description="Comparison license lifetime">Lifetime</Translate></td></tr>
  <tr><td><Translate id="landing.pricing.comparison.license.macs" description="Comparison license macs">Macs per license</Translate></td><td style={{color: 'var(--lx-muted)'}}>1</td><td><Translate id="landing.pricing.comparison.license.macs.lifetime" description="Comparison license macs lifetime">Up to 3</Translate></td></tr>
  <tr><td><Translate id="landing.pricing.comparison.license.payment" description="Comparison license payment">Payment</Translate></td><td style={{color: 'var(--lx-muted)'}}>Free</td><td>$9.9 one-time</td></tr>
  <tr><td><Translate id="landing.pricing.comparison.license.refund" description="Comparison license refund">Refund window</Translate></td><td style={{color: 'var(--lx-muted)'}}>—</td><td><Translate id="landing.pricing.comparison.license.refund.value" description="Comparison refund value">3 days, no-questions</Translate></td></tr>
</tbody>
```

同时追加 i18n keys：

```json
"landing.pricing.comparison.mouse.smooth": { "message": "Smooth scrolling (tunable)" },
"landing.pricing.comparison.mouse.mapping": { "message": "Button & gesture mapping" },
"landing.pricing.comparison.mouse.override": { "message": "App-scoped overrides" },
"landing.pricing.comparison.mouse.ptt": { "message": "Push-to-talk voice input" },
"landing.pricing.comparison.auto.app": { "message": "App rules (unlimited)" },
"landing.pricing.comparison.auto.domain": { "message": "Domain rules (browser)" },
"landing.pricing.comparison.auto.shortcut": { "message": "Shortcut action mapping" },
"landing.pricing.comparison.license.duration": { "message": "Duration" },
"landing.pricing.comparison.license.lifetime": { "message": "Lifetime" },
"landing.pricing.comparison.license.macs": { "message": "Macs per license" },
"landing.pricing.comparison.license.macs.lifetime": { "message": "Up to 3" },
"landing.pricing.comparison.license.payment": { "message": "Payment" },
"landing.pricing.comparison.license.refund": { "message": "Refund window" },
"landing.pricing.comparison.license.refund.value": { "message": "3 days, no-questions" }
```

- [ ] **Step 6: 在 What You're Paying For section 末尾添加 Feedback Reward Strip**

找到 `landing.pricing.value.title` 的 section，在 `lx-grid-3` 之后追加：

```tsx
<div className="lx-feedback-strip">
  <span className="lx-feedback-strip-icon">🎁</span>
  <div className="lx-feedback-strip-text">
    <strong>
      <Translate id="landing.pricing.feedback.strip.label" description="Pricing feedback strip label">Feedback reward:</Translate>
    </strong>
    {' '}
    <Translate id="landing.pricing.feedback.strip.text" description="Pricing feedback strip text">If your feature feedback is accepted and shipped, we'll grant you a 1-year LinguaX license. Email us from the app.</Translate>
  </div>
</div>
```

追加 i18n key：
```json
"landing.pricing.feedback.strip.label": { "message": "Feedback reward:" }
```

- [ ] **Step 7: 替换 Guides section 为卡片列表样式**

找到 Pricing 页中的 Guides section，将 `<ul className="lx-list">` 替换为：

```tsx
<ul className="lx-guide-list">
  <li>
    <a className="lx-guide-link" href={smoothScrollGuideUrl}>
      〰️ <Translate id="landing.pricing.guides.item1" description="Pricing guide item 1">Fix choppy mouse scrolling on macOS</Translate>
      <span className="lx-guide-link-arrow">→</span>
    </a>
  </li>
  <li>
    <a className="lx-guide-link" href={logiAlternativeGuideUrl}>
      ⚖️ <Translate id="landing.pricing.guides.item2" description="Pricing guide item 2">Evaluate Logi Options+ alternatives</Translate>
      <span className="lx-guide-link-arrow">→</span>
    </a>
  </li>
  <li>
    <a className="lx-guide-link" href={inputAutomationGuideUrl}>
      ⌨️ <Translate id="landing.pricing.guides.item3" description="Pricing guide item 3">Set up app/domain input automation</Translate>
      <span className="lx-guide-link-arrow">→</span>
    </a>
  </li>
</ul>
```

- [ ] **Step 8: TypeScript 检查 + 生产构建**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web && npx tsc --noEmit && npm run build
```

- [ ] **Step 9: Commit**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web
git add src/pages/pricing.tsx i18n/en/code.json
git commit -m "feat(pricing): add value points, upgrade hint, feedback strip, simplify comparison table"
```

---

## Task 7: 下载页 — 内容增量更新

**Files:**
- Modify: `src/pages/download.tsx`
- Modify: `i18n/en/code.json`

- [ ] **Step 1: 追加下载页 i18n key**

```json
"landing.download.hero.title": {
  "message": "Download starts automatically. Here's what to do next."
},
"landing.download.hero.description": {
  "message": "If it doesn't start, use the button below. Set up takes under 10 minutes — start with smooth scrolling and one mouse button mapping."
},
"landing.download.compat.strip.label": {
  "message": "Requires:"
},
"landing.download.compat.item1": { "message": "macOS 13 Ventura or later" },
"landing.download.compat.item2": { "message": "Apple Silicon or Intel" },
"landing.download.compat.item3": { "message": "Accessibility permission" },
"landing.download.compat.item4": { "message": "Input Monitoring permission" },
"landing.download.onboard.section.label": { "message": "First session" },
"landing.download.onboard.title": { "message": "Your first 10 minutes" },
"landing.download.onboard.description": {
  "message": "Don't try to configure everything at once. Start small and add layers."
},
"landing.download.onboard.card1.title": { "message": "Enable smooth scrolling" },
"landing.download.onboard.card1.description": {
  "message": "Go to Mouse+ and turn on smooth scrolling. Adjust the curve until scrolling feels right in your main app."
},
"landing.download.onboard.card1.tag": { "message": "Mouse+ tab" },
"landing.download.onboard.card2.title": { "message": "Map one side button" },
"landing.download.onboard.card2.description": {
  "message": "Pick the action you'd use most: push-to-talk, app launch, or a system shortcut. One button is enough to start."
},
"landing.download.onboard.card2.tag": { "message": "Mouse+ → Mapping" },
"landing.download.onboard.card3.title": { "message": "Add your first rule" },
"landing.download.onboard.card3.description": {
  "message": "Set one app rule and one domain rule. LinguaX will switch your input source automatically."
},
"landing.download.onboard.card3.tag": { "message": "Mapping tab" },
"landing.download.nudge.text": {
  "message": "Using LinguaX daily after 30 days? Upgrade to Lifetime to keep your setup running. One-time, no subscription."
},
"landing.download.nudge.price": { "message": "$9.9" },
"landing.download.nudge.period": { "message": "once" },
"landing.download.nudge.cta": { "message": "Upgrade to Lifetime" }
```

- [ ] **Step 2: 更新 Hero H1、副标题、meta title**

找到 download.tsx 中的 Hero，更新：

```tsx
const pageTitle = translate({
  id: 'landing.download.meta.title',
  message: 'Download LinguaX for macOS – Free Trial, Mouse Enhancement & Input Automation',
  description: 'Download page title'
});
```

替换 `<h1>` 为：

```tsx
<h1>
  <Translate id="landing.download.hero.title" description="Download hero title">
    Download starts automatically. Here's what to do next.
  </Translate>
</h1>
<p>
  <Translate id="landing.download.hero.description" description="Download hero description">
    If it doesn't start, use the button below. Set up takes under 10 minutes — start with smooth scrolling and one mouse button mapping.
  </Translate>
  {releaseInfo?.version ? ` ${translate({
    id: 'landing.download.hero.versionPrefix',
    message: 'Latest version:',
    description: 'Version prefix on download page'
  })} v${releaseInfo.version}.` : ''}
  {' '}
  <a href={changelogUrl}>
    <Translate id="landing.download.hero.changelog" description="Download changelog link">See latest changelog</Translate>
  </a>
</p>
```

- [ ] **Step 3: 在 Install Guide section 末尾追加兼容性小条**

找到 `lx-install-guide` section，在 `</section>` 之前追加：

```tsx
<div className="lx-compat-strip">
  <span style={{fontWeight: 700, color: 'var(--lx-title)', fontSize: '12px'}}>
    <Translate id="landing.download.compat.strip.label" description="Download compat strip label">Requires:</Translate>
  </span>
  {[
    { id: 'landing.download.compat.item1', msg: 'macOS 13 Ventura or later' },
    { id: 'landing.download.compat.item2', msg: 'Apple Silicon or Intel' },
    { id: 'landing.download.compat.item3', msg: 'Accessibility permission' },
    { id: 'landing.download.compat.item4', msg: 'Input Monitoring permission' },
  ].map((item) => (
    <div key={item.id} className="lx-compat-strip-item">
      <span className="lx-compat-dot" />
      <Translate id={item.id} description={`Download compat ${item.id}`}>{item.msg}</Translate>
    </div>
  ))}
</div>
```

- [ ] **Step 4: 在 Install Guide section 之后插入 First 10 Minutes section**

```tsx
<section className="lx-section lx-reveal">
  <div className="lx-section-label">
    <Translate id="landing.download.onboard.section.label" description="Download onboard label">First session</Translate>
  </div>
  <h2>
    <Translate id="landing.download.onboard.title" description="Download onboard title">Your first 10 minutes</Translate>
  </h2>
  <p style={{color: 'var(--lx-muted)', fontSize: '14px', marginBottom: '16px'}}>
    <Translate id="landing.download.onboard.description" description="Download onboard description">Don't try to configure everything at once. Start small and add layers.</Translate>
  </p>
  <div className="lx-onboard-grid">
    <div className="lx-onboard-card lx-stagger">
      <div className="lx-onboard-num">1</div>
      <h4><Translate id="landing.download.onboard.card1.title" description="Download onboard card1 title">Enable smooth scrolling</Translate></h4>
      <p><Translate id="landing.download.onboard.card1.description" description="Download onboard card1 description">Go to Mouse+ and turn on smooth scrolling. Adjust the curve until scrolling feels right in your main app.</Translate></p>
      <span className="lx-onboard-tag"><Translate id="landing.download.onboard.card1.tag" description="Download onboard card1 tag">Mouse+ tab</Translate></span>
    </div>
    <div className="lx-onboard-card lx-stagger">
      <div className="lx-onboard-num">2</div>
      <h4><Translate id="landing.download.onboard.card2.title" description="Download onboard card2 title">Map one side button</Translate></h4>
      <p><Translate id="landing.download.onboard.card2.description" description="Download onboard card2 description">Pick the action you'd use most: push-to-talk, app launch, or a system shortcut. One button is enough to start.</Translate></p>
      <span className="lx-onboard-tag"><Translate id="landing.download.onboard.card2.tag" description="Download onboard card2 tag">Mouse+ → Mapping</Translate></span>
    </div>
    <div className="lx-onboard-card lx-stagger">
      <div className="lx-onboard-num">3</div>
      <h4><Translate id="landing.download.onboard.card3.title" description="Download onboard card3 title">Add your first rule</Translate></h4>
      <p><Translate id="landing.download.onboard.card3.description" description="Download onboard card3 description">Set one app rule and one domain rule. LinguaX will switch your input source automatically.</Translate></p>
      <span className="lx-onboard-tag"><Translate id="landing.download.onboard.card3.tag" description="Download onboard card3 tag">Mapping tab</Translate></span>
    </div>
  </div>
</section>
```

- [ ] **Step 5: 更新 Guides section — 补充 PTT 条目，改卡片列表样式**

找到 Download 页 Guides section，将 `<ul className="lx-list">` 替换为：

```tsx
<ul className="lx-guide-list">
  <li>
    <a className="lx-guide-link" href={smoothScrollGuideUrl}>
      〰️ <Translate id="landing.download.guides.item1" description="Download guide item 1">Fix choppy mouse scrolling on macOS</Translate>
      <span className="lx-guide-link-arrow">→</span>
    </a>
  </li>
  <li>
    <a className="lx-guide-link" href={sideButtonGuideUrl}>
      🖱 <Translate id="landing.download.guides.item2" description="Download guide item 2">Map mouse side buttons on macOS</Translate>
      <span className="lx-guide-link-arrow">→</span>
    </a>
  </li>
  <li>
    <a className="lx-guide-link" href={useBaseUrl('/docs/use-cases/push-to-talk-voice-typing-mac')}>
      🎙 <Translate id="landing.download.guides.item3" description="Download guide item 3">Set up push-to-talk voice typing with a mouse button</Translate>
      <span className="lx-guide-link-arrow">→</span>
    </a>
  </li>
  <li>
    <a className="lx-guide-link" href={inputAutomationGuideUrl}>
      ⌨️ <Translate id="landing.download.guides.item4" description="Download guide item 4">Auto switch input source by app and domain</Translate>
      <span className="lx-guide-link-arrow">→</span>
    </a>
  </li>
</ul>
```

注意：`landing.download.guides.item3` 原先是 side button guide，现在改为 PTT。如果旧 key 值已不同，直接更新 code.json 中对应 message。`landing.download.guides.item4` 是新增 key，追加到 code.json：

```json
"landing.download.guides.item3": {
  "message": "Set up push-to-talk voice typing with a mouse button"
},
"landing.download.guides.item4": {
  "message": "Auto switch input source by app and domain"
}
```

- [ ] **Step 6: 在 Guides section 之后追加 Pricing Nudge**

在文件最后一个 `</section>` 之前（Guides section 之后）插入：

```tsx
<section className="lx-section lx-reveal">
  <div className="lx-pricing-nudge">
    <div className="lx-pricing-nudge-text">
      <Translate id="landing.download.nudge.text" description="Download pricing nudge text">
        Using LinguaX daily after 30 days? Upgrade to Lifetime to keep your setup running. One-time, no subscription.
      </Translate>
    </div>
    <div style={{textAlign: 'center', flexShrink: 0}}>
      <div className="lx-pricing-nudge-price">
        <Translate id="landing.download.nudge.price" description="Download nudge price">$9.9</Translate>
        <span><Translate id="landing.download.nudge.period" description="Download nudge period">once</Translate></span>
      </div>
      <button className="lx-btn lx-btn-primary" type="button" onClick={handlePurchase} style={{marginTop: '8px', fontSize: '13px', padding: '9px 16px', display: 'block', width: '100%'}}>
        <Translate id="landing.download.nudge.cta" description="Download nudge cta">Upgrade to Lifetime</Translate>
      </button>
    </div>
  </div>
</section>
```

注意：`handlePurchase` 函数在 download.tsx 中不存在（仅 pricing.tsx 有）。此处改为跳转到 pricing 页：

```tsx
<a className="lx-btn lx-btn-primary" href={pricingUrl} style={{marginTop: '8px', fontSize: '13px', padding: '9px 16px', display: 'block', width: '100%', textAlign: 'center'}}>
  <Translate id="landing.download.nudge.cta" description="Download nudge cta">Upgrade to Lifetime</Translate>
</a>
```

确认 `pricingUrl` 已在 download.tsx 顶部通过 `useBaseUrl('/pricing')` 定义（现有代码中已有）。

- [ ] **Step 7: TypeScript 检查 + 生产构建**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web && npx tsc --noEmit && npm run build
```

预期：TypeScript 无错误，build 成功

- [ ] **Step 8: Commit**

```bash
cd /Users/henry.chen/go/src/xiaopozhu/linguax-web
git add src/pages/download.tsx i18n/en/code.json
git commit -m "feat(download): rewrite hero, add onboard guide, pricing nudge, update guides"
```

---

## Self-Review

**Spec coverage 检查：**

| 设计要求 | 覆盖 Task |
|---|---|
| Hero H1 品牌语言 | Task 2 |
| Feature Pills | Task 2 |
| GEO Proof Blocks (1/2/3) | Task 2（1、2）/ Task 4（3）|
| Mouse+ 独立大区块 + 子功能卡 + 截图 | Task 3 |
| Mouse+ 内链锚文本 | Task 3 |
| PTT 专属区块 + 三步 + 兼容标签 | Task 4 |
| PTT 内链锚文本 | Task 4 |
| Input Source 降级 + 内链 | Task 5 |
| Competitor Comparison Table | Task 5 |
| Audience item4 (Logi users) | Task 5 |
| Guides 卡片列表样式 | Task 5 |
| Compatibility 缩减为 2 卡片 | Task 5 |
| FAQ Q5 新增 | Task 5 |
| meta title SEO Method Y (首页) | Task 2 |
| H2 关键词覆盖 (首页) | Task 3/4/5 |
| 定价页 Three Value Points | Task 6 |
| 定价页 Upgrade Hint | Task 6 |
| 定价页 Comparison Table 精简 | Task 6 |
| 定价页 Feedback Strip | Task 6 |
| 定价页 Guides 卡片样式 | Task 6 |
| 定价页 meta title | Task 6 |
| 下载页 Hero 改写 | Task 7 |
| 下载页 Compat Strip | Task 7 |
| 下载页 First 10 Minutes | Task 7 |
| 下载页 Guides + PTT 条目 | Task 7 |
| 下载页 Pricing Nudge | Task 7 |
| 下载页 meta title | Task 7 |
| 所有新 CSS 类 | Task 1 |

**无遗漏，无 placeholder，无 TBD。**
