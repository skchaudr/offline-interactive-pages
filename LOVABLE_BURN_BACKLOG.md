# Lovable Burn Backlog

Daily 5-credit Lovable projects. Each entry is a seed for a paste-ready prompt. Pedagogy is the driver. Creativity serves the pedagogy. Every app should rise to its own occasion — no template aesthetic, no template HTML feature set.

**Reset:** ~4pm PDT daily. **Statuses:** `queued` · `used YYYY-MM-DD` · `shipped <url>` · `blocked` · `retired`

---

## House style — every prompt

**Hard rules** (quality, not style)
- Second-person to Lovable ("Build a...")
- 200–300 words. No emojis. No marketing fluff. No meta-commentary.
- Structure: (1) one-paragraph scope (2) what the user *does* in the app (3) the mental model the app must build (4) creative invitation — features of HTML/CSS/JS that could serve this lesson (5) one explicit "don't do this"
- Default stack: Vite/React (Lovable's default)
- Default state: localStorage; no auth; no server; no AI calls — must work offline once loaded

**Soft principles** (pedagogy + creativity)
- **The aesthetic should embody the subject.** A vim trainer might be a phosphor-CRT terminal. A git object explorer might be paper-and-ink with monospace and arrows drawn like a textbook. A Pi cluster diagram might read like a blueprint schematic. A RAG pipeline might be an industrial control panel. Pick what the *subject deserves*, not what's safe.
- **Reach for the HTML/CSS/JS feature that best serves the lesson.** SVG for graph topologies. Canvas for high-density redraws. Web-Animations API for fluid motion. View Transitions for layout reshuffles. Popover and `<dialog>` for layered reveals. Web Audio for tactile feedback (a satisfying click on a correct chord). `<details>` for progressive disclosure. `contenteditable` for in-place editing. CSS scroll-driven animations for narrative explainers. Don't default to a card grid because cards are easy.
- **The interaction is the lesson, not a feature.** If the app teaches selection grammar, the user must *make selections*. If it teaches the git object model, the user must *create objects and watch them link*. Reading text is not learning; doing is. The UI surfaces should be where the muscle gets built.
- **One opinionated choice over a settings panel.** Don't ship a theme picker, a font picker, a difficulty slider. Pick. The project's coherence is the pedagogy.
- **Drills are unproven in HTML for Sab — not banned, but justify them.** If queuing a drill-format entry, articulate the value-add over practicing in the source software itself. The default reach should be explorers, visualizers, sandboxes, references — formats the source tool *can't* offer. Drills are allowed when there's a clear reason HTML wins (instrumentation, visual feedback on invisible state, mock-environment isolation, etc.).

---

## Tool fluency series

Tool-fluency apps you'd open daily while practicing. Each series is three complementary episodes (drill → playground → reference) — one app doesn't cover fluency.

### Series A — Helix Fluency

*Coordination note: Sab has existing Helix HTML work floating that needs to be grabbed and ported into this repo. Cross-check before shipping any A-series prompt to avoid duplicating something that already exists.*

- **A1. Helix Selection-First Trainer** — `queued`
  **Scope:** Fake buffer with prompts like "select inside next parens", "extend selection to end of word", "select the function the cursor is in". Real keystrokes capture; live highlight of your selection vs the target; streaks per command family (movement, extension, object).
  **Pedagogy:** Build the selection-first instinct — in Helix you make the selection *first* and verbs apply to it (inverse of vim).
  **Creative invitation:** Real keystroke capture. Animated diff between your selection and target. Phosphor-green CRT feel earned here. (Format note: this is a drill — see house-style soft principle on drills.)

- **A2. Helix Multi-Cursor Playground** — `queued`
  **Scope:** Sandbox with a multi-line snippet. Tasks like "add `;` to every line starting with `let`", "replace every `foo` simultaneously", "split selection on `,` then uppercase each piece". Cursors render as visible carets; keychord shows live.
  **Pedagogy:** Multi-cursor isn't a feature — it's the natural endpoint of selections-as-data.
  **Creative invitation:** SVG overlay for carets so they animate independently of text. Show the selection set as a sidebar list — make the abstraction visible. View Transitions when cursors split/merge.

- **A3. Helix Space-Menu Reference** — `queued`
  **Scope:** Interactive replica of the `space` menu. Hover any node for description; type a path to drill in; mock-fire commands with overlay explanations.
  **Pedagogy:** Discoverability — train spatial memory of *where* things live in the menu.
  **Creative invitation:** Radial menu? Nested popovers via Popover API? Tree with scroll-driven progressive disclosure? Pick one and commit. Heavy `<kbd>` use, styled with intent.

### Series B — Neovim / LazyVim Fluency

- **B1. Vim Grammar Decoder** — `queued`
  **Scope:** Paste any vim command (`ci{`, `2daw`, `>ap`, `gqip`, `c/foo<CR>`). The app parses it into its grammatical parts — count, operator, motion/text-object, optional search — and animates each part doing its work against a fake buffer. Side panel shows the AST of the command.
  **Pedagogy:** Vim is a grammar (count + verb + modifier + object), not a list of shortcuts. Once you can see commands as compositions, you stop memorizing and start *speaking* vim.
  **Creative invitation:** Parse-as-you-type with color-coded grammatical parts. Live AST visualizer (SVG or nested HTML). Step-through animation so a viewer can see why `2daw` deletes two words. The decoder *replaces* training — the source vim is where you practice; this is where you understand.

- **B2. LazyVim Which-Key Explorer** — `queued`
  **Scope:** Interactive `<leader>` menu hierarchy mirroring real LazyVim defaults. Each leaf = command + one-liner description. Fuzzy-search ("file rename" → `<leader>fr`). Reverse-lookup ("I forgot what `<leader>sg` does").
  **Pedagogy:** "Where the hell is X" is the #1 LazyVim friction. Cure it.
  **Creative invitation:** Treat this like an actual which-key floating panel — it should *feel* like the real popup. `<dialog>` element, slide-up from bottom, monospace, theme matching LazyVim's default colorscheme (tokyonight or catppuccin).

- **B3. Buffer / Window / Tabpage Mental Model** — `queued`
  **Scope:** Nested-box visualization that responds to commands you type (`:e file`, `:vsp`, `:tabnew`, `:b#`, `:bd`, `<C-w>w`). Live visual updates.
  **Pedagogy:** These three concepts confuse everyone for months. Make the containment hierarchy obvious: tabpages contain windows; windows display buffers; buffers are independent of either.
  **Creative invitation:** Use real CSS containment, animated with View Transitions when commands fire. A buffer list as a side rail showing which buffers are currently displayed where. SVG arrows from windows to their buffer.

### Series C — Obsidian Fluency

- **C1. Dataview Query Playground** — `queued`
  **Scope:** Mock vault (5–10 fake notes with realistic frontmatter — projects, daily notes, areas). Live editor for dataview queries (TABLE, LIST, TASK), live result render. 5–10 pre-loaded queries to mutate.
  **Pedagogy:** Dataview is just SQL-over-frontmatter, but the docs never frame it that way. The playground should make the parallel obvious.
  **Creative invitation:** Side-by-side SQL-equivalent display ("this dataview query is essentially this SELECT"). Color-coded frontmatter fields in the mock vault sidebar. Treat the query editor like a real code editor — syntax-highlight even with a hand-rolled tokenizer.

- **C2. Templater Sandbox** — `queued`
  **Scope:** Live preview against a mock note context. Variables, date math, prompts, conditional blocks. Library of real template patterns (daily note, meeting note, project skeleton).
  **Pedagogy:** Templater is a tiny templating language; once you see the substitution model, the rest is just function reference.
  **Creative invitation:** Two-pane editor with live substitution highlighted *in place* — every `<% %>` token glows briefly when its value lands in the preview. The substitution is the lesson; make it visible.

- **C3. Hotkey Coverage Heatmap** — `queued`
  **Scope:** Paste your Obsidian hotkeys JSON. The app maps every chord onto a visual keyboard heatmap and groups by command category (editing, navigation, plugins, custom). Highlights collisions, unbound common commands, modifier-overloaded keys, and chords that conflict with OS or Obsidian defaults.
  **Pedagogy:** You can't tune what you can't see. Most people accumulate hotkeys over years and have no idea what their layout actually looks like or where the gaps are.
  **Creative invitation:** SVG keyboard, color gradient by category. Hover any key for its full chord stack. Filter chips for modifier sets (⌘, ⌘⇧, ⌘⌥, etc.). A "suggested rebinds" panel that flags conflicts. The keyboard layout *is* the dashboard.

### Series D — Zed Fluency

- **D1. Zed Multi-Buffer + Splits Playground** — `queued`
  **Scope:** Mock workspace showing Zed's pane/split/tab model under commands (`cmd-k cmd-→` for split, navigate, swap, close). Visual surface for the spatial-editor mental model.
  **Pedagogy:** Zed's spatial model is different from vim/code; commands reshape geometry, not focus. The geometry IS the model.
  **Creative invitation:** CSS Grid for the workspace with View Transitions on every reshape — when you split, the user should *see* the space divide. Animation latency matters here; this is where view-transitions earn their place.

- **D2. Zed AI Workflow Explorer** — `queued`
  **Scope:** Walkthrough of Zed's inline-assistant + agent panel + slash-commands. Each interaction shown as before/after with the underlying request structure (system prompt + context + user turn).
  **Pedagogy:** Demystify what Zed *actually sends* to the model — the prompt assembly, the included context, the diff application. Most users have no idea.
  **Creative invitation:** Split-pane: chat UI on the left, raw request JSON on the right, scrubbable timeline of turns on the bottom. The right pane should make people go "oh — *that's* what it's sending."

- **D3. Zed Keymap Cheat-Card** — `queued`
  **Scope:** Interactive cheat card filterable by category (editing, navigation, multibuffer, AI, project). Click a chord → see the action + a 1-line use case.
  **Pedagogy:** Reference, not drill. Optimize for "I almost remember this; remind me fast".
  **Creative invitation:** Command-palette UX at the top, instant filter. `<kbd>` everywhere. Grid layout that re-flows on filter with View Transitions. Could borrow the GitHub keyboard-shortcuts modal aesthetic.

### Series E — Git Fluency

Foundation already exists in `pages/001-git-rebase-lab/` — these episodes extend that mental model into adjacent territory.

- **E1. Git Object Model Visualizer** — `shipped 2026-05-18` → see Used section

- **E2. Reflog & Recovery Lab** — `queued`
  **Scope:** Mock repo where you can "lose" commits via `reset --hard`, force-push, branch-delete — then recover via reflog. Each destructive op + recovery shown step-by-step.
  **Pedagogy:** Almost nothing is truly destroyed for ~90 days. Stop fearing destructive commands.
  **Creative invitation:** Time-scrubber UI — drag a timeline backwards to see prior repo states. The reflog isn't a log, it's a timeline; make that literal. Terminal aesthetic earned here.

- **E3. Merge vs Rebase vs Cherry-Pick Sandbox** — `queued`
  **Scope:** Same starting repo, three resolution strategies in three side-by-side panes, three resulting commit graphs. Click any commit on any side to inspect content.
  **Pedagogy:** These three operations produce *different* histories from the *same* inputs. Seeing the divergence side-by-side is what makes it stick.
  **Creative invitation:** SVG commit graphs in three synchronized panes. Hovering a commit in one pane highlights its analogs in the others. The diff between graphs IS the lesson.

### Series F — Agentic Systems Engineering Fluency

The "Pi" + "MyAPI" + RAG cluster. This is the becoming-an-agentic-systems-engineer track, not architecture diagrams.

- **F1. Pi Coding-Agent Harness Anatomy** — `queued`
  **Scope:** Interactive walkthrough of the minimalist coding-agent harness: the loop, tool registry, message turns, system-prompt assembly, exit conditions. Click any layer to see its responsibility + a 5–10 line code sketch.
  **Pedagogy:** Strip the magic. A coding agent is a loop with tool calls and message history. Once that's obvious, everything else is implementation detail.
  **Creative invitation:** Animated loop visualization — watch turns fire, tool calls execute, results inject back into context. Each layer is a clickable region (SVG or layered HTML); clicking pops a `<dialog>` with the code sketch. Make the abstraction physical.

- **F2. MyAPI Request Lifecycle Playground** — `blocked`
  **Scope:** Interactive: request → router → middleware → handler → DB → response. Click any layer to see what it owns.
  **Pedagogy:** TBD pending stack brief.
  **Creative invitation:** TBD pending stack brief.
  **Blocked until:** Sab briefs me on MyAPI's actual framework, ORM, deploy target.

- **F3. RAG Pipeline Explorer** — `queued`
  **Scope:** Click through a query as it becomes embedding → vector search → retrieved chunks → reranking → context-window assembly → LLM call → response. Toggle each stage on/off to see the quality delta. Mock data; no real LLM calls.
  **Pedagogy:** RAG is a pipeline of independent transforms. Each stage has a quality knob. Build intuition for which stage to tune when.
  **Creative invitation:** Industrial control-panel aesthetic — toggles, dials, pipes between stages, output preview at every junction. Could borrow from Houdini-style node-graph editors. The toggle-and-compare *is* the pedagogy.

- **F4. Pi Cluster Tailnet Diagram** — `queued`
  **Scope:** Literal hardware view: pi-big + pi-small + Mac + Tailscale. Click node for specs/role; click edge for protocol; animated packet flow for `tailscale ssh sab-ssd@pi-big`.
  **Pedagogy:** Companion to F1 — F1 is the agent harness mental model; F4 is the physical substrate it runs on. Tailnet topology becomes legible.
  **Creative invitation:** Schematic-blueprint aesthetic (blue + white, hairline rules, sans-serif annotations). SVG for the network diagram with animated packet sprites along the edges. Web Audio for a subtle ping on packet arrival.

---

## Conceptual one-offs

Standalone explainers, not series.

*(currently empty — most "one-off" ideas grew into series above. Add here when a genuinely standalone explainer comes up.)*

---

## Used
(burned entries move here as: `**<id>. <name>** — used YYYY-MM-DD — <url> — <1-line retro>`)

- **E1. Git Object Model Visualizer** — used 2026-05-18
  - **GitHub source:** https://github.com/skchaudr/git-object-explorer-v1
  - **Lovable project:** lives at `pages/011-git-object-explorer/` locally (gitignored from outer repo — managed by its own .git)
  - **Deploy URL:** TBD (Publish in Lovable to populate)
  - **Credits spent:** ~2 (initial build + readability/centering pass)
  - **Retro:** Paper-and-ink field-guide aesthetic landed cleanly. Engine works end-to-end (objects + refs render correctly, counters accurate). Interaction model was click-suggested-commands rather than typing — Lovable defaulted to that on the readability pass; defensible for a lesson app but diverges from original "fires git commands from a faux terminal" framing. Worth one more polish pass if more credits available.

---

## Out of scope for Lovable
- **Helix frontends → HTML-only references** — Lovable ships Vite/React; this repo is no-build HTML. Do this in Zed with Claude, not Lovable.
- Anything needing auth, server, real-time sync, AI calls, payments, email.
