"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Package, ShieldCheck, Zap, Navigation, TrendingUp, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "Sub-Second Global Parcel Telemetry",
    subtitle: "Track 100,000+ simultaneous active shipments with zero latency across 150+ countries.",
    badge: "Real-Time GPS",
    icon: Navigation,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    metric: "99.98% Accuracy",
  },
  {
    id: 2,
    title: "Autonomous AI Route Optimization",
    subtitle: "Recalculate carrier routes dynamically around traffic bottlenecks and weather alerts.",
    badge: "Smart Dispatch",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
    metric: "-28% Fuel Cost",
  },
  {
    id: 3,
    title: "Enterprise Fleet Telemetry & SLA Reports",
    subtitle: "Unified command center for warehouse managers, dispatchers, and consumer notifications.",
    badge: "Analytics 4.0",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=1200&auto=format&fit=crop",
    metric: "< 1.2 min ETA Delay",
  },
];

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  mode: "login" | "signup";
}

export function AuthLayout({ children, title, subtitle, mode }: AuthLayoutProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = CAROUSEL_SLIDES[currentSlide];
  const SlideIcon = slide.icon;

  return (
    <div className="min-h-screen w-full flex bg-[#FAF9F5] text-[#101010] overflow-hidden">
      {/* LEFT SIDE: Automated Marketing Image Carousel (50% Split) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#101010] text-white flex-col justify-between p-12 overflow-hidden">
        {/* Background Image Carousel with Overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover opacity-40 filter contrast-125 brightness-90"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/60 to-transparent" />
            <div className="absolute inset-0 bg-radial from-[#4338FF]/30 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Top Header Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#101010] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5 text-[#4338FF]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              iLogiTrack
              <span className="w-2 h-2 rounded-full bg-[#D6FF3D] inline-block animate-pulse" />
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to site
          </Link>
        </div>

        {/* Middle Slide Content */}
        <div className="relative z-10 space-y-6 max-w-xl my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6FF3D] text-[#101010] text-xs font-mono font-bold uppercase tracking-wider shadow-md">
                <SlideIcon className="w-3.5 h-3.5 text-[#101010]" />
                {slide.badge}
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {slide.title}
              </h2>

              <p className="text-base text-white/80 leading-relaxed font-medium">
                {slide.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-[#D6FF3D] bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
                  ✓ {slide.metric}
                </span>
                <span className="text-xs text-white/60 font-mono">
                  SOC2 Type II Certified
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Slide Progress Indicators & Dots */}
        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/15">
          <div className="flex items-center gap-2">
            {CAROUSEL_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentSlide
                    ? "w-8 bg-[#D6FF3D]"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <span className="text-xs font-mono text-white/60 font-semibold">
            0{currentSlide + 1} / 0{CAROUSEL_SLIDES.length}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Form (50% Split Centered) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        {/* Mobile Header Logo */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#101010] text-[#D6FF3D] flex items-center justify-center shadow-md">
              <Package className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-[#101010]">iLogiTrack</span>
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8 my-auto">
          {/* Form Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-[#101010] tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-[#666] leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Form Content */}
          {children}

          {/* Bottom Switch Link */}
          <div className="text-center text-xs text-[#666] pt-4">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-[#4338FF] hover:underline"
                >
                  Start for Free →
                </Link>
              </p>
            ) : (
              <p>
                Already have an iLogiTrack account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#4338FF] hover:underline"
                >
                  Log in here →
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
