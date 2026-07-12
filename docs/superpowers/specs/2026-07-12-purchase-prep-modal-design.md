# 付款前 3 步提示 Modal — 设计规范

**日期:** 2026-07-12
**范围:** 优化 `/pricing` 页面付款流程,消除"付款后不知道要去邮箱激活 License"的用户误解
**状态:** Draft,待用户确认

---

## 1. 背景与问题

### 现状
`src/hooks/usePurchase.ts` 的行为:用户点击「立即购买 $9.9」→ 立即请求 `/app-api/stripe-checkout-session` → 拿到 checkout URL → 立即 `window.location.href` 跳转到 Stripe。付款完成后 Stripe 回跳到本站带 `?success=true`,页面弹出一个 **4 秒后自动消失的 toast**:「License 已发往您所填写的邮箱中」。

### 用户实际误解
- 付款前:用户**没有任何预期**,以为"付了钱账户就自动延期"
- 付款后:唯一的告知渠道是 4 秒 toast,极易被错过或不被理解
- 结果:用户不知道要去邮箱下载 `.linguaxlicense` 文件、不知道要**双击**激活;误以为已经升级成功

### 本次范围(用户已确认)
**仅优化「付款前」**:在用户点击升级按钮后、跳转 Stripe 前,弹出一个 modal 展示 3 步完整流程(付款 → 收邮件 → 双击激活),3 秒后自动跳转。**不改造付款成功回跳页**、**不改造邮件正文**。

---

## 2. 交互蓝图

```
用户点「立即购买 $9.9」
       ↓
    [同一时刻做两件事]
       ├─ ① 弹出 modal(遮罩 + 3 步内容 + 3s 倒计时进度条)
       └─ ② 并行请求 /app-api/stripe-checkout-session
       ↓
    3 秒计时结束 且 API 返回成功
       ↓
    window.location.href = checkoutUrl(跳转 Stripe)
```

### 边界条件
| 场景 | 行为 |
|---|---|
| API 3 秒内已返回 | 倒计时走完立即跳转 |
| API > 3 秒未返回 | 底部文案从「{n} 秒后跳转到付款页面…」切换为「正在生成付款链接…」,进度条改为不定态(indeterminate),直到 API 返回后立即跳转 |
| API 报错 | 关闭 modal,复用 hook 原有 `error` 状态,由 `pricing.tsx` 现有 `errorInline` 展示 |
| 用户重复点击 | 按钮已有 `loading` 禁用,防重复;若无 loading 状态因 modal 已打开也不响应第二次 |
| 用户想反悔 | **无关闭按钮、不响应 ESC、遮罩不响应点击关闭**。反悔路径:落到 Stripe 后再取消(现有 `?cancel=true` toast 逻辑不变) |

**为何决定"不给逃逸路径":** 用户已经明确决定升级并按下按钮,modal 只是信息告知,不是二次确认。加关闭按钮等于把这次改造退化回原来的问题(用户跳过提示、错过关键信息)。

---

## 3. 视觉结构

```
┌─ 遮罩(rgba(0,0,0,.55) + backdrop-blur 8px) ────────────┐
│                                                          │
│   ┌─ Modal(max-width 480px, radius 16px, padding 32px) ┐│
│   │                                                     ││
│   │         💎  Before we send you to checkout          ││
│   │         ────────────────────────                    ││
│   │                                                     ││
│   │  ①  Complete payment                                ││
│   │      We'll open Stripe's secure checkout in a       ││
│   │      moment.                                        ││
│   │                                                     ││
│   │  ②  📧 Check your inbox for the license             ││
│   │      Your license is emailed to the address you     ││
│   │      enter at checkout. Check spam/promotions if    ││
│   │      you don't see it.                              ││
│   │                                                     ││
│   │  ③  ⚡ Double-click the license to activate         ││
│   │      Install LinguaX (if you haven't), then         ││
│   │      double-click the .linguaxlicense attachment.   ││
│   │      Activation is automatic.                       ││
│   │                                                     ││
│   │  ──────────────────────                             ││
│   │  ▓▓▓▓▓░░░░░  Opening checkout in 2s…                ││
│   │                                                     ││
│   └─────────────────────────────────────────────────────┘│
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 样式约束
- 使用 `src/css/landing.css` 的现有 CSS 变量;深色/浅色模式自动跟随
- 遮罩使用 `backdrop-filter: blur(8px)`(与站点 hero 卡片风格一致)
- 序号 badge:圆形 24×24,主色底 + 白字
- 进度条:1 条底部薄条,填充色使用主色,`width` 由 `100% → 0%` 线性收缩 3 秒
- 无关闭按钮 / 无 CTA / 无「取消」

---

## 4. 文案与 i18n

站点默认语言英文,已有 `zh-Hans`、`ja` 翻译目录。新增 i18n key:

| Key | English (default) | 简体中文 | 日本語 |
|---|---|---|---|
| `pricing.prepModal.title` | Before we send you to checkout | 付款前请知悉 | お支払いの前に |
| `pricing.prepModal.step1.title` | Complete payment | 完成付款 | お支払いを完了 |
| `pricing.prepModal.step1.body` | We'll open Stripe's secure checkout in a moment. | 即将跳转到 Stripe 安全付款页面 | Stripe の安全な決済ページへ移動します |
| `pricing.prepModal.step2.title` | Check your inbox for the license | 查收 License 邮件 | メールで License を受け取る |
| `pricing.prepModal.step2.body` | Your license is emailed to the address you enter at checkout. Check spam/promotions if you don't see it. | 我们会把 License 发到你付款时填写的邮箱,如未收到请检查垃圾邮件夹 | 決済時に入力したメールアドレスに License が届きます。届かない場合は迷惑メールをご確認ください |
| `pricing.prepModal.step3.title` | Double-click the license to activate | 双击 License 附件激活 | License ファイルをダブルクリックで有効化 |
| `pricing.prepModal.step3.body` | Install LinguaX (if you haven't), then double-click the `.linguaxlicense` attachment. Activation is automatic — your existing trial period will not extend on its own. | 已安装 LinguaX → 双击 `.linguaxlicense` 附件 → 自动激活。**你原本的试用有效期不会自动延长,必须激活 License 才能升级到终身版** | LinguaX をインストール後、`.linguaxlicense` 添付ファイルをダブルクリックで自動有効化されます。**既存の試用期間は自動延長されません。ライセンスを有効化する必要があります** |
| `pricing.prepModal.countdown` | Opening checkout in {seconds}s… | {seconds} 秒后跳转到付款页面… | {seconds}秒後に決済ページへ移動します… |
| `pricing.prepModal.waiting` | Preparing your secure checkout link… | 正在生成付款链接… | 決済リンクを準備中… |

### 核心纠偏(step3.body 附加句)
三语版本都在第 3 步副标题末尾**显式**说明「已有试用期不会自动延长,必须激活 License 才能升级」。这是直接击碎"付了就自动延期"误解的关键一句 — 位置在最后一步、正对倒计时上方,注意力最集中。

---

## 5. 实现落点

### 改造范围
| 文件 | 动作 |
|---|---|
| `src/components/PurchasePrepModal/index.tsx` | **新增** — modal UI 组件 |
| `src/components/PurchasePrepModal/styles.module.css` | **新增** — 遮罩 / modal / 进度条样式 |
| `src/hooks/usePurchase.ts` | **修改** — 引入 modal 状态 & 3 秒计时;拿到 URL 后不再立即跳转,推迟到「计时结束 && API 完成」 |
| `src/pages/pricing.tsx` | **修改一行** — 渲染 `{modalNode}` |
| `i18n/zh-Hans/code.json`、`i18n/ja/code.json`(以及其它已存在语言) | **新增翻译 key** |

**不改动:**
- `src/components/PricingSection/index.tsx`(dead code,未被任何页面 import,不动它避免扩大 scope)
- `src/pages/pricing.tsx` 现有的两个购买按钮 `<button onClick={handlePurchase}>`(hook 内部处理 modal,按钮无需感知)
- 付款成功后的 `?success=true` toast 逻辑(本次范围外)

### Hook API 变化
```typescript
// 现有:
const { purchase, loading, error } = usePurchase();

// 新版:
const { purchase, loading, error, modalNode } = usePurchase();
```

`modalNode` 是 `<PurchasePrepModal ... />` 或 `null`。页面渲染时插入到根节点末尾即可(选用「hook 返回节点由页面挂载」模式,而非 hook 内部 `ReactDOM.createPortal`,理由:纯 React,不引入 DOM 副作用,SSR 也安全 — Docusaurus 是 SSG)。

### Hook 内部状态机
```
idle ──purchase()──▶ preparing (modal 打开 + API 请求 + 计时 3s)
                        │
                        ├─ API 成功 & 计时结束 ──▶ redirecting (window.location.href)
                        │
                        ├─ API 成功 & 计时未结束 ──▶ 等计时到,再跳
                        │
                        ├─ API 未返回 & 计时结束 ──▶ waiting (文案切换) ──▶ API 返回后跳
                        │
                        └─ API 报错 ──▶ error (关闭 modal, 复用 error 状态)
```

**关键实现细节:**
- 用 `useRef` 保存计时器和 API promise,避免 re-render 触发重复
- 倒计时用 `setInterval(_, 100)` 更新剩余秒数(向上取整显示),unmount 时清理
- 若 hook 卸载(如用户导航离开),清理所有定时器和 pending promise 引用

---

## 6. a11y 与边界

- Modal 根元素:`role="dialog"` `aria-modal="true"` `aria-labelledby="prep-modal-title"`
- 倒计时区域:`aria-live="polite"`,让屏幕阅读器可读出剩余时间
- 打开 modal 时:`document.body.style.overflow = 'hidden'` 防背景滚动;关闭时还原
- 焦点管理:modal 打开时把焦点移到 modal 根;关闭时不必回焦(因关闭即跳走)
- 无键盘逃逸路径 — ESC 键不响应(与「无关闭按钮」策略一致)
- 遮罩点击不关闭
- prefers-reduced-motion:进度条动画禁用,改为静态显示当前秒数

---

## 7. 不做什么(明确 out of scope)

- ❌ 不改造付款成功页的 toast(用户明确说 scope 仅付款前)
- ❌ 不改邮件正文(后端范畴)
- ❌ 不加"跳过等待"按钮(用户明确说无按钮)
- ❌ 不加"取消"按钮(用户明确说无确认)
- ❌ 不改 `PricingSection` 组件(dead code,不扩大 scope)
- ❌ 不加"不再提示"选项(3 秒代价极低,且此提示对每个用户都必要 — 一次付款就一次)

---

## 8. 验收标准

- [ ] 点击 `/pricing` 页任一「Upgrade to Lifetime」/「Buy Lifetime」按钮 → modal 立即出现
- [ ] modal 展示完整 3 步内容,底部倒计时可见
- [ ] 无网络问题时:3 秒后跳转到 Stripe checkout
- [ ] 模拟 API 慢响应(> 3s):文案切换为「Preparing your secure checkout link…」直到跳转
- [ ] 模拟 API 报错:modal 消失,页面显示错误
- [ ] EN / zh-Hans / ja 三语言下 modal 文案正确
- [ ] 深色 / 浅色模式下 modal 样式正确
- [ ] 移动端 modal 宽度自适应、内容不溢出
- [ ] `prefers-reduced-motion` 用户不看到进度条动画
