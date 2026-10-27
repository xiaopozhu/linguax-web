import {readFile} from 'node:fs/promises';
import path from 'node:path';

function body(source) {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '').trim();
}

async function readOptional(file) {
  try {
    return await readFile(file, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

export async function buildLocaleManifest({root, allContent, locales, currentLocale, defaultLocale = 'en'}) {
  const routes = {};
  const collections = {};
  const localePrefix = locales[currentLocale].path ? `/${locales[currentLocale].path}` : '';
  const unlocalize = (route) => route.replace(new RegExp(`^${localePrefix}(?=/|$)`), '').replace(/\/+$/, '') || '/';

  async function add(metadata, sourceRoot, localizedRoot, collection) {
    const source = metadata.source.replace(/^@site\//, '');
    const relative = source.startsWith(`${sourceRoot}/`)
      ? source.slice(sourceRoot.length + 1)
      : source.replace(/^i18n\/[^/]+\//, '').slice(localizedRoot.length + 1);
    const original = await readOptional(path.join(root, sourceRoot, relative));
    if (original === null) throw new Error(`SEO source not found: ${sourceRoot}/${relative}`);
    const available = [defaultLocale];
    for (const [locale, config] of Object.entries(locales)) {
      if (locale === defaultLocale) continue;
      const translation = await readOptional(path.join(root, 'i18n', config.path, localizedRoot, relative));
      // A copied English file is still fallback content, even if its title differs.
      if (translation !== null && body(translation) !== body(original)) available.push(locale);
    }
    routes[unlocalize(metadata.permalink)] = available;
    if (collection) {
      collections[collection] ??= [defaultLocale];
      collections[collection] = [...new Set([...collections[collection], ...available])];
    }
  }

  for (const content of Object.values(allContent['docusaurus-plugin-content-docs'] ?? {})) {
    for (const version of content.loadedVersions ?? []) {
      for (const doc of version.docs) {
        await add(doc, 'docs', 'docusaurus-plugin-content-docs/current');
      }
    }
  }
  for (const [id, content] of Object.entries(allContent['docusaurus-plugin-content-blog'] ?? {})) {
    const isTerms = id === 'terms';
    const collection = isTerms ? '/terms' : '/blog';
    collections[collection] = [defaultLocale];
    for (const post of content.blogPosts ?? []) {
      await add(post.metadata, isTerms ? 'terms' : 'blog', `docusaurus-plugin-content-blog${isTerms ? '-terms' : ''}`, collection);
    }
  }
  return {defaultLocale, locales, routes, collections};
}
