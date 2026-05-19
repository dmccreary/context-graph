---
title: Context Failure Mode Explorer
description: Learners can examine each of the five RAG failure modes and connect each to a specific property that context graphs are designed to address.
status: implemented
library: p5.js
bloom_level: Analyze (L4)
---

# Context Failure Mode Explorer



<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: "Chapter 8: The Context Problem and RAG Limitations"](../../chapters/08-context-problem/index.md).

```text
Type: microsim
**sim-id:** context-failure-modes
**Library:** p5.js
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: examine
Learning Objective: Learners can examine each of the five RAG failure modes and connect each to a specific property that context graphs are designed to address.

Instructional Rationale: A failure mode selector MicroSim is appropriate for the Analyze objective — clicking through failure modes with concrete before/after examples makes abstract concepts tangible and supports recognition of the pattern in practice.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 520px. White background.

Layout: Left column (30%): clickable list of failure modes (5 buttons created with createButton). Right panel (70%): detail view that changes when a failure mode is selected.

**Failure modes (5 buttons):**
1. "Missing Decision Context"
2. "Knowledge Staleness"
3. "Incomplete Cross-System Synthesis"
4. "Tacit Knowledge Gap"
5. "Context Poisoning"

Each button highlights in indigo when selected.

**Right panel for each failure mode** shows three rows:
- Row 1 "What RAG does": description of what a standard RAG system retrieves
- Row 2 "What the LLM gets": the partial or incorrect context that reaches the model
- Row 3 "Result": the type of wrong answer produced, with a concrete example snippet

Example for "Knowledge Staleness":
- What RAG does: "Retrieves top-3 documents by semantic similarity to 'What is our discount tier for Acme Corp?'"
- What the LLM gets: "Pricing document v4.1 (published 14 months ago, similarity score: 0.91)"
- Result: "LLM answers with old Tier 2 discount. Acme Corp was upgraded to Tier 1 six months ago. The new pricing doc has a slightly different title and lower similarity score."

Bottom panel: "Context Graph Solution" — a one-sentence description of how a context graph addresses this specific failure mode. For Knowledge Staleness: "Context graph attaches freshness scores and version history to every retrieval result, enabling the LLM to detect that a more recent document exists even if it has a lower raw similarity score."

Color coding: failure mode descriptions in orange/red palette. Solution descriptions in teal.
Canvas responds to window resize.
```

## Related Resources

- [Chapter 8: "Chapter 8: The Context Problem and RAG Limitations"](../../chapters/08-context-problem/index.md)
