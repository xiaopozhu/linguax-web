import React, { useCallback, useEffect, useRef, useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './ScrollTester.module.css';

/**
 * 滚动手感测试器
 *
 * 录制 trackpad 与鼠标滚轮各自产生的 wheel 事件,画在同一套标尺上对比。
 * 只用标准 DOM wheel 事件 —— 不接触任何设备协议。
 *
 * 性能约定:wheel 事件频率很高(触控板惯性期可达 ~120/s),因此样本只写入 ref,
 * 录制过程中仅重绘 canvas,不触发 React re-render;只在录制开始/结束时 setState。
 */

const IDLE_MS = 500; // 静止多久算一段录制结束
const CANVAS_H = 132;

type Kind = 'trackpad' | 'wheel';
const KINDS: Kind[] = ['trackpad', 'wheel'];

interface Sample {
  t: number;
  dy: number;
}

interface Stats {
  count: number;
  span: number;
  rate: number;
  distinct: number;
  median: number;
  max: number;
  tail: number;
}

function computeStats(ev: Sample[]): Stats | null {
  if (ev.length < 2) return null;

  const span = ev[ev.length - 1].t - ev[0].t;
  const mags = ev.map((e) => Math.abs(e.dy)).filter((v) => v > 0);
  if (!mags.length) return null;

  // 量化到 0.01 再去重:浮点噪声不该被算成"不同的步长"
  const distinct = new Set(mags.map((v) => Math.round(v * 100) / 100));
  const sorted = [...mags].sort((x, y) => x - y);

  // 惯性尾巴:末段连续衰减的事件数
  let tail = 0;
  for (let i = ev.length - 1; i > 0; i--) {
    const cur = Math.abs(ev[i].dy);
    const prev = Math.abs(ev[i - 1].dy);
    if (cur > 0 && cur < prev) tail++;
    else break;
  }

  return {
    count: ev.length,
    span,
    rate: span > 0 ? (ev.length - 1) / (span / 1000) : 0,
    distinct: distinct.size,
    median: sorted[Math.floor(sorted.length / 2)],
    max: sorted[sorted.length - 1],
    tail,
  };
}

function fmt(n: number, digits = 0): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

const emptySamples = (): Record<Kind, Sample[]> => ({ trackpad: [], wheel: [] });

export default function ScrollTester() {
  const samples = useRef<Record<Kind, Sample[]>>(emptySamples());
  const timers = useRef<Record<Kind, number | null>>({ trackpad: null, wheel: null });
  const canvases = useRef<Record<Kind, HTMLCanvasElement | null>>({ trackpad: null, wheel: null });
  const catchers = useRef<Record<Kind, HTMLDivElement | null>>({ trackpad: null, wheel: null });
  const sawWheel = useRef(false);

  const [stats, setStats] = useState<Record<Kind, Stats | null>>({ trackpad: null, wheel: null });
  const [live, setLive] = useState<Kind | null>(null);
  const [scale, setScale] = useState<{ max: number; span: number } | null>(null);
  const [noWheel, setNoWheel] = useState(false);

  /** 用共享标尺把一个采集台画出来 */
  const draw = useCallback((kind: Kind, scaleMax: number, scaleSpan: number) => {
    const canvas = canvases.current[kind];
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const ev = samples.current[kind];
    if (!ev.length) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // 与 CSS 同样的双层 fallback:工具页取 --lx-primary,嵌进 blog 时回退到 --primary-500。
    // 这几个令牌都是直接赋值的色值字面量,深色模式下同样可读。
    const css = getComputedStyle(document.documentElement);
    const read = (name: string) => css.getPropertyValue(name).trim();
    const color =
      kind === 'trackpad'
        ? read('--accent') || '#4ECDC4'
        : read('--lx-primary') || read('--primary-500') || '#FF7F50';

    const padY = 10 * dpr;
    const base = H - padY;
    const usable = base - padY;
    const t0 = ev[0].t;
    const span = Math.max(scaleSpan, 1);
    const barW = Math.max(1.5 * dpr, Math.min(3 * dpr, W / 260));

    ctx.fillStyle = color;
    for (const e of ev) {
      const mag = Math.abs(e.dy);
      if (!mag) continue;
      const x = ((e.t - t0) / span) * (W - barW * 2) + barW;
      const h = Math.max(1 * dpr, (mag / scaleMax) * usable);
      ctx.fillRect(x, base - h, barW, h);
    }

    // 基线用中性半透明色,深浅背景都可读
    ctx.fillStyle = 'rgba(128, 128, 128, 0.35)';
    ctx.fillRect(0, base, W, Math.max(1, dpr * 0.5));
  }, []);

  /** 共享标尺:纵轴取两台最大 |deltaY|,横轴取较长的时间跨度 —— 否则对比没有意义 */
  const redraw = useCallback(() => {
    let scaleMax = 1;
    let scaleSpan = 1;
    for (const kind of KINDS) {
      const ev = samples.current[kind];
      for (const e of ev) {
        const mag = Math.abs(e.dy);
        if (mag > scaleMax) scaleMax = mag;
      }
      if (ev.length > 1) {
        const s = ev[ev.length - 1].t - ev[0].t;
        if (s > scaleSpan) scaleSpan = s;
      }
    }
    KINDS.forEach((kind) => draw(kind, scaleMax, scaleSpan));
    setScale(scaleMax > 1 ? { max: scaleMax, span: scaleSpan } : null);
  }, [draw]);

  const finish = useCallback(
    (kind: Kind) => {
      timers.current[kind] = null;
      setLive((prev) => (prev === kind ? null : prev));
      setStats(
        (prev) =>
          ({ ...prev, [kind]: computeStats(samples.current[kind]) }) as Record<Kind, Stats | null>,
      );
      redraw();
    },
    [redraw],
  );

  const onWheel = useCallback(
    (kind: Kind, e: WheelEvent) => {
      e.preventDefault(); // 拦下滚动,页面本身不动

      if (timers.current[kind] === null) {
        // 新一轮录制
        samples.current[kind] = [];
        setStats((prev) => ({ ...prev, [kind]: null }) as Record<Kind, Stats | null>);
        setLive(kind);
      }

      samples.current[kind].push({ t: performance.now(), dy: e.deltaY });

      if (!sawWheel.current) {
        sawWheel.current = true;
        setNoWheel(false);
      }

      if (timers.current[kind] !== null) window.clearTimeout(timers.current[kind] as number);
      timers.current[kind] = window.setTimeout(() => finish(kind), IDLE_MS);

      redraw();
    },
    [finish, redraw],
  );

  // wheel 必须 non-passive 才能 preventDefault,React 的 onWheel 是 passive 的,所以手动绑
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    KINDS.forEach((kind) => {
      const el = catchers.current[kind];
      if (!el) return;
      const handler = (e: WheelEvent) => onWheel(kind, e);
      el.addEventListener('wheel', handler, { passive: false });
      cleanups.push(() => el.removeEventListener('wheel', handler));
    });
    return () => cleanups.forEach((fn) => fn());
  }, [onWheel]);

  const resize = useCallback(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    KINDS.forEach((kind) => {
      const canvas = canvases.current[kind];
      const box = catchers.current[kind];
      if (!canvas || !box) return;
      const rect = box.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    });
    redraw();
  }, [redraw]);

  // 用 ResizeObserver 而非 window.resize:采集台的宽度也会因为窗口以外的原因变化
  // (布局改动、侧栏折叠、字体加载),那些都不会触发 window 的 resize 事件,
  // 而 canvas 的位图尺寸是 JS 设的,不跟着 CSS 走 —— 脱节的结果就是曲线被拉伸。
  useEffect(() => {
    resize();
    const ro = new ResizeObserver(() => resize());
    KINDS.forEach((kind) => {
      const el = catchers.current[kind];
      if (el) ro.observe(el);
    });
    return () => ro.disconnect();
  }, [resize]);

  // 主题切换后重绘,否则曲线颜色停留在上一个主题
  useEffect(() => {
    const obs = new MutationObserver(() => redraw());
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, [redraw]);

  // 没有滚轮也没有触控板的设备:给一句明确说明,而不是让人对着空框发呆
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!sawWheel.current && !window.matchMedia('(hover: hover)').matches) setNoWheel(true);
    }, 5000);
    return () => window.clearTimeout(t);
  }, []);

  const reset = useCallback(() => {
    KINDS.forEach((kind) => {
      if (timers.current[kind] !== null) window.clearTimeout(timers.current[kind] as number);
      timers.current[kind] = null;
    });
    samples.current = emptySamples();
    setStats({ trackpad: null, wheel: null });
    setLive(null);
    redraw();
  }, [redraw]);

  /* ---------- 文案 ---------- */

  const LABELS: Record<Kind, { title: string; hint: string; cue: string }> = {
    trackpad: {
      title: translate({ id: 'scrollTest.pad.trackpad.title', message: 'Trackpad' }),
      hint: translate({
        id: 'scrollTest.pad.trackpad.hint',
        message: 'Two-finger scroll inside the box. Flick and let go so the inertia gets recorded too.',
      }),
      cue: translate({ id: 'scrollTest.pad.trackpad.cue', message: 'scroll here with two fingers' }),
    },
    wheel: {
      title: translate({ id: 'scrollTest.pad.wheel.title', message: 'Mouse wheel' }),
      hint: translate({
        id: 'scrollTest.pad.wheel.hint',
        message: 'Spin the wheel inside the box, about the same distance you just scrolled.',
      }),
      cue: translate({ id: 'scrollTest.pad.wheel.cue', message: 'scroll here with the wheel' }),
    },
  };

  const METRIC_LABELS = {
    distinct: translate({ id: 'scrollTest.metric.distinct', message: 'Distinct step sizes' }),
    count: translate({ id: 'scrollTest.metric.count', message: 'Events' }),
    rate: translate({ id: 'scrollTest.metric.rate', message: 'Events / second' }),
    median: translate({ id: 'scrollTest.metric.median', message: 'Median step' }),
    max: translate({ id: 'scrollTest.metric.max', message: 'Largest step' }),
    tail: translate({ id: 'scrollTest.metric.tail', message: 'Decaying tail' }),
  };

  const stateLabel = (kind: Kind): string => {
    if (live === kind) return translate({ id: 'scrollTest.state.recording', message: 'recording' });
    const s = stats[kind];
    if (s)
      return translate(
        { id: 'scrollTest.state.done', message: '{n} events' },
        { n: fmt(s.count) },
      );
    return translate({ id: 'scrollTest.state.waiting', message: 'waiting' });
  };

  const renderMetrics = (kind: Kind) => {
    const s = stats[kind];
    const rows: Array<[string, string, boolean]> = s
      ? [
          [METRIC_LABELS.distinct, fmt(s.distinct), true],
          [METRIC_LABELS.count, fmt(s.count), false],
          [METRIC_LABELS.rate, fmt(s.rate), false],
          [METRIC_LABELS.median, `${fmt(s.median, 1)} px`, false],
          [METRIC_LABELS.max, `${fmt(s.max, 1)} px`, false],
          [
            METRIC_LABELS.tail,
            s.tail > 1
              ? translate({ id: 'scrollTest.tail.events', message: '{n} events' }, { n: s.tail })
              : translate({ id: 'scrollTest.tail.none', message: 'none' }),
            false,
          ],
        ]
      : [
          [METRIC_LABELS.distinct, '—', true],
          [METRIC_LABELS.count, '—', false],
          [METRIC_LABELS.rate, '—', false],
          [METRIC_LABELS.median, '—', false],
          [METRIC_LABELS.max, '—', false],
          [METRIC_LABELS.tail, '—', false],
        ];

    return (
      <dl className={`${styles.metrics} ${s ? '' : styles.metricsEmpty}`}>
        {rows.map(([label, value, isKey]) => (
          <div key={label} className={`${styles.metric} ${isKey ? styles.metricKey : ''}`}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    );
  };

  /** 读数完全由实测数字驱动,不预设结论 */
  const renderReadout = () => {
    const a = stats.trackpad;
    const b = stats.wheel;
    if (!a && !b) return null;

    const num = (v: string | number) => <span className={styles.num}>{v}</span>;

    // 只录了一边
    if (!a || !b) {
      const s = (a ?? b) as Stats;
      const which = a
        ? translate({ id: 'scrollTest.only.trackpad', message: 'trackpad' })
        : translate({ id: 'scrollTest.only.wheel', message: 'mouse wheel' });
      return (
        <div className={styles.readout}>
          <h3>
            <Translate id="scrollTest.readout.one.title">One device recorded</Translate>
          </h3>
          <p>
            <Translate
              id="scrollTest.readout.one.body"
              values={{
                which,
                distinct: num(s.distinct),
                count: num(fmt(s.count)),
                median: num(`${fmt(s.median, 1)} px`),
              }}
            >
              {
                'Your {which} produced {distinct} distinct step sizes across {count} events, at a median of {median}. Record the other box to compare them on the same scale.'
              }
            </Translate>
          </p>
          {!a && (
            <p>
              <Translate id="scrollTest.readout.one.noTrackpad">
                No trackpad on this Mac? Then the panel on the right is everything macOS ever
                receives from your pointing device.
              </Translate>
            </p>
          )}
        </div>
      );
    }

    const ratio = a.distinct / Math.max(b.distinct, 1);

    return (
      <div className={styles.readout}>
        <h3>
          <Translate id="scrollTest.readout.both.title">Your two devices, compared</Translate>
        </h3>
        <p>
          <Translate
            id="scrollTest.readout.both.counts"
            values={{
              ad: num(a.distinct),
              ac: num(fmt(a.count)),
              bd: num(b.distinct),
              bc: num(fmt(b.count)),
            }}
          >
            {
              'Your trackpad produced {ad} distinct step sizes across {ac} events. Your wheel produced {bd} across {bc}.'
            }
          </Translate>
        </p>

        {ratio >= 4 && (
          <p>
            <Translate id="scrollTest.readout.wide">
              That is the gap you feel. The trackpad varies its step continuously, so macOS
              receives a signal it can follow frame by frame. The wheel sends a small set of fixed
              values, which leaves nothing to interpolate between — so the page moves in discrete
              jumps.
            </Translate>
          </p>
        )}
        {ratio >= 1.5 && ratio < 4 && (
          <p>
            <Translate id="scrollTest.readout.mild">
              The trackpad is the more granular of the two, though the difference here is milder
              than typical. Either your mouse reports high-resolution scrolling, or the wheel
              recording was short — try a longer spin.
            </Translate>
          </p>
        )}
        {ratio < 1.5 && (
          <p>
            <Translate id="scrollTest.readout.narrow">
              Unusually, your wheel is about as granular as your trackpad. That points to a
              high-resolution wheel, or to software already smoothing wheel input on this Mac.
            </Translate>
          </p>
        )}

        {a.tail > 1 && b.tail <= 1 && (
          <p>
            <Translate
              id="scrollTest.readout.inertia"
              values={{ n: num(a.tail) }}
            >
              {
                'The trackpad also kept sending {n} decaying events after your fingers left the surface — that trailing decay is the inertia. The wheel sent none: motion stops the instant the wheel does.'
              }
            </Translate>
          </p>
        )}
      </div>
    );
  };

  /* ---------- 渲染 ---------- */

  return (
    <div>
      {noWheel && (
        <div className={styles.noWheel}>
          <strong>
            <Translate id="scrollTest.noWheel.title">
              No scroll wheel or trackpad detected on this device.
            </Translate>
          </strong>{' '}
          <Translate id="scrollTest.noWheel.body">
            This page needs a physical wheel or a trackpad to measure. Open it on a Mac with a
            mouse connected.
          </Translate>
        </div>
      )}

      <div className={styles.rig}>
        {KINDS.map((kind) => {
          const s = stats[kind];
          const cls = [
            styles.pad,
            kind === 'trackpad' ? styles.padTrackpad : '',
            live === kind ? styles.padLive : s ? styles.padDone : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={kind} className={cls}>
              <div className={styles.padHead}>
                <h3>
                  <span
                    className={`${styles.swatch} ${
                      kind === 'trackpad' ? styles.swatchTrackpad : styles.swatchWheel
                    }`}
                    aria-hidden="true"
                  />
                  {LABELS[kind].title}
                </h3>
                <span className={styles.state}>{stateLabel(kind)}</span>
              </div>

              <p className={styles.hint}>{LABELS[kind].hint}</p>

              <div
                className={styles.catcher}
                ref={(el) => {
                  catchers.current[kind] = el;
                }}
                role="img"
                aria-label={LABELS[kind].hint}
              >
                <canvas
                  height={CANVAS_H}
                  ref={(el) => {
                    canvases.current[kind] = el;
                  }}
                />
                {!s && live !== kind && <span className={styles.cue}>{LABELS[kind].cue}</span>}
              </div>

              {renderMetrics(kind)}
            </div>
          );
        })}
      </div>

      <div className={styles.bar}>
        <button type="button" className="lx-btn lx-btn-ghost" onClick={reset}>
          <Translate id="scrollTest.reset">Clear both</Translate>
        </button>
        <span className={styles.scaleNote}>
          {scale ? (
            <Translate
              id="scrollTest.scale.set"
              values={{ px: fmt(scale.max), s: (scale.span / 1000).toFixed(1) }}
            >
              {'Shared scale — vertical {px} px max, horizontal {s} s'}
            </Translate>
          ) : (
            <Translate id="scrollTest.scale.idle">
              Shared vertical scale — set by the larger of the two recordings
            </Translate>
          )}
        </span>
      </div>

      {renderReadout()}
    </div>
  );
}
