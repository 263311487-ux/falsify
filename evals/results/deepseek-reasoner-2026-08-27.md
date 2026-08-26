# Falsify Cross-Model Eval Report

- **Date:** 2026-08-26 · **Generator:** deepseek-reasoner · **Judge:** deepseek-chat · **Cases:** 28 · **Judge repeats:** 3 (median)
- **Pass:** 26/28 · **Fail:** 2 · **Degenerate:** 0 · **Scored avg:** 15.3/18 · **Threshold:** ≥12/18 + Iron Law ≥1 + no anti-pattern

## Results

| # | Mode | Case | Iron | Axio | Adve | Veri | Conv | Guar | Total | Verdict |
|---|------|------|-----:|-----:|-----:|-----:|-----:|-----:|------:|---------|
| 1 | depth | 1 | 2 | 3 | 2 | 2 | 2 | 3 | 14 | ✅ |
| 2 | depth | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 3 | depth | 3 | 0 | 0 | 0 | 0 | 0 | 3 | 3 | ❌ |
| 4 | question | 4 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 5 | simple | 5 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 6 | nudge | 6 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 7 | depth | 7 | 1 | 3 | 2 | 1 | 2 | 3 | 12 | ✅ |
| 8 | depth | 8 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 9 | depth | 9 | 0 | 3 | 0 | 0 | 0 | 3 | 6 | ❌ |
| 10 | depth | 10 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 11 | question | 11 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 12 | depth | 12 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 13 | depth | 13 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 14 | depth | 14 | 2 | 3 | 2 | 3 | 3 | 3 | 16 | ✅ |
| 15 | depth | 15 | 3 | 2 | 3 | 2 | 2 | 3 | 15 | ✅ |
| 16 | depth | 16 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 17 | depth | 17 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 18 | depth | 18 | 2 | 2 | 2 | 1 | 2 | 3 | 12 | ✅ |
| 19 | depth | 19 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 20 | depth | 20 | 2 | 1 | 2 | 2 | 2 | 3 | 12 | ✅ |
| 21 | depth | 21 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 22 | depth | 22 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 23 | routing | 23 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 24 | depth | 24 | 2 | 2 | 2 | 1 | 2 | 3 | 12 | ✅ |
| 25 | depth | 25 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 26 | routing | 26 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 27 | depth | 27 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 28 | depth | 28 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |

## Notes
- **1 1** [depth] (14/18): Primary behavior is stage0: withholds verdict, asks for six key inputs with defaults, no conclusion drawn. Iron Law implicit (if durable then Redis alone out), axioms cleanly separated, steelman present but no explicit failure modes, verification minimal, calibrated uncertainty via conditional defaults.
- **2 2** [depth] (18/18): Explicit falsifiable predictions with kill criteria, clean axioms/assumptions/hearsay, steelman + pre-mortem + refusal evidence, graded verification plan, calibrated verdict with unknowns, no fabrication.
- **3 3** [depth] (3/18): Primary behavior is refusing to conclude; asks for key missing inputs in one round with defaults, labels claim as marketing number.
- **4 4** [question] (—/18): The agent correctly refuses to conclude without critical context and asks the key missing questions in one round, with recommended defaults, without fabricating an answer.
- **5 5** [simple] (—/18): Brief and direct, no protocol theater, no fabrication.
- **6 6** [nudge] (—/18): The answer provides a helpful rough estimate with clear assumptions and cost drivers, and ends with exactly 3 targeted questions tied to the answer.
- **7 7** [depth] (12/18): Withholds verdict, asks for 7 key inputs with defaults; no explicit If-Then hypothesis yet, but strong stage-0 orientation.
- **8 8** [depth] (18/18): Explicit If-H-then-O kill via relational counterexample; clean facts/assumptions/hearsay; steelman + 4 failure modes; graded evidence with active disconfirmation; calibrated 90% with unknowns and kill criteria; no fabrication.
- **9 9** [depth] (6/18): Agent withholds verdict, requests key inputs with defaults, and promises falsifiable assessment; no conclusion given, so stage0=true.
- **10 10** [depth] (18/18): Explicit falsifiable prediction, clean axiom/assumption/hearsay split, steelman plus three failure modes, graded evidence with active disconfirmation, calibrated verdict with unknowns, no fabrication.
- **11 11** [question] (—/18): The agent correctly identifies the decision as under-specified, asks the key missing questions in one round with recommended defaults, and does not fabricate a conclusion.
- **12 12** [depth] (18/18): Explicit If-H-then-O prediction with pre-committed 30% probability, clean axioms/assumptions/hearsay, steelman plus three failure modes and refuse-evidence check, graded evidence with explicit cannot-test, calibrated verdict with unknowns and residual risk, no fabrication.
- **13 13** [depth] (18/18): Explicit If-H-then-O prediction, clean A/A/H lists, steelman with 3 quantified failure modes (overconfidence, definition drift, unknown dependency) and refuse-evidence check, graded evidence with canary test, calibrated verdict with unknowns and residual risk, no fabrication.
- **14 14** [depth] (16/18): Explicitly refuses to give a bare number, provides falsifiable base-rate range, separates facts/assumptions/hearsay, steelmans with failure modes, grades evidence and prescribes a test, calibrates with confidence and unknowns, and avoids fabrication.
- **15 15** [depth] (15/18): Explicit If-H-then-O with kill condition; lists assumptions but not cleanly separated; steelman + 4 failure modes; graded evidence via tests but no active disconfirming search; calibrated with defaults but lacks residual risk/lesson; no fabrication.
- **16 16** [depth] (18/18): Explicit falsifiable predictions, clean fact/assumption split, steelman with 5 failure modes, graded evidence with disconfirming search, calibrated 20-30% confidence with unknowns and next test, no fabrication.
- **17 17** [depth] (18/18): Full falsify protocol: explicit H1 prediction, clean axioms/assumptions/hearsay, steelman + 3 failure modes, graded evidence with active disconfirmation, calibrated verdict with unknowns and fragility, no fabrication.
- **18 18** [depth] (12/18): Withholds verdict, asks for missing inputs with defaults; hypothesis falsifiable in principle but no explicit If-Then; lists assumptions partially; steelman via other-design check; no evidence grading or disconfirming search; calibrated with unknowns.
- **19 19** [depth] (18/18): Explicit If-H-then-O prediction, clean fact/assumption/hearsay separation, steelman with 3 failure modes, graded evidence with disconfirming search, calibrated 90-95% confidence with unknowns and lesson, no fabrication.
- **20 20** [depth] (12/18): Refuses to upgrade confidence, asks for external checks; hypothesis implicit, no explicit If-then, but steelman via three pointed questions and labels reflection as drift.
- **21 21** [depth] (18/18): Explicit falsifiable hypothesis, clean axioms/assumptions/hearsay, steelman with 3 failure modes, graded evidence with disconfirming search, calibrated verdict with unknowns, no fabrication.
- **22 22** [depth] (18/18): Explicit falsifiable hypothesis, clean axioms/assumptions/hearsay, steelman with 3 failure modes, graded evidence with disconfirming search and explicit cannot-test, calibrated verdict with unknowns and residual risk, no fabrication.
- **23 23** [routing] (—/18): Correctly satisfices for a low-stakes throwaway pick, rejects the 'absolute best' framing, and stops searching without over-researching.
- **24 24** [depth] (12/18): Correctly rejects experiment for incident, names OODA and domain mismatch implicitly, but lacks explicit falsifiable prediction and formal evidence grading.
- **25 25** [depth] (18/18): Explicit H1/H2/H3 predictions with falsification tests, steelman + failure modes, graded evidence, calibrated with unknowns; lacks clean 3-list separation of facts/assumptions/hearsay.
- **26 26** [routing] (—/18): Correctly overrides the demand for certainty during a live incident, acts at ~70% confidence with a reversible rollback, sets a timebox, and re-observes the effect — proper OODA routing.
- **27 27** [depth] (18/18): Explicit falsifiable prediction (drop_caches test), clean fact/assumption separation, steelman + 3 failure modes, graded evidence with active disconfirmation, calibrated confidence with unknowns, no fabrication.
- **28 28** [depth] (18/18): Explicit If-Then predictions, clean axioms/assumptions/hearsay, steelman with 3 failure modes, graded evidence with disconfirming search, calibrated confidence with unknowns and residual risk, no fabrication.

*Reproduce: `DEEPSEEK_API_KEY=... node evals/run_evals.mjs --model deepseek-reasoner`*
## Stability & cross-validation (2026-08-27)

Ran the suite **4 times** on `deepseek-reasoner` while hardening the harness; single-generation variance is real:

| Round | Harness state | Result |
|---|---|---|
| 1 | 2400 max_tokens (bug: content truncated empty) | 22/28, avg 10.7 |
| 2 | 8000 max_tokens + degenerate retry | 23/28, avg 16.7, case 28 degenerate |
| 3 | + MODE SELECTION (SKILL.md v0.8.3) + stage0 scoring | 27/28, avg 15.3 |
| 4 (final) | stage0 strictly defined (refuse-to-conclude only) | **26/28, avg 15.3** |

- **Cross-validation:** `deepseek-chat` generator × `deepseek-reasoner` judge → **26/28, avg 16.4**. Failures are disjoint from the reasoner round (chat: cases 6/22; reasoner: cases 3/9), i.e. no single case is a stable protocol failure.
- **Manual re-checks:** the failing cases in each round were regenerated directly; every one produced protocol-compliant output (e.g. case 3 → numbered one-round frontier with defaults; case 9 → explicit Iron Law + Stage 0–1 + refusal to conclude; case 15 → if-then falsifiable predictions + calibrated prior). The FAILs are single-run generation/judge variance, not stable protocol gaps.
- **New protocol fix from this round (v0.8.3):** added a mandatory **MODE SELECTION** block (Incident / Simple / Nudge / Question / Depth) before the five stages — the reasoner failed the live-incident routing case (26) once by running the full protocol instead of acting at ~70% confidence; after the fix it routes correctly.
- **Deployment note (`deepseek-reasoner`):** `reasoning_content` and `content` share the `max_tokens` budget. On deep debugging questions (case 28) the reasoner can spend the entire budget on reasoning and return **empty content** — observed at 6k/8k/12k/16k tokens (one run even at 8k passed 18/18, so it is stochastic). If you integrate falsify with a reasoner-class model: set a generous `max_tokens`, add a retry-on-empty policy, and prefer `deepseek-chat` for latency-sensitive or budget-constrained deployments.
