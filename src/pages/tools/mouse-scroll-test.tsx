import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, { translate } from '@docusaurus/Translate';
import ScrollTester from '@site/src/components/ScrollTester';
import '@site/src/css/landing.css';
import styles from './mouse-scroll-test.module.css';

export default function MouseScrollTestPage() {
  const downloadUrl = useBaseUrl('/download');
  const fixGuideUrl = useBaseUrl('/docs/mouse-plus/recipes/fix-choppy-mouse-scrolling-macos');
  const smoothDocUrl = useBaseUrl('/docs/mouse-plus/fundamentals/smooth-scrolling');
  const pairToolUrl = useBaseUrl('/tools/pair-logitech-receiver');

  const pageTitle = translate({
    id: 'scrollTool.meta.title',
    message: 'Mac mouse scroll test — why wheel scrolling feels choppy',
    description: 'HTML <title> for the scroll test tool page',
  });
  const pageDescription = translate({
    id: 'scrollTool.meta.description',
    message:
      'Record what your trackpad and your mouse wheel actually send to macOS, drawn side by side on one shared scale. Runs in any browser, nothing to install.',
    description: 'HTML <meta description> for the scroll test tool page',
  });

  const FAQ = [
    {
      q: translate({
        id: 'scrollTool.faq.why.q',
        message: 'Why does my mouse scroll feel choppy on a Mac when the trackpad feels fine?',
      }),
      a: translate({
        id: 'scrollTool.faq.why.a',
        message:
          'Because the two devices send fundamentally different signals. A trackpad reports a continuously varying distance many times per second, and keeps reporting after your fingers lift — that decay is the inertia you feel. A wheel reports the same fixed detent value every click, with nothing in between. macOS applies the wheel value directly, so the page moves in hard steps. The test on this page shows both signals on one scale.',
      }),
    },
    {
      q: translate({
        id: 'scrollTool.faq.expensive.q',
        message: 'Will a more expensive mouse fix choppy scrolling on macOS?',
      }),
      a: translate({
        id: 'scrollTool.faq.expensive.a',
        message:
          'Usually not. The step size is a property of the wheel encoder, not of price. Some high-resolution wheels do report finer steps, and the test will show that as a higher distinct-step-sizes count. But most mice — including premium ones — report a single repeated value, and no amount of hardware spend changes how macOS interpolates it, because there is nothing to interpolate.',
      }),
    },
    {
      q: translate({
        id: 'scrollTool.faq.distinct.q',
        message: 'What does “distinct step sizes” mean?',
      }),
      a: translate({
        id: 'scrollTool.faq.distinct.a',
        message:
          'It counts how many different scroll distances your device reported during one recording, after rounding to two decimals to discard floating-point noise. A trackpad typically produces dozens because every event differs slightly. A wheel often produces exactly one. That single number is the clearest summary of why the two feel different.',
      }),
    },
    {
      q: translate({
        id: 'scrollTool.faq.hardware.q',
        message: 'Is this reading my hardware directly?',
      }),
      a: translate({
        id: 'scrollTool.faq.hardware.a',
        message:
          'No. It reads the standard wheel events the browser receives, which is one layer above the device: macOS has already applied its own scroll handling, and the browser may coalesce events under load. Absolute numbers therefore differ between browsers and macOS versions. The comparison between your two devices on the same machine is the meaningful result, not the raw magnitudes.',
      }),
    },
    {
      q: translate({
        id: 'scrollTool.faq.browser.q',
        message: 'Which browsers does this work in?',
      }),
      a: translate({
        id: 'scrollTool.faq.browser.a',
        message:
          'All of them, including Safari and Firefox. The test only uses the standard wheel DOM event, so there is no WebHID requirement and no device permission prompt. Nothing is uploaded and nothing is stored — reload the page and the recordings are gone.',
      }),
    },
    {
      q: translate({
        id: 'scrollTool.faq.fix.q',
        message: 'Can choppy wheel scrolling actually be fixed?',
      }),
      a: translate({
        id: 'scrollTool.faq.fix.a',
        message:
          'Yes, in software. The missing in-between frames a wheel never sends can be generated: each detent becomes a short eased animation instead of an instant jump. LinguaX does this for any USB or Bluetooth mouse on macOS 13+, with tunable Min Step, Speed Gain and Duration, a per-app on/off override, and the trackpad passed through untouched.',
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
            <Translate id="scrollTool.hero.chip" description="Hero chip tag">
              Web tool · Any browser · No install
            </Translate>
          </div>
          <h1 className={styles.toolTitle}>
            <Translate
              id="scrollTool.hero.title"
              description="Hero title with highlighted phrase; put {here} wherever the language's natural word order places it"
              values={{
                here: (
                  <span className="highlight">
                    <Translate
                      id="scrollTool.hero.title.here"
                      description="Highlighted phrase within the hero title"
                    >
                      measure it yourself
                    </Translate>
                  </span>
                ),
              }}
            >
              {'Mouse scrolling feels choppy on a Mac — {here}'}
            </Translate>
          </h1>
          <p className={styles.toolSubhead}>
            <Translate id="scrollTool.hero.subhead" description="Hero subtitle">
              Scroll in each box below. This records exactly what macOS hands to software on every
              scroll event and draws both devices on one shared scale. The reason the wheel feels
              worse is visible in about two seconds.
            </Translate>
          </p>

          <div className={styles.microTrust}>
            <span>
              <Translate id="scrollTool.hero.trust.install" description="Trust line: no install">
                🔌 No install
              </Translate>
            </span>
            <span>·</span>
            <span>
              <Translate id="scrollTool.hero.trust.local" description="Trust line: local only">
                🔒 Measured locally in your browser
              </Translate>
            </span>
            <span>·</span>
            <span>
              <Translate id="scrollTool.hero.trust.privacy" description="Trust line: nothing stored">
                🚫 Nothing uploaded, nothing stored
              </Translate>
            </span>
          </div>

          <div className={styles.testerSpotlight}>
            <ScrollTester />
          </div>
        </section>

        <section className={`lx-section lx-reveal ${styles.explainSection}`}>
          <div className={styles.explainHead}>
            <span className="lx-section-label">
              <Translate id="scrollTool.explain.label" description="Explain section label">
                Reading the result
              </Translate>
            </span>
            <h2 className={styles.explainTitle}>
              <Translate id="scrollTool.explain.title" description="Explain section title">
                What you are looking at
              </Translate>
            </h2>
          </div>

          <p>
            <Translate id="scrollTool.explain.intro">
              Each vertical line is one scroll event, placed by when it arrived and sized by how far
              it asked the page to move. Both panels use the same bar width and the same vertical
              scale, so the two shapes are directly comparable.
            </Translate>
          </p>

          <h3>
            <Translate id="scrollTool.explain.metric.title">
              Distinct step sizes is the number that matters
            </Translate>
          </h3>
          <p>
            <Translate id="scrollTool.explain.metric.body">
              A trackpad reports a continuously varying distance on every event, and keeps sending
              events after your fingers leave the surface. A wheel reports a fixed detent, over and
              over. Trackpads typically produce dozens of distinct values; wheels often produce
              exactly one.
            </Translate>
          </p>
          <p>
            <Translate id="scrollTool.explain.metric.conclusion">
              That single number is the whole story. macOS has nothing to interpolate between when a
              wheel sends the same jump every time, so it moves the page in hard steps. Nothing is
              broken, and a more expensive mouse will not change it — it is what the hardware
              reports.
            </Translate>
          </p>

          <h3>
            <Translate id="scrollTool.explain.limits.title">Method and limits</Translate>
          </h3>
          <p>
            <Translate id="scrollTool.explain.limits.body">
              Recording uses the standard wheel DOM event. Each panel starts on your first event and
              stops after 500 ms of stillness. Values are what the browser exposes, which sits one
              layer above the raw device — macOS has already applied its own scroll handling, and
              browsers may coalesce events under load. Compare your two devices on one machine
              rather than comparing absolute numbers across machines.
            </Translate>
          </p>
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-section-label">
            <Translate id="scrollTool.faq.label" description="FAQ section label">
              FAQ
            </Translate>
          </div>
          <h2>
            <Translate id="scrollTool.faq.title" description="FAQ section title">
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
              <Translate id="scrollTool.cta.headline" description="CTA headline">
                Turn the left-hand shape into the right-hand one.
              </Translate>
              <span>
                <Translate id="scrollTool.cta.sub" description="CTA subtext">
                  Smooth scrolling for any USB or Bluetooth mouse, with a per-app on/off switch and
                  the trackpad left untouched — LinguaX, ~10 MB native, one-time $9.9.
                </Translate>
              </span>
            </div>
            <div className="lx-actions">
              <a className="lx-btn lx-btn-primary" href={downloadUrl}>
                <Translate id="scrollTool.cta.download" description="CTA download button">
                  Download LinguaX
                </Translate>
              </a>
              <Link className="lx-btn lx-btn-ghost" to={fixGuideUrl}>
                <Translate id="scrollTool.cta.guide" description="CTA fix guide link">
                  How to fix it
                </Translate>
              </Link>
            </div>
          </div>
        </section>

        <section className={`lx-section lx-reveal ${styles.explainSection}`}>
          <h3>
            <Translate id="scrollTool.related.title">Related</Translate>
          </h3>
          <ul className={styles.relatedList}>
            <li>
              <Link to={fixGuideUrl}>
                <Translate id="scrollTool.related.fix">
                  Fix choppy mouse scrolling on macOS
                </Translate>
              </Link>
            </li>
            <li>
              <Link to={smoothDocUrl}>
                <Translate id="scrollTool.related.smooth">
                  How smooth scrolling works (Min Step, Speed Gain, Duration)
                </Translate>
              </Link>
            </li>
            <li>
              <Link to={pairToolUrl}>
                <Translate id="scrollTool.related.pair">
                  Pair a Logitech receiver in your browser
                </Translate>
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
