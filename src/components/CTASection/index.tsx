import type {ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function CTASection(): ReactNode {
  const downloadUrl = useBaseUrl('/download');

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
              <span>
                {translate({
                  id: 'homepage.cta.badge',
                  message: '🎉 立即体验',
                  description: 'CTA section badge'
                })}
              </span>
            </div>
            <Heading as="h2" className={styles.ctaTitle}>
              {translate({
                id: 'homepage.cta.title',
                message: '让您的 Mac 输入更智能',
                description: 'CTA section title'
              })}
            </Heading>
            <p className={styles.ctaDescription}>
              {translate({
                id: 'homepage.cta.description',
                message: '加入近两千名用户的行列，体验最自然的输入法切换方式。',
                description: 'CTA section description'
              })}
              <br />
              <strong>
                {translate({
                  id: 'homepage.cta.descriptionStrong',
                  message: '免费试用，无广告，保护隐私，持续更新。',
                  description: 'CTA section description strong part'
                })}
              </strong>
            </p>
            <div className={styles.ctaActions}>
              <a href={downloadUrl} className={styles.ctaPrimaryBtn}>
                <span>
                  {translate({
                    id: 'homepage.cta.button',
                    message: '免费试用 LinguaX',
                    description: 'CTA button text'
                  })}
                </span>
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
                <span>
                  {translate({
                    id: 'homepage.cta.feature1',
                    message: 'macOS 13.0+',
                    description: 'CTA feature 1'
                  })}
                </span>
              </div>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>
                  {translate({
                    id: 'homepage.cta.feature2',
                    message: 'Apple Silicon 优化',
                    description: 'CTA feature 2'
                  })}
                </span>
              </div>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>
                  {translate({
                    id: 'homepage.cta.feature3',
                    message: '状态栏常驻',
                    description: 'CTA feature 3'
                  })}
                </span>
              </div>
              <div className={styles.ctaFeature}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>
                  {translate({
                    id: 'homepage.cta.feature4',
                    message: '免费试用',
                    description: 'CTA feature 4'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
