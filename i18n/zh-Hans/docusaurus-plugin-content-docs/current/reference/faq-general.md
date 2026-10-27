---
title: "LinguaX 常见问答"
description: "了解 LinguaX 的鼠标增强与输入法功能、设备兼容性、定价、30 天试用、3 台设备许可，以及本地处理与在线服务的隐私边界。"
keywords:
  - "LinguaX 常见问答"
  - "LinguaX 问题"
  - "LinguaX 帮助"
---

## LinguaX 是什么？ {#what-is-linguax}

LinguaX 是一款轻量原生 macOS 工具，包含两大核心模块：**Mouse+ 鼠标增强**提供平滑滚动、侧键和手势映射、按应用平滑滚动开关以及指针速度控制；**输入法自动切换**则根据应用和网站切换输入法。两项能力彼此独立，产品介绍虽以鼠标为先，但它们在架构中是平级模块。

它是约 10 MB 的原生应用，无需 Electron。核心鼠标和输入法功能在本机运行。AIx 仅在你调用 AI 动作并同意传输时发送提交的文本；下载、更新和许可验证使用网络服务。启用 LinguaX 的 iCloud 后可自动同步配置。

## 适合哪些人？ {#who-is-it-for}

适合每天大量使用鼠标、希望减少重复操作的开发者、设计师和多语言用户，也适合需要在应用和网站间自动切换输入法的人。

## LinguaX 是鼠标工具还是输入法工具？ {#is-linguax-a-mouse-tool-or-an-input-method-tool}

两者都是。Mouse+ 鼠标增强和输入法自动切换是两项独立核心能力。产品介绍以鼠标为先，但任何一项都不是另一项的附属功能。

## LinguaX 只能在浏览器中使用吗？ {#does-linguax-only-work-in-browsers}

不是。Mouse+ 在系统范围内工作。输入法的应用规则适用于 macOS 应用，浏览器域名规则则进一步细化到网站，按域名匹配，并支持父域回退。

## 核心功能需要云端处理吗？ {#does-linguax-require-cloud-processing-for-core-behavior}

不需要。核心鼠标和输入法功能都在 Mac 本机运行。AIx 文本生成是可选在线功能，仅在你调用并同意传输时发送提交的文本。下载、更新与许可验证需要联网；启用 LinguaX 的 iCloud 后可同步配置。数据流程详见[隐私政策](/zh-Hans/terms/privacy-policy/)。

## LinguaX 多少钱？ {#how-much-does-linguax-cost}

LinguaX 提供 **$9.9 一次性买断的 Lifetime 许可，最多可用于 3 台设备**，没有月费或周期性订阅扣费。最新价格请见[定价页面](/zh-Hans/pricing)。

## 有免费试用吗？ {#is-there-a-free-trial}

有。试用期 **30 天，解锁全部功能**，无需付款，你可以先在实际工作流中验证，再决定是否购买。详见[试用与 Lifetime 对比](/zh-Hans/docs/reference/trial-vs-lifetime)。

## 是订阅制吗？ {#is-it-a-subscription}

不是。LinguaX 一次购买即可长期使用，没有周期性扣费。

## 一个许可可用于几台设备？ {#how-many-devices-does-one-license-cover}

一个 Lifetime 许可最多可激活 **3 台设备**，适合在多台 Mac 上使用。详见[许可激活](/zh-Hans/docs/reference/license-activation)。

## 鼠标映射或手势为什么不生效？ {#why-is-a-mouse-mapping-or-gesture-not-working}

常见原因包括权限缺失、其他鼠标工具同时运行，或特定型号的按键能力限制。未列入识别名单的 USB 或蓝牙鼠标也可使用基础功能。详见[鼠标问题排查](/zh-Hans/docs/troubleshooting/mouse-issues)。

## 网站规则为什么没有触发？ {#why-is-a-website-rule-not-triggering}

常见原因包括：

- 域名填写错误。
- 规则重叠。
- 缺少 macOS 权限。

请查看[应用与网站规则](/zh-Hans/docs/input-source/app-and-website-rules)和[常见问题排查](/zh-Hans/docs/troubleshooting/common-issues)。

## 哪里有实用设置示例？ {#where-can-i-find-practical-setup-examples}

可以从以下指南开始：

- [修复 macOS 鼠标滚动卡顿](/zh-Hans/docs/mouse-plus/recipes/fix-choppy-mouse-scrolling-macos)
- [如何映射 macOS 鼠标侧键](/zh-Hans/docs/mouse-plus/recipes/map-mouse-side-buttons-macos)
- [按应用与域名自动切换输入法](/zh-Hans/docs/input-source/auto-switch-input-source-app-domain-mac)
