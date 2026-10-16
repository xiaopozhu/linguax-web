import React from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import facts from '@site/data/public-product-facts.json';

interface StructuredDataProps {
  type?: 'website' | 'product';
  pagePath?: string;
  pageName?: string;
}

export default function StructuredData({
  type = 'website',
  pagePath = '/',
  pageName = 'LinguaX',
}: StructuredDataProps): React.ReactElement {
  const {siteConfig, i18n} = useDocusaurusContext();
  const pageUrl = new URL(useBaseUrl(pagePath), siteConfig.url).href;
  const localizedHomeUrl = useBaseUrl('/', {absolute: true});
  const locale = i18n.currentLocale as keyof typeof facts.locales;
  const language = facts.locales[locale]?.language ?? i18n.currentLocale;
  const organizationId = `${facts.urls.home}#organization`;
  const websiteId = `${facts.urls.home}#website`;
  const softwareId = `${facts.urls.home}#software`;
  const pageId = `${pageUrl}#webpage`;

  const organization = {
    '@type': 'Organization',
    '@id': organizationId,
    name: facts.publisher.name,
    url: facts.publisher.url,
    logo: {'@type': 'ImageObject', url: facts.publisher.logo},
    sameAs: facts.publisher.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      email: facts.publisher.email,
      contactType: 'Customer Support',
    },
  };
  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    name: facts.product.name,
    url: facts.urls.home,
    publisher: {'@id': organizationId},
    inLanguage: Object.values(facts.locales).map(({language: localeLanguage}) => localeLanguage),
  };
  const software = {
    '@type': 'SoftwareApplication',
    '@id': softwareId,
    name: facts.product.name,
    description: facts.product.description,
    applicationCategory: facts.product.applicationCategory,
    applicationSubCategory: facts.product.applicationSubCategory,
    operatingSystem: `${facts.product.operatingSystem.name} ${facts.product.operatingSystem.minimumVersion}+`,
    softwareRequirements: `${facts.product.operatingSystem.name} ${facts.product.operatingSystem.minimumVersion}+; ${facts.product.operatingSystem.architectures.join(' or ')}`,
    softwareVersion: facts.product.currentRelease.version,
    dateModified: facts.product.currentRelease.date,
    url: facts.urls.home,
    downloadUrl: facts.urls.download,
    softwareHelp: facts.urls.documentation,
    screenshot: facts.urls.screenshot,
    image: facts.urls.screenshot,
    featureList: facts.product.features,
    publisher: {'@id': organizationId},
    offers: [
      {
        '@type': 'Offer',
        name: facts.offers.trial.name,
        price: String(facts.offers.trial.price),
        priceCurrency: facts.offers.trial.currency,
        description: `${facts.offers.trial.durationDays}-day full-feature trial; no account required`,
        url: facts.urls.download,
      },
      {
        '@type': 'Offer',
        name: facts.offers.lifetime.name,
        price: String(facts.offers.lifetime.price),
        priceCurrency: facts.offers.lifetime.currency,
        description: `One-time license for up to ${facts.offers.lifetime.devices} devices; no subscription`,
        url: facts.urls.pricing,
      },
    ],
  };
  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': pageId,
    url: pageUrl,
    name: pageName,
    inLanguage: language,
    isPartOf: {'@id': websiteId},
    dateModified: facts.lastVerified,
    ...(type === 'product'
      ? {mainEntity: {'@id': softwareId}}
      : {about: {'@id': softwareId}}),
  };
  const graph: Array<Record<string, unknown>> = [organization, website, software, webPage];
  if (pagePath !== '/') {
    const breadcrumbId = `${pageUrl}#breadcrumb`;
    webPage.breadcrumb = {'@id': breadcrumbId};
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Home', item: localizedHomeUrl},
        {'@type': 'ListItem', position: 2, name: pageName, item: pageUrl},
      ],
    });
  }

  return (
    <Head>
      <script id="linguax-core-entity-graph" type="application/ld+json">
        {JSON.stringify({'@context': 'https://schema.org', '@graph': graph})}
      </script>
    </Head>
  );
}
