---
title: "裝置相容性"
sidebar_label: "概覽"
description: "了解 Mouse+ 如何在 macOS 辨識滑鼠：辨識層級、藍牙與接收器的 HID++ 支援、電量顯示，以及免驅動程式的運作方式。"
keywords:
  - Mac 滑鼠免驅動程式
  - Logitech HID++ macOS
  - Mac 藍牙滑鼠電量
  - Logi Options+ 替代方案
  - Logitech 接收器 macOS
---

# 裝置相容性 {#device-compatibility}

Mouse+ 的基礎功能適用於 macOS 上的任何 USB 或藍牙滑鼠，不需要驅動程式或核心延伸功能。連接或配對滑鼠後即可使用；特殊按鍵與型號專屬能力則依裝置而定。

## 各型號的 Mac 設定指南 {#per-model-mac-setup-guides}

需要特定型號的逐步教學？「**相容型號**」系列介紹常見 macOS 滑鼠的配對方式、側鍵設定與按住說話功能：

- [MX Master 4](/zh-Hant/docs/mouse-plus/models/mx-master-4)：2025 年旗艦款，在七個基礎槽位之外增加 Actions Ring（`AR`）。
- [MX Master 3S](/zh-Hant/docs/mouse-plus/models/mx-master-3s)
- [MX Master 3](/zh-Hant/docs/mouse-plus/models/mx-master-3)
- [MX Anywhere 3S](/zh-Hant/docs/mouse-plus/models/mx-anywhere-3s)
- [MX Anywhere 3](/zh-Hant/docs/mouse-plus/models/mx-anywhere-3)
- [Logitech G Pro X Superlight](/zh-Hant/docs/mouse-plus/models/logitech-g-pro-x-superlight)
- [Logitech G Pro X Superlight 2](/zh-Hant/docs/mouse-plus/models/logitech-g-pro-x-superlight-2)
- [Logi Lift](/zh-Hant/docs/mouse-plus/models/logitech-lift)
- [MX Ergo](/zh-Hant/docs/mouse-plus/models/mx-ergo)

我們會持續新增型號指南。各型號的完整按鍵槽位清單，請參閱 [Mac 滑鼠相容性資料庫](/zh-Hant/tools/mouse-compatibility)。

## 基礎功能適用於任何滑鼠，22 款型號另有增強辨識 {#any-mouse-plus-enhanced-recognition-for-23-models}

平滑捲動、指標速度與通用按鍵映射等基礎功能，適用於任何 USB 或藍牙滑鼠，無須驅動程式。Mouse+ 另內建 **22 款特定型號**的辨識清單，提供型號專屬設定；可用的拇指鍵、滾輪模式、滾輪傾斜／拇指滾輪與特殊鍵處理，依型號及連線能力而定。

提供兩種辨識層級，其他裝置則使用通用處理方式：

- **HID++ 設定檔**：透過藍牙或 Bolt／Unifying／Lightspeed 接收器連線的 Logitech 滑鼠。依型號與連線能力，提供具名槽位（S1／S2／T／SM／WL／WR）、電量、段落式與自由捲動模式切換，以及型號預設值。
- **VID:PID 設定檔**：利用 USB／藍牙識別碼比對非 Logitech 滑鼠，提供具名槽位與側鍵點按映射，不包含 HID++ 專屬功能。若裝置支援標準 BLE 電量服務，仍可顯示電量。
- **通用 HID**：未列入辨識清單的裝置，透過通用 HID 引擎提供平滑捲動、指標速度與側鍵點按映射。

### 完整型號清單 {#which-models-exactly}

**[Mac 滑鼠相容性資料庫](/zh-Hant/tools/mouse-compatibility)**列出全部 22 款可辨識型號、USB 識別碼，以及各型號實際提供的側鍵、拇指鍵、滾輪模式鍵與滾輪傾斜槽位。資料從 App 的辨識清單同步產生。

**G502 X、G502 HERO 和 G502 Proteus Spectrum** 各有九個可設定槽位，其中包含已命名的 **G7 / G8 / G9** 按鍵。**G102 LIGHTSYNC** 目前不在增強辨識清單中，平滑捲動、指標速度與標準按鍵事件透過通用 HID 引擎處理；板載 DPI 鍵預設由韌體處理，不保證能直接映射。

型號辨識以 VID:PID 比對為基礎，結合 Logitech HID++／BLE 解析，並提供手動綁定型號的選項。辨識成功後會自動套用側鍵預設值，也可隨時使用 **Clear model binding**（清除型號綁定）重新辨識。即使沒有個別設定指南，清單中的型號仍可被辨識，並在連線時套用預設映射。

有兩個特殊情況：**Magic Mouse 2** 雖可辨識，但沒有可映射槽位，因此刻意隱藏於裝置清單；其觸控表面與手勢由 macOS 原生處理。**MX Ergo** 與兩款 **G Pro X Superlight** 則有設定指南，但不在增強辨識清單中，因此使用通用 HID 引擎，提供平滑捲動、指標速度與側鍵點按映射，不提供型號專屬槽位。

**找不到你的型號？** 滑鼠仍可透過通用 HID 引擎使用基礎增強功能。辨識清單會持續擴充；你可以提交議題，告訴我們缺少的型號。

## HID++／BLE 與電量 {#hid--ble-and-battery}

對於透過藍牙連線、支援 HID++ 的 Logitech 無線滑鼠，Mouse+ 可提供超越基礎點按的按鍵與手勢功能，具體能力取決於型號。事件驅動的 HID++ 讀取方式可降低延遲。僅有能回報電量的裝置才會顯示電量：支援標準電量服務的 BLE 滑鼠，以及支援 Logitech HID++ 的滑鼠。有線與一般 USB 滑鼠不會顯示電量。

## 支援的接收器系列 {#receiver-families-we-cover}

Logitech 滑鼠使用以下接收器或連線方式時，可搭配 LinguaX 使用；進階功能仍依型號而定：

- **Bolt**：Logitech 新一代安全接收器，2021 年後的許多 MX 系列與商務型號使用此系列。
- **Unifying**：長期使用的小型接收器，仍搭配 M720、M585／M590 與較早期的 MX 型號。
- **Lightspeed**：G 系列低延遲接收器，例如 G Pro X Superlight、G502 X Lightspeed 等。
- **Bluetooth**：無須接收器；支援的 Logitech 型號可透過 BLE 讀取 HID++。

想在不安裝 Logi Options+ 或 G HUB 的情況下配對新接收器？可使用[瀏覽器配對工具](/zh-Hant/tools/pair-logitech-receiver)，僅支援 Chrome 與 Edge，無須安裝軟體。

## 與 Logi Options+ 比較 {#compared-to-logi-options}

- **免帳號。** Mouse+ 不要求登入。
- **睡眠喚醒後持續運作。** 藍牙裝置會在睡眠後自動恢復，不需手動重新連線。
- **約 10 MB，原生 App。** 無 Electron，也不需要大型背景代理程式。

## 相關文件 {#related-docs}

- [macOS 的 Logi Options+ 替代方案](/zh-Hant/docs/comparisons/logi-options-plus-alternative-macos)
- [不使用 Logi Options+ 設定 MX Master 3S](/zh-Hant/docs/comparisons/mx-master-3s-mac-setup-without-logi-options)
