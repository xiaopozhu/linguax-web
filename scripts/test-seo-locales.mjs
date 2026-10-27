import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {test} from 'node:test';

const locales = {
  en: {path: '', language: 'en'},
  'zh-Hans': {path: 'zh-Hans', language: 'zh-CN'},
  ja: {path: 'ja', language: 'ja'},
};

test('only real translations get independent canonicals, hreflang and sitemap entries', async () => {
  const {buildLocaleManifest} = await import('../plugins/seo/manifest.mjs');
  const {getPageSeoPolicy} = await import('../src/utils/seoPolicy.mjs');
  const root = await mkdtemp(path.join(os.tmpdir(), 'linguax-seo-'));
  try {
    const files = {
      'docs/start.md': '---\ntitle: Start\n---\nStart using the app.\n',
      'docs/guide.md': '---\ntitle: Guide\n---\nEnglish instructions.\n',
      'i18n/zh-Hans/docusaurus-plugin-content-docs/current/start.md': '---\ntitle: 开始\n---\n开始使用应用。\n',
      'i18n/ja/docusaurus-plugin-content-docs/current/start.md': '---\ntitle: Start\n---\nStart using the app.\n',
      'blog/post.md': '---\nslug: release\n---\nRelease notes.\n',
    };
    for (const [file, content] of Object.entries(files)) {
      await mkdir(path.dirname(path.join(root, file)), {recursive: true});
      await writeFile(path.join(root, file), content);
    }
    // Use Docusaurus-resolved permalinks rather than guessing from filenames.
    const allContent = {
      'docusaurus-plugin-content-docs': {default: {loadedVersions: [{docs: [
        {source: '@site/docs/start.md', permalink: '/docs/custom-start'},
        {source: '@site/docs/guide.md', permalink: '/docs/guide'},
      ]}]}},
      'docusaurus-plugin-content-blog': {default: {blogPosts: [
        {metadata: {source: '@site/blog/post.md', permalink: '/blog/release'}},
      ]}},
    };
    const manifest = await buildLocaleManifest({root, allContent, locales, currentLocale: 'en'});
    const translated = getPageSeoPolicy(manifest, '/zh-Hans/docs/custom-start', 'https://linguax.app');
    assert.equal(translated.canonicalUrl, 'https://linguax.app/zh-Hans/docs/custom-start');
    assert.deepEqual(translated.alternates.map((x) => x.language), ['en', 'zh-CN', 'x-default']);
    assert.equal(translated.indexable, true);
    const fallback = getPageSeoPolicy(manifest, '/ja/docs/custom-start', 'https://linguax.app');
    assert.equal(fallback.canonicalUrl, 'https://linguax.app/docs/custom-start');
    assert.equal(fallback.contentLanguage, 'en');
    assert.equal(fallback.indexable, false);
    assert.equal(getPageSeoPolicy(manifest, '/zh-Hans/docs/guide', 'https://linguax.app').indexable, false);
    assert.equal(getPageSeoPolicy(manifest, '/ja/blog/release', 'https://linguax.app').indexable, false);
    assert.equal(getPageSeoPolicy(manifest, '/ja/blog/tags/macos', 'https://linguax.app').indexable, false);
    const home = getPageSeoPolicy(manifest, '/ja/', 'https://linguax.app');
    assert.equal(home.canonicalUrl, 'https://linguax.app/ja/');
    assert.equal(home.alternates.length, 4);
  } finally {
    await rm(root, {recursive: true, force: true});
  }
});

test('localized build metadata resolves the same translation availability as English', async () => {
  const {buildLocaleManifest} = await import('../plugins/seo/manifest.mjs');
  const root = await mkdtemp(path.join(os.tmpdir(), 'linguax-seo-'));
  try {
    for (const [file, text] of [
      ['docs/guide.md', 'English guide.'],
      ['i18n/zh-Hans/docusaurus-plugin-content-docs/current/guide.md', '中文指南。'],
    ]) {
      await mkdir(path.dirname(path.join(root, file)), {recursive: true});
      await writeFile(path.join(root, file), text);
    }
    const manifest = await buildLocaleManifest({root, locales, currentLocale: 'zh-Hans', allContent: {
      'docusaurus-plugin-content-docs': {default: {loadedVersions: [{docs: [
        {source: '@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/guide.md', permalink: '/zh-Hans/docs/guide'},
      ]}]}},
    }});
    assert.deepEqual(manifest.routes['/docs/guide'], ['en', 'zh-Hans']);
  } finally {
    await rm(root, {recursive: true, force: true});
  }
});
