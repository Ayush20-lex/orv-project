import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Skull, Swords, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
const StarOrbCanvas = dynamic(() => import("../star-orb"), { ssr: false, loading: () => null });

import { COLORS, displayFont, uiFont, BracketedLine, COMPANION_CARDS } from "./shared";

export default function CompanionsGrid() {
  return (
    <section
      id="companions"
      className="py-24 lg:py-32 px-6 sm:px-10 lg:px-16"
      style={{ background: "rgba(7,9,16,0.98)", borderTop: `1px solid ${COLORS.panelEdge}` }}
    >
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-3">
          [ Registered Companions ]
        </p>
        <h2 style={{ ...displayFont, color: "#eef2fb" }} className="text-3xl sm:text-4xl font-black">
          The People Who<br />Chose to Stay.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {COMPANION_CARDS.map((c, i) => {
          const nameColor =
            c.tone === "blood" ? COLORS.blood :
            c.tone === "gold"  ? COLORS.gold  : COLORS.icy;
          return (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: i * 0.13 }}
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${nameColor}22` }}
            >
              {/* Background first-name watermark */}
              <div
                aria-hidden
                className="absolute top-3 right-4 select-none pointer-events-none leading-none"
                style={{
                  ...displayFont,
                  fontSize: "clamp(44px,6vw,72px)",
                  fontWeight: 900,
                  color: `${nameColor}09`,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {c.name.split(" ")[0]}
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-1">
                  <span style={{ color: nameColor }} className="font-extrabold text-[13px]">[</span>
                  <span style={{ ...uiFont, color: nameColor }} className="font-bold text-[13px]">{c.name}</span>
                  <span style={{ color: nameColor }} className="font-extrabold text-[13px]">]</span>
                </div>
                <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase tracking-wide mb-4">{c.title}</p>
                <div className="mb-3"><BracketedLine segments={c.stats} /></div>
                <p style={{ ...uiFont, color: "#4a5164" }} className="text-[13px] leading-[1.85] mb-4">{c.description}</p>
                <p style={{ ...uiFont, color: `${nameColor}70` }} className="text-[11px] italic">{c.quote}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}