# Spec Kit implement

## Purpose

Execute only an approved Spec Kit task range, in its declared order, with test-first evidence.

## Preconditions

- Human implementation approval is present and bound to the reviewed SDD revision.
- The task, gate, contract, and affected package boundaries are known.
- Required skills and instructions resolve from this repository.

## Procedure

1. Select one task or an explicitly independent task group.
2. Write or activate a failing test/probe when the task changes behavior or enforcement.
3. Make the smallest scoped change, then run focused and aggregate gates.
4. Record evidence, hashes, and exit codes; mark the task complete only when its evidence clause is satisfied.

## Stop conditions

Stop on scope drift, stale approval, failing prerequisite gate, unreviewed public API change, or missing evidence. Never claim completion from a green static check alone.
