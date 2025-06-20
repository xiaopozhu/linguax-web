import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function HomepageHeader(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
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
              <span>状态栏 · 轻量级 · 智能切换</span>
            </div>
            <Heading as="h1" className={styles.heroTitle}>
              让输入法
              <br />
              <span className={styles.titleGradient}>跟随应用切换</span>
            </Heading>
            <p className={styles.heroDescription}>
              LinguaX 是专为 macOS 设计的状态栏输入法管理工具。
              <br />
              <strong>为每个应用配置专属输入法，告别手动切换的烦恼。</strong>
            </p>
            <div className={styles.heroActions}>
              <a href="#download" className={styles.primaryBtn}>
                <span>免费试用</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>1800+</div>
                <div className={styles.statLabel}>用户信赖</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>{"< 5MB"}</div>
                <div className={styles.statLabel}>轻量应用</div>
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
                  <span className={styles.menuItem}>配置</span>
                  <span className={styles.menuItem}>帮助</span>
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
                  src="/img/linguax-app.png" 
                  alt="LinguaX 应用界面截图" 
                  className={styles.screenshotImage}
                />
              <div className={styles.screenshotBadge}>
                <span>⚡ 毫秒级响应，无感知切换</span>
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