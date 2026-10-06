"use client";

import React from "react";
import { GantryChamberHub } from "@/components/robotic-arm/GantryChamberHub";
import { sound } from "@/lib/sound";
import { Bot, ArrowLeft, Terminal, AlertTriangle } from "lucide-react";

interface GeekModeViewProps {
  onOpenChamber: (chamberId: string) => void;
  onOpenTerminal: () => void;
  onExitGeekMode: () => void;
}

export const GeekModeView: React.FC<GeekModeViewProps> = ({
  onOpenChamber,
  onOpenTerminal,
  onExitGeekMode,
}) => {
  return (
    <div className="w-full flex flex-col justify-center space-y-5 pt-20 pb-12 animate-fade-in">
      {/* Aperture Mode Status Banner */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#121a24] border border-[#233345] shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#192433] border border-[#2c4056] flex items-center justify-center text-slate-300 font-bold font-mono text-xs">
              λ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-white font-mono tracking-tight">
                  APERTURE SCIENCE TESTING FACILITY ACTIVE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1c293a] text-slate-300 border border-[#2b3e55]">
                  GEEK MODE
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Robotic Gantry Manipulator synchronized with cursor position.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              onClick={() => {
                sound.playSteamClick();
                onOpenTerminal();
              }}
              className="px-3 py-1.5 rounded-xl bg-[#16212e] hover:bg-[#1f2d3d] text-slate-300 hover:text-white font-mono text-xs border border-[#26374a] transition-all flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>CLI Terminal</span>
            </button>

            <button
              onClick={() => {
                sound.playSteamClick();
                onExitGeekMode();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#223348] hover:bg-[#2d425c] text-white font-semibold text-xs border border-[#3a5375] shadow-sm transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-300" />
              <span>Exit Geek Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Robotic Hub (2 Left, Center Arm, 2 Right, 2 Bottom) */}
      <section aria-label="Portal 2 Robotic Arm Testing Apparatus" className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <GantryChamberHub
          onOpenChamber={onOpenChamber}
          onOpenTerminal={onOpenTerminal}
        />
      </section>
    </div>
  );
};
