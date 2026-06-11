---
title: App-Scoped Overrides
description: Give each macOS app its own mouse behavior — different smooth scrolling, gestures, and button mappings per application.
keywords:
  - per app mouse settings mac
  - app specific mouse mapping macos
  - per app smooth scrolling mac
  - mouse rules per application
---

# App-Scoped Overrides

One mouse setup rarely fits every app. Scrolling that feels right in a browser can feel wrong in Xcode; a button that means "back" in Safari might be better as "run" in your editor. App-scoped overrides let each app keep its own mouse behavior while a clean global baseline covers everything else.

## What you can override per app

- **Smooth scrolling** — each app can have its own scrolling behavior, tuned to how you use it.
- **Gestures** — configure click, long-press, drag, and swipe actions for specific apps independently from global settings.
- **Button mapping** — assign different actions to the same button depending on the active app.

## Configuration steps

1. Open the app scope switcher in Mouse+.
2. Pick the app you want to customize. The running-apps list refreshes automatically as apps launch or quit, so the target is easy to find.
3. Set the scrolling, gesture, or button behavior for that app.
4. Leave other apps untouched — they keep following the global defaults.

Keep overrides minimal: add one only where the global behavior genuinely falls short. A small set of overrides on top of a solid baseline is easier to reason about than many competing rules. For how overrides resolve against global settings, see [Rules and Priority](../core-concepts/rules-and-priority.md).

## Related Docs

- [Mouse+ Overview](./overview.md)
- [Rules and Priority](../core-concepts/rules-and-priority.md)
