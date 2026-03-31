"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { AiOutlineLinkedin, AiOutlineMail } from "react-icons/ai";
import { AutoTextEffect } from "@/components/ui/auto-text-effect";
import { ShinyButton } from "@/components/magicui/shiny-button";
// import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { BackgroundBeams } from "@/components/ui/background-beams";
// import ProjectTabsContent from "@/components/project-tabs-content";
import ParallaxSeparator from "@/components/parallax-separator";
import { LinkPreview } from "@/components/ui/link-preview";
import { FloatingNavbar } from "@/components/my-floating-navbar";
import {
  TechLogoGrid,
  DataSciencePieChart,
  AICapabilitiesChart,
  ProjectComplexityImpactMatrix,
  AIResearchFocus,
  KnowledgeGraph,
  CoreCompetencyRadar,
  ProfessionalExperience,
  LanguageDesignSkills,
} from "@/components/skill-visualization";
import {
  IconBuildingFactory2,
  IconStethoscope,
  IconShield,
  IconRobot, IconCode
} from "@tabler/icons-react";
import LazyMotionComponent from "@/components/lazymotion";

import dynamic from "next/dynamic";
const BentoGrid = dynamic(
  () => import("@/components/ui/bento-grid").then((mod) => mod.BentoGrid),
  { ssr: true },
);
const BentoGridItem = dynamic(
  () => import("@/components/ui/bento-grid").then((mod) => mod.BentoGridItem),
  { ssr: true },
);
const ProjectTabsContent = dynamic(
  () => import("@/components/project-tabs-content"),
  {
    ssr: false,
  },
);

// 1. 代码风格的 Hi! I am Yi Li 组件
const CodeIntroVisual = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.2,
      }}
    >
      <div className="flex-1 w-full bg-[#241912] rounded-lg flex items-center justify-center overflow-hidden p-4">
        <div className="w-full font-mono text-sm md:text-base text-white text-center">
          <div className="mt-2">
            <span className="text-[#FF628C]">model</span>
            <span className="text-white">.</span>
            <span className="text-[#5EFFFF]">forward</span>
            <span className="text-white">(</span>
            <span className="text-[#A5FF90]">"Hi! I'm Yi Li."</span>
            <span className="text-white">)</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// 2. 动物表情动画 for Why It Matters
const WhyItMattersVisual = () => {
  return (
    <div className="flex-1 w-full h-[24px] md:h-[28px] flex items-center justify-center overflow-hidden">
      <div className="flex space-x-2 space-y-2 md:space-x-4 scale-75 md:scale-100">
        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            },
            rotate: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          className="text-2xl md:text-3xl"
        >
          🐼
        </motion.div>

        {/* 其他动物动画保持不变 */}
        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [5, -5, 5],
          }}
          transition={{
            y: {
              duration: 2.3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.3,
            },
            rotate: {
              duration: 4.3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.3,
            },
          }}
          className="text-2xl md:text-3xl"
        >
          🐻
        </motion.div>

        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            y: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.6,
            },
            rotate: {
              duration: 4.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.6,
            },
          }}
          className="text-2xl md:text-3xl"
        >
          🐨
        </motion.div>

        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [5, -5, 5],
          }}
          transition={{
            y: {
              duration: 2.7,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.9,
            },
            rotate: {
              duration: 4.7,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.9,
            },
          }}
          className="text-2xl md:text-3xl"
        >
          🐯
        </motion.div>
      </div>
    </div>
  );
};

// 3. 技能标签
const SkillsVisual = () => {
  // 高饱和度的棕金色系列
  const colors = [
    "#C19A49", // 金色
    "#B08642", // 深金棕色
    "#D2A554", // 明亮的金色
    "#C8954D", // 琥珀色
    "#B7873D", // 金褐色
    "#D7B672", // 淡金色
    "#A67C3D", // 古铜色
    "#BF9146", // 赭石色
  ];

  return (
    // 极大减少高度和空间
    <div className="flex-1 w-full h-full min-h-[2.5rem] flex-col space-y-0.5 flex items-center justify-center">
      <div className="flex flex-wrap gap-1 justify-center">
        {[
          { name: "PyTorch", color: colors[0] },
          { name: "Computer Vision", color: colors[1] },
          { name: "Next.js", color: colors[2] },
          { name: "AIGC", color: colors[3] },
          { name: "Docker", color: colors[4] },
          { name: "FastAPI", color: colors[5] },
          { name: "Streamlit", color: colors[6] },
          { name: "NLP", color: colors[7] },
        ].map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: i * 0.1,
            }}
            className="px-2 py-0.5 rounded-full text-black text-xs font-medium"
            style={{ backgroundColor: skill.color }}
          >
            {skill.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-black">
      {/* 第一屏 */}
      <div
        id="home"
        className="h-screen flex flex-col relative overflow-hidden bg-[#FEDFB7] dark:bg-[#FEDFB7]"
        style={{
          backgroundColor: "#FEDFB7",
          // 强制锁定颜色
          colorScheme: "light",
          forcedColorAdjust: "none",
        }}
      >
        {/* 添加暗色模式覆盖层 */}
        <div className="absolute inset-0 z-[-1] bg-[#FEDFB7] dark:bg-[#FEDFB7]" />

        {/* FlickeringGrid 背景 - 放在最底层，设置明确的宽高 */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="relative w-full h-full">
            <FlickeringGrid
              className="h-full w-full"
              squareSize={4}
              gridGap={6}
              color="#FDEFCE"
              maxOpacity={0.8}
              flickerChance={0.4}
            />
          </div>
        </div>

        {/* 大圆形背景 - 放在最底层 */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[85%] h-0 pt-[90%] md:pt-[90%] rounded-full bg-[#E5CFB6] opacity-90"></div>
        </div>

        {/* 导航栏 - 修改为页内跳转 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="sticky top-0 left-0 right-0 z-50 p-1 md:p-4 pt-[2vh] border-b border-black bg-transparent"
        >
          <div className="container mx-auto flex justify-center items-center">
            <ul className="flex flex-wrap space-x-3 md:space-x-16 justify-center">
              <li>
                <Link
                  href="#about"
                  className="text-base md:text-xl font-bold text-black hover:text-gray-600 transition-colors font-[helvetica]"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#about")!.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="#project"
                  className="text-base md:text-xl font-bold text-black hover:text-gray-6000 transition-colors font-[helvetica]"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#project")!.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Project
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="text-base md:text-xl font-bold text-black hover:text-gray-6000 transition-colors font-[helvetica]"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#experience")!.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#skill"
                  className="text-base md:text-xl font-bold text-black hover:text-gray-600 transition-colors font-[helvetica]"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#skill")!.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Skills
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* 右侧装饰线 */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100vh" }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          className="md:block absolute top-0 right-[6%] border-r border-black z-40"
        ></motion.div>

        {/* 右侧名字 - 提高z-index值 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          // className="md:flex absolute top-[740px] md:top-[760px] right-[calc(6%-38px)] md:right-[calc(6%-40px)] z-40"
          className="absolute right-[-0.5vh] md:right-[0vh] lg:right-[2vh] xl:right-[3vh]  top-[92vh] md:top-[85vh] lg:top-[85vh] xl:top-[90vh] z-40 origin-bottom-right"
        >
          <div
            className="transform origin-top-right text-xs md:text-base xl:text-lg tracking-widest font-medium text-black whitespace-nowrap"
            style={{
              fontFamily: "sans-serif",
              transform: "rotate(90deg) translateY(50%)",
            }}
          >
            <span>
              李一 <span className="mx-2">🥨</span> Yi Li{" "}
            </span>
            <span className="mx-8 ">|</span>
            <span>
              Darmstadt<span className="mx-1"></span>🇩🇪 Germany{" "}
            </span>
            <span className="mx-8 ">|</span>
            <span>
              🐼🐻ʕ<span className="mx-1"></span>• ﻌ •{" "}
              <span className="mx-1"></span>ʔ 🐨🐯
            </span>
          </div>
        </motion.div>

        {/* 主内容容器 - 占满剩余空间 */}
        <div className="flex-grow flex items-center justify-center relative">
          {/* 网格布局容器 */}
          <div className="container mx-auto px-4">
            {/* 标题部分 - 添加交错的淡入并上升动画 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-[3vh] md:top-[6%] left-4 md:left-16 transform -translate-y-1/2 z-20"
            >
              <div className="space-y-2 md:space-y-4 max-w-md">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SparklesText
                    text="&lt;DL Engineer&gt;"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extralight text-black whitespace-nowrap"
                    sparklesCount={8}
                    colors={{ first: "#FFC353", second: "#E43C30" }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <SparklesText
                    text="&lt;Vision & Robotics&gt;"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-thin text-black whitespace-nowrap"
                    sparklesCount={6}
                    colors={{ first: "#FFC353", second: "#E43C30" }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <SparklesText
                    text="&lt;Full-Stack AI&gt;"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-thin text-black whitespace-nowrap"
                    sparklesCount={8}
                    colors={{ first: "#FFC353", second: "#E43C30" }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Yi Li 背景文字 - 改为底部定位 */}
            {/* <TextHoverEffect text="Yi Li" /> */}
            <div className="absolute bottom-[-6vh] md:bottom-[-2vh] lg:bottom-[-2vh] xl:bottom-[-2vh] right-[3vw] md:right-[2vw] lg:right-[3vw] xl:right-[7vw] z-10 w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[40vw] h-[40vh]">
              <AutoTextEffect text="Yi Li" />
            </div>

            {/* 角色容器 - 居中放置，覆盖其他元素 */}
            <div className="flex justify-center items-center relative h-full z-30 py-6 left-[5vw] md:py-10">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className="relative flex items-end justify-center"
              >
                {/* 机器人图片 */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                  className="absolute bottom-0 left-[-15vw] z-20"
                >
                  <Image
                    src="/robot.webp"
                    alt="Robot"
                    width={180}
                    height={180}
                    className="w-[15vw] min-w-[4rem] max-w-[14rem]"
                    priority
                  />
                </motion.div>

                {/* 人物图片 */}
                <Image
                  src="/character.webp"
                  alt="Character"
                  width={700}
                  height={800}
                  className="w-[45vw] min-w-[15rem] max-w-[32rem] max-h-[75vh] object-contain"
                  priority={true} // 保留这个用于首屏关键图片
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* 社交链接 */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
          className="absolute bottom-8 left-16 flex space-x-4 z-40"
        >
          {/* Email button */}
          <Link href="mailto:your.email@example.com" target="_blank">
            <ShinyButton className="rounded-lg bg-black text-white hover:bg-gray-800 px-4 py-2">
              <AiOutlineMail className="h-5 w-5 mr-2" />
              <span>Email</span>
            </ShinyButton>
          </Link>

          {/* LinkedIn button */}
          <Link href="https://www.linkedin.com/in/yi-li-dev/" target="_blank">
            <ShinyButton className="rounded-lg bg-black text-white hover:bg-gray-800 px-4 py-2">
              <AiOutlineLinkedin className="h-5 w-5 mr-2" />
              <span>LinkedIn</span>
            </ShinyButton>
          </Link>
        </motion.div>
      </div>

      {/* 添加浮动导航栏 */}
      <FloatingNavbar />

      {/* 第二屏和第三屏的公共父容器 */}
      <LazyMotionComponent>
        <div className="relative bg-[#0F0F18]">
          {/* 共享的背景光束 - 定位在父容器内 */}
          <div className="absolute inset-0 z-10 ">
            <BackgroundBeams />
          </div>

          {/* 第二屏 */}
          <div
            id="about"
            className="flex bg-transparent text-white pt-20 relative overflow-hidden"
          >
            <div className="container mx-auto px-4 z-10">
              <BentoGrid className="max-w-[100vw] mx-auto grid md:grid-cols-2 lg:grid-cols-4 md:auto-rows-[minmax(300px,_auto)] gap-4">
                {/* 自我介绍 - 使用简化的代码样式 */}
                <BentoGridItem
                  description={
                    <div className="space-y-3 p-4 flex flex-col h-full justify-center">
                      <p className="text-base leading-relaxed">
                        I'm a{" "}
                        <span className="text-black/70 font-semibold">
                          deep learning engineer
                        </span>{" "}
                        and
                        <span className="text-black/70 font-semibold">
                          {" "}
                          AI researcher
                        </span>{" "}
                        driven by a simple belief:
                      </p>

                      <div className="my-2 relative">
                        <p className="text-lg font-serif italic font-semibold text-[#B68D40] z-10 relative">
                          "Technology should lift burdens, not just shift them."
                        </p>
                      </div>

                      <p className="text-base leading-relaxed">
                        I build intelligent systems that empower industries and
                        research while staying
                        <span className="text-black/70 font-semibold">
                          {" "}
                          rooted in human impact
                        </span>
                        .
                      </p>
                    </div>
                  }
                  header={<CodeIntroVisual />}
                  className="md:col-span-1 md:row-span-1 md:order-1 overflow-hidden"
                />

                {/* What I Do Best - 更新的内容格式 */}
                <BentoGridItem
  title="What I Do Best"
  description={
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-3rem)] overflow-y-auto px-4 pb-4">
      {/* Industrial AI */}
      <div className="space-y-3">
        <div className="flex flex-col items-start gap-5">
          <h3 className="text-base font-bold text-[#FD6142]">
            Industrial AI
          </h3>
          <div className="flex justify-left md:justify-center w-full">
            <Image src="/industry.webp" width={64} height={64} alt="Industrial AI" className="h-22 w-22 my-2" loading="lazy" />
          </div>
        </div>
        <p className="text-base leading-relaxed text-gray-800">
          Transforming noisy industrial data into production-ready AI. I optimized manufacturing processes at Merck, boosting first-time-right yield and earning the company's 2024 Efficiency Award.
        </p>
      </div>

      {/* CV & Robotics */}
      <div className="space-y-3">
        <div className="flex flex-col items-start gap-5">
          <h3 className="text-base font-bold text-[#FD6142]">
            CV & Robotics
          </h3>
          <div className="flex justify-left md:justify-center w-full">
            <Image src="/science.webp" width={64} height={64} alt="CV and Robotics" className="h-22 w-22 my-2" loading="lazy" />
          </div>
        </div>
        <p className="text-base leading-relaxed text-gray-800">
          Bridging AI with the physical world. I design multimodal visual representations for robotic manipulation and medical imaging, empowering machines to solve complex real-world challenges.
        </p>
      </div>

      {/* Human-Centered AI Product Delivery*/}
      <div className="space-y-3">
        <div className="flex flex-col items-start gap-5">
          <h3 className="text-base font-bold text-[#FD6142]">
            Human-Centered AI
          </h3>
          <div className="flex justify-left md:justify-center w-full">
            <Image src="/user.webp" width={64} height={64} alt="AI Product Delivery" className="h-22 w-22 my-2" loading="lazy" />
          </div>
        </div>
        <p className="text-base leading-relaxed text-gray-800">
          I build intelligent systems that people actually want to use. By combining deep learning with intuitive frontend interfaces, I make complex algorithms accessible to non-technical domain experts.
        </p>
      </div>
    </div>
  }
  className="md:col-span-2 md:row-span-1 md:order-3 overflow-hidden"
/>

                {/* 技能放在第三列，占两行 */}
<BentoGridItem
  title="Technical Skills"
  description={
    <div className="grid grid-cols-2 gap-x-3 gap-y-10 overflow-y-auto h-[calc(100%-2rem)] p-3 my-10 mb-20">
      
      {/* 1. AI & Vision */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold mb-1 text-[#FD6142]">AI & Vision</h3>
        
        <div className="space-y-1">
          <h4 className="text-sm font-bold flex items-center">
            <span className="inline-block w-2 h-2 bg-[#C19A49] rounded-full mr-2"></span>Deep Learning
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#C19A49] h-1.5 rounded-full w-[95%]"></div></div>
          <p className="text-xs text-gray-400">PyTorch, Imitation Learning</p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold flex items-center">
            <span className="inline-block w-2 h-2 bg-[#B08642] rounded-full mr-2"></span>CV & Robotics
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#B08642] h-1.5 rounded-full w-[90%]"></div></div>
          <p className="text-xs text-gray-400">Embodied AI, DINO, 6D Pose</p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold flex items-center">
            <span className="inline-block w-2 h-2 bg-[#D2A554] rounded-full mr-2"></span>Generative AI
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#D2A554] h-1.5 rounded-full w-[88%]"></div></div>
          <p className="text-xs text-gray-400">Diffusion Models, VAE, ComfyUI</p>
        </div>
      </div>

      {/* 2. Development */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold mb-1 text-[#FD6142]">Development</h3>

        <div className="space-y-1">
          <h4 className="text-sm font-bold flex items-center">
            <span className="inline-block w-2 h-2 bg-[#C8954D] rounded-full mr-2"></span>Frontend
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#C8954D] h-1.5 rounded-full w-[80%]"></div></div>
          <p className="text-xs text-gray-400">Vue.js, Next.js, Tailwind CSS</p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold flex items-center">
            <span className="inline-block w-2 h-2 bg-[#B7873D] rounded-full mr-2"></span>Backend
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#B7873D] h-1.5 rounded-full w-[85%]"></div></div>
          <p className="text-xs text-gray-400">FastAPI, Python, RESTful APIs</p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold flex items-center">
            <span className="inline-block w-2 h-2 bg-[#D7B672] rounded-full mr-2"></span>HPC & DevOps
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#D7B672] h-1.5 rounded-full w-[85%]"></div></div>
          <p className="text-xs text-gray-400">SLURM, Docker, AWS, Linux</p>
        </div>
      </div>

      {/* 3. Data Science */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold mb-1 text-[#FD6142]">Data Science</h3>

        <div className="space-y-1">
          <h4 className="text-sm font-bold flex items-center">
            <span className="inline-block w-2 h-2 bg-[#A67C3D] rounded-full mr-2"></span>Processing & ML
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#A67C3D] h-1.5 rounded-full w-[92%]"></div></div>
          <p className="text-xs text-gray-400">Pandas, XGBoost, Scikit-learn</p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold flex items-center">
            <span className="inline-block w-2 h-2 bg-[#BF9146] rounded-full mr-2"></span>Interactive Viz
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#BF9146] h-1.5 rounded-full w-[85%]"></div></div>
          <p className="text-xs text-gray-400">Streamlit, Plotly, BertViz</p>
        </div>
      </div>

      {/* 4. Other Skills */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold mb-1 text-[#FD6142]">Other Skills</h3>

        <div className="space-y-1">
          <h4 className="text-sm font-bold flex items-center">
            <span className="inline-block w-2 h-2 bg-[#BF9146] rounded-full mr-2"></span>NLP & XAI
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#BF9146] h-1.5 rounded-full w-[82%]"></div></div>
          <p className="text-xs text-gray-400">LangChain, Hugging Face, XAI</p>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-bold flex items-center">
            <span className="inline-block w-2 h-2 bg-[#C19A49] rounded-full mr-2"></span>Cross-Domain
          </h4>
          <div className="w-full bg-gray-700 rounded-full h-1.5"><div className="bg-[#C19A49] h-1.5 rounded-full w-[80%]"></div></div>
          <p className="text-xs text-gray-400">Technical PM, UX/UI, Collaboration</p>
        </div>
      </div>

    </div>
  }
  header={<SkillsVisual />}
  className="md:col-span-1 md:row-span-2 md:order-4 overflow-hidden"
/>

                {/* Why It Matters - 使用简化的动物表情动画 */}
                <BentoGridItem
                  title="Why It Matters"
                  description={
                    <div className="h-full p-4 flex flex-col">
                      <div className="space-y-4 text-base leading-relaxed">
                        <p>
                          Growing up witnessing medical gaps and workers
                          shoulder society's hardest tasks, I design AI that{" "}
                          <span className="text-black/70 font-semibold">
                            reduces invisible labor
                          </span>
                          .
                        </p>

                        <p>
                          Whether optimizing industrial production or tackling
                          challenges with code, I measure success by{" "}
                          <span className="text-black/70 font-semibold">
                            how many people breathe easier
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  }
                  header={<WhyItMattersVisual />}
                  className="md:col-span-1 md:row-span-1 md:order-5 overflow-hidden"
                />

                {/* What's Next - 统一填充和边距 */}
<BentoGridItem
  title="What's Next"
  description={
    <div className="h-full p-4 flex flex-col">
      <p className="text-base mb-4">
        Seeking <span className="text-black/70 font-semibold">immediate opportunities</span> in:
      </p>

      <div className="space-y-1 flex-grow">
        {/* Tier 1: Industrial AI */}
        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center p-2.5 rounded-md bg-gray-200/20 border-l-2 border-[#B08642] h-auto">
          <div className="mr-3 p-1.5 bg-[#fbf3e5] rounded-full shrink-0">
            <IconBuildingFactory2 className="h-4 w-4 text-[#B08642]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-base font-semibold text-[#B08642] truncate">Industrial AI</h4>
            <p className="text-xs text-gray-600 line-clamp-2">Semiconductor, chemical optimization, predictive ML</p>
          </div>
        </motion.div>

        {/* Tier 2: Robotics & Vision */}
        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex items-center p-2.5 rounded-md bg-gray-200/20 border-l-2 border-[#B08642] h-auto">
          <div className="mr-3 p-1.5 bg-[#fbf3e5] rounded-full shrink-0">
            <IconRobot className="h-4 w-4 text-[#B08642]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-base font-semibold text-[#B08642] truncate">Robotics & Vision</h4>
            <p className="text-xs text-gray-600 line-clamp-2">Embodied AI, representation learning, 6D pose estimation</p>
          </div>
        </motion.div>

        {/* Tier 3: Applied AI Systems */}
        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center p-2.5 rounded-md bg-gray-200/20 border-l-2 border-[#B08642] h-auto">
          <div className="mr-3 p-1.5 bg-[#fbf3e5] rounded-full shrink-0">
            <IconCode className="h-4 w-4 text-[#B08642]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-base font-semibold text-[#B08642] truncate">Applied AI Systems</h4>
            <p className="text-xs text-gray-600 line-clamp-2">Full-stack MLOps, LLM integration, explainable AI</p>
          </div>
        </motion.div>
      </div>
    </div>
  }
  className="md:col-span-1 md:row-span-1 md:order-6 overflow-hidden"
/>

                {/* Visualization - 放在底行 */}
                <BentoGridItem
                  title={null}
                  description={
                    <div className="flex items-center justify-center h-full p-4">
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                          rotateZ: [-1, 1, -1],
                          scale: [0.99, 1.01, 0.99],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src="/computer.webp"
                          alt="AI Visualization"
                          width={200}
                          height={200}
                          className="rounded-lg object-contain max-h-full"
                          loading="lazy" // 延迟加载
                        />
                      </motion.div>
                    </div>
                  }
                  header={null}
                  className="md:col-span-1 md:row-span-1 md:order-2 lg:order-7 overflow-hidden"
                />
              </BentoGrid>
            </div>
          </div>

          {/* 第三屏 */}
          <div id="project" className=" text-white pt-40 pb-60 relative z-10">
            <div className="container mx-auto px-4">
              {/* 标题部分 */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mb-20 pb-8"
              >
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D2A554] to-[#C8954D] leading-tight py-2">
                  My Projects
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Building solutions that make a difference
                </p>
              </motion.div>

              {/* Tabs 组件 - 关键修改: 移除[perspective:1000px]属性和overflow-hidden */}
              <div className="relative flex flex-col max-w-9xl mx-auto w-full items-start justify-start">
                <ProjectTabsContent />
              </div>
            </div>
          </div>
        </div>
      </LazyMotionComponent>

      {/* 分隔图片 */}
      <ParallaxSeparator />

      {/* 第四屏 */}

      <LazyMotionComponent>
        <div
          id="experience"
          className="min-h-screen bg-[#edd9bb] dark:bg-[#edd9bb] text-black py-20 relative overflow-hidden"
        >
          {/* 背景元素 - 类似第一屏的FlickeringGrid */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="relative w-full h-full">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={3}
                gridGap={6}
                color="#D2A554"
                maxOpacity={0.3}
                flickerChance={0.3}
              />
            </div>
          </div>

          {/* 大圆形背景 - 类似第一屏 */}

          <div className="container mx-auto px-4 relative z-10">
            {/* 标题部分 */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#B08642] to-[#b97b2a] leading-tight py-2">
                My Journey
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto tracking-tight">
                Code with Compassion, Automation for Liberation
              </p>
            </motion.div>
            {/* 时间轴整体容器 - 将其改为两栏独立结构 */}
            <div className="relative flex flex-col md:flex-row">
              {/* 中央时间轴线 - 在小屏幕上隐藏 */}
              <div className="absolute hidden md:block md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#B08642] via-[#D7B672] to-transparent md:transform md:-translate-x-1/2"></div>

              {/* 左侧栏 - 工作经历 */}
              <div className="w-full md:w-1/2 md:pr-12 mb-16 md:mb-0">
                {/* 工作经历标题 */}
                <div className="mb-16 md:text-right">
                  <h3 className="text-2xl font-bold text-[#B08642] border-b-2 border-[#D7B672] pb-2 inline-block">
                    Work Experience
                  </h3>
                </div>

                {/* Merck KGaA */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative mb-24"
                >
                  <div className="absolute right-[-56px] top-8 w-4 h-4 bg-[#b97b2a] border-2 border-[#B08642] rounded-full z-10"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow-sm text-right">
                    {/* 渐变时间条 */}
                    <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-[#D7B672] to-[#B08642] rounded-t-lg"></div>

                    <h4 className="text-lg font-bold text-[#B08642]">
                      Working Student on Data Science
                    </h4>
                    <p className="text-gray-700 font-medium">
                      Merck KGaA, Darmstadt, Germany
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Darmstadt, Hessen, Germany
                    </p>
                    <p className="font-semibold text-[#B08642]">
                      Oct 2023 - Sep 2025
                    </p>
                    <div className="text-gray-800 my-4 space-y-3">
  <p className="leading-relaxed">
    Applied machine learning and full-stack engineering to semiconductor and chemical manufacturing across four projects — earning two company awards and a reference letter signed by two Directors.
  </p>
  

    <div>
      <p className="font-bold text-[#8B4513]">🏆 Surface Gernsheim Award 2024 (Efficiency)</p>
      <p className="font-bold text-[#8B4513]">🏆 Spot Award (MyImpact@Merck)</p>
    </div>
    <p className="text-gray-700 leading-relaxed">
      <span className="font-semibold text-black">Core Projects:</span> Photoresist formulation prediction (ML pipeline + Streamlit) · Pigment production optimization (FRED 2.0) · Pharmaceutical parameter regression · Full-stack lab reservation system (Vue.js + FastAPI + AWS).
    </p>


  <p className="text-sm leading-relaxed text-gray-700">
    Work spanned the full delivery chain: legacy SQL/Python data extraction, ML model development, interactive web application deployment, and cross-functional collaboration with chemical engineers.
  </p>
</div>
                    <div className="flex justify-end mt-4">
                      <Image
                        src="/merck.webp"
                        alt="Merck KGaA Logo"
                        width={150}
                        height={112}
                        className="object-contain rounded-lg"
                        loading="lazy" // 延迟加载
                      />
                    </div>
                  </div>
                </motion.div>

                {/* NMY Mixed Reality Studio */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative mb-24"
                >
                  <div className="absolute right-[-56px] top-8 w-4 h-4 bg-[#b97b2a] border-2 border-[#B08642] rounded-full z-10"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow-sm text-right">
                    {/* 渐变时间条 */}
                    <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-[#D7B672] to-[#B08642] rounded-t-lg"></div>

                    <h4 className="text-lg font-bold text-[#B08642]">
                      Working Student on LLMs
                    </h4>
                    <p className="text-gray-700 font-medium">
                      NMY Mixed Reality Studio
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Frankfurt am Main, Hessen, Germany
                    </p>
                    <p className="font-semibold text-[#B08642]">
                      Jun 2023 - Sep 2023
                    </p>
                    <p className="text-gray-800 my-4">
                      Built an LLM-powered voice-interactive assistant for
                      enterprise VR/AR using LLaMA 2, LangChain, and ChromaDB.
                      Implemented text-to-speech with Bark and provided
                      strategic AI-VR integration roadmaps.
                    </p>
                    <div className="flex justify-end mt-4">
                      <Image
                        src="/nmy.webp"
                        alt="NMY Mixed Reality Studio Logo"
                        width={150}
                        height={112}
                        className="object-contain rounded-lg"
                        loading="lazy" // 延迟加载
                      />
                    </div>
                  </div>
                </motion.div>

                {/* BseTech */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative mb-24"
                >
                  <div className="absolute right-[-56px] top-8 w-4 h-4 bg-[#b97b2a] border-2 border-[#B08642] rounded-full z-10"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow-sm text-right">
                    {/* 渐变时间条 */}
                    <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-[#D7B672] to-[#B08642] rounded-t-lg"></div>

                    <h4 className="text-lg font-bold text-[#B08642]">
                      Co-founder and Product Manager
                    </h4>
                    <p className="text-gray-700 font-medium">
                      Hangzhou BseTech Co., Ltd.
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Hangzhou, Zhejiang, China
                    </p>
                    <p className="font-semibold text-[#B08642]">
                      Oct 2015 - Jan 2016
                    </p>
                    <p className="text-gray-800 my-4">
                      As the co-founder and product manager of a wellness
                      industry startup, I explored every step of the process
                      from company registration to launching the initial apps.
                    </p>
                    <div className="flex justify-end mt-4">
                      <Image
                        src="/treat.webp"
                        alt="Hangzhou BseTech Logo"
                        width={150}
                        height={112}
                        className="object-contain rounded-lg"
                        loading="lazy" // 延迟加载
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* 右侧栏 - 教育经历 */}
              <div className="w-full md:w-1/2 md:pl-12">
                {/* 教育经历标题 */}
                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-[#B08642] border-b-2 border-[#D7B672] pb-2 inline-block">
                    Education
                  </h3>
                </div>

                {/* TU Darmstadt */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative mb-24"
                >
                  <div className="absolute left-[-56px] top-8 w-4 h-4 bg-[#b97b2a] border-2 border-[#B08642] rounded-full z-10"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                    {/* 渐变时间条 */}
                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-l from-[#D7B672] to-[#B08642] rounded-t-lg"></div>

                    <h4 className="text-lg font-bold text-[#B08642]">
                      Master of Science - MS, Computer Science
                    </h4>
                    <p className="text-gray-700 font-medium">
                      Technische Universität Darmstadt
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Darmstadt, Hessen, Germany
                    </p>
                    <p className="font-semibold text-[#B08642]">
                      Apr 2019 - Apr 2026
                    </p>
                    <p className="text-gray-800 my-4">
                      Focusing on AI and deep learning with specialization in
                      computer vision and MLsystems. Research on industrial
                      applications of computer vision and explainable AI. GPA:
                      2.2 (German scale).
                    </p>

                    {/* Core courses as tags */}
                    <div className="mt-4 mb-3">
                      <p className="text-sm font-bold text-[#B08642] mb-2">
                        Core Courses:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Computer Vision",
                          "Visual Computing",
                          "Robot Learning",
                          "Information Visualization and Visual Analytics",
                          "Statistical ML",
                          "Probabilistic Graphical Models",
                          "DL for Medical Imaging",
                          "Continuous ML",
                          "NLP and the Web",
                          "Foundations of Language Technology",
                          "Deep Learning for NLP",
                          "Deep Learning: Architectures & Methods",
                          "Advanced Topics in CV and ML",
                          "DL and Digital Humanities",
                          "Advanced Practical Course Visual Computing",
                          "Data Analysis for Natural Language",
                        ].map((course) => (
                          <span
                            key={course}
                            className="px-2 py-1 text-xs bg-gradient-to-r from-[#B08642] to-[#c28e26] text-white rounded-full"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Seminars with links */}
                    <div className="mt-4">
                      <p className="text-sm font-bold text-[#B08642] mb-2">
                        Key Seminars:
                      </p>
                      <ul className="text-sm text-gray-800 list-disc pl-5 space-y-1">
                        <li>
                          Deep Learning for Medical Imaging (02/2023) -{" "}
                          <LinkPreview
                            url="https://docs.google.com/presentation/d/15W1NwICZzseZO0XiLmxL8b-5k59ARQN-/edit?usp=sharing&ouid=114895168252372624309&rtpof=true&sd=true"
                            className="text-[#FD6142] hover:underline"
                          >
                            Approval and Regulation of AI Medical Devices
                          </LinkPreview>
                        </li>
                        <li>
                          Deep Generative Models (07/2022) -{" "}
                          <LinkPreview
                            url="https://docs.google.com/presentation/d/1Jpbc8hcYWQA-RMKqlZoTCKXLEBFxttRNuvWlQLgGkvo/edit?usp=sharing"
                            className="text-[#FD6142] hover:underline"
                          >
                            OOD Detection with Outlier Synthesis
                          </LinkPreview>
                        </li>
                        <li>
                          Advanced CV & ML (04/2022) -{" "}
                          <LinkPreview
                            url="https://docs.google.com/presentation/d/1YJKn43caKJz9pEj21JuPaxTIEz3L2qAk/edit?usp=sharing&ouid=114895168252372624309&rtpof=true&sd=true"
                            className="text-[#FD6142] hover:underline"
                          >
                            Semantic Scene Segmentation with Context
                          </LinkPreview>
                        </li>
                        <li>
                          Deep Learning & Digital Humanities (01/2022) -{" "}
                          <LinkPreview
                            url="https://docs.google.com/presentation/d/1bxJ6dXiRZGEm82bRIlimZ1Ct8X2NqZB7/edit?usp=sharing&ouid=114895168252372624309&rtpof=true&sd=true"
                            className="text-[#FD6142] hover:underline"
                          >
                            Lexical Semantic Change
                          </LinkPreview>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-start mt-4">
                      <Image
                        src="/tudarmstadt.webp"
                        alt="TU Darmstadt Logo"
                        width={150}
                        height={112}
                        className="object-contain rounded-lg"
                        loading="lazy" // 延迟加载
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Chongqing University */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative mb-24"
                >
                  <div className="absolute left-[-56px] top-8 w-4 h-4 bg-[#b97b2a] border-2 border-[#B08642] rounded-full z-10"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                    {/* 渐变时间条 */}
                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-l from-[#D7B672] to-[#B08642] rounded-t-lg"></div>

                    <h4 className="text-lg font-bold text-[#B08642]">
                      Bachelor of Science - BS, Computer Science
                    </h4>
                    <p className="text-gray-700 font-medium">
                      Chongqing University of Post and Telecommunications
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      Chongqing, China
                    </p>
                    <p className="font-semibold text-[#B08642]">
                      Sep 2012 - Jul 2016
                    </p>
                    <p className="text-gray-800 my-4">
                      Focused on computer science fundamentals with early
                      exploration of machine learning. Ranked 1st in the
                      department in freshman year. Received RMB 8000 scholarship
                      for academic excellence. GPA 2.3 (German scale)
                    </p>

                    {/* Campus activities */}
                    <div className="mt-4">
                      <p className="text-sm font-bold text-[#B08642] mb-2">
                        Campus Activities:
                      </p>
                      <ul className="text-sm text-gray-800 list-disc pl-5 space-y-1">
                        <li>
                          Minister of Publicity Department, Students' Science
                          and Technology Union (2013-2014)
                        </li>
                        <li>
                          Trumpeter in the University's Orchestra, College
                          Students Art Troupe (2012-2015)
                        </li>
                        <li>
                          Product Designer for KuaiShou APP, Shortlisted in
                          Chongqing Youth App Development Competition (2014)
                        </li>
                        <li>Campus Representative for Meituan (2014)</li>
                      </ul>
                    </div>

                    <div className="flex justify-start mt-4">
                      <Image
                        src="/cqupt.webp"
                        alt="Chongqing University Logo"
                        width={150}
                        height={112}
                        className="object-contain rounded-lg"
                        loading="lazy" // 延迟加载
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </LazyMotionComponent>

      {/* 第五屏 */}
      <LazyMotionComponent>
        <div
          id="skill"
          className="min-h-screen bg-[#0F0F18] text-white py-20 relative overflow-hidden"
        >
          {/* 背景元素 - BackgroundBeams */}
          <div className="absolute inset-0 z-0">
            <BackgroundBeams />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* 标题部分 */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D2A554] to-[#C8954D] leading-tight py-2">
                Technical Arsenal
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto tracking-tight">
                Crafting solutions with precision tools and innovative
                approaches
              </p>
            </motion.div>

            {/* Bento网格 - 数据可视化仪表盘 */}
            <BentoGrid className="max-w-[100vw] mx-auto grid md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 md:auto-rows-[minmax(260px,_auto)] gap-4">
              {/* 1. 核心竞争力分析 */}
              <BentoGridItem
                title="Core Competencies"
                description={<CoreCompetencyRadar />}
                className="md:col-span-1 md:row-span-1 md:order-1 lg:order-1 overflow-hidden"
              />

              {/* 2. 项目复杂度vs影响力矩阵 */}
              <BentoGridItem
                title="Project Impact Matrix"
                description={<ProjectComplexityImpactMatrix />}
                className="md:col-span-2 md:row-span-1 md:order-3 lg:order-1 overflow-hidden"
              />
              {/* 3. 数据科学饼图 - 从原有组件保留但已修复 */}
              <BentoGridItem
                title="Data Science Expertise"
                description={<DataSciencePieChart />}
                className="md:col-span-1 md:row-span-1 md:order-2 lg:order-1  overflow-hidden"
              />

              {/* 4. 技术Logo网格 - 保留原有组件 */}
              <BentoGridItem
                title="Tech Stack"
                description={<TechLogoGrid />}
                className="md:col-span-2 md:row-span-1 md:order-4 lg:order-1 overflow-hidden"
              />

              {/* 4. 知识图谱 */}
              <BentoGridItem
                title="Knowledge Graph"
                description={<KnowledgeGraph />}
                className="md:col-span-1 md:row-span-1 md:order-5 lg:order-1 overflow-hidden"
              />

              {/* 5. AI研究热力图 */}
              <BentoGridItem
                title="AI Research Focus"
                description={<AIResearchFocus />}
                className="md:col-span-1 md:row-span-1 md:order-6 lg:order-1 overflow-hidden"
              />

              {/* 7. AI能力 - 从原有组件保留但已修复 */}
              <BentoGridItem
                title="AI Capabilities"
                description={<AICapabilitiesChart />}
                className="md:col-span-1 md:row-span-1 md:order-7 lg:order-1 overflow-hidden"
              />

              {/* 8. 专业领域经验 */}
              <BentoGridItem
                title="Professional Experience"
                description={<ProfessionalExperience />}
                className="md:col-span-2 md:row-span-1 md:order-9 lg:order-1 overflow-hidden"
              />

              {/* 9. 专业领域经验 */}
              <BentoGridItem
                title="Others"
                description={<LanguageDesignSkills />}
                className="md:col-span-1 md:row-span-1 md:order-8 lg:order-1 overflow-hidden"
              />
            </BentoGrid>
          </div>
        </div>
      </LazyMotionComponent>

      {/* 页尾 */}
      <footer className="bg-[#0F0F18] text-white py-16 relative z-10">
        {/* 背景元素 - 复用现有的FlickeringGrid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            <FlickeringGrid
              className="h-full w-full"
              squareSize={3}
              gridGap={6}
              color="#D2A554"
              maxOpacity={0.2}
              flickerChance={0.2}
            />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 左侧：页面导航 */}
            <div>
              <h3 className="text-xl font-bold text-[#D2A554] mb-4">
                Navigation
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#about"
                    className="text-gray-300 hover:text-[#D2A554] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#about")!.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    About Me
                  </Link>
                </li>
                <li>
                  <Link
                    href="#project"
                    className="text-gray-300 hover:text-[#D2A554] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#project")!.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#experience"
                    className="text-gray-300 hover:text-[#D2A554] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#experience")!.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="#skill"
                    className="text-gray-300 hover:text-[#D2A554] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#skill")!.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    Skills
                  </Link>
                </li>
              </ul>
            </div>

            {/* 中间：联系信息 */}
            <div>
              <h3 className="text-xl font-bold text-[#D2A554] mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <AiOutlineMail className="mr-2 text-[#D2A554]" />
                  <a
                    href="mailto:your.email@example.com"
                    className="text-gray-300 hover:text-[#D2A554] transition-colors"
                  >
                    liyi.freddy@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <AiOutlineLinkedin className="mr-2 text-[#D2A554]" />
                  <a
                    href="https://www.linkedin.com/in/yi-li-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#D2A554] transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </li>
                {/* 你可以在这里添加其他社交媒体链接 */}
              </ul>
            </div>

            {/* 右侧：致谢 */}
            <div>
              <h3 className="text-xl font-bold text-[#D2A554] mb-4">
                Acknowledgements
              </h3>
              <p className="text-gray-300 mb-4">
                Special thanks to Chris for the unwavering support and
                encouragement throughout this journey.
              </p>
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="flex items-center text-gray-300"
              >
                <span className="mr-2">With 💖 from</span>
                <span className="text-[#D2A554] font-semibold">
                  Darmstadt, Germany
                </span>
              </motion.div>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-2xl mr-2">🥨</span>
              <p className="text-gray-400">
                © {new Date().getFullYear()} Yi Li. All rights reserved.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-sm text-gray-500"
            >
              <span>
                Deep Learning Engineer· Vision & Robotics · Full-Stack AI
              </span>
            </motion.div>
          </div>
        </div>
      </footer>
    </main>
  );
}
