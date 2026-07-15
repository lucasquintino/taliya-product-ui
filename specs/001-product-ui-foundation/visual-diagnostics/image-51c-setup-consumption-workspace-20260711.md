# Image 51C setup consumption workspace diagnostic - 2026-07-11

Source: `51C_round-4.1J_onboarding_workspace-configuracao-aprovado.png`

Story: `crm-image-coverage-setup--image-51-c-onboarding-workspace-configuracao`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous generic composition delta: `12.447767568859353`; different pixels: `7.793996511905792%`.
- The old story assembled three generic choice cards and a config preview, but did not own the package, replacement, exception, validation, and action anatomy shown by the source.

## Accepted reusable changes

- Promoted `SetupConsumptionWorkspace` to `@taliya/crm` as the official owner of the Image 51C central workspace.
- Added controlled model selection plus setting and footer-action callbacks.
- Composed only official setup, panel, field, toggle, list, alert, chip, icon, and button primitives.
- Replaced story-local assembly with `SetupPage` plus the new owner at step 2 and progress 32.
- Added the public `SetupPage frameVariant="guided"` contract for the compact-rail guided frame without changing the isolated 51A `shell-global` or Image 78 `welcome` layouts. Later source-backed probes assigned 51D-51F to `guided-block`; 51G-51L remain on `guided` because the wide rail regressed the 51L sentinel.
- Added source-backed guided shell tokens for the `207/986/415px` columns, `79px` topbar, `770px` body, `65px` bottom bar, and source bottom-bar offset.
- Compacted `SetupConsumptionWorkspace` through official `fieldSize="sm"`, compact toggles/buttons, and owner tokens. Its source rows are now models `143px`, settings `200px + 167px`, and footer `94px`.
- Added component-registry, matrix, behavior-test, dashboard-family, and remaining-page contracts.
- Added no story-local anatomy or CSS.

## Evidence progression

- First full owner capture: delta `13.806413313740345`; different pixels: `8.345430647432997%`.
- Compact owner and canonical `Rascunho` badge: delta `14.094805442986269`; different pixels: `8.420683991884842%`.
- Guided frame before owner compaction: `tmp/51c-guided-frame-20260714`; delta `13.477108322443632`; different pixels `8.41299340516299%`.
- Final complete owner: `tmp/51c-guided-final-clean-20260714`; delta `13.749750638551745`; different pixels `8.749154671046275%`; SHA-256 `8e467e60754ab12c23db1db1d968bc48a03eb9bb65258a79a1679369f89901ca`.
- Final exact macro axes: stepper `x=16/y=80`, main `x=239/y=80`, agent `x=1241/y=80`, bottom bar `y=862`; workspace rows start at `y=204`, `356`, `567`, and `742`.
- All three exception rows, four replacement/package toggles, and three footer actions are visible without story-local anatomy. Final capture is source-sized, populated, nonblank, and passed runtime inspection.
- Shared sentinels: Image 51L improved from delta `16.59969881713268` to `16.340403588432`; Image 78 remained bit-identical at SHA-256 `c3f7b2b815f29e7eed356fc40cbedccbf40a81379a0e589987a0b3c57aa24015`. The 51A `shell-global` selectors are isolated from the guided variant.

## Verdict

**Semi-approved; explicit fail 1:1.** Ownership, shell columns, vertical page axes, complete workspace anatomy, controls, exceptions, validation, actions, callbacks, and no-overflow behavior are correct. The old generic baseline remains numerically lower because it omitted required anatomy. Residual differences are topbar ordering/scale, agent copy and micro-density, exact control tones, typography/icons/avatar, shadows, and antialiasing. Product review owns acceptance; reopen technical work only through reusable guided-shell or setup-owner contracts validated across 51A-51L and 78.
