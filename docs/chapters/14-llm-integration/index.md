---
title: "Chapter 14: Integrating LLMs with Context Graphs"
description: "How context graphs wire into LLM workflows: context retrieval, relevance ranking, hybrid retrieval, context window budgeting, grounding strategies, and hallucination mitigation."
generated_by: claude skill chapter-content-generator
date: 2026-05-18 16:55:00
version: 0.08
---

# Chapter 14: Integrating LLMs with Context Graphs

## Summary

Shows how context graphs wire into LLM workflows: context retrieval, relevance ranking, hybrid retrieval combining dense and sparse (BM25) search, context window budgeting, grounding, and hallucination mitigation.

## Concepts Covered

This chapter covers the following 27 concepts from the learning graph:

1. LLM Integration Pattern
2. Context Retrieval
3. Relevance Ranking
4. Semantic Similarity
5. Vector Embedding
6. Hybrid Retrieval
7. Context Window Budget
8. Context Compression
9. Context Pruning
10. Grounding Strategy
11. Prompt Engineering with Context
12. Few-Shot Context Injection
13. Chain-of-Thought with Context
14. Context Reranking
15. Multi-Hop Retrieval
16. Context Freshness Check
17. Context Conflict Resolution
18. LLM Output Validation
19. Hallucination Mitigation
20. Context-Aware Generation
21. Structured Output with Context
22. Function Calling Pattern
23. Context Graph Tool Definition
24. Streaming Context Retrieval
25. Context Graph Prompt Template
26. Sparse Retrieval
27. BM25

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: What a Context Graph Is](../09-context-graph-definition/index.md)
- [Chapter 10: LLM and AI Foundations](../10-llm-ai-foundations/index.md)
- [Chapter 13: Graph Data Modeling for Context](../13-graph-data-modeling/index.md)

---

!!! mascot-welcome "Connecting the graph to the model."
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waves welcome">
    Welcome to Chapter 14! The context graph is built and modeled. Now we wire it to the LLM. This chapter is the engineering chapter — retrieval pipelines, ranking algorithms, token budgeting, and the prompt engineering patterns that translate graph data into grounded model outputs. Let's trace the why!

## Introduction

Building a context graph is the hard part. Wiring it to an LLM is where the value becomes visible — and where a surprising number of implementations stumble on engineering details that are not obvious from the architecture diagrams. The context graph can contain the most valuable organizational intelligence in the world, but if the retrieval pipeline delivers stale context, if the prompt template buries the most relevant information under verbose boilerplate, or if the model receives more context than it can attend to effectively, the output quality will be poor.

This chapter covers the complete integration stack: how to retrieve context from the graph, how to rank and filter it, how to manage the context window budget, how to structure prompts for maximum grounding, and how to validate that the model's output is actually grounded in what was provided. These are the engineering details that determine whether a context-graph-powered LLM application is better than a RAG system in practice, not just in theory.

## The LLM Integration Pattern

The standard **LLM integration pattern** for a context graph has five sequential stages. Understanding each stage and its failure modes is the foundation for building reliable integrations.

**Stage 1: Query interpretation.** The user's natural-language query (or the agent's task specification) is parsed to identify the entities, decision types, and time ranges relevant to the query. Entity names are resolved to canonical IDs using the entity resolution index. Decision type keywords (pricing, approval, exception, incident) are classified to the appropriate decision type labels in the context graph schema. This stage produces a structured retrieval specification rather than a raw query string.

**Stage 2: Context retrieval.** The structured retrieval specification is executed against the context graph using a combination of graph traversal (to find decision traces linked to the specified entities) and vector similarity search (to find decision traces semantically similar to the query). The result is a candidate set of decision trace nodes with associated actors, policy versions, and precedents.

**Stage 3: Ranking and filtering.** The candidate set is ranked by a composite relevance score and filtered for freshness. Only traces that pass the freshness threshold are included. The top-K traces from the ranked, filtered set are selected for injection.

**Stage 4: Context assembly.** The selected decision traces and their subgraph context (actors, policies, precedents) are serialized into a structured natural-language format and assembled into the LLM prompt alongside the system prompt, any few-shot examples, and the user query.

**Stage 5: Generation and validation.** The assembled prompt is sent to the LLM. The generated output is validated for faithfulness — checking that factual claims in the output are supported by the provided context — and structured output parsing is applied if the expected output is machine-readable (JSON, tables, ranked lists).

## Context Retrieval: Graph Traversal and Vector Search

**Context retrieval** is the process of finding the decision traces most relevant to a given query. In a well-designed context graph system, retrieval uses two complementary mechanisms that together outperform either alone.

**Graph traversal retrieval** starts from known entity nodes and follows typed edges to find directly related decision traces. This mechanism is precise — it finds exactly the decisions that involve the queried entities — but it is limited to finding decisions that are explicitly linked to the query's entities. A query for "pricing exceptions involving Acme Corp" that traverses APPLIES_TO edges will find all pricing exception decision traces linked to Acme Corp's entity node. It will not find decisions about similar customers that might serve as useful precedents.

**Vector embedding retrieval** addresses this limitation. Each decision trace's `context_summary` is encoded as a vector embedding. At query time, the query is also encoded as a vector. The context graph's vector index returns the decision traces whose embedding vectors are most similar to the query vector — regardless of whether they are linked to the same entity. This finds relevant precedents from similar (but not identical) situations.

The combination of the two mechanisms is called **hybrid retrieval**: use graph traversal to find entity-specific decision history (high precision), and use vector similarity to find precedents from similar situations (high recall). The two result sets are merged and re-ranked before assembly into the LLM context.

**Multi-hop retrieval** extends graph traversal beyond direct entity links. A two-hop traversal can find: decisions about customers in the same industry segment as the queried customer (entity → industry segment → similar entity → decision traces), or decisions that cite the same foundational policy as the most recent decision for this entity (entity → current decision → GOVERNED_BY policy → other decisions GOVERNED_BY same policy). Multi-hop retrieval is the mechanism that makes the context graph's relationship structure a source of contextual intelligence that flat vector search cannot replicate.

## Relevance Ranking and Reranking

After retrieval, the candidate set of decision traces must be ranked by relevance before assembly. The ranking determines which traces are included in the context window and in what order — both of which matter for LLM output quality.

**Relevance ranking** combines multiple signals into a composite score:

- **Semantic similarity**: cosine similarity between the query embedding and the decision trace's context summary embedding. Range: 0 to 1.
- **Entity match**: whether the trace directly involves the queried entity (exact match = 1.0), a closely related entity (partial match = 0.7), or a thematically similar entity (0.4).
- **Recency**: a decay function over the decision timestamp. Decisions from the last 90 days score higher than decisions from 2 years ago. The decay rate depends on the decision type: pricing decisions decay faster (markets change) than policy decisions (which are more stable).
- **Precedent in-degree**: the number of subsequent decisions that have cited this trace. High in-degree traces are influential precedents and should be surfaced preferentially.
- **Lifecycle status**: Active decisions score higher than Superseded ones. Overturned decisions may be included with a negative weight (they are cautionary, not supporting, precedents).

The composite score is a weighted sum of these signals. The weights should be tunable per decision type: for a compliance audit query, recency may be less important than policy version match; for an operational exception query, recency and entity match may be the dominant signals.

**Context reranking** is a second-pass ranking step that applies a more expensive but more accurate relevance model after the initial fast retrieval. The reranker takes the top-50 candidates from the first-pass ranking and applies a cross-encoder model (a neural model that jointly encodes the query and each candidate rather than encoding them separately) to re-score them for relevance. The top-10 from the reranker's output are the final candidates for context assembly.

Cross-encoder reranking is more accurate than embedding similarity because it considers the interaction between the query and each candidate — it can detect when a document that is semantically similar to the query is actually about a different topic (false positive in embedding retrieval). The cost is that cross-encoder scoring is proportional to the number of candidates × query tokens, making it too expensive to apply to the full candidate set — hence the two-pass design.

#### Diagram: Hybrid Retrieval and Reranking Pipeline

<details markdown="1">
<summary>Interactive step-through MicroSim showing the five-stage hybrid retrieval and reranking pipeline for context graph queries</summary>
Type: microsim
**sim-id:** hybrid-retrieval-pipeline
**Library:** p5.js
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: use
Learning Objective: Learners can use the hybrid retrieval pipeline to describe what happens at each stage of context graph retrieval and identify which stage is responsible for a specific type of retrieval failure.

Instructional Rationale: A step-through pipeline MicroSim is appropriate for the Apply objective — learners trace a specific query through all five stages, which prepares them to debug and optimize retrieval pipelines in practice.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 500px. White background.

Layout: Five stage boxes arranged left to right, each 18% width. Stage boxes contain an icon (drawn in p5.js), a stage name, and a brief description. An animated orange arrow moves between stages.

Stage 1 "Query Interpretation": Input box showing user query "Pricing exception precedents for Acme Corp Q4 renewal". Output: structured spec { entity_id: ENT-00441872, decision_type: pricing_exception, recency: 24mo }

Stage 2 "Graph Traversal": Shows 12 candidate nodes retrieved. Label: "Entity-linked traces found: 12"

Stage 3 "Vector Search": Shows additional 23 candidates. Label: "Semantically similar traces: 23. Combined candidate set: 35"

Stage 4 "First-Pass Ranking": Shows top-15 selected. Label: "Composite score applied. Top 15 retained for reranking."

Stage 5 "Cross-Encoder Rerank": Shows top-5 final. Label: "Reranker applied. Top 5 injected into context window."

Controls: "Next Stage" button (indigo), "Previous Stage" button (steel blue), "Reset" button. Stage indicator text: "Stage N of 5: [name]".

Each stage box is clickable — clicking shows a detail panel below with: what is computed at this stage, what the latency budget is (Stage 1: <10ms, Stage 2: <20ms, Stage 3: <30ms, Stage 4: <20ms, Stage 5: <50ms), and what failure mode looks like for this stage.

Total latency tracker at bottom right: updates cumulatively as stages complete, showing target of < 150ms total for the retrieval pipeline.

Canvas responds to window resize.
</details>

## Sparse Retrieval and BM25

**Sparse retrieval** is an alternative (or complement) to dense vector retrieval. Where dense retrieval encodes text as a continuous vector and uses geometric similarity, sparse retrieval represents text as a weighted set of terms (keywords) and uses term-overlap similarity to find matches.

**BM25** (Best Match 25) is the standard sparse retrieval algorithm. It extends the classic TF-IDF formula with length normalization and term frequency saturation, producing a relevance score for each document given a query based on the frequency and rarity of matching terms. BM25 is fast, interpretable, and effective for keyword-rich queries.

For context graph retrieval, BM25 is particularly useful for queries that include specific named entities, policy identifiers, or technical terms that are rare in the overall corpus. A query for "Invoice INV-4482 exception" will find documents containing exactly "INV-4482" through BM25 even if the vector embedding of the query does not strongly distinguish it from other invoice queries. Vector retrieval is powerful for semantic similarity; BM25 is powerful for exact-match and rare-term retrieval. Together they form a complementary hybrid.

A full **hybrid retrieval** implementation uses a reciprocal rank fusion algorithm to merge the rankings from graph traversal, vector retrieval, and BM25 into a single composite ranking before the reranking step. Reciprocal rank fusion is robust and parameter-free: the combined score for a candidate is the sum of the reciprocals of its ranks in each individual ranking (a candidate ranked first by two methods scores higher than one ranked first by one and not found by another).

## Context Window Budget Management

A **context window budget** is the allocation of the total context window capacity across the different components of an LLM prompt. Budget management is essential because the context window is finite, different components have different value per token, and exceeding the budget causes silent truncation.

A standard context window budget allocation for a decision support application (8,000-token window):

- System prompt: 400 tokens (5%)
- Few-shot examples: 600 tokens (7.5%)
- Retrieved decision traces: 4,000 tokens (50%)
- User query: 200 tokens (2.5%)
- Reserved for output: 2,000 tokens (25%)
- Safety margin: 800 tokens (10%)

These percentages shift based on use case. For a simple status query, the output reservation can be reduced to 500 tokens, freeing more budget for retrieved context. For a complex reasoning task, the few-shot examples budget may increase to 1,500 tokens to provide more sophisticated demonstrations.

**Context compression** is the practice of reducing the token count of retrieved context without significantly reducing its information value. Techniques include:

- Summarization: replacing a 500-token decision trace narrative with a 100-token summary that retains the key facts
- Schema stripping: removing boilerplate JSON structure and keeping only the property values
- Deduplication: removing repeated information when multiple retrieved traces say essentially the same thing
- Selective inclusion: including only the properties most relevant to the current query, omitting timestamp details for queries where recency is not critical

**Context pruning** is the harder version of compression: deciding which retrieved candidates to exclude entirely from the context window when the ranked set exceeds the budget. Pruning should remove the lowest-ranked candidates first (preserving the most relevant information), but should also consider semantic redundancy — if the top-3 candidates all tell essentially the same story, including all three wastes tokens that could be used for lower-ranked candidates that add genuinely new information.

**Context freshness check** is a required step before context assembly. Every retrieved decision trace should be checked against its `timestamp_decision` and any staleness indicators (lifecycle status = superseded, source data freshness score below threshold). Stale or superseded traces should be flagged in the serialized context — "Note: this precedent was superseded on [date] by [subsequent decision]" — rather than silently excluded or presented as current.

## Prompt Engineering Patterns for Context Graphs

How the retrieved context is organized within the prompt significantly affects LLM output quality. Several prompt engineering patterns are particularly effective for context-graph-powered applications.

**Context graph prompt template**: a standardized prompt structure that includes a context section with retrieved decision traces, a task section with the current request, and an output format section that specifies what structure the response should follow. The template is parameterized by decision type, ensuring consistent prompt structure across all queries of the same type.

**Few-shot context injection**: including 2-3 examples of the desired reasoning pattern before the actual retrieved context and query. For decision support applications, each few-shot example should show: retrieved context → reasoning process → structured recommendation. This teaches the model the specific reasoning format expected, which improves output consistency.

**Chain-of-thought with context**: explicitly instructing the model to reason step-by-step using the provided context before giving its final recommendation. A chain-of-thought instruction like "First, identify the most relevant precedent from the provided context. Then, explain what reasoning was applied in that precedent. Then, assess how similar the current case is to that precedent. Finally, give your recommendation and cite the precedent you relied on most heavily." This structured reasoning pattern dramatically reduces hallucination — the model is forced to anchor each reasoning step to a specific piece of provided context.

**Structured output with context**: instructing the model to produce output in a machine-readable format (JSON with specified fields, a Markdown table with specified columns) rather than free prose. Structured output enables downstream validation and automatic extraction of key fields (recommended decision, confidence level, precedent citations) without requiring natural language parsing.

A **context graph tool definition** enables an LLM agent to call context graph retrieval functions as tools rather than receiving a pre-assembled context block. The tool definition specifies: the function name (e.g., `retrieve_decision_precedents`), the parameters (entity_id, decision_type, recency_months, max_results), and the return format (structured list of decision trace summaries). With this tool definition registered, the agent can call the retrieval function interactively — making multiple targeted retrieval calls as it reasons through a complex decision, rather than receiving a single bulk context injection.

## Context Conflict Resolution

When multiple retrieved decision traces offer contradictory information or recommendations, the LLM must resolve the conflict rather than averaging over it. **Context conflict resolution** is the practice of providing the model with explicit guidance on how to handle contradictions in retrieved context.

Common conflict patterns:

- **Recency conflict**: an older trace recommends approval; a newer trace recommends denial. Resolution rule: prefer the more recent trace for active policy guidance, but surface both for human review if the divergence is significant.
- **Policy version conflict**: two traces reference different versions of the same policy, reaching different conclusions. Resolution rule: apply the policy version in effect at the current date; flag the older trace as potentially outdated.
- **Outcome conflict**: two traces for similar situations had opposite outcomes. Resolution rule: prefer the trace with higher confidence, higher approver authority, or more recent date. Flag the conflict for human awareness.

These rules should be encoded in the system prompt and the prompt template, not left for the model to infer. A model that is not given explicit conflict resolution rules will either silently prefer one trace over another based on position in the context window (a well-known LLM behavior) or hedge excessively and decline to give a recommendation.

**LLM output validation** is the final step in the integration pipeline. A validation layer checks the generated output against a set of structural and faithfulness rules before the response is returned to the user or used as an action trigger:

- Structural validation: does the output conform to the specified format (JSON schema, required fields present)?
- Citation validation: does every cited precedent reference a decision trace ID that was in the retrieved context?
- Faithfulness check: are the factual claims in the output supported by statements in the retrieved context (evaluated by a second LLM call or a rule-based checker)?
- Confidence calibration: if the model expresses high confidence, is that confidence supported by the strength of the precedents cited?

Outputs that fail validation are either corrected (by re-prompting with the validation feedback) or escalated to a human reviewer, not silently passed through.

!!! mascot-encourage "Integration engineering is where good ideas become reliable systems."
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Nexus encouraging">
    The integration patterns in this chapter might feel like engineering detail after the architectural clarity of earlier chapters. They are — but they are the engineering detail that determines whether your context graph system is trusted by its users. A context graph with poor retrieval, poor ranking, or poor output validation will produce wrong answers. The architecture is the vision; the integration engineering is the execution. Both matter equally.

#### Diagram: Context Window Budget Visualizer

<details markdown="1">
<summary>Interactive MicroSim allowing learners to allocate a context window budget across prompt components and see the impact on available retrieval slots</summary>
Type: microsim
**sim-id:** context-budget-visualizer
**Library:** p5.js
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: calculate
Learning Objective: Learners can calculate the context window allocation for a specific decision support application by adjusting component budgets and observing the trade-offs on retrieval capacity.

Instructional Rationale: An interactive budget allocation MicroSim is appropriate for the Apply objective — learners must adjust component allocations and observe constraints, practicing the budgeting skill they will need for real integrations.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 480px. White background.

Layout: Left side (60%): stacked horizontal bar showing context window allocation. Total bar = 8,000 tokens.

Bar segments (colors match component categories):
1. System Prompt: gold, default 400 tokens
2. Few-Shot Examples: teal, default 600 tokens
3. Retrieved Context: indigo, auto-calculated (remainder after other segments)
4. User Query: orange, default 200 tokens
5. Output Reservation: steel blue, default 2,000 tokens
6. Safety Margin: gray, fixed 800 tokens

Right side (40%): four sliders (createSlider) controlling: System Prompt tokens (100–800), Few-Shot Examples tokens (0–2000), User Query tokens (50–500), Output Reservation tokens (500–4000).

Retrieved Context segment auto-calculates: total - (system + few-shot + query + output + margin). If retrieved context goes negative, the bar flashes red and shows: "Warning: Budget exceeded. Reduce other components."

Below the bar: "Retrieval Capacity" panel showing:
- Available for context: [N] tokens
- Estimated traces at 300 tokens each: [N/300] traces
- At 150 tokens (compressed): [N/150] traces
- Recommendation: [text changes based on slider values]

Use cases buttons: createButton for "Simple Status Query", "Complex Exception Decision", "Audit Report". Each pre-fills the sliders with appropriate values for that use case.

Canvas responds to window resize. All calculations update in real time as sliders move.
</details>

## Summary and Key Takeaways

Integrating a context graph with an LLM requires a complete engineering stack: hybrid retrieval (graph traversal + vector search + BM25), multi-signal relevance ranking with reranking, careful context window budget management, structured prompt engineering patterns, conflict resolution rules, and output validation. Each layer of this stack has failure modes that can degrade output quality even when the context graph contains accurate, relevant information.

By the end of this chapter, you should be able to:

- Describe the five stages of the **LLM integration pattern** and the failure mode at each stage
- Explain the difference between **graph traversal retrieval** and **vector embedding retrieval** and explain why hybrid retrieval outperforms either alone
- Explain **BM25** as a sparse retrieval complement to dense vector search
- Describe **multi-hop retrieval** and explain what query types it handles that direct graph traversal cannot
- Define **relevance ranking** and name the five signals used to compute a composite relevance score
- Explain **context reranking** and describe why cross-encoder reranking is more accurate but more expensive than embedding similarity
- Describe the standard **context window budget** allocation and the trade-offs of **context compression** vs. **context pruning**
- Explain **few-shot context injection** and **chain-of-thought with context** as prompt engineering patterns
- Describe **context conflict resolution** and explain why explicit resolution rules must be in the system prompt

??? question "Quick Check"
    An LLM agent retrieves 35 candidate decision traces for a pricing exception query. The first-pass ranking selects the top-15. The reranker selects the top-5. The context window budget allows for 5 traces at 300 tokens each (1,500 tokens total). One of the top-5 traces is flagged by the freshness check as Superseded (superseded 3 months ago). What should the integration layer do, and should the superseded trace be included or excluded from the context window? Justify your answer.

    *(Answer: Include the superseded trace but annotate it clearly: "Note: this precedent was superseded on [date] by [DT-XXXX]. Its reasoning may be useful context but the subsequent decision should govern current policy." Excluding it entirely would waste the context budget without benefit; including it unmarked risks the model treating an outdated precedent as current policy. The annotation enables the model to apply appropriate skepticism. If the budget is tight, the superseded trace should be compressed more aggressively than active traces.)*

!!! mascot-celebration "Chapter 14: Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    The integration stack is assembled. You can now retrieve, rank, filter, budget, and validate context from a graph to an LLM. Chapter 15 shows how to build the full system — storage, ingestion pipelines, APIs, and deployment patterns for taking a context graph from prototype to production. The engineering complexity is real, but the patterns are proven. Let's trace the why!
