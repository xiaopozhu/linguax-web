---
title: "LinguaX 入門"
description: "LinguaX は約10 MBのネイティブmacOSユーティリティ。マウスのスクロール・ボタン・ジェスチャー設定と、アプリやWebサイト別の入力ソース自動切り替えを解説します。"
keywords:
  - "LinguaX ドキュメント"
  - "Mac マウス設定"
  - "入力ソース 自動切り替え"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

LinguaXは約10 MBのネイティブmacOSユーティリティです。独立した2つの主要機能を備えています。**Mouse+**は、マウスのスムーズスクロール、ボタンやジェスチャーの割り当て、アプリ別の動作設定を提供します。**入力ソースの自動切り替え**は、使用中のアプリやWebサイトに合わせて入力言語を切り替えます。ドライバもアカウントも不要で、行動データを収集しません。

<ThemedImage
  alt={"独立したMouse+と入力ソース自動切り替えから成るLinguaXの構成"}
  sources={{
    light: useBaseUrl('/img/linguax-two-modules.svg'),
    dark: useBaseUrl('/img/linguax-two-modules-dark.svg'),
  }}
  width="720"
/>

## はじめに {#start-here}

初めて使う方は、次の3ページでダウンロードから動作確認まで進められます。

1. [インストール](/ja/docs/getting-started/installation) — アプリケーションフォルダにドラッグすれば完了します。
2. [初回設定](/ja/docs/getting-started/first-run) — 権限の許可と最初の割り当てを行います。
3. [クイックツアー](/ja/docs/getting-started/quick-tour) — 約5分で基本動作を確認します。

用途に合った設定は、[開発者向け設定](/ja/docs/getting-started/setup-for-developers)や[デザイナー向け設定](/ja/docs/getting-started/setup-for-designers)をご覧ください。

## マウスを設定する {#configure-your-mouse}

普段のマウスを、自分の操作に合う道具に整えます。

- [Mouse+の概要](/ja/docs/mouse-plus/overview) — 主な機能とネイティブ実装の特長。
- [スムーズスクロール](/ja/docs/mouse-plus/fundamentals/smooth-scrolling) — Min Step、Speed Gain、Durationの調整。
- [ボタンの割り当て](/ja/docs/mouse-plus/fundamentals/button-mapping)と[ジェスチャーの割り当て](/ja/docs/mouse-plus/fundamentals/gesture-mapping) — クリック、ダブルクリック、長押し、方向別ドラッグの設定。
- [対応機種](/ja/docs/mouse-plus/device-compatibility) — MX Master、MX Anywhere、G Pro X Superlight、Lift、MX Ergoなどの設定ガイド。基本機能は任意のUSB・Bluetoothマウスで使え、機種別の拡張認識は23機種に対応します。

## 入力ソースを自動で切り替える {#automate-input-switching}

複数の言語やアプリを使うときも、作業に合わせて入力ソースが切り替わります。

- [入力ソースの自動切り替え](/ja/docs/input-source/auto-switch) — 仕組みと切り替えのタイミング。
- [アプリとWebサイトのルール](/ja/docs/input-source/app-and-website-rules) — 2種類のルールと優先順位。
- [多言語ワークフロー](/ja/docs/input-source/multilingual-workflow) — 2言語を安定して使う設定例。

優先順位は常に**Webサイトのドメインルール > アプリルール > 全体の既定値**です。ドメインルールはSafari、Chrome、Edge、Brave、Operaに対応しています。Firefoxには対応していません。

## プッシュトゥトークを設定する {#set-up-push-to-talk}

マウスのサイドボタンにFn（Globe）キーの長押しを割り当てると、ボタンを押している間だけ音声入力する操作に使えます。

- [Macでプッシュトゥトーク音声入力](/ja/docs/push-to-talk/push-to-talk-voice-typing-mac) — 基本設定。
- [Mac向けプッシュトゥトークアプリ](/ja/docs/push-to-talk/best-push-to-talk-app-mac) — 音声入力ツールの選び方。
- [Wispr Flowとsuperwhisperのホットキー](/ja/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac) — アプリ別の設定。

## LinguaXの特長 {#why-linguax}

- **軽量** — 約10 MBのネイティブmacOSアプリ。Electronを使いません。
- **プライバシー重視** — アカウント不要、行動データの収集なし。主要機能はMac上で動作し、設定は有効にした場合のみ自分のiCloudで同期できます。AIxはAI操作を実行し、転送に同意した場合に限り、送信したテキストを転送します。ダウンロード、更新、ライセンス検証には通信を使います。
- **ドライバ不要** — アプリケーションフォルダに入れるだけ。基本機能は任意のUSB・Bluetoothマウスで使えます。
- **買い切り** — [Lifetimeライセンスは$9.9の一括払い](/ja/docs/reference/trial-vs-lifetime)で3台まで利用でき、30日間の無料体験があります。サブスクリプションはありません。

## ほかのツールから移行する {#coming-from-another-tool}

- [Logi Options+の代替](/ja/docs/comparisons/logi-options-plus-alternative-macos) — Electronベースのツールから移行。
- [Mos・LinearMouse・Mac Mouse Fixの比較](/ja/docs/comparisons/mos-vs-linearmouse-vs-mac-mouse-fix) — 無料ツールとの違い。
- [MX Master 3S：Logi Options+からの移行](/ja/docs/comparisons/mx-master-3s-mac-setup-without-logi-options) — 手順に沿った移行ガイド。

## 画面を見る {#product-preview}

<ThemedImage
  alt={"デバイスとボタンの割り当てを表示するLinguaX Mouse+画面"}
  sources={{
    light: useBaseUrl('/img/linguax-mouse-gesture-mapping.png'),
    dark: useBaseUrl('/img/linguax-mouse-gesture-mapping-dark.png'),
  }}
  width="420"
/>

<ThemedImage
  alt={"LinguaXのアプリ別入力ソースルール"}
  sources={{
    light: useBaseUrl('/img/linguax-input-method-app-mapping.png'),
    dark: useBaseUrl('/img/linguax-input-method-app-mapping-dark.png'),
  }}
  width="420"
/>

各機能のページにも画面例を掲載しています。疑問がある場合は[よくある質問](/ja/docs/reference/faq-general)や[トラブルシューティング](/ja/docs/troubleshooting/common-issues)をご覧ください。
