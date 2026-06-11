---
slug: introducing-linguax-macos-input-method-switching
title: "LinguaX: Native Mouse Enhancement for macOS (with Input-Source Automation)"
authors: [deepzz0]
tags: [linguax, macos, productivity]
image: /img/linguax-home.png
keywords: [macOS mouse enhancement, smooth scrolling mac, mouse button mapping macos, Logi Options+ alternative, mouse gesture mac, macOS input method switching, automatic input switcher, LinguaX macOS]
description: "LinguaX is a lightweight, native macOS mouse enhancement app: smooth scrolling, side-button and gesture mapping, and a driverless Logi Options+ alternative — plus automatic input-source switching. Under 5MB, no account, no telemetry."
---

# LinguaX: Native Mouse Enhancement for macOS

If your third-party mouse feels rough on macOS — jumpy scrolling, dead side buttons, no real driver — **LinguaX** fixes it. LinguaX is a lightweight, native **macOS mouse enhancement** app that gives any USB or Bluetooth mouse trackpad-grade scrolling, real button and gesture mappings, and per-app behavior, all without installing a kernel driver.

It is under **5MB**, fully native (no Electron), keeps every setting on your Mac (no account, no telemetry), and works as a **lightweight Logi Options+ alternative**. As a bonus, LinguaX also automates **macOS input-source switching** for multilingual users.

<!-- truncate -->

## Why macOS Mice Need Help

macOS treats third-party mice as second-class citizens. The result is familiar to anyone who has plugged in an MX Master or a G502:

- Scrolling moves in coarse notches instead of gliding like a trackpad
- Side buttons, wheel tilt, and thumb buttons do nothing useful out of the box
- Pointer speed and acceleration can't be tuned the way you want
- The only "fix" is a heavyweight vendor driver — if one exists for your model at all

LinguaX solves these at the system level, in one small app.

<img src="/img/linguax-app.png" alt="LinguaX macOS mouse enhancement interface" width="300" />

## What LinguaX Does

### Smooth Scrolling

LinguaX intercepts the coarse, notch-by-notch scroll signal from third-party mice and replays it along a tunable smooth curve, so long pages and code feel as fluid as a trackpad.

Two controls shape the feel:

- **Speed** — how far the page travels per wheel notch. Lower it for precise line-by-line reading in code; raise it to fly through long documents.
- **Smoothness** — the inertia and damping applied to each scroll. Higher smoothness adds a gentle glide-and-settle motion; lower it for a tighter, more immediate response.

You can also reverse scroll direction for the mouse **independently of the trackpad** — so a connected mouse can scroll in the "traditional" direction while your trackpad keeps natural scrolling. If smoothing ever feels like too much in one specific app, you can disable it there without touching your global setting. See [Smooth Scrolling](/docs/mouse-plus/smooth-scrolling) and the guide to [fixing choppy mouse scrolling](/docs/use-cases/fix-choppy-mouse-scrolling-macos).

### Button & Gesture Mapping

Map side buttons, wheel tilt, and thumb buttons to real actions — app launches, system controls, media playback, window management, or any keyboard shortcut. Beyond a simple click, LinguaX distinguishes several trigger types on the same button:

- **Click** — the standard single press.
- **Long-press** — hold the button to fire a second action, doubling what a single button can do.
- **Directional drag / swipe** — hold a side button and drag up, down, left, or right to trigger up to four different actions, with an on-screen mode indicator showing what you're about to fire.
- **Modifier-hold** — runs an action only while the button is held and stops the instant you release, which is exactly what push-to-talk voice typing needs.

Common bindings include back/forward navigation, switching Spaces, mission control, volume and media playback, and arbitrary keyboard shortcuts. See [Button Mapping](/docs/mouse-plus/button-mapping), [Gesture Mapping](/docs/mouse-plus/gesture-mapping), and the [push-to-talk voice typing guide](/docs/use-cases/push-to-talk-voice-typing-mac).

### Per-App Behavior

A browser and a code editor rarely want the same scrolling or button layout. LinguaX lets each app have its own scrolling feel, gestures, and button map. In practice that means Xcode can scroll tightly for code review while your browser glides through articles, and a side button can mean "back" in Safari but "switch Space" in your editor. The running-apps list refreshes automatically as apps launch and quit, so adding a new per-app profile takes seconds. See [App-Scoped Overrides](/docs/mouse-plus/app-scoped-overrides).

### Pointer Speed & Acceleration

Fine-tune pointer speed and disable mouse acceleration entirely if you prefer 1:1 tracking, applied instantly through a low-level system path — useful for design work and gaming where consistent, predictable cursor movement matters more than the macOS default acceleration curve. See [Pointer Speed & Acceleration](/docs/mouse-plus/pointer-speed) and [How to Disable Mouse Acceleration on macOS](/docs/use-cases/disable-mouse-acceleration-mac).

### A Lightweight Logi Options+ Alternative

LinguaX gives recognized mice — MX Master series, G502 (including the G502 X), M720, M585, and more — accurate model detection and sensible default mappings, so a freshly connected mouse often works the way you'd expect with little manual setup. There's no account, no background updater, and nothing to install at the kernel level. See [Logi Options+ Alternative for macOS](/docs/use-cases/logi-options-plus-alternative-macos), the [MX Master 3S setup guide](/docs/use-cases/mx-master-3s-mac-setup-without-logi-options), and [Device Compatibility](/docs/mouse-plus/device-compatibility).

## Bonus: Automatic Input-Source Switching

LinguaX started as an input-method tool, and that capability is still here as a first-class differentiator. It can **switch your input source automatically** based on the app you're in (English in Terminal, your native language in chat) and even per website host in the browser.

- Automatic switching by application
- Per-website rules for browsers
- A sensible fallback default input source

So if you type across languages, you get a mouse upgrade and an input-method assistant in one app. See [Input-Source Auto-Switch](/docs/input-source/auto-switch) and [App & Website Rules](/docs/input-source/app-and-website-rules).

## Why Native & Lightweight Matters

- **Under 5MB, fully native.** No Electron, no bundled browser engine, no background bloat.
- **No account, no telemetry.** Configuration stays on your Mac; nothing is sent anywhere.
- **Driverless.** Nothing installs at the system level — uninstalling is just deleting the app.
- **Reliable across sleep/wake.** Bluetooth devices recover automatically after sleep.

## Who Benefits Most

LinguaX earns its place for anyone who spends the day with a third-party mouse, but a few groups feel the difference immediately.

### Developers and Power Users
Reading and reviewing code means scrolling through thousands of lines a day — smooth scrolling alone changes how that feels. Map a thumb button to switch Spaces between editor, terminal, and browser; bind side buttons to back/forward through your symbol history and docs; and use wheel tilt for horizontal scrolling across wide diffs. Add automatic English input in the terminal so `git status` never turns into a string of CJK characters. See the [developer setup workflow](/docs/workflows/setup-for-developers) and our [developer-focused guide](/blog/best-input-method-switcher-developers).

### Designers and Creators
Give Figma, Photoshop, and your browser their own scroll feel and button maps, put zoom or undo on a gesture, and disable acceleration for the 1:1 cursor precision that pixel work demands. See the [designer setup workflow](/docs/workflows/setup-for-designers).

### MX Master and G502 Owners
If you bought a premium mouse but don't want the weight of a full vendor suite, LinguaX recognizes the model and applies sensible defaults without an account or driver — a genuine [Logi Options+ alternative](/blog/logi-options-plus-alternative-macos).

### Multilingual Professionals
Let LinguaX handle input-source switching across apps and websites while it also tames your mouse, so you stop reaching for ⌘ + Space dozens of times a day.

## System Requirements

LinguaX works with:

- **macOS 13.0 Ventura** and later
- **Intel and Apple Silicon Macs** (M1, M2, M3, M4)
- Any USB or Bluetooth mouse, with enhanced recognition for popular Logitech models

## Getting Started

1. **Download LinguaX** from the official website
2. **Drag it to Applications** — no installer, no driver
3. **Grant accessibility permission** so it can enhance mouse events
4. **Plug in your mouse** — LinguaX enhances it in place

See [Installation](/docs/getting-started/installation) and [First Run](/docs/getting-started/first-run).

## Pricing

LinguaX is a one-time purchase: **$9.9 for a lifetime license covering 3 devices**, with a **30-day free trial** that unlocks the full app — no account and no credit card required to try it.

**[Download LinguaX →](https://linguax.app/download)**

---

## Frequently Asked Questions

**Q: Do I need a specific mouse?**
A: No. LinguaX works with any USB or Bluetooth mouse, and adds enhanced recognition and default mappings for popular models like the MX Master series and G502.

**Q: Does LinguaX replace Logi Options+?**
A: For most everyday needs — smooth scrolling, button and gesture mapping, pointer tuning — yes, in a fraction of the size and with no account. See the [Logi Options+ alternative guide](/docs/use-cases/logi-options-plus-alternative-macos).

**Q: Is the input-method switching still included?**
A: Yes. Automatic input-source switching by app and website is a built-in feature alongside the mouse tools.

**Q: Will LinguaX slow down my Mac?**
A: No. It's under 5MB, uses minimal CPU, and runs as a single native menu-bar app — not an Electron wrapper with a bundled browser engine.

**Q: Does it need a kernel driver or system extension?**
A: No. LinguaX works through standard accessibility permissions, so nothing installs at the kernel level. Uninstalling is just dragging the app to the Trash. See [Permissions on macOS](/docs/troubleshooting/permissions-on-macos).

**Q: Will my settings survive sleep, restarts, and macOS upgrades?**
A: Yes. Configuration is stored locally on your Mac, Bluetooth devices recover automatically after sleep, and licensing stays valid across macOS upgrades, iCloud account changes, and device migration.

**Q: Can different apps have completely different mouse behavior?**
A: Yes. Per-app overrides let each application carry its own scrolling feel, gestures, and button map. See [App-Scoped Overrides](/docs/mouse-plus/app-scoped-overrides).

---

*Questions about mouse enhancement or input-source switching? Contact us at [hello@linguax.app](mailto:hello@linguax.app) or follow us on [X](https://x.com/deepzz02).*
