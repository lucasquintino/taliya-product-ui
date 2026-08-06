# Student, class and replacement Worklist regional diagnostic - 2026-08-05

## Scope and authority

Routes:

- `/app/alunos` - `crm-image-coverage-alunos--image-27-lista-perfil-resumido`
- `/app/turmas` - `crm-image-coverage-agenda--image-35-turmas-lista-detalhe`
- `/app/reposicoes` - `crm-image-coverage-reposições--image-31-fluxo-encaixe`

Acceptance authority is `surface-contracts.json`. Per current product-owner direction, this certification evaluates the real route contracts rather than the former external-image count. Current static Storybook renders were opened, captured and inspected before edits.

## Shared anatomy

All three routes compose the official Worklist family:

`CrmWorklistPage -> PageFilterBar + PageQuickFilters + official table + official drawer`

Alunos uses `StudentTable` and `StudentDrawer`; Turmas uses configurable `CrmWorklistTable` columns and `ClassDrawer`; Reposições uses `ReplacementTable` and `ReplacementDrawer`. No route owns a shell, filter, quick-filter rail or drawer frame. Story data and column configuration remain acceptable consumer inputs.

## Baseline responsive measurements

The current static artifact was measured at `390x844`, `1024x768` and `1280x720`.

| Route | Overflow | H1 | Shells | Visible errors | Drawer |
| --- | ---: | ---: | ---: | ---: | --- |
| Alunos | 0 at all widths | 1 | 1 | 0 | `StudentDrawer`, fixed, top 0, full viewport height, 390px mobile / 420px larger |
| Turmas | 0 at all widths | 1 | 1 | 0 | `ClassDrawer`, fixed, top 0, full viewport height, 390px mobile / 420px larger |
| Reposições | 0 at all widths | 1 | 1 | 0 | `ReplacementDrawer`, fixed, top 0, full viewport height, 375px mobile / 420px larger |

The document does not overflow, but Alunos compresses nine semantic columns into the drawer-reduced desktop area because its internal table only enables horizontal scrolling at the mobile breakpoint. The final columns visibly clip or collide. The official table must preserve its minimum width and scroll internally at every constrained width.

## Regional findings

### Alunos

- Contract: list, filters, status and side summary; open profile, converse, create task and schedule; active, paused, delinquent and risk.
- The route exposes list/filter/summary, open-profile, message and task actions.
- Gap `WLS-001`: `StudentDrawerAction` has no schedule action.
- Gap `WLS-002`: paused and delinquent are not explicit `StudentTableStatus` or `StudentDrawerState` values. Juliana renders `data-state="active"` with status text `Inativa`; the route cannot represent a paused relationship contract.
- Gap `WLS-003`: finance is derived from risk instead of prepared finance data. A risk student with finance `ok` renders `em atraso`, while an active student with finance `ok` renders `pagamento pendente`.
- Gap `WLS-004`: the nine-column table visibly compresses and clips under the canonical drawer at desktop widths.
- Human probe passed drawer close/unmount, row-select/reopen and open-profile announcement. It confirmed the state/finance defects above.

### Turmas

- Contract: list, capacity, teacher, students and demand; create/edit class, open class and view demand; full, available and conflict.
- List, capacity, teacher and students are present; create and edit actions work.
- Gap `WLS-005`: the route has no explicit demand fact or action, and no `open-class` action. `Abrir agenda` and `Abrir grade` do not fulfill the class-detail contract.
- Gap `WLS-006`: no conflict row/state exists. Full and available are represented.
- Gap `WLS-007`: `ClassDrawer` defaults to `data-state="calling"` even in `variant="class-detail"`, leaking the attendance state machine into the Turmas route.
- Gap `WLS-008`: route announcements expose implementation action ids such as `open-schedule` instead of product language.

### Reposições

- Contract: requests, credits, vacancies, candidates and conflicts; find fit, reserve, invite and consume credit; no vacancy, conflict, waiting response and expired.
- Requests, credit facts, vacancy options, candidates, a conflict option, reserve and invite are visible. Reserving produces `scheduled`.
- Gap `WLS-009`: the official drawer has no explicit find-fit or consume-credit actions.
- Gap `WLS-010`: table/drawer state contracts cannot represent no vacancy, conflict, waiting response or expired directly. Waiting exists only in the table; conflict exists only as an option tone; `expiring` is not the required expired state.
- Gap `WLS-011`: no empty-options product state explains that no compatible vacancy was found.
- Gap `WLS-012`: route announcements expose implementation action ids such as `reserve-slot`.

## Smallest probe hypotheses

1. Add schedule to the official student drawer action contract; promote paused and delinquent states and prepared finance data without changing drawer anatomy.
2. Keep `StudentTable` scrollable with the official table minimum-width token at every constrained width.
3. Add open-class and view-demand actions to `ClassDrawerAction`, pass demand as an existing fact row and drive a route-owned `open` or `conflict` drawer state.
4. Promote no-vacancy, conflict, waiting, expired and consumed lifecycle states into the official replacement table/drawer contracts; add find-fit and consume-credit to the existing footer.
5. Render an official `EmptyState` inside the replacement option section when there are no fit candidates.
6. Add route-level Storybook plays for essential actions, terminal states, close/reopen, filters/search, sorting and representative state selection.
7. Translate all route announcements into product language.

## Final resolution

All regional findings `WLS-001` through `WLS-012` are resolved in official library components and prop-driven route stories.

- Alunos now exposes schedule, paused and delinquent lifecycle states, independent prepared finance data and a readable internally scrollable table.
- Turmas now exposes demand, open-class, view-demand and conflict contracts. `CrmWorklistTable` preserves the token-backed `760px` minimum width inside the `532px` drawer-constrained region; the wrapper scrolls horizontally and no header or first-row cell overflows its box.
- Reposicoes now exposes find-fit, consume-credit, no-vacancy, conflict, waiting, expired and consumed states, including the official empty-options surface and terminal-action guards.
- Route-level plays traverse the essential actions and finish in `delinquent`, `conflict` and `expired` states with zero browser errors or visible Storybook failures.

Final static evidence is stored in `visual-diagnostics/evidence/worklist-student-class-replacement-final-current-20260805`. At `390x844`, `1024x768` and `1280x720`, all nine checks report zero document overflow, one visible `h1`, one `CrmProductShell`, one canonical drawer, no visible Storybook error, and a fixed drawer at top `0` with viewport height.

## Acceptance gate

The Codex batch gate passes: 192 direct CRM tests, package typecheck/lint, route plays, final static build, current-browser interaction, responsive measurements and paired visual inspection are green. Architecture/token gates and route-ledger evidence are recorded next. Product-owner approval remains separate.
