/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { ImportProgressCard, Panel, cn } from "@taliya/ui";

export function ImportProgress({ state = "running", onDetails, onPause, onResume, onRetry, className }: {
    state?: React.ComponentProps<typeof ImportProgressCard>["state"] | "mapped" | "conflict";
    onDetails?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    onRetry?: () => void;
    className?: string;
}) {
    const primitiveState = state === "mapped" ? "complete" : state === "conflict" ? "duplicate" : state;
    return (<Panel className={cn("tcrm-import-progress-panel", className)} data-state={state}>
      <header className="tcrm-import-progress-panel__header">
        <span aria-hidden="true">3</span>
        <h3>Progresso de importação</h3>
      </header>
      <div className="tcrm-import-progress-panel__grid">
        <ImportProgressCard className="tcrm-import-progress-panel__main-card" helperText={<span className="tcrm-import-progress-panel__helper"><span>Tempo restante estimado</span><span>00:02:18</span></span>} metrics={[
            { label: "Registros totais", value: "312" },
            { label: "Processados", value: "245" },
            { label: "Restantes", value: "78" }
        ]} onDetails={onDetails} onPause={primitiveState === "running" ? onPause : undefined} onResume={primitiveState === "paused" ? onResume : undefined} onRetry={primitiveState === "error" ? onRetry : undefined} state={primitiveState} title="Importando alunos.csv" value={78}/>
        <ImportProgressCard className="tcrm-import-progress-panel__summary-card" fileName="Contatos.csv" metrics={[{ label: "Hoje, 14:32", value: "128 registros" }]} state="complete" summary title="Concluído"/>
        <ImportProgressCard className="tcrm-import-progress-panel__summary-card" fileName="planos.csv" metrics={[{ label: "Hoje, 14:28", value: "2 erros" }]} state="error" summary title="Erros"/>
        <ImportProgressCard className="tcrm-import-progress-panel__summary-card" fileName="responsáveis.csv" metrics={[{ label: "Hoje, 14:25", value: "8 duplicidades" }]} state="duplicate" summary title="Duplicidades"/>
        <ImportProgressCard className="tcrm-import-progress-panel__summary-card" fileName="turmas.csv" metrics={[{ label: "Pausado", value: "96 registros" }]} state="paused" summary title="Continuar depois"/>
      </div>
    </Panel>);
}
