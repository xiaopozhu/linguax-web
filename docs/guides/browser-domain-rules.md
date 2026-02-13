---
title: Browser Domain Rules
---

Use domain rules when one browser needs different input behavior for different websites.

## Typical Cases

- docs sites in English
- internal tools in another language
- chat/community domains with different typing preference

## Before Setup

1. Confirm browser app rule baseline works.

## Setup Steps

1. Open LinguaX website/domain rules.
2. Select browser.
3. Add domain.
4. Set target input source.
5. Save and enable.

## Matching Tips

- use exact domains like `docs.example.com`
- avoid duplicate rules for the same domain
- keep browser app default simple and let domain rules refine it

## Verify

1. Open two configured domains in separate tabs.
2. Switch tabs and verify input behavior.
3. Leave browser and verify non-browser app rules still work.

## Troubleshooting

If a rule does not trigger:

- check domain spelling
- check rule enabled state
- remove overlapping broad rules
- restart browser and LinguaX

If still failing, see [Common Issues](../troubleshooting/common-issues.md).
