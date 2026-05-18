# Course Description for the Context Graph Textbook

## Title

Context Graph: How Organizations Use LLMs Cost Effectively

## Description

Context graphs are structured, persistent records of decision traces—capturing
not just *what* happened inside an enterprise, but *why* it happened, *who*
approved it, and *which precedents* justified it. This textbook explains what
context graphs are, why large language models (LLMs) desperately need them to
work reliably inside organizations, and how practitioners can design, build,
and deploy them. The core thesis, drawn from Foundation Capital's analysis of
the AI market, is that the trillion-dollar opportunity in enterprise AI is not
in building better models—it is in solving the context problem: giving models
the right organizational knowledge at the right moment so they can reason,
decide, and act on behalf of the business without constant human intervention.

## Audience

This textbook is written for three overlapping groups:

- **Enterprise architects and senior engineers** who are designing AI-powered
  systems and need a principled approach to organizational memory and context
  management.
- **AI/ML practitioners and data engineers** who are building LLM-powered
  applications and struggling with hallucinations, missing context, and poor
  decision quality in agent workflows.
- **Technical product managers and founders** who are building or evaluating
  products in the enterprise AI space and want a framework for where context
  graphs create durable competitive advantage.

The book assumes the reader is comfortable reading technical content and has
some exposure to software systems, but does not require a deep background in
machine learning or graph databases.

## Prerequisites

Readers are expected to have mastered the following concepts before starting:

- **Basic AI/LLM literacy** — understanding that large language models
  predict tokens, that they have a context window, and that prompt engineering
  changes model behavior.
- **Enterprise data fundamentals** — familiarity with relational databases,
  data warehouses, and the idea of a system of record.
- **Software development basics** — comfort reading pseudocode and simple
  architecture diagrams; familiarity with APIs and services.
- **Business process concepts** — understanding that organizations have
  workflows, approvals, exceptions, and audit requirements.

No prior knowledge of graph databases, knowledge graphs, or formal ontology is
required—these are introduced from first principles.

## Topics

1. **Knowledge Graphs and Labeled Property Graphs (LPGs)** — What a knowledge
   graph is and how it differs from a relational database or a vector store;
   the Labeled Property Graph (LPG) model: nodes with labels, edges with types,
   and properties on both; why LPGs are the dominant choice for enterprise
   graph systems; introduction to query languages (GQL, Cypher, openCypher);
   a brief comparison with RDF/SPARQL and the practical reasons RDF is not used
   at enterprise scale—verbose serialization, poor tooling ecosystems, query
   performance ceilings on billion-edge graphs, and lack of native property
   support requiring awkward reification patterns that compound the scalability
   problem.

2. **Enterprise Knowledge Graphs** — How organizations build LPG-based knowledge
   graphs that span many systems: HR, finance, CRM, ERP, product catalogs, and
   operational logs; entity resolution across heterogeneous sources; canonical
   entity models and master data management (MDM); hub-and-spoke vs. federated
   graph architectures; scaling property graphs to hundreds of millions of nodes
   with databases such as Neo4j, Amazon Neptune, and TigerGraph; common failure
   modes (schema drift, stale edges, missing provenance) and mitigation patterns.

3. **Semantic Layers for Enterprise Data Lakes** — The problem of meaning in
   large-scale data lakes: thousands of tables from dozens of source systems,
   inconsistent naming, undocumented joins, and no shared vocabulary; how a
   semantic layer imposes business-level concepts (metrics, dimensions, entities)
   on top of raw storage; logical data models, virtual views, and metric stores
   (dbt Semantic Layer, AtScale, Cube); connecting the semantic layer to a
   context graph so that LLM queries resolve to authoritative definitions rather
   than ad hoc column names; query federation patterns for keeping the semantic
   layer current without full replication.

4. **Metadata Management and Data Governance** — Why metadata is the foundation
   of trustworthy AI: without knowing what a field means, who owns it, and how
   fresh it is, an LLM cannot reason correctly about enterprise data; active
   metadata management vs. passive cataloging; data lineage: tracking how data
   flows from source to transformation to consumption; data quality dimensions
   (completeness, accuracy, consistency, timeliness); governance frameworks:
   ownership, stewardship, access control, and classification; integration
   between metadata management platforms (Alation, Collibra, DataHub, Apache
   Atlas) and the context graph; the role of governance in automated
   decision-making compliance.

5. **Metadata Registries and ISO 11179** — Formal standards for metadata
   registration: ISO/IEC 11179 as the international standard for metadata
   registries; the six core components of an ISO 11179 registry (data element,
   data element concept, conceptual domain, value domain, object class,
   property); how registries provide a single authoritative definition for every
   data item across the enterprise; mapping registry entries to context graph
   nodes; practical implementation patterns for building a lightweight ISO 11179
   registry; common gaps between the standard and real-world enterprise data and
   how context graphs can fill them.

6. **Process Mining, Data Lineage, and Data Provenance** — How organizations
   reconstruct *what actually happened* from logs and event streams; process
   mining as the discipline of discovering, conformance-checking, and enhancing
   process models from event logs (IEEE XES standard; tools such as ProM,
   Celonis, and Disco); structured logging patterns that make event streams
   machine-readable and graph-ingestible; data lineage: tracking the full
   upstream-to-downstream path of every data item from source system through
   transformations to its final consumers; data provenance: recording the
   origin, custody chain, and transformation history of individual data values
   so that any output can be traced back to its authoritative source; the
   relationship between lineage, provenance, and context graph decision traces—
   lineage answers *where did this data come from*, provenance answers *can I
   trust it*, and decision traces answer *why was it used this way*; practical
   ingestion patterns for pulling lineage metadata from data catalog platforms
   (OpenLineage, Marquez, DataHub) into the context graph.

7. **The Context Problem** — Why LLMs fail at enterprise tasks even when
   knowledge graphs, semantic layers, and metadata registries are in place; the
   gap between static organizational knowledge and dynamic decision-making;
   why retrieval-augmented generation (RAG) alone is insufficient; the missing
   layer: decision traces that capture the *why*, not just the *what*.

8. **What a Context Graph Is** — Definition of a context graph as a living
   record of decision traces stitched across entities and time; how it extends
   and complements the enterprise knowledge graph rather than replacing it;
   contrast with traditional databases, knowledge graphs, vector stores, and
   metadata catalogs.

9. **Decision Traces: Capturing the Why** — The anatomy of a decision trace;
   the four missing layers in enterprise systems (exception logic, historical
   precedents, cross-system synthesis, approval chains); why current systems
   lose context at the moment decisions are made.

10. **Why Incumbents Will Struggle to Build Context Graphs** — Legacy systems and current
    state bias; data warehouse players on the read path after decisions occur;
    AI agent startups occupying the execution path; the structural advantage of
    purpose-built context graph systems.

11. **Graph Data Modeling for Context** — Nodes, edges, and properties for
    decision traces; temporal modeling; linking decisions across entities, time,
    and the underlying enterprise knowledge graph; schema design for
    organizational decision knowledge.

12. **Integrating LLMs with Context Graphs** — How context graphs serve as
    long-term memory for AI agents; retrieval patterns; relevance ranking;
    keeping the context window focused; avoiding hallucination through grounding.

13. **Building a Context Graph System** — Storage and query layers (graph
    databases, property graphs, vector indexes); ingestion pipelines; real-time
    capture vs. batch backfill; APIs and SDK patterns.

14. **AI Agent Architecture with Context Graphs** — Agent loop design; tool
    use and function calling; write-back: agents updating the context graph as
    they decide; graduated autonomy as the trace library grows.

15. **Enterprise Use Cases** — Finance (revenue reporting exception handling);
    sales (engagement history and playbook precedents); engineering (incident
    and production decision traces); legal and compliance (audit trails for
    automated decisions); customer success (account history and escalation logic).

16. **Compliance, Explainability, and Audit** — Regulatory requirements for
    automated decisions; how context graphs provide searchable audit trails;
    explainability by design vs. explainability as a retrofit; data retention
    and governance.

17. **Market Landscape and Startup Strategies** — Three strategies for building
    context-graph-powered products: full system replacement, module replacement,
    and new system creation; signals that a workflow is ready for context graph
    automation (high headcount, exception-heavy, glue functions); competitive
    moats.

18. **Organizational Adoption** — Identifying the right first workflow; change
    management for automated decision-making; measuring decision quality; building
    trust through graduated autonomy; the feedback loop between human review and
    model improvement.

## Learning Outcomes

By the end of this book, the reader will be able to:

- **Remember:** Define a context graph and name the four types of information
  that current enterprise systems fail to capture (exception logic, historical
  precedents, cross-system synthesis, out-of-band approval chains); recall why
  RAG alone is insufficient for enterprise AI.

- **Understand:** Explain why LLMs need persistent organizational context to
  make reliable decisions; describe the structural reasons legacy systems,
  data warehouses, and agent startups each fail to capture decision traces;
  interpret a context graph schema for a given business workflow.

- **Apply:** Design a context graph schema for a real enterprise workflow;
  instrument an AI agent to write decision traces back to a context graph;
  build a retrieval pipeline that grounds LLM calls in relevant organizational
  precedent; configure a graph database to store and query decision traces.

- **Analyze:** Diagnose why an LLM-powered workflow is producing poor decisions
  by identifying missing context layers; evaluate whether a candidate workflow
  exhibits the key signals for context graph automation (high headcount,
  exception-heavy, cross-system glue work); compare storage and query options
  for a given context graph scale and latency requirement.

- **Evaluate:** Assess competing context graph architectures for correctness,
  completeness, and maintainability; critique a startup's product strategy using
  the three-strategy framework (replacement, module, new system); judge the
  compliance readiness of a context graph deployment against regulatory audit
  requirements.

- **Create:** Architect an end-to-end context graph system for a novel
  enterprise domain, from ingestion pipeline through LLM integration and
  graduated-autonomy rollout; design a compliance and explainability layer;
  produce a go-to-market analysis for a context-graph-powered product
  identifying the strongest workflow beachhead.
