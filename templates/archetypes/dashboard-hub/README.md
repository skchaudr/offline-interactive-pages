# Archetype: dashboard-hub

The artifact is a synthetic view across several related signals. The reader
scans, optionally narrows, then drills into a specific panel.

## When to pick this

- The reader wants a control surface that shows multiple data sections at once.
- Each panel is small (a list, a sparkline, a KPI strip, a note area).
- The reader's job is awareness or quick action, not deep learning.

If the reader is sorting a pile of items, pick **info-triage**. If the reader
is being taught a topic, pick **learning**.

## What ships in the skeleton

- Inline design tokens + dark-mode media query.
- ~25 LOC signals primitive.
- Sticky sidebar nav with anchor links.
- Top header with title, last-refresh meta, scope filter chips (`all | mine |
  team`).
- Status strip (3 KPI stats).
- One full-width overview panel.
- Three side-by-side panels: queue list, canvas sparkline, persistent notes.
- localStorage persistence of notes.
- Canvas trend renders at correct device pixel ratio and re-renders on resize.

## How to use

1. Copy `skeleton.html` to `pages/NNN-<slug>/index.html`.
2. Change `<title>`, the `<h1>`, and the sidebar nav labels.
3. Change `STORAGE_KEY`.
4. Replace `SEED` with your real inline JSON. Update panel renderers if the
   field names change.
5. Replace or add panels. Each panel = one `<section class="panel">` plus a
   `subscribe(...)` call wired to one render function.
6. Update `filterByScope` if your scope axis changes.
7. Add a `brief.md` (use `brief.md` in this folder as the starting shape) and
   `audit.md`.
8. Run `node scripts/audit-pages.mjs` and `node scripts/smoke-pages.mjs`.

## Performance budget

- Panels each have their own renderer. Reassigning one state key fires only
  the relevant render, not the whole page.
- Canvas sparkline reads `clientWidth` and the device pixel ratio so it stays
  crisp on retina and after resize without using SVG.
- Notes textarea persists on every keystroke. If the notes get long enough
  that per-keystroke `setItem` becomes visible in the Performance panel, debounce
  to 200ms — but only when the budget actually fails, not preemptively.

## Reactivity model

Signals. Treat each panel as an independent subscriber. To add a panel:

```js
state.myPanel = SEED.myPanel;
subscribe(['myPanel', 'scope'], renderMyPanel);
```

`renderMyPanel` should only touch its panel's DOM, never the whole page.
