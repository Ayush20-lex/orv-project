/**
 * Star Stream — Constellation Observatory Data Model & Relationship Graph
 *
 * Source Edition:
 * Munpia Original Web Serial / Webnovel Official English Translation
 * (Authors: Sing Shong, English Translation: RainbowTurtle & A_Passing_Wanderer, 551 Chapters).
 *
 * All nodes and edges strictly enforce:
 * - Deterministic coordinates for zero-jitter layout.
 * - Semantic relationship classifications (sponsor, companion, master_disciple, alliance, rivalry, observation, cosmic_mirror).
 * - Multi-tiered spoiler levels (early_scenarios, demon_realm, endgame_novel).
 * - Exact chapter citations and canon verification flags.
 */

import { type CanonVerificationStatus, type SpoilerLevel } from "./characters";

export type ObservatoryNodeType = "incarnation" | "constellation" | "cosmic_entity" | "nebula";

export type ObservatoryRelationshipType =
  | "sponsor"
  | "companion"
  | "master_disciple"
  | "alliance"
  | "rivalry"
  | "observation"
  | "cosmic_mirror";

export interface ObservatoryNode {
  id: string;
  name: string;
  subtitle: string;
  modifier: string;
  modifierSpoiler?: boolean;
  type: ObservatoryNodeType;
  tone: "icy" | "blood" | "gold" | "purple";
  /** Apparent stellar magnitude (0 = Myth / Narrative Anchor, 1 = Upper Constellation, 2 = Incarnation Star) */
  magnitude?: 0 | 1 | 2;
  /** Deterministic fixed canvas coordinates (1600 x 960 bounding space) */
  x: number;
  y: number;
  description: string;
  chapterCitation: string;
  canonStatus: CanonVerificationStatus;
  spoilerLevel: SpoilerLevel;
  aliases?: string[];
  factionOrNebula?: string;
  avatarUrl?: string;
  imageAttribution?: {
    illustrator: string;
    source: string;
    usageNotes: string;
    sourceClassification?: string;
    licenseType?: string;
    reuseStatus?: string;
  };
  loreHighlights: string[];
}

export interface ObservatoryEdge {
  id: string;
  source: string;
  target: string;
  type: ObservatoryRelationshipType;
  label: string;
  description: string;
  chapterCitation: string;
  canonStatus: CanonVerificationStatus;
  spoilerLevel: SpoilerLevel;
  bidirectional?: boolean;
  spoilerWarning?: string;
}

export const OBSERVATORY_NODES: ObservatoryNode[] = [
  // ── Incarnations (The Seoul Asterism / Kim Dokja's Company) ──────
  {
    id: "kim-dokja",
    name: "Kim Dokja",
    subtitle: "The Sole Reader",
    modifier: "[Demon King of Salvation]",
    modifierSpoiler: true,
    type: "incarnation",
    tone: "icy",
    magnitude: 0,
    x: 760,
    y: 510,
    description:
      "The sole reader of the 3,149-chapter web novel 'Three Ways to Survive in a Ruined World'. Uses his exclusive reader knowledge to manipulate scenarios and keep his companions alive.",
    chapterCitation: "Webnovel Chapters 1-551 (Protagonist)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Dokja", "Squid", "King of a Kingless World", "Demon King of Salvation", "Staff of Mino Soft"],
    factionOrNebula: "Kim Dokja's Company",
    avatarUrl: "/images/kim-dokja-potrait2.jpg",
    loreHighlights: [
      "Sole reader who reached the epilogue of Ways of Survival",
      "Refused all constellation sponsors to remain an independent incarnation",
      "Ascended as the Demon King of Salvation during Dark Castle",
    ],
  },
  {
    id: "yoo-joonghyuk",
    name: "Yoo Joonghyuk",
    subtitle: "The Regressor",
    modifier: "[Supreme King]",
    modifierSpoiler: false,
    type: "incarnation",
    tone: "blood",
    magnitude: 0,
    x: 890,
    y: 440,
    description:
      "The protagonist of the original novel, trapped in a relentless cycle of reliving his life across 1,863 iterations. Dokja's presence diverts his 3rd turn toward hope.",
    chapterCitation: "Webnovel Chapter 8 (Subway Encounter), Chapter 515+ (The Oldest Dream)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Joonghyuk", "Sunfish", "Supreme King", "Conquering King"],
    factionOrNebula: "Kim Dokja's Company",
    avatarUrl: "/images/yoo-joonghyuk.jpg",
    loreHighlights: [
      "Master of Splitting the Sky Swordsmanship",
      "Stigmas: Regression and Transmission",
      "Main story protagonist specifically in his 3rd regression turn",
    ],
  },
  {
    id: "han-sooyoung",
    name: "Han Sooyoung",
    subtitle: "The Author",
    modifier: "[Director of the False Last Act]",
    modifierSpoiler: true,
    type: "incarnation",
    tone: "gold",
    magnitude: 1,
    x: 630,
    y: 410,
    description:
      "Genius web novelist and First Apostle. Ruthless, witty, and fiercely protective, she is the co-strategist of Kim Dokja's Company.",
    chapterCitation: "Webnovel Chapter 67 (First Apostle), Chapters 535-545 (Epilogue Author)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Sooyoung", "First Apostle", "tls123", "Black Flame Master"],
    factionOrNebula: "Kim Dokja's Company",
    avatarUrl: "/images/han-sooyoung.jpg",
    loreHighlights: [
      "Exclusive Skill: Avatar",
      "Accumulated Story: Predictive Plagiarism",
      "Contracted with the Abyssal Black Flame Dragon",
    ],
  },
  {
    id: "jung-heewon",
    name: "Jung Heewon",
    subtitle: "The Sword of Judgment",
    modifier: "[Judge of Fire]",
    modifierSpoiler: false,
    type: "incarnation",
    tone: "blood",
    magnitude: 1,
    x: 860,
    y: 670,
    description:
      "Awakened as the incarnation of absolute righteousness after being saved at Geumho Station. Channels Uriel's holy hellfire and consensus-based Judgment Time.",
    chapterCitation: "Webnovel Chapter 15 (Geumho Station), Chapter 20 (Judge of Destruction)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Heewon", "Judge of Destruction"],
    factionOrNebula: "Kim Dokja's Company",
    avatarUrl: "/images/jung-heewon.jpg",
    loreHighlights: [
      "Contracted Incarnation of Archangel Uriel",
      "Executes Judgment Time upon evil entities",
      "The offensive vanguard sword of the company",
    ],
  },
  {
    id: "lee-hyunsung",
    name: "Lee Hyunsung",
    subtitle: "The Steel Sword",
    modifier: "[Master of Steel]",
    modifierSpoiler: false,
    type: "incarnation",
    tone: "icy",
    magnitude: 2,
    x: 680,
    y: 700,
    description:
      "Former army lieutenant whose steadfast loyalty and unyielding courage form the indestructible shield of Kim Dokja's Company.",
    chapterCitation: "Webnovel Chapter 1 (Subway Carriage 3807), Chapter 20 (Master of Steel)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Hyunsung", "Pure Steel Soldier", "The Shield of Seoul"],
    factionOrNebula: "Kim Dokja's Company",
    avatarUrl: "/images/lee-hyunsung.jpg",
    loreHighlights: [
      "Sponsored by the Master of Steel",
      "Stigmas: Great Mountain Push and Steel Transformation",
      "Moral anchor and unbreakable defense of the companions",
    ],
  },
  {
    id: "yoo-sangah",
    name: "Yoo Sangah",
    subtitle: "The Successor of Olympus",
    modifier: "[Moonlight Empress]",
    modifierSpoiler: false,
    type: "incarnation",
    tone: "icy",
    magnitude: 1,
    x: 530,
    y: 580,
    description:
      "Dokja's former office colleague whose gentle demeanor masks exceptional linguistic mastery, tactical composure, and the woven threads of Olympus.",
    chapterCitation: "Webnovel Chapter 1 (Carriage 3807), Chapter 36 (Olympus Contract)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Sangah", "Incarnation of Ariadne", "Library Reader"],
    factionOrNebula: "Kim Dokja's Company / Olympus",
    avatarUrl: "/images/yoo-sangah.jpg",
    loreHighlights: [
      "Master of Hermes' Walking Method and Thread of Fate",
      "Fluent in ancient and celestial languages",
      "Crucial navigator through labyrinthine scenarios",
    ],
  },
  {
    id: "lee-jihye",
    name: "Lee Jihye",
    subtitle: "The Naval Commander",
    modifier: "[Maritime War God's Incarnation]",
    modifierSpoiler: false,
    type: "incarnation",
    tone: "icy",
    magnitude: 2,
    x: 980,
    y: 520,
    description:
      "Yoo Joonghyuk's disciple and naval battle commander who commands phantom fleets through the power of Korea's legendary Maritime War God.",
    chapterCitation: "Webnovel Chapter 29 (Chungmuro Station)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Jihye", "Admiral of the Ghost Fleet"],
    factionOrNebula: "Kim Dokja's Company",
    avatarUrl: "/images/lee-jihye.jpg",
    loreHighlights: [
      "Direct disciple of Yoo Joonghyuk",
      "Sponsored by Duke of Loyalty and Warfare (Yi Sun-sin)",
      "Stigma: Ghost Fleet summoner",
    ],
  },
  {
    id: "lee-gilyoung",
    name: "Lee Gilyoung",
    subtitle: "The Insect Boy",
    modifier: "[Ruler of Insects]",
    modifierSpoiler: false,
    type: "incarnation",
    tone: "blood",
    magnitude: 2,
    x: 720,
    y: 620,
    description:
      "The boy rescued by Dokja in carriage 3807. Forms deep paternal attachment to Dokja and commands swarms of subterranean and mythical insects.",
    chapterCitation: "Webnovel Chapter 1 (Carriage 3807), Chapter 469 (Sponsor Reveal)",
    canonStatus: "needs_verification",
    spoilerLevel: "early_scenarios",
    aliases: ["Gilyoung", "Insect Collector", "Abyssal Tamer"],
    factionOrNebula: "Kim Dokja's Company",
    avatarUrl: "/images/lee-gilyoung.jpg",
    loreHighlights: [
      "Exclusive Skills: Diverse Communication and Insect Taming",
      "Refused initial constellation sponsors to stay with Dokja",
      "Late-game sponsor revealed as Abaddon (Ruler of the Deepest Pit)",
    ],
  },
  {
    id: "shin-yoosung",
    name: "Shin Yoosung",
    subtitle: "Beast Tamer",
    modifier: "[Beast King's Incarnation]",
    modifierSpoiler: false,
    type: "incarnation",
    tone: "gold",
    magnitude: 2,
    x: 760,
    y: 340,
    description:
      "Kim Dokja's contracted incarnation. Saved from her original tragic destiny as the Disaster of Floods, she commands apex scenario beasts.",
    chapterCitation: "Webnovel Chapter 96 (Disaster of Floods arc)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Yoosung", "Queen of Beasts", "Disaster of Floods (Alternate Turn)"],
    factionOrNebula: "Kim Dokja's Company",
    avatarUrl: "/images/shin-yoosung.jpg",
    loreHighlights: [
      "Contracted incarnation of the Demon King of Salvation",
      "Possesses advanced monster communication and empathy",
      "Rewrote her dark fate from previous regression turns",
    ],
  },

  // ── Constellations & Cosmic Watchers ─────────────────────────────
  {
    id: "secretive-plotter",
    name: "Secretive Plotter",
    subtitle: "Watcher of the Final Wall",
    modifier: "[Secretive Plotter]",
    modifierSpoiler: false,
    type: "cosmic_entity",
    tone: "icy",
    magnitude: 0,
    x: 980,
    y: 150,
    description:
      "An enigmatic, supreme cosmic watcher from the outer cosmos. Observes Kim Dokja with keen fascination, stepping in with coins and probability when choices defy the script.",
    chapterCitation: "Webnovel Chapter 2 (Subway Broadcast), Chapters 420-430 (Plotter's Domain), Epilogue",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Plotter", "Outer God King", "1863rd Yoo Joonghyuk"],
    factionOrNebula: "Outer Cosmos / Independent",
    avatarUrl: "/images/constellations/secretive-plotter.png",
    imageAttribution: {
      illustrator: "Blackbox (Official Webnovel Illustrator)",
      source: "Omniscient Reader's Viewpoint Chapter 414 Illustration",
      usageNotes: "Official novel illustration by Blackbox. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webnovel Illustration",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
    loreHighlights: [
      "Observes Kim Dokja from the very first subway scenario",
      "Genuinely distinct from the 3rd turn Yoo Joonghyuk's sponsor",
      "Later revealed as the 1863rd-turn Yoo Joonghyuk who crossed the Final Wall",
    ],
  },
  {
    id: "demon-like-judge-of-fire",
    name: "Demon-like Judge of Fire",
    subtitle: "Archangel Uriel",
    modifier: "[Demon-like Judge of Fire]",
    modifierSpoiler: false,
    type: "constellation",
    tone: "blood",
    magnitude: 0,
    x: 1260,
    y: 220,
    description:
      "One of the four Great Archangels of Eden. Despite her fearsome modifier and devastating holy Hellfire, she is a passionate supporter of Kim Dokja's Company and companionship.",
    chapterCitation: "Webnovel Chapter 14 (Eden Broadcast), Chapter 20 (Sponsor Contract)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Archangel Uriel", "Uriel", "Judge of Fire"],
    factionOrNebula: "Eden (Absolute Good)",
    avatarUrl: "/images/constellations/demon-like-judge-of-fire.jpg",
    imageAttribution: {
      illustrator: "Blackbox (Official Webnovel Illustrator)",
      source: "Omniscient Reader's Viewpoint Webnovel Illustration (Munpia)",
      usageNotes: "Official webnovel art of Archangel Uriel by Blackbox. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webnovel Illustration",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
    loreHighlights: [
      "Sponsored incarnation Jung Heewon",
      "Enthusiastic shipper of Dokja and Joonghyuk's comradeship",
      "Myth-grade combat power in Eden's holy hierarchy",
    ],
  },
  {
    id: "abyssal-black-flame-dragon",
    name: "Abyssal Black Flame Dragon",
    subtitle: "Lord of Black Cloud",
    modifier: "[Abyssal Black Flame Dragon]",
    modifierSpoiler: false,
    type: "constellation",
    tone: "purple",
    magnitude: 1,
    x: 280,
    y: 360,
    description:
      "Leader of the Black Cloud nebula known for fiery monologues, edgy pride, and devastating dark flames that consume probability.",
    chapterCitation: "Webnovel Chapter 2 (Subway Broadcast), Chapter 6, Chapter 130+",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Black Flame Dragon", "Black Dragon", "Lord of Black Cloud"],
    factionOrNebula: "Black Cloud (Neutral Evil / Chaos)",
    avatarUrl: "/images/constellations/abyssal-black-flame-dragon.png",
    imageAttribution: {
      illustrator: "Sleepy-C / REDICE Studio",
      source: "Omniscient Reader Webtoon (Chapter 238, Naver / Line Webtoon)",
      usageNotes: "Official webtoon art by Sleepy-C. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webtoon Adaptation Art",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
    loreHighlights: [
      "Sponsor of incarnation Han Sooyoung",
      "Easily provoked into dramatic channel broadcast reactions",
      "Ancient Myth-grade draconic entity of pure destruction",
    ],
  },
  {
    id: "prisoner-of-the-golden-headband",
    name: "Prisoner of the Golden Headband",
    subtitle: "Great Sage Equal to Heaven",
    modifier: "[Prisoner of the Golden Headband]",
    modifierSpoiler: false,
    type: "constellation",
    tone: "gold",
    magnitude: 0,
    x: 1420,
    y: 250,
    description:
      "The legendary Sun Wukong. Bound by the golden circlet, he delights in irreverence toward corrupt nebulae and martial triumphs against cosmic bureaucracy.",
    chapterCitation: "Webnovel Chapter 2 (Subway Inquiry), Chapter 6 (Sponsor Selection)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Sun Wukong", "Great Sage Equal to Heaven", "Stone Monkey"],
    factionOrNebula: "Emperor / Journey to the West",
    avatarUrl: "/images/constellations/prisoner-of-the-golden-headband.jpg",
    imageAttribution: {
      illustrator: "Sleepy-C / REDICE Studio",
      source: "Omniscient Reader Webtoon (Chapter 166, Naver / Line Webtoon)",
      usageNotes: "Official webtoon art of Sun Wukong by Sleepy-C. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webtoon Adaptation Art",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
    loreHighlights: [
      "Supports Dokja's rebellion against the bureau and nebulae",
      "Revered martial deity with four split incarnations",
      "One of the strongest physical fighters in the Star Stream",
    ],
  },
  {
    id: "master-of-steel",
    name: "Master of Steel",
    subtitle: "Constellation of Pure Iron",
    modifier: "[Master of Steel]",
    modifierSpoiler: false,
    type: "constellation",
    tone: "icy",
    magnitude: 2,
    x: 480,
    y: 840,
    description:
      "A silent, stalwart constellation embodying metallurgical endurance and unbending willpower. Bestows ironclad defensive stigmas.",
    chapterCitation: "Webnovel Chapter 20 (Sponsor Selection)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Iron Master", "Lord of Steel"],
    factionOrNebula: "Independent Iron Heavens",
    loreHighlights: [
      "Sponsor of incarnation Lee Hyunsung",
      "Bestows Great Mountain Push and Steel Transformation stigmas",
      "Values unyielding moral integrity above flashy combat",
    ],
  },
  {
    id: "maritime-war-god",
    name: "Maritime War God",
    subtitle: "Duke of Loyalty and Warfare",
    modifier: "[Maritime War God]",
    modifierSpoiler: false,
    type: "constellation",
    tone: "icy",
    magnitude: 2,
    x: 1280,
    y: 680,
    description:
      "The historical naval commander of the Korean peninsula (Yi Sun-sin). Commands celestial ghost flagships and shields the righteous.",
    chapterCitation: "Webnovel Chapter 29 (Chungmuro Scenario)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Duke of Loyalty and Warfare", "Yi Sun-sin", "Naval War God"],
    factionOrNebula: "Korean Peninsula Constellations",
    avatarUrl: "/images/constellations/maritime-war-god.jpg",
    imageAttribution: {
      illustrator: "Official ORV Production Art",
      source: "Omniscient Reader Webtoon / Production Asset (Yi Sun-sin)",
      usageNotes: "Official character production art of the Maritime War God. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webtoon Adaptation Art",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
    loreHighlights: [
      "Sponsor of incarnation Lee Jihye",
      "Bestows the Ghost Fleet stigma",
      "Unmatched strategic supremacy in aquatic and naval scenarios",
    ],
  },
  {
    id: "olympus-nebula",
    name: "Olympus (Nebula)",
    subtitle: "Lords of the Parthenon",
    modifier: "[The Twelve Gods of Olympus]",
    modifierSpoiler: false,
    type: "nebula",
    tone: "icy",
    magnitude: 1,
    x: 240,
    y: 560,
    description:
      "One of the dominant major nebulae in the Star Stream. Governed by thunder and fate, they sponsor Yoo Sangah through the blessings of Ariadne and Dionysus.",
    chapterCitation: "Webnovel Chapter 36 (Olympus Sponsorship)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    aliases: ["Olympus", "Ariadne & Dionysus", "Twelve Olympians"],
    factionOrNebula: "Olympus",
    avatarUrl: "/images/constellations/olympus-nebula.png",
    imageAttribution: {
      illustrator: "Sleepy-C / REDICE Studio",
      source: "Omniscient Reader Webtoon (Chapter 87, Olympus Constellation Gathering)",
      usageNotes: "Official webtoon art of the Olympus Nebula by Sleepy-C. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Webtoon Adaptation Art",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
    loreHighlights: [
      "Major political power bloc across the scenarios",
      "Sponsors Yoo Sangah via Ariadne's Thread of Fate",
      "Frequently clashes with Kim Dokja over probability dominance",
    ],
  },

  // ── Deep End-Game Entities (Spoiler Guarded) ─────────────────────
  {
    id: "the-oldest-dream",
    name: "The Most Ancient Dream",
    subtitle: "The Oldest Dream",
    modifier: "[The Most Ancient Dream]",
    modifierSpoiler: true,
    type: "cosmic_entity",
    tone: "purple",
    magnitude: 0,
    x: 480,
    y: 160,
    description:
      "The foundational cosmic entity whose dreaming sustains the entire Star Stream reality. Revealed as the supreme sponsor of Yoo Joonghyuk's endless regressions.",
    chapterCitation: "Webnovel Chapter 515+ (Episode 99 / The Oldest Dream)",
    canonStatus: "verified_canon",
    spoilerLevel: "endgame_novel",
    aliases: ["The Oldest Dream", "Ancient Dreamer", "Dreaming Child"],
    factionOrNebula: "Source of the Star Stream",
    avatarUrl: "/images/constellations/the-oldest-dream.png",
    imageAttribution: {
      illustrator: "Blackbox (Official Webnovel Illustrator)",
      source: "Omniscient Reader's Viewpoint Volume 5 Official Cover",
      usageNotes: "Official novel volume cover by Blackbox. Unofficial fan companion reference; does not convey copyright permission or licensing.",
      sourceClassification: "Official Published Volume Cover Art",
      reuseStatus: "Unverified // Copyright Rights Reserved",
    },
    loreHighlights: [
      "Finances Yoo Joonghyuk's Regression stigma across all 1,863 turns",
      "The living foundation of scenario probability",
      "Endgame revelation of the entire web novel",
    ],
  },
  {
    id: "ruler-of-deepest-pit",
    name: "Ruler of the Deepest Pit",
    subtitle: "Abaddon (King of Locusts)",
    modifier: "[Ruler of the Deepest Pit]",
    modifierSpoiler: true,
    type: "constellation",
    tone: "blood",
    magnitude: 1,
    x: 210,
    y: 780,
    description:
      "Abaddon, the Angel of the Abyss and Lord of Locusts. Revealed in late scenarios as the true sponsor backing Lee Gilyoung's abyssal insect commands.",
    chapterCitation: "Webnovel Chapter 469 (Sponsor Reveal - Abaddon)",
    canonStatus: "needs_verification",
    spoilerLevel: "endgame_novel",
    aliases: ["Abaddon", "Lord of the Abyss", "King of Locusts"],
    factionOrNebula: "The Deepest Pit",
    loreHighlights: [
      "Revealed in Chapter 469 as Lee Gilyoung's true sponsor",
      "Distinct from Baalzebub and the Black Flame Dragon",
      "Commands devastating abyssal subterranean insect plagues",
    ],
  },
];

export const OBSERVATORY_EDGES: ObservatoryEdge[] = [
  // ── Core Companionship Bonds ─────────────────────────────────────
  {
    id: "edge-dokja-joonghyuk",
    source: "kim-dokja",
    target: "yoo-joonghyuk",
    type: "companion",
    label: "Life-and-Death Companions",
    description:
      "The sole reader and the regressor. Dokja rewrites the 1,863-turn tragedy into a story where everyone reaches the epilogue; Joonghyuk acknowledges Dokja as his sole true companion.",
    chapterCitation: "Webnovel Chapter 188 (Dark Castle), Chapter 486 (Epilogue)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: true,
  },
  {
    id: "edge-dokja-sooyoung",
    source: "kim-dokja",
    target: "han-sooyoung",
    type: "companion",
    label: "Author & Reader",
    description:
      "The writer of Ways of Survival and its solitary reader. A bond forged through cynical pragmatism, creative genius, and fierce protective loyalty across worldlines.",
    chapterCitation: "Webnovel Chapter 67 (First Apostle), Chapters 535-545 (Epilogue)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: true,
  },
  {
    id: "edge-dokja-heewon",
    source: "kim-dokja",
    target: "jung-heewon",
    type: "companion",
    label: "Rescuer & Sword of Judgment",
    description:
      "Dokja rescued Heewon during the Geumho Station crisis, awakening her as the Judge of Destruction. She pledged her blade to protect his life and punish his betrayers.",
    chapterCitation: "Webnovel Chapter 15 (Geumho Station Ground Scenario)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: true,
  },
  {
    id: "edge-dokja-hyunsung",
    source: "kim-dokja",
    target: "lee-hyunsung",
    type: "companion",
    label: "The Shield of the Company",
    description:
      "Companions from Subway Carriage 3807. Dokja gave Hyunsung purpose after the tragic loss of his platoon, and Hyunsung stands as Dokja's indestructible moral defender.",
    chapterCitation: "Webnovel Chapter 1 (Subway Scenario), Chapter 20",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: true,
  },
  {
    id: "edge-dokja-sangah",
    source: "kim-dokja",
    target: "yoo-sangah",
    type: "companion",
    label: "Mino Soft Colleagues & Guiding Light",
    description:
      "Former office colleagues whose quiet pre-apocalyptic connection deepens into profound mutual trust, navigating the labyrinth of Olympus and the Star Stream.",
    chapterCitation: "Webnovel Chapter 1 (Subway Scenario)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: true,
  },
  {
    id: "edge-dokja-gilyoung",
    source: "kim-dokja",
    target: "lee-gilyoung",
    type: "companion",
    label: "Paternal Bond & Found Family",
    description:
      "Saved in carriage 3807 with an insect box. Gilyoung considers Dokja his true father figure and refused early constellation sponsors simply to stay at his side.",
    chapterCitation: "Webnovel Chapter 1 (Subway Scenario), Chapter 6",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: true,
  },
  {
    id: "edge-heewon-hyunsung",
    source: "jung-heewon",
    target: "lee-hyunsung",
    type: "companion",
    label: "Sword & Shield Comrades",
    description:
      "The physical and moral vanguard of Kim Dokja's Company. A steadfast romantic bond and mutual combat synchrony honed through relentless scenarios.",
    chapterCitation: "Webnovel Chapter 188+, Chapter 350+",
    canonStatus: "verified_canon",
    spoilerLevel: "demon_realm",
    bidirectional: true,
  },
  {
    id: "edge-joonghyuk-jihye",
    source: "yoo-joonghyuk",
    target: "lee-jihye",
    type: "master_disciple",
    label: "Master & Disciple",
    description:
      "Yoo Joonghyuk took high schooler Lee Jihye as his disciple in early regressions; in the 3rd turn, she remains fiercely loyal to his martial direction.",
    chapterCitation: "Webnovel Chapter 29 (Chungmuro Station)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: false,
  },
  {
    id: "edge-joonghyuk-sooyoung",
    source: "yoo-joonghyuk",
    target: "han-sooyoung",
    type: "alliance",
    label: "Strategic Co-Leaders",
    description:
      "A volatile yet ironclad partnership. When Dokja sacrifices himself, Joonghyuk and Sooyoung command the company side-by-side to bring him home.",
    chapterCitation: "Webnovel Chapter 188 (Dark Castle), Chapter 480+",
    canonStatus: "verified_canon",
    spoilerLevel: "demon_realm",
    bidirectional: true,
  },
  {
    id: "edge-gilyoung-yoosung",
    source: "lee-gilyoung",
    target: "shin-yoosung",
    type: "rivalry",
    label: "Rival Sibling Tamers",
    description:
      "The two young tamers of Kim Dokja's Company. Constant childish competition over Dokja's attention masks deep mutual affection and protection.",
    chapterCitation: "Webnovel Chapter 98 (Reunion in Seoul)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: true,
  },

  // ── Sponsorship Connections ──────────────────────────────────────
  {
    id: "edge-uriel-heewon",
    source: "demon-like-judge-of-fire",
    target: "jung-heewon",
    type: "sponsor",
    label: "Holy Sponsor & Hellfire Stigma",
    description:
      "Archangel Uriel sponsors Jung Heewon, recognizing her hatred of injustice and bestowing the terrifying holy Hellfire stigma.",
    chapterCitation: "Webnovel Chapter 20 (Sponsor Selection)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: false,
  },
  {
    id: "edge-dragon-sooyoung",
    source: "abyssal-black-flame-dragon",
    target: "han-sooyoung",
    type: "sponsor",
    label: "Dark Dragon Sponsor & Black Flame",
    description:
      "The Abyssal Black Flame Dragon contracts with Han Sooyoung during the Seoul scenario climaxes, granting Black Flame stigmas.",
    chapterCitation: "Webnovel Chapter 130+ (Sponsor Contract)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: false,
  },
  {
    id: "edge-steel-hyunsung",
    source: "master-of-steel",
    target: "lee-hyunsung",
    type: "sponsor",
    label: "Master of Steel & Pure Iron Stigma",
    description:
      "The Master of Steel sponsors Lee Hyunsung, bestowing Great Mountain Push and Steel Transformation stigmas.",
    chapterCitation: "Webnovel Chapter 20 (Sponsor Selection)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: false,
  },
  {
    id: "edge-maritime-jihye",
    source: "maritime-war-god",
    target: "lee-jihye",
    type: "sponsor",
    label: "Maritime War God & Ghost Fleet",
    description:
      "Yi Sun-sin (Duke of Loyalty and Warfare) sponsors Lee Jihye, enabling her to summon and command celestial ghost flagships.",
    chapterCitation: "Webnovel Chapter 29 (Chungmuro Scenario)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: false,
  },
  {
    id: "edge-olympus-sangah",
    source: "olympus-nebula",
    target: "yoo-sangah",
    type: "sponsor",
    label: "Olympus Successor & Thread of Fate",
    description:
      "Olympus sponsors Yoo Sangah, channeling Ariadne's Thread of Fate and ancient mythological powers into the scenarios.",
    chapterCitation: "Webnovel Chapter 36 (Olympus Sponsorship)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: false,
  },
  {
    id: "edge-dokja-yoosung",
    source: "kim-dokja",
    target: "shin-yoosung",
    type: "sponsor",
    label: "Demon King Sponsor & Contracted Ward",
    description:
      "Kim Dokja (Demon King of Salvation) officially sponsors Shin Yoosung to avert her tragedy as the Disaster of Floods, bestowing the Sympathy stigma.",
    chapterCitation: "Webnovel Chapter 96 (Disaster of Floods arc)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: false,
  },

  // ── Celestial Observations & Nebular Rivalries ────────────────────
  {
    id: "edge-plotter-dokja",
    source: "secretive-plotter",
    target: "kim-dokja",
    type: "observation",
    label: "Cosmic Patron & Observer",
    description:
      "The enigmatic Outer God constellation observes Kim Dokja from the opening subway scenario, intrigued by choices that break the predetermined story.",
    chapterCitation: "Webnovel Chapter 2 (Subway Broadcast), Chapter 188",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: false,
  },
  {
    id: "edge-uriel-dokja",
    source: "demon-like-judge-of-fire",
    target: "kim-dokja",
    type: "observation",
    label: "Eden Patron & Comradeship Supporter",
    description:
      "Archangel Uriel constantly watches and supports Kim Dokja, showering the channel with coins and passionately celebrating his companionship with Yoo Joonghyuk.",
    chapterCitation: "Webnovel Chapter 14 (Eden Channel Inquiry), Chapter 20",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: false,
  },
  {
    id: "edge-wukong-dokja",
    source: "prisoner-of-the-golden-headband",
    target: "kim-dokja",
    type: "observation",
    label: "Martial Admiration & Nebular Defiance",
    description:
      "Sun Wukong watches Dokja with boisterous laughter and respect, applauding whenever Dokja humiliates corrupt nebulae or greedy dokkaebis.",
    chapterCitation: "Webnovel Chapter 2, Chapter 6 (Sponsor Selection)",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: false,
  },
  {
    id: "edge-dragon-uriel",
    source: "abyssal-black-flame-dragon",
    target: "demon-like-judge-of-fire",
    type: "rivalry",
    label: "Cosmic Ideological Rivalry",
    description:
      "Perpetual broadcast banter and probability clashes between Eden (Absolute Good) and Black Cloud (Neutral Evil / Chaos).",
    chapterCitation: "Webnovel Chapter 6, Chapter 14",
    canonStatus: "verified_canon",
    spoilerLevel: "early_scenarios",
    bidirectional: true,
  },

  // ── Endgame Spoiler Relationships ────────────────────────────────
  {
    id: "edge-plotter-joonghyuk",
    source: "secretive-plotter",
    target: "yoo-joonghyuk",
    type: "cosmic_mirror",
    label: "The 1863rd Turn Mirror",
    description:
      "Secretive Plotter is the 1863rd-turn Yoo Joonghyuk who crossed the Final Wall to become an Outer God, watching his 3rd-turn counterpart with complex detachment.",
    chapterCitation: "Webnovel Chapter 420-430 (Plotter's Domain), Chapter 515+",
    canonStatus: "verified_canon",
    spoilerLevel: "endgame_novel",
    bidirectional: false,
    spoilerWarning: "Major Endgame Novel Revelation: Discloses Secretive Plotter's true identity and origin from the 1863rd regression turn.",
  },
  {
    id: "edge-oldestdream-joonghyuk",
    source: "the-oldest-dream",
    target: "yoo-joonghyuk",
    type: "sponsor",
    label: "The Cosmic Sponsor of Regression",
    description:
      "The Most Ancient Dream is the supreme cosmic dreamer whose longing funds and sustains Yoo Joonghyuk's Regression stigma across all 1,863 iterations.",
    chapterCitation: "Webnovel Chapter 515+ (The Oldest Dream revelation)",
    canonStatus: "verified_canon",
    spoilerLevel: "endgame_novel",
    bidirectional: false,
    spoilerWarning: "Major Endgame Revelation: Discloses the true cosmic sponsor funding Yoo Joonghyuk's Regression stigma.",
  },
  {
    id: "edge-abaddon-gilyoung",
    source: "ruler-of-deepest-pit",
    target: "lee-gilyoung",
    type: "sponsor",
    label: "Abyssal Lord Sponsor",
    description:
      "Abaddon (Ruler of the Deepest Pit / King of Locusts) is confirmed in late scenarios as Lee Gilyoung's true contract sponsor, granting subterranean insect stigmas.",
    chapterCitation: "Webnovel Chapter 469 (Sponsor Reveal - Abaddon)",
    canonStatus: "needs_verification",
    spoilerLevel: "endgame_novel",
    bidirectional: false,
    spoilerWarning: "Endgame Novel Spoiler: Reveals Lee Gilyoung's late-game sponsor, Abaddon.",
  },
];

// ── Query & Filtering Helpers ──────────────────────────────────────

export interface GraphFilterOptions {
  spoilerUnlocked: boolean;
  mode: "all" | "sponsors" | "companions" | "watchers";
  entityFilter: "all" | "incarnation" | "constellation";
  searchQuery?: string;
}

export function getFilteredObservatoryGraph(options: GraphFilterOptions) {
  const { spoilerUnlocked, mode, entityFilter, searchQuery = "" } = options;

  // 1. Filter Nodes by Spoiler Level & Entity Type
  let activeNodes = OBSERVATORY_NODES.filter((node) => {
    if (!spoilerUnlocked && node.spoilerLevel === "endgame_novel") {
      return false;
    }
    if (entityFilter === "incarnation" && node.type !== "incarnation") {
      return false;
    }
    if (entityFilter === "constellation" && node.type === "incarnation") {
      return false;
    }
    return true;
  });

  const activeNodeIds = new Set(activeNodes.map((n) => n.id));

  // 2. Filter Edges by Spoiler Level, Mode, and Active Node Membership
  let activeEdges = OBSERVATORY_EDGES.filter((edge) => {
    // Both ends must exist in the active nodes
    if (!activeNodeIds.has(edge.source) || !activeNodeIds.has(edge.target)) {
      return false;
    }

    if (!spoilerUnlocked && edge.spoilerLevel === "endgame_novel") {
      return false;
    }

    if (mode === "sponsors" && edge.type !== "sponsor") {
      return false;
    }

    if (mode === "companions" && edge.type !== "companion" && edge.type !== "master_disciple" && edge.type !== "alliance") {
      return false;
    }

    if (mode === "watchers" && edge.type !== "observation" && edge.type !== "cosmic_mirror" && edge.type !== "rivalry") {
      return false;
    }

    return true;
  });

  // 3. Search Matching
  const query = searchQuery.trim().toLowerCase();
  let matchedNodeIds = new Set<string>();

  if (query) {
    activeNodes.forEach((node) => {
      const matchName = node.name.toLowerCase().includes(query);
      const matchModifier = node.modifier.toLowerCase().includes(query);
      const matchSubtitle = node.subtitle.toLowerCase().includes(query);
      const matchAlias = node.aliases?.some((a) => a.toLowerCase().includes(query));
      if (matchName || matchModifier || matchSubtitle || matchAlias) {
        matchedNodeIds.add(node.id);
      }
    });
  }

  return {
    nodes: activeNodes,
    edges: activeEdges,
    matchedNodeIds,
  };
}

export function getNodeById(id: string): ObservatoryNode | undefined {
  return OBSERVATORY_NODES.find((n) => n.id === id);
}

export function getEdgeById(id: string): ObservatoryEdge | undefined {
  return OBSERVATORY_EDGES.find((e) => e.id === id);
}

export function getConnectedEdgesForNode(nodeId: string, edges: ObservatoryEdge[] = OBSERVATORY_EDGES): ObservatoryEdge[] {
  return edges.filter((e) => e.source === nodeId || e.target === nodeId);
}

export function getConnectedNeighborIds(nodeId: string, edges: ObservatoryEdge[] = OBSERVATORY_EDGES): Set<string> {
  const neighbors = new Set<string>();
  edges.forEach((e) => {
    if (e.source === nodeId) neighbors.add(e.target);
    if (e.target === nodeId) neighbors.add(e.source);
  });
  return neighbors;
}
