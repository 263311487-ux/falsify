# Failure cases and evidence limits

The dated model reports contain failures: 2 of 28 cases in each cross-model run. The reports also record manual retries. A retry is qualitative follow-up; it cannot prove that an original failure was mere sampling variance or that no stable protocol gap exists.

The exact run date is unresolved: report headers say 2026-08-26 while filenames and notes say 2026-08-27. Model aliases are not immutable snapshots, and raw responses, historical prompt hashes, paired baselines, pre-registered seeds, held-out cases, and independent replication are absent.

Use these files as dated observations of protocol adherence, not as a correctness certificate. The bundled CLI is a deterministic heuristic coach; it cannot verify facts, run experiments, or guarantee an agent follows `SKILL.md`.

## Recorded failures (not regenerated scores)

| Historical report | Case | Reported result | What remains unresolved |
|---|---|---|---|
| reasoner generator | 3 | 3/18, FAIL | Judge notes describe refusing to conclude, yet Iron Law was scored zero; raw judge records are absent. |
| reasoner generator | 9 | 6/18, FAIL | Notes describe Stage-0 refusal; classification versus rubric handling cannot be independently reconstructed. |
| chat generator | 6 | Nudge, FAIL | Helpful estimate did not end with the targeted questions required by this rubric. |
| chat generator | 22 | 8/18, FAIL | Conditional expected-value verdict lacked empirical hypothesis and evidence grading. |

The chat report also marks case 24 as PASS at 4/18 via routing/Stage-0 handling. Thus 26/28 is the report's recorded pass count, not 26 ordinary depth scores above 12. Judge repeats are not independent generation seeds. Original report bytes are retained with SHA-256 hashes in [provenance](../evals/provenance.json); their earlier strong interpretation is superseded here.

The CLI still uses keywords rather than semantic understanding. It has no automatic Question-mode classifier, cannot reliably understand negation or every high-stakes phrase, and its legacy fiveStages/missingCount fields are prompts awaiting external review, not measured reasoning quality.
