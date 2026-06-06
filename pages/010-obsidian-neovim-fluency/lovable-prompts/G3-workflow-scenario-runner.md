# Lovable Prompt — G3 Workflow Scenario Runner (scoped post-G1/G2)

Build a third route in the same project as G1 and G2: `/workflow-lab`. Header: "SAB // SSD · Workflow Lab". Same Cyberdream system as https://space-obsidian-guide.lovable.app (high-contrast text, cyan labels, magenta Obsidian accents, monospace key chips). Slim nav links: "← Entry surfaces" (/) and "← Picker lab" (/picker-lab). Footer: `cyberdream · vault: SoloDeveloper · picker: snacks`.

Eight scenario cards in a grid. Each card title is the Obsidian intention (plain language, not vim jargon):
1. Open today's daily (`Space o d`)
2. Recall a note by title (`Space o q` → picker)
3. Find a phrase in the vault (`Space o s` → picker)
4. Follow a wiki-link (`Enter` on `[[link]]` in markdown buffer)
5. See backlinks (`Space o b` → picker)
6. Create a new note (`Space o n`)
7. Link selected text (Visual + `Space o l`)
8. Extract selection to note (Visual + `Space o e`)

Clicking a card opens a linear stepper (3–5 steps). Each step shows: highlighted key sequence as chips, current mode badge (NORMAL / VISUAL / INSERT), and a minimal mock Neovim frame that updates (which-key menu, picker modal, or daily note buffer with `04 Periodic/00 Dailys/2026.06.06.md` frontmatter). Final step: "done" state with target file path.

Below the stepper, a collapsible "Side-swipe" panel — one mistake per workflow:
- W1: INSERT mode blocks leader keys — Esc first
- W2: don't confuse `oq` (title) with `os` (body grep)
- W4: `gf` fails on `[[wiki]]` — use Enter smart_action
- W6: `on` is new note, `od` is daily
- W7: Normal `Space o l` = outgoing links; Visual `Space o l` = link selection

Checkbox per scenario → localStorage progress (e.g. "4/8 workflows walked"). No quiz, no scoring.

Do not rebuild G1 four-surface tabs or G2 picker simulator. Do not add theme picker or vim grammar decoder.