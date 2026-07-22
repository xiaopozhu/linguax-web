---
title: Installation
description: "Install LinguaX on macOS in under a minute — a ~10MB native app, no drivers. Install via Homebrew Cask or direct download, plus how to update."
keywords:
  - install linguax mac
  - linguax download
  - linguax homebrew cask
  - brew install linguax
  - mac mouse utility install
---

This guide covers the two supported LinguaX installation flows. LinguaX is a ~10MB native macOS app — no drivers, no installer wizard, no background services. Both flows install the exact same signed and notarized binary.

## Requirements

- macOS 13.0 (Ventura) or later
- Apple Silicon or Intel Mac
- network access for download
- no drivers or kernel extensions required

## Install with Homebrew Cask

If you use [Homebrew](https://brew.sh/), install LinguaX with a single command:

```bash
brew install --cask linguax
```

The cask lives in the official [`homebrew/cask`](https://github.com/Homebrew/homebrew-cask) tap, so no extra `brew tap` is needed. Homebrew will download the signed `.zip`, verify it, and move `LinguaX.app` to `/Applications` automatically.

To update later:

```bash
brew upgrade --cask linguax
```

Homebrew's autobump bot tracks the Sparkle appcast, so new versions become available shortly after each release. To uninstall, run `brew uninstall --cask linguax`.

## Install from the official website

1. Open [Download](/download).
2. Select **Download Free**.
3. Wait for the `.zip` installer to finish downloading.
4. Open the downloaded `.zip` file to extract `LinguaX.app` (~10MB).
5. Drag `LinguaX.app` to **Applications** — no installer, no driver setup.

## First launch

1. Open LinguaX from **Applications**.
2. Confirm the menu bar icon appears.
3. Grant required macOS permissions.
4. Continue with [First Run](./first-run.md).

## Update method

- Homebrew Cask users: `brew upgrade --cask linguax`.
- Direct download users: grab the latest installer from [Download](/download) and install over the existing app. LinguaX also self-checks for updates via Sparkle.
- Existing rules/settings are preserved across both paths (Core Data + iCloud sync).

## If installation fails

- re-download installer and retry
- check macOS security prompts
- restart Mac if installer state appears stuck

Then check [Common Issues](../troubleshooting/common-issues.md).
