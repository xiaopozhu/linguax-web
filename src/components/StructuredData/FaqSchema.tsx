import React from 'react';
import Head from '@docusaurus/Head';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSchemaProps {
  faqs: FaqItem[];
}

/**
 * FAQPage JSON-LD schema helper for docs pages.
 *
 * Usage in MDX:
 *   import FaqSchema from '@site/src/components/StructuredData/FaqSchema';
 *   <FaqSchema faqs={[
 *     {q: 'question 1?', a: 'answer 1'},
 *     {q: 'question 2?', a: 'answer 2'},
 *   ]} />
 *
 * Emits a single <script type="application/ld+json"> inside <Head>. The
 * caller supplies plain-text answers (no markdown / no HTML) to avoid
 * JSON escape headaches and to comply with Schema.org guidance.
 *
 * i18n: each localized md file passes its own translated faqs. This is
 * Docusaurus i18n idiomatic since docs md pages are per-locale by
 * design. tsx pages that need shared translations should use the
 * translate() API upstream and pass the resolved strings.
 */
export default function FaqSchema({faqs}: FaqSchemaProps): React.ReactElement {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({q, a}) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {'@type': 'Answer', text: a},
    })),
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Head>
  );
}
