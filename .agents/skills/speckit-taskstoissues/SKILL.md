# Spec Kit tasks to issues

## Purpose

Export Spec Kit tasks to an issue tracker without losing identifiers or acceptance evidence.

## Rules

- Preserve task ID, story, dependencies, priority, gate, and evidence clause.
- Do not create or publish issues unless explicitly authorized.
- Never rewrite a task as complete during export.
- Keep repository-relative paths and revision references portable.

## Output

Emit deterministic issue records or a dry-run diff, with an explicit count and a mapping back to `tasks.md`.
