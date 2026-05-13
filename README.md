# offline-interactive-pages

A knowledge hub of offline but still interactive HTML pages with CSS and JavaScript, Falling under three buckets of single file page (one index.html), multi-page static mini-site (multiple HTML filess), and finally a Single Page App in vanilla JS (one html shell, Multiple Internal Views)

# Offline Interactive Pages

A repository of offline-first interactive technical learning artifacts.

Each artifact is:

- self-contained
- interactive
- polished
- educational
- source-grounded
- runnable offline

Built with:

- HTML
- CSS
- JavaScript

No build step.
No external dependencies.
No framework required.

## Repository Layout

- `docs/` → operating doctrine (rules, style, workflow, archetypes)
- `templates/` → task packet templates and per-archetype skeletons
  - `templates/archetypes/<archetype>/` → starting points for an archetype
- `pages/` → individual artifacts
- `shared/` → copy-paste reference library (tokens, signals, components)
- `scripts/` → audit and smoke-test tooling

## Archetypes

Pages target one of five starting archetypes. See `docs/ARCHETYPES.md` for the
full vocabulary and the performance budget that applies to all of them.

- **Learning** — interactive tutorial / lab (`pages/001`, `pages/007`).
- **Info triage** — sort, filter, tag, score, compare items
  (`pages/008-agent-output-triage-board`).
- **General issue** — explore a problem space or topic area.
- **Specific issue** — one concrete problem rendered as an inspectable
  artifact.
- **Dashboard hub** — synthetic view across multiple data sections
  (`pages/009-developer-command-center`).

Archetypes are a starting vocabulary, not a contract. Combine, hybridize, or
invent as the problem requires; the doctrine constraints in `docs/RULES.md`
and the performance budget in `docs/ARCHETYPES.md` are what stay constant.

## Artifact Pattern

```
pages/
  001-git-rebase-lab/
  002-distributed-systems-lab/
  ...
  008-agent-output-triage-board/
  009-developer-command-center/
```

Each page contains:

- `brief.md` — concept, goal, audience, data shape, required sections
- `sources/` — 1–3 source notes (optional for demo pages with inline data)
- `index.html` — single-file artifact (inline CSS + JS, no external assets)
- `audit.md` — functionality, UX, accuracy, offline, code quality verdict
