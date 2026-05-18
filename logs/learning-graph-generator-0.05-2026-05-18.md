# Learning Graph Generator v0.05 — Session Log

**Date:** 2026-05-18
**Textbook:** Context Graph: How Organizations Use LLMs Cost Effectively
**Skill version:** 0.05
**Total concepts:** 496
**Taxonomy categories:** 12

---

## Steps Completed

### Step 1: Course Description Quality Assessment
- Input: `docs/course-description.md`
- Quality score: **92/100**
- 18 topics, all 6 Bloom's taxonomy levels populated
- Minor gap: no explicit "topics excluded" section
- Output: `docs/learning-graph/course-description-assessment.md`

### Step 2: Concept Label Generation
- Generated 496 concept labels in Title Case, max 32 chars
- 18 numbered topics + 5 cross-cutting sections
- Policy applied: open standards included, vendor product names excluded
  - Replacements: dbt → "SQL Transformation Tool", Apache Kafka → "Event Streaming Platform", etc.
  - RDF/SPARQL/Triple Store removed; replaced with "RDF Lacks Scalability"
- Output: `docs/learning-graph/concept-list.md`

### Step 3: Dependency Graph CSV
- Custom Python script `generate-csv.py` with hardcoded 496-entry dependency map
- 8 foundational concepts (no prerequisites):
  - Node (4), Edge (5), Data Lake (56), Metadata (81), Event Log (132),
    LLM Context Window (157), Tacit Knowledge (164), Large Language Model (457)
- Output: `docs/learning-graph/learning-graph.csv`

### Step 4: Quality Validation
- Tool: `analyze-graph.py learning-graph.csv quality-metrics.md`
- Results: Valid DAG ✅, 0 cycles ✅, 0 orphaned nodes ✅, 1 connected component ✅
- Max dependency chain length: 14
- Average dependencies per concept: 1.51
- Terminal nodes: 54.2%
- Output: `docs/learning-graph/quality-metrics.md`

### Step 5: Concept Taxonomy
- 12 categories, all between 5.0% and 13.3%
- No MISC category needed
- Output: `docs/learning-graph/concept-taxonomy.md`

### Step 5b: Taxonomy Names JSON
- Output: `docs/learning-graph/taxonomy-names.json`

### Step 6: Taxonomy Column Added to CSV
- Added `TaxonomyID` column to `learning-graph.csv`
- All 496 concepts classified into one of the 12 taxonomy categories

### Step 7: Metadata JSON
- Output: `docs/learning-graph/metadata.json`
- Title, description, creator (Dan McCreary), date, license (CC BY-NC-SA 4.0)

### Step 8: Color Configuration JSON
- Output: `docs/learning-graph/color-config.json`
- 12 taxonomy IDs mapped to named CSS colors from the recommended palette

### Step 9: Learning Graph JSON
- Command: `python3 csv-to-json.py learning-graph.csv learning-graph.json color-config.json metadata.json taxonomy-names.json`
- Output: `docs/learning-graph/learning-graph.json`
- Contains: metadata, groups (12), nodes (496), edges sections

### Step 10: Taxonomy Distribution Report
- Output: `docs/learning-graph/taxonomy-distribution.md`
- Spread: 8.3% (excellent balance)

### Step 11: Learning Graph Index
- Updated `docs/learning-graph/index.md` with textbook-specific content

### Step 12: MkDocs Nav Update
- Uncommented all 5 learning-graph section entries in `mkdocs.yml`

---

## Issues Encountered and Resolved

1. **Numbering conflict after multi-block edits** — After inserting concepts into Topic 5 and Topic 6 simultaneously, duplicate IDs appeared (129 and 132 both appeared twice). Fixed with full sequential renumber script.

2. **Cycle in dependency graph (concept 487)** — Vector Database was incorrectly made to depend on HNSW Index and Product Quantization, which already depended on it. Fixed by reverting to deps: "266" only.

3. **Disconnected subgraph** — Tacit Knowledge (164) and Implicit Organizational Knowledge (165) formed a 2-node isolated component. Fixed by adding 164 as a dependency of Organizational Knowledge Gap (162).

---

## Key Design Decisions

- **Vendor-neutral**: All named products replaced with generic category names; open standards (IEEE XES, OpenLineage, ISO 11179, GQL, openCypher) retained
- **496 concepts**: Near maximum (500) to give comprehensive coverage of enterprise knowledge graph foundations before context graph content
- **8 foundational roots**: Deliberately sparse to keep the DAG well-connected with a single component
- **Topic ordering**: Foundational infrastructure (graphs, semantic layers, metadata, process mining) placed in Topics 1–6 before context graph content (Topics 7–18)
