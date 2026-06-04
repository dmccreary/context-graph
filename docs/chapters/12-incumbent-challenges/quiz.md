# Quiz: Incumbent Challenges in Building Context Systems

Test your understanding of current state bias, the data warehouse gap, AI agent execution path limits, integration tax, data silos, and why purpose-built context graphs create a durable competitive moat.

---

#### 1. What does the chapter mean by "current state bias" in enterprise systems?

<div class="upper-alpha" markdown>
1. The tendency of LLMs to over-weight recent training data
2. The design choice in most enterprise systems to optimize for answering "what is the current state of this entity?" — overwriting prior state when records update, which destroys the historical depth a context graph requires
3. A vendor's preference for current customers over prospects
4. A bias in differential privacy mechanisms toward current queries
</div>

??? question "Show Answer"
    The correct answer is **B**. Current state bias is the rational design choice to overwrite prior state — efficient for transactional systems, fatal for context graph requirements. The other options describe unrelated concepts.

    **Concept Tested:** Current State Bias

---

#### 2. Why does the chapter call the data warehouse a "read-path" system?

<div class="upper-alpha" markdown>
1. Because warehouses are positioned after decisions are made — ingesting outcomes on a scheduled cadence and serving aggregate analytical queries, after the real-time decision context (cross-system synthesis, out-of-band approvals, urgency signals) has already evaporated
2. Because warehouses cannot write any data
3. Because warehouses require all queries to be in Cypher
4. Because warehouses only support semantic similarity search
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter is explicit: warehouses sit on the read path after the fact. The other options misstate warehouse capabilities or use.

    **Concept Tested:** Data Warehouse Gap

---

#### 3. What is "post-hoc context capture" and why is it limited?

<div class="upper-alpha" markdown>
1. A vector indexing technique applied after document ingestion
2. A pre-defined schema applied before data is written
3. Attempting to reconstruct decision context from outputs after the decision is made — limited because the why (which policy applied, which precedents were cited, who approved informally) is in people's heads, email threads, and conversations that are not preserved in the output artifacts
4. A federated query technique used across data lakes
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter defines post-hoc capture and explains its structural limit: the context that matters most is gone by the time the outputs are observed. The other options describe unrelated mechanisms.

    **Concept Tested:** Post-Hoc Context Capture

---

#### 4. According to the chapter, why are AI agent platforms — even though they are close to the decision moment and architected around LLMs — still unable to serve as a context graph?

<div class="upper-alpha" markdown>
1. Because they execute tasks forward and typically capture only audit-style logs rather than structured, queryable decision-trace graphs; and because they orchestrate over systems of record they do not own, leaving a system-of-record gap
2. Because they cannot call any APIs
3. Because LLMs are not allowed in agent platforms
4. Because they require RDF triplestores
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter cites both the execution-path limit (logs vs. structured graphs) and the system-of-record gap. The other options misstate platform capabilities.

    **Concept Tested:** AI Agent Execution Path

---

#### 5. What is the integration tax that the chapter describes?

<div class="upper-alpha" markdown>
1. A tariff on cross-border data transfers
2. A subscription fee charged by graph database vendors
3. The accumulated cost of building context graph capability on top of existing systems — including custom data model extensions, write-back APIs, graph query layers, freshness metadata, and lifecycle management — paid again at every upgrade, API change, and migration
4. A penalty applied by regulators for using legacy systems
</div>

??? question "Show Answer"
    The correct answer is **C**. The integration tax is the chapter's term for the recurring engineering cost of retrofitting context-graph capability onto incumbent platforms. The other options describe unrelated charges.

    **Concept Tested:** Integration Tax

---

#### 6. A CRM holds customer relationship data; an ERP holds transaction data; an ITSM holds incident data. According to the chapter, why does cross-silo decision context — like a customer escalation linked to a production incident and a contract modification — almost never get recorded in any single one of these systems?

<div class="upper-alpha" markdown>
1. Because each system is its own silo, with no canonical entity link or write API for decisions that span silos, and the cross-silo decision is owned by no single platform — making a purpose-built context graph the natural place to record it
2. Because cross-silo data is illegal to combine
3. Because the LLM cannot process more than one source at a time
4. Because differential privacy forbids cross-silo joins
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter explains exactly this: data silos cannot record cross-silo decisions because no silo owns them. The other options misstate technical or legal constraints.

    **Concept Tested:** Data Silo

---

#### 7. The chapter argues that a purpose-built context graph has a "write-path advantage." What does this advantage allow it to do?

<div class="upper-alpha" markdown>
1. Bypass all access control checks
2. Replace the CRM, ERP, and ITSM systems entirely
3. Receive decision trace write-backs from any source (agents, humans, integrated systems) and instrument any decision point in any workflow, without needing to replace the systems that record the operational outcomes
4. Encrypt all decision content automatically
</div>

??? question "Show Answer"
    The correct answer is **C**. The write-path advantage is the ability to capture decision traces from anywhere without owning the system of record. The other options misstate the advantage.

    **Concept Tested:** Write-Path Advantage

---

#### 8. The chapter argues that the value of a context graph grows with the number of decision traces it contains, creating an accumulation dynamic. Which strategic implication follows most directly?

<div class="upper-alpha" markdown>
1. Starting early — and instrumenting high-volume decision workflows first — creates a compounding competitive moat that late-starting competitors cannot easily close, because precedent depth itself becomes the differentiator
2. The system should be evaluated after one week of operation and discarded if precedent coverage is low
3. Only one decision workflow should ever be instrumented
4. The context graph should be replaced annually to keep it fresh
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter's strategic argument is exactly this: early start plus high-volume workflows compound to create a durable moat. The other options reflect the "valley of disappointment" misjudgment the chapter warns against.

    **Concept Tested:** Competitive Moat

---

#### 9. An enterprise team is evaluating whether to extend its existing relational data warehouse to serve precedent-chain queries for an LLM agent. Which architectural mismatch is the most fundamental obstacle, according to the chapter?

<div class="upper-alpha" markdown>
1. The warehouse cannot store decimal values
2. Multi-hop precedent traversal requires graph-native storage to be performant; on a relational warehouse it requires recursive CTEs or application-layer recursion whose latency accumulates with every hop, making sub-second context retrieval impractical
3. The warehouse cannot accept JSON input
4. The warehouse requires DBA approval for every query
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter highlights graph-native storage as one of the four structural advantages of a purpose-built context graph; relational warehouses cannot match it without rebuilding the storage layer. The other options misstate warehouse limitations.

    **Concept Tested:** Read-Path Limitation

---

#### 10. A CTO argues "we already have a CRM that records every customer interaction — why add a separate context graph?" Based on the chapter, which is the most defensible structural counter-argument?

<div class="upper-alpha" markdown>
1. CRM systems are too expensive to extend, so a context graph is always cheaper
2. The CRM cannot store more than 1,000 customers
3. The CRM does not allow Cypher queries
4. The CRM is built around current-state records and a relational schema for transactional performance; meeting context-graph requirements (real-time trace capture, graph-native traversal, cross-silo linking, temporal versioning) would force fundamental redesign of its data layer — and even then it would still not own the cross-silo decisions that span CRM, ERP, and ITSM
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter's structural analysis is exactly this: rational CRM design conflicts with context-graph requirements, and cross-silo decisions are owned by no single system. The other options either misstate facts or are economic side issues rather than structural arguments.

    **Concept Tested:** Incumbent Architecture Constraint

---
