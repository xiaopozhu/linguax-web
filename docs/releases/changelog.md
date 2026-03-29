---
title: Changelog
description: Latest LinguaX release notes for macOS input switching and mouse enhancement updates.
image: /img/linguax-home.png
keywords:
  - LinguaX changelog
  - LinguaX release notes
  - macOS mouse enhancement updates
  - smooth scrolling updates
  - input switching updates
---

This page tracks notable LinguaX app release notes, including input switching, mouse enhancement, smooth scrolling, and gesture updates.

## 2025.12.4801

_Summary: Expanded system actions, clearer categorized picker UX, and completed multilingual action translations._

### New Features

- Expanded built-in system actions to cover window controls, editing, screenshot, navigation, and developer workflows.
- Added categorized action picker groups (System Features, Apps & Windows, Document Editing, Finder Actions, Screenshot & Recording, Tabs & Navigation, Developer).
- Added category/action icons in picker menus for faster scanning and selection.

### Improvements

- Improved action picker interaction and width behavior for better readability in the button panel.
- Moved Switch Space Left/Right into System Features for more accurate semantics.
- New Finder Window now opens Home by default.

### Localization

- Completed missing translations for system-action category and action labels across supported locales.

### Fixes

- Stabilized Copy File Path behavior by using the native Cmd+Option+C path.
- Stabilized Move to Trash behavior by using the native Cmd+Delete path.

## 2025.12.4701

_Summary: Multi-device stability, full BLE HID++ support, and per-app gesture override._

### New Features

- Added per-app gesture override: configure button behaviors for specific apps independently from global settings.
- Added full BLE HID++ support for Logitech wireless mice via Bluetooth, enabling complete gesture and button mapping.
- Added MX Anywhere 3S thumb-button (SM key) support.
- Added a "Clear model binding" button in device settings to reset device recognition easily.

### Improvements

- Improved multi-mouse stability: each mouse now has fully isolated button and gesture state, preventing cross-device conflicts.
- Tuned double-click detection to align with system settings for more natural trigger behavior.
- Bluetooth devices now recover automatically after sleep/wake without requiring manual reconnection.
- Reduced CPU usage by optimizing mouse-movement event handling in the background.

### Fixes

- Fixed gesture states conflicting between multiple simultaneously connected mice.
- Fixed BLE mouse thumb-button mapping failing in some scenarios.
- Fixed button mappings occasionally becoming inactive after switching apps.
- Fixed device configuration not fully taking effect after clearing settings.

## 2025.12.4614

_Summary: Full thumb-button gesture support, per-device pointer speed persistence, and a major HID runtime reliability pass._

### New Features

- Added full SM thumb-button gesture support with stronger mapping coverage for click, double-click, long-press, and swipe actions.
- Added per-device pointer speed persistence, so each mouse keeps its own speed profile.
- Added immediate pointer speed application through a lower-level system path, without app restart.

### Improvements

- Replaced timer-based SM polling with event-driven HID++ reads for lower latency and better efficiency.
- Split blocking HID++ reads out of the serial queue to improve runtime responsiveness under load.
- Added automatic CGEvent tap recovery on system timeout to reduce gesture detection dropouts.
- Improved lifecycle safety by always closing IOHIDManager to avoid long-run Mach port leaks.
- Tuned double-click detection windows for more reliable trigger behavior.

### Fixes

- Fixed virtual press state being interrupted by physical button input.
- Fixed intermittent gesture detection loss caused by timeout edge cases.
- Fixed MX Anywhere 2/2S/3 and MX Master 3S product ID/WPID normalization and mapping inconsistencies.
- Fixed M720 thumb button behavior to keep unsupported gestures from misfiring.

## 2025.12.4601

_Summary: Major reliability upgrade for sleep/wake recovery, HID stability, and unified input runtime._

### New Features

- Added per-axis reverse scroll controls, so horizontal and vertical scrolling can be configured independently.
- Added stronger recovery strategy: refresh permissions and critical service states on app activation and system wake.
- Expanded mouse model recognition and improved readability for rule page icons and dark mode.

### Improvements

- Reworked sleep/wake recovery flow to restore critical services and refresh permission state automatically.
- Optimized HID device enumeration using IOKit paths for more stable recognition and less enumeration jitter.
- Unified side buttons, long-press, and gesture semantics into one runtime engine.
- Unified keyboard recorder logic for special keys for more consistent recording and display.
- Enhanced diagnostics (real-time events and export flow) for troubleshooting; disabled by default.

### Fixes

- Fixed horizontal gesture mapping not following reverse-scroll settings correctly.
- Fixed occasional smooth scrolling failure after sleep/wake.
- Fixed unmapped mouse buttons still being intercepted.
- Fixed diagnostics center button layout, window sizing, and multilingual UI details.

### Notes

- This release includes an input module refactor. Diagnostics are intended for troubleshooting and remain disabled by default.

## 2025.12.4500

_Summary: Better Logitech and connectivity support, plus battery and shortcut action enhancements._

### New Features

- Added two shortcut actions: open Control Center and Notification Center.
- Added Bluetooth mouse battery level display.
- Added support for configuring more side buttons, with improved multilingual coverage.

### Improvements

- Improved Logitech MX Master 3S support: correct wheel mode switch key display and more accurate button recognition.
- Improved Bluetooth and receiver connectivity: faster device recognition, more accurate battery reporting, and better connection stability.
- Expanded automatic mouse model identification for more precise configuration.
- Added full thumb-button gesture support: single click, double click, swipe, and long press.
- Preserved default system mouse behavior when enhancement features are disabled.
- Improved isolation between multiple connected mice so device mappings do not interfere.

### Fixes

- Fixed incorrect left/right wheel tilt direction mapping.
- Fixed device count display on the home page.
- Fixed rule count display on the home page.

## 2025.12.4401

_Summary: Improved button configuration workflow with a new shortcut recorder and stronger mapping consistency._

### New Features

- Added a custom shortcut recorder that supports arbitrary key combinations, including system-reserved keys.
- Added grouped management for keyboard actions and mouse actions in button mapping.

### Improvements

- Refactored the button configuration panel to improve state synchronization when switching gestures.
- Improved mouse speed control using lower-level system APIs for immediate effect without restart.
- Corrected ML/MR wheel tilt direction mapping logic.
- Improved multilingual translations, including iCloud sync-related copy.

### Fixes

- Fixed gesture icon color display issues.
- Fixed action synchronization after switching button configuration.
- Fixed scroll mapping direction errors.
- Fixed multiple missing translation strings in UI.

## 2025.12.4300

_Summary: Expanded mouse mapping capabilities and completed a large storage/runtime performance refresh._

### New Features

- Extended mouse button support: added `MR/ML` (mouse right tilt/left tilt) mappings.
- Added in-app language setting switch.
- Added global smooth scrolling option.
- Improved Input Monitoring permission guidance.

### Improvements

- Upgraded storage architecture to CoreData for better performance and data safety.
- Refactored app state management for faster response.
- Improved keyboard and mouse configuration views.
- Improved multilingual translations.

### Fixes

- Fixed mouse button index and mapping display issues.
- Fixed mapping registration when mouse connects/disconnects.
- Fixed input method switching and several system-control-related edge cases.

### Notes

- This release includes a storage architecture migration; first launch may take longer for data migration.

## 2025.12.4260

_Summary: Introduced AppleScript shortcut actions and improved script UX and safety guidance._

### New Features

- Added custom script execution via keyboard shortcuts (AppleScript).
- Added 6 built-in script templates:
  - Toggle dark/light mode.
  - Toggle system mute.
  - Restart Dock.
  - Control Spotify playback.
  - Copy current Finder path.
  - Clear clipboard.
- Added security prompts and local execution safety guidance for scripts.

### Improvements

- Optimized shortcut list ordering (new actions shown on top).
- Added color icon indicators for different action types.
- Improved script editor UI.

### Notes

- Some scripts require macOS Automation permissions on first run (for System Events, Finder, etc.).

## Notes

- Use this page for concise, user-facing release notes.
- Prefer high-signal changes over internal implementation noise.
