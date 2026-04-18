---
title: App Rules vs Website Rules
---

LinguaX supports two input-rule types so typing behavior can follow real work context.

Mouse+ behavior is configured separately and can run alongside these rules.

## App Rules

App rules apply when a specific app is foreground.

Use app rules for:

- IDEs and editors
- terminal apps
- design tools
- chat apps

Example:

- `Cursor` -> English
- `WeChat` -> Chinese

## Website Rules

Website rules apply to domains inside browsers.

Use website rules for:

- documentation sites
- internal dashboards
- AI chat tools
- region-specific websites

Example:

- `docs.example.com` -> English
- `chat.example.cn` -> Chinese

## Priority Model

1. LinguaX detects active app.
2. For non-browser apps, app rule applies.
3. For browsers, matching domain rule takes priority over the browser app default.

## Practical Setup Order

1. Configure app rules for top 3 daily apps.
2. Add domain rules only where app defaults are not enough.
3. Test tab switching before adding more rules.

## Related Guides

- [Browser Domain Rules](../guides/browser-domain-rules.md)
- [Input Source Auto Switch](../features/input-source-auto-switch.md)
