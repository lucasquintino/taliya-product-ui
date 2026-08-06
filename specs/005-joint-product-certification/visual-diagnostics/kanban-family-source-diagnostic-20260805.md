# Kanban family source diagnostic - 2026-08-05

## Scope

- `/app/vendas` - `crm-image-coverage-vendas--image-37-vendas-pipeline-kanban`
- `/app/financeiro/kanban` - `crm-image-coverage-financeiro--image-33-financeiro-kanban`
- `/app/operacao` - `crm-image-coverage-operação--image-21-kanban-geral`
- `/app/operacao` with drawer - `crm-image-coverage-operação--image-22-kanban-com-drawer`

Canonical product contracts come from `surface-contracts.json`. Historical source images are contextual references only; the user retired the 101-image parity requirement in favor of route contracts and current Storybook behavior.

## Baseline evidence

Evidence: `visual-diagnostics/evidence/kanban-family-baseline-20260805`.

The four targets were captured from the static Storybook at 1280x900, 1024x768, and 390x844. The saved responsive metrics show:

- zero document-level horizontal overflow;
- zero card clipping and zero overlapping columns;
- intentionally scrollable lane tracks at every viewport;
- the Operation drawer renders fixed and full-height on desktop and as a full-width fixed drawer on mobile;
- no browser console errors in the inspected Vendas baseline.

The visual anatomy is already owned by official components (`CrmKanbanPage`, `KanbanColumn`, `KanbanCard`, `PipelineCard`, `FinanceKanbanCard`, `LeadDrawer`, `PaymentDrawer`, and `CaseDrawer`). No story-local reusable CSS is required.

## Contract gaps

### Vendas/Pipeline

Required outcomes are qualify, move, follow-up, and convert, with new, hot, no-response, and no-slot states.

Current behavior only selects a `PipelineCard` and writes an aria-live announcement. Selecting Ana does not open a drawer and exposes no domain action. The required states are visible, but no workflow changes them.

- Owner: page state and callbacks in the Vendas story, composed through official `LeadDrawer`.
- Smallest winning change: make the board controlled by `SalesPipelinePage`, open `SalesLeadDrawer` for the selected card, and apply domain actions to the controlled column/card state.

### Financeiro Kanban

Required outcomes are move, reminder, promise, and approval, with due, overdue, promise, and resolved states.

Current behavior only selects a `FinanceKanbanCard` and announces the selection. Selecting Fernanda does not open `PaymentDrawer`; menu and add actions also only announce.

- Owner: page state and callbacks in the Financeiro story plus the official `PaymentDrawerAction` contract.
- Smallest winning change: open `PaymentDrawer` from the selected card, add official move-stage and approve-receipt action ids, and mutate the controlled card/column state for promise, approval, payment, and movement outcomes.

### Operacao/Jornadas

Required outcomes are open case, assign, move, and correct, with open, blocked, waiting, and resolved states.

Card selection and HTML drag/drop already work. The drawer is canonical and full-height, but its default facts always describe Ana even when another card is selected. Clicking Assume only announces `Ação do caso: assume`; Ana remains in the Novo column. Resolve, delegate, approval, and status controls are likewise non-observable transitions.

- Owner: page state and callbacks in the Operacao story plus the official `CaseDrawerAction` contract.
- Smallest winning change: derive facts and state from the selected card, add an official correct action id, and route drawer actions through the same controlled move/update function used by drag/drop.

## Reusable-token decision

No visual token delta is justified by the measured baseline. Existing lane width, horizontal scrolling, card dimensions, drawer geometry, and responsive shell behavior are stable. This batch should not change tokens or CSS unless the post-change capture exposes a new visual regression.

## Acceptance probes

1. Vendas: select a new lead, qualify it, create a follow-up, move stage, and start enrollment; verify column/state/card data and live status after each action.
2. Financeiro: select due, overdue, promise, validation, and resolved cards; verify reminder, promise, approval, movement, payment, and terminal guards.
3. Operacao: select/open a case, assume, delegate, move, correct a blocked case, resolve, close, and reopen; verify drawer facts/state and board mutation.
4. Repeat the 1280/1024/390 matrix with zero document overflow, clipped cards, overlapping lanes, browser errors, or non-full-height drawers.
