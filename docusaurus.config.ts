import { themes as prismThemes } from 'prism-react-renderer';
import type { Config, PluginConfig } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const addAliasPlugin: PluginConfig = () => ({
  name: 'add-alias-plugin',
  configureWebpack: (config, isServer) => ({
    resolve: {
      alias: {
        '@scss': path.resolve(__dirname, './src/css'),
      },
    },
    devServer: isServer ? undefined : {
      proxy: {
        '/app-api': {
          target: 'http://localhost:9000',
          changeOrigin: true,
          secure: false,
          logLevel: 'debug',
        },
      },
    },
  }),
});

const config: Config = {
  title: 'LinguaX',
  tagline: 'Your third-party mouse, finally at home on macOS',
  favicon: 'favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://linguax.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'xiaopozhu', // Usually your GitHub org/user name.
  projectName: 'linguax-web', // Usually your repo name.

  // zh-Hans 只翻译了 1/14 use-case 页面,其余走英文 fallback;
  // 英文源里的 ./sibling.md 相对链接在 fallback locale 下不能被解析而报 broken,
  // 需先把 zh-Hans 翻译补齐才能收回 'throw'。
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // 全局变量配置
  customFields: {
    stripePriceId: process.env.NODE_ENV === 'development'
      ? 'price_1S8bg3GdWkwYJsQd76Ml0J84:payment'
      : 'price_1S8bHeGdWkwYJsQdAT9XjkTs:payment',
    // Web 配对工具 kill switch（spec §5.5）：置 PAIRING_TOOL_ENABLED=false 可 24h 内下线工具
    // UI，同时保留 SEO 页面。默认开启。
    pairingToolEnabled: process.env.PAIRING_TOOL_ENABLED !== 'false',
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'de', 'fr', 'ru', 'id'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en',
      },
      'zh-Hans': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
      },
      'zh-Hant': {
        label: '繁體中文',
        direction: 'ltr',
        htmlLang: 'zh-TW',
      },
      ja: {
        label: '日本語',
        direction: 'ltr',
        htmlLang: 'ja',
      },
      ko: {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko',
      },
      de: {
        label: 'Deutsch',
        direction: 'ltr',
        htmlLang: 'de',
      },
      fr: {
        label: 'Français',
        direction: 'ltr',
        htmlLang: 'fr',
      },
      ru: {
        label: 'Русский',
        direction: 'ltr',
        htmlLang: 'ru',
      },
      id: {
        label: 'Bahasa Indonesia',
        direction: 'ltr',
        htmlLang: 'id',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/xiaopozhu/linguax-web/tree/master',
          // superpowers/ 存放 spec/plan/ledger 等流程文档,不发布到站点
          exclude: ['superpowers/**'],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/xiaopozhu/linguax-web/tree/master/blog',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        gtag: {
          trackingID: 'G-XDTD6V15V1',
          anonymizeIP: true,
        },
        theme: {
          customCss: './src/css/custom.scss',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/linguax-mouse-gesture-mapping.png',
    // docs 侧边栏：切换类目时自动收起兄弟类目，任意时刻只展开当前所在的
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    metadata: [
      {
        name: "keywords",
        content: "LinguaX, macOS mouse enhancement, smooth scrolling macOS, map mouse side buttons Mac, app-specific mouse behavior, Logitech Options+ alternative, auto switch input source macOS, domain input switching Mac, macOS productivity utility",
      },
      // 网站验证 meta 标签
      {
        name: "yandex-verification",
        content: "17e4754dbd9893bc",
      },
    ],
    navbar: {
      title: 'LinguaX',
      logo: {
        alt: 'LinguaX Logo',
        src: 'img/linguax.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Docs',
          position: 'left',
          items: [
            { to: '/docs/getting-started/installation', label: 'Get Started' },
            { to: '/docs/mouse-plus/overview', label: 'Configure Your Mouse' },
            { to: '/docs/mouse-plus/device-compatibility', label: 'Compatible Models' },
            { to: '/docs/input-source/auto-switch', label: 'Automate Input Switching' },
            { to: '/docs/push-to-talk/push-to-talk-voice-typing-mac', label: 'Set Up Push-to-Talk' },
            { to: '/docs/intro', label: 'All Docs' },
          ],
        },
        { to: '/tools/pair-logitech-receiver', label: 'Pairing Tool', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/pricing', label: 'Pricing', position: 'left' },
        { to: '/download', label: 'Download Free', position: 'right', className: 'navbar__item--download' },
        // {
        //   href: 'https://github.com/xiaopozhu/linguax-web',
        //   label: 'GitHub',
        //   position: 'right',
        // },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      logo: {
        alt: "Ermulin Studio",
        src: "/img/ermulin-dark.svg",
      },
      style: 'dark',
      links: [
        {
          label: "Terms of Service",
          href: "/terms/service-agreement/",
        },
        {
          label: "Privacy Policy",
          href: "/terms/privacy-policy/",
        },
        {
          label: "twitter",
          href: "https://x.com/deepzz02",
        },
        {
          label: "github",
          href: "https://github.com/xiaopozhu",
        },
        {
          label: "email",
          href: "mailto: hello@linguax.app",
        },
      ],
      copyright: `Designed by Ermulin Studio.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    addAliasPlugin,
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'terms',
        routeBasePath: 'terms',
        path: './terms',
        blogSidebarCount: 0,
        showReadingTime: false,
        feedOptions: {
          type: null,
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        // 2026-07-14 IA 重构 (spec 2026-07-14-mouse-model-landing-and-pairing-tool-design.md)
        // 文件按新分类树移动，slug 保持原文件名以留住 Google 已索引权重
        // 老 URL 通过下方 redirects 保护外链和收藏
        redirects: [
          // 2026-06-11 早期 IA 重构 (commit 3b41f97 / 4303195)
          // docs/guides/* 整体被拆散到 input-source / mouse-plus / getting-started
          { from: '/docs/guides/multilingual-workflow', to: '/docs/input-source/multilingual-workflow' },
          { from: '/docs/guides/mouse-enhancement-basics', to: '/docs/mouse-plus/overview' },
          { from: '/docs/guides/setup-for-designers', to: '/docs/getting-started/setup-for-designers' },
          { from: '/docs/guides/setup-for-developers', to: '/docs/getting-started/setup-for-developers' },
          // browser-domain-rules 已并入 app-and-website-rules
          { from: '/docs/guides/browser-domain-rules', to: '/docs/input-source/app-and-website-rules' },
          // use-cases → mouse-plus/recipes
          { from: '/docs/use-cases/map-mouse-side-buttons-macos', to: '/docs/mouse-plus/recipes/map-mouse-side-buttons-macos' },
          { from: '/docs/use-cases/disable-mouse-acceleration-mac', to: '/docs/mouse-plus/recipes/disable-mouse-acceleration-mac' },
          { from: '/docs/use-cases/fix-choppy-mouse-scrolling-macos', to: '/docs/mouse-plus/recipes/fix-choppy-mouse-scrolling-macos' },
          { from: '/docs/use-cases/reverse-scroll-direction-mouse-only-mac', to: '/docs/mouse-plus/recipes/reverse-scroll-direction-mouse-only-mac' },
          { from: '/docs/use-cases/macos-dictation-mouse-button', to: '/docs/mouse-plus/recipes/macos-dictation-mouse-button' },
          // use-cases → push-to-talk
          { from: '/docs/use-cases/push-to-talk-voice-typing-mac', to: '/docs/push-to-talk/push-to-talk-voice-typing-mac' },
          { from: '/docs/use-cases/best-push-to-talk-app-mac', to: '/docs/push-to-talk/best-push-to-talk-app-mac' },
          { from: '/docs/use-cases/wispr-flow-superwhisper-hotkey-mac', to: '/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac' },
          // use-cases → input-source
          { from: '/docs/use-cases/auto-switch-input-source-app-domain-mac', to: '/docs/input-source/auto-switch-input-source-app-domain-mac' },
          // use-cases → comparisons
          { from: '/docs/use-cases/logi-options-plus-alternative-macos', to: '/docs/comparisons/logi-options-plus-alternative-macos' },
          { from: '/docs/use-cases/bettermouse-alternative-mac', to: '/docs/comparisons/bettermouse-alternative-mac' },
          { from: '/docs/use-cases/mac-mouse-fix-alternative-macos', to: '/docs/comparisons/mac-mouse-fix-alternative-macos' },
          { from: '/docs/use-cases/mos-vs-linearmouse-vs-mac-mouse-fix', to: '/docs/comparisons/mos-vs-linearmouse-vs-mac-mouse-fix' },
          { from: '/docs/use-cases/mx-master-3s-mac-setup-without-logi-options', to: '/docs/comparisons/mx-master-3s-mac-setup-without-logi-options' },
          // mouse-plus fundamentals 收纳
          { from: '/docs/mouse-plus/smooth-scrolling', to: '/docs/mouse-plus/fundamentals/smooth-scrolling' },
          { from: '/docs/mouse-plus/button-mapping', to: '/docs/mouse-plus/fundamentals/button-mapping' },
          { from: '/docs/mouse-plus/gesture-mapping', to: '/docs/mouse-plus/fundamentals/gesture-mapping' },
          { from: '/docs/mouse-plus/pointer-speed', to: '/docs/mouse-plus/fundamentals/pointer-speed' },
          { from: '/docs/mouse-plus/app-scoped-overrides', to: '/docs/mouse-plus/fundamentals/app-scoped-overrides' },
          // core-concepts → concepts + automation 拆散
          { from: '/docs/core-concepts/how-linguax-works', to: '/docs/concepts/how-linguax-works' },
          { from: '/docs/core-concepts/rules-and-priority', to: '/docs/concepts/rules-and-priority' },
          { from: '/docs/automation/shortcut-and-hotkeys', to: '/docs/concepts/shortcut-and-hotkeys' },
          { from: '/docs/automation/backup-and-restore', to: '/docs/reference/backup-and-restore' },
          // workflows → getting-started
          { from: '/docs/workflows/setup-for-developers', to: '/docs/getting-started/setup-for-developers' },
          { from: '/docs/workflows/setup-for-designers', to: '/docs/getting-started/setup-for-designers' },
          // faq / pricing-and-license / releases → reference
          { from: '/docs/faq/general', to: '/docs/reference/faq-general' },
          { from: '/docs/faq/privacy-and-security', to: '/docs/reference/privacy-and-security' },
          { from: '/docs/pricing-and-license/trial-vs-lifetime', to: '/docs/reference/trial-vs-lifetime' },
          // trial-vs-lifetime.md 曾经有 slug override 到 /pricing-and-license/free-vs-pro
          // 保护那个历史 URL 也不断链
          { from: '/docs/pricing-and-license/free-vs-pro', to: '/docs/reference/trial-vs-lifetime' },
          { from: '/docs/pricing-and-license/license-activation', to: '/docs/reference/license-activation' },
          { from: '/docs/pricing-and-license/refunds-and-invoice', to: '/docs/reference/refunds-and-invoice' },
          { from: '/docs/releases/changelog', to: '/docs/reference/changelog' },
        ],
      },
    ],
  ],
};

export default config;
