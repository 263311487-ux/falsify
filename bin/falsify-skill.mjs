#!/usr/bin/env node
// falsify-skill — install the falsify SKILL.md into agent skill directories.
import { mkdirSync, copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillSrc = join(__dirname, "..", "SKILL.md");

const targets = [
  { label: "Codex", dir: join(homedir(), ".codex", "skills", "falsify") },
  { label: "Claude Code", dir: join(homedir(), ".claude", "skills", "falsify") },
];

let installed = 0;
for (const t of targets) {
  try {
    mkdirSync(t.dir, { recursive: true });
    copyFileSync(skillSrc, join(t.dir, "SKILL.md"));
    console.log(`✔ installed falsify → ${t.label} (${join(t.dir, "SKILL.md")})`);
    installed++;
  } catch (e) {
    console.log(`✖ ${t.label}: ${e.message}`);
  }
}
if (installed === 0) process.exit(1);
console.log("\nfalsify is ready. Trigger it with: 先别急着下结论 / falsify this / doubt check");
