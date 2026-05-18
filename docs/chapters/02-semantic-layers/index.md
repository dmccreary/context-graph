---
title: "Chapter 2: Semantic Layers for Data Lakes"
description: "How semantic layers, metric stores, and business glossaries turn raw enterprise data lakes into queryable, trustworthy knowledge — and why context graphs need them as a foundation."
generated_by: claude skill chapter-content-generator
date: 2026-05-18 14:02:34
version: 0.08
---

# Chapter 2: Semantic Layers for Data Lakes

## Summary

Covers the data infrastructure that gives enterprise data meaning: data lakehouses, semantic layers, metric stores, query federation, data virtualization, and governance frameworks.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Data Lake
2. Data Lakehouse
3. Semantic Layer
4. Business Metric
5. Dimension
6. Logical Data Model
7. Virtual View
8. Metric Store
9. SQL-Based Semantic Layer
10. OLAP Semantic Layer Tool
11. Cube (Semantic Layer)
12. Business Glossary
13. Query Federation
14. Data Virtualization
15. Naming Convention Standard
16. Join Path Discovery
17. Undocumented Join
18. Source System Mapping
19. Semantic Search
20. Vocabulary Alignment
21. Column Naming Standard
22. Semantic Consistency
23. Table Discovery
24. Schema Registry
25. Data Dictionary

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Knowledge Graphs and Labeled Property Graphs](../01-knowledge-graphs-lpg/index.md)

---

!!! mascot-welcome "Welcome to Chapter 2, Graph Builders!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waving welcome">
    In Chapter 1, you learned to think in nodes and edges. Now we zoom out to see the messy reality those nodes and edges have to be built from: a sprawling enterprise data lake full of thousands of tables, inconsistent names, and joins that nobody documented. The good news? This chapter is the story of how organizations tame that mess — and why getting it right is the key to building context graphs that actually work. Let's trace the why!

## Introduction

Picture this: your company has been collecting data for fifteen years. You have a data warehouse, a customer relationship system, a finance platform, an HR database, a product catalog, and a logging system that generates ten million events a day. All of it lives in a massive storage layer — your **data lake**. You technically have all the information you need to answer almost any business question.

There is just one problem. Nobody can agree on what "revenue" means.

The finance team calculates it one way. The sales team calculates it another. The product team has a third definition. When three different dashboards show three different numbers for "last quarter's revenue," executives stop trusting dashboards entirely. All the data in the world is useless if nobody agrees on what it means.

This is the *meaning problem*, and it is the reason semantic layers exist. This chapter explains what a semantic layer is, how it is built, what tools implement it, and why it forms a critical part of the foundation for any context graph. By the end, you will understand how organizations create a shared vocabulary for their data — and why that vocabulary is one of the most valuable assets an AI system can inherit.

## What Is a Data Lake?

A **data lake** is a centralized storage repository that holds raw data in its native format until it is needed. Unlike a traditional data warehouse — which requires data to be cleaned, transformed, and loaded into a rigid schema before it can be stored — a data lake accepts data as-is. Want to dump a year's worth of server logs? In they go. Want to store JSON payloads from a mobile app? No problem. Raw CSV exports from a legacy mainframe? Welcome to the lake.

The appeal is obvious: you never throw anything away, and you pay storage costs instead of transformation costs. The problem emerges when someone tries to *use* the data. A data lake has no built-in meaning. Column names like `cust_id_v2`, `trans_amt_net`, and `prod_cat_cd_old` are technically present, but nobody outside the original engineering team knows what they mean or how to join them correctly.

Data lakes grow fast. A mid-sized enterprise can accumulate thousands of tables in a few years. Most of those tables have no documentation. Finding the right table, understanding its columns, and knowing which join connects it to another table requires detective work that most analysts cannot spare time for.

The table below summarizes the core trade-off between a traditional data warehouse and a data lake:

| Dimension | Data Warehouse | Data Lake |
|-----------|---------------|-----------|
| Schema | Fixed at write time (schema-on-write) | Applied at read time (schema-on-read) |
| Data types | Structured only | Structured, semi-structured, unstructured |
| Transformation | Required before storage (ETL) | Optional, deferred (ELT) |
| Query readiness | High | Low without additional tooling |
| Flexibility | Low | High |
| Documentation burden | Moderate | Very high — tables multiply fast |

## The Data Lakehouse: Getting the Best of Both Worlds

The data warehouse versus data lake tension eventually produced a hybrid architecture called the **data lakehouse**. A data lakehouse combines the low-cost, flexible storage of a data lake with the query performance and schema enforcement of a data warehouse. It stores raw data in open file formats (such as Parquet or Delta format) while adding a metadata and transaction layer on top that supports SQL queries, ACID transactions, and schema evolution.

The lakehouse solves the storage problem. It does not solve the meaning problem. You can have a perfectly engineered lakehouse with petabytes of neatly formatted Parquet files and still have no idea which column in the `order_events` table corresponds to the finance team's definition of "recognized revenue." Storage architecture and semantic clarity are separate problems. Fixing one does not fix the other.

## The Meaning Problem Up Close

To understand why a semantic layer is necessary, it helps to see what the absence of one looks like in practice. Consider a data analyst at a retail company who needs to answer a simple question: "How many active customers placed more than two orders last month?"

Before writing a single line of SQL, the analyst faces a research project:

- Which table holds customer records? There are four tables with "customer" in the name.
- What does "active" mean? There is an `is_active` flag in one table and a `last_login_date` in another. Which one is authoritative?
- What counts as an "order"? The `transactions` table has status codes. The `orders` table has a different set of status codes. Do cancelled orders count?
- How do the tables join? The `customer_id` in the `orders` table is an integer, but in the `transactions` table it is a string with a prefix. Is that intentional?

This is not an unusual situation. It is Tuesday. Every analyst at every company deals with some version of this every week.

The root cause is **undocumented joins** — join conditions that exist in someone's head or in a years-old notebook but were never written down anywhere the data catalog can find. An **undocumented join** is a join path between two tables that is not documented in any metadata system. It is known to the original developer who built the pipeline, and to nobody else. When that developer leaves the company, the join becomes a mystery.

!!! mascot-thinking "Key Insight: The Undocumented Join Is a Knowledge Graph Problem"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Nexus thinking">
    An undocumented join is not really a data problem — it is a *relationship* problem. The relationship between two tables exists in the real world (customer orders do belong to customers), but it is not represented anywhere in the data infrastructure. That is exactly the kind of missing knowledge that a context graph is built to capture. When a semantic layer discovers and documents join paths, it is doing a primitive form of graph construction: representing edges between table-nodes that were previously invisible. Every node tells a story. So does every join.

## The Semantic Layer: A Translation Layer for Data

A **semantic layer** is a software layer that sits between raw data storage and the end users (or LLMs) querying it. Its job is to translate physical database concepts — tables, columns, foreign keys — into business concepts — metrics, dimensions, entities, relationships — and to enforce consistent definitions across every consumer.

Think of it as a translator. The physical world speaks in `SELECT SUM(net_amt) FROM trans WHERE stat_cd = 3 AND cat_cd IN (1,4,7)`. The business world speaks in "total recognized revenue for completed transactions in product categories A, C, and G." The semantic layer maps the second language to the first, and it does so consistently for everyone — analysts, dashboards, and AI systems alike.

A semantic layer typically defines three kinds of objects:

- **Business metrics** — calculated measures with precise, agreed-upon definitions. A **business metric** is a quantitative measurement that answers a specific business question: "total recognized revenue," "30-day active users," "average order value." Metrics have formulas, filters, and time-grain rules all encoded in one place.
- **Dimensions** — categorical attributes used to slice and filter metrics. A **dimension** describes a perspective from which a metric can be analyzed: geography, product category, customer segment, time period. "Revenue by region" means revenue (metric) broken down by region (dimension).
- **Logical entities** — business objects like Customer, Order, and Product, defined at the semantic level independently of which physical tables implement them.

The diagram below shows how a semantic layer maps business questions to physical storage. Before examining it, note the three layers: the physical data tier at the bottom, the semantic layer in the middle, and the query interface at the top.

#### Diagram: Semantic Layer Architecture

<iframe src="../../sims/semantic-layer-architecture/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Semantic Layer Architecture Explorer</summary>
Type: diagram
**sim-id:** semantic-layer-architecture<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Explain and identify
Learning Objective: Learners can identify the three layers of a semantic layer architecture (physical storage, semantic definition, query interface) and explain how each layer translates the one below it.

Instructional Rationale: A layered architecture diagram with clickable layer transitions is appropriate because the Understand objective requires learners to trace how a business question passes through each layer before reaching physical data. Static image would not let learners explore each transformation.

Layout: Three horizontal bands stacked vertically in a canvas:
- Top band (~25%): "Query Interface" — shows two query bubbles: one in business English ("Total revenue by region, last 30 days") and one in SQL
- Middle band (~35%): "Semantic Layer" — shows three boxes: Metrics (revenue formula), Dimensions (region hierarchy), Logical Model (Customer-Order-Product entities)
- Bottom band (~40%): "Physical Storage" — shows five table icons with raw column names (trans_tbl, cust_master, prod_cat, geo_ref, ord_hdr)

Connections:
- Dotted arrows from each SQL fragment in the top band down through the semantic layer boxes to the physical table(s) that supply it
- Arrow labels: "business term → metric definition → SQL fragment → physical column"

Interactive behavior:
- Click any physical table icon: highlight which semantic layer objects reference it; show a tooltip with the raw column names and their semantic aliases
- Click any Metric box: show the full formula (e.g., "SUM(trans_tbl.net_amt) WHERE trans_tbl.stat_cd = 3") and which dimensions can slice it
- Click any business-language query bubble at the top: animate the translation path downward through the layers, lighting up each node as the query passes through it
- Hover any arrow: tooltip explains what translation that step performs ("Metric name → SQL formula")
- "Reset" button returns to neutral state

Color palette: Indigo top band, teal middle band, orange bottom band. Consistent with book palette.
Canvas: Responsive width, 520px height.
</details>

## Logical Data Models and Virtual Views

Two key components of a semantic layer deserve their own introduction.

A **logical data model** is a description of business entities and their relationships expressed in business terms, independent of any physical implementation. A logical data model says "a Customer places Orders, and each Order contains one or more OrderLines." It does not say anything about which tables, columns, or join keys implement that structure. The logical model is the semantic layer's blueprint — the contract that says what the business believes about its data.

A **virtual view** is a named query that the semantic layer exposes as if it were a real table, even though no physical data is stored in it. When a user or an AI system queries the view named `recognized_revenue_by_region`, they are querying a definition — the semantic layer rewrites that query into the appropriate physical SQL and executes it against the real tables. The physical complexity is invisible to the consumer. From their perspective, they are just reading a well-named table.

Virtual views are how semantic layers deliver consistency at scale. Instead of fifty different analysts writing fifty slightly different versions of the revenue calculation, one analyst writes the canonical definition once, and everyone queries the view. When the business rule changes, you update the view in one place, and every downstream consumer automatically gets the corrected calculation.

## Metric Stores and OLAP Tools

The semantic layer concept has evolved into several specialized implementations. Two important ones are metric stores and OLAP semantic layer tools.

A **metric store** is a system dedicated specifically to defining, storing, and serving business metrics with consistent lineage and governance. Before describing what a metric store offers, it helps to understand what precedes it: a spreadsheet full of metric definitions that different teams maintain separately, with no guarantee of consistency. A metric store replaces that spreadsheet with a code-defined, version-controlled, tested system. Metrics are defined once in a declarative file, validated against the physical schema, and served through a standard API. Any consumer — dashboard, analyst, or LLM — queries the same definition.

An **OLAP semantic layer tool** (Online Analytical Processing) takes a broader approach. It defines not just metrics but entire multidimensional data models: cubes, dimensions, hierarchies, and drill-down paths. The term **cube** in semantic layer contexts refers to a pre-defined multidimensional model that organizes metrics by their relevant dimensions for fast, consistent analysis.

A **SQL-based semantic layer** is a category of semantic layer implementations that expose their definitions as SQL-compatible views or computed tables, allowing any SQL-capable tool to query them without learning a proprietary query syntax. This is an important practical choice for enterprise adoption: if your semantic layer speaks SQL, every analyst tool, every BI platform, and every LLM that can generate SQL can use it immediately.

The table below summarizes the semantic layer implementation options and their key trade-offs. All three concepts were defined just above — the table is here to organize and compare them.

| Implementation Type | What It Defines | Query Interface | Best For |
|--------------------|-----------------|-----------------|----------|
| Metric store | Metrics, lineage, governance | REST API or SQL | Consistent KPI definitions across teams |
| OLAP semantic layer | Cubes, dimensions, hierarchies, metrics | MDX or SQL | Multidimensional analysis, pivot-table style |
| SQL-based semantic layer | Views, virtual tables, joins | Standard SQL | Maximum tool compatibility |

## Naming the World: Glossaries, Dictionaries, and Standards

Even the best semantic layer is only as good as the vocabulary it uses. This is where business glossaries, data dictionaries, and naming standards come in.

A **business glossary** is an organized collection of business term definitions, managed by the people who understand the business. It is not a technical document — it is a living agreement between departments about what words mean. "Customer" means an entity that has completed at least one purchase. "Active customer" means a customer with a purchase in the last twelve months. "Churned customer" means a customer with no purchase in the last twelve months and at least one in the twelve months before that. These definitions live in the business glossary, written in plain English, reviewed by the finance, sales, and product teams together.

A **data dictionary** is the technical counterpart. While a business glossary defines what things mean in business terms, a **data dictionary** documents what every column in every table contains at the physical level: its data type, valid values, source system, owner, freshness, and any known quality issues. The data dictionary answers the question "what is in this column?" The business glossary answers the question "what does this concept mean?"

The connection between them — mapping glossary terms to physical columns — is called **source system mapping**. A **source system mapping** documents the link between a business concept ("recognized revenue") and the physical columns and transformation rules that implement it (`SUM(trans_tbl.net_amt) WHERE stat_cd IN (3,5) AND...`). This mapping is the bridge between the business world and the data world.

To make all of this consistent across an organization, enterprises define naming standards:

- A **naming convention standard** is a set of rules for how database objects (tables, columns, schemas) should be named. For example: "table names use snake_case with a business-domain prefix; column names use descriptive nouns; foreign key columns end in `_id`."
- A **column naming standard** is the subset of naming conventions specifically for columns. It might require that date columns end in `_dt`, boolean columns start with `is_` or `has_`, and amount columns end in `_amt` with a unit suffix.

These standards sound bureaucratic. (Yes, we know. Bear with us — they matter enormously for what comes next.) A **schema registry** is the system that enforces and catalogs these standards, registering every schema, table, and column as it is created and flagging violations. When an LLM needs to navigate thousands of tables, a schema registry that enforces consistent naming is the difference between a solvable puzzle and an impenetrable mess.

!!! mascot-tip "Nexus's Tip: Naming Standards Are Context Graph Infrastructure"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Nexus pointing upward">
    When you build a context graph, you will be importing entity names from many source systems. If the HR system calls it `employee_id`, the finance system calls it `emp_nbr`, and the access-control system calls it `user_identifier`, your context graph has three nodes for the same real-world entity. Consistent naming conventions prevent this before it happens. The boring work of enforcing naming standards today is what makes entity resolution painless later. Connect the dots — then ask why.

## Vocabulary Alignment and Semantic Consistency

Even with naming standards in place, different systems often use different words for the same concept. A customer in the CRM is a "contact." The same person in the billing system is an "account." In the support system, they are a "ticket submitter." These are not the same word, but they refer to the same real-world entity.

**Vocabulary alignment** is the process of mapping these different terms to a shared canonical vocabulary. It is part business glossary work (deciding that "customer," "contact," and "account" all refer to the same entity class) and part technical work (building the mapping rules that let queries across systems use consistent terminology).

**Semantic consistency** is the broader goal: ensuring that the same concept means the same thing wherever it appears in the data infrastructure. A semantically consistent system is one where "revenue" in the finance dashboard, "revenue" in the executive report, and "revenue" in the LLM's context window all refer to exactly the same calculation. Achieving this is hard. Maintaining it as systems evolve is harder. But without it, every AI system that reasons about enterprise data is reasoning about ambiguous information — and ambiguous context produces unreliable decisions.

The MicroSim below demonstrates what semantic inconsistency looks like in practice — and how a semantic layer resolves it.

#### Diagram: Semantic Consistency Explorer

<iframe src="../../sims/semantic-consistency-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Semantic Consistency Explorer MicroSim</summary>
Type: microsim
**sim-id:** semantic-consistency-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare and examine
Learning Objective: Learners can identify semantic inconsistency across two data sources and explain how a semantic layer resolves it by providing a single canonical definition.

Instructional Rationale: Step-through comparison with real column names and values is appropriate because the Analyze objective requires learners to trace a specific inconsistency to its root cause and then observe the resolution. Continuous animation would prevent careful comparison.

Layout: Three-panel horizontal layout
- Left panel (~33%): "Finance System" — shows a small table with columns: `trans_id`, `trans_dt`, `net_amt`, `stat_cd`. Four sample rows. `stat_cd` values: 3 = completed, 5 = recognized, 7 = pending.
- Center panel (~33%): "Sales System" — shows a small table with columns: `order_id`, `order_date`, `gross_revenue`, `order_status`. Four sample rows. `order_status` values: "closed_won", "invoiced", "in_progress".
- Right panel (~33%): "Semantic Layer" — shows the unified metric definition: `recognized_revenue = SUM(net_amt WHERE stat_cd IN (3,5)) + SUM(gross_revenue WHERE order_status IN ('closed_won','invoiced'))`. Shows computed result for the sample data.

Two scenario buttons at the top:
- "Without Semantic Layer": highlights that a finance analyst querying the left table and a sales analyst querying the right table get different numbers for the same business question, even with identical date filters. Show calculated values diverging ($4.2M vs $3.9M).
- "With Semantic Layer": shows both systems feeding into the right panel's unified definition, producing one agreed-upon number ($4.1M — explained as reconciled via the canonical formula).

Step log (bottom of each panel): shows the SQL fragment used in each scenario, so learners can see what changed.

Interactive behavior:
- Click either scenario button: animate the data flow from the relevant source tables into the right panel with a 500ms delay per step
- Hover any column name in the source tables: tooltip showing its data type and example values
- Hover any row in the source tables: highlight the corresponding contribution in the semantic layer formula
- Click the metric definition in the right panel: expand a detailed formula breakdown showing each source's contribution

Canvas: Responsive width, 500px height.
Color palette: Left panel orange, center panel teal, right panel indigo.
</details>

## Table Discovery, Join Path Discovery, and Semantic Search

Before you can build a semantic layer, you have to understand what data you have. This turns out to be harder than it sounds.

**Table discovery** is the automated process of scanning a data lake or warehouse to find and catalog all the tables and views that exist. In a mature data lake, nobody has a complete list of what is in there. Tables were created by different teams at different times with different naming conventions. Table discovery tools scan the storage layer, infer structure from file formats and existing schemas, and build an inventory.

**Join path discovery** is the automated detection of likely join paths between tables — even undocumented ones. The tool looks for columns with matching or similar names across tables, compares data distributions to check for foreign-key-like patterns, and builds a catalog of candidate join relationships. This is genuinely useful. Many undocumented joins can be inferred statistically even when nobody documented them.

**Semantic search** takes discovery further. Rather than searching for tables by exact name, semantic search lets analysts and AI systems describe what they are looking for in plain language — "find me tables related to customer purchases" — and returns relevant tables based on the semantic meaning of their content, not just string matching against column names. Semantic search over a data catalog is one of the places where vector embeddings and knowledge graphs work together: embeddings capture semantic similarity, while the graph captures documented relationships.

!!! mascot-warning "The Undocumented Join Trap"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Nexus warning">
    Join path discovery tools are valuable, but they are not magic. A tool that finds statistically probable join paths can also find statistically *plausible-but-wrong* join paths — especially in messy data lakes where `id` columns reuse integer ranges across unrelated systems. Always validate a discovered join against a domain expert before encoding it in a semantic layer. An LLM that queries a context graph built on a wrong join will produce confidently incorrect answers. The error is silent, delayed, and expensive to debug. Verify before you canonicalize.

## Query Federation and Data Virtualization

A semantic layer solves the *meaning* problem. **Query federation** solves the *location* problem.

**Query federation** is the ability to query multiple independent data sources — a cloud data warehouse, an on-premises database, an API endpoint, a file store — through a single unified query interface, without physically moving the data to one place first. A federated query engine receives a SQL or semantic query, breaks it into sub-queries appropriate for each source, executes them in parallel, and joins the results before returning them to the caller.

**Data virtualization** takes this further. **Data virtualization** is a broader architectural approach in which a virtual data layer presents a unified, logical view of all enterprise data sources without any physical data movement or replication. To the consumer, it looks like a single database. Under the hood, it is orchestrating access to dozens of systems in real time.

Both technologies matter for context graphs because enterprise knowledge is rarely in one place. Decision traces reference data from HR, finance, CRM, and engineering systems simultaneously. A context graph that can only see one data source at a time is a context graph that tells incomplete stories.

The diagram below shows how query federation assembles answers from multiple sources behind a single interface.

#### Diagram: Query Federation Flow

<iframe src="../../sims/query-federation-flow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Query Federation Flow Diagram</summary>
Type: workflow
**sim-id:** query-federation-flow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Explain and trace
Learning Objective: Learners can trace a federated query from the user interface through the federation engine to multiple source systems and back, explaining what happens at each step.

Instructional Rationale: Step-through workflow is appropriate because the Understand objective requires learners to follow a concrete query through the system. Seeing each sub-query dispatched and each result returned makes the mechanics tangible.

Layout: Vertical flow with five levels:
Level 1 (top): User/LLM — shows a business question: "What is the total approved budget for open headcount requests in Engineering?"
Level 2: Federation Engine — shows the query being parsed and decomposed into three sub-queries
Level 3: Three source boxes side by side: "HR System (headcount requests)", "Finance System (approved budgets)", "Org Chart (Engineering dept tree)"
Level 4: Results boxes — each source returns its partial result
Level 5 (bottom): Joined result — the federation engine assembles the final answer

Arrows connect each level with labeled edges:
- Level 1→2: "Submit business query"
- Level 2→3: Three arrows labeled "Sub-query 1 (SQL)", "Sub-query 2 (REST API)", "Sub-query 3 (Graph traverse)"
- Level 3→4: "Partial results"
- Level 4→5: "Merge + join on employee_id"

Step controls:
- "Next Step" button advances through 5 stages, highlighting the active level
- "Run All" button animates through all stages at 600ms per step
- "Reset" returns to initial state

Each source box shows the actual sub-query dispatched when that stage is active.
Hover any arrow: tooltip explains the data format returned at that step (JSON, SQL result set, graph path list).

Canvas: Responsive width, 500px height.
Color palette: Indigo for user/result levels, orange for source systems, teal for federation engine.
</details>

## Connecting Semantic Layers to Context Graphs

Everything in this chapter feeds directly into context graph construction. Here is why each piece matters:

A context graph stores *decision traces* — records of what decisions were made, why, and which data justified them. To record a decision trace reliably, the context graph needs to know the authoritative definition of every data element involved. "We approved this expense because revenue exceeded the threshold" is only a trustworthy trace if "revenue" has a consistent, documented definition. That definition lives in the semantic layer.

Concretely, the semantic layer contributes to context graph construction in four ways:

- **Business glossary → node labels**: Business glossary terms become the canonical labels for entity nodes in the context graph. "Customer," "Order," "Product" are agreed-upon labels with documented definitions, not ad-hoc names from whichever system happened to be convenient.
- **Source system mappings → edge provenance**: When a context graph edge records that "Decision D used Data Element E," the source system mapping provides the provenance — which physical column, in which system, computed how, with what freshness and quality.
- **Virtual views → grounded LLM context**: When a context graph retrieves relevant facts to include in an LLM's context window, it can query semantic layer views rather than raw tables. The LLM receives business-level concepts with consistent definitions, not raw column values with cryptic names.
- **Schema registry → consistent entity resolution**: When the same real-world entity appears in multiple source systems under different identifiers, the schema registry's naming standards and the business glossary's canonical terms provide the hooks for entity resolution — merging "employee_id," "emp_nbr," and "user_identifier" into a single graph node.

The relationship between semantic layers and context graphs is not competitive. They solve different problems. The semantic layer gives data meaning. The context graph gives decisions memory. Together, they give AI systems the two things they need most: consistent facts and the history of how those facts were used.

## Summary and Key Takeaways

This chapter covered the infrastructure that turns a raw data lake into a queryable, trustworthy foundation for AI reasoning. Before moving to Chapter 3, make sure you can answer these questions:

- What is a data lake, and why does the "meaning problem" emerge from it even when the storage is well-engineered?
- How does a data lakehouse differ from a data lake? What does it solve, and what does it leave unsolved?
- What is a semantic layer, and what three kinds of objects does it typically define?
- What is the difference between a business metric and a dimension?
- What is a virtual view, and why does it deliver consistency at scale?
- What is the difference between a business glossary and a data dictionary?
- What is an undocumented join, and why is it dangerous for AI systems?
- What is a naming convention standard, and why does it matter for context graph construction?
- What is the difference between query federation and data virtualization?
- How do semantic layer artifacts (glossary terms, source system mappings, virtual views) contribute directly to context graph construction?

??? question "Quick Check: Semantic Layer or Context Graph?"
    An enterprise team is deciding where to record each of the following artifacts. Which belongs in the semantic layer, and which belongs in the context graph?

    1. The canonical definition of "active customer" (a customer with a purchase in the last 12 months).
    2. The record that analyst Jordan approved a $200K budget exception on March 3rd because the "active customer" count exceeded 50,000.
    3. The source system mapping showing that "active customer" is computed from `cust_master.last_order_dt > CURRENT_DATE - 365`.
    4. The trace that this approval set a precedent used six times in the following quarter.

    Click to reveal:

    **Answer:**
    **(1) Semantic layer** — a business glossary definition. **(2) Context graph** — a decision trace with actor, timestamp, and justification. **(3) Semantic layer** — a source system mapping. **(4) Context graph** — a precedent relationship connecting multiple decision nodes. Notice how (1) and (3) provide the *meaning* of the data, while (2) and (4) capture the *history* of how that meaning was used in real decisions. Both layers are necessary; neither replaces the other.

!!! mascot-celebration "Chapter 2 Done — That Was a Lot of Infrastructure!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    You have now seen the full stack beneath a context graph: data lakes that store everything, lakehouses that make storage queryable, and semantic layers that make storage *meaningful*. You understand why undocumented joins are dangerous, why naming standards matter more than they sound, and why vocabulary alignment is the unglamorous prerequisite for everything AI-powered that comes after. Chapter 3 moves to metadata management — the discipline that keeps all of this trustworthy over time. The graph is taking shape. Let's trace the why!
