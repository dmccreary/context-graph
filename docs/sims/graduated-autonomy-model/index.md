---
title: Graduated Autonomy Model
description: Learners can justify the transition criteria between autonomy levels by explaining how context graph depth (number of relevant precedents) relates to agent reliability and warranted trust expansion.
status: scaffold
library: vis-network
bloom_level: Evaluate (L5)
---

# Graduated Autonomy Model



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: "Chapter 16: AI Agent Architecture"](../../chapters/16-ai-agent-architecture/index.md).

```text
Type: graph-model
**sim-id:** graduated-autonomy-model
**Library:** vis-network
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: justify
Learning Objective: Learners can justify the transition criteria between autonomy levels by explaining how context graph depth (number of relevant precedents) relates to agent reliability and warranted trust expansion.

Instructional Rationale: A hierarchical vis-network diagram with clickable transition conditions is appropriate for the Evaluate objective — learners must evaluate whether a specific condition (e.g., 95% validation rate over 200 decisions) justifies an autonomy expansion, which requires judgment rather than recall.

Canvas: responsive width, 520px height. Light gray background.

Nodes (4 autonomy level nodes, stacked top-to-bottom):
- "Level 1: Draft Only" (steel blue, large box)
- "Level 2: Auto-Approve w/ Review" (teal, large box)
- "Level 3: Auto-Approve Routine" (gold, large box)
- "Level 4: Full Autonomy In-Policy" (indigo, large box)

Vertical edges between adjacent levels, labeled:
- L1 → L2: "≥ 95% human validation rate over 200+ decisions"
- L2 → L3: "≤ 2% reversal rate over 500+ decisions"
- L3 → L4: "≤ 0.5% reversal rate, P95 faithfulness > 0.92, over 2,000+ decisions"

Reverse edges (rollback):
- L2 → L1 (red, dashed): "reversal rate spike > 5% in any 7-day window"
- L3 → L2 (red, dashed): "reversal rate spike > 3% or anomalous decision pattern detected"
- L4 → L2 (red, large, dashed): "any compliance violation or regulatory alert"

Small "Context Graph Depth" annotation node (orange) connected to each transition edge: "Required precedent depth: L1→L2: 50+ relevant precedents, L2→L3: 200+ relevant precedents, L3→L4: 1,000+ relevant precedents."

Click on each level node: shows what the agent does at this level, what human oversight remains, and what LLM metrics to monitor.
Click on each transition edge: shows the exact measurement method for the transition criterion and explains why that threshold was chosen.
Click on each rollback edge: shows the trigger condition and the investigation protocol that must complete before re-promotion.

Physics: hierarchical layout, top-to-bottom. Fixed vertical positions.
```

## Related Resources

- [Chapter 16: "Chapter 16: AI Agent Architecture"](../../chapters/16-ai-agent-architecture/index.md)
