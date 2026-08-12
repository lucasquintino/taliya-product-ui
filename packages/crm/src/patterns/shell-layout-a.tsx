/** Reusable window, list-detail, and context-panel layouts. */
import React from "react";
import {
  Avatar,
  Button,
  Chip,
  EmptyState,
  Icon,
  IconButton,
  List,
  ListItem,
  LoadingState,
  cn
} from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { CrmBrowserChrome } from "./shell-chrome-a.js";
import { toneForState } from "./shell-utilities.js";
import type { CrmSurfaceProps } from "./shell-foundation.js";

export function ProductWindowFrame({
  children,
  variant = "browser",
  chrome,
  bodyClassName,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: "browser" | "app" | "frameless";
  chrome?: React.ReactNode;
  bodyClassName?: string;
}) {
  if (variant === "frameless") return <div className={cn("tcrm-window-frame--frameless", className)} {...props}>{children}</div>;

  return (
    <div className={cn("tcrm-window-frame", `tcrm-window-frame--${variant}`, className)} {...props}>
      {chrome ?? (variant === "browser" ? <CrmBrowserChrome /> : <ProductWindowAppChrome />)}
      <div className={cn("tcrm-window-frame__body", bodyClassName)}>{children}</div>
    </div>
  );
}

export function ProductWindowAppChrome({ className }: { className?: string }) {
  return (
    <div className={cn("tcrm-window-frame__chrome", className)} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export function ListDetailLayout({
  list,
  detail,
  children,
  className,
  state,
  listLabel = "Lista",
  mainLabel = "Conteúdo",
  detailLabel = "Detalhe",
  ...props
}: {
  list: React.ReactNode;
  detail?: React.ReactNode;
  children?: React.ReactNode;
  state?: "closed" | "selected";
  listLabel?: string;
  mainLabel?: string;
  detailLabel?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const hasDetail = Boolean(detail) && state !== "closed";
  const effectiveState = hasDetail ? "selected" : "closed";

  return (
    <div
      className={cn("tcrm-list-detail-layout", hasDetail && "tcrm-list-detail-layout--with-detail", className)}
      data-component="ListDetailLayout"
      data-state={effectiveState}
      {...props}
    >
      <aside aria-label={listLabel} className="tcrm-list-detail-layout__list">{list}</aside>
      <section aria-label={mainLabel} className="tcrm-list-detail-layout__main">{children}</section>
      {hasDetail ? <aside aria-label={detailLabel} className="tcrm-list-detail-layout__detail">{detail}</aside> : null}
    </div>
  );
}

export type WorkListDetailPageState = "source" | "loading" | "empty" | "blocked";
export type WorkListDetailPageLayoutMode = "standard" | "main-priority" | "compact-rail" | "balanced-rail" | "wide-main" | "wide-rail";
export type WorkListDetailPageHeightMode = "standard" | "tall";
export type WorkListDetailPageFilterRhythm = "default" | "spacious";

export interface WorkListDetailPageProps extends React.HTMLAttributes<HTMLElement> {
  filterBar: React.ReactNode;
  quickFilters: React.ReactNode;
  children: React.ReactNode;
  after?: React.ReactNode;
  detail?: React.ReactNode;
  state?: WorkListDetailPageState;
  detailState?: "closed" | "selected";
  pageLabel?: string;
  filterBarLabel?: string;
  listLabel?: string;
  mainLabel?: string;
  detailLabel?: string;
  filterRhythm?: WorkListDetailPageFilterRhythm;
  layoutMode?: WorkListDetailPageLayoutMode;
  heightMode?: WorkListDetailPageHeightMode;
}

export function WorkListDetailPage({
  filterBar,
  quickFilters,
  children,
  after,
  detail,
  state = "source",
  detailState,
  pageLabel = "Página de trabalho",
  filterBarLabel = "Filtros da página",
  listLabel = "Filtros rápidos",
  mainLabel = "Lista de trabalho",
  detailLabel = "Detalhe",
  filterRhythm = "default",
  layoutMode = "standard",
  heightMode = "standard",
  className,
  ...props
}: WorkListDetailPageProps) {
  return (
    <section
      aria-busy={state === "loading" || undefined}
      aria-label={pageLabel}
      className={cn(
        "tcrm-work-list-detail-page",
        filterRhythm !== "default" && `tcrm-work-list-detail-page--filter-${filterRhythm}`,
        layoutMode !== "standard" && `tcrm-work-list-detail-page--${layoutMode}`,
        heightMode !== "standard" && `tcrm-work-list-detail-page--height-${heightMode}`,
        Boolean(after) && "tcrm-work-list-detail-page--with-after",
        className
      )}
      data-component="WorkListDetailPage"
      data-filter-rhythm={filterRhythm}
      data-layout-mode={layoutMode}
      data-height-mode={heightMode}
      data-state={state}
      {...props}
    >
      <div aria-label={filterBarLabel} className="tcrm-work-list-detail-page__filter-bar" role="region">
        {filterBar}
      </div>
      <ListDetailLayout
        className="tcrm-work-list-detail-page__layout"
        detail={detail}
        detailLabel={detailLabel}
        list={quickFilters}
        listLabel={listLabel}
        mainLabel={mainLabel}
        state={detailState}
      >
        {children}
      </ListDetailLayout>
      {after ? <div className="tcrm-work-list-detail-page__after">{after}</div> : null}
    </section>
  );
}

export type ThreePaneLayoutActivePane = "list" | "conversation" | "context";

export function ThreePaneLayout({
  activePane = "conversation",
  left,
  center,
  right,
  leftLabel = "Painel esquerdo de conversas",
  centerLabel = "Painel central da conversa",
  rightLabel = "Painel direito de contexto",
  className,
  ...props
}: {
  activePane?: ThreePaneLayoutActivePane;
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
  leftLabel?: string;
  centerLabel?: string;
  rightLabel?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("tcrm-three-pane-layout", className)} data-active-pane={activePane} data-component="ThreePaneLayout" data-state={activePane} {...props}>
      <aside aria-label={leftLabel} className="tcrm-three-pane-layout__left" data-pane="list">{left}</aside>
      <section aria-label={centerLabel} className="tcrm-three-pane-layout__center" data-pane="conversation">{center}</section>
      <aside aria-label={rightLabel} className="tcrm-three-pane-layout__right" data-pane="context">{right}</aside>
    </div>
  );
}

export interface ContextPanelSection {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
}

export interface ContextPanelFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  actionIcon?: IconName;
  actionLabel?: string;
  tone?: "default" | "link";
}

export interface ContextPanelHistoryItem {
  id: string;
  time: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export interface ContextPanelTaskItem {
  id: string;
  label: React.ReactNode;
  status?: React.ReactNode;
  statusTone?: ComponentTone;
  actionIcon?: IconName;
  actionLabel?: string;
}

export interface ContextPanelProps extends CrmSurfaceProps {
  avatarSrc?: string;
  statusLabel?: React.ReactNode;
  facts?: ContextPanelFact[];
  historyItems?: ContextPanelHistoryItem[];
  taskItems?: ContextPanelTaskItem[];
  agentStatus?: React.ReactNode;
  sections?: ContextPanelSection[];
  onAction?: (actionId: string) => void;
  onFactAction?: (factId: string) => void;
  onTaskAction?: (taskId: string) => void;
}

export const defaultContextPanelFacts: ContextPanelFact[] = [
  { id: "phone", icon: "clipboard", label: "Contato principal", value: "+55 (11) 91234-5678", actionIcon: "whatsapp", actionLabel: "Abrir WhatsApp" },
  { id: "email", icon: "mail", label: "E-mail", value: "ana.silva@email.com" },
  { id: "consent", icon: "clock", label: "Consentimento", value: "WhatsApp permitido", actionIcon: "check", actionLabel: "Consentimento confirmado", tone: "link" },
  { id: "next-class", icon: "calendar", label: "Próxima aula", value: "terça 17h · Reformer Intermediário" },
  { id: "replacement-credit", icon: "calendar", label: "Crédito de reposição", value: "válido por 30 dias", actionIcon: "info", actionLabel: "Ver crédito" }
];

export const defaultContextPanelHistory: ContextPanelHistoryItem[] = [
  { id: "paused", time: "10:21", title: "Agente pausado", description: "aguardando revisão humana" },
  { id: "proof", time: "10:15", title: "Comprovante recebido", description: "via WhatsApp" },
  { id: "class", time: "09:54", title: "Aula terça 17h confirmada" }
];

export const defaultContextPanelTasks: ContextPanelTaskItem[] = [
  { id: "validate-proof", label: "Validar comprovante", status: "Em andamento", statusTone: "info" },
  { id: "confirm-replacement", label: "Confirmar reposição", status: "Hoje", statusTone: "warning", actionIcon: "calendar", actionLabel: "Abrir tarefa" }
];

function ContextPanelSectionHeader({ title, actionLabel, onAction }: { title: React.ReactNode; actionLabel: React.ReactNode; onAction?: () => void }) {
  return (
    <header className="tcrm-context-panel__section-header">
      <h4>{title}</h4>
      <Button className="tcrm-context-panel__section-action" onClick={onAction} size="sm" type="button" variant="ghost">{actionLabel}</Button>
    </header>
  );
}

export function ContextPanel({
  title = "Ana Silva",
  description,
  state = "success",
  statusLabel,
  avatarSrc,
  facts = defaultContextPanelFacts,
  historyItems = defaultContextPanelHistory,
  taskItems = defaultContextPanelTasks,
  agentStatus = "Copiloto sugeriu · envio autônomo bloqueado",
  sections,
  action,
  onAction,
  onFactAction,
  onTaskAction,
  children,
  className,
  ...props
}: ContextPanelProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const isEmpty = state === "empty";
  const resolvedStatusLabel = statusLabel ?? (state === "success" ? "aluna ativa" : state);

  if (isLoading) {
    return (
      <aside aria-busy="true" className={cn("tcrm-context-panel", className)} data-component="ContextPanel" data-state={state} {...props}>
        <LoadingState title="Carregando contexto" variant="skeleton" />
      </aside>
    );
  }

  if (isEmpty || (!children && !sections?.length && !facts.length)) {
    return (
      <aside className={cn("tcrm-context-panel", className)} data-component="ContextPanel" data-state={state} {...props}>
        <EmptyState action={action} title="Selecione um item" />
      </aside>
    );
  }

  return (
    <aside className={cn("tcrm-context-panel", isBlocked && "tcrm-context-panel--blocked", className)} data-component="ContextPanel" data-state={state} {...props}>
      <header className="tcrm-context-panel__header">
        <Avatar className="tcrm-context-panel__avatar" name={String(title)} src={avatarSrc} />
        <span className="tcrm-context-panel__identity">
          <h3>{title}</h3>
          {description ? <small>{description}</small> : resolvedStatusLabel ? <Chip className="tcrm-context-panel__status" showDot={false} tone={toneForState(state)}>{resolvedStatusLabel}</Chip> : null}
        </span>
        <IconButton disabled={isBlocked} icon="moreVertical" label="Mais opções do contexto" onClick={() => onAction?.("menu")} size="sm" variant="ghost" />
      </header>
      {children ?? (
        sections?.length ? (
          <div className="tcrm-context-panel__card">
            <List dense divided>
              {sections.map((section) => (
                <ListItem action={section.action} key={section.id} meta={section.meta} title={section.title}>
                  {section.description}
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          <>
            <section aria-label="Dados do contato" className="tcrm-context-panel__card tcrm-context-panel__facts">
              {facts.map((fact) => (
                <div className={cn("tcrm-context-panel__fact", fact.tone === "link" && "tcrm-context-panel__fact--link")} key={fact.id}>
                  <Icon name={fact.icon} />
                  <span>
                    <strong>{fact.label}</strong>
                    <em>{fact.value}</em>
                  </span>
                  {fact.actionIcon ? (
                    <IconButton
                      className="tcrm-context-panel__fact-action"
                      disabled={isBlocked}
                      icon={fact.actionIcon}
                      label={fact.actionLabel ?? String(fact.label)}
                      onClick={() => onFactAction?.(fact.id)}
                      size="sm"
                      type="button"
                      variant="ghost"
                    />
                  ) : null}
                </div>
              ))}
            </section>
            <section aria-label="Histórico recente" className="tcrm-context-panel__card tcrm-context-panel__history">
              <ContextPanelSectionHeader actionLabel="Ver todos" onAction={() => onAction?.("history")} title="Histórico recente" />
              <ol>
                {historyItems.map((item) => (
                  <li key={item.id}>
                    <time>{item.time}</time>
                    <span>
                      <strong>{item.title}</strong>
                      {item.description ? <em>{item.description}</em> : null}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
            <section aria-label="Tarefas relacionadas" className="tcrm-context-panel__card tcrm-context-panel__tasks">
              <ContextPanelSectionHeader actionLabel="Ver todas" onAction={() => onAction?.("tasks")} title="Tarefas relacionadas" />
              {taskItems.map((task) => (
                <div className="tcrm-context-panel__task" key={task.id}>
                  <Icon name="calendar" />
                  <span>{task.label}</span>
                  {task.status ? <Chip className="tcrm-context-panel__task-status" showDot={false} tone={task.statusTone ?? "neutral"}>{task.status}</Chip> : null}
                  {task.actionIcon ? (
                    <IconButton disabled={isBlocked} icon={task.actionIcon} label={task.actionLabel ?? "Abrir tarefa"} onClick={() => onTaskAction?.(task.id)} size="sm" variant="ghost" />
                  ) : null}
                </div>
              ))}
            </section>
            <section aria-label="Status do agente" className="tcrm-context-panel__card tcrm-context-panel__agent">
              <h4>Status do agente</h4>
              <span>
                <Icon name="sparkles" />
                <strong>{agentStatus}</strong>
              </span>
            </section>
            <footer className="tcrm-context-panel__footer">
              <Button disabled={isBlocked} leadingIcon="user" onClick={() => onAction?.("open-profile")} size="sm" variant="secondary">Abrir perfil</Button>
              <Button disabled={isBlocked} leadingIcon="plus" onClick={() => onAction?.("create-task")} size="sm" variant="secondary">Criar tarefa</Button>
              <Button className="tcrm-context-panel__more" disabled={isBlocked} leadingIcon="moreVertical" onClick={() => onAction?.("more-actions")} size="sm" variant="secondary">Mais ações</Button>
            </footer>
          </>
        )
      )}
    </aside>
  );
}
