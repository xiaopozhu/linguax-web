import {readFile} from 'node:fs/promises';
import path from 'node:path';

export const GENERATED_START = '<!-- BEGIN GENERATED PRODUCT FACTS -->';
export const GENERATED_END = '<!-- END GENERATED PRODUCT FACTS -->';

function get(value, dottedPath) {
  return dottedPath.split('.').reduce((current, key) => current?.[key], value);
}

export function validateFacts(facts) {
  const errors = [];
  const required = [
    'schemaVersion',
    'lastVerified',
    'product.name',
    'product.description',
    'product.currentRelease.version',
    'product.currentRelease.date',
    'product.operatingSystem.minimumVersion',
    'publisher.name',
    'publisher.url',
    'publisher.logo',
    'publisher.email',
    'offers.trial.durationDays',
    'offers.lifetime.price',
    'offers.lifetime.currency',
    'offers.lifetime.devices',
    'privacy.coreProcessing',
    'privacy.aixTransfer',
    'privacy.networkServices',
    'privacy.optionalSync',
    'urls.home',
    'urls.download',
    'urls.pricing',
    'urls.documentation',
    'urls.changelog',
    'urls.privacy',
    'urls.terms',
    'urls.aixTerms',
    'urls.screenshot',
    'urls.facts',
    'locales.en.language',
  ];

  for (const field of required) {
    const value = get(facts, field);
    if (value === undefined || value === null || value === '') {
      errors.push(`${field} is required`);
    }
  }

  for (const [key, value] of Object.entries(facts.urls ?? {})) {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:') throw new Error();
    } catch {
      errors.push(`urls.${key} must be an absolute HTTPS URL`);
    }
  }

  for (const field of ['lastVerified', 'product.currentRelease.date']) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(get(facts, field) ?? '')) {
      errors.push(`${field} must use YYYY-MM-DD`);
    }
  }

  if (!(facts.offers?.trial?.durationDays > 0)) {
    errors.push('offers.trial.durationDays must be positive');
  }
  if (!(facts.offers?.lifetime?.price >= 0)) {
    errors.push('offers.lifetime.price must not be negative');
  }
  if (!(facts.offers?.lifetime?.devices > 0)) {
    errors.push('offers.lifetime.devices must be positive');
  }
  if (!Array.isArray(facts.product?.features) || facts.product.features.length === 0) {
    errors.push('product.features must contain at least one feature');
  }

  if (errors.length) throw new Error(errors.join('\n'));
  return facts;
}

export async function loadFacts(root = process.cwd()) {
  const raw = await readFile(path.join(root, 'data/public-product-facts.json'), 'utf8');
  return validateFacts(JSON.parse(raw));
}

export function renderPublicFacts(facts) {
  return `${JSON.stringify(validateFacts(facts), null, 2)}\n`;
}

export function renderLlmsFacts(facts) {
  validateFacts(facts);
  const {product, offers, privacy, urls, lastVerified} = facts;
  return [
    GENERATED_START,
    `> ${product.description}`,
    '',
    `- Current release: ${product.currentRelease.version} (${product.currentRelease.date})`,
    `- Platform: ${product.operatingSystem.name} ${product.operatingSystem.minimumVersion}+ (${product.operatingSystem.architectures.join(' and ')})`,
    `- Pricing: ${offers.trial.durationDays}-day full-feature trial, then $${offers.lifetime.price} ${offers.lifetime.currency} one-time for ${offers.lifetime.devices} devices; no subscription`,
    `- Local processing: ${privacy.coreProcessing}`,
    `- AIx: ${privacy.aixTransfer}`,
    `- Network services: ${privacy.networkServices}`,
    `- Optional sync: ${privacy.optionalSync}`,
    `- Machine-readable facts: ${urls.facts}`,
    `- Last verified: ${lastVerified}`,
    GENERATED_END,
  ].join('\n');
}

export function replaceGeneratedSection(source, generated) {
  const start = source.indexOf(GENERATED_START);
  const end = source.indexOf(GENERATED_END);
  if (start < 0 || end < start) {
    throw new Error('static/llms.txt is missing generated fact markers');
  }
  return `${source.slice(0, start)}${generated}${source.slice(end + GENERATED_END.length)}`;
}
