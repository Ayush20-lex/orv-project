"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 0, 1, 1], 
        x: [ -15, 10, -5, 0, 0 ],
        filter: [
          "brightness(3) contrast(1.5) hue-rotate(90deg) blur(2px)",
          "brightness(1.5) contrast(1.2) hue-rotate(-20deg) blur(0px)",
          "brightness(2) contrast(1.5) hue-rotate(40deg) blur(1px)",
          "brightness(1) contrast(1) hue-rotate(0deg) blur(0px)",
          "none"
        ]
      }}
      transition={{ 
        duration: 0.5, 
        times: [0, 0.15, 0.3, 0.45, 1],
        ease: "easeInOut"
      }}
      onAnimationComplete={() => setIsAnimating(false)}
      style={{ 
        willChange: isAnimating ? "filter, transform" : "auto",
        transform: isAnimating ? undefined : "none"
      }}
    >
      {children}
    </motion.div>
  );
}
