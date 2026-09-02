"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import ModifiedLogoCarousel from "@/components/ui/tech-logo-carousel";
import {
  IconDeviceAnalytics,
  IconPalette,
  IconBulb,
  IconFlask,
  IconEye,
  IconRobot,
  IconHeartbeat,
  IconBuildingFactory,
  IconStar,
} from "@tabler/icons-react";

// Tech Logo Grid Component using LogoCarousel
export const TechLogoGrid = () => {
  // Define all technologies with their logos
  const technologies = [
    { name: "PyTorch", logo: "/logos/pytorch.webp" },
    { name: "Python", logo: "/logos/python.webp" },
    { name: "AWS", logo: "/logos/aws.webp" },
    { name: "Blender", logo: "/logos/blender.webp" },
    { name: "ComfyUI", logo: "/logos/comfyui.webp" },
    { name: "CUDA", logo: "/logos/cuda.webp" },
    { name: "Docker", logo: "/logos/docker.webp" },
    { name: "FastAPI", logo: "/logos/fastapi.webp" },
    { name: "Figma", logo: "/logos/figma.webp" },
    { name: "GitHub", logo: "/logos/github.webp" },
    { name: "Hugging Face", logo: "/logos/hugging-face.webp" },
    { name: "JavaScript", logo: "/logos/javascript.webp" },
    { name: "Jupyter", logo: "/logos/jupyter.webp" },
    { name: "Next.js", logo: "/logos/nextjs.webp" },
    { name: "NumPy", logo: "/logos/numpy.webp" },
    { name: "OpenCV", logo: "/logos/opencv.webp" },
    { name: "Pandas", logo: "/logos/pandas.webp" },
    { name: "Photoshop", logo: "/logos/photoshop.webp" },
    { name: "Pillow", logo: "/logos/pillow.webp" },
    { name: "React", logo: "/logos/react.webp" },
    { name: "Scikit-learn", logo: "/logos/scikit-learn.webp" },
    { name: "SQL", logo: "/logos/sql.webp" },
    { name: "SQLite", logo: "/logos/sqlite.webp" },
    { name: "Streamlit", logo: "/logos/streamlit.webp" },
    { name: "Tailwind CSS", logo: "/logos/tailwindcss.webp" },
    { name: "Tortoise", logo: "/logos/tortoise.webp" },
    { name: "Ubuntu", logo: "/logos/ubuntu.webp" },
    { name: "Vue.js", logo: "/logos/vuejs.webp" },
    { name: "Vuetify", logo: "/logos/vuetify.webp" },
    { name: "SLURM", logo: "/logos/slurm.webp" },
  ];

  // Divide technologies into three equal groups
  const firstRowLogos = technologies.slice(0, 10);
  const secondRowLogos = technologies.slice(10, 20);
  const thirdRowLogos = technologies.slice(20);

  return (
    <div className="h-full w-full bg-white/5 backdrop-blur-sm rounded-lg flex flex-col justify-center py-2 mb-4">
      <div className="flex-grow flex flex-col justify-center space-y-2">
        <div>
          <ModifiedLogoCarousel
            columnCount={5}
            logos={firstRowLogos}
            speed="slow"
            direction="left"
            pauseOnHover={true}
            seed={1} // Consistent seed for predictable shuffling
          />
        </div>

        <div>
          <ModifiedLogoCarousel
            columnCount={5}
            logos={secondRowLogos}
            speed="slow" // Keep same speed for consistency
            direction="right"
            pauseOnHover={true}
            seed={2} // Different but consistent seed
          />
        </div>

        <div>
          <ModifiedLogoCarousel
            columnCount={5}
            logos={thirdRowLogos}
            speed="slow" // Keep same speed for consistency
            direction="left"
            pauseOnHover={true}
            seed={3} // Different but consistent seed
          />
        </div>
      </div>
    </div>
  );
};

// Data Science Pie Chart Component (Tailwind-based)
export const DataSciencePieChart = () => {
  const dataScienceSkills = [
    { name: "Processing", value: 20, color: "#A67C3D" },
    { name: "Algorithms", value: 25, color: "#B08642" },
    { name: "Visualization", value: 20, color: "#C19A49" },
    { name: "Analysis", value: 15, color: "#D2A554" },
    { name: "Engineering", value: 20, color: "#D7B672" },
  ];

  return (
    <div className="h-full w-full p-4 mt-12 flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="flex items-center">
          {/* 饼图区域 */}
          <div className="relative w-32 h-32 md:w-36 md:h-36">
            {/* 外部圆环 */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>

            {/* 分段 */}
            {dataScienceSkills.map((skill, index) => {
              const rotation =
                index === 0
                  ? 0
                  : dataScienceSkills
                      .slice(0, index)
                      .reduce((sum, item) => sum + item.value, 0) * 3.6;

              const segment = skill.value * 3.6; // 360度 / 100 * 值

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="absolute inset-0"
                  style={{
                    background: `conic-gradient(${skill.color} ${segment}deg, transparent 0 360deg)`,
                    transform: `rotate(${rotation}deg)`,
                    borderRadius: "50%",
                  }}
                />
              );
            })}

            {/* 内圆 */}
            <div className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center">
              <span className="text-sm text-gray-700 font-medium text-center">
                Data
                <br />
                Science
              </span>
            </div>
          </div>

          {/* 图例区域 - 改为垂直排列在饼图右侧 */}
          <div className="flex flex-col ml-4 gap-2">
            {dataScienceSkills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <div
                  className="w-3 h-3 mr-2 rounded-sm"
                  style={{ backgroundColor: skill.color }}
                ></div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-700 font-medium">
                    {skill.name}
                  </span>
                  <span className="text-xs text-gray-500">{skill.value}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ProjectComplexityImpactMatrix
export const ProjectComplexityImpactMatrix = () => {
  type Project = {
    name: string;
    complexity: number;
    impact: number;
    time: number;
    category: string;
  };

  // 重新分类项目
  const projects: Project[] = [
    // Productivity
    {
      name: "Pharma Process Optimization",
      complexity: 85,
      impact: 95,
      time: 24,
      category: "Productivity",
    },
    {
      name: "Data Analysis Dashboard",
      complexity: 50,
      impact: 70,
      time: 8,
      category: "Productivity",
    },
    {
      name: "Lab Equipment System",
      complexity: 65,
      impact: 88,
      time: 12,
      category: "Productivity",
    },
    {
      name: "Wellness Industry Apps",
      complexity: 65,
      impact: 75,
      time: 18,
      category: "Productivity",
    },

    // Healthcare
    {
      name: "Medical Image Segmentation",
      complexity: 80,
      impact: 75,
      time: 18,
      category: "Healthcare",
    },
    {
      name: "Endoscopy OOD Detection",
      complexity: 75,
      impact: 68,
      time: 10,
      category: "Healthcare",
    },

    // AI
    {
      name: "Synthetic Data Generation",
      complexity: 78,
      impact: 65,
      time: 14,
      category: "AI",
    },
    {
      name: "Voice-Interactive LLM",
      complexity: 70,
      impact: 75,
      time: 14,
      category: "AI",
    },
    {
      name: "Semantic Segmentation",
      complexity: 88,
      impact: 72,
      time: 20,
      category: "AI",
    },
    {
      name: "6D Pose Estimation",
      complexity: 90,
      impact: 60,
      time: 16,
      category: "AI",
    },
    {
      name: "SQuARE - QA Explainability",
      complexity: 73,
      impact: 85,
      time: 12,
      category: "AI",
    },

    // UX
    {
      name: "Human-Centered AI Tool",
      complexity: 60,
      impact: 82,
      time: 10,
      category: "UX",
    },
    {
      name: "AR Safety Interface",
      complexity: 72,
      impact: 78,
      time: 13,
      category: "UX",
    },
    {
      name: "E-ScootAR Warnings",
      complexity: 68,
      impact: 80,
      time: 15,
      category: "UX",
    },
    {
      name: "Infinitas Comedy Club",
      complexity: 40,
      impact: 90,
      time: 30,
      category: "UX",
    },
  ];

  // 分类颜色 - 简化为4个类别
  const categoryColors: Record<string, string> = {
    Productivity: "#B08642",
    Healthcare: "#D7B672",
    AI: "#D2A554",
    UX: "#BF9146",
  };

  return (
    <div className="h-full w-full p-4 flex flex-col mt-10">
      <div className="flex-grow flex flex-col">
        {/* 矩阵容器 - 响应式 */}
        <div
          className="relative w-full flex-grow"
          style={{ aspectRatio: "3/1" }}
        >
          {/* 背景线和象限 */}
          <div className="absolute inset-0 border border-gray-200 rounded-lg overflow-hidden">
            {/* 水平分隔线 - 带有渐变色 */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"></div>

            {/* 垂直分隔线 - 带有渐变色 */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300"></div>

            {/* 象限背景 - 轻微的背景色，增加区分度 */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gray-50/50"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gray-100/50"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gray-100/50"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gray-50/50"></div>
          </div>

          {/* 象限标签 */}
          <div className="absolute top-2 left-[calc(50%-2rem)] text-xs font-medium text-gray-500">
            High
          </div>
          <div className="absolute bottom-2 left-[calc(50%-2rem)] text-xs font-medium text-gray-500">
            Low Impact
          </div>

          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-500">
            Low
            <br />
            Complexity
          </div>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-500">
            High
            <br />
          </div>

          {/* 项目点 */}
          {projects.map((project, index) => {
            // 计算位置 (百分比布局，确保响应式)
            const xPos = `${project.complexity}%`;
            const yPos = `${100 - project.impact}%`;

            // 根据time计算大小
            const size = 24 + (project.time / 30) * 12;

            return (
              <motion.div
                key={project.name}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="absolute cursor-pointer group"
                style={{
                  left: xPos,
                  top: yPos,
                  width: size,
                  height: size,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: categoryColors[project.category] }}
                >
                  <span className="text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </div>

                {/* 悬停提示框 */}
                <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-[#BF9146] text-white text-xs px-2 py-1.5 rounded shadow-lg">
                    <p className="font-bold">{project.name}</p>
                    <div className="flex space-x-2 mt-0.5">
                      <span>Complexity: {project.complexity}%</span>
                      <span>Impact: {project.impact}%</span>
                    </div>
                    <p className="mt-0.5">
                      Category:{" "}
                      <span style={{ color: categoryColors[project.category] }}>
                        {project.category}
                      </span>
                    </p>
                  </div>
                  {/* 提示框小三角 */}
                  <div className="border-t-8 border-t-[#a77d3b] border-l-8 border-l-transparent border-r-8 border-r-transparent h-0 w-0 mx-auto -mb-2"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// NEW COMPONENT: AI Research Heatmap
export const AIResearchHeatmap = () => {
  type ResearchArea = {
    name: string;
    focus: number;
  };

  // 简化研究领域列表
  const researchAreas: ResearchArea[] = [
    { name: "Computer Vision", focus: 90 },
    { name: "Generative AI", focus: 85 },
    { name: "Medical AI", focus: 80 },
    { name: "6D Pose Est.", focus: 95 },
    { name: "Diffusion Models", focus: 85 },
    { name: "Model Explainability", focus: 75 },
    { name: "Industrial AI", focus: 90 },
    { name: "Synthetic Data", focus: 80 },
  ];

  // 获取热力图颜色
  const getHeatColor = (value: number): string => {
    if (value >= 90) return "#B08642";
    if (value >= 85) return "#C19A49";
    if (value >= 80) return "#D2A554";
    if (value >= 70) return "#D7B672";
    return "#E5CFB6";
  };

  // 获取图标
  const getIcon = (name: string) => {
    switch (name) {
      case "Computer Vision":
        return <IconEye size={18} className="text-gray-800" />;
      case "Generative AI":
        return <IconPalette size={18} className="text-gray-800" />;
      case "Medical AI":
        return <IconHeartbeat size={18} className="text-gray-800" />;
      case "6D Pose Est.":
        return <IconDeviceAnalytics size={18} className="text-gray-800" />;
      case "Diffusion Models":
        return <IconFlask size={18} className="text-gray-800" />;
      case "Model Explainability":
        return <IconBulb size={18} className="text-gray-800" />;
      case "Industrial AI":
        return <IconBuildingFactory size={18} className="text-gray-800" />;
      case "Synthetic Data":
        return <IconRobot size={18} className="text-gray-800" />;
      default:
        return <IconStar size={18} className="text-gray-800" />;
    }
  };

  return (
    <div className="h-full w-full rounded-lg p-4 flex flex-col">
      <div className="flex-grow grid grid-cols-4 gap-2">
        {researchAreas.map((area, index) => (
          <motion.div
            key={area.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative rounded-md overflow-hidden h-full"
            style={{
              background: `linear-gradient(to bottom, ${getHeatColor(
                area.focus
              )}, ${getHeatColor(area.focus - 10)})`,
            }}
          >
            {/* 热力图指示条 */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800/10"></div>
            <div
              className="absolute bottom-0 left-0 h-1.5 bg-gray-800/30"
              style={{ width: `${area.focus}%` }}
            ></div>

            <div className="p-2 flex flex-col items-center justify-center h-full">
              <div className="mb-1">{getIcon(area.name)}</div>
              <p className="text-center text-[10px] font-semibold text-gray-800 mb-1 leading-tight">
                {area.name}
              </p>
              <div className="bg-white/50 rounded-full px-2 py-0.5 text-[9px] font-bold text-gray-800">
                {area.focus}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 热力图图例 */}
      <div className="mt-3 flex items-center justify-center">
        <div className="flex items-center text-[10px] text-gray-600">
          <span>Focus Intensity:</span>
          <div className="flex h-2 mx-2">
            {[70, 80, 85, 90, 95].map((value) => (
              <div
                key={value}
                className="w-6 h-full"
                style={{ backgroundColor: getHeatColor(value) }}
              ></div>
            ))}
          </div>
          <div className="flex space-x-6">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// NEW COMPONENT: AI Research Focus Areas
export const AIResearchFocus = () => {
  // 研究领域数据，保留 focus 用于颜色深浅和大小变化
  const researchAreas = [
    { name: "Computer Vision", focus: 90 },
    { name: "Multimodal", focus: 87 },
    { name: "Generative AI", focus: 85 },
    { name: "Medical AI", focus: 80 },
    { name: "Pose Estimation", focus: 95 },
    { name: "Robotics", focus: 79 },
    { name: "Diffusion Models", focus: 85 },
    { name: "AI4Science", focus: 80 },
    { name: "XAI", focus: 75 },
    { name: "Industrial AI", focus: 90 },
    { name: "LLMs", focus: 88 },
    { name: "Object Centric", focus: 87 },
    { name: "Optimization", focus: 76 },
  ];

  // 获取颜色 - 使用金色调色板，注意不再需要向用户显示具体数值
  const getBadgeColor = (value: number) => {
    if (value >= 90) return "#B08642";
    if (value >= 85) return "#C19A49";
    if (value >= 80) return "#D2A554";
    if (value >= 75) return "#D7B672";
    return "#E5CFB6";
  };

  // 根据 focus 值获取徽章尺寸
  const getBadgeSize = (value: number) => {
    if (value >= 90) return "scale-110";
    if (value >= 85) return "scale-105";
    if (value >= 80) return "scale-100";
    if (value >= 75) return "scale-95";
    return "scale-90";
  };

  // 随机布局的状态
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="w-full h-full p-4 relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex flex-wrap gap-2">
        {researchAreas.map((area, index) => (
          <motion.div
            key={area.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: isHovering ? Math.sin(index * 0.5) * 10 : 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              y: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: { duration: 0.2 },
            }}
            className={`${getBadgeSize(
              area.focus
            )} rounded-full py-2 px-4 cursor-pointer`}
            style={{
              background: `linear-gradient(135deg, ${getBadgeColor(
                area.focus
              )}, ${getBadgeColor(area.focus - 10)})`,
            }}
          >
            <span className="text-xs md:text-[10px] lg:text-[10px] xl:text-xs font-medium text-gray-800">
              {area.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Knowledge Graph Component
export const KnowledgeGraph = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="h-full w-full p-4 flex items-center justify-center">
        Loading...
      </div>
    );
  // 定义节点数据
  const firstLevelNodes = [
    { name: "CV", angle: 0, color: "#D2A554" },
    { name: "NLP", angle: 72, color: "#C19A49" },
    { name: "Generative AI", angle: 144, color: "#A67C3D" },
    { name: "Data Science", angle: 216, color: "#BF9146" },
    { name: "Industrial", angle: 288, color: "#D7B672" },
  ];

  const cvSubNodes = [
    { name: "Pose Est.", angle: -15, color: "#D7B672" },
    { name: "Segmentation", angle: 15, color: "#D7B672" },
  ];

  const genAiSubNodes = [
    { name: "Diffusion", angle: -15, color: "#D7B672" },
    { name: "VAE", angle: 15, color: "#D7B672" },
  ];

  return (
    <div className="h-full w-full p-2 mt-5 flex items-center justify-center">
      {/* 使用相对定位的容器和固定的宽高比 */}
      <div className="relative w-[90%] aspect-square max-w-[280px] max-h-[280px]">
        {/* 中央节点 */}
        <motion.div
                        initial={{ opacity: 0.5 }}
                        whileInView={{ opacity: 1}}
                        transition={{ duration: 0.2}}
                        >
        <div
          className="absolute left-1/2 top-1/2 w-16 h-16 rounded-full bg-[#B08642] flex items-center justify-center shadow-lg z-20"
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 15px rgba(176, 134, 66, 0.4)",
          }}
        >
          <div className="text-center">
            <span className="text-xs font-bold text-black">
              Deep
              <br />
              Learning
            </span>
          </div>
        </div>
        </motion.div>

        {/* 装饰性圆圈 */}
        <div
          className="absolute left-1/2 top-1/2 w-[85%] h-[85%] border border-dashed border-[#B08642]/20 rounded-full"
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>
        <div
          className="absolute left-1/2 top-1/2 w-[60%] h-[60%] border border-dashed border-[#B08642]/30 rounded-full"
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>

        {/* 一级节点 */}
        {firstLevelNodes.map((node, index) => {
          // 计算半径为容器宽度的一半的70%
          const radius = "35%";
          const angleRad = (node.angle * Math.PI) / 180;
          // 使用百分比定位
          const x = `${50 + 35 * Math.cos(angleRad)}%`;
          const y = `${50 + 35 * Math.sin(angleRad)}%`;

          return (
            <motion.div
                        key={node.name}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        >
            <React.Fragment>
              {/* 连接线 */}
              <div
                className="absolute left-1/2 top-1/2 w-[2px] bg-gradient-to-b from-[#B08642] to-[#D7B672]/30 z-10"
                style={{
                  height: radius,
                  transformOrigin: "top",
                  transform: `translateX(-1px) rotate(${node.angle}deg)`,
                }}
              />

              {/* 节点 */}
              <div
                className="absolute z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: node.color,
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="text-center">
                  <span className="text-[10px] text-black font-medium">
                    {node.name.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* 二级节点 - 计算机视觉 */}
              {index === 0 &&
                cvSubNodes.map((subNode, subIndex) => {
                  const subAngleRad =
                    ((node.angle + subNode.angle) * Math.PI) / 180;
                  // 计算子节点位置（相对于一级节点的偏移）
                  const subX = `calc(${x} + ${20 * Math.cos(subAngleRad)}%)`;
                  const subY = `calc(${y} + ${20 * Math.sin(subAngleRad)}%)`;

                  return (
                    <React.Fragment key={`cv-${subNode.name}`}>
                      {/* 连接线 */}
                      <div
                        className="absolute w-[1px] bg-[#D7B672]/60 z-10"
                        style={{
                          height: "20%",
                          left: x,
                          top: y,
                          transformOrigin: "top",
                          transform: `translateX(-0.5px) rotate(${
                            subNode.angle + node.angle
                          }deg)`,
                        }}
                      />

                      {/* 子节点 */}
                      <div
                        className="absolute z-10 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: subNode.color,
                          left: subX,
                          top: subY,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <span className="text-[8px] text-black">
                          {subNode.name}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}

              {/* 二级节点 - 生成式AI */}
              {index === 2 &&
                genAiSubNodes.map((subNode, subIndex) => {
                  const subAngleRad =
                    ((node.angle + subNode.angle) * Math.PI) / 180;
                  // 计算子节点位置（相对于一级节点的偏移）
                  const subX = `calc(${x} + ${20 * Math.cos(subAngleRad)}%)`;
                  const subY = `calc(${y} + ${20 * Math.sin(subAngleRad)}%)`;

                  return (
                    <React.Fragment key={`genai-${subNode.name}`}>
                      {/* 连接线 */}
                      <div
                        className="absolute w-[1px] bg-[#D7B672]/60 z-10"
                        style={{
                          height: "20%",
                          left: x,
                          top: y,
                          transformOrigin: "top",
                          transform: `translateX(-0.5px) rotate(${
                            subNode.angle + node.angle
                          }deg)`,
                        }}
                      />

                      {/* 子节点 */}
                      <div
                        className="absolute z-10 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: subNode.color,
                          left: subX,
                          top: subY,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <span className="text-[8px] text-black">
                          {subNode.name}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
            </React.Fragment>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Core Competency Radar Chart Component
export const CoreCompetencyRadar = () => {
  type Competency = {
    name: string;
    value: number;
  };

  const competencies: Competency[] = [
    { name: "Resource Optimization", value: 85 },
    { name: "Creative Tech", value: 85 },

    { name: "UX Design", value: 80 },
    { name: "Full-Stack AI", value: 85 },
    { name: "Cross-Domain Integration", value: 90 },
    { name: "Data Analysis", value: 95 },

    { name: "AI Research", value: 90 },

    { name: "Project Management", value: 80 },
  ];

  const maxValue = 100;
  const centerX = 150;
  const centerY = 150;
  const radius = 80;

  // Calculate points for each axis
  const calculateAxisPoints = (index: number, total: number, value: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const x = centerX + ((radius * value) / maxValue) * Math.cos(angle);
    const y = centerY + ((radius * value) / maxValue) * Math.sin(angle);
    return { x, y };
  };

  // Calculate points for the polygon
  const calculatePolygonPoints = () => {
    return competencies
      .map((comp, i) => {
        const { x, y } = calculateAxisPoints(
          i,
          competencies.length,
          comp.value
        );
        return `${x},${y}`;
      })
      .join(" ");
  };

  // Calculate axis labels
  const calculateLabelPosition = (index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const x = centerX + (radius + 25) * Math.cos(angle);
    const y = centerY + (radius + 25) * Math.sin(angle);
    return { x, y };
  };

  // Calculate reference circles
  const referenceCircles = [25, 50, 75, 100].map((percentage) => {
    const circleRadius = (radius * percentage) / maxValue;
    return {
      cx: centerX,
      cy: centerY,
      r: circleRadius,
    };
  });

  return (
    <div className="h-full w-full p-0 flex flex-col">
      <div className="relative flex-grow flex items-center justify-center">
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          className="max-w-full max-h-full"
        >
          {/* Reference circles */}
          {referenceCircles.map((circle, i) => (
            <circle
              key={i}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill="none"
              stroke="rgba(0, 0, 0, 0.1)"
              strokeWidth="1"
              strokeDasharray={i < 3 ? "2,2" : "none"}
            />
          ))}

          {/* Axis lines */}
          {competencies.map((comp, i) => {
            const { x, y } = calculateAxisPoints(
              i,
              competencies.length,
              maxValue
            );
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="rgba(0, 0, 0, 0.2)"
                strokeWidth="1"
              />
            );
          })}

          {/* Polygon representing competency levels */}
          <motion.polygon
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.7, scale: 1 }}
            transition={{ duration: 1 }}
            points={calculatePolygonPoints()}
            fill="rgba(176, 134, 66, 0.3)"
            stroke="#B08642"
            strokeWidth="2"
          />

          {/* Data points */}
          {competencies.map((comp, i) => {
            const { x, y } = calculateAxisPoints(
              i,
              competencies.length,
              comp.value
            );
            return (
              <motion.circle
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                cx={x}
                cy={y}
                r="4"
                fill="#B08642"
                stroke="#FFF"
                strokeWidth="1"
              />
            );
          })}

          {/* Axis labels */}
          {competencies.map((comp, i) => {
            const { x, y } = calculateLabelPosition(i, competencies.length);
            return (
              <motion.text
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#333"
                className={`text-xs font-medium`}
              >
                {comp.name}
              </motion.text>
            );
          })}

          {/* Value labels */}
          {referenceCircles.map((circle, i) => (
            <text
              key={i}
              x={centerX - 15}
              y={centerY - circle.r + 5}
              fontSize="8"
              fill="#666"
            >
              {(i + 1) * 25}%
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

// Professional Experience Timeline
export const ProfessionalExperience = () => {
  const experiences = [
    { area: "Deep Learning", years: 6 },
    { area: "Data Science", years: 8 },
    { area: "Computer Vision", years: 6 },
    { area: "Full-Stack Dev", years: 3 },
    { area: "Project Management", years: 8 },
    { area: "Visual Design", years: 9 },
  ];

  // 获取颜色函数
  const getColor = (years: number) => {
    if (years >= 6) return "#B08642";
    if (years >= 5) return "#C19A49";
    if (years >= 4) return "#D2A554";
    if (years >= 3) return "#D7B672";
    return "#E5CFB6";
  };

  // 基于最大的可能年数
  const maxYears = 10;

  return (
    <div className="h-full w-full bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.area}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* 圆形进度条 */}
            <div className="relative mb-2">
              <svg width="80" height="80" viewBox="0 0 80 80">
                {/* 背景圆圈 */}
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="transparent"
                  stroke="#E5E7EB"
                  strokeWidth="6"
                />

                {/* 进度条 */}
                <motion.circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="transparent"
                  stroke={getColor(exp.years)}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 36}
                  strokeDashoffset={
                    2 * Math.PI * 36 * (1 - exp.years / maxYears)
                  }
                  transform="rotate(-90 40 40)"
                  initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                  whileInView={{
                    strokeDashoffset:
                      2 * Math.PI * 36 * (1 - exp.years / maxYears),
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-black">
                  {exp.years}
                </span>
                <span className="text-xs text-black/70">YRS</span>
              </div>
            </div>

            {/* 标签 */}
            <div className="text-center">
              <span className="text-sm font-medium text-black/90">
                {exp.area}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// AI Capabilities Chart (Tailwind-based)
export const AICapabilitiesChart = () => {
  const capabilities = [
    { name: "Deep Learning", value: 95, color: "#B08642" },
    { name: "Computer Vision", value: 90, color: "#C19A49" },
    { name: "AIGC", value: 85, color: "#D2A554" },
    { name: "NLP", value: 80, color: "#D7B672" },
    { name: "Industrial AI", value: 88, color: "#A67C3D" },
  ];

  return (
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-lg p-4 flex flex-col">
      <div className="space-y-3 flex-grow">
        {capabilities.map((capability, index) => (
          <motion.div
            key={capability.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-black/80">{capability.name}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {capability.value}%
              </span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: capability.color }}
                initial={{ width: "0%" }}
                whileInView={{ width: `${capability.value}%` }}
                transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
              />
            </div>

            {/* Gradient shadow for depth */}
            <div className="w-full h-1 bg-gradient-to-b from-black/20 to-transparent rounded-b-lg mt-px opacity-50"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Lanauage and Design
export const LanguageDesignSkills = () => {
  // 技能数据
  type SkillCategory = "language" | "design";

  const skills: {
    name: string;
    emoji: string;
    category: SkillCategory;
    level: number;
  }[] = [
    // 语言能力
    { name: "中文", emoji: "🇨🇳", category: "language", level: 5 },
    { name: "English", emoji: "🇬🇧", category: "language", level: 5 },
    { name: "Deutsch", emoji: "🇩🇪", category: "language", level: 4 },

    // 设计能力
    // { name: "Gym", emoji: "🏋🏻‍♂️", category: "design", level: 4 },
    // { name: "UI/UX", emoji: "📱", category: "design", level: 5 },
    { name: "Video Edit", emoji: "🎬", category: "design", level: 4 },
    { name: "Photography", emoji: "📷", category: "design", level: 5 },
  ];

  // 黑金风格标签样式
  const categoryStyles = {
    language: {
      base: "border-black bg-amber-800/5",
      dot: "bg-amber-400",
    },
    design: {
      base: "border-black bg-amber-800/5",
      dot: "bg-amber-400",
    },
  };

  return (
    <div className="h-full w-full rounded-lg pl-2 pt-2 relative overflow-hidden">
      {/* 装饰背景 - 简约金色线条 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={`line-h-${i}`}>
              <div
                className="absolute h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                style={{ top: `${30 + i * 20}%`, left: 0, right: 0 }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="relative z-10">
        {/* 标签云 */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={`flex items-center border px-3 py-1.5 rounded-lg ${
                categoryStyles[skill.category].base
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.07,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 8px rgba(217, 180, 104, 0.5)",
              }}
            >
              <span
                className="text-base mr-2"
                role="img"
                aria-label={skill.name}
              >
                {skill.emoji}
              </span>
              <span className="text-black font-medium text-sm lg:text-[10px] xl:text-sm">
                {skill.name}
              </span>

              {/* 技能等级点 */}
              <div className="ml-2 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`dot-${skill.name}-${i}`}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i < skill.level
                        ? categoryStyles[skill.category].dot
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
