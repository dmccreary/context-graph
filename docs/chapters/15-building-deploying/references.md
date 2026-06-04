# References: Building and Deploying Context Graph Systems

1. [Graph Database](https://en.wikipedia.org/wiki/Graph_database) - Wikipedia - Covers native graph storage architectures, index-free adjacency, transaction support, and horizontal scaling through sharding and replication — directly supporting this chapter's property graph database selection criteria and the traversal performance targets for production context graphs.

2. [Data Pipeline](https://en.wikipedia.org/wiki/Data_pipeline) - Wikipedia - Explains data pipeline architectures including event-driven patterns, message queues, and batch processing — foundational for this chapter's ingestion pipeline design covering real-time event streaming integration and batch backfill strategies.

3. [Vector Database](https://en.wikipedia.org/wiki/Vector_database) - Wikipedia - Explains vector database architectures including HNSW indexing, approximate nearest-neighbor search, and metadata filtering — directly supporting this chapter's vector index layer selection criteria and the hybrid storage architecture combining graph and vector components.

4. *Designing Data-Intensive Applications* - Martin Kleppmann - O'Reilly Media - Chapters 10–12 cover stream processing, message queue patterns, replication, and backpressure in distributed systems — providing the foundational engineering context for this chapter's event streaming integration, message queue durability pattern, and context graph replication design.

5. *Fundamentals of Data Engineering* - Joe Reis, Matt Housley - O'Reilly Media - Chapters 5–8 cover ingestion pipeline design, batch vs. streaming architectures, backfill strategies, and schema evolution in production data systems — directly matching this chapter's ingestion pipeline treatment including real-time, batch, and backfill modes.

6. [Extract, Transform, Load](https://en.wikipedia.org/wiki/Extract,_transform,_load) - Wikipedia - Covers ETL pipeline patterns including batch scheduling, schema validation, entity resolution, and error handling — supporting this chapter's batch ingestion pipeline design and the ingestion service's schema validator and entity resolver sub-components.

7. [OpenLineage Open Standard](https://openlineage.io/) - OpenLineage Project - Documents the OpenLineage open standard for lineage event capture in data pipelines — directly relevant to this chapter's event-driven ingestion architecture and the integration of lineage metadata with context graph decision trace writes.

8. [Apache Marquez Data Lineage](https://marquezproject.ai/) - Marquez Project - Describes an open-source lineage tracking system that implements OpenLineage — providing a concrete reference implementation for the ingestion monitoring and lineage tracking patterns discussed in this chapter's monitoring and alerting sections.

9. [Cypher (query language)](https://en.wikipedia.org/wiki/Cypher_(query_language)) - Wikipedia - Documents the Cypher query language used in context graph REST and GraphQL API query patterns — directly supporting this chapter's API design sections and the standard endpoint patterns for entity decision history retrieval and precedent ranking.

10. [Software Engineering at Google](https://en.wikipedia.org/wiki/Software_Engineering_at_Google) - Titus Winters, Tom Manshreck, Hyrum Wright - O'Reilly Media - Covers production system design including testing strategies, SLA definition, monitoring and alerting, and cost modeling for large-scale systems — supporting this chapter's context graph testing strategy, SLA design, and cost model sections.
