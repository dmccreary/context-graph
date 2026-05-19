---
title: "Chapter 22: Security, Privacy, and Vector Search"
description: "How to secure context graph deployments with fine-grained access control and zero-trust architecture, and how to maximize retrieval quality with vector search and dense retrieval techniques"
generated_by: claude skill chapter-content-generator
date: 2026-05-18 00:00:00
version: 0.08
---

# Chapter 22: Security, Privacy, and Vector Search

!!! mascot-welcome "Welcome to Chapter 22!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus welcoming">
    This final chapter closes the loop on two interwoven concerns that run through every chapter of this book. Security: context graphs hold the most sensitive organizational knowledge — who decided what, why, and using which policies — and protecting that knowledge requires a security model that goes beyond simple database authentication. Vector search: the retrieval techniques that make context graph outputs relevant and accurate require understanding how embedding models, approximate nearest neighbor indexes, and dense retrieval interact with graph traversal. Nexus has saved the best tools for last. Let's trace the security boundary and the similarity space.

## Why Context Graph Security Is Different

A context graph is not a typical enterprise database. Traditional enterprise databases hold facts: customer records, transaction amounts, inventory quantities. Access control for these systems is straightforward — a user in the finance department can read finance records, a user in the sales department can read sales records.

A context graph holds decisions: why a customer received a specific discount, why a transaction was flagged for review, why an inventory threshold was set at a non-standard level. Decision data is categorically more sensitive than fact data because it reveals organizational reasoning, policy interpretation, and individual judgment — information that can expose legal liability, competitive strategy, and internal disagreements.

This sensitivity creates security requirements that go beyond role-based access control. An analyst in the finance department should be able to query decision traces from their team's workflows — but should they be able to query the decision traces from the legal team's policy interpretations? Should a contractor be able to query historical decisions made by employees at a higher clearance level? Should an AI agent be able to retrieve context from a decision trace that the system was not explicitly granted access to by the human who initiated the query?

The **Graph Security Model** for context graphs must answer these questions structurally — through access control mechanisms that enforce the right answers automatically, not through training and policy that rely on humans to make the right calls manually.

## Graph Security Model

The **Graph Security Model** defines the access control architecture that governs which users and systems can read, write, and traverse which nodes and edges in the context graph. A complete graph security model has four components.

**Authentication.** The mechanism by which the identity of a user or system making a graph query is verified. Enterprise context graphs should integrate with the organization's existing identity provider (SAML, OIDC) so that authentication is consistent with the rest of the organization's access control infrastructure. Every query to the context graph should be associated with an authenticated identity.

**Authorization.** The mechanism by which the authenticated identity's permissions are evaluated against the requested operation. Authorization for graph systems is more complex than for tabular systems because graph traversal can take a query through nodes and edges that span multiple access control domains — a query that starts in the sales domain and traverses a "governed by" edge can reach policy nodes that live in the legal domain.

**Data classification.** The assignment of sensitivity labels to graph nodes and edges that determine which access control rules apply. A decision trace that contains attorney-client privileged information should be classified at a higher sensitivity level than a routine procurement approval. Data classification enables the authorization layer to apply the correct rules without requiring access control logic to be embedded in every query.

**Audit logging.** The recording of every query, traversal, and data access in an immutable audit log that supports forensic analysis and compliance reporting. Audit logging for graph systems must record not just the query but the subgraph that was returned — so that in the event of a data exposure incident, investigators can determine exactly which information was accessed and by whom.

## Row-Level Security in Graphs

**Row-Level Security in Graph** is the mechanism that restricts which graph nodes and edges a given user can read, even when they have general read access to the graph database. Without row-level security, any authenticated user with database read access can see all nodes and edges — including those they should not have access to based on their role or clearance level.

Graph row-level security is more complex to implement than row-level security in relational databases because the unit of access control is not a row (a flat record) but a node or edge in a connected structure. When a user traverses from a node they have access to, along an edge they have access to, to a node they do not have access to, the security model must either block the traversal, return a redacted result (indicating the node exists but its content is not visible), or return no result (indicating the node does not exist from the user's perspective).

Each of these three approaches has different security implications:

**Block the traversal** — stops the query at the access boundary and returns an error. This is the most secure approach but can break query logic that assumes the graph is fully connected.

**Redacted result** — returns a placeholder node indicating that a node exists but its content is restricted. This leaks the existence of the restricted node (which may itself be sensitive) but allows the query to continue and retrieve non-restricted nodes.

**Return no result** — behaves as if the restricted node does not exist. This is the most restrictive approach and prevents leaking the existence of restricted nodes, but it can produce misleading query results when the absence of the hidden node changes the semantics of the result.

Enterprise context graph deployments typically use a combination: redacted results for nodes whose existence is not sensitive (a decision trace exists, but its content is restricted), and no result for nodes whose existence itself is sensitive (the existence of certain legal proceedings or HR investigations).

## Attribute-Based Access Control

**Attribute-Based Access Control** (ABAC) is an access control model that evaluates access decisions based on attributes of the requesting subject (user), the resource being requested (graph node or edge), the action being performed (read, write, traverse), and the environmental context (time of day, network location, device security posture). ABAC is more expressive than role-based access control (RBAC) because it allows access decisions to incorporate any combination of these attributes rather than relying solely on the user's role.

For context graph deployments, ABAC enables access control rules like:

- "A user may query decision traces in workflow W if their department attribute matches the decision's department attribute AND their clearance level attribute is at least as high as the decision's classification attribute."
- "A contractor may query decision traces from the last 90 days but not from before their engagement start date."
- "A cross-functional AI agent may query decision traces across departments only when the query was initiated by a user who has access to all the departments queried."

These rules cannot be expressed as simple role memberships. They require an evaluation engine that can access and compare attributes from multiple sources (the user directory, the graph node metadata, the query context) at query time.

The attribute evaluation is the performance-critical path in ABAC-protected context graphs: every graph traversal step requires an attribute evaluation to determine whether the traversal is permitted. Caching evaluated attribute results (invalidated when the user's attributes or the node's classification changes) is essential for maintaining query performance under ABAC.

<details markdown="1">
<summary>#### Diagram: Attribute-Based Access Control in Context Graphs</summary>

**Sim Spec:**

- Type: vis-network diagram
- sim-id: abac-context-graph
- Library: vis-network
- Status: not started
- Bloom Level: Analysis
- Bloom Verb: analyze
- Learning Objective: Analyze how ABAC evaluates subject, resource, action, and environment attributes to make fine-grained access control decisions in a context graph
- Instructional Rationale: A decision-flow diagram makes the multi-attribute evaluation process concrete, helping learners understand how ABAC policies translate into query-time enforcement

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>ABAC in Context Graphs</title>
<script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
<style>
  body { margin: 0; background: #0d1117; color: #e6edf3; font-family: sans-serif; }
  #network { width: 100%; height: 520px; border: 1px solid #30363d; }
</style>
</head>
<body>
<div id="network"></div>
<script>
const nodes = new vis.DataSet([
  { id: 1, label: "Graph Query\nRequest", color: { background: "#8250df", border: "#d2a8ff" }, font: { color: "#e6edf3" }, shape: "box", x: 0, y: -200, fixed: true },
  { id: 2, label: "Subject\nAttributes\n(User role,\ndepartment,\nclearance)", color: { background: "#1f6feb", border: "#58a6ff" }, font: { color: "#e6edf3" }, shape: "box", x: -280, y: 0, fixed: true },
  { id: 3, label: "Resource\nAttributes\n(Node class,\nowner dept,\nsensitivity)", color: { background: "#1f6feb", border: "#58a6ff" }, font: { color: "#e6edf3" }, shape: "box", x: -90, y: 0, fixed: true },
  { id: 4, label: "Action\nAttributes\n(Read / write /\ntraverse)", color: { background: "#1f6feb", border: "#58a6ff" }, font: { color: "#e6edf3" }, shape: "box", x: 90, y: 0, fixed: true },
  { id: 5, label: "Environment\nAttributes\n(Time, network,\ndevice posture)", color: { background: "#1f6feb", border: "#58a6ff" }, font: { color: "#e6edf3" }, shape: "box", x: 280, y: 0, fixed: true },
  { id: 6, label: "ABAC Policy\nEngine", color: { background: "#312d00", border: "#d29922" }, font: { color: "#e6edf3", size: 15 }, shape: "box", x: 0, y: 120, fixed: true },
  { id: 7, label: "PERMIT\nFull result", color: { background: "#1a4321", border: "#3fb950" }, font: { color: "#e6edf3" }, shape: "box", x: -200, y: 260, fixed: true },
  { id: 8, label: "REDACT\nNode exists,\ncontent hidden", color: { background: "#312d00", border: "#d29922" }, font: { color: "#e6edf3" }, shape: "box", x: 0, y: 260, fixed: true },
  { id: 9, label: "DENY\nNo result", color: { background: "#3d0d0d", border: "#f85149" }, font: { color: "#e6edf3" }, shape: "box", x: 200, y: 260, fixed: true },
  { id: 10, label: "Audit Log\n(Who queried what\nand when)", color: { background: "#0d1117", border: "#30363d" }, font: { color: "#8b949e" }, shape: "box", x: 400, y: 180, fixed: true },
]);
const edges = new vis.DataSet([
  { from: 1, to: 2, arrows: "to" },
  { from: 1, to: 3, arrows: "to" },
  { from: 1, to: 4, arrows: "to" },
  { from: 1, to: 5, arrows: "to" },
  { from: 2, to: 6, arrows: "to" },
  { from: 3, to: 6, arrows: "to" },
  { from: 4, to: 6, arrows: "to" },
  { from: 5, to: 6, arrows: "to" },
  { from: 6, to: 7, arrows: "to", color: "#3fb950" },
  { from: 6, to: 8, arrows: "to", color: "#d29922" },
  { from: 6, to: 9, arrows: "to", color: "#f85149" },
  { from: 6, to: 10, arrows: "to", dashes: true, label: "always\nlogs" },
]);
const container = document.getElementById("network");
new vis.Network(container, { nodes, edges }, {
  physics: false,
  interaction: { dragNodes: false },
  edges: { smooth: { type: "curvedCW", roundness: 0.2 }, font: { size: 11, color: "#8b949e" } }
});
</script>
</body>
</html>
```
</details>

## Zero-Trust Graph Architecture

**Zero-Trust Graph Architecture** applies the zero-trust security principle — "never trust, always verify" — to every layer of the context graph system. In a traditional perimeter security model, resources inside the network boundary are implicitly trusted. Zero-trust eliminates the implicit trust boundary: every request to the context graph must be authenticated, authorized, and validated regardless of where it originates.

For context graph deployments, zero-trust architecture has several specific implications.

**No implicit service-to-service trust.** When an AI agent's inference service makes a query to the context graph, that query must be authenticated as coming from the specific agent instance, authorized against the agent's permissions (which may be narrower than the permissions of the human user who initiated the agent), and validated for consistency with the query pattern the agent is expected to produce. An AI agent that is compromised or manipulated by a prompt injection attack should not be able to access context graph data that the initiating human would have been permitted to see.

**Cryptographic verification of data provenance.** In a zero-trust context graph, decision trace data carries a cryptographic signature from the system that wrote it. When a retrieval query returns a decision trace, the system can verify that the trace has not been tampered with since it was written — a property that is critical for regulated contexts where the integrity of the decision record must be demonstrable.

**Continuous authorization re-evaluation.** In a traditional system, authorization is evaluated at session start and then assumed to be valid for the duration of the session. In a zero-trust context graph, authorization is re-evaluated at each significant operation — each traversal hop, each data access, each write operation. If a user's role changes mid-session, or if environmental conditions change (they move to an untrusted network), their access is immediately restricted without waiting for the session to end.

**Least-privilege AI agent permissions.** AI agents that query the context graph should be granted only the minimum permissions required to complete their assigned task. An agent that is analyzing financial exception patterns should not have access to HR decision traces, even if the human user who deployed the agent has access to both. Least-privilege agent permissions limit the blast radius if an agent is compromised.

## Federated Learning

**Federated Learning** is a machine learning approach that trains models across multiple data sources without centralizing the data. Each participating data source trains a local model on its local data and shares only model parameters (not raw data) with a central aggregator. The aggregator combines the local model parameters into a global model that benefits from all the data without any participant's data leaving their system.

For context graph deployments in multi-organization or multi-jurisdiction settings, federated learning enables several capabilities that centralized training cannot:

**Cross-organization retrieval model training.** Multiple organizations deploying context graphs in the same domain can collaboratively train a shared retrieval model without sharing their raw decision traces. Each organization's decision traces remain within their security boundary; only the gradient updates from local training are shared. The resulting model learns from a much larger corpus than any single organization could provide while preserving data sovereignty.

**Privacy-preserving personalization.** Federated learning can train personalization models — models that adapt context graph retrieval to individual users' preferences — without centralizing user behavior data. Each user's device or workstation trains local preference models; only the model updates are shared with the central aggregator. Individual users' query patterns and retrieval preferences never leave their device.

**Jurisdiction-compliant cross-border model training.** When a context graph deployment spans multiple legal jurisdictions with conflicting data residency requirements (GDPR requiring EU data to stay in Europe, data localization laws requiring national data to stay in-country), federated learning allows a unified model to be trained without violating any jurisdiction's data residency requirement.

!!! mascot-tip "Nexus's Federated Learning Caution"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Nexus giving a tip">
    Federated learning is powerful but adds significant operational complexity. The federation protocol requires careful design to prevent information leakage through gradient updates (membership inference attacks can sometimes reconstruct training data from gradients). Use federated learning when data sovereignty requirements genuinely prohibit centralization; use centralized training with strong access controls when you have more flexibility, because the operational overhead is substantially lower.

## Model Audit Trail

A **Model Audit Trail** is a complete record of how an AI model was trained, what data was used, what evaluation metrics were produced, and what changes were made between versions. For context graph AI components — the retrieval model, the ranking model, the generative summarization model — a model audit trail is the mechanism that allows auditors and compliance officers to verify that AI-assisted decisions were made using models that were properly trained, evaluated, and approved.

A complete model audit trail for a context graph AI component includes:

**Training data provenance.** Which decision traces, in which version of the context graph, were used to train the model. This information allows auditors to verify that training data met the organization's data quality standards and was correctly classified and access-controlled.

**Evaluation metrics.** The quantitative performance measurements produced when the model was evaluated on a held-out test set: retrieval precision, recall, NDCG (Normalized Discounted Cumulative Gain), hallucination rate for generative components. Evaluation metrics must be produced by an evaluation pipeline that is independent from the training pipeline.

**Model versioning.** The specific model version (identified by a cryptographic hash of the model weights and configuration) that was deployed at each point in time. This allows auditors to reconstruct exactly which model was serving decisions on a given date — essential for post-hoc investigation of specific decisions.

**Approval records.** The record of who approved the model for production deployment, based on what evaluation results, and at what date. For regulated contexts, model deployment approvals may require sign-off from compliance officers, risk managers, or subject matter experts.

## Vector Databases

A **Vector Database** is a storage system specialized for efficiently storing and querying high-dimensional vector embeddings — numerical representations of text, images, or other data that capture semantic meaning. In the context of context graph retrieval, vector databases store embeddings of decision traces so that semantically similar decisions can be retrieved even when they do not share exact keyword matches.

Before examining the indexing and retrieval techniques, it is important to understand why vector databases are a necessary complement to graph databases rather than a replacement. Graph databases excel at structured traversal: "find all decisions that cite policy P and were made by approvers in department D." Vector databases excel at semantic similarity: "find decisions semantically similar to this query text." These are different operations that require different data structures and query algorithms. A complete context graph retrieval system uses both.

The vector database stores one embedding vector per decision trace (or per text segment of a decision trace). When a user or AI agent issues a query, the query text is converted to an embedding vector by the same embedding model used to embed the decision traces, and the vector database returns the decision traces whose embeddings are most similar to the query embedding. These candidate results are then filtered or re-ranked using graph traversal results from the graph database — the hybrid retrieval pattern described in Chapter 14.

## HNSW Index

**HNSW (Hierarchical Navigable Small World)** is the most widely used indexing algorithm for approximate nearest neighbor search in high-dimensional vector spaces. To understand why HNSW is necessary, it helps to first understand the problem it solves.

Finding the exact nearest neighbors of a query vector in a collection of millions of vectors requires comparing the query vector to every stored vector — an operation whose cost scales linearly with collection size. For a collection of ten million decision traces with 768-dimensional embeddings, an exact nearest neighbor search requires approximately 15 billion floating-point multiplications per query. At modern hardware speeds, this takes seconds per query — too slow for interactive decision support.

HNSW solves this by building a multi-layer navigable graph over the vector collection. The layers form a hierarchy: the top layer contains a small subset of vectors with long-range connections; each lower layer adds more vectors with shorter-range connections; the bottom layer contains all vectors. Navigating from the top layer to the bottom layer during a query is like navigating a map at progressively finer scales — you start with a coarse view that quickly identifies the general region of the closest vectors, then zoom in to find the exact nearest neighbors within that region.

The key parameters that govern HNSW performance are:

**M** — the number of connections each node maintains in the graph. Higher M increases search accuracy at the cost of more memory and slower index construction. Typical values range from 8 to 64.

**efConstruction** — the size of the candidate list during index construction. Higher values produce a higher-quality index at the cost of longer construction time. Typical values range from 100 to 400.

**ef** (search-time parameter) — the size of the candidate list during search. Higher values produce more accurate search results at the cost of longer search time. This parameter can be tuned at query time without rebuilding the index.

HNSW provides a tunable trade-off between search speed and search accuracy. For context graph retrieval, a practical operating point is an ef value that produces 95%+ recall (meaning 95% of the true nearest neighbors are returned) with a query latency under 50 milliseconds on a collection of one million vectors.

## Product Quantization

**Product Quantization** (PQ) is a compression technique for vector embeddings that reduces memory consumption by representing high-dimensional vectors as compact codes. A 768-dimensional float32 embedding requires 3,072 bytes of memory; the same embedding compressed with product quantization requires as little as 64-128 bytes, a 24-48x reduction.

Before describing how product quantization works, it is useful to understand why memory compression matters for context graph vector search. A collection of ten million 768-dimensional embeddings requires approximately 29 GB of memory in uncompressed form. If the entire collection must fit in RAM for efficient HNSW traversal, this requires expensive high-memory servers. Product quantization allows the same collection to fit in 1-2 GB of RAM, dramatically reducing infrastructure cost.

Product quantization works by dividing each embedding vector into subvectors (for a 768-dimensional vector, 96 subvectors of 8 dimensions each), learning a codebook for each subvector position (256 prototype vectors per position, learned from the training data using k-means clustering), and replacing each subvector with the index of its nearest prototype. The result is a compact code (one byte per subvector, 96 bytes total) that approximates the original embedding.

The approximation introduces some error — product quantized embeddings are less accurate than the original embeddings for nearest neighbor search. This error is managed by using product quantization for candidate retrieval (fetching more candidates than needed, at low cost) and then re-ranking the candidates using the original full-precision embeddings (at higher cost but on a much smaller set). This two-stage approach — PQ retrieval followed by re-ranking with full embeddings — is the standard production pattern.

## Approximate Nearest Neighbor Search

**Approximate Nearest Neighbor** (ANN) search is the general category of algorithms — of which HNSW is the most prominent example — that trade a small amount of recall accuracy for dramatic improvements in search speed. ANN algorithms are the foundation of practical large-scale vector search because exact nearest neighbor search is computationally intractable for the collection sizes and latency requirements of production context graph systems.

Several ANN algorithm families are used in practice:

**HNSW-based** — graph-based algorithms that build navigable small-world graphs over the vector collection. High recall at low latency, high memory usage. Best for collections where recall is critical and memory is available.

**LSH-based (Locality Sensitive Hashing)** — hashing-based algorithms that map similar vectors to the same hash buckets with high probability. Lower recall than HNSW but lower memory usage. Better for very large collections where memory is the binding constraint.

**IVF-based (Inverted File Index)** — clustering-based algorithms that partition the vector space into clusters and search only the most relevant clusters for a given query. Combined with product quantization (IVF-PQ), this produces very memory-efficient indexes with moderate recall. The standard approach for collections of hundreds of millions to billions of vectors.

For context graph deployments, the choice of ANN algorithm depends on collection size and latency requirements:

| Collection Size | Recommended Algorithm | Recall Target | Latency Target |
|---|---|---|---|
| < 1M vectors | HNSW | 99% | < 20ms |
| 1M – 100M vectors | HNSW or IVF-HNSW | 95-98% | < 50ms |
| 100M+ vectors | IVF-PQ | 90-95% | < 100ms |

The table summarizes algorithm choices based on the tradeoffs explained above — it reinforces the concepts rather than introducing them.

<details markdown="1">
<summary>#### Diagram: Vector Search Architecture for Context Graphs</summary>

**Sim Spec:**

- Type: vis-network diagram
- sim-id: vector-search-architecture
- Library: vis-network
- Status: not started
- Bloom Level: Application
- Bloom Verb: apply
- Learning Objective: Apply the two-stage retrieval pattern (ANN candidate retrieval + full-precision re-ranking) to a context graph query pipeline
- Instructional Rationale: A pipeline diagram connects abstract ANN concepts to concrete query execution steps, helping learners understand how the theoretical trade-offs translate into system design choices

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Vector Search Architecture</title>
<script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
<style>
  body { margin: 0; background: #0d1117; color: #e6edf3; font-family: sans-serif; }
  #network { width: 100%; height: 480px; border: 1px solid #30363d; }
</style>
</head>
<body>
<div id="network"></div>
<script>
const nodes = new vis.DataSet([
  { id: 1, label: "User Query\nText", color: { background: "#8250df", border: "#d2a8ff" }, font: { color: "#e6edf3" }, shape: "box", x: -480, y: 0, fixed: true },
  { id: 2, label: "Embedding\nModel", color: { background: "#1f6feb", border: "#58a6ff" }, font: { color: "#e6edf3" }, shape: "box", x: -300, y: 0, fixed: true },
  { id: 3, label: "Query\nVector", color: { background: "#312d00", border: "#d29922" }, font: { color: "#e6edf3" }, shape: "ellipse", x: -120, y: 0, fixed: true },
  { id: 4, label: "ANN Index\n(HNSW / IVF-PQ)", color: { background: "#1f6feb", border: "#58a6ff" }, font: { color: "#e6edf3" }, shape: "box", x: 60, y: -80, fixed: true },
  { id: 5, label: "Graph\nTraversal", color: { background: "#1f6feb", border: "#58a6ff" }, font: { color: "#e6edf3" }, shape: "box", x: 60, y: 80, fixed: true },
  { id: 6, label: "Candidates\n(top-100)", color: { background: "#312d00", border: "#d29922" }, font: { color: "#e6edf3" }, shape: "ellipse", x: 240, y: -80, fixed: true },
  { id: 7, label: "Graph\nResults", color: { background: "#312d00", border: "#d29922" }, font: { color: "#e6edf3" }, shape: "ellipse", x: 240, y: 80, fixed: true },
  { id: 8, label: "Cross-Encoder\nRe-ranker", color: { background: "#1f6feb", border: "#58a6ff" }, font: { color: "#e6edf3" }, shape: "box", x: 400, y: 0, fixed: true },
  { id: 9, label: "Top-5\nContext\nResults", color: { background: "#1a4321", border: "#3fb950" }, font: { color: "#e6edf3", size: 15 }, shape: "box", x: 560, y: 0, fixed: true },
  { id: 10, label: "Full-precision\nvectors for\ncandidates only", color: { background: "#0d1117", border: "#30363d" }, font: { color: "#8b949e", size: 11 }, shape: "text", x: 400, y: -160 },
]);
const edges = new vis.DataSet([
  { from: 1, to: 2, arrows: "to" },
  { from: 2, to: 3, arrows: "to", label: "768-dim\nvector" },
  { from: 3, to: 4, arrows: "to" },
  { from: 3, to: 5, arrows: "to" },
  { from: 4, to: 6, arrows: "to", label: "ANN\nsearch" },
  { from: 5, to: 7, arrows: "to", label: "hop\ntraversal" },
  { from: 6, to: 8, arrows: "to" },
  { from: 7, to: 8, arrows: "to" },
  { from: 8, to: 9, arrows: "to" },
  { from: 10, to: 8, dashes: true, color: "#30363d" },
]);
const container = document.getElementById("network");
new vis.Network(container, { nodes, edges }, {
  physics: false,
  interaction: { dragNodes: false },
  edges: { smooth: { type: "curvedCW", roundness: 0.2 }, font: { size: 11, color: "#8b949e" } }
});
</script>
</body>
</html>
```
</details>

## Embedding Models

An **Embedding Model** converts text (or other data) into a dense numerical vector that captures semantic meaning. Two input texts that are semantically similar produce embedding vectors that are geometrically close in the vector space; texts that are semantically dissimilar produce vectors that are geometrically distant. This geometric relationship between meaning and distance is what makes vector search for semantic similarity possible.

For context graph retrieval, embedding models convert decision trace text — the description of the decision, the policies cited, the precedents consulted, the exception rationale — into embedding vectors that can be searched by semantic similarity. A query about "how to handle a revenue recognition exception for a contract with variable consideration" will retrieve decision traces that discuss similar exception patterns even if the traces use different vocabulary.

Two properties of an embedding model determine its suitability for context graph retrieval:

**Domain specificity.** General-purpose embedding models trained on broad internet text may not accurately capture semantic similarity within specialized domains (financial accounting, clinical medicine, semiconductor manufacturing). Decision traces use domain-specific vocabulary and concepts that may not be well-represented in general-purpose training data. Domain-adapted embedding models — either fine-tuned on domain-specific text or trained from scratch on domain corpora — produce more accurate similarity judgments for domain-specific context graph retrieval.

**Dimensionality.** Embedding vectors of 768 or 1536 dimensions capture more semantic nuance than 128 or 256 dimensions, but require more memory and compute for storage and search. For most context graph applications, 768-dimensional embeddings (produced by models in the BERT family) provide a good balance between retrieval quality and computational cost.

### Sentence Transformers

**Sentence Transformers** are a family of embedding models specifically optimized for producing semantically meaningful embeddings of sentences and paragraphs — as opposed to word-level or token-level embeddings that require additional aggregation to produce a single vector for a passage of text. Sentence transformers use a siamese or triplet network architecture during training, where the model learns to produce similar embeddings for semantically related sentence pairs and dissimilar embeddings for unrelated pairs.

For context graph retrieval, sentence transformers are the preferred embedding model family because they are trained for the specific task of semantic similarity — the task that context graph vector search requires. A sentence transformer that has been fine-tuned on domain-specific text pairs (relevant-irrelevant decision trace pairs labeled by domain experts) produces retrieval quality that significantly exceeds general-purpose embedding models.

The fine-tuning process for sentence transformers requires a training dataset of positive pairs (queries and their relevant decision traces) and negative pairs (queries and irrelevant decision traces). This dataset can be constructed from user feedback on retrieval results — users who mark a retrieved trace as "very relevant" or "not relevant" are providing exactly the signal needed to fine-tune the embedding model. This creates a virtuous cycle: the more the system is used, the more feedback is collected, and the better the embedding model becomes.

## Dense Retrieval

**Dense Retrieval** is the retrieval paradigm in which both queries and documents (decision traces) are represented as dense embedding vectors, and retrieval is performed by finding the vectors most similar to the query vector. Dense retrieval contrasts with **sparse retrieval**, in which both queries and documents are represented as sparse vectors of term frequencies (like TF-IDF or BM25), and retrieval is performed by finding the documents with the highest term overlap with the query.

Dense retrieval has three advantages over sparse retrieval for context graph applications:

**Semantic generalization.** Dense retrieval finds documents that are semantically related to the query even when they do not share vocabulary. A query about "revenue recognition exception for variable consideration" can retrieve a decision trace that discusses "deferred revenue adjustment for milestone-based contracts" — semantically related but lexically different. Sparse retrieval, relying on term overlap, would miss this connection.

**Cross-lingual retrieval.** If the embedding model is multilingual, dense retrieval can retrieve decision traces written in a different language from the query. For multinational organizations whose context graphs contain decision traces in multiple languages, multilingual dense retrieval enables a unified search interface regardless of the language in which the user queries or the original decision was recorded.

**Better handling of long documents.** Sparse retrieval methods become less effective as document length increases because long documents tend to match many queries due to vocabulary breadth rather than topical focus. Dense retrieval produces a fixed-size embedding regardless of document length, which maintains retrieval quality for long decision traces with multiple sections.

The trade-off is that dense retrieval requires significantly more computation than sparse retrieval — each query requires embedding the query text and searching the ANN index, operations that have no counterpart in sparse retrieval. For context graph applications where query latency is critical, this computational overhead must be carefully profiled and optimized.

A practical production context graph uses **hybrid retrieval** — combining dense retrieval with sparse retrieval using reciprocal rank fusion (as described in Chapter 14) — to capture the strengths of both approaches. Dense retrieval dominates for semantic similarity; sparse retrieval contributes for precise term matches (entity names, policy identifiers, specific document references) where vocabulary matters more than semantic generalization.

## Context Graph ROI Model

The **Context Graph ROI Model** is a financial framework for quantifying the return on investment of a context graph deployment. A rigorous ROI model is essential for securing initial funding, justifying expansion, and communicating value to executive sponsors.

A complete context graph ROI model accounts for costs on three dimensions and benefits on four dimensions.

### Cost Dimensions

**Infrastructure cost.** The ongoing cost of the graph database, vector index, streaming platform, orchestration tools, and observability stack. Infrastructure cost scales with data volume and query volume, and should be modeled at the current scale and at projected scale in 12 and 24 months.

**Implementation cost.** The one-time cost of designing the schema, building the ingestion pipelines, integrating with source systems, training the retrieval model, and deploying the user interface. Implementation cost is highest in the beachhead workflow and decreases for adjacent workflows that can reuse components.

**Operational cost.** The ongoing cost of maintaining the system: data quality monitoring, model retraining, schema evolution, user support, and governance activities. Operational cost is often underestimated in initial ROI models and should be explicitly projected.

### Benefit Dimensions

**Decision speed improvement.** The reduction in time required to complete a decision cycle — from receiving a case to recording a decision. Decision speed improvement is the most easily measured benefit because timestamps are available in most workflow systems. Calculate as: (average old cycle time - average new cycle time) × number of decisions per year × loaded hourly cost of decision-makers.

**Decision quality improvement.** The reduction in decision reversals, rework, escalations, and compliance exceptions attributable to better context at decision time. Decision quality improvement is harder to measure but often higher value. Proxy metrics include: escalation rate, rework rate, audit finding rate, and customer complaint rate for customer-facing decisions.

**Onboarding speed improvement.** The reduction in time required for new employees to reach full productivity in decision-heavy workflows. If the context graph captures the institutional knowledge that new employees previously had to acquire through months of experience, onboarding time falls. Calculate as: (old time-to-productivity - new time-to-productivity) × number of new hires in target workflows per year × loaded daily cost of employee.

**Compliance cost reduction.** The reduction in time and cost required to prepare for and respond to regulatory audits, internal audits, and compliance investigations. If decision traces replace reconstructed documentation, audit preparation time falls dramatically. This benefit is typically measured as: (old audit preparation hours - new audit preparation hours) × number of audits per year × loaded hourly cost of compliance team.

A complete ROI model combines these dimensions into a time-series projection that accounts for ramp-up during the pilot and rollout phases. ROI calculations should be presented conservatively — using the 20th percentile of expected benefit rather than the mean — to maintain credibility with skeptical stakeholders.

!!! mascot-warning "The ROI Model Footgun"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Nexus warning">
    The most common ROI model footgun is double-counting: counting the same time savings as both decision speed improvement and compliance cost reduction, or attributing to the context graph benefits that were simultaneously produced by other investments (a CRM upgrade, a new hire, a process change). An ROI model with double-counted benefits will fail scrutiny when a skeptical stakeholder asks to walk through the calculation methodology. Each benefit dimension should map to a distinct, separately measurable metric. If two metrics move together because they are causally related, pick the one that is most directly attributable to the context graph and exclude the other.

<details markdown="1">
<summary>#### Diagram: Context Graph ROI Model</summary>

**Sim Spec:**

- Type: vis-network diagram
- sim-id: context-graph-roi-model
- Library: vis-network
- Status: not started
- Bloom Level: Evaluation
- Bloom Verb: justify
- Learning Objective: Justify a context graph investment by constructing a complete ROI model that accounts for infrastructure, implementation, and operational costs against decision speed, quality, onboarding, and compliance benefits
- Instructional Rationale: A visual ROI framework connects financial concepts to specific measurement approaches, helping learners present context graph value propositions to executive stakeholders

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Context Graph ROI Model</title>
<script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
<style>
  body { margin: 0; background: #0d1117; color: #e6edf3; font-family: sans-serif; }
  #network { width: 100%; height: 520px; border: 1px solid #30363d; }
</style>
</head>
<body>
<div id="network"></div>
<script>
const nodes = new vis.DataSet([
  { id: 1, label: "Context Graph\nROI", color: { background: "#8250df", border: "#d2a8ff" }, font: { color: "#e6edf3", size: 16 }, shape: "box", x: 0, y: 0, fixed: true },
  // Costs (left)
  { id: 2, label: "COSTS", color: { background: "#3d0d0d", border: "#f85149" }, font: { color: "#e6edf3", size: 14 }, shape: "box", x: -300, y: -60, fixed: true },
  { id: 3, label: "Infrastructure\n(DB, vector, stream)", color: { background: "#3d0d0d", border: "#f85149" }, font: { color: "#e6edf3" }, shape: "ellipse", x: -460, y: -160, fixed: true },
  { id: 4, label: "Implementation\n(Schema, pipelines,\nintegrations)", color: { background: "#3d0d0d", border: "#f85149" }, font: { color: "#e6edf3" }, shape: "ellipse", x: -460, y: 0, fixed: true },
  { id: 5, label: "Operations\n(Monitoring,\nretraining, support)", color: { background: "#3d0d0d", border: "#f85149" }, font: { color: "#e6edf3" }, shape: "ellipse", x: -460, y: 160, fixed: true },
  // Benefits (right)
  { id: 6, label: "BENEFITS", color: { background: "#1a4321", border: "#3fb950" }, font: { color: "#e6edf3", size: 14 }, shape: "box", x: 300, y: -60, fixed: true },
  { id: 7, label: "Decision Speed\n(Cycle time ×\nvolume × cost)", color: { background: "#1a4321", border: "#3fb950" }, font: { color: "#e6edf3" }, shape: "ellipse", x: 460, y: -200, fixed: true },
  { id: 8, label: "Decision Quality\n(Escalation,\nrework reduction)", color: { background: "#1a4321", border: "#3fb950" }, font: { color: "#e6edf3" }, shape: "ellipse", x: 460, y: -70, fixed: true },
  { id: 9, label: "Onboarding Speed\n(Time-to-productivity\n× hire volume)", color: { background: "#1a4321", border: "#3fb950" }, font: { color: "#e6edf3" }, shape: "ellipse", x: 460, y: 60, fixed: true },
  { id: 10, label: "Compliance Cost\n(Audit prep,\nfinding reduction)", color: { background: "#1a4321", border: "#3fb950" }, font: { color: "#e6edf3" }, shape: "ellipse", x: 460, y: 190, fixed: true },
]);
const edges = new vis.DataSet([
  { from: 2, to: 3, arrows: "to" },
  { from: 2, to: 4, arrows: "to" },
  { from: 2, to: 5, arrows: "to" },
  { from: 2, to: 1, arrows: "to", color: "#f85149", label: "subtracted" },
  { from: 6, to: 7, arrows: "to" },
  { from: 6, to: 8, arrows: "to" },
  { from: 6, to: 9, arrows: "to" },
  { from: 6, to: 10, arrows: "to" },
  { from: 6, to: 1, arrows: "to", color: "#3fb950", label: "added" },
]);
const container = document.getElementById("network");
new vis.Network(container, { nodes, edges }, {
  physics: false,
  interaction: { dragNodes: false },
  edges: { smooth: { type: "curvedCW", roundness: 0.2 }, font: { size: 11, color: "#8b949e" } }
});
</script>
</body>
</html>
```
</details>

## Bringing It All Together: The Complete Context Graph Stack

This final chapter, and this book, converges on a complete picture of a production context graph system. The fourteen concepts covered here — security model, row-level security, ABAC, zero-trust, federated learning, model audit trail, vector database, HNSW, product quantization, ANN, embedding model, sentence transformer, dense retrieval, and ROI model — are the final layer of architecture that makes context graph deployments secure, scalable, and financially justifiable.

The security stack ensures that the rich decision knowledge stored in the context graph is accessible only to authorized users and systems, enforced through fine-grained access control that accounts for user attributes, resource sensitivity, and environmental context. Zero-trust architecture eliminates implicit trust assumptions that create invisible security boundaries. Federated learning enables model improvement across organizational boundaries while preserving data sovereignty.

The vector search stack — HNSW indexes, product quantization, ANN search, sentence transformers, and dense retrieval — ensures that the retrieval layer can find semantically relevant precedents quickly and accurately even as the context graph grows to millions of decision traces. Hybrid retrieval combines the strengths of semantic and lexical search into a pipeline that is more accurate than either approach alone.

The ROI model translates technical capability into financial justification — essential for maintaining executive sponsorship and securing the resources needed to expand from beachhead workflow to organizational scale.

!!! mascot-encouraging "Nexus Reflects on the Journey"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Nexus encouraging">
    Twenty-two chapters. A complete architecture, from knowledge graph foundations through semantic layers, metadata management, process lineage, the context problem, decision traces, LLM integration, compliance, market strategy, organizational adoption, data engineering, and finally security and vector search. You now have the full picture — not just the what and the how, but the why that makes each piece necessary. Nexus is proud to have traced this path with you. The organizations that build context graphs well will make better decisions, maintain richer institutional memory, and serve their stakeholders more effectively than those that do not. That matters. Go build something that matters.

## Summary

This chapter completed the context graph architecture by examining the security and vector search foundations that make production deployments trustworthy and scalable.

The **Graph Security Model** defines authentication, authorization, data classification, and audit logging as the four pillars of context graph security. **Row-Level Security** enforces access boundaries at the node and edge level with three modes (permit, redact, deny) whose trade-offs between security and usability must be explicitly chosen. **Attribute-Based Access Control** enables fine-grained policies that incorporate user attributes, resource sensitivity, and environmental context — far more expressive than role-based access control for the complex access scenarios context graphs present.

**Zero-Trust Graph Architecture** eliminates implicit trust assumptions through cryptographic data provenance, continuous authorization re-evaluation, and least-privilege AI agent permissions. **Federated Learning** enables cross-organization model training while preserving data sovereignty. **Model Audit Trails** provide the training data provenance, evaluation metrics, version history, and approval records that compliance-regulated contexts require.

The vector search stack begins with **Vector Databases** as the storage layer for decision trace embeddings. **HNSW** indexes provide fast approximate nearest neighbor search through hierarchical navigable small-world graphs. **Product Quantization** compresses embeddings by 24-48x to make large collections fit in memory. **Approximate Nearest Neighbor** algorithms — HNSW, IVF-PQ, and LSH — offer tunable trade-offs between recall accuracy and search speed. **Embedding Models** and **Sentence Transformers** convert decision trace text into semantically meaningful vectors, with fine-tuning on domain-specific data producing the highest retrieval quality. **Dense Retrieval** enables semantic similarity search that transcends vocabulary matching.

Finally, the **Context Graph ROI Model** quantifies value across decision speed improvement, decision quality improvement, onboarding acceleration, and compliance cost reduction — giving organizations the financial framework they need to justify and expand context graph investments.

!!! mascot-celebration "Chapter 22: Complete — And So Is the Book!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    You have completed the full journey through "Context Graph: How Organizations Use LLMs Cost Effectively." From the foundational concepts of knowledge graphs and semantic layers, through the technical architecture of decision traces and LLM integration, to the organizational adoption and security foundations that make context graphs production-ready — you now hold a complete framework for understanding, designing, and deploying context graph systems. Nexus's work here is done. Yours is just beginning. Build wisely, trace everything, and may your decisions always have the context they deserve.
