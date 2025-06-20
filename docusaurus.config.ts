import {themes as prismThemes} from 'prism-react-renderer';
import type {Config, PluginConfig} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const addAliasPlugin: PluginConfig = () => ({
  name: 'add-alias-plugin',
  configureWebpack: () => ({
    resolve: {
      alias: {
        '@scss': path.resolve(__dirname, './src/css'),
      },
    },
  }),
});

const config: Config = {
  title: 'LinguaX',
  tagline: '你的输入法，懂得自动跟随',
  favicon: 'img/favicon.ico',

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

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
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
        content: "LinguaX, macOS 状态栏应用, 输入法切换, 自动切换输入法, Mac 输入法管理, 智能输入法切换, 状态栏输入法工具, Input Source Pro 替代, 为不同 App 指定输入法, macOS 输入法自动化, 输入法切换工具, Mac 多语言输入, 输入法管理软件, macOS 生产力工具, 状态栏常驻应用, 轻量级输入法切换, 中英文输入切换, macOS Monterey 输入法, macOS Ventura 输入法, macOS Sonoma 输入法, Apple Silicon 输入法, M1 M2 M3 输入法切换",
      },
      {
        name: "description",
        content: "LinguaX 是专为 macOS 设计的轻量级状态栏输入法自动切换应用，支持为不同应用程序单独指定输入法，智能学习使用习惯，常驻状态栏方便管理。适用于开发者、写作者和多语言工作者。",
      },
      {
        name: "author",
        content: "Ermulin Studio",
      },
      {
        property: "og:title",
        content: "LinguaX - macOS 智能输入法自动切换工具",
      },
      {
        property: "og:description", 
        content: "专为 macOS 设计的轻量级状态栏输入法自动切换应用，常驻状态栏便于管理，智能识别应用程序并自动切换最适合的输入法。",
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
        content: "LinguaX - macOS 智能输入法自动切换工具",
      },
      {
        name: "twitter:description",
        content: "专为 macOS 设计的轻量级状态栏输入法自动切换应用，常驻状态栏便于管理，让您的输入法智能跟随应用切换。",
      },
      {
        name: "twitter:image",
        content: "https://linguax.app/img/linguax-home.png",
      },
      // 网站验证 meta 标签
      {
        name: "baidu-site-verification",
        content: "codeva-J2UNhgmOQx",
      },
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
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: '文档',
        // },
        // {to: '/blog', label: '博客', position: 'left'},
        {
          href: 'https://github.com/xiaopozhu/linguax-web',
          label: 'GitHub',
          position: 'right',
        },
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
            label: "服务条款",
            href: "/terms/service-agreement",
          },
          {
            label: "隐私政策",
            href: "/terms/privacy-policy",
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
