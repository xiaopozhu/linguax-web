# Product Facts and Entity Graph Design

**Date:** 2026-10-16

## Objective

Create one machine-readable source for LinguaX's public product facts, use it to generate AI-discovery artifacts, and replace the current disconnected JSON-LD scripts with a stable entity graph that survives the production build.

This phase addresses product-fact drift and entity identification. It does not change visible page design, pricing, download behavior, or multilingual fallback indexing.

## Current Problems

The existing `StructuredData` component declares separate `SoftwareApplication`, `WebSite`, and `Organization` scripts. In the production HTML, Docusaurus/React Head keeps only the `SoftwareApplication` script on the homepage, so the website and organization entities are absent. The surviving schema also reports `softwareVersion` as `2026`, while the current changelog version is `2025.12.6016`.

Pricing and download pages emit separate application, breadcrumb, and FAQ schemas, but the schemas do not share stable identifiers. Product facts are repeated across React code, `llms.txt`, documentation, and changelog content, which makes future contradictions likely.

## Architecture

Use this one-way data flow:

```text
data/public-product-facts.json
        ├──→ static/product-facts.json
        ├──→ static/llms.txt product-facts section
        └──→ React JSON-LD @graph
```

`data/public-product-facts.json` is the editable machine source. It contains only public facts used for discovery and structured data. `PRODUCT_FACTS.md` remains the broader human-readable product reference required by repository policy, and automated checks keep overlapping public fields consistent.

`static/product-facts.json` is a generated public artifact served as `https://linguax.app/product-facts.json`. It is committed so drift can be detected in review, but it must never be edited directly.

`static/llms.txt` remains a useful curated guide. Its canonical product-facts section is generated from the source data, while the curated documentation and external-reference lists remain human maintained outside generated markers.

## Public Fact Model

The fact source contains:

- Schema version and last verification date.
- Product name, canonical URL, description, category, current release version, and release date.
- Publisher name, canonical identity URL, logo, contact email, and public social profiles.
- Supported operating system, minimum macOS version, and processor architectures.
- Trial duration, purchase price, currency, payment model, and device count.
- Public feature list and documented compatibility boundaries.
- Local-processing, AIx transfer, update, download, license-validation, and optional iCloud-sync boundaries.
- Canonical URLs for download, pricing, changelog, documentation, privacy, terms, and AIx terms.

The public artifact excludes credentials, internal service URLs, customer data, unreleased features, private analytics, and internal commercial plans.

## Entity Graph

Each core page emits one JSON-LD script containing one `@graph`. Stable identifiers connect the graph:

- `https://linguax.app/#organization`: `Organization`, named Ermulin Studio.
- `https://linguax.app/#website`: `WebSite`, published by the organization.
- `https://linguax.app/#software`: `SoftwareApplication`, published by the organization and populated from public facts.
- `<current-page-url>#webpage`: `WebPage`, connected to the website and the software.
- Non-home pages include a `BreadcrumbList` connected to the current page.

The `SoftwareApplication` entity contains the current release version, macOS requirements, public feature list, canonical download URL, and trial and lifetime offers. It does not use a calendar year as a version.

The page URL and language are resolved from the active Docusaurus locale. Localized pages therefore emit their actual localized URL instead of silently pointing at the English page. This corrects structured data only; it does not change indexing behavior for untranslated fallback pages.

Existing page-specific FAQ, HowTo, model, and tool schemas remain. Where they refer to LinguaX or its publisher, they use the same stable `@id` values instead of creating conflicting core entities.

## Generation and Validation

Add three dependency-free Node.js responsibilities:

### Artifact generation

`scripts/generate-product-artifacts.mjs` validates and reads the internal source, writes a normalized `static/product-facts.json`, and replaces only the marked generated section of `static/llms.txt`. The generator produces deterministic output.

### Fact consistency checks

`scripts/check-product-facts.mjs` verifies required fields, URL and date formats, numeric pricing fields, privacy-boundary fields, and generated-artifact freshness. It confirms that the first release heading in `docs/reference/changelog.md` matches the current version in the fact source and checks selected overlapping public facts in `PRODUCT_FACTS.md`.

### Built-schema checks

`scripts/check-structured-data.mjs` scans production HTML, parses every JSON-LD script, and verifies:

- Homepage, pricing, and download pages contain the complete core graph.
- Required stable identifiers exist exactly once per graph.
- Entity references resolve to identifiers in the same graph or to intentional page-specific schemas.
- Page URLs and languages match the built locale path.
- The software version and public offers match the fact source.
- All existing FAQ, HowTo, model, and tool JSON-LD remains valid JSON.

The checks inspect final HTML, not only React source, so Head deduplication or build-time schema loss is caught.

## Build Integration

The production path is:

```text
validate facts
→ generate public artifacts
→ typecheck and Docusaurus build
→ validate built JSON-LD
```

Package scripts expose generation, fact checking, and structured-data checking separately, plus one aggregate GEO entity command. Generated files are refreshed before production builds. A check mode fails when committed artifacts are stale so local and CI builds cannot silently publish mismatched facts.

Development startup generates the public artifacts before launching Docusaurus, ensuring `/product-facts.json` and `llms.txt` match the current source during local work.

## Error Handling

Generation fails with an actionable field path when a required value is missing or invalid. Consistency failures identify the source file, expected value, and observed value. Built-schema failures identify the HTML file, script index, entity identifier, and broken constraint.

The generator writes only after all input validation succeeds. A failed validation must not partially update public artifacts.

## Testing

Implementation follows a red-green cycle:

1. Add fixture tests proving invalid or incomplete facts fail.
2. Add tests proving deterministic public JSON and `llms.txt` generation.
3. Add component tests or source-level assertions for stable identifiers and locale-aware URLs.
4. Build the site and assert the final homepage contains Organization, WebSite, SoftwareApplication, and WebPage in one graph.
5. Assert pricing and download pages reference the same core entities and retain their FAQ and breadcrumb data.
6. Parse every generated JSON-LD script across all built locales.
7. Run the existing GEO checker, content checks, TypeScript check, redirect tests, and production build.

## Success Criteria

- `https://linguax.app/product-facts.json` is generated from the internal fact source and contains only approved public fields.
- `llms.txt`, JSON-LD, changelog version, and public facts agree on the current release and commercial facts.
- Homepage production HTML contains a connected core graph and no longer loses Organization or WebSite.
- Pricing and download pages reference the same LinguaX and Ermulin Studio identifiers.
- Localized page schemas use localized page URLs.
- Every JSON-LD block in the complete production build parses successfully.
- Automated checks fail on stale artifacts, version drift, entity loss, invalid references, or malformed JSON-LD.
- There are no visible layout, pricing, download, or multilingual-indexing changes.

## Deferred Work

- Multilingual fallback `noindex`, canonical, hreflang, and sitemap governance.
- Generating ordinary prose pages from the fact source.
- Submitting entities to Google, Bing, or third-party knowledge platforms.
- Dependency-vulnerability remediation.
