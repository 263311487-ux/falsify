# Falsify Cross-Model Eval Report

- **Date:** 2026-08-26 · **Generator:** deepseek-chat · **Judge:** deepseek-chat · **Cases:** 28 · **Judge repeats:** 3 (median)
- **Pass:** 26/28 · **Average:** 13.5/18 · **Threshold:** ≥12/18 + Iron Law ≥1 + no anti-pattern

## Results

| # | Mode | Case | Iron | Axio | Adve | Veri | Conv | Guar | Total | Verdict |
|---|------|------|-----:|-----:|-----:|-----:|-----:|-----:|------:|---------|
| 1 | depth | 1 | 2 | 3 | 3 | 2 | 3 | 3 | 16 | ✅ |
| 2 | depth | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 3 | depth | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 4 | question | 4 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 5 | simple | 5 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 6 | nudge | 6 | 0 | 0 | 0 | 0 | 0 | 0 | — | ❌ |
| 7 | depth | 7 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 8 | depth | 8 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 9 | depth | 9 | 2 | 3 | 3 | 2 | 2 | 3 | 15 | ✅ |
| 10 | depth | 10 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 11 | question | 11 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 12 | depth | 12 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 13 | depth | 13 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 14 | depth | 14 | 1 | 1 | 1 | 1 | 2 | 2 | 8 | ❌ |
| 15 | depth | 15 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 16 | depth | 16 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 17 | depth | 17 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 18 | depth | 18 | 3 | 3 | 3 | 2 | 3 | 3 | 17 | ✅ |
| 19 | depth | 19 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 20 | depth | 20 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 21 | depth | 21 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 22 | depth | 22 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 23 | routing | 23 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 24 | depth | 24 | 2 | 3 | 3 | 3 | 3 | 3 | 17 | ✅ |
| 25 | depth | 25 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 26 | routing | 26 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 27 | depth | 27 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 28 | depth | 28 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |

## Notes
- **1 1** [depth] (16/18): Strong falsifiable hypotheses with explicit if-then predictions; clean axioms/assumptions/hearsay; steelman plus failure modes and refuse-evidence check; evidence graded but no active disconfirming search or test run (asks for missing context, which is correct protocol); calibrated 75% with unknowns and kill criteria; no fabrication, labels guesses.
- **2 2** [depth] (18/18): Exemplary: explicit falsifiable predictions per hypothesis, clean axioms/assumptions/hearsay, steelman + 3 failure modes + refuse-evidence, graded evidence with explicit 'cannot test' constraint, calibrated <30% confidence with unknowns and residual risk, no fabrication.
- **3 3** [depth] (18/18): Exemplary: explicit falsifiable hypotheses with If-then-O predictions, clean axioms/assumptions/hearsay, steelman + 3 failure modes + refuse-evidence check, graded evidence with active disconfirming search and explicit 'cannot test', calibrated confidence with unknowns/residual risk, and correct refusal to conclude without benchmark context.
- **4 4** [question] (—/18): The agent correctly refuses to conclude without critical missing information and asks the key clarifying questions in one round, with recommended answers.
- **5 5** [simple] (—/18): Brief and direct answer with no protocol theater.
- **6 6** [nudge] (—/18): The answer is helpful but ends with only one incomplete question, not at least 3 targeted questions tied to the answer.
- **7 7** [depth] (18/18): Exemplary: explicit falsifiable If-then predictions for both Redis and simpler alternative; clean axioms/assumptions/hearsay; steelman plus three failure modes and refuse-evidence check; graded evidence with active disconfirming search and explicit 'cannot test' pending context; calibrated 60% confidence with unknowns and residual risk; no fabrication, labels guesses, asks for missing context rather than overclaiming.
- **8 8** [depth] (18/18): Exemplary falsify protocol: explicit If-then prediction, clean axioms/assumptions/hearsay, steelman + 3 failure modes + refuse-evidence check, graded evidence with disconfirming search, calibrated verdict with unknowns and residual risk, no fabrication. Correctly refuses to conclude without workload specifics.
- **9 9** [depth] (15/18): Excellent protocol adherence; asks for context, provides falsifiable predictions, steelman, and calibrated confidence. Verify lacks active disconfirming search beyond asking for load test, and Converge lacks explicit residual risk/lesson.
- **10 10** [depth] (18/18): Exemplary: explicit falsifiable predictions, clean axiom/assumption/hearsay split, steelman + 3 failure modes + refuse-evidence check, graded evidence with active disconfirmation, calibrated with unknowns/residual risk, no fabrication — correctly refuses to conclude on unspecified approach.
- **11 11** [question] (—/18): The agent correctly refuses to conclude and asks for missing critical context (team skills, workload, deployment, constraints) in one round, without fabricating a recommendation.
- **12 12** [depth] (18/18): Exemplary falsification protocol: explicit If-then-¬O hypothesis, clean axioms/assumptions/hearsay, steelman with three failure modes and refuse-evidence check, graded evidence with active disconfirmation and explicit 'cannot test', calibrated verdict with unknowns and residual risk, and no fabrication—correctly refuses to conclude without data.
- **13 13** [depth] (18/18): Exemplary: explicit falsifiable predictions, clean axioms/assumptions/hearsay, steelman + quantified failure modes summed (115%) vs implied 10%, non-diagnostic evidence table, calibrated 40% with unknowns and residual risk, no fabrication.
- **14 14** [depth] (8/18): Provides order-of-magnitude range with assumptions and honest uncertainty; lacks explicit falsifiable prediction, clean fact/assumption/hearsay separation, steelman/failure modes, and active disconfirming search, but correctly avoids overclaiming and offers test commands.
- **15 15** [depth] (18/18): Excellent protocol execution: explicit If-then-¬O prediction, clean three-list axiomatization, steelman with 3 failure modes and refuse-evidence check, graded verification with EXPLAIN ANALYZE test, calibrated 20% confidence with unknowns and residual risk, no fabrication. Correctly refuses to conclude without context. Minor gap: Stage 2 lists only one candidate rather than 3-7 mutually exclusive alternatives, but the adversarialize section covers the missing candidates.
- **16 16** [depth] (18/18): Explicit If-then hypothesis, clean axioms/assumptions/hearsay, steelman plus 3 failure modes and refuse-evidence check, graded evidence with disconfirming test, calibrated 40% confidence with unknowns and residual risk, no fabrication and clear uncertainty labeling.
- **17 17** [depth] (18/18): Exemplary: explicit If-then prediction, clean axioms/assumptions/hearsay, steelman + 3 quantified failure modes + refuse-evidence check, graded evidence with LR and bias audit, calibrated verdict with unknowns/residual risk/sensitivity, no fabrication.
- **18 18** [depth] (17/18): Explicit falsifiable predictions (H1-H3), clean axioms/assumptions/hearsay, steelman + 3 failure modes + refuse-evidence check, calibrated 40% with unknowns and change-mind conditions; verify lacks active disconfirming search beyond one question, but protocol-correctly asks for missing context rather than overclaiming.
- **19 19** [depth] (18/18): Explicit If-then predictions, clean axiom/assumption/hearsay lists, steelman + 3 failure modes + refuse-evidence, graded evidence with collider/backdoor checks and concrete tests, calibrated verdict with unknowns and kill criteria, no fabrication.
- **20 20** [depth] (18/18): Exemplary falsification protocol: explicit falsifiable prediction, clean axioms/assumptions/hearsay, steelman with three failure modes and refuse-evidence check, graded evidence with disconfirming search and test-run request, calibrated confidence with unknowns and residual risk, and no fabrication—correctly refuses to upgrade confidence without external verification.
- **21 21** [depth] (18/18): Exemplary full protocol: explicit H1-H3 with predictions, clean axioms/assumptions/hearsay split, steelman + 3 failure modes + protective-belt refusal check, graded evidence with active disconfirming search, calibrated 40% confidence with unknowns/residual risk, and a sharp reversal-test question exposing the user's double standard. No fabrication, no overclaim.
- **22 22** [depth] (18/18): Explicit If-then hypotheses, clean axioms/assumptions/hearsay, steelman + 3 failure modes + evidence-to-change-mind, EV test with disconfirming search and explicit data limits, calibrated 85% with unknowns and residual risk, no fabrication and clearly labels unverified assumptions.
- **23 23** [routing] (—/18): Correctly routes to lightweight mode for a low-stakes reversible throwaway decision, satisfices with a direct recommendation, refuses to chase the 16th option, and avoids full protocol theater.
- **24 24** [depth] (17/18): Excellent protocol execution, but misclassifies domain as Complicated; a chaotic outage requires Act-Sense-Respond, not analyze-first. Scores reflect strong falsification rigor despite the routing error.
- **25 25** [depth] (18/18): Exemplary falsification protocol: explicit If-then predictions, clean axioms/assumptions/hearsay, steelman with quantified failure modes, graded evidence with active disconfirming search, calibrated convergence with kill criteria, and no fabrication. Correctly refuses to conclude without data.
- **26 26** [routing] (—/18): Correctly rejects full RCA during live incident, routes to OODA with reversible mitigation, rollback, and time-boxed action.
- **27 27** [depth] (18/18): Exemplary protocol execution: explicit falsifiable predictions, clean axioms/assumptions/hearsay, steelman with 3 failure modes, graded evidence with active disconfirming test (cold-cache), calibrated 85% confidence with unknowns and residual risk, no fabrication. Correctly flags benchmark as measurement claim needing audit.
- **28 28** [depth] (18/18): Exemplary falsification: explicit hypotheses with predictions, steelman counter-argument, quantified failure modes, active disconfirming search, calibrated verdict with unknowns and residual risk. No fabrication; labels guesses; asks for stack trace before concluding.

*Reproduce: `DEEPSEEK_API_KEY=... node evals/run_evals.mjs --model deepseek-chat`*
## Methodology & Known Limits

- **Reproduce:** `DEEPSEEK_API_KEY=... node evals/run_evals.mjs --model deepseek-chat --judge-model deepseek-chat --repeat 3`
- **Pipeline:** parse `evals/cases.md` → generate one answer per case with the full `SKILL.md` as system context → score with 3 independent judge calls (median per dimension) against `evals/rubric.md`.
- **Modes:** depth cases score 6 dimensions (0–3 each, pass ≥12/18 + Iron Law ≥1 + no anti-pattern). simple / nudge / question / routing cases use a separate ok/pass criterion (the correct lightweight behavior is the goal, full-depth is a fail).
- **Known limits:** the generator and judge are the same family (deepseek-chat), so this is a *cross-model* check (not Codex), not a fully independent judge. Boundary cases 6 and 14 flip between runs due to generation sampling; average over runs. A second generation sample would tighten this.
