"use client";

import React from "react";
import ProjectCard, { Project } from "@/components/project-card";
import { motion } from "framer-motion";

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4"
      >
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </motion.div>
      
      {/* 没有项目时显示提示 */}
      {projects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400">No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;