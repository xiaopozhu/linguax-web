# 鼠标型号落地页矩阵 + Web 配对工具 — 设计规范

**日期:** 2026-07-14
**范围:** 在 linguax-web 新增两条相互加强的能力：(A) 每款热门罗技鼠标一个 SEO 落地页；(B) 浏览器内 Web 配对工具（Bolt / Unifying / Lightspeed），embed 到每个型号页顶部。目标是把「新买鼠标 → 找不到 Options+ 在 Mac 上不好用 → Google 搜索 → 我们的页面 → 一键配对 → 下载 LinguaX 做映射」整条转化链在我们站内闭环。
**状态:** Draft,待用户确认后转 writing-plans

---

## 1. 背景与问题

### 起因
用户使用了罗技官方的 [logiwebconnect.com](https://logiwebconnect.com/)（浏览器 WebHID 配对工具），觉得"不用装 Options+ 就能配对"体验很好，提出复刻思路以提升 linguax-web 的 SEO 内页访问能力。

### 调研关键结论
- logiwebconnect.com **是罗技官方站点**，`support.logi.com` 有背书。功能仅限"Bolt / Unifying 接收器的配对与固件更新"，**不涉及 DPI / 按键映射 / 灯效**。
- 域名权重上我们无法在"pair logitech mouse"这类词上打赢 `logi.com` 子域，纯复刻 SEO 价值 ≈ 0。
- 但用户提出的隐藏洞察成立：**第一次买罗技鼠标的用户如果没装 Options+，配对本身就是一个卡点**，进而阻塞了我们下游的转化（下载 LinguaX 做侧键映射）。这个卡点值得我们在 web 端消除。

### 战略定位
不是"复刻 logiwebconnect"，而是把"配对"作为 LinguaX 转化漏斗的**桥接功能**：
- 主流量入口：**按型号 × Mac 侧键映射**的长尾 SEO 内页矩阵（罗技官方不会做，因为承认 Options+ 在 Mac 上残缺）
- 转化加速器：**embed 在型号页顶部的 Web 配对 Widget**（消除"我鼠标都还没配上"这一步）
- 兜底 CTA：Chromium 之外的用户直接引导下载 LinguaX（宣传"桌面版首次启动自动配对"）

---

## 2. 决策记录（Brainstorm 结论）

| 决策项 | 结论 | 理由 |
|---|---|---|
| 复刻 logiwebconnect | ❌ 不做 | 战场错位（官方域名碾压），价值 ≈ 0 |
| SEO 内页矩阵 | ✅ 做 | 罗技官方不会做 Mac 深度按键映射的 SEO 页 |
| Web 配对工具 | ✅ 做 | 消除转化漏斗上游卡点，clean-room 实现风险可控 |
| Receiver 支持范围 | Bolt + Unifying + Lightspeed | 覆盖办公旗舰 + 便携 + 游戏三大人群 |
| Phase 顺序 | 内页 + 工具并行三周交付 | 用 gate + 降级 placeholder 隔离依赖 |
| i18n | 暂不做（跟随 English-first 策略） | 与 `assets/seo/weekly-plan.md` 一致，本地化 W9+ |
| LinguaX 桌面版 native pairing | Open question，本 spec 不覆盖 | 属于 app 侧工程，单独立项 |

---

## 3. 产品形态

### 3.1 信息架构

```
docs/
├── mouse-plus/
│   ├── overview.md
│   ├── button-mapping.md
│   ├── gesture-mapping.md
│   ├── device-compatibility.md         ← 升级为「Compatible Models」索引
│   └── models/                          ← 新增
│       ├── mx-master-3s.md
│       ├── mx-master-3.md
│       ├── mx-anywhere-3s.md
│       ├── logitech-g-pro-x-superlight.md
│       └── ...
src/pages/
└── tools/
    └── pair-logitech-receiver.tsx       ← 新增独立工具页
src/components/
└── PairingWidget/                        ← 新增，同时被 model 页 embed
    ├── index.tsx
    ├── protocol/
    │   ├── hidpp.ts                     ← HID++ 协议 clean-room 实现
    │   ├── receiver-bolt.ts
    │   ├── receiver-unifying.ts
    │   └── receiver-lightspeed.ts
    ├── ui/
    │   ├── PairFlow.tsx
    │   ├── PairedList.tsx               ← 列出已配对设备
    │   └── UnpairAction.tsx             ← 释放槽位
    └── fallback/
        └── SafariFallback.tsx           ← 非 Chromium 降级 CTA
```

### 3.2 URL 规范

- 型号页：`/docs/mouse-plus/models/mx-master-3s`（**不带 `-mac` 后缀**，Mac 属性在 title/H1/keywords 中承接；避免与 blog 里 `-macos` 后缀撞味）
- 工具页：`/tools/pair-logitech-receiver`
- 型号索引页：沿用 `/docs/mouse-plus/device-compatibility`（保留已有权重和外链），H1 从"Device Compatibility"升级为"Compatible Mouse Models"

### 3.3 交互闭环

```
Google 搜"MX Master 3S mac setup"
  ↓
落地：/docs/mouse-plus/models/mx-master-3s
  ↓
页面顶部：<PairingWidget />
  ├─ Chromium 用户：一键 Pair / List / Unpair
  └─ Safari/Firefox：降级 CTA「Install LinguaX — handles pairing natively」
  ↓
页面中段：这款鼠标能做的映射示例（push-to-talk / space 切换 / app 切换）
  ↓
页面底部：Download LinguaX CTA
```

---

## 4. 内容矩阵：型号落地页

### 4.1 首批型号清单（15 款，分 P0/P1）

| 优先级 | Slug | 型号 | 差异化钩子 |
|---|---|---|---|
| P0 | `mx-master-3s` | MX Master 3S | Thumb + Scroll Mode + gesture，Options+ Mac 表现差 |
| P0 | `mx-master-3` | MX Master 3 | 旧款仍热搜 |
| P0 | `mx-anywhere-3s` | MX Anywhere 3S | 便携首选 |
| P0 | `mx-anywhere-3` | MX Anywhere 3 | 长尾 |
| P0 | `logitech-g-pro-x-superlight` | G Pro X Superlight | 玩家群搜"mac remap"痛点大（Lightspeed） |
| P0 | `logitech-g-pro-x-superlight-2` | G Pro X Superlight 2 | 新款（Lightspeed） |
| P0 | `logitech-lift` | Logi Lift | 人体工学 + 侧键 |
| P0 | `mx-ergo` | MX Ergo | 轨迹球 push-to-talk 场景独特 |
| P1 | `logitech-g502-hero` | G502 Hero | 长尾王（Unifying） |
| P1 | `logitech-g502-x-lightspeed` | G502 X Lightspeed | Lightspeed |
| P1 | `logitech-g304` | G304 / G305 | 学生 & 便携玩家 |
| P1 | `mx-vertical` | MX Vertical | 站立办公 |
| P1 | `logitech-m720-triathlon` | M720 Triathlon | 多设备切换 |
| P1 | `logitech-m585` | M585 / M590 Multi-Device | 长尾 |
| P1 | `logitech-pebble-m350` | Pebble M350 | 低价高搜索量 |

### 4.2 单页模板（约 1000 词）

```markdown
---
id: <slug>
title: "<型号> on Mac: Side Buttons, Push-to-Talk, and Space Switching with LinguaX"
description: <120 字，突出型号 + Mac + LinguaX 差异化能力>
keywords:
  - <型号> mac
  - <型号> button mapping mac
  - <型号> side buttons mac
  - <型号> push to talk mac
  - <型号> not working mac
sidebar_label: <型号>
---

import PairingWidget from '@site/src/components/PairingWidget'

# <型号> on Mac — Full Control with LinguaX

<一句话钩子 + 兼容度徽章 + [Download] CTA>

<PairingWidget receiverHint="<bolt|unifying|lightspeed>" />

## What You Can Actually Map on <型号>

<按 named slots 列出此型号可用按钮 (Side 1-4 / WL / WR / T / SM)>

## What Options+ / G Hub Can't Do Here

<列出差异化痛点：无 push-to-talk / 无 gesture / 无 app-scoped overrides>

## Three Ready-to-Copy Setups

### 1. Push-to-Talk on the Thumb Button
### 2. Switch macOS Spaces with a Side-Button Swipe
### 3. App-Scoped Input Method Switching

## Setup in 3 Minutes

<截图步骤，链到 /docs/getting-started/installation>

## FAQ

<schema.org FAQPage JSON-LD，覆盖 3-5 个高频问题>

## Related Models

<同系列 3-5 个横向内链>
```

### 4.3 索引页升级

`docs/mouse-plus/device-compatibility.md`：
- 保留现有 URL 和外链权重
- H1 改为 "Compatible Mouse Models"
- 在按 Vendor 分组的表格内，把每个型号名做成到 `models/<slug>` 的内链
- 每行加一列"Receiver"（Bolt / Unifying / Lightspeed / Bluetooth）

---

## 5. Web 配对工具

### 5.1 支持范围（v1）

| Receiver | 支持能力 | 备注 |
|---|---|---|
| Logi Bolt | Pair / List / Unpair | 主流办公线 |
| Logi Unifying | Pair / List / Unpair | 老一代仍大量在用 |
| Logi Lightspeed | Pair（重新配对已有设备）/ List / Unpair | 游戏线；dongle 替换、固件更新、DPI/lighting 均 v1 不做 |

**明确不做（v1）**：DPI 调整、按键映射、灯效、固件更新、Nano 接收器、Bluetooth 直连鼠标（后者走系统蓝牙，用不上此工具）。

### 5.2 技术架构

```
                 ┌─────────────────────────┐
                 │   <PairingWidget />     │
                 │   (React component)     │
                 └───────────┬─────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼──────┐  ┌────▼─────┐  ┌────▼──────────┐
     │ BrowserGate   │  │ PairFlow │  │ SafariFallback│
     │ (WebHID 检测) │  │ (交互流) │  │ (降级 CTA)    │
     └───────┬───────┘  └────┬─────┘  └───────────────┘
             │               │
             │        ┌──────▼──────┐
             │        │ Receiver    │
             │        │ Adapter     │
             │        └──────┬──────┘
             │               │
             │      ┌────────┼────────┐
             │      │        │        │
             │   ┌──▼──┐ ┌──▼──┐ ┌───▼───┐
             │   │Bolt │ │Unif.│ │Lgtsp. │
             │   └──┬──┘ └──┬──┘ └───┬───┘
             │      └────────┼────────┘
             │               │
             │        ┌──────▼──────┐
             │        │  hidpp.ts   │  ← clean-room HID++ 通信层
             │        └──────┬──────┘
             │               │
             └───────────────▼
                    WebHID API
                    (navigator.hid)
```

### 5.3 Widget 用户流

```
1. 用户进入型号落地页
   ↓
2. BrowserGate 检测 navigator.hid 是否存在
   ├─ 否 (Safari/Firefox) → 渲染 SafariFallback
   │                        「浏览器无法访问硬件，安装 LinguaX，桌面版首次启动自动配对」
   │                         → [Download LinguaX] 主 CTA + [Learn more] 链到工具页
   │
   └─ 是 (Chrome/Edge) → 渲染 PairFlow
                          三个 primary action:
                          ┌ [Pair a new device]
                          ├ [See paired devices]
                          └ [Unpair to free a slot]
   ↓
3. 用户点击 [Pair a new device]
   ↓
4. navigator.hid.requestDevice({ filters: [{ vendorId: 0x046D }] })
   ↓ 用户在浏览器授权弹窗中选择 receiver
   ↓
5. ReceiverAdapter 通过 productId 识别是 Bolt / Unifying / Lightspeed
   ↓
6. 发送 HID++ short/long report 让 receiver 进入 pairing mode
   ↓ 30 秒倒计时 + "Now turn on your new device or press its connect button"
   ↓
7. Receiver 广播 "device paired" 事件 → 展示型号 + [Continue]
   ↓
8. 「Now install LinguaX to remap the side buttons →」CTA
```

### 5.4 clean-room 实现约束（合规底线）

- **参考源限制**：只允许阅读 (a) 罗技官方公开的 HID++ 规范（Nestor Lopez Casado 发布的公开文档）；(b) fwupd 官方 `logitech-hidpp` plugin 的**规范定义部分**（命令 ID 常量、报文结构、状态码枚举），**不复制** fwupd 的具体实现代码或整段逻辑。**禁止**阅读 Solaar（GPL 感染）任何源码，禁止查看 logiwebconnect.com 反编译产物。所有 TS 实现由本项目 clean-room 编写。
- **记录**：每个 HID++ 命令 ID 在代码注释中标注参考文档来源（规范章节号或 fwupd 文件路径）
- **不使用**任何罗技商标、logo、字体、品牌色（LinguaX 自己的设计语言即可）
- **免责声明**：工具页页脚固定文案 "Not affiliated with or endorsed by Logitech. 'Logitech', 'MX Master', 'Bolt', 'Unifying', 'Lightspeed' are trademarks of Logitech International SA, used descriptively for compatibility."
- **不诋毁**官方软件：文案中如果提到 Options+ / G Hub，只说事实差异，不作贬义评价

### 5.5 Kill Switch 设计

如收到罗技 cease and desist 律师函，需能 **24 小时内** 关掉配对能力，同时保留 SEO 内页：

- 环境变量 `PAIRING_TOOL_ENABLED`（Cloudflare Pages 环境变量），默认 `true`
- `<PairingWidget />` 内部第一步就检查此 flag，为 false 时直接渲染 SafariFallback（不管浏览器是什么）
- `/tools/pair-logitech-receiver` 页面显示 "Temporarily unavailable — install LinguaX for native pairing" 并保留元数据（SEO 页仍在）
- 关闭后可以随时打开，不影响任何持久化数据

---

## 6. 集成方式：Widget 嵌入型号页

### 6.1 组件签名

```tsx
<PairingWidget
  receiverHint="bolt" | "unifying" | "lightspeed" | undefined
  compact={boolean}  // 型号页内 embed 用紧凑版；工具页用完整版
/>
```

- `receiverHint` 让 Widget 在初始 UI 上预高亮某个 tab（不限制用户操作）
- `compact` 版本折叠 List/Unpair 到"More options"，只突出 Pair 主流程

### 6.2 型号页内位置

在 Hero (H1 + 描述) 之后、第一个 H2 之前 embed：

```markdown
# MX Master 3S on Mac — ...

<Hero />

<PairingWidget receiverHint="bolt" compact />

## What You Can Actually Map on MX Master 3S
...
```

### 6.3 独立工具页

`src/pages/tools/pair-logitech-receiver.tsx`：
- H1 "Pair a Logitech Bolt / Unifying / Lightspeed receiver in your browser"
- `<PairingWidget />`（非 compact）
- FAQ 章节承接 SEO 关键词："pair logitech mouse mac"、"logitech mouse not working mac"、"free receiver slot"
- 底部 CTA 到 LinguaX

---

## 7. Phase 计划：3 周并行

### Track A：内容（Content）

| 周 | 交付 | 备注 |
|---|---|---|
| W1 | 模板落地 + `device-compatibility.md` 升级为索引 + `mx-master-3s.md` 首页 dogfood | 页面上线时 Widget 位置**占位**：`<PairingWidget />` 组件先渲染 SafariFallback 分支（不管浏览器） |
| W2 | P0 前 4 页：`mx-master-3` + `mx-anywhere-3s` + `logitech-g-pro-x-superlight` + `logitech-lift` | 内容作者可与工具作者并行 |
| W3 | P0 后 4 页：`mx-anywhere-3` + `logitech-g-pro-x-superlight-2` + `mx-ergo` + `mx-master-3` 补 | 集成 gate：Widget 切换为真实工具 UI |

### Track B：工具（Tool）

| 周 | 交付 | 备注 |
|---|---|---|
| W1 | HID++ 协议层 (`hidpp.ts`) + Bolt / Unifying adapter + 单元测试 | 用 mock report 覆盖 |
| W2 | Lightspeed adapter + `<PairingWidget />` UI 组件 + `/tools/pair-logitech-receiver` 页 | 真机兼容性测试（至少 1 台 Bolt + 1 台 Unifying + 1 台 Lightspeed） |
| W3 | 集成到型号页顶部 + SafariFallback + Kill Switch 环境变量 | 上线切换 |

### Track C：集成 Gate（每周末）

- W1 gate：模板 + 首页 SEO indexable，Widget = 降级 UI（外链到 logiwebconnect.com 作为兜底）
- W2 gate：型号页 P0 一半上线，工具页独立可访问但未 embed
- W3 gate：切换所有型号页顶部为真实 Widget；工具页并入 SEO sitemap；提交 GSC 索引请求

### 并行降级策略

如任一 track 延误：
- 内容延误 → 工具页 `/tools/pair-logitech-receiver` 独立上线，作为 hub
- 工具延误 → 型号页 Widget 占位切换为**外链**到官方 `logiwebconnect.com` + 底部 LinguaX CTA（不影响 SEO 主体内容）

---

## 8. 验收标准

### 8.1 内容验收（Track A）
- [ ] 每页 title 包含型号 + Mac 关键词，长度 50-60 字符
- [ ] 每页 description 120 字符内
- [ ] 每页至少 800 词、至少 3 个 H2、至少 1 个 FAQ schema
- [ ] 每页至少 5 个内链（button-mapping / gesture-mapping / device-compatibility / 相关 blog / 相关型号）
- [ ] 每页在 `docusaurus.config.ts` 的 sitemap 中
- [ ] W3 结束时 P0 8 页全部 commit + push + Cloudflare 部署成功
- [ ] 索引页 `device-compatibility.md` 表格中每个型号名都是内链

### 8.2 工具验收（Track B）
- [ ] Chrome + Edge 桌面版：Pair / List / Unpair 三个操作全部可用
- [ ] Bolt + Unifying + Lightspeed 三种 receiver 至少各 1 台真机验证通过
- [ ] Safari + Firefox：正确渲染 SafariFallback，无控制台报错
- [ ] `PAIRING_TOOL_ENABLED=false` 时，工具 UI 立即降级为 SafariFallback（含移动端 UA）
- [ ] 无 Logitech 商标 / logo / 字体使用
- [ ] 免责声明在工具页页脚可见
- [ ] 每个 HID++ 命令 ID 在代码注释中有参考文档标注
- [ ] 依赖树中无 Solaar 相关代码或 GPL 感染

### 8.3 集成验收（Track C）
- [ ] 型号页顶部 `<PairingWidget />` 加载不阻塞 First Contentful Paint（组件用 `React.lazy` 懒加载）
- [ ] Widget 在 SSG 构建阶段不执行 WebHID 代码（只在 client 侧执行）
- [ ] 转化埋点：Pair 成功事件 + Download LinguaX 点击事件

---

## 9. 风险与应对

| 风险 | 概率 | 影响 | 应对 |
|---|---|---|---|
| 罗技发律师函 | 低 | 中 | Kill Switch 24h 关闭工具，保留 SEO 内页；准备律师函回复模板 |
| WebHID 授权 UX 摩擦大导致弃用 | 中 | 中 | 引导文案 + 30s 等待动画 + "having trouble?" 链接到详细步骤 |
| Lightspeed 兼容性覆盖不全 | 中 | 低 | v1 只承诺"重新配对已知设备"，dongle 更换等 out of scope |
| 真机测试成本 | 中 | 中 | 采购或借用 3-5 款代表机型；测试记录归档到 `assets/qa/pairing-compat.md` |
| Cloudflare Pages 环境变量热更新延迟 | 低 | 低 | Kill Switch 触发时同步删除 `<PairingWidget />` 的 import，二次部署兜底 |
| SEO 内页与已有 `blog/*mouse*` 内容冲突 | 中 | 低 | 内链交叉引用而非重复内容；`bettermouse-alternative-mac` 等作为对照物内链 |

---

## 10. Open Questions（不阻塞当前 spec）

1. **LinguaX 桌面版 native pairing**：桌面版首次启动时检测到"未配对 receiver + 无 HID 设备"→ 弹出 native pairing wizard，是否立项？（属于 app 侧工程，由 `linguax-app` 仓库独立设计）
2. **Widget 埋点粒度**：是否需要区分"Widget 展示 / Widget 交互 / 配对成功 / 后续下载"四段漏斗？依赖当前分析平台能力，W1 结束前对齐。
3. **P1 型号排期**：15 款中 P1 部分 W4+ 每周 2 页并入现有 `weekly-plan.md`，还是独立轨道？
4. **桌面版 whitelist 扩容（用户 2026-07-14 已拍板要做）**：linguax-app 侧需要把 P0 里目前**未识别**的 4 款加入 Mouse+ 识别 whitelist：**Logitech G Pro X Superlight**、**G Pro X Superlight 2**、**Logi Lift**、**MX Ergo**。需要补录各自的 VID:PID + HID++ 2.0 feature 探测以及 named slot 布局（Side 1-2 / T / SM / WL / WR）。未落地前，落地页文案不得吹嘘"full HID++ profile"能力，只能承诺 basic side-button mapping + smooth scroll。此项属于 linguax-app 仓库工程，落地页写作与之解耦但**不能超前承诺**。

---

## 11. 明确不做（YAGNI 记录）

- ❌ 复刻 logiwebconnect 的固件更新功能（战场错位）
- ❌ Web 端 DPI / 按键 / 灯效配置（这是 LinguaX 桌面版的护城河，不能在 Web 送出去）
- ❌ 首批 i18n（跟随 English-first 策略）
- ❌ Nano / Bluetooth 直连鼠标的配对（前者长尾复杂度爆炸，后者走系统蓝牙用不上）
- ❌ 罗技以外的品牌型号（v1 聚焦罗技，是搜索量和 pain point 的 sweet spot）
- ❌ 重写 `device-compatibility.md`（升级为索引即可，保留权重）

---

## 12. 参考资料

- Solaar (仅作可行性验证参考，代码禁止阅读): https://pwr-solaar.github.io/Solaar/
- fwupd Logitech HID++ plugin (LGPL 2.1+, 允许参考): https://fwupd.github.io/libfwupdplugin/logitech-hidpp-README.html
- logiwebconnect-mirror (Unlicense, 先例证据): https://github.com/shneeba/logiwebconnect-mirror
- Logitech Unifying Reverse Engineering (Lekensteyn): https://lekensteyn.nl/logitech-unifying.html
- 现有 SEO 内容：`assets/seo/weekly-plan.md`
- 现有型号兼容性文档：`docs/mouse-plus/device-compatibility.md`
- 现有按键映射体系：`docs/mouse-plus/button-mapping.md` + `docs/mouse-plus/gesture-mapping.md`
