import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import {
  CaseDrawer,
  CrmKanbanPage,
  KanbanCard,
  KanbanColumn,
  OperationActivityTable,
  PageFilterBar,
  PageQuickFilters,
  type OperationActivityTableRow,
  type PageFilterBarFilter,
  type PageQuickFilterItem,
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems
} from "@taliya/crm";
import type { CaseDrawerAction, CaseDrawerFact, CaseDrawerFooterAction, CaseDrawerState, CrmShellNavItem, CrmShellSidebarItem } from "@taliya/crm";
import {
  IconButton
} from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";
import source23JoaoSilva from "../assets/source23-comment-joao-silva.png";
import source24MarinaLopes from "../assets/source24-marina-lopes.png";
import source25SamFrank from "../assets/source25-sam-frank.png";
import source13NikkiOlaw from "../assets/source13-nikki-olaw.png";

const operationNavItems: CrmShellNavItem[] = [
  { id: "pendencias", label: "Pendências", active: true },
  { id: "tarefas", label: "Tarefas" },
  { id: "aprovacoes", label: "Aprovações" },
  { id: "incidentes", label: "Incidentes" },
  { id: "historico", label: "Histórico" }
];

const operationSidebarItems: CrmShellSidebarItem[] = [
  ...crmEmptyShellSidebarItems,
  { id: "configuracoes", label: "Configurações", icon: "settings" },
  { id: "operacao", label: "Operação", icon: "trendingUp" }
];

const meta = {
  title: "CRM / Image Coverage / Operação",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Coverage das imagens 21-22 da página Operação. A composição usa CrmKanbanPage, KanbanColumn, KanbanCard, CaseDrawer e primitives oficiais; status de composição, não certificada 1:1."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

type OperationCard = {
  id: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  state: string;
  owner: React.ReactNode;
  impact: React.ReactNode;
  nextAction: React.ReactNode;
  tags: string[];
};

function OperationFilters({ onAction, showActions = true }: { onAction: (message: string) => void; showActions?: boolean }) {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string | string[]>>({
    origem: "",
    dono: [],
    tipo: "",
    status: [],
    bloqueio: ""
  });

  const filters: PageFilterBarFilter[] = [
    { id: "origem", label: "Origem", options: [{ value: "agenda", label: "Agenda", icon: "calendar" }, { value: "whatsapp", label: "WhatsApp", icon: "whatsapp" }, { value: "financeiro", label: "Financeiro", icon: "wallet" }], value: typeof values.origem === "string" ? values.origem : "" },
    { id: "dono", label: "Dono", kind: "multi", options: [{ value: "recepcao", label: "Recepção", icon: "users" }, { value: "suporte", label: "Suporte", icon: "headphones" }, { value: "sem-dono", label: "Sem dono", icon: "user" }], values: Array.isArray(values.dono) ? values.dono : [] },
    { id: "tipo", label: "Tipo", options: [{ value: "tarefa", label: "Tarefa", icon: "clipboard" }, { value: "decisao", label: "Decisão", icon: "shieldCheck" }, { value: "incidente", label: "Incidente", icon: "alert" }], value: typeof values.tipo === "string" ? values.tipo : "" },
    { id: "status", label: "Status", kind: "multi", options: [{ value: "novo", label: "Novo", icon: "plus" }, { value: "bloqueado", label: "Bloqueado", icon: "lock" }, { value: "resolvido", label: "Resolvido", icon: "checkCircle" }], values: Array.isArray(values.status) ? values.status : [] },
    { id: "bloqueio", label: "Bloqueio", options: [{ value: "agenda", label: "Agenda", icon: "calendar" }, { value: "cota", label: "Cota", icon: "pieChart" }], value: typeof values.bloqueio === "string" ? values.bloqueio : "" }
  ];

  return (
    <PageFilterBar
      actions={showActions ? (
        <>
          <IconButton icon="sliders" label="Ajustar filtros da operação" onClick={() => onAction("Filtros avançados abertos")} size="md" variant="default" />
          <IconButton icon="upload" label="Exportar pendências" onClick={() => onAction("Pendências exportadas")} size="md" variant="default" />
        </>
      ) : undefined}
      aria-label="Filtros da operação"
      density="compact"
      filterGroupLabel="Filtros rápidos da busca"
      filters={filters}
      onFilterValueChange={(filter, value) => {
        setValues((current) => ({ ...current, [filter.id]: value }));
        onAction(`Filtro ${filter.label} atualizado`);
      }}
      onSearchChange={(value) => {
        setQuery(value);
        onAction(value ? `Busca atualizada: ${value}` : "Busca limpa");
      }}
      query={query}
      searchAriaLabel="Buscar pendências"
      searchFilterPlacement="embedded"
      searchPlaceholder="Buscar pendências..."
    />
  );
}

function OperationQuickFilters({ onAction }: { onAction: (message: string) => void }) {
  const [selectedQuickFilter, setSelectedQuickFilter] = useState("");
  const quickFilterItems: PageQuickFilterItem[] = [
    { id: "mine", icon: "user", label: "Minhas pendências", selected: selectedQuickFilter === "mine" },
    { id: "unowned", icon: "user", label: "Sem dono", selected: selectedQuickFilter === "unowned" },
    { id: "blocked", icon: "lock", label: "Bloqueadas", selected: selectedQuickFilter === "blocked", tone: "danger" },
    { id: "waiting", icon: "clock", label: "Aguardando resposta", selected: selectedQuickFilter === "waiting", tone: "warning" },
    { id: "quota", icon: "pieChart", label: "Cota / agente", selected: selectedQuickFilter === "quota", tone: "info" }
  ];

  return (
    <PageQuickFilters
      aria-label="Filtros rápidos da operação"
      items={quickFilterItems}
      onItemSelect={(item) => {
        setSelectedQuickFilter(item.id);
        onAction(`Filtro rápido selecionado: ${item.label}`);
      }}
    />
  );
}

const operationColumns: Array<{
  id: string;
  title: string;
  count: number;
  state?: "default" | "waiting" | "blocked" | "resolved";
  cards: OperationCard[];
}> = [
  {
    id: "novo",
    title: "Novo",
    count: 3,
    cards: [
      {
        id: "ana",
        meta: "Tarefa / Agenda",
        nextAction: "encontrar opção",
        owner: "Recepção",
        impact: "aula sem reposição",
        state: "manual disponível",
        tags: ["Tarefa", "Agenda"],
        title: "Reposição da Ana sem encaixe"
      },
      {
        id: "phone",
        nextAction: "corrigir dados",
        owner: "Recepção",
        impact: "contato falhando",
        state: "manual disponível",
        tags: ["Tarefa", "Dados"],
        title: "Telefone do responsável inválido"
      },
      {
        id: "billing-message",
        nextAction: "revisar e aprovar",
        owner: "Gestora",
        impact: "recebimento",
        state: "manual disponível",
        tags: ["Decisão", "Financeiro"],
        title: "Aprovar mensagem de cobrança"
      }
    ]
  },
  {
    id: "assumido",
    title: "Assumido",
    count: 3,
    cards: [
      {
        id: "proof",
        nextAction: "validar hoje",
        owner: "Recepção",
        impact: "baixa pendente",
        state: "manual disponível",
        tags: ["Tarefa", "Financeiro"],
        title: "Comprovante da Marina"
      },
      {
        id: "teacher",
        nextAction: "confirmar hoje",
        owner: "Instrutores",
        impact: "aluno sem aula",
        state: "manual disponível",
        tags: ["Tarefa", "Agenda"],
        title: "Confirmar substituto aula 18h"
      },
      {
        id: "plan",
        nextAction: "atualizar plano",
        owner: "Recepção",
        impact: "plano desatualizado",
        state: "manual disponível",
        tags: ["Tarefa", "Financeiro"],
        title: "Atualizar plano da Juliana"
      }
    ]
  },
  {
    id: "aguardando",
    title: "Aguardando",
    count: 3,
    state: "waiting",
    cards: [
      {
        id: "julia",
        nextAction: "responder",
        owner: "Atendimento",
        impact: "resposta pendente",
        state: "copiloto sugeriu",
        tags: ["Tarefa", "Inbox"],
        title: "Conversa da Julia aguardando humano"
      },
      {
        id: "return",
        nextAction: "reenviar msg",
        owner: "Recepção",
        impact: "decisão pendente",
        state: "aguardando resposta",
        tags: ["Tarefa", "Agenda"],
        title: "Aguardando retorno do aluno"
      },
      {
        id: "contract",
        nextAction: "acompanhar",
        owner: "Recepção",
        impact: "matrícula travada",
        state: "manual disponível",
        tags: ["Tarefa", "Financeiro"],
        title: "Envio de contrato para assinatura"
      }
    ]
  },
  {
    id: "bloqueado",
    title: "Bloqueado",
    count: 3,
    state: "blocked",
    cards: [
      {
        id: "whatsapp",
        nextAction: "revisar cota",
        owner: "Suporte",
        impact: "envio interrompido",
        state: "automação bloqueada",
        tags: ["Tarefa", "Sistema"],
        title: "WhatsApp com falha de envio"
      },
      {
        id: "quota",
        nextAction: "renovar cota",
        owner: "Suporte",
        impact: "envio interrompido",
        state: "automação bloqueada",
        tags: ["Tarefa", "Sistema"],
        title: "Limite de WhatsApp atingido"
      },
      {
        id: "erp",
        nextAction: "corrigir conexão",
        owner: "Suporte",
        impact: "dados não sincronizam",
        state: "automação bloqueada",
        tags: ["Tarefa", "Sistema"],
        title: "Integração com ERP com erro"
      }
    ]
  },
  {
    id: "resolvido",
    title: "Resolvido",
    count: 2,
    state: "resolved",
    cards: [
      {
        id: "pedro",
        nextAction: "hoje 10:12",
        owner: "Recepção",
        impact: "baixa concluída",
        state: "resolvido",
        tags: ["Tarefa", "Financeiro"],
        title: "Comprovante do Pedro validado"
      },
      {
        id: "renewed",
        nextAction: "hoje 09:45",
        owner: "Suporte",
        impact: "envio normalizado",
        state: "resolvido",
        tags: ["Tarefa", "Sistema"],
        title: "Cota de WhatsApp renovada"
      }
    ]
  }
];

const operationActivityRows: OperationActivityTableRow[] = [
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

function OperationKanban({
  columns,
  onCardMove,
  onCardMenu,
  onCardSelect,
  selectedCardId
}: {
  columns: typeof operationColumns;
  onCardMove: (cardId: string, targetColumnId: string) => void;
  onCardMenu: (card: OperationCard) => void;
  onCardSelect: (card: OperationCard) => void;
  selectedCardId: string;
}) {
  const [dragOverColumnId, setDragOverColumnId] = useState("");

  return (
    <>
      {columns.map((column) => (
        <KanbanColumn
          count={column.cards.length}
          data-drop-active={dragOverColumnId === column.id || undefined}
          key={column.id}
          onDragLeave={() => setDragOverColumnId((current) => current === column.id ? "" : current)}
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
            setDragOverColumnId(column.id);
          }}
          onDrop={(event) => {
            event.preventDefault();
            const cardId = event.dataTransfer.getData("application/x-taliya-kanban-card");
            setDragOverColumnId("");
            if (cardId) onCardMove(cardId, column.id);
          }}
          state={column.state}
          title={column.title}
        >
          {column.cards.map((card) => (
            <KanbanCard
              draggable
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("application/x-taliya-kanban-card", card.id);
              }}
              impact={card.impact}
              key={card.id}
              meta={card.meta}
              nextAction={card.nextAction}
              onMenu={() => onCardMenu(card)}
              onSelect={() => onCardSelect(card)}
              owner={card.owner}
              selected={selectedCardId === card.id}
              state={card.state}
              tags={card.tags}
              title={card.title}
            />
          ))}
        </KanbanColumn>
      ))}
    </>
  );
}

export function OperationShell({ drawer = false }: { drawer?: boolean }) {
  const [announcedAction, setAnnouncedAction] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(drawer ? "ana" : "");
  const [selectedActivityId, setSelectedActivityId] = useState("");
  const [columns, setColumns] = useState(operationColumns);
  const selectedEntry = columns
    .flatMap((column) => column.cards.map((card) => ({ card, column })))
    .find(({ card }) => card.id === selectedCardId);
  const selectedCardTitle = selectedEntry?.card.title ?? "Reposicao da Ana sem encaixe";
  const selectedDrawerState: CaseDrawerState = selectedEntry?.column.id === "bloqueado"
    ? "blocked"
    : selectedEntry?.column.id === "aguardando"
      ? "waiting"
      : selectedEntry?.column.id === "resolvido"
        ? "resolved"
        : "open";
  const selectedFacts: CaseDrawerFact[] = selectedEntry ? [
    { id: "origin", icon: "folder", label: "Origem", value: selectedEntry.card.tags.join(" / ") },
    { id: "owner", icon: "user", label: "Dono / fila", value: selectedEntry.card.owner },
    { id: "status", icon: "clock", label: "Status", value: selectedEntry.column.title, tone: selectedEntry.column.id === "bloqueado" ? "danger" : undefined },
    { id: "impact", icon: "shieldCheck", label: "Impacto", value: selectedEntry.card.impact },
    { id: "next", icon: "clock", label: "Próxima ação recomendada", value: selectedEntry.card.nextAction }
  ] : [];
  const selectedFooterActions: CaseDrawerFooterAction[] = selectedDrawerState === "resolved"
    ? [
      { id: "open-origin", label: "Abrir origem", variant: "primary", fullWidth: true },
      { id: "create-task", label: "Criar tarefa" }
    ]
    : [
      { id: "open-origin", label: "Abrir origem", variant: "primary", fullWidth: true },
      ...(selectedDrawerState === "blocked" ? [{ id: "correct" as const, label: "Corrigir agora", leadingIcon: "refresh" as const }] : []),
      { id: "assume", label: "Assumir" },
      { id: "delegate", label: "Delegar" },
      { id: "create-task", label: "Criar tarefa" },
      { id: "request-approval", label: "Pedir aprovação" },
      { id: "resolve", label: "Marcar resolvido" },
      { id: "move-status", label: "Mover status", trailingIcon: "chevronDown" }
    ];

  const moveCard = (cardId: string, targetColumnId: string, patch: Partial<OperationCard> = {}) => {
    setColumns((currentColumns) => {
      const sourceColumn = currentColumns.find((column) => column.cards.some((card) => card.id === cardId));
      if (!sourceColumn) return currentColumns;
      const card = sourceColumn.cards.find((item) => item.id === cardId);
      if (!card) return currentColumns;
      const targetState = targetColumnId === "bloqueado"
        ? "automação bloqueada"
        : targetColumnId === "aguardando"
          ? "aguardando resposta"
          : targetColumnId === "resolvido"
            ? "resolvido"
            : "manual disponível";
      const updatedCard = { ...card, state: targetState, ...patch };
      if (sourceColumn.id === targetColumnId) {
        return currentColumns.map((column) => column.id === sourceColumn.id
          ? { ...column, cards: column.cards.map((item) => item.id === cardId ? updatedCard : item) }
          : column);
      }
      return currentColumns.map((column) => {
        if (column.id === sourceColumn.id) {
          return { ...column, cards: column.cards.filter((item) => item.id !== cardId) };
        }
        if (column.id === targetColumnId) {
          return { ...column, cards: [...column.cards, updatedCard] };
        }
        return column;
      });
    });
    setSelectedCardId(cardId);
    setAnnouncedAction(`Pendência movida para ${targetColumnId}`);
  };
  const handleCaseAction = (action: CaseDrawerAction) => {
    if (!selectedEntry) return;
    const currentIndex = columns.findIndex((column) => column.id === selectedEntry.column.id);
    const nextColumn = columns[Math.min(columns.length - 1, currentIndex + 1)];
    if (action === "assume") moveCard(selectedCardId, "assumido", { owner: "Eu", nextAction: "executar agora" });
    if (action === "delegate") moveCard(selectedCardId, selectedEntry.column.id, { owner: "Equipe de Operação", nextAction: "aguardar aceite" });
    if (action === "request-approval") moveCard(selectedCardId, "aguardando", { nextAction: "aguardar aprovação" });
    if (action === "resolve") moveCard(selectedCardId, "resolvido", { impact: "pendência concluída", nextAction: "concluído" });
    if (action === "move-status") moveCard(selectedCardId, nextColumn?.id ?? selectedEntry.column.id);
    if (action === "correct") moveCard(selectedCardId, "assumido", { impact: "correção aplicada", nextAction: "validar correção" });
    if (!["assume", "delegate", "request-approval", "resolve", "move-status", "correct"].includes(action)) {
      setAnnouncedAction(`Ação do caso: ${action}`);
    }
  };

  return (
    <CrmKanbanPage
      activeNavId="pendencias"
      activeUtilityId="operacao"
      after={(
        <OperationActivityTable
          onRowOpen={(row) => {
            setSelectedActivityId(row.id);
            if (row.id === "marina-proof") setSelectedCardId("proof");
            setAnnouncedAction(`Atividade aberta: ${row.object}`);
          }}
          onViewAll={() => setAnnouncedAction("Histórico completo aberto")}
          rows={operationActivityRows}
          selectedId={selectedActivityId}
        />
      )}
      avatarSrc={image79Avatar}
      className="sb-image-coverage-operation-shell"
      contentClassName="sb-image-coverage-operation-content"
      drawer={selectedCardId ? (
        <CaseDrawer
          className="sb-image-coverage-operation-drawer"
          facts={selectedFacts}
          footerActions={selectedFooterActions}
          onAction={handleCaseAction}
          onClose={() => setSelectedCardId("")}
          state={selectedDrawerState}
          statusLabel={selectedEntry?.column.title}
          title={selectedCardTitle}
        />
      ) : null}
      filterBar={<OperationFilters onAction={setAnnouncedAction} showActions={!drawer} />}
      globalActions={{
        onAvatar: () => setAnnouncedAction("Perfil da operadora aberto"),
        onMessages: () => setAnnouncedAction("Mensagens abertas"),
        onNotifications: () => setAnnouncedAction("Notificações abertas"),
        onSearch: () => setAnnouncedAction("Busca global aberta")
      }}
      kanbanDensity="comfortable"
      laneSurface="separate"
      navItems={operationNavItems}
      onBack={() => setAnnouncedAction("Navegação de retorno acionada")}
      onNavChange={(id) => setAnnouncedAction(`Seção selecionada: ${id}`)}
      onSidebarSelect={(item) => setAnnouncedAction(`Módulo selecionado: ${item.label}`)}
      onSidebarUtilitySelect={(item) => setAnnouncedAction(`Preferência selecionada: ${item.label}`)}
      pageHeaderRhythm="operation"
      quickFilters={<OperationQuickFilters onAction={setAnnouncedAction} />}
      railDensity="compact"
      regions={drawer ? { globalActions: false } : undefined}
      sidebarItems={operationSidebarItems}
      stageClassName="sb-image-coverage-operation-stage"
      subtitle="Studio Vila Mariana · Pendências em acompanhamento"
      title="Operação"
      utilityItems={crmEmptyShellSidebarUtilityItems}
    >
      <OperationKanban
        columns={columns}
        onCardMove={moveCard}
        onCardMenu={(card) => {
          setSelectedCardId(card.id);
          setAnnouncedAction(`Opções abertas: ${card.title}`);
        }}
        onCardSelect={(card) => {
          setSelectedCardId(card.id);
          setAnnouncedAction(`Pendência aberta: ${card.title}`);
        }}
        selectedCardId={selectedCardId}
      />
      <span aria-live="polite" className="tl-sr-only" role="status">{announcedAction}</span>
    </CrmKanbanPage>
  );
}

export const Image21KanbanGeral: Story = {
  name: "21 kanban geral",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 21_round-4.1B_operacao_01_kanban-geral.png.png. Status: composição com componentes oficiais, não certificada 1:1."
      }
    }
  },
  render: () => <OperationShell />
};

export const OperationLifecycleContract: Story = {
  name: "Operation lifecycle contract",
  render: () => <OperationShell />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: /^Reposição da Ana sem encaixe.*Dono:/ }));
    const drawer = canvas.getByRole("complementary", { name: "Detalhes do caso operacional" });
    await expect(drawer).toHaveAttribute("data-state", "open");
    await userEvent.click(within(drawer).getByRole("button", { name: "Assumir" }));
    await expect(canvas.getByRole("button", { name: /Reposição da Ana sem encaixe.*Dono: Eu/ })).toBeInTheDocument();
    await userEvent.click(within(drawer).getByRole("button", { name: "Pedir aprovação" }));
    await expect(drawer).toHaveAttribute("data-state", "waiting");
    await userEvent.click(within(drawer).getByRole("button", { name: "Marcar resolvido" }));
    await expect(drawer).toHaveAttribute("data-state", "resolved");
    await expect(canvas.getByRole("status")).toHaveTextContent("Pendência movida para resolvido");
  }
};

export const Image22KanbanComDrawer: Story = {
  name: "22 kanban com drawer",
  parameters: {
    docs: {
      description: {
        story: "Fonte: 22_round-4.1B_operacao_02_kanban-com-drawer.png. Status: composição com componentes oficiais, não certificada 1:1."
      }
    }
  },
  render: () => <OperationShell drawer />
};

export const OperationBlockedRecoveryContract: Story = {
  name: "Operation blocked recovery contract",
  render: () => <OperationShell drawer />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const drawer = canvas.getByRole("complementary", { name: "Detalhes do caso operacional" });

    await expect(drawer).toHaveAttribute("data-state", "open");
    await userEvent.click(within(drawer).getByRole("button", { name: "Fechar caso" }));
    await expect(canvas.queryByRole("complementary", { name: "Detalhes do caso operacional" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: /^WhatsApp com falha de envio.*Dono:/ }));
    const blockedDrawer = canvas.getByRole("complementary", { name: "Detalhes do caso operacional" });
    await expect(blockedDrawer).toHaveAttribute("data-state", "blocked");
    await userEvent.click(within(blockedDrawer).getByRole("button", { name: "Corrigir agora" }));
    await expect(blockedDrawer).toHaveAttribute("data-state", "open");
    await expect(canvas.getByRole("button", { name: /WhatsApp com falha de envio.*correção aplicada/ })).toBeInTheDocument();
  }
};
