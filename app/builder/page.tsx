"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronRight, AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";
import { COLORS, uiFont, displayFont, serifFont } from "../../components/home/shared";
import StatCard from "../../components/builder/stat-card";
import {
  INITIAL_BUILDER_SCORES,
  calculateUpdatedScores,
  generateIncarnationResult,
  type ScoreState,
  type IncarnationResult,
  type QuizAnswerPoints,
} from "@/lib/builder-scoring";

const QUIZ_QUESTIONS = [
  {
    question: "You find a coin on the ground in the middle of a destroyed city. What do you do?",
    answers: [
      { text: "Pocket it. Every coin counts.", points: { tone: "icy" as const, str: 10, agi: 10, end: 10, mana: 5 } },
      { text: "Throw it at a monster as a distraction.", points: { tone: "blood" as const, str: 20, agi: 15, end: 5, mana: 0 } },
      { text: "Examine it to see if the Constellations are watching.", points: { tone: "gold" as const, str: 5, agi: 5, end: 10, mana: 20 } },
    ]
  },
  {
    question: "Your companion is injured and slowing you down. The scenario ends in 5 minutes.",
    answers: [
      { text: "Carry them. We survive together.", points: { tone: "icy" as const, str: 25, agi: 5, end: 30, mana: 10 } },
      { text: "Leave them. The weak die.", points: { tone: "blood" as const, str: 30, agi: 20, end: 5, mana: 5 } },
      { text: "Use them as bait to complete the hidden scenario.", points: { tone: "gold" as const, str: 10, agi: 30, end: 10, mana: 25 } },
    ]
  },
  {
    question: "A Constellation offers you their sponsorship, but demands absolute obedience.",
    answers: [
      { text: "Accept. Survival is everything.", points: { tone: "gold" as const, str: 15, agi: 10, end: 15, mana: 40 } },
      { text: "Refuse. I am my own master.", points: { tone: "blood" as const, str: 40, agi: 20, end: 20, mana: 5 } },
      { text: "Negotiate for a better contract.", points: { tone: "icy" as const, str: 10, agi: 25, end: 10, mana: 30 } },
    ]
  }
];

export default function BuilderPage() {
  const [step, setStep] = useState(0); // 0 = Name, 1-3 = Quiz, 4 = Result
  const [name, setName] = useState("");
  const [scores, setScores] = useState<ScoreState>(INITIAL_BUILDER_SCORES);
  const [result, setResult] = useState<IncarnationResult | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStep(1);
    }
  };

  const handleAnswer = (points: QuizAnswerPoints) => {
    // Pure synchronous calculation ensures answer 3 is NEVER dropped
    const nextScores = calculateUpdatedScores(scores, points);
    setScores(nextScores);

    if (step < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      // Final question answered: derive result synchronously from the complete score
      const finalResult = generateIncarnationResult(name, nextScores);
      setResult(finalResult);
      setStep(4);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setName("");
    setScores(INITIAL_BUILDER_SCORES);
    setResult(null);
    setIsExporting(false);
    setExportError(null);
    setExportSuccess(false);
  };

  const downloadImage = async () => {
    if (cardRef.current === null || isExporting) return;
    setIsExporting(true);
    setExportError(null);
    setExportSuccess(false);

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        skipFonts: true,
        style: { background: "#05070d" },
      });
      const link = document.createElement("a");
      const safeName = name.trim().toLowerCase().replace(/\s+/g, "-") || "incarnation";
      link.download = `star-stream-${safeName}.png`;
      link.href = dataUrl;
      link.click();
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (err) {
      console.error("Oops, something went wrong with PNG export:", err);
      setIsExporting(false);
      setExportError("Unable to render image. Your browser may restrict canvas export. Please take a screenshot of your stat card.");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center" style={{ background: COLORS.abyss }}>
      <header className="mb-12 text-center max-w-2xl mx-auto">
        <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-4">
          [ System // Incarnation Registration ]
        </p>
        <h1 style={{ ...serifFont, color: "#eef2fb" }} className="text-4xl md:text-5xl font-normal mb-4">
          Enter the <span className="italic">Star Stream</span>
        </h1>
        <p style={{ ...uiFont, color: "#8a94a6" }} className="text-sm leading-relaxed mb-3">
          The scenarios are beginning. Answer the Dokkaebi&apos;s questions to determine your attributes and generate your official System Window stat card.
        </p>
        <p style={{ ...uiFont, color: "#94a3b8" }} className="text-xs tracking-wide uppercase font-medium">
          ※ Unofficial fan-created personality archetype simulator. Stats &amp; sponsors are thematic interpretations.
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
              <label htmlFor="incarnation-name" style={{ ...uiFont, color: "#94a3b8" }} className="block text-xs uppercase tracking-widest font-bold mb-3">
                Incarnation Name
              </label>
              <input
                id="incarnation-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                required
                maxLength={40}
                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#82b1ff] focus-visible:ring-2 focus-visible:ring-[#82b1ff] transition-colors mb-6 font-medium"
              />
              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
              <div className="flex items-center justify-between mb-4">
                <p style={{ ...uiFont, color: COLORS.icy }} className="text-[10px] uppercase font-bold tracking-widest">
                  Question {step} of {QUIZ_QUESTIONS.length}
                </p>
                <span style={{ ...uiFont, color: "#94a3b8" }} className="text-[11px] font-mono">
                  {Math.round((step / QUIZ_QUESTIONS.length) * 100)}% Synchronized
                </span>
              </div>
              <h3 style={{ ...displayFont, color: "#eef2fb" }} className="text-xl font-bold mb-8 leading-relaxed">
                {QUIZ_QUESTIONS[step - 1].question}
              </h3>

              <div className="space-y-4">
                {QUIZ_QUESTIONS[step - 1].answers.map((answer, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnswer(answer.points)}
                    className="w-full text-left p-4 rounded-lg border border-white/10 bg-black/40 hover:bg-white/10 hover:border-white/30 transition-all text-[#cbd5e1] hover:text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
                  >
                    <span style={{ ...uiFont }} className="text-sm block">{answer.text}</span>
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

              {exportError && (
                <div className="mt-4 p-3 rounded-lg bg-red-950/60 border border-red-500/50 flex items-center gap-2 text-xs text-red-200">
                  <AlertCircle size={16} className="text-red-400 shrink-0" />
                  <span>{exportError}</span>
                </div>
              )}

              {exportSuccess && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 flex items-center gap-2 text-xs text-emerald-200">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>System record image saved to downloads!</span>
                </div>
              )}

              <button
                type="button"
                onClick={downloadImage}
                disabled={isExporting}
                className="mt-8 px-8 py-4 rounded-lg flex items-center gap-3 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                style={{ background: COLORS.icy, color: "#000" }}
              >
                <Download size={18} />
                <span style={{ ...uiFont }} className="font-bold uppercase tracking-wider">
                  {isExporting ? "Rendering Record..." : "Save Record (PNG)"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                className="mt-4 text-[#94a3b8] hover:text-white text-xs uppercase tracking-widest transition-colors font-medium flex items-center gap-1.5 cursor-pointer py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82b1ff]"
              >
                <RotateCcw size={14} />
                <span>Restart Registration</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
