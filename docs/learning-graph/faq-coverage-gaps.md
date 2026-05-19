# FAQ Coverage Gaps

Concepts from the learning graph not yet covered in `docs/faq.md`.
Organized by priority based on centrality in the learning graph.

Generated: 2026-05-19 | Total concepts: 496 | Covered in FAQ: ~108 | Gaps: ~388

---

## Critical Gaps (High Priority)

High-centrality concepts with many dependencies that should be addressed in FAQ:

### Topic 9 — Decision Traces (gaps)
1. **Trace Completeness** — high centrality; many chapters reference it
   - Suggested: "How do you ensure a decision trace is complete?"
2. **Policy Version Reference** — foundational to compliance chapter
   - Suggested: "How are policy versions tracked in decision traces?"
3. **Trace Replay** — key for audit and debugging
   - Suggested: "What is trace replay and when do you need it?"
4. **Counterfactual Trace** — advanced but high-value audit concept (partially covered)
5. **Real-Time Trace Recording** — architecture decision with high impact
   - Suggested: "How do you capture decision traces in real time without adding latency?"

### Topic 12 — Integrating LLMs (gaps)
6. **Function Calling Pattern** — widely used in chapters 14 and 16
   - Suggested: "What is the function calling pattern for context graph retrieval?"
7. **Structured Output with Context** — important for reliable agent outputs
   - Suggested: "How do you get structured JSON outputs from an LLM using context graph data?"
8. **Prompt Engineering with Context** — high practical relevance
   - Suggested: "What prompt engineering patterns work best with context graph retrieval?"
9. **Few-Shot Context Injection** — Bloom's Apply level, practical
   - Suggested: "What is few-shot context injection and how does it use decision traces?"

### Topic 14 — AI Agent Architecture (gaps)
10. **ReAct Pattern** — fundamental agent loop design
    - Suggested: "What is the ReAct pattern and how does it apply to context graph agents?"
11. **Human-in-the-Loop** — critical for graduated autonomy
    - Suggested: "When and how should humans remain in the loop in context graph workflows?"
12. **Plan-and-Execute Pattern** — widely referenced agent design
    - Suggested: "What is the plan-and-execute pattern for context graph agents?"
13. **Agent Trace** — distinct from decision trace, important for debugging
    - Suggested: "What is an agent trace and how does it differ from a decision trace?"

### Cross-Cutting — LLM Foundations (gaps)
14. **Prompt Injection Risk** — security concern directly relevant to context graph inputs
    - Suggested: "What is prompt injection and how does it threaten context graph systems?"
15. **Context Window Limit** — foundational LLM constraint
    - Suggested: "What is the context window limit and how does it constrain context graph design?"
16. **In-Context Learning** — key mechanism underlying context graph effectiveness
    - Suggested: "What is in-context learning and why does it make context graphs effective?"

---

## Medium Priority Gaps

### Topic 15 — Enterprise Use Cases
17. **Finance Automation Use Case** — concrete example for business readers
18. **Sales Engagement Use Case** — high-value for sales-tool builders
19. **Engineering Incident Use Case** — popular in developer audiences
20. **Legal Compliance Use Case** — important for regulated industries
21. **ARR Definition Conflict** — specific, memorable example of the context problem

### Topic 17 — Market Strategy
22. **Competitive Moat** — strategic concept important for founders
23. **Glue Function** — the "beachhead signal" concept is mentioned but not named precisely
24. **Enterprise AI Market** — macroeconomic context for the book's thesis

### Topic 13 — Graph Data Modeling
25. **Subgraph Extraction** — key retrieval primitive
26. **Context Graph Migration** — practical concern for evolving deployments
27. **Graph Constraint Enforcement** — schema integrity in production
28. **Event-Driven Graph Update** — real-time ingestion pattern

### Topic 6 — Process Mining
29. **Process Discovery** — foundational process mining step
30. **Conformance Checking** — important for detecting workflow deviations
31. **Append-Only Log** — architectural choice with implications for audit
32. **Event Sourcing** — related pattern, important for context-graph ingestion design

### Cross-Cutting — Graph Theory
33. **Centrality Measure** — used for identifying high-priority concepts and entities
34. **Community Detection** — useful for surfacing related decision clusters
35. **Subgraph Matching** — important for pattern-based precedent retrieval
36. **Knowledge Graph Embedding** — connects graph and vector search chapters

---

## Low Priority Gaps

Leaf nodes and highly specialized concepts appropriate for future FAQ updates:

### Topic 1 — Knowledge Graphs and LPGs
37. GraphML, GraphSON serialization formats
38. Open World vs Closed World Assumption
39. Graph Index (implementation detail)

### Topic 5 — Metadata Registries
40. UMLS (domain-specific medical standard)
41. NIEM (government data standard)
42. Dublin Core Metadata
43. Administered Item (ISO 11179 detail)

### Topic 6 — Process Mining
44. CQRS Pattern
45. IEEE XES attribute structure (partially covered)

### Cross-Cutting — Vector Search
46. HNSW Index (implementation detail)
47. Product Quantization
48. BM25 (sparse retrieval)
49. Approximate Nearest Neighbor

### Cross-Cutting — Security
50. Differential Privacy
51. Federated Learning
52. AI Red Teaming

---

## Suggested Additional Questions (Top 10)

Based on the critical gaps above, the highest-value additions to `docs/faq.md` are:

1. "What is the ReAct pattern and how do context graph agents use it?" *(Core Concepts)*
2. "How do you ensure a decision trace is complete?" *(Technical Details)*
3. "What is prompt injection and how does it threaten context graph systems?" *(Common Challenges)*
4. "When and how should humans stay in the loop in context graph workflows?" *(Best Practices)*
5. "How do you capture decision traces in real time without adding latency?" *(Technical Details)*
6. "What is the function calling pattern for context graph tool use?" *(Technical Details)*
7. "What is in-context learning and why does it make context graphs effective?" *(Core Concepts)*
8. "How do you handle a finance exception workflow with context graphs?" *(Best Practices)*
9. "What is a competitive moat in the context graph market?" *(Advanced Topics)*
10. "What prompt patterns work best when injecting context graph data?" *(Best Practices)*
