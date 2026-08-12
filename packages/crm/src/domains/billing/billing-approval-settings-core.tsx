/** Approval panels and settings surfaces. */
import React from "react";
import { Avatar, Button, Card, Chip, Icon, IconButton, InlineAlert, LoadingState, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import { stateKey } from "./billing-utilities.js";


export type ApprovalPanelState = "pending" | "approved" | "rejected" | "expired" | "loading" | "blocked";
export type ApprovalPanelAction = "approve" | "edit" | "reject" | "request-data" | "open-origin" | "close";
export type ApprovalPanelLayout = "detail" | "compact";

export interface ApprovalPanelFact {
  id: string;
  icon?: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  valueIcon?: IconName;
  dotTone?: "pending" | "approved" | "rejected" | "expired" | "low" | "medium" | "high";
  valueTone?: "default" | "whatsapp" | "copilot" | "danger";
}

export interface ApprovalPanelSection {
  id: string;
  title: React.ReactNode;
  body: React.ReactNode;
  badge?: React.ReactNode;
  variant?: "text" | "suggestion";
}

export interface ApprovalPanelTimelineItem {
  id: string;
  time: React.ReactNode;
  label: React.ReactNode;
}

export interface ApprovalPanelRecentComment {
  author: React.ReactNode;
  time: React.ReactNode;
  body: React.ReactNode;
  avatarSrc?: string;
}

export interface ApprovalPanelProps extends Omit<CrmSurfaceProps, "state" | "title" | "children"> {
  state?: ApprovalPanelState;
  layout?: ApprovalPanelLayout;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  facts?: ApprovalPanelFact[];
  sections?: ApprovalPanelSection[];
  timeline?: ApprovalPanelTimelineItem[];
  recentComment?: ApprovalPanelRecentComment;
  onAction?: (action: ApprovalPanelAction) => void;
  onApprove?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  onRequestData?: () => void;
  onOpenOrigin?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  blockedReason?: string;
  proposalLabel?: React.ReactNode;
  proposal?: React.ReactNode;
  channelLabel?: React.ReactNode;
  channel?: React.ReactNode;
  scheduledLabel?: React.ReactNode;
  scheduledFor?: React.ReactNode;
}

const approvalPanelDefaultSections: ApprovalPanelSection[] = [
  {
    id: "context",
    title: "Contexto resumido",
    body: "Ana Paula pediu reagendamento da visita técnica para quinta-feira pela manhã. O agente preparou uma resposta para confirmar o novo horário e coletar o endereço completo."
  },
  {
    id: "proposal",
    title: "Proposta principal",
    badge: "Sugestão do copiloto",
    variant: "suggestion",
    body: "Olá Ana Paula! Consigo reagendar sua visita para quinta-feira às 09h. Pode me confirmar seu endereço completo para registro?"
  },
  {
    id: "before",
    title: "Antes da decisão",
    body: "Visita permanece no horário anterior e a conversa aguarda validação humana."
  },
  {
    id: "after",
    title: "Depois da decisão",
    body: "A mensagem confirma a nova janela e solicita os dados necessários para concluir o reagendamento."
  },
  {
    id: "impact",
    title: "Impacto esperado",
    body: "Libera continuidade do atendimento, mantém SLA da conversa e consome 1 crédito."
  },
  {
    id: "reason",
    title: "Motivo da decisão",
    body: "A alteração atende ao pedido da cliente sem violar a política de confirmação de endereço."
  },
  {
    id: "policy",
    title: "Política / guardrail aplicado",
    body: "Mensagens externas geradas por agente exigem validação humana antes do envio. Agente não aprova sozinho."
  }
];

const approvalPanelDefaultTimeline: ApprovalPanelTimelineItem[] = [
  { id: "requested", time: "09:12", label: "Cliente solicitou reagendamento" },
  { id: "suggested", time: "09:16", label: "Copiloto sugeriu resposta" },
  { id: "created", time: "09:18", label: "Aprovação criada" }
];

const approvalPanelDefaultComment: ApprovalPanelRecentComment = {
  author: "Sam Frank",
  time: "Hoje, 09:20",
  body: "Pode seguir se mantiver o tom cordial e não confirmar sem endereço."
};

function approvalPanelStatus(state: ApprovalPanelState) {
  switch (state) {
    case "approved":
      return { label: "Aprovada", dotTone: "approved" as const, title: "Mensagem aprovada para Ana Paula", primary: "Aprovado" };
    case "rejected":
      return { label: "Rejeitada", dotTone: "rejected" as const, title: "Mensagem rejeitada para Ana Paula", primary: "Aprovar" };
    case "expired":
      return { label: "Expirada", dotTone: "expired" as const, title: "Aprovação expirada para Ana Paula", primary: "Aprovar" };
    case "blocked":
      return { label: "Bloqueada", dotTone: "expired" as const, title: "Aprovar mensagem para Ana Paula", primary: "Aprovar" };
    case "loading":
    case "pending":
    default:
      return { label: "Pendente", dotTone: "pending" as const, title: "Aprovar mensagem para Ana Paula", primary: "Aprovar" };
  }
}

function approvalPanelFacts(state: ApprovalPanelState): ApprovalPanelFact[] {
  const status = approvalPanelStatus(state);
  const deadline = state === "expired" ? (
    <>
      <span className="tcrm-approval-panel__value-danger">Expirou</span>
      <span>09:30</span>
    </>
  ) : (
    <>
      <span className="tcrm-approval-panel__value-danger">Hoje</span>
      <span>09:30</span>
    </>
  );

  return [
    { id: "status", icon: "clipboard", label: "Status", value: status.label, dotTone: status.dotTone },
    { id: "type", icon: "clipboardCheck", label: "Tipo", value: "Mensagem", valueIcon: "message" },
    { id: "origin", icon: "clipboard", label: "Origem canônica", value: "WhatsApp / Agente de atendimento", valueIcon: "whatsapp", valueTone: "whatsapp" },
    { id: "agent", icon: "clipboard", label: "Solicitante / agente", value: "Copiloto de atendimento", valueIcon: "sparkles", valueTone: "copilot" },
    { id: "risk", icon: "clock", label: "Risco", value: "Baixo", dotTone: "low" },
    { id: "quota", icon: "coins", label: "Custo / cota", value: "1 crédito" },
    { id: "deadline", icon: "clock", label: "Prazo", value: deadline }
  ];
}

function emitApprovalAction(action: ApprovalPanelAction, onAction?: (action: ApprovalPanelAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function ApprovalPanel({
  state = "pending",
  layout = "detail",
  title,
  eyebrow = "Aprovação",
  facts,
  sections = approvalPanelDefaultSections,
  timeline = approvalPanelDefaultTimeline,
  recentComment = approvalPanelDefaultComment,
  onAction,
  onApprove,
  onEdit,
  onReject,
  onRequestData,
  onOpenOrigin,
  onClose,
  blockedReason,
  disabled,
  proposalLabel = "Ação proposta pelo agente",
  proposal = "Enviar mensagem de confirmação de visita técnica para Ana Paula Santos.",
  channelLabel = "Canal:",
  channel = "WhatsApp",
  scheduledLabel = "Programado para:",
  scheduledFor = "Hoje, 09:30",
  className,
  ...props
}: ApprovalPanelProps) {
  const status = approvalPanelStatus(state);
  const approvalFacts = facts ?? approvalPanelFacts(state);
  const locked = disabled || Boolean(blockedReason) || ["approved", "rejected", "expired", "blocked"].includes(state);
  const loading = state === "loading";

  if (layout === "compact") {
    return (
      <Card
        aria-busy={loading || undefined}
        aria-label="Aprovação da ação"
        className={cn("tcrm-approval-panel", "tcrm-approval-panel--compact", `tcrm-approval-panel--${stateKey(state)}`, className)}
        data-component="ApprovalPanel"
        data-layout="compact"
        data-state={state}
        role="region"
        {...props}
      >
        {loading ? (
          <LoadingState className="tcrm-approval-panel__compact-state" title="Carregando aprovação" variant="panel" />
        ) : state === "blocked" ? (
          <InlineAlert className="tcrm-approval-panel__compact-state" tone="warning" title="Aprovação bloqueada">
            {blockedReason ?? "Esta ação exige uma revisão antes da decisão."}
          </InlineAlert>
        ) : (
          <>
            <header className="tcrm-approval-panel__compact-header">
              <Icon name="fingerprint" size="var(--taliya-control-crm-approval-panel-compact-icon-size)" />
              <h2>{proposalLabel}</h2>
            </header>
            <p className="tcrm-approval-panel__compact-proposal">{proposal}</p>
            <dl className="tcrm-approval-panel__compact-facts">
              <div>
                <dt>{channelLabel}</dt>
                <dd>{channel}<Icon name="whatsapp" size="var(--taliya-control-crm-approval-panel-compact-icon-size)" /></dd>
              </div>
              <div>
                <dt>{scheduledLabel}</dt>
                <dd>{scheduledFor}</dd>
              </div>
            </dl>
            <footer className="tcrm-approval-panel__compact-actions">
              <Button disabled={locked} onClick={() => emitApprovalAction("approve", onAction, onApprove)} size="sm" variant="primary">Aprovar</Button>
              <Button disabled={locked} onClick={() => emitApprovalAction("edit", onAction, onEdit)} size="sm" variant="secondary">Editar</Button>
              <Button className="tcrm-approval-panel__compact-reject" disabled={locked} onClick={() => emitApprovalAction("reject", onAction, onReject)} size="sm" variant="secondary">Rejeitar</Button>
            </footer>
          </>
        )}
      </Card>
    );
  }

  return (
    <Card
      aria-busy={loading || undefined}
      aria-label={typeof title === "string" ? title : "Painel de aprovação"}
      className={cn("tcrm-approval-panel", `tcrm-approval-panel--${stateKey(state)}`, className)}
      data-component="ApprovalPanel"
      data-state={state}
      role="region"
      {...props}
    >
      <header className="tcrm-approval-panel__header">
        <Chip className="tcrm-approval-panel__eyebrow" showDot={false}>
          {eyebrow}
        </Chip>
        <IconButton className="tcrm-approval-panel__close" icon="x" label="Fechar aprovação" onClick={() => emitApprovalAction("close", onAction, onClose)} size="sm" variant="default" />
        <h2>{title ?? status.title}</h2>
      </header>

      <dl className="tcrm-approval-panel__facts">
        {approvalFacts.map((fact) => (
          <div className="tcrm-approval-panel__fact" key={fact.id}>
            <Icon className="tcrm-approval-panel__fact-icon" name={fact.icon ?? "circle"} size="var(--taliya-control-crm-approval-panel-fact-icon-size)" />
            <dt>{fact.label}</dt>
            <dd className={cn(fact.valueTone && `tcrm-approval-panel__fact-value--${fact.valueTone}`)}>
              {fact.dotTone ? <span className={cn("tcrm-approval-panel__dot", `tcrm-approval-panel__dot--${fact.dotTone}`)} /> : null}
              {fact.valueIcon ? <Icon name={fact.valueIcon} size="var(--taliya-control-crm-approval-panel-fact-value-icon-size)" /> : null}
              <span>{fact.value}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="tcrm-approval-panel__sections">
        {sections.map((section) => (
          <section className={cn("tcrm-approval-panel__section", section.variant === "suggestion" && "tcrm-approval-panel__section--suggestion")} key={section.id}>
            <div className="tcrm-approval-panel__section-header">
              <h3>{section.title}</h3>
              {section.badge ? (
                <Chip className="tcrm-approval-panel__suggestion-chip" icon="sparkles" showDot={false}>
                  {section.badge}
                </Chip>
              ) : null}
            </div>
            <p>{section.body}</p>
          </section>
        ))}

        <section className="tcrm-approval-panel__section tcrm-approval-panel__history">
          <h3>Histórico</h3>
          <ol>
            {timeline.map((item) => (
              <li key={item.id}>
                <span className="tcrm-approval-panel__history-dot" />
                <time>{item.time}</time>
                <span>{item.label}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="tcrm-approval-panel__section tcrm-approval-panel__comment">
          <h3>Comentário recente</h3>
          <div>
            <Avatar className="tcrm-approval-panel__comment-avatar" name={String(recentComment.author)} size="sm" src={recentComment.avatarSrc} />
            <p>
              <strong>{recentComment.author}</strong>
              <span>· {recentComment.time}</span>
              <small>{recentComment.body}</small>
            </p>
          </div>
        </section>
      </div>

      <footer className="tcrm-approval-panel__footer">
        <Button
          blockedReason={blockedReason}
          className="tcrm-approval-panel__button tcrm-approval-panel__button--primary"
          disabled={locked}
          loading={loading}
          onClick={() => emitApprovalAction("approve", onAction, onApprove)}
          variant="primary"
        >
          {status.primary}
        </Button>
        <div className="tcrm-approval-panel__secondary-actions">
          <Button className="tcrm-approval-panel__button" disabled={locked || loading} onClick={() => emitApprovalAction("edit", onAction, onEdit)} variant="secondary">Editar</Button>
          <Button className="tcrm-approval-panel__button" disabled={locked || loading} onClick={() => emitApprovalAction("reject", onAction, onReject)} variant="secondary">Rejeitar</Button>
          <Button className="tcrm-approval-panel__button" disabled={locked || loading} onClick={() => emitApprovalAction("request-data", onAction, onRequestData)} variant="secondary">Pedir dados</Button>
        </div>
        <Button className="tcrm-approval-panel__button tcrm-approval-panel__button--origin" disabled={disabled || loading} onClick={() => emitApprovalAction("open-origin", onAction, onOpenOrigin)} variant="secondary">Abrir origem</Button>
      </footer>
    </Card>
  );
}

export interface ApprovalDrawerProps extends ApprovalPanelProps {
  open?: boolean;
}

export function ApprovalDrawer({ open = true, className, ...props }: ApprovalDrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <ApprovalPanel
      aria-label="Detalhes da aprovação"
      className={cn("tcrm-approval-drawer", className)}
      data-component="ApprovalDrawer"
      role="complementary"
      {...props}
    />
  );
}


export * from "./billing-impact-settings.js";


export * from "./billing-impact-settings.js";
