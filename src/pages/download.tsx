import React, {useEffect, useState} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useDownload} from '@site/src/hooks/useDownload';
import '@site/src/css/landing.css';

export default function DownloadPage(): React.JSX.Element {
  const pricingUrl = useBaseUrl('/pricing');
  const {loading, error, releaseInfo, handleDownload} = useDownload();
  const [attempted, setAttempted] = useState(false);

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
      title={translate({
        id: 'landing.download.meta.title',
        message: 'Download LinguaX',
        description: 'Download page title'
      })}
      description={translate({
        id: 'landing.download.meta.description',
        message: 'Download LinguaX free trial for macOS.',
        description: 'Download page meta description'
      })}
    >
      <main className="lx-page">
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
      </main>
    </Layout>
  );
}
