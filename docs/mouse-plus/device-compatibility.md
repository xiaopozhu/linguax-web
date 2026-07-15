---
title: Device Compatibility
sidebar_label: Overview
description: Mouse+ works with any USB or Bluetooth mouse on macOS, no driver required, with enhanced recognition for MX Master, G502, M720, and more.
keywords:
  - mac mouse compatibility
  - logi options plus alternative mac
  - mx master mac no driver
  - bluetooth mouse battery mac
---

# Device Compatibility

Mouse+ works with any USB or Bluetooth mouse on macOS — no driver, no kernel extension, nothing installed at the system level. Plug in or pair a mouse and Mouse+ enhances it in place.

## Per-model Mac setup guides

Looking for step-by-step help on a specific model? Our **Compatible Models** series walks through pairing, side-button recipes, and push-to-talk setups for the most-used mice on macOS:

- [MX Master 3S](./models/mx-master-3s)
- [MX Master 3](./models/mx-master-3)
- [MX Anywhere 3S](./models/mx-anywhere-3s)
- [MX Anywhere 3](./models/mx-anywhere-3)
- [Logitech G Pro X Superlight](./models/logitech-g-pro-x-superlight)
- [Logitech G Pro X Superlight 2](./models/logitech-g-pro-x-superlight-2)
- [Logi Lift](./models/logitech-lift)
- [MX Ergo](./models/mx-ergo)

More models are added on a rolling basis — see the section below for the full recognition list.

## Any mouse, plus enhanced recognition

Basic enhancement — smooth scrolling, pointer speed, and general button mapping — works on virtually any USB or Bluetooth mouse, with no driver. On top of that, Mouse+ ships a recognition list that unlocks model-specific profiles such as thumb-button, scroll-mode, and special-key handling. The full recognition list:

| Brand | Model | Per-model guide |
|---|---|---|
| Logitech | MX Master 4 | Coming soon |
| Logitech | MX Master 3S | [Setup guide](./models/mx-master-3s) |
| Logitech | MX Master 3 | [Setup guide](./models/mx-master-3) |
| Logitech | MX Master 2S | Coming soon |
| Logitech | MX Master (original) | Coming soon |
| Logitech | MX Anywhere 3S | [Setup guide](./models/mx-anywhere-3s) |
| Logitech | MX Anywhere 3 | [Setup guide](./models/mx-anywhere-3) |
| Logitech | MX Anywhere 2S / 2 | Coming soon |
| Logitech | Lift | [Setup guide](./models/logitech-lift) |
| Logitech | M720 Triathlon | Coming soon |
| Logitech | M750 / M750 L | Coming soon |
| Logitech | M585 / M590 | Coming soon |
| Logitech | POP Mouse | Coming soon |
| Logitech | G502 X / G502 HERO / G502 Proteus Spectrum | Coming soon |
| Logitech | G305 LIGHTSPEED | Coming soon |
| Apple | Magic Mouse 2 | Coming soon |
| Microsoft | Surface Precision Mouse | Coming soon |
| Razer | Viper Ultimate | Coming soon |
| Razer | DeathAdder V3 | Coming soon |

Models are matched by VID:PID, with additional Logitech HID++/BLE parsing and a manual model-binding option. Recognized devices get automatic side-button mapping after detection, and a "Clear model binding" control lets you reset recognition at any time.

**Not on the list?** Your mouse still gets every basic enhancement through the universal HID engine — smooth scrolling, pointer speed, and click-based button mapping. Two popular examples with dedicated guides: [G Pro X Superlight (1 & 2)](./models/logitech-g-pro-x-superlight) and [MX Ergo](./models/mx-ergo).

## HID++ / BLE and battery

For Logitech wireless mice over Bluetooth, Mouse+ supports full HID++, enabling complete gesture and button mapping — not just basic clicks. Event-driven HID++ reads keep latency low. Battery level is shown only for devices that report it: BLE mice (via the standard battery service) and Logitech HID++ mice. Wired and generic USB mice do not expose a battery reading.

## Receiver families we cover

If your Logitech device uses a wireless receiver, LinguaX works alongside it regardless of vendor family:

- **Bolt** — Logitech's current-generation secure receiver, used by most MX-series and business models since 2021
- **Unifying** — the long-serving small-form-factor receiver, still bundled with M720, M585/M590, and older MX models
- **Lightspeed** — the low-latency receiver for G-series (G Pro X Superlight, G502 X Lightspeed, and similar)
- **Bluetooth** — no receiver needed; LinguaX reads HID++ over BLE for Logitech models that support it

Pairing a new receiver without installing Logi Options+ or G HUB? Use our [in-browser pairing tool](/tools/pair-logitech-receiver) — Chrome and Edge only, no software install required.

## Compared to Logi Options+

- **No account.** Mouse+ never asks you to sign in.
- **Reliable across sleep/wake.** Bluetooth devices recover automatically after sleep, with no manual reconnection.
- **~10MB, native.** No Electron, no heavy background agent.

## Related docs

- [Logi Options+ Alternative for macOS](/docs/comparisons/logi-options-plus-alternative-macos)
- [MX Master 3S Mac Setup Without Logi Options](/docs/comparisons/mx-master-3s-mac-setup-without-logi-options)
