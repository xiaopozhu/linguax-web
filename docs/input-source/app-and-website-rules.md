---
title: App & Website Rules
---

# App & Website Rules

LinguaX drives automatic input source switching with two rule types. Both sit on top of Mouse+, which is configured separately and runs alongside them.

## The Two Rule Types

**App Rule** — applies when a specific app is in the foreground. Use it for IDEs and editors, terminals, design tools, and chat apps.

- `Cursor` → English
- `WeChat` → Chinese

**Website / Domain Rule** — applies to a domain inside a browser. Use it for documentation sites, internal dashboards, AI chat tools, and region-specific websites.

- `docs.example.com` → English
- `chat.example.cn` → Chinese

A single browser usually holds mixed contexts at once: docs, chat, admin tools, local platforms. Domain rules prevent one broad browser default from breaking every tab.

## Priority Model

1. LinguaX detects the active app.
2. For non-browser apps, the matching app rule applies.
3. For browsers, a matching domain rule takes priority over the browser app default.

## Configure an App Rule

1. Open the app rules list.
2. Add the target app.
3. Set its input source.
4. Save and enable.

Start with your top 3 daily apps.

## Configure a Domain Rule

1. Confirm the browser app rule baseline works first.
2. Open the website / domain rules list.
3. Select the browser, add the domain, and set the target input source.
4. Save and enable.

### Exact Matching Tips

- Use exact domains like `docs.example.com`.
- Avoid duplicate rules for the same domain.
- Keep rules narrow before introducing broad patterns.
- Keep the browser app default simple and let domain rules refine it.

## Verify & Troubleshoot

1. Open two configured domains in separate tabs and switch between them.
2. Leave the browser and confirm non-browser app rules still work.

If a rule does not trigger:

- check domain spelling and rule enabled state
- remove overlapping broad rules
- restart the browser and LinguaX

If it still fails, see [Common Issues](../troubleshooting/common-issues.md).

## Related Docs

- [Rules and Priority](../core-concepts/rules-and-priority.md)
- [Multilingual Workflow](./multilingual-workflow.md)
