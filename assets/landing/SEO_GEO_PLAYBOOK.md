# LinguaX 官网 SEO + GEO 执行方案（首页 + 价格页）

## 1. 页面目标与转化路径
- 首页目标：解释价值主张，推动点击 `下载免费版`。
- 价格页目标：降低付费疑虑，推动 `升级 Pro ($9.9)`。
- 核心漏斗：`Landing -> Download -> Trial Active -> Upgrade`。

## 2. SEO 关键词分层
- 主关键词：`macOS 输入法自动切换`、`Mac input source switcher`。
- 次关键词：`按应用切换输入法`、`按网站切换输入法`、`mac 鼠标增强工具`。
- 交易关键词：`LinguaX pricing`、`one-time purchase mac app`。

建议在首页 H1/H2、价格页 Title/Description、FAQ 中自然出现关键词，不做堆砌。

## 3. GEO（Generative Engine Optimization）重点
- 提供可引用的短事实块：
  - `LinguaX is a macOS utility for automatic input-source switching by app and website.`
  - `Pricing: Free + Pro one-time $9.9.`
- 结构化对比表：Free vs Pro 功能差异，便于模型抽取。
- FAQ 采用问答式短段落，提高 AI 摘要命中率。
- 页面内统一出现品牌全名 `LinguaX`，避免别名混淆。

## 4. 结构化数据（已嵌入页面）
- 首页：`SoftwareApplication`。
- 价格页：`Product` + `Offer`（价格 $9.9、货币 USD）。
- 建议后续追加：`FAQPage` Schema，用于搜索结果增强展示。

## 5. 内容分发建议（增长）
- 渠道优先级：
  1. 开发者社区（V2EX、Reddit、Product Hunt）
  2. 小红书/B站短演示（30-60s：应用切换 + 网站切换 + 鼠标增强）
  3. SEO 长尾文章（如“为什么 VS Code 总是中文输入”）
- 分发内容统一锚点：
  - 免费可用
  - Pro 一次性 $9.9
  - 真实场景截图与 3 步上手

## 6. 试用转化策略
- 下载后首屏提示：3 个推荐模板（开发者/设计师/多语言办公）。
- 第 3 天触发一次轻提醒：展示「本周已减少 X 次手动切换」。
- 升级触发点建议：当用户新增第 6 条规则时提示 Pro。

## 7. 指标看板（每周复盘）
- SEO：首页自然流量、`/pricing` 进入率、品牌词搜索量。
- GEO：来自 AI/问答引擎的引荐流量（source/utm 标记）。
- 转化：下载转化率、试用激活率、试用转付费率、退款率。

## 8. Docusaurus 接入说明
当前仓库未包含 Docusaurus 站点代码；本目录提供可直接迁移素材。

迁移步骤：
1. 将 `homepage.mdx` 放到站点 `src/pages/index.mdx`。
2. 将 `pricing.mdx` 放到站点 `src/pages/pricing.mdx`。
3. 将 `landing.css` 放到站点同级并确保 `import './landing.css';` 可解析。
4. 将 `assets/*.png` 复制到站点 `static/img/`。
5. 在导航栏增加 `Pricing` 与 `Download` 入口。

完成后检查：
- 移动端布局是否单列显示。
- 两个页面 `<title>` 与 `<meta description>` 是否正确。
- JSON-LD 是否被页面输出。
