# References: Decision Traces: Anatomy and LPG Patterns

1. [Audit Trail](https://en.wikipedia.org/wiki/Audit_trail) - Wikipedia - Defines audit trails as chronological, tamper-evident records of actions and decisions — directly foundational for this chapter's treatment of decision traces as organizational audit records with timestamped actors, policy versions, and approval chains.

2. [Property Graph](https://en.wikipedia.org/wiki/Property_graph) - Wikipedia - Explains the property graph model with typed nodes and edges with key-value properties — directly supporting this chapter's complete LPG schema specification for decision trace nodes, actor nodes, policy version nodes, and the eleven edge type vocabulary.

3. [Data Provenance](https://en.wikipedia.org/wiki/Data_provenance) - Wikipedia - Covers provenance records including custody chains and transformation histories — foundational for this chapter's cross-system synthesis layer and source data node schema that captures what data was consulted with what quality score at decision time.

4. *Graph Databases* (2nd ed.) - Ian Robinson, Jim Webber, Emil Eifrem - O'Reilly Media - Chapter 3 on graph data modeling and Chapters 7–8 on write paths and indexes directly support this chapter's decision trace schema design, trace completeness validation, and the four standard read-path indexes.

5. *The Model Thinker* - Scott E. Page - Basic Books - Chapters on formal decision modeling, precedent reasoning, and organizational learning provide theoretical framing for this chapter's treatment of precedent chain patterns, exception logic crystallization, and judgment call documentation.

6. [Cypher (query language)](https://en.wikipedia.org/wiki/Cypher_(query_language)) - Wikipedia - Documents the Cypher query patterns used to traverse decision trace schemas — directly supporting this chapter's worked example traversal for the compliance audit query and the read-path query patterns for precedent retrieval.

7. [Knowledge Graph](https://en.wikipedia.org/wiki/Knowledge_graph) - Wikipedia - Covers knowledge graph entity nodes and relationship types — providing the foundational context for this chapter's APPLIES_TO edge connecting decision trace nodes to entity nodes in the enterprise knowledge graph.

8. [Process Mining](https://en.wikipedia.org/wiki/Process_mining) - Wikipedia - Explains process discovery and conformance checking from event logs — directly relevant to this chapter's treatment of exception patterns that emerge across decision traces and the counterfactual trace concept for evaluating decision quality.

9. [Provenance (information science)](https://en.wikipedia.org/wiki/Provenance_(information_science)) - Wikipedia - Covers the W3C PROV standard for provenance records including attribution, derivation, and entity provenance — supporting this chapter's actor node pattern, DECIDED_BY and APPROVED_BY edge types, and policy version reference schema.

10. [Explainable Artificial Intelligence](https://en.wikipedia.org/wiki/Explainable_artificial_intelligence) - Wikipedia - Covers XAI requirements for transparent decision records including factor attribution and decision justification — directly relevant to this chapter's emphasis on capturing exception logic justification text and cross-system synthesis records as the basis for AI decision explainability.
