---
title: Multilingual Workflow
---

This guide helps you build a stable bilingual or multilingual LinguaX setup.

## Baseline Setup

1. Define one default input behavior per high-frequency app.
2. Add domain rules for websites that need different language behavior.
3. Validate switching in your real daily order.

## Practical Mapping Pattern

- IDE and terminal: coding language/input source
- chat apps: communication language
- docs/search/admin sites: domain-specific language behavior

## Scale Safely

- add one rule at a time
- verify after each change
- remove rules that no longer match real usage

## Typical Mistakes

- too many overlapping rules
- broad browser defaults without domain refinement
- skipping validation after changes

## Weekly Health Check

1. Review top 10 active rules.
2. Remove stale domains.
3. Re-test two app transitions and two domain transitions.

## Related Docs

- [Input Source Auto Switch](../features/input-source-auto-switch.md)
- [Browser Domain Rules](./browser-domain-rules.md)
- [Profiles and Priority](../core-concepts/profiles-and-priority.md)
