#!/usr/bin/env node
// falsify-skill — install the falsify skill AND coach claims through the protocol.
//   falsify-skill                    → interactive: paste a claim, get the five-stage check
//   falsify-skill "<claim>"          → analyze one claim
//   falsify-skill --json "<claim>"   → machine-readable analysis
//   falsify-skill --install          → install SKILL.md into agent skill directories
//   falsify-skill --demo             → run through the built-in examples

import { mkdirSync, copyFileSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";
import { checkClaim, modeRoute } from "./falsify-core.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillSrc = join(__dirname, "..", "SKILL.md");

const NO_COLOR = process.env.NO_COLOR || process.argv.includes("--no-color");
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
}

function render(r) {
  const zh = r.lang === "zh";
  const L = (z, e) => (zh ? z : e);
  const claim = r.claim.trim();
  const lines = [];

  // header
  lines.push(`${C.bold}falsify — ${L("证伪教练", "falsification coach")}${C.reset}`);
  lines.push(`${C.dim}${L("没有可证伪的假设，就没有结论。", "No verdict without a falsifiable hypothesis.")}${C.reset}`);
  lines.push(`${C.dim}─`.repeat(48) + C.reset);

  // 1. red flags
  if (r.redFlags.length) {
    lines.push(`\n${C.red}① ${L("红旗词检测", "Red-flag words")}${C.reset}`);
    lines.push(`   ${L("检测到：", "Detected: ")}${C.red}${r.redFlags.join(" / ")}${C.reset}`);
    lines.push(`   ${C.dim}${L("这正是协议最警惕的词——断言越「肯定」，越需要证伪。换成可观察的表述。", "These are exactly the words the protocol distrusts — the more absolute the claim, the more it needs falsification.")}${C.reset}`);
  }

  // 2. mode route
  lines.push(`\n② ${L("模式路由 · MODE SELECTION", "Mode routing · MODE SELECTION")} → ${C.cyan}${r.route}${C.reset}`);
  lines.push(`   ${C.dim}${zh ? r.routeNoteZh : r.routeNoteEn}${C.reset}`);

  // 3. iron law rewrite
  const cut = claim.length > 70 ? claim.slice(0, 67) + "…" : claim;
  lines.push(`\n③ ${L("铁律改写", "Iron Law rewrite")}`);
  lines.push(`   ${L("把「", "Rewrite “")}${C.bold}${cut}${C.reset}${L("」改写为：", "” as:")}`);
  lines.push(`   ${C.dim}  if [H] then I should observe [O]; if ¬O, H is dead.${C.reset}`);

  // 4. five-stage checklist
  lines.push(`\n④ ${L("五阶段缺失清单", "Five-stage gap check")} ${C.yellow}${L(`缺 ${r.missingCount}/5`, `${r.missingCount}/5 missing`)}${C.reset}`);
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
  lines.push(`   ${L("判死：观察到 ¬O 时 H 死亡", "Kill condition: ¬O kills H")}`);
  lines.push(`   ${L("证据等级：事实[ ] 假设[ ] 传闻[ ]", "Evidence grade: fact[ ] assumption[ ] hearsay[ ]")}`);
  lines.push(`   ${L("置信度：___%（基于证据，不是感觉）", "Confidence: ___% (evidence-based, not felt)")}`);

  lines.push(`\n${C.dim}─`.repeat(48) + C.reset);
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

// ---- entry ----
const args = process.argv.slice(2);
if (args.includes("--install")) {
  install();
} else if (args.includes("--demo")) {
  const demos = [
    "这个慢查询显然是缓存的问题，把缓存修了就好。",
    "The new feature is definitely working, user feedback is all positive.",
    "API 肯定扛得住 10 万并发，架构很成熟。",
  ];
  for (const d of demos) {
    console.log(render(checkClaim(d)));
    console.log("\n");
  }
} else if (args.includes("--json")) {
  const i = args.indexOf("--json");
  const claim = args[i + 1] || "";
  if (!claim) { console.error("usage: falsify-skill --json \"<claim>\""); process.exit(1); }
  process.stdout.write(JSON.stringify(checkClaim(claim), null, 2) + "\n");
} else {
  const claim = args.filter(a => !a.startsWith("--")).join(" ").trim();
  if (claim) {
    console.log(render(checkClaim(claim)));
  } else if (!process.stdin.isTTY && !args.length) {
    // piped input: read stdin
    let buf = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", c => (buf += c));
    process.stdin.on("end", () => {
      const t = buf.trim();
      if (t) console.log(render(checkClaim(t)));
      else console.error("empty input");
    });
  } else {
    interactive();
  }
}
