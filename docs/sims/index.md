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

</div>
