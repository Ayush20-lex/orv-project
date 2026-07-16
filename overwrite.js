const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/star-stream-landing.jsx');
const content = fs.readFileSync(filePath, 'utf8');

// We need to keep the imports, and SystemWindowModal, useKeyClick, useCountUp, and the main StarStreamLanding export.
// Actually, it's easier to just overwrite the file entirely with a clean version that imports the sections.

const newContent = `"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Skull, Swords } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import Hero from "./home/hero-section";
import StarStreamSection from "./home/star-stream-section";
import ProtagonistSection from "./home/protagonist-section";
import CompanionsGrid from "./home/companions-grid";
import QuotesSection from "./home/quotes-section";
import { COLORS, uiFont, displayFont, chatFont, BracketedLine } from "./home/shared";

// StarOrbCanvas is imported inside the components that need it

function useStarStreamFonts() {
  useEffect(() => {
    const id = "starstream-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useKeyClick() {
  const ctxRef = useRef(null);

  return useCallback(() => {
    try {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = ctxRef.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.06);
    } catch (e) {
    }
  }, []);
}

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let start = null;
    let raf;
    function step(ts) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);

  return value;
}

// ---- Modal Components ----
function AttributesTab({ inView }) {
  const str = useCountUp(62, inView, 1200);
  const agi = useCountUp(58, inView, 1300);
  const end = useCountUp(71, inView, 1400);
  const mana = useCountUp(45, inView, 1500);

  return (
    <div className="space-y-6">
      <div>
        <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase tracking-wide mb-3">Overall Stats</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 rounded p-3 border border-sky-900/30">
            <span style={uiFont} className="text-[#8a93a8] text-xs">STR</span>
            <div style={displayFont} className="text-2xl text-white font-bold mt-1">{str}</div>
          </div>
          <div className="bg-black/30 rounded p-3 border border-sky-900/30">
            <span style={uiFont} className="text-[#8a93a8] text-xs">AGI</span>
            <div style={displayFont} className="text-2xl text-white font-bold mt-1">{agi}</div>
          </div>
          <div className="bg-black/30 rounded p-3 border border-sky-900/30">
            <span style={uiFont} className="text-[#8a93a8] text-xs">END</span>
            <div style={displayFont} className="text-2xl text-white font-bold mt-1">{end}</div>
          </div>
          <div className="bg-black/30 rounded p-3 border border-sky-900/30">
            <span style={uiFont} className="text-[#8a93a8] text-xs">MANA</span>
            <div style={displayFont} className="text-2xl text-white font-bold mt-1">{mana}</div>
          </div>
        </div>
      </div>
      <div>
        <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase tracking-wide mb-3">Unique Trait</p>
        <div className="bg-black/30 rounded p-4 border border-sky-900/30">
          <p style={uiFont} className="text-sky-300 font-semibold mb-1">Reader of the Final Chapter</p>
          <p style={uiFont} className="text-xs text-[#8a93a8] leading-relaxed">Passive trait. The user possesses knowledge of the original plotline up to the 3,149th chapter.</p>
        </div>
      </div>
      <div>
        <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase tracking-wide mb-3">Stigmas</p>
        <ul className="space-y-2">
          <li className="flex gap-3 text-sm">
            <Sparkles size={16} className="text-sky-400 mt-0.5" />
            <span style={uiFont} className="text-[#eef2fb]">Bookmark</span>
          </li>
          <li className="flex gap-3 text-sm">
            <Sparkles size={16} className="text-sky-400 mt-0.5" />
            <span style={uiFont} className="text-[#eef2fb]">Omniscient Reader's Viewpoint</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ScenariosTab() {
  return (
    <div className="space-y-6">
      <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4 text-red-400">
          <Skull size={18} />
          <h4 style={{ ...displayFont, fontWeight: 700 }} className="uppercase text-sm tracking-widest">Main Scenario #1</h4>
        </div>
        <p style={{ ...uiFont }} className="text-xl font-bold text-white mb-2">Proof of Value</p>
        <p style={{ ...uiFont }} className="text-sm text-red-200/80 mb-6">Kill one or more living organisms.</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span style={{ ...uiFont, color: COLORS.dim }} className="uppercase">Category</span>
            <span style={{ ...uiFont }} className="text-[#eef2fb]">Main</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span style={{ ...uiFont, color: COLORS.dim }} className="uppercase">Difficulty</span>
            <span style={{ ...uiFont }} className="text-[#eef2fb]">F</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span style={{ ...uiFont, color: COLORS.dim }} className="uppercase">Clear Condition</span>
            <span style={{ ...uiFont }} className="text-[#eef2fb]">Kill 1+ living things.</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span style={{ ...uiFont, color: COLORS.dim }} className="uppercase">Time Limit</span>
            <span style={{ ...chatFont }} className="text-red-400 font-bold">00:24:00</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-3 border-t border-red-900/30">
            <span style={{ ...uiFont, color: COLORS.dim }} className="uppercase">Penalty</span>
            <span style={{ ...uiFont }} className="text-red-500 font-bold">Death</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanionsTab() {
  const companions = [
    { name: "Yoo Joonghyuk", role: "Supreme King", trust: "18%" },
    { name: "Han Sooyoung", role: "Director of the False Last Act", trust: "65%" },
    { name: "Lee Jihye", role: "Maritime War God's Incarnation", trust: "40%" },
  ];
  return (
    <div className="space-y-4">
      {companions.map(c => (
        <div key={c.name} className="bg-black/30 border border-[#151a26] rounded-lg p-4 flex items-center justify-between">
          <div>
            <p style={{ ...uiFont }} className="text-white font-medium mb-1">{c.name}</p>
            <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase tracking-wide">{c.role}</p>
          </div>
          <div className="text-right">
            <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase mb-1">Trust</p>
            <p style={{ ...chatFont }} className="text-sky-400 font-bold">{c.trust}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SystemWindowModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("attributes");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#05060a] border border-[#1a2133] rounded-xl overflow-hidden shadow-2xl"
          style={{ boxShadow: "0 25px 50px -12px rgba(130,177,255,0.15)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a2133] bg-[#080a10]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <h3 style={{ ...displayFont, color: COLORS.icy }} className="text-sm uppercase tracking-widest font-bold">
                System Window
              </h3>
            </div>
            <button onClick={onClose} className="text-[#5c6272] hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col md:flex-row h-[500px]">
            {/* Sidebar */}
            <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-[#1a2133] p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
              {[
                { id: "attributes", label: "Attributes" },
                { id: "scenarios", label: "Scenarios" },
                { id: "companions", label: "Companions" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={uiFont}
                  className={\`flex-1 md:flex-none text-left px-4 py-3 rounded text-xs font-semibold uppercase tracking-wider transition-all \${activeTab === tab.id ? "bg-sky-900/30 text-sky-300 border border-sky-900/50" : "text-[#5c6272] hover:bg-white/5 hover:text-[#8a93a8] border border-transparent"}\`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "attributes" && <AttributesTab inView={true} />}
                  {activeTab === "scenarios" && <ScenariosTab />}
                  {activeTab === "companions" && <CompanionsTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---- Main Page Export ----
export default function StarStreamLanding() {
  useStarStreamFonts();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [questOpen, setQuestOpen] = useState(true);

  return (
    <div className="min-h-screen text-slate-200 relative selection:bg-sky-500/30 selection:text-sky-100" style={{ background: COLORS.abyss }}>
      <main className="relative z-10 flex flex-col pt-24 lg:pt-0">
        {/* Quest Tracker */}
        <AnimatePresence>
          {questOpen ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-24 left-6 z-[40] max-w-xs md:max-w-sm rounded-xl p-5 shadow-2xl overflow-hidden cursor-pointer group"
              style={{ background: "linear-gradient(145deg, rgba(20,5,5,0.9) 0%, rgba(5,0,0,0.95) 100%)", border: "1px solid rgba(255,77,77,0.3)" }}
              onClick={() => setQuestOpen(false)}
            >
              <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-2 mb-4 text-red-400">
                <Swords size={16} />
                <h4 style={{ ...displayFont, fontWeight: 700 }} className="uppercase text-[11px] tracking-widest">Main Scenario</h4>
              </div>
              <div className="mb-4">
                <BracketedLine segments={[{ t: "Main Scenario #1 - Proof of Value" }]} tone="blood" className="font-bold mb-2" />
                <p style={{ ...uiFont, color: "#eef2fb" }} className="text-[13px] leading-relaxed"><span className="text-red-400 font-semibold mr-1">Objective:</span>Kill one or more living organisms.</p>
              </div>
              <div className="flex justify-between items-end border-t border-red-900/30 pt-3">
                <div className="space-y-1.5">
                  <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase">Time Remaining:</p>
                  <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase">Penalty for failure:</p>
                </div>
                <div className="space-y-1.5 text-right">
                  <p style={{ ...chatFont }} className="text-[13px] text-red-100 font-bold">00:23:45</p>
                  <p style={{ ...uiFont }} className="text-[11px] text-white font-bold">Death</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuestOpen(true)}
              className="fixed top-24 left-6 z-[40] w-12 h-12 rounded-full flex items-center justify-center bg-red-950/80 border border-red-500/30 text-red-400 shadow-xl backdrop-blur-sm hover:bg-red-900/80 transition-colors"
            >
              <Swords size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        <Hero onOpenAttributes={() => setModalOpen(true)} />
        <StarStreamSection />
        <ProtagonistSection />
        <CompanionsGrid />
        <QuotesSection />
      </main>

      <SystemWindowModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
`;

fs.writeFileSync(filePath, newContent);
console.log('Main file overwritten successfully.');
