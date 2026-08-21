# SEO Title Length Design

## Goal

Eliminate every current `Title too long` finding and prevent regressions by keeping each rendered HTML `<title>` at 60 Unicode characters or fewer, including the Docusaurus brand suffix.

## Scope

- Shorten the affected landing-page, tool-page, documentation, and blog titles while preserving each page's primary search intent.
- Synchronize every affected `i18n/*/code.json` title message.
- Avoid rendering a redundant ` | LinguaX` suffix when the page title already contains the LinguaX brand.
- Add a repeatable audit command for the generated multilingual HTML.
- Do not change descriptions, URLs, canonical links, page structure, or unrelated copy.

## Title Strategy

Rendered titles must be concise enough for search-result presentation while remaining descriptive. English source titles should generally leave room for the ten-character ` | LinguaX` suffix. Titles that already contain `LinguaX` retain the brand in the page title and skip the suffix.

The title formatter will only deduplicate the brand. It will not truncate text at runtime because mechanical truncation can remove important keywords or produce broken punctuation.

Documentation and blog front matter remains the source of both the page heading and metadata title. These visible headings may become shorter, but their search intent and subject must remain unchanged.

## Components

### Title formatter

Add a local `@theme/ThemeProvider/TitleFormatter` override. It delegates to Docusaurus's default formatter unless the supplied page title already contains `LinguaX`; in that case it returns the trimmed page title without another suffix.

### Content titles

Update the 32 affected base routes identified by the stricter 60-character production-build audit:

- Ten blog routes.
- Sixteen documentation routes.
- The home, download, and pricing pages.
- The mouse compatibility, scroll test, and Logitech receiver pairing tools.

Localized page, tool, blog, and documentation titles are updated in all nine locale sources where necessary. Untranslated blog and documentation routes inherit the shortened English source title.

### Build-output audit

Add `scripts/audit-seo-titles.mjs` and expose it as `npm run audit:titles`. The script recursively reads `build/**/*.html`, decodes each `<title>`, counts Unicode code points, and reports every title longer than 60 characters with its file path and title. It exits nonzero when violations exist and prints a concise success summary otherwise.

The audit treats malformed generated pages as errors: an HTML file without a `<title>` is reported instead of silently skipped. This keeps the command useful as a CI-ready regression check.

## Verification

Implementation follows a red-green sequence:

1. Add the audit script and package command.
2. Run it against the current build and verify that it fails with the existing long-title findings.
3. Apply formatter, source-title, and translation changes.
4. Rebuild all nine locales.
5. Verify that `npm run audit:titles`, `npm run typecheck`, and `npm run build` all succeed.
6. Confirm the final build contains zero titles longer than 60 characters and that the Git worktree contains only intended changes.

## Success Criteria

- Every generated HTML title is 60 Unicode characters or fewer.
- No title contains a redundant `LinguaX ... | LinguaX` brand repetition.
- All affected translations remain valid JSON and use the same message keys.
- Type checking and the complete multilingual production build pass.
- Future title regressions are detectable with one documented npm command.
