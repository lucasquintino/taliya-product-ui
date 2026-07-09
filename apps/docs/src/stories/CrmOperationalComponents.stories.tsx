import type { Meta } from "@storybook/react-vite";

import { CrmOperationalPanel, CrmOperationalRow, CrmOperationalRows } from "@taliya/crm";
import type { CrmOperationalRowData } from "@taliya/crm";
import { Chip } from "@taliya/ui";

const meta: Meta = {
  title: "CRM / Operational / Components",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componentes operacionais oficiais do CRM Product Shell. Usados pelas telas Hoje/imagens 17-18 e reutilizaveis em dashboards, filas, bloqueios, tarefas e aprovacoes."
      }
    }
  }
};

export default meta;

const rows: CrmOperationalRowData[] = [
  { id: "human", title: "Conversas aguardando humano", meta: "WhatsApp · 3 conversas · maior espera 22 min", icon: "message", tone: "info" as const, status: "Urgente", statusTone: "danger" as const },
  { id: "replace", title: "Reposições sem encaixe hoje", meta: "Agenda · 2 alunos · prazo hoje 16:00", icon: "database", tone: "danger" as const, status: "Hoje", statusTone: "warning" as const },
  { id: "teacher", title: "Professor precisa confirmar substituição", meta: "Aula 14:00 · Sala 2 · impacto 8 alunos", icon: "user", tone: "warning" as const, status: "Pendente", statusTone: "warning" as const }
];

export function OperationalPanelAllStates() {
  return (
    <div className="sb-crm-operational-story sb-crm-operational-story--panel">
      <CrmOperationalPanel badge={<Chip showDot={false}>3 pendentes</Chip>} icon="sparkles" title="Agora">
        <CrmOperationalRows rows={rows} />
      </CrmOperationalPanel>
      <CrmOperationalPanel compact icon="shield" title="Aprovações de hoje">
        <CrmOperationalRows compact dense rows={rows.map((row) => ({ ...row, status: undefined }))} />
      </CrmOperationalPanel>
    </div>
  );
}

export function OperationalRowAllStates() {
  return (
    <div className="sb-crm-operational-story sb-crm-operational-story--row">
      <CrmOperationalRow row={rows[0]!} />
      <CrmOperationalRow row={{ ...rows[1]!, selected: true }} />
      <CrmOperationalRow dense row={rows[2]!} />
      <CrmOperationalRow compact dense row={{ id: "money", title: "R$ 420", meta: "mensalidade vencida · aula 18:00", tone: "success" }} kind="money" />
    </div>
  );
}
