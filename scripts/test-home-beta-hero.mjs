import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const homeSource = await readFile(new URL('src/pages/index.tsx', root), 'utf8');
const downloadSource = await readFile(new URL('src/pages/download.tsx', root), 'utf8');
const pricingSource = await readFile(new URL('src/pages/pricing.tsx', root), 'utf8');
const landingStyles = await readFile(new URL('src/css/landing.css', root), 'utf8');
const siteConfig = await readFile(new URL('docusaurus.config.ts', root), 'utf8');

test('homepage routes every download entry point to the default download page', () => {
  assert.match(homeSource, /const \{ releaseInfo, betaReleaseInfo \} = useDownload\(\)/);
  assert.match(homeSource, /siteConfig\.customFields\?\.macOSBetaDownloadEnabled/);
  assert.match(homeSource, /const downloadUrl = useBaseUrl\('\/download'\)/);
  assert.ok(!homeSource.includes(['channel', 'beta'].join('=')));
  assert.doesNotMatch(homeSource, /betaDownloadPageUrl/);
  assert.match(homeSource, /className="lx-hero-beta-callout"/);
  assert.match(homeSource, /landing\.home\.hero\.beta\.kicker[\s\S]*?>New LinguaX<\/Translate>[\s\S]*?<span className="lx-beta-chip-badge">Beta<\/span>/);
  assert.match(homeSource, /href=\{downloadUrl\}/);
  assert.match(homeSource, /href=\{pricingUrl\}/);
  assert.doesNotMatch(homeSource, /PUBLIC_BETA_DOWNLOAD_URL|LinguaX 6000/);
  assert.match(siteConfig, /MACOS_BETA_DOWNLOAD_ENABLED !== 'false'/);
});

test('homepage product preview remains visible and themed across breakpoints', async () => {
  const copyPosition = homeSource.indexOf('className="lx-hero-copy"');
  const mediaPosition = homeSource.indexOf('className="lx-hero-media"');
  const detailsPosition = homeSource.indexOf('className="lx-hero-details"');

  assert.ok(copyPosition < mediaPosition && mediaPosition < detailsPosition);
  assert.match(homeSource, /linguax-beta-window\.png/);
  assert.match(homeSource, /linguax-beta-window-dark\.png/);
  assert.match(homeSource, /sources=\{\{[\s\S]*?light:\s*betaPreviewImageUrl,[\s\S]*?dark:\s*betaPreviewDarkImageUrl/);
  const betaPreviewRule = landingStyles.match(/\.lx-hero-beta-preview\s*\{([^}]*)\}/)?.[1];
  assert.ok(betaPreviewRule, 'the beta preview should have an explicit style rule');
  assert.doesNotMatch(
    betaPreviewRule,
    /\bdisplay\s*:/,
    'preview layout must not override Docusaurus ThemedImage visibility during SSR',
  );
  assert.match(landingStyles, /\.lx-home-hero > \.lx-hero-media\s*\{[\s\S]*?position:\s*absolute[\s\S]*?mask-image:/);
  assert.match(landingStyles, /\.lx-home-hero \.lx-hero-beta-callout\s*\{[\s\S]*?position:\s*absolute[\s\S]*?transform:\s*translateY\(-50%\)/);
  assert.match(landingStyles, /@media\s*\(max-width:\s*920px\)[\s\S]*?\.lx-home-hero > \.lx-hero-media\s*\{[\s\S]*?position:\s*relative[\s\S]*?transform:\s*none/);
  assert.doesNotMatch(landingStyles, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.lx-hero-beta-preview\s*\{[^}]*display:\s*none/s);

  const lightImage = await readFile(new URL('static/img/linguax-beta-window.png', root));
  const darkImage = await readFile(new URL('static/img/linguax-beta-window-dark.png', root));
  assert.ok(lightImage.length > 0);
  assert.ok(darkImage.length > 0);
});

test('homepage-only layout selectors do not leak into other hero pages', () => {
  assert.doesNotMatch(downloadSource, /lx-home-hero/);
  assert.doesNotMatch(pricingSource, /lx-home-hero/);
  assert.doesNotMatch(landingStyles, /\.lx-hero\s*\{[^}]*display:\s*grid/s);
});

test('download page honors the beta flag and keeps visual and tab order aligned', () => {
  assert.match(downloadSource, /resolveDownloadChannel\(\{/);
  assert.match(downloadSource, /betaEnabled\s*=\s*Boolean\(siteConfig\.customFields\?\.macOSBetaDownloadEnabled\)/);
  assert.match(downloadSource, /requestedChannel\s*=\s*new URLSearchParams\(window\.location\.search\)\.get\('channel'\)/);
  assert.match(downloadSource, /betaSelected\s*=\s*betaEnabled\s*&&\s*Boolean\(betaDownloadUrl\)/);
  assert.match(downloadSource, /if \(choice\.channel === 'beta' && betaDownloadUrl\)/);
  assert.match(downloadSource, /if \(choice\.betaUnavailable && downloaded\)/);
  assert.match(downloadSource, /landing\.download\.hero\.betaUnavailable/);
  assert.match(downloadSource, /\{betaDownloadButton\}[\s\S]*?\{stableDownloadButton\}/);
  assert.doesNotMatch(landingStyles, /lx-actions-beta-requested|order:\s*-1/);
  assert.doesNotMatch(downloadSource, /PUBLIC_BETA|LinguaX 6000 Beta|macOS 27 only/);
});

test('beta copy is synchronized across every locale', async () => {
  const betaButtonMessages = {
    en: 'Download Beta',
    'zh-Hans': '下载 Beta 版',
    'zh-Hant': '下載 Beta 版',
    ja: 'ベータ版をダウンロード',
    ko: '베타 다운로드',
    de: 'Beta herunterladen',
    fr: 'Télécharger la bêta',
    ru: 'Скачать бета-версию',
    id: 'Unduh Beta',
  };
  const betaUnavailableMessages = {
    en: 'Beta is unavailable right now. The stable release was downloaded instead.',
    'zh-Hans': 'Beta 版暂不可用，已改为下载稳定版。',
    'zh-Hant': 'Beta 版目前無法使用，已改為下載穩定版。',
    ja: '現在ベータ版を利用できないため、代わりに安定版をダウンロードしました。',
    ko: '현재 베타를 사용할 수 없어 안정 버전을 대신 다운로드했습니다.',
    de: 'Die Beta ist derzeit nicht verfügbar. Stattdessen wurde die stabile Version heruntergeladen.',
    fr: 'La bêta est actuellement indisponible. La version stable a été téléchargée à la place.',
    ru: 'Бета-версия сейчас недоступна. Вместо неё загружена стабильная версия.',
    id: 'Beta saat ini tidak tersedia. Versi stabil diunduh sebagai gantinya.',
  };

  for (const [locale, buttonMessage] of Object.entries(betaButtonMessages)) {
    const messages = JSON.parse(await readFile(new URL(`i18n/${locale}/code.json`, root), 'utf8'));
    assert.equal(messages['landing.home.hero.beta.kicker']?.message, 'New LinguaX');
    assert.equal(messages['landing.download.cta.betaButton']?.message, buttonMessage);
    assert.equal(
      messages['landing.download.hero.betaUnavailable']?.message,
      betaUnavailableMessages[locale],
    );
    assert.ok(messages['landing.download.hero.betaMeta']?.message);
    assert.doesNotMatch(messages['landing.home.hero.betaPreview.alt']?.message ?? '', /6000/);
  }
});
