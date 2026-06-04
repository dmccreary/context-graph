# References: The Context Problem and RAG Limitations

1. [Retrieval-Augmented Generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) - Wikipedia - Defines RAG architecture, its retrieval and generation stages, and enterprise applications — directly foundational for this chapter's analysis of what RAG can and cannot do for organizational AI tasks.

2. [Hallucination (artificial intelligence)](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)) - Wikipedia - Explains AI hallucination as generation of plausible but unsupported content, distinguishing random from systematic hallucination — supporting this chapter's treatment of the missing context failure mode as a driver of predictable enterprise hallucination patterns.

3. [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia - Covers LLM architecture, context windows, and inference mechanics — providing the foundational context for this chapter's explanation of why context windows are working memory, not long-term memory, and why grounding is an engineering problem.

4. *Hands-On Large Language Models* - Jay Alammar, Maarten Grootendorst - O'Reilly Media - Chapters 8–11 cover RAG architecture, embedding retrieval, context window management, and grounding strategies — directly supporting this chapter's detailed analysis of RAG's five failure modes in enterprise settings.

5. *LLM Engineer's Handbook* - Paul Iusztin, Maxime Labonne - Packt - Covers production RAG pipeline design, context window management, staleness handling, and retrieval quality evaluation — providing practical depth for this chapter's sections on context freshness and context poisoning.

6. [Prompt Engineering](https://en.wikipedia.org/wiki/Prompt_engineering) - Wikipedia - Explains prompt construction techniques including context injection, few-shot examples, and retrieval grounding — providing background for this chapter's discussion of context assembly as the mechanism that converts a general LLM into an enterprise reasoning engine.

7. [Tacit Knowledge](https://en.wikipedia.org/wiki/Tacit_knowledge) - Wikipedia - Defines tacit knowledge as expertise that is difficult to articulate or document, explaining why it cannot be captured by document retrieval — directly supporting this chapter's section on the tacit knowledge gap as a fundamental RAG limitation.

8. [Token (language model)](https://en.wikipedia.org/wiki/Token_(language_model)) - Wikipedia - Explains tokenization and context window size in language models, supporting this chapter's treatment of context window capacity as a finite resource that requires careful management for enterprise multi-source retrieval.

9. [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) - Lewis et al., arXiv - The original RAG research paper introducing the architecture, providing the academic foundation for this chapter's treatment of RAG's capabilities and the subsequent analysis of where the original design falls short for enterprise organizational knowledge.

10. [Intelligent Agent](https://en.wikipedia.org/wiki/Intelligent_agent) - Wikipedia - Covers AI agent architectures including memory structures, perception, and action — supporting this chapter's distinction between short-term memory (context window) and long-term memory (context graph) in enterprise agent design.
