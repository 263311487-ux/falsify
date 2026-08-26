# Falsify Cross-Model Eval Report

- **Date:** 2026-08-26 · **Generator:** deepseek-chat · **Judge:** deepseek-reasoner · **Cases:** 28 · **Judge repeats:** 3 (median)
- **Pass:** 26/28 · **Fail:** 2 · **Degenerate:** 0 · **Scored avg:** 16.4/18 · **Threshold:** ≥12/18 + Iron Law ≥1 + no anti-pattern

## Results

| # | Mode | Case | Iron | Axio | Adve | Veri | Conv | Guar | Total | Verdict |
|---|------|------|-----:|-----:|-----:|-----:|-----:|-----:|------:|---------|
| 1 | depth | 1 | 3 | 3 | 3 | 2 | 3 | 3 | 17 | ✅ |
| 2 | depth | 2 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 3 | depth | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 4 | question | 4 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 5 | simple | 5 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 6 | nudge | 6 | 0 | 0 | 0 | 0 | 0 | 0 | — | ❌ |
| 7 | depth | 7 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 8 | depth | 8 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 9 | depth | 9 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 10 | depth | 10 | 3 | 3 | 2 | 2 | 3 | 3 | 16 | ✅ |
| 11 | question | 11 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 12 | depth | 12 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 13 | depth | 13 | 3 | 3 | 3 | 2 | 3 | 3 | 17 | ✅ |
| 14 | depth | 14 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 15 | depth | 15 | 3 | 3 | 3 | 2 | 3 | 3 | 17 | ✅ |
| 16 | depth | 16 | 3 | 3 | 2 | 2 | 3 | 3 | 16 | ✅ |
| 17 | depth | 17 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 18 | depth | 18 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 19 | depth | 19 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 20 | depth | 20 | 3 | 3 | 3 | 3 | 3 | 3 | 18 | ✅ |
| 21 | depth | 21 | 3 | 3 | 3 | 2 | 3 | 3 | 17 | ✅ |
| 22 | depth | 22 | 1 | 1 | 1 | 0 | 2 | 3 | 8 | ❌ |
| 23 | routing | 23 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 24 | depth | 24 | 1 | 0 | 1 | 0 | 1 | 1 | 4 | ✅ |
| 25 | depth | 25 | 3 | 3 | 3 | 2 | 3 | 3 | 17 | ✅ |
| 26 | routing | 26 | 0 | 0 | 0 | 0 | 0 | 0 | — | ✅ |
| 27 | depth | 27 | 3 | 3 | 3 | 2 | 3 | 3 | 17 | ✅ |
| 28 | depth | 28 | 3 | 3 | 3 | 2 | 3 | 3 | 17 | ✅ |

## Notes
- **1 1** [depth] (17/18): Gives calibrated verdict with explicit hypotheses; verification proposes test but doesn't run or explicitly say cannot test.
- **2 2** [depth] (18/18): Protocol withholds verdict, asks for logs/deploy/scope/repro in one numbered round; all six dimensions explicit and rigorous.
- **3 3** [depth] (18/18): Rigorous falsification protocol with explicit predictions, steelman, graded evidence, calibrated conclusion, and clear unknowns; calibrated verdict makes stage0 false.
- **4 4** [question] (—/18): Correctly refuses to conclude and asks the key clarifying questions (what, context, stakes) in one round.
- **5 5** [simple] (—/18): It's currently 10:41 AM in Shanghai, China (Asia/Shanghai time zone, UTC+8).
- **6 6** [nudge] (—/18): Helpful estimate, but it ends with a data-egress note instead of closing with the three targeted questions.
- **7 7** [depth] (18/18): Explicit stage-0 refusal to validate; falsifiable predictions, steelman, and calibrated uncertainty; explicitly cannot verify without use case.
- **8 8** [depth] (18/18): Strong protocol adherence; verify gets 2 because the cheapest real test is proposed but not run, though evidence grading and disconfirming search are thorough.
- **9 9** [depth] (18/18): Rigorous falsifiable reasoning with clean assumptions, steelman, failure modes, explicit cannot-test, and calibrated conclusion.
- **10 10** [depth] (16/18): Strong falsifiable protocol but lacks a true steelman of the claim and does not run/explicitly decline the proposed test.
- **11 11** [question] (—/18): Asks the key missing questions in one round with recommended default answers and refuses to give a firm recommendation without context.
- **12 12** [depth] (18/18): Full falsify protocol: explicit falsifiable prediction, steelman, graded evidence, calibrated 20-30% verdict with unknowns and kill criterion; no fabrication found.
- **13 13** [depth] (17/18): Strong falsification structure but Verify lacks explicit test-run or explicit cannot-test.
- **14 14** [depth] (18/18): Clear calibrated refusal with explicit hypotheses, steelman, test design, and bounded Fermi estimate; stage0 false because a calibrated conclusion was given.
- **15 15** [depth] (17/18): Strong falsification protocol with calibrated 40% verdict; verify lacks an actual test run/explicit cannot-test.
- **16 16** [depth] (16/18): Strong falsification framing, but lacks explicit steelman and an explicit cannot-test statement for Verify.
- **17 17** [depth] (18/18): Calibrated verdict to not switch; explicit falsifiable H1, clean lists, steelman+3 failure modes, graded evidence with active disconfirming, confidence/unknowns.
- **18 18** [depth] (18/18): Runs full falsification protocol with explicit predictions, clean axiom/assumption/hearsay split, steelman, calibrated verdict, and honest uncertainty.
- **19 19** [depth] (18/18): Exemplary falsification: explicit hypotheses, clean axioms, steelman, causal-ladder/collider checks, calibrated verdict with residual risk.
- **20 20** [depth] (18/18): Explicit falsifiable H1/H2, three clean lists, steelman + failure modes + refusal check, graded evidence with active test question, calibrated 65% with unknowns, no fabrication.
- **21 21** [depth] (17/18): Strong calibrated protocol; lacks explicit steelman and actual test run, but clear falsifiable predictions and evidence grading.
- **22 22** [depth] (8/18): Gives a conditional EV verdict rather than a bare refusal; lacks empirical hypothesis and evidence grading.
- **23 23** [routing] (—/18): Correctly routes to satisfice mode, gives a direct choice, and refuses to chase a 16th linter.
- **24 24** [depth] (4/18): Correct stage0 routing (OODA, no experiment) but no falsification content: no explicit hypothesis, evidence grading, steelman, or uncertainty labels.
- **25 25** [depth] (17/18): Calibrated diagnostic with explicit hypotheses, steelman, and unknowns; Verify capped at 2 because tests are proposed but not run.
- **26 26** [routing] (—/18): Correctly prioritizes reversible action over certainty during a live incident.
- **27 27** [depth] (17/18): Strong falsifiable protocol, but no test run or explicit 'cannot test' so Verify=2; calibrated conclusion so stage0=false.
- **28 28** [depth] (17/18): Strong structured falsification with calibrated verdict; Verify lacks an executed/explicitly-cannot-test diagnostic despite clear test design.

*Reproduce: `DEEPSEEK_API_KEY=... node evals/run_evals.mjs --model deepseek-chat`*