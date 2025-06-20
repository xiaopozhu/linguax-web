import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function FAQSection(): ReactNode {
  const faqs = [
    {
      question: "LinguaX 支持哪些 macOS 版本？",
      answer: "LinguaX 支持 macOS 13.0 Ventura 及更高版本，完美兼容 Intel 和 Apple Silicon 芯片的所有 Mac 设备。针对最新的 macOS 系统进行了专门优化。"
    },
    {
      question: "作为状态栏应用会影响系统性能吗？",
      answer: "完全不会。LinguaX 采用高效的轻量级架构，应用大小小于 5MB，内存占用极低，CPU 使用率几乎为零。专为状态栏环境优化，不会影响系统性能。"
    },
    {
      question: "支持哪些配置方式？",
      answer: "LinguaX 提供简洁的应用选择界面，您可以从已安装的应用列表中选择需要配置的应用，为每个应用指定专属的输入法。操作简单直观，适合各类用户使用。"
    },
    {
      question: "输入法切换的响应速度如何？",
      answer: "LinguaX 采用系统级别的监听机制，切换响应时间在毫秒级别，几乎感受不到延迟。切换过程完全在后台进行，不会打断您的工作流程。"
    },
    {
      question: "数据安全和隐私如何保障？",
      answer: "LinguaX 严格遵循 Apple 的隐私政策，所有配置数据都存储在本地，绝不收集或上传任何个人信息。应用不需要网络权限，确保您的隐私绝对安全。"
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <div className={styles.sectionBadge}>
              <span>❓ 常见问题</span>
            </div>
            <Heading as="h2" className={styles.sectionTitle}>
              关于 LinguaX
              <br />
              <span className={styles.titleAccent}>您想了解的都在这里</span>
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
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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