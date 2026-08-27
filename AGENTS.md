# AGENTS.md — falsify

This repo IS a skill. The product is `SKILL.md`. Everything else exists to distribute, market, and prove it.

## If an agent is working in this repo
- `SKILL.md` is the single source of truth. `.cursor/skills/falsify/SKILL.md` and `skills/falsify/SKILL.md` are synced copies (the latter makes the skill discoverable via `skills.sh` / `npx skills search`). After editing, re-copy: `cp SKILL.md skills/falsify/SKILL.md && cp SKILL.md .cursor/skills/falsify/SKILL.md`, bump the 6 plugin JSON version stamps, and run `python3 .github/check_consistency.py` (CI enforces this).
- Version lives in `SKILL.md` frontmatter (`metadata.version`) and must equal `package.json` + all plugin JSONs: keep `CHANGELOG.md` in sync.
- `evals/` is the proof layer: when changing the protocol, update `evals/cases.md` and re-run the rubric.
- README is marketing. Keep the one-line identity ("falsify before you believe") and the before/after table in sync with reality.
- Don't add dependencies. The skill must work as a single Markdown file on any agent.
