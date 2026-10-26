"use client";

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Skull, Swords } from "lucide-react";


import Hero from "./home/hero-section";
import StarStreamSection from "./home/star-stream-section";
import ProtagonistSection from "./home/protagonist-section";
import CompanionsGrid from "./home/companions-grid";
import ObservatoryPreviewSection from "./home/observatory-preview-section";
import QuotesSection from "./home/quotes-section";
import { COLORS, uiFont, displayFont, chatFont, BracketedLine } from "./home/shared";

// StarOrbCanvas is imported inside the components that need it

// Fonts are loaded universally via app/layout.tsx


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
  const [prevActive, setPrevActive] = useState(active);

  if (prevActive !== active) {
    setPrevActive(active);
    if (!active) {
      setValue(0);
    }
  }

  useEffect(() => {
    if (!active) return;
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

const emptySubscribe = () => () => {};

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
          <div className="bg-[#42a5f5]/10 rounded p-3 border border-[#42a5f5]/30 shadow-[0_0_15px_-5px_rgba(66,165,245,0.15)]">
            <span style={uiFont} className="text-[#82b1ff] font-semibold text-xs tracking-wider">STR</span>
            <div style={displayFont} className="text-2xl text-white font-bold mt-1">{str}</div>
          </div>
          <div className="bg-[#42a5f5]/10 rounded p-3 border border-[#42a5f5]/30 shadow-[0_0_15px_-5px_rgba(66,165,245,0.15)]">
            <span style={uiFont} className="text-[#82b1ff] font-semibold text-xs tracking-wider">AGI</span>
            <div style={displayFont} className="text-2xl text-white font-bold mt-1">{agi}</div>
          </div>
          <div className="bg-[#42a5f5]/10 rounded p-3 border border-[#42a5f5]/30 shadow-[0_0_15px_-5px_rgba(66,165,245,0.15)]">
            <span style={uiFont} className="text-[#82b1ff] font-semibold text-xs tracking-wider">END</span>
            <div style={displayFont} className="text-2xl text-white font-bold mt-1">{end}</div>
          </div>
          <div className="bg-[#42a5f5]/10 rounded p-3 border border-[#42a5f5]/30 shadow-[0_0_15px_-5px_rgba(66,165,245,0.15)]">
            <span style={uiFont} className="text-[#82b1ff] font-semibold text-xs tracking-wider">MANA</span>
            <div style={displayFont} className="text-2xl text-white font-bold mt-1">{mana}</div>
          </div>
        </div>
      </div>
      <div>
        <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase tracking-wide mb-3">Unique Trait</p>
        <div className="bg-[#42a5f5]/10 rounded p-4 border border-[#42a5f5]/30 shadow-[0_0_15px_-5px_rgba(66,165,245,0.15)]">
          <p style={uiFont} className="text-white font-bold mb-1">Reader of the Final Chapter</p>
          <p style={uiFont} className="text-xs text-[#eef2fb] leading-relaxed">Passive trait. The user possesses knowledge of the original plotline up to the 3,149th chapter.</p>
        </div>
      </div>
      <div>
        <p style={{ ...uiFont, color: COLORS.dim }} className="text-[10px] uppercase tracking-wide mb-3">Stigmas</p>
        <ul className="space-y-3">
          <li className="relative group cursor-help w-fit">
            <div className="flex gap-3 text-sm items-center">
              <Sparkles size={16} className="text-sky-400" />
              <span style={uiFont} className="text-[#eef2fb] group-hover:text-sky-300 transition-colors">Bookmark</span>
            </div>
            {/* Tooltip */}
            <div className="absolute left-0 bottom-full mb-2 w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <div className="bg-[#42a5f5]/90 backdrop-blur-md border-[2px] border-[#42a5f5] p-3 rounded shadow-[0_0_20px_-5px_rgba(66,165,245,0.4)]">
                <p style={uiFont} className="text-xs text-white mb-1 font-bold">Bookmark (Lv. 1)</p>
                <p style={uiFont} className="text-[11px] text-[#eef2fb] leading-relaxed">Allows the user to copy and use a skill from a character whose understanding is high enough.</p>
              </div>
            </div>
          </li>
          <li className="relative group cursor-help w-fit">
            <div className="flex gap-3 text-sm items-center">
              <Sparkles size={16} className="text-sky-400" />
              <span style={uiFont} className="text-[#eef2fb] group-hover:text-white font-bold transition-colors">Omniscient Reader&apos;s Viewpoint</span>
            </div>
            {/* Tooltip */}
            <div className="absolute left-0 bottom-full mb-2 w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <div className="bg-[#42a5f5]/90 backdrop-blur-md border-[2px] border-[#42a5f5] p-3 rounded shadow-[0_0_20px_-5px_rgba(66,165,245,0.4)]">
                <p style={uiFont} className="text-xs text-white mb-1 font-bold">Omniscient Reader&apos;s Viewpoint (Lv. 1)</p>
                <p style={uiFont} className="text-[11px] text-[#eef2fb] leading-relaxed">Allows the user to read the thoughts and emotions of a character, or view their surroundings from a 3rd person perspective.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ScenariosTab() {
  return (
    <div className="space-y-6">
      <div className="bg-[#42a5f5]/15 backdrop-blur-md border-[2px] border-[#42a5f5]/50 rounded-lg p-5 shadow-[0_0_30px_-5px_rgba(66,165,245,0.3)]">
        <div className="flex items-center gap-2 mb-4 text-[#42a5f5]">
          <h4 style={{ ...displayFont, fontWeight: 700 }} className="uppercase text-sm tracking-widest text-[#42a5f5]">&lt;Main Scenario #1 - Proof of Value&gt;</h4>
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="flex items-center text-xs">
            <span style={{ ...uiFont, color: "#82b1ff" }} className="uppercase w-32 font-semibold tracking-wide">Category:</span>
            <span style={{ ...uiFont }} className="text-white font-bold">Main</span>
          </div>
          <div className="flex items-center text-xs">
            <span style={{ ...uiFont, color: "#82b1ff" }} className="uppercase w-32 font-semibold tracking-wide">Difficulty:</span>
            <span style={{ ...uiFont }} className="text-white font-bold">F</span>
          </div>
          <div className="flex items-center text-xs">
            <span style={{ ...uiFont, color: "#82b1ff" }} className="uppercase w-32 font-semibold tracking-wide">Clear Condition:</span>
            <span style={{ ...uiFont }} className="text-white font-bold leading-relaxed">Kill one or more living things</span>
          </div>
          <div className="flex items-center text-xs">
            <span style={{ ...uiFont, color: "#82b1ff" }} className="uppercase w-32 font-semibold tracking-wide">Time Limit:</span>
            <span style={{ ...chatFont }} className="text-white font-bold">30 Minutes</span>
          </div>
          <div className="flex items-center text-xs">
            <span style={{ ...uiFont, color: "#82b1ff" }} className="uppercase w-32 font-semibold tracking-wide">Rewards:</span>
            <span style={{ ...uiFont }} className="text-white font-bold">300 Coins</span>
          </div>
          <div className="flex items-center text-xs pt-4 border-t border-[#42a5f5]/30">
            <span style={{ ...uiFont, color: "#82b1ff" }} className="uppercase w-32 font-semibold tracking-wide">Penalty for Failure:</span>
            <span style={{ ...uiFont }} className="text-white font-bold">Death</span>
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
        <div key={c.name} className="bg-[#42a5f5]/10 border border-[#42a5f5]/30 rounded-lg p-4 flex items-center justify-between shadow-[0_0_15px_-5px_rgba(66,165,245,0.15)]">
          <div>
            <p style={{ ...uiFont }} className="text-white font-bold mb-1">{c.name}</p>
            <p style={{ ...uiFont, color: "#82b1ff" }} className="text-[10px] uppercase tracking-wide font-semibold">{c.role}</p>
          </div>
          <div className="text-right">
            <p style={{ ...uiFont, color: "#82b1ff" }} className="text-[10px] uppercase mb-1 font-semibold">Trust</p>
            <p style={{ ...chatFont }} className="text-white font-bold">{c.trust}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const SYSTEM_TABS = [
  { id: "attributes", label: "Attributes" },
  { id: "scenarios", label: "Scenarios" },
  { id: "companions", label: "Companions" }
];

function SystemWindowModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("attributes");
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  const handleTabKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % SYSTEM_TABS.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + SYSTEM_TABS.length) % SYSTEM_TABS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = SYSTEM_TABS.length - 1;
    }
    if (nextIndex !== null) {
      const nextTab = SYSTEM_TABS[nextIndex];
      setActiveTab(nextTab.id);
      setTimeout(() => {
        document.getElementById(`system-tab-${nextTab.id}`)?.focus();
      }, 0);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="system-window-modal-title"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#42a5f5]/15 backdrop-blur-md border-[2px] border-[#42a5f5]/50 rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(66,165,245,0.4)]"
          >
            {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#42a5f5]/40 bg-[#42a5f5]/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#42a5f5] animate-pulse" />
              <h3 id="system-window-modal-title" style={{ ...displayFont }} className="text-sm uppercase tracking-widest font-bold text-white">
                System Window
              </h3>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close system window"
              className="text-[#82b1ff] hover:text-white transition-colors p-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col md:flex-row h-[500px]">
            {/* Sidebar */}
            <div
              role="tablist"
              aria-label="System Window Sections"
              aria-orientation="vertical"
              className="w-full md:w-48 border-b md:border-b-0 md:border-r border-[#42a5f5]/30 p-4 bg-[#42a5f5]/5 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible"
            >
              {SYSTEM_TABS.map((tab, idx) => (
                <button
                  key={tab.id}
                  id={`system-tab-${tab.id}`}
                  role="tab"
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  aria-selected={activeTab === tab.id}
                  aria-controls={`system-tabpanel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  style={uiFont}
                  className={`flex-1 md:flex-none text-left px-4 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff] ${activeTab === tab.id ? "bg-[#42a5f5]/30 text-white border border-[#42a5f5]/50 shadow-[0_0_15px_-3px_rgba(66,165,245,0.3)]" : "text-[#82b1ff] hover:bg-[#42a5f5]/10 hover:text-white border border-transparent"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div
              role="tabpanel"
              id={`system-tabpanel-${activeTab}`}
              aria-labelledby={`system-tab-${activeTab}`}
              className="flex-1 p-6 sm:p-8 overflow-y-auto"
            >
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
      )}
    </AnimatePresence>,
    document.body
  );
}

const isDesktopSubscribe = (callback) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};
const getIsDesktop = () => (typeof window !== "undefined" ? window.innerWidth >= 1024 : false);
const getIsDesktopServer = () => false;

function useIsDesktop() {
  return useSyncExternalStore(isDesktopSubscribe, getIsDesktop, getIsDesktopServer);
}

// ---- Main Page Export ----
export default function StarStreamLanding() {
  const [modalOpen, setModalOpen] = useState(false);
  const triggerRef = useRef(null);
  const isDesktop = useIsDesktop();
  const [userDismissed, setUserDismissed] = useState(false);
  const [userOpened, setUserOpened] = useState(false);

  const questOpen = userOpened || (isDesktop && !userDismissed);

  const handleOpenModal = useCallback((e) => {
    triggerRef.current = e?.currentTarget || (typeof document !== "undefined" ? document.activeElement : null);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  }, []);

  return (
    <div className="min-h-screen text-slate-200 relative selection:bg-sky-500/30 selection:text-sky-100" style={{ background: COLORS.abyss }}>
      <main aria-hidden={modalOpen} className="relative z-10 flex flex-col">
        {/* Quest Tracker */}
        <AnimatePresence>
          {questOpen ? (
            <motion.div
              role="region"
              aria-label="Main Scenario #1 Quest Tracker"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-24 left-4 sm:left-6 z-[40] max-w-[calc(100vw-2rem)] sm:max-w-xs md:max-w-sm rounded-xl p-5 shadow-[0_0_30px_-5px_rgba(66,165,245,0.3)] overflow-hidden group backdrop-blur-md"
              style={{ background: "rgba(10,25,50,0.85)", border: "2px solid rgba(66,165,245,0.5)" }}
            >
              <div className="flex items-center justify-between mb-3 text-[#42a5f5]">
                <h4 style={{ ...displayFont, fontWeight: 700 }} className="uppercase text-[11px] tracking-widest">&lt;Main Scenario #1&gt;</h4>
                <button
                  type="button"
                  onClick={() => {
                    setUserDismissed(true);
                    setUserOpened(false);
                  }}
                  aria-label="Minimize quest tracker"
                  className="text-[#82b1ff] hover:text-white transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="mb-4">
                <p style={{ ...uiFont, color: "#eef2fb" }} className="text-[13px] leading-relaxed font-bold"><span className="text-[#82b1ff] font-semibold mr-1">Objective:</span>Kill one or more living things.</p>
              </div>
              <div className="flex justify-between items-end border-t border-[#42a5f5]/30 pt-3">
                <div className="space-y-1.5">
                  <p style={{ ...uiFont, color: "#82b1ff" }} className="text-[10px] uppercase font-semibold">Time Limit:</p>
                  <p style={{ ...uiFont, color: "#82b1ff" }} className="text-[10px] uppercase font-semibold">Penalty for failure:</p>
                </div>
                <div className="space-y-1.5 text-right">
                  <p style={{ ...chatFont }} className="text-[13px] text-white font-bold">30 Minutes</p>
                  <p style={{ ...uiFont }} className="text-[11px] text-white font-bold">Death</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              type="button"
              aria-label="Open Main Scenario #1 Quest Tracker"
              title="Open Main Scenario #1 Quest Tracker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setUserOpened(true);
                setUserDismissed(false);
              }}
              className="fixed top-24 left-4 sm:left-6 z-[40] w-12 h-12 rounded-full flex items-center justify-center bg-[#0a1932]/80 border-2 border-[#42a5f5]/50 text-[#42a5f5] shadow-[0_0_20px_-5px_rgba(66,165,245,0.4)] backdrop-blur-md hover:bg-[#42a5f5]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Swords size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        <Hero onOpenAttributes={handleOpenModal} />
        <StarStreamSection />
        <ProtagonistSection />
        <CompanionsGrid />
        <ObservatoryPreviewSection />
        <QuotesSection />
      </main>

      <SystemWindowModal isOpen={modalOpen} onClose={handleCloseModal} />
    </div>
  );
}
