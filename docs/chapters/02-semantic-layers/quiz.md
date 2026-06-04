# Quiz: Semantic Layers for Data Lakes

Test your understanding of how semantic layers, glossaries, naming standards, and federation turn raw enterprise data into a trustworthy foundation for AI systems.

---

#### 1. What is a data lake?

<div class="upper-alpha" markdown>
1. A centralized storage repository that holds raw data in its native format until it is needed
2. A schema-on-write warehouse that enforces strict typing before any data is stored
3. A graph database used to record decision traces across departments
4. A federated query engine that joins data from multiple cloud providers
</div>

??? question "Show Answer"
    The correct answer is **A**. A data lake accepts data as-is in its native format and defers cleaning and transformation until read time (schema-on-read). Schema-on-write warehouses are the opposite model. Option C describes a context graph, not a data lake. Option D describes query federation, which sits above the lake rather than being the lake itself.

    **Concept Tested:** Data Lake

---

#### 2. What is the primary purpose of a semantic layer?

<div class="upper-alpha" markdown>
1. To compress raw files before they are written into a data lakehouse
2. To replace SQL with a proprietary query language designed for AI agents
3. To translate physical database concepts into business concepts and enforce consistent definitions across every consumer
4. To execute machine learning models against high-dimensional embedding vectors
</div>

??? question "Show Answer"
    The correct answer is **C**. A semantic layer sits between raw storage and end users (or LLMs) and translates physical concepts (tables, columns, foreign keys) into business concepts (metrics, dimensions, entities). It enforces a single agreed-upon definition for terms like "revenue" so that every consumer gets the same answer. The other options describe unrelated technologies.

    **Concept Tested:** Semantic Layer

---

#### 3. In semantic layer terminology, which best defines a business metric?

<div class="upper-alpha" markdown>
1. A categorical attribute used to slice or filter measurements
2. A quantitative measurement with a precise, agreed-upon formula that answers a specific business question
3. A foreign key column that links two physical tables together
4. A storage tier optimized for high-frequency analytical workloads
</div>

??? question "Show Answer"
    The correct answer is **B**. A business metric is a quantitative measurement with a precise definition — "total recognized revenue," "30-day active users," "average order value." Categorical attributes (option A) are dimensions, not metrics. Foreign keys (option C) are a relational schema concept. Storage tiers (option D) are an infrastructure concept unrelated to semantic definitions.

    **Concept Tested:** Business Metric

---

#### 4. What is an undocumented join?

<div class="upper-alpha" markdown>
1. A join that the database optimizer rewrites internally for performance
2. A join condition that exists in someone's head or a years-old notebook but was never recorded anywhere the data catalog can find
3. A join that is permitted only after the database administrator approves it
4. A join between two columns of incompatible data types
</div>

??? question "Show Answer"
    The correct answer is **B**. An undocumented join is one whose path exists in tribal knowledge but is not recorded in any metadata system. When the original developer leaves, the join becomes a mystery. The other options describe valid database concepts but do not match the chapter's definition.

    **Concept Tested:** Undocumented Join

---

#### 5. What is the main difference between a business glossary and a data dictionary?

<div class="upper-alpha" markdown>
1. A business glossary defines what concepts mean in business terms; a data dictionary documents what every physical column contains
2. A business glossary lists physical columns; a data dictionary lists business concepts
3. A business glossary stores SQL queries; a data dictionary stores Cypher queries
4. They are identical artifacts under two different names
</div>

??? question "Show Answer"
    The correct answer is **A**. A business glossary answers "what does this concept mean?" in plain business language. A data dictionary answers "what is in this column?" at the technical level — data type, valid values, source, owner. Option B reverses the two. Option C invents a query-language distinction. Option D ignores the genuine separation of business and technical metadata.

    **Concept Tested:** Business Glossary

---

#### 6. A retail analyst sees that the finance dashboard reports $4.2M in revenue last quarter while the sales dashboard reports $3.9M. Which semantic layer construct, applied across both systems, would have prevented this divergence?

<div class="upper-alpha" markdown>
1. A larger data lakehouse with faster Parquet files
2. A virtual view backed by a canonical metric definition shared by both dashboards
3. A column naming standard that renames `gross_revenue` to `revenue`
4. A schema-on-read configuration in each source system
</div>

??? question "Show Answer"
    The correct answer is **B**. A virtual view backed by one canonical metric definition forces both dashboards to read from the same agreed-upon formula, producing one consistent number. A bigger lakehouse (A) only solves storage. Renaming columns (C) is helpful but does not enforce the calculation. Schema-on-read (D) is a storage strategy, not a definition-consistency mechanism.

    **Concept Tested:** Virtual View

---

#### 7. Why is vocabulary alignment important when building a context graph from multiple source systems?

<div class="upper-alpha" markdown>
1. It improves Parquet compression ratios in the underlying lakehouse
2. It maps different terms used by different systems ("contact," "account," "ticket submitter") to a shared canonical vocabulary so the same real-world entity does not appear as multiple nodes
3. It removes the need for naming convention standards
4. It allows SPARQL queries to be translated into Cypher automatically
</div>

??? question "Show Answer"
    The correct answer is **B**. Vocabulary alignment ensures that different words for the same real-world entity collapse into one canonical concept, preventing the same customer from appearing as three different nodes in the context graph. Compression (A) is unrelated. Naming standards remain necessary (C). SPARQL-to-Cypher translation (D) is a separate problem.

    **Concept Tested:** Vocabulary Alignment

---

#### 8. What does query federation provide that a single-database query cannot?

<div class="upper-alpha" markdown>
1. ACID transactional guarantees on a single data warehouse
2. Automatic compression of result sets before they reach the client
3. The ability to query multiple independent data sources through one unified interface, without physically moving the data first
4. A guarantee that all queries complete in constant time regardless of data size
</div>

??? question "Show Answer"
    The correct answer is **C**. Query federation lets a single query reach across multiple independent systems — a cloud warehouse, an on-prem database, an API, a file store — and assemble results without first copying data into one place. ACID semantics (A) are a single-database property. Compression (B) and constant-time guarantees (D) are not what federation provides.

    **Concept Tested:** Query Federation

---

#### 9. A team is choosing between a metric store and a SQL-based semantic layer. Their highest priority is maximum compatibility with their existing BI tools and any LLM that can generate SQL. Which option fits best?

<div class="upper-alpha" markdown>
1. A SQL-based semantic layer, because every SQL-capable tool can query it without learning a proprietary syntax
2. A metric store using a proprietary REST-only API
3. An OLAP cube tool exposing only MDX queries
4. A vector database with embedding-based retrieval
</div>

??? question "Show Answer"
    The correct answer is **A**. A SQL-based semantic layer exposes definitions as SQL-compatible views, so any SQL-capable BI tool or SQL-generating LLM can query it immediately. A proprietary REST-only API (B) limits compatibility. MDX-only OLAP (C) excludes most modern tools. A vector database (D) does not provide structured metric semantics. Maximum tool compatibility points clearly to SQL.

    **Concept Tested:** SQL-Based Semantic Layer

---

#### 10. A discovery tool reports a statistically probable join between two `id` columns in unrelated systems. What is the safest action before encoding this join in the semantic layer?

<div class="upper-alpha" markdown>
1. Encode the join immediately so analysts can start using it
2. Reject the join because automated discovery is never reliable
3. Replace the join with a vector similarity search instead
4. Validate the proposed join with a domain expert before canonicalizing it, since plausible-but-wrong joins produce silent, expensive errors
</div>

??? question "Show Answer"
    The correct answer is **D**. Join path discovery tools can find statistically plausible-but-wrong joins, especially in messy lakes where integer `id` ranges are reused across unrelated systems. Validation by a domain expert is the prescribed safeguard before canonicalizing the join. Encoding it immediately (A) propagates silent errors. Discovery is useful, not useless (B). Vector similarity (C) does not answer the join-correctness question.

    **Concept Tested:** Join Path Discovery

---
