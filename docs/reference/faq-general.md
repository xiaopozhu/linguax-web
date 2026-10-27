---
title: General FAQ
description: "Frequently asked questions about LinguaX — compatibility, pricing, privacy, trial, and how the mouse and input-source modules work."
keywords:
  - linguax faq
  - linguax questions
  - linguax help
---

## What is LinguaX?

LinguaX is a lightweight, native macOS utility with two core modules: **Mouse+ enhancement** — smooth scrolling, side-button and gesture mapping, per-app smooth-scroll overrides, and pointer speed control — and automatic **input-source switching** by app and website. The two are independent capabilities, presented mouse-first in our story but equal under the hood.

It is a small native app (~10MB), not an Electron app. Core mouse and input-source behavior runs locally. Downloads, updates, and license validation use network services. AIx sends submitted text only when you invoke an AI action and consent; iCloud configuration sync is optional.

## Who is it for?

Developers, designers, and multilingual users who rely on their mouse all day and want a calmer, more capable workflow — plus automatic input-source switching when they move between apps and websites.

## Is LinguaX a mouse tool or an input-method tool?

Both. Mouse+ enhancement and input-source switching are two independent core capabilities. Our messaging leads with the mouse, but neither is a sub-feature of the other.

## Does LinguaX only work in browsers?

No. Mouse+ enhancement works system-wide. For input switching, app-level rules work across macOS apps, and browser domain rules add finer per-website control (matched by domain, with parent-domain fallback).

## Does LinguaX require cloud processing for core behavior?

No. Core mouse and input behavior runs locally on your Mac. AIx text generation is an optional online feature; see the [Privacy Policy](/terms/privacy-policy/) for its data flow.

## How much does LinguaX cost?

LinguaX offers a **$9.9 one-time Lifetime license for up to 3 devices**. There are no monthly fees or recurring subscription charges. See [Pricing](/pricing) for the current amount.

## Is there a free trial?

Yes. The trial unlocks **all features for 30 days** with no payment required, so you can validate it in your real workflow before buying. See [Trial vs Lifetime](/docs/reference/trial-vs-lifetime).

## Is it a subscription?

No. LinguaX is a one-time purchase. You pay once and keep using it permanently — no recurring charges.

## How many devices does one license cover?

One Lifetime license activates on **up to 3 devices**, so you can run LinguaX across your Mac setups. See [License Activation](/docs/reference/license-activation).

## Why is a mouse mapping or gesture not working?

Common causes include missing permissions, another mouse tool running at the same time, or a model-specific button limitation. Basic features also work on unlisted USB or Bluetooth mice. See [Mouse Issues](/docs/troubleshooting/mouse-issues).

## Why is a website rule not triggering?

Most cases are caused by one of these:

- incorrect domain text
- overlapping rules
- missing macOS permissions

See [App & Website Rules](/docs/input-source/app-and-website-rules) and [Common Issues](/docs/troubleshooting/common-issues).

## Where can I find practical setup examples?

Start with these:

- [Fix Choppy Mouse Scrolling on macOS](/docs/mouse-plus/recipes/fix-choppy-mouse-scrolling-macos)
- [How to Map Mouse Side Buttons on macOS](/docs/mouse-plus/recipes/map-mouse-side-buttons-macos)
- [Auto Switch Input Source by App and Domain](/docs/input-source/auto-switch-input-source-app-domain-mac)
