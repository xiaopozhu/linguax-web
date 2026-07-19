import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
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
      onDiscovered: (devs) =>
        new Promise<DiscoveredDevice>((resolve, reject) => {
          setPhase({
            s: 'picking',
            picker: {
              devices: devs,
              resolve,
              cancel: () => reject(new Error(PICKER_CANCEL_MARK)),
            },
          });
        }),
      onPasskey: ({ digits, authMethod, clickSequence }) => {
        setPhase({ s: 'passkey', digits, authMethod, clickSequence, entered: 0 });
      },
      onPasskeyProgress: ({ keyCode }) => {
        setPhase((p) => {
          if (p.s !== 'passkey') return p;
          if (keyCode === PASSKEY_KEYCODE.DIGIT_ENTERED) return { ...p, entered: p.entered + 1 };
          if (keyCode === PASSKEY_KEYCODE.DIGIT_ERASED) return { ...p, entered: Math.max(0, p.entered - 1) };
          if (keyCode === PASSKEY_KEYCODE.CLEARED) return { ...p, entered: 0 };
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
            ? translate({
                id: 'pairWidget.error.timeout',
                message:
                  'No device showed up. Turn the mouse off and on (or press its connect button), then try again.',
                description: 'Pair error: timeout waiting for device',
              })
            : translate(
                {
                  id: 'pairWidget.error.generic',
                  message: 'Pairing failed [{kind}]: {reason}',
                  description: 'Pair error: generic failure with adapter kind and reason',
                },
                { kind, reason: e instanceof Error ? e.message : String(e) },
              ),
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
          <Translate
            id="pairWidget.hint.receiverHint"
            description="Hint shown on model pages telling which receiver ships with this device"
            values={{ hint: <strong>{receiverHint}</strong> }}
          >
            {'This model usually ships with a {hint} receiver — plug it in, then click below.'}
          </Translate>
        </p>
      )}

      {phase.s === 'idle' && (
        <div className={styles.fallbackActions}>
          <button type="button" className={styles.primaryBtn} onClick={onPair}>
            <Translate id="pairWidget.btn.pairNew" description="Primary button: start pairing a new device">
              Pair a new device
            </Translate>
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={() => setShowList((v) => !v)}>
            {showList ? (
              <Translate id="pairWidget.btn.hidePaired" description="Secondary button when list is open">
                Hide paired devices
              </Translate>
            ) : (
              <Translate id="pairWidget.btn.seePaired" description="Secondary button when list is closed">
                See paired devices
              </Translate>
            )}
          </button>
        </div>
      )}

      {phase.s === 'unsupported' && (
        <p className={styles.error}>
          <Translate
            id="pairWidget.unsupported"
            description="Shown when the picked HID device isn't a supported Logitech receiver"
          >
            That device isn’t a supported receiver (Bolt / Unifying / Lightspeed). Pick the small USB receiver, not the
            mouse itself.
          </Translate>{' '}
          <button type="button" className={styles.linkBtn} onClick={() => setPhase({ s: 'idle' })}>
            <Translate id="pairWidget.btn.tryAgain" description="Button to reset and try again">
              Try again
            </Translate>
          </button>
        </p>
      )}

      {phase.s === 'pairing' && (
        <div className={styles.pairingBox}>
          <p className={styles.pairingTitle}>
            {adapter?.kind === 'bolt' ? (
              <Translate
                id="pairWidget.pairing.title.bolt"
                description="Instruction for Bolt receivers: put device in pairing mode"
              >
                Put your device in pairing mode (press &amp; hold its pair / Easy-Switch button)…
              </Translate>
            ) : (
              <Translate
                id="pairWidget.pairing.title.unifying"
                description="Instruction for Unifying/Lightspeed: wake device"
              >
                Now turn on your device, or press its connect / Easy-Switch button…
              </Translate>
            )}
          </p>
          <p className={styles.hint}>
            <Translate
              id="pairWidget.pairing.listening"
              description="Countdown while waiting for device"
              values={{ n: phase.secondsLeft }}
            >
              {'Listening for {n}s'}
            </Translate>
          </p>
        </div>
      )}

      {phase.s === 'picking' && (
        <div className={styles.pairingBox}>
          <p className={styles.pairingTitle}>
            <Translate
              id="pairWidget.picker.title"
              description="Title when multiple Bolt devices are discovered and user must pick one"
            >
              Multiple devices found — pick one:
            </Translate>
          </p>
          <ul className={styles.pickerList}>
            {phase.picker.devices.map((d) => {
              const key = d.bluetoothAddress.map((b) => b.toString(16).padStart(2, '0')).join(':');
              const isKeyboard = d.authMethod === AUTH_METHOD.PASSKEY;
              const kindLabel = isKeyboard
                ? translate({ id: 'pairWidget.picker.kind.keyboard', message: 'keyboard' })
                : translate({ id: 'pairWidget.picker.kind.mouse', message: 'mouse' });
              const unknownName = translate(
                { id: 'pairWidget.picker.unknown', message: 'Unknown device ({addr})' },
                { addr: key },
              );
              return (
                <li key={key}>
                  <button
                    type="button"
                    className={styles.linkBtn}
                    onClick={() => phase.picker.resolve(d)}
                  >
                    {d.name || unknownName}
                    <span className={styles.hint}> ({kindLabel})</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button type="button" className={styles.linkBtn} onClick={() => phase.picker.cancel()}>
            <Translate id="pairWidget.btn.cancel" description="Cancel button in the picker">
              Cancel
            </Translate>
          </button>
        </div>
      )}

      {phase.s === 'passkey' && phase.authMethod === AUTH_METHOD.PASSKEY && (
        <div className={styles.pairingBox}>
          <p className={styles.pairingTitle}>
            {phase.finalizing ? (
              <Translate id="pairWidget.passkey.confirming" description="Shown briefly before pair success">
                Confirming pairing…
              </Translate>
            ) : (
              <Translate
                id="pairWidget.passkey.keyboard.title"
                description="Ask user to type passkey on keyboard"
                values={{ digits: <strong>{phase.digits}</strong> }}
              >
                {'On the keyboard, type {digits} and press Enter'}
              </Translate>
            )}
          </p>
          {!phase.finalizing && (
            <p className={styles.hint}>
              <Translate
                id="pairWidget.passkey.keyboard.progress"
                description="Progress counter for keyboard passkey"
                values={{ entered: phase.entered, total: phase.digits.length }}
              >
                {'{entered} / {total} digits entered'}
              </Translate>
            </p>
          )}
        </div>
      )}

      {phase.s === 'passkey' && phase.authMethod === AUTH_METHOD.PASSKEY_EMULATION_2_BUTTON && phase.clickSequence && (
        <div className={styles.pairingBox}>
          <p className={styles.pairingTitle}>
            {phase.finalizing ? (
              <Translate id="pairWidget.passkey.confirming2" description="Shown briefly before pair success (mouse)">
                Confirming pairing…
              </Translate>
            ) : phase.entered < phase.clickSequence.length ? (
              <Translate
                id="pairWidget.passkey.mouse.title"
                description="Ask user to click mouse in L/R sequence"
              >
                Click your mouse in this sequence:
              </Translate>
            ) : (
              <Translate
                id="pairWidget.passkey.mouse.finalTitle"
                description="Ask user to press both buttons for final confirmation"
              >
                Now press LEFT + RIGHT buttons at the same time
              </Translate>
            )}
          </p>
          {!phase.finalizing && (
            <>
              <p className={styles.clickSequence}>
                {phase.entered < phase.clickSequence.length
                  ? phase.clickSequence.split('').map((c, i) => (
                      <span
                        key={i}
                        className={i < phase.entered ? styles.clickDone : styles.clickPending}
                      >
                        {c}
                      </span>
                    ))
                  : <span className={styles.clickPending}>L + R</span>}
              </p>
              <p className={styles.hint}>
                {phase.entered < phase.clickSequence.length ? (
                  <Translate
                    id="pairWidget.passkey.mouse.progress"
                    description="Progress counter for mouse click sequence with L/R legend"
                    values={{
                      entered: phase.entered,
                      total: phase.clickSequence.length,
                      L: <strong>L</strong>,
                      R: <strong>R</strong>,
                    }}
                  >
                    {'{entered} / {total} clicks — {L} = left, {R} = right'}
                  </Translate>
                ) : (
                  <Translate
                    id="pairWidget.passkey.mouse.finalHint"
                    description="Hint for pressing both mouse buttons"
                    values={{
                      both: (
                        <strong>
                          <Translate id="pairWidget.passkey.mouse.finalHint.both" description="Emphasized word: both">
                            both
                          </Translate>
                        </strong>
                      ),
                    }}
                  >
                    {'Final step: press {both} buttons together to confirm'}
                  </Translate>
                )}
              </p>
            </>
          )}
        </div>
      )}

      {phase.s === 'success' && (
        <div className={styles.pairingBox}>
          <p className={styles.pairingTitle}>
            <Translate
              id="pairWidget.success.title"
              description="Success message showing paired device name or slot number"
              values={{
                name: (
                  <strong>
                    {phase.device.name ||
                      translate(
                        { id: 'pairWidget.success.slotFallback', message: 'device in slot {n}' },
                        { n: phase.device.index },
                      )}
                  </strong>
                ),
              }}
            >
              {'✓ Paired: {name}'}
            </Translate>
          </p>
          <p className={styles.hint}>
            <Translate
              id="pairWidget.success.installHint"
              description="Post-pair CTA text with LinguaX download link"
              values={{
                dl: (
                  <Link to="/download">
                    <Translate id="pairWidget.success.installLink" description="LinguaX download link text">
                      Download LinguaX for macOS
                    </Translate>
                  </Link>
                ),
              }}
            >
              {'Now install LinguaX to remap its side buttons — {dl}'}
            </Translate>
          </p>
          <button type="button" className={styles.linkBtn} onClick={() => setPhase({ s: 'idle' })}>
            <Translate id="pairWidget.btn.pairAnother" description="Button to start another pairing">
              Pair another device
            </Translate>
          </button>
        </div>
      )}

      {phase.s === 'error' && (
        <p className={styles.error}>
          {phase.message}{' '}
          <button type="button" className={styles.linkBtn} onClick={() => setPhase({ s: 'idle' })}>
            <Translate id="pairWidget.btn.tryAgain2" description="Try again after error">
              Try again
            </Translate>
          </button>
        </p>
      )}

      {showList && adapter && <PairedList adapter={adapter} />}
      {showList && !adapter && phase.s === 'idle' && (
        <p className={styles.hint}>
          <Translate
            id="pairWidget.list.needConnect"
            description="Shown when user asks to see paired devices but adapter isn't ready"
          >
            Connect a receiver first (click “Pair a new device” and pick it) to see its paired devices.
          </Translate>
        </p>
      )}
    </div>
  );
}
