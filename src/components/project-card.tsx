"use client";

import React, { useState, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import { MagicCard } from "@/components/magicui/magic-card";
import ModalPortal from "@/components/modal-portal";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Card } from "@/components/ui/card";

// 项目类型定义
export type Project = {
  id: string;
  title: string;
  organization: string;
  timeframe: string;
  supervisor?: string;
  description: string;
  highlights: string[];
  skills: string[];
  image: string;
  category: "corporate" | "research" | "social";
  content: React.ReactNode; // 详细内容
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 处理模态框外部点击关闭
  useOutsideClick(modalRef, () => {
    if (isOpen) setIsOpen(false);
  });

  // 关闭模态框
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 项目卡片 - 使用MagicCard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.1,
            ease: "easeOut",
          },
        }}
        className="w-full cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Card className="border-0 overflow-hidden">
          <MagicCard
            className="h-full rounded-xl overflow-hidden bg-background"
            gradientFrom="#C19A49"  // 金色
            gradientTo="#B08642"    // 暗金色
            gradientColor="#FED5A6" // 浅金色悬停效果
            gradientOpacity={0.3}   // 适当降低透明度
            gradientSize={150}
          >
            <div className="relative z-10 bg-[#161006]/90">
            <div className="flex flex-col h-full">
              {/* 上半部分是图片 */}
              <div className="w-full h-48 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* 下半部分是内容 */}
              <div className="p-5 flex-grow">
                {/* 标题 */}
                <h3 className="text-xl font-bold text-white mb-1">
                  {project.title}
                </h3>

                {/* 副标题与时间 */}
                <p className="text-sm text-gray-300 mb-3">
                  {project.organization} • {project.timeframe}
                  {project.supervisor && <> | {project.supervisor}</>}
                </p>

                {/* 简短描述 */}
                <p className="text-sm text-gray-200 mb-4 flex-grow">
                  {project.description}
                </p>

                {/* 技术标签 */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.skills.slice(0, 20).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-[#C19A49]/30 text-[#FED5A6]"
                    >
                      #{skill}
                    </span>
                  ))}
                  {project.skills.length > 20 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-[#C19A49]/30 text-[#FED5A6]">
                      +{project.skills.length - 20}
                    </span>
                  )}
                </div>
              </div>
            </div>
            </div>
          </MagicCard>
        </Card>
      </motion.div>

      {/* 使用ModalPortal确保模态框挂载到body */}
      <ModalPortal isOpen={isOpen} onClose={handleClose}>
        <div
          ref={modalRef}
          className="w-[90%] max-w-6xl bg-[#f9f8f6] rounded-3xl p-4 md:p-8 relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <button
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f5f2eb] flex items-center justify-center border-0 cursor-pointer z-10 hover:bg-[#C19A49]/30 transition-colors"
            onClick={handleClose}
          >
            <IconX className="w-5 h-5 text-[#865C30]" />
          </button>

          {/* 项目标题 */}
          <div className="py-6">
            <h3 className="text-xl md:text-4xl font-bold text-[#614315] mb-2">
              {project.title}
            </h3>
            <p className="text-[#816334]">
              {project.organization} • {project.timeframe}
              {project.supervisor && (
                <> | Supervised by {project.supervisor}</>
              )}
            </p>
          </div>
          
          {/* 项目图片 - 调整宽度 */}
          <div className="max-w-3xl mx-auto mb-6 rounded-xl overflow-hidden">
            <img
              src={project.image || "/project-placeholder.jpg"}
              alt={project.title}
              className="w-full h-auto block"
            />
          </div>

          {/* 内容部分 - 添加框 */}
          <div className="bg-[#f5f2eb] rounded-xl p-4 md:p-6 mb-6 text-[#333333] shadow-sm">
            {project.content}
          </div>

          {/* 技能标签部分 */}
          <div className="mt-8 pt-4 border-t border-[#C19A49]/30">
            <h4 className="text-lg text-[#534021] font-medium mb-3">
              Skills & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-sm px-3 py-1 rounded-full bg-[#C19A49]/20 text-[#816334]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ModalPortal>
    </>
  );
};

export default ProjectCard;