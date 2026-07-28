"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Package, Plane, Truck, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

const UPDATES = [
  {
    id: 1,
    trackingNo: "TRK-9842-US",
    status: "Out for Delivery",
    location: "San Francisco Hub",
    eta: "14 mins",
    icon: Package,
    badgeColor: "bg-[#D6FF3D] text-[#101010]",
  },
  {
    id: 2,
    trackingNo: "AF-8920-EU",
    status: "Landed in Frankfurt",
    location: "FRA Airport Hub",
    eta: "In Transit",
    icon: Plane,
    badgeColor: "bg-[#4338FF] text-white",
  },
  {
    id: 3,
    trackingNo: "FLEET-109",
    status: "Optimal Route Recalculated",
    location: "Route #A44 — Highway E45",
    eta: "Saved 22 mins",
    icon: Truck,
    badgeColor: "bg-[#101010] text-[#D6FF3D]",
  },
];

export function HeroFloatingCards() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % UPDATES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeItem = UPDATES[activeIndex];

  return (
    <>
      {/* Top Left Floating Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        className="absolute top-12 left-4 lg:-left-6 z-20 hidden sm:block"
        data-cursor="Live"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="glass-card rounded-[20px] p-4 shadow-[0_20px_40px_rgba(16,16,16,0.08)] border border-white/80 max-w-[260px]"
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-[#666] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4338FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4338FF]"></span>
              </span>
              Live Telemetry
            </span>
            <span className="text-[10px] font-mono bg-[#4338FF]/10 text-[#4338FF] px-2 py-0.5 rounded-full font-bold">
              Sub-second
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono font-bold text-[#101010]">{activeItem.trackingNo}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeItem.badgeColor}`}>
                  {activeItem.eta}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#101010] leading-tight flex items-center gap-1.5">
                <activeItem.icon className="w-4 h-4 text-[#4338FF] shrink-0" />
                {activeItem.status}
              </p>
              <p className="text-[11px] text-[#666]">{activeItem.location}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Bottom Right Floating Badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bottom-16 right-4 lg:-right-4 z-20 hidden md:block"
        data-cursor="Security"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="glass-card rounded-[20px] p-4 shadow-[0_24px_48px_rgba(67,56,255,0.12)] border border-[#4338FF]/20 max-w-[240px]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#101010] text-[#D6FF3D] flex items-center justify-center shrink-0 shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#101010]">99.98% Accuracy</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4338FF]" />
              </div>
              <p className="text-[11px] text-[#666]">AI Route Optimization active across 150+ countries</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
