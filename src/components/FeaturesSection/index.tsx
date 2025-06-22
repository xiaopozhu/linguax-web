import type {ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function FeaturesSection(): ReactNode {
  const features = [
    {
      icon: '🎯',
      title: translate({
        id: 'homepage.features.smart.title',
        message: '智能识别',
        description: 'Smart recognition feature title'
      }),
      description: translate({
        id: 'homepage.features.smart.description',
        message: '自动识别应用类型，智能推荐合适的输入法',
        description: 'Smart recognition feature description'
      }),
      highlight: translate({
        id: 'homepage.features.smart.highlight',
        message: 'AI 驱动',
        description: 'Smart recognition feature highlight'
      })
    },
    {
      icon: '⚡',
      title: translate({
        id: 'homepage.features.fast.title',
        message: '极速切换',
        description: 'Fast switching feature title'
      }),
      description: translate({
        id: 'homepage.features.fast.description',
        message: '毫秒级响应，切换应用时自动切换输入法',
        description: 'Fast switching feature description'
      }),
      highlight: translate({
        id: 'homepage.features.fast.highlight',
        message: '无感体验',
        description: 'Fast switching feature highlight'
      })
    },
    {
      icon: '📱',
      title: translate({
        id: 'homepage.features.menubar.title',
        message: '状态栏常驻',
        description: 'Menu bar feature title'
      }),
      description: translate({
        id: 'homepage.features.menubar.description',
        message: '轻量级设计，常驻状态栏不影响使用',
        description: 'Menu bar feature description'
      }),
      highlight: translate({
        id: 'homepage.features.menubar.highlight',
        message: '< 5MB',
        description: 'Menu bar feature highlight'
      })
    },
    {
      icon: '🎨',
      title: translate({
        id: 'homepage.features.native.title',
        message: 'macOS 原生',
        description: 'Native feature title'
      }),
      description: translate({
        id: 'homepage.features.native.description',
        message: '完美融入系统设计，支持浅色深色主题',
        description: 'Native feature description'
      }),
      highlight: translate({
        id: 'homepage.features.native.highlight',
        message: '原生体验',
        description: 'Native feature highlight'
      })
    },
    {
      icon: '🔒',
      title: translate({
        id: 'homepage.features.privacy.title',
        message: '隐私保护',
        description: 'Privacy feature title'
      }),
      description: translate({
        id: 'homepage.features.privacy.description',
        message: '所有数据本地存储，不收集任何个人信息',
        description: 'Privacy feature description'
      }),
      highlight: translate({
        id: 'homepage.features.privacy.highlight',
        message: '100% 安全',
        description: 'Privacy feature highlight'
      })
    },
    {
      icon: '🆓',
      title: translate({
        id: 'homepage.features.free.title',
        message: '免费试用',
        description: 'Free trial feature title'
      }),
      description: translate({
        id: 'homepage.features.free.description',
        message: '无广告干扰，可创建试用许可体验完整功能',
        description: 'Free trial feature description'
      }),
      highlight: translate({
        id: 'homepage.features.free.highlight',
        message: '试用友好',
        description: 'Free trial feature highlight'
      })
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>
              {translate({
                id: 'homepage.features.badge',
                message: '✨ 核心特性',
                description: 'Features section badge'
              })}
            </span>
          </div>
          <Heading as="h2" className={styles.sectionTitle}>
            {translate({
              id: 'homepage.features.title',
              message: '为什么选择 LinguaX',
              description: 'Features section title'
            })}
            <br />
            <span className={styles.titleAccent}>
              {translate({
                id: 'homepage.features.titleAccent',
                message: '状态栏输入法管理专家',
                description: 'Features section title accent'
              })}
            </span>
          </Heading>
          <p className={styles.sectionDescription}>
            {translate({
              id: 'homepage.features.description',
              message: '从智能识别到隐私保护，LinguaX 专为 macOS 状态栏环境优化，为您提供最自然的输入法切换体验。',
              description: 'Features section description'
            })}
          </p>
        </div>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.cardHeader}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <div className={styles.featureHighlight}>{feature.highlight}</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 