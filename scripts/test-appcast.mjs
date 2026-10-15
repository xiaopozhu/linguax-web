import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(projectRoot, 'src/hooks/useDownload.ts');
const source = readFileSync(sourcePath, 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    esModuleInterop: true,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
  fileName: sourcePath,
}).outputText;
const loadedModule = {exports: {}};
const loadCompiledModule = new Function(
  'exports',
  'require',
  'module',
  '__filename',
  '__dirname',
  compiled,
);
loadCompiledModule(
  loadedModule.exports,
  require,
  loadedModule,
  sourcePath,
  dirname(sourcePath),
);

test('selects stable and beta releases from their Sparkle channels', () => {
  const {selectAppcastReleases} = loadedModule.exports;
  const beta = {version: '2025.12 (5118)', downloadUrl: 'beta.zip'};
  const stable = {version: '2025.12 (5017)', downloadUrl: 'stable.zip'};
  const nightly = {version: '2025.12 (5200)', downloadUrl: 'nightly.zip'};

  const result = selectAppcastReleases([
    {channel: 'beta', releaseInfo: beta},
    {releaseInfo: stable},
    {channel: 'nightly', releaseInfo: nightly},
  ]);

  assert.deepEqual(result, {
    stableReleaseInfo: stable,
    betaReleaseInfo: beta,
  });
});

test('uses beta by default when it is enabled and available', () => {
  const {resolveDownloadChannel} = loadedModule.exports;

  assert.deepEqual(resolveDownloadChannel({
    requestedChannel: 'beta',
    betaEnabled: true,
    betaDownloadUrl: 'beta.zip',
  }), {
    channel: 'beta',
    betaUnavailable: false,
  });

  assert.deepEqual(resolveDownloadChannel({
    requestedChannel: 'beta',
    betaEnabled: false,
    betaDownloadUrl: 'beta.zip',
  }), {
    channel: 'stable',
    betaUnavailable: true,
  });

  assert.deepEqual(resolveDownloadChannel({
    requestedChannel: 'beta',
    betaEnabled: true,
    betaDownloadUrl: undefined,
  }), {
    channel: 'stable',
    betaUnavailable: true,
  });

  assert.deepEqual(resolveDownloadChannel({
    requestedChannel: null,
    betaEnabled: true,
    betaDownloadUrl: 'beta.zip',
  }), {
    channel: 'beta',
    betaUnavailable: false,
  });
});
