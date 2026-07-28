"use client";

import React from "react";
import { motion } from "motion/react";
import { UserPlus, CalendarPlus, Navigation, CheckCircle2, ArrowRight } from "lucide-react";
import { Balancer } from "@/components/common/Balancer";
import { PackageMotif } from "@/components/common/PackageMotif";

const STEPS = [
  {
    step: "01",
    title: "Create Account & Connect Carrier APIs",
    description: "Plug in your existing FedEx, DHL, UPS, or custom fleet API credentials in under 2 minutes.",
    icon: UserPlus,
    accent: "bg-[#4338FF] text-white",
  },
  {
    step: "02",
    title: "Book & Send Packages",
    description: "Choose a vehicle, enter pickup & delivery addresses, and send your parcel in seconds.",
    icon: CalendarPlus,
    accent: "bg-[#101010] text-[#D6FF3D]",
  },
  {
    step: "03",
    title: "Track Live Telemetry",
    description: "Watch real-time GPS coordinates, sub-second route recalculations, and automated ETA alerts.",
    icon: Navigation,
    accent: "bg-[#D6FF3D] text-[#101010]",
  },
  {
    step: "04",
    title: "Delivered & Customer Delighted",
    description: "Receive instant proof of delivery, photo signatures, and automated customer feedback ratings.",
    icon: CheckCircle2,
    accent: "bg-[#4338FF] text-white",
  },
];

interface HowItWorksProps {
  onStepClick?: (step: typeof STEPS[0]) => void;
}

export function HowItWorks({ onStepClick }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-24 bg-[#FAF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">

          <h2 className="section-title text-[#101010]">
            <Balancer>From warehouse manifest to customer doorstep in four frictionless steps.</Balancer>
          </h2>
          <p className="text-lg text-[#666]">
            No complex setup or legacy software migrations required.
          </p>
        </div>

        {/* Desktop Connected Progress Line Motif */}
        <div className="hidden lg:block mb-12">
          <PackageMotif width={1000} height={90} variant="horizontal" />
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                onClick={() => onStepClick?.(item)}
                className="bg-white rounded-[24px] p-8 border border-[#E8E5DC] shadow-[0_16px_36px_rgba(16,16,16,0.04)] hover-glow flex flex-col justify-between group cursor-pointer"
                data-cursor={`Step ${item.step}`}
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#666] tracking-wider uppercase">
                      Step {item.step}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl ${item.accent} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#101010] mb-3 group-hover:text-[#4338FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#666] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8E5DC] flex items-center text-xs font-semibold text-[#4338FF]">
                  <span>Explore step details</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
