# Errors

Command failures and integration errors.

---

## [2026-06-11] Playwright Chromium download blocked in remote env
- **Error**: `403 Host not in allowlist` from cdn.playwright.dev
- **Context**: Tried to screenshot the freshly built mon-site Next.js export
- **Learning**: This Claude Code remote environment's network policy allows npm registry + GitHub but not cdn.playwright.dev. Don't attempt browser installs here; verify via curl/HTML inspection instead, or ask the user to view locally.
