# LinguaX 官网内容重整设计文档

**日期：** 2026-06-11  
**范围：** 首页 (`index.tsx`)、定价页 (`pricing.tsx`)、下载页 (`download.tsx`)  
**方向：** 整体叙事升级 — 调性不变，结构层次清晰，Mouse+ 第一，SEO Method Y

---

## 一、设计目标

1. **叙事升级**：让每个页面有清晰的主角和叙事弧，而不是功能罗列
2. **信息层次**：Mouse+ 宸居第一，Push-to-Talk 独立展示，Input Source 作为配套功能
3. **增量加内容**：在现有基础上增加内容（对比表、价值要点、上手引导），不删减
4. **SEO Method Y**：H1 保留品牌语言，H2 承担关键词覆盖，meta title 独立优化

---

## 二、调性原则（不变）

沿用 `positioning.md` 的品牌声音：
- 克制专业，不是夸张推销
- 从具体收益出发，再说机制
- 避免「tries to」「honestly」「only if it helps」等软化措辞
- 避免感叹号堆砌和虚假紧迫感

---

## 三、首页（index.tsx）

### 3.1 整体结构（顺序）

```
Hero
  ↓
Pain Section（问题区，保留）
  ↓
Mouse+ Section（独立大区块，新增）
  ↓
Push-to-Talk Section（独立专属区，新增）
  ↓
Input Source Section（配套功能，降级）
  ↓
Competitor Comparison Table（对比表，新增）
  ↓
Audience Section（受众，保留）
  ↓
Screenshots Grid（截图四宫格，保留）
  ↓
Popular Guides（热门指南，保留）
  ↓
Compatibility（兼容性，缩减为 2 卡片）
  ↓
CTA
  ↓
FAQ
```

原有的 Diff Cards 和 Steps 两个区块合并/删除，由 Mouse+ 和 Push-to-Talk 独立区块替代，避免内容重复。

### 3.2 Hero

**H1（品牌语言，记忆点优先）：**
```
Your third-party mouse.
Finally at home on macOS.
```

**Hero 副标题（`<p>`，自然嵌入关键词）：**
```
LinguaX gives third-party mice smooth scrolling, gesture and button mapping,
and push-to-talk voice input — plus automatic input-source switching by app and website.
```

**Feature Pills（新增，三大功能一眼可见）：**
- 🖱 Mouse+ Enhancement（active 样式）
- 🎙 Push-to-Talk Voice（active 样式）
- ⌨️ Input Source Automation（普通样式）

> Pills 为纯展示元素，无点击行为，不是过滤控件。active 样式仅表示视觉强调。

**meta title（SEO，独立于 H1）：**
```
LinguaX – Mouse Enhancement, Push-to-Talk & Input Automation for macOS
```

**meta description：**
```
LinguaX gives third-party mice a pro macOS feel — smooth scrolling, gesture and side-button mapping,
and push-to-talk voice typing — plus automatic input-source switching. Free trial, $9.9 lifetime.
```

### 3.3 Pain Section

保留三卡片结构，文案精炼（原文案可用，微调更具体）：
- `Third-party mice never quite feel right`
- `Side buttons are wasted real estate`
- `Voice and language switching still breaks focus`

### 3.4 Mouse+ 独立大区块（新增）

**H2（SEO Method Y）：** `Mouse Enhancement for macOS`

结构：
- 区块外框（米白背景 + 橙色点缀）
- 标签：🖱 Mouse+ Enhancement
- 三个子功能卡：
  - **Smooth Scrolling** — 可调曲线，按 App 覆盖
  - **Gesture & Button Mapping** — click / long-press / directional drag
  - **App-Scoped Overrides** — 不同 App 独立配置
- 截图两格（使用现有 `linguax-mouse.png` + `linguax-home.png`）

**内链锚文本（SEO）：**  
在 Smooth Scrolling 子卡说明里，`smooth scrolling` 链接到 `docs/use-cases/fix-choppy-mouse-scrolling-macos`  
在 Gesture & Button Mapping 子卡说明里，`side button` 链接到 `docs/use-cases/map-mouse-side-buttons-macos`

### 3.5 Push-to-Talk 专属区块（新增）

**H2（SEO Method Y）：** `Push-to-Talk Voice Typing on Mac`

结构：左右两栏：
- 左：标签 + H3 + 机制说明（持有侧键 = 按住 Fn/Globe）+ 三步操作 + 兼容应用 Tags
- 右：视觉示意（大图标 + 说明，后期替换为截图）

兼容应用 Tags：`macOS Dictation` · `Wispr Flow` · `superwhisper` · `Any push-to-talk app`

**内链锚文本（SEO）：**  
「push-to-talk」链接到 `docs/use-cases/push-to-talk-voice-typing-mac`

**GEO Proof Block（嵌入正文）：**  
在机制说明段落中，保证出现：  
*"Hold a mouse side button to hold the Fn/Globe key and start voice dictation."*  
与 `positioning.md` canonical proof block 一致。

### 3.6 Input Source Section（降级为配套功能）

**H2（SEO Method Y）：** `Automatic Input Source Switching`  
**Section Label：** `Companion feature`

结构：左右两栏：
- 左：功能说明（2段）
- 右：规则列表示意（App Rule × 2 + Domain Rule × 2）

**内链锚文本：**  
「app and domain rules」链接到 `docs/use-cases/auto-switch-input-source-app-domain-mac`

### 3.7 Competitor Comparison Table（新增）

**H2：** `LinguaX vs Logi Options+: Mouse Enhancement for macOS`

列：LinguaX · Logi Options+ · macOS Built-in  
行：适用鼠标范围 / 平滑滚动 / 按 App 覆盖 / 侧键映射 / Push-to-Talk / 输入源自动切换 / 定价

命中关键词：`logi options+ alternative mac`（P1 商业意图）

### 3.8 其余区块

| 区块 | 处理方式 |
|---|---|
| Audience Section | 保留，新增「用过 Logi Options+ 或内置控制但觉得不够用」一条 |
| Screenshots Grid | 保留 4 张截图，figcaption 关键词微调 |
| Popular Guides | 样式升级为卡片式列表，补充 Push-to-Talk 条目 |
| Compatibility | 缩减为 2 卡片（Built for modern macOS / Local-first, diagnosable） |
| CTA | 保留 |
| FAQ | 新增「Does LinguaX work with any mouse, or only Logitech?」 |

---

## 四、定价页（pricing.tsx）

### 4.1 整体结构

```
Hero（微调）
  ↓
Three Value Points（新增）
  ↓
Pricing Cards（保留，Lifetime 卡内加升级时机提示）
  ↓
Feature Comparison Table（精简，分组结构）
  ↓
What You're Paying For（保留，3 卡片）
  ↓
Feedback Reward Strip（新增）
  ↓
Guides（样式升级）
  ↓
FAQ（保留，加一条 Push-to-Talk 相关）
  ↓
CTA
```

### 4.2 Hero

**H1：** `Try it in real work first. Upgrade when it sticks.`  
**副标题：** 说明 30 天全功能试用，Mouse+ / Push-to-Talk / Input Automation 全包含

**meta title：** `LinguaX Pricing – Free Trial + $9.9 Lifetime, No Subscription`

### 4.3 Three Value Points（新增）

三张小卡片，在价格卡之前出现，解释「你在买什么」：
1. 🖱 `Mouse feels right every day` — 平滑滚动 + App 级映射
2. 🎙 `Voice input without a keyboard` — 侧键按住即说
3. ⌨️ `Input source switches itself` — App + Domain 规则自动切换

### 4.4 Pricing Cards

结构不变（Trial / Lifetime 两列）。  
Lifetime 卡底部新增升级时机提示框：
```
When to upgrade: When LinguaX is already saving you real time in daily work
and you want to keep that setup long-term.
```

### 4.5 Feature Comparison Table（精简）

从 9 行精简为分组结构（Mouse+ / Automation & Actions / License），  
去掉两列完全相同的冗余行（原表大量重复 ✓/✓）。  
保留实质差异行：Duration / Macs per license / Payment / Refund window。

### 4.6 Feedback Reward Strip（新增）

橙色背景条，说明反馈被采纳即获赠 1 年 License。

---

## 五、下载页（download.tsx）

### 5.1 整体结构

```
Hero（改写）
  ↓
Install Guide Card（现有内容，视觉升级）
  ↓
First 10 Minutes（新增，上手三步）
  ↓
Setup Guides（保留，样式升级，补 PTT 条目）
  ↓
Pricing Nudge（新增，轻量，不强推）
```

### 5.2 Hero

**H1：** `Download starts automatically. Here's what to do next.`  
**副标题：** 说明如果未自动开始可点按钮，建议从平滑滚动和一个按键映射开始

**meta title：** `Download LinguaX for macOS – Free Trial, Mouse Enhancement & Input Automation`

### 5.3 Install Guide Card（视觉升级）

现有四步骤内容保留，改为卡片网格布局（num + icon + text）。  
新增权限说明（Accessibility + Input Monitoring 用途说明）。  
新增兼容性小条（macOS 13+ / Apple Silicon or Intel / 需要权限）。

### 5.4 First 10 Minutes（新增）

**H2：** `Your first 10 minutes`  
**Section Label：** `First session`

三步卡片：
1. Enable smooth scrolling（Mouse+ tab）
2. Map one side button（Mouse+ → Mapping）
3. Add your first rule（Mapping tab）

每张卡底部有 mini-tag 说明在哪个 tab 操作。

### 5.5 Pricing Nudge（新增）

页面底部轻量提示条：
```
Using LinguaX daily after 30 days?
Upgrade to Lifetime to keep your setup running. One-time, no subscription.
[Upgrade to Lifetime — $9.9]
```

---

## 六、SEO 汇总（Method Y）

### H1 vs meta title 分工

| 页面 | H1（品牌语言） | meta title（关键词） |
|---|---|---|
| 首页 | Your third-party mouse. Finally at home on macOS. | LinguaX – Mouse Enhancement, Push-to-Talk & Input Automation for macOS |
| 定价页 | Try it in real work first. Upgrade when it sticks. | LinguaX Pricing – Free Trial + $9.9 Lifetime, No Subscription |
| 下载页 | Download starts automatically. Here's what to do next. | Download LinguaX for macOS – Free Trial, Mouse Enhancement & Input Automation |

### H2 关键词覆盖（首页）

| H2 | 对应关键词 |
|---|---|
| Mouse Enhancement for macOS | `mac mouse enhancement`（P1 hub） |
| Push-to-Talk Voice Typing on Mac | `push to talk voice typing mac`（P2 hub） |
| Automatic Input Source Switching | `auto switch input source mac`（P3 hub） |
| LinguaX vs Logi Options+: Mouse Enhancement for macOS | `logi options+ alternative mac`（P1 商业意图） |

### 内链锚文本计划（首页）

| 锚文本 | 目标页面 |
|---|---|
| smooth scrolling（Mouse+ 子卡） | `docs/use-cases/fix-choppy-mouse-scrolling-macos` |
| side button（Mouse+ 子卡） | `docs/use-cases/map-mouse-side-buttons-macos` |
| push-to-talk（PTT 区块正文） | `docs/use-cases/push-to-talk-voice-typing-mac` |
| app and domain rules（Input Source 区块） | `docs/use-cases/auto-switch-input-source-app-domain-mac` |

### GEO Proof Blocks

以下三句话需要在首页正文中原文出现（对齐 `positioning.md` canonical proof blocks，供 AI 引用）：

| Proof Block | 放置位置 | 原文 |
|---|---|---|
| 1 | Hero 副标题 `<p>` 开头 | `LinguaX is a macOS utility for mouse enhancement, push-to-talk voice input, and automatic input-source switching.` |
| 2 | Hero 下方 `lx-note` 行 | `Pricing: free trial, then a one-time Lifetime purchase ($9.9), no subscription.` |
| 3 | Push-to-Talk 区块机制说明段落 | `Hold a mouse side button to hold the Fn/Globe key and start voice dictation.` |

> Proof block 1 的 Hero 副标题改写为：`LinguaX is a macOS utility for mouse enhancement, push-to-talk voice input, and automatic input-source switching — smooth scrolling, gesture and button mapping, and input source rules by app and website.`（后半句补充具体细节，保持原句在前）

---

## 七、不做的事

- 不改变 Docusaurus 主题结构
- 不改写文档站（`/docs`）内容
- 不改变博客内容
- 不修改中文本地化字符串（Phase 3）
- 不引入新的 CSS framework 或组件库

---

## 八、Mockup 参考文件

三个 HTML mockup 已生成，可直接在浏览器预览：
- `linguax-web/mockup-homepage.html`
- `linguax-web/mockup-pricing.html`
- `linguax-web/mockup-download.html`
