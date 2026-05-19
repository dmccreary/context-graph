---
title: Audit Trail Architecture in a Context Graph
description: Learners can assess whether a proposed context graph audit trail design meets the three requirements of tamper evidence, temporal completeness, and searchability by examining the architectural components.
status: implemented
library: vis-network
bloom_level: Evaluate (L5)
---

# Audit Trail Architecture in a Context Graph



<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: "Chapter 18: Compliance, Explainability, and Audit"](../../chapters/18-compliance-explainability/index.md).

```text
Type: graph-model
**sim-id:** audit-trail-architecture
**Library:** vis-network
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: assess
Learning Objective: Learners can assess whether a proposed context graph audit trail design meets the three requirements of tamper evidence, temporal completeness, and searchability by examining the architectural components.

Instructional Rationale: A clickable architecture diagram with assessment criteria is appropriate for the Evaluate objective — learners must judge whether each architectural component addresses a specific compliance requirement, which requires critical evaluation rather than recall.

Canvas: responsive width, 520px height. White background.

Nodes (top-to-bottom flow):
1. "Automated Decision System" (orange, box) — source of decisions
2. "Write API (append-only)" (indigo, box) — enforces immutability
3. "Context Graph (decision traces)" (indigo, large ellipse) — core store
4. "Hash Chain Log" (steel blue, box, dashed border) — optional high-assurance tamper evidence
5. "Compliance Gap Analyzer" (gold, box) — monitors completeness
6. "Audit Query Engine (GraphQL)" (teal, box) — enables searchability
7. "Regulator / Auditor" (gray, circle, right side)
8. "Individual (right to explanation)" (gray, circle, right side)

Edges:
- Automated Decision System → Write API, label "writes decision traces"
- Write API → Context Graph, label "append-only writes"
- Context Graph → Hash Chain Log, label "hash-chains each write (optional)"
- Compliance Gap Analyzer → Context Graph, label "monitors trace completeness"
- Compliance Gap Analyzer → Automated Decision System, label "compares event counts"
- Context Graph → Audit Query Engine, label "serves queries"
- Audit Query Engine → Regulator, label "regulatory report"
- Audit Query Engine → Individual, label "right-to-explanation response"

Click on Write API: "**Tamper Evidence** — The append-only write API accepts new traces but rejects updates or deletions. Once written, a decision trace is immutable. This structural property means the audit trail cannot be quietly modified after the fact."
Click on Compliance Gap Analyzer: "**Temporal Completeness** — Continuously compares: 'decisions made in operational systems' vs. 'decision traces in context graph.' Alerts when coverage drops below 99%. This catches integration failures before auditors do."
Click on Audit Query Engine: "**Searchability** — The GraphQL API allows regulators to run arbitrary traversal queries: 'show all credit decisions for EU residents between Jan-Mar 2025,' 'trace the authorization chain for decision DT-44821.' No custom scripting required."
Click on Hash Chain Log: "**High-Assurance Tamper Evidence** — Each new trace record's hash includes the hash of the previous record. Any retroactive modification invalidates all subsequent hashes, detectable by any party with the hash chain. Used for high-risk regulated domains."

Assessment panel at bottom: "Does this architecture meet the three audit trail requirements? Click each component to evaluate."
```

## Related Resources

- [Chapter 18: "Chapter 18: Compliance, Explainability, and Audit"](../../chapters/18-compliance-explainability/index.md)
