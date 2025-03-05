"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [hovering, setHovering] = useState(false);

  // 保留核心切换动画逻辑
  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  return (
    <>
      {/* 保留原有的按钮切换动画 */}
      <div
        className={cn(
          "flex flex-row items-center justify-center relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => moveSelectedTabToTop(idx)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full",
                  activeTabClassName
                )}
              />
            )}
            <span className="relative block text-white">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* 优化后的内容区域 */}
      <div className="relative w-full">
        <AnimatePresence mode="popLayout">
          {tabs.map(
            (tab, idx) =>
              idx === 0 && ( // 关键修改：只渲染当前激活项
                <motion.div
                  key={tab.value}
                  layout  // 保留布局动画
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className={cn("w-full", contentClassName)}
                  style={{
                    position: "relative", // 确保正常文档流
                    zIndex: 1,
                  }}
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </>
  );
};