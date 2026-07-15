import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import PairingWidget from '@site/src/components/PairingWidget';
import '@site/src/css/landing.css';
import styles from './pair-logitech-receiver.module.css';

const FAQ = [
  {
    q: 'Which receivers does this tool support?',
    a: 'Logi Bolt, Logitech Unifying, and Lightspeed (G-series) receivers. It pairs, lists, and unpairs devices. Firmware updates and dongle replacement are out of scope — use Logitech’s own tools for those.',
  },
  {
    q: 'Why does it need Chrome or Edge?',
    a: 'The tool talks to the receiver over WebHID, a browser API that Safari and Firefox don’t implement. Nothing is installed and nothing leaves your machine — the protocol runs entirely between your browser and the receiver.',
  },
  {
    q: 'My receiver has no free slots. What do I do?',
    a: 'Unifying and Bolt receivers hold up to six devices. Connect the receiver, open "See paired devices", and unpair one you no longer use — the slot frees up immediately.',
  },
  {
    q: 'Is this an official Logitech tool?',
    a: 'No. It is an independent implementation of the publicly documented HID++ protocol, offered by LinguaX as a convenience. For Logitech’s own web pairing tool, see logiwebconnect.com.',
  },
  {
    q: 'What about Razer, SteelSeries, or other brands?',
    a: 'Logitech is the only vendor with a publicly documented receiver-pairing protocol (HID++), which is what makes this tool possible. Other brands’ 2.4GHz dongles use undocumented proprietary protocols and usually ship pre-paired, and Bluetooth mice (any brand, including Magic Mouse) pair through macOS System Settings directly. Once connected, LinguaX’s button mapping works with any brand.',
  },
  {
    q: 'What do I do after pairing?',
    a: 'macOS drives the mouse immediately. To remap side buttons, add gestures, or set up push-to-talk, install LinguaX — a ~10MB native app with a 30-day free trial.',
  },
];

const STEPS = [
  { n: 1, title: 'Plug in the receiver', body: 'Click "Pair a new device" above.' },
  { n: 2, title: 'Pick "USB Receiver"',   body: 'Confirm in the browser prompt.' },
  { n: 3, title: 'Wake the mouse',        body: 'Toggle its power switch or connect button.' },
  { n: 4, title: 'You’re paired',         body: 'Device name appears in the widget.' },
];

export default function PairReceiverPage() {
  const downloadUrl = useBaseUrl('/download');
  const compatUrl = useBaseUrl('/docs/mouse-plus/device-compatibility');

  return (
    <Layout
      title="Pair a Logitech Bolt / Unifying / Lightspeed receiver in your browser"
      description="Pair, list, and unpair devices on a Logitech Bolt, Unifying, or Lightspeed receiver — right in Chrome or Edge, no Logitech software required."
    >
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
        {/* Hero + widget 融合成一个 "工具区" —— 首屏就是可操作的 widget */}
        <section className={`${styles.toolHero} lx-reveal`}>
          <div className="lx-chip">Web tool · Chrome &amp; Edge · WebHID</div>
          <h1 className={styles.toolTitle}>
            Pair a Logitech receiver <span className="highlight">in your browser</span>
          </h1>
          <p className={styles.toolSubhead}>
            Bolt, Unifying, and Lightspeed — no Logi Options+, G HUB, or account.
          </p>

          <div className={styles.widgetSpotlight}>
            <PairingWidget hideHeader />
          </div>

          <div className={styles.microTrust}>
            <span>🔌 No install</span>
            <span>·</span>
            <span>🔒 Runs locally over USB (WebHID)</span>
            <span>·</span>
            <span>🚫 No account, no telemetry</span>
          </div>
        </section>

        {/* Steps — 一行紧凑步骤，不是大卡片 */}
        <section className={`${styles.stepsSection} lx-reveal`}>
          <div className={styles.stepsHead}>
            <span className="lx-section-label">How it works</span>
            <h2 className={styles.stepsTitle}>Four clicks, no vendor sign-in</h2>
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

        {/* FAQ */}
        <section className="lx-section lx-reveal">
          <div className="lx-section-label">FAQ</div>
          <h2>Frequently asked questions</h2>
          <div className="lx-faq">
            {FAQ.map(({ q, a }) => (
              <React.Fragment key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* After-pairing —— 单行 inline CTA，不占一整屏 */}
        <section className="lx-section lx-reveal">
          <div className="lx-cta-inline">
            <div className="lx-cta-inline-text">
              Paired. Now make the buttons worth it.
              <span>
                Smooth scrolling, side-button and gesture mapping, per-app behavior, push-to-talk — LinguaX,
                ~10 MB native, one-time $9.9.
              </span>
            </div>
            <div className="lx-actions">
              <a className="lx-btn lx-btn-primary" href={downloadUrl}>Download LinguaX</a>
              <Link className="lx-btn lx-btn-ghost" to={compatUrl}>Per-model guides</Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
