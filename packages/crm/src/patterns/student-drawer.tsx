/** Student drawer pattern. */
import React from "react";
import { Avatar, Badge, Button, Chip, Icon, IconButton, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import { CrmDrawer } from "./drawer-core.js";

export type StudentDrawerState = "active" | "paused" | "delinquent" | "risk" | "sensitive" | "loading" | "blocked";
export type StudentDrawerAction = "close" | "open-profile" | "message" | "create-task" | "schedule" | "note" | "update-data";
export type StudentDrawerFinanceStatus = "ok" | "pending" | "overdue";

export interface StudentDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "success" | "warning" | "danger";
}

export interface StudentDrawerClassItem {
  id: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  badge?: React.ReactNode;
}

export interface StudentDrawerPendingItem {
  id: string;
  label: React.ReactNode;
}

export interface StudentDrawerFinance {
  status: StudentDrawerFinanceStatus;
  statusLabel?: React.ReactNode;
  lastPayment?: React.ReactNode;
  amount?: React.ReactNode;
}

export interface StudentDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: StudentDrawerState;
  name?: React.ReactNode;
  avatarSrc?: string;
  statusLabel?: React.ReactNode;
  facts?: StudentDrawerFact[];
  classes?: StudentDrawerClassItem[];
  pendingItems?: StudentDrawerPendingItem[];
  finance?: StudentDrawerFinance;
  onAction?: (action: StudentDrawerAction) => void;
  onClose?: () => void;
}

const sourceStudentDrawerFacts: StudentDrawerFact[] = [
  { id: "plan", icon: "calendar", label: "Plano atual", value: "Plano Mensal" },
  { id: "class", icon: "users", label: "Turma atual", value: "Reformer Iniciante" },
  { id: "owner", icon: "users", label: "Responsável principal", value: "Camila Martins" },
  { id: "phone", icon: "phone", label: "WhatsApp / Telefone", value: "(11) 98765-4321" },
  { id: "consent", icon: "checkCircle", label: "Consentimento", value: <>WhatsApp permitido /<br />contrato assinado</>, tone: "success" }
];

const sourceStudentDrawerClasses: StudentDrawerClassItem[] = [
  { id: "thu", title: "Qui, 15/05 · 07:00", subtitle: "Reformer Iniciante", badge: "Aula" },
  { id: "fri", title: "Sex, 17/05 · 07:00", subtitle: "Reformer Iniciante", badge: "Aula" }
];

const sourceStudentDrawerPending: StudentDrawerPendingItem[] = [
  { id: "emergency", label: "Atualizar contato de emergência" },
  { id: "extra-class", label: "Confirmar disponibilidade para aula extra" }
];

const sourceStudentDrawerFinance: StudentDrawerFinance = {
  status: "pending",
  statusLabel: "pagamento pendente",
  lastPayment: "05/04/2024",
  amount: "R$ 199.00"
};

function emitStudentDrawerAction(action: StudentDrawerAction, onAction?: (action: StudentDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function StudentDrawer({
  open = true,
  state = "active",
  name = "Ana Paula Martins",
  avatarSrc,
  statusLabel,
  facts = sourceStudentDrawerFacts,
  classes = sourceStudentDrawerClasses,
  pendingItems = sourceStudentDrawerPending,
  finance = sourceStudentDrawerFinance,
  onAction,
  onClose,
  className,
  ...props
}: StudentDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const riskMode = state === "risk";
  const statusMode = state === "paused" ? "paused" : state === "delinquent" ? "delinquent" : riskMode ? "risk" : "active";
  const resolvedStatusLabel = statusLabel ?? ({
    active: "Ativa",
    paused: "Pausada",
    delinquent: "Inadimplente",
    risk: "Em risco",
    sensitive: "Atenção",
    loading: "Carregando",
    blocked: "Bloqueada"
  } satisfies Record<StudentDrawerState, React.ReactNode>)[state];
  const financeStatusLabel = finance.statusLabel ?? ({ ok: "em dia", pending: "pagamento pendente", overdue: "em atraso" } satisfies Record<StudentDrawerFinanceStatus, React.ReactNode>)[finance.status];

  const drawerHeader = (
    <header className="tcrm-student-drawer__header">
      <Avatar className="tcrm-student-drawer__avatar" name={String(name)} size="lg" src={avatarSrc} />
      <div>
        <h2>{name}</h2>
        <Chip className={cn("tcrm-student-drawer__status", `tcrm-student-drawer__status--${statusMode}`)} showDot={false}>
          {resolvedStatusLabel}
        </Chip>
      </div>
      <IconButton className="tcrm-student-drawer__close" disabled={isLoading} icon="x" label="Fechar aluno" onClick={() => emitStudentDrawerAction("close", onAction, onClose)} size="sm" variant="default" />
    </header>
  );

  const drawerFooter = (
    <div className="tcrm-student-drawer__footer">
      <Button className="tcrm-student-drawer__origin" disabled={isBlocked} onClick={() => emitStudentDrawerAction("open-profile", onAction)} size="sm" trailingIcon="externalLink" variant="primary">
        Abrir perfil
      </Button>
      <p>Mais informações, histórico e documentos</p>
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="whatsapp" onClick={() => emitStudentDrawerAction("message", onAction)} size="sm" variant="secondary">Enviar mensagem</Button>
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="calendar" onClick={() => emitStudentDrawerAction("schedule", onAction)} size="sm" variant="secondary">Agendar</Button>
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="clipboard" onClick={() => emitStudentDrawerAction("create-task", onAction)} size="sm" variant="secondary">Criar tarefa</Button>
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="clipboard" onClick={() => emitStudentDrawerAction("note", onAction)} size="sm" variant="secondary">Registrar nota</Button>
      <Button className="tcrm-student-drawer__action" disabled={isBlocked} leadingIcon="edit" onClick={() => emitStudentDrawerAction("update-data", onAction)} size="sm" variant="secondary">Atualizar dados</Button>
    </div>
  );

  return (
    <CrmDrawer
      aria-busy={isLoading || undefined}
      aria-label="Resumo do aluno"
      className={cn("tcrm-student-drawer", `tcrm-student-drawer--${state}`, className)}
      component="StudentDrawer"
      footer={drawerFooter}
      header={drawerHeader}
      loading={isLoading}
      state={state}
      title={name}
      {...props}
    >
      <dl className="tcrm-student-drawer__facts">
        {facts.map((fact) => (
          <div className={cn("tcrm-student-drawer__fact", fact.tone && `tcrm-student-drawer__fact--${fact.tone}`)} key={fact.id}>
            <Icon name={fact.icon} size="14px" />
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <section className="tcrm-student-drawer__section tcrm-student-drawer__classes" aria-label="Próximas duas aulas">
        <h3>Próximas 2 aulas</h3>
        <ul>
          {classes.map((item) => (
            <li key={item.id}>
              <span className="tcrm-student-drawer__class-icon"><Icon name="calendar" size="14px" /></span>
              <p><strong>{item.title}</strong><small>{item.subtitle}</small></p>
              {item.badge ? <Chip className="tcrm-student-drawer__class-badge" showDot={false}>{item.badge}</Chip> : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="tcrm-student-drawer__section tcrm-student-drawer__finance" aria-label="Financeiro">
        <h3>Financeiro</h3>
        <dl>
          <div><dt>Status</dt><dd><Chip className={cn("tcrm-student-drawer__payment-chip", `is-${finance.status}`)} showDot={false}>{financeStatusLabel}</Chip></dd></div>
          <div><dt>Último pagamento</dt><dd>{finance.lastPayment ?? "—"} {finance.amount ? <span>{finance.amount}</span> : null}</dd></div>
        </dl>
      </section>

      <section className="tcrm-student-drawer__section tcrm-student-drawer__presence" aria-label="Presença recente">
        <h3>Presença recente</h3>
        <div>
          <span className="tcrm-student-drawer__presence-ring" role="img" aria-label="80% de presença" />
          <p><strong>{riskMode ? "4 de 10 aulas" : "8 de 10 aulas"}</strong><small>{riskMode ? "40% de presença" : "80% de presença"}</small></p>
          <Chip className={cn("tcrm-student-drawer__frequency-chip", riskMode && "tcrm-student-drawer__frequency-chip--risk")} showDot={false}>
            {riskMode ? "Atenção" : "Boa frequência"}
          </Chip>
        </div>
      </section>

      <section className="tcrm-student-drawer__section tcrm-student-drawer__pending" aria-label="Pendências abertas">
        <h3>Pendências abertas <Badge className="tcrm-student-drawer__pending-count" tone="danger" variant="count">{pendingItems.length}</Badge></h3>
        <ul>
          {pendingItems.map((item) => (
            <li key={item.id}><span aria-hidden="true" />{item.label}</li>
          ))}
        </ul>
      </section>
    </CrmDrawer>
  );
}

