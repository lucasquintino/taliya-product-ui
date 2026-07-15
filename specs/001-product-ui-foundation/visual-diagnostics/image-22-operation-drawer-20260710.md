# Image 22 Operation Drawer - Regional Diagnostic

Source: `22_round-4.1B_operacao_02_kanban-com-drawer.png`

Current static story: `crm-image-coverage-operação--image-22-kanban-com-drawer`

Validated baseline after the image 21 kanban cycle:

- dimensions: `1448x1086` source/current;
- mean absolute RGB delta: `19.3954820942245`;
- different pixel ratio: `0.11873874423857636`;
- render validation: visible Storybook body, populated `#storybook-root`, zero visible render/import errors.

## Regional Findings

| Region | Mismatch | Owner | Smallest hypothesis |
| --- | --- | --- | --- |
| Filter actions | Source drawer state omits the separate sliders/export actions; current keeps both visible | Story state through official `PageFilterBar` | Make the shared Operation filter composition accept an actions-visibility flag |
| Selected card | Official selected card state is present and correctly dark | Existing `KanbanCard` API | Retain; no local styling required |
| Drawer anatomy | Title, status, facts, alternatives, copilot callout, message, history and footer align closely with source | Existing `CaseDrawer` | Retain the official drawer; do not fork markup |
| Drawer geometry | Current floating drawer begins around `x=1031` and ends at `1434`; source begins around `x=1042` and ends at `1439` inside its outer frame | Shared shell/drawer placement | Treat as shared framing/reservation evidence; do not change globally from this image alone |
| Main content edge | Current kanban/activity content stops roughly `28px` before the drawer; source surfaces reach the drawer edge | Shared shell content padding with floating drawer | Probe only through an official shell placement/inset contract if state correction leaves it material |
| Outer frame/top nav | Same shared framing and top-nav alignment residual as image 21 | `CrmProductShell` | Requires cross-image shell evidence |

## Token Decision

The first pass adds no token and no CSS. It changes only whether the official filter action slot is populated for the drawer state. Existing `CaseDrawer` and shell geometry remain unchanged until a focused recapture isolates the residual.

## Acceptance Rule

Rebuild static Storybook, recapture image 22 with visible-render validation, compare source/current/diff, and record an explicit pass/fail verdict. No automatic threshold approves the image.

## Recapture And Verdict

- official state correction: the drawer variant no longer populates the separate filter action slot;
- dimensions: `1448x1086`;
- visible render: valid, populated Storybook root, zero visible render/import errors;
- mean absolute RGB delta: `19.358831978402506` (baseline `19.3954820942245`);
- different-pixel ratio: `0.11861728376219692` (baseline `0.11873874423857636`);
- verdict: **failed 1:1 visual certification, best state-correct candidate retained**.

The focused state fix is correct but confirms that the dominant residual belongs to shared outer framing, drawer reservation/content-edge geometry, top-nav alignment and typography. The official `CaseDrawer` anatomy is retained unchanged because its internal regions already track the source closely and are reused across product families.

## Operation shell follow-up (2026-07-14)

- Reused the new public `pageHeaderRhythm="operation"` and corrected sidebar grouping introduced from paired Images 21/22 evidence.
- The official drawer state remains selected, omits filter actions and keeps the existing `CaseDrawer` anatomy and callbacks.
- Final compiled static evidence: `tmp/image22-regression-after-operation-rhythm-20260714/report.json`; source/current `1448x1086`, valid populated render, mean RGB delta `19.178203080220722`, different pixels `11.783383189361334%`, current SHA-256 `d505cd3ea7f3cf8d78c379bc599149807991e18cd51b44536e06d6b40528a67e`.
- The result improves the prior best `19.358831978402506` / `11.861728376219692%` while preserving Image 21's improvement.

**Final verdict: failed 1:1; semi-approved composition baseline.** Drawer ownership, state, facts, alternatives, copilot callout, history and footer actions remain official and functional. Residual differences remain in outer framing, drawer reservation/content edge, exact card content, typography, icons/avatar and antialiasing. Product review must decide whether to accept the baseline; technical reopening must stay in shared shell/drawer contracts.

## CaseDrawer placement regression guard (2026-07-14)

- The Operation story now selects `drawerPlacement="viewport"` explicitly, while the shell honors floating/chrome modes for Retention instead of a global `CaseDrawer` viewport override.
- Final compiled-static evidence: `tmp/image22-regression-after-case-drawer-final-20260714/report.json`; mean RGB delta `19.10644283175456`, different pixels `11.763924076391644%`, current SHA-256 `75b1c8d120bcae273c9d89934509ed2a4336bc3b2545fe12f9384179db019932`.
- This improves the preceding `19.178203080220722` / `11.783383189361334%` baseline while preserving the full-height operational drawer.

Status remains **failed 1:1; semi-approved composition baseline** pending product review.
