---
title: Compliance Lifecycle for a Context Graph System
description: Learners can design a compliance lifecycle for a context graph deployment by identifying the required activities at each phase and linking each activity to the specific regulatory requirement it addresses.
status: implemented
library: vis-network
bloom_level: Create (L6)
---

# Compliance Lifecycle for a Context Graph System



<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: "Chapter 18: Compliance, Explainability, and Audit"](../../chapters/18-compliance-explainability/index.md).

```text
Type: graph-model
**sim-id:** compliance-lifecycle
**Library:** vis-network
**Status:** Specified

Bloom Level: Create (L6)
Bloom Verb: design
Learning Objective: Learners can design a compliance lifecycle for a context graph deployment by identifying the required activities at each phase and linking each activity to the specific regulatory requirement it addresses.

Instructional Rationale: A lifecycle flow diagram with requirement links is appropriate for the Create objective — learners must produce a design artifact (the compliance lifecycle) that correctly maps activities to requirements, demonstrating synthesis of regulatory and technical knowledge.

Canvas: responsive width, 540px height. White background.

Layout: circular lifecycle flow with 6 phases arranged clockwise:
1. "Design & Model Card" (indigo, box, top)
2. "Deploy & Activate" (teal, box, top-right)
3. "Monitor Continuously" (gold, box, right)
4. "Audit Response" (steel blue, box, bottom-right)
5. "Governance Reporting" (orange, box, bottom-left)
6. "Red Team & Review" (red, box, left)

Arrows connecting each phase to the next (clockwise). A central node "Context Graph (Decision Traces)" (large indigo ellipse) connected to all six phases.

Click on each phase node: shows:
- Phase description (what activities are performed)
- Regulatory requirements addressed (EU AI Act article, GDPR article, domain-specific)
- Context graph's role (how the context graph enables or supports this phase)

Phase 1 Design: "Model card drafted. Data retention policy set. Fairness metrics defined. Schema designed for auditability. **EU AI Act**: conformity assessment preparation."
Phase 2 Deploy: "Integration connections established. Monitoring dashboards configured. Autonomy level set to L1. **GDPR Art. 22**: legitimate basis documented."
Phase 3 Monitor: "Faithfulness score tracked. Fairness metrics computed. Compliance gap analysis runs daily. Autonomy levels adjusted. **EU AI Act**: post-market monitoring."
Phase 4 Audit Response: "Decision traces retrieved for requested decisions. Right-to-explanation responses generated. Regulatory submissions prepared. **GDPR Art. 22**: right to explanation fulfilled."
Phase 5 Governance Reporting: "Quarterly report generated from context graph analytics. Board and regulator submission. Red team results included. **EU AI Act**: transparency and accountability."
Phase 6 Red Team: "Context manipulation probed. Precedent gaming tested. Extraction attacks attempted. Findings → access control updates. **EU AI Act**: robustness and cybersecurity."

Hover over arrows shows "continuous cycle" annotation.
```

## Related Resources

- [Chapter 18: "Chapter 18: Compliance, Explainability, and Audit"](../../chapters/18-compliance-explainability/index.md)
