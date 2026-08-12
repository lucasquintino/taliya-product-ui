/** Modular CRM shell, page-family, and reusable layout facade. */
export {
  defaultSidebarItems,
  defaultSetupSteps,
  crmEmptyShellNavItems,
  crmOperationalNavItems,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems,
  crmBrowserToolbarItems,
  crmAccessShellBrowserToolbarItems,
  Sidebar,
  SidebarItem
} from "./shell-foundation.js";
export type {
  SidebarItemData,
  CrmShellNavItem,
  CrmShellSidebarItem,
  CrmBrowserToolbarItem,
  CrmSurfaceProps,
  SidebarItemProps
} from "./shell-foundation.js";

export {
  Topbar,
  GlobalActions,
  PageHeader,
  CrmBrowserTrafficLights,
  CrmBrowserToolbarButton,
  CrmBrowserToolbar,
  CrmBrowserAddressBar,
  CrmBrowserChrome,
  CrmShellBrand,
  CrmShellRoundButton,
  CrmSidebarFloatingButton,
  CrmTopbarActionButton,
  CrmSidebarNavigation,
  CrmSidebarUtilityNavigation
} from "./shell-chrome-a.js";
export type { CrmBrowserToolbarButtonProps, CrmShellIconButtonProps } from "./shell-chrome-a.js";

export {
  CrmShellSidebar,
  CrmShellBackButton,
  CrmTopbarNavChip,
  CrmShellTopNavItem,
  CrmShellTopNav,
  CrmShellAvatar,
  CrmShellGlobalActions
} from "./shell-chrome-b.js";
export type { CrmTopbarNavChipProps, CrmShellGlobalActionsCallbacks } from "./shell-chrome-b.js";

export {
  CrmEmptyShellTopbar,
  CrmEmptyShellPageHeader,
  CrmEmptyShellCanvas,
  CrmEmptyShellWindow,
  CrmEmptyShell
} from "./shell-empty.js";
export type { CrmEmptyShellState } from "./shell-empty.js";

export { CrmProductShell } from "./shell-product.js";
export type {
  CrmProductShellVariant,
  CrmProductShellFrame,
  CrmProductShellPageHeaderRhythm,
  CrmProductShellContentLayout,
  CrmProductShellRegions,
  CrmProductShellBrand,
  CrmProductShellProps
} from "./shell-product.js";

export {
  JourneyShellCanvas,
  CrmOperationalPanel,
  CrmOperationalRow,
  CrmOperationalRows,
  QuotaBadge,
  MetricCard,
  StatusCard,
  AgentStatus,
  AgentPanel
} from "./shell-operational-a.js";
export type {
  JourneyShellAction,
  JourneyShellCanvasProps,
  CrmOperationalRowKind,
  CrmOperationalRowData,
  CrmOperationalPanelProps,
  CrmOperationalRowProps,
  CrmOperationalRowsProps
} from "./shell-operational-a.js";

export { SettingsAgentPanel, CopilotSuggestion, CopilotPanel } from "./shell-operational-b.js";
export type {
  SettingsAgentPanelInsight,
  SettingsAgentPanelReview,
  SettingsAgentPanelProps,
  CopilotSuggestionProps,
  CopilotPanelState,
  CopilotPanelCopyTarget,
  CopilotPanelProps
} from "./shell-operational-b.js";

export {
  ProductWindowFrame,
  ProductWindowAppChrome,
  ListDetailLayout,
  WorkListDetailPage,
  ThreePaneLayout,
  ContextPanel
} from "./shell-layout-a.js";
export type {
  WorkListDetailPageState,
  WorkListDetailPageLayoutMode,
  WorkListDetailPageHeightMode,
  WorkListDetailPageFilterRhythm,
  WorkListDetailPageProps,
  ThreePaneLayoutActivePane,
  ContextPanelSection,
  ContextPanelFact,
  ContextPanelHistoryItem,
  ContextPanelTaskItem,
  ContextPanelProps
} from "./shell-layout-a.js";

export { ConversationDrawer, RightPanelLayout, DashboardGrid, ProfileTabs } from "./shell-layout-b.js";
export type { ConversationDrawerProps } from "./shell-layout-b.js";

export { ActivityFeed } from "./shell-activity-feed.js";
export type { ActivityFeedTone, ActivityFeedItem, ActivityFeedPanelTab } from "./shell-activity-feed.js";

export { OperationActivityTable } from "./shell-operation-activity.js";
export type {
  OperationActivityTableState,
  OperationActivityTableStatus,
  OperationActivityTableRow,
  OperationActivityTableProps
} from "./shell-operation-activity.js";

export { AuditTrail } from "./shell-audit-trail.js";
export type { AuditTrailState, AuditTrailProps } from "./shell-audit-trail.js";

export { KanbanBoard, KanbanColumn, KanbanCard } from "./shell-kanban.js";
export type { KanbanCardData, KanbanCardTag, KanbanBoardProps, KanbanColumnProps } from "./shell-kanban.js";

export {
  CrmPageFamilyShell,
  CrmWorklistPage,
  CrmKanbanPage,
  CrmDashboardPage,
  CrmThreePanePage,
  CrmRightPanelPage
} from "./shell-page-family.js";

export type {
  CrmPageFamilyShellProps,
  CrmWorklistPageProps,
  CrmKanbanPageProps,
  CrmDashboardPageProps,
  CrmThreePanePageProps,
  CrmRightPanelPageProps
} from "./shell-page-family.js";
