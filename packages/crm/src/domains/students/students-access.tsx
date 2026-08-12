/** Scoped access grant composition. */
import React from "react";
import { Button, Chip, Icon, Panel, cn } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import { stateKey } from "./students-utilities.js";

export function GrantAccessPanel({
  state = "grant",
  onAction,
  className
}: CrmSurfaceProps & {
  onAction?: (actionId: string) => void;
}) {
  const key = stateKey(state) || "grant";
  const isExpired = key === "expired";
  const isRevoke = key === "revoke";

  return (
    <Panel className={cn("tcrm-grant-access-panel", className)} data-state={key} aria-label="Grants de acesso">
      <header className="tcrm-grant-access-panel__header">
        <h3><span>5.</span> Grants de acesso</h3>
        <Button onClick={() => onAction?.("view-grant")} size="sm" variant="ghost">Ver grant</Button>
      </header>
      <dl className="tcrm-grant-access-panel__facts">
        <div>
          <Icon name="lock" size="14px" />
          <dt>Importação e duplicidades</dt>
          <dd><Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--grant" showDot={false} tone={isExpired ? "paused" : isRevoke ? "danger" : "success"}>{isExpired ? "expirado" : isRevoke ? "revogar" : "ativo"}</Chip></dd>
        </div>
        <div><dt>Expira</dt><dd>{isExpired ? "ontem 18:00" : "hoje 18:00"}</dd></div>
        <div><dt>Aprovado por</dt><dd>{isRevoke ? "Marina - Suporte" : "Ana Souza"}</dd></div>
      </dl>
      <p className="tcrm-grant-access-panel__notice">
        <Icon name={isExpired ? "alert" : "shieldCheck"} size="15px" tone={isExpired ? "warning" : "success"} />
        {isExpired ? "Grant expirado. Solicite novo acesso escopado." : "Acesso temporário, escopado, e auditado."}
      </p>
      <Button className="tl-sr-only" onClick={() => onAction?.("revoke")} size="sm" variant="secondary">Encerrar grant</Button>
    </Panel>
  );
}

