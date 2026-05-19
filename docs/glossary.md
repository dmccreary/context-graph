# Glossary of Terms

#### Access Control

A security mechanism that restricts which users or systems can read, write, or modify specific data elements within a system.

In context graphs, access control governs which agents, users, or services can retrieve or update decision traces. Fine-grained access control ensures that sensitive organizational decisions — such as compensation approvals or legal judgments — are only surfaced to LLMs operating within authorized workflows, preventing context poisoning from unauthorized data.

**Example:** A finance AI agent is granted read access to budget decision traces for Q3 but blocked from accessing compensation approval records stored in the same context graph.

**See also:** Row-Level Security in Graph, Attribute-Based Access Control, Zero-Trust Graph Architecture

#### Account History Graph

A context graph subgraph capturing the complete interaction, decision, and relationship history for a specific customer account — including support cases, renewal decisions, exception approvals, and escalation outcomes.

Account history graphs are the primary context source for customer success and sales AI agents. Rather than requiring an agent to query across CRM, support ticketing, and billing systems separately, the account history graph integrates all account-related decisions into a single traversable subgraph that can be retrieved as context in a single query.

**Example:** An account history graph for a key enterprise customer stores 18 months of renewal negotiations, pricing exceptions, SLA incident decisions, and executive relationship events — all retrievable in one context graph query for the account team's quarterly planning session.

**See also:** CRM Graph Integration, Customer Success Use Case, Sales Engagement Use Case

#### Active Metadata Management

A metadata management approach in which the metadata catalog automatically discovers, updates, and acts on metadata changes in near real-time, as opposed to scheduled batch scans.

Active metadata management is critical for maintaining context freshness in context graphs. When source systems change — a new column appears, a join path is deprecated, or a data owner changes — the context graph must reflect these updates before an LLM retrieves stale organizational knowledge that leads to incorrect outputs.

**Example:** When a new revenue metric is added to the data warehouse, the active metadata manager automatically propagates the definition and ownership metadata to the context graph within minutes.

**See also:** Passive Metadata Cataloging, Metadata Catalog Platform, Context Freshness

#### Actor Node Pattern

A graph schema pattern in which each decision-maker, approver, or participant in an organizational process is represented as a dedicated node with standardized properties, linked to decision nodes via typed approval or participation edges.

The actor node pattern is a foundational context graph design decision that enables approval chain queries. By storing actors as reusable nodes rather than embedding actor names as decision node properties, the schema enables queries like "show all decisions made by this actor" or "who else has approved this type of exception?" — questions that are impossible when actor identity is stored as a flat string property.

**See also:** Decision Actor, Approval Chain, Approval Edge

#### Administered Item

In ISO 11179, any concept, property, or data element that has been formally submitted to and accepted by a metadata registry for administration and governance.

Administered items carry formal identifiers, version histories, and governance status that make them the most trustworthy data element references for context graphs. When an LLM needs to interpret a specific data element, retrieving its administered item record — with its official definition, valid value domain, and registration status — provides the highest-authority grounding available.

**See also:** Registry Entry, Registration Authority, ISO 11179 Standard

#### Adoption Accelerator

A factor — organizational, technical, or cultural — that speeds up the deployment and use of AI systems within an enterprise.

Identifying adoption accelerators allows teams building context graph systems to prioritize workflows where success compounds quickly. Early wins in high-visibility workflows build the organizational memory and trust necessary for broader context graph adoption across departments.

**Example:** A successful pilot where the context graph reduced a compliance audit from three days to four hours became a major adoption accelerator, prompting five other departments to request similar systems.

**See also:** Adoption Barrier, Pilot Program Design, Change Management

#### Adoption Barrier

A factor — technical, organizational, or cultural — that slows or prevents the deployment and use of AI systems within an enterprise.

Common adoption barriers for context graph systems include lack of data ownership clarity, resistance from teams who own the decision processes being captured, and insufficient tooling to write traces in real time. Understanding barriers early allows architects to design around them rather than discovering them during rollout.

**Example:** A context graph pilot stalled because no single team owned the approval data spanning HR, Finance, and Legal — a classic adoption barrier requiring executive sponsorship to resolve.

**See also:** Adoption Accelerator, Change Management, Stakeholder Alignment

#### Adoption Roadmap

A phased plan that describes the sequence of workflows, teams, and capabilities to be onboarded onto an AI system over time.

For context graph deployments, an adoption roadmap typically begins with a single exception-heavy workflow where organizational memory is most valuable, then expands as the graph accumulates decision traces that improve LLM accuracy. The roadmap provides the organizational scaffolding that turns a pilot into enterprise infrastructure.

**Example:** The adoption roadmap for a financial services firm began with credit exception approvals in Q1, expanded to regulatory reporting in Q2, and targeted cross-product reconciliation in Q3.

**See also:** Pilot Program Design, Beachhead Workflow, Change Management

#### Agent Authentication

The process by which an AI agent proves its identity to a system before being granted access to resources such as a context graph.

Agent authentication is a foundational security requirement for multi-agent systems that read from and write to context graphs. Without strong authentication, a compromised or misconfigured agent could inject false decision traces, poisoning the organizational memory that other agents and humans rely on.

**Example:** An AI agent responsible for procurement approvals authenticates using a short-lived cryptographic token before querying the context graph for prior vendor decisions.

**See also:** Agent Authorization, Agent Sandboxing, Zero-Trust Graph Architecture

#### Agent Authorization

The process of determining which actions an authenticated AI agent is permitted to perform within a system.

In context graph architectures, authorization rules govern whether an agent can read decision traces, write new traces, update existing records, or trigger downstream workflows. Overly permissive authorization is a significant footgun: an agent with write access to the wrong subgraph can silently corrupt organizational memory.

**Example:** A customer success agent is authorized to read account history traces but not to write new decision nodes — writes are reserved for the human-in-the-loop escalation workflow.

**See also:** Agent Authentication, Access Control, Graduated Autonomy

#### Agent Benchmarking

A systematic process for measuring the performance of an AI agent across a defined set of tasks, scenarios, or metrics.

Benchmarking context-graph-augmented agents requires measuring not just task completion rates but context utilization: did the agent retrieve the right decision traces, and did those traces improve output quality? Without this, teams cannot distinguish between failures caused by poor retrieval and failures caused by poor reasoning.

**Example:** An agent benchmarking suite tests whether a procurement agent correctly identifies the three most relevant vendor precedents from the context graph for a given contract scenario.

**See also:** Agent Evaluation, LLM Evaluation Metric, Decision Quality Metric

#### Agent Context Budget

The portion of an LLM's context window reserved for information retrieved from external sources, such as a context graph, during an agent's reasoning loop.

Managing the agent context budget is central to token efficiency — the book's core thesis. Agents must balance retrieving enough organizational context to reason accurately against the cost and latency of large context windows. Context graphs enable precise, structured retrieval that maximizes information density per token.

**Example:** An agent is allocated 4,000 tokens for context graph retrieval out of a 16,000-token total context window, requiring the retrieval layer to rank and compress decision traces before injection.

**See also:** Context Window Budget, Context Compression, Context Pruning

#### Agent Decision Log

A persistent record of the decisions, tool calls, and reasoning steps taken by an AI agent during a task execution.

Agent decision logs are closely related to decision traces but are generated automatically by the agent runtime rather than recorded by humans. When written back to a context graph, they become machine-generated organizational memory that future agents can query — closing the loop between agent execution and institutional knowledge.

**Example:** After an agent resolves a billing dispute, its decision log — including the policy versions consulted and the graph queries executed — is written to the context graph as a new decision trace node.

**See also:** Agent Trace, Decision Trace, Agent Write-Back

#### Agent Error Recovery

The set of strategies an AI agent uses to detect, handle, and recover from failures during task execution.

In context graph systems, error recovery must account for retrieval failures: what happens when the graph returns no relevant decision traces, or when retrieved context is ambiguous? Robust agents escalate to human review rather than hallucinating a resolution, preserving the integrity of the organizational memory.

**Example:** When a compliance agent finds no matching precedent in the context graph for a novel regulatory scenario, it triggers a human-in-the-loop review rather than generating an unsupported recommendation.

**See also:** Human-in-the-Loop, Agent Retry Pattern, Agent Feedback Loop

#### Agent Evaluation

A structured process for assessing the quality, safety, and reliability of an AI agent's outputs across defined tasks and edge cases.

Evaluating agents that use context graphs requires testing both the retrieval layer and the generation layer independently. An agent may retrieve perfect context but reason poorly, or reason well but retrieve stale or irrelevant traces. Evaluation frameworks must instrument both paths to identify where failure originates.

**See also:** Agent Benchmarking, LLM Evaluation Metric, Faithfulness Score

#### Agent Feedback Loop

A mechanism by which the outputs of an AI agent are used to improve future agent behavior, either through direct model updates or through enrichment of the agent's retrieval environment.

In context graph architectures, feedback loops are especially powerful: human corrections to agent outputs can be written back as new decision traces, improving future retrieval quality without retraining the underlying model. This makes the context graph a self-improving organizational memory layer.

**Example:** When a human reviewer corrects an agent's contract interpretation, the corrected decision is written to the context graph, making the right precedent available for future similar cases.

**See also:** Training Data from Traces, Human-in-the-Loop, Agent Write-Back

#### Agent Loop

The iterative execution cycle of an AI agent: perceive inputs, reason about next steps, take an action (such as a tool call or graph query), observe results, and repeat until the task is complete or a stopping condition is reached.

The agent loop is the fundamental unit of agent execution. Context graphs participate in the loop at the retrieval step, providing decision traces that inform the agent's reasoning at each iteration. The efficiency of the loop depends heavily on how quickly and precisely context can be retrieved from the graph.

**See also:** ReAct Pattern, Plan-and-Execute Pattern, AI Agent Execution Path

#### Agent Memory Architecture

The design of how an AI agent stores and retrieves information across tasks, sessions, and time horizons.

Context graphs serve as the long-term, structured memory tier in a well-designed agent memory architecture. Unlike vector stores (which provide fuzzy semantic recall) or in-context scratchpads (which are ephemeral), context graphs provide precise, queryable, auditable organizational memory that persists across all agent sessions.

**See also:** Long-Term Memory for AI, Short-Term vs Long-Term Memory, Context Graph as Memory Layer

#### Agent Orchestration

The coordination of multiple AI agents working on related subtasks, including routing, sequencing, error handling, and aggregating results.

Orchestration layers that coordinate context-graph-aware agents must manage context budget allocation: multiple agents querying the same graph simultaneously can produce redundant or conflicting context unless the orchestrator mediates retrieval. Well-designed orchestration also ensures that write-back from all agents is consistent and non-duplicative.

**Example:** An orchestration layer coordinates three specialized agents — policy lookup, precedent retrieval, and draft generation — each allocated a separate context budget from the shared context graph.

**See also:** Multi-Agent System, Agent Loop, Agent Context Budget

#### Agent Planning

The process by which an AI agent decomposes a high-level goal into a sequence of subtasks, tool calls, or reasoning steps.

In context graph systems, planning quality depends on whether the agent has access to relevant organizational knowledge at plan-generation time. Injecting a compact summary of relevant decision traces before planning begins produces more accurate and organizationally-aligned plans than planning from general knowledge alone.

**See also:** Plan-and-Execute Pattern, Agent Loop, ReAct Pattern

#### Agent Rate Limiting

A control that restricts the number of requests an AI agent can make to a system — such as a context graph API — within a defined time window.

Rate limiting protects context graph infrastructure from agent runaway loops and denial-of-service scenarios. Agents that enter error-retry loops can generate enormous query volumes against a graph database, degrading performance for all users. Rate limiting combined with exponential backoff is the standard mitigation.

**See also:** Agent Retry Pattern, Context Graph SLA, Context Graph Monitoring

#### Agent Read Pattern

The design pattern governing how an AI agent queries a context graph to retrieve relevant organizational context before reasoning or generating a response.

The read pattern determines retrieval efficiency and completeness. Common patterns include: single-shot batch retrieval (retrieve all needed context in one query before generation), iterative retrieval (retrieve progressively as reasoning develops), and streaming retrieval (retrieve in parallel with generation). The right pattern depends on the task structure, context graph query complexity, and latency requirements.

**See also:** Context Graph Read Path, ReAct Pattern, Multi-Hop Retrieval

#### Agent Retry Pattern

A design pattern in which an AI agent automatically retries a failed operation after a delay, optionally with modified parameters.

In context graph retrieval, retry patterns must be designed carefully to avoid amplifying bad queries. If an initial graph query returns no results, the retry should broaden the query scope (e.g., loosen temporal constraints) rather than repeating the identical query — otherwise the agent wastes tokens and latency with no improvement.

**See also:** Agent Error Recovery, Agent Rate Limiting, Context Graph Query Pattern

#### Agent Sandboxing

A security practice that isolates an AI agent's execution environment to limit the blast radius of errors, prompt injection attacks, or adversarial inputs.

Sandboxing is especially important for agents that have write access to context graphs. An agent that can be manipulated via prompt injection into writing false decision traces could corrupt organizational memory in ways that persist long after the attack — a severe and silent failure mode.

**See also:** Prompt Injection Risk, Agent Authorization, Zero-Trust Graph Architecture

#### Agent Trace

A machine-generated record of an AI agent's execution path, including inputs, tool calls, graph queries, intermediate outputs, and final results.

Agent traces are distinct from human-authored decision traces but serve a complementary role: they provide a ground-truth record of what the agent did and why, enabling debugging, auditing, and the creation of training data. When stored in the context graph, agent traces can be queried by future agents to avoid repeating past mistakes.

**See also:** Agent Decision Log, Decision Trace, Audit Trail Design

#### Agent Write-Back

The pattern by which an AI agent writes new information — such as a decision trace, resolved entity, or updated property — back to the context graph after completing a task.

Write-back is the mechanism by which agent execution enriches organizational memory over time. Without write-back, each agent run is ephemeral; with it, the context graph accumulates machine-generated knowledge that improves future retrieval. Designing safe write-back schemas is critical: agents should write structured, schema-validated nodes rather than free-form text.

**Example:** After completing a vendor onboarding workflow, an agent writes a structured decision node to the context graph recording the approval chain, policy version, and outcome — available for the next vendor evaluation.

**See also:** Context Graph Write Path, Agent Decision Log, Event-Driven Graph Update

#### AI Agent Execution Path

The sequence of operations, tool calls, context retrievals, and reasoning steps that an AI agent follows from receiving a task to producing a final output.

Understanding the execution path is critical for context graph integration design: at which steps does the agent need organizational context, what type of context is needed, and how should retrieved context be formatted for use at each step? Instrumenting the execution path with observability tooling enables diagnosis of whether failures originate in retrieval, reasoning, or generation.

**Example:** An agent's execution path for a credit exception includes: (1) retrieve customer entity from context graph, (2) fetch recent exception precedents, (3) retrieve applicable policy version, (4) generate recommendation, (5) write decision trace back to graph.

**See also:** Agent Loop, ReAct Pattern, Agent Trace

#### AI Agent Loop

The iterative execution cycle of an AI agent: perceive inputs, reason about next steps, take an action (such as a tool call or graph query), observe results, and repeat until the task is complete or a stopping condition is reached.

The agent loop is the fundamental execution unit of AI agent systems. Context graphs participate in the loop primarily at the retrieval action step, providing decision traces that inform the agent's reasoning at each iteration. Optimizing the loop for context efficiency — retrieving only the context needed at each step rather than all potentially relevant context at the start — reduces token cost without sacrificing accuracy.

**See also:** ReAct Pattern, Plan-and-Execute Pattern, Agent Context Budget

#### AI Red Teaming

A structured adversarial evaluation process in which a team deliberately attempts to find vulnerabilities, failure modes, and safety issues in an AI system by simulating attacks and edge cases.

Red teaming context-graph-augmented LLMs must go beyond evaluating model outputs to also testing the retrieval layer: can an attacker influence what context is retrieved? Can malicious content in the graph cause the agent to take harmful actions? Can the retrieval layer be manipulated to return adversarially crafted precedents? These graph-specific attack vectors are absent from standard LLM red teaming frameworks.

**See also:** Prompt Injection Risk, Context Injection Attack, Agent Sandboxing

#### Algorithmic Accountability

The principle that organizations deploying automated decision-making systems must be able to explain, justify, and take responsibility for the outputs those systems produce.

Context graphs directly support algorithmic accountability by preserving the full decision trace — including the context retrieved, the policy versions referenced, and the human approvals obtained — for every automated decision. This makes accountability auditable rather than aspirational, satisfying both internal governance and external regulatory requirements.

**See also:** Explainability by Design, Decision Record Format, EU AI Act

#### Append-Only Log

A data structure in which records are added sequentially and existing records are never modified or deleted, creating an immutable history of events.

Append-only logs are the natural write pattern for decision traces: each new decision is appended rather than overwriting prior state, preserving a complete audit trail. Context graphs built on append-only principles support temporal queries — "what did the organization know at time T?" — that are impossible with mutable stores.

**See also:** Event Sourcing, Immutable Audit Trail, Temporal Versioning

#### Approval Chain

The ordered sequence of individuals or roles whose authorization is required for a decision to be considered valid within an organizational policy.

Approval chains are a first-class construct in context graph modeling. Storing them as directed edges between actor nodes enables LLMs to answer questions like "who approved this exception?" and "what is the standard approval path for this decision type?" without requiring joins across multiple enterprise systems.

**Example:** A context graph stores the approval chain for a $2M vendor contract as a sequence of edges: Procurement Manager → VP Finance → CFO, each with timestamp and rationale properties.

**See also:** Decision Actor, Out-of-Band Approval, Approval Edge

#### Approval Edge

A directed edge in a context graph connecting two nodes to represent that one actor approved a decision, action, or transition at a specific point in time.

Approval edges make authorization history queryable rather than buried in email threads or ticketing systems. They are a key structural element for compliance use cases where auditors need to verify that the correct approval chain was followed for a given decision.

**Example:** An approval edge connects a `BudgetDecision` node to a `Person:CFO` node with properties `{timestamp: "2024-03-15", method: "Docusign", policy_version: "FP-2024-Q1"}`.

**See also:** Approval Chain, Decision Node, Out-of-Band Approval

#### Approximate Nearest Neighbor

An algorithm that efficiently finds vectors in a high-dimensional space that are close (but not necessarily closest) to a query vector, trading exact accuracy for significant speed gains.

Approximate nearest neighbor search is the engine behind vector-based context retrieval. In hybrid architectures combining context graphs with vector stores, ANN search handles semantic similarity retrieval while graph traversal handles precise structural queries. Understanding the accuracy-speed tradeoff is essential for designing retrieval pipelines that meet both latency and quality SLAs.

**See also:** HNSW Index, Vector Database, Hybrid Retrieval

#### ARR Definition Conflict

A situation in which multiple definitions of Annual Recurring Revenue exist within an organization, causing different teams to calculate and report different ARR figures.

ARR definition conflicts are a canonical example of the organizational knowledge gap that context graphs are designed to solve. When an LLM is asked to report ARR, it must know not just the formula but which version of the formula is canonical for which reporting context. A context graph storing metric definition decision traces enables the LLM to retrieve the right definition for the right context.

**Example:** Sales reports ARR including month-to-month contracts; Finance excludes them. The context graph stores both definitions, their provenance, and the decision trace recording the CFO's ruling on which to use for board reporting.

**See also:** Business Metric, Semantic Layer, Finance Workflow AI System

#### Attribute-Based Access Control

An access control model in which permissions are granted based on attributes of the user, the resource, and the environment, rather than on fixed role assignments.

ABAC is well-suited to context graphs because decision traces carry rich attributes — department, sensitivity level, time period, actor roles — that can be used to construct fine-grained access policies. This allows a single context graph to serve multiple teams with different access needs without duplicating data.

**Example:** A policy grants read access to compensation decision traces only when the requesting agent's attributes include `department=HR` AND `clearance=L4` AND `purpose=compensation_review`.

**See also:** Access Control, Row-Level Security in Graph, Zero-Trust Graph Architecture

#### Audit Log

A chronological, immutable record of actions taken within a system, including who performed each action, what was done, and when.

Audit logs are a compliance requirement in most regulated industries. Context graphs extend traditional audit logs by adding structured relationships: rather than a flat list of events, the context graph represents the causal and approval relationships between decisions, making it possible to reconstruct the full decision context during an audit.

**See also:** Audit Trail Design, Decision Trace, Compliance Reporting

#### Audit Trail Design

The deliberate architecture of how audit records are structured, stored, linked, and made queryable to support compliance investigations and regulatory reporting.

Context graphs provide a superior audit trail design compared to flat log files because relationships between decisions, actors, policies, and outcomes are first-class graph elements. Auditors can traverse the graph to answer complex questions — "show me every exception to policy X approved by role Y in Q3" — that would require expensive SQL joins or manual document review in traditional systems.

**Example:** An audit trail in a context graph links each regulatory decision to the specific policy version in effect at decision time, the approving actor, and any prior precedents cited — all queryable in a single graph pattern match.

**See also:** Audit Log, Decision Record Format, Compliance Reporting

#### Authoritative Source

A designated system, database, or record that is recognized as the single most reliable and official source for a specific data element or entity within an organization.

In context graph architectures, knowing the authoritative source for each entity type is critical for write-back design: decision traces should reference entities from authoritative sources rather than local copies, ensuring that graph queries return organizationally consistent results. Without authoritative source tracking, the same entity may appear with conflicting properties from multiple systems.

**See also:** Master Data Management, Canonical Entity Model, Data Ownership

#### Automated Decision Regulation

Laws, standards, or organizational policies that govern when and how automated systems may make or recommend decisions, typically requiring explainability, auditability, and human oversight mechanisms.

Context graphs are a natural compliance architecture for automated decision regulation: by recording every decision trace with full context, they provide the explainability and audit capabilities required by regulations such as GDPR Article 22, the EU AI Act, and sector-specific frameworks in finance and healthcare.

**See also:** EU AI Act, GDPR Explainability Requirement, Algorithmic Accountability

#### Automated Metadata Discovery

The process of using software tools to automatically scan data sources, infer metadata (such as column types, relationships, and data patterns), and populate a metadata catalog without manual input.

Automated metadata discovery accelerates the construction of context graphs by identifying entities, relationships, and data elements across enterprise systems that human catalogers would miss or document too slowly. However, automatically discovered metadata requires validation before being used as context for LLMs — incorrect metadata injected into an LLM prompt is a silent failure mode.

**See also:** Active Metadata Management, Metadata Catalog Platform, Data Dictionary

#### Backfill Strategy

A plan for populating a data store with historical data that predates the system's creation, typically applied when a new pipeline is deployed and historical coverage is needed.

Backfilling a context graph with historical decision traces is a common deployment challenge. Without backfill, the graph lacks the precedent depth that makes LLM-assisted decisions accurate — the system is most useful when it has seen many similar decisions before. Backfill strategies must balance completeness against the cost of reconstructing historical context from imperfect source records.

**Example:** A legal compliance context graph was backfilled with five years of contract exceptions reconstructed from email archives and ticketing systems before the live LLM agent was deployed.

**See also:** Batch Ingestion, Context Graph Migration, Historical Precedent

#### Batch Ingestion

The process of loading data into a system in large, discrete chunks on a scheduled basis, as opposed to continuous real-time streaming.

Batch ingestion is appropriate for context graph elements that change infrequently — such as policy documents, organizational hierarchies, or historical decision archives. For decision traces that must be current to support live LLM queries, batch ingestion introduces latency that can cause context staleness. Architects must choose ingestion modes based on the freshness requirements of each context graph element type.

**See also:** Real-Time Ingestion, Event-Driven Ingestion, Context Graph Ingestion Pattern

#### Beachhead Workflow

The first high-value, bounded workflow selected for AI deployment, chosen to maximize the probability of demonstrable success and organizational learning.

Selecting the right beachhead is the most consequential early decision for context graph deployments. The ideal beachhead is exception-heavy (so the context graph's precedent retrieval provides immediate value), involves cross-system data (so the graph's integration advantage is visible), and has measurable outcomes (so ROI can be demonstrated to secure further investment).

**Example:** A financial services firm chose the credit exception approval workflow as its beachhead: high volume, policy-intensive, and cross-departmental — exactly the conditions where context graph memory outperforms manual lookup.

**See also:** First Workflow Selection, Pilot Program Design, Exception-Heavy Workflow

#### Bias Detection

The process of identifying systematic, unfair patterns in data, model outputs, or decision processes that disadvantage particular groups or produce consistently skewed results.

Context graphs support bias detection by making historical decision patterns queryable at scale. If an LLM-assisted system consistently recommends different outcomes for structurally similar cases that differ only in protected attributes, the decision trace graph can surface this pattern in ways that flat audit logs cannot.

**See also:** Fairness Audit, Algorithmic Accountability, Decision Record Format

#### Billion-Edge Graph

A graph database deployment containing one billion or more edges, representing large-scale enterprise knowledge graphs or operational graphs.

Billion-edge graphs require careful index design, query optimization, and sharding strategies to deliver sub-second query performance for LLM context retrieval. Most enterprise context graphs will not initially reach this scale, but architects must design schemas and query patterns that will scale gracefully as decision traces accumulate over years.

**See also:** Property Graph Scale, Graph Sharding, Graph Index

#### Bitemporal Modeling

A data modeling technique that tracks two independent time dimensions: valid time (when a fact was true in the real world) and transaction time (when the fact was recorded in the system).

Bitemporal modeling is essential for context graphs used in compliance and audit scenarios. An auditor asking "what policy was in effect when this decision was made, using the data available at that time?" requires both time dimensions. Without bitemporal support, the context graph may return current policy or current data rather than the state at decision time — a silent, consequential failure.

**See also:** Valid Time, Transaction Time, Bitemporal Query

#### Bitemporal Query

A query that filters or reasons across both the valid time and transaction time dimensions of a bitemporal data model.

Bitemporal queries enable precise historical reconstruction: "what did we know on date X about facts that were true on date Y?" This capability is critical for regulatory investigations, where auditors must reconstruct the exact context available to a decision-maker at a specific moment — not the current state of organizational knowledge.

**Example:** A bitemporal query retrieves the credit policy that was valid on March 1 and was recorded in the system before March 5, isolating the exact policy version an underwriter would have seen when making a decision.

**See also:** Bitemporal Modeling, Valid Time, Transaction Time

#### BLEU Score

A metric for evaluating the quality of machine-generated text by measuring its overlap with one or more reference texts, originally designed for machine translation evaluation.

BLEU score is of limited value for evaluating context-graph-augmented LLMs because it measures surface similarity rather than factual accuracy. An LLM that correctly grounds its output in retrieved decision traces may produce text that differs significantly from a reference answer while being more accurate — BLEU would score it lower. Faithfulness score is a more appropriate metric for context-grounded generation.

**See also:** Faithfulness Score, LLM Evaluation Metric, Hallucination Mitigation

#### BM25

A probabilistic term-frequency ranking function used in information retrieval to score documents by their lexical relevance to a query.

BM25 is the backbone of sparse retrieval systems and is widely used in hybrid retrieval architectures that combine keyword matching with semantic vector search. For context graph query pipelines, BM25 can efficiently pre-filter candidate decision traces by keyword before a reranking step applies more expensive semantic similarity scoring.

**See also:** Sparse Retrieval, Hybrid Retrieval, Dense Retrieval

#### Business Glossary

A curated collection of standardized definitions for business terms, metrics, and concepts used within an organization, maintained to ensure consistent communication across teams.

A business glossary is a foundational element of the enterprise knowledge graph and a primary input to context graph construction. When an LLM is asked about a business metric or process, the context graph should retrieve the authoritative glossary definition to ground the response — preventing the model from hallucinating or using a colloquial definition that differs from the official one.

**Example:** The business glossary entry for "customer churn" specifies the exact 90-day inactivity window used by the Customer Success team, preventing an LLM from applying the 30-day definition used in marketing reports.

**See also:** Data Dictionary, Semantic Layer, Authoritative Source

#### Business Metadata

Metadata that describes the business meaning, ownership, and usage context of a data element, as opposed to its technical structure or format.

Business metadata — including data owner, business definition, and usage policy — is among the most valuable content in an enterprise context graph. LLMs asked to generate reports, answer data questions, or audit decisions need business metadata to avoid technical-correct-but-business-wrong outputs. Injecting business metadata into the context window is a high-ROI use of the available token budget.

**See also:** Technical Metadata, Data Dictionary, Data Stewardship

#### Business Metric

A quantitative measure defined by an organization to track performance against business objectives, typically with a precise formula, data source, and reporting cadence.

Business metrics are frequent sources of ambiguity in enterprise AI: the same metric name may have multiple definitions across teams. Context graphs that store metric definitions as nodes — with edges to authoritative sources, policy versions, and historical definition changes — enable LLMs to retrieve the correct metric definition for the correct reporting context rather than hallucinating a formula.

**See also:** ARR Definition Conflict, Semantic Layer, Business Glossary

#### Canonical Entity Model

A standardized representation of a business entity — such as Customer, Product, or Employee — that serves as the authoritative schema for that entity across all systems in an organization.

Canonical entity models are the foundation of cross-system entity linking in context graphs. When decision traces from HR, Finance, and CRM all reference the same Customer entity using a canonical identifier and schema, graph queries can traverse across these domains without requiring system-specific translation at query time.

**See also:** Entity Resolution, Master Data Management, Cross-System Entity Linking

#### Center of Excellence

A dedicated team or organizational unit that develops, maintains, and disseminates best practices, tooling, and governance for a specific capability — in this context, AI and context graph systems.

A Center of Excellence for context graph AI accelerates adoption by centralizing expertise in graph schema design, LLM integration patterns, and context retrieval optimization. Without a CoE, each team rebuilds the same capabilities independently, creating inconsistent implementations that cannot share context graph infrastructure.

**See also:** Cross-Functional AI Team, Executive Sponsorship, Adoption Roadmap

#### Centrality Measure

A graph algorithm metric that quantifies the importance or influence of a node within a network based on its structural position.

Centrality measures can identify the most influential decision-makers, policies, or entities in a context graph by analyzing the structure of approval chains and precedent links. High-centrality nodes — such as a policy document referenced by thousands of decisions — are candidates for pre-fetching into context rather than being retrieved on demand.

**See also:** PageRank, Graph Algorithm, Community Detection

#### Chain-of-Thought with Context

A prompting technique that combines retrieved contextual information with step-by-step reasoning instructions, enabling an LLM to reason through complex problems using both its parametric knowledge and retrieved organizational context.

Chain-of-thought with context is a powerful pattern for decision-support applications where the reasoning process — not just the conclusion — must be explainable and auditable. By injecting decision trace context before the reasoning chain, the model's steps are grounded in organizational facts rather than generalizations, improving both accuracy and explainability.

**Example:** A compliance agent receives a chain-of-thought prompt that includes the relevant policy excerpt, three precedent decisions from the context graph, and instructions to reason step-by-step before concluding.

**See also:** Few-Shot Context Injection, Prompt Engineering with Context, Grounding Strategy

#### Change Data Capture

A data integration technique that identifies and captures incremental changes in a source database — inserts, updates, and deletes — and propagates them to downstream systems in near real-time.

Change data capture is a critical ingestion pattern for keeping context graphs synchronized with enterprise source systems. When an employee record is updated in HR, a contract is signed in CLM, or a policy is revised in the policy management system, CDC ensures the context graph reflects the change before the next LLM query — preventing stale context from driving incorrect outputs.

**See also:** Event-Driven Ingestion, Real-Time Ingestion, Context Freshness

#### Change Data Feed

A mechanism that emits a stream of structured change events whenever data in a source system is modified, enabling downstream consumers to maintain synchronized copies.

Change data feeds differ from CDC in that they are typically designed as first-class interfaces rather than database log taps. For context graphs, change data feeds from authoritative source systems are preferred when available, as they provide clean, schema-validated events that map more directly to graph write operations than raw database logs.

**See also:** Change Data Capture, Event Stream, Event-Driven Graph Update

#### Change Management

The structured process of preparing, supporting, and guiding individuals, teams, and organizations through transitions to new processes, systems, or ways of working.

Change management is a frequently underestimated requirement for context graph deployments. The systems capture and expose organizational decision-making in unprecedented detail, which can create political resistance from teams concerned about transparency. Effective change management frames the context graph as organizational memory that benefits everyone, not surveillance infrastructure.

**See also:** Stakeholder Alignment, Adoption Barrier, Executive Sponsorship

#### Closed World Assumption

A logical assumption that states: if a fact is not known to be true in the system, it is assumed to be false — the absence of information implies negation.

The closed world assumption is the correct default for enterprise context graphs. In organizational decision-making, absence of an approval edge means the decision was not approved; absence of a policy reference means no policy was consulted. Systems designed under the open world assumption cannot make these organizationally meaningful inferences from missing data, creating a dangerous gap between what the graph says and what the organization needs to know.

**See also:** Open World Assumption, Graph vs Relational Model, Ontology

#### Code List

A controlled set of permissible values for a data element, where each value has a standardized code and human-readable label.

Code lists in context graphs serve as reference nodes that decision traces link to — ensuring that values like "approval status," "risk category," or "product type" are consistently interpreted across all systems contributing to the graph. When an LLM retrieves a decision trace, the code list context prevents misinterpretation of coded values.

**See also:** Reference Data Management, Permissible Value, Value Domain

#### Column Naming Standard

An organizational rule specifying how database columns should be named, typically covering format, abbreviation, semantic qualifiers, and domain prefixes.

Column naming standards are a form of metadata governance that directly affects LLM text-to-SQL accuracy. When a context graph stores the naming conventions and column semantic mappings for an organization's data assets, an LLM generating SQL queries can retrieve this context to produce syntactically correct and semantically accurate queries.

**See also:** Naming Convention Standard, Data Dictionary, Semantic Consistency

#### Column-Level Lineage

Data lineage tracked at the granularity of individual columns, showing exactly which upstream columns contributed to each downstream column through transformation logic.

Column-level lineage is the most precise form of lineage and provides the highest-value context for LLMs answering data questions. When a business user asks "where does this metric come from?", column-level lineage in the context graph enables an exact, verifiable answer rather than a system-level approximation.

**Example:** Column-level lineage shows that `revenue_adjusted` is derived from `gross_revenue` minus `returns_amount`, both from the `orders` table, with a currency conversion factor applied.

**See also:** Upstream Lineage, Downstream Lineage, Lineage Graph

#### Community Detection

A graph algorithm that identifies clusters of densely interconnected nodes within a graph, revealing natural groupings or communities.

Community detection applied to a context graph can reveal clusters of related decisions, shared policy frameworks, or cross-departmental approval patterns that are not visible in individual decision traces. These insights can inform context retrieval strategies: related decisions within a community are more likely to be relevant precedents than randomly selected traces.

**See also:** Graph Algorithm, Centrality Measure, Graph Clustering

#### Competitive Moat

A sustainable structural advantage that protects an organization's market position from competitors.

For context graph startups, the competitive moat is the accumulated organizational memory stored in the graph: decision traces, exception patterns, and precedent chains that have been captured over months or years of deployment. This data is difficult for competitors to replicate, grows more valuable with each decision recorded, and is deeply integrated into the organization's workflows.

**See also:** Context Graph Startup, Structural Advantage, Organizational Memory

#### Complementary Knowledge Layers

The architectural pattern of combining multiple knowledge representation systems — such as a context graph, vector store, and relational database — each optimized for different types of knowledge and retrieval patterns.

Complementary knowledge layers recognize that no single storage system optimally handles all enterprise knowledge types. A well-designed LLM platform uses a context graph for precise structural knowledge and decision traces, a vector store for semantic similarity search over unstructured documents, and a relational database for transactional queries — with a retrieval layer that routes queries to the appropriate layer.

**See also:** Hybrid Storage Architecture, Context Graph vs Vector Store, Hybrid Retrieval

#### Compliance Gap Analysis

A systematic review that identifies the difference between an organization's current practices and the requirements of applicable laws, regulations, or internal policies.

Context graphs accelerate compliance gap analysis by making decision patterns queryable. Rather than manually reviewing thousands of decisions, auditors can run graph queries to identify decisions that lacked required approvals, referenced outdated policy versions, or deviated from established precedents — surfacing gaps in hours rather than weeks.

**See also:** Regulatory Compliance, Compliance Reporting, Audit Trail Design

#### Compliance Reporting

The process of generating documentation or reports that demonstrate adherence to regulatory requirements, internal policies, or audit standards.

Context graphs transform compliance reporting from a manual, document-intensive process to a graph query operation. Because decision traces store the full context of each decision — actors, policies, timestamps, precedents — compliance reports can be generated programmatically, reducing both cost and the risk of human error in report preparation.

**See also:** Audit Log, Regulatory Compliance, Governance Report

#### Concept Harmonization

The process of aligning equivalent or overlapping concepts across multiple ontologies, schemas, or data dictionaries to create a unified, consistent view.

Concept harmonization is a prerequisite for building cross-system context graphs. When HR calls a worker an "Employee," Finance calls them a "Cost Center Resource," and CRM calls them an "Account Owner," the context graph must resolve these to a canonical concept before decision traces from these systems can be meaningfully linked.

**See also:** Ontology Mapping, Entity Resolution, Canonical Entity Model

#### Conceptual Domain

The set of valid values or meanings associated with a data element concept, defined at a semantic level independent of any specific technical representation.

Conceptual domains in ISO 11179 provide the semantic scaffolding for data standardization. In context graphs, conceptual domains constrain what values are permissible for node properties and edge attributes, ensuring that retrieved context is interpretable by LLMs without ambiguity about what a value means.

**See also:** Value Domain, ISO 11179 Standard, Data Element Concept

#### Conformance Checking

A process mining technique that compares actual execution traces from an event log against a reference process model to identify deviations.

Conformance checking applied to context graphs enables identification of decision processes that deviated from policy — not just in individual decisions but as systematic patterns. When the reference process is stored as a graph model, conformance checking becomes a graph pattern matching problem, enabling efficient automated compliance verification.

**See also:** Process Mining, Process Discovery, Event Log

#### Context Binding

The association of a data element or concept with the specific organizational, regulatory, or operational context in which it is valid or applicable.

Context binding prevents LLMs from applying definitions or rules from the wrong organizational context. A context graph that stores context bindings enables retrieval to be scoped: "give me the definition of 'revenue' as used in the European regulatory reporting context" returns a different result than the same query for the US GAAP context.

**See also:** ISO 11179 Standard, Data Definition, Semantic Consistency

#### Context Completeness

The degree to which the information injected into an LLM's context window contains all the facts necessary to answer the query correctly and completely.

Context completeness is in tension with token efficiency — the book's core thesis. Retrieving more context increases completeness but consumes more tokens and increases cost. Context graphs address this tension by enabling precise, structured retrieval: rather than retrieving large document chunks, the graph retrieves exactly the decision nodes, edges, and properties needed to answer the query.

**See also:** Context Pruning, Context Compression, Missing Context Failure Mode

#### Context Compression

A technique for reducing the token count of retrieved context while preserving the information necessary for the LLM to generate accurate responses.

Context compression is a critical component of token efficiency in context graph systems. Graph-structured context is particularly amenable to compression: edges can be serialized concisely, redundant properties can be omitted, and only the subgraph most relevant to the query needs to be included. Effective compression reduces cost without degrading answer quality.

**See also:** Context Window Budget, Context Pruning, Subgraph Extraction

#### Context Conflict Resolution

The process of identifying and resolving contradictions between multiple pieces of retrieved context before injecting them into an LLM's prompt.

Context conflicts arise when a context graph contains multiple decision traces that took different positions on the same question, or when a policy has been revised but old decisions referenced the prior version. Unresolved conflicts injected into the context window cause LLM outputs to be inconsistent or hedged. Resolution strategies include temporal ordering (prefer newer), authority ordering (prefer higher-level decisions), or explicit flagging for human review.

**See also:** Context Freshness Check, Knowledge Staleness, Context Graph Update Pattern

#### Context Freshness

The property of retrieved context being current enough to support accurate LLM responses, measured by the time elapsed since the underlying information was last updated.

Context freshness is one of the most critical operational properties of a context graph. Stale policy versions, outdated entity properties, or superseded decisions injected into an LLM prompt produce confidently wrong outputs. Context graphs must track the valid time of each node and edge to enable freshness checks during retrieval.

**See also:** Knowledge Staleness, Context Freshness Check, Active Metadata Management

#### Context Freshness Check

A validation step in the context retrieval pipeline that verifies retrieved context is within an acceptable staleness threshold before injecting it into an LLM prompt.

Freshness checks are a runtime guardrail that prevents outdated organizational knowledge from grounding LLM responses. Implementation options include: timestamp-based checks against a configurable threshold, version-comparison checks against the current policy version, or explicit invalidation signals from source systems via change data capture.

**See also:** Context Freshness, Knowledge Staleness, Context Graph Monitoring

#### Context Graph Access Control

The set of rules, mechanisms, and enforcement points that govern which principals can read, write, or modify specific elements of a context graph.

Context graph access control must operate at multiple levels: graph-level (which graphs a principal can access), subgraph-level (which decision domains are visible), and property-level (which properties of a node can be read). This multi-level control is necessary because a single context graph often serves agents and users with very different authorization profiles.

**See also:** Access Control, Row-Level Security in Graph, Attribute-Based Access Control

#### Context Graph Alerting

A monitoring capability that generates notifications when predefined conditions in a context graph are detected, such as staleness thresholds exceeded, anomalous write patterns, or query performance degradation.

Alerting closes the observability loop for context graph operations. Silent failures — such as a CDC pipeline that stops ingesting changes, causing the graph to silently serve stale context — are the most dangerous failure mode. Alerting on staleness indicators catches these before they cause downstream LLM errors.

**See also:** Context Graph Monitoring, Context Graph Observability, Context Freshness Check

#### Context Graph API

A programmatic interface through which external systems, agents, and users interact with a context graph — performing reads, writes, and administrative operations.

The context graph API is the integration surface that determines how easily the graph can be consumed by LLM agents and enterprise systems. Well-designed APIs expose high-level operations (e.g., "get relevant precedents for this decision type") rather than low-level graph primitives, reducing the query complexity that agents must manage and enabling more efficient context retrieval.

**See also:** Context Graph REST API, Context Graph GraphQL API, Context Graph SDK

#### Context Graph as Memory Layer

The architectural role of a context graph as a persistent, structured, queryable store of organizational knowledge that AI agents use to maintain continuity across sessions and tasks.

This framing distinguishes context graphs from traditional databases (which store current state) and document stores (which store unstructured content). As a memory layer, the context graph stores the organizational decisions, precedents, and relationships that give AI agents the same institutional knowledge a long-tenured employee would have — but queryable at machine speed.

**See also:** Agent Memory Architecture, Long-Term Memory for AI, Organizational Memory

#### Context Graph Caching

A performance optimization in which frequently accessed or recently retrieved context graph query results are stored in memory for rapid reuse, reducing latency and graph database load.

Caching is important for context graph deployments where many agents query for similar context (e.g., the same policy versions or frequently cited precedents). Cached context must carry invalidation logic tied to graph updates — a cached policy version that has been superseded must be evicted before it is served to a new query.

**See also:** Context Graph Performance Tuning, Context Graph SLA, Context Freshness Check

#### Context Graph Cardinality

The quantitative description of the number of nodes, edges, and properties in a context graph, including estimates of how these counts will grow over time.

Cardinality planning is essential for context graph infrastructure sizing and query performance prediction. Decision traces accumulate at rates proportional to organizational activity; a firm processing thousands of approvals daily will grow its context graph by millions of nodes per year. Cardinality estimates inform index design, sharding decisions, and context retrieval query optimization.

**See also:** Property Graph Scale, Billion-Edge Graph, Graph Index

#### Context Graph Constraint

A rule enforced at the graph database level that ensures the structural or semantic validity of context graph data, such as requiring that every decision node has a timestamp or that approval edges only connect to authorized actor nodes.

Graph constraints are the last line of defense against malformed context graph entries. Unlike application-level validation, graph constraints are enforced by the database regardless of which system writes to the graph — preventing schema drift caused by new ingestion paths that bypass application validation logic.

**See also:** Graph Constraint Enforcement, Graph Schema Governance, Context Graph Schema

#### Context Graph Cost Model

A framework for estimating and managing the total cost of operating a context graph, including infrastructure, ingestion, storage, query compute, and LLM token costs.

The cost model must account for the interaction between graph query efficiency and LLM token costs: a slower graph query that retrieves more precise context may reduce total cost by avoiding token waste on irrelevant content. Optimizing the context graph cost model requires co-optimization of graph performance and context window utilization.

**See also:** Context Graph ROI Model, Context Window Budget, Token

#### Context Graph Definition

A context graph is a structured, persistent, graph-based store of organizational decision traces — including the actors, policies, data, and precedents involved — designed to be retrieved and injected into an LLM's context window to ground AI-generated outputs in organizational reality.

This definition distinguishes context graphs from general knowledge graphs (which represent factual knowledge) and from vector stores (which enable semantic search). The context graph's defining characteristic is its focus on decisions and their context — the "why" of organizational behavior — rather than facts about the world.

**See also:** Decision Trace, Knowledge Graph, Context Graph vs Knowledge Graph

#### Context Graph Deployment Pattern

A standardized architecture for deploying a context graph in an enterprise environment, covering infrastructure, networking, access control, and integration topology.

Deployment patterns encode hard-won operational experience: how to co-locate the graph with the LLM inference service to minimize retrieval latency, how to isolate write paths from read paths for reliability, and how to handle cross-region deployments for global organizations. Using established patterns reduces the risk of deployment-time surprises.

**See also:** Context Graph Storage Layer, Context Graph SLA, Context Graph Monitoring

#### Context Graph Edge Types

The defined categories of directed relationships that can exist between nodes in a context graph, each with a specified semantic meaning and permissible property set.

Edge types are the relational vocabulary of a context graph. Well-defined edge types — such as `APPROVED_BY`, `REFERENCES_POLICY`, `PRECEDED_BY`, `ESCALATED_TO` — make decision traces queryable with precision. Poorly defined edge types create ambiguity that causes LLMs to misinterpret retrieved relationships.

**See also:** Context Graph Node Types, Graph Schema Governance, Approval Edge

#### Context Graph GraphQL API

A GraphQL interface for querying and mutating a context graph, providing a typed, self-documenting schema that LLM agents and client applications can use to retrieve decision context.

GraphQL is well-suited to context graph APIs because its hierarchical query structure mirrors the subgraph extraction pattern: clients specify exactly which node properties and edge traversals they need, preventing over-fetching that wastes token budget. The self-documenting schema also enables LLM tool use patterns where the agent discovers available query shapes at runtime.

**See also:** Context Graph API, Context Graph REST API, Subgraph Extraction

#### Context Graph Index Design

The selection and configuration of indexes on a context graph database to support the query patterns required for efficient context retrieval.

Index design is a primary performance lever for context graph query latency. LLM context retrieval is latency-sensitive: every millisecond of graph query time adds to the end-to-end response time perceived by users. Indexes on high-selectivity properties (such as entity IDs, decision timestamps, and policy version identifiers) are essential for sub-100ms retrieval.

**See also:** Graph Index, Context Graph Performance Tuning, Context Graph SLA

#### Context Graph Lifecycle

The stages through which a context graph evolves, from initial schema design and data loading through active use, growth, maintenance, and eventual migration or archival.

Managing the lifecycle requires different practices at each stage: schema flexibility during design, backfill completeness during loading, freshness maintenance during active use, and careful archival policies as the graph grows. Lifecycle planning prevents the common failure mode of a context graph that starts strong but degrades in quality over time as ingestion pipelines drift.

**See also:** Context Graph Migration, Context Graph Versioning, Schema Evolution

#### Context Graph Merge

The operation of combining two or more separately maintained context graphs into a single unified graph, typically required when organizations merge or when siloed graph deployments are consolidated.

Graph merges are complex operations requiring entity resolution across the source graphs — the same decision actor or policy may be represented differently in each source. Unresolved duplicates after a merge produce inconsistent context that confuses LLMs: the same approval chain may appear as two separate chains rather than one.

**See also:** Graph Deduplication, Entity Resolution, Context Graph Migration

#### Context Graph Migration

The process of moving context graph data from one schema version, storage system, or deployment environment to another while preserving data integrity and query semantics.

Migration is a lifecycle inevitability: as organizational processes evolve, the context graph schema must evolve with them. Migrations must be backward-compatible for active LLM agents that depend on existing query patterns — a schema change that breaks running agents is a silent failure mode that may not surface immediately.

**See also:** Schema Evolution, Context Graph Versioning, Context Graph Lifecycle

#### Context Graph Monitoring

The operational practice of continuously measuring context graph system health, data quality, ingestion freshness, and query performance to ensure reliable LLM context retrieval.

Monitoring is the operational foundation of a production context graph. Key metrics include: ingestion lag (how far behind source systems is the graph?), query latency percentiles, staleness rate (what percentage of retrieved context exceeds freshness thresholds?), and write error rates. Without monitoring, degradation is invisible until it causes LLM output failures.

**See also:** Context Graph Alerting, Context Graph Observability, Context Freshness Check

#### Context Graph Node Types

The defined categories of nodes in a context graph, each representing a distinct type of entity, event, policy, or actor within the organizational decision domain.

Node types are the vocabulary of organizational memory. Typical context graph node types include: `Decision`, `Actor`, `Policy`, `Entity` (e.g., Customer, Contract), `Exception`, and `Outcome`. Clear node type definitions enable LLMs to interpret retrieved subgraphs without ambiguity about what each node represents.

**See also:** Context Graph Edge Types, Context Graph Schema, Decision Node

#### Context Graph Observability

The capability to understand the internal behavior of a context graph system from its external outputs — logs, metrics, and traces — without requiring special debugging access.

Observability goes beyond monitoring: it enables root cause analysis when LLM outputs degrade. If an agent starts producing inaccurate outputs, observability tooling should allow engineers to trace the query, inspect the retrieved subgraph, compare it to expected content, and identify whether the failure was a retrieval problem, a staleness problem, or a generation problem.

**See also:** Context Graph Monitoring, Context Graph Alerting, Agent Trace

#### Context Graph Performance Tuning

The process of optimizing a context graph system's query execution speed, ingestion throughput, and resource utilization to meet defined performance requirements.

Performance tuning encompasses graph index optimization, query plan analysis, caching configuration, and hardware scaling. For LLM context retrieval, the most impactful tuning target is usually query latency for the most common retrieval patterns — the p99 latency of "find relevant precedents for this decision type" directly affects end-user experience.

**See also:** Context Graph Index Design, Context Graph Caching, Context Graph SLA

#### Context Graph Prompt Template

A reusable prompt structure that includes placeholders for context retrieved from a context graph, designed to consistently and safely inject organizational knowledge into LLM requests.

Prompt templates encode retrieval-to-generation contracts: they specify which context graph query results map to which prompt sections, how retrieved entities should be formatted, and what instructions should accompany the context. Standardized templates reduce prompt engineering toil and make it easier to update retrieval logic without rewriting prompts from scratch.

**See also:** Prompt Engineering with Context, Context Graph API, Context Injection Attack

#### Context Graph Query Pattern

A recurring, reusable graph query structure designed to efficiently retrieve a specific type of context from the context graph, such as "find all precedents for this decision type in the last 12 months."

Query patterns are the building blocks of context retrieval. Designing and cataloging canonical query patterns for common LLM use cases — exception lookup, approval chain reconstruction, policy version retrieval — enables caching, pre-computation, and performance optimization that ad-hoc queries cannot benefit from.

**See also:** Cypher Query Language, Context Graph Index Design, Context Retrieval

#### Context Graph Read Path

The sequence of operations executed when an LLM agent or application retrieves context from a context graph, including query execution, result filtering, ranking, and serialization.

The read path must be designed for low latency, high availability, and isolation from write operations. Read-path performance directly affects LLM response time; write-path operations should not degrade read-path SLAs. Common patterns include read replicas, dedicated read endpoints, and result caching for high-frequency queries.

**See also:** Context Graph Write Path, Context Graph SLA, Context Graph Caching

#### Context Graph Relationship Design

The process of defining the edge types, directionality, cardinality constraints, and property schemas for the relationships in a context graph.

Relationship design is where most of the semantic value of a context graph is created or lost. Overly generic relationships (e.g., using a single `RELATED_TO` edge type for all connections) make it impossible to write precise queries. Overly granular relationships increase schema complexity without retrieval benefit. The goal is a relationship vocabulary that is expressive enough to answer the LLM's questions and simple enough to maintain.

**See also:** Context Graph Edge Types, Graph Schema Governance, Context Graph Schema

#### Context Graph Replication

The process of maintaining synchronized copies of a context graph across multiple nodes or regions for high availability, disaster recovery, or geographic distribution.

Replication must account for the write patterns of context graphs: decision traces are written asynchronously from multiple source systems, and replicas must converge quickly to prevent agents in different regions from seeing different organizational memory. Consistency vs. latency tradeoffs in replication strategy have direct implications for context freshness.

**See also:** Graph Replication, Context Graph Deployment Pattern, Context Graph SLA

#### Context Graph REST API

A RESTful HTTP interface for performing CRUD operations and specialized queries on a context graph, typically used for integration with enterprise systems and LLM agent frameworks.

REST APIs for context graphs must balance query expressiveness with simplicity. Specialized endpoints for common retrieval patterns (e.g., `GET /decisions/{type}/precedents`) are more efficient than requiring clients to compose graph queries, reducing both client complexity and the risk of unintentional full-graph scans.

**See also:** Context Graph API, Context Graph GraphQL API, Context Graph SDK

#### Context Graph ROI Model

A framework for quantifying the return on investment of deploying a context graph, accounting for cost reductions, quality improvements, and risk mitigation attributable to improved LLM context.

ROI models for context graphs must capture both direct savings (reduced manual research time, faster audit preparation) and indirect value (fewer LLM hallucinations leading to bad decisions, improved regulatory compliance). The strongest ROI cases are workflows where the cost of a wrong AI decision is quantifiable and the context graph demonstrably reduces error rates.

**See also:** Context Graph Cost Model, ROI Measurement, Decision Quality Metric

#### Context Graph Schema

The formal definition of the node types, edge types, property names, data types, and constraints that govern the structure of data stored in a context graph.

Schema design is the most consequential architectural decision in a context graph deployment. A well-designed schema enables precise, low-latency retrieval; a poorly designed schema requires expensive workarounds at query time. Schemas must balance current completeness against future flexibility — overly rigid schemas break when organizational processes evolve.

**See also:** Graph Schema Governance, Context Graph Constraint, Schema Drift

#### Context Graph SDK

A software development kit that provides programming language-specific libraries for building applications that interact with a context graph, abstracting the underlying query language and API details.

SDKs lower the integration barrier for teams building LLM applications on top of context graphs. A well-designed SDK provides typed interfaces for common operations (write a decision trace, query precedents, link entities), built-in retry and error handling, and integration hooks for popular LLM frameworks — reducing the time from idea to working prototype.

**See also:** Context Graph API, Context Graph REST API, Context Graph GraphQL API

#### Context Graph SLA

A service level agreement that defines the performance, availability, and data freshness commitments for a context graph system as experienced by LLM agents and consuming applications.

Context graph SLAs must specify both infrastructure metrics (query latency p99, uptime percentage) and data quality metrics (maximum acceptable staleness, maximum context incompleteness rate). Data quality SLAs are often more impactful than infrastructure SLAs: a fast query that returns stale context is worse than a slightly slower query that returns current context.

**See also:** Context Graph Monitoring, Context Graph Performance Tuning, Context Freshness

#### Context Graph Snapshot

A point-in-time copy of a context graph capturing the complete state of all nodes, edges, and properties at a specific moment, used for backup, migration, testing, or historical analysis.

Snapshots are essential for compliance scenarios where auditors need to reconstruct the exact organizational knowledge available at a specific date. A context graph snapshot from the date of a disputed decision can be queried to verify what context an LLM agent had access to — providing a defensible record for regulatory investigations.

**See also:** Bitemporal Modeling, Context Graph Migration, Context Graph Versioning

#### Context Graph Startup

An organization that builds and commercializes context graph technology as a product or service, typically targeting enterprises seeking to augment LLM systems with structured organizational knowledge.

Context graph startups occupy a distinctive market position: they are purpose-built for the organizational memory problem that general-purpose graph databases and vector stores do not address. The competitive strategy typically involves landing in one high-value workflow, accumulating decision trace data that creates switching costs, and expanding across the organization.

**See also:** Competitive Moat, Beachhead Workflow, Enterprise AI Market

#### Context Graph Storage Layer

The underlying database and storage infrastructure that persists context graph data, including the graph database engine, associated vector indexes, and complementary storage systems.

Storage layer selection determines the query capabilities, scalability ceiling, and operational complexity of the context graph. Property graph databases (supporting Cypher/GQL) are the natural choice for the structural graph layer; vector indexes complement them for semantic similarity retrieval. Multi-model databases that support both in a single system reduce operational overhead.

**See also:** Property Graph Database Selection, Hybrid Storage Architecture, Vector Index Layer

#### Context Graph Test Pattern

A standardized approach for testing the correctness, performance, and reliability of context graph queries, ingestion pipelines, and LLM integration logic.

Testing context graphs requires specialized patterns beyond standard unit and integration tests. Query regression tests verify that schema changes do not break retrieval results. Freshness tests verify that ingestion pipelines are keeping the graph current. End-to-end tests verify that retrieved context actually improves LLM output quality for known test cases.

**See also:** Context Graph Observability, Agent Evaluation, Context Graph Deployment Pattern

#### Context Graph Testing Strategy

A comprehensive plan for validating the correctness, performance, and reliability of a context graph deployment — covering schema validation, ingestion pipeline testing, retrieval accuracy testing, and end-to-end integration testing.

Testing context graphs requires a multi-layer strategy because failures can originate at any layer: schema violations that pass ingestion, retrieval queries that return correct structure but wrong content, or integration failures where correct graph outputs produce incorrect LLM responses. Each layer requires different testing techniques, and end-to-end tests are needed to catch cross-layer failure interactions.

**See also:** Context Graph Test Pattern, Agent Evaluation, Context Graph Observability

#### Context Graph Tool Definition

A structured specification — in the format expected by an LLM's function-calling interface — that describes a context graph query operation as a callable tool, including its name, description, input parameters, and expected output format.

Tool definitions are the API contract between LLM agents and context graphs. A well-designed tool definition is specific enough to guide the agent toward appropriate use — "retrieve the approval chain for a given decision ID" — while generic enough to handle the range of inputs the agent will encounter. Overly broad tool definitions produce expensive, imprecise graph queries; overly narrow ones force agents to make multiple calls where one would suffice.

**Example:** A tool definition for `get_decision_precedents` specifies: decision_type (string), entity_id (string, optional), time_window_days (integer, default 365), max_results (integer, default 5) — returning a structured list of matching decision traces.

**See also:** Function Calling Pattern, Tool Use, Context Graph API

#### Context Graph Update Pattern

A design pattern for safely modifying context graph data in response to new information, corrections, or organizational changes while preserving historical accuracy and audit integrity.

Update patterns must respect the immutable nature of historical decision traces. New information should be added as new nodes with temporal edges to prior nodes rather than modifying existing records. This append-based update strategy preserves the historical record while making the current state queryable — essential for both LLM grounding and compliance auditing.

**See also:** Context Graph Write Path, Temporal Versioning, Append-Only Log

#### Context Graph Versioning

A strategy for managing changes to context graph schema, data content, and API contracts over time, enabling backward compatibility and controlled evolution.

Versioning is required because context graphs are long-lived infrastructure. LLM agents deployed months ago may depend on specific schema shapes; a version bump that changes node property names or edge types will break them silently. Semantic versioning with deprecation windows and migration tooling is the standard approach for production context graphs.

**See also:** Schema Evolution, Context Graph Migration, Context Graph Lifecycle

#### Context Graph vs Database

A comparison highlighting how a context graph differs from traditional relational or NoSQL databases in purpose, query model, and suitability for LLM context retrieval.

Traditional databases optimize for transactional consistency and tabular query efficiency; context graphs optimize for traversal queries, relationship semantics, and the structured representation of decision provenance. A relational database can store the same facts as a context graph, but reconstructing a multi-hop decision chain from normalized tables requires expensive joins that graph traversal performs natively.

**See also:** Graph vs Relational Model, Context Graph Definition, Context Graph Query Pattern

#### Context Graph vs Knowledge Graph

A distinction between a context graph — focused on organizational decisions, actors, and precedents — and a general knowledge graph, which represents factual knowledge about the world or a domain.

Knowledge graphs answer "what is true about this entity?" Context graphs answer "what did our organization decide, and why, and who approved it?" The two are complementary but serve different purposes. A knowledge graph is an appropriate input to a context graph (as background factual context), but cannot substitute for it when organizational memory is what the LLM needs.

**See also:** Knowledge Graph, Context Graph Definition, Complementary Knowledge Layers

#### Context Graph vs Vector Store

A distinction between a context graph — which stores structured, typed, traversable relationships — and a vector store, which stores dense embeddings for semantic similarity search.

Vector stores excel at "find me something semantically similar to this query" but cannot answer "show me the approval chain for this specific decision" or "which policy version was in effect when this exception was approved." Context graphs answer precise structural questions that vector stores cannot, while vector stores handle fuzzy semantic retrieval that graph queries cannot. The two are complementary.

**See also:** Vector Database, Complementary Knowledge Layers, Hybrid Retrieval

#### Context Graph Write Path

The sequence of operations executed when new information — such as a decision trace, entity update, or policy revision — is written to a context graph, including validation, schema enforcement, and index updates.

Write path design must balance completeness (capturing all relevant context) against latency (decisions are made in real-time and traces must be recorded before the decision is complete). Event-driven write patterns that capture context asynchronously are common, but they introduce a window of context staleness that must be accounted for in SLA design.

**See also:** Context Graph Read Path, Event-Driven Graph Update, Context Graph Constraint

#### Context Injection Attack

A prompt injection attack in which an adversary embeds malicious instructions within content that will be retrieved as context and injected into an LLM's prompt, causing the model to execute unintended actions.

Context injection attacks are a critical security concern for context graph systems. If an attacker can write to the context graph — or influence the content of source systems that feed the graph — they can inject instructions that override the system prompt, exfiltrate retrieved context, or cause the agent to take harmful actions. Defense requires input validation at write time and sandboxing at agent execution time.

**See also:** Prompt Injection Risk, Agent Sandboxing, Context Graph Access Control

#### Context Poisoning

The degradation of LLM output quality caused by incorrect, outdated, or adversarially crafted information being present in the context window at generation time.

Context poisoning is a superset of context injection attacks: it includes both adversarial manipulation and accidental corruption from stale data, schema errors, or resolution failures. Context graphs reduce poisoning risk by providing structured, validated, access-controlled context — but only if the graph's data quality and access controls are rigorously maintained.

**See also:** Hallucination, Context Injection Attack, Context Freshness

#### Context Problem

The fundamental challenge in enterprise AI deployment: LLMs lack access to the specific organizational knowledge, decisions, and context needed to generate accurate, trustworthy outputs for complex enterprise tasks.

The context problem is the book's central thesis. General LLMs are trained on public knowledge and cannot know an organization's specific policies, past decisions, exceptions, and precedents. Solving the context problem — by building systems that efficiently retrieve and inject the right organizational knowledge — is the trillion-dollar enterprise AI opportunity.

**See also:** Organizational Knowledge Gap, Retrieval-Augmented Generation, Context Graph Definition

#### Context Pruning

The process of removing low-relevance or redundant information from retrieved context before injecting it into an LLM's prompt, reducing token consumption without degrading answer quality.

Context pruning is a core token efficiency technique. Graph-retrieved context is naturally prunable: edges with low relevance scores, properties that are not needed for the current query, and nodes that are peripherally connected to the main decision chain can be removed before serialization. Effective pruning requires understanding which context elements the LLM actually uses to generate accurate responses.

**See also:** Context Compression, Context Window Budget, Subgraph Extraction

#### Context Relevance

The degree to which retrieved context is pertinent to the current query, measured by its contribution to the accuracy and appropriateness of the LLM's generated response.

Context relevance determines retrieval quality: high-recall retrieval that surfaces many potentially relevant traces is useless if the LLM cannot efficiently use the relevant subset among many irrelevant ones. Context graphs enable precision-oriented retrieval — using typed graph queries rather than semantic similarity alone — which typically delivers higher relevance at lower token cost.

**See also:** Relevance Ranking, Context Reranking, Hybrid Retrieval

#### Context Reranking

A post-retrieval step in which initially retrieved context items are reordered by a more precise relevance model before final selection and injection into the LLM prompt.

Reranking bridges the gap between fast first-pass retrieval (which optimizes for recall) and the high-precision context that LLMs need (which requires accurate relevance ordering). For context graphs, reranking can combine graph structure signals (e.g., how many approval hops from the relevant decision?) with semantic similarity scores to produce the most relevant ordered context set.

**See also:** Relevance Ranking, Hybrid Retrieval, Context Pruning

#### Context Retrieval

The process of identifying and fetching the most relevant organizational knowledge from a context graph or other external store, given the current query or task context.

Context retrieval is the most critical component of a RAG or context-graph-augmented LLM system. Retrieval quality directly determines generation quality: irrelevant or missing context leads to hallucination; relevant, precise context leads to grounded, accurate outputs. Graph-based retrieval enables richer query patterns — multi-hop traversal, temporal filtering, relationship-typed matching — than vector search alone.

**See also:** Hybrid Retrieval, Multi-Hop Retrieval, Context Graph Query Pattern

#### Context Window Budget

The total number of tokens available in an LLM's context window for a given request, allocated across system prompt, retrieved context, conversation history, and response.

Managing the context window budget is the operational manifestation of the book's core thesis: token efficiency. Every token spent on system prompt boilerplate is a token unavailable for organizational context. Context graphs enable high-information-density context injection — structured facts rather than verbose documents — maximizing the value of the available budget.

**See also:** Context Window Limit, Context Compression, Agent Context Budget

#### Context Window Limit

The maximum number of tokens an LLM model can process in a single request, including both input (prompt + context) and output (generated response).

Context window limits are the hard constraint that makes context retrieval optimization necessary. Even as context windows grow to 128K or 1M tokens, injecting full organizational knowledge bases remains impractical — token costs scale linearly, making efficient selection essential. Context graphs address this by enabling precise subgraph retrieval rather than brute-force document injection.

**See also:** Context Window Budget, Token, Context Compression

#### Context Window Management

The set of techniques and strategies for allocating, optimizing, and monitoring the use of an LLM's context window capacity across different categories of content.

Effective context window management treats the context window as a scarce resource to be deliberately allocated. Context graphs provide structured access to high-value organizational knowledge that should receive priority budget allocation; low-value boilerplate and redundant context should be systematically eliminated through compression and pruning techniques.

**See also:** Context Window Budget, Context Compression, Context Pruning

#### Context-Aware Generation

An LLM generation mode in which the model's outputs are explicitly conditioned on retrieved contextual information, constraining the model to generate responses that are grounded in the provided context.

Context-aware generation is the primary operational mode for LLMs augmented with context graphs. Rather than generating from parametric knowledge alone, the model is instructed to ground its outputs in the retrieved decision traces, policy excerpts, and entity relationships — reducing hallucination and improving alignment with organizational norms.

**See also:** Grounding, Grounding Strategy, Retrieval-Augmented Generation

#### Counterfactual Trace

A decision trace variant that records what would have happened under alternative conditions — such as if a different policy had been in effect or a different actor had made the decision — used for analysis, training, and explainability.

Counterfactual traces are valuable for AI governance: they enable auditors to assess whether a different decision-maker or policy would have produced different outcomes, surfacing systematic biases or policy gaps. In context graphs, counterfactual traces are stored as separate nodes with explicit links to the original decision and the alternative assumptions.

**See also:** Decision Trace, Explainability by Design, Bias Detection

#### CQRS Pattern

Command Query Responsibility Segregation — an architectural pattern that separates write operations (commands) from read operations (queries) into distinct models, APIs, or services.

CQRS is a natural fit for context graph architecture because write patterns (recording decision traces in real time) and read patterns (retrieving context for LLM queries) have fundamentally different performance, consistency, and schema requirements. Implementing CQRS for context graphs allows the read model to be optimized for low-latency retrieval without being constrained by write-path requirements.

**See also:** Append-Only Log, Event Sourcing, Context Graph Read Path

#### CRM Graph Integration

The process of ingesting customer relationship management system data — accounts, contacts, opportunities, interaction history — into a graph database to enable relationship traversal and context retrieval.

CRM graph integration enables LLMs to answer complex relationship questions: "what is the full decision history for this account, including escalations, pricing exceptions, and renewal conversations?" This context is essential for customer success and sales agents that need institutional memory about specific customer relationships rather than generalized product knowledge.

**See also:** Cross-System Entity Linking, Account History Graph, Sales Engagement Use Case

#### Cross-Department Use Case

An AI workflow that spans multiple organizational departments, requiring context from sources that each department maintains independently.

Cross-department use cases are where context graphs provide their greatest value: the graph serves as the integration layer that links entities, decisions, and precedents from HR, Finance, Legal, and Operations into a unified queryable memory. LLMs tackling cross-department tasks without this integration are forced to work with incomplete context from whichever single system they have access to.

**See also:** Cross-System Entity Linking, Federated Graph Architecture, Hub-and-Spoke Graph Architecture

#### Cross-Enterprise Data Dictionary

A shared data dictionary that standardizes data element definitions across multiple organizations, divisions, or systems within a large enterprise or industry.

Cross-enterprise data dictionaries address the ambiguity that arises when LLMs are asked to work with data from multiple organizational units that use different terms for the same concepts. A context graph that stores cross-enterprise dictionary entries as nodes enables agents to retrieve the right translation between organizational vocabularies before generating reports or analytics.

**See also:** Business Glossary, Data Dictionary, Concept Harmonization

#### Cross-Functional AI Team

An organizational team combining AI/ML engineers, data engineers, domain experts, and product managers to build and maintain AI systems for specific business workflows.

Cross-functional teams are the organizational unit that owns context graph deployments in practice. The graph spans multiple domains (data engineering for ingestion, ML for retrieval, domain expertise for schema design), requiring a team structure that bridges these disciplines. Siloed teams that own only one layer consistently produce context graphs that are technically sound but organizationally unusable.

**See also:** Center of Excellence, Change Management, Stakeholder Alignment

#### Cross-Graph Reference

A pointer or link from a node in one context graph to a node in a separate graph, used to federate context across graph deployments without requiring full consolidation.

Cross-graph references enable federated context graph architectures where individual departments maintain their own graphs but share entity references. An LLM agent can traverse cross-graph references to retrieve context from multiple graph deployments in a single query, avoiding the data governance challenges of full graph consolidation.

**See also:** Federated Graph Architecture, Cross-System Entity Linking, Graph Sharding

#### Cross-System Entity Linking

The process of identifying and linking records that represent the same real-world entity across multiple source systems, enabling unified traversal of information about that entity.

Cross-system entity linking is a prerequisite for context graphs that span multiple enterprise systems. Without it, the same customer, employee, or contract appears as multiple unconnected nodes in the graph — preventing LLMs from retrieving the complete organizational context about a single entity from a unified query.

**See also:** Entity Resolution, Canonical Entity Model, Master Data Management

#### Cross-System Synthesis

The capability of a context graph to integrate and synthesize information from multiple source systems — HR, Finance, CRM, Legal — into a unified, traversable organizational memory that no single source system contains.

Cross-system synthesis is the defining value proposition of context graphs over single-system RAG approaches. A decision about a customer may involve CRM account history, Finance payment records, Legal contract terms, and HR relationship ownership — all linked through the context graph's canonical entity layer into a single queryable decision context. No document retrieval system can synthesize this multi-system context as precisely.

**See also:** Cross-System Entity Linking, Enterprise Knowledge Graph, Hub-and-Spoke Graph Architecture

#### Cube (Semantic Layer)

A multidimensional data structure that pre-aggregates metrics along defined dimensions, enabling fast analytical queries without requiring raw data access.

Semantic layer cubes are reference context for LLMs answering analytical questions: rather than requiring the model to reason about raw data structures, the cube's pre-defined metrics and dimensions provide the authoritative calculation logic. Context graphs that link business questions to relevant cubes enable more reliable LLM-generated analytics.

**See also:** OLAP Semantic Layer Tool, Business Metric, Semantic Layer

#### Current State Bias

The tendency of AI systems to retrieve and emphasize the current state of organizational entities — roles, policies, metrics — rather than the state at the time of a historical decision, producing anachronistic context.

Current state bias is a silent, consequential failure mode in context graphs without bitemporal modeling. When an agent retrieves the "current" credit policy for context about a 2022 decision, it may apply a 2024 policy that didn't exist at decision time — producing an evaluation that is anachronistically strict or lenient. Bitemporal modeling eliminates this bias by enabling point-in-time retrieval.

**See also:** Bitemporal Modeling, Legacy System Bias, Valid Time

#### Custody Chain

A documented record of all parties that have handled, modified, or had custody of a data artifact or decision record, from its origin to its current state.

Custody chains are a compliance requirement in data-sensitive industries and a natural element of context graph design. When a decision trace records every system that touched a piece of data — ETL pipeline, transformation service, reporting layer — the resulting custody chain enables investigators to identify where data quality issues were introduced.

**See also:** Data Provenance, Lineage vs Provenance, Audit Trail Design

#### Customer Success Use Case

The application of context-graph-augmented LLMs to customer success workflows — including account health monitoring, renewal risk assessment, escalation handling, and success plan development.

Customer success is a high-value context graph use case because its effectiveness depends entirely on institutional memory: what has the organization promised this customer, what issues have arisen, what exceptions have been granted, and who owns the relationship? Context graphs that store account history graphs enable AI agents to provide genuinely informed, relationship-aware customer success support.

**See also:** Account History Graph, Sales Engagement Use Case, CRM Graph Integration

#### Cypher Query Language

A declarative graph query language originally developed for Neo4j that uses ASCII-art pattern syntax to express node and relationship matching, filtering, and traversal operations.

Cypher is the most widely adopted property graph query language and is the primary interface for querying context graphs in many deployments. Its pattern-matching syntax maps naturally to decision trace queries: `MATCH (d:Decision)-[:APPROVED_BY]->(a:Actor)-[:HAS_ROLE]->(r:Role)` reads almost like plain English, making it accessible to domain experts who need to inspect organizational memory.

**See also:** openCypher Standard, GQL Standard, Graph Pattern Matching

#### Data Accuracy

The degree to which data values correctly represent the real-world attributes they are intended to describe.

In context graphs, data accuracy directly determines LLM output quality. An inaccurate policy version, wrong approval timestamp, or mislinked entity in a decision trace causes the LLM to generate responses grounded in false organizational facts. Accuracy validation at ingestion time is more cost-effective than detecting accuracy errors after they have propagated into agent outputs.

**See also:** Data Quality, Data Completeness, Data Consistency

#### Data Anonymization

The process of permanently transforming personally identifiable information so that individuals cannot be re-identified, even when the anonymized data is combined with other datasets.

Context graphs storing HR, customer, or patient decision traces must handle anonymization carefully. Anonymized traces can still be queried for precedent patterns without exposing individual identities, but the anonymization must be applied consistently across all linked nodes — partial anonymization that leaves re-identification paths via graph traversal is a footgun.

**See also:** Data Masking, Differential Privacy, GDPR Explainability Requirement

#### Data Classification

The process of categorizing data elements by sensitivity, confidentiality level, or regulatory requirement to determine appropriate handling, access control, and retention policies.

Data classification nodes in a context graph inform access control at retrieval time: an LLM agent requesting context about a high-sensitivity decision trace must be verified to have the appropriate clearance before the trace is returned. Classification metadata injected into the context window also helps the LLM calibrate the appropriate level of care in its outputs.

**See also:** Access Control, Data Governance Framework, Attribute-Based Access Control

#### Data Completeness

The degree to which all required data values are present and populated for a given data element or record.

In context graphs, completeness gaps in decision traces — missing approval timestamps, absent policy references, or unlinked actor nodes — degrade retrieval quality and create audit vulnerabilities. Completeness constraints enforced at write time prevent incomplete traces from being ingested, while completeness monitoring identifies gaps in historical backfills.

**See also:** Data Quality, Context Completeness, Graph Constraint Enforcement

#### Data consistency

The property of data being free of contradictions, with values that are coherent and compatible across all representations and storage locations within a system.

Consistency is particularly challenging in context graphs that ingest from multiple source systems: the same decision may be recorded differently in HR, Finance, and the ticketing system. Consistency enforcement during entity resolution and cross-graph merging prevents the LLM from retrieving contradictory context about the same organizational event.

**See also:** Data Quality, Concept Harmonization, Entity Resolution

#### Data Contract

A formal, versioned agreement between a data producer and a data consumer specifying the schema, quality standards, freshness requirements, and SLAs for a data product.

Data contracts for context graph ingestion pipelines provide the governance mechanism to prevent unilateral schema changes in source systems from silently breaking context graph structure. When a source system team changes their data contract, the context graph team is notified and can update the ingestion pipeline before the change propagates to production.

**See also:** Data SLA, Schema Registry, Schema Drift

#### Data Definition

A precise, unambiguous statement of the meaning of a data element, typically including its concept, representation, and constraints.

Data definitions are the atomic unit of organizational knowledge that LLMs most frequently need. When an agent is asked to calculate a metric, join two datasets, or interpret a code value, the data definitions of the relevant elements — stored as context graph nodes — provide the grounding that prevents hallucinated interpretations.

**See also:** ISO 11179 Standard, Business Glossary, Data Element

#### Data Dictionary

A comprehensive reference document or system that defines the meaning, format, source, and usage of data elements within an organization or system.

Data dictionaries stored as context graph nodes enable LLMs to retrieve authoritative field definitions at query time rather than hallucinating meanings from column names. This is among the highest-ROI applications of context graphs: injecting the correct data dictionary entry for each field referenced in a query dramatically reduces semantic errors in LLM-generated SQL and reports.

**See also:** Business Glossary, Business Metadata, Data Element

#### Data Element

The smallest unit of data that is meaningful in a given context — a specific combination of a data element concept and a value domain, typically corresponding to a column or field.

Data elements are the leaves of the enterprise knowledge graph. Context graphs store data elements as nodes with properties capturing their definition, authoritative source, data type, permissible values, and steward. LLMs querying these nodes can understand exactly what a field means before generating any operation that references it.

**See also:** Data Element Concept, ISO 11179 Standard, Data Dictionary

#### Data Element Concept

The combination of an object class and a property that defines the conceptual meaning of a data element, independent of its representation or format.

Data element concepts provide the semantic layer between raw data and business meaning. A context graph that stores data element concepts as nodes — linked to both their object classes and their technical representations — enables LLMs to answer questions like "what does this column actually represent?" with authoritative precision.

**See also:** Data Element, Object Class, ISO 11179 Standard

#### Data Element Versioning

The practice of maintaining multiple versions of a data element definition over time, with clear version identifiers and validity periods, to support temporal queries and change tracking.

Versioning is critical for compliance: when a regulatory auditor asks "what did 'net revenue' mean when this report was filed in 2022?", the context graph must be able to return the 2022-valid definition rather than the current one. Without versioning, definition evolution silently changes the meaning of historical records.

**See also:** Context Graph Versioning, Temporal Versioning, ISO 11179 Standard

#### Data Governance Framework

A structured set of policies, processes, roles, and standards that govern how data is managed, used, and protected within an organization.

Data governance frameworks define the organizational context within which context graphs operate: who owns each data domain, what quality standards apply, and what access controls are required. Context graphs that surface governance metadata — data stewards, ownership, quality scores — alongside decision traces give LLMs the organizational context to understand data authority and reliability.

**See also:** Data Stewardship, Data Ownership, Policy Enforcement

#### Data Lake

A centralized storage repository that holds large volumes of raw, unstructured, and semi-structured data in its native format until needed for analysis.

Data lakes are a common source system for context graph ingestion: event logs, decision records, and entity data stored in raw form in the lake can be transformed and loaded into the context graph. The key challenge is extracting structured, semantically meaningful context from loosely formatted lake data without introducing errors that corrupt organizational memory.

**See also:** Data Lakehouse, Graph ETL Pipeline, Batch Ingestion

#### Data Lakehouse

A data architecture that combines the raw storage capabilities of a data lake with the structured query and governance capabilities of a data warehouse on a single platform.

Lakehouses are increasingly the enterprise data platform on which context graphs are built, providing both the raw event data needed for decision trace reconstruction and the structured metadata needed for entity resolution. Context graphs complement the lakehouse by adding the relationship and provenance layer that lakehouse query engines handle poorly.

**See also:** Data Lake, Graph ETL Pipeline, Hybrid Storage Architecture

#### Data Masking

The process of replacing sensitive data values with realistic but fictitious substitutes, typically to enable use of production-like data in development, testing, or analytics environments without exposing real values.

Data masking in context graphs must be applied consistently across all linked nodes: masking a person's name on a Decision node but leaving it unmasked on an Actor node linked to the same decision re-exposes the identity via graph traversal. This graph-traversal re-identification risk is a footgun specific to graph storage that does not exist in flat file masking.

**See also:** Data Anonymization, Differential Privacy, Row-Level Security in Graph

#### Data Mesh

A decentralized data architecture in which domain teams own and publish their data as products, with a federated governance model coordinating standards across domains.

Data mesh principles align well with federated context graph architectures: each domain team maintains their own decision trace graph, with shared entity identifiers and schema standards enabling cross-domain context retrieval. The data mesh governance layer provides the standards enforcement that prevents each domain's graph from drifting into incompatibility.

**See also:** Federated Graph Architecture, Data Contract, Data Product

#### Data Observability

The capability to continuously monitor data quality, freshness, volume, and schema conformance in data pipelines and storage systems to detect anomalies before they impact downstream consumers.

Data observability for context graph ingestion pipelines catches the silent failures that cause LLM context degradation: a pipeline that stops flowing (staleness), a source schema change that causes parse failures (incompleteness), or a deduplication failure that causes entity proliferation (inaccuracy). Observability tooling that instruments these failure modes is a prerequisite for production context graph reliability.

**See also:** Context Graph Monitoring, Data Quality, Active Metadata Management

#### Data Ownership

The organizational assignment of responsibility for the accuracy, completeness, and appropriate use of a specific data asset to a designated individual or team.

Data ownership is the governance prerequisite for context graph write-back authority: only the designated owner of a data domain should have write permission to the corresponding context graph subgraph. Unclear ownership creates contention and inconsistency as multiple teams write conflicting context to the same graph region.

**See also:** Data Stewardship, Data Governance Framework, Authoritative Source

#### Data Product

A data asset that is treated as a product — with defined consumers, quality SLAs, versioning, and ownership — rather than as a byproduct of operational systems.

Context graphs can be treated as data products: they have defined consumers (LLM agents), quality SLAs (freshness, completeness), versioning (schema versions), and ownership (domain teams). Applying data product thinking to context graph management raises the operational bar and creates clearer accountability for graph quality.

**See also:** Data Mesh, Data Contract, Data SLA

#### Data Provenance

The documented origin, history, and transformation chain of a data artifact, from its creation through all subsequent modifications and movements.

Data provenance stored in a context graph enables LLMs to answer "where did this number come from?" with full traceability rather than approximation. In regulated industries, provenance is a compliance requirement: financial reports must trace to authoritative source data, and the context graph's provenance edges provide the auditable chain of evidence.

**See also:** Custody Chain, Lineage vs Provenance, Upstream Lineage

#### Data Purge Policy

A formal policy specifying when and how data must be permanently deleted, typically driven by regulatory requirements, retention schedules, or privacy obligations.

Data purge policies create tension in context graph design: decision traces are most valuable when they accumulate over long periods, but GDPR and similar regulations may require deletion of personal data within defined windows. Designing context graphs with purge-compatible schemas — where personal identifiers are stored as separable properties rather than embedded in trace content — enables compliance without destroying the decision history.

**See also:** Data Retention Policy, GDPR Explainability Requirement, Compliance Reporting

#### Data Quality

The degree to which data is fit for its intended use, typically measured across dimensions including accuracy, completeness, consistency, timeliness, and validity.

Data quality is the operational foundation of context graph utility: low-quality context retrieved into an LLM's prompt produces low-quality outputs, and the LLM's confident tone makes quality problems invisible to end users. Context graph deployments require explicit data quality measurement and enforcement at every layer — ingestion, storage, and retrieval.

**See also:** Data Accuracy, Data Completeness, Data Consistency

#### Data Quality Rule

A formal, executable condition that defines what constitutes valid data for a specific data element or record, used to validate data at ingestion or query time.

Data quality rules for context graphs should be encoded as graph constraints where possible, catching violations at write time rather than at query time. Examples include: "every Decision node must have a timestamp property," "Approval edges must connect Actor nodes to Decision nodes (not to each other)," and "policy version references must resolve to existing Policy nodes."

**See also:** Data Quality, Graph Constraint Enforcement, Context Graph Constraint

#### Data Retention Policy

A formal policy specifying how long different categories of data must be retained before they may be deleted or archived.

Retention policies shape the temporal depth of context graphs: long retention windows provide more historical precedent for LLM reasoning, while short windows may be required by regulation or storage cost constraints. The retention policy must be implemented at the subgraph level rather than the whole-graph level, since different decision types may have different retention requirements.

**See also:** Data Purge Policy, Data Classification, Compliance Reporting

#### Data Silo

An isolated data store maintained by a specific team or system that is not accessible or integrated with other data stores in the organization.

Data silos are the primary obstacle to building comprehensive context graphs. When decision traces, entity records, and policy documents are scattered across disconnected silos, no single query can retrieve the full organizational context needed for accurate LLM responses. Context graphs serve as the integration layer that bridges silos without requiring full data consolidation.

**See also:** Cross-System Entity Linking, Federated Graph Architecture, Integration Tax

#### Data SLA

A service level agreement that defines the quality, freshness, availability, and completeness commitments for a data product or pipeline.

Data SLAs for context graph ingestion define the maximum acceptable lag between a decision being made in a source system and its trace being available for LLM retrieval. Tight SLAs (minutes) require event-driven ingestion; looser SLAs (hours) permit batch ingestion. The SLA must be calibrated to the freshness requirements of the LLM use cases the context graph supports.

**See also:** Data Contract, Context Graph SLA, Real-Time Ingestion

#### Data Standardization

The process of converting data from multiple sources into a common format, terminology, and representation to enable integration and comparison.

Data standardization is a prerequisite for cross-system context graphs: decision traces from HR, Finance, and Legal must use standardized entity identifiers, timestamps, and terminology before they can be usefully traversed together. Without standardization, graph queries must embed system-specific translation logic that makes them brittle and slow.

**See also:** Concept Harmonization, Canonical Entity Model, ISO 11179 Standard

#### Data Stewardship

The active management and oversight of data quality, definitions, access controls, and lifecycle for a specific data domain by a designated steward.

Data stewards are the human governance layer above the context graph's technical infrastructure. They define what decision types should be captured, validate that ingested traces meet quality standards, and adjudicate disputes about data definitions — providing the organizational accountability that automated systems cannot replace.

**See also:** Data Ownership, Data Governance Framework, Governance Role

#### Data Timeliness

The degree to which data is available and current when it is needed for a given use case.

Timeliness is the freshness dimension of data quality and is especially critical for context graphs: stale policy versions, outdated entity states, or delayed decision traces can cause LLMs to generate responses based on organizational facts that no longer reflect reality. Timeliness SLAs for context graph ingestion must be defined based on the rate of change of each data type.

**See also:** Context Freshness, Data Quality, Active Metadata Management

#### Data Virtualization

A data integration approach that provides a unified logical view of data from multiple sources without physically moving or copying the data, by federating queries at runtime.

Data virtualization can complement context graphs by providing access to source system data that is too volatile or too large to copy into the graph. For LLM context retrieval, virtualization trades latency (query-time federation is slower than graph reads) for freshness (the source system is always current). The tradeoff must be evaluated per data element type.

**See also:** Query Federation, Federated Graph Architecture, Virtual View

#### Data Warehouse Gap

The inability of traditional data warehouses to store, query, or represent the relational decision context — approval chains, exception rationale, policy version references — that LLMs need to generate organizationally accurate outputs.

Data warehouses excel at storing facts and aggregations but cannot natively represent the multi-hop relational context of organizational decisions. A data warehouse can tell you that an exception was approved; a context graph can tell you who approved it, under what policy, citing which precedents, with what justification. This gap motivates the context graph as a complementary infrastructure layer alongside the warehouse.

**See also:** System of Record Gap, Graph vs Relational Model, Context Problem

#### Decision Actor

A person, role, system, or agent that participated in making, approving, or influencing a decision captured in a context graph.

Decision actors are first-class nodes in a context graph, linked to decision nodes via typed edges that specify their role in the decision process (approver, reviewer, initiator, overrider). Storing actors as nodes enables LLMs to answer questions like "who has the authority to approve this type of exception?" by traversing historical approval patterns.

**See also:** Approval Chain, Actor Node Pattern, Decision Trace

#### Decision Context

The full set of information — policies, data, precedents, constraints, and organizational norms — that was available to and considered by decision-makers at the time a decision was made.

Decision context is what context graphs are designed to capture and preserve. When an LLM is asked to make or recommend a similar decision in the future, retrieving the original decision context provides the grounding necessary to produce a consistent, policy-aligned recommendation rather than a generalized response.

**See also:** Decision Trace, Context Graph Definition, Decision Context Capture

#### Decision Context Capture

The practice of systematically recording all relevant context at the moment a decision is made, rather than reconstructing it later from incomplete records.

Real-time capture is superior to post-hoc reconstruction: memory fades, documents get archived, and the implicit reasoning that shaped a decision disappears. Context graphs that capture decision context at decision time — embedding policy references, data snapshots, and actor identities as edges and properties — preserve the full organizational memory that post-hoc capture misses.

**See also:** Real-Time Trace Recording, Post-Hoc Context Capture, Decision Trace

#### Decision Justification

The documented reasoning that explains why a specific decision was made, including the factors considered, alternatives rejected, and principles applied.

Storing decision justifications as properties or linked text nodes in a context graph enables LLMs to retrieve not just "what was decided" but "why" — the institutional reasoning that makes precedents reusable rather than merely repeatable. Justifications are the most valuable and most underrecorded element of organizational memory.

**Example:** A credit exception justification stored in the context graph records: "Approved because customer has 8-year relationship, single late payment due to documented ACH error, and revenue exceeds tier threshold by 40%."

**See also:** Decision Trace, Decision Record Format, Explainability by Design

#### Decision Node

A graph node representing a specific organizational decision, capturing its type, timestamp, outcome, actor references, policy references, and any associated justification.

Decision nodes are the central organizing element of a context graph. All other node types — actors, policies, precedents, entities — connect to decision nodes via typed edges. The decision node schema determines what information is captured and what queries are possible: a schema that omits policy version references cannot support compliance queries about regulatory adherence.

**See also:** Context Graph Node Types, Decision Trace, Decision Trace Node Schema

#### Decision Outcome

The result or conclusion of an organizational decision — typically a binary (approved/rejected) or categorical value — stored as a property of the decision node in a context graph.

Decision outcomes are the labels that make historical decision traces useful as retrieval context: "find all prior decisions of this type where the outcome was 'approved' and the policy version was X." Outcome data is also the training signal for improving LLM decision-support systems over time.

**See also:** Decision Node, Decision Trace, Training Data from Traces

#### Decision Quality Metric

A quantitative measure of how well AI-assisted decisions align with organizational objectives, policy requirements, and historical human judgment.

Decision quality metrics close the feedback loop between context graph investment and business value. Key metrics include: decision accuracy rate (do AI-recommended decisions match expert human decisions?), exception rate (how often does the AI escalate to human review?), and overrule rate (how often do humans override AI recommendations?).

**See also:** Agent Evaluation, ROI Measurement, Training Data from Traces

#### Decision Record Format

A standardized schema or template for documenting organizational decisions, ensuring consistent capture of the decision context, rationale, actors, outcomes, and references.

Standardized decision record formats are the bridge between human decision-making processes and context graph schemas. When an organization adopts a decision record format (such as Architecture Decision Records for technical decisions), the format can be mapped directly to context graph node and edge types, enabling systematic graph population from existing records.

**See also:** Decision Trace, Context Graph Schema, Audit Trail Design

#### Decision Timestamp

The point in time at which a decision was officially made or finalized, stored as a temporal property of the decision node.

Decision timestamps are essential for both precedent retrieval (find the most recent applicable decision) and compliance auditing (verify the policy version that was in effect at decision time). Timestamps must capture the actual decision time, not the recording time — a common error that makes bitemporal queries impossible to answer correctly.

**See also:** Bitemporal Modeling, Valid Time, Transaction Time

#### Decision Trace

A structured, graph-based record of an organizational decision that captures the actors involved, the data and policies consulted, the reasoning applied, the approvals obtained, and the outcome reached.

Decision traces are the primary data structure stored in context graphs. They are distinguished from audit logs by their relational richness: rather than a flat list of events, a decision trace is a subgraph that connects all the entities, policies, and actors involved in a decision into a traversable network. This structure enables LLMs to retrieve not just "what was decided" but the full organizational context of the decision.

**See also:** Context Graph Definition, Decision Trace Anatomy, Decision Node

#### Decision Trace Anatomy

The structural composition of a decision trace in a context graph, including the central decision node, its connected actor nodes, policy version references, precedent links, data source references, and outcome properties.

Understanding trace anatomy is prerequisite to schema design. A complete trace anatomy includes: who made the decision, what policy governed it, what data was consulted, what prior decisions were cited as precedent, who approved it, when it was finalized, and what the outcome was. Missing any of these elements creates gaps that degrade retrieval quality.

**See also:** Decision Trace, Decision Trace Node Schema, Decision Trace Edge Types

#### Decision Trace Edge Types

The defined categories of relationships in a decision trace, such as APPROVED_BY, REFERENCES_POLICY, PRECEDED_BY, ESCALATED_TO, and INVOLVES_ENTITY.

Edge types are the relational vocabulary that makes decision traces queryable with precision. Each edge type should have a defined semantic (what the relationship means), directionality (which node is the source and which is the target), and property schema (what attributes the edge carries, such as timestamp and method).

**See also:** Decision Trace Anatomy, Context Graph Edge Types, Approval Edge

#### Decision Trace Node Schema

The formal definition of the properties, data types, and constraints for each type of node appearing in a decision trace, including Decision, Actor, Policy, Entity, and Outcome nodes.

Node schema design determines what questions can be answered from the context graph. A Decision node that stores only outcome and timestamp supports very limited queries; one that also stores rationale text, confidence score, policy version, and escalation flag supports rich retrieval for diverse LLM use cases. Schema completeness must be balanced against capture complexity.

**See also:** Decision Trace Anatomy, Context Graph Schema, Graph Schema Governance

#### Dense Retrieval

An information retrieval approach that uses dense vector embeddings to find semantically similar documents or passages, as opposed to sparse term-frequency methods.

Dense retrieval is the semantic search engine in hybrid context retrieval architectures. It complements graph-based structural retrieval by handling queries where the user expresses a need in natural language that does not match the exact terminology in decision trace properties. Dense and sparse retrieval are most effective when combined with a reranking step.

**See also:** Sparse Retrieval, Hybrid Retrieval, Vector Embedding

#### Differential Privacy

A mathematical framework for adding calibrated statistical noise to query results or model outputs, ensuring that the presence or absence of any individual's data cannot be inferred from the output.

Differential privacy can be applied to context graph query results in scenarios where the graph contains personal data that must be protected. For example, aggregate queries over HR decision traces (e.g., "what is the approval rate for this exception type?") can be answered with differential privacy guarantees without exposing individual decision records.

**See also:** Data Anonymization, Data Masking, Federated Learning

#### Dimension

In data modeling, an attribute or categorical variable used to filter, group, or slice a business metric — such as time period, geography, product line, or customer segment.

Dimensions stored as context graph nodes enable LLMs to resolve ambiguous metric requests: "revenue for EMEA" requires knowing which dimension values correspond to EMEA and how the metric is defined for that dimension scope. Context graphs that link metric definitions to their valid dimension combinations prevent incorrect cross-dimensional aggregations.

**See also:** Business Metric, OLAP Semantic Layer Tool, Cube (Semantic Layer)

#### Document Store Integration

The connection of a context graph to a document management system — such as SharePoint, Confluence, or a contract management platform — enabling the graph to reference and link to document content as context for decision traces.

Document store integration extends context graphs to cover the large body of organizational knowledge that lives in documents rather than structured systems. Decision traces can link to specific document sections — the policy clause that governed a decision, the contract term that triggered an exception — providing LLMs with precise, citable document references rather than requiring full document retrieval.

**See also:** Hybrid Storage Architecture, Information Extraction, Retrieval-Augmented Generation

#### Downstream Lineage

The set of all data assets, reports, metrics, and systems that depend on a given data element or dataset — tracing where data flows after it leaves its origin.

Downstream lineage stored in a context graph enables LLMs to assess the impact of data quality issues: "which reports will be affected if this source table changes?" This impact analysis is essential for change management and for prioritizing data quality remediation efforts.

**See also:** Upstream Lineage, Column-Level Lineage, Lineage Graph

#### Dublin Core Metadata

A standardized set of fifteen metadata element definitions — including title, creator, subject, description, date, and rights — originally designed for describing digital resources and widely adopted in data governance.

Dublin Core provides a lightweight, interoperable metadata vocabulary for describing context graph nodes that represent documents, reports, and data assets. When context graphs incorporate Dublin Core properties on content nodes, LLMs can interpret these properties consistently across systems and organizations.

**See also:** Metadata, Technical Metadata, Business Metadata

#### Edge

A connection between two nodes in a graph, representing a relationship. In labeled property graphs, edges have a type, a direction, and optionally a set of properties.

Edges are where the semantic power of context graphs resides. The edge type specifies the relationship meaning; edge properties add temporal, contextual, or quantitative attributes. A well-typed edge — `(Decision)-[:APPROVED_BY {timestamp, method}]->(Actor)` — encodes more organizational knowledge per token than any equivalent relational join.

**See also:** Node, Edge Type, Graph Property

#### Edge Type

A named classification of a relationship in a labeled property graph, defining the semantic meaning of connections between nodes of specific types.

Edge type design is the most consequential schema decision in a context graph. Overly generic edge types (e.g., `RELATED_TO`) make precise queries impossible; overly granular types increase schema complexity without retrieval benefit. The right level of granularity matches the vocabulary needed to answer the LLM's most important organizational questions.

**See also:** Edge, Context Graph Edge Types, Graph Schema Governance

#### Embedding Model

A neural network model that maps input data — text, entities, or structured records — to dense vector representations in a high-dimensional space, where semantic similarity corresponds to vector proximity.

Embedding models are the core technology for semantic similarity retrieval in context graph hybrid architectures. Selecting the right embedding model affects retrieval quality: models trained on general text may not capture the domain-specific terminology in enterprise decision traces. Fine-tuned or domain-adapted models typically outperform general models for enterprise context retrieval.

**See also:** Vector Embedding, Sentence Transformer, Dense Retrieval

#### Engineering Incident Use Case

The application of context-graph-augmented LLMs to software engineering incident response — including incident classification, impact assessment, decision recording, and post-incident review.

Engineering incidents generate high-value decision context: the decisions made under pressure during an outage — which systems to restart, which rollback to execute, which customers to notify — are exactly the precedents that help future responders make better decisions faster. Context graphs that capture incident decision traces enable AI agents to surface relevant past incidents and their resolutions during active incidents.

**See also:** Production Decision Record, IT Operations Use Case, Engineering Workflow AI System

#### Engineering Workflow AI System

An AI system purpose-built to automate and augment software engineering workflows — including code review decisions, architecture approvals, incident response, and technical debt prioritization — using context graphs to ground recommendations in organizational technical history.

Engineering workflow AI systems represent one of the three primary market opportunities identified in the book. The engineering context graph must capture technical decision records, architecture decisions, incident resolutions, and deployment approvals — context that is distributed across ticketing systems, wikis, and chat tools — to provide the technical institutional memory that makes AI engineering assistance genuinely useful.

**See also:** Engineering Incident Use Case, Production Decision Record, Beachhead Workflow

#### Enterprise AI Market

The market for AI products, platforms, and services targeted at large organizations seeking to automate workflows, augment decisions, and extract value from enterprise data.

The enterprise AI market is the context in which the book's thesis is situated: the trillion-dollar opportunity lies not in building better models but in solving the organizational context problem that prevents those models from being reliably useful in enterprise workflows. Context graph systems are a foundational infrastructure play for this market.

**See also:** Trillion-Dollar Opportunity, Context Graph Startup, Competitive Moat

#### Enterprise Knowledge Graph

A knowledge graph built from an organization's internal data sources — HR systems, CRM, ERP, documents, and decision records — representing the entities, relationships, and context specific to that organization.

Enterprise knowledge graphs are the broader category within which context graphs operate. The enterprise knowledge graph may contain hundreds of entity types and millions of facts; the context graph is the specialized subgraph focused on decision traces and organizational memory that LLMs need to ground their outputs.

**See also:** Knowledge Graph, Context Graph vs Knowledge Graph, Cross-System Entity Linking

#### Entity

A distinct, identifiable object or concept — such as a person, organization, product, contract, or decision — that can be represented as a node in a knowledge graph.

Entities are the nouns of a context graph. Every decision trace references entities: the customer whose contract was approved, the employee whose exception was granted, the product whose specification was changed. Entity resolution quality determines whether the context graph accurately links decisions to their real-world subjects.

**See also:** Entity Resolution, Node, Canonical Entity Model

#### Entity Disambiguation

The process of determining which specific real-world entity a reference in text or data corresponds to, when multiple entities share the same name or identifier.

Entity disambiguation is a prerequisite for accurate context graph construction from unstructured sources. When extracting decision traces from emails or documents, the same person name may refer to different individuals; the same company name may refer to different legal entities. Disambiguation errors silently corrupt the graph by linking decisions to wrong entities.

**See also:** Entity Resolution, Named Entity Recognition, Cross-System Entity Linking

#### Entity Linking in Context Graph

The process of connecting decision trace nodes to the canonical entity nodes they reference — ensuring that a decision about "Acme Corp" links to the single authoritative Acme Corp node rather than creating a duplicate.

Entity linking quality is the single largest determinant of context graph retrieval accuracy. When decision traces are linked to canonical entities, queries like "show me all decisions involving this customer" return complete results. When entity linking fails, the same customer appears as five separate nodes and the query returns one-fifth of the relevant traces.

**See also:** Entity Resolution, Cross-System Entity Linking, Canonical Entity Model

#### Entity Resolution

The process of identifying records across multiple data sources that refer to the same real-world entity and merging or linking them into a unified representation.

Entity resolution is a foundational data engineering task for context graphs that ingest from multiple systems. Errors in entity resolution have outsized impact on LLM output quality: a hallucinated connection between the wrong customer and a decision trace produces confidently wrong, organizationally dangerous outputs.

**See also:** Entity, Cross-System Entity Linking, Master Data Management

#### Entity-Time Linkage

The association of an entity node in a context graph with temporal metadata specifying when the entity's properties were valid, enabling point-in-time queries about the entity's state.

Entity-time linkage is necessary for accurate historical context retrieval. When an LLM needs to reconstruct what an organization knew about a customer at the time of a past decision, the entity nodes must carry temporal validity metadata — otherwise the current state of the customer (e.g., current credit rating) will be returned instead of the state at decision time.

**See also:** Bitemporal Modeling, Valid Time, Temporal Versioning

#### ERP Graph Integration

The process of ingesting enterprise resource planning system data — financial records, procurement, inventory, manufacturing, and supply chain — into a context graph to enable LLM-powered workflow automation.

ERP graph integration provides LLMs with the structured operational context needed to answer questions about approvals, budget status, and procurement exceptions. ERP systems are typically the most complex source for context graph ingestion due to their deeply normalized schemas and complex business rules embedded in application logic rather than data.

**See also:** Finance Data Graph, Cross-System Entity Linking, Graph ETL Pipeline

#### Escalation Logic

The set of rules, thresholds, and conditions that determine when a decision or workflow must be escalated to a higher authority — such as when an exception exceeds a dollar threshold or when a standard approval timeout expires.

Escalation logic stored as context graph nodes and edges enables LLMs to understand when a recommendation requires human review rather than automated resolution. Retrieving the escalation rules that apply to a specific decision type before generating a recommendation allows the agent to correctly signal when human judgment is required rather than silently proceeding beyond its authorization boundary.

**See also:** Escalation Policy, Human-in-the-Loop, Exception Logic

#### Escalation Policy

A formal organizational policy that specifies the conditions under which a decision or issue must be escalated to a higher authority, including the escalation path, timeline, and required documentation.

Escalation policies stored in context graphs as policy nodes — with edges to the decision types they govern and the actor nodes authorized at each escalation level — enable LLMs to generate escalation recommendations that are policy-grounded rather than heuristic. This is especially important for compliance-sensitive workflows where failure to follow the correct escalation path creates regulatory exposure.

**See also:** Escalation Logic, Policy Version Reference, Graduated Autonomy

#### EU AI Act

The European Union's comprehensive regulatory framework for artificial intelligence, classifying AI systems by risk level and imposing requirements for transparency, explainability, human oversight, and conformity assessment.

The EU AI Act creates strong regulatory demand for the capabilities context graphs provide: decision traces satisfy the audit trail and explainability requirements for high-risk AI systems. Organizations deploying LLM-based decision systems in the EU must maintain the kind of structured decision provenance that context graphs are purpose-built to capture.

**See also:** Regulatory Compliance, Automated Decision Regulation, Algorithmic Accountability

#### Event Log

A structured record of events that occurred within a system or process, typically capturing event type, timestamp, actor, and relevant attributes.

Event logs are the raw material from which decision traces are constructed. Raw event logs contain more events than are semantically meaningful — page views, heartbeats, system health checks — and the context graph ingestion pipeline must filter, enrich, and link relevant events into coherent decision trace structures.

**See also:** Process Mining, IEEE XES Standard, Structured Logging

#### Event Sourcing

An architectural pattern in which the state of a system is derived by replaying a sequence of immutable events rather than storing current state directly.

Event sourcing is a natural foundation for context graph write paths: each decision event is appended to an immutable log, and the context graph state is derived by processing the event stream. This provides a complete, replayable history — useful for reconstructing the exact graph state at any past point in time, supporting both debugging and compliance investigations.

**See also:** Append-Only Log, CQRS Pattern, Trace Replay

#### Event Stream

A continuous, ordered sequence of events flowing from one or more source systems to downstream consumers, typically via a message broker or streaming platform.

Event streams are the real-time data feed that keeps context graphs synchronized with organizational activity. Decision events, entity updates, and policy changes arriving in the event stream can be consumed by context graph write services that maintain graph freshness without requiring batch updates or manual intervention.

**See also:** Event Streaming Platform, Event-Driven Ingestion, Change Data Feed

#### Event Streaming Integration

The connection of a context graph write pipeline to a real-time event streaming platform, enabling continuous ingestion of organizational events as they occur.

Event streaming integration is the architecture that enables context graphs to maintain near-real-time freshness at enterprise scale. The integration must handle event ordering, exactly-once semantics, and backpressure — failure to address these concerns produces duplicate decision traces, missed events, or cascading write failures.

**See also:** Event Streaming Platform, Event-Driven Graph Update, Message Queue Pattern

#### Event Streaming Platform

A distributed messaging system designed to ingest, store, and deliver high-throughput event streams reliably and at low latency, such as Apache Kafka.

Event streaming platforms are the ingestion backbone for production context graphs. They decouple source systems from graph write services, provide replay capability for backfill and error recovery, and handle the volume spikes that occur when many organizational decisions are made in parallel — such as end-of-quarter approval rushes.

**See also:** Event Streaming Integration, Event-Driven Ingestion, Message Queue Pattern

#### Event-Driven Graph Update

A context graph write pattern in which changes to the graph are triggered by events emitted from source systems, rather than by scheduled batch operations or manual writes.

Event-driven updates enable near-real-time context freshness: when a decision is made in a source system, the corresponding trace is written to the context graph within seconds rather than hours. This pattern requires event streaming infrastructure (such as Kafka) and graph write consumers that validate, transform, and persist each event as a graph write operation.

**See also:** Event Streaming Integration, Real-Time Ingestion, Change Data Capture

#### Event-Driven Ingestion

A data ingestion pattern in which new data is loaded into a target system in response to events rather than on a schedule, enabling near-real-time synchronization.

Event-driven ingestion is the preferred pattern for context graphs supporting live LLM agents because it minimizes context staleness. Implementation requires event producers in source systems, an event streaming platform, and consumer services that translate events into graph write operations — a more complex architecture than batch ingestion but essential for time-sensitive use cases.

**See also:** Event Streaming Integration, Real-Time Ingestion, Change Data Capture

#### Exception Logic

The set of rules, conditions, and approval processes that govern how an organization handles cases that fall outside standard policy, requiring special treatment or elevated authorization.

Exception logic is among the most valuable content in a context graph. Exceptions are, by definition, the cases where standard rules do not apply — and therefore the cases where LLMs are most likely to err without organizational context. A context graph rich in exception precedents dramatically improves LLM accuracy for the edge cases that matter most.

**See also:** Exception Pattern, Exception-Heavy Workflow, Out-of-Band Approval

#### Exception Pattern

A recurring structure in organizational decision-making in which a class of cases consistently requires exception handling, revealing a systematic gap between written policy and operational reality.

Identifying exception patterns in a context graph — by querying for clusters of decisions with exception flags and similar attributes — reveals organizational knowledge that is never written in formal policies. This implicit knowledge, surfaced by graph analysis, is the raw material for improving policy documentation and for training LLMs on realistic organizational behavior.

**See also:** Exception Logic, Decision Trace, Tacit Knowledge

#### Exception-Heavy Workflow

An organizational process in which a significant proportion of cases require exception handling, deviation from standard policy, or escalated approval.

Exception-heavy workflows are the highest-value targets for context graph deployment: the exceptions are where standard RAG and prompt-based LLMs fail most severely, because the relevant knowledge is not in any written document but in the accumulated history of prior exception decisions. A context graph rich in exception traces dramatically improves LLM performance precisely where it matters most.

**See also:** Beachhead Workflow, Exception Logic, First Workflow Selection

#### Executive Sponsorship

Active support and advocacy for an initiative from a senior organizational leader who has the authority to allocate resources, remove barriers, and signal organizational priority.

Executive sponsorship is a near-universal requirement for successful context graph deployments. Building organizational memory systems that capture decision traces across departments requires data access, system integration, and process changes that only senior leadership can authorize. Deployments that lack executive sponsorship typically stall at the data access stage.

**See also:** Change Management, Stakeholder Alignment, Adoption Barrier

#### Explainability by Design

An architectural approach in which AI systems are designed from the start to produce auditable, interpretable outputs — building explainability into the system structure rather than adding it post-hoc.

Context graphs embody explainability by design: every LLM output grounded in retrieved decision traces carries a complete provenance chain — which traces were retrieved, which policy versions were referenced, and which precedents were cited. This structural explainability satisfies regulatory requirements without requiring post-hoc analysis of black-box model internals.

**See also:** Post-Hoc Explainability, Algorithmic Accountability, Decision Justification

#### Explainability Test

A validation procedure that assesses whether an AI system can provide sufficient explanations for its outputs to satisfy regulatory, auditor, or user requirements.

Explainability tests for context-graph-augmented LLMs evaluate whether the system can trace each output claim to a specific retrieved context element. A system that can cite "this recommendation follows precedent P1234, approved by VP Finance under Policy v3.2 on 2023-Q4" passes the explainability test; one that can only say "this follows company policy" does not.

**See also:** Explainability by Design, Audit Trail Design, GDPR Explainability Requirement

#### Fairness Audit

A structured review of an AI system's decision patterns to identify differential treatment of protected groups — detecting systematic bias that may be hidden in aggregate performance metrics.

Context graphs enable fairness audits at a level of granularity impossible with traditional audit logs: graph queries can compare decision patterns across any combination of decision attributes (type, actor, time period, entity attributes) to identify differential outcomes. This makes fairness auditing a data analytics problem rather than a manual document review exercise.

**See also:** Bias Detection, Algorithmic Accountability, Decision Record Format

#### Faithfulness Score

A metric for evaluating whether an LLM's generated response accurately reflects the content of the provided context, penalizing statements that are contradicted by or absent from the retrieved context.

Faithfulness score is the most important evaluation metric for context-graph-augmented LLMs. A high-faithfulness response is one where every factual claim can be traced to a retrieved decision trace or knowledge node — the operational definition of a grounded, non-hallucinated output. Monitoring faithfulness in production is the primary signal for context graph quality degradation.

**See also:** BLEU Score, LLM Evaluation Metric, Hallucination Mitigation

#### Feature Engineering from Graph

The process of deriving machine learning input features from graph structure and graph properties — such as node degree, path length, community membership, or neighborhood aggregations.

Graph-derived features capture relationship context that flat tabular features miss. For LLM systems, graph features can be used to score the relevance of candidate context items during retrieval: a decision trace that is closely connected to many other high-relevance traces in the graph is more likely to be relevant than one that is structurally isolated.

**See also:** Knowledge Graph as Feature Store, Graph Algorithm, Graph Neural Network

#### Federated Graph Architecture

An architecture in which multiple independently maintained context graphs are linked by shared entity identifiers and schema standards, enabling cross-graph queries without requiring data consolidation.

Federated architectures respect organizational data ownership boundaries while enabling the cross-domain context retrieval that LLMs need. A federated context graph allows the HR team to own their decision graph and the Finance team to own theirs, while an LLM agent can query both through a federation layer that resolves cross-graph entity references.

**See also:** Federated Learning, Data Mesh, Cross-Graph Reference

#### Federated Learning

A machine learning technique in which model training is distributed across multiple data holders without centralizing the raw training data, preserving privacy while enabling collaborative model improvement.

Federated learning is relevant to context graph systems in scenarios where decision trace data is too sensitive to centralize — such as patient decisions across competing hospitals or proprietary financial decisions across competing firms. Models can be trained on distributed decision traces without any organization exposing their raw organizational memory.

**See also:** Differential Privacy, Data Anonymization, Model Audit Trail

#### Few-Shot Context Injection

A prompting technique that includes a small number of concrete examples — typically drawn from retrieved decision traces — within the LLM prompt to demonstrate the expected output format and reasoning pattern.

Few-shot context injection is especially powerful for decision-support applications: rather than asking the LLM to reason from abstract policy text, the prompt includes two or three precedent decisions retrieved from the context graph, demonstrating how similar cases were handled. This grounds the model's output in organizational practice rather than general training knowledge.

**Example:** A credit approval agent prompt includes three retrieved precedent traces: cases with similar customer attributes and the decisions made, giving the LLM concrete examples before asking it to recommend an outcome for the current application.

**See also:** Chain-of-Thought with Context, Prompt Engineering with Context, Few-Shot Prompting

#### Few-Shot Prompting

A prompting technique in which a small number of input-output examples are included in the prompt to guide the LLM's behavior, without updating the model's weights.

Few-shot prompting is more effective when the examples are drawn from the organization's own decision history rather than constructed artificially. Context graphs make this possible at scale: rather than manually selecting examples, the retrieval layer automatically surfaces the most relevant historical precedents for inclusion in the prompt.

**See also:** Few-Shot Context Injection, In-Context Learning, Zero-Shot Prompting

#### Finance Automation Use Case

The application of context-graph-augmented LLMs to automate or accelerate financial workflows — such as budget approvals, expense exceptions, revenue reconciliation, and regulatory reporting.

Finance workflows are among the highest-value targets for context graph deployment: they involve complex policy hierarchies, cross-system data (ERP, CRM, data warehouse), high-stakes decisions with compliance requirements, and large volumes of exceptions that historically required manual expert review. The combination of precision requirements and exception volume makes context graph memory essential.

**See also:** Finance Workflow AI System, Revenue Reporting Exception, ARR Definition Conflict

#### Finance Data Graph

A context graph subgraph or specialized graph capturing financial entities — accounts, cost centers, budgets, approvals, and transactions — and their decision traces.

Finance data graphs enable LLMs to answer organizational questions that span transactional systems, policy documents, and approval histories: "what was the justification for the Q3 budget reallocation, who approved it, and what policy governed the approval threshold?" No single finance system stores all three of these elements; the graph integrates them.

**See also:** Finance Automation Use Case, ERP Graph Integration, Approval Chain

#### Finance Workflow AI System

An AI system purpose-built to automate finance department workflows, using context graphs to ground decisions in organizational financial policy, precedent, and approval history.

Finance workflow AI systems represent one of the three primary market opportunities identified in the book (alongside sales and engineering). The finance context graph must capture metric definitions, policy versions, approval thresholds, and exception histories — each domain with distinct schema requirements that general-purpose AI platforms do not address.

**See also:** Finance Automation Use Case, Finance Data Graph, Beachhead Workflow

#### Financial Services Compliance

The regulatory and governance requirements specific to financial services organizations — including banking, asset management, and insurance — covering capital adequacy, customer suitability, anti-money laundering, and fiduciary obligations.

Financial services compliance is one of the most complex and highest-stakes regulatory environments for AI deployment. Context graphs for financial services must capture the full decision provenance required by regulators — including the data consulted, the models used, the policies applied, and the human overrides exercised — with tamper-evident audit trails that satisfy both internal audit and external examination standards.

**See also:** Regulatory Compliance, EU AI Act, Audit Trail Design

#### Fine-Tuning

The process of continuing to train a pre-trained LLM on a domain-specific dataset to improve its performance on tasks relevant to that domain.

Fine-tuning on organizational decision trace data can improve an LLM's alignment with organizational norms and terminology, but it is a complement to — not a replacement for — context graph retrieval. Fine-tuning bakes knowledge into model weights, making it static; context graphs provide dynamic, updatable organizational memory. The two techniques are most powerful when combined.

**See also:** In-Context Learning, Reinforcement Learning from Human Feedback, Training Data from Traces

#### First Workflow Selection

The decision process for identifying which organizational workflow to target first with a context graph deployment, balancing value potential, feasibility, and organizational readiness.

First workflow selection is a strategic decision that shapes the trajectory of the entire context graph program. The ideal first workflow has three properties: high exception volume (making context graph memory immediately valuable), cross-system data needs (making the graph's integration advantage visible), and a measurable outcome (enabling ROI demonstration). Selecting the wrong first workflow can doom a program through early failure.

**See also:** Beachhead Workflow, Exception-Heavy Workflow, Pilot Program Design

#### Full System Replacement Strategy

An AI deployment strategy in which the entire existing workflow is replaced by a new AI-powered system, rather than augmenting individual components.

Full system replacement is the highest-risk but potentially highest-reward strategy for context graph deployments. It requires the context graph to capture the full decision context of the legacy system before replacement — making backfill quality critical. Incremental replacement strategies are generally preferred for their lower risk profile, reserving full replacement for systems with well-understood decision logic.

**See also:** Module Replacement Strategy, New System Creation Strategy, Beachhead Workflow

#### Function Calling Pattern

An LLM capability and prompting pattern in which the model generates structured function call specifications — including function name and parameters — that are executed by the calling application, enabling tool use and external system integration.

Function calling is the primary mechanism by which LLM agents query context graphs at runtime. A well-defined context graph tool definition exposes graph query operations as callable functions; the LLM generates the appropriate function call based on the user's request, and the application executes the graph query and returns the results for the next generation step.

**See also:** Context Graph Tool Definition, Tool Use, Agent Loop

#### GDPR Explainability Requirement

The obligation under the EU General Data Protection Regulation's Article 22 for organizations to provide meaningful explanations of automated decisions that significantly affect individuals, including the logic, significance, and likely consequences.

GDPR explainability requirements create direct regulatory demand for context graph capabilities. Organizations making automated decisions about individuals — credit approvals, HR decisions, insurance claims — must be able to explain those decisions. Context graphs that capture decision traces with policy references and approval chains provide the explanation infrastructure required by law.

**See also:** Right to Explanation, EU AI Act, Explainability by Design

#### Glue Function

An operational task or workflow that primarily exists to connect or translate between two systems, processes, or data formats — characterized by high labor intensity and low strategic value.

Glue functions are prime candidates for context-graph-augmented automation. They typically involve looking up information across multiple systems, applying exception logic, and recording results — exactly the capabilities that context graphs provide. Automating glue functions frees organizational capacity for higher-value work while building the decision trace history that makes future automation more accurate.

**See also:** Exception-Heavy Workflow, High-Headcount Signal, Integration Tax

#### Go-To-Market Strategy

The plan for how a product or service will be brought to market, targeting specific customer segments with defined value propositions, sales motions, and pricing models.

For context graph startups, go-to-market strategy must account for the organizational complexity of selling organizational memory infrastructure: the buyer (IT), the user (domain teams), and the economic beneficiary (executives) are often different people. Successful go-to-market strategies for context graph products typically lead with a specific high-value use case rather than the infrastructure story.

**See also:** Context Graph Startup, Beachhead Workflow, Enterprise AI Market

#### Governance Report

A document or dashboard that summarizes an organization's compliance with data governance policies — including data quality rates, stewardship coverage, policy violations, and remediation status.

Context graphs enable governance reports to be generated programmatically from graph queries rather than assembled manually. A query over the decision trace graph can produce an immediate report of all decisions in a period, their policy compliance status, and any exceptions granted — replacing a manual audit process that previously took weeks.

**See also:** Compliance Reporting, Data Governance Framework, Audit Trail Design

#### Governance Role

An organizational position with defined responsibilities for data governance activities — such as Data Steward, Data Owner, Chief Data Officer, or Privacy Officer.

Governance roles translate to actor node types in context graphs: the identity and role of the person who approved a decision, validated a data definition, or granted an exception is a first-class element of the decision trace. Storing role information on approval edges enables queries like "show me all decisions approved by a CFO-level actor without VP Finance co-approval."

**See also:** Data Stewardship, Data Ownership, Decision Actor

#### Government Process Automation

The application of context-graph-augmented LLMs to government agency workflows — including permit approvals, benefits determinations, regulatory enforcement decisions, and inter-agency coordination.

Government processes are characterized by strict procedural requirements, high exception volumes, and stringent auditability requirements — conditions where context graphs provide their greatest value. The organizational memory stored in a government context graph — prior similar cases, applicable regulations, precedent decisions — enables AI systems to provide consistent, policy-grounded recommendations while maintaining the human oversight required for high-stakes public decisions.

**See also:** Regulatory Compliance, Automated Decision Regulation, Legal Compliance Use Case

#### GQL Standard

Graph Query Language — the ISO/IEC standard (ISO/IEC 39075) for property graph query languages, providing a vendor-neutral specification for graph pattern matching, traversal, and manipulation that both Neo4j's Cypher and other graph databases are converging toward.

GQL standardization reduces lock-in risk for context graph deployments: queries written to the GQL standard can theoretically be executed across any compliant graph database. For long-lived organizational memory systems, standard compliance is a risk management consideration as much as a technical one.

**See also:** Cypher Query Language, openCypher Standard, Graph Pattern Matching

#### Graduated Autonomy

An AI deployment pattern in which the system is granted progressively more decision-making authority as it demonstrates reliable performance, starting with advisory recommendations and advancing toward autonomous action.

Graduated autonomy is the trust-building framework for context graph deployments in high-stakes workflows. Starting with read-only advisory roles — where the agent recommends and humans decide — allows the context graph to accumulate decision trace data from human decisions that improves future recommendations. Autonomy expands as measured accuracy improves and organizational confidence grows.

**See also:** Human-in-the-Loop, User Trust Building, Escalation Policy

#### Graph Algorithm

A computational procedure that processes graph structure to compute properties such as shortest paths, centrality scores, community memberships, or subgraph patterns.

Graph algorithms applied to context graphs can surface organizational insights beyond individual decision retrieval: which policies are most frequently cited in exceptions (centrality), which decision-makers are most connected in the approval network (degree), and which clusters of decisions share similar patterns (community detection). These insights inform both LLM context and organizational management decisions.

**See also:** Centrality Measure, Shortest Path Algorithm, Community Detection

#### Graph Batch Processing

The execution of computationally intensive graph algorithms or transformations over large graph datasets as scheduled batch jobs, rather than as real-time queries.

Batch processing is appropriate for context graph operations that are expensive but not time-sensitive: computing embeddings for all decision trace nodes, running community detection over the full graph, or generating completeness reports. These batch results can be stored as properties or metadata on graph nodes, making them instantly available at retrieval time.

**See also:** Graph Algorithm, Batch Ingestion, Graph Sharding

#### Graph Clustering

The partitioning of graph nodes into groups based on structural similarity, connection density, or attribute similarity.

Graph clustering applied to decision traces can identify families of related decisions that should be retrieved together as context. A cluster of similar exception approvals — all involving the same customer segment, policy, and approval authority — is more valuable as a context set than individually retrieved traces, because the cluster reveals the pattern rather than just the instance.

**See also:** Community Detection, Graph Algorithm, Subgraph Matching

#### Graph Constraint Enforcement

The database-level mechanism that prevents writes that violate defined graph schema constraints, ensuring that all data in the context graph conforms to the defined structure.

Constraint enforcement at the database level is the most reliable way to prevent schema drift and maintain context graph quality over time. Application-level validation can be bypassed by new ingestion paths, emergency write operations, or operator errors; database-level constraints cannot. Every required property, valid node type, and mandatory relationship should be expressed as a graph constraint.

**See also:** Context Graph Constraint, Graph Schema Governance, Data Quality Rule

#### Graph Data Catalog

A metadata catalog specifically designed for graph data assets, providing documentation of node types, edge types, property schemas, and query patterns available in a graph database.

A graph data catalog enables LLM agents to discover available context graph query capabilities at runtime, supporting dynamic tool use patterns where the agent selects the right graph query based on the task rather than relying on hard-coded retrieval logic. The catalog is the self-documentation layer that makes context graphs self-service for agent developers.

**See also:** Data Dictionary, Metadata Catalog Platform, Context Graph API

#### Graph Database

A database management system designed to store, query, and traverse graph-structured data — nodes and edges with properties — with performance optimized for relationship-intensive operations.

Graph databases are the storage engine for context graphs. Their native traversal optimization makes multi-hop queries — "find all decisions involving this customer, their approval chains, and the policies referenced" — orders of magnitude faster than equivalent SQL queries with multiple joins. This performance advantage is the technical justification for using graph databases rather than relational databases for organizational memory.

**See also:** Labeled Property Graph, Property Graph Database Selection, Graph Traversal

#### Graph Deduplication

The process of identifying and removing or merging duplicate nodes and edges in a graph database, typically caused by ingesting the same entity or event from multiple source systems.

Deduplication is a continuous operational challenge for context graphs that ingest from multiple sources. Duplicate decision nodes — where the same approval event is written twice from different systems — inflate query results and confuse LLMs. Deduplication strategies must balance thoroughness against the risk of incorrectly merging distinct events.

**See also:** Entity Resolution, Graph Ingestion Pattern, Context Graph Merge

#### Graph ETL Pipeline

An extract-transform-load pipeline specialized for producing graph-structured data from source systems — extracting entities and relationships, transforming them to match the graph schema, and loading them as nodes and edges.

Graph ETL pipelines are more complex than tabular ETL because they must maintain referential integrity across nodes and edges: an edge cannot be loaded before both its source and target nodes exist. Designing pipelines that handle out-of-order arrival, entity resolution, and schema evolution without data loss requires careful engineering.

**See also:** Graph Ingestion Pattern, Batch Ingestion, Real-Time Ingestion

#### Graph Index

A data structure within a graph database that enables rapid lookup of nodes or edges based on property values, avoiding full graph scans.

Graph indexes are the primary performance tool for context retrieval optimization. Without indexes on high-selectivity properties (entity IDs, decision types, timestamps), every context retrieval query requires a full graph scan — acceptable during development but catastrophic at production scale. Index design should be driven by the most frequent and most latency-sensitive query patterns.

**See also:** Context Graph Index Design, Graph Database, Graph Performance Tuning

#### Graph Ingestion Pattern

A recurring design for loading data into a graph database from a specific type of source system or event stream, including entity resolution, edge creation, and error handling logic.

Ingestion patterns encode the lessons learned from production graph deployments: how to handle duplicate events idempotently, how to resolve entities across source systems, how to manage the ordering dependency between node and edge creation. Reusing established patterns reduces the engineering time and error rate for each new source system integration.

**See also:** Graph ETL Pipeline, Event-Driven Ingestion, Batch Ingestion

#### Graph Neural Network

A class of machine learning models that operates directly on graph-structured data, using message passing between connected nodes to learn representations that capture both node attributes and graph topology.

Graph neural networks can enhance context graph retrieval by learning to predict relevance from graph structure rather than relying solely on property matching or vector similarity. A GNN trained on historical retrieval quality data can score candidate decision traces based on their structural relationship to the query context, potentially outperforming simpler ranking methods.

**See also:** Knowledge Graph Embedding, Feature Engineering from Graph, Graph Algorithm

#### Graph Pattern Matching

The process of finding all subgraphs in a graph database that match a specified structural pattern of nodes, edges, and property constraints.

Graph pattern matching is the core query mechanism for context retrieval. A pattern like "find a Decision node connected to an Exception node, approved by an Actor with role CFO, in the last 90 days" is expressed as a graph pattern and executed natively by the graph database. This expressiveness makes context graphs far more queryable than flat event logs or document stores.

**See also:** Cypher Query Language, Graph Traversal, Subgraph Matching

#### Graph Property

A key-value attribute stored on a node or edge in a labeled property graph, used to capture metadata, metrics, and descriptive attributes without requiring additional nodes.

Properties are the attribute layer of context graphs. Decision node properties might include: `outcome`, `timestamp`, `confidence_score`, `policy_version_id`, `rationale_text`. Edge properties might include: `approved_at`, `method`, `signature_id`. Properties enable filtering and sorting within pattern queries without requiring additional traversal.

**See also:** Node, Edge, Labeled Property Graph

#### Graph Replication

The process of maintaining one or more synchronized copies of a graph database across different nodes, regions, or data centers for high availability and disaster recovery.

Replication for context graphs must account for write patterns that differ from transactional databases: decision traces are written asynchronously from multiple source systems, and the replication lag must be short enough that agents in different regions see consistent organizational memory. Replication topology decisions affect both freshness guarantees and cost.

**See also:** Context Graph Replication, Graph Database, Context Graph Deployment Pattern

#### Graph Schema

The formal definition of the types of nodes, edges, and properties that are valid in a graph database, specifying the structural vocabulary and constraints of the graph data model.

Graph schema is the organizing architecture of a context graph. Unlike relational schemas — which are strictly enforced at the database level — property graph schemas are often loosely enforced, enabling flexibility but also enabling schema drift. Production context graphs should combine the flexibility of property graphs with explicit schema documentation, constraint enforcement, and governance processes that prevent uncontrolled schema sprawl.

**See also:** Graph Schema Governance, Context Graph Schema, Schema Drift

#### Graph Schema Evolution

The process of modifying a graph database schema — adding new node types, edge types, or properties — without breaking existing queries, applications, or stored data.

Schema evolution is a lifecycle reality for context graphs: as organizational processes change, new decision types emerge that require new schema elements. Unlike relational databases, property graphs support additive schema changes without migration downtime — new properties can be added to existing nodes without affecting nodes that don't have them. Breaking changes (removing or renaming types) require careful deprecation planning.

**See also:** Schema Evolution, Context Graph Versioning, Context Graph Migration

#### Graph Schema Governance

The organizational processes, standards, and tooling that control how a graph database schema is designed, reviewed, modified, and documented over time.

Schema governance prevents the entropy that naturally accumulates in long-lived context graphs: without governance, each new team adds their own node types and edge types, creating a fragmented schema that is increasingly difficult to query consistently. Effective governance includes a schema review process, a canonical vocabulary, and deprecation procedures for obsolete types.

**See also:** Context Graph Schema, Schema Drift, Graph Constraint Enforcement

#### Graph Security Model

The set of access control, encryption, audit, and isolation mechanisms that protect a graph database and its data from unauthorized access or modification.

Graph security models must address the unique properties of graph data: access control must account for traversal paths, not just node-level permissions. A user with access to Node A and Node B but not to the edge between them may still be able to infer the relationship from context. Truly secure graph access control requires path-level access policies, not just node-level permissions.

**See also:** Access Control, Row-Level Security in Graph, Zero-Trust Graph Architecture

#### Graph Serialization Format

A standard or format for encoding graph data — nodes, edges, and properties — as text or binary, enabling export, import, and interchange between systems.

Serialization format choice affects both the size of context injected into LLM prompts and the LLM's ability to parse and reason over the context. JSON-based formats are most compatible with LLM processing; compact formats (e.g., edge lists) minimize token consumption; verbose formats (e.g., full JSON-LD) maximize self-documentation. Context-to-LLM serialization should be optimized for token efficiency.

**See also:** GraphML, GraphSON, JSON-LD

#### Graph Sharding

The partitioning of a large graph database across multiple physical storage nodes to enable horizontal scaling beyond the capacity of a single node.

Sharding introduces query complexity for context graphs: traversal queries that cross shard boundaries require distributed execution, adding latency. Context graph schemas should be designed to minimize cross-shard traversals for the most common query patterns — for example, co-locating a decision trace with all its directly connected actor and policy nodes on the same shard.

**See also:** Billion-Edge Graph, Graph Replication, Property Graph Scale

#### Graph Traversal

The process of navigating a graph by following edges from node to node, typically to find paths, collect connected subgraphs, or aggregate properties along a path.

Graph traversal is the fundamental operation that makes context graphs more expressive than flat databases. A single traversal can reconstruct the full decision chain from initial request through multiple approval steps to final outcome — a query that requires complex recursive SQL or multiple application-layer API calls in relational systems but executes natively in graph databases.

**See also:** Path Query, Graph Pattern Matching, Multi-Hop Retrieval

#### Graph vs Relational Model

A comparison highlighting the structural and performance differences between graph databases (optimized for relationship traversal) and relational databases (optimized for tabular operations and joins).

For context graph use cases, the relational model's join performance degrades super-linearly with path depth: a 5-hop traversal across a decision approval chain requires 5 joins, each filtering a progressively smaller result set but each requiring a full index scan at scale. Graph databases perform the same traversal using pointer-following that scales linearly with the number of nodes visited, not the total graph size.

**See also:** Graph Database, Context Graph vs Database, Graph Traversal

#### Graph vs Vector Store

A comparison of graph databases and vector databases as complementary approaches to organizational knowledge storage, highlighting their different strengths for structured vs. semantic retrieval.

Graph databases excel at precise structural queries ("show me the exact approval chain for this decision") while vector stores excel at fuzzy semantic queries ("find decisions semantically similar to this scenario"). Neither alone is sufficient for enterprise LLM context retrieval; hybrid architectures that route queries to the appropriate store based on query type deliver the best combination of precision and recall.

**See also:** Vector Database, Complementary Knowledge Layers, Hybrid Retrieval

#### Graph-Based Recommendation

A recommendation system that uses graph traversal and graph algorithms — rather than matrix factorization or purely content-based methods — to identify relevant items, connections, or actions based on the relationship structure of the graph.

Graph-based recommendations are naturally applicable to context graph retrieval: rather than recommending products or content, context graphs recommend relevant precedents, policies, and decision patterns based on the structural similarity of the current decision context to historical cases. Graph traversal from the current entity outward captures relationship context that pure similarity measures miss.

**See also:** Personalization Graph, Feature Engineering from Graph, Context Retrieval

#### Graph-Ingestible Log

A structured log format designed so that each log entry can be directly transformed into one or more graph nodes and edges with minimal transformation logic.

Graph-ingestible logs reduce ingestion pipeline complexity by encoding the graph structure in the log format itself: each event carries the source node ID, target node ID, edge type, and relevant properties — ready for direct graph write after schema validation. Organizations that adopt this logging convention when instrumenting decision-making systems dramatically simplify their context graph ingestion pipelines.

**See also:** Structured Logging, Graph Ingestion Pattern, Event-Driven Ingestion

#### GraphML

An XML-based file format for representing graph data, including nodes, edges, properties, and graph-level attributes, primarily used for data interchange and archival.

GraphML provides a human-readable, portable format for context graph serialization. While not optimized for LLM token efficiency, GraphML is useful for context graph snapshots, data exchange between graph systems, and integration with graph analysis tools. Its XML verbosity makes it inappropriate for direct context injection but suitable for system-to-system data transfer.

**See also:** GraphSON, Graph Serialization Format, Context Graph Snapshot

#### GraphSON

A JSON-based serialization format for property graph data, used primarily by Apache TinkerPop-compatible graph databases for data exchange and API responses.

GraphSON's JSON structure makes it more LLM-friendly than GraphML for context injection — LLMs handle JSON well and can parse property values directly. Compact GraphSON serializations of decision trace subgraphs are a practical format for injecting structured context into prompts while maintaining parseable structure.

**See also:** GraphML, Graph Serialization Format, Context Graph API

#### Grounding

The process of constraining an LLM's outputs to be consistent with specific provided facts, documents, or context — preventing the model from generating claims that go beyond or contradict the supplied information.

Grounding is the primary mechanism for reducing hallucination in enterprise LLM deployments. Context graphs provide structured, high-quality grounding material — decision traces, policy versions, entity definitions — that is more reliable than unstructured document retrieval. Grounded outputs are auditable: every claim can be traced to a specific context graph element.

**See also:** Context-Aware Generation, Hallucination Mitigation, Grounding Strategy

#### Grounding Strategy

The design of how retrieved context is incorporated into an LLM prompt to maximize the model's adherence to the retrieved facts and minimize confabulation.

Effective grounding strategies for context graphs include: placing retrieved context near the beginning of the prompt (before the question), using explicit attribution framing ("according to decision trace D1234..."), and instructing the model to cite its sources. The choice of strategy affects both output faithfulness and the model's ability to signal uncertainty when retrieved context is incomplete.

**See also:** Grounding, Prompt Engineering with Context, Context-Aware Generation

#### Hallucination

The generation of factually incorrect, fabricated, or unsupported content by an LLM, presented with the same confident tone as accurate outputs.

Hallucination is the primary failure mode that context graphs are designed to prevent. When an LLM lacks organizational context — the specific policies, precedents, and decisions relevant to a query — it fills the gap with plausible-sounding but fabricated organizational facts. Context graphs provide the structured, authoritative grounding material that replaces confabulation with retrieval.

**See also:** Hallucination Mitigation, Grounding, Context Poisoning

#### Hallucination Mitigation

The set of techniques used to reduce the frequency and severity of LLM hallucinations, including retrieval augmentation, grounding strategies, output validation, and uncertainty signaling.

Context graphs are the most structurally effective hallucination mitigation technique for enterprise organizational knowledge queries: they replace the LLM's need to confabulate organizational facts with direct retrieval of those facts from authoritative sources. Post-generation validation against retrieved context provides an additional catching layer for hallucinations that occur despite good retrieval.

**See also:** Hallucination, Grounding, LLM Output Validation

#### Healthcare Workflow Use Case

The application of context-graph-augmented LLMs to healthcare organizational processes — such as care approval workflows, treatment protocol decisions, and compliance documentation — requiring both clinical accuracy and regulatory compliance.

Healthcare is among the most regulated and highest-stakes environments for AI deployment. Context graphs for healthcare workflows must capture clinical decision traces with full policy provenance to satisfy both organizational quality requirements and external regulatory audits. The combination of complexity, exception volume, and compliance requirements makes healthcare a compelling context graph use case.

**See also:** Regulatory Compliance, Compliance Reporting, Cross-Department Use Case

#### High-Headcount Signal

An organizational indicator that a workflow employs more people than its underlying complexity warrants, suggesting significant automation potential.

High-headcount signals identify workflows where human labor is primarily serving the function of organizational memory — looking up precedents, applying exception logic, routing approvals — rather than providing genuine human judgment. These are the highest-value targets for context graph automation, because the context graph replaces the memory function while escalation workflows preserve human judgment for genuinely novel cases.

**See also:** Glue Function, Exception-Heavy Workflow, Beachhead Workflow

#### Historical Precedent

A prior organizational decision that serves as a reference point for making similar decisions in the future, typically cited to justify consistency with established practice.

Historical precedents are the primary retrieval target in many context graph use cases. When an LLM is asked to recommend a decision, retrieving the three most similar historical precedents — with their full context, justifications, and outcomes — enables the model to ground its recommendation in organizational practice rather than general training knowledge. The precedent chain is what makes organizational wisdom scalable.

**See also:** Precedent Link, Precedent Chain Pattern, Decision Justification

#### HNSW Index

Hierarchical Navigable Small World — a graph-based data structure for efficient approximate nearest neighbor search in high-dimensional vector spaces, widely used in vector databases.

HNSW indexes are the performance engine of vector-based context retrieval in hybrid context graph architectures. When an LLM agent's query is semantically encoded as a vector and matched against embedded decision traces, the HNSW index makes this search fast enough for interactive use — typically sub-10ms for million-scale vector collections.

**See also:** Approximate Nearest Neighbor, Vector Database, Product Quantization

#### HR Data Graph

A context graph subgraph or specialized graph capturing human resources entities — employees, roles, reporting relationships, compensation decisions, and HR policy applications.

HR data graphs enable LLMs to answer complex organizational questions: "what is the standard compensation exception process for a level 6 engineer, what precedents exist, and who has authority to approve?" This context, distributed across HRIS, compensation tools, and approval workflows, is inaccessible without a graph that integrates them.

**See also:** HR Workflow Automation, Cross-System Entity Linking, Finance Data Graph

#### HR Workflow Automation

The application of context-graph-augmented LLMs to human resources processes — including hiring approvals, compensation reviews, performance management, and policy exceptions.

HR workflows are exception-intensive and policy-rich, making them natural context graph candidates. However, they also involve sensitive personal data requiring strict access control. Context graph schemas for HR must carefully separate the decision trace structure (what was decided, by whom, under what policy) from the personal data (who the decision was about), enabling compliance queries without exposing personal information.

**See also:** HR Data Graph, Exception-Heavy Workflow, Data Classification

#### Hub-and-Spoke Graph Architecture

A graph architecture in which a central hub graph stores canonical entities and shared context, with specialized spoke graphs for each domain that link to the hub's canonical nodes.

Hub-and-spoke architectures balance standardization (the hub provides shared entity identity and core context) with domain autonomy (each spoke team owns their decision traces and local schema). LLM agents can traverse from a spoke graph through the hub to another spoke, enabling cross-domain context retrieval without requiring full graph consolidation.

**See also:** Federated Graph Architecture, Canonical Entity Model, Cross-System Entity Linking

#### Human Review Workflow

The operational process by which human reviewers receive, evaluate, and act on AI-generated recommendations or escalations, returning their decisions to the system for learning and recording.

Human review workflows are the write-back mechanism that continuously enriches context graphs. When a human reviewer overrides, confirms, or escalates an AI recommendation, their decision — with full context — becomes a new decision trace. Over time, the accumulated traces from human review create a high-quality dataset of difficult organizational decisions that improve future AI accuracy.

**See also:** Human-in-the-Loop, Agent Write-Back, Training Data from Traces

#### Human-in-the-Loop

An AI system design pattern in which a human reviewer is included in the decision-making process for cases that exceed the system's confidence threshold or involve high-stakes outcomes.

Human-in-the-loop is the trust-building mechanism for context graph deployments: agents that handle routine cases automatically while escalating edge cases to humans demonstrate value while preserving organizational control. Every human decision made in response to an escalation becomes a new decision trace that enriches the context graph — making future automation more accurate.

**See also:** Graduated Autonomy, Escalation Policy, Agent Feedback Loop

#### Hybrid Retrieval

A retrieval approach that combines multiple retrieval methods — such as graph pattern matching, dense vector search, and sparse keyword search — and merges their results to improve overall recall and precision.

Hybrid retrieval is the recommended architecture for production context graph systems. Pure graph retrieval misses semantically relevant traces that use different terminology; pure vector retrieval misses structurally precise traces that require relationship traversal. Combining both — with a reranking step — delivers the best of both worlds for enterprise organizational knowledge retrieval.

**See also:** Dense Retrieval, Sparse Retrieval, Context Reranking

#### Hybrid Storage Architecture

A storage architecture that combines multiple database technologies — such as a property graph database, a vector index, and a relational database — each optimized for different aspects of the data and query requirements.

Hybrid storage is the production architecture for sophisticated context graph deployments. The graph database stores structural decision trace relationships; the vector index enables semantic similarity search over trace text; the relational database stores high-volume operational data. A query routing layer selects the appropriate storage backend for each retrieval request.

**See also:** Property Graph Database Selection, Vector Index Layer, Complementary Knowledge Layers

#### IEEE XES Standard

eXtensible Event Stream — the IEEE standard format for process event logs used in process mining, defining a structured XML schema for recording process instances, events, and attributes.

IEEE XES provides a standard event log format that can be ingested into context graphs to reconstruct process-level decision traces. Process mining tools that produce XES output can feed directly into context graph ingestion pipelines, providing structured process context that complements transactional decision records.

**See also:** Process Mining, Event Log, Structured Logging

#### Implicit Organizational Knowledge

Knowledge about organizational practices, norms, and expectations that is understood by experienced employees but never explicitly documented.

Implicit organizational knowledge is the hardest to capture and the most valuable to encode in context graphs. It includes the unwritten rules that govern exceptions, the informal approval paths that bypass formal processes, and the institutional wisdom about which policy interpretations are acceptable. Decision traces that capture actual organizational behavior — rather than just official policy — begin to make implicit knowledge explicit and queryable.

**See also:** Tacit Knowledge, Organizational Memory, Decision Trace

#### In-Context Learning

The ability of an LLM to adapt its behavior based on examples, instructions, or context provided in the prompt, without updating the model's weights.

In-context learning is the mechanism by which context graph retrieval improves LLM performance: retrieved decision traces serve as in-context examples that demonstrate the organization's decision-making patterns. The model learns from these examples within the context window, producing outputs aligned with organizational norms rather than general training data patterns.

**See also:** Few-Shot Prompting, Fine-Tuning, Context-Aware Generation

#### Incumbent Architecture Constraint

A limitation imposed on AI system design by the existing technology infrastructure — data warehouses, legacy ERP systems, document stores — that the new system must integrate with or work around.

Incumbent architecture constraints are a common source of context graph design compromises: the ideal schema may be impossible to ingest from a legacy system's data model; the ideal ingestion frequency may be blocked by a legacy system's batch-only export capability. Understanding these constraints early — through a thorough source system audit — prevents architectural surprises that require expensive rework after deployment.

**See also:** Integration Tax, Data Warehouse Gap, Legacy System Bias

#### Inference Engine

A software component that applies logical rules or ontological axioms to known facts to derive new facts — enabling automated reasoning over graph-structured knowledge.

Inference engines extend what context graphs can answer beyond explicitly stored facts. By applying organizational rules — "any decision involving a contract over $1M requires C-suite approval" — the inference engine can flag decision traces that should have an approval edge but don't, enabling automated compliance gap detection without requiring humans to review every trace individually.

**See also:** Rule-Based Reasoning, Transitive Closure, Ontology

#### Information Extraction

The process of automatically identifying and extracting structured information — entities, relationships, and events — from unstructured text.

Information extraction is the technology that enables context graphs to ingest from unstructured sources: emails, documents, meeting notes, and support tickets that contain decision context but are not stored in structured systems. Extracted entities and relationships can be loaded into the context graph, extending organizational memory beyond the reach of structured data systems.

**See also:** Named Entity Recognition, Relation Extraction, Knowledge Graph

#### Ingestion Pipeline Design

The architectural design of the data processing pipeline that extracts data from source systems, transforms it to match the context graph schema, and loads it as nodes and edges.

Ingestion pipeline design is a primary determinant of context graph quality and operational cost. Key design decisions include: synchronous vs. asynchronous ingestion, schema validation placement, entity resolution strategy, error handling and dead-letter queue design, and monitoring integration. Poorly designed pipelines become technical debt that limits context graph evolution.

**See also:** Graph ETL Pipeline, Event-Driven Ingestion, Batch Ingestion

#### Instruction Tuning

A fine-tuning technique in which an LLM is trained on a dataset of instruction-response pairs, improving the model's ability to follow natural language instructions.

Instruction-tuned models are better at following the structured context injection patterns used with context graphs: they reliably adhere to instructions like "answer only based on the provided decision traces" and "cite the specific trace ID for each claim." Base models without instruction tuning often ignore these constraints, making instruction tuning a prerequisite for reliable context-grounded generation.

**See also:** Fine-Tuning, Reinforcement Learning from Human Feedback, Grounding Strategy

#### Insurance Claims Use Case

The application of context-graph-augmented LLMs to insurance claim workflows — including coverage determination, fraud detection, exception approvals, and regulatory compliance.

Insurance claims processing is highly exception-intensive: most claims require at least one non-standard judgment call about coverage interpretation, policy exclusions, or settlement amounts. Context graphs that store claim decision precedents enable LLMs to retrieve the most similar prior claims and their outcomes, dramatically reducing the manual research required for each complex claim.

**See also:** Exception-Heavy Workflow, Regulatory Compliance, Risk Management Use Case

#### Integration Tax

The hidden organizational cost — in engineering time, maintenance burden, and data quality degradation — of connecting systems that were not designed to work together.

Integration tax is the economic justification for context graphs: rather than building point-to-point integrations between each source system and each consuming application, the context graph provides a single integration layer that amortizes the connection cost across all consumers. Every additional LLM application built on the context graph pays no additional integration cost.

**See also:** Data Silo, Glue Function, Hub-and-Spoke Graph Architecture

#### ISO 11179 Naming Convention

The naming rules specified in the ISO 11179 metadata registry standard, defining how data elements should be named to ensure consistency, precision, and interoperability across systems.

ISO 11179 naming conventions — Object Class + Property + Representation Term — provide the canonical naming pattern for context graph node properties and edge types. When all organizational data elements follow this convention, LLMs can parse property names to infer meaning without requiring separate documentation lookups.

**Example:** A column named `Person_BirthDate_DT` follows the ISO 11179 convention: Object Class (Person), Property (BirthDate), Representation Term (DT for date).

**See also:** ISO 11179 Standard, Naming Convention Standard, Data Element

#### ISO 11179 Standard

An international standard (ISO/IEC 11179) for the specification and standardization of data elements, providing a framework for recording metadata about data in a metadata registry.

ISO 11179 provides the definitional foundation for enterprise data standardization. Context graphs built on ISO 11179 principles store data element definitions, conceptual domains, and naming conventions as first-class graph nodes — enabling LLMs to retrieve authoritative, standardized definitions for any organizational data element encountered in a query.

**See also:** Data Element, Data Definition, Metadata Registry

#### IT Operations Use Case

The application of context-graph-augmented LLMs to IT operations workflows — including incident management, change approvals, capacity planning, and service restoration decisions.

IT operations involves high-frequency decisions with significant downstream consequences: the wrong change approval can cause outages, and the wrong incident response can delay restoration. Context graphs storing infrastructure decision traces — including past incident resolutions, change windows, and exception approvals — enable LLMs to recommend responses grounded in the organization's specific operational history.

**See also:** Engineering Incident Use Case, Production Decision Record, Cross-Department Use Case

#### Join Path Discovery

The process of identifying the correct sequence of table joins needed to combine data from multiple tables in a relational database to answer a business question.

Join path discovery is a common LLM text-to-SQL failure mode: when table relationships are undocumented, the model must guess join paths, frequently producing incorrect results. Context graphs that store join path metadata — which tables join to which, via which keys, with what cardinality — enable LLMs to retrieve authoritative join paths before generating SQL, eliminating this failure mode.

**See also:** Undocumented Join, SQL-Based Semantic Layer, Semantic Layer

#### JSON-LD

JSON for Linked Data — a JSON-based format for expressing Linked Data using standard JSON syntax, enabling structured data to carry semantic meaning through context declarations and type identifiers.

JSON-LD is used in context graphs for expressing semantic relationships between entities in a format that is both machine-readable and LLM-parseable. When context graph subgraphs are serialized as JSON-LD for injection into LLM prompts, the semantic type information carried by the format helps the model interpret node types and relationship meanings without requiring additional explanation.

**See also:** Graph Serialization Format, Semantic Triple, RDF Lacks Scalability

#### Judgment Call

A decision made by a human expert that requires the application of experience, intuition, and contextual knowledge that cannot be fully specified in written policy.

Judgment calls are the most important decisions to capture as context graph traces: they encode organizational wisdom that is not available in any policy document. When a future LLM is asked to handle a similar situation, retrieving past judgment calls — with their full context and rationale — provides the closest available approximation to the expert's reasoning, even if the model cannot replicate the expert's intuition.

**See also:** Tacit Knowledge, Implicit Organizational Knowledge, Exception Logic

#### Knowledge Graph

A graph-based data structure that represents knowledge about a domain as a network of entities (nodes) and the relationships between them (edges), enabling inference, query, and reasoning over the represented knowledge.

Knowledge graphs are the broader category within which context graphs operate. Traditional knowledge graphs focus on factual world knowledge (Wikipedia-style); enterprise knowledge graphs focus on organizational entities and relationships; context graphs specialize further on organizational decisions and their context. Understanding this hierarchy clarifies where context graphs fit in the enterprise AI stack.

**See also:** Enterprise Knowledge Graph, Context Graph vs Knowledge Graph, Ontology

#### Knowledge Graph as Feature Store

The use of a knowledge graph as a source of features for machine learning models, where graph-derived signals — node attributes, neighborhood aggregations, path features — serve as model inputs.

When the context graph is used as a feature store, ML models trained to predict decision outcomes can incorporate the rich relational context captured in the graph. This enables hybrid AI systems where the LLM provides language understanding and the graph-trained model provides quantitative decision scoring — combining the strengths of both approaches.

**See also:** Feature Engineering from Graph, Graph Neural Network, Knowledge Graph Embedding

#### Knowledge Graph Embedding

A machine learning technique that maps knowledge graph entities and relationships to dense vectors, enabling similarity computation and link prediction over graph data.

Knowledge graph embeddings extend the semantic search capability of context graphs: decision traces can be searched by semantic similarity of their embedded representations in addition to structural graph queries. Embeddings learned on the organizational context graph capture domain-specific semantic relationships that general embedding models may miss.

**See also:** Graph Neural Network, Vector Embedding, Embedding Model

#### Knowledge Graph Quality

The degree to which a knowledge graph accurately, completely, and consistently represents the domain it models, measured across dimensions of structural validity, semantic correctness, and temporal currency.

Knowledge graph quality directly determines LLM output quality when the graph is used as context. Quality monitoring must cover: entity accuracy (do nodes represent real entities correctly?), relationship accuracy (do edges represent real relationships?), completeness (are all relevant entities and relationships present?), and currency (is the graph up to date?).

**See also:** Data Quality, Active Metadata Management, Context Freshness

#### Knowledge Staleness

The condition in which information stored in a knowledge base or context graph no longer accurately reflects the current state of the real world or organization it represents.

Knowledge staleness is one of the most dangerous failure modes in context graph systems because it is silent: an LLM that retrieves a stale policy version generates a confident, coherent response based on outdated information, with no indication to the user that the context is no longer valid. Staleness detection and freshness monitoring are essential operational practices.

**See also:** Context Freshness, Knowledge Graph Quality, Context Freshness Check

#### Knowledge Transfer

The process of making organizational knowledge — including processes, decisions, and expertise — accessible to new employees, systems, or partner organizations.

Context graphs are an organizational knowledge transfer infrastructure: the accumulated decision traces, precedents, and policy references stored in the graph enable new employees and new AI systems to access the institutional wisdom that previously existed only in the memories of long-tenured staff. This makes organizational knowledge robust to attrition and scalable to growth.

**See also:** Organizational Memory, Tacit Knowledge, Implicit Organizational Knowledge

#### Labeled Property Graph

A graph data model in which nodes and edges carry labels (type identifiers) and properties (key-value attribute pairs), providing a flexible schema for representing diverse entities and relationships.

The labeled property graph model is the foundation of most modern graph database systems and is the recommended data model for context graphs. Its label-based typing enables graph schema governance; its property flexibility enables rich attribute capture on decision trace elements; its native traversal optimization enables the multi-hop queries that make organizational memory queryable.

**See also:** Graph Database, Node Label, Edge Type

#### Large Language Model

A deep learning language model trained on massive text corpora, capable of generating, summarizing, translating, and reasoning over natural language text at near-human quality.

LLMs are the consumer of context graphs in the architecture this book describes. Their power — language understanding and generation — is undermined by their fundamental limitation: they cannot know organizational-specific facts from training data alone. Context graphs solve this limitation by providing the structured retrieval layer that brings organizational knowledge into the LLM's context window at query time.

**See also:** Transformer Architecture, Context Window Limit, Retrieval-Augmented Generation

#### Legacy System Bias

The tendency of AI systems and their training data to reflect the patterns and assumptions of existing legacy systems, potentially encoding outdated processes or constraints into AI behavior.

Legacy system bias affects context graphs when historical decision traces are dominated by decisions made under now-outdated policies or system constraints. LLMs retrieving these traces may recommend outdated approaches. Temporal filtering and policy version tagging on decision traces enables agents to prefer recent, current-policy-aligned precedents over legacy-era decisions.

**See also:** Read-Path Limitation, Current State Bias, Decision Timestamp

#### Legal Compliance Use Case

The application of context-graph-augmented LLMs to legal and compliance workflows — including contract review, regulatory filing, policy compliance checking, and legal exception approvals.

Legal compliance is among the most document-intensive and exception-rich organizational domains. Context graphs that store legal decision traces — which contract clauses were approved, which regulatory interpretations were accepted, which compliance exceptions were granted — enable LLMs to ground legal recommendations in the organization's established legal positions rather than generic legal knowledge.

**See also:** Regulatory Compliance, Compliance Reporting, Audit Trail Design

#### Lineage Graph

A directed acyclic graph representing the flow of data from source systems through transformations to final reports or metrics, used for impact analysis, debugging, and compliance.

Lineage graphs are a specialized form of context graph focused on data provenance. When lineage graphs are integrated with decision trace context graphs, LLMs can answer compound questions: "what decisions were made based on this metric, and what source data fed into the metric calculation?" This end-to-end traceability is essential for financial and regulatory audit workflows.

**See also:** Column-Level Lineage, Data Provenance, Upstream Lineage

#### Lineage vs Provenance

A distinction between data lineage — which tracks the movement and transformation of data through systems — and data provenance — which documents the origin, context, and custody history of a specific data artifact.

Lineage answers "how did this data get here?" Provenance answers "where did this data come from, who handled it, and what was done to it?" Both are important for context graphs: lineage helps LLMs understand metric derivation; provenance helps LLMs assess data trustworthiness and regulatory compliance.

**See also:** Data Provenance, Upstream Lineage, Custody Chain

#### Linked Precedent

A prior decision stored as a node in a context graph that is explicitly connected to a current decision via a `PRECEDED_BY` or `CITES_PRECEDENT` edge, creating a retrievable chain of organizational case law.

Linked precedents are the mechanism by which organizational wisdom accumulates and compounds in a context graph. Each new decision that cites a prior decision creates a chain; LLMs can traverse this chain to understand the history of organizational thinking on a topic, retrieving not just the most recent precedent but the full lineage of decisions that shaped current practice.

**See also:** Precedent Link, Precedent Chain Pattern, Historical Precedent

#### Living Record

A context graph or document that is continuously updated as new decisions are made and new context is added, as opposed to a static snapshot captured at a single point in time.

The concept of a living record distinguishes context graphs from traditional document-based organizational memory. A policy wiki page is a static snapshot; a context graph decision trace is a living record that accumulates new approval edges, new precedent links, and new outcome properties as the decision ripples through the organization. LLMs querying a living record get current organizational reality, not a historical artifact.

**See also:** Context Graph Lifecycle, Context Graph Update Pattern, Real-Time Trace Recording

#### LLM Context Window

The finite input buffer of a large language model that holds all text — system prompt, retrieved context, conversation history, and the current query — processed in a single inference call.

The LLM context window is the fundamental constraint that motivates context graph design. Its finite size means that organizational knowledge must be selectively retrieved rather than bulk-loaded; its token cost means that every retrieved element must earn its place through information value. Context graphs enable precise, efficient selection of the highest-value organizational context for each specific query.

**See also:** Context Window Limit, Context Window Budget, Token

#### LLM Evaluation Metric

A quantitative measure used to assess the quality, accuracy, or reliability of a large language model's outputs on a specific task or benchmark.

Evaluating context-graph-augmented LLMs requires metrics that assess context utilization, not just output quality. Standard metrics like accuracy and fluency are insufficient; evaluation must also measure faithfulness (are outputs grounded in retrieved context?), context relevance (was the right context retrieved?), and citation accuracy (are cited sources correctly attributed?). These context-specific metrics require specialized evaluation frameworks.

**See also:** Faithfulness Score, BLEU Score, Agent Evaluation

#### LLM Integration Pattern

A recurring architectural design for connecting a large language model to a context graph — specifying the retrieval trigger, query construction, context formatting, and prompt injection approach.

LLM integration patterns encode the engineering decisions that determine how effectively organizational context flows from the graph into the model's generation process. Common patterns include: pre-generation retrieval (fetch context before generating), iterative retrieval (fetch additional context during generation via ReAct), and post-generation verification (retrieve context to validate generation accuracy). The right pattern depends on task complexity and latency requirements.

**See also:** ReAct Pattern, Context Retrieval, Prompt Engineering with Context

#### LLM Output Validation

The process of checking a large language model's generated output against retrieved context or external sources to verify factual accuracy and detect hallucinations before returning the response.

Output validation provides a post-generation safety net for context-graph-augmented systems. By comparing each factual claim in the generated output against the retrieved decision traces, the validation layer can flag unsupported statements for revision or human review before they reach the end user. This defense-in-depth approach reduces hallucination risk even when retrieval quality is imperfect.

**See also:** Faithfulness Score, Hallucination Mitigation, Reflection Pattern

#### Log Schema

The defined structure of fields, types, and constraints for records in a structured log, ensuring that log entries are consistently formatted and machine-parseable.

Log schemas are a prerequisite for ingesting structured logs into context graphs. A well-defined log schema maps directly to context graph node and edge types, enabling automated transformation from log records to graph writes. Poorly defined or inconsistent log schemas require expensive normalization logic that introduces errors and delays in context graph ingestion.

**See also:** Structured Logging, Event Log, Graph Ingestion Pattern

#### Logical Data Model

A representation of organizational data entities, their attributes, and their relationships, defined independently of any specific physical database implementation.

Logical data models are the semantic layer between business concepts and physical database schemas. When stored as context graph nodes and edges, logical data models enable LLMs to reason about data relationships without needing access to physical schemas — supporting text-to-SQL generation, data discovery, and impact analysis across the organization.

**See also:** Graph Schema Governance, Semantic Layer, Data Dictionary

#### Long-Term Memory for AI

The capability of an AI system to retain and retrieve information across sessions, tasks, and time periods — analogous to human long-term memory.

Context graphs are the enterprise-grade long-term memory layer for AI agents. Unlike in-context working memory (limited to the current context window) or vector store episodic memory (fuzzy and non-relational), context graphs provide precise, structured, auditable long-term memory that persists indefinitely and is queryable with organizational precision. This persistence is what makes AI systems genuinely intelligent about an organization over time.

**See also:** Agent Memory Architecture, Short-Term vs Long-Term Memory, Context Graph as Memory Layer

#### Manufacturing Quality Use Case

The application of context-graph-augmented LLMs to manufacturing quality workflows — including defect analysis, process deviation approvals, supplier qualification, and compliance documentation.

Manufacturing quality decisions are high-stakes, policy-governed, and heavily documented by regulatory requirement. Context graphs that store quality decision traces — inspection findings, deviation approvals, corrective actions — enable LLMs to identify patterns in defect histories, recommend actions based on similar prior incidents, and generate compliance documentation grounded in actual decision records.

**See also:** Engineering Incident Use Case, Regulatory Compliance, Exception-Heavy Workflow

#### Marketing Attribution Use Case

The application of context-graph-augmented LLMs to marketing attribution decisions — determining which marketing activities and channels contributed to revenue outcomes and how budget should be allocated.

Marketing attribution is a decision domain with significant ambiguity: attribution models disagree, channel definitions vary, and cross-channel journeys are complex. Context graphs that store attribution decision traces — which model was used, what the justification was, what alternatives were considered — enable LLMs to provide attribution recommendations that are consistent with historical organizational decisions rather than model-dependent.

**See also:** Cross-Department Use Case, Business Metric, Finance Workflow AI System

#### Master Data Management

The set of processes, tools, and governance policies used to ensure that an organization maintains a single, authoritative, and consistent master record for each key business entity.

MDM provides the canonical entity foundation that context graphs depend on for cross-system entity linking. Without MDM-quality entity resolution, context graphs accumulate duplicate nodes that fragment organizational memory: queries about a customer return partial results because the customer appears as three separate nodes linked to different decision traces.

**See also:** Canonical Entity Model, Entity Resolution, Cross-System Entity Linking

#### Message Queue Pattern

An asynchronous communication pattern in which producers write messages to a queue and consumers read and process them independently, decoupling the producer and consumer lifecycles.

Message queues decouple context graph write services from source systems: when a decision event is produced faster than the graph can process it, the queue buffers the backlog rather than losing events or slowing the source system. This decoupling is essential for production context graphs that ingest from high-throughput operational systems.

**See also:** Event Streaming Integration, Event-Driven Ingestion, Context Graph Write Path

#### Metadata

Data that describes other data — providing information about content, structure, origin, quality, and usage context rather than representing the primary data itself.

Metadata is the connective tissue of enterprise knowledge graphs and context graphs. Every decision trace carries metadata: who recorded it, when, from which source system, with what confidence. This metadata enables LLMs to assess the reliability of retrieved context — a decision trace with complete, validated metadata is more trustworthy than one with sparse or missing metadata.

**See also:** Technical Metadata, Business Metadata, Operational Metadata

#### Metadata Catalog Platform

A software system that inventories, documents, and governs data assets — including their schemas, lineage, quality, and ownership — providing a searchable repository of organizational data knowledge.

Metadata catalog platforms are primary source systems for context graph ingestion: the business metadata, lineage relationships, and quality scores stored in the catalog are high-value context for LLMs answering data questions. Context graphs that ingest from metadata catalogs give LLMs access to the full organizational knowledge about each data asset, not just its technical schema.

**See also:** Active Metadata Management, Data Dictionary, Business Glossary

#### Metadata Registry

A formal repository that stores standardized metadata about data elements, conforming to a defined schema such as ISO 11179, and providing APIs for registration, versioning, and search.

Metadata registries are the authoritative source of data element definitions for context graphs. When an LLM needs to understand what a specific data element means — its conceptual domain, permissible values, and naming convention — the context graph retrieves the registry entry and injects it as context, grounding the LLM's data interpretation in the organization's official standard.

**See also:** ISO 11179 Standard, Data Dictionary, Registry Entry

#### Metadata Tagging

The process of associating standardized labels or keywords with data assets to enable discovery, classification, and governance.

Metadata tags stored as node properties or linked tag nodes in a context graph enable faceted retrieval: LLM agents can filter candidate context by tag — for example, "find decision traces tagged 'credit-exception' AND 'enterprise-customer'" — before applying more expensive semantic ranking. Consistent tagging practices are a prerequisite for tag-based retrieval to deliver reliable results.

**See also:** Data Classification, Metadata, Active Metadata Management

#### Metadata Thesaurus

A structured vocabulary that defines relationships between metadata terms — including synonyms, broader terms, narrower terms, and related terms — enabling consistent tagging and improved search recall.

Metadata thesauri expand the vocabulary available for context graph retrieval: when a user asks about "revenue exceptions," the thesaurus links this to "sales carve-outs," "booking adjustments," and "contract deviations" — retrieving decision traces tagged with any related term. This synonym expansion significantly improves recall for organizational knowledge queries.

**See also:** Business Glossary, SKOS, Vocabulary Alignment

#### Metric Store

A centralized repository for business metric definitions, calculation logic, and historical values, designed to provide consistent metric access across analytical applications.

Metric stores are high-value context sources for LLMs answering analytical questions. Context graphs that integrate metric store definitions — as nodes with properties capturing formula, data source, business owner, and valid dimension combinations — enable LLMs to retrieve the exact metric definition needed for a given query rather than inferring it from column names.

**See also:** Business Metric, Semantic Layer, SQL-Based Semantic Layer

#### Missing Context Failure Mode

A failure pattern in LLM-powered systems in which the model generates incorrect or misleading outputs because critical organizational context was not retrieved or not present in the context window.

Missing context is often invisible to end users: the LLM produces a confident, fluent response that appears correct but is based on incomplete organizational knowledge. Context graphs reduce missing context failures by providing structured, comprehensive coverage of organizational decisions — but completeness must be actively monitored, as gaps in graph coverage directly translate to LLM blind spots.

**See also:** Context Completeness, Hallucination, Context Freshness

#### Missing Provenance

The condition in which a data element or decision record lacks the metadata needed to trace its origin, custody, or derivation history.

Missing provenance is both a data quality problem and a compliance risk. In context graphs, decision traces without provenance metadata — missing source system IDs, absent actor references, or undated decisions — cannot be reliably used for regulatory compliance queries. Provenance completeness must be enforced at ingestion time to prevent compliance gaps from accumulating silently.

**See also:** Data Provenance, Custody Chain, Data Quality

#### Model Audit Trail

A record of all changes to an AI model — including training runs, parameter updates, evaluation results, and deployment events — providing a complete history of the model's evolution.

Model audit trails complement decision trace context graphs: together they provide a complete picture of AI system behavior over time. When an AI system's outputs change after a model update, the audit trail identifies what changed in the model; the decision trace graph identifies which decisions were affected. The combination supports root cause analysis for compliance investigations.

**See also:** Audit Trail Design, Agent Trace, Compliance Reporting

#### Model Card

A structured document that describes an AI model's intended use, performance characteristics, limitations, training data, and ethical considerations.

Model cards provide context for LLM agents consuming context from graphs: when an agent retrieves a model card as part of its context, it understands the limitations and appropriate use cases of its own capabilities. For context graph deployments, model cards should document the specific organizational domains for which the model's retrieval and generation is validated.

**See also:** Explainability by Design, AI Red Teaming, LLM Evaluation Metric

#### Model Improvement Feedback

The process of using the outcomes of AI-assisted decisions — including human overrides, corrections, and quality ratings — to improve future model behavior through fine-tuning, retrieval improvement, or schema enhancement.

Context graphs enable systematic model improvement feedback collection: every human correction to an AI output can be written back as a high-quality decision trace, flagged for use in model improvement. Over time, the accumulated corrections create a training dataset that is uniquely valuable because it captures exactly the organizational edge cases where the model previously failed.

**See also:** Training Data from Traces, Agent Feedback Loop, Human Review Workflow

#### Module Replacement Strategy

An AI deployment strategy in which individual components of an existing workflow are replaced by AI-powered modules, while leaving the surrounding system intact.

Module replacement is typically the lowest-risk deployment strategy for context graphs: by replacing one step at a time — such as replacing manual policy lookup with context graph retrieval — teams can demonstrate value incrementally while limiting organizational disruption. Each replaced module provides a new source of decision trace data that enriches the context graph for subsequent replacements.

**Example:** A procurement workflow replaced its manual vendor precedent research step with an AI module backed by a context graph, leaving the approval routing and contract execution steps unchanged.

**See also:** Full System Replacement Strategy, New System Creation Strategy, Beachhead Workflow

#### Multi-Agent System

An architecture in which multiple AI agents, each with specialized capabilities, collaborate to accomplish tasks that exceed the capability of any single agent.

Multi-agent systems place complex demands on context graph retrieval: agents may query concurrently, write back conflicting traces, or require context synthesized from multiple subgraphs. Context graph infrastructure for multi-agent systems must provide consistency guarantees, access control at the agent-identity level, and coordination mechanisms that prevent write conflicts.

**See also:** Agent Orchestration, Agent Write-Back, Context Graph Access Control

#### Multi-Hop Retrieval

A retrieval strategy that traverses multiple relationship hops in a knowledge graph to find context that is not directly linked to the query entity but is reachable through intermediate nodes.

Multi-hop retrieval enables context graphs to answer questions that require following reasoning chains: "what policies govern this type of decision?" → "which exceptions to those policies have been approved?" → "what rationale was given for those exceptions?" Each hop adds a layer of organizational context that single-step retrieval misses, producing richer and more accurate LLM outputs.

**See also:** Graph Traversal, Path Query, Context Retrieval

#### Multi-Model Database

A database management system that natively supports multiple data models — such as graph, document, key-value, and relational — within a single storage engine and query interface.

Multi-model databases simplify context graph infrastructure by reducing the number of separate systems to manage. Rather than maintaining separate graph and document databases, a single multi-model system can store decision trace graph structure alongside the full-text content of policy documents, decision justifications, and entity records — reducing operational complexity and query latency for cross-model operations.

**See also:** Hybrid Storage Architecture, Graph Database, Vector Database

#### Named Entity Recognition

A natural language processing technique that identifies and classifies mentions of named entities — such as people, organizations, locations, and products — in unstructured text.

NER is a key technology for extracting entities from unstructured decision records (emails, documents, notes) and linking them to context graph nodes. Accurate NER is prerequisite to populating a context graph from text-based sources — errors in entity recognition propagate to entity linking failures that silently corrupt the organizational memory the graph stores.

**See also:** Information Extraction, Entity Disambiguation, Relation Extraction

#### Naming Convention Standard

A set of rules governing how data elements, tables, columns, and graph nodes/edges should be named within an organization, to ensure consistency and clarity.

Naming convention standards stored in a context graph as reference nodes enable LLMs to generate correctly named data elements, queries, and reports. When an agent retrieves the naming convention for a specific domain before generating a SQL column reference or a graph property name, it avoids the silent failures caused by misspelled or non-standard names.

**See also:** ISO 11179 Naming Convention, Column Naming Standard, Data Standardization

#### New System Creation Strategy

An AI deployment strategy in which a new system is built from scratch to replace an organizational process, rather than augmenting or replacing components of an existing system.

New system creation offers the highest design freedom but the longest time-to-value and the highest organizational change burden. For context graph deployments, new system creation is most appropriate for processes that are currently entirely manual — where no existing system captures decision traces — as these require building the full capture, storage, and retrieval stack simultaneously.

**See also:** Full System Replacement Strategy, Module Replacement Strategy, Beachhead Workflow

#### NIEM

National Information Exchange Model — a US government data exchange standard that provides a common vocabulary and framework for sharing information between government agencies and with private sector partners.

NIEM provides a domain-specific data standardization model for government context graphs. Organizations deploying context graph systems for government workflow automation can use NIEM's standardized entity types and relationship definitions as the foundation for their graph schema, ensuring interoperability with partner agencies and compliance with federal data exchange requirements.

**See also:** Data Standardization, Cross-Enterprise Data Dictionary, Reference Data Management

#### Node

A discrete entity or concept represented as a vertex in a graph database, identified by a label and carrying a set of properties.

Nodes are the fundamental data objects in a context graph. Every actor, decision, policy, entity, and outcome is represented as a node. The richness of context graph retrieval depends on the semantic precision of node labels and the completeness of node properties — sparse or generically labeled nodes produce low-quality retrieval results regardless of how well the graph is indexed.

**See also:** Edge, Node Label, Graph Property

#### Node Label

A type identifier assigned to a node in a labeled property graph, specifying the category of entity or concept the node represents.

Node labels are the schema vocabulary of a context graph. Clear, specific labels — `CreditDecision`, `PolicyVersion`, `ApprovalActor`, `ContractException` — make pattern queries readable and precise. Ambiguous or overly generic labels — `Item`, `Thing`, `Record` — create a query language that is indistinguishable from an untyped document store.

**See also:** Node, Edge Type, Graph Schema Governance

#### Object Class

In ISO 11179, a set of ideas, abstractions, or things in the real world that can be identified with fixed boundaries and meaning — the subject of a data element concept.

Object classes are the semantic anchors for data element definitions in enterprise context graphs. When a context graph stores object classes (e.g., `Person`, `Contract`, `Transaction`) as canonical nodes, data element concepts defined relative to those object classes can be unambiguously retrieved and interpreted by LLMs handling organizational data queries.

**See also:** Data Element Concept, ISO 11179 Standard, Canonical Entity Model

#### OLAP Semantic Layer Tool

A software product that defines, stores, and serves multidimensional business metric definitions as a semantic layer between raw data and analytical consumers.

OLAP semantic layer tools are important source systems for context graph ingestion: their metric definitions, hierarchies, and calculated measures are exactly the kind of organizational knowledge that LLMs need to answer analytical questions accurately. Context graphs that ingest from semantic layer tools carry the authoritative metric logic that prevents LLMs from generating incorrect calculations.

**See also:** Cube (Semantic Layer), Business Metric, Semantic Layer

#### Ontology

A formal, explicit specification of concepts, categories, and their relationships within a domain, used to enable shared understanding and inference across systems.

Ontologies provide the semantic framework for enterprise knowledge graphs. In context graph architectures, ontologies define the canonical vocabulary of organizational entities and relationships — the shared understanding that enables decision traces from different systems to be meaningfully linked and queried together. Without ontological alignment, cross-system context graphs accumulate irreconcilable terminology conflicts.

**See also:** Taxonomy vs Ontology, Knowledge Graph, Concept Harmonization

#### Ontology Mapping

The process of establishing correspondences between equivalent or related concepts in two or more ontologies, enabling data integration across systems that use different conceptual frameworks.

Ontology mapping is required when building federated context graphs that integrate decision traces from systems using different domain ontologies. A healthcare context graph integrating clinical decisions (using SNOMED CT) with administrative decisions (using internal ontologies) must establish mappings that enable cross-domain queries without conflating distinct concepts.

**See also:** Ontology, Schema Matching, Concept Harmonization

#### Open World Assumption

A logical assumption that states: if a fact is not known to be true, it may still be true — the absence of information does not imply negation.

The open world assumption governs RDF/OWL-based knowledge graphs and is often inappropriate for enterprise context graphs. In organizational decision-making, the absence of an approval is meaningful: if there is no approval edge in the context graph for a decision, the decision was not approved. Enterprise context graphs should be designed under the closed world assumption, where absence is interpretable.

**See also:** Closed World Assumption, RDF Lacks Scalability, Ontology

#### openCypher Standard

An open-specification version of the Cypher graph query language, maintained by the openCypher project to enable vendor-neutral implementation and interoperability across graph database systems.

openCypher adoption reduces context graph vendor lock-in: query patterns written to the openCypher specification can be executed on any compliant graph database. For long-lived organizational memory systems, this portability is a risk management consideration — the context graph must outlast any specific database vendor's product lifecycle.

**See also:** Cypher Query Language, GQL Standard, Graph Pattern Matching

#### OpenLineage Standard

An open specification and ecosystem for recording and sharing data lineage metadata across data pipelines and platforms, enabling interoperable lineage tracking.

OpenLineage provides a standardized format for lineage events that can be ingested into context graphs without system-specific transformation. Organizations that adopt OpenLineage across their data platform gain automatic lineage graph construction — enabling LLMs to answer provenance questions across the full data stack without manual lineage documentation.

**See also:** Data Provenance, Lineage Graph, Column-Level Lineage

#### Operational Log Graph

A context graph subgraph or specialized graph capturing operational event logs — system events, process executions, API calls, and workflow state transitions — linked to the entities and decisions they relate to.

Operational log graphs enable LLMs to answer questions about system behavior in organizational context: "what sequence of system events preceded this production incident, and which team decisions were made during the response?" This context, linking technical logs to organizational decisions, is unavailable from either the logs or the decision traces in isolation.

**See also:** Structured Logging, Process Mining, Engineering Incident Use Case

#### Operational Metadata

Metadata that describes the operational characteristics of a data element or system — such as update frequency, volume, latency, quality score, and availability — as opposed to its semantic meaning or technical structure.

Operational metadata stored in a context graph enables LLMs to calibrate their confidence in retrieved context: a data element with a 99.9% quality score and 5-minute update latency warrants more confidence than one with 85% quality and daily batch updates. Surfacing operational metadata alongside semantic context improves LLM output calibration.

**See also:** Technical Metadata, Business Metadata, Data Observability

#### Organizational Knowledge Gap

The difference between the specific organizational knowledge an LLM needs to answer a question accurately and the knowledge available in its training data or current context window.

The organizational knowledge gap is the concrete manifestation of the context problem. Every enterprise has unique policies, exceptions, decisions, and precedents that no public training data captures. Context graphs close this gap by providing the organizational-specific knowledge as structured, retrievable context — transforming the LLM from an uninformed generalist into an organizationally-aware specialist.

**See also:** Context Problem, Organizational Memory, Implicit Organizational Knowledge

#### Organizational Memory

The accumulated knowledge, experience, decisions, and practices that an organization retains over time, enabling consistent behavior, institutional learning, and continuity despite personnel changes.

Context graphs are the digital infrastructure for organizational memory. Human organizational memory is fragile — it lives in people's heads, informal documents, and email threads, and evaporates when employees leave. A context graph-based organizational memory is persistent, queryable, and scale-independent: it grows richer with each decision recorded, regardless of who made it or whether they are still with the organization.

**See also:** Knowledge Transfer, Tacit Knowledge, Implicit Organizational Knowledge

#### Out-of-Band Approval

An approval obtained through an informal or non-standard channel — such as a verbal agreement, email, or instant message — rather than through the official approval workflow.

Out-of-band approvals are among the most important and most commonly missing elements in organizational decision traces. They represent the gap between written policy and organizational practice — the implicit approvals that make organizations function but that evaporate without a record. Context graphs that actively capture out-of-band approvals (via structured logging of informal channels) provide a more complete organizational memory than systems that only record formal workflow approvals.

**See also:** Approval Chain, Exception Logic, Implicit Organizational Knowledge

#### PageRank

A graph algorithm that assigns importance scores to nodes based on the number and quality of inbound edges, originally designed for ranking web pages by link authority.

PageRank applied to a context graph can identify the most influential decision traces — those cited as precedent by many subsequent decisions — enabling retrieval pipelines to prioritize high-authority precedents over isolated or rarely-cited traces. This structural relevance signal complements semantic similarity scores in hybrid retrieval architectures.

**See also:** Centrality Measure, Graph Algorithm, Community Detection

#### Passive Metadata Cataloging

A metadata management approach in which metadata is collected through scheduled scans or manual documentation, without real-time discovery or automated propagation of changes.

Passive cataloging is inadequate for context graphs supporting live LLM agents because it introduces systematic staleness: source systems change between scans, and the context graph reflects outdated metadata during the gap. Active metadata management is the appropriate alternative, but passive cataloging may be acceptable for stable reference data that changes infrequently.

**See also:** Active Metadata Management, Metadata Catalog Platform, Context Freshness

#### Path Query

A graph query that finds one or more paths connecting specified nodes through a sequence of edges, optionally filtering by edge types, node labels, or property conditions along the path.

Path queries are the workhorses of approval chain reconstruction and precedent chain retrieval. A path query like "find all approval paths from this credit decision to a C-suite actor, through any number of intermediate approvers" retrieves the full authorization history for an audit — a query that is natural in Cypher but extremely complex to express in SQL.

**See also:** Graph Traversal, Multi-Hop Retrieval, Cypher Query Language

#### Permissible Value

In ISO 11179, a value from a value domain that is allowed for a specific data element, paired with its meaning and optional coded representation.

Permissible values stored in a context graph as linked reference nodes provide LLMs with the complete valid vocabulary for organizational data elements. When an agent retrieves the permissible values for a "decision outcome" field before generating a report, it produces correctly formatted, organizationally valid output rather than hallucinating non-standard values.

**See also:** Value Domain, Code List, ISO 11179 Standard

#### Personalization Graph

A graph that captures user preferences, behaviors, and interaction history to support personalized recommendations, content, and experiences.

Personalization graphs can be integrated with context graphs to provide LLM agents with the full context of a specific user's organizational history: their past decisions, their approval authority, their preferred communication patterns, and their relationship to specific entities. This combination of organizational memory and individual context enables highly personalized, contextually appropriate AI assistance.

**See also:** User Journey Graph, Session Graph, Graph-Based Recommendation

#### Pilot Program Design

The planning and design of an initial, bounded deployment of a new system or process, intended to validate assumptions, demonstrate value, and generate learnings before broader rollout.

Context graph pilot programs should be designed to answer three questions: Can we capture decision traces at sufficient quality and completeness? Does retrieved context measurably improve LLM accuracy? Does the improvement justify the organizational change required? Pilots that fail to instrument these questions produce anecdotes rather than evidence, making broader investment decisions difficult.

**See also:** Beachhead Workflow, Success Criteria Definition, ROI Measurement

#### Plan-and-Execute Pattern

An agent architecture in which the agent first generates a complete plan for achieving a goal — decomposing it into steps — and then executes the steps, potentially adapting the plan based on intermediate results.

Plan-and-execute agents benefit from context graph access at both the planning stage (retrieve relevant precedents before planning) and the execution stage (retrieve specific context for each step). This two-phase retrieval pattern typically produces more coherent plans and more accurate execution than single-stage retrieval architectures.

**See also:** ReAct Pattern, Agent Planning, Agent Loop

#### Policy Enforcement

The automated or manual application of organizational policies to data operations, decisions, and access requests, ensuring compliance with governance rules.

Policy enforcement nodes and edges in context graphs capture which policies were applied to which decisions and how. LLMs can retrieve policy enforcement history to understand precedent: "has this type of policy been strictly enforced in the past, or has it been consistently waived for certain conditions?" This policy precedent context enables more nuanced, organizationally-aligned recommendations.

**See also:** Policy Version Reference, Data Governance Framework, Regulatory Compliance

#### Policy Version Edge

A directed edge in a context graph connecting a decision node to the specific version of the policy that governed the decision at the time it was made.

Policy version edges are critical for temporal compliance queries: auditors need to verify that decisions followed the policy in effect at decision time, not the current policy. Storing this relationship as an explicit, timestamped edge — rather than relying on the policy's current version — makes this query answerable from graph traversal alone.

**See also:** Policy Version Reference, Decision Trace Edge Types, Bitemporal Modeling

#### Policy Version Reference

A structured reference, stored as a property or linked node in a context graph, that identifies the specific version of an organizational policy that was in effect and consulted at the time of a decision.

Policy version references are the compliance backbone of decision trace graphs. Without them, it is impossible to verify whether a decision followed the correct policy — because the policy may have changed between the decision date and the audit date. Every decision trace should carry at least one policy version reference, stored as an edge to a versioned policy node.

**See also:** Policy Version Edge, Decision Trace, Temporal Versioning

#### Post-Hoc Context Capture

The practice of reconstructing decision context from existing records after a decision has been made, rather than capturing context in real time at the moment of the decision.

Post-hoc capture is less accurate and less complete than real-time capture: the implicit reasoning, the alternatives considered, and the informal consultations that shaped a decision are difficult or impossible to reconstruct later. Context graphs that rely primarily on post-hoc capture accumulate systematically incomplete decision traces that underperform real-time traces as LLM context.

**See also:** Real-Time Context Capture, Decision Context Capture, Backfill Strategy

#### Post-Hoc Explainability

An approach to AI explainability that adds explanation capability to a system after it has been built, typically by analyzing model internals or outputs without access to the decision process.

Post-hoc explainability is structurally inferior to explainability by design for context graph systems. Generating explanations for LLM outputs after the fact requires reverse-engineering why the model produced a specific output — an imprecise and unreliable process. Context graphs provide built-in explainability: every output is grounded in retrievable, citable context elements.

**See also:** Explainability by Design, GDPR Explainability Requirement, Algorithmic Accountability

#### Precedent Chain Pattern

A graph schema pattern in which a sequence of related decisions is linked by `PRECEDED_BY` edges, creating a traversable chain of organizational case law that documents how policy interpretation has evolved over time.

Precedent chain patterns enable LLMs to understand the trajectory of organizational decision-making, not just the current state. Retrieving the full precedent chain for a decision type — from the earliest recorded example to the most recent — provides a richer, more nuanced context than any single precedent in isolation.

**See also:** Linked Precedent, Historical Precedent, Precedent Link

#### Precedent Link

A directed edge in a context graph connecting a current or future decision to a prior decision that was cited as justification or analogical support.

Precedent links are the edges that turn isolated decision nodes into an organizational case law graph. When an LLM retrieves a decision node and follows its precedent links, it gains access to the chain of organizational reasoning that led to the current state — context that is unavailable from any single decision in isolation.

**See also:** Linked Precedent, Precedent Chain Pattern, Decision Justification

#### Process Discovery

A process mining technique that automatically constructs a process model from an event log, revealing the actual execution patterns of an organizational process.

Process discovery applied to organizational event logs can identify the actual decision flow — including undocumented exceptions, alternative paths, and informal approval sequences — that context graphs should capture. The discovered model serves as the schema template for structuring decision traces from the same process type.

**See also:** Process Mining, Conformance Checking, Event Log

#### Process Enhancement

A process mining technique that augments a reference process model with additional information extracted from event logs — such as performance metrics, decision points, or resource assignments.

Process enhancement applied to context graphs enriches decision trace nodes with operational metrics: how long did this approval take, which decisions involved the most back-and-forth, which approval paths are most efficient? This enriched context helps LLMs provide not just decision recommendations but process improvement insights.

**See also:** Process Mining, Process Discovery, Conformance Checking

#### Process Mining

An analytical discipline that uses event log data to discover, monitor, and improve organizational processes by extracting process models and performance insights from digital footprints.

Process mining is a natural complement to context graph construction: process mining tools extract the actual process flow from event logs, revealing the decision points and exception paths that context graphs should capture. The combination of process mining (for process understanding) and context graphs (for decision memory) provides a comprehensive organizational intelligence layer.

**See also:** Event Log, Process Discovery, IEEE XES Standard

#### Procurement Use Case

The application of context-graph-augmented LLMs to procurement workflows — including vendor evaluation, contract approval, exception handling, and compliance documentation.

Procurement involves complex policy hierarchies, cross-functional approvals, and high exception volumes — ideal conditions for context graph deployment. Context graphs storing procurement decision traces enable LLMs to answer questions like "what criteria justified selecting this vendor over lower-cost alternatives, and who approved the exception to the standard selection process?"

**See also:** Supply Chain Use Case, Exception-Heavy Workflow, Approval Chain

#### Product Catalog Graph

A context graph subgraph or specialized graph representing products, their attributes, pricing decisions, configuration options, and the organizational decisions that govern them.

Product catalog graphs enable LLMs to answer complex product questions that span pricing decisions, engineering specifications, and sales exceptions. When a customer requests a non-standard configuration, the LLM can retrieve the history of similar requests — what was approved, what was rejected, and on what basis — enabling consistent, policy-grounded responses.

**See also:** Cross-System Entity Linking, CRM Graph Integration, Enterprise Knowledge Graph

#### Product Quantization

A vector compression technique that approximates high-dimensional embedding vectors using a product of lower-dimensional quantized sub-vectors, reducing memory requirements for large-scale vector indexes.

Product quantization enables context graph deployments to maintain large vector indexes for semantic retrieval without proportional memory costs. For enterprise deployments with millions of embedded decision traces, PQ compression can reduce index memory by 8-32x with modest accuracy loss — a favorable tradeoff for most retrieval applications.

**See also:** HNSW Index, Vector Database, Approximate Nearest Neighbor

#### Production Decision Record

A structured record of a decision made during a production incident — including the problem diagnosis, options considered, actions taken, and outcomes — stored in a context graph for future reference.

Production decision records enable LLMs to assist with incident response by retrieving similar past incidents and their resolutions. Rather than requiring on-call engineers to remember or search for past solutions under pressure, the context graph surfaces the most relevant precedents automatically, accelerating resolution and reducing errors caused by stress-impaired recall.

**See also:** Engineering Incident Use Case, IT Operations Use Case, Decision Record Format

#### Prompt

The text input provided to an LLM to guide its generation, typically including instructions, context, examples, and the specific question or task.

Prompts are the delivery mechanism for context graph retrievals: retrieved decision traces, policy excerpts, and entity definitions are formatted and inserted into the prompt before the LLM generates its response. Prompt design for context-graph-augmented LLMs requires careful attention to context placement, formatting, and instruction clarity to maximize the model's use of the retrieved organizational knowledge.

**See also:** System Prompt, Prompt Engineering with Context, Context Graph Prompt Template

#### Prompt Engineering with Context

The practice of designing LLM prompts that effectively incorporate retrieved contextual information — such as decision traces from a context graph — to maximize the accuracy and relevance of generated responses.

Effective prompt engineering for context graph systems involves: structuring retrieved context for maximum LLM comprehension, providing clear instructions for using the context, framing uncertainty appropriately when context is incomplete, and formatting output requirements consistently. Small prompt engineering improvements can produce large accuracy gains with the same retrieval quality.

**See also:** Context Graph Prompt Template, Few-Shot Context Injection, Grounding Strategy

#### Prompt Injection Risk

The security vulnerability in which an attacker embeds malicious instructions within input text that will be processed by an LLM, causing the model to ignore its original instructions and execute the attacker's commands instead.

Prompt injection is especially dangerous in context graph systems because retrieved context is inserted into prompts automatically. If an attacker can influence the content of retrieved decision traces — through a compromised source system, a crafted entity name, or a malicious document — they can inject instructions that override the system prompt. Defense requires sanitization of all context before prompt insertion.

**See also:** Context Injection Attack, Agent Sandboxing, Context Graph Access Control

#### Property (ISO 11179)

In ISO 11179, a characteristic of an object class that is of interest for data definition purposes — the second component of a data element concept, combined with the object class.

ISO 11179 properties provide the semantic middle layer between object classes and specific data elements. In context graphs, understanding that a field is the `date_of_birth` property of the `Person` object class — rather than just a column named `dob` — gives LLMs the semantic grounding needed to interpret the field correctly across any system representation.

**See also:** ISO 11179 Standard, Data Element Concept, Object Class

#### Property Graph Database Selection

The process of evaluating and choosing a property graph database engine for a context graph deployment, based on query language, scalability, performance, ecosystem, and operational requirements.

Database selection for context graphs involves tradeoffs specific to the use case: read-heavy retrieval workloads favor index-optimized engines; write-heavy ingestion workloads favor append-optimized engines; compliance requirements may mandate specific geographic data residency. The selection should be driven by the context graph's dominant workload pattern, not general-purpose benchmarks.

**See also:** Graph Database, Context Graph Storage Layer, Hybrid Storage Architecture

#### Property Graph Scale

The range of graph sizes — measured in nodes, edges, and properties — that a property graph database can effectively handle while maintaining acceptable query performance.

Scale considerations are critical for long-lived context graph deployments. Decision traces accumulate continuously; a graph that performs well at 10 million nodes may degrade unacceptably at 1 billion. Scale planning must account for expected growth rates, peak query volumes, and the specific query patterns of the LLM retrieval workload — not just total storage capacity.

**See also:** Billion-Edge Graph, Graph Sharding, Context Graph Cardinality

#### Property Normalization

The process of ensuring that property values stored in a graph are in a consistent, canonical form — standardizing date formats, units, string case, and coded values — to enable reliable filtering and aggregation.

Property normalization at ingestion time prevents subtle but consequential retrieval failures: a date stored as "2024-03-15" in one source system and "15/03/2024" in another will not match timestamp filters unless normalized. For context graph properties used in temporal queries or compliance checks, normalization is a correctness requirement, not merely a quality preference.

**See also:** Data Standardization, Data Quality Rule, Graph Ingestion Pattern

#### Provenance Record

A structured record documenting the origin, custody history, and transformation chain of a specific data artifact or decision, providing an auditable chain of evidence for its trustworthiness.

Provenance records stored as context graph nodes are the data trust infrastructure for LLM-generated outputs. When an LLM makes a factual claim derived from a retrieved decision trace, the provenance record of that trace — documenting its source system, recording timestamp, and validation status — provides the evidence needed to assess whether the claim is trustworthy enough for a given use case.

**See also:** Data Provenance, Custody Chain, Lineage vs Provenance

#### Purpose-Built System

A software system designed specifically for a narrow, well-defined use case, as opposed to a general-purpose system adapted to serve the use case.

Purpose-built context graph systems outperform general-purpose graph databases adapted for organizational memory because they embed the right schema patterns, ingestion pipelines, and LLM integration patterns from the start. The architectural advantage of purpose-built design — where every component is optimized for the context retrieval use case — compounds over time as the system grows.

**See also:** Context Graph Startup, Competitive Moat, Structural Advantage

#### Query Federation

The capability to execute a query across multiple data sources simultaneously, combining results from each source into a unified response.

Query federation enables context graph architectures to retrieve context from multiple specialized graphs in a single agent query — for example, combining HR decision traces with finance approval records for a compensation review. Federation must manage consistency across sources and handle partial failures gracefully, returning the context that is available rather than failing completely when one source is unavailable.

**See also:** Data Virtualization, Federated Graph Architecture, Cross-Graph Reference

#### RAG Limitations

The constraints and failure modes of Retrieval-Augmented Generation systems, including retrieval recall failures, context window limits, stale document indexes, and the inability to traverse structured relationships.

RAG limitations are the motivation for context graph architectures. Standard RAG retrieves document chunks using vector similarity, which works well for unstructured knowledge but fails for organizational decision queries that require: traversing approval chains, filtering by actor role and timestamp, comparing to specific policy versions, or aggregating patterns across many decisions. Context graphs address exactly these structural retrieval gaps.

**See also:** Retrieval-Augmented Generation, Context Graph vs Vector Store, Hybrid Retrieval

#### RDF Lacks Scalability

A characteristic limitation of the Resource Description Framework (RDF) graph model — its triple-store architecture, SPARQL query language, and open-world assumption create performance and practical scaling challenges for enterprise-scale, high-throughput organizational knowledge graphs.

This term describes the empirical observation that RDF/triple-store systems have struggled to match the query performance, tooling ecosystem, and developer experience of property graph databases at enterprise scale. For context graphs requiring sub-second retrieval, high write throughput, and complex pattern matching, property graph databases (Cypher/GQL) are generally preferred over RDF/SPARQL architectures.

**See also:** Open World Assumption, Closed World Assumption, Labeled Property Graph

#### ReAct Pattern

Reasoning and Acting — an agent architecture pattern in which the agent alternates between generating reasoning steps (thoughts) and taking actions (tool calls), with each reasoning step informed by the results of the previous action.

The ReAct pattern maps naturally to context graph retrieval: the agent reasons about what context it needs, queries the context graph as an action, observes the retrieved traces, reasons about what additional context might be needed, queries again, and so on until sufficient context has been assembled to generate the final response. This iterative retrieval pattern enables precise context assembly without pre-specifying all needed context.

**See also:** Plan-and-Execute Pattern, Agent Loop, Multi-Hop Retrieval

#### Read-Path Limitation

A constraint on what information can be retrieved from an existing system because the data was never captured at write time — the absence of captured context that cannot be recovered retroactively from read-only access.

Read-path limitations explain why context graphs must be written in real time rather than built post-hoc: the implicit reasoning, informal consultations, and alternatives considered during a decision exist only at decision time. Any system that attempts to build organizational memory purely from reading existing records will systematically miss the tacit knowledge that read-path-only access cannot recover.

**See also:** Write-Path Advantage, Post-Hoc Context Capture, Tacit Knowledge

#### Real-Time Context Capture

The practice of recording decision context at the exact moment a decision is made, using event-driven pipelines that immediately write decision traces to the context graph.

Real-time capture is the gold standard for context graph data quality. It prevents the information loss that occurs when context is reconstructed post-hoc: the exact data consulted, the alternatives considered, and the informal reasoning are captured while they are present. Real-time capture requires instrumentation of decision-making workflows — a non-trivial integration challenge that is the primary implementation cost of context graph systems.

**See also:** Post-Hoc Context Capture, Decision Context Capture, Event-Driven Ingestion

#### Real-Time Ingestion

The continuous loading of data into a context graph with minimal latency between the occurrence of an event in a source system and its availability for LLM query.

Real-time ingestion is required for context graphs supporting live decision-support applications where the most recent decisions must be available immediately. Implementation requires event streaming infrastructure, fast entity resolution, and low-latency graph write paths — a more complex and expensive architecture than batch ingestion that is justified only by use cases with strict freshness requirements.

**See also:** Event-Driven Ingestion, Batch Ingestion, Change Data Capture

#### Real-Time Trace Recording

The capture of a decision trace — including all relevant context, actors, policies, and outcomes — into the context graph at the exact time the decision is made.

Real-time trace recording is the implementation goal of real-time context capture. It requires that decision-making systems emit structured events at each decision point, that ingestion pipelines process these events with low latency, and that the graph write path is fast enough to keep up with peak decision volumes without backpressure.

**See also:** Real-Time Context Capture, Event-Driven Graph Update, Context Graph Write Path

#### Reference Data Management

The governance and technical management of stable, shared reference datasets — such as country codes, currency codes, and industry classifications — used across multiple systems.

Reference data managed in a context graph as canonical code list nodes enables LLMs to interpret coded values correctly across all source systems. When a decision trace contains a country code, the LLM can retrieve the authoritative name and associated attributes from the reference data node rather than relying on its training-data knowledge of country codes, which may be outdated.

**See also:** Code List, Master Data Management, Data Standardization

#### Reflection Pattern

An agent architecture pattern in which the agent evaluates its own outputs against defined criteria — such as accuracy, completeness, or policy compliance — and iteratively revises them before returning a final response.

Reflection patterns are particularly effective for context-graph-augmented agents: the reflection step can verify that every claim in the draft output is grounded in a specific retrieved context element, flagging unsupported statements for revision or escalation. This self-audit capability dramatically reduces the hallucination rate in high-stakes organizational decision outputs.

**See also:** Agent Evaluation, LLM Output Validation, Hallucination Mitigation

#### Registered Item

In ISO 11179, any metadata element — such as a data element or classification scheme — that has been formally registered in a metadata registry and assigned a unique identifier.

Registered items provide the authoritative, citable identifiers that context graphs use to reference organizational data standards. When a decision trace references a specific registered data element by its registry ID, future queries can retrieve the complete, authoritative definition — including all historical versions — from the metadata registry node in the context graph.

**See also:** ISO 11179 Standard, Registration Authority, Metadata Registry

#### Registration Authority

In ISO 11179, an organization designated with responsibility for administering a metadata registry — accepting registration submissions, assigning identifiers, and maintaining the registry's integrity.

Registration authorities are the governance backstop for enterprise data standardization. Context graphs that expose registration authority information — which authority governs which data element definitions — enable LLMs to assess the authority and trustworthiness of retrieved data definitions before using them to ground organizational responses.

**See also:** ISO 11179 Standard, Administered Item, Metadata Registry

#### Registry Entry

A formal record in a metadata registry representing a specific data element, classification scheme, or other metadata artifact, with standardized attributes including identifier, definition, version, and status.

Registry entries are the atomic units of organizational data knowledge in ISO 11179-compliant context graphs. Each registry entry node stores the authoritative definition, naming, and status of a data element — providing LLMs with a single, citable source of truth for organizational data interpretation.

**See also:** ISO 11179 Standard, Metadata Registry, Data Definition

#### Registry Search API

A programmatic interface for querying a metadata registry — searching for data elements by name, concept, domain, or identifier — enabling automated discovery of organizational data standards.

Registry search APIs enable LLM agents to dynamically discover relevant data element definitions at query time, rather than requiring all definitions to be pre-loaded into the context window. This dynamic discovery pattern makes context graphs adaptive to queries about unfamiliar data elements, retrieving only the definitions needed rather than injecting the entire registry.

**See also:** Metadata Registry, Context Graph API, Context Retrieval

#### Registry vs Catalog

A distinction between a metadata registry (a formal, governed repository of standardized data element definitions) and a metadata catalog (a broader inventory of data assets that may include informal or automatically discovered metadata).

Registries provide higher-quality, more authoritative metadata but cover a narrower set of formally standardized data elements. Catalogs provide broader coverage but lower consistency. Context graphs typically ingest from both: registry entries provide the authoritative definitions for core organizational data elements; catalog metadata provides the broader coverage needed for LLMs working with less standardized data.

**See also:** Metadata Registry, Metadata Catalog Platform, ISO 11179 Standard

#### Regulatory Audit Automation

The use of AI systems to automate or accelerate the preparation, execution, and documentation of regulatory compliance audits.

Context graphs are a natural infrastructure for regulatory audit automation: their structured decision traces, policy version references, and approval chain edges provide the exact information regulators require, in a format that is directly queryable rather than requiring manual document review. Automated audit reports generated from graph queries can reduce audit preparation time from weeks to hours.

**See also:** Compliance Reporting, Audit Trail Design, Regulatory Compliance

#### Regulatory Compliance

The adherence of an organization's practices, systems, and decisions to applicable laws, regulations, and industry standards.

Regulatory compliance is one of the most compelling economic drivers for context graph adoption. The cost of non-compliance — fines, remediation, reputational damage — is quantifiable, and context graphs reduce compliance risk through decision trace capture, policy version tracking, and automated audit trail generation. This clear ROI case makes compliance a natural beachhead for context graph investment.

**See also:** Compliance Reporting, EU AI Act, GDPR Explainability Requirement

#### Reinforcement Learning from Human Feedback

A fine-tuning technique in which an LLM is trained on human preference signals — ratings of model outputs — to improve alignment with human values and organizational norms.

RLHF trained on organizational decision feedback can align LLMs with specific organizational norms and risk tolerances. When human reviewers rate AI-recommended decisions in context graph workflows, these ratings become training signal for RLHF — complementing context graph retrieval improvements with model-level alignment to organizational preferences.

**See also:** Fine-Tuning, Instruction Tuning, Training Data from Traces

#### Relation Extraction

The natural language processing task of identifying and classifying semantic relationships between entities mentioned in text.

Relation extraction enables context graphs to ingest decision traces from unstructured sources by automatically identifying relationships — who approved what, which policy applies, which entity is involved — and converting them to graph edges. The quality of relation extraction directly determines the structural richness of traces ingested from text sources.

**See also:** Information Extraction, Named Entity Recognition, Knowledge Graph

#### Relevance Ranking

The process of ordering retrieved context items from most to least relevant to a given query, determining which items are included in the context window when the total retrieved volume exceeds the budget.

Relevance ranking is the decision gate between retrieval and generation: a perfect retrieval that returns the right context items in the wrong order (putting the most relevant last) can degrade LLM performance due to the "lost in the middle" attention phenomenon. Graph-aware ranking that considers both semantic similarity and structural proximity to the query entity typically outperforms pure similarity ranking for organizational knowledge retrieval.

**See also:** Context Reranking, Hybrid Retrieval, Context Window Budget

#### Retail Personalization Use Case

The application of context-graph-augmented LLMs to retail workflows — including personalized product recommendations, promotion targeting, inventory exception decisions, and customer complaint resolution.

Retail personalization combines customer graph data (purchase history, preferences, interactions) with organizational decision context (pricing exceptions approved, promotions applied, complaint resolutions granted) to enable AI agents that are genuinely customer-aware. Context graphs integrate these two layers — customer entity graph and organizational decision graph — enabling more relevant and consistent personalization than either layer alone.

**See also:** Personalization Graph, Customer Success Use Case, Graph-Based Recommendation

#### Retrieval-Augmented Generation

An AI architecture in which an LLM's generation is augmented by context retrieved from an external knowledge store — such as a document index or context graph — at query time, grounding the model's outputs in retrieved facts rather than training data alone.

RAG is the foundational architecture for context-graph-augmented LLMs. Standard RAG uses vector stores for retrieval; context graph RAG extends this with structured graph retrieval that enables precise, relationship-aware context assembly. The context graph addresses RAG's limitations — structural retrieval needs, temporal filtering, cross-system context synthesis — that document-chunk retrieval cannot satisfy.

**See also:** RAG Limitations, Context Retrieval, Hybrid Retrieval

#### Revenue Reporting Exception

A case in which standard revenue recognition or reporting rules are overridden, modified, or supplemented by a specific organizational decision, creating a deviation from standard financial reporting.

Revenue reporting exceptions are high-stakes organizational decisions that must be captured precisely in context graphs. When an LLM is asked to generate or validate a revenue report, the presence of exceptions — and their justifications, approvals, and policy references — in the context graph prevents the model from applying standard rules mechanically to cases that require exception-aware calculation.

**See also:** ARR Definition Conflict, Finance Automation Use Case, Decision Justification

#### Right to Explanation

The legal entitlement of individuals to receive a meaningful explanation of automated decisions that significantly affect them, established by GDPR Article 22 and similar regulations.

The right to explanation creates direct regulatory demand for context graph decision trace capabilities. When an individual challenges an automated credit decision, employment decision, or insurance claim determination, the context graph provides the explanation infrastructure: retrieving the specific policy applied, the data consulted, and the reasoning chain for the specific decision — enabling a legally sufficient, individually-specific explanation.

**See also:** GDPR Explainability Requirement, Explainability by Design, EU AI Act

#### Risk Management Use Case

The application of context-graph-augmented LLMs to risk identification, assessment, and mitigation workflows — including credit risk, operational risk, model risk, and enterprise risk management.

Risk management involves complex, multi-factor decisions that require context from across the organization: prior risk events, policy exceptions, market conditions, and regulatory requirements. Context graphs that integrate risk decision traces from multiple domains enable LLMs to provide holistic risk assessments grounded in organizational history rather than generic risk frameworks.

**See also:** Insurance Claims Use Case, Financial Services Compliance, Regulatory Compliance

#### ROI Measurement

The process of quantifying the return on investment of a system or initiative relative to its cost, enabling comparison with alternative investments.

ROI measurement for context graph deployments must capture both hard savings (reduced analyst hours, faster audit preparation) and soft value (fewer hallucinated AI decisions, improved regulatory compliance). The strongest ROI narratives combine a quantified reduction in a specific cost — such as time spent on exception research — with the prevention of a quantifiable risk event — such as a compliance violation.

**See also:** Context Graph ROI Model, Decision Quality Metric, Pilot Program Design

#### Row-Level Security in Graph

An access control mechanism that restricts which individual nodes or edges a given user or role can read, based on properties of the node, the user, or both.

Row-level security in graph databases is more complex to implement than in relational databases because access to a node may need to consider the traversal path that led to it — a node visible through one relationship may need to be hidden when accessed through another. This path-context-dependent access control is a unique security requirement of graph systems that general row-level security frameworks may not address.

**See also:** Access Control, Attribute-Based Access Control, Graph Security Model

#### Rule-Based Reasoning

A reasoning approach in which conclusions are drawn by applying explicit, human-defined logical rules to known facts.

Rule-based reasoning is a complement to LLM-based reasoning in context graph systems. For decisions governed by clear, auditable policy rules — such as eligibility checks or threshold comparisons — rule-based reasoning provides deterministic, explainable outputs that LLMs cannot reliably replicate. Context graphs can store rule definitions as nodes and trigger rule-based reasoning for specific decision types while using LLM reasoning for more nuanced cases.

**See also:** Inference Engine, Transitive Closure, Ontology

#### Sales Engagement Use Case

The application of context-graph-augmented LLMs to sales processes — including account research, proposal generation, objection handling, and deal approval.

Sales workflows involve complex relationship context — account history, competitive positioning, pricing exceptions, and stakeholder preferences — that is distributed across CRM, proposal tools, and email archives. Context graphs that integrate sales decision traces enable LLMs to provide account-specific recommendations grounded in the full history of the organization's relationship with a customer.

**See also:** Sales Playbook Precedent, CRM Graph Integration, Customer Success Use Case

#### Sales Playbook Precedent

A historical decision or outcome from a past sales engagement that is stored as a context graph trace and retrieved as a reference for structuring similar future engagements.

Sales playbook precedents transform static playbook documents into a dynamic, case-based retrieval system. Rather than searching a document for relevant advice, a sales AI retrieves the three most similar past deals from the context graph — complete with the strategies used, objections encountered, exceptions approved, and outcomes achieved — providing concrete, evidence-based guidance.

**See also:** Sales Engagement Use Case, Historical Precedent, Few-Shot Context Injection

#### Sales Workflow AI System

An AI system purpose-built to automate and augment sales department workflows, using context graphs to ground decisions in account history, competitive intelligence, and sales precedent.

Sales workflow AI systems are one of the three primary market opportunities identified in the book. The sales context graph must capture deal decision traces, competitive responses, pricing exceptions, and customer relationship history — context that is distributed across CRM, email, and proposal tools — to provide the account-specific intelligence that makes AI sales assistance genuinely useful.

**See also:** Sales Engagement Use Case, CRM Graph Integration, Beachhead Workflow

#### Schema Drift

The gradual divergence of a data schema from its intended design, caused by uncoordinated changes, informal extensions, and undocumented modifications that accumulate over time.

Schema drift is a long-term maintenance risk for context graphs: as new source systems are integrated and new decision types are added without formal schema review, the graph schema becomes increasingly inconsistent and difficult to query reliably. Graph schema governance processes — including formal review of schema changes and enforcement of naming conventions — are the primary defense against schema drift.

**See also:** Graph Schema Governance, Schema Evolution, Graph Schema Evolution

#### Schema Evolution

The process of intentionally and safely modifying a data schema over time as requirements change, maintaining backward compatibility while enabling forward progress.

Schema evolution in context graphs must preserve the ability to query historical decision traces under both old and new schema shapes. Property graphs support additive evolution natively — new properties can be added without affecting existing data — but breaking changes require migration tooling and careful coordination with all consuming agents and applications.

**See also:** Schema Drift, Context Graph Migration, Context Graph Versioning

#### Schema Matching

The process of automatically or semi-automatically identifying correspondences between fields in two different schemas that represent the same or equivalent concepts.

Schema matching is a prerequisite for integrating new source systems into a context graph. When a new HR system is onboarded, its employee schema must be matched to the canonical employee node type in the context graph — identifying which source fields map to which graph properties. Automated schema matching accelerates this integration but requires human validation to prevent silent mapping errors.

**See also:** Ontology Mapping, Concept Harmonization, Graph ETL Pipeline

#### Schema Registry

A centralized repository that stores and versions the schemas of data streams, events, and APIs, enabling producers and consumers to coordinate on data structure changes.

Schema registries are an operational necessity for event-driven context graph ingestion: when source systems publish events to a streaming platform, the schema registry stores the event schema and notifies consumers of version changes. Context graph ingestion pipelines subscribe to schema registry updates to adapt their transformation logic before the new schema version reaches production.

**See also:** Schema Evolution, Event Streaming Integration, Data Contract

#### Semantic Consistency

The property of data definitions being coherent and non-contradictory across systems — ensuring that the same term means the same thing in all contexts it appears.

Semantic consistency is a prerequisite for reliable context graph retrieval. When "customer" means different things in different systems, the context graph must disambiguate before linking decision traces to customer entities. Without semantic consistency enforcement, LLMs retrieving cross-system context encounter contradictory definitions that degrade response quality.

**See also:** Concept Harmonization, Ontology, Business Glossary

#### Semantic Layer

An abstraction layer between raw data sources and data consumers that defines business metrics, dimensions, and relationships in business terms, independent of the underlying physical data structures.

Semantic layers are critical source systems for LLM context: they contain the authoritative definitions of business metrics, the approved join paths between tables, and the business-friendly names for technical data elements. Context graphs that ingest semantic layer definitions enable LLMs to answer analytical questions with organizational accuracy rather than technical inference.

**See also:** SQL-Based Semantic Layer, Business Metric, OLAP Semantic Layer Tool

#### Semantic Search

A search approach that retrieves results based on semantic meaning and conceptual similarity rather than exact keyword matches.

Semantic search over context graphs enables retrieval of relevant decision traces even when the query terminology differs from the terminology used in the traces. An LLM agent asking about "price adjustments" can retrieve traces recorded as "discount approvals" or "contract modifications" through semantic similarity — extending recall beyond what keyword-exact graph queries deliver.

**See also:** Dense Retrieval, Hybrid Retrieval, Embedding Model

#### Semantic Similarity

A measure of how closely related two pieces of text or data are in meaning, typically computed as the cosine similarity of their vector embeddings.

Semantic similarity is the relevance signal for vector-based retrieval in hybrid context graph architectures. Two decision traces may have high semantic similarity even if they use different terminology — an "ARR exception" and a "recurring revenue carve-out" may describe equivalent decisions. Semantic similarity retrieval catches these terminological variations that exact graph pattern matching misses.

**See also:** Vector Embedding, Dense Retrieval, Semantic Search

#### Semantic Triple

A three-part data structure consisting of a subject, predicate, and object — the fundamental unit of RDF-based knowledge representation, expressing a single fact as a directed labeled relationship.

Semantic triples are the atomic facts of RDF-based knowledge graphs. While context graphs typically use the property graph model rather than RDF, the triple concept is useful for understanding how graph relationships encode meaning: `(Customer:Acme) -[HAD_EXCEPTION_APPROVED]-> (Policy:CreditPolicy_v2.1)` expresses a single organizational fact as a typed, directed relationship.

**See also:** RDF Lacks Scalability, JSON-LD, Ontology

#### Sentence Transformer

A type of embedding model based on the BERT architecture, fine-tuned to produce semantically meaningful sentence-level vector representations optimized for similarity comparison.

Sentence transformers are the most widely used embedding models for semantic retrieval over enterprise text. For context graph systems, sentence transformers convert decision trace text — justifications, policy excerpts, entity descriptions — into vectors that enable semantic similarity search across millions of historical records at query time.

**See also:** Embedding Model, Dense Retrieval, Vector Embedding

#### Session Graph

A graph that captures the sequence of interactions, events, and decisions within a single user session, enabling analysis of user behavior patterns and context-aware personalization.

Session graphs provide per-session context that complements the longer-term organizational memory in context graphs. An LLM agent with access to both the session graph (what happened in this conversation) and the context graph (what the organization has decided in the past) can provide contextually appropriate, organizationally grounded assistance throughout an interaction.

**See also:** User Journey Graph, Personalization Graph, Agent Memory Architecture

#### Short-Term vs Long-Term Memory

The distinction between an AI agent's working memory — the current context window containing information for the immediate task — and persistent memory — information stored externally and retrievable across sessions.

Context graphs serve as the long-term memory tier in a complete agent memory architecture. Short-term memory (context window) holds the current task state and retrieved context; long-term memory (context graph) holds the accumulated organizational decisions and precedents that make the agent knowledgeable across sessions. Effective agent design explicitly manages what moves between these tiers.

**See also:** Long-Term Memory for AI, Agent Memory Architecture, Context Window Management

#### Shortest Path Algorithm

A graph algorithm that finds the minimum-weight path between two nodes in a graph, such as Dijkstra's algorithm or BFS.

Shortest path algorithms applied to context graphs can identify the most direct organizational connection between two entities — for example, the shortest approval chain between a frontline employee and the executive authority required for a specific exception. This structural insight informs both decision-support recommendations and organizational efficiency analysis.

**See also:** Graph Algorithm, Graph Traversal, Path Query

#### SKOS

Simple Knowledge Organization System — a W3C standard for expressing knowledge organization systems such as thesauri, classification schemes, and subject heading systems in RDF.

SKOS provides a standard vocabulary for representing hierarchical and associative relationships between concepts in enterprise metadata systems. Context graphs that incorporate SKOS-structured concept hierarchies enable LLM agents to navigate organizational vocabulary — understanding broader, narrower, and related terms — when retrieving and interpreting decision traces that use domain-specific terminology.

**See also:** Ontology, Metadata Thesaurus, Vocabulary Alignment

#### Slowly Changing Dimension

A data warehousing concept describing a dimension attribute whose value changes infrequently over time, requiring a strategy for tracking current and historical values.

SCD patterns inform temporal design in context graphs: entities like employees, customers, and organizational units have attributes (role, tier, status) that change slowly but meaningfully. When decision traces reference the entity state at decision time rather than current state, the context graph must store historical dimension values — analogous to SCD Type 2 — to enable accurate temporal queries.

**See also:** Bitemporal Modeling, Entity-Time Linkage, Temporal Versioning

#### Source System Mapping

A document or data structure that records which source system is the authoritative provider for each data element or entity type in a target system.

Source system mappings stored in a context graph as provenance nodes enable LLMs to assess data authority: when two source systems provide different values for the same entity attribute, the mapping identifies which system is authoritative and should be trusted. This authority resolution is essential for context graphs that ingest from multiple competing sources.

**See also:** Authoritative Source, Master Data Management, Data Provenance

#### Sparse Retrieval

An information retrieval approach that matches query terms against document terms using frequency-based statistics, such as TF-IDF or BM25, without using dense vector representations.

Sparse retrieval is computationally efficient and highly interpretable — the reason a document is retrieved can be traced to specific matching terms. For context graph retrieval, sparse methods work well when the query and the decision trace use consistent, precise terminology. They fail when the user's vocabulary differs from the trace vocabulary, making dense retrieval complementary.

**See also:** BM25, Dense Retrieval, Hybrid Retrieval

#### SQL Transformation Tool

A software tool that transforms raw data into analytically useful structures using SQL — including dbt, Dataform, or similar platforms — generating the transformed tables and views that serve as inputs to analytics and AI systems.

SQL transformation tools are a primary source of column-level lineage for context graphs: their DAG of SQL transformations defines exactly which upstream columns contributed to each downstream column. Context graphs that ingest transformation tool lineage enable LLMs to trace any analytical result back to its raw source data — providing the provenance context required for financial audits and regulatory reviews.

**See also:** Column-Level Lineage, Workflow Orchestration Tool, Semantic Layer

#### SQL-Based Semantic Layer

A semantic layer implementation that exposes metric definitions and business logic as SQL views, CTEs, or parameterized queries against a relational data warehouse.

SQL-based semantic layers are important source systems for context graph ingestion: their metric SQL definitions — complete with join logic, filter conditions, and business rules — are the authoritative computation specifications that LLMs need to generate correct analytical queries. Storing these SQL definitions as context graph nodes enables dynamic retrieval of the correct query logic for any metric.

**See also:** Semantic Layer, Business Metric, Join Path Discovery

#### Stakeholder Alignment

The process of ensuring that all relevant parties — including data owners, IT teams, domain experts, legal, and executive leadership — understand, agree with, and actively support an initiative.

Stakeholder alignment is a prerequisite for context graph deployments that span organizational boundaries. Building a cross-system decision trace graph requires data access approvals from each source system owner, schema design input from domain experts, security review from IT, and executive commitment to the organizational change required. Misaligned stakeholders block progress at every stage.

**See also:** Change Management, Executive Sponsorship, Adoption Barrier

#### Stale Edge Detection

The process of identifying edges in a context graph that reference information which is no longer current — such as approval edges pointing to actors who have changed roles, or policy edges pointing to superseded policy versions.

Stale edges are a silent data quality problem: graph queries that traverse stale edges return outdated context without warning. Detection requires temporal validation — comparing the edge's creation timestamp against the valid time of the referenced node — and automated marking or removal of edges that no longer accurately represent organizational reality.

**See also:** Knowledge Staleness, Context Freshness Check, Context Graph Update Pattern

#### Startup Competitive Analysis

The evaluation of the competitive landscape for a context graph startup — identifying incumbent vendors, adjacent product categories, potential acquirers, and differentiation opportunities.

Competitive analysis for context graph startups must account for multiple threat vectors: general-purpose graph database vendors adding AI features, LLM platform providers building retrieval infrastructure, and enterprise software vendors adding context management to existing products. The durable competitive position lies in accumulated organizational decision trace data — a dataset that cannot be replicated by a new entrant.

**See also:** Context Graph Startup, Competitive Moat, Enterprise AI Market

#### Static vs Dynamic Knowledge

The distinction between knowledge that remains stable over time (static) and knowledge that changes frequently or continuously (dynamic).

This distinction drives context graph design decisions: static knowledge (data element definitions, organizational structure, product categories) can be batch-ingested and cached aggressively; dynamic knowledge (decision traces, approval statuses, entity attributes) requires real-time or near-real-time ingestion and conservative caching. Treating dynamic knowledge as static — a common footgun — produces stale context that silently degrades LLM output quality.

**See also:** Context Freshness, Knowledge Staleness, Batch Ingestion

#### Streaming Context Retrieval

A retrieval pattern in which context is fetched from a context graph incrementally and streamed to the LLM generation process in chunks, rather than requiring all context to be retrieved before generation begins.

Streaming retrieval reduces time-to-first-token latency in interactive applications: the LLM can begin generating with initial context while additional context is being retrieved. This pattern requires careful orchestration — the LLM must generate content that is consistent with both already-received and pending context — but delivers significantly better user experience for complex, multi-hop retrieval scenarios.

**See also:** Context Retrieval, Multi-Hop Retrieval, Context Graph Read Path

#### Streaming Graph Update

The continuous update of a context graph by processing a real-time stream of events, applying each event as a graph write operation without batching.

Streaming graph updates keep the context graph current with organizational activity in real time, enabling LLM agents to retrieve decisions made seconds ago as precedents for current decisions. The implementation requires careful handling of out-of-order events, duplicate suppression, and backpressure management to maintain correctness under high write volumes.

**See also:** Event-Driven Graph Update, Event Streaming Integration, Real-Time Ingestion

#### Structural Advantage

A competitive benefit arising from the inherent properties of a system's architecture — such as the graph structure of a context graph — that enable capabilities that are difficult or impossible to replicate in alternative architectures.

The structural advantage of context graphs over document stores and relational databases for organizational memory is traversal: the ability to follow multi-hop relationships (approval chains, precedent chains, policy references) in a single query. This structural capability enables LLMs to retrieve richer, more accurate organizational context than any flat retrieval system can provide — and this advantage compounds as the graph grows.

**See also:** Competitive Moat, Purpose-Built System, Context Graph vs Database

#### Structured Logging

A logging practice in which log entries are written in a machine-parseable format — typically JSON — with defined fields and schemas, rather than as unstructured human-readable text.

Structured logs are the preferred event source for context graph ingestion: each log entry can be directly mapped to a graph write operation without requiring natural language parsing. Organizations that adopt structured logging for decision-point events — approvals, exceptions, policy applications — dramatically simplify the context graph ingestion pipeline and improve trace completeness.

**See also:** Log Schema, Event Log, Graph Ingestion Pattern

#### Structured Output with Context

An LLM generation mode in which the model produces output in a defined machine-readable format — such as JSON or structured markdown — using retrieved context to populate specific fields.

Structured output with context is the production-ready generation pattern for context-graph-augmented workflows: the LLM receives organizational context and generates a structured decision recommendation, audit record, or report that can be directly processed by downstream systems without further parsing. This pattern is more reliable and auditable than free-text generation for high-stakes organizational decisions.

**See also:** Function Calling Pattern, Context-Aware Generation, Decision Record Format

#### Subgraph Extraction

The process of selecting a connected subset of a larger graph — including specific nodes, edges, and properties — based on query criteria, for use as context or for export.

Subgraph extraction is the fundamental operation of context graph retrieval for LLMs: rather than returning entire decision traces with all their properties, the retrieval layer extracts only the subgraph elements needed to answer the current query. Precise subgraph extraction is the primary mechanism for achieving token efficiency — returning exactly enough context, no more and no less.

**See also:** Context Compression, Context Pruning, Graph Pattern Matching

#### Subgraph Matching

A graph algorithm that finds all occurrences of a specified pattern subgraph within a larger graph.

Subgraph matching enables context graph retrieval systems to find all decision traces that match a specific structural pattern — not just those with matching property values, but those with the same relationship topology. This structural retrieval capability identifies precedents that are structurally analogous to a current decision, even if they differ in specific property values.

**See also:** Graph Pattern Matching, Graph Algorithm, Context Retrieval

#### Success Criteria Definition

The explicit specification, before a project begins, of the measurable outcomes that will determine whether the project has succeeded.

Defining success criteria before a context graph pilot is critical for preventing scope creep and ensuring objective evaluation. Criteria should include: measurable accuracy improvement for specific LLM tasks, quantified reduction in manual research time, and demonstrated compliance capability for at least one audit scenario. Vague success criteria ("the context graph should be useful") make it impossible to declare a pilot successful or to justify further investment.

**See also:** Pilot Program Design, ROI Measurement, Decision Quality Metric

#### Supply Chain Use Case

The application of context-graph-augmented LLMs to supply chain workflows — including supplier qualification, inventory decisions, logistics exceptions, and demand forecasting adjustments.

Supply chains involve complex, multi-party decisions with significant exception volumes: delivery exceptions, quality deviations, substitution approvals, and force majeure adjustments. Context graphs storing supply chain decision traces enable LLMs to provide recommendations grounded in the organization's specific supplier relationships, exception history, and operational constraints.

**See also:** Procurement Use Case, Manufacturing Quality Use Case, Exception-Heavy Workflow

#### System of Record Gap

The absence of a system that serves as the authoritative store for organizational decisions, creating a situation in which decision knowledge is distributed across email, spreadsheets, and document stores without a queryable, structured record.

The system of record gap is the organizational problem that context graphs are designed to solve. Most organizations have systems of record for transactions (ERP, CRM) and documents (SharePoint) but no system of record for decisions. This gap means that LLMs asked to support decision-making have no authoritative source to consult — and context graphs fill exactly this gap.

**See also:** Context Problem, Organizational Knowledge Gap, Decision Trace

#### System Prompt

The initial instructions provided to an LLM at the start of an interaction, typically defining the model's role, constraints, output format, and context injection structure.

System prompts are the template that organizes how context graph retrievals are presented to the LLM. A well-designed system prompt specifies: how retrieved decision traces should be interpreted, what format citations should take, when to express uncertainty rather than generating unsupported claims, and what organizational constraints apply to the response. System prompt design is a critical engineering discipline for context-graph-augmented deployments.

**See also:** Prompt, Prompt Engineering with Context, Context Graph Prompt Template

#### Table Discovery

The process of identifying and inventorying the tables, schemas, and datasets available within a data environment, enabling analysts and AI agents to understand what data exists.

Table discovery metadata stored in a context graph enables LLMs to reliably identify which tables contain relevant data for a query before attempting to generate SQL. Without table discovery context, LLMs must guess table names from general knowledge — a frequent cause of SQL errors and hallucinated table references in text-to-SQL applications.

**See also:** Data Dictionary, Semantic Layer, Join Path Discovery

#### Tacit Knowledge

Knowledge that is difficult to articulate, formalize, or transfer because it is embedded in experience, intuition, and practice rather than in explicit documents or rules.

Tacit knowledge is the hardest and most valuable form of organizational knowledge to capture. Context graphs cannot capture tacit knowledge directly — but they can capture its traces: the decisions that embody tacit knowledge, the exception patterns that reveal implicit rules, and the judgment calls that encode expert experience. Over time, these traces make tacit knowledge partially queryable and partially transferable.

**See also:** Implicit Organizational Knowledge, Organizational Memory, Knowledge Transfer

#### Taxonomy vs Ontology

The distinction between a taxonomy — a hierarchical classification scheme organizing concepts into parent-child categories — and an ontology — a richer conceptual model that includes multiple relationship types, properties, and logical axioms.

Context graphs benefit from ontological richness beyond what taxonomies provide: organizing decision types into a hierarchy (taxonomy) is less useful than defining the relationships between decision types, the policies that govern them, and the actors authorized to make them (ontology). The distinction matters because it determines what questions the context graph can answer from its structural information.

**See also:** Ontology, SKOS, Knowledge Graph

#### Technical Metadata

Metadata that describes the physical or technical characteristics of a data element — such as data type, format, length, nullable constraints, and storage location — as opposed to its business meaning or operational context.

Technical metadata stored in context graphs enables LLMs to generate technically correct queries and transformations. When an LLM knows that a field is a VARCHAR(50) with a specific encoding, it avoids generating operations that would fail silently — such as comparing it to a numeric value or assuming it supports Unicode characters it doesn't.

**See also:** Business Metadata, Operational Metadata, Data Dictionary

#### Temperature Parameter

A hyperparameter in LLM generation that controls the randomness of the model's output distribution — lower values produce more deterministic responses; higher values produce more varied, creative outputs.

For context-graph-grounded generation, low temperature values (0.0–0.3) are typically preferred: they produce consistent, predictable responses that are more reliably grounded in retrieved context. High temperature values can cause the model to "drift" from the retrieved context toward more creative but less accurate outputs — a silent accuracy-creativity tradeoff.

**See also:** Top-P Sampling, Context-Aware Generation, Hallucination Mitigation

#### Temporal Edge

An edge in a context graph that carries temporal properties — typically a start time and optionally an end time — specifying the time period during which the relationship was valid.

Temporal edges are the mechanism for representing relationships that change over time without overwriting historical state. An actor's role in an organization changes; the edge connecting the actor to the role node carries start and end timestamps rather than requiring the edge to be deleted and recreated. This temporality is essential for accurate historical context retrieval.

**See also:** Bitemporal Modeling, Valid Time, Entity-Time Linkage

#### Temporal Versioning

The practice of recording the time period during which each fact in a data store was valid, enabling point-in-time queries that return the state of the data at any past moment.

Temporal versioning is a foundational design pattern for compliance-grade context graphs. Regulatory audits frequently require reconstruction of the organizational state at a specific past date: "what was the approved credit limit for this customer on March 15?" Temporal versioning makes this query answerable from graph traversal; without it, the answer is "whatever the current limit is," which may be wrong.

**See also:** Bitemporal Modeling, Valid Time, Transaction Time

#### Time-Series Integration

The connection of a context graph to a time-series database or event store — enabling decision traces to reference time-stamped metric values, sensor readings, or performance data at the exact point in time relevant to a decision.

Time-series integration enriches context graphs with the quantitative context that motivated decisions: "the inventory exception was approved because supply chain lead times exceeded 45 days at the time of the decision" requires access to the time-series lead time data at decision time. Linking decision nodes to time-series snapshots makes this quantitative context retrievable without requiring access to the full time-series history.

**See also:** Temporal Versioning, Bitemporal Modeling, Hybrid Storage Architecture

#### Time-Stamped Property

A property on a node or edge that carries the time at which the property value was set or the event occurred, enabling temporal filtering of graph queries.

Time-stamped properties are the lightweight alternative to full bitemporal modeling: rather than maintaining separate valid-time and transaction-time histories, properties carry a single timestamp indicating when the value was recorded. This approach is simpler to implement but less precise — it cannot distinguish between "when this was true in the world" and "when this was recorded in the system."

**See also:** Temporal Edge, Bitemporal Modeling, Valid Time

#### Token

The basic unit of text processed by an LLM — approximately 3–4 characters or 0.75 words in English. LLM pricing and context limits are measured in tokens.

Tokens are the currency of the context window economy. Every piece of organizational knowledge injected into an LLM prompt has a token cost; context graphs earn their value by delivering high-information-density context that answers questions at lower token cost than equivalent document retrieval. Token efficiency — the book's core thesis — is measured in information value per token.

**See also:** Tokenization, Context Window Budget, Context Compression

#### Tokenization

The process by which an LLM converts input text into a sequence of tokens — discrete numeric IDs — before processing.

Tokenization affects how efficiently organizational knowledge can be represented in a context window. Dense, jargon-heavy organizational text may tokenize less efficiently than plain English; structured formats like JSON or Cypher output may tokenize more or less efficiently depending on the model's tokenizer. Context compression strategies must account for tokenization efficiency, not just raw character count.

**See also:** Token, Context Window Budget, Context Compression

#### Tool Use

The capability of an LLM agent to invoke external tools — such as APIs, databases, code interpreters, or context graph query interfaces — to gather information or take actions that extend beyond the model's parametric knowledge.

Tool use is the mechanism by which LLM agents query context graphs at runtime. The agent receives a tool definition specifying the context graph's query interface, generates the appropriate query parameters based on the current task, and receives structured results that are incorporated into its reasoning. Well-designed context graph tool definitions are concise, typed, and scoped to specific retrieval operations.

**See also:** Function Calling Pattern, Context Graph Tool Definition, Agent Loop

#### Top-P Sampling

A text generation strategy in which the model samples from the smallest set of tokens whose cumulative probability exceeds a threshold p, balancing output diversity with coherence.

Like temperature, Top-P sampling affects the consistency of context-grounded generation. For high-fidelity organizational decision support, low Top-P values (0.1–0.5) produce more consistent outputs that stay closer to the retrieved context. Higher values introduce variability that can manifest as deviation from retrieved facts — the same silent hallucination risk as high temperature.

**See also:** Temperature Parameter, Context-Aware Generation, Hallucination Mitigation

#### Trace Completeness

The degree to which a decision trace contains all the information necessary to fully reconstruct the organizational context of the recorded decision.

Trace completeness is the single most important data quality dimension for context graphs: incomplete traces are not just less useful — they can actively mislead, because an LLM that retrieves a partial trace may fill in missing information with hallucinated details. Completeness measurement should be automated and included in ingestion pipeline quality gates.

**See also:** Data Completeness, Decision Trace Anatomy, Context Completeness

#### Trace Indexing

The creation of database indexes on decision trace properties — such as decision type, timestamp, entity IDs, and policy version — to enable fast retrieval of relevant traces for LLM context.

Trace indexing is the performance engineering discipline for context graph retrieval. The correct indexes on high-selectivity trace properties enable sub-100ms retrieval of the most relevant precedents from graphs containing millions of traces. Index selection must be driven by the most frequent and most latency-sensitive retrieval patterns, not by general-purpose guidelines.

**See also:** Graph Index, Context Graph Index Design, Context Graph Performance Tuning

#### Trace Replay

The process of re-executing the events recorded in a decision trace to reconstruct the exact state of organizational knowledge at the time of the original decision.

Trace replay enables forensic-grade compliance investigations: by replaying the events that led to a decision, auditors and AI systems can reconstruct exactly what context was available, what policies were in effect, and what precedents had been established at decision time. This capability requires an append-only event log foundation and a graph database that supports temporal queries.

**See also:** Event Sourcing, Bitemporal Modeling, Audit Trail Design

#### Trace-to-Entity Relationship

An edge in a context graph connecting a decision trace node to the specific entity — customer, employee, contract, product — that the decision was about.

Trace-to-entity relationships are the primary traversal path for entity-centric context retrieval: "show me all decisions involving this customer." Without these edges, decision traces are isolated records that cannot be queried in relation to the entities they concern. Accurate entity linking is a prerequisite for trace-to-entity edges to be correctly established.

**See also:** Entity Linking in Context Graph, Cross-System Entity Linking, Decision Trace

#### Training Data from Traces

The use of decision trace records from a context graph as training examples for fine-tuning or RLHF — leveraging organizational decision history as a high-quality, domain-specific dataset.

Decision traces are exceptionally valuable training data: they capture real organizational decisions with full context, justification, and human review signals (overrides, confirmations). Fine-tuning on this data aligns the model with specific organizational norms more effectively than general instruction tuning, because the examples reflect actual organizational practice rather than synthetic demonstrations.

**See also:** Fine-Tuning, Reinforcement Learning from Human Feedback, Model Improvement Feedback

#### Transaction Time

In bitemporal modeling, the time at which a fact was recorded in the database — which may differ from the time at which the fact was true in the real world (valid time).

Transaction time enables "as-of-recording" queries: "what did our database show at 2 PM on March 15?" This is distinct from "what was true in the world at 2 PM on March 15?" (valid time). Both are needed for compliance investigations: transaction time shows what the system knew; valid time shows what was actually happening. Context graphs must track both to support complete audit reconstruction.

**See also:** Valid Time, Bitemporal Modeling, Bitemporal Query

#### Transformation History

A record of all the transformations, calculations, and operations applied to data as it moved from its source through processing pipelines to its current form.

Transformation history stored in context graphs enables LLMs to explain how a specific data value was derived — the full chain of operations from raw source to final number. This provenance is essential for financial and regulatory contexts where auditors must verify that calculations were performed correctly and that the source data was authoritative.

**See also:** Data Provenance, Column-Level Lineage, Upstream Lineage

#### Transformer Architecture

The neural network architecture — based on self-attention mechanisms — that underlies modern large language models, enabling parallel processing of sequences and long-range dependency modeling.

The transformer architecture's attention mechanism is both the source of LLM power (the ability to attend to any part of the context window) and the source of the context problem (the model can only attend to what is in the context window). Context graphs solve this limitation by ensuring that the right organizational knowledge is in the context window at generation time.

**See also:** Large Language Model, Context Window Limit, In-Context Learning

#### Transitive Closure

The set of all nodes reachable from a given node by following edges of a specified type, computed through iterative or recursive traversal.

Transitive closure queries are common in context graph applications: "find all employees under this manager's organizational chain," "find all decisions influenced by this policy through any chain of references," or "find all entities connected to this contract through any relationship path." Native graph traversal makes these computationally feasible; SQL recursive CTEs become impractical at scale.

**See also:** Graph Traversal, Shortest Path Algorithm, Graph Algorithm

#### Trillion-Dollar Opportunity

The estimated economic value available to organizations that successfully solve the enterprise AI context problem — enabling LLMs to reliably reason about organizational knowledge in high-stakes workflows.

This framing establishes the scale of the market opportunity addressed by context graph technology. The value is not in the models themselves — it is in the organizational knowledge infrastructure that makes models trustworthy and accurate in enterprise-specific contexts. Context graphs are positioned as the infrastructure investment that unlocks this value.

**See also:** Enterprise AI Market, Context Problem, Organizational Knowledge Gap

#### UMLS

Unified Medical Language System — a comprehensive biomedical vocabulary and ontology integration system that links concepts from hundreds of clinical terminology standards including SNOMED CT, ICD, and RxNorm.

UMLS is the domain ontology backbone for healthcare context graphs, providing standardized clinical concept identifiers that enable decision traces from different clinical systems to be linked and compared. For AI systems supporting clinical decision-making, UMLS-grounded context graphs enable precise retrieval of clinically equivalent precedents regardless of which terminology system each source system uses.

**See also:** Ontology, NIEM, Reference Data Management

#### Undocumented Join

A join relationship between two database tables that is required to answer a business question but is not documented in any schema, data dictionary, or data catalog.

Undocumented joins are a major source of LLM text-to-SQL failures: without knowing which key to join on, the model guesses — and may guess correctly by coincidence but incorrectly for edge cases. Context graphs that store join path documentation as edges between table nodes prevent this failure mode by making the correct join path retrievable rather than inferrable.

**See also:** Join Path Discovery, SQL-Based Semantic Layer, Data Dictionary

#### Unit of Measure Registry

A reference data store that defines standardized units of measurement — including conversion factors, SI equivalences, and domain-specific units — used to ensure consistent interpretation of quantitative data elements.

Unit of measure registries stored in context graphs prevent LLMs from performing incorrect calculations or comparisons across quantities with different units. When an agent retrieves a decision trace showing a budget in GBP and needs to compare it to a threshold in USD, the unit of measure registry provides the conversion context needed to make the comparison correctly.

**See also:** Reference Data Management, Code List, Data Standardization

#### Upstream Lineage

The set of all data sources, transformations, and systems that contributed to producing a specific data artifact — tracing backwards from a result to its origins.

Upstream lineage stored in a context graph enables LLMs to answer data provenance questions: "which systems and transformations produced this number?" This information is essential for assessing data trustworthiness, identifying root causes of data quality issues, and satisfying regulatory requirements for source data documentation.

**See also:** Downstream Lineage, Column-Level Lineage, Data Provenance

#### User Journey Graph

A graph capturing the sequence of events, decisions, and interactions that characterize a specific user's experience with a product or service over time.

User journey graphs complement organizational decision context graphs by providing the customer perspective alongside the organizational perspective. When an LLM agent handling a customer service issue can access both the customer's interaction history (user journey graph) and the organizational decisions made about that customer (context graph), it can provide more accurate and empathetic responses.

**See also:** Session Graph, Personalization Graph, Customer Success Use Case

#### User Trust Building

The process of gradually establishing confidence among human users that an AI system is reliable, accurate, and aligned with their interests through demonstrated performance and transparent behavior.

Trust building is a phased process in context graph deployments. Starting with low-stakes, high-visibility wins — where the context graph demonstrably retrieves the right precedent and the AI recommendation is visibly correct — builds the organizational confidence needed for users to rely on the system for higher-stakes decisions. Transparency about retrieval sources is a key trust mechanism: "this recommendation is based on these three precedents" is more trustworthy than an unexplained recommendation.

**See also:** Human-in-the-Loop, Explainability by Design, Graduated Autonomy

#### Valid Time

In bitemporal modeling, the time period during which a fact was true in the real world, independent of when it was recorded in the database.

Valid time is the business-meaningful temporal dimension for context graph queries. "What policy was in effect when this decision was made?" is a valid-time query: it asks about the state of the world at a specific past moment, not when the policy was recorded in the system. Accurate valid time tracking requires source systems to emit the business-meaningful event time alongside the recording time.

**See also:** Transaction Time, Bitemporal Modeling, Bitemporal Query

#### Value Domain

In ISO 11179, the set of permissible values for a data element, defined either as an enumeration of specific permissible values or as a description of the allowable value range.

Value domains stored in context graphs as reference nodes provide LLMs with the complete set of valid vocabulary for organizational data elements. When an agent needs to generate or validate a value for a specific field, retrieving its value domain ensures the generated value is organizationally valid — preventing the hallucination of non-existent codes, statuses, or categories.

**See also:** Permissible Value, Conceptual Domain, ISO 11179 Standard

#### Vector Database

A database management system optimized for storing, indexing, and querying high-dimensional vector embeddings, enabling fast approximate nearest neighbor search over large embedding collections.

Vector databases are the complementary storage layer to context graphs in hybrid retrieval architectures. They handle the semantic similarity search that graph pattern matching cannot — finding decision traces that are semantically similar to a query even when they share no exact vocabulary. In production context graph systems, a vector database typically stores embeddings of all decision trace text for hybrid retrieval.

**See also:** HNSW Index, Approximate Nearest Neighbor, Context Graph vs Vector Store

#### Vector Embedding

A dense, fixed-dimensional numerical representation of a piece of text, entity, or graph node, produced by an embedding model such that semantically similar inputs produce geometrically proximate vectors.

Vector embeddings are the technical foundation for semantic retrieval over context graphs. Each decision trace — or summary of a decision trace — is embedded into a vector that captures its semantic meaning. At query time, the user's query is embedded and compared against all trace embeddings using approximate nearest neighbor search, retrieving the most semantically similar traces regardless of vocabulary differences.

**See also:** Embedding Model, Sentence Transformer, Dense Retrieval

#### Vector Index Layer

The vector database or vector index component within a hybrid context graph storage architecture, responsible for storing and searching embedding representations of graph content.

The vector index layer enables semantic retrieval that complements graph pattern matching. While the graph layer answers structural queries precisely, the vector index layer handles queries where the user's natural language does not map directly to graph schema terms. Together, the two layers provide comprehensive coverage of organizational knowledge retrieval needs.

**See also:** Hybrid Storage Architecture, Vector Database, HNSW Index

#### Virtual View

A named query or view definition that provides a logical representation of data from one or more underlying sources without physically storing the data.

Virtual views over context graph data can present organizational decision knowledge in different shapes for different consumers — for example, a compliance-oriented view that includes only policy references and approval chains, and a business intelligence view that includes only decision outcomes and entity attributes. Virtual views enable one context graph to serve multiple retrieval patterns without duplicating data.

**See also:** Data Virtualization, Query Federation, Semantic Layer

#### Vocabulary Alignment

The process of mapping equivalent terms from different organizational vocabularies — ensuring that "revenue exception" in the sales system and "booking adjustment" in finance refer to the same concept in the context graph.

Vocabulary alignment is a prerequisite for semantic retrieval across context graphs that ingest from multiple systems with different terminology conventions. Without alignment, retrieval for "revenue exception" misses relevant traces recorded as "booking adjustment" — silently reducing retrieval recall. Alignment can be encoded in the context graph as synonym edges between concept nodes.

**See also:** Metadata Thesaurus, Semantic Consistency, Concept Harmonization

#### Workflow Orchestration Tool

A software system that coordinates the execution of data transformation tasks — defining dependencies, scheduling runs, monitoring failures, and managing retries — in data engineering pipelines.

Workflow orchestration tools are the operational backbone of context graph ingestion pipelines. They coordinate the complex dependency chain of ETL operations: entity resolution must complete before edge creation, schema validation must precede graph writes, and downstream processes must be triggered only after successful graph updates. Robust orchestration prevents partial writes that leave the context graph in an inconsistent state.

**See also:** Graph ETL Pipeline, Ingestion Pipeline Design, Event Streaming Platform

#### Write-Path Advantage

The structural benefit of a context graph over read-path-only systems: by capturing decision context at the time of the decision rather than attempting to retrieve it later, the context graph preserves organizational knowledge that would otherwise be permanently lost.

The write-path advantage is the core architectural argument for context graphs over systems that only attempt to index existing documents post-hoc. A decision's implicit reasoning, informal consultations, and alternatives considered exist only at decision time — read-path retrieval from documents can only capture what was explicitly written down. Real-time write-back to the context graph is the only way to preserve the full organizational memory.

**See also:** Real-Time Context Capture, Post-Hoc Context Capture, System of Record Gap

#### Zero-Shot Prompting

A prompting technique in which an LLM is asked to perform a task without any examples in the prompt, relying entirely on the model's training knowledge.

Zero-shot prompting is insufficient for most enterprise organizational knowledge tasks — the model has no training knowledge of specific organizational policies, decisions, or precedents. Context graphs address this by converting zero-shot organizational queries into few-shot queries through context injection: retrieving relevant precedents and injecting them as examples before the model generates its response.

**See also:** Few-Shot Prompting, In-Context Learning, Context Retrieval

#### Zero-Trust Graph Architecture

A security model for context graph deployments in which no user, agent, or system is trusted by default — every access request is explicitly authenticated, authorized, and validated, regardless of network location or prior trust.

Zero-trust architecture is the appropriate security model for context graphs that store sensitive organizational decision data. Traditional perimeter security assumes internal actors are trusted; zero-trust assumes any actor may be compromised and requires continuous verification. This is especially important as AI agents — which can be manipulated via prompt injection — are granted access to organizational memory.

**See also:** Graph Security Model, Agent Authentication, Agent Authorization

