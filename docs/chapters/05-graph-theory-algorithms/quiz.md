# Quiz: Graph Theory, Algorithms, and Advanced Enterprise KG

Test your understanding of classical graph algorithms, information extraction, entity resolution, knowledge graph embeddings, and the metadata standards that make enterprise graphs interoperable.

---

#### 1. What does a shortest path algorithm compute in a knowledge graph?

<div class="upper-alpha" markdown>
1. The most frequently used edge in the graph
2. The minimum-cost sequence of nodes and edges connecting two nodes, where cost can be hops, weights, or time
3. The largest connected component containing a given node
4. The eigenvector centrality score of every node in the graph
</div>

??? question "Show Answer"
    The correct answer is **B**. Shortest path finds the minimum-cost sequence between two nodes; cost can be number of hops, sum of edge weights, or time. The other options describe unrelated computations (most-used edge is a frequency metric, connected components are a different algorithm, eigenvector centrality is a node-ranking algorithm like PageRank).

    **Concept Tested:** Shortest Path Algorithm

---

#### 2. Which centrality measure identifies nodes whose removal would disconnect large parts of the graph, making them critical "bridge" nodes in a supply chain?

<div class="upper-alpha" markdown>
1. Degree centrality
2. Closeness centrality
3. Betweenness centrality
4. PageRank
</div>

??? question "Show Answer"
    The correct answer is **C**. Betweenness centrality measures the fraction of all shortest paths that pass through a node — high betweenness means the node is a bridge, and removing it disconnects large parts of the graph. Degree (A) is local connection count. Closeness (B) measures average reachability. PageRank (D) measures eigenvector-style importance, not bridge structure.

    **Concept Tested:** Centrality Measure

---

#### 3. What is a semantic triple?

<div class="upper-alpha" markdown>
1. Three properties attached to a single node
2. A subject-predicate-object statement representing a single fact, corresponding directly to one edge in the knowledge graph
3. A group of three duplicate nodes pending deduplication
4. The output of a community detection algorithm
</div>

??? question "Show Answer"
    The correct answer is **B**. A semantic triple is a subject-predicate-object statement (entity, relationship type, entity) — the atomic unit of graph knowledge that corresponds to one edge. Three properties on a node (A) is unrelated. Duplicate nodes (C) describe a deduplication problem. Community detection (D) produces clusters, not triples.

    **Concept Tested:** Semantic Triple

---

#### 4. A compliance team needs to find the full management chain from a junior engineer up to the CEO, but the HR system only stores direct REPORTS_TO edges. Which technique exposes the indirect relationships?

<div class="upper-alpha" markdown>
1. K-means clustering on node embeddings
2. PageRank computed over the org chart
3. Named entity recognition over the HR documents
4. Transitive closure over the REPORTS_TO edges via a rule-based inference engine
</div>

??? question "Show Answer"
    The correct answer is **D**. Transitive closure derives the full chain of indirect relationships by repeatedly chaining direct edges — exactly what a rule-based inference engine does for REPORTS_TO. Clustering (A) groups by similarity, not by chain. PageRank (B) ranks influence but does not enumerate chains. NER (C) extracts entities from text and is unrelated to traversal closure.

    **Concept Tested:** Transitive Closure

---

#### 5. A retail company is loading incident reports into its enterprise knowledge graph. A sentence reads "Acme Corp signed the MSA on December 31st." Which combination of information extraction sub-tasks is required to convert this into graph edges?

<div class="upper-alpha" markdown>
1. Named entity recognition only — the rest is automatic
2. Schema matching followed by ontology mapping
3. Named entity recognition, then entity disambiguation, then relation extraction
4. Graph deduplication followed by transitive closure
</div>

??? question "Show Answer"
    The correct answer is **C**. The full IE pipeline is NER (find spans like "Acme Corp," "MSA," "December 31st"), then disambiguation (resolve "Acme Corp" to canonical entity ID), then relation extraction (identify SIGNED and ON_DATE relationships). NER alone (A) is insufficient. Schema/ontology mapping (B) align two schemas, not text to a graph. Deduplication and transitive closure (D) are post-load operations.

    **Concept Tested:** Information Extraction

---

#### 6. Why is entity resolution considered the precondition for almost every other graph operation?

<div class="upper-alpha" markdown>
1. Without entity resolution, no edges can be stored at all
2. Without entity resolution, the same real-world entity appears as multiple duplicate nodes, causing algorithms like shortest path to traverse through duplicates and return misleading results
3. Without entity resolution, the database cannot enforce the closed world assumption
4. Without entity resolution, JSON-LD documents cannot be parsed
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter and earlier chapters emphasize that unresolved duplicates produce phantom paths and contradictory properties — making graph algorithms return misleading results. Edges can still be stored without entity resolution (A is wrong). Closed world assumption (C) and JSON-LD parsing (D) are independent of entity resolution.

    **Concept Tested:** Entity Resolution

---

#### 7. Why are knowledge graph embeddings particularly useful for bridging LLM queries to graph retrieval?

<div class="upper-alpha" markdown>
1. They eliminate the need for entity resolution
2. They allow a natural-language query encoded by the LLM's embedding model to be matched against graph node embeddings, surfacing relevant nodes even when the query does not use exact entity names or edge types
3. They replace graph storage with a flat vector store
4. They guarantee that all retrieved nodes are mutually exclusive
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter highlights this exact bridging role: the LLM encodes the query as a vector, and the graph embedding space lets it find semantically related nodes without needing exact name or edge-type matches. Embeddings do not replace entity resolution (A) or graph storage (C), and they do not enforce mutual exclusivity (D).

    **Concept Tested:** Knowledge Graph Embedding

---

#### 8. A fraud detection team wants to identify transaction nodes that are structurally similar to known fraud patterns, learning from the surrounding graph neighborhood of each node. Which technique is the most direct fit?

<div class="upper-alpha" markdown>
1. A Graph Neural Network trained on labeled fraud examples, which learns node representations by propagating information through neighbor structure
2. Shortest path from the transaction to a known-fraud node
3. Dublin Core metadata tagging of every transaction
4. SKOS classification of transactions into a taxonomy
</div>

??? question "Show Answer"
    The correct answer is **A**. GNNs learn node representations by aggregating neighbor information — ideal for fraud detection where the surrounding transaction graph carries the signal. Shortest path (B) only measures distance. Dublin Core tagging (C) is metadata, not pattern learning. SKOS (D) is a vocabulary standard, not a fraud-detection mechanism.

    **Concept Tested:** Graph Neural Network

---

#### 9. A team is exchanging knowledge graph data with an external partner over a REST API. They need a self-describing JSON format where each key maps to a standard vocabulary term so the partner can interpret the payload without separate documentation. Which standard fits?

<div class="upper-alpha" markdown>
1. GraphML
2. SPARQL
3. JSON-LD
4. Cypher
</div>

??? question "Show Answer"
    The correct answer is **C**. JSON-LD adds a `@context` mapping that makes each JSON key map to a vocabulary term — exactly the self-describing JSON format the chapter describes. GraphML (A) is XML-based. SPARQL (B) is a query language. Cypher (D) is also a query language, not an interchange format.

    **Concept Tested:** JSON-LD

---

#### 10. A weekly automated quality check on a 200-million-node customer graph reports that completeness on the `primary_address` field has fallen from 0.94 to 0.71 over the last month. According to the chapter, what is the most appropriate response?

<div class="upper-alpha" markdown>
1. Ignore it because aggregate quality scores at the graph level remain unchanged
2. Reduce the threshold so the alert stops firing
3. Treat the field as a knowledge graph quality regression, surface the operational-metadata score on the affected nodes so LLM retrieval pipelines can warn or refuse, and investigate the upstream cause
4. Re-train the graph embeddings to compensate for the missing values
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter prescribes continuous quality measurement with alerts that drive investigation, with quality scores stored as operational metadata so retrieval pipelines can react. Ignoring the alert (A) wastes the very feedback the system exists to provide. Lowering the threshold (B) hides the regression. Re-training embeddings (D) does not address the underlying data problem.

    **Concept Tested:** Knowledge Graph Quality

---
