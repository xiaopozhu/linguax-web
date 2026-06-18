---
title: Auto Switch Input Source by App and Domain on Mac
description: Automatically switch macOS input source by app and browser domain with LinguaX — one of its two core capabilities alongside mouse enhancement. Native, ~10MB, no account.
keywords:
  - auto switch input source by app mac
  - auto switch input source by website domain mac
  - macos app and domain input method rules
  - bilingual workflow input switching mac
  - automatic input method switching mac
---

If you work in two languages, you know the friction: you tab into your editor still in the wrong input source, or you land on an English site with your IME on. macOS will not switch input source per app or per website on its own. LinguaX can — automatically — by app and by browser domain.

> LinguaX has **two core capabilities**: mouse enhancement (smooth scrolling, side-button mapping, gestures) and **automatic input-source switching**. The two are independent — input-source automation is a first-class feature, not an add-on to the mouse engine — so bilingual users get one lightweight app that handles both pointer workflow and typing context.

## What You Can Automate

- **Per app** — set an input source for each app (English in your IDE, your IME in chat).
- **Per browser domain** — inside a supported browser, a specific domain can use a different input source than the app rule. Domain switching works in Safari, Chrome, Edge, Brave, and Opera; **Firefox does not support domain switching** (LinguaX cannot read its active tab URL).

There is no account and no telemetry; rules live locally.

## Best Minimal Setup

Start with only three rules and grow from there:

1. Editor / IDE app rule
2. Communication app rule
3. One browser domain rule

Then test in your natural switching order.

## Priority Logic (Keep It Clear)

LinguaX resolves the input source in this order, highest priority first:

1. **Website domain rule** — wins whenever it matches (browsers only).
2. **App rule** — used when no domain rule matches.
3. **Global default** — falls back to your default input source when nothing else matches.

So a matching domain rule overrides the app rule and the global default. Domain matching is exact first, then falls back to the parent domain (for example, `mail.google.com` falls back to `google.com`), ignoring `www.`.

## Setup Steps

1. Install LinguaX. App rules work without extra permission; **domain rules require Accessibility permission** (LinguaX reads the active browser tab's URL through it).
2. Add an app rule for your editor and one for a communication app.
3. Add one browser domain rule for a site you use in the other language.
4. Switch between them in your normal order and confirm each transition.

## Common Mistakes

- adding too many rules at once
- using inconsistent domain text
- keeping outdated rules that no longer match your workflow

## Maintenance Routine

A quick weekly check keeps it clean:

- remove stale domains
- keep high-frequency apps explicit
- verify one editor + one browser transition

## Get Started

LinguaX is a free download with a **30-day trial** — no account, no telemetry. If it fits your workflow, it is a **$9.9 one-time purchase covering 3 devices**.

**[Download LinguaX](/download)** and automate input switching free for 30 days.

## Related Guides

- [App & Website Rules](../input-source/app-and-website-rules.md)
- [Automatic Input Source Switching](../input-source/auto-switch.md)
- [Multilingual Workflow](../input-source/multilingual-workflow.md)
