---
title: Input Source Auto Switch
---

Input Source Auto Switch is LinguaX's core feature.

It changes input source automatically when app or website context changes.

## What Triggers It

- Foreground app changes.
- Active browser domain changes.

## Recommended First Setup

1. Add one rule for your main editor.
2. Add one rule for your main chat app.
3. Add one high-frequency domain rule.
4. Validate behavior before expanding.

## Behavior Summary

- App rules set defaults per app.
- Domain rules refine browser behavior.
- Matching browser domain rules should override broad browser defaults.

## Validation Checklist

1. Switch between two configured non-browser apps.
2. Verify each app uses the expected input source.
3. Switch between two configured browser domains.
4. Verify domain-specific behavior.

## Related Docs

- [App Rules vs Website Rules](../core-concepts/app-rules-vs-website-rules.md)
- [Browser Domain Rules](../guides/browser-domain-rules.md)
- [Common Issues](../troubleshooting/common-issues.md)
