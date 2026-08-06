# Worklist core regional diagnostic - 2026-08-05

## Scope and authority

Routes:

- `/app/tarefas` - `crm-image-coverage-tarefas--image-23-lista-detalhe`
- `/app/checklists` - `crm-image-coverage-checklists--image-24-lista-execucao-detalhe`
- `/app/aprovacoes` - `crm-image-coverage-aprovacoes--image-25-lista-decisao-detalhe`

The route contracts in `surface-contracts.json` are the acceptance authority for this batch. The external source-image directory is not present on this machine and the product-owner direction for this certification is to evaluate the routes, not the former 101-image count. Current static Storybook renders were captured and inspected before edits.

## Shared anatomy

All three routes already compose the official Worklist family:

`CrmWorklistPage -> PageFilterBar + PageQuickFilters + official table + official drawer`

There is no route-local shell, filter, table or drawer anatomy. Visual ownership remains in `@taliya/crm`; controls remain in `@taliya/ui`; measurements and colors remain token-backed.

## Current responsive measurements

The static build was tested at `390x844`, `1024x768` and `1280x720`.

| Route | Overflow | H1 | Shells | Visible errors | Drawer |
| --- | ---: | ---: | ---: | ---: | --- |
| Tarefas | 0 at all widths | 1 | 1 | 0 | `TaskDrawer`, fixed, top 0, full viewport height, 375px mobile / 420px larger |
| Checklists | 0 at all widths | 1 | 1 | 0 | `ChecklistDrawer`, fixed, top 0, full viewport height, 375px mobile / 420px larger |
| Aprovações | 0 at all widths | 1 | 1 | 0 | `ApprovalDrawer`, fixed, top 0, full viewport height, 375px mobile / 420px larger |

## Regional findings

### Tarefas

- Contract: fila, dono, prazo, origem, caso; assumir, delegar, concluir, reagendar; atrasada, sem dono, aguardando.
- Current render exposes every required block and state.
- Human interaction probe passed: assume, delegate, reschedule, close/unmount, row-select/reopen and complete all produce observable state changes.
- Remaining work: add a Storybook play that preserves these outcomes as route-level regression evidence.

### Checklists

- Contract: rotinas recorrentes, execuções, responsáveis, histórico; iniciar, concluir, atribuir, abrir tarefa; pendente, em execução, atrasado.
- Current render shows execution progress, responsible owner, activity/history access, pending and in-progress states.
- Gap `WLC-001`: the official drawer exposes `Continuar`, `Criar tarefa`, `Concluir` and `Abrir origem`, but no `Atribuir` action and no canonical `Abrir tarefa` action.
- Gap `WLC-002`: completing the checklist updates its steps but leaves `ChecklistDrawer` in `data-state="open"`.
- Gap `WLC-003`: `ChecklistTableStatus` has no `overdue` state, so an overdue deadline is only a red date and not an explicit product state.
- Visual observation: the dense table remains usable without document overflow, but the desktop-with-drawer composition has very narrow cells. Preserve a scrollable minimum table width instead of allowing semantic columns to collapse.

### Aprovações

- Contract: proposta, antes/depois, risco, impacto, motivo; aprovar, editar, rejeitar, pedir dados; pendente, expirada, aprovada, rejeitada.
- Current render exposes proposal, risk and impact. All four decision callbacks run; approval and rejection update the drawer state.
- Gap `WLC-004`: the detail does not expose explicit before, after and reason sections.
- Gap `WLC-005`: `ApprovalTableStatus` cannot represent expired, approved or rejected rows; expired is absent from the route.
- Gap `WLC-006`: action announcements expose implementation ids such as `request-data` instead of product language.
- Visual observation: the drawer is full-height and independently scrollable. The table must retain its scrollable minimum width while the fixed drawer is open.

## Smallest probe hypotheses

1. Extend `ChecklistDrawer` with one canonical action model: primary start/continue label, assign, open task and complete. Keep the same drawer anatomy.
2. Promote `overdue` into `ChecklistTableStatus` and preserve the existing chip treatment through tokens.
3. Promote `expired`, `approved` and `rejected` into `ApprovalTableStatus`; map row state into `ApprovalDrawer` on selection.
4. Supply before, after and reason through existing official `ApprovalPanelSection` anatomy, avoiding story-local markup and CSS.
5. Add route-level Storybook plays for actions, state transitions, close/reopen, filter/search and table sorting.
6. Add a token-backed minimum width for ChecklistTable at constrained widths if the post-change visual probe confirms column collision.

## Acceptance gate

This batch is not approved until component tests, story plays, static build, responsive measurements, accessibility checks, visual inspection and the joint route ledger all pass. Product-owner approval remains separate.

## Final resolution

All six regional findings are resolved in the official library components and route compositions:

- `WLC-001` and `WLC-002`: `ChecklistDrawer` now exposes the canonical start/continue, assign, open-task, complete and open-origin actions; completion produces the terminal `completed` state and disables mutation controls.
- `WLC-003`: `ChecklistTableStatus` now represents `overdue` explicitly.
- `WLC-004`: approval detail now includes explicit before, after and decision-reason sections.
- `WLC-005`: `ApprovalTableStatus` now represents expired, approved and rejected rows, and row selection drives the drawer state.
- `WLC-006`: approval announcements use Portuguese product language instead of implementation ids.
- Checklist and approval tables preserve a token-backed minimum width and scroll inside their own region while the canonical fixed drawer is open.

Final Storybook plays exercise the required actions, states, close/reopen behavior, quick filters, search and sorting. The rebuilt static artifact reaches these terminal states:

- Tarefas: `TaskDrawer[data-state="completed"]` and `Tarefa concluída`.
- Checklists: `ChecklistDrawer[data-state="completed"]` and `Checklist concluído`.
- Aprovações: `ApprovalDrawer[data-state="expired"]` with decision actions disabled and origin inspection available.

Responsive evidence at `390x844`, `1024x768` and `1280x720` reports zero horizontal overflow, one product shell, one visible `h1`, no visible Storybook error and one fixed full-viewport-height drawer for every route. Final captures and metrics are stored under `visual-diagnostics/evidence/worklist-core-final-current-20260805`.

Verification completed with 187 CRM tests, package and docs typechecks, docs lint, docs smoke tests, token governance, Storybook anatomy, component architecture and the final static Storybook build passing. Product-owner approval remains separate.
