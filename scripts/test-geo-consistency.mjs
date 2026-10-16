import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp, mkdir, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import test from 'node:test';

const checker = path.resolve('scripts/check-geo-consistency.mjs');

async function fixture(files) {
  const root = await mkdtemp(path.join(tmpdir(), 'linguax-geo-'));
  for (const [relativePath, content] of Object.entries(files)) {
    const target = path.join(root, relativePath);
    await mkdir(path.dirname(target), {recursive: true});
    await writeFile(target, content, 'utf8');
  }
  return root;
}

function run(root) {
  return spawnSync(process.execPath, [checker, '--root', root], {encoding: 'utf8'});
}

test('accepts approved local-processing wording', async () => {
  const root = await fixture({
    'docs/privacy.md': 'Core mouse behavior runs locally. AIx uses network services when invoked.\n',
  });
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
});

test('reports every prohibited GEO consistency pattern with file and line', async () => {
  const root = await fixture({
    'src/page.tsx': "const href = '/docs/releases/changelog';\n",
    'blog/post.md': 'It is under 5MB.\nNothing leaves your Mac.\n',
    'i18n/en.json': '{"copy":"nothing is sent anywhere"}\n',
  });
  const result = run(root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /src\/page\.tsx:1.*legacy-route/);
  assert.match(result.stderr, /blog\/post\.md:1.*legacy-size/);
  assert.match(result.stderr, /blog\/post\.md:2.*absolute-offline-claim/);
  assert.match(result.stderr, /i18n\/en\.json:1.*absolute-offline-claim/);
});

test('ignores internal planning documents', async () => {
  const root = await fixture({
    'docs/superpowers/specs/example.md': 'under-5MB and nothing leaves your Mac\n',
  });
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
});
