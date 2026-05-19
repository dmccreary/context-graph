---
title: Subgraph Extraction for LLM Context Assembly
description: Learners can explain how a subgraph extraction query traverses from an entity node to decision traces to their associated actors, policies, and precedents, and explain why the resulting subgraph is serialized into prose for the LLM.
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Subgraph Extraction for LLM Context Assembly



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: "Chapter 13: Graph Data Modeling for Context"](../../chapters/13-graph-data-modeling/index.md).

```text
Type: graph-model
**sim-id:** subgraph-extraction
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Learners can explain how a subgraph extraction query traverses from an entity node to decision traces to their associated actors, policies, and precedents, and explain why the resulting subgraph is serialized into prose for the LLM.

Instructional Rationale: A two-panel interactive diagram — full graph on left, extracted subgraph on right — is appropriate for the Understand objective because learners can see the selection process visually: which nodes are included and which are excluded from the extraction.

Canvas: responsive width, 560px height. White background. Two panels.

**Left panel — Full Context Graph (schematic):**
Shows ~15 nodes of various types with many edges. Most nodes are light gray (not selected). A few nodes are highlighted:
- Target entity: "Customer: Acme Corp" (indigo, bright)
- Three Decision Trace Nodes connected to this customer (gold)
- Actors, policy versions, and precedent nodes connected to the decision traces (teal, smaller)

The highlighted nodes form the subgraph to be extracted.

**Right panel — Extracted Subgraph:**
Shows only the highlighted nodes from the left panel, arranged more cleanly. Edge labels visible.
Below the subgraph: a serialized LLM context block showing the prose format:
```
Decision Trace DT-4482 (2025-10-31):
  Type: pricing_exception
  Decided by: J. Smith (Account Manager)
  Approved by: M. Williams (VP Sales)
  Policy: Pricing Policy v3.2 (effective 2024-01-01)
  Cited precedents: DT-3891 (Q2-2024, favorable), DT-2204 (Q4-2023, favorable)
  Summary: 15% discount approved for Q4 renewal. Strategic account justification.
```

A "Extract" button (createButton) triggers a brief animation where the highlighted nodes in the left panel "fly" to the right panel and the serialized block appears below.

Click on any extracted node in the right panel: shows the raw JSON for that node alongside the prose serialization, illustrating the transformation.

Annotation: "The LLM receives the prose block, not the raw JSON. Structured prose matches the model's training distribution and improves reasoning quality."
```

## Related Resources

- [Chapter 13: "Chapter 13: Graph Data Modeling for Context"](../../chapters/13-graph-data-modeling/index.md)
