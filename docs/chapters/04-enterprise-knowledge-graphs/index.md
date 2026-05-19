---
title: "Chapter 4: Enterprise Knowledge Graphs — Core Patterns"
description: "How organizations build and operate LPG-based knowledge graphs at scale: canonical entity models, hub-and-spoke federation, ETL ingestion patterns, and graph sharding."
generated_by: claude skill chapter-content-generator
date: 2026-05-18 14:20:00
version: 0.08
---

# Chapter 4: Enterprise Knowledge Graphs — Core Patterns

## Summary

Explains how organizations build and operate LPG-based knowledge graphs at scale: canonical entity models, hub-and-spoke federation, ETL ingestion patterns, and graph sharding.

## Concepts Covered

This chapter covers the following 24 concepts from the learning graph:

1. Enterprise Knowledge Graph
2. Entity
3. Hub-and-Spoke Graph Architecture
4. Federated Graph Architecture
5. Graph Schema Governance
6. Schema Drift
7. Stale Edge Detection
8. Missing Provenance
9. HR Data Graph
10. Finance Data Graph
11. CRM Graph Integration
12. ERP Graph Integration
13. Product Catalog Graph
14. Operational Log Graph
15. Graph ETL Pipeline
16. Graph Ingestion Pattern
17. Property Graph Scale
18. Billion-Edge Graph
19. Graph Sharding
20. Graph Replication
21. Ontology
22. Taxonomy vs Ontology
23. Graph Data Catalog
24. SKOS

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Knowledge Graphs and Labeled Property Graphs](../01-knowledge-graphs-lpg/index.md)
- [Chapter 2: Semantic Layers for Data Lakes](../02-semantic-layers/index.md)
- [Chapter 3: Metadata Management](../03-metadata-management/index.md)

---

!!! mascot-welcome "The whole enterprise, connected."
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waves welcome">
    Welcome to Chapter 4! Until now we've been building vocabulary. This chapter is where we start assembling a real enterprise knowledge graph — pulling together HR, finance, CRM, ERP, and operational data into a single connected structure. Let's trace the why!

## Introduction

A single enterprise data system — one ERP instance, one CRM platform, one HR database — is already complex. A large organization may have dozens to hundreds of such systems, each with its own data model, its own naming conventions, and its own understanding of what a "customer" or "product" or "employee" means. Getting these systems to talk to each other is one of the oldest unsolved problems in enterprise IT. Knowledge graphs are the most powerful architectural answer the field has found.

An **enterprise knowledge graph** is an organization-wide, LPG-based representation of the entities that matter to the business — customers, employees, suppliers, products, contracts, facilities, transactions, events — and the relationships between them. Unlike a data warehouse, which flattens these relationships into tables optimized for aggregate queries, a knowledge graph preserves the network structure of organizational reality. That structure is what allows an LLM to answer multi-hop questions: "Which suppliers for our top-revenue product lines also supply our three highest-risk customers?" A relational database answers that with a chain of complex joins; a knowledge graph answers it with a graph traversal.

This chapter explains how to build an enterprise knowledge graph that actually works at scale — not just for a single domain, but across the entire data estate of a real organization. The patterns here (canonical entity models, hub-and-spoke federation, robust ingestion pipelines, and operational hygiene) are what separate production knowledge graphs from proof-of-concept demos.

## The Entity: Fundamental Unit of the Enterprise Graph

Every knowledge graph is a population of **entities** connected by relationships. An entity is a thing that exists, has identity, and is worth tracking independently. In an enterprise context, entities are the nouns of the business domain: customers, products, employees, invoices, contracts, facilities, incidents, projects.

What distinguishes a well-defined entity from an arbitrary row in a database table? Three properties. First, the entity has **stable identity** — a globally unique identifier that persists across systems and over time, regardless of which system originally created the record. Second, the entity has **canonical properties** — a defined set of attributes that mean the same thing across all systems that reference the entity. Third, the entity has **governed provenance** — a recorded history of where its data came from, when it was last updated, and which system is considered authoritative for each property.

In practice, establishing stable entity identity is the hardest problem in enterprise graph construction. The same customer might appear in the CRM system with one ID format, in the billing system with another, in the ERP with a third, and in a legacy order management system with a fourth — and none of these IDs are the same. Before you can build a knowledge graph that spans all four systems, you need to solve entity resolution: determining which records across systems refer to the same real-world entity, and assigning them a shared canonical identifier.

Entity resolution draws on a combination of deterministic matching (records that share an exact email address are probably the same customer) and probabilistic matching (records that share a similar name, zip code, and approximate account creation date are probably the same customer). Modern graph databases can run entity resolution at scale using graph algorithms — finding clusters of records that are mutually similar and resolving each cluster to a single canonical entity node.

!!! mascot-thinking "Entities are the anchors; edges are the meaning."
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Nexus thinking">
    Here's an insight worth sitting with: a knowledge graph with perfect entity resolution but poor edge coverage is still a knowledge graph that can answer most questions. A knowledge graph with perfect edge coverage but poor entity resolution is a graph riddled with duplicate nodes, phantom relationships, and contradictory properties — essentially useless for reliable AI. Entity resolution is not a step you can defer. It is the precondition for everything else.

## Hub-and-Spoke vs. Federated Architecture

Once you have resolved entities, you face a fundamental architectural choice: where does the canonical graph live?

**Hub-and-spoke graph architecture** answers: in a central hub. All domain systems — HR, finance, CRM, ERP — write canonical entity data to the central hub through ingestion pipelines. The hub maintains the authoritative copy. Domain systems retain their original records, but the knowledge graph is the single source of truth for cross-domain queries. This architecture is simple to reason about, easy to govern, and produces a single consistent view of the enterprise. The trade-off is that the hub becomes a bottleneck: every change in every source system must propagate to the hub, and the hub's schema must evolve carefully to accommodate new entity types and properties without breaking existing consumers.

**Federated graph architecture** answers: in the domain systems, with a query layer on top. Each domain system exposes a graph API over its own data, and a federation layer routes queries to the appropriate domain graph, joins the results, and returns a unified response. The federation approach preserves domain autonomy — the HR system can evolve its schema without affecting how the finance graph represents its data — and it eliminates the ingestion bottleneck. The trade-off is complexity: federated queries that cross domain boundaries must handle schema heterogeneity, partial failures, and inconsistent data freshness in real time.

Neither architecture is universally superior. Organizations with strong central governance and a mandate for a single source of truth tend toward hub-and-spoke. Organizations with strong domain autonomy and diverse technology stacks tend toward federation. Many large enterprises run a hybrid: a central hub for the most critical shared entities (customer, product, employee) and a federated model for domain-specific entities that are less frequently cross-referenced.

The choice of architecture has direct consequences for context graph design. A hub-and-spoke enterprise knowledge graph naturally serves as the substrate for a context graph — the hub's entity nodes become the anchors for decision trace nodes. A federated architecture requires the context graph to maintain its own entity index so it can navigate the federation without requiring a real-time cross-domain join on every LLM retrieval call.

#### Diagram: Hub-and-Spoke vs. Federated Architecture

<iframe src="../../sims/hub-spoke-vs-federated/main.html" width="100%" height="582px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive vis-network diagram comparing hub-and-spoke and federated graph architectures</summary>
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
</details>

## Domain Graphs: The Building Blocks

An enterprise knowledge graph is not one monolithic schema — it is an assembly of domain-specific subgraphs that share canonical entity identifiers. Each domain graph represents the entities and relationships most relevant to a business function.

An **HR data graph** represents the organizational structure: employees, departments, reporting relationships, job roles, skill sets, location assignments, and employment history. For LLM applications, the HR graph enables queries like "who is the on-call manager for the infrastructure team this week?" and "which engineers have certified expertise in the regulatory-compliance domain relevant to this incident?" These traversal queries are trivial in a graph and painful in a relational system.

A **finance data graph** represents the economic structure: accounts, cost centers, budget allocations, transactions, purchase orders, invoices, and approval chains. The finance graph is particularly valuable for AI-powered exception handling — when a transaction falls outside normal parameters, the context graph can trace the exception through the finance graph to find the relevant approval history and precedent decisions.

A **CRM graph integration** extends the core customer entity with sales activities, contact history, pipeline stages, engagement scores, and relationship maps (which customer contacts know which internal account team members). LLM agents can use the CRM graph to synthesize account history into briefing documents, identify escalation patterns, and recommend engagement strategies based on precedents from similar accounts.

An **ERP graph integration** captures the supply chain, manufacturing, and procurement networks: suppliers, materials, bills of materials, manufacturing orders, logistics routes, and contract terms. The ERP graph enables AI-powered supply chain risk queries: "which production lines are at risk if this supplier experiences a disruption, and what are the historical substitution precedents?"

A **product catalog graph** models the product hierarchy, variant relationships, feature sets, pricing tiers, regulatory certifications, and cross-sell / up-sell associations. Product graphs are particularly useful for LLM-powered recommendation and configuration systems.

An **operational log graph** ingests event streams — application logs, infrastructure metrics, security events, deployment records — and represents them as timestamped nodes connected to the entities they affect. Operational log graphs power incident correlation: "what changed in the environment in the two hours before this outage started, and which prior incidents show a similar pattern?"

## Graph ETL Pipelines and Ingestion Patterns

Building domain graphs requires moving data from source systems into the graph database, transforming it into the canonical entity model, and keeping it current over time. This is the job of the **graph Extract-Transform-Load (ETL) pipeline**.

A graph ETL pipeline differs from a traditional data warehouse ETL in two important ways. First, the output format is nodes and edges (with labels, types, and properties) rather than rows in a dimensional table. The transformation step must produce valid graph records — every node must have a globally unique ID, every edge must have valid source and target node IDs, and properties must conform to the canonical schema. Second, the pipeline must handle **upsert semantics**: if a customer node with this canonical ID already exists in the graph, the pipeline updates its properties rather than creating a duplicate.

A typical **graph ingestion pattern** has five stages:

1. **Extract**: pull records from the source system via API, database query, or event stream subscription
2. **Resolve**: map source system IDs to canonical entity IDs (via the entity resolution index)
3. **Transform**: convert source record format to the canonical node/edge format, applying property mappings and value normalization
4. **Validate**: check that the transformed records conform to the graph schema and quality rules; flag violations for steward review
5. **Load**: upsert nodes and edges into the graph database; record ingestion metadata (source, timestamp, pipeline version) as provenance properties

The pipeline must run continuously for high-velocity sources (like operational event logs) and on a scheduled cadence for lower-velocity sources (like monthly HR roster snapshots). Regardless of cadence, the pipeline must update operational metadata — specifically, the freshness timestamps and ingestion event records — so that the context graph can accurately represent how current each node's data is.

#### Diagram: Graph ETL Pipeline Stages

<iframe src="../../sims/graph-etl-pipeline/main.html" width="100%" height="582px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive step-through MicroSim showing the five stages of a graph ingestion pipeline</summary>
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
</details>

## Schema Governance, Drift, and Operational Hygiene

A graph schema that is perfect at launch will drift from reality within months. Source systems evolve. New business entities are introduced. Old relationships are deprecated. Teams add new edge types without notifying the knowledge graph team. This gradual, usually undocumented change is called **schema drift**, and it is one of the most common failure modes in production knowledge graphs.

**Graph schema governance** is the set of practices that prevent schema drift from silently corrupting the graph. It includes: a formal change control process for schema modifications, versioned schema definitions stored in a registry, automated schema conformance checks in the ETL pipeline, and alerts when source systems start producing data that violates the current schema.

Closely related is **stale edge detection** — the practice of identifying edges in the graph that no longer reflect reality. Edges become stale for many reasons: an employee leaves a company, ending the REPORTS_TO edge; a contract expires, ending the GOVERNS edge between two entities; a product is discontinued, ending the SUPPLIES edge between a supplier and a product line. If stale edges are not detected and removed (or marked as historical), the graph returns incorrect traversal results — and LLMs that query it will make recommendations based on relationships that no longer exist.

Effective stale edge detection requires pairing each edge with a validity timestamp (or a range: `valid_from` / `valid_to`). Edges with a `valid_to` in the past are historical and should be excluded from "current state" traversal queries. Pipelines that update edges must explicitly set the `valid_to` timestamp when a relationship ends, rather than simply deleting the edge — because historical relationships are often as valuable as current ones for decision trace analysis.

**Missing provenance** is the third operational failure mode. A graph node or edge without provenance metadata — source system, ingestion timestamp, pipeline version, responsible team — is essentially an unverified assertion. The context graph cannot evaluate its trustworthiness. Provenance metadata must be enforced by the ingestion pipeline as a required field: if a record cannot be traced to a source, it is not loaded.

!!! mascot-warning "Schema drift is silent and cumulative."
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Nexus looking concerned">
    Each individual schema drift event is usually small — a new field added here, an edge type renamed there. But without governance controls, these changes compound. After two years of unmanaged drift, a production knowledge graph can have dozens of edge types with slightly different semantics that were once the same type, properties that mean different things depending on when they were written, and traversal queries that return subtly wrong results because they were written against an old schema version. Detect drift early, automate conformance checks, and version your schema.

## Ontologies, Taxonomies, and SKOS

So far we have talked about the *structure* of a knowledge graph — nodes, edges, labels, types, properties — without much discussion of the *vocabulary* that names these elements. Where does the list of valid node labels come from? Who decides that an edge type should be called `REPORTS_TO` rather than `IS_MANAGED_BY`? How do you ensure that the "customer" in the CRM graph means the same thing as the "customer" in the finance graph?

The answer lies in ontologies and taxonomies — two related but distinct concepts.

A **taxonomy** is a hierarchical classification of concepts. It answers the question: what types of things exist, and how are they organized into categories and subcategories? An enterprise product taxonomy might have three levels: Product Category → Product Line → SKU. Taxonomies are useful for browsing and filtering, but they only express one relationship type: "is a subtype of." They cannot express that a product line is manufactured by a supplier, or that a product is regulated by a specific standard.

An **ontology** is a richer formalism. It defines not just the types that exist but the relationships between types, the constraints on those relationships, and the rules for inferring new facts from stated ones. An ontology might express: "A Customer is a type of Legal Entity; a Legal Entity has exactly one primary jurisdiction; a Contract must link exactly two Legal Entities; a Contract is governed by exactly one Regulatory Standard." Ontologies provide the semantic backbone for a knowledge graph — they ensure that graph queries mean the same thing to all consuming systems.

**SKOS** (Simple Knowledge Organization System) is a World Wide Web Consortium standard for representing taxonomies, thesauri, and controlled vocabularies in a machine-readable format. For enterprise knowledge graphs, SKOS provides a lightweight, portable way to express the classification hierarchies that underpin metadata tagging and entity typing. A SKOS concept scheme can be imported directly into a graph database as nodes and edges, making the classification vocabulary queryable in exactly the same way as the entity data it describes.

The relationship between an ontology and a knowledge graph is: the ontology defines the schema (what types and relationships are allowed), and the knowledge graph instantiates the schema (stores the actual entities and relationships). A **graph data catalog** combines both: it stores the ontology, the instance data, and the metadata about both — providing a unified, queryable repository that an LLM can use to understand what a graph contains before querying it.

#### Diagram: Taxonomy vs. Ontology in a Product Graph

<iframe src="../../sims/taxonomy-vs-ontology/main.html" width="100%" height="542px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive vis-network diagram contrasting a product taxonomy with a product ontology</summary>
Type: graph-model
**sim-id:** taxonomy-vs-ontology
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: contrast
Learning Objective: Learners can contrast a taxonomy (hierarchy of types) with an ontology (network of type relationships and constraints) by examining example graphs for the same product domain.

Instructional Rationale: Side-by-side clickable graphs are appropriate because the contrast is structural — seeing that the taxonomy has only parent-child edges while the ontology has diverse typed relationships makes the distinction immediately visual.

Canvas: responsive width, 520px height. Two panels separated by divider. Each panel titled.

**Left panel — Taxonomy:**
Title: "Product Taxonomy (hierarchy only)"
Nodes: "Physical Product" (root, indigo), "Electronics" (teal), "Apparel" (teal), "Laptop" (gold), "Monitor" (gold), "Shirt" (gold)
Edges: all IS-A edges pointing upward — Laptop → Electronics → Physical Product, Monitor → Electronics, Shirt → Apparel → Physical Product
Edge labels: "is-a"

**Right panel — Ontology:**
Title: "Product Ontology (typed relationships)"
Nodes: "Product" (indigo), "Supplier" (teal), "Category" (gold), "RegulatoryStandard" (orange), "Contract" (steel blue)
Edges:
- Product → Category, label "has-type"
- Supplier → Product, label "manufactures"
- Product → RegulatoryStandard, label "governed-by"
- Supplier → Contract, label "bound-by"
- Contract → Product, label "covers"

Click on any Taxonomy node: "**Taxonomy Node** — in a taxonomy, each node is a concept type. The only relationship is IS-A (subtype). Useful for browsing categories, but cannot express cross-concept relationships."
Click on any Ontology node: "**Ontology Node** — in an ontology, each node is a concept type AND can participate in multiple typed relationships. Click the edges to see the constraint each relationship expresses."
Click on any edge (right panel): shows the relationship name and a description of the constraint it represents.
</details>

## Scaling to Billions of Edges

A knowledge graph for a mid-size enterprise might have tens of millions of nodes and hundreds of millions of edges. A graph for a large enterprise or a platform business might have billions of edges — supplier-product relationships, transaction links, event associations — that must be queried with sub-second latency.

**Property graph scale** refers to the engineering challenges of operating a graph database at this size. The challenges are different from scaling a relational database because graph queries are fundamentally traversal-based: the cost of a query is proportional to the number of hops, not the number of rows. A well-indexed graph can answer a 4-hop traversal over a billion-edge graph faster than a relational database can execute a 4-table join over the same data — but only if the graph is correctly indexed and correctly sharded.

**Graph sharding** is the practice of partitioning a large graph across multiple storage nodes to distribute both storage and query load. The challenge is that graph sharding, unlike relational sharding, must minimize cross-shard edges — because every cross-shard edge traversal requires a network hop, which dramatically increases latency. Good graph sharding algorithms identify dense clusters of tightly connected nodes (like all the nodes in a single business unit's data) and place them on the same shard, minimizing inter-shard traversal.

**Graph replication** ensures that the graph remains available even when individual storage nodes fail, by maintaining synchronized copies across multiple physical locations. For context graph applications, replication also serves a read-scaling purpose: LLM retrieval pipelines can be directed to read replicas, keeping the write path (where new decision traces are ingested) fast and uncongested.

Achieving billion-edge scale also requires careful **graph index** design. A native graph database uses index-free adjacency — each node stores direct pointers to its neighbors — which makes traversal fast regardless of graph size. But range queries (find all customers with revenue between $1M and $5M) still require explicit property indexes, and those indexes must be carefully chosen to avoid full-graph scans.

## Summary and Key Takeaways

An enterprise knowledge graph is not a single database — it is an assembly of domain subgraphs, unified by canonical entity resolution, governed by schema management processes, and kept current by robust ETL pipelines. When it works, it gives LLM agents a queryable map of the organization's entities, relationships, and recent history that no other data structure can match.

By the end of this chapter, you should be able to:

- Define an **enterprise knowledge graph** and explain how it differs from a domain-specific knowledge graph
- Explain what makes an **entity** well-defined: stable identity, canonical properties, governed provenance
- Compare **hub-and-spoke** and **federated** graph architectures and identify the trade-offs for context graph design
- Describe the five stages of a **graph ETL pipeline** and explain what happens at each stage
- Define **schema drift**, **stale edge detection**, and **missing provenance** as the three main operational failure modes
- Distinguish a **taxonomy** from an **ontology** and explain how **SKOS** serves as a bridge
- Explain the key challenges of **graph sharding** and why minimizing cross-shard edges is critical

??? question "Quick Check"
    A large retailer has a product catalog graph with 50 million product nodes and a supplier graph with 2 million supplier nodes. A query asks: "Which suppliers provide materials for our top-10 revenue products, and which of those suppliers are also linked to open purchase orders with late delivery flags?" Describe why this query is well-suited to a knowledge graph, which entity types must have canonical IDs for it to work, and what operational failure mode would produce incorrect results if the supplier-product edges are not kept current.

    *(Answer: It is a multi-hop traversal connecting products, suppliers, and purchase orders — hard with joins, natural with graph traversal. Products and suppliers must both have canonical IDs, since the query crosses domain graph boundaries. Stale edge detection failure would cause the query to return supplier-product relationships that no longer exist, routing the investigation to the wrong suppliers.)*

!!! mascot-celebration "Chapter 4: Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    You now understand the architecture of a production enterprise knowledge graph — from canonical entity resolution through domain subgraphs, governance processes, and billion-edge scaling. Chapter 5 adds the algorithms that make these graphs useful for analysis: shortest paths, centrality, community detection, and the other tools that turn a connected data structure into a reasoning engine. The graph is built; now we learn to compute over it. Let's trace the why!
