# Gumroad Footer Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a secondary `Buy via Gumroad` checkout link to the global LinguaX footer while preserving Stripe as the primary purchase flow.

**Architecture:** Extend the existing Docusaurus `themeConfig.footer.links` array with one external link. The custom Footer already renders every configured item, so no component, style, payment API, or backend changes are needed.

**Tech Stack:** Docusaurus 3, TypeScript, React 19

---

### Task 1: Add and verify the Gumroad footer link

**Files:**
- Modify: `docusaurus.config.ts:261`

- [ ] **Step 1: Verify the desired footer link is absent**

Run:

```bash
rtk rg -F 'https://qijing.gumroad.com/l/linguax?wanted=true' docusaurus.config.ts
```

Expected: exit status 1 with no match, proving the new configuration is absent.

- [ ] **Step 2: Add the minimal footer configuration**

Insert after the Privacy Policy item:

```ts
{
  label: "Buy via Gumroad",
  href: "https://qijing.gumroad.com/l/linguax?wanted=true",
},
```

- [ ] **Step 3: Verify the exact label and checkout URL**

Run:

```bash
rtk rg -n -F 'Buy via Gumroad' docusaurus.config.ts
rtk rg -n -F 'https://qijing.gumroad.com/l/linguax?wanted=true' docusaurus.config.ts
```

Expected: both commands return the new footer item.

- [ ] **Step 4: Verify types and production output**

Run:

```bash
rtk npm run typecheck
rtk npm run build
for page in \
  build/index.html \
  build/zh-Hans/index.html \
  build/zh-Hant/index.html \
  build/ja/index.html \
  build/ko/index.html \
  build/de/index.html \
  build/fr/index.html \
  build/ru/index.html \
  build/id/index.html; do
  url_count=$(rtk rg -o -F 'https://qijing.gumroad.com/l/linguax?wanted=true' "$page" | rtk proxy wc -l | rtk proxy tr -d ' ')
  label_count=$(rtk rg -o -F 'Buy via Gumroad' "$page" | rtk proxy wc -l | rtk proxy tr -d ' ')
  if [ "$url_count" -ne 1 ] || [ "$label_count" -ne 1 ]; then
    printf 'FAIL %s: URL=%s label=%s\n' "$page" "$url_count" "$label_count"
    exit 1
  fi
  printf 'PASS %s: URL=%s label=%s\n' "$page" "$url_count" "$label_count"
done
```

Expected: typecheck and all nine locale builds exit 0; every generated locale homepage reports `URL=1 label=1`, proving it contains exactly one complete Gumroad checkout link.

- [ ] **Step 5: Review and commit the scoped change**

Run:

```bash
rtk git diff --check
rtk proxy git diff -- docusaurus.config.ts docs/superpowers/specs/2026-08-16-gumroad-footer-link-design.md docs/superpowers/plans/2026-08-16-gumroad-footer-link.md
rtk git add docusaurus.config.ts docs/superpowers/specs/2026-08-16-gumroad-footer-link-design.md docs/superpowers/plans/2026-08-16-gumroad-footer-link.md
rtk git diff --cached --name-only
rtk git commit -m "feat: add Gumroad footer purchase link"
```

Expected: no whitespace errors, the staged-file check lists exactly these three paths, and the commit succeeds:

```text
docs/superpowers/plans/2026-08-16-gumroad-footer-link.md
docs/superpowers/specs/2026-08-16-gumroad-footer-link-design.md
docusaurus.config.ts
```
