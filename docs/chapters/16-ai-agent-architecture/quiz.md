# Quiz: AI Agent Architecture

Test your understanding of agent loops, ReAct/Plan-and-Execute/Reflection patterns, agent memory tiers, multi-agent orchestration, graduated autonomy, agent security, and the write-back loop that makes context-graph-powered agents a collective intelligence.

---

#### 1. What are the five phases of the AI agent loop the chapter describes?

<div class="upper-alpha" markdown>
1. Tokenize, embed, generate, decode, terminate
2. Authenticate, authorize, audit, archive, alert
3. Observe, plan, act, record, repeat or terminate
4. Read, parse, optimize, execute, commit
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter names exactly these five phases. The other options describe unrelated technical sequences.

    **Concept Tested:** AI Agent Loop

---

#### 2. Which agent reasoning pattern interleaves explicit "Thought / Action / Observation" steps, producing a transparent, auditable reasoning chain that doubles as a natural decision-trace candidate?

<div class="upper-alpha" markdown>
1. Plan-and-Execute
2. ReAct (Reasoning + Acting)
3. Reflection
4. BM25 traversal
</div>

??? question "Show Answer"
    The correct answer is **B**. ReAct is the pattern the chapter describes as interleaving reasoning and action. Plan-and-Execute (A) separates planning from execution. Reflection (C) adds a self-evaluation step. BM25 (D) is a retrieval algorithm.

    **Concept Tested:** ReAct Pattern

---

#### 3. Which agent reasoning pattern is most appropriate for tasks with long, well-defined execution sequences — like a regulatory compliance review that must check 12 specific criteria in a specified order?

<div class="upper-alpha" markdown>
1. Plan-and-Execute, because separating planning from execution avoids the overhead of deciding what to do after each step when the plan is already determined
2. ReAct, because every step needs new reasoning
3. Reflection alone, because self-evaluation replaces planning
4. Random sampling
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter cites exactly this case as the natural fit for Plan-and-Execute. ReAct (B) is better for exploratory tasks. Reflection alone (C) is not a complete pattern. Random sampling (D) is not a pattern.

    **Concept Tested:** Plan-and-Execute Pattern

---

#### 4. The chapter describes a three-tier agent memory architecture. Which set names the tiers correctly?

<div class="upper-alpha" markdown>
1. L1 cache, L2 cache, main memory
2. RAM, SSD, HDD
3. In-context (working) memory, session memory, long-term memory (the context graph)
4. Hot, warm, cold storage tiers
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter names exactly these three tiers and explains how write-back to the context graph is the agent's contribution to long-term memory. The other options describe unrelated hardware or storage hierarchies.

    **Concept Tested:** Agent Memory Architecture

---

#### 5. Why does the chapter argue that agent write-back is what makes agents a "collective intelligence"?

<div class="upper-alpha" markdown>
1. Because each agent's write-back makes every subsequent agent slightly more effective — agent A's trace becomes a precedent that agent B can retrieve and build on, and so on, so the shared long-term memory grows richer with each cycle and the accumulation dynamic compounds across the whole agent population
2. Because write-back enables agents to share weights with each other
3. Because write-back trains the LLM at runtime
4. Because write-back replaces the need for any agent reasoning
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter's insight is exactly this compounding cycle. The other options misstate the mechanism — write-back does not modify model weights and does not eliminate reasoning.

    **Concept Tested:** Agent Write-Back

---

#### 6. An agent has just completed a pricing exception ReAct loop. According to the chapter, what should the write-back trace include, and why must it be written before session termination rather than in a nightly batch?

<div class="upper-alpha" markdown>
1. Just a single OK / FAIL flag, written whenever convenient
2. Agent identity, task spec, recommendation, cited precedent IDs, policy version, confidence level, loop cycle count, and human-review flag — written before session end so subsequent agents see it immediately, abnormal terminations do not lose the trace, and real-time autonomy-escalation logic depends on it
3. Only the final natural-language response
4. Nothing — write-back is optional
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter's worked answer specifies exactly these fields and the three reasons real-time write is critical. The other options either lose information or defer write-back inappropriately.

    **Concept Tested:** Agent Trace

---

#### 7. A pricing-exception agent has been operating at Level 1 (Draft Only) for 200 decisions with a 97% human-validation rate. What promotion does the chapter's graduated-autonomy model justify, and what is the rollback condition that would reverse it?

<div class="upper-alpha" markdown>
1. Stay at Level 1 forever; promotion is never warranted
2. Jump directly to Level 4 (Full Autonomy)
3. Promote to Level 2 (Auto-Approve with Human Review) — the validation-rate threshold (≥95% over 200+ decisions) is met; a reversal-rate spike above 5% in any 7-day window would trigger rollback to Level 1
4. Promote to Level 3 because validation is well above 95%
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter's transition criteria are explicit: L1→L2 requires ≥95% validation over 200+ decisions, and the rollback condition is a reversal-rate spike >5%. The other options either skip levels (B, D) or refuse the model's logic (A).

    **Concept Tested:** Graduated Autonomy

---

#### 8. In a multi-agent workflow (data extraction, policy analysis, precedent research, recommendation synthesis, quality validation), the context graph serves what coordination role?

<div class="upper-alpha" markdown>
1. It is bypassed in multi-agent workflows
2. It replaces the orchestrator entirely
3. It re-runs each agent automatically
4. It serves as the shared blackboard — agent A writes its intermediate findings as a specialized trace node; agent B reads that node as part of its own context retrieval; the context graph is both the long-term memory for the final decision and the shared working memory for the workflow
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter explicitly calls the context graph a shared blackboard for multi-agent coordination. The other options misstate the role.

    **Concept Tested:** Multi-Agent System

---

#### 9. Why does the chapter prescribe sandboxing for new agent versions and for new autonomy-level promotions?

<div class="upper-alpha" markdown>
1. Because production tools are too slow
2. Because sandboxing is required by ISO 11179
3. Because sandboxed agents call tool definitions that behave identically to production tools but operate against test fixtures, enabling safe testing of new agent versions, reproducible benchmarking against fixed cases, and safe evaluation of proposed autonomy promotions against historical cases before going live
4. Because sandboxing eliminates the need for authentication
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter lists exactly these three benefits of sandboxing. The other options misstate the rationale.

    **Concept Tested:** Agent Sandboxing

---

#### 10. A new agent architecture is being benchmarked. Which dimension, specific to context-graph-powered agents, measures how much the agent's decision quality improves as the precedent base grows?

<div class="upper-alpha" markdown>
1. Token throughput per second
2. Top-P sampling fraction
3. Network egress per query
4. Context sensitivity — how much agent decision quality improves as more relevant precedents are available; an agent showing large gains from 100 to 1,000 precedents has high context sensitivity, meaning the accumulation dynamic will drive significant quality improvement over time
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter highlights context sensitivity as the distinguishing benchmark dimension for context-graph-powered agents. The other options are not benchmark metrics described in the chapter.

    **Concept Tested:** Agent Benchmarking

---
