# 鼠标型号落地页 + Web 配对工具 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按 spec `2026-07-14-mouse-model-landing-and-pairing-tool-design.md` 交付两条并行 track：(A) 8 个 P0 鼠标型号 Mac 落地页 + 索引升级；(B) 浏览器 WebHID 配对工具（Bolt / Unifying / Lightspeed），embed 到型号页顶部。

**Architecture:** Track A 只写 markdown + 一个共享 `<PairingWidget />` 占位组件（只渲染 SafariFallback），先跑 SEO。Track B 造真 WebHID 组件，最后一步 swap 掉 A 的占位物。两条 track 通过 `src/components/PairingWidget/index.tsx` 这一个文件对接；A 交付时它是占位，B 交付时它变真。

**Tech Stack:** Docusaurus 3.8.1 / React 19 / TypeScript / CSS Modules（跟随 pricing.module.css 风格）。无测试框架 — 验证 = `npm run typecheck` + `npm run build` + `npm run start` 手工走查 + 一个 Node 验收脚本（`scripts/check-model-pages.mjs`）。

## Global Constraints（来自 spec §5.4 / §8）

- **每页 markdown**：title 50-60 字符；description ≤ 120 字符；正文 ≥ 800 词；≥ 3 个 H2；≥ 5 个内链；1 段 FAQ schema JSON-LD
- **URL 规范**：`docs/mouse-plus/models/<slug>`，slug 用 kebab-case，**不带 `-mac` 后缀**
- **No i18n**（跟随 English-first；`i18n/*/code.json` 不改）
- **clean-room 实现**（Track B）：只读 HID++ 官方规范 + fwupd `logitech-hidpp` plugin 的**规范定义部分**（常量 / 报文结构 / 状态码），不复制实现代码；禁止查看 Solaar 源码；每个 HID++ 命令 ID 注释中标注参考来源
- **无罗技商标使用**：不用 logo / 品牌字体 / 品牌色；型号名做 nominative fair use 允许
- **免责声明**：工具页页脚固定文案 `Not affiliated with or endorsed by Logitech. "Logitech", "MX Master", "Bolt", "Unifying", "Lightspeed" are trademarks of Logitech International SA, used descriptively for compatibility.`
- **Kill Switch**：`process.env.PAIRING_TOOL_ENABLED`，默认 `true`；false 时 Widget 直接渲染 SafariFallback（不论浏览器）
- **SSG 安全**：所有 WebHID 代码只在 client 侧执行；用 `useEffect` 或 `React.lazy` 隔离
- **Commit 风格**：`docs(models): …` / `feat(pairing): …` / `feat(mouse): …`，带 `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` trailer

---

## File Structure

| 文件 | 动作 | 责任 |
|---|---|---|
| `docs/mouse-plus/models/_category_.json` | Create | sidebar 子分类元数据 |
| `docs/mouse-plus/models/<8 个 P0 slug>.md` | Create | 型号落地页 |
| `docs/mouse-plus/device-compatibility.md` | Modify | 升级为「Compatible Mouse Models」索引，加 Receiver 列，型号名做内链 |
| `sidebars.ts` | Modify | Mouse+ category 下加 `mouse-plus/models` 子分类 |
| `scripts/check-model-pages.mjs` | Create | 型号页验收脚本（frontmatter / 字符数 / 内链数 / H2 数） |
| `package.json` | Modify | 加 `"test:model-pages": "node scripts/check-model-pages.mjs"` |
| `src/components/PairingWidget/index.tsx` | Create → Modify（B 阶段） | Widget 入口；A 阶段只渲染 SafariFallback，B 阶段接入真组件 |
| `src/components/PairingWidget/SafariFallback.tsx` | Create | 降级 CTA UI |
| `src/components/PairingWidget/PairingWidget.module.css` | Create | Widget 样式 |
| `src/components/PairingWidget/BrowserGate.tsx` | Create（B 阶段） | 检测 navigator.hid + Kill Switch flag |
| `src/components/PairingWidget/protocol/hidpp.ts` | Create（B 阶段） | 协议核心：报文编解码、常量、feature ID |
| `src/components/PairingWidget/protocol/receiver-adapter.ts` | Create（B 阶段） | 适配器接口 + 工厂 |
| `src/components/PairingWidget/protocol/receiver-{bolt,unifying,lightspeed}.ts` | Create（B 阶段） | 三种 receiver 实现 |
| `src/components/PairingWidget/ui/PairFlow.tsx` | Create（B 阶段） | 配对流程 UI |
| `src/components/PairingWidget/ui/PairedList.tsx` + `UnpairAction.tsx` | Create（B 阶段） | 已配对列表 + 解绑 |
| `src/pages/tools/pair-logitech-receiver.tsx` | Create（B 阶段） | 独立工具页 |
| `docusaurus.config.ts` | Modify（B 阶段） | 加 `customFields.pairingToolEnabled` 读环境变量 |
| `assets/qa/pairing-compat.md` | Create（B 阶段） | 真机兼容性测试记录 |

---

## Track A — 内容（12 tasks）

### A0：目录 / sidebar / 类别配置

**Files:** `docs/mouse-plus/models/_category_.json` (create) + `sidebars.ts` (modify)

- [ ] 创建 `docs/mouse-plus/models/_category_.json`，`label: "Compatible Models"`, `position: 8`, `collapsed: true`
- [ ] `sidebars.ts` 在 Mouse+ category 内、`device-compatibility` 之后加 `{ type: 'category', label: 'Compatible Models', link: { type: 'doc', id: 'mouse-plus/device-compatibility' }, items: [...8 个 slug 待补...] }`（先留空 items，A4-A11 时逐个补入）
- [ ] `npm run build` 通过
- [ ] Commit: `docs(models): scaffold Compatible Models sidebar category`

### A1：型号页验收脚本

**Files:** `scripts/check-model-pages.mjs` (create) + `package.json` (modify)

- [ ] `scripts/check-model-pages.mjs`：遍历 `docs/mouse-plus/models/*.md`，检查 frontmatter (title/description/keywords/sidebar_label)，正文字符/词数、H2 数、内链数、FAQ schema 存在性；违反打印 `[FAIL] <file>: <reason>` 并 exit 1
- [ ] `package.json` 加 `"test:model-pages": "node scripts/check-model-pages.mjs"`
- [ ] 手动执行 `npm run test:model-pages`，空 models 目录时应 exit 0
- [ ] Commit: `chore(scripts): add model-pages acceptance check`

### A2：PairingWidget 占位组件 + SafariFallback

**Files:** 3 个新文件

- [ ] `src/components/PairingWidget/SafariFallback.tsx`：CTA UI，主标题 "Pairing not available in this browser"，副标 "Install LinguaX (macOS) — it handles first-time pairing natively."，主按钮 [Download LinguaX] 链到 `/download`，次按钮 [Learn more] 链到 `/tools/pair-logitech-receiver`（此时该路由尚不存在，Docusaurus onBrokenLinks: warn 允许）
- [ ] `src/components/PairingWidget/PairingWidget.module.css`：容器 + 主/次按钮样式，用 `--lx-*` CSS vars
- [ ] `src/components/PairingWidget/index.tsx`：接受 `{ receiverHint?, compact? }` props（此阶段忽略），默认 export；内部**只**渲染 `<SafariFallback />`，注释 `// TODO(Plan B): 替换为 BrowserGate → PairFlow 组合`
- [ ] `npm run typecheck` + `npm run build` 通过
- [ ] Commit: `feat(pairing): add PairingWidget placeholder with Safari fallback`

### A3：升级 device-compatibility.md 为索引

**Files:** `docs/mouse-plus/device-compatibility.md` (modify)

- [ ] H1 保持 "Device Compatibility"（改标题会伤 SEO），在开头段后加一段 "See per-model deep-dive guides in [Compatible Models](./models)" 内链引导
- [ ] 已有列表内每个已支持型号名替换为对内链 `[MX Master 3S](models/mx-master-3s)`（8 个 P0 型号先建链，其余保持纯文本；后续 P1 页面上线时再补）
- [ ] 新增一小节 "Receiver families we cover" 简述 Bolt / Unifying / Lightspeed / Bluetooth 各家的定位
- [ ] 保留 "Compared to Logi Options+" 和 "Related Docs" 段
- [ ] `npm run build` 通过（`onBrokenLinks: warn` 允许尚未创建的 model 页面）
- [ ] Commit: `docs(mouse-plus): upgrade device-compatibility as models index`

### A4：MX Master 3S 页（模板 dogfood）

**Files:** `docs/mouse-plus/models/mx-master-3s.md` (create)

- [ ] 按 spec §4.2 模板写完整页面：
  - Frontmatter：title = `"MX Master 3S on Mac: Side Buttons, Push-to-Talk & Spaces with LinguaX"`（60 字符内），keywords 覆盖 `mx master 3s mac`, `mx master 3s button mapping mac`, `mx master 3s push to talk mac`, `mx master 3s not working mac`
  - Hero + `<PairingWidget receiverHint="bolt" compact />`
  - "What You Can Actually Map" — 用 named slots (Side 1-4 / WL / WR / T / SM)
  - "What Options+ Can't Do Here" — push-to-talk / gesture / app-scoped overrides
  - "Three Ready-to-Copy Setups" — push-to-talk / space 切换 / app 切换输入法
  - "Setup in 3 Minutes" — 链到 `/docs/getting-started/installation`
  - FAQ + JSON-LD schema
  - "Related Models"（暂链到自己 slug 空占位，A5-A11 完成后补正）
- [ ] `sidebars.ts` 补入 `mouse-plus/models/mx-master-3s`
- [ ] `npm run test:model-pages` 通过
- [ ] `npm run build` 通过
- [ ] Commit: `docs(models): add MX Master 3S landing page`

### A5-A11：其余 7 个 P0 型号页

复用 A4 模板逐个交付。每 task 结构相同（下面用 A5 展示，A6-A11 同）：

**A5:** MX Master 3 (`receiverHint="bolt"`) — 强调"MX Master 3 owners still get full LinguaX support without the newer 3S"

**A6:** MX Anywhere 3S (`receiverHint="bolt"`) — 便携办公，侧键少但 Thumb + WL/WR 仍能出花

**A7:** MX Anywhere 3 (`receiverHint="bolt"`)

**A8:** Logitech G Pro X Superlight (`receiverHint="lightspeed"`) — 游戏鼠标做办公 mapping，Options+ 完全不管这类

**A9:** Logitech G Pro X Superlight 2 (`receiverHint="lightspeed"`)

**A10:** Logi Lift (`receiverHint="bolt"`) — 人体工学，Thumb button 存在感强

**A11:** MX Ergo (`receiverHint="bolt"`) — 轨迹球独家 push-to-talk 场景

每个 task：
- [ ] 创建 markdown 文件
- [ ] 补 `sidebars.ts` items
- [ ] 完善 A4 页面 Related Models 内链
- [ ] `npm run test:model-pages` 通过
- [ ] Commit: `docs(models): add <型号> landing page`

### A12：Sitemap 验收 + push 上线

- [ ] `npm run build`，检查 `build/sitemap.xml` 含 8 个新 URL
- [ ] `npm run test:model-pages` 全绿
- [ ] `git push origin master`（Cloudflare Pages 自动部署）
- [ ] 手动访问 `https://linguax.app/docs/mouse-plus/models/mx-master-3s` 确认渲染
- [ ] 提交 GSC 索引请求（人工步骤，标记完成）

---

## Track B — 工具（13 tasks）

### B0：测试与目录基础

**Files:** `src/components/PairingWidget/protocol/` 目录 + `assets/qa/pairing-compat.md`

- [ ] 创建 protocol 子目录
- [ ] 创建 `assets/qa/pairing-compat.md`：真机测试记录模板（columns: Model / Receiver / Browser / OS / Result / Notes / Tester / Date）
- [ ] 决定测试策略：本项目**无测试框架**（参考 A1 手法 = Node 脚本手工验证）；协议层单测用 `scripts/test-hidpp.mjs` 一样的思路
- [ ] Commit: `chore(pairing): scaffold protocol module + qa log`

### B1：HID++ 核心协议层

**Files:** `src/components/PairingWidget/protocol/hidpp.ts` (create) + `scripts/test-hidpp.mjs` (create)

- [ ] `hidpp.ts`：
  - 常量：`REPORT_ID_SHORT = 0x10`, `REPORT_ID_LONG = 0x11`, `SHORT_LEN = 7`, `LONG_LEN = 20`（每个常量 `// ref: HID++ 2.0 spec §2.1` 或 `// ref: fwupd libfwupdplugin/logitech-hidpp-README.html`）
  - Feature IDs：`FEATURE_ROOT = 0x0000`, `FEATURE_RECEIVER_PAIRING = ...`（补齐 Bolt/Unifying/Lightspeed 各家用到的）
  - `encodeShort(deviceIdx, subId, params)` / `encodeLong(...)` / `decode(bytes)` 函数
- [ ] `scripts/test-hidpp.mjs`：Node 脚本，跑 encode/decode round-trip 至少 5 组，失败 exit 1
- [ ] `npm run typecheck` 通过；`node scripts/test-hidpp.mjs` 通过
- [ ] Commit: `feat(pairing): add HID++ protocol core with clean-room references`

### B2：Receiver adapter 接口

**Files:** `src/components/PairingWidget/protocol/receiver-adapter.ts` (create)

- [ ] 定义 `PairedDevice` type：`{ index: number, name: string, wpid: string, kind: 'mouse'|'keyboard'|'other' }`
- [ ] 定义 `ReceiverAdapter` interface：`startPairing(timeoutMs: number): Promise<PairedDevice>`, `listPaired(): Promise<PairedDevice[]>`, `unpair(index: number): Promise<void>`
- [ ] `createAdapter(device: HIDDevice): ReceiverAdapter | null`：按 `device.productId` 分派（Bolt / Unifying / Lightspeed），未识别返回 null
- [ ] Commit: `feat(pairing): define receiver adapter interface`

### B3：Bolt adapter

**Files:** `src/components/PairingWidget/protocol/receiver-bolt.ts` (create)

- [ ] Bolt receiver productId 集：`[0xC548]`（根据 fwupd 补齐）
- [ ] 实现三个方法：`startPairing` 发送 pairing-mode enter 命令 + poll `deviceConnection` 事件；`listPaired` 遍历 slot；`unpair` 发送 unpair 命令
- [ ] 每个 sub_id 注释源
- [ ] Commit: `feat(pairing): implement Bolt receiver adapter`

### B4：Unifying adapter

**Files:** `src/components/PairingWidget/protocol/receiver-unifying.ts` (create)

- [ ] Unifying receiver productId：`[0xC52B, 0xC532]`
- [ ] 同 B3 结构；Unifying 命令与 Bolt 有微妙差异（e.g. pairing sequence timeout）—依 HID++ 1.0 规范
- [ ] Commit: `feat(pairing): implement Unifying receiver adapter`

### B5：Lightspeed adapter

**Files:** `src/components/PairingWidget/protocol/receiver-lightspeed.ts` (create)

- [ ] Lightspeed productId 集（G 系列）
- [ ] v1 只做 `startPairing`（re-pair 已知设备）+ `listPaired` + `unpair`；不做 dongle 替换 / firmware
- [ ] 文档 `// v1 scope: re-pairing only; dongle replacement out of scope`
- [ ] Commit: `feat(pairing): implement Lightspeed receiver adapter (v1: re-pair only)`

### B6：BrowserGate + Kill Switch

**Files:** `src/components/PairingWidget/BrowserGate.tsx` (create) + `docusaurus.config.ts` (modify)

- [ ] `docusaurus.config.ts` 的 `customFields` 加 `pairingToolEnabled: process.env.PAIRING_TOOL_ENABLED !== 'false'`
- [ ] `BrowserGate.tsx`：`useEffect` 里检测 `typeof navigator !== 'undefined' && 'hid' in navigator && customFields.pairingToolEnabled`；不满足 → 渲染 `<SafariFallback />`，满足 → 渲染 children
- [ ] SSR 时先渲染 SafariFallback，避免 hydration 不一致
- [ ] Commit: `feat(pairing): add BrowserGate with kill-switch env var`

### B7：PairFlow UI

**Files:** `src/components/PairingWidget/ui/PairFlow.tsx` (create)

- [ ] State：`idle | requesting | pairing | success | failure`
- [ ] Actions：`onPairClick` → `navigator.hid.requestDevice({ filters: [{ vendorId: 0x046D }] })` → `createAdapter(device)` → 若 null 显示 "Not a supported receiver"；否则 `adapter.startPairing(30_000)` → 30s 倒计时 UI + "Turn on your new device or press its connect button"
- [ ] 成功后展示 device 名 + "Now install LinguaX to remap the side buttons →" CTA
- [ ] Commit: `feat(pairing): implement PairFlow interactive UI`

### B8：PairedList + UnpairAction UI

**Files:** `src/components/PairingWidget/ui/PairedList.tsx` (create) + `UnpairAction.tsx` (create)

- [ ] 挂载时 `adapter.listPaired()` 拉取；空态 "No devices paired to this receiver"
- [ ] 每行右侧 "Unpair" 按钮，点击弹 confirm，`adapter.unpair(index)` 后从列表移除
- [ ] Commit: `feat(pairing): implement paired device list + unpair`

### B9：PairingWidget 真组件替换占位

**Files:** `src/components/PairingWidget/index.tsx` (modify — 替换 A2 的占位实现)

- [ ] 组件结构：`<BrowserGate><PairFlow /><PairedList /></BrowserGate>` + 页脚免责声明
- [ ] `compact` prop：折叠 PairedList / UnpairAction 到 "More options" details
- [ ] `receiverHint` prop：在初始 UI 上加一段提示 "Detected receiver hint: <hint>"（不限制交互）
- [ ] `React.lazy` 从 `<PairingWidget />` 使用点异步加载子组件
- [ ] `npm run build` 通过；`npm run start` 用 Chrome 手工触发一次 Pair（不必真配对，走到 requestDevice 弹窗即可）
- [ ] Commit: `feat(pairing): swap placeholder for real PairingWidget`

### B10：/tools/pair-logitech-receiver 独立页

**Files:** `src/pages/tools/pair-logitech-receiver.tsx` (create)

- [ ] 完整 `<PairingWidget />`（非 compact） + FAQ 章节（3-5 问）+ SEO metadata
- [ ] `<Head>` 里加 title/description/keywords：`"Pair Logitech Bolt / Unifying / Lightspeed receiver in browser"`
- [ ] FAQ schema JSON-LD
- [ ] 页脚重复免责声明
- [ ] Commit: `feat(pairing): add /tools/pair-logitech-receiver standalone page`

### B11：Kill Switch 端到端验证

- [ ] `PAIRING_TOOL_ENABLED=false npm run start`，访问 `/tools/pair-logitech-receiver` → 应看到 SafariFallback UI
- [ ] 访问任意型号页 → 顶部 Widget 也是 SafariFallback
- [ ] 恢复默认 → 正常
- [ ] 记录验证步骤到 `assets/qa/pairing-compat.md` 底部
- [ ] Commit: `docs(qa): record kill-switch verification steps`

### B12：真机兼容测试（人工里程碑）

- [ ] 至少 1× Bolt receiver + 1× Unifying receiver + 1× Lightspeed 真机 pass Pair / List / Unpair
- [ ] 结果填入 `assets/qa/pairing-compat.md`
- [ ] Commit（如需修：`fix(pairing): …`）

### B13：Sitemap + push 上线

- [ ] `npm run build`，检查 `/tools/pair-logitech-receiver` 在 sitemap
- [ ] Widget 在型号页 SSR 输出确认是 SafariFallback（不含 WebHID 客户端 API 调用）
- [ ] `git push origin master`
- [ ] 手动访问上线后的型号页确认 Widget 加载正常

---

## 并行 Gate

| 时间 | Track A 状态 | Track B 状态 | 集成状态 |
|---|---|---|---|
| W1 末 | A0-A4 done（模板 + MX Master 3S） | B0-B1 done（协议核心） | Widget = SafariFallback 占位（A2） |
| W2 末 | A5-A8 done（另 4 页） | B2-B7 done（3 receiver + PairFlow） | 无变化 |
| W3 末 | A9-A12 done + push 上线 | B8-B13 done + push 上线 | B9 替换 A 的占位，型号页顶部真组件可用 |

任一 track 延误：
- 内容延误 → 工具页独立上线，做 hub 收流量
- 工具延误 → 型号页占位保持 SafariFallback，用户走 [Learn more] 外链到 `logiwebconnect.com`（临时补 fallback UI 里第三个 CTA）

---

## Self-Review

- [x] Spec §3.1 目录结构 → File Structure 表覆盖
- [x] Spec §4.1 15 型号 → P0 8 个在 A4-A11；P1 7 个作为 Open Question 留给 W4+ weekly plan（spec §10 已声明）
- [x] Spec §4.2 页模板 → A4 dogfood + A5-A11 复用
- [x] Spec §4.3 索引升级 → A3 覆盖
- [x] Spec §5.1 receiver 范围 → B3/B4/B5 三家
- [x] Spec §5.2 技术架构 → B0-B9 逐层构建
- [x] Spec §5.3 用户流 → B7 PairFlow 实现
- [x] Spec §5.4 clean-room 5 条底线 → Global Constraints + 每个 B task commit message 隐含约束
- [x] Spec §5.5 Kill Switch → B6 + B11 验证
- [x] Spec §6 集成方式 → B9 替换 A2 占位；B10 独立工具页
- [x] Spec §7 3 周并行 → 上文并行 Gate 表
- [x] Spec §8 验收 → 每 task checkbox 步骤含验证
- [x] Spec §9 风险 → Kill Switch (B6/B11) + 降级 UI (Gate 表) + 真机测试记录 (B12)
- [x] Spec §11 YAGNI 记录 → 全 plan 未涉及禁做项

---

## Execution Handoff

用户已在 brainstorm 结束时表示"实施"。默认执行方式：**Inline Execution**（`superpowers:executing-plans`），从 Track A A0 起步；A0-A3 完成后设一个 checkpoint 让用户 review 基座，再继续 A4+ 或跳到 Track B。
