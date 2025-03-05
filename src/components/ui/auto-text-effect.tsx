"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const AutoTextEffect = ({
  text,
}: {
  text: string;
}) => {
  const [position, setPosition] = useState({ cx: "50%", cy: "50%" });
  const direction = useRef(1);
  
// 自动动画效果 - 修改为随机扫动效果
useEffect(() => {
    const interval = setInterval(() => {
      // 创建随机位置
      const newX = 20 + Math.random() * 60; // 20%-80%范围内
      const newY = 20 + Math.random() * 60; // 20%-80%范围内
      
      setPosition({ cx: `${newX}%`, cy: `${newY}%` });
    }, 1000); // 每3秒变换一次位置
    
    return () => clearInterval(interval);
  }, []); // 移除position依赖，避免频繁重新创建interval

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 140"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      <defs>
        <linearGradient
          id="textGradientAuto"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFF62E" />
          <stop offset="25%" stopColor="#DD362F" />
          <stop offset="75%" stopColor="#FFF62E" />
          <stop offset="100%" stopColor="#DD362F" />
        </linearGradient>

        <motion.radialGradient
          cx="50%" cy="50%" 
          id="revealMaskAuto"
          gradientUnits="userSpaceOnUse"
          r="25%"
          animate={position}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        
        <mask id="textMaskAuto">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMaskAuto)"
          />
        </mask>
      </defs>
      
      {/* 基础轮廓文字 - 添加动画使其跟随描边动画一起出现 */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2"
        className="font-extrabold stroke-black fill-transparent text-9xl font-[helvetica]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ 
          duration: 1,
          ease: "easeInOut",
          delay: 4 // 在描边动画接近完成时出现
        }}
      >
        {text}
      </motion.text>
      
      {/* 首次加载时的描边动画 */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="2"
        className="font-extrabold fill-transparent text-9xl stroke-black font-[helvetica]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
          opacity: 0.6
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          delay: 1
        }}
      >
        {text}
      </motion.text>
      
      {/* 渐变效果文字 - 自动循环，也添加动画使其逐渐显现 */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradientAuto)"
        strokeWidth="2"
        mask="url(#textMaskAuto)"
        className="font-extrabold fill-transparent text-9xl font-[helvetica]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 2,
          ease: "easeInOut",
          delay: 1 // 与基础轮廓文字同时显示
        }}
      >
        {text}
      </motion.text>
    </svg>
  );
};