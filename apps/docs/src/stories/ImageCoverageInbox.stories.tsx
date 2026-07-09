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
import type { CrmShellNavItem, PageFilterBarFilter } from "@taliya/crm";
import { Button } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

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

export function InboxConversationPage() {
  return (
    <CrmThreePanePage
      activeNavId="conversas"
      activeSidebarId="conversas"
      avatarSrc={image79Avatar}
      center={<ConversationThread avatarSrc={image79Avatar} />}
      filterBar={<InboxFilters />}
      left={<ConversationList />}
      navItems={inboxNavItems}
      right={<ContextPanel avatarSrc={image79Avatar} />}
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
