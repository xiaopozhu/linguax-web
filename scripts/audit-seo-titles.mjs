import fs from 'node:fs';
import path from 'node:path';

const MAX_TITLE_LENGTH = 60;
const BUILD_DIR = path.resolve('build');
const namedEntities = new Map([
  ['amp', '&'],
  ['apos', "'"],
  ['gt', '>'],
  ['lt', '<'],
  ['nbsp', ' '],
  ['quot', '"'],
]);

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code.startsWith('#x')) {
      return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    }
    if (code.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    }
    return namedEntities.get(code.toLowerCase()) ?? entity;
  });
}

function collectHtmlFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return collectHtmlFiles(entryPath);
    }
    return entry.name.endsWith('.html') ? [entryPath] : [];
  });
}

if (!fs.existsSync(BUILD_DIR)) {
  console.error('Missing build directory. Run npm run build first.');
  process.exit(1);
}

const violations = [];
const files = collectHtmlFiles(BUILD_DIR);

if (files.length === 0) {
  console.error('No HTML files found in build directory.');
  process.exit(1);
}

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) {
    violations.push({file, length: 0, title: '[missing title]'});
    continue;
  }

  const title = decodeEntities(match[1]).trim();
  if (!title) {
    violations.push({file, length: 0, title: '[empty title]'});
    continue;
  }

  const length = [...title].length;
  if (length > MAX_TITLE_LENGTH) {
    violations.push({file, length, title});
  }
}

if (violations.length > 0) {
  console.error(`Found ${violations.length} SEO title violation(s):`);
  for (const violation of violations) {
    console.error(
      `${violation.length}\t${path.relative(BUILD_DIR, violation.file)}\t${violation.title}`,
    );
  }
  process.exit(1);
}

console.log(
  `Checked ${files.length} HTML files: all titles are ${MAX_TITLE_LENGTH} characters or fewer.`,
);
