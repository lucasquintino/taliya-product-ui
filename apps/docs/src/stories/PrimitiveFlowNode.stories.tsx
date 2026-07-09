import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Chip, ConnectorLine, FlowNode } from "@taliya/ui";

import { batch6SourceDescription, PrimitivePage, SourcePanel } from "./PrimitiveStoryUtils";

const meta: Meta<typeof FlowNode> = {
  title: "Primitives / UI / FlowNode",
  component: FlowNode,
  parameters: { layout: "fullscreen", docs: { description: { component: batch6SourceDescription } } }
};

export default meta;

function InteractiveFlow() {
  const [selected, setSelected] = useState("condition");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sb-batch6-flow-stack">
      <div className="sb-batch6-flow-row">
        <FlowNode
          description="Nova mensagem em WhatsApp"
          onClick={() => setSelected("trigger")}
          selected={selected === "trigger"}
          status={<Chip>Evento</Chip>}
          title="Gatilho / Entrada"
          variant="trigger"
        />
        <ConnectorLine startNode />
        <FlowNode
          description="Cliente elegivel e consentimento ativo"
          onClick={() => setSelected("condition")}
          selected={selected === "condition"}
          status={<Chip tone="success">Sim 63%</Chip>}
          title="Condicao"
          variant="condition"
        />
        <ConnectorLine startNode tone="success" />
        <FlowNode
          description="Enviar mensagem de apresentacao"
          onClick={() => setSelected("action")}
          selected={selected === "action"}
          status={<Chip tone="success">WhatsApp</Chip>}
          title="Acao"
          variant="action"
        />
        <ConnectorLine startNode />
        <FlowNode
          description="Revisao humana obrigatoria"
          onClick={() => setSelected("approval")}
          selected={selected === "approval"}
          status={<Chip tone="info">Copiloto</Chip>}
          title="Aprovacao"
          variant="approval"
        />
      </div>
      <div className="sb-batch6-flow-row sb-batch6-flow-row--secondary">
        <ConnectorLine startNode tone="danger" variant="curved" />
        <FlowNode
          description="Criar tarefa para atendimento"
          onClick={() => setSelected("fallback")}
          onMenu={() => setMenuOpen((open) => !open)}
          selected={selected === "fallback"}
          status={<Chip>{menuOpen ? "Menu aberto" : "Manual"}</Chip>}
          title="Fallback manual"
          variant="fallback"
        />
        <ConnectorLine arrow={false} startNode tone="neutral" variant="dashed" />
        <FlowNode blocked description="Recurso indisponivel no plano" status={<Chip tone="blocked">Bloqueado</Chip>} title="Plano / cota" variant="blocked" />
      </div>
    </div>
  );
}

export function AllStates() {
  return (
    <PrimitivePage>
      <main className="sb-source-page">
        <SourcePanel className="sb-source-panel--batch6-flow" number="1" title="FlowNode">
          <InteractiveFlow />
        </SourcePanel>
      </main>
    </PrimitivePage>
  );
}
