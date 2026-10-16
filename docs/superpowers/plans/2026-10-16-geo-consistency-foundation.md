# GEO Consistency Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove verified GEO-facing routing and product-copy contradictions and add a regression checker that prevents them from returning.

**Architecture:** Add a small dependency-free Node.js scanner with an exported API and CLI entry point. A `node:test` suite exercises the scanner against temporary fixture trees, while the CLI scans only published source roots and deliberately excludes internal planning documents. Content and route corrections are separate tasks so each change can be verified independently.

**Tech Stack:** Node.js ESM, built-in `node:test`, Docusaurus 3, React 19, TypeScript

---

## File Map

- Create `scripts/check-geo-consistency.mjs`: rule definitions, recursive published-source scan, actionable diagnostics, and CLI exit status.
- Create `scripts/test-geo-consistency.mjs`: temporary-fixture tests for accepted copy, every prohibited pattern, line reporting, and internal-doc exclusion.
- Modify `package.json`: add the `test:geo-consistency` command.
- Modify `src/pages/index.tsx`: replace historical changelog and input-automation links.
- Modify `src/pages/download.tsx`: replace historical changelog and input-automation links.
- Modify `src/pages/pricing.tsx`: replace the historical input-automation link.
- Modify `blog/2025-06-18-introducing-linguax.md`: update stale size wording and qualify the absolute network claim.
- Modify `blog/2025-06-25-ultimate-guide-macos-input-method-switching.md`: update stale size wording and qualify the absolute network claim.
- Modify `blog/2025-07-02-best-input-method-switcher-developers.md`: update stale size wording.
- Modify `blog/2025-07-09-linguax-vs-input-source-pro.md`: update stale size wording.
- Modify `blog/2025-07-16-top-macos-productivity-tools-multilingual.md`: update stale size wording.
- Modify `docs/mouse-plus/overview.md`: qualify the absolute network claim.

### Task 1: Add the GEO consistency checker with tests

**Files:**
- Create: `scripts/test-geo-consistency.mjs`
- Create: `scripts/check-geo-consistency.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test**

Create `scripts/test-geo-consistency.mjs` with tests that invoke the checker CLI against temporary roots:

```js
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import test from 'node:test';

const checker = path.resolve('scripts/check-geo-consistency.mjs');

async function fixture(files) {
  const root = await mkdtemp(path.join(tmpdir(), 'linguax-geo-'));
  for (const [relativePath, content] of Object.entries(files)) {
    const target = path.join(root, relativePath);
    await mkdir(path.dirname(target), {recursive: true});
    await writeFile(target, content, 'utf8');
  }
  return root;
}

function run(root) {
  return spawnSync(process.execPath, [checker, '--root', root], {encoding: 'utf8'});
}

test('accepts approved local-processing wording', async () => {
  const root = await fixture({
    'docs/privacy.md': 'Core mouse behavior runs locally. AIx uses network services when invoked.\n',
  });
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
});

test('reports every prohibited GEO consistency pattern with file and line', async () => {
  const root = await fixture({
    'src/page.tsx': "const href = '/docs/releases/changelog';\n",
    'blog/post.md': 'It is under 5MB.\nNothing leaves your Mac.\n',
    'i18n/en.json': '{"copy":"nothing is sent anywhere"}\n',
  });
  const result = run(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /src\/page\.tsx:1.*legacy-route/);
  assert.match(result.stderr, /blog\/post\.md:1.*legacy-size/);
  assert.match(result.stderr, /blog\/post\.md:2.*absolute-offline-claim/);
  assert.match(result.stderr, /i18n\/en\.json:1.*absolute-offline-claim/);
});

test('ignores internal planning documents', async () => {
  const root = await fixture({
    'docs/superpowers/specs/example.md': 'under-5MB and nothing leaves your Mac\n',
  });
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
rtk node --test scripts/test-geo-consistency.mjs
```

Expected: FAIL because `scripts/check-geo-consistency.mjs` does not exist and the clean fixture cannot exit successfully.

- [ ] **Step 3: Implement the minimum checker**

Create `scripts/check-geo-consistency.mjs` with:

```js
#!/usr/bin/env node
import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const PUBLISHED_ROOTS = ['src', 'docs', 'blog', 'static', 'i18n'];
const PUBLISHED_EXTENSIONS = new Set(['.md', '.mdx', '.ts', '.tsx', '.json', '.txt']);
const RULES = [
  {
    id: 'legacy-route',
    pattern: /\/docs\/(?:releases\/changelog|use-cases\/auto-switch-input-source-app-domain-mac)/gi,
  },
  {id: 'legacy-size', pattern: /\bunder[- ]5\s*MB\b/gi},
  {
    id: 'absolute-offline-claim',
    pattern: /\b(?:nothing leaves your Mac|nothing is sent anywhere)\b/gi,
  },
];

function parseRoot(argv) {
  const index = argv.indexOf('--root');
  return path.resolve(index >= 0 ? argv[index + 1] : '.');
}

function isExcluded(relativePath) {
  return relativePath === 'docs/superpowers' || relativePath.startsWith('docs/superpowers/');
}

async function collectFiles(root, relativeDirectory) {
  const directory = path.join(root, relativeDirectory);
  let entries;
  try {
    entries = await readdir(directory, {withFileTypes: true});
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    if (isExcluded(relativePath)) continue;
    if (entry.isDirectory()) {
      files.push(...await collectFiles(root, relativePath));
    } else if (PUBLISHED_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(relativePath);
    }
  }
  return files;
}

export async function scan(root) {
  const violations = [];
  for (const sourceRoot of PUBLISHED_ROOTS) {
    for (const relativePath of await collectFiles(root, sourceRoot)) {
      const lines = (await readFile(path.join(root, relativePath), 'utf8')).split('\n');
      lines.forEach((line, lineIndex) => {
        for (const rule of RULES) {
          rule.pattern.lastIndex = 0;
          if (rule.pattern.test(line)) {
            violations.push({relativePath, line: lineIndex + 1, rule: rule.id, text: line.trim()});
          }
        }
      });
    }
  }
  return violations;
}

async function main() {
  const root = parseRoot(process.argv.slice(2));
  const violations = await scan(root);
  if (violations.length === 0) {
    console.log('[geo-consistency] no known contradictions found');
    return;
  }
  for (const violation of violations) {
    console.error(`${violation.relativePath}:${violation.line} [${violation.rule}] ${violation.text}`);
  }
  process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
```

Add this package script:

```json
"test:geo-consistency": "node --test scripts/test-geo-consistency.mjs && node scripts/check-geo-consistency.mjs"
```

- [ ] **Step 4: Run fixture tests and verify they pass**

Run:

```bash
rtk node --test scripts/test-geo-consistency.mjs
```

Expected: 3 tests pass, 0 fail.

- [ ] **Step 5: Run the repository scan and verify it finds the known violations**

Run:

```bash
rtk node scripts/check-geo-consistency.mjs
```

Expected: exit 1 with historical route, legacy size, and absolute offline claim diagnostics.

### Task 2: Replace internal links to historical routes

**Files:**
- Modify: `src/pages/index.tsx`
- Modify: `src/pages/download.tsx`
- Modify: `src/pages/pricing.tsx`

- [ ] **Step 1: Replace the five historical links**

Use the following exact canonical destinations:

```ts
const changelogUrl = useBaseUrl('/docs/reference/changelog');
const inputAutomationGuideUrl = useBaseUrl('/docs/input-source/auto-switch-input-source-app-domain-mac');
```

- [ ] **Step 2: Verify no published source uses the historical routes**

Run:

```bash
rtk rg -n "/docs/(releases/changelog|use-cases/auto-switch-input-source-app-domain-mac)" src docs blog static i18n
```

Expected: no matches.

- [ ] **Step 3: Verify external compatibility redirects remain covered**

Run:

```bash
rtk npm run test:redirects
```

Expected: redirect tests pass; the Worker keeps accepting old external URLs.

### Task 3: Correct stale size and absolute offline copy

**Files:**
- Modify: `blog/2025-06-18-introducing-linguax.md`
- Modify: `blog/2025-06-25-ultimate-guide-macos-input-method-switching.md`
- Modify: `blog/2025-07-02-best-input-method-switcher-developers.md`
- Modify: `blog/2025-07-09-linguax-vs-input-source-pro.md`
- Modify: `blog/2025-07-16-top-macos-productivity-tools-multilingual.md`
- Modify: `docs/mouse-plus/overview.md`

- [ ] **Step 1: Enumerate the exact remaining violations**

Run:

```bash
rtk node scripts/check-geo-consistency.mjs
```

Expected: only `legacy-size` and `absolute-offline-claim` diagnostics remain.

- [ ] **Step 2: Replace legacy size wording**

Apply these transformations while preserving surrounding prose:

```text
under 5MB  -> ~10MB
under-5MB  -> ~10MB
```

- [ ] **Step 3: Replace absolute offline wording**

Use this canonical distinction, adapting only grammar needed to fit each sentence:

```text
Core mouse and input-source behavior runs locally. AIx sends text only when you invoke it; downloads, updates, and license validation use network services.
```

Do not remove accurate, narrowly scoped `no telemetry` claims. Remove or qualify only the prohibited implication that the product never communicates over the network.

- [ ] **Step 4: Run the complete GEO consistency command**

Run:

```bash
rtk npm run test:geo-consistency
```

Expected: fixture tests pass and the repository scan reports no known contradictions.

- [ ] **Step 5: Run existing content checks**

Run:

```bash
rtk npm run test:docs-pages
rtk npm run test:model-pages
```

Expected: both content checks pass.

### Task 4: Full verification and review

**Files:**
- Review all modified files

- [ ] **Step 1: Run TypeScript verification**

Run:

```bash
rtk npm run typecheck
```

Expected: exit 0 with no TypeScript errors.

- [ ] **Step 2: Run the production build**

Run:

```bash
rtk npm run build
```

Expected: all locales build successfully with no broken links.

- [ ] **Step 3: Re-run GEO consistency after the build**

Run:

```bash
rtk npm run test:geo-consistency
```

Expected: fixture tests pass and the repository scan remains clean.

- [ ] **Step 4: Inspect the final diff**

Run:

```bash
rtk git diff --check
rtk git diff --stat
rtk git status --short
```

Expected: no whitespace errors; only planned files are modified or added.
