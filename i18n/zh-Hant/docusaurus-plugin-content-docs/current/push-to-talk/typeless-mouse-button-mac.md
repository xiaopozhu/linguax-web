---
title: "Typeless 用滑鼠觸發：把按住說話綁到滑鼠側鍵（Mac）"
description: "Mac 上把 Typeless 的按住說話觸發鍵從 Fn 搬到滑鼠側鍵：按住側鍵說話、放開插入文字，手不用離開滑鼠。附 macOS Globe 鍵衝突的解決方法。"
keywords:
  - typeless 滑鼠觸發
  - typeless 用滑鼠觸發
  - typeless 按住說話 滑鼠
  - typeless 快捷鍵 mac
  - typeless 滑鼠側鍵
  - typeless 語音輸入 滑鼠
  - typeless fn 鍵 觸發
---

# Typeless 用滑鼠觸發：把按住說話綁到滑鼠側鍵

**Typeless** 預設用 **Fn（Globe，地球）鍵**做按住說話：按住 Fn 說話、放開出字。但 Fn 是鍵盤上最不順手的鍵之一，而且它是硬體級按鍵，很多外接裝置和巨集工具根本發不出來。用 LinguaX 可以把 **Typeless 的觸發搬到滑鼠側鍵**上：按住側鍵說話、放開插入文字，右手全程不用離開滑鼠。

## 為什麼把 Typeless 觸發鍵搬到滑鼠上

- 瀏覽、閱讀、審稿時右手本來就在滑鼠上，伸手去按 Fn 會打斷節奏。
- 拇指側鍵比鍵盤上任何鍵都快。
- 側鍵按住說話像對講機一樣自然，不用記「現在是不是還在錄音」。
- Fn 是硬體級按鍵，很多遙控器和巨集工具發不出來——LinguaX 的**修飾鍵按住（Modifier Hold）**是在系統層面真實按住 Fn，Typeless 收到的就是它期望的訊號。

## 工作原理

LinguaX 的 **Mouse+** 提供**修飾鍵按住（Modifier Hold）**手勢。綁到滑鼠按鍵後：

- **按下並按住滑鼠側鍵** → 系統持續接收 **Fn（Globe）** 鍵按下訊號，Typeless 開始聽寫。
- **放開側鍵** → Fn 釋放，Typeless 把整理好的文字插入游標處。

動作只在按住期間生效，和 Typeless 的 hold-to-talk 模型一一對應。

## 設定步驟

### 1. 先解除 macOS 對 Globe 鍵的佔用

macOS 預設把 Globe/Fn 鍵分配給**顯示表情符號**或**切換輸入法**，會在 Typeless 之前把按鍵吃掉：

1. 打開**系統設定 → 鍵盤**。
2. 找到**「按下 🌐/Fn 鍵以」**。
3. 改成**不執行任何動作**。

### 2. 確認 Typeless 使用 Fn

在 **Typeless → 設定 → Shortcuts（快捷鍵）**裡，保持預設的 **Fn** 按住說話快捷鍵。（Typeless 的每個快捷鍵都可以在這裡修改，之後想換配置也行。）

### 3. 在 LinguaX 裡綁定滑鼠按鍵

1. 打開 LinguaX，進入 **Mouse+** 設定。
2. 選中一顆閒置的側鍵（拇指鍵最順手）。
3. 手勢選**修飾鍵按住（Modifier Hold）**，修飾鍵選 **Fn**。
4. 儲存。

> Modifier Hold 會獨佔這顆按鍵。儲存後，該按鍵之前綁定的其他手勢會被替換。

### 4. 測試

點進任意文字框，**按住**滑鼠側鍵說話，**放開**——Typeless 會把整理後的文字插入游標處。

## 更喜歡切換式？用免手持模式

長段落一直按著會累的話，Typeless 還有免手持模式（預設 **Fn + 空白鍵**：按一下開始、再按 Fn 結束）。用滑鼠觸發它：

1. 在 LinguaX **Mouse+** 裡選中側鍵。
2. 手勢選普通點擊，動作選**鍵盤快捷鍵（Keyboard Shortcut）**。
3. 錄製 **Fn + 空白鍵**（或你在 Typeless 裡自訂的免手持快捷鍵）。
4. 儲存——按一下開始聽寫，再按一下結束。

同樣的方法也適用於 Typeless 的其他快捷鍵，例如**翻譯**（Fn + 左 Shift）和 **Ask AI**（Cmd + Shift + A）。

## 讓設定更穩的幾個建議

- 選一顆平時不用於點擊、捲動或瀏覽器「前進/後退」的按鍵。
- LinguaX 需要**輔助使用（Accessibility）**權限才能全域按住修飾鍵；Typeless 那一側需要**麥克風**和**輸入監聽**權限，一次授全。
- 先在純文字框裡測穩了，再到瀏覽器、IDE、聊天軟體裡用。
- 別讓 LinguaX 和其他滑鼠工具（Logi Options+、Karabiner 等）同時綁同一顆按鍵，衝突時會掉事件。

## 排錯清單

- **按住側鍵 Typeless 沒反應** → 檢查 macOS 是否還佔用著 Globe 鍵（第 1 步），以及 LinguaX 是否有輔助使用權限。
- **能開始聽寫但不出字** → 檢查 Typeless 的麥克風 / 輸入監聽權限。
- **按鍵觸發的還是舊動作** → 重新儲存一次 Modifier Hold，它會替換該按鍵上的舊映射。
- **記事本裡正常、某個應用裡不行** → 回到純文字框複測，確認是不是該應用本身攔截輸入的問題。

## 常見問題

### Typeless 可以用滑鼠觸發嗎？

可以。Typeless 預設用 Fn（Globe）鍵做按住說話的快捷鍵。LinguaX 的 Modifier Hold 手勢能讓滑鼠側鍵在你按住期間一直按住 Fn，所以按住側鍵就開始聽寫、放開就插入文字。

### 為什麼按 Fn 時 Typeless 沒反應？

macOS 預設把 Globe/Fn 鍵分給了「顯示表情符號」或「切換輸入法」。到**系統設定 → 鍵盤**，把**「按下 🌐/Fn 鍵以」**改成**不執行任何動作**，Typeless 才能收到這個鍵。

### 免手持（hands-free）模式也能用滑鼠觸發嗎？

能。喜歡切換式聽寫的話，用 LinguaX 的鍵盤快捷鍵動作把側鍵映射到 Typeless 的免手持快捷鍵（預設 Fn + 空白鍵）即可，不用 Modifier Hold。

### 需要羅技滑鼠嗎？

不需要。任何 USB 或藍牙滑鼠只要有閒置側鍵都能用。羅技已識別的型號（MX Master 2S/3/3S/4、MX Anywhere、G502 X、M720、M585 等）有額外的預設映射最佳化，但 Typeless 觸發不依賴羅技硬體。

### LinguaX 免費嗎？

有 30 天完整功能免費試用，無需註冊帳號。之後是**一次性 9.9 美元、可授權 3 台裝置**，沒有訂閱。

## 開始使用

**[下載 LinguaX](/download)**，30 秒把 Typeless 的按住說話綁到滑鼠側鍵上。

## 延伸閱讀

- [Mac 按住說話語音輸入：把 Fn 鍵綁到滑鼠側鍵](/docs/push-to-talk/push-to-talk-voice-typing-mac)
- [Wispr Flow 與 superwhisper 快捷鍵設定](/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac)
- [Mac 上最好的按住說話（Push-to-Talk）應用推薦](/docs/push-to-talk/best-push-to-talk-app-mac)
- [用滑鼠按鍵觸發 macOS 聽寫](/docs/mouse-plus/recipes/macos-dictation-mouse-button)
- [Mac 滑鼠側鍵映射方法](/docs/mouse-plus/recipes/map-mouse-side-buttons-macos)
- [按鍵映射基礎](/docs/mouse-plus/fundamentals/button-mapping)
