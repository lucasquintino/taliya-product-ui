# Spec Kit checklist

## Purpose

Validate a Spec Kit acceptance checklist without silently changing its scope.

## Procedure

1. Read the checklist contract and all referenced artifacts.
2. Evaluate every item as `PASS`, `FAIL`, or `BLOCKED` using reproducible commands or file evidence.
3. Record the command, revision, and artifact path for each non-trivial result.
4. Fail closed on placeholders, unresolved clarification markers, stale hashes, missing approvals, or contradictory status.

## Output

Return a checklist report and a single readiness decision. This skill is read-only unless the user explicitly authorizes a checklist update.
