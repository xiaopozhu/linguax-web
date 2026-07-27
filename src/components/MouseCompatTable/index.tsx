import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import data from '@site/src/data/mouse-compatibility.json';
import styles from './MouseCompatTable.module.css';

/**
 * Mac 鼠标兼容性表
 *
 * 数据由 scripts/sync-mouse-database.mjs 从 linguax-app 的型号识别列表生成,
 * 只包含可从源码核实的字段。**刻意不含 DPI / SmartShift 列** —— 那是运行时
 * 探测出来的能力,型号层面没有权威答案,列成"是/否"就是编造。
 */

interface Device {
  brand: string;
  model: string;
  vid: string;
  pid: string;
  slots: string[];
  unnamed: number;
  total: number;
  guide: string | null;
}

const DEVICES = data.devices as Device[];
const SLOT_ORDER = data.slotOrder as string[];

const ALL = '__all__';

export default function MouseCompatTable() {
  const [brand, setBrand] = useState<string>(ALL);

  const brands = useMemo(() => Array.from(new Set(DEVICES.map((d) => d.brand))), []);
  const rows = useMemo(
    () => (brand === ALL ? DEVICES : DEVICES.filter((d) => d.brand === brand)),
    [brand],
  );

  const slotLabels: Record<string, string> = {
    S1: translate({ id: 'compatTable.slot.S1', message: 'Side button 1' }),
    S2: translate({ id: 'compatTable.slot.S2', message: 'Side button 2' }),
    S3: translate({ id: 'compatTable.slot.S3', message: 'Side button 3' }),
    S4: translate({ id: 'compatTable.slot.S4', message: 'Side button 4' }),
    T: translate({ id: 'compatTable.slot.T', message: 'Thumb button' }),
    M: translate({ id: 'compatTable.slot.M', message: 'Wheel click' }),
    SM: translate({
      id: 'compatTable.slot.SM',
      message: 'Scroll-mode key (ratchet / free-spin)',
    }),
    WL: translate({ id: 'compatTable.slot.WL', message: 'Wheel tilt left' }),
    WR: translate({ id: 'compatTable.slot.WR', message: 'Wheel tilt right' }),
    AR: translate({ id: 'compatTable.slot.AR', message: 'Actions Ring' }),
  };

  const allLabel = translate({ id: 'compatTable.filter.all', message: 'All brands' });

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <button
            type="button"
            className={styles.chip}
            aria-pressed={brand === ALL}
            onClick={() => setBrand(ALL)}
          >
            {allLabel}
          </button>
          {brands.map((b) => (
            <button
              key={b}
              type="button"
              className={styles.chip}
              aria-pressed={brand === b}
              onClick={() => setBrand(b)}
            >
              {b}
            </button>
          ))}
        </div>
        <span className={styles.count}>
          <Translate
            id="compatTable.showing"
            values={{ shown: rows.length, total: DEVICES.length }}
          >
            {'{shown} of {total} models'}
          </Translate>
        </span>
      </div>

      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <Translate id="compatTable.col.model">Model</Translate>
              </th>
              <th>
                <Translate id="compatTable.col.usbId">USB ID</Translate>
              </th>
              <th>
                <Translate id="compatTable.col.slots">Mappable slot configuration</Translate>
              </th>
              <th style={{ textAlign: 'right' }}>
                <Translate id="compatTable.col.total">Slots</Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={`${d.vid}:${d.pid}`}>
                <td>
                  <div className={styles.model}>
                    {d.guide ? <Link to={d.guide}>{d.model}</Link> : d.model}
                  </div>
                  <div className={styles.brand}>{d.brand}</div>
                </td>
                <td className={styles.ids}>
                  {d.vid}:{d.pid}
                </td>
                <td>
                  {d.total === 0 ? (
                    <span className={styles.none}>
                      <Translate id="compatTable.notMappable">no mappable buttons</Translate>
                    </span>
                  ) : (
                    <div className={styles.config}>
                      {SLOT_ORDER.map((slot) =>
                        d.slots.includes(slot) ? (
                          <span
                            key={slot}
                            className={`${styles.slot} ${styles.slotOn}`}
                            title={slotLabels[slot]}
                          >
                            {slot}
                          </span>
                        ) : (
                          <span
                            key={slot}
                            className={`${styles.slot} ${styles.slotOff}`}
                            aria-hidden="true"
                          >
                            {slot}
                          </span>
                        ),
                      )}
                      {d.unnamed > 0 && (
                        <span className={styles.extra}>
                          <Translate id="compatTable.unnamed" values={{ n: d.unnamed }}>
                            {'+{n} unnamed'}
                          </Translate>
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td className={styles.total}>{d.total === 0 ? '—' : d.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendTitle}>
          <Translate id="compatTable.legend.title">Slot codes</Translate>
        </div>
        <dl className={styles.legendGrid}>
          {SLOT_ORDER.map((slot) => (
            <div key={slot} className={styles.legendItem}>
              <dt>{slot}</dt>
              <dd>{slotLabels[slot]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className={styles.footnote}>
        <Translate id="compatTable.footnote">
          Slots are named positions rather than raw button numbers, so the same mapping recipe
          works across mice in a family. A few models expose extra buttons that have no named
          slot — those are counted but shown as “unnamed”. Magic Mouse 2 is recognised but
          exposes no mappable buttons; macOS drives its touch surface natively.
        </Translate>
      </p>
    </div>
  );
}
