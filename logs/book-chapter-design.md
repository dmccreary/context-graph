# Book Chapter Design Log

**Date:** 2026-05-18
**Textbook:** Context Graph: How Organizations Use LLMs Cost Effectively
**Skill:** book-chapter-generator
**Concepts:** 496 total across 22 chapters

---

## Input Resources

| Resource | Key Facts |
|---|---|
| `docs/course-description.md` | 18 numbered topics, audience: enterprise architects / AI practitioners / founders |
| `docs/learning-graph/learning-graph.json` | 496 nodes, 739 edges, 8 foundational concepts |
| `docs/learning-graph/concept-taxonomy.md` | 12 taxonomy categories (GRAPH, EKG, DATA, META, PROV, CNTX, DTRC, LLMI, BUILD, USE, COMP, INFRA) |
| `docs/learning-graph/learning-graph.csv` | 496 rows, `ConceptID,ConceptLabel,Dependencies,TaxonomyID` |

### Foundational Concepts (no prerequisites)

These 8 concepts anchor the DAG and must appear in the earliest possible chapters:

| ID | Label | First appears in |
|----|-------|-----------------|
| 4 | Node | Ch 1 |
| 5 | Edge | Ch 1 |
| 56 | Data Lake | Ch 2 |
| 81 | Metadata | Ch 3 |
| 132 | Event Log | Ch 7 |
| 157 | LLM Context Window | Ch 8 |
| 164 | Tacit Knowledge | Ch 8 |
| 457 | Large Language Model | Ch 10 |

### Edge Direction Validation

Confirmed: edges in `learning-graph.json` point **from dependent TO prerequisite** (dependency direction). Foundational concepts are simple building blocks (Node, Edge, Data Lake…), confirming the direction is correct. The prerequisite map was built as `prereqs[edge['from']].add(edge['to'])`.

---

## Sizing Constraints

| Parameter | Value | Reasoning |
|---|---|---|
| Course description topics | 18 | Natural starting skeleton |
| Cross-cutting concept sections | 5 (IDs 417–496) | Graph theory, data engineering, LLM foundations, security, vector search |
| Concepts in cross-cutting sections | 80 | 20 + 20 + 20 + 10 + 10 |
| Target concepts per chapter | 20–25 | Within skill's 8–25 acceptable range |
| Chapters needed at 25/ch | ~20 | 496 / 25 = 19.8 |
| Chapters needed at 20/ch | ~25 | 496 / 20 = 24.8 |
| **Final chapter count** | **22** | Accounts for 496 concepts (2.5× the typical 200-concept book) |

The skill guideline of "maximum 20 chapters" assumes ~200 concepts. At 496 concepts (near the 500-concept ceiling), 22 chapters is the correct scaling. 20 chapters would force several chapters above 28 concepts, creating unacceptable cognitive load.

---

## First-Pass Chapter Design (Naive)

The obvious first attempt mapped course topics 1–18 directly to chapters 1–18, then added four cross-cutting chapters at the end:

```
Ch 1–18:  Topics 1–18 in course order  (concepts 1–416)
Ch 19:    Advanced Graph Theory (417–436)
Ch 20:    LLM Foundations (457–476)
Ch 21:    Data Engineering (437–456)
Ch 22:    Security + Vector Search (477–496)
```

### First-Pass Violation Analysis

Running the dependency validator against this design revealed **13 violations** across five categories:

#### Category A — Ch 2 (Enterprise KGs) needs Ch 3 (Graph Theory): 5 violations

| Concept in Ch 2 | Needs | Concept in Ch 3 |
|---|---|---|
| Entity Resolution (28) | → | Named Entity Recognition (420) |
| Cross-System Entity Linking (43) | → | Information Extraction (421) |
| Cross-System Entity Linking (43) | → | Relation Extraction (422) |
| Knowledge Graph Quality (51) | → | Community Detection (428) |
| Knowledge Graph Quality (51) | → | Graph Clustering (431) |

Root cause: The CSV has additional dependencies beyond those in `generate-csv.py`. Specifically, the EKG concepts for entity resolution and cross-system linking were correctly made to depend on NLP/graph-algorithm concepts that belong to the cross-cutting Graph Theory section. These dependencies are pedagogically sound — you cannot understand entity resolution without NER, nor cross-system linking without information extraction.

#### Category B — Ch 5 (Metadata Management) needs Ch 22 (Security): 2 violations

| Concept in Ch 5 | Needs | Concept in Ch 22 |
|---|---|---|
| Policy Enforcement (100) | → | Data Anonymization (482) |
| Policy Enforcement (100) | → | Differential Privacy (481, 483) |

Root cause: Data policy enforcement depends on the privacy-preservation techniques it is meant to mandate. The dependency chain is: `94 (Metadata Stewardship) → 481 (Differential Privacy) → 482 (Federated Learning) → 483 (Privacy-Preserving Computation) → 100 (Policy Enforcement)`. All four prerequisites have their own prerequisites satisfied within or before Ch 5.

#### Category C — Ch 14 (LLM Integration) needs Ch 22 (Vector Search): 2 violations

| Concept in Ch 14 | Needs | Concept in Ch 22 |
|---|---|---|
| Hybrid Retrieval (267) | → | Sparse Retrieval (494) |
| Hybrid Retrieval (267) | → | BM25 (495) |

Root cause: Hybrid retrieval is dense + sparse. BM25 is the canonical sparse retrieval algorithm. These belong with the LLM integration chapter that introduces hybrid retrieval, not in a trailing infrastructure appendix.

#### Category D — Ch 15 (Building Systems) needs Ch 21 (Data Engineering): 1 violation

| Concept in Ch 15 | Needs | Concept in Ch 21 |
|---|---|---|
| Context Graph Observability (310) | → | Data Observability (441) |

Root cause: Context graph observability is a specialization of the general data observability pattern. The concept was placed in the "Building" chapter but its prerequisite lived in the "Data Engineering" cross-cutting chapter placed later.

#### Category E — Ch 18 (Compliance) needs Ch 22 (Security): 1 violation

| Concept in Ch 18 | Needs | Concept in Ch 22 |
|---|---|---|
| Compliance Gap Analysis (379) | → | AI Red Teaming (486) |

Root cause: Compliance gap analysis for AI systems requires red teaming as a prerequisite technique. Red teaming belongs with compliance audit, not in a trailing security appendix.

---

## Fixing Category A: The Enterprise KG / Graph Theory Dependency Tangle

This was the most complex violation because it involved a **cascade**: moving the graph algorithm concepts earlier caused *their* prerequisites to create new forward references.

### Option A.1 — Move Graph Theory chapter before Enterprise KGs

Rejected. Several graph theory concepts (421: Information Extraction, 435: Dublin Core Metadata) depend on `Metadata (81)`, which is in the Metadata Management topic. Metadata Management was originally Ch 5, so putting Graph Theory at Ch 3 would leave those concepts with forward dependencies into Ch 5.

### Option A.2 — Move entire Enterprise KG topic later (after metadata)

Partially correct, but the dependency chain cascade continued:
- Entity Resolution (28) → Named Entity Recognition (420) → Entity Node Pattern (27)
- 27 and 28 are both in Enterprise KGs; 420 is in Graph Theory
- Moving Enterprise KGs after Graph Theory still required 420 to precede 28, but 420 depends on 27 which is in Enterprise KGs

This created a **circular chapter requirement**: Enterprise KGs needs Graph Theory, and Graph Theory needs Enterprise KGs.

### Option A.3 (chosen) — Split Enterprise KGs and interleave Graph Theory

**Analysis of the dependency cascade from concept 28:**

```
27  (Entity Node Pattern)          → Ch 4 Enterprise KG Core
  └─ 420 (Named Entity Recognition) → Ch 5 Graph Theory + Advanced EKG
       └─ 28  (Entity Resolution)   → Ch 5 (moved from Ch 4)
            └─ 29  (MDM)            → Ch 5 (cascade)
                 └─ 30  (MDM Hub)   → Ch 5 (cascade)
            └─ 50  (Graph Catalog)  → Ch 5 (cascade)

26  (Enterprise Knowledge Graph)   → Ch 4
421 (Information Extraction)       → Ch 5 (needs 81 from Ch 3, 27 from Ch 4)
422 (Relation Extraction)          → Ch 5 (needs 421)
  └─ 43  (Cross-System Linking)    → Ch 5 (cascade)

428 (Community Detection)          → Ch 5
431 (Graph Clustering)             → Ch 5
  └─ 51  (KG Quality)              → Ch 5 (cascade)
```

**Concepts remaining in Ch 4 (Core Enterprise KGs):**
`26, 27, 31–42 (ex 43), 44–49, 52–55` = 24 concepts (all have dependencies only in Ch 1–3)

**Ch 5 composition (Graph Theory + Advanced EKG):**
`417–436` (20 graph algorithm concepts) + `28, 29, 30, 43, 50, 51` (6 advanced EKG concepts) = 26 concepts

**Prerequisites satisfied for Ch 5:**
- All 417–436 concepts depend only on Ch 1–4 concepts ✓
- 420 depends on 27 (Ch 4) ✓
- 421 depends on 81 (Ch 3) and 27 (Ch 4) ✓
- 422 depends on 421 (same chapter) ✓
- 28 depends on 27 (Ch 4) and 420 (same chapter) ✓
- 29, 30 depend on 28 (same chapter) ✓
- 43 depends on 28, 26, 421, 422 (all Ch 4 or same chapter) ✓
- 50 depends on 28 (same chapter) ✓
- 51 depends on 26 (Ch 4), 428, 431 (same chapter) ✓

This also required moving **Semantic Layers (56–80) and Metadata Management (81–102) before Enterprise Knowledge Graphs** in the chapter ordering, because Information Extraction (421) needs Metadata (81) before it can appear in Ch 5.

**Tradeoff accepted:** The chapter order now differs from the course-description topic order for the first five chapters. Pedagogically this is sound — students build up data infrastructure vocabulary (data lakes, metadata) before learning how enterprise knowledge graphs are constructed from that substrate.

---

## Fixing Categories B–E: Simple Concept Relocations

Once Category A was resolved, the remaining four violation categories were fixed by moving individual concepts to the chapter that needs them (or adjacent):

| Fix | Concept moved | From | To | Impact |
|---|---|---|---|---|
| B | Differential Privacy (481) | Ch 22 | Ch 3 | Ch 3: 22 → 25 concepts |
| B | Federated Learning (482) | Ch 22 | Ch 3 | (same row) |
| B | Privacy-Preserving Computation (483) | Ch 22 | Ch 3 | (same row) |
| C | Sparse Retrieval (494) | Ch 22 | Ch 14 | Ch 14: 25 → 27 concepts |
| C | BM25 (495) | Ch 22 | Ch 14 | (same row) |
| D | Context Graph Observability (310) | Ch 15 | Ch 21 | Ch 15: 25 → 24; Ch 21: 20 → 21 |
| E | AI Red Teaming (486) | Ch 22 | Ch 18 | Ch 18: 20 → 21 |

**Tradeoff for Fix B:** Differential Privacy, Federated Learning, and Privacy-Preserving Computation (481–483) are security/infrastructure concepts but they appear in Ch 3 (Metadata Management). This is actually pedagogically coherent — they contextualize why data governance policies like Policy Enforcement exist and what techniques they mandate.

**Tradeoff for Fix D:** Context Graph Observability (310) is a Building Systems concept but appears in Ch 21 (Data Engineering). This is a minor displacement; observability tools are inherently part of the data engineering stack, so the placement is defensible.

Ch 22 (Security, Privacy, and Vector Search) shrank to 14 concepts after these moves. This is below the "optimal 12–18" range but above the hard minimum of 8. The chapter remains coherent as a capstone on infrastructure security and vector search.

---

## Final Chapter Structure

| Ch | Title | Concepts | Concept IDs |
|----|-------|----------|-------------|
| 1  | Knowledge Graphs and Labeled Property Graphs | 25 | 1–25 |
| 2  | Semantic Layers for Data Lakes | 25 | 56–80 |
| 3  | Metadata Management | 25 | 81–102, 481–483 |
| 4  | Enterprise Knowledge Graphs — Core Patterns | 24 | 26–27, 31–42, 44–49, 52–55 |
| 5  | Graph Theory, Algorithms, and Advanced Enterprise KG | 26 | 417–436, 28–30, 43, 50–51 |
| 6  | Metadata Registries and ISO 11179 | 28 | 103–130 |
| 7  | Process Mining, Data Lineage, and Provenance | 25 | 131–155 |
| 8  | The Context Problem and RAG Limitations | 20 | 156–175 |
| 9  | What a Context Graph Is | 20 | 176–195 |
| 10 | LLM and AI Foundations | 20 | 457–476 |
| 11 | Decision Traces: Anatomy and LPG Patterns | 26 | 196–221 |
| 12 | Incumbent Challenges in Building Context Systems | 15 | 222–236 |
| 13 | Graph Data Modeling for Context | 25 | 237–261 |
| 14 | Integrating LLMs with Context Graphs | 27 | 262–286, 494–495 |
| 15 | Building and Deploying Context Graph Systems | 24 | 287–309, 311 |
| 16 | AI Agent Architecture | 25 | 312–336 |
| 17 | Enterprise Use Cases | 25 | 337–361 |
| 18 | Compliance, Explainability, and Audit | 21 | 362–381, 486 |
| 19 | Market Strategy and Startup Approaches | 15 | 382–396 |
| 20 | Organizational Adoption and Governance | 20 | 397–416 |
| 21 | Data Engineering and Infrastructure | 21 | 437–456, 310 |
| 22 | Security, Privacy, and Vector Search | 14 | 477–480, 484–485, 487–493, 496 |

### Summary Statistics

| Metric | Value |
|---|---|
| Total concepts | 496 |
| Total chapters | 22 |
| Average per chapter | 22.5 |
| Min chapter size | 14 (Ch 22) |
| Max chapter size | 28 (Ch 6) |
| Chapters below 20 | 6 (Ch 8–10, Ch 12, Ch 19, Ch 22) |
| Chapters above 25 | 2 (Ch 5: 26, Ch 6: 28) |
| Dependency violations | 0 |
| Duplicate assignments | 0 |
| Concepts not assigned | 0 |

---

## Key Design Decisions and Tradeoffs Summary

### Decision 1: 22 chapters instead of 20

**Chosen:** 22 chapters at avg 22.5 concepts/ch.
**Alternative rejected:** 20 chapters at avg 24.8 concepts/ch — would push several chapters to 28–30 concepts, exceeding the acceptable range for a complex graduate-level topic.
**Rationale:** This book has 496 concepts (2.5× the 200-concept typical case). The 20-chapter guideline scales linearly from that baseline; 22 is the correct proportional target.

### Decision 2: Reorder early chapters (Semantic Layers and Metadata before Enterprise KGs)

**Chosen:** Ch 1 KGs → Ch 2 Semantic Layers → Ch 3 Metadata → Ch 4 Enterprise KGs Core → Ch 5 Graph Theory + Advanced EKG.
**Alternative rejected:** Follow course-description topic order (KGs → EKG → Semantic Layers → Metadata). This order produces 5 dependency violations because Information Extraction (421) — needed by enterprise KG concepts — itself needs Metadata (81).
**Tradeoff:** Chapter ordering diverges from the course description topic numbering in the first five chapters. Students reading the book will encounter data infrastructure before the full enterprise KG patterns, which is pedagogically sound (foundations before applications) even if it surprises readers expecting strict topic-order alignment.

### Decision 3: Merge cross-cutting Graph Theory with Advanced EKG concepts in Ch 5

**Chosen:** One chapter (Ch 5) containing all 20 graph algorithm concepts plus 6 advanced EKG concepts (entity resolution, MDM, cross-system linking, KG quality, and their dependency cascade).
**Alternative rejected:** Two separate chapters (Ch 4 Graph Theory, Ch 5 Advanced EKG). Would give Ch 4 = 20 concepts and Ch 5 = 6 concepts — the 6-concept chapter is unacceptably thin.
**Alternative rejected:** Keep all Enterprise KG concepts together and move only graph algorithms. Impossible due to the circular dependency: EKG needs graph algorithms, and graph algorithms need EKG entity concepts.
**Tradeoff:** Ch 5 has a mixed character (abstract algorithms + practical EKG patterns). This is acceptable because graph algorithms ARE what make the advanced EKG patterns work; the chapter is thematically unified around "how graphs compute."

### Decision 4: Move privacy concepts (481–483) into Metadata Management (Ch 3)

**Chosen:** Differential Privacy, Federated Learning, and Privacy-Preserving Computation appear in Ch 3 alongside metadata governance.
**Alternative rejected:** Move Policy Enforcement (100) to the Security chapter (Ch 22). This would displace 1 concept from Metadata Management but leave Ch 22 bloated and create a thematic split in the metadata chapter (governance without the policy concept that motivates it).
**Tradeoff:** Ch 3 students see advanced privacy-preservation techniques (Differential Privacy, Federated Learning) earlier than expected. This is actually beneficial context — students understand *why* governance policies exist before they encounter the policy enforcement mechanism.

### Decision 5: Move BM25 and Sparse Retrieval (494–495) into Ch 14 (LLM Integration)

**Chosen:** Sparse retrieval algorithms appear in the LLM integration chapter that introduces hybrid retrieval.
**Tradeoff:** Ch 22 (Vector Search) chapter no longer contains the sparse retrieval family. The remaining Ch 22 vector search content (HNSW, product quantization, ANN, dense retrieval, embedding model selection) is still coherent.

### Decision 6: Move Context Graph Observability (310) to Ch 21 (Data Engineering)

**Chosen:** One advanced "Building" concept moves to the data engineering chapter where its prerequisite (Data Observability, 441) already resides.
**Alternative rejected:** Move the entire data observability chain (437, 438, 441) to Ch 15 (Building). This would cascade 3 more concepts out of the Data Engineering chapter and make Ch 15 larger without clear benefit.
**Tradeoff:** Minor thematic displacement. Context Graph Observability is about monitoring a deployed system (Building Systems theme) but appears in the Data Engineering chapter. The overlap is natural — production observability is a data engineering concern.

### Decision 7: Keep Ch 12 (Incumbent Challenges) as a standalone 15-concept chapter

**Considered merging with:** Ch 11 (Decision Traces, 26 concepts) → combined 41 concepts, too large. Ch 13 (Graph Data Modeling, 25 concepts) → combined 40 concepts, too large.
**Chosen:** Keep as standalone. 15 concepts is thin but above the 8-concept minimum, and the topic ("Why Incumbents Will Struggle") is a distinct analytical argument that benefits from its own chapter boundary. Merging it would dilute the rhetorical punch of the argument.

### Decision 8: Ch 10 (LLM and AI Foundations) positioned between Context Graph (Ch 9) and Decision Traces (Ch 11)

**Rationale:** Ch 10 requires LLM Context Window (157, Ch 8) and Context Graph Definition (176, Ch 9) as prerequisites. Placing it at Ch 10 means students understand what a context graph is before they study LLM architecture — which sets up the question "how do LLMs USE context graphs?" just before the Decision Traces content answers it.
**Alternative considered:** Place LLM Foundations much later (after Ch 16 Compliance). Valid from a dependency standpoint, but wastes the pedagogical opportunity to build LLM intuition before the decision trace and LLM integration chapters.

---

## Dependency Validation Script

The following Python snippet was used at each iteration. Zero violations before any chapter files were written.

```python
from collections import defaultdict
import json

with open('docs/learning-graph/learning-graph.json') as f:
    data = json.load(f)

prereqs = defaultdict(set)
for e in data['edges']:
    prereqs[e['from']].add(e['to'])          # dependency direction

chapter_map = {c: i for i, (_, cids) in enumerate(chapters) for c in cids}

violations = []
for i, (title, cids) in enumerate(chapters):
    for cid in cids:
        for dep in prereqs.get(cid, set()):
            if chapter_map.get(dep, 0) > i:
                violations.append(f"Ch{i+1} '{labels[cid]}' needs Ch{chapter_map[dep]+1} '{labels[dep]}'")

assert len(violations) == 0
```

---

## Appendix: Cross-Cutting Concept Placement Rationale

| Section | Concept IDs | Placed in | Rationale |
|---|---|---|---|
| Graph Theory & Algorithms | 417–436 | Ch 5 (with advanced EKG) | All deps in Ch 1–4; needed by EKG concepts in same chapter |
| LLM & AI Foundations | 457–476 | Ch 10 | Deps: LLM Context Window (Ch 8), Context Graph (Ch 9) |
| Data Engineering & Infrastructure | 437–456 | Ch 21 | Deps include Ch 15 (building systems concepts) |
| Security & Privacy (most) | 477–480, 484–485 | Ch 22 | Deps satisfied by Ch 1–10, Ch 18 |
| Privacy computation (481–483) | pulled to Ch 3 | Ch 3 | Needed by Policy Enforcement (100) in Metadata Management |
| AI Red Teaming (486) | pulled to Ch 18 | Ch 18 | Needed by Compliance Gap Analysis (379) |
| Dense Vector Retrieval (487–493, 496) | Ch 22 | Ch 22 | Deps: Vector Embedding (Ch 14), Adoption ROI (Ch 20) |
| Sparse Retrieval / BM25 (494–495) | pulled to Ch 14 | Ch 14 | Needed by Hybrid Retrieval (267) in LLM Integration |
