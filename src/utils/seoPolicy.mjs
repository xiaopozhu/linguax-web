export function getPageSeoPolicy(manifest, pathname, siteUrl) {
  const {locales, defaultLocale, routes, collections} = manifest;
  const path = pathname.replace(/\/+$/, '') || '/';
  const currentLocale = Object.keys(locales).find((locale) => {
    const prefix = locales[locale].path;
    return prefix && (path === `/${prefix}` || path.startsWith(`/${prefix}/`));
  }) ?? defaultLocale;
  const prefix = locales[currentLocale].path;
  const route = (prefix ? path.slice(prefix.length + 1) : path) || '/';
  const collection = Object.keys(collections).find((key) => route === key || route.startsWith(`${key}/`));
  const available = routes[route] ?? (collection ? collections[collection] : Object.keys(locales));
  const isFallback = !available.includes(currentLocale);
  const canonicalLocale = isFallback ? defaultLocale : currentLocale;
  const localizedUrl = (locale) => {
    const localePath = locales[locale].path;
    return new URL(`${localePath ? `/${localePath}` : ''}${route}`, siteUrl).href;
  };
  return {
    canonicalUrl: localizedUrl(canonicalLocale),
    contentLanguage: locales[canonicalLocale].language,
    indexable: !isFallback,
    alternates: [
      ...available.map((locale) => ({language: locales[locale].language, url: localizedUrl(locale)})),
      {language: 'x-default', url: localizedUrl(defaultLocale)},
    ],
  };
}
