---
title: Auto Switch Input Source by App and Domain on Mac
description: Configure app and browser-domain input-source automation on macOS in a simple and stable way.
keywords:
  - auto switch input source by app mac
  - auto switch input source by website domain mac
  - macos app and domain input method rules
  - bilingual workflow input switching mac
---

This guide shows a simple way to configure input-source automation by app and domain without creating rule sprawl.

## Best Minimal Setup

Start with only three rules:

1. Editor / IDE app rule
2. Communication app rule
3. One browser domain rule

Then test in your natural switching order.

## Priority Logic (Keep It Clear)

- app rule = baseline
- domain rule = browser refinement
- domain rule should override broad browser default when both match

## Common Mistakes

- adding too many rules at once
- using inconsistent domain text
- keeping outdated rules that no longer match your workflow

## Maintenance Routine

Weekly quick check:

- remove stale domains
- keep high-frequency apps explicit
- verify one editor + one browser transition

## Related Guides

- [Input Source Auto Switch](../features/input-source-auto-switch.md)
- [Website Language Mapping](../features/website-language-mapping.md)
- [Browser Domain Rules](../guides/browser-domain-rules.md)
