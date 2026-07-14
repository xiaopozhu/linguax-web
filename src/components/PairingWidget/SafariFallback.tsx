import React from 'react';
import Link from '@docusaurus/Link';
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
          Pair in-browser (requires Chrome or Edge)
        </h3>
        <p className={styles.fallbackDesc}>
          Or install LinguaX for macOS — first-time pairing handled natively, no browser required.
        </p>
      </div>

      <div className={styles.fallbackActions}>
        <Link to="/download" className={styles.primaryBtn}>
          Download LinguaX for macOS
        </Link>
        <Link to="/tools/pair-logitech-receiver" className={styles.secondaryBtn}>
          Learn more about pairing
        </Link>
      </div>

      <p className={styles.disclaimer}>
        Not affiliated with or endorsed by Logitech. &ldquo;Logitech&rdquo;, &ldquo;MX Master&rdquo;,
        &ldquo;Bolt&rdquo;, &ldquo;Unifying&rdquo;, &ldquo;Lightspeed&rdquo; are trademarks of Logitech
        International SA, used descriptively for compatibility.
      </p>
    </aside>
  );
}
