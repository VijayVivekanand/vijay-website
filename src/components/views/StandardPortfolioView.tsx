"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE_DATA, Publication, Experience, Project, Award } from "@/data/profile";
import { sound } from "@/lib/sound";
import {
  FileText,
  Download,
  Mail,
  ExternalLink,
  Linkedin,
  Github,
  Calendar,
  Building,
  GraduationCap,
  Award as AwardIcon,
  BookOpen,
  Briefcase,
  Layers,
  Zap,
  CheckCircle2,
  ChevronDown,
  Copy,
  Check,
  Cpu,
  Brain,
  Sliders,
  Code2,
  Lock,
  Compass,
  Trophy,
  Star,
  Users,
  HeartHandshake,
  Bot,
  Coffee,
  Footprints,
  Gamepad2,
  Keyboard,
  Headphones,
  Sunrise,
  Lightbulb,
  Sparkles,
  MapPin,
  Quote,
  Video,
  Palette,
} from "lucide-react";
import confetti from "canvas-confetti";

interface StandardPortfolioViewProps {
  onOpenPreviewCV: () => void;
  onOpenContact: () => void;
  onToggleGeekMode: () => void;
}

export const StandardPortfolioView: React.FC<StandardPortfolioViewProps> = ({
  onOpenPreviewCV,
  onOpenContact,
  onToggleGeekMode,
}) => {
  // Publications state
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [copiedBibtexId, setCopiedBibtexId] = useState<string | null>(null);
  const [expandedPubId, setExpandedPubId] = useState<string | null>(PROFILE_DATA.publications[0].id);

  // Experience state
  const [selectedExpId, setSelectedExpId] = useState<string>(PROFILE_DATA.experience[0].id);
  const activeExp = PROFILE_DATA.experience.find((e) => e.id === selectedExpId) || PROFILE_DATA.experience[0];

  // Skills state
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("all");

  const allTags = [
    "ALL",
    "Event-Based Vision",
    "SNN",
    "VLSI Design",
    "Central Pattern Generator",
    "Robot Navigation",
  ];

  const filteredPubs =
    selectedTag === "ALL"
      ? PROFILE_DATA.publications
      : PROFILE_DATA.publications.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()))
        );

  const handleCopyBibtex = (pub: Publication) => {
    sound.playSteamClick();
    const bibtex = `@article{vivekanand${pub.date.replace(/[^0-9]/g, "")}_${pub.id},
  title = {${pub.title}},
  author = {${pub.authors}},
  journal = {${pub.venue}},
  year = {${pub.date.split(" ")[1] || "2024"}},
  month = {${pub.date.split(" ")[0] || "Feb"}}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtexId(pub.id);
    setTimeout(() => setCopiedBibtexId(null), 2500);
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "silicon_cochlea":
        return Cpu;
      case "chaos_cryptography":
        return Lock;
      case "lqr_inverted_pendulum":
        return Compass;
      default:
        return Layers;
    }
  };

  const getSkillCategoryIcon = (category: string) => {
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

  const getPersonalityIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "Coffee":
        return <Coffee className={className} />;
      case "Footprints":
        return <Footprints className={className} />;
      case "Gamepad2":
        return <Gamepad2 className={className} />;
      case "Keyboard":
        return <Keyboard className={className} />;
      case "Headphones":
        return <Headphones className={className} />;
      case "Compass":
        return <Compass className={className} />;
      case "MapPin":
        return <MapPin className={className} />;
      case "Brain":
        return <Brain className={className} />;
      case "Sunrise":
        return <Sunrise className={className} />;
      case "Lightbulb":
        return <Lightbulb className={className} />;
      case "Video":
        return <Video className={className} />;
      case "Palette":
        return <Palette className={className} />;
      case "Trophy":
        return <Trophy className={className} />;
      case "Sparkles":
        return <Sparkles className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const skillCategories = [
    { id: "all", label: "All Toolchains" },
    ...PROFILE_DATA.skills.map((s) => ({ id: s.category, label: s.category })),
  ];

  const filteredSkillCategories =
    selectedSkillCategory === "all"
      ? PROFILE_DATA.skills
      : PROFILE_DATA.skills.filter((s) => s.category === selectedSkillCategory);

  const triggerConfetti = (title: string) => {
    sound.playAchievementSound();
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { y: 0.7 },
      colors: ["#3b82f6", "#64748b", "#94a3b8", "#0f172a"],
    });
  };

  return (
    <div className="w-full space-y-20 pt-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-white dark:bg-[#0f151f]/80 border border-slate-200 dark:border-[#1b2737] p-6 sm:p-10 md:p-12 shadow-md dark:shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-blue-50/70 dark:bg-[#3b5980]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-slate-50/80 dark:bg-[#1a2d45]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-7 md:gap-9">
            {/* Professional Headshot Frame */}
            <div className="relative flex-shrink-0 group">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-[#26374a] shadow-xl dark:shadow-[0_0_30px_rgba(38,55,74,0.4)] bg-slate-100 dark:bg-[#121922]">
                <img
                  src="/headshot.jpg"
                  alt="Vijay Shankaran Vivekanand"
                  className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>

            {/* Main Headline, Bio & Action Buttons */}
            <div className="space-y-4 flex-1">
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                  Vijay Shankaran Vivekanand
                </h1>
                <p className="text-sm sm:text-base md:text-lg font-mono text-slate-700 dark:text-slate-300 font-semibold">
                  Embodied AI | Robot Perception | Adaptive Control
                </p>
              </div>

              {/* Bio */}
              <p className="text-slate-800 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans max-w-3xl font-normal">
                {PROFILE_DATA.bio}
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  onClick={() => {
                    sound.playSteamClick();
                    onOpenPreviewCV();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 dark:bg-[#223348] dark:hover:bg-[#2e4460] dark:border dark:border-[#3d5779]"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-200 dark:text-slate-300" />
                  <span>Preview CV</span>
                </button>

                <a
                  href="/Vijay_Shankaran_Vivekanand_CV.pdf"
                  download="Vijay_Shankaran_Vivekanand_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playSteamClick()}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-300 transition-all flex items-center gap-2 shadow-sm dark:bg-[#141d2a] dark:hover:bg-[#1c2838] dark:text-slate-200 dark:border-[#243447]"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={() => {
                    sound.playSteamClick();
                    onOpenContact();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-300 transition-all flex items-center gap-2 shadow-sm dark:bg-[#141d2a] dark:hover:bg-[#1c2838] dark:text-slate-200 dark:border-[#243447]"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>Get in Touch</span>
                </button>

                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playSteamClick()}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-black font-semibold text-xs sm:text-sm border border-slate-300 transition-all flex items-center gap-2 shadow-sm dark:bg-[#141d2a] dark:hover:bg-[#1c2838] dark:text-slate-300 dark:hover:text-white dark:border-[#243447]"
                >
                  <Linkedin className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>LinkedIn</span>
                </a>

                {/* Geek Mode Switch CTA */}
                <button
                  onClick={() => {
                    sound.playSteamClick();
                    onToggleGeekMode();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-black font-mono font-medium text-xs sm:text-sm border border-slate-300 transition-all flex items-center gap-2 ml-auto shadow-sm dark:bg-[#182333] dark:hover:bg-[#223247] dark:text-slate-300 dark:hover:text-white dark:border-[#2c3f56]"
                  title="Switch to Portal 2 Robotic Arm & Aperture Science Testing Facility view"
                >
                  <Bot className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span className="hidden sm:inline">⚡ Try Geek Mode</span>
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10 pt-8 border-t border-slate-200 dark:border-[#1a2636]">
            {PROFILE_DATA.stats.map((stat) => (
              <div
                key={stat.label}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#121a24]/90 border border-slate-200 dark:border-[#1e2a3b] space-y-1 shadow-sm"
              >
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase font-medium">
                  {stat.label}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT & RESEARCH FOCUS */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#1a2738] pb-3">
          <Brain className="w-5 h-5 text-slate-800 dark:text-slate-300" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">
            About & Research Focus
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Research Focus Pillars */}
          <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-[#0f151f] border border-slate-200 dark:border-[#1c2738] p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Core Research Pillars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROFILE_DATA.researchInterests.map((interest) => (
                <div
                  key={interest}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141b25] border border-slate-200 dark:border-[#202c3c] flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-700 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-sans font-medium">{interest}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="rounded-2xl bg-white dark:bg-[#0f151f] border border-slate-200 dark:border-[#1c2738] p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-slate-800 dark:text-slate-300" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Education</h3>
            </div>

            <div className="space-y-3">
              {PROFILE_DATA.education.map((edu) => (
                <div
                  key={edu.institution}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141b25] border border-slate-200 dark:border-[#202c3c] space-y-1"
                >
                  <div className="flex items-start justify-between">
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                      {edu.institution}
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 font-semibold">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">{edu.degree}</div>
                  {edu.gpa && (
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                      CGPA: <span className="text-slate-900 dark:text-slate-200 font-bold">{edu.gpa}</span>
                    </div>
                  )}
                  {edu.specialization && (
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                      Specialization: {edu.specialization}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PEER-REVIEWED PUBLICATIONS */}
      <section id="publications" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#1a2738] pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-800 dark:text-slate-300" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">
                Publications
              </h2>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
                5 Peer-Reviewed Articles (Frontiers, IEEE, ACM)
              </span>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  sound.playSteamClick();
                  setSelectedTag(tag);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedTag === tag
                    ? "bg-slate-900 dark:bg-[#25364a] text-white font-bold border border-slate-900 dark:border-[#3b516e]"
                    : "bg-slate-100 dark:bg-[#141b25] text-slate-700 dark:text-slate-400 hover:text-black dark:hover:text-slate-200 border border-slate-300 dark:border-[#202c3c]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredPubs.map((pub) => {
            const isExpanded = expandedPubId === pub.id;
            const isCopied = copiedBibtexId === pub.id;

            return (
              <div
                key={pub.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "bg-slate-50 dark:bg-[#121924] border-slate-300 dark:border-[#2c3d52] shadow-md"
                    : "bg-white dark:bg-[#0f151f] border-slate-200 dark:border-[#1c2738] hover:border-slate-300 dark:hover:border-[#28384b]"
                }`}
              >
                <div
                  onClick={() => {
                    sound.playSteamClick();
                    setExpandedPubId(isExpanded ? null : pub.id);
                  }}
                  className="p-5 cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-4 select-none"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {pub.date}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-[#172230] border border-slate-300 dark:border-[#243447] px-2 py-0.5 rounded">
                        {pub.venue}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 font-sans hover:text-blue-600 dark:hover:text-white transition-colors">
                      {pub.title}
                    </h3>

                    <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                      <span>Authors: </span>
                      <span className="text-slate-900 dark:text-slate-300 font-medium">{pub.authors}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#151c27] border border-slate-200 dark:border-[#222f3e] text-slate-700 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2.5">
                    {pub.metrics && (
                      <div className="px-2.5 py-1 rounded bg-slate-100 dark:bg-[#16212e] border border-slate-200 dark:border-[#243548] text-right">
                        <div className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-300">
                          {pub.metrics}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyBibtex(pub);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#16212e] hover:bg-slate-200 dark:hover:bg-[#1f2d3d] text-slate-800 dark:text-slate-300 hover:text-black dark:hover:text-white text-xs font-mono flex items-center gap-1.5 border border-slate-300 dark:border-[#253648] transition-colors shadow-sm"
                        title="Copy BibTeX Citation"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                            <span>BibTeX</span>
                          </>
                        )}
                      </button>

                      <ChevronDown
                        className={`w-4 h-4 text-slate-600 dark:text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "transform rotate-180 text-slate-900 dark:text-white" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-200 dark:border-[#1c2738] bg-slate-50 dark:bg-[#0c1118] p-5 space-y-2.5"
                    >
                      <div>
                        <div className="text-xs font-mono text-slate-700 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
                          Abstract:
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 leading-relaxed font-sans font-normal">
                          {pub.abstract}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PROFESSIONAL EXPERIENCE */}
      <section id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#1a2738] pb-3">
          <Briefcase className="w-5 h-5 text-slate-800 dark:text-slate-300" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">
              Experience
            </h2>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
              Industry Engineering & Laboratory Research Track Record
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Organization Selector */}
          <div className="lg:col-span-4 space-y-2.5">
            {PROFILE_DATA.experience.map((exp) => {
              const isSelected = selectedExpId === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => {
                    sound.playSteamClick();
                    setSelectedExpId(exp.id);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 select-none ${
                    isSelected
                      ? "bg-slate-100 dark:bg-[#151e2b] border-slate-400 dark:border-[#384d66] shadow-sm ring-1 ring-slate-400/40 dark:ring-[#5294e2]/30"
                      : "bg-white dark:bg-[#0f151f] border-slate-200 dark:border-[#1c2738] hover:bg-slate-50 dark:hover:bg-[#121a24] text-slate-700 dark:text-slate-400"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#172230] text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-[#253648] font-semibold">
                      {exp.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">{exp.period}</span>
                  </div>

                  <div className="mt-2">
                    <div className={`font-bold text-xs sm:text-sm ${isSelected ? "text-slate-900 dark:text-white" : "text-slate-800 dark:text-slate-200"}`}>
                      {exp.role}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">{exp.organization}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Experience Display */}
          <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-[#0f151f] border border-slate-200 dark:border-[#1c2738] p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-[#1a2636] pb-3">
              <div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{activeExp.role}</div>
                <div className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  {activeExp.organization}
                </div>
              </div>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                <span className="text-slate-900 dark:text-slate-200 font-bold">{activeExp.period}</span> · {activeExp.location}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-mono text-slate-700 dark:text-slate-400 font-bold uppercase tracking-wider">
                Key Technical Highlights:
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {activeExp.points.map((pt) => (
                  <div
                    key={pt.title}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141b25] border border-slate-200 dark:border-[#202c3c] space-y-1.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-slate-700 dark:text-slate-400 flex-shrink-0" />
                        {pt.title}
                      </span>
                      {pt.metrics && (
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#182331] text-slate-800 dark:text-slate-300 text-[10px] font-mono font-semibold border border-slate-300 dark:border-[#26374a] self-start sm:self-auto">
                          {pt.metrics}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-sans pl-5 font-normal">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-[#1a2636]">
              <div className="text-[11px] font-mono text-slate-700 dark:text-slate-400 mb-2 uppercase font-semibold">
                Technologies Deployed:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeExp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-[#16212e] border border-slate-200 dark:border-[#243446] text-xs font-mono text-slate-800 dark:text-slate-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC & SYSTEMS PROJECTS */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#1a2738] pb-3">
          <Layers className="w-5 h-5 text-slate-800 dark:text-slate-300" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">
              Featured Systems Projects
            </h2>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
              Hardware Neuromorphic Architectures & Robust Control Theory
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROFILE_DATA.projects.map((proj) => {
            const Icon = getProjectIcon(proj.id);
            return (
              <div
                key={proj.id}
                className="rounded-2xl bg-white dark:bg-[#0f151f] border border-slate-200 dark:border-[#1c2738] p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-[#2a3c50] transition-all shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#172230] text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-[#253648] font-semibold">
                      {proj.category}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#16212e] border border-slate-200 dark:border-[#253547] flex items-center justify-center text-slate-700 dark:text-slate-300">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-snug font-sans">
                      {proj.title}
                    </h3>
                    {proj.metrics && (
                      <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5 font-semibold">
                        {proj.metrics}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-sans font-normal">
                    {proj.description}
                  </p>

                  {proj.details && (
                    <div className="space-y-1.5 pt-1">
                      {proj.details.map((d) => (
                        <div key={d} className="text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1.5 leading-snug font-normal">
                          <span className="text-slate-500 font-mono font-bold">•</span>
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {proj.tags && (
                  <div className="pt-3 border-t border-slate-200 dark:border-[#1a2636]">
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-[#151c27] border border-slate-200 dark:border-[#222f3e] text-slate-700 dark:text-slate-300 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. TECHNICAL SKILLS */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-[#1a2738] pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-slate-800 dark:text-slate-300" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">
                Technical Skills & Toolchains
              </h2>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
                Machine Learning, Neuromorphic Hardware, Control Theory & Cloud
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {skillCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  sound.playSteamClick();
                  setSelectedSkillCategory(c.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedSkillCategory === c.id
                    ? "bg-slate-900 dark:bg-[#25364a] text-white font-bold border border-slate-900 dark:border-[#3b516e]"
                    : "bg-slate-100 dark:bg-[#141b25] text-slate-700 dark:text-slate-400 hover:text-black dark:hover:text-slate-200 border border-slate-300 dark:border-[#202c3c]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSkillCategories.map((group) => {
            const Icon = getSkillCategoryIcon(group.category);
            return (
              <div
                key={group.category}
                className="rounded-2xl bg-white dark:bg-[#0f151f] border border-slate-200 dark:border-[#1c2738] p-5 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#1a2636] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#16212e] border border-slate-200 dark:border-[#243446] flex items-center justify-center text-slate-800 dark:text-slate-300">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base font-sans">
                      {group.category}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-semibold">
                    {group.items.length} Modules
                  </span>
                </div>

                <div className="space-y-2.5">
                  {group.items.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-900 dark:text-slate-200">{skill.name}</span>
                        <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 font-medium">
                          {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Proficient" : "Advanced"}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-[#161f2b] border border-slate-200 dark:border-[#202b3b] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-slate-800 dark:bg-slate-400 transition-all duration-500"
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
      </section>

      {/* 7. HONORS & LEADERSHIP */}
      <section id="awards" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#1a2738] pb-3">
          <Trophy className="w-5 h-5 text-slate-800 dark:text-slate-300" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans">
              Honors & Community Leadership
            </h2>
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
              Recognitions across venture showcases, academic scholarships & mentorship
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROFILE_DATA.awards.map((award) => (
            <div
              key={award.id}
              onClick={() => triggerConfetti(award.title)}
              className="p-5 rounded-2xl bg-white dark:bg-[#0f151f] border border-slate-200 dark:border-[#1c2738] hover:border-slate-300 dark:hover:border-[#2a3c50] transition-all duration-200 cursor-pointer select-none space-y-3 shadow-sm group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#16212e] border border-slate-200 dark:border-[#243446] flex items-center justify-center text-slate-800 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-tight font-sans group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                      {award.title}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">{award.organization}</div>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-300 px-2 py-0.5 rounded bg-slate-100 dark:bg-[#16212e] border border-slate-300 dark:border-[#243446]">
                  {award.year}
                </span>
              </div>

              <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-sans font-normal">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BEYOND THE LAB // PERSONALITY & INTERESTS */}
      <section id="personality" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#1a2738] pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Beyond the Work & Silicon</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
              Personality & Passions
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-sans max-w-2xl font-normal leading-relaxed">
              {PROFILE_DATA.personality.bio}
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#121924] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#1c2738] self-start md:self-auto">
            [Human / Off-Duty Mode]
          </div>
        </div>

        {/* Quick Personality Bites / Daily Rituals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {PROFILE_DATA.personality.quickBites.map((bite) => (
            <div
              key={bite.label}
              onClick={() => {
                sound.playSteamClick();
              }}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#0f151f] border border-slate-200 dark:border-[#1c2738] hover:border-slate-300 dark:hover:border-[#2a3c50] transition-all duration-200 space-y-2 shadow-sm group hover:-translate-y-0.5 cursor-default select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#16212e] border border-slate-200 dark:border-[#243446] flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {getPersonalityIcon(bite.icon, "w-4 h-4")}
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-medium tracking-wider">
                  {bite.label}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                  {bite.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5 Core Hobbies + Casual Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROFILE_DATA.personality.interests.map((interest) => (
            <div
              key={interest.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#0f151f] border border-slate-200 dark:border-[#1c2738] hover:border-slate-300 dark:hover:border-[#2b3e54] transition-all duration-200 space-y-4 shadow-sm group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#16212e] border border-slate-200 dark:border-[#243446] flex items-center justify-center text-slate-800 dark:text-slate-200 group-hover:scale-105 transition-transform">
                    {getPersonalityIcon(interest.icon, "w-5 h-5")}
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#16212e] border border-slate-200 dark:border-[#243446]">
                    {interest.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                    {interest.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5">
                    {interest.tagline}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans font-normal">
                  {interest.description}
                </p>

                {/* Optional Interest Showcase Image */}
                {interest.image && (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-[#243446] bg-slate-950 mt-2 shadow-sm group-hover:border-blue-500/40 transition-colors">
                    <img
                      src={interest.image}
                      alt={interest.title}
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    {interest.badge && (
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-blue-600/90 text-white font-mono text-[10px] font-semibold tracking-wide backdrop-blur-sm shadow border border-blue-400/30">
                        {interest.badge}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Highlights Chips */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-[#16202c]">
                {interest.highlights.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-sans px-2.5 py-1 rounded-md bg-slate-50 dark:bg-[#141d28] border border-slate-200 dark:border-[#1e2a39] text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Casual Photo Card (IMG_2506) */}
          {PROFILE_DATA.personality.image && (
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f151f] border border-slate-200 dark:border-[#1c2738] hover:border-slate-300 dark:hover:border-[#2b3e54] transition-all duration-200 shadow-sm group flex flex-col justify-between overflow-hidden">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-[#16212e] border border-slate-200 dark:border-[#243446]">
                <img
                  src={PROFILE_DATA.personality.image}
                  alt="Vijay Vivekanand - Casual Vibe"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-medium flex items-center gap-1.5 border border-white/20">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>Washington, D.C.</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-medium border border-white/20">
                  Casual Vibe
                </div>
              </div>

              <div className="pt-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-amber-700 dark:text-amber-400">
                    Life Outside the Lab
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Albert Einstein Memorial</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-sans italic leading-relaxed">
                  &ldquo;{PROFILE_DATA.personality.imageCaption}&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Guiding Life & Engineering Philosophies */}
        <div className="rounded-3xl bg-slate-50 dark:bg-[#0c121b] border border-slate-200 dark:border-[#1b2636] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-wider">
            <Quote className="w-4 h-4 text-slate-500" />
            <span>Guiding Principles & Mental Models</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROFILE_DATA.personality.philosophies.map((phil) => (
              <div
                key={phil.principle}
                className="p-4 rounded-xl bg-white dark:bg-[#111823] border border-slate-200 dark:border-[#1d2938] space-y-2 shadow-sm"
              >
                <div className="font-bold text-slate-900 dark:text-white text-sm font-sans flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {phil.principle}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic font-serif">
                  &ldquo;{phil.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT FOOTER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-slate-50 dark:bg-gradient-to-r dark:from-[#111924] dark:via-[#141e2b] dark:to-[#111924] border border-slate-200 dark:border-[#223143] p-8 sm:p-12 text-center space-y-5 shadow-sm dark:shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1a2533] border border-slate-300 dark:border-[#293b50] flex items-center justify-center mx-auto text-slate-800 dark:text-slate-200 shadow-sm">
            <Mail className="w-6 h-6 text-slate-800 dark:text-slate-300" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-sans">
              Let&apos;s Build the Future of Robotics & AI
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-sans font-medium">
              Interested in collaborating on embodied intelligence, neuromorphic architectures, or autonomous systems?
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playSteamClick();
                onOpenContact();
              }}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 dark:bg-[#223348] dark:hover:bg-[#2d435e] dark:border dark:border-[#3b5476]"
            >
              <Mail className="w-4 h-4 text-slate-200 dark:text-slate-300" />
              <span>Send a Transmission</span>
            </button>

            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 transition-all flex items-center gap-2 shadow-sm dark:bg-[#141c26] dark:hover:bg-[#1a2431] dark:text-slate-200 dark:border-[#243345]"
            >
              <ExternalLink className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>{PROFILE_DATA.email}</span>
            </a>

            <button
              onClick={() => {
                sound.playSteamClick();
                onOpenPreviewCV();
              }}
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 transition-all flex items-center gap-2 shadow-sm dark:bg-[#141c26] dark:hover:bg-[#1a2431] dark:text-slate-200 dark:border-[#243345]"
            >
              <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>View Full CV</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
