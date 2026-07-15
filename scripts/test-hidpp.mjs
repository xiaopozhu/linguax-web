#!/usr/bin/env node
// HID++ codec 单元测试（B1）：encode/decode round-trip + 响应匹配语义
import {
  REPORT_ID_SHORT,
  REPORT_ID_LONG,
  DEVICE_IDX_RECEIVER,
  SUB_SET_REGISTER,
  SUB_GET_LONG_REGISTER,
  SUB_ERROR,
  REG_PAIRING_LOCK,
  PAIRING_OPEN_LOCK,
  encode,
  decode,
  matchesRegisterResponse,
  wpidFromConnectNotification,
} from '../src/components/PairingWidget/protocol/codec.js';

let failed = 0;
function check(name, cond) {
  if (cond) {
    console.log(`  [ok] ${name}`);
  } else {
    console.error(`  [FAIL] ${name}`);
    failed++;
  }
}

// 1. 短报文编码：payload 6 字节（不含 report id），字段就位
{
  const buf = encode(DEVICE_IDX_RECEIVER, SUB_SET_REGISTER, [REG_PAIRING_LOCK, PAIRING_OPEN_LOCK, 0x00, 30]);
  check('short encode length = 6', buf.length === 6);
  check('short encode fields', buf[0] === 0xff && buf[1] === 0x80 && buf[2] === 0xb2 && buf[3] === 0x01 && buf[5] === 30);
}

// 2. 长报文编码：payload 19 字节
{
  const buf = encode(0x01, SUB_GET_LONG_REGISTER, [0xb5, 0x40], true);
  check('long encode length = 19', buf.length === 19);
  check('long encode zero-padded', buf[4] === 0 && buf[18] === 0);
}

// 3. 超长参数抛错
{
  let threw = false;
  try { encode(0xff, 0x80, [1, 2, 3, 4, 5]); } catch { threw = true; }
  check('short params overflow throws', threw);
}

// 4. round-trip：encode → decode 字段一致
{
  const buf = encode(0x02, 0x41, [0x04, 0x10, 0x2a, 0x00]);
  const msg = decode(REPORT_ID_SHORT, buf);
  check('round-trip deviceIdx/subId', msg.deviceIdx === 0x02 && msg.subId === 0x41);
  check('round-trip params', msg.params[0] === 0x04 && msg.params[1] === 0x10 && msg.params[2] === 0x2a);
}

// 5. 响应匹配：正常响应 + 错误响应都命中，异类不命中
{
  const ok = decode(REPORT_ID_SHORT, encode(0xff, SUB_SET_REGISTER, [0xb2, 0, 0, 0]));
  const err = decode(REPORT_ID_SHORT, encode(0xff, SUB_ERROR, [SUB_SET_REGISTER, 0xb2, 0x03, 0]));
  const other = decode(REPORT_ID_SHORT, encode(0xff, SUB_SET_REGISTER, [0x00, 0, 0, 0]));
  check('match normal response', matchesRegisterResponse(ok, 0xff, SUB_SET_REGISTER, 0xb2));
  check('match error response', matchesRegisterResponse(err, 0xff, SUB_SET_REGISTER, 0xb2));
  check('reject other register', !matchesRegisterResponse(other, 0xff, SUB_SET_REGISTER, 0xb2));
  check('reject other deviceIdx', !matchesRegisterResponse(ok, 0x01, SUB_SET_REGISTER, 0xb2));
}

// 6. 0x41 通知 WPID 解析（big-endian 位于 params[1..2]）
{
  const notif = decode(REPORT_ID_LONG, encode(0x03, 0x41, [0x04, 0x40, 0x25], true));
  check('wpid parse', wpidFromConnectNotification(notif.params) === 0x4025);
}

if (failed > 0) {
  console.error(`\n${failed} 个断言失败`);
  process.exit(1);
}
console.log('\n[ok] hidpp codec 全部通过');
