# Image 23 Tasks Worklist - Regional Diagnostic

Source: `23_round-4.1C_tarefas_01_lista-detalhe.png.png`

Current static story: `crm-image-coverage-tarefas--image-23-lista-detalhe`

Validated baseline:

- dimensions: `1448x1086` source/current;
- mean absolute RGB delta: `12.361003216900855`;
- different pixel ratio: `0.11573084867169296`;
- render validation: visible Storybook body, populated `#storybook-root`, zero visible render/import errors.

## Regional Findings

| Region | Mismatch | Owner | Smallest hypothesis |
| --- | --- | --- | --- |
| Composition | Page already uses `CrmWorklistPage`, `PageFilterBar`, `PageQuickFilters`, official worklist table and `TaskDrawer` | Official CRM family | Retain; no story-local anatomy is required |
| Filter bar | Search/filter/action order and embedded filter action follow source closely | Existing official filter API | Retain and measure exact density before changing |
| Rail/table | Structure and eight-row data match; current rows/text are slightly denser and table begins a few pixels differently | Worklist/table tokens | Measure regional bounds before any shared density variant |
| Drawer width | Current compact drawer edge differs from source by only about `7px`; both preserve the intended main/detail split | Existing compact shell and `TaskDrawer` contracts | Retain compact mode unless later measurement proves a reusable cross-page mismatch |
| Comments | Source uses real avatars; current drawer renders initials | Story data through official `TaskDrawer` | Reuse prepared source avatars if the public drawer API already accepts them |
| Drawer content density | Current checklist/comments/history/callout are more compressed vertically than source | `TaskDrawer` density tokens | Determine whether source maps to an existing non-compact mode before adding a variant |
| Outer frame/top nav | Shared framing and top-nav residual remains | `CrmProductShell` | Requires cross-image shell evidence, not a page-local fix |

## Acceptance Rule

Inspect the public `TaskDrawer` and worklist layout modes first. Any correction must use existing props or a reusable official variant, followed by static Storybook rebuild, source-sized recapture and an explicit pass/fail verdict.

## Recapture Sequence

| Pass | Official composition | Mean RGB delta | Different-pixel ratio |
| --- | --- | ---: | ---: |
| Baseline | Existing compact worklist and task drawer | `12.361003216900855` | `0.11573084867169296` |
| Content | Canonical comment avatars and danger tone without redundant alert icon | `12.38650016618676` | `0.11593943001332886` |
| Header | Compact no-label header collapses the empty eyebrow row | `12.341075007885392` | `0.11581415402460242` |
| Final cycle | Comfortable comment/history activity density | `12.246053276422847` | `0.11540398644730014` |

The avatar pass is retained despite metric noise because it corrects canonical content and uses the public `avatarSrc` contract. Pixel delta is evidence, not an approval function.

## Final Cycle Verdict

- dimensions: `1448x1086`;
- visible render: valid, populated Storybook root, zero visible render/import errors;
- official API additions: optional fact tone icon, no-label drawer-header state, and `TaskDrawer activityDensity="comfortable"`;
- source-like regional bounds: title around `y=152`, facts around `y=228`, checklist around `y=393`, with expanded comments/history contained above the footer;
- verdict: **failed 1:1 visual certification, best structural candidate retained**.

Residual differences are concentrated in shared outer framing/top-nav alignment, callout/footer micro-spacing, typography and antialiasing. The worklist, table, rail and drawer remain composed entirely from official library components.

## Final compiled-static checkpoint (2026-07-14)

- Current build capture: `tmp/image23-final-static-20260714/report.json`.
- Source/current dimensions: `1448x1086`; valid populated render with zero runtime errors.
- Mean RGB delta: `12.25318171335158`; different pixels: `11.543260278990262%`; current SHA-256: `2a75652cba02f22a6066a7ec6aeb31ccf39e8f0d11368aaa99328128c8044e2d`.
- The small numerical movement from the prior best `12.246053276422847` does not reveal a reusable Image 23-specific defect. The retained composition preserves canonical avatars, no-label drawer header and comfortable activity density.

**Final verdict: failed 1:1; semi-approved composition baseline.** Product review must decide whether to accept it. Reopen technical work only with a reusable shell/frame, table selection/numbering or drawer micro-rhythm hypothesis validated across worklist stories; no task-specific anatomy belongs in the coverage story.
