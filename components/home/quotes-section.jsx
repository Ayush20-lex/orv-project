import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { COLORS, displayFont, serifFont, uiFont, ORV_QUOTES } from "./shared";

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
            <h2 style={{ ...serifFont, color: "#eef2fb" }} className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
              Words Worth<br />
              <span className="italic">Remembering.</span>
            </h2>
          </div>
          <Link
            href="/quotes"
            className="inline-flex items-center gap-2 group transition-all rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span style={{ ...uiFont, color: COLORS.icy }} className="text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
              Read All Quotes
            </span>
            <ArrowRight size={14} color={COLORS.icy} className="group-hover:translate-x-1 group-hover:text-white transition-all" />
          </Link>
        </div>
      </motion.div>

      {ORV_QUOTES.slice(0, 4).map((q, i) => {
        const accentColor =
          q.tone === "blood" ? COLORS.blood :
          q.tone === "gold"  ? COLORS.gold  :
          q.tone === "icy"   ? COLORS.icy   : COLORS.icy;
        const alignClass =
          q.align === "right"  ? "ml-auto text-right" :
          q.align === "center" ? "mx-auto text-center" : "";
        return (
          <motion.div
            key={q.id || i}
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
              style={{ ...serifFont, color: "#e2e8f0", lineHeight: 1.55 }}
              className="text-2xl sm:text-3xl md:text-4xl font-normal italic mb-4"
            >
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <div className={`flex items-center gap-2 flex-wrap ${q.align === "right" ? "justify-end" : q.align === "center" ? "justify-center" : "justify-start"}`}>
              <p style={{ ...uiFont, color: "#94a3b8" }} className="text-[10px] uppercase tracking-widest font-semibold">
                &mdash;&nbsp;{q.source}
              </p>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                  q.canonStatus === "verified_canon"
                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                    : q.canonStatus === "paraphrase"
                    ? "text-sky-300 bg-sky-500/10 border-sky-500/20"
                    : "text-amber-300 bg-amber-500/10 border-amber-500/20"
                }`}
              >
                {q.canonStatus === "verified_canon"
                  ? `Canon (${q.chapterCitation})`
                  : q.canonStatus === "paraphrase"
                  ? "Paraphrase"
                  : "Fan Interpretation"}
              </span>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}