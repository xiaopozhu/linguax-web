---
title: "LinguaX 使用指南"
description: "了解 LinguaX 的鼠标增强与输入法自动切换，完成安装、权限设置和平滑滚动配置，快速找到适合自己的 Mac 工作流。"
keywords:
  - "LinguaX 文档"
  - "LinguaX 使用指南"
  - "Mac 鼠标工具"
  - "Mac 输入法自动切换"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

LinguaX 是一款约 10 MB 的原生 macOS 工具，包含两大独立核心模块：**Mouse+** 提供平滑滚动、按键与手势映射以及按应用覆盖设置；**输入法自动切换**让输入语言跟随当前应用或网站。基础鼠标功能适用于 USB 或蓝牙鼠标，特殊按键能力则取决于型号。无需驱动或账号，不收集行为遥测。

<ThemedImage
  alt={"LinguaX 两大独立模块：Mouse+ 鼠标增强与输入法自动切换"}
  sources={{
    light: useBaseUrl('/img/linguax-two-modules.svg'),
    dark: useBaseUrl('/img/linguax-two-modules-dark.svg'),
  }}
  width="720"
/>

## 从这里开始 {#start-here}

初次使用 LinguaX？以下三篇短指南带你完成下载和基础配置：

1. [安装](/zh-Hans/docs/getting-started/installation)——拖入 Applications，通常不到一分钟即可完成。
2. [首次运行](/zh-Hans/docs/getting-started/first-run)——授予权限并设置第一条映射。
3. [快速导览](/zh-Hans/docs/getting-started/quick-tour)——用五分钟验证设置。

想按工作类型配置？请阅读[开发者设置](/zh-Hans/docs/getting-started/setup-for-developers)或[设计师设置](/zh-Hans/docs/getting-started/setup-for-designers)。

## 配置鼠标 {#configure-your-mouse}

让普通鼠标成为精确、可配置的工作工具：

- [Mouse+ 概览](/zh-Hans/docs/mouse-plus/overview)——了解模块功能和原生实现。
- [平滑滚动](/zh-Hans/docs/mouse-plus/fundamentals/smooth-scrolling)——调整 Min Step、Speed Gain 和 Duration。
- [按键映射](/zh-Hans/docs/mouse-plus/fundamentals/button-mapping)与[手势映射](/zh-Hans/docs/mouse-plus/fundamentals/gesture-mapping)——为按键配置单击、双击、长按和方向拖动。
- [兼容型号](/zh-Hans/docs/mouse-plus/device-compatibility)——查看 MX Master、MX Anywhere、G Pro X Superlight、Lift、MX Ergo 等型号的设置指南，并了解增强识别与通用 HID 的区别。

## 自动切换输入法 {#automate-input-switching}

在多语言、多应用工作流中，让输入法自动跟随当前上下文：

- [输入法自动切换](/zh-Hans/docs/input-source/auto-switch)——了解工作原理和触发方式。
- [应用与网站规则](/zh-Hans/docs/input-source/app-and-website-rules)——了解两种规则及优先级。
- [多语言工作流](/zh-Hans/docs/input-source/multilingual-workflow)——建立稳定的双语配置。

优先级始终是**网站域名规则 > 应用规则 > 全局默认**。域名规则支持 Safari、Chrome、Edge、Brave 和 Opera，不支持 Firefox。

## 设置按住说话 {#set-up-push-to-talk}

鼠标侧键可以模拟按住 Fn（Globe）键，成为语音输入的实体开关：

- [Mac 鼠标按住说话](/zh-Hans/docs/push-to-talk/push-to-talk-voice-typing-mac)——完成基础配置。
- [Mac 按住说话应用](/zh-Hans/docs/push-to-talk/best-push-to-talk-app-mac)——选择语音工具。
- [Wispr Flow 与 superwhisper 快捷键](/zh-Hans/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac)——配置相应应用。

## 为什么选择 LinguaX {#why-linguax}

- **轻量**——约 10 MB 的原生 macOS 应用，无需 Electron 运行时。
- **注重隐私**——无需账号，不收集行为遥测；核心鼠标与输入法功能在本机运行。仅在你调用 AIx 并同意传输时发送提交的文本；下载、更新与许可验证需要联网。启用 LinguaX 的 iCloud 后，配置可通过你的 iCloud 同步。
- **无需驱动**——拖入 Applications 即可使用，基础功能适用于 USB 或蓝牙鼠标。
- **定价清晰**——[一次性 $9.9 的 Lifetime 许可](/zh-Hans/docs/reference/trial-vs-lifetime)覆盖 3 台设备，提供 30 天免费试用，无订阅。

## 从其他工具迁移？ {#coming-from-another-tool}

- [Logi Options+ 替代方案](/zh-Hans/docs/comparisons/logi-options-plus-alternative-macos)——替换 Electron 工具套件。
- [Mos、LinearMouse 与 Mac Mouse Fix 对比](/zh-Hans/docs/comparisons/mos-vs-linearmouse-vs-mac-mouse-fix)——了解免费工具之间的区别。
- [MX Master 3S：从 Logi Options+ 迁移](/zh-Hans/docs/comparisons/mx-master-3s-mac-setup-without-logi-options)——逐步完成迁移。

## 产品预览 {#product-preview}

<ThemedImage
  alt={"LinguaX Mouse+ 面板中的设备和按键映射"}
  sources={{
    light: useBaseUrl('/img/linguax-mouse-gesture-mapping.png'),
    dark: useBaseUrl('/img/linguax-mouse-gesture-mapping-dark.png'),
  }}
  width="420"
/>

<ThemedImage
  alt={"LinguaX 输入法应用规则"}
  sources={{
    light: useBaseUrl('/img/linguax-input-method-app-mapping.png'),
    dark: useBaseUrl('/img/linguax-input-method-app-mapping-dark.png'),
  }}
  width="420"
/>

各功能页面还提供更多截图。有疑问时，请先查看[常见问答](/zh-Hans/docs/reference/faq-general)或[问题排查](/zh-Hans/docs/troubleshooting/common-issues)。
