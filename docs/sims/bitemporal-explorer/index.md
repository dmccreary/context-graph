---
title: Bitemporal Modeling — Two Time Dimensions
description: Learners can use the bitemporal time model to answer a point-in-time query by correctly filtering on both valid time and transaction time.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Bitemporal Modeling — Two Time Dimensions



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: "Chapter 13: Graph Data Modeling for Context"](../../chapters/13-graph-data-modeling/index.md).

```text
Type: microsim
**sim-id:** bitemporal-explorer
**Library:** p5.js
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: use
Learning Objective: Learners can use the bitemporal time model to answer a point-in-time query by correctly filtering on both valid time and transaction time.

Instructional Rationale: An interactive 2D timeline slider is appropriate for the Apply objective — learners must manipulate both time dimensions and read the query result, practicing the bitemporal query pattern in a low-stakes environment.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 520px. White background.

Layout:
- Top: 2D grid with X-axis = Valid Time (Jan 2024 to Dec 2025) and Y-axis = Transaction Time (Jan 2024 to Dec 2025)
- Three colored rectangles in the grid represent three records for Customer Credit Tier:
  * Record A (teal): valid_from=Jan2024, valid_to=May2024, transaction_from=Feb2024, transaction_to=Aug2024 — "Tier 2 (original, corrected late)"
  * Record B (gold): valid_from=Jun2024, valid_to=null, transaction_from=Jul2024, transaction_to=null — "Tier 1 (upgrade)"
  * Record C (orange): valid_from=Jan2024, valid_to=May2024, transaction_from=Aug2024, transaction_to=null — "Tier 2 corrected (restatement)"
- Two crosshair sliders: one vertical (valid time query date) and one horizontal (transaction time query date)
- Where the two crosshairs intersect, a circle highlights which record rectangle the point falls inside
- Query result panel at bottom: shows the credit tier value returned for the current (valid_time, transaction_time) combination and a text explanation

Controls: createSlider for valid_time (x-axis position, Jan 2024 to Dec 2025), createSlider for transaction_time (y-axis position). Both sliders labeled with current date.

When intersection falls on Record A: "Query result: Tier 2 (original recording). This was the tier the database showed on this transaction date for this valid time."
When intersection falls on Record B: "Query result: Tier 1. This is the post-upgrade tier."
When intersection falls on Record C: "Query result: Tier 2 (restated). The database was corrected in August 2024 to accurately reflect the tier for the Jan-May period."
When intersection falls in empty grid area: "Query result: No record. This combination of valid time and transaction time has no matching record."

Canvas responds to window resize.
```

## Related Resources

- [Chapter 13: "Chapter 13: Graph Data Modeling for Context"](../../chapters/13-graph-data-modeling/index.md)
