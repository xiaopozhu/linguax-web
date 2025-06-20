import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function CTASection(): ReactNode {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContainer}>
          <div className={styles.ctaBackground}>
            <div className={styles.ctaGradient}></div>
            <div className={styles.ctaPattern}></div>
          </div>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <span>🎉 立即体验</span>
            </div>
            <Heading as="h2" className={styles.ctaTitle}>
              让您的 Mac 输入更智能
            </Heading>
            <p className={styles.ctaDescription}>
              加入近两千名用户的行列，体验最自然的输入法切换方式。
              <br />
              <strong>免费试用，无广告，保护隐私，持续更新。</strong>
            </p>
            <div className={styles.ctaActions}>
              <a href="#download" className={styles.ctaPrimaryBtn}>
                <span>免费试用 LinguaX</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
            <div className={styles.ctaFeatures}>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>macOS 13.0+</span>
              </div>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Apple Silicon 优化</span>
              </div>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>状态栏常驻</span>
              </div>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>免费试用</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 