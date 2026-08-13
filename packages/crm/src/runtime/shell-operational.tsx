/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { cn } from "@taliya/ui";

import { crmEmptyShellSidebarItems, crmEmptyShellSidebarUtilityItems, CrmProductShell, WorkListDetailPageState, WorkListDetailPageLayoutMode, WorkListDetailPageHeightMode, WorkListDetailPage, CrmPageFamilyShell } from "../patterns/shell.js";

import { InternalShellProps, internalShellNavItems } from "../domains/students/index.js";

export function InternalShell({ title, subtitle, brand, navItems = internalShellNavItems, sidebarItems = crmEmptyShellSidebarItems, utilityItems = crmEmptyShellSidebarUtilityItems, avatarSrc, browserUrl, children, className, contentClassName, drawer, regions, topbarStart, topbarCenter, topbarEnd, pageHeaderActions, onBack, onNavChange, onSidebarSelect, onSidebarUtilitySelect, ...shellProps }: InternalShellProps) {
    return (<CrmProductShell {...shellProps} avatarSrc={avatarSrc} browserUrl={browserUrl} brand={brand} className={cn("tcrm-internal-product-shell", className)} contentClassName={contentClassName} drawer={drawer} navItems={navItems} onBack={onBack} onNavChange={onNavChange} onSidebarSelect={onSidebarSelect} onSidebarUtilitySelect={onSidebarUtilitySelect} pageHeaderActions={pageHeaderActions} regions={regions} sidebarItems={sidebarItems} subtitle={subtitle} title={title} topbarCenter={topbarCenter} topbarEnd={topbarEnd} topbarStart={topbarStart} utilityItems={utilityItems} variant="internal">
      {children}
    </CrmProductShell>);
}

export interface InternalWorklistPageProps extends Omit<InternalShellProps, "children"> {
    after?: React.ReactNode;
    children: React.ReactNode;
    filterBar: React.ReactNode;
    filterBarLabel?: string;
    listLabel?: string;
    mainLabel?: string;
    pageLabel?: string;
    quickFilters: React.ReactNode;
    state?: WorkListDetailPageState;
    worklistClassName?: string;
    worklistLayoutMode?: WorkListDetailPageLayoutMode;
    worklistHeightMode?: WorkListDetailPageHeightMode;
}

export function InternalWorklistPage({ after, children, navItems = internalShellNavItems, sidebarItems = crmEmptyShellSidebarItems, utilityItems = crmEmptyShellSidebarUtilityItems, filterBar, filterBarLabel, listLabel, mainLabel, pageLabel, quickFilters, state, worklistClassName, worklistLayoutMode, worklistHeightMode, ...shellProps }: InternalWorklistPageProps) {
    return (<CrmPageFamilyShell {...shellProps} className={cn("tcrm-internal-product-shell", shellProps.className)} contentClassName={shellProps.contentClassName} contentLayout={shellProps.contentLayout ?? "work-list"} navItems={navItems} sidebarItems={sidebarItems} utilityItems={utilityItems} variant="internal">
      <WorkListDetailPage className={cn("tcrm-worklist-page-frame", worklistClassName)} filterBar={filterBar} filterBarLabel={filterBarLabel} layoutMode={worklistLayoutMode} heightMode={worklistHeightMode} listLabel={listLabel} mainLabel={mainLabel} pageLabel={pageLabel} after={after} quickFilters={quickFilters} state={state}>
        {children}
      </WorkListDetailPage>
    </CrmPageFamilyShell>);
}
