---
title: Conflict with Other IME Tools
---

Running multiple input automation tools can cause conflicting behavior.

## Common Symptoms

- input source flips unexpectedly
- rules feel delayed or inconsistent
- behavior differs by app without clear logic

## Isolation Test

1. Quit other IME/automation tools.
2. Keep only LinguaX running.
3. Test one app rule and one browser domain rule.

If behavior stabilizes, a tool conflict is likely.

## Mitigation Strategy

- choose one tool as the source of truth for input switching
- disable overlapping automation in other tools
- avoid duplicate rules across tools

## Recovery Sequence

1. Simplify LinguaX to a minimal baseline.
2. Confirm baseline stability.
3. Re-enable other tools one by one.
4. Stop when conflict reappears and narrow that tool's scope.

## Related Docs

- [Common Issues](./common-issues.md)
- [Permissions on macOS](./permissions-on-macos.md)
