# Image 51J setup agenda workspace diagnostic - 2026-07-11

Source: `51J_round-4.1J_onboarding_bloco-7-agenda-aprovado.png`

Story: `crm-image-coverage-setup--image-51-j-onboarding-agenda`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous generic-calendar delta: `13.460653644787266`; different pixels: `8.676825020720093%`.
- The old story rendered `WeeklyCalendar` alone and omitted the summary, per-class control, complete six-day preview, domain actions, and official full-block owner.

## Accepted reusable changes

- Promoted `SetupAgendaWorkspace` to `@taliya/crm` as the official owner of the Agenda block.
- Composed the official setup panel/header, summary cards, class-control list, `WeeklyHoursGrid`, and footer actions inside the package.
- Added class, slot, back, save, and continue callbacks without moving domain anatomy into Storybook.
- Added an embedded compact mode through the official workspace context so the reusable weekly grid supports six days without fixed-column overflow.
- Applied the documented nine-block reinterpretation at step 8/progress 88.
- Added registry, matrix, behavior-test, dashboard-family, and remaining-page contracts.

## Evidence progression

- First full-owner capture: delta `15.839545335902795`; different pixels: `12.798280359385567%`.
- Final compact-grid capture: delta `15.476450279403466`; different pixels: `11.439843086607446%`.
- Final capture is source-sized, nonblank, and passed runtime inspection.

## Guided-wide schedule follow-up - 2026-07-15

- Compiled-static baseline before this refinement: `tmp/51j-guided-baseline-20260714/report.json`; delta `15.137111720708399`; different pixels `11.538613101200494%`; SHA-256 `4b03eeb3eb5c0864a074022367bda57827e0074a92caecbd50133a6ddf9888ba`; runtime-valid render with `1882` body-text characters.
- Source comparison showed the same `207px` step rail and approximately `1062px` center used by Image 51I, with a narrower agent rail than the old `guided` frame. Added the official `SetupPage frameVariant="guided-wide"` contract and selected it only for Images 51I/51J.
- Extended the official `WeeklyHoursGrid` with `variant="schedule"`, arbitrary `axis`, and event `meta`/`tone`, while preserving `availability` as the default editor. `SetupAgendaWorkspace` now renders six source time bands and eight discrete accessible events instead of coarse availability blocks, plus the official status legend.
- Added source-backed Agenda bands and event-density tokens; all summary, class-control, schedule, legend and action content fits the canonical viewport without story-local anatomy.
- Final evidence `tmp/51j-guided-wide-schedule-20260715/report.json`: delta `13.796936095673441`; different pixels `9.169340363758396%`; SHA-256 `e57a21d8f05a8a44cea25e2ea79733fce46094cad93606acf6262da53a483cd9`; runtime-valid render with `1947` body-text characters.
- Shared sentinels remained bit-identical: Image 51H SHA `138e55cd99392c303729f67d7abf985e4dacf2a8847c3a8410e83a505102d850`, 51G `fc00ae22530f9e5ebe952c6bb3e24da42653d1a5a50254a9a321994468b86021`, 51K `909eb5d0ea06dd41aff54208f9aebb1b0cdda7bda969c6f449d1e864c623b078`, 51L `4ccb815a2c7be1f54ed0eb327b017ace95390084c25207e35c096a88731f0990`, and 78 `c3f7b2b815f29e7eed356fc40cbedccbf40a81379a0e589987a0b3c57aa24015`.

## Verdict

**Semi-approved; Fail 1:1.** Official ownership, domain anatomy, six-day/six-time rendering, interaction contracts, first-viewport capacity, and removal of story-local composition are correct. Remaining gaps are the nine-block sequence, contextual agent content, schedule micro-density, typography, icons, shadows and antialiasing. Reopen only through official setup/grid components or tokens and cross-check Images 51A-51L and 78.
