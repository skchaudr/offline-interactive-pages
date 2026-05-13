# Archetypes

A starting vocabulary for HTML artifacts in this repo. Not a taxonomy. When a
problem feels like it wants an HTML interface, pick the archetype that fits,
combine two, invent a sixth, or ignore the list entirely. The point is to skip
re-deriving patterns that already proved themselves in `pages/001`–`pages/007`.

The doctrine constraints (`docs/RULES.md`) and the performance budget always
apply. Everything else here is a default you can override.

## Performance budget (hard rail)

Every archetype targets:

- Interaction-to-next-paint under ~16ms for normal interactions.
- No long tasks (>50ms) on common interactions.
- No layout thrash, no full-page re-renders for small state changes.
- No jank on scroll.

If a chosen approach can't hit the budget on the demo data set, change the
approach. Performance is the non-negotiable. Spot-check with the DevTools
Performance panel before declaring a page done.

## Reactivity tiers

Two defaults; pick whichever fits, or use something else if it suits better.

- **Document-style**: a single `state` object plus a `render()` function, with
  targeted DOM updates. Good for pages where state is small and changes are
  punctual. Reference: `pages/001-git-rebase-lab/index.html:618-827`.
- **Signals-style**: the ~50 LOC Proxy primitive in `shared/signals.js`. Good
  for pages where many derived views must stay synced (filter + sort + tag +
  count, or multiple dashboard panels). Inline the primitive — the single-file
  rule forbids `<script src=...>`.

A page can mix: signals for the data-heavy region, plain event listeners for a
copy button or a tab.

## The five archetypes

### 1. Learning artifact

**Purpose**: teach a topic via an interactive tutorial/lab.

**Signature layout**: left nav of sections, main content area, each section
holds explainer prose + interactive demo + drills.

**Default reactivity**: document-style.

**Default components**: tabs, accordion, copy-button, code-block, quiz,
progress-tracker, command-chip.

**Persistence**: localStorage for quiz/progress.

**Reference**: `pages/001-git-rebase-lab/index.html`,
`pages/007-pi-harness-build-path-lab/index.html`.

**Use when**: you want to explain a concept, give the reader something to poke
at, and verify understanding with drills.

### 2. Info triage

**Purpose**: sort, filter, tag, score, compare a set of inputs. The reader is
deciding what to do with a pile of items.

**Signature layout**: top filter/sort/search bar; main grid or list of items;
optional detail pane.

**Default reactivity**: signals (`filter`, `sort`, `query`, `tags`, `items`).

**Default components**: card, command-chip, copy-button, tabs.

**Persistence**: localStorage for filter state, tags, scored decisions.

**Use when**: the artifact's job is to help the reader decide which items
matter and act on them — agent output triage, PR review queues, bug triage,
candidate scoring, design option comparison.

**Skeleton**: `templates/archetypes/info-triage/skeleton.html`.

### 3. General issue

**Purpose**: explore a problem space, a class of bugs, or a topic area where
the goal is mental modeling, not step-by-step learning.

**Signature layout**: section nav with conceptual chapters; mix of explainer,
diagrams, and small interactive demos that test the mental model.

**Default reactivity**: document-style (similar to learning).

**Default components**: tabs, accordion, card, code-block, command-chip,
diagram canvas (SVG inline).

**Use when**: the topic isn't a procedure (so quizzes don't fit) but is broad
enough that the reader benefits from poking at sub-questions inside a guided
shell. Examples: "what is back-pressure", "how do feature flags interact with
caching", "operator model of an agent harness".

### 4. Specific issue

**Purpose**: one concrete problem — a bug, a ticket, a design question, a
production incident — rendered as an inspectable artifact.

**Signature layout**: header with metadata (status, severity, owners), problem
description, repro steps, hypothesis space (toggleable), evidence panels,
decision/next-step section.

**Default reactivity**: document-style.

**Default components**: card, copy-button, code-block, tabs (for hypothesis
branches), accordion (for evidence).

**Persistence**: localStorage for the reader's notes/marks.

**Use when**: the artifact is the durable, shareable form of a specific
investigation. Sometimes embeds a mini-dashboard for related metrics.

### 5. Dashboard hub

**Purpose**: organized control surface that synthesizes multiple data sections
into one view.

**Signature layout**: top status strip; grid of panels (each panel = one
concern); sticky sidebar nav for jumping between panel groups.

**Default reactivity**: signals (one store, many panel subscribers).

**Default components**: card, command-chip, copy-button, tabs.

**Persistence**: localStorage for panel layout, collapsed states.

**Use when**: the reader benefits from seeing several related signals at once
— developer command centers, project status, release readiness, system
overview. Data is inline JSON so the page stays offline.

**Skeleton**: `templates/archetypes/dashboard-hub/skeleton.html`.

## Hybrid and ad-hoc

Hybrid pages are fine. A specific-issue page can embed a tiny dashboard. A
learning artifact can include a triage exercise. If none of the five fit, write
the archetype that does and add it to this doc when the pattern stabilizes.

## Component pool

`shared/components/` holds copy-paste-ready HTML+CSS+JS snippets extracted from
the existing pages. The library is reference-only — pages stay single-file.
Each component is one self-contained `.html` file showing the markup, the CSS
it needs, and the JS that wires it up.

| Component | File | Source pattern |
| --- | --- | --- |
| Tabs | `shared/components/tabs.html` | `pages/001`, `pages/007` |
| Accordion | `shared/components/accordion.html` | `pages/006:382-495` |
| Copy button | `shared/components/copy-button.html` | `pages/001`, `pages/003` |
| Quiz card | `shared/components/quiz.html` | `pages/001:618-827` |
| Command chip | `shared/components/command-chip.html` | All pages |
| Card | `shared/components/card.html` | All pages |
| Code block | `shared/components/code-block.html` | All pages |

Design tokens live in `shared/tokens.css` and the signals primitive in
`shared/signals.js`. Inline them into each page — do not link.
