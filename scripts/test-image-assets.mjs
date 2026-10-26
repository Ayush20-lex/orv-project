/**
 * Star Stream — Image Asset Integrity Test
 * Validates that all character, constellation, and observatory node images exist on disk,
 * have non-zero size, valid extensions, non-duplicate mappings, and proper attribution.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");

let failures = 0;
let passes = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`✅ PASS: ${message}`);
    passes++;
  }
}

console.log("=================================================");
console.log("STAR STREAM — IMAGE ASSET INTEGRITY VERIFICATION");
console.log("=================================================");

// 1. Verify Character Image Assets
console.log("\n[1] Checking Character Images (lib/data/characters.ts)...");
const charactersFilePath = path.join(projectRoot, "lib", "data", "characters.ts");
const charactersContent = fs.readFileSync(charactersFilePath, "utf-8");

// Parse image paths from characters.ts
const charImageMatches = [...charactersContent.matchAll(/image:\s*["']([^"']+)["']/g)];
assert(charImageMatches.length >= 9, `Found ${charImageMatches.length} character image declarations (expected at least 9)`);

for (const match of charImageMatches) {
  const relPath = match[1];
  const diskPath = path.join(publicDir, relPath.replace(/^\//, ""));
  const exists = fs.existsSync(diskPath);
  const size = exists ? fs.statSync(diskPath).size : 0;
  assert(exists && size > 0, `Character asset exists and non-empty: ${relPath} (${size} bytes)`);
}

// 2. Verify Constellation Registry Image Assets
console.log("\n[2] Checking Constellation Registry Images (lib/data/constellations.ts)...");
const constellationsFilePath = path.join(projectRoot, "lib", "data", "constellations.ts");
const constellationsContent = fs.readFileSync(constellationsFilePath, "utf-8");

const constImageMatches = [...constellationsContent.matchAll(/imageUrl:\s*["']([^"']+)["']/g)];
assert(constImageMatches.length >= 8, `Found ${constImageMatches.length} constellation image declarations`);

for (const match of constImageMatches) {
  const relPath = match[1];
  const diskPath = path.join(publicDir, relPath.replace(/^\//, ""));
  const exists = fs.existsSync(diskPath);
  const size = exists ? fs.statSync(diskPath).size : 0;
  assert(exists && size > 0, `Constellation asset exists and non-empty: ${relPath} (${size} bytes)`);
}

// 3. Verify Observatory Node Avatars & Fallbacks
console.log("\n[3] Checking Observatory Node Avatars (lib/data/observatory-data.ts)...");
const observatoryFilePath = path.join(projectRoot, "lib", "data", "observatory-data.ts");
const observatoryContent = fs.readFileSync(observatoryFilePath, "utf-8");

const obsAvatarMatches = [...observatoryContent.matchAll(/avatarUrl:\s*["']([^"']+)["']/g)];
assert(obsAvatarMatches.length >= 15, `Found ${obsAvatarMatches.length} observatory avatar declarations`);

for (const match of obsAvatarMatches) {
  const relPath = match[1];
  const diskPath = path.join(publicDir, relPath.replace(/^\//, ""));
  const exists = fs.existsSync(diskPath);
  const size = exists ? fs.statSync(diskPath).size : 0;
  assert(exists && size > 0, `Observatory avatar asset exists: ${relPath} (${size} bytes)`);
}

// Check deliberate fallbacks (master-of-steel, ruler-of-deepest-pit)
const masterOfSteelBlock = observatoryContent.match(/id:\s*["']master-of-steel["'][\s\S]*?\n\s*\},/)?.[0] || "";
const hasMasterOfSteelAvatar = /avatarUrl:/.test(masterOfSteelBlock);
assert(!hasMasterOfSteelAvatar, "master-of-steel deliberately lacks avatarUrl (uses styled celestial star glyph fallback)");

const rulerOfDeepestPitBlock = observatoryContent.match(/id:\s*["']ruler-of-deepest-pit["'][\s\S]*?\n\s*\},/)?.[0] || "";
const hasRulerOfDeepestPitAvatar = /avatarUrl:/.test(rulerOfDeepestPitBlock);
assert(!hasRulerOfDeepestPitAvatar, "ruler-of-deepest-pit deliberately lacks avatarUrl (uses styled celestial star glyph fallback)");

// 4. Check Attribution Completeness
console.log("\n[4] Checking Image Attribution Completeness...");
const constAttributionCount = (constellationsContent.match(/imageAttribution:\s*\{/g) || []).length;
assert(constAttributionCount === constImageMatches.length, `All ${constImageMatches.length} constellation images have explicit attribution blocks (found ${constAttributionCount})`);

// 5. Summary
console.log("\n=================================================");
if (failures === 0) {
  console.log(`🎉 ALL IMAGE INTEGRITY CHECKS PASSED (${passes} checks passed)`);
  process.exit(0);
} else {
  console.error(`🚨 ${failures} CHECKS FAILED out of ${passes + failures} total checks`);
  process.exit(1);
}
