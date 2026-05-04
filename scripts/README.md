# Scripts

## Static Page Audit

Run:

```bash
node scripts/audit-pages.mjs
```

Checks every `pages/*/index.html` for the repository's baseline artifact rules:
semantic shell, viewport/title, interactive controls, inline JavaScript syntax,
duplicate ids, missing global inline handlers, placeholder text, dark-mode signal,
and external `src`/`href` dependencies.

## Browser Smoke Check

Run:

```bash
node scripts/smoke-pages.mjs
```

Loads every page through a local Chrome-compatible browser in headless mode and
confirms the document renders. Set `CHROME_BIN` if Chrome, Brave, or Chromium is
installed in a nonstandard location.
