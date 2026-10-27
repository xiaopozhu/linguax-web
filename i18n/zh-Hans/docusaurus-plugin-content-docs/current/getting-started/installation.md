---
title: "安装 LinguaX"
description: "通过 Homebrew Cask 或官网下载，在 macOS 上安装约 10 MB 的原生 LinguaX 应用，并了解首次启动与更新方式。"
keywords:
  - "安装 LinguaX"
  - "LinguaX 下载"
  - "LinguaX Homebrew Cask"
  - "brew install linguax"
  - "Mac 鼠标工具安装"
---

本指南介绍 LinguaX 支持的两种安装方式。LinguaX 是一款约 10 MB 的原生 macOS 应用，无需驱动或安装向导。两种方式安装的是同一份经过签名和公证的应用。

## 系统要求 {#requirements}

- macOS 13.0（Ventura）或更新版本
- Apple Silicon 或 Intel Mac
- 下载时需要网络连接
- 无需驱动或内核扩展

## 通过 Homebrew Cask 安装 {#install-with-homebrew-cask}

如果你使用 [Homebrew](https://brew.sh/)，一条命令即可安装 LinguaX：

```bash
brew install --cask linguax
```

Cask 位于官方 [`homebrew/cask`](https://github.com/Homebrew/homebrew-cask) 仓库，无需额外执行 `brew tap`。Homebrew 会下载已签名的 `.zip` 文件、校验文件，并自动将 `LinguaX.app` 移到 `/Applications`。

后续更新可运行：

```bash
brew upgrade --cask linguax
```

Homebrew 的 autobump 机器人会跟踪 Sparkle appcast，因此新版本通常会在发布后不久提供。卸载可运行 `brew uninstall --cask linguax`。

## 从官网下载 {#install-from-the-official-website}

1. 打开[下载页面](/zh-Hans/download)。
2. 选择 **Download Free**（免费下载）。
3. 等待 `.zip` 下载完成。
4. 打开下载的 `.zip`，解压出约 10 MB 的 `LinguaX.app`。
5. 将 `LinguaX.app` 拖入 **Applications**（应用程序），无需运行安装程序或配置驱动。

## 首次启动 {#first-launch}

1. 从 **Applications** 打开 LinguaX。
2. 确认菜单栏出现应用图标。
3. 授予所需的 macOS 权限。
4. 继续阅读[首次运行](/zh-Hans/docs/getting-started/first-run)。

## 更新方式 {#update-method}

- Homebrew Cask 用户：运行 `brew upgrade --cask linguax`。
- 直接下载的用户：从[下载页面](/zh-Hans/download)获取最新版本，覆盖现有应用。LinguaX 也会通过 Sparkle 自动检查更新。
- 两种更新方式都会保留现有规则和设置。配置使用 Core Data 存储；启用 LinguaX 的 iCloud 后可自动同步。

## 安装失败时 {#if-installation-fails}

- 重新下载安装包后重试。
- 检查 macOS 安全提示。
- 如果安装状态卡住，尝试重启 Mac。

然后查看[常见问题排查](/zh-Hans/docs/troubleshooting/common-issues)。
