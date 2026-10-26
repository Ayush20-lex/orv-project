"use client";
import React, { useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ORV_QUOTES } from "../../lib/data/quotes";

const COLORS = {
  abyss: "#05060a",
  panelEdge: "#151a26",
  icy: "#82b1ff",
  gold: "#ffd700",
  blood: "#ff4d4d",
  dim: "#94a3b8",
};

const displayFont = { fontFamily: "'Orbitron', sans-serif" };
const serifFont = { fontFamily: "'Instrument Serif', Georgia, serif" };
const uiFont = { fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };
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



const emptySubscribe = () => () => {};

const CLIENT_STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  top: ((i * 37 + 13) % 100),
  left: ((i * 59 + 29) % 100),
  size: ((i * 17) % 16) / 10 + 0.4,
  delay: ((i * 23) % 60) / 10,
  twinkleDur: ((i * 31) % 40) / 10 + 3,
  driftDur: ((i * 41) % 250) / 10 + 20,
  driftY: ((i * 19) % 160) / 10 + 6,
}));

function Starfield() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const shouldReduceMotion = useReducedMotion();
  const stars = isClient ? CLIENT_STARS : [];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, background: "#dbe4ff" }}
          animate={shouldReduceMotion ? { opacity: 0.5 } : { opacity: [0.1, 0.9, 0.1], y: [0, -s.driftY, 0] }}
          transition={shouldReduceMotion ? { duration: 0 } : {
            opacity: { duration: s.twinkleDur, delay: s.delay, repeat: Infinity, ease: "easeInOut" },
            y: { duration: s.driftDur, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}

function GlitchTitle({ text }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="relative select-none">
        <h1
          style={{ ...displayFont, color: "#eef2fb" }}
          className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-normal"
        >
          {text}
        </h1>
      </div>
    );
  }

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

export { COLORS, displayFont, serifFont, uiFont, chatFont, COMPANION_CARDS, ORV_QUOTES, Starfield, GlitchTitle, BracketedLine };