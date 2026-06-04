# Quiz: Decision Traces — Anatomy and LPG Patterns

Test your understanding of the four layers of a decision trace, the complete LPG node and edge schema, completeness validation, indexing, and the patterns for capturing exception logic and out-of-band approvals.

---

#### 1. The chapter identifies four distinct layers that a decision trace must capture. Which set lists them correctly?

<div class="upper-alpha" markdown>
1. Exception logic, historical precedents, cross-system synthesis, and out-of-band approvals
2. Embedding vectors, hash chains, k-nearest neighbors, and quorum reads
3. Petabytes, terabytes, gigabytes, and megabytes
4. SELECT, INSERT, UPDATE, and DELETE
</div>

??? question "Show Answer"
    The correct answer is **A**. The four layers correspond directly to the four missing layers from Chapter 8 that document retrieval cannot capture. The other options are unrelated technical concepts.

    **Concept Tested:** Decision Trace Anatomy

---

#### 2. What is exception logic in the decision trace anatomy?

<div class="upper-alpha" markdown>
1. Try-catch blocks in the agent's code
2. A list of error messages emitted by the LLM
3. The set of informal rules, thresholds, and judgment calls that govern how the organization handles cases falling outside normal parameters — often undocumented in formal policy
4. The set of regulatory laws that apply to the organization
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter defines exception logic as informal rules and thresholds that experienced practitioners apply to non-standard cases. The other options describe unrelated programming or legal concepts.

    **Concept Tested:** Exception Logic

---

#### 3. Which canonical edge type connects a Decision Trace Node to a prior decision that was consulted as precedent?

<div class="upper-alpha" markdown>
1. CITES
2. APPROVED_BY
3. CONSULTED
4. GOVERNED_BY
</div>

??? question "Show Answer"
    The correct answer is **A**. CITES connects a decision to earlier decisions used as precedents. APPROVED_BY (B) connects to an approving actor. CONSULTED (C) connects to source data values. GOVERNED_BY (D) connects to a policy version.

    **Concept Tested:** Decision Trace Edge Types

---

#### 4. Why does the chapter recommend validating trace completeness at write time rather than at read time?

<div class="upper-alpha" markdown>
1. Because the LLM can fill in missing fields automatically
2. Because read-time validation is forbidden by ISO 11179
3. Because retrieval is faster when validation is skipped
4. Because detecting and remediating incomplete traces is far less costly at write time, before retrieval consumers depend on the data — and an LLM retrieving a trace with missing fields may apply the wrong policy or make unverifiable claims
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter emphasizes that validation at write time prevents downstream misinterpretation. The other options misstate the trade-off.

    **Concept Tested:** Trace Completeness

---

#### 5. Approvals made via email, phone, Slack, or in-person discussion — outside the formal workflow system — are called what in the decision trace schema?

<div class="upper-alpha" markdown>
1. Counterfactual traces
2. Out-of-band approvals
3. Schema drift events
4. Differential privacy queries
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter calls these out-of-band approvals and prescribes capturing them as approval edges with channel, timestamp, and documentary evidence. The other options describe unrelated concepts.

    **Concept Tested:** Out-of-Band Approval

---

#### 6. A retail-finance team is designing the schema for invoice-exception decision traces. Which set of required edges matches the chapter's prescription for a minimally complete trace?

<div class="upper-alpha" markdown>
1. Just one APPROVED_BY edge — everything else is optional
2. SUPERSEDED_BY and OVERTURNED_BY edges on every trace, even active ones
3. DECIDED_BY, APPROVED_BY, APPLIES_TO (to the supplier and PO), GOVERNED_BY (to the specific AP policy version), CONSULTED (to source data), and CITES for any cited prior exceptions
4. Only a CITES edge to one prior decision
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter's worked example for invoice exceptions specifies exactly this set of required edges for completeness. The other options either drop required edges or include edges that should only appear when the corresponding event has occurred.

    **Concept Tested:** Decision Trace Node Schema

---

#### 7. Why does the chapter argue that judgment-call decision traces should be given elevated weight in precedent retrieval?

<div class="upper-alpha" markdown>
1. Because they take less storage than standard traces
2. Because they are always more recent than standard traces
3. Because they capture tacit expertise — the contextual factors a reasonable practitioner might weigh differently — that the organization most needs to preserve and surface when similarly ambiguous cases arise
4. Because they bypass the completeness validation step
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter explains that judgment calls capture the tacit reasoning that should appear prominently to future decision-makers facing similarly ambiguous cases. The other options misstate the rationale.

    **Concept Tested:** Judgment Call

---

#### 8. An LLM agent is auditing whether every pricing exception in the last 12 months was approved by an actor with the required role. Which traversal pattern from the chapter answers this most directly?

<div class="upper-alpha" markdown>
1. Filter Decision Trace Nodes where decision_type='pricing_exception' and timestamp_decision within last 12 months, then for each follow APPROVED_BY to the Actor Node and read `role_at_time` to verify it matches the policy-required role
2. Run a vector similarity search over context summaries and accept the top match
3. Cluster all decision traces by community detection and report the largest community
4. Compute PageRank over all entity nodes and rank approvers by PageRank
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter's traversal logic is exactly this: filter by type and time, follow APPROVED_BY to the actor, and check `role_at_time`. The other options describe unrelated graph operations that do not answer the audit question.

    **Concept Tested:** Approval Chain

---

#### 9. A team observes that a small set of foundational decision traces are cited by many later decisions, propagating their reasoning through the organization. Which pattern is this, and what should an LLM retrieval system do with these high-in-degree nodes?

<div class="upper-alpha" markdown>
1. Schema drift — the retrieval system should reject these nodes
2. Precedent chain pattern — high-in-degree precedent nodes represent the most influential rulings and should be retrieved first when assembling context for similar future cases
3. Counterfactual chain — the retrieval system should never include them
4. Hub-and-spoke architecture — the retrieval system should re-shard the graph
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter names this the precedent chain pattern and prescribes retrieving high-in-degree precedents first for context assembly. The other options misname or misuse unrelated concepts.

    **Concept Tested:** Precedent Chain Pattern

---

#### 10. A team is building a real-time trace recording system. For a human-in-the-loop approval workflow, which design minimizes additional burden on the decision-maker while maximizing trace completeness, according to the chapter?

<div class="upper-alpha" markdown>
1. Email the approver a 30-question survey 48 hours after every decision
2. Auto-fill the trace from system context (logged-in user, entity under review, current policy version, surfaced precedents) and require the approver to provide only the incremental information — outcome, justification text, and acknowledgment of any out-of-band approvals — at the moment of decision
3. Skip trace recording entirely for human decisions and only record automated decisions
4. Have a third-party auditor reconstruct each trace from email archives quarterly
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter's prescription is exactly this design — system-assembled context with minimal incremental input from the human, captured at decision time. The other options either lose context (A, D) or skip capture entirely (C).

    **Concept Tested:** Real-Time Trace Recording

---
