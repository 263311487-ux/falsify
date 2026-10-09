# Evaluation status

Historical reports are author-run development measurements of adherence, not accuracy or causal improvement. Reports predate the current protocol amendments; no new paid model evaluation was run.

## Mode-aware historical rules

| Mode (number of cases per report) | Recorded pass rule |
|---|---|
| Depth (22) | Sum >=12/18, Iron Law >=1, no anti-pattern; Stage-0 refusal exception passes on Iron Law >=1 and no anti-pattern without requiring the total. |
| Question (2) | Majority judge ok: asks missing inputs in one round, no fabricated conclusion. |
| Simple (1) | Majority judge ok: brief direct response without protocol theater. |
| Nudge (1) | Majority judge ok: helpful estimate plus targeted questions. |
| Routing (2) | Majority judge ok: appropriate lightweight/incident response. |

Numeric dimensions use the median of three judge calls; boolean fields use majority. Repeated judges are not multiple generator seeds. Each report records 26/28 passes across all modes. Chat case 24 is labeled Depth but passes at 4/18 through a Stage-0/routing judgment; raw judge records are absent, so exact historical classification cannot be independently reconstructed.

Reasoner: depth 20/22, question 2/2, simple 1/1, nudge 1/1, routing 2/2.
Chat: depth 21/22, question 2/2, simple 1/1, nudge 0/1, routing 2/2.

The current runner's rule is described above; original report bytes remain untouched and their stronger interpretations are superseded by this note. SHA-256 proves present byte integrity, not historical execution authenticity.

## Community cases

The author chose and scored four GitHub/Stack Overflow cases. The report says answers/comments were consulted after initial analysis, but independent blinding or prior-answer exposure cannot be established from retained records. These are illustrative case analyses, not independent validation, held-out performance, or paired-baseline gains. Earlier 4/4 and 3/3 claims are author-reported descriptive counts.

See provenance.json for hashes and missing evidence; ../docs/failure-cases.md for recorded failures. Future work needs frozen prompts/models/scorer, all attempts, paired no-skill controls, held-out prompts, multiple generation seeds, and independent factual evaluation.
