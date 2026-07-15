# LinguaX 文档站标准（Track A v2）

**日期:** 2026-07-15
**范围:** `/docs` 全站的写作、结构、SEO、图型标准。所有新页面必须遵守；存量页面按本标准整改完毕。
**状态:** Active（随 Track A v2 一次性落地）

---

## 1. Frontmatter（每页必备）

| 字段 | 规则 |
|---|---|
| `title` | 每页必备。SEO 承接页 50–60 字符含关键词；内部页可短。 |
| `description` | 每页必备，≤160 字符，独一无二，包含页面主关键词。 |
| `keywords` | 每页必备，≥3 条。 |
| `sidebar_label` | title 超过 ~30 字符时提供短版。 |

## 2. 标题层级与大小写

- H1 由 frontmatter `title` 渲染；正文显式 `# H1` 仅在需要与 title 差异化（SEO 型号页）时使用。
- H2/H3 一律 **sentence case**（首词大写，其余小写），产品名/专有名词保留原大小写（LinguaX、Mouse+、macOS、MX Master、HID++、Bolt、Fn/Globe…）。
- 每页 H2 建议 3–8 个；超长页面用 H3 分层，不新增 H2 噪声。

## 3. 语气与文体

- 专业、克制、现代。短段落（≤4 行），少用感叹。
- 数字与事实必须与 `linguax-app` 源码（`MouseDatabase.json` 等）或官方资料一致；slot 命名统一用 `S1/S2/M/T/SM/WL/WR`。
- 不贬损竞品；对比只陈述事实差异。

## 4. 图型（Mermaid / SVG / 截图）

- 每页 **≤2 张**图；只有当内容是 flow / decision / topology / 布局时才配图，纯列表不硬配。
- Mermaid：flowchart 用于流程与决策树；sequenceDiagram 用于时序。图上方必须有一句引导文字。
- SVG：用于硬件布局示意（`static/img/models/*.svg`），统一 `currentColor` 适配明暗主题。
- 截图：`[screenshot: 描述]` 占位规范，由维护者统一拍摄后替换为 `![alt](/img/xxx.png)`。

## 5. CTA 规范

SEO 承接页（recipes / comparisons / models / push-to-talk）结尾统一：

```markdown
## Get started

LinguaX is a free download with a **30-day trial** — no account, no telemetry. If it fits, it is a **$9.9 one-time purchase covering 3 devices** (no subscription).

**[Download LinguaX](/download)** and <页面相关动词短语> free for 30 days.
```

内部使用页（getting-started / concepts / troubleshooting / reference）不加购买 CTA。

## 6. 内链

- 每个 SEO 承接页 ≥5 内链；所有内链一律用 `/docs/...` 绝对路径。
- 型号页互链同系列 3–5 个；recipes ↔ fundamentals 双向。

## 7. 验收

- `npm run test:model-pages` — 型号页强约束（词数/H2/内链/FAQ schema）。
- `npm run test:docs-pages` — 全站 frontmatter 完整性（title/description/keywords）+ description 长度。
- `npm run build` 全 locale 通过；broken links 仅允许指向未上线的 `/tools/*`。
