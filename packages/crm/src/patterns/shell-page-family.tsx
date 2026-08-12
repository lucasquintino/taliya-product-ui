/** Page-family shells that compose the product shell and reusable layouts. */
import React from "react";
import { cn } from "@taliya/ui";
import { CrmProductShell } from "./shell-product.js";
import type { CrmProductShellProps, CrmProductShellContentLayout } from "./shell-product.js";
import type { CrmShellNavItem, CrmShellSidebarItem } from "./shell-foundation.js";
import {
  DashboardGrid,
  RightPanelLayout,
  
} from "./shell-layout-b.js";
import { ThreePaneLayout, WorkListDetailPage } from "./shell-layout-a.js";
import type { ThreePaneLayoutActivePane } from "./shell-layout-a.js";
import type {
  WorkListDetailPageState,
  WorkListDetailPageFilterRhythm,
  WorkListDetailPageLayoutMode,
  WorkListDetailPageHeightMode
} from "./shell-layout-a.js";
import { KanbanBoard } from "./shell-kanban.js";
import type { KanbanBoardProps } from "./shell-kanban.js";

export interface CrmPageFamilyShellProps extends Omit<
  CrmProductShellProps,
  "children" | "contentLayout" | "navItems" | "onNavChange" | "onSidebarSelect" | "onSidebarUtilitySelect" | "sidebarItems" | "utilityItems"
> {
  children: React.ReactNode;
  activeNavId?: string;
  activeSidebarId?: string;
  activeUtilityId?: string;
  contentLayout?: CrmProductShellContentLayout;
  navItems?: CrmShellNavItem[];
  sidebarItems?: CrmShellSidebarItem[];
  stageClassName?: string;
  utilityItems?: CrmShellSidebarItem[];
  onNavChange?: (id: string) => void;
  onSidebarSelect?: (item: CrmShellSidebarItem) => void;
  onSidebarUtilitySelect?: (item: CrmShellSidebarItem) => void;
}

function activeItemId<T extends { id: string; active?: boolean }>(items: T[] | undefined, explicitId: string | undefined) {
  return explicitId ?? items?.find((item) => item.active)?.id ?? "";
}

function mapActiveItems<T extends { id: string; active?: boolean }>(items: T[] | undefined, activeId: string) {
  return items?.map((item) => ({ ...item, active: activeId ? item.id === activeId : item.active }));
}

export function CrmPageFamilyShell({
  activeNavId,
  activeSidebarId,
  activeUtilityId,
  children,
  className,
  contentClassName,
  contentLayout = "default",
  drawer,
  navItems,
  onNavChange,
  onSidebarSelect,
  onSidebarUtilitySelect,
  sidebarItems,
  stageClassName,
  utilityItems,
  ...props
}: CrmPageFamilyShellProps) {
  const [navId, setNavId] = React.useState(activeItemId(navItems, activeNavId));
  const [sidebarId, setSidebarId] = React.useState(activeItemId(sidebarItems, activeSidebarId));
  const [utilityId, setUtilityId] = React.useState(activeItemId(utilityItems, activeUtilityId));
  const shell = (
    <CrmProductShell
      {...props}
      className={cn("tcrm-page-family-shell", className)}
      contentClassName={cn("tcrm-page-family-content", contentClassName)}
      contentLayout={contentLayout}
      drawer={drawer}
      navItems={mapActiveItems(navItems, navId)}
      onNavChange={(id) => {
        setNavId(id);
        onNavChange?.(id);
      }}
      onSidebarSelect={(item) => {
        setSidebarId(item.id);
        setUtilityId("");
        onSidebarSelect?.(item);
      }}
      onSidebarUtilitySelect={(item) => {
        setSidebarId("");
        setUtilityId(item.id);
        onSidebarUtilitySelect?.(item);
      }}
      sidebarItems={mapActiveItems(sidebarItems, sidebarId)}
      utilityItems={mapActiveItems(utilityItems, utilityId)}
    >
      {children}
    </CrmProductShell>
  );

  return <div className={cn("tcrm-page-family-stage", stageClassName)}>{shell}</div>;
}

export interface CrmWorklistPageProps extends Omit<CrmPageFamilyShellProps, "children"> {
  after?: React.ReactNode;
  children: React.ReactNode;
  detail?: React.ReactNode;
  detailLabel?: string;
  detailState?: "closed" | "selected";
  filterBar: React.ReactNode;
  filterBarLabel?: string;
  listLabel?: string;
  mainLabel?: string;
  pageLabel?: string;
  quickFilters: React.ReactNode;
  state?: WorkListDetailPageState;
  worklistClassName?: string;
  worklistFilterRhythm?: WorkListDetailPageFilterRhythm;
  worklistLayoutMode?: WorkListDetailPageLayoutMode;
  worklistHeightMode?: WorkListDetailPageHeightMode;
}

export function CrmWorklistPage({
  after,
  children,
  contentLayout = "work-list",
  detail,
  detailLabel,
  detailState,
  filterBar,
  filterBarLabel,
  listLabel,
  mainLabel,
  pageLabel,
  quickFilters,
  state,
  worklistClassName,
  worklistFilterRhythm,
  worklistLayoutMode,
  worklistHeightMode,
  ...shellProps
}: CrmWorklistPageProps) {
  return (
    <CrmPageFamilyShell {...shellProps} contentLayout={contentLayout}>
      <WorkListDetailPage
        className={cn("tcrm-worklist-page-frame", worklistClassName)}
        detail={detail}
        detailLabel={detailLabel}
        detailState={detailState}
        filterBar={filterBar}
        filterBarLabel={filterBarLabel}
        filterRhythm={worklistFilterRhythm}
        after={after}
        layoutMode={worklistLayoutMode}
        heightMode={worklistHeightMode}
        listLabel={listLabel}
        mainLabel={mainLabel}
        pageLabel={pageLabel}
        quickFilters={quickFilters}
        state={state}
      >
        {children}
      </WorkListDetailPage>
    </CrmPageFamilyShell>
  );
}

export interface CrmKanbanPageProps extends Omit<CrmPageFamilyShellProps, "children" | "contentLayout"> {
  after?: React.ReactNode;
  children: React.ReactNode;
  filterBar?: React.ReactNode;
  kanbanDensity?: KanbanBoardProps["density"];
  kanbanClassName?: string;
  laneSurface?: KanbanBoardProps["laneSurface"];
  laneWidth?: KanbanBoardProps["laneWidth"];
  layoutVariant?: "default" | "finance" | "commercial";
  quickFilters?: React.ReactNode;
  railDensity?: KanbanBoardProps["railDensity"];
}

export function CrmKanbanPage({ after, children, filterBar, kanbanClassName, kanbanDensity, laneSurface, laneWidth, layoutVariant = "default", quickFilters, railDensity, ...shellProps }: CrmKanbanPageProps) {
  const commercialLayout = layoutVariant === "commercial";
  return (
    <CrmPageFamilyShell {...shellProps} contentLayout="kanban">
      <div className={cn("tcrm-page-family-stack", "tcrm-kanban-page-stack", layoutVariant === "finance" && "tcrm-kanban-page-stack--finance", commercialLayout && "tcrm-kanban-page-stack--commercial")}>
        {filterBar}
        <KanbanBoard className={cn("tcrm-kanban-page-board", kanbanClassName)} density={kanbanDensity} laneSurface={commercialLayout ? "separate" : laneSurface} laneWidth={layoutVariant === "finance" ? "finance" : commercialLayout ? "commercial" : laneWidth} rail={quickFilters} railDensity={railDensity}>
          {children}
        </KanbanBoard>
        {after}
      </div>
    </CrmPageFamilyShell>
  );
}

export interface CrmDashboardPageProps extends Omit<CrmPageFamilyShellProps, "children" | "contentLayout"> {
  after?: React.ReactNode;
  before?: React.ReactNode;
  children: React.ReactNode;
  columns?: React.ComponentProps<typeof DashboardGrid>["columns"];
  dashboardClassName?: string;
  dashboardStackClassName?: string;
  density?: React.ComponentProps<typeof DashboardGrid>["density"];
  layoutVariant?: "default" | "finance-overview" | "opportunity" | "support" | "settings-hub";
}

export function CrmDashboardPage({
  after,
  before,
  children,
  columns = 3,
  dashboardClassName,
  dashboardStackClassName,
  density,
  layoutVariant = "default",
  ...shellProps
}: CrmDashboardPageProps) {
  const dashboard = (
    <>
      {before}
      <DashboardGrid className={cn("tcrm-dashboard-page-grid", dashboardClassName)} columns={columns} density={density}>
        {children}
      </DashboardGrid>
      {after}
    </>
  );

  return (
    <CrmPageFamilyShell {...shellProps} contentLayout={layoutVariant === "default" ? undefined : layoutVariant}>
      {before || after || dashboardStackClassName ? <div className={cn("tcrm-dashboard-page-stack", layoutVariant === "finance-overview" && "tcrm-dashboard-page-stack--finance-overview", layoutVariant === "opportunity" && "tcrm-dashboard-page-stack--opportunity", dashboardStackClassName)}>{dashboard}</div> : dashboard}
    </CrmPageFamilyShell>
  );
}

export interface CrmThreePanePageProps extends Omit<CrmPageFamilyShellProps, "children" | "contentLayout"> {
  activePane?: ThreePaneLayoutActivePane;
  center: React.ReactNode;
  centerLabel?: string;
  filterBar?: React.ReactNode;
  left: React.ReactNode;
  leftLabel?: string;
  right?: React.ReactNode;
  rightLabel?: string;
  threePaneClassName?: string;
}

export function CrmThreePanePage({
  activePane,
  center,
  centerLabel,
  filterBar,
  left,
  leftLabel,
  right,
  rightLabel,
  threePaneClassName,
  ...shellProps
}: CrmThreePanePageProps) {
  const drawerOpen = Boolean(shellProps.drawer);
  return (
    <CrmPageFamilyShell {...shellProps} contentLayout="three-pane">
      <div className="tcrm-page-family-stack tcrm-three-pane-page-stack">
        {filterBar}
        <ThreePaneLayout
          activePane={activePane}
          center={center}
          centerLabel={centerLabel}
          className={cn("tcrm-three-pane-page-layout", drawerOpen && "tcrm-three-pane-page-layout--drawer", threePaneClassName)}
          left={left}
          leftLabel={leftLabel}
          right={right ?? null}
          rightLabel={rightLabel}
        />
      </div>
    </CrmPageFamilyShell>
  );
}

export interface CrmRightPanelPageProps extends Omit<CrmPageFamilyShellProps, "children" | "contentLayout"> {
  contentHeader?: React.ReactNode;
  contentHeaderLabel?: string;
  main: React.ReactNode;
  mainGridColumns?: React.ComponentProps<typeof DashboardGrid>["columns"];
  mainGridDensity?: React.ComponentProps<typeof DashboardGrid>["density"];
  mainLabel?: string;
  panel?: React.ReactNode;
  panelLabel?: string;
  rightPanelClassName?: string;
  rightPanelState?: React.ComponentProps<typeof RightPanelLayout>["state"];
  rightPanelVariant?: "default" | "simulation" | "student-profile" | "class-operation" | "settings" | "settings-permissions" | "settings-payments" | "settings-agenda" | "settings-notifications" | "billing-subscription" | "agent-routine" | "agent-flow" | "agent-test" | "agent-publish" | "agent-execution" | "billing-invoices" | "billing-addons" | "usage-overview" | "usage-ledger";
}

export function CrmRightPanelPage({
  contentHeader,
  contentHeaderLabel,
  drawer,
  main,
  mainGridColumns,
  mainGridDensity,
  mainLabel,
  panel,
  panelLabel,
  rightPanelClassName,
  rightPanelState,
  rightPanelVariant = "default",
  ...shellProps
}: CrmRightPanelPageProps) {
  const hasPanel = Boolean(panel);
  const mainContent = mainGridColumns ? (
    <DashboardGrid className="tcrm-right-panel-page-grid" columns={mainGridColumns} density={mainGridDensity}>
      {main}
    </DashboardGrid>
  ) : main;

  return (
    <CrmPageFamilyShell
      {...shellProps}
      contentLayout={rightPanelVariant === "student-profile" ? "student-profile" : rightPanelVariant === "class-operation" ? "class-operation" : rightPanelVariant === "settings" ? "settings" : rightPanelVariant === "settings-permissions" ? "settings-permissions" : rightPanelVariant === "settings-payments" ? "settings-payments" : rightPanelVariant === "settings-agenda" ? "settings-agenda" : rightPanelVariant === "settings-notifications" ? "settings-notifications" : rightPanelVariant === "billing-subscription" ? "billing-subscription" : rightPanelVariant === "agent-routine" ? "agent-routine" : rightPanelVariant === "agent-flow" ? "agent-flow" : rightPanelVariant === "agent-test" ? "agent-test" : rightPanelVariant === "agent-publish" ? "agent-publish" : undefined}
      drawer={drawer}
    >
      <RightPanelLayout
        className={cn(
          rightPanelVariant !== "default" && `tcrm-right-panel-layout--${rightPanelVariant}`,
          rightPanelClassName
        )}
        contentHeader={contentHeader}
        contentHeaderLabel={contentHeaderLabel}
        main={mainContent}
        mainLabel={mainLabel}
        panel={panel}
        panelLabel={panelLabel}
        state={!hasPanel ? "collapsed" : rightPanelState}
      />
    </CrmPageFamilyShell>
  );
}
