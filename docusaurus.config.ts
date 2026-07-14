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

  // 全局变量配置
  customFields: {
    stripePriceId: process.env.NODE_ENV === 'development'
      ? 'price_1S8bg3GdWkwYJsQd76Ml0J84:payment'
      : 'price_1S8bHeGdWkwYJsQdAT9XjkTs:payment',
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
    image: 'img/linguax-mouse.png',
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
            { to: '/docs/mouse-plus/device-compatibility', label: 'Mouse Setup' },
            { to: '/docs/getting-started/installation', label: 'Getting Started' },
            { to: '/docs/intro', label: 'All Docs' },
          ],
        },
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
  ],
};

export default config;
