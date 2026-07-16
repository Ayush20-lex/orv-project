import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Skull, Swords, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
const StarOrbCanvas = dynamic(() => import("../star-orb"), { ssr: false, loading: () => null });

import { COLORS, displayFont, uiFont } from "./shared";

export default function StarStreamSection() {
  return (
    <section
      id="star-stream"
      className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-6 sm:px-10 lg:px-16 py-24 lg:py-32"
      style={{ background: "rgba(5,7,13,0.98)", borderTop: `1px solid ${COLORS.panelEdge}` }}
    >
      {/* 3D Orb */}
      <motion.div
        className="w-full lg:w-[48%] shrink-0 flex items-center justify-center"
        style={{ height: "min(70vw, 520px)" }}
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <StarOrbCanvas className="w-full h-full" />
      </motion.div>

      {/* Text */}
      <motion.div
        className="flex-1 max-w-lg"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay: 0.2 }}
      >
        <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-4">
          [ Star Stream // Active Broadcast ]
        </p>
        <h2 style={{ ...displayFont, color: "#eef2fb" }} className="text-3xl sm:text-4xl md:text-[2.8rem] font-black leading-tight mb-6">
          A Story That<br />Became Reality.
        </h2>
        <p style={{ ...uiFont, color: "#5c6272" }} className="text-sm sm:text-[15px] leading-[1.9] mb-10">
          In 2052, humanity was forcibly incorporated into a survival scenario. The Constellations — entities from other worlds — watch every choice, sponsoring those who entertain them with coins and power. 1,863 regressions have tried to clear it. None have succeeded.
        </p>
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label: "Active Scenarios", value: "1,647" },
            { label: "Constellations", value: "1,204" },
            { label: "Coins Circulating", value: "88,451" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg px-3 py-3 text-center"
              style={{ background: "rgba(130,177,255,0.04)", border: `1px solid ${COLORS.panelEdge}` }}
            >
              <p style={{ ...displayFont, color: COLORS.icy }} className="text-lg sm:text-2xl font-bold">{value}</p>
              <p style={{ ...uiFont, color: "#3d4353" }} className="text-[9px] mt-1 uppercase tracking-wide leading-tight">{label}</p>
            </div>
          ))}
        </div>
        <Link href="/constellations">
          <button className="flex items-center gap-2 group transition-all">
            <span style={{ ...uiFont, color: COLORS.icy }} className="text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
              View Constellations
            </span>
            <ArrowRight size={14} color={COLORS.icy} className="group-hover:translate-x-1 group-hover:text-white transition-all" />
          </button>
        </Link>
      </motion.div>
    </section>
  );
}