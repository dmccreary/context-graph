# CLAUDE.md — Context Graph Textbook

Project: **Context Graph: How Organizations Use LLMs Cost Effectively**
Repo: `dmccreary/context-graph`
Site: <https://dmccreary.github.io/context-graph/>

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

### Do's and Don'ts

**Do:**
- Use Nexus to introduce new topics warmly
- Include the catchphrase in welcome admonitions
- Keep dialogue brief (1–3 sentences)
- Match the pose/image to the content type

**Don't:**
- Use Nexus more than 5–6 times per chapter
- Put mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Nexus's personality or speech patterns
- Use gendered pronouns — always refer to Nexus by name or use "they/them"
