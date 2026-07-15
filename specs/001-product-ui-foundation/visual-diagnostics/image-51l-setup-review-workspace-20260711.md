# Image 51L setup review workspace diagnostic - 2026-07-11

Source: `51L_round-4.1J_onboarding_bloco-9-revisao-aprovado.png`

Story: `crm-image-coverage-setup--image-51-l-onboarding-revisao`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous six-step-shell delta: `16.365584433744008`; different pixels: `9.993250080083796%`.
- The story wrapped `SetupReviewPanel` in a local alias, explicitly supplied the bottom bar, and inherited the obsolete six-step setup sequence.

## Accepted reusable changes

- Promoted `SetupReviewWorkspace` to `@taliya/crm` as the official page owner while retaining `SetupReviewPanel` as the reusable domain panel.
- Migrated the story to the official nine-block sequence at step 9/progress 98 with the canonical studio avatar.
- Removed the story-local `SetupPanel` alias and explicit bottom-bar composition.
- Exposed area navigation, blocking resolution, warning review, confirmation, back, draft, and publication callbacks through the workspace.
- Added responsive `4/2/4` grids in the official workspace context so fixed isolated-panel widths no longer invade the agent column.
- Added registry, matrix, behavior-test, dashboard-family, and remaining-page contracts.

## Evidence progression

- First nine-block owner capture: delta `16.83199267127339`; different pixels: `10.47851974637589%`.
- Final responsive-owner capture: delta `16.818511051563796`; different pixels: `10.467079204145035%`.
- Final capture is source-sized, nonblank, and passed runtime inspection.

## Guided-review follow-up - 2026-07-15

- Compiled-static baseline before the review-frame refinement: `tmp/51l-after-guided-wide-20260715/report.json`; delta `16.340403588432`; different pixels `10.499938983774769%`; SHA-256 `4ccb815a2c7be1f54ed0eb327b017ace95390084c25207e35c096a88731f0990`; runtime-valid render with `2320` body-text characters.
- Source geometry required a dedicated official review frame: `210px 1064px 344px` columns, `12px` gaps, `74/807/52px` vertical rhythm and edge-to-edge use of the already certified `1064x807` `SetupReviewPanel`. Added `SetupPage frameVariant="guided-review"` and selected it only for Image 51L.
- First frame capture `tmp/51l-guided-review-20260715/report.json` improved to delta `14.836003216910985` and `9.990834854501726%`, with every publication action visible, but exposed the default six-step `84px` rail density overflowing under nine steps.
- Added a frame-scoped compact rail using `60px` rows, `24px` markers, `36px` connectors and a `70px` header. The certified default/six-step `SetupStepper` contract remains unchanged.
- Final evidence `tmp/51l-guided-review-stepper-20260715/report.json`: delta `13.712813364926179`; different pixels `9.471752030060661%`; SHA-256 `402ebfae486c6c1afe862c7497ccfdec19a5c2a499f5471681451a52a245ba66`; runtime-valid render with `2320` body-text characters.
- Shared sentinels remained bit-identical: 51A SHA `dfb2e4cb61a0979da3728400c77a9ba9198066bdb94361b3d76cbdcc4e3e5895`, 51H `138e55cd99392c303729f67d7abf985e4dacf2a8847c3a8410e83a505102d850`, 51I `9164c630d7f0a18682cbdf58f93fe754cd50aa73b04e6ea223ce8a72bdbfaae4`, 51J `e57a21d8f05a8a44cea25e2ea79733fce46094cad93606acf6262da53a483cd9`, and 78 `c3f7b2b815f29e7eed356fc40cbedccbf40a81379a0e589987a0b3c57aa24015`.

## Verdict

**Semi-approved; Fail 1:1.** Official ownership, nine-block semantics, complete review anatomy, compact nine-step rail, callback contracts, first-viewport capacity, and removal of story-local composition are correct. Remaining gaps are contextual agent copy, card/text microdensity, typography, icons, shadows and antialiasing. Reopen only through official setup/review components or tokens and validate the 51A-51L/78 family together.
