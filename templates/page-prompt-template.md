Task: Build offline interactive artifact

archetype: <one of: learning | info-triage | general-issue | specific-issue | dashboard-hub | hybrid>

Read:

- docs/* (especially docs/RULES.md and docs/ARCHETYPES.md)
- page brief
- page sources
- if archetype has a skeleton, templates/archetypes/<archetype>/skeleton.html
- shared/components/* as needed
- shared/tokens.css for the design token block

Output:
pages/<id>/index.html
pages/<id>/brief.md
pages/<id>/audit.md

Requirements:

- polished
- educational or operationally useful (per archetype)
- interactive
- offline (single-file, no external src/href, no CDN, no npm)
- source grounded
- meets the performance budget in docs/ARCHETYPES.md
- passes scripts/audit-pages.mjs and scripts/smoke-pages.mjs
