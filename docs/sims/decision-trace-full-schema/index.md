---
title: Complete Decision Trace LPG Schema
description: Learners can implement a complete decision trace schema by identifying the required node types, property lists, and edge types for a given enterprise decision scenario.
status: implemented
library: vis-network
bloom_level: Apply (L3)
---

# Complete Decision Trace LPG Schema



<iframe src="main.html" width="100%" height="662" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: "Chapter 11: Decision Traces: Anatomy and LPG Patterns"](../../chapters/11-decision-traces/index.md).

```text
Type: graph-model
**sim-id:** decision-trace-full-schema
**Library:** vis-network
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: implement
Learning Objective: Learners can implement a complete decision trace schema by identifying the required node types, property lists, and edge types for a given enterprise decision scenario.

Instructional Rationale: A fully-populated clickable schema diagram is appropriate for the Apply objective — learners see all schema elements instantiated with concrete example values, then can click each element to read the property list they would need to populate for their own implementation.

Canvas: responsive width, 600px height. White background with soft grid.

Nodes and positions:
Central: "Decision: Pricing Exception DT-4482" (indigo, large ellipse, center)
Left: "Initiator: J. Smith (Account Mgr)" (gold, circle)
Left-upper: "Approver: M. Williams (VP Sales)" (gold, circle, slightly above J. Smith)
Right: "Customer: Acme Corp" (teal, ellipse) — entity node from KG
Lower-left: "Policy: Pricing Policy v3.2" (steel blue, box)
Lower-right: "Precedent: DT-3891 (Q2-2024 exception)" (indigo, smaller ellipse)
Lower-far-right: "Precedent: DT-2204 (Q4-2023 exception)" (indigo, smallest ellipse)
Upper-right: "Source: CRM Revenue Data" (orange, diamond) — source data node
Upper-far-right: "Source: Billing Payment History" (orange, diamond)

Edges (with labels and colors matching the edge type vocabulary table):
- Decision ← J. Smith: label "DECIDED_BY", gray
- Decision ← M. Williams: label "APPROVED_BY", gold
- Decision → Customer: Acme Corp: label "APPLIES_TO", teal
- Decision → Policy v3.2: label "GOVERNED_BY", steel blue
- Decision → DT-3891: label "CITES", orange dashed
- Decision → DT-2204: label "CITES", orange dashed
- Decision → CRM Revenue Data: label "CONSULTED", orange
- Decision → Billing Payment History: label "CONSULTED", orange

Click on Decision node: shows full property list with example values for all required and optional properties.
Click on each Actor node: shows actor properties and the DECIDED_BY vs. APPROVED_BY distinction.
Click on Policy Version node: shows policy version properties and why the specific version (not the current version) is stored.
Click on each Precedent node: shows CITES edge properties (similarity score, finding method, favorability).
Click on each Source Data node: shows source data properties including `value_at_decision_time` and `quality_score_at_decision_time`.
Click on Customer entity node: "This node lives in the enterprise knowledge graph. The APPLIES_TO edge makes this decision discoverable from the customer entity without duplicating customer data in the decision trace."

Hover over edges: shows edge type name and a one-sentence description.
```

## Related Resources

- [Chapter 11: "Chapter 11: Decision Traces: Anatomy and LPG Patterns"](../../chapters/11-decision-traces/index.md)
