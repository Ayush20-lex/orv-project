import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { COLORS, displayFont, serifFont, uiFont, BracketedLine } from "./shared";

export default function ProtagonistSection() {
  return (
    <section
      id="protagonist"
      className="relative min-h-[90vh] flex items-center px-6 sm:px-10 lg:px-16 py-24 overflow-hidden"
      style={{ background: COLORS.abyss, borderTop: `1px solid ${COLORS.panelEdge}` }}
    >
      {/* Giant background watermark */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
      >
        <span
          style={{
            ...displayFont,
            fontSize: "clamp(72px, 16vw, 200px)",
            fontWeight: 900,
            color: "rgba(130,177,255,0.024)",
            whiteSpace: "nowrap",
            lineHeight: 1,
            padding: "0 2rem",
            userSelect: "none",
          }}
        >
          KIM DOKJA
        </span>
      </div>

      {/* Portrait bleed — right side, fading to transparent */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-2/5 lg:w-1/3 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      >
        <Image
          src="/images/kim-dokja-potrait2.jpg"
          alt="Kim Dokja"
          fill
          sizes="(max-width: 1024px) 40vw, 33vw"
          className="object-cover object-top brightness-90 contrast-110 saturate-75"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.5) 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.5) 80%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 bg-sky-500/10 mix-blend-overlay"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${COLORS.abyss} 0%, transparent 20%, transparent 80%, ${COLORS.abyss} 100%)` }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
      >
        <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.18em" }} className="text-[10px] uppercase mb-3">
          [ Subject Profile ]
        </p>
        <h2 style={{ ...serifFont, color: "#eef2fb" }} className="text-4xl sm:text-5xl md:text-6xl font-normal leading-tight mb-2">
          Kim Dokja
        </h2>
        <p style={{ ...uiFont, color: COLORS.dim }} className="text-[12px] uppercase tracking-widest mb-8">
          Omniscient Reader · Ally of Justice · The Sole Protagonist
        </p>
        <div className="space-y-1.5 mb-8">
          <BracketedLine segments={[{ t: "STR " }, { t: "62", gold: true }, { t: "  AGI " }, { t: "58", gold: true }, { t: "  END " }, { t: "71", gold: true }]} />
          <BracketedLine segments={[{ t: "Perception " }, { t: "74", gold: true }, { t: "  Mana " }, { t: "45", gold: true }]} />
          <BracketedLine segments={[{ t: "Fame: " }, { t: "1,204", gold: true }]} />
          <BracketedLine segments={[{ t: "Unique Trait: " }, { t: "Reader of the Final Chapter" }]} />
        </div>
        <p style={{ ...uiFont, color: "#cbd5e1" }} className="text-sm leading-[1.9] mb-8">
          He read <em style={{ color: "#94a3b8" }}>Three Ways to Survive in a Ruined World</em> from cover to cover — 3,149 chapters, every word. He is the only person alive who knows how the story ends. Now he has to live it.
        </p>
        <Link
          href="/characters"
          className="inline-flex items-center gap-2 group transition-all rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span style={{ ...uiFont, color: COLORS.icy }} className="text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
            View Character Encyclopedia
          </span>
          <ArrowRight size={14} color={COLORS.icy} className="group-hover:translate-x-1 group-hover:text-white transition-all" />
        </Link>
      </motion.div>
    </section>
  );
}