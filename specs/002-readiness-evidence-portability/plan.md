# Plan: Readiness And Evidence Portability

## Phase 1 - Fresh package evidence

Add isolated package output support and make the future-consumer fixture create fresh tarballs before installation and file-hash comparison.

## Phase 2 - Source asset configuration

Introduce one resolver used by tests and audits, then generate a 101-file manifest when the canonical corpus is available.

## Phase 3 - Read-only and stale-evidence contracts

Separate report computation from persistence, add source commit/input hashes, and reject downstream reports whose dependencies are newer, failing, or mismatched.

## Phase 4 - Complete visual-debt inputs

Include Storybook CSS and inline style literals in token/anatomy governance. Classify capture-only harness CSS separately from reusable page anatomy.

## Phase 5 - Clean-clone certification

Run install, build, pack, synthetic consumer, static Storybook, package audits, and readiness twice; verify the second check is read-only and deterministic.

## Stop Conditions

- Do not classify missing image files from filenames alone.
- Do not update a debt baseline merely to hide newly discovered debt.
- Do not regenerate downstream pass reports while an upstream gate fails.
