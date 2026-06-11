---
title: How LinguaX Works
---

LinguaX runs in the background on macOS and applies lightweight automation when your context changes.

## Runtime Model

1. Apply Mouse+ baseline (scrolling and mapped actions).
2. Detect active app.
3. If app is a browser, detect active domain.
4. Match configured rules.
5. Apply target input source and action behavior.
6. Re-check on each context change.

## Rule Layers

- Mouse+ baseline: default pointer and button behavior.
- App rules: baseline behavior per application.
- Website rules: finer control per domain in browsers.

When a browser domain rule matches, it should override a broad browser app default.

## Why This Model Works

- Fast, local decisions.
- Predictable behavior across repeated workflows.
- Incremental setup: start small, then expand only when needed.

## Related Docs

- [App & Website Rules](../input-source/app-and-website-rules.md)
- [Automatic Input Source Switching](../input-source/auto-switch.md)
