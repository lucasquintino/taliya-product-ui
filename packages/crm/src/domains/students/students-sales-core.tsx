/** Sales pipeline and enrollment compositions. */
import React from "react";
import {
  Avatar,
  Card,
  Chip,
  Icon,
  IconButton,
  List,
  PrimitiveButton,
  cn
} from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import type { PreflightChecklistItem } from "../../patterns/agent-flow-workspace.js";
import { stateKey, toneForState, salesChipClass } from "./students-utilities.js";

const salesPipelineDefaults = {
  lead: {
    source: "WhatsApp",
    interest: "começar Pilates",
    nextAction: "responder preço hoje",
    owner: "Recepção",
    statusLabel: "copiloto sugeriu"
  },
  trial: {
    source: "Instagram",
    interest: "dor lombar",
    nextAction: "confirmar experimental",
    owner: "Recepção",
    statusLabel: "experimental hoje"
  },
  enrollment: {
    source: "Instagram",
    interest: "preço",
    nextAction: "última tentativa",
    owner: "Atendimento",
    statusLabel: "sem resposta"
  },
  lost: {
    source: "Site",
    interest: "sem retorno",
    nextAction: "marcar perdido",
    owner: "Atendimento",
    statusLabel: "perdido"
  }
} as const;

const salesLeadDefaults = {
  hot: {
    stageLabel: "Qualificada",
    nextAction: "responder preço hoje",
    desiredTime: "terça à noite",
    owner: "Recepção",
    lastConversation: "hoje 10:24",
    statusLabel: "aberta"
  },
  "no-response": {
    stageLabel: "Sem resposta",
    nextAction: "última tentativa",
    desiredTime: "tarde",
    owner: "Atendimento",
    lastConversation: "2 dias",
    statusLabel: "aguardando humano"
  },
  trial: {
    stageLabel: "Experimental marcada",
    nextAction: "confirmar presença",
    desiredTime: "quinta 08h",
    owner: "Recepção",
    lastConversation: "amanhã",
    statusLabel: "experimental hoje"
  },
  enrolled: {
    stageLabel: "Pré-matrícula",
    nextAction: "validar dados",
    desiredTime: "terça 17h",
    owner: "Gestora",
    lastConversation: "hoje",
    statusLabel: "pronto"
  }
} as const;

const trialClassDefaults = {
  scheduled: {
    classTitle: "Reformer",
    classLevel: "Intermediário",
    statusLabel: "Confirmar presença",
    source: "WhatsApp",
    owner: "Recepção",
    lastConversation: "ontem 18:40",
    nextActionLabel: "enviar confirmação"
  },
  attended: {
    classTitle: "Pilates Solo",
    classLevel: "",
    statusLabel: "Compareceu",
    source: "Indicação",
    owner: "Recepção",
    lastConversation: "hoje 09:20",
    nextActionLabel: "fazer pós-aula"
  },
  "no-show": {
    classTitle: "Alongamento",
    classLevel: "",
    statusLabel: "Faltou",
    source: "Instagram",
    owner: "Recepção",
    lastConversation: "sem resposta",
    nextActionLabel: "remarcar"
  },
  converted: {
    classTitle: "Experimental",
    classLevel: "",
    statusLabel: "Pronta para matrícula",
    source: "Indicação",
    owner: "Gestora",
    lastConversation: "feedback positivo",
    nextActionLabel: "iniciar matrícula"
  }
} as const;

export function PipelineCard({
  title = "Ana Souza",
  source,
  sourceIcon = "whatsapp",
  interest,
  nextAction,
  meta,
  state = "lead",
  statusLabel,
  onSelect,
  onMenu,
  selected,
  className
}: CrmSurfaceProps & {
  source?: React.ReactNode;
  sourceIcon?: IconName;
  interest?: React.ReactNode;
  nextAction?: React.ReactNode;
  onSelect?: () => void;
  onMenu?: () => void;
}) {
  const key = stateKey(state) || "lead";
  const defaults = salesPipelineDefaults[key as keyof typeof salesPipelineDefaults] ?? salesPipelineDefaults.lead;
  const owner = meta ?? defaults.owner;
  const chipLabel = statusLabel ?? defaults.statusLabel;
  const content = (
    <>
      <header className="tcrm-pipeline-card__header">
        <strong>{title}</strong>
        <span className="tcrm-pipeline-card__channel">
          <Icon name={sourceIcon} size="12px" />
          <span>{source ?? defaults.source}</span>
        </span>
      </header>
      <dl className="tcrm-pipeline-card__facts">
        <div>
          <dt>Interesse:</dt>
          <dd>{interest ?? defaults.interest}</dd>
        </div>
        <div>
          <dt>Próxima ação:</dt>
          <dd>{nextAction ?? defaults.nextAction}</dd>
        </div>
        <div>
          <dt>Dono:</dt>
          <dd>{owner}</dd>
        </div>
      </dl>
      <Chip className={salesChipClass(chipLabel, "tcrm-sales-status-chip")} showDot={false} tone={toneForState(state)}>
        {chipLabel}
      </Chip>
    </>
  );

  return (
    <Card
      className={cn("tcrm-pipeline-card", `tcrm-pipeline-card--${key}`, selected && "tcrm-pipeline-card--selected", className)}
      compact
      data-state={key}
      selected={selected}
    >
      {onSelect ? (
        <PrimitiveButton aria-pressed={selected || undefined} className="tcrm-pipeline-card__select" onClick={onSelect} type="button">
          {content}
        </PrimitiveButton>
      ) : (
        <div className="tcrm-pipeline-card__select">{content}</div>
      )}
      {onMenu ? (
        <IconButton
          className="tcrm-pipeline-card__menu"
          icon="more"
          label={`Abrir opcoes de ${String(title)}`}
          onClick={onMenu}
          size="sm"
          variant="ghost"
        />
      ) : null}
    </Card>
  );
}

export function LeadSummary({
  name = "Ana Souza",
  state = "hot",
  nextAction,
  avatarSrc,
  selected = true,
  statusLabel,
  stageLabel,
  desiredTime,
  owner,
  lastConversation,
  onOpen,
  className
}: CrmSurfaceProps & {
  name?: string;
  source?: React.ReactNode;
  nextAction?: React.ReactNode;
  avatarSrc?: string;
  stageLabel?: React.ReactNode;
  desiredTime?: React.ReactNode;
  owner?: React.ReactNode;
  lastConversation?: React.ReactNode;
  onOpen?: () => void;
}) {
  const key = stateKey(state) || "hot";
  const defaults = salesLeadDefaults[key as keyof typeof salesLeadDefaults] ?? salesLeadDefaults.hot;
  const stage = stageLabel ?? defaults.stageLabel;
  const status = statusLabel ?? defaults.statusLabel;

  return (
    <div
      className={cn("tcrm-lead-summary", `tcrm-lead-summary--${key}`, selected && "tcrm-lead-summary--selected", className)}
    >
      <Avatar className="tcrm-commercial-avatar" name={name} size="sm" src={avatarSrc} />
      <strong className="tcrm-commercial-name">{name}</strong>
      <Chip className={salesChipClass(stage, "tcrm-sales-stage-chip")} showDot={false} tone={toneForState(state)}>{stage}</Chip>
      <span>{nextAction ?? defaults.nextAction}</span>
      <span>{desiredTime ?? defaults.desiredTime}</span>
      <span>{owner ?? defaults.owner}</span>
      <span>{lastConversation ?? defaults.lastConversation}</span>
      <Chip className={salesChipClass(status, "tcrm-sales-status-chip")} showDot={false} tone={toneForState(state)}>{status}</Chip>
      <IconButton className="tcrm-commercial-menu" icon="more" label="Abrir conversa" onClick={() => onOpen?.()} size="sm" variant="ghost" />
    </div>
  );
}

export function TrialClassCard({
  title = "Ana Souza",
  state = "scheduled",
  time = "hoje 17h",
  avatarSrc,
  classTitle,
  classLevel,
  statusLabel,
  source,
  owner,
  lastConversation,
  nextActionLabel,
  onSelect,
  className
}: CrmSurfaceProps & {
  time?: React.ReactNode;
  avatarSrc?: string;
  classTitle?: React.ReactNode;
  classLevel?: React.ReactNode;
  source?: React.ReactNode;
  owner?: React.ReactNode;
  lastConversation?: React.ReactNode;
  nextActionLabel?: React.ReactNode;
  onSelect?: () => void;
}) {
  const key = stateKey(state) || "scheduled";
  const defaults = trialClassDefaults[key as keyof typeof trialClassDefaults] ?? trialClassDefaults.scheduled;
  const status = statusLabel ?? defaults.statusLabel;
  const action = nextActionLabel ?? defaults.nextActionLabel;
  const classMeta = (
    <>
      <span>{classTitle ?? defaults.classTitle}</span>
      {classLevel ?? defaults.classLevel ? <span>{classLevel ?? defaults.classLevel}</span> : null}
    </>
  );

  return (
    <PrimitiveButton
      aria-label={String(title)}
      className={cn("tcrm-trial-class-card", `tcrm-trial-class-card--${key}`, className)}
      data-state={key}
      onClick={onSelect}
      type="button"
    >
      <Avatar className="tcrm-commercial-avatar" name={String(title)} size="sm" src={avatarSrc} />
      <strong className="tcrm-commercial-name">{title}</strong>
      <span className="tcrm-trial-class-card__class">{classMeta}</span>
      <span>{time}</span>
      <Chip className={salesChipClass(status, "tcrm-sales-status-chip")} showDot={false} tone={toneForState(state)}>{status}</Chip>
      <span className="tcrm-trial-class-card__source">
        <Icon name={stateKey(source ?? defaults.source) === "whatsapp" ? "whatsapp" : "users"} size="13px" />
        <span>{source ?? defaults.source}</span>
      </span>
      <span>{owner ?? defaults.owner}</span>
      <span>{lastConversation ?? defaults.lastConversation}</span>
      <Chip className={salesChipClass(action, "tcrm-sales-action-chip")} showDot={false} tone="info">{action}</Chip>
      <span className="tcrm-commercial-dots" aria-hidden="true">•••</span>
    </PrimitiveButton>
  );
}

export function EnrollmentChecklist({
  items,
  title = "Checklist de matrícula",
  countLabel,
  onAction,
  className
}: {
  items?: PreflightChecklistItem[];
  title?: React.ReactNode;
  countLabel?: React.ReactNode;
  onAction?: (itemId: string) => void;
  className?: string;
}) {
  const checklist = items ?? [
    { id: "dados", title: "Dados básicos", state: "complete" as const },
    { id: "plano", title: "Plano escolhido", state: "complete" as const },
    { id: "aula", title: "Primeira aula definida", state: "complete" as const },
    { id: "consentimento", title: "Consentimento registrado", state: "complete" as const },
    { id: "cpf", title: "CPF pendente", state: "warning" as const }
  ];
  const completedItems = checklist.filter((item) => item.state === "complete").length;

  return (
    <section className={cn("tcrm-enrollment-checklist", className)} aria-label={String(title)}>
      <header className="tcrm-enrollment-checklist__header">
        <strong>{title}</strong>
        <span>{countLabel ?? `${completedItems}/${checklist.length}`}</span>
      </header>
      <List aria-label="Itens da checklist" className="tcrm-enrollment-checklist__list" role="group">
        {checklist.map((item) => {
          const itemKey = stateKey(item.state) || "incomplete";
          return (
            <PrimitiveButton
              aria-label={typeof item.title === "string" ? `Revisar ${item.title}` : `Revisar item ${item.id}`}
              className={cn("tcrm-enrollment-checklist__item", `tcrm-enrollment-checklist__item--${itemKey}`)}
              disabled={!onAction || item.state === "blocked"}
              key={item.id}
              onClick={() => onAction?.(item.id)}
              type="button"
            >
              <span className="tcrm-enrollment-checklist__mark" aria-hidden="true">
                {item.state === "complete" ? <Icon name="check" size="8px" strokeWidth={2.2} /> : null}
              </span>
              <span>{item.title}</span>
            </PrimitiveButton>
          );
        })}
      </List>
    </section>
  );
}
