import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function FeaturesSection(): ReactNode {
  const features = [
    {
      icon: '🎯',
      title: '智能识别',
      description: '自动识别应用类型，智能推荐合适的输入法',
      highlight: 'AI 驱动'
    },
    {
      icon: '⚡',
      title: '极速切换',
      description: '毫秒级响应，切换应用时自动切换输入法',
      highlight: '无感体验'
    },
    {
      icon: '📱',
      title: '状态栏常驻',
      description: '轻量级设计，常驻状态栏不影响使用',
      highlight: '< 5MB'
    },
    {
      icon: '🎨',
      title: 'macOS 原生',
      description: '完美融入系统设计，支持浅色深色主题',
      highlight: '原生体验'
    },
    {
      icon: '🔒',
      title: '隐私保护',
      description: '所有数据本地存储，不收集任何个人信息',
      highlight: '100% 安全'
    },
    {
      icon: '🆓',
      title: '免费试用',
      description: '无广告干扰，可创建试用许可体验完整功能',
      highlight: '试用友好'
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <span>✨ 核心特性</span>
          </div>
          <Heading as="h2" className={styles.sectionTitle}>
            为什么选择 LinguaX
            <br />
            <span className={styles.titleAccent}>状态栏输入法管理专家</span>
          </Heading>
          <p className={styles.sectionDescription}>
            从智能识别到隐私保护，LinguaX 专为 macOS 状态栏环境优化，
            为您提供最自然的输入法切换体验。
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