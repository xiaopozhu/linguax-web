---
title: "一般常見問題"
description: "LinguaX 常見問題：相容性、價格、隱私、試用，以及滑鼠增強與輸入法自動切換模組的運作方式。"
keywords:
  - LinguaX 常見問題
  - LinguaX 問題
  - LinguaX 使用說明
---

## LinguaX 是什麼？ {#what-is-linguax}

LinguaX 是輕巧的原生 macOS 工具，提供兩個核心模組：**Mouse+ 滑鼠增強**，包含平滑捲動、側鍵與手勢映射、個別 App 平滑捲動開關，以及指標速度控制；另一個是依 App 與網站**自動切換輸入法**。兩者是獨立且平級的核心能力。

這是約 10 MB 的原生 App，無 Electron 執行環境。滑鼠與輸入法核心行為在本機執行。AIx 僅在你主動呼叫 AI 動作並同意傳送時提交文字；下載、更新與授權驗證使用網路服務。啟用 LinguaX 的 iCloud 功能後，可透過自己的 iCloud 同步設定。

## 適合哪些人？ {#who-is-it-for}

適合整天使用滑鼠的開發者、設計師與多語言使用者：讓滑鼠操作更順手，也能在切換 App 與網站時自動選擇輸入法。

## LinguaX 是滑鼠工具還是輸入法工具？ {#is-linguax-a-mouse-tool-or-an-input-method-tool}

兩者都是。Mouse+ 滑鼠增強與輸入法切換是兩項獨立的核心能力；我們先介紹滑鼠功能，但兩者互不隸屬。

## LinguaX 只能在瀏覽器中使用嗎？ {#does-linguax-only-work-in-browsers}

不是。Mouse+ 增強功能適用於整個系統。輸入法切換方面，App 規則可用於 macOS App；瀏覽器網域規則則提供更細的網站控制，依網域比對並支援父網域回退。

## 核心功能需要雲端處理嗎？ {#does-linguax-require-cloud-processing-for-core-behavior}

不需要。滑鼠與輸入法核心行為都在你的 Mac 本機執行。AIx 文字生成是選用的線上功能，僅在你主動呼叫並同意傳送時提交文字。下載、更新與授權驗證也需要網路服務。資料流程請參閱[隱私權政策](/zh-Hant/terms/privacy-policy/)。

## LinguaX 多少錢？ {#how-much-does-linguax-cost}

LinguaX 提供 **$9.9 一次買斷的 Lifetime 永久授權，最多可用於 3 台裝置**，沒有月費或週期性訂閱扣款。最新價格請參閱[價格頁面](/zh-Hant/pricing)。

## 有免費試用嗎？ {#is-there-a-free-trial}

有。免費試用提供 **30 天完整功能**，無須付款，讓你在購買前於實際工作流程中驗證效果。請參閱[試用與永久授權](/zh-Hant/docs/reference/trial-vs-lifetime)。

## 是訂閱制嗎？ {#is-it-a-subscription}

不是。LinguaX 一次購買即可永久使用，無週期性費用。

## 一份授權可用於幾台裝置？ {#how-many-devices-does-one-license-cover}

一份永久授權可啟用於**最多 3 台裝置**，方便在多台 Mac 上使用。請參閱[授權啟用](/zh-Hant/docs/reference/license-activation)。

## 為什麼滑鼠映射或手勢無法運作？ {#why-is-a-mouse-mapping-or-gesture-not-working}

常見原因包括缺少權限、同時執行其他滑鼠工具，或型號專屬按鍵的能力限制。未列入辨識清單的 USB 或藍牙滑鼠仍可使用基礎功能。請參閱[滑鼠問題](/zh-Hant/docs/troubleshooting/mouse-issues)。

## 為什麼網站規則沒有觸發？ {#why-is-a-website-rule-not-triggering}

通常是以下原因之一：

- 網域文字不正確。
- 規則重疊。
- 缺少所需的 macOS 權限。

請參閱 [App 與網站規則](/zh-Hant/docs/input-source/app-and-website-rules)及[常見問題排解](/zh-Hant/docs/troubleshooting/common-issues)。

## 哪裡可以找到實際設定範例？ {#where-can-i-find-practical-setup-examples}

可從以下指南開始：

- [修正 macOS 滑鼠捲動不順](/zh-Hant/docs/mouse-plus/recipes/fix-choppy-mouse-scrolling-macos)
- [在 macOS 映射滑鼠側鍵](/zh-Hant/docs/mouse-plus/recipes/map-mouse-side-buttons-macos)
- [依 App 與網域自動切換輸入法](/zh-Hant/docs/input-source/auto-switch-input-source-app-domain-mac)
