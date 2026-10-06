"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/data/profile";
import { sound } from "@/lib/sound";
import {
  Cpu,
  GraduationCap,
  ExternalLink,
  Download,
  Eye,
  Terminal,
  CheckCircle2,
} from "lucide-react";

interface HeroChamberProps {
  onNavigateTab: (index: number) => void;
  onOpenTerminal: () => void;
  onOpenPreviewCV?: () => void;
  onTriggerAchievement: (id: string, title: string, desc: string) => void;
}

export const HeroChamber: React.FC<HeroChamberProps> = ({
  onNavigateTab,
  onOpenTerminal,
  onOpenPreviewCV,
  onTriggerAchievement,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Header Profile Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-[#131923] border border-[#1f2b3b] p-6 sm:p-7 shadow-lg space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c2736] pb-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Curriculum Vitae · Executive Profile
          </span>
          <span className="text-xs font-mono text-slate-400">
            Pittsburgh, PA · +1-412-726-4553
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-sans">
            Vijay Shankaran Vivekanand
          </h1>

          <div className="text-sm font-mono text-slate-300 font-medium">
            Embodied AI | Robot Perception | Adaptive Control
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            {PROFILE_DATA.bio}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playSteamClick();
                onNavigateTab(1);
              }}
              className="px-4 py-2 rounded-xl bg-[#202d3e] hover:bg-[#2b3c52] text-slate-100 font-semibold text-xs border border-[#33465e] transition-all flex items-center gap-2"
            >
              <Cpu className="w-3.5 h-3.5 text-slate-300" />
              <span>Publications (5)</span>
            </button>

            {/* View / Preview CV */}
            <button
              onClick={() => {
                sound.playSteamClick();
                if (onOpenPreviewCV) {
                  onOpenPreviewCV();
                } else {
                  window.open("/Vijay_Shankaran_Vivekanand_CV.pdf", "_blank");
                }
              }}
              className="px-4 py-2 rounded-xl bg-[#223348] hover:bg-[#2e4460] text-slate-100 font-semibold text-xs border border-[#3d5779] shadow-sm transition-all flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5 text-slate-300" />
              <span>Preview CV</span>
            </button>

            {/* Direct Download CV */}
            <a
              href="/Vijay_Shankaran_Vivekanand_CV.pdf"
              download="Vijay_Shankaran_Vivekanand_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                sound.playSteamClick();
                onTriggerAchievement(
                  "cv_acquired",
                  "Curriculum Vitae Retrieved",
                  "Downloaded official CV for Vijay Shankaran Vivekanand"
                );
              }}
              className="px-4 py-2 rounded-xl bg-[#17212e] hover:bg-[#202d3e] text-slate-200 font-semibold text-xs border border-[#27374b] transition-all flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Download PDF</span>
            </a>

            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playSteamClick()}
              className="px-4 py-2 rounded-xl bg-[#17212e] hover:bg-[#202d3e] text-slate-300 hover:text-white font-medium text-xs border border-[#27374b] transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={() => {
                sound.playSteamClick();
                onOpenTerminal();
              }}
              className="px-3.5 py-2 rounded-xl bg-[#121822] hover:bg-[#1a2330] text-slate-400 hover:text-slate-200 font-mono text-xs border border-[#223042] transition-all flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI Terminal</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {PROFILE_DATA.stats.map((stat, i) => (
          <div
            key={stat.label}
            className="p-3.5 rounded-xl bg-[#131923] border border-[#1f2b3b] space-y-1"
          >
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              {stat.label}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-xs font-mono text-slate-400">
                  {stat.unit}
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 leading-tight">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Research Pillars & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Research Core Focus Card */}
        <div className="lg:col-span-2 rounded-2xl bg-[#131923] border border-[#1f2b3b] p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1c2736] pb-2.5">
            <h3 className="font-bold text-slate-100 text-sm sm:text-base">
              Research Interests & Core Focus
            </h3>
            <span className="text-xs font-mono text-slate-400">Pillars</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {PROFILE_DATA.researchInterests.map((interest) => (
              <div
                key={interest}
                className="p-3 rounded-xl bg-[#161f2a] border border-[#223040] flex items-start gap-2 text-xs text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{interest}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="rounded-2xl bg-[#131923] border border-[#1f2b3b] p-5 space-y-3">
          <div className="flex items-center gap-2 border-b border-[#1c2736] pb-2.5">
            <GraduationCap className="w-4 h-4 text-slate-300" />
            <h3 className="font-bold text-slate-100 text-sm sm:text-base">
              Education
            </h3>
          </div>

          <div className="space-y-3 pt-1">
            {PROFILE_DATA.education.map((edu) => (
              <div
                key={edu.institution}
                className="p-3 rounded-xl bg-[#161f2a] border border-[#223040] space-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="font-bold text-slate-100 text-xs">{edu.institution}</div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {edu.period}
                  </span>
                </div>
                <div className="text-xs text-slate-300">{edu.degree}</div>
                {edu.gpa && (
                  <div className="text-[11px] text-slate-400 font-mono">
                    CGPA: <span className="text-slate-200 font-bold">{edu.gpa}</span>
                  </div>
                )}
                {edu.specialization && (
                  <div className="text-[11px] text-slate-400 font-mono">
                    Specialization: {edu.specialization}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
