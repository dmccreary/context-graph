---
title: Three Metadata Layers
description: Learners can classify a metadata attribute as technical, business, or operational by examining what question it answers.
status: implemented
library: vis-network
bloom_level: Understand (L2)
---

# Three Metadata Layers



<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: "Chapter 3: Metadata Management and Data Governance"](../../chapters/03-metadata-management/index.md).

```text
Type: graph-model
**sim-id:** three-metadata-layers
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: classify
Learning Objective: Learners can classify a metadata attribute as technical, business, or operational by examining what question it answers.

Instructional Rationale: A clickable vis-network graph is appropriate because the Understand objective requires learners to see how three distinct categories relate to a single central data entity — clicking each category node reveals its defining question and three example attributes.

Canvas: responsive width, 480px height. Background: white with subtle grid.

Nodes:
- Center node: label "Customer Table", color indigo (#4B4EFC), shape: ellipse, size 40
- "Technical Metadata" node: color steel blue (#5B7FBD), shape: box, label wraps to two lines
- "Business Metadata" node: color teal (#2A9D8F), shape: box
- "Operational Metadata" node: color orange (#E76F51), shape: box

Edges (all from center outward, undirected display):
- Customer Table → Technical Metadata: label "structure"
- Customer Table → Business Metadata: label "meaning"
- Customer Table → Operational Metadata: label "state"

Each outer node has a `click` handler that opens an infobox panel below the canvas. Panel content:

- Technical Metadata click: "**Technical Metadata** answers: How is this data stored? Examples: field type (VARCHAR 36), nullable (false), primary key (yes), schema version (v4.2). Generated automatically by schema crawlers."
- Business Metadata click: "**Business Metadata** answers: What does this data mean? Examples: 'Globally unique customer identifier assigned at onboarding', owner: Revenue Operations, permissible values: UUID v4 format only, PII classification: indirect identifier."
- Operational Metadata click: "**Operational Metadata** answers: How fresh and active is this data? Examples: last updated 2 hours ago, read by 14 downstream jobs in the last 7 days, pipeline error rate: 0.003%."

Center node click: "A single database table can have all three metadata types attached simultaneously. A context graph node for this table stores all three, enabling an LLM to answer: What is this data, what does it mean, and can I trust it right now?"

Layout: radial, center node fixed at canvas center, outer nodes at equal angular spacing.
Hover over any node highlights its edges.
```

## Related Resources

- [Chapter 3: "Chapter 3: Metadata Management and Data Governance"](../../chapters/03-metadata-management/index.md)
