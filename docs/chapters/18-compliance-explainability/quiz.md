# Quiz: Compliance, Explainability, and Audit

Test your understanding of GDPR right to explanation, the EU AI Act, audit trail design, fairness audits, data retention and purge, model cards, governance reports, and AI red teaming for context-graph-powered AI systems.

---

#### 1. What does the GDPR right to explanation require an organization to provide for automated decisions that produce significant effects on individuals?

<div class="upper-alpha" markdown>
1. Meaningful information in human-understandable terms about the logic involved, the significance, and the envisaged consequences — covering what information was used, what logic was applied, and what the individual could do differently
2. A complete dump of the model weights
3. Only a numeric confidence score
4. Nothing — explanations are optional under GDPR
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter is explicit: the explanation must be in human-understandable terms and cover information used, logic applied, and actionable guidance. The other options misstate or contradict the GDPR requirement.

    **Concept Tested:** Right to Explanation

---

#### 2. Why does the chapter argue that explainability by design is legally stronger than post-hoc explainability?

<div class="upper-alpha" markdown>
1. Because post-hoc methods always run faster
2. Because explainability by design records the actual decision process as it happens (inputs, policy version applied, precedents cited, approval chain) producing a first-party original record, while post-hoc methods generate an approximation reconstructed after the fact — courts and regulators treat original records and reconstructed analyses differently
3. Because regulators forbid post-hoc explanations
4. Because explainability by design eliminates the need for any audit trail
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter argues exactly this distinction — original record vs. reconstructed approximation — with the explicit observation that courts treat them differently. The other options misstate the legal landscape.

    **Concept Tested:** Explainability by Design

---

#### 3. The chapter identifies three requirements for a compliant audit trail design in a context graph system. Which set names them correctly?

<div class="upper-alpha" markdown>
1. Encryption at rest, encryption in transit, key rotation
2. Tamper evidence, temporal completeness, and searchability and accessibility
3. Schema-on-read, schema-on-write, schema-free
4. Push, pull, batch
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter names exactly these three requirements and explains how the context graph addresses each. The other options describe unrelated technical properties.

    **Concept Tested:** Audit Trail Design

---

#### 4. Which mechanism does the chapter recommend for high-assurance tamper evidence in a context graph audit trail?

<div class="upper-alpha" markdown>
1. Daily database backups
2. Read-replica synchronization
3. An append-only hash chain — each new record's hash includes the hash of the previous record, so any retroactive modification invalidates all subsequent hashes and is detectable
4. Quarterly schema migration
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter explicitly prescribes a hash chain for high-assurance tamper evidence. Backups (A), replication (B), and migration (D) are operational practices but do not provide cryptographic tamper evidence.

    **Concept Tested:** Audit Log

---

#### 5. The right to erasure (GDPR) may conflict with audit-trail retention obligations (e.g., financial services regulation) for the same record. According to the chapter, what is the appropriate way to resolve this conflict?

<div class="upper-alpha" markdown>
1. Always delete the record because GDPR is paramount
2. Always retain the record because the audit trail is paramount
3. Skip the context graph entirely
4. The context graph should support both operations technically; legal counsel advises on which legal regime takes priority for the specific record, and the policy governance layer applies the resolution
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter is explicit: technical support for both, with legal counsel determining priority. The other options apply a one-size-fits-all rule the chapter rejects.

    **Concept Tested:** Data Purge Policy

---

#### 6. A fairness analyst wants to detect whether a credit-decision agent produces discriminatory outcomes against a protected demographic group. According to the chapter, how does the context graph support this?

<div class="upper-alpha" markdown>
1. Every decision is documented (decision trace), every precedent cited is identifiable (enabling analysis of whether protected groups were disproportionately affected by historical precedents), and every policy version is linkable to the decisions it governed (enabling analysis of whether policy changes improved or worsened fairness metrics)
2. The graph automatically blocks all decisions until they are reviewed
3. The graph removes all protected-class attributes from decision records
4. Fairness audits cannot be performed on context graphs
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter lists exactly these three structural enablers. The other options either misuse the context graph or claim it cannot do what the chapter shows it can.

    **Concept Tested:** Fairness Audit

---

#### 7. An AI system in the EU is classified as high-risk under the EU AI Act. Which combination of context graph capabilities does the chapter highlight as directly addressing the Act's logging-and-monitoring, transparency, and human-oversight requirements?

<div class="upper-alpha" markdown>
1. Decision trace write-back (for post-market monitoring), explicit AI transparency in the UI, and the graduated-autonomy model from Chapter 16 (which keeps human oversight in place at every autonomy level with automatic rollback for anomalous patterns)
2. None — the EU AI Act prohibits context graphs
3. A faster GPU
4. Encryption of model weights
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter explicitly maps these capabilities to the corresponding EU AI Act requirements. The other options misstate the Act or the technical response.

    **Concept Tested:** EU AI Act

---

#### 8. A red team is probing a context-graph-powered AI system. Which of the following is a "precedent gaming" attack the chapter calls out?

<div class="upper-alpha" markdown>
1. Brute-forcing the GraphQL API endpoint
2. Hashing the decision trace IDs
3. Stealing the LLM weights
4. Creating a pattern of low-stakes decision traces that, when later cited together as precedents, appear to justify a high-risk decision that would not otherwise be approved
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter names precedent gaming as exactly this attack: manipulating the precedent base to enable later high-risk approvals. The other options are unrelated security concepts.

    **Concept Tested:** AI Red Teaming

---

#### 9. A team is debating whether their context graph should auto-generate model card content. According to the chapter, which sections can be partially auto-generated and which require human authorship?

<div class="upper-alpha" markdown>
1. Performance metrics across demographic groups (auto-generated from faithfulness scores, decision quality metrics, and fairness audit results drawn from the context graph); intended use and limitations sections require human authorship by the system's developers
2. Everything must be hand-written by lawyers
3. Everything can be auto-generated with no human input
4. Only the title can be auto-generated
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter splits the work exactly this way: data-driven sections auto-generated; authorial sections still human-written. The other options misstate the split.

    **Concept Tested:** Model Card

---

#### 10. A consumer-lending team is designing a context graph to satisfy GDPR Article 22 right-to-explanation requests for credit decisions. Which traversal pattern does the chapter prescribe for generating a complete, legally compliant explanation for a single denial?

<div class="upper-alpha" markdown>
1. Start from the Decision Trace for this customer's credit decision → retrieve CONSULTED source-data nodes (feature values, freshness, source) → retrieve the GOVERNED_BY policy version (the rules and thresholds applied) → retrieve CITES precedents (similar cases with outcomes) → serialize into a structured human-readable explanation including factors considered, the policy basis, and actionable guidance
2. Return only the model's raw probability output
3. Email the customer the entire decision trace database
4. Reply that the model is proprietary and decline to explain
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter's worked example specifies exactly this traversal and serialization for GDPR right-to-explanation responses. The other options either fail to comply, leak sensitive data, or violate the right outright.

    **Concept Tested:** GDPR Explainability Requirement

---
