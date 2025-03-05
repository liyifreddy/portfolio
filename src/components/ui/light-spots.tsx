"use client";

import React from "react";

const LightSpots: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* 光斑 1 - 左上 */}
      <div 
        className="absolute rounded-full animate-float-slow animate-glow"
        style={{
          left: "10%",
          top: "20%",
          width: "18rem",
          height: "18rem",
          background: "radial-gradient(circle, #C19A49 0%, rgba(15, 15, 24, 0) 70%)",
          filter: "blur(40px)",
          opacity: 0.15,
        }}
      />
      
      {/* 光斑 2 - 右上 */}
      <div 
        className="absolute rounded-full animate-float-medium animate-glow"
        style={{
          right: "15%",
          top: "30%",
          width: "22rem",
          height: "22rem",
          background: "radial-gradient(circle, #B08642 0%, rgba(15, 15, 24, 0) 70%)",
          filter: "blur(40px)",
          opacity: 0.12,
          animationDelay: "2s",
        }}
      />
      
      {/* 光斑 3 - 左下 */}
      <div 
        className="absolute rounded-full animate-float-medium animate-pulse-slow"
        style={{
          left: "25%",
          bottom: "20%",
          width: "20rem",
          height: "20rem",
          background: "radial-gradient(circle, #D2A554 0%, rgba(15, 15, 24, 0) 70%)",
          filter: "blur(40px)",
          opacity: 0.12,
          animationDelay: "1s",
        }}
      />
      
      {/* 光斑 4 - 右下 */}
      <div 
        className="absolute rounded-full animate-float-fast"
        style={{
          right: "20%",
          bottom: "15%",
          width: "15rem",
          height: "15rem",
          background: "radial-gradient(circle, #B7873D 0%, rgba(15, 15, 24, 0) 70%)",
          filter: "blur(35px)",
          opacity: 0.13,
          animationDelay: "3s",
        }}
      />
    </div>
  );
};

export default LightSpots;