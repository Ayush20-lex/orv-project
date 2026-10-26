/**
 * Star Stream — Constellation Data Model & Night Sky Registry
 *
 * Source Edition:
 * Munpia Original Web Serial / Webnovel Official English Translation
 * (Authors: Sing Shong, English Translation: RainbowTurtle & A_Passing_Wanderer, 551 Chapters).
 *
 * Details the cosmic watchers, their broadcast logs, nebulae,
 * and verified canon citations.
 */

import { type CanonVerificationStatus, type SpoilerLevel } from "./characters";

export interface ConstellationRecord {
  id: string;
  modifier: string;
  trueName: string;
  trueNameSpoiler: boolean;
  nebula: string;
  theme: string;
  description: string;
  messages: string[];
  canonStatus: CanonVerificationStatus;
  chapterCitation: string;
  spoilerLevel: SpoilerLevel;
  imageUrl?: string;
  imageAttribution?: {
    illustrator: string;
    source: string;
    usageNotes: string;
    sourceClassification?: string;
    licenseType?: string;
    reuseStatus?: string;
  };
}

export const CONSTELLATIONS: ConstellationRecord[] = [
  {
    id: "secretive-plotter",
    modifier: "[Secretive Plotter]",
    trueName: "??? (Concealed Cosmic Identity)",
    trueNameSpoiler: true,
    nebula: "Independent / Outer Cosmos",
    theme: "#82b1ff",
    description:
      "An enigmatic, high-ranking constellation who observes Kim Dokja from the very first scenario. Unlike nebulae that demand subservience, Secretive Plotter watches Dokja with amused curiosity, occasionally providing coins and probability support when unexpected choices defy the predetermined plot.",
    messages: [
      "[The constellation 'Secretive Plotter' is intrigued by your audacity.]",
      "[The constellation 'Secretive Plotter' is chuckling at the incarnation's choice.]",
    ],
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 2 (Subway Inquiry), Episode 80+ / Epilogue (True Identity)",
    spoilerLevel: "endgame_novel",
    imageUrl: "/images/constellations/secretive-plotter.png",
    imageAttribution: {
      illustrator: "Blackbox (Official Webnovel Illustrator)",
      source: "Omniscient Reader's Viewpoint Chapter 414 Illustration",
      usageNotes: "Official novel illustration by Blackbox. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webnovel Illustration",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
  },
  {
    id: "demon-like-judge-of-fire",
    modifier: "[Demon-like Judge of Fire]",
    trueName: "Archangel Uriel",
    trueNameSpoiler: false,
    nebula: "Eden (Absolute Good)",
    theme: "#ff4d4d",
    description:
      "One of the four Great Archangels of the Eden Nebula. Despite her fearsome celestial modifier and devastating holy Hellfire, she possesses a warm, humorous disposition and becomes an impassioned supporter of Kim Dokja's Company and their unbreakable companionship.",
    messages: [
      "[The constellation 'Demon-like Judge of Fire' is wiping her nosebleed.]",
      "[The constellation 'Demon-like Judge of Fire' strongly supports the comradeship between you and incarnation Yoo Joonghyuk!]",
    ],
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 14 (Eden Broadcast), Chapter 20 (Sponsor Contract)",
    spoilerLevel: "early_scenarios",
    imageUrl: "/images/constellations/demon-like-judge-of-fire.jpg",
    imageAttribution: {
      illustrator: "Blackbox (Official Webnovel Illustrator)",
      source: "Omniscient Reader's Viewpoint Webnovel Illustration (Munpia)",
      usageNotes: "Official webnovel art of Archangel Uriel by Blackbox. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webnovel Illustration",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
  },
  {
    id: "abyssal-black-flame-dragon",
    modifier: "[Abyssal Black Flame Dragon]",
    trueName: "Black Dragon of the Dark Abyss",
    trueNameSpoiler: false,
    nebula: "Black Cloud (Neutral Evil / Chaos)",
    theme: "#9c27b0",
    description:
      "A leader of the Black Cloud nebula known for impulsive temper tantrums, dramatic monologues, and raw destructive power. While often acting childish and edgy, this dragon is an ancient Myth-grade entity whose dark flames consume all probability.",
    messages: [
      "[The constellation 'Abyssal Black Flame Dragon' is roaring in the abyss!]",
      "[The constellation 'Abyssal Black Flame Dragon' demands blood and destruction!]",
    ],
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 2 (Subway Constellation Inquiry), Chapter 6 (Sponsor Selection)",
    spoilerLevel: "early_scenarios",
    imageUrl: "/images/constellations/abyssal-black-flame-dragon.png",
    imageAttribution: {
      illustrator: "Sleepy-C / REDICE Studio",
      source: "Omniscient Reader Webtoon (Chapter 238, Naver / Line Webtoon)",
      usageNotes: "Official webtoon art by Sleepy-C. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webtoon Adaptation Art",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
  },
  {
    id: "prisoner-of-the-golden-headband",
    modifier: "[Prisoner of the Golden Headband]",
    trueName: "Sun Wukong (Great Sage Equal to Heaven)",
    trueNameSpoiler: false,
    nebula: "Emperor / Journey to the West",
    theme: "#ffca28",
    description:
      "The legendary Stone Monkey King and Victorious Fighting Buddha. Bound by the golden circlet, he appreciates martial prowess, irreverence toward corrupt nebulae, and acts of rebellion against bureaucratic star systems.",
    messages: [
      "[The constellation 'Prisoner of the Golden Headband' is pulling out his hair in frustration.]",
      "[The constellation 'Prisoner of the Golden Headband' is satisfied with your martial arts.]",
    ],
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 2 (Subway Constellation Inquiry), Chapter 6 (Sponsor Selection)",
    spoilerLevel: "early_scenarios",
    imageUrl: "/images/constellations/prisoner-of-the-golden-headband.jpg",
    imageAttribution: {
      illustrator: "Sleepy-C / REDICE Studio",
      source: "Omniscient Reader Webtoon (Chapter 166, Naver / Line Webtoon)",
      usageNotes: "Official webtoon art of Sun Wukong by Sleepy-C. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webtoon Adaptation Art",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
  },
  {
    id: "the-oldest-dream",
    modifier: "[The Most Ancient Dream]",
    trueName: "The Oldest Dream",
    trueNameSpoiler: true,
    nebula: "Source of the Star Stream",
    theme: "#a855f7",
    description:
      "The primordial cosmic entity whose ceaseless dreaming maintains the existence and probability of the entire Star Stream. Revealed in the novel's climax as the supreme sponsor of Yoo Joonghyuk's endless regressions across 1,863 worldlines.",
    messages: [
      "[The narrative of the 'Most Ancient Dream' continues its slumber.]",
      "[A child is gazing through the train window across the cosmos.]",
    ],
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 515+ (Episode 99 / The Oldest Dream)",
    spoilerLevel: "endgame_novel",
    imageUrl: "/images/constellations/the-oldest-dream.png",
    imageAttribution: {
      illustrator: "Blackbox (Official Webnovel Illustrator)",
      source: "Omniscient Reader's Viewpoint Volume 5 Official Cover",
      usageNotes: "Official novel volume cover by Blackbox. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Published Volume Cover Art",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
  },
  {
    id: "maritime-war-god",
    modifier: "[Maritime War God]",
    trueName: "Yi Sun-sin (Duke of Loyalty and Warfare)",
    trueNameSpoiler: false,
    nebula: "Korean Peninsula Constellations",
    theme: "#38bdf8",
    description:
      "The venerable naval commander of Korea's sovereign waters. Bestows the devastating Ghost Fleet stigma upon his disciple-incarnation Lee Jihye, commanding phantom ironclad turtle ships through celestial warfare.",
    messages: [
      "[The constellation 'Maritime War God' nods gravely at the battlefield.]",
      "[The constellation 'Maritime War God' unleashes the sound of war drums.]",
    ],
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 29 (Chungmuro Station)",
    spoilerLevel: "early_scenarios",
    imageUrl: "/images/constellations/maritime-war-god.jpg",
    imageAttribution: {
      illustrator: "Official ORV Production Art",
      source: "Omniscient Reader Webtoon / Production Asset (Yi Sun-sin)",
      usageNotes: "Official character production art of the Maritime War God. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webtoon Adaptation Art",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
  },
  {
    id: "olympus-nebula",
    modifier: "[The Twelve Gods of Olympus]",
    trueName: "Olympus Nebula (Parthenon Assembly)",
    trueNameSpoiler: false,
    nebula: "Olympus",
    theme: "#818cf8",
    description:
      "One of the dominant major nebulae in the Star Stream, governing divine thunder, prophecy, and the Thread of Fate. Sponsors Yoo Sangah through Ariadne and Dionysus, maintaining vast cosmic political sway.",
    messages: [
      "[The nebula <Olympus> observes the scenario with calculated detachment.]",
      "[The lightning of Olympus crackles across the night sky.]",
    ],
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 36 (Olympus Sponsorship), Chapter 87 (Nebula Assembly)",
    spoilerLevel: "early_scenarios",
    imageUrl: "/images/constellations/olympus-nebula.png",
    imageAttribution: {
      illustrator: "Sleepy-C / REDICE Studio",
      source: "Omniscient Reader Webtoon (Chapter 87, Olympus Constellation Gathering)",
      usageNotes: "Official webtoon art of the Olympus Nebula by Sleepy-C. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webtoon Adaptation Art",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
  },
  {
    id: "master-of-steel",
    modifier: "[Master of Steel]",
    trueName: "Tin Woodman of Oz",
    trueNameSpoiler: false,
    nebula: "Independent Iron Heavens / Oz",
    theme: "#94a3b8",
    description:
      "A silent, stalwart constellation embodying metallurgical endurance and unbreakable fortitude. Bestows the Great Mountain Push and Steel Transformation stigmas to incarnation Lee Hyunsung. No standalone official humanoid illustration exists in canon; represented by the celestial star glyph.",
    messages: [
      "[The constellation 'Master of Steel' silently observes incarnation Lee Hyunsung's steadfastness.]",
    ],
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 20 (Sponsor Selection)",
    spoilerLevel: "early_scenarios",
  },
  {
    id: "ruler-of-deepest-pit",
    modifier: "[Ruler of the Deepest Pit]",
    trueName: "Abaddon (King of Locusts)",
    trueNameSpoiler: true,
    nebula: "The Deepest Pit (The Abyss)",
    theme: "#f87171",
    description:
      "The ancient Angel of the Abyss and Lord of Locusts. Speaks in a deafening buzz of a million subterranean insects and backs Lee Gilyoung's abyssal insect manipulation. Intentionally manifests without humanoid form in canon.",
    messages: [
      "[The constellation 'Ruler of the Deepest Pit' buzzes with the sound of a million wings.]",
    ],
    canonStatus: "needs_verification",
    chapterCitation: "Webnovel Chapter 469 (Sponsor Reveal - Abaddon)",
    spoilerLevel: "endgame_novel",
  },
  {
    id: "hades-father-of-rich-night",
    modifier: "[Father of the Rich Night]",
    trueName: "Hades (Lord of the Underworld)",
    trueNameSpoiler: false,
    nebula: "Underworld (Independent)",
    theme: "#c084fc",
    description:
      "The ruler of the Underworld and myth-grade constellation. Imposing, quiet, and formidable, he governs the souls of the deceased with supreme dignity and becomes an adopted father figure and crucial ally to Kim Dokja.",
    messages: [
      "[The constellation 'Father of the Rich Night' watches his adopted son with silent pride.]",
    ],
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 124+ (Underworld Scenario)",
    spoilerLevel: "early_scenarios",
    imageUrl: "/images/constellations/hades-father-of-rich-night.jpg",
    imageAttribution: {
      illustrator: "Blackbox (Official Webnovel Illustrator)",
      source: "Omniscient Reader's Viewpoint Webnovel Illustration",
      usageNotes: "Official novel illustration by Blackbox. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webnovel Illustration",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
  },
  {
    id: "persephone-queen-of-darkest-spring",
    modifier: "[Queen of the Darkest Spring]",
    trueName: "Persephone (Queen of the Underworld)",
    trueNameSpoiler: false,
    nebula: "Underworld (Independent)",
    theme: "#e879f9",
    description:
      "The Queen of the Underworld who relishes rare and fading Stories. Possesses profound foresight, a playful penchant for teasing Kim Dokja, and fierce protective maternal love for her adopted child.",
    messages: [
      "[The constellation 'Queen of the Darkest Spring' smiles mischievously at Kim Dokja.]",
    ],
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 124+ (Underworld Scenario)",
    spoilerLevel: "early_scenarios",
    imageUrl: "/images/constellations/persephone-queen-of-darkest-spring.png",
    imageAttribution: {
      illustrator: "Blackbox (Official Webnovel Illustrator)",
      source: "Omniscient Reader's Viewpoint Webnovel Illustration",
      usageNotes: "Official novel illustration by Blackbox. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webnovel Illustration",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
  },
];
