"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { Download, Sparkles, ChevronRight } from "lucide-react";
import { COLORS, uiFont, displayFont } from "../../components/home/shared";
import StatCard from "../../components/builder/stat-card";

const QUIZ_QUESTIONS = [
  {
    question: "You find a coin on the ground in the middle of a destroyed city. What do you do?",
    answers: [
      { text: "Pocket it. Every coin counts.", points: { tone: "icy", str: 10, agi: 10, end: 10, mana: 5 } },
      { text: "Throw it at a monster as a distraction.", points: { tone: "blood", str: 20, agi: 15, end: 5, mana: 0 } },
      { text: "Examine it to see if the Constellations are watching.", points: { tone: "gold", str: 5, agi: 5, end: 10, mana: 20 } },
    ]
  },
  {
    question: "Your companion is injured and slowing you down. The scenario ends in 5 minutes.",
    answers: [
      { text: "Carry them. We survive together.", points: { tone: "icy", str: 25, agi: 5, end: 30, mana: 10 } },
      { text: "Leave them. The weak die.", points: { tone: "blood", str: 30, agi: 20, end: 5, mana: 5 } },
      { text: "Use them as bait to complete the hidden scenario.", points: { tone: "gold", str: 10, agi: 30, end: 10, mana: 25 } },
    ]
  },
  {
    question: "A Constellation offers you their sponsorship, but demands absolute obedience.",
    answers: [
      { text: "Accept. Survival is everything.", points: { tone: "gold", str: 15, agi: 10, end: 15, mana: 40 } },
      { text: "Refuse. I am my own master.", points: { tone: "blood", str: 40, agi: 20, end: 20, mana: 5 } },
      { text: "Negotiate for a better contract.", points: { tone: "icy", str: 10, agi: 25, end: 10, mana: 30 } },
    ]
  }
];

const MODIFIERS = [
  "[Wanderer of the Forgotten Realm]",
  "[Seeker of the Hidden Truth]",
  "[Survivor of the First Nightmare]",
  "[Architect of Ruin]",
  "[Reader of Destiny]",
  "[Blade of the Nameless]",
];

const ATTRIBUTES = [
  "Scenario Interpreter (Rare)",
  "Lone Survivor (General)",
  "Desperate Gambler (Rare)",
  "Avenger (Hero)",
  "Silent Observer (Myth)",
];

const SPONSORS = [
  "None (Independent)",
  "Abyssal Black Flame Dragon",
  "Demon-like Judge of Fire",
  "Prisoner of the Golden Headband",
  "Secretive Plotter",
  "Master of Steel",
];

const SKILLS = [
  "Lie Detection, Danger Sense",
  "Weapon Mastery, Ghost Walk",
  "Diverse Communication, Taming",
  "Fourth Wall, Reading Comprehension",
  "Instant Kill, Acceleration",
];

export default function BuilderPage() {
  const [step, setStep] = useState(0); // 0 = Name, 1-3 = Quiz, 4 = Result
  const [name, setName] = useState("");
  const [scores, setScores] = useState<any>({ icy: 0, blood: 0, gold: 0, str: 10, agi: 10, end: 10, mana: 10 });
  const [result, setResult] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) setStep(1);
  };

  const handleAnswer = (points: any) => {
    setScores((prev: any) => ({
      icy: prev.icy + (points.tone === "icy" ? 1 : 0),
      blood: prev.blood + (points.tone === "blood" ? 1 : 0),
      gold: prev.gold + (points.tone === "gold" ? 1 : 0),
      str: prev.str + points.str,
      agi: prev.agi + points.agi,
      end: prev.end + points.end,
      mana: prev.mana + points.mana,
    }));

    if (step < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      generateStats();
    }
  };

  const generateStats = () => {
    const dominantTone = Object.keys(scores).filter(k => ["icy", "blood", "gold"].includes(k)).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    // Slight randomization for flavor
    const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
    
    setResult({
      name: name,
      tone: dominantTone,
      modifier: randomItem(MODIFIERS),
      sponsor: randomItem(SPONSORS),
      personalAttribute: randomItem(ATTRIBUTES),
      exclusiveSkills: randomItem(SKILLS),
      stigma: "Unknown",
      stats: `STR: ${scores.str} | AGI: ${scores.agi} | END: ${scores.end} | Mana: ${scores.mana}`
    });
    setStep(4);
  };

  const downloadImage = () => {
    if (cardRef.current === null) return;
    toPng(cardRef.current, { cacheBust: true, style: { background: "#05070d" } })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `star-stream-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error("Oops, something went wrong!", err));
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center" style={{ background: COLORS.abyss }}>
      <header className="mb-12 text-center max-w-2xl mx-auto">
        <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-4">
          [ System // Incarnation Registration ]
        </p>
        <h1 style={{ ...displayFont, color: "#eef2fb" }} className="text-4xl md:text-5xl font-black mb-4">
          Enter the Star Stream
        </h1>
        <p style={{ ...uiFont, color: "#5c6272" }} className="text-sm leading-relaxed">
          The scenarios are beginning. Answer the Dokkaebi's questions to determine your attributes and generate your official System Window stat card.
        </p>
      </header>

      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.form
              key="step-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleStart}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
            >
              <label style={{ ...uiFont, color: "#8a93a8" }} className="block text-xs uppercase tracking-widest font-bold mb-3">
                Incarnation Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                required
                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#82b1ff] transition-colors mb-6 font-medium"
              />
              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                style={{ background: COLORS.icy, color: "#000" }}
              >
                <span style={{ ...uiFont }} className="font-bold uppercase tracking-wider relative z-10">
                  Begin Scenario
                </span>
                <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          )}

          {step > 0 && step <= QUIZ_QUESTIONS.length && (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
            >
              <p style={{ ...uiFont, color: COLORS.icy }} className="text-[10px] uppercase font-bold tracking-widest mb-4">
                Question {step} of {QUIZ_QUESTIONS.length}
              </p>
              <h3 style={{ ...displayFont, color: "#eef2fb" }} className="text-xl font-bold mb-8 leading-relaxed">
                {QUIZ_QUESTIONS[step - 1].question}
              </h3>
              
              <div className="space-y-4">
                {QUIZ_QUESTIONS[step - 1].answers.map((answer, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(answer.points)}
                    className="w-full text-left p-4 rounded-lg border border-white/10 bg-black/40 hover:bg-white/10 hover:border-white/30 transition-all text-[#b8bfcc] hover:text-white"
                  >
                    <span style={{ ...uiFont }} className="text-sm">{answer.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              {/* @ts-ignore - JS Component used in TS file */}
              <StatCard data={result} ref={cardRef} />
              
              <button
                onClick={downloadImage}
                className="mt-8 px-8 py-4 rounded-lg flex items-center gap-3 transition-all hover:scale-105"
                style={{ background: COLORS.icy, color: "#000" }}
              >
                <Download size={18} />
                <span style={{ ...uiFont }} className="font-bold uppercase tracking-wider">
                  Save Record
                </span>
              </button>
              
              <button 
                onClick={() => { setStep(0); setName(""); setScores({ icy: 0, blood: 0, gold: 0, str: 10, agi: 10, end: 10, mana: 10 }); }}
                className="mt-4 text-[#8a93a8] hover:text-white text-xs uppercase tracking-widest transition-colors font-medium"
              >
                Start Over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
