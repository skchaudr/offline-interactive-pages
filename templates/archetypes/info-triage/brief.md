# Brief (info-triage)

Extends `templates/brief-template.md`. Fill in every section.

## Concept

One sentence. What pile of items is the reader sorting through, and what
decision are they trying to make?

## Goal

What state should the reader's mind be in after using the page? (e.g., "knows
which 5 of 30 PRs need their review today.")

## Audience

Who is the reader, and what context do they bring?

## Data shape

Describe the item type:

- `id` — string, stable across reloads.
- `title` — string.
- `body` — string (short summary; keep under ~300 chars).
- `category` — string, low cardinality (3–10 distinct values).
- `score` — number 0..1 (or omit if not relevant).
- `created` — sortable number (timestamp or rank).
- Add any item-specific fields and explain what they mean.

## Triage dimensions

- **Filter axes**: which item properties drive the filter chips and the tag
  filter? List them.
- **Sort axes**: which orderings does the reader want? (newest, highest score,
  alphabetical, …)
- **Decision verbs**: which actions can the reader take per item? The skeleton
  ships with `keep` / `defer` / `drop`; substitute your own verbs (e.g.,
  `review` / `merge` / `close`).

## Required Sections

- Header strip with live counts (total, visible, per-decision).
- Search input.
- Sort and tag-filter selects.
- Category chip row.
- Item grid.
- Empty state.

## Required Interactions

- Type in search → grid filters in <16ms.
- Change sort/filter → grid reorders/filters without flashes.
- Click decision button → item border colors per decision; counts update;
  state persists across reload.
- Reset triage button → clears all decisions (with confirm).

## Success Picture

A reader lands on the page, scans the counts, applies a filter, makes
decisions on 5–10 items, reloads, and sees their decisions intact.

## Source notes

List 1–3 source notes that ground the items. If items are inline JSON, name
the file that originally produced them.
