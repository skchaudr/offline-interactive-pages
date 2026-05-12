# Archetype: info-triage

The artifact is a sortable, filterable, taggable surface for a set of inputs.
The reader's job is to decide what to do with each item.

## When to pick this

- The reader is facing a pile of similar items (PRs, agent outputs, bug
  reports, candidate options, design alternatives).
- They need to filter / sort / search / categorize, then mark a decision per
  item.
- Decisions should persist across reload.

If the reader is being taught a concept, pick **learning** instead. If they
want a synthetic view of multiple data streams, pick **dashboard-hub**.

## What ships in the skeleton

- Inline design tokens + dark-mode media query.
- ~25 LOC signals primitive (Proxy + per-key subscribers).
- Top counts strip (total, visible, per-decision).
- Search input, sort select, tag-filter select.
- Category chip row.
- Item grid with per-item action buttons.
- localStorage persistence of decisions under `triage-skeleton-state`.

## How to use

1. Copy `skeleton.html` to `pages/NNN-<slug>/index.html`.
2. Change `<title>` and the `<h1>`.
3. Change `STORAGE_KEY` to something unique to your page.
4. Replace `SEED_ITEMS` with your real inline JSON. Keep fields named the same
   or update both the data and the renderers.
5. Rename the decision verbs in `setDecision` calls (and the counts strip) if
   `keep` / `defer` / `drop` don't fit. Update CSS modifier classes
   `.tag-keep`, `.tag-defer`, `.tag-drop` to match.
6. Add a `brief.md` (use `brief.md` in this folder as the starting shape) and
   `audit.md`.
7. Run `node scripts/audit-pages.mjs` and `node scripts/smoke-pages.mjs`.

## Performance budget

- Item count: tested smooth up to ~200 items. Beyond that, consider
  windowing (`IntersectionObserver`) or paginating.
- Each subscriber re-renders only its slice (`renderGrid`, `renderCounts`,
  `renderCategoryChips`). Do not collapse them into a single whole-page
  re-render.
- Avoid heavy work inside the search `input` handler. The current
  implementation is O(items) per keystroke, which is fine until the seed grows
  past ~1000 items.

## Reactivity model

The skeleton uses the signals primitive. Each state key has its own
subscribers; only the affected DOM region updates per change. If you outgrow
this (e.g., you need item-level reactivity rather than re-rendering the whole
grid), shift to a keyed update strategy — but do it inside the same
`renderGrid` function, not by adding a framework.
