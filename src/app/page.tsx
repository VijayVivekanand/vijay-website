"use client";

import React, { useState, useEffect } from "react";
import { StandardNavbar } from "@/components/layout/StandardNavbar";
import { StandardPortfolioView } from "@/components/views/StandardPortfolioView";
import { GeekModeView } from "@/components/views/GeekModeView";
import { ChamberDetailModal } from "@/components/sections/ChamberDetailModal";
import { PDFViewerModal } from "@/components/layout/PDFViewerModal";
import { ApertureTerminal } from "@/components/sections/ApertureTerminal";
import { ContactModal } from "@/components/sections/ContactModal";
import { SteamAchievementToast, Achievement } from "@/components/layout/SteamAchievementToast";
import { sound } from "@/lib/sound";
import { PROFILE_DATA } from "@/data/profile";
import { Terminal, Mail, Linkedin, FileText, Bot, Sun, Moon } from "lucide-react";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isGeekMode, setIsGeekMode] = useState<boolean>(false);
  const [activeModalChamberId, setActiveModalChamberId] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [achievement, setAchievement] = useState<Achievement | null>(null);

  // Synchronize theme with html class
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const triggerAchievement = (id: string, title: string, description: string) => {
    setAchievement({
      id,
      title,
      description,
      xp: 250,
    });
  };

  const handleToggleGeekMode = () => {
    const nextMode = !isGeekMode;
    setIsGeekMode(nextMode);
    if (nextMode) {
      sound.playAchievementSound();
      triggerAchievement(
        "geek_mode_unlocked",
        "GEEK MODE ENGAGED",
        "Aperture Science Testing Facility & Robotic Manipulator activated."
      );
    } else {
      sound.playSteamClick();
    }
  };

  const handleOpenChamber = (chamberId: string) => {
    setActiveModalChamberId(chamberId);
    triggerAchievement(
      `chamber_${chamberId}`,
      `INSPECTED CHAMBER: ${chamberId.toUpperCase()}`,
      "Retrieved full laboratory specifications and archives."
    );
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#070b10] text-slate-900 dark:text-slate-100 flex flex-col technical-grid selection:bg-slate-300 dark:selection:bg-slate-700 selection:text-black dark:selection:text-white transition-colors duration-300">
      {/* Universal Top Navbar with Theme Toggle */}
      <StandardNavbar
        isGeekMode={isGeekMode}
        onToggleGeekMode={handleToggleGeekMode}
        onOpenPreviewCV={() => setIsPDFViewerOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {isGeekMode ? (
          <GeekModeView
            onOpenChamber={handleOpenChamber}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onExitGeekMode={() => handleToggleGeekMode()}
          />
        ) : (
          <StandardPortfolioView
            onOpenPreviewCV={() => setIsPDFViewerOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
            onToggleGeekMode={handleToggleGeekMode}
          />
        )}
      </main>

      {/* Standard Executive Footer */}
      <footer className="border-t border-slate-200 dark:border-[#16212e] bg-slate-50 dark:bg-[#090e15] py-6 text-xs text-slate-600 dark:text-slate-400 font-mono transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-300 dark:border-[#26374a] shadow-sm flex-shrink-0 bg-slate-100 dark:bg-[#16212e]">
              <img
                src="/headshot.jpg"
                alt="Vijay Shankaran Vivekanand"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="text-slate-900 dark:text-white font-bold">Vijay Shankaran Vivekanand</span> · {PROFILE_DATA.title}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                sound.playSteamClick();
                handleToggleTheme();
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                sound.playSteamClick();
                setIsPDFViewerOpen(true);
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Preview CV</span>
            </button>

            <button
              onClick={handleToggleGeekMode}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Bot className="w-3.5 h-3.5 text-slate-400" />
              <span>{isGeekMode ? "Classic Mode" : "Geek Mode"}</span>
            </button>

            <button
              onClick={() => {
                sound.playSteamClick();
                setIsTerminalOpen(true);
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>Terminal</span>
            </button>

            <button
              onClick={() => {
                sound.playSteamClick();
                setIsContactOpen(true);
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Contact</span>
            </button>

            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Pop-up Modal for Active Selected Chamber (Geek Mode) */}
      <ChamberDetailModal
        chamberId={activeModalChamberId}
        onClose={() => setActiveModalChamberId(null)}
        onNavigateToChamber={(id) => setActiveModalChamberId(id)}
        onOpenTerminal={() => {
          setActiveModalChamberId(null);
          setIsTerminalOpen(true);
        }}
        onOpenPreviewCV={() => setIsPDFViewerOpen(true)}
        onTriggerAchievement={triggerAchievement}
      />

      {/* Interactive PDF Document Viewer Modal */}
      <PDFViewerModal
        isOpen={isPDFViewerOpen}
        onClose={() => setIsPDFViewerOpen(false)}
        pdfUrl="/Vijay_Shankaran_Vivekanand_CV.pdf"
        title="Vijay_Shankaran_Vivekanand_CV.pdf"
        onTriggerAchievement={triggerAchievement}
      />

      {/* Interactive GLaDOS CLI Terminal Modal */}
      <ApertureTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onTriggerAchievement={triggerAchievement}
      />

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onTriggerAchievement={triggerAchievement}
      />

      {/* Achievement Toast Notifications */}
      <SteamAchievementToast
        achievement={achievement}
        onClose={() => setAchievement(null)}
      />
    </div>
  );
}
