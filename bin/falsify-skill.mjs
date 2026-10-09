#!/usr/bin/env node
// falsify-skill — install the falsify skill AND coach claims through the protocol.
//   falsify-skill                    → interactive: paste a claim, get the five-stage check
//   falsify-skill "<claim>"          → analyze one claim
//   falsify-skill --json "<claim>"   → machine-readable analysis
//   falsify-skill --install          → install SKILL.md into agent skill directories
//   falsify-skill --demo             → run through the built-in examples

import { mkdirSync, copyFileSync, readFileSync, lstatSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";
import { checkClaim } from "./falsify-core.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillSrc = join(__dirname, "..", "SKILL.md");

const NO_COLOR = Object.prototype.hasOwnProperty.call(process.env, "NO_COLOR") || !process.stdout.isTTY || process.argv.includes("--no-color");
const C = NO_COLOR
  ? { reset: "", dim: "", red: "", green: "", yellow: "", cyan: "", bold: "" }
  : { reset: "\x1b[0m", dim: "\x1b[2m", red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m", cyan: "\x1b[36m", bold: "\x1b[1m" };

const STAGES = {
  axiomatize: { zh: "公理化", en: "Axiomatize", q_zh: "事实 / 假设 / 传闻分列三张清单", q_en: "Separate facts / assumptions / hearsay into three lists" },
  hypothesize: { zh: "假设化", en: "Hypothesize", q_zh: "写成 If-H-then-O 预测，并列出 ≥3 个互斥备选（含一个你不信的）", q_en: "Write an If-H-then-O prediction, list ≥3 rival hypotheses (including one you doubt)" },
  adversarialize: { zh: "对抗", en: "Adversarialize", q_zh: "先替最强的反对者辩护（钢人化）+ 3 个失效模式", q_en: "Steelman the strongest opponent + name 3 failure modes" },
  verify: { zh: "验证", en: "Verify", q_zh: "证据分级 + 主动找反证 + 跑最便宜的测试", q_en: "Grade evidence, hunt disconfirming evidence, run the cheapest test" },
  converge: { zh: "收束", en: "Converge", q_zh: "标出置信度与剩余未知，给可核查声明", q_en: "State calibrated confidence, remaining unknowns, a checkable claim" },
};

function install() {
  const targets = [
    { label: "Codex", dir: join(homedir(), ".codex", "skills", "falsify") },
    { label: "Claude Code", dir: join(homedir(), ".claude", "skills", "falsify") },
  ];
  try {
    // Preflight both destinations before writing; preserve existing user skills.
    for (const t of targets) {
      let current = t.dir;
      while (current !== homedir() && current !== dirname(current)) {
        try {
          const stat = lstatSync(current);
          if (stat.isSymbolicLink()) throw new Error("symlink destination: " + current);
          if (current === t.dir) throw new Error("already exists: " + current + "; move it aside before installing");
        } catch (e) { if (e.code !== "ENOENT") throw e; }
        current = dirname(current);
      }
    }
    function copyTree(src, dest) {
      mkdirSync(dest, { recursive: true });
      for (const item of readdirSync(src, { withFileTypes: true })) {
        const from = join(src, item.name), to = join(dest, item.name);
        if (item.isDirectory()) copyTree(from, to);
        else copyFileSync(from, to, 1); // COPYFILE_EXCL
      }
    }
    for (const t of targets) {
      mkdirSync(t.dir, { recursive: true });
      copyFileSync(skillSrc, join(t.dir, "SKILL.md"), 1);
      for (const dir of ["references", "templates"]) copyTree(join(__dirname, "..", dir), join(t.dir, dir));
      console.log(`✔ installed falsify → ${t.label} (${join(t.dir, "SKILL.md")})`);
    }
    console.log("\nfalsify is ready. Trigger it with: 先别急着下结论 / falsify this / doubt check");
  } catch (e) {
    console.error("Installation failed: " + e.message);
    process.exitCode = 1;
  }
}

function render(r) {
  const zh = r.lang === "zh";
  const L = (z, e) => (zh ? z : e);
  const claim = r.claim.trim();
  const lines = [];

  // header
  lines.push(`${C.bold}falsify — ${L("证伪教练", "falsification coach")}${C.reset}`);
  lines.push(`${C.dim}${L("没有可证伪的假设，就没有结论。", "No verdict without a falsifiable hypothesis.")}${C.reset}`);
  lines.push(C.dim + "─".repeat(48) + C.reset);

  // 1. red flags
  if (r.redFlags.length) {
    lines.push(`\n${C.red}① ${L("红旗词检测", "Red-flag words")}${C.reset}`);
    lines.push(`   ${L("检测到：", "Detected: ")}${C.red}${r.redFlags.join(" / ")}${C.reset}`);
    lines.push(`   ${C.dim}${L("这正是协议最警惕的词——断言越「肯定」，越需要证伪。换成可观察的表述。", "These are exactly the words the protocol distrusts — the more absolute the claim, the more it needs falsification.")}${C.reset}`);
  }

  // 2. mode route
  lines.push(`\n② ${L("模式路由 · MODE SELECTION", "Mode routing · MODE SELECTION")} → ${C.cyan}${r.route}${C.reset}`);
  lines.push(`   ${C.dim}${zh ? r.routeNoteZh : r.routeNoteEn}${C.reset}`);

  if (!r.route.startsWith("Depth")) {
    lines.push(L("提示：关键词路由只是提示，请核对实际情境；不会生成事实答案。", "Note: keyword routing is only a hint; check the context. This coach does not answer factual questions."));
    return lines.join("\n");
  }

  // 3. iron law rewrite
  const cut = claim.length > 70 ? claim.slice(0, 67) + "…" : claim;
  lines.push(`\n③ ${L("铁律改写", "Iron Law rewrite")}`);
  lines.push(`   ${L("把「", "Rewrite “")}${C.bold}${cut}${C.reset}${L("」改写为：", "” as:")}`);
  lines.push(`   ${C.dim}  H + assumptions predict O; specify noise and a rejection rule.${C.reset}`);

  // 4. five-stage checklist
  lines.push(`\n④ ${L("五阶段待核查提示", "Five-stage prompts (not verified)")} ${C.yellow}${L(`缺 ${r.missingCount}/5`, `${r.missingCount}/5 missing`)}${C.reset}`);
  for (const s of r.fiveStages) {
    const st = STAGES[s.key];
    const mark = s.done ? `${C.green}✓${C.reset}` : `${C.red}✗${C.reset}`;
    lines.push(`   ${mark} ${C.dim}${zh ? st.zh : st.en}${C.reset} · ${zh ? st.q_zh : st.q_en}`);
  }

  // 5. upgrade template
  lines.push(`\n⑤ ${L("改进版示范（模板）", "Upgrade template")}`);
  lines.push(`   ${L("假设 H：", "Hypothesis H: ")}${cut}`);
  lines.push(`   ${L("备选 A：还有别的解释（数据/环境/时序/行为）", "Rivals: data, environment, timing, behavior")}`);
  lines.push(`   ${L("预测 O：如果 H 为真，[可测量信号] 应出现", "Prediction O: if H holds, [measurable signal] should appear")}`);
  lines.push(`   ${L("判死：预设噪声与辅助假设下的拒绝规则", "Kill condition: pre-specify rejection under noise and auxiliary assumptions")}`);
  lines.push(`   ${L("证据等级：事实[ ] 假设[ ] 传闻[ ]", "Evidence grade: fact[ ] assumption[ ] hearsay[ ]")}`);
  lines.push(`   ${L("置信度：___%（基于证据，不是感觉）", "Confidence: ___% (evidence-based, not felt)")}`);

  lines.push("\n" + C.dim + "─".repeat(48) + C.reset);
  lines.push(`${C.dim}${L("提示：这是模板化启发式，不是 LLM 判断。完整协议见 SKILL.md。", "Note: heuristic template, not LLM judgment. Full protocol in SKILL.md.")}${C.reset}`);
  return lines.join("\n");
}

async function interactive() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  console.log(`${C.bold}falsify — ${C.reset}${C.dim}${"证伪教练。贴一句你正准备下的结论，回车开始。"}${C.reset}\n`);
  const ask = () => new Promise(res => rl.question(`${C.cyan}> ${C.reset}`, res));
  let first = true;
  for (;;) {
    const text = first ? await ask() : await ask();
    first = false;
    const t = text.trim();
    if (!t) { rl.close(); break; }
    if (t === "q" || t === "quit" || t === "exit") { rl.close(); break; }
    if (t === "install") { install(); continue; }
    console.log("\n" + render(checkClaim(t)) + "\n");
  }
}

const HELP = "Usage: falsify-skill [--json] [--no-color] [--] <claim>\n  Omit claim to read stdin (or interactive terminal).\n  --demo     Local examples, no API key\n  --install  Install skill + resources; refuses existing destinations\n  --help     Show this help";
async function main() {
  const flags = new Set(), words = [];
  let literal = false;
  for (const arg of process.argv.slice(2)) {
    if (arg === "--" && !literal) { literal = true; continue; }
    if (!literal && arg.startsWith("--")) {
      if (!["--help", "--json", "--install", "--demo", "--no-color"].includes(arg)) throw new Error("Unknown option: " + arg);
      flags.add(arg);
    } else words.push(arg);
  }
  const modes = ["--help", "--json", "--install", "--demo"].filter(f => flags.has(f));
  if (modes.length > 1) throw new Error("Choose only one of --help, --json, --install, --demo");
  if (modes.some(f => f !== "--json") && words.length) throw new Error("This option does not accept a claim");
  if (flags.has("--help")) { console.log(HELP); return; }
  if (flags.has("--install")) { install(); return; }
  if (flags.has("--demo")) {
    for (const claim of ["这个慢查询显然是缓存的问题，把缓存修了就好。", "The new feature is definitely working", "API 肯定扛得住 10 万并发"]) console.log(render(checkClaim(claim)));
    return;
  }
  let claim = words.join(" ").trim();
  if (!claim && !process.stdin.isTTY) claim = readFileSync(0, "utf8").trim();
  if (!claim) {
    if (flags.has("--json") || !process.stdin.isTTY) throw new Error("empty input: provide a claim as an argument or on stdin");
    await interactive(); return;
  }
  const result = checkClaim(claim);
  console.log(flags.has("--json") ? JSON.stringify(result, null, 2) : render(result));
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
