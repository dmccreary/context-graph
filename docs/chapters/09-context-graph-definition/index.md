---
title: "Chapter 9: What a Context Graph Is"
description: "The formal definition of a context graph — how it extends enterprise knowledge graphs with decision traces, its node-and-edge schema, read/write paths, lifecycle, and access-control model."
generated_by: claude skill chapter-content-generator
date: 2026-05-18 15:40:00
version: 0.08
---

# Chapter 9: What a Context Graph Is

## Summary

Defines context graphs — how they extend enterprise knowledge graphs, their node-and-edge schema, API, read/write paths, lifecycle management, and access-control model.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Context Graph Definition
2. Decision Trace
3. Living Record
4. Entity-Time Linkage
5. Context Graph vs Knowledge Graph
6. Context Graph vs Vector Store
7. Context Graph vs Database
8. Context Graph as Memory Layer
9. Complementary Knowledge Layers
10. Context Graph Schema
11. Decision Node
12. Approval Edge
13. Precedent Link
14. Context Graph Lifecycle
15. Context Graph Update Pattern
16. Context Graph Query Pattern
17. Context Graph API
18. Context Graph Read Path
19. Context Graph Write Path
20. Context Graph Access Control

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Knowledge Graphs and Labeled Property Graphs](../01-knowledge-graphs-lpg/index.md)
- [Chapter 4: Enterprise Knowledge Graphs — Core Patterns](../04-enterprise-knowledge-graphs/index.md)
- [Chapter 7: Process Mining, Data Lineage, and Provenance](../07-process-mining-lineage/index.md)
- [Chapter 8: The Context Problem and RAG Limitations](../08-context-problem/index.md)

---

!!! mascot-welcome "The moment the solution clicks."
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waves welcome">
    Welcome to Chapter 9 — the definition chapter. Every concept from Chapters 1 through 8 has been building toward this precise moment: what exactly is a context graph, how does it work, and how does it close the gaps that RAG cannot close? By the end of this chapter, you will have a complete mental model. Let's trace the why!

## Introduction

A **context graph** is a persistent, living record of organizational decision traces — stitched across entities, time, and the broader enterprise knowledge graph — designed to give LLMs the decision context they need to reason accurately about enterprise tasks.

That definition is dense. Let's unpack it term by term, because every word is load-bearing.

**Persistent**: unlike an LLM context window, which evaporates at the end of a session, the context graph accumulates over time. Every decision trace written to the graph is available to every future query, by any agent or human, in any session. Persistence is what makes the context graph an organizational memory system rather than a session artifact.

**Living record**: the context graph reflects the current and historical state of organizational decisions. When a precedent is revised, the graph records the revision. When an approval is escalated, the graph records the escalation. When a policy changes, the graph links the change to all decisions it affects. The graph grows and evolves with the organization — it is not a snapshot.

**Decision traces**: the atomic unit of context graph content. A decision trace is a structured record of a specific organizational decision: what was decided, by whom, when, based on what information, under what policy, with what precedents cited, and whether the decision was later reviewed or overturned. Decision traces are the answer to the question "why was this done this way?"

**Stitched across entities, time, and the broader enterprise knowledge graph**: a context graph does not exist in isolation. It is anchored to the enterprise knowledge graph's entity nodes (customers, products, employees, contracts) and to timestamps. This stitching is what makes it possible to query: "show me all decisions involving this customer in the last 12 months" or "which product lines have the most exception-driven pricing decisions?"

## The Decision Trace: The Atomic Unit

A **decision trace** is the fundamental data structure of a context graph. Before specifying its schema, it helps to understand what organizational problem it solves.

Consider an experienced account manager deciding whether to approve a pricing exception for a specific customer. They know, from experience, that this customer is strategic, that the exception was approved three times before in similar circumstances, that the previous approvals were made at end-of-quarter under revenue pressure, and that one of them was later flagged by finance as a precedent they did not want repeated. None of this knowledge is in any formal system. It is in the account manager's head — and when they leave the company, it leaves with them.

A decision trace captures all of this context at the moment the decision is made:

- **What was decided**: "Exception approved: 15% discount on contract renewal for Acme Corp, Q4 2025"
- **By whom**: "Approval: J. Smith (Account Manager), countersigned: M. Williams (VP Sales)"
- **When**: ISO 8601 timestamp with timezone
- **Based on what information**: links to the retrieved context (contract node, customer revenue node, previous pricing decisions)
- **Under what policy**: link to the pricing policy version in effect at the time
- **Citing what precedents**: links to the prior exception approvals that were consulted
- **With what outcome**: the eventual business result, if recorded retrospectively
- **With any review flags**: whether the decision was later reviewed, challenged, or overturned

This is the full decision context that an LLM needs to make a well-grounded recommendation the next time a similar request arrives. The context graph stores it, indexes it, and makes it retrievable.

## Context Graph Schema: Nodes and Edges

A context graph has a defined schema of node types and edge types. Here are the primary types in a canonical context graph schema.

**Decision Node** is the core entity type. A decision node represents a single organizational decision. Its required properties include: `decision_id` (globally unique), `decision_type` (the category of decision — pricing, approval, escalation, exception, configuration, etc.), `timestamp` (when the decision was made), `actor_id` (canonical entity ID of the person or system that made the decision), `status` (active, superseded, under-review, overturned), and `context_summary` (a brief natural-language description suitable for LLM retrieval).

**Entity links** connect a decision node to the business entities the decision was about. These are edges between the decision node and entity nodes in the enterprise knowledge graph. The edge type encodes the relationship: `APPLIES_TO` (this decision applies to this customer), `GOVERNS` (this decision governs this product line), `AFFECTS` (this decision affects this contract). Because context graph decision nodes live in the same graph database as the entity nodes, these links are native graph edges — traversable with zero additional infrastructure.

**An approval edge** represents the act of authorization. An approval edge runs from an approver's actor node to the decision node it authorized, with properties encoding: the approval timestamp, the approval channel (system, email, in-person, automated), and any conditions attached to the approval. The approval edge is what makes the out-of-band approval chain visible in the graph — even approvals that happened via conversation or email can be recorded as approval edges if the system that captures them is integrated with the context graph write path.

**A precedent link** is an edge from a decision node to an earlier decision node that was consulted or cited in making the current decision. Precedent links are how the context graph builds a citation network of organizational decisions — analogous to the citation graph of academic papers. High-in-degree decision nodes (those cited by many subsequent decisions) are the most influential precedents in the organization's decision history — exactly the nodes that should be surfaced first in LLM context retrieval.

**A policy reference edge** links a decision node to the specific version of the policy that governed it at the time. Because policy documents change over time, it is critical that the link points to the specific version in force when the decision was made — not the current version of the policy. This temporal specificity is what enables the context graph to correctly answer "what policy was in effect when this decision was made?" even years after the fact.

A diagram will make this schema concrete. Before examining it, note the three types of edges we have now defined: entity links (from decision to business entity), approval edges (from approver to decision), and precedent links (from decision to earlier decision).

#### Diagram: Context Graph Schema — Core Node and Edge Types

<iframe src="../../sims/context-graph-schema/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive vis-network diagram showing the core schema of a context graph: decision nodes, entity links, approval edges, and precedent links</summary>
Type: graph-model
**sim-id:** context-graph-schema
**Library:** vis-network
**Status:** Specified

Bloom Level: Remember (L1)
Bloom Verb: identify
Learning Objective: Learners can identify the four core schema elements of a context graph (Decision Node, Entity Link, Approval Edge, Precedent Link) and state what information each carries.

Instructional Rationale: A clickable vis-network schema diagram is appropriate for the Remember objective — learners can click each node type and edge type to see its property list and role, reinforcing recall through active engagement with the schema structure.

Canvas: responsive width, 560px height. White background with light gray grid.

Nodes:
- "Decision: Price Exception Q4-2025" (indigo, large ellipse, center-left) — represents a specific decision
- "Customer: Acme Corp" (teal, ellipse, left) — business entity
- "Approver: M. Williams (VP Sales)" (gold, circle, top-center)
- "Policy: Pricing Policy v3.2" (steel blue, box, bottom-left)
- "Precedent: Price Exception Q2-2024" (indigo, smaller ellipse, right) — earlier decision cited as precedent
- "Precedent: Price Exception Q4-2023" (indigo, smallest ellipse, far-right) — second precedent

Edges:
- Decision → Customer: Acme Corp, label "APPLIES_TO", color dark gray
- Approver → Decision, label "APPROVED", color gold, arrow at Decision end
- Decision → Policy: Pricing Policy v3.2, label "GOVERNED_BY", color steel blue
- Decision → Precedent Q2-2024, label "CITES", color orange, dashed
- Decision → Precedent Q4-2023, label "CITES", color orange, dashed

Click on "Decision: Price Exception Q4-2025":
"**Decision Node** — the core schema element. Properties: decision_id (UID), decision_type ('pricing_exception'), timestamp ('2025-10-31T14:22:00Z'), actor_id ('EMP-J-SMITH'), status ('active'), context_summary ('15% discount approved for Acme Corp renewal, Q4 end-of-period, strategic account justification')."

Click on "Customer: Acme Corp":
"**Entity Link (APPLIES_TO)** — connects a decision node to the business entity it concerns. This entity lives in the enterprise knowledge graph. The link makes the decision discoverable through any query that starts from this customer entity."

Click on "Approver: M. Williams":
"**Approval Edge (APPROVED)** — records the authorization. Properties: approval_timestamp, approval_channel ('system: CRM approval workflow'), conditions ('no recurrence within 12 months'). Out-of-band approvals (verbal, email) can also be recorded here."

Click on "Policy: Pricing Policy v3.2":
"**Policy Reference Edge (GOVERNED_BY)** — links to the *specific version* of the policy in force at decision time. Critical for historical query accuracy: v3.2, not the current v4.1."

Click on either Precedent node:
"**Precedent Link (CITES)** — records which earlier decisions were consulted. High in-degree decisions (cited by many) are the most influential organizational precedents and are retrieved first in LLM context assembly."

Hover over each edge: shows edge label and description.
</details>

## Context Graph vs. Knowledge Graph, Vector Store, and Database

The context graph is a specific architectural element. To position it correctly, we need to compare it clearly to the three data system types it is most commonly confused with.

### Context Graph vs. Enterprise Knowledge Graph

The enterprise knowledge graph (covered in Chapters 4 and 5) is a representation of the organization's entities and the relationships between them: customers, products, employees, suppliers, contracts, and how they are connected. It is primarily a *current-state* system — it answers "what is the relationship between these entities today?"

The context graph *extends* the knowledge graph rather than replacing it. Context graph decision nodes are anchored to knowledge graph entity nodes through entity link edges. The two graphs share the same graph database, so a traversal can move fluidly between the entity layer (is this customer strategic?) and the decision layer (what decisions have been made about this customer?). The knowledge graph answers "what exists and how is it connected"; the context graph answers "what has been decided and why."

### Context Graph vs. Vector Store

A vector store indexes documents as embedding vectors and enables semantic similarity search. It is optimized for the question "what content is most semantically similar to this query?" It does not represent the structural relationships between entities, the temporal history of decisions, or the provenance and approval chains of retrieved content.

The context graph is optimized for structured traversal: "starting from this entity, what decisions have been made about it, what precedents were cited, who approved them, and which policies governed them?" These are graph traversal queries, not similarity searches. A context graph can be augmented with vector embeddings (decision nodes can have embedding vectors that enable similarity search within the decision space), but the graph structure is what enables the multi-hop reasoning that distinguishes it from a flat vector index.

### Context Graph vs. Traditional Database

A traditional relational database can store decision records — as rows in a decisions table. The limitation is in the query model. A relational database answers queries that are specified upfront and match the schema's join patterns. Asking "what is the precedent citation chain for this decision?" on a relational database requires recursive joins or CTEs that are complex to write and expensive to execute. Asking "find all decisions where the citing chain leads back to a policy that has since been updated" is a graph traversal query that maps naturally to a graph database and awkwardly to a relational one.

The context graph uses a native graph database because the most valuable queries over decision history are graph traversal queries — multi-hop, relationship-following queries that are the natural idiom of graph databases.

!!! mascot-thinking "Context graphs complement; they don't replace."
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Nexus thinking">
    This is a common source of confusion worth clarifying: a context graph is not an alternative to a data warehouse, a relational database, or a vector store. Each system has a role. The data warehouse answers aggregate analytical queries. The relational database handles transactional state. The vector store enables semantic document retrieval. The context graph provides decision context and organizational memory. In a well-designed enterprise AI architecture, all four work together.

## The Context Graph as Memory Layer

The cleanest conceptual framing for a context graph is as the **memory layer** of an enterprise AI system. Just as a human expert accumulates organizational knowledge over years — building up intuitions, precedents, and exception-handling patterns that inform future decisions — a context graph accumulates organizational knowledge as structured, queryable data that any AI agent can access.

**Complementary knowledge layers** in an enterprise AI architecture stack on top of each other:

1. **Raw data layer**: the transactional systems — ERP, CRM, HR, billing — that record operational facts
2. **Knowledge graph layer**: the entity-relationship model built over the raw data, providing a connected view of the organization
3. **Semantic layer**: the business concepts and definitions that give the knowledge graph its vocabulary (from the semantic layer and metadata registry work)
4. **Context graph layer**: the decision trace records layered on top of the entity graph, providing the *why* behind the *what*
5. **LLM reasoning layer**: the language model that queries across all four lower layers to assemble relevant context and generate a grounded response

The context graph sits at the critical junction between the structured organizational data below and the LLM reasoning above. It is the layer that translates organizational history into LLM-retrievable memory.

#### Diagram: Five Complementary Knowledge Layers

<iframe src="../../sims/five-knowledge-layers/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive vis-network diagram showing the five knowledge layers of an enterprise AI architecture and how they relate</summary>
Type: graph-model
**sim-id:** five-knowledge-layers
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: summarize
Learning Objective: Learners can summarize the role of each of the five knowledge layers in an enterprise AI architecture and explain how the context graph bridges the structured data layers and the LLM reasoning layer.

Instructional Rationale: A hierarchical vis-network diagram with clickable layer nodes is appropriate for the Understand objective — learners can click each layer to read its role description, building a structured mental model of the overall architecture.

Canvas: responsive width, 520px height. Light gray background.

Layout: Five nodes arranged vertically (top to bottom), like a stack:
1. "LLM Reasoning Layer" (gold, large box, top)
2. "Context Graph Layer" (indigo, large ellipse) — highlighted as the key layer
3. "Semantic Layer" (teal, box)
4. "Knowledge Graph Layer" (steel blue, box)
5. "Raw Data Layer" (gray, box, bottom)

Vertical edges connecting adjacent layers, labeled:
- LLM Reasoning ↔ Context Graph: "queries for decision context"
- Context Graph ↔ Semantic Layer: "uses definitions and governance"
- Context Graph ↔ Knowledge Graph: "anchors decision nodes to entities"
- Knowledge Graph ↔ Semantic Layer: "provides vocabulary"
- Knowledge Graph ↔ Raw Data: "integrates via ETL pipelines"

Click on each layer node: opens infobox with:
- Layer name
- What question it answers
- What it stores / provides
- Which earlier chapter covered it

For "Context Graph Layer": highlighted in bright indigo border with additional text: "This is the layer this book is about. It is the bridge between what the organization knows (knowledge graph, semantic layer) and what the organization has decided (decision traces)."

Two annotation labels:
- Bracket spanning layers 3-5: "Covered in Chapters 1-7"
- Bracket spanning layer 2: "This book's focus (Chapters 8-22)"
- Bracket spanning layer 1: "The LLM that benefits from all layers below"

Hover over any edge shows the label.
</details>

## Read Path and Write Path

A context graph system has two distinct operational paths: the read path (how decision context is retrieved for LLM consumption) and the write path (how new decision traces are recorded).

### The Context Graph Read Path

The **read path** is the retrieval pipeline that assembles relevant decision context for an LLM query. A typical read path has four stages:

1. **Query interpretation**: the LLM agent or application layer identifies the entity (or entities) the query is about and the type of decision context needed. "What are the most relevant pricing precedents for Acme Corp?" becomes a structured query: entity = Acme Corp (canonical ID: ENT-00441872), query type = pricing decisions, recency = last 24 months.

2. **Graph traversal**: the context graph database executes a traversal starting from the customer entity node, following decision link edges to pricing exception decision nodes, collecting their properties, cited precedents, and approval records. The traversal returns a subgraph of relevant decision nodes and their relationships.

3. **Ranking**: the retrieved decision nodes are ranked by relevance — a combination of recency, precedent in-degree (how often they have been cited), semantic similarity to the current query, and customer relationship match (were these decisions about the same customer, a similar customer, or a different entity type?).

4. **Context assembly**: the top-ranked decision nodes are serialized into a natural-language context block that is injected into the LLM's context window. The serialization format is designed for LLM consumption: each decision trace is rendered as a structured narrative with the key facts (what, who, when, why, outcome) in a consistent order.

A **context graph query pattern** is a reusable template for a specific type of context retrieval — pricing precedents, exception history, approval chain lookup, policy change impact. Query patterns are parameterized by entity ID and time range, enabling the context graph API to serve a wide range of retrieval needs without requiring ad hoc graph queries.

### The Context Graph Write Path

The **write path** records new decision traces as they are made. A well-designed write path captures decision context at the moment of decision — not hours or days later when the details may be incomplete or forgotten.

The **context graph write pattern** has three modes:

1. **Automated capture**: for decisions made by AI agents or automated systems, the agent writes the decision trace directly to the context graph via the write API as part of its action execution. The trace is generated from the agent's decision state, which includes the query, the retrieved context, the reasoning steps, and the output action.

2. **System integration**: for decisions made in existing enterprise systems (CRM, ERP, approval workflow systems), integration connectors listen for decision events (webhook callbacks, event stream messages, CDC events) and automatically generate decision trace records for the context graph.

3. **Facilitated manual capture**: for decisions made in conversations, meetings, or email threads, a capture interface (often integrated into the communication tool) prompts participants to record the key decision metadata: what was decided, who approved it, what precedents were considered. This is the hardest mode because it requires human behavior change, but it is the only path to capturing decisions made outside automated systems.

### Context Graph Lifecycle

A **context graph lifecycle** defines how decision trace records evolve over time. Unlike most database records, decision traces should never be deleted — they are the historical record of organizational decisions, and deleting them destroys organizational memory. Instead, the lifecycle has four states:

- **Active**: the decision is current and may be cited as a precedent for similar decisions
- **Superseded**: the decision has been replaced by a new decision, but remains in the graph as a historical record. Superseded decisions are linked to their replacements by a `SUPERSEDED_BY` edge.
- **Under review**: the decision is being re-evaluated. It can be cited as a precedent but with a caveat flag that the outcome is uncertain.
- **Overturned**: the decision was found to be incorrect or policy-violating and has been reversed. Overturned decisions remain in the graph as cautionary precedents and are linked to the overturning record.

The lifecycle state is stored as a property on the decision node and must be updated by the write path when the state changes. LLM retrieval queries should filter by lifecycle state: for active precedent retrieval, return only Active and Superseded nodes; for compliance audit queries, return all states including Overturned.

## Context Graph Access Control

Decision traces contain sensitive organizational information: who approved what, under what circumstances, with what justifications. Access to this information must be governed by the same classification and access control framework described in Chapter 3.

**Context graph access control** operates at two levels. At the node level, individual decision nodes carry a classification label inherited from the entities they are linked to (a decision about a customer classified as Restricted carries Restricted classification itself). At the query level, the context graph API evaluates the requesting agent's identity and permissions against the classification of the requested decision nodes before returning results.

The context graph also supports **redaction modes** for sensitive decision content: certain decision trace properties (the identity of the approver, the specific justification text) may be redacted for lower-privilege queries, while the structural metadata (that a decision was made, when, and what entities it applied to) remains visible. This allows compliance audit queries to verify that governance processes were followed without exposing the full decision content to unauthorized agents.

## Summary and Key Takeaways

A context graph is a precise architectural element with a specific schema, two distinct operational paths, and a lifecycle model. It extends the enterprise knowledge graph by adding decision traces — the organizational memory of why things were done the way they were. It differs from knowledge graphs (current entity state), vector stores (document similarity), and relational databases (flat table queries) in ways that make it uniquely suited for grounding enterprise LLM applications.

By the end of this chapter, you should be able to:

- Give the formal definition of a **context graph** and explain each term in the definition
- Define a **decision trace** and name its required schema fields
- Distinguish the three main edge types in a context graph schema: **entity links**, **approval edges**, and **precedent links**
- Explain how a context graph differs from an enterprise knowledge graph, a vector store, and a relational database
- Describe the **context graph as memory layer** and its position in the five-layer enterprise AI architecture
- Explain the four stages of the **context graph read path** and the three modes of the **context graph write path**
- Name the four states of the **context graph lifecycle** (Active, Superseded, Under Review, Overturned)

??? question "Quick Check"
    An LLM agent is processing a new pricing exception request for a customer. Describe the read path traversal the agent would execute against the context graph, starting from the customer entity node, and name the node and edge types it would encounter along the way. Then describe what the write path would record once the exception is approved.

    *(Answer: Read path: start from customer entity node (e.g., ENT-00441872) → follow APPLIES_TO edges from decision nodes back to this customer → retrieve pricing exception decision nodes → follow CITES edges to their precedent links → follow GOVERNED_BY edges to policy versions → rank by recency and in-degree → serialize top results for the LLM context window. Write path: create new Decision Node with decision_type='pricing_exception', timestamp, actor_id; create entity link APPLIES_TO to customer node; create approval edge from approver node; create CITES edges to the precedents retrieved during read path; create GOVERNED_BY edge to current policy version; set lifecycle state to Active.)*

!!! mascot-celebration "Chapter 9: Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    The context graph is defined. You now have a precise schema, a clear architectural position, and a concrete understanding of how it differs from everything else in the enterprise data stack. Chapter 10 asks a different question: why are the incumbent data platforms — data warehouses, existing knowledge graphs, AI agent startups — unable to provide this capability? The answer involves structural incentives, not just technical gaps, and it matters for understanding where context graphs create durable competitive advantage. Let's trace the why!

[See Annotated References](./references.md)
