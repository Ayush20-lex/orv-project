const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/star-stream-landing.jsx');
const content = fs.readFileSync(filePath, 'utf8');

// Helper to extract a function component
function extractFunction(name, content) {
    const regex = new RegExp(`function ${name}\\(.*?\\)\\s*{[\\s\\S]*?\\n}`);
    const match = content.match(regex);
    if (!match) {
      // Try to find it matching curly braces manually if regex fails
      const startIdx = content.indexOf(`function ${name}(`);
      if (startIdx === -1) return null;
      let openBraces = 0;
      let endIdx = -1;
      let started = false;
      for (let i = startIdx; i < content.length; i++) {
          if (content[i] === '{') {
              openBraces++;
              started = true;
          }
          if (content[i] === '}') {
              openBraces--;
              if (started && openBraces === 0) {
                  endIdx = i;
                  break;
              }
          }
      }
      if (endIdx !== -1) {
          return content.substring(startIdx, endIdx + 1);
      }
    }
    return match ? match[0] : null;
}

const components = [
    'SystemWindowModal',
    'Hero',
    'StarStreamSection',
    'ProtagonistSection',
    'CompanionsGrid',
    'QuotesSection',
    'Starfield',
    'GlitchTitle',
    'BracketedLine',
    'AttributesTab',
    'ScenariosTab',
    'CompanionsTab'
];

const extracted = {};
components.forEach(comp => {
    extracted[comp] = extractFunction(comp, content);
});

// Extract constants/hooks
const constantsRegex = /const COLORS = [\s\S]*?};\n\nconst displayFont[\s\S]*?const chatFont[\s\S]*?;/m;
const constants = content.match(constantsRegex)[0];

const dataRegex = /const COMPANION_CARDS = [\s\S]*?];\n\nconst ORV_QUOTES = [\s\S]*?];/m;
const data = content.match(dataRegex)[0];

// Create home directory
const homeDir = path.join(__dirname, 'components/home');
if (!fs.existsSync(homeDir)) {
    fs.mkdirSync(homeDir, { recursive: true });
}

// Generate files
const imports = `import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Skull, Swords, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
const StarOrbCanvas = dynamic(() => import("../star-orb"), { ssr: false, loading: () => null });\n\n`;

// Shared file
fs.writeFileSync(path.join(__dirname, 'components/home/shared.js'), `${constants}\n\n${data}\n\n${extracted.Starfield}\n\n${extracted.GlitchTitle}\n\n${extracted.BracketedLine}\n\nexport { COLORS, displayFont, uiFont, chatFont, COMPANION_CARDS, ORV_QUOTES, Starfield, GlitchTitle, BracketedLine };`);

// Hero
fs.writeFileSync(path.join(__dirname, 'components/home/hero-section.jsx'), `${imports}import { COLORS, displayFont, uiFont, Starfield, GlitchTitle } from "./shared";\n\nexport default ${extracted.Hero}`);

// StarStream
fs.writeFileSync(path.join(__dirname, 'components/home/star-stream-section.jsx'), `${imports}import { COLORS, displayFont, uiFont } from "./shared";\n\nexport default ${extracted.StarStreamSection}`);

// Protagonist
fs.writeFileSync(path.join(__dirname, 'components/home/protagonist-section.jsx'), `${imports}import { COLORS, displayFont, uiFont, BracketedLine } from "./shared";\n\nexport default ${extracted.ProtagonistSection}`);

// Companions Grid
fs.writeFileSync(path.join(__dirname, 'components/home/companions-grid.jsx'), `${imports}import { COLORS, displayFont, uiFont, BracketedLine, COMPANION_CARDS } from "./shared";\n\nexport default ${extracted.CompanionsGrid}`);

// Quotes
fs.writeFileSync(path.join(__dirname, 'components/home/quotes-section.jsx'), `${imports}import { COLORS, displayFont, uiFont, ORV_QUOTES } from "./shared";\n\nexport default ${extracted.QuotesSection}`);

console.log('Extraction complete.');
