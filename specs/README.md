# Spec Kit registry and precedence

This directory contains the versioned Spec Kit history for the library. Exactly one feature is active for execution:

| Feature | Lifecycle | Execution authorization | Meaning |
| --- | --- | --- | --- |
| `006-engineering-quality-hardening` | `IMPLEMENTATION_IN_PROGRESS` | `APPROVED_FOR_IMPLEMENTATION` | Current source of truth; approved task range is `T101-T176`. |
| `001-product-ui-foundation` | `HISTORICAL_DRAFT` | `NONE` | Foundation design; no execution claim is inferred. |
| `002-readiness-evidence-portability` | `HISTORICAL_APPROVED` | `NONE` | Historical design and evidence context; not a 006 completion claim. |
| `003-official-story-anatomy` | `HISTORICAL_APPROVED` | `NONE` | Historical design and evidence context; not a 006 completion claim. |
| `004-human-route-review` | `HISTORICAL_IN_PROGRESS` | `NONE` | Historical review stream; pending evidence remains pending. |
| `005-joint-product-certification` | `HISTORICAL_IN_PROGRESS` | `NONE` | Historical certification stream; pending evidence remains pending. |

## Precedence

1. User-approved `specs/006-engineering-quality-hardening/approval.md` and its task-range binding.
2. Root `AGENTS.md`, then the applicable nested `AGENTS.md`.
3. The active 006 `spec.md`, `plan.md`, `tasks.md`, contracts, and gates.
4. Historical Spec Kits 001-005, only for context and their own explicitly scoped evidence.

`.specify/feature.json` is the machine-readable active-feature pointer. A historical document, audit, or status ledger must not override the active pointer or imply that an unchecked task or uncaptured evidence is complete.
