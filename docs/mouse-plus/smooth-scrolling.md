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

Three global sliders control the feel:

- **Min Step** — the smallest scroll step applied per event (range 1.0–100.0, default 33.6). Lower it for finer, more granular movement; raise it for larger jumps.
- **Speed Gain** — scales how far each scroll gesture travels (range 1.0–10.0, default 2.70). Raise it for faster page movement, lower it for tighter control.
- **Duration** — controls the length of the inertia/coast curve (range 1.0–5.0, default 4.35). Higher values feel more glide-and-coast; lower values settle more quickly.

These three parameters are global — they apply the same way across every app.

Smoothing acts only on the mouse wheel. Trackpad scrolling is passed through untouched, so continuous trackpad gestures keep their native behavior. Holding any modifier key (`⌘`, `⌥`, `⌃`, `⇧`, or `fn`) temporarily pauses smoothing, so zoom and other modifier-scroll interactions stay precise.

Tuning advice: change one value at a time and test for a couple of minutes in your most-used apps before adjusting again. A balanced Speed Gain with a moderate Duration suits most reading and coding.

## Per-app overrides

A browser and a code editor often want different scrolling. You can turn smooth scrolling on or off per app instead of forcing one global state. The three feel parameters (Min Step, Speed Gain, Duration) and the reverse-direction switches remain global. See [App-Scoped Overrides](./app-scoped-overrides.md).

## Reverse scroll direction

Mouse+ can reverse scroll direction for the mouse independently of the trackpad, with two separate global switches — **Reverse Vertical Scroll** and **Reverse Horizontal Scroll** — so each axis is configured on its own. See [Reverse Scroll Direction for the Mouse Only](../use-cases/reverse-scroll-direction-mouse-only-mac.md).

## Related Docs

- [Fix Choppy Mouse Scrolling on macOS](../use-cases/fix-choppy-mouse-scrolling-macos.md)
- [App-Scoped Overrides](./app-scoped-overrides.md)
