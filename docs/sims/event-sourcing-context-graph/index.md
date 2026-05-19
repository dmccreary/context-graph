---
title: Event Sourcing Architecture for Context Graph
description: Learners can use the event sourcing architecture diagram to trace how a business event flows from a command to the append-only log to the context graph, and identify which component answers which type of query.
status: implemented
library: vis-network
bloom_level: Apply (L3)
---

# Event Sourcing Architecture for Context Graph



<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: "Chapter 7: Process Mining, Data Lineage, and Provenance"](../../chapters/07-process-mining-lineage/index.md).

```text
Type: graph-model
**sim-id:** event-sourcing-context-graph
**Library:** vis-network
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: use
Learning Objective: Learners can use the event sourcing architecture diagram to trace how a business event flows from a command to the append-only log to the context graph, and identify which component answers which type of query.

Instructional Rationale: An interactive architecture diagram with clickable components is appropriate for the Apply objective — learners must identify the role of each component and trace the data flow, which prepares them to design or evaluate a similar architecture.

Canvas: responsive width, 520px height. Light gray background.

Nodes (7, arranged in a left-to-right flow):
1. "Business Event" (indigo, ellipse) — far left, represents a real-world action (e.g., "Invoice Approved")
2. "Command Handler" (teal, box)
3. "Append-Only Event Log" (gold, cylinder shape drawn in p5.js as a rounded rectangle stack)
4. "CDC / Stream Processor" (steel blue, box)
5. "Context Graph" (indigo, large ellipse) — right side
6. "LLM Retrieval API" (orange, box) — far right
7. "Compliance Audit Query" (gray, box) — bottom right, connects to context graph

Edges:
- Business Event → Command Handler "triggers"
- Command Handler → Append-Only Event Log "writes (immutable)"
- Append-Only Event Log → CDC / Stream Processor "streams"
- CDC / Stream Processor → Context Graph "ingests as nodes + edges"
- Context Graph → LLM Retrieval API "serves grounded context"
- Context Graph → Compliance Audit Query "answers temporal queries"

Click on each node: opens infobox with component role and the type of question it answers:
- Business Event: "The real-world action — 'Invoice INV-4482 approved by J. Smith at 14:22 UTC.' Everything starts here."
- Append-Only Log: "Stores events immutably. You can replay from any point. Nothing is deleted. This is your tamper-evident audit trail."
- CDC / Stream Processor: "Converts raw events into graph-ready nodes and edges. Handles entity resolution, schema mapping, and temporal versioning."
- Context Graph: "The read model. Contains the full history of decisions, lineage, and provenance as a queryable graph."
- LLM Retrieval API: "LLM agents query here for grounded context before generating responses."
- Compliance Audit Query: "Answers 'what did the system know and do on date X?' using temporal versioning on graph nodes."

Hover over any edge shows its label.
Physics: hierarchical layout, left to right. Fixed horizontal positions for each column.
```

## Related Resources

- [Chapter 7: "Chapter 7: Process Mining, Data Lineage, and Provenance"](../../chapters/07-process-mining-lineage/index.md)
