// Unit test for Star Stream Incarnation Builder scoring logic
import {
  INITIAL_BUILDER_SCORES,
  calculateUpdatedScores,
  resolveDominantTone,
  generateIncarnationResult,
} from "../lib/builder-scoring.ts";

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✓ PASSED: ${message}`);
}

console.log("=== Testing Incarnation Builder Scoring Engine ===");

// Test 1: Initial state
assert(
  INITIAL_BUILDER_SCORES.str === 10 &&
  INITIAL_BUILDER_SCORES.agi === 10 &&
  INITIAL_BUILDER_SCORES.end === 10 &&
  INITIAL_BUILDER_SCORES.mana === 10,
  "Initial stats start at base 10"
);

// Test 2: Accumulating 3 answers sequentially
const answer1 = { tone: "blood", str: 20, agi: 15, end: 5, mana: 0 };
const answer2 = { tone: "icy", str: 25, agi: 5, end: 30, mana: 10 };
const answer3 = { tone: "blood", str: 40, agi: 20, end: 20, mana: 5 };

const scores1 = calculateUpdatedScores(INITIAL_BUILDER_SCORES, answer1);
const scores2 = calculateUpdatedScores(scores1, answer2);
const finalScores = calculateUpdatedScores(scores2, answer3);

// Verify that answer 3 is explicitly present in stats:
// str: 10 + 20 + 25 + 40 = 95
assert(finalScores.str === 95, `Final STR reflects all 3 answers (expected 95, got ${finalScores.str})`);
// agi: 10 + 15 + 5 + 20 = 50
assert(finalScores.agi === 50, `Final AGI reflects all 3 answers (expected 50, got ${finalScores.agi})`);
// end: 10 + 5 + 30 + 20 = 65
assert(finalScores.end === 65, `Final END reflects all 3 answers (expected 65, got ${finalScores.end})`);
// mana: 10 + 0 + 10 + 5 = 25
assert(finalScores.mana === 25, `Final MANA reflects all 3 answers (expected 25, got ${finalScores.mana})`);

// Tone check: blood: 2, icy: 1, gold: 0 -> blood
const { tone } = resolveDominantTone(finalScores);
assert(tone === "blood", `Dominant tone resolved to 'blood' (got ${tone})`);

// Result generation check
const result = generateIncarnationResult("Kim Dokja", finalScores);
assert(result.name === "Kim Dokja", "Name preserved in result");
assert(result.tone === "blood", "Tone in result is blood");
assert(result.modifier === "[Blade of the Ruined World]", "Modifier derived from Vanguard archetype");
assert(result.sponsor === "Master of Steel", "Sponsor derived from Vanguard archetype");
assert(result.stats.includes("STR: 95"), "Result stats string includes correct calculated STR");
assert(result.isFanCreated === true, "Result clearly identified as fan-created");

// Test 3: Deterministic tie-breaking
// 1 of each tone (blood, icy, gold)
const tieScores = {
  blood: 1,
  icy: 1,
  gold: 1,
  str: 40, // high str
  agi: 10,
  end: 10,
  mana: 10,
};
const tieResult = resolveDominantTone(tieScores);
assert(tieResult.tone === "blood", "Three-way tie broken toward 'blood' due to high STR dominance");

console.log("=== All Builder Scoring Tests Passed Successfully! ===");
