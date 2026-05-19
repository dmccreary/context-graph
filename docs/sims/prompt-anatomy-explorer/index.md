---
title: Prompt Anatomy for Context Graph Integration
description: Learners can use the prompt anatomy diagram to design a structured LLM prompt that correctly positions the system prompt, few-shot examples, retrieved context, and user query within the token budget.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Prompt Anatomy for Context Graph Integration



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: "Chapter 10: LLM and AI Foundations"](../../chapters/10-llm-ai-foundations/index.md).

```text
Type: microsim
**sim-id:** prompt-anatomy-explorer
**Library:** p5.js
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: use
Learning Objective: Learners can use the prompt anatomy diagram to design a structured LLM prompt that correctly positions the system prompt, few-shot examples, retrieved context, and user query within the token budget.

Instructional Rationale: An interactive annotated prompt builder is appropriate for the Apply objective — learners can toggle sections on and off to see token budget implications, preparing them to design prompts in practice.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 520px. Light gray background.

Layout: Left panel (65%): Prompt display divided into colored vertical blocks stacked top-to-bottom:
1. "System Prompt" (gold, 80px tall): text "You are an enterprise pricing advisor. When reviewing exception requests, always cite the most relevant precedent from the provided context..."
2. "Few-Shot Examples" (teal, 100px tall): text "Example 1: [Customer: RetailCorp, Decision: approved 10% discount, Precedent: similar volume tier...] → Recommendation: Approve with conditions..."
3. "Retrieved Context" (indigo, 160px tall): text "[Decision Trace DT-4482: Customer Acme Corp, 2025-10-31, 15% discount exception, approved by M. Williams, citing DT-3891 and DT-2204...]"
4. "User Query" (orange, 60px tall): text "Should we approve Acme Corp's request for a 20% discount on their Q4 renewal?"
5. "Expected Output" (steel blue, 60px tall, dashed border): "Model generates response here..."

Right panel (35%): Token budget bar chart showing:
- Total budget: 8,000 tokens (full bar)
- System prompt: 240 tokens (gold segment)
- Few-shot examples: 480 tokens (teal segment)
- Retrieved context: 1,200 tokens (indigo segment)
- User query: 45 tokens (orange segment)
- Reserved for output: 500 tokens (steel blue segment, dashed)
- Available buffer: remainder (gray segment)

Toggle buttons (createButton for each):
- "Toggle Few-Shot Examples" — hides/shows the few-shot block and updates the token chart
- "Toggle Retrieved Context" — hides/shows the context block and updates the token chart
- Show a warning text in orange when the combined used tokens exceed 7,000: "Warning: context approaching token limit. Consider reducing retrieved traces."

Clicking any prompt block: shows an explanation panel at the bottom — what this block does, why its position matters (system prompt = highest weight, context = just before query for recency effect), and best practices.

Canvas responds to window resize.
```

## Related Resources

- [Chapter 10: "Chapter 10: LLM and AI Foundations"](../../chapters/10-llm-ai-foundations/index.md)
