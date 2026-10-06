"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { PortalArm } from "./PortalArm";
import {
  Cpu,
  BookOpen,
  Briefcase,
  Layers,
  Award,
  Zap,
  Activity,
  Maximize2,
  MousePointer,
  ChevronRight,
} from "lucide-react";

export interface ChamberItem {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  metric: string;
}

export const LEFT_CHAMBERS: ChamberItem[] = [
  {
    id: "overview",
    number: "01",
    name: "Embodied AI & Perception",
    subtitle: "Research core, executive profile, and academic foundation",
    icon: Cpu,
    metric: "Pitt ECE · M.S. Systems",
  },
  {
    id: "publications",
    number: "02",
    name: "Peer-Reviewed Publications",
    subtitle: "5 papers across Frontiers, IEEE VLSI, ACM ICONS & ICARA",
    icon: BookOpen,
    metric: "5 Papers · Neuromorphic",
  },
];

export const RIGHT_CHAMBERS: ChamberItem[] = [
  {
    id: "experience",
    number: "03",
    name: "Engineering & Lab Experience",
    subtitle: "COI Energy (AI Engineer) & Pitt ENIGMA Lab (Research)",
    icon: Briefcase,
    metric: "211 FPS CMOS · Gemini RAG",
  },
  {
    id: "projects",
    number: "04",
    name: "Academic System Projects",
    subtitle: "Silicon Cochlea simulation, Chaos cryptography, LQR control",
    icon: Layers,
    metric: "SNN Audio · NIST Entropy",
  },
];

export const BOTTOM_CHAMBERS: ChamberItem[] = [
  {
    id: "skills",
    number: "05",
    name: "Technical Competency Matrix",
    subtitle: "Neuromorphic systems (Loihi, DVS), PyTorch, ROS, control theory",
    icon: Zap,
    metric: "AI + Robotics + Hardware",
  },
  {
    id: "awards",
    number: "06",
    name: "Honors & Achievements",
    subtitle: "TechCrunch Disrupt '25 Finalist, Employee of Year, MRD Scholarship",
    icon: Award,
    metric: "National & Industry Honors",
  },
];

interface GantryChamberHubProps {
  onOpenChamber: (chamberId: string) => void;
  onOpenTerminal?: () => void;
}

export const GantryChamberHub: React.FC<GantryChamberHubProps> = ({
  onOpenChamber,
  onOpenTerminal,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 500, y: 350 });
  const [hoveredChamberId, setHoveredChamberId] = useState<string | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    const svgX = Math.max(50, Math.min(950, relX * 1000));
    const svgY = Math.max(80, Math.min(500, relY * 520));

    setCursorPos({ x: svgX, y: svgY });
  }, []);

  const handleCardClick = (chamber: ChamberItem) => {
    onOpenChamber(chamber.id);
  };

  const handleCardHover = (chamber: ChamberItem, customTarget?: { x: number; y: number }) => {
    setHoveredChamberId(chamber.id);
    if (customTarget) {
      setCursorPos(customTarget);
    }
  };

  const renderChamberCard = (chamber: ChamberItem, customSvgCoords: { x: number; y: number }) => {
    const isHovered = hoveredChamberId === chamber.id;
    const Icon = chamber.icon;

    return (
      <motion.button
        key={chamber.id}
        onClick={() => handleCardClick(chamber)}
        onMouseEnter={() => handleCardHover(chamber, customSvgCoords)}
        onMouseLeave={() => setHoveredChamberId(null)}
        whileHover={{ scale: 1.015, y: -2 }}
        whileTap={{ scale: 0.985 }}
        className={`relative w-full flex flex-col justify-between p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 font-sans border overflow-hidden group shadow-md ${
          isHovered
            ? "bg-[#16212e] border-[#3d5470] shadow-[0_4px_20px_rgba(0,0,0,0.5)] ring-1 ring-[#5294e2]/40"
            : "bg-[#111720]/95 hover:bg-[#141c27] border-[#1d2938] hover:border-[#2b3c50]"
        }`}
      >
        {/* Subtle Top Accent Trim */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 transition-all ${
            isHovered ? "bg-[#5294e2]" : "bg-[#1c2838] group-hover:bg-[#2d3f54]"
          }`}
        />

        {/* Card Header */}
        <div className="flex items-start justify-between w-full mb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-400 px-2 py-0.5 rounded bg-[#16202c] border border-[#233142]">
              {chamber.number}
            </span>
          </div>

          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              isHovered
                ? "bg-[#1f2d3d] text-slate-100"
                : "bg-[#161f2a] text-slate-400 group-hover:text-slate-200"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card Body */}
        <div>
          <div className="font-bold text-slate-100 text-sm sm:text-base leading-snug group-hover:text-white transition-colors">
            {chamber.name}
          </div>
          <div className="text-xs text-slate-400 font-sans mt-1 leading-relaxed line-clamp-2">
            {chamber.subtitle}
          </div>
        </div>

        {/* Bottom Metric & Action */}
        <div className="mt-3.5 pt-2.5 border-t border-[#1a2533] flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400 truncate max-w-[150px]">
            {chamber.metric}
          </span>
          <span
            className={`font-medium flex items-center gap-1 transition-colors ${
              isHovered ? "text-slate-200" : "text-slate-500 group-hover:text-slate-300"
            }`}
          >
            <span>Details</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </motion.button>
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full rounded-3xl bg-[#0d131b] border border-[#1b2635] shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-4 sm:p-6 overflow-hidden select-none"
    >
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none" />

      {/* Main 3-Column Layout: Left Vertical Stack, Center Stage Arm, Right Vertical Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch relative z-10">
        {/* 1. Left Vertical Stack (2 Options) */}
        <div className="lg:col-span-3 flex flex-col justify-center gap-3.5 order-2 lg:order-1">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider px-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Research & Publications
          </div>
          {LEFT_CHAMBERS.map((ch, idx) =>
            renderChamberCard(ch, { x: 140, y: idx === 0 ? 180 : 380 })
          )}
        </div>

        {/* 2. Center Stage: Precision Robotic Manipulator & Stage */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[440px] relative order-1 lg:order-2 rounded-2xl bg-[#090e14]/90 border border-[#17212d] p-2 overflow-hidden">
          {/* Top Status */}
          <div className="w-full flex items-center justify-between px-4 py-2 border-b border-[#151f2b] text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2 text-slate-300">
              <Activity className="w-3.5 h-3.5 text-slate-400" />
              <span>Robotic Kinematics Simulation</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MousePointer className="w-3 h-3" />
              <span>Interactive Cursor Tracking</span>
            </div>
          </div>

          {/* Central Portal Arm Component */}
          <div className="w-full h-full flex-1 flex items-center justify-center">
            <PortalArm
              cursorPos={cursorPos}
              targetedChamberId={hoveredChamberId}
            />
          </div>

          {/* Bottom Guidance */}
          <div className="w-full py-2 px-4 border-t border-[#151f2b] flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Hover to articulate manipulator</span>
            <span className="text-slate-300">Click card to open modal</span>
          </div>
        </div>

        {/* 3. Right Vertical Stack (2 Options) */}
        <div className="lg:col-span-3 flex flex-col justify-center gap-3.5 order-3 lg:order-3">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider px-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Experience & Systems
          </div>
          {RIGHT_CHAMBERS.map((ch, idx) =>
            renderChamberCard(ch, { x: 860, y: idx === 0 ? 180 : 380 })
          )}
        </div>
      </div>

      {/* 4. Bottom Horizontal Stack (2 Options centered) */}
      <div className="mt-5 pt-4 border-t border-[#17212d] relative z-10">
        <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Technical Matrix & Honors
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {BOTTOM_CHAMBERS.map((ch, idx) =>
            renderChamberCard(ch, { x: idx === 0 ? 320 : 680, y: 480 })
          )}
        </div>
      </div>
    </div>
  );
};
