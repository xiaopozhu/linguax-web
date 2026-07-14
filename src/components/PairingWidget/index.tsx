import React from 'react';
import SafariFallback from './SafariFallback';

export interface PairingWidgetProps {
  /** 型号页可传入接收器提示（bolt/unifying/lightspeed），供后续 Widget 高亮对应 tab；占位阶段忽略 */
  receiverHint?: 'bolt' | 'unifying' | 'lightspeed';
  /** 型号页 embed 用紧凑版；工具页用完整版；占位阶段两种视觉一致 */
  compact?: boolean;
}

// TODO(Plan B / task B9): 替换为 BrowserGate → PairFlow + PairedList 组合
// 占位版仅渲染 SafariFallback（不管浏览器），先跑 SEO，型号页可以正常提交索引
export default function PairingWidget(_props: PairingWidgetProps) {
  return <SafariFallback />;
}
