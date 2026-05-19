---
title: Semantic Consistency Explorer
description: Learners can identify semantic inconsistency across two data sources and explain how a semantic layer resolves it by providing a single canonical definition.
status: implemented
library: p5.js
bloom_level: Analyze (L4)
---

# Semantic Consistency Explorer



<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: "Chapter 2: Semantic Layers for Data Lakes"](../../chapters/02-semantic-layers/index.md).

```text
Type: microsim
**sim-id:** semantic-consistency-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare and examine
Learning Objective: Learners can identify semantic inconsistency across two data sources and explain how a semantic layer resolves it by providing a single canonical definition.

Instructional Rationale: Step-through comparison with real column names and values is appropriate because the Analyze objective requires learners to trace a specific inconsistency to its root cause and then observe the resolution. Continuous animation would prevent careful comparison.

Layout: Three-panel horizontal layout
- Left panel (~33%): "Finance System" — shows a small table with columns: `trans_id`, `trans_dt`, `net_amt`, `stat_cd`. Four sample rows. `stat_cd` values: 3 = completed, 5 = recognized, 7 = pending.
- Center panel (~33%): "Sales System" — shows a small table with columns: `order_id`, `order_date`, `gross_revenue`, `order_status`. Four sample rows. `order_status` values: "closed_won", "invoiced", "in_progress".
- Right panel (~33%): "Semantic Layer" — shows the unified metric definition: `recognized_revenue = SUM(net_amt WHERE stat_cd IN (3,5)) + SUM(gross_revenue WHERE order_status IN ('closed_won','invoiced'))`. Shows computed result for the sample data.

Two scenario buttons at the top:
- "Without Semantic Layer": highlights that a finance analyst querying the left table and a sales analyst querying the right table get different numbers for the same business question, even with identical date filters. Show calculated values diverging ($4.2M vs $3.9M).
- "With Semantic Layer": shows both systems feeding into the right panel's unified definition, producing one agreed-upon number ($4.1M — explained as reconciled via the canonical formula).

Step log (bottom of each panel): shows the SQL fragment used in each scenario, so learners can see what changed.

Interactive behavior:
- Click either scenario button: animate the data flow from the relevant source tables into the right panel with a 500ms delay per step
- Hover any column name in the source tables: tooltip showing its data type and example values
- Hover any row in the source tables: highlight the corresponding contribution in the semantic layer formula
- Click the metric definition in the right panel: expand a detailed formula breakdown showing each source's contribution

Canvas: Responsive width, 500px height.
Color palette: Left panel orange, center panel teal, right panel indigo.
```

## Related Resources

- [Chapter 2: "Chapter 2: Semantic Layers for Data Lakes"](../../chapters/02-semantic-layers/index.md)
