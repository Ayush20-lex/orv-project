import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Skull, Swords, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
const StarOrbCanvas = dynamic(() => import("../star-orb"), { ssr: false, loading: () => null });

import { COLORS, displayFont, uiFont, Starfield, GlitchTitle } from "./shared";

export default function Hero({ onOpenAttributes }) {
  function CheckAttributesButton({ onClick }) {
    const [hover, setHover] = useState(false);
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative px-7 py-3.5 rounded-lg overflow-hidden transition-all duration-300 outline-none"
        style={{
          background: hover ? "rgba(34,211,238,0.06)" : "transparent",
          border: hover ? "1px solid rgba(34,211,238,0.5)" : "1px solid rgba(34,211,238,0.25)",
          boxShadow: hover ? "0 0 28px rgba(34,211,238,0.45)" : "0 0 12px rgba(34,211,238,0.15)",
        }}
      >
        <span
          style={{ ...uiFont, color: "#ffffff" }}
          className="relative z-10 uppercase tracking-widest text-sm font-semibold"
        >
          Check Attributes
        </span>
      </button>
    );
  }

  return (
    <section className="relative flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-20 lg:py-0 overflow-hidden">
      <Starfield />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(130,177,255,0.08), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(255,77,77,0.06), transparent 50%)" }}
      />

      {/* decorative watermark — very dim, adds depth without competing */}
      <div
        aria-hidden
        className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{
          fontFamily: "serif",
          fontSize: "clamp(110px, 18vw, 240px)",
          color: "rgba(130,177,255,0.028)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          userSelect: "none",
        }}
      >
        ★
      </div>

      <div className="relative z-10 max-w-2xl">
        {/* live indicator */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: COLORS.blood }}
              />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: COLORS.blood }} />
            </span>
            <span style={{ ...uiFont, color: COLORS.blood, letterSpacing: "0.15em" }} className="text-[10px] font-bold uppercase">
              Live
            </span>
          </div>
          <span style={{ color: "#2d323e" }} className="text-[10px]">//</span>
          <span style={{ ...uiFont, color: "#4a5164", letterSpacing: "0.08em" }} className="text-[10px] uppercase">
            Scenario #1 Active
          </span>
        </motion.div>

        <GlitchTitle text="The Main Scenario has commenced." />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ ...uiFont, color: "#8a94aa" }}
          className="mt-6 text-sm sm:text-base leading-[1.85] max-w-lg"
        >
          You were the only one who read to the very last line.{" "}
          <span style={{ color: "#5c6272" }}>The story ended. The Constellations didn’t leave.</span>
          {" "}Every choice you make is being watched by something ancient, bored, and desperate for a good ending.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center gap-5"
        >
          <CheckAttributesButton onClick={onOpenAttributes} />

          <div className="flex items-center gap-1.5">
            <motion.span
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: COLORS.icy }}
              className="text-[10px]"
            >
              ★
            </motion.span>
            <span style={{ ...uiFont, color: "#4a5164" }} className="text-[11px]">
              1,204 constellations watching
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}