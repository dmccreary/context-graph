---
title: Process Discovery — From Event Log to Process Graph
description: Learners can explain how a directly-follows graph is derived from event log data by tracing which activity transitions occur in the log.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Process Discovery — From Event Log to Process Graph



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: "Chapter 7: Process Mining, Data Lineage, and Provenance"](../../chapters/07-process-mining-lineage/index.md).

```text
Type: microsim
**sim-id:** process-discovery-sim
**Library:** p5.js
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Learners can explain how a directly-follows graph is derived from event log data by tracing which activity transitions occur in the log.

Instructional Rationale: A two-panel step-through animation (event log on left, process graph building on right) is appropriate because the Understand objective requires learners to trace a concrete transformation — watching edges appear in the graph as transitions are counted from the log makes the derivation tangible.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 500px. Light gray background.

**Left panel** (40% width): Event Log table showing 10 example events for 3 case IDs:
- Case PO-001: Submit → Review → Approve → Pay
- Case PO-002: Submit → Review → Reject → Revise → Review → Approve → Pay
- Case PO-003: Submit → Approve (skip Review — deviant path)

Each event row highlights in sequence as the animation progresses.

**Right panel** (60% width): Process graph building dynamically.
Nodes (activities): "Submit", "Review", "Approve", "Reject", "Revise", "Pay"
Edges appear one by one as each transition is processed from the event log:
- Submit → Review (weight 2, appears after cases 1 and 2)
- Review → Approve (weight 1)
- Review → Reject (weight 1)
- Reject → Revise (weight 1)
- Revise → Review (weight 1)
- Approve → Pay (weight 2)
- Submit → Approve (weight 1, orange color — deviant direct connection, skip of Review)

Edge thickness scales with weight. Deviant edge (Submit→Approve, skipping Review) rendered in orange.

Controls: "Next Event" button advances one log row at a time, updating the graph. "Auto-play" button animates through all events at 1-second intervals. "Reset" button clears the graph and restarts.

After all events processed, a summary panel appears: "Process discovered from 3 cases, 10 events. 1 conformance deviation detected: Case PO-003 skipped the Review step."

Clicking any graph node highlights all edges from and to that node and shows a count of how many cases passed through this activity.
```

## Related Resources

- [Chapter 7: "Chapter 7: Process Mining, Data Lineage, and Provenance"](../../chapters/07-process-mining-lineage/index.md)
