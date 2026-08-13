/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Button, Drawer, DrawerSection, Icon, Tabs, cn } from "@taliya/ui";

import type { ButtonVariant, ComponentTone, IconName } from "@taliya/ui";

import { CrmRecordDrawerState } from "./worklist-lead.js";

export interface CrmRecordDrawerFact {
    id: string;
    label: React.ReactNode;
    value: React.ReactNode;
    icon?: IconName;
    tone?: ComponentTone;
}

export interface CrmRecordDrawerSection {
    id: string;
    title?: React.ReactNode;
    content?: React.ReactNode;
    subtle?: boolean;
    compact?: boolean;
}

export interface CrmRecordDrawerAction {
    id: string;
    label: React.ReactNode;
    variant?: ButtonVariant;
    leadingIcon?: IconName;
    disabled?: boolean;
}

export interface CrmRecordDrawerTab {
    id: string;
    label: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}

export interface CrmRecordDrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSelect"> {
    state?: CrmRecordDrawerState;
    open?: boolean;
    title: React.ReactNode;
    meta?: React.ReactNode;
    description?: React.ReactNode;
    status?: React.ReactNode;
    facts?: CrmRecordDrawerFact[];
    sections?: CrmRecordDrawerSection[];
    tabs?: CrmRecordDrawerTab[];
    activeTab?: string;
    defaultTab?: string;
    tabsLabel?: string;
    actions?: CrmRecordDrawerAction[];
    blockedReason?: React.ReactNode;
    onTabChange?: (tabId: string) => void;
    onOpenChange?: (open: boolean) => void;
    onAction?: (action: CrmRecordDrawerAction) => void;
}

export function CrmRecordDrawer({ state = "source", open = true, title, meta, description, status, facts = [], sections = [], tabs = [], activeTab, defaultTab, tabsLabel = "Abas do registro", actions = [], blockedReason, onTabChange, onOpenChange, onAction, className, children, ...props }: CrmRecordDrawerProps) {
    const isLoading = state === "loading";
    const isBlocked = state === "blocked";
    const drawerFooter = actions.length > 0 ? (<div className="tcrm-record-drawer__actions">
      {actions.map((action) => (<Button className="tcrm-record-drawer__action" disabled={isBlocked || action.disabled} key={action.id} leadingIcon={action.leadingIcon} onClick={() => onAction?.(action)} size="sm" variant={action.variant ?? "secondary"}>
          {action.label}
        </Button>))}
    </div>) : null;
    return (<Drawer blockedReason={blockedReason} className={cn("tcrm-record-drawer", className)} data-component="CrmRecordDrawer" data-state={state} description={description} footer={drawerFooter} footerLayout="stack" headerStatus={status} loading={isLoading} onOpenChange={onOpenChange} open={open} title={title} headerMeta={meta} {...props}>
      {facts.length > 0 ? (<div className="tcrm-record-drawer__facts">
          {facts.map((fact) => (<div className={cn("tcrm-record-drawer__fact", fact.tone && `tcrm-record-drawer__fact--${fact.tone}`)} key={fact.id}>
              {fact.icon ? <Icon name={fact.icon} size="sm"/> : null}
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>))}
        </div>) : null}
      {sections.map((section) => (<DrawerSection compact={section.compact} key={section.id} subtle={section.subtle} title={section.title}>
          {section.content}
        </DrawerSection>))}
      {tabs.length > 0 ? (<Tabs aria-label={tabsLabel} className="tcrm-record-drawer__tabs" compact defaultValue={defaultTab ?? tabs[0]?.id} items={tabs.map((tab) => ({ value: tab.id, label: tab.label, content: tab.content, disabled: tab.disabled }))} onValueChange={onTabChange} value={activeTab}/>) : null}
      {children}
    </Drawer>);
}
