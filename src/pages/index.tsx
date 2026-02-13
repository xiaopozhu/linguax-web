import type { ReactNode } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useDownload } from '@site/src/hooks/useDownload';
import StructuredData from '@site/src/components/StructuredData';
import '@site/src/css/landing.css';

export default function Home(): ReactNode {
  const pricingUrl = useBaseUrl('/pricing');
  const { releaseInfo, error: downloadError, loading: downloadLoading, handleDownload } = useDownload();

  const onDownloadClick = async (): Promise<void> => {
    await handleDownload();
  };

  return (
    <Layout
      title={translate({
        id: 'landing.home.meta.title',
        message: 'LinguaX - Automatic Input Switching and Mouse Enhancement for macOS',
        description: 'Home page title'
      })}
      description={translate({
        id: 'landing.home.meta.description',
        message: 'LinguaX automatically switches input sources by app and website on macOS, with mouse enhancement built in. Start free and upgrade once.',
        description: 'Home page description'
      })}
    >
      <Head>
        <link rel="preload" href="/fonts/manrope-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-grotesk-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <StructuredData type="website" />
      <main className="lx-page">
        <section className="lx-hero lx-reveal">
          <div className="lx-chip">
            <Translate id="landing.home.hero.chip" description="Home hero chip">Built for developers, designers, and multilingual teams</Translate>
          </div>
          <h1>
            <Translate id="landing.home.hero.title.line1" description="Home hero title line1">Stop context switching.</Translate>
            <span className="highlight">
              <Translate id="landing.home.hero.title.line2" description="Home hero title line2">Keep your flow.</Translate>
            </span>
          </h1>
          <p>
            <Translate id="landing.home.hero.description" description="Home hero description">
              LinguaX automatically sets the right input source when you switch apps or websites, and improves mouse behavior on macOS. Less manual friction, more focused work.
            </Translate>
          </p>
          <div className="lx-actions">
            <button className="lx-btn lx-btn-primary" type="button" onClick={onDownloadClick} disabled={downloadLoading}>
              {downloadLoading ? translate({
                id: 'landing.home.cta.download.loading',
                message: 'Downloading...',
                description: 'Home download loading'
              }) : translate({
                id: 'landing.home.cta.download',
                message: 'Download Free',
                description: 'Home download cta'
              })}
            </button>
            <a className="lx-btn lx-btn-ghost" href={pricingUrl}>
              <Translate id="landing.home.cta.pricing" description="Home pricing cta">See Pricing</Translate>
            </a>
          </div>
          <div className="lx-note">
            <Translate id="landing.home.note" description="Home note">Free plan available. Pro is a one-time purchase.</Translate>
            {releaseInfo?.version ? ` ${translate({
              id: 'landing.home.note.versionPrefix',
              message: 'Current version:',
              description: 'Home current version label'
            })} v${releaseInfo.version}` : ''}
          </div>
          {downloadError ? <p className="lx-inline-error">{downloadError}</p> : null}
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.pain.title" description="Pain section title">The daily pain LinguaX removes</Translate></h2>
          <div className="lx-grid lx-grid-3">
            <article className="lx-card lx-card-pain lx-stagger">
              <h3><Translate id="landing.home.pain.card1.title" description="Pain card1 title">Wrong input source in code editors</Translate></h3>
              <p><Translate id="landing.home.pain.card1.description" description="Pain card1 description">You return to your IDE and start typing in the wrong language. It breaks momentum instantly.</Translate></p>
            </article>
            <article className="lx-card lx-card-pain lx-stagger">
              <h3><Translate id="landing.home.pain.card2.title" description="Pain card2 title">Different language needs by website</Translate></h3>
              <p><Translate id="landing.home.pain.card2.description" description="Pain card2 description">In one browser session, docs, chat, and local sites each need different input behavior.</Translate></p>
            </article>
            <article className="lx-card lx-card-pain lx-stagger">
              <h3><Translate id="landing.home.pain.card3.title" description="Pain card3 title">Inconsistent third-party mouse feel</Translate></h3>
              <p><Translate id="landing.home.pain.card3.description" description="Pain card3 description">Scrolling and pointer behavior often feel disconnected from native macOS experience.</Translate></p>
            </article>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.diff.title" description="Difference section title">What makes LinguaX different</Translate></h2>
          <div className="lx-grid lx-grid-3">
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.diff.card1.title" description="Diff card1 title">Input + Mouse in one product</Translate></h3>
              <p><Translate id="landing.home.diff.card1.description" description="Diff card1 description">Most tools solve one side only. LinguaX reduces friction across typing and pointer workflows together.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.diff.card2.title" description="Diff card2 title">App rules + Website rules</Translate></h3>
              <p><Translate id="landing.home.diff.card2.description" description="Diff card2 description">Automate by application and by domain, so browser workflows can be as precise as desktop app workflows.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.diff.card3.title" description="Diff card3 title">One-time pricing, clear ROI</Translate></h3>
              <p><Translate id="landing.home.diff.card3.description" description="Diff card3 description">No recurring subscription pressure. Validate value first with Free, then upgrade once if it pays back.</Translate></p>
            </article>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.steps.title" description="Steps title">How it works in 3 steps</Translate></h2>
          <div className="lx-grid lx-grid-3">
            <article className="lx-card lx-step lx-stagger">
              <div className="lx-step-num">1</div>
              <h3><Translate id="landing.home.steps.card1.title" description="Step1 title">Set your default rules</Translate></h3>
              <p><Translate id="landing.home.steps.card1.description" description="Step1 description">Assign input sources to apps and websites you use every day.</Translate></p>
            </article>
            <article className="lx-card lx-step lx-stagger">
              <div className="lx-step-num">2</div>
              <h3><Translate id="landing.home.steps.card2.title" description="Step2 title">Switch context as usual</Translate></h3>
              <p><Translate id="landing.home.steps.card2.description" description="Step2 description">LinguaX tracks foreground app and active website context in real time.</Translate></p>
            </article>
            <article className="lx-card lx-step lx-stagger">
              <div className="lx-step-num">3</div>
              <h3><Translate id="landing.home.steps.card3.title" description="Step3 title">Stay in flow</Translate></h3>
              <p><Translate id="landing.home.steps.card3.description" description="Step3 description">Input source and mouse behavior match your context automatically.</Translate></p>
            </article>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.shots.title" description="Screenshots section title">Real interface, real control</Translate></h2>
          <div className="lx-grid lx-grid-4">
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card1.alt',
                  message: 'LinguaX overview panel',
                  description: 'Screenshot 1 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-home.png'),
                  dark: useBaseUrl('/img/linguax-home-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card1.caption" description="Screenshot 1 caption">Overview and module entry</Translate></figcaption>
            </figure>
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card2.alt',
                  message: 'LinguaX app input source mapping',
                  description: 'Screenshot 2 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-input-method-app-mapping.png'),
                  dark: useBaseUrl('/img/linguax-input-method-app-mapping-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card2.caption" description="Screenshot 2 caption">App-based input source rules</Translate></figcaption>
            </figure>
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card3.alt',
                  message: 'LinguaX mouse enhancement',
                  description: 'Screenshot 3 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-mouse.png'),
                  dark: useBaseUrl('/img/linguax-mouse-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card3.caption" description="Screenshot 3 caption">Mouse+ smooth scrolling</Translate></figcaption>
            </figure>
            <figure className="lx-shot lx-stagger">
              <ThemedImage
                alt={translate({
                  id: 'landing.home.shots.card5.alt',
                  message: 'LinguaX general settings',
                  description: 'Screenshot 5 alt'
                })}
                sources={{
                  light: useBaseUrl('/img/linguax-settings.png'),
                  dark: useBaseUrl('/img/linguax-settings-dark.png')
                }}
              />
              <figcaption><Translate id="landing.home.shots.card5.caption" description="Screenshot 5 caption">General preferences and options</Translate></figcaption>
            </figure>
          </div>
        </section>

        <section className="lx-section lx-proof lx-reveal">
          <h2><Translate id="landing.home.audience.title" description="Audience title">Who gets the most value</Translate></h2>
          <ul className="lx-list">
            <li><Translate id="landing.home.audience.item1" description="Audience item1">Developers switching between IDE, terminal, and communication apps.</Translate></li>
            <li><Translate id="landing.home.audience.item2" description="Audience item2">Designers who rely on stable shortcuts and consistent pointer behavior.</Translate></li>
            <li><Translate id="landing.home.audience.item3" description="Audience item3">Multilingual professionals working across local and global websites.</Translate></li>
          </ul>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.compat.title" description="Compatibility section title">Compatibility and privacy</Translate></h2>
          <div className="lx-grid lx-grid-3">
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.compat.card1.title" description="Compatibility card1 title">Built for modern macOS</Translate></h3>
              <p><Translate id="landing.home.compat.card1.description" description="Compatibility card1 description">Designed for Apple Silicon and current macOS releases with lightweight background usage.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.compat.card2.title" description="Compatibility card2 title">Local-first behavior</Translate></h3>
              <p><Translate id="landing.home.compat.card2.description" description="Compatibility card2 description">Core input switching runs on-device. Your daily switching behavior does not depend on constant cloud connectivity.</Translate></p>
            </article>
            <article className="lx-card lx-stagger">
              <h3><Translate id="landing.home.compat.card3.title" description="Compatibility card3 title">Small, focused utility</Translate></h3>
              <p><Translate id="landing.home.compat.card3.description" description="Compatibility card3 description">Menu bar style interaction with minimal setup. Configure once and let the rules handle repetitive context changes.</Translate></p>
            </article>
          </div>
        </section>

        <section id="download" className="lx-section lx-cta lx-reveal">
          <h2><Translate id="landing.home.cta.title" description="Home CTA title">Run it for one day in your real workflow</Translate></h2>
          <p><Translate id="landing.home.cta.description" description="Home CTA description">Try all features free for 30 days. Upgrade only if it proves valuable.</Translate></p>
          <div className="lx-actions">
            <button className="lx-btn lx-btn-primary" type="button" onClick={onDownloadClick} disabled={downloadLoading}>
              {downloadLoading ? translate({
                id: 'landing.home.cta.download.loading2',
                message: 'Downloading...',
                description: 'Home CTA secondary loading'
              }) : translate({
                id: 'landing.home.cta.download2',
                message: 'Download Free',
                description: 'Home CTA secondary download'
              })}
            </button>
            <a className="lx-btn lx-btn-ghost" href={pricingUrl}>
              <Translate id="landing.home.cta.compare" description="Home CTA compare">Compare Plans</Translate>
            </a>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.home.faq.title" description="Home FAQ title">FAQ</Translate></h2>
          <div className="lx-faq">
            <h3><Translate id="landing.home.faq.q1" description="Home FAQ question1">Does LinguaX require constant internet access?</Translate></h3>
            <p><Translate id="landing.home.faq.a1" description="Home FAQ answer1">No. Core input switching behavior runs locally on your Mac.</Translate></p>
            <h3><Translate id="landing.home.faq.q2" description="Home FAQ question2">Can I use the free version long-term?</Translate></h3>
            <p><Translate id="landing.home.faq.a2" description="Home FAQ answer2">Yes. Free covers core use cases. Pro unlocks full rule depth and advanced control.</Translate></p>
            <h3><Translate id="landing.home.faq.q3" description="Home FAQ question3">Do I get updates after purchase?</Translate></h3>
            <p><Translate id="landing.home.faq.a3" description="Home FAQ answer3">Yes. Lifetime includes ongoing updates and fixes.</Translate></p>
            <h3><Translate id="landing.home.faq.q4" description="Home FAQ question4">Why one-time pricing?</Translate></h3>
            <p><Translate id="landing.home.faq.a4" description="Home FAQ answer4">To keep adoption simple and align payment with long-term productivity value.</Translate></p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
