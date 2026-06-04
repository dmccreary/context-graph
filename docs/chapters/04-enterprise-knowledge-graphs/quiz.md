# Quiz: Enterprise Knowledge Graphs — Core Patterns

Test your understanding of canonical entities, hub-and-spoke vs. federated architectures, graph ETL pipelines, schema governance, ontologies, and billion-edge scaling patterns.

---

#### 1. According to the chapter, which three properties define a well-defined entity in an enterprise knowledge graph?

<div class="upper-alpha" markdown>
1. Stable identity, canonical properties, and governed provenance
2. Hash key, primary index, and partition key
3. Embedding vector, similarity score, and cluster label
4. SQL primary key, foreign key, and unique constraint
</div>

??? question "Show Answer"
    The correct answer is **A**. A well-defined entity needs a globally unique persistent identifier (stable identity), a defined set of attributes that mean the same thing across systems (canonical properties), and a recorded history of where its data came from (governed provenance). The other options describe storage and indexing concepts that do not address what makes an entity semantically well-defined.

    **Concept Tested:** Entity

---

#### 2. Which best describes a hub-and-spoke graph architecture?

<div class="upper-alpha" markdown>
1. Each domain system exposes its own graph API, and a query layer routes queries across them
2. Every node in the graph is replicated to every storage shard
3. All domain systems write canonical entity data into a central knowledge graph hub that maintains the authoritative copy
4. A vector store holds embeddings while a relational database holds entities
</div>

??? question "Show Answer"
    The correct answer is **C**. Hub-and-spoke centralizes the authoritative graph in a hub that domain systems ingest into. Option A describes federated architecture. Option B describes replication, not architecture. Option D describes a vector+SQL combination unrelated to the hub-and-spoke pattern.

    **Concept Tested:** Hub-and-Spoke Graph Architecture

---

#### 3. What is schema drift in a production knowledge graph?

<div class="upper-alpha" markdown>
1. The gradual, usually undocumented change in source-system schemas that accumulates over time and silently corrupts the graph
2. A planned migration from one graph database vendor to another
3. The use of multiple schema versions in a single ETL pipeline
4. The intentional rotation of edge types to balance shard load
</div>

??? question "Show Answer"
    The correct answer is **A**. Schema drift is the gradual, often undocumented divergence between the declared schema and what source systems actually produce — new fields added, edge types quietly renamed, and so on. The other options describe deliberate engineering activities, not the silent drift the chapter warns against.

    **Concept Tested:** Schema Drift

---

#### 4. Why does the chapter recommend setting `valid_to` timestamps on edges instead of simply deleting them when relationships end?

<div class="upper-alpha" markdown>
1. Because deleting edges is impossible in most graph databases
2. Because historical relationships are often as valuable as current ones for decision trace analysis, and `valid_to` lets queries filter to current state while preserving history
3. Because deletion violates the closed world assumption
4. Because timestamps reduce the storage footprint of the edge
</div>

??? question "Show Answer"
    The correct answer is **B**. Setting `valid_to` preserves the historical relationship for later decision-trace queries while still allowing current-state queries to exclude expired edges. Deletion is supported in graph databases (A is wrong). The closed world assumption is unrelated (C). Adding a timestamp increases, not decreases, edge size (D).

    **Concept Tested:** Stale Edge Detection

---

#### 5. A finance team wants to trace every approval that authorized exceptions to a specific revenue policy last quarter. Which domain graph is the most directly relevant?

<div class="upper-alpha" markdown>
1. Operational log graph
2. Product catalog graph
3. Finance data graph
4. HR data graph
</div>

??? question "Show Answer"
    The correct answer is **C**. The finance data graph captures accounts, transactions, purchase orders, invoices, and approval chains — exactly what an exception-approval trace requires. The operational log graph (A) captures infrastructure events. The product catalog (B) holds SKU hierarchies. The HR graph (D) is needed to look up approvers, but the primary subgraph for an approval trace is finance.

    **Concept Tested:** Finance Data Graph

---

#### 6. An ingestion engineer is designing the stage that converts source records like `cust_id: 8821-B` from a legacy CRM into a canonical entity ID like `ENT-00441872`. Which stage of the graph ingestion pipeline is this?

<div class="upper-alpha" markdown>
1. Extract
2. Resolve
3. Transform
4. Validate
</div>

??? question "Show Answer"
    The correct answer is **B**. Resolve is the stage that maps source-system IDs to canonical entity IDs using the entity resolution index. Extract (A) pulls raw records. Transform (C) converts to graph node/edge format after resolution. Validate (D) checks schema conformance afterward. ID resolution is its own dedicated stage.

    **Concept Tested:** Graph Ingestion Pattern

---

#### 7. An LLM agent is observed making product recommendations that route purchase orders to suppliers who no longer carry the affected product lines. Which operational failure mode is the most likely root cause?

<div class="upper-alpha" markdown>
1. Insufficient graph replication causing read-replica lag
2. Failure to detect and mark stale edges, so the graph still shows supplier-product relationships that no longer exist
3. Excessive graph sharding causing cross-shard query slowdowns
4. Missing provenance metadata on the supplier nodes
</div>

??? question "Show Answer"
    The correct answer is **B**. The LLM is following edges that no longer reflect reality — the classic signature of stale-edge detection failure. Replication lag (A) would cause short-term inconsistency, not persistent wrong-supplier recommendations. Sharding issues (C) cause latency, not wrong answers. Missing provenance (D) is a trust problem but does not by itself cause the wrong edges to appear in traversal.

    **Concept Tested:** Stale Edge Detection

---

#### 8. How does an ontology differ from a taxonomy?

<div class="upper-alpha" markdown>
1. An ontology only expresses parent-child hierarchy; a taxonomy expresses richer relationships
2. An ontology is a JSON file format; a taxonomy is a YAML file format
3. An ontology defines types, the relationships between types, the constraints on those relationships, and rules for inference; a taxonomy is a hierarchical classification expressing only the is-a relationship
4. An ontology is always stored in RDF; a taxonomy is always stored in an LPG
</div>

??? question "Show Answer"
    The correct answer is **C**. Taxonomies express only the is-a hierarchy, while ontologies define types, typed relationships, constraints, and inference rules. Option A reverses the two. Option B invents a file-format distinction. Option D incorrectly ties each formalism to a specific storage model.

    **Concept Tested:** Taxonomy vs Ontology

---

#### 9. Why does graph sharding require minimizing cross-shard edges, in contrast to relational sharding?

<div class="upper-alpha" markdown>
1. Because graph databases cannot physically store edges that span shards
2. Because every cross-shard edge traversal requires a network hop, which dramatically increases query latency on the traversal-heavy workloads graphs are built for
3. Because cross-shard edges violate the closed world assumption
4. Because cross-shard edges break the directionality of the edge
</div>

??? question "Show Answer"
    The correct answer is **B**. Graph queries are traversal-based, so every cross-shard edge becomes a network hop and slows down the multi-hop queries the graph exists to serve. Cross-shard edges are physically storable (A). The closed world assumption (C) is unrelated. Directionality (D) is preserved regardless of shard placement.

    **Concept Tested:** Graph Sharding

---

#### 10. A platform-business graph has 8 billion supplier-product-transaction edges. Sub-second multi-hop traversal performance is critical, but data freshness is also important and write throughput is heavy. Which combination of techniques should the team prioritize, based on the chapter?

<div class="upper-alpha" markdown>
1. Eliminate sharding entirely so every query stays on a single node
2. Direct LLM retrieval reads to graph replicas (keeping the write path uncongested) and shard so that tightly connected node clusters live on the same shard (minimizing cross-shard traversal)
3. Convert the graph to RDF triples to take advantage of the open world assumption
4. Drop all property indexes and rely solely on full-graph scans
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter pairs graph replication for read scaling (so LLM retrieval does not contend with writes) with cluster-aware sharding to minimize cross-shard traversal. Eliminating sharding (A) is infeasible at 8 billion edges. Switching to RDF (C) contradicts the entire enterprise-LPG argument. Dropping property indexes (D) would make range queries catastrophically slow.

    **Concept Tested:** Graph Replication

---
