---
title: Context Window Budget Visualizer
description: Learners can calculate the context window allocation for a specific decision support application by adjusting component budgets and observing the trade-offs on retrieval capacity.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Context Window Budget Visualizer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: "Chapter 14: Integrating LLMs with Context Graphs"](../../chapters/14-llm-integration/index.md).

```text
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
```

## Related Resources

- [Chapter 14: "Chapter 14: Integrating LLMs with Context Graphs"](../../chapters/14-llm-integration/index.md)
