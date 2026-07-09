# Future Consumer Adoption Audit

Generated: 2026-07-07T11:41:46.055Z

Status: fail

This audit turns future CRM discovery into adoption evidence. If no real future CRM candidate is discovered, the audit passes with zero rows and records that adoption cannot be executed yet. If candidates exist, each one must have a labeled `library-readiness-gate-<label>.json` report whose consumer root matches the candidate and whose status is `pass`.

Discovery generated: `2026-07-07T11:41:46.000Z`

Discovery status: pass

Discovery errors: none

Future CRM candidates: 1

Adopted candidates: 0

## Candidate Adoption

| Candidate | Path | Readiness config | Report label | Readiness report | Report status | Status | Config errors |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `future-crm-missing-readiness` | `C:\Users\lucas\taliya-product-ui\tmp\future-consumer-adoption-negative-probe\future-crm-missing-readiness` | yes | `future-crm-missing-readiness` | `specs/001-product-ui-foundation/library-readiness-gate-future-crm-missing-readiness.json` | missing | Fail | none |
