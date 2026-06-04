# Quiz: Knowledge Graphs and Labeled Property Graphs

Test your understanding of the Labeled Property Graph model, its core vocabulary, and how it compares to RDF, relational, and vector store alternatives with these review questions.

---

#### 1. What are the two primitive types from which every graph is constructed?

<div class="upper-alpha" markdown>
1. Nodes and edges
2. Tables and columns
3. Triples and predicates
4. Vectors and embeddings
</div>

??? question "Show Answer"
    The correct answer is **A**. Every graph consists of exactly two primitives: nodes (entities with identity) and edges (directed relationships between nodes). Tables and columns describe the relational model. Triples and predicates describe RDF. Vectors and embeddings describe vector stores. Only nodes and edges form the structural foundation of the Labeled Property Graph model that this book builds on.

    **Concept Tested:** Node and Edge

---

#### 2. Which statement best defines a node label in the LPG model?

<div class="upper-alpha" markdown>
1. A unique identifier that distinguishes one node from every other node in the graph
2. A category tag attached to a node that communicates its semantic role and enables efficient filtering
3. A pointer that stores the physical address of the node's neighbors
4. A property whose value must be drawn from a fixed enumeration declared in the schema
</div>

??? question "Show Answer"
    The correct answer is **B**. A node label is a category tag (such as `Supplier` or `Order`) that communicates the semantic role of the node and lets the database scan only nodes of that type rather than the entire graph. Unique identifiers are separate properties, not labels. Physical pointers are a storage-engine concept (index-free adjacency). Enumerations are schema constraints on property values, not labels themselves.

    **Concept Tested:** Node Label

---

#### 3. In a Labeled Property Graph, where do edge properties live?

<div class="upper-alpha" markdown>
1. In a separate junction table joined to the edge at query time
2. In a reified blank-node structure attached to the relationship
3. Directly on the edge itself as first-class key-value attributes
4. Only on the two endpoint nodes, never on the edge
</div>

??? question "Show Answer"
    The correct answer is **C**. The LPG model treats edge properties as first-class key-value attributes that live directly on the edge object. This means a query that traverses the edge can retrieve its properties in the same step. Junction tables are the relational analogue. Blank-node reification is the RDF workaround for the fact that plain triples cannot carry properties. Storing relationship attributes only on endpoint nodes would lose the semantic association.

    **Concept Tested:** Graph Property

---

#### 4. What is index-free adjacency?

<div class="upper-alpha" markdown>
1. A schema design that eliminates the need for any indexes in the database
2. A storage architecture where edges are physical pointers to endpoint nodes, making each hop a constant-time pointer dereference
3. A query optimization that caches join results across multiple sessions
4. A property of vector stores that allows approximate nearest-neighbor search without a search tree
</div>

??? question "Show Answer"
    The correct answer is **B**. Index-free adjacency means relationships are stored as direct physical pointers to their endpoint nodes, so following an edge costs the same regardless of graph size. Native graph databases still use indexes to locate entry-point nodes; the term refers specifically to edge traversal, not to a database with no indexes at all. The other options describe unrelated mechanisms.

    **Concept Tested:** Graph Database

---

#### 5. Why is the closed world assumption important for enterprise context graphs?

<div class="upper-alpha" markdown>
1. It allows multiple autonomous knowledge graphs to be merged without conflict
2. It guarantees that every node in the graph carries at least one label
3. It ensures that a "not found" query result can be safely interpreted as "not true," enabling reliable automated decisions
4. It forces all queries to scan the entire graph before returning a negative result
</div>

??? question "Show Answer"
    The correct answer is **C**. Under the closed world assumption, the absence of a fact means the fact is false — so a compliance query that returns no matching approval can be treated as "not approved." This is essential for automated decision systems. Option A actually describes the open world assumption of RDF. The other options misstate what the assumption does.

    **Concept Tested:** Closed World Assumption

---

#### 6. Which Cypher pattern correctly matches every Supplier that supplies a Product stocked in a Warehouse?

<div class="upper-alpha" markdown>
1. `SELECT * FROM Supplier JOIN Product JOIN Warehouse`
2. `MATCH (s:Supplier)-[:SUPPLIES]->(p:Product)<-[:STOCKS]-(w:Warehouse) RETURN s, p, w`
3. `FIND Supplier WHERE EXISTS Product WHERE EXISTS Warehouse`
4. `<Supplier> <supplies> <Product> . <Warehouse> <stocks> <Product>`
</div>

??? question "Show Answer"
    The correct answer is **B**. Cypher uses ASCII-art notation — parentheses for nodes, brackets for edge types, and arrows for direction. The pattern reads "a Supplier supplies a Product that is stocked by a Warehouse." Option A is SQL. Option C is invented pseudo-syntax. Option D is SPARQL/RDF triple notation, not Cypher. Only Cypher expresses the multi-hop pattern as a single readable path.

    **Concept Tested:** Cypher Query Language

---

#### 7. A compliance officer asks for "the complete sequence of approvals — including approver names and timestamps — that authorized a $2M contract." Which graph operation produces this answer?

<div class="upper-alpha" markdown>
1. A graph algorithm such as PageRank
2. A single-node lookup using a property index
3. A path query that returns the ordered sequence of nodes and edges between two endpoints
4. A vector similarity search across approval documents
</div>

??? question "Show Answer"
    The correct answer is **C**. The answer required is not a set of matching nodes but the path itself — the ordered chain of approval edges with their properties. Cypher's variable-length path syntax returns this naturally. PageRank computes node influence, not chains. A single-node lookup cannot reconstruct a multi-step chain. Vector similarity finds semantically related text but not causal sequences.

    **Concept Tested:** Path Query

---

#### 8. Why does RDF struggle to scale for enterprise multi-hop queries with edge attributes?

<div class="upper-alpha" markdown>
1. SPARQL cannot express any joins between triples
2. RDF cannot be serialized for transport between systems
3. RDF stores can only hold a few thousand triples before performance collapses
4. Plain RDF triples have no properties, so every edge attribute requires reification into multiple additional triples and a blank node
</div>

??? question "Show Answer"
    The correct answer is **D**. Plain RDF triples are subject-predicate-object only — they have no slot for properties on the relationship. Encoding even one edge attribute like `lead_time_days: 14` requires reifying the relationship into four or more triples plus a blank node, producing verbose graphs that are slow to store and query at scale. SPARQL does support joins, RDF has multiple serialization formats, and RDF stores scale to tens of millions of triples — well beyond a few thousand.

    **Concept Tested:** RDF Lacks Scalability

---

#### 9. How do knowledge graphs and vector stores differ in the type of question they best answer?

<div class="upper-alpha" markdown>
1. Knowledge graphs answer structural and causal questions; vector stores answer semantic-similarity questions
2. Knowledge graphs answer semantic-similarity questions; vector stores answer structural-relationship questions
3. Both answer the same questions, but vector stores are always faster
4. Knowledge graphs only store text; vector stores only store numbers
</div>

??? question "Show Answer"
    The correct answer is **A**. Knowledge graphs encode explicit structural and causal relationships — useful for traversals, audits, and "why" questions. Vector stores index high-dimensional embeddings and find conceptually similar items even when keywords differ. Option B reverses the two. Option C ignores that they answer fundamentally different question types. Option D is incorrect — both can encode many data types. The two technologies are complementary, not competitive.

    **Concept Tested:** Graph vs Vector Store

---

#### 10. An enterprise team is choosing a serialization format to export an LPG into a modern REST-based data pipeline that already processes JSON. Which format is the natural choice?

<div class="upper-alpha" markdown>
1. GraphML, because XML is more human-readable than JSON
2. SPARQL, because it is the standard graph interchange language
3. CSV, because every graph can be flattened to rows
4. GraphSON, because it is JSON-based and integrates naturally with JSON-native pipelines
</div>

??? question "Show Answer"
    The correct answer is **D**. GraphSON is a JSON-based serialization format that fits naturally into JSON-native pipelines and is supported by major LPG databases. GraphML is XML-based and better suited to XML-native tooling. SPARQL is a query language, not a serialization format. CSV cannot natively express edge properties or multi-label nodes without lossy flattening.

    **Concept Tested:** GraphSON

---
