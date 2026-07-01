import { useCallback, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const appID = 'com.deepzz.LinguaX';

interface ApiEnvelope {
  code: number;
  error: string;
}

export function usePurchase() {
  const { siteConfig } = useDocusaurusContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const purchase = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');

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

      window.location.href = result.data;
    } catch (purchaseError) {
      const message =
        purchaseError instanceof Error
          ? purchaseError.message
          : 'Purchase failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [siteConfig.customFields]);

  return { purchase, loading, error };
}
