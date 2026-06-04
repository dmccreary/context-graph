# References: Data Engineering and Infrastructure

1. [Data Mesh](https://en.wikipedia.org/wiki/Data_mesh) - Wikipedia - Defines the data mesh architectural pattern including domain ownership, data products, self-serve infrastructure, and federated governance — directly foundational for this chapter's treatment of decentralized context graph data ownership with central platform standards enforced by a Center of Excellence.

2. [Change Data Capture](https://en.wikipedia.org/wiki/Change_data_capture) - Wikipedia - Explains change data capture methods including transaction log reading, trigger-based capture, and timestamp-based polling — directly supporting this chapter's change data feed section showing how CDC enables near-real-time graph updates from source systems without polling production tables.

3. [Data Pipeline](https://en.wikipedia.org/wiki/Data_pipeline) - Wikipedia - Covers data pipeline architectures including batch processing, streaming, orchestration, and failure handling — foundational for this chapter's workflow orchestration tools, graph batch processing, and streaming graph update sections that govern context graph freshness and completeness.

4. *Designing Data-Intensive Applications* - Martin Kleppmann - O'Reilly Media - Chapter 11 covers stream processing architectures, event logs, and exactly-once delivery guarantees — directly supporting this chapter's event streaming platform section and the streaming graph update pattern that maintains consistency under concurrent updates from multiple ingestion streams.

5. *Fundamentals of Data Engineering* - Joe Reis, Matt Housley - O'Reilly Media - Chapters 7-8 cover data ingestion patterns, orchestration tools, transformation logic, and data contract design — directly paralleling this chapter's SQL transformation tools, workflow orchestration, data products, and data contracts sections for context graph pipelines.

6. [Event-Driven Architecture](https://en.wikipedia.org/wiki/Event-driven_architecture) - Wikipedia - Covers event-driven architectural patterns including publish-subscribe, event streaming, and consumer isolation — directly supporting this chapter's event streaming platform section and the multiple consumer isolation pattern where graph ingestion, audit logging, and training data preparation all consume the same event stream independently.

7. [Feature Engineering](https://en.wikipedia.org/wiki/Feature_engineering) - Wikipedia - Explains feature engineering for machine learning including graph-derived features, temporal features, and community features — directly supporting this chapter's feature engineering from graphs section covering centrality, temporal, community, and path features extracted from context graph structure.

8. [Observability (software)](https://en.wikipedia.org/wiki/Observability_(software)) - Wikipedia - Defines software observability including metrics, logging, and tracing — directly supporting this chapter's context graph observability section and the three-layer monitoring architecture distinguishing infrastructure, data quality, and AI output quality monitoring to prevent silent data failure.

9. [Data Quality](https://en.wikipedia.org/wiki/Data_quality) - Wikipedia - Covers data quality dimensions including completeness, accuracy, freshness, and consistency — foundational for this chapter's data SLA, data contract quality assertions, and semantic monitoring sections where data quality failures propagate into incorrect context graph outputs.

10. [Service Level Agreement](https://en.wikipedia.org/wiki/Service-level_agreement) - Wikipedia - Explains SLA design including availability, latency, and freshness commitments, baseline measurement, and monitoring — directly supporting this chapter's data SLA section defining freshness, availability, and latency commitments for context graph data pipelines.
