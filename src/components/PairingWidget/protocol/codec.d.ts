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

// BLEPP (Bolt)
export const NOTIF_BLEPP_DISCOVERY: number;
export const NOTIF_BLEPP_PASSKEY: number;
export const NOTIF_BLEPP_PASSKEY_KEY: number;
export const NOTIF_BLEPP_DISCOVERY_STATUS: number;
export const NOTIF_BLEPP_PAIRING_STATUS: number;
export const REG_BLEPP_DEVICE_DISCOVERY: number;
export const REG_BLEPP_DEVICE_PAIRING: number;

export const BLEPP_DISCOVERY_ACTION: {
  NO_CHANGE: number;
  DISCOVER_HID: number;
  CANCEL_DISCOVERY: number;
};
export const BLEPP_PAIRING_ACTION: {
  NO_CHANGE: number;
  PAIR: number;
  CANCEL: number;
  UNPAIR: number;
};
export const BLEPP_STATUS: {
  STARTED: number;
  CANCELLED: number;
  STOPPED: number;
};
export const BLEPP_ERROR: {
  NO_ERROR: number;
  TIMEOUT: number;
  FAILED: number;
};
export const AUTH_METHOD: {
  PASSKEY: number;
  PASSKEY_EMULATION_2_BUTTON: number;
};
export const PASSKEY_KEYCODE: {
  ENTRY_STARTED: number;
  DIGIT_ENTERED: number;
  DIGIT_ERASED: number;
  CLEARED: number;
  ENTRY_COMPLETED: number;
};

export interface HidppMessage {
  reportId: number;
  deviceIdx: number;
  subId: number;
  params: Uint8Array;
}

export interface BleppDiscoveryHeader {
  notifCounter: number;
  part: number;
  protocolType: number;
  deviceType: number;
  productId: number;
  bluetoothAddress: number[];
  extendedModelId: number;
  authMethod: number;
}
export interface BleppDiscoveryNameChunk {
  notifCounter: number;
  part: number;
  nameLength: number | null;
  chunk: Uint8Array;
}
export interface BleppDiscoveryStatus {
  status: number;
  errorCode: number;
}
export interface BleppPairingStatus {
  status: number;
  errorCode: number;
  bluetoothAddress: number[];
  slot: number;
}
export interface BleppPasskey {
  digits: string;
}
export interface BleppPasskeyProgress {
  keyCode: number;
  bluetoothAddress: number[];
}

export function encode(deviceIdx: number, subId: number, params: number[], long?: boolean): Uint8Array;
export function decode(reportId: number, data: Uint8Array): HidppMessage;
export function matchesRegisterResponse(msg: HidppMessage, deviceIdx: number, subId: number, register: number): boolean;
export function wpidFromConnectNotification(params: Uint8Array): number;

export function parseBleppDiscoveryHeader(params: Uint8Array): BleppDiscoveryHeader;
export function parseBleppDiscoveryNameChunk(params: Uint8Array): BleppDiscoveryNameChunk;
export function parseBleppDiscoveryStatus(params: Uint8Array): BleppDiscoveryStatus;
export function parseBleppPairingStatus(params: Uint8Array): BleppPairingStatus;
export function parseBleppPasskey(params: Uint8Array): BleppPasskey;
export function parseBleppPasskeyProgress(params: Uint8Array): BleppPasskeyProgress;
export function passkeyDigitsToClickSequence(digits: string): string;
