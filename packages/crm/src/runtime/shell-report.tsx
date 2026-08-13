/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Avatar, Button, Chip, FilterBar, Icon, List, ListItem, Panel, Select, cn } from "@taliya/ui";

import type { ComponentTone, IconName } from "@taliya/ui";

import { ExportAction } from "../patterns/index.js";

export type ReportFilterPeriod = "today" | "week" | "month";

export interface ReportFilterBarProps {
    selectedPeriod?: ReportFilterPeriod;
    unitValue?: string;
    ownerValue?: string;
    onAdvancedFilters?: () => void;
    onExport?: () => void;
    onOwnerChange?: (value: string) => void;
    onPeriodChange?: (period: ReportFilterPeriod) => void;
    onUnitChange?: (value: string) => void;
    className?: string;
}

export function ReportFilterBar({ selectedPeriod, unitValue, ownerValue, onAdvancedFilters, onExport, onOwnerChange, onPeriodChange, onUnitChange, className }: ReportFilterBarProps) {
    const [internalPeriod, setInternalPeriod] = React.useState<ReportFilterPeriod>("month");
    const [internalUnit, setInternalUnit] = React.useState("all");
    const [internalOwner, setInternalOwner] = React.useState("all");
    const effectivePeriod = selectedPeriod ?? internalPeriod;
    const effectiveUnit = unitValue ?? internalUnit;
    const effectiveOwner = ownerValue ?? internalOwner;
    const periods: Array<{
        id: ReportFilterPeriod;
        label: string;
    }> = [
        { id: "today", label: "Hoje" },
        { id: "week", label: "Esta semana" },
        { id: "month", label: "Este mês" }
    ];
    return (<FilterBar className={cn("tcrm-report-filter-bar", className)} aria-label="Filtros de relatórios">
      {periods.map((period) => (<Button aria-pressed={effectivePeriod === period.id} className={cn(effectivePeriod === period.id && "is-selected")} key={period.id} onClick={() => {
                if (selectedPeriod === undefined)
                    setInternalPeriod(period.id);
                onPeriodChange?.(period.id);
            }} size="sm" variant="secondary">{period.label}</Button>))}
      <Select aria-label="Unidade" fieldSize="sm" onValueChange={(value) => { if (unitValue === undefined)
        setInternalUnit(value); onUnitChange?.(value); }} options={[{ value: "all", label: "Unidade" }, { value: "vila-mariana", label: "Vila Mariana" }, { value: "pinheiros", label: "Pinheiros" }]} value={effectiveUnit}/>
      <Select aria-label="Responsável" fieldSize="sm" onValueChange={(value) => { if (ownerValue === undefined)
        setInternalOwner(value); onOwnerChange?.(value); }} options={[{ value: "all", label: "Responsável" }, { value: "mariana", label: "Mariana" }, { value: "lucas", label: "Lucas" }]} value={effectiveOwner}/>
      <Button onClick={onAdvancedFilters} size="sm" trailingIcon="filter" variant="secondary">Mais filtros</Button>
      <span className="tcrm-report-filter-bar__export-behavior"><ExportAction onExport={onExport}/></span>
    </FilterBar>);
}

export interface OpportunityGroupItem {
    id: string;
    name: React.ReactNode;
    subtitle?: React.ReactNode;
    detail: React.ReactNode;
    amount?: React.ReactNode;
    action: React.ReactNode;
    badge?: React.ReactNode;
    badgeTone?: ComponentTone;
    avatarSrc?: string;
}

export interface OpportunityGroupCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
    title?: React.ReactNode;
    summary?: React.ReactNode;
    icon?: IconName;
    tone?: ComponentTone;
    items?: OpportunityGroupItem[];
    onOpen?: () => void;
    onItemOpen?: (item: OpportunityGroupItem) => void;
}

const defaultOpportunityGroupItems: OpportunityGroupItem[] = [
    { id: "ana", name: "Ana Souza", subtitle: "Matriculas", detail: "Pagamento inicial pendente", amount: "R$ 420", action: "Enviar Pix", badge: "hoje", badgeTone: "danger" },
    { id: "lucas", name: "Lucas Ferreira", subtitle: "Matriculas", detail: "Faltando CPF", action: "Pedir dado", badge: "bloqueada", badgeTone: "danger" }
];

export function OpportunityGroupCard({ title = "Matriculas travadas", summary = "R$ 1.260 possiveis", icon = "lock", tone = "danger", items = defaultOpportunityGroupItems, onOpen, onItemOpen, className, ...props }: OpportunityGroupCardProps) {
    return (<Panel className={cn("tcrm-opportunity-group-card", className)} data-component="OpportunityGroupCard" {...props}>
      <List>
        <ListItem action={<Button onClick={onOpen} size="sm" trailingIcon="chevronRight" variant="ghost">{summary}</Button>} leading={<Icon name={icon} tone={tone}/>} title={title}/>
      </List>
      <List divided>
        {items.map((item) => (<div className="tcrm-opportunity-group-card__row" key={item.id} role="listitem">
            <Avatar name={String(item.name)} size="sm" src={item.avatarSrc}/>
            <span className="tcrm-opportunity-group-card__identity">
              <strong>{item.name}</strong>
              {item.subtitle ? <small>{item.subtitle}</small> : null}
            </span>
            <span className="tcrm-opportunity-group-card__detail">{item.detail}</span>
            <strong className="tcrm-opportunity-group-card__amount">{item.amount}</strong>
            <Button onClick={() => onItemOpen?.(item)} size="sm" variant="ghost">{item.action}</Button>
            {item.badge ? <Chip showDot={false} tone={item.badgeTone ?? "neutral"}>{item.badge}</Chip> : <span />}
          </div>))}
      </List>
    </Panel>);
}
