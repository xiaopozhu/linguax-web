import type { ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function FAQSection(): ReactNode {
  const faqs = [
    {
      question: translate({
        id: 'homepage.faq.q1',
        message: "LinguaX 支持哪些 macOS 版本？",
        description: 'FAQ question 1'
      }),
      answer: translate({
        id: 'homepage.faq.a1',
        message: "LinguaX 支持 macOS 13.0 Ventura 及更高版本，完美兼容 Intel 和 Apple Silicon 芯片的所有 Mac 设备。针对最新的 macOS 系统进行了专门优化。",
        description: 'FAQ answer 1'
      })
    },
    {
      question: translate({
        id: 'homepage.faq.q2',
        message: "作为状态栏应用会影响系统性能吗？",
        description: 'FAQ question 2'
      }),
      answer: translate({
        id: 'homepage.faq.a2',
        message: "完全不会。LinguaX 采用高效的轻量级架构，应用大小小于 5MB，内存占用极低，CPU 使用率几乎为零。专为状态栏环境优化，不会影响系统性能。",
        description: 'FAQ answer 2'
      })
    },
    {
      question: translate({
        id: 'homepage.faq.q3',
        message: "支持哪些配置方式？",
        description: 'FAQ question 3'
      }),
      answer: translate({
        id: 'homepage.faq.a3',
        message: "LinguaX 提供应用绑定和域名绑定两种配置方式。您可以为每个应用指定专属输入法，也可以为不同网站域名配置输入法。开启辅助功能权限后，在浏览器中切换标签页时会根据域名自动切换输入法。",
        description: 'FAQ answer 3'
      })
    },
    {
      question: translate({
        id: 'homepage.faq.q4',
        message: "什么是辅助功能模式？为什么需要开启？",
        description: 'FAQ question 4'
      }),
      answer: translate({
        id: 'homepage.faq.a4',
        message: "辅助功能模式是 macOS 提供的系统权限，开启后 LinguaX 可以检测浏览器中当前访问的网站域名。这样可以实现更细粒度的控制：在浏览器内切换不同标签页时，根据域名自动切换到您配置的输入法。",
        description: 'FAQ answer 4'
      })
    },
    {
      question: translate({
        id: 'homepage.faq.q5',
        message: "数据安全和隐私如何保障？",
        description: 'FAQ question 5'
      }),
      answer: translate({
        id: 'homepage.faq.a5',
        message: "LinguaX 严格遵循 Apple 的隐私政策，所有配置数据都存储在本地，绝不收集或上传任何个人信息。辅助功能权限仅用于读取浏览器标签页信息，确保您的隐私绝对安全。",
        description: 'FAQ answer 5'
      })
    },
    {
      question: translate({
        id: 'homepage.faq.q6',
        message: "鼠标增强功能是什么？我需要这个功能吗？",
        description: 'FAQ question 6'
      }),
      answer: translate({
        id: 'homepage.faq.a6',
        message: "鼠标增强功能专为第三方鼠标用户设计。它提供平滑滚动功能，模拟触控板的惯性滚动效果，让滚动更加丝滑自然；以及翻转滚动功能，可以单独控制鼠标滚轮方向，同时保持触控板的自然滚动方向。如果您使用第三方鼠标并希望获得更好的滚动体验，这个功能非常适合您。",
        description: 'FAQ answer 6'
      })
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <div className={styles.sectionBadge}>
              <span>
                {translate({
                  id: 'homepage.faq.badge',
                  message: '❓ 常见问题',
                  description: 'FAQ section badge'
                })}
              </span>
            </div>
            <Heading as="h2" className={styles.sectionTitle}>
              {translate({
                id: 'homepage.faq.title',
                message: '关于 LinguaX',
                description: 'FAQ section title'
              })}
              <br />
              <span className={styles.titleAccent}>
                {translate({
                  id: 'homepage.faq.titleAccent',
                  message: '您想了解的都在这里',
                  description: 'FAQ section title accent'
                })}
              </span>
            </Heading>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <details className={styles.faqDetails}>
                  <summary className={styles.faqQuestion}>
                    <span>{faq.question}</span>
                    <div className={styles.faqIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </summary>
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 