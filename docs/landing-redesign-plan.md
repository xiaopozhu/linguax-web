# LinguaX 首页与价格页重新设计方案

## 📋 设计目标

根据提供的资源和需求,重新设计 LinguaX 的首页和价格页面,着重于:

1. **视觉品牌统一**: 采用 icon 的主色调 `#FF7F50` (珊瑚橙) 作为主要品牌色
2. **内容全新升级**: 不保留原有内容,按照海外产品设计最佳实践重新编写
3. **SEO/GEO 优化**: 遵循 SEO_GEO_PLAYBOOK 的关键词策略和结构化数据要求
4. **海外设计标准**: 参考 OVERSEAS_BENCHMARKS 中的 Linear、Raycast、Notion 等产品模式
5. **价格套餐**: 保持现有的 Free + Pro ($9.9) 定价结构

---

## 🎨 设计配色方案

### 主色调 (基于 Icon #FF7F50)

```css
:root {
  /* 主品牌色 - 珊瑚橙 */
  --lx-primary: #FF7F50;           /* 主要按钮、强调色 */
  --lx-primary-dark: #E86F40;      /* hover 深色 */
  --lx-primary-light: #FF9570;     /* 柔和版本 */
  --lx-primary-pale: #FFF5F2;      /* 浅背景 */
  
  /* 中性色系统 */
  --lx-bg: #FAFAFA;                /* 主背景 */
  --lx-bg-soft: #F5F5F5;           /* 次级背景 */
  --lx-card: #FFFFFF;              /* 卡片背景 */
  
  --lx-text: #1A1A1A;              /* 主文本 */
  --lx-text-muted: #666666;        /* 次要文本 */
  --lx-border: #E5E5E5;            /* 边框 */
  
  /* 功能色 */
  --lx-success: #10B981;           /* 成功/确认 */
  --lx-warning: #F59E0B;           /* 警告 */
}
```

---

## 📱 首页 (index.tsx) 重新设计

### 结构概览

```
1. Hero Section (英雄区)
   - 简洁 Value Proposition
   - 强力 CTA 按钮组
   - Trust Indicator (免费试用 + 一次性付费)

2. Product Demo (产品演示)
   - 主界面截图展示
   
3. Pain Points (痛点识别)
   - 3 个核心问题场景卡片
   - 情感化描述,引发共鸣

4. How It Works (工作流程)
   - 3 步简洁说明
   - 视觉化步骤编号

5. Feature Showcase (功能展示)
   - 4 个实际截图网格
   - App 规则 / 网站规则 / 鼠标增强

6. Why Choose LinguaX (差异化价值)
   - 3 个核心差异点
   - 对比同类产品优势

7. Target Users (目标用户)
   - 开发者 / 设计师 / 多语言团队

8. FAQ (常见问题)
   - 3-5 个核心疑问解答
   - SEO 优化问答格式

9. Final CTA (最终转化)
   - 引导下载 / 查看价格
```

### 核心文案要点

**Hero 标题**:
```
Your Mac adapts to you.
Not the other way around.
```

**副标题**:
```
LinguaX eliminates manual input source switching. 
Code in English, chat in Chinese, browse in Japanese—your Mac just knows.
Zero friction, zero thinking required.
```

**CTA**:
- Primary: "Download Free" (橙色按钮 + 箭头动画)
- Secondary: "See Pricing ($9.9)" (边框按钮)

**Trust Signal**:
```
Free plan available forever. Pro is a one-time purchase of $9.9 • No subscription
```

---

## 💰 价格页 (pricing.tsx) 重新设计

### 结构概览

```
1. Hero Section
   - "Simple pricing. No subscription."
   - "Pay once when the value is obvious"

2. Pricing Plans (双栏对比)
   - Free Plan (左侧)
   - Pro Plan (右侧,突出显示 "Most Practical" badge)

3. What You're Paying For (价值说明)
   - 减少打断
   - 提升一致性
   - 清晰成本

4. Feature Comparison Table (功能对比表)
   - 详细功能清单
   - 清晰标注 Free vs Pro 差异

5. Purchasing FAQ
   - 是否订阅?
   - 何时升级?
   - 退款政策?

6. Final CTA
   - "Start Free" + "Buy Pro"
```

### 价格套餐详情

#### Free Plan
- **价格**: $0
- **说明**: Best for initial setup and basic daily use
- **功能**:
  - 30-day trial (one-click renewal)
  - Core app & website switching
  - Basic mouse enhancements
  - Single device
  - Community support

#### Pro Plan (推荐)
- **价格**: $9.9 one-time
- **Badge**: "Most Practical"
- **说明**: Best for high-frequency, multilingual workflows
- **功能**:
  - Permanent license (99 years)
  - All features unlocked
  - Advanced mouse gestures
  - Up to 3 devices
  - Priority email support
  - 3-day refund guarantee

---

## 🎯 SEO/GEO 优化策略

### 目标关键词 (来自 SEO_GEO_PLAYBOOK)

**主关键词**:
- macOS input source switcher
- automatic input switching mac

**次关键词**:
- app based input method
- website based input method
- mac mouse enhancement

**交易关键词**:
- LinguaX pricing
- one-time purchase mac app

### Structured Data (Schema.org)

**首页**:
```json
{
  "@type": "SoftwareApplication",
  "name": "LinguaX",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "macOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

**价格页**:
```json
{
  "@type": "Product",
  "name": "LinguaX Pro",
  "brand": {"@type": "Brand", "name": "LinguaX"},
  "offers": {
    "@type": "Offer",
    "price": "9.9",
    "priceCurrency": "USD",
    "availability": "InStock"
  }
}
```

### GEO 优化要点

1. **可引用短事实块**:
   - "LinguaX is a macOS utility for automatic input-source switching by app and website."
   - "Pricing: Free + Pro one-time $9.9."

2. **结构化对比表**: Free vs Pro 功能对比,便于 AI 抽取

3. **FAQ 问答式短段落**: 提高 AI 摘要命中率

4. **统一品牌名**: 全文使用 "LinguaX",避免别名

---

## 🎨 视觉设计要点

### 1. 色彩应用原则

- **Primary CTA**: 使用 `#FF7F50` 珊瑚橙
- **Secondary CTA**: 白底 + 橙色边框
- **Pain Point Cards**: 浅橙色背景 `#FFF5F2` + 左侧橙色条
- **Success Indicators**: 使用绿色 checkmark `#10B981`
- **Featured Plan**: 橙色渐变背景 + 橙色边框

### 2. Typography

- **标题字体**: Space Grotesk (现代、几何感)
- **正文字体**: Manrope (易读、专业)
- **Hero H1**: 52-68px, 粗体
- **Section H2**: 42-52px, 粗体
- **Body Text**: 16-18px, 行高 1.6

### 3. 间距与布局

- **Section 间距**: 120px
- **卡片圆角**: 16-20px
- **按钮圆角**: 10-12px
- **Grid Gap**: 24-32px

### 4. 动画效果

- **按钮 Hover**: `translateY(-2px)` + 阴影加深
- **卡片 Hover**: `translateY(-4px)` + 边框变橙
- **CTA 箭头**: hover 时右移 `translateX(4px)`
- **Fade Up**: 内容渐入 + 上移 24px

---

## 📊 与现有实现对比

### 当前问题
1. ❌ 使用绿色主题 `#1f6c54`,与 icon 橙色不符
2. ❌ 内容较为保守,缺乏情感化描述
3. ❌ 视觉层级不够鲜明
4. ❌ CTA 按钮动效单一

### 改进方案
1. ✅ 统一使用珊瑚橙 `#FF7F50` 作为品牌色
2. ✅ 参考 Linear/Raycast 的 Pain-first narrative
3. ✅ 强化首屏视觉冲击力(更大标题、动画 emoji)
4. ✅ 增加按钮动画(箭头、hover 效果)
5. ✅ 优化价格页对比表可读性

---

## 📝 实施清单

### Phase 1: 样式系统更新
- [ ] 更新 `landing.css` 颜色变量为橙色系
- [ ] 优化按钮样式和 hover 动画
- [ ] 增强卡片交互效果

### Phase 2: 首页重写
- [ ] 重写 Hero Section 文案
- [ ] 实现 Pain Points 卡片(橙色警示)
- [ ] 优化 How It Works 步骤展示
- [ ] 更新 Feature Showcase 截图网格
- [ ] 重写 FAQ 内容

### Phase 3: 价格页重写
- [ ] 更新价格套餐卡片
- [ ] 优化 Pro Plan 突出显示
- [ ] 完善功能对比表
- [ ] 更新 FAQ 内容

### Phase 4: SEO/Schema 优化
- [ ] 添加 meta keywords
- [ ] 优化 structured data
- [ ] 确保关键词自然分布

---

## ✅ 确认事项

在开始实施前,请确认:

1. **是否批准新的橙色配色方案** (`#FF7F50` 作为主色)?
2. **是否同意完全重写内容** (不保留原有文案)?
3. **价格套餐是否需要调整** (目前保持 Free + Pro $9.9)?
4. **是否需要调整截图** (当前使用 assets 中的截图)?

---

## 📚 参考资源

- **Icon 颜色**: `#FF7F50` (从 `linguax.svg` 提取)
- **设计参考**: Linear, Raycast, Notion (OVERSEAS_BENCHMARKS.md)
- **SEO 策略**: SEO_GEO_PLAYBOOK.md
- **现有页面**: homepage.mdx, pricing.mdx (assets/landing)
- **当前实现**: index.tsx, pricing.tsx (src/pages)

---

**下一步**: 等待您的确认后,我将开始实施代码修改。
