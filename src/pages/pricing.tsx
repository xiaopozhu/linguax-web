import React from 'react';
import Layout from '@theme/Layout';
import {translate} from '@docusaurus/Translate';
import PricingSection from '@site/src/components/PricingSection';
import styles from './pricing.module.css';

export default function PricingPage(): React.JSX.Element {
  return (
    <Layout
      title={translate({
        id: 'pricing.page.title',
        message: 'License Purchase - LinguaX',
        description: 'Pricing page title'
      })}
      description={translate({
        id: 'pricing.page.description',
        message: 'Purchase your LinguaX license. Get 30-day free trial or lifetime license with one-time payment.',
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
                  message: 'Purchase LinguaX License',
                  description: 'Hero section title'
                })}
              </h1>
              <p className={styles.heroDescription}>
                {translate({
                  id: 'pricing.hero.description',
                  message: 'Get your LinguaX license today. Try free for 30 days or purchase lifetime access with one-time payment.',
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
                message: 'Why Purchase LinguaX License?',
                description: 'Features section title'
              })}
            </h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚡</div>
                <h3 className={styles.featureTitle}>
                  {translate({
                    id: 'pricing.features.performance.title',
                    message: 'Lightning Fast',
                    description: 'Performance feature title'
                  })}
                </h3>
                <p className={styles.featureDescription}>
                  {translate({
                    id: 'pricing.features.performance.description',
                    message: 'Lightweight license activation with instant access. No complex setup required.',
                    description: 'Performance feature description'
                  })}
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🧠</div>
                <h3 className={styles.featureTitle}>
                  {translate({
                    id: 'pricing.features.intelligence.title',
                    message: 'Smart Automation',
                    description: 'Intelligence feature title'
                  })}
                </h3>
                <p className={styles.featureDescription}>
                  {translate({
                    id: 'pricing.features.intelligence.description',
                    message: 'One-time license purchase unlocks all premium features permanently.',
                    description: 'Intelligence feature description'
                  })}
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🔒</div>
                <h3 className={styles.featureTitle}>
                  {translate({
                    id: 'pricing.features.privacy.title',
                    message: 'Privacy First',
                    description: 'Privacy feature title'
                  })}
                </h3>
                <p className={styles.featureDescription}>
                  {translate({
                    id: 'pricing.features.privacy.description',
                    message: 'Secure license verification. Your license data is encrypted and protected.',
                    description: 'Privacy feature description'
                  })}
                </p>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎨</div>
                <h3 className={styles.featureTitle}>
                  {translate({
                    id: 'pricing.features.design.title',
                    message: 'Native Design',
                    description: 'Design feature title'
                  })}
                </h3>
                <p className={styles.featureDescription}>
                  {translate({
                    id: 'pricing.features.design.description',
                    message: 'Professional license management with lifetime updates included.',
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
                    message: 'Active Users',
                    description: 'Users statistics label'
                  })}
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>99.9%</div>
                <div className={styles.statLabel}>
                  {translate({
                    id: 'pricing.stats.uptime',
                    message: 'Uptime',
                    description: 'Uptime statistics label'
                  })}
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>4.9/5</div>
                <div className={styles.statLabel}>
                  {translate({
                    id: 'pricing.stats.rating',
                    message: 'User Rating',
                    description: 'Rating statistics label'
                  })}
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>
                  {translate({
                    id: 'pricing.stats.support',
                    message: 'Support',
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
                message: 'What Our Users Say',
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
                    message: '"LinguaX has completely transformed my workflow. The automatic input method switching is seamless and saves me hours of manual switching every day."',
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
                        message: 'Software Developer',
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
                    message: '"As a multilingual content creator, LinguaX is indispensable. The $9.9 lifetime license is the best investment I\'ve made for productivity."',
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
                        message: 'Content Creator',
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
                    message: '"The 30-day trial convinced me immediately. Now with the lifetime license, I can\'t imagine working without LinguaX. Highly recommended!"',
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
                        message: 'Language Teacher',
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
                message: 'Free Trial vs Lifetime License',
                description: 'Comparison section title'
              })}
            </h2>
            <div className={styles.comparisonTable}>
              <div className={styles.comparisonHeader}>
                <div className={styles.featureColumn}>
                  {translate({
                    id: 'pricing.comparison.features',
                    message: 'Features',
                    description: 'Features column header'
                  })}
                </div>
                <div className={styles.trialColumn}>
                  {translate({
                    id: 'pricing.comparison.trial',
                    message: '30-Day Trial',
                    description: 'Trial column header'
                  })}
                </div>
                <div className={styles.lifetimeColumn}>
                  {translate({
                    id: 'pricing.comparison.lifetime',
                    message: 'Lifetime License',
                    description: 'Lifetime column header'
                  })}
                </div>
              </div>
              
              <div className={styles.comparisonRow}>
                <div className={styles.featureColumn}>
                  {translate({
                    id: 'pricing.comparison.feature.duration',
                    message: 'License Duration',
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
                    message: 'Device Support',
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
                    message: 'App Updates',
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
                    message: 'Email Support',
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
                    message: 'Total Cost',
                    description: 'Cost feature'
                  })}
                </div>
                <div className={styles.trialColumn}>Free</div>
                <div className={styles.lifetimeColumn}>$9.9 USD</div>
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
                message: 'License Purchase FAQ',
                description: 'FAQ section title'
              })}
            </h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  {translate({
                    id: 'pricing.faq.trial.question',
                    message: 'How does the 30-day trial license work?',
                    description: 'Trial FAQ question'
                  })}
                </h3>
                <p className={styles.faqAnswer}>
                  {translate({
                    id: 'pricing.faq.trial.answer',
                    message: 'Create a 30-day trial license completely free by entering your email. Each license provides full access to all LinguaX features. You can create new trial licenses repeatedly as needed.',
                    description: 'Trial FAQ answer'
                  })}
                </p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  {translate({
                    id: 'pricing.faq.lifetime.question',
                    message: 'What does the lifetime license purchase include?',
                    description: 'Lifetime FAQ question'
                  })}
                </h3>
                <p className={styles.faqAnswer}>
                  {translate({
                    id: 'pricing.faq.lifetime.answer',
                    message: 'One-time payment of $9.9 USD gives you 99 years of license access, lifetime app updates, support for up to 3 devices, and email customer support.',
                    description: 'Lifetime FAQ answer'
                  })}
                </p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  {translate({
                    id: 'pricing.faq.devices.question',
                    message: 'How many devices can I activate with my license?',
                    description: 'Devices FAQ question'
                  })}
                </h3>
                <p className={styles.faqAnswer}>
                  {translate({
                    id: 'pricing.faq.devices.answer',
                    message: 'Your lifetime license can be activated on up to 3 devices simultaneously. You can manage device activations through your account.',
                    description: 'Devices FAQ answer'
                  })}
                </p>
              </div>
              
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  {translate({
                    id: 'pricing.faq.support.question',
                    message: 'What support is included with license purchase?',
                    description: 'Support FAQ question'
                  })}
                </h3>
                <p className={styles.faqAnswer}>
                  {translate({
                    id: 'pricing.faq.support.answer',
                    message: 'Lifetime license holders receive email customer support at hello@linguax.app. Trial users can access documentation and community support.',
                    description: 'Support FAQ answer'
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
                  message: 'Ready to Transform Your Workflow?',
                  description: 'CTA section title'
                })}
              </h2>
              <p className={styles.ctaDescription}>
                {translate({
                  id: 'pricing.cta.description',
                  message: 'Join over 1,800 users who have already improved their productivity with LinguaX. Create your free trial license today or get lifetime access now.',
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
                    message: 'Get Started Now',
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
                    message: 'Contact Support',
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
