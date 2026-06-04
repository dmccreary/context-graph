# Quiz: Building and Deploying Context Graph Systems

Test your understanding of hybrid storage, real-time and batch ingestion, message-queue patterns, REST/GraphQL/SDK APIs, caching, replication, SLAs, testing strategy, and cost modeling for a production context graph deployment.

---

#### 1. What is the hybrid storage architecture the chapter prescribes for a production context graph?

<div class="upper-alpha" markdown>
1. Two relational databases configured as primary and replica
2. A property graph database for traversal queries paired with a vector index for semantic similarity search — used together by the retrieval pipeline
3. Only a vector store, since embeddings make graphs unnecessary
4. A SPARQL triplestore plus a SKOS thesaurus
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter is explicit: graph database + vector index together form the hybrid storage architecture, complementary rather than alternatives. The other options misstate the recommended architecture.

    **Concept Tested:** Hybrid Storage Architecture

---

#### 2. A team is evaluating a graph database for use as the context graph storage layer. Which selection criterion does the chapter call out as a hard requirement?

<div class="upper-alpha" markdown>
1. Built-in support for full Cypher and SPARQL simultaneously
2. Native graph storage with index-free adjacency, plus support for temporal property modeling, horizontal scaling, and a query language compatible with the context graph's patterns (GQL or Cypher)
3. Storage compression ratio above 10x
4. Support for at least six different node-shape rendering styles
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter lists exactly these criteria. The other options describe properties the chapter does not require.

    **Concept Tested:** Property Graph Database Selection

---

#### 3. Why does the chapter recommend a message queue (event streaming platform) at the front of the real-time ingestion pipeline?

<div class="upper-alpha" markdown>
1. To encrypt every event payload
2. Because graph databases reject all writes from external systems
3. To compress events to half their original size
4. To provide durability (events persist until processed) and backpressure (a growing queue signals the need to scale ingestion capacity), so events are never lost when the ingestion service is briefly unavailable
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter cites durability and backpressure as the two main reasons. The other options misstate the mechanism.

    **Concept Tested:** Message Queue Pattern

---

#### 4. A team needs to load 2 years of historical decision data that predates the context graph deployment, so LLM retrieval has precedents from day one. Which ingestion mode is appropriate?

<div class="upper-alpha" markdown>
1. Batch ingestion with a priority-ordered backfill strategy (highest-volume, highest-value decision types first), recognizing that 2-3 years of backfill typically provides sufficient precedent depth
2. Real-time ingestion only — backfilling violates the event-driven pattern
3. Direct SQL INSERT into the graph database bypassing the ingestion service
4. Skip the historical data entirely and rely on training data
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter describes batch ingestion with priority-ordered backfill as the right pattern, and notes that 2-3 years of history is typically sufficient. The other options either misuse infrastructure (B, C) or lose value (D).

    **Concept Tested:** Backfill Strategy

---

#### 5. An LLM application needs to assemble a custom subgraph package: "give me this customer, its last 5 pricing decisions, and for each decision the actor name, the policy version string, and the top-2 cited precedents" — all in one round trip. Which API surface is best?

<div class="upper-alpha" markdown>
1. REST, because it is the simplest
2. SDK, because it abstracts away the query
3. SOAP, because it supports complex types
4. GraphQL, because the client can specify exactly which node and edge properties to include in a single arbitrary query, avoiding over-fetching and avoiding the need for a custom REST endpoint per combination
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter cites this exact scenario as a GraphQL strength. REST (A) would require a custom endpoint. SDK (B) wraps REST/GraphQL but does not replace them. SOAP (C) is not the chapter's recommended interface.

    **Concept Tested:** Context Graph GraphQL API

---

#### 6. A context graph is being designed to support a high-frequency trading compliance use case requiring sub-100ms retrieval at 5,000 events per second with 99.9% availability. Which two design decisions does the chapter highlight as most critical for this case?

<div class="upper-alpha" markdown>
1. Run the entire system on a single instance for simplicity
2. Disable caching and replication to maximize freshness
3. Horizontally scale the ingestion service (multiple consumers from partitioned event stream topics) and deploy at least two hot read replicas with automatic failover — neither of which a standard enterprise deployment typically requires at this scale
4. Replace the graph database with a relational database to reduce cost
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter's worked example for high-frequency requirements specifies exactly these two architectural changes. The other options compromise the very requirements the question describes.

    **Concept Tested:** Context Graph Deployment Pattern

---

#### 7. Which retrieval result type does the chapter explicitly say should NOT be cached?

<div class="upper-alpha" markdown>
1. Entity decision history for low-velocity entities
2. Real-time decision context for active workflows — because a decision being actively processed may have a new trace written seconds before the retrieval query, and caching would risk serving stale information exactly when freshness matters most
3. Precedent rankings refreshed every 10 minutes
4. Static policy version metadata
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter explicitly excludes active-workflow context from caching for this exact reason. The other categories are listed as cacheable with appropriate TTLs.

    **Concept Tested:** Context Graph Caching

---

#### 8. A context graph testing strategy has four layers. Which set names them correctly?

<div class="upper-alpha" markdown>
1. Smoke, regression, load, soak
2. Unit, integration, end-to-end, contract
3. Alpha, beta, gamma, delta
4. Read, write, update, delete
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter names exactly these four layers and describes what each verifies. The other options name test categories from other contexts that the chapter does not use.

    **Concept Tested:** Context Graph Testing Strategy

---

#### 9. According to the chapter's cost analysis, which cost category typically dominates at scale (e.g., 100,000 retrieval queries per day) in a context graph deployment?

<div class="upper-alpha" markdown>
1. Network egress
2. LLM API costs (embedding generation, reranking calls, faithfulness evaluation) — often 2-3x infrastructure costs at scale — because each retrieval requires query embedding plus optional reranker and validator calls
3. Disk seek time
4. Database license fees
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter explicitly identifies LLM API costs as the typical dominant cost driver at scale, often exceeding infrastructure by 2-3x. The other categories are real but secondary.

    **Concept Tested:** Context Graph Cost Model

---

#### 10. A team is debating whether to publish a strict SLA up front or to launch first and add SLAs later once performance is understood. What does the chapter recommend, and why?

<div class="upper-alpha" markdown>
1. Add SLAs only after the first major incident
2. Skip SLAs because consumers do not read them
3. Allow each consumer to define its own SLA against the system
4. Publish a conservative SLA (e.g., P95 < 500ms) up front, even if internal performance is better, so consumers do not build implicit assumptions you must later try to revise — you can always tighten an SLA as you optimize, but you cannot easily relax one consumers have already designed around
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter's tip is exactly this: set conservative SLAs early and tighten over time. The other options leave consumers without contract guidance or make later tightening difficult.

    **Concept Tested:** Context Graph SLA

---
