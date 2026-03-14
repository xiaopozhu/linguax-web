import React, { useCallback, useEffect, useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import '@site/src/css/landing.css';

interface ApiResponse {
  code: number;
  data: string;
  error: string;
}

export default function PricingPage(): React.JSX.Element {
  const downloadUrl = useBaseUrl('/download');
  const { siteConfig } = useDocusaurusContext();
  const pageUrl = `${siteConfig.url}${useBaseUrl('/pricing')}`;
  const pageTitle = translate({
    id: 'landing.pricing.meta.title',
    message: 'LinguaX Pricing - Trial and Lifetime ($9.9 one-time)',
    description: 'Pricing page title'
  });
  const pageDescription = translate({
    id: 'landing.pricing.meta.description',
    message: 'LinguaX offers a 30-day trial and a one-time Lifetime upgrade for $9.9.',
    description: 'Pricing page description'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const pricingFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this a subscription?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Lifetime is a one-time payment.' },
      },
      {
        '@type': 'Question',
        name: 'Is there refund support?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. If the product does not fit your workflow, contact support for purchase assistance.' },
      },
      {
        '@type': 'Question',
        name: 'When should I upgrade?',
        acceptedAnswer: { '@type': 'Answer', text: 'Upgrade when you need website rules, more app rules, or full mouse enhancement in daily work.' },
      },
      {
        '@type': 'Question',
        name: 'Can I try before paying?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Download and get a 30-day free trial with all features. Upgrade to Lifetime only if you want to continue using after trial expires.' },
      },
      {
        '@type': 'Question',
        name: 'Is there a reward for accepted feedback?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. If your feedback is accepted and shipped, we will grant a 1-year LinguaX license.' },
      },
    ],
  };

  const handlePurchase = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/app-api/stripe-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Deepzz-App': 'com.deepzz.LinguaX'
        },
        body: JSON.stringify({
          price_id: siteConfig.customFields?.stripePriceId || 'price_1S8bHeGdWkwYJsQdAT9XjkTs:payment'
        }),
      });

      if (response.status / 100 !== 2) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json() as ApiResponse;
      if (result.code !== 0 || !result.data) {
        throw new Error(result.error || 'Failed to create checkout session');
      }

      window.location.href = result.data;
    } catch (purchaseError) {
      const message = purchaseError instanceof Error ? purchaseError.message : 'Purchase failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [siteConfig.customFields]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setNotice(translate({
        id: 'landing.pricing.notice.success',
        message: 'Payment successful. License has been sent to your checkout email.',
        description: 'Payment success notice'
      }));
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    if (params.get('cancel') === 'true') {
      setNotice(translate({
        id: 'landing.pricing.notice.cancel',
        message: 'Payment canceled. You can continue with Free anytime.',
        description: 'Payment cancel notice'
      }));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
    >
      <Head>
        <meta
          name="keywords"
          content={translate({
            id: 'landing.pricing.meta.keywords',
            message: 'LinguaX pricing, macOS input switcher pricing, one-time purchase macOS utility, Logitech smooth scroll app pricing, mouse enhancement tool pricing, LinguaX trial and lifetime'
          })}
        />
        <script type="application/ld+json">
          {JSON.stringify(pricingFaqSchema)}
        </script>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteConfig.url}/img/linguax-home.png`} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteConfig.url}/img/linguax-home.png`} />
      </Head>
      <main className="lx-page lx-pricing-page">
        <section className="lx-hero lx-hero-compact lx-reveal">
          <div className="lx-chip">
            <Translate id="landing.pricing.hero.chip" description="Pricing hero chip">30-day full trial. One-time lifetime. No subscription.</Translate>
          </div>
          <h1><Translate id="landing.pricing.hero.title" description="Pricing hero title">Pay once when the value is obvious</Translate></h1>
          <p>
            <Translate id="landing.pricing.hero.description" description="Pricing hero description">
              Start with a 30-day full-feature trial. If LinguaX saves you time in coding, design, or multilingual work, upgrade once for $9.9 and keep it for life.
            </Translate>
          </p>
          {notice ? <p className="lx-inline-success">{notice}</p> : null}
          {error ? <p className="lx-inline-error">{error}</p> : null}
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-pricing-grid">
            <article className="lx-plan lx-stagger">
              <div className="lx-plan-head">
                <h2><Translate id="landing.pricing.plan.trial.title" description="Trial plan title">Trial</Translate></h2>
                <p className="lx-price">$0</p>
                <p className="lx-muted"><Translate id="landing.pricing.plan.trial.subtitle" description="Trial plan subtitle">30-day free trial with full features</Translate></p>
              </div>
              <ul>
                <li><Translate id="landing.pricing.plan.trial.feature1" description="Trial feature 1">Unlimited app rules</Translate></li>
                <li><Translate id="landing.pricing.plan.trial.feature2" description="Trial feature 2">Website/domain-based switching</Translate></li>
                <li><Translate id="landing.pricing.plan.trial.feature3" description="Trial feature 3">Full Mouse+ enhancement</Translate></li>
                <li><Translate id="landing.pricing.plan.trial.feature4" description="Trial feature 4">Shortcut action mapping</Translate></li>
                <li className="lx-muted"><Translate id="landing.pricing.plan.trial.feature5" description="Trial feature 5">Expires after trial period</Translate></li>
              </ul>
              <a className="lx-btn lx-btn-ghost" href={downloadUrl}>
                <Translate id="landing.pricing.plan.trial.cta" description="Trial plan cta">Download Free</Translate>
              </a>
            </article>

            <article className="lx-plan lx-plan-featured lx-stagger">
              <div className="lx-badge"><Translate id="landing.pricing.plan.lifetime.badge" description="Lifetime plan badge">Most Practical</Translate></div>
              <div className="lx-plan-head">
                <h2><Translate id="landing.pricing.plan.lifetime.title" description="Lifetime plan title">Lifetime</Translate></h2>
                <p className="lx-price">$9.9 <span><Translate id="landing.pricing.plan.lifetime.period" description="Lifetime period">one-time</Translate></span></p>
                <p className="lx-muted"><Translate id="landing.pricing.plan.lifetime.subtitle" description="Lifetime subtitle">Best for developers, designers, and multilingual users who work daily with mouse + keyboard</Translate></p>
              </div>
              <ul>
                <li><Translate id="landing.pricing.plan.lifetime.feature1" description="Lifetime feature 1">Unlimited app rules</Translate></li>
                <li><Translate id="landing.pricing.plan.lifetime.feature2" description="Lifetime feature 2">Website/domain-based switching</Translate></li>
                <li><Translate id="landing.pricing.plan.lifetime.feature3" description="Lifetime feature 3">Full Mouse+ enhancement</Translate></li>
                <li><Translate id="landing.pricing.plan.lifetime.feature4" description="Lifetime feature 4">Shortcut action mapping</Translate></li>
              </ul>
              <button className="lx-btn lx-btn-primary" type="button" onClick={handlePurchase} disabled={loading}>
                {loading ? translate({
                  id: 'landing.pricing.plan.lifetime.ctaLoading',
                  message: 'Redirecting...',
                  description: 'Lifetime cta loading'
                }) : translate({
                  id: 'landing.pricing.plan.lifetime.cta',
                  message: 'Upgrade to Lifetime',
                  description: 'Lifetime cta'
                })}
              </button>
            </article>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.pricing.comparison.title" description="Feature comparison title">Feature comparison</Translate></h2>
          <div className="lx-table-wrap">
            <table className="lx-table">
              <thead>
                <tr>
                  <th><Translate id="landing.pricing.comparison.header.feature" description="Comparison header feature">Feature</Translate></th>
                  <th><Translate id="landing.pricing.comparison.header.trial" description="Comparison header trial">Trial</Translate></th>
                  <th><Translate id="landing.pricing.comparison.header.lifetime" description="Comparison header lifetime">Lifetime</Translate></th>
                </tr>
              </thead>
              <tbody>
                <tr><td><Translate id="landing.pricing.comparison.row1.feature" description="Comparison row1 feature">App-based input switching</Translate></td><td>✓</td><td>✓</td></tr>
                <tr><td><Translate id="landing.pricing.comparison.row2.feature" description="Comparison row2 feature">App rule limit</Translate></td><td><Translate id="landing.pricing.comparison.row2.trial" description="Comparison row2 trial">Unlimited</Translate></td><td><Translate id="landing.pricing.comparison.row2.lifetime" description="Comparison row2 lifetime">Unlimited</Translate></td></tr>
                <tr><td><Translate id="landing.pricing.comparison.row3.feature" description="Comparison row3 feature">Website/domain switching</Translate></td><td>✓</td><td>✓</td></tr>
                <tr><td><Translate id="landing.pricing.comparison.row4.feature" description="Comparison row4 feature">Mouse+ enhancement</Translate></td><td><Translate id="landing.pricing.comparison.row4.trial" description="Comparison row4 trial">Full</Translate></td><td><Translate id="landing.pricing.comparison.row4.lifetime" description="Comparison row4 lifetime">Full</Translate></td></tr>
                <tr><td><Translate id="landing.pricing.comparison.row5.feature" description="Comparison row5 feature">Shortcut action mapping</Translate></td><td>✓</td><td>✓</td></tr>
                <tr><td><Translate id="landing.pricing.comparison.row6.feature" description="Comparison row6 feature">Duration</Translate></td><td><Translate id="landing.pricing.comparison.row6.trial" description="Comparison row6 trial">30 days</Translate></td><td><Translate id="landing.pricing.comparison.row6.lifetime" description="Comparison row6 lifetime">Lifetime</Translate></td></tr>
                <tr><td><Translate id="landing.pricing.comparison.row7.feature" description="Comparison row7 feature">Payment</Translate></td><td><Translate id="landing.pricing.comparison.row7.trial" description="Comparison row7 trial">Free</Translate></td><td><Translate id="landing.pricing.comparison.row7.lifetime" description="Comparison row7 lifetime">$9.9 one-time</Translate></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.pricing.value.title" description="Value section title">What you are paying for</Translate></h2>
          <div className="lx-grid lx-grid-3">
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.pricing.value.card1.title" description="Value card1 title">Fewer interruptions</Translate></h3>
              <p><Translate id="landing.pricing.value.card1.description" description="Value card1 description">Reduce repetitive input source switching during coding, writing, and communication.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.pricing.value.card2.title" description="Value card2 title">Better consistency</Translate></h3>
              <p><Translate id="landing.pricing.value.card2.description" description="Value card2 description">Keep typing and mouse behavior aligned with the app or website you are currently using.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.pricing.value.card3.title" description="Value card3 title">Clear long-term cost</Translate></h3>
              <p><Translate id="landing.pricing.value.card3.description" description="Value card3 description">One-time lifetime payment avoids subscription accumulation for a core productivity utility.</Translate></p>
            </article>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.pricing.faq.title" description="Pricing FAQ title">Purchasing FAQ</Translate></h2>
          <div className="lx-faq">
            <h3><Translate id="landing.pricing.faq.q1" description="Pricing FAQ question1">Is this a subscription?</Translate></h3>
            <p><Translate id="landing.pricing.faq.a1" description="Pricing FAQ answer1">No. Lifetime is a one-time payment.</Translate></p>
            <h3><Translate id="landing.pricing.faq.q2" description="Pricing FAQ question2">Is there refund support?</Translate></h3>
            <p><Translate id="landing.pricing.faq.a2" description="Pricing FAQ answer2">Yes. If the product does not fit your workflow, contact support for purchase assistance.</Translate></p>
            <h3><Translate id="landing.pricing.faq.q3" description="Pricing FAQ question3">Who should upgrade to Lifetime?</Translate></h3>
            <p><Translate id="landing.pricing.faq.a3" description="Pricing FAQ answer3">Upgrade if you switch contexts frequently and rely on app/site input rules, smooth scrolling, or mouse gesture mapping every day.</Translate></p>
            <h3><Translate id="landing.pricing.faq.q4" description="Pricing FAQ question4">Can I try before paying?</Translate></h3>
            <p><Translate id="landing.pricing.faq.a4" description="Pricing FAQ answer4">Yes. Download and get a 30-day free trial with all features. Upgrade to Lifetime only if you want to continue using after trial expires.</Translate></p>
            <h3><Translate id="landing.pricing.faq.q5" description="Pricing FAQ question5">Is there a reward for accepted feedback?</Translate></h3>
            <p><Translate id="landing.pricing.faq.a5" description="Pricing FAQ answer5">Yes. If your feedback is accepted and shipped, we will grant a 1-year LinguaX license.</Translate></p>
          </div>
        </section>

        <section className="lx-section lx-cta lx-reveal">
          <h2><Translate id="landing.pricing.cta.title" description="Pricing CTA title">Start free. Upgrade only if it earns its place.</Translate></h2>
          <p><Translate id="landing.pricing.cta.description" description="Pricing CTA description">Use LinguaX in your actual workflow, then decide with confidence.</Translate></p>
          <div className="lx-actions">
            <a className="lx-btn lx-btn-ghost" href={downloadUrl}>
              <Translate id="landing.pricing.cta.download" description="Pricing CTA download">Download Free</Translate>
            </a>
            <button className="lx-btn lx-btn-primary" type="button" onClick={handlePurchase} disabled={loading}>
              {loading ? translate({
                id: 'landing.pricing.cta.loading',
                message: 'Redirecting...',
                description: 'Pricing CTA loading'
              }) : translate({
                id: 'landing.pricing.cta.buy',
                message: 'Buy Lifetime',
                description: 'Pricing CTA buy'
              })}
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
