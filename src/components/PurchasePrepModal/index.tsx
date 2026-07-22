import React, { useEffect } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

export interface PurchasePrepModalProps {
  remainingMs: number | null;
}

const TOTAL_MS = 4000;

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

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lx-prep-modal-title"
    >
      <div className={styles.dialog}>
        <h2 id="lx-prep-modal-title" className={styles.title}>
          {translate({
            id: 'landing.pricing.prepModal.title',
            message: 'Before we send you to checkout',
            description: 'Prep modal title',
          })}
        </h2>

        <ol className={styles.steps}>
          <li className={styles.step}>
            <span className={styles.stepNum} aria-hidden="true">1</span>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>
                {translate({
                  id: 'landing.pricing.prepModal.step1.title',
                  message: 'Complete payment',
                  description: 'Prep modal step 1 title',
                })}
              </p>
              <p className={styles.stepDesc}>
                {translate({
                  id: 'landing.pricing.prepModal.step1.body',
                  message: "We'll open Stripe's secure checkout in a moment.",
                  description: 'Prep modal step 1 body',
                })}
              </p>
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepNum} aria-hidden="true">2</span>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>
                {translate({
                  id: 'landing.pricing.prepModal.step2.title',
                  message: 'Check your inbox for the license',
                  description: 'Prep modal step 2 title',
                })}
              </p>
              <p className={styles.stepDesc}>
                <Translate
                  id="landing.pricing.prepModal.step2.body"
                  description="Prep modal step 2 body ({address} = bold checkout email phrase)"
                  values={{
                    address: (
                      <strong>
                        <Translate
                          id="landing.pricing.prepModal.step2.body.address"
                          description="Prep modal step 2 — bold 'the address you enter at checkout'"
                        >
                          the address you enter at checkout
                        </Translate>
                      </strong>
                    ),
                  }}
                >
                  {"Your license is emailed to {address}. Check spam/promotions if you don't see it."}
                </Translate>
              </p>
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepNum} aria-hidden="true">3</span>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>
                {translate({
                  id: 'landing.pricing.prepModal.step3.title',
                  message: 'Double-click the license to activate',
                  description: 'Prep modal step 3 title',
                })}
              </p>
              <p className={styles.stepDesc}>
                <Translate
                  id="landing.pricing.prepModal.step3.body"
                  description="Prep modal step 3 body — includes the misconception fix ({action}, {warn} are emphasized substrings)"
                  values={{
                    action: (
                      <strong>
                        <Translate
                          id="landing.pricing.prepModal.step3.body.action"
                          description="Prep modal step 3 — bold action 'double-click the .linguaxlicense attachment'"
                        >
                          double-click the .linguaxlicense attachment
                        </Translate>
                      </strong>
                    ),
                    warn: (
                      <strong className={styles.stepDescWarn}>
                        <Translate
                          id="landing.pricing.prepModal.step3.body.warn"
                          description="Prep modal step 3 — colored misconception fix 'trial won't extend on its own'"
                        >
                          your existing trial period will not extend on its own
                        </Translate>
                      </strong>
                    ),
                  }}
                >
                  {"Install LinguaX (if you haven't), then {action}. Activation is automatic — {warn}."}
                </Translate>
              </p>
            </div>
          </li>
        </ol>

        <p className={styles.countdown} aria-live="polite">
          {remainingMs === null ? (
            translate({
              id: 'landing.pricing.prepModal.waiting',
              message: 'Preparing your secure checkout link…',
              description: 'Prep modal footer when API is still pending after countdown',
            })
          ) : (
            <Translate
              id="landing.pricing.prepModal.countdown"
              description="Prep modal countdown footer"
              values={{ seconds: <strong>{seconds}</strong> }}
            >
              {'Opening checkout in {seconds}s'}
            </Translate>
          )}
        </p>

        <div className={styles.progressTrack} aria-hidden="true">
          {progressPct === null ? (
            <div className={styles.progressIndeterminate} />
          ) : (
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          )}
        </div>
      </div>
    </div>
  );
}
