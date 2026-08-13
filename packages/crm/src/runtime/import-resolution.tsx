/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Button, Chip, Icon, Panel, cn } from "@taliya/ui";

export type AdvancedStateAction = (action: string) => void;

export type PermissionStateVariant = "read-only" | "request-access";

export interface PermissionStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    state?: PermissionStateVariant;
    onAction?: AdvancedStateAction;
}

export function PermissionState({ state = "request-access", onAction, className, ...props }: PermissionStateProps) {
    const requestEnabled = state === "request-access";
    const rows: Array<{
        id: string;
        module: string;
        profile: string;
        action: string;
        status: "allowed" | "blocked" | "request" | "pending";
    }> = [
        { id: "contacts", module: "Contatos", profile: "Analista", action: "Editar", status: "allowed" },
        { id: "finance", module: "Financeiro", profile: "SDR", action: "Excluir", status: "blocked" },
        { id: "reports", module: "Relatórios", profile: "Gestor", action: "Visualizar", status: requestEnabled ? "request" : "pending" },
        { id: "integrations", module: "Integrações", profile: "Admin", action: "Configurar", status: "allowed" }
    ];
    return (<Panel compact className={cn("tcrm-permission-state-panel", className)} data-component="PermissionState" {...props}>
      <header className="tcrm-advanced-state-header">
        <h3>5. Permissões e acesso</h3>
        <Icon name="info"/>
      </header>
      <div className="tcrm-permission-state-panel__columns" aria-hidden="true">
        <span>Módulo</span>
        <span>Perfil</span>
        <span>Ação</span>
        <span>Status</span>
      </div>
      <div className="tcrm-permission-state-panel__rows" role="table" aria-label="Permissões e acesso">
        {rows.map((row) => (<div className="tcrm-permission-state-panel__row" key={row.id} role="row">
            <span role="cell">{row.module}</span>
            <span role="cell">{row.profile}</span>
            <span role="cell">{row.action}</span>
            <span className="tcrm-permission-state-panel__status" role="cell">
              {row.status === "request" ? (<Button onClick={() => onAction?.(`request:${row.id}`)} size="sm" variant="secondary">Solicitar acesso</Button>) : row.status === "allowed" ? (<Chip icon="check" showDot={false} tone="success">Permitido</Chip>) : row.status === "blocked" ? (<Chip icon="alertCircle" showDot={false} tone="danger">Bloqueado</Chip>) : (<Chip icon="clock" showDot={false} tone="warning">Pendente</Chip>)}
            </span>
          </div>))}
      </div>
      <Button className="tcrm-advanced-state-link" onClick={() => onAction?.("open-permissions")} trailingIcon="arrowRight" type="button" variant="ghost">Ver todas as permissões</Button>
    </Panel>);
}
