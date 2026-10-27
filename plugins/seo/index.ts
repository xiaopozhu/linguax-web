import type {LoadContext, Plugin} from '@docusaurus/types';
import type {Options as SitemapOptions} from '@docusaurus/plugin-sitemap';
import {buildLocaleManifest} from './manifest.mjs';
import {getPageSeoPolicy, type LocaleManifest} from '../../src/utils/seoPolicy.mjs';

export default function createSeoIntegration() {
  const manifests = new Map<string, LocaleManifest>();
  return {
    plugin(context: LoadContext): Plugin {
      const {siteConfig, i18n, siteDir} = context;
      return {
        name: 'linguax-seo',
        getPathsToWatch: () => ['docs/**/*.{md,mdx}', 'blog/**/*.{md,mdx}', 'terms/**/*.{md,mdx}', 'i18n/**/*.{md,mdx}'],
        async allContentLoaded({allContent, actions}) {
          const locales = Object.fromEntries(i18n.locales.map((locale) => [locale, {
            path: locale === i18n.defaultLocale ? '' : locale,
            language: i18n.localeConfigs[locale].htmlLang,
          }]));
          const manifest = await buildLocaleManifest({
            root: siteDir, allContent, locales,
            currentLocale: i18n.currentLocale, defaultLocale: i18n.defaultLocale,
          });
          manifests.set(siteConfig.baseUrl, manifest);
          actions.setGlobalData(manifest);
        },
      };
    },
    createSitemapItems: (async ({siteConfig, defaultCreateSitemapItems, ...params}) => {
      const manifest = manifests.get(siteConfig.baseUrl);
      if (!manifest) throw new Error(`Missing SEO manifest for ${siteConfig.baseUrl}`);
      const items = await defaultCreateSitemapItems({siteConfig, ...params});
      return items.filter((item) => getPageSeoPolicy(manifest, new URL(item.url).pathname, siteConfig.url).indexable);
    }) satisfies SitemapOptions['createSitemapItems'],
  };
}
