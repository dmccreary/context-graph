# Quiz: What a Context Graph Is

Test your understanding of the context graph definition, decision-trace schema, read and write paths, lifecycle states, and how the context graph compares to knowledge graphs, vector stores, and traditional databases.

---

#### 1. According to the chapter, which is the formal definition of a context graph?

<div class="upper-alpha" markdown>
1. An in-memory cache of recent LLM context windows
2. A persistent, living record of organizational decision traces — stitched across entities, time, and the broader enterprise knowledge graph — designed to give LLMs the decision context they need
3. A vector index of all decision documents in the organization
4. A column-store relational database optimized for analytical queries
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter gives exactly this definition, with every word load-bearing: persistent (not a session artifact), living (evolves over time), decision traces (the atomic unit), stitched across entities/time/the KG. The other options describe different systems.

    **Concept Tested:** Context Graph Definition

---

#### 2. What is the atomic unit of content in a context graph?

<div class="upper-alpha" markdown>
1. A document chunk with an embedding vector
2. A row in a fact table
3. A decision trace recording what was decided, by whom, when, based on what information, under what policy, with what precedents, and with what outcome
4. A single triple in subject-predicate-object form
</div>

??? question "Show Answer"
    The correct answer is **C**. The decision trace is the fundamental data structure — capturing what, who, when, why, precedents, outcome, and review status. Document chunks (A), fact rows (B), and triples (D) belong to other architectures.

    **Concept Tested:** Decision Trace

---

#### 3. Which edge type connects a decision node to an earlier decision node that was consulted or cited during the new decision?

<div class="upper-alpha" markdown>
1. Approval edge
2. Precedent link (CITES)
3. Entity link (APPLIES_TO)
4. Policy reference edge (GOVERNED_BY)
</div>

??? question "Show Answer"
    The correct answer is **B**. Precedent links (typically labeled CITES) build the citation network of organizational decisions. Approval edges (A) record authorization. Entity links (C) connect decisions to business entities. Policy reference edges (D) point to the governing policy version.

    **Concept Tested:** Precedent Link

---

#### 4. Why does the chapter insist that a policy reference edge point to a *specific version* of the policy rather than the current version?

<div class="upper-alpha" markdown>
1. To save storage by avoiding duplication
2. So that years later, queries about the historical decision can correctly identify which version of the policy was in force at the time the decision was made
3. To support graph sharding by policy
4. To enable differential privacy
</div>

??? question "Show Answer"
    The correct answer is **B**. Policy versions change, and historical accuracy demands that the link reflect the version in force at the decision time — not the current revision. The other options describe unrelated mechanisms.

    **Concept Tested:** Context Graph Schema

---

#### 5. The chapter describes the context graph as a "memory layer" sitting between the structured organizational data and the LLM. Which of the following is the correct relationship?

<div class="upper-alpha" markdown>
1. The context graph replaces the data warehouse and the vector store
2. The context graph is a session-scoped cache that empties between LLM calls
3. The context graph complements the other layers — data warehouses handle aggregates, relational databases handle transactional state, vector stores handle document similarity, and the context graph provides decision context and long-term organizational memory
4. The context graph is the only layer needed once it is deployed
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter explicitly says context graphs complement, not replace, the other layers. Option A misstates the architecture. Option B conflates the context graph with the context window. Option D denies the layered design.

    **Concept Tested:** Complementary Knowledge Layers

---

#### 6. An LLM agent processing a pricing exception request needs to retrieve relevant precedents. Which sequence describes the context graph read path?

<div class="upper-alpha" markdown>
1. Query interpretation → graph traversal from the entity → ranking the retrieved decision nodes → context assembly into a serialized narrative for the LLM context window
2. Embedding generation → vector cosine similarity → ANN index lookup → answer streaming
3. SQL parsing → join planning → row materialization → result return
4. Webhook trigger → CDC capture → pipeline run → batch report
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter describes exactly this four-stage read path. Option B describes a vector store flow. Option C describes relational query execution. Option D describes CDC-based ingestion, not a read path.

    **Concept Tested:** Context Graph Read Path

---

#### 7. A team is evaluating ways to capture decisions made in informal email threads and meetings — decisions that never touch an automated system. Which write-path mode does the chapter call out for this case?

<div class="upper-alpha" markdown>
1. Automated capture by AI agents
2. System integration via webhook connectors
3. Schema crawler discovery
4. Facilitated manual capture via a capture interface that prompts participants to record decision metadata
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter notes this is the hardest mode but the only path for decisions made outside automated systems. Automated capture (A) requires an AI agent. System integration (B) requires an existing system event. Schema crawlers (C) discover metadata, not decisions.

    **Concept Tested:** Context Graph Update Pattern

---

#### 8. The chapter prescribes four lifecycle states for decision-trace records. Which set names them correctly?

<div class="upper-alpha" markdown>
1. Draft, Published, Archived, Deleted
2. Active, Superseded, Under Review, Overturned
3. Hot, Warm, Cold, Frozen
4. Open, In-Progress, Closed, Reopened
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter lists these four states and the rule that records are never deleted — they are transitioned through these states to preserve organizational memory. The other options name storage tiers or workflow states from different domains.

    **Concept Tested:** Context Graph Lifecycle

---

#### 9. A compliance auditor with limited privilege needs to verify that approvals occurred and that governance was followed, but should not see the specific justification text or approver identity. Which context graph capability supports this?

<div class="upper-alpha" markdown>
1. Schema drift detection
2. Redaction modes that hide sensitive decision properties (approver identity, justification text) while preserving structural metadata (that a decision was made, when, and to what entity it applied)
3. Transitive closure of REPORTS_TO edges
4. Forward-chaining inference over an ontology
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter explicitly describes redaction modes that preserve structural visibility while hiding sensitive content — the exact need the question describes. The other options describe unrelated mechanisms.

    **Concept Tested:** Context Graph Access Control

---

#### 10. Why does the chapter argue that a context graph should use a native graph database rather than a relational database, even though decisions could be stored as rows?

<div class="upper-alpha" markdown>
1. Because relational databases cannot store timestamps
2. Because the most valuable queries over decision history — citation chains, multi-hop precedent traces, policy-change impact analysis — are graph traversal queries that are natural in a graph database and awkward and expensive in a relational one
3. Because vector embeddings cannot be stored relationally
4. Because graph databases are always cheaper to operate at any scale
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter explicitly argues that the highest-value queries (multi-hop relationship traversal) map naturally to graph databases and require expensive recursive CTEs in relational systems. The other options misstate technical or economic claims.

    **Concept Tested:** Context Graph vs Database

---
