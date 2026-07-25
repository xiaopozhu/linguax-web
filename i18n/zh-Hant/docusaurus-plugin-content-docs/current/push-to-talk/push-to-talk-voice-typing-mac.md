---
title: "Mac 按住說話語音輸入：把 Fn 鍵綁到滑鼠側鍵（30 秒設定）"
description: "Mac 上開啟按住說話（push-to-talk）語音輸入的最快方法：把 macOS 聽寫使用的 Fn / Globe 鍵綁到滑鼠拇指側鍵，按住說話、放開停止。相容 macOS 系統聽寫、Wispr Flow、superwhisper、Typeless 等 hold-to-talk 語音工具。"
keywords:
  - mac 滑鼠 語音輸入
  - mac 按住說話
  - macbook 按住說話 滑鼠
  - mac 滑鼠側鍵 語音輸入
  - mac 語音輸入 滑鼠
  - macos 語音輸入 快捷鍵
  - mac 滑鼠 push to talk
  - mac 蘋果電腦 按住說話
  - macos dictation 滑鼠
  - wispr flow mac 滑鼠
  - superwhisper mac 滑鼠
---

import Head from '@docusaurus/Head';

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {'@type': 'Question', name: '只有 macOS 系統聽寫能這樣用嗎？', acceptedAnswer: {'@type': 'Answer', text: '不是。macOS 系統聽寫、Wispr Flow、superwhisper、Typeless 這些用 Fn/Globe 作為觸發鍵的都可以直接生效。用別的快捷鍵的工具（比如 Whisper 類的自訂組合鍵），用 LinguaX 的普通鍵盤快捷鍵映射也能同樣做出按住說話效果。'}},
    {'@type': 'Question', name: '需要羅技滑鼠嗎？', acceptedAnswer: {'@type': 'Answer', text: '不需要。任何 USB 或藍牙滑鼠只要有閒置的側鍵都能用。羅技識別的型號（MX Master 2S/3/3S、MX Anywhere、G502 X、M720、M585 等）會有額外的預設映射優化，但按住說話不依賴羅技硬體。'}},
    {'@type': 'Question', name: 'Mac 睡眠喚醒後按鍵還會靈嗎？', acceptedAnswer: {'@type': 'Answer', text: '會。藍牙滑鼠喚醒後自動重新連線，LinguaX 會在喚醒時重新整理輸入服務，按鍵映射繼續生效，不用重啟。'}},
    {'@type': 'Question', name: 'LinguaX 免費嗎？', acceptedAnswer: {'@type': 'Answer', text: '有 30 天的完整功能免費試用，無需註冊帳號。之後是一次性 9.9 美元、可授權 3 台裝置，沒有訂閱。'}}
  ]
};

<Head>
  <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
</Head>

# Mac 按住說話語音輸入：把 Fn 鍵綁到滑鼠側鍵

**按住說話（push-to-talk）**是最貼合手感的語音輸入方式：按住講、放開停，不用切換、不用記狀態。macOS 的**系統聽寫（Dictation）**和大部分第三方語音工具都用 **Fn（Globe，地球）鍵**作為觸發鍵。LinguaX 可以把這次「按住 Fn」綁到滑鼠上的**側鍵 / 拇指鍵**，讓你的手不用離開滑鼠就能開口說話。

## 為什麼用滑鼠側鍵，而不是鍵盤

在 Mac 上做瀏覽、閱讀、審稿這些事時，右手一直在滑鼠上。中途按鍵盤上的 Fn 鍵會打斷動作節奏。改到滑鼠側鍵之後：

- **手停在原位**，看到一段文字想回覆就直接按側鍵說話。
- **拇指按住比鍵盤任何鍵都快**，反應零延遲。
- **hold-to-talk 比 toggle 更自然**——就像對講機、就像按住 shift 打大寫，不用記「是不是還在錄音」。
- **左手完全空出來**，可以邊說邊編輯。

## LinguaX 是怎麼做到的

LinguaX 的 **Mouse+** 提供一種叫**修飾鍵按住（Modifier Hold）**的手勢。綁到滑鼠按鍵之後，按下這顆按鍵時，系統就像你實際按住某個修飾鍵（Fn、Command、Option 等）一樣，放開就釋放：

- **按下滑鼠側鍵** → 系統持續接收 **Fn（Globe）** 鍵按下訊號。
- **放開滑鼠側鍵** → 系統釋放 Fn 鍵。

因為動作是「按住期間生效、放開立刻取消」，跟所有 hold-to-talk 語音工具的觸發模型完全對齊。

## 設定步驟（大約 30 秒）

1. 打開 LinguaX，進入 **Mouse+** 設定。
2. 選中你想用的滑鼠按鍵（側鍵或拇指鍵最合手）。
3. 手勢選**修飾鍵按住（Modifier Hold）**，修飾鍵選 **Fn**。
4. 儲存即可。這顆按鍵現在等價於「按住 Fn」。

> Modifier Hold 會獨佔這顆按鍵。儲存後，該按鍵之前綁定的其他手勢會被替換。

## 語音工具那一側要同步設定

把語音工具的按住說話快捷鍵指向 **Fn（Globe）** 鍵：

- **macOS 系統聽寫**：在**系統設定 → 鍵盤 → 聽寫**裡，把聽寫快捷鍵設為 Globe / Fn 鍵。
- **hold-to-talk 語音工具**（如 Typeless、Wispr Flow、superwhisper 等）：在應用程式偏好裡把「按住說話」的快捷鍵設定成 Fn/Globe。

兩邊都對準 Fn 之後，按住滑鼠側鍵就是開始聽寫、放開就是停止。

如果你用的語音工具不認 Fn 而是要求別的按鍵，看 [Wispr Flow 與 superwhisper 快捷鍵設定](/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac)——裡面同時講了 Modifier Hold 和普通鍵盤快捷鍵兩條路徑。

## 關於快捷鍵權限（少走彎路）

- LinguaX 需要**輔助使用（Accessibility）**權限才能全域按住修飾鍵。首次執行會提示授權。
- 如果你用的語音工具還需要**麥克風**和**輸入監控**權限，一次授全，別每次報錯才補——中途打斷聽寫反而更煩。

## 讓設定更穩的幾個建議

- 選一顆**平時不常用**的按鍵。別把它綁在你已經拿來做瀏覽器「上一頁」的按鍵上，跟你的肌肉記憶打架。
- 一開始先在**記事本或瀏覽器網址列**這種普通文字框裡測。等確認能穩定聽寫，再處理各家應用程式的相容問題。
- 如果語音工具同時提供 **toggle（切換）**和 **hold（按住）**兩種模式，選 **hold**——才和這個按鍵手勢對齊。
- 別讓兩個滑鼠工具（比如同時裝了 Logi Options+ 和 LinguaX）都綁同一顆按鍵，衝突時肯定丟事件。

## 排錯清單

- 確認 LinguaX 已獲得輔助使用權限。
- 確認沒有其他工具（Logi Options+、Karabiner 等）也綁了同一按鍵。
- 確認語音工具的快捷鍵是 Fn/Globe，不是別的鍵。
- 若之前這顆按鍵綁過別的手勢，重新儲存一次 Modifier Hold。

## 常見問題

### 只有 macOS 系統聽寫能這樣用嗎？

不是。macOS 系統聽寫、Wispr Flow、superwhisper、Typeless 這些用 Fn/Globe 作為觸發鍵的都可以直接生效。用別的快捷鍵的工具（比如 Whisper 類的自訂組合鍵），用 LinguaX 的普通鍵盤快捷鍵映射也能同樣做出按住說話效果。

### 需要羅技滑鼠嗎？

不需要。任何 USB 或藍牙滑鼠只要有閒置的側鍵都能用。羅技識別的型號（MX Master 2S/3/3S、MX Anywhere、G502 X、M720、M585 等）會有額外的預設映射優化，但按住說話不依賴羅技硬體。看[裝置相容性](/docs/mouse-plus/device-compatibility)。

### Mac 睡眠喚醒後按鍵還會靈嗎？

會。藍牙滑鼠喚醒後自動重新連線，LinguaX 會在喚醒時重新整理輸入服務，按鍵映射繼續生效，不用重啟。

### LinguaX 免費嗎？

有 30 天的完整功能免費試用，無需註冊帳號。之後是**一次性 9.9 美元、可授權 3 台裝置**，沒有訂閱。

## 開始使用

**[下載 LinguaX](/download)**，30 秒把按住說話綁到你的滑鼠側鍵上。

## 延伸閱讀

- [Mac 滑鼠側鍵怎麼映射：任意品牌滑鼠教程](/zh-Hant/docs/mouse-plus/recipes/map-mouse-side-buttons-macos)
- [Mac 滑鼠捲動卡頓？三方滑鼠順滑捲動的解決方法](/zh-Hant/docs/mouse-plus/recipes/fix-choppy-mouse-scrolling-macos)
- [Mac 滑鼠增強對比：Mos vs LinearMouse vs Mac Mouse Fix](/zh-Hant/docs/comparisons/mos-vs-linearmouse-vs-mac-mouse-fix)
- [按鍵映射基礎](/docs/mouse-plus/fundamentals/button-mapping)
- [用滑鼠按鍵觸發 macOS 聽寫](/docs/mouse-plus/recipes/macos-dictation-mouse-button)
- [Mac 上最好的按住說話（Push-to-Talk）應用程式推薦](/docs/push-to-talk/best-push-to-talk-app-mac)
- [Wispr Flow 與 superwhisper 快捷鍵設定](/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac)
- [Mouse+ 概覽](/docs/mouse-plus/overview)
