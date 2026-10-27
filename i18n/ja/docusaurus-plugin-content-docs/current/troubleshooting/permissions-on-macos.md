---
title: "macOSの権限"
description: "LinguaXに必要なAccessibilityとInput Monitoringの役割、アプリ・ドメインルールの権限の違い、設定確認と復旧手順を解説します。"
keywords:
  - "LinguaX 権限"
  - "Mac マウス アクセシビリティ"
  - "Mac 入力監視 権限"
---

LinguaXでは、マウス操作やWebサイトの検出にmacOSの権限を使います。

## よくある症状 {#common-symptoms}

- アプリを切り替えても入力ソースが変わらない
- ブラウザのドメインルールが安定しない
- 初回実行時にスクリプトアクションが失敗する

LinguaXの主要な権限設定は、次の2つです。

## 必要な権限 {#required-permissions}

- **Accessibility（アクセシビリティ）** — マウスイベントの取得、スムーズスクロール、ポインタ速度、キー操作の送信、Webサイトのルール用に前面タブのURLを読み取る処理。
- **Input Monitoring（入力監視）** — HIDデバイスの管理。

> アプリ単位の入力ソース切り替えにはAccessibilityは不要です。**Webサイト（ドメイン）のルール**でブラウザのURLを読み取る場合は必要です。

## 確認すること {#required-checks}

1. LinguaXの権限状態を開きます。
2. macOSの**システム設定**で、必要な権限が有効か確認します。
3. 権限を変更したらLinguaXを再起動します。

```mermaid
flowchart TD
    S(["どの機能が動かない？"]) --> AS["アプリ単位の入力切り替え"]
    S --> DS["ドメインルール<br/>ブラウザURLの読み取り"]
    S --> MS["マウスの平滑化・割り当て"]
    S --> SC["スクリプトアクション"]
    AS --> OK1["追加権限は不要<br/>ルール自体を確認"]
    DS --> N2{"Accessibilityを許可済み？"}
    N2 -- "いいえ" --> R1["Accessibilityを許可して再起動"]
    N2 -- "はい" --> OK2["対応ブラウザを確認<br/>Firefoxは非対応"]
    MS --> N3{"Accessibilityと<br/>Input Monitoringを許可済み？"}
    N3 -- "不足あり" --> R2["両方を許可して再起動"]
    N3 -- "両方あり" --> OK3["割り当てと競合を確認"]
    SC --> N4{"対象アプリへの<br/>オートメーション許可を承認済み？"}
    N4 -- "いいえ" --> R3["アクションを再実行し<br/>表示される許可を承認"]
    N4 -- "はい" --> OK4["スクリプト自体を確認"]
```

## スクリプト実行時の許可 {#about-script-action-prompts}

AppleScriptがSystem EventsやFinderなどのアプリを操作する場合、macOSが別途オートメーションの許可を求めることがあります。

該当する操作を使うには、表示された許可を承認します。

## 復旧の手順 {#recovery-flow}

1. LinguaXを終了します。
2. LinguaXを開き直します。
3. 不足している権限を許可し直します。
4. アプリルールを1つ試します。
5. ドメインルールを1つ試します。
6. スクリプトを使う場合は、テンプレートを1つ再実行します。

## 更新後について {#post-update-note}

ストレージ構成を更新したバージョンでは、初回起動時のデータ移行に時間がかかる場合があります。移行が終わってから動作を確認してください。

## 関連ドキュメント {#related-docs}

- [初回設定](/ja/docs/getting-started/first-run)
- [マウスの問題](/ja/docs/troubleshooting/mouse-issues)
- [よくある問題](/ja/docs/troubleshooting/common-issues)
- [ショートカットとホットキー](/ja/docs/concepts/shortcut-and-hotkeys)
