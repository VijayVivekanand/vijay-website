"use client";

import React, { useState } from "react";
import { PROFILE_DATA } from "@/data/profile";
import {
  Briefcase,
  Building,
  MapPin,
  Zap,
} from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(PROFILE_DATA.experience[0].id);
  const activeExp = PROFILE_DATA.experience.find((e) => e.id === selectedExpId) || PROFILE_DATA.experience[0];

  const handleSelectExp = (id: string) => {
    setSelectedExpId(id);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#131923] border border-[#1f2b3b]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-slate-400">
            ENGINEERING & RESEARCH TRACK RECORD
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-sans flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-slate-300" />
          Professional & Laboratory Experience
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
          Proven impact spanning edge AI pipelines, generative RAG systems, neuromorphic hardware
          accelerators, bio-mimetic control, and production time-series forecasting.
        </p>
      </div>

      {/* Main Experience Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Organization Cards */}
        <div className="lg:col-span-4 space-y-2.5">
          {PROFILE_DATA.experience.map((exp) => {
            const isSelected = selectedExpId === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => handleSelectExp(exp.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 select-none ${
                  isSelected
                    ? "bg-[#182230] border-[#384c64] shadow-md ring-1 ring-[#5294e2]/30"
                    : "bg-[#121822] border-[#1d2734] hover:bg-[#151d27] text-slate-400"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#18212c] text-slate-300 border border-[#263548]">
                    {exp.type}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{exp.period}</span>
                </div>

                <div className="mt-2">
                  <div className={`font-bold text-xs sm:text-sm ${isSelected ? "text-white" : "text-slate-200"}`}>
                    {exp.role}
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">{exp.organization}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </div>
                </div>

                {exp.advisor && (
                  <div className="mt-2 pt-2 border-t border-[#1d2938] text-[10px] font-mono text-slate-400">
                    Advisor: <span className="text-slate-300">{exp.advisor}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Operational Directives */}
        <div className="lg:col-span-8 rounded-2xl bg-[#131923] border border-[#1f2b3b] p-5 sm:p-6 space-y-5 shadow-lg">
          {/* Header of Active Role */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c2736] pb-3">
            <div>
              <div className="text-lg sm:text-xl font-bold text-white">{activeExp.role}</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-2 mt-0.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {activeExp.organization}
              </div>
            </div>
            <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400">
              <span className="text-slate-200 font-medium">{activeExp.period}</span>
              <span>{activeExp.location}</span>
            </div>
          </div>

          {/* Key Engineering Impact Points */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              KEY DELIVERABLES & TECHNICAL HIGHLIGHTS:
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {activeExp.points.map((pt) => (
                <div
                  key={pt.title}
                  className="p-3.5 rounded-xl bg-[#161f2a] border border-[#223040] space-y-1.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-slate-100 text-xs sm:text-sm flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      {pt.title}
                    </span>
                    {pt.metrics && (
                      <span className="px-2 py-0.5 rounded bg-[#1c2736] text-slate-300 text-[10px] font-mono font-medium border border-[#28374a] self-start sm:self-auto">
                        {pt.metrics}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans pl-5 sm:pl-5">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="pt-2 border-t border-[#1c2736]">
            <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase">
              Toolchains & Frameworks Deployed:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeExp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-lg bg-[#18212c] border border-[#243344] text-xs font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
