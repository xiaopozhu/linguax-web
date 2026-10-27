import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Load the deployed module unchanged, without changing this CommonJS package's type.
const source = await readFile(new URL('../worker/index.js', import.meta.url), 'utf8');
const { default: worker } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

function assets(handler) {
  const requests = [];
  return {
    requests,
    env: {
      ASSETS: {
        async fetch(request) {
          requests.push(request);
          return handler(new URL(request.url), request);
        },
      },
    },
  };
}

test('www redirects to HTTPS apex with the complete path and query before assets', async () => {
  const { env, requests } = assets(() => new Response('asset'));
  const response = await worker.fetch(new Request('https://www.linguax.app/zh-Hans/docs/intro/?a=1&a=2&next=%2F'), env);
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('location'), 'https://linguax.app/zh-Hans/docs/intro/?a=1&a=2&next=%2F');
  assert.equal(requests.length, 0);
});

test('www homepage keeps its root slash', async () => {
  const response = await worker.fetch(new Request('http://www.linguax.app/?ref=home'), {});
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('location'), 'https://linguax.app/?ref=home');
});

test('www API redirects preserve methods and bodies with 308', async () => {
  const response = await worker.fetch(new Request('https://www.linguax.app/app-api/example?q=1', {
    method: 'POST',
    body: 'example',
  }), {});
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), 'https://linguax.app/app-api/example?q=1');
});

test('legacy localized docs retain their permanent redirect and query', async () => {
  const response = await worker.fetch(new Request('https://linguax.app/ja/docs/faq/general/?from=old'), {});
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('location'), 'https://linguax.app/ja/docs/reference/faq-general?from=old');
});

for (const pathname of ['/en', '/en/']) {
  test(`legacy English homepage ${pathname} redirects to the default locale`, async () => {
    const { env, requests } = assets(() => new Response('missing', { status: 404 }));
    const response = await worker.fetch(new Request(`https://linguax.app${pathname}?ref=old`), env);
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), 'https://linguax.app/?ref=old');
    assert.equal(requests.length, 0);
  });
}

test('indexed Markdown suffix URLs retain locale and query', async () => {
  const response = await worker.fetch(new Request('https://linguax.app/zh-Hant/docs/input-source/auto-switch.md?q=1'), {});
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('location'), 'https://linguax.app/zh-Hant/docs/input-source/auto-switch?q=1');
});

test('removed localized pages return an HTML 410 before asset resolution', async () => {
  const { env, requests } = assets(() => new Response('asset'));
  const response = await worker.fetch(new Request('https://linguax.app/de/friends/'), env);
  assert.equal(response.status, 410);
  assert.match(response.headers.get('content-type'), /^text\/html/);
  assert.match(await response.text(), /This page has been removed/);
  assert.equal(requests.length, 0);
});

for (const pathname of [
  '/terms/rss.xml',
  '/zh-Hans/terms/rss.xml',
  '/docs/category/tutorial---extras',
  '/zh-Hant/docs/category/tutorial---extras/',
]) {
  test(`retired URL ${pathname} is explicitly gone`, async () => {
    const { env, requests } = assets(() => new Response('missing', { status: 404 }));
    const response = await worker.fetch(new Request(`https://linguax.app${pathname}`), env);
    assert.equal(response.status, 410);
    assert.equal(requests.length, 0);
  });
}

test('successful assets preserve bytes, status, caching and content type', async () => {
  const { env } = assets(() => new Response('body{color:red}', {
    headers: { 'content-type': 'text/css', etag: '"asset-v1"', 'cache-control': 'public, max-age=31536000' },
  }));
  const response = await worker.fetch(new Request('https://linguax.app/assets/main.css'), env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/css');
  assert.equal(response.headers.get('etag'), '"asset-v1"');
  assert.equal(response.headers.get('cache-control'), 'public, max-age=31536000');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(await response.text(), 'body{color:red}');
});

for (const [requested, canonical] of [
  ['/docs/intro/?ref=slash', '/docs/intro?ref=slash'],
  ['/ja?ref=locale', '/ja/?ref=locale'],
]) {
  test(`asset canonical redirects are permanent without changing ${canonical}`, async () => {
    const { env } = assets(() => Response.redirect(`https://linguax.app${canonical}`, 307));
    const response = await worker.fetch(new Request(`https://linguax.app${requested}`), env);
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), `https://linguax.app${canonical}`);
  });
}

test('external asset redirects keep their original temporary status', async () => {
  const { env } = assets(() => Response.redirect('https://example.com/file', 307));
  const response = await worker.fetch(new Request('https://linguax.app/file'), env);
  assert.equal(response.status, 307);
  assert.equal(response.headers.get('location'), 'https://example.com/file');
});

test('HEAD canonical redirects stay bodyless', async () => {
  const { env } = assets(() => Response.redirect('https://linguax.app/docs/intro', 307));
  const response = await worker.fetch(new Request('https://linguax.app/docs/intro/', { method: 'HEAD' }), env);
  assert.equal(response.status, 301);
  assert.equal(await response.text(), '');
});

test('missing pages use Docusaurus HTML 404 and preserve its response headers', async () => {
  const { env, requests } = assets((url) => url.pathname === '/404'
    ? new Response('<!doctype html><title>Page Not Found</title>', {
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-cache', 'x-page': '404' },
    })
    : url.pathname === '/404.html'
      ? Response.redirect('https://linguax.app/404', 307)
      : new Response('missing', { status: 404 }));
  const response = await worker.fetch(new Request('https://linguax.app/not-a-real-page'), env);
  assert.equal(response.status, 404);
  assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.equal(response.headers.get('cache-control'), 'no-cache');
  assert.equal(response.headers.get('x-page'), '404');
  assert.match(await response.text(), /Page Not Found/);
  assert.deepEqual(requests.map((request) => new URL(request.url).pathname), ['/not-a-real-page', '/404']);
});

test('missing 404 asset falls back to a real plain-text 404', async () => {
  const { env } = assets(() => new Response('missing', { status: 404 }));
  const response = await worker.fetch(new Request('https://linguax.app/missing'), env);
  assert.equal(response.status, 404);
  assert.match(response.headers.get('content-type'), /^text\/plain/);
  assert.equal(await response.text(), 'Not Found');
});

test('verification route stays available without assets', async () => {
  const response = await worker.fetch(new Request('https://linguax.app/baidu_verify_codeva-J2UNhgmOQx.html'), {});
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'e1d1abeff8b98a1f435e694737b6c016');
});

test('API GET keeps upstream path, query, identifying header and CORS without using assets', async (t) => {
  let upstream;
  t.mock.method(globalThis, 'fetch', async (request) => {
    upstream = request;
    return new Response('{"ok":true}', { headers: { 'content-type': 'application/json' } });
  });
  const { env, requests } = assets(() => new Response('asset'));
  const response = await worker.fetch(new Request('https://linguax.app/app-api/example?q=1'), env);
  assert.equal(upstream.url, 'https://api.deepzz.com/app-api/example?q=1');
  assert.equal(upstream.method, 'GET');
  assert.equal(upstream.headers.get('x-deepzz-app'), 'com.deepzz.LinguaX');
  assert.equal(response.headers.get('access-control-allow-origin'), '*');
  assert.equal(response.headers.get('content-type'), 'application/json');
  assert.equal(await response.text(), '{"ok":true}');
  assert.equal(requests.length, 0);
});

test('deployment routes invoke the Worker before assets on apex and www', async () => {
  const config = await readFile(new URL('../wrangler.toml', import.meta.url), 'utf8');
  assert.match(config, /\[assets\][\s\S]*?binding\s*=\s*"ASSETS"/);
  assert.match(config, /\[assets\][\s\S]*?run_worker_first\s*=\s*true/);
  const [root, production] = config.split('[env.production]');
  for (const section of [root, production]) {
    assert.match(section, /pattern\s*=\s*"linguax\.app\/\*"/);
    assert.match(section, /pattern\s*=\s*"www\.linguax\.app\/\*"/);
  }
});
