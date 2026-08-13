/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Badge, EmptyState, Icon, InlineAlert, LoadingState, PrimitiveButton, cn } from "@taliya/ui";

import type { IconName } from "@taliya/ui";

export type PageQuickFiltersState = "source" | "loading" | "empty" | "disabled" | "blocked";

export type PageQuickFilterTone = "default" | "danger" | "warning" | "info";

export type PageQuickFiltersSelectionTone = "strong" | "soft";

export interface PageQuickFilterItem {
    id: string;
    label: React.ReactNode;
    icon: IconName;
    count?: React.ReactNode;
    tone?: PageQuickFilterTone;
    selected?: boolean;
    disabled?: boolean;
}

export interface PageQuickFiltersProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    state?: PageQuickFiltersState;
    selectionTone?: PageQuickFiltersSelectionTone;
    heading?: React.ReactNode;
    items?: PageQuickFilterItem[];
    groupLabel?: string;
    actions?: React.ReactNode;
    onSelect?: (item: PageQuickFilterItem) => void;
    onItemSelect?: (item: PageQuickFilterItem) => void;
}

const sourcePageQuickFilterItems: PageQuickFilterItem[] = [
    { id: "mine", label: "Minhas pendências", icon: "user", selected: true },
    { id: "unowned", label: "Sem dono", icon: "user" },
    { id: "blocked", label: "Bloqueadas", icon: "lock", tone: "danger" },
    { id: "waiting", label: "Aguardando resposta", icon: "clock", tone: "warning" },
    { id: "quota", label: "Cota / agente", icon: "pieChart", tone: "info" }
];

export function PageQuickFilters({ state = "source", selectionTone = "strong", heading = "Filtros rápidos", items = sourcePageQuickFilterItems, groupLabel = "Lista de filtros rápidos", actions, onSelect, onItemSelect, className, "aria-label": ariaLabel, ...props }: PageQuickFiltersProps) {
    const isLoading = state === "loading";
    const controlsDisabled = isLoading || state === "disabled" || state === "blocked";
    const rows = state === "empty" ? [] : items;
    const resolvedAriaLabel = ariaLabel ?? (typeof heading === "string" ? heading : "Filtros rápidos");
    return (<section aria-busy={isLoading || undefined} aria-label={resolvedAriaLabel} className={cn("tcrm-page-quick-filters", className)} data-component="PageQuickFilters" data-selection-tone={selectionTone} data-state={state} {...props}>
      <h3>{heading}</h3>
      {state === "blocked" ? (<InlineAlert tone="warning" title="Filtros rápidos bloqueados">
          A seleção de filtros rápidos está indisponível.
        </InlineAlert>) : null}
      {isLoading ? (<LoadingState title="Carregando filtros rápidos" variant="skeleton"/>) : rows.length > 0 ? (<div className="tcrm-page-quick-filters__list" role="group" aria-label={groupLabel}>
          {rows.map((item) => {
                const disabled = controlsDisabled || item.disabled;
                return (<PrimitiveButton aria-pressed={item.selected || undefined} className={cn("tcrm-page-quick-filters__item", selectionTone === "soft" && "tcrm-page-quick-filters__item--selection-soft", item.tone && item.tone !== "default" && `tcrm-page-quick-filters__item--${item.tone}`)} disabled={disabled} key={item.id} onClick={() => {
                        if (!disabled) {
                            onSelect?.(item);
                            onItemSelect?.(item);
                        }
                    }} type="button">
                <Icon name={item.icon} size="sm"/>
                <span className="tcrm-page-quick-filters__item-label">{item.label}</span>
                {item.count != null ? (<Badge className="tcrm-page-quick-filters__item-count" tone="neutral" variant="count">
                    {item.count}
                  </Badge>) : null}
              </PrimitiveButton>);
            })}
        </div>) : (<EmptyState title="Nenhum filtro rápido" description="Os filtros rápidos aparecem aqui."/>)}
      {actions ? <div className="tcrm-page-quick-filters__actions">{actions}</div> : null}
    </section>);
}
