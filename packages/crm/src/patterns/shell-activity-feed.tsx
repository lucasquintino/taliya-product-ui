/** Activity feed and event timeline patterns. */
import React from "react";
import {
  Avatar,
  EmptyState,
  FilterSelect,
  Icon,
  IconButton,
  InlineAlert,
  List,
  ListItem,
  LoadingState,
  PrimitiveButton,
  SegmentedControl,
  cn
} from "@taliya/ui";
import type { IconName } from "@taliya/ui";

export type ActivityFeedTone = "blue" | "green" | "orange" | "purple" | "red";

export interface ActivityFeedItem {
  id: string;
  time: string;
  hourLabel?: string;
  title: React.ReactNode;
  category: React.ReactNode;
  actor: React.ReactNode;
  description: React.ReactNode;
  icon: IconName;
  tone: ActivityFeedTone;
  avatarSrc?: string;
  disabled?: boolean;
}

export interface ActivityFeedPanelTab {
  value: string;
  label: string;
}

const sourceActivityFeedItems: ActivityFeedItem[] = [
  { id: "replacement-confirmed", hourLabel: "09h", time: "09:12", title: "Reposição confirmada", category: "Agenda / Reposições", actor: "Mariana", description: "Ana Paula aceitou quinta 09:00", icon: "calendar", tone: "blue" },
  { id: "conversation-resolved", time: "09:28", title: "Conversa resolvida", category: "WhatsApp", actor: "Atendimento", description: "Gustavo recebeu retorno sobre plano trimestral", icon: "whatsapp", tone: "green" },
  { id: "call-complete", hourLabel: "10h", time: "10:04", title: "Chamada concluída", category: "Aulas / Chamada", actor: "Rafael", description: "Funcional 09:00 · 8 presentes", icon: "users", tone: "blue" },
  { id: "receipt-validated", time: "10:30", title: "Comprovante validado", category: "Financeiro", actor: "Lucas", description: "R$ 980 confirmado", icon: "wallet", tone: "orange" },
  { id: "approval-complete", hourLabel: "11h", time: "11:05", title: "Aprovação concluída", category: "Aprovações", actor: "Juliana", description: "Mensagem do agente aprovada", icon: "shieldCheck", tone: "purple" },
  { id: "automation-executed", time: "11:22", title: "Automação executada", category: "Agente Agenda", actor: "Sistema", description: "Lembrete de aula enviado", icon: "bot", tone: "blue" },
  { id: "task-rescheduled", time: "11:40", title: "Tarefa reagendada", category: "Tarefas", actor: "Juliana", description: "Follow-up de aluno em risco movido para 16:00", icon: "calendar", tone: "orange" },
  { id: "block-resolved", hourLabel: "12h", time: "12:10", title: "Bloqueio resolvido", category: "Dados / Alunos", actor: "Recepção", description: "Cadastro obrigatório completado", icon: "alert", tone: "red" }
];

export function ActivityFeed({
  items,
  compact = false,
  fluid = false,
  variant = "history",
  className,
  title = "Histórico de hoje",
  description = "O que já foi resolvido, alterado ou executado hoje.",
  dateFilterLabel = "Hoje",
  typeFilterLabel = "Todos os tipos",
  state = "source",
  panelTabs = [
    { value: "all", label: "Todas" },
    { value: "cases", label: "Casos" },
    { value: "updates", label: "Atualizacoes" },
    { value: "mentions", label: "Mencoes" }
  ],
  panelTab,
  onDateFilter,
  onTypeFilter,
  onExport,
  onPanelFilter,
  onPanelTabChange,
  onItemOpen
}: {
  items?: ActivityFeedItem[];
  compact?: boolean;
  fluid?: boolean;
  variant?: "history" | "panel";
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  dateFilterLabel?: React.ReactNode;
  typeFilterLabel?: React.ReactNode;
  state?: "source" | "loading" | "empty" | "blocked";
  panelTabs?: ActivityFeedPanelTab[];
  panelTab?: string;
  onDateFilter?: () => void;
  onTypeFilter?: () => void;
  onExport?: () => void;
  onPanelFilter?: () => void;
  onPanelTabChange?: (value: string) => void;
  onItemOpen?: (item: ActivityFeedItem) => void;
}) {
  const isUnavailable = state === "loading" || state === "blocked";
  const resolvedItems = items ?? sourceActivityFeedItems;
  const visibleItems = state === "empty" ? [] : resolvedItems;
  const [internalDateFilter, setInternalDateFilter] = React.useState(String(dateFilterLabel));
  const [internalTypeFilter, setInternalTypeFilter] = React.useState(String(typeFilterLabel));
  const [activeFilter, setActiveFilter] = React.useState<"date" | "type" | "">("");
  const [internalPanelTab, setInternalPanelTab] = React.useState(panelTabs[0]?.value ?? "all");
  const dateOptions = [
    { value: "hoje", label: "Hoje", count: 8 },
    { value: "semana", label: "Esta semana", count: 31 },
    { value: "mes", label: "Este mês", count: 128 }
  ];
  const typeOptions = [
    { value: "todos", label: "Todos os tipos", count: 8 },
    { value: "agenda", label: "Agenda", count: 3 },
    { value: "whatsapp", label: "WhatsApp", count: 1 },
    { value: "financeiro", label: "Financeiro", count: 1 },
    { value: "aprovacoes", label: "Aprovações", count: 1 }
  ];
  const dateValueByLabel = new Map(dateOptions.map((option) => [option.label, option.value]));
  const typeValueByLabel = new Map(typeOptions.map((option) => [option.label, option.value]));
  const dateLabelByValue = new Map(dateOptions.map((option) => [option.value, option.label]));
  const typeLabelByValue = new Map(typeOptions.map((option) => [option.value, option.label]));
  const currentDateLabel = onDateFilter ? dateFilterLabel : internalDateFilter;
  const currentTypeLabel = onTypeFilter ? typeFilterLabel : internalTypeFilter;
  const currentDateValue = dateValueByLabel.get(String(currentDateLabel)) ?? "hoje";
  const currentTypeValue = typeValueByLabel.get(String(currentTypeLabel)) ?? "todos";
  const handleDateFilter = (nextValue: string | string[]) => {
    if (onDateFilter) {
      onDateFilter();
      return;
    }
    const normalized = (Array.isArray(nextValue) ? nextValue[0] : nextValue) ?? "hoje";
    setInternalDateFilter(dateLabelByValue.get(normalized) ?? "Hoje");
    setActiveFilter("date");
  };
  const handleTypeFilter = (nextValue: string | string[]) => {
    if (onTypeFilter) {
      onTypeFilter();
      return;
    }
    const normalized = (Array.isArray(nextValue) ? nextValue[0] : nextValue) ?? "todos";
    setInternalTypeFilter(typeLabelByValue.get(normalized) ?? "Todos os tipos");
    setActiveFilter("type");
  };
  const currentPanelTab = panelTab ?? internalPanelTab;
  const handlePanelTabChange = (value: string) => {
    if (panelTab === undefined) setInternalPanelTab(value);
    onPanelTabChange?.(value);
  };

  if (variant === "panel") {
    return (
      <section
        aria-busy={state === "loading" ? true : undefined}
        aria-label={typeof title === "string" ? title : "Painel de atividade"}
        className={cn("tcrm-activity-feed", "tcrm-activity-feed--panel", compact && "tcrm-activity-feed--compact", fluid && "tcrm-activity-feed--fluid", state !== "source" && `tcrm-activity-feed--${state}`, className)}
        data-component="ActivityFeed"
        data-state={state}
        data-variant="panel"
      >
        <header className="tcrm-activity-feed__panel-header">
          <SegmentedControl
            compact
            label="Filtrar atividades"
            onChange={handlePanelTabChange}
            options={panelTabs.map((option) => ({ ...option, disabled: isUnavailable }))}
            value={currentPanelTab}
          />
          <IconButton disabled={isUnavailable} icon="sliders" label="Filtrar painel de atividade" onClick={onPanelFilter} size="sm" variant="subtle" />
        </header>
        {state === "empty" ? <EmptyState className="tcrm-activity-feed__state" icon="clock" title="Nenhuma atividade" /> : null}
        {state === "loading" ? <LoadingState className="tcrm-activity-feed__state" title="Carregando atividades" variant="spinner" /> : null}
        {state === "blocked" ? <InlineAlert className="tcrm-activity-feed__state" tone="blocked" title="Atividades bloqueadas">Sem permissao para visualizar este painel.</InlineAlert> : null}
        {state === "source" ? (
          <List className="tcrm-activity-feed__panel-list" dense divided>
            {visibleItems.map((item) => (
              <ListItem
                action={
                  <PrimitiveButton
                    aria-label={`Abrir atividade ${String(item.title)}`}
                    className="tcrm-activity-feed__panel-action"
                    disabled={item.disabled || isUnavailable}
                    onClick={() => onItemOpen?.(item)}
                    type="button"
                  >
                    <span>{item.time}</span>
                    <Icon name={item.icon} size="sm" />
                  </PrimitiveButton>
                }
                leading={<Avatar name={String(item.actor)} size="sm" src={item.avatarSrc} />}
                key={item.id}
                meta={item.description}
                title={item.title}
              />
            ))}
          </List>
        ) : null}
      </section>
    );
  }

  return (
    <section
      aria-busy={state === "loading" ? true : undefined}
      aria-label={typeof title === "string" ? title : "Histórico de hoje"}
      className={cn("tcrm-activity-feed", compact && "tcrm-activity-feed--compact", fluid && "tcrm-activity-feed--fluid", state !== "source" && `tcrm-activity-feed--${state}`, className)}
      data-component="ActivityFeed"
      data-state={state}
      data-variant="history"
    >
      <header className="tcrm-activity-feed__header">
        <span className="tcrm-activity-feed__header-icon"><Icon name="clock" size={22} /></span>
        <div className="tcrm-activity-feed__heading">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="tcrm-activity-feed__controls" role="group" aria-label="Filtros do histórico">
          <FilterSelect
            aria-pressed={activeFilter === "date"}
            className="tcrm-activity-feed__filter"
            clearable={false}
            disabled={isUnavailable}
            icon="calendar"
            label="Período"
            onClick={onDateFilter}
            onValueChange={handleDateFilter}
            options={dateOptions}
            triggerDisplay="value"
            value={currentDateValue}
          />
          <FilterSelect
            aria-pressed={activeFilter === "type"}
            className="tcrm-activity-feed__filter tcrm-activity-feed__filter--wide"
            clearable={false}
            disabled={isUnavailable}
            label="Tipo"
            onClick={onTypeFilter}
            onValueChange={handleTypeFilter}
            options={typeOptions}
            triggerDisplay="value"
            value={currentTypeValue}
          />
          <IconButton className="tcrm-activity-feed__export" disabled={isUnavailable} icon="upload" label="Exportar histórico" onClick={onExport} size="sm" variant="subtle" />
        </div>
      </header>

      {state === "empty" ? (
        <EmptyState className="tcrm-activity-feed__state" icon="clock" title="Nenhum histórico hoje" />
      ) : null}
      {state === "loading" ? (
        <LoadingState className="tcrm-activity-feed__state" title="Carregando histórico" variant="spinner" />
      ) : null}
      {state === "blocked" ? (
        <InlineAlert className="tcrm-activity-feed__state" tone="blocked" title="Histórico bloqueado">
          Permissões ou plano impedem a leitura deste histórico.
        </InlineAlert>
      ) : null}

      {state === "source" ? (
        <div className="tcrm-activity-feed__timeline">
          <div className="tcrm-activity-feed__axis" aria-hidden="true" />
          {visibleItems.map((item) => (
            <React.Fragment key={item.id}>
              <span className="tcrm-activity-feed__hour">{item.hourLabel}</span>
              <span className="tcrm-activity-feed__time">{item.time}</span>
              <span className={cn("tcrm-activity-feed__dot", `tcrm-activity-feed__dot--${item.tone}`)} aria-hidden="true" />
              <PrimitiveButton
                className="tcrm-activity-feed__row"
                disabled={item.disabled || isUnavailable}
                onClick={() => onItemOpen?.(item)}
                type="button"
              >
                <span className={cn("tcrm-activity-feed__event-icon", `tcrm-activity-feed__event-icon--${item.tone}`)}>
                  <Icon name={item.icon} size={22} />
                </span>
                <span className="tcrm-activity-feed__event-main">
                  <strong>{item.title}</strong>
                  <small>{item.category} <em>·</em> {item.actor}</small>
                </span>
                <span className="tcrm-activity-feed__event-description">{item.description}</span>
                <Icon name="chevronRight" size={18} />
              </PrimitiveButton>
            </React.Fragment>
          ))}
        </div>
      ) : null}
    </section>
  );
}
