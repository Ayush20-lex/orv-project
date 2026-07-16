"use client";

import React from "react";
import { motion } from "framer-motion";

const displayFont = { fontFamily: "Outfit, sans-serif" };
const uiFont = { fontFamily: "Inter, sans-serif" };

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070d]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-sky-400/20 absolute inset-0 animate-ping" />
          <div className="w-12 h-12 rounded-full border-2 border-sky-400/40 absolute inset-0 animate-spin" style={{ animationDuration: "3s" }} />
          <div className="w-12 h-12 rounded-full border-2 border-t-sky-400 border-r-transparent border-b-transparent border-l-transparent absolute inset-0 animate-spin" style={{ animationDuration: "1s" }} />
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          </div>
        </div>
        
        <div className="text-center">
          <motion.p 
            style={{ ...uiFont }} 
            className="text-sky-300 text-xs font-bold uppercase tracking-[0.3em] mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            [ Connecting to Star Stream ]
          </motion.p>
          <p style={{ ...displayFont }} className="text-[#5c6272] text-[10px] tracking-widest">
            Synchronizing data with the constellations...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
