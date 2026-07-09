import type { Meta } from "@storybook/react-vite";

import { ImportProgressCard } from "@taliya/ui";

import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ImportProgressCard> = {
  title: "Primitives / UI / ImportProgressCard",
  component: ImportProgressCard,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  const metrics = [
    { label: "Registros totais", value: "312" },
    { label: "Processados", value: "245" },
    { label: "Restantes", value: "78" }
  ];
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-import" number="3" title="Progresso de importacao">
          <div className="sb-batch8-import-layout">
            <ImportProgressCard compact helperText={<span className="sb-batch8-import-helper"><span>Tempo restante estimado</span><span>00:02:18</span></span>} metrics={metrics} onDetails={() => undefined} onPause={() => undefined} state="running" title="Importando alunos.csv" value={78} />
            <div className="sb-batch8-import-grid">
              <ImportProgressCard compact fileName="contatos.csv" metrics={[{ label: <>registros<br />Hoje, 14:32</>, value: "128" }]} state="complete" summary title="Concluido" value={100} />
              <ImportProgressCard compact fileName="planos.csv" metrics={[{ label: <>erros<br />Hoje, 14:28</>, value: "2" }]} state="error" summary title="Erros" value={18} />
              <ImportProgressCard compact fileName="responsaveis.csv" metrics={[{ label: <>duplicidades<br />Hoje, 14:25</>, value: "8" }]} state="duplicate" summary title="Duplicidades" value={40} />
              <ImportProgressCard compact fileName="turmas.csv" metrics={[{ label: <>registros<br />Pausado</>, value: "96" }]} state="paused" summary title="Continuar depois" value={96} />
            </div>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
