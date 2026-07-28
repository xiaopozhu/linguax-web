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

// 301 重定向表：SEO 权重合并
// 键 = 待跳转的老路径（含前导 /、不含 trailing slash 与查询串）
// 值 = 目标路径
const REDIRECTS_301 = {
  // 内容整合：blog 版并入 docs 版，消除关键词自相蚕食
  // target 直连新分类 /docs/comparisons/，避免经过 Docusaurus client redirect 双跳
  '/blog/logi-options-plus-alternative-macos': '/docs/comparisons/logi-options-plus-alternative-macos',
}

// 非默认语言的路径前缀，用于把 /zh-Hans/xxx 归一化成 /xxx 再做匹配
const LOCALES = ['zh-Hans', 'zh-Hant', 'ja', 'ko', 'de', 'fr', 'ru', 'id']
const LOCALE_PREFIX = new RegExp(`^/(?:${LOCALES.join('|')})(?=/|$)`)

// 带 .md 后缀的 docs URL → 去掉后缀。
// 成因：2026-06 的一批译文里相对 markdown 链接没能解析成路由，页面上渲染出了
// /docs/xxx.md 这样的链接，被 Google 抓走并索引。链接源头已在 commit 81feb2f 修掉，
// 但已经进了索引的 URL 只能靠 301 收敛，否则会长期以 404 挂在 GSC 里。
// 这里用通配而不是逐条列举：受影响的 URL 数量未知，且每个 locale 都有一份。
const MD_SUFFIX = new RegExp(`^(/(?:(?:${LOCALES.join('|')})/)?docs/.+)\\.md$`)

// 主动下线、且不存在等价新页面的路径（已剥掉 locale 前缀）。
// 用 410 而不是放任 404：410 明确告诉搜索引擎"永久删除"，移除比 404 快得多；
// 也不能 301 到首页——内容毫不相关，会被判成软 404。
const GONE_PATHS = new Set([
  '/friends', // 友链交换页，2026-06-11 commit 16fc88c 主动移除
])

async function handleRequest(request, env, ctx) {
  const url = new URL(request.url)

  // 301 重定向：在任何静态资源解析之前处理
  const normalizedPath = url.pathname.replace(/\/+$/, '') || '/'
  const redirectTarget = REDIRECTS_301[normalizedPath]
  if (redirectTarget) {
    const location = new URL(redirectTarget + url.search, url.origin).toString()
    return Response.redirect(location, 301)
  }

  // 误入索引的 .md 后缀 URL → 去掉后缀，保留原有 locale 前缀
  const mdMatch = normalizedPath.match(MD_SUFFIX)
  if (mdMatch) {
    const location = new URL(mdMatch[1] + url.search, url.origin).toString()
    return Response.redirect(location, 301)
  }

  // 已永久下线的路径：返回 410，同时给访客一个能点回首页的页面
  const withoutLocale = normalizedPath.replace(LOCALE_PREFIX, '') || '/'
  if (GONE_PATHS.has(withoutLocale)) {
    return new Response(
      '<!doctype html><html lang="en"><meta charset="utf-8">' +
        '<title>Page removed — LinguaX</title>' +
        '<body style="font-family:system-ui;max-width:34rem;margin:20vh auto;padding:0 1.5rem;line-height:1.6">' +
        '<h1 style="font-size:1.25rem">This page has been removed</h1>' +
        '<p>It is gone for good rather than moved, so there is no new address to send you to.</p>' +
        '<p><a href="/">Go to the LinguaX homepage</a></p></body></html>',
      { status: 410, headers: { 'content-type': 'text/html; charset=utf-8' } },
    )
  }

  // API 代理逻辑 - 将 /api/ 请求代理到 https://api.deepzz.com
  if (url.pathname.startsWith('/app-api/')) {
    return handleApiProxy(request, url)
  }

  if (url.pathname === '/baidu_verify_codeva-J2UNhgmOQx.html') {
    return new Response('e1d1abeff8b98a1f435e694737b6c016', {
      headers: { 'content-type': 'text/plain' }
    })
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
