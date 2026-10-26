import React from "react";
import { motion } from "framer-motion";

import { COLORS, displayFont, serifFont, uiFont, BracketedLine, COMPANION_CARDS } from "./shared";

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
        <h2 style={{ ...serifFont, color: "#eef2fb" }} className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
          The People Who<br />
          <span className="italic">Chose to Stay.</span>
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
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span style={{ color: nameColor }} className="font-extrabold text-[13px]">[</span>
                  <span style={{ ...serifFont, color: nameColor }} className="text-xl font-normal tracking-wide">{c.name}</span>
                  <span style={{ color: nameColor }} className="font-extrabold text-[13px]">]</span>
                </div>
                <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase tracking-wide mb-4 font-semibold">{c.title}</p>
                <div className="mb-3"><BracketedLine segments={c.stats} /></div>
                <p style={{ ...uiFont, color: "#cbd5e1" }} className="text-[13px] leading-[1.85] mb-4">{c.description}</p>
                <p style={{ ...serifFont, color: `${nameColor}dd` }} className="text-[14px] italic font-normal">&ldquo;{c.quote}&rdquo;</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}