import React from 'react';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import PricingSection from '@site/src/components/PricingSection';
import styles from './pricing.module.css';

export default function PricingPage(): React.JSX.Element {
  return (
    <Layout
      title={translate({
        id: 'pricing.page.title',
        message: '许可证购买 - LinguaX',
        description: 'Pricing page title'
      })}
      description={translate({
        id: 'pricing.page.description',
        message: '购买您的 LinguaX 许可证。获得 30 天免费试用或一次性付费的终身许可证。终身版支持3天无理由退款。',
        description: 'Pricing page description'
      })}
    >
      <div className={styles.pricingPage}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                {translate({
                  id: 'pricing.hero.title',
                  message: '购买 LinguaX 许可证',
                  description: 'Hero section title'
                })}
              </h1>
              <p className={styles.heroDescription}>
                {translate({
                  id: 'pricing.hero.description',
                  message: '立即获取您的 LinguaX 许可证。免费试用 30 天或一次性付费获得终身访问权限。终身版支持3天无理由退款保证。',
                  description: 'Hero section description'
                })}
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* Features Overview */}
        <section className={styles.featuresSection}>
          <div className={styles.container}>
            <h2 className={styles.featuresTitle}>
              {translate({
                id: 'pricing.features.title',
                message: '为什么购买 LinguaX 许可证？',
                description: 'Features section title'
              })}
            </h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <h3 className={styles.featureTitle}>
                  {translate({
                    id: 'pricing.features.performance.title',
                    message: '闪电般快速',
                    description: 'Performance feature title'
                  })}
                </h3>
                <p className={styles.featureDescription}>
                  {translate({
                    id: 'pricing.features.performance.description',
                    message: '轻量级许可证激活，即时访问。无需复杂设置。',
                    description: 'Performance feature description'
                  })}
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🧠</div>
                <h3 className={styles.featureTitle}>
                  {translate({
                    id: 'pricing.features.intelligence.title',
                    message: '智能自动化',
                    description: 'Intelligence feature title'
                  })}
                </h3>
                <p className={styles.featureDescription}>
                  {translate({
                    id: 'pricing.features.intelligence.description',
                    message: '一次性许可证购买永久解锁所有高级功能。',
                    description: 'Intelligence feature description'
                  })}
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔒</div>
                <h3 className={styles.featureTitle}>
                  {translate({
                    id: 'pricing.features.privacy.title',
                    message: '隐私优先',
                    description: 'Privacy feature title'
                  })}
                </h3>
                <p className={styles.featureDescription}>
                  {translate({
                    id: 'pricing.features.privacy.description',
                    message: '安全的许可证验证。您的许可证数据经过加密和保护。',
                    description: 'Privacy feature description'
                  })}
                </p>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎨</div>
                <h3 className={styles.featureTitle}>
                  {translate({
                    id: 'pricing.features.design.title',
                    message: '原生设计',
                    description: 'Design feature title'
                  })}
                </h3>
                <p className={styles.featureDescription}>
                  {translate({
                    id: 'pricing.features.design.description',
                    message: '专业的许可证管理，包含终身更新。',
                    description: 'Design feature description'
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className={styles.statsSection}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>1,800+</div>
                <div className={styles.statLabel}>
                  {translate({
                    id: 'pricing.stats.users',
                    message: '活跃用户',
                    description: 'Users statistics label'
                  })}
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>99.9%</div>
                <div className={styles.statLabel}>
                  {translate({
                    id: 'pricing.stats.uptime',
                    message: '正常运行时间',
                    description: 'Uptime statistics label'
                  })}
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>4.9/5</div>
                <div className={styles.statLabel}>
                  {translate({
                    id: 'pricing.stats.rating',
                    message: '用户评分',
                    description: 'Rating statistics label'
                  })}
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>
                  {translate({
                    id: 'pricing.stats.support',
                    message: '支持',
                    description: 'Support statistics label'
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className={styles.testimonialsSection}>
          <div className={styles.container}>
            <h2 className={styles.testimonialsTitle}>
              {translate({
                id: 'pricing.testimonials.title',
                message: '用户评价',
                description: 'Testimonials section title'
              })}
            </h2>
            <div className={styles.testimonialsGrid}>
              <div className={styles.testimonialCard}>
                <div className={styles.testimonialRating}>
                  {'★'.repeat(5)}
                </div>
                <p className={styles.testimonialText}>
                  {translate({
                    id: 'pricing.testimonials.text1',
                    message: '"LinguaX 彻底改变了我的工作流程。自动输入法切换无缝且每天节省我数小时的手动切换时间。"',
                    description: 'First testimonial text'
                  })}
                </p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>👨‍💻</div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>Alex Chen</div>
                    <div className={styles.authorTitle}>
                      {translate({
                        id: 'pricing.testimonials.author1.title',
                        message: '软件开发工程师',
                        description: 'First testimonial author title'
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.testimonialCard}>
                <div className={styles.testimonialRating}>
                  {'★'.repeat(5)}
                </div>
                <p className={styles.testimonialText}>
                  {translate({
                    id: 'pricing.testimonials.text2',
                    message: '"作为多语言内容创作者，LinguaX 是不可缺少的。$9.9 的终身许可证是我为提高生产力做出的最好投资。"',
                    description: 'Second testimonial text'
                  })}
                </p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>👩‍🎨</div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>Sarah Kim</div>
                    <div className={styles.authorTitle}>
                      {translate({
                        id: 'pricing.testimonials.author2.title',
                        message: '内容创作者',
                        description: 'Second testimonial author title'
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.testimonialCard}>
                <div className={styles.testimonialRating}>
                  {'★'.repeat(5)}
                </div>
                <p className={styles.testimonialText}>
                  {translate({
                    id: 'pricing.testimonials.text3',
                    message: '"30 天试用立即说服了我。现在有了终身许可证，我无法想象没有 LinguaX 的工作。强烈推荐！"',
                    description: 'Third testimonial text'
                  })}
                </p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>👨‍🏫</div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>David Rodriguez</div>
                    <div className={styles.authorTitle}>
                      {translate({
                        id: 'pricing.testimonials.author3.title',
                        message: '语言教师',
                        description: 'Third testimonial author title'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className={styles.comparisonSection}>
          <div className={styles.container}>
            <h2 className={styles.comparisonTitle}>
              {translate({
                id: 'pricing.comparison.title',
                message: '免费试用 vs 终身许可证',
                description: 'Comparison section title'
              })}
            </h2>
            <div className={styles.comparisonTable}>
              <div className={styles.comparisonHeader}>
                <div className={styles.featureColumn}>
                  {translate({
                    id: 'pricing.comparison.features',
                    message: '功能',
                    description: 'Features column header'
                  })}
                </div>
                <div className={styles.trialColumn}>
                  {translate({
                    id: 'pricing.comparison.trial',
                    message: '30天试用',
                    description: 'Trial column header'
                  })}
                </div>
                <div className={styles.lifetimeColumn}>
                  {translate({
                    id: 'pricing.comparison.lifetime',
                    message: '终身许可证',
                    description: 'Lifetime column header'
                  })}
                </div>
              </div>

              <div className={styles.comparisonRow}>
                <div className={styles.featureColumn}>
                  {translate({
                    id: 'pricing.comparison.feature.duration',
                    message: '许可证期限',
                    description: 'Duration feature'
                  })}
                </div>
                <div className={styles.trialColumn}>30 Days</div>
                <div className={styles.lifetimeColumn}>99 Years</div>
              </div>

              <div className={styles.comparisonRow}>
                <div className={styles.featureColumn}>
                  {translate({
                    id: 'pricing.comparison.feature.devices',
                    message: '设备支持',
                    description: 'Device support feature'
                  })}
                </div>
                <div className={styles.trialColumn}>1 Device</div>
                <div className={styles.lifetimeColumn}>3 Devices</div>
              </div>

              <div className={styles.comparisonRow}>
                <div className={styles.featureColumn}>
                  {translate({
                    id: 'pricing.comparison.feature.updates',
                    message: '应用程序更新',
                    description: 'Updates feature'
                  })}
                </div>
                <div className={styles.trialColumn}>✓</div>
                <div className={styles.lifetimeColumn}>✓ Lifetime</div>
              </div>

              <div className={styles.comparisonRow}>
                <div className={styles.featureColumn}>
                  {translate({
                    id: 'pricing.comparison.feature.support',
                    message: '邮件支持',
                    description: 'Support feature'
                  })}
                </div>
                <div className={styles.trialColumn}>Community</div>
                <div className={styles.lifetimeColumn}>✓ Priority</div>
              </div>

              <div className={styles.comparisonRow}>
                <div className={styles.featureColumn}>
                  {translate({
                    id: 'pricing.comparison.feature.cost',
                    message: '总费用',
                    description: 'Cost feature'
                  })}
                </div>
                <div className={styles.trialColumn}>Free</div>
                <div className={styles.lifetimeColumn}>$9.9 USD</div>
              </div>
              
              <div className={styles.comparisonRow}>
                <div className={styles.featureColumn}>
                  {translate({
                    id: 'pricing.comparison.feature.refund',
                    message: '退款保证',
                    description: 'Refund feature'
                  })}
                </div>
                <div className={styles.trialColumn}>-</div>
                <div className={styles.lifetimeColumn}>✓ 3天无理由</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <h2 className={styles.faqTitle}>
              {translate({
                id: 'pricing.faq.title',
                message: '许可证购买常见问题',
                description: 'FAQ section title'
              })}
            </h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  {translate({
                    id: 'pricing.faq.trial.question',
                    message: '30 天试用许可证如何工作？',
                    description: 'Trial FAQ question'
                  })}
                </h3>
                <p className={styles.faqAnswer}>
                  {translate({
                    id: 'pricing.faq.trial.answer',
                    message: '通过输入您的邮箱完全免费创建 30 天试用许可证。每个许可证都提供对所有 LinguaX 功能的完全访问权限。您可以根据需要重复创建新的试用许可证。',
                    description: 'Trial FAQ answer'
                  })}
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  {translate({
                    id: 'pricing.faq.lifetime.question',
                    message: '终身许可证购买包含什么？',
                    description: 'Lifetime FAQ question'
                  })}
                </h3>
                <p className={styles.faqAnswer}>
                  {translate({
                    id: 'pricing.faq.lifetime.answer',
                    message: '一次性支付 $9.9 USD 可为您提供 99 年的许可证访问权限、终身应用程序更新、支持多达 3 台设备以及邮件客户支持。',
                    description: 'Lifetime FAQ answer'
                  })}
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  {translate({
                    id: 'pricing.faq.devices.question',
                    message: '我可以用我的许可证激活多少台设备？',
                    description: 'Devices FAQ question'
                  })}
                </h3>
                <p className={styles.faqAnswer}>
                  {translate({
                    id: 'pricing.faq.devices.answer',
                    message: '您的终身许可证最多可以同时在 3 台设备上激活。您可以通过您的账户管理设备激活。',
                    description: 'Devices FAQ answer'
                  })}
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  {translate({
                    id: 'pricing.faq.support.question',
                    message: '许可证购买包含什么支持？',
                    description: 'Support FAQ question'
                  })}
                </h3>
                <p className={styles.faqAnswer}>
                  {translate({
                    id: 'pricing.faq.support.answer',
                    message: '终身许可证持有者可在 hello@linguax.app 获得邮件客户支持。试用用户可以访问文档和社区支持。',
                    description: 'Support FAQ answer'
                  })}
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  {translate({
                    id: 'pricing.faq.refund.question',
                    message: '终身授权支持退款吗？',
                    description: 'Refund FAQ question'
                  })}
                </h3>
                <p className={styles.faqAnswer}>
                  {translate({
                    id: 'pricing.faq.refund.answer',
                    message: '我们提供3天无理由退款保证。如果您购买终身授权后对产品不满意，可以在购买后3天内联系 hello@linguax.app 申请全额退款，无需说明理由。',
                    description: 'Refund FAQ answer'
                  })}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                {translate({
                  id: 'pricing.cta.title',
                  message: '准备好改变您的工作流程了吗？',
                  description: 'CTA section title'
                })}
              </h2>
              <p className={styles.ctaDescription}>
                {translate({
                  id: 'pricing.cta.description',
                  message: '加入超过 1,800 名已通过 LinguaX 提高生产力的用户。立即创建您的免费试用许可证或现在获得终身访问权限。',
                  description: 'CTA section description'
                })}
              </p>
              <div className={styles.ctaButtons}>
                <button
                  className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}
                  onClick={() => {
                    window.location.href = '/#download';
                  }}
                >
                  {translate({
                    id: 'pricing.cta.button.primary',
                    message: '立即开始',
                    description: 'Primary CTA button'
                  })}
                </button>
                <button
                  className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}
                  onClick={() => {
                    window.open('mailto:hello@linguax.app?subject=LinguaX License Inquiry', '_blank');
                  }}
                >
                  {translate({
                    id: 'pricing.cta.button.secondary',
                    message: '联系支持',
                    description: 'Secondary CTA button'
                  })}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
