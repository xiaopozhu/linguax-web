---
title: "Mac 鼠标滚动卡顿一顿一顿？三方鼠标顺滑滚动解决方法"
description: "Mac 上第三方鼠标滚动一顿一顿、不像触控板那么顺滑？用 LinguaX 的顺滑滚动（Smooth Scrolling）修好——三档细调 Min Step / Speed Gain / Duration，可按 App 单独开关，原生 ~10MB，任何品牌鼠标都支持。"
keywords:
  - mac 鼠标滚动卡顿
  - mac 鼠标滚动不顺
  - macos 鼠标滚动不平滑
  - 苹果电脑 鼠标滚动
  - macbook 鼠标滚轮 顿挫
  - 罗技鼠标 mac 滚动 卡
  - mac 第三方鼠标 顺滑滚动
  - mac 鼠标 平滑滚动 软件
  - macos smooth scrolling
  - 罗技鼠标 mac 滚动 一格一格
---

# Mac 鼠标滚动卡顿？三方鼠标顺滑滚动的解决方法

如果你把一支普通的**第三方鼠标**（罗技、雷蛇、机械键盘公司那类的鼠标）接到 Mac 上，会立刻发现滚动**一格一格地跳**，长网页/长文档翻起来累眼、也累手。你不是错觉——这就是 macOS 对非苹果鼠标滚轮的原生行为。

用 Mac 触控板刷得很顺，是因为 macOS 给它专门做了逐像素平滑滚动；接入 USB / 蓝牙鼠标，系统就退回到"离散的行滚动"，每转一格滚一大截。

## 为什么会一顿一顿

- macOS 把第三方鼠标的滚轮信号当成**离散的"格"（notch）**，不是连续位移。
- 没有平滑处理，每一格直接跳好几行，视觉上就是断续、抖动。
- 不同 App 的响应方式还不一样，同一支鼠标在 **Safari / Chrome、Xcode / VS Code、PDF 阅读器**里手感差别很大。

而且 **macOS 系统设置里没有专门给第三方鼠标做平滑滚动的开关**。要把它修好，靠一个能拦下滚动事件、把它按平滑曲线重放的工具最直接。

## 用 LinguaX 的顺滑滚动（Smooth Scrolling）修

LinguaX 是一个原生 Mac 应用（约 10MB，无 Electron、无账号），专门重写鼠标滚轮信号。核心是三档细调：

- **Min Step（最小步长）**——每一次滚动最少移动多少（默认 33.6）。
- **Speed Gain（速度增益）**——连续滚动时的加速程度（默认 2.70）。
- **Duration（持续时长）**——每次滑动的缓动时间（默认 4.35）。

关键点：**只作用在鼠标滚轮**，触控板的自然顺滑不动。而且平滑滚动可以**按 App 单独开或关**——浏览器里想快速甩、代码编辑器里想精准定位，可以各归各。（三档滑块是全局的；每个 App 只有开/关一个开关。）

## 设置步骤

1. 安装 LinguaX，首次运行时授予**辅助功能（Accessibility）**权限。
2. 进入 **Mouse+**，先只**打开顺滑滚动**这一个开关，别动其他。
3. 在**浏览器、代码编辑器、PDF/长图预览**三种场景各测 1–2 分钟。
4. **一次只调一档**：先动 Min Step，再动 Speed Gain，最后动 Duration。每调完等 2–3 分钟看手感，明显更好再保留，否则回默认。

一次调多档是最常见的踩坑——你会分不清是哪一档在起作用。

## 还是不顺？先排三件事

- **别多个鼠标工具同时开。** 关掉 Mos、SteerMouse、Logi Options+、BetterMouse 等，只留 LinguaX，重新测。多个工具都在拦滚动事件会互相打架、掉帧掉事件。
- **只在必要的 App 上做单独覆盖。** 全局保持一套自己顺手的基线，只对确实需要不同手感的 App（比如剪辑软件）做单独覆盖。
- **重启 App，再刷一次。** 有些 App 只在启动时读取滚动事件配置，改完之后 relaunch 一次更稳。

## 大多数人的推荐基线

- 开启顺滑滚动。
- Min Step / Speed Gain / Duration 用默认（33.6 / 2.70 / 4.35），除非确实感觉不对再动。
- 单独覆盖尽量少，只覆盖真正卡的那一两个 App。

LinguaX 在 **Mac 睡眠唤醒后**会自动恢复顺滑滚动状态，不需要每天手动重新开。

## 常见问题

### 只对某一支鼠标有用吗？

不是。任何 **USB 或蓝牙鼠标**都能用，不需要驱动。罗技识别的型号（MX Master 系列、MX Anywhere、G502 X、M720、M585 等）会额外有默认映射优化。

### 会影响触控板吗？

不会。顺滑滚动**只处理鼠标滚轮信号**，触控板走系统原生路径，手感不变。

### 和 Mos、Mac Mouse Fix、LinearMouse 有什么区别？

Mos 免费、专攻顺滑滚动；LinearMouse 免费、专攻指针加速；Mac Mouse Fix 加了手势。它们各自很好，但如果你**又要顺滑滚动、又要按键映射、又要每 App 独立行为**，三个工具同时装反而互相打架。LinguaX 用一个原生管道同时处理这些。详见[鼠标增强工具对比](/docs/use-cases/mos-vs-linearmouse-vs-mac-mouse-fix)。

### 免费吗？

有 **30 天完整功能免费试用**，无需注册。之后是**一次性 9.9 美元、可授权 3 台设备**，没有订阅。

### 睡眠唤醒后还会顺吗？

会。LinguaX 在唤醒时会自动刷新输入服务，蓝牙鼠标会自动重连，顺滑滚动状态无需手动重开。

## 开始使用

**[下载 LinguaX](/download)**，30 天免费试一把顺滑滚动。

## 延伸阅读

- [Smooth Scrolling 详细配置](/docs/mouse-plus/smooth-scrolling)
- [Mouse+ 概览](/docs/mouse-plus/overview)
- [与其他鼠标工具冲突排查](/docs/troubleshooting/conflicts-with-other-tools)
- [Mac 按住说话语音输入（鼠标侧键触发）](/zh-Hans/docs/use-cases/push-to-talk-voice-typing-mac)
- [Mac 鼠标增强工具对比：Mos / LinearMouse / Mac Mouse Fix](/docs/use-cases/mos-vs-linearmouse-vs-mac-mouse-fix)
