import React from 'react';
import BrowserGate from './BrowserGate';
import PairFlow from './ui/PairFlow';
import styles from './PairingWidget.module.css';

export interface PairingWidgetProps {
  /** 型号页可传入接收器提示（bolt/unifying/lightspeed），初始 UI 提示用，不限制操作 */
  receiverHint?: 'bolt' | 'unifying' | 'lightspeed';
  /** 隐藏 widget 自带标题（外层已有 hero 时避免重复） */
  hideHeader?: boolean;
}

/**
 * Web 配对 Widget（Track B / B9 真实现）
 * Chromium：BrowserGate → PairFlow（pair / list / unpair）
 * 其他浏览器或 Kill Switch 关闭：SafariFallback 降级 CTA（自带容器，勿嵌套）
 */
export default function PairingWidget({ receiverHint, hideHeader }: PairingWidgetProps) {
  return (
    <BrowserGate>
      <aside className={styles.fallback} aria-label="Logitech receiver pairing">
        {!hideHeader && (
          <div className={styles.fallbackHeader}>
            <h3 className={styles.fallbackTitle}>Pair your Logitech receiver — right here in the browser</h3>
            <p className={styles.fallbackDesc}>
              Works with Bolt, Unifying, and Lightspeed receivers. No Logitech software needed.
            </p>
          </div>
        )}
        <PairFlow receiverHint={receiverHint} />
        <p className={styles.disclaimer}>
          Not affiliated with or endorsed by Logitech. &ldquo;Logitech&rdquo;, &ldquo;MX Master&rdquo;,
          &ldquo;Bolt&rdquo;, &ldquo;Unifying&rdquo;, &ldquo;Lightspeed&rdquo; are trademarks of Logitech
          International SA, used descriptively for compatibility.
        </p>
      </aside>
    </BrowserGate>
  );
}
