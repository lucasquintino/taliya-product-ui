# Image 24D Inbox Conversation - Regional Diagnostic

Source: `24_round-4.1D_inbox_01_conversa-aberta.png.png`

Current static story: `crm-image-coverage-inbox--image-24-d-inbox-conversa-aberta`

Validated baseline:

- dimensions: `1448x1086` source/current;
- mean absolute RGB delta: `15.620160658506558`;
- different pixel ratio: `0.1022480998748512`;
- render validation: visible Storybook body, populated `#storybook-root`, zero visible render/import errors.

## Regional Findings

| Region | Mismatch | Owner | Smallest hypothesis |
| --- | --- | --- | --- |
| Composition | Uses official `CrmThreePanePage`, `PageFilterBar`, `ConversationList`, `ConversationThread` and `ContextPanel` | Official CRM family | Retain; no local anatomy required |
| Page header | Source title/subtitle are stacked; current renders inline | Existing shell rhythm | Use `pageHeaderRhythm="compact-stacked"` |
| Content inset | Source filter begins around `x=92`; current begins around `x=122` | Missing three-pane content layout | Add governed `content-three-pane` padding |
| Pane inset | Source pane grid begins around `x=105`, approximately `13px` inside the filter edge | Three-pane page wrapper | Add official pane inset token |
| Vertical gap | Source leaves about `12px` between filter surface and pane layout; current joins them directly | `CrmThreePanePage` composition | Wrap filter/layout in an official page stack |
| Data/media | Current list uses initials for several contacts while source shows photos | Story data/public conversation APIs | Audit existing avatar props after structural recapture |
| Outer frame/top nav | Shared framing residual remains | `CrmProductShell` | Requires cross-image shell evidence |

## Acceptance Rule

Promote only official shell/family props and tokens, rebuild static Storybook, recapture at `1448x1086`, and record an explicit pass/fail verdict. No automatic threshold approves the image.

## Recapture Sequence

| Pass | Official composition | Mean RGB delta | Different-pixel ratio |
| --- | --- | ---: | ---: |
| Baseline | Existing default shell/three-pane composition | `15.620160658506558` | `0.1022480998748512` |
| Structure | Compact-stacked header, three-pane content layout and official stack | `13.241430147295734` | `0.09098852293886023` |
| Final cycle | Canonical avatars in list, thread and context | `13.130211565920183` | `0.0908562518441643` |

## Final Cycle Verdict

- dimensions: `1448x1086`;
- visible render: valid, populated Storybook root, zero visible render/import errors;
- official API/anatomy: `CrmThreePanePage` now owns `contentLayout="three-pane"`, page stack, pane inset and spacing;
- source-like geometry: filter around `x=92/y=202`, pane layout around `x=105/y=281`;
- total mean-delta improvement: `2.489949092586375`;
- verdict: **failed 1:1 visual certification, best structural candidate retained**.

Residual differences remain in shared outer framing/top-nav rhythm, conversation microdensity, typography and antialiasing. All page anatomy remains in official library components; the story varies only data and assets.

## Shared-navigation follow-up (2026-07-14)

- Current compiled-static checkpoint `tmp/image24d-final-static-20260714/report.json` remains structurally valid at `1448x1086`, delta `13.136544680497474` and changed-pixel ratio `9.091539228554277%`.
- Source/current inspection confirms the filter and pane origins are already within a few pixels, while the four-item Inbox top navigation starts around source `x=462` versus current `x=530`.
- Smallest reusable hypothesis: promote an `inbox` page-header rhythm that preserves the complete `compact-stacked` header contract and owns only the source-backed top-nav offset. No conversation/list/context anatomy changes are justified before recapture.

## Final compiled-static evidence

- Retained public contract: `pageHeaderRhythm="inbox"`, with the same compact stacked header geometry and a governed four-item navigation offset.
- Final report: `tmp/image24d-inbox-rhythm-static-20260714/report.json`.
- Source/current dimensions: `1448x1086`; valid populated render with zero runtime errors.
- Mean RGB delta: `12.678586751184504`; different pixels: `8.88155886572449%`; current SHA-256: `70907294f12ddd2e16e2633f325efecbb77c0f836a6cd6af64f8b2e3cc3a78d6`.
- Paired worklist regression `tmp/image23-regression-after-inbox-rhythm-20260714/report.json` remained bit-identical to the accepted Image 23 baseline.

**Final verdict: failed 1:1; semi-approved composition baseline.** Official shell, Inbox rhythm, filter bar, conversation list/thread and context panel now own the complete visible anatomy. Residual differences remain in outer framing, conversation/card microdensity, typography, icons/avatar rasterization and antialiasing. Product review must decide whether to accept this baseline; technical reopening requires a reusable Inbox or shell hypothesis.
