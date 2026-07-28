"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Activity, ShieldCheck, Radio, Cpu } from "lucide-react";

const SLIDES = [
  {
    badge: "REAL-TIME TELEMETRY",
    title: "Sub-meter precision for every vehicle.",
    desc: "Live GPS, temperature, and shock sensing streamed directly to your command center with zero latency.",
    stat: "1,420+ Live Vehicles",
    icon: Activity,
  },
  {
    badge: "PREDICTIVE AI ROUTING",
    title: "Bypass port congestion before delays occur.",
    desc: "Autonomous AI rerouting algorithm evaluates weather, dwell times, and customs bottlenecks 48 hours in advance.",
    stat: "99.99% ETA Precision",
    icon: Cpu,
  },
  {
    badge: "AUTOMATED COMPLIANCE",
    title: "Zero-touch cross-border customs clearance.",
    desc: "Automated digital bills of lading and instant verification for international trade lanes.",
    stat: "SOC2 Type II Certified",
    icon: ShieldCheck,
  },
];

export default function AuthMarketingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="w-full h-full min-h-[500px] bg-[#16233E] text-white p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5A1F]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00FF66]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-white text-[#15170F] flex items-center justify-center font-bold shadow-md">
            <Box className="w-5 h-5 text-[#FF5A1F]" />
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-white">
            iLogi<span className="text-[#FF5A1F]">Track</span>
          </span>
        </a>

        <div className="px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white/80 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
          <span>AUTONOMOUS NETWORK v2.4</span>
        </div>
      </div>

      <div className="relative z-10 max-w-lg my-auto py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-[#00FF66] font-bold w-fit">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>{slide.badge}</span>
            </div>

            <h2 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
              {slide.title}
            </h2>

            <p className="text-base text-white/70 font-normal leading-relaxed">
              {slide.desc}
            </p>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between mt-2 font-mono text-xs shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF5A1F] text-white flex items-center justify-center font-bold shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-white/50 block text-[10px]">NETWORK METRIC</span>
                  <span className="font-bold text-white text-sm">{slide.stat}</span>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-bold text-[11px]">
                Active Stream
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? "w-8 bg-[#FF5A1F]" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        <span className="text-white/40">
          0{currentSlide + 1} / 0{SLIDES.length}
        </span>
      </div>
    </div>
  );
}
