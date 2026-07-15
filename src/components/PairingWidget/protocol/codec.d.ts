export const REPORT_ID_SHORT: number;
export const REPORT_ID_LONG: number;
export const SHORT_PARAMS: number;
export const LONG_PARAMS: number;
export const DEVICE_IDX_RECEIVER: number;
export const SUB_SET_REGISTER: number;
export const SUB_GET_REGISTER: number;
export const SUB_SET_LONG_REGISTER: number;
export const SUB_GET_LONG_REGISTER: number;
export const SUB_ERROR: number;
export const NOTIF_DEVICE_DISCONNECT: number;
export const NOTIF_DEVICE_CONNECT: number;
export const REG_NOTIFICATIONS: number;
export const REG_CONNECTION_STATE: number;
export const REG_PAIRING_LOCK: number;
export const REG_PAIRING_INFO: number;
export const PAIRING_OPEN_LOCK: number;
export const PAIRING_CLOSE_LOCK: number;
export const PAIRING_UNPAIR: number;

export interface HidppMessage {
  reportId: number;
  deviceIdx: number;
  subId: number;
  params: Uint8Array;
}

export function encode(deviceIdx: number, subId: number, params: number[], long?: boolean): Uint8Array;
export function decode(reportId: number, data: Uint8Array): HidppMessage;
export function matchesRegisterResponse(msg: HidppMessage, deviceIdx: number, subId: number, register: number): boolean;
export function wpidFromConnectNotification(params: Uint8Array): number;
