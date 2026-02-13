---
title: Common Issues
---

This page lists frequent LinguaX problems and the fastest recovery order.

## 1) Input Source Does Not Switch

Quick checks:

- LinguaX is running in menu bar.
- Rule is enabled.
- App/domain text matches exactly.

Fix steps:

1. Keep one rule for the failing context.
2. Remove overlaps.
3. Test by switching away and back.

## 2) Browser Domain Rule Does Not Trigger

Quick checks:

- Correct browser selected.
- Domain typed correctly.
- Rule is enabled.

Fix steps:

1. Recreate rule with exact domain.
2. Keep browser app default simple.
3. Retest with two clearly different domains.

## 3) Shortcut Script Action Fails

Quick checks:

- Shortcut is not captured by another app.
- Script action is mapped correctly.

Fix steps:

1. Run one built-in template first.
2. Approve macOS Automation prompt when shown.
3. Retry custom script.

## 4) Behavior Changed After Update

Quick checks:

- Restart LinguaX.
- Check release notes for migration notes.

Fix steps:

1. Wait for first-launch migration to finish.
2. Retest minimal rules.
3. Add rules back gradually.

## 5) Permission-Related Problems

Fix steps:

1. Re-enable missing permissions in macOS settings.
2. Relaunch LinguaX.
3. Test one app rule and one domain rule.

## Recommended Debug Order

1. App running state.
2. Permissions.
3. Exact app/domain match.
4. Rule overlap cleanup.
5. Minimal retest.

## Still Not Resolved?

- [Permissions on macOS](./permissions-on-macos.md)
- [Browser Domain Rules](../guides/browser-domain-rules.md)
- [Logs and Diagnostics](./logs-and-diagnostics.md)
