import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";

import {
  ClassCard,
  ConfigImpactPreview,
  CrmWorklistTable,
  ImportProgress,
  IntegrationStatusRow,
  InviteRow,
  PlanSummaryCard,
  RoleCard,
  RuleRow,
  SetupAgentChat,
  SetupBlockHeader,
  SetupBottomBar,
  SetupChoiceCard,
  SetupContentGrid,
  SetupImportSourceCard,
  SetupReviewPanel,
  SetupShell,
  SetupWelcome,
  StatusCard,
  WeeklyCalendar,
  WeeklyHoursGrid
} from "@taliya/crm";
import { Chip, IconButton, InlineAlert, List, Panel, PersonLabel } from "@taliya/ui";
import type { ComponentTone } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Image Coverage / Setup",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage oficial das imagens de onboarding/setup guiado. As composicoes usam SetupShell e componentes oficiais de setup; status em ajuste, nao aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

function SetupPage({
  step,
  children,
  agent,
  bottomBar
}: {
  step: number;
  children: ReactNode;
  agent?: ReactNode;
  bottomBar?: ReactNode;
}) {
  return (
    <div className="sb-image-coverage-remaining-setup-stage">
      <SetupShell
        agent={agent}
        bottomBar={bottomBar}
        className="sb-image-coverage-remaining-setup-shell"
        progress={Math.min(96, step * 11)}
        step={step}
      >
        {children}
      </SetupShell>
    </div>
  );
}

function SetupPanel({ children }: { children: ReactNode }) {
  return <div className="sb-image-coverage-remaining-setup-panel">{children}</div>;
}

function SetupTeamPreparedList() {
  return (
    <Panel>
      <h3>3. Equipe preparada</h3>
      <List>
        <InviteRow state="prepared" />
        <InviteRow invite={{ id: "carla-souza", initials: "CS", name: "Carla Souza", role: "Recepcao", email: "carla@studio.com", phone: "(11) 97777-2222" }} state="prepared" />
        <InviteRow state="incomplete" />
      </List>
      <InlineAlert tone="info">Os convites ficam preparados agora e serao enviados automaticamente quando o setup inicial for publicado.</InlineAlert>
    </Panel>
  );
}

function ClassesTable() {
  const rows: Array<{ id: string; name: string; teacher: string; schedule: string; capacity: string; fixed: string; vacancies: string; next: string; status: string; tone: ComponentTone; change: string }> = [
    { id: "reformer", name: "Reformer Intermediario", teacher: "Joao Silva", schedule: "Terca 17h", capacity: "5/6", fixed: "5 alunos", vacancies: "1 vaga", next: "Hoje 17h", status: "Ativa", tone: "success", change: "Aluno movido hoje" },
    { id: "pilates", name: "Pilates Solo", teacher: "Mariana Lopes", schedule: "Quinta 08h", capacity: "6/6", fixed: "6 alunos", vacancies: "Lotada", next: "Quinta 08h", status: "Cheia", tone: "danger", change: "Sem mudancas" },
    { id: "tower", name: "Tower", teacher: "A definir", schedule: "Segunda 19h", capacity: "3/5", fixed: "3 alunos", vacancies: "2 vagas", next: "Segunda 19h", status: "Com vaga", tone: "success", change: "Professor pendente" },
    { id: "alongamento", name: "Alongamento", teacher: "Camila Rocha", schedule: "Sexta 10h", capacity: "4/6", fixed: "4 alunos", vacancies: "2 vagas", next: "Sexta 10h", status: "Ativa", tone: "success", change: "Capacidade ajustada" },
    { id: "experimental", name: "Experimental", teacher: "Lucas Peres", schedule: "Quarta 14h", capacity: "2/6", fixed: "2 alunos", vacancies: "4 vagas", next: "Quarta 14h", status: "Temporaria", tone: "info", change: "Evento recorrente" },
    { id: "inicial", name: "Reformer Inicial", teacher: "A definir", schedule: "Terca 07h", capacity: "0/6", fixed: "0 alunos", vacancies: "6 vagas", next: "Terca 07h", status: "Pausada", tone: "neutral", change: "Pausada esta semana" }
  ];

  return (
    <CrmWorklistTable
      actionColumnWidth="44px"
      ariaLabel="Tabela de turmas"
      columns={[
        { key: "name", header: "Turma", sortable: true, width: "14%" },
        { key: "schedule", header: "Dia/horario", width: "10%" },
        { key: "teacher", header: "Professor da turma", render: (row) => <PersonLabel avatarSrc={row.teacher === "A definir" ? undefined : image79Avatar} name={row.teacher} size="xs" />, width: "16%" },
        { key: "capacity", header: "Capacidade", width: "9%" },
        { key: "fixed", header: "Alunos fixos", width: "10%" },
        { key: "vacancies", header: "Vagas", render: (row) => <Chip tone={row.vacancies === "Lotada" ? "danger" : "success"}>{row.vacancies}</Chip>, width: "10%" },
        { key: "next", header: "Proxima aula", width: "11%" },
        { key: "status", header: "Status", render: (row) => <Chip tone={row.tone}>{row.status}</Chip>, sortable: true, width: "9%" },
        { key: "change", header: "Ultima mudanca", width: "13%" }
      ]}
      pagination={{ itemsPerPage: "10", label: "1-6 de 18", page: 1, pageCount: 2 }}
      rowActions={() => <IconButton icon="more" label="Mais acoes da turma" size="sm" variant="ghost" />}
      rows={rows}
      selectedRowId="reformer"
    />
  );
}

export function SetupShellGlobalPage() {
  return (
    <SetupPage step={1}>
      <SetupPanel>
        <SetupBlockHeader />
        <SetupContentGrid>
          <StatusCard title="Studio" description="Dados principais preparados." state="ok" />
          <StatusCard title="Equipe" description="Convites pendentes." state="warning" />
          <StatusCard title="Canais" description="WhatsApp conectado." state="ok" />
        </SetupContentGrid>
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupAgentChatPage() {
  return (
    <SetupPage step={1} agent={<SetupAgentChat />}>
      <SetupPanel>
        <SetupBlockHeader />
        <Panel>
          <h3>Agente de configuracao</h3>
          <SetupAgentChat />
        </Panel>
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupWorkspaceConfigPage() {
  return (
    <SetupPage step={1}>
      <SetupPanel>
        <SetupBlockHeader />
        <SetupContentGrid>
          <SetupChoiceCard />
          <SetupChoiceCard state="recommended" />
          <SetupChoiceCard state="selected" />
        </SetupContentGrid>
        <ConfigImpactPreview />
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupStudioPage() {
  return (
    <SetupPage step={1}>
      <SetupPanel>
        <SetupBlockHeader title="Studio" />
        <WeeklyHoursGrid />
        <ConfigImpactPreview />
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupTeamPage() {
  return (
    <SetupPage step={2}>
      <SetupPanel>
        <SetupBlockHeader title="Equipe" />
        <Panel>
          <h3>1. Dono do studio</h3>
          <RoleCard
            avatarSrc={image79Avatar}
            email="leticia@studio.com"
            name="Leticia Ramos"
            phone="(11) 99999-0000"
            roleLabel="Dono/Admin"
            state="owner"
            statusLabel="Confirmado"
            selected
          />
        </Panel>
        <SetupTeamPreparedList />
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupChannelsPage() {
  return (
    <SetupPage step={3}>
      <SetupPanel>
        <SetupBlockHeader title="Canais" />
        <SetupContentGrid>
          <IntegrationStatusRow />
          <SetupChoiceCard state="selected" />
          <SetupChoiceCard state="disabled" />
        </SetupContentGrid>
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupPlansPage() {
  return (
    <SetupPage step={4}>
      <SetupPanel>
        <SetupBlockHeader title="Planos" />
        <SetupContentGrid>
          <SetupChoiceCard />
          <PlanSummaryCard />
          <RuleRow />
        </SetupContentGrid>
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupPaymentPage() {
  return (
    <SetupPage step={5}>
      <SetupPanel>
        <SetupBlockHeader title="Pagamento" />
        <SetupContentGrid>
          <SetupChoiceCard state="selected" />
          <IntegrationStatusRow />
          <StatusCard title="Pix" description="Metodo principal configurado." state="ok" />
        </SetupContentGrid>
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupStudentsImportPage() {
  return (
    <SetupPage step={6}>
      <SetupPanel>
        <SetupBlockHeader title="Alunos" />
        <SetupContentGrid>
          <SetupImportSourceCard />
          <ImportProgress />
          <StatusCard title="Duplicidades" description="8 registros precisam revisao." state="warning" />
        </SetupContentGrid>
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupClassesPage() {
  return (
    <SetupPage step={7}>
      <SetupPanel>
        <SetupBlockHeader title="Turmas" />
        <SetupContentGrid>
          <ClassCard />
          <ClassCard state="pending" />
          <ClassCard state="warning" />
        </SetupContentGrid>
        <ClassesTable />
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupAgendaPage() {
  return (
    <SetupPage step={8} bottomBar={<SetupBottomBar />}>
      <SetupPanel>
        <SetupBlockHeader title="Agenda" />
        <WeeklyCalendar />
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupReviewPage() {
  return (
    <SetupPage step={9} bottomBar={<SetupBottomBar />}>
      <SetupPanel>
        <SetupReviewPanel />
      </SetupPanel>
    </SetupPage>
  );
}

export function SetupWelcomePage() {
  return (
    <div className="sb-image-coverage-remaining-setup-stage">
      <SetupShell
        avatarSrc={image79Avatar}
        className="sb-image-coverage-remaining-setup-shell"
        layout="welcome"
        progress={0}
        status={null}
        step={1}
        studioName="Setup inicial"
      >
        <div className="sb-image-coverage-setup-welcome-main">
          <SetupWelcome />
        </div>
      </SetupShell>
    </div>
  );
}

export const Image51AOnboardingShellGlobal: Story = {
  name: "51A onboarding shell global",
  parameters: { sourceImage: "51A_round-4.1J_onboarding_shell-global-aprovado.png" },
  render: () => <SetupShellGlobalPage />
};

export const Image51BOnboardingAgenteConfiguracaoChat: Story = {
  name: "51B onboarding agente configuracao chat",
  parameters: { sourceImage: "51B_round-4.1J_onboarding_agente-configuracao-chat-aprovado.png" },
  render: () => <SetupAgentChatPage />
};

export const Image51COnboardingWorkspaceConfiguracao: Story = {
  name: "51C onboarding workspace configuracao",
  parameters: { sourceImage: "51C_round-4.1J_onboarding_workspace-configuracao-aprovado.png" },
  render: () => <SetupWorkspaceConfigPage />
};

export const Image51DOnboardingStudio: Story = {
  name: "51D onboarding bloco studio",
  parameters: { sourceImage: "51D_round-4.1J_onboarding_bloco-1-studio-v2-sem-nome-aprovado.png" },
  render: () => <SetupStudioPage />
};

export const Image51EOnboardingEquipe: Story = {
  name: "51E onboarding bloco equipe",
  parameters: { sourceImage: "51E_round-4.1J_onboarding_bloco-2-equipe-aprovado.png" },
  render: () => <SetupTeamPage />
};

export const Image51FOnboardingCanais: Story = {
  name: "51F onboarding bloco canais",
  parameters: { sourceImage: "51F_round-4.1J_onboarding_bloco-3-canais-aprovado.png" },
  render: () => <SetupChannelsPage />
};

export const Image51GOnboardingPlanos: Story = {
  name: "51G onboarding bloco planos",
  parameters: { sourceImage: "51G_round-4.1J_onboarding_bloco-4-planos-aprovado.png" },
  render: () => <SetupPlansPage />
};

export const Image51KOnboardingPagamento: Story = {
  name: "51K onboarding bloco pagamento",
  parameters: { sourceImage: "51K_round-4.1J_onboarding_bloco-5-pagamento-aprovado.png" },
  render: () => <SetupPaymentPage />
};

export const Image51HOnboardingAlunos: Story = {
  name: "51H onboarding bloco alunos",
  parameters: { sourceImage: "51H_round-4.1J_onboarding_bloco-5-alunos-aprovado.png" },
  render: () => <SetupStudentsImportPage />
};

export const Image51IOnboardingTurmas: Story = {
  name: "51I onboarding bloco turmas",
  parameters: { sourceImage: "51I_round-4.1J_onboarding_bloco-6-turmas-aprovado.png" },
  render: () => <SetupClassesPage />
};

export const Image51JOnboardingAgenda: Story = {
  name: "51J onboarding bloco agenda",
  parameters: { sourceImage: "51J_round-4.1J_onboarding_bloco-7-agenda-aprovado.png" },
  render: () => <SetupAgendaPage />
};

export const Image51LOnboardingRevisao: Story = {
  name: "51L onboarding bloco revisao",
  parameters: { sourceImage: "51L_round-4.1J_onboarding_bloco-9-revisao-aprovado.png" },
  render: () => <SetupReviewPage />
};

export const Image78OnboardingBemVindo: Story = {
  name: "78 onboarding bem vindo setup guiado",
  parameters: { sourceImage: "78_round-4.1Q_onboarding_bem-vindo-taliya-setup-guiado-aprovado.png" },
  render: () => <SetupWelcomePage />
};
