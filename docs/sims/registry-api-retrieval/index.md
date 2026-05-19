---
title: Registry API Retrieval Flow
description: Learners can implement a registry-aware retrieval step by tracing how a field value and its authoritative registry definition are combined before being passed to an LLM.
status: implemented
library: p5.js
bloom_level: Apply (L3)
---

# Registry API Retrieval Flow



<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: "Chapter 6: Metadata Registries and ISO 11179"](../../chapters/06-metadata-registries/index.md).

```text
Type: microsim
**sim-id:** registry-api-retrieval
**Library:** p5.js
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: implement
Learning Objective: Learners can implement a registry-aware retrieval step by tracing how a field value and its authoritative registry definition are combined before being passed to an LLM.

Instructional Rationale: A step-through animation with concrete API request and response payloads is appropriate for the Apply objective — seeing the actual JSON structures at each step prepares learners to implement a similar pattern in their own retrieval pipelines.

Canvas: responsive width via updateCanvasSize() first in setup(). Height: 500px. White background with light panel borders.

Layout (four horizontal stages, left to right):
1. "LLM Query" panel: shows incoming query "What is Acme Corp's annual revenue?"
2. "Context Graph" panel: shows retrieved node — Customer {id: ENT-00441872, annual_revenue: 2100000, revenue_field_id: DE-CUST-REV-002}
3. "Registry API" panel: shows API call "GET /registry/data-elements/DE-CUST-REV-002" and response JSON:
```json
{
  "id": "DE-CUST-REV-002",
  "name": "Customer Annual Revenue USD TTM",
  "version": "3.2",
  "definition": "Recognized revenue in USD for trailing 12 months",
  "value_domain": {"type": "decimal", "units": "USD"},
  "approved": "2024-01-15"
}
```
4. "Grounded Context" panel: shows the combined payload sent to the LLM:
```
Field: annual_revenue = 2,100,000
Definition: Recognized revenue in USD for trailing 12 months
Units: USD | Version: 3.2 | As of: 2024-01-15
```

Animation: clicking "Next Step" button illuminates each panel in sequence, with an orange animated arrow moving left to right. Current step highlighted in indigo border.

Step labels below: "Step 1: Query received", "Step 2: Field retrieved from context graph (with registry ID)", "Step 3: Registry API called for definition", "Step 4: Value + definition combined into grounded context".

A "Why this matters" toggle button reveals a text box: "Without the registry lookup, the LLM receives only '2100000' with no context about units, time period, or whether it is gross or net revenue. With the registry definition, the LLM can answer accurately and caveat appropriately if the definition changed."

Canvas responds to window resize.
```

## Related Resources

- [Chapter 6: "Chapter 6: Metadata Registries and ISO 11179"](../../chapters/06-metadata-registries/index.md)
