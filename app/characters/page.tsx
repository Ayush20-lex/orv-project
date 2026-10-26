"use client";

import React, { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, ShieldCheck } from "lucide-react";
import { CHARACTERS, type CharacterRecord } from "@/lib/data/characters";

const emptySubscribe = () => () => {};

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
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

export default function CharactersPage() {
  const [selectedChar, setSelectedChar] = useState<CharacterRecord | null>(null);
  const [revealedModifiers, setRevealedModifiers] = useState<Record<string, boolean>>({});
  const [imgError, setImgError] = useState<boolean>(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  const openCharacterModal = (char: CharacterRecord, triggerEl: HTMLElement | null) => {
    lastFocusedRef.current = triggerEl;
    setImgError(false);
    setSelectedChar(char);
  };

  const closeCharacterModal = () => {
    setSelectedChar(null);
    setTimeout(() => {
      lastFocusedRef.current?.focus();
    }, 50);
  };

  useEffect(() => {
    if (!selectedChar) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeCharacterModal();
        return;
      }
      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
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
      modalCloseButtonRef.current?.focus();
    }, 50);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [selectedChar]);

  const getToneColor = (tone: string) => {
    if (tone === "blood") return COLORS.blood;
    if (tone === "gold") return COLORS.gold;
    return COLORS.icy;
  };

  const toggleModifier = (id: string) => {
    setRevealedModifiers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16" style={{ background: COLORS.abyss }}>
      <div aria-hidden={!!selectedChar} className="max-w-7xl mx-auto">
        <header className="mb-16">
          <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-4">
            [ System // Encyclopedia ]
          </p>
          <h1 style={{ ...serifFont, color: "#eef2fb" }} className="text-4xl sm:text-5xl md:text-6xl font-normal mb-4">
            Dramatis Personae
          </h1>
          <p style={{ ...uiFont, color: "#cbd5e1" }} className="max-w-2xl text-sm leading-[1.8]">
            The incarnations and readers who shape the Star Stream. Each character record strictly delineates inherent exclusive skills from sponsor stigmas, with spoiler protections for major late-story revelations.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHARACTERS.map((char) => {
            const color = getToneColor(char.tone);
            return (
              <motion.div
                key={char.id}
                role="button"
                tabIndex={0}
                aria-label={`View dossier for ${char.name}, ${char.title}`}
                whileHover={{ y: -5 }}
                onClick={(e) => openCharacterModal(char, e.currentTarget)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openCharacterModal(char, e.currentTarget);
                  }
                }}
                className="group cursor-pointer rounded-xl overflow-hidden relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}22` }}
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-black/50">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                    style={{ backgroundImage: `url(${char.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {char.modifierSpoiler && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 border border-amber-500/40 text-[9px] text-amber-300 font-mono flex items-center gap-1 backdrop-blur-sm">
                      <AlertTriangle size={10} />
                      Spoiler
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p style={{ ...uiFont, color: color }} className="text-[10px] font-bold uppercase tracking-widest mb-1">
                      {char.title}
                    </p>
                    <h3 style={{ ...serifFont, color: "#eef2fb" }} className="text-2xl font-normal">
                      {char.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedChar && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeCharacterModal}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                key="modal"
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="character-modal-title"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[calc(100%-2rem)] max-w-4xl"
              >
                <div
                  className="overflow-hidden max-h-[90vh] md:h-[680px] md:max-h-[85vh] rounded-2xl relative flex flex-col md:flex-row shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
                  style={{
                    background: COLORS.abyss,
                    border: `1px solid ${getToneColor(selectedChar.tone)}55`,
                  }}
                >
                  <button
                    ref={modalCloseButtonRef}
                    type="button"
                    onClick={closeCharacterModal}
                    aria-label={`Close dossier for ${selectedChar.name}`}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-white/10 transition-colors text-slate-400 hover:text-white border border-white/10 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
                  >
                    <X size={20} />
                  </button>

                  {/* Left Column: Character Portrait Showcase */}
                  <div className="w-full md:w-[42%] lg:w-[40%] h-72 sm:h-80 md:h-full relative bg-[#020409] shrink-0 overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
                    {/* Layer 1: Ambient Blurred Backdrop */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-2xl scale-125 pointer-events-none transition-all duration-700"
                      style={{ backgroundImage: `url(${selectedChar.image})` }}
                    />

                    {/* Layer 2: True Character Portrait or Offline Fallback */}
                    {imgError ? (
                      <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400 z-10 relative">
                        <AlertTriangle size={36} className="text-amber-400/80 mb-2" />
                        <p style={monoFont} className="text-[11px] uppercase tracking-wider text-slate-300 mb-1">
                          [ Visual Feed Offline ]
                        </p>
                        <p style={uiFont} className="text-[10px] text-slate-500 max-w-[200px]">
                          Probability density too high for remote optical feed reconstruction.
                        </p>
                      </div>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center z-10 p-3 sm:p-5">
                        <Image
                          src={selectedChar.image}
                          alt={selectedChar.name}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 420px"
                          className="object-contain select-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]"
                          onError={() => setImgError(true)}
                        />
                      </div>
                    )}

                    {/* Layer 3: Directional Edge Vignettes */}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-[#05070d]/90 pointer-events-none z-10" />

                    {/* Layer 4: Star Stream Visual Feed Badge */}
                    <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-md bg-black/75 border border-white/10 text-[9px] font-mono tracking-widest uppercase flex items-center gap-1.5 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getToneColor(selectedChar.tone) }} />
                      <span className="text-slate-300">[ Visual Feed · Verified ]</span>
                    </div>
                  </div>

                  {/* Right Column: Independent Scroll Information Panel */}
                  <div className="w-full md:w-[58%] lg:w-[60%] p-6 sm:p-8 overflow-y-auto max-h-[85vh] md:max-h-full custom-scrollbar">
                      <p style={{ ...uiFont, color: getToneColor(selectedChar.tone) }} className="text-[10px] uppercase font-bold tracking-widest mb-1">
                        [ {selectedChar.title} ]
                      </p>
                      <h2 id="character-modal-title" style={{ ...serifFont, color: "#eef2fb" }} className="text-3xl sm:text-4xl font-normal mb-1">
                        {selectedChar.name}
                      </h2>

                      {/* Modifier with spoiler reveal if applicable */}
                      <div className="mb-5 flex items-center gap-2 flex-wrap">
                        <span style={{ ...uiFont, color: "#94a3b8" }} className="text-xs font-semibold">Modifier:</span>
                        {selectedChar.modifierSpoiler && !revealedModifiers[selectedChar.id] ? (
                          <button
                            type="button"
                            onClick={() => toggleModifier(selectedChar.id)}
                            className="text-[11px] px-2.5 py-0.5 rounded border border-amber-500/40 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                          >
                            <AlertTriangle size={12} />
                            Demon Realm Spoiler — Click to Reveal
                          </button>
                        ) : (
                          <span style={{ ...uiFont, color: getToneColor(selectedChar.tone) }} className="text-xs font-semibold">
                            {selectedChar.modifier}
                          </span>
                        )}
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p style={{ ...uiFont, color: "#94a3b8" }} className="text-[10px] uppercase tracking-wide mb-1 font-semibold">Sponsor</p>
                            <p style={{ ...uiFont, color: "#eef2fb" }} className="text-xs font-medium">{selectedChar.sponsor}</p>
                          </div>
                          <div>
                            <p style={{ ...uiFont, color: "#94a3b8" }} className="text-[10px] uppercase tracking-wide mb-1 font-semibold">Personal Attribute</p>
                            <p style={{ ...uiFont, color: "#eef2fb" }} className="text-xs font-medium">{selectedChar.personalAttribute}</p>
                          </div>
                        </div>

                        {selectedChar.sponsorNotes && (
                          <p className="text-[10px] text-cyan-300/80 italic font-mono bg-cyan-500/5 p-2 rounded border border-cyan-500/20">
                            ℹ️ {selectedChar.sponsorNotes}
                          </p>
                        )}

                        {/* Exclusive Skills */}
                        <div>
                          <p style={{ ...uiFont, color: "#94a3b8" }} className="text-[10px] uppercase tracking-wide mb-1.5 flex items-center justify-between font-semibold">
                            <span>Exclusive Skills</span>
                            <span className="text-[9px] text-cyan-400/80 font-mono">Inherent Abilities</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedChar.exclusiveSkills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* General Skills */}
                        {selectedChar.generalSkills && selectedChar.generalSkills.length > 0 && (
                          <div>
                            <p style={{ ...uiFont, color: "#94a3b8" }} className="text-[10px] uppercase tracking-wide mb-1.5 flex items-center justify-between font-semibold">
                              <span>General Skills</span>
                              <span className="text-[9px] text-slate-300 font-mono">Acquired Talents</span>
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedChar.generalSkills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-200"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Stigmas */}
                        <div>
                          <p style={{ ...uiFont, color: "#94a3b8" }} className="text-[10px] uppercase tracking-wide mb-1.5 flex items-center justify-between font-semibold">
                            <span>Sponsor Stigmas</span>
                            <span className="text-[9px] text-amber-400/80 font-mono">Constellation Bestowed</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedChar.stigmas.map((stigma, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-0.5 rounded bg-amber-500/5 border border-amber-500/20 text-amber-200/90"
                              >
                                {stigma}
                              </span>
                            ))}
                          </div>
                          {selectedChar.stigmaNotes && (
                            <p className="mt-2 text-[10px] text-amber-300/80 italic font-mono bg-amber-500/5 p-2 rounded border border-amber-500/20">
                              ℹ️ {selectedChar.stigmaNotes}
                            </p>
                          )}
                        </div>

                        {/* Stories / Fables */}
                        {selectedChar.stories && selectedChar.stories.length > 0 && (
                          <div>
                            <p style={{ ...uiFont, color: "#94a3b8" }} className="text-[10px] uppercase tracking-wide mb-1.5 flex items-center justify-between font-semibold">
                              <span>Stories / Fables (설화)</span>
                              <span className="text-[9px] text-purple-400/80 font-mono">Narrative Feats</span>
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedChar.stories.map((story, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/25 text-purple-200"
                                >
                                  {story}
                                </span>
                              ))}
                            </div>
                            {selectedChar.storyNotes && (
                              <p className="mt-2 text-[10px] text-purple-300/80 italic font-mono bg-purple-500/5 p-2 rounded border border-purple-500/20">
                                ℹ️ {selectedChar.storyNotes}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Stats */}
                        <div className="pt-3 border-t border-white/5">
                          <p style={{ ...uiFont, color: "#94a3b8" }} className="text-[10px] uppercase tracking-wide mb-1 font-semibold">Overall Stats</p>
                          <p style={{ ...uiFont, color: getToneColor(selectedChar.tone) }} className="text-xs font-bold font-mono tracking-tight">
                            STR: {selectedChar.stats.str} | AGI: {selectedChar.stats.agi} | END: {selectedChar.stats.end} | Mana: {selectedChar.stats.mana}
                          </p>
                        </div>
                      </div>

                      <p style={{ ...uiFont, color: "#cbd5e1" }} className="text-sm leading-[1.8] mb-6">
                        {selectedChar.description}
                      </p>

                      {/* Canon Distinctions & Anti-Conflation Notes */}
                      {selectedChar.canonDistinctions && selectedChar.canonDistinctions.length > 0 && (
                        <div className="mb-6 p-3 rounded-lg bg-blue-950/20 border border-blue-500/20 space-y-1.5">
                          <p className="text-[10px] uppercase tracking-wider text-blue-400 font-mono font-bold">
                            Canon Distinctions &amp; Anti-Conflation:
                          </p>
                          {selectedChar.canonDistinctions.map((d, idx) => (
                            <p key={idx} className="text-[11px] text-slate-300/90 leading-relaxed font-mono">
                              • <strong className="text-sky-300">{d.entity}:</strong> {d.distinction}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Canon Status and Citation */}
                      <div className="pt-4 border-t border-white/5 flex flex-col gap-2 text-[11px]">
                        {selectedChar.canonStatus === "needs_verification" ? (
                          <div className="flex items-center gap-1.5 text-amber-400 font-mono">
                            <AlertTriangle size={13} />
                            <span className="font-semibold uppercase tracking-wider text-[10px]">Verification In Progress:</span>
                            <span className="text-slate-300 text-[11px]">{selectedChar.chapterCitation}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                            <ShieldCheck size={13} />
                            <span className="font-semibold uppercase tracking-wider text-[10px]">Canon Verified:</span>
                            <span className="text-slate-300 text-[11px]">{selectedChar.chapterCitation}</span>
                          </div>
                        )}
                        {selectedChar.imageAttribution && (
                          <p className="text-[10px] text-slate-400">
                            Art by {selectedChar.imageAttribution.illustrator} {"//"} {selectedChar.imageAttribution.source} (Unofficial fan reference; does not establish copyright permission)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      , document.body)}
    </div>
  );
}
