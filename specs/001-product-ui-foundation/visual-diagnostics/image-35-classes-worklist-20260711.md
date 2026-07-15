# Image 35 classes worklist diagnostic - 2026-07-11

Source: `35_round-4.1F_turmas_01_lista-detalhe.png.png`

Story: `crm-image-coverage-agenda--image-35-turmas-lista-detalhe`

## Baseline

- Source and current render: `1448x1086`.
- Mean RGB delta: `13.23`.
- Different-pixel ratio: `7.59%`.
- The page already used official `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `CrmWorklistTable`, and `ClassDrawer variant="class-detail"` contracts.
- The class-detail roster accepted each student's attendance state but discarded it in the rendered fixed-student list, so all avatars lost their canonical status tones.
- The drawer title used the shared `21px` attendance title and wrapped more aggressively than the source.
- Visible story data still used ASCII fallbacks for accents and separators.

## Accepted reusable changes

- `ClassDrawer` now emits `data-attendance` for fixed students in class-detail mode.
- Added package-owned avatar tones for pending, present, warned, no-show, and replacement states.
- Added governed `control.crm-class-drawer.detail-title-size` at `18px`, leaving the attendance drawer title unchanged.
- Added CRM assertions for fixed-student attendance attributes and token coverage for the new title size.
- Restored canonical accents, middle-dot separators, navigation labels, table headings, class names, and operational copy in the image story.

## Evidence progression

- Baseline canonical capture: delta `13.23`, different pixels `7.59%`.
- Status-aware class detail: `tmp/visual-audit/image35-class-detail-status-20260711`; delta `13.179809834864626`, different pixels `7.589435609413632%`.
- The accepted candidate is source-sized, populated, and passed runtime render inspection with all five status-colored fixed-student avatars visible.

## Verdict

**Fail 1:1.** The Turmas worklist is structurally mature and uses official components end to end. Student-state fidelity and canonical text are corrected in package/data contracts. Remaining differences include shell/title/filter vertical rhythm, quick-filter and table density, teacher-avatar fidelity, exact drawer width/title wrapping, timeline spacing, footer fit, and antialiasing. Drawer-width changes must be validated jointly against images 26, 29, 35, and 36 before altering shared reservation tokens.

## 2026-07-14 worklist rhythm probe

- Fresh compiled-static baseline: `tmp/image35-baseline-20260714/report.json`, source/current `1448x1086`, delta `13.193166035835292`, different pixels `7.598847206536227%`, current SHA-256 `6c52dd59a5570ab28b5acd7c5f7b1037b04dab009d91291404fe44c0514bb7c6`.
- Source/current geometry: source title/filter/table begin near `y=134/202/283`; current begins near `y=130/185/262`. The source rail is approximately `179px`, while the default official rail is `190px`.
- Affected anatomy: stacked page-header rhythm, filter/table vertical boundary and queue/table horizontal split. The drawer itself remains complete and must not be resized without the required Agenda cross-image validation.
- Owner: existing `CrmProductShell pageHeaderRhythm="overview"` and `WorkListDetailPage layoutMode="main-priority"`; no new tokens, wrapper or story-local CSS.
- Smallest probe: select those two official variants and compare Image 35 while confirming no package-level regression is introduced in Images 26, 29 and 36.

## 2026-07-14 accepted technical candidate

- Selected official composition: `CrmWorklistPage pageHeaderRhythm="overview" worklistLayoutMode="main-priority"`; no story-local CSS, new wrapper or package token was introduced.
- Compiled-static evidence: `tmp/image35-worklist-rhythm-static-20260714/report.json`, source/current `1448x1086`, delta `12.492004593876866`, different pixels `7.352619476409959%`, current SHA-256 `34f264218f81dcf78f177eb92dbee634ce4572d2a8851fbe4aff6e7055afea9a`.
- The candidate improves the fresh baseline from delta `13.193166035835292` and `7.598847206536227%` different pixels by aligning the stacked header rhythm and narrowing the quick-filter rail through existing official variants.
- Agenda cross-image evidence after the same static build: Image 26 remained bit-identical at SHA-256 `76e87edbfbd6d68d3471aaf94ff1c8427d52d66f2c9c085bc4c512bf305aaa16` (`tmp/image26-regression-after-image35-rhythm-20260714/report.json`); Image 29 remained bit-identical at SHA-256 `973cdbba8596d95604bdb7cff5ce9a6a8b18973c735b06217ec61983fa2eeab1` (`tmp/image29-regression-after-image35-rhythm-20260714/report.json`); Image 36 stayed at its accepted `12.67` / `6.77%` visual band with delta `12.658972050100221` and `6.793519733829859%` different pixels (`tmp/image36-regression-after-image35-rhythm-20260714/report.json`).
- Visual inspection confirms a populated, coherent frame with the complete table and class-detail drawer visible. No shared drawer geometry was changed.

**Technical verdict: Semi-approved, still Fail 1:1.** Official ownership and page composition are accepted. Product review remains open for exact shell chrome, quick-filter/table density, teacher-avatar artwork, drawer title wrapping, timeline/footer rhythm, typography and antialiasing.
