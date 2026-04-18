import type { ReactNode } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDownload } from '@site/src/hooks/useDownload';
import StructuredData from '@site/src/components/StructuredData';
import '@site/src/css/landing.css';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const pricingUrl = useBaseUrl('/pricing');
  const downloadUrl = useBaseUrl('/download');
  const changelogUrl = useBaseUrl('/docs/releases/changelog');
  const smoothScrollGuideUrl = useBaseUrl('/docs/use-cases/fix-choppy-mouse-scrolling-macos');
  const sideButtonGuideUrl = useBaseUrl('/docs/use-cases/map-mouse-side-buttons-macos');
  const logiAlternativeGuideUrl = useBaseUrl('/docs/use-cases/logi-options-plus-alternative-macos');
  const inputAutomationGuideUrl = useBaseUrl('/docs/use-cases/auto-switch-input-source-app-domain-mac');
  const pageUrl = `${siteConfig.url}${useBaseUrl('/')}`;
  const pageTitle = translate({
    id: 'landing.home.meta.title',
    message: 'LinguaX - Mouse Enhancement + Input Automation for macOS',
    description: 'Home page title'
  });
  const pageDescription = translate({
    id: 'landing.home.meta.description',
    message: 'LinguaX gives third-party mice a pro macOS feel, then adds app/domain input automation and shortcut actions. Start free, upgrade once.',
    description: 'Home page description'
  });
  const { releaseInfo } = useDownload();

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
    >
      <StructuredData type="website" pagePath="/" pageName="Home" />
      <Head>
        <link rel="canonical" href={pageUrl} />
        <meta
          name="keywords"
          content={translate({
            id: 'landing.home.meta.keywords',
            message: 'LinguaX, macOS mouse enhancement, smooth scrolling macOS, mouse gesture mapping, mouse button remap Mac, app-specific mouse behavior, input source automation, domain input switching'
          })}
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${siteConfig.url}/img/linguax-home.png`} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteConfig.url}/img/linguax-home.png`} />
      </Head>
      <main className="lx-page">
        <section className="lx-hero lx-reveal">
          <div className="lx-chip">
            <Translate id="landing.home.hero.chip" description="Home hero chip">Mouse-first utility for people who switch contexts often on macOS</Translate>
          </div>
          <h1>
            <Translate id="landing.home.hero.title.line1" description="Home hero title line1">Make your mouse feel right on macOS.</Translate>
            <span className="highlight">
              <Translate id="landing.home.hero.title.line2" description="Home hero title line2">Then keep typing in the right context.</Translate>
            </span>
          </h1>
          <p>
            <Translate id="landing.home.hero.description" description="Home hero description">
              LinguaX starts with Mouse+: smooth scrolling, gesture/button mapping, and app-scoped overrides for third-party mice. It also adds app/domain input automation, so everyday switching feels calmer and more consistent.
            </Translate>
          </p>
          <div className="lx-actions">
            <a className="lx-btn lx-btn-primary" href={downloadUrl}>
              <Translate id="landing.home.cta.download" description="Home download cta">Download Free</Translate>
            </a>
            <a className="lx-btn lx-btn-ghost" href={pricingUrl}>
              <Translate id="landing.home.cta.pricing" description="Home pricing cta">See Pricing</Translate>
            </a>
          </div>
          <div className="lx-note">
            <Translate id="landing.home.note" description="Home note">Full-feature trial available. Lifetime is a one-time purchase.</Translate>
            {releaseInfo?.version ? ` ${translate({
              id: 'landing.home.note.versionPrefix',
              message: 'Current version:',
              description: 'Home current version label'
            })} v${releaseInfo.version}` : ''}
            {' '}
            <a href={changelogUrl}>
              <Translate id="landing.home.note.changelog" description="Home changelog link">See latest changelog</Translate>
            </a>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.pain.title" description="Pain section title">Small frictions that add up every day</Translate></h2>
          <div className="lx-grid lx-grid-3">
            <article className="lx-card lx-card-pain lx-stagger">
              <h3><Translate id="landing.home.pain.card1.title" description="Pain card1 title">Mouse feel changes from app to app</Translate></h3>
              <p><Translate id="landing.home.pain.card1.description" description="Pain card1 description">Scrolling, inertia, and side buttons can feel uneven, especially on third-party mice.</Translate></p>
            </article>
            <article className="lx-card lx-card-pain lx-stagger">
              <h3><Translate id="landing.home.pain.card2.title" description="Pain card2 title">Useful mouse shortcuts are hard to keep stable</Translate></h3>
              <p><Translate id="landing.home.pain.card2.description" description="Pain card2 description">Middle and side buttons can save time, but many tools make mapping harder than it should be.</Translate></p>
            </article>
            <article className="lx-card lx-card-pain lx-stagger">
              <h3><Translate id="landing.home.pain.card3.title" description="Pain card3 title">Input context still interrupts typing</Translate></h3>
              <p><Translate id="landing.home.pain.card3.description" description="Pain card3 description">After mouse behavior improves, manual input switching is often the next thing that breaks focus.</Translate></p>
            </article>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.diff.title" description="Difference section title">What LinguaX tries to do well</Translate></h2>
          <div className="lx-grid lx-grid-3">
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.diff.card1.title" description="Diff card1 title">Mouse+ first, with practical controls</Translate></h3>
              <p><Translate id="landing.home.diff.card1.description" description="Diff card1 description">Smooth scrolling, gesture/button mapping, and per-app overrides are designed for real daily use.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.diff.card2.title" description="Diff card2 title">Input automation stays simple</Translate></h3>
              <p><Translate id="landing.home.diff.card2.description" description="Diff card2 description">App and domain rules work with your mouse and shortcuts, without forcing you into a complicated setup.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.diff.card3.title" description="Diff card3 title">Lightweight, local-first, and low-pressure pricing</Translate></h3>
              <p><Translate id="landing.home.diff.card3.description" description="Diff card3 description">Core behavior runs locally on your Mac. Start with trial and upgrade only if it honestly helps your workflow.</Translate></p>
            </article>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.steps.title" description="Steps title">A friendly way to get started</Translate></h2>
          <div className="lx-grid lx-grid-3">
            <article className="lx-card lx-step lx-stagger">
              <div className="lx-step-num">1</div>
              <h3><Translate id="landing.home.steps.card1.title" description="Step1 title">Start with one Mouse+ improvement</Translate></h3>
              <p><Translate id="landing.home.steps.card1.description" description="Step1 description">Enable smooth scrolling and map one mouse action you will actually use every day.</Translate></p>
            </article>
            <article className="lx-card lx-step lx-stagger">
              <div className="lx-step-num">2</div>
              <h3><Translate id="landing.home.steps.card2.title" description="Step2 title">Add a small input automation layer</Translate></h3>
              <p><Translate id="landing.home.steps.card2.description" description="Step2 description">Set one app rule and one domain rule to remove the most common typing interruptions.</Translate></p>
            </article>
            <article className="lx-card lx-step lx-stagger">
              <div className="lx-step-num">3</div>
              <h3><Translate id="landing.home.steps.card3.title" description="Step3 title">Adjust gently over time</Translate></h3>
              <p><Translate id="landing.home.steps.card3.description" description="Step3 description">Use diagnostics and app-scoped overrides only when needed, and keep your setup easy to maintain.</Translate></p>
            </article>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.shots.title" description="Screenshots section title">Real product, not a concept</Translate></h2>
          <div className="lx-grid lx-grid-4">
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card1.alt',
                  message: 'LinguaX overview with key modules',
                  description: 'Screenshot 1 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-home.png'),
                  dark: useBaseUrl('/img/linguax-home-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card1.caption" description="Screenshot 1 caption">Overview with rule and device status</Translate></figcaption>
            </figure>
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card2.alt',
                  message: 'LinguaX app and input source rule mapping',
                  description: 'Screenshot 2 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-input-method-app-mapping.png'),
                  dark: useBaseUrl('/img/linguax-input-method-app-mapping-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card2.caption" description="Screenshot 2 caption">App and domain input rules</Translate></figcaption>
            </figure>
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card3.alt',
                  message: 'LinguaX Mouse+ enhancement settings',
                  description: 'Screenshot 3 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-mouse.png'),
                  dark: useBaseUrl('/img/linguax-mouse-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card3.caption" description="Screenshot 3 caption">Mouse+ feel tuning and gesture entry</Translate></figcaption>
            </figure>
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card5.alt',
                  message: 'LinguaX settings and permissions',
                  description: 'Screenshot 5 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-settings.png'),
                  dark: useBaseUrl('/img/linguax-settings-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card5.caption" description="Screenshot 5 caption">Permissions, language, updates, and license</Translate></figcaption>
            </figure>
          </div>
        </section>

        <section className="lx-section lx-proof lx-reveal">
          <h2><Translate id="landing.home.audience.title" description="Audience title">Who usually benefits most</Translate></h2>
          <ul className="lx-list">
            <li><Translate id="landing.home.audience.item1" description="Audience item1">People using third-party mice who want smoother scrolling and more reliable button control on macOS.</Translate></li>
            <li><Translate id="landing.home.audience.item2" description="Audience item2">Developers, designers, and operators who rely on repeatable mouse and keyboard actions daily.</Translate></li>
            <li><Translate id="landing.home.audience.item3" description="Audience item3">Multilingual users who also want input automation without adding extra complexity.</Translate></li>
          </ul>
        </section>

        <section className="lx-section lx-reveal">
          <h2>Popular guides for real-world workflows</h2>
          <ul className="lx-list">
            <li><a href={smoothScrollGuideUrl}>How to fix choppy mouse scrolling on macOS</a></li>
            <li><a href={sideButtonGuideUrl}>How to map mouse side buttons on macOS</a></li>
            <li><a href={logiAlternativeGuideUrl}>How to evaluate a Logi Options+ alternative on macOS</a></li>
            <li><a href={inputAutomationGuideUrl}>How to auto switch input source by app and website domain</a></li>
          </ul>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.compat.title" description="Compatibility section title">Compatibility and privacy</Translate></h2>
          <div className="lx-grid lx-grid-3">
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.compat.card1.title" description="Compatibility card1 title">Built for modern macOS</Translate></h3>
              <p><Translate id="landing.home.compat.card1.description" description="Compatibility card1 description">Designed for macOS 13+ on Apple Silicon and Intel, with menu bar style background behavior.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.compat.card2.title" description="Compatibility card2 title">Local-first behavior</Translate></h3>
              <p><Translate id="landing.home.compat.card2.description" description="Compatibility card2 description">Core automation runs locally. Your rules stay on-device, with optional iCloud sync when available in your environment.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.compat.card3.title" description="Compatibility card3 title">Diagnosable and maintainable</Translate></h3>
              <p><Translate id="landing.home.compat.card3.description" description="Compatibility card3 description">Built-in diagnostics and changelog-driven updates help you debug edge cases and keep long-term stability.</Translate></p>
            </article>
          </div>
        </section>

        <section id="download" className="lx-section lx-cta lx-reveal">
          <h2><Translate id="landing.home.cta.title" description="Home CTA title">Try LinguaX in your real routine</Translate></h2>
          <p><Translate id="landing.home.cta.description" description="Home CTA description">Start with a full trial, keep what helps, and ignore what does not.</Translate></p>
          <div className="lx-actions">
            <a className="lx-btn lx-btn-primary" href={downloadUrl}>
              <Translate id="landing.home.cta.download2" description="Home CTA secondary download">Download Free</Translate>
            </a>
            <a className="lx-btn lx-btn-ghost" href={pricingUrl}>
              <Translate id="landing.home.cta.compare" description="Home CTA compare">Compare Plans</Translate>
            </a>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.faq.title" description="Home FAQ title">FAQ</Translate></h2>
          <div className="lx-faq">
            <h3><Translate id="landing.home.faq.q1" description="Home FAQ question1">Is LinguaX mainly for mouse enhancement?</Translate></h3>
            <p><Translate id="landing.home.faq.a1" description="Home FAQ answer1">Yes. Mouse+ is the main focus, with smooth scrolling, gesture/button mapping, and app-specific overrides.</Translate></p>
            <h3><Translate id="landing.home.faq.q2" description="Home FAQ question2">Do I still get input automation?</Translate></h3>
            <p><Translate id="landing.home.faq.a2" description="Home FAQ answer2">Yes. LinguaX also provides app and domain input switching to keep typing aligned with your active context.</Translate></p>
            <h3><Translate id="landing.home.faq.q3" description="Home FAQ question3">What is the pricing model?</Translate></h3>
            <p><Translate id="landing.home.faq.a3" description="Home FAQ answer3">You can start with a full-feature trial and upgrade to Lifetime with one-time pricing when ready.</Translate></p>
            <h3><Translate id="landing.home.faq.q4" description="Home FAQ question4">Is setup complicated?</Translate></h3>
            <p><Translate id="landing.home.faq.a4" description="Home FAQ answer4">Usually no. Most users can get a useful first setup in a few minutes and refine later if needed.</Translate></p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
