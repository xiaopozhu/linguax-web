import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const stylesheet = await readFile(
  new URL('../src/css/landing.css', import.meta.url),
  'utf8'
);
const homepage = await readFile(
  new URL('../src/pages/index.tsx', import.meta.url),
  'utf8'
);

const uniformHeaderKeys = [
  'landing.home.pain.description',
  'landing.home.input.description',
  'landing.home.compare.section.label',
  'landing.home.shots.section.label',
  'landing.home.shots.description',
  'landing.home.testimonials.section.label',
  'landing.home.audience.section.label',
  'landing.home.audience.description',
  'landing.home.guides.section.label',
  'landing.home.guides.description',
  'landing.home.compat.section.label',
  'landing.home.faq.section.label',
  'landing.home.faq.description'
];

test('homepage sections use one header-to-content spacing rule', () => {
  assert.match(
    stylesheet,
    /\.lx-section\s*>\s*h2\s*\+\s*:not\(\.lx-section-desc\),\s*\.lx-section\s*>\s*\.lx-section-desc\s*\+\s*\*\s*{[^}]*margin-top:\s*20px;/s
  );
  assert.match(
    stylesheet,
    /\.lx-section-desc\s*{[^}]*margin:\s*8px\s+0\s+0;[^}]*max-width:\s*780px;/s
  );
});

test('section and screenshot elements do not leak browser default margins', () => {
  assert.match(
    stylesheet,
    /\.lx-section\s*{[^}]*display:\s*flow-root;/s
  );
  assert.match(
    stylesheet,
    /\.lx-shot\s*{[^}]*margin:\s*0;/s
  );
});

test('every primary homepage section has a complete header hierarchy', () => {
  for (const key of uniformHeaderKeys) {
    assert.ok(homepage.includes(`id="${key}"`), `homepage is missing ${key}`);
  }
});

for (const locale of ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'de', 'fr', 'ru', 'id']) {
  test(`${locale} includes the complete section header translations`, async () => {
    const translations = JSON.parse(
      await readFile(new URL(`../i18n/${locale}/code.json`, import.meta.url), 'utf8')
    );

    for (const key of uniformHeaderKeys) {
      assert.ok(translations[key]?.message, `${locale} is missing ${key}`);
    }
  });
}
