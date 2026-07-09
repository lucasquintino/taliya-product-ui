import type { Meta } from "@storybook/react-vite";

import { ConflictCard } from "@taliya/ui";

import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ConflictCard> = {
  title: "Primitives / UI / ConflictCard",
  component: ConflictCard,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-conflict" number="7" title="Conflito de recurso">
          <ConflictCard
            compact
            description="Terca, 21/05 - 13:00 - 14:00"
            facts={[
              { label: "Aulas afetadas", value: "2 aulas" },
              { label: "Impacto", value: "12 alunos" },
              { label: "Recurso", value: "Sala 2" }
            ]}
            onApply={() => undefined}
            onView={() => undefined}
            state="danger"
            suggestion="Mover para Sala 3"
            title="Sala ou professor indisponivel"
          />
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-states" number="7b" title="Estados de conflito">
          <div className="sb-batch8-card-grid">
            <ConflictCard compact description="CPF duplicado em 2 registros" onApply={() => undefined} state="warning" suggestion="Revisar e mesclar" title="Conflito de dados" />
            <ConflictCard compact description="Sugestao ja aplicada" state="applied" title="Sala corrigida" />
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
