# Quiz: Integrating LLMs with Context Graphs

Test your understanding of hybrid retrieval, relevance ranking, reranking, BM25, context window budgeting, prompt engineering patterns, conflict resolution, and output validation for context-graph-powered LLM applications.

---

#### 1. What are the five sequential stages of the standard LLM integration pattern in the chapter?

<div class="upper-alpha" markdown>
1. Query interpretation, context retrieval, ranking and filtering, context assembly, generation and validation
2. Compile, link, load, execute, terminate
3. Tokenize, embed, search, return, exit
4. Authenticate, authorize, audit, archive, alert
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter names these five stages and discusses the failure modes of each. The other options are unrelated technical sequences.

    **Concept Tested:** LLM Integration Pattern

---

#### 2. Why does the chapter say hybrid retrieval outperforms either graph traversal alone or vector embedding retrieval alone?

<div class="upper-alpha" markdown>
1. Because graph databases cannot store vectors
2. Because vector search is always faster
3. Because graph traversal is precise (finds decisions explicitly linked to the queried entity) but cannot find precedents from similar situations, while vector similarity finds semantically related cases regardless of entity link — combining them captures both entity-specific history and similar-situation precedents
4. Because hybrid retrieval doubles the size of the context window
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter explains exactly this complementarity: traversal gives precision on entity links; vector similarity gives recall on similar cases. The other options misstate the trade-off.

    **Concept Tested:** Hybrid Retrieval

---

#### 3. What is BM25 and why is it useful in a context-graph retrieval pipeline?

<div class="upper-alpha" markdown>
1. A graph traversal algorithm that visits 25 nodes per step
2. A bitemporal-modeling standard for 25-year retention periods
3. A version of GraphSON optimized for batches of 25 nodes
4. A sparse-retrieval algorithm using term-overlap (TF-IDF with length normalization and term-frequency saturation) — useful for queries containing specific named entities, policy IDs, or rare technical terms that exact-match retrieval handles better than dense embeddings
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter defines BM25 as the standard sparse retrieval complement to dense vector search and explains its strength on exact-match and rare-term queries. The other options invent technologies that do not exist.

    **Concept Tested:** BM25

---

#### 4. A retrieval pipeline first ranks 50 candidates by composite score, then applies a more expensive model to re-score the top candidates. What is this second step called and what does it do?

<div class="upper-alpha" markdown>
1. Context reranking — a cross-encoder model jointly encodes the query and each candidate to produce a more accurate relevance score for the top-K candidates, accepting higher per-candidate cost in exchange for higher precision
2. Multi-hop traversal
3. Bitemporal filtering
4. BM25 reordering
</div>

??? question "Show Answer"
    The correct answer is **A**. Context reranking with a cross-encoder is the chapter's prescribed second-pass step. The other options name unrelated operations.

    **Concept Tested:** Context Reranking

---

#### 5. A retrieved trace is flagged Superseded (replaced 3 months ago by a newer decision). According to the chapter, should the integration layer include it in the LLM context, and how should it be presented?

<div class="upper-alpha" markdown>
1. Exclude it silently — superseded traces should never reach the model
2. Include it as if it were active and let the model figure it out
3. Include it but annotate it clearly ("Note: this precedent was superseded on [date] by [DT-XXXX]; subsequent decision should govern current policy") — silently excluding wastes the context budget without benefit; including unmarked risks the model treating an outdated precedent as current
4. Replace it with a randomly chosen active trace
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter's prescription is explicit annotation rather than silent exclusion or unmarked inclusion. The other options either misuse or destroy information.

    **Concept Tested:** Context Freshness Check

---

#### 6. A decision support application uses an 8,000-token context window. According to the chapter's standard allocation, which item gets roughly half of the budget?

<div class="upper-alpha" markdown>
1. The retrieved decision traces, which receive about 50% of the budget (around 4,000 tokens) so that there is room for an adequate set of precedents
2. The user query, which gets the largest share
3. The system prompt, which is the most important
4. The few-shot examples, because they teach the format
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter's standard allocation gives retrieved decision traces about 50% of the window. System prompt (~5%), few-shot examples (~7.5%), and user query (~2.5%) take much smaller shares.

    **Concept Tested:** Context Window Budget

---

#### 7. A pricing exception agent retrieves two precedent traces with opposite recommendations: an older trace recommends approval, a newer trace recommends denial. According to the chapter, what is the correct integration-layer behavior?

<div class="upper-alpha" markdown>
1. Average the two recommendations into a neutral score
2. Use the system prompt's context-conflict-resolution rules — prefer the more recent trace for active policy guidance, but surface both for human review if the divergence is significant — rather than letting the model silently prefer one based on position in the context window
3. Hide both traces from the model to avoid confusion
4. Always pick the longer trace because it has more detail
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter prescribes explicit conflict-resolution rules in the system prompt to prevent the well-known LLM position-bias behavior. The other options either mishandle the conflict or remove signal.

    **Concept Tested:** Context Conflict Resolution

---

#### 8. Which prompt engineering pattern instructs the model to reason step-by-step using the provided context (identify precedent, explain its reasoning, assess similarity, then recommend) before giving its final answer?

<div class="upper-alpha" markdown>
1. Chain-of-thought with context
2. BM25 search
3. Schema drift detection
4. Reciprocal rank fusion
</div>

??? question "Show Answer"
    The correct answer is **A**. Chain-of-thought with context is the chapter's prescribed structured-reasoning pattern that dramatically reduces hallucination by anchoring each step to provided context. The other options are unrelated mechanisms.

    **Concept Tested:** Chain-of-Thought with Context

---

#### 9. An LLM agent is configured with `retrieve_decision_precedents(entity_id, decision_type, recency_months, max_results)` as a callable tool. According to the chapter, what advantage does this give the agent over receiving a single pre-assembled context block?

<div class="upper-alpha" markdown>
1. It guarantees the agent will never hallucinate
2. It eliminates the need for any system prompt
3. The agent can make multiple targeted retrieval calls interactively as it reasons through a complex decision, requesting exactly the context it needs at each step rather than receiving a single bulk context injection
4. It makes the context window infinitely large
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter explains exactly this interactive multi-step retrieval pattern that tool-calling enables. The other options misstate or exaggerate the benefit.

    **Concept Tested:** Context Graph Tool Definition

---

#### 10. A generated response cites a precedent ID that is not present in the retrieved context. Which validation step catches this, and what should happen next?

<div class="upper-alpha" markdown>
1. The freshness check catches it; the response is auto-approved
2. The reranker catches it; the response is silently discarded
3. The semantic similarity score catches it; the response is logged but returned to the user
4. Citation validation catches it — every cited precedent must reference a trace ID that was in the retrieved context; failed outputs are either corrected by re-prompting with the validation feedback or escalated to a human reviewer, never silently returned
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter prescribes citation validation as part of LLM output validation, and explicitly forbids silently passing through failed outputs. The other options assign the check to the wrong stage or mishandle the failed output.

    **Concept Tested:** LLM Output Validation

---
