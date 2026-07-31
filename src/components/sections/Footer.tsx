"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Package,
  ArrowUp,
  Send,
  ShieldCheck,
  Globe,
  Bot,
  Share2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! Check your inbox for our supply chain report.");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerNav = {
    product: [
      { name: "Real-Time Tracking", href: "#features" },
      { name: "Fleet Telemetry", href: "#features" },
      { name: "AI Route Optimizer", href: "#features" },
      { name: "Live Dashboard Demo", href: "#live-showcase" },
      { name: "Carrier API Docs", href: "#pricing" },
    ],
    company: [
      { name: "About iLogiTrack", href: "#" },
      { name: "Careers (We're Hiring)", href: "#" },
      { name: "Press & Media Kit", href: "#" },
      { name: "Customer Stories", href: "#" },
      { name: "Security & Compliance", href: "#" },
    ],
    resources: [
      { name: "Supply Chain Insights", href: "#" },
      { name: "Global Carrier Index", href: "#" },
      { name: "Developer Documentation", href: "#" },
      { name: "System Status Page", href: "#" },
      { name: "Contact Support", href: "#" },
    ],
  };

  return (
    <footer className="bg-[#FAF9F5] pt-20 pb-12 border-t border-[#E8E5DC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E8E5DC]">
          {/* Brand & Newsletter (5-col) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#101010] text-[#D6FF3D] flex items-center justify-center shadow-md">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#101010]">
                iLogiTrack
              </span>
            </a>

            <p className="text-sm text-[#666] leading-relaxed max-w-sm">
              The autonomous tracking and fleet intelligence platform powering sub-second delivery visibility for 2,500+ global enterprises.
            </p>

            {/* Newsletter Input */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#101010] uppercase tracking-wider">
                Subscribe to Logistics Dispatch
              </span>
              <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email..."
                  className="flex-1 px-4 py-3 bg-white border border-[#E8E5DC] rounded-2xl text-sm text-[#101010] focus:outline-none focus:border-[#4338FF] shadow-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#101010] text-[#D6FF3D] hover:bg-[#4338FF] hover:text-white px-5 py-3 rounded-2xl text-sm font-semibold transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
                  data-cursor="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[11px] text-[#666]">Monthly logistics telemetry reports. Zero spam.</p>
            </div>
          </div>

          {/* Nav Columns (7-col) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#101010] mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                {footerNav.product.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-[#666] hover:text-[#4338FF] transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#101010] mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {footerNav.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-[#666] hover:text-[#4338FF] transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#101010] mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerNav.resources.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm text-[#666] hover:text-[#4338FF] transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Mascot + Socials + Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#666]">
          <div className="flex items-center gap-3">
            {/* Idle Animated Delivery Bot Mascot */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 rounded-full bg-[#101010] text-[#D6FF3D] flex items-center justify-center shadow-sm"
              title="iLogiBot Dispatch Sentinel"
            >
              <Bot className="w-4 h-4 animate-pulse" />
            </motion.div>
            <span>© {new Date().getFullYear()} iLogiTrack Inc. All rights reserved.</span>
          </div>

          {/* Social & Compliance Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#E8E5DC] text-[#101010] flex items-center justify-center hover:bg-[#4338FF] hover:text-white transition-colors" aria-label="Global Network" title="Global Network">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#E8E5DC] text-[#101010] flex items-center justify-center hover:bg-[#4338FF] hover:text-white transition-colors" aria-label="Share" title="Share Platform">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white border border-[#E8E5DC] text-[#101010] flex items-center justify-center hover:bg-[#4338FF] hover:text-white transition-colors" aria-label="Security" title="SOC2 Security">
              <Lock className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono font-bold text-[#101010] hover:text-[#4338FF] transition-colors cursor-pointer"
            data-cursor="Top"
          >
            <span>BACK TO TOP</span>
            <div className="w-8 h-8 rounded-full bg-white border border-[#E8E5DC] flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
