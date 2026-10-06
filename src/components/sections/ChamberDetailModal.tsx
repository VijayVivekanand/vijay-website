"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { HeroChamber } from "./HeroChamber";
import { PublicationsSection } from "./PublicationsSection";
import { ExperienceSection } from "./ExperienceSection";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsMatrix } from "./SkillsMatrix";
import { AwardsSection } from "./AwardsSection";
import { X } from "lucide-react";

interface ChamberDetailModalProps {
  chamberId: string | null;
  onClose: () => void;
  onNavigateToChamber: (id: string) => void;
  onOpenTerminal: () => void;
  onOpenPreviewCV?: () => void;
  onTriggerAchievement: (id: string, title: string, desc: string) => void;
}

export const ChamberDetailModal: React.FC<ChamberDetailModalProps> = ({
  chamberId,
  onClose,
  onNavigateToChamber,
  onOpenTerminal,
  onOpenPreviewCV,
  onTriggerAchievement,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (chamberId) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chamberId, onClose]);

  if (!chamberId) return null;

  const renderContent = () => {
    switch (chamberId) {
      case "overview":
        return (
          <HeroChamber
            onNavigateTab={(idx) => {
              const ids = ["overview", "publications", "experience", "projects", "skills", "awards"];
              onNavigateToChamber(ids[idx] || "publications");
            }}
            onOpenTerminal={onOpenTerminal}
            onOpenPreviewCV={onOpenPreviewCV}
            onTriggerAchievement={onTriggerAchievement}
          />
        );
      case "publications":
        return <PublicationsSection onTriggerAchievement={onTriggerAchievement} />;
      case "experience":
        return <ExperienceSection />;
      case "projects":
        return <ProjectsSection />;
      case "skills":
        return <SkillsMatrix />;
      case "awards":
        return <AwardsSection onTriggerAchievement={onTriggerAchievement} />;
      default:
        return null;
    }
  };

  const getChamberMeta = () => {
    switch (chamberId) {
      case "overview":
        return { num: "01", name: "Embodied AI & Perception Core" };
      case "publications":
        return { num: "02", name: "Peer-Reviewed Research Publications" };
      case "experience":
        return { num: "03", name: "Engineering & Laboratory Experience" };
      case "projects":
        return { num: "04", name: "Academic & Systems Architecture" };
      case "skills":
        return { num: "05", name: "Technical Competency & Inventory" };
      case "awards":
        return { num: "06", name: "Honors & Competitive Commendations" };
      default:
        return { num: "01", name: "Research Dossier" };
    }
  };

  const meta = getChamberMeta();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl bg-[#0f151e] border border-[#223142] shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden my-auto"
      >
        {/* Modal Top Titlebar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141b26] border-b border-[#1f2b3a] select-none flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-400 px-2 py-0.5 rounded bg-[#1b2533] border border-[#263548]">
              {meta.num}
            </span>
            <span className="font-bold font-sans text-sm sm:text-base text-slate-100">
              {meta.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
              PRESS <kbd className="px-1.5 py-0.5 rounded bg-[#1a2330] border border-[#263548] text-slate-300 font-bold">ESC</kbd> TO CLOSE
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#18212e] hover:bg-[#222e3f] text-slate-400 hover:text-white border border-[#263548] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6">
          {renderContent()}
        </div>
      </motion.div>
    </div>
  );
};
