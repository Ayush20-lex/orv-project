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

const CONSTELLATIONS = [
  {
    modifier: "[Secretive Plotter]",
    trueName: "???",
    theme: COLORS.icy,
    description: "A constellation who loves to plot behind the scenes. They are deeply interested in Kim Dokja's choices and often send coins when he does something unpredictable.",
    messages: [
      "[The constellation 'Secretive Plotter' is intrigued by your audacity.]",
      "[The constellation 'Secretive Plotter' is chuckling at the incarnation's foolishness.]"
    ]
  },
  {
    modifier: "[Demon-like Judge of Fire]",
    trueName: "Uriel",
    theme: COLORS.blood,
    description: "An absolute good constellation from the Eden nebula. Despite her terrifying modifier, she is extremely fond of Kim Dokja and Yoo Joonghyuk's companionship.",
    messages: [
      "[The constellation 'Demon-like Judge of Fire' is wiping her nosebleed.]",
      "[The constellation 'Demon-like Judge of Fire' strongly supports the comradeship between you and incarnation Yoo Joonghyuk!]"
    ]
  },
  {
    modifier: "[Abyssal Black Flame Dragon]",
    trueName: "???",
    theme: "#9c27b0", // purple
    description: "A chuunibyou constellation who loves destruction, darkness, and edgy behavior. Very impulsive and prone to getting angry.",
    messages: [
      "[The constellation 'Abyssal Black Flame Dragon' is roaring in the abyss!]",
      "[The constellation 'Abyssal Black Flame Dragon' demands blood and destruction!]"
    ]
  },
  {
    modifier: "[Prisoner of the Golden Headband]",
    trueName: "Sun Wukong",
    theme: COLORS.gold,
    description: "A great sage equal to heaven. He appreciates strength and rebellion against fate, often throwing massive amounts of coins when entertained.",
    messages: [
      "[The constellation 'Prisoner of the Golden Headband' is pulling out his hair in frustration.]",
      "[The constellation 'Prisoner of the Golden Headband' is satisfied with your martial arts.]"
    ]
  }
];

export default function ConstellationsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16" style={{ background: COLORS.abyss }}>
      <div className="max-w-5xl mx-auto">
        <header className="mb-20 text-center">
          <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-4">
            [ System // The Absolute Watchers ]
          </p>
          <h1 style={{ ...displayFont, color: "#eef2fb" }} className="text-4xl sm:text-6xl font-black mb-6">
            The Night Sky
          </h1>
          <p style={{ ...uiFont, color: "#5c6272" }} className="max-w-2xl mx-auto text-sm leading-[1.8]">
            Beings from the upper floors of the Star Stream. They sponsor incarnations, influence scenarios, and treat the destruction of worlds as entertainment.
          </p>
        </header>

        <div className="space-y-16">
          {CONSTELLATIONS.map((constellation, idx) => (
            <motion.div
              key={constellation.modifier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative p-6 sm:p-12 rounded-2xl overflow-hidden group backdrop-blur-md transition-all hover:scale-[1.01]"
              style={{ background: "rgba(10,15,30,0.6)", border: `2px solid ${constellation.theme}50`, boxShadow: `0 0 40px -10px ${constellation.theme}30` }}
            >
              {/* Background Glow */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
                style={{ background: constellation.theme }}
              />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <h2 
                    style={{ ...displayFont, color: constellation.theme, textShadow: `0 0 25px ${constellation.theme}60` }} 
                    className="text-2xl sm:text-3xl font-black mb-2 tracking-wide"
                  >
                    {constellation.modifier}
                  </h2>
                  <p style={{ ...uiFont, color: COLORS.dim }} className="text-[11px] uppercase tracking-widest font-mono mb-6 font-semibold">
                    True Name: <span className="blur-md select-none transition-all duration-500 hover:blur-none cursor-help text-white">{constellation.trueName}</span>
                  </p>
                  <p style={{ ...uiFont, color: "#eef2fb" }} className="text-sm leading-relaxed mb-8">
                    {constellation.description}
                  </p>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <p style={{ ...uiFont, color: constellation.theme }} className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80">Recent Broadcast Logs</p>
                  {constellation.messages.map((msg, i) => (
                    <motion.div 
                      whileHover={{ x: 5 }}
                      key={i} 
                      className="p-4 rounded-lg bg-[#05070d]/80 border-l-[3px] shadow-xl backdrop-blur-sm"
                      style={{ borderLeftColor: constellation.theme, borderTop: `1px solid ${constellation.theme}20`, borderRight: `1px solid ${constellation.theme}20`, borderBottom: `1px solid ${constellation.theme}20` }}
                    >
                      <p style={{ ...uiFont, color: constellation.theme, textShadow: `0 0 10px ${constellation.theme}90` }} className="text-[13px] font-bold tracking-wide leading-relaxed">
                        {msg}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
