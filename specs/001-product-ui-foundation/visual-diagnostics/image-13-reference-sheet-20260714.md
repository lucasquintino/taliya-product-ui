# Image 13 reference-sheet diagnostic

Date: 2026-07-14

Source: `13_round-3c1_objetos-setup-dados_aprovada.png` (1672x941)

Certification mode: `component-reference-sheet-review`

Status: `Aprovado`

## Scope decision

Image 13 is a composite inventory of setup, import, data-quality and student-profile contracts. Certification reviews each numbered region through an official isolated owner. The full board must not be reconstructed in docs-local markup.

The current coverage map is incomplete: it names six owners for eleven visible UI regions plus the token foundation. `SetupStepper` is also ambiguous in the map because its current certified source is the vertical onboarding rail from Image 51A, while Image 13 region 1 is a horizontal setup wizard. The actual review scope is twelve contracts: setup wizard, activation checklist, import progress, field mapping, duplicate resolution, data-conflict queue, compact student header, profile tabs, family relationships, consent/preferences, sensitive timeline and tokens.

Static pre-promotion captures are stored in `tmp/reference-sheet-13-20260714`. Captures made before the static server restart that show dynamic-import errors are rejected infrastructure artifacts and are not component evidence; the accepted baseline files use the successful recaptures (`stepper2.png`, `fieldmapping2.png`, `duplicateresolver2.png`, `studentheader2.png`, `relationshiplist2.png`, `timeline2.png`) plus successful first-pass files.

## Regional diagnostic

| Region | Source contract | Current evidence | Result | Required official owner |
| --- | --- | --- | --- | --- |
| 1 | Horizontal five-step setup wizard with progress footer | `SetupWizardPanel`; `final-static/setup.png` | Pass | Official owner remains distinct from the Image 51A vertical `SetupStepper` default. |
| 2 | Four-row activation checklist with owner, quick action and menu columns | `ActivationChecklistPanel`; `final-static/activation.png` | Pass | Panel, columns and rows are package-owned; primitive story contains isolated states only. |
| 3 | Import progress main card plus four outcome cards | `ImportProgress` matches the complete source region and exposes pause/details/retry/resume callbacks | Pass | Keep `ImportProgress`; accepted baseline `importprogress.png`. |
| 4 | Five-row field mapping table with real selects, row actions and footer | `FieldMappingTable` matches the complete source region and behavior | Pass | Keep `FieldMappingTable`; accepted baseline `fieldmapping2.png`. |
| 5 | Two-record duplicate comparison, field markers, decision rail and legend | `DuplicateResolver` matches the complete source region and behavior | Pass | Keep `DuplicateResolver`; accepted baseline `duplicateresolver2.png`. |
| 6 | Four-row data-conflict queue with severity, object, description, suggested action and owner | `DataConflictQueue`; `final-static/conflicts.png` | Pass | Compact domain table exposes all five columns and four rows without clipping. |
| 7 | Compact profile header with avatar, identity/status, tags, contacts and next-action card | `StudentHeader variant="reference"`; `final-static/student.png` | Pass | Additive variant preserves the Image 28 default; missing `avatar.2xl` token alias was repaired separately. |
| 8 | Numbered compact internal-profile tab panel with six labels and document count | `ProfileTabsPanel`; `final-static/tabs.png` | Pass | All labels and document count remain visible. |
| 9 | Three-card family relationship graph with connectors and legend | `RelationshipList` matches the complete source region and composes `RelationshipCard` | Pass | Keep `RelationshipList`; accepted baseline `relationshiplist2.png`. |
| 10 | Consent and preferences controls plus consent history | `ConsentPreferencesPanel`; `final-static/consent.png` | Pass | Controls and all four history columns remain visible in the compact owner. |
| 11 | Sensitive timeline with grouped time labels, semantic events, protected-data actions and statuses | `SensitiveTimelinePanel`; `final-static/timeline.png` | Pass | Five events, timestamps, semantic markers, request action and pending status remain visible without overlap. |
| 12 | Color, radius, shadow and typography tokens | Foundation token package and isolated token stories; token governance pass | Pass | `@taliya/tokens` remains the owner; missing `avatar.2xl` alias was added and audited. |

## Smallest implementation path

1. Add `SetupWizardPanel`, `ProfileTabsPanel` and the additive `StudentHeader` reference variant so later certified defaults remain unchanged.
2. Promote `ActivationChecklistPanel`, `DataConflictQueue`, `ConsentPreferencesPanel` and `SensitiveTimelinePanel` to `@taliya/crm`, with prepared data and callbacks and no backend behavior.
3. Add one isolated source story per new owner/variant. Stories may position captures but must not define visible panel, table, header, footer or row anatomy.
4. Add focused behavior tests for all callbacks and controlled values.
5. Build static Storybook, capture every owner, compare region by region, then correct `image-coverage-map.md`, `component-matrix.md`, `component-source-map.md` and the ledger.

## Current verdict

`Pass at component-reference-sheet scope.` All eleven visible regions plus the token foundation resolve to official owners. Final static evidence is stored in `tmp/reference-sheet-13-20260714/final-static`; focused CRM tests pass 131/131, package/docs typechecks pass, token governance passes, static Storybook builds, and the strict anatomy audit reports zero debt selectors. Whole-board pixel parity is N/A and docs-local board reconstruction remains forbidden.
