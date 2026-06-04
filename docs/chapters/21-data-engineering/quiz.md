# Quiz: Data Engineering and Infrastructure

Test your understanding of data mesh architecture, data products and contracts, SLAs and observability, streaming and orchestration tools, multi-model integration, change data feeds, graph-derived features, and the silent-data-failure footgun that threatens context graph trustworthiness.

---

#### 1. Which three data flows does the chapter say a context graph data engineering stack must support?

<div class="upper-alpha" markdown>
1. North-south, east-west, internal
2. The write flow (capturing source events into graph mutations), the read flow (retrieving subgraphs and serving context to AI), and the governance flow (tracking lineage, enforcing quality, producing audit records)
3. Ingest, process, archive
4. Production, staging, development
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter names exactly these three flows. The other options name unrelated infrastructure categories.

    **Concept Tested:** Context Graph Observability

---

#### 2. In a data mesh for context graphs, which set of three layers does the chapter describe?

<div class="upper-alpha" markdown>
1. Domain data products owned by domain teams, a central context graph platform owned by the platform team, and federated governance (often the Center of Excellence) that sets and enforces cross-domain standards
2. Frontend, middleware, backend
3. Cache, database, archive
4. Public, private, partner
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter names exactly these three layers and their distinct responsibilities. The other options describe unrelated architecture categories.

    **Concept Tested:** Data Mesh

---

#### 3. A data contract for a context graph data product specifies four things, according to the chapter. Which set names them correctly?

<div class="upper-alpha" markdown>
1. Schema, freshness SLA, completeness guarantee, and quality assertions
2. Vendor, price, support hours, renewal date
3. CPU, RAM, disk, network
4. Author, version, license, copyright
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter lists these four contract elements. The other options describe contractual or system attributes that are not data-contract specifications.

    **Concept Tested:** Data Contract

---

#### 4. A streaming pipeline ingests a decision-trace event that references an entity not yet present in the graph because the events arrived out of order. According to the chapter, what is the correct handling?

<div class="upper-alpha" markdown>
1. Silently drop the event
2. Either buffer the event until all referenced entities are present, or apply the update speculatively and reconcile when the referenced entity arrives — the streaming processing platform must keep the graph internally consistent at all times even under concurrent multi-stream updates
3. Reject every out-of-order event
4. Switch the entire pipeline to batch mode
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter prescribes buffer-or-reconcile to preserve consistency. The other options either lose data (A, C) or abandon the streaming pattern entirely (D).

    **Concept Tested:** Streaming Graph Update

---

#### 5. The chapter identifies four types of system states distinguishable by combined infrastructure, data quality, and AI output monitoring. Which state does it call out as the most dangerous and explain why?

<div class="upper-alpha" markdown>
1. Infrastructure failure — because dashboards turn red
2. Fully operational — because complacency sets in
3. AI model drift — because models are expensive to retrain
4. Silent data failure — infrastructure healthy (green dashboards), data quality degraded (stale sources, missing fields, broken entity links), and AI output silently wrong; without data-quality monitoring this can persist for weeks before users notice
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter explicitly calls silent data failure the most dangerous state and explains exactly why. The other options are visible or less dangerous.

    **Concept Tested:** Data Observability

---

#### 6. Why does the chapter recommend change data feeds (reading the source database transaction log) over polling-based extraction for context graph freshness?

<div class="upper-alpha" markdown>
1. Because polling is faster
2. Completeness (the transaction log captures every write, including ones that would be overwritten between poll intervals), low source-system impact (read-only, non-blocking), and order preservation (events arrive in the source's exact processing order — essential for correctly reconstructing decision histories)
3. Because CDC eliminates the need for governance
4. Because polling requires a graph database
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter lists exactly these three CDC advantages. The other options misstate the trade-off.

    **Concept Tested:** Change Data Feed

---

#### 7. A context graph deployment needs to store full contract PDFs, transcripts, and policy documents alongside the decision-trace metadata. According to the chapter, which integration pattern handles this best?

<div class="upper-alpha" markdown>
1. Store the documents as base64 strings on decision-trace nodes
2. Discard the documents and rely on summaries
3. Document store integration — the graph holds decision-trace metadata and a document reference (ID, title, sections); the document store holds the full content; document-level access control is applied separately from graph-traversal access — both systems share a consistent entity-linking ID so a traversal can fetch the document without a second identifier mapping
4. A single relational table containing both graph nodes and document blobs
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter prescribes this exact pattern, including the access-control rationale. The other options either bloat graph nodes (A), lose information (B), or undo the benefits of specialized storage (D).

    **Concept Tested:** Document Store Integration

---

#### 8. A team trains a model to predict which decisions will require escalation. They need features as they existed when each historical decision was made, not as they look today. According to the chapter, what makes the context graph particularly well-suited to serve as the training feature store?

<div class="upper-alpha" markdown>
1. Because the context graph has bitemporal versioning (from Chapter 13), it can return point-in-time correct features for any historical date — answering "what did the precedent graph look like on this specific date for this specific entity?" — a query flat feature stores cannot answer without enormous complexity
2. Because the context graph is faster than a relational database
3. Because the context graph caches embeddings
4. Because the context graph is owned by the data science team
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter explicitly cites bitemporal versioning as the property that makes the knowledge-graph-as-feature-store pattern uniquely valuable for training. The other options misstate the property.

    **Concept Tested:** Knowledge Graph as Feature Store

---

#### 9. The chapter recommends graph-based recommendation over pure embedding-based similarity for context graph applications. What advantage does it cite?

<div class="upper-alpha" markdown>
1. Embeddings are mathematically incorrect
2. Graph-based recommendations are inherently explainable — "these three precedents are recommended because they involved the same customer, the same exception type, and were approved by the same authority" is a traceable explanation; "these three decisions have cosine similarity 0.87 in the embedding space" is not
3. Graph databases are always faster than vector indexes
4. Embeddings are not allowed under GDPR
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter cites explainability as the key advantage. The other options misstate technical or legal claims.

    **Concept Tested:** Graph-Based Recommendation

---

#### 10. A context graph team observes user-reported low confidence in retrieval results, despite all infrastructure dashboards showing green. Which observability gap is the most likely culprit, and what is the structural fix?

<div class="upper-alpha" markdown>
1. The team is missing data quality layer monitoring (semantic correctness — required fields populated, entity references resolving, source freshness, schema conformance) and AI output layer monitoring (retrieval relevance, coverage, user feedback); the structural fix is to add automated data-quality assertions that run on every pipeline execution and continuous AI-output monitoring, not just infrastructure dashboards
2. The graph database is broken
3. The LLM weights need retraining
4. The vector index needs more dimensions
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter calls this exact gap silent data failure and prescribes adding data-quality and AI-output layers atop infrastructure monitoring. The other options jump to conclusions inconsistent with the green infrastructure signal.

    **Concept Tested:** Data SLA

---
