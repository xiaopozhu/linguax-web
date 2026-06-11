---
title: How LinguaX Works
---

# How LinguaX Works

LinguaX is a mouse enhancement tool for macOS, with automatic input source switching as an optional layer on top. It runs natively in the background and applies its behavior through two distinct layers.

## Runtime Model

### Layer 1 — Mouse+ baseline (the foundation)

The Mouse+ layer is always on. It is the base layer that makes any third-party mouse feel native:

- **Smooth scrolling** replaces jumpy, notch-by-notch wheel input with a tunable curve.
- **Button and gesture mapping** binds side buttons, wheel tilt, and gestures to real actions.
- **Pointer speed and acceleration** are applied instantly through a low-level system path.

This layer is configured on its own and keeps working regardless of which app is in front. Most of what LinguaX does day to day lives here.

### Layer 2 — Input source layer (an add-on)

On top of the Mouse+ baseline, LinguaX can switch your input source automatically based on context. This layer is optional — you can run LinguaX purely for mouse enhancement and never enable it.

When enabled, the input source layer reacts to context changes:

1. Detect the active app.
2. If the app is a browser, detect the active domain.
3. Match configured app and domain rules.
4. Apply the target input source.
5. Re-check on each context change.

The mouse layer is the ground floor; the input source layer is a refinement stacked above it. They are independent, so disabling one never affects the other.

## Why This Model Is Lightweight and Reliable

- **Native and local.** A macOS app under 5MB — no Electron, no kernel driver, no account.
- **No telemetry.** Configuration stays on your Mac.
- **Fast, predictable decisions** made locally on each context change.
- **Incremental setup.** Start with mouse enhancement, then add input rules only when you need them.

## Related Docs

- [Rules and Priority](./rules-and-priority.md)
- [Mouse+ Overview](../mouse-plus/overview.md)
