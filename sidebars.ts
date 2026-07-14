import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// 2026-07-14 IA 重构：12 顶级 category → 8 顶级 category
// 顶级顺序按用户旅程 + 意图分层排列：
//   1. Getting Started (新用户入口)
//   2. Mouse+ / 3. Input Source / 4. Push-to-Talk (三大产品支柱，Mouse+ 权重最重)
//   5. Comparisons (decision-making / 迁移，SEO 承接)
//   6. Concepts (mental model)
//   7. Troubleshooting (排障，用户主动出问题才找)
//   8. Reference (FAQ / 定价 / License / Changelog，长尾兜底)
// 每个 category 内部顺序按学习曲线或功能重要度排列，详见各段注释

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        // 先技术流程，后 role-based 变体
        'getting-started/installation',
        'getting-started/first-run',
        'getting-started/quick-tour',
        'getting-started/setup-for-developers',
        'getting-started/setup-for-designers',
      ],
    },
    {
      type: 'category',
      label: 'Mouse+',
      link: {type: 'doc', id: 'mouse-plus/overview'},
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Fundamentals',
          collapsed: false,
          items: [
            // 按用户感知顺序：先滚动手感 → 按键映射 → 高阶手势 → 调参 → 特殊 override
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
          link: {type: 'doc', id: 'mouse-plus/device-compatibility'},
          collapsed: true,
          items: [
            // 按 P0 → P1 上线顺序补入；当前 P0 首个已交付
            'mouse-plus/models/mx-master-3s',
          ],
        },
        {
          type: 'category',
          label: 'Recipes',
          collapsed: true,
          items: [
            // 按用户搜索频率排：side buttons > 滚动流畅性 > 反滚 > 加速度 > dictation
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
      label: 'Input Source',
      collapsed: false,
      items: [
        // 概览 → 规则配置 → 多语言工作流 → app/domain 具体 recipe
        'input-source/auto-switch',
        'input-source/app-and-website-rules',
        'input-source/multilingual-workflow',
        'input-source/auto-switch-input-source-app-domain-mac',
      ],
    },
    {
      type: 'category',
      label: 'Push-to-Talk',
      collapsed: false,
      items: [
        // 支柱综述 → 竞品对比选型 → 具体工具接入
        'push-to-talk/push-to-talk-voice-typing-mac',
        'push-to-talk/best-push-to-talk-app-mac',
        'push-to-talk/wispr-flow-superwhisper-hotkey-mac',
      ],
    },
    {
      type: 'category',
      label: 'Comparisons',
      collapsed: true,
      items: [
        // 单竞品对比放前（intent 清晰）→ 多路对比 → 特定型号迁移放后
        'comparisons/logi-options-plus-alternative-macos',
        'comparisons/bettermouse-alternative-mac',
        'comparisons/mac-mouse-fix-alternative-macos',
        'comparisons/mos-vs-linearmouse-vs-mac-mouse-fix',
        'comparisons/mx-master-3s-mac-setup-without-logi-options',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: true,
      items: [
        // 顶层原理 → 冲突解析规则 → 快捷键机制
        'concepts/how-linguax-works',
        'concepts/rules-and-priority',
        'concepts/shortcut-and-hotkeys',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsed: true,
      items: [
        // 通用问题 → 鼠标专题 → 权限 → 冲突 → 日志（越靠后越技术）
        'troubleshooting/common-issues',
        'troubleshooting/mouse-issues',
        'troubleshooting/permissions-on-macos',
        'troubleshooting/conflicts-with-other-tools',
        'troubleshooting/logs-and-diagnostics',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: [
        // FAQ → 购买决策 → 授权维护 → 数据 → 版本
        'reference/faq-general',
        'reference/privacy-and-security',
        'reference/trial-vs-lifetime',
        'reference/license-activation',
        'reference/refunds-and-invoice',
        'reference/backup-and-restore',
        'reference/changelog',
      ],
    },
  ],
};

export default sidebars;
