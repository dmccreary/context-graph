# Quiz: Metadata Registries and ISO 11179

Test your understanding of formal metadata registries, the ISO 11179 component hierarchy, code lists, versioning, and cross-enterprise standards like UMLS and NIEM.

---

#### 1. Which best defines a metadata registry?

<div class="upper-alpha" markdown>
1. A storage layer that holds raw data values from every source system
2. A discovery tool that automatically crawls data sources to find existing tables
3. A database of metadata definitions that serves as the authoritative source of truth for what data elements mean across an organization
4. A vector index of document embeddings used for semantic search
</div>

??? question "Show Answer"
    The correct answer is **C**. A metadata registry stores authoritative definitions — what each data element means, what values it can hold, and how it relates to other elements. It does not store the data itself (A). It is governance-focused, unlike a discovery-focused catalog (B). It is not a vector index (D).

    **Concept Tested:** Metadata Registry

---

#### 2. In ISO 11179, what is the relationship between an Object Class and a Property?

<div class="upper-alpha" markdown>
1. A Property is the database column that implements an Object Class
2. An Object Class is a real-world concept (like Customer), and a Property is an essential characteristic of that concept (like Annual Revenue); their combination forms a Data Element Concept
3. They are two names for the same ISO 11179 component
4. An Object Class is the data type, and a Property is its allowed range
</div>

??? question "Show Answer"
    The correct answer is **B**. Object Class is the real-world concept and Property is its essential characteristic; together they form a Data Element Concept. Option A confuses the abstract concept with its physical implementation. Option C ignores that they are distinct components. Option D confuses these with value-domain attributes.

    **Concept Tested:** Object Class

---

#### 3. What is the difference between a Conceptual Domain and a Value Domain in ISO 11179?

<div class="upper-alpha" markdown>
1. The Conceptual Domain specifies the set of valid concepts (semantic meaning); the Value Domain specifies the representation — data type, format, range, enumerated values
2. They are identical and only the name differs by jurisdiction
3. The Conceptual Domain stores numeric data; the Value Domain stores text data
4. The Conceptual Domain is mandatory; the Value Domain is optional
</div>

??? question "Show Answer"
    The correct answer is **A**. The Conceptual Domain is the semantic space of valid meanings (independent of any representation), while the Value Domain specifies the concrete data type, format, range, and enumerated values used in a specific system. The other options misstate or confuse the distinction.

    **Concept Tested:** Conceptual Domain

---

#### 4. Which role in a metadata registry reviews submissions, resolves conflicts between competing definitions, and approves final definitions?

<div class="upper-alpha" markdown>
1. The data steward of the consuming system
2. The schema crawler service
3. The registration authority
4. The LLM agent that consumes the registry
</div>

??? question "Show Answer"
    The correct answer is **C**. The registration authority is the body responsible for governing the registry lifecycle: reviewing, resolving, approving, and versioning. Stewards (A) maintain catalog metadata, not registry governance. Crawlers (B) are discovery tools. The LLM (D) is a consumer, not an authority.

    **Concept Tested:** Registration Authority

---

#### 5. Why does the chapter recommend storing code-list identifiers (e.g., the ISO 3166 country code "US") in data fields rather than display labels (e.g., "United States")?

<div class="upper-alpha" markdown>
1. Identifiers compress better than text strings
2. Display labels are forbidden by ISO 11179
3. Identifiers are stable while labels change as categories get renamed or reorganized, and resolving identifier-to-label through the registry keeps the context graph resilient to code-list updates
4. Display labels cannot be stored in graph databases
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter explicitly tips this: store stable identifiers, resolve to current labels via the registry. Compression (A) is incidental. ISO 11179 does not forbid labels (B). Graph databases can store text (D). Stability and resilience are the operative reasons.

    **Concept Tested:** Code List

---

#### 6. Why is data element versioning essential for an LLM that retrieves historical data values?

<div class="upper-alpha" markdown>
1. Because deleting old definitions saves storage
2. Because the LLM must interpret a historical value using the definition that was in force when the value was recorded, not the current definition — otherwise the value is interpreted against rules that did not exist when it was created
3. Because older versions are always more accurate than newer ones
4. Because versioning is required for differential privacy
</div>

??? question "Show Answer"
    The correct answer is **B**. If a value was recorded under definition v2 and the field has since moved to v3, the LLM must use v2 to interpret the historical value correctly. The other options misstate why versioning matters.

    **Concept Tested:** Data Element Versioning

---

#### 7. A federated context graph retrieves the value `annual_revenue = 2100000` from a CRM node. Which mechanism attaches the registry definition (units, time period, version) to that value before passing it to the LLM?

<div class="upper-alpha" markdown>
1. Schema drift detection
2. Graph deduplication
3. Stale edge marking
4. Context binding via a registry lookup
</div>

??? question "Show Answer"
    The correct answer is **D**. Context binding associates a retrieved data value with its authoritative registry definition at query time, so the LLM sees both the value and the rules governing its interpretation. The other options describe unrelated graph hygiene operations.

    **Concept Tested:** Context Binding

---

#### 8. How does a metadata registry differ from a metadata catalog?

<div class="upper-alpha" markdown>
1. A registry defines what data *should* mean and is curated by a registration authority; a catalog is a discovery tool that documents what data *does* mean in current practice and is typically populated by crawlers
2. A registry is automated; a catalog is human-curated
3. A registry only applies to graph data; a catalog only applies to relational data
4. There is no meaningful difference — the terms are interchangeable
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter is explicit: registry is authoritative and curated ("should mean"); catalog is descriptive and discovery-oriented ("does mean"). Option B reverses the typical automation pattern. Option C invents a data-model distinction. Option D ignores their complementary roles.

    **Concept Tested:** Registry vs Catalog

---

#### 9. A healthcare AI team is building a clinical context graph. According to the chapter, what is the most appropriate way to handle canonical concepts for diagnoses, procedures, and medications?

<div class="upper-alpha" markdown>
1. Invent an internal concept hierarchy from scratch to ensure full control
2. Map internal codes to UMLS concept IDs so that the system gains interoperability with any other system that uses UMLS
3. Skip canonical concept identifiers and rely entirely on free-text descriptions
4. Use country-code-style two-letter abbreviations chosen by the AI team
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter recommends using UMLS as the canonical concept registry for biomedical entities — gaining interoperability without reinventing decades of standards work. The other options either duplicate existing work (A), abandon canonicalization (C), or invent ad-hoc identifiers (D).

    **Concept Tested:** UMLS

---

#### 10. A team observes that the CRM, ERP, and HR systems each maintain their own short list of industry codes — 12, 23, and 9 entries respectively, with no shared identifiers. Cross-system reporting and LLM retrieval consistently produce inconsistent counts. Which discipline addresses this problem at its root?

<div class="upper-alpha" markdown>
1. Graph sharding
2. Reference data management governing the shared code lists centrally and propagating changes to every consuming system
3. Knowledge graph embedding training
4. Differential privacy
</div>

??? question "Show Answer"
    The correct answer is **B**. Reference data management is the enterprise discipline that governs shared lookup data — country codes, currencies, industry classifications, and similar code lists — preventing exactly the drift the question describes. Sharding (A), embeddings (C), and differential privacy (D) do not address vocabulary drift.

    **Concept Tested:** Reference Data Management

---
