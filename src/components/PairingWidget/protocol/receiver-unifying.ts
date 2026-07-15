// Unifying 收发器适配器 — HID++ 1.0 寄存器流程
// 依据：Logitech 公开 HID++ 1.0 规范的 Unifying receiver 章节
//   - REG 0xB2 配对锁（open/close/unpair）
//   - REG 0xB5 配对信息（0x20+slot → WPID；0x40+slot → 设备名）
//   - REG 0x00 通知开关；NOTIF 0x41 设备接入

import {
  DEVICE_IDX_RECEIVER,
  SUB_SET_REGISTER,
  SUB_GET_LONG_REGISTER,
  NOTIF_DEVICE_CONNECT,
  REG_NOTIFICATIONS,
  REG_PAIRING_LOCK,
  REG_PAIRING_INFO,
  PAIRING_OPEN_LOCK,
  PAIRING_CLOSE_LOCK,
  PAIRING_UNPAIR,
  wpidFromConnectNotification,
} from './codec.js';
import { HidppTransport, HidppError } from './hidpp';
import type { PairedDevice, ReceiverAdapter } from './receiver-adapter';

/** Unifying 系列固定 6 个配对槽位 */
const MAX_SLOTS = 6;

export class UnifyingAdapter implements ReceiverAdapter {
  readonly kind: ReceiverAdapter['kind'] = 'unifying';
  protected transport: HidppTransport;
  private opened = false;

  constructor(device: HIDDevice) {
    this.transport = new HidppTransport(device);
  }

  async open(): Promise<void> {
    if (this.opened) return;
    await this.transport.open();
    // 打开 wireless notifications，否则收不到 0x41 设备接入通知
    // 参数字节位按公开资料实现 — 真机验证项，见 assets/qa/pairing-compat.md
    await this.transport.registerRequest(DEVICE_IDX_RECEIVER, SUB_SET_REGISTER, REG_NOTIFICATIONS, [0x00, 0x01, 0x00]);
    this.opened = true;
  }

  async close(): Promise<void> {
    this.opened = false;
    await this.transport.close();
  }

  async startPairing(timeoutMs: number): Promise<PairedDevice> {
    await this.open();
    // 开锁：action=open, slot=0（自动分配）, timeout 秒
    const timeoutSec = Math.min(0xff, Math.ceil(timeoutMs / 1000));
    await this.transport.registerRequest(DEVICE_IDX_RECEIVER, SUB_SET_REGISTER, REG_PAIRING_LOCK, [
      PAIRING_OPEN_LOCK,
      0x00,
      timeoutSec,
    ]);
    try {
      const notif = await this.transport.waitFor((m) => m.subId === NOTIF_DEVICE_CONNECT, timeoutMs);
      const slot = notif.deviceIdx; // 0x41 通知的 deviceIdx 即新设备槽位
      const wpid = wpidFromConnectNotification(notif.params);
      const name = await this.readDeviceName(slot).catch(() => '');
      return { index: slot, name, wpid: wpid.toString(16).padStart(4, '0') };
    } finally {
      // 无论成败都关锁，避免收发器停留在配对模式
      await this.transport
        .registerRequest(DEVICE_IDX_RECEIVER, SUB_SET_REGISTER, REG_PAIRING_LOCK, [PAIRING_CLOSE_LOCK, 0x00, 0x00])
        .catch(() => {});
    }
  }

  async listPaired(): Promise<PairedDevice[]> {
    await this.open();
    const out: PairedDevice[] = [];
    for (let slot = 1; slot <= MAX_SLOTS; slot++) {
      try {
        // GET_LONG 0xB5, p0 = 0x20 + (slot-1)：pairing info；WPID 位于响应 params[3..4]
        const info = await this.transport.registerRequest(
          DEVICE_IDX_RECEIVER,
          SUB_GET_LONG_REGISTER,
          REG_PAIRING_INFO,
          [0x20 + (slot - 1)],
          { long: false },
        );
        const wpid = ((info.params[3] << 8) | info.params[4]) >>> 0;
        if (wpid === 0) continue;
        const name = await this.readDeviceName(slot).catch(() => '');
        out.push({ index: slot, name, wpid: wpid.toString(16).padStart(4, '0') });
      } catch (e) {
        // 空槽位收发器返回错误 —— 属预期，跳过
        if (e instanceof HidppError) continue;
        throw e;
      }
    }
    return out;
  }

  async unpair(index: number): Promise<void> {
    await this.open();
    await this.transport.registerRequest(DEVICE_IDX_RECEIVER, SUB_SET_REGISTER, REG_PAIRING_LOCK, [
      PAIRING_UNPAIR,
      index & 0xff,
      0x00,
    ]);
  }

  /** GET_LONG 0xB5, p0 = 0x40 + (slot-1)：设备名。params[1] 为长度，params[2..] 为 ASCII */
  protected async readDeviceName(slot: number): Promise<string> {
    const resp = await this.transport.registerRequest(
      DEVICE_IDX_RECEIVER,
      SUB_GET_LONG_REGISTER,
      REG_PAIRING_INFO,
      [0x40 + (slot - 1)],
      { long: false },
    );
    const len = Math.min(resp.params[1] ?? 0, resp.params.length - 2);
    let s = '';
    for (let i = 0; i < len; i++) s += String.fromCharCode(resp.params[2 + i]);
    return s.trim();
  }
}
