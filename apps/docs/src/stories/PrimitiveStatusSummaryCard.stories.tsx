import type { Meta } from "@storybook/react-vite";

import { Button, StatusSummaryCard } from "@taliya/ui";

import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof StatusSummaryCard> = {
  title: "Primitives / UI / StatusSummaryCard",
  component: StatusSummaryCard,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-status" number="11" title="CRM ativo, 0 agentes configurados">
          <StatusSummaryCard
            compact
            description="Seu CRM esta ativo e pronto para uso. Adicione agentes para automatizar tarefas e aumentar a produtividade da equipe."
            icon="users"
            layout="hero"
            primaryAction={<Button size="sm" variant="primary">Adicionar agentes</Button>}
            secondaryAction={<Button disabled size="sm" variant="secondary">Fazer upgrade</Button>}
            state="ok"
            title="CRM ativo, 0 agentes configurados"
          />
        </SourcePanel>
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-states" number="1/6/7" title="Estados de sistema e governanca">
          <div className="sb-batch8-card-grid">
            <StatusSummaryCard compact description="Mensagem proxima do limite" icon="barChart" state="attention" title="Cotas e limites" />
            <StatusSummaryCard compact description="Falha na conexao" icon="unplug" primaryAction={<Button size="sm" variant="secondary">Reconectar</Button>} state="danger" title="Twilio" />
            <StatusSummaryCard compact description="Recurso indisponivel no plano" icon="lock" primaryAction={<Button disabled size="sm" variant="secondary">Fazer upgrade</Button>} state="blocked" title="Bloqueado por plano" />
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
