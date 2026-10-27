---
title: "よくある質問"
description: "LinguaXの互換性、料金、プライバシー、30日間の無料体験、マウス機能と入力ソース自動切り替えについて、よくある質問に答えます。"
keywords:
  - "LinguaX よくある質問"
  - "LinguaX FAQ"
  - "LinguaX ヘルプ"
---

## LinguaXとは？ {#what-is-linguax}

LinguaXは、独立した2つの主要機能を持つ軽量なネイティブmacOSユーティリティです。**Mouse+**ではスムーズスクロール、サイドボタン・ジェスチャーの割り当て、アプリ別のSmooth Scrollオン・オフ、ポインタ速度を設定できます。**入力ソースの自動切り替え**では、アプリやWebサイトに合わせて入力言語を切り替えます。

約10 MBのネイティブアプリで、Electronは使いません。主要なマウス機能と入力ソース切り替えはローカルで動作します。AIxはAI操作を実行して転送に同意した場合のみ、送信したテキストを転送します。ダウンロード、更新、ライセンス検証には通信を使います。

## どのような人に向いていますか？ {#who-is-it-for}

マウスを日常的に使う開発者、デザイナー、多言語ユーザーに向いています。繰り返すマウス操作を減らしたい方や、アプリ・Webサイト間の移動に合わせて入力ソースを切り替えたい方に役立ちます。

## マウス用ツールですか、入力ソース用ツールですか？ {#is-linguax-a-mouse-tool-or-an-input-method-tool}

両方です。Mouse+と入力ソース自動切り替えは、それぞれ独立した主要機能です。紹介ではマウス機能を先に取り上げていますが、どちらかがもう一方の付属機能という関係ではありません。

## ブラウザでしか使えませんか？ {#does-linguax-only-work-in-browsers}

いいえ。Mouse+はシステム全体で使えます。入力ソースのアプリルールもmacOSアプリで使えます。対応ブラウザでは、ドメインルールを追加してWebサイト単位で設定できます。ドメインは完全一致を優先し、一致しなければ親ドメインへ戻って照合します。

## 主要機能にクラウド処理は必要ですか？ {#does-linguax-require-cloud-processing-for-core-behavior}

いいえ。主要なマウス機能と入力ソース切り替えはMac上で動作します。AIxは任意のオンライン機能で、AI操作を実行し転送に同意した場合だけテキストを送信します。ダウンロード、更新、ライセンス検証には通信を使います。設定のiCloud同期も任意です。詳しくは[プライバシーポリシー](/ja/terms/privacy-policy/)をご覧ください。

## 料金はいくらですか？ {#how-much-does-linguax-cost}

Lifetimeライセンスは**$9.9の買い切り**で、**最大3台**まで利用できます。月額料金や更新料はありません。最新の金額は[料金](/ja/pricing)をご確認ください。

## 無料体験はありますか？ {#is-there-a-free-trial}

はい。支払いなしで**30日間、すべての機能**を試せます。普段の作業で使ってから購入を判断できます。[無料体験とLifetimeの違い](/ja/docs/reference/trial-vs-lifetime)をご覧ください。

## サブスクリプションですか？ {#is-it-a-subscription}

いいえ。1回購入すれば継続して使える買い切りです。定期的な請求はありません。

## 1つのライセンスで何台使えますか？ {#how-many-devices-does-one-license-cover}

Lifetimeライセンス1つで**最大3台**を有効化できます。[ライセンスの有効化](/ja/docs/reference/license-activation)をご覧ください。

## マウスの割り当てやジェスチャーが動かないのはなぜですか？ {#why-is-a-mouse-mapping-or-gesture-not-working}

権限不足、ほかのマウスツールとの競合、機種や接続方式の制限が主な原因です。認識リスト外のマウスでも、基本機能は汎用HIDエンジンで使えます。[マウスの問題](/ja/docs/troubleshooting/mouse-issues)をご覧ください。

## Webサイトのルールが反応しないのはなぜですか？ {#why-is-a-website-rule-not-triggering}

主に次の原因が考えられます。

- ドメインの入力が正しくない
- ルールが重複している
- 必要なmacOSの権限が許可されていない

[アプリとWebサイトのルール](/ja/docs/input-source/app-and-website-rules)と[よくある問題](/ja/docs/troubleshooting/common-issues)をご覧ください。

## 実用的な設定例はどこにありますか？ {#where-can-i-find-practical-setup-examples}

次のガイドから始められます。

- [macOSのマウススクロールのカクつきを改善する](/ja/docs/mouse-plus/recipes/fix-choppy-mouse-scrolling-macos)
- [macOSでサイドボタンを割り当てる](/ja/docs/mouse-plus/recipes/map-mouse-side-buttons-macos)
- [アプリとドメインで入力ソースを自動切り替え](/ja/docs/input-source/auto-switch-input-source-app-domain-mac)
