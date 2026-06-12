---
title: Shortcut and Hotkeys
---

LinguaX lets you trigger actions without leaving your current task. Triggers come from the keyboard or from a mapped mouse button, and each entry point exposes its own set of action types (the available actions differ between the keyboard editor and mouse mapping).

## What You Can Do

- trigger actions from a global keyboard shortcut or from a mapped mouse button
- automate common system and app operations
- reduce repetitive pointer navigation

## Action Types

LinguaX supports the following action types overall:

- **Switch Input Source** — switch to a specific input method
- **Open Application** — launch or activate an app
- **Paste Preset Text** — paste a saved text snippet
- **Media Control** — play/pause, next, previous, volume
- **System Setting** — built-in macOS operations (Mission Control, Launchpad, Dark Mode, screenshots, window operations, editing commands, Finder operations, and more)
- **Custom Script** — run an AppleScript (see below)
- **Keyboard Shortcut** — send a key combination
- **Modifier Hold** — hold the Fn (Globe) modifier while a mouse button is held

Different entry points expose different subsets:

- **Keyboard shortcut editor**: Open Application, Paste Text, Media Control, System Setting, Custom Script.
- **Mouse button mapping**: System Setting, Media Control, Keyboard Shortcut, Modifier Hold, Open Application.

Modifier Hold is mouse-only and uses **Fn (Globe)** as the modifier. It is the mechanism behind push-to-talk dictation.

## Custom Script (AppleScript only)

Custom Script actions run **AppleScript** locally via the system AppleScript engine. Shell commands are not run directly; if you need a shell command, invoke it indirectly from AppleScript with `do shell script`.

### Built-in Templates

LinguaX ships **three** built-in script templates as starting points:

- **Restart Dock** (`killall Dock`)
- **Copy Current Path**
- **Clear Pasteboard**

A risk-confirmation banner is shown before running custom scripts.

## Safety and Permissions

- scripts run locally on your Mac
- first run may request Automation permission for the apps a script controls (for example System Events or Finder)

## Conflict Handling

LinguaX warns when a keyboard shortcut conflicts with macOS or with an existing app-level shortcut.

## Setup Checklist

1. pick high-frequency actions first
2. avoid collisions with macOS and IDE shortcuts
3. test in your real workflow apps

## Related Docs

- [Button Mapping](../mouse-plus/button-mapping.md)
- [Setup for Developers](../workflows/setup-for-developers.md)
- [Setup for Designers](../workflows/setup-for-designers.md)
- [Push-to-Talk Voice Typing with a Mouse Button](../use-cases/push-to-talk-voice-typing-mac.md)
- [Permissions on macOS](../troubleshooting/permissions-on-macos.md)
