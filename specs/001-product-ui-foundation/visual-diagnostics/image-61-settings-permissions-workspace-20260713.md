# Image 61 settings permissions diagnostic - 2026-07-13

Source: `61_round-4.1M_configuracoes_02_permissoes-aprovado.png`

Story: `crm-image-coverage-configuracoes--image-61-configuracoes-permissoes`

## Baseline

- Source/current dimensions: `1491x1055`.
- Previous aggregate capture delta: `11.80`; different pixels: `7.03%`.
- The story rendered only the certified `PermissionMatrix` and `ConfigImpactPreview` in its main area.
- The complete `1. Papéis do CRM` section and `UnsavedChangesBar` were absent.
- A story-local `SettingsAgentPanel` helper wrapped the generic `AgentPanel`, leaving the canonical insight cards, four questions, composer and human-help footer absent.

## Accepted reusable changes

- Added official `PermissionRoleCard` with role identity, status, permission checklist, selected state and callback.
- Added official `SettingsPermissionsWorkspace`, which composes role cards, `PermissionMatrix`, `ConfigImpactPreview` and `UnsavedChangesBar` and exposes all domain callbacks.
- Added official `SettingsAgentPanel` with contextual header, introduction, insight cards, questions, composer and human-help callback.
- Added a reusable `CrmRightPanelPage` settings variant for source-aligned main/rail geometry across Images 61-64.
- Added package registry entries, public types, behavior tests, isolated Storybook stories, source-map/matrix rows and component-specific tokens.
- Removed the story-local settings-agent wrapper and added no story CSS.

## Evidence progression

- First complete-owner capture: delta `12.945087057362606`; different pixels `8.084208251086297%`.
- Geometry/composer capture: delta `12.428286411465104`; different pixels `8.03080727651851%`; rejected as final evidence because header actions overlapped the rail.
- Final non-overlapping capture: delta `12.542337330989623`; different pixels `8.190755909866784%`.
- Final capture is source-sized, nonblank and passed runtime inspection.
- The metric is diagnostic only: adding source-required anatomy can increase changed pixels relative to a sparse but structurally incomplete baseline.

## Verdict

**Fail 1:1 at page level.** Official ownership, complete first-viewport anatomy and interaction contracts are now correct. `PermissionMatrix`, `ConfigImpactPreview` and `UnsavedChangesBar` retain their existing isolated component certifications. Remaining differences are browser/shell chrome, the source's enclosing left-page surface, exact header/status offsets, section density, assistant typography and antialiasing. Refine only official shell, settings workspace, agent panel, primitives and tokens; do not recreate this anatomy in stories.

## 2026-07-15 scoped page-variant refinement

- Added public `CrmRightPanelPage rightPanelVariant="settings-permissions"`, mapped to an isolated `contentLayout="settings-permissions"`; Images 62-64 remain on generic `settings`.
- The official variant owns the source-aligned `887px 440px` tracks, `26px` gap, `847px` workspace, enclosing main surface, rounded assistant rail, canonical header offsets and section rhythm.
- The Image 61 story now selects the canonical browser URL and `topNavSelection="none"`; it still prepares only state, content and callbacks and contains no page CSS or duplicated anatomy.
- Baseline before this refinement: delta `12.27273890843746`; different pixels `8.043712512039058%`; SHA `7b0f8eb8c7a62e426280fad7086648f9e9471c6c581481d7141831c343650b89`.
- Final static evidence: `tmp/61-rhythm-final-20260715/report.json`; delta `10.076113129540804`; different pixels `6.845114923347351%`; SHA `eddbce942118f197cc67ebdaf1ac075fa69a9bfde2c2c567cc4cb20f8a8efd41`.
- Sentinels remained bit-identical: Image 60 `a1b302780086cf3bea2520a5c5308d8920e75509144d501caef189ad80ab98dc`, Image 62 `58e07b2f664c41a1d0e663f9894ef40371c67f870c093ef4a3f0e30446becce0`, Image 63 `271be0fe9bed77128c244b3104a9b5d516cf4a47d0a6e2a99942209f89b83430`, Image 64 `8eb96da520c60c02249499210b0880e6783c641eb55a8255638180eeeae54f4a`.

The page remains explicitly **Fail 1:1 / semi-approved**, not certified. Residual review belongs to product for chrome, typography, icon optical details, borders, shadows and antialiasing; technical work should reopen only for a reusable official hypothesis with the same sentinels.
