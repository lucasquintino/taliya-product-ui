# Image 24 Checklists Worklist - Regional Diagnostic

Source: `24_round-4.1C_checklists_01_lista-execucao-detalhe.png.png`

Current static story: `crm-image-coverage-checklists--image-24-lista-execucao-detalhe`

Validated baseline:

- dimensions: `1491x1055` source/current;
- mean absolute RGB delta: `11.978359255056406`;
- different pixel ratio: `0.07243524337176296`;
- render validation: visible Storybook body, populated `#storybook-root`, zero visible render/import errors.

## Regional Findings

| Region | Mismatch | Owner | Smallest hypothesis |
| --- | --- | --- | --- |
| Composition | Uses official shell, filter bar, quick filters, checklist table and `ChecklistDrawer` | Official CRM family | Retain; no story-local anatomy required |
| Main content inset | Source worklist begins around `x=106`; current begins around `x=88` | Shell content layout | Use official worklist padding instead of main-priority padding |
| Rail | Source rail is approximately `190px`; current main-priority rail is `176px` | Worklist layout mode/token | Add reusable intermediate `balanced-rail` mode |
| Table | Five-row content, selection, statuses and pagination align closely | Official checklist table | Retain and remeasure after horizontal correction |
| Drawer | Drawer edge differs by only a few pixels and content anatomy follows source | Official `ChecklistDrawer` | Retain compact content placement |
| Outer frame/top nav | Shared frame and top-nav residual remains | `CrmProductShell` | Requires cross-image shell evidence |

## Acceptance Rule

Promote only official layout props/tokens, rebuild static Storybook, recapture at `1491x1055`, and record an explicit pass/fail verdict. Pixel metrics do not approve the image automatically.

## Recapture And Verdict

- official composition: `contentLayout="work-list"` with `worklistLayoutMode="balanced-rail"`;
- dimensions: `1491x1055`;
- visible render: valid, populated Storybook root, zero visible render/import errors;
- mean absolute RGB delta: `11.973239330665404` (baseline `11.978359255056406`);
- different-pixel ratio: `0.07254204532089853` (baseline `0.07243524337176296`);
- measured geometry: official rail `190px`, table begins around `x=297`; source begins around `x=303`, with the residual matching the outer-frame offset;
- verdict: **failed 1:1 visual certification, best structural candidate retained**.

The new reusable balanced rail corrects the worklist/table distribution without local CSS. Remaining differences are shared outer framing/top-nav rhythm, typography/antialiasing and small drawer/table details.

## Final compiled-static checkpoint (2026-07-14)

- Current build capture: `tmp/image24-final-static-20260714/report.json`.
- Source/current dimensions: `1491x1055`; valid populated render with zero runtime errors.
- Mean RGB delta: `11.979944755420357`; different pixels: `7.257128871173328%`; current SHA-256: `5a2a67f8f45bb0f0ced7e6bbb359df973fd33c28ab7f7d6f3464153d5ac2779e`.
- The small numerical movement from the prior best does not expose a reusable checklist-specific regression. The retained composition preserves the official balanced rail, selected table state, drawer facts/steps/activity and action footer.

**Final verdict: failed 1:1; semi-approved composition baseline.** Product review must decide whether to accept it. Reopen technical work only with reusable shell/frame, prepared owner-avatar or checklist table/drawer micro-rhythm evidence validated across isolated components; no local page anatomy is warranted.
