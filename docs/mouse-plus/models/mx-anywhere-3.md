---
id: mx-anywhere-3
title: "MX Anywhere 3 on Mac: Same Mapping Power as the 3S"
description: "MX Anywhere 3 gets the same four-slot LinguaX mapping surface as the 3S — side-button push-to-talk, Space switching, per-app overrides, no Options+ needed."
sidebar_label: MX Anywhere 3
keywords:
  - mx anywhere 3 mac
  - mx anywhere 3 mac setup
  - mx anywhere 3 button mapping mac
  - mx anywhere 3 side buttons mac
  - mx anywhere 3 portable mouse mac
---

import PairingWidget from '@site/src/components/PairingWidget';
import Head from '@docusaurus/Head';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

<Head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is the MX Anywhere 3 still worth using in 2026 with LinguaX?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes — the MX Anywhere 3 is on the LinguaX recognition list with full HID++ 2.0 support. The 3S added quieter clicks and 8000-DPI tracking; the mapping surface is identical (S1, S2, M, SM). If you already own a 3, keep it.' },
        },
        {
          '@type': 'Question',
          name: 'Does the MX Anywhere 3 have a Thumb button?',
          acceptedAnswer: { '@type': 'Answer', text: 'No — neither the 3 nor the 3S has a Thumb button; that is exclusive to the MX Master line. On the Anywhere 3 you have S1, S2, M (wheel click), and SM (Scroll Mode toggle) as configurable slots.' },
        },
        {
          '@type': 'Question',
          name: 'Can I do push-to-talk on the MX Anywhere 3?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes — bind long-press to a side button (S2 works well since Forward is less muscle-critical than Back). The 200 ms threshold turns a side button into a physical PTT switch.' },
        },
      ],
    })}
  </script>
</Head>

# MX Anywhere 3 on Mac — Same Mapping Power as the 3S

The MX Anywhere 3 shares the same four-slot mapping surface as the 3S: two side buttons, the wheel click, and the Scroll Mode toggle. It is on the LinguaX recognition list with full HID++ 2.0, so long-press on the side buttons, per-app overrides, and battery reading all work. If you're deciding between keeping your 3 and upgrading to a 3S, the mapping surface is not a reason to upgrade.

<PairingWidget receiverHint="unifying" />

<ThemedImage
  alt={"MX Anywhere 3 — LinguaX button slot layout showing 4 configurable slots (S1, S2, M, SM); no thumb button, no thumb wheel"}
  sources={{
    light: useBaseUrl('/img/models/mx-anywhere-slots.svg'),
    dark: useBaseUrl('/img/models/mx-anywhere-slots-dark.svg'),
  }}
  width="640"
/>

## What you can actually map on the MX Anywhere 3

LinguaX exposes four configurable inputs on the Anywhere 3:

- **`S1` / `S2` (side buttons)** — the two thumb-side buttons (default Back / Forward), with click / double-click / long-press / directional-swipe gestures.
- **`M` (wheel click)** — the middle button.
- **`SM` (Scroll Mode)** — the small button behind the wheel; toggles the MagSpeed wheel between ratchet and free-spin, and can carry a second action too.

The Anywhere line has **no dedicated Thumb button** (exclusive to MX Master models) and **no Wheel Tilt** — the wheel presses down for middle-click but does not tilt sideways.

Slot vocabulary reference: [Button & Side-Button Mapping](/docs/mouse-plus/fundamentals/button-mapping). Gesture-type semantics: [Gesture Mapping](/docs/mouse-plus/fundamentals/gesture-mapping).

## What Options+ can't do here

- **Push-to-talk** on a side button (long-press as a physical PTT switch).
- **Four-direction swipe** on S1 / S2 (Options+ fires on press only).
- **Per-app overrides** by bundle ID — see [App-Scoped Overrides](/docs/mouse-plus/fundamentals/app-scoped-overrides).
- **Modifier-hold** on a side button.
- **No account, no cloud sync, ~10 MB native.**

Broader writeup: [Logi Options+ Alternative for macOS](/docs/comparisons/logi-options-plus-alternative-macos).

## Three ready-to-copy setups

### 1. Push-to-talk on S2
No Thumb button on the Anywhere line, so use S2 (Forward) — Forward is less muscle-critical than Back:

- `S2 long-press` (200 ms) → **Hold** your voice tool's PTT key (Superwhisper `Fn`, Wispr Flow `⌥`, Zoom `Space`)
- `S2 click` → keep Forward for browsing

More: [Push-to-Talk Voice Typing on Mac](/docs/push-to-talk/push-to-talk-voice-typing-mac).

### 2. Spaces switching with S1 swipe
- `S1 swipe-left` → `⌃ ←`
- `S1 swipe-right` → `⌃ →`
- `S1 click` → keeps default Back

### 3. App-scoped side-button behaviour
- Global: `S2 click` → Forward
- In Slack: `S2 click` → send message
- In your code editor: `S2 double-click` → toggle sidebar

Full walkthrough: [Auto-switch input source by app or domain on Mac](/docs/input-source/auto-switch-input-source-app-domain-mac).

## Setup in three minutes

1. **Install LinguaX** from [Installation](/docs/getting-started/installation).
2. **Pair the mouse.** Bluetooth for travel, Unifying / Bolt for permanent desks. New receiver? Pair without Options+ via the [in-browser pairing tool](/tools/pair-logitech-receiver).
3. **Open Mouse+.** LinguaX picks up the Anywhere 3 via VID:PID + HID++ probing; you'll see S1, S2, M, SM.
4. **Apply a recipe.** Push-to-talk on S2 is the quickest single-button productivity win.

The [First Run](/docs/getting-started/first-run) guide walks through macOS permission prompts.

## MX Anywhere 3 vs 3S — is upgrading worth it?

Software-wise, no. Same four configurable slots, same HID++ profile, same gesture types.

| | MX Anywhere 3 | MX Anywhere 3S |
|---|---|---|
| Weight | Same (99 g class) | Same |
| Max DPI | 4000 | 8000 |
| Tracking on glass | No | Yes |
| Click noise | Standard | Quieter |
| Bundled receiver | Unifying (older stock) or Bolt | Bolt |

Upgrade if you need silent clicks (open-plan office, shared spaces) or glass tracking. Otherwise keep the 3.

## Compatibility notes

- **HID++ 2.0** — full profile support.
- **Battery** — shown in the tray.
- **Sleep / wake** — auto-recovers.
- **Three Easy-Switch hosts** — separate LinguaX profile per host.

## FAQ

**Is the MX Anywhere 3 still worth using in 2026?**
Yes. Full LinguaX recognition, same mapping surface as the 3S. The 3S adds hardware polish (silent clicks, higher DPI), not mapping capabilities.

**Does the MX Anywhere 3 have a Thumb button?**
No — Thumb is exclusive to the MX Master line. Four configurable slots on the Anywhere: S1, S2, M, SM.

**Can I do push-to-talk?**
Yes — bind long-press to S2 (Forward is less used than Back for most habits).

**Bluetooth or receiver?**
Bluetooth for travel, receiver for stationary. Both support full HID++.

## Get started

LinguaX is a free download with a **30-day trial** — no account, no telemetry. If it fits, it is a **$9.9 one-time purchase covering 3 devices** (no subscription).

**[Download LinguaX](/download)** and set up your MX Anywhere 3 free for 30 days.

## Related pages

- [MX Anywhere 3S](./mx-anywhere-3s) — newer sibling; identical four-slot mapping surface.
- [MX Master 3](./mx-master-3) — desktop equivalent with T, SM, WL, WR.
- [MX Master 3S](./mx-master-3s) — newest desktop model.
- **On Options+ already?** [Migrate from Logi Options+ (MX Master 3S guide)](/docs/comparisons/mx-master-3s-mac-setup-without-logi-options) — steps apply to the Anywhere line too.
- All models: [Compatible Mouse Models overview](/docs/mouse-plus/device-compatibility).
