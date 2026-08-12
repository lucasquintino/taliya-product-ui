/** Drawer, right-panel, dashboard, and profile-tab layouts. */
import React from "react";
import {
  Button,
  Chip,
  Icon,
  IconButton,
  Tabs,
  cn
} from "@taliya/ui";
import type { TabItem } from "@taliya/ui";
import { CrmDrawer } from "./drawer-core.js";
import type { CrmDrawerFact } from "./drawer-core.js";
import type { ContextPanelProps } from "./shell-layout-a.js";
import { defaultContextPanelFacts, defaultContextPanelHistory, defaultContextPanelTasks } from "./shell-layout-a.js";

export interface ConversationDrawerProps extends Omit<ContextPanelProps, "action" | "children" | "className"> {
  closeLabel?: string;
  onClose?: () => void;
}

export function ConversationDrawer({
  title = "Ana Silva",
  statusLabel,
  state = "success",
  facts = defaultContextPanelFacts,
  historyItems = defaultContextPanelHistory,
  taskItems = defaultContextPanelTasks,
  agentStatus = "Copiloto sugeriu · envio autônomo bloqueado",
  onAction,
  onFactAction,
  onTaskAction,
  closeLabel = "Fechar conversa",
  onClose
}: ConversationDrawerProps) {
  const isBlocked = state === "blocked";
  const resolvedStatusLabel = statusLabel ?? (state === "success" ? "aluna ativa" : state);
  const drawerFacts: CrmDrawerFact[] = facts.map((fact) => ({
    id: fact.id,
    icon: fact.icon,
    label: fact.label,
    value: (
      <span className="tcrm-conversation-drawer__fact-value">
        {fact.value}
        {fact.actionIcon ? (
          <IconButton
            disabled={isBlocked}
            icon={fact.actionIcon}
            label={fact.actionLabel ?? String(fact.label)}
            onClick={() => onFactAction?.(fact.id)}
            size="sm"
            type="button"
            variant="ghost"
          />
        ) : null}
      </span>
    )
  }));

  return (
    <CrmDrawer
      aria-label="Detalhes da conversa"
      className="tcrm-conversation-drawer"
      closeLabel={closeLabel}
      component="ConversationDrawer"
      eyebrow="Conversa"
      facts={drawerFacts}
      footer={(
        <>
          <Button disabled={isBlocked} leadingIcon="user" onClick={() => onAction?.("open-profile")} size="sm" variant="secondary">Abrir perfil</Button>
          <Button disabled={isBlocked} leadingIcon="plus" onClick={() => onAction?.("create-task")} size="sm" variant="secondary">Criar tarefa</Button>
          <Button disabled={isBlocked} leadingIcon="moreVertical" onClick={() => onAction?.("more-actions")} size="sm" variant="secondary">Mais ações</Button>
        </>
      )}
      onClose={onClose}
      sections={[
        {
          id: "history",
          title: "Histórico recente",
          ariaLabel: "Histórico recente",
          content: (
            <ol className="tcrm-conversation-drawer__history">
              {historyItems.map((item) => (
                <li key={item.id}>
                  <time>{item.time}</time>
                  <span><strong>{item.title}</strong>{item.description ? <small>{item.description}</small> : null}</span>
                </li>
              ))}
            </ol>
          )
        },
        {
          id: "tasks",
          title: "Tarefas relacionadas",
          ariaLabel: "Tarefas relacionadas",
          content: (
            <div className="tcrm-conversation-drawer__tasks">
              {taskItems.map((task) => (
                <div className="tcrm-conversation-drawer__task" key={task.id}>
                  <Icon name="calendar" />
                  <span>{task.label}</span>
                  {task.status ? <Chip showDot={false} tone={task.statusTone ?? "neutral"}>{task.status}</Chip> : null}
                  {task.actionIcon ? <IconButton disabled={isBlocked} icon={task.actionIcon} label={task.actionLabel ?? "Abrir tarefa"} onClick={() => onTaskAction?.(task.id)} size="sm" variant="ghost" /> : null}
                </div>
              ))}
            </div>
          )
        },
        {
          id: "agent",
          ariaLabel: "Status do agente",
          variant: "callout",
          content: <span className="tcrm-conversation-drawer__agent"><Icon name="sparkles" /><strong>{agentStatus}</strong></span>
        }
      ]}
      status={resolvedStatusLabel}
      title={title}
    />
  );
}

export function RightPanelLayout({
  contentHeader,
  contentHeaderLabel,
  main,
  panel,
  state = "fixed",
  mainLabel = "Conteúdo principal",
  panelLabel = "Painel lateral",
  className,
  ...props
}: {
  contentHeader?: React.ReactNode;
  contentHeaderLabel?: string;
  main: React.ReactNode;
  panel: React.ReactNode;
  state?: "fixed" | "compact" | "collapsed";
  mainLabel?: string;
  panelLabel?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const isCollapsed = state === "collapsed";
  return (
    <div className={cn("tcrm-right-panel-layout", className)} data-component="RightPanelLayout" data-state={state} {...props}>
      {contentHeader ? (
        <div aria-label={contentHeaderLabel} className="tcrm-right-panel-layout__content-header" data-region="content-header">
          {contentHeader}
        </div>
      ) : null}
      <section aria-label={mainLabel} className="tcrm-right-panel-layout__main" data-region="main">{main}</section>
      {isCollapsed ? null : <aside aria-label={panelLabel} className="tcrm-right-panel-layout__panel" data-region="panel">{panel}</aside>}
    </div>
  );
}

export function DashboardGrid({
  columns = 3,
  density = "default",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { columns?: 1 | 2 | 3 | 4 | "agenda" | "asymmetrical" | "support" | "today" | "todayCritical" | "reports"; density?: "default" | "compact" }) {
  return (
    <div
      className={cn("tcrm-dashboard-grid", `tcrm-dashboard-grid--${columns}`, density !== "default" && `tcrm-dashboard-grid--${density}`, className)}
      data-component="DashboardGrid"
      {...props}
    />
  );
}

const defaultProfileTabItems: TabItem[] = [
  { value: "resumo", label: "Resumo", content: null },
  { value: "agenda", label: "Agenda", content: null },
  { value: "financeiro", label: "Financeiro", content: null },
  { value: "documentos", label: "Documentos", content: null },
  { value: "historico", label: "Hist\u00f3rico", content: null },
  { value: "tarefas", label: "Tarefas", content: null }
];

export function ProfileTabs({
  items,
  className,
  defaultValue,
  value,
  onValueChange,
  state = "source",
  showPanel = false,
  density = "standard"
}: {
  items?: TabItem[];
  className?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  state?: "source" | "loading" | "blocked";
  showPanel?: boolean;
  density?: "standard" | "compact";
}) {
  const isUnavailable = state === "loading" || state === "blocked";
  const resolvedItems = (items ?? defaultProfileTabItems).map((item) => ({
    ...item,
    disabled: item.disabled || isUnavailable
  }));

  return (
    <Tabs
      aria-label="Abas do perfil do aluno"
      className={cn("tcrm-profile-tabs", density === "compact" && "tcrm-profile-tabs--compact", state !== "source" && `tcrm-profile-tabs--${state}`, className)}
      defaultValue={defaultValue ?? "resumo"}
      idBase="tcrm-profile-tabs"
      items={resolvedItems}
      onValueChange={isUnavailable ? undefined : onValueChange}
      showPanel={showPanel}
      value={value}
    />
  );
}
