import { useState } from "react";
import type { Meta } from "@storybook/react-vite";

import { ExecutionRow } from "@taliya/ui";

import { batch8SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof ExecutionRow> = {
  title: "Primitives / UI / ExecutionRow",
  component: ExecutionRow,
  parameters: { layout: "fullscreen", docs: { description: { component: batch8SourceDescription } } }
};

export default meta;

export function AllStates() {
  const [expanded, setExpanded] = useState(false);
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch8-source sb-source-panel--batch8-execution" number="5" title="Trace de execucao">
          <div className="sb-batch8-execution-table">
            <div className="sb-batch8-execution-header" aria-hidden="true">
              <span />
              <span>Etapa executada</span>
              <span>Ferramenta usada</span>
              <span>Status</span>
              <span>Duracao</span>
              <span>Custo</span>
              <span>Erro</span>
            </div>
            <ExecutionRow compact cost="0,001" duration="0,45 s" status="success" statusLabel="Sucesso" step={1} title="Receber mensagem" tool="WhatsApp Webhook" />
            <ExecutionRow compact cost="0,002" duration="0,32 s" status="success" statusLabel="Sucesso" step={2} title="Verificar elegibilidade" tool="Regra de negocio" />
            <ExecutionRow compact cost="0,006" duration="0,78 s" status="success" statusLabel="Sucesso" step={3} title="Buscar dados do cliente" tool="Taliya CRM API" />
            <ExecutionRow compact cost="0,013" duration="2,31 s" expanded={expanded} details="Resposta gerada com contexto comercial aprovado." onToggle={() => setExpanded(!expanded)} status="running" statusLabel="Em andamento" step={4} title="Gerar resposta (LLM)" tool="Assistente de texto" />
            <ExecutionRow compact cost="0,002" duration="0,21 s" error="Timeout" onRetry={() => undefined} status="failed" statusLabel="Falhou" step={5} title="Enviar mensagem" tool="WhatsApp API" />
            <ExecutionRow compact status="pending" statusLabel="Pendente" step={6} title="Registrar interacao" tool="Taliya CRM API" />
            <span className="sb-batch8-execution-footer">
              <span>Ver trace completo</span>
              <span>{"->"}</span>
            </span>
          </div>
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
