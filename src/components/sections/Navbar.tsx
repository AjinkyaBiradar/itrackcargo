"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Package, Menu, X, ArrowRight, ShieldCheck, Search } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onOpenTrackModal?: (trackingNo?: string) => void;
}

export function Navbar({ onOpenTrackModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Product", href: "#features" },
    { name: "Live Demo", href: "#live-showcase" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3.5 shadow-[0_10px_30px_rgba(16,16,16,0.06)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group" data-cursor="iLogiTrack">
          <div className="w-10 h-10 rounded-2xl bg-[#101010] text-[#D6FF3D] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-[#4338FF]/30">
            <Package className="w-5 h-5 text-[#D6FF3D]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#101010] flex items-center gap-1">
              iLogiTrack
              <span className="w-2 h-2 rounded-full bg-[#4338FF] inline-block animate-pulse" />
            </span>
            <span className="text-[10px] tracking-widest font-mono text-[#666] uppercase -mt-1">
              Autonomous Logistics
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 bg-white/60 backdrop-blur-md px-6 py-2 rounded-full border border-[#E8E5DC]/80 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#101010]/80 hover:text-[#4338FF] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => onOpenTrackModal?.()}
            className="text-sm font-semibold text-[#4338FF] hover:text-[#3228D9] flex items-center gap-1.5 transition-colors cursor-pointer"
            data-cursor="Lookup"
          >
            <Search className="w-3.5 h-3.5" />
            Track Order
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-[#101010] hover:text-[#4338FF] px-4 py-2 rounded-full transition-colors"
          >
            Log in
          </Link>
          <motion.div
            whileHover={{ scale: 1.04, rotate: -0.5 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/signup"
              className="bg-[#4338FF] text-white hover:bg-[#3228D9] text-sm font-semibold px-6 py-2.5 rounded-full shadow-[0_10px_24px_rgba(67,56,255,0.3)] flex items-center gap-2 border border-[#6259FF]/50"
              data-cursor="Get Started"
            >
              Start for Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-2xl bg-white border border-[#E8E5DC] text-[#101010] shadow-sm"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#FAF9F5]/98 backdrop-blur-xl border-b border-[#E8E5DC] px-6 py-8 shadow-2xl absolute top-full left-0 right-0"
          >
            <div className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold text-[#101010] hover:text-[#4338FF] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrackModal?.();
                }}
                className="text-lg font-semibold text-[#4338FF] text-left flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Track a Parcel
              </button>

              <hr className="border-[#E8E5DC]" />

              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full border border-[#E8E5DC] font-semibold text-[#101010]"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-[#4338FF] text-white font-semibold shadow-lg"
                >
                  Start for Free →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
