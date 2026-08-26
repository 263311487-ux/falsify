# AGENTS.md — falsify

This repo IS a skill. The product is `SKILL.md`. Everything else exists to distribute, market, and prove it.

## If an agent is working in this repo
- `SKILL.md` is the single source of truth. `.cursor/skills/falsify/SKILL.md` is a synced copy — edit both or re-copy.
- Version lives in `SKILL.md` frontmatter (`metadata.version`) and `package.json`-less: keep `CHANGELOG.md` in sync.
- `evals/` is the proof layer: when changing the protocol, update `evals/cases.md` and re-run the rubric.
- README is marketing. Keep the one-line identity ("falsify before you believe") and the before/after table in sync with reality.
- Don't add dependencies. The skill must work as a single Markdown file on any agent.
