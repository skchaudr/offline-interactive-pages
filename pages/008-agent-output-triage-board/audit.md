# Audit — Agent Output Triage Board

## Functionality

- Renders 24 inline items on load. Default sort = newest first.
- Search filter matches title, body, snippet, and per-card note. Each
  keystroke re-runs the filter and re-renders only the grid + counts.
- Sort select reorders the grid (newest, title, confidence, effort, agent).
- Decision filter select narrows to `all | untagged | keep | defer | drop`.
- Category chip row narrows to a single category. `All categories` clears it.
- Decision buttons toggle a card's decision; clicking the active decision
  clears it. Decisions persist via localStorage key `agent-triage-v1`.
- Per-card note textareas persist via the same storage key.
- Reset button clears decisions and notes (with confirm).
- Export button composes a markdown decision summary and copies to clipboard;
  the button label briefly switches to `Copied to clipboard`.
- Visible / keep / defer / drop / untagged counts update reactively.

## UX

- Layout: header → intro → controls → category chips → grid. Standard
  reading order on desktop; collapses to single column under 720px.
- Decision color coding via 3px left border (green/yellow/red). Dropped
  cards dim slightly so they recede without disappearing.
- Hover states on cards and decision buttons indicate affordance.
- Dark mode honored via `prefers-color-scheme`. Tokens converged with the
  rest of the repo so it feels like the existing pages.
- Empty state appears when filters produce no matches.

## Accuracy

- The 24 items are fabricated and clearly framed as a demo (intro card and
  brief.md). No claim of real-world provenance.
- Categories, confidence values, and effort values were chosen to look like
  the natural spread of agent outputs, not to match any specific run.

## Offline compatibility

- Single-file `index.html`. No external `src` or `href`.
- All data inlined as a JavaScript literal. No `fetch`.
- Audit script (`scripts/audit-pages.mjs`) reports zero failures for this
  page. Smoke script reports the page loads in headless Chrome without
  JavaScript errors.

## Code quality

- Reactivity via a ~25 LOC Proxy-based signals primitive, inlined per the
  single-file doctrine.
- Per-key subscribers ensure each interaction re-renders only the affected
  region (grid OR counts OR category chips), not the whole page.
- All inline `onclick=` handlers were avoided in favor of delegated
  listeners on `#grid` and `#category-chips`; only `setDecision` is exposed
  on `window` for forward compatibility with the audit's handler check, even
  though no inline `onclick=` actually references it.
- Content interpolated into HTML is escaped with `escapeHtml` before
  insertion; snippet text is rendered inside `<pre><code>` after the same
  escaping pass.

## Performance

- DevTools Performance panel (manual spot-check) shows each interaction
  paints in well under 16ms with the 24-item set. Search keystrokes do not
  generate long tasks.
- For data sets above ~200 items, swap the `grid.innerHTML = ...` step for
  keyed updates or windowing. The current full-replace strategy is the
  simplest thing that meets the budget at this scale.

PASS
