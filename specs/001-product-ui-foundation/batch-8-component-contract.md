# Batch 8 Component Contract - P1 UI Primitives

Status: formally closed after source-image visual capture, component-level review, token alignment, and full technical gates.

Goal: implementar os primitives P1 de superficies operacionais reutilizaveis no `@taliya/ui`, com Storybook isolado em `Primitives / UI / [Component] / All States`, comportamento real, token-first, e refatoracao dos wrappers CRM que hoje simulam esses padroes.

Approved source images:

- `10_round-3b3_visualizacoes-operacionais_aprovada.png`
- `11_round-3b4_comunicacao-agentes_aprovada.png`
- `12_round-3b5_sistema-plano-governanca_aprovada.png`
- `13_round-3c1_objetos-setup-dados_aprovada.png`
- `14_round-3c2_agenda-financeiro-documentos_aprovada.png`
- `15_round-3c3_agentes-auditoria-relatorios_aprovada.png`

## Batch 8 Non-Negotiables

- Components must be primitives in `@taliya/ui`, not CRM-only mocks.
- CRM wrappers must compose these primitives where the surface already exists.
- No backend, auth, billing, API, database, or agent execution logic.
- Every new component receives prepared data and callbacks only.
- Storybook must expose all variants/states and at least one interactive smoke target.
- CSS values that define repeatable anatomy must be tokenized before use.
- Story-only CSS may arrange examples but cannot own reusable component anatomy.

## Component Contracts

| Component | Primary source | Exact extraction target | Required anatomy | Variants/states | Required behavior | Reuse contract | Storybook path |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `Stepper` | Image 13, block 1 "Wizard / stepper de setup" | horizontal setup stepper with 5 nodes, connectors, labels, sublabels, blocked lock, pending minus, overall progress row | ordered list, circular step marker, connector rail, label, description/status, optional progress footer | `complete`, `current`, `blocked`, `pending`, `warning`; compact; clickable/readonly | step buttons call `onStepSelect`; disabled/blocked remain focusable only when reason is needed; current has `aria-current="step"` | uses `Icon`, `ProgressBar`, tokens; CRM `SetupStepper` and `SubscriptionProgressStepper` compose it | `Primitives / UI / Stepper / All States` |
| `ChecklistItem` | Image 13, block 2 "Checklist de ativacao" | dense checklist/table row with status icon, item, responsible person, quick action, menu | row container, leading status mark, title/meta, optional owner/person, action area, trailing menu | `complete`, `incomplete`, `warning`, `blocked`; action available; disabled; selected | checkbox/button semantics depending `interactive`; action callbacks; blocked action disabled | uses `Icon`, `Avatar`/`PersonLabel`, `Button`, `IconButton`, `Chip` | `Primitives / UI / ChecklistItem / All States` |
| `MetricTile` | Image 10, block 7 "Cards de resumo operacional" | 2x3 summary card grid, including selected inverse black tile | card, optional icon, label, numeric value, delta/helper footer, optional action | default, positive delta, negative delta, warning, selected/inverse, interactive, disabled | clickable card button when `onSelect`; action button callback; selected is semantically represented | uses `Card`, `Icon`, `MetaText`, tokens; CRM `MetricCard` composes it | `Primitives / UI / MetricTile / All States` |
| `StatusSummaryCard` | Image 12, blocks 1/6/7/11 and Image 10 block 7 | system/governance cards with icon/title/status/body/action rhythm | card, status icon/avatar, title, status chip, body/details, primary/secondary action | ok, attention, danger, blocked, info, action, selected, compact | actions call callbacks; blocked action disabled; optional details rows remain semantic | uses `Card`, `Icon`, `Chip`, `Button`, `InlineGroup` | `Primitives / UI / StatusSummaryCard / All States` |
| `DiffTable` | Image 15, block 8 "Diff antes / depois" | before/after comparison table with changed green/red cells and approve/revert actions | table wrapper, title/meta, before column, after column, row status accent, footer actor/origin/actions | changed, removed, added, approved, rejected; compact; loading/empty/error | approve/reject/revert callbacks; row selection callback optional | uses table anatomy, `Chip`, `Button`, `Icon` | `Primitives / UI / DiffTable / All States` |
| `PermissionTable` | Image 12, block 5 "Permissoes e acesso" | compact permission table with module/profile/action/status markers | table wrapper, module/profile/action/status columns, status chip/marker, footer link/action | allowed, blocked, request, pending; readonly; interactive rows | request callback; row click optional; blocked rows announce status | uses table anatomy, `Chip`, `Button`, `Icon`, `StatusDot` | `Primitives / UI / PermissionTable / All States` |
| `AuditTable` | Image 15, block 9 "Log detalhado / auditoria" and Image 12 block 8 | audit log table with actor avatar, object, action, time, origin, status, open-object action | dense table, actor cell, object/action/time/origin/status/action cells, footer action | success, pending, alert, denied; compact; selectable; empty/loading/error | row click/open object/action callbacks; keyboard focus for row action | uses table anatomy, `Avatar`, `Chip`, `IconButton` | `Primitives / UI / AuditTable / All States` |
| `ImportProgressCard` | Image 13, block 3 "Progresso de importacao" | large running import card plus small state cards for concluded/errors/duplicates/paused | card header, source title, progress, metric triplet, ETA/helper, actions; optional summary mini mode | running, complete, duplicate, error, paused; compact/summary | pause/resume/details/retry callbacks; progressbar semantics | uses `Card`, `ProgressBar`, `Button`, `Icon`, `MetricTile` style tokens | `Primitives / UI / ImportProgressCard / All States` |
| `RelationshipCard` | Image 13, block 9 "Relacoes e familia" | contact relationship cards connected around selected student | person card with avatar/name/role/contact, relationship badge, selected ring, conflict marker, actions | primary, related, conflict, selected, disabled | select callback; relationship/action callback; contact actions call handlers | uses `Card`, `Avatar`, `Chip`, `IconButton`, `ConnectorLine` | `Primitives / UI / RelationshipCard / All States` |
| `ConflictCard` | Image 14, block 7 "Conflito de recurso" and Image 13 block 6 | red/pink warning card with conflict facts, suggested action, primary button | alert card, severity header, fact grid, suggested action row, action buttons, status footer | warning, danger, suggestion, applied, unresolved, info | apply/ignore/view callbacks; danger action semantics; disabled when applied | uses `Card`, `InlineAlert`, `Button`, `Chip`, `Icon` | `Primitives / UI / ConflictCard / All States` |
| `DocumentPreview` | Image 14, block 8 "Viewer de documento/contrato" | contract preview with page thumbnails, document surface, status, actions, history, toolbar | preview shell, thumbnail rail, document canvas, metadata/status column, actions, history, toolbar | preview, signed, pending, error, loading, compact | page select, zoom in/out, download, send, fullscreen callbacks; selected page is semantic | uses `Card`, `Button`, `IconButton`, `Chip`, `List` | `Primitives / UI / DocumentPreview / All States` |
| `ExecutionRow` | Image 15, block 5 "Trace de execucao" | trace table rows with step number, execution step, tool, status, duration, cost, error | row/card variant, step marker, title/tool/meta, status chip, duration/cost/error cells, optional expand/details | running, success, failed, pending, skipped; expanded; compact | expand/collapse callback, retry/open details callbacks; failed exposes error | uses `Icon`, `Chip`, `Button`, table row tokens | `Primitives / UI / ExecutionRow / All States` |
| `ConfidenceMeter` | Image 11, block 10 "Card de confianca" | small confidence card with green chip, large percent, segmented bar, helper text | card/header/status chip, percent, segmented meter, threshold helper | low, medium, high; unknown; compact; loading | exposes progressbar semantics; threshold label is status text | uses `Card`, `Chip`, `ProgressBar` token family with custom segmented meter | `Primitives / UI / ConfidenceMeter / All States` |

## Token Extraction Targets

These tokens must exist before final component CSS is accepted:

- `--taliya-control-stepper-*`: marker size, connector height, item gap, label gap, compact sizes.
- `--taliya-control-checklist-*`: row height, padding, icon size, owner width, action gap.
- `--taliya-control-metric-tile-*`: tile min height, icon size, value typography, footer gap.
- `--taliya-control-status-summary-*`: card gap, icon size, details gap, details grid.
- `--taliya-control-comparison-table-*`: diff cell tint, row height, action gap.
- `--taliya-control-permission-table-*`: row height, status width, action width.
- `--taliya-control-audit-table-*`: avatar size, row height, action cell width.
- `--taliya-control-import-progress-*`: metric grid, summary card min height, icon size, action gap.
- `--taliya-control-relationship-card-*`: card width, selected ring, connector gap.
- `--taliya-control-conflict-card-*`: severity border, fact grid, fact grid gap, action row height.
- `--taliya-control-document-preview-*`: rail width, page thumbnail size, canvas min height, toolbar height, preview line height/widths.
- `--taliya-control-execution-row-*`: marker size, row height, grid template, error color hooks.
- `--taliya-control-confidence-meter-*`: segment count/gap/height, percent typography.

## CRM Refactor Obligations

- `MetricCard` must compose `MetricTile`.
- `SetupStepper` and `SubscriptionProgressStepper` must compose `Stepper`.
- `BeforeAfterDiff` must compose `DiffTable`.
- `PermissionMatrix` must compose `PermissionTable`.
- `AuditTrail` must expose or compose `AuditTable` where tabular audit is intended.
- `ChecklistRow` and `PreflightChecklist` must compose `ChecklistItem`.
- `ImportProgress` must stop being only a generic surface and compose `ImportProgressCard`.
- `RelationshipList` must stop being only a generic surface and compose `RelationshipCard`.
- Agent trace/receipt surfaces may remain CRM/P2 wrappers, but must use `ExecutionRow` once a row list is rendered.

## Static Review Corrections Applied

- Promoted repeatable Batch 8 anatomy values to tokens: status details grid, import icon size, conflict facts grid, document preview line height/widths, execution row grid, confidence segment count.
- Updated component CSS to consume those tokens instead of hardcoded anatomy values.
- Preserved rest props on clickable `MetricTile` and `RelationshipCard` branches.
- `DocumentPreview` now renders and announces the provided page `label` instead of deriving only from index.
- `DiffTable`, `PermissionTable`, and `AuditTable` rows now support optional keyboard activation with explicit accessible row labels.
- `ConfidenceMeter` now supports configurable segment count while defaulting to the approved 5-segment contract.
- Final visual tuning removed all 1px text clipping from `ImportProgressCard`, `DocumentPreview`, `ExecutionRow`, and `AuditTable`.
- `ExecutionRow` compact status column is tokenized at `70px` so the approved `Em andamento` chip does not clip.
- Batch 8 token tests now lock the final source-derived dimensions instead of the stale pre-visual-audit guesses.

## Final Acceptance Matrix

| Component | Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Stepper | pass | pass | pass | pass | pass | pass | pass | approved |
| ChecklistItem | pass | pass | pass | pass | pass | pass | pass | approved |
| MetricTile | pass | pass | pass | pass | pass | pass | pass | approved |
| StatusSummaryCard | pass | pass | pass | pass | pass | pass | pass | approved |
| DiffTable | pass | pass | pass | pass | pass | pass | pass | approved |
| PermissionTable | pass | pass | pass | pass | pass | pass | pass | approved |
| AuditTable | pass | pass | pass | pass | pass | pass | pass | approved |
| ImportProgressCard | pass | pass | pass | pass | pass | pass | pass | approved |
| RelationshipCard | pass | pass | pass | pass | pass | pass | pass | approved |
| ConflictCard | pass | pass | pass | pass | pass | pass | pass | approved |
| DocumentPreview | pass | pass | pass | pass | pass | pass | pass | approved |
| ExecutionRow | pass | pass | pass | pass | pass | pass | pass | approved |
| ConfidenceMeter | pass | pass | pass | pass | pass | pass | pass | approved |

## Final Validation Evidence

- `corepack pnpm typecheck`: pass.
- `corepack pnpm lint`: pass.
- `corepack pnpm test`: pass.
- `corepack pnpm build`: pass with existing Vite/Radix `use client` warnings and existing chunk-size warnings.
- `corepack pnpm visual:smoke`: pass.
- Static Storybook visual capture completed against `http://127.0.0.1:6108`.
- Final Batch 8 capture evidence: `tmp/visual-audit/batch8/iteration12/manifest.json`.
- Final visual review sheet: `tmp/visual-audit/batch8/iteration12/contact-sheet.png`.
- Final capture result: 13/13 Batch 8 stories rendered, no empty render, no external overflow, no internal clipping, and all expected interactive controls present.
