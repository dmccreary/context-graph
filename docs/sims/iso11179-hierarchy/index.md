---
title: ISO 11179 Component Hierarchy
description: Learners can identify all six ISO 11179 components and state the relationship between each adjacent pair in the hierarchy.
status: implemented
library: vis-network
bloom_level: Remember (L1)
---

# ISO 11179 Component Hierarchy



<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: "Chapter 6: Metadata Registries and ISO 11179"](../../chapters/06-metadata-registries/index.md).

```text
Type: graph-model
**sim-id:** iso11179-hierarchy
**Library:** vis-network
**Status:** Specified

Bloom Level: Remember (L1)
Bloom Verb: identify
Learning Objective: Learners can identify all six ISO 11179 components and state the relationship between each adjacent pair in the hierarchy.

Instructional Rationale: A hierarchical vis-network graph is appropriate for the Remember objective — each component is a node, the hierarchy is visualized as top-to-bottom edges, and clicking each node reveals its definition and a concrete example, reinforcing recall through active engagement.

Canvas: responsive width, 520px height. White background.

Layout: Two side-by-side columns. Left column: abstract ISO 11179 component hierarchy (top-to-bottom). Right column: worked example ("Customer Annual Revenue") showing the concrete instance of each component at the corresponding level.

**Left column nodes** (abstract, indigo theme):
- "Object Class" (top, large)
- "Property" (below, large)
- "Data Element Concept" (center, highlighted gold — the combination of the above two)
- "Conceptual Domain" (below Data Element Concept)
- "Value Domain" (below Conceptual Domain)
- "Data Element" (bottom, large — the fully specified unit)

**Right column nodes** (example, teal theme, same vertical positions):
- "Customer" (aligns with Object Class)
- "Annual Revenue" (aligns with Property)
- "Customer Annual Revenue" (aligns with Data Element Concept)
- "{Monetary amounts ≥ 0}" (aligns with Conceptual Domain)
- "Decimal, USD, trailing 12mo" (aligns with Value Domain)
- "Customer_Annual_Revenue_USD_TTM" (aligns with Data Element — the actual field name)

Horizontal dashed edges connect each abstract node to its example node.
Vertical solid edges connect each abstract node to the next in the hierarchy.
Two merging edges from Object Class + Property → Data Element Concept.
Two merging edges from Data Element Concept + Value Domain → Data Element.

Click on each abstract node: displays infobox with ISO 11179 definition and one additional worked example.
Click on each example node: displays infobox explaining how this specific value was derived from the abstract concept.

Physics: hierarchical layout, top-to-bottom, left and right columns anchored to fixed x positions.
```

## Related Resources

- [Chapter 6: "Chapter 6: Metadata Registries and ISO 11179"](../../chapters/06-metadata-registries/index.md)
