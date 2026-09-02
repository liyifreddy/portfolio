import { ReactNode } from 'react';

interface LazyMotionComponentProps {
  children: ReactNode;
  /** @deprecated 不再使用，保留以兼容既有调用点 */
  placeholder?: ReactNode;
  /** @deprecated 不再使用，保留以兼容既有调用点 */
  height?: string | number;
}

/**
 * 这个组件原来用 IntersectionObserver 把 children 挡在首屏之外（isVisible 初始为
 * false，只有滚动到视口才渲染）。副作用是：About / Projects / Journey / Skills
 * 四屏的正文完全不出现在服务端渲染的 HTML 里 —— 爬虫和 LinkedIn/Slack 的预览
 * 抓取器都读不到，这个站最值钱的内容对搜索引擎等于不存在。
 *
 * 现在直接透传 children。原来那层懒加载的收益已经由别处覆盖：
 *   - 第 5 屏的可视化组件在 page.tsx 里用 next/dynamic + ssr:false 懒加载；
 *   - FlickeringGrid 自带 IntersectionObserver，离开视口就停 rAF；
 *   - 各处入场动画用的是 whileInView，本来就只在进入视口时才跑。
 */
export const LazyMotionComponent = ({ children }: LazyMotionComponentProps) => {
  return <div>{children}</div>;
};

export default LazyMotionComponent;
