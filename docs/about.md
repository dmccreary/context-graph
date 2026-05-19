---
title: "About This Book"
description: "About Context Graph: How Organizations Use LLMs Cost Effectively — its purpose, audience, design, and the team behind it."
---

# About This Book

## Welcome from Nexus

![](./img/mascot/welcome.png){ align="left" width="140px"}
Hello, graph builders. I'm **Nexus**, and I'll be your guide through this
textbook. Context graphs are a new kind of enterprise structure — part
knowledge graph, part memory of the *why* behind every decision your
organization makes. Together we'll trace those decisions across systems,
build precise graph schemas you can actually query, and learn how to fit
them into an LLM's context window for the lowest possible cost.
Let's trace the why!

<div style="clear: both;"></div>

## Why This Intelligent Textbook

The most expensive problem in enterprise AI is no longer the model — it is
the **context** the model is given. Large language models can summarize,
reason, and draft fluent text, but only when they are handed the right
organizational knowledge at the right moment. Today most organizations
solve that problem one prompt at a time, stuffing whatever they can fit
into a context window and hoping for the best. There is no canonical
reference for the discipline that should sit underneath those prompts.
This book exists to define that discipline and to give practitioners a
working blueprint.

**The opportunity is genuinely large:**

- McKinsey estimates generative AI could add **$2.6 to $4.4 trillion**
  in value annually across industries — but the majority of enterprise
  deployments remain stuck in pilot stages, blocked by hallucinations,
  missing context, and brittle integrations[^1].
- Foundation Capital's analysis of the AI market frames the
  trillion-dollar enterprise opportunity not as building better foundation
  models, but as **solving the context problem** — giving models the
  right organizational knowledge at the moment of decision[^2].
- Gartner predicts that **over 40% of agentic AI projects will be
  cancelled** by the end of 2027, citing escalating costs, unclear
  business value, and inadequate risk controls — failure modes that
  largely trace back to missing or unreliable context[^3].
- The Stanford AI Index reports that enterprise generative AI adoption
  has crossed a majority threshold, yet only a small fraction of
  organizations report consistent, production-grade results — a gap
  that reflects the missing layer of persistent, structured context[^4].

**The literature gap is the reason for this book:**

Context graphs as a discipline sit between three mature fields —
knowledge graphs, retrieval-augmented generation (RAG), and process
mining — but no widely available textbook treats them as a unified
practice. Practitioners building this layer today usually stitch
together blog posts, vendor documentation, and trial-and-error. We
believe context graphs deserve a foundational text, and we hope this
book becomes a **pillar reference** that future books, courses, and
products build on.

**What makes this book different:**

Most books on enterprise AI stop at architectural sketches or vendor
walkthroughs. This one is built on a validated learning graph of **496
interconnected concepts** organized into **12 taxonomy categories**,
introduced across **22 chapters** in strict prerequisite order so the
ideas compound rather than collide. It pairs an extensive background on
graph fundamentals, semantic layers, metadata standards, and decision
traces with **precise, queryable graph models** — schemas you can
implement and query directly, not just diagrams to admire. Throughout
the book you will find **interactive MicroSims** that let you manipulate
context-graph behavior in the browser. The entire textbook is **open
source and free** — no paywalls, no access codes, no subscription —
because a foundational discipline needs an accessible foundational
reference.

## How to Use This Book

This textbook is designed for self-paced study. Each chapter builds on
previous material, so reading in order is recommended. The book
includes:

- **22 Chapters** covering graph fundamentals, enterprise knowledge
  graphs, semantic layers, metadata standards, process mining, the
  context problem, decision traces, graph data modeling, LLM
  integration, AI agent architecture, enterprise use cases, compliance
  and audit, market strategy, and organizational adoption.
- **Interactive MicroSims** embedded in chapters — browser-based
  simulations you can manipulate to explore concepts.
- **Annotated References** linking to authoritative sources at the end
  of each chapter.
- **Learning Graph** visualizing **496 concepts** and their
  dependencies across **12 taxonomy categories**.
- **Pedagogical Mascot** — Nexus the Spider — who appears throughout
  the book to flag key insights, warnings, and celebrations.
- **Search** available from any page using the search bar.

The [Learning Graph](learning-graph/index.md) visualizes how concepts
connect across chapters. If you want to explore non-linearly or check
prerequisites for a specific topic, start there. Start the linear
reading path with [Chapter 1: Knowledge Graphs and
LPGs](chapters/01-knowledge-graphs-lpg/index.md).

## About the Author

![](./img/dan-headshot-small.png){ width="150px" align="right"}

Dan McCreary is a semi-retired AI researcher, solution architect, and
educator who has spent more than three decades helping Fortune 100
organizations reason over massive datasets. At Optum he founded the
Generative AI Center of Excellence and led the team that built one of
the world's largest healthcare knowledge graphs — spanning over 25
billion vertices — to unify member, provider, and patient insights.
Dan's deep background in knowledge representation and systems thinking
underpins the precise learning graphs and intelligent textbook workflows
used throughout this book.

He is the co-author of *Making Sense of NoSQL* (Manning Publications),
the founding chair of the NoSQL Now! conference, and a frequent keynote
speaker on semantic search, ontology strategy, and AI hardware. Beyond
industry, Dan has mentored students as a STEM volunteer since 2014 and
now applies the same rigor to building open educational resources. You
can visit the [Intelligent Textbooks Case
Studies](https://dmccreary.github.io/intelligent-textbooks/case-studies/)
to see over 87 textbooks that Dan has created or co-created with other
authors.

**Selected Credentials**

- B.A. in Physics and Computer Science from Carleton College
- M.S.E.E. from the University of Minnesota
- MBA coursework at the University of St. Thomas
- Patent holder in semantic search and ontology management techniques
- Advocate for large-scale Enterprise Knowledge Graph adoption across
  healthcare and education
- Long-time promoter of accessible, low-cost AI-powered learning
  experiences

## How to Cite This Book

If you reference this textbook in academic work, technical papers,
internal architecture documents, or other publications, please use one
of the following citation formats.

**APA (7th edition)**

McCreary, D. (2026). *Context Graph: How Organizations Use LLMs Cost
Effectively*. https://dmccreary.github.io/context-graph/

**Chicago (17th edition)**

McCreary, Dan. 2026. *Context Graph: How Organizations Use LLMs Cost
Effectively*. https://dmccreary.github.io/context-graph/.

**MLA (9th edition)**

McCreary, Dan. *Context Graph: How Organizations Use LLMs Cost
Effectively*. 2026, dmccreary.github.io/context-graph/.

**BibTeX**

```bibtex
@book{mccreary2026contextgraph,
  title     = {Context Graph: How Organizations Use LLMs Cost Effectively},
  author    = {McCreary, Dan},
  year      = {2026},
  url       = {https://dmccreary.github.io/context-graph/},
  note      = {Interactive intelligent textbook}
}
```

To cite a specific chapter, append the chapter number and title — for
example:

McCreary, D. (2026). Chapter 1: Knowledge Graphs and LPGs. In *Context
Graph: How Organizations Use LLMs Cost Effectively*.
https://dmccreary.github.io/context-graph/chapters/01-knowledge-graphs-lpg/

## License

This work is released under the [Creative Commons
Attribution-NonCommercial-ShareAlike 4.0 International License (CC
BY-NC-SA 4.0)](license.md). You are free to share and adapt the
material for non-commercial purposes as long as you give appropriate
credit and share your adaptations under the same license.

## References

[^1]: McKinsey & Company. (2023). *The economic potential of generative
    AI: The next productivity frontier*.
    https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier

[^2]: Foundation Capital. (2024). *AI's Trillion-Dollar Opportunity: The
    Service-as-Software Era*.
    https://foundationcapital.com/ai-service-as-software/

[^3]: Gartner. (2025). *Gartner Predicts Over 40% of Agentic AI Projects
    Will Be Canceled by End of 2027*.
    https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027

[^4]: Stanford Institute for Human-Centered Artificial Intelligence
    (HAI). (2025). *Artificial Intelligence Index Report 2025*.
    https://aiindex.stanford.edu/report/
