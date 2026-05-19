---
title: Semantic Layer Architecture
description: Learners can identify the three layers of a semantic layer architecture (physical storage, semantic definition, query interface) and explain how each layer translates the one below it.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Semantic Layer Architecture



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: "Chapter 2: Semantic Layers for Data Lakes"](../../chapters/02-semantic-layers/index.md).

```text
Type: diagram
**sim-id:** semantic-layer-architecture<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Explain and identify
Learning Objective: Learners can identify the three layers of a semantic layer architecture (physical storage, semantic definition, query interface) and explain how each layer translates the one below it.

Instructional Rationale: A layered architecture diagram with clickable layer transitions is appropriate because the Understand objective requires learners to trace how a business question passes through each layer before reaching physical data. Static image would not let learners explore each transformation.

Layout: Three horizontal bands stacked vertically in a canvas:
- Top band (~25%): "Query Interface" — shows two query bubbles: one in business English ("Total revenue by region, last 30 days") and one in SQL
- Middle band (~35%): "Semantic Layer" — shows three boxes: Metrics (revenue formula), Dimensions (region hierarchy), Logical Model (Customer-Order-Product entities)
- Bottom band (~40%): "Physical Storage" — shows five table icons with raw column names (trans_tbl, cust_master, prod_cat, geo_ref, ord_hdr)

Connections:
- Dotted arrows from each SQL fragment in the top band down through the semantic layer boxes to the physical table(s) that supply it
- Arrow labels: "business term → metric definition → SQL fragment → physical column"

Interactive behavior:
- Click any physical table icon: highlight which semantic layer objects reference it; show a tooltip with the raw column names and their semantic aliases
- Click any Metric box: show the full formula (e.g., "SUM(trans_tbl.net_amt) WHERE trans_tbl.stat_cd = 3") and which dimensions can slice it
- Click any business-language query bubble at the top: animate the translation path downward through the layers, lighting up each node as the query passes through it
- Hover any arrow: tooltip explains what translation that step performs ("Metric name → SQL formula")
- "Reset" button returns to neutral state

Color palette: Indigo top band, teal middle band, orange bottom band. Consistent with book palette.
Canvas: Responsive width, 520px height.
```

## Related Resources

- [Chapter 2: "Chapter 2: Semantic Layers for Data Lakes"](../../chapters/02-semantic-layers/index.md)
