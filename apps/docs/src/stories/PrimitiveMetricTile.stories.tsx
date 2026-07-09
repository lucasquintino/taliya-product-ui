import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { MetricTile } from "@taliya/ui";

import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof MetricTile> = {
  title: "Primitives / UI / MetricTile",
  component: MetricTile,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [selected, setSelected] = useState("open");
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-metrics" number="7" title="Cards de resumo operacional">
          <div className="sb-batch8-metric-grid">
            <MetricTile compact delta="+12 hoje" icon="folder" label="Casos abertos" onSelect={() => setSelected("open")} selected={selected === "open"} tone="positive" value="128" />
            <MetricTile compact delta="+5 hoje" icon="clock" label="Em atraso" tone="negative" value="23" />
            <MetricTile compact delta="+8 vs ontem" icon="calendar" label="Hoje" tone="positive" value="36" />
            <MetricTile compact delta="-3 vs ontem" icon="user" label="Aguardando cliente" tone="warning" value="18" />
            <MetricTile compact delta="+2 vs ontem" icon="shieldCheck" label="SLA em risco" tone="negative" value="7" />
            <MetricTile compact delta="+11 hoje" icon="checkCircle" label="Resolvidas" tone="positive" value="54" />
          </div>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-states" number="28" title="Estado operacional">
          <div className="sb-batch8-metric-grid sb-batch8-metric-grid--operational">
            <MetricTile helperText="80% de presenca" label="Presenca recente" progressValue={80} tone="positive" value="8 de 10 aulas" variant="operational" />
            <MetricTile helperText="Situacao estavel" icon="shieldCheck" label="Risco" tone="positive" value="baixo" variant="operational" />
            <MetricTile helperText="07:00" icon="calendar" label="Proxima aula" tone="neutral" value="Qui, 15/05" variant="operational" />
            <MetricTile helperText="Plano Mensal" icon="creditCard" label="Plano" tone="neutral" value="ativo" variant="operational" />
            <MetricTile icon="clipboard" label="Financeiro" tone="warning" value="pagamento pendente" variant="operational" />
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
