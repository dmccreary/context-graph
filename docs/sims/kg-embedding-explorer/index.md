---
title: Knowledge Graph Embedding Space Explorer
description: Learners can explain how knowledge graph embeddings place semantically related entities near each other in a continuous space, enabling similarity-based retrieval.
status: implemented
library: p5.js
bloom_level: Understand (L2)
---

# Knowledge Graph Embedding Space Explorer



<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: "Chapter 5: Graph Theory, Algorithms, and Advanced Enterprise KG"](../../chapters/05-graph-theory-algorithms/index.md).

```text
Type: microsim
**sim-id:** kg-embedding-explorer
**Library:** p5.js
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Learners can explain how knowledge graph embeddings place semantically related entities near each other in a continuous space, enabling similarity-based retrieval.

Instructional Rationale: An interactive 2D scatter plot is appropriate because the Understand objective requires learners to see that proximity in the embedding space corresponds to semantic relatedness — clicking nearby points and reading their relationship descriptions builds the core intuition.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 480px. White background with light grid.

Display: 2D scatter plot. X and Y axes labeled "Embedding Dimension 1" and "Embedding Dimension 2" with thin gray grid lines. Each entity is a colored dot (radius 8px) at pre-set coordinates designed to show natural clustering.

Entity clusters (pre-set positions to illustrate meaningful groupings):
Cluster A — Customer entities (teal dots): "Acme Corp" (0.2, 0.8), "GlobalTech Ltd" (0.25, 0.72), "NordicMfg" (0.18, 0.76)
Cluster B — Contract entities (gold dots): "Acme MSA" (0.35, 0.78), "GlobalTech SLA" (0.40, 0.71), "NordicMfg Order" (0.37, 0.80)
Cluster C — Policy documents (indigo dots): "Data Processing Policy" (0.62, 0.35), "Information Security Policy" (0.68, 0.40), "Privacy Policy" (0.60, 0.42)
Cluster D — Incidents (orange dots): "Incident-447" (0.78, 0.20), "Incident-891" (0.82, 0.18), "Incident-332" (0.76, 0.25)

Scattered bridging entities (steel blue diamonds): "IT Department" at (0.5, 0.5), "Finance Team" at (0.55, 0.45) — positioned between clusters, illustrating that organizational entities link multiple domains.

Click on any dot: displays an infobox at bottom of canvas:
- Entity name and type
- "Nearest neighbors in embedding space: [list 2 nearest dots by Euclidean distance]"
- "Why they are close: [one sentence explanation based on entity types]"
- For bridging entities: "Bridge position: connected to both Customer cluster and Policy cluster — reflects this department's role in both contracting and compliance."

Slider: "Similarity Threshold" (createSlider, 0.0 to 0.5, step 0.05, default 0.2). When adjusted, draws thin gray lines between all dot pairs within the threshold distance — visualizing the similarity neighborhood. Fewer lines at low threshold, more at high threshold.

Label: "KG Embedding Space (2D projection for visualization — real embeddings have hundreds of dimensions)"

Canvas responds to window resize.
```

## Related Resources

- [Chapter 5: "Chapter 5: Graph Theory, Algorithms, and Advanced Enterprise KG"](../../chapters/05-graph-theory-algorithms/index.md)
