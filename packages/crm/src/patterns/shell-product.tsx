/** Product shell contract and composition. */
import React from "react";
import { cn } from "@taliya/ui";
import { crmEmptyShellNavItems, crmEmptyShellSidebarItems, crmEmptyShellSidebarUtilityItems } from "./shell-foundation.js";
import type {
  CrmShellNavItem,
  CrmShellSidebarItem
} from "./shell-foundation.js";
import { CrmBrowserChrome } from "./shell-chrome-a.js";
import {
  CrmShellBackButton,
  CrmShellGlobalActions,
  CrmShellSidebar,
  CrmShellTopNav
} from "./shell-chrome-b.js";
import type { CrmShellGlobalActionsCallbacks } from "./shell-chrome-b.js";
import { CrmEmptyShellWindow } from "./shell-empty.js";

export type CrmProductShellVariant = "crm" | "internal";
export type CrmProductShellFrame = "fullscreen" | "window" | "window-inset" | "reference";
export type CrmProductShellPageHeaderRhythm = "default" | "spacious" | "compact-stacked" | "dashboard" | "reports" | "support" | "internal-overview" | "internal-tenants" | "stacked" | "agents" | "agents-routines" | "agents-routine-detail" | "agents-flow-detail" | "agents-publish" | "settings-hub" | "overview" | "operation" | "inbox" | "usage" | "usage-overview" | "billing" | "billing-invoices";
export type CrmProductShellContentLayout = "default" | "work-list" | "work-list-compact" | "work-list-wide" | "main-priority" | "kanban" | "three-pane" | "student-profile" | "class-operation" | "finance-overview" | "settings" | "settings-permissions" | "settings-payments" | "settings-agenda" | "settings-notifications" | "settings-hub" | "billing-subscription" | "agent-routine" | "agent-flow" | "agent-test" | "agent-publish" | "opportunity" | "support" | "internal-overview" | "internal-tenants" | "internal-tenant-detail";

export interface CrmProductShellRegions {
  browserChrome?: boolean;
  sidebar?: boolean;
  topbar?: boolean;
  backButton?: boolean;
  topNav?: boolean;
  globalActions?: boolean;
  pageHeader?: boolean;
}

export interface CrmProductShellBrand {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

export interface CrmProductShellProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  variant?: CrmProductShellVariant;
  frame?: CrmProductShellFrame;
  brand?: CrmProductShellBrand;
  navItems?: CrmShellNavItem[];
  sidebarItems?: CrmShellSidebarItem[];
  utilityItems?: CrmShellSidebarItem[];
  avatarSrc?: string;
  globalActions?: CrmShellGlobalActionsCallbacks;
  browserUrl?: string;
  className?: string;
  contentClassName?: string;
  contentLayout?: CrmProductShellContentLayout;
  drawer?: React.ReactNode;
  showGlobalActionsWithDrawer?: boolean;
  pageHeaderRhythm?: CrmProductShellPageHeaderRhythm;
  regions?: CrmProductShellRegions;
  topbarStart?: React.ReactNode;
  topbarCenter?: React.ReactNode;
  topbarEnd?: React.ReactNode;
  topNavSelection?: "auto" | "none";
  pageHeaderMeta?: React.ReactNode;
  pageHeaderBreadcrumb?: React.ReactNode;
  pageHeaderActions?: React.ReactNode;
  onBack?: () => void;
  onNavChange?: (id: string) => void;
  onSidebarSelect?: (item: CrmShellSidebarItem) => void;
  onSidebarUtilitySelect?: (item: CrmShellSidebarItem) => void;
}

export function CrmProductShell({
  title,
  subtitle,
  variant = "crm",
  frame = "fullscreen",
  brand,
  navItems = crmEmptyShellNavItems,
  sidebarItems = crmEmptyShellSidebarItems,
  utilityItems = crmEmptyShellSidebarUtilityItems,
  avatarSrc,
  globalActions,
  browserUrl,
  children,
  className,
  contentClassName,
  contentLayout = "default",
  drawer,
  showGlobalActionsWithDrawer = false,
  pageHeaderRhythm = "default",
  regions,
  topbarStart,
  topbarCenter,
  topbarEnd,
  topNavSelection = "auto",
  pageHeaderMeta,
  pageHeaderBreadcrumb,
  pageHeaderActions,
  onBack,
  onNavChange,
  onSidebarSelect,
  onSidebarUtilitySelect
}: CrmProductShellProps) {
  const resolvedRegions: Required<CrmProductShellRegions> = {
    browserChrome: regions?.browserChrome ?? true,
    sidebar: regions?.sidebar ?? true,
    topbar: regions?.topbar ?? true,
    backButton: regions?.backButton ?? true,
    topNav: regions?.topNav ?? true,
    globalActions: regions?.globalActions ?? true,
    pageHeader: regions?.pageHeader ?? true
  };
  const showTopbar = resolvedRegions.topbar && (
    resolvedRegions.backButton ||
    resolvedRegions.topNav ||
    resolvedRegions.globalActions ||
    Boolean(topbarStart) ||
    Boolean(topbarCenter) ||
    Boolean(topbarEnd)
  );
  const shellClassName = cn(
    "tcrm-empty-shell-stage tcrm-product-shell-stage",
    `tcrm-product-shell-stage--${variant}`,
    frame !== "fullscreen" && `tcrm-product-shell-stage--frame-${frame}`,
    !resolvedRegions.browserChrome && "tcrm-product-shell-stage--no-browser-chrome",
    !resolvedRegions.sidebar && "tcrm-product-shell-stage--no-sidebar",
    !showTopbar && "tcrm-product-shell-stage--no-topbar",
    !resolvedRegions.pageHeader && "tcrm-product-shell-stage--no-page-header",
    Boolean(drawer) && "tcrm-product-shell-stage--drawer",
    Boolean(drawer) && showGlobalActionsWithDrawer && "tcrm-product-shell-stage--drawer-global-actions",
    pageHeaderRhythm !== "default" && `tcrm-product-shell-stage--page-header-${pageHeaderRhythm}`,
    Boolean(pageHeaderBreadcrumb) && "tcrm-product-shell-stage--page-header-breadcrumb",
    Boolean(pageHeaderMeta) && "tcrm-product-shell-stage--page-header-meta",
    contentLayout !== "default" && `tcrm-product-shell-stage--content-${contentLayout}`,
    className
  );
  const windowClassName = cn(
    "tcrm-product-shell-window",
    frame !== "fullscreen" && `tcrm-product-shell-window--frame-${frame}`,
    Boolean(drawer) && "tcrm-product-shell-window--drawer",
    Boolean(drawer) && showGlobalActionsWithDrawer && "tcrm-product-shell-window--drawer-global-actions",
    !resolvedRegions.browserChrome && "tcrm-product-shell-window--no-browser-chrome"
  );
  const pageLabel = String(title);

  return (
    <div className={shellClassName} data-component="CrmProductShell" data-shell-variant={variant}>
      <CrmEmptyShellWindow chrome={resolvedRegions.browserChrome ? (browserUrl ? <CrmBrowserChrome url={browserUrl} /> : undefined) : false} className={windowClassName}>
        {resolvedRegions.sidebar ? (
          <CrmShellSidebar items={sidebarItems} onSelect={onSidebarSelect} onUtilitySelect={onSidebarUtilitySelect} utilityItems={utilityItems} />
        ) : null}
        <main className="tcrm-empty-shell-main tcrm-product-shell-main">
          {showTopbar ? (
            <div className="tcrm-empty-shell-topbar tcrm-product-shell-topbar">
              {topbarStart ? <div className="tcrm-product-shell-topbar__start">{topbarStart}</div> : null}
              {resolvedRegions.backButton ? <CrmShellBackButton onClick={onBack} /> : null}
              {resolvedRegions.topNav ? <CrmShellTopNav items={navItems} onChange={onNavChange} selectionMode={topNavSelection} /> : null}
              {topbarCenter ? <div className="tcrm-product-shell-topbar__center">{topbarCenter}</div> : null}
              {resolvedRegions.globalActions ? <CrmShellGlobalActions {...globalActions} avatarSrc={avatarSrc} /> : null}
              {topbarEnd ? <div className="tcrm-product-shell-topbar__end">{topbarEnd}</div> : null}
            </div>
          ) : null}
          {resolvedRegions.pageHeader ? (
            <header className="tcrm-empty-shell-page-header tcrm-product-shell-page-header">
              <div className="tcrm-product-shell-page-header__copy">
                {pageHeaderBreadcrumb ? <div className="tcrm-product-shell-page-header__breadcrumb">{pageHeaderBreadcrumb}</div> : null}
                {brand?.title ? <span className="tcrm-product-shell-page-header__brand">{brand.title}</span> : null}
                <h1>{title}</h1>
                {subtitle || brand?.subtitle ? <p>{subtitle ?? brand?.subtitle}</p> : null}
                {pageHeaderMeta ? <div className="tcrm-product-shell-page-header__meta">{pageHeaderMeta}</div> : null}
              </div>
              {pageHeaderActions ? <div className="tcrm-product-shell-page-header__actions">{pageHeaderActions}</div> : null}
            </header>
          ) : null}
          <section className={cn("tcrm-empty-shell-canvas tcrm-product-shell-content", contentClassName)} aria-label={pageLabel}>
            {children}
          </section>
        </main>
      </CrmEmptyShellWindow>
      {drawer}
    </div>
  );
}

export type JourneyShellAction = "add" | "share" | "calendar";
