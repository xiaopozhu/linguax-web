---
title: How LinguaX Works
---

LinguaX runs in the background on macOS and applies rules when your context changes.

## Runtime Model

1. Detect active app.
2. If app is a browser, detect active domain.
3. Match configured rules.
4. Apply target input source.
5. Re-check on each context change.

## Rule Layers

- App rules: baseline behavior per application.
- Website rules: finer control per domain in browsers.

When a browser domain rule matches, it should override a broad browser app default.

## Why This Model Works

- Fast, local decisions.
- Predictable behavior across repeated workflows.
- Incremental setup: start with a few rules, then expand.

## Related Docs

- [App Rules vs Website Rules](./app-rules-vs-website-rules.md)
- [Input Source Auto Switch](../features/input-source-auto-switch.md)
- [Browser Domain Rules](../guides/browser-domain-rules.md)
