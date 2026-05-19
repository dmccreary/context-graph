---
title: The Four Missing Layers — Why RAG Is Not Enough
description: Learners can assess whether a proposed AI system architecture addresses all four missing knowledge layers by mapping each layer to either a RAG component or a context graph component.
status: implemented
library: vis-network
bloom_level: Evaluate (L5)
---

# The Four Missing Layers — Why RAG Is Not Enough



<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: "Chapter 8: The Context Problem and RAG Limitations"](../../chapters/08-context-problem/index.md).

```text
Type: graph-model
**sim-id:** four-missing-layers
**Library:** vis-network
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: assess
Learning Objective: Learners can assess whether a proposed AI system architecture addresses all four missing knowledge layers by mapping each layer to either a RAG component or a context graph component.

Instructional Rationale: A two-column interactive diagram — "RAG Covers" vs. "Context Graph Adds" — is appropriate for the Evaluate objective because learners must judge the completeness of each approach, which requires comparing specific capabilities against the four named gaps.

Canvas: responsive width, 500px height. Two panels with distinct background colors.

**Left panel — "Standard RAG Covers"** (light blue background):
Nodes: "Document Archive", "Semantic Search Index", "Embedding Similarity", "Top-K Retrieval"
All nodes teal, boxes. Edges showing the RAG pipeline (left to right). All nodes have a green checkmark drawn in p5.js.

**Right panel — "Context Graph Adds"** (light indigo background):
Nodes: "Exception Logic (decision patterns)", "Historical Precedents (why + who)", "Cross-System Synthesis (canonical entities)", "Approval Chains (out-of-band record)"
All nodes indigo, ellipses. A connecting bridge edge from RAG panel to Context Graph panel labeled "extends".
Each missing layer node has a brief icon (p5.js drawn): exclamation mark for exception logic, clock for precedents, link symbol for cross-system, chain symbol for approval chains.

Click each RAG node: "Standard RAG addresses [component]. It is necessary but not sufficient for enterprise reasoning."
Click each Context Graph node: "Context graphs capture [layer]. This addresses the [specific] failure mode that RAG cannot handle alone."
Click the bridge edge: "Context graphs do not replace RAG — they extend it. RAG retrieves documents; the context graph provides the organizational intelligence that makes those documents interpretable and trustworthy."

Summary text at bottom of canvas: "Enterprise AI requires both: RAG for document retrieval, context graphs for organizational intelligence."
```

## Related Resources

- [Chapter 8: "Chapter 8: The Context Problem and RAG Limitations"](../../chapters/08-context-problem/index.md)
