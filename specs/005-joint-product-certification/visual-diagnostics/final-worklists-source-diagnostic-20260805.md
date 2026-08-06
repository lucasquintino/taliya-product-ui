# Final Worklists source diagnostic - 2026-08-05

## Scope and authority

- `/app/financeiro/movimentacoes` - `crm-image-coverage-financeiro--image-34-movimentacoes-filtros-drawer`
- `/internal/tenants` - `crm-image-coverage-internal--image-49-internal-tenants-lista-detalhe`

Acceptance authority is `surface-contracts.json`. The user explicitly retired the historical 101-image count as a completion target, so this batch certifies the two canonical route contracts and their current approved Storybook targets. Baseline captures and measurements are stored under `visual-diagnostics/evidence/final-worklists-baseline-20260805`.

## Shared architecture

Both routes already compose the official Worklist family:

`CrmWorklistPage/InternalWorklistPage -> PageFilterBar + PageQuickFilters + CrmWorklistTable + official full-height drawer`

The baseline has one product shell, one page heading, zero document overflow and a fixed full-height drawer at all three target viewports. No route-local shell, table frame, drawer frame or reusable CSS anatomy is required.

## Confirmed findings

### Movimentacoes financeiras

Contract: table, filters, receipts and adjustments; confirm, reconcile, export and create task; paid, open, failed and dispute.

- `FWL-001`: `PaymentDrawerState` cannot represent dispute or an explicit reconciliation lifecycle. A pending reconciliation is collapsed into `promise`.
- `FWL-002`: the movement drawer exposes reminder, Pix link and mark-paid actions, but no explicit confirm, reconcile, receipt or contextual export action.
- `FWL-003`: action callbacks announce raw implementation ids. Marking a reconciliation as paid changes state but does not communicate the product outcome.
- `FWL-004`: paid/finalized movements keep reminder, Pix and conversation actions enabled even though the selected row is terminal.
- `FWL-005`: the route has no Storybook `play`, so confirm/reconcile/dispute outcomes, filtering and close/reopen are not preserved as route regression evidence.
- `FWL-006`: the 760px table clips 14 cells at desktop while the drawer is open, including Mensalidade, Conciliacao, Comprovante, Desconto aprovado and Ajuste manual.
- `FWL-007`: the page title and several operational labels omit canonical Portuguese accents.

### Internal tenants

Contract: list, filters, status, summary and grants; search, filter, open tenant, grant or revoke access; active, blocked, degraded and active grant.

- `FWL-008`: `TenantSummaryDrawerState` reduces every non-active tenant to `risk`; blocked and degraded account states are not observable.
- `FWL-009`: grant state is not an independent official contract. The drawer always offers `Solicitar grant`, including when the selected tenant already has an active grant.
- `FWL-010`: no grant/revoke transition exists and callbacks announce raw ids without changing the visible drawer or facts.
- `FWL-011`: the table contains risk rather than the canonical degraded state, and the route has no `play` for search/filter, blocked/degraded selection, grant/revoke or close/reopen.
- `FWL-012`: the 760px table clips 14 cells, including Bloqueado, Cancelado, pagamento falhou and inadimplente; the visible desktop screenshot confirms status-chip overlap.

## Owner package and smallest change

- `@taliya/crm`: extend `PaymentDrawer` with official movement lifecycle states and typed contextual actions; extend `TenantSummaryDrawer` with independent account and grant states plus typed access actions.
- `@taliya/tokens`: add domain table minimum-width tokens for dense movement and internal-tenant schemas.
- `apps/docs`: keep prepared rows, facts and page-owned callbacks; map rows to official states/actions, localize outcomes and add two route plays. Do not add reusable anatomy or CSS here.

## Acceptance gate

The two routes can be promoted only after direct component tests, both route plays, static Storybook rebuild, empty browser logs, six responsive checks, visual inspection and all architecture/token/public-API gates pass. Product-owner approval remains separate.

## Final resolution

All findings `FWL-001` through `FWL-012` were resolved in official packages and route-owned prepared data:

- `PaymentDrawer` now exposes open, reconciliation, reconciled and dispute states plus typed contextual actions for confirmation, reconciliation, dispute resolution, receipts and export. Terminal rows no longer inherit reminder/Pix actions.
- `TenantSummaryDrawer` now models active, degraded and tenant-blocked account health independently from none, pending, active and revoked grant state. Grant and revoke actions are typed, observable and disabled for a blocked tenant while audit/support remain available.
- Both tables use domain-specific minimum-width tokens and compact table labels. The final DOM probe reports zero overflowing cells at every target viewport.
- Both stories localize callback outcomes and include `play` coverage for essential actions, state transitions, quick filters and close/reopen.
- No story-local reusable CSS or anatomy was added.

## Final evidence

- CRM direct tests: `196/196` pass.
- CRM and docs lint pass; CRM build and docs typecheck pass; token governance passes.
- Static Storybook rebuilt successfully after the final table correction.
- Both route plays complete on the static artifact: Movimentações ends in `dispute`; Internal tenants proves revoke/grant, degraded, tenant-blocked and reopens in active grant state.
- Browser logs contain zero errors and zero warnings.
- Responsive matrix: `6/6` checks pass at `390x844`, `1024x768` and `1280x720`, with one visible `h1`, one product shell, zero document overflow, zero visible Storybook errors and zero overflowing table cells.
- Both drawers are fixed at `top: 0`, match viewport height exactly and use `390px` mobile / `420px` tablet-desktop width.
- Final captures and metrics: `visual-diagnostics/evidence/final-worklists-final-current-20260805`.

Codex certification can now be recorded for both routes and the Worklist family can advance to its product-owner review. Product-owner approval remains pending and independent.
