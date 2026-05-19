---
title: Hub-and-Spoke vs. Federated Architecture
description: Learners can compare hub-and-spoke and federated graph architectures by identifying the trade-offs in governance, autonomy, and query complexity.
status: implemented
library: vis-network
bloom_level: Analyze (L4)
---

# Hub-and-Spoke vs. Federated Architecture



<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: "Chapter 4: Enterprise Knowledge Graphs — Core Patterns"](../../chapters/04-enterprise-knowledge-graphs/index.md).

```text
Type: graph-model
**sim-id:** hub-spoke-vs-federated
**Library:** vis-network
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: compare
Learning Objective: Learners can compare hub-and-spoke and federated graph architectures by identifying the trade-offs in governance, autonomy, and query complexity.

Instructional Rationale: A side-by-side interactive network diagram is appropriate for the Analyze objective because learners must examine structural differences — clicking architecture nodes surfaces the trade-offs that a static diagram cannot convey.

Canvas: responsive width, 520px height. Two side-by-side panels separated by a vertical divider line.

**Left panel — Hub-and-Spoke:**
- Central "Knowledge Graph Hub" node: large, indigo, shape ellipse
- 5 surrounding domain nodes (smaller, teal): "HR System", "Finance System", "CRM System", "ERP System", "Product Catalog"
- Edges: all domain nodes → Hub, label "ingests to"
- "LLM Query" node (orange, small) → Hub, label "queries"
- Panel title: "Hub-and-Spoke"

**Right panel — Federated:**
- "Federation Layer" node: indigo, shape box, central-top
- 5 domain nodes (teal, same labels) arranged below
- Edges: Federation Layer → each domain, label "routes to"
- "LLM Query" node (orange) → Federation Layer, label "queries"
- Panel title: "Federated"

Click on Hub node: "**Hub Trade-offs:** Pro: single source of truth, easy governance, consistent schema. Con: ingestion bottleneck, hub schema must evolve carefully, single point of failure."
Click on Federation Layer: "**Federation Trade-offs:** Pro: domain autonomy, no central bottleneck, diverse stacks welcome. Con: complex cross-domain queries, heterogeneous schemas, partial failure handling."
Click on any domain node (either panel): "**Domain System** — In hub-and-spoke, this system pushes data to the hub via an ETL pipeline. In federation, this system exposes its own graph API and the federation layer routes queries to it directly."
Click on LLM Query node: "**LLM Query** — The LLM agent issues a graph query. In hub-and-spoke, the query always hits the same hub. In federated mode, the federation layer must determine which domain graphs to consult and join the results."

Hover over any edge shows the edge label. Both panels share the same node click handler logic, dispatching on node group.
```

## Related Resources

- [Chapter 4: "Chapter 4: Enterprise Knowledge Graphs — Core Patterns"](../../chapters/04-enterprise-knowledge-graphs/index.md)
