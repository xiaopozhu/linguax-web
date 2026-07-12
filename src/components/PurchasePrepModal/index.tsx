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
