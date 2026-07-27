import React from 'react';
import Head from '@docusaurus/Head';

export interface HowToStep {
  name: string;
  text: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration, e.g. 'PT5M'
  steps: HowToStep[];
}

/**
 * HowTo JSON-LD schema helper for tutorial / recipe pages.
 *
 * Usage in MDX:
 *   import HowToSchema from '@site/src/components/StructuredData/HowToSchema';
 *   <HowToSchema
 *     name="How to X on macOS"
 *     description="Short summary of what the reader will accomplish."
 *     totalTime="PT5M"
 *     steps={[
 *       {name: 'Step 1 title', text: 'Step 1 body (plain text)'},
 *       {name: 'Step 2 title', text: 'Step 2 body'},
 *     ]}
 *   />
 *
 * Emits a single <script type="application/ld+json"> inside <Head>.
 * totalTime uses ISO 8601 duration format (PT5M = 5 minutes,
 * PT1H30M = 1 hour 30 minutes).
 */
export default function HowToSchema({
  name,
  description,
  totalTime,
  steps,
}: HowToSchemaProps): React.ReactElement {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map(({name: stepName, text}) => ({
      '@type': 'HowToStep',
      name: stepName,
      text,
    })),
  };
  if (totalTime) {
    schema.totalTime = totalTime;
  }

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Head>
  );
}
