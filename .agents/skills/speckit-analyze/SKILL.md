# Spec Kit analyze

## Purpose

Analyze the active Spec Kit before planning or implementation. This skill is repository-local and must work from the clone root; it never resolves a user-profile or machine-specific path.

## Required inputs

- The active feature manifest and its `spec.md`, `plan.md`, `tasks.md`, contracts, and checklists.
- The repository instruction chain (`AGENTS.md` plus applicable nested instructions).

## Procedure

1. Resolve the active feature from `.specify/feature.json` and verify that every required artifact exists.
2. Build a trace from requirements to scenarios, gates, contracts, and tasks.
3. Report contradictions, unknown references, missing evidence, unresolved decisions, and scope drift with stable file/line references.
4. Stop before proposing implementation when a blocking contradiction or missing approval is found.

## Output

Produce an evidence table with findings, severity, affected IDs, and the smallest corrective action. Do not edit product code or mark tasks complete.
