# References: Integrating LLMs with Context Graphs

1. [Retrieval-Augmented Generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) - Wikipedia - Defines RAG architecture and retrieval mechanisms — foundational for this chapter's hybrid retrieval pattern combining graph traversal, vector search, and BM25 into a unified pipeline that outperforms any single retrieval mechanism.

2. [Embedding (machine learning)](https://en.wikipedia.org/wiki/Embedding_(machine_learning)) - Wikipedia - Explains vector embeddings, cosine similarity, and approximate nearest-neighbor search — directly supporting this chapter's dense vector retrieval sections, the multi-signal relevance ranking using embedding similarity scores, and the reranking step.

3. [Prompt Engineering](https://en.wikipedia.org/wiki/Prompt_engineering) - Wikipedia - Covers prompt design techniques including system prompts, few-shot examples, chain-of-thought, and structured output formats — directly relevant to this chapter's prompt engineering patterns for context-graph-powered LLM applications.

4. *Hands-On Large Language Models* - Jay Alammar, Maarten Grootendorst - O'Reilly Media - Chapters 9–12 cover retrieval-augmented generation, hybrid search, context window management, and output validation — providing detailed implementation guidance for all five stages of this chapter's LLM integration pattern.

5. *LLM Engineer's Handbook* - Paul Iusztin, Maxime Labonne - Packt - Covers BM25 sparse retrieval, reciprocal rank fusion for hybrid search, reranking with cross-encoders, context compression, and structured output patterns — matching this chapter's complete retrieval and ranking stack.

6. [Hallucination (artificial intelligence)](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)) - Wikipedia - Covers hallucination mitigation strategies including grounding, chain-of-thought prompting, and faithfulness evaluation — supporting this chapter's output validation section and the chain-of-thought with context prompt engineering pattern.

7. [Vector Database](https://en.wikipedia.org/wiki/Vector_database) - Wikipedia - Explains vector database architectures including HNSW indexes and nearest-neighbor query execution — directly relevant to this chapter's vector embedding retrieval stage and the approximate nearest-neighbor component of the hybrid retrieval pipeline.

8. [Information Retrieval](https://en.wikipedia.org/wiki/Information_retrieval) - Wikipedia - Covers information retrieval fundamentals including TF-IDF, BM25, precision/recall trade-offs, and ranking algorithms — foundational for this chapter's BM25 sparse retrieval section and the reciprocal rank fusion merging approach.

9. [Graph Traversal](https://en.wikipedia.org/wiki/Graph_traversal) - Wikipedia - Explains BFS and DFS traversal algorithms and multi-hop path following — directly supporting this chapter's graph traversal retrieval stage and the multi-hop retrieval patterns for finding precedents through entity relationship chains.

10. [Intelligent Agent](https://en.wikipedia.org/wiki/Intelligent_agent) - Wikipedia - Covers AI agent architectures and tool use patterns — supporting this chapter's function calling section where LLM agents call context graph retrieval tools interactively, making multiple targeted retrieval calls as they reason through complex decisions.
