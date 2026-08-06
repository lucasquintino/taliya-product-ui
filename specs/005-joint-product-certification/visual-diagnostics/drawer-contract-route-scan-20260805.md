# Drawer Contract Route Scan

Date: 2026-08-05  
Artifact: `apps/docs/storybook-static`  
Viewport: 2560 x 1440

## Result

The scan loaded 170 `crm-image-coverage` stories and found 73 routes with an initially mounted drawer. All 73 drawer roots passed the canonical contract:

- `position: fixed`
- `top: 0`
- `right: 0`
- `bottom: 0`
- `width: 420px`
- full viewport height
- zero horizontal overflow
- one `main` landmark

Violations found: **0**.

## Alunos

`crm-image-coverage-alunos--students-shell` uses the official `StudentDrawer` and passed the contract.

`crm-image-coverage-alunos--image-28-aluno-perfil-resumo-operacional` does not mount a drawer. It uses `CrmRightPanelPage` with the persistent `StudentProfileActionRail` in the `right-panel student-profile` family. That panel is intentionally static and contained within the profile page. It is not a drawer geometry violation.

Changing the profile action rail into a full-height drawer would be a product-family decision, separate from correcting drawers that are accidentally rendered inside page content.
