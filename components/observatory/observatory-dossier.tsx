"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Link2,
  ArrowRight,
  BookOpen,
  Info,
  CheckCircle2,
} from "lucide-react";
import {
  type ObservatoryNode,
  type ObservatoryEdge,
  getNodeById,
  getConnectedEdgesForNode,
} from "@/lib/data/observatory-data";

const displayFont = { fontFamily: "'Orbitron', sans-serif" };
const serifFont = { fontFamily: "'Instrument Serif', Georgia, serif" };
const uiFont = { fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

interface ObservatoryDossierProps {
  selectedNode: ObservatoryNode | null;
  selectedEdge: ObservatoryEdge | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  onSelectEdge: (edgeId: string) => void;
  spoilerUnlocked: boolean;
}

export default function ObservatoryDossier({
  selectedNode,
  selectedEdge,
  onClose,
  onSelectNode,
  onSelectEdge,
  spoilerUnlocked,
}: ObservatoryDossierProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Tab navigation within node dossier: "overview" | "bonds" | "verification"
  const [activeTab, setActiveTab] = useState<"overview" | "bonds" | "verification">("overview");

  // Track expanded bond IDs for on-demand lore reading
  const [expandedBondId, setExpandedBondId] = useState<string | null>(null);
  const [avatarErrorNodeId, setAvatarErrorNodeId] = useState<string | null>(null);
  const hasAvatarError = Boolean(selectedNode && avatarErrorNodeId === selectedNode.id);

  useEffect(() => {
    if (!selectedNode && !selectedEdge) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
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
  }, [selectedNode, selectedEdge, onClose]);

  if (!selectedNode && !selectedEdge) return null;

  // If node is selected, gather its connected relationships
  const connectedEdges = selectedNode ? getConnectedEdgesForNode(selectedNode.id) : [];

  return (
    <AnimatePresence>
      <motion.aside
        ref={panelRef}
        role="region"
        aria-label={selectedNode ? `Entity Dossier: ${selectedNode.name}` : `Relationship Dossier: ${selectedEdge?.label}`}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 220 }}
        className="fixed top-20 sm:top-24 right-3 sm:right-6 bottom-3 sm:bottom-6 left-3 sm:left-auto w-auto sm:w-[440px] z-40 flex flex-col bg-[#05070f]/95 backdrop-blur-2xl border border-[#82b1ff]/30 rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.85),0_0_35px_rgba(66,165,245,0.2)] overflow-hidden"
      >
        {/* System Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#42a5f5]/10 border-b border-[#42a5f5]/25">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#82b1ff] animate-ping" />
            <span style={displayFont} className="text-[11px] uppercase font-bold tracking-widest text-[#eef2fb]">
              {selectedNode ? "System // Entity Dossier" : "System // Celestial Bond"}
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dossier panel"
            className="p-1 rounded text-[#82b1ff] hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Dossier Content */}
        <div key={selectedNode?.id ?? selectedEdge?.id} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* ───────────────── NODE DOSSIER ───────────────── */}
          {selectedNode && (
            <>
              {/* 1. OVERVIEW: Strong Entity Title & Identity Card */}
              <div className="flex gap-4 items-start">
                {selectedNode.avatarUrl && !hasAvatarError ? (
                  <div className="relative w-20 h-24 sm:w-22 sm:h-26 rounded-xl overflow-hidden shrink-0 border border-[#42a5f5]/40 bg-black/60 shadow-[0_0_20px_-3px_rgba(66,165,245,0.35)]">
                    <Image
                      src={selectedNode.avatarUrl}
                      alt={selectedNode.name}
                      fill
                      sizes="96px"
                      className="object-cover object-top"
                      onError={() => setAvatarErrorNodeId(selectedNode.id)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="w-20 h-24 sm:w-22 sm:h-26 rounded-xl shrink-0 border border-[#42a5f5]/30 bg-[#42a5f5]/5 flex items-center justify-center text-[#82b1ff]">
                    <Sparkles size={30} />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      style={monoFont}
                      className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-[#42a5f5]/15 border border-[#42a5f5]/30 text-[#82b1ff]"
                    >
                      {selectedNode.type.replace("_", " ")}
                    </span>
                    {selectedNode.factionOrNebula && (
                      <span
                        style={monoFont}
                        className="text-[9px] uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 truncate max-w-[170px]"
                      >
                        {selectedNode.factionOrNebula}
                      </span>
                    )}
                  </div>

                  <h2
                    style={{ ...serifFont, color: "#ffffff" }}
                    className="text-2xl sm:text-3xl font-normal leading-tight tracking-wide"
                  >
                    {selectedNode.name}
                  </h2>

                  <p
                    style={{
                      ...serifFont,
                      fontStyle: "italic",
                      color:
                        selectedNode.tone === "blood"
                          ? "#ff6b6b"
                          : selectedNode.tone === "gold"
                          ? "#ffca28"
                          : selectedNode.tone === "purple"
                          ? "#c084fc"
                          : "#82b1ff",
                    }}
                    className="text-sm sm:text-base font-normal tracking-wide mt-0.5 mb-1"
                  >
                    {selectedNode.modifierSpoiler && !spoilerUnlocked
                      ? "[Modifier Redacted // Early Scenarios]"
                      : selectedNode.modifier}
                  </p>

                  <p style={{ ...uiFont, color: "#94a3b8" }} className="text-xs italic leading-tight">
                    {selectedNode.subtitle}
                  </p>
                </div>
              </div>

              {/* Section Tabs: Overview & Lore | Connections | Verification */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  style={uiFont}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "overview"
                      ? "bg-[#42a5f5]/20 text-[#82b1ff] border border-[#42a5f5]/40 shadow-[0_0_12px_rgba(66,165,245,0.25)] font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <BookOpen size={13} />
                  <span>Overview</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("bonds")}
                  style={uiFont}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "bonds"
                      ? "bg-[#42a5f5]/20 text-[#82b1ff] border border-[#42a5f5]/40 shadow-[0_0_12px_rgba(66,165,245,0.25)] font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Link2 size={13} />
                  <span>Bonds ({connectedEdges.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("verification")}
                  style={uiFont}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "verification"
                      ? "bg-[#42a5f5]/20 text-[#82b1ff] border border-[#42a5f5]/40 shadow-[0_0_12px_rgba(66,165,245,0.25)] font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <ShieldCheck size={13} />
                  <span>Canon</span>
                </button>
              </div>

              {/* ──────────────── TAB: OVERVIEW & LORE ──────────────── */}
              {activeTab === "overview" && (
                <div className="space-y-4">
                  {/* Narrative Lore Summary */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                    <h3
                      style={{ ...uiFont, color: "#82b1ff" }}
                      className="text-xs font-semibold tracking-wide mb-1.5 flex items-center gap-1.5"
                    >
                      <Info size={13} />
                      <span>Archive Transmission</span>
                    </h3>
                    <p style={{ ...uiFont, color: "#cbd5e1" }} className="text-xs sm:text-sm leading-relaxed">
                      {selectedNode.description}
                    </p>
                  </div>

                  {/* Observed Attributes & Feats */}
                  <div>
                    <h3
                      style={{ ...uiFont, color: "#82b1ff" }}
                      className="text-xs font-semibold tracking-wide mb-2 flex items-center gap-1.5"
                    >
                      <Sparkles size={13} />
                      <span>Observed Attributes &amp; Feats</span>
                    </h3>
                    <ul className="space-y-1.5">
                      {selectedNode.loreHighlights.map((feat, i) => (
                        <li
                          key={i}
                          style={{ ...uiFont, color: "#e2e8f0" }}
                          className="text-xs flex items-start gap-2 bg-[#42a5f5]/5 p-2 rounded-lg border border-[#42a5f5]/15"
                        >
                          <span className="text-[#82b1ff] mt-0.5 font-bold shrink-0">◈</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* ──────────────── TAB: CONNECTIONS (ACTIVE BONDS) ──────────────── */}
              {activeTab === "bonds" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span style={monoFont} className="text-[10px] uppercase tracking-wider">
                      Connected Stars in Network
                    </span>
                    <span style={monoFont} className="text-[9px] text-[#82b1ff]">
                      Click row to traverse
                    </span>
                  </div>

                  {connectedEdges.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400 rounded-xl bg-white/[0.02] border border-white/10">
                      No verified relationships recorded for this entity.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {connectedEdges.map((edge) => {
                        const isSource = edge.source === selectedNode.id;
                        const neighborId = isSource ? edge.target : edge.source;
                        const neighbor = getNodeById(neighborId);
                        if (!neighbor) return null;

                        const isSpoilerEdge = edge.spoilerLevel === "endgame_novel";
                        if (isSpoilerEdge && !spoilerUnlocked) return null;

                        const isExpanded = expandedBondId === edge.id;

                        return (
                          <div
                            key={edge.id}
                            className="p-3 rounded-xl bg-white/[0.03] hover:bg-[#42a5f5]/10 border border-white/10 hover:border-[#42a5f5]/40 transition-all group"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span
                                style={monoFont}
                                className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                                  edge.type === "sponsor"
                                    ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                                    : edge.type === "companion"
                                    ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                                    : edge.type === "rivalry"
                                    ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                                    : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                                }`}
                              >
                                {edge.label}
                              </span>

                              {/* Traversal Button */}
                              <button
                                type="button"
                                onClick={() => onSelectNode(neighbor.id)}
                                style={uiFont}
                                className="text-[#82b1ff] hover:text-white hover:underline text-xs flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform"
                                aria-label={`Traverse to ${neighbor.name}`}
                              >
                                <span>Focus Star</span>
                                <ArrowRight size={11} />
                              </button>
                            </div>

                            <p style={uiFont} className="text-xs font-semibold text-white">
                              {neighbor.name}{" "}
                              <span className="text-[11px] font-normal text-slate-400">
                                ({neighbor.subtitle})
                              </span>
                            </p>

                            {/* Expandable context */}
                            <div className="mt-1.5 pt-1.5 border-t border-white/5">
                              <p
                                style={uiFont}
                                className={`text-[11px] text-slate-300 leading-relaxed ${
                                  isExpanded ? "" : "line-clamp-2"
                                }`}
                              >
                                {edge.description}
                              </p>
                              {edge.description.length > 80 && (
                                <button
                                  type="button"
                                  onClick={() => setExpandedBondId(isExpanded ? null : edge.id)}
                                  style={uiFont}
                                  className="text-[11px] text-[#82b1ff] hover:underline mt-1 font-medium"
                                >
                                  {isExpanded ? "Show less" : "Read narrative context..."}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ──────────────── TAB: SOURCES & VERIFICATION ──────────────── */}
              {activeTab === "verification" && (
                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5">
                    <div className="flex items-center gap-2">
                      {selectedNode.canonStatus === "verified_canon" ? (
                        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold font-mono">
                          <CheckCircle2 size={14} />
                          <span>Canon Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold font-mono">
                          <AlertTriangle size={14} />
                          <span>Status: Needs Verification</span>
                        </div>
                      )}
                    </div>

                    <div className="text-xs space-y-1 font-mono">
                      <p className="text-slate-400 text-[11px]">Primary Source Citation:</p>
                      <p className="text-[#82b1ff] text-xs bg-black/40 p-2 rounded border border-white/10">
                        {selectedNode.chapterCitation}
                      </p>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400">
                      <span>Clearance Level: </span>
                      <span className="text-white uppercase font-bold">
                        {selectedNode.spoilerLevel.replace("_", " ")}
                      </span>
                    </div>

                    {selectedNode.imageAttribution && (
                      <div className="text-xs space-y-1 font-mono pt-2.5 border-t border-white/10">
                        <p className="text-slate-400 text-[10px] uppercase font-bold text-[#82b1ff] tracking-wider">
                          Visual Feed Source Attribution
                        </p>
                        <div className="bg-black/50 p-2.5 rounded-lg border border-white/10 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] gap-2 flex-wrap">
                            <span className="text-white font-semibold">
                              {selectedNode.imageAttribution.illustrator}
                            </span>
                            {(selectedNode.imageAttribution.sourceClassification || selectedNode.imageAttribution.licenseType) && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
                                Origin: {selectedNode.imageAttribution.sourceClassification || selectedNode.imageAttribution.licenseType}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-300 text-[10px] leading-tight">
                            {selectedNode.imageAttribution.source}
                          </p>
                          <div className="pt-1 border-t border-white/5 text-[9px] space-y-0.5">
                            <p className="text-amber-300/90 font-medium">
                              Reuse Status: {selectedNode.imageAttribution.reuseStatus || "Unverified // Copyright Rights Reserved"}
                            </p>
                            <p className="text-slate-400 italic leading-tight">
                              {selectedNode.imageAttribution.usageNotes}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedNode.aliases && selectedNode.aliases.length > 0 && (
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10">
                      <p style={monoFont} className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">
                        Recorded Aliases &amp; Monikers
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.aliases.map((alias, idx) => (
                          <span
                            key={idx}
                            style={monoFont}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                          >
                            {alias}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ───────────────── EDGE DOSSIER ───────────────── */}
          {selectedEdge && !selectedNode && (
            <>
              {(() => {
                const sourceNode = getNodeById(selectedEdge.source);
                const targetNode = getNodeById(selectedEdge.target);

                return (
                  <div className="space-y-4">
                    <div>
                      <span
                        style={monoFont}
                        className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-[#42a5f5]/15 border border-[#42a5f5]/30 text-[#82b1ff]"
                      >
                        Celestial Bond // {selectedEdge.type.replace("_", " ")}
                      </span>
                      <h2
                        style={{ ...serifFont, color: "#ffffff" }}
                        className="text-2xl sm:text-3xl font-normal leading-tight mt-1 mb-2 tracking-wide"
                      >
                        {selectedEdge.label}
                      </h2>
                    </div>

                    {/* Connected Endpoints with Direct Traversal */}
                    <div className="grid grid-cols-2 gap-3">
                      {sourceNode && (
                        <button
                          type="button"
                          onClick={() => onSelectNode(sourceNode.id)}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#82b1ff] text-left transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
                        >
                          <span style={monoFont} className="text-[9px] text-[#82b1ff] uppercase block mb-1">
                            Origin Star ➔
                          </span>
                          <span style={uiFont} className="text-xs font-bold text-white block group-hover:text-[#82b1ff] transition-colors">
                            {sourceNode.name}
                          </span>
                          <span style={uiFont} className="text-[10px] text-slate-400 block truncate">
                            {sourceNode.subtitle}
                          </span>
                        </button>
                      )}

                      {targetNode && (
                        <button
                          type="button"
                          onClick={() => onSelectNode(targetNode.id)}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#82b1ff] text-left transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
                        >
                          <span style={monoFont} className="text-[9px] text-[#82b1ff] uppercase block mb-1">
                            Destination Star ➔
                          </span>
                          <span style={uiFont} className="text-xs font-bold text-white block group-hover:text-[#82b1ff] transition-colors">
                            {targetNode.name}
                          </span>
                          <span style={uiFont} className="text-[10px] text-slate-400 block truncate">
                            {targetNode.subtitle}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Narrative Description */}
                    <div className="p-4 rounded-xl bg-[#42a5f5]/5 border border-[#42a5f5]/20">
                      <h3 style={uiFont} className="text-xs font-semibold text-[#82b1ff] tracking-wide mb-1.5">
                        Canonical Context
                      </h3>
                      <p style={{ ...uiFont, color: "#e2e8f0" }} className="text-xs sm:text-sm leading-relaxed">
                        {selectedEdge.description}
                      </p>
                    </div>

                    {selectedEdge.spoilerWarning && (
                      <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                        <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{selectedEdge.spoilerWarning}</span>
                      </div>
                    )}

                    {/* Verification Details */}
                    <div className="pt-3 border-t border-white/10 flex flex-col gap-1 text-[11px] font-mono">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <ShieldCheck size={13} />
                        <span>Verification: {selectedEdge.canonStatus}</span>
                      </div>
                      <div className="text-slate-400">
                        <span>Citation: {selectedEdge.chapterCitation}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

export { ObservatoryDossier };
