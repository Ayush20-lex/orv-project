import {
  OBSERVATORY_NODES,
  OBSERVATORY_EDGES,
  getFilteredObservatoryGraph,
  getNodeById,
  getEdgeById,
  getConnectedEdgesForNode,
  getConnectedNeighborIds,
} from "../lib/data/observatory-data.ts";

function runTests() {
  console.log("=== Testing Constellation Observatory Data Model & Integrity ===");
  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`✓ PASSED: ${message}`);
      passed++;
    } else {
      console.error(`✗ FAILED: ${message}`);
      process.exitCode = 1;
    }
  }

  // 1. Basic node and edge counts
  assert(OBSERVATORY_NODES.length >= 16, `Total nodes must be at least 16 (got ${OBSERVATORY_NODES.length})`);
  assert(OBSERVATORY_EDGES.length >= 20, `Total edges must be at least 20 (got ${OBSERVATORY_EDGES.length})`);

  // 2. Node uniqueness
  const nodeIds = new Set();
  let duplicateNodes = 0;
  OBSERVATORY_NODES.forEach((n) => {
    if (nodeIds.has(n.id)) duplicateNodes++;
    nodeIds.add(n.id);
  });
  assert(duplicateNodes === 0, `All node IDs must be strictly unique (found ${duplicateNodes} duplicates)`);

  // 3. Edge references validity
  let invalidSourceOrTarget = 0;
  let selfLoops = 0;
  const edgeKeys = new Set();
  let duplicateEdges = 0;

  OBSERVATORY_EDGES.forEach((e) => {
    if (!nodeIds.has(e.source) || !nodeIds.has(e.target)) {
      invalidSourceOrTarget++;
    }
    if (e.source === e.target) {
      selfLoops++;
    }
    const key = `${e.source}__${e.target}__${e.type}`;
    if (edgeKeys.has(key)) {
      duplicateEdges++;
    }
    edgeKeys.add(key);
  });

  assert(invalidSourceOrTarget === 0, `All edge endpoints must exist in nodes (found ${invalidSourceOrTarget} broken references)`);
  assert(selfLoops === 0, `No self-loop edges allowed (found ${selfLoops})`);
  assert(duplicateEdges === 0, `No duplicate edges with same source, target, and type (found ${duplicateEdges})`);

  // 4. Citation and metadata completeness
  let missingCitation = 0;
  let missingStatus = 0;
  OBSERVATORY_NODES.forEach((n) => {
    if (!n.chapterCitation || n.chapterCitation.trim() === "") missingCitation++;
    if (!n.canonStatus) missingStatus++;
  });
  OBSERVATORY_EDGES.forEach((e) => {
    if (!e.chapterCitation || e.chapterCitation.trim() === "") missingCitation++;
    if (!e.canonStatus) missingStatus++;
  });
  assert(missingCitation === 0, `Every node and edge must have a valid chapter citation (found ${missingCitation} missing)`);
  assert(missingStatus === 0, `Every node and edge must have a canon status (found ${missingStatus} missing)`);

  // 5. Spoiler Guardian filtering test
  const safeGraph = getFilteredObservatoryGraph({
    spoilerUnlocked: false,
    mode: "all",
    entityFilter: "all",
  });

  const endgameNodesInSafe = safeGraph.nodes.filter((n) => n.spoilerLevel === "endgame_novel");
  const endgameEdgesInSafe = safeGraph.edges.filter((e) => e.spoilerLevel === "endgame_novel");

  assert(endgameNodesInSafe.length === 0, `Safe mode must contain zero endgame nodes (found ${endgameNodesInSafe.length})`);
  assert(endgameEdgesInSafe.length === 0, `Safe mode must contain zero endgame edges (found ${endgameEdgesInSafe.length})`);

  // 6. Spoiler Unlocked mode
  const unlockedGraph = getFilteredObservatoryGraph({
    spoilerUnlocked: true,
    mode: "all",
    entityFilter: "all",
  });
  assert(unlockedGraph.nodes.length === OBSERVATORY_NODES.length, `Unlocked mode includes all ${OBSERVATORY_NODES.length} nodes (got ${unlockedGraph.nodes.length})`);
  assert(unlockedGraph.edges.length === OBSERVATORY_EDGES.length, `Unlocked mode includes all ${OBSERVATORY_EDGES.length} edges (got ${unlockedGraph.edges.length})`);

  // 7. Exploration Modes
  const sponsorsGraph = getFilteredObservatoryGraph({
    spoilerUnlocked: true,
    mode: "sponsors",
    entityFilter: "all",
  });
  const nonSponsorEdges = sponsorsGraph.edges.filter((e) => e.type !== "sponsor");
  assert(nonSponsorEdges.length === 0, `Sponsors mode must contain strictly sponsor edges (found ${nonSponsorEdges.length} non-sponsor)`);
  assert(sponsorsGraph.edges.length >= 6, `Sponsors mode has at least 6 verified sponsor links (got ${sponsorsGraph.edges.length})`);

  const companionsGraph = getFilteredObservatoryGraph({
    spoilerUnlocked: true,
    mode: "companions",
    entityFilter: "all",
  });
  const companionTypes = new Set(["companion", "master_disciple", "alliance"]);
  const invalidCompanionEdges = companionsGraph.edges.filter((e) => !companionTypes.has(e.type));
  assert(invalidCompanionEdges.length === 0, `Companions mode must contain only companion/alliance edges (found ${invalidCompanionEdges.length} invalid)`);

  // 8. Search resolution
  const searchDokja = getFilteredObservatoryGraph({
    spoilerUnlocked: false,
    mode: "all",
    entityFilter: "all",
    searchQuery: "Salvation",
  });
  assert(searchDokja.matchedNodeIds.has("kim-dokja"), `Searching 'Salvation' must match kim-dokja via modifier`);

  const searchUriel = getFilteredObservatoryGraph({
    spoilerUnlocked: false,
    mode: "all",
    entityFilter: "all",
    searchQuery: "Archangel",
  });
  assert(searchUriel.matchedNodeIds.has("demon-like-judge-of-fire"), `Searching 'Archangel' must match Uriel via subtitle/alias`);

  // 9. Connected node & edge helpers
  const dokjaEdges = getConnectedEdgesForNode("kim-dokja");
  assert(dokjaEdges.length >= 6, `Kim Dokja must be connected to at least 6 relationships (got ${dokjaEdges.length})`);

  const joonghyukNeighbors = getConnectedNeighborIds("yoo-joonghyuk");
  assert(joonghyukNeighbors.has("kim-dokja"), `Yoo Joonghyuk must have Kim Dokja as neighbor`);
  assert(joonghyukNeighbors.has("lee-jihye"), `Yoo Joonghyuk must have Lee Jihye as neighbor`);

  console.log(`=== Observatory Data Integrity Tests: ${passed}/${total} Passed ===`);
  if (passed !== total) {
    process.exit(1);
  }
}

runTests();
