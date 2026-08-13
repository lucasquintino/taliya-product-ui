/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Button, FilterBar, FilterChip, FilterMultiSelect, FilterSelect, IconButton, Modal, Popover, SearchInput, cn } from "@taliya/ui";

import type { IconName } from "@taliya/ui";

export type PageFilterBarState = "source" | "loading" | "disabled" | "blocked";

export interface PageFilterBarFilter {
    id: string;
    label: React.ReactNode;
    kind?: "single" | "multi" | "quick";
    placement?: "primary" | "advanced";
    options?: Array<{
        value: string;
        label: React.ReactNode;
        icon?: IconName;
        disabled?: boolean;
    }>;
    value?: string;
    values?: string[];
    selected?: boolean;
    disabled?: boolean;
}

export interface PageFilterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    state?: PageFilterBarState;
    density?: "standard" | "comfortable" | "compact" | "tight";
    layout?: "standard" | "stacked" | "stacked-filters";
    query?: string;
    searchVisible?: boolean;
    searchPlaceholder?: string;
    searchAriaLabel?: string;
    searchFilterLabel?: string;
    searchFilterPlacement?: "separate" | "embedded";
    searchResultCount?: React.ReactNode;
    filters?: PageFilterBarFilter[];
    filterGroupLabel?: string;
    advancedFiltersLabel?: string;
    advancedFiltersTitle?: React.ReactNode;
    advancedFiltersDescription?: React.ReactNode;
    advancedFiltersSurface?: "popover" | "modal";
    advancedFiltersTriggerVariant?: "icon" | "button";
    advancedFilterGroupLabel?: string;
    leadingActions?: React.ReactNode;
    actions?: React.ReactNode;
    onSearchChange?: (value: string) => void;
    onSearchFilter?: () => void;
    onFilterSelect?: (filter: PageFilterBarFilter) => void;
    onFilterValueChange?: (filter: PageFilterBarFilter, value: string | string[]) => void;
}

function renderPageFilterBarFilter(filter: PageFilterBarFilter, controlsDisabled: boolean, onFilterSelect?: (filter: PageFilterBarFilter) => void, onFilterValueChange?: (filter: PageFilterBarFilter, value: string | string[]) => void) {
    if (filter.kind === "quick") {
        return (<FilterChip className="tcrm-page-filter-bar__quick-filter" disabled={controlsDisabled || filter.disabled} key={filter.id} onClick={() => onFilterSelect?.(filter)} selected={filter.selected}>
        {filter.label}
      </FilterChip>);
    }
    if (filter.kind === "multi") {
        return (<FilterMultiSelect className="tcrm-page-filter-bar__control" disabled={controlsDisabled || filter.disabled} key={filter.id} label={String(filter.label)} onValueChange={(value) => onFilterValueChange?.(filter, value)} options={filter.options ?? []} value={filter.values ?? []}/>);
    }
    return (<FilterSelect className="tcrm-page-filter-bar__control" disabled={controlsDisabled || filter.disabled} key={filter.id} label={String(filter.label)} onValueChange={(value) => onFilterValueChange?.(filter, value)} options={filter.options ?? []} value={filter.value ?? ""}/>);
}

export function PageFilterBar({ state = "source", density = "standard", layout = "standard", query = "", searchVisible = true, searchPlaceholder = "Buscar...", searchAriaLabel = "Buscar", searchFilterLabel = "Abrir filtros", searchFilterPlacement = "separate", searchResultCount, filters, filterGroupLabel = "Filtros rápidos", advancedFiltersLabel = "Mais filtros", advancedFiltersTitle = "Filtros", advancedFiltersDescription, advancedFiltersSurface = "popover", advancedFiltersTriggerVariant = "icon", advancedFilterGroupLabel = "Filtros avançados", leadingActions, actions, onSearchChange, onSearchFilter, onFilterSelect, onFilterValueChange, "aria-label": ariaLabel, className, ...props }: PageFilterBarProps) {
    const isLoading = state === "loading";
    const controlsDisabled = isLoading || state === "disabled" || state === "blocked";
    const primaryFilters = filters?.filter((filter) => filter.placement !== "advanced") ?? [];
    const advancedFilters = filters?.filter((filter) => filter.placement === "advanced") ?? [];
    const isStacked = layout === "stacked" || layout === "stacked-filters";
    const primaryQuickFilters = layout === "stacked" ? primaryFilters.filter((filter) => filter.kind === "quick") : [];
    const primaryControlFilters = isStacked ? (layout === "stacked-filters" ? primaryFilters : primaryFilters.filter((filter) => filter.kind !== "quick")) : primaryFilters;
    const selectedAdvancedCount = advancedFilters.filter((filter) => filter.selected || filter.value || (filter.values?.length ?? 0) > 0).length;
    const hasAdvancedFilters = advancedFilters.length > 0;
    const advancedFiltersContent = (<div className="tcrm-page-filter-bar__advanced-filters" role="group" aria-label={advancedFilterGroupLabel}>
      {advancedFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
    </div>);
    const advancedFiltersTrigger = advancedFiltersTriggerVariant === "button" ? (<Button className="tcrm-page-filter-bar__advanced-trigger tcrm-page-filter-bar__advanced-trigger--button" disabled={controlsDisabled} leadingIcon="sliders" size="sm" variant="secondary">
        {advancedFiltersLabel}
      </Button>) : (<IconButton className="tcrm-page-filter-bar__advanced-trigger" disabled={controlsDisabled} icon="sliders" label={advancedFiltersLabel} variant={selectedAdvancedCount > 0 ? "selected" : "default"}/>);
    return (<FilterBar aria-busy={isLoading || undefined} aria-label={ariaLabel} className={cn("tcrm-page-filter-bar", density === "comfortable" && "tcrm-page-filter-bar--comfortable", density === "compact" && "tcrm-page-filter-bar--compact", density === "tight" && "tcrm-page-filter-bar--tight", isStacked && "tcrm-page-filter-bar--stacked", !searchVisible && "tcrm-page-filter-bar--without-search", className)} data-component="PageFilterBar" data-density={density} data-layout={layout} data-state={state} {...props}>
      {isStacked ? (<>
          <div className="tcrm-page-filter-bar__row tcrm-page-filter-bar__row--top">
            {leadingActions ? <div className="tcrm-page-filter-bar__leading-actions">{leadingActions}</div> : null}
            {searchVisible ? (<SearchInput aria-label={searchAriaLabel} className="tcrm-page-filter-bar__search" disabled={controlsDisabled} filterLabel={searchFilterLabel} filterPlacement={searchFilterPlacement} loading={isLoading} onChange={(event) => onSearchChange?.(event.currentTarget.value)} onFilter={onSearchFilter} placeholder={searchPlaceholder} resultCount={searchResultCount} value={query}/>) : null}
            {primaryQuickFilters.length > 0 ? (<div className="tcrm-page-filter-bar__filters tcrm-page-filter-bar__filters--quick" role="group" aria-label={filterGroupLabel}>
                {primaryQuickFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
              </div>) : null}
            {actions ? <div className="tcrm-page-filter-bar__actions">{actions}</div> : null}
          </div>
          {primaryControlFilters.length > 0 || hasAdvancedFilters ? (<div className="tcrm-page-filter-bar__row tcrm-page-filter-bar__row--bottom">
              <div className="tcrm-page-filter-bar__filters" role="group" aria-label={filterGroupLabel}>
                {primaryControlFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
                {hasAdvancedFilters ? (advancedFiltersSurface === "modal" ? (<Modal bodyClassName="tcrm-page-filter-bar__advanced-modal-body" className="tcrm-page-filter-bar__advanced-modal" description={advancedFiltersDescription} size="md" title={advancedFiltersTitle} trigger={advancedFiltersTrigger}>
                      {advancedFiltersContent}
                    </Modal>) : (<Popover align="end" className="tcrm-page-filter-bar__advanced-popover" side="bottom" title={advancedFiltersTitle} trigger={advancedFiltersTrigger} width="md">
                      {advancedFiltersContent}
                    </Popover>)) : null}
              </div>
            </div>) : null}
        </>) : (<>
          {leadingActions ? <div className="tcrm-page-filter-bar__leading-actions">{leadingActions}</div> : null}
          {searchVisible ? (<SearchInput aria-label={searchAriaLabel} className="tcrm-page-filter-bar__search" disabled={controlsDisabled} filterLabel={searchFilterLabel} filterPlacement={searchFilterPlacement} loading={isLoading} onChange={(event) => onSearchChange?.(event.currentTarget.value)} onFilter={onSearchFilter} placeholder={searchPlaceholder} resultCount={searchResultCount} value={query}/>) : null}
          {primaryFilters.length > 0 || hasAdvancedFilters ? (<div className="tcrm-page-filter-bar__filters" role="group" aria-label={filterGroupLabel}>
              {primaryFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
              {hasAdvancedFilters ? (advancedFiltersSurface === "modal" ? (<Modal bodyClassName="tcrm-page-filter-bar__advanced-modal-body" className="tcrm-page-filter-bar__advanced-modal" description={advancedFiltersDescription} size="md" title={advancedFiltersTitle} trigger={advancedFiltersTrigger}>
                    {advancedFiltersContent}
                  </Modal>) : (<Popover align="end" className="tcrm-page-filter-bar__advanced-popover" side="bottom" title={advancedFiltersTitle} trigger={advancedFiltersTrigger} width="md">
                    {advancedFiltersContent}
                  </Popover>)) : null}
            </div>) : null}
          {actions ? <div className="tcrm-page-filter-bar__actions">{actions}</div> : null}
        </>)}
    </FilterBar>);
}
