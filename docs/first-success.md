# 0.8.9: first success / 首次运行

Published 2026-10-09: run `npx falsify-skill@0.8.9 --json "Check this claim"`. npm 0.8.8 does not inherit the new installer protections. The following steps exercise a local checkout and its tarball.

可固定安装 npm 0.8.9，或按下文从源码 checkout 验证。无需密钥或模型调用。

1. Run locally: node bin/falsify-skill.mjs "The cache is definitely the cause"
2. Build the tarball: npm pack
3. Choose a fresh disposable directory and install the resulting local tarball with npm install --prefix /your/fresh/directory /absolute/path/falsify-skill-0.8.9.tgz
4. Run /your/fresh/directory/node_modules/.bin/falsify-skill --json "Check this claim"

The coach produces heuristic prompts, not a correctness verdict. Only use --install if you intentionally want to write agent skill directories. To verify entirely within disposable homes, run npm run test:package.
