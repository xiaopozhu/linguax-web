# Gumroad Footer Link — Design

## Goal

Expose Gumroad as a low-priority fallback purchase route without competing with the primary Stripe checkout on LinguaX pricing surfaces.

## Design

- Keep the existing Stripe buttons and purchase flow unchanged.
- Add one external footer link labeled `Buy via Gumroad`.
- Link directly to `https://qijing.gumroad.com/l/linguax?wanted=true` so Gumroad opens the checkout flow immediately.
- Place the link after the legal links and before social/contact links, keeping it visible but visually secondary.
- Reuse the existing Docusaurus footer link rendering; do not add Gumroad JavaScript, custom styling, tracking, or backend changes.

## Verification

- Confirm the exact label and URL are present in `docusaurus.config.ts`.
- Run TypeScript checking.
- Build every configured locale and confirm the generated footer contains the Gumroad checkout URL.
