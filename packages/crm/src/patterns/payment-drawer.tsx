/** Payment drawer pattern. */
import React from "react";
import { Button, Icon, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import { CrmDrawer } from "./drawer-core.js";

export type PaymentDrawerState =
  | "open"
  | "due"
  | "overdue"
  | "promise"
  | "reconciliation"
  | "reconciled"
  | "dispute"
  | "paid"
  | "failed"
  | "loading"
  | "blocked";
export type PaymentDrawerAction =
  | "close"
  | "send-reminder"
  | "open-charge"
  | "register-promise"
  | "move-stage"
  | "approve-receipt"
  | "copy-pix-link"
  | "open-conversation"
  | "mark-paid"
  | "confirm-payment"
  | "reconcile"
  | "resolve-dispute"
  | "open-receipt"
  | "export-movement"
  | "create-task"
  | "open-student";

export interface PaymentDrawerActionConfig {
  id: PaymentDrawerAction;
  label: React.ReactNode;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  variant?: "primary" | "secondary";
  placement?: "primary" | "grid" | "footer";
  disabled?: boolean;
}

export interface PaymentDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "danger" | "success" | "whatsapp";
}

export interface PaymentDrawerHistoryItem {
  id: string;
  label: React.ReactNode;
}

export interface PaymentDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: PaymentDrawerState;
  variant?: "collection" | "movement";
  compact?: boolean;
  eyebrow?: React.ReactNode;
  name?: React.ReactNode;
  amount?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: PaymentDrawerFact[];
  context?: React.ReactNode[];
  history?: PaymentDrawerHistoryItem[];
  copilotSuggestion?: React.ReactNode;
  markPaidDisabled?: boolean;
  actions?: PaymentDrawerActionConfig[];
  onAction?: (action: PaymentDrawerAction) => void;
  onClose?: () => void;
}

const sourcePaymentDrawerFacts: PaymentDrawerFact[] = [
  { id: "amount", icon: "wallet", label: "Valor", value: "R$ 420,00" },
  { id: "due", icon: "calendar", label: "Vencimento", value: "2 dias em atraso", tone: "danger" },
  { id: "status", icon: "checkCircle", label: "Status", value: "Em atraso", tone: "danger" },
  { id: "type", icon: "folder", label: "Tipo", value: "Mensalidade" },
  { id: "origin", icon: "tag", label: "Origem", value: "Sistema / mensalidade recorrente" },
  { id: "owner", icon: "clipboard", label: "Responsável", value: "Financeiro" },
  { id: "student", icon: "user", label: "Aluno vinculado", value: "Gabriela Lima" },
  { id: "channel", icon: "message", label: "Canal sugerido", value: <><Icon name="whatsapp" size="13px" /> WhatsApp</>, tone: "whatsapp" }
];

const sourcePaymentDrawerHistory: PaymentDrawerHistoryItem[] = [
  { id: "created", label: "Cobrança gerada automaticamente" },
  { id: "reminder", label: "Lembrete enviado ontem" },
  { id: "none", label: "Nenhuma resposta registrada" }
];

const sourcePaymentDrawerContext = [
  "Mensalidade recorrente vencida há 2 dias.",
  "Nenhum comprovante recebido até agora."
];

function emitPaymentDrawerAction(action: PaymentDrawerAction, onAction?: (action: PaymentDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function PaymentDrawer({
  open = true,
  state = "overdue",
  variant = "collection",
  compact = false,
  eyebrow,
  name = "Gabriela Lima",
  amount = "R$ 420,00",
  statusLabel = "Em atraso",
  facts = sourcePaymentDrawerFacts,
  context = sourcePaymentDrawerContext,
  history = sourcePaymentDrawerHistory,
  copilotSuggestion = <>Copiloto, tudo bem? Identificamos que sua mensalidade de R$ 420,00 venceu há 2 dias. Posso te lembrar o link de pagamento?</>,
  markPaidDisabled = false,
  actions,
  onAction,
  onClose,
  className,
  ...props
}: PaymentDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const isPaid = state === "paid";
  const isReconciled = state === "reconciled";
  const isFailed = state === "failed";
  const isDue = state === "due" || state === "open";
  const isMovement = variant === "movement";
  const effectiveStatus = isPaid ? "Pago" : isFailed ? "Falha" : statusLabel;
  const defaultActions: PaymentDrawerActionConfig[] = isMovement
    ? [
        { id: "send-reminder", label: "Enviar lembrete", leadingIcon: "tag", placement: "primary", variant: "primary" },
        { id: "copy-pix-link", label: "Copiar link Pix", leadingIcon: "link" },
        { id: "open-conversation", label: "Abrir conversa", leadingIcon: "whatsapp" },
        { id: "mark-paid", label: "Marcar como pago", leadingIcon: "checkCircle" },
        { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
        { id: "open-student", label: "Abrir aluno", leadingIcon: "user", trailingIcon: "arrowRight", placement: "footer" }
      ]
    : [
        { id: "send-reminder", label: "Enviar lembrete", leadingIcon: "tag", placement: "primary", variant: "primary" },
        { id: "open-charge", label: "Abrir cobrança", leadingIcon: "whatsapp" },
        { id: "register-promise", label: "Registrar promessa", leadingIcon: "calendar" },
        { id: "mark-paid", label: "Marcar como pago", leadingIcon: "checkCircle" },
        { id: "create-task", label: "Criar tarefa", leadingIcon: "calendar" },
        { id: "open-student", label: "Abrir aluno", leadingIcon: "user", trailingIcon: "arrowRight", placement: "footer" }
      ];
  const effectiveActions = actions ?? defaultActions;
  const actionDisabled = (action: PaymentDrawerActionConfig) =>
    isBlocked || action.disabled || ((isPaid || isReconciled || markPaidDisabled) && ["mark-paid", "confirm-payment", "reconcile", "resolve-dispute"].includes(action.id));
  const primaryActions = effectiveActions.filter((action) => action.placement === "primary");
  const gridActions = effectiveActions.filter((action) => !action.placement || action.placement === "grid");
  const footerActions = effectiveActions.filter((action) => action.placement === "footer");

  return (
    <CrmDrawer
      aria-label="Detalhes da cobrança"
      className={cn("tcrm-payment-drawer", `tcrm-payment-drawer--${state}`, `tcrm-payment-drawer--${variant}`, compact && "tcrm-payment-drawer--compact", className)}
      closeLabel="Fechar cobrança"
      component="PaymentDrawer"
      eyebrow={eyebrow ?? (isMovement ? "Mensalidade" : "Cobrança")}
      footer={(
        <div className="tcrm-payment-drawer__footer">
          <h3>{isMovement ? "Ações" : "Ações principais"}</h3>
          {primaryActions.map((action) => <Button className="tcrm-payment-drawer__primary" disabled={actionDisabled(action)} key={action.id} leadingIcon={action.leadingIcon} onClick={() => emitPaymentDrawerAction(action.id, onAction)} size="sm" trailingIcon={action.trailingIcon} variant={action.variant ?? "primary"}>{action.label}</Button>)}
          {gridActions.length > 0 ? <div className="tcrm-payment-drawer__actions">
            {gridActions.map((action) => <Button className="tcrm-payment-drawer__action" disabled={actionDisabled(action)} key={action.id} leadingIcon={action.leadingIcon} onClick={() => emitPaymentDrawerAction(action.id, onAction)} size="sm" trailingIcon={action.trailingIcon} variant={action.variant ?? "secondary"}>{action.label}</Button>)}
          </div> : null}
          {!isMovement ? <h3>Ação secundária</h3> : null}
          {footerActions.map((action) => <Button className="tcrm-payment-drawer__student" disabled={actionDisabled(action)} key={action.id} leadingIcon={action.leadingIcon} onClick={() => emitPaymentDrawerAction(action.id, onAction)} size="sm" trailingIcon={action.trailingIcon} variant={action.variant ?? "secondary"}>{action.label}</Button>)}
        </div>
      )}
      headerClassName="tcrm-payment-drawer__header"
      headerOrder="label-title-status"
      loading={isLoading}
      onClose={() => emitPaymentDrawerAction("close", onAction, onClose)}
      state={state}
      status={(
          <span className={cn("tcrm-payment-drawer__status-label", isDue && "tcrm-payment-drawer__status-label--due", (isPaid || isReconciled) && "tcrm-payment-drawer__status-label--paid", isFailed && "tcrm-payment-drawer__status-label--failed")}>
          {effectiveStatus}
        </span>
      )}
      title={name}
      {...props}
    >
      <section className="tcrm-payment-drawer__summary" aria-label="Resumo">
        <h3>Resumo</h3>
        <dl>
          {facts.map((fact) => (
            <div className={cn("tcrm-payment-drawer__fact", fact.tone && `tcrm-payment-drawer__fact--${fact.tone}`)} key={fact.id}>
              <Icon name={fact.icon} size="13px" />
              <dt>{fact.label}</dt>
              <dd>{fact.id === "amount" ? amount : fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="tcrm-payment-drawer__context" aria-label="Contexto">
        <h3>Contexto</h3>
        {context.map((line, index) => <p key={`payment-context-${String(line)}-${index}`}>{line}</p>)}
      </section>

      <section className="tcrm-payment-drawer__history" aria-label="Histórico recente">
        <h3>Histórico recente</h3>
        <ol>
          {history.map((item) => (
            <li key={item.id}>
              <span aria-hidden="true" />
              <p>{item.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="tcrm-payment-drawer__copilot" aria-label="Sugestão do copiloto">
        <Icon name="sparkles" size="24px" />
        <p>{copilotSuggestion}</p>
      </section>
    </CrmDrawer>
  );
}

