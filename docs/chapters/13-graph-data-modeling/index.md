---
title: "Chapter 13: Graph Data Modeling for Context"
description: "The graph data modeling toolkit for context graphs: bitemporal modeling, valid and transaction time, temporal edges, constraint enforcement, schema evolution, and multi-version patterns."
generated_by: claude skill chapter-content-generator
date: 2026-05-18 16:40:00
version: 0.08
---

# Chapter 13: Graph Data Modeling for Context

## Summary

Presents the graph data modeling toolkit for context: bitemporal modeling, valid and transaction time, temporal edges, constraint enforcement, schema evolution, and multi-version patterns.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Context Graph Node Types
2. Context Graph Edge Types
3. Temporal Edge
4. Time-Stamped Property
5. Bitemporal Modeling
6. Slowly Changing Dimension
7. Entity Linking in Context Graph
8. Cross-Graph Reference
9. Context Graph Index Design
10. Context Graph Constraint
11. Context Graph Migration
12. Context Graph Versioning
13. Context Graph Snapshot
14. Subgraph Extraction
15. Context Graph Merge
16. Property Normalization
17. Context Graph Cardinality
18. Context Graph Relationship Design
19. Event-Driven Graph Update
20. Context Graph Test Pattern
21. Bitemporal Query
22. Valid Time
23. Transaction Time
24. Graph Constraint Enforcement
25. Graph Schema Evolution

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: What a Context Graph Is](../09-context-graph-definition/index.md)
- [Chapter 11: Decision Traces: Anatomy and LPG Patterns](../11-decision-traces/index.md)

---

!!! mascot-welcome "Modeling time and truth with precision."
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waves welcome">
    Welcome to Chapter 13! You have the decision trace schema from Chapter 11. This chapter adds the temporal dimension — the precise techniques for modeling how facts change over time in a graph. Bitemporal modeling is one of the most powerful tools in the data modeler's kit, and it is essential for a context graph that must answer "what was true when?" Let's trace the why!

## Introduction

Enterprise decisions are not timeless. A pricing policy is in effect from date A to date B. A customer's credit tier was changed on a specific day by a specific person for a specific reason. An approval that was valid last quarter may have been superseded this quarter. An entity that was linked to a contract last year may have been legally reorganized since then.

A context graph that does not model time correctly will return incorrect answers for historical queries — and historical queries are exactly the kind that matter most for audit, compliance, and LLM-grounded reasoning. "What did we know about this customer at the time of the contract renewal decision?" requires not just that the information was ever in the graph, but that it can be retrieved as it stood at a specific historical moment.

This chapter introduces the graph data modeling toolkit for temporal context: bitemporal modeling, temporal edges, slowly changing dimensions, and the constraint enforcement and schema evolution patterns that keep a production context graph correct as it grows and changes over time.

## Bitemporal Modeling: Two Dimensions of Time

Before we can design temporal edges and properties, we need to distinguish two fundamentally different kinds of time that appear in organizational data.

**Valid time** is when a fact was true in the real world. The customer's annual revenue was $2.1 million from January 1st through December 31st of last year — that is the valid time of that fact. Valid time is a property of the fact itself, independent of when anyone recorded it.

**Transaction time** is when a fact was recorded in the database. The revenue figure was entered into the system on February 14th, after the audit closed. Transaction time is a property of the record in the database, independent of when the underlying fact was true.

**Bitemporal modeling** stores both time dimensions independently. A bitemporally modeled record carries four timestamps: `valid_from`, `valid_to` (the period during which the fact was true in reality), `transaction_from`, and `transaction_to` (the period during which this record was current in the database). This two-dimensional model enables two families of queries that are impossible with single-time systems:

- **Historical-state queries**: "What was true in the real world on date X?" — answered by filtering on valid time.
- **Audit queries**: "What did the system know (and record) on date Y?" — answered by filtering on transaction time.
- **Bitemporal queries**: "What did the system record about what was true on date X, as of what the system knew on date Y?" — answered by filtering on both time dimensions simultaneously.

The last family — bitemporal queries — is the most powerful and the most demanding. It enables the context graph to answer questions like: "At the time we made the exception decision (transaction time: March 15th), what did we believe the customer's credit tier to be (transaction time filter), and when was that credit tier actually assigned (valid time filter)?" This is exactly the kind of question that arises in compliance investigations and that a single-time system cannot answer correctly.

### Valid Time in the Context Graph

In the context graph, valid time is implemented on both node properties and edges. A **time-stamped property** carries a valid-time range: `credit_tier = "Tier 1", valid_from = "2024-06-01", valid_to = null` (null meaning "currently valid"). When the credit tier changes, the old property's `valid_to` is set to the change date, and a new property with the new value and a new `valid_from` is added.

A **temporal edge** carries valid time as edge properties. The edge `(Customer)-[:HAS_TIER]->(CreditTier: Tier1)` might carry `valid_from = "2024-06-01", valid_to = "2025-03-31"`. When querying current state, filters exclude edges whose `valid_to` is before today. When querying historical state at date X, filters include only edges whose `valid_from <= X <= valid_to` (or `valid_to is null`).

The design choice for a context graph is whether to model changing facts as: (a) time-stamped properties on nodes (simpler, but harder to query temporal ranges efficiently), (b) temporal edges connecting to versioned value nodes (more complex schema, but more traversal-friendly for temporal pattern queries), or (c) separate versioned node instances linked by `SUPERSEDED_BY` edges (most explicit, best for audit trails, highest storage cost). The right choice depends on how frequently the fact changes and how complex the temporal queries over it need to be.

### Transaction Time in the Context Graph

Transaction time is implemented through the write path: every write to the context graph records a `transaction_time` on the ingested node or edge. This is typically the timestamp of the write API call. Transaction time is immutable once set — it records when the fact entered the database, not when the fact was true.

Because transaction time is immutable, the context graph can support audit queries by filtering on transaction time ranges. "Show me every record that was in the context graph as of March 15th" is answered by filtering all nodes and edges where `transaction_time <= 2025-03-15T23:59:59Z`. This enables point-in-time database snapshots without requiring a full database backup — the bitemporal model is itself a queryable historical record.

#### Diagram: Bitemporal Modeling — Two Time Dimensions

<iframe src="../../sims/bitemporal-explorer/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive MicroSim showing valid time vs. transaction time for a credit tier change, with a slider to explore the two-dimensional time space</summary>
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
</details>

## Slowly Changing Dimensions in the Context Graph

**Slowly Changing Dimensions (SCDs)** is a well-established pattern from data warehousing for managing attributes that change infrequently over time. The pattern is directly applicable to entity nodes in the context graph that carry time-varying properties.

In the SCD framework, a node property that never changes is a Type 1 attribute (overwrite the old value). A property that must retain history is a Type 2 attribute (create a new record for the new value, mark the old record as expired). A property that summarizes history is a Type 3 attribute (keep both the current value and the previous value, but no older history).

For context graph node design, Type 2 SCD is the most important pattern: entity nodes whose properties change over time should carry time-stamped properties (or be linked to versioned value nodes) so that historical queries return the value that was correct at the historical point in time. A customer's industry classification, credit tier, contract tier, and account status are all examples of slowly changing properties that must be Type 2 managed in a context graph that needs to answer historical queries.

The practical implementation is: never update a property in place. Instead, set the `valid_to` on the current value and add a new time-stamped property with the new value and a `valid_from` equal to the effective date of the change. This append-only property update pattern ensures that no historical value is ever destroyed.

## Entity Linking and Cross-Graph References

A context graph does not exist in isolation — it must link to entity nodes in the enterprise knowledge graph (Chapter 4), to policy version nodes in the document management system (Chapter 6), and to source data nodes representing values from operational systems (Chapter 7). These links across graph boundaries are called **cross-graph references**.

**Entity linking in the context graph** means that Decision Trace Nodes carry APPLIES_TO edges that reference the canonical entity IDs defined in the enterprise knowledge graph. These are not copies of entity data — they are references. When an LLM queries "show me all decisions about Customer ENT-00441872," the context graph traverses the APPLIES_TO edges from all Decision Trace Nodes to find the ones linked to this entity ID, without requiring customer data to be duplicated inside the context graph.

Cross-graph references require that the two graphs share a common entity ID namespace. This is why canonical entity resolution (Chapter 4) is a prerequisite for context graph deployment: without canonical IDs, you cannot reliably link decision traces to the entities they concern.

A **cross-graph reference** node is a lightweight proxy node in the context graph that holds the canonical entity ID and a type label, but no other entity properties. The proxy node serves as the APPLIES_TO target for decision trace edges. Its properties are minimal: `entity_id` (canonical ID from the enterprise knowledge graph), `entity_type` (the node label), and a `graph_source` pointer to which graph system holds the full entity record. When the LLM needs the full entity properties (not just the ID), it follows the pointer to the enterprise knowledge graph — the context graph does not duplicate entity data.

## Context Graph Index Design

A context graph without indexes is functionally correct but practically unusable for the sub-200ms retrieval latency that LLM applications require. **Context graph index design** is the practice of choosing which node properties and edge patterns to index, and in what form.

For a standard context graph, the following indexes are required for production performance:

**Node ID index**: every node type must have a hash index on its primary ID property (`trace_id`, `entity_id`, `policy_id`). This enables O(1) lookup by ID — the starting point for most traversal queries.

**Decision type index**: a B-tree or hash index on the `decision_type` property of Decision Trace Nodes, enabling fast filtering by type without full-node scans.

**Temporal index**: a range index on `timestamp_decision` and on `valid_from` / `valid_to` properties. Temporal range queries (all decisions in the last 24 months) must execute in milliseconds on a graph with millions of nodes. Without a range index on the temporal properties, this requires a full scan.

**Entity reference index**: an index on the APPLIES_TO edge's target entity ID, enabling the query "all decision traces for entity ENT-00441872" to start with an indexed lookup rather than a scan of all decision traces.

**Full-text index**: on the `context_summary` property of Decision Trace Nodes, enabling keyword search over decision descriptions. This is the fallback retrieval path when semantic embedding search is not available.

**Vector embedding index**: if decision traces are encoded as embedding vectors (for semantic similarity retrieval), an Approximate Nearest Neighbor index (such as HNSW) on the embedding vector property enables sub-millisecond semantic search at scale.

The vector embedding index and the graph traversal indexes are complementary, not competing. A production context graph retrieval pipeline typically starts with one (vector similarity for semantic matching) and then uses the other (graph traversal for relationship expansion) to collect the full context subgraph around the top-ranked matches.

## Context Graph Constraints and Schema Evolution

A context graph without constraints will accumulate invalid data: decision traces without required edges, entities with duplicate canonical IDs, temporal edges with overlapping valid-time ranges. **Graph constraint enforcement** is the set of rules applied at write time to prevent invalid data from entering the graph.

**Context graph constraints** include:

- **Uniqueness constraints**: no two Decision Trace Nodes may have the same `trace_id`. No two entity proxy nodes may have the same `entity_id` + `entity_type` combination.
- **Required edge constraints**: a Decision Trace Node of type `pricing_exception` must have at least one DECIDED_BY edge and one GOVERNED_BY edge before its status is set to `active`.
- **Temporal non-overlap constraints**: for a given entity + property combination, the valid-time ranges of successive values must not overlap. If two time-stamped property values for the same fact have overlapping `valid_from` / `valid_to` ranges, one of them is incorrect.
- **Referential integrity**: every cross-graph reference node must have a `graph_source` pointer, and the entity ID must resolve to a valid record in the referenced graph system.

Constraints are enforced by the write API before committing new nodes or edges to the graph. Constraint violations are returned as structured error responses with the violated constraint name and the conflicting values — enabling the caller to fix the issue before retrying.

**Graph schema evolution** is the process of changing the context graph schema over time without breaking existing data or queries. Schema evolution is inevitable: as new decision types are introduced, new edge types are needed; as governance requirements change, new required properties are added to existing node types; as performance bottlenecks are identified, new indexes are added.

Safe schema evolution follows three principles. First, **additive changes only** in forward evolution: add new node types, edge types, properties, and constraints; never remove or rename existing ones in a way that breaks existing queries. When a property needs to be renamed, add the new property name alongside the old one, migrate data, then deprecate the old name with a future removal date. Second, **version your schema**: maintain a schema version registry (using the metadata registry concepts from Chapter 6) that records what schema version each node and edge was created under. Third, **test before deploying**: use a **context graph test pattern** — a set of canonical test queries and expected results — to verify that schema changes do not break existing retrieval behavior.

**Context graph migration** is the process of transforming existing graph data when a schema change requires data modification (not just additive changes). Migrations must be: idempotent (safe to run multiple times), reversible (with a rollback migration), and run against a copy of the graph before the production graph. The migration is not complete until the test pattern passes on the migrated data.

!!! mascot-warning "Never rename a node label or edge type in a production graph."
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Nexus looking concerned">
    Renaming a node label or edge type in a graph database typically requires rewriting every affected node or edge — a full-graph scan that can take hours on a large graph and requires downtime or careful dual-write coordination. The safest approach is: keep the old label alongside the new one during a transition period, update all writers and readers to use the new label, verify with the test pattern, then schedule a migration to remove the old labels during a maintenance window.

## Subgraph Extraction and Context Graph Snapshots

For LLM context retrieval, the read path assembles a subgraph of relevant nodes and edges — not the full context graph. **Subgraph extraction** is the process of selecting a connected portion of the graph that is relevant to a specific query and serializing it for injection into the LLM context window.

A standard subgraph extraction for a decision context query works as follows. Starting from the target entity node, traverse APPLIES_TO edges to find relevant Decision Trace Nodes. From each Decision Trace Node, collect: the DECIDED_BY actor (name, role), the APPROVED_BY actor, the GOVERNED_BY policy version (version string, effective dates), the top-K CITES precedents (ranked by in-degree), and the CONSULTED source data nodes (with their freshness and quality annotations). This subgraph is then serialized into a structured narrative format for LLM consumption.

The serialization format matters for LLM performance. A structured natural-language format (each decision trace rendered as a bullet-pointed summary with consistent fields) outperforms raw JSON for most LLM reasoning tasks, because the model has been trained extensively on structured prose rather than graph-format JSON. The context graph API should expose a "human-readable serialization" endpoint that returns the subgraph in LLM-optimized format, not just the raw graph data.

A **context graph snapshot** is a point-in-time export of a portion of the context graph — useful for creating development and testing environments, for sharing context graph data between organizational units, and for disaster recovery. Snapshots should be taken at the schema version level: a snapshot of the context graph captures not just the node and edge data but the schema version registry, the constraint definitions, and the index configurations, so that the snapshot can be restored to a fully operational state without additional configuration.

**Context graph merge** is the process of combining two context graph instances — typically when two organizational units have been operating separate context graphs and need to merge after a reorganization, or when a trial deployment is promoted to production. Merging requires: resolving canonical entity ID conflicts, deduplicating decision traces that were recorded in both graphs for the same event, and reconciling schema differences between the two graph versions.

#### Diagram: Subgraph Extraction for LLM Context Assembly

<iframe src="../../sims/subgraph-extraction/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive vis-network diagram showing how a subgraph is extracted from the full context graph for a specific entity query, and how it is serialized for the LLM</summary>
Type: graph-model
**sim-id:** subgraph-extraction
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Learners can explain how a subgraph extraction query traverses from an entity node to decision traces to their associated actors, policies, and precedents, and explain why the resulting subgraph is serialized into prose for the LLM.

Instructional Rationale: A two-panel interactive diagram — full graph on left, extracted subgraph on right — is appropriate for the Understand objective because learners can see the selection process visually: which nodes are included and which are excluded from the extraction.

Canvas: responsive width, 560px height. White background. Two panels.

**Left panel — Full Context Graph (schematic):**
Shows ~15 nodes of various types with many edges. Most nodes are light gray (not selected). A few nodes are highlighted:
- Target entity: "Customer: Acme Corp" (indigo, bright)
- Three Decision Trace Nodes connected to this customer (gold)
- Actors, policy versions, and precedent nodes connected to the decision traces (teal, smaller)

The highlighted nodes form the subgraph to be extracted.

**Right panel — Extracted Subgraph:**
Shows only the highlighted nodes from the left panel, arranged more cleanly. Edge labels visible.
Below the subgraph: a serialized LLM context block showing the prose format:
```
Decision Trace DT-4482 (2025-10-31):
  Type: pricing_exception
  Decided by: J. Smith (Account Manager)
  Approved by: M. Williams (VP Sales)
  Policy: Pricing Policy v3.2 (effective 2024-01-01)
  Cited precedents: DT-3891 (Q2-2024, favorable), DT-2204 (Q4-2023, favorable)
  Summary: 15% discount approved for Q4 renewal. Strategic account justification.
```

A "Extract" button (createButton) triggers a brief animation where the highlighted nodes in the left panel "fly" to the right panel and the serialized block appears below.

Click on any extracted node in the right panel: shows the raw JSON for that node alongside the prose serialization, illustrating the transformation.

Annotation: "The LLM receives the prose block, not the raw JSON. Structured prose matches the model's training distribution and improves reasoning quality."
</details>

## Cardinality, Normalization, and Relationship Design

Two recurring design decisions in context graph modeling are cardinality (how many nodes on each side of an edge type?) and normalization (should a piece of information be stored as a node property or as a linked node?).

**Context graph cardinality** refers to the maximum and expected count of nodes on each side of an edge type. An APPLIES_TO edge from a Decision Trace to an entity is many-to-one in most cases (one decision about one customer) but may be many-to-many (one decision affecting multiple entities — a policy change that applies to a product category applies to all products in that category). Modeling the cardinality correctly affects index design (one-to-many relationships are more efficiently indexed on the "many" side) and query performance (many-to-many relationships require intersection queries that are more expensive).

**Property normalization** is the choice between storing a value as a property on a node vs. extracting it as a separate linked node. Store as a property when: the value is scalar, unique to the containing node, and does not need to be queried independently. Extract as a linked node when: multiple nodes share the same value (policy version, approval tier, industry classification), the value has its own properties (a policy version node has effective dates, a document reference, and a governance history), or the value changes over time and must be modeled with valid-time ranges.

Decision Trace Nodes should store: primitive scalars (timestamps, flags, confidence levels) as node properties. They should link via typed edges to: actor nodes (because actors participate in many decisions), policy version nodes (because policy versions govern many decisions), and entity proxy nodes (because entities are involved in many decisions). This is the standard normalized context graph design — it avoids duplicating actor and policy data across thousands of decision traces.

**Context graph relationship design** for the CITES edge illustrates a nuanced modeling decision: the edge itself should carry properties (similarity score, finding method, favorability) that are attributes of the relationship between the two decisions, not of either decision individually. In LPG, edge properties are first-class — this is exactly the modeling pattern they are designed for.

**Event-driven graph update** is the architectural pattern for keeping the context graph current without batch pipelines. Instead of polling operational systems for changes on a schedule, the context graph subscribes to event streams from operational systems (using the event sourcing and CDC techniques from Chapter 7). When an entity changes state in an operational system, an event is published; the context graph consumes the event, updates or creates the relevant proxy node and temporal properties, and the change is visible to the next retrieval query within milliseconds. This architecture makes the context graph a real-time representation of organizational state rather than a T-minus-N-hours batch approximation.

## Summary and Key Takeaways

Graph data modeling for context requires mastering two dimensions of time (bitemporal modeling), the full toolkit of temporal edge patterns, and the operational practices (constraints, indexes, schema evolution, snapshot management) that keep a production context graph correct and performant as it grows.

By the end of this chapter, you should be able to:

- Distinguish **valid time** from **transaction time** and explain what each dimension enables for query answering
- Explain **bitemporal modeling** and describe how to answer a bitemporal query by filtering on both time dimensions
- Describe the **Slowly Changing Dimension** Type 2 pattern and explain how it applies to time-varying entity properties in the context graph
- Explain **entity linking** through cross-graph references and describe why canonical entity IDs are a prerequisite
- Name the six standard **context graph indexes** and explain what query type each supports
- List and define four types of **context graph constraints** and explain why constraint enforcement at write time is preferable to post-hoc validation
- Explain the three principles of safe **graph schema evolution**
- Describe **subgraph extraction** and explain why prose serialization outperforms raw JSON for LLM context assembly

??? question "Quick Check"
    A customer's credit tier changed from Tier 2 to Tier 1 on June 1st, 2024, but the change was not recorded in the context graph until July 15th (due to a delay in the integration pipeline). A compliance query asks: "What was this customer's credit tier on June 15th, 2024, according to what the system knew on June 15th, 2024?" Using the bitemporal model, describe what this query returns and why it differs from a query for the credit tier on June 15th as known on August 1st.

    *(Answer: The bitemporal query with valid_time = June 15th AND transaction_time = June 15th returns Tier 2 — because on June 15th, the system had not yet recorded the tier change (transaction_time of the Tier 1 record is July 15th). The query with valid_time = June 15th AND transaction_time = August 1st returns Tier 1 — because by August 1st, the system had recorded the June 1st upgrade. This distinction is critical for compliance: the first query reflects what the system "knew" at the time; the second reflects the corrected historical truth.)*

!!! mascot-celebration "Chapter 13: Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    Bitemporal modeling is one of those concepts that seems complicated until it clicks — and then you can't imagine modeling time any other way. You now have the complete data modeling toolkit for a production context graph. Chapter 14 shows how to connect this context graph to LLMs: retrieval patterns, relevance ranking, token-budget management, and the write-back loop that makes AI agents improve over time. Let's trace the why!

[See Annotated References](./references.md)
