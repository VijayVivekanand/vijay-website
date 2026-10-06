"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  ExternalLink,
  X,
} from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  title?: string;
  onTriggerAchievement?: (id: string, title: string, desc: string) => void;
}

export const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  onTriggerAchievement,
}) => {
  const [activeDoc, setActiveDoc] = React.useState<"cv" | "supplemental">("cv");

  useEffect(() => {
    if (pdfUrl && pdfUrl.includes("Supplemental")) {
      setActiveDoc("supplemental");
    } else {
      setActiveDoc("cv");
    }
  }, [pdfUrl, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPdfUrl =
    activeDoc === "supplemental"
      ? getAssetPath("/Vijay_Shankaran_Vivekanand_Supplemental.pdf")
      : getAssetPath("/Vijay_Shankaran_Vivekanand_CV.pdf");

  const currentTitle =
    activeDoc === "supplemental"
      ? "Vijay_Shankaran_Vivekanand_Supplemental.pdf"
      : "Vijay_Shankaran_Vivekanand_CV.pdf";

  const handleDownload = () => {
    if (onTriggerAchievement) {
      onTriggerAchievement(
        activeDoc === "supplemental" ? "supplemental_acquired" : "cv_acquired",
        activeDoc === "supplemental"
          ? "Supplemental Dossier Retrieved"
          : "Curriculum Vitae Retrieved",
        activeDoc === "supplemental"
          ? "Downloaded official Research & Academic Supplement PDF"
          : "Downloaded official CV for Vijay Shankaran Vivekanand"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative w-full max-w-5xl h-[92vh] rounded-2xl bg-white dark:bg-[#0f151e] border border-slate-200 dark:border-[#223142] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Top Titlebar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-slate-50 dark:bg-[#141b26] border-b border-slate-200 dark:border-[#1f2b3a] select-none flex-shrink-0 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white dark:bg-[#1a2432] border border-slate-200 dark:border-[#293b50] flex items-center justify-center text-slate-700 dark:text-slate-300 shadow-sm">
              <FileText className="w-3.5 h-3.5" />
            </div>

            {/* Document Switcher Tabs */}
            <div className="flex items-center bg-slate-200/80 dark:bg-[#101620] p-0.5 rounded-lg border border-slate-300 dark:border-[#202c3c]">
              <button
                onClick={() => setActiveDoc("cv")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeDoc === "cv"
                    ? "bg-white dark:bg-[#1f2b3b] text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                Curriculum Vitae (CV)
              </button>
              <button
                onClick={() => setActiveDoc("supplemental")}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeDoc === "supplemental"
                    ? "bg-white dark:bg-[#1f2b3b] text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                Research & Academic Supplement
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Open in new tab button */}
            <a
              href={currentPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new window"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white dark:bg-[#18212e] hover:bg-slate-100 dark:hover:bg-[#222e3f] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#263548] text-xs font-mono flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </a>

            {/* Direct Download Button */}
            <a
              href={currentPdfUrl}
              download={currentTitle}
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-[#25364a] hover:bg-slate-800 dark:hover:bg-[#324964] text-white font-semibold text-xs border border-slate-800 dark:border-[#3f5777] shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white dark:bg-[#18212e] hover:bg-slate-100 dark:hover:bg-[#222e3f] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#263548] transition-colors ml-1 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Embedded Frame */}
        <div className="flex-1 w-full h-full bg-slate-100 dark:bg-[#1b222d] relative overflow-hidden">
          <iframe
            key={currentPdfUrl}
            src={`${currentPdfUrl}#toolbar=1&navpanes=0`}
            title="PDF Document Preview"
            className="w-full h-full border-none"
          />
        </div>
      </motion.div>
    </div>
  );
};
