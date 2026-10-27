export interface LocaleManifest {
  defaultLocale: string;
  locales: Record<string, {path: string; language: string}>;
  routes: Record<string, string[]>;
  collections: Record<string, string[]>;
}

export function getPageSeoPolicy(manifest: LocaleManifest, pathname: string, siteUrl: string): {
  canonicalUrl: string;
  contentLanguage: string;
  indexable: boolean;
  alternates: Array<{language: string; url: string}>;
};
