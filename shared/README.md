# shared/

Copy-paste reference library for building pages. Nothing here is loaded at
runtime — the doctrine in `docs/RULES.md` requires every page to be a single
self-contained `index.html` with inline CSS and inline JS. The files here exist
so agents and humans don't have to re-derive the same patterns.

## Layout

- `tokens.css` — design tokens (color, spacing, radius, shadow) converged
  across `pages/001`–`pages/007`. Drop the whole `:root { ... }` block (plus
  the dark-mode media query) into a page's `<style>`. Component snippets here
  reference these variable names, so keep the names stable.
- `signals.js` — ~50 LOC reactive primitive. Paste the body of `createStore`
  into a page's inline `<script>` when the page benefits from many subscribers
  reacting to a small state object (info-triage, dashboard-hub).
- `components/` — one HTML file per pattern. Each file contains the markup,
  the CSS it expects, and the JS that wires it up. Inline whatever you need
  into the target page.

## Components

| File | Pattern | Source |
| --- | --- | --- |
| `components/tabs.html` | Tab group with active panel | `pages/001`, `pages/007` |
| `components/accordion.html` | Collapsible disclosure section | `pages/006` |
| `components/copy-button.html` | Clipboard copy with feedback | `pages/001`, `pages/003` |
| `components/quiz.html` | Drill card with localStorage progress | `pages/001` |
| `components/command-chip.html` | Inline keyboard / command pill | All pages |
| `components/card.html` | Surface wrapper for grouped content | All pages |
| `components/code-block.html` | Code sample with caption + copy overlay | All pages |

## How to use a snippet

1. Open the component file in `shared/components/`.
2. Copy the markup into the page's body where you want it.
3. Copy the `<style>` block into the page's `<style>`. The tokens it references
   already exist if you inlined `tokens.css`.
4. Copy the `<script>` block into the page's inline `<script>`. If multiple
   pages share a key (e.g., `QUIZ_STORAGE_KEY`), give each page its own value.
5. Run `node scripts/audit-pages.mjs` and `node scripts/smoke-pages.mjs`.

## Archetype skeletons

`templates/archetypes/<archetype>/skeleton.html` files compose several of these
components into a working scaffold for an archetype. Clone a skeleton, change
content, ship. See `docs/ARCHETYPES.md`.

## What does not belong here

- Anything that requires a build step.
- Anything that assumes a CDN, npm package, or framework.
- Page-specific code. If a snippet only makes sense for one page, leave it
  there.
