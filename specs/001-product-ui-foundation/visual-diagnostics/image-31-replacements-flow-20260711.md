# Image 31 replacements flow diagnostic - 2026-07-11

Source: `31_round-4.1F_reposicoes_01_fluxo-encaixe.png.png`

Story: `crm-image-coverage-reposições--image-31-fluxo-encaixe`

## Current structure

- Source and current render: `1448x1086`.
- Mean RGB delta: `11.88`.
- Different-pixel ratio: `7.32%`.
- The page is composed with official `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, `ReplacementTable`, and `ReplacementDrawer` components.
- Rows, filter values, queue selection, pagination, drawer state, option selection, and actions are supplied as typed data and callbacks.
- No story-local shell, queue, table, drawer, option-card, or footer anatomy is present.

## Review

- The canonical main-priority layout, eight-row replacement table, six queue filters, selected row, full-height drawer, three slot options, invitation suggestion, agent notes, and complete action footer are represented.
- The current render is source-sized, populated, and passed runtime render inspection with zero render errors.
- The package already owns replacement-specific table columns, drawer placement, fact rows, option states, notes, and footer rhythm.
- Remaining differences are shared shell/frame offsets, title/filter vertical rhythm, table typography and row density, drawer microspacing, avatar fidelity, and antialiasing.
- No new wrapper or image-specific variant is justified by this source alone.
- Fresh final compiled-static evidence: `tmp/image31-baseline-20260714/report.json`, source/current `1448x1086`, mean RGB delta `11.891185827321781`, different pixels `7.320569172695177%`, current SHA-256 `b4748360156722025dd0ff8bb98bebe0067e1a5af32e3481ffadc333db3884c4`, valid populated render with zero runtime errors.
- Visual inspection confirms the canonical table origin (`y=278`), eight-row dataset, main-priority rail/table/drawer columns, selected row, three fit options, suggestion/audit blocks and complete footer actions. The drawer starts roughly `20px` below the source; the Image 29 clipping probe proves this cannot be corrected by translating a rail above the shell's clipping boundary.

## Verdict

**Fail 1:1; semi-approved technical baseline.** Image 31 is structurally mature and contains no duplicated product anatomy, but exact pixel fidelity is not proven. Residuals remain in safe drawer top/height, table/footer microdensity, drawer spacing, shell/frame rendering, typography, avatars/icons and antialiasing. Retain the official replacements family and reopen only through reusable `CrmWorklistPage`, `ReplacementTable`, `ReplacementDrawer`, or clipping-aware token changes validated across isolated stories; do not introduce story-local layout or CSS.
