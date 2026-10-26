"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  getFilteredObservatoryGraph,
  getNodeById,
  getEdgeById,
  type ObservatoryNode,
  type ObservatoryEdge,
  type GraphFilterOptions,
} from "@/lib/data/observatory-data";
import { ObservatoryControls } from "@/components/observatory/observatory-controls";
import { ObservatoryCanvas } from "@/components/observatory/observatory-canvas";
import { ObservatoryDossier } from "@/components/observatory/observatory-dossier";
import { ObservatoryArchiveList } from "@/components/observatory/observatory-archive-list";

const displayFont = { fontFamily: "'Orbitron', sans-serif" };
const serifFont = { fontFamily: "'Instrument Serif', Georgia, serif" };
const uiFont = { fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

export default function ConstellationsPage() {
  // Navigation & selection state
  const [selectedNode, setSelectedNode] = useState<ObservatoryNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<ObservatoryEdge | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Filter & view state
  const [filters, setFilters] = useState<GraphFilterOptions>({
    spoilerUnlocked: false,
    mode: "all",
    entityFilter: "all",
    searchQuery: "",
  });
  const [viewMode, setViewMode] = useState<"canvas" | "list">("canvas");

  // Filtered graph calculation based on state
  const filteredData = useMemo(() => {
    return getFilteredObservatoryGraph(filters);
  }, [filters]);

  // Handler helpers
  const handleSelectNode = useCallback((node: ObservatoryNode | null) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const handleSelectEdge = useCallback((edge: ObservatoryEdge | null) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const handleSelectNodeById = useCallback((nodeId: string | null) => {
    if (!nodeId) {
      setSelectedNode(null);
      return;
    }
    const node = getNodeById(nodeId);
    if (node) {
      setSelectedNode(node);
      setSelectedEdge(null);
    }
  }, []);

  const handleSelectEdgeById = useCallback((edgeId: string | null) => {
    if (!edgeId) {
      setSelectedEdge(null);
      return;
    }
    const edge = getEdgeById(edgeId);
    if (edge) {
      setSelectedEdge(edge);
      setSelectedNode(null);
    }
  }, []);

  const handleCloseDossier = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const handleChangeFilters = useCallback((updated: Partial<GraphFilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  }, []);

  return (
    <main className="min-h-screen pt-16 sm:pt-18 pb-4 px-3 sm:px-6 lg:px-8 bg-[#030712] text-slate-100 flex flex-col justify-start">
      {/* Compact Atmospheric Observatory Header */}
      <header className="max-w-6xl mx-auto text-center mb-2 sm:mb-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-[10px] font-mono tracking-wider uppercase mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#82b1ff] animate-pulse" />
          <span>[ Star Stream // Constellation Observatory ]</span>
        </div>
        <h1 style={serifFont} className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-50 tracking-tight leading-tight mb-1">
          The Constellation Observatory
        </h1>
        <p style={uiFont} className="max-w-xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed">
          Cosmic projection mapping verified bonds between Incarnations, Constellations, and Ancient Entities across the Star Stream scenarios.
        </p>
      </header>

      {/* Main Exploration Controls */}
      <div className="max-w-7xl mx-auto w-full mb-2">
        <ObservatoryControls
          filters={filters}
          onChangeFilters={handleChangeFilters}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          matchCount={filteredData.matchedNodeIds.size}
          totalNodesCount={filteredData.nodes.length}
        />
      </div>

      {/* Primary Interactive Presentation: Canvas vs Archive List View */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {viewMode === "canvas" ? (
          <div className="w-full flex-1 flex flex-col">
            {/* The Cinematic SVG Observatory Canvas */}
            <ObservatoryCanvas
              nodes={filteredData.nodes}
              edges={filteredData.edges}
              selectedNode={selectedNode}
              selectedEdge={selectedEdge}
              hoveredNodeId={hoveredNodeId}
              matchedNodeIds={filteredData.matchedNodeIds}
              onSelectNode={handleSelectNode}
              onSelectEdge={handleSelectEdge}
              onHoverNode={setHoveredNodeId}
              spoilerUnlocked={filters.spoilerUnlocked}
              filtersMode={filters.mode}
            />
          </div>
        ) : (
          /* Accessible Archive Directory Table / Card View */
          <ObservatoryArchiveList
            nodes={filteredData.nodes}
            edges={filteredData.edges}
            selectedNodeId={selectedNode ? selectedNode.id : null}
            selectedEdgeId={selectedEdge ? selectedEdge.id : null}
            onSelectNode={handleSelectNodeById}
            onSelectEdge={handleSelectEdgeById}
            spoilerUnlocked={filters.spoilerUnlocked}
            onSwitchToMap={() => setViewMode("canvas")}
          />
        )}
      </div>

      {/* Slide-over System Dossier */}
      <ObservatoryDossier
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
        onClose={handleCloseDossier}
        onSelectNode={handleSelectNodeById}
        onSelectEdge={handleSelectEdgeById}
        spoilerUnlocked={filters.spoilerUnlocked}
      />
    </main>
  );
}
