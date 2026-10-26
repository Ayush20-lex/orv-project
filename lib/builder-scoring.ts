/**
 * Star Stream Incarnation Builder — Scoring & Archetype Derivation Engine
 *
 * This module provides pure, deterministic calculation functions for the
 * Incarnation Registration assessment. Score calculations are decoupled from
 * React component rendering to prevent race conditions and allow isolated testing.
 *
 * NOTE: This is an original fan-created personality experience.
 * Stats, sponsors, and modifiers generated here are thematic interpretations
 * and do not represent canonical ORV facts.
 */

export type BuilderTone = "icy" | "blood" | "gold";

export interface ScoreState {
  icy: number;
  blood: number;
  gold: number;
  str: number;
  agi: number;
  end: number;
  mana: number;
}

export interface QuizAnswerPoints {
  tone: BuilderTone;
  str: number;
  agi: number;
  end: number;
  mana: number;
}

export interface IncarnationResult {
  name: string;
  tone: BuilderTone;
  archetypeTitle: string;
  modifier: string;
  sponsor: string;
  personalAttribute: string;
  exclusiveSkills: string;
  stigma: string;
  stats: string;
  statBreakdown: {
    str: number;
    agi: number;
    end: number;
    mana: number;
  };
  dominantToneReason: string;
  isFanCreated: true;
}

export const INITIAL_BUILDER_SCORES: ScoreState = {
  icy: 0,
  blood: 0,
  gold: 0,
  str: 10,
  agi: 10,
  end: 10,
  mana: 10,
};

/**
 * Pure function: Given the current scores and points from an answer,
 * return a brand-new updated score object.
 */
export function calculateUpdatedScores(
  current: ScoreState,
  points: QuizAnswerPoints
): ScoreState {
  return {
    icy: current.icy + (points.tone === "icy" ? 1 : 0),
    blood: current.blood + (points.tone === "blood" ? 1 : 0),
    gold: current.gold + (points.tone === "gold" ? 1 : 0),
    str: current.str + points.str,
    agi: current.agi + points.agi,
    end: current.end + points.end,
    mana: current.mana + points.mana,
  };
}

/**
 * Deterministic tone resolution with tie-breaking rules.
 *
 * In the event of equal tone pick counts:
 * 1. If Blood and Icy tie:
 *    - Compare (STR + END) vs (AGI + MANA).
 *    - Higher physical toughness selects 'blood'; higher mental/mobility selects 'icy'.
 * 2. If Blood and Gold tie:
 *    - Compare STR vs MANA.
 * 3. If Icy and Gold tie:
 *    - Compare END vs AGI.
 * 4. In a three-way tie:
 *    - If STR is highest: 'blood'.
 *    - If MANA is highest: 'gold'.
 *    - Default fallback: 'icy' (The Reader archetype).
 */
export function resolveDominantTone(scores: ScoreState): {
  tone: BuilderTone;
  reason: string;
} {
  const { icy, blood, gold, str, agi, end, mana } = scores;

  // Clear single winner
  if (blood > icy && blood > gold) {
    return {
      tone: "blood",
      reason: "Prioritized decisive physical action, combat survival, and unyielding will.",
    };
  }
  if (icy > blood && icy > gold) {
    return {
      tone: "icy",
      reason: "Prioritized calculated observation, collective survival, and strategic foresight.",
    };
  }
  if (gold > blood && gold > icy) {
    return {
      tone: "gold",
      reason: "Prioritized celestial awareness, ambitious gambles, and high-stakes rewards.",
    };
  }

  // 2-way tie: Blood vs Icy
  if (blood === icy && blood > gold) {
    const physical = str + end;
    const tactical = agi + mana;
    if (physical >= tactical) {
      return {
        tone: "blood",
        reason: "Tied between Combat and Strategy; resolved toward Vanguard due to higher physical resilience.",
      };
    }
    return {
      tone: "icy",
      reason: "Tied between Combat and Strategy; resolved toward Reader due to superior tactical reserves.",
    };
  }

  // 2-way tie: Blood vs Gold
  if (blood === gold && blood > icy) {
    if (str >= mana) {
      return {
        tone: "blood",
        reason: "Tied between Combat and Opportunity; resolved toward Vanguard due to raw strength dominance.",
      };
    }
    return {
      tone: "gold",
      reason: "Tied between Combat and Opportunity; resolved toward Sovereign due to mana affinity.",
    };
  }

  // 2-way tie: Icy vs Gold
  if (icy === gold && icy > blood) {
    if (end >= agi) {
      return {
        tone: "icy",
        reason: "Tied between Strategy and Opportunity; resolved toward Reader due to defensive composure.",
      };
    }
    return {
      tone: "gold",
      reason: "Tied between Strategy and Opportunity; resolved toward Sovereign due to evasive maneuverability.",
    };
  }

  // 3-way tie (1 pick each)
  if (str > mana && str > agi) {
    return {
      tone: "blood",
      reason: "Equally balanced choices; aligned with Vanguard by predominant martial stat.",
    };
  }
  if (mana > str && mana > end) {
    return {
      tone: "gold",
      reason: "Equally balanced choices; aligned with Sovereign by predominant arcane stat.",
    };
  }

  return {
    tone: "icy",
    reason: "Equally balanced choices; aligned with Reader as the foundational scenario archetype.",
  };
}

/**
 * Archetype definition matrix: Maps the calculated dominant tone and
 * stat profile to an intentional, explainable ORV-flavor persona.
 */
interface ArchetypePreset {
  title: string;
  modifier: string;
  sponsor: string;
  personalAttribute: string;
  exclusiveSkills: string;
  stigma: string;
}

const ARCHETYPES: Record<BuilderTone, ArchetypePreset> = {
  blood: {
    title: "Iron Vanguard",
    modifier: "[Blade of the Ruined World]",
    sponsor: "Master of Steel",
    personalAttribute: "Iron-Blooded Vanguard (Hero)",
    exclusiveSkills: "Weapon Mastery, Instant Counter, Iron Skin",
    stigma: "Great Mountain Push (Lv. 1)",
  },
  icy: {
    title: "Scenario Strategist",
    modifier: "[Reader of the Hidden Path]",
    sponsor: "Secretive Plotter",
    personalAttribute: "Scenario Interpreter (Rare)",
    exclusiveSkills: "Fourth Wall, Reading Comprehension, Danger Sense",
    stigma: "Will to Live (Lv. 1)",
  },
  gold: {
    title: "Nebula Sovereign",
    modifier: "[Architect of the False Stage]",
    sponsor: "Prisoner of the Golden Headband",
    personalAttribute: "Desperate Gambler (Rare)",
    exclusiveSkills: "Diverse Communication, Taming, Coin Alchemy",
    stigma: "Somersault Cloud (Lv. 1)",
  },
};

/**
 * Pure generator: takes final synchronous scores and player name,
 * returning a complete, deterministic IncarnationResult.
 */
export function generateIncarnationResult(
  name: string,
  finalScores: ScoreState
): IncarnationResult {
  const { tone, reason } = resolveDominantTone(finalScores);
  const preset = ARCHETYPES[tone];
  const sanitizedName = name.trim() || "Nameless Incarnation";

  return {
    name: sanitizedName,
    tone,
    archetypeTitle: preset.title,
    modifier: preset.modifier,
    sponsor: preset.sponsor,
    personalAttribute: preset.personalAttribute,
    exclusiveSkills: preset.exclusiveSkills,
    stigma: preset.stigma,
    stats: `STR: ${finalScores.str} | AGI: ${finalScores.agi} | END: ${finalScores.end} | Mana: ${finalScores.mana}`,
    statBreakdown: {
      str: finalScores.str,
      agi: finalScores.agi,
      end: finalScores.end,
      mana: finalScores.mana,
    },
    dominantToneReason: reason,
    isFanCreated: true,
  };
}
