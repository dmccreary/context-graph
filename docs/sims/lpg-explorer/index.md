---
title: Interactive LPG Explorer
description: Learners can identify nodes, edges, labels, and properties in a Labeled Property Graph and explain the role of each element.
status: scaffold
library: vis-network
bloom_level: Understand (L2)
---

# Interactive LPG Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: "Chapter 1: Knowledge Graphs and Labeled Property Graphs"](../../chapters/01-knowledge-graphs-lpg/index.md).

```text
Type: graph-model
**sim-id:** lpg-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Identify and describe
Learning Objective: Learners can identify nodes, edges, labels, and properties in a Labeled Property Graph and explain the role of each element.

Purpose: Show a small but realistic enterprise LPG (supply-chain scenario) with clickable nodes and edges that reveal labels, types, and properties in a side panel. The learner should be able to distinguish nodes from edges, labels from types, and properties on nodes from properties on edges.

Sample graph scenario: A simplified supply chain with 10 nodes.

Node types (distinct colors and shapes):
- Supplier (orange ellipse): properties: name, country, risk_tier
  - Examples: "Acme Components" (US, tier-1), "Bolts & More" (MX, tier-2)
- Product (blue rectangle): properties: sku, unit_cost
  - Examples: "Widget-A" ($12.50), "Widget-B" ($7.20)
- Warehouse (teal diamond): properties: location, capacity_units
  - Examples: "Chicago DC" (50,000 units), "Atlanta DC" (32,000 units)
- Order (gray circle): properties: order_id, amount_usd, status
  - Examples: "ORD-2024-001" ($45,000, confirmed)

Edge types (distinct arrow styles):
- SUPPLIES (solid orange arrow): properties: lead_time_days
  Direction: Supplier → Product
- STOCKS (dashed teal arrow): properties: quantity_on_hand
  Direction: Warehouse → Product
- FULFILLS (solid blue arrow): properties: fulfillment_date
  Direction: Warehouse → Order

Interactive behavior:
- Hover any node: tooltip showing all properties (key: value pairs)
- Click a node: highlight all directly connected nodes and edges; right-side detail panel shows label, type, and full property list
- Click an edge: highlight endpoint nodes; detail panel shows edge type, direction (from → to), and edge properties
- Legend (top-right): node shapes and colors mapped to labels
- Zoom via mouse wheel; pan by dragging background
- "Reset View" button returns to default layout

Layout: Force-directed, stabilized on load. Canvas fully responsive to window width; 520px height.
Detail panel: 200px fixed right column, shows selected element's data.
Color palette: Indigo (#3949ab) and orange (#f57c00) consistent with book theme.
```

## Related Resources

- [Chapter 1: "Chapter 1: Knowledge Graphs and Labeled Property Graphs"](../../chapters/01-knowledge-graphs-lpg/index.md)
