# STAR STREAM — MARKDOWN DOCUMENTATION INVENTORY
**Date:** October 26, 2026
**Branch:** `chore/dead-code-cleanup`
**Purpose:** Complete catalog and index of active and archived project documentation

---

## 1. Documentation Organization Overview

During Phases 1 through 5, a series of in-depth audit reports, verification signoffs, accessibility analyses, and design studies were created to record decisions and verification evidence.

To maintain a clean repository root while preserving 100% of the project's historical knowledge, all 23 completed milestone and technical reports were relocated to `docs/archive/phase-reports/` using Git renames (`git mv`).

Zero documentation files were destroyed.

---

## 2. Active Markdown Documents Retained at the Repository Root

| File | Purpose | Status | Key Contents |
| :--- | :--- | :--- | :--- |
| [`README.md`](file:///c:/Users/ayush/OneDrive/Desktop/orv_project/kim_project/README.md) | Primary project readme | **ACTIVE** | Introduction to Star Stream, feature breakdown, tech stack, local installation instructions, contribution guide, and comprehensive documentation index. |
| [`DEAD_CODE_CLEANUP_REPORT.md`](file:///c:/Users/ayush/OneDrive/Desktop/orv_project/kim_project/DEAD_CODE_CLEANUP_REPORT.md) | Maintenance & cleanup report | **ACTIVE** | Audit methodology, verified dead code removals (`button.tsx`), unreferenced asset deletions, pruned dependencies, and regression test proofs. |
| [`MARKDOWN_DOCUMENTATION_INVENTORY.md`](file:///c:/Users/ayush/OneDrive/Desktop/orv_project/kim_project/MARKDOWN_DOCUMENTATION_INVENTORY.md) | Documentation index (this file) | **ACTIVE** | Complete categorized directory mapping of all root and archived Markdown documents. |

---

## 3. Documents Relocated to Archive (`docs/archive/phase-reports/`)

All 23 historical documents have been organized into `docs/archive/phase-reports/`:

### Initial Audits & Planning
1. **`ORV_AUDIT.md`:** Initial codebase audit documenting baseline architecture, component breakdown, accessibility gaps, and memory/WebGL lifecycle risks.
2. **`ORV_ROADMAP.md`:** Multi-phase master engineering plan across correctness, accessibility, performance, Observatory development, and production hardening.

### Phase 1 — Canon Correctness & Content Trust
3. **`PHASE_1_CANON_SIGNOFF.md`:** Signoff report verifying Munpia webnovel chapter citations for characters, constellations, and scenarios.
4. **`PHASE_1_CHECKPOINT_REPORT.md`:** Checkpoint review of mathematical scoring engine and character dataset extraction.
5. **`PHASE_1_FINAL_DATA_FIX_REPORT.md`:** Analysis resolving skills vs. fables distinctions (e.g., Han Sooyoung's *Avatar* vs. *Predictive Plagiarism*).
6. **`PHASE_1_FINAL_REVIEW.md`:** Cross-document reconciliation report.
7. **`PHASE_1_VERIFICATION_REPORT.md`:** Initial test run output and verification matrix.

### Phase 2 — Accessibility & Interaction Standards
8. **`PHASE_2_ACCESSIBILITY_SIGNOFF.md`:** Formal accessibility signoff verifying WCAG 2.1 AA conformance and W3C APG dialog standards.
9. **`PHASE_2_CHECKPOINT_REPORT.md`:** Comprehensive 1,468-line accessibility audit covering keyboard traps, roving tabIndex, contrast, and focus management.
10. **`PHASE_2_FINAL_REVIEW.md`:** Final review of modal dialog accessibility across desktop and mobile screens.

### Phase 3 — Performance & Bundle Optimization
11. **`PHASE_3_PERFORMANCE_REPORT.md`:** Analysis of dynamic client imports, elimination of redundant Three.js StarOrb registrations, image element migrations, and zero-warning build achievements.

### Phase 4 — Constellation Observatory & Visual Refinement
12. **`PHASE_4_REFERENCE_STUDY.md`:** Visual analysis of real-world celestial star atlases (Zenith Viewer, Stellarium, ESA Star Mapper, NASA Eyes).
13. **`PHASE_4_CHECKPOINT_REPORT.md`:** Initial SVG/2D canvas architecture evaluation.
14. **`PHASE_4B_VISUAL_DIRECTION_REPORT.md`:** Visual direction guidelines balancing sci-fi holographic elements with celestial mythos.
15. **`PHASE_4C_ATLAS_CORRECTION_REPORT.md`:** Correction audit removing legacy mock data and standardizing on the unified 18-node relationship graph.
16. **`PHASE_4_VISUAL_REFINEMENT_REPORT.md`:** Full engineering report detailing the high-performance 2D Canvas Star Atlas implementation.
17. **`STAR_STREAM_ATLAS_CONCEPTS.md`:** Three visual concepts exploration and static switcher documentation.
18. **`STAR_STREAM_FINAL_ATLAS_IMPLEMENTATION_REPORT.md`:** Deliverable report verifying pan/zoom gestures, nebula filtering, and node interaction performance.

### Visual Cohesion & Typography Unification
19. **`STAR_STREAM_TYPOGRAPHY_REPORT.md`:** Typography hierarchy audit standardizing on Instrument Serif, Plus Jakarta Sans, JetBrains Mono, and selective Orbitron.
20. **`STAR_STREAM_VISUAL_COHESION_REPORT.md`:** Fixes for the homepage hero-to-story seam and monospace styling balance.

### Image Repair & Artwork Provenance
21. **`STAR_STREAM_IMAGE_REPAIR_REPORT.md`:** Audit identifying character crop issues and initial constellation artwork integration.
22. **`STAR_STREAM_ARTWORK_PROVENANCE_REPORT.md`:** Provenance and rights verification of all 9 constellation assets, distinguishing official webnovel illustrations, webtoon panels, and unverified fan works.

### Phase 5 — Production Readiness & Quality Assurance
23. **`PHASE_5_PRODUCTION_READINESS_REPORT.md`:** Final production readiness signoff, covering universal footer disclaimer, route metadata/SEO (`robots.txt`, `sitemap.xml`), canvas PNG export fix (`skipFonts: true`), and `/api/save-asset` removal.

---

## 4. Cross-Reference Management & Link Integrity

- **Root `README.md` Index:** Updated with explicit Markdown links pointing to the key final report for each phase inside `docs/archive/phase-reports/`.
- **Intra-Archive References:** Because all 23 historical reports were moved together into the same directory (`docs/archive/phase-reports/`), internal relative links between reports remain functionally intact within the archive folder.
- **Automated Test Scripts:** None of the 3 automated test scripts (`test-image-assets.mjs`, `test-observatory-data.mjs`, `test-builder-scoring.mjs`) have dependencies on Markdown files; they execute strictly against TypeScript data modules (`lib/data/*.ts`) and public assets.

---

## 5. Duplicate Removal & Retention Notes

- **Duplicates Removed:** Zero textual reports were deleted. Reports represent progressive checkpoints across the project's engineering lifecycle. Grouping them inside `docs/archive/phase-reports/` preserves the entire audit trail without root clutter.
- **Documents Requiring Future Manual Decisions:** None. All historical documents are archived and indexed.
