/** Support drawer pattern. */
import React from "react";
import { Button, ButtonGroup, Chip, Icon, List, ListItem, Panel, cn } from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import { stateKey } from "./patterns-utilities.js";
import { SupportTicketPanel } from "../domains/students/students-support.js";

export interface SupportStatusItem {
  id: string;
  label: React.ReactNode;
  icon: IconName;
  status?: React.ReactNode;
  tone?: ComponentTone;
}

export interface SupportStatusSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  services?: SupportStatusItem[];
  accessItems?: SupportStatusItem[];
  planTitle?: React.ReactNode;
  planDescription?: React.ReactNode;
  onViewAll?: () => void;
}

const defaultSupportServices: SupportStatusItem[] = [
  { id: "whatsapp", label: "WhatsApp", icon: "message", status: "operando", tone: "success" },
  { id: "payments", label: "Pagamentos", icon: "coins", status: "operando", tone: "success" },
  { id: "imports", label: "Importação", icon: "upload", status: "atenção", tone: "warning" },
  { id: "agents", label: "Agentes", icon: "users", status: "normal", tone: "success" }
];

const defaultSupportAccessItems: SupportStatusItem[] = [
  { id: "pending", label: "1 pendente", icon: "clock" },
  { id: "active", label: "2 ativos", icon: "checkCircle", tone: "success" },
  { id: "expiring", label: "0 expirando hoje", icon: "clock", tone: "warning" }
];

export function SupportStatusSidebar({
  services = defaultSupportServices,
  accessItems = defaultSupportAccessItems,
  planTitle = "Suporte padrão",
  planDescription = "Resposta estimada: hoje",
  onViewAll,
  className,
  ...props
}: SupportStatusSidebarProps) {
  return (
    <aside className={cn("tcrm-support-status-sidebar", className)} data-component="SupportStatusSidebar" {...props}>
      <Panel className="tcrm-support-status-sidebar__card tcrm-support-status-sidebar__card--services">
        <List className="tcrm-support-status-sidebar__header"><ListItem leading={<Icon name="barChart" />} title="Status dos serviços" /></List>
        <List className="tcrm-support-status-sidebar__rows" divided>
          {services.map((item) => <ListItem action={item.status ? <Chip tone={item.tone ?? "neutral"}>{item.status}</Chip> : undefined} key={item.id} leading={<Icon name={item.icon} tone={item.tone} />} title={item.label} />)}
        </List>
      </Panel>
      <Panel className="tcrm-support-status-sidebar__card tcrm-support-status-sidebar__card--access">
        <List className="tcrm-support-status-sidebar__header"><ListItem leading={<Icon name="users" />} title="Acessos temporários" /></List>
        <List className="tcrm-support-status-sidebar__rows" divided>
          {accessItems.map((item) => <ListItem key={item.id} leading={<Icon name={item.icon} tone={item.tone} />} title={item.label} />)}
        </List>
      </Panel>
      <Panel className="tcrm-support-status-sidebar__card tcrm-support-status-sidebar__card--plan">
        <List className="tcrm-support-status-sidebar__header"><ListItem leading={<Icon name="star" />} title="Prioridade do plano" /></List>
        <div className="tcrm-support-status-sidebar__plan"><strong>{planTitle}</strong><span>{planDescription}</span></div>
      </Panel>
      <Button className="tcrm-support-status-sidebar__view-all" onClick={onViewAll} trailingIcon="chevronRight" variant="ghost">Ver todos os status</Button>
    </aside>
  );
}

export interface SupportAgentPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  placeholder?: React.ReactNode;
  introduction?: React.ReactNode;
  questions?: string[];
  notice?: React.ReactNode;
  onAction?: (actionId: string) => void;
}

export interface SupportCentralWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  agent: React.ReactNode;
  tickets: React.ReactNode;
}

export function SupportCentralWorkspace({ agent, tickets, className, ...props }: SupportCentralWorkspaceProps) {
  return <div className={cn("tcrm-support-central-workspace", className)} data-component="SupportCentralWorkspace" {...props}>{agent}{tickets}</div>;
}

const defaultSupportQuestions = ["WhatsApp desconectou", "Erro na importação", "Dúvida sobre cobrança", "Agente não respondeu", "Configurar Pix"];

export function SupportAgentPanel({
  title = "Agente de suporte 24/7",
  placeholder = "Pergunte ao suporte da Taliya...",
  introduction = "Posso ajudar a diagnosticar integrações, explicar configurações ou abrir um ticket com contexto.",
  questions = defaultSupportQuestions,
  notice = "Para ações sensíveis, o suporte escala para humano e pode pedir autorização.",
  onAction,
  className,
  ...props
}: SupportAgentPanelProps) {
  return (
    <Panel className={cn("tcrm-support-agent-panel", className)} data-component="SupportAgentPanel" {...props}>
      <header className="tcrm-support-agent-panel__header"><Icon name="sparkles" tone="info" /><h2>{title}</h2></header>
      <Button className="tcrm-support-agent-panel__search" leadingIcon="search" onClick={() => onAction?.("compose")} trailingIcon="send" variant="secondary">{placeholder}</Button>
      <p className="tcrm-support-agent-panel__introduction">{introduction}</p>
      <ButtonGroup className="tcrm-support-agent-panel__questions">
        {questions.map((question) => <Button key={question} onClick={() => onAction?.(`question:${question}`)} size="sm" variant="secondary">{question}</Button>)}
      </ButtonGroup>
      <Button className="tcrm-support-agent-panel__ask" leadingIcon="sparkles" onClick={() => onAction?.("ask-support")} size="sm" variant="primary">Perguntar ao suporte 24/7</Button>
      <p className="tcrm-support-agent-panel__notice"><Icon name="lock" />{notice}</p>
    </Panel>
  );
}

export type SupportTicketDrawerState = "open" | "answered" | "access active" | "loading" | "blocked";
export type SupportTicketDrawerAction =
  | "reply"
  | "attach"
  | "request-access"
  | "revoke-access"
  | "import"
  | "audit"
  | "resolve"
  | "use-grant"
  | "reply-studio"
  | "tenant"
  | "revoke";

export interface SupportTicketPanelFact {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon: IconName;
  tone?: ComponentTone;
}

export interface SupportTicketPanelMessage {
  id: string;
  icon: IconName;
  text: React.ReactNode;
  tone?: ComponentTone;
}

export interface SupportTicketDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  open?: boolean;
  state?: SupportTicketDrawerState;
  variant?: "support" | "internal";
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  facts?: SupportTicketPanelFact[];
  summary?: React.ReactNode;
  messages?: SupportTicketPanelMessage[];
  onClose?: () => void;
  onAction?: (actionId: SupportTicketDrawerAction) => void;
}

export function SupportTicketDrawer({
  open = true,
  state = "open",
  variant = "support",
  title = "Importação duplicou alunos",
  subtitle,
  facts,
  summary,
  messages,
  onClose,
  onAction,
  className,
  ...props
}: SupportTicketDrawerProps) {
  if (!open) return null;

  const key = stateKey(state) || "open";

  return (
    <aside
      aria-busy={key === "loading" || undefined}
      aria-label="Detalhes do ticket de suporte"
      className={cn("tcrm-support-ticket-drawer", `tcrm-support-ticket-drawer--${variant}`, className)}
      data-component="SupportTicketDrawer"
      data-state={key}
      role="complementary"
      {...props}
    >
      <SupportTicketPanel
        className="tcrm-support-ticket-drawer__panel"
        onAction={onAction}
        onClose={onClose}
        facts={facts}
        messages={messages}
        state={state}
        subtitle={subtitle}
        summary={summary}
        title={title}
        variant={variant}
      />
    </aside>
  );
}
