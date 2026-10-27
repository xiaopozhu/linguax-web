---
title: "macOS 權限"
description: "了解 LinguaX 所需的 macOS 輔助使用與輸入監控權限、各權限的用途，以及功能停止時的恢復流程。"
keywords:
  - LinguaX 權限
  - Mac 滑鼠輔助使用權限
  - Mac 輸入監控權限
---

LinguaX 的部分情境偵測與自動化功能，需要對應的 macOS 權限。

## 常見現象 {#common-symptoms}

- 切換 App 後輸入法沒有改變，需先檢查規則；App 層級切換本身不需要輔助使用權限。
- 瀏覽器中的網域規則不穩定。
- 快速鍵腳本動作在首次執行時失敗。

LinguaX 設定頁面主要列出以下兩項 macOS 權限：

## 所需權限 {#required-permissions}

- **Accessibility**（輔助使用）：用於滑鼠事件攔截、平滑捲動、指標速度、按鍵模擬，以及讀取瀏覽器目前分頁的 URL 以套用網站規則。
- **Input Monitoring**（輸入監控）：用於 HID 裝置管理。

> App 層級的輸入法切換不需要輔助使用權限；**網站**網域規則需要讀取瀏覽器 URL，因此需要輔助使用權限。

## 必要檢查 {#required-checks}

1. 開啟 LinguaX 的權限狀態。
2. 開啟 macOS「**系統設定**」，確認已啟用所需權限。
3. 變更權限後重新啟動 LinguaX。

```mermaid
flowchart TD
    S([哪個功能停止運作？]) --> AS[App 層級輸入法切換]
    S --> DS[網域規則<br/>讀取瀏覽器 URL]
    S --> MS[滑鼠平滑捲動或映射]
    S --> SC[腳本動作]
    AS --> OK1[不需額外權限<br/>檢查規則本身]
    DS --> N2{已授予輔助使用權限？}
    N2 -- 否 --> R1[授予輔助使用權限並重新啟動]
    N2 -- 是 --> OK2[檢查瀏覽器支援<br/>不支援 Firefox]
    MS --> N3{已授予輔助使用<br/>與輸入監控權限？}
    N3 -- 缺少其中一項 --> R2[授予兩項權限並重新啟動]
    N3 -- 兩項都有 --> OK3[檢查映射與工具衝突]
    SC --> N4{已允許對目標 App<br/>的自動化提示？}
    N4 -- 否 --> R3[重新執行動作<br/>允許權限提示]
    N4 -- 是 --> OK4[檢查腳本本身]
```

## 關於腳本動作的權限提示 {#about-script-action-prompts}

腳本動作控制 App（例如 System Events 或 Finder）時，macOS 可能另外要求「自動化」權限。

允許這些提示後，對應動作才能運作。

## 恢復流程 {#recovery-flow}

1. 結束 LinguaX。
2. 重新開啟 LinguaX。
3. 重新授予缺少的權限。
4. 測試一項 App 規則。
5. 測試一項網域規則。
6. 若使用腳本動作，請再執行一次內建範本。

## 更新後注意事項 {#post-update-note}

近期版本包含儲存架構升級。更新後首次啟動時，資料移轉可能需要較多時間，完成後各功能才會恢復正常。

## 相關文件 {#related-docs}

- [首次啟動](/zh-Hant/docs/getting-started/first-run)
- [滑鼠問題](/zh-Hant/docs/troubleshooting/mouse-issues)
- [常見問題排解](/zh-Hant/docs/troubleshooting/common-issues)
- [快速鍵與熱鍵](/zh-Hant/docs/concepts/shortcut-and-hotkeys)
