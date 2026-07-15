# Image 26 agenda calendar diagnostic - 2026-07-11

Source: `26_round-4.1F_agenda_01_calendario-operacional.png.png`

Story: `crm-image-coverage-agenda--image-26-agenda-calendario-operacional`

## Baseline

- Source and current render: `1448x1086`.
- Mean RGB delta: `16.18`.
- Different-pixel ratio: `9.05%`.
- The page used official dashboard/calendar components, but rendered the attendance-state `ClassDrawer` while the source shows a selected-class detail drawer.
- The filter bar placed Professor/Turma/Sala/Status before all calendar navigation because `PageFilterBar` only exposed trailing actions.
- The agenda rail resolved to `280px`, versus approximately `204px` in the source, leaving the weekly calendar materially narrow.

## Accepted reusable changes

- Replaced the source-page drawer state with official `ClassDrawer variant="class-detail"`, populated from the canonical selected-class facts, expected students, availability, actions, copilot, and audit copy.
- Isolated the Agenda navigation labels (`Agenda`, `Turmas`, `Chamada`, `Reposições`, `Histórico`) so Turmas/Grade stories retain their own navigation contract.
- Applied official `pageHeaderRhythm="compact-stacked"` to match the source title/subtitle rhythm and calendar vertical start.
- Added the reusable `PageFilterBar leadingActions` slot in `@taliya/crm`, with package coverage, so calendar range controls render before domain filters while the primary command remains trailing.
- Updated the source-derived `layout.crm-dashboard.columns-agenda` token from `minmax(220px, 280px)` to `minmax(200px, 204px)`, widening the official weekly calendar without story-local CSS.
- Accepted for the next measured cycle: optional prepared-data roster status contracts (`rosterStatus` and `showStudentStatus`) on `ClassDrawer`, because the canonical selected-class drawer exposes both a roster summary and per-student state.
- Accepted for the next measured cycle: `actionPlacement="content"` on the class-detail variant, because the canonical drawer places class commands between operational context and the copilot/audit sections. The default remains `footer` to preserve existing consumers.
- Source/current review of the first status capture accepted two extensions to that prepared-data contract: `actionHeading` gives the content action group its canonical label and content placement uses a single-column command stack; `availabilityTone` expresses the canonical warning notice while preserving the existing success default.

## Evidence progression

- Class-detail state: `tmp/visual-audit/image26-class-detail-20260711`, delta `15.30678521039583`, different pixels `0.08816949523315325`.
- Leading calendar actions and stacked header: `tmp/visual-audit/image26-leading-actions-20260711`, delta `14.700176615827084`, different pixels `0.08573583427449305`.
- Agenda grid token: `tmp/visual-audit/image26-agenda-grid-20260711`, delta `14.312139434083209`, different pixels `0.0832118728569539`.
- All focused captures were source-sized and passed runtime render inspection.
- Current static baseline before the roster-status cycle: `tmp/image26-current-static-20260714`, delta `14.232336721508297`, different pixels `0.08298421395358302`.
- First roster-status/content-placement capture: `tmp/image26-roster-status-static-20260714`, delta `14.172079182903792`, different pixels `0.08361695308446018`. It validated the new roster state and improved mean delta, but exposed the remaining action-column and notice-tone mismatches corrected in the next cycle.
- Final compiled static evidence: `tmp/image26-final-static-20260714/report.json`, source/current `1448x1086`, delta `14.342271171006177`, different pixels `0.08440867189646226`, current SHA-256 `76e87edbfbd6d68d3471aaf94ff1c8427d52d66f2c9c085bc4c512bf305aaa16`, valid populated render with zero runtime errors.
- Paired Image 29 regression evidence: `tmp/image29-classdrawer-regression-static-20260714/report.json` and `tmp/image29-final-regression-static-20260714/report.json` are bit-identical, current SHA-256 `00b6fa1252d73bf8eca4bc05ef16822a867ca4c4615c3061018c72d28d7252d9`.

## Verdict

**Fail 1:1; semi-approved official baseline.** The selected-class roster now exposes its summary and each expected student's status through prepared-data `ClassDrawer` props. The canonical warning notice, labeled single-column command group, copilot, and audit remain package-owned; the Image 29 default is unchanged. Exact parity is not reached: the compact floating drawer starts about 50px above the source and remains narrower, while outer frame, typography, icons/avatar rendering, and antialiasing also differ. Reopen technical work only for a reusable floating-drawer placement/size hypothesis validated across Agenda stories; do not move roster or action anatomy back into story markup/CSS.
