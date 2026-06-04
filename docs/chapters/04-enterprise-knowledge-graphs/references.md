# References: Enterprise Knowledge Graphs — Core Patterns

1. [Knowledge Graph](https://en.wikipedia.org/wiki/Knowledge_graph) - Wikipedia - Covers enterprise knowledge graph construction, entity types, relationship modeling, and applications at scale — foundational background for this chapter's treatment of domain subgraphs and canonical entity models across HR, finance, CRM, and ERP systems.

2. [Ontology (information science)](https://en.wikipedia.org/wiki/Ontology_(information_science)) - Wikipedia - Defines ontology as a formal representation of concepts, types, and relationships, directly supporting this chapter's contrast of ontologies vs. taxonomies and the role of ontologies as schema backbones for enterprise knowledge graphs.

3. [Entity Resolution](https://en.wikipedia.org/wiki/Entity_resolution) - Wikipedia - Explains deterministic and probabilistic approaches to matching records across systems to a single canonical entity — the foundational challenge this chapter identifies as the prerequisite for all enterprise knowledge graph construction.

4. *Knowledge Graphs: Fundamentals, Techniques, and Applications* - Aidan Hogan et al. - MIT Press - Chapters 3–5 cover knowledge graph construction from heterogeneous enterprise sources, entity resolution, schema alignment, and federated graph architectures at the technical depth this chapter introduces.

5. *Graph Databases* (2nd ed.) - Ian Robinson, Jim Webber, Emil Eifrem - O'Reilly Media - Chapters 4–6 cover enterprise graph deployment patterns including hub-and-spoke federation, ETL ingestion patterns, schema governance, and scaling to large graphs — directly matching this chapter's core topics.

6. [Enterprise Knowledge Graph](https://en.wikipedia.org/wiki/Enterprise_knowledge_graph) - Wikipedia - Surveys enterprise knowledge graph implementations, their integration patterns with source systems, and the organizational challenges of maintaining cross-domain canonical entity models described in this chapter.

7. [SKOS Simple Knowledge Organization System](https://www.w3.org/TR/skos-reference/) - W3C - Official W3C reference for SKOS, the standard for representing taxonomies and controlled vocabularies in machine-readable form — directly relevant to this chapter's section on SKOS as a bridge between taxonomies and graph ontologies.

8. [OpenLineage Open Standard](https://openlineage.io/) - OpenLineage Project - Documents the open standard for capturing pipeline lineage and provenance metadata — supporting this chapter's treatment of missing provenance as an operational failure mode and governed ingestion as a pipeline requirement.

9. [Data Lineage](https://en.wikipedia.org/wiki/Data_lineage) - Wikipedia - Covers lineage tracking across ETL pipelines and data systems, supporting this chapter's five-stage graph ingestion pattern and the requirement to record provenance metadata at every load step.

10. [Graph Theory](https://en.wikipedia.org/wiki/Graph_theory) - Wikipedia - Covers foundational graph theory including graph partitioning and clustering algorithms relevant to this chapter's discussion of graph sharding strategies that minimize cross-shard edges in billion-edge enterprise deployments.
