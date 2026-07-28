"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#101010] text-[#FAF9F5] text-xs font-medium relative z-50 overflow-hidden border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center justify-center gap-2 text-center">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D6FF3D] text-[#101010] font-bold text-[10px] uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> New Release
              </span>
              <span className="text-white/90">
                Now live: autonomous multi-carrier parcel tracking across <strong className="text-[#D6FF3D] font-semibold">150+ countries</strong>
              </span>
              <a
                href="#live-showcase"
                className="hidden sm:inline-flex items-center gap-1 text-[#D6FF3D] hover:underline font-semibold ml-1 group"
                data-cursor="Explore"
              >
                Explore platform <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
              aria-label="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
