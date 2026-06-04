# Quiz: Graph Data Modeling for Context

Test your understanding of bitemporal modeling, valid and transaction time, slowly changing dimensions, cross-graph references, indexing, constraint enforcement, and the schema evolution patterns that keep a production context graph correct over time.

---

#### 1. What is the difference between valid time and transaction time?

<div class="upper-alpha" markdown>
1. Valid time is when a fact was true in the real world; transaction time is when the fact was recorded in the database
2. They are synonyms for the same timestamp
3. Valid time applies to nodes and transaction time applies to edges
4. Valid time only exists in RDF; transaction time only exists in LPG
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter is explicit: valid time is reality-based; transaction time is database-based. The other options misstate the relationship.

    **Concept Tested:** Valid Time

---

#### 2. Which best describes bitemporal modeling?

<div class="upper-alpha" markdown>
1. A model that uses both leap years and standard years
2. The practice of storing four timestamps per record (`valid_from`, `valid_to`, `transaction_from`, `transaction_to`) so that queries can filter on both the real-world period a fact was true and the database period the system held it as current
3. A vector model with two embedding dimensions
4. A schema with two parallel node-label hierarchies
</div>

??? question "Show Answer"
    The correct answer is **B**. Bitemporal modeling stores both dimensions independently to enable historical, audit, and bitemporal queries. The other options misstate the concept.

    **Concept Tested:** Bitemporal Modeling

---

#### 3. Which Slowly Changing Dimension type applies to an entity property whose history must be preserved (so historical queries return the value that was correct at a past point in time)?

<div class="upper-alpha" markdown>
1. Type 0 (no changes allowed)
2. Type 1 (overwrite the old value)
3. Type 2 (create a new record with the new value and mark the old record as expired)
4. Type 7 (delete the property entirely)
</div>

??? question "Show Answer"
    The correct answer is **C**. Type 2 SCD preserves history by appending new versions and marking old ones expired — exactly what the chapter prescribes for time-varying properties in a context graph. Type 1 (B) overwrites and loses history. Type 0 (A) and Type 7 (D) are not the appropriate patterns described.

    **Concept Tested:** Slowly Changing Dimension

---

#### 4. A team designs a context graph and is choosing which six indexes to create for production performance. Which set matches the chapter's recommended baseline?

<div class="upper-alpha" markdown>
1. A single full-graph scan index
2. Only a vector embedding index
3. Node ID hash index, decision-type index, temporal range index on decision and validity timestamps, entity reference index on APPLIES_TO targets, full-text index on context summaries, and a vector embedding ANN index
4. Only a B-tree index on the actor name property
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter lists exactly these six indexes as the standard baseline for sub-200ms retrieval latency. The other options omit critical indexes.

    **Concept Tested:** Context Graph Index Design

---

#### 5. A compliance query asks "What was this customer's credit tier on June 15th 2024, according to what the system knew on June 15th 2024?" The credit-tier change effective June 1st was not actually recorded in the system until July 15th. What answer does the bitemporal query return, and why?

<div class="upper-alpha" markdown>
1. Tier 1, because the change is dated June 1st in valid time
2. An error, because bitemporal queries cannot mix the two dimensions
3. Tier 2, because on June 15th the system had not yet recorded the upgrade (transaction time of the Tier 1 record is July 15th) — the query reflects what the system "knew" at the time
4. Both tiers simultaneously
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter's worked example is exactly this scenario: filtering on both dimensions returns Tier 2 because the new value had not yet been ingested when the system was queried. This is the distinction that makes bitemporal modeling essential for compliance.

    **Concept Tested:** Bitemporal Query

---

#### 6. Why does the chapter prescribe write-time constraint enforcement instead of post-hoc validation?

<div class="upper-alpha" markdown>
1. Because graph databases cannot run validation queries after writes
2. Because catching invalid traces at write time (with structured error responses) is far cheaper than discovering missing required edges, duplicate IDs, or overlapping valid-time ranges during retrieval — when downstream consumers may already have acted on bad data
3. Because constraints are forbidden by ISO 11179
4. Because every constraint must be checked by the LLM
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter is explicit on the cost asymmetry: write-time enforcement prevents downstream consumers from depending on broken data. The other options misstate constraints or their enforcement.

    **Concept Tested:** Graph Constraint Enforcement

---

#### 7. The chapter warns: "Never rename a node label or edge type in a production graph." What is the safer pattern it prescribes?

<div class="upper-alpha" markdown>
1. Stop all writes for 24 hours, rename, then restart
2. Delete the affected node type and re-import the data from a backup
3. Keep the old label alongside the new one during a transition, update all writers and readers to use the new label, verify with the test pattern, then remove the old labels during a planned maintenance window
4. Rename it directly because graph databases handle it transparently
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter's exact recommendation is a dual-label transition followed by a scheduled removal. The other options are risky or factually wrong.

    **Concept Tested:** Graph Schema Evolution

---

#### 8. A context graph team is deciding whether to store an actor's name as a property on every decision trace node or to extract actor information into a separate Actor node with edges. Which design does the chapter recommend, and why?

<div class="upper-alpha" markdown>
1. Store as a property on every trace, because edges are expensive
2. Extract as a separate linked Actor node, because actors participate in many decisions, the actor has its own properties (role-at-time, type, canonical ID), and this avoids duplicating actor data across thousands of decision traces
3. Store the name twice for redundancy
4. Skip storing the actor altogether
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter prescribes extracting actors as linked nodes when they participate in many records and have their own properties — the standard normalized context graph design. The other options either duplicate data or lose information.

    **Concept Tested:** Property Normalization

---

#### 9. A subgraph has been extracted around a customer's pricing exception decision for LLM context assembly. Which serialization format does the chapter recommend for the LLM context window, and why?

<div class="upper-alpha" markdown>
1. Raw graph-format JSON, because JSON is more compact than prose
2. Compressed binary GraphSON, because it minimizes tokens
3. A structured natural-language (prose) format with consistent fields per decision trace, because LLMs have been trained extensively on structured prose and reason better over it than over raw graph JSON
4. SPARQL query results
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter is explicit: structured prose matches the model's training distribution and outperforms raw JSON for reasoning. The other options ignore this distinction.

    **Concept Tested:** Subgraph Extraction

---

#### 10. A retail finance team wants the context graph to be updated within seconds of operational changes rather than from nightly batch pipelines. Which architectural pattern does the chapter recommend?

<div class="upper-alpha" markdown>
1. Add more batch jobs running every five minutes
2. Drop all indexes so writes complete faster
3. Disable temporal versioning to simplify the schema
4. Event-driven graph update — subscribe to event streams (event sourcing, change data capture) from operational systems and apply graph mutations as events arrive, so changes are visible to the next retrieval within milliseconds
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter prescribes event-driven graph update built on event-sourcing and CDC techniques from Chapter 7. The other options either reduce performance (B), add latency (A), or remove a critical feature (C).

    **Concept Tested:** Event-Driven Graph Update

---
