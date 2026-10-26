import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
const StarOrbCanvas = dynamic(() => import("../star-orb"), { ssr: false, loading: () => null });

import { COLORS, displayFont, serifFont, uiFont } from "./shared";

export default function StarStreamSection() {
  return (
    <section
      id="star-stream"
      className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24"
      style={{ background: "linear-gradient(180deg, #05060a 0%, rgba(5,7,13,0.95) 12%, rgba(5,7,13,0.98) 100%)" }}
    >
      {/* 3D Orb */}
      <motion.div
        className="w-full lg:w-[48%] shrink-0 flex items-center justify-center"
        style={{ height: "min(70vw, 520px)" }}
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <StarOrbCanvas className="w-full h-full" />
      </motion.div>

      {/* Text */}
      <motion.div
        className="flex-1 max-w-lg"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay: 0.2 }}
      >
        <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-4">
          [ Star Stream // Simulated Channel Feed #8612 ]
        </p>
        <h2 style={{ ...serifFont, color: "#eef2fb" }} className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.1] mb-6">
          A Story That<br />
          <span className="italic">Became Reality.</span>
        </h2>
        <p style={{ ...uiFont, color: "#8a94a6" }} className="text-sm sm:text-[15px] leading-[1.9] mb-10">
          On an ordinary evening on Seoul Subway Line 3, the free service of the world ended. The Dokkaebi arrived, and humanity was thrust into the brutal survival scenarios of the Star Stream. The Constellations—ancient entities in the cosmic night sky—watch every choice from their nebulae, sponsoring those who entertain them with coins and probability. 1,863 regressions tried to reach the end alone; this time, a reader intends to change the ending.
        </p>

        {/* Fictional Telemetry Section */}
        <div className="mb-2">
          <p style={{ color: "#64748b" }} className="text-[9px] uppercase tracking-wider mb-2 font-mono">
            ◈ Simulated Broadcast Telemetry
          </p>
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { label: "Active Scenarios", value: "1,647" },
              { label: "Constellations", value: "1,204" },
              { label: "Coins Circulating", value: "88,451" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg px-3 py-3 text-center"
                style={{ background: "rgba(130,177,255,0.04)", border: `1px solid ${COLORS.panelEdge}` }}
              >
                <p style={{ ...displayFont, color: COLORS.icy }} className="text-lg sm:text-2xl font-bold">{value}</p>
                <p style={{ ...uiFont, color: "#8a94a6" }} className="text-[9px] mt-1 uppercase tracking-wide leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/constellations"
          className="inline-flex items-center gap-2 group transition-all"
        >
          <span style={{ ...uiFont, color: COLORS.icy }} className="text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
            View Constellations
          </span>
          <ArrowRight size={14} color={COLORS.icy} className="group-hover:translate-x-1 group-hover:text-white transition-all" />
        </Link>
      </motion.div>
    </section>
  );
}