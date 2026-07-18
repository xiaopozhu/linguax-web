// Bolt 收发器适配器 — BLEPP (BLE Pro Protocol) 独立实现
// clean-room 依据：Logitech logiwebconnect.com Web 客户端反向抓包（2026-07）
// Bolt firmware 也响应 HID++ 1.0 RAP，但配对不走 0xB2/0xB5 老寄存器，
// 而是走一套新 register：0xC0 discovery + 0xC1 pair + 0xB5 sub-addr 0x60+slot 读设备名

import {
  DEVICE_IDX_RECEIVER,
  SUB_SET_REGISTER,
  SUB_GET_REGISTER,
  SUB_SET_LONG_REGISTER,
  SUB_GET_LONG_REGISTER,
  SUB_ERROR,
  REPORT_ID_LONG,
  REG_NOTIFICATIONS,
  REG_CONNECTION_STATE,
  REG_PAIRING_INFO,
  REG_BLEPP_DEVICE_DISCOVERY,
  REG_BLEPP_DEVICE_PAIRING,
  NOTIF_BLEPP_DISCOVERY,
  NOTIF_BLEPP_PAIRING_STATUS,
  NOTIF_BLEPP_PASSKEY,
  NOTIF_BLEPP_PASSKEY_KEY,
  BLEPP_DISCOVERY_ACTION,
  BLEPP_PAIRING_ACTION,
  BLEPP_STATUS,
  BLEPP_ERROR,
  AUTH_METHOD,
  encode,
  parseBleppDiscoveryHeader,
  parseBleppDiscoveryNameChunk,
  parseBleppPairingStatus,
  parseBleppPasskey,
  parseBleppPasskeyProgress,
  passkeyDigitsToClickSequence,
} from './codec.js';
import { HidppTransport, HidppError, HidppTimeout } from './hidpp';
import type {
  DiscoveredDevice,
  PairedDevice,
  PairingHooks,
  ReceiverAdapter,
} from './receiver-adapter';

/** Bolt 收发器最多 6 个 slot */
const MAX_SLOTS = 6;
/** discovery 收集窗口（从第一台设备被发现算起） */
const DISCOVERY_COLLECT_WINDOW_MS = 2000;

/** 一个"正在归并中的" discovery 记录：header 和 name 分片可能不同顺序到来 */
interface DiscoveryAccum {
  header?: ReturnType<typeof parseBleppDiscoveryHeader>;
  nameLength?: number;
  nameChunks: Uint8Array[];
  /** 已归并出的 name（长度达标后计算一次） */
  name?: string;
}

export class BoltAdapter implements ReceiverAdapter {
  readonly kind = 'bolt' as const;
  private transport: HidppTransport;
  private opened = false;

  constructor(device: HIDDevice) {
    this.transport = new HidppTransport(device);
  }

  async open(): Promise<void> {
    if (this.opened) return;
    await this.transport.open();
    // bootHidppRap：抓包版本无条件做这两步。目的是让 receiver 补发已配对设备的 connect 通知。
    // 步骤 a：GET REG 0x00 拿到当前 flags
    // 步骤 b：SET REG 0x00，devicesFlags |= 0x10（wireless notifications on），receiverFlags |= 0x01
    // 步骤 c：SET REG 0x02 CONNECTION_STATE = 2 （FakeDeviceArrival）
    try {
      const cur = await this.transport.registerRequest(
        DEVICE_IDX_RECEIVER,
        SUB_GET_REGISTER,
        REG_NOTIFICATIONS,
      );
      const d0 = (cur.params[1] ?? 0) | 0x10;
      const d1 = (cur.params[2] ?? 0) | 0x01;
      const d2 = cur.params[3] ?? 0;
      await this.transport.registerRequest(DEVICE_IDX_RECEIVER, SUB_SET_REGISTER, REG_NOTIFICATIONS, [d0, d1, d2]);
    } catch {
      // 少数固件对 GET 0x00 返回 error，直接 SET 一个宽松值
      await this.transport.registerRequest(DEVICE_IDX_RECEIVER, SUB_SET_REGISTER, REG_NOTIFICATIONS, [0x10, 0x01, 0x00]);
    }
    // FakeDeviceArrival；失败也不 fatal（有的固件不吃）
    await this.transport
      .registerRequest(DEVICE_IDX_RECEIVER, SUB_SET_REGISTER, REG_CONNECTION_STATE, [0x02, 0x00, 0x00])
      .catch(() => {});
    this.opened = true;
  }

  async close(): Promise<void> {
    this.opened = false;
    await this.transport.close();
  }

  async startPairing(timeoutMs: number, hooks?: PairingHooks): Promise<PairedDevice> {
    await this.open();

    // -------- Discovery ------------------------------------------------------
    const accums = new Map<number, DiscoveryAccum>();
    const finalized: DiscoveredDevice[] = [];
    // 按 BD 地址去重：receiver 在 discovery 窗口里会周期性重播同一台设备，
    // 每次带新的 notifCounter，所以只靠 notifCounter 去重会把一台鼠标显示成 N 台
    const seenBdAddrs = new Set<string>();
    let firstSeenAt = 0;
    const unsub = this.transport.subscribe((msg) => {
      if (msg.deviceIdx !== DEVICE_IDX_RECEIVER) return;
      // 诊断：把所有 receiver 通知打印一份，方便观察 discovery 是否收到 0x4F/0x53
      console.log('[Bolt] notif', {
        subId: `0x${msg.subId.toString(16)}`,
        reportId: `0x${msg.reportId.toString(16)}`,
        params: Array.from(msg.params).map((b) => b.toString(16).padStart(2, '0')).join(' '),
      });
      if (msg.subId !== NOTIF_BLEPP_DISCOVERY) return;
      const before = finalized.length;
      this.absorbDiscoveryChunk(msg.params, accums, finalized, seenBdAddrs);
      if (firstSeenAt === 0 && (finalized.length > 0 || accums.size > 0)) {
        firstSeenAt = performance.now();
      }
      // 只在真正加入新设备时打一次，避免收发器周期性重播 0x4F 时刷屏
      if (finalized.length > before) {
        console.log('[Bolt] discovered so far', finalized.length, finalized.map((d) => d.name));
      }
    });

    // 触发 discovery（timeoutSec=0 = receiver 默认，约 30s；我们自己控 timeout）
    console.log('[Bolt] start discovery');
    await this.transport.registerRequest(DEVICE_IDX_RECEIVER, SUB_SET_REGISTER, REG_BLEPP_DEVICE_DISCOVERY, [
      0x00,
      BLEPP_DISCOVERY_ACTION.DISCOVER_HID,
      0x00,
    ]);
    console.log('[Bolt] discovery command acked');

    let chosen: DiscoveredDevice | null = null;
    try {
      chosen = await this.awaitDiscoveryDecision(
        () => finalized,
        () => firstSeenAt,
        timeoutMs,
        hooks,
      );
    } finally {
      unsub();
      // 无论成败先取消 discovery，避免 receiver 停留在扫描态
      await this.transport
        .registerRequest(DEVICE_IDX_RECEIVER, SUB_SET_REGISTER, REG_BLEPP_DEVICE_DISCOVERY, [
          0x00,
          BLEPP_DISCOVERY_ACTION.CANCEL_DISCOVERY,
          0x00,
        ])
        .catch(() => {});
    }
    if (!chosen) throw new HidppTimeout('No Bolt device discovered');

    // -------- Pair -----------------------------------------------------------
    return this.pairDiscovered(chosen, hooks);
  }

  /** 归并 0x4F 分片：header (part 0) + name chunks (part 1..N)，name 长度达标后 finalize；按 BD 地址去重 */
  private absorbDiscoveryChunk(
    params: Uint8Array,
    accums: Map<number, DiscoveryAccum>,
    finalized: DiscoveredDevice[],
    seenBdAddrs: Set<string>,
  ): void {
    // 需要先看 part 才知道走哪个 parser
    // 偏移：params[0..1]=notifCounter (BE)，params[2]=part flag（wire byte5）
    const part = params[2] & 0x03;
    let key: number;
    if (part === 0) {
      const h = parseBleppDiscoveryHeader(params);
      key = h.notifCounter;
      const acc = accums.get(key) ?? { nameChunks: [] };
      acc.header = h;
      accums.set(key, acc);
    } else {
      const c = parseBleppDiscoveryNameChunk(params);
      key = c.notifCounter;
      const acc = accums.get(key) ?? { nameChunks: [] };
      if (c.nameLength != null) acc.nameLength = c.nameLength;
      acc.nameChunks.push(c.chunk);
      accums.set(key, acc);
    }
    const acc = accums.get(key)!;
    // 尝试 finalize
    if (acc.header && acc.nameLength != null && acc.name == null) {
      const total = acc.nameChunks.reduce((n, ch) => n + ch.length, 0);
      if (total >= acc.nameLength) {
        const buf = new Uint8Array(acc.nameLength);
        let off = 0;
        for (const ch of acc.nameChunks) {
          const take = Math.min(ch.length, acc.nameLength - off);
          buf.set(ch.subarray(0, take), off);
          off += take;
          if (off >= acc.nameLength) break;
        }
        acc.name = new TextDecoder('utf-8', { fatal: false }).decode(buf).replace(/\0+$/, '').trim();
        accums.delete(key);
        const bdKey = acc.header.bluetoothAddress
          .map((b) => b.toString(16).padStart(2, '0'))
          .join(':');
        if (seenBdAddrs.has(bdKey)) return; // receiver 会反复重播同一台设备
        seenBdAddrs.add(bdKey);
        finalized.push({
          bluetoothAddress: acc.header.bluetoothAddress,
          productId: acc.header.productId,
          name: acc.name,
          authMethod: acc.header.authMethod,
          deviceType: acc.header.deviceType,
        });
      }
    }
  }

  /**
   * 智能切换：
   *   - 收集 DISCOVERY_COLLECT_WINDOW_MS（从第一台被发现算起）
   *   - 窗口结束时：仅 1 台 → auto；≥2 台 → 让 UI 选
   *   - 总 timeoutMs 内没设备 → 超时
   */
  private async awaitDiscoveryDecision(
    getFinalized: () => DiscoveredDevice[],
    getFirstSeenAt: () => number,
    timeoutMs: number,
    hooks: PairingHooks | undefined,
  ): Promise<DiscoveredDevice | null> {
    const deadline = performance.now() + timeoutMs;
    // 轮询：等到窗口关闭或超时
    for (;;) {
      const now = performance.now();
      const finalized = getFinalized();
      const firstSeenAt = getFirstSeenAt();
      const windowClosed = firstSeenAt > 0 && now - firstSeenAt >= DISCOVERY_COLLECT_WINDOW_MS;
      if (windowClosed && finalized.length > 0) {
        if (finalized.length === 1) return finalized[0];
        // 多台，让 UI 选
        if (!hooks?.onDiscovered) return finalized[0]; // 没 UI 回调就取第一台
        const pick = await hooks.onDiscovered(finalized.slice());
        if (pick === 'auto') return finalized[0];
        return pick;
      }
      if (now >= deadline) return null;
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  private async pairDiscovered(dev: DiscoveredDevice, hooks?: PairingHooks): Promise<PairedDevice> {
    // pair-status / passkey 订阅
    // authMethod=1（键盘）：0x4D 的 digits 是让用户在键盘上敲入的 6 位数字
    // authMethod=2（鼠标）：0x4D 的 digits 编码 10 位左右键点击序列，需转换成 L/R 显示给用户
    const off: (() => void)[] = [];
    off.push(
      this.transport.subscribe((msg) => {
        if (msg.deviceIdx !== DEVICE_IDX_RECEIVER) return;
        if (msg.subId === NOTIF_BLEPP_PASSKEY) {
          const { digits } = parseBleppPasskey(msg.params);
          const clickSequence =
            dev.authMethod === AUTH_METHOD.PASSKEY_EMULATION_2_BUTTON
              ? passkeyDigitsToClickSequence(digits)
              : undefined;
          console.log('[Bolt] passkey received', {
            authMethod: dev.authMethod,
            digitsRaw: digits,
            digitsAsNumber: Number(digits),
            digitsAsBinary: Number(digits).toString(2),
            clickSequence,
          });
          hooks?.onPasskey?.({ digits, authMethod: dev.authMethod, clickSequence });
        } else if (msg.subId === NOTIF_BLEPP_PASSKEY_KEY) {
          const { keyCode } = parseBleppPasskeyProgress(msg.params);
          const keyCodeName =
            ['ENTRY_STARTED', 'DIGIT_ENTERED', 'DIGIT_ERASED', 'CLEARED', 'ENTRY_COMPLETED'][keyCode] ?? `unknown(${keyCode})`;
          console.log('[Bolt] passkey progress', { keyCode, keyCodeName });
          hooks?.onPasskeyProgress?.({ keyCode });
        }
      }),
    );

    const auth = dev.authMethod;
    const timeoutSec = auth === AUTH_METHOD.PASSKEY_EMULATION_2_BUTTON ? 10 : 20;
    const [b0, b1, b2, b3, b4, b5] = dev.bluetoothAddress;
    // SET_LONG 0xC1: action=PAIR, reserved=0, BD[0..5], auth, timeout, reserved*6
    // registerRequest 返回时对短请求-响应做匹配；对 SET_LONG 一般 receiver 会以短 ACK 回，
    // 但 BLEPP 会先给 pairing-status STARTED，通过独立通知渠道最终反馈成败。
    // 因此不用 registerRequest 匹配响应，直接 sendReport + 等 0x54。
    const long = new Uint8Array(20);
    long[0] = REG_BLEPP_DEVICE_PAIRING; // codec.encode 会把这个当 params[0]？不——我们绕过 encode 直接构造
    // 实际上：我们要发 [devIdx, subId, register, action, 0, BD[0..5], auth, timeout, 0*6]
    // 但 encode(deviceIdx, subId, params, long) 已经处理了 devIdx + subId 头，params 从 byte2 起
    const params = [
      REG_BLEPP_DEVICE_PAIRING,
      BLEPP_PAIRING_ACTION.PAIR,
      0x00,
      b0,
      b1,
      b2,
      b3,
      b4,
      b5,
      auth,
      timeoutSec,
      0,
      0,
      0,
      0,
      0,
      0,
    ];
    // 手动发：不走 registerRequest（那个会自动等匹配响应，BLEPP 的响应在 0x54 单独通知里）
    const payload = encode(DEVICE_IDX_RECEIVER, SUB_SET_LONG_REGISTER, params, true);

    // 完成/失败判定：等 0x54，或者短 ERROR 帧
    const done = new Promise<PairedDevice>((resolve, reject) => {
      const un = this.transport.subscribe((msg) => {
        if (msg.deviceIdx !== DEVICE_IDX_RECEIVER) return;
        // 错误：SUB_ERROR 且 params[0]=原 subId, params[1]=register
        if (msg.subId === SUB_ERROR && msg.params[0] === SUB_SET_LONG_REGISTER && msg.params[1] === REG_BLEPP_DEVICE_PAIRING) {
          un();
          reject(new HidppError(`Bolt pair rejected: HID++ error 0x${msg.params[2]?.toString(16)}`, msg.params[2]));
          return;
        }
        if (msg.subId !== NOTIF_BLEPP_PAIRING_STATUS) return;
        const st = parseBleppPairingStatus(msg.params);
        if (st.status === BLEPP_STATUS.STARTED) return; // 中间态：pair 已启动，firmware 正在跟设备握手
        un();
        // 判定放宽：从 STARTED 转出的任何状态，只要 errorCode=NO_ERROR 就算成功
        // （对齐 bundle：STOPPED 和 CANCELLED + NO_ERROR 都算成，只有 errorCode 不为 0 才失败）
        if (st.errorCode === BLEPP_ERROR.NO_ERROR) {
          resolve({
            index: st.slot,
            name: dev.name,
            wpid: dev.productId.toString(16).padStart(4, '0'),
          });
        } else {
          reject(new HidppError(`Bolt pair failed: status=${st.status} err=${st.errorCode}`, st.errorCode));
        }
      });
      off.push(un);
    });

    try {
      console.log('[Bolt] pair request', {
        bdAddr: dev.bluetoothAddress.map((b) => b.toString(16).padStart(2, '0')).join(':'),
        authMethod: auth,
        timeoutSec,
      });
      await this.transport.device.sendReport(REPORT_ID_LONG, payload);
      console.log('[Bolt] pair report sent, waiting for 0x54 status');
      // 给一个宽裕的整体超时（passkey 键盘用户敲完最多 60s）
      return await this.withTimeout(done, 60_000, 'Bolt pair status timeout');
    } finally {
      off.forEach((f) => f());
    }
  }

  async listPaired(): Promise<PairedDevice[]> {
    await this.open();
    const out: PairedDevice[] = [];
    // Bolt 用 name 读取本身当作"槽位占用"探测：空槽会返回 HID++ ERROR
    // productId 从 0x41 DEVICE_CONNECT 通知里读（open() 里 FakeDeviceArrival 已触发补发），
    // 这次没做通知缓存，先只填 name/slot，wpid 留空
    for (let slot = 1; slot <= MAX_SLOTS; slot++) {
      try {
        const name = await this.readBoltDeviceName(slot);
        if (!name) continue; // 有 slot 但名字空，视为未占用
        out.push({ index: slot, name, wpid: '' });
      } catch (e) {
        if (e instanceof HidppError) continue; // 空 slot：预期
        throw e;
      }
    }
    return out;
  }

  async unpair(index: number): Promise<void> {
    await this.open();
    // SET_LONG 0xC1 action=UNPAIR, slot; 其余字节 0
    const params = [
      REG_BLEPP_DEVICE_PAIRING,
      BLEPP_PAIRING_ACTION.UNPAIR,
      index & 0xff,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    const payload = encode(DEVICE_IDX_RECEIVER, SUB_SET_LONG_REGISTER, params, true);
    await this.transport.device.sendReport(REPORT_ID_LONG, payload);
  }

  /**
   * Bolt 设备名读取：0xB5 sub-addr 0x60+slot（slot 1-based，slot 1 → 0x61），
   * 请求携第二字节 pageIdx（从 1 起递增），支持多页拼接
   * 响应：params[0]=sub-addr echo, params[1]=pageIdx echo, params[2]=?, params[3]=nameLength (仅 page 1), params[4..]=chunk (page 1) / params[3..]=chunk (page ≥2)
   */
  private async readBoltDeviceName(slot: number): Promise<string> {
    const subAddr = 0x60 + slot; // 1-based
    let totalLength = 0;
    const chunks: Uint8Array[] = [];
    let pageIdx = 1;
    // safety cap：设备名通常 ≤ 3 页
    while (pageIdx <= 4) {
      const resp = await this.transport.registerRequest(
        DEVICE_IDX_RECEIVER,
        SUB_GET_LONG_REGISTER,
        REG_PAIRING_INFO,
        [subAddr, pageIdx],
      );
      if (pageIdx === 1) {
        totalLength = resp.params[3] ?? 0;
        if (totalLength === 0) return '';
        chunks.push(resp.params.subarray(4));
      } else {
        chunks.push(resp.params.subarray(3));
      }
      const collected = chunks.reduce((n, c) => n + c.length, 0);
      if (collected >= totalLength) break;
      pageIdx++;
    }
    const buf = new Uint8Array(totalLength);
    let off = 0;
    for (const c of chunks) {
      const take = Math.min(c.length, totalLength - off);
      buf.set(c.subarray(0, take), off);
      off += take;
      if (off >= totalLength) break;
    }
    return new TextDecoder('utf-8', { fatal: false }).decode(buf).replace(/\0+$/, '').trim();
  }

  private withTimeout<T>(p: Promise<T>, ms: number, msg: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const t = setTimeout(() => reject(new HidppTimeout(msg)), ms);
      p.then(
        (v) => {
          clearTimeout(t);
          resolve(v);
        },
        (e) => {
          clearTimeout(t);
          reject(e);
        },
      );
    });
  }
}
