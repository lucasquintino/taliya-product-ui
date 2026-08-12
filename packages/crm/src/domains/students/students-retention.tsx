/** Retention, risk, cancellation, and reactivation compositions. */
import React from "react";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Icon,
  IconButton,
  InlineAlert,
  PrimitiveButton,
  cn
} from "@taliya/ui";
import type { ComponentTone, IconName } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import { CopilotSuggestion } from "../../patterns/shell.js";
import { stateKey, toneForState } from "./students-utilities.js";

export function RiskCard({
  title = "Ana Paula Martins",
  state = "high",
  reason = "14 dias sem aula",
  nextAction = "Enviar mensagem humana hoje",
  statusLabel,
  riskLabel,
  lastActivity = <>Ultima aula<br />29/04</>,
  owner = "Mariana",
  avatarSrc,
  onOpen,
  className
}: CrmSurfaceProps & {
  reason?: React.ReactNode;
  nextAction?: React.ReactNode;
  riskLabel?: React.ReactNode;
  lastActivity?: React.ReactNode;
  owner?: React.ReactNode;
  avatarSrc?: string;
  onOpen?: () => void;
}) {
  const key = stateKey(state) || "high";
  const displayRisk = riskLabel ?? (key === "low" ? "baixo" : key === "medium" ? "medio" : "alto");
  const displayStatus = statusLabel ?? "Ativa";

  return (
    <Card className={cn("tcrm-risk-card", `tcrm-risk-card--${key}`, className)} data-state={key}>
      <PrimitiveButton aria-label="Abrir risco" className="tcrm-risk-card__row" onClick={() => onOpen?.()} type="button">
        <Avatar className="tcrm-risk-card__avatar" name={String(title)} size="sm" src={avatarSrc} />
        <strong>{title}</strong>
        <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--active tcrm-risk-card__status" showDot={false} tone="success">{displayStatus}</Chip>
        <Chip className={cn("tcrm-retention-status-chip", "tcrm-risk-card__risk", `tcrm-retention-status-chip--${key}`)} showDot={false} tone={toneForState(state)}>{displayRisk}</Chip>
        <span className="tcrm-risk-card__reason">{reason}</span>
        <span className="tcrm-risk-card__last-activity">{lastActivity}</span>
        <span className="tcrm-risk-card__next-action">{nextAction}</span>
        <span className="tcrm-risk-card__owner">{owner}</span>
        <Icon className="tcrm-risk-card__chevron" name="chevronRight" size="16px" />
      </PrimitiveButton>
    </Card>
  );
}

const cancellationCaseFacts = [
  { label: "Plano:", value: "Plano Mensal" },
  { label: "Solicitado em:", value: "Hoje, 09:20" },
  { label: "Turma atual:", value: "Reformer Iniciante" },
  { label: "Canal:", value: "WhatsApp", icon: "whatsapp" },
  { label: "Valor mensal:", value: "R$ 420,00" },
  { label: "Responsavel:", value: "Mariana" }
] satisfies Array<{ label: string; value: React.ReactNode; icon?: IconName }>;

const cancellationCaseImpact = [
  ["Receita em risco:", "R$ 420/mes"],
  ["Aulas futuras afetadas:", "4"],
  ["Reposicoes em aberto:", "1"],
  ["Contrato:", "ativo"],
  ["Proxima cobranca:", "10/06"]
] as const;

const cancellationCaseHistory = [
  { icon: "checkCircle", tone: "success", text: "Mensagem recebida hoje 09:20" },
  { icon: "alert", tone: "warning", text: "Aluno faltou nas ultimas 2 aulas" },
  { icon: "calendar", tone: "danger", text: "Reposicao oferecida em 09/05" },
  { icon: "clock", tone: "warning", text: "Sem resposta ao convite anterior" }
] as const satisfies Array<{ icon: IconName; tone: ComponentTone; text: string }>;

export function CancellationCase({
  title = "Ana Paula Martins",
  state = "open",
  avatarSrc,
  onClose,
  onAction,
  className
}: CrmSurfaceProps & {
  reason?: React.ReactNode;
  avatarSrc?: string;
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}) {
  return (
    <section className={cn("tcrm-retention-panel", "tcrm-cancellation-case", className)} data-state={state} aria-label={String(title)}>
      <header className="tcrm-retention-panel__header">
        <div className="tcrm-retention-panel__badges">
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--high" showDot={false} tone="danger">Cancelamento</Chip>
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--saving" showDot={false} tone="warning">Em salvamento</Chip>
        </div>
        <IconButton className="tcrm-retention-panel__close" icon="x" label="Fechar caso" onClick={onClose} size="sm" variant="subtle" />
        <div className="tcrm-retention-panel__identity">
          <Avatar className="tcrm-retention-panel__avatar" name={String(title)} size="lg" src={avatarSrc} />
          <h3>{title}</h3>
        </div>
      </header>
      <section className="tcrm-retention-panel__section">
        <h4>1. Resumo do pedido</h4>
        <dl className="tcrm-retention-panel__facts">
          {cancellationCaseFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.icon ? <Icon className="tcrm-retention-panel__whatsapp-icon" name={fact.icon} size="12px" /> : null}{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>2. Motivo declarado</h4>
        <p>Aluno informou dificuldade de encaixar horarios e pediu cancelamento a partir do proximo mes.</p>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>3. Impacto</h4>
        <ul className="tcrm-retention-panel__key-list">
          {cancellationCaseImpact.map(([label, value]) => <li key={label}><span>{label}</span><strong>{value}</strong></li>)}
        </ul>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>4. Plano de salvamento</h4>
        <ol className="tcrm-retention-panel__plan">
          <li>Oferecer dois horarios alternativos</li>
          <li>Confirmar se pausa temporaria resolve</li>
          <li>Registrar decisao final ate hoje 16:00</li>
        </ol>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>5. Automacao</h4>
        <InlineAlert className="tcrm-retention-panel__automation" tone="warning">Automacoes de cobranca e retencao pausadas ate decisao humana.</InlineAlert>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>6. Sugestao do copiloto</h4>
        <CopilotSuggestion className="tcrm-retention-panel__suggestion" description="Responder de forma humana, validar a dificuldade de agenda e oferecer uma pausa de 15 dias ou dois horarios alternativos antes de confirmar o cancelamento." />
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>7. Historico curto</h4>
        <ul className="tcrm-retention-panel__history">
          {cancellationCaseHistory.map((item) => <li key={item.text}><Icon name={item.icon} tone={item.tone} size="11px" />{item.text}</li>)}
        </ul>
      </section>
      <div className="tcrm-retention-panel__actions">
        <Button leadingIcon="whatsapp" onClick={() => onAction?.("message")} size="sm" variant="primary">Enviar mensagem</Button>
        <Button leadingIcon="calendar" onClick={() => onAction?.("task")} size="sm" variant="secondary">Criar tarefa</Button>
        <Button leadingIcon="pause" onClick={() => onAction?.("pause")} size="sm" variant="secondary">Registrar pausa</Button>
        <Button leadingIcon="x" onClick={() => onAction?.("cancel")} size="sm" variant="secondary">Confirmar cancelamento</Button>
        <Button leadingIcon="user" onClick={() => onAction?.("student")} size="sm" variant="secondary">Abrir aluno</Button>
        <Button leadingIcon="message" onClick={() => onAction?.("conversation")} size="sm" variant="secondary">Abrir conversa</Button>
      </div>
    </section>
  );
}
