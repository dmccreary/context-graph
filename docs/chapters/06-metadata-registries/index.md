---
title: "Chapter 6: Metadata Registries and ISO 11179"
description: "Formal standards for enterprise metadata: the six ISO 11179 components, registration authorities, naming conventions, code lists, reference data management, and how registries feed context graphs."
generated_by: claude skill chapter-content-generator
date: 2026-05-18 14:55:00
version: 0.08
---

# Chapter 6: Metadata Registries and ISO 11179

## Summary

Explores formal standards for enterprise metadata: the six ISO 11179 components, registration authorities, naming conventions, code lists, reference data management, UMLS, and NIEM.

## Concepts Covered

This chapter covers the following 28 concepts from the learning graph:

1. Metadata Registry
2. ISO 11179 Standard
3. Data Element
4. Data Element Concept
5. Conceptual Domain
6. Value Domain
7. Object Class
8. Property (ISO 11179)
9. Permissible Value
10. Data Definition
11. Authoritative Source
12. Registry Entry
13. Administered Item
14. Registration Authority
15. ISO 11179 Naming Convention
16. Data Element Versioning
17. Concept Harmonization
18. Registry Search API
19. Context Binding
20. Registry vs Catalog
21. Data Standardization
22. Reference Data Management
23. Code List
24. Unit of Measure Registry
25. Cross-Enterprise Data Dictionary
26. Metadata Thesaurus
27. UMLS
28. NIEM

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Metadata Management](../03-metadata-management/index.md)
- [Chapter 4: Enterprise Knowledge Graphs — Core Patterns](../04-enterprise-knowledge-graphs/index.md)
- [Chapter 5: Graph Theory, Algorithms, and Advanced Enterprise KG](../05-graph-theory-algorithms/index.md)

---

!!! mascot-welcome "The grammar book for your graph's vocabulary."
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waves welcome">
    Welcome to Chapter 6! You know what metadata *is* from Chapter 3. Now we learn where authoritative metadata *lives* — in formal registries governed by international standards. This is the chapter that prevents the most insidious failure mode in enterprise AI: two systems using the same word to mean different things. Let's trace the why!

## Introduction

Consider a seemingly simple question: what does the field `customer_status` mean? In the CRM system it might hold values like "active," "prospect," and "churned." In the billing system, the same field might hold "current," "delinquent," and "suspended." In the ERP, it might hold numeric codes 1, 2, and 3 with no documentation. All three systems have a field called `customer_status`. None of them agree on what the field means, what values are valid, or how those values relate to each other.

Multiply this problem by thousands of fields across dozens of systems, and you have the vocabulary crisis that plagues most large organizations. An LLM querying multiple systems for customer information will encounter `customer_status = "active"` from the CRM and `customer_status = 1` from the ERP and have no reliable way to determine whether these are the same fact. The context graph can link these two values through a shared canonical concept — but only if that canonical concept exists somewhere and is authoritative.

That is what **metadata registries** provide: a single, authoritative, formally governed record of what every data element means, what values it can hold, and what real-world concept it represents. This chapter explains the international standard for metadata registries (ISO 11179), the components of a registry, and how a registry integrates with a context graph to give LLMs a reliable vocabulary for enterprise reasoning.

## What Is a Metadata Registry?

A **metadata registry** is a database of metadata definitions that serves as the authoritative source of truth for the meaning of data elements across an organization. It is not a data catalog (though the two are related — we will contrast them shortly). A metadata registry does not store data itself; it stores the definitions of data — the rules about what data elements mean, what types they have, what values are permitted, and how they relate to each other.

Think of a metadata registry the way you might think of a legal definitions section in a contract. Before the substantive clauses, most contracts include a section that says "In this agreement, 'Customer' means..., 'Revenue' means..., 'Delivery Date' means...". Without those definitions, the rest of the contract is ambiguous. A metadata registry is that definitions section, scaled to the entire enterprise and made machine-readable.

Every entry in a registry is called a **registry entry** or an **administered item**. "Administered" means that the item has a defined lifecycle — it is submitted, reviewed, approved, published, and eventually superseded or retired through a formal governance process. This lifecycle is what makes a registry different from a wiki or a spreadsheet: the definitions in a registry are not opinions, they are authoritative rulings with a traceable approval history.

The **registration authority** is the body (team, committee, or individual) responsible for governing the registry: reviewing submissions, resolving conflicts between competing definitions, approving final definitions, and managing the versioning lifecycle. A well-run registration authority makes the registry trustworthy. A registry without an active registration authority becomes stale and loses credibility, eventually reverting to the same ad hoc vocabulary chaos it was supposed to solve.

A **data definition** is the prose description of what a data element means — not just a label, but a precise, unambiguous statement that resolves any reasonable question about interpretation. A good data definition for `customer_revenue_usd` would specify: what time period the revenue covers (trailing 12 months), what currency (USD, post-FX conversion), what revenue types are included (recognized revenue only, excluding deferred), and what the source of record is (billing system batch processed at end of month). That is the standard of precision a registry entry should meet.

## The ISO 11179 Standard

The international standard for metadata registries is **ISO/IEC 11179** (commonly called ISO 11179), published by the International Organization for Standardization. ISO 11179 specifies a conceptual framework, a data model, and implementation requirements for metadata registries. It is the foundation on which most enterprise-grade metadata registries are built, and understanding its components is the key to understanding how formal metadata governance works.

ISO 11179 defines six core components that, together, fully characterize a data element. These components are a hierarchy: the most abstract (Object Class, Property, Conceptual Domain) describe concepts in the real world; the most concrete (Data Element, Value Domain, Permissible Values) describe how those concepts are represented in a specific information system.

Before we examine each component, here is the organizing intuition: a data element is the intersection of a thing (object class) and a characteristic of that thing (property), expressed in a specific representation (value domain). A data element is never just a field name — it is a triple: what kind of thing does this field describe, what aspect of that thing does it capture, and what format does it use to capture it?

### Object Class

An **object class** is a concept or category of real-world things about which data is recorded. Object classes in an enterprise context include: Customer, Employee, Product, Contract, Invoice, Incident, Facility, Transaction. An object class is not a database table — it is the business concept that one or more tables might represent. Multiple tables across multiple systems might store data about the object class Customer.

### Property

A **property** (in the ISO 11179 sense) is an essential characteristic of an object class — an aspect of the thing that is worth measuring or recording. For the object class Customer, properties might include: Legal Name, Annual Revenue, Primary Industry, Contract Start Date, Geographic Region. A property is domain-agnostic: it describes the concept, not any specific system's representation of it.

### Data Element Concept

A **data element concept** is the combination of an object class and a property: it is the abstract idea that a data element is designed to capture. "Customer Annual Revenue" is a data element concept — it combines the object class Customer with the property Annual Revenue. The data element concept says *what* is being described; it does not yet say *how* it is represented in a system.

### Conceptual Domain

A **conceptual domain** is the set of valid concepts that a data element concept can take on. For a Boolean property like "Is Customer Active," the conceptual domain is {True, False}. For a categorical property like "Customer Industry," the conceptual domain is the set of all valid industry categories (however that set is defined). The conceptual domain is the semantic space of valid meanings — again, independent of any particular representation format.

### Value Domain

A **value domain** is the representation of a conceptual domain — it specifies the data type, format, range, and enumerated values that are valid for a specific data element in a specific information system. For "Customer Annual Revenue," the value domain specifies: data type = decimal, units = USD, minimum = 0, maximum = none. For "Customer Industry," the value domain specifies: data type = string, enumerated values = {Technology, Manufacturing, Healthcare, Finance, Retail, Other}, controlled by code list CL-INDUSTRY-v2.

### Data Element

A **data element** is the fully specified atomic unit of metadata: an object class combined with a property, expressed with a specific value domain. It is the thing that actually appears in a database column, an API field, or a report. "Customer Annual Revenue in USD (Trailing 12 Months, Recognized)" is a data element — it specifies not just what is being measured (Customer Annual Revenue) but exactly how it is being measured and represented.

The power of this hierarchy is that it separates the business meaning (Data Element Concept) from the system representation (Value Domain). When the CRM system and the ERP system both have a "Customer Revenue" field with different formats and different value ranges, both can be linked to the same Data Element Concept — making cross-system comparison possible even when the representations differ.

#### Diagram: ISO 11179 Component Hierarchy

<iframe src="../../sims/iso11179-hierarchy/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive vis-network diagram showing the six ISO 11179 components and their relationships, with a worked example</summary>
Type: graph-model
**sim-id:** iso11179-hierarchy
**Library:** vis-network
**Status:** Specified

Bloom Level: Remember (L1)
Bloom Verb: identify
Learning Objective: Learners can identify all six ISO 11179 components and state the relationship between each adjacent pair in the hierarchy.

Instructional Rationale: A hierarchical vis-network graph is appropriate for the Remember objective — each component is a node, the hierarchy is visualized as top-to-bottom edges, and clicking each node reveals its definition and a concrete example, reinforcing recall through active engagement.

Canvas: responsive width, 520px height. White background.

Layout: Two side-by-side columns. Left column: abstract ISO 11179 component hierarchy (top-to-bottom). Right column: worked example ("Customer Annual Revenue") showing the concrete instance of each component at the corresponding level.

**Left column nodes** (abstract, indigo theme):
- "Object Class" (top, large)
- "Property" (below, large)
- "Data Element Concept" (center, highlighted gold — the combination of the above two)
- "Conceptual Domain" (below Data Element Concept)
- "Value Domain" (below Conceptual Domain)
- "Data Element" (bottom, large — the fully specified unit)

**Right column nodes** (example, teal theme, same vertical positions):
- "Customer" (aligns with Object Class)
- "Annual Revenue" (aligns with Property)
- "Customer Annual Revenue" (aligns with Data Element Concept)
- "{Monetary amounts ≥ 0}" (aligns with Conceptual Domain)
- "Decimal, USD, trailing 12mo" (aligns with Value Domain)
- "Customer_Annual_Revenue_USD_TTM" (aligns with Data Element — the actual field name)

Horizontal dashed edges connect each abstract node to its example node.
Vertical solid edges connect each abstract node to the next in the hierarchy.
Two merging edges from Object Class + Property → Data Element Concept.
Two merging edges from Data Element Concept + Value Domain → Data Element.

Click on each abstract node: displays infobox with ISO 11179 definition and one additional worked example.
Click on each example node: displays infobox explaining how this specific value was derived from the abstract concept.

Physics: hierarchical layout, top-to-bottom, left and right columns anchored to fixed x positions.
</details>

## Permissible Values and Code Lists

A key practical output of ISO 11179 registry work is the formalization of **permissible values** — the complete list of valid values that a categorical data element can hold. Without a formal list of permissible values, teams invent their own values, resulting in the `customer_status` chaos described in the introduction.

A **code list** is a managed set of permissible values for a data element, each code accompanied by a formal definition and a unique identifier. Code lists are governed: new values must be submitted to the registration authority, reviewed for uniqueness and clarity, approved, and published. Deprecated values are not deleted — they are marked as retired and kept in the registry so that historical data using them can still be interpreted correctly.

**Reference data management** is the enterprise-wide practice of governing code lists and other shared lookup data — country codes, currency codes, product categories, industry classifications, unit of measure definitions. Reference data is used by every system in the enterprise, which means that a change to a code list (adding a value, renaming a value, deprecating a value) must be propagated to every consuming system. Without central management, code lists drift: the HR system has 12 industry codes, the CRM has 23, the ERP has 9, and none of them match the codes in the public regulatory reporting schema.

A **unit of measure registry** is a specialized code list for measurement units — kilograms, USD, meters, hours, transactions per second. In a large organization with global operations and diverse technical systems, unit confusion is a genuine operational risk. A quantity in one system is expressed in metric units; a downstream system assumes imperial. A price in one system is in local currency; an aggregation assumes USD. A unit of measure registry assigns a canonical identifier to every unit used in the enterprise and requires that every numeric data element in the registry specify its unit by referencing the registry.

!!! mascot-tip "Link your data elements to code list identifiers, not text strings."
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Nexus giving a tip">
    A common implementation mistake is to store the display label of a code list value ("United States") in the data field rather than the code list identifier ("US" or "840" for the ISO 3166-1 numeric code). Labels change — countries get renamed, categories get reorganized — but identifiers are stable. When an LLM retrieves a field value, it should get the identifier and resolve it to the current label via the registry, not hardcode the label. This makes the context graph resilient to code list updates.

## Naming Conventions and Versioning

ISO 11179 specifies naming conventions for data elements to ensure that names are unambiguous, consistent, and parseable. The standard naming pattern for a data element is:

`[Object Class] [Qualifier] [Property] [Representation]`

So "Customer Annual Revenue USD Amount" follows the pattern: Object Class = Customer, Qualifier = Annual, Property = Revenue, Representation = USD Amount. This structured naming makes it possible to programmatically parse a data element name and identify its components — useful for automated schema matching and ontology mapping.

**Data element versioning** is the lifecycle mechanism that tracks changes to data element definitions over time. When the business definition of a data element changes — say, "Annual Revenue" is redefined to include deferred revenue — the old definition must not simply be overwritten. The registry must create a new version of the data element with an updated definition and a version history, while keeping the old version accessible so that historical data labeled with the old definition can be correctly interpreted.

Versioning is not optional for enterprise AI applications. An LLM retrieving a field value that was recorded under an old definition of the data element must be able to access the definition that was in force when the value was recorded — not the current definition. The context graph stores the version of each data element definition in effect at the time each piece of data was created, making temporally correct interpretation possible.

**Concept harmonization** is the process of aligning definitions across registries — either within a single organization (harmonizing the CRM registry definition with the ERP registry definition for the same concept) or across organizations (aligning a company's internal data definitions with an industry standard schema or a regulatory reporting schema). Concept harmonization is one of the most time-consuming activities in enterprise metadata management, but it pays dividends in the form of reliable cross-system reporting and trustworthy LLM context.

## Registry vs. Catalog: A Critical Distinction

Registry and catalog are terms that are often used interchangeably, but they serve distinct purposes and should not be conflated.

A **metadata catalog** (covered in Chapter 3) is primarily a discovery tool: it helps data consumers find datasets, understand their schemas, and assess their quality. A catalog is typically populated by automated crawlers that scan data sources and extract technical metadata, supplemented by human-entered business metadata. Catalogs are comprehensive — they aim to document everything in the data estate. They are not necessarily authoritative on what data *should* mean; they document what it *does* mean in current practice.

A **metadata registry** is primarily a governance tool: it defines what data *should* mean, enforces that definition across all systems, and maintains an authoritative record of every formally approved definition. A registry is curated — it contains only definitions that have been reviewed and approved by the registration authority. Registries are not necessarily comprehensive (you might only register the most critical shared data elements), but what they do contain is authoritative.

The two tools are complementary. The catalog surfaces what data exists; the registry defines what it means. In a well-integrated architecture, the catalog links its entries to registry definitions, so that every cataloged dataset is annotated with the authoritative registry definitions for its fields. The context graph consumes from both: it uses the catalog to understand the current data landscape and the registry to ground semantic interpretation.

#### Diagram: Registry vs. Catalog Architecture

<iframe src="../../sims/registry-vs-catalog/main.html" width="100%" height="582px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive vis-network diagram contrasting the roles of a metadata registry and a metadata catalog in an enterprise architecture</summary>
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
</details>

## Cross-Enterprise Standards: UMLS and NIEM

The metadata registry pattern extends beyond individual enterprises to cross-enterprise and cross-sector standardization. Two examples illustrate how this works in practice — one from healthcare, one from government — because these domains have done the most rigorous work on shared vocabulary standards.

The **Unified Medical Language System (UMLS)** is a comprehensive collection of biomedical vocabularies, terminologies, and standards produced by the United States National Library of Medicine. UMLS contains millions of medical concepts, their synonyms across dozens of medical terminologies, and the relationships between concepts. For a healthcare organization building a knowledge graph, UMLS provides a ready-made canonical concept registry for clinical entities: diagnoses, procedures, medications, anatomical structures. Instead of building a medical concept hierarchy from scratch, an organization maps its internal codes to UMLS concept IDs and gains interoperability with any other system that does the same.

The **National Information Exchange Model (NIEM)** is a shared data model for information exchange between government agencies. It defines authoritative schemas for entities like Person, Organization, Location, Incident, and Activity, with formal data element definitions, code lists, and governance processes. A government agency exchanging data with other agencies can use NIEM to ensure that its data elements mean the same thing to all consumers — even when those consumers use completely different internal systems.

Both UMLS and NIEM illustrate an important principle for enterprise context graphs: where a standards body has already done the work of formally defining a domain's vocabulary, use their definitions rather than inventing your own. The context graph's entity nodes should reference canonical concept IDs from the relevant standards, enabling interoperability with other systems that use the same standards and giving LLMs a shared reference point for semantic interpretation.

**A metadata thesaurus** is a controlled vocabulary that captures not just definitions but synonymy relationships: which terms mean the same thing, which terms are broader or narrower than others, and which terms are related but not synonymous. A metadata thesaurus for an enterprise might specify that "client," "customer," and "account" are synonyms for the canonical term "Customer" — so that an LLM searching for customer data does not miss results indexed under alternative terms.

## Registry Search API and Context Binding

For a metadata registry to be useful to automated systems and LLM applications, it must expose a programmatic interface. A **registry search API** allows consuming systems to look up data element definitions, retrieve code list values, resolve synonyms, and check the authoritative definition for a field before processing it. An LLM retrieval pipeline that encounters an unfamiliar field name can query the registry API, receive the canonical definition and value domain, and incorporate that definition into its context before generating a response.

**Context binding** is the mechanism by which a context graph associates a retrieved data value with its registry definition at query time. When the context graph retrieves the value `annual_revenue = 2100000` from a CRM node, context binding attaches the relevant registry entry: "Data Element: Customer Annual Revenue in USD (Trailing 12 Months, Recognized Revenue Only), version 3.2, approved 2024-01-15." The LLM receives the value and the definition together, enabling it to reason correctly about what the number means — including whether the definition in force when the value was recorded matches the current definition.

A **cross-enterprise data dictionary** is the aggregation of multiple domain registry entries into a single queryable resource. Within a large organization, different business units may maintain separate registries for their domain-specific data elements. The cross-enterprise data dictionary federates these registries into a unified search experience: a data consumer can search for "revenue" and see all revenue-related data elements from all domain registries, with their definitions, value domains, and provenance clearly indicated.

#### Diagram: Registry API Retrieval Flow

<iframe src="../../sims/registry-api-retrieval/main.html" width="100%" height="602px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive step-through MicroSim showing how an LLM retrieval pipeline uses the registry API to ground a field value with its definition</summary>
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
</details>

## Summary and Key Takeaways

Metadata registries are the grammar books for enterprise knowledge graphs. Without them, every field in every system is a claim without a definition — and LLMs drawing on those fields reason from ambiguous inputs to ambiguous outputs. With a properly governed registry, every data element has a canonical identity, a precise definition, a managed set of permissible values, and a versioned lifecycle that allows historical data to be correctly interpreted.

By the end of this chapter, you should be able to:

- Define a **metadata registry** and distinguish it from a metadata catalog
- Name and define all six **ISO 11179 components** (Object Class, Property, Data Element Concept, Conceptual Domain, Value Domain, Data Element) and explain how they relate to each other
- Explain the roles of the **registration authority**, **registry entry**, and **administered item** in a governed registry lifecycle
- Describe how **permissible values**, **code lists**, and **reference data management** prevent vocabulary drift across systems
- Explain why **data element versioning** is necessary for historically correct LLM interpretation
- Describe the purpose of a **registry search API** and how **context binding** uses it during LLM retrieval
- Explain how **UMLS** and **NIEM** serve as cross-enterprise registry standards in their respective domains

??? question "Quick Check"
    An enterprise data team discovers that the `customer_revenue` field in the CRM system maps to Data Element Concept "Customer Annual Revenue" in the metadata registry, and so does the `acct_rev` field in the ERP system — but their value domains are different (CRM uses trailing 12-month recognized revenue in USD; ERP uses calendar-year billed revenue in local currency). An LLM agent retrieves both fields for the same customer and adds them together. What went wrong, and how would proper context binding have prevented it?

    *(Answer: The LLM treated two fields with different value domains as if they measured the same thing — double-counting and mixing time periods and currency. Proper context binding would have attached each field's full registry definition (time period, revenue type, currency) to the retrieved value before sending it to the LLM. The LLM could then detect the incompatibility, flag it, and request clarification rather than silently summing incompatible quantities.)*

!!! mascot-celebration "Chapter 6: Complete!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Nexus celebrating">
    You now have a precise vocabulary for precise data. The ISO 11179 framework might have sounded bureaucratic at first, but you have seen why it is essential: without formal data definitions, enterprise AI makes confident claims from ambiguous inputs. Chapter 7 takes us from static metadata to dynamic process: how organizations record what actually happened — process mining, data lineage, and provenance — the living history of enterprise activity. Let's trace the why!

[See Annotated References](./references.md)
