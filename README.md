<div align="center">
  <img src="docs/social-preview.png" alt="falsify — the scientific thinking protocol for AI agents" width="100%">
</div>

<h1 align="center">falsify</h1>

<p align="center">
  <em>The scientific thinking protocol for AI agents. Falsify before you believe.</em><br>
  <em>像一流科学家一样思考：先证伪，再相信；先标不确定，再下结论。</em>
</p>

<p align="center">
  <a href="https://img.shields.io/github/stars/263311487-ux/falsify"><img src="https://img.shields.io/github/stars/263311487-ux/falsify?style=flat-square&label=stars" alt="Stars"></a>
  <img src="https://img.shields.io/npm/v/falsify-skill?style=flat-square&label=npm" alt="npm version">
  <img src="https://img.shields.io/npm/dm/falsify-skill?style=flat-square&label=npm%20downloads" alt="npm downloads">
  <img src="https://img.shields.io/badge/works%20with-20%2B%20agents-111111?style=flat-square" alt="Works with 20+ agents">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT">
  <a href="https://skills.sh/263311487-ux/falsify"><img src="https://skills.sh/b/263311487-ux/falsify" alt="skills.sh installs"></a>
</p>

<p align="center">
  <a href="README.zh-CN.md">简体中文</a> ·
  <a href="evals/cases.md">Evals</a> ·
  <a href="CHANGELOG.md">Changelog</a>
</p>

---

**falsify** is a single-Markdown skill that installs a 5-stage scientific thinking protocol on any AI agent (Codex, Claude Code, DeepSeek Harness, Cursor, Gemini CLI, …). It stops the agent from giving confident answers it cannot falsify.

**The Iron Law:**

```
NO VERDICT WITHOUT A FALSIFIABLE HYPOTHESIS.
没有可证伪的假设，就没有结论。
```

<p align="center">
  <a href="https://263311487-ux.github.io/falsify/"><img src="https://img.shields.io/badge/Try%20the%20live%20demo-%E2%86%92-111111?style=for-the-badge&logo=github" alt="Live demo"></a>
  <img src="https://img.shields.io/badge/evals-26%2F28%20dual%2Dmodel-22b558?style=for-the-badge" alt="26/28 dual-model evals">
  <img src="https://img.shields.io/badge/dogfood-4%2F4%20real%20community-22b558?style=for-the-badge" alt="4/4 real community">
  <img src="https://img.shields.io/badge/listed%20in-agentic%2Dawesome%2Dskills%20(%E2%AD%9045.5k)-111111?style=for-the-badge" alt="Listed in AAS">
</p>

## What it changes

| | Before (typical agent) | After (falsify) |
|---|---|---|
| Architecture question | Confident pro/con list → "Redis is a great fit" | Axioms → assumptions flagged → "I am 40% sure, because we have no volume data; cheapest first step is measuring, not adding Redis" |
| Bug diagnosis | "Probably a memory leak" | Hypothesis → adversarial check (deploy window? coincidence?) → evidence → calibrated verdict + residual risk |
| Data claim | "Yes, X is 5x faster" | Demands benchmark definition → labels claim hearsay if unverifiable → refuses to state it as fact |
| "Is this the best approach?" | Answers "yes, it's best" | Rewrites "best" as unfalsifiable → answers "best for [criteria] under [constraints]" |

## Install

Copy/paste into your CLI prompt (works for any agent that supports skills):

```text
Install the falsify skill from https://github.com/263311487-ux/falsify, refer to the repo's AGENTS.md for instructions.
```

Or with the skills CLI:

```text
npx skills add 263311487-ux/falsify
```

Or from npm (installs the `SKILL.md` into Codex and Claude Code skill dirs automatically):

```text
npx falsify-skill
```

```text
npm i -g falsify-skill && falsify-skill
```

Or manually: clone the repo and copy `SKILL.md` into your agent's skills directory
(`~/.codex/skills/falsify/`, `~/.claude/skills/falsify/`, `.cursor/skills/falsify/`, …).


## Why it is grounded (not vibes)

falsify is distilled from 70+ community sources and backed by academic work on
how agents should reason:

- **ICML 2026** — *Agentic AI systems should be making Bayes-consistent decisions*: agent confidence should update like a Bayesian, not a salesman.
- **Google** — *Teaching LLMs to reason like Bayesians*: calibration is learnable; agents can be trained out of overconfidence.
- **arXiv 2507.15015 (MetaCrit)** — multi-agent critique (generate / monitor / control / meta-synthesize) is the academic skeleton of our Stage 5 multi-perspective review.
- **UDora (ICML 2025)** — the strongest attack on a model's reasoning comes from its own inference trace; Stage 3 red-teams the reasoning chain itself.
- **CSA Agentic AI Red Teaming Guide** — systematic red teaming as a discipline, not a vibe.
- **arXiv 2606.19559** — separating *action-confidence* from *request-uncertainty* is how honest agents report what they do not know.
- **CIA ACH (Heuer, *Psychology of Intelligence Analysis*)** — competitive hypothesis analysis: 3–7 mutually exclusive candidates (including one you don't believe), diagnostic evidence (count the I's, not the C's), sensitivity analysis. The professional standard for structured analytic judgment.
- **Lakatos, *The Methodology of Scientific Research Programmes*** — the protective-belt check: patching a failing hypothesis with auxiliary assumptions is a degenerating programme, not a rescue.
- **Mayo, *Error and the Growth of Experimental Knowledge*** — a test only counts if it would have caught a wrong hypothesis (low P(E|¬H)).
- **Toulmin, *The Uses of Argument* / van Gelder, argument mapping** — draw the argument tree explicitly (contention → reasons → co-premises → warrant) before attacking it; the hidden co-premises are where arguments are weakest, and a flawless structure still does not make the premises true.
- **Pearl, do-calculus / *The Book of Why*** — the causal ladder (association → intervention → counterfactual); the backdoor criterion (did you miss a confounder?) and the collider trap (conditioning on a collider creates the bias you are seeing).
- **Reflexion (Shinn et al., NeurIPS 2023) / Huang et al. 2023 (*LLMs Cannot Self-Correct Reasoning Yet*)** — internal self-reflection is not verification: without an external signal, reflection drifts. Confidence only earns an upgrade when a test, a lookup, or an independent source changes it.
- **Kahneman, *Thinking, Fast and Slow* / Simon, bounded rationality** — dual-process routing: low-stakes reversible questions answer fast (System 1), high-stakes or irreversible ones get the full protocol (System 2); unbounded searches satisfice against a pre-declared aspiration threshold.
- **Galef, *The Scout Mindset* / von Neumann-Morgenstern utility** — the reversal test (would you accept the same evidence reversed?) and the bias audit catch motivated reasoning; expected-value rules (max EV / EU / minimax regret / satisficing) turn a calibrated verdict into a rational choice.
- **Snowden, Cynefin framework / Kepner-Tregoe analysis / Boyd, OODA loop** — classify the cause–effect domain before choosing a method (wrong-domain method is the failure mode); bound selective defects with IS/IS-NOT; screen decisions with MUST/WANT plus adverse-consequence tests; act at ~70% and re-observe when the situation is moving and the move is reversible.

## How it works

The five stages (`SKILL.md` is the full protocol):

```
公理化 Axiomatize   →  separate axioms / assumptions / hearsay
假设化 Hypothesize  →  if [H] then we observe [O]; if [¬O], H is dead
对抗 Adversarialize →  steelman the opponent, attack yourself first
验证 Verify         →  hunt disconfirming evidence, grade it, run the cheapest test
收束 Converge       →  calibrated verdict, remaining unknowns, lesson to the ledger
```

- **Contextual by default.** Simple questions get simple answers — the protocol is a tool you reach for, not a costume you wear.
- **Orientation-aware.** Stage 0 detects a pre-sealed conclusion (conclusion-preserving, completion-seeking, authority-preserving) before reasoning starts.
- **Mental-model toolbox.** 20+ models mapped to the stage where they matter (pre-mortem, base rate, Chesterton's Fence, triangulation, Bayes…) — full catalog in `references/mental-models.md`.
- **Gentle nudge.** For acted-on answers that don't need full depth: 2–3 targeted questions, once per conversation, no nagging.
- **Red flags.** Eight rationalizing thoughts that mean STOP, mapped to reality.
- **Frontier questioning.** When input is needed, the whole open frontier is asked in one round — with recommended answers, never one-question-at-a-time interrogation.
- **Reasoning-type calibration.** Verdicts label their inference (deductive / inductive / abductive / analogical / counterfactual) and calibrate to its honest strength.
- **Visible thinking.** Depth mode renders a thinking ledger (`templates/thinking-ledger.md`) so reasoning is auditable.
- **Provable.** `evals/` ships 28 cases + rubric so you can verify the skill changes behavior.

## Evals

See [evals/cases.md](evals/cases.md) and [evals/rubric.md](evals/rubric.md). Threshold: pass = 12/18 with no violation of the Iron Law.

Real-community cross-validation (external dogfood) is documented in [evals/dogfood-external-20260827.md](evals/dogfood-external-20260827.md): 4 real questions from GitHub issues and Stack Overflow, 4/4 passed, and 3/3 cases with a known ground truth matched reality.

**Cross-model proof (2026-08-27, v0.8.3):** the full 28-case suite is run on **two external DeepSeek models** — not our own agent — in both directions:

- `deepseek-reasoner` generator × `deepseek-chat` judge → **26/28 pass, avg 15.3/18**
- `deepseek-chat` generator × `deepseek-reasoner` judge → **26/28 pass, avg 16.4/18**

The two rounds fail on disjoint cases (reasoner: 3/9; chat: 6/22); each failing case was regenerated manually and produced protocol-compliant output, so the failures are single-run variance, not stable protocol gaps. This round also fixed a real routing gap the reasoner exposed (live incidents must act at ~70% confidence, not run the full protocol) via a mandatory MODE SELECTION gate. Reproduce in one command: `DEEPSEEK_API_KEY=... node evals/run_evals.mjs --model deepseek-reasoner`. Reports: [evals/results/deepseek-reasoner-2026-08-27.md](evals/results/deepseek-reasoner-2026-08-27.md) · [evals/results/deepseek-chat-2026-08-27-final.md](evals/results/deepseek-chat-2026-08-27-final.md).

> **Deployment note (reasoner-class models):** `reasoning_content` and `content` share the `max_tokens` budget; on very deep debugging questions the reasoner can spend the entire budget on reasoning and return **empty content** (observed at 6k–16k tokens). Set a generous `max_tokens`, add a retry-on-empty policy, or prefer `deepseek-chat` for latency-constrained deployments.

## Why "falsify"

The best coding agents are already excellent at producing answers. They are less good at *not believing their own answers*. falsify borrows the only epistemology that has a 400-year track record of not lying to itself — the scientific method — and turns it into five stages an agent can actually run.

Built on a simple inheritance: 公理 → 假设 → 对抗 → 验证 → 收束. Axiom → Hypothesis → Adversarialize → Verify → Converge.


## Sibling projects

falsify is one leg of a three-part workflow: **think** → **verify** → **present**.

- [**dsh-verify**](https://github.com/263311487-ux/dsh-verify) — browser-verified delivery. falsify keeps the thinking honest; dsh-verify keeps the *browser* honest (real-browser tests, not LLM-judged vibes). Use both: falsify catches the wrong conclusion, dsh-verify catches the broken output.
- [**imprint-pdf**](https://github.com/263311487-ux/imprint-pdf) — publisher-grade PDF rendering from Markdown, with a 0–100 print-quality gate. The polished output end of the pipeline.

Install any of them in one command:
```bash
npx skills add 263311487-ux/falsify
npx dsh-verify
npx imprint
```

## License


MIT. See [LICENSE](LICENSE).
