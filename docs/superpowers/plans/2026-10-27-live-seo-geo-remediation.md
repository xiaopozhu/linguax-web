# Live SEO and GEO remediation

> Execute the approved audit fixes in this session. Use independent agents for content and infrastructure, then request a final code review.

**Goal:** Correct every actionable finding in the 2026-10-27 production audit, deploy the verified build, and repeat the production checks.

**Architecture:** Retain Docusaurus static rendering and real translations. Generate a route/locale availability manifest from content sources, use it in the shared site metadata and sitemap filtering, and consolidate untranslated fallback pages to their English canonical. Keep product facts generated from the existing JSON source. Use Cloudflare permanent redirects for host normalization.

## 1. Content and product facts

- [ ] Check the current release against the appcast/source before updating `data/public-product-facts.json`; regenerate `static/product-facts.json` and `static/llms.txt`.
- [ ] Correct the download FAQ network statement in every locale. Review remaining outdated size/model/privacy claims against `PRODUCT_FACTS.md` and the public facts.
- [ ] Correct blog/terms metadata in every locale and the Indonesian plural override that leaks into English fallback metadata. Keep all built titles within the repository's 60-character check.
- [ ] Run `rtk npm run check:product-facts`, `rtk npm run test:geo-consistency`, and applicable existing tests.

## 2. Locale indexing and discovery

- [ ] Add a regression fixture with English documents, a real translated document, and an untranslated locale. Verify that missing translations are excluded from alternate languages and localized sitemaps, while translated documents keep their canonical URLs.
- [ ] Generate locale route availability from real content sources, treating identical English copies as fallback. Integrate it into `SiteMetadata`, preserving framework metadata, and filter sitemap items consistently.
- [ ] Give fallback content the English canonical without contradictory noindex directives. Retain a route for existing links and visitor navigation.
- [ ] Declare all nine locale sitemaps in `robots.txt`; provide descriptions and distinct pagination titles for author/tag/blog list pages, and a visible list-page heading.
- [ ] Run the regression tests and validate built canonical/hreflang/sitemap consistency across all locales.

## 3. HTTP routing

- [ ] Add a regression test for www-to-apex redirects preserving path/query, old-route redirects, missing pages, and static asset handling.
- [ ] Normalize `www.linguax.app` to `linguax.app` with a permanent redirect and configure the www Worker route. Explicitly bind static assets and run Worker routing before asset serving for host normalization.
- [ ] Run Worker regression checks and existing redirect checks against the production build.

## 4. Release verification

- [ ] Run `rtk npm run typecheck`, `rtk npm run build`, product/GEO/structured-data checks, title auditing, and redirect checks. Resolve all failures before deployment.
- [ ] Start the dev server and smoke-test changed routes and language switching. Request an independent review and address material findings.
- [ ] Commit and push the verified changes to `origin/master` to trigger the existing Git deployment (confirmed by user); no manual Wrangler login/deployment.
- [ ] Repeat online checks: product facts 200, connected JSON-LD/version, llms facts, privacy answer, language canonical/hreflang, all locale sitemaps, www/legacy/removed/missing paths, and crawler User-Agents.
- [ ] Report the deployed version and any measurement limits (Search Console/AI citation metrics require account data).
