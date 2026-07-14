---
id: mx-ergo
title: "MX Ergo on Mac: Trackball Push-to-Talk & Button Mapping"
description: "MX Ergo trackball on Mac — remap Precision + Side buttons, add push-to-talk without lifting your hand. LinguaX, no Options+ needed."
sidebar_label: MX Ergo
keywords:
  - mx ergo mac
  - mx ergo mac setup
  - mx ergo button mapping mac
  - mx ergo push to talk mac
  - trackball mac
  - logitech trackball mac
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
          name: 'Does the MX Ergo work on Mac without Logi Options+?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. macOS pairs the MX Ergo as a standard HID mouse over Bluetooth or Unifying receiver. LinguaX adds Side-button and Precision-button mapping without Options+ or an account.' },
        },
        {
          '@type': 'Question',
          name: 'What makes push-to-talk so good on a trackball?',
          acceptedAnswer: { '@type': 'Answer', text: 'Trackball users move their fingers, not their whole arm. Push-to-talk on a Side button lets you dictate long passages without ever lifting your hand from the ball — closer to voice-first workflows than any other mouse form factor allows.' },
        },
        {
          '@type': 'Question',
          name: 'Does LinguaX remap the Precision button?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes — the Precision (DPI-toggle) button next to the ball is remappable to any keyboard shortcut or gesture in LinguaX. You lose the DPI-toggle unless you keep that action on it, so most users pick a low-frequency shortcut that pairs well with fine cursor control (e.g. a screenshot).' },
        },
      ],
    })}
  </script>
</Head>

# MX Ergo on Mac — Trackball Push-to-Talk Setup

The MX Ergo is one of the few trackballs that keeps a full set of mappable buttons — two side buttons, the Precision button next to the ball, and a wheel click. And because your hand never leaves the ball, push-to-talk on a trackball feels closer to a headset-mounted PTT switch than any regular mouse can manage. LinguaX gives you every button and gesture layer without Logi Options+ or an account.

:::info Current recognition status
The MX Ergo receives **basic side-button and Precision-button mapping** via LinguaX's universal HID engine today. **Full HID++ 2.0 profile support** (battery reading, deeper gesture layer) is planned for a future release — track the [Changelog](/docs/reference/changelog).
:::

<PairingWidget receiverHint="unifying" compact />

## What you can actually map on the MX Ergo

- **Side 1 / Side 2** — the two thumb-side buttons (default Back / Forward). Full four-gesture layer via LinguaX.
- **Precision** — the small button just below the trackball. Default action is DPI toggle; LinguaX lets you rebind it to any shortcut or gesture (you lose the DPI toggle unless you keep that action on it).
- **Wheel click** — the middle button.

Named-slot vocabulary: [Button & Side-Button Mapping](/docs/mouse-plus/fundamentals/button-mapping). Gesture-type semantics: [Gesture Mapping](/docs/mouse-plus/fundamentals/gesture-mapping).

The MX Ergo also has a physical tilt adjustment (0° or 20°) — hardware-only, no LinguaX involvement.

## Why push-to-talk on a trackball is uniquely good

On a standard mouse, PTT means moving your hand a bit — your fingers stay on the mouse but your wrist shifts. On a trackball, your hand doesn't need to shift at all. You can dictate a long paragraph while your thumb rests on Side 2, and go back to fine cursor control the moment you release.

That means the MX Ergo pairs unusually well with voice-first workflows:

- Long-form writing where you speak most and type corrections
- Code review where you speak comments and only type occasionally
- Emails / Slack where dictation is faster than typing
- Meetings on Zoom where mouse PTT saves you from reaching for the space bar

More on the workflow: [Push-to-Talk Voice Typing on Mac with a Mouse Button](/docs/push-to-talk/push-to-talk-voice-typing-mac). Comparing voice tools: [Best Push-to-Talk Apps for Mac (2026)](/docs/push-to-talk/best-push-to-talk-app-mac).

## Three ready-to-copy setups

### 1. Push-to-talk on Side 2 (the trackball killer app)
- `Side 2 long-press` (200 ms) → **Hold** your voice tool's PTT key (Superwhisper `Fn`, Wispr Flow `⌥`, Zoom `Space`)
- `Side 2 click` → keep Forward for browsing

Your thumb rests on the button while you speak, releases when you're done. No hand travel.

### 2. Precision button → Screenshot
The Precision button sits right under your thumb tip — perfect for a low-frequency action you want fast:

- `Precision click` → `⌘ ⇧ 4` (macOS area screenshot)
- Or `⌘ ⇧ 5` (screenshot menu) for more options

You lose the DPI toggle, but most trackball users find one DPI setting they like and never change it.

### 3. Space switching with Side 1 swipe
- `Side 1 swipe-left` → `⌃ ←`
- `Side 1 swipe-right` → `⌃ →`
- `Side 1 click` → keeps default Back

Space switching without moving the ball at all.

## Setup in three minutes

1. **Install LinguaX** from [Installation](/docs/getting-started/installation).
2. **Pair the MX Ergo.** Bluetooth for a single Mac; if your unit came with a Unifying receiver, that also works. Never paired the Unifying receiver before? Our [in-browser pairing tool](/tools/pair-logitech-receiver) can pair or unpair without Options+.
3. **Open Mouse+.** LinguaX picks up the MX Ergo; assign gestures to Side 1 / Side 2 / Precision / Wheel click.
4. **Apply the push-to-talk recipe first.** It is the recipe that most changes how a trackball feels on a modern Mac.

The [First Run](/docs/getting-started/first-run) guide covers macOS permission prompts.

## MX Ergo vs a regular mouse for productivity

| | Regular mouse | MX Ergo (trackball) |
|---|---|---|
| Hand travel per click | Small | None |
| Push-to-talk feel | Reach + release | Rest thumb + release |
| Wrist load | Moderate | Very low |
| Learning curve | None | ~2 days |
| Space required on desk | Cursor travel area | Just the trackball footprint |
| Precision cursor work | Faster | Slower (compensated by Precision button) |

If your Mac work is 60%+ writing / voice / reading, the MX Ergo with LinguaX PTT is worth trying. If it's 60%+ pixel-precise design / gaming, a regular mouse is usually still faster.

## Compatibility notes

- **Bluetooth + Unifying receiver** — either works with LinguaX.
- **Two Easy-Switch hosts** — separate profile per host in LinguaX.
- **Battery reading** — not yet exposed in LinguaX (see info tip); the mouse itself has a battery LED.
- **Tilt** — hardware-only 0° / 20°; no software involvement.
- **Sleep / wake** — auto-recovers.

## FAQ

**Does the MX Ergo work on Mac without Logi Options+?**
Yes — LinguaX adds side-button and Precision-button mapping without Options+.

**What makes push-to-talk so good on a trackball?**
Your hand never leaves the ball. Dictate long passages without any hand travel — closer to a headset PTT switch than any regular mouse.

**Does LinguaX remap the Precision button?**
Yes. You lose the DPI toggle unless you keep that action on it; most trackball users pick one DPI and never change it.

**Left- or right-handed?**
The MX Ergo is right-hand only. Left-handers may prefer the Kensington SlimBlade or ExpertMouse.

## Related pages

- [Push-to-Talk Voice Typing on Mac](/docs/push-to-talk/push-to-talk-voice-typing-mac) — the killer app for trackballs.
- [Best Push-to-Talk Apps for Mac (2026)](/docs/push-to-talk/best-push-to-talk-app-mac) — pick a voice tool to pair with the Side-2 PTT recipe.
- [Logi Lift](./logitech-lift) — vertical mouse alternative if the trackball learning curve is too much.
- [MX Master 3S](./mx-master-3s) — traditional mouse with more slots for non-voice workflows.
- All models: [Compatible Mouse Models overview](/docs/mouse-plus/device-compatibility).
