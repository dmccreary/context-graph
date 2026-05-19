---
title: "Chapter 16: AI Agent Architecture"
description: "Agent loop design, planning, memory, tool use, multi-agent orchestration, graduated autonomy, human-in-the-loop write-back, and the ReAct/Plan-and-Execute/Reflection agent patterns."
generated_by: claude skill chapter-content-generator
date: 2026-05-18 17:25:00
version: 0.08
---

# Chapter 16: AI Agent Architecture

## Summary

Covers agent loop design, planning, memory, tool use, multi-agent orchestration, graduated autonomy, human-in-the-loop, write-back, and the ReAct/Plan-and-Execute/Reflection agent patterns.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. AI Agent Loop
2. Agent Planning
3. Agent Memory Architecture
4. Tool Use
5. Agent Orchestration
6. Multi-Agent System
7. Agent Write-Back
8. Agent Read Pattern
9. Graduated Autonomy
10. Human-in-the-Loop
11. Agent Feedback Loop
12. Agent Trace
13. Agent Decision Log
14. Agent Error Recovery
15. Agent Retry Pattern
16. Agent Rate Limiting
17. Agent Authentication
18. Agent Authorization
19. Agent Sandboxing
20. ReAct Pattern
21. Plan-and-Execute Pattern
22. Reflection Pattern
23. Agent Evaluation
24. Agent Benchmarking
25. Agent Context Budget

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: What a Context Graph Is](../09-context-graph-definition/index.md)
- [Chapter 10: LLM and AI Foundations](../10-llm-ai-foundations/index.md)
- [Chapter 14: Integrating LLMs with Context Graphs](../14-llm-integration/index.md)
- [Chapter 15: Building and Deploying Context Graph Systems](../15-building-deploying/index.md)

---

!!! mascot-welcome "Agents that learn from their own history."
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waves welcome">
    Welcome to Chapter 16! Context graphs give AI agents something most agents lack: long-term memory that accumulates with every decision. This chapter shows how to design agents that read from that memory, write back to it, and become more capable over time through a graduated autonomy model. Let's trace the why!

## Introduction

An AI agent without a context graph is like a new employee without access to the company's institutional knowledge — technically capable, but operating without the organizational context that experienced practitioners take for granted. With each decision, such an agent makes no contribution to the organization's collective intelligence; its reasoning evaporates the moment the session ends.

An AI agent integrated with a context graph is fundamentally different. Before each decision, it reads from the organization's accumulated decision history. After each decision, it writes back — contributing a new precedent to the record. Over time, the agent becomes more effective because the context it draws on grows richer with each cycle. And critically, the organization's knowledge grows too: the agent's decisions become part of the precedent base that future agents and human practitioners will consult.

This chapter covers the architectural patterns that make this learning loop work: how agents are designed to operate in cycles, how they read and write to context graphs, how multiple agents collaborate in orchestrated workflows, and how graduated autonomy models allow organizations to trust agents with progressively more consequential actions as the precedent base deepens.

## The AI Agent Loop

The **AI agent loop** is the fundamental cycle of an autonomous agent: observe, plan, act, record, repeat. Each pass through the loop is a decision step. The loop runs until the agent's task is complete, an error condition is reached, or a human-in-the-loop checkpoint requires approval before proceeding.

Before we walk through each phase, it is important to understand what makes an agent different from a simple LLM API call. An LLM API call is stateless: it receives a prompt, generates a response, and terminates. An agent is stateful: it maintains a working context across multiple LLM calls, executes real-world actions (writing to databases, calling APIs, sending notifications), and persists the results of its actions into the context graph so that future agents (and future cycles of the same agent) can benefit from them.

**Phase 1: Observe.** The agent receives a task specification (from a human, from an orchestration system, or from a triggering event in an operational system). It queries the context graph for relevant decision history and precedents using the hybrid retrieval pipeline from Chapter 14. It also queries any other tool sources needed for the current task (the enterprise knowledge graph for entity data, the metadata registry for field definitions, operational systems for current state). The outputs of this phase are: a structured task context assembled from graph retrievals and tool calls.

**Phase 2: Plan.** The agent uses the assembled context to construct a plan for completing the task. Planning involves: identifying what information is still needed, what constraints apply (from retrieved policy versions), what the most relevant precedents suggest, and what actions are available. The plan is expressed as a sequence of steps, each of which may involve additional tool calls, additional retrieval queries, or a decision point that produces a recommendation or action.

**Phase 3: Act.** The agent executes the plan — making tool calls, generating outputs, and producing decisions. For each decision point in the plan, the agent generates a structured decision recommendation backed by specific precedent citations from the retrieved context.

**Phase 4: Record.** This is the phase that most agent implementations omit — and the phase that is most critical for context graph integration. After acting, the agent writes a decision trace to the context graph: what decision was made, by whom (the agent's identity), at what time, based on what context (links to the retrieved precedents), under what policy, and with what confidence level. This write-back is the mechanism by which the agent contributes to the organization's growing institutional memory.

**Phase 5: Repeat or terminate.** If the task is not complete, the loop repeats from Phase 1 with the updated context (the new decision trace is now visible to the next retrieval query, enabling the next loop cycle to build on this one). If the task is complete or an escalation condition is met, the agent terminates and returns its final output.

## Three Agent Reasoning Patterns

The **AI agent loop** is the outer structure. The reasoning pattern is the inner logic — how the agent moves from context to plan to action within each loop cycle. Three patterns have proven effective for enterprise decision support tasks.

### The ReAct Pattern

**ReAct** (Reasoning + Acting) interleaves reasoning steps and action steps in the agent's output. The agent explicitly records its reasoning before each action, and the reasoning becomes part of the agent trace. A ReAct agent processing a pricing exception request might produce:

```
Thought: I need to find the most relevant pricing exception precedents for this customer.
Action: retrieve_context(entity_id="ENT-00441872", decision_type="pricing_exception", recency=24mo)
Observation: Found 8 precedents. Top precedent DT-4482 (Q4-2025) approved 15% discount for same customer under Pricing Policy v3.2.
Thought: The precedent supports approval. But I should check whether the policy has changed since then.
Action: get_policy_version(policy_id="PRICING", as_of="today")
Observation: Current version is v3.2 (unchanged). This precedent is directly applicable.
Thought: Strong precedent, unchanged policy. Recommend approval with conditions from precedent DT-4482.
Action: write_decision_trace(type="pricing_exception", recommendation="approve", cited_precedents=["DT-4482"], policy_version="PRICING-v3.2")
```

ReAct is effective because the explicit reasoning chain makes the agent's logic transparent, auditable, and debuggable. The agent trace (the full sequence of thoughts, actions, and observations) is a natural decision trace candidate — it can be written to the context graph as both the agent decision trace and the reasoning record.

### The Plan-and-Execute Pattern

**Plan-and-Execute** separates the planning phase from the execution phase. First, the agent generates a complete multi-step plan using the retrieved context. Then, it executes the plan step by step, with each step potentially triggering new tool calls and observations that may require the plan to be revised.

Plan-and-Execute is more efficient than ReAct for complex multi-step tasks because it avoids the overhead of deciding what to do next after each step — the plan is already determined. It is more appropriate for tasks with long, well-defined execution sequences (a regulatory compliance review that must check 12 specific criteria in a specified order) than for exploratory tasks where the next step depends heavily on what was just discovered.

### The Reflection Pattern

**Reflection** adds a self-evaluation step after the initial reasoning and action. The agent generates an initial recommendation, then reviews its own output against the retrieved context (a self-faithfulness check), identifies potential gaps or contradictions, and revises its recommendation before writing the final decision trace. This pattern significantly reduces hallucination and overconfident recommendations at the cost of additional LLM calls.

Reflection is most valuable for high-stakes decisions where the cost of an incorrect recommendation is high. For routine decisions with strong precedent coverage, the overhead may not be justified.

## Agent Memory Architecture

An **agent memory architecture** defines how the agent manages information across the multiple phases of its loop and across multiple loop cycles. For context-graph-integrated agents, memory is organized into three tiers.

**In-context memory** (working memory): the information currently in the agent's context window. This includes the task specification, retrieved decision traces, tool call results, and the conversation history of the current loop cycle. In-context memory is fast to access but limited in size (the context window budget from Chapter 14).

**Session memory**: information persisted across multiple loop cycles within a single agent session, but not across sessions. Implemented as a session state object stored outside the context window (in the application layer) and summarized/injected at the start of each new loop cycle. Useful for long-running tasks that span many loop cycles.

**Long-term memory** (the context graph): the persistent organizational memory that is shared across all agents, all sessions, and all time. The context graph is the agent's long-term memory in exactly the same way that it is the organization's institutional memory — it accumulates, is queryable, and grows richer with each new decision trace. An agent's write-back to the context graph is its contribution to long-term memory.

The **agent read pattern** is the retrieval query sequence that an agent executes at the start of each loop cycle to populate its in-context memory from the long-term memory (context graph). The read pattern must be: targeted (retrieve only what is relevant to the current task), fresh (check freshness scores before including any context), and budget-aware (respect the context window budget, compressing or pruning as needed).

The **agent write-back** is the write to the context graph that records the agent's decision trace at the end of each successful loop cycle. Write-back must be: atomic (the trace node and all its required edges are written in a single transaction), validated (schema constraints are checked before the write succeeds), and timely (written before the session ends, so the trace is available to future agents).

!!! mascot-thinking "Write-back is what makes agents a collective intelligence."
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Nexus thinking">
    Here is the key insight about agent write-back: each individual agent's write-back makes every subsequent agent slightly more effective. If agent A writes a decision trace that becomes a high-value precedent, agent B can retrieve it in its next loop cycle and make a better decision. Agent B's trace, if it extends or refines agent A's reasoning, improves the precedent for agent C. Over time, the collective intelligence of the agent population grows through the shared long-term memory of the context graph. This is the mechanism by which the accumulation dynamic (from Chapter 12) compounds.

#### Diagram: Agent Memory Architecture and Write-Back Loop

<details markdown="1">
<summary>Interactive vis-network diagram showing the three-tier agent memory architecture and the write-back loop that connects agent decisions to the shared context graph</summary>
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
</details>

## Multi-Agent Systems and Orchestration

Enterprise decision workflows often require more than one agent. A complex compliance review might involve: a data extraction agent (gathering relevant records from multiple systems), a policy analysis agent (interpreting which policies apply), a precedent research agent (finding relevant historical decisions), a recommendation synthesis agent (combining the above into a recommendation), and a quality validation agent (checking the recommendation for faithfulness and completeness). Each agent is specialized; together they form a **multi-agent system**.

**Agent orchestration** is the coordination layer that manages multi-agent systems: deciding which agent to invoke when, passing context between agents, handling failures, and assembling final outputs from multiple agent contributions. An orchestrator is itself an LLM-powered agent or a rule-based system, depending on the predictability of the workflow.

For context graph integration, multi-agent systems introduce a coordination opportunity: the context graph serves as the shared blackboard. Agent A writes its intermediate findings as a specialized trace node; Agent B reads that node as part of its own context retrieval. The context graph is not just the long-term memory for the final decision — it is the shared working memory for the entire multi-agent workflow.

The **agent context budget** in a multi-agent system must be managed at the orchestration level. If each of five agents uses 4,000 tokens of retrieved context, and they are operating sequentially, the total token cost per workflow is 5 × (4,000 context + ~500 output) = ~22,500 tokens per workflow. At scale (1,000 workflows per day), this drives significant LLM API costs. The orchestrator should assign each agent the minimum context necessary for its specific subtask — a data extraction agent does not need the full precedent chain; a recommendation synthesis agent does.

## Graduated Autonomy

**Graduated autonomy** is the model for expanding an AI agent's decision-making authority over time as its decision quality is validated. Rather than deploying an agent with full autonomy immediately (high risk) or with no autonomy at all (no value), graduated autonomy starts at the lowest useful autonomy level and increases it as the context graph accumulates evidence of decision quality.

Autonomy levels for a pricing exception agent might look like:

- **Level 1: Draft only.** The agent generates a draft recommendation that is always reviewed by a human before any action is taken. The agent writes a trace for its draft recommendation. Human reviewers validate or override.
- **Level 2: Auto-approve with human review.** For decisions that match a high-confidence pattern (strongly supported by recent precedents, within well-defined parameter ranges), the agent approves automatically but notifies a human reviewer who has 24 hours to override.
- **Level 3: Auto-approve for routine decisions.** For the subset of decisions that are clearly within established policy with strong precedent support, the agent approves without notification. Edge cases, flagged confidence levels, and policy boundary cases still escalate to Level 2.
- **Level 4: Full autonomy within policy.** The agent handles all in-policy decisions automatically, escalating only when the case falls outside any established precedent or when the applicable policy is ambiguous.

The transition between levels is triggered by measured decision quality metrics: if the agent's Level 1 recommendations are validated by human reviewers at a rate above a threshold (say, 95%) for at least N decisions, it is promoted to Level 2. If its Level 2 auto-approvals are reversed by human reviewers at a rate below a threshold (say, 2%) for at least M decisions, it is promoted to Level 3.

The context graph is what makes this progression possible. The precision with which the agent can draw on relevant precedents determines its reliability on novel cases. As the precedent base grows and the agent's retrieval quality improves, its reliability on edge cases increases — justifying the expansion of autonomy.

**Human-in-the-loop** is the mechanism by which human judgment is retained at each autonomy level. At Level 1, every output is reviewed. At Level 2, auto-approvals are notified and reversible. At Level 3, escalation paths remain open. At Level 4, the agent's decisions are continuously monitored and any anomalous pattern triggers an immediate autonomy rollback to Level 2 pending investigation.

The **agent feedback loop** is the continuous improvement cycle: agent decisions are monitored, outcomes are tracked, quality metrics are computed, and autonomy levels are adjusted (up or down) based on measured performance. This feedback loop must be explicit and automated — manual monitoring at scale is not feasible.

#### Diagram: Graduated Autonomy Model

<details markdown="1">
<summary>Interactive vis-network diagram showing the four autonomy levels, the transition criteria between them, and the role of the context graph in enabling each transition</summary>
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
</details>

## Agent Security: Authentication, Authorization, and Sandboxing

AI agents that write to enterprise systems — including the context graph — must operate under the same security model as human users. An agent that can write arbitrary data to the context graph can corrupt the organization's institutional memory; an agent that can execute arbitrary tool calls can take actions with real business consequences.

**Agent authentication** establishes the agent's identity to the systems it interacts with. Each agent instance should have a unique service identity (a service account or OAuth client) that is authenticated using the same standards as human users (client credentials, mutual TLS). The agent's identity is recorded in every decision trace it writes, providing a clear audit trail of which agent made which decision.

**Agent authorization** restricts what actions an agent can take based on its identity and role. A pricing exception recommendation agent should be authorized to read the context graph and write pricing exception decision traces — but not to write compliance audit traces, modify entity records, or call external systems. Authorization is enforced by the context graph API (which checks the calling agent's authorization before processing write requests) and by the orchestration layer (which restricts which tools an agent is allowed to call).

**Agent sandboxing** isolates agent execution from the production environment during testing and evaluation. A sandboxed agent can call tool definitions that behave identically to production tools but operate against test fixtures rather than live data. Sandboxing enables: safe testing of new agent versions before production deployment, reproducible benchmarking (agents can be tested against the same fixed test cases), and safe evaluation of new autonomy level promotions (the agent is tested at the proposed higher autonomy level against historical cases before being promoted).

**Agent rate limiting** prevents runaway agent loops (infinite loops, excessive tool calls, accidental fan-out amplification) from consuming excessive resources. Rate limits are applied at: the number of LLM calls per minute per agent instance, the number of write operations per minute per agent identity, and the number of external API calls per minute. Rate limit violations cause the agent loop to pause and escalate to the orchestrator rather than terminating abruptly.

**Agent error recovery** and the **agent retry pattern** handle transient failures in the agent loop. Tool calls can fail for many reasons: API timeouts, authentication token expiration, rate limit hits, transient network errors. A well-designed agent retries failed tool calls with exponential backoff and jitter, distinguishes transient errors (retryable) from permanent errors (escalate to human), and records the failure as part of the agent trace so that the failure mode is visible in the context graph.

## Agent Evaluation and Benchmarking

**Agent evaluation** measures the quality of an agent's decisions against a ground truth set of historical cases. For a pricing exception agent, evaluation might use: 500 historical pricing exception cases where the correct decision (approved vs. denied, and the reasoning) is known from the historical record. The agent is run against each case, its recommendation is compared to the historical ground truth, and accuracy, precision, recall, and faithfulness scores are computed.

**Agent benchmarking** compares agent versions or configurations against a standardized benchmark suite: fixed test cases with known correct answers, measured in a sandboxed environment with fixed context graph state. Benchmarking enables: comparison of different agent architectures (ReAct vs. Plan-and-Execute for the same task), measurement of the impact of context graph depth on agent quality (more precedents → better recommendations?), and regression detection when agent code changes.

For context-graph-powered agents, a key benchmarking dimension is **context sensitivity**: how much does agent decision quality improve as more relevant precedents are available? An agent that shows large quality improvements from a 100-precedent context graph to a 1,000-precedent context graph has high context sensitivity — meaning the context graph's accumulation dynamic will drive significant quality improvement over time. An agent with low context sensitivity may need different design approaches.

## Summary and Key Takeaways

AI agent architecture with context graphs creates a self-improving system: agents read organizational memory, make better decisions, write those decisions back as new precedents, and the shared memory grows richer with each cycle. Graduated autonomy enables organizations to expand agent authority safely as decision quality is validated by the growing precedent base.

By the end of this chapter, you should be able to:

- Describe the five phases of the **AI agent loop** and explain the role of each phase for context graph integration
- Explain the **ReAct**, **Plan-and-Execute**, and **Reflection** reasoning patterns and give an enterprise use case for each
- Describe the three tiers of **agent memory architecture** (in-context, session, long-term) and explain how agent write-back contributes to long-term memory
- Explain **multi-agent orchestration** and describe how the context graph serves as a shared blackboard in multi-agent workflows
- Describe the four levels of **graduated autonomy** and explain what transition criteria must be met before each promotion
- Explain the role of **agent authentication**, **authorization**, and **sandboxing** in enterprise agent deployment
- Describe **agent evaluation** and **benchmarking** and explain the significance of the context sensitivity metric

??? question "Quick Check"
    An agent processing a contract renewal exception has completed its ReAct loop and produced a recommendation. Describe what information should be included in the agent write-back decision trace, and explain why writing the trace before session termination (rather than at the end of the day in a batch process) is critical for the context graph's effectiveness.

    *(Answer: The write-back trace should include: agent identity (service account ID and version), task specification (contract renewal exception for entity ENT-XXXXX), the recommendation (approve/deny with rationale), the specific precedent decision trace IDs that were cited in the recommendation, the policy version that governed the recommendation, the confidence level, the loop cycle count, and a flag if any human review was invoked. Writing before session termination is critical because: the trace is immediately available to subsequent agents processing related requests (e.g., a second agent processing a related exception from the same counterparty can see this decision in its retrieval); if the session terminates abnormally, a batch write would miss the trace entirely; and real-time freshness is required for any autonomy-level escalation logic that depends on seeing recent decisions from the same agent.)*

!!! mascot-celebration "Chapter 16: Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    The agent architecture is complete. You now have the full picture: context graphs as long-term memory, agents as the readers and writers of that memory, and graduated autonomy as the trust-building mechanism. Chapter 17 brings this to life with specific enterprise use cases — finance, sales, engineering, legal, and customer success — showing exactly what context graph deployments look like in each domain. Let's trace the why!
