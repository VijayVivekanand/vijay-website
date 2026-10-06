"use client";

import React from "react";
import { PROFILE_DATA } from "@/data/profile";
import {
  Award,
  Trophy,
  Star,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";

interface AwardsSectionProps {
  onTriggerAchievement?: (id: string, title: string, desc: string) => void;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({
  onTriggerAchievement,
}) => {
  const triggerConfetti = (awardTitle: string) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#6d86a2", "#5294e2", "#cbd5e1", "#ffffff"],
    });

    if (onTriggerAchievement) {
      onTriggerAchievement(
        "award_inspected",
        "Achievement Commendation",
        `Reviewed honor: ${awardTitle}`
      );
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#131923] border border-[#1f2b3b]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-slate-400">
            HONORS & COMPETITIVE COMMENDATIONS
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-sans flex items-center gap-2">
          <Award className="w-5 h-5 text-slate-300" />
          Honors & Achievements
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
          Recognitions across venture showcases, company engineering excellence, academic
          scholarships, and national robotics challenges.
        </p>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROFILE_DATA.awards.map((award) => (
          <div
            key={award.id}
            onClick={() => triggerConfetti(award.title)}
            className="p-5 rounded-2xl bg-[#131923] border border-[#1f2b3b] hover:border-[#2f4055] transition-all duration-200 cursor-pointer select-none space-y-3 shadow-md group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#18212c] border border-[#263548] flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-100 text-sm sm:text-base leading-tight font-sans group-hover:text-white transition-colors">
                    {award.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{award.organization}</div>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-slate-300 px-2 py-0.5 rounded bg-[#18212c] border border-[#263548]">
                {award.year}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {award.description}
            </p>

            <div className="pt-2 border-t border-[#1a2533] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-slate-400" />
                Verified Commendation
              </span>
              <span className="text-slate-400 group-hover:text-slate-200">
                Click to inspect
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
