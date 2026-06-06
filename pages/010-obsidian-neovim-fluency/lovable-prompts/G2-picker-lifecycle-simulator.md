# Lovable Prompt — G2 Picker Lifecycle Simulator (scoped post-G1)

Build a companion page to G1 (Sab's Obsidian Navigator / SAB // SSD). Same Cyberdream system: near-black background, cyan labels, magenta Obsidian accents, monospace key chips, high-contrast body text (no tiny low-contrast gray — match G1 readability pass). Header: "SAB // SSD · Picker Lab". Footer: `cyberdream · vault: SoloDeveloper · picker: snacks`.

This page simulates the Snacks picker modal that opens AFTER direct chords or SSD CC — the fourth surface G1 only names. User never re-learns entry surfaces here; a slim top link says "← Entry surfaces (G1)".

Three scenario chips (one active at a time):
1. **Quick Switch** — triggered by `Space o q`. Mock 8–12 vault note titles/paths (include `04 Periodic/00 Dailys/2026.06.06.md`). Filter by title as user types.
2. **Vault Search** — triggered by `Space o s`. Same mock vault but results show grep-style line matches with surrounding context; highlight search term in preview.
3. **Backlinks** — triggered by `Space o b` while "current note" is `2026.06.06.md`. List 4–6 notes that link TO it via `[[2026.06.06]]` or wiki titles.

Layout: centered floating picker panel (bordered, like Neovim). Left: filter prompt + candidate list. Right: live preview pane with markdown syntax coloring. Bottom foot bar (always visible, readable font): `Enter` open · `Shift-Enter` pick window · `Ctrl-s` split · `Ctrl-v` vsplit · `Alt-p` preview · `Esc` cancel · `j/k` navigate.

Above the picker, a four-step pipeline strip: Finder → Sorter → Previewer → Action. Highlight the active stage as the user types (Sorter), moves (Previewer), or confirms (Action).

Interactions: typing filters list live; j/k or click moves selection; Enter animates a brief "buffer opened" toast showing the target path. Ctrl-s shows split layout hint (daily left, result right). localStorage remembers last scenario.

Mock daily note preview content must include YAML frontmatter (`type: periodic`, `tags`, `id: 2026.06.06`) and body with `# Saturday Plan` and `## Reflections`.

Do not rebuild the four entry-surface tabs from G1. Do not use Telescope/fzf branding. No theme picker. One opinionated visual system only.