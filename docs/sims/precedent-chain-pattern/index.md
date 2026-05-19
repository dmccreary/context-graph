---
title: Precedent Chain Pattern
description: Learners can organize a set of decision trace nodes into a precedent citation chain, identify the most influential foundational precedents by in-degree, and explain why high-in-degree nodes should be retrieved first for LLM context.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Precedent Chain Pattern



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: "Chapter 11: Decision Traces: Anatomy and LPG Patterns"](../../chapters/11-decision-traces/index.md).

```text
Type: graph-model
**sim-id:** precedent-chain-pattern
**Library:** vis-network
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: organize
Learning Objective: Learners can organize a set of decision trace nodes into a precedent citation chain, identify the most influential foundational precedents by in-degree, and explain why high-in-degree nodes should be retrieved first for LLM context.

Instructional Rationale: A vis-network graph where node size reflects citation count (in-degree) is appropriate for the Analyze objective — learners must examine the citation structure to identify influential precedents, which is the same analytical task an LLM retrieval system performs.

Canvas: responsive width, 520px height. White background.

Nodes (7 decision traces, representing a chain of invoice exceptions over 18 months):
- "DT-1001 Q1-2024" (small, gray, ellipse) — oldest, foundational
- "DT-1580 Q2-2024" (medium, indigo) — cites DT-1001
- "DT-2204 Q4-2024" (large, indigo) — cites DT-1001, DT-1580 — high in-degree
- "DT-2891 Q1-2025" (medium, indigo) — cites DT-2204
- "DT-3105 Q2-2025" (small, indigo) — cites DT-2204
- "DT-3891 Q3-2025" (medium, indigo) — cites DT-2204, DT-2891
- "DT-4482 Q4-2025" (small, indigo, latest) — cites DT-2204, DT-3891

Node sizes scale with in-degree: DT-2204 is largest (cited by 4 others), DT-1001 is next (cited by 2 others).

CITES edges (orange, dashed): drawn as directed arrows from citing to cited node.

Toggle button "Show In-Degree Labels": displays in-degree count above each node (DT-2204: in-degree 4, DT-1001: in-degree 2, others: in-degree 0 or 1).

Toggle button "Highlight Top Precedents": colors nodes with in-degree ≥ 2 in bright indigo with a gold outline — the "should retrieve first" set.

Click any node: shows infobox with decision type, date, brief context summary, and "cited-by" count. For DT-2204: "This is the most influential precedent in this chain. When an LLM encounters a new invoice exception, this trace should appear in the top-3 context results."

Click any CITES edge: shows edge properties: "Similarity to citing case: 0.87. Found via: system recommendation. Favorability: positive (positive outcome confirmed retroactively)."
```

## Related Resources

- [Chapter 11: "Chapter 11: Decision Traces: Anatomy and LPG Patterns"](../../chapters/11-decision-traces/index.md)
