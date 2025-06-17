// worker/index.js
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. 代理 /api/* 请求到后端（按需启用）
    if (url.pathname.startsWith('/api/')) {
      const targetUrl = new URL(url.pathname, env.API_BASE_URL);
      return fetch(targetUrl, request); // 透传请求
    }

    // 2. 静态文件托管（主逻辑）
    try {
      return await getAssetFromKV(
        { request, waitUntil: ctx.waitUntil },
        { cacheControl: { edgeTTL: 86400 } } // 边缘缓存 1 天
      );
    } catch (e) {
      return new Response('404 Not Found', { status: 404 });
    }
  }
};