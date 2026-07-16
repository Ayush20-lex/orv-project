"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const COLORS = {
  abyss: "#05060a",
  panelEdge: "#151a26",
  icy: "#82b1ff",
  gold: "#ffd700",
  blood: "#ff4d4d",
  dim: "#7b8496",
};

const displayFont = { fontFamily: "'Orbitron', sans-serif" };
const uiFont = { fontFamily: "'Inter', sans-serif" };
const chatFont = { fontFamily: "'JetBrains Mono', monospace" };

const COMPANION_CARDS = [
  {
    name: "Yoo Joonghyuk",
    title: "The Regressor",
    description: "1,863 iterations. Each one strips something away. He still stands at the end of every story.",
    stats: [{ t: "STR " }, { t: "99", gold: true }, { t: "  AGI " }, { t: "99", gold: true }, { t: "  END " }, { t: "99", gold: true }],
    quote: "The strongest man in any regression.",
    tone: "blood",
  },
  {
    name: "Han Sooyoung",
    title: "The Author",
    description: "She wrote the story before she lived it. Now she has to choose which ending she actually wants.",
    stats: [{ t: "STR " }, { t: "45", gold: true }, { t: "  AGI " }, { t: "62", gold: true }, { t: "  Mana " }, { t: "82", gold: true }],
    quote: "The one who knows every twist.",
    tone: "gold",
  },
  {
    name: "Lee Jihye",
    title: "The Admiral",
    description: "She chose to follow a man who might destroy everything. She doesn't regret it for a second.",
    stats: [{ t: "STR " }, { t: "68", gold: true }, { t: "  AGI " }, { t: "72", gold: true }, { t: "  END " }, { t: "65", gold: true }],
    quote: "Admiral of the Ocean Stream.",
    tone: "icy",
  },
];

const ORV_QUOTES = [
  {
    text: "The person who read the story is now living inside it. The ending? Only he knows.",
    source: "Omniscient Reader's Viewpoint",
    align: "center",
  },
  {
    text: "Don't close your eyes. The moment you do, someone dies.",
    source: "System Warning — Main Scenario #1",
    align: "left",
    tone: "blood",
  },
  {
    text: "There are 1,863 regressions in this story. This is the one that matters.",
    source: "Yoo Joonghyuk — The Regressor",
    align: "right",
    tone: "gold",
  },
  {
    text: "A constellation's power comes from being remembered. A reader's power comes from remembering.",
    source: "Kim Dokja — The Sole Reader",
    align: "center",
    tone: "icy",
  },
];

function Starfield() {
  // Stars are generated on the client only (inside useEffect) so the
  // random values never differ between server and client render —
  // generating them during render caused a React hydration mismatch.
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.6 + 0.4,
        delay: Math.random() * 6,
        twinkleDur: Math.random() * 4 + 3,
        driftDur: Math.random() * 25 + 20,
        driftY: Math.random() * 16 + 6,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, background: "#dbe4ff" }}
          animate={{ opacity: [0.1, 0.9, 0.1], y: [0, -s.driftY, 0] }}
          transition={{
            opacity: { duration: s.twinkleDur, delay: s.delay, repeat: Infinity, ease: "easeInOut" },
            y: { duration: s.driftDur, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}

function GlitchTitle({ text }) {
  return (
    <div className="relative select-none">
      <motion.h1
        style={{ ...displayFont, color: "#eef2fb" }}
        className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-normal"
        animate={{ opacity: [1, 1, 0.85, 1, 1, 0.9, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4 }}
      >
        {text}
      </motion.h1>
      <motion.h1
        aria-hidden
        style={{ ...displayFont, color: COLORS.icy }}
        className="absolute inset-0 z-0 text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-normal mix-blend-screen"
        animate={{ x: [0, -3, 2, -1, 0], opacity: [0, 0.55, 0, 0.4, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4 }}
      >
        {text}
      </motion.h1>
      <motion.h1
        aria-hidden
        style={{ ...displayFont, color: COLORS.blood }}
        className="absolute inset-0 z-0 text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-normal mix-blend-screen"
        animate={{ x: [0, 3, -2, 1, 0], opacity: [0, 0.4, 0, 0.5, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, delay: 0.15 }}
      >
        {text}
      </motion.h1>
    </div>
  );
}

function BracketedLine({ segments, muted, tone = "icy", className = "" }) {
  const bracketColor = tone === "blood" ? "text-red-400" : "text-sky-300";
  const baseText = tone === "blood" ? "text-red-200" : "text-white";

  return (
    <p style={uiFont} className={`text-[13px] sm:text-[15px] leading-8 ${className}`}>
      <span className={`font-extrabold ${bracketColor}`}>[</span>
      <span className={`mx-1.5 ${muted ? "opacity-70 italic" : ""} ${baseText}`}>
        {segments.map((s, i) =>
          s.gold ? (
            <span key={i} style={{ color: COLORS.gold, textShadow: "0 0 10px rgba(255,215,0,0.6)" }} className="font-semibold">
              {s.t}
            </span>
          ) : (
            <span key={i}>{s.t}</span>
          )
        )}
      </span>
      <span className={`font-extrabold ${bracketColor}`}>]</span>
    </p>
  );
}

export { COLORS, displayFont, uiFont, chatFont, COMPANION_CARDS, ORV_QUOTES, Starfield, GlitchTitle, BracketedLine };