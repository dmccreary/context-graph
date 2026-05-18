# CLAUDE.md — Context Graph Textbook

Project: **Context Graph: How Organizations Use LLMs Cost Effectively**
Repo: `dmccreary/context-graph`
Site: <https://dmccreary.github.io/context-graph/>

## Focus of Textbook

Large organizations want to leverage LLMs to answer questions and generate accurate content.
To do this an LLM needs some additional information placed into the context window.
This book is about using graph databases to get a compact subset of an enterprise knowledge graph into the context window.  It is NOT just about a modeling decisions in a graph, but it
includes many strategies to get the right structures into an LLM in the minimum of tokens.
Any content within an enterprise knowledge graph is a candidate for inclusion into the input prompt.
Since there is an additional cost for both input and output tokens, we seek an optimized solution.

The focus of this book is token efficiency and quality of content returned from an LLM.

# Content Generation Guide

All tasks that generate content such as the chapter content generator should
reference the [CONTENT-GENERATION-GUIDE.md](CONTENT-GENERATION-GUIDE.md).
This guide includes rules about what mascot admonitions will be placed in the chapters.