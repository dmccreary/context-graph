# Context Graph: How Organizations Use LLMs Cost Effectively

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/context-graph/)
[![Built with Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Uses Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Read the textbook online at:
**[https://dmccreary.github.io/context-graph/](https://dmccreary.github.io/context-graph/)**

## Overview

**Context Graph: How Organizations Use LLMs Cost Effectively** is an
interactive intelligent textbook on **context graphs** — enterprise graph
data structures designed to get the right content into a large language
model's prompt in the fewest tokens.

Context graphs are structured, persistent records of product data, customer
data, ontologies, and **decision traces** — capturing not just *what*
happened inside an enterprise, but *why* it happened, *who* approved it,
and *which precedents* justified it. The book's core thesis, drawn from
Foundation Capital's analysis of the enterprise AI market, is that the
trillion-dollar opportunity is not in building better foundation models —
it is in solving the **context problem**: giving models the right
organizational knowledge at the right moment so they can reason, decide,
and act on behalf of the business.

The textbook explains what context graphs are, why LLMs desperately need
them to work reliably inside organizations, and how practitioners can
design, build, and deploy them. The focus throughout is **token efficiency
and quality of content returned from an LLM**. Every modeling decision,
retrieval pattern, and architectural choice is evaluated against that pair
of constraints.

This is a **Level 2+ intelligent textbook** in the MkDocs Material format,
with a 496-concept learning graph, interactive MicroSims, precise
queryable graph schemas, and a pedagogical mascot — Nexus the Spider — to
guide readers through the material.

### Who This Book Is For

- **Enterprise architects and senior engineers** designing AI-powered
  systems who need a principled approach to organizational memory and
  context management.
- **AI/ML practitioners and data engineers** building LLM-powered
  applications and struggling with hallucinations, missing context, and
  poor decision quality in agent workflows.
- **Technical product managers and founders** building or evaluating
  products in the enterprise AI space who want a framework for where
  context graphs create durable competitive advantage.

No prior knowledge of graph databases, knowledge graphs, or formal
ontology is required — these are introduced from first principles.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/context-graph.git
cd context-graph
```

### Install Dependencies

This project uses MkDocs with the Material theme. A conda environment is
recommended:

```bash
conda create -n mkdocs python=3.11
conda activate mkdocs
pip install mkdocs mkdocs-material "mkdocs-material[imaging]" mkdocs-glightbox
```

### Serve Locally

Run the site with live reload while you edit:

```bash
mkdocs serve
```

Open your browser to:
[http://127.0.0.1:8000/context-graph/](http://127.0.0.1:8000/context-graph/)

### Build the Static Site

```bash
mkdocs build
```

Output is written to `site/` (gitignored).

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This builds the site and pushes it to the `gh-pages` branch.

### Reading the Book

- Use the **left sidebar** to browse chapters in dependency order.
- Use the **search bar** (top right) to jump to a specific term.
- Open the [Learning Graph](https://dmccreary.github.io/context-graph/learning-graph/)
  to explore how concepts connect across chapters.
- Try the **MicroSims** when you encounter them — they are the fastest
  way to build intuition for a new schema or retrieval pattern.

## Repository Structure

```
context-graph/
├── docs/                                  # MkDocs documentation source
│   ├── index.md                           # Home page
│   ├── about.md                           # About this book
│   ├── course-description.md              # Seed document for the book
│   ├── chapters/                          # 22 chapters in dependency order
│   │   ├── 01-knowledge-graphs-lpg/
│   │   │   └── index.md
│   │   ├── 02-semantic-layers/
│   │   └── ...                            # through 22-security-vector-search
│   ├── sims/                              # Interactive MicroSims
│   │   ├── graph-viewer/                  # Learning graph viewer (vis-network)
│   │   └── decision-trace-schema/         # Schema explorer
│   ├── learning-graph/                    # Concept graph and analysis
│   │   ├── learning-graph.csv             # Concept dependencies
│   │   ├── learning-graph.json            # vis-network format
│   │   ├── concept-list.md                # 496 concepts
│   │   ├── concept-taxonomy.md            # 12 taxonomy categories
│   │   └── quality-metrics.md             # Graph quality report
│   ├── img/
│   │   ├── cover.png                      # Book cover image
│   │   └── mascot/                        # Nexus the Spider pose set
│   ├── css/                               # Theme overrides
│   └── js/                                # KaTeX init, etc.
├── plugins/
│   └── social_override.py                 # Per-page og:image override
├── mkdocs.yml                             # MkDocs configuration
├── CLAUDE.md                              # Project instructions for Claude Code
├── CONTENT-GENERATION-GUIDE.md            # Rules for content generation skills
└── README.md                              # This file
```

## Reporting Issues

Found a typo, broken link, factual error, or have a suggestion?
Please open an issue:

[https://github.com/dmccreary/context-graph/issues](https://github.com/dmccreary/context-graph/issues)

Helpful information to include:

- Page URL or chapter where you found the issue
- What you expected vs. what you saw
- For MicroSims: browser and operating system
- Screenshots when relevant

## How to Cite

If you reference this textbook in academic work, technical papers, or
internal architecture documents, please use one of the following.

**APA (7th edition)**

McCreary, D. (2026). *Context Graph: How Organizations Use LLMs Cost
Effectively*. https://dmccreary.github.io/context-graph/

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

See the [About page](https://dmccreary.github.io/context-graph/about/)
for Chicago and MLA formats and chapter-level citation guidance.

## License

This work is licensed under the [Creative Commons
Attribution-NonCommercial-ShareAlike 4.0 International License (CC
BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [docs/license.md](docs/license.md) for full details.

## Acknowledgements

This project stands on the shoulders of many open-source communities:

- **[MkDocs](https://www.mkdocs.org/)** — Static site generator
  optimized for project documentation.
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** —
  The responsive, accessible theme that powers the textbook.
- **[vis-network](https://visjs.github.io/vis-network/docs/network/)** —
  Network visualization library used for the interactive learning graph.
- **[p5.js](https://p5js.org/)** — Creative coding library used for
  several MicroSims.
- **[KaTeX](https://katex.org/)** — Fast math typesetting in the browser.
- **[Python](https://www.python.org/)** — Used for the learning graph
  generation, quality analysis, and book-management scripts.
- **[Claude Code](https://claude.ai/code)** by Anthropic — AI-assisted
  authoring and skill orchestration.
- **[Claude Skills](https://github.com/dmccreary/claude-skills)** — The
  reusable skill library used to generate chapters, MicroSims, the
  learning graph, the glossary, FAQs, and references.
- **[GitHub Pages](https://pages.github.com/)** — Free hosting for the
  published site.

The book's framing of the "trillion-dollar context window" draws on
[Foundation Capital's analysis](https://foundationcapital.com/ai-service-as-software/)
of the enterprise AI market. Specific industry statistics cited throughout
the book are attributed in each chapter's references section.

## Contact

**Dan McCreary**

- GitHub: [@dmccreary](https://github.com/dmccreary)
- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- Intelligent Textbooks portfolio:
  [dmccreary.github.io/intelligent-textbooks/case-studies/](https://dmccreary.github.io/intelligent-textbooks/case-studies/)

Questions, suggestions, corrections, or collaboration ideas? Open a
[GitHub issue](https://github.com/dmccreary/context-graph/issues) or
reach out on LinkedIn.
