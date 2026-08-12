/** Agent simulation and execution evidence patterns. */
import React from "react";
import { Avatar, Button, Card, Chip, ExecutionRow, Icon, IconButton, InlineAlert, Input, LoadingState, MessageBubble, Panel, PrimitiveButton, cn } from "@taliya/ui";
import type { CrmSurfaceProps } from "./shell.js";
import { toneForState } from "./patterns-utilities.js";
import { DomainActions } from "./domain-actions.js";
import { DomainFactList } from "./domain-actions.js";

export interface ScenarioListItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  state?: "selected" | "blocked" | "passed" | "failed";
}

export function ScenarioList({
  items,
  selectedId = "prazo",
  onSelect,
  className
}: {
  items?: ScenarioListItem[];
  selectedId?: string;
  onSelect?: (scenarioId: string) => void;
  className?: string;
}) {
  const scenarios = items ?? [
    { id: "prazo", title: "Aluno avisou no prazo", description: "Registra falta e cria tarefa de reposição.", state: "passed" },
    { id: "fora-prazo", title: "Aviso fora do prazo", description: "Chama equipe antes de registrar.", state: "blocked" },
    { id: "credito", title: "Aluno pede crédito", description: "Chama equipe antes de decidir.", state: "blocked" },
    { id: "whatsapp", title: "WhatsApp falha", description: "Para e cria pendência.", state: "failed" }
  ];

  return (
    <Panel compact className={cn("tcrm-scenario-list", className)}>
      <h3>Cenários</h3>
      <div className="tcrm-scenario-list__items" role="list">
        {scenarios.map((scenario) => (
          <PrimitiveButton
            aria-current={scenario.id === selectedId ? "true" : undefined}
            className={cn("tcrm-scenario-list__item", scenario.id === selectedId && "tcrm-scenario-list__item--selected")}
            key={scenario.id}
            onClick={() => onSelect?.(scenario.id)}
            role="listitem"
            type="button"
          >
            <span>
              <strong>{scenario.title}</strong>
              {scenario.description ? <small>{scenario.description}</small> : null}
            </span>
            <span aria-hidden="true" className="tcrm-scenario-list__action">
              {scenario.id === selectedId ? <Icon name="check" size={14} /> : <Icon name="chevronRight" size={18} />}
            </span>
          </PrimitiveButton>
        ))}
      </div>
    </Panel>
  );
}

export function PhonePreview({
  state = "conversation",
  avatarSrc,
  studentName = "Júlia",
  className
}: {
  state?: "conversation" | "loading" | "blocked";
  avatarSrc?: string;
  studentName?: string;
  className?: string;
}) {
  return (
    <div className={cn("tcrm-phone-preview", `tcrm-phone-preview--${state}`, className)} aria-label="Prévia da conversa">
      <div className="tcrm-phone-preview__statusbar" aria-hidden="true">
        <span>12:30</span>
        <span className="tcrm-phone-preview__status-icons">
          <span className="tcrm-phone-preview__signal"><i /><i /><i /></span>
          <span className="tcrm-phone-preview__wifi" />
          <span className="tcrm-phone-preview__battery" />
        </span>
      </div>
      <span className="tcrm-phone-preview__notch" aria-hidden="true" />
      <header>
        <IconButton icon="chevronLeft" label="Voltar" size="sm" variant="ghost" />
        <Avatar name={studentName} size="md" src={avatarSrc} status="online" />
        <span>
          <strong>{studentName}</strong>
          <small>modo automático via Taliya Agenda</small>
        </span>
        <IconButton icon="moreVertical" label="Mais ações" size="sm" variant="ghost" />
      </header>
      <div className="tcrm-phone-preview__body">
        {state === "loading" ? (
          <LoadingState className="tcrm-phone-preview__loading" title="Preparando conversa" variant="spinner" />
        ) : state === "blocked" ? (
          <InlineAlert tone="warning" title="Envio bloqueado">A equipe precisa revisar antes de enviar.</InlineAlert>
        ) : (
          <>
            <MessageBubble timestamp="15:38" variant="inbound">Oi, não vou conseguir ir na aula de hoje 18h30.</MessageBubble>
            <MessageBubble status="read" timestamp="15:39" variant="outbound">Tudo certo, Júlia. Registrei sua falta na aula de hoje 18h30.</MessageBubble>
            <Card className="tcrm-phone-preview__receipt" compact tone="success">
              <span className="tcrm-phone-preview__receipt-icon"><Icon name="clipboardCheck" tone="current" /></span>
              <span><strong>FALTA REGISTRADA</strong><small>Mensagem enviada ao aluno</small><small>Tarefa criada em Reposições</small></span>
              <span className="tcrm-phone-preview__receipt-meta">
                <span>15:40</span>
                <span className="tcrm-phone-preview__receipt-checks" aria-label="Mensagem lida" role="img">
                  <Icon name="check" size="var(--taliya-control-crm-phone-preview-receipt-meta-icon-size)" tone="current" />
                  <Icon name="check" size="var(--taliya-control-crm-phone-preview-receipt-meta-icon-size)" tone="current" />
                </span>
              </span>
            </Card>
          </>
        )}
      </div>
      <div className="tcrm-phone-preview__composer">
        <Input aria-label="Mensagem" className="tcrm-phone-preview__composer-input" disabled leadingIcon="message" placeholder="Mensagem" fieldSize="sm" />
        <IconButton disabled={state === "loading"} icon="send" label="Enviar mensagem" size="lg" variant="selected" />
      </div>
    </div>
  );
}

export function ExecutionTimeline({
  items,
  onRetry,
  onOpen,
  className
}: {
  items?: Array<React.ComponentProps<typeof ExecutionRow> & { id: string }>;
  onRetry?: (itemId: string) => void;
  onOpen?: (itemId: string) => void;
  className?: string;
}) {
  const rows = items ?? [
    { id: "inicio", step: 1, status: "success" as const, statusLabel: "concluído", title: "1. Início", tool: "Aluno avisou que não vai comparecer.", details: "Aluno avisou falta." },
    {
      id: "checagens",
      step: 2,
      status: "success" as const,
      statusLabel: "concluído",
      title: "2. Checagens",
      tool: (
        <span className="tcrm-execution-timeline__checks">
          <span>Aluno identificado</span>
          <span>Aula existe na agenda</span>
          <span>Aviso dentro do prazo</span>
          <span>Falta ainda não registrada</span>
          <span>Mensagem aprovada</span>
        </span>
      ),
      details: "Aluno, aula e prazo validados."
    },
    { id: "decisao", step: 3, status: "success" as const, statusLabel: "concluído", title: "3. Decisão", tool: "Segue sem equipe. Nenhuma exceção encontrada.", details: "Segue sem equipe." },
    {
      id: "acao",
      step: 4,
      status: "success" as const,
      statusLabel: "concluído",
      title: "4. Ação",
      tool: (
        <span className="tcrm-execution-timeline__checks">
          <span>Registrou a falta na aula</span>
          <span>Enviou a mensagem aprovada</span>
        </span>
      ),
      details: "Tarefa criada para reposição."
    },
    {
      id: "fim",
      step: 5,
      status: "success" as const,
      statusLabel: "concluído",
      title: "5. Fim",
      tool: (
        <span className="tcrm-execution-timeline__checks">
          <span>Criou tarefa em Reposições</span>
          <span>Não escolheu vaga, crédito ou horário neste fluxo</span>
        </span>
      ),
      details: "Fluxo encerrado."
    }
  ];

  return (
    <div className={cn("tcrm-execution-timeline", className)}>
      {rows.map((row) => (
        <ExecutionRow key={row.id} {...row} onOpen={onOpen ? () => onOpen(row.id) : undefined} onRetry={onRetry ? () => onRetry(row.id) : undefined} />
      ))}
    </div>
  );
}

export type SimulationRunnerAction = "run" | "change-scenario" | "back";

export interface SimulationRunnerProps extends CrmSurfaceProps {
  state?: "running" | "success" | "blocked";
  avatarSrc?: string;
  selectedScenarioId?: string;
  onRun?: () => void;
  onScenarioSelect?: (scenarioId: string) => void;
  onAction?: (action: SimulationRunnerAction) => void;
}

export function SimulationRunner({
  state = "success",
  avatarSrc,
  selectedScenarioId = "prazo",
  onRun,
  onScenarioSelect,
  onAction,
  className
}: SimulationRunnerProps) {
  return (
    <div className={cn("tcrm-simulation-runner", className)}>
      <div className="tcrm-simulation-runner__grid">
        <ScenarioList onSelect={onScenarioSelect} selectedId={selectedScenarioId} />
        <Panel compact className="tcrm-simulation-runner__phone-panel">
          <PhonePreview avatarSrc={avatarSrc} state={state === "running" ? "loading" : state === "blocked" ? "blocked" : "conversation"} />
        </Panel>
        <Panel compact className="tcrm-simulation-runner__timeline-panel">
          <h3>Execução do teste</h3>
          <ExecutionTimeline />
        </Panel>
      </div>
      <div className="tcrm-simulation-runner__actions">
        <Button leadingIcon="play" onClick={() => { onRun?.(); onAction?.("run"); }} variant="primary">Rodar teste novamente</Button>
        <Button leadingIcon="refresh" onClick={() => onAction?.("change-scenario")} variant="secondary">Trocar cenário</Button>
        <Button leadingIcon="arrowLeft" onClick={() => onAction?.("back")} variant="secondary">Voltar ao fluxo</Button>
      </div>
    </div>
  );
}

export type ExecutionReceiptState = "success" | "exception" | "failed";
export type ExecutionReceiptLayout = "detail" | "compact";

export interface ExecutionReceiptProps extends Omit<CrmSurfaceProps, "state"> {
  state?: ExecutionReceiptState;
  layout?: ExecutionReceiptLayout;
  successTitle?: React.ReactNode;
  failureTitle?: React.ReactNode;
  exceptionTitle?: React.ReactNode;
  description?: React.ReactNode;
  channelLabel?: React.ReactNode;
  channel?: React.ReactNode;
  occurredLabel?: React.ReactNode;
  occurredAt?: React.ReactNode;
  reasonLabel?: React.ReactNode;
  reason?: React.ReactNode;
  statusLabel?: React.ReactNode;
  onAction?: (actionId: string) => void;
}

export function ExecutionReceipt({
  state = "success",
  layout = "detail",
  successTitle = "Ação executada com sucesso",
  failureTitle = "Ação falhou",
  exceptionTitle = "Ação requer revisão",
  description,
  channelLabel = "Canal:",
  channel = "WhatsApp",
  occurredLabel,
  occurredAt = "Hoje, 09:30",
  reasonLabel = "Motivo:",
  reason = "Número não ativo no WhatsApp.",
  statusLabel,
  onAction,
  className
}: ExecutionReceiptProps) {
  const isSuccess = state === "success";
  const isFailed = state === "failed";
  const compactTitle = isSuccess ? successTitle : isFailed ? failureTitle : exceptionTitle;
  const compactDescription = description ?? (isSuccess
    ? "Mensagem de confirmação enviada para Ana Paula Santos."
    : isFailed
      ? "Não foi possível enviar a mensagem para Ana Paula Santos."
      : "A execução foi interrompida para revisão humana.");
  const compactOccurredLabel = occurredLabel ?? (isSuccess ? "Executado em:" : "Tentativas em:");
  const compactStatusLabel = statusLabel ?? (isSuccess ? "Concluído" : isFailed ? "Falha" : "Revisão");

  if (layout === "compact") {
    return (
      <Card
        aria-label={String(compactTitle)}
        className={cn("tcrm-execution-receipt", "tcrm-execution-receipt--compact", `tcrm-execution-receipt--compact-${state}`, className)}
        data-component="ExecutionReceipt"
        data-layout="compact"
        data-state={state}
        role="region"
      >
        <header className="tcrm-execution-receipt__compact-header">
          <Icon name={isSuccess ? "checkCircle" : "alert"} size="var(--taliya-control-crm-execution-receipt-compact-icon-size)" />
          <h2>{compactTitle}</h2>
        </header>
        <p className="tcrm-execution-receipt__compact-description">{compactDescription}</p>
        <dl className="tcrm-execution-receipt__compact-facts">
          {isSuccess ? (
            <div>
              <dt>{channelLabel}</dt>
              <dd>{channel}<Icon name="whatsapp" size="var(--taliya-control-crm-execution-receipt-compact-icon-size)" /></dd>
            </div>
          ) : (
            <div>
              <dt>{reasonLabel}</dt>
              <dd>{reason}</dd>
            </div>
          )}
          <div>
            <dt>{compactOccurredLabel}</dt>
            <dd>{occurredAt}</dd>
          </div>
        </dl>
        <Chip className="tcrm-execution-receipt__compact-status" showDot={false} tone={isSuccess ? "success" : isFailed ? "danger" : "warning"}>
          {compactStatusLabel}
        </Chip>
      </Card>
    );
  }

  const receiptRows = [
    { id: "aviso", step: 1, status: "success" as const, statusLabel: "Concluído", title: "1. Aluna avisou falta", tool: "Júlia avisou pelo WhatsApp que não vai conseguir ir à aula de hoje 18h30." },
    { id: "regras", step: 2, status: "success" as const, statusLabel: "Concluído", title: "2. Taliya conferiu as regras", tool: "Aluno identificado, aula encontrada, aviso dentro do prazo e mensagem aprovada." },
    { id: "execucao", step: 3, status: "success" as const, statusLabel: "Concluído", title: "3. Taliya executou", tool: "Registrou a falta na aula e enviou a mensagem aprovada para a aluna." },
    { id: "continuidade", step: 4, status: "success" as const, statusLabel: "Concluído", title: "4. Continuidade criada", tool: "Criou uma tarefa em Reposições para a equipe acompanhar o próximo passo." }
  ];

  return (
    <div className={cn("tcrm-execution-receipt", className)}>
      <Panel compact className="tcrm-execution-receipt__summary">
      <header>
        <h3>Resumo da execução</h3>
        <Chip tone={toneForState(state)}>{state === "success" ? "Concluída" : state}</Chip>
      </header>
      <DomainFactList
        facts={[
          { label: "Fluxo", value: "Falta com aviso", icon: "clipboard" },
          { label: "Agente", value: "Agenda", icon: "bot" },
          { label: "Caso", value: "Júlia Martins - aula 18h30", icon: "users" },
          { label: "Início", value: "Hoje 15:58", icon: "clock" }
        ]}
      />
      <InlineAlert tone={state === "failed" ? "danger" : "info"}>
        A Taliya registrou a falta avisada, enviou a mensagem aprovada e criou uma tarefa de reposição.
      </InlineAlert>
      </Panel>
      <Panel compact className="tcrm-execution-receipt__timeline">
        <h3>O que aconteceu</h3>
        <p>Etapas desta execução real.</p>
        <ExecutionTimeline className="tcrm-execution-timeline--receipt" items={receiptRows} />
      </Panel>
      <div className="tcrm-execution-receipt__followup">
        <Panel compact className="tcrm-execution-receipt__why">
          <h3>Por que seguiu sem chamar equipe</h3>
          <ul>
            {["Aluna identificada", "Template aprovado", "Aula encontrada", "WhatsApp conectado", "Aviso dentro do prazo configurado", "Cota disponível", "Falta ainda não registrada"].map((item) => (
              <li key={item}><Icon name="check" size="sm" tone="success" />{item}</li>
            ))}
          </ul>
          <p>Se alguma regra falhasse, a Taliya chamaria a equipe definida no fluxo.</p>
        </Panel>
        <Panel compact className="tcrm-execution-receipt__continuation">
          <h3>Continua em Tarefas / Reposições</h3>
          <p>A equipe pode acompanhar a reposição criada para Júlia Martins.</p>
          <DomainActions
            actions={[
              { id: "task", label: "Abrir tarefa", icon: "clipboard" },
              { id: "student", label: "Abrir aluna", icon: "user", variant: "secondary" },
              { id: "flow", label: "Ver fluxo", icon: "eye", variant: "secondary" }
            ]}
            onAction={onAction}
          />
          <small>Próximo passo operacional já criado.</small>
        </Panel>
      </div>
      <footer className="tcrm-execution-receipt__footer">
        <Button leadingIcon="arrowLeft" onClick={() => onAction?.("back")} variant="secondary">Voltar ao extrato</Button>
        <Button leadingIcon="message" onClick={() => onAction?.("flow")} variant="secondary">Ver fluxo</Button>
      </footer>
    </div>
  );
}
