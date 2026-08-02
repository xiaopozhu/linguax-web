import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, { translate } from '@docusaurus/Translate';
import MouseCompatTable from '@site/src/components/MouseCompatTable';
import data from '@site/src/data/mouse-compatibility.json';
import '@site/src/css/landing.css';
import styles from './mouse-compatibility.module.css';

export default function MouseCompatibilityPage() {
  const downloadUrl = useBaseUrl('/download');
  const compatDocUrl = useBaseUrl('/docs/mouse-plus/device-compatibility');
  const buttonMappingUrl = useBaseUrl('/docs/mouse-plus/fundamentals/button-mapping');
  const pairToolUrl = useBaseUrl('/tools/pair-logitech-receiver');
  const scrollToolUrl = useBaseUrl('/tools/mouse-scroll-test');

  const count = data.modelCount;

  const pageTitle = translate({
    id: 'compatTool.meta.title',
    message: 'Mac mouse compatibility database — Logitech button slots by model',
    description: 'HTML <title> for the mouse compatibility database page',
  });
  const pageDescription = translate(
    {
      id: 'compatTool.meta.description',
      message:
        'Which buttons on {count} mice can actually be remapped on macOS, listed per model with USB IDs and named slots. No driver, no Logi Options+.',
      description: 'HTML <meta description> for the mouse compatibility database page',
    },
    { count },
  );

  const FAQ = [
    {
      q: translate({ id: 'compatTool.faq.slot.q', message: 'What is a “slot”?' }),
      a: translate({
        id: 'compatTool.faq.slot.a',
        message:
          'A named position on the mouse rather than a raw button number. macOS reports side buttons by index, and those indices differ between devices and even between connection types. Naming them — S1, S2, T for the thumb button, SM for the scroll-mode key, WL/WR for wheel tilt — means one mapping recipe works across every mouse in a family instead of being tied to one model.',
      }),
    },
    {
      q: translate({
        id: 'compatTool.faq.missing.q',
        message: 'My mouse is not listed. Does that mean it will not work?',
      }),
      a: translate({
        id: 'compatTool.faq.missing.a',
        message:
          "No. Smooth scrolling, pointer speed and click-based side buttons work on virtually any USB or Bluetooth mouse through the universal HID engine, with no driver. If your mouse is close to a listed model, a manual model-binding option lets you attach it to that model's profile and get its named slots (thumb button, scroll-mode key, wheel tilt, special keys) too. Being on this list is what makes that recognition automatic — those slots light up the moment you plug it in, no manual step. Models are added on a rolling basis.",
      }),
    },
    {
      q: translate({
        id: 'compatTool.faq.dpi.q',
        message: 'Why is there no DPI or SmartShift column?',
      }),
      a: translate({
        id: 'compatTool.faq.dpi.a',
        message:
          'Because there is no honest per-model answer. Support for adjustable DPI and scroll-wheel mode is discovered when the mouse connects, by asking the device what it implements — it is not derived from the model name, and it can differ with firmware revision and connection type on the same model. A yes/no column would be guesswork dressed up as data, so this table does not have one.',
      }),
    },
    {
      q: translate({ id: 'compatTool.faq.source.q', message: 'Where does this data come from?' }),
      a: translate({
        id: 'compatTool.faq.source.a',
        message:
          'It is generated directly from the recognition list that ships inside LinguaX, not compiled by hand. USB IDs and slot configurations are exactly what the app matches against, and the same sync script has a check mode that flags any drift between the two — so this is never a hand-typed copy going quietly stale.',
      }),
    },
    {
      q: translate({
        id: 'compatTool.faq.magic.q',
        message: 'Magic Mouse 2 is listed but shows no slots. Why?',
      }),
      a: translate({
        id: 'compatTool.faq.magic.a',
        message:
          'It is recognised, but it exposes no mappable buttons — there is nothing to remap. macOS already drives its touch surface and gestures natively, so LinguaX deliberately hides it from the device list rather than showing an empty configuration screen.',
      }),
    },
    {
      q: translate({
        id: 'compatTool.faq.howto.q',
        message: 'How do I actually map these buttons?',
      }),
      a: translate({
        id: 'compatTool.faq.howto.a',
        message:
          'Install LinguaX, connect the mouse, and it appears with its named slots already detected. Each slot accepts click, double-click, long press, four-directional swipe and modifier-hold, so one physical button can carry several actions. macOS 13+, ~10 MB native, 30-day free trial.',
      }),
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
            <Translate
              id="compatTool.hero.chip"
              description="Hero chip tag"
              values={{ count }}
            >
              {'Works with any USB or Bluetooth mouse · {count} models auto-detected · macOS 13+'}
            </Translate>
          </div>
          <h1 className={styles.toolTitle}>
            <Translate
              id="compatTool.hero.title"
              description="Hero title with highlighted phrase; place {here} where the language's word order fits, and keep {count}"
              values={{
                count,
                here: (
                  <span className="highlight">
                    <Translate
                      id="compatTool.hero.title.here"
                      description="Highlighted phrase within the hero title"
                    >
                      any mouse
                    </Translate>
                  </span>
                ),
              }}
            >
              {'Remap {here} on a Mac — {count} models come with named button slots'}
            </Translate>
          </h1>
          <p className={styles.toolSubhead}>
            <Translate
              id="compatTool.hero.subhead"
              description="Hero subtitle"
              values={{ count }}
            >
              {'Any USB or Bluetooth mouse works through the universal HID engine — smooth scrolling, pointer speed, click-based side buttons. The {count} models below are additionally recognised by USB ID: their special keys (thumb button, wheel tilt, scroll-mode) appear with named slots the moment you plug them in. Useful before you buy a mouse, and for settling arguments about what a given model exposes to macOS.'}
            </Translate>
          </p>
          <div className={styles.microTrust}>
            <span>
              <Translate id="compatTool.hero.trust.source" description="Trust line: data source">
                📦 Generated from the app, not hand-maintained
              </Translate>
            </span>
            <span>·</span>
            <span>
              <Translate id="compatTool.hero.trust.driver" description="Trust line: no driver">
                🚫 No driver, no Logi Options+
              </Translate>
            </span>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2>
            <Translate id="compatTool.table.title">
              Logitech and other mice: button slots on macOS
            </Translate>
          </h2>
          <p className="lx-section-desc">
            <Translate id="compatTool.table.desc">
              Not being on this list does not mean unsupported. Any USB or Bluetooth mouse works
              through the universal HID engine — smooth scrolling, pointer speed and side-button
              clicks — and unlisted mice can be manually bound to a listed profile to get its
              named slots too. What the list adds is automatic recognition by USB ID: for the
              models below, the named slots (thumb button, wheel tilt, scroll-mode key) are
              detected on connect, no manual step. Filter by brand, or follow a model through to
              its setup guide where one exists.
            </Translate>
          </p>
          <MouseCompatTable />
        </section>

        <section className={`lx-section lx-reveal ${styles.explainSection}`}>
          <div className="lx-section-label">
            <Translate id="compatTool.method.label" description="Method section label">
              Method
            </Translate>
          </div>
          <h2>
            <Translate id="compatTool.method.title">How this data is determined</Translate>
          </h2>

          <h3>
            <Translate id="compatTool.method.slots.title">
              Slot configuration: a fixed per-model definition
            </Translate>
          </h3>
          <p>
            <Translate id="compatTool.method.slots.body">
              Which physical inputs a mouse has, and what each one is called, is fixed per model.
              It is not something software can interrogate the device about — it is a definition
              maintained against real hardware, which is why this is a table rather than a live
              probe. The USB IDs in the second column are exactly what the app matches against.
            </Translate>
          </p>

          <h3>
            <Translate id="compatTool.method.dpi.title">
              Why DPI and scroll-mode support are not listed
            </Translate>
          </h3>
          <p>
            <Translate id="compatTool.method.dpi.body">
              Those capabilities are established when the mouse connects, by asking the device what
              it supports — not by looking up the model. Two units of the same model on different
              firmware, or the same unit over a receiver versus Bluetooth, can answer differently.
              Publishing a per-model yes/no column would therefore be guesswork presented as fact.
              The app finds out at connection time; a static page cannot.
            </Translate>
          </p>

          <h3>
            <Translate id="compatTool.method.drift.title">Keeping it honest over time</Translate>
          </h3>
          <p>
            <Translate id="compatTool.method.drift.body">
              This page is generated from the app’s own recognition list by a sync script, which
              also has a check mode that reports any disagreement between the two. When a model is
              added to the app, regenerating is a one-line command — so the table is never a
              hand-typed copy that someone has to remember to update.
            </Translate>
          </p>
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-section-label">
            <Translate id="compatTool.faq.label" description="FAQ section label">
              FAQ
            </Translate>
          </div>
          <h2>
            <Translate id="compatTool.faq.title">Frequently asked questions</Translate>
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
              <Translate id="compatTool.cta.headline" description="CTA headline">
                Found your mouse? Put those buttons to work.
              </Translate>
              <span>
                <Translate id="compatTool.cta.sub" description="CTA subtext">
                  Named slots detected automatically, with gestures, per-app behaviour and
                  push-to-talk — LinguaX, ~10 MB native, one-time $9.9.
                </Translate>
              </span>
            </div>
            <div className="lx-actions">
              <a className="lx-btn lx-btn-primary" href={downloadUrl}>
                <Translate id="compatTool.cta.download" description="CTA download button">
                  Download LinguaX
                </Translate>
              </a>
              <Link className="lx-btn lx-btn-ghost" to={buttonMappingUrl}>
                <Translate id="compatTool.cta.mapping" description="CTA button mapping link">
                  How mapping works
                </Translate>
              </Link>
            </div>
          </div>
        </section>

        <section className={`lx-section lx-reveal ${styles.explainSection}`}>
          <h3>
            <Translate id="compatTool.related.title">Related</Translate>
          </h3>
          <ul className={styles.relatedList}>
            <li>
              <Link to={compatDocUrl}>
                <Translate id="compatTool.related.doc">
                  Device compatibility: recognition tiers, HID++ and battery
                </Translate>
              </Link>
            </li>
            <li>
              <Link to={pairToolUrl}>
                <Translate id="compatTool.related.pair">
                  Pair a Logitech receiver in your browser
                </Translate>
              </Link>
            </li>
            <li>
              <Link to={scrollToolUrl}>
                <Translate id="compatTool.related.scroll">
                  Measure your mouse wheel against your trackpad
                </Translate>
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
