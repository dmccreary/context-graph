# MicroSims

MicroSims are small, interactive educational simulations — each one focused on
a single concept. They live under `docs/sims/<sim-name>/` and are embedded
into chapters via iframes.

New MicroSims can be created with the `microsim-generator` skill, which routes
to the appropriate library (p5.js, Chart.js, vis-network, Mermaid, Leaflet,
Plotly, Venn.js).

## Catalog

<div class="grid cards" markdown>

-   __[Data Model Comparison Explorer](data-model-comparison/index.md)__

    ![Data Model Comparison](data-model-comparison/data-model-comparison.png)

    Compare Relational, RDF, LPG, and Vector Store data models side-by-side
    with a 5×4 query performance benchmark. **Chapter 1 · p5.js**

-   __[Graph Traversal Explorer](graph-traversal-explorer/index.md)__

    ![Graph Traversal Explorer](graph-traversal-explorer/graph-traversal-explorer.png)

    Step through BFS and DFS on a 12-node enterprise org graph; watch the
    queue/stack and visit order build up. **Chapter 1 · p5.js**

-   __[Interactive LPG Explorer](lpg-explorer/index.md)__

    ![LPG Explorer](lpg-explorer/lpg-explorer.png)

    Click nodes and edges in a supply-chain Labeled Property Graph to inspect
    labels, types, and properties. **Chapter 1 · vis-network**

-   __[Multi-Hop Query Performance](multi-hop-performance/index.md)__

    ![Multi-Hop Query Performance](multi-hop-performance/multi-hop-performance.png)

    Compare native graph (linear) vs relational (super-linear) query latency
    across 1–5 hops; toggle log/linear scale. **Chapter 1 · Chart.js**

-   __[Query Federation Flow](query-federation-flow/index.md)__

    ![Query Federation Flow](query-federation-flow/query-federation-flow.png)

    Step through a federated business query as it's decomposed into SQL, REST,
    and graph sub-queries, then re-joined. **Chapter 2 · p5.js**

-   __[Semantic Consistency Explorer](semantic-consistency-explorer/index.md)__

    ![Semantic Consistency Explorer](semantic-consistency-explorer/semantic-consistency-explorer.png)

    Compare Finance and Sales revenue numbers and see how a semantic layer
    reconciles them into one canonical metric. **Chapter 2 · p5.js**

-   __[Semantic Layer Architecture](semantic-layer-architecture/index.md)__

    ![Semantic Layer Architecture](semantic-layer-architecture/semantic-layer-architecture.png)

    Click any element across the Query Interface, Semantic Layer, and Physical
    Storage bands to trace its references. **Chapter 2 · p5.js**

-   __[Metadata Catalog to Context Graph Flow](catalog-to-context-graph-flow/index.md)__

    ![Catalog to Context Graph Flow](catalog-to-context-graph-flow/catalog-to-context-graph-flow.png)

    Step through how metadata moves from source systems through a catalog
    platform and into a context graph. **Chapter 3 · p5.js**

-   __[Differential Privacy Explorer](differential-privacy-explorer/index.md)__

    ![Differential Privacy Explorer](differential-privacy-explorer/differential-privacy-explorer.png)

    Drag the epsilon slider and feel the trade-off between privacy and result
    accuracy via Laplace-noise simulation. **Chapter 3 · p5.js**

-   __[Governance Framework Concept Map](governance-concept-map/index.md)__

    ![Governance Concept Map](governance-concept-map/governance-concept-map.png)

    Explore 25 governance concepts in five color-coded clusters; click any
    concept to see its definition and connections. **Chapter 3 · vis-network**

-   __[Governance Role Graph](governance-role-graph/index.md)__

    ![Governance Role Graph](governance-role-graph/governance-role-graph.png)

    Trace the accountability chain from a dataset to steward, owner,
    producer, consumers, and the governance board. **Chapter 3 · vis-network**

-   __[Three Metadata Layers](three-metadata-layers/index.md)__

    ![Three Metadata Layers](three-metadata-layers/three-metadata-layers.png)

    Radial diagram showing technical, business, and operational metadata
    attached to a single Customer Table. **Chapter 3 · vis-network**

-   __[Graph ETL Pipeline Stages](graph-etl-pipeline/index.md)__

    ![Graph ETL Pipeline](graph-etl-pipeline/graph-etl-pipeline.png)

    Step a Customer record through Extract → Resolve → Transform → Validate
    → Load with a failure-mode toggle. **Chapter 4 · p5.js**

-   __[Hub-and-Spoke vs Federated](hub-spoke-vs-federated/index.md)__

    ![Hub-and-Spoke vs Federated](hub-spoke-vs-federated/hub-spoke-vs-federated.png)

    Side-by-side knowledge-graph architectures; click any node to surface
    the trade-offs each side encodes. **Chapter 4 · vis-network**

-   __[Taxonomy vs Ontology](taxonomy-vs-ontology/index.md)__

    ![Taxonomy vs Ontology](taxonomy-vs-ontology/taxonomy-vs-ontology.png)

    Contrast a hierarchy-only taxonomy with a richly-typed ontology for
    the same product domain. **Chapter 4 · vis-network**

</div>
