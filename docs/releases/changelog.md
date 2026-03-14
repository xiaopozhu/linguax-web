---
title: Changelog
description: Latest LinguaX release notes for macOS input switching and mouse enhancement updates.
keywords:
  - LinguaX changelog
  - LinguaX release notes
  - macOS mouse enhancement updates
  - smooth scrolling updates
  - input switching updates
---

This page tracks notable LinguaX app release notes, including input switching, mouse enhancement, smooth scrolling, and gesture updates.

## 2025.12.4300

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

- Fixed mouse button index issues.
- Fixed button mapping display issues.
- Fixed mapping registration when mouse connects/disconnects.
- Fixed input method switching.
- Fixed several issues around auto counter and system control actions.

### Notes

- This release includes a storage architecture migration; first launch may take longer for data migration.

## 2025.12.4260

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
