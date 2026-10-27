---
title: "インストール"
description: "LinguaXをMacにインストールする方法。Homebrew Caskと公式サイトからのダウンロード、動作環境、初回起動、更新手順を説明します。"
keywords:
  - "LinguaX インストール"
  - "LinguaX ダウンロード"
  - "Homebrew Cask"
  - "brew install linguax"
---

LinguaXのインストール方法は2つあります。約10 MBのネイティブmacOSアプリで、ドライバやインストールウィザードは不要です。どちらも同じ署名・公証済みのアプリをインストールします。

## 動作環境 {#requirements}

- macOS 13.0（Ventura）以降
- Apple SiliconまたはIntel搭載Mac
- ダウンロード用のネットワーク接続
- ドライバやカーネル拡張は不要

## Homebrew Caskでインストールする {#install-with-homebrew-cask}

[Homebrew](https://brew.sh/)を使っている場合は、次のコマンドでインストールできます。

```bash
brew install --cask linguax
```

公式の[`homebrew/cask`](https://github.com/Homebrew/homebrew-cask)で配布されているため、追加の`brew tap`は不要です。Homebrewが署名済みの`.zip`をダウンロード・検証し、`LinguaX.app`を`/Applications`に移動します。

更新する場合：

```bash
brew upgrade --cask linguax
```

Homebrewの自動更新ボットがSparkleのappcastを確認するため、リリース後しばらくすると新しいバージョンを入手できます。アンインストールは`brew uninstall --cask linguax`で行います。

## 公式サイトからインストールする {#install-from-the-official-website}

1. [ダウンロード](/ja/download)を開きます。
2. **Download Free**を選びます。
3. `.zip`のダウンロードが完了するまで待ちます。
4. `.zip`を開いて`LinguaX.app`（約10 MB）を展開します。
5. `LinguaX.app`を**アプリケーション**フォルダにドラッグします。インストーラやドライバの設定はありません。

## 初回起動 {#first-launch}

1. **アプリケーション**フォルダからLinguaXを開きます。
2. メニューバーにアイコンが表示されることを確認します。
3. 必要なmacOSの権限を許可します。
4. [初回設定](/ja/docs/getting-started/first-run)に進みます。

## 更新方法 {#update-method}

- Homebrew Caskの場合：`brew upgrade --cask linguax`を実行します。
- 直接ダウンロードした場合：[ダウンロード](/ja/download)から最新版を取得し、既存のアプリを置き換えます。アプリ内でもSparkleを通じて更新を確認します。
- どちらの方法でも既存のルールや設定は保持されます。設定はCore Dataに保存され、iCloudを有効にしている場合は同期されます。

## インストールできない場合 {#if-installation-fails}

- ダウンロードし直して再試行します。
- macOSのセキュリティ通知を確認します。
- 処理が止まっているように見える場合はMacを再起動します。

解決しない場合は[よくある問題](/ja/docs/troubleshooting/common-issues)をご覧ください。
