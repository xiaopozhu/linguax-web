import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import LinguaXFeatures from '@site/src/components/LinguaXFeatures';

import HomepageHeader from '@site/src/components/HomepageHeader';
import FeaturesSection from '@site/src/components/FeaturesSection';
import ShowcaseSection from '@site/src/components/ShowcaseSection';
import WorkflowSection from '@site/src/components/WorkflowSection';
import FAQSection from '@site/src/components/FAQSection';
import CTASection from '@site/src/components/CTASection';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: `${siteConfig.title} - macOS 状态栏输入法管理工具`,
        description: 'Homepage title'
      })}
      description={translate({
        id: 'homepage.description', 
        message: 'LinguaX 是专为 macOS 设计的轻量级状态栏输入法管理工具，为每个应用自动配置合适的输入法，让切换变得无感知。状态栏常驻，智能、轻量、优雅。',
        description: 'Homepage meta description'
      })}>
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <ShowcaseSection />
        <WorkflowSection />
        <div id="download">
          <LinguaXFeatures />
        </div>
        <FAQSection />
        <CTASection />
      </main>
    </Layout>
  );
}
