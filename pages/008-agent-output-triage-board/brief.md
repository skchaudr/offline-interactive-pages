# Brief — Agent Output Triage Board

## Concept

A batch of 24 outputs from a fictional multi-agent run, rendered as a sortable,
filterable, taggable board. The operator's job is to decide which outputs to
act on now (keep), park for later (defer), or discard (drop).

## Goal

After 2–3 minutes on this page, the operator has:

- A clear count of how many outputs they kept, deferred, dropped.
- Per-card notes for the keep/defer items they want to remember.
- An exportable plain-text decision summary copied to the clipboard.

## Audience

Operators of agent harnesses — anyone who runs a multi-step agent and then has
to figure out what to do with the resulting pile of suggestions, patches,
plans, and questions. Also: anyone who wants to feel what the info-triage
archetype is like.

## Data shape

Inline JSON array of 24 items. Each item is:

- `id` — short stable string (`a01` … `a24`).
- `title` — one-line summary.
- `body` — short paragraph explaining the output.
- `category` — one of `code | plan | note | query`.
- `agent` — fictional source agent (`planner | patcher | reviewer`).
- `score` — model confidence 0..1.
- `effort` — coarse effort rating 0..5.
- `created` — rank used as default sort key.
- `snippet` — optional code excerpt; rendered in a monospace block when present.

## Triage dimensions

- **Filter axes**:
  - Category chip row: `all | code | plan | note | query`.
  - Decision filter select: `all | untagged | keep | defer | drop`.
  - Search: matches title + body + snippet + per-card note.
- **Sort axes**: newest, title A–Z, highest confidence, lowest effort, by agent.
- **Decision verbs**: `keep | defer | drop` (click again to clear).

## Required Sections

- Page header with title, subtitle, live summary strip, header actions.
- Intro card explaining the controls.
- Controls bar: search + sort + decision filter.
- Category chip row.
- Item grid.
- Empty state.

## Required Interactions

- Type in search → grid refilters per keystroke under 16ms.
- Change sort or decision filter → grid re-orders/filters without flashes.
- Click a category chip → grid filters to that category.
- Click a decision button → card border colors, counts update, persists.
- Click the same decision button again → decision clears.
- Type in per-card note → persists to localStorage.
- Reset → confirm dialog → clears all decisions and notes.
- Export → composes a plain-text decision summary and copies to clipboard.

## Success Picture

An operator finishes triaging the 24 outputs in under five minutes, exports a
clean decision summary they can paste into their session log, reloads the page,
and sees every decision and note still in place.

## Source notes

The items are fabricated for demo purposes. They illustrate the spread of
output shapes a real multi-agent run produces:

- Code patches that are small and obviously good.
- Code patches that are subtler.
- Plans that span multiple commits or releases.
- Operator questions that need a human decision.
- Notes flagging accidental discoveries (bugs, leaks, doc mismatches).

No external source notes are required for this demo because the inline JSON
is the only ground truth. A real triage page would cite the agent run id /
session id that produced the outputs.
