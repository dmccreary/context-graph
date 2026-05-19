---
title: PageRank Visualization on a Small Supplier Graph
description: Learners can interpret PageRank scores on a graph by identifying which nodes are structurally influential and explaining why their position makes them influential.
status: implemented
library: vis-network
bloom_level: Understand (L2)
---

# PageRank Visualization on a Small Supplier Graph



<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: "Chapter 5: Graph Theory, Algorithms, and Advanced Enterprise KG"](../../chapters/05-graph-theory-algorithms/index.md).

```text
Type: graph-model
**sim-id:** pagerank-supplier-graph
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: interpret
Learning Objective: Learners can interpret PageRank scores on a graph by identifying which nodes are structurally influential and explaining why their position makes them influential.

Instructional Rationale: An interactive vis-network graph where node size reflects PageRank score is appropriate for the Understand objective — learners can click nodes to see their score and read an explanation connecting the score to the node's structural position.

Canvas: responsive width, 480px height. Light gray background.

Nodes (8 total, representing a simplified supply chain):
- "Tier-1 Distributor" — large node (PageRank: 0.28), indigo, ellipse
- "Raw Material A" — medium-large (PageRank: 0.19), teal
- "Raw Material B" — medium (PageRank: 0.14), teal
- "Manufacturer X" — medium (PageRank: 0.13), gold
- "Manufacturer Y" — small-medium (PageRank: 0.10), gold
- "Product Line 1" — small (PageRank: 0.07), orange
- "Product Line 2" — small (PageRank: 0.06), orange
- "Logistics Partner" — small (PageRank: 0.03), steel blue

Node sizes scale linearly with PageRank: largest node = 50px radius, smallest = 18px radius.

Edges (directed, representing supply/dependency flow):
Raw Material A → Manufacturer X, Raw Material A → Manufacturer Y, Raw Material B → Manufacturer X, Manufacturer X → Tier-1 Distributor, Manufacturer Y → Tier-1 Distributor, Tier-1 Distributor → Product Line 1, Tier-1 Distributor → Product Line 2, Logistics Partner → Tier-1 Distributor

Click on any node: opens an infobox panel below the canvas showing:
- Node name
- PageRank score (formatted as 0.XX)
- Why this score: e.g., for Tier-1 Distributor: "Highest PageRank (0.28) because three manufacturers and one logistics partner all supply into this node — it is the critical bridge before final products. Removing it disconnects all product lines."
- Risk implication: one sentence on what high PageRank means for supply chain risk

Toggle button "Show/Hide PageRank Scores" displays score labels above each node.
Toggle button "Highlight Critical Nodes" colors nodes above 0.15 PageRank in red to visualize the top tier.
```

## Related Resources

- [Chapter 5: "Chapter 5: Graph Theory, Algorithms, and Advanced Enterprise KG"](../../chapters/05-graph-theory-algorithms/index.md)
