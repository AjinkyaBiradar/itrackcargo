"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Sparkles, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { Balancer } from "@/components/common/Balancer";
import Link from "next/link";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const PLANS = [
    {
      name: "Starter India Fleet",
      desc: "Ideal for growing Indian logistics operators and regional e-commerce delivery fleets.",
      priceMonthly: 1999,
      priceAnnual: 1499,
      parcels: "Up to 50 AIS-140 GPS Vehicles",
      popular: false,
      cta: "Start 14-Day Free Trial",
      features: [
        "AIS-140 Certified GPS Telemetry Tracking",
        "Delhivery, Blue Dart & Safexpress API integration",
        "Branded customer tracking portal in Hindi & English",
        "SMS & WhatsApp delivery notifications",
        "Standard SLA support (9am-6pm IST)",
      ],
    },
    {
      name: "Pro India Logistics",
      desc: "For mid-to-large scale Indian fleets demanding AI highway route optimization.",
      priceMonthly: 5999,
      priceAnnual: 4999,
      parcels: "Up to 500 AIS-140 GPS Vehicles",
      popular: true,
      cta: "Start 14-Day Free Trial",
      features: [
        "Everything in Starter India, plus:",
        "Mumbai-Delhi & Pan-India AI Route Optimization",
        "Unlimited Indian Carrier & Fleet API Integrations",
        "Automated Temperature & Cold-Chain Telemetry",
        "Recharts Analytics & Interstate Toll Console",
        "24/7 Dedicated IST SLA Account Manager",
        "99.99% Uptime SLA Guarantee",
      ],
    },
    {
      name: "Enterprise Pan-India",
      desc: "Custom infrastructure for national freight operators shipping over 100k+ parcels monthly.",
      priceMonthly: 18999,
      priceAnnual: 14999,
      parcels: "Unlimited AIS-140 Fleet & Custom SLAs",
      popular: false,
      cta: "Contact Enterprise Sales",
      features: [
        "Everything in Pro India, plus:",
        "Dedicated Private Telemetry Server in India (Mumbai / HYD)",
        "Custom ERP (SAP, Tally, Oracle) Integration",
        "E-Way Bill & GST Portal Automated Sync",
        "On-Premise India Data Residency Options",
        "Custom Contract & Audit Terms",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#FAF9F5] relative overflow-hidden border-t border-[#E8E5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">

          <h2 className="section-title text-[#101010]">
            <Balancer>Transparent plans that scale with your shipping volume.</Balancer>
          </h2>
          <p className="text-lg text-[#666]">
            No surprise overage fees. Switch or cancel anytime.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="pt-6 flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold ${!isAnnual ? "text-[#101010]" : "text-[#666]"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-9 rounded-full bg-[#101010] p-1 transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle Billing Period"
              data-cursor="Toggle"
            >
              <motion.div
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-7 h-7 rounded-full bg-[#D6FF3D] shadow-md flex items-center justify-center text-[#101010]"
              >
                <Zap className="w-3.5 h-3.5 fill-[#101010]" />
              </motion.div>
            </button>
            <span className={`text-sm font-semibold flex items-center gap-2 ${isAnnual ? "text-[#101010]" : "text-[#666]"}`}>
              Annual Billing
              <span className="text-[10px] font-bold font-mono bg-[#D6FF3D] text-[#101010] px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#101010]/10">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
          {PLANS.map((plan) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <motion.div
                key={plan.name}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-[32px] p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#101010] text-white shadow-[0_32px_64px_rgba(67,56,255,0.25)] border-2 border-[#4338FF] lg:-translate-y-4"
                    : "bg-white text-[#101010] border border-[#E8E5DC] shadow-[0_16px_36px_rgba(16,16,16,0.04)]"
                }`}
                data-cursor={plan.name}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4338FF] text-white text-xs font-bold font-mono uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-[#6259FF]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D6FF3D] fill-[#D6FF3D]" />
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <span className={`text-xs font-mono font-semibold px-3 py-1 rounded-full ${
                      plan.popular ? "bg-white/10 text-[#D6FF3D]" : "bg-[#FAF9F5] text-[#666]"
                    }`}>
                      {plan.parcels}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed mb-6 ${plan.popular ? "text-white/70" : "text-[#666]"}`}>
                    {plan.desc}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-current/10">
                    <span className="text-4xl font-extrabold font-mono tracking-tight">₹{price.toLocaleString("en-IN")}</span>
                    <span className={`text-sm font-medium ${plan.popular ? "text-white/60" : "text-[#666]"}`}>
                      / month
                    </span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-medium">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.popular ? "bg-[#D6FF3D] text-[#101010]" : "bg-[#4338FF] text-white"
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className={plan.popular ? "text-white/90" : "text-[#101010]/80"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/signup"
                    className={`w-full py-4 rounded-full font-bold text-center flex items-center justify-center gap-2 shadow-md transition-colors ${
                      plan.popular
                        ? "bg-[#D6FF3D] text-[#101010] hover:bg-white"
                        : "bg-[#101010] text-[#FAF9F5] hover:bg-[#4338FF] hover:text-white"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
