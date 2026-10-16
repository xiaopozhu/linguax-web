# GEO Consistency Foundation Design

**Date:** 2026-10-16

## Objective

Improve LinguaX's reliability as a source for generative search systems by removing known factual and routing contradictions, then preventing the same contradictions from returning.

This phase intentionally avoids broader multilingual-indexing changes, schema redesign, pricing changes, and feature-support changes. Those require separate review because they affect indexing strategy or depend on product decisions.

## Scope

### Direct internal links

Replace the five remaining links to historical documentation routes in `src/pages/index.tsx`, `src/pages/download.tsx`, and `src/pages/pricing.tsx` with their current canonical destinations:

- `/docs/releases/changelog` becomes `/docs/reference/changelog`.
- `/docs/use-cases/auto-switch-input-source-app-domain-mac` becomes `/docs/input-source/auto-switch-input-source-app-domain-mac`.

The Worker redirects remain in place for external links and previously indexed URLs.

### Product-size consistency

Replace legacy `under 5MB` and `under-5MB` statements in published blog content with the current approximate size, `~10MB`, matching the homepage, installation documentation, and product facts used elsewhere on the site.

The wording must remain approximate because application package size can vary by release.

### Network and privacy consistency

Replace absolute statements such as `nothing leaves your Mac` when they describe the entire product. The approved distinction is:

- Core mouse enhancement and input-source switching run locally.
- AIx sends user-submitted text only when the user invokes an AI action.
- Downloads, updates, and license validation use network services.
- Configuration remains local except for documented optional synchronization behavior.

Existing statements that narrowly and accurately say there is no behavioral telemetry may remain. Statements that equate "no telemetry" with "nothing is ever sent" must be rewritten.

## Automated Guardrail

Create `scripts/check-geo-consistency.mjs` and expose it as `npm run test:geo-consistency`.

The checker scans published source content while excluding `docs/superpowers/` and generated output. It fails when it finds:

1. Internal source links using either historical route listed above.
2. The legacy size expressions `under 5MB` or `under-5MB`, case-insensitively.
3. Absolute offline claims known to conflict with the documented AIx and license flows, including `nothing leaves your Mac` and `nothing is sent anywhere`, case-insensitively.

Failure output identifies the file, line, matched rule, and offending text so the writer can correct the source directly.

The checker does not attempt general-purpose fact checking. Its rule list is deliberately limited to contradictions already verified in this repository.

## Testing

Implementation follows a red-green cycle:

1. Add a test fixture or test harness proving each prohibited pattern is detected and approved wording is accepted.
2. Run the test and observe failure before implementing the checker.
3. Implement the minimum checker behavior.
4. Run the checker against the repository before content cleanup and observe the known violations.
5. Correct the published source content and routes.
6. Run the checker, existing targeted tests, TypeScript checks, and the production build.

## Success Criteria

- No published source file contains the two historical internal routes.
- No published page claims LinguaX is under 5 MB.
- No published page makes either prohibited absolute offline claim.
- The new checker detects all prohibited patterns and reports actionable locations.
- `npm run test:geo-consistency`, `npm run typecheck`, and `npm run build` complete successfully.

## Deferred Work

- Suppressing or canonicalizing untranslated locale fallback pages.
- Generating a sitemap index for all publishable locales.
- Creating a machine-readable product-facts source.
- Rebuilding the Organization, Brand, WebSite, and SoftwareApplication entity graph.
- Adding page-level verification dates, testing provenance, and public compatibility datasets.
- Adding GEO citation and referral measurement.
