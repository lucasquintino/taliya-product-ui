import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";

import type {
  PermissionMatrixRow,
  SettingsAgendaRuleValues,
  SettingsNotificationChannelId,
  SettingsNotificationFrequencyId,
  SettingsNotificationRuleValue,
  SettingsSectionRow,
  SettingsStudioField,
  SettingsTeamMember,
  SetupPlanField
} from "@taliya/crm";

import {
  CrmDashboardPage,
  CrmRightPanelPage,
  SettingsAgentPanel,
  SettingsAgendaWorkspace,
  SettingsHubCard,
  SettingsChannelsWorkspace,
  SettingsNotificationsWorkspace,
  SettingsPaymentsWorkspace,
  SettingsPlansWorkspace,
  SettingsPermissionsWorkspace,
  SettingsStudioWorkspace,
  SettingsTeamWorkspace,
  setupPlansDefaultFieldValues,
  settingsPermissionsDefaultRows,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import { Breadcrumb, Chip } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Image Coverage / Configuracoes",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage oficial das imagens de Configuracoes. As variantes usam shell CRM e componentes oficiais de configuracao; status em ajuste, nao aprovada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const settingsNavItems = [
  { id: "hoje", label: "Hoje" },
  { id: "tarefas", label: "Tarefas" },
  { id: "aprovacoes", label: "Aprovacoes" },
  { id: "incidentes", label: "Incidentes" },
  { id: "agentes", label: "Agentes" },
  { id: "auditoria", label: "Auditoria" },
  { id: "relatorios", label: "Relatorios" }
];

function settingsShellProps({
  title,
  subtitle,
  pageHeaderActions
}: {
  title: string;
  subtitle: string;
  pageHeaderActions?: ReactNode;
}) {
  return {
    activeUtilityId: "configuracoes",
    avatarSrc: image79Avatar,
    navItems: settingsNavItems,
    pageHeaderActions,
    sidebarItems: crmEmptyShellSidebarItems,
    subtitle,
    title,
    utilityItems: crmEmptyShellSidebarUtilityItems
  };
}

const settingsHubItems = [
  { description: "Dados, unidades e horários.", icon: "slidersRound", id: "studio", state: "ready", title: "Studio" },
  { description: "Pessoas que acessam o Taliya.", icon: "users", id: "equipe", state: "invite-pending", title: "Equipe" },
  { description: "O que cada papel pode fazer.", icon: "shield", id: "permissoes", state: "review", title: "Permissões" },
  { description: "WhatsApp, email e redes.", icon: "whatsapp", id: "canais", state: "connected", title: "Canais" },
  { description: "O que o aluno compra.", icon: "shoppingCart", id: "planos", state: "ready", title: "Planos e modelos" },
  { description: "Cobrança, baixa e Pagamentos Taliya.", icon: "creditCard", id: "pagamentos", state: "pending", title: "Pagamentos e financeiro" },
  { description: "Feriados, bloqueios e encaixes.", icon: "calendar", id: "agenda", state: "ready", title: "Agenda" },
  { description: "Alertas internos por papel.", icon: "bell", id: "notificacoes", state: "ready", title: "Notificações" }
] as const;

const createPermissionRows = (): PermissionMatrixRow[] => settingsPermissionsDefaultRows.map((row) => ({ ...row }));

const initialStudioValues: Record<SettingsStudioField, string> = {
  studioName: "Studio Leticia",
  publicName: "Studio Leticia",
  mainUnit: "Unidade Centro",
  address: "Rua das Flores, 120",
  city: "Sao Paulo",
  state: "SP",
  postalCode: "01001-000"
};

const initialTeamMembers: SettingsTeamMember[] = [
  { id: "leticia", name: "Leticia Ramos", email: "leticia@studio.com", role: "Dono/Admin", status: "active", lastAccess: "Hoje, 09:42" },
  { id: "carla", name: "Carla Souza", email: "carla@studio.com", role: "Recepcao", status: "active", lastAccess: "Ontem, 18:15" },
  { id: "ana", name: "Ana Martins", email: "ana@studio.com", role: "Professor", status: "invitePending", lastAccess: "Convite enviado hoje" }
];

const createPlanFields = (): Record<SetupPlanField, string> => ({ ...setupPlansDefaultFieldValues });

const initialPaymentRuleRows: SettingsSectionRow[] = [
  { id: "due-date", icon: "calendar", iconTone: "info", label: "Vencimento padrão", value: "Dia 10" },
  { id: "late-tolerance", icon: "clock", iconTone: "warning", label: "Tolerância de atraso", value: "3 dias" },
  { id: "delinquent-after-tolerance", icon: "alert", iconTone: "warning", label: "Marcar inadimplente", value: "Após tolerância" },
  { id: "manual-settlement", icon: "tag", iconTone: "info", label: "Baixa manual", value: "Permitida", control: "toggle", checked: true },
  { id: "simple-discount", icon: "percent", iconTone: "success", label: "Desconto simples", value: "Até 10%" },
  { id: "cancel-charge", icon: "x", iconTone: "danger", label: "Cancelar cobrança", value: "Exige aprovação" }
];

const initialAgendaRules: SettingsAgendaRuleValues = { waitlist: true, fitIns: "approval", callTolerance: "10" };

const initialFrequencyRules: Record<SettingsNotificationFrequencyId, SettingsNotificationRuleValue> = {
  critical: { value: "immediate", enabled: true },
  operational: { value: "daily", enabled: true },
  informative: { value: "weekly", enabled: true },
  "non-critical": { value: "silent-after-hours", enabled: true }
};

const initialChannelRules: Record<SettingsNotificationChannelId, SettingsNotificationRuleValue> = {
  taliya: { value: "enabled", enabled: true },
  email: { value: "owner", enabled: true },
  whatsapp: { value: "critical", enabled: true },
  "after-hours": { value: "critical", enabled: true }
};

export function SettingsHubPage() {
  const [, setOpenedSettingId] = useState("");

  return (
    <CrmDashboardPage
      columns={4}
      layoutVariant="settings-hub"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }]} />}
      pageHeaderRhythm="settings-hub"
      topNavSelection="none"
      {...settingsShellProps({ subtitle: "Ajustes do CRM depois do go-live.", title: "Configurações" })}
    >
      {settingsHubItems.map((item) => (
        <SettingsHubCard
          description={item.description}
          icon={item.icon}
          key={item.id}
          onOpen={() => setOpenedSettingId(item.id)}
          state={item.state}
          title={item.title}
        />
      ))}
    </CrmDashboardPage>
  );
}

export function SettingsStudioPage() {
  const initialDays = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const [activeDays, setActiveDays] = useState(initialDays);
  const [savedDays, setSavedDays] = useState(initialDays);
  const [scheduleMode, setScheduleMode] = useState<"continuous" | "break">("continuous");
  const [savedScheduleMode, setSavedScheduleMode] = useState<"continuous" | "break">("continuous");
  const [studioValues, setStudioValues] = useState(initialStudioValues);
  const [savedStudioValues, setSavedStudioValues] = useState(initialStudioValues);
  const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
  const [, setLastAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <SettingsStudioWorkspace
          activeDays={activeDays}
          onActiveDaysChange={(days) => { setActiveDays(days); setSaveState("dirty"); }}
          onCancel={() => { setActiveDays(savedDays); setScheduleMode(savedScheduleMode); setStudioValues(savedStudioValues); setSaveState("saved"); }}
          onFieldChange={(field, value) => { setStudioValues((current) => ({ ...current, [field]: value })); setSaveState("dirty"); }}
          onSave={() => { setSavedDays(activeDays); setSavedScheduleMode(scheduleMode); setSavedStudioValues(studioValues); setSaveState("saved"); }}
          onScheduleModeChange={(mode) => { setScheduleMode(mode); setSaveState("dirty"); }}
          saveState={saveState}
          scheduleMode={scheduleMode}
          values={studioValues}
        />
      )}
      panel={<SettingsAgentPanel insights={[{ id: "schedule", content: "Horários institucionais delimitam quando o studio pode operar; aulas existentes não são movidas." }, { id: "unit", content: "Nome, unidade e endereço aparecem em comunicações e registros operacionais." }]} introduction="Mudanças no horário institucional não movem aulas já criadas. Conflitos aparecem em Agenda." onHelp={() => setLastAction("help")} onQuestionSelect={(question) => setLastAction(`question:${question}`)} onSend={(message) => setLastAction(`send:${message}`)} placeholder="Pergunte sobre o studio..." questions={["Isso muda aulas já marcadas?", "Onde edito horários por dia?", "Posso cadastrar outra unidade?", "O que muda ao salvar?"]} role="Ajudando em Studio" />}
      browserUrl="https://app.taliya.com/app/configuracoes/studio"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Studio" }]} />}
      pageHeaderRhythm="stacked"
      rightPanelVariant="settings"
      topNavSelection="none"
      {...settingsShellProps({ pageHeaderActions: <><Chip tone="success">Publicado</Chip><Chip tone={saveState === "dirty" ? "warning" : "neutral"}>{saveState === "dirty" ? "Alteração manual" : "Sem alterações"}</Chip></>, subtitle: "Dados, unidade e horários institucionais.", title: "Studio" })}
    />
  );
}

export function SettingsTeamPage() {
  const [members, setMembers] = useState(() => initialTeamMembers.map((member) => ({ ...member })));
  const [savedMembers, setSavedMembers] = useState(() => initialTeamMembers.map((member) => ({ ...member })));
  const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
  const [, setLastAction] = useState("");
  const activeMembers = members.filter((member) => member.status === "active").length;
  const pendingInvites = members.filter((member) => member.status === "invitePending").length;
  return (
    <CrmRightPanelPage
      main={<SettingsTeamWorkspace members={members} onCancel={() => { setMembers(savedMembers.map((member) => ({ ...member }))); setSaveState("saved"); }} onInvite={() => setLastAction("invite")} onMemberAction={(member, action) => { setLastAction(action); if (action === "deactivate" || action === "reactivate") setMembers((current) => current.map((item) => item.id === member.id ? { ...item, status: action === "deactivate" ? "inactive" : "active" } : item)); setSaveState("dirty"); }} onOpenPermissions={() => setLastAction("permissions")} onSave={() => { setSavedMembers(members.map((member) => ({ ...member }))); setSaveState("saved"); }} saveState={saveState} />}
      panel={<SettingsAgentPanel insights={[{ id: "access", content: "Desativar uma pessoa remove o acesso sem apagar o histórico operacional." }, { id: "roles", content: "O papel principal começa aqui; limites detalhados continuam em Permissões." }]} introduction="Equipe gerencia acesso e papel principal. Permissões detalhadas continuam na página Permissões." onHelp={() => setLastAction("help")} onQuestionSelect={(question) => setLastAction(`question:${question}`)} onSend={(message) => setLastAction(`send:${message}`)} placeholder="Pergunte sobre a equipe..." questions={["Quando o convite é enviado?", "O que acontece ao desativar?", "Onde altero permissões?", "Quem pode convidar pessoas?"]} role="Ajudando em Equipe" />}
      browserUrl="https://app.taliya.com/app/configuracoes/equipe"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Equipe" }]} />}
      pageHeaderRhythm="stacked"
      rightPanelVariant="settings"
      topNavSelection="none"
      {...settingsShellProps({ pageHeaderActions: <><Chip tone="success">{activeMembers} ativos</Chip><Chip tone="warning">{pendingInvites} convite pendente</Chip></>, subtitle: "Pessoas que acessam o Taliya.", title: "Equipe" })}
    />
  );
}

export function SettingsChannelsPage() {
  const [whatsAppState, setWhatsAppState] = useState<"business" | "personal" | "unknown" | "missing">("business");
  const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
  const [, setLastAction] = useState("");
  return (
    <CrmRightPanelPage
      main={<SettingsChannelsWorkspace connectionStatus="connected" onCancel={() => { setWhatsAppState("business"); setSaveState("saved"); }} onConnectWhatsApp={() => setLastAction("test-connection")} onSave={() => setSaveState("saved")} onWhatsAppStateChange={(state) => { setWhatsAppState(state); setSaveState("dirty"); }} saveState={saveState} whatsAppState={whatsAppState} />}
      panel={<SettingsAgentPanel insights={[{ id: "whatsapp", content: "A conexão oficial permite atender pelo CRM sem impedir o uso do WhatsApp Business no celular." }, { id: "scope", content: "Esta página registra canais; mensagens e automações são configuradas nos fluxos correspondentes." }]} introduction="Canais define os contatos oficiais. Mensagens, campanhas e automações continuam fora desta página." onHelp={() => setLastAction("help")} onQuestionSelect={(question) => setLastAction(`question:${question}`)} onSend={(message) => setLastAction(`send:${message}`)} placeholder="Pergunte sobre canais..." questions={["Posso continuar usando o celular?", "Como testo a conexão?", "Onde configuro mensagens?", "O que muda ao salvar?"]} role="Ajudando em Canais" />}
      browserUrl="https://app.taliya.com/app/configuracoes/canais"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Canais" }]} />}
      pageHeaderRhythm="stacked"
      rightPanelVariant="settings"
      topNavSelection="none"
      {...settingsShellProps({ pageHeaderActions: <><Chip tone="success">WhatsApp conectado</Chip><Chip tone="success">E-mail pronto</Chip></>, subtitle: "WhatsApp, e-mail e redes oficiais.", title: "Canais" })}
    />
  );
}

export function SettingsPlansPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<"weekly" | "pack" | "trial">("pack");
  const [fieldValues, setFieldValues] = useState(createPlanFields);
  const [savedFieldValues, setSavedFieldValues] = useState(createPlanFields);
  const initialPlanStates = {
    weekly: { label: "Ativo", tone: "success" as const, studentsUsing: 18 },
    pack: { label: "Ativo", tone: "success" as const, studentsUsing: 7 },
    trial: { label: "Inativo", tone: "neutral" as const, studentsUsing: 0 }
  };
  const [planStates, setPlanStates] = useState(initialPlanStates);
  const [savedPlanStates, setSavedPlanStates] = useState(initialPlanStates);
  const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
  const [, setLastAction] = useState("");
  return (
    <CrmRightPanelPage
      main={<SettingsPlansWorkspace fieldValues={fieldValues} onCancel={() => { setFieldValues({ ...savedFieldValues }); setPlanStates({ ...savedPlanStates }); setSaveState("saved"); }} onFieldChange={(field, value) => { setFieldValues((current) => ({ ...current, [field]: value })); setSaveState("dirty"); }} onPlanAction={(planId, action) => { setLastAction(action); if (action === "deactivate") setPlanStates((current) => ({ ...current, [planId]: { ...current[planId], label: "Inativo", tone: "neutral" } })); setSaveState("dirty"); }} onPlanSelect={setSelectedPlanId} onSave={() => { setSavedFieldValues({ ...fieldValues }); setSavedPlanStates({ ...planStates }); setSaveState("saved"); }} planStates={planStates} saveState={saveState} selectedPlanId={selectedPlanId} />}
      panel={<SettingsAgentPanel insights={[{ id: "consumption", content: "Quantidade, validade e recorrência definem o saldo que o aluno pode consumir." }, { id: "impact", content: "Ao inativar um plano, alunos atuais preservam o vínculo e novos contratos deixam de usá-lo." }]} introduction="Planos e modelos define o que o aluno compra e como aulas, faltas e reposições consomem esse direito." onHelp={() => setLastAction("help")} onQuestionSelect={(question) => setLastAction(`question:${question}`)} onSend={(message) => setLastAction(`send:${message}`)} placeholder="Pergunte sobre planos..." questions={["O que acontece ao inativar?", "Como funciona o saldo?", "Onde defino horário fixo?", "Quem é afetado ao salvar?"]} role="Ajudando em Planos" />}
      browserUrl="https://app.taliya.com/app/configuracoes/financeiro/modelos"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Planos e modelos" }]} />}
      pageHeaderRhythm="stacked"
      rightPanelVariant="settings"
      topNavSelection="none"
      {...settingsShellProps({ pageHeaderActions: <><Chip tone="success">2 ativos</Chip><Chip tone="neutral">1 inativo</Chip><Chip tone="warning">7 alunos afetados</Chip></>, subtitle: "O que o aluno compra e como utiliza.", title: "Planos e modelos" })}
    />
  );
}

export function SettingsPermissionsPage() {
  const [selectedRoleId, setSelectedRoleId] = useState("owner");
  const [savedRows, setSavedRows] = useState(createPermissionRows);
  const [permissionRows, setPermissionRows] = useState(createPermissionRows);
  const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
  const [, setLastAction] = useState("");

  const updatePermission = (rowId: string, value: string | boolean) => {
    setPermissionRows((rows) => rows.map((row) => {
      if (row.id !== rowId) return row;
      return row.control === "toggle"
        ? { ...row, checked: Boolean(value), currentValue: value ? "Ligado" : "Desligado", dirty: true }
        : { ...row, value: String(value), currentValue: row.options.find((option) => option.value === value)?.label ?? String(value), dirty: true };
    }));
    setSaveState("dirty");
  };

  return (
    <CrmRightPanelPage
      main={(
        <SettingsPermissionsWorkspace
          onCancel={() => { setPermissionRows(savedRows.map((row) => ({ ...row }))); setSaveState("saved"); }}
          onPermissionSelect={(rowId, value) => updatePermission(rowId, value)}
          onPermissionToggle={(rowId, checked) => updatePermission(rowId, checked)}
          onRoleSelect={setSelectedRoleId}
          onSave={() => { const next = permissionRows.map((row) => ({ ...row, dirty: false })); setPermissionRows(next); setSavedRows(next); setSaveState("saved"); setLastAction("save"); }}
          permissionRows={permissionRows}
          saveState={saveState}
          selectedRoleId={selectedRoleId}
        />
      )}
      panel={(
        <SettingsAgentPanel
          onHelp={() => setLastAction("help")}
          onQuestionSelect={(question) => setLastAction(`question:${question}`)}
          onSend={() => setLastAction("message")}
        />
      )}
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Permissões" }]} />}
      pageHeaderRhythm="stacked"
      browserUrl="https://app.taliya.com/app/configuracoes/permissoes"
      rightPanelVariant="settings-permissions"
      topNavSelection="none"
      {...settingsShellProps({
        pageHeaderActions: <><Chip tone="success">Publicado</Chip><Chip tone="warning">Revisar 2 permissões</Chip><Chip tone="neutral">Alteração manual</Chip></>,
        subtitle: "Defina o que cada papel pode fazer no CRM.",
        title: "Permissões"
      })}
    />
  );
}

export function SettingsPaymentsPage() {
  const [savedRules, setSavedRules] = useState(() => initialPaymentRuleRows.map((row) => ({ ...row })));
  const [ruleRows, setRuleRows] = useState(() => initialPaymentRuleRows.map((row) => ({ ...row })));
  const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
  const [, setLastAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <SettingsPaymentsWorkspace
          onActivate={() => setLastAction("activate")}
          onCancel={() => { setRuleRows(savedRules.map((row) => ({ ...row }))); setSaveState("saved"); }}
          onMethodSelect={(method) => setLastAction(`method:${method}`)}
          onRuleAction={(row) => { setLastAction(`rule:${row.id}`); setSaveState("dirty"); }}
          onRuleToggle={(row, checked) => { setRuleRows((rows) => rows.map((item) => item.id === row.id ? { ...item, checked } : item)); setSaveState("dirty"); }}
          onSave={() => { setSavedRules(ruleRows.map((row) => ({ ...row }))); setSaveState("saved"); setLastAction("save"); }}
          onTechnicalIntegration={() => setLastAction("technical-integration")}
          ruleRows={ruleRows}
          saveState={saveState}
        />
      )}
      panel={(
        <SettingsAgentPanel
          insights={[
            { id: "online", content: "Pagamentos Taliya ativa Pix online, cartão online, recorrência e baixa automática." },
            { id: "provider", content: "Problemas técnicos do provedor ficam em Integrações." }
          ]}
          introduction="Esta página define como o studio cobra, recebe e baixa pagamentos de alunos. Assinatura do studio com a Taliya fica em Billing."
          onHelp={() => setLastAction("help")}
          onQuestionSelect={(question) => setLastAction(`question:${question}`)}
          onSend={() => setLastAction("message")}
          placeholder="Pergunte sobre pagamentos..."
          questions={[
            "O que continua manual?",
            "O que muda ao ativar Pagamentos Taliya?",
            "Onde vejo falha técnica?",
            "Isso é Billing Taliya?"
          ]}
          role="Ajudando em pagamentos"
        />
      )}
      browserUrl="https://app.taliya.com/app/configuracoes/financeiro/pagamentos"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Pagamentos e financeiro" }]} />}
      pageHeaderRhythm="stacked"
      rightPanelVariant="settings-payments"
      topNavSelection="none"
      {...settingsShellProps({
        pageHeaderActions: <><Chip tone="success">Manual ativo</Chip><Chip tone="warning">Pagamentos Taliya pendente</Chip><Chip tone="warning">Revisar ativacao</Chip></>,
        subtitle: "Cobranca, baixa e Pagamentos Taliya.",
        title: "Pagamentos e financeiro"
      })}
    />
  );
}

export function SettingsAgendaPage() {
  const [savedRules, setSavedRules] = useState(initialAgendaRules);
  const [ruleValues, setRuleValues] = useState(initialAgendaRules);
  const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
  const [, setLastAction] = useState("");

  return (
    <CrmRightPanelPage
      main={(
        <SettingsAgendaWorkspace
          onAddBlock={() => setLastAction("add-block")}
          onAddException={() => setLastAction("add-exception")}
          onCancel={() => { setRuleValues(savedRules); setSaveState("saved"); }}
          onRowAction={(rowId, action) => setLastAction(`${action}:${rowId}`)}
          onRuleChange={(ruleId, value) => { setRuleValues((rules) => ({ ...rules, [ruleId]: value })); setSaveState("dirty"); }}
          onSave={() => { setSavedRules(ruleValues); setSaveState("saved"); setLastAction("save"); }}
          ruleValues={ruleValues}
          saveState={saveState}
        />
      )}
      panel={(
        <SettingsAgentPanel
          insights={[]}
          introduction="Agenda define exceções e comportamento básico do calendário. A agenda do dia continua em Agenda."
          onHelp={() => setLastAction("help")}
          onQuestionSelect={(question) => setLastAction(`question:${question}`)}
          onSend={() => setLastAction("message")}
          placeholder="Pergunte sobre agenda..."
          questions={[
            "Isso muda aulas já marcadas?",
            "Onde edito turmas?",
            "Lista de espera fica aqui?",
            "O que acontece em feriados?"
          ]}
          role="Ajudando em agenda"
        />
      )}
      browserUrl="https://app.taliya.com/app/configuracoes/agenda"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Agenda" }]} />}
      pageHeaderRhythm="stacked"
      rightPanelVariant="settings-agenda"
      topNavSelection="none"
      {...settingsShellProps({
        pageHeaderActions: <><Chip icon="checkCircle" showDot={false} tone="success">Publicado</Chip><Chip icon="lock" showDot={false} tone="warning">2 bloqueios ativos</Chip><Chip icon="alert" showDot={false} tone="danger">Revisar 1 conflito</Chip></>,
        subtitle: "Feriados, bloqueios e encaixes.",
        title: "Agenda"
      })}
    />
  );
}

export function SettingsNotificationsPage() {
  const [savedFrequencyRules, setSavedFrequencyRules] = useState(initialFrequencyRules);
  const [frequencyRules, setFrequencyRules] = useState(initialFrequencyRules);
  const [savedChannelRules, setSavedChannelRules] = useState(initialChannelRules);
  const [channelRules, setChannelRules] = useState(initialChannelRules);
  const [saveState, setSaveState] = useState<"dirty" | "saved">("saved");
  const [, setLastAction] = useState("");

  const updateRule = <Id extends string,>(rules: Record<Id, SettingsNotificationRuleValue>, id: Id, value: string | boolean) => ({
    ...rules,
    [id]: typeof value === "boolean" ? { ...rules[id], enabled: value } : { ...rules[id], value }
  });

  return (
    <CrmRightPanelPage
      main={(
        <SettingsNotificationsWorkspace
          channelRules={channelRules}
          frequencyRules={frequencyRules}
          onCancel={() => { setChannelRules(savedChannelRules); setFrequencyRules(savedFrequencyRules); setSaveState("saved"); }}
          onChannelChange={(channelId, value) => { setChannelRules((rules) => updateRule(rules, channelId as SettingsNotificationChannelId, value)); setSaveState("dirty"); }}
          onFrequencyChange={(alertId, value) => { setFrequencyRules((rules) => updateRule(rules, alertId as SettingsNotificationFrequencyId, value)); setSaveState("dirty"); }}
          onRoleSelect={(roleId) => setLastAction(`role:${roleId}`)}
          onSave={() => { setSavedChannelRules(channelRules); setSavedFrequencyRules(frequencyRules); setSaveState("saved"); setLastAction("save"); }}
          saveState={saveState}
        />
      )}
      panel={(
        <SettingsAgentPanel
          insights={[]}
          introduction="Notificações definem quem da equipe deve ser avisado. Mensagens para alunos ficam nos fluxos e nas áreas que enviam a mensagem."
          onHelp={() => setLastAction("help")}
          onQuestionSelect={(question) => setLastAction(`question:${question}`)}
          onSend={(message) => setLastAction(`send:${message}`)}
          placeholder="Pergunte sobre notificações..."
          questions={[
            "Quem recebe alerta crítico?",
            "Professor recebe alerta de todos os alunos?",
            "Isso envia mensagem para aluno?",
            "O que muda ao salvar?"
          ]}
          role="Ajudando em notificações"
        />
      )}
      browserUrl="https://app.taliya.com/app/configuracoes/notificacoes"
      pageHeaderBreadcrumb={<Breadcrumb items={[{ label: "Configurações" }, { label: "Notificações" }]} />}
      pageHeaderRhythm="stacked"
      rightPanelVariant="settings-notifications"
      topNavSelection="none"
      {...settingsShellProps({
        pageHeaderActions: <><Chip icon="checkCircle" showDot={false} tone="success">Publicado</Chip><Chip icon="users" showDot={false} tone="warning">3 papeis configurados</Chip><Chip icon="alert" showDot={false} tone="danger">Revisar 1 alerta</Chip></>,
        subtitle: "Alertas internos por papel.",
        title: "Notificacoes"
      })}
    />
  );
}

export const Image60ConfiguracoesHub: Story = {
  name: "60 configuracoes hub",
  parameters: { sourceImage: "60_round-4.1M_configuracoes_01_hub-8-cards-aprovado.png" },
  render: () => <SettingsHubPage />
};

export const ConfiguracoesStudio: Story = {
  name: "Configuracoes Studio pos-live",
  render: () => <SettingsStudioPage />
};

export const ConfiguracoesEquipe: Story = {
  name: "Configuracoes Equipe pos-live",
  render: () => <SettingsTeamPage />
};

export const ConfiguracoesCanais: Story = {
  name: "Configuracoes Canais pos-live",
  render: () => <SettingsChannelsPage />
};

export const ConfiguracoesPlanosModelos: Story = {
  name: "Configuracoes Planos e modelos pos-live",
  render: () => <SettingsPlansPage />
};

export const Image61ConfiguracoesPermissoes: Story = {
  name: "61 configuracoes permissoes",
  parameters: { sourceImage: "61_round-4.1M_configuracoes_02_permissoes-aprovado.png" },
  render: () => <SettingsPermissionsPage />
};

export const Image62ConfiguracoesPagamentos: Story = {
  name: "62 configuracoes pagamentos financeiro",
  parameters: { sourceImage: "62_round-4.1M_configuracoes_03_pagamentos-financeiro-aprovado.png" },
  render: () => <SettingsPaymentsPage />
};

export const Image63ConfiguracoesAgenda: Story = {
  name: "63 configuracoes agenda",
  parameters: { sourceImage: "63_round-4.1M_configuracoes_04_agenda-aprovado.png" },
  render: () => <SettingsAgendaPage />
};

export const Image64ConfiguracoesNotificacoes: Story = {
  name: "64 configuracoes notificacoes",
  parameters: { sourceImage: "64_round-4.1M_configuracoes_05_notificacoes-aprovado.png" },
  render: () => <SettingsNotificationsPage />
};
