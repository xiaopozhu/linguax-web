---
title: "デバイスの互換性"
sidebar_label: "概要"
description: "Mouse+の対応マウスと認識方式を解説。任意のUSB・Bluetoothマウスの基本機能、22機種の拡張対応、HID++、レシーバー、バッテリー表示を確認できます。"
keywords:
  - "Mac マウス ドライバ不要"
  - "Logitech HID++ macOS"
  - "Bluetooth マウス バッテリー"
  - "Logi Options+ 代替"
---

# デバイスの互換性 {#device-compatibility}

Mouse+の基本機能は、macOSに接続した任意のUSB・Bluetoothマウスで使えます。ドライバやカーネル拡張は不要です。接続・ペアリングするだけで、スクロールやポインタなどを調整できます。

## 機種別のMac設定ガイド {#per-model-mac-setup-guides}

特定の機種を設定したい方は、次のガイドをご覧ください。ペアリング、サイドボタンの活用例、プッシュトゥトークの設定を説明しています。

- [MX Master 4](/ja/docs/mouse-plus/models/mx-master-4) — 7スロットの基本構成にActions Ring（`AR`）を備えた2025年のフラッグシップ
- [MX Master 3S](/ja/docs/mouse-plus/models/mx-master-3s)
- [MX Master 3](/ja/docs/mouse-plus/models/mx-master-3)
- [MX Anywhere 3S](/ja/docs/mouse-plus/models/mx-anywhere-3s)
- [MX Anywhere 3](/ja/docs/mouse-plus/models/mx-anywhere-3)
- [Logitech G Pro X Superlight](/ja/docs/mouse-plus/models/logitech-g-pro-x-superlight)
- [Logitech G Pro X Superlight 2](/ja/docs/mouse-plus/models/logitech-g-pro-x-superlight-2)
- [Logi Lift](/ja/docs/mouse-plus/models/logitech-lift)
- [MX Ergo](/ja/docs/mouse-plus/models/mx-ergo)

ガイドは順次追加しています。機種ごとのボタンスロットを含む一覧は、[Macマウス互換性データベース](/ja/tools/mouse-compatibility)をご覧ください。

## 任意のマウスの基本機能と22機種の拡張認識 {#any-mouse-plus-enhanced-recognition-for-23-models}

スムーズスクロール、ポインタ速度、汎用ボタンの割り当ては、任意のUSB・Bluetoothマウスで利用できます。さらに、**22機種**の認識リストに基づき、親指ボタン、スクロールモード、ホイールチルト・親指ホイール、特殊ボタンなどの機種別プロファイルを提供します。使える機能は機種と接続方式によって異なります。

認識方式は次の2種類と、それ以外のマウス向けの汎用方式があります。

- **HID++プロファイル** — BluetoothやBolt・Unifying・Lightspeedレシーバー経由の対応Logitechマウス。機種・接続方式に応じて、名前付きスロット（S1 / S2 / T / SM / WL / WR）、バッテリー表示、ラチェット／フリースピンの切り替え、機種別の既定値を利用できます。
- **VID:PIDプロファイル** — USB・Bluetoothの識別子で一致するLogitech以外のマウス。名前付きスロットとクリック型のサイドボタンに対応します。HID++固有の機能はありませんが、標準BLEバッテリーサービスに対応する機種では残量を表示できます。
- **Universal HID** — 認識リストにないマウス。汎用HIDエンジンで、スムーズスクロール、ポインタ速度、クリック型のサイドボタン割り当てを利用します。

### 対象となる機種 {#which-models-exactly}

**[Macマウス互換性データベース](/ja/tools/mouse-compatibility)**に、認識対象の全22機種、USB ID、設定可能なサイドボタン・親指ボタン・スクロールモードキー・ホイールチルトの構成を掲載しています。データはアプリ内の認識リストから直接生成しています。

**G502 X、G502 HERO、G502 Proteus Spectrum**には、それぞれ名前付きの**G7 / G8 / G9**ボタンを含む9つの設定可能なスロットがあります。**G102 LIGHTSYNC**は現在、拡張認識リストに含まれません。スムーズスクロール、ポインタ速度、標準ボタンのイベントは汎用HIDエンジンで処理します。DPIボタンは初期状態ではファームウェアが処理するため、直接の割り当ては保証していません。

VID:PID照合に加え、Logitech HID++ / BLEの解析と手動の機種指定で認識します。認識後はサイドボタンに既定の割り当てが適用されます。**Clear model binding**で機種の指定を解除して、再認識することもできます。個別ガイドがない機種も、認識対象であれば接続時に既定の割り当てが適用されます。

例外として、**Magic Mouse 2**は認識リストに含まれますが、設定可能なスロットがなく、デバイス一覧にも表示されません。タッチ面とジェスチャーはmacOSが処理します。**MX Ergo**と2種類の**G Pro X Superlight**には設定ガイドがありますが、認識リストには含まれません。汎用HIDエンジンで基本機能とクリック型のサイドボタンを使い、機種固有のスロットは使いません。

**リストにない場合も**、汎用HIDエンジンで基本機能を利用できます。機種は順次追加しているため、未掲載の機種はissueでお知らせください。

## HID++・BLEとバッテリー表示 {#hid--ble-and-battery}

Bluetooth接続の対応LogitechマウスではHID++を使い、基本クリックに加えて、機種が対応するボタンやジェスチャーを利用できます。イベント駆動の読み取りで遅延を抑えます。バッテリー残量は、標準バッテリーサービスに対応するBLEマウスと、対応Logitech HID++マウスで表示します。有線マウスや一般的なUSBマウスでは残量を取得できません。

## 対応するレシーバーの種類 {#receiver-families-we-cover}

LogitechのワイヤレスレシーバーでもLinguaXを利用できます。拡張機能の対応範囲はマウスと接続方式によって異なります。

- **Bolt** — 主に2021年以降のMXシリーズやビジネス向け機種で使われるレシーバー。
- **Unifying** — M720、M585/M590、旧世代MXなどに付属する小型レシーバー。
- **Lightspeed** — G Pro X SuperlightやG502 X Lightspeedなど、Gシリーズ向けの低遅延レシーバー。
- **Bluetooth** — レシーバーは不要。対応Logitech機種ではBLE経由でHID++を読み取ります。

Logi Options+やG HUBを使わずにレシーバーをペアリングする場合は、[ブラウザ版ペアリングツール](/ja/tools/pair-logitech-receiver)を利用できます。ChromeとEdgeに対応し、ソフトウェアのインストールは不要です。

## Logi Options+との違い {#compared-to-logi-options}

- **アカウント不要。** サインインを求めません。
- **スリープ復帰に対応。** Bluetoothデバイスは自動復旧します。
- **約10 MBのネイティブアプリ。** Electronや重いバックグラウンドエージェントを使いません。

## 関連ドキュメント {#related-docs}

- [macOS向けLogi Options+の代替](/ja/docs/comparisons/logi-options-plus-alternative-macos)
- [Logi Options+なしでMX Master 3Sを設定する](/ja/docs/comparisons/mx-master-3s-mac-setup-without-logi-options)
