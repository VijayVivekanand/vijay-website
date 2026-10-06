"use client";

import React from "react";
import { PROFILE_DATA } from "@/data/profile";
import {
  Layers,
  Cpu,
  Lock,
  Compass,
  Zap,
  Activity,
  ExternalLink,
} from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const getProjectIcon = (id: string) => {
    switch (id) {
      case "autonomous_sensorimotor_cpg":
        return Activity;
      case "dnf_accelerator_vlsi":
      case "silicon_cochlea":
        return Cpu;
      case "bursting_cpg_loihi":
      case "frame_of_events_stereo":
        return Zap;
      case "chaos_cryptography":
        return Lock;
      case "lqr_inverted_pendulum":
        return Compass;
      default:
        return Layers;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#131923] border border-[#1f2b3b]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-slate-400">
            SYSTEM ARCHITECTURE & PROTOTYPES
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-sans flex items-center gap-2">
          <Layers className="w-5 h-5 text-slate-300" />
          Academic & Systems Projects
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
          Specialized implementations combining neuromorphic hardware design, chaotic cryptography,
          and robust linear-quadratic optimal control theory.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROFILE_DATA.projects.map((proj) => {
          const Icon = getProjectIcon(proj.id);

          return (
            <div
              key={proj.id}
              className="rounded-2xl bg-[#131923] border border-[#1f2b3b] hover:border-[#2f4055] p-5 flex flex-col justify-between transition-all duration-200 shadow-md space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#18212c] text-slate-300 border border-[#263548]">
                    {proj.category}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#18212c] border border-[#243346] flex items-center justify-center text-slate-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-100 text-sm sm:text-base leading-snug font-sans">
                    {proj.title}
                  </h3>
                  {proj.metrics && (
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      Metric: {proj.metrics}
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {proj.description}
                </p>

                {/* Details */}
                {proj.details && (
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      Highlights:
                    </div>
                    {proj.details.map((h) => (
                      <div
                        key={h}
                        className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-snug"
                      >
                        <span className="text-slate-400 font-mono">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags & Action Link */}
              <div className="pt-3 border-t border-[#1a2533] space-y-2">
                {proj.tags && (
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18212c] border border-[#243344] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {proj.link && (
                  <div className="pt-1 flex justify-end">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-steam-blue hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Paper / DOI
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
