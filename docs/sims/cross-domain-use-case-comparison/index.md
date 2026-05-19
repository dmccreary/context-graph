---
title: Cross-Domain Use Case Decision Trace Comparison
description: Learners can compare how the same core decision trace schema instantiates across different enterprise domains by identifying the domain-specific entity types and decision types while recognizing the shared structural pattern.
status: implemented
library: vis-network
bloom_level: Analyze (L4)
---

# Cross-Domain Use Case Decision Trace Comparison



<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: "Chapter 17: Enterprise Use Cases"](../../chapters/17-enterprise-use-cases/index.md).

```text
Type: graph-model
**sim-id:** cross-domain-use-case-comparison
**Library:** vis-network
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: compare
Learning Objective: Learners can compare how the same core decision trace schema instantiates across different enterprise domains by identifying the domain-specific entity types and decision types while recognizing the shared structural pattern.

Instructional Rationale: A multi-panel vis-network diagram showing five domain instances of the same schema is appropriate for the Analyze objective — learners must identify both differences (domain-specific node types) and commonalities (shared edge type vocabulary), which requires analysis rather than recall.

Canvas: responsive width, 560px height. Five domain mini-graphs arranged in a 2×3 grid (last cell empty or used for legend).

Each mini-graph shows: one central Decision Trace node (indigo), connected to 3 nodes:
- Entity node (teal, domain-specific label)
- Actor node (gold, domain-specific label)
- Policy node (steel blue, domain-specific label)

Domain 1 (Finance): Decision="Revenue Exception", Entity="Invoice", Actor="Controller", Policy="GAAP ASC 606 v2024"
Domain 2 (Sales): Decision="Pricing Concession", Entity="Opportunity", Actor="VP Sales", Policy="Pricing Policy v3.2"
Domain 3 (Engineering): Decision="Rollback to v4.1", Entity="Auth Service", Actor="On-Call Engineer", Policy="Change Management Policy"
Domain 4 (Legal): Decision="Exception Approval", Entity="Contract Clause", Actor="Legal Counsel", Policy="Standard Terms v8"
Domain 5 (Healthcare): Decision="Treatment Change", Entity="Patient Encounter", Actor="Attending Physician", Policy="Clinical Guideline v2025.3"

Each mini-graph labeled with domain name at top.

Click on any Decision Trace node in any domain: shows the shared required properties (trace_id, decision_type, timestamp, status, context_summary) alongside domain-specific optional properties.
Click on any Entity node: shows how this entity is defined differently in each domain but referenced by the same canonical entity ID pattern.
Click on any Policy node: emphasizes that all domains link to specific policy VERSIONS — not current policy — for temporal correctness.

Legend box: "The edge types are the same across all domains: DECIDED_BY, APPLIES_TO, GOVERNED_BY, CITES. The schema is universal; the content is domain-specific."
```

## Related Resources

- [Chapter 17: "Chapter 17: Enterprise Use Cases"](../../chapters/17-enterprise-use-cases/index.md)
