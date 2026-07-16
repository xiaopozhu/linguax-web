import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// 2026-07-14 IA v2（Cursor/Vercel 风）：category label 全部改为 user-goal 动词化
// 文件位置 & URL 全部不变（零 SEO 风险），只重命名 sidebar 分类和调整层级
// Concepts 3 页并入 Reference（内容量单薄不值独立 category）
// Pricing & License 从 Reference 拆出独立（购买决策是独立 user intent）

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Get Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/first-run',
        'getting-started/quick-tour',
        'getting-started/setup-for-developers',
        'getting-started/setup-for-designers',
      ],
    },
    {
      type: 'category',
      label: 'Configure Your Mouse',
      collapsed: true,
      items: [
        'mouse-plus/overview',
        {
          type: 'category',
          label: 'Fundamentals',
          collapsed: false,
          items: [
            'mouse-plus/fundamentals/smooth-scrolling',
            'mouse-plus/fundamentals/button-mapping',
            'mouse-plus/fundamentals/gesture-mapping',
            'mouse-plus/fundamentals/pointer-speed',
            'mouse-plus/fundamentals/app-scoped-overrides',
          ],
        },
        {
          type: 'category',
          label: 'Compatible Models',
          collapsed: true,
          items: [
            'mouse-plus/device-compatibility',
            'mouse-plus/models/mx-master-4',
            'mouse-plus/models/mx-master-3s',
            'mouse-plus/models/mx-master-3',
            'mouse-plus/models/mx-anywhere-3s',
            'mouse-plus/models/mx-anywhere-3',
            'mouse-plus/models/logitech-g-pro-x-superlight',
            'mouse-plus/models/logitech-g-pro-x-superlight-2',
            'mouse-plus/models/logitech-lift',
            'mouse-plus/models/mx-ergo',
          ],
        },
        {
          type: 'category',
          label: 'Recipes',
          collapsed: true,
          items: [
            'mouse-plus/recipes/map-mouse-side-buttons-macos',
            'mouse-plus/recipes/fix-choppy-mouse-scrolling-macos',
            'mouse-plus/recipes/reverse-scroll-direction-mouse-only-mac',
            'mouse-plus/recipes/disable-mouse-acceleration-mac',
            'mouse-plus/recipes/macos-dictation-mouse-button',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Automate Input Switching',
      collapsed: true,
      items: [
        'input-source/auto-switch',
        'input-source/app-and-website-rules',
        'input-source/multilingual-workflow',
        'input-source/auto-switch-input-source-app-domain-mac',
      ],
    },
    {
      type: 'category',
      label: 'Set Up Push-to-Talk',
      collapsed: true,
      items: [
        'push-to-talk/push-to-talk-voice-typing-mac',
        'push-to-talk/best-push-to-talk-app-mac',
        'push-to-talk/wispr-flow-superwhisper-hotkey-mac',
      ],
    },
    {
      type: 'category',
      label: 'Migrate from Other Tools',
      collapsed: true,
      items: [
        'comparisons/logi-options-plus-alternative-macos',
        'comparisons/bettermouse-alternative-mac',
        'comparisons/mac-mouse-fix-alternative-macos',
        'comparisons/mos-vs-linearmouse-vs-mac-mouse-fix',
        'comparisons/mx-master-3s-mac-setup-without-logi-options',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshoot',
      collapsed: true,
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
      label: 'Pricing & License',
      collapsed: true,
      items: [
        'reference/trial-vs-lifetime',
        'reference/license-activation',
        'reference/refunds-and-invoice',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        // FAQ 类
        'reference/faq-general',
        'reference/privacy-and-security',
        // 概念/机制类（原 Concepts 分类，内容单薄合并进来）
        'concepts/how-linguax-works',
        'concepts/rules-and-priority',
        'concepts/shortcut-and-hotkeys',
        // 数据维护 & 版本
        'reference/backup-and-restore',
        'reference/changelog',
      ],
    },
  ],
};

export default sidebars;
