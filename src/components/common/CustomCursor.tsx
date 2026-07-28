"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    document.documentElement.classList.add("custom-cursor-active");

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "View";
        setCursorText(text);
        setIsHovered(true);
        return;
      }

      const interactive = target.closest("a, button, input, textarea, [role='button']");
      if (interactive) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[99999] hidden lg:block -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          scale: isHovered ? (cursorText ? 1.4 : 1.2) : 1,
          width: cursorText ? "auto" : isHovered ? "28px" : "12px",
          height: cursorText ? "32px" : isHovered ? "28px" : "12px",
          borderRadius: cursorText ? "9999px" : "9999px",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`flex items-center justify-center px-3 text-xs font-semibold tracking-wide transition-colors ${
          cursorText
            ? "bg-[#D6FF3D] text-[#101010] shadow-[0_8px_20px_rgba(214,255,61,0.4)] border border-[#101010]/20"
            : isHovered
            ? "bg-[#4338FF]/20 border border-[#4338FF] backdrop-blur-sm"
            : "bg-[#101010] border border-white/20"
        }`}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="uppercase text-[10px] tracking-wider whitespace-nowrap font-bold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
