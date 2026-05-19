---
title: Engineering Incident Context Graph
description: Learners can use the incident response context graph schema to design the decision trace structure for a specific production incident, identifying the relevant entity nodes, decision nodes, and edge types.
status: implemented
library: vis-network
bloom_level: Apply (L3)
---

# Engineering Incident Context Graph



<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: "Chapter 17: Enterprise Use Cases"](../../chapters/17-enterprise-use-cases/index.md).

```text
Type: graph-model
**sim-id:** incident-response-graph
**Library:** vis-network
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: use
Learning Objective: Learners can use the incident response context graph schema to design the decision trace structure for a specific production incident, identifying the relevant entity nodes, decision nodes, and edge types.

Instructional Rationale: A concrete, fully-instantiated example graph is appropriate for the Apply objective — seeing a real incident trace structure lets learners immediately transpose the pattern to their own engineering context.

Canvas: responsive width, 520px height. White background.

Nodes for "Incident-891 (2025-04-01)":
- "Alert: HighErrorRate-Service-Auth" (orange, diamond) — trigger
- "Decision: Roll back Auth Service v4.2" (indigo, large ellipse) — main decision
- "Decision: Page DB-team for capacity" (indigo, medium ellipse) — secondary decision
- "Service: Auth Service" (teal, box)
- "Deployment: Auth-v4.2 (bad)" (red, small box)
- "Deployment: Auth-v4.1 (good rollback)" (green, small box)
- "Engineer: K. Patel (on-call)" (gold, circle)
- "Precedent: Incident-447 (2025-03-14)" (indigo, smaller ellipse, dashed border)
- "Resolution: Auth Service healthy at T+18min" (green, box)

Edges:
- Alert → Decision (rollback), label "triggered"
- Decision (rollback) → Service: Auth Service, label "APPLIES_TO"
- Decision (rollback) → Deployment: Auth-v4.2, label "FROM_VERSION"
- Decision (rollback) → Deployment: Auth-v4.1, label "TO_VERSION"
- Engineer K. Patel → Decision (rollback), label "DECIDED_BY"
- Decision (rollback) → Precedent: Incident-447, label "CITES"
- Decision (rollback) → Decision (page DB-team), label "TRIGGERED"
- Decision (rollback) → Resolution, label "RESULTED_IN"

Click on Decision (rollback): shows full property list — trace_id, decision_type='incident_response', timestamp, context_summary, exception_flag=true (rollback is non-standard for this service), confidence=high.
Click on Precedent: "**Cited Precedent** — Incident-447, 18 days earlier, same alert pattern, same auth service, rollback from v4.1 to v4.0 resolved in 9 minutes. Context graph retrieval surfaced this as the top precedent, reducing investigation time from ~30 minutes to ~5 minutes."
Click on Resolution: "**Outcome Node** — recorded 18 minutes after the rollback decision. Resolution time was longer than precedent (9 min vs 18 min) because of the additional DB paging decision. This outcome is recorded in the precedent's trace for future reference."

Hover over edges shows labels.
```

## Related Resources

- [Chapter 17: "Chapter 17: Enterprise Use Cases"](../../chapters/17-enterprise-use-cases/index.md)
