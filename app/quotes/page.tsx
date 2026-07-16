"use client";

import React from "react";
import { motion } from "framer-motion";

const COLORS = {
  abyss: "#05070d",
  icy: "#82b1ff",
  blood: "#ff4d4d",
  gold: "#ffca28",
  dim: "#3d4353",
  panelEdge: "rgba(130, 177, 255, 0.12)",
};

const displayFont = { fontFamily: "Outfit, sans-serif" };
const uiFont = { fontFamily: "Inter, sans-serif" };

const QUOTES = [
  {
    text: "The person who read the story is now living inside it. The ending? Only he knows.",
    source: "Omniscient Reader's Viewpoint",
    tone: "icy",
  },
  {
    text: "Don't close your eyes. The moment you do, someone dies.",
    source: "System Warning — Main Scenario #1",
    tone: "blood",
  },
  {
    text: "There are 1,863 regressions in this story. This is the one that matters.",
    source: "Yoo Joonghyuk — The Regressor",
    tone: "gold",
  },
  {
    text: "A constellation's power comes from being remembered. A reader's power comes from remembering.",
    source: "Kim Dokja — The Sole Reader",
    tone: "icy",
  },
  {
    text: "Tell me, you fool. If I continue to regress, will I ever meet you again?",
    source: "Yoo Joonghyuk",
    tone: "gold",
  },
  {
    text: "If I am the only one who remembers this story, then this story hasn't ended.",
    source: "Kim Dokja",
    tone: "icy",
  },
  {
    text: "Incarnation Kim Dokja will be killed by the person he loves most.",
    source: "Olympus Prophecy",
    tone: "blood",
  },
  {
    text: "I am a writer. And a writer never abandons the story they started.",
    source: "Han Sooyoung",
    tone: "gold",
  }
];

export default function QuotesPage() {
  const getToneColor = (tone: string) => {
    if (tone === "blood") return COLORS.blood;
    if (tone === "gold") return COLORS.gold;
    return COLORS.icy;
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16" style={{ background: COLORS.abyss }}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-4">
            [ System // Memory Archive ]
          </p>
          <h1 style={{ ...displayFont, color: "#eef2fb" }} className="text-4xl sm:text-6xl font-black mb-6">
            Words from the Stream
          </h1>
          <p style={{ ...uiFont, color: "#5c6272" }} className="max-w-2xl mx-auto text-sm leading-[1.8]">
            Records left behind in the Star Stream. Words spoken by constellations, incarnations, and the one who reads them all.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {QUOTES.map((quote, idx) => {
            const color = getToneColor(quote.tone);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="p-8 sm:p-10 rounded-2xl relative overflow-hidden group backdrop-blur-md shadow-2xl transition-all"
                style={{ background: "rgba(10,15,30,0.5)", border: `2px solid ${color}40`, boxShadow: `0 0 35px -15px ${color}60` }}
              >
                {/* Decorative Quote Mark */}
                <div 
                  className="absolute -top-4 -right-2 text-[120px] font-serif opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none select-none"
                  style={{ color: color }}
                >
                  "
                </div>

                <div 
                  className="w-8 h-1 mb-6 rounded-full group-hover:w-24 transition-all duration-500"
                  style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                />

                <blockquote 
                  style={{ ...uiFont, color: "#eef2fb", textShadow: `0 0 15px ${color}20` }} 
                  className="text-lg md:text-xl font-medium leading-relaxed italic mb-8 relative z-10"
                >
                  "{quote.text}"
                </blockquote>

                <p style={{ ...uiFont, color: color }} className="text-[11px] uppercase tracking-widest font-black opacity-80 group-hover:opacity-100 transition-opacity">
                  &mdash; {quote.source}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
