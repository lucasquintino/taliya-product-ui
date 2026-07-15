# Image 51D setup Studio workspace diagnostic - 2026-07-11

Source: `51D_round-4.1J_onboarding_bloco-1-studio-v2-sem-nome-aprovado.png`

Story: `crm-image-coverage-setup--image-51-d-onboarding-studio`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous generic composition delta: `12.415521553134115`; different pixels: `10.881862418581474%`.
- The old story rendered only the weekly preview and a generic impact card, omitting the day, general-hours, break-mode, pause-hours, and footer-action anatomy.

## Accepted reusable changes

- Promoted `SetupStudioWorkspace` to `@taliya/crm` as the official owner of the full Studio block.
- Composed official `SetupBlockHeader`, `Checkbox`, `TimeInput`, `SegmentedControl`, `WeeklyHoursGrid`, `Panel`, `ButtonGroup`, and `Button` components.
- Exposed active-day, schedule-mode, adjust-day, save, and continue callbacks.
- Replaced story-local assembly with `SetupPage` plus the new owner, canonical eight steps, step 1, progress 12, and canonical avatar.
- Added the official `SetupPage frameVariant="guided-block"` rail-wide frame for Studio: `225/979/404px` columns, `87px` topbar, `762px` body, and `62px` bottom bar at the source vertical rhythm.
- Kept 51C on `guided`, Image 51A on `shell-global`, and Image 78 on `welcome`. A 51L probe showed that the rail-wide frame is not universal, so later blocks remain on `guided` pending their own source evidence.
- Added registry, component-matrix, behavior-test, dashboard-family, and remaining-page contracts.
- Added no story-local anatomy or CSS.

## Evidence progression

- Final official owner: delta `13.809883187826586`; different pixels: `8.718646558430662%`.
- The different-pixel area improved by about 2.16 percentage points while the mean RGB delta increased.
- Shared `guided` frame checkpoint: `tmp/51d-guided-baseline-20260714`; delta `13.154554310372589`; different pixels `8.560258607101272%`.
- Final rail-wide frame: `tmp/51d-guided-block-20260714`; delta `13.07147711806809`; different pixels `8.557144237271762%`; SHA-256 `21122748afb9afc73a635fd575484a86021eeecfbc8ef6e0753fee74cff3382d`.
- Final capture is source-sized, populated, nonblank, and passed runtime inspection. Image 78 remained bit-identical at SHA-256 `c3f7b2b815f29e7eed356fc40cbedccbf40a81379a0e589987a0b3c57aa24015`.

## Verdict

**Semi-approved; explicit fail 1:1.** Ownership, complete Studio content, active-day controls, hours/break mode, preview, actions, callbacks, rail-wide columns, and vertical fit are correct. Remaining gaps are shell topbar ordering/scale, exact workspace padding, checkbox treatment, segmented-control styling, preview-axis micro-alignment, agent copy, button colors, typography/icons/avatar, shadows, and antialiasing. Product review owns acceptance; reopen technical work only through reusable Studio/setup contracts. A later source-sized 51E probe supplied evidence for reusing `guided-block` there while preserving 51D, 51L, and 78.
