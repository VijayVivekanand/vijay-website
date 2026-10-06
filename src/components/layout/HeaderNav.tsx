"use client";

import React from "react";
import {
  Mail,
  Terminal,
  Activity,
  Cpu,
} from "lucide-react";

interface HeaderNavProps {
  onOpenTerminal?: () => void;
  onOpenContact?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenTerminal,
  onOpenContact,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d131a]/95 backdrop-blur-md border-b border-[#1b2634] shadow-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#141b24] border border-[#263548] flex items-center justify-center shadow-inner">
            <Cpu className="w-4 h-4 text-slate-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-slate-100 text-sm sm:text-base leading-none font-sans">
              Vijay Shankaran Vivekanand
            </span>
            <span className="text-[11px] text-slate-400 font-mono leading-none mt-1">
              Embodied AI · Robot Perception · Adaptive Control
            </span>
          </div>
        </div>

        {/* Right: User status badge, Terminal, and Transmit button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#131a24] border border-[#1f2c3d] text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
            <span>Robotics Research Lab</span>
          </div>

          {/* Terminal Launcher */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              title="Open CLI Terminal"
              className="px-2.5 py-1.5 rounded-lg bg-[#141b24] hover:bg-[#1b2533] text-slate-300 hover:text-white border border-[#243346] transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">CLI</span>
            </button>
          )}

          {/* Contact / Transmit Button */}
          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="px-3.5 py-1.5 rounded-lg bg-[#202c3c] hover:bg-[#2b3a4e] text-slate-100 hover:text-white font-semibold text-xs transition-all flex items-center gap-1.5 border border-[#33465e] font-sans"
            >
              <Mail className="w-3.5 h-3.5 text-slate-300" />
              <span>Contact</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
