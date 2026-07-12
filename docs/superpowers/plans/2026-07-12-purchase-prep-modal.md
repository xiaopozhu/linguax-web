# Purchase Prep Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a 3-step pre-checkout modal on `/pricing` that fixes the "I paid, why isn't it upgraded?" confusion — modal shows Payment → Email → Double-click, then auto-redirects to Stripe after 3s.

**Architecture:** Purely additive. New `PurchasePrepModal` presentational component + state machine inside the existing `usePurchase` hook. The hook exposes a new `modalNode` field that `pricing.tsx` renders — the two existing purchase buttons need no change (hook internals gate the redirect). No cancel/skip UI. i18n follows the existing `landing.pricing.*` key prefix.

**Tech Stack:** React 19, Docusaurus 3.8.1, TypeScript, CSS Modules. No test framework in this repo — verification is `npm run typecheck` + `npm run build` + `npm run start` with manual walkthrough.

## Global Constraints

- **No test framework** in this repo. Do NOT create `*.test.*` files or introduce vitest/jest. Verification = typecheck + build + manual dev-server walkthrough per task.
- **i18n key prefix:** use `landing.pricing.prepModal.*` (aligns with the existing `landing.pricing.*` keys in this file). Do NOT invent a new top-level prefix.
- **Default language is English** — Docusaurus reads the `message` prop as the source string. Only `zh-Hans/code.json` and `ja/code.json` need explicit entries; other locales (de/fr/id/ko/ru/zh-Hant) auto-fall-back to English.
- **No cancel button, no close button, no ESC-to-close, no click-overlay-to-close.** This is intentional per spec §2.
- **Redirect gate:** `window.location.href = checkoutUrl` fires only after BOTH `elapsed ≥ 3000ms` AND `checkoutUrl` is available. If API returns first, wait for the timer. If timer fires first, swap countdown copy to "Preparing your secure checkout link…" and wait for the API.
- **CSS variables to use:** `--lx-card`, `--lx-title`, `--lx-text`, `--lx-muted`, `--lx-line`, `--lx-primary`, `--lx-primary-strong`, `--lx-primary-soft`, `--lx-shadow` (defined in `src/css/landing.css`, both light and `[data-theme='dark']`).
- **Non-goals (do NOT touch):** `src/components/PricingSection/index.tsx` (dead code — unreferenced), the post-payment `?success=true` toast in `pricing.tsx`, the `usePurchase` hook's public error/loading contract (only ADD fields).
- **Commit style:** follow existing repo convention (`feat(pricing): …`, `fix(…): …`); include the `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` trailer.

---

## File Structure

| File | Action | Purpose |
|---|---|---|
| `src/components/PurchasePrepModal/index.tsx` | **Create** | Presentational modal: props-driven, no state, no side effects except body-scroll lock. |
| `src/components/PurchasePrepModal/styles.module.css` | **Create** | CSS module for overlay/dialog/steps/progress bar. Uses `--lx-*` vars, supports dark mode + `prefers-reduced-motion`. |
| `src/hooks/usePurchase.ts` | **Modify** | Extend hook with state machine: idle → preparing (open modal + timer + API) → wait/redirect/error. Return new `modalNode` field. |
| `src/pages/pricing.tsx` | **Modify** | Destructure `modalNode` from `usePurchase()`, render it once at page root. No other changes. |
| `i18n/zh-Hans/code.json` | **Modify** | Add 8 new keys under `landing.pricing.prepModal.*`. |
| `i18n/ja/code.json` | **Modify** | Add same 8 keys with Japanese values. |

---

## Task 1: PurchasePrepModal presentational component + i18n keys

**Files:**
- Create: `src/components/PurchasePrepModal/index.tsx`
- Create: `src/components/PurchasePrepModal/styles.module.css`
- Modify: `i18n/zh-Hans/code.json` (append 8 new keys)
- Modify: `i18n/ja/code.json` (append 8 new keys)

**Interfaces:**
- Produces:
  - Default export `PurchasePrepModal` — a React component with props:
    ```ts
    interface PurchasePrepModalProps {
      /** Milliseconds remaining before auto-redirect; null = waiting on API */
      remainingMs: number | null;
    }
    ```
  - When `remainingMs === null` → renders the "Preparing your secure checkout link…" copy with an indeterminate progress bar.
  - When `remainingMs` is a number → renders "Opening checkout in {seconds}s…" with the progress bar filled at `remainingMs / 3000`.

- [ ] **Step 1: Create the CSS module**

Create `src/components/PurchasePrepModal/styles.module.css`:

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
  animation: fadeIn 180ms ease-out;
}

.dialog {
  background: var(--lx-card);
  color: var(--lx-text);
  border-radius: 16px;
  max-width: 480px;
  width: 100%;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  animation: rise 220ms cubic-bezier(0.2, 0.9, 0.3, 1);
}

.title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--lx-title);
}

.titleIcon {
  font-size: 22px;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;
}

.step {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 12px;
  align-items: start;
}

.stepBadge {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--lx-primary);
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.stepTitle {
  font-size: 15px;
  font-weight: 600;
  color: var(--lx-title);
  margin: 0 0 4px 0;
  line-height: 1.35;
}

.stepBody {
  font-size: 13.5px;
  color: var(--lx-muted);
  margin: 0;
  line-height: 1.55;
}

.footer {
  border-top: 1px solid var(--lx-line);
  padding-top: 16px;
  margin-top: 4px;
}

.progressTrack {
  height: 3px;
  background: var(--lx-line);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progressFill {
  height: 100%;
  background: var(--lx-primary);
  transition: width 100ms linear;
  border-radius: 999px;
}

.progressIndeterminate {
  height: 100%;
  width: 40%;
  background: var(--lx-primary);
  border-radius: 999px;
  animation: indeterminate 1.4s ease-in-out infinite;
}

.footerText {
  font-size: 12.5px;
  color: var(--lx-muted);
  text-align: center;
  margin: 0;
  letter-spacing: 0.01em;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes rise {
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(340%); }
}

@media (prefers-reduced-motion: reduce) {
  .overlay, .dialog { animation: none; }
  .progressFill { transition: none; }
  .progressIndeterminate { animation: none; width: 100%; }
}
```

- [ ] **Step 2: Create the component**

Create `src/components/PurchasePrepModal/index.tsx`:

```tsx
import React, { useEffect } from 'react';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

export interface PurchasePrepModalProps {
  remainingMs: number | null;
}

const TOTAL_MS = 3000;

export default function PurchasePrepModal({ remainingMs }: PurchasePrepModalProps): React.JSX.Element {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const seconds = remainingMs === null ? null : Math.max(1, Math.ceil(remainingMs / 1000));
  const progressPct = remainingMs === null ? null : Math.max(0, Math.min(100, (remainingMs / TOTAL_MS) * 100));

  const footerText =
    remainingMs === null
      ? translate({
          id: 'landing.pricing.prepModal.waiting',
          message: 'Preparing your secure checkout link…',
          description: 'Prep modal footer when API is still pending after countdown',
        })
      : translate(
          {
            id: 'landing.pricing.prepModal.countdown',
            message: 'Opening checkout in {seconds}s…',
            description: 'Prep modal countdown footer',
          },
          { seconds: String(seconds) }
        );

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lx-prep-modal-title"
    >
      <div className={styles.dialog}>
        <h2 id="lx-prep-modal-title" className={styles.title}>
          <span className={styles.titleIcon} aria-hidden="true">💎</span>
          {translate({
            id: 'landing.pricing.prepModal.title',
            message: 'Before we send you to checkout',
            description: 'Prep modal title',
          })}
        </h2>

        <ol className={styles.steps}>
          <li className={styles.step}>
            <span className={styles.stepBadge} aria-hidden="true">1</span>
            <div>
              <p className={styles.stepTitle}>
                {translate({
                  id: 'landing.pricing.prepModal.step1.title',
                  message: 'Complete payment',
                  description: 'Prep modal step 1 title',
                })}
              </p>
              <p className={styles.stepBody}>
                {translate({
                  id: 'landing.pricing.prepModal.step1.body',
                  message: "We'll open Stripe's secure checkout in a moment.",
                  description: 'Prep modal step 1 body',
                })}
              </p>
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepBadge} aria-hidden="true">2</span>
            <div>
              <p className={styles.stepTitle}>
                📧 {translate({
                  id: 'landing.pricing.prepModal.step2.title',
                  message: 'Check your inbox for the license',
                  description: 'Prep modal step 2 title',
                })}
              </p>
              <p className={styles.stepBody}>
                {translate({
                  id: 'landing.pricing.prepModal.step2.body',
                  message:
                    "Your license is emailed to the address you enter at checkout. Check spam/promotions if you don't see it.",
                  description: 'Prep modal step 2 body',
                })}
              </p>
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepBadge} aria-hidden="true">3</span>
            <div>
              <p className={styles.stepTitle}>
                ⚡ {translate({
                  id: 'landing.pricing.prepModal.step3.title',
                  message: 'Double-click the license to activate',
                  description: 'Prep modal step 3 title',
                })}
              </p>
              <p className={styles.stepBody}>
                {translate({
                  id: 'landing.pricing.prepModal.step3.body',
                  message:
                    "Install LinguaX (if you haven't), then double-click the .linguaxlicense attachment. Activation is automatic — your existing trial period will not extend on its own.",
                  description: 'Prep modal step 3 body — includes the misconception fix',
                })}
              </p>
            </div>
          </li>
        </ol>

        <div className={styles.footer}>
          <div className={styles.progressTrack} aria-hidden="true">
            {progressPct === null ? (
              <div className={styles.progressIndeterminate} />
            ) : (
              <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
            )}
          </div>
          <p className={styles.footerText} aria-live="polite">
            {footerText}
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add zh-Hans translations**

Append the following 8 entries to `i18n/zh-Hans/code.json`, right after the existing `landing.pricing.notice.cancel` block (around line 240). Keep the same 2-space indentation and trailing-comma discipline used elsewhere in the file:

```json
  "landing.pricing.prepModal.title": {
    "message": "付款前请知悉"
  },
  "landing.pricing.prepModal.step1.title": {
    "message": "完成付款"
  },
  "landing.pricing.prepModal.step1.body": {
    "message": "即将跳转到 Stripe 安全付款页面"
  },
  "landing.pricing.prepModal.step2.title": {
    "message": "查收 License 邮件"
  },
  "landing.pricing.prepModal.step2.body": {
    "message": "我们会把 License 发到你付款时填写的邮箱，如未收到请检查垃圾邮件夹"
  },
  "landing.pricing.prepModal.step3.title": {
    "message": "双击 License 附件激活"
  },
  "landing.pricing.prepModal.step3.body": {
    "message": "已安装 LinguaX → 双击 .linguaxlicense 附件 → 自动激活。你原本的试用有效期不会自动延长，必须激活 License 才能升级到终身版。"
  },
  "landing.pricing.prepModal.countdown": {
    "message": "{seconds} 秒后跳转到付款页面…"
  },
  "landing.pricing.prepModal.waiting": {
    "message": "正在生成付款链接…"
  },
```

**Note:** Docusaurus's `code.json` is a flat JSON object. Insert these entries between existing entries preserving valid JSON syntax (comma after preceding entry's closing `}`, no trailing comma at file end).

- [ ] **Step 4: Add ja translations**

Append the same 8 keys to `i18n/ja/code.json` at an equivalent location (find the corresponding `landing.pricing.notice.cancel` block; if it does not exist yet in ja, append near other `landing.pricing.*` entries):

```json
  "landing.pricing.prepModal.title": {
    "message": "お支払いの前に"
  },
  "landing.pricing.prepModal.step1.title": {
    "message": "お支払いを完了"
  },
  "landing.pricing.prepModal.step1.body": {
    "message": "Stripe の安全な決済ページへ移動します"
  },
  "landing.pricing.prepModal.step2.title": {
    "message": "メールで License を受け取る"
  },
  "landing.pricing.prepModal.step2.body": {
    "message": "決済時に入力したメールアドレスに License が届きます。届かない場合は迷惑メールをご確認ください"
  },
  "landing.pricing.prepModal.step3.title": {
    "message": "License ファイルをダブルクリックで有効化"
  },
  "landing.pricing.prepModal.step3.body": {
    "message": "LinguaX をインストール後、.linguaxlicense 添付ファイルをダブルクリックで自動有効化されます。既存の試用期間は自動延長されません。ライセンスを有効化する必要があります。"
  },
  "landing.pricing.prepModal.countdown": {
    "message": "{seconds}秒後に決済ページへ移動します…"
  },
  "landing.pricing.prepModal.waiting": {
    "message": "決済リンクを準備中…"
  },
```

- [ ] **Step 5: Verify typecheck passes**

Run: `npm run typecheck`
Expected: exits 0 with no errors.

If it fails on `translate` signature, verify the second-argument `{ seconds: String(seconds) }` shape matches Docusaurus 3.8.1 (it does — this is the documented interpolation form).

- [ ] **Step 6: Verify i18n JSON is valid**

Run:
```bash
node -e "JSON.parse(require('fs').readFileSync('i18n/zh-Hans/code.json'))" && \
node -e "JSON.parse(require('fs').readFileSync('i18n/ja/code.json'))" && \
echo "OK"
```
Expected: prints `OK`. If it prints a syntax error, fix the misplaced comma / brace and re-run.

- [ ] **Step 7: Commit**

```bash
git add src/components/PurchasePrepModal/ i18n/zh-Hans/code.json i18n/ja/code.json
git commit -m "$(cat <<'EOF'
feat(pricing): add PurchasePrepModal presentational component

Ships the 3-step pre-checkout dialog UI: payment → email → double-click.
Includes zh-Hans and ja translations. Not yet wired to usePurchase — the
hook integration is the next task.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Wire modal into usePurchase hook + mount in pricing.tsx

**Files:**
- Modify: `src/hooks/usePurchase.ts` (full rewrite of the hook body)
- Modify: `src/pages/pricing.tsx` (destructure `modalNode`, render once)

**Interfaces:**
- Consumes:
  - `PurchasePrepModal` from Task 1 with prop `remainingMs: number | null`.
- Produces:
  - `usePurchase()` return shape changes from `{ purchase, loading, error }` to `{ purchase, loading, error, modalNode }`.
  - `modalNode: React.ReactNode` — either `<PurchasePrepModal ... />` or `null`.

- [ ] **Step 1: Rewrite the hook**

Replace the entire body of `src/hooks/usePurchase.ts` with:

```tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PurchasePrepModal from '@site/src/components/PurchasePrepModal';

const appID = 'com.deepzz.LinguaX';
const COUNTDOWN_MS = 3000;
const TICK_MS = 100;

interface ApiEnvelope {
  code: number;
  error: string;
}

export function usePurchase() {
  const { siteConfig } = useDocusaurusContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [remainingMs, setRemainingMs] = useState<number | null>(COUNTDOWN_MS);

  const checkoutUrlRef = useRef<string | null>(null);
  const countdownDoneRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const redirectedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const maybeRedirect = useCallback(() => {
    if (redirectedRef.current) return;
    if (countdownDoneRef.current && checkoutUrlRef.current) {
      redirectedRef.current = true;
      clearTimer();
      window.location.href = checkoutUrlRef.current;
    }
  }, [clearTimer]);

  const resetState = useCallback(() => {
    clearTimer();
    setModalOpen(false);
    setRemainingMs(COUNTDOWN_MS);
    checkoutUrlRef.current = null;
    countdownDoneRef.current = false;
    redirectedRef.current = false;
  }, [clearTimer]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const purchase = useCallback(async (): Promise<void> => {
    if (modalOpen || loading) return;

    setLoading(true);
    setError('');
    setModalOpen(true);
    setRemainingMs(COUNTDOWN_MS);
    checkoutUrlRef.current = null;
    countdownDoneRef.current = false;
    redirectedRef.current = false;

    const startedAt = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const remaining = COUNTDOWN_MS - elapsed;
      if (remaining <= 0) {
        countdownDoneRef.current = true;
        setRemainingMs(checkoutUrlRef.current ? 0 : null);
        clearTimer();
        maybeRedirect();
      } else {
        setRemainingMs(remaining);
      }
    }, TICK_MS);

    try {
      const response = await fetch('/app-api/stripe-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Deepzz-App': appID,
        },
        body: JSON.stringify({
          price_id:
            siteConfig.customFields?.stripePriceId ||
            'price_1S8bHeGdWkwYJsQdAT9XjkTs:payment',
        }),
      });
      if (Math.floor(response.status / 100) !== 2) {
        throw new Error(`HTTP ${response.status}`);
      }
      const result = (await response.json()) as ApiEnvelope & { data?: string };
      if (result.code !== 0 || !result.data) {
        throw new Error(result.error || 'Failed to create checkout session');
      }
      checkoutUrlRef.current = result.data;
      maybeRedirect();
    } catch (purchaseError) {
      const message =
        purchaseError instanceof Error
          ? purchaseError.message
          : 'Purchase failed. Please try again.';
      setError(message);
      resetState();
      setLoading(false);
    }
  }, [siteConfig.customFields, loading, modalOpen, clearTimer, maybeRedirect, resetState]);

  const modalNode: React.ReactNode = modalOpen
    ? <PurchasePrepModal remainingMs={remainingMs} />
    : null;

  return { purchase, loading, error, modalNode };
}
```

Key invariants encoded above:
- `purchase()` guards against re-entry (`if (modalOpen || loading) return`).
- The interval is the single source of truth for elapsed time; it also flips `countdownDoneRef` and calls `maybeRedirect()` — no separate `setTimeout`.
- `maybeRedirect()` is guarded by `redirectedRef` so it fires at most once even if both branches (timer & API) race to satisfy the AND condition.
- On success we do NOT `setLoading(false)` before redirect — the page is about to leave; leaving `loading=true` keeps the button disabled.
- On error we tear down modal + timer AND clear loading so the button becomes clickable again.

- [ ] **Step 2: Mount modalNode in pricing.tsx**

In `src/pages/pricing.tsx`:

First, change the destructure on **line 28**:

```tsx
const { purchase: handlePurchase, loading, error } = usePurchase();
```

to:

```tsx
const { purchase: handlePurchase, loading, error, modalNode } = usePurchase();
```

Next, the page's `<Layout>` closes at line 382 with `</Layout>` and its `<main>` closes at line 381 with `</main>`. Insert `{modalNode}` on its own line between them, so lines 380–383 become:

```tsx
        </section>
      </main>
      {modalNode}
    </Layout>
```

(Line numbers are approximate — if the file drifted, look for the single `</main>` / `</Layout>` pair at the file's end.)

**Do not** touch either purchase button (`onClick={handlePurchase}` on lines 236 and 368) — the hook internals now gate the redirect.

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: exits 0. Any error here means the hook's return type changed shape incompatibly — check that the destructure on line 28 matches the new hook signature.

- [ ] **Step 4: Run a full build**

Run: `npm run build`
Expected: build completes without errors. Docusaurus SSR happens here; if `PurchasePrepModal` accidentally references `document`/`window` at module scope (only inside `useEffect` is safe), the build will fail. The plan's code confines `document.body.style.overflow` inside `useEffect`, so it should pass.

- [ ] **Step 5: Manual verification in dev server**

Run: `npm run start`

Open `http://localhost:3000/pricing` and verify the following against **spec §8 acceptance criteria**:

1. **Happy path (fast API):**
   - Click the "Upgrade to Lifetime" button in the pricing card (~line 236 in source).
   - Modal appears immediately with all 3 steps visible.
   - Progress bar shrinks from full to empty over ~3 seconds.
   - Footer counts down "Opening checkout in 3s… → 2s… → 1s…".
   - After ~3s, browser navigates to `checkout.stripe.com/...`.
   - Hit browser Back to return to `/pricing`.

2. **Second button:** repeat on the bottom CTA button (~line 368). Same behavior.

3. **Slow API simulation:** open DevTools → Network → set throttling to "Slow 3G", then click purchase. When the countdown reaches 0 before the API returns:
   - Footer text should switch to "Preparing your secure checkout link…"
   - Progress bar should switch to indeterminate (animated sliding bar)
   - When API returns, immediate redirect.

4. **Error path:** in DevTools → Network → right-click `/app-api/stripe-checkout-session` → Block request URL. Click purchase again.
   - Modal opens.
   - After the fetch fails, modal disappears.
   - The inline error `errorInline` beneath the button should render `error` string.
   - Button becomes clickable again.

5. **i18n check:** navigate to `http://localhost:3000/zh-Hans/pricing` and repeat happy path. Verify all modal copy is in 简体中文. Then `http://localhost:3000/ja/pricing` and verify Japanese.

6. **Dark mode:** toggle the site's theme switch. Trigger the modal. Verify: overlay still visible, dialog uses dark `--lx-card` background, text is readable, progress bar contrasts.

7. **Mobile:** DevTools → responsive mode → iPhone SE (375px). Trigger modal. Dialog should have 16px margin on each side, content should not overflow, all 3 steps readable without horizontal scroll.

8. **prefers-reduced-motion:** in DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Trigger modal. No fade-in animation, no rise animation, progress bar should either jump or be static (indeterminate fills 100%).

If ANY step fails, stop and fix before committing. Report which step failed and why.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/usePurchase.ts src/pages/pricing.tsx
git commit -m "$(cat <<'EOF'
feat(pricing): pre-checkout modal informs users about license email flow

Wires PurchasePrepModal into usePurchase. Clicking upgrade now opens a
3-step modal (payment → email → double-click activate) while the Stripe
checkout session is created in parallel, then auto-redirects after 3s.

Fixes the confusion where users paid and expected auto-extension of the
trial without knowing they need to open the emailed .linguaxlicense
attachment to activate.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Post-Implementation

After both tasks are committed:

1. Run `git log --oneline -3` — verify two new commits are present with the expected messages.
2. Confirm the working tree is clean (`git status`).
3. Report to the user with:
   - The two commit SHAs
   - Which manual verification steps were run
   - Any deviations from the plan (there should be none; if there are, explain why)
