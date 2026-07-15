# Image 44 complaint queue diagnostic - 2026-07-11

Source: `44_round-4.1H_reclamacoes_01_fila-caso-sensivel-drawer.png.png`

Story: `crm-image-coverage-retencao--image-44-reclamacoes-caso-sensivel`

## Assessment

- Source/current dimensions: `1448x1086`.
- Mean RGB delta: `14.645262047738417`; different pixels: `8.934427896618176%`.
- Official worklist/filter/quick-filter/table/`CaseDrawer` composition owns severity rows, sensitive-case facts, impact, paused automation, resolution plan, copilot note, history, and footer commands.
- Selection and commands now flow through official callbacks.
- No story-local anatomy or styling was introduced.

## Verdict

**Fail 1:1.** Structurally mature and feature-complete. Remaining gaps are shared frame rhythm, avatars, typography, icon/chip geometry, long drawer density, footer sizing, and antialiasing. Reopen only through reusable official contracts validated across Images 41-44.

## Reopened family geometry diagnostic - 2026-07-14

- Correct source/current dimensions are `1672x941`. Current compiled-static baseline: `tmp/image44-retention-family-baseline-20260714/report.json`; delta `14.659000020338741`, different pixels `8.942626951883621%`, SHA-256 `59e56f29360c2c688bd983d743f8a7e1f2141ae34603c7a0b98d5ac7c15f4446`.
- Source uses the same standard-width, chrome-aligned long-drawer placement as Image 42. Current starts at `y=0`; filter/table boundaries already align closely enough that page-header changes are rejected.
- Smallest family hypothesis: use the reusable `chrome` shell placement with standard CaseDrawer width and existing shared gutters. Preserve the long content/footer anatomy and validate all four Retention pages plus Operation Image 22.

## Final family result - 2026-07-14

- Accepted official contract: `drawerPlacement="chrome"` with standard `CaseDrawer` width. The shell owns top/right/bottom geometry and stacking while the existing long body/footer anatomy remains unchanged; no story-local CSS was added.
- Final compiled-static evidence: `tmp/image44-retention-drawer-final-static-20260714/report.json`; source/current `1672x941`, mean RGB delta `13.875332411310374` (baseline `14.659000020338741`), different pixels `8.527398827471538%`, current SHA-256 `33f3d06cb9219622bb2a7aa678037049b3568261f7c39084e7dfb0dcf38fc8c4`.
- Cross-family guard: Image 22 and Images 41-43 retained valid populated renders and improved mean delta under the same shell contract.

**Final verdict: failed 1:1; semi-approved composition baseline.** Placement is structurally source-like and both metrics improved. Remaining gaps are shared shell rendering, typography, icons/avatars and antialiasing.
