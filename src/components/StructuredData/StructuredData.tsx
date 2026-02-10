import React from 'react';
import Head from '@docusaurus/Head';

interface StructuredDataProps {
    type?: 'website' | 'product';
}

export default function StructuredData({ type = 'website' }: StructuredDataProps): React.ReactElement {
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
                description: '30-day trial license with full features'
            },
            {
                '@type': 'Offer',
                price: '9.9',
                priceCurrency: 'USD',
                name: 'Lifetime License',
                description: 'One-time payment for lifetime access'
            }
        ],
        // 如果有真实的评分数据,可以取消注释并更新数值
        // aggregateRating: {
        //   '@type': 'AggregateRating',
        //   ratingValue: '4.8',
        //   ratingCount: '1800',
        //   bestRating: '5',
        //   worstRating: '1'
        // },
        description: 'LinguaX automatically switches input sources by app and website on macOS, with powerful mouse enhancement built in. Free plan available, Pro is a one-time purchase.',
        applicationSubCategory: 'Input Method Manager',
        softwareVersion: '1.0',
        softwareHelp: 'https://linguax.app/docs/intro',
        url: 'https://linguax.app',
        downloadUrl: 'https://linguax.app/download',
        screenshot: 'https://linguax.app/img/linguax-home.png',
        image: 'https://linguax.app/img/linguax-home.png',
        featureList: [
            'Automatic input source switching by app',
            'Website/domain-based input switching',
            'Smooth scrolling for third-party mice',
            'Reverse scrolling support',
            'Menu bar integration',
            'Apple Silicon optimized'
        ],
        keywords: 'LinguaX, LinguaX for macOS, macOS input switching, automatic input method, input source switcher, macOS productivity tool'
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LinguaX',
        url: 'https://linguax.app',
        description: 'Automatic Input Method & Mouse Enhancement for macOS',
        // 如果网站有搜索功能,可以取消注释
        // potentialAction: {
        //   '@type': 'SearchAction',
        //   target: 'https://linguax.app/search?q={search_term_string}',
        //   'query-input': 'required name=search_term_string'
        // }
    };

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'LinguaX',
        url: 'https://linguax.app',
        logo: 'https://linguax.app/img/linguax.png',
        // 如果有社交媒体账号,可以添加到sameAs数组
        // sameAs: [
        //   'https://github.com/linguax',
        //   'https://twitter.com/linguax'
        // ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@linguax.app',
            contactType: 'Customer Support'
        }
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
        </Head>
    );
}
