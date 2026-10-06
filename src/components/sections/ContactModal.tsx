"use client";

import React, { useState } from "react";
import { PROFILE_DATA } from "@/data/profile";
import {
  Mail,
  Phone,
  Linkedin,
  X,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE_DATA.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PROFILE_DATA.email}?subject=Collaboration / Opportunity from ${encodeURIComponent(
      senderName || "Recruiter/Colleague"
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
    setSentSuccess(true);

    if (onTriggerAchievement) {
      onTriggerAchievement(
        "transmission_sent",
        "TRANSMISSION INITIATED",
        "Direct communication channel established with Vijay!"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#141b25] border border-slate-200 dark:border-[#2a3c52] shadow-2xl overflow-hidden flex flex-col">
        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-[#1b2737] border-b border-slate-200 dark:border-[#2d3e56]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              DIRECT TRANSMISSION // VIJAY SHANKARAN
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Quick Direct Channels */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              DIRECT PROTOCOLS:
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Email */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#182330] border border-slate-200 dark:border-[#2b3c50] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">EMAIL</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">{PROFILE_DATA.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded bg-white dark:bg-[#202e42] hover:bg-slate-100 dark:hover:bg-[#2c3f58] text-slate-800 dark:text-slate-200 text-xs font-mono font-bold border border-slate-200 dark:border-[#3d5370] shadow-sm"
                >
                  {copiedEmail ? "COPIED" : "COPY"}
                </button>
              </div>

              {/* Phone */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#182330] border border-slate-200 dark:border-[#2b3c50] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">PHONE</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">{PROFILE_DATA.phone}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="px-2.5 py-1 rounded bg-white dark:bg-[#202e42] hover:bg-slate-100 dark:hover:bg-[#2c3f58] text-slate-800 dark:text-slate-200 text-xs font-mono font-bold border border-slate-200 dark:border-[#3d5370] shadow-sm"
                >
                  {copiedPhone ? "COPIED" : "COPY"}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#182330] border border-slate-200 dark:border-[#2b3c50] hover:border-slate-300 dark:hover:border-[#4d6b91] flex items-center justify-between transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-slate-700 dark:text-sky-400" />
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">PROFESSIONAL NETWORK</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">linkedin.com/in/vijay-s-vivekanand</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </a>
            </div>
          </div>

          {/* Quick Email Launcher Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-slate-200 dark:border-[#233346]">
            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              DISPATCH DIRECT MESSAGE:
            </div>

            <div>
              <input
                type="text"
                required
                placeholder="Your Name / Organization"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0f151e] border border-slate-200 dark:border-[#2b3a4c] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 font-sans shadow-sm"
              />
            </div>

            <div>
              <textarea
                required
                rows={3}
                placeholder="Opportunity details, research collaboration, or greeting..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#0f151e] border border-slate-200 dark:border-[#2b3a4c] text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 font-sans resize-none shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-[#223348] hover:bg-slate-800 dark:hover:bg-[#2d425c] text-white font-semibold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 border border-slate-800 dark:border-[#385172]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SEND TRANSMISSION VIA EMAIL</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
