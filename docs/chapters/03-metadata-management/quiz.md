# Quiz: Metadata Management and Data Governance

Test your understanding of the metadata types, quality dimensions, stewardship roles, and protective techniques that make enterprise data trustworthy for AI systems.

---

#### 1. What is metadata?

<div class="upper-alpha" markdown>
1. The actual values stored inside a database column
2. The encryption key used to protect a sensitive dataset
3. Structured information that describes other data — its meaning, origin, quality, ownership, and permissible uses
4. A compressed serialization format for transporting graph data
</div>

??? question "Show Answer"
    The correct answer is **C**. Metadata is the structured information *about* other data. It captures meaning, origin, quality, ownership, and how the data may be used. Option A confuses data with metadata. Option B describes a security artifact, not metadata. Option D describes a serialization format. Only C matches the chapter's definition.

    **Concept Tested:** Metadata

---

#### 2. Which type of metadata answers the question "what does this field mean in business terms, and who owns it?"

<div class="upper-alpha" markdown>
1. Technical metadata
2. Business metadata
3. Operational metadata
4. Anonymized metadata
</div>

??? question "Show Answer"
    The correct answer is **B**. Business metadata captures semantic meaning, ownership, permissible values, and business-concept relationships. Technical metadata (A) describes physical structure such as data types and indexes. Operational metadata (C) records dynamic state like freshness and usage. "Anonymized metadata" (D) is not a category defined in this chapter.

    **Concept Tested:** Business Metadata

---

#### 3. Which data quality dimension measures whether the same fact is represented the same way across all systems that store it?

<div class="upper-alpha" markdown>
1. Data completeness
2. Data accuracy
3. Data consistency
4. Data timeliness
</div>

??? question "Show Answer"
    The correct answer is **C**. Data consistency asks whether the same fact appears identically across every system holding it — for example, whether the CRM and billing system agree on a contract start date. Completeness (A) is about presence of values. Accuracy (B) is about correctness against real-world truth. Timeliness (D) is about freshness. Only consistency is about cross-system agreement.

    **Concept Tested:** Data Consistency

---

#### 4. In a data governance model, what is the role of a data steward?

<div class="upper-alpha" markdown>
1. The executive who is ultimately accountable for what a dataset means
2. The cross-functional body that sets enterprise-wide data policy
3. The upstream system that generates the data records
4. The person who does the hands-on work of maintaining metadata quality — reviewing definitions, investigating quality alerts, coordinating with producers
</div>

??? question "Show Answer"
    The correct answer is **D**. The data steward performs the day-to-day operational work of maintaining metadata. Option A describes the data owner. Option B describes the governance board. Option C describes the data producer. Stewardship and ownership are complementary: the owner sets policy, the steward executes it.

    **Concept Tested:** Data Stewardship

---

#### 5. What is the main difference between passive metadata cataloging and active metadata management?

<div class="upper-alpha" markdown>
1. Passive cataloging continuously monitors data infrastructure; active management is a one-time documentation project
2. Passive cataloging collects metadata once and relies on humans to update it, while active management continuously monitors infrastructure and propagates changes automatically
3. Passive cataloging uses graph databases; active management uses relational databases
4. There is no functional difference between the two approaches
</div>

??? question "Show Answer"
    The correct answer is **B**. Passive cataloging treats metadata as a one-time documentation effort that humans maintain, leading to inevitable staleness. Active management uses continuous monitoring, automated discovery, and propagation. Option A reverses the two. Option C invents a database distinction. Option D ignores the substantial reliability gap that matters for AI systems consuming the metadata.

    **Concept Tested:** Active Metadata Management

---

#### 6. A customer dataset is classified as Restricted, but only two of its forty columns (salary, SSN) actually carry sensitive values. According to the chapter, what is the recommended approach?

<div class="upper-alpha" markdown>
1. Classify all forty columns as Restricted to be safe
2. Move the two sensitive columns to a separate physical table and leave the rest unclassified
3. Apply column-level tags so the sensitive columns are protected while legitimate consumers can still retrieve the other thirty-eight non-sensitive columns
4. Encrypt the entire table at rest and grant blanket access to all forty columns
</div>

??? question "Show Answer"
    The correct answer is **C**. Tagging at the column level is the recommended granularity — it enables column-level access control so sensitive fields remain protected without locking legitimate consumers out of the non-sensitive ones. Option A is the over-classification mistake the chapter warns against. Option B is disruptive and unnecessary. Option D defeats the purpose of classification entirely.

    **Concept Tested:** Metadata Tagging

---

#### 7. An LLM agent requests data from a sensitive dataset through a context-graph-mediated retrieval pipeline. What is the intended role of the context graph in this request?

<div class="upper-alpha" markdown>
1. To evaluate the agent's identity, the resource's classification, and the access control policy in a single traversal — returning only the authorized subset (or rejecting the request)
2. To encrypt the data before it leaves the agent's machine
3. To rewrite the agent's query into Cypher syntax automatically
4. To replace the underlying database with a vector index
</div>

??? question "Show Answer"
    The correct answer is **A**. The context graph serves as a policy enforcement point: it evaluates identity, classification, and access policy together in one traversal and either returns the authorized subset or rejects the request. Option B describes encryption, which is a different layer. Option C describes a query-translation utility. Option D misstates what a context graph does.

    **Concept Tested:** Access Control

---

#### 8. A data analyst needs to find purchasing patterns from a customer table but does not need to see individual names or phone numbers. Which technique replaces sensitive values with structurally-preserving substitutes (such as `XXX-XXX-1234`) while remaining reversible for privileged processes?

<div class="upper-alpha" markdown>
1. Data anonymization
2. Differential privacy
3. Access control
4. Data masking
</div>

??? question "Show Answer"
    The correct answer is **D**. Data masking replaces sensitive values with substitutes that preserve structural properties and is typically reversible. Anonymization (A) is stronger and intended to be irreversible. Differential privacy (B) protects aggregates by adding noise, not individual values. Access control (C) governs *who* can see data, not how values are transformed.

    **Concept Tested:** Data Masking

---

#### 9. Why is differential privacy useful even when an attacker has access only to aggregate query results?

<div class="upper-alpha" markdown>
1. It encrypts the database files at rest so attackers cannot read them
2. It prevents the database from returning more than ten rows per query
3. It adds carefully calibrated random noise so that an attacker cannot infer any individual's data, even if they already know almost everyone else's
4. It removes all personally identifiable columns from query results
</div>

??? question "Show Answer"
    The correct answer is **C**. Differential privacy adds noise calibrated by the epsilon privacy budget so the output distribution changes only slightly when any individual is added or removed. This blocks the algebraic-subtraction attack on aggregates. Encryption (A) is unrelated. Row limits (B) do not prevent inference attacks. Stripping PII columns (D) does not protect against re-identification via aggregates.

    **Concept Tested:** Differential Privacy

---

#### 10. Which statement best describes the relationship between a data governance framework and a context graph used to ground LLM retrieval?

<div class="upper-alpha" markdown>
1. The context graph replaces the governance framework — once a graph exists, governance is no longer needed
2. The governance framework populates the context graph with accurate, current metadata; the context graph is the runtime infrastructure that lets LLMs ask and answer governance questions
3. The governance framework only applies to data warehouses; context graphs only apply to vector stores
4. They are unrelated — governance is an organizational concern, while context graphs are purely a technical optimization
</div>

??? question "Show Answer"
    The correct answer is **B**. The governance framework supplies the policies, roles, and processes that populate the context graph; the context graph is the runtime substrate that lets LLMs evaluate ownership, classification, freshness, and quality at retrieval time. Option A inverts the dependency. Option C arbitrarily restricts both. Option D ignores the chapter's central argument that they are tightly coupled.

    **Concept Tested:** Data Governance Framework

---
