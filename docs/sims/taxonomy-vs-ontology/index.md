---
title: Taxonomy vs. Ontology in a Product Graph
description: Learners can contrast a taxonomy (hierarchy of types) with an ontology (network of type relationships and constraints) by examining example graphs for the same product domain.
status: implemented
library: vis-network
bloom_level: Understand (L2)
---

# Taxonomy vs. Ontology in a Product Graph



<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: "Chapter 4: Enterprise Knowledge Graphs — Core Patterns"](../../chapters/04-enterprise-knowledge-graphs/index.md).

```text
Type: graph-model
**sim-id:** taxonomy-vs-ontology
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: contrast
Learning Objective: Learners can contrast a taxonomy (hierarchy of types) with an ontology (network of type relationships and constraints) by examining example graphs for the same product domain.

Instructional Rationale: Side-by-side clickable graphs are appropriate because the contrast is structural — seeing that the taxonomy has only parent-child edges while the ontology has diverse typed relationships makes the distinction immediately visual.

Canvas: responsive width, 520px height. Two panels separated by divider. Each panel titled.

**Left panel — Taxonomy:**
Title: "Product Taxonomy (hierarchy only)"
Nodes: "Physical Product" (root, indigo), "Electronics" (teal), "Apparel" (teal), "Laptop" (gold), "Monitor" (gold), "Shirt" (gold)
Edges: all IS-A edges pointing upward — Laptop → Electronics → Physical Product, Monitor → Electronics, Shirt → Apparel → Physical Product
Edge labels: "is-a"

**Right panel — Ontology:**
Title: "Product Ontology (typed relationships)"
Nodes: "Product" (indigo), "Supplier" (teal), "Category" (gold), "RegulatoryStandard" (orange), "Contract" (steel blue)
Edges:
- Product → Category, label "has-type"
- Supplier → Product, label "manufactures"
- Product → RegulatoryStandard, label "governed-by"
- Supplier → Contract, label "bound-by"
- Contract → Product, label "covers"

Click on any Taxonomy node: "**Taxonomy Node** — in a taxonomy, each node is a concept type. The only relationship is IS-A (subtype). Useful for browsing categories, but cannot express cross-concept relationships."
Click on any Ontology node: "**Ontology Node** — in an ontology, each node is a concept type AND can participate in multiple typed relationships. Click the edges to see the constraint each relationship expresses."
Click on any edge (right panel): shows the relationship name and a description of the constraint it represents.
```

## Related Resources

- [Chapter 4: "Chapter 4: Enterprise Knowledge Graphs — Core Patterns"](../../chapters/04-enterprise-knowledge-graphs/index.md)
