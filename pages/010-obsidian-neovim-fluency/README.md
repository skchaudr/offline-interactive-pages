# SSD Neovim Cheat Sheet

Sab: This was created by Codex on Pi-Big, after a huge quality of life configuration change in my Neovim. Obsidian is front and center. The objective is to gain Neovim fluency via using a similar tool I have used for years and leveraging it effectively to get the broader concepts and motions down.

Minimal LazyVim setup with Cyberdream, SSD dashboard, Obsidian as the main
learning path, and a small command surface. Leader is `Space`.

| Area     | Key / Command               | What It Does                                  |
| -------- | --------------------------- | --------------------------------------------- |
| Command  | `<leader><leader>`          | Open SSD Command Center                       |
| Command  | `<leader>?`                 | Search keymaps                                |
| Command  | `<leader>C`                 | Open full Vim command list                    |
| File     | `<C-n>` / `<leader>e`       | Toggle Snacks explorer                        |
| File     | `<leader>we`                | Toggle focus between explorer and editor      |
| File     | `<leader>wr`                | Reveal current file in explorer               |
| Window   | `<C-h/j/k/l>`               | Move left/down/up/right between splits        |
| Window   | `<leader>ww`                | Return to last window                         |
| Window   | `<leader>wv` / `<leader>ws` | Split right / split below                     |
| Window   | `<leader>wc`                | Close window                                  |
| Edit     | `<C-s>`                     | Save                                          |
| Edit     | `<C-q>`                     | Close buffer                                  |
| Edit     | `<C-a>`                     | Select all                                    |
| Edit     | Visual `<Tab>` / `<S-Tab>`  | Indent / outdent selection                    |
| Paste    | `:PasteClean`               | Paste clipboard after stripping terminal junk |
| Paste    | `<F1>` / `<leader>tp`       | Toggle paste mode                             |
| Terminal | `<leader>tt`                | Open bottom terminal split                    |
| Terminal | Terminal `<Esc>`            | Leave terminal mode                           |

| Obsidian | Key          | What It Does              |
| -------- | ------------ | ------------------------- |
| Menu     | `<leader>oo` | Obsidian command menu     |
| Check    | `<leader>oc` | Check vault               |
| Daily    | `<leader>od` | Today's daily note        |
| Daily    | `<leader>oy` | Yesterday's note          |
| Notes    | `<leader>on` | New note                  |
| Notes    | `<leader>oq` | Quick switch notes        |
| Search   | `<leader>os` | Search vault              |
| Template | `<leader>ot` | Insert template           |
| Graph    | `<leader>ob` | Backlinks                 |
| Graph    | `<leader>ol` | Links                     |
| Vault    | `<leader>ow` | Switch workspace          |
| Visual   | `<leader>ol` | Link selection            |
| Visual   | `<leader>oe` | Extract selection to note |

| Git     | Key          | What It Does         |
| ------- | ------------ | -------------------- |
| Inspect | `<leader>gs` | Git status picker    |
| Inspect | `<leader>gd` | Changed hunks        |
| Inspect | `<leader>gD` | Diff against origin  |
| Commit  | `<leader>gg` | Neogit               |
| Review  | `<leader>gv` | Diffview             |
| History | `<leader>gF` | Current file history |
| History | `<leader>gl` | Git log              |
| Blame   | `<leader>gb` | Blame current line   |

Vault resolution: `OBSIDIAN_VAULT`, then `SOLO_VAULT`, then
`~/obsidian/SSD`, then `~/Obsidian/SoloDeveloper`.

**Config lane:** primary `nvim` → `~/.config/nvim` (symlink to
`~/.dotfiles/nvim/.config/nvim`). Not `vd` / `vl` / `vm`.

**Workflow source of truth:** [`bindings.json`](bindings.json) — extracted
bindings, picker keys, W1–W10 workflows, side-swipe FAQ.

**Do this in Neovim:** [`obsidian-workflow-playbook.html`](obsidian-workflow-playbook.html)
