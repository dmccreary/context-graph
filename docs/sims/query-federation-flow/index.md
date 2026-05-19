---
title: Query Federation Flow
description: Learners can trace a federated query from the user interface through the federation engine to multiple source systems and back, explaining what happens at each step.
status: implemented
library: p5.js
bloom_level: Understand (L2)
---

# Query Federation Flow



<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: "Chapter 2: Semantic Layers for Data Lakes"](../../chapters/02-semantic-layers/index.md).

```text
Type: workflow
**sim-id:** query-federation-flow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Explain and trace
Learning Objective: Learners can trace a federated query from the user interface through the federation engine to multiple source systems and back, explaining what happens at each step.

Instructional Rationale: Step-through workflow is appropriate because the Understand objective requires learners to follow a concrete query through the system. Seeing each sub-query dispatched and each result returned makes the mechanics tangible.

Layout: Vertical flow with five levels:
Level 1 (top): User/LLM — shows a business question: "What is the total approved budget for open headcount requests in Engineering?"
Level 2: Federation Engine — shows the query being parsed and decomposed into three sub-queries
Level 3: Three source boxes side by side: "HR System (headcount requests)", "Finance System (approved budgets)", "Org Chart (Engineering dept tree)"
Level 4: Results boxes — each source returns its partial result
Level 5 (bottom): Joined result — the federation engine assembles the final answer

Arrows connect each level with labeled edges:
- Level 1→2: "Submit business query"
- Level 2→3: Three arrows labeled "Sub-query 1 (SQL)", "Sub-query 2 (REST API)", "Sub-query 3 (Graph traverse)"
- Level 3→4: "Partial results"
- Level 4→5: "Merge + join on employee_id"

Step controls:
- "Next Step" button advances through 5 stages, highlighting the active level
- "Run All" button animates through all stages at 600ms per step
- "Reset" returns to initial state

Each source box shows the actual sub-query dispatched when that stage is active.
Hover any arrow: tooltip explains the data format returned at that step (JSON, SQL result set, graph path list).

Canvas: Responsive width, 500px height.
Color palette: Indigo for user/result levels, orange for source systems, teal for federation engine.
```

## Related Resources

- [Chapter 2: "Chapter 2: Semantic Layers for Data Lakes"](../../chapters/02-semantic-layers/index.md)
