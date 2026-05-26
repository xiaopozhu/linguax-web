import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StructuredData from '@site/src/components/StructuredData';
import { friendLinks } from '@site/src/data/friends';
import '@site/src/css/landing.css';
import styles from './friends.module.css';

const CANONICAL_URL = 'https://linguax.app/friends';
const PAGE_TITLE = 'Friends & Link Exchange | LinguaX';
const PAGE_DESCRIPTION =
  'Link exchange details for LinguaX, including reciprocal link information and partner listings.';
const PAGE_KEYWORDS =
  'LinguaX friends, link exchange, reciprocal links, macOS indie software';

const LINK_TO_US = {
  name: 'LinguaX',
  url: 'https://linguax.app',
  description:
    'LinguaX is a mouse-first productivity utility for macOS with smooth scrolling, gesture mapping, and app/domain input automation.',
  logoUrl: 'https://linguax.app/img/linguax.svg',
} as const;

export default function FriendsPage(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <StructuredData type="website" pagePath="/friends" pageName="Friends" />
      <Head>
        <link rel="canonical" href={CANONICAL_URL} />
        <meta name="keywords" content={PAGE_KEYWORDS} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${siteConfig.url}/img/linguax-home.png`} />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={`${siteConfig.url}/img/linguax-home.png`} />
      </Head>

      <main className="lx-page">
        <section className="lx-hero lx-hero-compact">
          <h1>Friends &amp; Link Exchange</h1>
          <div className={styles.intro}>
            <p>
              This page is for reciprocal link exchanges. It is not a list of product
              recommendations.
            </p>
          </div>
        </section>

        <section className="lx-section lx-reveal">
          <h2>Link to LinguaX</h2>
          <article className="lx-card">
            <dl className={styles.linkUs}>
              <div className={styles.linkUsRow}>
                <dt>Site name</dt>
                <dd>{LINK_TO_US.name}</dd>
              </div>
              <div className={styles.linkUsRow}>
                <dt>URL</dt>
                <dd>
                  <a href={LINK_TO_US.url}>{LINK_TO_US.url}</a>
                </dd>
              </div>
              <div className={styles.linkUsRow}>
                <dt>Description</dt>
                <dd>{LINK_TO_US.description}</dd>
              </div>
              <div className={styles.linkUsRow}>
                <dt>Logo</dt>
                <dd>
                  <a href={LINK_TO_US.logoUrl}>{LINK_TO_US.logoUrl}</a>
                </dd>
              </div>
            </dl>
          </article>
        </section>

        <section className="lx-section lx-reveal">
          <h2>Apply for link exchange</h2>
          <article className="lx-card">
            <p>
              If you run a related macOS, productivity, or developer-focused site and would like
              to exchange links, email us at{' '}
              <a href="mailto:hello@linguax.app">hello@linguax.app</a>{' '}
              with:
            </p>
            <ul className={styles.applyList}>
              <li>Your site name and URL</li>
              <li>A one-line description (English)</li>
              <li>Where you plan to link LinguaX</li>
              <li>Optional: logo URL or badge embed code</li>
            </ul>
            <p className="lx-note">We review each request before adding a link here.</p>
          </article>
        </section>

        {friendLinks.length > 0 ? (
          <section className={`lx-section ${styles.partnerSection}`}>
            <h2>Link partners</h2>
            <p className={styles.partnerNote}>
              Sites we currently exchange links with. Listing here does not imply endorsement.
            </p>
            <div className={styles.partnerList}>
              {friendLinks.map((friend) =>
                friend.badge ? (
                  <a
                    key={friend.url}
                    className={styles.partnerLink}
                    href={friend.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={friend.name}
                  >
                    <img
                      src={friend.badge.src}
                      alt={friend.badge.alt}
                      width={friend.badge.width}
                      height={friend.badge.height}
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <a
                    key={friend.url}
                    className={`${styles.partnerLink} ${styles.partnerTextLink}`}
                    href={friend.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {friend.name}
                  </a>
                ),
              )}
            </div>
          </section>
        ) : null}
      </main>
    </Layout>
  );
}
