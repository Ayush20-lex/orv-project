"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const [isAnimating, setIsAnimating] = useState(!shouldReduceMotion);

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.25, 
        ease: "easeOut"
      }}
      onAnimationComplete={() => setIsAnimating(false)}
      style={{ 
        willChange: isAnimating ? "opacity, transform" : "auto",
        transform: isAnimating ? undefined : "none"
      }}
    >
      {children}
    </motion.div>
  );
}

