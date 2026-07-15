# Image 36 grade recurring block diagnostic - 2026-07-11

Source: `36_round-4.1F_grade_01_semana-modelo-bloqueio.png.png`

Story: `crm-image-coverage-agenda--image-36-grade-semana-modelo-bloqueio`

## Baseline

- Source and current render: `1448x1086`.
- Mean RGB delta: `12.85`.
- Different-pixel ratio: `6.75%`.
- The shell, filters, summary rail, and week grid already used official `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, and `WeeklyCalendar` components.
- The recurring-block drawer was incorrectly simulated with the attendance variant: facts were compressed into a summary line and upcoming dates were represented as students.
- Source sections for recurring facts, generated classes, change impact, and agenda-block guidance had no official package contract.

## Accepted reusable changes

- Added official `ClassDrawer variant="recurring-block"`.
- Added typed `ClassDrawerImpactItem` and `ClassDrawerBlockNotice` contracts.
- The package now owns rendering for recurring facts, generated classes, change-impact rows, block guidance, block action, copiloto, audit, and operational actions.
- Added compact recurring-block fact density, single-column action layout, and scrollable body behavior.
- Recurring actions render in document flow before block guidance instead of occupying the global fixed drawer footer.
- Replaced the story's fake roster/summary composition with typed data and `onAction` callbacks.
- Added CRM coverage for recurring facts, sections, block action, and callback emission.

## Evidence progression

- Baseline canonical capture: delta `12.85`, different pixels `6.75%`.
- First complete recurring contract: `tmp/visual-audit/image36-recurring-block-20260711`; delta `12.580706353082425`, different pixels `6.620549840765952%`, but broad fact rows clipped lower sections.
- Compact fact/action density: `tmp/visual-audit/image36-recurring-block-compact-20260711`; delta `12.74683800012888`, different pixels `6.796381368090107%`.
- Accepted in-flow action candidate: `tmp/visual-audit/image36-recurring-block-flow-20260711`; delta `12.665602774640579`, different pixels `6.774632947712218%`.
- Focused captures are source-sized, populated, and passed runtime render inspection.

## Verdict

**Fail 1:1.** The Grade page and recurring-block drawer now use correct official product anatomy rather than an attendance-roster surrogate. Remaining gaps include title/filter vertical rhythm, quick-filter density, exact weekly-grid scale and blocked-range treatment, drawer width/title wrapping, recurring-section density, and lower copiloto/audit visibility without scrolling. Further density or width changes must be validated jointly against images 26, 29, 35, and 36.

## 2026-07-14 blocked-range diagnostic

- Fresh compiled-static evidence after the Image 35 cycle: `tmp/image36-regression-after-image35-rhythm-20260714/report.json`, source/current `1448x1086`, delta `12.658972050100221`, different pixels `6.793519733829859%`, current SHA-256 `007d2c140159803501a4afcad740091b2b7f730ec80fc21491c79681bda488e8`.
- The recurring-block drawer remains complete and the page uses official `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `WeeklyCalendar` and `ClassDrawer` owners.
- Structural gap: the canonical source contains a Friday `14:00-18:00` hatched range labelled `Bloqueio / Feriado municipal`; the current calendar data path renders no equivalent range. This is product information, not a micro-style discrepancy.
- Rhythm gap: source filter/calendar begin near `y=193/275`; current begins near `y=185/262`. The existing official `pageHeaderRhythm="overview"` variant is the smallest page-level hypothesis for this axis.
- Smallest reusable change: render the blocked range as another `WeeklyCalendarEvent` using a package-owned `schedule-block` `ClassCard` state. The story supplies only day, time, height and canonical copy; hatch, border and content layout remain in `@taliya/crm`.
- Guardrail: do not alter shared drawer width/reservation or Agenda rail width; recapture Images 26, 29 and 35 after the candidate.
- Rejected first geometry: `tmp/image36-block-range-valid-static-20260714/report.json`, valid static render, delta `13.123106446011349`, different pixels `7.186263138080848%`, SHA-256 `59340dbb0be88a0f3cbe9e014ceb62e721d96f83f1c59a478b26bf8aadbd2156`. Visual inspection showed that `pageHeaderRhythm="overview"` displaced the complete page below the source and the `296px` block extended about `30px` beyond the source range.
- Next probe: preserve the accepted default page rhythm and keep the structural block contract, but express the source range with story data at calendar top `380` and height `260`. This isolates the canonical blocked interval without changing shared package geometry.
- Refined geometry evidence: `tmp/image36-block-range-refined-static-20260714/report.json`, valid static render, delta `12.786259449752245`, different pixels `6.996822950052399%`, SHA-256 `f8447f38de66fa6db1844eaa10eb2041194328bc1410bcbd9c28f298a0fd237f`. The blocked interval now matches the source's approximate top and height while the rest of the page returns to its accepted baseline rhythm.
- Final visual probe: reduce the block border from the stronger generic danger border to the existing translucent danger background token and shift only the block content upward by one spacing token. The source uses a faint hatch/border and places its label above the range midpoint.

## 2026-07-14 accepted technical candidate

- Final compiled-static evidence: `tmp/image36-block-range-final-static-20260714/report.json`, source/current `1448x1086`, delta `12.76414198454124`, different pixels `6.962038195822268%`, current SHA-256 `5910e319e794475d1d1deaa6b15a437d2ddd382b8cf67a6d72d2880c1d3237cd`.
- The canonical Friday `14:00-18:00` holiday block is now represented through the official `WeeklyCalendarEvent` plus package-owned `ClassCard state="schedule-block"` treatment. The page supplies data only; no story-local CSS or anatomy was added.
- The pixel metric is modestly worse than the incomplete fresh baseline (`12.658972050100221`, `6.793519733829859%`) because a previously absent large source region is now rendered but still differs in exact grid width, hatch antialiasing and horizontal placement. Structural/product completeness takes precedence over retaining an artificially lower diff obtained by omitting canonical information.
- Agenda regressions from the same static bundle are bit-identical: Image 26 SHA-256 `76e87edbfbd6d68d3471aaf94ff1c8427d52d66f2c9c085bc4c512bf305aaa16`, Image 29 SHA-256 `973cdbba8596d95604bdb7cff5ce9a6a8b18973c735b06217ec61983fa2eeab1`, and Image 35 SHA-256 `34f264218f81dcf78f177eb92dbee634ce4572d2a8851fbe4aff6e7055afea9a`; reports live under `tmp/image{26,29,35}-regression-after-image36-block-20260714`.
- Visual inspection confirms a complete, coherent calendar, blocked range and recurring-block drawer with no overlap, blank render or missing source-required section.

**Technical verdict: Semi-approved, still Fail 1:1.** Official ownership and source anatomy are accepted. Product review remains open for exact shell chrome, grid width/scale, hatch artwork, event placement, rail density, drawer lower-content visibility, typography, borders and antialiasing.
