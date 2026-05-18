# Chapters

This textbook is organized into 22 chapters covering 496 concepts.

Chapters are sequenced so that every concept's prerequisites appear in an equal
or earlier chapter — the order is a valid topological sort of the full learning graph.

## Chapter Overview

1. [Knowledge Graphs and Labeled Property Graphs](01-knowledge-graphs-lpg/index.md) — Introduces the Labeled Property Graph model — nodes, edges, labels, properties, Cypher — and explains why LPGs are the dominant enterprise choice over RDF and relational models.
2. [Semantic Layers for Data Lakes](02-semantic-layers/index.md) — Covers the data infrastructure that gives enterprise data meaning: data lakehouses, semantic layers, metric stores, query federation, data virtualization, and governance frameworks.
3. [Metadata Management](03-metadata-management/index.md) — Examines technical and business metadata, quality dimensions, data stewardship, access control, and the differential-privacy and federated-learning techniques that underpin policy enforcement.
4. [Enterprise Knowledge Graphs — Core Patterns](04-enterprise-knowledge-graphs/index.md) — Explains how organizations build and operate LPG-based knowledge graphs at scale: canonical entity models, hub-and-spoke federation, ETL ingestion patterns, and graph sharding.
5. [Graph Theory, Algorithms, and Advanced Enterprise KG](05-graph-theory-algorithms/index.md) — Covers graph algorithms (PageRank, shortest path, community detection, graph clustering) and the advanced entity-resolution and information-extraction patterns that build on both graph and metadata foundations.
6. [Metadata Registries and ISO 11179](06-metadata-registries/index.md) — Explores formal standards for enterprise metadata: the six ISO 11179 components, registration authorities, naming conventions, code lists, reference data management, UMLS, and NIEM.
7. [Process Mining, Data Lineage, and Provenance](07-process-mining-lineage/index.md) — Reconstructs what actually happened from event logs using IEEE XES, process discovery, conformance checking, OpenLineage, column-level lineage, event sourcing, and change data capture.
8. [The Context Problem and RAG Limitations](08-context-problem/index.md) — Makes the case for context graphs by explaining why LLMs fail at enterprise tasks even with RAG: tacit knowledge gaps, context freshness, relevance limits, and context poisoning.
9. [What a Context Graph Is](09-context-graph-definition/index.md) — Defines context graphs — how they extend enterprise knowledge graphs, their node-and-edge schema, API, read/write paths, lifecycle management, and access-control model.
10. [LLM and AI Foundations](10-llm-ai-foundations/index.md) — Covers transformer architecture, tokenization, prompting, fine-tuning, RLHF, in-context learning, zero/few-shot prompting, and LLM function calling to build the AI literacy needed for integration chapters.
11. [Decision Traces: Anatomy and LPG Patterns](11-decision-traces/index.md) — Dissects the decision trace — exception logic, historical precedents, approval chains, out-of-band approvals — and shows the complete LPG node schema and edge-type vocabulary for implementing them.
12. [Incumbent Challenges in Building Context Systems](12-incumbent-challenges/index.md) — Analyzes why existing BI tools, CRMs, ERP systems, and document stores will structurally struggle to capture and serve decision traces as context.
13. [Graph Data Modeling for Context](13-graph-data-modeling/index.md) — Presents the graph data modeling toolkit for context: bitemporal modeling, valid and transaction time, temporal edges, constraint enforcement, schema evolution, and multi-version patterns.
14. [Integrating LLMs with Context Graphs](14-llm-integration/index.md) — Shows how context graphs wire into LLM workflows: context retrieval, relevance ranking, hybrid retrieval combining dense and sparse (BM25) search, context window budgeting, grounding, and hallucination mitigation.
15. [Building and Deploying Context Graph Systems](15-building-deploying/index.md) — Covers end-to-end system construction: storage layer selection, real-time and batch ingestion pipelines, SDK/REST/GraphQL APIs, caching, replication, monitoring, SLAs, and testing strategies.
16. [AI Agent Architecture](16-ai-agent-architecture/index.md) — Covers agent loop design, planning, memory, tool use, multi-agent orchestration, graduated autonomy, human-in-the-loop, write-back, and the ReAct/Plan-and-Execute/Reflection agent patterns.
17. [Enterprise Use Cases](17-enterprise-use-cases/index.md) — Demonstrates concrete applications of context graphs across finance, sales, engineering, legal, HR, healthcare, procurement, and risk management domains.
18. [Compliance, Explainability, and Audit](18-compliance-explainability/index.md) — Covers GDPR right to explanation, audit trail design, algorithmic accountability, bias audits, data retention and purge policies, the EU AI Act, and AI red teaming for deployed systems.
19. [Market Strategy and Startup Approaches](19-market-strategy/index.md) — Analyzes the competitive landscape and startup strategy: full replacement vs. module replacement vs. new system, beachhead workflow selection, glue functions, and competitive moats.
20. [Organizational Adoption and Governance](20-organizational-adoption/index.md) — Covers the organizational adoption lifecycle: first workflow selection, change management, stakeholder alignment, ROI measurement, graduated autonomy rollout, and building a center of excellence.
21. [Data Engineering and Infrastructure](21-data-engineering/index.md) — Supporting infrastructure: data mesh, streaming platforms, graph batch and streaming processing, workflow orchestration, SQL transformation, feature engineering from graphs, and context graph observability.
22. [Security, Privacy, and Vector Search](22-security-vector-search/index.md) — Covers graph security (row-level security, zero-trust, ABAC), vector databases (HNSW, product quantization, ANN), dense and sparse retrieval, embedding model selection, and the context graph ROI model.

## How to Use This Textbook

Each chapter lists its prerequisite chapters at the top of its index page.
Foundational readers should progress linearly; experienced practitioners can
use the learning graph viewer to identify exactly which earlier concepts they
need before jumping into a later chapter.

---

**Note:** Each chapter index includes the full concept list and a
"TODO: Generate Chapter Content" marker for the content-generation skill.
