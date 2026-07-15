// Bolt 收发器适配器
// list / unpair 使用与 Unifying 相同的收发器通用寄存器（0xB5 / 0xB2），公开资料一致。
// TODO(B12 真机验证)：Bolt 的"新设备发现"完整流程可能需要额外的 discovery/认证步骤
// （键盘类设备涉及 passkey；鼠标类预期 open-lock 即可）。在真机确认前，
// startPairing 沿用 HID++ 1.0 open-lock 流程 —— 若真机验证失败，此处替换为
// Bolt 专有 discovery 序列，并更新 assets/qa/pairing-compat.md。

import { UnifyingAdapter } from './receiver-unifying';
import type { ReceiverAdapter } from './receiver-adapter';

export class BoltAdapter extends UnifyingAdapter {
  readonly kind: ReceiverAdapter['kind'] = 'bolt';
}
