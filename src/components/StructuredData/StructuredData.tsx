import React from 'react';
import Head from '@docusaurus/Head';

interface StructuredDataProps {
    type?: 'website' | 'product';
    pagePath?: string;
    pageName?: string;
}

export default function StructuredData({
    type = 'website',
    pagePath = '/',
    pageName = 'LinguaX'
}: StructuredDataProps): React.ReactElement {
    const pageUrl = `https://linguax.app${pagePath}`;

    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'LinguaX',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'macOS',
        offers: [
            {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                name: 'Free Trial',
                description: '30-day full-feature trial'
            },
            {
                '@type': 'Offer',
                price: '9.9',
                priceCurrency: 'USD',
                name: 'Lifetime License',
                description: 'One-time payment for long-term usage'
            }
        ],
        description: 'LinguaX is a mouse-first productivity utility for macOS: smooth scrolling, mouse gesture/button mapping, app-scoped overrides, plus app/domain input automation.',
        applicationSubCategory: 'Mouse Enhancement and Input Automation Utility',
        softwareVersion: '2026',
        softwareHelp: 'https://linguax.app/docs/intro',
        url: 'https://linguax.app',
        downloadUrl: 'https://linguax.app/download',
        screenshot: 'https://linguax.app/img/linguax-mouse.png',
        image: 'https://linguax.app/img/linguax-mouse.png',
        featureList: [
            'Smooth scrolling for third-party mice',
            'Mouse gesture and side-button mapping',
            'App-scoped mouse behavior overrides',
            'Automatic input-source switching by app and website domain',
            'Shortcut action mapping',
            'Menu bar integration'
        ],
        keywords: 'macOS mouse enhancement, smooth scrolling macOS, map mouse side buttons macOS, app specific mouse behavior, auto switch input source macOS'
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LinguaX',
        url: 'https://linguax.app',
        description: 'Mouse Enhancement + Input Automation for macOS',
        inLanguage: ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'de', 'fr', 'ru', 'id']
    };

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LinguaX',
        url: 'https://linguax.app',
        logo: 'https://linguax.app/img/linguax.png',
        sameAs: [
            'https://github.com/xiaopozhu',
            'https://x.com/deepzz02'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@linguax.app',
            contactType: 'Customer Support'
        }
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://linguax.app/'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: pageName,
                item: pageUrl
            }
        ]
    };

    return (
        <Head>
            <script type="application/ld+json">
                {JSON.stringify(softwareSchema)}
            </script>
            {type === 'website' && (
                <>
                    <script type="application/ld+json">
                        {JSON.stringify(websiteSchema)}
                    </script>
                    <script type="application/ld+json">
                        {JSON.stringify(organizationSchema)}
                    </script>
                </>
            )}
            {pagePath !== '/' && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
        </Head>
    );
}
