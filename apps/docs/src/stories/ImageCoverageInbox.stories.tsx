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
import type { ConversationListRow, CrmShellNavItem, PageFilterBarFilter } from "@taliya/crm";
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
  { id: "historico", label: "Historico" }
];

const inboxConversationRows: ConversationListRow[] = [
  { id: "ana-silva", name: "Ana Silva", avatarSrc: source24AnaSilva, subject: "Reposição", detail: "Aguardando humano", preview: "Oi, perdi a aula de ontem. Consigo repor quinta?", time: "10:24", metaLabel: "Recepção", metaIcon: "calendar", statusLabel: "Aguardando humano", statusTone: "waiting", channel: "whatsapp", selected: true, state: "selected" },
  { id: "marina-lopes", name: "Marina Lopes", avatarSrc: source24MarinaLopes, subject: "Comprovante enviado", detail: "Financeiro", preview: "Segue o comprovante de pagamento.", time: "10:12", metaLabel: "Financeiro", metaIcon: "clipboard", statusLabel: "Em andamento", statusTone: "progress", channel: "whatsapp", state: "unread" },
  { id: "julia-ramos", name: "Julia Ramos", avatarSrc: source24JuliaRamos, subject: "Pergunta sobre horario", detail: "Copiloto sugeriu", preview: "Qual o horário das turmas de manhã?", time: "09:48", metaLabel: "Atendimento", metaIcon: "users", statusLabel: "Copiloto sugeriu", statusTone: "copilot", statusIcon: "sparkles", channel: "whatsapp" },
  { id: "pedro-santos", name: "Pedro Santos", avatarSrc: source24PedroSantos, subject: "Mensagem falhou", detail: "Falha de envio", preview: "Tentei enviar o comprovante e não foi.", time: "09:31", metaLabel: "Sistema", metaIcon: "settings", statusLabel: "Falha de envio", statusTone: "failed", statusIcon: "alert", channel: "whatsapp", state: "failed" },
  { id: "carla-menezes", name: "Carla Menezes", avatarSrc: source24CarlaMenezes, subject: "Opt-out registrado", preview: "Não quero mais receber mensagens.", time: "Ontem", metaLabel: "Sistema", metaIcon: "settings", statusLabel: "Opt-out registrado", statusTone: "optout", channel: "whatsapp", state: "opt-out" }
];

export function InboxConversationPage() {
  return (
    <CrmThreePanePage
      activeNavId="conversas"
      activeSidebarId="conversas"
      avatarSrc={image79Avatar}
      center={<ConversationThread avatarSrc={source24AnaSilva} />}
      filterBar={<InboxFilters />}
      left={<ConversationList rows={inboxConversationRows} />}
      navItems={inboxNavItems}
      pageHeaderRhythm="inbox"
      right={<ContextPanel avatarSrc={source24AnaSilva} />}
      sidebarItems={crmEmptyShellSidebarItems}
      subtitle="Studio Vila Mariana - Atendimento e conversas"
      title="Inbox"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    />
  );
}

function InboxFilters() {
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
        label: "Responsavel",
        value: typeof values.responsavel === "string" ? values.responsavel : "",
        options: [
          { value: "recepcao", label: "Recepcao", icon: "user" },
          { value: "atendimento", label: "Atendimento", icon: "headphones" },
          { value: "financeiro", label: "Financeiro", icon: "coins" }
        ]
      },
      {
        id: "nao-lidas",
        kind: "quick",
        label: "Nao lidas",
        selected: Boolean(values["nao-lidas"])
      }
    ],
    [values]
  );

  return (
    <PageFilterBar
      actions={<Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" variant="primary">Nova conversa</Button>}
      filters={filters}
      onFilterSelect={(filter) => setValues((current) => ({ ...current, [filter.id]: current[filter.id] ? "" : "selected" }))}
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      onSearchChange={setQuery}
      query={query}
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
