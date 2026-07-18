import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './PairingWidget.module.css';

/**
 * 非 Chromium / Kill Switch 关闭时的降级 UI
 * 引导用户下载 LinguaX 桌面版（首次启动 native pairing）或跳转独立工具页了解更多
 */
export default function SafariFallback() {
  return (
    <aside className={styles.fallback} aria-label="Browser pairing not available">
      <div className={styles.fallbackHeader}>
        <h3 className={styles.fallbackTitle}>
          <Translate id="pairWidget.fallback.title" description="Safari/non-Chromium fallback title">
            Pair in-browser (requires Chrome or Edge)
          </Translate>
        </h3>
        <p className={styles.fallbackDesc}>
          <Translate id="pairWidget.fallback.desc" description="Fallback subtitle promoting native app">
            Or install LinguaX for macOS — first-time pairing handled natively, no browser required.
          </Translate>
        </p>
      </div>

      <div className={styles.fallbackActions}>
        <Link to="/download" className={styles.primaryBtn}>
          <Translate id="pairWidget.fallback.download" description="Fallback download button">
            Download LinguaX for macOS
          </Translate>
        </Link>
        <Link to="/tools/pair-logitech-receiver" className={styles.secondaryBtn}>
          <Translate id="pairWidget.fallback.learnMore" description="Fallback learn-more link">
            Learn more about pairing
          </Translate>
        </Link>
      </div>

      <p className={styles.disclaimer}>
        <Translate id="pairWidget.disclaimer" description="Logitech trademarks disclaimer (shared with widget)">
          Not affiliated with or endorsed by Logitech. “Logitech”, “MX Master”, “Bolt”, “Unifying”, “Lightspeed” are
          trademarks of Logitech International SA, used descriptively for compatibility.
        </Translate>
      </p>
    </aside>
  );
}
