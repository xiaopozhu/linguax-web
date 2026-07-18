import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import {
  createAdapter,
  LOGITECH_VENDOR_ID,
  type DiscoveredDevice,
  type PairedDevice,
  type PairingHooks,
  type ReceiverAdapter,
} from '../protocol/receiver-adapter';
import { HidppTimeout } from '../protocol/hidpp';
import { AUTH_METHOD, PASSKEY_KEYCODE } from '../protocol/codec.js';
import PairedList from './PairedList';
import styles from '../PairingWidget.module.css';

const PAIRING_TIMEOUT_MS = 30_000;

/** Bolt discovery 到多台时用来 resolve UI 选择的容器 */
interface DevicePicker {
  devices: DiscoveredDevice[];
  resolve: (dev: DiscoveredDevice) => void;
  cancel: () => void;
}

type Phase =
  | { s: 'idle' }
  | { s: 'unsupported' }
  | { s: 'pairing'; secondsLeft: number }
  | { s: 'picking'; picker: DevicePicker }
  | { s: 'passkey'; digits: string; authMethod: number; clickSequence?: string; entered: number; finalizing?: boolean }
  | { s: 'success'; device: PairedDevice }
  | { s: 'error'; message: string };

/** 用户在 picker 里 Cancel 时抛这个，PairFlow catch 里识别到就静默回 idle 而不是弹错误 */
const PICKER_CANCEL_MARK = '__pairing_widget_user_cancel__';

interface Props {
  /** 初始提示的收发器家族（不限制实际操作） */
  receiverHint?: 'bolt' | 'unifying' | 'lightspeed';
}

/** 配对主流程：requestDevice → adapter → startPairing（Unifying=一步/Bolt=discovery+pair） */
export default function PairFlow({ receiverHint }: Props) {
  const [phase, setPhase] = useState<Phase>({ s: 'idle' });
  const [adapter, setAdapter] = useState<ReceiverAdapter | null>(null);
  const [showList, setShowList] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    adapter?.close().catch(() => {});
  }, [adapter]);

  // 冷启动/刷新后：Chrome 记住的 HID 授权还在，直接拿来复用一个 adapter，
  // 这样"See paired devices"不用先重新走 pair 流程
  useEffect(() => {
    if (adapter) return;
    let cancelled = false;
    navigator.hid
      .getDevices()
      .then((devs) => {
        if (cancelled) return;
        for (const d of devs) {
          const a = createAdapter(d);
          if (a) {
            setAdapter(a);
            return;
          }
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [adapter]);

  const connectReceiver = useCallback(async (): Promise<ReceiverAdapter | null> => {
    // 收紧到 HID++ vendor-specific collection（0xFF00）。Bolt 也用 0xFF00（官方页面实测）。
    const devices = await navigator.hid.requestDevice({
      filters: [
        { vendorId: LOGITECH_VENDOR_ID, usagePage: 0xff00 },
        { vendorId: LOGITECH_VENDOR_ID, usagePage: 0xff43 },
      ],
    });
    if (devices.length === 0) return null;
    for (const d of devices) {
      const a = createAdapter(d);
      if (a) return a;
    }
    setPhase({ s: 'unsupported' });
    return null;
  }, []);

  const buildHooks = useCallback((): PairingHooks => {
    return {
      // Bolt discovery 完成后：≥2 台时把选择权交给 UI
      onDiscovered: (devs) =>
        new Promise<DiscoveredDevice>((resolve, reject) => {
          setPhase({
            s: 'picking',
            picker: {
              devices: devs,
              resolve,
              // Cancel 走 sentinel 标记，PairFlow.onPair 的 catch 里识别到就静默回 idle
              cancel: () => reject(new Error(PICKER_CANCEL_MARK)),
            },
          });
        }),
      // authMethod=1（键盘）：digits 是要在键盘上敲的 6 位数字
      // authMethod=2（鼠标）：clickSequence 是 L/R 序列（长度 ≥10，看 passkey bit 数），用户按左右键
      onPasskey: ({ digits, authMethod, clickSequence }) => {
        setPhase({ s: 'passkey', digits, authMethod, clickSequence, entered: 0 });
      },
      onPasskeyProgress: ({ keyCode }) => {
        setPhase((p) => {
          if (p.s !== 'passkey') return p;
          if (keyCode === PASSKEY_KEYCODE.DIGIT_ENTERED) return { ...p, entered: p.entered + 1 };
          if (keyCode === PASSKEY_KEYCODE.DIGIT_ERASED) return { ...p, entered: Math.max(0, p.entered - 1) };
          if (keyCode === PASSKEY_KEYCODE.CLEARED) return { ...p, entered: 0 };
          // firmware 认可完成：ENTRY_COMPLETED 到 0x54 之间可能还有 100-500ms，切个 "Confirming…" 状态
          if (keyCode === PASSKEY_KEYCODE.ENTRY_COMPLETED) return { ...p, finalizing: true };
          return p;
        });
      },
    };
  }, []);

  const onPair = useCallback(async () => {
    let running: ReceiverAdapter | null = adapter;
    try {
      const a = running ?? (await connectReceiver());
      if (!a) return;
      running = a;
      setAdapter(a);
      await a.open();

      let secondsLeft = PAIRING_TIMEOUT_MS / 1000;
      setPhase({ s: 'pairing', secondsLeft });
      timerRef.current = setInterval(() => {
        secondsLeft -= 1;
        setPhase((p) => {
          // phase 已经变 → 自清 timer；secondsLeft 到 0 → 显示 0 并停（不跑负数）
          if (p.s !== 'pairing') {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return p;
          }
          if (secondsLeft <= 0) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return { s: 'pairing', secondsLeft: 0 };
          }
          return { s: 'pairing', secondsLeft };
        });
      }, 1000);

      const device = await a.startPairing(PAIRING_TIMEOUT_MS, buildHooks());
      setPhase({ s: 'success', device });
      setShowList(true);
    } catch (e) {
      // 用户在 picker 里 Cancel：静默回 idle，不弹错误
      if (e instanceof Error && e.message === PICKER_CANCEL_MARK) {
        setPhase({ s: 'idle' });
        return;
      }
      const kind = running?.kind ?? 'unknown';
      console.error('[PairingWidget] pair failed', { kind, receiverHint, error: e });
      setPhase({
        s: 'error',
        message:
          e instanceof HidppTimeout
            ? 'No device showed up. Turn the mouse off and on (or press its connect button), then try again.'
            : `Pairing failed [${kind}]: ${e instanceof Error ? e.message : String(e)}`,
      });
    } finally {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [adapter, connectReceiver, buildHooks, receiverHint]);

  return (
    <div>
      {receiverHint && phase.s === 'idle' && (
        <p className={styles.hint}>
          This model usually ships with a <strong>{receiverHint}</strong> receiver — plug it in, then click below.
        </p>
      )}

      {phase.s === 'idle' && (
        <div className={styles.fallbackActions}>
          <button type="button" className={styles.primaryBtn} onClick={onPair}>
            Pair a new device
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={() => setShowList((v) => !v)}>
            {showList ? 'Hide paired devices' : 'See paired devices'}
          </button>
        </div>
      )}

      {phase.s === 'unsupported' && (
        <p className={styles.error}>
          That device isn&rsquo;t a supported receiver (Bolt / Unifying / Lightspeed). Pick the small USB receiver, not
          the mouse itself.{' '}
          <button type="button" className={styles.linkBtn} onClick={() => setPhase({ s: 'idle' })}>
            Try again
          </button>
        </p>
      )}

      {phase.s === 'pairing' && (
        <div className={styles.pairingBox}>
          <p className={styles.pairingTitle}>
            {adapter?.kind === 'bolt'
              ? 'Put your device in pairing mode (press & hold its pair / Easy-Switch button)…'
              : 'Now turn on your device, or press its connect / Easy-Switch button…'}
          </p>
          <p className={styles.hint}>Listening for {phase.secondsLeft}s</p>
        </div>
      )}

      {phase.s === 'picking' && (
        <div className={styles.pairingBox}>
          <p className={styles.pairingTitle}>Multiple devices found — pick one:</p>
          <ul className={styles.pickerList}>
            {phase.picker.devices.map((d) => {
              const key = d.bluetoothAddress.map((b) => b.toString(16).padStart(2, '0')).join(':');
              return (
                <li key={key}>
                  <button
                    type="button"
                    className={styles.linkBtn}
                    onClick={() => phase.picker.resolve(d)}
                  >
                    {d.name || `Unknown device (${key})`}
                    <span className={styles.hint}> ({d.authMethod === AUTH_METHOD.PASSKEY ? 'keyboard' : 'mouse'})</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button type="button" className={styles.linkBtn} onClick={() => phase.picker.cancel()}>
            Cancel
          </button>
        </div>
      )}

      {phase.s === 'passkey' && phase.authMethod === AUTH_METHOD.PASSKEY && (
        <div className={styles.pairingBox}>
          <p className={styles.pairingTitle}>
            {phase.finalizing
              ? 'Confirming pairing…'
              : (<>On the keyboard, type <strong>{phase.digits}</strong> and press Enter</>)}
          </p>
          {!phase.finalizing && (
            <p className={styles.hint}>
              {phase.entered} / {phase.digits.length} digits entered
            </p>
          )}
        </div>
      )}

      {phase.s === 'passkey' && phase.authMethod === AUTH_METHOD.PASSKEY_EMULATION_2_BUTTON && phase.clickSequence && (
        <div className={styles.pairingBox}>
          <p className={styles.pairingTitle}>
            {phase.finalizing
              ? 'Confirming pairing…'
              : phase.entered < phase.clickSequence.length
                ? 'Click your mouse in this sequence:'
                : 'Now press LEFT + RIGHT buttons at the same time'}
          </p>
          {!phase.finalizing && (
            <>
              <p className={styles.clickSequence}>
                {phase.clickSequence.split('').map((c, i) => (
                  <span
                    key={i}
                    className={i < phase.entered ? styles.clickDone : styles.clickPending}
                  >
                    {c}
                  </span>
                ))}
                <span
                  className={phase.entered >= phase.clickSequence.length ? styles.clickPending : styles.clickDone}
                  style={{ marginLeft: '0.5rem' }}
                >
                  L+R
                </span>
              </p>
              <p className={styles.hint}>
                {phase.entered < phase.clickSequence.length ? (
                  <>
                    {phase.entered} / {phase.clickSequence.length} clicks — <strong>L</strong> = left,{' '}
                    <strong>R</strong> = right
                  </>
                ) : (
                  <>Final step: press <strong>both</strong> buttons together to confirm</>
                )}
              </p>
            </>
          )}
        </div>
      )}

      {phase.s === 'success' && (
        <div className={styles.pairingBox}>
          <p className={styles.pairingTitle}>
            ✓ Paired: <strong>{phase.device.name || `device in slot ${phase.device.index}`}</strong>
          </p>
          <p className={styles.hint}>
            Now install LinguaX to remap its side buttons —{' '}
            <Link to="/download">Download LinguaX for macOS</Link>
          </p>
          <button type="button" className={styles.linkBtn} onClick={() => setPhase({ s: 'idle' })}>
            Pair another device
          </button>
        </div>
      )}

      {phase.s === 'error' && (
        <p className={styles.error}>
          {phase.message}{' '}
          <button type="button" className={styles.linkBtn} onClick={() => setPhase({ s: 'idle' })}>
            Try again
          </button>
        </p>
      )}

      {showList && adapter && <PairedList adapter={adapter} />}
      {showList && !adapter && phase.s === 'idle' && (
        <p className={styles.hint}>Connect a receiver first (click &ldquo;Pair a new device&rdquo; and pick it) to see its paired devices.</p>
      )}
    </div>
  );
}
