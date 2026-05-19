---
title: Differential Privacy Noise Mechanism Explorer
description: Learners can demonstrate how adjusting the epsilon privacy budget changes the trade-off between result accuracy and individual privacy protection.
status: implemented
library: p5.js
bloom_level: Apply (L3)
---

# Differential Privacy Noise Mechanism Explorer



<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: "Chapter 3: Metadata Management and Data Governance"](../../chapters/03-metadata-management/index.md).

```text
Type: microsim
**sim-id:** differential-privacy-explorer
**Library:** p5.js
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: demonstrate
Learning Objective: Learners can demonstrate how adjusting the epsilon privacy budget changes the trade-off between result accuracy and individual privacy protection.

Instructional Rationale: An interactive slider MicroSim is appropriate because the Apply objective requires learners to manipulate a parameter and observe outcomes — dragging the epsilon slider makes the abstract noise mechanism concrete and intuitive.

Canvas: responsive width via updateCanvasSize() as first line of setup(). Height: 480px.

Layout:
- Top section (200px): bar chart showing "True Count" (solid indigo bar) vs "Noisy Count" (orange bar with noise) for a query like "Count of customers with credit limit > $50,000". True value fixed at 1,247.
- Middle section: epsilon slider (createSlider, range 0.01 to 2.0, step 0.01, default 0.5). Label shows current epsilon value and privacy level text ("Very Strong / Strong / Moderate / Weak" based on epsilon range).
- Bottom section: two summary panels side by side — "Privacy Protection" (shield icon drawn in p5.js, fill level inversely proportional to epsilon) and "Result Accuracy" (target icon with ring fill proportional to epsilon).

Behavior: As epsilon slider changes, the noisy bar height updates using Laplace mechanism simulation (add Laplace(0, sensitivity/epsilon) noise to the true count). Noisy count displayed as a number above the bar. Privacy level text updates: epsilon < 0.1 → "Very Strong Privacy", 0.1–0.5 → "Strong Privacy", 0.5–1.0 → "Moderate Privacy", > 1.0 → "Weak Privacy".

A "Run 10 Queries" button samples 10 noisy results and shows them as small dots above the bar chart, illustrating that the same true count produces different noisy outputs each time — reinforcing the probabilistic nature of the mechanism.

Color: indigo for true values, orange for noisy values, teal for UI chrome. Canvas responds to window resize events.
```

## Related Resources

- [Chapter 3: "Chapter 3: Metadata Management and Data Governance"](../../chapters/03-metadata-management/index.md)
