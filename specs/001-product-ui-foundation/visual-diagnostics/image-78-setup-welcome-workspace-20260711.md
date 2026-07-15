# Image 78 setup welcome workspace diagnostic - 2026-07-11

Source: `78_round-4.1Q_onboarding_bem-vindo-taliya-setup-guiado-aprovado.png`

Story: `crm-image-coverage-setup--image-78-onboarding-bem-vindo`

## Baseline

- Source/current dimensions: `1672x941`.
- Previous invalid-grid delta: `15.417243566601751`; different pixels: `6.838774794197357%`.
- The welcome shell referenced the undefined `--taliya-layout-crm-setup-shell-agent-width`, invalidating its grid and producing two equal columns.
- The story composed `SetupWelcomeMain` and `SetupWelcome` directly and used the generic guided-shell agent rather than the official setup-agent component.

## Accepted reusable changes

- Added the missing welcome-agent width token to `@taliya/tokens` and restored the intended wide-main/narrow-agent grid.
- Promoted `SetupWelcomeWorkspace` to `@taliya/crm` as the official owner of the welcome content area.
- Migrated the story to `SetupWelcomeWorkspace` plus the official `SetupAgentChat`, with studio-name, start, quick-reply, send, and human-help callbacks.
- Stabilized visible welcome-topbar items in explicit grid columns and removed the inappropriate framed main surface.
- The first pass used a tokenized embedded scale for the certified `675x1381` step-agent component inside the `428px` setup-shell column.
- Added registry, matrix, behavior-test, dashboard-family, and remaining-page contracts.

## Native welcome-agent follow-up - 2026-07-15

- Added the additive public contract `SetupAgentChat variant="step" | "welcome"`; the default `step` anatomy remains the Image 51B owner.
- Promoted the Image 78 intro copy, quick questions and human-help footer to the official `welcome` variant, omitting the step-only info callout and composer.
- Added source-backed shell, message, header, quick-question and footer tokens for the native `428px` rail.
- Removed the embedded scale and nested agent framing from the welcome composition.
- Preserved Image 51B, Image 51L and Image 51A bit-identically after the change.

## Evidence progression

- Restored-grid capture before embedded scaling: delta `10.660611865621933`; different pixels: `4.951148884674249%`.
- Embedded step-agent baseline: delta `11.467434072816085`; different pixels: `5.300276098419171%`; SHA `c3f7b2b815f29e7eed356fc40cbedccbf40a81379a0e589987a0b3c57aa24015`.
- Final native welcome-agent capture `tmp/78-welcome-agent-final-20260715/report.json`: delta `8.42100051355323`; different pixels: `3.973046082504106%`; SHA `1e3c5a73773ed0e4d45fd6d590d60eb7c21a0202c36e257fa2ca4a3bcdbc4752`.
- Regression sentinels are bit-identical: Image 51B SHA `837dcf2567f091fe44f5445c99859d419c4823993ea347e10dd4fbcc22399216`, Image 51L SHA `402ebfae486c6c1afe862c7497ccfdec19a5c2a499f5471681451a52a245ba66`, and Image 51A SHA `dfb2e4cb61a0979da3728400c77a9ba9198066bdb94361b3d76cbdcc4e3e5895`.
- Final capture is source-sized, nonblank, passed runtime inspection and contains the source-relevant welcome content and actions.

## Verdict

**Semi-approved; fail 1:1.** Official ownership, token completeness, source-relevant agent content, shell proportions, topbar placement and interaction contracts are correct. Remaining gaps are typography/font rendering, icons, colors, shadows and antialiasing. Product review owns acceptance; reopen technical work only through reusable setup shell/agent/welcome components and tokens that preserve Images 51A, 51B and 51L.
