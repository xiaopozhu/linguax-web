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
