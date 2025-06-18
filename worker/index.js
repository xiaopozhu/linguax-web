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
  if (url.pathname.startsWith('/app-api/')) {
    return handleApiProxy(request, url)
  }
  
  try {
    // 在 Wrangler 4.x 中，使用新的 Assets 配置时，
    // 静态资源会自动通过 env.ASSETS.fetch() 处理
    if (env.ASSETS) {
      // 尝试从静态资源中获取文件
      const response = await env.ASSETS.fetch(request)
      
      if (response.status !== 404) {
        // 为静态资源添加安全头部
        const newResponse = new Response(response.body, response)
        newResponse.headers.set('X-XSS-Protection', '1; mode=block')
        newResponse.headers.set('X-Content-Type-Options', 'nosniff')
        newResponse.headers.set('X-Frame-Options', 'DENY')
        newResponse.headers.set('Referrer-Policy', 'unsafe-url')
        newResponse.headers.set('Feature-Policy', 'none')
        
        return newResponse
      }
    }
    
    // 如果静态资源不存在，尝试返回 404 页面
    if (env.ASSETS) {
      try {
        const notFoundRequest = new Request(`${url.origin}/404.html`, request)
        const notFoundResponse = await env.ASSETS.fetch(notFoundRequest)
        
        if (notFoundResponse.status !== 404) {
          return new Response(notFoundResponse.body, {
            ...notFoundResponse,
            status: 404
          })
        }
      } catch (e) {
        // fallback if 404.html doesn't exist
      }
    }
    
    // 最终后备 404 响应
    return new Response('Not Found', { 
      status: 404,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  } catch (e) {
    return new Response(e.message || e.toString(), { status: 500 })
  }
}

/**
 * 处理 API 代理请求
 * 将 /app-api/* 的请求代理到 https://api.deepzz.com/app-api/*
 */
async function handleApiProxy(request, url) {
  try {
    // 构建目标 URL，保留 /app-api 前缀
    const targetPath = url.pathname  // 保留完整路径包括 /app-api
    const targetUrl = `https://api.deepzz.com${targetPath}${url.search}`
    
    // 创建新的请求，保留原始请求的方法、头部和主体
    const proxyRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    })
    proxyRequest.headers.set('X-Deepzz-App', 'com.deepzz.LinguaX')
    proxyRequest.headers.set('Authorization', 'Basic ZGVlcHp6OmFteHJabVJ6ZW0=')
    
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
