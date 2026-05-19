---
title: Registry vs. Catalog Architecture
description: Learners can differentiate the role of a metadata registry (what data should mean) from a metadata catalog (what data does mean) and explain how the two integrate.
status: scaffold
library: vis-network
bloom_level: Analyze (L4)
---

# Registry vs. Catalog Architecture



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: "Chapter 6: Metadata Registries and ISO 11179"](../../chapters/06-metadata-registries/index.md).

```text
Type: graph-model
**sim-id:** registry-vs-catalog
**Library:** vis-network
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: differentiate
Learning Objective: Learners can differentiate the role of a metadata registry (what data should mean) from a metadata catalog (what data does mean) and explain how the two integrate.

Instructional Rationale: Side-by-side network diagrams with distinct visual metaphors are appropriate for the Analyze objective — the contrast in structure (curated vs. comprehensive, authoritative vs. descriptive) maps to the conceptual distinction.

Canvas: responsive width, 500px height. Two panels separated by a vertical divider.

**Left panel — Metadata Registry:**
- Title: "Metadata Registry (authoritative definitions)"
- "Registration Authority" node (gold, box) at top
- "Data Element: Customer Annual Revenue" (indigo, ellipse) — central approved item
- "Data Element Concept: Customer Revenue" (teal, ellipse)
- "Value Domain: Decimal, USD, TTM" (teal, ellipse)
- "Code List: Industry Categories v3" (steel blue, box)
- Edges: Registration Authority → Data Element "approved", Data Element → Data Element Concept "instantiates", Data Element → Value Domain "uses", Data Element → Code List "references"
- Small "Version History" box (gray) attached to Data Element with edge "has-history"

**Right panel — Metadata Catalog:**
- Title: "Metadata Catalog (discovery and documentation)"
- "Crawler Bot" (steel blue, icon-like) at top
- "CRM Table: customers" (gold, ellipse) — discovered dataset
- "Field: annual_revenue" (teal, small ellipse)
- "Field: customer_id" (teal, small ellipse)
- "Quality Score: 0.92" (orange, small box)
- "Owner: Revenue Ops" (green, small box)
- Edges: Crawler Bot → CRM Table "discovered", CRM Table → field nodes "has-field", Field: annual_revenue → Quality Score "has-score", Field: annual_revenue → Owner "owned-by"
- Cross-panel edge: Field: annual_revenue → [Data Element node in Registry panel] "defined-by" (dashed orange edge crossing the divider)

Click on any node: opens infobox with role description and key questions each tool answers.
Click on the cross-panel edge: "This is the integration link between catalog and registry. The catalog field links to the registry's authoritative definition, so any consumer reading the catalog field knows exactly what it means."
```

## Related Resources

- [Chapter 6: "Chapter 6: Metadata Registries and ISO 11179"](../../chapters/06-metadata-registries/index.md)
