# References: Graph Data Modeling for Context

1. [Graph Database](https://en.wikipedia.org/wiki/Graph_database) - Wikipedia - Covers graph database architectures including property graph models, index-free adjacency, and constraint enforcement — directly relevant to this chapter's context graph index design, cardinality patterns, and graph constraint enforcement sections.

2. [Slowly Changing Dimension](https://en.wikipedia.org/wiki/Slowly_changing_dimension) - Wikipedia - Defines the SCD Type 1/2/3 patterns from data warehousing for managing time-varying attributes — directly supporting this chapter's application of SCD Type 2 to context graph node properties that must retain history for accurate historical queries.

3. [Temporal Database](https://en.wikipedia.org/wiki/Temporal_database) - Wikipedia - Explains bitemporal database concepts including valid time, transaction time, and the SQL:2011 temporal extensions — foundational for this chapter's core topic of bitemporal modeling applied to context graph nodes and edges.

4. *Graph Databases* (2nd ed.) - Ian Robinson, Jim Webber, Emil Eifrem - O'Reilly Media - Chapters 5–8 cover property normalization decisions, cardinality design, index strategy, and schema evolution for production graph deployments — directly matching this chapter's complete graph data modeling toolkit for context graphs.

5. *The Data Warehouse Toolkit* (3rd ed.) - Ralph Kimball, Margy Ross - Wiley - Chapters 5–6 provide the canonical treatment of slowly changing dimensions, temporal fact tables, and audit columns — foundational for this chapter's application of SCD patterns and bitemporal modeling to context graph temporal edge design.

6. [Entity–Relationship Model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model) - Wikipedia - Covers entity-relationship modeling including cardinality notation and normalization principles — supporting this chapter's sections on context graph cardinality design, property normalization, and cross-graph reference patterns.

7. [Cypher (query language)](https://en.wikipedia.org/wiki/Cypher_(query_language)) - Wikipedia - Documents Cypher query patterns for temporal filtering, subgraph extraction, and constraint enforcement — directly supporting this chapter's bitemporal query examples and subgraph extraction traversal descriptions.

8. [Data Lineage](https://en.wikipedia.org/wiki/Data_lineage) - Wikipedia - Covers lineage graph structures and append-only event capture patterns — supporting this chapter's event-driven graph update architecture and the requirement that temporal properties are managed with append-only semantics rather than in-place updates.

9. [openCypher Standard](https://opencypher.org/) - openCypher Project - Documents the openCypher specification for graph constraint syntax, index declarations, and schema management — directly relevant to this chapter's context graph constraint types and schema evolution principles using standard Cypher-compatible tooling.

10. [Embedding (machine learning)](https://en.wikipedia.org/wiki/Embedding_(machine_learning)) - Wikipedia - Explains vector embeddings and approximate nearest-neighbor indexes (HNSW) — supporting this chapter's vector embedding index section and the complementary hybrid retrieval pattern combining semantic embedding search with graph traversal for context assembly.
