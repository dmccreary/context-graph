---
title: Metadata Catalog to Context Graph Flow
description: Learners can explain the flow of metadata from source systems through a catalog platform into a context graph.
status: implemented
library: p5.js
bloom_level: Understand (L2)
---

# Metadata Catalog to Context Graph Flow



<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: "Chapter 3: Metadata Management and Data Governance"](../../chapters/03-metadata-management/index.md).

```text
Type: microsim
**sim-id:** catalog-to-context-graph-flow
**Library:** p5.js
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Learners can explain the flow of metadata from source systems through a catalog platform into a context graph.

Instructional Rationale: An animated step-through MicroSim is appropriate because the Understand objective requires learners to trace a concrete data transformation — seeing metadata move through each stage makes the pipeline tangible rather than abstract.

Canvas: responsive width via updateCanvasSize() as first line of setup(). Height: 480px. White background with subtle light gray (#F5F5F5) panel backgrounds.

Layout: Three horizontal panels arranged left-to-right:
1. "Source Systems" panel (left): 4 small labeled boxes — "ERP", "CRM", "Data Warehouse", "Streaming Events" — stacked vertically
2. "Metadata Catalog" panel (center): labeled with icon-like boxes — "Schema Crawler", "Business Terms", "Quality Scores", "Lineage Graph"
3. "Context Graph" panel (right): shows 4 node types — "Dataset Node", "Quality Node", "Owner Node", "Decision Trace Node" — connected by edges

Animation: Clicking a "Step Forward" button reveals one stage at a time:
- Step 1: Source Systems light up, label "1. Source systems store data across dozens of systems"
- Step 2: Animated arrows flow left→center, label "2. Schema crawler discovers structure (automated)"
- Step 3: Business Terms lights up, label "3. Stewards review and approve business metadata (human-in-loop)"
- Step 4: Arrows flow from Catalog → Context Graph, label "4. Context graph ingests metadata as nodes and edges"
- Step 5: Decision Trace Node lights up, label "5. Context graph adds decision history — the catalog cannot"

Controls: "Next Step" button (p5.js createButton), "Reset" button. Current step shown as "Step N of 5" text below canvas.

Color coding: source systems in steel blue, catalog in teal, context graph in indigo. Arrows are orange (#E76F51) when active.

The canvas must respond to window resize events by recalculating panel widths proportionally.
```

## Related Resources

- [Chapter 3: "Chapter 3: Metadata Management and Data Governance"](../../chapters/03-metadata-management/index.md)
