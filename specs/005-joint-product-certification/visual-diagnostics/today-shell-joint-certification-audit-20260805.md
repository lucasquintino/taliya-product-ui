# Today and Empty Shell Joint Certification Audit

Date: 2026-08-05

## Scope

Codex reviewed the five canonical route targets for the Today operational dashboard and the authenticated empty shell:

- `crm-image-coverage-hoje--image-17-hoje-base`
- `crm-image-coverage-hoje--image-18-hoje-drawer-tarefa`
- `crm-image-coverage-hoje--image-19-hoje-estado-critico`
- `crm-image-coverage-hoje--image-20-historico-de-hoje`
- `crm-image-coverage-image-79-empty-shell--image-79-empty-shell`

The additional `loading` and `unavailable` stories prove the essential state contract for the empty route.

## Product Purpose

Today is the operator's daily priority surface. It brings checklist, immediate exceptions, schedule, human queue, blockers, tasks, approvals, money and daily history into one actionable dashboard. Selecting a task opens the canonical full-height drawer.

The empty route is the baseline authenticated shell. It proves that navigation, global actions, title and an empty content canvas can be consumed without rebuilding shell anatomy, and that loading or recoverable failure remains official library behavior.

## Findings and Resolution

`JPC-022` covered two P1 defects. The history story scrolled the wrong element, while Image 79 used a separate fixed 1160px shell that overflowed by 151px at tablet width and 785px on mobile. The canonical refactor also exposed and removed a nested duplicate canvas class before final certification.

The final implementation uses `CrmPageFamilyShell`/`CrmProductShell`, one content canvas, official state primitives and `scrollIntoView` for the history region. Story-local CSS still owns only capture harness concerns.

## Interaction Review

- Image 17 opens and closes the task drawer, changes the active top navigation and executes the queue CTA.
- Image 18 toggles a checklist item, concludes the task and disables repeated completion.
- Image 19 represents the critical checklist and priority selection state.
- Image 20 opens the history region and exports through an observable callback.
- Image 79 executes top navigation, sidebar and global search callbacks.
- Unavailable retries through an observable callback; loading exposes `aria-busy`.

All seven Storybook plays reach their final assertion without a visible Storybook error.

## Responsive Review

The five canonical routes were inspected at 390x844, 1024x768 and 1280x720. All 15 combinations report zero horizontal overflow, one visible `h1`, one `CrmProductShell` and one canonical shell canvas.

The task drawer is 390x844 at mobile and 420x768 at tablet, always `top: 0`. At desktop it remains 420x720. The history region reaches `top: 0` in the active scrolling context, including `windowBodyScrollTop: 2614` on mobile.

Evidence: `visual-diagnostics/evidence/today-shell-final-current-20260805`.

## Verification

- `@taliya/crm`: 186/186 tests, typecheck and build pass.
- Docs: five smoke tests, typecheck, lint and static Storybook build pass.
- Token governance, Storybook anatomy, dashboard family and drawer lifecycle gates pass.
- Dashboard negative probe rejects a regression away from the official page family.

Codex status: pass for all five route targets. Product-owner review remains pending.
