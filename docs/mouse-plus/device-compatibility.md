---
title: Device Compatibility
description: Mouse+ works with any USB or Bluetooth mouse on macOS, no driver required, with enhanced recognition for MX Master, G502, M720, and more.
keywords:
  - mac mouse compatibility
  - logi options plus alternative mac
  - mx master mac no driver
  - bluetooth mouse battery mac
---

# Device Compatibility

Mouse+ works with any USB or Bluetooth mouse on macOS — no driver, no kernel extension, nothing installed at the system level. Plug in or pair a mouse and Mouse+ enhances it in place.

## Any mouse, plus enhanced recognition

Basic enhancement — smooth scrolling, pointer speed, and general button mapping — works on virtually any USB or Bluetooth mouse, with no driver. On top of that, Mouse+ ships a recognition whitelist of about 20 models (primarily Logitech) that unlock model-specific profiles such as thumb-button, scroll-mode, and special-key handling:

- **MX Master** series — MX Master, 2S, 3, 3S, and 4, with correct wheel-mode (`Scroll Mode`) key handling
- **MX Anywhere** — 2, 2S, 3, and 3S, including `Thumb` slot support
- **Logitech** — M720, M585/M590, POP, G502 X / HERO / Proteus, G305
- **Other brands** — Microsoft Surface Precision, Razer Viper Ultimate, Razer DeathAdder V3

Models are matched by VID:PID, with additional Logitech HID++/BLE parsing and a manual model-binding option. Recognized devices get automatic side-button mapping after detection, and a "Clear model binding" control lets you reset recognition at any time. Mice outside the whitelist still get the basic enhancements above.

## HID++ / BLE and battery

For Logitech wireless mice over Bluetooth, Mouse+ supports full HID++, enabling complete gesture and button mapping — not just basic clicks. Event-driven HID++ reads keep latency low. Battery level is shown only for devices that report it: BLE mice (via the standard battery service) and Logitech HID++ mice. Wired and generic USB mice do not expose a battery reading.

## Compared to Logi Options+

- **No account.** Mouse+ never asks you to sign in.
- **Reliable across sleep/wake.** Bluetooth devices recover automatically after sleep, with no manual reconnection.
- **~10MB, native.** No Electron, no heavy background agent.

## Related Docs

- [Logi Options+ Alternative for macOS](../use-cases/logi-options-plus-alternative-macos.md)
- [MX Master 3S Mac Setup Without Logi Options](../use-cases/mx-master-3s-mac-setup-without-logi-options.md)
