"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Globe, PackageCheck, Clock, ShieldCheck } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function AnimatedCounter({ end, suffix = "", prefix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  const STATS = [
    {
      label: "Parcels Tracked & Delivered",
      val: 250,
      suffix: "M+",
      prefix: "",
      icon: PackageCheck,
      desc: "Across global logistics networks",
    },
    {
      label: "On-Time SLA Guarantee",
      val: 99.7,
      suffix: "%",
      prefix: "",
      decimals: 1,
      icon: ShieldCheck,
      desc: "Sub-second route re-routing",
    },
    {
      label: "Countries & Hubs Served",
      val: 150,
      suffix: "+",
      prefix: "",
      icon: Globe,
      desc: "Global multi-carrier support",
    },
    {
      label: "Avg. Support Response",
      val: 1.8,
      suffix: " min",
      prefix: "< ",
      decimals: 1,
      icon: Clock,
      desc: "24/7 dedicated dispatch team",
    },
  ];

  return (
    <section className="py-20 bg-[#101010] text-white relative overflow-hidden border-y border-white/10">
      {/* Ambient background lime glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#4338FF]/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 rounded-[24px] p-6 border border-white/10 hover:border-[#D6FF3D]/50 transition-colors group"
                data-cursor="Stats"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D6FF3D] text-[#101010] flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                    Verified Metric
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono mb-2">
                  <AnimatedCounter
                    end={stat.val}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    decimals={stat.decimals}
                  />
                </div>

                <h4 className="text-base font-bold text-white/90">{stat.label}</h4>
                <p className="text-xs text-white/50 mt-1">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
