// Adapted from Docusaurus theme-classic SiteMetadata (MIT).
import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useLocation} from '@docusaurus/router';
import {PageMetadata, useThemeConfig} from '@docusaurus/theme-common';
import {DEFAULT_SEARCH_TAG, keyboardFocusedClassName} from '@docusaurus/theme-common/internal';
import SearchMetadata from '@theme/SearchMetadata';
import {getPageSeoPolicy, type LocaleManifest} from '@site/src/utils/seoPolicy.mjs';

export default function SiteMetadata(): ReactNode {
  const {siteConfig, i18n} = useDocusaurusContext();
  const {pathname} = useLocation();
  const manifest = usePluginData('linguax-seo') as unknown as LocaleManifest;
  const {metadata, image} = useThemeConfig();
  const policy = getPageSeoPolicy(manifest, pathname, siteConfig.url);
  const ogLocale = (language: string) => language.replace('-', '_');

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <body className={keyboardFocusedClassName} />
        <html lang={policy.contentLanguage} />
        <link rel="canonical" href={policy.canonicalUrl} />
        <meta property="og:url" content={policy.canonicalUrl} />
        <meta property="og:locale" content={ogLocale(policy.contentLanguage)} />
        {policy.alternates.map(({language, url}) => (
          <link key={language} rel="alternate" hrefLang={language} href={url} />
        ))}
        {policy.alternates
          .filter(({language}) => language !== 'x-default' && language !== policy.contentLanguage)
          .map(({language}) => (
            <meta key={language} property="og:locale:alternate" content={ogLocale(language)} />
          ))}
      </Head>
      {image && <PageMetadata image={image} />}
      <SearchMetadata tag={DEFAULT_SEARCH_TAG} locale={i18n.currentLocale} />
      <Head>
        {metadata.map((metadatum, index) => <meta key={index} {...metadatum} />)}
      </Head>
    </>
  );
}
