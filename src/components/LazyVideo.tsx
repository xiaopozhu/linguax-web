import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';

type LazyVideoProps = Omit<ComponentPropsWithoutRef<'video'>, 'src'> & {
  src: string;
  // 距离视口多远就开始加载，默认 300px，用于让视频进视口时已经能立刻播
  rootMargin?: string;
};

// 首屏 3 个演示视频都在 hero 下方，直接 autoPlay 会让浏览器立刻并发拉全量 mp4，
// 抢字体 / hydration / hero 图的带宽。这里在进视口前不挂 src，让 <video> 空转，
// IntersectionObserver 触发后再赋 src，浏览器随即开始加载并 autoPlay。
export default function LazyVideo({
  src,
  rootMargin = '300px',
  preload = 'metadata',
  ...rest
}: LazyVideoProps): ReactNode {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 老浏览器 / SSR 兜底：没有 IO 就直接加载
    if (typeof IntersectionObserver === 'undefined') {
      el.src = src;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.src = src;
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, rootMargin]);

  return <video ref={ref} preload={preload} {...rest} />;
}
