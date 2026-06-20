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

## 2025.12.4850

_Summary: Adjust your Logitech mouse's DPI and scroll-wheel mode right inside the app — no official driver needed — plus run Apple Shortcuts from mouse buttons and keyboard mappings, and a new option to hide the menu bar icon._

### New Features

- Adjust mouse DPI: set your Logitech mouse pointer speed (DPI) with a slider directly in the app, over both USB and Bluetooth, without installing the official driver.
- Toggle scroll-wheel mode: a new "Toggle Scroll Wheel Mode" action switches between free-spin and ratchet scrolling in one click (Logitech SmartShift).
- Run Apple Shortcuts: both mouse buttons and keyboard mappings can now run your Apple Shortcuts.
- Hide the menu bar icon: an option in Settings hides the top menu bar icon for a cleaner look; reopening the app restores it.

### Improvements

- Tidied up the action menu: "Open Application" now lives under the "Apps & Windows" submenu, and Shortcuts sits on its own at the end, making actions easier to find.
- More reliable Bluetooth capability detection: DPI and scroll-wheel probing now retries and resets on failure for steadier reads on Bluetooth mice.

### Fixes

- Fixed Logitech M720 and similar devices being ignored — composite Bluetooth devices that declare both mouse and keyboard are now recognized correctly.
- Fixed already-bound combos getting disabled during recording — keyboard triggers are no longer permanently turned off while recording a mouse shortcut.
- Fixed flicker and stutter in the Shortcuts picker for a smoother, more stable list.
- Fixed several scroll-wheel mode toggle glitches around rapid double-clicks and reconnects.

## 2025.12.4845

_Summary: A big upgrade to mouse-button keyboard shortcuts — record richer combos (including ones that were previously impossible), plus a new Open Application action and Logitech Lift support._

### New Features

- Mouse buttons can now record Fn-based combos, such as Fn + Space.
- Mouse buttons can be set to send a single modifier key (like Fn) with a quick press.
- Added an "Open Application" action to launch a chosen app from a mouse button.
- Added Logitech Lift support.

### Improvements

- You can now record shortcuts that are already in use. Even if a combo such as ⌘⇧V is already bound to another shortcut, recording it for a mouse button now works correctly instead of capturing only the modifiers.
- Clearer shortcut display: a standalone modifier now shows as an icon plus label.
- Redesigned the device Diagnostics Center with a cleaner layout and one-tap diagnostics export, making device issues easier to investigate and report.

### Fixes

- Fixed the battery indicator flickering between green and red on some Logitech devices.
- Fixed the Stage Manager action not running.
- Removed non-functional checkmarks from some menu items to avoid confusion.
- Fixed repeated clicks opening multiple app-picker panels.

## 2025.12.4834

_Summary: New side-button swipe and modifier-hold gestures, fluid Space switching, and more reliable licensing across system upgrades and iCloud changes._

### New Features

- Added swipe trigger modes for side-button drags, so dragging a side button up/down/left/right can trigger different actions, with a clear on-screen mode indicator.
- Added a modifier-hold mouse gesture that triggers an action while a modifier is held — ideal for push-to-talk voice input tools like Typeless, where the action stops as soon as you release.
- Added fluid, trackpad-like Space switching for smoother desktop transitions with your mouse.

### Improvements

- Redesigned device licensing so activation stays valid after macOS upgrades, iCloud account changes, or device migration.
- Improved horizontal scrolling reverse and compatibility for more consistent behavior across apps.
- The running-apps list now refreshes automatically when apps launch or quit, making per-app setup easier.
- Optimized settings UI rendering for smoother scrolling in the app scope switcher.

### Fixes

- Fixed cases where smooth scrolling could stop working.
- Fixed app-specific overrides that could swallow events in other apps.
- Fixed horizontal-scroll button ID parsing in app override configurations.

## 2025.12.4816

_Summary: Per-app smooth scrolling, steadier mouse gestures, and improved side-button/device recognition._

### New Features

- Added per-app smooth scrolling controls so each app can have a scrolling behavior that fits how you use it.
- Added Logitech G502 X recognition for more accurate model detection and setup.

### Improvements

- Improved mouse gesture timing so drag and swipe actions feel more predictable during daily use.
- Improved automatic side-button mapping for recognized mice, reducing manual setup after detection.
- Refined mouse enhancement controls and improved About page icon appearance in dark mode.

### Fixes

- Fixed thumb-button and wheel-tilt setup issues affecting some mouse models, including MX Master 3.
- Fixed smooth scrolling edge cases so scroll distance remains more natural when smoothing is disabled or bypassed.
- Fixed gesture coordination issues that could make complex mouse actions trigger inconsistently.

## 2025.12.4811

_Summary: Clearer media-control organization, broader key-trigger coverage, and stronger mouse compatibility._

### New Features

- Added a dedicated Media Control category so playback and volume actions are easier to find and configure.

### Improvements

- Reorganized system-setting action types into clearer groups for faster action selection.
- Expanded keyboard trigger support with more navigation and consumer/media keys.
- Unified media-control icon semantics to improve recognizability across menus.

### Fixes

- Improved button recognition and mapping stability for devices like MX Master 2S and M585.
- Fixed inconsistent default selection behavior in system-setting menus.

## 2025.12.4805

_Summary: Better shortcut recording flexibility and clearer wheel-tilt localization across languages._

### Improvements

- Allowed plain key bindings in the mouse shortcut recorder, so single-key triggers can be recorded directly.
- Improved localization for wheel tilt left/right labels to make direction semantics clearer in multilingual UI.

## 2025.12.4803

_Summary: Stability-focused update for smoother long-running use and a better reopen experience._

### Improvements

- Improved long-session stability for smoother daily use.
- Improved responsiveness during frequent mouse interactions.
- Improved overall runtime consistency for extended sessions.

### Fixes

- Fixed an issue where memory usage could keep rising in some long-running scenarios.
- Fixed an occasional issue where reopening from Dock did not show the status window.

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
