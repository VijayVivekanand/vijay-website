"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xp?: number;
}

interface SteamAchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const SteamAchievementToast: React.FC<SteamAchievementToastProps> = ({
  achievement,
  onClose,
}) => {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#141b24] border border-[#2a3a4e] rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] p-3.5 select-none"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1a2330] border border-[#33475e] flex items-center justify-center flex-shrink-0 text-slate-200">
              <Trophy className="w-5 h-5 text-slate-300" />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Achievement Unlocked</span>
                {achievement.xp && (
                  <span className="text-slate-300 font-mono">+{achievement.xp} XP</span>
                )}
              </div>
              <div className="font-bold text-white text-xs sm:text-sm truncate mt-0.5">
                {achievement.title}
              </div>
              <div className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                {achievement.description}
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
