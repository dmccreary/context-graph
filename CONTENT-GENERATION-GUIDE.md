# Content Generation Guide

This guide governs all AI-generated content for the **Context Graph** intelligent
textbook. Every chapter generator, MicroSim generator, glossary generator, and
quiz generator must read and follow this guide before producing output.

---

## Reading Level

**Target:** Freshman college level (first-year undergraduate or motivated professional
new to the field).

Freshman college readers have general academic fluency but are not yet specialists.
They can handle technical vocabulary when it is introduced carefully, they appreciate
analogies to things they already know, and they respond well to a "here's why this
matters" framing before diving into mechanics.

### Sentence and Paragraph Style

- Average sentence length: **16–22 words**. Mix short punchy sentences (8–12 words)
  with longer explanatory ones for rhythm. Never string three long sentences together
  without a short one to let the reader breathe.
- Average paragraph length: **3–5 sentences**. One main idea per paragraph.
- Use the **active voice** by default. Passive voice is acceptable for emphasis
  ("The approval chain is recorded — not inferred") but should not be the default.
- Avoid multi-clause sentences that require re-reading. If a sentence needs a
  parenthetical inside a clause inside another clause, split it.

### Vocabulary

- Introduce every technical term with a **bold definition on first use**:
  `A **node** is an entity in the graph — a person, server, invoice, or any object
  the organization tracks.`
- After defining a term, use it consistently. Do not alternate between synonyms
  (do not switch between "node" and "vertex" in the same chapter unless explicitly
  teaching that they are equivalent).
- Avoid jargon from adjacent fields (formal ontology, category theory, linear algebra)
  unless the chapter explicitly teaches it. When a concept from another domain is
  needed, introduce it fresh: "In graph theory, a *path* is…"
- **No vendor product names** in explanatory prose. Do not write "Neo4j stores
  this as…" — write "a native graph database stores this as…". Vendor names may
  appear only in comparison tables or explicit market-landscape chapters where the
  point is specifically to name products.
- Spell out acronyms on first use: "Graph Query Language (GQL)" not "GQL" cold.

### Assumed Background

Readers are assumed to have:

- Familiarity with relational databases at the conceptual level (tables, rows, joins)
- Basic programming literacy (can read pseudocode and simple function calls)
- General awareness that LLMs exist and that they respond to prompts
- Business process intuition (approvals, workflows, audit trails)

Readers are **not** assumed to have:

- Graph database experience
- Formal computer science training (no Big-O fluency assumed without introduction)
- Deep ML or AI engineering background
- Knowledge of specific graph products or query languages

---

## Tone

**The voice of this textbook is optimistic, fun, occasionally humorous, and
consistently positive.** Enterprise AI is genuinely exciting — it is one of the
few technical topics where a practitioner can learn something on Monday and deploy
it in a system that saves a company real money on Friday. Write like that matters,
because it does.

### Optimistic

Frame challenges as solvable problems, not as warnings to be afraid of. When
explaining a hard concept, lead with "here's why this clicks once you see it,"
not "this is tricky." When explaining a limitation of a technology, follow
immediately with what fills the gap.

- ✅ "The relational model struggles here — which is exactly why graph databases exist."
- ❌ "The relational model cannot do this, which is a major problem."

### Fun and Occasionally Humorous

Light humor is welcome when it clarifies rather than distracts. Good candidates:

- Analogies that are slightly unexpected but genuinely illuminating
  ("A junction table is the relational database's awkward workaround for a problem
  the graph model solved natively — like renting a storage unit to hold the stuff
  your apartment was designed to hold.")
- Gentle self-aware asides that acknowledge when a concept sounds dry
  ("Yes, 'metadata registry' sounds like something you'd file in triplicate with a
  government agency. Bear with us — this one actually matters.")
- Short rhetorical questions that voice what the reader is probably thinking
  ("Why not just use a spreadsheet? Fair question. Here's where spreadsheets break.")

Avoid:

- Humor at the expense of the reader or of any technology the reader might already use
- Jokes that require insider knowledge to land
- Sarcasm (it reads as condescending in technical text)
- Humor in warning or error-type admonitions (Nexus's warning pose is concerned,
  not jokey)

### Positive and Encouraging

Celebrate progress explicitly. When a chapter covers a genuinely difficult concept,
acknowledge that it is difficult and then say why the reader can handle it. End
sections with forward momentum, not summaries that simply list what was just covered.

- ✅ "You now have everything you need to read a Cypher query cold. Chapter 2
  puts that skill to work at enterprise scale."
- ❌ "In this section, we covered nodes, edges, labels, types, and properties."

Never apologize for the material being what it is. Phrases like "unfortunately,"
"sadly," or "the bad news is" are banned. Replace them with "the trade-off is,"
"this is where it gets interesting," or "here's the constraint worth knowing."

---

## Scaffolding: Define Before You Display

Every non-text element (diagram, table, code block, MicroSim) must be preceded by
prose that defines all technical terms it contains. A reader must never encounter a
term for the first time inside a visual element.

**The three-step pattern for introducing a non-text element:**

1. **Prose** — explain the concept in plain language, defining any terms the
   visual will use.
2. **Bridge sentence** — a one-sentence transition that tells the reader what they
   are about to see and why: "The diagram below shows this relationship for a
   three-node supply chain — hover any edge to see its lead-time property."
3. **Element** — the diagram, table, code block, or MicroSim.

**Tables reinforce; they do not introduce.** Never use a table to introduce new
concepts. The pattern is: explain in prose → then summarize in a table. If a reader
would need to reverse-engineer meaning from table cells, the table is premature.

**Code before explanation is forbidden.** Every code block must be preceded by a
plain-language sentence explaining what the code does and what its key parameters
mean. The explanation comes first; the code is the payoff.

---

## Chapter Structure

Every chapter must follow this skeleton. Sections may be expanded or subdivided
but must not be omitted.

**Frontmatter quoting rule:** Always quote the `title` and `description` values with double quotes. Both fields contain colons, which break YAML parsers when unquoted. Example:
```yaml
title: "Chapter 3: Metadata Management"
description: "How metadata catalogs, data dictionaries, and lineage graphs..."
```

```
1. Frontmatter (YAML)
2. # Chapter N: Title
3. ## Summary  (1–2 sentences, matches the chapter outline)
4. ## Concepts Covered (numbered list, copied from outline)
5. ## Prerequisites (link to course description or earlier chapters)
6. --- (horizontal rule)
7. Nexus welcome admonition
8. ## Introduction  (2–4 paragraphs, motivates the chapter)
9. [Body sections — 5–10 H2 sections, each 300–600 words]
10. ## Summary and Key Takeaways
    - Bulleted checklist of things the reader should now be able to do
    - A collapsible ??? question "Quick Check" challenge
11. Nexus celebration admonition
```

**Word count target:** 4,000 to 7,000 words of prose (excluding frontmatter, headings,
code blocks, and spec `<details>` blocks).  The word could varies with the total number
of concepts covered in each chapter.  Complex concepts need more words to explain the concepts
in a detailed step-by-step manner.

**Non-text elements:** 4–6 per chapter. No more than 4 consecutive paragraphs of
pure prose without a non-text element. Use diverse types — do not repeat the same
element type more than five times per chapter.

---

## Sim Specification Standards

Every `<details markdown="1">` specification block for a diagram, MicroSim,
infographic, chart, or other interactive element must include all of the following
fields. Under-specified sims cause the microsim-generator to make assumptions that
drift from the chapter's intent.

**Required fields (every spec):**

```
Type: [microsim | chart | infographic | graph-model | workflow | timeline | map]
**sim-id:** [kebab-case-directory-name]
**Library:** [p5.js | vis-network | Chart.js | Plotly | Mermaid | vis-timeline | Leaflet]
**Status:** Specified

Bloom Level: [Remember | Understand | Apply | Analyze | Evaluate | Create] (L1–L6)
Bloom Verb: [one verb from the Bloom taxonomy for the chosen level]
Learning Objective: [one sentence: "Learners can [verb] [concept]."]

Instructional Rationale: [one sentence explaining why this interaction pattern
matches the learning objective — e.g., "Step-through is appropriate because the
Understand objective requires learners to trace concrete data transformations."]
```

**Every element must be interactive.** Minimum bar: at least one element the
learner can hover, click, or manipulate that produces visible feedback (tooltip,
infobox, highlight, state change). Static images are forbidden.

**Canvas sizing:** All sims must be responsive to window width. Never hard-code
pixel widths for the container. Height may be fixed (typically 480–520px for
standard sims, up to 600px for complex graph-model sims). Always call
`updateCanvasSize()` as the first line of p5.js `setup()`.

**Mermaid diagrams** are permitted only when every node has a `click` directive
that reveals a definition or explanation in an infobox. A Mermaid diagram with no
click handlers is a static image and is forbidden.

---

## What to Avoid

### Vendor Product Names

Do not name specific commercial products in explanatory prose. Vendor names
are only allowed in:

- Market-landscape chapters (Ch. 12, 19) where naming products is the point
- Comparison tables with a column for "Example Products"
- Parenthetical asides like "(e.g., Neo4j, TigerGraph — see Chapter 19)"

Instead of "Cypher in Neo4j" → write "Cypher" or "a GQL-compatible query language."
Instead of "Collibra's lineage graph" → write "a metadata catalog's lineage graph."

### Decorative Emoji

Do not use emoji as decoration. Per Mayer's coherence principle, decorative
visuals measurably reduce retention even when students find them charming.
Emoji are permitted only when they signal a metaphor the chapter explicitly
teaches — and even then, use them sparingly (once per chapter at most).

### Apology Language

Never apologize for material being complex. Replace:

- "Unfortunately, RDF has a limitation…" → "RDF trades scalability for open-world semantics — here's what that means in practice…"
- "Sadly, there is no silver bullet…" → "No single model handles every query type — which is why the architecture uses both."
- "The bad news is…" → "The trade-off worth knowing is…"

### Forward References Without Scaffolding

Do not reference a concept that hasn't been defined yet without explicitly
flagging it as a preview: "We will define *decision trace* formally in Chapter 9;
for now, think of it as a timestamped record of why a decision was made."

### Passive Voice Overuse

One passive sentence per paragraph is acceptable. More than that signals that
the prose needs to be rewritten with a clearer subject. Ask: "Who or what is
doing this action?" and make it the subject of the sentence.

---

## Learning Mascot: Nexus the Spider

### Mascot File Index

The canonical files for this mascot. When editing any of these, update the
others in the same turn so they stay in sync.

| File | Purpose |
|------|---------|
| [`docs/img/mascot/character-sheet.md`](docs/img/mascot/character-sheet.md) | Canonical identity document (name, species, colors, voice). Source of truth. |
| [`docs/img/mascot/image-prompts.md`](docs/img/mascot/image-prompts.md) | Self-contained AI prompts for regenerating each pose. |
| [`docs/img/mascot/neutral.png`](docs/img/mascot/neutral.png) | Default / general-purpose pose. |
| [`docs/img/mascot/welcome.png`](docs/img/mascot/welcome.png) | Chapter-opening pose. |
| [`docs/img/mascot/thinking.png`](docs/img/mascot/thinking.png) | Key-concept pose. |
| [`docs/img/mascot/tip.png`](docs/img/mascot/tip.png) | Hint / helpful-guidance pose. |
| [`docs/img/mascot/warning.png`](docs/img/mascot/warning.png) | Common-mistake / pitfall pose. |
| [`docs/img/mascot/encouraging.png`](docs/img/mascot/encouraging.png) | Difficult-content / struggle pose. |
| [`docs/img/mascot/celebration.png`](docs/img/mascot/celebration.png) | End-of-chapter / achievement pose. |
| [`docs/css/mascot.css`](docs/css/mascot.css) | Custom admonition styles for the seven pose contexts. |
| [`docs/learning-graph/mascot-test.md`](docs/learning-graph/mascot-test.md) | Rendering test page that exercises every admonition style. |

### Character Overview

- **Name**: Nexus
- **Species**: Spider
- **Personality**: Curious, precise, quietly enthusiastic, patient
- **Catchphrase**: "Let's trace the why!"
- **Visual**: Small round-bodied spider, deep indigo/blue-purple body, warm orange accents, round glasses, modern flat vector style

### Voice Characteristics

- Uses clear, technical language without unnecessary jargon
- Frames concepts through graph metaphors (nodes, edges, traces, connections)
- Refers to readers as "graph builders" or "context architects"
- Signature phrases: "Let's trace the why!", "Every node tells a story.", "Connect the dots — then ask why."
- Nexus's voice matches the overall textbook tone: optimistic, encouraging, occasionally wry — never sarcastic or condescending

### Mascot Admonition Format

Always place mascot images in the admonition body, never in the title bar:

```markdown
!!! mascot-welcome "Title Here"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Nexus waving welcome">
    Admonition text goes here after the img tag.
```

**Image path depth:** The `src` path is relative to the rendered page URL.
Count directories from the rendered page to `docs/img/mascot/`:

- Chapter page at `chapters/01-foo/index.md` → `../../img/mascot/`
- Learning-graph page at `learning-graph/foo.md` → `../../img/mascot/`
- Top-level page at `docs/foo.md` → `img/mascot/`

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept | mascot-thinking | 2–3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Difficult content | mascot-encourage | Where students may struggle |
| Section / chapter completion | mascot-celebration | End of major sections |

### Chapter 1 Special Rule

The **first** mascot admonition in Chapter 1 is a self-introduction. Nexus must:

1. State their name and one personality detail in a warm first-person voice.
2. Enumerate all six pose-roles as a numbered list (one sentence each).
3. Close with a contract sentence that Nexus is a signal, not decoration.

This self-introduction appears **only once** in the entire textbook. Chapters 2+
open with a normal `mascot-welcome` admonition that goes straight into
chapter-specific content — never repeat the self-introduction.

### Do's and Don'ts

**Do:**

- Use Nexus to introduce new topics warmly, matching the optimistic textbook tone
- Include the catchphrase in welcome admonitions
- Keep each admonition to 1–3 sentences of body text
- Match the pose image to the content type
- Write Nexus's dialogue in the same voice as the surrounding prose — fun, clear, encouraging

**Don't:**

- Use Nexus more than 5–6 times per chapter
- Put mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Nexus's personality or speech patterns between chapters
- Use gendered pronouns — always refer to Nexus by name or use "they/them"
- Use Nexus's warning pose for humor — it should feel genuinely helpful, not jokey
