---
title: Structural Gap Analysis — Incumbent Systems vs. Context Graph Requirements
description: Learners can assess each category of incumbent enterprise system against the four requirements of a context graph, identifying the structural constraint that prevents full compliance.
status: scaffold
library: vis-network
bloom_level: Evaluate (L5)
---

# Structural Gap Analysis — Incumbent Systems vs. Context Graph Requirements



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: "Chapter 12: Incumbent Challenges in Building Context Systems"](../../chapters/12-incumbent-challenges/index.md).

```text
Type: graph-model
**sim-id:** incumbent-gap-analysis
**Library:** vis-network
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: assess
Learning Objective: Learners can assess each category of incumbent enterprise system against the four requirements of a context graph, identifying the structural constraint that prevents full compliance.

Instructional Rationale: An interactive gap matrix visualization is appropriate for the Evaluate objective — learners must judge each incumbent's fitness for purpose, which requires comparing capabilities against requirements rather than just recalling facts.

Canvas: responsive width, 560px height. White background.

Layout: Grid with 4 rows (context graph requirements) and 4 columns (incumbent categories) plus a 5th column for Purpose-Built. Total: 4 × 5 grid of colored cells.

Rows (requirements):
1. "Real-Time Decision Capture"
2. "Graph-Native Traversal"
3. "Cross-Silo Entity Linking"
4. "Temporal Versioning"

Columns (systems):
A. "Data Warehouse" (gray header)
B. "CRM System" (gray header)
C. "ERP System" (gray header)
D. "AI Agent Platform" (gray header)
E. "Purpose-Built CG" (indigo header, highlighted)

Cell colors:
- Red (cannot meet): Data Warehouse × Real-Time Capture, Data Warehouse × Cross-Silo, CRM × Graph-Native, CRM × Temporal Versioning, ERP × Cross-Silo, ERP × Graph-Native, AI Agent × Temporal Versioning, AI Agent × Cross-Silo
- Yellow (partial / with significant effort): Data Warehouse × Graph-Native, Data Warehouse × Temporal Versioning, CRM × Real-Time, CRM × Cross-Silo, ERP × Real-Time, ERP × Temporal Versioning, AI Agent × Real-Time, AI Agent × Graph-Native
- Green (can meet): Purpose-Built CG × all four requirements (all green)

Click on any cell: opens infobox explaining WHY the cell is red, yellow, or green — including the specific architectural constraint that causes the red/yellow rating and the specific design feature that makes the purpose-built system green.

Legend at bottom: Red = "Structural constraint — cannot meet without fundamental redesign", Yellow = "Partial — achievable with significant integration tax", Green = "Native capability".

Canvas responds to window resize.
```

## Related Resources

- [Chapter 12: "Chapter 12: Incumbent Challenges in Building Context Systems"](../../chapters/12-incumbent-challenges/index.md)
