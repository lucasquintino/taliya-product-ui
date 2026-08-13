/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { EmptyState, FilterChip, Icon, InlineAlert, List, LoadingState, Panel, cn } from "@taliya/ui";

import type { IconName } from "@taliya/ui";

export type TaskQueueListState = "source" | "loading" | "empty" | "blocked";

export type TaskQueueListItemTone = "default" | "danger";

export interface TaskQueueListItem {
    id: string;
    label: React.ReactNode;
    count?: React.ReactNode;
    icon: IconName;
    selected?: boolean;
    disabled?: boolean;
    tone?: TaskQueueListItemTone;
}

const sourceTaskQueueListItems: TaskQueueListItem[] = [
    { id: "my-tasks", label: "Minhas tarefas", count: "12", icon: "user", selected: true },
    { id: "today", label: "Hoje", count: "6", icon: "calendar" },
    { id: "late", label: "Atrasadas", count: "3", icon: "clock", tone: "danger" },
    { id: "unassigned", label: "Sem dono", count: "2", icon: "user" },
    { id: "waiting", label: "Aguardando", count: "8", icon: "tag" },
    { id: "checklists", label: "Checklists", count: "5", icon: "clipboardCheck" },
    { id: "origin", label: "Por origem", icon: "graduation" }
];

export interface TaskQueueListProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> {
    state?: TaskQueueListState;
    heading?: React.ReactNode;
    items?: TaskQueueListItem[];
    onSelect?: (item: TaskQueueListItem) => void;
}

export function TaskQueueList({ className, state = "source", heading = "Filas", items = sourceTaskQueueListItems, onSelect, ...props }: TaskQueueListProps) {
    const isLoading = state === "loading";
    const isBlocked = state === "blocked";
    const rows = state === "empty" ? [] : items;
    return (<Panel aria-busy={isLoading || undefined} aria-label={typeof heading === "string" ? heading : "Filas de tarefas"} className={cn("tcrm-task-queue-list", className)} data-component="TaskQueueList" data-state={state} {...props}>
      <h3>{heading}</h3>
      {isBlocked ? <InlineAlert tone="warning" title="Filas bloqueadas">A selecao de filas esta indisponivel.</InlineAlert> : null}
      {isLoading ? (<LoadingState title="Carregando filas" variant="skeleton"/>) : rows.length > 0 ? (<List aria-label="Filas de tarefas" className="tcrm-task-queue-list__rows" divided role="group">
          {rows.map((item) => {
                const disabled = item.disabled || isBlocked;
                return (<FilterChip aria-current={item.selected ? "true" : undefined} className={cn("tcrm-task-queue-list__item", item.selected && "is-selected", item.tone === "danger" && "is-danger")} count={item.count} disabled={disabled} key={item.id} onClick={() => {
                        if (!disabled) {
                            onSelect?.(item);
                        }
                    }} selected={item.selected}>
                <span className="tcrm-task-queue-list__item-main">
                  <Icon name={item.icon} size="var(--taliya-control-crm-task-queue-list-icon-size)"/>
                  <span>{item.label}</span>
                </span>
              </FilterChip>);
            })}
        </List>) : (<EmptyState title="Nenhuma fila" description="As filas de tarefas aparecem aqui."/>)}
    </Panel>);
}
