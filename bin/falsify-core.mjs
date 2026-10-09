// falsify-core — rule-based falsification coach (no LLM).
// Shared by the falsify CLI (falsify-skill) and usable by any script.
// This is a heuristic template, NOT a judgment engine. The full protocol lives in SKILL.md.

export const RED_FLAGS = [
  "显然", "明显", "肯定", "一定", "就是", "毫无疑问", "明摆着", "不用说", "大家都知道", "不可能",
  "obviously", "certainly", "definitely", "surely", "clearly", "of course", "no doubt",
  "always", "never", "guaranteed", "best", "fastest", "the only",
];
export const OBS_WORDS = [
  "快", "慢", "延迟", "崩溃", "错误", "报错", "响应", "耗时", "成本", "收入", "数量", "涨", "跌",
  "%", "秒", "分钟", "小时", "天", "次", "并发", "用户", "吞吐", "内存", "CPU",
  "fast", "slow", "latency", "crash", "error", "seconds", "percent", "users", "memory", "cpu", "ms", "gb",
];
export const INCIDENT_WORDS = ["事故", "宕机", "线上", "生产", "崩溃", "紧急", "degrad", "outage", "down", "incident"];
export const NUDGE_WORDS = ["大概", "约", "粗略", "估算", "差不多", "ballpark", "rough", "roughly", "approximately", "about how much"];
export const SIMPLE_WORDS = ["几点", "现在时间", "天气", "是谁", "哪年", "what time", "weather", "who is"];

// English keywords match whole words; Chinese keywords remain substring hints.
function mentions(text, word) {
  if (/^[a-z ]+$/i.test(word)) {
    const pattern = word === "degrad" ? "degrad[a-z]*" : word;
    return new RegExp("\\b" + pattern + "\\b", "i").test(text);
  }
  return text.includes(word);
}

function langOf(text) {
  return /[\u4e00-\u9fff]/.test(text) ? "zh" : "en";
}

export function modeRoute(text) {
  const t = text.toLowerCase();
  const estimate = NUDGE_WORDS.some(w => mentions(t, w));
  const highStakes = /medication|dose|medical|security|production|药物|剂量|医疗|安全|生产/.test(t);
  // An explicit active-failure cue outranks an estimate request. Environment
  // words alone (production/线上) must not turn capacity planning into an incident.
  const activeFailure = INCIDENT_WORDS.filter(w => !["线上", "生产"].includes(w)).some(w => mentions(t, w));
  if (activeFailure || (!(estimate && highStakes) && INCIDENT_WORDS.some(w => mentions(t, w))))
    return {
      mode: "Incident（事故）",
      zh: "线上事故 → 比较可逆缓解与等待的风险后先稳住，再证伪效果。协议禁止在事故里先跑完整分析。",
      en: "Live incident → compare the harm of waiting with a reversible mitigation, then stabilize, then verify. The protocol forbids running the full analysis mid-incident.",
    };
  if (estimate && !highStakes)
    return {
      mode: "Nudge（估算）",
      zh: "估算类问题 → 直接给带假设的答案 + 最多 3 个追问，不上五段式台账。",
      en: "Rough estimate → answer directly with its stated assumption plus ≤3 questions. No five-stage ledger.",
    };
  if (SIMPLE_WORDS.some(w => mentions(t, w)))
    return {
      mode: "Simple（简单）",
      zh: "简单事实问题 → 直接答，协议不触发。",
      en: "Simple factual question → answer directly, protocol does not fire.",
    };
  return {
    mode: "Depth（深度）",
    zh: "高利害/会执行的问题 → 走完整五段式。",
    en: "High-stakes or acted-on question → run the full five stages.",
  };
}

export function checkClaim(text) {
  const lang = langOf(text);
  const t = text.toLowerCase();
  const flags = RED_FLAGS.filter(w => mentions(t, w));
  const obs = OBS_WORDS.filter(w => mentions(t, w));
  const route = modeRoute(text);
  const short = text.trim().length < 12;
  const checks = [
    { key: "axiomatize", done: false },
    { key: "hypothesize", done: false },
    { key: "adversarialize", done: false },
    { key: "verify", done: false },
    { key: "converge", done: false },
  ];
  const missing = checks.filter(c => !c.done).length;

  return {
    lang,
    claim: text,
    redFlags: flags,
    observableMentions: obs,
    route: route.mode,
    routeNoteZh: route.zh,
    routeNoteEn: route.en,
    isShort: short,
    fiveStages: checks,
    missingCount: missing,
  };
}
