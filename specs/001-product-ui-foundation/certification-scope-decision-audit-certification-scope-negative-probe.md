# Certification Scope Decision Audit

Generated: 2026-07-07T11:41:54.999Z

Status: fail

This audit records whether product has explicitly scoped full source-image 1:1 certification out of goal completion. By default, when no decision file exists, full-image 1:1 certification remains required for global completion.

Decision file: `tmp/certification-scope-negative-probe/certification-scope-decision.invalid.json`

Decision exists: yes

Example file: `specs/001-product-ui-foundation/contracts/certification-scope-decision.example.json`

Example valid: yes

Current scope: `current-internal-library-readiness-accepted`

Scoped completion accepted: no

## Required Acceptance Statements

- I understand this does not certify every approved CRM image as 1:1.
- I accept current Internal/library readiness as the scoped completion bar.
- Remaining source-image parity work stays tracked in the visual certification backlog.

## Validation Errors

- acceptedBy must be a non-empty string
- acceptedAt must be a YYYY-MM-DD date string
- acceptanceStatements missing: I understand this does not certify every approved CRM image as 1:1.
- acceptanceStatements missing: Remaining source-image parity work stays tracked in the visual certification backlog.

## Example Validation Errors

- None
