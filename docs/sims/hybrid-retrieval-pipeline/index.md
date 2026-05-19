---
title: Hybrid Retrieval and Reranking Pipeline
description: Learners can use the hybrid retrieval pipeline to describe what happens at each stage of context graph retrieval and identify which stage is responsible for a specific type of retrieval failure.
status: implemented
library: p5.js
bloom_level: Apply (L3)
---

# Hybrid Retrieval and Reranking Pipeline



<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: "Chapter 14: Integrating LLMs with Context Graphs"](../../chapters/14-llm-integration/index.md).

```text
Type: microsim
**sim-id:** hybrid-retrieval-pipeline
**Library:** p5.js
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: use
Learning Objective: Learners can use the hybrid retrieval pipeline to describe what happens at each stage of context graph retrieval and identify which stage is responsible for a specific type of retrieval failure.

Instructional Rationale: A step-through pipeline MicroSim is appropriate for the Apply objective — learners trace a specific query through all five stages, which prepares them to debug and optimize retrieval pipelines in practice.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 500px. White background.

Layout: Five stage boxes arranged left to right, each 18% width. Stage boxes contain an icon (drawn in p5.js), a stage name, and a brief description. An animated orange arrow moves between stages.

Stage 1 "Query Interpretation": Input box showing user query "Pricing exception precedents for Acme Corp Q4 renewal". Output: structured spec { entity_id: ENT-00441872, decision_type: pricing_exception, recency: 24mo }

Stage 2 "Graph Traversal": Shows 12 candidate nodes retrieved. Label: "Entity-linked traces found: 12"

Stage 3 "Vector Search": Shows additional 23 candidates. Label: "Semantically similar traces: 23. Combined candidate set: 35"

Stage 4 "First-Pass Ranking": Shows top-15 selected. Label: "Composite score applied. Top 15 retained for reranking."

Stage 5 "Cross-Encoder Rerank": Shows top-5 final. Label: "Reranker applied. Top 5 injected into context window."

Controls: "Next Stage" button (indigo), "Previous Stage" button (steel blue), "Reset" button. Stage indicator text: "Stage N of 5: [name]".

Each stage box is clickable — clicking shows a detail panel below with: what is computed at this stage, what the latency budget is (Stage 1: <10ms, Stage 2: <20ms, Stage 3: <30ms, Stage 4: <20ms, Stage 5: <50ms), and what failure mode looks like for this stage.

Total latency tracker at bottom right: updates cumulatively as stages complete, showing target of < 150ms total for the retrieval pipeline.

Canvas responds to window resize.
```

## Related Resources

- [Chapter 14: "Chapter 14: Integrating LLMs with Context Graphs"](../../chapters/14-llm-integration/index.md)
