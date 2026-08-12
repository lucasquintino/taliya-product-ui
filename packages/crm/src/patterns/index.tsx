/** Modular inbox, drawer, agent, and operational pattern facade. */
export * from "./conversation-list.js";
export * from "./conversation-thread.js";
export * from "./composer-and-handoff.js";
export * from "./checklist-comments.js";
export {
  CrmDrawer
} from "./drawer-core.js";
export type {
  TaskDrawerState,
  TaskDrawerActivityOrder,
  TaskDrawerActivityDensity,
  TaskDrawerFact,
  TaskDrawerChecklistItem,
  TaskDrawerComment,
  TaskDrawerHistoryItem,
  TaskDrawerProps,
  CrmDrawerHeaderOrder,
  CrmDrawerFooterLayout,
  CrmDrawerFact,
  CrmDrawerSection,
  CrmDrawerAction,
  CrmDrawerProps
} from "./drawer-core.js";
export { TaskDrawer } from "./task-drawer.js";
export * from "./checklist-drawer.js";
export type {
  CaseDrawerState,
  CaseDrawerAction,
  CaseDrawerFact,
  CaseDrawerAlternative,
  CaseDrawerHistoryItem,
  CaseDrawerRestrictionItem,
  CaseDrawerFooterAction,
  CaseDrawerSectionKind,
  CaseDrawerSectionItem,
  CaseDrawerSection,
  CaseDrawerProps
} from "./case-drawer-core.js";
export { CaseDrawer } from "./case-drawer.js";
export * from "./student-drawer.js";
export * from "./class-drawer.js";
export * from "./payment-drawer.js";
export * from "./replacement-drawer.js";
export * from "./lead-drawer.js";
export * from "./agent-flow-drawer.js";
export * from "./usage-drawer.js";
export * from "./support-drawer.js";
export * from "./tenant-drawer.js";
export * from "./weekly-hours-grid.js";
export * from "./roles-and-invites.js";
export * from "./payment-usage-export.js";
export {
  DomainActions,
  AgentCard
} from "./domain-actions.js";
export type { CrmDomainAction, CrmDomainMetric, AgentCardData, AgentCardProps } from "./domain-actions.js";
export * from "./agent-catalog.js";
export * from "./agent-routine-workspace.js";
export * from "./agent-flow-workspace.js";
export * from "./agent-publish-flow.js";
export * from "./agent-simulation.js";

