// Lightspeed 收发器适配器 — G 系列
// 公开资料显示 Lightspeed 收发器沿用 HID++ 1.0 寄存器语义（0xB2/0xB5），
// 与 Unifying 的差异主要在配对策略：Lightspeed 通常 1 收发器 1 设备。
// v1 范围（spec §5.1）：仅承诺 re-pair 已知设备 + list + unpair；
// dongle 更换 / 固件级操作明确不做。真机验证记录见 assets/qa/pairing-compat.md。

import { UnifyingAdapter } from './receiver-unifying';
import type { ReceiverAdapter } from './receiver-adapter';

export class LightspeedAdapter extends UnifyingAdapter {
  readonly kind: ReceiverAdapter['kind'] = 'lightspeed';
}
