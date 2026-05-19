---
title: Multi-Hop Query Performance
description: Learners can explain why native graph traversal performance grows linearly with hop count while relational JOIN performance degrades super-linearly, and identify the crossover point where graph performance becomes practically necessary.
status: implemented
library: Chart.js
bloom_level: Analyze (L4)
---

# Multi-Hop Query Performance



<iframe src="main.html" width="100%" height="482" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: "Chapter 1: Knowledge Graphs and Labeled Property Graphs"](../../chapters/01-knowledge-graphs-lpg/index.md).

```text
Type: chart
**sim-id:** multi-hop-performance<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare and contrast
Learning Objective: Learners can explain why native graph traversal performance grows linearly with hop count while relational JOIN performance degrades super-linearly, and identify the crossover point where graph performance becomes practically necessary.

Chart type: Grouped bar chart

X-axis label: "Number of Hops"
X-axis values: 1, 2, 3, 4, 5
Y-axis label: "Query Response Time (ms)"
Y-axis: Logarithmic scale, range 1ms to 1,000,000ms

Data series:
1. Relational Database (orange bars):
   - 1 hop: 8ms
   - 2 hops: 90ms
   - 3 hops: 1,400ms
   - 4 hops: 28,000ms
   - 5 hops: 650,000ms

2. Native Graph Database (indigo bars):
   - 1 hop: 4ms
   - 2 hops: 7ms
   - 3 hops: 11ms
   - 4 hops: 15ms
   - 5 hops: 19ms

Interactive behavior:
- Hover any bar: tooltip shows exact milliseconds formatted for readability (e.g., "28,000 ms ≈ 28 seconds")
- Click a hop's bar pair: highlight both bars at that hop count; display a callout showing the ratio (e.g., "At 4 hops: relational is 1,867× slower")
- Toggle button below chart: switch Y-axis between logarithmic and linear scales. On linear scale the relational 5-hop bar visually dominates the entire chart area, making the practical consequence visceral.
- Annotation on relational 5-hop bar: "~11 minutes — effectively unusable for real-time queries"
- Annotation on graph series line: "~4ms per additional hop — near-linear growth"

Title: "Multi-Hop Query Performance: Native Graph vs Relational"
Legend: Top-right

Color palette: Indigo (#3949ab) for graph, orange (#f57c00) for relational.
Canvas: Responsive width, 480px height.
```

## Related Resources

- [Chapter 1: "Chapter 1: Knowledge Graphs and Labeled Property Graphs"](../../chapters/01-knowledge-graphs-lpg/index.md)
