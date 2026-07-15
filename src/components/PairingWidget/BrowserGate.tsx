import React, { useEffect, useState, type ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SafariFallback from './SafariFallback';

/**
 * 浏览器能力门 + Kill Switch：
 * - SSR / 首帧一律渲染 SafariFallback，client 检测通过后再换成真实 UI（避免 hydration 不一致）
 * - PAIRING_TOOL_ENABLED=false（customFields.pairingToolEnabled）时无条件降级
 * - 非 Chromium（无 navigator.hid）降级
 */
export default function BrowserGate({ children }: { children: ReactNode }) {
  const { siteConfig } = useDocusaurusContext();
  const enabled = siteConfig.customFields?.pairingToolEnabled !== false;
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (typeof navigator !== 'undefined' && 'hid' in navigator) setCapable(true);
  }, [enabled]);

  if (!enabled || !capable) return <SafariFallback />;
  return <>{children}</>;
}
