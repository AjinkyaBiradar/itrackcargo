"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Balancer } from "@/components/common/Balancer";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-24 bg-[#101010] text-white relative overflow-hidden">
      {/* Background Kinetic Lighting Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4338FF]/30 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D6FF3D]/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">


          <h2 className="hero-headline text-white">
            <Balancer>
              Ready to transform your logistics into a competitive advantage?
            </Balancer>
          </h2>

          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Join 2,500+ global brands who trust iLogiTrack for sub-second parcel tracking, dynamic route optimization, and SLA compliance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -0.5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/signup"
                className="bg-[#D6FF3D] text-[#101010] hover:bg-white text-lg font-bold px-9 py-5 rounded-full shadow-[0_16px_36px_rgba(214,255,61,0.3)] flex items-center gap-3 transition-colors"
                data-cursor="Get Started"
              >
                Start Your 14-Day Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#live-showcase"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-lg font-semibold px-8 py-5 rounded-full backdrop-blur-md transition-colors"
              data-cursor="Schedule Demo"
            >
              Schedule Enterprise Demo
            </motion.a>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-white/50 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D6FF3D]" /> No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#D6FF3D]" /> Instant Carrier API Access
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D6FF3D]" /> Cancel Anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
