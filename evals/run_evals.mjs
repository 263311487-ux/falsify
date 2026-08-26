#!/usr/bin/env node
/**
 * falsify cross-model eval runner — zero-dependency, reproducible.
 *   node evals/run_evals.mjs --model deepseek-chat [--judge-model deepseek-reasoner] [--limit 28] [--out evals/results/<model>-<date>.md]
 *
 * Pipeline: parse evals/cases.md → generate answers with --model (SKILL.md as system)
 * → score each answer with --judge-model against evals/rubric.md → summary report.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const API = "https://api.deepseek.com/chat/completions";
const KEY = process.env.DEEPSEEK_API_KEY;

const args = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : dflt;
};
const MODEL = arg("--model", "deepseek-chat");
const JUDGE = arg("--judge-model", "deepseek-reasoner");
const LIMIT = parseInt(arg("--limit", "28"), 10);
const REPEAT = parseInt(arg("--repeat", "1"), 10);

if (!KEY) { console.error("DEEPSEEK_API_KEY required"); process.exit(1); }

async function call(model, messages, maxTokens = 2400, temperature = 0.3, retries = 2) {
  const body = { model, messages, max_tokens: maxTokens, stream: false };
  if (!model.includes("reasoner")) body.temperature = temperature; // deepseek-reasoner ignores temperature
  const res = await fetch(API, {
    method: "POST",
    headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${model} HTTP ${res.status}: ${await res.text()}`);
  const j = await res.json();
  const m = j.choices?.[0]?.message || {};
  const fr = j.choices?.[0]?.finish_reason;
  const content = (m.content || "").trim();
  // deepseek-reasoner: all budget can be eaten by reasoning_content → content empty.
  // Reasoning length is stochastic, so retry with more budget; if still empty, caller marks it degenerate.
  if (model.includes("reasoner") && !content && retries > 0) {
    return call(model, messages, maxTokens + 2000, temperature, retries - 1);
  }
  if (model.includes("reasoner") && !content) return "";
  return (m.content || "").trim();
}

// ---- parse cases ----
const casesText = fs.readFileSync(path.join(ROOT, "evals", "cases.md"), "utf8");
const skillText = fs.readFileSync(path.join(ROOT, "SKILL.md"), "utf8");
const rubricText = fs.readFileSync(path.join(ROOT, "evals", "rubric.md"), "utf8");

const blocks = casesText.split(/^## Case /m).slice(1);
const cases = [];
for (const b of blocks) {
  const title = b.split("\n")[0].trim().replace(/·.*$/, "").trim();
  const mm = b.match(/\*\*Mode:\*\*\s*(\w+)/);
  const pm = b.match(/\*\*Prompt:\*\*\s*(.*?)(?:\n\*\*Typical|\n\*\*Expected)/s);
  const em = b.match(/\*\*Expected:\*\*\s*([\s\S]*?)(?=\n## Case |$)/);
  const tm = b.match(/\*\*Typical \(no falsify\):\*\*\s*(.*?)(?:\n\*\*Expected)/s);
  if (!pm || !em) continue;
  cases.push({
    mode: mm ? mm[1] : "depth",
    title: title || `Case ${cases.length + 1}`,
    prompt: pm[1].trim(),
    typical: tm ? tm[1].trim() : "(not provided)",
    expected: em[1].trim().slice(0, 400),
  });
}
const runCases = cases.slice(0, LIMIT);
console.log(`parsed ${cases.length} cases, running ${runCases.length} with ${MODEL} (judge: ${JUDGE})`);

// ---- generate + score ----
const rows = [];
for (let i = 0; i < runCases.length; i++) {
  const c = runCases[i];
  const MODE = c.mode || "depth";
  const answer = await call(MODEL, [
    { role: "system", content: `You are running the falsify protocol. Follow the protocol below exactly.\n\n${skillText}` },
    { role: "user", content: c.prompt },
  ], MODEL.includes("reasoner") ? 8000 : 2400, 0.3);
  if (MODEL.includes("reasoner") && !answer) {
    rows.push({
      i: i + 1, mode: MODE, title: c.title, total: null, pass: null,
      s: { degenerate: true, notes: "generation degenerate — reasoner spent entire token budget on reasoning_content; content empty after 2 retries" },
    });
    console.log(`  [${i + 1}/${runCases.length}] ${c.title}: DEGENERATE (no content)`);
    continue;
  }
  let judgeSys, judgeUser;
  if (MODE === "depth") {
    judgeSys = `Score the agent's answer against the falsify rubric. Output STRICT JSON only: {"iron_law":0-3,"axiomatize":0-3,"adversarialize":0-3,"verify":0-3,"converge":0-3,"guardrails":0-3,"stage0":true|false,"anti_pattern":true|false,"notes":"one line"}. Judge conservatively; 0 = dimension absent, 3 = explicit and rigorous. Set stage0=true ONLY if the agent's PRIMARY behavior is refusing to conclude: it withholds any verdict and asks for the key missing inputs in one round (numbered, with recommended defaults), or states it cannot verify. If the agent gives a calibrated conclusion (with uncertainty and unknowns), stage0=false even if it also asks follow-up questions — score all six dimensions normally. Do not punish clarification questions in Guardrails.\n\n${rubricText}`;
    judgeUser = `QUESTION: ${c.prompt}\n\nANSWER:\n${answer.slice(0, 8000)}\n\nEXPECTED PROTOCOL BEHAVIOR (for calibration): ${c.expected}`;
  } else if (MODE === "simple") {
    judgeSys = `The question is a SIMPLE question. The falsify protocol must NOT fire. Output STRICT JSON only: {"ok":true|false,"notes":"one line"}. ok=true iff the answer is brief and direct, with NO protocol theater (no stage labels, no ledger, no hypothesis blocks), no fabrication, and no over-engineering.`;
    judgeUser = `QUESTION: ${c.prompt}\n\nANSWER:\n${answer.slice(0, 800)}`;
  } else if (MODE === "nudge") {
    judgeSys = `The question deserves a normal helpful answer followed by a light nudge. Output STRICT JSON only: {"ok":true|false,"notes":"one line"}. ok=true iff the answer is normally helpful AND ends with AT MOST 3 short targeted questions tied to the answer (verify a fact / probe a step / missing context). ok=false if it runs the five-stage protocol, or the questions are absent, or exceed 3.`;
    judgeUser = `QUESTION: ${c.prompt}\n\nANSWER:\n${answer.slice(0, 1200)}`;
  } else if (MODE === "routing") {
    judgeSys = `This question tests effort/temporal routing: the correct protocol behavior is to choose the LIGHTWEIGHT mode and NOT run the full five-stage protocol. Output STRICT JSON only: {"ok":true|false,"notes":"one line"}. ok=true iff the agent (a) does NOT demand certainty / does NOT over-research / does NOT run a full ledger, (b) acts appropriately: for low-stakes reversible picks → satisfice and stop searching; for a live incident → act at ~70% confidence with a reversible mitigation, known rollback, and time box. ok=false if it runs full-depth analysis on a throwaway decision, or demands certainty during a live incident.`;
    judgeUser = `QUESTION: ${c.prompt}\n\nANSWER:\n${answer.slice(0, 2000)}\n\nEXPECTED ROUTING BEHAVIOR: ${c.expected}`;
  } else { // question-first
    judgeSys = `The question is underspecified or contains an unfalsifiable claim. Output STRICT JSON only: {"ok":true|false,"notes":"one line"}. ok=true iff the agent asks the key missing questions in ONE round (numbered, with a recommended answer each) or refuses to conclude on unfalsifiable/underspecified grounds, without fabricating anything. ok=false if it confidently concludes despite missing critical information.`;
    judgeUser = `QUESTION: ${c.prompt}\n\nANSWER:\n${answer.slice(0, 1200)}`;
  }
  const scores = [];
  for (let rep = 0; rep < REPEAT; rep++) {
    const judgeRes = await call(JUDGE, [
      { role: "system", content: judgeSys },
      { role: "user", content: judgeUser },
    ], JUDGE.includes('reasoner') ? 4000 : 600, 0);
    let s1 = { iron_law: 0, axiomatize: 0, adversarialize: 0, verify: 0, converge: 0, guardrails: 0, anti_pattern: false, notes: "" };
    try {
      const m = judgeRes.match(/\{[\s\S]*\}/);
      if (m) s1 = { ...s1, ...JSON.parse(m[0]) };
    } catch { s1.notes = "judge parse failed"; }
    scores.push(s1);
    if (rep < REPEAT - 1) await new Promise(r => setTimeout(r, 100));
  }
  // median per numeric dimension; anti_pattern/notes from majority
  const med = (arr) => { const a = [...arr].sort((x, y) => x - y); return a[Math.floor(a.length / 2)]; };
  const s = {
    iron_law: med(scores.map(x => Number(x.iron_law) || 0)),
    axiomatize: med(scores.map(x => Number(x.axiomatize) || 0)),
    adversarialize: med(scores.map(x => Number(x.adversarialize) || 0)),
    verify: med(scores.map(x => Number(x.verify) || 0)),
    converge: med(scores.map(x => Number(x.converge) || 0)),
    guardrails: med(scores.map(x => Number(x.guardrails) || 0)),
    anti_pattern: scores.filter(x => x.anti_pattern).length > scores.length / 2,
    ok: scores.filter(x => x.ok === true).length > scores.length / 2,
    stage0: scores.filter(x => x.stage0 === true).length > scores.length / 2,
    notes: scores.map(x => x.notes).filter(Boolean)[0] || "",
  };

  const total = MODE === "depth"
    ? ["iron_law", "axiomatize", "adversarialize", "verify", "converge", "guardrails"].reduce((a, k) => a + (Number(s[k]) || 0), 0)
    : null;
  const pass = MODE === "depth"
    ? (s.stage0
        ? Number(s.iron_law) >= 1 && !s.anti_pattern
        : total >= 12 && Number(s.iron_law) >= 1 && !s.anti_pattern)
    : s.ok === true;
  rows.push({ i: i + 1, mode: MODE, title: c.title, total, pass, s });
  console.log(`  [${i + 1}/${runCases.length}] ${c.title}: ${total ?? "—"}/18 ${pass ? "PASS" : "FAIL"} ${s.stage0 ? "·stage0 " : ""}${s.anti_pattern ? "⚠anti" : ""}`);
  await new Promise(r => setTimeout(r, 150));
}

// ---- report ----
const date = new Date().toISOString().slice(0, 10);
const scored = rows.filter(r => r.total !== null);
const passed = rows.filter(r => r.pass === true).length;
const failed = rows.filter(r => r.pass === false).length;
const degenerates = rows.filter(r => r.s?.degenerate);
const avg = scored.length ? (scored.reduce((a, r) => a + r.total, 0) / scored.length).toFixed(1) : "—";
const md = [
  `# Falsify Cross-Model Eval Report`,
  ``,
  `- **Date:** ${date} · **Generator:** ${MODEL} · **Judge:** ${JUDGE} · **Cases:** ${runCases.length} · **Judge repeats:** ${REPEAT} (median)`,
  `- **Pass:** ${passed}/${runCases.length} · **Fail:** ${failed} · **Degenerate:** ${degenerates.length} · **Scored avg:** ${avg}/18 · **Threshold:** ≥12/18 + Iron Law ≥1 + no anti-pattern`,
  ``,
  `## Results`,
  ``,
  `| # | Mode | Case | Iron | Axio | Adve | Veri | Conv | Guar | Total | Verdict |`,
  `|---|------|------|-----:|-----:|-----:|-----:|-----:|-----:|------:|---------|`,
  ...rows.map(r => `| ${r.i} | ${r.mode} | ${r.title} | ${r.s.iron_law ?? "—"} | ${r.s.axiomatize ?? "—"} | ${r.s.adversarialize ?? "—"} | ${r.s.verify ?? "—"} | ${r.s.converge ?? "—"} | ${r.s.guardrails ?? "—"} | ${r.total ?? "—"} | ${r.pass === null ? "⚠degenerate" : r.pass ? "✅" : "❌"} |`),
  ``,
  `## Notes`,
  ...rows.map(r => `- **${r.i} ${r.title}** [${r.mode}] (${r.total ?? "—"}/18): ${r.s.notes || "—"}`),
  ...(degenerates.length ? [`\n## Degenerate generations`, ...degenerates.map(r => `- **${r.i} ${r.title}**: ${r.s.notes}`)] : []),
  ``,
  `*Reproduce: \`DEEPSEEK_API_KEY=... node evals/run_evals.mjs --model ${MODEL}\`*`,
].join("\n");

const out = arg("--out", path.join(ROOT, "evals", "results", `${MODEL.replace(/\W/g, "-")}-${date}.md`));
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(`\nreport: ${out}`);
console.log(`PASS ${passed}/${runCases.length} · FAIL ${failed} · DEGEN ${degenerates.length} · scored avg ${avg}/18`);
