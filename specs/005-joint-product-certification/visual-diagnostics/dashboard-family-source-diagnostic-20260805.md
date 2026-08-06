# Dashboard family source diagnostic - 2026-08-05

## Scope

The structural family maps 12 visual targets. The four `/app/hoje` targets are
already Codex-complete and provide the certified shell, responsive grid and
drawer regression baseline. This diagnostic scopes the eight remaining targets:

| Route | Story | Current official owner | Source result |
| --- | --- | --- | --- |
| `/app/financeiro` | `image-30-visao-geral-filas` | `FinanceOverviewDashboard` / `CrmDashboardPage` | structure pass; journey incomplete |
| `/app/financeiro` | `image-32-financeiro-drawer-cobranca` | `FinanceOverviewDashboard` / `PaymentDrawer` | structure pass; lifecycle incomplete |
| `/app/uso` | `image-68-uso-visao-geral` | `CrmRightPanelPage` / `UsageOverviewWorkspace` | structure pass; outcomes not observable |
| `/app/relatorios` | `reports-management` | `CrmDashboardPage` / `ChartPanel` | structure pass; states unproven |
| `/app/dinheiro-na-mesa` | `money-on-the-table` | `CrmDashboardPage` / `OpportunityPanel` | structure pass; lifecycle incomplete |
| `/app/suporte` | `support-central` | `CrmDashboardPage` / `SupportTicketDrawer` | structure pass; grant lifecycle incomplete |
| `/app/billing` | `image-65-billing-assinatura` | `CrmRightPanelPage` / `BillingSubscriptionWorkspace` | structure pass; outcomes not observable |
| `/internal` | `image-48-internal-visao-operacional` | `InternalShell` / `InternalOverviewDashboard` | structure pass; operational states unproven |

## Architecture evidence

`dashboard-family:audit` passes all 41 protected Dashboard, Right Panel and
Setup owners. `remaining-page-coverage:audit` also passes after replacing stale
exact-call markers with the current controlled component contracts. There is no
evidence of story-local shell, generic card grid or duplicate drawer anatomy in
the eight targets.

The family can reuse the already certified Today evidence for:

- `CrmDashboardPage` shell ownership and region layout;
- global and sidebar callbacks;
- responsive grid collapse at 1280, 1024 and 390;
- fixed full-height drawer geometry;
- accessible status announcements and drawer close/reopen behavior.

That reuse covers shared mechanics only. It does not prove each domain purpose,
required block, essential action or essential state.

## Product gaps

### Financeiro

Image 30 renders the official dashboard without page-owned callbacks, so its
queues and priority cards are selection-only evidence. Image 32 owns a drawer,
but only payment and promise currently mutate state; reminder, confirmation,
task creation, failure and reconciliation outcomes are not all demonstrated.
There is no dedicated play for the overview/drawer contract.

### Uso e cotas

The page wires ledger, flow, add-on, origin and summary callbacks to an unused
local string. A user action therefore has no observable page outcome. The
contract requires 70%, 90%, 100% and blocked states, while this target only
shows a ready overview and has no interaction story.

### Relatorios

Filters, origin actions and local export already announce outcomes through an
ARIA live region. The story has no play and does not prove the required empty,
loading and ready states. Domain actions can reuse existing `ChartPanel`,
`ReportFilterBar` and `ExportAction` tests, but the route still needs an
observable contract story.

### Dinheiro na Mesa

Opportunity selection, drawer close/reopen and local announcements exist. The
page does not yet demonstrate opportunity, ownerless and resolved transitions;
drawer actions announce implementation ids without changing the selected
opportunity state.

### Suporte

Ticket selection and drawer close/reopen exist. Ticket and agent actions only
announce ids. The canonical authorize/revoke grant lifecycle and the open,
responded and active-access states are not demonstrated by a route play.

### Billing Taliya

All workspace callbacks update an unused local string, so plan, payment,
invoice, add-on and support actions are not observable. The target shows only
the active subscription state; failed and expired states are unproven.

### Internal

Dashboard cards, activity, filters, search and drawer callbacks announce
outcomes. The story has no play and does not prove normal, degraded, critical
and empty operational states or a complete investigate-alert journey.

## Next implementation boundary

Corrections must remain in official `@taliya/crm` domain components and page
contracts. Stories may own data, selected ids, domain state, callbacks and live
announcements. They must not add local dashboard cards, grids, drawer anatomy or
responsive CSS.

The next browser batch should capture all eight targets at 1280x720, 1024x768
and 390x844, then directly exercise every enabled primary action. Source changes
should be limited to gaps reproduced in that baseline.
