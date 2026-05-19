---
title: Governance Role Graph
description: Learners can examine a governance role graph and trace the accountability chain from a data quality problem to the correct escalation contact.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Governance Role Graph



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: "Chapter 3: Metadata Management and Data Governance"](../../chapters/03-metadata-management/index.md).

```text
Type: graph-model
**sim-id:** governance-role-graph
**Library:** vis-network
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: examine
Learning Objective: Learners can examine a governance role graph and trace the accountability chain from a data quality problem to the correct escalation contact.

Instructional Rationale: A network graph with clickable role nodes is appropriate because the Analyze objective requires learners to trace relationships — following edges from dataset to steward to owner to producer mirrors the real escalation path they would follow in practice.

Canvas: responsive width, 500px height. White background.

Nodes (color-coded by role type):
- "Revenue Dataset": shape ellipse, color indigo (#4B4EFC), size 44, central position
- "Steward: Maya Chen": shape circle, color teal (#2A9D8F), size 32
- "Owner: VP Revenue Ops": shape circle, color gold (#E9C46A), size 32
- "Producer: ERP System": shape circle, color steel (#5B7FBD), size 32
- "Consumer: Finance LLM": shape circle, color orange (#E76F51), size 28
- "Consumer: Reporting Dashboard": shape circle, color orange (#E76F51), size 28
- "Governance Board": shape box, color gray (#888), size 28

Edges:
- Revenue Dataset ← Steward: Maya Chen, label "maintains"
- Revenue Dataset ← Owner: VP Revenue Ops, label "accountable for"
- Producer: ERP System → Revenue Dataset, label "generates"
- Revenue Dataset → Consumer: Finance LLM, label "consumed by"
- Revenue Dataset → Consumer: Reporting Dashboard, label "consumed by"
- Owner: VP Revenue Ops → Governance Board, label "reports to"

Click handlers on each node:
- Revenue Dataset: "This is the dataset node in the context graph. It carries technical, business, and operational metadata. Click other nodes to see their relationship to this data."
- Steward: Maya Chen: "**Data Steward** — Maya does the day-to-day quality work: reviewing field definitions, investigating quality alerts, resolving cross-system conflicts. When an LLM flags a suspicious value, the context graph routes the alert here first."
- Owner: VP Revenue Ops: "**Data Owner** — sets policy for what this dataset means and approves definition changes. Escalation path: if Maya cannot resolve a quality problem with the producer, it goes here."
- Producer: ERP System: "**Data Producer** — the upstream system that generates records. When quality drops, the steward investigates here. The ERP system's pipeline metadata is tracked in the context graph."
- Consumer: Finance LLM: "**LLM Consumer** — reads revenue data from the context graph for automated analysis. The consumer's access rights are controlled by the access control policy attached to this dataset node."
- Governance Board: "**Data Governance Board** — sets enterprise-wide data policy. The owner escalates unresolvable conflicts here. Board decisions are recorded as decision traces in the context graph."

Hover over any edge highlights the source and target nodes.
Physics: hierarchical layout, Revenue Dataset at center, producers on left, consumers on right, governance roles above.
```

## Related Resources

- [Chapter 3: "Chapter 3: Metadata Management and Data Governance"](../../chapters/03-metadata-management/index.md)
