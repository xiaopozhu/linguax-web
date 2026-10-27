---
title: "簡介"
description: "LinguaX 文件：原生 macOS 滑鼠增強與輸入法自動切換工具，約 10 MB，免驅動程式、免帳號，不收集行為遙測。"
keywords:
  - LinguaX 文件
  - Mac 滑鼠工具
  - Mac 輸入法自動切換
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

LinguaX 是約 10 MB 的原生 macOS 工具，提供兩個獨立的核心模組：**Mouse+** 讓第三方滑鼠擁有自然的操作手感，包含平滑捲動、按鍵與手勢映射，以及個別 App 行為；**輸入法自動切換**則會根據目前的 App 或網站，切換到合適的輸入法。免驅動程式、免帳號，不收集行為遙測。基礎滑鼠功能適用於任何 USB 或藍牙滑鼠；特殊按鍵等進階能力依型號而定。

<ThemedImage
  alt={"LinguaX 的兩個獨立核心模組：Mouse+ 滑鼠增強與輸入法自動切換"}
  sources={{
    light: useBaseUrl('/img/linguax-two-modules.svg'),
    dark: useBaseUrl('/img/linguax-two-modules-dark.svg'),
  }}
  width="720"
/>

## 從這裡開始 {#start-here}

第一次使用 LinguaX？以下三篇短文可協助你完成下載與設定：

1. [安裝](/zh-Hant/docs/getting-started/installation)：拖曳到「應用程式」，不到一分鐘即可完成。
2. [首次啟動](/zh-Hant/docs/getting-started/first-run)：授予權限並建立第一個映射。
3. [快速導覽](/zh-Hant/docs/getting-started/quick-tour)：五分鐘確認所有功能正常運作。

想依工作需求設定？請參閱[開發者設定指南](/zh-Hant/docs/getting-started/setup-for-developers)或[設計師設定指南](/zh-Hant/docs/getting-started/setup-for-designers)。

## 設定滑鼠 {#configure-your-mouse}

將一般滑鼠變成精準且可自訂的工具：

- [Mouse+ 概覽](/zh-Hant/docs/mouse-plus/overview)：模組功能與原生設計的優點。
- [平滑捲動](/zh-Hant/docs/mouse-plus/fundamentals/smooth-scrolling)：調整 Min Step、Speed Gain 與 Duration。
- [按鍵映射](/zh-Hant/docs/mouse-plus/fundamentals/button-mapping)與[手勢映射](/zh-Hant/docs/mouse-plus/fundamentals/gesture-mapping)：為按鍵設定點按、按兩下、長按與方向拖曳動作。
- [相容型號](/zh-Hant/docs/mouse-plus/device-compatibility)：MX Master、MX Anywhere、G Pro X Superlight、Lift、MX Ergo 等型號的個別指南。

## 自動切換輸入法 {#automate-input-switching}

在多語言、多 App 的工作流程中，輸入法會自動配合目前的使用情境：

- [輸入法自動切換](/zh-Hant/docs/input-source/auto-switch)：運作方式與觸發條件。
- [App 與網站規則](/zh-Hant/docs/input-source/app-and-website-rules)：兩種規則及其優先順序。
- [多語言工作流程](/zh-Hant/docs/input-source/multilingual-workflow)：建立穩定的雙語環境。

優先順序固定為**網站網域規則 > App 規則 > 全域預設值**。網域規則適用於 Safari、Chrome、Edge、Brave 與 Opera，不支援 Firefox。

## 設定按住說話 {#set-up-push-to-talk}

滑鼠側鍵可模擬按住 Fn（地球）鍵，成為語音輸入的實體按住說話開關：

- [Mac 按住說話語音輸入](/zh-Hant/docs/push-to-talk/push-to-talk-voice-typing-mac)：基本設定。
- [Mac 按住說話 App 選擇](/zh-Hant/docs/push-to-talk/best-push-to-talk-app-mac)：挑選語音工具。
- [Wispr Flow 與 superwhisper 快速鍵](/zh-Hant/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac)：個別 App 設定。

## 為什麼選擇 LinguaX {#why-linguax}

- **輕巧**：約 10 MB 的原生 macOS App，無 Electron 執行環境。
- **重視隱私**：免帳號、不收集行為遙測；滑鼠與輸入法核心功能在本機執行。啟用 LinguaX 的 iCloud 功能後，可透過自己的 iCloud 同步設定。AIx 僅在你主動呼叫 AI 動作並同意傳送時提交文字；下載、更新與授權驗證會使用網路服務。
- **免驅動程式**：拖曳到「應用程式」即可使用，基礎功能適用於任何 USB 或藍牙滑鼠。
- **價格透明**：[$9.9 一次買斷的永久授權](/zh-Hant/docs/reference/trial-vs-lifetime)，可用於 3 台裝置，並提供 30 天免費試用。無訂閱費。

## 從其他工具移轉？ {#coming-from-another-tool}

- [Logi Options+ 替代方案](/zh-Hant/docs/comparisons/logi-options-plus-alternative-macos)：取代 Electron 套件。
- [Mos、LinearMouse 與 Mac Mouse Fix 比較](/zh-Hant/docs/comparisons/mos-vs-linearmouse-vs-mac-mouse-fix)：免費工具的差異。
- [MX Master 3S：從 Logi Options+ 移轉](/zh-Hant/docs/comparisons/mx-master-3s-mac-setup-without-logi-options)：逐步移轉指南。

## 產品預覽 {#product-preview}

<ThemedImage
  alt={"LinguaX Mouse+ 面板，顯示裝置與按鍵映射"}
  sources={{
    light: useBaseUrl('/img/linguax-mouse-gesture-mapping.png'),
    dark: useBaseUrl('/img/linguax-mouse-gesture-mapping-dark.png'),
  }}
  width="420"
/>

<ThemedImage
  alt={"LinguaX 輸入法 App 規則"}
  sources={{
    light: useBaseUrl('/img/linguax-input-method-app-mapping.png'),
    dark: useBaseUrl('/img/linguax-input-method-app-mapping-dark.png'),
  }}
  width="420"
/>

各功能頁面中還有更多螢幕截圖。如有疑問，請先參閱[一般常見問題](/zh-Hant/docs/reference/faq-general)或[疑難排解](/zh-Hant/docs/troubleshooting/common-issues)。
