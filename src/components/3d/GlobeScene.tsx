"use client";

import React from "react";
import dynamic from "next/dynamic";

const GlobeInner = dynamic(() => import("./GlobeInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#4338FF]/30 to-[#D6FF3D]/20 blur-xl animate-pulse flex items-center justify-center border border-[#4338FF]/20">
        <div className="w-48 h-48 rounded-full border border-dashed border-[#4338FF]/40 animate-spin" />
      </div>
    </div>
  ),
});

export function GlobeScene() {
  return (
    <div className="relative w-full h-[500px] lg:h-[650px] flex items-center justify-center overflow-visible">
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#4338FF]/20 via-[#4338FF]/10 to-[#D6FF3D]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Dynamic 3D Globe with Client SSR Guard */}
      <GlobeInner />
    </div>
  );
}
