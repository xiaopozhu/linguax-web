---
title: "安裝"
description: "在 macOS 安裝 LinguaX：使用 Homebrew Cask 或官網下載約 10 MB 的原生 App，免驅動程式，並了解更新方式。"
keywords:
  - 安裝 LinguaX
  - LinguaX 下載
  - LinguaX Homebrew
  - Mac 滑鼠工具安裝
---

本指南介紹 LinguaX 的兩種安裝方式。LinguaX 是約 10 MB 的原生 macOS App，不需要驅動程式或安裝精靈。兩種方式安裝的都是同一份已簽署並通過 Apple 公證的程式。

## 系統需求 {#requirements}

- macOS 13.0（Ventura）或更新版本
- Apple Silicon 或 Intel Mac
- 下載時需要網路連線
- 不需要驅動程式或核心延伸功能

## 使用 Homebrew Cask 安裝 {#install-with-homebrew-cask}

如果你使用 [Homebrew](https://brew.sh/)，只需執行一行指令：

```bash
brew install --cask linguax
```

套件收錄於官方 [`homebrew/cask`](https://github.com/Homebrew/homebrew-cask)，不需要額外執行 `brew tap`。Homebrew 會下載已簽署的 `.zip`、完成驗證，並自動將 `LinguaX.app` 移至 `/Applications`。

日後更新時執行：

```bash
brew upgrade --cask linguax
```

Homebrew 的 autobump 機器人會追蹤 Sparkle appcast，因此新版本通常會在發布後不久提供。若要解除安裝，請執行 `brew uninstall --cask linguax`。

## 從官方網站安裝 {#install-from-the-official-website}

1. 開啟[下載頁面](/zh-Hant/download)。
2. 選擇 **Download Free**（免費下載）。
3. 等待 `.zip` 檔案下載完成。
4. 開啟下載的 `.zip`，解壓縮出 `LinguaX.app`（約 10 MB）。
5. 將 `LinguaX.app` 拖曳至「**應用程式**」，無須額外安裝或設定驅動程式。

## 首次啟動 {#first-launch}

1. 從「**應用程式**」開啟 LinguaX。
2. 確認選單列出現圖示。
3. 授予所需的 macOS 權限。
4. 接著閱讀[首次啟動](/zh-Hant/docs/getting-started/first-run)。

## 更新方式 {#update-method}

- Homebrew Cask 使用者：執行 `brew upgrade --cask linguax`。
- 官網下載使用者：從[下載頁面](/zh-Hant/download)取得最新版本，覆蓋原本的 App。LinguaX 也會透過 Sparkle 檢查更新。
- 兩種方式都會保留既有規則與設定（Core Data；若已啟用，也會使用 iCloud 同步）。

## 安裝失敗時 {#if-installation-fails}

- 重新下載檔案後再試一次。
- 檢查 macOS 安全性提示。
- 如果安裝狀態似乎停住，請重新啟動 Mac。

接著參閱[常見問題排解](/zh-Hant/docs/troubleshooting/common-issues)。
