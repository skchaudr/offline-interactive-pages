# Brief (dashboard-hub)

Extends `templates/brief-template.md`. Fill in every section.

## Concept

One sentence. What set of related signals is the reader trying to see in a
single glance, and what decision/action does that view enable?

## Goal

What should the reader be able to answer after a 5-second scan of the page?

## Audience

Who is the reader, and what context do they bring?

## Data shape

Describe each panel's data:

- **Status strip stats**: list of `{ id, label, value, tone }` where tone is
  `good | warn | bad`.
- **Each list panel**: array of `{ id, label, status, owner }` where status is
  `good | warn | bad` and owner is the scope tag (e.g., `mine | team`).
- **Trend panel**: array of numbers, oldest first.
- **Notes**: free-text scratch pad.

If you add a panel type (gauge, heatmap, table) define its shape here too.

## Panels

List each panel the page will ship with:

1. Panel name — what signal it shows, where data comes from.
2. ...

For each panel, note the reactivity inputs it subscribes to.

## Scope filter

What scope axis does the page have? The skeleton ships with `all | mine |
team`. Substitute if your domain uses different axes (e.g., `prod | staging`).

## Required Sections

- Sticky sidebar with section nav.
- Header with title, last-refresh meta, scope filter.
- Status strip (3–5 KPI stats).
- 3–6 panels.

## Required Interactions

- Click scope chip → filtered panels update in <16ms with no flashes.
- Click sidebar link → page scrolls to anchor, link goes active.
- Type in notes → persists immediately to localStorage.
- Resize window → canvas spark redraws at correct DPR.

## Success Picture

A reader opens the page, takes 5 seconds to read the status strip, optionally
narrows scope, drills into one panel, jots a note, reloads, sees their note
preserved.

## Source notes

List 1–3 source notes that ground each panel. If panels are inline JSON, name
the file or system the data was derived from.
