"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Search,
  X,
  Eye,
  EyeOff,
  Filter,
  Sparkles,
  Users,
  Star,
  Globe,
  List,
  Compass,
  ChevronDown,
} from "lucide-react";
import { type GraphFilterOptions } from "@/lib/data/observatory-data";

const uiFont = { fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

interface ObservatoryControlsProps {
  filters: GraphFilterOptions;
  onChangeFilters: (updated: Partial<GraphFilterOptions>) => void;
  viewMode: "canvas" | "list";
  onToggleViewMode: (mode: "canvas" | "list") => void;
  matchCount: number;
  totalNodesCount: number;
}

export default function ObservatoryControls({
  filters,
  onChangeFilters,
  viewMode,
  onToggleViewMode,
  matchCount,
  totalNodesCount,
}: ObservatoryControlsProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterPopoverRef = useRef<HTMLDivElement>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  // Global hotkey: '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape" && filterOpen) {
        setFilterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filterOpen]);

  // Click outside listener for filter popover
  useEffect(() => {
    if (!filterOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (filterPopoverRef.current && !filterPopoverRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterOpen]);

  const hasActiveSecondaryFilter = filters.entityFilter !== "all";

  return (
    <div className="w-full space-y-2 mb-2 sm:mb-3">
      {/* Primary Toolbar: Search + Mode Switcher + Spoiler Toggle + View Switch */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search Bar with shortcut */}
        <div className="relative flex-1 max-w-xl">
          <label htmlFor="observatory-search" className="sr-only">
            Search constellations, companions, or modifiers
          </label>
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none"
            />
            <input
              ref={searchInputRef}
              id="observatory-search"
              type="text"
              value={filters.searchQuery || ""}
              onChange={(e) => onChangeFilters({ searchQuery: e.target.value })}
              placeholder="Search constellations, companions, or modifiers... (Press '/')"
              className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-[#030712]/90 border border-white/10 text-white placeholder:text-slate-400 text-xs sm:text-sm font-sans focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
            />
            {filters.searchQuery ? (
              <button
                type="button"
                onClick={() => onChangeFilters({ searchQuery: "" })}
                aria-label="Clear search input"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            ) : (
              <kbd
                style={monoFont}
                className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-slate-400"
              >
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Action Controls: Secondary Filter Popover + Spoiler Toggle + View Switcher */}
        <div className="flex items-center gap-2 flex-wrap justify-between lg:justify-end">
          {/* Secondary Entity Filter Dropdown / Popover */}
          <div className="relative" ref={filterPopoverRef}>
            <button
              type="button"
              onClick={() => setFilterOpen((prev) => !prev)}
              aria-expanded={filterOpen}
              aria-haspopup="true"
              aria-label="Filter by entity classification"
              style={uiFont}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all border focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                hasActiveSecondaryFilter
                  ? "bg-cyan-950/40 border-cyan-500/50 text-cyan-200"
                  : "bg-[#030712] border-white/10 text-slate-300 hover:text-white hover:border-white/20"
              }`}
            >
              <Filter size={13} className={hasActiveSecondaryFilter ? "text-cyan-400" : "text-slate-400"} />
              <span>
                {filters.entityFilter === "incarnation"
                  ? "Incarnations"
                  : filters.entityFilter === "constellation"
                  ? "Constellations"
                  : "Filter"}
              </span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Compact Popover Panel */}
            {filterOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1.5 w-48 p-1.5 rounded-xl bg-[#030712] border border-white/15 shadow-2xl z-30 space-y-1"
              >
                {[
                  { id: "all", label: "All Classifications" },
                  { id: "incarnation", label: "Incarnations Only" },
                  { id: "constellation", label: "Constellations Only" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    style={uiFont}
                    onClick={() => {
                      onChangeFilters({ entityFilter: item.id as GraphFilterOptions["entityFilter"] });
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      filters.entityFilter === item.id
                        ? "bg-cyan-500/20 text-cyan-200 font-medium"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {filters.entityFilter === item.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Spoiler Control Toggle */}
          <button
            type="button"
            onClick={() => onChangeFilters({ spoilerUnlocked: !filters.spoilerUnlocked })}
            aria-pressed={filters.spoilerUnlocked}
            aria-label={
              filters.spoilerUnlocked
                ? "Switch to spoiler safe mode"
                : "Reveal endgame novel spoilers"
            }
            style={uiFont}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all border focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              filters.spoilerUnlocked
                ? "bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] font-semibold"
                : "bg-[#030712] border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
            }`}
          >
            {filters.spoilerUnlocked ? (
              <>
                <EyeOff size={13} className="text-amber-400" />
                <span>Endgame Unlocked</span>
              </>
            ) : (
              <>
                <Eye size={13} className="text-slate-400" />
                <span>Spoiler Safe</span>
              </>
            )}
          </button>

          {/* View Switch: Cosmic Map vs Archive Directory */}
          <div className="flex items-center rounded-xl p-0.5 bg-[#030712] border border-white/10 shadow-inner">
            <button
              type="button"
              onClick={() => onToggleViewMode("canvas")}
              aria-pressed={viewMode === "canvas"}
              aria-label="Switch to Cosmic Map view"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                viewMode === "canvas"
                  ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
              }`}
            >
              <Compass size={13} />
              <span style={uiFont}>Cosmic Map</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode("list")}
              aria-pressed={viewMode === "list"}
              aria-label="Switch to Archive Directory view"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                viewMode === "list"
                  ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
              }`}
            >
              <List size={13} />
              <span style={uiFont}>Directory</span>
            </button>
          </div>
        </div>
      </div>

      {/* Exploration Modes Strip (All, Sponsorships, Kim Dokja's Co., Watchers) */}
      <div
        role="tablist"
        aria-label="Observatory exploration modes"
        className="flex items-center gap-1.5 overflow-x-auto pb-1"
      >
        {[
          { id: "all", label: "All Cosmos", icon: Globe },
          { id: "sponsors", label: "Sponsorships", icon: Sparkles },
          { id: "companions", label: "Kim Dokja's Company", icon: Users },
          { id: "watchers", label: "Watchers & Rivals", icon: Star },
        ].map((modeItem) => {
          const isSelected = filters.mode === modeItem.id;
          const Icon = modeItem.icon;
          return (
            <button
              key={modeItem.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onChangeFilters({ mode: modeItem.id as GraphFilterOptions["mode"] })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                isSelected
                  ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-200 font-semibold shadow-sm"
                  : "bg-white/[0.02] border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Icon size={12} className={isSelected ? "text-cyan-400" : "text-slate-400"} />
              <span style={uiFont}>{modeItem.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { ObservatoryControls };

