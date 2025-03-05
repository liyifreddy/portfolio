"use client";

import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

// 定义logo对象结构
interface Logo {
  name: string;
  id: number;
  src: string;
}

// 图像缓存管理
const imageCache = new Set<string>();

// 全局预加载所有图像，只执行一次
const preloadImages = (images: string[]) => {
  images.forEach(src => {
    if (!imageCache.has(src)) {
      const img = new window.Image(); // 使用 window.Image 而不是 Image
      img.src = src;
      imageCache.add(src);
    }
  });
};

// 随机打乱数组函数
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 将logo分配到多列中
const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const shuffled = shuffleArray(allLogos);
  const columns: Logo[][] = Array.from({ length: columnCount }, () => []);

  // 将logo均匀分配到各列
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });

  // 确保所有列的长度相同
  const maxLength = Math.max(...columns.map((col) => col.length));
  columns.forEach((col) => {
    while (col.length < maxLength) {
      // 使用已有的logo填充短列
      const randomLogo = shuffled[Math.floor(Math.random() * shuffled.length)];
      col.push(randomLogo);
    }
  });

  return columns;
};

// 简化后的LogoColumn组件props
interface LogoColumnProps {
  logos: Logo[];
  index: number;
  currentTime: number;
  speed: "slow" | "medium" | "fast" | "slower";
}

// 优化的LogoColumn组件
const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime, speed }) => {
    // 速度映射
    const speedMap = {
      slower: 3000,
      slow: 2500,
      medium: 2000,
      fast: 1500,
    };
    const cycleInterval = speedMap[speed] || 2500;
    const columnDelay = index * 200;

    // 计算当前logo索引 - 移到memo中以减少计算开销
    const { currentIndex, currentLogo } = useMemo(() => {
      const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length);
      const index = Math.floor(adjustedTime / cycleInterval);
      return { 
        currentIndex: index,
        currentLogo: logos[index]
      };
    }, [currentTime, columnDelay, cycleInterval, logos]);

    // 使用稳定的key，不再包含索引以避免重新渲染
    const stableKey = useMemo(() => `logo-${currentLogo.id}`, [currentLogo.id]);

    return (
      <motion.div
        className="w-16 h-16 md:w-20 md:h-20 overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stableKey}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            exit={{
              y: -10,
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: "easeIn",
              },
            }}
          >
            <Image
              src={currentLogo.src}
              alt={currentLogo.name}
              width={48}
              height={48}
              className="object-contain w-16 h-16 md:w-25 md:h-25"
              priority={true}
              loading="eager"
              // 使用简单的图像优化属性减轻大文件造成的压力
              quality={75}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  },
  // 优化的比较函数，显著减少不必要的重渲染
  (prevProps, nextProps) => {
    // 计算当前索引
    const getIndex = (time: number, index: number, speed: string, logosLength: number) => {
      const cycleInterval = {
        slower: 3000,
        slow: 2500,
        medium: 2000,
        fast: 1500,
      }[speed] || 2500;
      
      const columnDelay = index * 200;
      const adjustedTime = (time + columnDelay) % (cycleInterval * logosLength);
      return Math.floor(adjustedTime / cycleInterval);
    };
    
    const prevIndex = getIndex(
      prevProps.currentTime, 
      prevProps.index, 
      prevProps.speed, 
      prevProps.logos.length
    );
    
    const nextIndex = getIndex(
      nextProps.currentTime, 
      nextProps.index, 
      nextProps.speed, 
      nextProps.logos.length
    );
    
    // 只有当索引变化时才重新渲染
    return (
      prevIndex === nextIndex && 
      prevProps.logos === nextProps.logos
    );
  }
);

// ModifiedLogoCarousel组件的props
interface ModifiedLogoCarouselProps {
  columnCount?: number;
  speed?: "slow" | "medium" | "fast" | "slower";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  logos: { name: string; logo: string }[];
  seed?: number;
}

// 优化的requestAnimationFrame hook
function useAnimationFrameThrottled(callback: () => void, fps = 10, isPaused = false) {
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const frameInterval = 1000 / fps; // 例如100ms间隔对应10fps

  useEffect(() => {
    if (isPaused) return;

    const animate = (time: number) => {
      if (previousTimeRef.current === 0) {
        previousTimeRef.current = time;
      }

      const deltaTime = time - previousTimeRef.current;
      
      if (deltaTime > frameInterval) {
        previousTimeRef.current = time;
        callback();
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [callback, fps, isPaused]);
}

// 主LogoCarousel组件
function ModifiedLogoCarousel({
  columnCount = 3,
  speed = "slow",
  direction = "left",
  pauseOnHover = true,
  logos = [],
  seed = 1,
}: ModifiedLogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // 转换传入的logos到我们需要的格式
  const allLogos: Logo[] = useMemo(
    () => logos.map((tech, index) => ({
        name: tech.name,
        id: seed * 100 + index + 1,
        src: tech.logo,
      })),
    [logos, seed]
  );

  // 组件初始化时预加载所有图像
  useEffect(() => {
    if (allLogos.length > 0) {
      // 提取所有图像URL并预加载
      const allSrcs = allLogos.map(logo => logo.src);
      preloadImages(allSrcs);
    }
  }, [allLogos]);

  // 分配logo到各列中
  useEffect(() => {
    if (allLogos.length > 0) {
      // 使用固定的随机种子确保一致性
      const savedRandom = Math.random;
      
      // 使用种子生成一致的随机序列
      Math.random = () => {
        const x = Math.sin(seed * 9999) * 10000;
        return x - Math.floor(x);
      };

      const distributedLogos = distributeLogos(allLogos, columnCount);
      
      // 恢复原始随机函数
      Math.random = savedRandom;
      
      setLogoSets(distributedLogos);
    }
  }, [allLogos, columnCount, seed]);

  // 简化的时间更新函数，每次增加固定值
  const updateTime = useCallback(() => {
    if (!isPaused) {
      setCurrentTime(time => time + 100);
    }
  }, [isPaused]);

  // 使用节流的动画帧更新，降低GPU/CPU压力
  useAnimationFrameThrottled(updateTime, 10, isPaused);

  // 无logo则返回null
  if (allLogos.length === 0) {
    return null;
  }

  // 渲染logo列
  return (
    <div
      className="flex justify-center space-x-6 md:space-x-8"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={`column-${index}`}
          logos={direction === "left" ? logos : [...logos].reverse()}
          index={index}
          currentTime={currentTime}
          speed={speed}
        />
      ))}
    </div>
  );
}

export default ModifiedLogoCarousel;