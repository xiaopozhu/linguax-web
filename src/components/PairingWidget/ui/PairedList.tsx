import React, { useCallback, useEffect, useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import type { PairedDevice, ReceiverAdapter } from '../protocol/receiver-adapter';
import styles from '../PairingWidget.module.css';

/** 已配对设备列表 + 逐行 Unpair（B8；UnpairAction 合并于此，见 plan 偏差记录） */
export default function PairedList({ adapter }: { adapter: ReceiverAdapter }) {
  const [devices, setDevices] = useState<PairedDevice[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      await adapter.open();
      setDevices(await adapter.listPaired());
    } catch (e) {
      console.error('[PairingWidget] listPaired failed', { kind: adapter.kind, error: e });
      setError(
        translate(
          {
            id: 'pairWidget.list.readError',
            message: 'Could not read paired devices: {reason}',
            description: 'Error message when listPaired fails',
          },
          { reason: e instanceof Error ? e.message : String(e) },
        ),
      );
    } finally {
      setBusy(false);
    }
  }, [adapter]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onUnpair = useCallback(
    async (d: PairedDevice) => {
      const label = d.name || translate({ id: 'pairWidget.list.slotLabel', message: 'slot {n}' }, { n: d.index });
      const confirmMsg = translate(
        {
          id: 'pairWidget.list.unpairConfirm',
          message: 'Unpair {label}? It will stop working until you pair it again.',
          description: 'Confirm dialog before unpairing a device',
        },
        { label },
      );
      // eslint-disable-next-line no-alert
      if (!window.confirm(confirmMsg)) return;
      setBusy(true);
      try {
        await adapter.unpair(d.index);
        await refresh();
      } catch (e) {
        console.error('[PairingWidget] unpair failed', { kind: adapter.kind, slot: d.index, error: e });
        setError(
          translate(
            {
              id: 'pairWidget.list.unpairError',
              message: 'Unpair failed: {reason}',
              description: 'Error message when unpair fails',
            },
            { reason: e instanceof Error ? e.message : String(e) },
          ),
        );
        setBusy(false);
      }
    },
    [adapter, refresh],
  );

  if (error) return <p className={styles.error}>{error}</p>;
  if (devices === null) {
    return (
      <p className={styles.hint}>
        <Translate id="pairWidget.list.loading" description="Loading state while reading paired devices">
          Reading paired devices…
        </Translate>
      </p>
    );
  }
  if (devices.length === 0) {
    return (
      <p className={styles.hint}>
        <Translate id="pairWidget.list.empty" description="Empty paired-devices state">
          No devices paired to this receiver — all six slots are free.
        </Translate>
      </p>
    );
  }

  return (
    <table className={styles.pairedTable}>
      <thead>
        <tr>
          <th>
            <Translate id="pairWidget.list.header.slot" description="Table header for slot column">
              Slot
            </Translate>
          </th>
          <th>
            <Translate id="pairWidget.list.header.device" description="Table header for device column">
              Device
            </Translate>
          </th>
          <th aria-label="actions" />
        </tr>
      </thead>
      <tbody>
        {devices.map((d) => (
          <tr key={d.index}>
            <td>{d.index}</td>
            <td>
              {d.name || (
                <em>
                  <Translate id="pairWidget.list.unknownDevice" description="Fallback name for unknown device">
                    unknown device
                  </Translate>
                </em>
              )}
              {d.wpid && <span className={styles.hint}> ({d.wpid})</span>}
            </td>
            <td>
              <button type="button" className={styles.linkBtn} disabled={busy} onClick={() => onUnpair(d)}>
                <Translate id="pairWidget.btn.unpair" description="Unpair a paired device">
                  Unpair
                </Translate>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
