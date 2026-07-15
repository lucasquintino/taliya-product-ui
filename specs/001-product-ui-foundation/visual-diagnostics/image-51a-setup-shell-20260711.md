# Image 51A setup shell diagnostic - 2026-07-14

Source: `51A_round-4.1J_onboarding_shell-global-aprovado.png`

Story: `crm-image-coverage-setup--image-51-a-onboarding-shell-global`

## Baseline

- Source/current dimensions: `1672x941`.
- Current-cycle baseline: `tmp/image51a-current-20260714/report.json`.
- Baseline delta: `9.521264578216869`; different pixels: `5.3632626392568224%`; SHA-256: `6c65dd8f50289ea85701af152db89b40a0b61061aba50b468a0cb22c4921a0d0`.
- The page already used `SetupPage` and the package-owned default stage, but the guided shell was edge-to-edge and reused content-page dimensions that differ from the 51A global-shell frame.

## Accepted reusable change

- Added the initial `SetupPage frameVariant="default" | "shell-global"` split; only 51A uses `shell-global`. The later public contract added `guided` for compact-rail setup pages and source-backed `guided-block` for Images 51D Studio, 51E Equipe, and 51F Canais, while Image 78 retains `layout="welcome"`.
- Added governed shell-global tokens for the `8px` outer inset, `220/970/403` columns, `90px` topbar and `65px` bottom bar.
- Replaced the unrelated dashboard placeholder icon with the public `scan` icon and corrected the shared setup-agent title and message-border treatment.
- Added no story-local layout, markup or CSS.

## Final evidence

- Compiled-static report: `tmp/51a-variant-final-20260714/report.json`.
- Final delta: `8.072248930944887`; different pixels: `4.726341673737109%`; SHA-256: `dfb2e4cb61a0979da3728400c77a9ba9198066bdb94361b3d76cbdcc4e3e5895`.
- Exact final macrogeometry: shell `x=8 y=8 w=1656 h=925`; step rail `x=24 y=99 w=220 h=738`; main `x=260 y=99 w=970 h=738`; agent `x=1246 y=99 w=402 h=738`; bottom bar `x=24 y=853 w=1630 h=65`.
- Cross-family sentinels improved: Image 51C `tmp/51c-variant-regression-20260714/report.json` reached `13.803901690996886` / `8.280792%`; Image 51L `tmp/51l-variant-regression-20260714/report.json` reached `16.59969881713268` / `10.361699%`.
- Image 78 `tmp/78-variant-regression-20260714/report.json` remained bit-identical at SHA-256 `c3f7b2b815f29e7eed356fc40cbedccbf40a81379a0e589987a0b3c57aa24015`.

## Verdict

**Semi-approved, explicit failed 1:1.** The official frame now matches the source macrogeometry and improves both comparison metrics without regressing content or welcome variants. Residual differences remain in agent vertical micro-rhythm, placeholder proportions, typography, logo/icon rasterization, shadows and antialiasing. Product review must decide whether to accept this reusable baseline.
