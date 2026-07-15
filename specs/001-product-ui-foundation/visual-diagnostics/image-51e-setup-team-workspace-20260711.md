# Image 51E setup team workspace diagnostic - 2026-07-11

Source: `51E_round-4.1J_onboarding_bloco-2-equipe-aprovado.png`

Story: `crm-image-coverage-setup--image-51-e-onboarding-equipe`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous partial composition delta: `12.592151660912497`; different pixels: `7.944948110785126%`.
- The old story assembled an owner card and prepared-invite list locally, but omitted the complete add-person form and footer actions.

## Accepted reusable changes

- Promoted `SetupTeamWorkspace` to `@taliya/crm` as the official owner of the full Equipe block.
- Composed official `SetupBlockHeader`, `RoleCard`, `Input`, `Select`, `InviteRow`, `List`, `InlineAlert`, and button primitives.
- Exposed add-person, invite open/edit/remove, save, defer, and continue callbacks.
- Removed `SetupTeamPreparedList` from the story and replaced local assembly with the official owner.
- Aligned the shell to canonical eight steps, step 2, progress 24, and canonical avatar.
- Added registry, matrix, behavior-test, dashboard-family, and remaining-page contracts.
- Added no story-local anatomy or CSS.

## Evidence progression

- First full owner capture: delta `13.184196755292733`; different pixels: `8.447696383263249%`.
- Compact final owner with visible footer actions: delta `13.426171003055895`; different pixels: `8.540237658197275%`.
- Current compact-rail guided baseline: `tmp/51e-guided-baseline-20260714`; delta `12.793619821459746`; different pixels `8.359858442357464%`; SHA-256 `234c8c810f297fb7c0289dd06e5aeb207147b55bce363367950b726d3b7733e4`.
- The source uses the same rail-wide frame class as Image 51D: approximately `225/983/400px` columns and a body starting near `y=93`, rather than the compact `207/986/415px` guided frame.
- Final source-backed rail-wide capture: `tmp/51e-guided-block-probe-20260714`; delta `12.580294174475895`; different pixels `8.26077063492467%`; SHA-256 `19538aaf788f05ee897625a8ba57b580644885009c9ffdf9bdbbdc94b7217452`.
- Image 51D remained bit-identical at SHA-256 `21122748afb9afc73a635fd575484a86021eeecfbc8ef6e0753fee74cff3382d`; Image 51L remained bit-identical at `4ccb815a2c7be1f54ed0eb327b017ace95390084c25207e35c096a88731f0990`; Image 78 remained bit-identical at `c3f7b2b815f29e7eed356fc40cbedccbf40a81379a0e589987a0b3c57aa24015`.
- Final capture is source-sized, populated, nonblank, and passed runtime inspection.

## Verdict

**Semi-approved; explicit fail 1:1.** Ownership, content completeness, wide-rail framing, form, prepared invites, guidance, actions, callbacks, and vertical fit are correct. The old partial baseline remains numerically lower because it omitted required form/actions. Remaining gaps are owner/form/list padding and density, exact control colors and row dimensions, agent copy, footer status, typography/icons/avatar, shadows, and antialiasing. Product review owns acceptance; reopen technical work only through reusable Equipe/setup contracts validated against 51D, 51L, and 78.
