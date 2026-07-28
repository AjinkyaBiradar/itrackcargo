"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Navigation,
  Truck,
  TrendingUp,
  CreditCard,
  BellRing,
  Map,
  ShieldCheck,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { Balancer } from "@/components/common/Balancer";

export function BentoGrid() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <section id="features" className="py-24 bg-[#FAF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">

          <h2 className="section-title text-[#101010]">
            <Balancer>
              Engineered for high-volume enterprise operations.
            </Balancer>
          </h2>
          <p className="text-lg text-[#666] leading-relaxed">
            Everything your dispatchers, warehouse managers, and end customers need to control logistics in real-time.
          </p>
        </div>

        {/* Bento Grid (Uneven Tiles) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Tile 1: Real-Time Sub-Second Tracking (Large 8-col) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8 bg-white rounded-[24px] p-8 border border-[#E8E5DC] shadow-[0_16px_36px_rgba(16,16,16,0.04)] hover-glow relative overflow-hidden group flex flex-col justify-between"
            data-cursor="Live Map"
          >
            <div className="absolute top-0 right-0 p-8 opacity-15 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 text-[#4338FF]">
              <Map className="w-48 h-48 -mr-10 -mt-10" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#4338FF] text-white flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
                <Navigation className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4338FF]">
                Core Feature 01
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#101010]">
                Sub-Second Real-Time Parcel Tracking
              </h3>
              <p className="text-[#666] max-w-xl text-base leading-relaxed">
                Stream GPS, temperature sensor telemetry, and carrier status at 60Hz. Zero latency tracking updates for both logistics coordinators and consumers.
              </p>
            </div>

            {/* Micro Interaction Graphic */}
            <div className="mt-8 pt-6 border-t border-[#E8E5DC] flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6FF3D] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D6FF3D]"></span>
                </span>
                <span className="text-xs font-mono font-bold text-[#101010]">
                  150,000+ active tracking streams
                </span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#4338FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.div>

          {/* Tile 2: Fleet Management (4-col) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 bg-[#101010] text-white rounded-[24px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover-glow relative overflow-hidden group flex flex-col justify-between"
            data-cursor="Fleet"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D6FF3D] text-[#101010] flex items-center justify-center shadow-md group-hover:-rotate-6 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D6FF3D]">
                Core Feature 02
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Autonomous Fleet Telemetry
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Track vehicle health, driver behavior, fuel consumption, and maintenance schedules in one unified dashboard.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#D6FF3D]">
              <span>99.8% Fleet Utilization</span>
              <ArrowUpRight className="w-5 h-5 text-[#D6FF3D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.div>

          {/* Tile 3: Dynamic Route Optimization (4-col) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 bg-white rounded-[24px] p-8 border border-[#E8E5DC] shadow-[0_16px_36px_rgba(16,16,16,0.04)] hover-glow group flex flex-col justify-between"
            data-cursor="Routes"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#4338FF]/10 text-[#4338FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Map className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4338FF]">
                Core Feature 03
              </span>
              <h3 className="text-xl font-bold text-[#101010]">
                AI Route Optimization
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Automatically recalculate routes around traffic jams, weather events, and customs delays in real-time.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E5DC] text-xs font-semibold text-[#101010] flex items-center justify-between">
              <span>Avg. fuel cost cut by 28%</span>
              <ArrowUpRight className="w-4 h-4 text-[#4338FF]" />
            </div>
          </motion.div>

          {/* Tile 4: Predictive Analytics (4-col) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 bg-white rounded-[24px] p-8 border border-[#E8E5DC] shadow-[0_16px_36px_rgba(16,16,16,0.04)] hover-glow group flex flex-col justify-between"
            data-cursor="Analytics"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D6FF3D] text-[#101010] flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#101010]">
                Core Feature 04
              </span>
              <h3 className="text-xl font-bold text-[#101010]">
                Delivery Intelligence & Analytics
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Deep SLA reports, carrier performance comparisons, and bottleneck forecasting out of the box.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E5DC] text-xs font-semibold text-[#101010] flex items-center justify-between">
              <span>Automated Weekly Reports</span>
              <ArrowUpRight className="w-4 h-4 text-[#4338FF]" />
            </div>
          </motion.div>

          {/* Tile 5: Smart Notifications & Billing (4-col) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 bg-[#FAF9F5] rounded-[24px] p-8 border border-[#E8E5DC] shadow-[0_16px_36px_rgba(16,16,16,0.04)] hover-glow group flex flex-col justify-between"
            data-cursor="Alerts"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#4338FF] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <BellRing className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4338FF]">
                Core Feature 05
              </span>
              <h3 className="text-xl font-bold text-[#101010]">
                Automated Customer Alerts
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Send SMS, WhatsApp, and email delivery updates with customized branded tracking pages.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E5DC] text-xs font-semibold text-[#101010] flex items-center justify-between">
              <span>98.4% Open Rate</span>
              <ArrowUpRight className="w-4 h-4 text-[#4338FF]" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
