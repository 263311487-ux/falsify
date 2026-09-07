// Generate assets/falsify-demo.svg from REAL CLI output (run via falsify-core).
// Usage: node scripts/generate-demo-svg.mjs > /dev/null (writes assets/falsify-demo.svg)
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { checkClaim } from "../bin/falsify-core.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "assets", "falsify-demo.svg");

const zh = true;
const claim = "这个慢查询显然是缓存的问题，把缓存修了就好。";
const r = checkClaim(claim);

// terminal palette
const P = {
  bg: "#0d1117", win: "#161b22", border: "#30363d",
  dotR: "#ff5f57", dotY: "#febc2e", dotG: "#28c840",
  title: "#8b949e", prompt: "#3fb950", cmd: "#e6edf3", quote: "#79c0ff",
  red: "#f85149", green: "#3fb950", yellow: "#d29922", cyan: "#58a6ff",
  gray: "#8b949e", white: "#e6edf3", dim: "#6e7681",
};

const lines = [];

// mock terminal output
lines.push({ t: "$ npx falsify-skill " + JSON.stringify(claim), c: "cmdline" });
lines.push({});
lines.push({ t: "falsify — 证伪教练", c: "bold" });
lines.push({ t: "没有可证伪的假设，就没有结论。", c: "dim" });
lines.push({ t: "─".repeat(44), c: "line" });
lines.push({});
lines.push({ t: "① 红旗词检测", c: "redbold" });
lines.push({ t: "   检测到：显然 —— 断言越「肯定」，越需要证伪。", c: "gray" });
lines.push({});
lines.push({ t: "② 模式路由 · MODE SELECTION → Depth（深度）", c: "plain" });
lines.push({ t: "   高利害/会执行的问题 → 走完整五段式。", c: "gray" });
lines.push({});
lines.push({ t: "③ 铁律改写", c: "plain" });
lines.push({ t: "   把「" + claim + "」改写为：", c: "gray" });
lines.push({ t: "   if [H] then I should observe [O]; if ¬O, H is dead.", c: "cyan" });
lines.push({});
lines.push({ t: "④ 五阶段缺失清单   缺 5/5", c: "plain" });
for (const s of [["公理化","事实/假设/传闻分列"],["假设化","If-H-then-O + ≥3 备选"],["对抗","钢人化 + 3 失效模式"],["验证","证据分级 + 主动找反证"],["收束","置信度 + 剩余未知"]]) {
  lines.push({ t: "   ✗ " + s[0] + " · " + s[1], c: "gray" });
}
lines.push({});
lines.push({ t: "⑤ 改进版示范（模板）", c: "plain" });
lines.push({ t: "   假设 H：" + claim, c: "white" });
lines.push({ t: "   备选 A：还有别的解释（数据/环境/时序/行为）", c: "gray" });
lines.push({ t: "   预测 O：如果 H 为真，[可测量信号] 应出现", c: "gray" });
lines.push({ t: "   判死：观察到 ¬O 时 H 死亡", c: "gray" });
lines.push({ t: "   置信度：___%（基于证据，不是感觉）", c: "gray" });
lines.push({});
lines.push({ t: "提示：模板化启发式，不是 LLM 判断。完整协议见 SKILL.md。", c: "dim" });

// measure width: CJK = 2 units, ASCII = 1 unit
const unit = (ch) => (ch.charCodeAt(0) > 0x2e7f ? 2 : 1);
const lineUnits = (s) => [...s].reduce((a, c) => a + unit(c), 0);
const maxW = Math.max(...lines.filter(l => l.t).map(l => lineUnits(l.t)), 50);
const CHAR_W = 7.6; // px per ASCII unit at font-size 13
const fontPx = 13;
const lineH = 19;
const padX = 22;
const winTop = 34;
const topPad = 26;
const width = Math.round(padX * 2 + maxW * CHAR_W + 20);
const height = Math.round(winTop + topPad + lines.length * lineH + 26);

const color = (c) =>
  c === "cmdline" ? P.cmd :
  c === "bold" ? P.white :
  c === "dim" ? P.dim :
  c === "line" ? P.border :
  c === "redbold" ? P.red :
  c === "gray" ? P.gray :
  c === "cyan" ? P.cyan :
  c === "white" ? P.white :
  c === "plain" ? P.white : P.white;

function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

let y = winTop + topPad;
const body = [];
for (const l of lines) {
  if (!l.t) { y += 6; continue; }
  const t = esc(l.t);
  let fill = color(l.c);
  let weight = l.c === "bold" || l.c === "redbold" ? "600" : "400";
  // cmdline: green prompt + white command
  if (l.c === "cmdline") {
    const dollar = esc("$ ");
    const rest = esc(l.t.slice(2));
    body.push(`  <text x="${padX}" y="${y}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="${fontPx}" fill="${P.prompt}" font-weight="600">${dollar}</text>`);
    body.push(`  <text x="${padX + 15}" y="${y}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="${fontPx}" fill="${P.white}">${rest}</text>`);
  } else {
    body.push(`  <text x="${padX}" y="${y}" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="${fontPx}" fill="${fill}" font-weight="${weight}">${t}</text>`);
  }
  y += lineH;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="falsify terminal demo">
  <rect width="${width}" height="${height}" fill="${P.bg}"/>
  <!-- window chrome -->
  <rect x="0" y="0" width="${width}" height="${winTop}" fill="${P.win}"/>
  <circle cx="16" cy="17" r="6" fill="${P.dotR}"/>
  <circle cx="34" cy="17" r="6" fill="${P.dotY}"/>
  <circle cx="52" cy="17" r="6" fill="${P.dotG}"/>
  <text x="${width / 2}" y="22" text-anchor="middle" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="12" fill="${P.title}">falsify — zsh</text>
  ${body.join("\n")}
</svg>
`;

writeFileSync(out, svg, "utf-8");
console.log("wrote", out, `${width}x${height}`);
