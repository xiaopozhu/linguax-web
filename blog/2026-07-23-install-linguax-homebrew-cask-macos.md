---
slug: install-linguax-homebrew-cask-macos
title: "Install LinguaX with Homebrew Cask on macOS (One Command, Auto-Update)"
authors: [deepzz0]
tags: [linguax, macos, mouse, workflow, tools]
keywords:
  - brew install linguax
  - linguax homebrew cask
  - install linguax mac terminal
  - macos mouse utility homebrew
  - brew cask install mac app
  - linguax command line install
  - mac mouse app homebrew
description: "LinguaX landed in Homebrew Cask. Install with a single command, get automatic updates via the Sparkle appcast, and uninstall clean. Here's the setup."
---

LinguaX is now in the official [Homebrew Cask](https://github.com/Homebrew/homebrew-cask) tap. If you already use `brew` to install your Mac apps, adding LinguaX is one command — and every future release lands in `brew upgrade` automatically.

**TL;DR:**

```bash
brew install --cask linguax
```

<!-- truncate -->

## Why this matters if you live in the terminal

There is a specific kind of Mac user who never installs an app the usual way. They drag a `.zip` from Safari once, decide it feels wrong, and go looking for the `brew` command. If that is you, LinguaX now works the way you expect: one command, no drag-and-drop, no dialog boxes, no "please open the DMG."

More importantly, the Cask pipeline gives you:

- **One-command install** — no browser, no unzip step, no manual move to `/Applications`.
- **Auto-tracked updates** — new LinguaX releases land in `brew upgrade` shortly after they ship, because Homebrew's autobump bot watches the Sparkle appcast.
- **Clean uninstall** — `brew uninstall --cask linguax` removes the app and its receipt, so you never end up with a half-uninstalled Mac utility.

If you already run other CLI tools this way (`brew install --cask iterm2`, `raycast`, `rectangle`, `arc`, and so on), LinguaX now fits the same pattern.

## Install in one command

Make sure Homebrew is installed (`brew.sh` if not), then run:

```bash
brew install --cask linguax
```

The cask lives in the official `homebrew/cask` tap — no third-party tap, no extra `brew tap` step. Homebrew downloads the signed `.zip`, verifies it, and moves `LinguaX.app` to `/Applications` for you. Launch it from Spotlight or `open -a LinguaX`, grant the macOS permissions LinguaX asks for (Accessibility for mouse input, plus whatever the feature you use needs), and you are running.

For the exact permission list and first-run walkthrough, see the [Installation docs](/docs/getting-started/installation) and [First Run](/docs/getting-started/first-run).

## Update: `brew upgrade --cask linguax`

Every LinguaX release publishes a signed `.zip` plus a Sparkle appcast entry. Homebrew's autobump bot watches that appcast, opens a PR against `homebrew-cask`, CI verifies the download, and the new version is live in Cask usually the same day. On your machine, that means:

```bash
brew upgrade --cask linguax
```

...pulls the latest release. If you already have LinguaX open, the in-app Sparkle updater still works — the two paths do not conflict. Pick whichever fits your workflow: `brew upgrade` if you upgrade all your CLI-managed apps in a batch, or the in-app updater if you like being asked.

## Uninstall

```bash
brew uninstall --cask linguax
```

That removes `LinguaX.app` and the Cask receipt. If you also want to purge preferences and the license file, follow the [uninstall notes](/docs/troubleshooting/common-issues) in the docs.

## Homebrew Cask vs direct download — which should you use?

Short answer: **use Cask if you already use Homebrew for other Mac apps.** Direct download if you don't.

| | Homebrew Cask | [Direct download](/download) |
| --- | --- | --- |
| Install steps | 1 (`brew install --cask linguax`) | 3 (download → unzip → drag) |
| Update path | `brew upgrade --cask linguax` | in-app Sparkle updater |
| Requires Homebrew | Yes | No |
| Where the app lives | `/Applications/LinguaX.app` | `/Applications/LinguaX.app` |
| macOS Gatekeeper check | Passes (signed + notarized) | Passes (signed + notarized) |

Either way you end up with the same signed native app — a ~10MB Mac utility for mouse enhancement (smooth scrolling, side buttons, gestures) and push-to-talk voice input. The Cask path just saves you a few clicks and keeps updates on the same rail as the rest of your CLI tools.

## What LinguaX does, in case you got here from the CLI first

If Homebrew Cask is how you discover Mac utilities, and you have not tried LinguaX yet, the short version:

- Third-party mouse feels bad on macOS because Apple's own settings do not tune scrolling, side buttons, or gestures the way vendor drivers do — and vendor drivers (Logi Options+ etc.) are heavy, account-gated, and vendor-locked.
- LinguaX is a native macOS app that handles the parts you actually use: tunable smooth scrolling, side-button and gesture mapping, per-app overrides, pointer speed per device — [Logi Options+ alternative](/docs/comparisons/logi-options-plus-alternative-macos) territory but ~10MB and no account.
- Bonus track: bind a mouse side button to Fn/Globe and you get [push-to-talk voice typing](/docs/push-to-talk/push-to-talk-voice-typing-mac) with any Mac dictation tool (macOS Dictation, Wispr Flow, superwhisper).

Free 30-day trial, then a **$9.9 one-time Lifetime license** (up to 3 devices, no subscription). Details on the [Pricing page](/pricing).

## Contribute / report issues

The cask itself is at [`Homebrew/homebrew-cask/Casks/l/linguax.rb`](https://github.com/Homebrew/homebrew-cask/blob/master/Casks/l/linguax.rb). Bug reports specific to the Cask installation flow are welcome as GitHub issues on `homebrew-cask`. App bugs go to the LinguaX support flow linked from the app menu.
