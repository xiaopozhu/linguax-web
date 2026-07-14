---
id: logitech-lift
title: "Logi Lift on Mac: Vertical Mouse, Side-Button Mapping"
description: "Logi Lift's vertical ergonomic design plus LinguaX side-button mapping — remap Back / Forward, Thumb area, and add push-to-talk on Mac."
sidebar_label: Logi Lift
keywords:
  - logi lift mac
  - logi lift mac setup
  - logi lift button mapping mac
  - logitech lift mac
  - vertical mouse mac
  - ergonomic mouse mac
---

import PairingWidget from '@site/src/components/PairingWidget';
import Head from '@docusaurus/Head';

<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does the Logi Lift work on Mac without Logi Options+?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. macOS pairs the Lift as a standard HID mouse over Bluetooth or Bolt receiver. LinguaX adds side-button and wheel-click mapping without Options+ installed, no Logitech account required.' },
        },
        {
          '@type': 'Question',
          name: 'Is the Logi Lift really more comfortable than a flat mouse?',
          acceptedAnswer: { '@type': 'Answer', text: 'The 57-degree vertical angle keeps your wrist in a neutral handshake position, reducing pronation strain over long sessions. If you have RSI or wrist fatigue from long Mac work, it is worth trying. Combine it with LinguaX side-button remapping to reduce keyboard reaches.' },
        },
        {
          '@type': 'Question',
          name: 'Left-handed or right-handed Logi Lift on Mac?',
          acceptedAnswer: { '@type': 'Answer', text: 'Both. Logitech sells a left-handed Lift variant with mirrored button placement. LinguaX exposes the same named slots (Side 1, Side 2, Thumb, Wheel click) on both variants so recipes transfer.' },
        },
      ],
    })}
  </script>
</Head>

# Logi Lift on Mac — Vertical Mouse, Side-Button Mapping

The Logi Lift's 57-degree vertical angle is what draws most Mac users to it — a neutral wrist position that reduces pronation strain over an 8-hour workday. But out of the box on macOS, its side buttons and Thumb slot sit mostly unused. LinguaX gives them full click / long-press / directional-swipe gestures with per-app overrides — without Logi Options+ installed.

:::info Current recognition status
The Logi Lift receives **basic side-button mapping** via LinguaX's universal HID engine today. **Full HID++ 2.0 profile support** (battery reading, deeper thumb-button gesture layer) is planned for a future release — track the [Changelog](/docs/reference/changelog).
:::

<PairingWidget receiverHint="bolt" compact />

## What you can actually map on the Logi Lift

- **Side 1 / Side 2** — the two thumb-side buttons (default Back / Forward). Full four-gesture layer via LinguaX: click / double-click / long-press / directional swipe.
- **T (Thumb button area)** — the button just above the thumb rest. LinguaX exposes it in the T slot for click / long-press mapping. Directional swipe support depends on model firmware.
- **Wheel click** — the middle button.

Named-slot reference: [Button & Side-Button Mapping](/docs/mouse-plus/fundamentals/button-mapping). Gesture-type semantics: [Gesture Mapping](/docs/mouse-plus/fundamentals/gesture-mapping).

## Why remap the Lift on Mac

The Lift is designed to reduce **wrist and forearm** strain. It doesn't reduce **keyboard reach** strain — that comes from constantly hitting shortcuts. Remapping the Lift's side buttons to your most-used shortcuts closes the ergonomics loop:

- **Push-to-talk on Side 2** — voice input for anything text-heavy, so your fingers rest.
- **Space switching on Side 1 swipe** — no more `⌃ ←` / `⌃ →` reaches.
- **Screenshot / snip on wheel click** — hand stays on the mouse.

Broader ergonomics discussion: [MX Vertical](../device-compatibility) is the more extreme sibling for RSI cases; the Lift is the everyday-comfort option.

## Three ready-to-copy setups

### 1. Push-to-talk on Side 2 (or Thumb)
For voice-first work:

- `Side 2 long-press` → **Hold** your PTT key (Superwhisper `Fn`, Wispr Flow `⌥`, Zoom `Space`)
- `Side 2 click` → keep Forward for browsing

Or use the Thumb slot if you prefer to keep Side 2 as Forward:

- `T long-press` → **Hold** PTT key
- `T click` → quick lightweight action

More: [Push-to-Talk Voice Typing on Mac](/docs/push-to-talk/push-to-talk-voice-typing-mac).

### 2. Space switching with a Side 1 swipe
Avoid the `⌃ ←` / `⌃ →` keyboard reach:

- `Side 1 swipe-left` → `⌃ ←`
- `Side 1 swipe-right` → `⌃ →`
- `Side 1 click` → keeps default Back

### 3. App-scoped input source (multilingual users)
The Lift is often chosen for long-form writing — perfect fit for language switching without keyboard reaches:

- Global: `WL` / `WR` unmapped (the Lift has no Wheel Tilt slot; use Side 1 / Side 2 instead)
- In Slack: `Side 1 double-click` → English input; `Side 2 double-click` → primary chat language
- In your editor: no mapping (avoid interference with normal Back / Forward)

Full walkthrough: [Auto-switch input source by app or domain on Mac](/docs/input-source/auto-switch-input-source-app-domain-mac).

## Setup in three minutes

1. **Install LinguaX** from [Installation](/docs/getting-started/installation).
2. **Pair the Lift.** Bluetooth pairs in System Settings. If your Lift shipped with a Bolt receiver and you want to use that, our [in-browser pairing tool](/tools/pair-logitech-receiver) can pair the receiver without Logi Options+.
3. **Open Mouse+.** LinguaX picks up the Lift; assign gestures to Side 1 / Side 2 / T / Wheel click.
4. **Apply a recipe.** Push-to-talk pairs especially well with the Lift because voice input reduces the total time your wrist is engaged.

The [First Run](/docs/getting-started/first-run) guide covers macOS permission prompts.

## Compatibility notes

- **Vertical angle** — 57 degrees; comfortable transition from a flat mouse after a couple of days.
- **Left / right-handed variants** — LinguaX exposes identical named slots on both (buttons are mirrored).
- **Bluetooth + Bolt** — either works with LinguaX.
- **Battery reading** — not yet exposed in LinguaX (see info tip); coming when the Lift joins deeper HID++ recognition.
- **Three Easy-Switch hosts** — separate profile per host in LinguaX.

## FAQ

**Does the Logi Lift work on Mac without Logi Options+?**
Yes — macOS handles it as standard HID; LinguaX adds side-button mapping without Options+ installed.

**Is the Lift really more comfortable than a flat mouse?**
For most users with wrist strain: yes. The 57-degree vertical angle reduces pronation. Give yourself a few days for muscle memory.

**Left- or right-handed on Mac?**
Both — Logitech ships mirrored variants. LinguaX supports both.

**Does LinguaX show battery for the Lift?**
Not yet — planned for a future release. The mouse itself shows a low-battery LED.

## Related pages

- [MX Master 3S](./mx-master-3s) — larger desktop mouse if you prefer a wider hand grip.
- [MX Ergo](./mx-ergo) — trackball alternative for zero wrist movement.
- [Push-to-Talk on Mac with a Mouse Button](/docs/push-to-talk/push-to-talk-voice-typing-mac) — most-fitting workflow for ergonomic mice.
- **On Options+ already?** [Logi Options+ Alternative for macOS](/docs/comparisons/logi-options-plus-alternative-macos).
- All models: [Compatible Mouse Models overview](/docs/mouse-plus/device-compatibility).
