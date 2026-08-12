/** Replacement drawer pattern. */
import React from "react";
import { Button, Chip, EmptyState, Icon, IconButton, PrimitiveButton, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import { CrmDrawer } from "./drawer-core.js";

export type ReplacementDrawerState = "requested" | "no-vacancy" | "conflict" | "waiting" | "expired" | "scheduled" | "consumed" | "blocked" | "loading";
export type ReplacementFitTone = "compatible" | "confirmation" | "conflict";
export type ReplacementDrawerAction = "close" | "find-fit" | "reserve-slot" | "send-invite" | "consume-credit" | "create-task" | "open-conversation" | "open-original-class" | "copy-suggestion" | "cancel";

export interface ReplacementDrawerFact {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  helper?: React.ReactNode;
  tone?: "success" | "warning" | "danger";
}

export interface ReplacementFitOption {
  id: string;
  title: React.ReactNode;
  instructor: React.ReactNode;
  vacancy: React.ReactNode;
  badge: React.ReactNode;
  tone: ReplacementFitTone;
  selected?: boolean;
}

export interface ReplacementDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: ReplacementDrawerState;
  name?: React.ReactNode;
  statusLabel?: React.ReactNode;
  facts?: ReplacementDrawerFact[];
  options?: ReplacementFitOption[];
  inviteSuggestion?: React.ReactNode;
  onAction?: (action: ReplacementDrawerAction) => void;
  onClose?: () => void;
  onOptionSelect?: (option: ReplacementFitOption) => void;
}

const sourceReplacementFacts: ReplacementDrawerFact[] = [
  { id: "original", icon: "calendar", label: "Aula original", value: <>Terça 17h <span aria-hidden="true">·</span> Reformer Intermediário</> },
  { id: "credit", icon: "clock", label: "Direito / crédito", value: "Elegível", helper: "Válido até 12/06", tone: "success" },
  { id: "policy", icon: "shield", label: "Política aplicada", value: "Falta avisada dentro do prazo" },
  { id: "preference", icon: "shieldCheck", label: "Preferência", value: "Manhã ou quinta" },
  { id: "status", icon: "clock", label: "Status", value: "Opção encontrada", tone: "success" },
  { id: "owner", icon: "user", label: "Responsável / fila", value: "Recepção" }
];

const sourceReplacementOptions: ReplacementFitOption[] = [
  { id: "thu-08", title: <>Quinta 08h <span aria-hidden="true">·</span> Reformer Intermediário</>, instructor: "Instrutor Lucas Peres", vacancy: "1 vaga", badge: "compatível", tone: "compatible", selected: true },
  { id: "fri-10", title: <>Sexta 10h <span aria-hidden="true">·</span> Pilates Solo</>, instructor: "Instrutora Mariana Lopes", vacancy: "2 vagas", badge: "exige confirmação", tone: "confirmation" },
  { id: "mon-19", title: <>Segunda 19h <span aria-hidden="true">·</span> Tower</>, instructor: "Instrutor Lucas Peres", vacancy: "", badge: "conflito leve", tone: "conflict" }
];

function emitReplacementDrawerAction(action: ReplacementDrawerAction, onAction?: (action: ReplacementDrawerAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function ReplacementDrawer({
  open = true,
  state = "requested",
  name = "Ana Carolina Souza",
  statusLabel = "Opção encontrada",
  facts = sourceReplacementFacts,
  options = sourceReplacementOptions,
  inviteSuggestion = <>“Oi Ana, encontramos uma vaga quinta às 08h para sua reposição. Posso reservar?”</>,
  onAction,
  onClose,
  onOptionSelect,
  className,
  ...props
}: ReplacementDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const isConsumed = state === "consumed";
  const isExpired = state === "expired";
  const hasSelectedOption = options.some((option) => option.selected);
  const mutationDisabled = isBlocked || isExpired || isConsumed;
  const resolvedStatusLabel = ({
    requested: statusLabel,
    "no-vacancy": "Sem vaga",
    conflict: "Conflito",
    waiting: "Aguardando resposta",
    expired: "Vencida",
    scheduled: "Agendada",
    consumed: "Crédito consumido",
    blocked: "Bloqueada",
    loading: "Carregando"
  } satisfies Record<ReplacementDrawerState, React.ReactNode>)[state];

  return (
    <CrmDrawer
      aria-label="Detalhes da reposição"
      className={cn("tcrm-replacement-drawer", `tcrm-replacement-drawer--${state}`, className)}
      closeLabel="Fechar reposição"
      component="ReplacementDrawer"
      eyebrow="Reposição selecionada"
      footer={(
        <div className="tcrm-replacement-drawer__footer">
          <Button className="tcrm-replacement-drawer__primary" disabled={mutationDisabled || !hasSelectedOption || state === "waiting"} onClick={() => emitReplacementDrawerAction("reserve-slot", onAction)} size="sm" variant="primary">Reservar vaga</Button>
          <div className="tcrm-replacement-drawer__actions">
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked || isConsumed} onClick={() => emitReplacementDrawerAction("find-fit", onAction)} size="sm" variant="secondary">Encontrar encaixe</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={mutationDisabled || !hasSelectedOption || state === "waiting"} onClick={() => emitReplacementDrawerAction("send-invite", onAction)} size="sm" variant="secondary">Enviar convite</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked || state !== "scheduled"} onClick={() => emitReplacementDrawerAction("consume-credit", onAction)} size="sm" variant="secondary">Consumir crédito</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={mutationDisabled} onClick={() => emitReplacementDrawerAction("create-task", onAction)} size="sm" variant="secondary">Criar tarefa</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked} onClick={() => emitReplacementDrawerAction("open-conversation", onAction)} size="sm" variant="secondary">Abrir conversa</Button>
            <Button className="tcrm-replacement-drawer__action" disabled={isBlocked} onClick={() => emitReplacementDrawerAction("open-original-class", onAction)} size="sm" variant="secondary">Abrir aula original</Button>
          </div>
          <Button className="tcrm-replacement-drawer__cancel" disabled={mutationDisabled} onClick={() => emitReplacementDrawerAction("cancel", onAction)} size="sm" variant="secondary">Marcar como cancelada</Button>
        </div>
      )}
      headerClassName="tcrm-replacement-drawer__header"
      loading={isLoading}
      onClose={() => emitReplacementDrawerAction("close", onAction, onClose)}
      state={state}
      title={name}
      {...props}
    >
      <div className="tcrm-replacement-drawer__body">
        <dl className="tcrm-replacement-drawer__facts">
          {facts.map((fact) => (
            <div className={cn("tcrm-replacement-drawer__fact", fact.tone && `tcrm-replacement-drawer__fact--${fact.tone}`)} data-fact={fact.id} key={fact.id}>
              <Icon name={fact.icon} size="13px" />
              <dt>{fact.label}</dt>
              <dd>
                {fact.id === "status" ? resolvedStatusLabel : fact.value}
                {fact.helper ? <small>{fact.helper}</small> : null}
              </dd>
            </div>
          ))}
        </dl>

        <section className="tcrm-replacement-drawer__options" aria-label="Opções de encaixe">
          <h3>Opções de encaixe</h3>
          {options.length > 0 ? <ul>
            {options.map((option) => (
              <li key={option.id}>
                <PrimitiveButton
                  aria-pressed={Boolean(option.selected)}
                  className={cn("tcrm-replacement-drawer__option", option.selected && "is-selected", `tcrm-replacement-drawer__option--${option.tone}`)}
                  disabled={mutationDisabled || state === "waiting"}
                  onClick={() => onOptionSelect?.(option)}
                  type="button"
                >
                  <Icon name={option.selected ? "star" : "circle"} size="15px" />
                  <span>
                    <strong>{option.title}</strong>
                    <small>{option.instructor}</small>
                  </span>
                  {option.vacancy ? <Chip className="tcrm-replacement-drawer__vacancy" showDot={false}>{option.vacancy}</Chip> : <span aria-hidden="true" />}
                  <Chip className="tcrm-replacement-drawer__fit" showDot={false}>{option.badge}</Chip>
                  {option.selected ? <span className="tcrm-replacement-drawer__selected"><Icon name="check" size="12px" /></span> : null}
                </PrimitiveButton>
              </li>
            ))}
          </ul> : <EmptyState description="Tente ampliar horários, turma ou validade do crédito." title="Nenhum encaixe compatível" />}
        </section>

        <section className="tcrm-replacement-drawer__invite" aria-label="Sugestão de convite">
          <h3>Sugestão de convite</h3>
          <div>
            <Icon name="message" size="18px" />
            <p>{inviteSuggestion}</p>
            <IconButton icon="copy" label="Copiar sugestão" onClick={() => emitReplacementDrawerAction("copy-suggestion", onAction)} size="sm" variant="ghost" />
          </div>
        </section>

        <section className="tcrm-replacement-drawer__notes" aria-label="Notas do copiloto">
          <p className="tcrm-replacement-drawer__note tcrm-replacement-drawer__note--info"><Icon name="info" size="15px" /> Cálculo de encaixes é programático e funciona com 0 agentes.</p>
          <p className="tcrm-replacement-drawer__note tcrm-replacement-drawer__note--copilot"><Icon name="sparkles" size="16px" /> <span><strong>Copiloto:</strong> quinta 08h respeita a validade do crédito e tem 1 vaga.</span></p>
          <p className="tcrm-replacement-drawer__note tcrm-replacement-drawer__note--safe"><Icon name="checkCircle" size="15px" /> <span><strong>Autônomo disponível para convite seguro</strong><small>Exceções de política exigem confirmação humana.</small></span></p>
        </section>
      </div>
    </CrmDrawer>
  );
}

