# Quiz: Process Mining, Data Lineage, and Provenance

Test your understanding of event logs, process discovery and conformance checking, column-level lineage, OpenLineage, event sourcing, CDC, and the difference between lineage and provenance.

---

#### 1. Which three fields must appear in every event record for an event log to be useful for process mining?

<div class="upper-alpha" markdown>
1. Case ID, Activity, and Timestamp
2. Username, Password, and Session token
3. Source IP, Destination IP, and Port
4. Schema version, Encoding, and Compression
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter is explicit: case ID identifies the process instance, activity identifies what happened, and timestamp records when. Without all three, the log cannot be used to reconstruct process flow. The other options describe security or transport fields that are not process-mining requirements.

    **Concept Tested:** Event Log

---

#### 2. What does process discovery produce as output?

<div class="upper-alpha" markdown>
1. A list of users sorted by activity frequency
2. A process model — for example a directly-follows graph — derived from event log data, showing the activities that actually occurred and the transitions between them
3. A SQL query plan for the underlying database
4. An anonymized version of the event log
</div>

??? question "Show Answer"
    The correct answer is **B**. Process discovery infers a process model (often a directly-follows graph or Petri net) from event logs, showing the empirical sequence of activities. User-frequency reports (A), query plans (C), and anonymization (D) are unrelated outputs.

    **Concept Tested:** Process Discovery

---

#### 3. What does conformance checking compare?

<div class="upper-alpha" markdown>
1. Two different database schemas to find matching columns
2. The graph schema against a SKOS thesaurus
3. An actual event log against a reference process model, identifying deviations such as skipped steps, reversed steps, or unauthorized activities
4. The current data lake size against last quarter's size
</div>

??? question "Show Answer"
    The correct answer is **C**. Conformance checking compares the empirical event log against the intended reference process model and surfaces the deviations. Option A describes schema matching. Option B is unrelated. Option D is capacity monitoring.

    **Concept Tested:** Conformance Checking

---

#### 4. Why is column-level lineage more difficult to capture than table-level lineage?

<div class="upper-alpha" markdown>
1. Column-level lineage requires parsing the SQL or transformation logic at each pipeline step to identify which input columns feed which output columns, often through complex dataflow analysis
2. Column-level lineage requires a quantum database
3. Column-level lineage is forbidden under most data classification policies
4. Column-level lineage cannot be visualized
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter explains that column-level lineage demands SQL/dataflow parsing at each step to map input columns to output columns. The other options are not real limitations.

    **Concept Tested:** Column-Level Lineage

---

#### 5. A revenue figure in a quarterly report is suspected to be wrong. The investigator needs to trace it back through aggregations and ETL steps to the original source records. Which technique does this directly?

<div class="upper-alpha" markdown>
1. Conformance checking
2. Downstream lineage
3. Upstream lineage
4. Change data capture
</div>

??? question "Show Answer"
    The correct answer is **C**. Upstream lineage traces a data value backward from its current location to its original source through every transformation. Downstream lineage (B) runs the opposite direction. Conformance checking (A) is about process flow, not data flow. CDC (D) is a capture mechanism, not a tracing technique.

    **Concept Tested:** Upstream Lineage

---

#### 6. How does the chapter distinguish data lineage from data provenance?

<div class="upper-alpha" markdown>
1. Lineage and provenance are synonyms
2. Lineage applies only to structured data; provenance applies only to unstructured data
3. Lineage answers where data came from (structural pipeline query); provenance answers whether it can be trusted and who is accountable (custody chain and transformation history)
4. Lineage is a graph; provenance is a relational table
</div>

??? question "Show Answer"
    The correct answer is **C**. Lineage is about structural origin (the pipeline path); provenance is about trust, custody chain, and accountability. They are complementary but distinct. The other options misstate the relationship.

    **Concept Tested:** Lineage vs Provenance

---

#### 7. A team wants their pipeline tool's lineage output to be readable by their lineage catalog from a different vendor without writing custom integration code. Which standard supports this interoperability?

<div class="upper-alpha" markdown>
1. ISO 11179
2. IEEE XES
3. SKOS
4. The OpenLineage Standard
</div>

??? question "Show Answer"
    The correct answer is **D**. OpenLineage is the open specification for portable lineage events — a JSON event model so that tools implementing the spec can interoperate. ISO 11179 (A) is metadata-registry, IEEE XES (B) is event-log format, SKOS (C) is a vocabulary standard. Only OpenLineage targets lineage interoperability.

    **Concept Tested:** OpenLineage Standard

---

#### 8. A retail team is designing a new order-processing system and wants a built-in, tamper-evident audit trail. They are evaluating event sourcing. Which property does event sourcing give them by design?

<div class="upper-alpha" markdown>
1. Every change is stored as an immutable event in an append-only log, so the current state can be reconstructed by replay and no past event can be silently altered
2. Automatic compression of all event payloads
3. Forward chaining inference over an ontology
4. Bypass of any compliance review for state changes
</div>

??? question "Show Answer"
    The correct answer is **A**. Event sourcing stores every state change as an immutable append-only event, giving replayable state reconstruction and tamper-evident history — exactly the audit trail described. Compression (B), inference (C), and compliance bypass (D) are not properties of event sourcing.

    **Concept Tested:** Event Sourcing

---

#### 9. A legacy relational database was not designed with event sourcing in mind, but the team needs real-time lineage events flowing into the context graph. Which technique observes the database transaction log to publish row-level changes as a downstream event stream?

<div class="upper-alpha" markdown>
1. Process enhancement
2. Change data capture
3. Schema matching
4. CQRS
</div>

??? question "Show Answer"
    The correct answer is **B**. Change data capture (CDC) monitors the database transaction log and publishes inserts, updates, and deletes as events — perfect for retrofitting real-time event flow onto a legacy database. Process enhancement (A) is process mining. Schema matching (C) is metadata alignment. CQRS (D) is an architectural pattern but is not the transaction-log observation technique itself.

    **Concept Tested:** Change Data Capture

---

#### 10. A compliance officer asks "Which version of the pricing policy was in effect when this order was placed last year?" Which context graph capability is most directly required to answer this temporal question?

<div class="upper-alpha" markdown>
1. Temporal versioning — `valid_from` and `valid_to` timestamps on graph nodes and edges that let queries reconstruct state at any past point in time
2. Differential privacy
3. Knowledge graph embedding training
4. Graph sharding by department
</div>

??? question "Show Answer"
    The correct answer is **A**. Temporal versioning is exactly the capability the chapter describes for point-in-time queries: validity ranges on nodes and edges let queries return the state of the graph as it was on any past date. The other options solve unrelated problems.

    **Concept Tested:** Temporal Versioning

---
