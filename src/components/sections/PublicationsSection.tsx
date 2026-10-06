"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE_DATA, Publication } from "@/data/profile";
import {
  BookOpen,
  Copy,
  Check,
  FileCode,
  Calendar,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

interface PublicationsSectionProps {
  onTriggerAchievement?: (id: string, title: string, desc: string) => void;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  onTriggerAchievement,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(PROFILE_DATA.publications[0].id);

  const allTags = [
    "ALL",
    "Event-Based Vision",
    "Central Pattern Generator",
    "VLSI Design",
    "Dynamic Neural Fields (DNF)",
    "Stereo Vision",
    "Sensorimotor Control",
  ];

  const filteredPubs =
    selectedTag === "ALL"
      ? PROFILE_DATA.publications
      : PROFILE_DATA.publications.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()))
        );

  const handleCopyBibtex = (pub: Publication) => {
    const bibtex = `@article{vivekanand${pub.date.replace(/[^0-9]/g, "")}_${pub.id},
  title = {${pub.title}},
  author = {${pub.authors}},
  journal = {${pub.venue}},
  year = {${pub.date.split(" ")[1] || "2024"}},
  month = {${pub.date.split(" ")[0] || "Feb"}}
}`;
    navigator.clipboard.writeText(bibtex);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2500);

    if (onTriggerAchievement) {
      onTriggerAchievement(
        "bibtex_copied",
        "BibTeX Citation Copied",
        `Copied BibTeX citation for ${pub.venue}`
      );
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#131923] border border-[#1f2b3b]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-slate-400">
              PEER-REVIEWED ARCHIVE · 5 PAPERS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-300" />
            Publications
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Research contributions across neuromorphic sensorimotor control, event-based vision,
            spiking neural networks, and CMOS hardware acceleration.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-1.5 sm:max-w-xs">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                selectedTag === tag
                  ? "bg-[#25364a] text-white font-bold border border-[#3b516e]"
                  : "bg-[#161f2a] text-slate-400 hover:text-slate-200 border border-[#223040]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-3">
        {filteredPubs.map((pub, idx) => {
          const isExpanded = expandedId === pub.id;
          const isCopied = copiedId === pub.id;

          return (
            <div
              key={pub.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? "bg-[#151c27] border-[#2d3f54] shadow-md"
                  : "bg-[#121822] border-[#1d2734] hover:border-[#283749] hover:bg-[#141b25]"
              }`}
            >
              {/* Publication Header Item */}
              <div
                onClick={() => toggleExpand(pub.id)}
                className="p-4 sm:p-5 cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-4 select-none"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {pub.date}
                    </span>
                    <span className="text-xs font-semibold text-slate-300 bg-[#1b2533] border border-[#273648] px-2 py-0.5 rounded">
                      {pub.venue}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-snug font-sans hover:text-white transition-colors">
                    {pub.title}
                  </h3>

                  <div className="text-xs text-slate-400 font-mono">
                    <span>Authors: </span>
                    <span className="text-slate-300">{pub.authors}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18212c] border border-[#233140] text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2.5">
                  {pub.metrics && (
                    <div className="px-2.5 py-1 rounded bg-[#18212c] border border-[#243344] text-right">
                      <div className="text-[11px] font-mono font-medium text-slate-300">{pub.metrics}</div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyBibtex(pub);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#18212c] hover:bg-[#202d3c] text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 border border-[#263546] transition-colors"
                      title="Copy BibTeX Citation"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>BibTeX</span>
                        </>
                      )}
                    </button>

                    <div className="p-1 text-slate-400">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? "transform rotate-180 text-slate-200" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Abstract */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-[#1d2938] bg-[#0e131b] p-5 space-y-2.5"
                  >
                    <div>
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                        Abstract:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {pub.abstract}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#1a2330] text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <span>Status: Published</span>
                        {pub.doi && (
                          <span className="text-[11px] text-slate-400 font-mono">
                            · DOI: <span className="text-slate-300">{pub.doi}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-steam-blue hover:text-white flex items-center gap-1 font-mono text-xs transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Publication
                          </a>
                        )}
                        <button
                          onClick={() => handleCopyBibtex(pub)}
                          className="text-slate-300 hover:text-white flex items-center gap-1 font-mono text-xs transition-colors"
                        >
                          <FileCode className="w-3.5 h-3.5" />
                          Copy BibTeX
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
