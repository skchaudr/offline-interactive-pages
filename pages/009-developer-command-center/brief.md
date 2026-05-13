# Brief — Developer Command Center

## Concept

A single offline page that synthesizes a developer's daily surface area —
PRs, CI runs, agent sessions, incidents, throughput trend, weekly pulse —
into one inspectable view. The operator can narrow scope (`all | mine |
team`) and jot operator notes that persist locally.

## Goal

In a 5–10 second scan, the operator answers:

- Is anything red right now?
- What in my scope needs attention?
- How does today's throughput compare to the 30-day baseline?
- Where did this week's bad days fall?

## Audience

Anyone who runs a team or coordinates with one — engineers, leads, SRE on-call.
Also: anyone who wants to see what the dashboard-hub archetype is like.

## Data shape

All data is fabricated and inlined as a JavaScript literal.

- `prs[]`, `ci[]`, `agents[]`, `incidents[]` — each item is
  `{ id, label, owner, status, meta }` where:
  - `owner ∈ { mine, team }` (drives the scope filter).
  - `status ∈ { good, warn, bad }` (drives badge color).
  - `meta` — short subtitle string.
- `trend[]` — array of numbers, oldest first; commits-merged-per-day for 30
  days.
- `pulse[]` — array of 14 tone strings (`good | warn | bad`); one per day,
  oldest first.

## Panels

1. **Status strip**: 5 KPI cards derived from the filtered data (open PRs,
   CI failing, agents awaiting, open incidents, today's merges).
2. **Overview**: top 6 things in scope that need attention, ranked by
   severity, drawn from PRs / CI / agents / incidents.
3. **Pull requests**: filtered list with id, title, meta, status badge.
4. **CI runs**: filtered list with status dot, branch, meta, status badge.
5. **Agent sessions**: filtered list — what the operator's agents are doing.
6. **Incidents**: filtered list.
7. **Throughput trend**: canvas sparkline (line + soft area fill + last-point
   dot) with today / average / peak under it. Redraws at correct DPR on
   resize.
8. **14-day pulse**: 14 colored cells, one per day.
9. **Operator notes**: free-text textarea persisted to localStorage.

## Scope filter

`all | mine | team`. Wired to PRs, CI, agents, incidents, and the status
strip. Scope choice persists across reload.

## Required Sections

- Sticky sidebar with section nav, refresh button, reset button.
- Header with title, last-refresh meta, scope chip group.
- Status strip.
- Overview panel.
- Panel grid with PRs, CI, agents, incidents, trend (spans 2 columns),
  pulse, notes.

## Required Interactions

- Click scope chip → all dependent panels and the status strip re-render in
  under 16ms with no flashes.
- Click sidebar nav link → page scrolls to the anchor (built-in browser
  behavior); link goes active.
- Click "Simulate refresh" → trend appends a new sample and shifts; canvas
  redraws; last-refresh timestamp updates.
- Type in notes → persists per keystroke.
- Reset → confirm → clears notes and resets scope to `all`.
- Resize → canvas redraws at the new width with correct DPR.

## Success Picture

An operator opens the page, scans the status strip and overview in 5 seconds,
clicks "Mine" to narrow scope, drills into the PR list, jots a note, closes
the tab, reopens the next day and sees their scope and note preserved.

## Source notes

All data is fabricated. The schemas are designed to mirror the shapes a real
operator would see from GitHub PR APIs, CI providers, agent session logs, and
an incident tracker. No external source notes are required.
