---
title: Evaluation Pipeline for Context Graph Systems
description: Learners can assess the quality of a context-graph-powered LLM system by identifying which evaluation metric (BLEU vs. faithfulness) is appropriate for a given quality concern.
status: scaffold
library: vis-network
bloom_level: Evaluate (L5)
---

# Evaluation Pipeline for Context Graph Systems



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: "Chapter 10: LLM and AI Foundations"](../../chapters/10-llm-ai-foundations/index.md).

```text
Type: graph-model
**sim-id:** llm-evaluation-pipeline
**Library:** vis-network
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: assess
Learning Objective: Learners can assess the quality of a context-graph-powered LLM system by identifying which evaluation metric (BLEU vs. faithfulness) is appropriate for a given quality concern.

Instructional Rationale: An interactive evaluation pipeline diagram is appropriate for the Evaluate objective — learners must match quality concerns to metrics, which requires judgment rather than recall.

Canvas: responsive width, 480px height. White background.

Pipeline nodes (left to right):
1. "User Query" (orange, ellipse)
2. "Context Graph Retrieval" (indigo, box) — retrieves decision traces
3. "LLM Response Generation" (gold, box)
4. "Evaluation Layer" (teal, large box, highlighted with border) — split into two sub-nodes:
   4a. "BLEU Evaluator" (teal, small box within Evaluation Layer)
   4b. "Faithfulness Evaluator" (teal, small box within Evaluation Layer)
5. "Quality Monitor" (steel blue, box) — receives both metric outputs
6. "Alert / Log" (red, diamond) — triggered when metrics drop below threshold

Edges:
- User Query → Context Graph Retrieval
- Context Graph Retrieval → LLM Response Generation, label "injects context"
- LLM Response Generation → Evaluation Layer, label "generated response"
- Context Graph Retrieval → Evaluation Layer, label "retrieved context (for faithfulness)"
- Evaluation Layer → Quality Monitor
- Quality Monitor → Alert / Log, label "if score < threshold"

Click on BLEU Evaluator:
"**BLEU Score** — measures lexical similarity to reference responses. Use when: you have a test set of queries with known correct responses. Limitation: does not catch hallucinations that use different words than the reference but state correct facts, or hallucinations that match the reference's words but are factually wrong."

Click on Faithfulness Evaluator:
"**Faithfulness Score** — measures whether every factual claim in the response is supported by the retrieved context. Use when: you care about grounding quality and hallucination detection. Implementation: send (response, retrieved context) to an evaluator LLM. Limitation: evaluator LLMs have their own failure modes."

Click on Alert / Log:
"**Quality Alert** — triggers when faithfulness score drops below threshold (typical: 0.85 for decision support). First investigation step: check whether context graph retrieval quality has degraded (freshness, relevance, coverage)."

Hover over each edge shows edge label.
```

## Related Resources

- [Chapter 10: "Chapter 10: LLM and AI Foundations"](../../chapters/10-llm-ai-foundations/index.md)
