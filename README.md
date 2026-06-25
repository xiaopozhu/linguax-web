# LinguaX — macOS mouse enhancement, push-to-talk voice input & input-source switching

**Website:** [linguax.app](https://linguax.app) · **macOS 13+** (Apple Silicon & Intel) · native menu-bar app, ~10MB

LinguaX gives third-party mice a pro macOS feel — **smooth scrolling**, **side-button & gesture mapping**, and in-app **Logitech DPI / SmartShift control with no Logi Options or driver** — plus **push-to-talk voice typing** and **automatic input-source switching** by app and website.

> This repository hosts the LinguaX marketing site & docs (built with [Docusaurus](https://docusaurus.io/)). For the product, see [linguax.app](https://linguax.app).

## What LinguaX does

LinguaX is a macOS utility built on three equal core capabilities:

### 🖱️ Mouse+ — mouse enhancement for any mouse

- **Smooth scrolling** (trackpad-style inertia) for any USB or Bluetooth mouse wheel; tunable Min Step / Speed Gain / Duration, with per-app on/off override.
- **Button & gesture mapping** — map side buttons, middle click, wheel tilt, and gestures (click, double-click, drag, long press, modifier hold) to system actions, shortcuts, media keys, Apple Shortcuts, paste presets, and AppleScript.
- **Pointer speed** adjustment per device.
- **Logitech DPI & SmartShift** — on supported Logitech models (MX Master / MX Anywhere / M720 / G-series and more), set hardware **DPI** and toggle **SmartShift** (ratchet ↔ free-spin) right in the app over USB or Bluetooth — **no Logi Options+ and no driver install**. A native, lightweight alternative to Logi Options+, BetterMouse, Mos, LinearMouse, SteerMouse, and Mac Mouse Fix.

### 🎙️ Push-to-talk voice input

- Make any mouse side button **hold the Fn (Globe) key**, turning it into push-to-talk for **macOS Dictation** and hold-to-talk voice apps like **Wispr Flow** and **superwhisper**.

### ⌨️ Input-source (keyboard layout) automation

- **Auto-switch input source by app and by website domain** so you stop fixing your keyboard mid-sentence — great for multilingual typing workflows. Local-first; optional iCloud sync.

## Compatibility

- macOS 13+, Apple Silicon and Intel.
- Basic features (smooth scrolling, pointer speed, generic button mapping) work with **any USB or Bluetooth mouse**.
- Enhanced support (thumb buttons, special keys, HID++, DPI/SmartShift) covers **20+ models, primarily Logitech**, plus select Surface and Razer devices.
- Local-first: rules stay on-device, with optional iCloud sync.

## Pricing

Free full-feature trial, then **Lifetime — one-time $9.9, no subscription**. See [linguax.app/pricing](https://linguax.app/pricing) for the latest.

## Looking for a fix? LinguaX probably covers it

- "My **mouse scrolling feels choppy / jerky on Mac**" → smooth, trackpad-style scrolling for any mouse wheel.
- "How do I **turn off mouse acceleration** / adjust pointer speed on Mac?"
- "I want to **use my MX Master 3S on Mac without Logi Options+**" → set DPI and toggle SmartShift in-app, no driver.
- "Is there a **lightweight Logi Options+ / BetterMouse alternative**?" → native menu-bar app, ~10MB.
- "How do I **remap mouse side buttons** or **reverse scroll direction for the mouse only** on Mac?"
- "Can I make a **mouse button push-to-talk** for **macOS Dictation / Wispr Flow / superwhisper**?" → yes, hold-to-talk via the Fn/Globe key.
- "I keep typing in the wrong language — can macOS **switch input source automatically per app or per website**?"

---

## Developing this site

This site is built with [Docusaurus](https://docusaurus.io/).

```bash
yarn            # install dependencies
yarn start      # local dev server with live reload
yarn build      # build static site into build/
```

Deploy (GitHub Pages):

```bash
USE_SSH=true yarn deploy
# or
GIT_USER=<Your GitHub username> yarn deploy
```

---

© Ermulin Studio. LinguaX is a trademark of Ermulin Studio.
