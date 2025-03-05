"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const ParallaxSeparator: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current || !containerRef.current) return;
      
      // 获取容器在视口中的位置
      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 计算元素在视口中的位置 (0 = 顶部, 1 = 底部)
      const viewportPosition = 1 - (containerRect.top / windowHeight);
      
      // 根据元素在视口中的位置计算视差位移
      // 这样图片会随着视口位置变化而移动，但移动距离有限
      // 减小位移量到±30px，让效果更加微妙
      const translateY = Math.min(30, Math.max(-30, (viewportPosition - 0.8) * 80));
      
      // 应用位移
      imageRef.current.style.transform = `translateY(${translateY}px)`;
    };
    
    // 初始运行一次确保正确位置
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[12vh] sm:h-[15vh] md:h-[18vh] lg:h-[22vh] overflow-hidden"
    >
      {/* 图片容器 - 略微减少填充空间，因为新图片比例更合适 */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-[150%] top-[-25%] will-change-transform"
      >
        <Image
          src="/table.png" 
          alt="Separator"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>
      
      {/* 渐变遮罩 - 保持透明度低 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F18]/10 to-[#0F0F18]/10 z-10"></div>
    </div>
  );
};

export default ParallaxSeparator;