// components/FloatingNavbar.tsx
"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { 
  IconHome, 
  IconUser, 
  IconDeviceDesktop, 
  IconSchool, 
  IconTools 
} from "@tabler/icons-react";

export function FloatingNavbar() {
  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <IconHome className="h-4 w-4 text-gray-300 hover:text-[#D2A554]" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4 text-gray-300 hover:text-[#D2A554]" />,
    },
    {
      name: "Projects",
      link: "#project",
      icon: <IconDeviceDesktop className="h-4 w-4 text-gray-300 hover:text-[#D2A554]" />,
    },
    {
      name: "Experience",
      link: "#experience",
      icon: <IconSchool className="h-4 w-4 text-gray-300 hover:text-[#D2A554]" />,
    },
    {
      name: "Skills",
      link: "#skill",
      icon: <IconTools className="h-4 w-4 text-gray-300 hover:text-[#D2A554]" />,
    },
  ];
  
  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}

export default FloatingNavbar;