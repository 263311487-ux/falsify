# Candidate 0.8.9: first success / 候选版首次运行

Run from this local candidate checkout, not an unspecified default-branch clone. These changes are not a claim that npm has published 0.8.9. npm 0.8.8 does not inherit candidate installer protections.

从本地候选 checkout 运行；不要假定默认分支或 npm 已有本次改动。无需密钥或模型调用。

1. Run locally: node bin/falsify-skill.mjs "The cache is definitely the cause"
2. Build the tarball: npm pack
3. Choose a fresh disposable directory and install the resulting local tarball with npm install --prefix /your/fresh/directory /absolute/path/falsify-skill-0.8.9.tgz
4. Run /your/fresh/directory/node_modules/.bin/falsify-skill --json "Check this claim"

The coach produces heuristic prompts, not a correctness verdict. Only use --install if you intentionally want to write agent skill directories. To verify entirely within disposable homes, run npm run test:package.
