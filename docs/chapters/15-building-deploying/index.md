---
title: "Chapter 15: Building and Deploying Context Graph Systems"
description: "End-to-end system construction: storage layer selection, ingestion pipelines, SDK/REST/GraphQL APIs, caching, replication, monitoring, SLAs, testing strategies, and cost modeling."
generated_by: claude skill chapter-content-generator
date: 2026-05-18 17:10:00
version: 0.08
---

# Chapter 15: Building and Deploying Context Graph Systems

## Summary

Covers end-to-end system construction: storage layer selection, real-time and batch ingestion pipelines, SDK/REST/GraphQL APIs, caching, replication, monitoring, SLAs, and testing strategies.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

1. Context Graph Storage Layer
2. Property Graph Database Selection
3. Vector Index Layer
4. Hybrid Storage Architecture
5. Ingestion Pipeline Design
6. Real-Time Ingestion
7. Batch Ingestion
8. Backfill Strategy
9. Schema Evolution
10. Context Graph SDK
11. Context Graph REST API
12. Context Graph GraphQL API
13. Event-Driven Ingestion
14. Event Streaming Integration
15. Message Queue Pattern
16. Context Graph Caching
17. Context Graph Replication
18. Context Graph Monitoring
19. Context Graph Alerting
20. Context Graph Performance Tuning
21. Context Graph SLA
22. Context Graph Deployment Pattern
23. Context Graph Testing Strategy
24. Context Graph Cost Model

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: What a Context Graph Is](../09-context-graph-definition/index.md)
- [Chapter 13: Graph Data Modeling for Context](../13-graph-data-modeling/index.md)
- [Chapter 14: Integrating LLMs with Context Graphs](../14-llm-integration/index.md)

---

!!! mascot-welcome "From design to production."
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waves welcome">
    Welcome to Chapter 15! The design is complete. Now we build and ship it. This chapter is the production engineering playbook — storage selection, ingestion pipelines, API design, monitoring, and testing. By the end, you will have everything you need to take a context graph from whiteboard to running system. Let's trace the why!

## Introduction

A context graph that exists only in design documents helps no one. This chapter covers what it takes to build a production-grade context graph system — one that handles real load, maintains sub-200ms retrieval latency, ingests decision traces in real time, survives node failures, recovers from schema migrations, and tells you when something goes wrong before your users do.

The decisions you make in this chapter — storage layer, API design, ingestion architecture, caching strategy — compound over time. A storage layer that is correct for 10 million decision traces may need significant rearchitecting at 1 billion. An API design that is convenient for one integration pattern may become a bottleneck when you add five more consumers. This chapter gives you the principles to make choices that scale, not just choices that work today.

## Storage Layer Selection

The **context graph storage layer** is the combination of systems that persist the graph data and serve queries. A production context graph requires two complementary storage components, which together constitute a **hybrid storage architecture**.

**Property graph database selection** is the first decision. The graph database must support: native graph storage with index-free adjacency (for fast multi-hop traversal), temporal property modeling (for bitemporal queries), horizontal scaling through sharding and replication (for large graphs), and a graph query language compatible with the context graph's query patterns (GQL or Cypher are the standard choices).

Key selection criteria for the graph database:

- **Traversal performance**: measured as latency for a 4-hop traversal over the entity-decision-actor-policy subgraph on a production-sized graph. Target: < 20ms at the 95th percentile.
- **Write throughput**: measured as decision trace writes per second at sustained load. Target: sufficient to handle peak event ingestion rates from all source systems.
- **Transaction support**: decision trace writes must be atomic — a trace that is partially written (node without required edges) should never be visible to readers.
- **Schema constraint enforcement**: the database must support uniqueness constraints and required property validations at the write level, not just at the application level.

**Vector index layer** is the second component of the hybrid storage architecture. A specialized vector index stores the embedding vectors for decision trace context summaries and supports approximate nearest-neighbor search. The vector index does not need to store the full graph data — it stores only the embedding vectors and the corresponding decision trace IDs (which the retrieval pipeline uses to fetch the full node from the graph database). Key selection criteria: ANN search latency (target: < 30ms for top-100 results at 10M vectors), memory efficiency (embedding vectors are large — 1536 dimensions × 4 bytes × 10M traces = ~60GB), and support for metadata filtering (combining vector similarity with decision_type, entity_id, or timestamp filters in a single query pass).

The two storage components are not alternatives — they are complementary. The graph database serves traversal queries (entity-linked decision history, precedent chains, policy version lookups). The vector index serves semantic similarity queries (find decisions semantically similar to this query, regardless of entity link). The hybrid retrieval pipeline (Chapter 14) uses both in every query.

## Ingestion Pipeline Design

**Ingestion pipeline design** determines how decision traces get from their source (automated systems, human capture interfaces, operational event streams) into the graph database and vector index in a reliable, consistent, and timely manner.

A production ingestion pipeline has two modes that run in parallel: real-time ingestion (for decision traces generated by live systems) and batch ingestion (for historical backfill and low-velocity sources).

### Real-Time Ingestion

**Real-time ingestion** is the critical path for maintaining context freshness. It must process decision traces within seconds of their creation, making them available to the next retrieval query with minimal latency.

**Event-driven ingestion** is the architectural pattern for real-time capture. Decision sources (AI agents, workflow automation platforms, human capture interfaces) publish decision events to a **message queue** or event streaming platform. The ingestion service subscribes to the event queue, processes each event, validates the decision trace against the schema, resolves entity references to canonical IDs, generates the embedding vector for the context summary, and writes the trace node (with its edges) to the graph database and the vector index in a single atomic operation.

**Event streaming integration** with an existing enterprise event infrastructure (a message broker, a streaming platform) enables the ingestion pipeline to receive decision events from many sources without each source needing a direct API integration with the context graph. Sources publish to named event topics; the ingestion service subscribes to the relevant topics. When a new decision type or a new source system is added, only the event topic subscription needs to change — not the ingestion architecture.

The **message queue pattern** provides durability: events are stored in the queue until the ingestion service successfully processes them. If the ingestion service is temporarily unavailable (maintenance, deployment), events accumulate in the queue and are processed in order when the service resumes. No events are lost. The queue also provides backpressure — if the ingestion service cannot keep up with the event rate, the queue grows, signaling that ingestion capacity needs to scale.

Real-time ingestion latency target: from event published to trace visible in retrieval query results, < 5 seconds at the 95th percentile.

### Batch Ingestion

**Batch ingestion** processes large volumes of historical or low-velocity data on a scheduled cadence. Sources that produce batch exports (daily HR snapshots, weekly contract updates, monthly financial reconciliations) feed the batch ingestion pipeline.

A **backfill strategy** is a batch ingestion plan for loading historical decision data that predates the context graph deployment. Most organizations have years of decision history that can be partially reconstructed from operational system records: approval logs, email threads, change management tickets, audit trails. Backfilling this history significantly accelerates the context graph's time-to-value by providing precedents from day one rather than requiring months of live capture.

Backfill requires a priority ordering: fill the highest-volume, highest-value decision types first (pricing exceptions, procurement approvals, incident escalations), since these are the domains where LLM context retrieval provides the most immediate value. Full historical reconstruction is rarely necessary — 2-3 years of backfill typically provides sufficient precedent depth for most decision types.

#### Diagram: Ingestion Pipeline Architecture

<iframe src="../../sims/ingestion-pipeline-architecture/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive vis-network architecture diagram showing the real-time and batch ingestion pipelines feeding the hybrid storage architecture</summary>
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
</details>

## API Design: REST, GraphQL, and SDK

A context graph system exposes three API surfaces to consuming applications. Each serves a different consumer profile and interaction pattern.

**Context graph REST API** serves simple, point-in-time queries from applications that want standard HTTP/JSON integration. REST endpoints are defined for the most common query patterns: retrieve decision history for an entity, retrieve a specific decision trace by ID, retrieve precedents for a decision type, write a new decision trace. REST is the lowest-barrier integration option and is appropriate for most application integrations.

Standard REST endpoint patterns:
- `GET /entities/{entity_id}/decisions?type=pricing_exception&recency=24mo` — retrieve decision history
- `GET /decisions/{trace_id}` — retrieve a specific trace with its full subgraph
- `POST /decisions` — write a new decision trace
- `GET /decisions/{trace_id}/precedents?limit=10` — retrieve ranked precedents for a trace
- `GET /decisions/search?query={text}&entity_id={id}` — semantic search over decision summaries

**Context graph GraphQL API** serves advanced consumers that need flexible, arbitrary subgraph queries. GraphQL allows the client to specify exactly which node and edge properties to include in the response, avoiding over-fetching. For LLM applications that need to assemble custom context packages, GraphQL enables: "give me the customer entity, its last 5 pricing decisions, and for each decision the actor name, the policy version string, and the top-2 cited precedents" in a single query — without requiring a custom REST endpoint for each specific combination.

GraphQL also enables subscription queries — clients can subscribe to new decision traces for a specific entity and receive real-time push notifications when new traces are written. This is the mechanism for keeping LLM agent context windows fresh during long-running processes.

**Context graph SDK** packages the REST and GraphQL APIs into a language-native library (Python, TypeScript/JavaScript, Java) with convenience methods for the most common operations. The SDK handles: authentication, connection pooling, retry logic, error handling, and serialization of decision trace objects to and from the graph's format. An SDK with good defaults dramatically reduces the integration effort for AI agent developers who want to add context graph write-back to their agents without becoming graph database experts.

## Caching, Replication, and Performance Tuning

**Context graph caching** reduces retrieval latency and LLM API costs by storing the results of common retrieval queries in a fast cache layer. Not all query results are equally cacheable:

- **Entity decision history**: highly cacheable. An entity's recent decision history changes relatively slowly (new decisions are added, but existing ones are not modified). Cache with a TTL proportional to the entity's decision velocity (high-volume entities: 30-second TTL; low-volume entities: 5-minute TTL).
- **Precedent rankings**: moderately cacheable. Precedent rankings change when new high-in-degree decisions are added or when lifecycle statuses change. Cache with a 10-minute TTL.
- **Real-time decision context for active workflows**: do not cache. A decision being actively processed may have a new trace written seconds before the retrieval query — caching this context risks serving stale information at exactly the moment when freshness matters most.

The cache should be keyed by the retrieval specification (entity_id + decision_type + recency + max_results) to enable cache hits for identical queries across different sessions.

**Context graph replication** maintains synchronized copies of the graph data across multiple physical locations for: high availability (read replicas can serve retrieval queries when the primary is under maintenance), geographic distribution (reads from European LLM applications can be served by a European replica without transatlantic latency), and read-write separation (write traffic goes to the primary, read traffic is distributed across replicas, keeping the primary's write path uncongested).

**Context graph performance tuning** is an ongoing practice, not a one-time setup. Key performance metrics to monitor continuously:

- **Traversal latency at P95**: the 95th percentile latency for a standard 4-hop traversal query. If this drifts above 50ms, the index configuration or shard distribution may need adjustment.
- **Embedding search latency at P95**: the time for a vector ANN search to return top-100 results. Should be < 30ms.
- **Ingestion queue depth**: the number of unprocessed events in the message queue. A growing queue indicates that ingestion capacity is insufficient for the current event rate.
- **Cache hit rate**: the fraction of retrieval queries served from the cache. A hit rate below 40% may indicate over-aggressive TTLs or a query pattern that is too diverse for effective caching.

## Context Graph SLAs and Monitoring

A **context graph SLA** (Service Level Agreement) defines the performance and availability commitments the system makes to its consumers. A standard context graph SLA for an enterprise decision support application:

- **Retrieval latency**: P50 < 80ms, P95 < 200ms, P99 < 500ms
- **Ingestion latency**: from event published to trace visible in retrieval, P95 < 5 seconds
- **Availability**: 99.5% uptime (< 22 hours downtime per year), with < 5 minutes planned maintenance window per week
- **Data freshness**: decision traces written to the context graph are visible to retrieval queries within the ingestion latency SLA
- **Accuracy**: faithfulness score > 0.85 on continuous sample monitoring

**Context graph monitoring** requires instrumentation at three levels:

**Infrastructure monitoring**: CPU, memory, disk I/O, and network metrics for the graph database and vector index instances. Alert thresholds are set at 80% utilization to provide lead time for capacity planning.

**Application monitoring**: query latency histograms, ingestion throughput (events per second), cache hit rates, schema validation error rates, entity resolution failure rates, and LLM API error rates. These metrics tell you how the system is performing at the application layer, not just the infrastructure layer.

**Business monitoring**: the metrics that matter to the organizations consuming the context graph — faithfulness score of LLM outputs, decision quality (measured by downstream outcomes), and coverage (what fraction of decision events in the source systems are being captured as traces). Business monitoring is the ultimate validation that the system is delivering value, not just running correctly.

**Context graph alerting** requires distinct alert channels for different severity levels. A graph database node failure at 3 AM needs an immediate page to the on-call engineer. A gradual drift in faithfulness score from 0.92 to 0.87 over two weeks should generate a ticket for the engineering team's next sprint. A full outage of the vector index should page immediately; a batch ingestion job that runs 30 minutes late should generate a low-urgency notification.

## Testing Strategy

A **context graph testing strategy** has four layers, each verifying different properties.

**Unit tests** verify individual components in isolation: schema constraint validation logic, entity resolution functions, embedding generation, and serialization/deserialization of decision trace objects. Unit tests should run in < 30 seconds and should not require a running graph database.

**Integration tests** verify that components work together correctly: that a decision trace written via the write API appears correctly in the graph database, with the right edges and properties; that a retrieval query against a known dataset returns the expected candidates in the expected order; that schema migration scripts transform test fixtures correctly.

**End-to-end tests** verify the full pipeline from event publication to LLM context retrieval: publish a decision event to the test event stream, verify it appears in the graph within the SLA latency, execute a retrieval query that should return this event, verify the query result contains the expected trace with correct properties, run the result through a test LLM call and verify the faithfulness score.

**Contract tests** verify that the context graph API behavior matches the contract that consuming applications expect. When an API change is proposed, contract tests verify that existing consumers will not break. Contract tests are particularly important for the context graph GraphQL API, where the schema is rich and breaking changes are easy to introduce accidentally.

!!! mascot-tip "Start with a tight SLA and relax it, never the opposite."
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Nexus giving a tip">
    A common mistake is to launch without SLAs and add them later when performance problems emerge. By that time, consumers have built applications with implicit assumptions about latency that are hard to revise. Set the SLAs before the first consumer integrates, even if they are conservative — P95 < 500ms is achievable on day one and gives you headroom to improve. You can always tighten an SLA as you optimize; you cannot easily relax a SLA that consumers have already designed around.

## Context Graph Cost Model

**Context graph cost model** is the framework for estimating and managing the operational costs of running a context graph system. The costs decompose into four categories:

**Storage costs** scale with the number of nodes and edges in the graph database, and with the number and dimensionality of embedding vectors in the vector index. A reasonable estimate: 10 million decision traces with their associated subgraph nodes and edges, plus embeddings, requires approximately 100-200GB of storage across the two systems.

**Compute costs** scale with query volume (retrieval queries per second) and ingestion volume (decision traces per second). The graph database and vector index instances must be sized to handle peak load. Reserved compute pricing can significantly reduce costs vs. on-demand pricing for sustained workloads.

**LLM API costs** are the most significant cost driver in most context graph deployments: the cost of the embedding generation calls (one call per new decision trace, plus one call per retrieval query for the query embedding), the reranking calls (if using an LLM-based reranker), and the faithfulness evaluation calls (if using an LLM-based output validator). At scale (100,000 retrieval queries per day), LLM API costs can exceed infrastructure costs by a factor of 2-3x.

**Integration and maintenance costs** — the engineering time to maintain integrations with source systems, handle schema migrations, update the SDK for new consumers, and operate the monitoring and alerting infrastructure — are often underestimated in initial cost models and should be planned for explicitly.

Optimizations that significantly reduce total cost: caching (reduces redundant LLM API calls for repeated queries), context compression (reduces token usage in LLM calls by 30-50%), batch embedding generation (generates embeddings in batches rather than one per event, reducing API call overhead), and tiered storage (moving historical decision traces to cheaper cold storage while keeping recent traces in the fast graph database).

## Summary and Key Takeaways

Building a production context graph system requires decisions across the full engineering stack — storage, ingestion, APIs, caching, replication, monitoring, testing, and cost management. The choices at each layer compound: a storage layer chosen for today's load may need rearchitecting at 10x scale, and an API design that is convenient for one consumer may become a bottleneck at ten.

By the end of this chapter, you should be able to:

- Describe the **hybrid storage architecture** and explain why a property graph database and a vector index are both required
- Explain the difference between **real-time ingestion** and **batch ingestion** and describe when each is appropriate
- Explain the **event-driven ingestion** pattern and the role of the **message queue** in providing durability
- Describe the three API surfaces (REST, GraphQL, SDK) and explain which consumer profile each serves
- Explain what is cacheable vs. not cacheable in a context graph retrieval system and why
- Define a standard **context graph SLA** with specific latency, availability, and freshness targets
- Describe the four layers of a **context graph testing strategy** (unit, integration, end-to-end, contract)
- Enumerate the four categories of the **context graph cost model**

??? question "Quick Check"
    A team is deploying a context graph for a high-frequency trading compliance use case. The system must process 5,000 decision trace events per second at peak, serve retrieval queries in < 100ms, and maintain 99.9% availability. Which two design decisions from this chapter are most critical for meeting these requirements, and what would you do differently for this use case compared to a standard enterprise decision support deployment?

    *(Answer: 1) Real-time ingestion capacity — at 5,000 events/second, the message queue and ingestion service must be horizontally scaled (multiple ingestion service instances consuming from partitioned event stream topics). Standard enterprise deployments may run a single ingestion service; this use case requires auto-scaling. 2) Read replica configuration — 99.9% availability (< 9 hours downtime per year) requires at least two hot read replicas with automatic failover. A standard deployment might use a single primary with manual failover. Additionally: caching TTLs should be much shorter (compliance queries require higher freshness), and the retrieval SLA is tighter (< 100ms vs. standard < 200ms), requiring more aggressive index optimization and potentially dedicated query nodes.)*

!!! mascot-celebration "Chapter 15: Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    You now have the complete production engineering playbook. The context graph is designed, modeled, integrated, and deployable. Chapter 16 zooms out to the agent architecture level — how AI agents use the context graph as their long-term memory, how the write-back loop creates a self-improving system, and how graduated autonomy enables organizations to trust AI agents with progressively more consequential decisions. Let's trace the why!

[See Annotated References](./references.md)
