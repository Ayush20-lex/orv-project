import React, { useState } from "react";
import { motion } from "framer-motion";

import { COLORS, serifFont, uiFont, Starfield, GlitchTitle } from "./shared";

function CheckAttributesButton({ onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative px-7 py-3.5 rounded-lg overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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

export default function Hero({ onOpenAttributes }) {

  return (
    <section className="relative flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
      <Starfield />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 20%, rgba(130,177,255,0.08), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(255,77,77,0.06), transparent 50%)" }}
      />
      {/* subtle bottom atmospheric fade into the following section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(5,6,10,0.6) 65%, #05060a 100%)" }}
      />

      {/* decorative watermark — very dim, adds depth without competing */}
      <div
        aria-hidden
        className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{
          ...serifFont,
          fontSize: "clamp(110px, 18vw, 240px)",
          color: "rgba(130,177,255,0.028)",
          fontWeight: 400,
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
              Simulated Feed
            </span>
          </div>
          <span style={{ color: "#64748b" }} className="text-[10px]">{"//"}</span>
          <span style={{ ...uiFont, color: "#94a3b8", letterSpacing: "0.08em" }} className="text-[10px] uppercase font-semibold">
            In-Universe Broadcast // Scenario #1 Active
          </span>
        </motion.div>

        <GlitchTitle text="The Main Scenario has commenced." />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ ...uiFont, color: "#cbd5e1" }}
          className="mt-6 text-sm sm:text-base leading-[1.85] max-w-lg"
        >
          You were the only one who read to the very last line.{" "}
          <span style={{ color: "#e2e8f0" }}>The story ended. The Constellations didn’t leave.</span>
          {" "}Every choice you make is being watched by something ancient, bored, and desperate for a good ending.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center gap-5"
        >
          <CheckAttributesButton onClick={onOpenAttributes} />

          <div className="flex items-center gap-1.5" title="Atmospheric fictional metric — not live website traffic">
            <motion.span
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: COLORS.icy }}
              className="text-[10px]"
            >
              ★
            </motion.span>
            <span style={{ ...uiFont, color: "#94a3b8" }} className="text-[11px] font-medium">
              [Simulated Stream] 1,204 constellations watching
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}