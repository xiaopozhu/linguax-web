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
