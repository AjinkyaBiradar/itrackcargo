"use client";

import React, { useState } from "react";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedByMarquee } from "@/components/sections/TrustedByMarquee";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { LiveShowcase } from "@/components/sections/LiveShowcase";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StatsBand } from "@/components/sections/StatsBand";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { TrackingModal } from "@/components/sections/TrackingModal";
import { BookingModal } from "@/components/sections/BookingModal";

export default function Home() {
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [activeTrackingNo, setActiveTrackingNo] = useState("TRK-89240-US");
  
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedStepData, setSelectedStepData] = useState<any>(null);

  const handleOpenTrackModal = (trackingNo?: string) => {
    if (trackingNo) {
      setActiveTrackingNo(trackingNo);
    }
    setIsTrackModalOpen(true);
  };

  const handleOpenStepModal = (step: any) => {
    setSelectedStepData(step);
    setIsBookingModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#101010] relative">
      {/* 1. Slim Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Navbar */}
      <Navbar onOpenTrackModal={handleOpenTrackModal} />

      {/* 3. Hero Section with 3D Globe & Track Input */}
      <HeroSection onTrackSubmit={handleOpenTrackModal} />

      {/* 4. Trusted-By Logo Marquee */}
      <TrustedByMarquee />

      {/* 5. Feature Bento Grid */}
      <BentoGrid />

      {/* 6. Live Telemetry Dashboard Showcase */}
      <LiveShowcase />

      {/* 7. 4-Step How It Works Workflow */}
      <HowItWorks onStepClick={handleOpenStepModal} />

      {/* 8. Dark Stats Band */}
      <StatsBand />

      {/* 9. Client Testimonials Carousel */}
      <TestimonialsSection />

      {/* 10. Pricing Tiers */}
      <PricingSection />

      {/* 11. Final CTA Band */}
      <FinalCTA />

      {/* 12. Footer */}
      <Footer />

      {/* Interactive Tracking Modal / Drawer */}
      <TrackingModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        initialTrackingNo={activeTrackingNo}
      />

      {/* Interactive Vehicle Booking & Step Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        stepData={selectedStepData}
        onTrackDispatched={handleOpenTrackModal}
      />
    </main>
  );
}
