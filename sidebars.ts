import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
      label: 'Mouse+',
      items: [
        'mouse-plus/overview',
        'mouse-plus/smooth-scrolling',
        'mouse-plus/button-mapping',
        'mouse-plus/gesture-mapping',
        'mouse-plus/pointer-speed',
        'mouse-plus/app-scoped-overrides',
        'mouse-plus/device-compatibility',
      ],
    },
    {
      type: 'category',
      label: 'Input Source Automation',
      items: [
        'input-source/auto-switch',
        'input-source/app-and-website-rules',
        'input-source/multilingual-workflow',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'core-concepts/how-linguax-works',
        'core-concepts/rules-and-priority',
      ],
    },
    {
      type: 'category',
      label: 'Workflows',
      items: [
        'workflows/setup-for-developers',
        'workflows/setup-for-designers',
      ],
    },
    {
      type: 'category',
      label: 'Automation & Shortcuts',
      items: [
        'automation/shortcut-and-hotkeys',
        'automation/backup-and-restore',
      ],
    },
    {
      type: 'category',
      label: 'Use Cases',
      items: [
        'use-cases/logi-options-plus-alternative-macos',
        'use-cases/fix-choppy-mouse-scrolling-macos',
        'use-cases/map-mouse-side-buttons-macos',
        'use-cases/push-to-talk-voice-typing-mac',
        'use-cases/macos-dictation-mouse-button',
        'use-cases/best-push-to-talk-app-mac',
        'use-cases/wispr-flow-superwhisper-hotkey-mac',
        'use-cases/mx-master-3s-mac-setup-without-logi-options',
        'use-cases/bettermouse-alternative-mac',
        'use-cases/mos-vs-linearmouse-vs-mac-mouse-fix',
        'use-cases/mac-mouse-fix-alternative-macos',
        'use-cases/disable-mouse-acceleration-mac',
        'use-cases/reverse-scroll-direction-mouse-only-mac',
        'use-cases/auto-switch-input-source-app-domain-mac',
      ],
    },
    {
      type: 'category',
      label: 'Pricing & License',
      items: [
        'pricing-and-license/trial-vs-lifetime',
        'pricing-and-license/license-activation',
        'pricing-and-license/refunds-and-invoice',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'troubleshooting/common-issues',
        'troubleshooting/mouse-issues',
        'troubleshooting/permissions-on-macos',
        'troubleshooting/conflicts-with-other-tools',
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
      items: ['releases/changelog'],
    },
  ],
};

export default sidebars;
