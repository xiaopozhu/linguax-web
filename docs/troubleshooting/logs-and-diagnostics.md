---
title: Logs and Diagnostics
---

Good diagnostics significantly reduce support turnaround time.

## How to Enable Diagnostics in Release Build

### Session Unlock from Settings

1. Open LinguaX and go to the `Settings` page.
2. Click the app logo at least **3 times within 2 seconds**.
3. When the wrench badge appears on the logo, diagnostics is enabled for the current session.
4. Go to the mouse or keyboard page, click the orange finger icon (`Diagnostics Center`), export diagnostics, and send it to support.

Notes:

- This session unlock is **temporary** and resets after app restart.
- No terminal command is required.
- The old terminal toggle method is deprecated and may not work reliably on newer macOS environments.

<!-- Comparison image placeholders -->
<img src="/img/linguax-diagnostics-before.png" alt="Before update (placeholder)" width="256" />
<img src="/img/linguax-diagnostics-after.png" alt="After update (placeholder)" width="256" />

## What to Collect

- LinguaX version
- macOS version
- affected app/browser name
- affected domain (if website rule related)
- issue timestamp
- exact expected behavior vs actual behavior
- concise reproduction steps

## Reproduction Template

1. Open `<app or website>`.
2. Switch from `<context A>` to `<context B>`.
3. Actual: `<what happened>`.
4. Expected: `<what should happen>`.

## Rule Snapshot Checklist

Before escalation, record:

- the app rule expected to trigger
- the domain rule expected to trigger (if any)
- any broad or overlapping rules

## Evidence to Attach

- screenshot of relevant rule settings
- short screen recording
- exact in-app error text

Avoid sharing sensitive personal data.

## Minimal Validation Before Contacting Support

1. Restart LinguaX.
2. Test one simplified rule.
3. Re-test original scenario.

If issue persists, send the collected diagnostics.

## Feedback Reward Policy

If your feedback is accepted and shipped, LinguaX will grant a 1-year license.

## Related Docs

- [Common Issues](./common-issues.md)
- [Permissions on macOS](./permissions-on-macos.md)
- [Conflict with Other IME Tools](./conflict-with-other-ime-tools.md)
