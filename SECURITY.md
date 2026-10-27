# Security Policy

## Reporting

falsify is a prompt protocol and a deterministic CLI tool with no network requests, no database, and no server. The main security surface is the npm package itself.

If you find a supply-chain issue, a malicious dependency, or an injection vector in the CLI:

1. Do **not** open a public issue.
2. Email: 263311487@qq.com — include a description, reproduction steps, and severity assessment.
3. Response within 72 hours.

## Scope

- `bin/falsify-skill.mjs` and `bin/falsify-core.mjs` — CLI and core logic
- `package.json` — dependency chain (currently zero dependencies)
- The SKILL.md installed into agent skill directories

## Not in scope

- LLM outputs when the skill is in use (the protocol is guidance; outputs depend on the model)
- The eval harness (requires an API key the user provides; not executed by npm install)
