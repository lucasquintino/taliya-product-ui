# Image 43 reactivation list diagnostic - 2026-07-11

Source: `43_round-4.1H_reativacoes_01_ex-alunos-retorno.png.png`

Story: `crm-image-coverage-retencao--image-43-reativacoes-ex-alunos`

## Assessment

- Source/current dimensions: `1448x1086`.
- Mean RGB delta: `14.927943646258019`; different pixels: `8.726407296348011%`.
- Official worklist/filter/quick-filter/table/`CaseDrawer` composition already owns ex-student rows, return opportunity, restrictions, history, and commands.
- Selection and drawer actions now flow through official package callbacks.
- No local anatomy, CSS, wrapper, or visual variant was added.

## Verdict

**Fail 1:1.** Structurally mature and feature-complete. Remaining gaps are shared frame rhythm, repeated avatars, typography, icon/chip geometry, drawer density, footer sizing, and antialiasing. Reopen only through reusable official contracts validated across Images 41-44.

## Reopened family geometry diagnostic - 2026-07-14

- Correct source/current dimensions are `1659x948`. Current compiled-static baseline: `tmp/image43-retention-family-baseline-20260714/report.json`; delta `14.933954842062517`, different pixels `8.735881256310675%`, SHA-256 `aedd8a1f9cb77dee468f2978b940a60e0f0774b5406c622b12587ce09377a57c`.
- Source uses the same wide summary-drawer family as Image 41, beginning near `y=104` and retaining right/bottom gutters. Current uses the `403px` full-viewport override from `y=0`.
- Page filter/table geometry is already source-like and must remain unchanged.
- Smallest family hypothesis: select authoritative floating placement and the shared wide `CaseDrawer` variant. The existing `120px` floating top is exact for Image 41 and within the cross-source variation for Image 43; do not add a story-specific offset.

## Final family result - 2026-07-14

- Accepted official contract: floating placement plus `CaseDrawer widthVariant="wide"`, using the shared `425px` token and existing floating gutters. No source-specific offset, page rhythm change or story-local CSS was added.
- Final compiled-static evidence: `tmp/image43-retention-drawer-final-static-20260714/report.json`; source/current `1659x948`, mean RGB delta `14.429312177789987` (baseline `14.933954842062517`), different pixels `8.57469676969757%`, current SHA-256 `53a6f4dffe86c9abd601d7b758719a10a928250b2cabac13892c8d07fd73a67a`.
- Cross-family guard: all five CaseDrawer pages improved in mean delta after removing the global viewport override.

**Final verdict: failed 1:1; semi-approved composition baseline.** The shared wide summary drawer materially improved both metrics. Remaining differences are visual micro-fidelity, not missing family anatomy.
