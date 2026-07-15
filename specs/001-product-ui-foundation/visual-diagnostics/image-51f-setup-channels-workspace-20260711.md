# Image 51F setup channels workspace diagnostic - 2026-07-11

Source: `51F_round-4.1J_onboarding_bloco-3-canais-aprovado.png`

Story: `crm-image-coverage-setup--image-51-f-onboarding-canais`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous generic composition delta: `12.470515815914048`; different pixels: `8.230707432284702%`.
- The old story rendered three unrelated generic items and omitted the WhatsApp, email, public-channel, status, alert, and footer-action anatomy.

## Accepted reusable changes

- Promoted `SetupChannelsWorkspace` to `@taliya/crm` as the official owner of the full Canais block.
- Added WhatsApp readiness choices, official-connection action, studio email, five public-channel fields, status summary, guidance, and footer actions.
- Exposed WhatsApp-state, connect, save, defer, and continue callbacks.
- Replaced story-local assembly with the official owner at canonical step 3 and progress 36.
- Added registry, component-matrix, behavior-test, dashboard-family, and remaining-page contracts.
- Added no story-local anatomy or CSS.

## Evidence progression

- First full owner capture: delta `15.263323994461082`; different pixels: `9.83517992159415%`.
- Compact channel choices: delta `15.229963797039696`; different pixels: `9.84553996816987%`.
- Current compact-rail guided baseline: `tmp/51f-guided-baseline-20260714`; delta `14.677842381531066`; different pixels `9.748867386319144%`; SHA-256 `490112c7835d6ba769bdfd960da7cd9a0808a48cfb659faddfb52ff6f6912801`.
- Source-backed rail-wide probe: `tmp/51f-guided-block-probe-20260714`; delta `14.49948030277607`; different pixels `9.576814342880677%`; SHA-256 `44f78978490485fa55261f611acd701f607b36df1a1913a9ad37c0dc280c1abd`.
- The source uses independent vertical stacks rather than shared grid rows: WhatsApp/public at left and e-mail/status at right. Promoted tokenized `335/317/218/235px` panel heights, `16px` gutter, compact status rows, and helper-copy aliases into the official owner.
- Final owner capture: `tmp/51f-owner-final-20260714`; delta `14.283494729723545`; different pixels `9.545479968881725%`; SHA-256 `86938b2aefd1b78c41caf55e5fbd8bc07a7e9fb4bc4208606af701c741cbb1c0`.
- Image 51D remained bit-identical at `21122748afb9afc73a635fd575484a86021eeecfbc8ef6e0753fee74cff3382d`; 51E at `19538aaf788f05ee897625a8ba57b580644885009c9ffdf9bdbbdc94b7217452`; 51L at `4ccb815a2c7be1f54ed0eb327b017ace95390084c25207e35c096a88731f0990`; and 78 at `c3f7b2b815f29e7eed356fc40cbedccbf40a81379a0e589987a0b3c57aa24015`.
- Final capture is source-sized, populated, nonblank, and passed runtime inspection with all footer actions visible.

## Verdict

**Semi-approved; explicit fail 1:1.** Ownership, content completeness, source-backed wide rail, asymmetric panel stacks, status rows, actions, callbacks, and vertical fit are correct. The old generic baseline remains numerically lower because it omitted most required anatomy. Remaining gaps are choice-card treatment, panel/field microdensity, exact agent copy, control colors, typography/icons/avatar, shadows, and antialiasing. Product review owns acceptance; reopen technical work only through reusable Canais/setup contracts validated against 51D, 51E, 51L, and 78.
