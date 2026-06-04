# Quiz: Security, Privacy, and Vector Search

Test your understanding of the graph security model, row-level security, attribute-based access control, zero-trust architecture, federated learning, model audit trails, vector databases, HNSW, product quantization, embedding models, dense retrieval, and the context-graph ROI model.

---

#### 1. The chapter defines the Graph Security Model as having four pillars. Which set names them correctly?

<div class="upper-alpha" markdown>
1. Authentication, authorization, data classification, and audit logging
2. Encryption, hashing, signing, and salting
3. Read, write, update, delete
4. Firewall, IDS, IPS, VPN
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter names these four components explicitly. The other options are unrelated security or system concepts.

    **Concept Tested:** Graph Security Model

---

#### 2. Row-level security in a graph offers three modes when a traversal would reach a restricted node. Which set names them and matches the chapter's described trade-offs?

<div class="upper-alpha" markdown>
1. Block the traversal (most secure, can break query logic), redacted result (placeholder reveals node exists but content hidden), and return no result (most restrictive — hides node existence but can produce misleading semantics)
2. Allow all, deny all, prompt user
3. Read, write, execute
4. Encrypt, decrypt, sign
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter names exactly these three modes with the trade-offs the question describes. The other options are unrelated.

    **Concept Tested:** Row-Level Security in Graph

---

#### 3. Attribute-based access control evaluates which four categories of attributes when making an access decision?

<div class="upper-alpha" markdown>
1. Cost, latency, bandwidth, throughput
2. Subject (user) attributes, resource (graph node/edge) attributes, action (read/write/traverse) attributes, and environment (time, network, device posture) attributes
3. Source IP, destination IP, port, protocol
4. Color, size, shape, weight
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter names exactly these four categories that make ABAC more expressive than role-based access control. The other options are unrelated.

    **Concept Tested:** Attribute-Based Access Control

---

#### 4. In a zero-trust graph architecture, why does the chapter recommend that AI agents be granted only the minimum permissions required for their task — even narrower than the human user who deployed them?

<div class="upper-alpha" markdown>
1. Because least-privilege agent permissions limit the blast radius if an agent is compromised or manipulated by a prompt injection — a financial-exception analysis agent should not be able to read HR decision traces even when the deploying human has access to both
2. Because LLMs cannot handle large permission sets
3. Because regulators always require zero-permission agents
4. Because agents bill by the permission
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter argues exactly this least-privilege rationale for agents. The other options misstate the reason.

    **Concept Tested:** Zero-Trust Graph Architecture

---

#### 5. A multinational deploying a context graph across the EU and Asia must respect data residency laws that prohibit centralizing decision traces. Which technique does the chapter recommend for training a shared retrieval model without violating residency requirements?

<div class="upper-alpha" markdown>
1. Federated learning — each participating data source trains a local model on local data and shares only model parameters (not raw data) with a central aggregator, so a unified model benefits from all data without any participant's data leaving its jurisdiction
2. Manually copy data to a third country and train there
3. Skip model training entirely
4. Centralize the data despite the law
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter prescribes federated learning specifically for cross-jurisdiction training. The other options violate the law or abandon the model.

    **Concept Tested:** Federated Learning

---

#### 6. A compliance officer needs to reconstruct exactly which model version served a specific decision on a specific date. Which component of the AI architecture supplies this evidence?

<div class="upper-alpha" markdown>
1. The HNSW index parameters
2. The vector database
3. The differential privacy budget
4. The model audit trail — training data provenance, evaluation metrics, model versioning (identified by cryptographic hash), and approval records — together let auditors reconstruct exactly which model was serving on a given date and how it was approved
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter prescribes the model audit trail as the source of this evidence. The other options serve different purposes.

    **Concept Tested:** Model Audit Trail

---

#### 7. Why does the chapter argue that exact nearest neighbor search is impractical for production context graph retrieval, motivating algorithms like HNSW?

<div class="upper-alpha" markdown>
1. Because exact NN search requires comparing the query vector to every stored vector — scaling linearly with collection size. For ten million 768-dimensional embeddings this is roughly 15 billion floating-point multiplications per query, which takes seconds at modern hardware speeds and is too slow for interactive decision support
2. Because exact NN search is forbidden by GDPR
3. Because LLMs cannot read exact NN results
4. Because exact NN search returns the wrong answers
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter computes exactly this cost to motivate ANN algorithms. The other options misstate the rationale.

    **Concept Tested:** Approximate Nearest Neighbor

---

#### 8. Product quantization reduces embedding memory consumption by 24-48x. Which production pattern does the chapter prescribe to manage the small accuracy loss it introduces?

<div class="upper-alpha" markdown>
1. Abandon product quantization entirely
2. Use PQ for candidate retrieval (fetch more candidates than needed at low cost), then re-rank the candidates using the original full-precision embeddings (at higher cost but on a much smaller set) — the standard two-stage production pattern
3. Train a completely new model from scratch
4. Increase the embedding dimensionality
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter prescribes the two-stage PQ-then-rerank pattern. The other options either give up the memory savings (A) or ignore the issue (C, D).

    **Concept Tested:** Product Quantization

---

#### 9. The chapter argues that domain-adapted sentence transformers outperform general-purpose embedding models for context graph retrieval. What positive feedback loop does this create?

<div class="upper-alpha" markdown>
1. There is no feedback loop
2. Adoption of the system reduces its training data
3. Users marking retrieved decision traces as "very relevant" or "not relevant" provide positive/negative pairs that can fine-tune the sentence transformer — so the more the system is used, the more feedback is collected, and the better the embedding model becomes over time
4. The embedding model is replaced weekly
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter describes this virtuous cycle explicitly. The other options ignore or invert the cycle.

    **Concept Tested:** Sentence Transformers

---

#### 10. A startup is presenting a context graph ROI model to skeptical executives. According to the chapter, what is the most common footgun to avoid?

<div class="upper-alpha" markdown>
1. Quoting too low a price
2. Double-counting — attributing the same time savings to both decision speed improvement and compliance cost reduction, or crediting the context graph for benefits actually produced by concurrent investments (a CRM upgrade, a new hire, a process change); an ROI model with double-counted benefits fails scrutiny when a skeptical stakeholder asks to walk through the methodology
3. Using too many decimal places
4. Reporting in the wrong currency
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter calls double-counting the most common ROI footgun and prescribes mapping each benefit to a distinct, separately-measurable metric. The other options are presentation details, not the structural failure mode the chapter warns about.

    **Concept Tested:** Context Graph ROI Model

---
