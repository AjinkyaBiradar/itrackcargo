"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Play, Search, ShieldCheck, Sparkles, Package } from "lucide-react";
import { Balancer } from "@/components/common/Balancer";
import Link from "next/link";
import { GlobeScene } from "@/components/3d/GlobeScene";
import { PackageMotif } from "@/components/common/PackageMotif";
import { HeroVideoBg } from "./HeroVideoBg";

interface HeroSectionProps {
  onTrackSubmit: (trackingNo: string) => void;
}

export function HeroSection({ onTrackSubmit }: HeroSectionProps) {
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      onTrackSubmit("TRK-MH-4002-IN");
    } else {
      onTrackSubmit(inputVal);
    }
  };

  return (
    <section className="relative min-h-screen pt-32 lg:pt-36 pb-20 overflow-hidden bg-transparent">
      {/* Vector Canvas Background */}
      <HeroVideoBg />

      {/* Background Soft Lighting Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial from-[#4338FF]/10 via-transparent to-transparent pointer-events-none blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Interactive Track Input */}
          <div className="lg:col-span-6 z-10 space-y-8">

            {/* Oversized Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-headline text-[#101010]"
            >
              <Balancer>
                Precision tracking for Indian supply chains in{" "}
                <span className="text-[#4338FF] relative inline-block underline decoration-[#D6FF3D] decoration-wavy decoration-2">
                  real-time.
                </span>
              </Balancer>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#666] leading-relaxed max-w-xl"
            >
              Monitor parcels, optimize fleet routes dynamically, and track AIS-140 GPS vehicles across 500+ Indian cities.
            </motion.p>

            {/* Inline Track Package Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-md p-2 sm:p-2.5 rounded-[24px] border border-[#E8E5DC] shadow-[0_16px_36px_rgba(16,16,16,0.06)] hover-glow max-w-xl"
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full flex items-center pl-3">
                  <Package className="w-5 h-5 text-[#4338FF] shrink-0 mr-2" />
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Paste tracking number (e.g. #TRK-MH-4002-IN)..."
                    className="w-full py-2.5 bg-transparent text-sm font-medium text-[#101010] placeholder:text-[#8E8E93] focus:outline-none"
                    data-cursor="Type"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full sm:w-auto bg-[#101010] text-[#D6FF3D] hover:bg-[#4338FF] hover:text-white text-sm font-bold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2 shadow-md shrink-0 cursor-pointer"
                  data-cursor="Track"
                >
                  <Search className="w-4 h-4" />
                  Track Live
                </motion.button>
              </form>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.div
                whileHover={{ scale: 1.04, rotate: -0.5 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/signup"
                  className="bg-[#4338FF] text-white hover:bg-[#3228D9] text-base font-semibold px-8 py-4 rounded-full shadow-[0_12px_28px_rgba(67,56,255,0.32)] flex items-center gap-2.5 border border-[#6259FF]/40"
                  data-cursor="Start"
                >
                  Start shipping smarter
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href="#live-showcase"
                className="bg-white/90 backdrop-blur-md hover:bg-[#F3F1EA] text-[#101010] border border-[#E8E5DC] text-base font-semibold px-7 py-4 rounded-full shadow-sm flex items-center gap-2.5 transition-colors"
                data-cursor="Watch Demo"
              >
                <div className="w-6 h-6 rounded-full bg-[#4338FF]/10 text-[#4338FF] flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-[#4338FF] translate-x-0.5" />
                </div>
                Watch a 90-sec demo
              </motion.a>
            </motion.div>

            {/* Social Trust Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 pt-4 text-xs text-[#666]"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#4338FF]" /> SOC2 Type II Certified
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-[#D6FF3D] fill-[#D6FF3D]" /> 99.99% Uptime SLA
              </span>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Hero Globe Scene */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[500px] lg:min-h-[620px]">
            <GlobeScene />
          </div>
        </div>

        {/* Signature Package Motif Connecting Hero to Trusted-By */}
        <div className="mt-16 sm:mt-24 max-w-4xl mx-auto opacity-80">
          <PackageMotif width={700} height={80} variant="curved" />
        </div>
      </div>
    </section>
  );
}
