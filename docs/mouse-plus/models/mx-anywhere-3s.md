---
id: mx-anywhere-3s
title: "MX Anywhere 3S on Mac: Portable Mouse, Full Mapping"
description: "The MX Anywhere 3S has six mappable inputs — LinguaX unlocks Thumb-button gestures, Wheel Tilt actions, and per-app overrides on macOS without Options+."
sidebar_label: MX Anywhere 3S
keywords:
  - mx anywhere 3s mac
  - mx anywhere 3s mac setup
  - mx anywhere 3s button mapping mac
  - mx anywhere 3s thumb button mac
  - mx anywhere 3s travel mac
  - portable mouse mac
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
          name: 'Does the MX Anywhere 3S have a Thumb button like the MX Master series?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes — the Thumb (T) slot exists on the MX Anywhere 3S. It sits at the top-left near your index finger rather than the thumb rest, but LinguaX exposes it as the same T slot with long-press and directional-swipe support.' },
        },
        {
          '@type': 'Question',
          name: 'Is the MX Anywhere 3S small enough to actually use push-to-talk?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. The T button is easy to hold for the 200 ms long-press threshold without the mouse shifting. Push-to-talk on a portable travel mouse works surprisingly well because the button is close to your resting grip.' },
        },
        {
          '@type': 'Question',
          name: 'Bluetooth or Bolt receiver for a portable mouse?',
          acceptedAnswer: { '@type': 'Answer', text: 'Bluetooth is usually the right call for travel — no dongle to lose. If you dock at a permanent desk with a receiver, keep the Bolt there and Bluetooth for the road; the Easy-Switch button toggles between them.' },
        },
      ],
    })}
  </script>
</Head>

# MX Anywhere 3S on Mac — Portable Mouse, Full Mapping

The MX Anywhere 3S is the travel-sized cousin of the MX Master 3S — smaller, no built-in Scroll Mode key, but still six named slots you can map. And because it is on the LinguaX recognition list with full HID++ 2.0, the Thumb-button gestures and Wheel-Tilt tricks the MX Master crowd loves work here too, even on a mouse you can slip in a pocket.

<PairingWidget receiverHint="bolt" compact />

## What you can actually map on the MX Anywhere 3S

- **Side 1 / Side 2** — the two thumb-side buttons (default Back / Forward), with full click / double-click / long-press / directional-swipe gesture support.
- **T (Thumb button)** — on the Anywhere 3S, the "Thumb" slot maps to the top-left button near your index finger (called "Gesture button" in Logitech marketing). LinguaX exposes it as T so recipes from the MX Master line transfer directly.
- **WL / WR (Wheel Tilt Left / Right)** — the wheel presses sideways. LinguaX reads these as discrete buttons, not just horizontal-scroll events.
- **Wheel click** — the middle button.

The full named-slot vocabulary is in [Button & Side-Button Mapping](/docs/mouse-plus/fundamentals/button-mapping).

Note: unlike the MX Master 3S, the Anywhere 3S has **no dedicated Scroll Mode key** — the wheel is always MagSpeed and switches ratchet ↔ free-spin automatically based on flick speed. So no SM slot on this model.

## What Options+ can't do on the Anywhere 3S

Everything you'd expect from LinguaX on the MX Master, minus the SM slot:

- **Push-to-talk** on the Thumb button — long-press with a 200 ms threshold as a physical PTT switch.
- **Four-direction swipe** on Side 1 / T — Options+ fires on press; LinguaX distinguishes four independent swipe directions.
- **Per-app overrides** by bundle ID via [App-Scoped Overrides](/docs/mouse-plus/fundamentals/app-scoped-overrides).
- **Modifier-hold** — Side buttons can act as held Cmd / Opt / Ctrl.
- **No account, no cloud sync, ~10 MB native.**

Broader alternative writeup: [Logi Options+ Alternative for macOS](/docs/comparisons/logi-options-plus-alternative-macos).

## Three ready-to-copy setups for a portable mouse

### 1. Push-to-talk on the Thumb button
The Anywhere 3S's small size actually helps here — the T button is near your resting grip, so the 200 ms long-press feels natural even mid-typing:

- `T long-press` → **Hold** your voice tool's PTT key (Superwhisper, Wispr Flow, Zoom, Discord)
- `T click` → optional short "insert timestamp" or "quick capture" action

Details: [Push-to-Talk Voice Typing on macOS with a Mouse Button](/docs/push-to-talk/push-to-talk-voice-typing-mac).

### 2. Space switching with Wheel Tilt (compact-friendly)
On the smaller Anywhere 3S the Side buttons take a little more thumb travel. If Wheel Tilt is easier for you, use it:

- `WL` → `⌃ ←` (Space left)
- `WR` → `⌃ →` (Space right)
- Keep Side 1 / Side 2 for Back / Forward, which you'll use constantly while browsing

### 3. App-scoped input source (travel-friendly)
Perfect for the multilingual traveller — the same physical button switches languages differently in Slack vs your editor vs your browser:

- Global: `WL` → English, `WR` → your second input
- In Slack / Messages: `WL` → English, `WR` → primary chat language

Full walkthrough: [Auto-switch input source by app or domain on Mac](/docs/input-source/auto-switch-input-source-app-domain-mac).

## Setup in three minutes

1. **Install LinguaX** from [Installation](/docs/getting-started/installation).
2. **Pair the mouse.** For travel, Bluetooth is usually better — no dongle to lose. Pair via macOS System Settings; the Anywhere 3S supports three Easy-Switch slots so you can also pair a Bolt receiver at a permanent desk.
3. **Open Mouse+.** LinguaX recognises the Anywhere 3S automatically and shows T, Side 1/2, WL/WR, Wheel click.
4. **Apply a recipe.** Start with push-to-talk since the compact form factor makes it especially natural.

The [First Run](/docs/getting-started/first-run) guide covers accessibility-permission prompts on macOS.

## MX Anywhere 3S vs the MX Master line

| | MX Anywhere 3S | MX Master 3S |
|---|---|---|
| Weight | 99 g | 141 g |
| Mappable slots | 6 (no SM) | 7 |
| Thumb-button location | Top-left, under index finger | Behind thumb rest |
| Wheel modes | Auto MagSpeed | MagSpeed with SM toggle |
| Portability | High (fits in a small pocket) | No |

If your workflow is mostly stationary, the MX Master 3S has more buttons and a dedicated Scroll Mode. If you carry a laptop bag, the Anywhere 3S loses the SM slot but keeps everything else — including the Thumb-button gesture magic that most Options+ users never discover.

## Compatibility notes

- **HID++ 2.0** — recognised natively with full profile support.
- **Battery** — shown in the tray for both Bluetooth and Bolt connections.
- **Sleep / wake** — auto-recovers.
- **Three Easy-Switch hosts** — LinguaX keeps a separate profile per host.

## FAQ

**Does the MX Anywhere 3S have a Thumb button like the MX Master series?**
Yes — the T slot on the Anywhere 3S maps to the top-left button near your index finger. LinguaX exposes it as the same T named slot, so MX Master recipes transfer.

**Is the MX Anywhere 3S small enough to actually use push-to-talk?**
Surprisingly good — the T button is near your resting grip, and the 200 ms long-press threshold works without the mouse shifting.

**Bluetooth or Bolt receiver for a portable mouse?**
Bluetooth is usually the right call for travel — nothing to lose. Bolt is fine for a permanent desk.

**Does LinguaX show battery for the Anywhere 3S?**
Yes, via HID++ over Bluetooth or via the Bolt receiver.

## Related pages

- [MX Anywhere 3](./mx-anywhere-3) — the previous-generation model; same slot layout.
- [MX Master 3S](./mx-master-3s) — the larger desktop-first sibling.
- [MX Master 3](./mx-master-3) — desktop, older generation, same mapping surface.
- All models: [Compatible Mouse Models overview](/docs/mouse-plus/device-compatibility).
