import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Skull, Swords, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
const StarOrbCanvas = dynamic(() => import("../star-orb"), { ssr: false, loading: () => null });

import { COLORS, displayFont, uiFont, ORV_QUOTES } from "./shared";

export default function QuotesSection() {
  return (
    <section
      id="quotes"
      className="py-24 lg:py-32 px-6 sm:px-10 lg:px-16 space-y-20"
      style={{ background: COLORS.abyss, borderTop: `1px solid ${COLORS.panelEdge}` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-3">
              [ Lines from the Stream ]
            </p>
            <h2 style={{ ...displayFont, color: "#eef2fb" }} className="text-3xl sm:text-4xl font-black">
              Words Worth<br />Remembering.
            </h2>
          </div>
          <Link href="/quotes">
            <button className="flex items-center gap-2 group transition-all">
              <span style={{ ...uiFont, color: COLORS.icy }} className="text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                Read All Quotes
              </span>
              <ArrowRight size={14} color={COLORS.icy} className="group-hover:translate-x-1 group-hover:text-white transition-all" />
            </button>
          </Link>
        </div>
      </motion.div>

      {ORV_QUOTES.map((q, i) => {
        const accentColor =
          q.tone === "blood" ? COLORS.blood :
          q.tone === "gold"  ? COLORS.gold  :
          q.tone === "icy"   ? COLORS.icy   : COLORS.icy;
        const alignClass =
          q.align === "right"  ? "ml-auto text-right" :
          q.align === "center" ? "mx-auto text-center" : "";
        return (
          <motion.div
            key={i}
            className={`max-w-3xl ${alignClass}`}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.05 }}
          >
            <div
              className="mb-3"
              style={{
                width: 28,
                height: 2,
                background: accentColor,
                marginLeft:  q.align === "right" ? "auto" : q.align === "center" ? "auto" : 0,
                marginRight: q.align === "right" ? 0     : q.align === "center" ? "auto" : "auto",
              }}
            />
            <blockquote
              style={{ ...uiFont, color: "#b8bfcc", lineHeight: 1.75 }}
              className="text-lg sm:text-xl md:text-2xl font-medium italic mb-4"
            >
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase tracking-widest">
              &mdash;&nbsp;{q.source}
            </p>
          </motion.div>
        );
      })}
    </section>
  );
}