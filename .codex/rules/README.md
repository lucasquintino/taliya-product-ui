# Command-execution rules

This directory contains repository-local execution controls only. It does not define engineering standards, design rules, architecture budgets, or quality thresholds; those live in `governance/quality-policy.json`.

Each JSON rule has a stable ID, a decision, a portable regular expression, and at least one `match` and `nonMatch` example. `scripts/quality/validate-codex-rules.mjs` validates the descriptors and fixtures without executing commands.
