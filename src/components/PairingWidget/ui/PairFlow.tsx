import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import {
  createAdapter,
  LOGITECH_VENDOR_ID,
  type PairedDevice,
  type ReceiverAdapter,
} from '../protocol/receiver-adapter';
import { HidppTimeout } from '../protocol/hidpp';
import PairedList from './PairedList';
import styles from '../PairingWidget.module.css';

const PAIRING_TIMEOUT_MS = 30_000;

type Phase =
  | { s: 'idle' }
  | { s: 'unsupported' }
  | { s: 'pairing'; secondsLeft: number }
  | { s: 'success'; device: PairedDevice }
  | { s: 'error'; message: string };

interface Props {
  /** 型号页 embed 时折叠已配对列表 */
  compact?: boolean;
  /** 初始提示的收发器家族（不限制实际操作） */
  receiverHint?: 'bolt' | 'unifying' | 'lightspeed';
}

/** 配对主流程：requestDevice → adapter → open-lock → 等新设备 */
export default function PairFlow({ compact, receiverHint }: Props) {
  const [phase, setPhase] = useState<Phase>({ s: 'idle' });
  const [adapter, setAdapter] = useState<ReceiverAdapter | null>(null);
  const [showList, setShowList] = useState(!compact);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    adapter?.close().catch(() => {});
  }, [adapter]);

  const connectReceiver = useCallback(async (): Promise<ReceiverAdapter | null> => {
    const devices = await navigator.hid.requestDevice({
      filters: [{ vendorId: LOGITECH_VENDOR_ID }],
    });
    if (devices.length === 0) return null; // 用户取消了授权弹窗
    for (const d of devices) {
      const a = createAdapter(d);
      if (a) return a;
    }
    setPhase({ s: 'unsupported' });
    return null;
  }, []);

  const onPair = useCallback(async () => {
    try {
      const a = adapter ?? (await connectReceiver());
      if (!a) return;
      setAdapter(a);
      await a.open();

      let secondsLeft = PAIRING_TIMEOUT_MS / 1000;
      setPhase({ s: 'pairing', secondsLeft });
      timerRef.current = setInterval(() => {
        secondsLeft -= 1;
        setPhase((p) => (p.s === 'pairing' ? { s: 'pairing', secondsLeft } : p));
      }, 1000);

      const device = await a.startPairing(PAIRING_TIMEOUT_MS);
      setPhase({ s: 'success', device });
    } catch (e) {
      setPhase({
        s: 'error',
        message:
          e instanceof HidppTimeout
            ? 'No device showed up. Turn the mouse off and on (or press its connect button), then try again.'
            : `Pairing failed: ${e instanceof Error ? e.message : String(e)}`,
      });
    } finally {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [adapter, connectReceiver]);

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
          <p className={styles.pairingTitle}>Now turn on your device, or press its connect / Easy-Switch button…</p>
          <p className={styles.hint}>Listening for {phase.secondsLeft}s</p>
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
