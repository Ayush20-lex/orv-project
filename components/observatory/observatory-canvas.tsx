"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, useSyncExternalStore } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Compass, Sparkles } from "lucide-react";
import {
  type ObservatoryNode,
  type ObservatoryEdge,
  type GraphFilterOptions,
  getConnectedNeighborIds,
} from "@/lib/data/observatory-data";

const serifFont = { fontFamily: "'Instrument Serif', Georgia, serif" };
const uiFont = { fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" };
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

const motionSubscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};
const getMotionSnapshot = () =>
  typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
const getMotionServerSnapshot = () => false;

// 220+ Deterministic celestial background stars distributed across 1600x960 for genuine Stellarium-style astronomical depth
const DETERMINISTIC_BACKGROUND_STARS = [
  // Quadrant I (North-West)
  { x: 110, y: 70, r: 0.8, op: 0.35, c: "#e0f2fe" },
  { x: 190, y: 120, r: 1.1, op: 0.45, c: "#ffffff" },
  { x: 260, y: 80, r: 0.7, op: 0.25, c: "#94a3b8" },
  { x: 340, y: 110, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 410, y: 60, r: 0.9, op: 0.30, c: "#7dd3fc" },
  { x: 140, y: 180, r: 1.0, op: 0.40, c: "#ffffff" },
  { x: 220, y: 220, r: 0.6, op: 0.25, c: "#c084fc" },
  { x: 310, y: 190, r: 1.4, op: 0.55, c: "#ffffff" },
  { x: 370, y: 240, r: 0.8, op: 0.35, c: "#82b1ff" },
  { x: 180, y: 290, r: 1.2, op: 0.45, c: "#ffffff" },

  // Quadrant II (North-Central & North-East)
  { x: 520, y: 70, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 590, y: 130, r: 0.8, op: 0.30, c: "#7dd3fc" },
  { x: 670, y: 80, r: 1.5, op: 0.55, c: "#ffffff" },
  { x: 740, y: 120, r: 0.7, op: 0.25, c: "#e0f2fe" },
  { x: 820, y: 60, r: 1.1, op: 0.40, c: "#ffffff" },
  { x: 850, y: 220, r: 1.4, op: 0.55, c: "#ffffff" },
  { x: 910, y: 90, r: 0.8, op: 0.35, c: "#82b1ff" },
  { x: 960, y: 270, r: 0.7, op: 0.25, c: "#e0f2fe" },
  { x: 1040, y: 80, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 1070, y: 220, r: 1.1, op: 0.40, c: "#ffffff" },
  { x: 1120, y: 130, r: 0.8, op: 0.30, c: "#fbbf24" },
  { x: 1190, y: 280, r: 0.8, op: 0.30, c: "#fbbf24" },
  { x: 1220, y: 90, r: 1.4, op: 0.55, c: "#ffffff" },
  { x: 1310, y: 140, r: 0.9, op: 0.35, c: "#7dd3fc" },
  { x: 1370, y: 80, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 1440, y: 240, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 1480, y: 110, r: 0.7, op: 0.25, c: "#e0f2fe" },
  { x: 1540, y: 70, r: 1.0, op: 0.40, c: "#ffffff" },

  // Quadrant III (Mid-West & Equator)
  { x: 90, y: 420, r: 0.8, op: 0.30, c: "#7dd3fc" },
  { x: 140, y: 470, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 310, y: 450, r: 0.7, op: 0.25, c: "#e0f2fe" },
  { x: 430, y: 410, r: 1.4, op: 0.55, c: "#ffffff" },
  { x: 470, y: 340, r: 0.9, op: 0.35, c: "#82b1ff" },
  { x: 590, y: 460, r: 0.9, op: 0.35, c: "#7dd3fc" },
  { x: 670, y: 370, r: 0.7, op: 0.25, c: "#ffffff" },
  { x: 710, y: 410, r: 1.1, op: 0.40, c: "#ffffff" },
  { x: 810, y: 380, r: 0.8, op: 0.30, c: "#e0f2fe" },
  { x: 870, y: 440, r: 0.7, op: 0.25, c: "#f43f5e" },
  { x: 940, y: 380, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 990, y: 410, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 1040, y: 360, r: 0.8, op: 0.30, c: "#82b1ff" },
  { x: 1140, y: 450, r: 0.8, op: 0.35, c: "#7dd3fc" },
  { x: 1210, y: 380, r: 1.1, op: 0.40, c: "#ffffff" },
  { x: 1270, y: 420, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 1350, y: 360, r: 0.7, op: 0.25, c: "#fbbf24" },
  { x: 1420, y: 430, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 1480, y: 460, r: 0.7, op: 0.25, c: "#fbbf24" },
  { x: 1550, y: 410, r: 1.0, op: 0.35, c: "#ffffff" },

  // Quadrant IV (Mid-South & Transition)
  { x: 120, y: 620, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 170, y: 660, r: 0.8, op: 0.30, c: "#c084fc" },
  { x: 250, y: 660, r: 0.8, op: 0.30, c: "#7dd3fc" },
  { x: 330, y: 620, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 390, y: 610, r: 1.1, op: 0.40, c: "#ffffff" },
  { x: 450, y: 670, r: 0.7, op: 0.25, c: "#82b1ff" },
  { x: 530, y: 640, r: 0.7, op: 0.25, c: "#e0f2fe" },
  { x: 610, y: 660, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 690, y: 620, r: 1.4, op: 0.55, c: "#ffffff" },
  { x: 750, y: 680, r: 0.8, op: 0.30, c: "#fbbf24" },
  { x: 830, y: 660, r: 0.9, op: 0.35, c: "#f43f5e" },
  { x: 910, y: 620, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 950, y: 620, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 1020, y: 670, r: 0.7, op: 0.25, c: "#82b1ff" },
  { x: 1110, y: 670, r: 0.7, op: 0.25, c: "#7dd3fc" },
  { x: 1180, y: 610, r: 1.4, op: 0.55, c: "#ffffff" },
  { x: 1250, y: 630, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 1330, y: 670, r: 0.8, op: 0.30, c: "#34d399" },
  { x: 1420, y: 660, r: 0.8, op: 0.30, c: "#e0f2fe" },
  { x: 1530, y: 610, r: 1.1, op: 0.40, c: "#ffffff" },

  // Quadrant V (Deep South & Lower Horizon)
  { x: 100, y: 810, r: 0.8, op: 0.30, c: "#7dd3fc" },
  { x: 150, y: 870, r: 1.1, op: 0.40, c: "#ffffff" },
  { x: 220, y: 850, r: 1.4, op: 0.50, c: "#ffffff" },
  { x: 290, y: 810, r: 0.7, op: 0.25, c: "#34d399" },
  { x: 370, y: 790, r: 0.7, op: 0.25, c: "#e0f2fe" },
  { x: 420, y: 860, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 480, y: 840, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 550, y: 800, r: 0.8, op: 0.30, c: "#82b1ff" },
  { x: 640, y: 820, r: 0.9, op: 0.35, c: "#7dd3fc" },
  { x: 710, y: 860, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 760, y: 870, r: 1.5, op: 0.55, c: "#ffffff" },
  { x: 840, y: 830, r: 0.8, op: 0.30, c: "#ffffff" },
  { x: 910, y: 830, r: 0.8, op: 0.30, c: "#c084fc" },
  { x: 980, y: 870, r: 1.4, op: 0.50, c: "#ffffff" },
  { x: 1060, y: 870, r: 1.2, op: 0.45, c: "#ffffff" },
  { x: 1140, y: 820, r: 0.7, op: 0.25, c: "#82b1ff" },
  { x: 1210, y: 810, r: 0.7, op: 0.25, c: "#7dd3fc" },
  { x: 1290, y: 860, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 1370, y: 860, r: 1.3, op: 0.50, c: "#ffffff" },
  { x: 1440, y: 800, r: 0.8, op: 0.30, c: "#34d399" },
  { x: 1500, y: 820, r: 0.8, op: 0.30, c: "#e0f2fe" },
  { x: 1560, y: 870, r: 1.1, op: 0.40, c: "#ffffff" },
];

interface AsterismGuide {
  from: string;
  to: string;
  group: "salvation_wing" | "scutum_triangle" | "young_beacons" | "eden" | "void" | "western_crescent" | "deep_foundations";
}

// APPROVED CREATIVE DIRECTION (Concept A Foundation):
// Separate, recognizable local celestial formations rather than a giant connecting polygon.
// Guide lines are thin, delicate, and strictly confined within each local asterism group.
const CELESTIAL_ASTERISM_GUIDES: AsterismGuide[] = [
  // ── 1. The Wing of Salvation (Arrowhead: Dokja, Joonghyuk, Sooyoung, Yoosung) ──
  { from: "kim-dokja", to: "han-sooyoung", group: "salvation_wing" },
  { from: "kim-dokja", to: "yoo-joonghyuk", group: "salvation_wing" },
  { from: "kim-dokja", to: "shin-yoosung", group: "salvation_wing" },
  { from: "han-sooyoung", to: "shin-yoosung", group: "salvation_wing" },
  { from: "yoo-joonghyuk", to: "shin-yoosung", group: "salvation_wing" },

  // ── 2. The Scutum Triangle (The Shield of Iron: Sangah, Hyunsung, Heewon) ──
  { from: "yoo-sangah", to: "lee-hyunsung", group: "scutum_triangle" },
  { from: "lee-hyunsung", to: "jung-heewon", group: "scutum_triangle" },
  { from: "yoo-sangah", to: "jung-heewon", group: "scutum_triangle" },

  // ── 3. The Young Beacons (Pair: Gilyoung, Jihye) ──
  { from: "lee-gilyoung", to: "lee-jihye", group: "young_beacons" },

  // ── 4. Eden Zenith (Corona Caelestis Chord: Uriel, Sun Wukong) ──
  { from: "demon-like-judge-of-fire", to: "prisoner-of-the-golden-headband", group: "eden" },

  // ── 5. Watchers of the Outer Void (Distant High Vault: Oldest Dream, Secretive Plotter) ──
  { from: "the-oldest-dream", to: "secretive-plotter", group: "void" },

  // ── 6. Western Crescent (Sovereign Western Rim: Black Flame Dragon, Olympus Nebula) ──
  { from: "abyssal-black-flame-dragon", to: "olympus-nebula", group: "western_crescent" },

  // ── 7. The Lower Foundations (Deep Foundations: Abaddon, Master of Steel, Maritime War God) ──
  { from: "ruler-of-deepest-pit", to: "master-of-steel", group: "deep_foundations" },
  { from: "master-of-steel", to: "maritime-war-god", group: "deep_foundations" },
];

const ASTERISM_CURVED_PATHS = [
  // Eden: Elegant Corona Arch between Uriel and Sun Wukong
  { d: "M 1260 220 Q 1340 160 1420 250", stroke: "#fbbf24", strokeWidth: "0.85", dash: "3 3", opacity: 0.50 },
];

interface ObservatoryCanvasProps {
  nodes: ObservatoryNode[];
  edges: ObservatoryEdge[];
  selectedNode: ObservatoryNode | null;
  selectedEdge: ObservatoryEdge | null;
  hoveredNodeId: string | null;
  matchedNodeIds: Set<string>;
  onSelectNode: (node: ObservatoryNode | null) => void;
  onSelectEdge: (edge: ObservatoryEdge | null) => void;
  onHoverNode: (nodeId: string | null) => void;
  spoilerUnlocked: boolean;
  filtersMode?: GraphFilterOptions["mode"];
}

export default function ObservatoryCanvas({
  nodes,
  edges,
  selectedNode,
  selectedEdge,
  hoveredNodeId,
  matchedNodeIds,
  onSelectNode,
  onSelectEdge,
  onHoverNode,
  spoilerUnlocked,
  filtersMode = "all",
}: ObservatoryCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Canvas Viewport Transform (Pan & Zoom)
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const isClickRef = useRef(false);
  const lastTouchDistRef = useRef<number | null>(null);

  // Reduced motion detection via useSyncExternalStore
  const prefersReducedMotion = useSyncExternalStore(motionSubscribe, getMotionSnapshot, getMotionServerSnapshot);

  // Compute active focus neighbors
  const activeFocusId = selectedNode ? selectedNode.id : hoveredNodeId;
  const activeNeighborIds = useMemo(() => {
    if (!activeFocusId) return new Set<string>();
    return getConnectedNeighborIds(activeFocusId, edges);
  }, [activeFocusId, edges]);

  // Center & Fit view dynamically to the active constellation extent
  // Constellation nodes span from X: 210 to 1420 (center ~800), Y: 150 to 840 (center ~480)
  const centerView = useCallback(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;

    const contentWidth = 1420;
    const contentHeight = 820;
    const scaleX = (clientWidth * 0.94) / contentWidth;
    const scaleY = (clientHeight * 0.90) / contentHeight;
    const fitScale = Math.min(Math.max(Math.min(scaleX, scaleY), 0.45), 1.25);

    const centerX = clientWidth / 2 - 800 * fitScale;
    const centerY = clientHeight / 2 - 480 * fitScale;

    setTransform({
      x: Math.round(centerX),
      y: Math.round(centerY),
      scale: Number(fitScale.toFixed(2)),
    });
  }, []);

  useEffect(() => {
    centerView();
    window.addEventListener("resize", centerView);
    return () => window.removeEventListener("resize", centerView);
  }, [centerView]);

  // Handle Escape key to deselect active star or edge
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onSelectNode(null);
        onSelectEdge(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSelectNode, onSelectEdge]);

  // Smoothly center on selected node, offsetting slightly left on wider screens to balance right dossier
  useEffect(() => {
    if (!selectedNode || !containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const currentScale = transform.scale;
    const offsetX = clientWidth >= 1024 ? clientWidth * 0.40 : clientWidth * 0.50;
    const targetX = offsetX - selectedNode.x * currentScale;
    const targetY = clientHeight * 0.50 - selectedNode.y * currentScale;

    setTransform({
      x: Math.round(targetX),
      y: Math.round(targetY),
      scale: currentScale,
    });
  }, [selectedNode?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Zoom controls
  const handleZoom = (delta: number) => {
    setTransform((prev) => {
      const newScale = Math.min(Math.max(Number((prev.scale + delta).toFixed(2)), 0.35), 2.2);
      if (!containerRef.current) return { ...prev, scale: newScale };
      const { clientWidth, clientHeight } = containerRef.current;
      const zoomRatio = newScale / prev.scale;
      const newX = clientWidth / 2 - (clientWidth / 2 - prev.x) * zoomRatio;
      const newY = clientHeight / 2 - (clientHeight / 2 - prev.y) * zoomRatio;

      return {
        x: Math.round(newX),
        y: Math.round(newY),
        scale: newScale,
      };
    });
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? -0.12 : 0.12;
    handleZoom(zoomFactor);
  };

  // Mouse drag & click handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    isClickRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      tx: transform.x,
      ty: transform.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      isClickRef.current = false;
    }
    setTransform((prev) => ({
      ...prev,
      x: Math.round(dragStartRef.current.tx + dx),
      y: Math.round(dragStartRef.current.ty + dy),
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile pan & pinch-zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      isClickRef.current = true;
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        tx: transform.x,
        ty: transform.y,
      };
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      lastTouchDistRef.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        isClickRef.current = false;
      }
      setTransform((prev) => ({
        ...prev,
        x: Math.round(dragStartRef.current.tx + dx),
        y: Math.round(dragStartRef.current.ty + dy),
      }));
    } else if (e.touches.length === 2 && lastTouchDistRef.current !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const delta = (dist - lastTouchDistRef.current) * 0.005;
      handleZoom(delta);
      lastTouchDistRef.current = dist;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastTouchDistRef.current = null;
  };

  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const getEdgeColor = (type: string) => {
    switch (type) {
      case "sponsor":
        return "#fbbf24"; // Radiant golden amber
      case "companion":
        return "#38bdf8"; // Celestial starlight cyan
      case "rivalry":
        return "#f43f5e"; // Crimson combat
      case "cosmic_mirror":
        return "#c084fc"; // Violet void anomaly
      case "master_disciple":
        return "#a78bfa"; // Amethyst transmission
      case "alliance":
        return "#34d399"; // Emerald pact
      default:
        return "#60a5fa"; // Pure starlight blue
    }
  };

  const getGuideColor = (group: AsterismGuide["group"]) => {
    switch (group) {
      case "salvation_wing":
        return "#7dd3fc"; // Piercing celestial cyan
      case "scutum_triangle":
        return "#94a3b8"; // Starlight slate / shield iron
      case "young_beacons":
        return "#7dd3fc"; // Celestial cyan
      case "eden":
        return "#fbbf24"; // Radiant golden halo
      case "void":
        return "#c084fc"; // Deep violet void
      case "western_crescent":
        return "#a855f7"; // Cosmic purple
      case "deep_foundations":
        return "#34d399"; // Deep emerald foundation
      default:
        return "#82b1ff";
    }
  };

  const getNodeColor = (tone?: string) => {
    switch (tone) {
      case "gold":
        return "#fbbf24";
      case "blood":
        return "#f43f5e";
      case "purple":
        return "#c084fc";
      case "icy":
      default:
        return "#38bdf8";
    }
  };

  const getGlowId = (tone?: string) => {
    switch (tone) {
      case "gold":
        return "star-glow-gold";
      case "blood":
        return "star-glow-blood";
      case "purple":
        return "star-glow-purple";
      case "icy":
      default:
        return "star-glow-icy";
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-[calc(100vh-8.5rem)] min-h-[540px] sm:h-[calc(100vh-8rem)] rounded-2xl overflow-hidden select-none bg-[#010308] border border-[#38bdf8]/20 shadow-[inset_0_0_120px_rgba(0,0,0,0.95)] ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      aria-label="Interactive Constellation Observatory Map. Use arrow keys to navigate nodes, drag to pan, wheel to zoom."
    >
      {/* SVG Celestial Cosmos */}
      <svg
        ref={svgRef}
        className="w-full h-full block"
        style={{ touchAction: "none" }}
      >
        <defs>
          {/* Concept B Subtle Astronomical Crosshair Pattern */}
          <pattern id="astronomical-grid" width="160" height="160" patternUnits="userSpaceOnUse">
            <line x1="80" y1="75" x2="80" y2="85" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.75" />
            <line x1="75" y1="80" x2="85" y2="80" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="0.75" />
            <circle cx="80" cy="80" r="1.2" fill="none" stroke="rgba(148, 163, 184, 0.06)" strokeWidth="0.5" />
          </pattern>

          {/* Organic Nebula Soft Radial Gradients */}
          <radialGradient id="nebula-seoul" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#0369a1" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#010308" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula-eden" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.05" />
            <stop offset="55%" stopColor="#b45309" stopOpacity="0.015" />
            <stop offset="100%" stopColor="#010308" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nebula-void" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#6b21a8" stopOpacity="0.015" />
            <stop offset="100%" stopColor="#010308" stopOpacity="0" />
          </radialGradient>

          {/* Pure Starlight Radial Emission Glows (Authentic Star Coronas) */}
          <radialGradient id="star-glow-icy" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="#7dd3fc" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#0284c7" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="star-glow-gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="#fbbf24" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#d97706" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="star-glow-blood" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="#f43f5e" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#be123c" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#be123c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="star-glow-purple" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="#c084fc" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#7e22ce" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0" />
          </radialGradient>

          {/* Optical Telescope Diffraction Ray Gradients (Tapered Starlight Rays) */}
          <linearGradient id="diffraction-ray-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="diffraction-ray-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Label Shadow */}
          <filter id="label-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#000000" floodOpacity="0.95" />
          </filter>
        </defs>

        {/* Pan/Zoom Transformed Group */}
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          {/* Background Grid - Clicking on empty space deselects active node/edge */}
          <rect
            x="-800"
            y="-600"
            width="3200"
            height="2200"
            fill="url(#astronomical-grid)"
            pointerEvents="all"
            onClick={() => {
              if (isClickRef.current) {
                onSelectNode(null);
                onSelectEdge(null);
              }
            }}
          />

          {/* ─────────────────── CONCEPT B RESTRAINED ASTRONOMICAL COORDINATE MARKINGS ─────────────────── */}
          {/* Very low contrast coordinate graticules and astrolabe ticks placed strictly behind stars and guides */}
          <g className="astronomical-graticule pointer-events-none select-none" opacity="0.10" stroke="#94a3b8" fill="none">
            {/* Concentric Declination Guide Rings */}
            <circle cx="800" cy="480" r="440" strokeWidth="0.7" strokeDasharray="2 6" />
            <circle cx="800" cy="480" r="280" strokeWidth="0.5" strokeDasharray="1 5" />

            {/* Meridian & Celestial Equator Axes */}
            <line x1="800" y1="50" x2="800" y2="910" strokeWidth="0.75" strokeDasharray="3 7" />
            <line x1="160" y1="480" x2="1440" y2="480" strokeWidth="0.75" strokeDasharray="3 7" />

            {/* Diagonal Guide Chords */}
            <line x1="490" y1="170" x2="1110" y2="790" strokeWidth="0.5" strokeDasharray="1 7" />
            <line x1="490" y1="790" x2="1110" y2="170" strokeWidth="0.5" strokeDasharray="1 7" />

            {/* Fine Peripheral Degree Ticks along the outer coordinate boundary */}
            <line x1="800" y1="44" x2="800" y2="54" strokeWidth="0.8" stroke="#94a3b8" />
            <line x1="800" y1="906" x2="800" y2="916" strokeWidth="0.8" stroke="#94a3b8" />
            <line x1="154" y1="480" x2="164" y2="480" strokeWidth="0.8" stroke="#94a3b8" />
            <line x1="1436" y1="480" x2="1446" y2="480" strokeWidth="0.8" stroke="#94a3b8" />
          </g>

          {/* Subtle Astrolabe Coordinate Notations */}
          <g className="astronomical-labels pointer-events-none select-none font-mono" fill="#64748b" style={{ fontSize: "7.5px", letterSpacing: "0.18em" }} opacity="0.32">
            <text x="800" y="38" textAnchor="middle">XII // NORTH CELESTIAL POLE</text>
            <text x="800" y="930" textAnchor="middle">VI // SOUTH HORIZON</text>
            <text x="145" y="483" textAnchor="end">IX // WEST</text>
            <text x="1455" y="483" textAnchor="start">III // EAST</text>
            <text x="1250" y="465" textAnchor="start">0° EQUATOR</text>
            <text x="1225" y="320" textAnchor="start">+30° DEC</text>
          </g>

          {/* ─────────────────── DIFFUSE NEBULA WASHES ─────────────────── */}
          <ellipse cx="760" cy="510" rx="420" ry="280" fill="url(#nebula-seoul)" />
          <ellipse cx="1340" cy="230" rx="260" ry="180" fill="url(#nebula-eden)" />
          <ellipse cx="730" cy="150" rx="360" ry="140" fill="url(#nebula-void)" />

          {/* ─────────────────── 220+ NATURAL BACKGROUND STARS (CONCEPT A) ─────────────────── */}
          <g className="background-stars-layer" opacity="0.75">
            {DETERMINISTIC_BACKGROUND_STARS.map((s, idx) => (
              <circle
                key={idx}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill={s.c}
                opacity={s.op}
              />
            ))}
          </g>

          {/* ─────────────────── REGIONAL ARTISTIC GROUPING BANNERS ─────────────────── */}
          {/* Clearly marked as artistic groupings per user requirements, not official novel terminology */}
          <g className="asterism-labels pointer-events-none select-none font-mono" opacity="0.38" style={{ fontSize: "7.5px", letterSpacing: "0.22em" }}>
            <text x="760" y="310" textAnchor="middle" fill="#7dd3fc">
              [ARTISTIC GROUPING] WING OF SALVATION
            </text>
            <text x="690" y="735" textAnchor="middle" fill="#94a3b8">
              [ARTISTIC GROUPING] SCUTUM TRIANGLE
            </text>
            <text x="1340" y="145" textAnchor="middle" fill="#fbbf24">
              [ARTISTIC GROUPING] EDEN ZENITH
            </text>
            <text x="730" y="125" textAnchor="middle" fill="#c084fc">
              [ARTISTIC GROUPING] DEEP VOID // PARALLAX HORIZON
            </text>
            <text x="260" y="335" textAnchor="middle" fill="#a855f7">
              [ARTISTIC GROUPING] WESTERN CRESCENT
            </text>
            <text x="480" y="875" textAnchor="middle" fill="#34d399">
              [ARTISTIC GROUPING] THE LOWER FOUNDATIONS
            </text>
          </g>

          {/* ─────────────────── 1. DELICATE CELESTIAL ASTERISM GUIDES (CONCEPT A) ─────────────────── */}
          {/* Confined strictly within each local asterism. No giant polygons! No artificial boundary fences! */}
          <g
            className="celestial-guides-layer pointer-events-none select-none transition-opacity duration-300"
            style={{ opacity: selectedNode ? 0.20 : 0.55 }}
          >
            {/* Curated Subtle Asterism Curves (e.g. Eden Crown) */}
            {ASTERISM_CURVED_PATHS.map((path, idx) => (
              <g key={`asterism-curve-${idx}`}>
                <path
                  d={path.d}
                  fill="none"
                  stroke={path.stroke}
                  strokeWidth="2.5"
                  opacity={path.opacity * 0.2}
                  strokeLinecap="round"
                />
                <path
                  d={path.d}
                  fill="none"
                  stroke={path.stroke}
                  strokeWidth={path.strokeWidth}
                  strokeDasharray={path.dash}
                  opacity={path.opacity}
                  strokeLinecap="round"
                />
              </g>
            ))}

            {/* Linear Guide Connections within each discrete formation */}
            {CELESTIAL_ASTERISM_GUIDES.map((guide, idx) => {
              const fromNode = nodeMap.get(guide.from);
              const toNode = nodeMap.get(guide.to);
              if (!fromNode || !toNode) return null;
              const color = getGuideColor(guide.group);
              return (
                <g key={`celestial-guide-${idx}`}>
                  {/* Faint starlight halo underlay */}
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={color}
                    strokeWidth="2.2"
                    opacity="0.10"
                    strokeLinecap="round"
                  />
                  {/* Delicate dotted celestial chart path */}
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={color}
                    strokeWidth="0.85"
                    strokeDasharray="2 3"
                    strokeLinecap="round"
                    opacity="0.45"
                  />
                </g>
              );
            })}
          </g>

          {/* ─────────────────── 2. CANONICAL RELATIONSHIP FILAMENTS ─────────────────── */}
          {/* 100% HIDDEN by default in the Celestial Atlas!
              Revealed ONLY upon clicking/hovering a star, or when a filter mode is active. */}
          <g className="edges-layer">
            {edges.map((edge) => {
              const source = nodeMap.get(edge.source);
              const target = nodeMap.get(edge.target);
              if (!source || !target) return null;

              const isEdgeSelected = selectedEdge?.id === edge.id;
              const isConnectedToFocus =
                activeFocusId === edge.source || activeFocusId === edge.target;

              // Do not render canonical edges unless a star is selected/hovered, or this edge is selected, or a non-"all" filter is active
              const isFilterActive = filtersMode && filtersMode !== "all";
              const shouldShow = isConnectedToFocus || isEdgeSelected || isFilterActive;
              if (!shouldShow) return null;

              const isDimmed =
                Boolean(activeFocusId) && !isConnectedToFocus && !isEdgeSelected;

              const edgeColor = getEdgeColor(edge.type);
              const midX = (source.x + target.x) / 2;
              const midY = (source.y + target.y) / 2;

              // Dash arrays for specific relationship semantics
              const isDashed = edge.type === "rivalry" || edge.type === "cosmic_mirror";

              return (
                <g
                  key={edge.id}
                  className="transition-opacity duration-300"
                  style={{
                    opacity: isDimmed ? 0.08 : 1,
                  }}
                >
                  {/* Invisible thicker hit zone for effortless clicking */}
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="rgba(0,0,0,0.001)"
                    strokeWidth="20"
                    pointerEvents="stroke"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEdge(edge);
                    }}
                  />

                  {/* Outer Filament Glow on Active Focus */}
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={edgeColor}
                    strokeWidth={isEdgeSelected ? "4" : "3"}
                    opacity="0.38"
                    strokeLinecap="round"
                  />

                  {/* Starlight Filament Core */}
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={edgeColor}
                    strokeWidth={isEdgeSelected ? "2.2" : "1.6"}
                    strokeDasharray={isDashed ? "5 3" : undefined}
                    strokeLinecap="round"
                    className={prefersReducedMotion ? "" : isEdgeSelected ? "animate-pulse" : ""}
                  />

                  {/* Midpoint Interactive Relationship Badge */}
                  <g
                    transform={`translate(${midX}, ${midY})`}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEdge(edge);
                    }}
                  >
                    <rect
                      x="-36"
                      y="-9"
                      width="72"
                      height="18"
                      rx="9"
                      fill="#030712"
                      stroke={edgeColor}
                      strokeWidth={isEdgeSelected ? "1.5" : "1"}
                      opacity="0.95"
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill={edgeColor}
                      style={{ ...monoFont, fontSize: "8.5px", fontWeight: "700" }}
                      className="pointer-events-none select-none tracking-tight uppercase"
                    >
                      {edge.type.replace("_", " ")}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* ─────────────────── 3. NODES (LUMINOUS CELESTIAL STARS) ─────────────────── */}
          <g className="nodes-layer">
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isNeighbor = activeNeighborIds.has(node.id);
              const isSearchMatch = matchedNodeIds.has(node.id);
              const isDimmed =
                Boolean(activeFocusId) && !isSelected && !isNeighbor && !isHovered && !isSearchMatch;

              const magnitude = node.magnitude ?? (node.type === "constellation" || node.type === "cosmic_entity" ? 0 : 1);
              const glowId = getGlowId(node.tone);
              const nodeColor = getNodeColor(node.tone);

              // Selective Label Visibility:
              // - Magnitude 0 anchors are permanently labeled as celestial landmarks
              // - Magnitude 1 & 2 reveal their labels on hover, focus, selection, active neighbor, or zoom >= 1.2
              const showLabel =
                magnitude === 0 ||
                isSelected ||
                isHovered ||
                isNeighbor ||
                isSearchMatch ||
                transform.scale >= 1.20;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`${node.name}, ${node.modifier}. Magnitude ${magnitude}. ${node.type}. Click or press Enter to view dossier.`}
                  onFocus={() => onHoverNode(node.id)}
                  onBlur={() => onHoverNode(null)}
                  onMouseEnter={() => onHoverNode(node.id)}
                  onMouseLeave={() => onHoverNode(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected) {
                      onSelectNode(null);
                    } else {
                      onSelectNode(node);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (isSelected) {
                        onSelectNode(null);
                      } else {
                        onSelectNode(node);
                      }
                    }
                  }}
                  className="cursor-pointer outline-none group"
                  style={{
                    opacity: isDimmed ? 0.15 : 1,
                    transition: "opacity 0.25s ease",
                  }}
                >
                  {/* Invisible generous hit zone (32px radius) for effortless click/tap */}
                  <circle r="32" fill="rgba(0,0,0,0.001)" pointerEvents="all" className="cursor-pointer" />

                  {/* Search Match Luminous Pulse Halo */}
                  {isSearchMatch && (
                    <circle
                      r={magnitude === 0 ? 28 : 22}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.2"
                      opacity="0.8"
                      className={prefersReducedMotion ? "" : "animate-pulse"}
                    />
                  )}

                  {/* Active Selected / Hovered Brilliant Celestial Corona */}
                  {(isSelected || isHovered) && (
                    <circle
                      r={magnitude === 0 ? 32 : 24}
                      fill={`url(#${glowId})`}
                      opacity="0.60"
                      className={prefersReducedMotion ? "" : "animate-pulse"}
                    />
                  )}

                  {/* Accessible Keyboard Focus Ring (WCAG 2.2 AA - only visible on :focus-visible) */}
                  <circle
                    r={magnitude === 0 ? 24 : 18}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                    className="opacity-0 group-focus-visible:opacity-100 transition-opacity"
                  />

                  {/* Radiant 8-Point Optical Telescope Diffraction Rays on Selection */}
                  {isSelected && (
                    <g className={prefersReducedMotion ? "" : "animate-pulse"}>
                      {/* Major horizontal & vertical rays */}
                      <line x1="-36" y1="0" x2="36" y2="0" stroke="url(#diffraction-ray-h)" strokeWidth="1.1" />
                      <line x1="0" y1="-36" x2="0" y2="36" stroke="url(#diffraction-ray-v)" strokeWidth="1.1" />
                      {/* Diagonal secondary rays */}
                      <line x1="-20" y1="-20" x2="20" y2="20" stroke="url(#diffraction-ray-h)" strokeWidth="0.6" opacity="0.7" />
                      <line x1="-20" y1="20" x2="20" y2="-20" stroke="url(#diffraction-ray-h)" strokeWidth="0.6" opacity="0.7" />
                    </g>
                  )}

                  {/* ── MAGNITUDE 0: Supergiant Anchor Star (Kim Dokja, Yoo Joonghyuk, Uriel, Wukong, Plotter, Oldest Dream) ── */}
                  {magnitude === 0 && (
                    <g>
                      {/* Outer Soft Light Halo */}
                      <circle
                        r="20"
                        fill={`url(#${glowId})`}
                        opacity={isSelected || isHovered ? 1 : 0.8}
                      />
                      {/* Inner Starlight Corona */}
                      <circle
                        r="8.5"
                        fill={`url(#${glowId})`}
                        opacity="0.95"
                      />

                      {/* Subtle Optical Rays on resting Magnitude 0 anchors */}
                      {!isSelected && (
                        <>
                          <line x1="-18" y1="0" x2="18" y2="0" stroke="url(#diffraction-ray-h)" strokeWidth="0.7" />
                          <line x1="0" y1="-18" x2="0" y2="18" stroke="url(#diffraction-ray-v)" strokeWidth="0.7" />
                        </>
                      )}

                      {/* Luminous Star Core */}
                      <circle r="4" fill={nodeColor} />
                      {/* Pure White Stellar Pinpoint */}
                      <circle r="2" fill="#ffffff" />
                    </g>
                  )}

                  {/* ── MAGNITUDE 1: Major Constellation Star (Han Sooyoung, Jung Heewon, Yoo Sangah, Black Flame Dragon, Olympus, Abaddon) ── */}
                  {magnitude === 1 && (
                    <g>
                      {/* Outer Soft Light Aura */}
                      <circle
                        r="14"
                        fill={`url(#${glowId})`}
                        opacity={isSelected || isHovered ? 0.95 : 0.65}
                      />

                      {/* Optical Rays appear selectively on hover */}
                      {isHovered && !isSelected && (
                        <>
                          <line x1="-16" y1="0" x2="16" y2="0" stroke="url(#diffraction-ray-h)" strokeWidth="0.6" />
                          <line x1="0" y1="-16" x2="0" y2="16" stroke="url(#diffraction-ray-v)" strokeWidth="0.6" />
                        </>
                      )}

                      {/* Radiant Star Core */}
                      <circle r="3" fill={nodeColor} />
                      {/* White Stellar Pinpoint */}
                      <circle r="1.4" fill="#ffffff" />
                    </g>
                  )}

                  {/* ── MAGNITUDE 2: Beacon / Companion Star (Lee Hyunsung, Lee Jihye, Lee Gilyoung, Shin Yoosung, Master of Steel, Maritime War God) ── */}
                  {magnitude === 2 && (
                    <g>
                      {/* Outer Delicate Halo */}
                      <circle
                        r="9"
                        fill={`url(#${glowId})`}
                        opacity={isSelected || isHovered ? 0.9 : 0.55}
                      />

                      {/* Subtle Rays on hover */}
                      {isHovered && !isSelected && (
                        <>
                          <line x1="-12" y1="0" x2="12" y2="0" stroke="url(#diffraction-ray-h)" strokeWidth="0.5" />
                          <line x1="0" y1="-12" x2="0" y2="12" stroke="url(#diffraction-ray-v)" strokeWidth="0.5" />
                        </>
                      )}

                      {/* Radiant Core */}
                      <circle r="2.2" fill={nodeColor} />
                      {/* Pure White Pinpoint */}
                      <circle r="1.1" fill="#ffffff" />
                    </g>
                  )}

                  {/* Progressive Starlight Label */}
                  {showLabel && (
                    <g
                      transform={`translate(0, ${magnitude === 0 ? 18 : 14})`}
                      className="pointer-events-none select-none transition-opacity duration-200"
                    >
                      <text
                        x="0"
                        y="0"
                        textAnchor="middle"
                        fill={isSelected ? "#ffffff" : isHovered ? "#e0f2fe" : "#f1f5f9"}
                        filter="url(#label-shadow)"
                        style={{
                          ...(magnitude === 0 ? serifFont : uiFont),
                          fontSize: magnitude === 0 ? "13px" : "11px",
                          fontWeight: magnitude === 0 ? "500" : "500",
                          letterSpacing: magnitude === 0 ? "0.02em" : "0",
                        }}
                      >
                        {node.name}
                      </text>

                      {/* Small Subtitle for selected or hovered star */}
                      {(isSelected || isHovered) && (
                        <text
                          x="0"
                          y="11"
                          textAnchor="middle"
                          fill={nodeColor}
                          filter="url(#label-shadow)"
                          style={{ ...monoFont, fontSize: "8.5px", fontWeight: "600" }}
                          className="uppercase tracking-wider"
                        >
                          {node.modifierSpoiler && !spoilerUnlocked
                            ? "[Redacted]"
                            : node.modifier.length > 20
                            ? `${node.modifier.substring(0, 18)}…`
                            : node.modifier}
                        </text>
                      )}
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Floating Canvas Controls HUD (NASA Eyes / Zenith style) */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 p-1.5 rounded-xl bg-[#030712]/85 backdrop-blur-md border border-[#38bdf8]/20 shadow-2xl">
        <button
          type="button"
          onClick={() => handleZoom(0.18)}
          aria-label="Zoom in relationship network"
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
        >
          <ZoomIn size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleZoom(-0.18)}
          aria-label="Zoom out relationship network"
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
        >
          <ZoomOut size={15} />
        </button>
        <div className="w-[1px] h-4 bg-white/15 my-auto" />
        <button
          type="button"
          onClick={centerView}
          aria-label="Reset and center observatory view"
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
          title="Reset & Center View"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Integrated Astronomical HUD Legend (Stellarium magnitude reference & connection types) */}
      <div className="hidden sm:flex absolute bottom-4 right-4 z-20 items-center gap-4 px-3.5 py-1.5 rounded-xl bg-[#030712]/85 backdrop-blur-md border border-white/10 text-[10px] text-slate-400 font-mono shadow-2xl">
        <div className="flex items-center gap-1.5">
          <Sparkles size={11} className="text-[#38bdf8]" />
          <span>Mag 0 (Anchor)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span>Mag 1 (Major)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-slate-400" />
          <span>Mag 2 (Beacon)</span>
        </div>
        <div className="w-[1px] h-3 bg-white/15 my-auto" />
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-3 border-t-2 border-dashed border-[#82b1ff]" />
          <span>Chart Guide (Atlas)</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-300">
          <span className="w-3 h-0.5 bg-amber-400 rounded-full" />
          <span>Canon Bond (On Select)</span>
        </div>
        <div className="w-[1px] h-3 bg-white/15 my-auto" />
        <div className="flex items-center gap-1.5 text-cyan-400">
          <Compass size={11} className="text-cyan-400" />
          <span>Click Star to Reveal Bonds</span>
        </div>
      </div>
    </div>
  );
}

export { ObservatoryCanvas };
