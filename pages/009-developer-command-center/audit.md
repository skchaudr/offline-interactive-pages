# Audit — Developer Command Center

## Functionality

- Renders sidebar with 8 anchor links, refresh button, reset button.
- Renders header with title, last-refresh timestamp, scope chip group.
- Renders 5-stat status strip computed from filtered data.
- Renders Overview panel showing up to 6 items needing attention, ranked
  with `bad` before `warn`.
- Renders four filtered list panels: PRs, CI runs, Agent sessions,
  Incidents.
- Renders a canvas-based throughput sparkline with soft area fill, last-point
  dot, and today / average / peak labels.
- Renders a 14-cell pulse grid with tooltips per cell.
- Renders an operator notes textarea persisted to localStorage.
- "Simulate refresh" shifts the trend window by one tick and updates the
  timestamp.
- "Reset local state" clears notes and resets scope (with confirm).
- Scope filter (`all | mine | team`) drives PRs / CI / Agents / Incidents /
  Overview / Status strip.

## UX

- Two-column layout (sidebar + main) collapses to single-column under 960px.
- Stat cards use a single-color text accent (green / yellow / red) keyed off
  derived tone, not arbitrary.
- Each list row uses the same three-column shape (id, label+meta, badge), so
  the panels feel consistent at a glance.
- Sparkline draws the area fill first then the line on top so the line stays
  legible.
- 14-day pulse cells include hover tooltips with the day and tone.
- Dark mode honored via `prefers-color-scheme`. Token palette converges
  with the rest of the repo.
- Focus rings on the notes textarea use `outline` so they survive dark mode.

## Accuracy

- All data is fabricated and clearly described as such in the meta line and
  `brief.md`. No claim of real-world provenance.
- Tone-to-value mapping in the status strip uses a strict precedence: if any
  child item is `bad` the stat goes `bad`, else if any `warn` then `warn`,
  else `good`. This matches the operator's intuitive read.

## Offline compatibility

- Single-file `index.html`. No external `src` or `href`.
- All seed data inlined as a JavaScript literal. No `fetch`.
- Canvas renders inside the page; no external image assets.
- `node scripts/audit-pages.mjs` reports zero failures.
- `node scripts/smoke-pages.mjs` loads the page in headless Chrome without
  JavaScript errors.

## Code quality

- Reactivity via a ~25 LOC Proxy-based signals primitive, inlined per the
  single-file doctrine.
- Each panel subscribes only to the keys it reads from `state`. Toggling
  scope re-runs the affected panels and the status strip; it does NOT
  re-render the trend or pulse panels (which do not depend on scope).
- Canvas sparkline reads `clientWidth` and uses `devicePixelRatio` so it
  remains crisp on high-DPR displays and survives window resize.
- Content interpolated into HTML goes through an `escapeHtml` helper.
- All event handlers are attached via `addEventListener` (no inline
  `onclick=`), keeping the audit's handler check trivially satisfied.

## Performance

- Manual spot-check with DevTools Performance panel: scope chip click
  produces a single short task well under 16ms; trend canvas redraw on
  resize is a single short task; per-keystroke notes save uses
  `localStorage.setItem` which is synchronous but small enough to stay off
  the long-task radar.
- Per-key subscriber model prevents whole-page re-renders. The trend
  panel does not redraw on scope changes.
- If the trend window grows from 30 to 300+ samples, the canvas path
  already scales; only the dpi-corrected canvas resize is constant time.

PASS
