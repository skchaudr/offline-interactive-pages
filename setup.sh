#!/usr/bin/env bash
set -euo pipefail
REPO="$(cd "$(dirname "$0")" && pwd)"
cd "$REPO"

echo "=== setup: offline-interactive-pages ==="

# 1. Node (only needed for audit scripts, not for pages themselves)
node --version 2>&1 && echo "✓ node $(node --version 2>&1)" || echo "⚠ node not found (pages work without it)"

# 2. Verify structure
[ -d "pages" ] && echo "✓ pages/ present ($(find pages -name '*.html' 2>/dev/null | wc -l | tr -d ' ') pages)" || echo "✗ pages/ missing"
[ -d "shared" ] && echo "✓ shared/ present" || echo "⚠ shared/ missing"
[ -d "templates" ] && echo "✓ templates/ present" || echo "⚠ templates/ missing"

# 3. Note about smoke test (requires Chrome — run manually)
if [ -f "scripts/smoke-pages.mjs" ]; then
  echo "ℹ smoke test available: node scripts/smoke-pages.mjs (requires Chrome)"
fi

# 4. Snapshot
echo "--- snapshot ---"
echo "  branch:  $(git branch --show-current 2>/dev/null || echo 'not a git repo')"
echo "  pages:   $(ls pages/*.html 2>/dev/null | wc -l | tr -d ' ')"
echo "  setup:   $(date -u +%Y-%m-%dT%H:%M:%SZ)"
