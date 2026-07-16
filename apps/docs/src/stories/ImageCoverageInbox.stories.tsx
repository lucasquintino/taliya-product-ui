import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

import {
  ContextPanel,
  ConversationList,
  ConversationThread,
  CrmThreePanePage,
  PageFilterBar,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type {
  ContextPanelFact,
  ContextPanelHistoryItem,
  ContextPanelTaskItem,
  ConversationListRow,
  ConversationThreadMessage,
  CrmShellNavItem,
  PageFilterBarFilter
} from "@taliya/crm";
import { Button } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source24AnaSilva from "../assets/source24-ana-silva.png";
import source24CarlaMenezes from "../assets/source24-carla-menezes.png";
import source24JuliaRamos from "../assets/source24-julia-ramos.png";
import source24MarinaLopes from "../assets/source24-marina-lopes.png";
import source24PedroSantos from "../assets/source24-pedro-santos.png";

const meta = {
  title: "CRM / Image Coverage / Inbox",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Familia oficial de Inbox. As paginas usam o padrao estrutural Three-pane + PageFilterBar + componentes oficiais de conversa/contexto."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const inboxNavItems: CrmShellNavItem[] = [
  { id: "conversas", label: "Conversas" },
  { id: "envios", label: "Envios" },
  { id: "contatos", label: "Contatos" },
  { id: "historico", label: "Histórico" }
];

const inboxConversationRows: ConversationListRow[] = [
  { id: "ana-silva", name: "Ana Silva", avatarSrc: source24AnaSilva, subject: "Reposição", detail: "Aguardando humano", preview: "Oi, perdi a aula de ontem. Consigo repor quinta?", time: "10:24", metaLabel: "Recepção", metaIcon: "calendar", statusLabel: "Aguardando humano", statusTone: "waiting", channel: "whatsapp", selected: true, state: "selected" },
  { id: "marina-lopes", name: "Marina Lopes", avatarSrc: source24MarinaLopes, subject: "Comprovante enviado", detail: "Financeiro", preview: "Segue o comprovante de pagamento.", time: "10:12", metaLabel: "Financeiro", metaIcon: "clipboard", statusLabel: "Em andamento", statusTone: "progress", channel: "whatsapp", state: "unread" },
  { id: "julia-ramos", name: "Julia Ramos", avatarSrc: source24JuliaRamos, subject: "Pergunta sobre horario", detail: "Copiloto sugeriu", preview: "Qual o horário das turmas de manhã?", time: "09:48", metaLabel: "Atendimento", metaIcon: "users", statusLabel: "Copiloto sugeriu", statusTone: "copilot", statusIcon: "sparkles", channel: "whatsapp" },
  { id: "pedro-santos", name: "Pedro Santos", avatarSrc: source24PedroSantos, subject: "Mensagem falhou", detail: "Falha de envio", preview: "Tentei enviar o comprovante e não foi.", time: "09:31", metaLabel: "Sistema", metaIcon: "settings", statusLabel: "Falha de envio", statusTone: "failed", statusIcon: "alert", channel: "whatsapp", state: "failed" },
  { id: "carla-menezes", name: "Carla Menezes", avatarSrc: source24CarlaMenezes, subject: "Opt-out registrado", preview: "Não quero mais receber mensagens.", time: "Ontem", metaLabel: "Sistema", metaIcon: "settings", statusLabel: "Opt-out registrado", statusTone: "optout", channel: "whatsapp", state: "opt-out" }
];

export function InboxConversationPage() {
  const [activeFilterId, setActiveFilterId] = useState("all");
  const [announcement, setAnnouncement] = useState("");
  const [selectedId, setSelectedId] = useState("ana-silva");
  const selectedConversation = inboxConversationRows.find((row) => row.id === selectedId) ?? inboxConversationRows[0]!;
  const selectedMessages = selectedConversation.id === "ana-silva" ? undefined : [{
    id: `${selectedConversation.id}-inbound`,
    sender: selectedConversation.name,
    body: selectedConversation.preview,
    time: selectedConversation.time,
    variant: "inbound"
  }] satisfies ConversationThreadMessage[];
  const selectedFacts = selectedConversation.id === "ana-silva" ? undefined : [
    { id: "phone", icon: "clipboard", label: "Contato principal", value: "Disponível no cadastro", actionIcon: "whatsapp", actionLabel: "Abrir WhatsApp" },
    { id: "email", icon: "mail", label: "E-mail", value: `${selectedConversation.id}@email.com` },
    { id: "consent", icon: "clock", label: "Consentimento", value: "WhatsApp permitido", actionIcon: "check", actionLabel: "Consentimento confirmado", tone: "link" }
  ] satisfies ContextPanelFact[];
  const selectedHistory = selectedConversation.id === "ana-silva" ? undefined : [
    {
      id: `${selectedConversation.id}-opened`,
      time: selectedConversation.time,
      title: selectedConversation.subject,
      description: selectedConversation.statusLabel
    }
  ] satisfies ContextPanelHistoryItem[];
  const selectedTasks = selectedConversation.id === "ana-silva" ? undefined : [
    {
      id: `${selectedConversation.id}-follow-up`,
      label: `Acompanhar ${selectedConversation.name}`,
      status: selectedConversation.statusLabel,
      statusTone: selectedConversation.statusTone === "failed" ? "danger" : "info",
      actionIcon: "calendar",
      actionLabel: "Abrir tarefa"
    }
  ] satisfies ContextPanelTaskItem[];

  return (
    <CrmThreePanePage
      activeNavId="conversas"
      activeSidebarId="conversas"
      avatarSrc={image79Avatar}
      center={(
        <>
          <ConversationThread
            avatarSrc={selectedConversation.avatarSrc}
            contactName={selectedConversation.name}
            events={selectedConversation.id === "ana-silva" ? undefined : []}
            messages={selectedMessages}
            onAction={(action) => setAnnouncement(`Ação da conversa: ${action}`)}
            onAttach={() => setAnnouncement("Anexo aberto")}
            onDocument={() => setAnnouncement("Documento aberto")}
            onSend={(value) => setAnnouncement(value ? `Mensagem enviada: ${value}` : "Envio acionado sem texto")}
            onSendOptions={() => setAnnouncement("Opções de envio abertas")}
            onTemplateOpen={() => setAnnouncement("Templates abertos")}
            onUseSuggestion={() => setAnnouncement("Sugestão do Copiloto aplicada")}
            subject={<>Assunto: {selectedConversation.subject}</>}
          />
          <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
        </>
      )}
      filterBar={<InboxFilters onAction={setAnnouncement} />}
      globalActions={{
        onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
        onMessages: () => setAnnouncement("Mensagens abertas"),
        onNotifications: () => setAnnouncement("Notificações abertas"),
        onSearch: () => setAnnouncement("Busca global aberta")
      }}
      left={(
        <ConversationList
          activeFilterId={activeFilterId}
          onConversationSelect={(row) => {
            setSelectedId(row.id);
            setAnnouncement(`Conversa aberta: ${row.name}`);
          }}
          onFilterChange={(filter) => {
            setActiveFilterId(filter.id);
            setAnnouncement(`Filtro de conversa: ${filter.label}`);
          }}
          onNextPage={() => setAnnouncement("Próxima página de conversas")}
          onPageSizeClick={() => setAnnouncement("Quantidade por página confirmada")}
          onPreviousPage={() => setAnnouncement("Página anterior de conversas")}
          rows={inboxConversationRows}
          selectedId={selectedId}
        />
      )}
      navItems={inboxNavItems}
      onBack={() => setAnnouncement("Navegação de retorno acionada")}
      onNavChange={(id) => setAnnouncement(`Seção selecionada: ${id}`)}
      onSidebarSelect={(item) => setAnnouncement(`Módulo selecionado: ${item.label}`)}
      onSidebarUtilitySelect={(item) => setAnnouncement(`Preferência selecionada: ${item.label}`)}
      pageHeaderRhythm="inbox"
      right={(
        <ContextPanel
          avatarSrc={selectedConversation.avatarSrc}
          facts={selectedFacts}
          historyItems={selectedHistory}
          onAction={(action) => setAnnouncement(`Ação do contexto: ${action}`)}
          onFactAction={(fact) => setAnnouncement(`Ação do dado: ${fact}`)}
          onTaskAction={(task) => setAnnouncement(`Tarefa relacionada aberta: ${task}`)}
          statusLabel={selectedConversation.statusLabel}
          taskItems={selectedTasks}
          title={selectedConversation.name}
        />
      )}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Studio Vila Mariana · Atendimento e conversas"
      title="Inbox"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    />
  );
}

function InboxFilters({ onAction }: { onAction: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters = useMemo<PageFilterBarFilter[]>(
    () => [
      {
        id: "canal",
        label: "Canal",
        value: typeof values.canal === "string" ? values.canal : "",
        options: [
          { value: "whatsapp", label: "WhatsApp", icon: "whatsapp" },
          { value: "instagram", label: "Instagram", icon: "message" },
          { value: "sistema", label: "Sistema", icon: "settings" }
        ]
      },
      {
        id: "status",
        label: "Status",
        value: typeof values.status === "string" ? values.status : "",
        options: [
          { value: "aguardando", label: "Aguardando humano", icon: "clock" },
          { value: "pausado", label: "Agente pausado", icon: "pause" },
          { value: "falha", label: "Falhas", icon: "alert" }
        ]
      },
      {
        id: "responsavel",
        label: "Responsável",
        value: typeof values.responsavel === "string" ? values.responsavel : "",
        options: [
          { value: "recepcao", label: "Recepção", icon: "user" },
          { value: "atendimento", label: "Atendimento", icon: "headphones" },
          { value: "financeiro", label: "Financeiro", icon: "coins" }
        ]
      },
      {
        id: "nao-lidas",
        kind: "quick",
        label: "Não lidas",
        selected: Boolean(values["nao-lidas"])
      }
    ],
    [values]
  );

  return (
    <PageFilterBar
      actions={<Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={() => onAction("Nova conversa iniciada")} variant="primary">Nova conversa</Button>}
      aria-label="Filtros do Inbox"
      filters={filters}
      onFilterSelect={(filter) => {
        setValues((current) => ({ ...current, [filter.id]: current[filter.id] ? "" : "selected" }));
        onAction(`Filtro ${filter.label} alternado`);
      }}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onAction(`Filtro ${filter.label} atualizado`);
      }}
      onSearchChange={(value) => {
        setQuery(value);
        onAction(value ? `Busca atualizada: ${value}` : "Busca limpa");
      }}
      query={query}
      searchAriaLabel="Buscar conversas"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar conversas..."
    />
  );
}

export const Image24DInboxConversaAberta: Story = {
  name: "24D inbox conversa aberta",
  parameters: {
    docs: {
      description: {
        story:
          "Fonte: 24_round-4.1D_inbox_01_conversa-aberta.png.png. Composicao oficial Three-pane/PageFilterBar/ConversationList/ConversationThread/ContextPanel para Inbox."
      }
    },
    sourceImage: "24_round-4.1D_inbox_01_conversa-aberta.png.png"
  },
  render: () => <InboxConversationPage />
};
