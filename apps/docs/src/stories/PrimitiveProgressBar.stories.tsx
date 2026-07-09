import type { Meta } from "@storybook/react-vite";

import { Card, ProgressBar } from "@taliya/ui";

import { batch4SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ProgressBar> = {
  title: "Primitives / UI / ProgressBar",
  component: ProgressBar,
  parameters: { layout: "fullscreen", docs: { description: { component: batch4SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch4-progress" number="2" title="Cotas e limites">
          <div className="sb-batch4-progress-grid">
            <Card pattern="quota">
              <strong>Contatos enriquecidos</strong>
              <ProgressBar helperText="Proximo do limite" label="8.210 / 10.000" tone="info" value={82} />
            </Card>
            <Card pattern="quota">
              <strong>Automacoes executadas</strong>
              <ProgressBar helperText="Uso normal" label="2.710 / 5.000" tone="info" value={54} />
            </Card>
            <Card pattern="quota">
              <strong>Mensagens processadas</strong>
              <ProgressBar helperText="Proximo do limite" label="4.620 / 5.000" tone="danger" value={92} />
            </Card>
            <Card pattern="quota">
              <strong>Storage utilizado</strong>
              <ProgressBar helperText="Uso normal" label="18,7 GB / 50 GB" value={37} />
            </Card>
          </div>
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch4-progress" number="3" title="Barra de progresso de uso">
          <div className="sb-batch4-progress-applied">
            <Card pattern="quota">
              <strong>Uso do limite</strong>
              <ProgressBar helperText="Uso normal" label="3.650 / 5.000" tone="info" value={73} />
            </Card>
            <Card pattern="quota">
              <strong>Automacoes executadas</strong>
              <ProgressBar label="2.710 / 5.000" tone="info" value={54} />
            </Card>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
