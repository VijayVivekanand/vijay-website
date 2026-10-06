"use client";

import React, { useState, useRef, useEffect } from "react";
import { PROFILE_DATA } from "@/data/profile";
import { Terminal, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";

interface ApertureTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAchievement?: (id: string, title: string, desc: string) => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const ApertureTerminal: React.FC<ApertureTerminalProps> = ({
  isOpen,
  onClose,
  onTriggerAchievement,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "init",
      command: "init aperture-os --user vijay",
      output: (
        <div className="text-emerald-400 space-y-1">
          <div>============================================================</div>
          <div className="font-bold text-white">APERTURE SCIENCE v4.2.0-STABLE (x86_64-robotics)</div>
          <div>Terminal Connection Established. Welcome, Researcher.</div>
          <div>Type <span className="text-amber-300 font-bold">&apos;help&apos;</span> to inspect available diagnostics.</div>
          <div>============================================================</div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
      case "commands":
        output = (
          <div className="space-y-1 text-slate-300">
            <div className="text-amber-400 font-bold">AVAILABLE DIAGNOSTIC COMMANDS:</div>
            <div>• <span className="text-steam-blue font-bold">about / bio</span> : Overview of Vijay & research focus</div>
            <div>• <span className="text-steam-blue font-bold">papers / pubs</span> : List 5 peer-reviewed publications</div>
            <div>• <span className="text-steam-blue font-bold">exp / work</span> : View industry & lab engineering logs</div>
            <div>• <span className="text-steam-blue font-bold">skills / stack</span> : Output technical inventory & hardware</div>
            <div>• <span className="text-steam-blue font-bold">awards</span> : Display competitive honors & medals</div>
            <div>• <span className="text-steam-blue font-bold">contact</span> : Transmit communication channels</div>
            <div>• <span className="text-steam-blue font-bold">sudo hire</span> : Execute priority recruitment sequence</div>
            <div>• <span className="text-steam-blue font-bold">portal</span> : Activate aperture test portal pulse</div>
            <div>• <span className="text-steam-blue font-bold">cake</span> : Inquire about testing confectionery</div>
            <div>• <span className="text-steam-blue font-bold">clear</span> : Clear terminal buffer</div>
          </div>
        );
        break;

      case "about":
      case "bio":
        output = (
          <div className="space-y-1.5 text-slate-200">
            <div className="text-white font-bold">{PROFILE_DATA.name}</div>
            <div className="text-steam-blue">{PROFILE_DATA.title}</div>
            <div className="text-slate-300">{PROFILE_DATA.bio}</div>
            <div className="text-amber-300 mt-1">Education: M.S. ECE @ University of Pittsburgh (CGPA 3.85)</div>
          </div>
        );
        break;

      case "papers":
      case "pubs":
      case "publications":
        output = (
          <div className="space-y-2 text-slate-200">
            <div className="text-amber-400 font-bold">PEER-REVIEWED RESEARCH PUBLICATIONS (5):</div>
            {PROFILE_DATA.publications.map((p, idx) => (
              <div key={p.id} className="border-l-2 border-steam-blue pl-2 text-xs">
                <div className="text-white font-bold">[{idx + 1}] {p.title}</div>
                <div className="text-emerald-400 font-mono">{p.venue} ({p.date})</div>
                <div className="text-slate-400">Authors: {p.authors}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "exp":
      case "work":
      case "experience":
        output = (
          <div className="space-y-2 text-slate-200">
            <div className="text-amber-400 font-bold">OPERATIONAL LOGS:</div>
            {PROFILE_DATA.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-aperture-orange pl-2 text-xs">
                <div className="text-white font-bold">{exp.role} - {exp.organization} ({exp.period})</div>
                <div className="text-slate-400">{exp.points[0]?.title}: {exp.points[0]?.desc}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
      case "stack":
        output = (
          <div className="space-y-1 text-slate-200">
            <div className="text-amber-400 font-bold">INVENTORY SPECIFICATIONS:</div>
            <div>• <span className="text-steam-blue">AI/ML:</span> SNN, PyTorch, TensorFlow, Gemini 2.5 RAG, XGBoost, STDP</div>
            <div>• <span className="text-steam-blue">Robotics & Control:</span> ROS, DVS Event Cameras, Adaptive Control, CPG, LQR</div>
            <div>• <span className="text-steam-blue">Hardware:</span> Intel Loihi, 28-nm VLSI Accelerator, Arduino, STM32</div>
            <div>• <span className="text-steam-blue">Languages:</span> Python, C/C++, MATLAB, TypeScript, SQL</div>
          </div>
        );
        break;

      case "awards":
      case "honors":
        output = (
          <div className="space-y-1.5 text-slate-200">
            <div className="text-amber-400 font-bold">COMMENDATIONS & TROPHIES:</div>
            {PROFILE_DATA.awards.map((a) => (
              <div key={a.id} className="text-xs">
                🏆 <span className="text-white font-bold">{a.title}</span> ({a.year}) — {a.organization}
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-slate-200 text-xs font-mono">
            <div>Email: <span className="text-steam-blue">{PROFILE_DATA.email}</span></div>
            <div>Phone: <span className="text-steam-blue">{PROFILE_DATA.phone}</span></div>
            <div>LinkedIn: <span className="text-steam-blue">{PROFILE_DATA.linkedin}</span></div>
          </div>
        );
        break;

      case "sudo hire":
      case "hire":
        if (onTriggerAchievement) {
          onTriggerAchievement(
            "sudo_hire",
            "OFFER EXTENDED: Sudo Privileges",
            "Executed priority recruitment sequence in Aperture Terminal!"
          );
        }
        output = (
          <div className="p-2 rounded bg-emerald-950/80 border border-emerald-500 text-emerald-300 font-bold space-y-1">
            <div>✓ EXECUTING SUID ROOT AUTHORIZATION...</div>
            <div>✓ CANDIDATE ACCEPTED: Vijay Shankaran Vivekanand</div>
            <div>✓ High-performance perception, adaptive control, and edge AI unlocked.</div>
            <div>Direct transmission initialized: <span className="text-white underline">{PROFILE_DATA.email}</span></div>
          </div>
        );
        break;

      case "portal":
        output = (
          <div className="text-aperture-blue font-bold">
            🌀 PORTAL DISPERSION FIELD ACTIVATED! Acoustic resonance calibrated.
          </div>
        );
        break;

      case "cake":
        output = (
          <div className="text-aperture-orange font-bold">
            ⚠️ ERROR 404: The cake is a lie. But the peer-reviewed publications are 100% verified.
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        output = (
          <div className="text-rose-400">
            command not found: <span className="text-white">{cmd}</span>. Type <span className="text-amber-300 font-bold">&apos;help&apos;</span> for diagnostics.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: inputVal,
        output,
      },
    ]);
    setInputVal("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`w-full rounded-2xl bg-[#0d131a] border-2 border-aperture-terminal/70 shadow-[0_0_50px_rgba(0,255,102,0.2)] flex flex-col overflow-hidden transition-all duration-300 ${
          isMaximized ? "h-[90vh] max-w-6xl" : "h-[560px] max-w-3xl"
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#141d27] border-b border-[#25364b] select-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-aperture-terminal" />
            <span className="font-mono text-xs font-bold text-slate-200">
              GLaDOS CLI // APERTURE SCIENCE TERMINAL v4.2
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-rose-400 p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 bg-[#0a0f15]/95">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-aperture-terminal">vijay@aperture:~$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommand} className="flex items-center p-3 bg-[#111924] border-t border-[#202e40]">
          <span className="text-aperture-terminal font-mono text-xs mr-2 select-none">
            vijay@aperture:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'papers', 'exp', 'skills', or 'sudo hire'..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
          />
          <button
            type="submit"
            className="ml-2 px-2.5 py-1 rounded bg-[#1e2a3a] hover:bg-steam-accent text-steam-blue text-xs font-mono font-bold flex items-center gap-1 border border-[#30435c]"
          >
            <span>RUN</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
};
