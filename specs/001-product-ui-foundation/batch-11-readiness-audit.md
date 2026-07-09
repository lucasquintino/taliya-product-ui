# Batch 11 Readiness Audit

Date: 2026-06-18

Purpose: turn the current component library into a reusable page/story coverage system for the Taliya CRM, without confusing component certification with full-image reconstruction.

## Current State

- `@taliya/tokens`, `@taliya/ui`, `@taliya/crm`, and `apps/docs` exist and follow the intended package direction.
- `apps/docs` already has image coverage stories for Hoje, Operacao, Tarefas, Checklists, Aprovacoes, Alunos, Access / Subscription, and image 79 empty shell.
- Batch 9 and Batch 10 component ledgers are closed at component level; Batch 11 remains open at image-composition and release-readiness level.
- `batch-11-status-ledger.md` is already active and records iterative evidence for images 17, 18, 20, 21, 22, 23, 24C, 25, 27, and 71-77.
- Source assets were verified in `D:/Downloads/taliya-crm-chatgpt-images-named-20260511-082508`.

## Coverage Count

The current `image-coverage-map.md` contains 84 target rows with a `Covered` status that are not historical-only rows.

Current full-image Storybook coverage:

| Group | Images | Story file | Status |
| --- | --- | --- | --- |
| Hoje | 17, 18, 20 | `apps/docs/src/stories/ImageCoverageToday.stories.tsx` | Exists; visual review/semi-approval level |
| Operacao | 21, 22 | `apps/docs/src/stories/ImageCoverageOperation.stories.tsx` | Exists; visual review/semi-approval level |
| Tarefas | 23 | `apps/docs/src/stories/ImageCoverageTasks.stories.tsx` | Exists; visual review/semi-approval level |
| Checklists | 24C | `apps/docs/src/stories/ImageCoverageChecklists.stories.tsx` | Exists; first static evidence captured, visual review only |
| Aprovacoes | 25 | `apps/docs/src/stories/ImageCoverageApprovals.stories.tsx` | Exists; first static evidence captured, visual review only |
| Alunos | 27 | `apps/docs/src/stories/ImageCoverageStudents.stories.tsx` | Exists; first static evidence captured, visual review only |
| Access / Subscription | 71-77 | `apps/docs/src/stories/ImageCoverageAccessSubscription.stories.tsx` | Exists; image 71 ignored by product decision, 72-77 semi-approved |
| Empty shell | 79 | `apps/docs/src/stories/Image79EmptyShell.stories.tsx` | Exists |

Count summary:

- Covered target rows: 84
- Covered target rows with full-image story today: 17
- Covered target rows without full-image story today: 67

Important nuance: several missing rows are foundation/reference boards, not CRM pages. They still need Storybook proof, but the right proof may be component-board coverage under `Foundations / Tokens`, `Primitives / UI`, or component stories rather than a page-like CRM composition.

## Missing Coverage Classification

| Class | Images | Expected proof |
| --- | --- | --- |
| Foundation and primitive boards | 01, 07-15 | Token/primitive/component story boards plus source references; no fake CRM page shell unless the source image has one |
| Shell baselines | 16, 19 | `CrmProductShell`/state composition coverage using official shell and state components |
| Work-list pages | 30 financeiro overview, 31 reposicoes, 34 movimentacoes, 35 turmas, 38 interessados, 39 experimentais, 40 matriculas, 41 riscos, 45 relatorios, 69 uso extrato | Reuse `WorkListDetailPage`, `ListDetailLayout`, `PageFilterBar`, `PageQuickFilters`, `DataTable`, `TablePagination`, and official drawers/cards |
| Three-pane/conversation pages | 24 inbox | Reuse `ThreePaneLayout`, `ConversationList`, `ConversationThread`, `ContextPanel`, `Composer`, `AgentPanel` |
| Calendar/class pages | 26, 29, 36 | Reuse `WeeklyCalendar`, `MiniCalendar`, `ClassCard`, `Roster`, `ClassDrawer`, `ConfigImpactPreview` |
| Kanban pages | 33, 37 | Reuse `KanbanBoard`, `KanbanColumn`, `FinanceKanbanCard`, `PipelineCard`, and shared kanban lane surface behavior from Operacao |
| Drawer/detail pages | 28, 32, 42-44, 46, 47, 49-50 | Reuse the shared drawer frame plus domain drawers/panels; no drawer-specific story CSS for anatomy |
| Setup/onboarding pages | 51A-51L, 78 | Reuse `SetupShell`, setup block components, setup agent/chat, and official 9-block order |
| Agent/flow pages | 52-54, 56, 58-59, 70 | Reuse Batch 10 agent/flow components inside official shell/detail templates |
| Config/billing/usage/internal pages | 48, 60-68 | Reuse certified Batch 9/10 cards/tables/panels inside shell/layout templates |

## Architecture Findings

1. `@taliya/crm` is usable but still concentrated in `packages/crm/src/index.tsx`. It exposes 400+ exported declarations from one module. This is acceptable for current proof, but not ideal as a long-lived CRM library shape.
2. `@taliya/ui` has the same monolithic pattern at smaller scale. The public API can stay barrel-based, but implementation files should eventually be split by primitive family.
3. Existing page standards are valuable and should become the page-coverage engine: `PageFilterBar`, `PageQuickFilters`, `DataTable`/`TablePagination`, `KanbanBoard`, shared drawer frame, `WorkListDetailPage`, `ListDetailLayout`, and `CrmProductShell`.
4. Batch 11 should avoid creating new one-off screen CSS. If a missing page cannot be composed cleanly, extract or adjust the reusable template/component first.
5. Component-level approval does not automatically approve a full image. Batch 11 must capture image-level evidence after composing approved components.

Current `components:audit` result:

- Stories scanned: 236
- Invalid Storybook titles: 0
- Legacy `CRM / Batch` titles: 0
- CRM components scanned: 169
- Components with native controls classified/justified: 29
- Refactor rows before broad page replication: 0

`PageQuickFilters`, `CrmOperationalRow`, and `OperationActivityTable` are explicitly classified as justified compound roots: their native buttons represent the full selectable row, while icon/status/count/action visuals are delegated to official primitives.

## Execution Plan

1. Export and architecture pass:
   - keep package entrypoints stable;
   - document canonical imports for `@taliya/ui` and `@taliya/crm`;
   - run `components:audit` and classify any remaining architectural debt;
   - do not split files mechanically until coverage pressure shows the right module boundaries.

2. Page-template hardening:
   - treat `CrmProductShell`, `WorkListDetailPage`, `ListDetailLayout`, `PageFilterBar`, `PageQuickFilters`, `DataTable`, `TablePagination`, `KanbanBoard`, and the shared drawer frame as the reusable page kit;
   - add or update isolated stories if any of those templates lack required variants/states after the latest fixes;
   - keep layout, overflow, shadows, borders, selected states, hover/focus, and density tokenized.

3. Coverage waves:
   - Wave 1: pages closest to current standards: 30 financeiro overview, 31 reposicoes, 34 movimentacoes, 35 turmas. Images 24C checklists, 25 aprovacoes, and 27 alunos now have first coverage and remain in visual review.
   - Wave 2: pages with different layout patterns: inbox 24D, agenda/aula/grade 26/29/36, finance/sales kanban 33/37.
   - Wave 3: detail-heavy and domain pages: 28, 32, 38-47, 48-50.
   - Wave 4: setup/onboarding, agents/flows, config/billing/usage: 51A-51L, 52-70, 78.
   - Wave 5: foundation/reference boards 01 and 07-15 as Storybook proof boards tied to token/primitive/component stories.

4. Per-image cycle:
   - open the source image from the canonical directory;
   - write a regional diagnostic against the closest current story/template;
   - compose the story from package components only;
   - promote reusable visual values to tokens before component CSS uses them;
   - capture static Storybook evidence;
   - update `batch-11-status-ledger.md` with status, story path, evidence, blocker, and next action.

5. Release-readiness gate:
   - `corepack pnpm tokens:audit`
   - `corepack pnpm components:audit`
   - `corepack pnpm typecheck`
   - `corepack pnpm lint`
   - `corepack pnpm test`
   - `corepack pnpm build`
   - `corepack pnpm storybook:build`
   - `corepack pnpm visual:smoke`

## Stop Conditions

- Stop before changing a visual component if the source image has not been opened or the current render has not been compared.
- Stop before adding one-off story CSS that replaces reusable component anatomy.
- Stop if a needed visual value is missing from `@taliya/tokens`.
- Stop if a page needs data fetching, routing, auth, billing, or agent behavior. Stories must use prepared fake data and callbacks only.
- Stop before marking any image `Aprovado` without static Storybook capture and source comparison evidence.

## Next Concrete Step

Continue Wave 1 with image 30 financeiro overview or image 31 reposicoes. Images 24C checklists, 25 aprovacoes, and 27 alunos now prove the reusable path through `CrmProductShell`, `PageFilterBar`, `PageQuickFilters`, `WorkListDetailPage`/`ListDetailLayout`, domain tables, `DataTable`, shared drawer/approval/student components, and official row/detail primitives, but none of the three is 1:1 certified.
