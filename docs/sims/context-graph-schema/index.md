---
title: Context Graph Schema — Core Node and Edge Types
description: Learners can identify the four core schema elements of a context graph (Decision Node, Entity Link, Approval Edge, Precedent Link) and state what information each carries.
status: implemented
library: vis-network
bloom_level: Remember (L1)
---

# Context Graph Schema — Core Node and Edge Types



<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: "Chapter 9: What a Context Graph Is"](../../chapters/09-context-graph-definition/index.md).

```text
Type: graph-model
**sim-id:** context-graph-schema
**Library:** vis-network
**Status:** Specified

Bloom Level: Remember (L1)
Bloom Verb: identify
Learning Objective: Learners can identify the four core schema elements of a context graph (Decision Node, Entity Link, Approval Edge, Precedent Link) and state what information each carries.

Instructional Rationale: A clickable vis-network schema diagram is appropriate for the Remember objective — learners can click each node type and edge type to see its property list and role, reinforcing recall through active engagement with the schema structure.

Canvas: responsive width, 560px height. White background with light gray grid.

Nodes:
- "Decision: Price Exception Q4-2025" (indigo, large ellipse, center-left) — represents a specific decision
- "Customer: Acme Corp" (teal, ellipse, left) — business entity
- "Approver: M. Williams (VP Sales)" (gold, circle, top-center)
- "Policy: Pricing Policy v3.2" (steel blue, box, bottom-left)
- "Precedent: Price Exception Q2-2024" (indigo, smaller ellipse, right) — earlier decision cited as precedent
- "Precedent: Price Exception Q4-2023" (indigo, smallest ellipse, far-right) — second precedent

Edges:
- Decision → Customer: Acme Corp, label "APPLIES_TO", color dark gray
- Approver → Decision, label "APPROVED", color gold, arrow at Decision end
- Decision → Policy: Pricing Policy v3.2, label "GOVERNED_BY", color steel blue
- Decision → Precedent Q2-2024, label "CITES", color orange, dashed
- Decision → Precedent Q4-2023, label "CITES", color orange, dashed

Click on "Decision: Price Exception Q4-2025":
"**Decision Node** — the core schema element. Properties: decision_id (UID), decision_type ('pricing_exception'), timestamp ('2025-10-31T14:22:00Z'), actor_id ('EMP-J-SMITH'), status ('active'), context_summary ('15% discount approved for Acme Corp renewal, Q4 end-of-period, strategic account justification')."

Click on "Customer: Acme Corp":
"**Entity Link (APPLIES_TO)** — connects a decision node to the business entity it concerns. This entity lives in the enterprise knowledge graph. The link makes the decision discoverable through any query that starts from this customer entity."

Click on "Approver: M. Williams":
"**Approval Edge (APPROVED)** — records the authorization. Properties: approval_timestamp, approval_channel ('system: CRM approval workflow'), conditions ('no recurrence within 12 months'). Out-of-band approvals (verbal, email) can also be recorded here."

Click on "Policy: Pricing Policy v3.2":
"**Policy Reference Edge (GOVERNED_BY)** — links to the *specific version* of the policy in force at decision time. Critical for historical query accuracy: v3.2, not the current v4.1."

Click on either Precedent node:
"**Precedent Link (CITES)** — records which earlier decisions were consulted. High in-degree decisions (cited by many) are the most influential organizational precedents and are retrieved first in LLM context assembly."

Hover over each edge: shows edge label and description.
```

## Related Resources

- [Chapter 9: "Chapter 9: What a Context Graph Is"](../../chapters/09-context-graph-definition/index.md)
