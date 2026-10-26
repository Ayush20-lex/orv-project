"use client";

import React, { useState } from "react";
import { ArrowUpRight, Compass, Link2, BookOpen } from "lucide-react";
import {
  type ObservatoryNode,
  type ObservatoryEdge,
  getNodeById,
} from "@/lib/data/observatory-data";

const serifFont = { fontFamily: "'Instrument Serif', Georgia, serif" };
const uiFont = { fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

interface ObservatoryArchiveListProps {
  nodes: ObservatoryNode[];
  edges: ObservatoryEdge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  onSelectNode: (nodeId: string | null) => void;
  onSelectEdge: (edgeId: string | null) => void;
  spoilerUnlocked: boolean;
  onSwitchToMap: () => void;
}

export function ObservatoryArchiveList({
  nodes,
  edges,
  selectedNodeId,
  selectedEdgeId,
  onSelectNode,
  onSelectEdge,
  spoilerUnlocked,
  onSwitchToMap,
}: ObservatoryArchiveListProps) {
  const [activeTab, setActiveTab] = useState<"entities" | "relationships">("entities");
  const [expandedEdgeId, setExpandedEdgeId] = useState<string | null>(null);

  // Helper to extract a concise one-sentence summary from description
  const getOneSentenceSummary = (description: string): string => {
    const firstPeriod = description.indexOf(".");
    if (firstPeriod !== -1 && firstPeriod < 120) {
      return description.substring(0, firstPeriod + 1);
    }
    return description.length > 110 ? `${description.substring(0, 106)}…` : description;
  };

  const getRelationshipBadgeStyle = (type: string) => {
    switch (type) {
      case "sponsor":
        return "bg-amber-400/10 text-amber-300 border-amber-400/20";
      case "companion":
        return "bg-cyan-400/10 text-cyan-300 border-cyan-400/20";
      case "master_disciple":
        return "bg-purple-400/10 text-purple-300 border-purple-400/20";
      case "alliance":
        return "bg-emerald-400/10 text-emerald-300 border-emerald-400/20";
      case "rivalry":
        return "bg-rose-400/10 text-rose-300 border-rose-400/20";
      case "cosmic_mirror":
        return "bg-fuchsia-400/10 text-fuchsia-300 border-fuchsia-400/20";
      case "observation":
      default:
        return "bg-blue-400/10 text-blue-300 border-blue-400/20";
    }
  };

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case "incarnation":
        return "text-cyan-300 border-cyan-500/25 bg-cyan-950/30";
      case "cosmic_entity":
        return "text-purple-300 border-purple-500/25 bg-purple-950/30";
      case "nebula":
        return "text-indigo-300 border-indigo-500/25 bg-indigo-950/30";
      case "constellation":
      default:
        return "text-amber-300 border-amber-500/25 bg-amber-950/30";
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Directory Category Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10" role="tablist" aria-label="Archive category">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "entities"}
            aria-controls="archive-entities-panel"
            id="tab-entities"
            style={uiFont}
            onClick={() => setActiveTab("entities")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
              activeTab === "entities"
                ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
            }`}
          >
            Entities ({nodes.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "relationships"}
            aria-controls="archive-relationships-panel"
            id="tab-relationships"
            style={uiFont}
            onClick={() => setActiveTab("relationships")}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
              activeTab === "relationships"
                ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 font-semibold"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
            }`}
          >
            Bonds ({edges.length})
          </button>
        </div>

        <button
          type="button"
          onClick={onSwitchToMap}
          style={uiFont}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:text-white bg-[#030712] hover:bg-cyan-950/40 border border-cyan-500/30 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
        >
          <Compass size={13} className="text-cyan-400" />
          <span>Switch to Cosmic Map</span>
        </button>
      </div>

      {/* ────────────────── PANEL 1: ENTITIES DIRECTORY ────────────────── */}
      {activeTab === "entities" && (
        <div
          id="archive-entities-panel"
          role="tabpanel"
          aria-labelledby="tab-entities"
          className="space-y-2"
        >
          {nodes.length === 0 ? (
            <div className="py-16 text-center border border-white/10 rounded-2xl bg-white/[0.01]">
              <p style={serifFont} className="text-slate-300 text-xl font-normal">
                No archived entities match this query
              </p>
              <p className="text-slate-500 text-xs font-mono mt-2">Adjust your search term or mode filter</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#020409]/90 overflow-hidden divide-y divide-white/5">
              {nodes.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const displayModifier =
                  node.modifierSpoiler && !spoilerUnlocked
                    ? "[Endgame Classified]"
                    : node.modifier;
                const oneSentenceSummary = getOneSentenceSummary(node.description);

                return (
                  <div
                    key={node.id}
                    className={`group p-4 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-cyan-950/30 border-l-2 border-cyan-400"
                        : "hover:bg-white/[0.02] border-l-2 border-transparent"
                    }`}
                  >
                    {/* Entity Identity & Title */}
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          style={serifFont}
                          className="text-lg md:text-xl font-normal text-slate-100 group-hover:text-cyan-200 transition-colors tracking-tight"
                        >
                          {node.name}
                        </span>
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded border ${getTypeBadgeStyle(
                            node.type
                          )}`}
                        >
                          {node.type.replace("_", " ")}
                        </span>
                        <span
                          style={serifFont}
                          className="text-xs italic text-amber-200/90 truncate"
                        >
                          &quot;{displayModifier}&quot;
                        </span>
                      </div>

                      {/* Concise One-Sentence Summary */}
                      <p style={uiFont} className="text-xs text-slate-400 leading-relaxed line-clamp-2 md:line-clamp-1">
                        {oneSentenceSummary}
                      </p>
                    </div>

                    {/* Clear Restrained Actions: Inspect Dossier or Locate on Map */}
                    <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
                      <button
                        type="button"
                        onClick={() => onSelectNode(node.id)}
                        style={uiFont}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        aria-label={`Inspect dossier for ${node.name}`}
                      >
                        <span>Inspect</span>
                        <ArrowUpRight size={13} className="text-cyan-400" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectNode(node.id);
                          onSwitchToMap();
                        }}
                        style={uiFont}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        aria-label={`Locate ${node.name} on map`}
                      >
                        <Compass size={13} />
                        <span>Map</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ────────────────── PANEL 2: RELATIONSHIPS DIRECTORY ────────────────── */}
      {activeTab === "relationships" && (
        <div
          id="archive-relationships-panel"
          role="tabpanel"
          aria-labelledby="tab-relationships"
          className="space-y-2"
        >
          {edges.length === 0 ? (
            <div className="py-16 text-center border border-white/10 rounded-2xl bg-white/[0.01]">
              <p style={serifFont} className="text-slate-300 text-xl font-normal">
                No relationships match this filter
              </p>
              <p className="text-slate-500 text-xs font-mono mt-2">Adjust your mode or spoiler settings</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#020409]/90 overflow-hidden divide-y divide-white/5">
              {edges.map((edge) => {
                const sourceNode = getNodeById(edge.source);
                const targetNode = getNodeById(edge.target);
                const isSelected = selectedEdgeId === edge.id;
                const isExpanded = expandedEdgeId === edge.id;

                if (!sourceNode || !targetNode) return null;

                return (
                  <div
                    key={edge.id}
                    className={`p-4 transition-colors ${
                      isSelected
                        ? "bg-cyan-950/30 border-l-2 border-cyan-400"
                        : "hover:bg-white/[0.02] border-l-2 border-transparent"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Connection Overview */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          style={serifFont}
                          className="text-base sm:text-lg font-normal text-slate-100"
                        >
                          {sourceNode.name}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 text-[9.5px] font-mono rounded border ${getRelationshipBadgeStyle(
                            edge.type
                          )}`}
                        >
                          {edge.label}
                        </span>
                        <span className="text-slate-400 font-mono text-xs">→</span>
                        <span
                          style={serifFont}
                          className="text-base sm:text-lg font-normal text-slate-100"
                        >
                          {targetNode.name}
                        </span>
                      </div>

                      {/* Actions: Expand Narrative Context or Inspect in Dossier */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedEdgeId(isExpanded ? null : edge.id)}
                          style={uiFont}
                          className="text-[11px] font-medium text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        >
                          {isExpanded ? "Collapse" : "Details"}
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectEdge(edge.id)}
                          style={uiFont}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-white px-2.5 py-1 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
                          aria-label={`Inspect bond: ${edge.label}`}
                        >
                          <span>Inspect Bond</span>
                          <ArrowUpRight size={12} />
                        </button>
                      </div>
                    </div>

                    {/* On-Demand Expanded Section */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-white/5 text-xs space-y-1.5">
                        <p style={uiFont} className="text-slate-300 leading-relaxed">
                          {edge.description}
                        </p>
                        <p style={monoFont} className="text-[10px] text-cyan-400/90">
                          Citation: {edge.chapterCitation} · {edge.canonStatus === "verified_canon" ? "Verified Canon" : "Needs Verification"}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


