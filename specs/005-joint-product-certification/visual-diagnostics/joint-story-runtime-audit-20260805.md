# Joint Story Runtime Audit

Generated: 2026-08-05T21:53:20.220Z

This is a DOM smoke audit of the static Storybook. It is evidence for initial render health, horizontal containment, and accessible names on visible interactive controls. It is not a WCAG conformance audit, keyboard journey approval, visual 1:1 approval, or product-owner approval.

## Coverage

- Stories: 635
- Viewports: desktop 1440x900 and mobile 390x844
- Storybook: http://127.0.0.1:6224
- Render errors: 0
- Unnamed visible interactive controls: 0
- Stories with horizontal overflow: 85
- Overflow checks: 87
- Overall smoke status: fail

## Accessibility smoke

The current rebuilt Storybook has zero visible interactive controls without an accessible name in the audited DOM states. The scan checks buttons, links, inputs, textareas, selects, and common ARIA interactive roles. It does not check contrast, focus order, keyboard traps, announcements, or every dynamic state.

## Responsive findings

- crm-documents-uploadreceiptpanel--source (CRM / Documents / UploadReceiptPanel): maximum document overflow of 697px.
- crm-agents-agentflowsectionpanel--all-states (CRM / Agents / AgentFlowSectionPanel): maximum document overflow of 622px.
- crm-config-settingschannelsworkspace--connected (CRM / Config / SettingsChannelsWorkspace): maximum document overflow of 585px.
- crm-config-settingschannelsworkspace--pending-connection (CRM / Config / SettingsChannelsWorkspace): maximum document overflow of 585px.
- crm-config-settingschannelsworkspace--disconnected (CRM / Config / SettingsChannelsWorkspace): maximum document overflow of 585px.
- crm-config-settingschannelsworkspace--saving (CRM / Config / SettingsChannelsWorkspace): maximum document overflow of 585px.
- crm-config-settingschannelsworkspace--validation-error (CRM / Config / SettingsChannelsWorkspace): maximum document overflow of 585px.
- crm-config-settingschannelsworkspace--blocked-permission (CRM / Config / SettingsChannelsWorkspace): maximum document overflow of 585px.
- crm-config-settingschannelsworkspace--system-error (CRM / Config / SettingsChannelsWorkspace): maximum document overflow of 585px.
- crm-config-settingsplansworkspace--published (CRM / Config / SettingsPlansWorkspace): maximum document overflow of 585px.
- crm-config-settingsplansworkspace--draft-and-review (CRM / Config / SettingsPlansWorkspace): maximum document overflow of 585px.
- crm-config-settingsplansworkspace--plan-in-use-cannot-delete (CRM / Config / SettingsPlansWorkspace): maximum document overflow of 585px.
- crm-config-settingsplansworkspace--validation-error (CRM / Config / SettingsPlansWorkspace): maximum document overflow of 585px.
- crm-config-settingsplansworkspace--blocked-permission (CRM / Config / SettingsPlansWorkspace): maximum document overflow of 585px.
- crm-config-settingsplansworkspace--system-error (CRM / Config / SettingsPlansWorkspace): maximum document overflow of 585px.
- crm-config-settingsstudioworkspace--published (CRM / Config / SettingsStudioWorkspace): maximum document overflow of 585px.
- crm-config-settingsstudioworkspace--validation-error (CRM / Config / SettingsStudioWorkspace): maximum document overflow of 585px.
- crm-config-settingsstudioworkspace--blocked-permission (CRM / Config / SettingsStudioWorkspace): maximum document overflow of 585px.
- crm-config-settingsstudioworkspace--system-error (CRM / Config / SettingsStudioWorkspace): maximum document overflow of 585px.
- crm-config-settingsteamworkspace--published (CRM / Config / SettingsTeamWorkspace): maximum document overflow of 585px.
- crm-config-settingsteamworkspace--blocked-last-admin (CRM / Config / SettingsTeamWorkspace): maximum document overflow of 585px.
- crm-config-settingsteamworkspace--role-change-confirmation (CRM / Config / SettingsTeamWorkspace): maximum document overflow of 585px.
- crm-config-settingsteamworkspace--owner-transfer-pending (CRM / Config / SettingsTeamWorkspace): maximum document overflow of 585px.
- crm-config-settingsteamworkspace--blocked-permission (CRM / Config / SettingsTeamWorkspace): maximum document overflow of 585px.
- crm-config-settingsteamworkspace--validation-error (CRM / Config / SettingsTeamWorkspace): maximum document overflow of 585px.

The complete list and both viewport metrics remain in the JSON report. These overflows are not automatically classified as defects: source-sized reference components may intentionally preserve a wide canvas, while page-family components must be corrected or explicitly documented by their official responsive contract.

## Next action

Classify the 85 affected stories by structural family, fix only official package contracts where the overflow is not intentional, then rerun this audit. Keep the component accessibility dimension pending until keyboard and dynamic-state evidence is recorded.
