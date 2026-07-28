"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Globe2,
  Box,
  Truck,
  Ship,
  Plane,
  Building2,
  Layers,
  Zap,
} from "lucide-react";

const LOGOS = [
  { name: "MAERSK", icon: Ship, tagline: "Global Shipping" },
  { name: "DHL EXPRESS", icon: Plane, tagline: "Air Cargo Logistics" },
  { name: "FEDEX FREIGHT", icon: Truck, tagline: "Enterprise Ground" },
  { name: "AMAZON LOGISTICS", icon: Box, tagline: "Fulfillment Engine" },
  { name: "SCHNEIDER", icon: Layers, tagline: "Fleet Automation" },
  { name: "FLEXPORT", icon: Globe2, tagline: "Freight Forwarding" },
  { name: "KUEHNE+NAGEL", icon: Building2, tagline: "Sea & Air Freight" },
  { name: "XPO LOGISTICS", icon: Zap, tagline: "Supply Chain Solutions" },
];

export function TrustedByMarquee() {
  return (
    <section className="py-12 bg-[#FAF9F5] border-y border-[#E8E5DC]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs font-mono font-bold tracking-widest text-[#666] uppercase">
          Powering supply chains for 2,500+ global enterprises
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex" data-cursor="Clients">
        {/* Gradient Edge Fades */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#FAF9F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#FAF9F5] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track (Repeated twice for seamless infinite loop) */}
        <div className="animate-marquee flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
          {[...LOGOS, ...LOGOS].map((logo, index) => {
            const LogoIcon = logo.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E5DC] flex items-center justify-center shadow-sm group-hover:border-[#4338FF] group-hover:bg-[#4338FF]/5 transition-colors">
                  <LogoIcon className="w-5 h-5 text-[#101010] group-hover:text-[#4338FF]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-wider text-[#101010]">
                    {logo.name}
                  </span>
                  <span className="text-[10px] text-[#666] font-mono">
                    {logo.tagline}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
