"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const COLORS = {
  abyss: "#05070d",
  icy: "#82b1ff",
  blood: "#ff4d4d",
  gold: "#ffca28",
  dim: "#3d4353",
  panelEdge: "rgba(130, 177, 255, 0.12)",
};

const displayFont = { fontFamily: "Outfit, sans-serif" };
const uiFont = { fontFamily: "Inter, sans-serif" };

const CHARACTERS = [
  {
    id: "kim-dokja",
    name: "Kim Dokja",
    title: "The Sole Reader",
    modifier: "[Demon King of Salvation]",
    sponsor: "None (Independent)",
    personalAttribute: "Eight Lives (Hero), Scenario Interpreter",
    exclusiveSkills: "Omniscient Reader's Viewpoint, Bookmark, Fourth Wall",
    stigma: "Bookmark, Omniscient Reader's Viewpoint",
    stats: "STR: 62 | AGI: 58 | END: 71 | Mana: 45",
    description: "An ordinary office worker who was the sole reader of the web novel 'Three Ways to Survive in a Ruined World' for over ten years. When the apocalypse suddenly turns the world into the exact setting of the novel, he uses his exclusive knowledge to survive, manipulate the scenarios, and save his companions. Known for his self-sacrificial tendencies and deceptive strategies.",
    tone: "icy",
    image: "/images/kim-dokja-potrait2.jpg",
  },
  {
    id: "yoo-joonghyuk",
    name: "Yoo Joonghyuk",
    title: "The Regressor",
    modifier: "[Supreme King]",
    sponsor: "None (Independent)",
    personalAttribute: "Regressor (3rd Turn), Pro Gamer",
    exclusiveSkills: "Sage's Eye, Hand to Hand Combat",
    stigma: "Regression",
    stats: "STR: 99 | AGI: 99 | END: 99 | Mana: 99",
    description: "The protagonist of the original novel, a regressor trapped in an endless cycle of repeating his life after death. After 1,863 iterations of immense suffering and loss, his personality has become cold and ruthless. However, beneath his hardened exterior lies a desperate desire to reach the end of the scenarios and protect his true companions.",
    tone: "blood",
    image: "/images/yoo-joonghyuk.jpg",
  },
  {
    id: "han-sooyoung",
    name: "Han Sooyoung",
    title: "The Plagiarist",
    modifier: "[Director of the False Last Act]",
    sponsor: "Abyssal Black Flame Dragon",
    personalAttribute: "Author (Rare), Specialized Plagiarist",
    exclusiveSkills: "Avatar, Lie Detection",
    stigma: "Avatar",
    stats: "STR: 35 | AGI: 60 | END: 40 | Mana: 85",
    description: "A genius writer who authored 'SSSSS-grade Infinite Regressor', which heavily plagiarized Kim Dokja's favorite novel. Sharp, cynical, and incredibly intelligent, she often acts as the brain of Kim Dokja's Company when he is absent. Despite her selfish facade, she proves to be one of the most fiercely loyal and irreplaceable companions.",
    tone: "gold",
    image: "/images/han-sooyoung.jpg",
  },
  {
    id: "yoo-sangah",
    name: "Yoo Sangah",
    title: "The Successor of Olympus",
    modifier: "[Moonlight Empress]",
    sponsor: "Olympus Nebula",
    personalAttribute: "Interpreter (Rare)",
    exclusiveSkills: "Interpretation, Hermes' Walking Method",
    stigma: "Thread of Fate, Hermes' Walk",
    stats: "STR: 45 | AGI: 75 | END: 50 | Mana: 80",
    description: "Kim Dokja's former colleague from Mino Soft. She was considered a flawless 'perfect employee' before the apocalypse. To everyone's surprise, she adapts to the ruined world faster than anyone, utilizing her intelligence and language skills to navigate complex scenarios. She eventually walks the path of the Successor of Olympus, wielding the threads of fate.",
    tone: "icy",
    image: "/images/yoo-sangah.jpg",
  },
  {
    id: "lee-hyunsung",
    name: "Lee Hyunsung",
    title: "The Steel Sword",
    modifier: "[Master of Steel]",
    sponsor: "Master of Steel",
    personalAttribute: "Soldier (General)",
    exclusiveSkills: "Bayonet Charge, Weapons Training",
    stigma: "Great Mountain Smash",
    stats: "STR: 90 | AGI: 40 | END: 95 | Mana: 20",
    description: "A former army lieutenant whose unwavering loyalty and strong moral compass make him the 'Steel Sword' of the party. He struggles with the trauma of losing his former squad but finds a new purpose in protecting Kim Dokja's Company. He is the ultimate shield, repeatedly putting himself in harm's way for his comrades.",
    tone: "icy",
    image: "/images/lee-hyunsung.jpg",
  },
  {
    id: "jung-heewon",
    name: "Jung Heewon",
    title: "The Sword of Judgment",
    modifier: "[Judge of Fire]",
    sponsor: "Demon-like Judge of Fire (Uriel)",
    personalAttribute: "Crouching Figure (Rare), Judge of Destruction",
    exclusiveSkills: "Kendo, Demon Slaying",
    stigma: "Hellfire, Judgment Time",
    stats: "STR: 85 | AGI: 80 | END: 70 | Mana: 60",
    description: "A woman who suffered terrible injustices early in the scenarios before being saved by Kim Dokja. She awakens as the 'Sword of Judgment', wielding hellfire to incinerate evil. She becomes the absolute strongest physical combatant in the party next to Yoo Joonghyuk, known for her straightforward personality and zero tolerance for injustice.",
    tone: "blood",
    image: "/images/jung-heewon.jpg",
  },
  {
    id: "lee-jihye",
    name: "Lee Jihye",
    title: "The Naval Commander",
    modifier: "[Maritime War God's Incarnation]",
    sponsor: "Maritime War God",
    personalAttribute: "Scarred Sword Demon",
    exclusiveSkills: "Sword Training, Ghost Walk",
    stigma: "Ghost Fleet, Sword Training",
    stats: "STR: 75 | AGI: 85 | END: 60 | Mana: 50",
    description: "A fierce high school student and Yoo Joonghyuk's disciple. She carries the immense psychological burden of having killed her best friend to survive the very first scenario. Mentored by the Maritime War God, she commands ghost fleets and battleships. She acts tough and impulsive but deeply cares for her found family.",
    tone: "icy",
    image: "/images/lee-jihye.jpg",
  },
  {
    id: "lee-gilyoung",
    name: "Lee Gilyoung",
    title: "The Insect Boy",
    modifier: "[Ruler of Insects]",
    sponsor: "Ruler of Insects",
    personalAttribute: "Insect Collector",
    exclusiveSkills: "Diverse Communication",
    stigma: "Communication with Insects",
    stats: "STR: 30 | AGI: 50 | END: 25 | Mana: 60",
    description: "A young boy who lost his mother in the first scenario. Finding solace in insects rather than humans, he bonds with Kim Dokja, viewing him as a savior and father figure. He possesses terrifying potential through his connection to insect rulers and the Abyssal Black Flame Dragon, and will fiercely attack anyone who threatens Dokja.",
    tone: "blood",
    image: "/images/lee-gilyoung.jpg",
  },
  {
    id: "shin-yoosung",
    name: "Shin Yoosung",
    title: "Beast Tamer",
    modifier: "[Beast King's Incarnation]",
    sponsor: "Demon King of Salvation",
    personalAttribute: "Beast Tamer (Rare)",
    exclusiveSkills: "Taming, Diverse Communication",
    stigma: "Taming",
    stats: "STR: 25 | AGI: 45 | END: 20 | Mana: 75",
    description: "Kim Dokja's designated incarnation. Originally destined to become a catastrophic beast in the original novel, Dokja alters her fate and takes her under his wing. She possesses the rare ability to communicate with and tame monsters. Carrying a heavy destiny, she is deeply attached to her sponsor and grows into a remarkably mature survivor.",
    tone: "gold",
    image: "/images/shin-yoosung.jpg",
  }
];

export default function CharactersPage() {
  const [selectedChar, setSelectedChar] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getToneColor = (tone: string) => {
    if (tone === "blood") return COLORS.blood;
    if (tone === "gold") return COLORS.gold;
    return COLORS.icy;
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-10 lg:px-16" style={{ background: COLORS.abyss }}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <p style={{ ...uiFont, color: COLORS.icy, letterSpacing: "0.2em" }} className="text-[10px] uppercase mb-4">
            [ System // Encyclopedia ]
          </p>
          <h1 style={{ ...displayFont, color: "#eef2fb" }} className="text-4xl sm:text-5xl font-black mb-4">
            Dramatis Personae
          </h1>
          <p style={{ ...uiFont, color: "#5c6272" }} className="max-w-2xl text-sm leading-[1.8]">
            The incarnations and readers who shape the Star Stream. Each character carries a story, a modifier, and the weight of the scenarios.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHARACTERS.map((char) => {
            const color = getToneColor(char.tone);
            return (
              <motion.div
                key={char.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedChar(char)}
                className="group cursor-pointer rounded-xl overflow-hidden relative"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}22` }}
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-black/50">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100"
                    style={{ backgroundImage: `url(${char.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p style={{ ...uiFont, color: color }} className="text-[10px] font-bold uppercase tracking-widest mb-1">
                      {char.title}
                    </p>
                    <h3 style={{ ...displayFont, color: "#eef2fb" }} className="text-xl font-bold">
                      {char.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedChar && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedChar(null)}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                key="modal"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-2xl"
              >
                <div
                  className="mx-4 overflow-y-auto max-h-[90vh] rounded-2xl relative"
                  style={{ background: COLORS.abyss, border: `1px solid ${getToneColor(selectedChar.tone)}55`, boxShadow: `0 20px 40px -10px rgba(0,0,0,0.8)` }}
                >
                  <button
                    onClick={() => setSelectedChar(null)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2/5 h-48 sm:h-64 md:h-auto relative bg-black/50 shrink-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${selectedChar.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent mix-blend-overlay" />
                    </div>
                    <div className="w-full md:w-3/5 p-6 md:p-8">
                      <p style={{ ...uiFont, color: getToneColor(selectedChar.tone) }} className="text-[10px] uppercase font-bold tracking-widest mb-2">
                        [ {selectedChar.title} ]
                      </p>
                      <h2 style={{ ...displayFont, color: "#eef2fb" }} className="text-3xl font-black mb-1">
                        {selectedChar.name}
                      </h2>
                      <p style={{ ...uiFont, color: COLORS.dim }} className="text-xs mb-6 font-medium italic">
                        Modifier: {selectedChar.modifier}
                      </p>

                      <div className="space-y-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p style={{ ...uiFont, color: "#5c6272" }} className="text-[10px] uppercase tracking-wide mb-1">Sponsor</p>
                            <p style={{ ...uiFont, color: "#eef2fb" }} className="text-xs font-medium">{selectedChar.sponsor}</p>
                          </div>
                          <div>
                            <p style={{ ...uiFont, color: "#5c6272" }} className="text-[10px] uppercase tracking-wide mb-1">Attribute</p>
                            <p style={{ ...uiFont, color: "#eef2fb" }} className="text-xs font-medium">{selectedChar.personalAttribute}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p style={{ ...uiFont, color: "#5c6272" }} className="text-[10px] uppercase tracking-wide mb-1">Exclusive Skills</p>
                          <p style={{ ...uiFont, color: "#eef2fb" }} className="text-xs font-medium leading-relaxed">{selectedChar.exclusiveSkills}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                          <div>
                            <p style={{ ...uiFont, color: "#5c6272" }} className="text-[10px] uppercase tracking-wide mb-1">Stigma</p>
                            <p style={{ ...uiFont, color: "#eef2fb" }} className="text-xs font-medium">{selectedChar.stigma}</p>
                          </div>
                          <div>
                            <p style={{ ...uiFont, color: "#5c6272" }} className="text-[10px] uppercase tracking-wide mb-1">Overall Stats</p>
                            <p style={{ ...uiFont, color: getToneColor(selectedChar.tone) }} className="text-xs font-bold font-mono tracking-tight">{selectedChar.stats}</p>
                          </div>
                        </div>
                      </div>

                      <p style={{ ...uiFont, color: "#8a93a8" }} className="text-sm leading-[1.8]">
                        {selectedChar.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      , document.body)}
    </div>
  );
}
