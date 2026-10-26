"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ORV_QUOTES, type QuoteRecord } from "@/lib/data/quotes";
import { ShieldCheck, BookOpen, Sparkles } from "lucide-react";

const COLORS = {
  abyss: "#05070d",
  icy: "#82b1ff",
  blood: "#ff4d4d",
  gold: "#ffca28",
  dim: "#94a3b8",
  panelEdge: "rgba(130, 177, 255, 0.12)",
};

const displayFont = { fontFamily: "'Orbitron', sans-serif" };
const serifFont = { fontFamily: "'Instrument Serif', Georgia, serif" };
const uiFont = { fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };

export default function QuotesPage() {
  const [filter, setFilter] = useState<string>("all");

  const getToneColor = (tone: string) => {
    if (tone === "blood") return COLORS.blood;
    if (tone === "gold") return COLORS.gold;
    return COLORS.icy;
  };

  const filteredQuotes = ORV_QUOTES.filter((q) => {
    if (filter === "all") return true;
    return q.canonStatus === filter;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16" style={{ background: COLORS.abyss }}>
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 text-center">
          <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-4">
            [ System // Memory Archive ]
          </p>
          <h1 style={{ ...serifFont, color: "#eef2fb" }} className="text-4xl sm:text-6xl font-normal mb-6">
            Words from the <span className="italic">Stream</span>
          </h1>
          <p style={{ ...uiFont, color: "#cbd5e1" }} className="max-w-2xl mx-auto text-sm leading-[1.8] mb-8">
            Verifiable records, narrative translations, and reader interpretations left behind in the Star Stream. Every quote is transparently classified by canon status with verified novel chapter citations.
          </p>

          {/* Classification Filter Tabs */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.03] border border-white/10 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff] ${
                filter === "all" ? "bg-white/15 text-white font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              All Records ({ORV_QUOTES.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("verified_canon")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                filter === "verified_canon" ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30" : "text-slate-300 hover:text-emerald-300"
              }`}
            >
              <ShieldCheck size={12} />
              Verified Canon ({ORV_QUOTES.filter(q => q.canonStatus === "verified_canon").length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("paraphrase")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                filter === "paraphrase" ? "bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30" : "text-slate-300 hover:text-sky-300"
              }`}
            >
              <BookOpen size={12} />
              Narrative Paraphrase ({ORV_QUOTES.filter(q => q.canonStatus === "paraphrase").length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("fan_interpretation")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                filter === "fan_interpretation" ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30" : "text-slate-300 hover:text-amber-300"
              }`}
            >
              <Sparkles size={12} />
              Fan Interpretation ({ORV_QUOTES.filter(q => q.canonStatus === "fan_interpretation").length})
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredQuotes.map((quote, idx) => {
            const color = getToneColor(quote.tone);
            return (
              <motion.div
                key={quote.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.01 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}
                className="p-8 sm:p-10 rounded-2xl relative overflow-hidden group backdrop-blur-md shadow-2xl transition-all flex flex-col justify-between"
                style={{
                  background: "rgba(10,15,30,0.5)",
                  border: `2px solid ${color}40`,
                  boxShadow: `0 0 35px -15px ${color}60`,
                }}
              >
                {/* Decorative Quote Mark */}
                <div
                  className="absolute -top-4 -right-2 text-[120px] font-serif opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none select-none"
                  style={{ color: color }}
                >
                  &ldquo;
                </div>

                <div>
                  <div
                    className="w-8 h-1 mb-6 rounded-full group-hover:w-24 transition-all duration-500"
                    style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                  />

                  {/* Verification Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${
                        quote.canonStatus === "verified_canon"
                          ? "text-emerald-300 bg-emerald-500/10 border-emerald-500/30"
                          : quote.canonStatus === "paraphrase"
                          ? "text-sky-300 bg-sky-500/10 border-sky-500/30"
                          : "text-amber-300 bg-amber-500/10 border-amber-500/30"
                      }`}
                    >
                      {quote.canonStatus === "verified_canon" && <ShieldCheck size={11} />}
                      {quote.canonStatus === "paraphrase" && <BookOpen size={11} />}
                      {quote.canonStatus === "fan_interpretation" && <Sparkles size={11} />}
                      <span>
                        {quote.canonStatus === "verified_canon"
                          ? "Verified Canon"
                          : quote.canonStatus === "paraphrase"
                          ? "Narrative Paraphrase"
                          : "Fan Interpretation"}
                      </span>
                    </span>
                  </div>

                  <blockquote
                    style={{ ...serifFont, color: "#eef2fb", textShadow: `0 0 15px ${color}20` }}
                    className="text-xl md:text-2xl font-normal leading-relaxed italic mb-6 relative z-10"
                  >
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>
                </div>

                <div>
                  <p style={{ ...uiFont, color: color }} className="text-[11px] uppercase tracking-widest font-black opacity-90 mb-3">
                    &mdash; {quote.source}
                  </p>

                  <div className="pt-3 border-t border-white/5 space-y-1.5 text-[11px] font-mono text-slate-400">
                    {quote.chapterCitation && (
                      <p className="text-slate-400">
                        <span className="text-slate-500">Citation:</span> {quote.chapterCitation}
                      </p>
                    )}
                    {quote.contextNote && (
                      <p className="text-slate-400 text-xs italic font-sans leading-relaxed">
                        {quote.contextNote}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
