// HID++ 传输层：在一个 WebHID HIDDevice 上收发短/长报文，请求-响应配对，通知订阅
// 编解码与常量见 ./codec.js（clean-room 依据标注在那里）

import {
  REPORT_ID_SHORT,
  REPORT_ID_LONG,
  SUB_ERROR,
  encode,
  decode,
  matchesRegisterResponse,
  type HidppMessage,
} from './codec.js';

export class HidppError extends Error {
  constructor(
    message: string,
    public readonly errorCode?: number,
  ) {
    super(message);
    this.name = 'HidppError';
  }
}

export class HidppTimeout extends Error {
  constructor(message = 'HID++ response timeout') {
    super(message);
    this.name = 'HidppTimeout';
  }
}

type NotificationListener = (msg: HidppMessage) => void;

/** 单收发器的 HID++ 会话：打开设备、请求-响应、通知分发 */
export class HidppTransport {
  private listeners = new Set<NotificationListener>();
  private onReport = (ev: HIDInputReportEvent) => {
    if (ev.reportId !== REPORT_ID_SHORT && ev.reportId !== REPORT_ID_LONG) return;
    const bytes = new Uint8Array(ev.data.buffer, ev.data.byteOffset, ev.data.byteLength);
    const msg = decode(ev.reportId, bytes);
    for (const l of this.listeners) l(msg);
  };

  constructor(public readonly device: HIDDevice) {}

  async open(): Promise<void> {
    if (!this.device.opened) await this.device.open();
    this.device.addEventListener('inputreport', this.onReport);
  }

  async close(): Promise<void> {
    this.device.removeEventListener('inputreport', this.onReport);
    if (this.device.opened) await this.device.close();
  }

  /** 订阅所有入站 HID++ 报文（通知 + 响应）；返回退订函数 */
  subscribe(listener: NotificationListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** 发送寄存器请求并等待匹配的响应或错误；timeoutMs 内未响应抛 HidppTimeout */
  async registerRequest(
    deviceIdx: number,
    subId: number,
    register: number,
    params: number[] = [],
    opts: { long?: boolean; timeoutMs?: number } = {},
  ): Promise<HidppMessage> {
    const { long = false, timeoutMs = 3000 } = opts;
    const payload = encode(deviceIdx, subId, [register, ...params], long);
    const reportId = long ? REPORT_ID_LONG : REPORT_ID_SHORT;

    return new Promise<HidppMessage>((resolve, reject) => {
      const timer = setTimeout(() => {
        off();
        reject(new HidppTimeout());
      }, timeoutMs);
      const off = this.subscribe((msg) => {
        if (!matchesRegisterResponse(msg, deviceIdx, subId, register)) return;
        clearTimeout(timer);
        off();
        if (msg.subId === SUB_ERROR) {
          reject(new HidppError(`HID++ error 0x${msg.params[2]?.toString(16)}`, msg.params[2]));
        } else {
          resolve(msg);
        }
      });
      this.device.sendReport(reportId, payload).catch((e) => {
        clearTimeout(timer);
        off();
        reject(e);
      });
    });
  }

  /** 等待满足谓词的通知；timeoutMs 内未出现抛 HidppTimeout */
  waitFor(predicate: (msg: HidppMessage) => boolean, timeoutMs: number): Promise<HidppMessage> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        off();
        reject(new HidppTimeout());
      }, timeoutMs);
      const off = this.subscribe((msg) => {
        if (!predicate(msg)) return;
        clearTimeout(timer);
        off();
        resolve(msg);
      });
    });
  }
}
