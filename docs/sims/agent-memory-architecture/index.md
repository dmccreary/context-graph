---
title: Agent Memory Architecture and Write-Back Loop
description: Learners can explain how the three tiers of agent memory (in-context, session, long-term) relate to each other and how agent write-back connects the agent's decisions to the shared organizational memory.
status: implemented
library: vis-network
bloom_level: Understand (L2)
---

# Agent Memory Architecture and Write-Back Loop



<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: "Chapter 16: AI Agent Architecture"](../../chapters/16-ai-agent-architecture/index.md).

```text
Type: graph-model
**sim-id:** agent-memory-architecture
**Library:** vis-network
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: explain
Learning Objective: Learners can explain how the three tiers of agent memory (in-context, session, long-term) relate to each other and how agent write-back connects the agent's decisions to the shared organizational memory.

Instructional Rationale: A hierarchical vis-network diagram with labeled data flows is appropriate for the Understand objective — learners trace information flowing in (read pattern) and out (write-back) across the three memory tiers, building a mental model of the memory architecture.

Canvas: responsive width, 520px height. White background.

Layout: Three horizontal bands stacked top-to-bottom, separated by labeled dividers.

**Top band — In-Context Memory:**
Nodes: "Task Specification" (orange, small box), "Retrieved Traces" (indigo, box), "Tool Results" (teal, box), "Loop History" (steel blue, box). All inside a labeled band "In-Context (Working Memory, ~8K tokens, ephemeral)".

**Middle band — Session Memory:**
Node: "Session State Object" (gold, box). Inside a labeled band "Session Memory (persisted across loop cycles, summarized at loop start)".

**Bottom band — Long-Term Memory (Context Graph):**
Nodes: "Decision Trace Nodes" (indigo, ellipse, large), "Entity Nodes" (teal, ellipse), "Policy Versions" (steel blue, box), "Precedent Links" (orange, dashed edges between decision nodes). Inside a labeled band "Long-Term Memory (shared, persistent, queryable by all agents)".

**Data flow edges:**
- Context Graph → In-Context Memory: orange arrow, label "Agent Read Pattern (retrieval queries)"
- Session State → In-Context Memory: gold arrow, label "Session summary injected at loop start"
- In-Context Memory → Session State: gold dashed arrow, label "Updated after each loop cycle"
- In-Context Memory → Context Graph: large indigo arrow, label "Agent Write-Back (decision trace)" — this arrow is highlighted prominently

Click on Agent Write-Back arrow: "**Agent Write-Back** — the most important data flow. After each decision, the agent writes a complete decision trace to the context graph: the decision, the actor (agent identity), the retrieved precedents cited, the policy version, and the reasoning summary. This trace immediately becomes available to all future agents and human queries."
Click on Agent Read Pattern arrow: "**Agent Read Pattern** — the retrieval query sequence that populates the agent's working memory at the start of each loop cycle. Uses hybrid retrieval (graph traversal + vector search) to find the most relevant decision history and precedents for the current task."
Click on each memory tier band: shows definition, capacity, and lifecycle (ephemeral vs. persistent).
```

## Related Resources

- [Chapter 16: "Chapter 16: AI Agent Architecture"](../../chapters/16-ai-agent-architecture/index.md)
