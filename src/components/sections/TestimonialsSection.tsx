"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote, Building2, CheckCircle } from "lucide-react";
import { Balancer } from "@/components/common/Balancer";

const REVIEWS = [
  {
    id: 1,
    name: "Elena Rostova",
    role: "VP of Global Supply Chain",
    company: "Nordic Commerce Group",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    text: "iLogiTrack eliminated 95% of customer 'Where is my order?' support tickets within 30 days. Their sub-second tracking accuracy is night and day compared to legacy carrier pages.",
    rating: 5,
    metrics: "Reduced WISMO tickets by 95%",
  },
  {
    id: 2,
    name: "Marcus Vance",
    role: "Director of Fleet Operations",
    company: "Vance Freight Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    text: "The AI route optimization saved our fleet over $420,000 in fuel costs during peak holiday season alone. The dynamic rerouting around weather delays is pure magic.",
    rating: 5,
    metrics: "Saved $420,000 in fuel costs",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Head of Logistics Technology",
    company: "Apex Air Cargo",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    text: "Integrating iLogiTrack's API took our dev team less than 2 hours. We now stream real-time parcel telemetry to 4 million monthly active app users flawlessly.",
    rating: 5,
    metrics: "4M+ active app users served",
  },
];

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-24 bg-[#FAF9F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">

            <h2 className="section-title text-[#101010]">
              <Balancer>Trusted by world-class logistics leaders.</Balancer>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-white border border-[#E8E5DC] text-[#101010] flex items-center justify-center hover:bg-[#4338FF] hover:text-white hover:border-[#4338FF] transition-all shadow-sm"
              aria-label="Previous testimonial"
              data-cursor="Prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-white border border-[#E8E5DC] text-[#101010] flex items-center justify-center hover:bg-[#4338FF] hover:text-white hover:border-[#4338FF] transition-all shadow-sm"
              aria-label="Next testimonial"
              data-cursor="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6"
              >
                <motion.div
                  whileHover={{ y: -8, rotate: -0.5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white rounded-[24px] p-8 border border-[#E8E5DC] shadow-[0_16px_36px_rgba(16,16,16,0.04)] hover-glow h-full flex flex-col justify-between"
                  data-cursor="Drag"
                >
                  <div className="space-y-6">
                    {/* Stars */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 text-[#4338FF]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#4338FF]" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-[#D6FF3D] text-[#101010] px-2 py-0.5 rounded-full">
                        {review.metrics}
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-base text-[#101010] font-medium leading-relaxed italic">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Author Meta */}
                  <div className="mt-8 pt-6 border-t border-[#E8E5DC] flex items-center gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#4338FF]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#101010] flex items-center gap-1">
                        {review.name}
                        <CheckCircle className="w-3.5 h-3.5 text-[#4338FF]" />
                      </h4>
                      <p className="text-xs text-[#666]">{review.role}</p>
                      <p className="text-[11px] font-mono text-[#4338FF] font-semibold">
                        {review.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
