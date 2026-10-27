# Contributing to falsify

falsify is a prompt protocol plus a deterministic CLI coach. Contributions should preserve the project's design principle: **guidance, not a guarantee** — and its commitment to honest, source-linked evidence.

## What we welcome

- Protocol distillations backed by published work (paper or established practitioner canon)
- Eval cases that expose a gap the current protocol mishandles — include the expected output and the rubric dimension it covers
- CLI fixes and heuristic improvements with a regression test
- Docs: clearer examples, missing edge cases, translation corrections

## What we don't merge

- New reasoning stages or iron-law changes without eval evidence that they help
- Dependencies added to the zero-dependency CLI core (`bin/falsify-core.mjs`)
- Claims about correctness rates without reproducible methodology

## Development setup

```bash
git clone https://github.com/263311487-ux/falsify.git
cd falsify
node tests/regression.mjs        # deterministic core tests
npm run test:package              # isolated install smoke
node bin/falsify-skill.mjs "The cache is definitely the cause"
python3 .github/check_consistency.py   # version + copy consistency
```

No LLM key is needed for any of the above. The eval harness (`evals/run_evals.mjs`) requires `DEEPSEEK_API_KEY`.

## Pull request checklist

- [ ] `node tests/regression.mjs` passes
- [ ] `python3 .github/check_consistency.py` passes
- [ ] If adding a protocol change: new eval case in `evals/cases.md` with expected behavior
- [ ] If distilling from a new source: cite it in the commit message and in `SKILL.md`
- [ ] Version bump in `package.json` and `SKILL.md` metadata if protocol changes

## Eval case format

Add to `evals/cases.md`. Each case needs: claim text, expected mode, expected stage scores (or routing justification), and source if applicable. See existing cases for the format.
