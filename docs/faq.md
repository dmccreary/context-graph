# Context Graph FAQ

Frequently asked questions about *Context Graph: How Organizations Use LLMs Cost Effectively*,
organized by topic and difficulty. Each answer is self-contained and links to the relevant
chapter for deeper reading.

---

## Getting Started

### What is this textbook about?

This textbook explains what **context graphs** are, why large language models (LLMs) need them
to work reliably inside organizations, and how practitioners can design, build, and deploy them.
The core thesis is that the trillion-dollar opportunity in enterprise AI is not in building better
models — it is in solving the **context problem**: giving models the right organizational
knowledge at the right moment so they can reason, decide, and act on behalf of the business
without constant human intervention.

The book covers the full stack: from knowledge graph fundamentals and semantic layers, through
decision trace design, LLM integration, agent architecture, compliance, and market strategy.

See [Course Description](course-description.md) for the complete scope.

### Who is this textbook for?

The book is written for three overlapping groups:

- **Enterprise architects and senior engineers** designing AI-powered systems who need a
  principled approach to organizational memory and context management.
- **AI/ML practitioners and data engineers** building LLM-powered applications who are
  struggling with hallucinations, missing context, and poor decision quality in agent workflows.
- **Technical product managers and founders** evaluating or building products in the enterprise
  AI space who want a framework for where context graphs create durable competitive advantage.

The book assumes comfort reading technical content and some exposure to software systems, but
does not require deep machine learning or graph database background.

See [Course Description](course-description.md) for the full audience description.

### What will I learn by reading this textbook?

By the end of the book you will be able to:

- **Define** a context graph and name the four types of information current enterprise systems
  fail to capture (exception logic, historical precedents, cross-system synthesis, out-of-band
  approval chains)
- **Explain** why LLMs need persistent organizational context to make reliable decisions
- **Design** a context graph schema for a real enterprise workflow
- **Build** a retrieval pipeline that grounds LLM calls in organizational precedent
- **Diagnose** why an LLM-powered workflow is producing poor decisions
- **Architect** an end-to-end context graph system from ingestion through LLM integration

See [Course Description](course-description.md) for the complete Bloom's Taxonomy learning
outcomes.

### What background knowledge do I need before starting?

The book requires four areas of background:

1. **Basic AI/LLM literacy** — understanding that LLMs predict tokens, have a context window,
   and that prompt engineering changes behavior.
2. **Enterprise data fundamentals** — familiarity with relational databases and the idea of a
   system of record.
3. **Software development basics** — comfort reading pseudocode, architecture diagrams, APIs,
   and services.
4. **Business process concepts** — understanding that organizations have workflows, approvals,
   exceptions, and audit requirements.

No prior knowledge of graph databases, knowledge graphs, or formal ontology is required —
these are introduced from first principles in
[Chapter 1: Knowledge Graphs and LPGs](chapters/01-knowledge-graphs-lpg/index.md).

### What is a context graph in one sentence?

A **context graph** is a persistent, living record of organizational decision traces — stitched
across entities, time, and the broader enterprise knowledge graph — designed to give LLMs the
decision context they need to reason accurately about enterprise tasks.

See [Chapter 9: What a Context Graph Is](chapters/09-context-graph-definition/index.md) for
the full definition unpacked term by term.

### What is the core problem this textbook solves?

The book solves the **context problem**: even organizations with sophisticated data
infrastructure (knowledge graphs, semantic layers, metadata registries) find that their
LLM-powered systems give subtly wrong answers. The failure is not a model failure — it is a
context failure. Current systems capture *what* happened (data) and *how* it happened (process
logs), but they do not capture *why* decisions were made: the exception logic, historical
precedents, cross-system reasoning, and out-of-band approval chains that constitute
organizational intelligence.

Context graphs capture that missing layer.

See [Chapter 8: The Context Problem](chapters/08-context-problem/index.md) for the complete
diagnosis.

### How is this textbook organized?

The book has four logical sections:

1. **Foundations** (Chapters 1–7): Knowledge graphs, semantic layers, metadata management,
   enterprise graph architecture, metadata registries, and process mining/lineage — the
   infrastructure that context graphs build on.
2. **The Context Problem and Solution** (Chapters 8–11): The context problem, what a context
   graph is, decision trace anatomy, and why incumbents cannot easily replicate it.
3. **Building and Operating** (Chapters 12–18): Graph data modeling, LLM integration, system
   architecture, agent design, enterprise use cases, and compliance.
4. **Strategy** (Chapters 19–22): Market landscape, organizational adoption, data engineering,
   and security.

See [Chapters Overview](chapters/index.md) for the full chapter list.

### Is prior knowledge of graph databases required?

No. Graph databases and the Labeled Property Graph (LPG) model are introduced from first
principles in [Chapter 1: Knowledge Graphs and LPGs](chapters/01-knowledge-graphs-lpg/index.md).
If you are already comfortable with graph databases, you can skim Chapters 1 and 4 and focus
on Chapters 8–11, which are the core of the book.

### What is the core thesis of this textbook?

The core thesis, drawn from Foundation Capital's analysis of the AI market, is that the
**trillion-dollar opportunity in enterprise AI is not in building better models — it is in
solving the context problem**. Organizations that capture decision context in structured,
queryable graphs will achieve durable competitive advantage over those that rely on vector
stores or raw RAG systems. Context graphs are the infrastructure layer that makes enterprise
AI reliable.

See [Chapter 19: Market Strategy](chapters/19-market-strategy/index.md) for the strategic
framing.

### What are the key learning outcomes?

The six Bloom's Taxonomy levels are all addressed:

- **Remember**: Define context graphs, name the four missing layers, recall why RAG is
  insufficient.
- **Understand**: Explain why LLMs need persistent context, describe why legacy systems fail
  at decision capture.
- **Apply**: Design context graph schemas, instrument agents to write decision traces.
- **Analyze**: Diagnose poor LLM performance, evaluate workflow automation candidates.
- **Evaluate**: Assess competing architectures, critique startup strategies, judge compliance
  readiness.
- **Create**: Architect end-to-end context graph systems, design compliance layers, produce
  go-to-market analysis.

See [Course Description](course-description.md) for the full list.

### Where should I start if I already know knowledge graphs?

If you are comfortable with labeled property graphs, skip directly to
[Chapter 8: The Context Problem](chapters/08-context-problem/index.md) — this is the pivot
chapter where the book's thesis comes into focus. Then read
[Chapter 9: What a Context Graph Is](chapters/09-context-graph-definition/index.md) and
[Chapter 11: Decision Traces](chapters/11-decision-traces/index.md) for the core definitions
and implementation patterns. Return to Chapters 2–7 as reference when specific topics arise.

### What makes context graphs different from what my organization already has?

Most organizations have one or more of the following: a relational data warehouse, a vector
store for semantic search, a metadata catalog, or a knowledge graph. Context graphs do something
none of these do: they capture **why decisions were made** — the exception logic, the precedents
cited, the approval chains, the cross-system synthesis — at the moment the decision happens.
This is the organizational memory layer that LLMs need but cannot construct from documents alone.

See [Chapter 9: What a Context Graph Is](chapters/09-context-graph-definition/index.md) for
a direct comparison with each alternative.

---

## Core Concepts

### What is a decision trace?

A **decision trace** is the atomic unit of a context graph — a structured record of a specific
organizational decision capturing: what was decided, by whom, when, based on what information,
under what policy version, with what precedents cited, and whether the decision was later
reviewed or overturned. It is the answer to the question "why was this done this way?"

**Example:** A decision trace for a pricing exception approval records the customer, discount
amount, approver identity, the three precedent decisions cited, the policy version in effect,
the triggering exception condition, and the outcome — all as queryable graph nodes and edges.

See [Chapter 11: Decision Traces](chapters/11-decision-traces/index.md) for the complete
node schema and edge-type vocabulary.

### How does a context graph differ from an enterprise knowledge graph?

An **enterprise knowledge graph** (EKG) records what entities exist and how they relate —
products, customers, employees, contracts, organizational units. A **context graph** is an
extension of the EKG that records *why decisions involving those entities were made*. The
context graph does not replace the EKG; it is stitched to it via entity reference edges so
that decision traces can be queried in relation to the entities they concern.

In practice: the EKG knows that Customer A and Product B exist and are related. The context
graph knows that a 15% pricing exception was approved for Customer A on Product B in Q4, by
whom, for what reason, citing what precedent, and under what policy version.

See [Chapter 9: What a Context Graph Is](chapters/09-context-graph-definition/index.md) for
the full comparison.

### How does a context graph differ from a vector store?

A **vector store** provides fuzzy semantic retrieval: given a query, find documents whose
embedding is closest in vector space. This is powerful for unstructured text retrieval but has
three critical limitations for enterprise decision support: it cannot traverse relationships, it
cannot enforce structured predicates (e.g., "decisions by this actor, in Q3, above this
threshold"), and it does not maintain provenance or approval chain links.

A **context graph** provides precise, structured, traversable retrieval. A query like "show me
all precedent decisions involving this customer where a VP countersigned and the outcome was
later revised" is natural in a graph query language and impossible in a vector similarity search.

See [Chapter 9: What a Context Graph Is](chapters/09-context-graph-definition/index.md) and
[Chapter 22: Security and Vector Search](chapters/22-security-vector-search/index.md).

### What is the context problem?

The **context problem** is the fundamental mismatch between what LLMs need to reason correctly
over organizational data and what current retrieval systems provide. It manifests as: LLMs
giving confidently wrong answers about enterprise specifics — citing stale policies, misapplying
precedents from different product lines, generating recommendations that violate undocumented
exception rules.

The failure is not a model failure. LLMs generate the best output they can given what is in
their context window. When the context window lacks the right organizational knowledge — the
exception logic, the relevant precedents, the current policy version, the out-of-band approvals
— the model fills the gap with plausible-sounding generalization. That is the context problem.

See [Chapter 8: The Context Problem](chapters/08-context-problem/index.md) for a detailed
breakdown of each failure mode.

### Why is RAG alone insufficient for enterprise AI?

Retrieval-Augmented Generation (RAG) retrieves documents by semantic similarity and injects
them into the context window. This is a significant improvement over prompting with general
knowledge alone, but it has four gaps that context graphs address:

1. **Static documents miss tacit knowledge**: exception logic and approval precedents are
   almost never written down in documents.
2. **Semantic similarity is not structured traversal**: RAG cannot answer "show decisions by
   this actor in Q4 above this amount."
3. **Documents lack provenance links**: RAG retrieves text but cannot verify who approved the
   policy, when, or whether it was superseded.
4. **Staleness is invisible**: a retrieved document gives no signal about whether the policy it
   describes is still current.

Context graphs address all four gaps.

See [Chapter 8: The Context Problem](chapters/08-context-problem/index.md) for the full
analysis.

### What are the four missing layers in enterprise AI systems?

The four missing layers — the information that current enterprise systems consistently fail to
capture at decision time — are:

1. **Exception logic**: the informal rules practitioners apply to cases that fall outside normal
   parameters
2. **Historical precedents**: prior decisions that were consulted or cited when making the
   current one
3. **Cross-system synthesis**: reasoning that combines data from HR, Finance, CRM, Legal, and
   other systems in ways that leave no single-system record
4. **Out-of-band approval chains**: verbal authorizations, Slack messages, and informal
   escalations that never reach the system of record

Decision traces are designed to capture all four.

See [Chapter 11: Decision Traces](chapters/11-decision-traces/index.md).

### What is a Labeled Property Graph?

A **Labeled Property Graph (LPG)** is the dominant graph data model for enterprise systems.
In an LPG, **nodes** represent entities (a customer, a product, an approval), **edges**
represent relationships (APPROVED_BY, CITES, RELATES_TO), and both nodes and edges can carry
**properties** — key-value pairs such as `{ timestamp: "2025-10-15", amount: 15000 }`. Nodes
carry one or more **labels** (e.g., `Decision`, `Customer`) and edges carry a typed **edge
type** (e.g., `CITES_PRECEDENT`).

LPGs are queried using Cypher/openCypher or GQL. They are the substrate on which context
graphs are built.

See [Chapter 1: Knowledge Graphs and LPGs](chapters/01-knowledge-graphs-lpg/index.md).

### What is grounding in LLM applications?

**Grounding** is the practice of injecting relevant, accurate, and current organizational
context into the LLM's context window before generating a response. A grounded LLM is
constrained to reason from verified organizational facts rather than from training-data
generalizations. Context graphs are a grounding mechanism — they supply the specific,
structured, provenance-linked organizational knowledge the model needs to reason correctly.

Without grounding, a model answers from general knowledge. With grounding from a context graph,
it answers from the organization's specific history, policies, precedents, and approval records.

See [Chapter 8: The Context Problem](chapters/08-context-problem/index.md) and
[Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md).

### What is token efficiency and why does it matter?

**Token efficiency** is the ratio of useful organizational knowledge per token injected into
the context window. Because both input tokens and output tokens cost money (and latency), an
organization that retrieves a 500-token decision trace containing the three most relevant
precedents outperforms one that injects 5,000 tokens of loosely related documents.

Token efficiency is the book's central design principle: context graphs enable precise,
structured retrieval that maximizes information density per token. This is the mechanism by
which context graphs help organizations use LLMs **cost effectively**.

See [Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md) and
[Chapter 13: Graph Data Modeling](chapters/13-graph-data-modeling/index.md).

### What is hallucination and how do context graphs reduce it?

**Hallucination** is the generation of plausible-sounding but factually incorrect content by
an LLM. In enterprise settings, hallucination typically occurs because the model lacks the
specific organizational context it needs and fills the gap with a reasonable-sounding
generalization.

Context graphs reduce hallucination by grounding: when the model is given the actual decision
traces, policy versions, and approval records for the situation at hand, there is no gap to
fill with a generalization. The model is constrained to reason from verified organizational
facts.

See [Chapter 8: The Context Problem](chapters/08-context-problem/index.md) and
[Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md).

### What is a semantic layer?

A **semantic layer** is an abstraction layer that imposes business-level concepts — metrics,
dimensions, entities — on top of raw data storage. It translates physical column names and
join paths into business vocabulary ("Customer Revenue" instead of `tbl_txn.amt_usd`).

Semantic layers are an important context graph input source: they provide the authoritative
business definitions that LLMs need to interpret data queries correctly. Without a semantic
layer, an LLM confronting a data warehouse with undocumented column naming will produce
ambiguous or incorrect analytical queries.

See [Chapter 2: Semantic Layers](chapters/02-semantic-layers/index.md).

### What is metadata management and why does it matter for AI?

**Metadata management** is the discipline of capturing, maintaining, and governing metadata —
data about data — including technical metadata (schema, lineage, types), business metadata
(definitions, ownership, classifications), and operational metadata (freshness, quality scores,
access logs).

Metadata management matters for AI because without knowing what a field means, who owns it,
how fresh it is, and whether it is trustworthy, an LLM cannot reason correctly about enterprise
data. A context graph without metadata anchoring produces hallucinations about the data itself,
not just the decisions.

See [Chapter 3: Metadata Management](chapters/03-metadata-management/index.md).

### What is data provenance?

**Data provenance** records the complete origin, custody chain, and transformation history
of a specific data value — answering the question "can I trust this data, and where did it
come from?" Provenance is more specific than lineage: where lineage tracks the flow of data
through systems, provenance tracks the authority and integrity of individual values.

In context graphs, provenance records are attached to decision trace nodes to allow auditors
to verify not just what was decided but that the underlying data used to make the decision was
from an authoritative, unmodified source.

See [Chapter 7: Process Mining and Lineage](chapters/07-process-mining-lineage/index.md).

### What is data lineage?

**Data lineage** tracks the full upstream-to-downstream path of every data item — from its
source system through each transformation and aggregation step to its final consumers.
Lineage answers "where did this data come from?" at the column level.

Lineage is a prerequisite for trustworthy context graphs: if the decision traces reference
data items whose lineage is broken or unverified, the grounding is compromised. Lineage graphs
(often sourced from platforms that implement the OpenLineage standard) feed into context graphs
as provenance metadata.

See [Chapter 7: Process Mining and Lineage](chapters/07-process-mining-lineage/index.md).

### What is process mining?

**Process mining** is the discipline of discovering, conformance-checking, and enhancing process
models from event logs — reconstructing what actually happened in an organization's workflows
from the digital traces left in its systems.

Process mining is relevant to context graphs in two ways: it surfaces the exception patterns
and approval sequences that decision traces need to capture, and it produces structured event
logs that can be ingested into a context graph as historical decision context.

See [Chapter 7: Process Mining and Lineage](chapters/07-process-mining-lineage/index.md).

### What is an approval chain?

An **approval chain** is the sequence of actors, roles, and authorizations required to complete
an organizational decision — for example, a contract modification requiring sign-off from the
account manager, the finance controller, and the VP of Legal. Approval chains are one of the
four missing layers in enterprise AI: they are frequently captured in email and messaging
platforms rather than in systems of record, making them invisible to LLMs.

Decision traces capture approval chains as sequences of **Approval Edges** linking
**Actor Nodes** to the **Decision Node** in temporal order.

See [Chapter 11: Decision Traces](chapters/11-decision-traces/index.md).

### What is exception logic?

**Exception logic** is the set of informal rules, thresholds, and judgment calls that
practitioners apply to cases falling outside normal business process parameters. Exception
logic is almost never formally documented — it lives in the heads of experienced employees and
is transmitted through observation and apprenticeship. When those employees leave, the
exception logic leaves with them.

Decision traces capture exception logic by recording the triggering condition, the
exception-specific reasoning applied, and the outcome. Over many similar decisions, exception
patterns emerge as queryable graph structures.

See [Chapter 11: Decision Traces](chapters/11-decision-traces/index.md).

### What is graduated autonomy?

**Graduated autonomy** is a deployment pattern in which AI agents are given increasing levels
of independent decision-making authority as the organization's trust in the system grows —
typically as a function of the context graph accumulating sufficient decision traces to verify
consistent, correct behavior.

A new deployment might require human review of every agent action (autonomy level 0). As the
context graph grows and agents demonstrate accuracy across a representative range of cases, the
threshold for human review rises: first to reviewing only exceptions, then only flagged cases,
then audit-sampling. Graduated autonomy makes the path from pilot to production safe and
organizationally defensible.

See [Chapter 16: AI Agent Architecture](chapters/16-ai-agent-architecture/index.md).

### What is a beachhead workflow?

A **beachhead workflow** is the first organizational workflow selected for context graph
automation — chosen because it exhibits the three signals that make context graph deployment
most likely to succeed quickly: **high headcount** (many people performing repetitive decision
tasks), **exception-heavy** (a high fraction of cases requiring judgment rather than following
the standard rule), and **cross-system synthesis** (the decision requires pulling context from
multiple enterprise systems that no existing tool integrates).

A successful beachhead builds organizational trust, accumulates decision traces, and creates a
template for expansion to adjacent workflows.

See [Chapter 19: Market Strategy](chapters/19-market-strategy/index.md) and
[Chapter 20: Organizational Adoption](chapters/20-organizational-adoption/index.md).

### What is organizational memory?

**Organizational memory** is the collective knowledge, decisions, precedents, and rationales
accumulated by an organization over time — distinct from any individual employee's personal
knowledge. Traditional systems capture transactional history (what happened) but not
decisional context (why it happened). Context graphs are designed specifically to be the
structured, queryable layer of organizational memory that captures the why.

See [Chapter 9: What a Context Graph Is](chapters/09-context-graph-definition/index.md) and
[Chapter 20: Organizational Adoption](chapters/20-organizational-adoption/index.md).

### What is the agent write-back pattern?

The **agent write-back pattern** is the practice of having an AI agent write its own decision
traces back to the context graph after completing a task. This closes the loop between agent
execution and organizational memory: every agent decision becomes a queryable precedent for
future agents and humans, without requiring a human to manually record it.

Write-back is the mechanism by which a context graph becomes self-improving: the more agents
execute tasks and write traces, the richer the organizational memory available to ground future
agent reasoning.

See [Chapter 16: AI Agent Architecture](chapters/16-ai-agent-architecture/index.md).

### What is a context window budget?

The **context window budget** is the portion of an LLM's context window allocated to retrieved
organizational context — as opposed to the system prompt, task instructions, or output space.
Managing the budget is central to token efficiency: too little context and the model lacks
grounding; too much and the cost and latency become prohibitive, while the model may struggle
to attend to the most relevant information.

Context graphs enable precise budget management because decision traces are structured and
compact — a well-formed trace carrying exception logic, approval chain, and precedent links
can deliver high organizational information density in 300–500 tokens.

See [Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md).

### What is context poisoning?

**Context poisoning** is the injection of inaccurate, outdated, or maliciously crafted context
into an LLM's context window, causing it to generate incorrect or harmful outputs. In enterprise
settings, context poisoning can occur accidentally (stale decision traces) or intentionally
(a compromised agent injecting false precedents).

Mitigation requires access-control on the context graph (agents can only retrieve traces they
are authorized to see), provenance verification on traces (traces carry custody chain links),
and output validation that cross-checks generated content against authoritative data.

See [Chapter 8: The Context Problem](chapters/08-context-problem/index.md) and
[Chapter 22: Security and Vector Search](chapters/22-security-vector-search/index.md).

### What is a decision node?

A **decision node** is the central node type in a context graph — the LPG node that represents
a single organizational decision. It carries properties including: decision type, outcome,
timestamp, justification text, triggering condition, policy version reference, and confidence
score. All other node types in the context graph (Actor Nodes, Entity Nodes, Precedent Nodes,
Policy Version Nodes) connect to the Decision Node via typed edges.

See [Chapter 11: Decision Traces](chapters/11-decision-traces/index.md) for the full Decision
Node schema.

---

## Technical Detail Questions

### What is ISO 11179 and how does it relate to context graphs?

**ISO/IEC 11179** is the international standard for metadata registries — the formal standard
that specifies how data elements (and their definitions, value domains, and governance
attributes) should be registered and administered across an enterprise. It defines six core
components: data element, data element concept, conceptual domain, value domain, object class,
and property.

ISO 11179 registries serve as authoritative definition sources for context graphs: when an LLM
needs to interpret a specific data element referenced in a decision trace (e.g., "ARR" or
"churn probability"), the registry entry provides the official, versioned definition rather
than a locally-interpreted column name.

See [Chapter 6: Metadata Registries](chapters/06-metadata-registries/index.md).

### What is the difference between data lineage and data provenance?

**Data lineage** answers "where did this data come from and how did it flow through the
system?" — tracing the upstream-to-downstream path through transformations and joins.
**Data provenance** answers "can I trust this specific value, and what is its custody chain?"
— recording the origin, handling history, and integrity of individual data values.

In the context graph: lineage tells you that a revenue figure came from a transformation of
raw billing data via three ETL steps. Provenance tells you that the specific value of `$2.4M`
at a given timestamp was generated by a specific process version, has not been modified since,
and was certified by a data steward. Both are needed for trustworthy AI grounding.

See [Chapter 7: Process Mining and Lineage](chapters/07-process-mining-lineage/index.md).

### What query languages are used with property graphs?

The two primary query languages for Labeled Property Graphs are:

- **Cypher / openCypher**: the most widely adopted property graph query language, originating
  from Neo4j and standardized as openCypher. Uses ASCII-art pattern matching syntax:
  `(n:Decision)-[:CITES_PRECEDENT]->(p:Decision)`.
- **GQL (ISO/IEC 39075)**: the new ISO standard graph query language that consolidates
  openCypher and other dialects into a single international standard, offering SQL-style
  syntax alongside pattern matching.

RDF/SPARQL, while technically a graph query language, is not widely used for enterprise
context graphs due to scalability limitations and awkward reification patterns for property
representation.

See [Chapter 1: Knowledge Graphs and LPGs](chapters/01-knowledge-graphs-lpg/index.md).

### What is bitemporal modeling?

**Bitemporal modeling** is a data modeling technique that tracks two independent time
dimensions for each record: **valid time** (when the fact was true in the real world) and
**transaction time** (when the record was stored in the system). This allows the graph to
answer "what did we know about this decision at a given point in time?" — crucial for audit
and compliance scenarios where the state of knowledge at the time of a decision is what
matters, not just the current state.

Context graphs benefit significantly from bitemporal modeling because approval chains and
policy versions can change after a decision is recorded, and auditors need the ability to
reconstruct the exact context that existed at decision time.

See [Chapter 13: Graph Data Modeling](chapters/13-graph-data-modeling/index.md).

### What is change data capture?

**Change Data Capture (CDC)** is a technique for detecting and capturing row-level changes in
a source database as they occur, publishing them to a downstream stream or queue rather than
requiring periodic batch exports. CDC enables near-real-time ingestion of organizational events
into a context graph without the latency cost of full table scans.

CDC is the preferred ingestion pattern for context graphs that need to capture decisions
at the moment they are made rather than in delayed batch windows.

See [Chapter 15: Building and Deploying](chapters/15-building-deploying/index.md).

### What is the IEEE XES standard?

**IEEE XES (eXtensible Event Stream)** is the international standard format for event logs
used in process mining. An XES log structures organizational events as a hierarchy: log →
cases → events, where each event has a timestamp, activity name, and optional attributes.
XES is the primary interchange format for process mining tools and serves as the ingest format
for pulling historical process execution data into context graphs.

See [Chapter 7: Process Mining and Lineage](chapters/07-process-mining-lineage/index.md).

### What is the OpenLineage standard?

**OpenLineage** is an open standard API specification for lineage metadata collection, allowing
data pipelines to emit lineage events in a common schema regardless of which orchestration
tool or data platform generates them. OpenLineage consumers include data catalogs (DataHub,
Marquez) and lineage visualization tools.

For context graphs, OpenLineage events are the primary mechanism for auto-populating data
provenance nodes — ensuring that decision traces carry accurate upstream lineage for every
data item they reference.

See [Chapter 7: Process Mining and Lineage](chapters/07-process-mining-lineage/index.md).

### What is the actor node pattern?

The **actor node pattern** is a context graph schema design where each decision-maker,
approver, or participant is stored as a reusable graph node — rather than embedding actor
names as string properties on the decision node. This enables powerful approval-chain queries:
"show me all decisions approved by this actor," "who has countersigned the most exceptions in
Q4," or "find the approval chain for all decisions that were later reversed."

Without the actor node pattern, actor information is buried in unqueryable string properties
and approval chain analysis is impossible.

See [Chapter 11: Decision Traces](chapters/11-decision-traces/index.md).

### What is context compression?

**Context compression** is the process of reducing the token count of retrieved context
without losing the organizational information needed for grounding. Techniques include:
selecting the most relevant properties from a decision trace (dropping verbose text,
retaining structured fields), summarizing long justification strings, and converting tabular
data to compact structured representations before injection.

Context compression is the primary lever for managing the context window budget — enabling
more organizational context to fit within a fixed token allocation.

See [Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md).

### What is multi-hop retrieval?

**Multi-hop retrieval** is a context graph query strategy that traverses multiple edge types
to find relevant decision traces — as opposed to single-hop retrieval that only retrieves
nodes directly linked to the query entity. An example: retrieving decisions made about a
customer → then retrieving precedent decisions cited in those decisions → then retrieving
the policy versions active at the time of those precedents.

Multi-hop retrieval is essential for questions that require understanding causal chains or
precedent histories, but it must be bounded carefully to avoid retrieving too large a subgraph.

See [Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md).

### What is hybrid retrieval?

**Hybrid retrieval** combines graph traversal (for structured, typed relationship queries)
with vector similarity search (for semantic relevance matching) in a single retrieval pipeline.
A hybrid approach retrieves the exact nodes that match structured predicates (entity ID,
time range, actor type) and then ranks within that set by semantic similarity to the query
before injecting into the context window.

Hybrid retrieval gives the precision of graph queries and the recall of semantic search —
particularly valuable for queries that mix structured filters with conceptual similarity.

See [Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md).

### What is vector embedding in the context of context graphs?

A **vector embedding** is a dense numeric representation of a piece of text (such as a
decision justification or a glossary definition) produced by an embedding model. Embeddings
capture semantic meaning in a form that enables similarity search: two texts that mean
similar things will have embeddings close together in vector space.

In context graph systems, embeddings are computed for unstructured text fields (justification
strings, exception narratives) and stored in a vector index alongside the structured graph.
This enables hybrid retrieval queries that combine graph traversal with semantic matching.

See [Chapter 22: Security and Vector Search](chapters/22-security-vector-search/index.md).

### What is entity resolution in enterprise knowledge graphs?

**Entity resolution** is the process of determining that two or more records in different
source systems refer to the same real-world entity — for example, "Acme Corporation" in CRM,
"ACME Corp" in ERP, and "Acme" in the billing system all represent the same customer. Without
entity resolution, a context graph query for a customer's decision history returns incomplete
results because decisions recorded under different name variants are not linked.

Entity resolution is a prerequisite for any multi-system context graph deployment.

See [Chapter 4: Enterprise Knowledge Graphs](chapters/04-enterprise-knowledge-graphs/index.md).

### What is master data management?

**Master Data Management (MDM)** is the discipline of creating and maintaining a single,
authoritative reference for the enterprise's key entities — customers, products, employees,
suppliers. MDM produces the **canonical entity model** that serves as the anchor for context
graph node identity: every decision trace references the canonical entity ID, not the
source-system-specific identifier.

Without MDM (or equivalent entity resolution), a context graph cannot reliably link decisions
across system boundaries.

See [Chapter 4: Enterprise Knowledge Graphs](chapters/04-enterprise-knowledge-graphs/index.md).

### What is a schema registry?

A **schema registry** is a service that stores, versions, and validates the schemas for data
flowing through a pipeline — particularly for event-driven architectures where producers and
consumers must agree on the structure of messages. In context graph ingestion pipelines, a
schema registry ensures that event logs and CDC streams conform to expected formats before
being transformed into graph nodes and edges, preventing silent schema drift.

See [Chapter 21: Data Engineering](chapters/21-data-engineering/index.md).

### What is context reranking?

**Context reranking** is the process of re-ordering retrieved context items by relevance to
the specific query before injecting them into the context window — as opposed to injecting in
retrieval order. Because LLMs have a tendency to weight content near the beginning or end of
the context more heavily, placing the most relevant decision traces in high-attention positions
(and dropping low-relevance items to stay within the budget) improves output quality.

See [Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md).

### What is attribute-based access control in a context graph?

**Attribute-Based Access Control (ABAC)** is an access control model in which permissions are
determined by evaluating a set of attributes — of the subject (who is requesting), the
resource (which trace or subgraph), and the environment (time of day, request source). ABAC
is more expressive than role-based access control for context graphs because decision traces
have fine-grained sensitivity that varies by content: an agent authorized to read procurement
decisions should not automatically see compensation approval decisions, even within the same
graph.

See [Chapter 22: Security and Vector Search](chapters/22-security-vector-search/index.md).

### What is the difference between a data catalog and a metadata registry?

A **data catalog** is an inventory of data assets — tables, files, reports — with searchable
metadata such as descriptions, owners, and tags. It is primarily a discovery and documentation
tool. A **metadata registry** (as defined by ISO 11179) is a formal governance infrastructure:
it administers the official definitions of data elements, enforces naming conventions, version-
controls definitions, and provides a registration authority that certifies authoritative meanings.

Catalogs help users find data; registries provide authoritative definitions for interpreting it.
Both are inputs to context graphs, but registry entries carry higher authority as grounding
sources for LLMs.

See [Chapter 6: Metadata Registries](chapters/06-metadata-registries/index.md).

### What is a structured event log and why does it matter for context graphs?

A **structured event log** is an event stream in which each event follows a consistent,
machine-readable schema — specifying fields like `entity_id`, `activity`, `timestamp`,
`actor`, and `outcome` rather than free-form narrative text. Structured logs are
**graph-ingestible**: they can be transformed into Decision Nodes and Approval Edges with
predictable field mappings. Unstructured logs require NLP extraction, introducing error and
latency.

Designing systems to emit structured logs from the start — rather than retrofitting structure
onto narrative logs — is one of the highest-ROI investments for a context graph implementation.

See [Chapter 7: Process Mining and Lineage](chapters/07-process-mining-lineage/index.md).

---

## Common Challenge Questions

### What happens when RAG retrieves stale context?

When RAG retrieves a document that was accurate when indexed but has since been superseded by
a policy update, price change, or organizational restructuring, the LLM receives stale grounding
and generates confidently wrong output. The model has no way to know the document is outdated —
it treats retrieved context as authoritative.

Context graphs mitigate staleness by attaching **valid time** and **transaction time** to every
decision trace node, enabling retrieval queries to explicitly filter for traces that were valid
at the relevant point in time and to flag traces whose policy version references have been
superseded.

See [Chapter 8: The Context Problem](chapters/08-context-problem/index.md) and
[Chapter 13: Graph Data Modeling](chapters/13-graph-data-modeling/index.md).

### Why do enterprise AI projects fail even with good data infrastructure?

The most common failure pattern is described precisely in Chapter 8: organizations with
excellent data warehouses, semantic layers, and metadata catalogs still see poor LLM
performance because those systems capture *what* happened but not *why*. The exception
logic, the approval precedents, the cross-system reasoning — the organizational intelligence
that experienced employees carry in their heads — is nowhere in the data layer. RAG systems
faithfully retrieve what is there, but what is there is insufficient.

The second common failure is **context staleness**: documents are indexed once and not updated,
so the LLM reasons from an accurate-but-now-outdated picture of organizational policy.

See [Chapter 8: The Context Problem](chapters/08-context-problem/index.md).

### How do you prevent context poisoning?

Context poisoning prevention requires three controls:

1. **Access control**: agents can only retrieve traces they are authorized to see, preventing
   unauthorized context injection.
2. **Write-path validation**: decision traces are validated against the schema before ingestion,
   preventing malformed or semantically corrupt traces.
3. **Output validation**: generated outputs are cross-checked against authoritative data before
   being surfaced to users or written as new traces.

Additionally, provenance chains on decision traces allow downstream users to verify the
legitimacy of the context that grounded a given output.

See [Chapter 22: Security and Vector Search](chapters/22-security-vector-search/index.md) and
[Chapter 9: What a Context Graph Is](chapters/09-context-graph-definition/index.md).

### What causes schema drift in knowledge graphs?

**Schema drift** occurs when source systems evolve — adding, removing, or renaming fields —
without the knowledge graph schema being updated to match. Symptoms include ingestion failures,
null property values in graph nodes, and query results that silently omit recently-added data.

For context graphs, schema drift is particularly dangerous because it can cause decision traces
to be stored with missing or misinterpreted fields, corrupting the organizational memory
without triggering an obvious error.

Mitigation: schema registries that validate inbound events, active metadata management that
detects source-system schema changes, and graph schema evolution patterns that maintain
backward compatibility.

See [Chapter 4: Enterprise Knowledge Graphs](chapters/04-enterprise-knowledge-graphs/index.md).

### How do you handle missing provenance in decision traces?

When a decision trace is ingested from a legacy system that did not capture full provenance —
missing the original approver identity, the policy version, or the source data references —
the trace is stored with explicit null markers and provenance confidence scores rather than
being silently completed with guesses.

For LLM retrieval, low-confidence or partial traces should be flagged in the retrieved context
so the model can weight them appropriately: "this precedent is relevant but its approval chain
is not fully documented." Agents should not make high-stakes decisions based solely on
low-provenance traces.

See [Chapter 11: Decision Traces](chapters/11-decision-traces/index.md) and
[Chapter 18: Compliance and Audit](chapters/18-compliance-explainability/index.md).

### What is the difference between current state bias and read-path limitation?

**Current state bias** describes the architectural orientation of most enterprise systems
toward recording the current state of entities — what the account balance is now, what the
contract terms are today — without preserving the sequence of decisions that produced that
state. Systems with current state bias overwrite historical states rather than appending them.

**Read-path limitation** describes data warehouse and BI architecture: these systems are
excellent at reading and summarizing data after decisions have been made, but they are not on
the write path at the moment decisions occur. By the time a decision lands in the data
warehouse, the context that drove the decision — the Slack thread, the verbal approval, the
exception rationale — is gone.

Together, these two failure modes explain why data warehouses struggle to serve as context
graph substrates.

See [Chapter 12: Incumbent Challenges](chapters/12-incumbent-challenges/index.md).

### Why do data warehouses struggle to provide decision context?

Data warehouses are architected for **analytical query performance** over **historical
transactional data** — not for capturing organizational decisions at decision time. Three
structural reasons make them poor context graph substrates:

1. They sit on the **read path**, receiving data only after decisions are completed and recorded.
2. They apply **current-state overwrite semantics**, discarding the decision history that
   context graphs need to preserve.
3. They normalize data into dimensional models optimized for aggregation, destroying the
   entity-relationship structure that graph traversal requires.

See [Chapter 12: Incumbent Challenges](chapters/12-incumbent-challenges/index.md).

### How do you maintain context freshness at scale?

Context freshness at scale requires three architectural choices:

1. **Active metadata management**: source-system schema changes and data freshness events are
   propagated to the context graph in near-real-time, not in overnight batch runs.
2. **Time-stamped validity windows**: every decision trace carries an explicit validity window
   that the retrieval query filters on, ensuring stale traces are not injected into
   active context.
3. **CDC-based ingestion**: change data capture pipelines publish organizational events to the
   context graph within seconds of occurrence, rather than in hourly or daily batch windows.

See [Chapter 15: Building and Deploying](chapters/15-building-deploying/index.md).

### What happens when no matching precedent exists in the context graph?

When a retrieval query returns no relevant precedent for an agent task, the agent has three
options, in order of preference:

1. **Escalate to human review**: signal that the task is novel and requires a human decision
   that should then be written back to the graph as the first precedent for this type.
2. **Apply the nearest analogous precedent** with explicit uncertainty flagging: retrieve the
   closest precedent by semantic similarity and clearly communicate to the user that this
   is an analogy, not an exact match.
3. **Refuse the task**: for high-stakes decisions where precedent is a hard requirement, the
   safest response is to route to a human rather than generate an unsupported recommendation.

Agents that fabricate precedents when none exist are exhibiting the most dangerous form of
hallucination. Graduated autonomy protocols specify which option applies at each autonomy level.

See [Chapter 16: AI Agent Architecture](chapters/16-ai-agent-architecture/index.md).

### How do incumbent systems create structural disadvantages for context graph adoption?

Incumbent vendors — data warehouses, metadata catalog platforms, and AI agent frameworks —
face three structural disadvantages:

1. **Architecture mismatch**: their data models, APIs, and storage layers are optimized for
   different access patterns than context graph workloads require.
2. **Current-state bias**: redesigning their systems to capture decision context at write time
   would require breaking backward compatibility with existing customers.
3. **Write-path absence**: they typically receive data after decisions are made, not during the
   decision workflow where context must be captured.

New entrants with purpose-built context graph architectures avoid all three constraints and
can optimize end-to-end for organizational decision capture.

See [Chapter 12: Incumbent Challenges](chapters/12-incumbent-challenges/index.md).

### What are the risks of overly permissive agent authorization?

An agent with write access to the wrong subgraph can silently corrupt organizational memory —
injecting false decision traces that future agents will retrieve as legitimate precedents.
Unlike a data corruption bug that manifests as an obvious error, a poisoned decision trace
may produce plausible-looking outputs for months before the error is detected.

This is a classic footgun: the dangerous behavior (write-back to the wrong subgraph) is on
the path of least resistance (broad authorization is easier to configure than fine-grained
ABAC), and the damage (corrupted organizational memory) shows up far from the cause in time
and system location.

Mitigation: scope agent write authorization to specific decision node types and entity
subgraphs, validate all writes against schema before committing, and log all write operations
for audit review.

See [Chapter 16: AI Agent Architecture](chapters/16-ai-agent-architecture/index.md) and
[Chapter 22: Security and Vector Search](chapters/22-security-vector-search/index.md).

---

## Best Practice Questions

### How do I choose the first workflow to automate with a context graph?

Select the workflow that most strongly exhibits the three beachhead signals:

1. **High headcount**: multiple people spend significant time on this workflow, creating ROI
   pressure and making impact easy to measure.
2. **Exception-heavy**: a high fraction of cases require judgment (exceptions, escalations,
   special approvals), which is exactly where context graphs add most value.
3. **Cross-system synthesis**: the decision requires combining information from multiple
   enterprise systems that no existing tool integrates.

Finance (credit exception approvals, revenue reporting reconciliation) and sales (contract
exception management, renewal pricing) are common strong first candidates.

See [Chapter 20: Organizational Adoption](chapters/20-organizational-adoption/index.md) and
[Chapter 19: Market Strategy](chapters/19-market-strategy/index.md).

### How should I design decision traces for an enterprise workflow?

Start by shadowing the practitioners who currently make the decisions. Identify: what
information do they consult, who do they check with, what informal rules do they apply, what
precedents do they recall? Map each piece of this decision context to a trace component:
consulted data → referenced entity nodes, informal rules → exception logic properties, approval
chain → actor nodes with approval edges, precedents cited → precedent link edges.

Then design the Decision Node schema with enough properties to answer the questions an LLM
or auditor would ask, and enough typed edge connections to enable the traversal queries that
surface relevant history.

See [Chapter 11: Decision Traces](chapters/11-decision-traces/index.md) and
[Chapter 13: Graph Data Modeling](chapters/13-graph-data-modeling/index.md).

### What are the three signals that a workflow is ready for context graph automation?

The three readiness signals are:

1. **High headcount** — many people currently performing the workflow by hand, creating clear
   ROI opportunity.
2. **Exception-heavy** — a significant fraction of cases require non-standard handling,
   meaning the decision context (exception logic and precedents) has high value.
3. **Cross-system synthesis** — the decision requires pulling context from multiple enterprise
   systems, which is exactly the integration gap context graphs close.

A workflow exhibiting all three is a strong beachhead candidate. Workflows that are simple,
rule-based, and confined to a single system are better automated with traditional decision
engines, not context graphs.

See [Chapter 19: Market Strategy](chapters/19-market-strategy/index.md).

### How do I measure the quality of decisions made with context graph grounding?

Decision quality measurement requires baseline comparison: measure the same type of decision
with and without context graph grounding, evaluating on: accuracy (does the decision match
what a domain expert would decide?), consistency (do similar cases produce similar decisions?),
and compliance (does the decision comply with current policy?).

Proxy metrics useful before a domain-expert evaluation is feasible include: hallucination
rate on verifiable fields, escalation rate (if agents escalate less often as the graph grows,
it suggests better grounding), and human correction rate on agent outputs.

See [Chapter 20: Organizational Adoption](chapters/20-organizational-adoption/index.md).

### When should agents write back to the context graph?

Agents should write back to the context graph at the end of every significant decision task —
specifically when the decision: involves an exception to standard process, requires
interpretation of policy or precedent, is likely to recur with similar characteristics, or
involves a multi-step approval chain. Agents should not write back for purely mechanical
operations (data format conversions, simple lookups) that carry no interpretive content.

Write-back should be gated by a schema validation step and should always include the full
context the agent used for the decision — not just the outcome — so that future agents can
retrieve the reasoning, not just the result.

See [Chapter 16: AI Agent Architecture](chapters/16-ai-agent-architecture/index.md).

### How do I manage context window budgets in production LLM applications?

Context window budget management requires: (1) profiling typical retrieval sizes for each
query type to establish baseline budget requirements; (2) setting explicit token caps per
retrieval category (entity history, recent precedents, policy versions); (3) implementing
context compression for verbose fields before injection; and (4) ranking retrieved context
by relevance and dropping lowest-ranked items when the total exceeds the budget.

Monitor budget utilization metrics (tokens used per call, retrieval truncation rate) in
production to detect budget violations before they degrade output quality.

See [Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md).

### How do I design a context graph schema for temporal queries?

Use **bitemporal modeling** to support temporal queries: track both **valid time** (when the
decision was true in the organizational world) and **transaction time** (when the record was
entered into the graph). Add temporal indexes on both time dimensions to support efficient
range queries.

For approval chains and policy versions, model temporal edges with explicit `valid_from` and
`valid_to` properties rather than relying on node creation timestamps — this makes "reconstruct
the state of the world at a given point in time" queries straightforward.

See [Chapter 13: Graph Data Modeling](chapters/13-graph-data-modeling/index.md).

### What storage architecture should I choose for a context graph?

A production context graph typically requires **hybrid storage**: a property graph database
for structured decision traces and relationship traversal, plus a vector index for semantic
similarity search on unstructured text fields (justification narratives, exception
descriptions), plus optional caching for hot retrieval paths.

Choose the property graph database based on scale requirements: hundreds of millions of decision
nodes require a distributed graph database with horizontal sharding. For smaller deployments
(< 100M nodes), a single-instance property graph with read replicas is typically sufficient.

See [Chapter 15: Building and Deploying](chapters/15-building-deploying/index.md).

### How do I ensure compliance readiness in a context graph deployment?

Compliance readiness requires four design decisions baked in from the start:

1. **Explainability by design**: decision traces must carry enough justification and provenance
   to answer "why was this decision made?" without post-hoc reconstruction.
2. **Immutable audit log**: all writes to the context graph are append-only and time-stamped;
   no trace can be silently overwritten.
3. **Data retention policies**: define retention windows per decision type aligned with
   regulatory requirements (e.g., financial decisions may require 7-year retention).
4. **Right-to-explanation support**: the schema must enable generation of human-readable
   decision explanations for any individual decision trace on request.

See [Chapter 18: Compliance and Audit](chapters/18-compliance-explainability/index.md).

### How do I build organizational trust in an AI system backed by a context graph?

Trust builds through a **graduated autonomy roadmap**: start with full human review of every
agent output, use the context graph to show reviewers *why* the agent made each recommendation
(provenance transparency), and incrementally raise the autonomy level as the agent demonstrates
consistent accuracy across a representative range of cases.

Publish decision quality metrics to stakeholders — showing accuracy rates, correction rates,
and precision improvement over time as the context graph grows — turns trust from a subjective
feeling into an evidence-based progression.

See [Chapter 20: Organizational Adoption](chapters/20-organizational-adoption/index.md).

### How should I handle conflicting context when multiple decision traces disagree?

Conflicting traces — where two precedents support opposite outcomes — should be retrieved
together and flagged as a conflict in the injected context. The LLM prompt should include an
explicit instruction to surface conflicts rather than resolving them silently.

In practice: the agent should retrieve both conflicting traces, note the conflict in its output,
and escalate to human review rather than choosing one precedent over the other without
authorization. The human resolution then becomes a new trace that disambiguates the conflict
for future queries.

See [Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md) and
[Chapter 16: AI Agent Architecture](chapters/16-ai-agent-architecture/index.md).

---

## Advanced Topics

### How do context graphs enable graduated autonomy in AI agent systems?

Graduated autonomy works by using the context graph as an evidence accumulator: as agents
execute tasks and write traces, the graph builds a history of comparable decisions. Autonomy
level thresholds are calibrated against this history — for example, "if more than 200 similar
decisions have been made with a human correction rate below 3%, this decision type is promoted
to autonomy level 2 (human reviews only exceptions)."

The context graph thus serves as both the grounding source (enabling accurate agent decisions)
and the evidence base (justifying autonomy level promotions). Without the context graph,
graduated autonomy has no principled mechanism for advancing thresholds.

See [Chapter 16: AI Agent Architecture](chapters/16-ai-agent-architecture/index.md).

### How should multi-agent systems share a context graph?

Multi-agent systems sharing a context graph require: (1) **agent-scoped access control** — each
agent is authorized only for the decision subgraphs relevant to its role; (2) **write
serialization** — concurrent agent writes must be serialized or conflict-detected to prevent
duplicate or contradictory trace nodes; (3) **context budget arbitration** — an orchestration
layer manages aggregate retrieval load to prevent one agent's broad queries from degrading
latency for others; and (4) **trace attribution** — every node written by an agent carries the
agent identity and version, enabling audit and rollback.

See [Chapter 16: AI Agent Architecture](chapters/16-ai-agent-architecture/index.md) and
[Chapter 15: Building and Deploying](chapters/15-building-deploying/index.md).

### How do context graphs address EU AI Act compliance requirements?

The EU AI Act requires high-risk AI systems to maintain logs sufficient to reconstruct their
inputs and outputs and to provide explanations of automated decisions to affected individuals.
Context graphs address these requirements structurally: every decision trace records the
retrieved context (inputs), the decision and justification (outputs), the policy version
active at decision time, and the approval chain — all in a queryable, auditable graph structure.

The **right to explanation** is satisfied by traversing a decision node's full context subgraph
and generating a human-readable explanation from its structured content — a deterministic
operation rather than a post-hoc interpretability approximation.

See [Chapter 18: Compliance and Audit](chapters/18-compliance-explainability/index.md).

### What are the three startup strategies for building context-graph-powered products?

The three strategies identified in the book are:

1. **Full system replacement**: replace an existing organizational system (e.g., a CRM, a
   ticketing system, a procurement platform) with one that has a context graph as its
   decision layer from the start. Highest impact, highest sales friction.
2. **Module replacement**: replace a specific function within an existing system (e.g., the
   contract exception approval workflow within a CRM) with a context-graph-powered module.
   Faster time-to-value, requires integration with incumbent systems.
3. **New system creation**: create a new category of organizational intelligence system that
   did not previously exist — the context graph as standalone organizational memory
   infrastructure. Requires the most market education but creates the most defensible moat.

See [Chapter 19: Market Strategy](chapters/19-market-strategy/index.md).

### How do counterfactual traces support AI auditing?

A **counterfactual trace** is a decision trace that records what decision *would* have been
made under an alternative policy, different precedent set, or counterfactual fact. Counterfactual
traces are powerful audit tools: they allow compliance reviewers to ask "if the policy in effect
had been the old version, how would the decision have differed?" — a question that cannot be
answered from the decision outcome alone.

Counterfactual traces are generated by re-running the decision logic against the actual context
graph but with modified inputs and storing the alternative outcome as a linked trace node.

See [Chapter 11: Decision Traces](chapters/11-decision-traces/index.md) and
[Chapter 18: Compliance and Audit](chapters/18-compliance-explainability/index.md).

### How do context graphs compare with fine-tuning as an enterprise AI strategy?

**Fine-tuning** embeds organizational knowledge into model weights by training on
organizational data — producing a model that has internalized the organization's vocabulary,
patterns, and some policies. It works well for style, terminology, and common-case patterns.
Its limitations: fine-tuned knowledge becomes stale as the organization evolves (and
re-training is expensive), fine-tuned knowledge cannot carry provenance or approval chain
links, and fine-tuning does not provide audit-queryable explanations for specific decisions.

**Context graphs** inject current, provenance-linked, specific organizational context at
inference time. They stay current as the graph is updated, support audit queries, and provide
explainability. The two approaches are complementary: fine-tuning handles vocabulary and
style; context graphs handle specific, current, decision-relevant facts.

See [Chapter 14: Integrating LLMs](chapters/14-llm-integration/index.md) and
[Chapter 10: LLM and AI Foundations](chapters/10-llm-ai-foundations/index.md).

### How do you design a context graph for workflows spanning multiple enterprise systems?

Cross-system context graphs require: (1) **canonical entity resolution** — all decision traces
reference a single canonical entity ID regardless of source system, requiring entity resolution
across HR, CRM, ERP, Finance, and other systems; (2) **federated ingestion pipelines** — each
source system has its own CDC/ETL pipeline writing to the context graph, with schema validation
at each ingestion point; (3) **cross-system edge types** — explicit edge types that record the
provenance of cross-system synthesis decisions, identifying which systems contributed context;
and (4) **governance federation** — data ownership and access control policies from each source
system must be respected by the context graph's access control layer.

See [Chapter 4: Enterprise Knowledge Graphs](chapters/04-enterprise-knowledge-graphs/index.md),
[Chapter 13: Graph Data Modeling](chapters/13-graph-data-modeling/index.md), and
[Chapter 21: Data Engineering](chapters/21-data-engineering/index.md).

### How does the context graph ROI model work?

The **context graph ROI model** is built from three components:

1. **Cost reduction**: time saved by automating exception-heavy workflows — measured as
   (average handling time per case) × (case volume) × (automation rate).
2. **Quality improvement**: reduction in decision errors — measured as (error rate baseline) −
   (error rate with context grounding) × (cost per error).
3. **Compounding returns**: as the context graph accumulates more traces, grounding quality
   improves, which increases the automation rate for subsequent case types — creating a
   compounding ROI curve that distinguishes context graphs from static document-based RAG
   systems.

The ROI model is most compelling for high-volume, exception-heavy workflows where error costs
are significant (finance, compliance, legal, customer success).

See [Chapter 19: Market Strategy](chapters/19-market-strategy/index.md) and
[Chapter 20: Organizational Adoption](chapters/20-organizational-adoption/index.md).
