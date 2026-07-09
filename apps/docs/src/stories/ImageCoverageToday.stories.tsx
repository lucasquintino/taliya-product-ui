import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import {
  ActivityFeed,
  CrmDashboardPage,
  CrmOperationalPanel,
  CrmOperationalRows,
  TaskDrawer,
  crmEmptyShellSidebarItems
} from "@taliya/crm";
import type { CrmShellNavItem, CrmShellSidebarItem, TaskDrawerChecklistItem, TaskDrawerComment, TaskDrawerFact, TaskDrawerHistoryItem } from "@taliya/crm";
import {
  Button,
  Chip,
  InlineGroup
} from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const todayNavItems: CrmShellNavItem[] = [
  { id: "hoje", label: "Hoje", active: true },
  { id: "prioridades", label: "Prioridades" },
  { id: "aulas", label: "Aulas" },
  { id: "tarefas", label: "Tarefas" },
  { id: "aprovacoes", label: "Aprovações" },
  { id: "alertas", label: "Alertas" }
];

const todaySidebarItems: CrmShellSidebarItem[] = [
  ...crmEmptyShellSidebarItems,
  { id: "configuracoes", label: "Configuracoes", icon: "settings" }
];

const todaySidebarUtilityItems: CrmShellSidebarItem[] = [
  { id: "modo-noite", label: "Modo noite", icon: "moon" },
  { id: "modo-dia", label: "Modo dia", icon: "sun" }
];

const meta = {
  title: "CRM / Image Coverage / Hoje",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage das imagens 17-18 do dashboard Hoje. A composição usa shell, primitives e componentes oficiais; status semi-aprovável, não certificada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const todayTaskDrawerFacts: TaskDrawerFact[] = [
  { id: "priority", icon: "alert", label: "Prioridade", value: "Alta", tone: "danger" },
  { id: "deadline", icon: "calendar", label: "Prazo", value: "Hoje, 10:30" },
  { id: "owner", icon: "user", label: "Responsável", value: "Mariana" },
  { id: "origin", icon: "graduation", label: "Origem", value: "Agenda / Reposições" },
  { id: "object", icon: "database", label: "Objeto afetado", value: "Reposição · Ana Paula Martins" },
  { id: "description", icon: "calendar", label: "Descrição", value: "Confirmar se a aluna aceita o horário sugerido para reposição." },
  { id: "impact", icon: "tag", label: "Impacto", value: "1 crédito de reposição aguardando confirmação" },
  { id: "suggestion", icon: "sparkles", label: "Sugestão", value: "Quinta, 09:00 · Reformer Iniciante · 1 vaga" },
  { id: "channel", icon: "whatsapp", label: "Canal sugerido", value: "WhatsApp" },
  { id: "rule", icon: "graduation", label: "Criada por regra do CRM às 09:12", value: "" }
];

const todayTaskDrawerChecklist: TaskDrawerChecklistItem[] = [
  { id: "confirm-student", title: "Confirmar horário com a aluna" },
  { id: "reserve-slot", title: "Reservar vaga se houver aceite" },
  { id: "update-status", title: "Atualizar status da reposição" }
];

const todayTaskDrawerComments: TaskDrawerComment[] = [
  {
    id: "ana-paula",
    author: "Ana Paula",
    body: "Prefere manhãs, mas aceitou receber opções.",
    time: ""
  }
];

const todayTaskDrawerHistory: TaskDrawerHistoryItem[] = [
  { id: "latest", time: "09:12", body: "Sistema encontrou uma vaga compatível." }
];

function TodayDashboard({ selectedTask = false }: { selectedTask?: boolean }) {
  const [selectedRowId, setSelectedRowId] = useState(selectedTask ? "tasks:replacement" : "");
  const selectRows = (section: string) => ({
    onRowOpen: (row: { id: string }) => setSelectedRowId(`${section}:${row.id}`)
  });
  const withSelection = <T extends { id: string; selected?: boolean }>(section: string, rows: T[]) =>
    rows.map((row) => ({
      ...row,
      selected: row.selected || selectedRowId === `${section}:${row.id}`
    }));

  return (
    <>
      <CrmOperationalPanel icon="clipboardCheck" title="Checklist do dia">
        <CrmOperationalRows
          kind="checklist"
          {...selectRows("checklist")}
          rows={withSelection("checklist", [
            { id: "open", title: "Abrir o estúdio" },
            { id: "agenda", title: "Conferir agenda" },
            { id: "queue", title: "Revisar fila humana" },
            { id: "payments", title: "Checar pagamentos críticos" }
          ])}
        />
      </CrmOperationalPanel>

      <CrmOperationalPanel icon="sparkles" title="Agora">
        <CrmOperationalRows
          {...selectRows("now")}
          rows={withSelection("now", [
            {
              id: "human",
              title: "Conversas aguardando humano",
              meta: "WhatsApp · 3 conversas · maior espera 22 min · responsável Atendimento",
              icon: "message",
              tone: "info",
              status: "Urgente",
              statusTone: "danger"
            },
            {
              id: "replacement",
              title: "Reposições sem encaixe hoje",
              meta: "Agenda · 2 alunos · prazo hoje 16:00 · responsável Mariana",
              icon: "database",
              tone: "danger",
              status: "Hoje",
              statusTone: "warning"
            },
            {
              id: "teacher",
              title: selectedTask ? "Aula com chamada pendente" : "Professor precisa confirmar substituição",
              meta: selectedTask
                ? "Funcional · 10:00 · 8 alunos · responsável Recepção"
                : "Aula 14:00 · Sala 2 · impacto 8 alunos · responsável Coordenação",
              icon: "user",
              tone: "warning",
              status: "Pendente",
              statusTone: "warning"
            }
          ])}
        />
      </CrmOperationalPanel>

      <CrmOperationalPanel icon="calendar" title="Aulas de hoje">
        <CrmOperationalRows
          dense
          kind="schedule"
          {...selectRows("classes")}
          rows={withSelection("classes", [
            { id: "0800", title: "08:00", meta: "Pilates Solo · 10/12", tone: "info" },
            { id: "0900", title: "09:00", meta: "Funcional · 8/10", tone: "success" },
            { id: "1000", title: "10:00", meta: "Reformer · lotada", tone: "danger" },
            { id: "1400", title: "14:00", meta: "Pilates Solo · professor pendente", tone: "warning" }
          ])}
        />
      </CrmOperationalPanel>

      <CrmOperationalPanel badge={<Chip showDot={false}>12 aguardando</Chip>} icon="user" title="Fila humana">
        <CrmOperationalRows
          dense
          {...selectRows("queue")}
          rows={withSelection("queue", [
            { id: "whatsapp", title: "WhatsApp · Gustavo Lima", meta: "22 min · Atendimento", icon: "whatsapp", tone: "success" },
            { id: "agenda", title: "Agenda · Camila Souza", meta: "12 min · Mariana", icon: "calendar", tone: "info" },
            { id: "finance", title: "Financeiro · Ana Beatriz", meta: "9 min · Lucas", icon: "coins", tone: "warning" }
          ])}
        />
        <Button className="sb-image-coverage-today-panel__link" size="sm" variant="ghost">Ver fila completa</Button>
      </CrmOperationalPanel>

      <CrmOperationalPanel icon="alert" title="Bloqueios de hoje">
        <CrmOperationalRows
          dense
          {...selectRows("blocks")}
          rows={withSelection("blocks", [
            { id: "teacher", title: "Professor indisponível", meta: "impacta 2 aulas · 14:00", icon: "alert", tone: "danger" },
            { id: "room", title: "Sala 2 em conflito", meta: "4 alunos afetados", icon: "alert", tone: "danger" },
            { id: "contract", title: "Cadastro incompleto", meta: "bloqueia contrato", icon: "alert", tone: "danger" }
          ])}
        />
      </CrmOperationalPanel>

      <CrmOperationalPanel
        badge={<InlineGroup compact><Chip showDot={false}>7 pendentes</Chip><Chip showDot={false} tone="danger">2 atrasadas</Chip></InlineGroup>}
        icon="calendar"
        title="Tarefas de hoje"
      >
        <CrmOperationalRows
          dense
          {...selectRows("tasks")}
          rows={withSelection("tasks", [
            { id: "replacement", title: "Confirmar reposição com Ana Paula", meta: "10:30 · Mariana", selected: selectedTask, tone: "info" },
            { id: "contract", title: "Revisar contrato", meta: "14:00 · Lucas", tone: "danger" },
            { id: "risk", title: "Ligar para aluno em risco", meta: "16:00 · Juliana", tone: "info" }
          ])}
        />
      </CrmOperationalPanel>

      <CrmOperationalPanel badge={<Chip showDot={false}>3 pendentes</Chip>} compact icon="shield" title="Aprovações de hoje">
        <CrmOperationalRows
          compact
          dense
          {...selectRows("approvals")}
          rows={withSelection("approvals", [
            { id: "agent", title: "Mensagem do agente", meta: "risco baixo · 1 crédito", icon: "message", tone: "success" },
            { id: "schedule", title: "Alteração de agenda", meta: "impacta 4 alunos", icon: "calendar", tone: "warning" },
            { id: "replacement", title: "Comunicado de reposição", meta: "cota 82%", icon: "messageMore", tone: "info" }
          ])}
        />
      </CrmOperationalPanel>

      <CrmOperationalPanel
        badge={<InlineGroup compact><strong className="sb-image-coverage-today-money">R$ 1.820</strong><span>exigem ação hoje</span></InlineGroup>}
        compact
        icon="coins"
        title="Dinheiro hoje"
      >
        <CrmOperationalRows
          compact
          dense
          kind="money"
          {...selectRows("money")}
          rows={withSelection("money", [
            { id: "420a", title: "R$ 420", meta: "mensalidade vencida · aula 18:00", tone: "success" },
            { id: "980", title: "R$ 980", meta: "comprovante aguardando validação", tone: "success" },
            { id: "420b", title: "R$ 420", meta: "promessa vence hoje", tone: "success" }
          ])}
        />
      </CrmOperationalPanel>
    </>
  );
}

function TodayAfterContent({
  showHistory = false,
  historyScrollReserve = false
}: {
  showHistory?: boolean;
  historyScrollReserve?: boolean;
}) {
  return (
    <>
      {showHistory ? <ActivityFeed className="sb-image-coverage-today-history" /> : null}
      {historyScrollReserve ? <div aria-hidden="true" className="sb-image-coverage-today-scroll-reserve" /> : null}
    </>
  );
}

export function TodayShell({
  drawer = false,
  historyOnly = false,
  historyScrollReserve = false
}: {
  drawer?: boolean;
  historyOnly?: boolean;
  historyScrollReserve?: boolean;
}) {
  return (
    <CrmDashboardPage
        activeNavId="hoje"
        after={historyOnly ? null : <TodayAfterContent historyScrollReserve={historyScrollReserve} showHistory={historyScrollReserve} />}
        avatarSrc={image79Avatar}
        className="sb-image-coverage-today-shell"
        columns={historyOnly ? 1 : "today"}
        contentClassName="sb-image-coverage-today-content"
        dashboardClassName={historyOnly ? "sb-image-coverage-today-history-grid" : "sb-image-coverage-today-grid"}
        dashboardStackClassName="sb-image-coverage-today-page"
        drawerPlacement={drawer ? "viewport" : undefined}
        drawer={
          drawer ? (
            <TaskDrawer
              checklist={todayTaskDrawerChecklist}
              checklistTitle="Checklist"
              className="sb-image-coverage-today-drawer"
              comments={todayTaskDrawerComments}
              commentsTitle="Comentário recente"
              copilotSuggestion={null}
              facts={todayTaskDrawerFacts}
              footerLayout="conversation"
              history={todayTaskDrawerHistory}
              historyTitle="Última atividade"
              label="Tarefa"
              showChecklistProgress={false}
              showCommentsLink={false}
              statusLabel="Pendente"
              title="Confirmar reposição com Ana Paula"
            />
          ) : null
        }
        navItems={todayNavItems}
        pageHeaderRhythm="dashboard"
        sidebarItems={todaySidebarItems}
        stageClassName="sb-image-coverage-today-stage"
        subtitle="Studio Vila Mariana · Segunda, 11 de maio"
        title="Hoje"
        utilityItems={todaySidebarUtilityItems}
      >
        {historyOnly ? <ActivityFeed className="sb-image-coverage-today-history" /> : <TodayDashboard selectedTask={drawer} />}
      </CrmDashboardPage>
  );
}

export const Image17HojeBase: Story = {
  name: "17 hoje base",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 17_round-4.1A_hoje_01_acima-da-dobra.png.png. Status: em ajuste visual, não certificada 1:1."
      }
    }
  },
  render: () => <TodayShell />
};

export const Image18HojeDrawerTarefa: Story = {
  name: "18 hoje drawer tarefa",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 18_round-4.1A_hoje_02_drawer-tarefa.png.png. Status: em ajuste visual, não certificada 1:1."
      }
    }
  },
  render: () => <TodayShell drawer />
};

export const Image19HojeEstadoCritico: Story = {
  name: "19 hoje estado critico",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 19_round-4.1A_hoje_03_estado-critico-do-dia.png. Reusa a composicao oficial de Hoje para o estado critico."
      }
    },
    sourceImage: "19_round-4.1A_hoje_03_estado-critico-do-dia.png"
  },
  render: () => <TodayShell />
};

export const Image20HistoricoDeHoje: Story = {
  name: "20 histórico de hoje",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 20_round-4.1A_hoje_04_historico-de-hoje.png.png. Continuação vertical da página Hoje; usa o componente oficial ActivityFeed integrado abaixo do dashboard."
      }
    }
  },
  render: () => <TodayShell historyOnly />
};
