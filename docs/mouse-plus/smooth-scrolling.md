---
title: Smooth Scrolling
description: Replace jumpy third-party mouse scrolling on macOS with a tunable smooth curve, with per-app overrides and independent reverse direction.
keywords:
  - smooth scrolling mac
  - fix jumpy mouse scrolling macos
  - mouse scroll smoothing mac
  - reverse scroll direction mouse mac
---

# Smooth Scrolling

Most third-party mice scroll in coarse notches on macOS — content jumps line by line instead of gliding. Mouse+ intercepts those scroll events and replays them along a smooth curve, so long pages and code feel as fluid as a trackpad.

## How it works

Mouse+ captures the raw scroll signal from your mouse and reshapes it before it reaches the app. Instead of passing through discrete wheel ticks, it interpolates motion across a damped curve. When smoothing is disabled or bypassed, the original scroll distance is preserved, so you never lose travel range.

## Settings

Two parameters control the feel:

- **Speed** — scales how far each scroll gesture travels. Raise it for faster page movement, lower it for fine control.
- **Smoothness** — controls inertia and damping. Higher values feel more glide-and-coast; lower values feel tighter and more direct.

Tuning advice: change one value at a time and test for a couple of minutes in your most-used apps before adjusting again. A balanced Speed with moderate Smoothness suits most reading and coding.

## Per-app overrides

A browser and a code editor often want different scrolling. You can give each app its own smooth-scrolling behavior instead of forcing one global setting. See [App-Scoped Overrides](./app-scoped-overrides.md).

## Reverse scroll direction

Mouse+ can reverse scroll direction for the mouse independently of the trackpad, and per axis — horizontal and vertical are configured separately. See [Reverse Scroll Direction for the Mouse Only](../use-cases/reverse-scroll-direction-mouse-only-mac.md).

## Related Docs

- [Fix Choppy Mouse Scrolling on macOS](../use-cases/fix-choppy-mouse-scrolling-macos.md)
- [App-Scoped Overrides](./app-scoped-overrides.md)
