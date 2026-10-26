"use client";

import React, { forwardRef } from "react";
import { COLORS, uiFont, displayFont, serifFont } from "../home/shared";

const getToneColor = (tone) => {
  if (tone === "blood") return COLORS.blood;
  if (tone === "gold") return COLORS.gold;
  return COLORS.icy;
};

const StatCard = forwardRef(({ data }, ref) => {
  if (!data) return null;
  const color = getToneColor(data.tone);

  return (
    <div 
      ref={ref}
      className="relative w-full max-w-lg p-8 rounded-xl overflow-hidden shadow-2xl"
      style={{ 
        background: "#05070d",
        border: `2px solid ${color}50` 
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
          style={{ background: color }}
        />
        <div 
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[60px] opacity-10 pointer-events-none"
          style={{ background: color }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6 border-b pb-4" style={{ borderColor: `${color}40` }}>
          <div className="w-2 h-2 rounded-full" style={{ background: color }} />
          <h3 style={{ ...displayFont }} className="text-sm uppercase tracking-widest font-bold text-white">
            System Window // Incarnation Data
          </h3>
        </div>

        <div className="flex items-center justify-between mb-1">
          <p style={{ ...uiFont, color }} className="text-[10px] uppercase font-bold tracking-widest">
            {data.modifier}
          </p>
          {data.archetypeTitle && (
            <span
              style={{ ...uiFont, borderColor: `${color}40`, color }}
              className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border bg-white/5 font-semibold"
            >
              {data.archetypeTitle}
            </span>
          )}
        </div>
        <h2 style={{ ...serifFont, color: "#eef2fb" }} className="text-3xl font-normal mb-6">
          {data.name}
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p style={{ ...uiFont, color: "#8a94a6" }} className="text-[10px] uppercase tracking-wide mb-1 font-semibold">Sponsor</p>
              <p style={{ ...uiFont, color: "#eef2fb" }} className="text-sm font-medium">{data.sponsor}</p>
            </div>
            <div>
              <p style={{ ...uiFont, color: "#8a94a6" }} className="text-[10px] uppercase tracking-wide mb-1 font-semibold">Attribute</p>
              <p style={{ ...uiFont, color: "#eef2fb" }} className="text-sm font-medium">{data.personalAttribute}</p>
            </div>
          </div>
          
          <div>
            <p style={{ ...uiFont, color: "#8a94a6" }} className="text-[10px] uppercase tracking-wide mb-1 font-semibold">Exclusive Skills</p>
            <p style={{ ...uiFont, color: "#eef2fb" }} className="text-sm font-medium leading-relaxed">{data.exclusiveSkills}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: `${color}20` }}>
            <div>
              <p style={{ ...uiFont, color: "#8a94a6" }} className="text-[10px] uppercase tracking-wide mb-1 font-semibold">Stigma</p>
              <p style={{ ...uiFont, color: "#eef2fb" }} className="text-sm font-medium">{data.stigma}</p>
            </div>
            <div>
              <p style={{ ...uiFont, color: "#8a94a6" }} className="text-[10px] uppercase tracking-wide mb-1 font-semibold">Overall Stats</p>
              <p style={{ ...uiFont, color }} className="text-sm font-bold font-mono tracking-tight">{data.stats}</p>
            </div>
          </div>

          {data.dominantToneReason && (
            <div className="pt-3 border-t text-[11px]" style={{ borderColor: `${color}15`, color: "#8a94a6" }}>
              <p style={{ ...uiFont }} className="italic leading-relaxed">
                Analysis: {data.dominantToneReason}
              </p>
            </div>
          )}

          <div className="pt-2 text-[9px] uppercase tracking-widest text-center font-medium" style={{ color: "#94a3b8" }}>
            [ Fan-Created Profile // Non-Canonical Personality Simulation ]
          </div>
        </div>
      </div>
    </div>
  );
});
StatCard.displayName = "StatCard";

export default StatCard;
