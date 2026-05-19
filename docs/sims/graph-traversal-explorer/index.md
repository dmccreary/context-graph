---
title: Graph Traversal Explorer
description: Learners can trace the step-by-step execution of BFS and DFS traversal on a sample enterprise graph and explain why the two algorithms produce different node visit orderings.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Graph Traversal Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: "Chapter 1: Knowledge Graphs and Labeled Property Graphs"](../../chapters/01-knowledge-graphs-lpg/index.md).

```text
Type: microsim
**sim-id:** graph-traversal-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Explain and trace
Learning Objective: Learners can trace the step-by-step execution of BFS and DFS traversal on a sample enterprise graph and explain why the two algorithms produce different node visit orderings.

Instructional Rationale: Step-through with worked examples is appropriate because the Understand/explain objective requires learners to observe concrete visit sequences with real node labels. Continuous animation would prevent prediction and obscure the actual decision logic at each step. Each step should give the learner a moment to predict the next node before the simulation reveals it.

Canvas layout:
- Main area (left ~68%): 12-node enterprise graph showing Employee and Department entities
- Right panel (~32%): Step log showing nodes visited in order, plus current algorithm state (stack contents for DFS, queue contents for BFS)

Graph structure (fixed, readable, enterprise scenario):
Nodes:
- E1: CEO (Employee), E2: VP-Engineering (Employee), E3: VP-Sales (Employee)
- E4: Eng-Lead (Employee), E5: Eng-A (Employee), E6: Eng-B (Employee)
- E7: Sales-Lead (Employee), E8: Sales-A (Employee)
- D1: Engineering (Department), D2: Sales (Department), D3: Executive (Department)
- P1: Project-Alpha (Project)

Edges:
- E2 REPORTS_TO E1, E3 REPORTS_TO E1
- E4 REPORTS_TO E2, E5 REPORTS_TO E4, E6 REPORTS_TO E4
- E7 REPORTS_TO E3, E8 REPORTS_TO E7
- E2 BELONGS_TO D1, E4 BELONGS_TO D1, E5 BELONGS_TO D1, E6 BELONGS_TO D1
- E3 BELONGS_TO D2, E7 BELONGS_TO D2, E8 BELONGS_TO D2
- E1 BELONGS_TO D3
- E4 OWNS P1

Interactive controls:
- Dropdown: Algorithm (BFS or DFS)
- Dropdown: Start Node (any of the 12 nodes, labeled by name)
- Button: "Next Step" — advance one traversal step
- Button: "Run All" — complete traversal with 500ms delay between steps
- Button: "Reset" — return to initial unvisited state

Data visibility requirements:
Stage 0: All nodes gray (unvisited). Right panel: Queue/Stack shows [start node name].
Stage 1: Start node highlighted yellow. Right panel: "Visiting: [label]"; queue/stack updated after dequeue/pop.
Stage N: Each new step: current node turns yellow → indigo (visited) after step completes. Newly discovered unvisited neighbors shown in orange (in-queue/stack). Right panel shows "Visiting: [node name]" and appends to the ordered visit list.
Final: All reachable nodes indigo. Panel shows complete visit order as a numbered list of node labels.

Node visual states:
- Unvisited: gray fill, dark border
- In queue/stack: orange fill
- Currently visiting: yellow fill with subtle pulse border
- Visited: indigo fill, white label text

Hover behavior: Hovering any node shows a tooltip with label (name and type) and list of neighbor names.
Edge hover: Shows edge type (REPORTS_TO / BELONGS_TO / OWNS).

Canvas: Responsive width, 520px height. Right panel fixed 200px.
```

## Related Resources

- [Chapter 1: "Chapter 1: Knowledge Graphs and Labeled Property Graphs"](../../chapters/01-knowledge-graphs-lpg/index.md)
