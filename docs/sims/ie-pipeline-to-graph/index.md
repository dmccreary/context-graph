---
title: Information Extraction Pipeline to Graph
description: Learners can use the three-stage information extraction pipeline (NER → disambiguation → relation extraction) to trace how an unstructured text sentence becomes a set of graph edges.
status: implemented
library: p5.js
bloom_level: Apply (L3)
---

# Information Extraction Pipeline to Graph



<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: "Chapter 5: Graph Theory, Algorithms, and Advanced Enterprise KG"](../../chapters/05-graph-theory-algorithms/index.md).

```text
Type: microsim
**sim-id:** ie-pipeline-to-graph
**Library:** p5.js
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: use
Learning Objective: Learners can use the three-stage information extraction pipeline (NER → disambiguation → relation extraction) to trace how an unstructured text sentence becomes a set of graph edges.

Instructional Rationale: A step-through animation with highlighted text spans is appropriate because the Apply objective requires learners to work through the pipeline stages with a concrete example — seeing entities highlighted in text and watching them resolve to graph nodes makes the pipeline tangible.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 520px. White background.

Layout (top-to-bottom):
1. **Text panel** (top, 120px tall): displays example sentence: "The contract between Acme Corp and the Infrastructure Team expires on December 31st and is governed by the Data Processing Policy v2.1."
2. **Stage panels** (middle, 240px): three columns — NER, Disambiguation, Relation Extraction
3. **Graph output panel** (bottom, 160px): small vis-network-style node/edge display showing the resulting semantic triples as a mini-graph

Stage 1 — NER: Highlights entity spans in the text with colored underlines (teal = organization, gold = date, indigo = document). Lists: Entity spans found: [Acme Corp, Infrastructure Team, December 31st, Data Processing Policy v2.1]

Stage 2 — Disambiguation: Shows each entity matched to a canonical ID:
- Acme Corp → Customer node ENT-00441872
- Infrastructure Team → Department node DEPT-INFRA-07
- December 31st → Date value 2025-12-31
- Data Processing Policy v2.1 → Policy node POL-DPP-021

Stage 3 — Relation Extraction: Shows extracted triples:
- (Contract C-889, PARTY_A, ENT-00441872)
- (Contract C-889, PARTY_B, DEPT-INFRA-07)
- (Contract C-889, EXPIRES_ON, 2025-12-31)
- (Contract C-889, GOVERNED_BY, POL-DPP-021)

Graph panel: shows these 5 nodes (contract + 4 linked entities) with labeled edges, rendered as a tiny vis-network graph.

Controls: "Next Stage" and "Previous Stage" buttons. Stage indicator text. "Load to Graph" button at Stage 3 triggers a brief animation where the mini-graph nodes pulse in indigo to simulate ingestion.

Canvas responds to window resize.
```

## Related Resources

- [Chapter 5: "Chapter 5: Graph Theory, Algorithms, and Advanced Enterprise KG"](../../chapters/05-graph-theory-algorithms/index.md)
