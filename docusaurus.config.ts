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
  tagline: '你的输入法，懂得自动跟随',
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

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'xiaopozhu', // Usually your GitHub org/user name.
  projectName: 'linguax-web', // Usually your repo name.

  onBrokenLinks: 'throw',
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
    image: 'img/linguax-home.png',
    metadata: [
      {
        name: "keywords",
        content: "LinguaX, LinguaX for macOS, macOS input switching, automatic input method, input source switcher, macOS productivity tool, Mac input automation, multilingual input management, app-specific input method, Input Source Pro alternative, macOS menu bar utility, Apple Silicon compatible, mouse enhancement macOS, smooth scrolling Mac, macOS workflow automation",
      },
      {
        name: "description",
        content: "LinguaX is a lightweight menu bar input method management app designed for macOS. Automatically configure appropriate input methods for each application, making switching seamless. Perfect for developers, writers, and multilingual users.",
      },
      {
        name: "author",
        content: "Ermulin Studio",
      },
      {
        property: "og:title",
        content: "LinguaX for macOS - Automatic Input Method & Mouse Enhancement",
      },
      {
        property: "og:description",
        content: "LinguaX automatically switches input sources by app and website on macOS, with powerful mouse enhancement built in. Free plan available, Pro is a one-time purchase.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://linguax.app",
      },
      {
        property: "og:image",
        content: "https://linguax.app/img/linguax-home.png",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "LinguaX for macOS - Automatic Input Method & Mouse Enhancement",
      },
      {
        name: "twitter:description",
        content: "Stop manual switching. LinguaX auto-sets input sources by app and website on macOS, with smooth scrolling and mouse gestures built in. Free to start.",
      },
      {
        name: "twitter:image",
        content: "https://linguax.app/img/linguax-home.png",
      },
      // 网站验证 meta 标签
      {
        name: "yandex-verification",
        content: "17e4754dbd9893bc",
      },
      {
        name: "baidu-site-verification",
        content: "codeva-J2UNhgmOQx",
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
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/download', label: 'Download Free', position: 'right', className: 'navbar__item--download' },
        { to: '/pricing', label: 'Pricing', position: 'right' },
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
        feedOptions: {},
      },
    ],
  ],
};

export default config;
