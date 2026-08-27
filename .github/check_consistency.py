#!/usr/bin/env python3
"""Consistency gate for falsify: every copy of the skill and every version
stamp must agree with the root SKILL.md, or the repo is broken."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
errors = []

def ver(path):
    text = path.read_text(encoding="utf-8")
    m = re.search(r'version:\s*"([^"]+)"', text)
    return m.group(1) if m else None

root_skill = ROOT / "SKILL.md"
v = ver(root_skill)
if not v:
    errors.append("SKILL.md: version missing")

# 1. every SKILL copy byte-identical to root
for rel in ["skills/falsify/SKILL.md", ".cursor/skills/falsify/SKILL.md"]:
    p = ROOT / rel
    if not p.exists():
        errors.append(f"{rel}: missing")
    elif p.read_text(encoding="utf-8") != root_skill.read_text(encoding="utf-8"):
        errors.append(f"{rel}: out of sync with SKILL.md")

# 2. every JSON version stamp equals SKILL version
for rel in [".agents/plugins/marketplace.json", ".claude-plugin/marketplace.json",
            ".claude-plugin/plugin.json", ".codex-plugin/plugin.json",
            ".devin-plugin/plugin.json", ".grok-plugin/plugin.json"]:
    p = ROOT / rel
    j = json.loads(p.read_text(encoding="utf-8"))
    if j.get("version") != v:
        errors.append(f"{rel}: version {j.get('version')} != SKILL {v}")

# 3. package.json version equals SKILL version
pkg = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
if pkg.get("version") != v:
    errors.append(f"package.json: version {pkg.get('version')} != SKILL {v}")

# 4. every file declared in package.json files: exists
for rel in pkg.get("files", []):
    if not (ROOT / rel).exists():
        errors.append(f"package.json files: {rel} missing")

if errors:
    print("CONSISTENCY FAILED:")
    for e in errors:
        print(f"  - {e}")
    sys.exit(1)
print(f"CONSISTENCY OK (all copies + {len([f for f in ['skills/falsify/SKILL.md','.cursor/skills/falsify/SKILL.md'] if (ROOT/f).exists()])} skill copies + 6 plugin stamps + package.json @ {v})")
