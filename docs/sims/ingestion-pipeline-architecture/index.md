---
title: Ingestion Pipeline Architecture
description: Learners can explain how decision events flow from source systems through the real-time and batch ingestion pipelines to the graph database and vector index.
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Ingestion Pipeline Architecture



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: "Chapter 15: Building and Deploying Context Graph Systems"](../../chapters/15-building-deploying/index.md).

```text
Type: graph-model
**sim-id:** ingestion-pipeline-architecture
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Learners can explain how decision events flow from source systems through the real-time and batch ingestion pipelines to the graph database and vector index.

Instructional Rationale: A clickable architecture diagram is appropriate for the Understand objective — learners trace the flow of a specific event through the diagram, which makes the abstract pipeline concrete.

Canvas: responsive width, 560px height. Light gray background.

Nodes arranged in three columns:
**Left — Sources:**
- "AI Agents" (orange, ellipse)
- "Human Capture UI" (orange, ellipse)
- "Operational Systems (CDC)" (orange, ellipse)
- "Historical Archives (Batch)" (gray, ellipse)

**Center — Pipeline:**
- "Event Stream / Message Queue" (gold, box, wide) — real-time path
- "Batch ETL Scheduler" (gray, box) — batch path
- "Ingestion Service" (indigo, box, large)
  - Sub-components shown as smaller boxes inside: "Schema Validator", "Entity Resolver", "Embedding Generator"

**Right — Storage:**
- "Graph Database" (teal, cylinder shape)
- "Vector Index" (steel blue, cylinder shape)
- "Ingestion Monitor" (red, small box) — connected to both storage nodes

Edges:
- AI Agents → Event Stream, label "publishes events"
- Human Capture UI → Event Stream, label "submits traces"
- Operational Systems → Event Stream, label "CDC events"
- Historical Archives → Batch ETL, label "scheduled exports"
- Event Stream → Ingestion Service, label "real-time stream"
- Batch ETL → Ingestion Service, label "batch loads"
- Ingestion Service → Graph Database, label "writes traces"
- Ingestion Service → Vector Index, label "writes embeddings"
- Ingestion Monitor → Graph Database, label "monitors"
- Ingestion Monitor → Vector Index, label "monitors"

Click on Event Stream: "**Message Queue** — provides durability and backpressure. Events are persisted until processed. If the ingestion service goes down, events queue up and are processed in order when service resumes. Capacity: handles burst rates from all sources simultaneously."
Click on Ingestion Service: "**Ingestion Service** — validates schema, resolves canonical entity IDs, generates embedding vector, and atomically writes to graph + vector index. Latency target: < 3 seconds end-to-end from event to stored trace."
Click on each storage node: shows selection criteria and latency targets.
Click on Ingestion Monitor: "**Monitoring** — watches for: high queue depth (ingestion lag), write error rate spikes, schema validation failure rate, and entity resolution failure rate. Alerts when any metric exceeds threshold."

Hover over edges shows edge labels.
```

## Related Resources

- [Chapter 15: "Chapter 15: Building and Deploying Context Graph Systems"](../../chapters/15-building-deploying/index.md)
