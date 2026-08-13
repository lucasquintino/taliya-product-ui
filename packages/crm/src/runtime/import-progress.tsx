/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Button, DataTable, Icon, IconButton, Panel, Select, cn } from "@taliya/ui";

import type { IconName } from "@taliya/ui";

export interface FieldMappingRow {
    id: string;
    source: React.ReactNode;
    target: string;
    targetValue?: string;
    state: "mapped" | "missing" | "invalid";
    actionLabel?: string;
}

export function FieldMappingTable({ rows, onRowClick, onFieldChange, onRowAction, onAddMapping, className }: {
    rows?: FieldMappingRow[];
    onRowClick?: (rowId: string) => void;
    onFieldChange?: (rowId: string, value: string) => void;
    onRowAction?: (rowId: string) => void;
    onAddMapping?: () => void;
    className?: string;
}) {
    const mappingRows = rows ?? [
        { id: "nome", source: "Nome do aluno", target: "Nome completo", targetValue: "nome-completo", state: "mapped" as const },
        { id: "telefone", source: "Telefone", target: "Telefone celular", targetValue: "telefone-celular", state: "mapped" as const },
        { id: "responsavel", source: "Responsável", target: "Responsável principal", targetValue: "responsavel-principal", state: "mapped" as const },
        { id: "nascimento", source: "Data de nascimento", target: "Data de nascimento", targetValue: "data-nascimento", state: "invalid" as const, actionLabel: "Corrigir" },
        { id: "plano", source: "Plano", target: "Plano contratado", targetValue: "plano-contratado", state: "missing" as const, actionLabel: "Mapear" }
    ];
    const targetOptions = [
        { value: "nome-completo", label: "Nome completo" },
        { value: "telefone-celular", label: "Telefone celular" },
        { value: "responsavel-principal", label: "Responsável principal" },
        { value: "data-nascimento", label: "Data de nascimento" },
        { value: "plano-contratado", label: "Plano contratado" }
    ];
    const statusByState = {
        mapped: { icon: "checkCircle" as IconName, label: "Válido", tone: "success" },
        invalid: { icon: "alert" as IconName, label: "Formato inválido", tone: "warning" },
        missing: { icon: "alertCircle" as IconName, label: "Campo obrigatório", tone: "danger" }
    };
    return (<Panel className={cn("tcrm-field-mapping-panel", className)}>
      <header className="tcrm-field-mapping-panel__header">
        <span aria-hidden="true">4</span>
        <h3>Mapeamento de campos</h3>
      </header>
      <DataTable className="tcrm-field-mapping-panel__table" columns={[
            { key: "source", header: "Coluna importada" },
            {
                key: "target",
                header: "Campo Taliya",
                render: (row) => (<Select aria-label={`Campo Taliya para ${row.id}`} className="tcrm-field-mapping-panel__select" fieldSize="sm" onValueChange={(value) => onFieldChange?.(row.id, value)} options={targetOptions} value={row.targetValue}/>)
            },
            {
                key: "state",
                header: "Status",
                render: (row) => {
                    const status = statusByState[row.state];
                    return (<span className={cn("tcrm-field-mapping-panel__status", `tcrm-field-mapping-panel__status--${status.tone}`)}>
                  <Icon name={status.icon}/>
                  {status.label}
                </span>);
                }
            }
        ]} density="dense" onRowClick={onRowClick ? (row) => onRowClick(row.id) : undefined} rowActions={(row) => row.actionLabel ? (<Button className="tcrm-field-mapping-panel__text-action" onClick={() => onRowAction?.(row.id)} size="sm" type="button" variant="ghost">{row.actionLabel}</Button>) : (<IconButton className="tcrm-field-mapping-panel__chevron" icon="chevronRight" label={`Abrir mapeamento ${row.id}`} onClick={() => onRowAction?.(row.id)} size="sm" type="button" variant="ghost"/>)} rows={mappingRows}/>
      <footer className="tcrm-field-mapping-panel__footer">
        <Button leadingIcon="plus" onClick={onAddMapping} size="sm" variant="secondary">Adicionar correspondência</Button>
        <Button className="tcrm-field-mapping-panel__count" trailingIcon="chevronRight" size="sm" type="button" variant="ghost">5 de 7 mapeados</Button>
      </footer>
    </Panel>);
}
