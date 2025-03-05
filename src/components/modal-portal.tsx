"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * ModalPortal组件 - 专门为Next.js App Router设计的模态窗口Portal
 * 解决层叠上下文问题，确保模态窗口总是渲染在body级别
 */
export const ModalPortal = ({ 
  children, 
  isOpen,
  onClose
}: { 
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // 只在客户端挂载
  useEffect(() => {
    setMounted(true);
    
    // 锁定body滚动
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 处理点击背景关闭
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (onClose && e.target === overlayRef.current) {
      onClose();
    }
  };

  // 处理ESC键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && onClose && e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 在服务器端或模态框关闭时不渲染
  if (!mounted || !isOpen) return null;

  // 使用createPortal确保内容挂载到document.body
  return createPortal(
    <div 
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        top: 2,
        left: 2,
        right: 2,
        bottom: 2,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start", // 改为顶部对齐而不是居中
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 999999,
        overflowY: "auto",
        padding: "80px 0 40px 0", // 增加顶部内边距，确保内容不会贴顶
      }}
    >
      {children}
    </div>,
    document.body
  );
};

export default ModalPortal;