# Workflow

1. Choose topic
2. Choose archetype (see `docs/ARCHETYPES.md`)
3. Create page folder
4. Add brief.md (start from `templates/archetypes/<archetype>/brief.md` if one
   exists; otherwise `templates/brief-template.md`)
5. Add 1–3 source notes
6. Dispatch build task. If a skeleton exists for the chosen archetype, clone
   `templates/archetypes/<archetype>/skeleton.html` to
   `pages/NNN-<slug>/index.html` and edit. Otherwise compose snippets from
   `shared/components/` and the `:root` block in `shared/tokens.css`.
7. Audit output: run `node scripts/audit-pages.mjs` and
   `node scripts/smoke-pages.mjs`, then open the page in a real browser and
   verify the performance budget described in `docs/ARCHETYPES.md`.
8. Refine
9. Publish
