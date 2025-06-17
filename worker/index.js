import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env, ctx)
  },
}

async function handleRequest(request, env, ctx) {
  const url = new URL(request.url)
  
  // API 代理逻辑 - 将 /api/ 请求代理到 https://api.deepzz.com
  if (url.pathname.startsWith('/api/')) {
    return handleApiProxy(request, url)
  }
  
  let options = {}

  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  // options.mapRequestToAsset = handlePrefix

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      }
    }

    // For assets serving, we can use a simple approach
    // since Cloudflare Workers now has better static asset handling
    const page = await getAssetFromKV(
      {
        request,
        waitUntil: ctx.waitUntil.bind(ctx),
      },
      {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
        ...options,
      }
    )

    // allow headers to be altered
    const response = new Response(page.body, page)

    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'unsafe-url')
    response.headers.set('Feature-Policy', 'none')

    return response
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(
          {
            request: new Request(`${url.origin}/404.html`, request),
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: env.__STATIC_CONTENT_MANIFEST,
          }
        )

        return new Response(notFoundResponse.body, { 
          ...notFoundResponse, 
          status: 404 
        })
      } catch (e) {
        // fallback to simple 404
        return new Response('Not Found', { status: 404 })
      }
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

/**
 * 处理 API 代理请求
 * 将 /api/* 的请求代理到 https://api.deepzz.com/*
 */
async function handleApiProxy(request, url) {
  try {
    // 构建目标 URL，移除 /api 前缀
    const targetPath = url.pathname.replace(/^\/api/, '')
    const targetUrl = `https://api.deepzz.com${targetPath}${url.search}`
    
    // 创建新的请求，保留原始请求的方法、头部和主体
    const proxyRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })
    
    // 发送代理请求
    const response = await fetch(proxyRequest)
    
    // 创建新的响应，添加 CORS 头部
    const proxyResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    })
    
    // 添加 CORS 头部以支持跨域请求
    proxyResponse.headers.set('Access-Control-Allow-Origin', '*')
    proxyResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    proxyResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      })
    }
    
    return proxyResponse
  } catch (error) {
    console.error('API Proxy Error:', error)
    return new Response(JSON.stringify({ 
      error: 'API proxy failed',
      message: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}
