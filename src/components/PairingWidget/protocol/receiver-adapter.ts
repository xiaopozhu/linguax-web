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
  /** wireless PID / Bolt productId，hex 展示用 */
  wpid: string;
}

/** Bolt discovery 阶段暴露给 UI 的候选设备（未 pair） */
export interface DiscoveredDevice {
  /** BLE 地址（6 字节，LSB first；作为唯一 ID） */
  bluetoothAddress: number[];
  /** 蓝牙 productId */
  productId: number;
  /** 设备名（多个 0x4F 分片归并后） */
  name: string;
  /** 1 = keyboard passkey；2 = mouse 2-button emulation（对应 codec.AUTH_METHOD） */
  authMethod: number;
  /** 设备类型（0x4F header byte7；具体枚举未在官方 bundle 里给出） */
  deviceType: number;
}

/** BoltAdapter.startPairing 里通过 hooks 与 UI 双向通讯；Unifying/Lightspeed 忽略 */
export interface PairingHooks {
  /**
   * discovery 收集窗口结束后回调。
   *   - 返回 'auto'：由 adapter 自行决定（通常 1 台就自动 pair）
   *   - 返回 DiscoveredDevice：UI 选中的那台
   *   - 抛出：整个 pair 流程取消
   */
  onDiscovered?: (devs: DiscoveredDevice[]) => Promise<DiscoveredDevice | 'auto'>;
  /**
   * passkey 展示：
   *   authMethod=1（键盘）：digits 是用户要在键盘上敲的 6 位数字
   *   authMethod=2（鼠标）：clickSequence 是 L/R 序列（长度 ≥10，由 passkey bit 数决定），用户在鼠标上按左/右键
   */
  onPasskey?: (info: { digits: string; authMethod: number; clickSequence?: string }) => void;
  /** passkey 输入进度：keyCode 见 codec.PASSKEY_KEYCODE */
  onPasskeyProgress?: (p: { keyCode: number }) => void;
}

export interface ReceiverAdapter {
  readonly kind: 'unifying' | 'bolt' | 'lightspeed';
  /** 打开会话（幂等） */
  open(): Promise<void>;
  close(): Promise<void>;
  /**
   * 开始配对流程，resolve 为新配对的设备。
   * Unifying/Lightspeed：忽略 hooks，走 open-lock 等 0x41 通知；
   * Bolt：走 BLEPP discovery → 智能选择 → SET_LONG 0xC1 → 等 0x54。
   */
  startPairing(timeoutMs: number, hooks?: PairingHooks): Promise<PairedDevice>;
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
