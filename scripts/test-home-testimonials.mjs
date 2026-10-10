import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepagePath = new URL('../src/pages/index.tsx', import.meta.url);
const stylesheetPath = new URL('../src/css/landing.css', import.meta.url);
const homepage = await readFile(homepagePath, 'utf8');
const stylesheet = await readFile(stylesheetPath, 'utf8');

const testimonialKeys = [
  'landing.home.testimonials.title',
  'landing.home.testimonials.description',
  ...Array.from({ length: 6 }, (_, index) => `landing.home.testimonials.quote${index + 1}`),
  'landing.home.testimonials.anonymous',
  'landing.home.testimonials.user',
  'landing.home.testimonials.logitechUser'
];

test('homepage renders six anonymous testimonial cards without a rating claim', () => {
  assert.match(homepage, /className="lx-section lx-testimonials lx-reveal"/);
  assert.equal(
    (homepage.match(/landing\.home\.testimonials\.quote\d/g) ?? []).length,
    6
  );
  assert.match(homepage, /className="lx-testimonial-card lx-stagger"/);
  assert.doesNotMatch(homepage, /aggregateRating/);
});

test('testimonial cards support desktop, mobile, and dark color schemes', () => {
  assert.match(stylesheet, /\.lx-testimonial-grid\s*{/);
  assert.match(stylesheet, /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(stylesheet, /\[data-theme='dark'\]\s+\.lx-testimonial-card/);
  assert.match(stylesheet, /@media\s*\(max-width:\s*920px\)[\s\S]*?\.lx-testimonial-grid[\s\S]*?grid-template-columns:\s*1fr/);
});

for (const locale of ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'de', 'fr', 'ru', 'id']) {
  test(`${locale} includes every testimonial translation`, async () => {
    const localePath = new URL(`../i18n/${locale}/code.json`, import.meta.url);
    const translations = JSON.parse(await readFile(localePath, 'utf8'));

    for (const key of testimonialKeys) {
      assert.ok(translations[key]?.message, `${locale} is missing ${key}`);
    }
  });
}
