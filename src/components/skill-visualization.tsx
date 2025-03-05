"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { 
  IconBrandPython, 
  IconBrandDocker, 
  IconBrandNextjs, 
  IconBrandVue,
  IconBrandTailwind,
  IconDatabase,
  IconBrandFigma,
  IconBrandOpenai,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandHtml5,
  IconBrandCss3,
  IconWorld,
  IconCode
} from "@tabler/icons-react";

// 动态导入Nivo组件，避免SSR问题
const ResponsivePie = dynamic(() => import('@nivo/pie').then(mod => mod.ResponsivePie), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading chart...</div>
});

const ResponsiveBar = dynamic(() => import('@nivo/bar').then(mod => mod.ResponsiveBar), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading chart...</div>
});

const ResponsiveNetwork = dynamic(() => import('@nivo/network').then(mod => mod.ResponsiveNetwork), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">Loading skills network...</div>
});

// 技术Logo网格展示
export const TechLogoGrid: React.FC = () => {
  const technologies = [
    { name: "PyTorch", icon: "/logos/pytorch.png", type: "AI" },
    { name: "TensorFlow", icon: "/logos/tensorflow.png", type: "AI" },
    { name: "Docker", icon: <IconBrandDocker />, type: "DevOps" },
    { name: "FastAPI", icon: "/logos/fastapi.png", type: "Backend" },
    { name: "Next.js", icon: <IconBrandNextjs />, type: "Frontend" },
    { name: "Vue", icon: <IconBrandVue />, type: "Frontend" },
    { name: "Streamlit", icon: "/logos/streamlit.png", type: "Data" },
    { name: "OpenCV", icon: "/logos/opencv.png", type: "Computer Vision" },
    { name: "JavaScript", icon: <IconBrandJavascript />, type: "Frontend" },
    { name: "TypeScript", icon: <IconBrandTypescript />, type: "Frontend" },
    { name: "Tailwind", icon: <IconBrandTailwind />, type: "Frontend" },
    { name: "SQLite", icon: <IconDatabase />, type: "Database" },
  ];

  return (
    <div className="h-full flex flex-col bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 flex-grow">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center justify-center bg-white/10 rounded-lg p-2 hover:bg-white/15 transition-all"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              {typeof tech.icon === 'string' ? (
                <Image 
                  src={tech.icon} 
                  alt={tech.name} 
                  width={48} 
                  height={48} 
                  className="object-contain"
                />
              ) : (
                React.cloneElement(tech.icon as React.ReactElement, { 
                  size: 36, 
                  className: "text-[#C19A49]" 
                })
              )}
            </div>
            <p className="text-xs md:text-sm font-medium mt-2 text-center text-white/80">{tech.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 数据科学能力饼图
export const DataSciencePieChart: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = [
    { id: "Data Processing", value: 30, color: "#A67C3D" },
    { id: "Machine Learning", value: 25, color: "#B08642" },
    { id: "Data Visualization", value: 20, color: "#C19A49" },
    { id: "Statistical Analysis", value: 15, color: "#D2A554" },
    { id: "Data Engineering", value: 10, color: "#D7B672" }
  ];

  if (!isMounted) return (
    <div className="h-full flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <p className="text-white/70">Loading data science chart...</p>
    </div>
  );

  return (
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
      <div style={{ height: '100%', minHeight: '300px' }}>
        <ResponsivePie
          data={data}
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ datum: 'data.color' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#ffffff"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true
            },
          ]}
          fill={[
            { match: { id: 'Data Processing' }, id: 'dots' },
          ]}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 25,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#ffffff',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 14,
              symbolShape: 'circle',
            }
          ]}
        />
      </div>
    </div>
  );
};

// AI能力条形图
export const AICapabilitiesChart: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = [
    { skill: "Deep Learning", value: 95, color: "#B08642" },
    { skill: "Computer Vision", value: 90, color: "#C19A49" },
    { skill: "AIGC", value: 85, color: "#D2A554" },
    { skill: "NLP", value: 80, color: "#D7B672" },
    { skill: "Industrial AI", value: 88, color: "#A67C3D" }
  ];

  if (!isMounted) return (
    <div className="h-full flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <p className="text-white/70">Loading AI capabilities chart...</p>
    </div>
  );

  return (
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
      <div style={{ height: '100%', minHeight: '300px' }}>
        <ResponsiveBar
          data={data}
          keys={['value']}
          indexBy="skill"
          margin={{ top: 20, right: 30, bottom: 50, left: 65 }}
          padding={0.3}
          layout="horizontal"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={({ data }) => data.color}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Proficiency (%)',
            legendPosition: 'middle',
            legendOffset: 40,
            truncateTickAt: 0
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'AI Skills',
            legendPosition: 'middle',
            legendOffset: -55,
            truncateTickAt: 0
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: "#ffffff"
                }
              },
              legend: {
                text: {
                  fill: "#ffffff"
                }
              }
            },
            grid: {
              line: {
                stroke: "#444444"
              }
            }
          }}
        />
      </div>
    </div>
  );
};

// 技能网络图数据
const skillsNetworkData = {
  nodes: [
    {
      id: "AI",
      height: 2,
      size: 24,
      color: "#B08642"
    },
    {
      id: "Deep Learning",
      height: 1.8,
      size: 20,
      color: "#B08642"
    },
    {
      id: "PyTorch",
      height: 1.6,
      size: 18,
      color: "#C19A49"
    },
    {
      id: "Computer Vision",
      height: 1.7,
      size: 18,
      color: "#B08642"
    },
    {
      id: "NLP",
      height: 1.5,
      size: 16,
      color: "#D2A554"
    },
    {
      id: "OpenCV",
      height: 1.4,
      size: 14,
      color: "#C19A49"
    },
    {
      id: "Data Science",
      height: 1.7,
      size: 20,
      color: "#D7B672"
    },
    {
      id: "Pandas",
      height: 1.5,
      size: 16,
      color: "#D7B672"
    },
    {
      id: "Scikit-learn",
      height: 1.5,
      size: 16,
      color: "#D7B672"
    },
    {
      id: "Data Viz",
      height: 1.6,
      size: 16,
      color: "#D7B672"
    },
    {
      id: "Streamlit",
      height: 1.3,
      size: 14,
      color: "#D7B672"
    },
    {
      id: "Development",
      height: 1.7,
      size: 18,
      color: "#A67C3D"
    },
    {
      id: "FastAPI",
      height: 1.5,
      size: 14,
      color: "#A67C3D"
    },
    {
      id: "Docker",
      height: 1.6,
      size: 16,
      color: "#A67C3D"
    },
    {
      id: "Next.js",
      height: 1.3,
      size: 14,
      color: "#A67C3D"
    },
    {
      id: "Vue.js",
      height: 1.3,
      size: 14,
      color: "#A67C3D"
    },
    {
      id: "Creative",
      height: 1.6,
      size: 16,
      color: "#BF9146"
    },
    {
      id: "AIGC",
      height: 1.5,
      size: 14,
      color: "#BF9146"
    },
    {
      id: "Design",
      height: 1.3,
      size: 12,
      color: "#BF9146"
    },
    {
      id: "Photography",
      height: 1.2,
      size: 12,
      color: "#BF9146"
    }
  ],
  links: [
    {
      source: "AI",
      target: "Deep Learning",
      distance: 80
    },
    {
      source: "AI",
      target: "Computer Vision",
      distance: 80
    },
    {
      source: "AI",
      target: "NLP",
      distance: 80
    },
    {
      source: "Deep Learning",
      target: "PyTorch",
      distance: 50
    },
    {
      source: "Computer Vision",
      target: "OpenCV",
      distance: 50
    },
    {
      source: "Computer Vision",
      target: "PyTorch",
      distance: 70
    },
    {
      source: "AI",
      target: "Data Science",
      distance: 100
    },
    {
      source: "Data Science",
      target: "Pandas",
      distance: 50
    },
    {
      source: "Data Science",
      target: "Scikit-learn",
      distance: 50
    },
    {
      source: "Data Science",
      target: "Data Viz",
      distance: 50
    },
    {
      source: "Data Viz",
      target: "Streamlit",
      distance: 40
    },
    {
      source: "AI",
      target: "Development",
      distance: 120
    },
    {
      source: "Development",
      target: "FastAPI",
      distance: 50
    },
    {
      source: "Development",
      target: "Docker",
      distance: 50
    },
    {
      source: "Development",
      target: "Next.js",
      distance: 50
    },
    {
      source: "Development",
      target: "Vue.js",
      distance: 50
    },
    {
      source: "AI",
      target: "Creative",
      distance: 130
    },
    {
      source: "Creative",
      target: "AIGC",
      distance: 50
    },
    {
      source: "Creative",
      target: "Design",
      distance: 50
    },
    {
      source: "Creative",
      target: "Photography",
      distance: 50
    },
    {
      source: "Deep Learning",
      target: "AIGC",
      distance: 80
    }
  ]
};

// 技能网络图组件
export const SkillsNetworkGraph: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-full flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-lg p-4">
        <p className="text-white/70">Loading skills network visualization...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
      <div style={{ height: '100%', minHeight: '400px' }}>
        <ResponsiveNetwork
          data={skillsNetworkData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          linkDistance={e => e.distance}
          centeringStrength={0.3}
          repulsivity={6}
          nodeSize={n => n.size}
          activeNodeSize={n => 1.5 * n.size}
          nodeColor={e => e.color}
          nodeBorderWidth={1}
          nodeBorderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                0.8
              ]
            ]
          }}
          linkThickness={n => 2 + 2 * n.target.height}
          linkBlendMode="multiply"
          motionConfig="wobbly"
        />
      </div>
    </div>
  );
};

// 语言能力组件
export const LanguageSkills: React.FC = () => {
  // 自然语言
  const naturalLanguages = [
    { name: "English", level: "Professional", flag: "🇬🇧", proficiency: 90 },
    { name: "German", level: "Intermediate", flag: "🇩🇪", proficiency: 65 },
    { name: "Chinese", level: "Native", flag: "🇨🇳", proficiency: 100 }
  ];

  // 编程语言
  const programmingLanguages = [
    { name: "Python", icon: <IconBrandPython />, proficiency: 95 },
    { name: "JavaScript", icon: <IconBrandJavascript />, proficiency: 85 },
    { name: "TypeScript", icon: <IconBrandTypescript />, proficiency: 80 },
    { name: "HTML/CSS", icon: <IconBrandHtml5 />, proficiency: 85 }
  ];

  return (
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-lg p-4 flex flex-col">
      {/* 自然语言 */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-[#C19A49] flex items-center mb-2">
          <IconWorld className="mr-2" size={18} />
          Natural Languages
        </h3>
        <div className="space-y-3">
          {naturalLanguages.map(lang => (
            <div key={lang.name} className="bg-white/10 rounded-lg p-2">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </div>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  {lang.level}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <motion.div 
                  className="h-1.5 rounded-full bg-[#D2A554]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.proficiency}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 编程语言 */}
      <div>
        <h3 className="text-base font-bold text-[#C19A49] flex items-center mb-2">
          <IconCode className="mr-2" size={18} />
          Programming Languages
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {programmingLanguages.map(lang => (
            <div key={lang.name} className="bg-white/10 rounded-lg p-2">
              <div className="flex items-center mb-1">
                {React.cloneElement(lang.icon, { size: 18, className: "mr-2 text-[#C19A49]" })}
                <span className="text-sm font-medium">{lang.name}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <motion.div 
                  className="h-1.5 rounded-full bg-[#B08642]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.proficiency}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 创意工具组件
export const CreativeTools: React.FC = () => {
  const creativeTools = [
    { name: "Photography", icon: "📷", description: "Sony A7M4", category: "Visual" },
    { name: "ComfyUI", icon: "🧠", description: "SDXL, Flux", category: "AIGC" },
    { name: "DaVinci", icon: "🎬", description: "Video Editing", category: "Media" },
    { name: "Figma", icon: <IconBrandFigma />, description: "UI Design", category: "Design" },
    { name: "Photoshop", icon: "🎨", description: "Image Editing", category: "Design" },
    { name: "Lightroom", icon: "📸", description: "Photo Editing", category: "Visual" }
  ];

  return (
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {creativeTools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center"
          >
            <div className="mb-2 text-2xl">
              {typeof tool.icon === 'string' ? (
                <span>{tool.icon}</span>
              ) : (
                React.cloneElement(tool.icon as React.ReactElement, { 
                  size: 24, 
                  className: "text-[#C19A49]" 
                })
              )}
            </div>
            <h3 className="text-sm font-bold text-[#C19A49]">{tool.name}</h3>
            <div className="mt-1 px-2 py-0.5 rounded-full bg-white/10 text-xs">
              {tool.category}
            </div>
            <p className="text-xs mt-1 text-white/70">{tool.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 组织影响力组件
export const OrganizationalImpact: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const impactData = [
    { category: "Events", value: 100, description: "Event Participants" },
    { category: "Communities", value: 3, description: "Communities Built" },
    { category: "Projects", value: 12, description: "Cross-disciplinary Projects" },
    { category: "Teams", value: 8, description: "Teams Led" }
  ];

  if (!isMounted) {
    return (
      <div className="h-full flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-lg p-4">
        <p className="text-white/70">Loading impact data...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <div className="grid grid-cols-2 gap-3">
        {impactData.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.3 + index * 0.1 
              }}
              className="w-16 h-16 rounded-full flex items-center justify-center mb-2 font-bold text-white text-xl"
              style={{ 
                background: `conic-gradient(#B08642 ${item.value > 100 ? 100 : item.value}%, transparent 0)` 
              }}
            >
              <span className="bg-gray-900 rounded-full w-14 h-14 flex items-center justify-center">
                {item.value}+
              </span>
            </motion.div>
            <h3 className="text-sm font-medium text-white/90">{item.category}</h3>
            <p className="text-xs text-white/70 text-center">{item.description}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
        <h3 className="text-sm font-bold text-[#B08642] mb-2">Key Soft Skills</h3>
        <div className="flex flex-wrap gap-2">
          {["Cross-cultural Communication", "Event Planning", "Team Leadership", "Project Management"].map((skill) => (
            <span key={skill} className="text-xs bg-white/20 px-2 py-1 rounded-full text-white/80">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// AI生成电脑图片展示
export const AIGeneratedComputer: React.FC = () => {
  return (
    <div className="h-full p-4 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-lg">
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateZ: [-2, 2, -2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="relative"
      >
        <Image
          src="/computer.png"
          alt="AI Generated Computer"
          width={200}
          height={200}
          className="object-contain"
        />
        <motion.div
          className="absolute -top-4 -right-4"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <IconBrandOpenai size={28} className="text-[#C19A49]" />
        </motion.div>
      </motion.div>
    </div>
  );
};