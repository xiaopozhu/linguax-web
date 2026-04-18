import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
        'getting-started/first-run',
        'getting-started/quick-tour',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/how-linguax-works',
        'core-concepts/app-rules-vs-website-rules',
        'core-concepts/profiles-and-priority',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/setup-for-developers',
        'guides/setup-for-designers',
        'guides/multilingual-workflow',
        'guides/browser-domain-rules',
        'guides/mouse-enhancement-basics',
      ],
    },
    {
      type: 'category',
      label: 'Use Cases',
      items: [
        'use-cases/fix-choppy-mouse-scrolling-macos',
        'use-cases/map-mouse-side-buttons-macos',
        'use-cases/logi-options-plus-alternative-macos',
        'use-cases/auto-switch-input-source-app-domain-mac',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/input-source-auto-switch',
        'features/website-language-mapping',
        'features/shortcut-and-hotkeys',
        'features/backup-and-restore',
      ],
    },
    {
      type: 'category',
      label: 'Pricing and License',
      items: [
        'pricing-and-license/free-vs-pro',
        'pricing-and-license/license-activation',
        'pricing-and-license/refunds-and-invoice',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/common-issues',
        'troubleshooting/permissions-on-macos',
        'troubleshooting/conflict-with-other-ime-tools',
        'troubleshooting/logs-and-diagnostics',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: [
        'faq/general',
        'faq/privacy-and-security',
      ],
    },
    {
      type: 'category',
      label: 'Releases',
      items: [
        'releases/changelog',
      ],
    },
  ],
};

export default sidebars;
