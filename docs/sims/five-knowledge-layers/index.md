---
title: Five Complementary Knowledge Layers
description: Learners can summarize the role of each of the five knowledge layers in an enterprise AI architecture and explain how the context graph bridges the structured data layers and the LLM reasoning layer.
status: implemented
library: vis-network
bloom_level: Understand (L2)
---

# Five Complementary Knowledge Layers



<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: "Chapter 9: What a Context Graph Is"](../../chapters/09-context-graph-definition/index.md).

```text
Type: graph-model
**sim-id:** five-knowledge-layers
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: summarize
Learning Objective: Learners can summarize the role of each of the five knowledge layers in an enterprise AI architecture and explain how the context graph bridges the structured data layers and the LLM reasoning layer.

Instructional Rationale: A hierarchical vis-network diagram with clickable layer nodes is appropriate for the Understand objective — learners can click each layer to read its role description, building a structured mental model of the overall architecture.

Canvas: responsive width, 520px height. Light gray background.

Layout: Five nodes arranged vertically (top to bottom), like a stack:
1. "LLM Reasoning Layer" (gold, large box, top)
2. "Context Graph Layer" (indigo, large ellipse) — highlighted as the key layer
3. "Semantic Layer" (teal, box)
4. "Knowledge Graph Layer" (steel blue, box)
5. "Raw Data Layer" (gray, box, bottom)

Vertical edges connecting adjacent layers, labeled:
- LLM Reasoning ↔ Context Graph: "queries for decision context"
- Context Graph ↔ Semantic Layer: "uses definitions and governance"
- Context Graph ↔ Knowledge Graph: "anchors decision nodes to entities"
- Knowledge Graph ↔ Semantic Layer: "provides vocabulary"
- Knowledge Graph ↔ Raw Data: "integrates via ETL pipelines"

Click on each layer node: opens infobox with:
- Layer name
- What question it answers
- What it stores / provides
- Which earlier chapter covered it

For "Context Graph Layer": highlighted in bright indigo border with additional text: "This is the layer this book is about. It is the bridge between what the organization knows (knowledge graph, semantic layer) and what the organization has decided (decision traces)."

Two annotation labels:
- Bracket spanning layers 3-5: "Covered in Chapters 1-7"
- Bracket spanning layer 2: "This book's focus (Chapters 8-22)"
- Bracket spanning layer 1: "The LLM that benefits from all layers below"

Hover over any edge shows the label.
```

## Related Resources

- [Chapter 9: "Chapter 9: What a Context Graph Is"](../../chapters/09-context-graph-definition/index.md)
