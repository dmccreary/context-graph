# Quiz: The Context Problem and RAG Limitations

Test your understanding of why LLMs fail at enterprise tasks even with sophisticated data infrastructure, the limits of RAG, the four missing knowledge layers, and how context graphs address each failure mode.

---

#### 1. Which best describes the LLM context window?

<div class="upper-alpha" markdown>
1. Long-term memory that accumulates facts across sessions
2. A region of model weights that gets updated during inference
3. Working memory: the maximum input sequence the model can process in a single inference call, with no persistence between calls
4. A vector index of all documents in the enterprise data lake
</div>

??? question "Show Answer"
    The correct answer is **C**. The context window is per-call working memory — when the call ends, it is empty. It is not long-term memory (A), not part of model weights (B), and not a document index (D). Misunderstanding this is the source of many bad enterprise AI architecture decisions.

    **Concept Tested:** LLM Context Window

---

#### 2. What does the chapter mean by "grounding" an LLM?

<div class="upper-alpha" markdown>
1. Fine-tuning the model on proprietary documents
2. Reducing the model's temperature parameter to zero
3. Encrypting the model weights to prevent extraction
4. Injecting relevant, accurate, current organizational context into the context window so the model reasons from verified facts rather than training-data generalizations
</div>

??? question "Show Answer"
    The correct answer is **D**. Grounding is the practice of supplying verified organizational context at inference time so the model is constrained to those facts. Fine-tuning (A), temperature (B), and weight encryption (C) are unrelated techniques.

    **Concept Tested:** Grounding

---

#### 3. A RAG pipeline retrieves the most semantically similar documents to the user's query. Which of the following is a RAG limitation called out in the chapter?

<div class="upper-alpha" markdown>
1. RAG cannot return more than five documents per query
2. RAG retrieves documents but not the decision context — the why, by whom, under what circumstances, or whether the decision was later overturned
3. RAG cannot be used with embedding models
4. RAG always over-counts the most recent document
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter highlights this as the core RAG limitation: documents record what was decided but rarely the surrounding decision context. The other options misstate RAG behavior.

    **Concept Tested:** RAG Limitations

---

#### 4. A pricing-policy assistant confidently quotes a discount tier that was changed six months ago. Which failure mode is this?

<div class="upper-alpha" markdown>
1. Knowledge staleness — the retrieval surfaced an older document whose embedding was still highly similar, and there was no freshness metadata to flag that a newer version exists
2. Schema drift
3. Context poisoning by adversarial injection
4. Differential privacy noise
</div>

??? question "Show Answer"
    The correct answer is **A**. Knowledge staleness is exactly this pattern: older documents may be retrieved with high similarity, and without freshness annotation the LLM treats them as authoritative. Schema drift (B) is a metadata problem. Adversarial injection (C) implies a malicious document. Differential privacy noise (D) is unrelated.

    **Concept Tested:** Knowledge Staleness

---

#### 5. Why does the chapter argue that hallucination from partial context is systematic rather than random?

<div class="upper-alpha" markdown>
1. Because the model will systematically hallucinate in the same direction for any query that exercises the same retrieval gap, filling missing context with training-data patterns
2. Because hallucinations only occur on weekends
3. Because hallucinations are caused by hardware bit-flips
4. Because hallucination is unrelated to the retrieved context
</div>

??? question "Show Answer"
    The correct answer is **A**. The missing context failure mode is predictable: identical retrieval gaps produce identical fill-in behaviors. The other options describe non-causes that the chapter does not discuss.

    **Concept Tested:** Hallucination

---

#### 6. A customer-support LLM correctly recalls written policies but consistently misses the unwritten rule that "this particular customer always needs a human review on orders above $100,000, even though policy only requires it above $250,000." Which type of knowledge does the LLM lack?

<div class="upper-alpha" markdown>
1. Tacit knowledge — the rule lives in experienced practitioners' heads and in patterns of past decisions, but is not written in any policy document a RAG system can retrieve
2. Static regulatory knowledge
3. Differential privacy budgets
4. SKOS thesaurus entries
</div>

??? question "Show Answer"
    The correct answer is **A**. Tacit knowledge is exactly this: rules that live in expert heads and in decision patterns, never written down for a document retriever to find. The other options describe categories of knowledge that are not the issue here.

    **Concept Tested:** Tacit Knowledge

---

#### 7. A retrieval system pulls 50 marginally relevant documents into the context window so the LLM "has plenty of background." The model's answers begin to drift toward generic averages and miss the specific exception case the user asked about. What failure mode is this?

<div class="upper-alpha" markdown>
1. Over-retrieval context poisoning — a context window so full of marginally relevant documents that the truly relevant information is diluted and the model's attention drifts toward common-case patterns
2. Missing provenance
3. Index-free adjacency failure
4. Stale edge detection failure
</div>

??? question "Show Answer"
    The correct answer is **A**. Over-retrieval poisoning is the specific failure mode the chapter describes: too much marginally-relevant content dilutes the truly relevant signal. Missing provenance (B), index-free adjacency (C), and stale-edge detection (D) are different concerns.

    **Concept Tested:** Context Poisoning

---

#### 8. According to the chapter, which is an example of dynamic knowledge that needs current-state retrieval rather than pre-built embeddings?

<div class="upper-alpha" markdown>
1. The text of a regulatory requirement that has not changed in five years
2. The current approval status of an open exception request
3. The historical definition of an accounting standard from 1998
4. The specification of a product line that has been discontinued
</div>

??? question "Show Answer"
    The correct answer is **B**. Dynamic knowledge is information whose currency is critical, like the approval status of an open request — it changes frequently and a stale cached snapshot misleads. The other options describe static knowledge that RAG handles well.

    **Concept Tested:** Static vs Dynamic Knowledge

---

#### 9. An LLM is asked to recommend an exception decision. It retrieves four document excerpts — customer revenue history from CRM, contract terms from contract management, payment behavior from billing, and an open support escalation — but answers as if they describe four different customers. Which failure mode is at play, and which property is missing?

<div class="upper-alpha" markdown>
1. Context completeness is missing — the retrieval system pulled individually similar documents but did not follow the relationship chain that connects them all to the same canonical customer entity
2. Schema drift in the contract management system
3. Open world assumption error in the CRM
4. PageRank score miscalibration
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter names this exact gap: individually similar retrieval fails to provide the connected subgraph; context completeness requires following relationships across entity types. The other options describe unrelated issues.

    **Concept Tested:** Context Completeness

---

#### 10. A team is choosing between (a) expanding their RAG index to cover more documents and (b) building a context graph alongside RAG. They want to address all four missing layers — exception logic, historical precedents, cross-system synthesis, and out-of-band approval chains. Which is the most defensible choice according to the chapter?

<div class="upper-alpha" markdown>
1. Expand the RAG index, because more documents will eventually cover all four layers
2. Replace RAG with a vector store using larger embedding dimensions
3. Drop both RAG and graphs and rely on the LLM's training data
4. Build a context graph alongside RAG — RAG handles document retrieval for static knowledge, while the context graph captures the organizational intelligence (precedents, decision history, cross-system synthesis) that document retrieval structurally cannot capture
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter argues explicitly that context graphs extend rather than replace RAG, and that the four missing layers are structural gaps in document retrieval that more documents cannot close. Larger embeddings (B) and reliance on training data (C) fail for the same structural reason.

    **Concept Tested:** Organizational Knowledge Gap

---
