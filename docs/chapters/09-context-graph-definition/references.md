# References: What a Context Graph Is

1. [Knowledge Graph](https://en.wikipedia.org/wiki/Knowledge_graph) - Wikipedia - Provides the conceptual foundation for knowledge graphs that context graphs extend — covering entity-relationship models, structured data representation, and enterprise applications that this chapter builds upon in defining how context graphs differ from and complement knowledge graphs.

2. [Graph Database](https://en.wikipedia.org/wiki/Graph_database) - Wikipedia - Explains native graph storage, index-free adjacency, and traversal patterns — directly supporting this chapter's explanation of why native graph databases are the correct implementation substrate for context graphs given the multi-hop nature of decision trace queries.

3. [Provenance (information science)](https://en.wikipedia.org/wiki/Provenance_(information_science)) - Wikipedia - Covers provenance as structured records of origin, custody, and transformation — foundational for this chapter's treatment of decision traces as provenance records for organizational decisions including who decided, when, under what policy, and citing which precedents.

4. *Graph Databases* (2nd ed.) - Ian Robinson, Jim Webber, Emil Eifrem - O'Reilly Media - Chapters 7–9 cover graph schema design, read and write API patterns, access control, and lifecycle management for production graph deployments — directly supporting this chapter's technical specification of context graph schema, read path, write path, and access control.

5. *Enterprise Knowledge Graph* - Juan Sequeda, Dean Allemang - O'Reilly Media - Covers integration of knowledge graphs with enterprise data systems and AI pipelines, providing the architectural context for this chapter's positioning of the context graph as the fifth layer in a five-layer enterprise AI architecture stack.

6. [Audit Trail](https://en.wikipedia.org/wiki/Audit_trail) - Wikipedia - Defines audit trails as immutable, timestamped records of events — directly relevant to this chapter's decision trace schema and lifecycle model, particularly the requirement that overturned decisions remain as cautionary records rather than being deleted.

7. [Access Control](https://en.wikipedia.org/wiki/Access_control) - Wikipedia - Covers access control models and their application to sensitive data systems — supporting this chapter's section on context graph access control at node level and query level, including redaction modes for lower-privilege queries.

8. [Retrieval-Augmented Generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) - Wikipedia - Explains the RAG architecture that context graphs extend and complement — providing the necessary contrast point for this chapter's comparison of context graph retrieval (graph traversal) against document similarity retrieval.

9. [Cypher (query language)](https://en.wikipedia.org/wiki/Cypher_(query_language)) - Wikipedia - Documents the Cypher graph query language used to express the traversal patterns in context graph read paths — directly relevant to this chapter's four-stage read path and the concept of reusable query pattern templates.

10. [Vector Database](https://en.wikipedia.org/wiki/Vector_database) - Wikipedia - Explains vector database architecture and nearest-neighbor retrieval — providing the technical contrast for this chapter's comparison showing why vector stores and context graphs answer fundamentally different question types and are most powerful in combination.
