---
title: Data Model Comparison Explorer
description: Learners can compare the Relational, RDF, LPG, and Vector Store data models across five performance dimensions and justify which model is appropriate for a given enterprise query type.
status: implemented
library: p5.js
bloom_level: Analyze (L4)
---

# Data Model Comparison Explorer



<iframe src="main.html" width="100%" height="722" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: "Chapter 1: Knowledge Graphs and Labeled Property Graphs"](../../chapters/01-knowledge-graphs-lpg/index.md).

```text
Type: infographic
**sim-id:** data-model-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare and differentiate
Learning Objective: Learners can compare the Relational, RDF, LPG, and Vector Store data models across five performance dimensions and justify which model is appropriate for a given enterprise query type.

Layout: Two sections — a model visualizer (top ~60%) and a query benchmark table (bottom ~40%).

Top section — four tab buttons:
- "Relational", "RDF / Triplestore", "Labeled Property Graph", "Vector Store"
- Active tab highlighted in indigo; inactive tabs in light gray
- Clicking a tab animates transition to that model's visualization

Model visualizations (supply-chain scenario, consistent across all four panels):
- Relational: Three tables (Suppliers, Products, SuppliesJunction). Foreign key columns highlighted. A "relationship attribute" column (lead_time_days) shown in the junction table with a callout: "Attribute lives in a separate table — requires JOIN to retrieve."
- RDF / Triplestore: Seven triples in `<subject> <predicate> <object>` notation. A reification block shows four additional triples plus a blank node required to encode a single edge property. Callout: "4+ triples needed to express one attributed relationship."
- Labeled Property Graph: Three nodes (Supplier, Product, Warehouse) connected by two typed, directed edges. Each edge shows inline property badge (lead_time_days: 14). Callout: "Edge holds its own properties — retrieved in the same traversal step."
- Vector Store: 2D t-SNE scatter of six document embedding points. Arrows show k-nearest-neighbor query result. Callout: "Finds semantically similar things — but cannot express why they connect."

Bottom section — query benchmark table (5 rows × 4 columns):
Query types (rows): Single-entity lookup | Two-hop traversal | Five-hop traversal | Semantic similarity | Causal chain audit
Models (columns): Relational | RDF | LPG | Vector Store

Cell values (color-coded: green=Fast, yellow=Moderate, orange=Slow, red=Very Slow, gray=N/A):
- Single lookup: all four Fast
- Two-hop traversal: Relational Moderate, RDF Moderate, LPG Fast, Vector N/A
- Five-hop traversal: Relational Very Slow, RDF Slow, LPG Fast, Vector N/A
- Semantic similarity: Relational Poor, RDF Poor, LPG Moderate, Vector Excellent
- Causal chain audit: Relational Very Slow, RDF Slow, LPG Fast, Vector N/A

Interactive behavior:
- Hover any benchmark cell: one-sentence tooltip explaining the rating (e.g., "Five-hop traversal in a relational database requires five JOIN operations whose combined cost grows super-linearly with table size")
- Hover any structural element in the visualization: tooltip showing its name and role in the model
- Tab transitions use a 200ms crossfade animation

Canvas: Responsive width, 500px height.
Color palette: Indigo/orange/teal consistent with book.
```

## Related Resources

- [Chapter 1: "Chapter 1: Knowledge Graphs and Labeled Property Graphs"](../../chapters/01-knowledge-graphs-lpg/index.md)
