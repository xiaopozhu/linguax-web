// 最小 WebHID 环境声明 — 避免引入 @types/w3c-web-hid 依赖
// 仅覆盖 PairingWidget 用到的 API 面

interface HIDInputReportEvent extends Event {
  readonly device: HIDDevice;
  readonly reportId: number;
  readonly data: DataView;
}

interface HIDDevice extends EventTarget {
  readonly opened: boolean;
  readonly vendorId: number;
  readonly productId: number;
  readonly productName: string;
  open(): Promise<void>;
  close(): Promise<void>;
  sendReport(reportId: number, data: BufferSource): Promise<void>;
  addEventListener(type: 'inputreport', listener: (ev: HIDInputReportEvent) => void): void;
  removeEventListener(type: 'inputreport', listener: (ev: HIDInputReportEvent) => void): void;
}

interface HIDDeviceRequestOptions {
  filters: Array<{ vendorId?: number; productId?: number; usagePage?: number; usage?: number }>;
}

interface HID {
  requestDevice(options: HIDDeviceRequestOptions): Promise<HIDDevice[]>;
  getDevices(): Promise<HIDDevice[]>;
}

interface Navigator {
  readonly hid: HID;
}
