# Missing Isolated Stories Diagnostic

Date: 2026-08-04

Scope: `AgentPublishFlowCard`, `CrmPageFamilyShell`, `ProductWindowAppChrome`,
`QuotaBadge`, and `SetupWelcomeMain`.

## Evidence Reviewed

| Component | Canonical source | Current rendered evidence |
| --- | --- | --- |
| ProductWindowAppChrome | `79_round-4.1S_app-shell_01_base-web-sem-conteudo.png` | `evidence/01-product-window-frame-before.png` |
| CrmPageFamilyShell | `23_round-4.1C_tarefas_01_lista-detalhe.png.png` plus Image 16/79 shell contract | `evidence/02-page-family-shell-before.png` |
| AgentPublishFlowCard | `59_round-4.1L_agentes_06_publicar-rotina-presenca-faltas-aprovado.png` | `evidence/03-agent-publish-flow-before.png` |
| QuotaBadge | `68_round-4.1O_uso_01_visao-geral-aprovado.png` | `evidence/04-quota-badge-before.png` |
| SetupWelcomeMain | `78_round-4.1Q_onboarding_bem-vindo-taliya-setup-guiado-aprovado.png` | `evidence/05-setup-welcome-main-before.png` |

The current screenshots were captured from the static Storybook at `1440x900`
on 2026-08-04 and inspected after capture. They are current-audit evidence, not
reused historical screenshots.

## Regional Diagnosis

### ProductWindowAppChrome

- Current anatomy: the app-frame variant renders the source-derived compact
  chrome with three marks, stable frame boundary, and no interactive semantics.
- Mismatch: no isolated story exposes this public frame part; it is visible only
  inside the multi-variant `ProductWindowFrame` story.
- Owner: `@taliya/crm`, Layout.
- Token decision: no token change. Existing frame tokens own the geometry.
- Smallest probe: add an isolated app-chrome story in the existing shell story
  file, with a bounded package-neutral preview surface and no anatomy CSS.

### CrmPageFamilyShell

- Current anatomy: the Worklist story proves shell, header, filters, quick rail,
  table, and page spacing are composed by the public family shell contract.
- Mismatch: every story exercises the component through a derived family page;
  the shell-level slots and placement contract have no isolated evidence.
- Owner: `@taliya/crm`, Layout.
- Token decision: no token change. The component intentionally adds no visual
  styling beyond `CrmProductShell`.
- Smallest probe: add one direct story with a simple package-owned `Panel` child,
  header, navigation state, and no local shell wrapper.

### AgentPublishFlowCard

- Current anatomy: all four cards in the publication page match the canonical
  two-column flow-card region and expose `Ver fluxo` and `Simular` actions.
- Mismatch: the card is visible only inside `AgentPublishRoutineWorkspace`, so
  its variants and callbacks cannot be inspected independently.
- Owner: `@taliya/crm`, Agents.
- Token decision: no token change. Existing agent publish tokens own the card.
- Smallest probe: add an isolated story with source content and an interaction
  assertion for both actions; do not reproduce page anatomy.

### QuotaBadge

- Current anatomy: the green `Normal` badge in the usage overview follows the
  source status grammar and is already composed in `QuotaProgress`.
- Mismatch: threshold labels and tones are not independently visible or
  interactively inspectable.
- Owner: `@taliya/crm`, Status.
- Token decision: no token change. Existing semantic status tokens apply.
- Smallest probe: add one isolated story presenting normal, warning, danger, and
  blocked states using the component API only.

### SetupWelcomeMain

- Current anatomy: the welcome page uses the official main column and is close
  to the Image 78 source in hierarchy, spacing, input, and primary action.
- Mismatch: the structural wrapper has no direct story; only
  `SetupWelcomeWorkspace`/full-page coverage proves it indirectly.
- Owner: `@taliya/crm`, Setup.
- Token decision: no token change. The existing setup welcome tokens own the
  region.
- Smallest probe: add an isolated structural story containing `SetupWelcome`,
  preserving real input/start callbacks and adding no docs-local anatomy.

## Decision

Proceed with story-only probes. Do not modify tokens, CRM CSS, component markup,
or source dimensions in this batch. Each new story must use existing public
components, expose real callbacks where applicable, and pass Storybook anatomy,
typecheck, tests, and a fresh static render review before the finding can close.

## Outcome

Result: pass for isolated-story coverage; no 1:1 component certification is
claimed by this batch.

| Component | Static evidence | Behavior evidence | Result |
| --- | --- | --- | --- |
| ProductWindowAppChrome | `evidence/06-product-window-app-chrome-after.png` | non-interactive/aria-hidden by contract | Pass |
| CrmPageFamilyShell | `evidence/07-page-family-shell-after.png` | accessible shell landmarks and selected navigation rendered | Pass |
| AgentPublishFlowCard | `evidence/08-agent-publish-flow-card-after.png` | Storybook play asserted `view` and `simulate` callbacks | Pass |
| QuotaBadge | `evidence/09-quota-badge-after.png` | visual-only; separate 70/90/100 stories built | Pass |
| SetupWelcomeMain | `evidence/10-setup-welcome-main-after.png` | Storybook play asserted empty-name validation, controlled typing, and start callback | Pass |

Verification passed: docs typecheck, docs smoke tests (5/5), strict Storybook
anatomy audit (zero debt selectors), and static Storybook build. The four public
names still lacking story references are compatibility-only aliases:
`CrmShellRoundButton`, `CrmShellTopNavItem`, `GlobalActions`, and
`LegacyComposer`. They are intentionally excluded from canonical Storybook
navigation.
