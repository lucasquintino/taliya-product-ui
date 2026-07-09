import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { OperationActivityTable, type OperationActivityTableRow } from "@taliya/crm";

import source13NikkiOlaw from "../assets/source13-nikki-olaw.png";
import source23JoaoSilva from "../assets/source23-comment-joao-silva.png";
import source24MarinaLopes from "../assets/source24-marina-lopes.png";
import source25SamFrank from "../assets/source25-sam-frank.png";

import { PrimitiveMatrix, PrimitivePage, PrimitiveState } from "./PrimitiveStoryUtils";

const meta = {
  title: "CRM / Timeline / OperationActivityTable",
  component: OperationActivityTable,
  parameters: {
    docs: {
      description: {
        component:
          "Componente oficial extraido da area Atividade recente da imagem 21 de Operacao. Usado pelas imagens 21-22; cobre linha selecionada, hover/focus via CSS, loading, empty e blocked."
      }
    }
  }
} satisfies Meta<typeof OperationActivityTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const sourceRows: OperationActivityTableRow[] = [
  {
    id: "marina-proof",
    time: "10:24",
    actor: "Marina Lopes",
    avatarSrc: source24MarinaLopes,
    action: "assumiu a pendência",
    object: "Comprovante da Marina",
    meta: "Tarefa · Financeiro",
    owner: "Recepção",
    status: "assumed",
    statusLabel: "Assumido"
  },
  {
    id: "sam-pedro",
    time: "10:12",
    actor: "Sam Frank",
    avatarSrc: source25SamFrank,
    action: "concluiu a pendência",
    object: "Comprovante do Pedro",
    meta: "Tarefa · Financeiro",
    owner: "Recepção",
    status: "resolved",
    statusLabel: "Resolvido"
  },
  {
    id: "joao-whatsapp",
    time: "09:48",
    actor: "João Silva",
    avatarSrc: source23JoaoSilva,
    action: "bloqueou a pendência",
    object: "WhatsApp com falha de envio",
    meta: "Tarefa · Sistema",
    owner: "Suporte",
    status: "blocked",
    statusLabel: "Bloqueado"
  },
  {
    id: "nikki-julia",
    time: "09:31",
    actor: "Nikki Clew",
    avatarSrc: source13NikkiOlaw,
    action: "adicionou comentário em",
    object: "Conversa da Julia aguardando humano",
    meta: "Tarefa · Inbox",
    owner: "Atendimento",
    status: "waiting",
    statusLabel: "Aguardando"
  }
];

function OperationActivityTableAllStates() {
  const [selectedId, setSelectedId] = useState("");

  return (
    <PrimitivePage>
      <div className="sb-crm-operation-activity-table-story">
        <PrimitiveState label="source interactive">
          <OperationActivityTable className="sb-crm-operation-activity-table-demo" rows={sourceRows} selectedId={selectedId} onRowOpen={(row) => setSelectedId(row.id)} />
        </PrimitiveState>
        <PrimitiveMatrix>
          <PrimitiveState label="loading">
            <OperationActivityTable state="loading" />
          </PrimitiveState>
          <PrimitiveState label="empty">
            <OperationActivityTable state="empty" />
          </PrimitiveState>
          <PrimitiveState label="blocked">
            <OperationActivityTable state="blocked" />
          </PrimitiveState>
        </PrimitiveMatrix>
      </div>
    </PrimitivePage>
  );
}

export const AllStates: Story = {
  name: "All States",
  render: () => <OperationActivityTableAllStates />
};
