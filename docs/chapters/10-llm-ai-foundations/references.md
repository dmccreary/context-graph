# References: LLM and AI Foundations

1. [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia - Comprehensive overview of LLM architecture, training objectives, parameter scale, and emergent capabilities — directly foundational for this chapter's explanation of why enterprise-specific knowledge must be injected at inference time rather than assumed from training data.

2. [Transformer (deep learning architecture)](https://en.wikipedia.org/wiki/Transformer_(deep_learning_architecture)) - Wikipedia - Explains the transformer architecture, multi-head attention mechanism, and positional encoding — supporting this chapter's practitioner-level treatment of how transformers process context windows and why long-context quadratic cost is bounded in practice.

3. [Attention Mechanism (machine learning)](https://en.wikipedia.org/wiki/Attention_mechanism_(machine_learning)) - Wikipedia - Covers the attention mechanism that enables transformers to relate any token to any other token in the context — directly supporting this chapter's explanation of why context window position matters and how the model attends to retrieved graph context.

4. *Hands-On Large Language Models* - Jay Alammar, Maarten Grootendorst - O'Reilly Media - Chapters 1–6 cover transformer internals, tokenization, prompting strategies, temperature and sampling parameters, and fine-tuning — providing practical depth for all major LLM mechanics introduced in this chapter.

5. *LLM Engineer's Handbook* - Paul Iusztin, Maxime Labonne - Packt - Covers prompt engineering for production systems, few-shot prompting, instruction tuning, function calling, and evaluation metrics including faithfulness scoring — directly supporting this chapter's treatment of prompt anatomy and LLM evaluation for context graph systems.

6. [Prompt Engineering](https://en.wikipedia.org/wiki/Prompt_engineering) - Wikipedia - Defines prompt engineering techniques including system prompts, zero-shot and few-shot prompting, and in-context learning — directly supporting this chapter's section on the control interface for context-graph-powered LLM systems.

7. [Hallucination (artificial intelligence)](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)) - Wikipedia - Covers LLM hallucination patterns, causes, and mitigation — directly relevant to this chapter's treatment of faithfulness scoring as the primary evaluation metric for grounded enterprise decision support systems.

8. [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) - Lewis et al., arXiv - The original RAG paper introducing retrieval-grounded generation — foundational reference for this chapter's function calling section showing how agents interact with context graph APIs to conduct interactive multi-hop retrievals.

9. [Token (language model)](https://en.wikipedia.org/wiki/Token_(language_model)) - Wikipedia - Explains tokenization, vocabulary sizes, and token count estimation — directly supporting this chapter's two practical implications of tokenization for context graph assembly: token budget management and compact serialization of graph data.

10. [AI Alignment](https://en.wikipedia.org/wiki/AI_alignment) - Wikipedia - Covers RLHF and instruction tuning as alignment techniques that produce helpful, honest, and calibrated model behavior — supporting this chapter's explanation of why modern instruction-tuned models hedge appropriately when context is insufficient, which is the desired behavior for enterprise decision support.
