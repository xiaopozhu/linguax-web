---
slug: push-to-talk-on-mac-with-a-mouse
title: "Push-to-Talk on Mac With a Mouse Button: The 30-Second Setup That Fixed My Dictation Habit"
authors: [deepzz0]
tags: [macos, mouse, voice-input, push-to-talk, workflow]
keywords:
  - push to talk mac
  - push to talk on mac with mouse
  - mouse button push to talk
  - macos dictation mouse button
  - hold fn key mouse mac
  - wispr flow mouse hotkey
  - superwhisper mouse hotkey
description: "How I moved push-to-talk voice input from a keyboard hotkey to a mouse side button on macOS in about 30 seconds — with a demo, the setup, and which voice tools it works with."
---

For months I kept promising myself I would use voice dictation more. On paper it is faster than typing for long-form. In practice I never reached for it, because the keyboard hotkey always landed in the wrong hand at the wrong moment. Somewhere between clicking a link and starting to talk, the momentum was gone.

The fix, when I finally tried it, took about 30 seconds. I bound push-to-talk to a side button on my mouse. Now the same hand that just clicked a text field holds down to talk and releases to stop. No shift of grip. No lookup. It is the difference between "I should use dictation" and actually using it.

<!-- truncate -->

## The Demo

Here is what it looks like once the button is bound. Hold the side button, talk, release, done.

<video
  src="https://st.linguax.app/video/demo-push-to-talk.mp4"
  autoPlay
  loop
  muted
  playsInline
  style={{ maxWidth: '100%', borderRadius: '8px', display: 'block', margin: '1.5rem auto' }}
  aria-label="Holding a mouse side button triggers voice dictation on macOS"
/>

That is it. The button is a side/thumb button on a regular USB or Bluetooth mouse. macOS Dictation is picking up the audio, but the same setup works with hold-to-talk voice tools like Wispr Flow, superwhisper, and Typeless.

## Why Hold-to-Talk Beats Toggle

Every voice tool eventually asks you to pick between two modes:

- **Toggle**: tap once to start, tap again to stop.
- **Hold**: hold the key while you talk, release to stop.

Toggle is the default because it fits desktop conventions. Hold is what your body actually wants. It matches how a walkie-talkie works, how you hold a shift key while typing a capital, how you hold a mouse button while dragging. There is no "did I remember to stop it" cognitive tax, because the moment you let go it is off.

The trouble with hold is that keyboard keys are awkward to hold while the other hand does anything else. Which is why the mouse is the right home for it. Your hand is already there.

## The 30-Second Setup

You need one thing: a way to make the mouse button behave as if you were physically holding the **Fn / Globe** key. That is the key macOS Dictation and most voice-input apps recognize as their push-to-talk trigger.

I use [LinguaX](/download) for this because it exposes a **Modifier Hold** gesture. Bind it once and the mouse button is the modifier for as long as you press it.

1. Install LinguaX. Grant Accessibility permission when it asks.
2. Open **Mouse+**, pick a side button (or the thumb button), and choose the **Modifier Hold** gesture.
3. Set the modifier to **Fn**. Save.

Then match the other side:

- **macOS Dictation**: System Settings → Keyboard → Dictation. Set the shortcut to the Globe/Fn key.
- **Wispr Flow / superwhisper / Typeless**: set the talk hotkey to Fn/Globe in the app's preferences. See the [Wispr Flow and superwhisper hotkey setup](/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac) if the app wants a different key.

That is the whole thing. Two settings, no restart, no scripts.

For a more thorough walk-through with permission diagnostics and every voice tool covered, the [Push-to-Talk Voice Typing on macOS pillar page](/docs/push-to-talk/push-to-talk-voice-typing-mac) has the full guide.

## Which Voice Tool Should You Point It At

That depends on how you write:

- **macOS Dictation** if you just want the built-in one that ships with the OS and is free.
- **superwhisper** if you want strong on-device transcription, macOS-native feel, and language support.
- **Wispr Flow** if you want the best transcription-to-typed-text pipeline for long-form.
- **Typeless** if you specifically want a hold-to-talk tool designed around the hold gesture.

The comparison lives in [Best Push-to-Talk Apps for Mac](/docs/push-to-talk/best-push-to-talk-app-mac). The nice property of this setup is that it does not marry you to one tool — the mouse button holds the Fn key, and whichever voice tool is listening for Fn will pick it up.

## Setup Tips That Save Debugging Later

- **Use a button you would not otherwise miss.** A side button that you barely used is ideal. A button you already use for Back/Forward is not — dictation will fight your muscle memory.
- **Test in a plain text field first.** Notes, TextEdit, a browser address bar. Skip the app-specific quirks until you have confirmed the hold gesture works at all.
- **If a tool offers "toggle" and "hold" modes, pick hold.** Otherwise the mouse button is doing one thing and the app is doing the other.
- **Do not double-map the button.** If Logi Options+ or another remapper is already binding the same button, one of them will lose. Uninstall or clear the conflicting binding.

## What It Actually Feels Like After a Week

The main change is not per-word speed. It is that dictation becomes ambient again. You read a message, hold the button, respond by voice, release, done. There is no context switch, no deciding "should I dictate this or type it." A tool you use casually is worth ten times a tool you have to psych yourself up to reach for.

## FAQ

### Does this work with macOS Dictation, or only paid apps?

Both. macOS Dictation uses the Globe/Fn key as its push-to-talk trigger, and the setup above holds that key while you press the mouse button. Paid apps that let you set a hotkey (Wispr Flow, superwhisper, Typeless) work identically.

### Do I need a Logitech mouse?

No. Any USB or Bluetooth mouse with a spare button works. Recognized Logitech models (MX Master series, MX Anywhere, G502 X, M720, and more) additionally get sensible default mappings, but nothing about push-to-talk requires Logitech hardware. See [Device Compatibility](/docs/mouse-plus/device-compatibility).

### What if my voice tool uses a different hotkey than Fn?

Use LinguaX's normal keyboard shortcut mapping instead of Modifier Hold, and set it to whatever key the app expects. The [Wispr Flow and superwhisper hotkey guide](/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac) covers both paths.

### Will it survive sleep/wake?

Yes. Bluetooth mice reconnect automatically after sleep, and LinguaX refreshes input services on wake so the mapped button keeps working without a relaunch.

### Is LinguaX free?

Free 30-day trial with no account. After that it is a **$9.9 one-time purchase** covering 3 devices — no subscription.

## Try It

If you already have a mouse with an unused side button, this is one of the highest-leverage 30-second setups on macOS.

**[Download LinguaX](/download)** and set up push-to-talk on your side button in about a minute.

## Related

- [Push-to-Talk Voice Typing on macOS with a Mouse Button (docs)](/docs/push-to-talk/push-to-talk-voice-typing-mac)
- [Trigger macOS Dictation with a Mouse Button](/docs/mouse-plus/recipes/macos-dictation-mouse-button)
- [Best Push-to-Talk Apps for Mac](/docs/push-to-talk/best-push-to-talk-app-mac)
- [Wispr Flow and superwhisper Hotkey Setup](/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac)
- [How to Map Mouse Side Buttons on macOS](/docs/mouse-plus/recipes/map-mouse-side-buttons-macos)
