---
title: Profiles and Priority
---

As your LinguaX setup grows, profiles and clear priority rules keep behavior predictable.

## Why Profiles Help

Different contexts often need different rule sets:

- coding-heavy sessions
- design-heavy sessions
- multilingual communication sessions

Profiles let you group rules by workflow intent instead of mixing everything in one list.

## Suggested Profile Strategy

1. Create one baseline profile for daily default behavior.
2. Add a second profile only when requirements clearly diverge.
3. Use explicit names (for example `Dev Daily`, `Design Review`, `CN Communication`).

## Priority Principles

Use these rules consistently:

- specific context beats broad context
- in browsers, matching domain rules beat broad browser app defaults
- avoid overlaps for the same app/domain target

## Conflict Prevention

- keep one clear owner rule per context
- avoid duplicate fallback rules
- test each new rule before adding the next one

## Maintenance Checklist

- review active rules monthly
- remove stale apps/domains
- keep only validated rules

## Related Docs

- [How LinguaX Works](./how-linguax-works.md)
- [App Rules vs Website Rules](./app-rules-vs-website-rules.md)
- [Common Issues](../troubleshooting/common-issues.md)
