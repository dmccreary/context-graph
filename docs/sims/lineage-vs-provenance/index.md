---
title: Lineage vs. Provenance in Context
description: Learners can differentiate data lineage from data provenance by identifying which question each answers for a specific data value in a pipeline graph.
status: implemented
library: vis-network
bloom_level: Analyze (L4)
---

# Lineage vs. Provenance in Context



<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: "Chapter 7: Process Mining, Data Lineage, and Provenance"](../../chapters/07-process-mining-lineage/index.md).

```text
Type: graph-model
**sim-id:** lineage-vs-provenance
**Library:** vis-network
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: differentiate
Learning Objective: Learners can differentiate data lineage from data provenance by identifying which question each answers for a specific data value in a pipeline graph.

Instructional Rationale: A clickable graph with two distinct visual layers (lineage edges vs. provenance annotation nodes) is appropriate for the Analyze objective — clicking reveals the question each layer answers, making the distinction concrete without requiring additional prose.

Canvas: responsive width, 500px height. White background.

Nodes:
- "Bank Transactions DB" (teal, rectangle) — source
- "ETL Pipeline v2.3" (steel blue, diamond)
- "Revenue Summary Table" (gold, rectangle)
- "Finance Dashboard" (indigo, ellipse) — final consumer
- "Provenance: Manual Correction" (orange, triangle) — attached to ETL
- "Provenance: Not Reconciled" (red, triangle) — attached to Revenue Summary
- "Provenance: High Confidence" (green, triangle) — attached to Bank Transactions

Lineage edges (solid, dark gray):
- Bank Transactions DB → ETL Pipeline v2.3 "reads"
- ETL Pipeline v2.3 → Revenue Summary Table "writes"
- Revenue Summary Table → Finance Dashboard "feeds"

Provenance edges (dashed, orange):
- ETL Pipeline v2.3 ← Provenance: Manual Correction "annotation"
- Revenue Summary Table ← Provenance: Not Reconciled "annotation"
- Bank Transactions DB ← Provenance: High Confidence "annotation"

Two toggle buttons below the canvas:
- "Show Lineage" (default ON): highlights solid lineage edges in dark blue
- "Show Provenance" (default ON): highlights dashed provenance edges in orange

When lineage-only toggled on: "Lineage shows the structural path: Bank DB → ETL → Summary Table → Dashboard. This tells you where the data came from."
When provenance-only toggled on: "Provenance tells you whether to trust each step. High-confidence source, but a manual correction in the ETL and an unreconciled summary table — the dashboard value carries uncertainty."

Click any node: opens infobox with node role and the provenance score (if applicable).
```

## Related Resources

- [Chapter 7: "Chapter 7: Process Mining, Data Lineage, and Provenance"](../../chapters/07-process-mining-lineage/index.md)
