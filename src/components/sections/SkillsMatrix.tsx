"use client";

import React, { useState } from "react";
import { PROFILE_DATA } from "@/data/profile";
import { sound } from "@/lib/sound";
import {
  Zap,
  Cpu,
  Brain,
  Sliders,
  Code2,
} from "lucide-react";

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes("learning") || category.toLowerCase().includes("ai")) {
      return Brain;
    }
    if (category.toLowerCase().includes("hardware") || category.toLowerCase().includes("embedded")) {
      return Cpu;
    }
    if (category.toLowerCase().includes("robotics") || category.toLowerCase().includes("control")) {
      return Sliders;
    }
    return Code2;
  };

  const categories = [
    { id: "all", label: "All Toolchains" },
    ...PROFILE_DATA.skills.map((s) => ({ id: s.category, label: s.category })),
  ];

  const filteredCategories =
    selectedCategory === "all"
      ? PROFILE_DATA.skills
      : PROFILE_DATA.skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#131923] border border-[#1f2b3b]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-slate-400">
              TECHNICAL COMPETENCY MATRIX
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans flex items-center gap-2">
            <Zap className="w-5 h-5 text-slate-300" />
            Skills & Hardware Toolchains
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Cross-disciplinary proficiency spanning AI algorithms, neuromorphic edge hardware,
            control theory, robotics simulation, and full-stack software development.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 sm:max-w-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playSteamClick();
                setSelectedCategory(c.id);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === c.id
                  ? "bg-[#25364a] text-white font-bold border border-[#3b516e]"
                  : "bg-[#161f2a] text-slate-400 hover:text-slate-200 border border-[#223040]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCategories.map((group) => {
          const Icon = getCategoryIcon(group.category);

          return (
            <div
              key={group.category}
              className="rounded-2xl bg-[#131923] border border-[#1f2b3b] p-5 space-y-4 shadow-md"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-[#1c2736] pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#18212c] border border-[#263548] flex items-center justify-center text-slate-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base font-sans">
                    {group.category}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {group.items.length} Modules
                </span>
              </div>

              {/* Skills List */}
              <div className="space-y-2.5">
                {group.items.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200">{skill.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Proficient" : "Advanced"}
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-1.5 rounded-full bg-[#18212c] border border-[#222f3e] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-slate-400 transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
