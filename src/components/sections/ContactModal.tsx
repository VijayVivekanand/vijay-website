"use client";

import React, { useState } from "react";
import { PROFILE_DATA } from "@/data/profile";
import {
  Linkedin,
  X,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAchievement?: (id: string, title: string, desc: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onTriggerAchievement,
}) => {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [customFormId, setCustomFormId] = useState("");

  // Retrieve form ID from profile, env, or localStorage
  const getActiveFormId = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("contact_formspree_id");
      if (stored) return stored.trim();
    }
    if (PROFILE_DATA.formspreeFormId && PROFILE_DATA.formspreeFormId.trim().length > 0) {
      return PROFILE_DATA.formspreeFormId.trim();
    }
    if (process.env.NEXT_PUBLIC_FORMSPREE_ID) {
      return process.env.NEXT_PUBLIC_FORMSPREE_ID.trim();
    }
    return "";
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const activeId = customFormId.trim() || getActiveFormId();

    if (!activeId) {
      setIsSubmitting(false);
      setShowConfig(true);
      setErrorMessage(
        "Please enter your free Formspree Form ID below (or set formspreeFormId in src/data/profile.ts) to receive submissions without exposing your email."
      );
      return;
    }

    const formEndpoint = `https://formspree.io/f/${activeId}`;

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          subject: subject || "Portfolio Direct Transmission",
          message: message,
        }),
      });

      if (response.ok) {
        if (typeof window !== "undefined" && customFormId.trim()) {
          localStorage.setItem("contact_formspree_id", customFormId.trim());
        }
        setSentSuccess(true);
        if (onTriggerAchievement) {
          onTriggerAchievement(
            "transmission_sent",
            "TRANSMISSION DISPATCHED",
            "Encrypted message delivered to Vijay's inbox via secure form handler!"
          );
        }
      } else {
        const data = await response.json().catch(() => ({}));
        if (data && data.error && data.error.toLowerCase().includes("not found")) {
          setShowConfig(true);
          setErrorMessage(
            `Form ID "${activeId}" was not found on Formspree. Please create a free form at formspree.io and paste your Form ID below.`
          );
        } else if (data && data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: any) => err.message).join(", "));
        } else {
          setErrorMessage("Failed to dispatch message via Formspree. Please check your Form ID.");
        }
      }
    } catch {
      setErrorMessage("Network error occurred. You can also connect directly via LinkedIn below.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSenderName("");
    setSenderEmail("");
    setSubject("");
    setMessage("");
    setSentSuccess(false);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#141b25] border border-slate-200 dark:border-[#2a3c52] shadow-2xl overflow-hidden flex flex-col">
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-[#1b2737] border-b border-slate-200 dark:border-[#2d3e56]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              DIRECT TRANSMISSION // SECURE CHANNEL
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Privacy & Anti-Scraper Banner */}
          {/* <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-[#121f2d] border border-blue-200/80 dark:border-[#1e344d] flex items-start gap-3 text-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              <span className="font-semibold text-slate-900 dark:text-white">Protected Channel:</span> Messages are routed directly to Vijay&apos;s private inbox via encrypted form handler. No email addresses are exposed to web scrapers.
            </div>
          </div> */}

          {sentSuccess ? (
            /* Transmission Success Screen */
            <div className="py-6 px-4 rounded-2xl bg-emerald-50/80 dark:bg-[#0d2218] border border-emerald-200 dark:border-[#1b4330] text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Transmission Dispatched Successfully!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Your message has been received. Vijay will review your transmission and get back to you at{" "}
                  <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">{senderEmail || "your email"}</span>.
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-[#162a20] border border-emerald-300 dark:border-[#2d5d43] text-emerald-800 dark:text-emerald-200 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-[#1f3a2c] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Send Another Message</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-[#203144] text-white text-xs font-semibold hover:bg-black dark:hover:bg-[#2c435c] transition-colors shadow-xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Contact Form */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Your Name / Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe / OpenAI"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0f151e] border border-slate-200 dark:border-[#2b3a4c] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 font-sans shadow-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0f151e] border border-slate-200 dark:border-[#2b3a4c] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 font-sans shadow-xs transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Neuromorphic Systems Research / Engineering Opportunity"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0f151e] border border-slate-200 dark:border-[#2b3a4c] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 font-sans shadow-xs transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details on opportunities, research collaborations, questions, or greetings..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0f151e] border border-slate-200 dark:border-[#2b3a4c] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 font-sans resize-none shadow-xs transition-colors"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-[#251b13] border border-amber-200 dark:border-[#4d381f] space-y-2 text-xs text-amber-800 dark:text-amber-200">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                    <span>{errorMessage}</span>
                  </div>

                  {showConfig && (
                    <div className="pt-2 border-t border-amber-200/60 dark:border-[#4d381f]/60 space-y-2">
                      <div className="text-[11px] leading-relaxed text-amber-700 dark:text-amber-300">
                        <strong>Quick Setup:</strong> Create a free form at{" "}
                        <a
                          href="https://formspree.io"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline font-bold text-amber-900 dark:text-amber-100 hover:opacity-80"
                        >
                          formspree.io
                        </a>{" "}
                        and enter your Form ID below:
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. mqaeovwk or your Form ID"
                          value={customFormId}
                          onChange={(e) => setCustomFormId(e.target.value.trim())}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-[#121922] border border-amber-300 dark:border-[#5a4328] text-slate-900 dark:text-white text-xs font-mono placeholder-slate-400 focus:outline-none focus:border-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (customFormId.trim()) {
                              localStorage.setItem("contact_formspree_id", customFormId.trim());
                              setErrorMessage(null);
                              setShowConfig(false);
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs"
                        >
                          Save ID
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-[#223348] hover:bg-slate-800 dark:hover:bg-[#2d425c] disabled:opacity-70 text-white font-semibold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 border border-slate-800 dark:border-[#385172] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>DISPATCHING TRANSMISSION...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND MESSAGE VIA SECURE HANDLER</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Direct Verified Links */}
          <div className="pt-3 border-t border-slate-100 dark:border-[#1d2938]">
            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#182330] border border-slate-200 dark:border-[#2b3c50] hover:border-slate-300 dark:hover:border-[#4d6b91] flex items-center justify-between transition-colors shadow-xs group"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    PROFESSIONAL NETWORK
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    linkedin.com/in/vijay-s-vivekanand
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
