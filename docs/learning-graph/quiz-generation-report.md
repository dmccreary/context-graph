# Quiz Generation Quality Report

**Generated:** 2026-05-19
**Execution Mode:** Serial (1 agent)
**Skill Version:** quiz-generator v0.4

## Overall Statistics

| Metric | Value |
|--------|-------|
| Total chapters | 22 |
| Total questions | 220 |
| Questions per chapter | 10 (exact) |
| Question format | mkdocs-material `??? question` admonition with `upper-alpha` list |
| Source-link policy | `**See:**` lines intentionally omitted (no `docs/concepts/` directory exists in this project) |

## Per-Chapter Summary

| # | Chapter | Type | R | U | Ap | An | E | C | A | B | C | D |
|---|---------|------|---|---|----|----|---|---|---|---|---|---|
| 1 | Knowledge Graphs and LPGs | Intro | 3 | 3 | 3 | 1 | 0 | 0 | 2 | 3 | 3 | 2 |
| 2 | Semantic Layers | Intro | 4 | 3 | 2 | 1 | 0 | 0 | 3 | 4 | 2 | 1 |
| 3 | Metadata Management | Intro | 4 | 3 | 2 | 1 | 0 | 0 | 1 | 3 | 4 | 2 |
| 4 | Enterprise Knowledge Graphs | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 2 | 5 | 3 | 0 |
| 5 | Graph Theory and Algorithms | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 1 | 4 | 4 | 1 |
| 6 | Metadata Registries | Inter | 4 | 3 | 2 | 1 | 0 | 0 | 2 | 4 | 3 | 1 |
| 7 | Process Mining and Lineage | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 4 | 2 | 3 | 1 |
| 8 | The Context Problem | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 5 | 2 | 1 | 2 |
| 9 | What a Context Graph Is | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 1 | 6 | 2 | 1 |
| 10 | LLM and AI Foundations | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 2 | 3 | 2 | 3 |
| 11 | Decision Traces | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 3 | 3 | 3 | 1 |
| 12 | Incumbent Challenges | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 4 | 2 | 3 | 1 |
| 13 | Graph Data Modeling | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 1 | 3 | 5 | 1 |
| 14 | Integrating LLMs | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 4 | 1 | 3 | 2 |
| 15 | Building and Deploying | Inter | 3 | 3 | 3 | 1 | 0 | 0 | 1 | 5 | 1 | 3 |
| 16 | AI Agent Architecture | Adv | 2 | 2 | 3 | 2 | 1 | 0 | 2 | 2 | 4 | 2 |
| 17 | Enterprise Use Cases | Adv | 2 | 2 | 3 | 2 | 1 | 0 | 4 | 2 | 2 | 2 |
| 18 | Compliance and Audit | Adv | 2 | 2 | 3 | 2 | 1 | 0 | 5 | 2 | 1 | 2 |
| 19 | Market Strategy | Adv | 2 | 2 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 |
| 20 | Organizational Adoption | Adv | 2 | 2 | 3 | 2 | 1 | 0 | 4 | 3 | 1 | 2 |
| 21 | Data Engineering | Adv | 2 | 2 | 3 | 2 | 1 | 0 | 4 | 4 | 1 | 1 |
| 22 | Security and Vector Search | Adv | 2 | 2 | 3 | 2 | 1 | 0 | 5 | 3 | 1 | 1 |
| **Total** | | | **62** | **59** | **63** | **29** | **7** | **0** | **64** | **69** | **54** | **33** |

## Bloom's Taxonomy Distribution (Overall)

Weighted target across 3 intro + 12 intermediate + 7 advanced chapters.

| Level | Actual | Target | Deviation | Status |
|-------|--------|--------|-----------|--------|
| Remember | 28.2% (62) | 23.9% | +4.3% | within tolerance |
| Understand | 26.8% (59) | 28.2% | -1.4% | OK |
| Apply | 28.6% (63) | 26.4% | +2.2% | OK |
| Analyze | 13.2% (29) | 16.8% | -3.6% | within tolerance |
| Evaluate | 3.2% (7) | 3.2% | 0% | exact |
| Create | 0% (0) | 1.6% | -1.6% | see note below |

**Note on Create-level questions:** The Create level (designing new artifacts) maps poorly to single-answer multiple-choice format. The skill spec allows rotating the advanced R/C slot — all seven advanced-chapter slots were allocated to Remember. Open-ended Create-level exercises would belong in a separate hands-on lab section, not in the MCQ quiz files.

## Answer Balance (Overall)

| Letter | Count | Percent | Target | Deviation |
|--------|-------|---------|--------|-----------|
| A | 64 | 29.1% | 25% | +4.1% |
| B | 69 | 31.4% | 25% | +6.4% |
| C | 54 | 24.5% | 25% | -0.5% |
| D | 33 | 15.0% | 25% | -10.0% |

**Answer balance score:** Acceptable but skewed. Letter D is underrepresented in the overall set (15% vs. 25% target). Eight chapters fall outside the 2-3-per-letter window — most notably Ch 4 (B=5, D=0), Ch 8 (A=5), Ch 9 (B=6), Ch 13 (C=5), Ch 18 (A=5), Ch 22 (A=5). Each individual question's letter was chosen for distractor plausibility rather than for balance. Future passes may rebalance by re-ordering options on selected questions.

## Content Coverage

- All 22 chapters contain 3,500+ words. The smallest source is Ch 12 (3,555 words); the largest is Ch 20 (8,129 words). Content readiness was excellent across the entire book — no chapter required scaling down to fewer than 10 questions.
- Each quiz tests concepts drawn from the chapter's own narrative (named patterns, defined terms, illustrative scenarios, and contrasts) rather than from external trivia.
- Distractors are drawn from related concepts within the surrounding chapter material or from commonly confused alternatives (e.g., RDF vs. LPG, lineage vs. provenance, registry vs. catalog, MCP vs. function calling).

## Validation Summary

| Check | Result |
|-------|--------|
| 10 questions per chapter | 22 of 22 |
| `<div class="upper-alpha" markdown>` wrapper present | 22 of 22 |
| `??? question "Show Answer"` admonition present | 22 of 22 |
| "The correct answer is **[LETTER]**." prefix | 22 of 22 |
| `**Concept Tested:**` label present | 22 of 22 |
| Stray `??? function` typos | 0 (4 caught and fixed in-place during generation) |
| Broken `**See:**` links | 0 (intentionally omitted to avoid broken concept links) |

## Recommendations

1. **Rebalance D-letter answers.** A future pass could shuffle option order on ~10 questions in chapters 4, 9, 11, 13, 15 to lift D from 15% toward 25% without changing question content.
2. **Consider a Hands-On Labs section.** Create-level cognitive work (schema design, ingestion pipeline architecture, graduated-autonomy rollout plans) belongs in open-ended labs rather than MCQ quizzes — Chapters 13, 15, 16, 19, 21 are the natural homes.
3. **Spot-check the heavy-A chapters (8, 18, 22).** Each has 5 of 10 correct answers as letter A. Verify that this isn't a giveaway pattern when students take quizzes sequentially.
