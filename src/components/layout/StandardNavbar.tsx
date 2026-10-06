"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  FileText,
  Mail,
  Menu,
  X,
  Bot,
  Sun,
  Moon,
} from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

interface StandardNavbarProps {
  isGeekMode: boolean;
  onToggleGeekMode: () => void;
  onOpenPreviewCV: () => void;
  onOpenContact: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export const StandardNavbar: React.FC<StandardNavbarProps> = ({
  isGeekMode,
  onToggleGeekMode,
  onOpenPreviewCV,
  onOpenContact,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Publications", href: "#publications" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Honors", href: "#awards" },
    { label: "Beyond Work", href: "#personality" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 dark:bg-[#090d14]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#182332] shadow-sm py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group select-none"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 dark:border-[#2d4057] shadow-sm group-hover:border-slate-500 dark:group-hover:border-[#4d6b91] transition-all flex-shrink-0 bg-slate-100 dark:bg-[#151f2b]">
            <img
              src={getAssetPath("/headshot.jpg")}
              alt="Vijay Shankaran"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <div className="font-bold font-sans text-sm text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
              Vijay Shankaran
            </div>
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              Embodied AI & Robotics
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls, Theme Toggle & Geek Mode Toggle */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-[#131b26] hover:bg-slate-200 dark:hover:bg-[#1a2535] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#223143] text-xs font-medium flex items-center justify-center transition-all shadow-sm"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-700" />
            )}
          </button>

          {/* Preview CV */}
          <button
            onClick={onOpenPreviewCV}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#131b26] hover:bg-slate-200 dark:hover:bg-[#1a2535] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#223143] text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>CV</span>
          </button>

          {/* Contact */}
          <button
            onClick={onOpenContact}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#131b26] hover:bg-slate-200 dark:hover:bg-[#1a2535] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#223143] text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Contact</span>
          </button>

          {/* Geek Mode Switcher */}
          <button
            onClick={onToggleGeekMode}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-2 border transition-all shadow-sm ${
              isGeekMode
                ? "bg-[#253952] text-white border-[#486b96] shadow-[0_0_15px_rgba(82,148,226,0.25)] ring-1 ring-[#5294e2]/50"
                : "bg-slate-900 dark:bg-[#16202c] hover:bg-slate-800 dark:hover:bg-[#1f2d3e] text-white dark:text-slate-300 border-slate-800 dark:border-[#27384e]"
            }`}
          >
            <Bot className={`w-3.5 h-3.5 ${isGeekMode ? "text-[#7fb5ff]" : "text-slate-300 dark:text-slate-400"}`} />
            <span>{isGeekMode ? "Classic Mode" : "⚡ Geek Mode"}</span>
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-[#131b26] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#223143]"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={onToggleGeekMode}
            className="p-2 rounded-lg bg-slate-100 dark:bg-[#16202c] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#27384e]"
            title="Toggle Geek Mode"
          >
            <Bot className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-[#131b26] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#223143]"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-[#0c121a] border-b border-slate-200 dark:border-[#1f2c3d] px-4 py-4 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="p-2 rounded-lg bg-slate-50 dark:bg-[#131a24] text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#202c3c]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-[#1d2a3a] flex items-center gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPreviewCV();
              }}
              className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-[#16212e] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#243448] text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Preview CV</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-[#16212e] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#243448] text-xs font-medium flex items-center justify-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
