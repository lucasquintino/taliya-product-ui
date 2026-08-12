/** Student identity and relationship compositions. */
import React from "react";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Icon,
  IconButton,
  InlineGroup,
  List,
  ListItem,
  MetricTile,
  Panel,
  RelationshipCard,
  cn
} from "@taliya/ui";
import type { ComponentTone, IconName, StatusDotStatus } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import { DomainActions } from "../../patterns/domain-actions.js";
import type { CrmDomainMetric } from "../../patterns/domain-actions.js";
import { toneForState } from "./students-utilities.js";

export function StudentHeader({
  name,
  state = "active",
  tags,
  avatarSrc,
  phone,
  email,
  headingLevel = 2,
  variant = "default",
  studentId = "ID: 456871",
  responsible = "Nikki Olaw",
  nextAction = "Confirmar documentos",
  nextActionDate = "28/04/2024",
  onNextAction,
  onAction,
  className
}: CrmSurfaceProps & {
  name?: string;
  tags?: React.ReactNode[];
  avatarSrc?: string;
  phone?: React.ReactNode;
  email?: React.ReactNode;
  headingLevel?: 1 | 2;
  variant?: "default" | "reference";
  studentId?: React.ReactNode;
  responsible?: React.ReactNode;
  nextAction?: React.ReactNode;
  nextActionDate?: React.ReactNode;
  onNextAction?: () => void;
  onAction?: (actionId: string) => void;
}) {
  const resolvedName = name ?? (variant === "reference" ? "João Pedro Silva" : "Ana Paula Martins");
  const resolvedPhone = phone ?? (variant === "reference" ? "(11) 93456-7890" : "(11) 98765-4321");
  const resolvedEmail = email ?? (variant === "reference" ? "joao.silva@email.com" : "ana.paula@email.com");
  const studentTags = tags ?? (variant === "reference" ? ["Aluno", "VIP"] : ["Plano Mensal", "Reformer Iniciante"]);
  const statusTags = ["pagamento pendente", "boa frequencia", "proxima aula marcada"];
  const Heading = headingLevel === 1 ? "h1" : "h2";

  if (variant === "reference") {
    return (
      <Card className={cn("tcrm-student-header", "tcrm-student-header--reference", className)} data-component="StudentHeader" data-variant="reference">
        <Avatar name={resolvedName} size="lg" src={avatarSrc} />
        <div className="tcrm-student-header__body">
          <div className="tcrm-student-header__identity"><Heading>{resolvedName}</Heading><Chip showDot={false} tone={toneForState(state)}>{state === "active" ? "Ativo" : state}</Chip></div>
          <InlineGroup className="tcrm-student-header__tags" compact wrap>
            {studentTags.map((tag, index) => <Chip key={`student-tag-${tag}-${index}`} showDot={false}>{tag}</Chip>)}
            <Chip showDot={false}>Responsável principal: <strong>{responsible}</strong></Chip>
          </InlineGroup>
          <InlineGroup className="tcrm-student-header__contacts" compact wrap>
            <span><Icon name="phone" size="var(--taliya-control-crm-student-header-contact-icon-size)" />{resolvedPhone}</span>
            <span><Icon name="mail" size="var(--taliya-control-crm-student-header-contact-icon-size)" />{resolvedEmail}</span>
            <span><Icon name="info" size="var(--taliya-control-crm-student-header-contact-icon-size)" />{studentId}</span>
          </InlineGroup>
        </div>
        <Button className="tcrm-student-header__next-action" onClick={onNextAction} trailingIcon="chevronRight" variant="ghost">
          <><small>Próxima ação</small><strong>{nextAction}</strong><small>{nextActionDate}</small></>
        </Button>
      </Card>
    );
  }

  return (
    <Card className={cn("tcrm-student-header", className)}>
      <Avatar name={resolvedName} size="2xl" src={avatarSrc} />
      <div className="tcrm-student-header__body">
        <Heading>{resolvedName}</Heading>
        <InlineGroup className="tcrm-student-header__tags" compact wrap>
          <Chip showDot={false} tone={toneForState(state)}>{state === "active" ? "Ativa" : state}</Chip>
          {studentTags.map((tag, index) => (
            <React.Fragment key={`student-tag-separator-${tag}-${index}`}>
              <span className="tcrm-student-header__separator" />
              <Chip showDot={false} tone="neutral">{tag}</Chip>
            </React.Fragment>
          ))}
        </InlineGroup>
        <InlineGroup className="tcrm-student-header__contacts" compact wrap>
          <span><Icon name="whatsapp" size="var(--taliya-control-crm-student-header-contact-icon-size)" tone="success" />{resolvedPhone}</span>
          <span><Icon name="mail" size="var(--taliya-control-crm-student-header-contact-icon-size)" tone="info" />{resolvedEmail}</span>
        </InlineGroup>
        <InlineGroup className="tcrm-student-header__status-tags" compact wrap>
          {statusTags.map((tag, index) => (
            <Chip key={tag} showDot={false} tone={index === 0 ? "warning" : index === 1 ? "success" : "info"}>{tag}</Chip>
          ))}
        </InlineGroup>
      </div>
      <DomainActions
        className="tcrm-student-header__actions"
        actions={[
          { id: "message", label: "Enviar mensagem", icon: "whatsapp" },
          { id: "task", label: "Criar tarefa", icon: "calendar", variant: "secondary" },
          { id: "note", label: "Registrar nota", icon: "clipboard", variant: "secondary" },
          { id: "edit", label: "Editar dados", icon: "edit", variant: "secondary" }
        ]}
        onAction={onAction}
      />
    </Card>
  );
}

export function StudentSummary({
  metrics,
  showRows = false,
  onAction,
  className
}: {
  metrics?: CrmDomainMetric[];
  showRows?: boolean;
  onAction?: (actionId: string) => void;
  className?: string;
}) {
  const summaryMetrics = metrics ?? [
    { label: "Presenca recente", value: "8 de 10 aulas", helperText: "80% de presenca", tone: "success" as const, progressValue: 80 },
    { label: "Risco", value: "baixo", helperText: "Situacao estavel", tone: "success" as const, icon: "shieldCheck" as const },
    { label: "Proxima aula", value: "Qui, 15/05", helperText: "07:00", tone: "info" as const, icon: "calendar" as const },
    { label: "Plano", value: "ativo", helperText: "Plano Mensal", tone: "neutral" as const, icon: "creditCard" as const },
    { label: "Financeiro", value: "pagamento pendente", tone: "warning" as const, icon: "clipboard" as const }
  ];

  return (
    <Panel className={cn("tcrm-student-summary", className)}>
      <header>
        <h3><span>1.</span> Estado operacional</h3>
      </header>
      <div className="tcrm-student-summary__metrics">
        {summaryMetrics.map((metric) => (
          <MetricTile
            helperText={metric.helperText}
            icon={metric.icon}
            key={`student-metric-${metric.label}`}
            label={metric.label}
            progressValue={metric.progressValue}
            tone={metric.tone === "danger" ? "negative" : metric.tone === "warning" ? "warning" : metric.tone === "success" ? "positive" : "neutral"}
            value={metric.value}
            variant="operational"
          />
        ))}
      </div>
      {showRows ? (
        <List className="tcrm-student-summary__rows" divided>
          <ListItem action={<Button onClick={() => onAction?.("agenda")} size="sm" variant="secondary">Ver agenda</Button>} title="Agenda proxima">
            Reformer Iniciante - Qui 15/05 - 07:00
          </ListItem>
          <ListItem action={<Button onClick={() => onAction?.("financeiro")} size="sm" variant="secondary">Ver financeiro</Button>} title="Plano e financeiro">
            Proxima mensalidade - 10/06/2024 - R$ 199,00
          </ListItem>
          <ListItem action={<Button onClick={() => onAction?.("tarefas")} size="sm" variant="secondary">Ver tarefas</Button>} title="Tarefas abertas">
            Reposicao para confirmar - retorno humano pendente
          </ListItem>
        </List>
      ) : null}
    </Panel>
  );
}

export interface RelationshipListItem {
  id: string;
  name: string;
  roleLabel?: React.ReactNode;
  contact?: React.ReactNode;
  details?: Array<{ icon?: IconName; value: React.ReactNode }>;
  highlight?: React.ReactNode;
  badge?: React.ReactNode;
  badgeTone?: ComponentTone;
  variant?: "primary" | "related" | "conflict";
  avatarStatus?: StatusDotStatus | null;
  avatarSrc?: string;
}

export function RelationshipList({
  className,
  items,
  selectedId = "joao",
  onSelect,
  onAction
}: {
  className?: string;
  items?: RelationshipListItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onAction?: (actionId: string) => void;
}) {
  const relationshipItems: RelationshipListItem[] = items ?? [
    {
      id: "nikki",
      badge: "Responsavel principal",
      details: [{ icon: "phone", value: "(11) 93456-7890" }, { icon: "mail", value: "nikki@email.com" }],
      name: "Nikki Olaw",
      roleLabel: "Mae",
      variant: "primary" as const,
      avatarStatus: null
    },
    {
      id: "joao",
      badge: "Plano Premium",
      highlight: <><small>saldo 0</small><strong>Debito</strong></>,
      name: "Joao Pedro",
      roleLabel: "12 anos - 7o Ano",
      variant: "related" as const,
      avatarStatus: null
    },
    {
      id: "sara",
      badge: "Tia",
      badgeTone: "neutral",
      details: [{ icon: "phone", value: "(11) 98765-4321" }, { icon: "mail", value: "sara@email.com" }],
      name: "Sara Alves",
      variant: "related" as const,
      avatarStatus: null
    }
  ];

  return (
    <Panel className={cn("tcrm-relationship-list", className)}>
      <header>
        <span className="tcrm-relationship-list__marker"><Icon name="link" size="var(--taliya-control-crm-relationship-panel-marker-icon-size)" tone="current" /></span>
        <h3>Relacoes e familia</h3>
      </header>
      <div className="tcrm-relationship-list__cards">
        {relationshipItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 ? (
              <IconButton
                className="tcrm-relationship-list__connector"
                data-connector={index === 1 ? "shared-phone" : "family-link"}
                icon={index === 1 ? "phone" : "book"}
                label={index === 1 ? "Telefone compartilhado" : "Relacao familiar"}
                onClick={() => onAction?.(index === 1 ? "shared-phone" : "family-link")}
                size="sm"
                variant="subtle"
              />
            ) : null}
            <RelationshipCard
              avatarSrc={item.avatarSrc}
              avatarStatus={item.avatarStatus}
              badge={item.badge}
              badgeTone={item.badgeTone}
              contact={item.contact}
              details={item.details}
              highlight={item.highlight}
              name={item.name}
              onSelect={onSelect ? () => onSelect(item.id) : undefined}
              roleLabel={item.roleLabel}
              selected={selectedId === item.id}
              variant={item.variant}
            />
          </React.Fragment>
        ))}
      </div>
      <footer className="tcrm-relationship-list__legend">
        <span><Icon name="check" size="sm" tone="success" />Telefone compartilhado</span>
        <span><Icon name="book" size="sm" tone="warning" />Relacao familiar</span>
        <span><Icon name="alertCircle" size="sm" tone="danger" />Possivel conflito</span>
      </footer>
    </Panel>
  );
}
