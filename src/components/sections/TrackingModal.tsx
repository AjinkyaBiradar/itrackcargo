"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Package,
  CheckCircle,
  Truck,
  MapPin,
  Clock,
  Building,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PackageMotif } from "@/components/common/PackageMotif";

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackingNo?: string;
}

export function TrackingModal({
  isOpen,
  onClose,
  initialTrackingNo = "TRK-89240-US",
}: TrackingModalProps) {
  const [trackingCode, setTrackingCode] = useState(initialTrackingNo);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 600);
  };

  const steps = [
    { title: "Order Confirmed & Manifest Created", location: "Bhiwandi Logistics Hub, Mumbai", time: "Today, 07:40 AM", status: "completed" },
    { title: "In Transit — Highway Freight (AIS-140 GPS Active)", location: "Surat NH-48 Expressway Node", time: "Today, 11:15 AM", status: "completed" },
    { title: "Out for Last-Mile Delivery", location: "Okhla Sorting Depot, New Delhi NCR", time: "Today, 01:30 PM", status: "active" },
    { title: "Estimated Delivery", location: "Destination Customer Address", time: "Today by 04:30 PM", status: "upcoming" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#101010]/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-2xl bg-[#FAF9F5] rounded-[28px] p-6 sm:p-8 shadow-[0_32px_64px_rgba(0,0,0,0.25)] border border-white/80 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white border border-[#E8E5DC] text-[#101010] flex items-center justify-center hover:bg-[#101010] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#4338FF] text-white flex items-center justify-center shadow-md">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#101010] flex items-center gap-2">
                  India Telemetry & AIS-140 GPS Radar
                  <span className="text-[10px] font-mono font-bold bg-[#D6FF3D] text-[#101010] px-2 py-0.5 rounded-full uppercase">
                    Active
                  </span>
                </h3>
                <p className="text-xs text-[#666]">Real-time Indian carrier GPS coordinates & vehicle speed</p>
              </div>
            </div>

            {/* Search Input in Modal */}
            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Enter tracking number (e.g. TRK-MH-4002-IN)"
                className="flex-1 px-4 py-3 bg-white border border-[#E8E5DC] rounded-2xl text-sm font-mono font-semibold text-[#101010] focus:outline-none focus:border-[#4338FF] shadow-inner"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="bg-[#101010] text-[#D6FF3D] hover:bg-[#4338FF] hover:text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-colors flex items-center gap-2"
              >
                {isSearching ? "Updating..." : "Refresh"}
                <Sparkles className="w-4 h-4" />
              </button>
            </form>

            {/* Live Progress Signature Motif */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8E5DC] mb-6 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-[#666]">Carrier: <strong className="text-[#101010]">Delhivery Express (AIS-140 GPS Network)</strong></span>
                <span className="text-[#4338FF] font-mono font-bold">ETA: 04:30 PM Today</span>
              </div>
              <PackageMotif width={520} height={70} variant="horizontal" />
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.status === "completed"
                          ? "bg-[#4338FF] text-white"
                          : step.status === "active"
                          ? "bg-[#D6FF3D] text-[#101010] ring-4 ring-[#D6FF3D]/30 animate-pulse"
                          : "bg-[#E8E5DC] text-[#8E8E93]"
                      }`}
                    >
                      {step.status === "completed" ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-0.5 h-8 bg-[#E8E5DC] my-1" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#101010]">{step.title}</h4>
                      <span className="text-[11px] font-mono text-[#666]">{step.time}</span>
                    </div>
                    <p className="text-xs text-[#666] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#4338FF]" />
                      {step.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer Note */}
            <div className="mt-6 pt-4 border-t border-[#E8E5DC] flex items-center justify-between text-xs text-[#666]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#4338FF]" />
                End-to-End Encrypted Telemetry
              </span>
              <button
                onClick={onClose}
                className="text-[#4338FF] font-semibold hover:underline"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
