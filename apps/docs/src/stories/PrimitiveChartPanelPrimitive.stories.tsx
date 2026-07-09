import type { Meta } from "@storybook/react-vite";

import { ChartPanelPrimitive, Chip } from "@taliya/ui";

import { batch6SourceDescription, PrimitivePage, SourceGrid, SourceItem, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ChartPanelPrimitive> = {
  title: "Primitives / UI / ChartPanelPrimitive",
  component: ChartPanelPrimitive,
  parameters: { layout: "fullscreen", docs: { description: { component: batch6SourceDescription } } }
};

export default meta;

export function AllStates() {
  const ranking = [
    { label: "Sam Frank", value: 92 },
    { label: "Nikki Olaw", value: 74 },
    { label: "Maria Lopes", value: 62 },
    { label: "Joao Silva", value: 48 }
  ];

  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch6-chart" number="12" title="ChartPanelPrimitive">
          <SourceGrid className="sb-source-grid--3">
            <SourceItem label="Line">
              <ChartPanelPrimitive legend={<Chip tone="info">Conversas</Chip>} subtitle="Conversas e conversoes" title="Grafico de linha" />
            </SourceItem>
            <SourceItem label="Bars">
              <ChartPanelPrimitive subtitle="Novos clientes" title="Grafico de barras" variant="bar" />
            </SourceItem>
            <SourceItem label="Funnel">
              <ChartPanelPrimitive data={ranking} subtitle="Visitantes ate clientes" title="Funil" variant="funnel" />
            </SourceItem>
            <SourceItem label="Ranking">
              <ChartPanelPrimitive data={ranking} subtitle="Performance por agente" title="Ranking de agentes" variant="ranking" />
            </SourceItem>
            <SourceItem label="Heatmap">
              <ChartPanelPrimitive subtitle="Ocupacao por horario" title="Heatmap de ocupacao" variant="heatmap" />
            </SourceItem>
            <SourceItem label="Loading / empty">
              <div className="sb-batch6-chart-stack">
                <ChartPanelPrimitive loading title="Carregando" />
                <ChartPanelPrimitive empty title="Sem dados" />
              </div>
            </SourceItem>
          </SourceGrid>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
