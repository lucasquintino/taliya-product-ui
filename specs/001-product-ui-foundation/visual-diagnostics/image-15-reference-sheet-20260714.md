# Image 15 reference-sheet diagnostic

Date: 2026-07-14

Source: `15_round-3c3_agentes-auditoria-relatorios_aprovada.png` (1672x941)

Certification mode: `component-reference-sheet-review`

Status: `Aprovado`

## Scope decision

Image 15 is a composite inventory with fourteen numbered contracts across agent-flow authoring, governance, privacy and reporting. Certification must review each region through an isolated official owner. The complete board must not be reconstructed in docs-local markup.

The initial coverage map named seven components for fourteen regions. The corrected implementation now assigns one official owner to every visible contract. `FlowBuilder` and `ModeSelector` use additive reference variants, `BeforeAfterDiff` and `AuditTrail` retain their established contracts, and ten dedicated compact owners cover simulation, publication, trace, incident, quality, privacy, support and reports without changing later full-page components.

Static baseline captures are stored in `tmp/reference-sheet-15-20260714/baseline`. Final exact-size approval evidence is stored in `tmp/reference-sheet-15-20260714/final-static`.

## Source measurements

| Region | Approximate source bounds | Contract |
| --- | --- | --- |
| 1 | x24-934, y75-301 (910x226) | Horizontal flow builder with five nodes, branch percentages and connectors |
| 2 | x943-1225, y75-301 (282x226) | Five-row flow-mode selector with selected, recommended, advanced and blocked states |
| 3 | x1233-1647, y75-301 (414x226) | Compact flow simulator with input, expected result, three facts and approval action |
| 4 | x24-367, y310-524 (343x214) | Publication preflight checklist with five checks and publish/draft actions |
| 5 | x376-874, y310-524 (498x214) | Six-row execution trace table with tool, status, duration, cost and error |
| 6 | x883-1215, y310-524 (332x214) | Agent incident summary with cause, impact, object, fallback and recovery actions |
| 7 | x1224-1647, y310-524 (423x214) | Six-metric quality/evals panel with deltas and report action |
| 8 | x24-367, y533-714 (343x181) | Before/after settings diff with actor, origin and decision actions |
| 9 | x376-874, y533-714 (498x181) | Five-row detailed audit table with object-open actions |
| 10 | x883-1368, y533-714 (485x181) | Four-row privacy/LGPD request table with governance actions and statuses |
| 11 | x1377-1647, y533-714 (270x181) | Temporary support grant form with expiry, scope, reason and revoke action |
| 12 | x24-830, y722-916 (806x194) | Advanced reports strip with line, bar, funnel, ranking and heatmap charts |
| 13 | x839-1245, y722-916 (406x194) | Four-row export queue with format, schedule, status, progress and actions |
| 14 | x1254-1647, y722-916 (393x194) | Segment/communication panel with audience, consent, preview, cost, channels and send actions |

## Regional diagnostic

| Region | Final static evidence | Result | Official owner |
| --- | --- | --- | --- |
| 1 | `final-static/flow.png` (910x226) | Pass | `FlowBuilder variant="reference"` owns all five nodes and connectors. |
| 2 | `final-static/mode.png` (282x226) | Pass | `ModeSelector variant="reference"` owns five complete rows and selected/locked states. |
| 3 | `final-static/simulator.png` (414x226) | Pass | `FlowSimulationPanel`. |
| 4 | `final-static/preflight.png` (343x214) | Pass | `PublicationPreflightPanel`. |
| 5 | `final-static/trace.png` (498x214) | Pass | `ExecutionTraceTable`. |
| 6 | `final-static/incident.png` (332x214) | Pass | `AgentIncidentPanel`. |
| 7 | `final-static/quality.png` (423x214) | Pass | `EvaluationQualityPanel`. |
| 8 | `final-static/diff.png` (346x188) | Pass | `BeforeAfterDiff`. |
| 9 | `final-static/audit.png` (502x184) | Pass | `AuditTrail`. |
| 10 | `final-static/privacy.png` (485x181) | Pass | `PrivacyRequestTable`. |
| 11 | `final-static/grant.png` (270x181) | Pass | `SupportGrantPanel`. |
| 12 | `final-static/reports.png` (806x194) | Pass | `AdvancedReportsPanel`. |
| 13 | `final-static/exports.png` (406x194) | Pass | `ExportQueuePanel`. |
| 14 | `final-static/segment.png` (393x194) | Pass | `SegmentCommunicationPanel`. |

## Implemented path

1. Added explicit Image 15 reference variants to `FlowBuilder` and `ModeSelector`, preserving later certified defaults.
2. Promoted ten dedicated CRM owners: `FlowSimulationPanel`, `PublicationPreflightPanel`, `ExecutionTraceTable`, `AgentIncidentPanel`, `EvaluationQualityPanel`, `PrivacyRequestTable`, `SupportGrantPanel`, `AdvancedReportsPanel`, `ExportQueuePanel` and `SegmentCommunicationPanel`.
3. Retained `BeforeAfterDiff` and `AuditTrail` and added anatomy-free isolated source stories.
4. Removed `SimulationRunner`, `ChartPanel` and `ReportFilterBar` from Image 15 ownership; their later-page contracts remain unchanged.
5. Added focused behavior coverage, rebuilt static Storybook and captured all fourteen regions at their accepted source-contract dimensions.

## Current verdict

`Pass at component-reference-sheet scope.` All fourteen visible contracts resolve to official `@taliya/crm` owners, source stories contain no local anatomy, exact-size static evidence has no clipping or incoherent overlap, and later-page defaults remain separate.
