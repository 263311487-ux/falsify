# Changelog

## Versioning policy

- **版本号只代表协议本身的变化**：功能、修复、蒸馏升级才 bump（如 0.8.4 = 一个真实行为修复）。
- **分发轮次（收录 / PR / 榜单）不占版本号**——它们改变"被看见的方式"，不改变协议本身，统一记入下方 `Distribution log`。
- **README / 元数据 / 落地页等用户可见面的实质更新算 bump（patch）**——用户看到的产物变了，就该有版本。
- 保持时间倒序；`Distribution log` 是按轮次记录的透明档案。

## 0.8.5 (2026-08-30) — latest

- **README 首屏改造（可见性升级）**：新增徽章行（在线演示 / 双模型 26/28 / 实测 4/4 / AAS ⭐45.5k 收录）；「它改变了什么」before/after 表提前到首屏；安装段前置；中英 README 结构同步；修复 zh 安装段代码围栏。
- **版本策略落地**：见顶部 `Versioning policy`——版本号只代表协议或可见面的变化；旧的 0.8.5~0.8.9 发行轮次已合并入 `Distribution log`，不再作为独立版本。
- **描述工程化**：GitHub + npm 描述重写（关键词前置、五段流程、双模型证据），对齐 Context7 式搜索友好文案。
- npm: `falsify-skill@0.8.5`（GitHub Release v0.8.5 同步）。

## 0.8.4 (2026-08-29)

- **Community fix from AAS PR review (P1):** high-stakes ballparks must stay in Depth mode. The unconditional Nudge default could instruct an agent to give a rough medication dose / security capacity / production sizing number without falsification. Fixed in MODE SELECTION table + Nudge routing + Nudge chapter: low-stakes reversible estimates → Nudge; anything where being wrong costs time/money/trust → Depth (gather key inputs, falsify, then commit).
- npm: **`falsify-skill@0.8.4` published**（此前 npm 停在 0.8.3，该修复一直未发；此轮已对齐 GitHub Release v0.8.4 与全部版本戳）。

## Distribution log (0.8.4 era, 2026-08-28/29)

非版本轮次，仅记录分发动作（协议内容不变）：

- **Round 1–2:** [skills.sh](https://skills.sh/263311487-ux/falsify)（Vercel 官方目录）自动收录 + [PR #1124](https://github.com/Shubhamsaboo/awesome-llm-apps/pull/1124) awesome-llm-apps（⭐134.7k）
- **Round 3:** [PR #3596](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/pull/3596) awesome-dsh-plugin（⭐13.3k）
- **Round 4–5:** [PR #975](https://github.com/VoltAgent/awesome-agent-skills/pull/975) VoltAgent（⭐33k）+ [PR #257](https://github.com/composio-community/awesome-codex-skills/pull/257) awesome-codex-skills 升级（⭐16k）
- **Round 6:** [PR #451](https://github.com/heilcheng/awesome-agent-skills/pull/451) heilcheng/awesome-agent-skills（⭐6.1k）
- **Milestone:** **MERGED into `sickn33/agentic-awesome-skills`（⭐45.5k）** via [PR #1281](https://github.com/sickn33/agentic-awesome-skills/pull/1281)（含 `references/` + `templates/`，可经 AAS CLI/MCP 安装）；同步 [PR #1287](https://github.com/sickn33/agentic-awesome-skills/pull/1287) 更新至 0.8.3；清理重复 PR #1286
- **Round 7–8:** [PR #88](https://github.com/JackyST0/awesome-agent-skills/pull/88) JackyST0（⭐628）+ [PR #10](https://github.com/theskillsdirectory/skills/pull/10) theskills.directory + ComposioHQ/awesome-claude-skills [#1738](https://github.com/ComposioHQ/awesome-claude-skills/pull/1738)（⭐73.8k）· Prat011/awesome-llm-skills [#227](https://github.com/Prat011/awesome-llm-skills/pull/227)（⭐1.7k）· libukai/awesome-agent-skills [#136](https://github.com/libukai/awesome-agent-skills/pull/136)（⭐5k）
- **Portfolio snapshot:** 12 open PRs across ~340k stars of exposure；skills.sh installs 2；npm weekly 273
- **Community intel:** falsification-first niche has no winner yet（88plug/scientific-method ⭐1）；Tencent SkillHub（skillhub.cn）需手机+实名；agentskillsindex.com 已下线

## 0.8.3 (2026-08-27)

- Second-model validation: full 28-case suite run on **deepseek-reasoner** (judge: deepseek-chat) → **26/28, avg 15.3/18**; cross-checked with deepseek-chat generator × deepseek-reasoner judge → **26/28, avg 16.4/18**. Failures are disjoint and each was manually re-checked as protocol-compliant (single-run variance, not stable gaps). Report: `evals/results/deepseek-reasoner-2026-08-27.md`
- Eval harness hardened for reasoner-class models: 8000 max_tokens on generation, retry-on-empty-content (reasoning_content shares the budget), degenerate generations marked instead of silently scored 0
- Fairer Stage-0 scoring: judge outputs `stage0` (refuse-to-conclude is the primary behavior); such answers pass on Iron Law + no anti-pattern instead of needing all six dimensions
- Protocol fix: mandatory **MODE SELECTION** gate (Incident / Simple / Nudge / Question / Depth) before the five stages — reasoner once ran the full protocol on a live incident instead of acting at ~70% confidence (case 26); now routes correctly
- Deployment note added: reasoner-class models can spend the whole token budget on reasoning and return empty content on deep debugging questions — set generous `max_tokens` or prefer deepseek-chat
- Repo hygiene: synced all SKILL copies (`skills/falsify`, `.cursor`) and 6 plugin/marketplace JSON stamps to 0.8.3; landing page shows dual-model proof; zh-CN README matches EN; new CI consistency gate (`.github/check_consistency.py`) catches copy/version drift
- SKILL.md 0.8.3
## 0.8.2 (2026-08-27)

- Cross-model eval harness (`evals/run_evals.mjs`, zero-dependency): run the full 28-case suite on any DeepSeek model with mode-aware scoring (depth / simple / nudge / question / routing), 3x judge median, reproducible report. First result: deepseek-chat 26/28, avg 13.5/18, 15 cases 18/18
- Protocol fix: rough-estimate / ballpark asks now default to Nudge, not depth (was triggering a full five-stage ledger on "rough estimate of cost")
- Eval suite now tags each case with its mode; effort-routing (case 23) and OODA (case 26) cases scored as routing, not depth
- SKILL.md 0.8.2
## 0.8.1 (2026-08-27)

- External dogfood cross-validation: 4 real community questions (GitHub oven-sh/bun #25648, Stack Overflow ×3), scored against `evals/rubric.md`; 4/4 passed (avg 17.0/18), and 3/3 cases with ground truth matched reality (Bun name-collision bug fixed in 1.3.7; SO #12868222 accepted answer confirms apples-to-oranges benchmark audit; closed SO #75085169's low-quality answer is a live anti-pattern example)
- New distillation from external cases: benchmark audit canon (roundtrip counts, page cache, implementation asymmetry — the asker's own code often reveals the flaw), "unsolvable / restart-fixes" red flag (restart = process reset; rebuild-not-fixing ⇒ deterministic code path; cross-platform kills environment theories), and "duplicate-of" chain as free ground truth during verification
- Evals 26 → 28 cases (benchmark apples-to-oranges, pre-sealed "unsolvable" debugging)
- Report: `outputs/falsify_dogfood_外部交叉验证_20260827.md`; shipped in-repo as `evals/dogfood-external-20260827.md`

## 0.8.0 (2026-08-26)

- Situation routing (Cynefin / Snowden): classify the cause–effect domain before choosing a method — Clear → runbook, Complicated → analyze, Complex → probe safely, Chaotic → stabilize first, Disorder → decompose; the wrong-domain method is itself the failure mode
- Time-pressure mode (Boyd OODA): moving + reversible → act at ~70% confidence with a known rollback, predict, time-box, re-observe, loop; exit when stable or the next move is irreversible
- IS/IS-NOT bounding (Kepner-Tregoe): selective defects bounded by WHAT/WHERE/WHEN/EXTENT vs closest comparable IS-NOT + distinctions + nearby changes; a candidate cause survives only if it explains both sides
- Pre-registered update rules (Galef debiasing): lock "if I observe Z → update to W%" + evidence acceptance criteria BEFORE seeing the evidence; apply mechanically when Z arrives
- MUST/WANT decision analysis (Kepner-Tregoe): screen MUSTs (pass/fail) and weight WANTs (1–10) before scoring; adverse-consequence test (probability × impact); no option passes MUSTs → return "none"
- New reference: `references/bias-catalog.md` — 25-bias quick reference (cluster / detect / remediate) backing the Stage 4 audit
- Toolbox: systems leverage hierarchy for problems that recur despite local fixes
- Academic backing extended: Snowden Cynefin, Kepner-Tregoe, Boyd OODA
- Evals 23 → 26 cases (Cynefin mismatch, IS/IS-NOT bounding, OODA under time pressure)

## 0.7.0 (2026-08-26)

- Effort routing (Kahneman dual-process): System 1 for low-stakes/reversible questions, System 2 for high-stakes/irreversible/correctness gates; effort budget five states (automatic → depleted); say when the budget is strained instead of pretending to be deep
- Satisficing / bounded rationality (Simon): pre-declare the aspiration threshold BEFORE searching, stop at first adequate, never move the goalposts after failure (relax only predeclared non-load-bearing criteria, record the relaxation)
- Reversal test (Galef scout mindset): would you accept the same evidence reversed? Double standards = motivated reasoning; fix by weighing evidence both ways or rejecting both ways; adjust 10–15% toward 50%
- Bias audit (Galef / lex-bias): six quick checks (confirmation / availability / anchoring / affect heuristic / overconfidence / sunk cost) with direction + magnitude correction; CI surprise test (widen 1.5–2× when overconfident)
- Likelihood-ratio calibration (Bayes odds form): LR bands (1–3 weak / 3–10 moderate / 10–100 strong / 100+ definitive / <1 against); posterior odds = prior odds × LR; yesterday's posterior is today's prior
- Expected-value decision rule (von Neumann-Morgenstern): EV = Σ(pᵢ×vᵢ); guardrails (probabilities sum to 1, risk aversion/utility for one-shot high-stakes, tail risk never rounded to zero, sunk costs excluded, option value kept); explicit rule: max EV / max EU / minimax regret / satisfice
- ADR enriched to five-part template (Context → Decision → Alternatives → Consequences → Status)
- Guardrails: desire ≠ forecast (Galef); sunk costs stay sunk
- Academic backing extended: Kahneman, Simon, Galef, von Neumann-Morgenstern
- Evals 20 → 23 cases (reversal test, sunk cost/EV, effort routing/satisficing)

## 0.6.0 (2026-08-26)

- Argument-mapping discipline (Toulmin / van Gelder): contention → reasons → co-premises → warrant; flag weak links (inferences that don't hold, load-bearing premises without support); a map you cannot draw you cannot defend
- Structure ≠ truth (van Gelder): a formally perfect argument map proves nothing if the premises are false — inspect load-bearing premises, not just the logic
- Causal-ladder check (Pearl do-calculus): name the rung — association / intervention do(x) / counterfactual; backdoor check (missed confounder); collider trap (conditioning on a collider creates the bias)
- Self-reflection warning (Huang et al. 2023): internal re-reading is not verification; without an external signal, reflection drifts — name the test or source, or keep the original confidence
- PR/FAQ decision artifact (Amazon working backwards): hard-to-reverse product/strategy decisions documented as future press release + internal FAQ (evidence / assumptions / constraints / stop conditions)
- Guardrails: structure ≠ truth; reflection is not verification
- Academic backing extended: Toulmin, van Gelder, Pearl do-calculus, Reflexion / Huang et al.
- Evals 17 → 20 cases (argument mapping, collider trap, self-reflection drift)

## 0.5.0 (2026-08-26)

- Hypothesis-set discipline (CIA ACH / Heuer): 3–7 mutually exclusive candidates including an "awkward hypothesis" you don't believe; exactly one survivor → halt and generate 2–3 stress tests; "best of available" ≠ "true"
- Diagnostic-evidence check (ACH): score evidence against ALL candidates (C/I/N/NA); count the I's, not the C's; winner = fewest contradictions, not most confirmations; all-non-diagnostic matrix → reframe or gather better evidence
- Protective-belt check (Lakatos): patching a failing core with auxiliary assumptions = degenerating programme (red flag); Duhem-Quine: name the auxiliary assumptions explicitly
- Severity check (Mayo): a test counts only if it would have caught a wrong hypothesis — low P(E|¬H)
- Sensitivity analysis (ACH): remove the load-bearing evidence and re-run the verdict; a verdict that flips was fragile
- Guardrail: never explain everything — a hypothesis that post-hoc fits every outcome is unfalsifiable
- Academic backing extended: Heuer ACH, Lakatos, Mayo
- Evals 14 → 17 cases (hypothesis-set discipline, count the I's, sensitivity analysis)

## 0.4.0 (2026-08-26)

- Outside view first (superforecaster): reference class + base rate before the specific case; decomposition vs benchmark, gap >20pt triggers investigation
- Two-hypothesis discipline (LessWrong): maintain ≥2 hypotheses consistent with current facts
- Pre-committed predictions (harsh-critic / preregistration): write the scoreable probability BEFORE seeing evidence; Brier (p−y)² scoring
- Quantified pre-mortem (superforecaster): failure modes with probabilities, summed vs implied failure rate — resolve the contradiction
- Parallel attack lenses (pre-mortem skill): user / machine / developer / support; attack the reasoning chain itself, not just the plan
- Fermi fallback (cc-thinking-skills): bounded order-of-magnitude estimates when data is missing
- Forecaster calibration (Brier / brierbench): probability + kill criteria; self-scoring over time
- Multi-perspective review (MetaCrit / empathy-audit): executor / stakeholder / skeptic must agree
- Strong opinions, weakly held; uncertainty two-signal (action-confidence vs request-uncertainty, 0/0.5/1 anchored)
- Guardrails: circle of competence ("I don't know" is the calibrated answer); two-hypothesis discipline
- Evals 11 → 14 cases (pre-commitment, quantified pre-mortem, Fermi fallback)
- Academic backing in README: ICML 2026 Bayes-consistent agents, Google Bayesian LLMs, MetaCrit, UDora, CSA Red Teaming Guide

## 0.3.0 (2026-08-26)

- Red Flags table: eight "rationalizing thoughts → reality" pairs (superpowers-inspired)
- Frontier questioning (grilling-inspired): ask the whole open frontier in one round with recommended answers; never ask what you can look up
- Reasoning-type calibration (cognitive-core taxonomy): verdicts label deductive / inductive / abductive / analogical / counterfactual and calibrate accordingly
- Iron Law wrapped in an EXTREMELY-IMPORTANT gate, explicitly covering "obvious / well-known / everyone knows" claims

## 0.2.0 (2026-08-26)

- Stage 0 orientation check: detect pre-sealed conclusions (conclusion-preserving / completion-seeking / authority-preserving)
- Mental-model toolbox: 20+ models mapped to stages, full catalog in `references/mental-models.md`
- The Nudge: gentle mode for acted-on answers — 2-3 targeted questions, once per conversation
- Verify stage: explicit triangulation (two independent sources before raising confidence)
- Converge stage: verdicts must be checkable (specific claim or test that would change the mind)
- Evals expanded to 9 cases (nudge, orientation capture, base rate trap, verifiable verdict)
- triggers: frontmatter list for multi-agent compatibility

## 0.1.0 (2026-08-26)

- Initial release: the Falsify protocol (Axiomatize → Hypothesize → Adversarialize → Verify → Converge)
- Iron Law: no verdict without a falsifiable hypothesis
- Contextual gating: simple questions get simple answers
- Thinking ledger template for visible, auditable reasoning
- Evals: 5 cases + 18-point rubric with Iron Law gate
- Distribution: Claude Code, Codex, Cursor, OpenCode, Grok, Devin, agents marketplace
- i18n: English + 简体中文
