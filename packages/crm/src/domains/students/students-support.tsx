/** Support, access, and customer-service compositions. */
import React from "react";
import {
  Avatar,
  Button,
  Chip,
  ConfirmDialog,
  Icon,
  IconButton,
  InlineAlert,
  StatusDot,
  cn
} from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import { CopilotSuggestion } from "../../patterns/shell.js";
import { stateKey } from "./students-utilities.js";
import type {
  SupportTicketPanelFact,
  SupportTicketPanelMessage,
  SupportTicketDrawerAction
} from "../../patterns/support-drawer.js";

export function ReactivationCard({
  title = "Ana Paula Martins",
  state = "candidate",
  avatarSrc,
  onClose,
  onAction,
  className
}: CrmSurfaceProps & {
  opportunity?: React.ReactNode;
  avatarSrc?: string;
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}) {
  return (
    <section className={cn("tcrm-retention-panel", "tcrm-reactivation-card", className)} data-state={state} aria-label={String(title)}>
      <header className="tcrm-retention-panel__header">
        <div className="tcrm-retention-panel__badges">
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--reactivation" showDot={false} tone="info">Reativacao</Chip>
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--eligible" showDot={false} tone="success">Elegivel</Chip>
        </div>
        <IconButton className="tcrm-retention-panel__close" icon="x" label="Fechar caso" onClick={onClose} size="sm" variant="subtle" />
        <div className="tcrm-retention-panel__identity">
          <Avatar className="tcrm-retention-panel__avatar" name={String(title)} size="lg" src={avatarSrc} />
          <h3>{title}</h3>
        </div>
      </header>
      <section className="tcrm-retention-panel__section">
        <h4>1. Resumo</h4>
        <dl className="tcrm-retention-panel__facts">
          {[
            ["Plano anterior:", "Plano Mensal"],
            ["Motivo:", "dificuldade de agenda"],
            ["Turma anterior:", "Reformer Iniciante"],
            ["Ultima conversa:", "30/04"],
            ["Saiu em:", "29/04"],
            ["Contato permitido:", "WhatsApp"]
          ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value === "WhatsApp" ? <Icon className="tcrm-retention-panel__whatsapp-icon" name="whatsapp" size="12px" /> : null}{value}</dd></div>)}
        </dl>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>2. Oportunidade de retorno</h4>
        <dl className="tcrm-retention-panel__simple-facts">
          <div><dt>Vaga aberta:</dt><dd>Quinta, 09:00</dd></div>
          <div><dt>Turma:</dt><dd>Reformer Iniciante <small><StatusDot status="success" label="1 vaga disponivel" /></small></dd></div>
          <div><dt>Plano sugerido:</dt><dd>Plano Mensal</dd></div>
        </dl>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>3. Restricoes</h4>
        <ul className="tcrm-retention-panel__bullets">
          <li>Nao prometer desconto automatico</li>
          <li>Confirmar disponibilidade antes de reservar</li>
          <li>Respeitar "nao contatar" se marcado</li>
        </ul>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>4. Sugestao do copiloto</h4>
        <CopilotSuggestion className="tcrm-retention-panel__suggestion" description="Enviar uma mensagem curta oferecendo a vaga de quinta as 09h e perguntando se o horario voltou a servir.">
          <small>O copiloto sugere e prepara a mensagem; a decisao de contato e humana.</small>
        </CopilotSuggestion>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>5. Historico curto</h4>
        <ul className="tcrm-retention-panel__history">
          <li><Icon name="alert" tone="danger" size="11px" />Cancelamento registrado em 29/04</li>
          <li><Icon name="calendar" tone="info" size="11px" />Plano de salvamento recusado em 29/04</li>
          <li><Icon name="whatsapp" tone="success" size="11px" />Nova vaga compativel detectada hoje</li>
        </ul>
      </section>
      <div className="tcrm-retention-panel__actions">
        <Button leadingIcon="whatsapp" onClick={() => onAction?.("message")} size="sm" variant="primary">Enviar mensagem</Button>
        <Button leadingIcon="calendar" onClick={() => onAction?.("task")} size="sm" variant="secondary">Criar tarefa</Button>
        <Button leadingIcon="calendar" onClick={() => onAction?.("reserve")} size="sm" variant="secondary">Reservar vaga</Button>
        <Button leadingIcon="checkCircle" onClick={() => onAction?.("no-contact")} size="sm" variant="secondary">Marcar como nao contatar</Button>
        <Button leadingIcon="user" onClick={() => onAction?.("student")} size="sm" variant="secondary">Abrir aluno</Button>
        <Button leadingIcon="message" onClick={() => onAction?.("conversation")} size="sm" variant="secondary">Abrir conversa</Button>
      </div>
    </section>
  );
}

export function ComplaintPanel({
  title = "Ana Paula Martins",
  state = "severe",
  avatarSrc,
  onClose,
  onAction,
  className
}: CrmSurfaceProps & {
  avatarSrc?: string;
  onClose?: () => void;
  onAction?: (actionId: string) => void;
}) {
  return (
    <section className={cn("tcrm-retention-panel", "tcrm-complaint-panel", className)} data-state={state} aria-label={String(title)}>
      <header className="tcrm-retention-panel__header">
        <div className="tcrm-retention-panel__badges">
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--reactivation" showDot={false} tone="info">Reclamacao</Chip>
          <Chip className="tcrm-retention-status-chip tcrm-retention-status-chip--high" showDot={false} tone="danger">Alta severidade</Chip>
        </div>
        <IconButton className="tcrm-retention-panel__close" icon="x" label="Fechar caso" onClick={onClose} size="sm" variant="subtle" />
        <div className="tcrm-retention-panel__identity">
          <Avatar className="tcrm-retention-panel__avatar" name={String(title)} size="lg" src={avatarSrc} />
          <h3>{title}</h3>
        </div>
      </header>
      <section className="tcrm-retention-panel__section">
        <h4>1. Resumo do caso</h4>
        <dl className="tcrm-retention-panel__facts">
          {[
            { label: "Aluno:", value: "Ana Paula Martins" },
            { label: "Status:", value: "Aguardando resposta", tone: "waiting" },
            { label: "Origem:", value: "WhatsApp", icon: "whatsapp" },
            { label: "Responsavel:", value: "Mariana" },
            { label: "Severidade:", value: "Alta", tone: "danger" },
            { label: "Prazo:", value: "Hoje 14:00", tone: "danger" }
          ].map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd className={fact.tone ? `tcrm-retention-panel__value--${fact.tone}` : undefined}>
                {fact.icon ? <Icon className="tcrm-retention-panel__whatsapp-icon" name={fact.icon as IconName} size="12px" /> : null}
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>2. Motivo declarado</h4>
        <p>Aluna reclamou que pediu reposicao ha 3 dias e ainda nao recebeu opcao de encaixe.</p>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>3. Impacto</h4>
        <ul className="tcrm-retention-panel__bullets">
          <li>Risco de cancelamento</li>
          <li>1 reposicao em aberto</li>
          <li>Conversa sem resposta ha 2h</li>
          <li>Turma com vaga compativel hoje as 18:00</li>
        </ul>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>4. Automacao pausada</h4>
        <InlineAlert className="tcrm-retention-panel__automation" tone="warning">Mensagens automaticas e acoes autonomas pausadas ate revisao humana.</InlineAlert>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>5. Plano de resolucao</h4>
        <ul className="tcrm-retention-panel__resolution">
          <li>Revisar historico da reposicao</li>
          <li>Oferecer duas opcoes reais de encaixe</li>
          <li>Responder com pedido de desculpas e solucao objetiva</li>
          <li>Registrar acompanhamento apos resposta</li>
        </ul>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>6. Sugestao do copiloto</h4>
        <CopilotSuggestion className="tcrm-retention-panel__suggestion" description="Oi Ana, sinto muito pela demora. Encontrei duas opcoes para sua reposicao: hoje as 18h ou sexta as 09h. Posso reservar uma delas para voce?">
          <small>O copiloto sugere a resposta; a revisao e o envio sao humanos.</small>
        </CopilotSuggestion>
      </section>
      <section className="tcrm-retention-panel__section">
        <h4>7. Historico curto</h4>
        <ul className="tcrm-retention-panel__history">
          <li><Icon name="checkCircle" tone="success" size="11px" />Pedido de reposicao aberto em 10/05</li>
          <li><Icon name="alert" tone="danger" size="11px" />Agente nao encontrou encaixe automatico</li>
          <li><Icon name="whatsapp" tone="success" size="11px" />Mensagem da aluna recebida hoje 09:20</li>
          <li><Icon name="alert" tone="danger" size="11px" />Caso marcado como alta severidade</li>
        </ul>
      </section>
      <div className="tcrm-retention-panel__actions">
        <Button leadingIcon="arrowLeft" onClick={() => onAction?.("reply")} size="sm" variant="primary">Responder</Button>
        <Button leadingIcon="calendar" onClick={() => onAction?.("task")} size="sm" variant="secondary">Criar tarefa</Button>
        <Button leadingIcon="upload" onClick={() => onAction?.("escalate")} size="sm" variant="secondary">Escalar</Button>
        <Button leadingIcon="checkCircle" onClick={() => onAction?.("resolve")} size="sm" variant="secondary">Marcar resolvida</Button>
        <Button leadingIcon="user" onClick={() => onAction?.("student")} size="sm" variant="secondary">Abrir aluno</Button>
        <Button leadingIcon="message" onClick={() => onAction?.("conversation")} size="sm" variant="secondary">Abrir conversa</Button>
      </div>
    </section>
  );
}

export function SensitiveActionDialog({
  inline = true,
  ...props
}: Partial<React.ComponentProps<typeof ConfirmDialog>>) {
  return (
    <div className="tcrm-sensitive-action-dialog">
      <ConfirmDialog
      confirmLabel="Confirmar ação sensível"
        destructive
        inline={inline}
      description="A ação precisa de confirmação explícita e contexto auditável."
        open
      title="Ação sensível"
      {...props}
      />
    </div>
  );
}

const defaultSupportTicketFacts: SupportTicketPanelFact[] = [
  { id: "type", label: "Tipo", value: "Importação", icon: "folder", tone: "info" },
  { id: "status", label: "Status", value: <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--analysis" showDot={false} tone="info">Em análise</Chip>, icon: "link" },
  { id: "impact", label: "Impacto", value: "Dados de alunos", icon: "clipboard" },
  { id: "owner", label: "Responsável", value: <span className="tcrm-support-ticket-panel__brand-value"><Icon name="bot" size="14px" />Taliya</span>, icon: "user" },
  { id: "priority", label: "Prioridade", value: <span className="tcrm-support-ticket-panel__dot-value"><span />Média</span>, icon: "star" },
  { id: "created", label: "Criado", value: "hoje 09:12", icon: "calendar" },
  { id: "next", label: "Próxima ação", value: <span className="tcrm-support-ticket-panel__next-action"><Icon name="chevronRight" size="12px" />Enviar arquivo original</span>, icon: "send" }
];

const defaultSupportTicketMessages: SupportTicketPanelMessage[] = [
  { id: "studio", icon: "user", text: "Studio: Importei a planilha e alguns alunos apareceram duplicados.", tone: "info" },
  { id: "support", icon: "sparkles", text: "Suporte 24/7: Entendi. Você pode anexar o arquivo original para eu comparar os dados?" },
  { id: "taliya", icon: "bot", text: "Taliya: Vamos revisar a importação e retornar com os registros afetados." }
];

export function SupportTicketPanel({
  title = "Importação duplicou alunos",
  subtitle = "Studio pediu ajuda para revisar dados importados",
  facts = defaultSupportTicketFacts,
  summary = "O agente identificou possível duplicidade por telefone e preparou o contexto para o suporte humano.",
  messages = defaultSupportTicketMessages,
  state = "open",
  variant = "support",
  onClose,
  onAction,
  className
}: CrmSurfaceProps & {
  variant?: "support" | "internal";
  subtitle?: React.ReactNode;
  facts?: SupportTicketPanelFact[];
  summary?: React.ReactNode;
  messages?: SupportTicketPanelMessage[];
  onClose?: () => void;
  onAction?: (actionId: SupportTicketDrawerAction) => void;
}) {
  const key = stateKey(state) || "open";
  const isDisabled = key === "loading" || key === "blocked";
  const hasActiveAccess = key === "access-active";
  const isAnswered = key === "answered";

  if (variant === "internal") {
    return (
      <section className={cn("tcrm-support-ticket-panel", "tcrm-support-ticket-panel--internal", className)} data-state={key} aria-label={String(title)}>
        <header className="tcrm-support-ticket-panel__header">
          <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--selected" showDot={false} tone="info">Ticket interno selecionado</Chip>
          <IconButton className="tcrm-support-ticket-panel__close" disabled={isDisabled} icon="x" label="Fechar ticket" onClick={onClose} size="sm" variant="subtle" />
          <h3>{title}</h3>
          <p>Studio Vila Mariana pediu ajuda via Suporte</p>
        </header>
        <dl className="tcrm-support-ticket-panel__facts tcrm-support-ticket-panel__facts--internal">
          {[
            ["Studio:", "Studio Vila Mariana", "calendar"],
            ["Origem:", "/app/suporte", "home"],
            ["Tipo:", "Importação", "folder"],
            ["Status:", <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--analysis" key="status" showDot={false} tone="info">Em análise</Chip>, "settings"],
            ["Responsável:", "Marina - Suporte", "user"],
            ["Severidade:", <span className="tcrm-support-ticket-panel__dot-value" key="severity"><span />Média</span>, "link"],
            ["Grant:", <span className="tcrm-support-ticket-panel__dot-value tcrm-support-ticket-panel__dot-value--success" key="grant"><span />Ativo até hoje 18:00</span>, "link"],
            ["Escopo:", <>Importação e<br />duplicidades</>, "shield"]
          ].map(([label, value, icon]) => (
            <div key={String(label)}>
              <Icon name={icon as IconName} size="13px" />
              <dt>{label}</dt>
              <dd>{value as React.ReactNode}</dd>
            </div>
          ))}
        </dl>
        <section className="tcrm-support-ticket-panel__suggestion">
          <Icon name="sparkles" size="18px" tone="info" />
          <div>
            <strong>Resumo do agente 24/7</strong>
            <p>O studio anexou a planilha original.<br />Possível duplicidade por telefone.</p>
          </div>
        </section>
        <section className="tcrm-support-ticket-panel__grant-ok">
          <Icon name="shieldCheck" size="19px" tone="success" />
          <div>
            <strong>Acesso permitido</strong>
            <p>Acesso temporário autorizado pelo studio.<br />Todas as ações serão auditadas.</p>
          </div>
        </section>
        <section className="tcrm-support-ticket-panel__history">
          <h4>Histórico</h4>
          {[
            ["Studio abriu ticket", "hoje 09:12", "user"],
            ["Agente 24/7 coletou contexto", "hoje 09:15", "clock"],
            ["Grant aprovado pelo dono", "hoje 09:18", "shieldCheck"],
            ["Suporte iniciou análise", "hoje 09:21", "user"]
          ].map(([text, time, icon]) => (
            <div key={text}>
              <Icon name={icon as IconName} size="14px" />
              <span>{text}</span>
              <time>{time}</time>
            </div>
          ))}
        </section>
        <div className="tcrm-support-ticket-panel__actions tcrm-support-ticket-panel__actions--internal">
          <Button disabled={isDisabled} leadingIcon="shield" onClick={() => onAction?.("use-grant")} size="sm" variant="primary">Usar grant</Button>
          <Button disabled={isDisabled} leadingIcon="arrowLeft" onClick={() => onAction?.("reply-studio")} size="sm" variant="secondary">Responder studio</Button>
          <Button disabled={isDisabled} leadingIcon="lock" onClick={() => onAction?.("tenant")} size="sm" variant="secondary">Abrir tenant</Button>
          <Button disabled={isDisabled} leadingIcon="upload" onClick={() => onAction?.("import")} size="sm" variant="secondary">Abrir importação</Button>
          <Button disabled={isDisabled} leadingIcon="shield" onClick={() => onAction?.("audit")} size="sm" variant="secondary">Abrir auditoria</Button>
          <Button disabled={isDisabled} leadingIcon="x" onClick={() => onAction?.("revoke")} size="sm" variant="secondary">Encerrar grant</Button>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("tcrm-support-ticket-panel", "tcrm-support-ticket-panel--support", className)} data-state={key} aria-label={String(title)}>
      <header className="tcrm-support-ticket-panel__header">
        <Chip className="tcrm-internal-status-chip tcrm-internal-status-chip--selected" showDot={false} tone={isAnswered ? "success" : "info"}>{isAnswered ? "Ticket respondido" : "Ticket selecionado"}</Chip>
          <IconButton className="tcrm-support-ticket-panel__close" disabled={isDisabled} icon="x" label="Fechar ticket" onClick={onClose} size="sm" variant="subtle" />
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </header>
      <dl className="tcrm-support-ticket-panel__facts">
        {facts.map((fact) => (
          <div key={fact.id}>
            <Icon name={fact.icon} size="14px" tone={fact.tone} />
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <h4 className="tcrm-support-ticket-panel__section-title">Resumo do agente 24/7</h4>
      <section className="tcrm-support-ticket-panel__suggestion">
        <Icon name="sparkles" size="18px" tone="info" />
        <p>{summary}</p>
      </section>
      <section className="tcrm-support-ticket-panel__conversation">
        <h4>Conversa do ticket</h4>
        {messages.map((message) => (
          <div className="tcrm-support-ticket-panel__message" key={message.id}>
            <span><Icon name={message.icon} size="18px" tone={message.tone} /></span>
            <p>{message.text}</p>
          </div>
        ))}
      </section>
      <section className="tcrm-support-ticket-panel__access">
        <div>
          <h4>Acesso temporário</h4>
          <Chip className={cn("tcrm-internal-status-chip", hasActiveAccess ? "tcrm-internal-status-chip--grant" : "tcrm-internal-status-chip--unauthorized")} showDot={false} tone={hasActiveAccess ? "success" : "danger"}>{hasActiveAccess ? "Autorizado" : "Não autorizado"}</Chip>
        </div>
        <p><Icon name={hasActiveAccess ? "shieldCheck" : "lock"} size="15px" />{hasActiveAccess ? "Acesso limitado ativo, escopado e auditado." : "A Taliya pode solicitar acesso limitado se precisar investigar dados."}</p>
        <Button disabled={isDisabled} leadingIcon={hasActiveAccess ? "x" : "link"} onClick={() => onAction?.(hasActiveAccess ? "revoke-access" : "request-access")} size="sm" variant="secondary">{hasActiveAccess ? "Revogar acesso" : "Autorizar acesso"}</Button>
      </section>
      <div className="tcrm-support-ticket-panel__actions">
        <Button disabled={isDisabled} leadingIcon="arrowLeft" onClick={() => onAction?.("reply")} size="sm" variant="primary">Responder</Button>
        <Button disabled={isDisabled} leadingIcon="link" onClick={() => onAction?.("attach")} size="sm" variant="secondary">Anexar arquivo</Button>
        <Button aria-label={hasActiveAccess ? "Revogar acesso pelo rodapé" : "Autorizar acesso pelo rodapé"} disabled={isDisabled} leadingIcon={hasActiveAccess ? "x" : "lock"} onClick={() => onAction?.(hasActiveAccess ? "revoke-access" : "request-access")} size="sm" variant="secondary">{hasActiveAccess ? "Revogar acesso" : "Autorizar acesso"}</Button>
        <Button disabled={isDisabled} leadingIcon="upload" onClick={() => onAction?.("import")} size="sm" variant="secondary">Abrir importação</Button>
        <Button disabled={isDisabled} leadingIcon="shield" onClick={() => onAction?.("audit")} size="sm" variant="secondary">Ver auditoria</Button>
        <Button disabled={isDisabled} leadingIcon="checkCircle" onClick={() => onAction?.("resolve")} size="sm" variant="secondary">Marcar resolvido</Button>
      </div>
    </section>
  );
}
