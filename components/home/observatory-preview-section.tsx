"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Sparkles, ShieldCheck, ArrowRight, Eye } from "lucide-react";

const serifFont = { fontFamily: "'Instrument Serif', Georgia, serif" };
const uiFont = { fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };
const displayFont = { fontFamily: "'Orbitron', sans-serif" };

interface PreviewNode {
  id: string;
  name: string;
  modifier: string;
  type: "incarnation" | "constellation";
  x: number;
  y: number;
  color: string;
}

const PREVIEW_NODES: PreviewNode[] = [
  { id: "kim-dokja", name: "Kim Dokja", modifier: "The Reader", type: "incarnation", x: 300, y: 160, color: "#82b1ff" },
  { id: "uriel", name: "Uriel", modifier: "Demon-like Judge of Fire", type: "constellation", x: 120, y: 80, color: "#ffca28" },
  { id: "sun-wukong", name: "Sun Wukong", modifier: "Prisoner of the Golden Headband", type: "constellation", x: 480, y: 90, color: "#ffca28" },
  { id: "secretive-plotter", name: "Secretive Plotter", modifier: "Watcher of Scenarios", type: "constellation", x: 140, y: 260, color: "#a855f7" },
  { id: "yoo-joonghyuk", name: "Yoo Joonghyuk", modifier: "Supreme King", type: "incarnation", x: 470, y: 250, color: "#ff4d4d" },
];

const PREVIEW_BONDS = [
  { from: PREVIEW_NODES[0], to: PREVIEW_NODES[1], label: "Observation & Favor", color: "rgba(255, 202, 40, 0.4)" },
  { from: PREVIEW_NODES[0], to: PREVIEW_NODES[2], label: "Friendly Watcher", color: "rgba(255, 202, 40, 0.4)" },
  { from: PREVIEW_NODES[0], to: PREVIEW_NODES[3], label: "Persistent Watcher", color: "rgba(168, 85, 247, 0.4)" },
  { from: PREVIEW_NODES[0], to: PREVIEW_NODES[4], label: "Life & Death Companions", color: "rgba(130, 177, 255, 0.6)" },
];

export default function ObservatoryPreviewSection() {
  const [activeNode, setActiveNode] = useState<PreviewNode | null>(PREVIEW_NODES[0]);

  return (
    <section className="relative py-24 px-6 sm:px-10 lg:px-16 border-t border-b border-white/5 bg-[#030712]/90 overflow-hidden">
      {/* Background celestial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-[10px] font-mono tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82b1ff] animate-pulse" />
            <span>[ Star Stream // Constellation Observatory ]</span>
          </div>
          <h2 style={serifFont} className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-50 tracking-tight mb-4">
            The Constellation Observatory
          </h2>
          <p style={uiFont} className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
            A living cosmic projection mapping the verified connections, sponsorships, alliances, and
            rivalries between the incarnations of Seoul and the supreme beings of the Star Stream.
          </p>
        </div>

        {/* 2-Column Content: Interactive Constellation Teaser + Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Vector Constellation Teaser */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200" style={uiFont}>
                <Compass size={14} className="text-[#82b1ff]" />
                <span>Sector 01: Core Nebula Network</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck size={12} /> Canon Verified
              </span>
            </div>

            {/* SVG Interactive Teaser */}
            <div className="w-full aspect-[600/340] relative bg-[#020409] rounded-xl border border-white/5 overflow-hidden">
              <svg
                viewBox="0 0 600 340"
                className="w-full h-full select-none"
                aria-label="Preview constellation relationship map"
              >
                {/* Background stars */}
                <circle cx="80" cy="40" r="0.8" fill="#fff" opacity="0.25" />
                <circle cx="220" cy="90" r="1.2" fill="#82b1ff" opacity="0.4" />
                <circle cx="390" cy="50" r="0.7" fill="#fff" opacity="0.2" />
                <circle cx="530" cy="180" r="1.0" fill="#fff" opacity="0.45" />
                <circle cx="270" cy="280" r="0.9" fill="#c084fc" opacity="0.3" />
                <circle cx="410" cy="220" r="1.3" fill="#ffca28" opacity="0.35" />
                <circle cx="160" cy="190" r="0.6" fill="#fff" opacity="0.2" />

                {/* Starlight Filaments */}
                {PREVIEW_BONDS.map((bond, idx) => {
                  const isActive = bond.from.id === activeNode?.id || bond.to.id === activeNode?.id;
                  return (
                    <g key={idx}>
                      {isActive && (
                        <line
                          x1={bond.from.x}
                          y1={bond.from.y}
                          x2={bond.to.x}
                          y2={bond.to.y}
                          stroke={bond.color}
                          strokeWidth="2.5"
                          opacity="0.35"
                          strokeLinecap="round"
                        />
                      )}
                      <line
                        x1={bond.from.x}
                        y1={bond.from.y}
                        x2={bond.to.x}
                        y2={bond.to.y}
                        stroke={bond.color}
                        strokeWidth={isActive ? "1.5" : "0.85"}
                        strokeDasharray={isActive ? undefined : "3 3"}
                        className="transition-all duration-300"
                        strokeLinecap="round"
                      />
                    </g>
                  );
                })}

                {/* Interactive Star Nodes */}
                {PREVIEW_NODES.map((node) => {
                  const isCurrent = activeNode?.id === node.id;
                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer group"
                      onClick={() => setActiveNode(node)}
                      onMouseEnter={() => setActiveNode(node)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Select ${node.name}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveNode(node);
                        }
                      }}
                    >
                      {/* Active starlight aura */}
                      {isCurrent && (
                        <>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={20}
                            fill={node.color}
                            opacity="0.16"
                          />
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={15}
                            fill="none"
                            stroke={node.color}
                            strokeWidth="1.2"
                            strokeDasharray="2 2"
                            opacity="0.6"
                          />
                        </>
                      )}

                      {/* 4-Point cross diffraction spike on key anchor stars */}
                      {(node.id === "kim-dokja" || node.id === "uriel") && (
                        <g>
                          <line x1={node.x - 12} y1={node.y} x2={node.x + 12} y2={node.y} stroke="#ffffff" strokeWidth="0.75" opacity="0.7" />
                          <line x1={node.x} y1={node.y - 12} x2={node.x} y2={node.y + 12} stroke="#ffffff" strokeWidth="0.75" opacity="0.7" />
                        </g>
                      )}

                      {/* Outer star ring */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isCurrent ? 8 : 6}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1"
                        opacity="0.7"
                      />

                      {/* Core starlight center */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isCurrent ? 4.5 : 3.5}
                        fill={node.color}
                        className="transition-all duration-300"
                      />
                      <circle cx={node.x} cy={node.y} r={1.5} fill="#ffffff" />

                      {/* Label with dark backdrop */}
                      <g transform={`translate(${node.x}, ${node.y + 16})`}>
                        <rect
                          x="-38"
                          y="-2"
                          width="76"
                          height="14"
                          rx="3"
                          fill="#020409"
                          opacity="0.8"
                        />
                        <text
                          x="0"
                          y="8"
                          textAnchor="middle"
                          fill={isCurrent ? "#ffffff" : "#94a3b8"}
                          fontSize="9.5"
                          fontFamily="'Plus Jakarta Sans', sans-serif"
                          fontWeight={isCurrent ? "700" : "500"}
                          className="pointer-events-none select-none transition-colors"
                        >
                          {node.name}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Active Node Quick Dossier Strip */}
              {activeNode && (
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span style={monoFont} className="text-[9px] text-[#82b1ff] uppercase tracking-wider block">
                      {activeNode.type}
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span style={serifFont} className="text-lg text-slate-100 font-normal">{activeNode.name}</span>
                      <span style={serifFont} className="text-amber-300/90 italic text-sm">
                        &quot;{activeNode.modifier}&quot;
                      </span>
                    </div>
                  </div>
                  <span style={uiFont} className="text-[11px] text-slate-400">Click to focus</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Exploration Capabilities & Launch Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/40 hover:bg-slate-950/60 transition-colors">
                <h3 style={uiFont} className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Sponsor Contracts &amp; Stigmas
                </h3>
                <p style={uiFont} className="text-xs text-slate-400 leading-relaxed">
                  Inspect canonical contracts including Yoo Sangah &amp; Olympus, Jung Heewon &amp; Uriel, and Lee Jihye &amp; Maritime War God with exact novel chapter citations.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/40 hover:bg-slate-950/60 transition-colors">
                <h3 style={uiFont} className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Companions &amp; Lineages
                </h3>
                <p style={uiFont} className="text-xs text-slate-400 leading-relaxed">
                  Explore Kim Dokja&apos;s Company, master-disciple lineages, and scenario alliances without visual clutter or fabricated relations.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-slate-950/40 hover:bg-slate-950/60 transition-colors">
                <h3 style={uiFont} className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Spoiler Guardian Protection
                </h3>
                <p style={uiFont} className="text-xs text-slate-400 leading-relaxed">
                  Default safe view protects readers from late-novel revelations, with optional toggles to unlock the complete celestial grid.
                </p>
              </div>
            </div>

            {/* Launch CTA Button */}
            <div className="pt-2">
              <Link
                href="/constellations"
                style={uiFont}
                className="group relative inline-flex items-center justify-center gap-2.5 w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0d1b2a] via-[#112240] to-[#0d1b2a] border border-[#82b1ff]/30 text-white hover:text-white hover:border-[#82b1ff]/70 transition-all shadow-[0_0_20px_rgba(130,177,255,0.12)] hover:shadow-[0_0_30px_rgba(130,177,255,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff] text-sm font-semibold tracking-wide"
              >
                <span>Enter the Constellation Observatory</span>
                <ArrowRight size={15} className="text-[#82b1ff] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
