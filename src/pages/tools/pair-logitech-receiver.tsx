import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, { translate } from '@docusaurus/Translate';
import PairingWidget from '@site/src/components/PairingWidget';
import '@site/src/css/landing.css';
import styles from './pair-logitech-receiver.module.css';

export default function PairReceiverPage() {
  const downloadUrl = useBaseUrl('/download');
  const compatUrl = useBaseUrl('/docs/mouse-plus/device-compatibility');

  const pageTitle = translate({
    id: 'pairTool.meta.title',
    message: 'Pair a Logitech Bolt / Unifying / Lightspeed receiver in your browser',
    description: 'HTML <title> for the pair-receiver tool page',
  });
  const pageDescription = translate({
    id: 'pairTool.meta.description',
    message:
      'Pair, list, and unpair devices on a Logitech Bolt, Unifying, or Lightspeed receiver — right in Chrome or Edge, no Logitech software required.',
    description: 'HTML <meta description> for the pair-receiver tool page',
  });

  const FAQ = [
    {
      q: translate({ id: 'pairTool.faq.support.q', message: 'Which receivers does this tool support?' }),
      a: translate({
        id: 'pairTool.faq.support.a',
        message:
          'Logi Bolt, Logitech Unifying, and Lightspeed (G-series) receivers. It pairs, lists, and unpairs devices. Firmware updates and dongle replacement are out of scope — use Logitech’s own tools for those.',
      }),
    },
    {
      q: translate({ id: 'pairTool.faq.browser.q', message: 'Why does it need Chrome or Edge?' }),
      a: translate({
        id: 'pairTool.faq.browser.a',
        message:
          'The tool talks to the receiver over WebHID, a browser API that Safari and Firefox don’t implement. Nothing is installed and nothing leaves your machine — the protocol runs entirely between your browser and the receiver.',
      }),
    },
    {
      q: translate({ id: 'pairTool.faq.slots.q', message: 'My receiver has no free slots. What do I do?' }),
      a: translate({
        id: 'pairTool.faq.slots.a',
        message:
          'Unifying and Bolt receivers hold up to six devices. Connect the receiver, open "See paired devices", and unpair one you no longer use — the slot frees up immediately.',
      }),
    },
    {
      q: translate({ id: 'pairTool.faq.official.q', message: 'Is this an official Logitech tool?' }),
      a: translate({
        id: 'pairTool.faq.official.a',
        message:
          'No. It is an independent implementation of the publicly documented HID++ protocol, offered by LinguaX as a convenience. For Logitech’s own web pairing tool, see logiwebconnect.com.',
      }),
    },
    {
      q: translate({ id: 'pairTool.faq.brands.q', message: 'What about Razer, SteelSeries, or other brands?' }),
      a: translate({
        id: 'pairTool.faq.brands.a',
        message:
          'Logitech is the only vendor with a publicly documented receiver-pairing protocol (HID++), which is what makes this tool possible. Other brands’ 2.4GHz dongles use undocumented proprietary protocols and usually ship pre-paired, and Bluetooth mice (any brand, including Magic Mouse) pair through macOS System Settings directly. Once connected, LinguaX’s button mapping works with any brand.',
      }),
    },
    {
      q: translate({ id: 'pairTool.faq.next.q', message: 'What do I do after pairing?' }),
      a: translate({
        id: 'pairTool.faq.next.a',
        message:
          'macOS drives the mouse immediately. To remap side buttons, add gestures, or set up push-to-talk, install LinguaX — a ~10MB native app with a 30-day free trial.',
      }),
    },
  ];

  const STEPS = [
    {
      n: 1,
      title: translate({ id: 'pairTool.steps.1.title', message: 'Plug in the receiver' }),
      body: translate({ id: 'pairTool.steps.1.body', message: 'Click "Pair a new device" above.' }),
    },
    {
      n: 2,
      title: translate({ id: 'pairTool.steps.2.title', message: 'Pick "USB Receiver"' }),
      body: translate({ id: 'pairTool.steps.2.body', message: 'Confirm in the browser prompt.' }),
    },
    {
      n: 3,
      title: translate({ id: 'pairTool.steps.3.title', message: 'Wake the mouse' }),
      body: translate({ id: 'pairTool.steps.3.body', message: 'Toggle its power switch or connect button.' }),
    },
    {
      n: 4,
      title: translate({ id: 'pairTool.steps.4.title', message: 'You’re paired' }),
      body: translate({ id: 'pairTool.steps.4.body', message: 'Device name appears in the widget.' }),
    },
  ];

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          })}
        </script>
      </Head>

      <main className={`lx-page ${styles.toolPage}`}>
        <section className={`${styles.toolHero} lx-reveal`}>
          <div className="lx-chip">
            <Translate id="pairTool.hero.chip" description="Hero chip tag">
              Web tool · Chrome &amp; Edge · WebHID
            </Translate>
          </div>
          <h1 className={styles.toolTitle}>
            <Translate
              id="pairTool.hero.title"
              description="Hero title with highlighted phrase; put {here} wherever the language's natural word order places it"
              values={{
                here: (
                  <span className="highlight">
                    <Translate id="pairTool.hero.title.here" description="Highlighted phrase within the hero title">
                      in your browser
                    </Translate>
                  </span>
                ),
              }}
            >
              {'Pair a Logitech receiver {here}'}
            </Translate>
          </h1>
          <p className={styles.toolSubhead}>
            <Translate id="pairTool.hero.subhead" description="Hero subtitle">
              Bolt, Unifying, and Lightspeed — no Logi Options+, G HUB, or account.
            </Translate>
          </p>

          <div className={styles.widgetSpotlight}>
            <PairingWidget hideHeader />
          </div>

          <div className={styles.microTrust}>
            <span>
              <Translate id="pairTool.hero.trust.install" description="Trust line: no install">
                🔌 No install
              </Translate>
            </span>
            <span>·</span>
            <span>
              <Translate id="pairTool.hero.trust.local" description="Trust line: local over USB">
                🔒 Runs locally over USB (WebHID)
              </Translate>
            </span>
            <span>·</span>
            <span>
              <Translate id="pairTool.hero.trust.privacy" description="Trust line: no account/telemetry">
                🚫 No account, no telemetry
              </Translate>
            </span>
          </div>
        </section>

        <section className={`${styles.stepsSection} lx-reveal`}>
          <div className={styles.stepsHead}>
            <span className="lx-section-label">
              <Translate id="pairTool.steps.label" description="Steps section label">
                How it works
              </Translate>
            </span>
            <h2 className={styles.stepsTitle}>
              <Translate id="pairTool.steps.title" description="Steps section title">
                Four clicks, no vendor sign-in
              </Translate>
            </h2>
          </div>
          <ol className={styles.stepRow}>
            {STEPS.map((s) => (
              <li key={s.n} className={styles.stepItem}>
                <span className={styles.stepNum}>{s.n}</span>
                <div>
                  <div className={styles.stepTitle}>{s.title}</div>
                  <div className={styles.stepBody}>{s.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-section-label">
            <Translate id="pairTool.faq.label" description="FAQ section label">
              FAQ
            </Translate>
          </div>
          <h2>
            <Translate id="pairTool.faq.title" description="FAQ section title">
              Frequently asked questions
            </Translate>
          </h2>
          <div className="lx-faq">
            {FAQ.map(({ q, a }) => (
              <React.Fragment key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-cta-inline">
            <div className="lx-cta-inline-text">
              <Translate id="pairTool.cta.headline" description="After-pairing CTA headline">
                Paired. Now make the buttons worth it.
              </Translate>
              <span>
                <Translate id="pairTool.cta.sub" description="After-pairing CTA subtext">
                  Smooth scrolling, side-button and gesture mapping, per-app behavior, push-to-talk — LinguaX, ~10 MB
                  native, one-time $9.9.
                </Translate>
              </span>
            </div>
            <div className="lx-actions">
              <a className="lx-btn lx-btn-primary" href={downloadUrl}>
                <Translate id="pairTool.cta.download" description="After-pairing CTA download button">
                  Download LinguaX
                </Translate>
              </a>
              <Link className="lx-btn lx-btn-ghost" to={compatUrl}>
                <Translate id="pairTool.cta.compat" description="After-pairing CTA compat guides link">
                  Per-model guides
                </Translate>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
