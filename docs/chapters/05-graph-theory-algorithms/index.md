---
title: "Chapter 5: Graph Theory, Algorithms, and Advanced Enterprise KG"
description: "Graph algorithms — PageRank, shortest path, community detection, clustering — and the entity-resolution and information-extraction patterns that make enterprise knowledge graphs accurate and queryable."
generated_by: claude skill chapter-content-generator
date: 2026-05-18 14:35:00
version: 0.08
---

# Chapter 5: Graph Theory, Algorithms, and Advanced Enterprise KG

## Summary

Covers graph algorithms (PageRank, shortest path, community detection, graph clustering) and the advanced entity-resolution and information-extraction patterns that build on both graph and metadata foundations.

## Concepts Covered

This chapter covers the following 26 concepts from the learning graph:

1. Graph Neural Network
2. Knowledge Graph Embedding
3. Entity Disambiguation
4. Named Entity Recognition
5. Information Extraction
6. Relation Extraction
7. Semantic Triple
8. Inference Engine
9. Rule-Based Reasoning
10. Transitive Closure
11. Shortest Path Algorithm
12. Community Detection
13. Centrality Measure
14. PageRank
15. Graph Clustering
16. Subgraph Matching
17. Schema Matching
18. Ontology Mapping
19. Dublin Core Metadata
20. JSON-LD
21. Entity Resolution
22. Master Data Management
23. Canonical Entity Model
24. Cross-System Entity Linking
25. Graph Deduplication
26. Knowledge Graph Quality

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Knowledge Graphs and Labeled Property Graphs](../01-knowledge-graphs-lpg/index.md)
- [Chapter 2: Semantic Layers for Data Lakes](../02-semantic-layers/index.md)
- [Chapter 3: Metadata Management](../03-metadata-management/index.md)
- [Chapter 4: Enterprise Knowledge Graphs — Core Patterns](../04-enterprise-knowledge-graphs/index.md)

---

!!! mascot-welcome "Algorithms: the engines inside the graph."
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waves welcome">
    Welcome to Chapter 5! The last chapter built the structure; this chapter makes it compute. Graph algorithms turn a connected data structure into a reasoning engine — finding the shortest path, ranking influence, detecting communities, and resolving which records belong to the same real-world entity. Let's trace the why!

## Introduction

A knowledge graph without algorithms is like a city without roads: the buildings are there, but you cannot get anywhere efficiently. The real power of a graph data structure lies in what you can compute over it — and graph algorithms are the computational primitives that power the most valuable enterprise AI applications.

This chapter covers two broad categories of graph computation. The first is classical graph algorithms: shortest path, centrality measures, community detection, and clustering. These algorithms operate on the graph's topology and answer questions about structure — who is most connected, what is the critical path, which entities belong to the same natural cluster? The second category is machine-learning techniques applied to graphs: knowledge graph embeddings, graph neural networks, and inference engines. These techniques learn representations from graph data that enable predictions, reasoning, and information extraction at scale.

Running across both categories is the practical challenge of entity resolution — the problem of determining, at scale, which records across multiple systems refer to the same real-world entity. Entity resolution is not glamorous, but it is the foundation without which graph algorithms return misleading results. A shortest-path algorithm that treats three duplicate customer nodes as three separate entities will find paths through the duplicates that do not reflect reality.

We also cover the metadata standards — Dublin Core and JSON-LD — that make graph data portable and interoperable across systems.

## Classical Graph Algorithms for Enterprise Analysis

Before diving into specific algorithms, it helps to understand why graph algorithms matter for enterprise AI. The answer is that the most important questions in enterprise settings are fundamentally relational: not "what is the value of field X for entity Y?" but "how is entity Y connected to entity Z through what chains of relationships, and what is the significance of those connections?" Answering relational questions at scale requires graph algorithms, not SQL.

### Shortest Path

A **shortest path algorithm** finds the minimum-cost sequence of nodes and edges that connects two nodes in the graph. Cost can be measured in different ways: by the number of hops (unweighted shortest path), by the sum of edge weights (weighted shortest path), or by time (for temporal graphs with edge timestamps).

In an enterprise knowledge graph, shortest path answers questions such as: "What is the minimum chain of organizational relationships that connects this vendor to our CFO?" (useful for conflict-of-interest screening), "What is the fastest material supply chain route from raw material source to finished product?" (useful for logistics optimization), and "What is the shortest decision trace path from the original policy document to the automated decision that invoked it?" (useful for audit and explainability).

The classic weighted shortest path algorithm — known as Dijkstra's algorithm — runs efficiently on graphs with millions of nodes when the graph is stored in a native graph database that supports index-free adjacency. For very large graphs (hundreds of millions of nodes), approximate shortest path algorithms provide good answers in dramatically less time.

### Centrality Measures

**Centrality measures** quantify how "important" a node is within a graph based on its structural position. Different centrality definitions capture different kinds of importance:

- **Degree centrality**: the number of edges a node has. A node with many edges is locally well-connected but may not be globally important.
- **Betweenness centrality**: the fraction of all shortest paths in the graph that pass through a node. A node with high betweenness is a bridge — removing it disconnects large parts of the graph. In a supply chain, high-betweenness suppliers are single points of failure.
- **Closeness centrality**: how short the average shortest path is from a node to all other nodes. High closeness means a node can quickly reach or be reached by the rest of the network.
- **Eigenvector centrality** and **PageRank**: a node is important if it is connected to other important nodes. This recursive definition gives more weight to connections from influential nodes than connections from peripheral ones.

### PageRank

**PageRank** is the best-known eigenvector centrality algorithm, originally developed to rank web pages by authority but widely applicable to any directed graph. The intuition is elegant: if you placed an agent at a random node and had it walk randomly through the graph by following edges, the fraction of time the agent spends at each node converges to that node's PageRank score.

In an enterprise knowledge graph, PageRank applied to the citation graph of internal documents identifies the most-referenced policy documents — a useful signal for an LLM deciding which policies to surface in a compliance query. Applied to the organizational graph, PageRank identifies the most structurally influential individuals (those whose output reaches the most other people through chains of communication and review).

For context graphs specifically, a decision-weighted PageRank variant — where edge weights are proportional to the frequency with which a precedent decision was referenced in subsequent decisions — surfaces the most influential historical precedents. When an LLM needs to justify an automated decision, high-PageRank precedents are the best candidates to include in the context window.

#### Diagram: PageRank Visualization on a Small Supplier Graph

<details markdown="1">
<summary>Interactive vis-network MicroSim showing PageRank scores on a supplier dependency graph</summary>
Type: graph-model
**sim-id:** pagerank-supplier-graph
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: interpret
Learning Objective: Learners can interpret PageRank scores on a graph by identifying which nodes are structurally influential and explaining why their position makes them influential.

Instructional Rationale: An interactive vis-network graph where node size reflects PageRank score is appropriate for the Understand objective — learners can click nodes to see their score and read an explanation connecting the score to the node's structural position.

Canvas: responsive width, 480px height. Light gray background.

Nodes (8 total, representing a simplified supply chain):
- "Tier-1 Distributor" — large node (PageRank: 0.28), indigo, ellipse
- "Raw Material A" — medium-large (PageRank: 0.19), teal
- "Raw Material B" — medium (PageRank: 0.14), teal
- "Manufacturer X" — medium (PageRank: 0.13), gold
- "Manufacturer Y" — small-medium (PageRank: 0.10), gold
- "Product Line 1" — small (PageRank: 0.07), orange
- "Product Line 2" — small (PageRank: 0.06), orange
- "Logistics Partner" — small (PageRank: 0.03), steel blue

Node sizes scale linearly with PageRank: largest node = 50px radius, smallest = 18px radius.

Edges (directed, representing supply/dependency flow):
Raw Material A → Manufacturer X, Raw Material A → Manufacturer Y, Raw Material B → Manufacturer X, Manufacturer X → Tier-1 Distributor, Manufacturer Y → Tier-1 Distributor, Tier-1 Distributor → Product Line 1, Tier-1 Distributor → Product Line 2, Logistics Partner → Tier-1 Distributor

Click on any node: opens an infobox panel below the canvas showing:
- Node name
- PageRank score (formatted as 0.XX)
- Why this score: e.g., for Tier-1 Distributor: "Highest PageRank (0.28) because three manufacturers and one logistics partner all supply into this node — it is the critical bridge before final products. Removing it disconnects all product lines."
- Risk implication: one sentence on what high PageRank means for supply chain risk

Toggle button "Show/Hide PageRank Scores" displays score labels above each node.
Toggle button "Highlight Critical Nodes" colors nodes above 0.15 PageRank in red to visualize the top tier.
</details>

### Community Detection and Graph Clustering

**Community detection** algorithms find groups of nodes that are more densely connected to each other than to the rest of the graph. In social network analysis, communities correspond to friend groups. In an enterprise knowledge graph, communities correspond to natural business clusters: a group of products that are frequently co-purchased, a cluster of employees who frequently collaborate on incidents, a set of vendors that share common raw material sources.

The most widely used community detection algorithm is the **Louvain algorithm**, which optimizes a quality metric called modularity — a measure of how much more densely connected a candidate community is compared to what you would expect from a random graph with the same degree distribution. The algorithm runs in multiple passes, iteratively merging nodes into communities and then merging communities into super-communities until no further merges increase modularity.

**Graph clustering** is a related but distinct concept. Where community detection finds natural groupings based on topology, graph clustering uses additional features — node properties, edge weights, temporal patterns — to group nodes by similarity. K-means clustering applied to graph embeddings (which we will cover shortly) is a common approach for content-based clustering of knowledge graph entities.

For LLM context retrieval, community structure is a powerful signal. When an LLM needs context about a specific entity, retrieving the other nodes in its community provides naturally relevant information — because community membership implies dense relationship overlap with shared context.

**Subgraph matching** is the process of finding all subgraphs of a large graph that are structurally similar to a smaller pattern graph. In enterprise use cases, subgraph matching identifies instances of known patterns: "find all cases where an automated decision was made within 24 hours of a policy change without a mandatory human review." The pattern is a small subgraph (decision node linked to policy node with a timestamp constraint), and the matching algorithm scans the full context graph for all occurrences.

## Information Extraction and Entity Resolution

So far we have discussed algorithms that operate on an already-populated graph. But how does information get into the graph in the first place — especially from unstructured sources like documents, emails, and incident reports?

**Information extraction (IE)** is the process of automatically identifying structured facts from unstructured or semi-structured text. It has three main sub-tasks:

**Named Entity Recognition (NER)** identifies spans of text that refer to named entities — people ("Sarah Chen"), organizations ("Acme Corp"), locations ("Frankfurt data center"), dates ("Q3 2025"), and other entity types relevant to the domain. Modern NER systems use language models fine-tuned on domain-specific training data and can achieve very high accuracy on well-defined entity types.

**Entity disambiguation** resolves which real-world entity a recognized name refers to when multiple candidates exist. The text "Apple" might refer to the technology company, a fruit producer, or a record label, depending on context. Disambiguation uses the surrounding text, the document's topic, and previously resolved entities in the same document to select the correct canonical entity from the knowledge graph.

**Relation extraction** identifies the relationships between recognized entities. Given a sentence like "The contract between Acme Corp and the infrastructure team expires on December 31st," relation extraction would identify the GOVERNED_BY relationship between the contract and its parties, and the EXPIRES_ON relationship between the contract and the date.

Together, NER, disambiguation, and relation extraction form a pipeline for converting text into **semantic triples**: subject-predicate-object statements in the form (entity A, relationship type, entity B). A semantic triple is the atomic unit of graph knowledge — it corresponds directly to a single edge in the knowledge graph. A document processing pipeline might extract hundreds of triples from a single incident report, ingesting them as new nodes and edges into the enterprise knowledge graph.

**Master data management (MDM)** is the enterprise discipline that ensures critical business entities — customers, products, employees, suppliers — have a single, authoritative, canonical record. MDM is the operational framework; entity resolution is the technical mechanism that makes it work. An MDM system uses entity resolution algorithms to detect and merge duplicate records, producing a **canonical entity model** — a single golden record for each entity that all downstream systems can reference.

**Cross-system entity linking** extends entity resolution beyond a single domain: given two entity records from two different source systems (say, a customer record from the CRM and a billing account from the ERP), determine whether they refer to the same real-world customer and, if so, link them in the knowledge graph. This linking is what enables multi-domain traversal queries — queries that start in one domain (sales history from CRM) and traverse into another (payment patterns from ERP).

**Graph deduplication** is the ongoing process of finding and merging duplicate nodes that have accumulated in the graph over time — due to imperfect entity resolution at ingestion time, manual data entry from multiple sources, or race conditions during parallel ingestion. Deduplication runs on a schedule, scanning for node pairs that share high-similarity properties and flagging them for automated merge or human review.

#### Diagram: Information Extraction Pipeline to Graph

<details markdown="1">
<summary>Interactive step-through MicroSim showing how an incident report is converted to semantic triples and loaded into a knowledge graph</summary>
Type: microsim
**sim-id:** ie-pipeline-to-graph
**Library:** p5.js
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: use
Learning Objective: Learners can use the three-stage information extraction pipeline (NER → disambiguation → relation extraction) to trace how an unstructured text sentence becomes a set of graph edges.

Instructional Rationale: A step-through animation with highlighted text spans is appropriate because the Apply objective requires learners to work through the pipeline stages with a concrete example — seeing entities highlighted in text and watching them resolve to graph nodes makes the pipeline tangible.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 520px. White background.

Layout (top-to-bottom):
1. **Text panel** (top, 120px tall): displays example sentence: "The contract between Acme Corp and the Infrastructure Team expires on December 31st and is governed by the Data Processing Policy v2.1."
2. **Stage panels** (middle, 240px): three columns — NER, Disambiguation, Relation Extraction
3. **Graph output panel** (bottom, 160px): small vis-network-style node/edge display showing the resulting semantic triples as a mini-graph

Stage 1 — NER: Highlights entity spans in the text with colored underlines (teal = organization, gold = date, indigo = document). Lists: Entity spans found: [Acme Corp, Infrastructure Team, December 31st, Data Processing Policy v2.1]

Stage 2 — Disambiguation: Shows each entity matched to a canonical ID:
- Acme Corp → Customer node ENT-00441872
- Infrastructure Team → Department node DEPT-INFRA-07
- December 31st → Date value 2025-12-31
- Data Processing Policy v2.1 → Policy node POL-DPP-021

Stage 3 — Relation Extraction: Shows extracted triples:
- (Contract C-889, PARTY_A, ENT-00441872)
- (Contract C-889, PARTY_B, DEPT-INFRA-07)
- (Contract C-889, EXPIRES_ON, 2025-12-31)
- (Contract C-889, GOVERNED_BY, POL-DPP-021)

Graph panel: shows these 5 nodes (contract + 4 linked entities) with labeled edges, rendered as a tiny vis-network graph.

Controls: "Next Stage" and "Previous Stage" buttons. Stage indicator text. "Load to Graph" button at Stage 3 triggers a brief animation where the mini-graph nodes pulse in indigo to simulate ingestion.

Canvas responds to window resize.
</details>

## Machine Learning on Graphs

Classical graph algorithms compute structural properties. Machine learning applied to graphs learns *representations* — compact numerical encodings of nodes and edges that capture both structural position and semantic content. These representations enable predictions, similarity search, and pattern recognition at a scale and flexibility that rule-based methods cannot match.

### Knowledge Graph Embeddings

A **knowledge graph embedding** is a mapping from every node (and optionally every edge type) to a dense vector in a continuous geometric space. The embedding is trained so that related nodes are nearby in the embedding space: "Customer: Acme Corp" and "Contract: Acme Master Services Agreement" should be close, because they are directly connected in the graph.

Once trained, embeddings enable powerful operations. **Semantic similarity search** finds nodes similar to a query node by computing distances in the embedding space — far faster than traversal-based approaches for large-scale retrieval. **Link prediction** uses the geometry of the embedding space to predict which edges are likely missing from the graph: if nodes A and B are close in the space in a pattern similar to other pairs with known edges, the model predicts an edge exists between them. This is valuable for completing knowledge graphs that have systematic gaps — relationships that exist in reality but were never explicitly recorded.

For LLM context retrieval, knowledge graph embeddings bridge structured and unstructured retrieval. A natural-language query can be encoded by the LLM's own embedding model, and then matched against the knowledge graph embedding space to find the most semantically relevant graph nodes — even if the query does not use the exact entity names or relationship types in the graph.

### Graph Neural Networks

A **Graph Neural Network (GNN)** is a deep learning architecture that learns node and edge representations by propagating information through the graph structure. In each propagation step, a node's representation is updated by aggregating the representations of its neighbors (weighted by edge properties) and combining them with the node's own current representation. After several propagation steps, each node's representation encodes information about its local neighborhood structure.

GNNs are powerful for classification tasks (predicting the label of a node based on its graph context), regression tasks (predicting a numerical property), and graph-level tasks (predicting a property of the whole graph). In enterprise applications, GNNs are used for fraud detection (identifying transaction nodes that are structurally similar to known fraud patterns), customer churn prediction (using the graph neighborhood of a customer node as features), and knowledge graph completion (filling in missing facts).

For context graphs, a GNN trained on historical decision traces can learn to predict which precedent decisions are most likely to be relevant for a new decision request — enabling smarter context retrieval than simple cosine similarity over embeddings.

### Inference Engines and Rule-Based Reasoning

Not all knowledge derivation requires machine learning. **Rule-based reasoning** uses formal logical rules to derive new facts from existing ones. An **inference engine** applies a set of rules repeatedly to the graph until no new facts can be derived — a process called **forward chaining**.

A simple example: if the graph contains the facts (A reports-to B) and (B reports-to C), an inference rule `REPORTS_TO is transitive → derive A INDIRECTLY_REPORTS_TO C` produces a new edge. This is **transitive closure** — the set of all indirect relationships that can be derived by chaining direct relationships.

Transitive closure is particularly valuable for organizational graphs. Direct reporting relationships are explicit in the HR data; but the full management chain from a junior engineer to the CEO is derived by transitive closure over the REPORTS_TO edges. An LLM querying "who needs to approve this change request, up to VP level?" can get a correct answer only if the graph exposes the full transitive management chain, not just the direct reporting relationships.

## Metadata Standards for Graph Interoperability

Enterprise knowledge graphs do not live in isolation — they exchange data with external systems, regulatory bodies, and partner organizations. Two metadata standards are particularly important for graph interoperability.

**Dublin Core Metadata** is a set of 15 core metadata elements (title, creator, subject, description, publisher, contributor, date, type, format, identifier, source, language, relation, coverage, rights) originally developed for describing library resources but now widely used for any type of digital asset. Dublin Core provides a minimal, common vocabulary for describing what a dataset or document is, who created it, when, and what it is about. In a knowledge graph context, Dublin Core properties appear as standard attributes on dataset nodes, making it possible to query and compare metadata across graph instances that may use different internal schemas.

**JSON-LD** (JSON for Linked Data) is a World Wide Web Consortium standard for expressing graph data in JSON format. A JSON-LD document adds a `@context` key to a JSON object that maps the JSON keys to standard vocabulary terms from ontologies like schema.org or domain-specific ontologies. This makes the document self-describing: any system that can parse JSON-LD can understand what each field means without additional documentation. JSON-LD is increasingly used as the interchange format between knowledge graph systems, API responses, and LLM tool interfaces — making it a practical bridge between graph-native storage and the JSON-centric world of web APIs.

**Schema matching** is the process of automatically aligning two schemas from different systems — finding correspondences between elements that represent the same concept under different names. An automated schema matching tool might determine that the CRM's `account_id` corresponds to the ERP's `customer_number` by comparing name similarity, data type, value distributions, and semantic context.

**Ontology mapping** is the higher-level version of schema matching: aligning two ontologies (rather than two flat schemas) by finding equivalent or overlapping concept types and relationship types. Organizations that federate multiple graph instances often need ontology mapping to translate queries from one graph's vocabulary into another's.

#### Diagram: Knowledge Graph Embedding Space Explorer

<details markdown="1">
<summary>Interactive 2D scatter plot showing knowledge graph embedding positions for enterprise entities</summary>
Type: microsim
**sim-id:** kg-embedding-explorer
**Library:** p5.js
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Learners can explain how knowledge graph embeddings place semantically related entities near each other in a continuous space, enabling similarity-based retrieval.

Instructional Rationale: An interactive 2D scatter plot is appropriate because the Understand objective requires learners to see that proximity in the embedding space corresponds to semantic relatedness — clicking nearby points and reading their relationship descriptions builds the core intuition.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 480px. White background with light grid.

Display: 2D scatter plot. X and Y axes labeled "Embedding Dimension 1" and "Embedding Dimension 2" with thin gray grid lines. Each entity is a colored dot (radius 8px) at pre-set coordinates designed to show natural clustering.

Entity clusters (pre-set positions to illustrate meaningful groupings):
Cluster A — Customer entities (teal dots): "Acme Corp" (0.2, 0.8), "GlobalTech Ltd" (0.25, 0.72), "NordicMfg" (0.18, 0.76)
Cluster B — Contract entities (gold dots): "Acme MSA" (0.35, 0.78), "GlobalTech SLA" (0.40, 0.71), "NordicMfg Order" (0.37, 0.80)
Cluster C — Policy documents (indigo dots): "Data Processing Policy" (0.62, 0.35), "Information Security Policy" (0.68, 0.40), "Privacy Policy" (0.60, 0.42)
Cluster D — Incidents (orange dots): "Incident-447" (0.78, 0.20), "Incident-891" (0.82, 0.18), "Incident-332" (0.76, 0.25)

Scattered bridging entities (steel blue diamonds): "IT Department" at (0.5, 0.5), "Finance Team" at (0.55, 0.45) — positioned between clusters, illustrating that organizational entities link multiple domains.

Click on any dot: displays an infobox at bottom of canvas:
- Entity name and type
- "Nearest neighbors in embedding space: [list 2 nearest dots by Euclidean distance]"
- "Why they are close: [one sentence explanation based on entity types]"
- For bridging entities: "Bridge position: connected to both Customer cluster and Policy cluster — reflects this department's role in both contracting and compliance."

Slider: "Similarity Threshold" (createSlider, 0.0 to 0.5, step 0.05, default 0.2). When adjusted, draws thin gray lines between all dot pairs within the threshold distance — visualizing the similarity neighborhood. Fewer lines at low threshold, more at high threshold.

Label: "KG Embedding Space (2D projection for visualization — real embeddings have hundreds of dimensions)"

Canvas responds to window resize.
</details>

## Knowledge Graph Quality

A knowledge graph is only as useful as its data is accurate. **Knowledge graph quality** encompasses all the properties that make a graph trustworthy as a source of context for LLM applications: completeness, accuracy, consistency, freshness, and structural validity.

Completeness asks: are all the entities and relationships that should be in the graph actually there? A customer graph that is missing 30% of active accounts is not a reliable substrate for an LLM answering questions about customer portfolios. Accuracy asks: are the properties and relationships that are in the graph correct? A graph where 5% of supplier-product edges are wrong will cause 5% of supply chain queries to return misleading results.

Consistency asks: does the graph satisfy all of its own schema constraints? A graph that contains cycles in an acyclic hierarchy (employee A reports to B, B reports to C, C reports to A) is structurally inconsistent. Freshness asks: is the graph's representation of reality current? A graph with perfect structural quality but data that is six months stale is unreliable for operational queries.

Quality measurement is a continuous process, not a one-time assessment. Production knowledge graphs run automated quality checks on every ingestion batch, tracking quality metrics over time and alerting when any metric drops below a configured threshold. These quality metrics are stored as operational metadata on dataset nodes — making them queryable by the context graph and visible to LLM retrieval pipelines.

## Summary and Key Takeaways

Graph algorithms and machine learning techniques transform a knowledge graph from a structured data store into a computational platform for enterprise intelligence. The algorithms in this chapter — shortest path, PageRank, community detection, information extraction, entity resolution, and GNNs — are the toolbox that every context graph practitioner needs to understand.

By the end of this chapter, you should be able to:

- Explain what **shortest path**, **centrality measures**, and **PageRank** compute and give an enterprise use case for each
- Describe how **community detection** and **subgraph matching** enable pattern discovery in enterprise graphs
- Trace the three stages of **information extraction** (NER, entity disambiguation, relation extraction) from text to semantic triples to graph edges
- Explain the relationship between **entity resolution**, **master data management**, and **canonical entity models**
- Describe how **knowledge graph embeddings** enable semantic similarity search and link prediction
- Explain what a **Graph Neural Network** learns and why it is useful for enterprise prediction tasks
- Explain how **transitive closure** and **rule-based reasoning** extend graph knowledge beyond explicitly stated facts
- Describe the roles of **Dublin Core**, **JSON-LD**, **schema matching**, and **ontology mapping** in graph interoperability

??? question "Quick Check"
    A context graph contains 50,000 historical decision trace nodes. An LLM agent receives a new decision request and needs to find the 5 most relevant precedent decisions. Describe two retrieval approaches — one using graph algorithms, one using knowledge graph embeddings — and explain what advantage each offers over the other.

    *(Answer: Structural approach: run subgraph matching to find precedent decisions whose entity and relationship context matches the current request's context graph neighborhood — captures structural similarity but requires a precise pattern definition. Embedding approach: encode the current request as an embedding vector and retrieve the 5 nearest precedent nodes by cosine similarity — faster, handles fuzzy semantic similarity, works without a precise pattern, but may miss structurally relevant cases that are semantically phrased differently.)*

!!! mascot-celebration "Chapter 5: Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    Excellent work, graph builder. You now have both the structural vocabulary (from Chapters 1-4) and the algorithmic toolbox (Chapter 5) to reason seriously about enterprise knowledge graphs. Chapter 6 takes us to metadata registries — the formal standards for defining what every data field in the enterprise means, down to the last property. Think of it as the grammar book for the graph's vocabulary. Let's trace the why!
