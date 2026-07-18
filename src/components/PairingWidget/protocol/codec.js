// HID++ 报文编解码 — 纯函数，无浏览器依赖，可被 Node 测试脚本直接 import
// clean-room 依据：Logitech 公开发布的 HID++ 1.0 规范（短/长报文结构、寄存器访问 sub-id）
// ref: "Logitech HID++ 1.0 specification"（官方公开文档）；常量与 fwupd logitech-hidpp 插件的公开定义一致

/** 短报文 report ID（总长 7 字节：id + deviceIdx + subId + 4 参数） */
export const REPORT_ID_SHORT = 0x10;
/** 长报文 report ID（总长 20 字节：id + deviceIdx + subId + 17 参数） */
export const REPORT_ID_LONG = 0x11;

export const SHORT_PARAMS = 4;
export const LONG_PARAMS = 17;

/** 收发器自身的 device index */
export const DEVICE_IDX_RECEIVER = 0xff;

// HID++ 1.0 寄存器访问 sub-id — ref: HID++ 1.0 spec §register access
export const SUB_SET_REGISTER = 0x80;
export const SUB_GET_REGISTER = 0x81;
export const SUB_SET_LONG_REGISTER = 0x82;
export const SUB_GET_LONG_REGISTER = 0x83;
/** 错误响应 sub-id；params = [被拒的 subId, register, errorCode] */
export const SUB_ERROR = 0x8f;

// 通知 sub-id — ref: HID++ 1.0 spec §notifications
export const NOTIF_DEVICE_DISCONNECT = 0x40;
export const NOTIF_DEVICE_CONNECT = 0x41;

// 收发器寄存器 — ref: HID++ 1.0 spec（Unifying receiver 章节，公开版）
/** 通知开关（bit: wireless notifications） */
export const REG_NOTIFICATIONS = 0x00;
/** 连接状态（读出已配对设备数） */
export const REG_CONNECTION_STATE = 0x02;
/** 配对锁：SET [action, slot, timeout]，action 0x01 开锁配对 / 0x02 关锁 / 0x03 解配 */
export const REG_PAIRING_LOCK = 0xb2;
/** 配对信息（长寄存器）：p0 = 0x20+slot → pairing info（含 WPID）；0x40+slot → 设备名 */
export const REG_PAIRING_INFO = 0xb5;

export const PAIRING_OPEN_LOCK = 0x01;
export const PAIRING_CLOSE_LOCK = 0x02;
export const PAIRING_UNPAIR = 0x03;

// -----------------------------------------------------------------------------
// BLEPP (BLE Pro Protocol) — Bolt 收发器配对
// clean-room 依据：Logitech logiwebconnect.com 公开 Web 客户端反向抓包（2026-07）
// 与 Unifying 路径共用 HID++ 1.0 报文，仅新增下列 subId/register/enum
// -----------------------------------------------------------------------------

/** Bolt 发现通知（LONG）：header + name 分片；notifCounter 归并 */
export const NOTIF_BLEPP_DISCOVERY = 0x4f;
/** Bolt passkey 展示（LONG）：byte3 = length，byte4.. = ASCII 数字字符 */
export const NOTIF_BLEPP_PASSKEY = 0x4d;
/** Bolt passkey 输入进度（LONG）：byte3 = keyCode（见 PASSKEY_KEYCODE） */
export const NOTIF_BLEPP_PASSKEY_KEY = 0x4e;
/** Bolt discovery 状态（SHORT）：byte3 = status，byte4 = errorCode */
export const NOTIF_BLEPP_DISCOVERY_STATUS = 0x53;
/** Bolt pairing 状态（LONG）：byte3 = status，byte4 = errorCode，byte5..10 = BD addr，byte11 = slot */
export const NOTIF_BLEPP_PAIRING_STATUS = 0x54;

/** Bolt discovery register：SET_REGISTER [timeout, action, 0] */
export const REG_BLEPP_DEVICE_DISCOVERY = 0xc0;
/** Bolt pairing register：SET_LONG_REGISTER [action, 0, BD[0..5], auth, timeout, 0*6] */
export const REG_BLEPP_DEVICE_PAIRING = 0xc1;

/** discovery register 的 action 字节 */
export const BLEPP_DISCOVERY_ACTION = {
  NO_CHANGE: 0,
  DISCOVER_HID: 1,
  CANCEL_DISCOVERY: 2,
};

/** pairing register 的 action 字节 */
export const BLEPP_PAIRING_ACTION = {
  NO_CHANGE: 0,
  PAIR: 1,
  CANCEL: 2,
  UNPAIR: 3,
};

/** discovery / pairing 状态通知里的 status 字节 */
export const BLEPP_STATUS = {
  STARTED: 0,
  CANCELLED: 1,
  STOPPED: 2,
};

/** discovery / pairing 状态通知里的 errorCode 字节 */
export const BLEPP_ERROR = {
  NO_ERROR: 0,
  TIMEOUT: 1,
  FAILED: 2,
};

/** BLEPP 认证方式（pair 时携带，来自 discovery header byte18） */
export const AUTH_METHOD = {
  PASSKEY: 1, // 键盘：用户在键盘上敲 6 位数字
  PASSKEY_EMULATION_2_BUTTON: 2, // 鼠标：无需用户交互（左右键"点击"由 firmware 内部处理）
};

/** passkey 输入进度的 keyCode */
export const PASSKEY_KEYCODE = {
  ENTRY_STARTED: 0,
  DIGIT_ENTERED: 1,
  DIGIT_ERASED: 2,
  CLEARED: 3,
  ENTRY_COMPLETED: 4,
};

// ---- 解析辅助 ----------------------------------------------------------------
// 偏移换算：抓包报告里的 byteN 是从 report ID (byte0) 起的绝对偏移；
// 我们 codec.decode 剥掉了 report ID + devIdx + subId 三字节，params[i] = wire byte(i+3)。

/**
 * 解析 0x4F BLEPP discovery 通知的 header 分片（part 0）
 * @param {Uint8Array} params
 * @returns {{notifCounter:number, part:number, protocolType:number, deviceType:number, productId:number, bluetoothAddress:number[], extendedModelId:number, authMethod:number}}
 */
export function parseBleppDiscoveryHeader(params) {
  const notifCounter = ((params[0] << 8) | params[1]) >>> 0; // byte3..4 BE
  const part = params[2] & 0x03; // byte5
  return {
    notifCounter,
    part,
    protocolType: params[3], // byte6
    deviceType: params[4], // byte7
    productId: (params[5] | (params[6] << 8)) >>> 0, // byte8..9 LE
    bluetoothAddress: [params[7], params[8], params[9], params[10], params[11], params[12]], // byte10..15
    extendedModelId: params[14], // byte17
    authMethod: params[15], // byte18
  };
}

/**
 * 解析 0x4F BLEPP discovery 通知的 name 分片
 * part=1：params[3] 是 nameLength，params[4..] 是 UTF-8 首片
 * part>=2：params[3..] 是 UTF-8 续片
 * @param {Uint8Array} params
 * @returns {{notifCounter:number, part:number, nameLength:number|null, chunk:Uint8Array}}
 */
export function parseBleppDiscoveryNameChunk(params) {
  const notifCounter = ((params[0] << 8) | params[1]) >>> 0;
  const part = params[2] & 0x03;
  if (part === 1) {
    return { notifCounter, part, nameLength: params[3], chunk: params.subarray(4) };
  }
  return { notifCounter, part, nameLength: null, chunk: params.subarray(3) };
}

/**
 * 解析 0x53 BLEPP discovery status（SHORT）
 * @param {Uint8Array} params
 * @returns {{status:number, errorCode:number}}
 */
export function parseBleppDiscoveryStatus(params) {
  return { status: params[0], errorCode: params[1] };
}

/**
 * 解析 0x54 BLEPP pairing status（LONG）
 * @param {Uint8Array} params
 * @returns {{status:number, errorCode:number, bluetoothAddress:number[], slot:number}}
 */
export function parseBleppPairingStatus(params) {
  return {
    status: params[0], // byte3
    errorCode: params[1], // byte4
    bluetoothAddress: [params[2], params[3], params[4], params[5], params[6], params[7]], // byte5..10
    slot: params[8], // byte11
  };
}

/**
 * 解析 0x4D BLEPP passkey 展示（LONG）：byte3=length，byte4..= ASCII 数字
 * @param {Uint8Array} params
 * @returns {{digits:string}}
 */
export function parseBleppPasskey(params) {
  const len = Math.min(params[0] ?? 0, params.length - 1);
  let s = '';
  for (let i = 0; i < len; i++) s += String.fromCharCode(params[1 + i]);
  return { digits: s };
}

/**
 * 解析 0x4E BLEPP passkey 进度（LONG）：byte3=keyCode，byte4..9=BD addr
 * @param {Uint8Array} params
 * @returns {{keyCode:number, bluetoothAddress:number[]}}
 */
export function parseBleppPasskeyProgress(params) {
  return {
    keyCode: params[0], // byte3
    bluetoothAddress: [params[1], params[2], params[3], params[4], params[5], params[6]], // byte4..9
  };
}

/**
 * 鼠标 authMethod=2 时把 0x4D 里的 ASCII 十进制数字串转成左右键点击序列
 * 规则：ASCII → BigInt → 二进制（MSB-first，天然不带前导零）→ padStart(10,'0') 只保证下限
 *      不能截断——数值 ≥ 1024 时 bit 数 > 10，firmware 期望的点击数就是 bit 数
 * 例："000433" → 433n → "110110001" → padStart(10) "0110110001" → L R R L R R L L L R (10 击)
 * 例："543210" → 543210n → 20 bit 串 → 序列 20 击（firmware 会数 20 次 DIGIT_ENTERED）
 * @param {string} digits
 * @returns {string} bit 数长的 "L"/"R" 序列（≥ 10）
 */
export function passkeyDigitsToClickSequence(digits) {
  const bi = BigInt(digits || '0');
  let bin = bi.toString(2);
  if (bin.length < 10) bin = bin.padStart(10, '0');
  let s = '';
  for (const c of bin) s += c === '0' ? 'L' : 'R';
  return s;
}

/**
 * 编码一条 HID++ 报文的 payload（不含 report ID —— WebHID sendReport 单独传 ID）
 * @param {number} deviceIdx
 * @param {number} subId
 * @param {number[]} params
 * @param {boolean} long
 * @returns {Uint8Array}
 */
export function encode(deviceIdx, subId, params, long = false) {
  const n = long ? LONG_PARAMS : SHORT_PARAMS;
  if (params.length > n) throw new Error(`params 超长: ${params.length} > ${n}`);
  const buf = new Uint8Array(2 + n);
  buf[0] = deviceIdx & 0xff;
  buf[1] = subId & 0xff;
  for (let i = 0; i < params.length; i++) buf[2 + i] = params[i] & 0xff;
  return buf;
}

/**
 * 解码 inputreport 的 payload（不含 report ID）
 * @param {number} reportId
 * @param {Uint8Array} data
 * @returns {{reportId:number, deviceIdx:number, subId:number, params:Uint8Array}}
 */
export function decode(reportId, data) {
  if (data.length < 2) throw new Error(`payload 过短: ${data.length}`);
  return {
    reportId,
    deviceIdx: data[0],
    subId: data[1],
    params: data.subarray(2),
  };
}

/**
 * 判断一条入站报文是否是对指定寄存器请求的响应（含错误响应）
 * @param {{deviceIdx:number, subId:number, params:Uint8Array}} msg
 * @param {number} deviceIdx
 * @param {number} subId  发出的 sub-id
 * @param {number} register
 */
export function matchesRegisterResponse(msg, deviceIdx, subId, register) {
  if (msg.deviceIdx !== deviceIdx) return false;
  if (msg.subId === subId && msg.params[0] === register) return true;
  // 错误报文：params = [原 subId, register, errCode]
  if (msg.subId === SUB_ERROR && msg.params[0] === subId && msg.params[1] === register) return true;
  return false;
}

/** 从 0x41 connect 通知里取 WPID（wireless PID，big-endian 两字节位于 params[1..2]） */
export function wpidFromConnectNotification(params) {
  return ((params[1] << 8) | params[2]) >>> 0;
}
