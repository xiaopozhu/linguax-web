import React, { useCallback, useEffect, useState } from 'react';
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
      setError(`Could not read paired devices: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  }, [adapter]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onUnpair = useCallback(
    async (d: PairedDevice) => {
      const label = d.name || `slot ${d.index}`;
      // eslint-disable-next-line no-alert
      if (!window.confirm(`Unpair ${label}? It will stop working until you pair it again.`)) return;
      setBusy(true);
      try {
        await adapter.unpair(d.index);
        await refresh();
      } catch (e) {
        setError(`Unpair failed: ${e instanceof Error ? e.message : String(e)}`);
        setBusy(false);
      }
    },
    [adapter, refresh],
  );

  if (error) return <p className={styles.error}>{error}</p>;
  if (devices === null) return <p className={styles.hint}>Reading paired devices…</p>;
  if (devices.length === 0)
    return <p className={styles.hint}>No devices paired to this receiver — all six slots are free.</p>;

  return (
    <table className={styles.pairedTable}>
      <thead>
        <tr>
          <th>Slot</th>
          <th>Device</th>
          <th aria-label="actions" />
        </tr>
      </thead>
      <tbody>
        {devices.map((d) => (
          <tr key={d.index}>
            <td>{d.index}</td>
            <td>
              {d.name || <em>unknown device</em>} <span className={styles.hint}>({d.wpid})</span>
            </td>
            <td>
              <button type="button" className={styles.linkBtn} disabled={busy} onClick={() => onUnpair(d)}>
                Unpair
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
