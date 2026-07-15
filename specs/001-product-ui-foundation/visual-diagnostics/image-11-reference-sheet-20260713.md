# Image 11 reference-sheet diagnostic

Date: 2026-07-13

Source: `11_round-3b4_comunicacao-agentes_aprovada.png` (1672x941)

Certification mode: `component-reference-sheet-review`

Status: `Aprovado`

## Scope decision

Image 11 is a composite inventory of communication, WhatsApp, copilot and agent states. Certification reviews each numbered region through official isolated owners. The full board must not be cloned in docs-local markup.

The prior map covered only seven components and omitted visible contracts for queue/channel status, autonomous/failed execution, human handoff and confidence. The corrected map contains eleven official owners: `ConversationList`, `ConversationThread`, `MessageBubble`, `ComposerPanel`, `ChannelStatusPanel`, `CopilotPanel`, `CopilotSuggestion`, `ApprovalPanel`, `ExecutionReceipt`, `HandoffBanner` and `ConfidenceMeter`.

Static review captures are stored in `tmp/reference-sheet-11-20260713` on source-specific centered canvases.

## Regional diagnostic

- `ConversationList` exposes an official `compact` layout that reproduces region 1 with search/filter control, counted channel tabs, six divided rows, unread counts and compact pagination while preserving the later Image 24 default.
- `ConversationThread` exposes an official `compact` layout that reproduces region 2 with the Ana Paula header, WhatsApp/status controls, directional and internal messages, date divider, suggestion and composer while preserving the later Image 24 default.
- `MessageBubble` reproduces Image 11 inbound, outbound/read, internal-note, agent-suggestion, failed and pending states directly.
- `ComposerPanel` reproduces region 4 through an official composition of `Composer` and a two-column labeled action catalog. The source and disabled states are isolated without docs-local anatomy.
- `ChannelStatusPanel` reproduces region 3 through an official composition of four queue counters and three semantic WhatsApp status controls over `Button` and `StatusDot`.
- `CopilotPanel` reproduces region 5 through three official source-aligned sections: conversation summary, next best action and prepared agent suggestion with copy/create/insert commands. Its static source capture exposes no technical-state chip and contains no docs-local anatomy.
- `CopilotSuggestion` owns the reusable inner suggestion grammar used by `CopilotPanel`; its state chip remains available by default for isolated lifecycle stories and can be explicitly suppressed by official compositions whose source omits it.
- `ApprovalPanel` exposes an additive official `compact` layout that reproduces region 6 with proposed action, WhatsApp channel, schedule and approve/edit/reject commands while preserving the Image 25 detailed layout as its default.
- `ExecutionReceipt` exposes an additive official `compact` layout that reproduces regions 7 and 8 from the existing success/failed states while preserving the Image 70 execution page as its default.
- `HandoffBanner` exposes an additive official `compact` layout that reproduces region 9 with transfer description, owner avatar/name, timestamp and human-attendance status while preserving the Image 24 inline banner as its default.
- `ConfidenceMeter` reproduces region 10 directly, including the 86% high-confidence card and alternate confidence states.

### Region 6 implementation diagnostic

- Source crop: `tmp/reference-sheet-11-20260713/source-region-6-approval.png`; the inner approval card measures approximately 205x212 within the numbered reference region.
- Exact mismatch: the current default `ApprovalPanel` is the certified 360x940 Image 25 decision drawer with eyebrow, close control, seven facts, four detailed sections, history, comment and multi-row footer. None of that additional anatomy appears in Image 11 region 6.
- Required anatomy: fingerprint/action icon plus `Ação proposta pelo agente`, one short proposal, `Canal` with WhatsApp marker, `Programado para`, and `Aprovar` / `Editar` / `Rejeitar` actions in one row.
- Owner: `@taliya/crm` `ApprovalPanel`; the later detailed approval contract remains the default and receives an additive `compact` layout.
- Token decision: compact width, height, padding, radius, header columns, fact columns and action geometry are domain tokens under `crm-approval-panel.compact-*`; semantic colors continue to alias the existing approval/WhatsApp/action tokens.
- Smallest probe hypothesis: one conditional compact renderer inside `ApprovalPanel`, composed only from `Card`, `Icon` and `Button`, should reproduce the source without changing the detailed Image 25 layout or introducing story-local anatomy.

### Regions 7 and 8 implementation diagnostic

- Source crops: `tmp/reference-sheet-11-20260713/source-region-7-execution-success.png` and `source-region-8-execution-failure.png`; each inner receipt card measures approximately 190x198.
- Exact mismatch: the current `ExecutionReceipt` is the full Image 70 execution-page owner with summary, event timeline, rationale, continuation panels and footer actions. Regions 7 and 8 contain only compact terminal receipts.
- Shared anatomy: semantic icon/title, short outcome description, two key/value facts and a terminal status chip. Success uses WhatsApp channel plus execution time; failure uses reason plus attempt time.
- Owner: `@taliya/crm` `ExecutionReceipt`; Image 70 remains the default detailed layout and receives an additive `compact` layout driven by the existing success/failed state.
- Token decision: compact width, height, padding, radius, header columns, fact columns and status rhythm are domain tokens under `crm-execution-receipt.compact-*`; status and WhatsApp colors reuse existing semantic tokens.
- Smallest probe hypothesis: a conditional compact `Card` renderer inside `ExecutionReceipt` can cover both regions through prepared props and state without changing the detailed page contract or introducing separate success/failure components.

### Region 9 implementation diagnostic

- Source crop: `tmp/reference-sheet-11-20260713/source-region-9-handoff.png`; the inner handoff card measures approximately 195x210.
- Exact mismatch: the current `HandoffBanner` is the certified 502x32 Image 24 inline lifecycle banner. Region 9 is a vertical ownership card and requires metadata absent from that banner.
- Required anatomy: transfer icon/title, short handoff description, owner avatar/name, transfer timestamp and `Em atendimento humano` status chip.
- Owner: `@taliya/crm` `HandoffBanner`; the Image 24 banner remains the default and receives an additive `compact` layout with prepared owner/transfer props.
- Token decision: compact width, height, padding, radius, header columns, owner columns and text/status rhythm are domain tokens under `crm-handoff-banner.compact-*`; card, info and status colors reuse semantic tokens.
- Smallest probe hypothesis: a conditional compact `Card` renderer inside `HandoffBanner` can add the ownership contract without changing the existing banner behavior or introducing a second handoff component.

## Component review

| Source contract | Official story | Contract | Isolated story | Reusable owner | Source-aligned states | Static review | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ConversationList | `crm-inbox-conversationlist--source-compact` | Pass | Pass | `@taliya/crm` | Pass: official compact search, counted tabs, six divided rows and pagination | `conversation-list-compact.png`: Pass | Pass |
| ConversationThread | `crm-inbox-conversationthread--source-compact` | Pass | Pass | `@taliya/crm` | Pass: compact channel/status header, inbound/outbound/internal messages, suggestion and composer | `conversation-thread-compact.png`: Pass | Pass |
| MessageBubble | `primitives-ui-messagebubble--all-states` | Pass | Pass | `@taliya/ui` | Pass: six Image 11 message states | Pass | Pass |
| ComposerPanel | `crm-inbox-composerpanel--source` | Pass | Pass | `@taliya/crm` | Pass: official composer plus complete five-action catalog | `composer-panel.png`: Pass | Pass |
| ChannelStatusPanel | `crm-inbox-channelstatuspanel--source` | Pass | Pass | `@taliya/crm` | Pass: four queue counters and connected/pending/failure rows | `channel-status-panel.png`: Pass | Pass |
| CopilotPanel | `crm-agent-copilotpanel--source` | Pass | Pass | `@taliya/crm` | Pass: summary, next action and prepared suggestion with consumer-controlled commands | `copilot-panel.png`: Pass | Pass |
| CopilotSuggestion | `crm-agent-copilotsuggestion--all-states` | Pass | Pass | `@taliya/crm` | Pass: reusable inner suggestion grammar certified inside the official `CopilotPanel`; isolated lifecycle states preserved | `copilot-panel.png`: Pass | Pass |
| ApprovalPanel | `crm-approvals-approvalpanel--source-compact` | Pass | Pass | `@taliya/crm` | Pass: exact compact proposal, channel, schedule and three consumer-controlled decisions; detailed default preserved | `approval-panel-compact.png`: Pass | Pass |
| ExecutionReceipt | `crm-agents-executionreceipt--source-compact` | Pass | Pass | `@taliya/crm` | Pass: aligned success/failure terminal cards with semantic facts and status; detailed default preserved | `execution-receipt-compact.png`: Pass | Pass |
| HandoffBanner | `crm-inbox-handoffbanner--source-compact` | Pass | Pass | `@taliya/crm` | Pass: compact transfer, owner, timestamp and status contract; Image 24 banner default preserved | `handoff-banner-compact.png`: Pass | Pass |
| ConfidenceMeter | `primitives-ui-confidencemeter--all-states` | Pass after map correction | Pass | `@taliya/ui` | Pass: exact high/medium/low/unknown confidence states | Pass | Pass |

## Required promotions

None. All eleven visible contracts resolve to isolated official owners and pass static source review.

## Verdict

`Pass: component reference-sheet review approved.` Eleven of eleven visible contracts pass through isolated official owners, source-aligned variants, focused behavior tests and static Storybook evidence. This certifies the component-reference-sheet scope; it does not introduce or require a docs-local clone of the full board.
