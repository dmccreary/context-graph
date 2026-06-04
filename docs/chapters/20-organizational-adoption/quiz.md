# Quiz: Organizational Adoption and Governance

Test your understanding of first-workflow selection, change management, stakeholder alignment, pilot design, ROI measurement, user-trust building, knowledge transfer, and the adoption-roadmap and Center-of-Excellence patterns that drive durable context graph adoption.

---

#### 1. Which three criteria does the chapter give for First Workflow Selection?

<div class="upper-alpha" markdown>
1. Latency, throughput, durability
2. Open-source, commercial, hybrid
3. Visibility (outcome visible to budget owners), bounded scope (5-15 participants, repeats at least weekly, clear start/end), and low switching cost (minimal change to how participants currently get information)
4. Cloud-native, mobile-first, API-driven
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter names exactly these three criteria. The other options describe unrelated technical or product properties.

    **Concept Tested:** First Workflow Selection

---

#### 2. The chapter offers a counterintuitive change-management lever: increase friction in the old workflow at the same time you decrease friction in the new one. Why is this effective?

<div class="upper-alpha" markdown>
1. Because it creates a clear directional incentive — reducing friction only in the new workflow leaves users indifferent between old and new, while making the old workflow slightly harder (archiving old channels, stricter retention) pushes them toward the new one
2. Because graph databases require old data to be deleted
3. Because the LLM cannot read old email archives
4. Because differential privacy requires it
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter explicitly describes this directional-incentive logic. The other options are technically wrong or unrelated.

    **Concept Tested:** Change Management

---

#### 3. According to the chapter, which four stakeholder groups must be aligned for a context graph deployment to succeed?

<div class="upper-alpha" markdown>
1. Marketing, sales, support, success
2. Frontend, backend, infrastructure, devops
3. Investors, board, analysts, press
4. Business sponsors (ROI), IT and security (risk), legal and compliance (audit defensibility), and end users (workflow impact)
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter names exactly these four groups along with each group's primary concern. The other options name different organizational groupings.

    **Concept Tested:** Stakeholder Alignment

---

#### 4. The chapter prescribes a minimum and maximum pilot duration. Which range and which rationale match the chapter?

<div class="upper-alpha" markdown>
1. 8-16 weeks — shorter pilots do not accumulate enough decision traces to demonstrate precedent retrieval value; longer pilots lose momentum and make it harder to maintain executive sponsorship
2. 1-2 weeks, to keep things agile
3. 6-12 months, to allow full annual seasonality
4. Indefinite, to avoid premature commitment
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter cites 8-16 weeks with exactly this rationale. The other options either fail to accumulate traces (B) or lose momentum (C, D).

    **Concept Tested:** Pilot Program Design

---

#### 5. Which success criteria characteristic ensures that improvement in the target workflow can be reliably attributed to the context graph rather than to some confounding change?

<div class="upper-alpha" markdown>
1. Measurable
2. Attributable — designed to avoid confounds; the cleanest approach is a control group continuing the old workflow, with careful baseline documentation and period-over-period comparison as a fallback
3. Time-bound
4. Marketable
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter lists three success-criteria characteristics — measurable, attributable, time-bound — and attributable is the one specifically addressing confound avoidance. The other options describe complementary but distinct characteristics.

    **Concept Tested:** Success Criteria Definition

---

#### 6. Why does the chapter argue that the human review workflow must show the provenance of every retrieved context element (which traces, when, who, which policies)?

<div class="upper-alpha" markdown>
1. Because regulators require all source materials to be displayed at all times
2. Because opacity breeds skepticism while transparency builds trust even when sources are imperfect, since users can evaluate the sources themselves rather than accepting or rejecting outputs blindly
3. Because LLMs require provenance to generate text
4. Because graph databases cannot serve content without provenance
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter explicitly connects transparency to trust-building. The other options misstate the rationale.

    **Concept Tested:** User Trust Building

---

#### 7. A senior analyst dismisses the context graph because "I trust my own memory more than any system." Which mitigation does the chapter recommend?

<div class="upper-alpha" markdown>
1. Identify the specific question types where the context graph outperforms human memory — cross-team precedents, decisions made more than 18 months ago, and policy updates from the last quarter — and focus demonstrations on those cases
2. Force the analyst to use the system in every decision
3. Replace the analyst
4. Disable the human review workflow
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter prescribes this targeted-demonstration mitigation for the "I trust my memory" barrier. The other options are punitive or counterproductive.

    **Concept Tested:** Adoption Barriers

---

#### 8. A team observes that decisions made with context graph support are later reversed in audit at a higher rate than expected. Which feedback-loop instrumentation is most valuable for diagnosing this?

<div class="upper-alpha" markdown>
1. Anonymous survey of LLM developers
2. Connect the context graph's decision records to the outcome-tracking systems (ticket resolution, audit findings, appeal outcomes) so reversals become ground-truth feedback that retrieval quality was incorrect or insufficient — far more reliable than proxy feedback
3. Disable the feedback loop entirely
4. Switch to BM25 retrieval
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter calls out this audit-outcome feedback loop as the highest-value but hardest-to-instrument signal. The other options either remove feedback or are unrelated.

    **Concept Tested:** Model Improvement Feedback

---

#### 9. Design a graduated-autonomy rollout for an AI agent that approves expense exceptions. Which sequence and rationale follows the chapter's adoption-roadmap pattern?

<div class="upper-alpha" markdown>
1. Phase 0 preparation (success criteria, baseline measurement, stakeholder briefing) → Phase 1 beachhead pilot 9-24 weeks with 8-20 expense reviewers including at least 2 skeptics, bi-weekly feedback → Phase 2 rollout to full expense team 25-40 weeks with refined training and executive reporting → Phase 3 adjacent expansion to procurement exceptions at weeks 41-80 → Phase 4 Center of Excellence after month 20
2. Launch with full autonomy on day 1 and observe outcomes
3. Build the system but never deploy it
4. Outsource the rollout entirely to a third party
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter's four-phase roadmap matches this sequence exactly. The other options either skip the staged rollout (B) or abdicate it (C, D).

    **Concept Tested:** Adoption Roadmap

---

#### 10. According to the chapter, what makes executive sponsorship effective — as opposed to merely titular?

<div class="upper-alpha" markdown>
1. The sponsor signs a one-page memo and is never seen again
2. The sponsor approves the budget and delegates everything else
3. The sponsor avoids any direct involvement to maintain objectivity
4. The sponsor attends at least one pilot feedback session, publicly references the context graph in all-hands or department meetings, personally makes the go/no-go decision at each phase transition, resolves organizational blockers the team cannot, and aligns the system's outcomes with team performance metrics
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter lists exactly these five active sponsorship behaviors and explains why passive endorsement is insufficient. The other options describe the passive sponsorship the chapter warns against.

    **Concept Tested:** Executive Sponsorship

---
