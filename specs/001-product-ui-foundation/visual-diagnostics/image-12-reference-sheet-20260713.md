# Image 12 reference-sheet diagnostic

Date: 2026-07-13; final static review: 2026-07-14

Source: `12_round-3b5_sistema-plano-governanca_aprovada.png` (1672x941)

Certification mode: `component-reference-sheet-review`

Status: `Aprovado`

## Scope decision

Image 12 is a composite inventory of plan, quota, governance, integration, billing, audit and settings contracts. Certification reviews each numbered region through official isolated owners. The full board must not be cloned in docs-local markup.

The prior coverage map named only six owners and incorrectly reused later, larger product components for compact reference contracts. `PlanSummaryCard` belongs to Images 65/74/77, `QuotaProgress` belongs to Image 68, `PermissionMatrix` belongs to Image 61, `AuditTrail` is primarily the Image 15 seven-column panel, and generic `StatusCard` does not own the Image 12 zero-agent hero. Those entries are not valid Image 12 evidence.

The corrected scope contains eleven visible UI contracts plus the token foundation: `PlanAgentsPanel`, `ProgressBar` applied to `Card` for quota and usage examples, `FallbackControlCard`, `PermissionState`, `IntegrationFailedState`, `BillingGovernancePanel`, `GovernanceAuditPanel`, `GuardrailPolicyPanel`, `GeneralSettingsPanel`, `StatusSummaryCard`, and `@taliya/tokens` foundation evidence.

Static pre-promotion and final review captures are stored in `tmp/reference-sheet-12-20260713`. Final accepted evidence uses the `final3-` captures except for billing, whose post-overflow-fix evidence is `final4-crm-billing-billinggovernancepanel--source.png`.

## Regional diagnostic

| Region | Source contract | Current evidence | Result | Required official owner |
| --- | --- | --- | --- | --- |
| 1 | Three-card plan and agent summary | `PlanAgentsPanel` owns the two plan cards, pictograms, status chips, actions and capacity ring | Pass | `final3-crm-config-planagentspanel--source.png` |
| 2 | Four compact quota cards | Official `Card pattern="quota"` and `ProgressBar` own the visible quota anatomy; unrelated `QuotaProgress` was removed from the map | Pass | `primitives-ui-progressbar--all-states.png` plus official card application |
| 3 | Two compact usage progress examples | Official `Card pattern="quota"` and `ProgressBar` reproduce both examples | Pass | `primitives-ui-progressbar--all-states.png` plus official card application |
| 4 | Manual fallback icon, status, description and toggle | `FallbackControlCard` exposes prepared state and controlled/uncontrolled `onEnabledChange` behavior | Pass | `final3-crm-config-fallbackcontrolcard--source.png` |
| 5 | Four-column permission table and footer action | `PermissionState` remains the exact compact CRM owner; `PermissionTable` remains its reusable primitive | Pass | `crm-advanced-states-permissionstate--all-states.png` |
| 6 | Stripe/Twilio integration rows with status, helper and actions | `IntegrationFailedState` remains the exact compact CRM owner with retry/fallback/support actions | Pass | `crm-advanced-states-integrationfailedstate--all-states.png` |
| 7 | Payment method, next charge and last invoice cards | `BillingGovernancePanel` owns prepared payment/charge/invoice data and action callbacks; final static recapture confirms the payment action no longer overflows | Pass | `final4-crm-billing-billinggovernancepanel--source.png` |
| 8 | Five-row compact system audit table | `GovernanceAuditPanel` owns the dedicated five-column governance schema without changing Image 15 `AuditTrail` | Pass | `final3-crm-timeline-governanceauditpanel--source.png` |
| 9 | Four guardrail rows with semantic icons, descriptions and toggles | `GuardrailPolicyPanel` composes official `RuleRow` controls and exposes prepared policies/callbacks | Pass | `final3-crm-config-guardrailpolicypanel--source.png` |
| 10 | Five general configuration controls and footer action | `GeneralSettingsPanel` composes official `Input`, `Select` and `Toggle` controls with prepared values/callbacks | Pass | `final3-crm-config-generalsettingspanel--source.png` |
| 11 | Zero-agent CRM hero | Additive `StatusSummaryCard` hero layout reproduces the source while preserving compact/default variants | Pass | `final3-primitives-ui-statussummarycard--all-states.png` |
| 12 | Color, radius, shadow and typography tokens | Foundation tokens and isolated token stories own color, radius, elevation and type evidence | Pass | `@taliya/tokens` token stories and successful token-governance check |

## Completed dependency order

1. The existing primitive set was sufficient; the governance schema remains an official CRM composition and did not require a false generic-table extension.
2. Six missing domain panels were promoted to `@taliya/crm` with prepared data and callbacks only.
3. Six isolated source stories were added using official components; the docs layer contains capture positioning only.
4. `StatusSummaryCard` received an additive hero layout without regressing default cards.
5. All owners were statically captured and compared; focused tests, package typechecks, token governance and static Storybook build pass.
6. Coverage and source maps now identify the real owners and no longer treat the five false-positive components as Image 12 evidence.

## Component acceptance matrix

| Contract | Story isolated | Reusable architecture | Variants/states | Real behavior | Screenshot compared | 1:1 visual | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `PlanAgentsPanel` | Pass | Pass | Pass | Pass | Pass | Pass | Aprovado |
| `Card` + `ProgressBar` | Pass | Pass | Pass | Pass | Pass | Pass | Aprovado |
| `FallbackControlCard` | Pass | Pass | Pass | Pass | Pass | Pass | Aprovado |
| `PermissionState` | Pass | Pass | Pass | Pass | Pass | Pass | Aprovado |
| `IntegrationFailedState` | Pass | Pass | Pass | Pass | Pass | Pass | Aprovado |
| `BillingGovernancePanel` | Pass | Pass | Pass | Pass | Pass | Pass | Aprovado |
| `GovernanceAuditPanel` | Pass | Pass | Pass | Pass | Pass | Pass | Aprovado |
| `GuardrailPolicyPanel` | Pass | Pass | Pass | Pass | Pass | Pass | Aprovado |
| `GeneralSettingsPanel` | Pass | Pass | Pass | Pass | Pass | Pass | Aprovado |
| `StatusSummaryCard` hero | Pass | Pass | Pass | Pass | Pass | Pass | Aprovado |
| Design and typography tokens | Pass | Pass | Pass | N/A | Pass | Pass | Aprovado |

## Current verdict

`Pass at component-reference-sheet scope.` All eleven visible UI contracts and the token foundation resolve to source-aligned official owners, isolated stories and static captures. The corrected map replaces five false-positive owners and the six formerly missing domain contracts now belong to `@taliya/crm`. Whole-board pixel parity remains N/A by the approved scope decision, and docs-local board reconstruction remains forbidden.
