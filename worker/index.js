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

// 站内 301 重定向表。键 = 老路径（前导 /、无 trailing slash、不含语言前缀），值 = 目标路径。
// 查表时会先剥掉 /zh-Hans 这类语言前缀，命中后再把前缀原样加回去，
// 所以每条只写一份就能覆盖全部 9 种语言。
//
// 这里是全站唯一的重定向出口。原先有一半条目走 Docusaurus 的 client-redirects 插件，
// 那个插件只能生成 200 + <meta http-equiv=refresh> 的中转页：多一次往返，且 301 才是
// 搜索引擎首选的权重传递方式。2026-07-28 起全部收敛到这里，插件已移除。
const REDIRECTS_301 = {
  // 2026-06-11 早期 IA 重构 (commit 3b41f97 / 4303195)
  // docs/guides/* 整体被拆散到 input-source / mouse-plus / getting-started
  '/docs/guides/multilingual-workflow': '/docs/input-source/multilingual-workflow',
  '/docs/guides/mouse-enhancement-basics': '/docs/mouse-plus/overview',
  '/docs/guides/setup-for-designers': '/docs/getting-started/setup-for-designers',
  '/docs/guides/setup-for-developers': '/docs/getting-started/setup-for-developers',
  // browser-domain-rules 已并入 app-and-website-rules
  '/docs/guides/browser-domain-rules': '/docs/input-source/app-and-website-rules',
  // use-cases → mouse-plus/recipes
  '/docs/use-cases/map-mouse-side-buttons-macos': '/docs/mouse-plus/recipes/map-mouse-side-buttons-macos',
  '/docs/use-cases/disable-mouse-acceleration-mac': '/docs/mouse-plus/recipes/disable-mouse-acceleration-mac',
  '/docs/use-cases/fix-choppy-mouse-scrolling-macos': '/docs/mouse-plus/recipes/fix-choppy-mouse-scrolling-macos',
  '/docs/use-cases/reverse-scroll-direction-mouse-only-mac': '/docs/mouse-plus/recipes/reverse-scroll-direction-mouse-only-mac',
  '/docs/use-cases/macos-dictation-mouse-button': '/docs/mouse-plus/recipes/macos-dictation-mouse-button',
  // use-cases → push-to-talk
  '/docs/use-cases/push-to-talk-voice-typing-mac': '/docs/push-to-talk/push-to-talk-voice-typing-mac',
  '/docs/use-cases/best-push-to-talk-app-mac': '/docs/push-to-talk/best-push-to-talk-app-mac',
  '/docs/use-cases/wispr-flow-superwhisper-hotkey-mac': '/docs/push-to-talk/wispr-flow-superwhisper-hotkey-mac',
  // use-cases → input-source
  '/docs/use-cases/auto-switch-input-source-app-domain-mac': '/docs/input-source/auto-switch-input-source-app-domain-mac',
  // use-cases → comparisons
  '/docs/use-cases/logi-options-plus-alternative-macos': '/docs/comparisons/logi-options-plus-alternative-macos',
  '/docs/use-cases/bettermouse-alternative-mac': '/docs/comparisons/bettermouse-alternative-mac',
  '/docs/use-cases/mac-mouse-fix-alternative-macos': '/docs/comparisons/mac-mouse-fix-alternative-macos',
  '/docs/use-cases/mos-vs-linearmouse-vs-mac-mouse-fix': '/docs/comparisons/mos-vs-linearmouse-vs-mac-mouse-fix',
  '/docs/use-cases/mx-master-3s-mac-setup-without-logi-options': '/docs/comparisons/mx-master-3s-mac-setup-without-logi-options',
  // mouse-plus fundamentals 收纳
  '/docs/mouse-plus/smooth-scrolling': '/docs/mouse-plus/fundamentals/smooth-scrolling',
  '/docs/mouse-plus/button-mapping': '/docs/mouse-plus/fundamentals/button-mapping',
  '/docs/mouse-plus/gesture-mapping': '/docs/mouse-plus/fundamentals/gesture-mapping',
  '/docs/mouse-plus/pointer-speed': '/docs/mouse-plus/fundamentals/pointer-speed',
  '/docs/mouse-plus/app-scoped-overrides': '/docs/mouse-plus/fundamentals/app-scoped-overrides',
  // core-concepts → concepts + automation 拆散
  '/docs/core-concepts/how-linguax-works': '/docs/concepts/how-linguax-works',
  '/docs/core-concepts/rules-and-priority': '/docs/concepts/rules-and-priority',
  '/docs/automation/shortcut-and-hotkeys': '/docs/concepts/shortcut-and-hotkeys',
  '/docs/automation/backup-and-restore': '/docs/reference/backup-and-restore',
  // workflows → getting-started
  '/docs/workflows/setup-for-developers': '/docs/getting-started/setup-for-developers',
  '/docs/workflows/setup-for-designers': '/docs/getting-started/setup-for-designers',
  // faq / pricing-and-license / releases → reference
  '/docs/faq/general': '/docs/reference/faq-general',
  '/docs/faq/privacy-and-security': '/docs/reference/privacy-and-security',
  '/docs/pricing-and-license/trial-vs-lifetime': '/docs/reference/trial-vs-lifetime',
  // trial-vs-lifetime.md 曾经有 slug override 到 /pricing-and-license/free-vs-pro
  // 保护那个历史 URL 也不断链
  '/docs/pricing-and-license/free-vs-pro': '/docs/reference/trial-vs-lifetime',
  '/docs/pricing-and-license/license-activation': '/docs/reference/license-activation',
  '/docs/pricing-and-license/refunds-and-invoice': '/docs/reference/refunds-and-invoice',
  '/docs/releases/changelog': '/docs/reference/changelog',
  // 2026-07-28 补:上面两轮 IA 重构漏掉的旧 URL。
  // 用 git --diff-filter=RD 把历史上消失过的 docs 页与本列表比对后补齐,
  // GSC 报的 conflict-with-other-ime-tools 只是其中一条。
  // troubleshooting:3b41f97 里 conflict→conflicts、去掉了 ime
  '/docs/troubleshooting/conflict-with-other-ime-tools': '/docs/troubleshooting/conflicts-with-other-tools',
  // features/* 整体拆散(经 automation / input-source 中转,这里直接指向终点)
  '/docs/features/backup-and-restore': '/docs/reference/backup-and-restore',
  '/docs/features/shortcut-and-hotkeys': '/docs/concepts/shortcut-and-hotkeys',
  '/docs/features/input-source-auto-switch': '/docs/input-source/auto-switch',
  // 这两页被合并而非重命名,内容归入 app-and-website-rules
  // (与上面 guides/browser-domain-rules 同一归宿)
  '/docs/features/website-language-mapping': '/docs/input-source/app-and-website-rules',
  '/docs/core-concepts/app-rules-vs-website-rules': '/docs/input-source/app-and-website-rules',
  // core-concepts 里先改名再移动的一页
  '/docs/core-concepts/profiles-and-priority': '/docs/concepts/rules-and-priority',

  // 内容整合：blog 版并入 docs 版，消除关键词自相蚕食。
  // target 直连 /docs/comparisons/，不经中转。
  // （这条原本只在 worker 里精确匹配英文站；并入本表后自动覆盖全部语言。）
  '/blog/logi-options-plus-alternative-macos': '/docs/comparisons/logi-options-plus-alternative-macos',
}

/**
 * 查重定向表：先按原路径精确匹配，再剥掉语言前缀重试，命中后把前缀加回去。
 * 这样 /zh-Hans/docs/faq/general 会跳到 /zh-Hans/docs/reference/faq-general，
 * 停留在同一语言站，而表里只需维护一条不带前缀的记录。
 */
function resolveRedirect(pathname) {
  const direct = REDIRECTS_301[pathname]
  if (direct) return direct

  const prefix = pathname.match(LOCALE_PREFIX)
  if (!prefix) return null

  const target = REDIRECTS_301[pathname.slice(prefix[0].length) || '/']
  return target ? prefix[0] + target : null
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
  const redirectTarget = resolveRedirect(normalizedPath)
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
