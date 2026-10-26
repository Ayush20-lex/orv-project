/**
 * Star Stream — Character Data Model & Canon Directory
 *
 * Source Edition:
 * Munpia Original Web Serial / Webnovel Official English Translation
 * (Authors: Sing Shong, English Translation: RainbowTurtle & A_Passing_Wanderer, 551 Chapters).
 *
 * All records strictly differentiate:
 * - Exclusive Skills: Inherent incarnation talents.
 * - Sponsor Stigmas: Bestowed supernatural miracles from a sponsoring Constellation.
 *
 * Notice on Copyright & Image Usage:
 * Character visual references utilize promotional manhwa artwork illustrated by Sleepy-C (REDICE Studio / Naver Webtoon).
 * Star Stream is an unofficial, non-commercial fan companion project. Attribution does NOT establish or convey
 * copyright permission, licensing, or commercial endorsement by the rights holders.
 */

export type CanonVerificationStatus = "verified_canon" | "paraphrase" | "fan_interpretation" | "needs_verification";
export type SpoilerLevel = "early_scenarios" | "demon_realm" | "endgame_novel";

export interface CharacterRecord {
  id: string;
  name: string;
  title: string;
  modifier: string;
  modifierSpoiler?: boolean;
  sponsor: string;
  sponsorNotes?: string;
  /**
   * Explicit anti-conflation notes distinguishing separate entities,
   * alternate regression iterations, and cosmic identities.
   */
  canonDistinctions?: {
    entity: string;
    distinction: string;
  }[];
  personalAttribute: string;
  exclusiveSkills: string[];
  generalSkills?: string[];
  /**
   * Accumulated Stories / Fables (설화) recognized by the Star Stream.
   * Differentiated from innate exclusive skills and acquired general skills.
   */
  stories?: string[];
  storyNotes?: string;
  stigmas: string[];
  stigmaNotes?: string;
  stats: {
    str: number;
    agi: number;
    end: number;
    mana: number;
  };
  description: string;
  tone: "icy" | "blood" | "gold";
  image: string;
  imageAttribution: {
    illustrator: string;
    source: string;
    usageNotes: string;
  };
  canonStatus: CanonVerificationStatus;
  chapterCitation: string;
  spoilerLevel: SpoilerLevel;
}

const COMMON_IMAGE_ATTRIBUTION = {
  illustrator: "Sleepy-C (REDICE Studio)",
  source: "Omniscient Reader Webtoon (Naver / LINE Webtoon)",
  usageNotes:
    "Unofficial, non-commercial fan reference; visual assets belong to their respective creators and publishers. Attribution does not convey copyright permission.",
};

export const CHARACTERS: CharacterRecord[] = [
  {
    id: "kim-dokja",
    name: "Kim Dokja",
    title: "The Sole Reader",
    modifier: "[Demon King of Salvation]",
    modifierSpoiler: true,
    sponsor: "None (Independent Incarnation; later Constellation)",
    personalAttribute: "Scenario Interpreter (Rare), Eight Lives (Hero)",
    exclusiveSkills: [
      "Omniscient Reader's Viewpoint (Lv. 1-3)",
      "Bookmark (Lv. 1-3)",
      "Character List",
      "Fourth Wall (Ex)",
    ],
    generalSkills: ["Reading Comprehension"],
    stigmas: [
      "Sacrificial Will (Lv. 1) [Awakened Ch. 188]",
      "Will to Live (Lv. 1) [Awakened Ch. 398]",
    ],
    stigmaNotes:
      "As an independent incarnation in early scenarios, Kim Dokja had no sponsor and 0 stigmas. These stigmas developed following his ascension as the Demon King of Salvation.",
    stats: { str: 62, agi: 58, end: 71, mana: 45 },
    description:
      "An ordinary office contractor at Mino Soft who was the only person to read all 3,149 chapters of the web novel 'Three Ways to Survive in a Ruined World'. When the apocalypse transforms reality into that very novel, he uses his exclusive plot knowledge to survive, manipulate the scenarios, and keep his companions alive despite immense personal cost.",
    tone: "icy",
    image: "/images/kim-dokja-potrait2.jpg",
    imageAttribution: COMMON_IMAGE_ATTRIBUTION,
    canonStatus: "verified_canon",
    chapterCitation:
      "Webnovel Chapter 1 (Introduction), Chapter 188 (Demon King Selection & Sacrificial Will), Chapter 398 (Will to Live)",
    spoilerLevel: "demon_realm",
  },
  {
    id: "yoo-joonghyuk",
    name: "Yoo Joonghyuk",
    title: "The Regressor",
    modifier: "[Supreme King]",
    modifierSpoiler: false,
    sponsor: "Unknown (Redacted by the Star Stream System)",
    sponsorNotes:
      "Canonical Sponsor (3rd Turn): [The Most Ancient Dream / The Oldest Dream] (revealed in Episode 99+ / Chapter 515+). In the main story, Secretive Plotter (the 1863rd-turn Yoo Joonghyuk who crossed the Final Wall to become an Outer God) watches the Star Stream as an observer Constellation, distinct from the cosmic sponsor funding the 3rd turn's Regression stigma.",
    canonDistinctions: [
      {
        entity: "The Oldest Dream",
        distinction:
          "The cosmic sponsor who finances and bestows the Regression and Transmission stigmas for the 3rd-turn incarnation (revealed in Episode 99+ / Chapter 515+).",
      },
      {
        entity: "Secretive Plotter",
        distinction:
          "The 1863rd-turn Yoo Joonghyuk who crossed the Final Wall and ascended as an Outer God. In the main story timeline, he acts as an observer Constellation in the Star Stream rather than the 3rd-turn incarnation's sponsoring Constellation.",
      },
      {
        entity: "3rd Turn vs Alternate Worldlines",
        distinction:
          "The main story protagonist is specifically the 3rd-turn Yoo Joonghyuk whose fate diverges due to Kim Dokja's presence. Alternate turns (0th, 41st, 999th, 1863rd) represent distinct timelines and entities across the worldlines.",
      },
    ],
    personalAttribute: "Regressor (3rd Turn), Pro Gamer",
    exclusiveSkills: [
      "Sage's Eye",
      "Splitting the Sky Swordsmanship",
    ],
    generalSkills: [
      "Hand to Hand Combat",
      "Lie Detection",
    ],
    stigmas: ["Regression (Lv. 3)", "Transmission (Lv. 1)"],
    stigmaNotes:
      "Regression and Transmission are sponsor stigmas bestowed by the Oldest Dream, not inherent exclusive skills.",
    stats: { str: 99, agi: 99, end: 99, mana: 99 },
    description:
      "The protagonist of the original novel, trapped in a relentless cycle of reliving his life after death. Having endured 1,863 iterations of psychological trauma and grief in the original timeline, his 3rd turn is altered by Kim Dokja's intervention, giving him a fragile hope of reaching the epilogue without abandoning humanity.",
    tone: "blood",
    image: "/images/yoo-joonghyuk.jpg",
    imageAttribution: COMMON_IMAGE_ATTRIBUTION,
    canonStatus: "verified_canon",
    chapterCitation:
      "Webnovel Chapter 8 (First Encounter in Subway), Chapter 188 (Dark Castle), Chapter 515+ (The Oldest Dream revelation)",
    spoilerLevel: "early_scenarios",
  },
  {
    id: "han-sooyoung",
    name: "Han Sooyoung",
    title: "The Author",
    modifier: "[Director of the False Last Act]",
    modifierSpoiler: true,
    sponsor: "Abyssal Black Flame Dragon",
    sponsorNotes:
      "Contracted with the Abyssal Black Flame Dragon during the Seoul scenario climaxes, gaining black flame stigmas.",
    canonDistinctions: [
      {
        entity: "Author vs 1863rd Turn Han Sooyoung",
        distinction:
          "The main timeline Han Sooyoung merged her avatar memories with the 1863rd-turn Han Sooyoung (tls123) who wrote 'Three Ways to Survive in a Ruined World' to save Kim Dokja.",
      },
    ],
    personalAttribute: "Author (Rare), Specialized Plagiarist",
    exclusiveSkills: [
      "Avatar",
    ],
    generalSkills: [
      "Lie Detection",
    ],
    stories: [
      "Predictive Plagiarism",
    ],
    storyNotes:
      "A meta-narrative Story (Fable / 설화) generated through Han Sooyoung's use of Avatar to simulate scenario outcomes in internal consciousness, recognized as an accumulated Story by the Star Stream rather than an innate system skill.",
    stigmas: ["Black Flame (Lv. 1)"],
    stigmaNotes:
      "Black Flame is a sponsor-bestowed stigma from the Abyssal Black Flame Dragon, not an innate exclusive skill.",
    stats: { str: 35, agi: 60, end: 40, mana: 85 },
    description:
      "A genius novelist who published 'SSSSS-grade Infinite Regressor', heavily matching Kim Dokja's favorite novel. Pragmatic, cynical, and ruthlessly sharp, she acts as the intellectual backbone of Kim Dokja's Company. Beneath her selfish facade, she proves to be among the most fiercely protective companions in the Star Stream.",
    tone: "gold",
    image: "/images/han-sooyoung.jpg",
    imageAttribution: COMMON_IMAGE_ATTRIBUTION,
    canonStatus: "verified_canon",
    chapterCitation:
      "Webnovel Chapter 67 (First Apostle Arc introduction), Epilogue Chapter 535-545 (Director of the False Last Act)",
    spoilerLevel: "endgame_novel",
  },
  {
    id: "yoo-sangah",
    name: "Yoo Sangah",
    title: "The Successor of Olympus",
    modifier: "[Moonlight Empress]",
    modifierSpoiler: false,
    sponsor: "Olympus Nebula (Incarnation of Dionysus / Ariadne)",
    personalAttribute: "Interpreter (Rare)",
    exclusiveSkills: [
      "Interpretation (Korean, English, Spanish, Ancient)",
      "Agile Movement",
      "Spider Threading",
    ],
    stigmas: ["Thread of Fate", "Hermes' Walking Method"],
    stats: { str: 45, agi: 75, end: 50, mana: 80 },
    description:
      "Kim Dokja's former colleague from Mino Soft. Although perceived as an ordinary perfectionist employee before the apocalypse, she adapts to the scenarios faster than almost anyone, mastering ancient languages and unraveling the strings of fate through her Olympus sponsorship.",
    tone: "icy",
    image: "/images/yoo-sangah.jpg",
    imageAttribution: COMMON_IMAGE_ATTRIBUTION,
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 1 (Carriage 3807), Chapter 36 (Olympus Sponsorship)",
    spoilerLevel: "early_scenarios",
  },
  {
    id: "lee-hyunsung",
    name: "Lee Hyunsung",
    title: "The Steel Sword",
    modifier: "[Master of Steel]",
    modifierSpoiler: false,
    sponsor: "Master of Steel",
    personalAttribute: "Soldier (General)",
    exclusiveSkills: ["Bayonet Charge", "Weapons Training", "Camouflage"],
    stigmas: ["Great Mountain Push", "Steel Transformation"],
    stats: { str: 90, agi: 40, end: 95, mana: 20 },
    description:
      "A former military lieutenant whose steadfast loyalty and moral integrity earn him the role of Kim Dokja's Company's impenetrable shield. Struggling with survivor's guilt from his platoon's demise, he finds redemption by shielding his found family from insurmountable threats.",
    tone: "icy",
    image: "/images/lee-hyunsung.jpg",
    imageAttribution: COMMON_IMAGE_ATTRIBUTION,
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 1 (Carriage 3807), Chapter 20 (Master of Steel)",
    spoilerLevel: "early_scenarios",
  },
  {
    id: "jung-heewon",
    name: "Jung Heewon",
    title: "The Sword of Judgment",
    modifier: "[Judge of Fire]",
    modifierSpoiler: false,
    sponsor: "Demon-like Judge of Fire (Archangel Uriel)",
    personalAttribute: "Crouching Figure (Rare) -> Judge of Destruction",
    exclusiveSkills: ["Kendo", "Demon Slaying", "Judgment Time (Consensus Skill)"],
    stigmas: ["Hellfire (Lv. 1)"],
    stats: { str: 85, agi: 80, end: 70, mana: 60 },
    description:
      "Rescued by Kim Dokja during the brutal Geumho Station conflict, she awakens as the incarnation of absolute righteousness. Wielding Uriel's holy hellfire and the consensus-based Judgment Time, she becomes the foremost offensive vanguard of the party with zero tolerance for injustice.",
    tone: "blood",
    image: "/images/jung-heewon.jpg",
    imageAttribution: COMMON_IMAGE_ATTRIBUTION,
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 15 (Geumho Station Ground Scenario), Chapter 20 (Judge of Destruction Awakening)",
    spoilerLevel: "early_scenarios",
  },
  {
    id: "lee-jihye",
    name: "Lee Jihye",
    title: "The Naval Commander",
    modifier: "[Maritime War God's Incarnation]",
    modifierSpoiler: false,
    sponsor: "Maritime War God (Duke of Loyalty and Warfare)",
    personalAttribute: "Scarred Sword Demon",
    exclusiveSkills: ["Sword Training", "Ghost Walk"],
    stigmas: ["Ghost Fleet (Lv. 1)", "Song of the Sword"],
    stats: { str: 75, agi: 85, end: 60, mana: 50 },
    description:
      "A fierce high schooler and Yoo Joonghyuk's disciple who carries deep trauma from the first scenario. Under the mentorship of Korea's revered naval commander, she summons ethereal ghost battleships and commands naval phantom fleets across the scenarios.",
    tone: "icy",
    image: "/images/lee-jihye.jpg",
    imageAttribution: COMMON_IMAGE_ATTRIBUTION,
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 29 (Chungmuro Station)",
    spoilerLevel: "early_scenarios",
  },
  {
    id: "lee-gilyoung",
    name: "Lee Gilyoung",
    title: "The Insect Boy",
    modifier: "[Ruler of Insects]",
    modifierSpoiler: false,
    sponsor: "Ruler of the Deepest Pit (Abaddon) [Unselected in early scenarios]",
    sponsorNotes:
      "In early scenarios, Lee Gilyoung declined the initial Sponsor Selection to stay with Kim Dokja. His true sponsor is revealed in Webnovel Chapter 469 as Abaddon, the [Ruler of the Deepest Pit] (also translated as Lord of the Abyss). Prior draft entries attributing 'Baalzebub / Abyssal Black Flame Dragon' were erroneous demonology conflations.",
    canonDistinctions: [
      {
        entity: "Ruler of the Deepest Pit (Abaddon) vs Baalzebub",
        distinction:
          "Gilyoung's true sponsor is Abaddon (Lord of the Abyss / King of Locusts), revealed in Chapter 469. Baalzebub is an unrelated Demon King (Lord of the Flies) who does not sponsor Gilyoung.",
      },
      {
        entity: "Abyssal Black Flame Dragon",
        distinction:
          "Black Flame Dragon sponsors Kim Namwoon (original timeline) and Han Sooyoung, not Lee Gilyoung.",
      },
    ],
    personalAttribute: "Insect Collector",
    exclusiveSkills: ["Diverse Communication", "Insect Taming"],
    stigmas: ["Chimera Synthesis", "Abyssal Insect Breath"],
    stats: { str: 30, agi: 50, end: 25, mana: 60 },
    description:
      "A young boy saved by Kim Dokja during the opening scenario. Finding comfort in insects rather than untrustworthy humans, he forms a deep paternal bond with Kim Dokja and commands insect swarms and mythical subterranean bugs.",
    tone: "blood",
    image: "/images/lee-gilyoung.jpg",
    imageAttribution: COMMON_IMAGE_ATTRIBUTION,
    canonStatus: "needs_verification",
    chapterCitation: "Webnovel Chapter 1 (Carriage 3807), Chapter 469 (Sponsor Reveal - Abaddon)",
    spoilerLevel: "endgame_novel",
  },
  {
    id: "shin-yoosung",
    name: "Shin Yoosung",
    title: "Beast Tamer",
    modifier: "[Beast King's Incarnation]",
    modifierSpoiler: false,
    sponsor: "Demon King of Salvation (Kim Dokja)",
    personalAttribute: "Beast Tamer (Rare)",
    exclusiveSkills: ["Advanced Taming", "Diverse Communication"],
    stigmas: ["Sympathy (Lv. 1)"],
    stats: { str: 25, agi: 45, end: 20, mana: 75 },
    description:
      "Kim Dokja's officially contracted incarnation. In Yoo Joonghyuk's previous regression turns, she was groomed to become the catastrophic Disaster of Floods. In the 3rd turn, Dokja changes her destiny, taking her under his wing and nurturing her rare monster communication talents.",
    tone: "gold",
    image: "/images/shin-yoosung.jpg",
    imageAttribution: COMMON_IMAGE_ATTRIBUTION,
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 96 (Disaster of Floods arc)",
    spoilerLevel: "early_scenarios",
  },
];
