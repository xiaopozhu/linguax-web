---
title: Gesture Mapping
description: Bind click, double-click, long-press, directional drag, and swipe gestures on mouse buttons to real macOS actions.
keywords:
  - mouse gesture mapping mac
  - mouse swipe gestures macos
  - long press mouse button mac
  - directional drag mouse gesture
---

# Gesture Mapping

A single button can do more than one thing. Mouse+ recognizes distinct gestures on the same button and binds each to its own action, so one side button can cover several workflows.

## Gesture types

- **Click** — a single press.
- **Double-click** — detection windows are tuned to match system settings for natural timing.
- **Long-press** — hold the button past a threshold to trigger a separate action.
- **Directional drag** — hold and drag up, down, left, or right; each direction maps independently.
- **Swipe trigger** — drag a side button in a direction to fire an action, with an on-screen mode indicator while the gesture is active.

All side-button, long-press, and gesture semantics run through one unified runtime, so behavior stays consistent across devices.

## Binding actions

Every gesture can map to the full action set: app launches, system controls, media, recorded shortcuts, and custom scripts. Mix gesture types on one button — for example, click for back, long-press for Mission Control, swipe left/right to switch Spaces.

## Modifier-hold gesture

A gesture can hold a modifier key while you keep the button pressed and release it the moment you let go. This drives push-to-talk voice input and other hold-to-activate tools, where the action must stop instantly on release.

## Related Docs

- [Button & Side-Button Mapping](./button-mapping.md)
- [Shortcuts & Hotkeys](../automation/shortcut-and-hotkeys.md)
