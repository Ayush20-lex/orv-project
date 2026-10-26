/**
 * Star Stream — Quotes Data Model & Verification Archive
 *
 * Source Edition:
 * Munpia Original Web Serial / Webnovel Official English Translation
 * (Authors: Sing Shong, English Translation: RainbowTurtle & A_Passing_Wanderer, 551 Chapters).
 *
 * All lines are strictly classified as:
 * - verified_canon: Verifiable novel text with confirmed chapter citations.
 * - paraphrase: Narrative translations, adapted dialogue, or serialized blurbs.
 * - fan_interpretation: Original community reflections or philosophical reader commentary.
 */

import { type CanonVerificationStatus, type SpoilerLevel } from "./characters";

export interface QuoteRecord {
  id: string;
  text: string;
  source: string;
  speaker: string;
  tone: "icy" | "blood" | "gold";
  canonStatus: CanonVerificationStatus;
  chapterCitation?: string;
  spoilerLevel: SpoilerLevel;
  contextNote: string;
  align?: "left" | "center" | "right";
}

export const ORV_QUOTES: QuoteRecord[] = [
  {
    id: "read-to-end",
    text: "I am someone who knows the ending of this world.",
    source: "Kim Dokja — The Sole Reader",
    speaker: "Kim Dokja",
    tone: "icy",
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 1 (Ep. 1 Starting the Paid Service, I)",
    spoilerLevel: "early_scenarios",
    contextNote: "Kim Dokja's opening realization as the subway carriage descends into the main scenarios.",
    align: "center",
  },
  {
    id: "eyes-closed",
    text: "Don't close your eyes. The moment you do, someone dies.",
    source: "Kim Dokja's Survival Directive — Carriage 3807",
    speaker: "Kim Dokja",
    tone: "blood",
    canonStatus: "paraphrase",
    chapterCitation: "Webnovel Chapter 1 (Ep. 1 Starting the Paid Service, I)",
    spoilerLevel: "early_scenarios",
    contextNote: "Dokja's internal tactical advice and survival monologue during Carriage 3807's initial panic.",
    align: "left",
  },
  {
    id: "fool-regress",
    text: "Tell me, you fool. If I continue to regress, will I ever meet you again?",
    source: "0th-Turn Yoo Joonghyuk to the Oldest Dream",
    speaker: "Yoo Joonghyuk (0th Turn)",
    tone: "gold",
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 525 (Epilogue 1 — The World of Zero, IX)",
    spoilerLevel: "endgame_novel",
    contextNote: "Spoken by 0th-turn Yoo Joonghyuk upon discovering the identity of the Oldest Dream, prompting his initial choice to enter the regression cycle.",
    align: "right",
  },
  {
    id: "olympus-prophecy",
    text: "Incarnation Kim Dokja will be killed by the person he loves most.",
    source: "Fate System Announcement",
    speaker: "Giant Nebula Olympus / Fate System",
    tone: "blood",
    canonStatus: "verified_canon",
    chapterCitation: "Webnovel Chapter 188 (Episode 36 — Horizon of the Story, IV)",
    spoilerLevel: "demon_realm",
    contextNote: "The tragic Fate announced by the system during the Dark Castle climax, culminating in Kim Dokja's sacrifice to clear the 10th scenario.",
    align: "left",
  },
  {
    id: "promotional-premise",
    text: "The person who read the story is now living inside it. The ending? Only he knows.",
    source: "Official Serialization Premise",
    speaker: "Serialization Tagline",
    tone: "icy",
    canonStatus: "paraphrase",
    chapterCitation: "Webtoon Official English Serialization Blurb (LINE Webtoon / Webnovel)",
    spoilerLevel: "early_scenarios",
    contextNote: "Official English promotional blurb summarizing the reader's journey in the Star Stream.",
    align: "center",
  },
  {
    id: "writer-never-abandons",
    text: "I am a writer. And a writer never abandons the story they started.",
    source: "Han Sooyoung (The Author's Vow)",
    speaker: "Han Sooyoung",
    tone: "gold",
    canonStatus: "paraphrase",
    chapterCitation: "Webnovel Chapter 538 (Epilogue 2 — Not Found, IV)",
    spoilerLevel: "endgame_novel",
    contextNote: "Han Sooyoung's reflection across worldlines while authoring 'Three Ways to Survive in a Ruined World' to save Kim Dokja.",
    align: "right",
  },
  {
    id: "story-hasnt-ended",
    text: "If I am the only one who remembers this story, then this story hasn't ended.",
    source: "Kim Dokja (The Reader's Conviction)",
    speaker: "Kim Dokja",
    tone: "icy",
    canonStatus: "paraphrase",
    chapterCitation: "Webnovel Chapter 551 (Epilogue 5 — The Eternal Chapter)",
    spoilerLevel: "endgame_novel",
    contextNote: "Dokja's reflection on the purpose of being a reader and carrying the memory of the story forward.",
    align: "center",
  },
  {
    id: "1863-regressions",
    text: "There are 1,863 regressions in this story. This is the one that matters.",
    source: "Fan Reflection on Yoo Joonghyuk's Cycle",
    speaker: "Community Synthesis",
    tone: "gold",
    canonStatus: "fan_interpretation",
    spoilerLevel: "early_scenarios",
    contextNote: "A widely shared reader community synthesis celebrating the 3rd regression turn breaking Yoo Joonghyuk's endless cycle.",
    align: "right",
  },
  {
    id: "remembered-power",
    text: "A constellation's power comes from being remembered. A reader's power comes from remembering.",
    source: "Fan Reflection on the Star Stream",
    speaker: "Community Synthesis",
    tone: "icy",
    canonStatus: "fan_interpretation",
    spoilerLevel: "early_scenarios",
    contextNote: "A popular reader community reflection synthesizing the narrative metaphysics of Fables, Constellations, and Readers in ORV.",
    align: "center",
  },
];
