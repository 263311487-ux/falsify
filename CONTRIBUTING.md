# Contributing

falsify is a skill — the product is `SKILL.md`. Keep changes minimal and focused on behavior, not prose.

## Ways to contribute
- **Cases**: add a before/after case to `evals/cases.md` where an agent overclaims.
- **Protocol**: propose a sharper stage, gate, or guardrail in `SKILL.md`.
- **Platforms**: add a plugin manifest for a new agent platform.
- **i18n**: add a README translation.

## Rules
- One behavior change per PR. No prose-only churn.
- Update `evals/rubric.md` when you change the protocol.
- Bump `metadata.version` in `SKILL.md` frontmatter and add a `CHANGELOG.md` entry.
- Don't add dependencies. The skill must stay a single Markdown file.
