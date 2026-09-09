import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const affiliateLabel = 'Affiliate Program';
const affiliateUrl = 'https://qijing.gumroad.com/affiliates';
const mastodonLabel = 'mastodon';
const mastodonUrl = 'https://mastodon.social/@deepzz';

test('footer exposes the Gumroad affiliate program after the purchase link', async () => {
  const config = await readFile(
    path.join(repositoryRoot, 'docusaurus.config.ts'),
    'utf8',
  );
  const purchaseLinkIndex = config.indexOf('label: "Buy via Gumroad"');
  const affiliateLabelIndex = config.indexOf(`label: "${affiliateLabel}"`);
  const affiliateUrlIndex = config.indexOf(`href: "${affiliateUrl}"`);

  assert.notEqual(purchaseLinkIndex, -1, 'purchase link must exist');
  assert.ok(
    affiliateLabelIndex > purchaseLinkIndex,
    'affiliate link must follow the purchase link',
  );
  assert.ok(
    affiliateUrlIndex > affiliateLabelIndex,
    'affiliate link must point to the Gumroad affiliate application',
  );
});

test('locales keep the affiliate footer label in English', async () => {
  const i18nRoot = path.join(repositoryRoot, 'i18n');
  const locales = await readdir(i18nRoot, { withFileTypes: true });

  for (const locale of locales.filter((entry) => entry.isDirectory())) {
    const footerPath = path.join(
      i18nRoot,
      locale.name,
      'docusaurus-theme-classic',
      'footer.json',
    );
    const footer = JSON.parse(await readFile(footerPath, 'utf8'));

    assert.equal(
      footer[`link.item.label.${affiliateLabel}`],
      undefined,
      `${locale.name} must not override ${affiliateLabel}`,
    );
  }
});

test('footer exposes the verified Mastodon profile', async () => {
  const config = await readFile(
    path.join(repositoryRoot, 'docusaurus.config.ts'),
    'utf8',
  );
  const mastodonLabelIndex = config.indexOf(`label: "${mastodonLabel}"`);
  const mastodonUrlIndex = config.indexOf(`href: "${mastodonUrl}"`);
  const relMeIndex = config.indexOf('rel: "me"', mastodonUrlIndex);

  assert.notEqual(mastodonLabelIndex, -1, 'Mastodon link must exist');
  assert.ok(
    mastodonUrlIndex > mastodonLabelIndex,
    'Mastodon link must point to the official profile',
  );
  assert.ok(
    relMeIndex > mastodonUrlIndex,
    'Mastodon link must include rel="me" for profile verification',
  );
});

test('every locale includes the Mastodon footer label', async () => {
  const i18nRoot = path.join(repositoryRoot, 'i18n');
  const locales = await readdir(i18nRoot, {withFileTypes: true});

  for (const locale of locales.filter((entry) => entry.isDirectory())) {
    const footerPath = path.join(
      i18nRoot,
      locale.name,
      'docusaurus-theme-classic',
      'footer.json',
    );
    const footer = JSON.parse(await readFile(footerPath, 'utf8'));

    assert.equal(
      footer[`link.item.label.${mastodonLabel}`]?.message,
      mastodonLabel,
      `${locale.name} must include the Mastodon label`,
    );
  }
});

test('footer renders Mastodon as a social icon', async () => {
  const linkItem = await readFile(
    path.join(repositoryRoot, 'src/theme/Footer/LinkItem.tsx'),
    'utf8',
  );

  assert.match(
    linkItem,
    /mastodon:\s*<svg/,
    'Mastodon must have an SVG entry in the social icon map',
  );
});

test('footer uses the official 24px GitHub mark', async () => {
  const linkItem = await readFile(
    path.join(repositoryRoot, 'src/theme/Footer/LinkItem.tsx'),
    'utf8',
  );

  assert.match(
    linkItem,
    /github:\s*<svg[^>]*width="24"[^>]*height="24"[^>]*>\s*<path d="M10\.226 17\.284/,
    'GitHub icon must use the official Octicon mark',
  );
});
