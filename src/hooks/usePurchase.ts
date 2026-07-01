import { useCallback, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const appID = 'com.deepzz.LinguaX';

interface ApiEnvelope {
  code: number;
  error: string;
}

interface CashierCheckoutData {
  checkoutUrl: string;
  paymentNo: string;
}

export function useCashierCheckout(): boolean {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'zh-Hans';
}

export function usePurchase() {
  const { siteConfig } = useDocusaurusContext();
  const useCashier = useCashierCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const purchase = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');

      const headers: Record<string, string> = {
        Accept: 'application/json',
        'X-Deepzz-App': appID,
      };

      let checkoutURL: string;

      if (useCashier) {
        headers['X-Deepzz-Lang'] = 'zh-CN';
        const response = await fetch('/app-api/cashier-checkout', {
          method: 'POST',
          headers,
        });
        if (Math.floor(response.status / 100) !== 2) {
          throw new Error(`HTTP ${response.status}`);
        }
        const result = (await response.json()) as ApiEnvelope & { data?: CashierCheckoutData };
        if (result.code !== 0 || !result.data?.checkoutUrl) {
          throw new Error(result.error || 'Failed to create checkout');
        }
        checkoutURL = result.data.checkoutUrl;
      } else {
        headers['Content-Type'] = 'application/json';
        const response = await fetch('/app-api/stripe-checkout-session', {
          method: 'POST',
          headers,
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
        checkoutURL = result.data;
      }

      window.location.href = checkoutURL;
    } catch (purchaseError) {
      const message =
        purchaseError instanceof Error
          ? purchaseError.message
          : 'Purchase failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [siteConfig.customFields, useCashier]);

  return { purchase, loading, error, setError, useCashier };
}
