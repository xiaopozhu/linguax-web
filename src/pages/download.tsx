import React, {useEffect, useState} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useDownload} from '@site/src/hooks/useDownload';
import '@site/src/css/landing.css';

export default function DownloadPage(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const pricingUrl = useBaseUrl('/pricing');
  const changelogUrl = useBaseUrl('/docs/releases/changelog');
  const pageUrl = `${siteConfig.url}${useBaseUrl('/download')}`;
  const pageTitle = translate({
    id: 'landing.download.meta.title',
    message: 'Download LinguaX',
    description: 'Download page title'
  });
  const pageDescription = translate({
    id: 'landing.download.meta.description',
    message: 'Download LinguaX free trial for macOS.',
    description: 'Download page meta description'
  });
  const {loading, error, releaseInfo, handleDownload} = useDownload();
  const [attempted, setAttempted] = useState(false);
  const installSteps = [
    {
      icon: '📦',
      id: 'landing.download.install.step1',
      message: 'After download, open your Downloads folder and find the LinguaX .zip file.',
    },
    {
      icon: '🗜️',
      id: 'landing.download.install.step2',
      message: 'Double-click the .zip file to extract LinguaX.app.',
    },
    {
      icon: '📁',
      id: 'landing.download.install.step3',
      message: 'Drag LinguaX.app into the Applications folder.',
    },
    {
      icon: '✅',
      id: 'landing.download.install.step4',
      message: 'Open LinguaX from Applications. If macOS shows a security prompt on first launch, allow it from System Settings.',
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
      <Head>
        <meta
          name="keywords"
          content={translate({
            id: 'landing.download.meta.keywords',
            message: 'download LinguaX, LinguaX for macOS, input method switcher macOS, mouse smooth scroll macOS, Logitech MX Master smooth scrolling, macOS mouse gestures, one-time purchase utility'
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
            <Translate id="landing.download.hero.chip" description="Download hero chip">Download</Translate>
          </div>
          <h1>
            <Translate id="landing.download.hero.title" description="Download hero title">Your download is starting</Translate>
          </h1>
          <p>
            <Translate id="landing.download.hero.description" description="Download hero description">
              If it does not start automatically, click the button below.
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
              How to install after download
            </Translate>
          </h2>
          <p>
            <Translate id="landing.download.install.description" description="Download install guide description">
              LinguaX is downloaded as a .zip file. Please unzip it first, then move the extracted app into Applications.
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
        </section>
      </main>
    </Layout>
  );
}
