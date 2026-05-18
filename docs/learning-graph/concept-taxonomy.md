# Concept Taxonomy

12 categories covering all 496 concepts. No category exceeds 14% of total concepts.

| TaxonomyID | Category Name | Concepts | % | Description |
|------------|---------------|----------|---|-------------|
| GRAPH | Graph Fundamentals | 45 | 9.1% | Core graph theory: nodes, edges, LPG model, Cypher, graph algorithms, schema, serialization |
| EKG | Enterprise Knowledge Graphs | 30 | 6.0% | Building and scaling LPG-based knowledge graphs across enterprise systems |
| DATA | Data and Semantic Layers | 47 | 9.5% | Data lakes, semantic layers, metric stores, metadata management, and data governance |
| META | Metadata Standards | 28 | 5.6% | ISO 11179, metadata registries, data element definitions, NIEM, UMLS, thesauri |
| PROV | Process Mining and Provenance | 25 | 5.0% | Process mining, event logs, data lineage, data provenance, change data capture |
| CNTX | Context Problem and Context Graphs | 40 | 8.1% | The context problem, RAG limitations, context graph definition, schema, API, lifecycle |
| DTRC | Decision Traces and Graph Modeling | 66 | 13.3% | Decision trace anatomy, LPG implementation, incumbent challenges, graph data modeling |
| LLMI | LLM Foundations and Integration | 45 | 9.1% | Transformer architecture, prompting, fine-tuning, context retrieval, grounding strategies |
| BUILD | Building and Deploying Systems | 50 | 10.1% | Storage layers, ingestion pipelines, SDK, monitoring, AI agent architecture |
| USE | Enterprise Use Cases | 25 | 5.0% | Finance, sales, engineering, legal, HR, healthcare, and cross-domain applications |
| COMP | Compliance, Market, and Adoption | 55 | 11.1% | Audit trails, explainability, regulatory compliance, startup strategies, organizational adoption |
| INFRA | Data Infrastructure and Security | 40 | 8.1% | Data mesh, streaming platforms, vector databases, graph security, privacy, federated learning |

---

## Category Definitions

### GRAPH — Graph Fundamentals
Concepts: 1–25 (Topic 1) and 417–436 (cross-cutting graph theory)

The foundational building blocks of the Labeled Property Graph model and graph
theory: nodes, edges, labels, properties, schemas, Cypher/openCypher/GQL query
languages, graph algorithms (shortest path, PageRank, community detection),
graph schema, serialization formats (GraphML, GraphSON), and the comparison of
LPG with relational and RDF models including the scalability limitations of RDF.

### EKG — Enterprise Knowledge Graphs
Concepts: 26–55 (Topic 2)

How organizations build and operate LPG-based knowledge graphs at enterprise
scale: entity resolution, master data management, canonical entity models,
hub-and-spoke and federated architectures, cross-system entity linking, ETL and
ingestion patterns, graph sharding and replication, knowledge graph quality,
ontologies, SKOS, and graph data catalogs.

### DATA — Data and Semantic Layers
Concepts: 56–102 (Topics 3 and 4)

The infrastructure that gives enterprise data meaning: data lakes and
lakehouses, semantic layers, metric stores, business glossaries, query
federation, data virtualization, metadata management (technical, business,
operational), data quality dimensions, data governance frameworks, stewardship,
ownership, classification, access control, automated metadata discovery, and
metadata catalog platforms.

### META — Metadata Standards
Concepts: 103–130 (Topic 5)

Formal standards and vocabularies for enterprise metadata: the ISO/IEC 11179
metadata registry standard and its six core components (data element, data
element concept, conceptual domain, value domain, object class, property),
registration authorities, naming conventions, reference data management, code
lists, metadata thesauri, UMLS, and NIEM.

### PROV — Process Mining and Provenance
Concepts: 131–155 (Topic 6)

Reconstructing what actually happened from event logs and streams: process
mining (process discovery, conformance checking, process enhancement), the
IEEE XES standard, structured logging, upstream and downstream lineage,
column-level lineage, data provenance, custody chains, transformation history,
the OpenLineage standard, event sourcing, CQRS, append-only logs, change data
capture, and temporal versioning.

### CNTX — Context Problem and Context Graphs
Concepts: 156–195 (Topics 7 and 8)

The gap that context graphs fill: why LLMs fail at enterprise tasks even with
existing infrastructure; RAG and its limits; tacit and implicit knowledge;
context freshness, relevance, and poisoning; the definition of a context
graph; how it extends rather than replaces the enterprise knowledge graph;
context graph schema, API, read/write paths, lifecycle, and access control.

### DTRC — Decision Traces and Graph Modeling
Concepts: 196–261 (Topics 9, 10, and 11)

The core of context graph content: the anatomy of a decision trace; exception
logic, historical precedent, approval chains, and out-of-band approvals;
LPG implementation patterns (decision trace node schema, edge types,
trace-to-entity relationships, actor nodes, policy version edges, precedent
chains); why incumbent systems will struggle to build this; and the full
graph data modeling toolkit for context (bitemporal modeling, temporal edges,
valid/transaction time, constraint enforcement, schema evolution).

### LLMI — LLM Foundations and Integration
Concepts: 262–286 (Topic 12) and 457–476 (cross-cutting LLM foundations)

How large language models work and how they connect to context graphs:
transformer architecture, tokens, prompting, fine-tuning, RLHF, in-context
learning, zero- and few-shot prompting; context retrieval, relevance ranking,
vector embeddings, hybrid retrieval, context window budgeting, compression and
pruning, grounding strategies, hallucination mitigation, function calling,
context graph tool definitions, and prompt injection risks.

### BUILD — Building and Deploying Systems
Concepts: 287–336 (Topics 13 and 14)

End-to-end system construction: storage layer selection (property graph
database, vector index, hybrid), ingestion pipelines (real-time, batch,
backfill, event-driven), SDK/REST/GraphQL APIs, caching, replication,
monitoring, alerting, SLAs, deployment patterns, testing strategies,
observability, cost models; and the AI agent architecture layer: agent loop
design, planning, memory, tool use, orchestration, multi-agent systems,
graduated autonomy, human-in-the-loop, write-back, ReAct/Plan-and-Execute/
Reflection patterns, and agent evaluation.

### USE — Enterprise Use Cases
Concepts: 337–361 (Topic 15)

Concrete applications of context graphs across the enterprise: finance
(revenue reporting exceptions, ARR definition conflicts), sales (engagement
history, playbook precedents), engineering (incident traces, production
decision records), legal/compliance (regulatory audit automation), customer
success (account history, escalation logic), HR, procurement, supply chain,
marketing, risk, IT operations, healthcare, financial services, retail,
manufacturing, insurance, government, and cross-department patterns.

### COMP — Compliance, Market, and Adoption
Concepts: 362–416 (Topics 16, 17, and 18)

The organizational and regulatory context for context graphs: GDPR right to
explanation, audit trail design, explainability by design vs. post-hoc,
algorithmic accountability, bias/fairness audits, data retention and purge
policies, compliance reporting, the EU AI Act; startup strategy (full
replacement, module replacement, new system); beachhead workflow selection,
glue functions, competitive moats; and the organizational adoption lifecycle
(first workflow selection, change management, stakeholder alignment, ROI
measurement, graduated autonomy rollout, center of excellence).

### INFRA — Data Infrastructure and Security
Concepts: 437–456 (cross-cutting data engineering) and 477–496 (security and
vector search)

Supporting infrastructure: data mesh, data products and contracts, data SLAs,
data observability, SQL transformation tools, workflow orchestration, event
streaming platforms, graph batch and streaming processing, multi-model and
time-series integration, feature engineering from graphs; graph security
models, row-level security, attribute-based access control, zero-trust
architecture, data masking, anonymization, differential privacy, federated
learning, model audit trails, AI red teaming; vector databases (HNSW, product
quantization, ANN), embedding models, sentence transformers, dense and sparse
retrieval (BM25), and context graph ROI modeling.
