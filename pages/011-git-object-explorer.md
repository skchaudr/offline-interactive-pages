# 011 — Git Object Explorer

**Type:** Lovable-built (Vite/React/TS, not no-build HTML)
**Built:** 2026-05-18
**Lovable backlog entry:** E1 — Git Object Model Visualizer

## Where the code lives

The full project lives in `pages/011-git-object-explorer/` locally, but that directory is **gitignored from this repo's outer .git**. The project has its own `.git` and is managed via its own GitHub remote.

- **GitHub source:** https://github.com/skchaudr/git-object-explorer-v1
- **Lovable project:** synced bidirectionally — Lovable AI edits push to GitHub; `git pull` in the local dir brings them down
- **Deploy URL:** TBD (publish in Lovable to populate)

## Why this lives differently

This repo's doctrine is no-build HTML (`README.md`: "No build step. No external dependencies. No framework required."). Lovable ships Vite/React, which violates every clause of that doctrine. Rather than absorb the build pipeline into this repo, the Lovable artifact lives as a sibling project with only this marker file tracked here. The numbered sequence (011) is preserved; the code is not.

## What it teaches

Branches are pointers. Commits are immutable snapshots. HEAD is a ref that follows you. The user fires a curated set of ~12 git commands and watches the actual object graph (blobs, trees, commits) assemble with real SHA-style hashes; clicking any object opens its raw content formatted like `git cat-file -p`.

See `../LOVABLE_BURN_BACKLOG.md` Used section for credit spend and build retro.
