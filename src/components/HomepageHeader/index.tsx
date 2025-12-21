import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import { useDownload } from '../../hooks/useDownload';
import styles from './styles.module.css';

export default function HomepageHeader(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const { error: downloadError, releaseInfo, handleDownload } = useDownload();

  // 处理下载点击
  const onDownloadClick = async () => {
    await handleDownload();
  };

  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroBackground}>
        <div className={styles.gradientOrbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
          <div className={styles.orb3}></div>
        </div>
        <div className={styles.gridPattern}></div>
      </div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <img src="/img/linguax.png" alt="LinguaX" className={styles.badgeIcon} />
              <span>
                {translate({
                  id: 'homepage.header.badge',
                  message: '状态栏 · 轻量级 · 智能切换',
                  description: 'Badge text in homepage header'
                })}
              </span>
            </div>
            <Heading as="h1" className={styles.heroTitle}>
              {translate({
                id: 'homepage.header.title',
                message: '让输入法',
                description: 'Main title first part'
              })}
              <br />
              <span className={styles.titleGradient}>
                {translate({
                  id: 'homepage.header.titleGradient',
                  message: '跟随应用切换',
                  description: 'Main title gradient part'
                })}
              </span>
            </Heading>
            <p className={styles.heroDescription}>
              {translate({
                id: 'homepage.header.description',
                message: 'LinguaX 是专为 macOS 设计的状态栏输入法管理工具。',
                description: 'Homepage header description'
              })}
              <br />
              <strong>
                {translate({
                  id: 'homepage.header.descriptionStrong',
                  message: '为每个应用配置专属输入法，告别手动切换的烦恼。',
                  description: 'Homepage header description strong part'
                })}
              </strong>
            </p>
            <div className={styles.heroActions}>
              <button 
                onClick={onDownloadClick}
                className={styles.primaryBtn}
                type="button"
              >
                <span>
                  {translate({
                    id: 'homepage.header.cta',
                    message: '免费下载',
                    description: 'CTA button text'
                  })}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              {releaseInfo?.version && (
                <div className={styles.versionInfo}>
                  <span className={styles.versionLabel}>
                    {translate({
                      id: 'homepage.header.version.label',
                      message: '最新版本',
                      description: 'Version label'
                    })}
                  </span>
                  <span className={styles.versionNumber}>v{releaseInfo.version}</span>
                </div>
              )}
              {downloadError && (
                <div className={styles.errorMessage}>
                  {downloadError}
                </div>
              )}
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>1800+</div>
                <div className={styles.statLabel}>
                  {translate({
                    id: 'homepage.header.stats.users',
                    message: '用户信赖',
                    description: 'Users stats label'
                  })}
                </div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{"< 5MB"}</div>
                <div className={styles.statLabel}>
                  {translate({
                    id: 'homepage.header.stats.size',
                    message: '轻量应用',
                    description: 'App size stats label'
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.appScreenshot}>
              {/* 模拟状态栏 */}
              <div className={styles.mockStatusBar}>
                <div className={styles.statusBarLeft}>
                  <div className={styles.appleMenu}></div>
                  <span className={styles.appMenuText}>LinguaX</span>
                  <span className={styles.menuItem}>
                    {translate({
                      id: 'homepage.header.menu.settings',
                      message: '配置',
                      description: 'Settings menu item'
                    })}
                  </span>
                  <span className={styles.menuItem}>
                    {translate({
                      id: 'homepage.header.menu.help',
                      message: '帮助',
                      description: 'Help menu item'
                    })}
                  </span>
                </div>
                <div className={styles.statusBarRight}>
                  <div className={styles.systemIcons}>
                    <span className={styles.timeDisplay}>14:30</span>
                    <div className={styles.linguaxStatusIcon}>
                      <img src="/img/linguax.png" alt="LinguaX" width="12" height="12" />
                      <span className={styles.currentInputIndicator}>ABC</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <img
                  src="/img/linguax-home.png" 
                  alt={translate({
                    id: 'homepage.header.screenshot.alt',
                    message: 'LinguaX 应用界面截图',
                    description: 'Screenshot alt text'
                  })} 
                  className={styles.screenshotImage}
                />
              <div className={styles.screenshotBadge}>
                <span>
                  {translate({
                    id: 'homepage.header.badge.text',
                    message: '⚡ 毫秒级响应，无感知切换',
                    description: 'Screenshot badge text'
                  })}
                </span>
              </div>
              <div className={styles.floatingElements}>
                <div className={styles.floatingIcon}>🎯</div>
                <div className={styles.floatingIcon}>⚡</div>
                <div className={styles.floatingIcon}>🪶</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 