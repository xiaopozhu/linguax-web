import React, {useEffect, useState} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useDownload} from '@site/src/hooks/useDownload';
import StructuredData from '@site/src/components/StructuredData';
import '@site/src/css/landing.css';

export default function DownloadPage(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const pricingUrl = useBaseUrl('/pricing');
  const changelogUrl = useBaseUrl('/docs/releases/changelog');
  const smoothScrollGuideUrl = useBaseUrl('/docs/use-cases/fix-choppy-mouse-scrolling-macos');
  const sideButtonGuideUrl = useBaseUrl('/docs/use-cases/map-mouse-side-buttons-macos');
  const inputAutomationGuideUrl = useBaseUrl('/docs/use-cases/auto-switch-input-source-app-domain-mac');
  const pttGuideUrl = useBaseUrl('/docs/use-cases/push-to-talk-voice-typing-mac');
  const pageUrl = `${siteConfig.url}${useBaseUrl('/download')}`;
  const pageTitle = translate({
    id: 'landing.download.meta.title',
    message: 'Download LinguaX for macOS – Free Trial, Mouse Enhancement & Input Automation',
    description: 'Download page title'
  });
  const pageDescription = translate({
    id: 'landing.download.meta.description',
    message: 'Download LinguaX and start a full-feature trial for Mouse+ enhancement and input automation on macOS.',
    description: 'Download page meta description'
  });
  const {loading, error, releaseInfo, handleDownload} = useDownload();
  const [attempted, setAttempted] = useState(false);
  const installSteps = [
    {
      icon: '📦',
      id: 'landing.download.install.step1',
      message: 'Open the downloaded .zip file and extract LinguaX.app.',
    },
    {
      icon: '📁',
      id: 'landing.download.install.step2',
      message: 'Move LinguaX.app to your Applications folder.',
    },
    {
      icon: '🔐',
      id: 'landing.download.install.step3',
      message: 'Open LinguaX and grant required permissions (Accessibility and Input Monitoring) when prompted.',
    },
    {
      icon: '✅',
      id: 'landing.download.install.step4',
      message: 'Verify Mouse+ behavior in your most-used app, then add one app rule and one domain rule for input automation.',
    },
  ] as const;

  useEffect(() => {
    if (attempted || loading) {
      return;
    }

    setAttempted(true);
    handleDownload().catch(() => {
      // keep fallback UI visible
    });
  }, [attempted, loading, handleDownload]);

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
    >
      <StructuredData type="product" pagePath="/download" pageName="Download" />
      <Head>
        <link rel="canonical" href={pageUrl} />
        <meta
          name="keywords"
          content={translate({
            id: 'landing.download.meta.keywords',
            message: 'download LinguaX, Mouse+ enhancement for macOS, smooth scrolling macOS utility, mouse gesture mapping Mac, app-specific mouse behavior, input automation app'
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
      <main className="lx-page lx-page-download">
        <section className="lx-hero lx-hero-compact lx-reveal">
          <div className="lx-chip">
            <Translate id="landing.download.hero.chip" description="Download hero chip">Start in under 10 minutes</Translate>
          </div>
          <h1>
            <Translate id="landing.download.hero.title" description="Download hero title">
              Download starts automatically. Here's what to do next.
            </Translate>
          </h1>
          <p>
            <Translate id="landing.download.hero.description" description="Download hero description">
              If it doesn't start, use the button below. Set up takes under 10 minutes — start with smooth scrolling and one mouse button mapping.
            </Translate>
            {releaseInfo?.version ? ` ${translate({
              id: 'landing.download.hero.versionPrefix',
              message: 'Latest version:',
              description: 'Version prefix on download page'
            })} v${releaseInfo.version}.` : ''}
            {' '}
            <a href={changelogUrl}>
              <Translate id="landing.download.hero.changelog" description="Download changelog link">See latest changelog</Translate>
            </a>
          </p>
          <div className="lx-actions">
            <button className="lx-btn lx-btn-primary" type="button" onClick={() => handleDownload()} disabled={loading}>
              {loading ? translate({
                id: 'landing.download.cta.loading',
                message: 'Preparing...',
                description: 'Download button loading state'
              }) : translate({
                id: 'landing.download.cta.download',
                message: 'Download Free',
                description: 'Download button text'
              })}
            </button>
            <a className="lx-btn lx-btn-ghost" href={pricingUrl}>
              <Translate id="landing.download.cta.buyLifetime" description="Buy lifetime button text">Buy Lifetime</Translate>
            </a>
          </div>
          {error ? <p className="lx-inline-error">{error}</p> : null}
        </section>

        <section className="lx-section lx-install-guide lx-reveal">
          <h2>
            <Translate id="landing.download.install.title" description="Download install guide title">
              Setup guide after download
            </Translate>
          </h2>
          <p>
            <Translate id="landing.download.install.description" description="Download install guide description">
              Follow these four steps to install, grant permissions, and complete a simple first setup.
            </Translate>
          </p>
          <ol className="lx-install-steps">
            {installSteps.map((step, index) => (
              <li key={step.id} className="lx-install-step-card">
                <span className="lx-install-step-index">{index + 1}</span>
                <span className="lx-install-step-icon" aria-hidden="true">{step.icon}</span>
                <p className="lx-install-step-text">
                  <Translate id={step.id} description={`Download install guide step ${index + 1}`}>
                    {step.message}
                  </Translate>
                </p>
              </li>
            ))}
          </ol>
          <div className="lx-compat-strip">
            <span style={{fontWeight: 700, color: 'var(--lx-title)', fontSize: '12px'}}>
              <Translate id="landing.download.compat.strip.label" description="Download compat strip label">Requires:</Translate>
            </span>
            {[
              { id: 'landing.download.compat.item1', msg: 'macOS 13 Ventura or later' },
              { id: 'landing.download.compat.item2', msg: 'Apple Silicon or Intel' },
              { id: 'landing.download.compat.item3', msg: 'Accessibility permission' },
              { id: 'landing.download.compat.item4', msg: 'Input Monitoring permission' },
            ].map((item) => (
              <div key={item.id} className="lx-compat-strip-item">
                <span className="lx-compat-dot" />
                <Translate id={item.id} description={`Download compat ${item.id}`}>{item.msg}</Translate>
              </div>
            ))}
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-section-label">
            <Translate id="landing.download.onboard.section.label" description="Download onboard label">First session</Translate>
          </div>
          <h2>
            <Translate id="landing.download.onboard.title" description="Download onboard title">Your first 10 minutes</Translate>
          </h2>
          <p style={{color: 'var(--lx-muted)', fontSize: '14px', marginBottom: '16px'}}>
            <Translate id="landing.download.onboard.description" description="Download onboard description">Don't try to configure everything at once. Start small and add layers.</Translate>
          </p>
          <div className="lx-onboard-grid">
            <div className="lx-onboard-card lx-stagger">
              <div className="lx-onboard-num">1</div>
              <h4><Translate id="landing.download.onboard.card1.title" description="Download onboard card1 title">Enable smooth scrolling</Translate></h4>
              <p><Translate id="landing.download.onboard.card1.description" description="Download onboard card1 description">Go to Mouse+ and turn on smooth scrolling. Adjust the curve until scrolling feels right in your main app.</Translate></p>
              <span className="lx-onboard-tag"><Translate id="landing.download.onboard.card1.tag" description="Download onboard card1 tag">Mouse+ tab</Translate></span>
            </div>
            <div className="lx-onboard-card lx-stagger">
              <div className="lx-onboard-num">2</div>
              <h4><Translate id="landing.download.onboard.card2.title" description="Download onboard card2 title">Map one side button</Translate></h4>
              <p><Translate id="landing.download.onboard.card2.description" description="Download onboard card2 description">Pick the action you'd use most: push-to-talk, app launch, or a system shortcut. One button is enough to start.</Translate></p>
              <span className="lx-onboard-tag"><Translate id="landing.download.onboard.card2.tag" description="Download onboard card2 tag">Mouse+ → Mapping</Translate></span>
            </div>
            <div className="lx-onboard-card lx-stagger">
              <div className="lx-onboard-num">3</div>
              <h4><Translate id="landing.download.onboard.card3.title" description="Download onboard card3 title">Add your first rule</Translate></h4>
              <p><Translate id="landing.download.onboard.card3.description" description="Download onboard card3 description">Set one app rule and one domain rule. LinguaX will switch your input source automatically.</Translate></p>
              <span className="lx-onboard-tag"><Translate id="landing.download.onboard.card3.tag" description="Download onboard card3 tag">Mapping tab</Translate></span>
            </div>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2><Translate id="landing.download.guides.title" description="Download guides section title">Need setup help?</Translate></h2>
          <ul className="lx-guide-list">
            <li>
              <a className="lx-guide-link" href={smoothScrollGuideUrl}>
                〰️ <Translate id="landing.download.guides.item1" description="Download guide item 1">Fix choppy mouse scrolling on macOS</Translate>
                <span className="lx-guide-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a className="lx-guide-link" href={sideButtonGuideUrl}>
                🖱 <Translate id="landing.download.guides.item2" description="Download guide item 2">Map mouse side buttons on macOS</Translate>
                <span className="lx-guide-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a className="lx-guide-link" href={pttGuideUrl}>
                🎙 <Translate id="landing.download.guides.item3" description="Download guide item 3">Set up push-to-talk voice typing with a mouse button</Translate>
                <span className="lx-guide-link-arrow">→</span>
              </a>
            </li>
            <li>
              <a className="lx-guide-link" href={inputAutomationGuideUrl}>
                ⌨️ <Translate id="landing.download.guides.item4" description="Download guide item 4">Auto switch input source by app and domain</Translate>
                <span className="lx-guide-link-arrow">→</span>
              </a>
            </li>
          </ul>
        </section>

        <section className="lx-section lx-reveal">
          <div className="lx-pricing-nudge">
            <div className="lx-pricing-nudge-text">
              <Translate id="landing.download.nudge.text" description="Download pricing nudge text">
                Using LinguaX daily after 30 days? Upgrade to Lifetime to keep your setup running. One-time, no subscription.
              </Translate>
            </div>
            <div style={{textAlign: 'center', flexShrink: 0}}>
              <div className="lx-pricing-nudge-price">
                <Translate id="landing.download.nudge.price" description="Download nudge price">$9.9</Translate>
                <span><Translate id="landing.download.nudge.period" description="Download nudge period">once</Translate></span>
              </div>
              <a className="lx-btn lx-btn-primary" href={pricingUrl} style={{marginTop: '8px', fontSize: '13px', padding: '9px 16px', display: 'block', width: '100%', textAlign: 'center'}}>
                <Translate id="landing.download.nudge.cta" description="Download nudge cta">Upgrade to Lifetime</Translate>
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
