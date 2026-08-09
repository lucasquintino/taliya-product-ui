# Engineering Quality Governance

`quality-policy.json` is the single versioned registry for engineering rules, change profiles, gates, budgets, and waiver policy.

The file is validated against `specs/006-engineering-quality-hardening/contracts/quality-policy.schema.json`. The canonical profile and gate inventories are defined in `specs/006-engineering-quality-hardening/ci-gate-matrix.md`; the validator must reject unknown IDs or parallel policy catalogs.

Check mode is read-only. Updates to rules, thresholds, baselines, or waiver policy require an explicit Spec Kit task, reviewable evidence, and a new revision-bound checkpoint.
