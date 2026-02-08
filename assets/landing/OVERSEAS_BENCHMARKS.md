# LinguaX English Landing Benchmark Notes

This redesign follows proven patterns commonly seen on successful global developer-tool websites.

## Benchmarked product websites
- Linear: https://linear.app/
- Raycast: https://www.raycast.com/
- Notion Calendar (product landing): https://www.notion.com/product/calendar
- Notion pricing (clear plan decision structure): https://www.notion.so/pricing

## Patterns applied to LinguaX

### 1. Sharp single promise above the fold
Pattern: concise headline + one supporting sentence + immediate CTA.
Applied in `homepage.mdx` hero:
- Headline focuses on outcome: `Stop context switching. Keep your flow.`
- CTA starts with low-friction trial: `Download Free`.

### 2. Pain-first narrative before feature list
Pattern: top products frame user pain in plain language before technical detail.
Applied in `homepage.mdx`:
- Section `The daily pain LinguaX removes`.
- Each card maps to a specific workflow interruption.

### 3. Differentiation through product philosophy
Pattern: global products do not just list features; they explain product stance.
Applied in `homepage.mdx`:
- `Input + Mouse in one product`
- `App rules + Website rules`
- `One-time pricing, clear ROI`

### 4. Low cognitive-load onboarding
Pattern: short “how it works” step model to reduce adoption anxiety.
Applied in `homepage.mdx`:
- 3-step section (`Set rules -> Switch context -> Stay in flow`).

### 5. Pricing clarity and risk reduction
Pattern: pricing pages reduce uncertainty with direct plan comparison and decision framing.
Applied in `pricing.mdx`:
- `Free` vs `Pro ($9.9 one-time)` with table.
- `What you are paying for` focuses on outcomes, not only toggles.
- Repeated low-pressure CTA (`Start Free`).

### 6. Trust-oriented visual psychology
Pattern: confident but calm visual language often outperforms aggressive sales styling for productivity tools.
Applied in `landing.css`:
- Deep green primary for trust/control.
- Warm neutral background to reduce visual fatigue.
- Moderate contrast and clean spacing to communicate reliability.

## Conversion logic for overseas users
- Primary path: `Home -> Download Free -> In-product activation -> Upgrade`.
- Key persuasion levers:
  - friction removal (manual switching cost)
  - control and consistency (input + mouse)
  - financial predictability (one-time purchase)

## Optional next iteration
- Add customer proof block (logos/quotes) when available.
- Add short demo GIF section for Product Hunt and Reddit traffic.
- Add FAQPage schema to improve rich-result visibility.
