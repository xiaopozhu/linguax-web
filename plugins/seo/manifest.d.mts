import type {LocaleManifest} from '../../src/utils/seoPolicy.mjs';

export function buildLocaleManifest(options: {
  root: string;
  allContent: Record<string, Record<string, unknown>>;
  locales: LocaleManifest['locales'];
  currentLocale: string;
  defaultLocale?: string;
}): Promise<LocaleManifest>;
