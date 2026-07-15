# Image 14 reference-sheet diagnostic

Date: 2026-07-14

Source: `14_round-3c2_agenda-financeiro-documentos_aprovada.png` (1672x941)

Certification mode: `component-reference-sheet-review`

Status: `Aprovado`

## Scope decision

Image 14 is a composite inventory of agenda, attendance, replacement, waitlist, resource-conflict, document, upload and finance contracts. Certification reviews each numbered region through an official isolated owner. The full board must not be reconstructed in docs-local markup.

The baseline coverage map was incorrect. It named eight owners for twelve visible regions, included `PaymentCaseCard` even though no payment-case card appears in the source, and omitted grade/turma summary, replacement matcher, waitlist, resource conflict, document preview and financial simulation. The corrected map now points to twelve official owners while preserving the existing Image 26/29 defaults and keeping Image 31 `ReplacementTable`, Image 34 `ReconciliationRow` and Image 15 `BeforeAfterDiff` outside Image 14 ownership.

Static pre-promotion captures are stored in `tmp/reference-sheet-14-20260714/baseline`. They were captured from the static Storybook server at 1672x941 and are diagnostic evidence only, not approval evidence.

## Source measurements

| Region | Approximate source bounds | Contract |
| --- | --- | --- |
| 1 | x22-827, y81-475 (805x394) | Seven-day compact weekly calendar, date toolbar, view controls and dense event grid |
| 2 | x839-1331, y81-355 (492x274) | Three large class cards: scheduled, attendance exception and open-slot action |
| 3 | x1342-1649, y81-362 (307x281) | Grade/turma summary with status, metrics, next class, teacher and details action |
| 4 | x22-827, y480-605 (805x125) | Five-row attendance roster table with four attendance columns, observation and credit |
| 5 | x839-1082, y370-605 (243x235) | Replacement matcher with summary metrics, ranked candidates, actions and conflict footer |
| 6 | x1092-1372, y370-605 (280x235) | Five-row waitlist table with priority, availability, origin and invite status |
| 7 | x1383-1649, y370-605 (266x235) | Resource-conflict card with facts, suggested action and scenario link |
| 8 | x22-553, y612-774 (531x162) | Document viewer with thumbnails, preview, status/actions and history |
| 9 | x562-1649, y612-774 (1087x162) | Upload dropzone plus attached, pending, approved and failed receipt cards |
| 10 | x22-553, y781-907 (531x126) | Two-row reconciliation table with expected/received/difference/status/action columns |
| 11 | x562-953, y781-907 (391x126) | Money inputs for value, discount, fine, installment and validation error |
| 12 | x964-1649, y781-924 (685x143) | Financial before/after simulator with current/proposed/impact/risk groups and decision footer |

## Final regional acceptance

| Region | Official owner | Final static evidence | Result |
| --- | --- | --- | --- |
| 1 | `WeeklyCalendar variant="reference"` | `final-static/calendar.png` (805x394) | Pass: seven-day toolbar/grid and dense three-line events fit without clipping. |
| 2 | `ClassCard variant="reference"` | `final-static/class-cards.png` (492x274) | Pass: scheduled, attendance-exception and open-slot cards retain complete actions and facts. |
| 3 | `ClassSummaryCard` | `final-static/summary.png` (307x281) | Pass: status, metrics, next class, teacher and details action are complete. |
| 4 | `Roster variant="reference"` | `final-static/roster.png` (805x125) | Pass: five rows, attendance columns, observations and credits fit exactly. |
| 5 | `ReplacementMatcherPanel` | `final-static/matcher.png` (243x235) | Pass: metrics, candidates, actions and conflict footer are visible. |
| 6 | `WaitlistPanel` | `final-static/waitlist.png` (280x235) | Pass: five waitlist rows and all invite states are visible. |
| 7 | `ResourceConflictPanel` | `final-static/conflict.png` (266x235) | Pass: facts, suggested action and scenario link are visible and interactive. |
| 8 | `DocumentViewerPanel` | `final-static/document.png` (531x162) | Pass: thumbnails, document, signature state, actions and history fit. |
| 9 | `UploadReceiptPanel` | `final-static/upload.png` (1087x162) | Pass: dropzone plus attached, pending, approved and failed receipts fit. |
| 10 | `ReconciliationSummaryTable` | `final-static/reconciliation.png` (531x126) | Pass: both rows and seven columns, including actions, fit. |
| 11 | `MoneyInputGroup` | `final-static/money.png` (391x126) | Pass: five compact controls and validation message are fully visible. |
| 12 | `FinancialSimulationPanel` | `final-static/simulation.png` (685x143) | Pass: current, proposed, impact, risk and decision actions fit without responsive collapse. |

## Implemented ownership decision

1. Preserved later certified defaults and added explicit Image 14 variants to `WeeklyCalendar`, `ClassCard` and `Roster`.
2. Promoted `ClassSummaryCard`, `ReplacementMatcherPanel`, `WaitlistPanel`, `ResourceConflictPanel`, `DocumentViewerPanel`, `UploadReceiptPanel`, `ReconciliationSummaryTable`, `MoneyInputGroup` and `FinancialSimulationPanel` to `@taliya/crm`.
3. Reused `ConflictCard`, `DocumentPreview`, `FileUpload`, `MoneyInput` and `Select` inside CRM owners instead of exposing primitives as sheet-level owners.
4. Added one isolated source story per owner/variant. Stories only constrain capture width and use `layout: "fullscreen"`; all visible anatomy remains package-owned.
5. Added focused behavior coverage, built static Storybook and captured each region at its exact source bounds in `tmp/reference-sheet-14-20260714/final-static`.

## Current verdict

`Pass at component-reference-sheet scope.` All twelve visible regions resolve to source-aligned official owners with exact-size static evidence, no docs-local visible anatomy, no clipping or overlap, and no ownership borrowed from unrelated source images.
