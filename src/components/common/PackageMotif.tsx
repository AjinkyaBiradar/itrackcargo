"use client";

import React from "react";
import { motion } from "motion/react";
import { Package, MapPin } from "lucide-react";

interface PackageMotifProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: "horizontal" | "curved" | "vertical";
  showEndPin?: boolean;
}

export function PackageMotif({
  width = 600,
  height = 120,
  className = "",
  variant = "curved",
  showEndPin = true,
}: PackageMotifProps) {
  // Path definitions based on variant
  const curvedPath = `M 20 ${height / 2} Q ${width / 4} ${height * 0.15}, ${width / 2} ${height / 2} T ${width - 30} ${height / 2}`;
  const horizontalPath = `M 20 ${height / 2} L ${width - 30} ${height / 2}`;
  const verticalPath = `M ${width / 2} 20 L ${width / 2} ${height - 30}`;

  const pathString =
    variant === "horizontal"
      ? horizontalPath
      : variant === "vertical"
      ? verticalPath
      : curvedPath;

  return (
    <div className={`relative flex items-center justify-center overflow-visible ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        {/* Background glow path */}
        <path
          d={pathString}
          stroke="rgba(67, 56, 255, 0.15)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Dashed animated route path */}
        <path
          d={pathString}
          stroke="#4338FF"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
          className="dashed-route-path"
        />

        {/* Start Point */}
        <circle cx={20} cy={height / 2} r="5" fill="#4338FF" />
        <circle cx={20} cy={height / 2} r="10" fill="rgba(67, 56, 255, 0.2)" />

        {/* End Destination Pin */}
        {showEndPin && (
          <g transform={`translate(${width - 35}, ${height / 2 - 16})`}>
            <circle cx="12" cy="12" r="14" fill="#D6FF3D" className="shadow-lg" />
            <circle cx="12" cy="12" r="6" fill="#101010" />
          </g>
        )}
      </svg>

      {/* Traveling Parcel Pin Container */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-[#101010] text-[#D6FF3D] rounded-full shadow-[0_8px_20px_rgba(67,56,255,0.3)] border-2 border-[#D6FF3D] pointer-events-none"
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          offsetPath: `path('${pathString}')`,
        }}
      >
        <Package className="w-4 h-4 animate-pulse" />
      </motion.div>
    </div>
  );
}
