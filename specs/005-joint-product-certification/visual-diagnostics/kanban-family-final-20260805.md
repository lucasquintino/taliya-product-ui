# Kanban family final audit - 2026-08-05

## Scope

This batch certifies the four canonical Kanban targets currently mapped to real
routes:

- `/app/vendas` - `crm-image-coverage-vendas--image-37-vendas-pipeline-kanban`
- `/app/financeiro/kanban` - `crm-image-coverage-financeiro--image-33-financeiro-kanban`
- `/app/operacao` - `crm-image-coverage-operação--image-21-kanban-geral`
- `/app/operacao` - `crm-image-coverage-operação--image-22-kanban-com-drawer`

The retired 101-image corpus is not used as an acceptance authority. Current
route contracts, official component ownership, the rebuilt Storybook and live
browser behavior are the evidence for this batch.

## Official ownership

All four targets compose the official family through `CrmKanbanPage`,
`KanbanColumn` and the canonical domain card. Sales uses `PipelineCard`, Finance
uses `FinanceKanbanCard`, and Operation uses `KanbanCard`. Filters, quick
filters and drawers are passed through official slots. No story-local generic
board, card, shell or drawer anatomy is present.

`SalesPipelinePage`, `FinanceKanbanPage` and `OperationShell` own only domain
data, selection, transitions, callbacks and drawer content. Shared drawer
geometry and action guards remain in `@taliya/crm`.

## Product outcomes

- Sales: selecting a lead opens the official lead drawer; qualify, follow-up,
  stage movement, trial, enrollment, conversion and loss produce observable
  pipeline state.
- Finance: selecting a charge opens `PaymentDrawer`; reminder, promise, stage
  movement, receipt approval and payment move the card and update the drawer.
- Operation: selecting or dragging a case uses the same controlled board state;
  assume, delegate, approval, resolve, move and blocked-case correction produce
  observable owner, state, impact and next-action changes.
- Blocked recovery: `Corrigir agora` is enabled while unsafe blocked mutations
  remain guarded. The case returns to `open` with `correção aplicada`.

Dedicated interaction stories keep the visual targets in their initial state:

- `crm-image-coverage-vendas--pipeline-interaction-contract`
- `crm-image-coverage-financeiro--finance-kanban-interaction-contract`
- `crm-image-coverage-operação--operation-lifecycle-contract`
- `crm-image-coverage-operação--operation-blocked-recovery-contract`

All four plays completed in the rebuilt static Storybook with empty warning and
error logs. Direct browser review additionally opened, closed and reopened
drawers and exercised qualify, reminder and assume actions on the visual
targets themselves.

## Responsive evidence

Evidence: `visual-diagnostics/evidence/kanban-family-final-current-20260805`.

Twelve captures cover 1280x720, 1024x768 and 390x844. The generated
`responsive-metrics.json` proves for every target:

- zero document-level horizontal overflow;
- zero overlapping visible columns;
- zero intrinsic card overflow across 18 Sales, 21 Finance and 14 Operation
  cards;
- intentional horizontal lane scrolling at constrained widths;
- fixed, full-height Operation drawer at every breakpoint;
- drawer width of 420px on desktop/tablet and 390px on mobile.

## Regression evidence

- package build: pass for `@taliya/tokens`, `@taliya/ui`, `@taliya/crm`
- CRM tests: 197/197 pass
- docs smoke: 5/5 pass
- docs typecheck/lint and CRM lint: pass
- Storybook static build: pass
- token governance and strict Storybook anatomy: pass
- component architecture, module boundaries, domain wrappers: pass
- public API, public API surface and package boundaries: pass
- Kanban family audit and negative regression probe: pass
- remaining-page coverage audit and family-contract probe: pass

## Decision

The four Kanban targets and the `kanban-workspace` structural family pass the
Codex review dimensions. Their joint status remains `pending-product-owner`
until the product owner records manual approval.
