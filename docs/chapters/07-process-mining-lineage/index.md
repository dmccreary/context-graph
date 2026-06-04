---
title: "Chapter 7: Process Mining, Data Lineage, and Provenance"
description: "How organizations reconstruct what actually happened from event logs — process mining, IEEE XES, conformance checking, OpenLineage, column-level lineage, event sourcing, and change data capture."
generated_by: claude skill chapter-content-generator
date: 2026-05-18 15:10:00
version: 0.08
---

# Chapter 7: Process Mining, Data Lineage, and Provenance

## Summary

Reconstructs what actually happened from event logs using IEEE XES, process discovery, conformance checking, OpenLineage, column-level lineage, event sourcing, and change data capture.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Process Mining
2. Event Log
3. IEEE XES Standard
4. Process Discovery
5. Conformance Checking
6. Process Enhancement
7. Structured Logging
8. Log Schema
9. Event Stream
10. Graph-Ingestible Log
11. Upstream Lineage
12. Downstream Lineage
13. Column-Level Lineage
14. Data Provenance
15. Custody Chain
16. Transformation History
17. OpenLineage Standard
18. Lineage vs Provenance
19. Event Sourcing
20. CQRS Pattern
21. Append-Only Log
22. Change Data Capture
23. Temporal Versioning
24. Lineage Graph
25. Provenance Record

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Semantic Layers for Data Lakes](../02-semantic-layers/index.md)
- [Chapter 3: Metadata Management](../03-metadata-management/index.md)
- [Chapter 5: Graph Theory, Algorithms, and Advanced Enterprise KG](../05-graph-theory-algorithms/index.md)
- [Chapter 6: Metadata Registries and ISO 11179](../06-metadata-registries/index.md)

---

!!! mascot-welcome "The living history of enterprise activity."
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waves welcome">
    Welcome to Chapter 7! The previous chapters gave us structure: entities, relationships, definitions. This chapter gives us *history*: the record of what actually happened, when it happened, and why the data looks the way it does today. Process mining and data lineage are how organizations reconstruct their own story. Let's trace the why!

## Introduction

Organizations make decisions constantly — approving invoices, onboarding customers, routing incidents, deploying software, pricing orders. Most of these decisions leave traces in operational systems: database updates, log entries, transaction records, message queue events. Individually, each trace is a small, mundane record. Collectively, they constitute the empirical history of how the organization actually works — not how it thinks it works, not how the process documentation says it should work, but how it actually behaves under real conditions.

Three disciplines extract value from this trace data. **Process mining** reconstructs process models from event logs — answering "what process did these transactions actually follow?" and "where did the process deviate from policy?" **Data lineage** tracks the flow of data from its origin through every transformation to its final destination — answering "where did this number come from?" **Data provenance** records the custody chain and transformation history of individual data values — answering "can I trust this value, and who is accountable for it?"

All three feed naturally into context graphs. A context graph that incorporates process mining findings can surface when a decision was made outside the normal process flow — a signal of either genuine exception-handling or of a governance violation. A context graph enriched with lineage data can tell an LLM which data sources contributed to a calculated value — enabling the LLM to caveat its response based on the quality scores of those sources. A context graph with provenance records can answer "this value was touched by three transformations between its source and the LLM's context window — here is who performed each transformation and when."

## Event Logs: The Raw Material of Process Intelligence

An **event log** is a structured record of events that occurred during the execution of a process. Each event in the log typically records: which case (process instance) the event belongs to, what activity was performed, when it was performed, and who or what performed it. An event log for a purchase order process might contain thousands of rows, each recording one step (created, approved, received, invoiced, paid) for one purchase order case.

The key requirement for a useful event log is structure — specifically, three fields that must be present in every event record:

1. **Case ID**: identifies which process instance this event belongs to (e.g., purchase order number PO-44821)
2. **Activity**: identifies what happened (e.g., "Invoice Received," "Payment Approved," "Exception Flagged")
3. **Timestamp**: records when it happened (ideally with millisecond precision and timezone information)

Optional but valuable fields include: the resource that performed the activity (person, system, or agent), additional attributes relevant to the case (amount, customer segment, product line), and outcome fields that record whether the activity succeeded or triggered an exception.

**Structured logging** is the engineering practice of emitting log records in a consistent, machine-readable format — typically JSON or a structured schema — rather than free-form text strings. A free-form log entry like `[2025-03-15 14:22:11] User john.smith@acme.com approved invoice INV-4482 for $52,000` is readable to a human but requires fragile regex parsing to extract the case ID, activity, timestamp, and resource. A structured log entry explicitly fields all of these as named attributes, making it directly ingestible by event log processing pipelines.

A **log schema** formalizes the structure of log records — defining the required and optional fields, their data types, and their semantics. Log schemas should be registered in the metadata registry, versioned, and linked to data element definitions. When the log schema for an invoice processing system is linked to the registry definition of "Invoice Case ID," any downstream system that consumes those logs can interpret the case ID field correctly without additional documentation.

**IEEE XES** (Extensible Event Stream) is the international standard format for event logs, maintained by the Institute of Electrical and Electronics Engineers. XES defines an XML schema for representing event logs, including standardized attributes for case ID (concept:name), activity (concept:name on events), and timestamp (time:timestamp). Process mining tools that support XES can directly consume logs from any system that produces XES-format output, enabling a common toolchain regardless of the source system. The XES standard is the bridge between raw operational log data and the process mining algorithms that extract business insight from it.

## Process Mining: Three Modes of Analysis

**Process mining** is the discipline of applying data mining and machine learning techniques to event logs to discover, analyze, and improve process models. Wil van der Aalst at RWTH Aachen University pioneered the field and formalized its three core analysis modes.

### Process Discovery

**Process discovery** takes an event log as input and outputs a process model — a visualization of the actual process flow derived from the empirical trace data. The output is typically represented as a Petri net, a BPMN diagram, or a directly-follows graph: a graph where nodes represent activities and edges represent the "directly follows" relationship (activity B directly follows activity A if there exists a case where A was completed immediately before B).

Process discovery is powerful because it reveals what actually happens rather than what the documentation says should happen. A team that believes its invoice approval process has three steps will often discover from event logs that the actual process has seven steps, three of which are informal workarounds that have accumulated over years and are not documented anywhere.

For context graphs, process discovery results are a rich source of process topology data: the nodes (activities) and edges (sequence relationships) from a discovered process model map directly to a graph structure that can be queried by LLMs. "What is the standard approval path for a high-value purchase order?" can be answered by querying the process model graph derived from historical event logs.

### Conformance Checking

**Conformance checking** compares an actual event log against a reference process model (derived from policy documents, regulations, or best-practice specifications) and identifies deviations: cases where the actual process did not follow the intended model. Deviations might include skipped steps (a payment was made without an invoice being received), reversed steps (approval came before document submission), or unauthorized activities (a user who should not have access performed an activity).

Conformance checking is the bridge between process mining and compliance. A context graph enriched with conformance checking results can surface, for any historical decision, whether it was made through a conformant or deviant process — critical information for an LLM answering questions about whether a past decision was procedurally sound.

### Process Enhancement

**Process enhancement** uses event log data to augment an existing process model with additional information: performance metrics (average time per activity, bottleneck identification), risk indicators (which paths are associated with exceptions or high error rates), and resource analysis (which teams handle which activities and what their capacity utilization is). Enhanced process models provide the richest context for AI-powered process optimization.

!!! mascot-thinking "Process mining turns log data into graph data."
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Nexus thinking">
    Here's a connection worth making explicit: a directly-follows graph from process discovery is, literally, a graph — nodes are activities, edges are sequence relationships, and edge weights are the frequency with which each transition occurs. That graph can be stored directly in a graph database and queried with the same traversal algorithms we covered in Chapter 5. The process mining output and the context graph are naturally compatible data structures.

#### Diagram: Process Discovery — From Event Log to Process Graph

<iframe src="../../sims/process-discovery-sim/main.html" width="100%" height="562px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive step-through MicroSim showing how an invoice approval event log is converted to a directly-follows process graph</summary>
Type: microsim
**sim-id:** process-discovery-sim
**Library:** p5.js
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Learners can explain how a directly-follows graph is derived from event log data by tracing which activity transitions occur in the log.

Instructional Rationale: A two-panel step-through animation (event log on left, process graph building on right) is appropriate because the Understand objective requires learners to trace a concrete transformation — watching edges appear in the graph as transitions are counted from the log makes the derivation tangible.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 500px. Light gray background.

**Left panel** (40% width): Event Log table showing 10 example events for 3 case IDs:
- Case PO-001: Submit → Review → Approve → Pay
- Case PO-002: Submit → Review → Reject → Revise → Review → Approve → Pay
- Case PO-003: Submit → Approve (skip Review — deviant path)

Each event row highlights in sequence as the animation progresses.

**Right panel** (60% width): Process graph building dynamically.
Nodes (activities): "Submit", "Review", "Approve", "Reject", "Revise", "Pay"
Edges appear one by one as each transition is processed from the event log:
- Submit → Review (weight 2, appears after cases 1 and 2)
- Review → Approve (weight 1)
- Review → Reject (weight 1)
- Reject → Revise (weight 1)
- Revise → Review (weight 1)
- Approve → Pay (weight 2)
- Submit → Approve (weight 1, orange color — deviant direct connection, skip of Review)

Edge thickness scales with weight. Deviant edge (Submit→Approve, skipping Review) rendered in orange.

Controls: "Next Event" button advances one log row at a time, updating the graph. "Auto-play" button animates through all events at 1-second intervals. "Reset" button clears the graph and restarts.

After all events processed, a summary panel appears: "Process discovered from 3 cases, 10 events. 1 conformance deviation detected: Case PO-003 skipped the Review step."

Clicking any graph node highlights all edges from and to that node and shows a count of how many cases passed through this activity.
</details>

## Data Lineage: Following the Data Trail

While process mining follows *activities* through a process, **data lineage** follows *data values* through a data pipeline. Lineage answers the question: for any given piece of data in any system, where did it come from, what transformations did it undergo along the way, and where does it flow downstream?

**Upstream lineage** traces a data value backward from its current location to its original source. If an annual revenue figure in a reporting dashboard is under investigation, upstream lineage would trace it through the data warehouse aggregation step, through the ETL pipeline that loaded the warehouse, to the original records in the ERP billing system. Every transformation, join, filter, and aggregation is a node in the lineage graph.

**Downstream lineage** runs in the opposite direction: given a source data field, which downstream systems, reports, dashboards, APIs, and ML models consume it? Downstream lineage is essential for impact analysis: if the definition of a source field changes, or if a data quality problem is discovered in a source, downstream lineage tells you exactly which consuming systems are affected and in what order.

**Column-level lineage** is the granular form of data lineage: instead of tracking datasets or tables as whole units, column-level lineage tracks the flow of individual columns (fields) through each transformation step. Column-level lineage can answer questions like: "Which source columns contributed to the value in the `gross_margin_pct` column of the revenue dashboard?" — tracing through multiple SQL transformations to identify every input field.

Column-level lineage is substantially harder to capture than table-level lineage because it requires parsing the SQL or transformation logic at each pipeline step to identify which input columns feed into which output columns. Modern lineage systems use SQL parsers and dataflow analysis to extract column-level lineage automatically, without requiring manual documentation.

A **lineage graph** is the directed graph that represents all lineage relationships: nodes are datasets, tables, or columns; edges are transformation or dependency relationships with directionality (upstream to downstream). A lineage graph stored in a graph database can be queried with the same traversal algorithms as any other knowledge graph, enabling sophisticated lineage analysis: "find all columns whose upstream source includes any dataset owned by the team that recently reported a data quality incident."

## Data Provenance: Trust and Accountability

**Data provenance** is related to lineage but answers a different question. Lineage answers *where data came from*; provenance answers *whether it can be trusted* and *who is accountable for it*.

A **provenance record** for a data value documents: the original source of the value (which system, which user, which external data provider), the **custody chain** — every person or system that has touched the value since its creation, the **transformation history** — every computation, filter, or enrichment that was applied to derive or modify the value, and any known quality events — data quality alerts, manual corrections, or re-ingestion events that affected the value.

The distinction between lineage and provenance maps to two different questions that practitioners ask:

- **Lineage question**: "Which dashboard used the same source data as the report that had an error?" (structural query about the data pipeline graph)
- **Provenance question**: "Can I trust this transaction amount, given that it was manually entered by an external contractor and has not been reconciled against the bank statement?" (trust and accountability query)

Both questions matter for LLM context. An LLM drawing on a high-provenance data value (original source: official bank statement, no transformations, reconciled by controller) can make stronger assertions than one drawing on a low-provenance value (original source: manual entry, three transformations, no validation). The context graph should surface provenance quality as a confidence annotation on every retrieved value.

**The OpenLineage Standard** is an open specification for representing data lineage metadata in a standardized, portable format. OpenLineage defines a JSON event model for recording lineage events: when a pipeline run starts, what datasets it reads (inputs), what datasets it writes (outputs), and what transformations it applies. Tools and platforms that implement the OpenLineage specification can interoperate — lineage information generated by one tool can be consumed and stored by a lineage catalog from a different vendor without custom integration work.

For context graphs, OpenLineage events are a natural ingestion source: each OpenLineage run event generates a set of graph nodes (pipeline run, input datasets, output datasets) and edges (reads, writes, transforms) that extend the lineage graph in the context graph database. Because OpenLineage events are timestamped, the lineage graph naturally supports temporal queries: "show me the complete lineage of this dashboard column as it was on January 15th, 2025, before the pipeline was refactored."

#### Diagram: Lineage vs. Provenance in Context

<iframe src="../../sims/lineage-vs-provenance/main.html" width="100%" height="562px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive vis-network graph showing the difference between lineage (where data came from) and provenance (whether it can be trusted) for a specific dashboard value</summary>
Type: graph-model
**sim-id:** lineage-vs-provenance
**Library:** vis-network
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: differentiate
Learning Objective: Learners can differentiate data lineage from data provenance by identifying which question each answers for a specific data value in a pipeline graph.

Instructional Rationale: A clickable graph with two distinct visual layers (lineage edges vs. provenance annotation nodes) is appropriate for the Analyze objective — clicking reveals the question each layer answers, making the distinction concrete without requiring additional prose.

Canvas: responsive width, 500px height. White background.

Nodes:
- "Bank Transactions DB" (teal, rectangle) — source
- "ETL Pipeline v2.3" (steel blue, diamond)
- "Revenue Summary Table" (gold, rectangle)
- "Finance Dashboard" (indigo, ellipse) — final consumer
- "Provenance: Manual Correction" (orange, triangle) — attached to ETL
- "Provenance: Not Reconciled" (red, triangle) — attached to Revenue Summary
- "Provenance: High Confidence" (green, triangle) — attached to Bank Transactions

Lineage edges (solid, dark gray):
- Bank Transactions DB → ETL Pipeline v2.3 "reads"
- ETL Pipeline v2.3 → Revenue Summary Table "writes"
- Revenue Summary Table → Finance Dashboard "feeds"

Provenance edges (dashed, orange):
- ETL Pipeline v2.3 ← Provenance: Manual Correction "annotation"
- Revenue Summary Table ← Provenance: Not Reconciled "annotation"
- Bank Transactions DB ← Provenance: High Confidence "annotation"

Two toggle buttons below the canvas:
- "Show Lineage" (default ON): highlights solid lineage edges in dark blue
- "Show Provenance" (default ON): highlights dashed provenance edges in orange

When lineage-only toggled on: "Lineage shows the structural path: Bank DB → ETL → Summary Table → Dashboard. This tells you where the data came from."
When provenance-only toggled on: "Provenance tells you whether to trust each step. High-confidence source, but a manual correction in the ETL and an unreconciled summary table — the dashboard value carries uncertainty."

Click any node: opens infobox with node role and the provenance score (if applicable).
</details>

## Event Sourcing, CQRS, and Append-Only Logs

Some modern enterprise architectures are designed from the ground up to make event capture the primary mode of state management — not an afterthought. These architectures are naturally compatible with context graphs because they maintain a complete, immutable history of every state change from the beginning.

**Event sourcing** is an architectural pattern in which every change to application state is captured as an immutable event and stored in an append-only log. Rather than storing only the current state of an entity (like a relational database does), an event-sourced system stores the full sequence of events that led to the current state. The current state is derived by replaying the event sequence. This gives a system a built-in, tamper-evident history of every state change — exactly the kind of audit trail that compliance requirements demand and context graphs need to operate.

An **append-only log** is a data structure where records can be added to the end but not modified or deleted. The append-only constraint provides two guarantees: immutability (past events cannot be altered retroactively) and temporal ordering (events are naturally ordered by their insertion sequence). These properties make append-only logs the ideal substrate for historical analysis — you can replay any time period, compute what the state of the system was at any point, and audit the complete sequence of changes.

**CQRS** (Command Query Responsibility Segregation) is an architectural pattern that separates the write path (commands that change state) from the read path (queries that read state). In a CQRS system, commands flow to a write store optimized for transactional consistency; queries read from a separate read store optimized for query performance. The read store is populated by processing the event log from the write side. For context graphs, CQRS suggests a natural architecture: the context graph is the read model, optimized for LLM retrieval queries, fed by an event log that captures every decision and state change on the write side.

**Change data capture (CDC)** is a technique for capturing changes to a database in real time by monitoring the database's transaction log rather than polling for changes. When a row is inserted, updated, or deleted, the CDC system detects the change from the transaction log and publishes it as an event to a downstream event stream. CDC is particularly valuable for feeding lineage systems and context graphs with real-time updates from legacy relational databases that were not designed with event sourcing in mind.

**Temporal versioning** is the practice of attaching validity time ranges to graph nodes and edges: `valid_from` and `valid_to` timestamps that record when a fact was true. Combined with event sourcing and CDC, temporal versioning allows a context graph to represent not just the current state of the enterprise but any past state — answering questions like "what did we know about this customer on the day the contract was signed?" or "which version of the pricing policy was in effect when this order was placed?"

#### Diagram: Event Sourcing Architecture for Context Graph

<iframe src="../../sims/event-sourcing-context-graph/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive architecture diagram showing how an event-sourced system feeds lineage data and decision traces into a context graph</summary>
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
</details>

## Bringing Lineage and Provenance into the Context Graph

The practical integration of lineage and provenance into a context graph follows a predictable pattern. The context graph maintains three overlapping graph structures that must be queried together for grounded LLM responses:

1. **The entity graph**: the knowledge graph of business entities (customers, products, employees, contracts) and their current-state relationships
2. **The lineage graph**: the directed graph of data flows, transformations, and dependencies connecting source systems to downstream consumers
3. **The process graph**: the process model (from process mining) representing the activities and transitions that characterize enterprise workflows

These three structures share nodes — a customer entity node in the entity graph is also a case node in the process graph, and also a source data object in the lineage graph. The shared identity makes cross-structure queries natural: "find all customers whose data flows through a pipeline with a recent quality incident AND who have an open exception in the invoice approval process" is a query that traverses all three graph structures.

A **provenance record** in this architecture is a node in the context graph, linked to the data value nodes it describes, carrying the custodian history, transformation steps, and confidence score as node properties. An LLM retrieving a revenue figure receives not just the number but the provenance node — and can read the confidence score, the custody chain, and the most recent transformation history to determine how much weight to place on the value.

## Summary and Key Takeaways

Process mining, data lineage, and data provenance give the context graph its temporal dimension — the ability to represent not just what the enterprise looks like now but what happened over time, and why the data looks the way it does today. Together, they transform the context graph from a static snapshot into a living record of organizational activity.

By the end of this chapter, you should be able to:

- Define an **event log** and name the three required fields that make it useful for process mining
- Explain the difference between **process discovery**, **conformance checking**, and **process enhancement**
- Describe the **IEEE XES** standard and explain its role in making event logs portable across tools
- Distinguish **upstream lineage** from **downstream lineage** and explain the added value of **column-level lineage**
- Explain the difference between **data lineage** (where data came from) and **data provenance** (whether it can be trusted)
- Describe the **OpenLineage standard** and how it enables lineage interoperability
- Explain **event sourcing**, **CQRS**, and **append-only logs** as architectures that make historical trace capture natural
- Describe **change data capture** as a mechanism for feeding real-time lineage events from legacy systems into context graphs
- Explain how **temporal versioning** enables "point-in-time" queries over graph history

??? question "Quick Check"
    A finance team suspects that a revenue figure in their quarterly report is incorrect. They ask the data team to investigate. Using the concepts from this chapter, describe the sequence of queries you would run — using lineage, provenance, and process mining data — to trace the error to its source.

    *(Answer: Start with upstream lineage to trace the dashboard column back through the transformation pipeline to its source tables. Check the provenance records at each transformation step for quality events or manual corrections. Run conformance checking on the process log for the revenue recognition process to identify any deviant cases (e.g., revenue recorded before contract execution). Use temporal versioning to check whether the data definition or code list mapping changed between the period the data was recorded and the reporting date.)*

!!! mascot-celebration "Chapter 7: Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    Outstanding work. You now understand the three dimensions of organizational memory: what entities exist (knowledge graph), what they mean (metadata and registries), and what happened over time (process mining, lineage, and provenance). Chapter 8 brings this all together at the core question of the book: why do LLMs fail at enterprise tasks even when all this infrastructure is in place? The context problem is next. Let's trace the why!

[See Annotated References](./references.md)
