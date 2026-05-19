---
title: Graph ETL Pipeline Stages
description: Learners can explain what happens to a source record at each stage of a graph ingestion pipeline, from raw extraction to loaded graph node.
status: implemented
library: p5.js
bloom_level: Understand (L2)
---

# Graph ETL Pipeline Stages



<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: "Chapter 4: Enterprise Knowledge Graphs — Core Patterns"](../../chapters/04-enterprise-knowledge-graphs/index.md).

```text
Type: microsim
**sim-id:** graph-etl-pipeline
**Library:** p5.js
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Learners can explain what happens to a source record at each stage of a graph ingestion pipeline, from raw extraction to loaded graph node.

Instructional Rationale: A step-through animation is appropriate because the Understand objective requires learners to trace a concrete transformation — seeing a specific record change form at each pipeline stage makes the abstract process concrete.

Canvas: responsive width via updateCanvasSize() as first line of setup(). Height: 480px. White background.

Layout: Five stage boxes arranged left to right, labeled "1. Extract", "2. Resolve", "3. Transform", "4. Validate", "5. Load". Each box is 100px wide, 200px tall, centered vertically.

A "Record Card" travels from left to right through the stages. The card shows the record's content at each stage:
- Stage 1 (Extract): shows raw source format — "cust_id: 8821-B, name: Acme Corp, rev: $2.1M, sys: CRM-legacy"
- Stage 2 (Resolve): shows canonical ID mapping — "canonical_id: ENT-00441872, matched via: email + name fuzzy, confidence: 0.97"
- Stage 3 (Transform): shows graph format — "Node: Customer {id: ENT-00441872, name: 'Acme Corp', revenue_usd: 2100000, label: 'Customer'}"
- Stage 4 (Validate): shows validation result — "✓ ID format: valid | ✓ Revenue > 0: true | ✓ Schema version: v2.4 | ✓ No duplicate"
- Stage 5 (Load): shows load confirmation — "UPSERT Customer(ENT-00441872) — updated 2 properties, ingestion timestamp recorded"

Controls: "Next Stage" button and "Previous Stage" button (p5.js createButton). Stage indicator shows "Stage N of 5: [stage name]". Progress bar above the stage boxes highlights the current stage in indigo.

Failed validation variant: a "Simulate Validation Failure" toggle button. When active, Stage 4 shows a failure result — "✗ Revenue = -500: negative revenue invalid | ACTION: flagged for steward review | Node NOT loaded" — and the card stops at Stage 4, demonstrating that bad data is quarantined rather than silently loaded.

Canvas responds to window resize events.
```

## Related Resources

- [Chapter 4: "Chapter 4: Enterprise Knowledge Graphs — Core Patterns"](../../chapters/04-enterprise-knowledge-graphs/index.md)
