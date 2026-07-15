// Receiver 适配器接口 + 工厂：按 productId 分派 Bolt / Unifying / Lightspeed

import { UnifyingAdapter } from './receiver-unifying';
import { LightspeedAdapter } from './receiver-lightspeed';
import { BoltAdapter } from './receiver-bolt';

export const LOGITECH_VENDOR_ID = 0x046d;

export interface PairedDevice {
  /** 收发器槽位（1 起） */
  index: number;
  /** 设备名（读不到时为空串） */
  name: string;
  /** wireless PID，hex 展示用 */
  wpid: string;
}

export interface ReceiverAdapter {
  readonly kind: 'unifying' | 'bolt' | 'lightspeed';
  /** 打开会话（幂等） */
  open(): Promise<void>;
  close(): Promise<void>;
  /** 开锁配对：等待新设备出现（用户按设备的 connect 键 / 开机）。resolve 为新设备。 */
  startPairing(timeoutMs: number): Promise<PairedDevice>;
  /** 枚举已配对槽位 */
  listPaired(): Promise<PairedDevice[]>;
  /** 解配指定槽位 */
  unpair(index: number): Promise<void>;
}

// 收发器 productId → 家族。来源：公开 USB ID 数据库；B12 真机测试时按需补充。
const UNIFYING_PIDS = new Set([0xc52b, 0xc532]);
const BOLT_PIDS = new Set([0xc548]);
const LIGHTSPEED_PIDS = new Set([0xc539, 0xc53a, 0xc53f, 0xc547]);

export type ReceiverKind = ReceiverAdapter['kind'];

export function detectReceiverKind(device: HIDDevice): ReceiverKind | null {
  if (device.vendorId !== LOGITECH_VENDOR_ID) return null;
  if (BOLT_PIDS.has(device.productId)) return 'bolt';
  if (UNIFYING_PIDS.has(device.productId)) return 'unifying';
  if (LIGHTSPEED_PIDS.has(device.productId)) return 'lightspeed';
  return null;
}

/** 未识别的收发器返回 null（UI 显示 "not a supported receiver"） */
export function createAdapter(device: HIDDevice): ReceiverAdapter | null {
  switch (detectReceiverKind(device)) {
    case 'bolt':
      return new BoltAdapter(device);
    case 'unifying':
      return new UnifyingAdapter(device);
    case 'lightspeed':
      return new LightspeedAdapter(device);
    default:
      return null;
  }
}
