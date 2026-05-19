---
title: Governance Framework Concept Map
description: Learners can organize the 25 governance concepts from this chapter into a structured relationship map showing how each concept connects to the others.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Governance Framework Concept Map



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: "Chapter 3: Metadata Management and Data Governance"](../../chapters/03-metadata-management/index.md).

```text
Type: graph-model
**sim-id:** governance-concept-map
**Library:** vis-network
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: organize
Learning Objective: Learners can organize the 25 governance concepts from this chapter into a structured relationship map showing how each concept connects to the others.

Instructional Rationale: A clickable concept map is appropriate for the Analyze objective because it requires learners to see structure in a set of related ideas — clicking any concept node reveals its definition and its connections, reinforcing both recall and relationship understanding simultaneously.

Canvas: responsive width, 600px height. Light gray background (#F8F8F8).

Nodes (25 total, color-coded by theme cluster):
Cluster 1 — Metadata Types (steel blue): Metadata, Technical Metadata, Business Metadata, Operational Metadata
Cluster 2 — Management Approaches (teal): Active Metadata Management, Passive Metadata Cataloging, Metadata Catalog Platform, Automated Metadata Discovery, Metadata Tagging
Cluster 3 — Quality Dimensions (gold): Data Quality, Data Completeness, Data Accuracy, Data Consistency, Data Timeliness, Data Quality Rule
Cluster 4 — Governance Structure (indigo): Data Governance Framework, Data Stewardship, Data Ownership, Governance Role
Cluster 5 — Access & Protection (orange): Data Classification, Access Control, Policy Enforcement, Data Masking, Data Anonymization, Differential Privacy

Edges (selected key relationships):
- Metadata → Technical Metadata, Business Metadata, Operational Metadata (is-type-of)
- Active Metadata Management → Metadata Catalog Platform (implemented-by)
- Metadata Catalog Platform → Automated Metadata Discovery (enables)
- Automated Metadata Discovery → Metadata Tagging (produces)
- Data Quality → Data Completeness, Data Accuracy, Data Consistency, Data Timeliness (measured-by)
- Data Quality Rule → Data Quality (enforces)
- Data Governance Framework → Data Stewardship, Data Ownership, Data Classification, Access Control, Policy Enforcement (includes)
- Data Stewardship → Data Ownership (escalates-to)
- Data Stewardship → Governance Role (is-a)
- Data Classification → Access Control (drives)
- Access Control → Policy Enforcement (implemented-by)
- Policy Enforcement → Data Masking, Data Anonymization, Differential Privacy (uses-technique)

Click handler on each node: opens a side panel with the concept name, a two-sentence definition, and a list of its connected neighbor concept names. The panel appears below the canvas.

Physics: cluster layout using vis-network's hierarchical or force-directed with cluster repulsion. Each color cluster gravitates together. 

Hover over edges shows edge label. Hover over nodes highlights all adjacent edges in orange.

Initial state: all nodes visible, no selections. Instructions: "Click any concept to see its definition and connections."
```

## Related Resources

- [Chapter 3: "Chapter 3: Metadata Management and Data Governance"](../../chapters/03-metadata-management/index.md)
