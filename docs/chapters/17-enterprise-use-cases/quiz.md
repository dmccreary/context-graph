# Quiz: Enterprise Use Cases

Test your understanding of context graph applications across finance, sales, engineering, legal, customer success, procurement, healthcare, and cross-department workflows — including the schemas, agent patterns, and readiness signals that drive each deployment.

---

#### 1. Which three readiness signals does the chapter identify as indicating that a workflow is ready for context graph automation?

<div class="upper-alpha" markdown>
1. High training data, low storage cost, ample compute
2. Open-source license, multi-cloud support, vendor-neutral APIs
3. High headcount in the decision function, a high rate of exceptions to the standard rule, and significant cross-system synthesis required to reach a defensible decision
4. Low decision volume, low exception rate, single-system data
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter names these three readiness signals. The other options describe unrelated criteria or invert the chapter's recommended pattern.

    **Concept Tested:** Cross-Department Use Case

---

#### 2. In the finance revenue reporting exception use case, what is an "ARR definition conflict" trace?

<div class="upper-alpha" markdown>
1. A trace that records when two valid interpretations of the Annual Recurring Revenue definition produce different numbers for the same revenue stream and how the conflict was resolved
2. A vector embedding of revenue documents
3. A schema-drift alert for the revenue field
4. A backup of the AR aging report
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter defines ARR definition conflict traces as exactly this kind of resolution record. The other options describe unrelated artifacts.

    **Concept Tested:** ARR Definition Conflict

---

#### 3. A sales rep is being assigned to a new account that has changed hands three times in the last two years. According to the chapter, which context graph element most directly captures the relationship timeline and lets the new rep avoid restarting from scratch?

<div class="upper-alpha" markdown>
1. The schema registry
2. The differential privacy budget
3. The account history graph — a context graph subgraph representing the full relationship timeline (onboarding, expansion, escalations, renewals, churn-risk events) queryable by any agent or new rep
4. The BM25 sparse index
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter introduces the account history graph specifically for this loss-of-context problem when accounts change hands. The other options are not relationship-history mechanisms.

    **Concept Tested:** Account History Graph

---

#### 4. An on-call engineer is paged for "HighErrorRate-Service-Auth." A context-graph-powered agent retrieves a prior incident (Incident-447) where the same alert was resolved by rolling back to a previous deployment version. What is the chapter's recommended agent workflow next?

<div class="upper-alpha" markdown>
1. Auto-execute the rollback without notification
2. Ignore the precedent and escalate to leadership
3. Discard the precedent because it is from a different week
4. Generate an incident briefing showing the precedent ("Similar to Incident-447: rollback resolved within 12 minutes"), pre-fill the recommended action, route to the on-call engineer for confirmation, and write the decision trace immediately when action is taken
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter describes exactly this workflow: surface the precedent, recommend action with citation, human confirms, write immediately. Auto-executing rollback (A) skips graduated-autonomy guardrails. Ignoring (B) and discarding (C) waste the precedent.

    **Concept Tested:** Production Decision Record

---

#### 5. A regulator submits an audit request for a specific automated credit decision. Why does the chapter argue a context-graph-powered audit agent can respond in minutes rather than days?

<div class="upper-alpha" markdown>
1. Because regulators no longer require any documentation
2. Because the information required for the audit response — input features, model version, policy version in effect at decision time, precedents cited, human review record — is already structured and queryable in the context graph, so it does not need to be reconstructed from logs and emails
3. Because LLMs can fabricate plausible audit responses
4. Because audits are conducted by the AI agent itself with no human review
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter is explicit: the audit information is already structured in the context graph, eliminating manual reconstruction. The other options misstate the rationale.

    **Concept Tested:** Regulatory Audit Automation

---

#### 6. A customer success agent receives a health-score alert on a 75-day-old enterprise account. Which retrieval pattern does the chapter prescribe for generating an escalation recommendation?

<div class="upper-alpha" markdown>
1. Retrieve the account history graph, query the context graph for escalation decisions for similar accounts (matching industry, size, product usage, lifecycle stage), retrieve those decisions' outcomes, and generate a recommendation citing the historical pattern (e.g., "12 similar accounts in the 60-90 day risk window resolved within 45 days in 78% of cases with an executive check-in")
2. Apply a fixed escalation rule regardless of precedent
3. Trigger a random escalation
4. Ignore the alert until the account churns
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter prescribes precisely this pattern. The other options either ignore precedent (B), randomize (C), or fail to act (D).

    **Concept Tested:** Escalation Logic

---

#### 7. According to the chapter, what is the strategic value of the cross-domain decision-trace comparison the diagrams illustrate?

<div class="upper-alpha" markdown>
1. The edge types (DECIDED_BY, APPLIES_TO, GOVERNED_BY, CITES) are universal across domains; the schema is shared, while the entity types and decision types are domain-specific — meaning a single context graph platform can serve every department without inventing a new schema per domain
2. Each domain requires a completely different graph database
3. Cross-domain context graphs are forbidden by regulation
4. Only finance can use a context graph; other domains lack precedents
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter explicitly says the schema is universal and the content is domain-specific. The other options misstate or contradict the chapter.

    **Concept Tested:** Cross-Department Use Case

---

#### 8. A healthcare team is building a clinical decision-support context graph. Why does the chapter recommend using UMLS concept identifiers as the canonical IDs for diagnoses, medications, and procedures?

<div class="upper-alpha" markdown>
1. Because UMLS IDs compress better than text
2. Because they ensure interoperability with any other clinical system that uses UMLS — letting clinical context graphs exchange decisions and precedents with hospitals, payers, and research systems without inventing a new vocabulary
3. Because UMLS is required by GDPR
4. Because UMLS IDs are shorter than internal IDs
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter (referencing Chapter 6) recommends UMLS exactly for the interoperability gain. The other options misstate the rationale.

    **Concept Tested:** Healthcare Workflow Use Case

---

#### 9. An insurance company is evaluating whether to instrument claims decisions with a context graph. Which combination of factors does the chapter cite as making this use case especially compelling?

<div class="upper-alpha" markdown>
1. Strict regulatory requirements and significant litigation risk that make a complete, queryable record of every claims decision (including precedents cited and policy version applied) not just operationally valuable but a legal necessity
2. Cheap storage and no regulatory requirements
3. Low-volume decisions made by a single adjuster
4. No need for precedent because every claim is unique
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter highlights insurance claims as a case where regulatory and litigation context elevates the value of traceability. The other options invert or ignore the chapter's reasoning.

    **Concept Tested:** Insurance Claims Use Case

---

#### 10. A manufacturing quality team handles 30 deviation dispositions per week. Designing the context graph for this use case, which decision node type and required edges most closely match the chapter's worked example?

<div class="upper-alpha" markdown>
1. Decision type `compensation_exception` with edges to Employee and HR Policy
2. Decision type `incident_response` with edges to Service and Deployment
3. Decision type `revenue_exception` with edges to Invoice and GAAP policy
4. Decision type `quality_disposition` with APPLIES_TO → Batch, DECIDED_BY → Quality Engineer, GOVERNED_BY → Quality Management Policy version, CONSULTED → Specification node with actual vs. spec values, CITES → prior dispositions for the same product and deviation type
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter's worked example for manufacturing quality matches this schema exactly. The other options apply schemas from different domains.

    **Concept Tested:** Manufacturing Quality Use Case

---
