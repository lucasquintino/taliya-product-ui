/** Setup shell and contextual setup-agent composition. */
import React from "react";
import {
  Avatar,
  Button,
  Chip,
  Icon,
  IconButton,
  ProgressBar,
  PrimitiveButton,
  PrimitiveInput,
  Stepper,
  TaliyaLogo,
  cn
} from "@taliya/ui";
import type { ComponentTone, StepperStep } from "@taliya/ui";
import {
  setupAgentContexts,
  setupShellSourceSteps
} from "./setup-agent-contexts.js";
import type { SetupAgentContext } from "./setup-agent-contexts.js";
export { setupAgentContexts, setupShellSourceSteps } from "./setup-agent-contexts.js";
export type { SetupAgentContext, SetupAgentContextId, SetupAgentQuickReply } from "./setup-agent-contexts.js";

function toneForState(state?: string): ComponentTone {
  if (!state) return "neutral";
  const normalizedState = String(state).toLowerCase();
  if (["ok", "ready", "active", "confirmed", "paid", "success", "online", "complete", "accepted", "matched", "resolved"].includes(normalizedState)) return "success";
  if (["warning", "attention", "review", "pending", "verifying", "saving", "running", "today", "promise", "promised", "ambiguous", "reconciliation"].includes(normalizedState)) return "warning";
  if (["draft", "mapped", "request-access", "candidate", "assigned", "answered", "access-active", "scheduled", "due", "validation"].includes(normalizedState)) return "info";
  if (["danger", "failed", "blocked", "error", "expired", "severe", "overdue", "dispute"].includes(normalizedState)) return "danger";
  if (["paused", "disabled", "read-only"].includes(normalizedState)) return "paused";
  return "neutral";
}


function SetupShellDefaultStage() {
  return (
    <div className="tcrm-setup-shell__stage">
      <div className="tcrm-setup-shell__stage-icon" aria-hidden="true">
        <Icon name="scan" size="38px" />
      </div>
      <h2>Área da etapa atual</h2>
      <p>Conteúdo da página entra aqui.</p>
      <p>Formulários, listas, importações, revisões e configurações.</p>
      <div className="tcrm-setup-shell__dash tcrm-setup-shell__dash--hero" aria-hidden="true" />
      <div className="tcrm-setup-shell__card-row" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="tcrm-setup-shell__wide-card" aria-hidden="true">
        <span className="tcrm-setup-shell__skeleton-lines">
          <i />
          <i />
          <i />
        </span>
        <span className="tcrm-setup-shell__skeleton-media" />
      </div>
      <p className="tcrm-setup-shell__hint"><Icon name="info" size="16px" /> Este é o shell do Setup Inicial. O conteúdo será exibido nesta área.</p>
    </div>
  );
}

function SetupShellAgentPanel({
  context = setupAgentContexts.shellBase,
  onClose,
  onHumanHelp,
  onMenu,
  onQuickReply,
  onSend,
  disabled = false
}: {
  context?: SetupAgentContext;
  onClose?: () => void;
  onHumanHelp?: () => void;
  onMenu?: () => void;
  onQuickReply?: (question: string) => void;
  onSend?: (value: string) => void;
  disabled?: boolean;
}) {
  const [value, setValue] = React.useState("");
  return (
    <section className="tcrm-setup-shell__agent-panel" aria-label="Agente de configuração">
      <header>
        <span className="tcrm-setup-shell__bot-mark"><Icon name="bot" size="23px" /></span>
        <div>
          <h2>Agente de configuração</h2>
          <p><span aria-hidden="true" /> Guiando setup</p>
        </div>
        <IconButton disabled={disabled || !onMenu} icon="moreVertical" label="Mais ações do agente" onClick={onMenu} size="sm" variant="ghost" />
        <IconButton disabled={disabled || !onClose} icon="x" label="Fechar agente" onClick={onClose} size="sm" variant="ghost" />
      </header>
      <div className="tcrm-setup-shell__agent-alert"><Icon name="info" size="22px" /> {context.impact}</div>
      {context.messages.map((message) => (
        <p className="tcrm-setup-shell__agent-message" key={message}>{message}</p>
      ))}
      <div className="tcrm-setup-shell__quick-replies" aria-label="Dúvidas frequentes">
        <strong>Dúvidas frequentes</strong>
        {context.quickReplies.map((question) => (
          <PrimitiveButton disabled={disabled || !onQuickReply} key={question.id} onClick={() => onQuickReply?.(question.label)} type="button">{question.label}</PrimitiveButton>
        ))}
      </div>
      <form className="tcrm-setup-shell__agent-composer" onSubmit={(event) => { event.preventDefault(); onSend?.(value); }}>
        <label className="tl-sr-only" htmlFor="setup-shell-agent-question">Pergunte sobre esta etapa</label>
        <PrimitiveInput disabled={disabled || !onSend} id="setup-shell-agent-question" onChange={(event) => setValue(event.currentTarget.value)} placeholder={context.composerPlaceholder ?? "Pergunte sobre esta etapa..."} value={value} />
        <IconButton disabled={disabled || !onSend} icon="send" label="Enviar pergunta" size="md" type="submit" variant="selected" />
      </form>
      <p className="tcrm-setup-shell__human-help">Precisa de ajuda humana? <PrimitiveButton disabled={disabled || !onHumanHelp} onClick={onHumanHelp} type="button">Agendar ajuda</PrimitiveButton></p>
    </section>
  );
}

export interface SetupShellProps {
  step?: number;
  steps?: string[];
  progress?: number;
  layout?: "guided" | "welcome";
  children?: React.ReactNode;
  agent?: React.ReactNode;
  agentContext?: SetupAgentContext;
  bottomBar?: React.ReactNode;
  studioName?: React.ReactNode;
  status?: React.ReactNode;
  avatarSrc?: string;
  state?: "source" | "loading" | "blocked";
  onStudioSelect?: () => void;
  onHelp?: () => void;
  onProfile?: () => void;
  onStepSelect?: (stepId: string) => void;
  onAgentClose?: () => void;
  onAgentHumanHelp?: () => void;
  onAgentMenu?: () => void;
  onAgentQuickReply?: (question: string) => void;
  onAgentSend?: (value: string) => void;
  onBottomBarToggle?: () => void;
  className?: string;
}

export function SetupShell({
  step = 2,
  steps = setupShellSourceSteps,
  progress = 32,
  layout = "guided",
  children,
  agent,
  agentContext,
  bottomBar,
  studioName = "Studio Leticia",
  status = "Setup inicial em andamento",
  avatarSrc,
  state = "source",
  onStudioSelect,
  onHelp,
  onProfile,
  onStepSelect,
  onAgentClose,
  onAgentHumanHelp,
  onAgentMenu,
  onAgentQuickReply,
  onAgentSend,
  onBottomBarToggle,
  className
}: SetupShellProps) {
  const isDisabled = state === "blocked" || state === "loading";
  const currentStep = Math.min(Math.max(step, 1), steps.length);

  return (
    <div
      className={cn("tcrm-setup-shell", `tcrm-setup-shell--${state}`, `tcrm-setup-shell--layout-${layout}`, className)}
      aria-busy={state === "loading" || undefined}
      data-component="SetupShell"
      data-layout={layout}
      data-state={state}
    >
      <header className="tcrm-setup-shell__topbar">
        <TaliyaLogo className="tcrm-setup-shell__logo" />
        <span className="tcrm-setup-shell__topbar-divider" aria-hidden="true" />
        <Button className="tcrm-setup-shell__studio" disabled={isDisabled} onClick={onStudioSelect} trailingIcon="chevronDown" type="button" variant="ghost">
          {studioName}
        </Button>
        <Chip className="tcrm-setup-shell__status" showDot={false}><span aria-hidden="true" className="tcrm-setup-shell__status-dot" />{status}</Chip>
        <div className="tcrm-setup-shell__progress">
          <ProgressBar label="Progresso geral" value={progress} />
          <span>{progress}%</span>
        </div>
        <Button className="tcrm-setup-shell__help" disabled={isDisabled} leadingIcon="help" onClick={onHelp} variant="secondary">Ajuda</Button>
        <PrimitiveButton aria-label="Abrir perfil" className="tcrm-setup-shell__avatar-button" disabled={isDisabled} onClick={onProfile} type="button">
          <Avatar name="Operadora" size="md" src={avatarSrc} />
        </PrimitiveButton>
        <IconButton className="tcrm-setup-shell__account-menu" disabled={isDisabled} icon="chevronDown" label="Abrir menu da conta" size="sm" variant="ghost" />
      </header>
      <SetupStepper aria-label="Etapas do setup" className="tcrm-setup-shell__steps" currentStep={currentStep} disabled={isDisabled} onStepSelect={onStepSelect} steps={steps} />
      <main className="tcrm-setup-shell__main">{children ?? <SetupShellDefaultStage />}</main>
      <aside aria-label="Assistente do setup" className="tcrm-setup-shell__agent">{agent ?? (
        <SetupShellAgentPanel
          context={agentContext}
          disabled={isDisabled}
          onClose={onAgentClose}
          onHumanHelp={onAgentHumanHelp}
          onMenu={onAgentMenu}
          onQuickReply={onAgentQuickReply}
          onSend={onAgentSend}
        />
      )}</aside>
      {bottomBar ?? <SetupBottomBar disabled={isDisabled} onToggle={onBottomBarToggle} />}
    </div>
  );
}

export function SetupStepper({
  steps = setupShellSourceSteps,
  currentStep = 1,
  blockedStepIds = [],
  disabled = false,
  onStepSelect,
  orientation = "vertical",
  showProgress = orientation === "horizontal",
  className,
  ...props
}: {
  steps?: string[];
  currentStep?: number;
  blockedStepIds?: string[];
  disabled?: boolean;
  onStepSelect?: (stepId: string) => void;
  orientation?: "horizontal" | "vertical";
  showProgress?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const activeStep = Math.min(Math.max(currentStep, 1), steps.length);
  const stepItems: StepperStep[] = steps.map((step, index) => {
    const number = index + 1;
    const id = step.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    return {
      id,
      label: <><span className="tcrm-setup-stepper__step-number">{number}</span>{step}</>,
      description: number < activeStep ? "Concluído" : number === activeStep ? "Em andamento" : blockedStepIds.includes(id) ? "Bloqueado" : "Pendente",
      disabled,
      state: blockedStepIds.includes(id) ? "blocked" : number < activeStep ? "complete" : number === activeStep ? "current" : "pending"
    };
  });

  return (
    <aside className={cn("tcrm-setup-stepper-panel", `tcrm-setup-stepper-panel--${orientation}`, className)} data-component="SetupStepper" {...props}>
      {orientation === "vertical" ? <h2>Etapas</h2> : null}
      <Stepper
        className="tcrm-setup-stepper"
        currentStepId={stepItems[activeStep - 1]?.id}
        markerStyle="number"
        onStepSelect={onStepSelect}
        orientation={orientation}
        progress={showProgress ? Math.round((activeStep / steps.length) * 100) : undefined}
        readonly={disabled}
        steps={stepItems}
      />
      {orientation === "vertical" ? <p className="tcrm-setup-stepper__sequence"><Icon name="lock" size="15px" /> Sequência obrigatória</p> : null}
    </aside>
  );
}

export function SetupBlockHeader({
  title = "Studio",
  description = "Defina o nome e os hor\u00e1rios gerais de funcionamento, isso ajuda o Taliya a montar a grade inicial com seguran\u00e7a.",
  step = 1,
  totalSteps = 9,
  badgeLabel,
  showBadge = true,
  state = "current",
  action,
  actionLabel = state === "blocked" ? "Resolver pendência" : state === "warning" ? "Revisar" : undefined,
  disabled = false,
  loading = false,
  onAction,
  className
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  step?: number;
  totalSteps?: number;
  badgeLabel?: React.ReactNode;
  showBadge?: boolean;
  state?: "current" | "complete" | "warning" | "blocked" | "loading";
  action?: React.ReactNode;
  actionLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  onAction?: () => void;
  className?: string;
}) {
  const isDisabled = disabled || loading || state === "loading";
  const label = loading || state === "loading" ? "Carregando bloco" : badgeLabel ?? `Bloco ${step} de ${totalSteps}`;
  const actionNode = action ?? (actionLabel ? (
    <Button
      className="tcrm-setup-block-header__action"
      disabled={isDisabled || state === "complete"}
      onClick={onAction}
      size="sm"
      variant={state === "blocked" ? "primary" : "secondary"}
    >
      {actionLabel}
    </Button>
  ) : null);

  return (
    <header
      aria-busy={loading || state === "loading" ? true : undefined}
      className={cn("tcrm-setup-block-header", className)}
      data-component="SetupBlockHeader"
      data-state={loading ? "loading" : state}
    >
      <div className="tcrm-setup-block-header__copy">
        <div className="tcrm-setup-block-header__title-row">
          <h1>{title}</h1>
          {showBadge ? (
            <Chip className="tcrm-setup-block-header__chip" showDot={false} tone={toneForState(state)}>
              {label}
            </Chip>
          ) : null}
        </div>
        <p>{description}</p>
      </div>
      {actionNode ? <div className="tcrm-setup-block-header__actions">{actionNode}</div> : null}
    </header>
  );
}

export function SetupBottomBar({
  progress = 0,
  state = "pending",
  onSave,
  onContinue,
  onPublish,
  onToggle,
  disabled = false,
  warningCount = 2,
  collapsed = true,
  className
}: {
  progress?: number;
  state?: "draft" | "saved" | "pending" | "ready" | "published";
  onSave?: () => void;
  onContinue?: () => void;
  onPublish?: () => void;
  onToggle?: () => void;
  disabled?: boolean;
  warningCount?: number;
  collapsed?: boolean;
  className?: string;
}) {
  const statusText = state === "published"
    ? "Setup publicado"
    : state === "ready"
      ? "Tudo certo neste bloco"
      : state === "draft"
        ? "Rascunho pronto para salvar"
        : "Rascunhos salvos automaticamente";
  const warningText = state === "published" || state === "ready" ? "Tudo certo neste bloco" : `Pendências do setup (${warningCount})`;
  const actionHandler = state === "ready" ? onPublish : state === "draft" ? onSave : onContinue;
  const actionLabel = state === "ready" ? "Publicar" : state === "draft" ? "Salvar" : "Continuar";

  return (
    <footer className={cn("tcrm-setup-bottom-bar", className)} data-component="SetupBottomBar" data-state={state}>
      <span className="tcrm-setup-bottom-bar__item">
        <Icon className="tcrm-setup-bottom-bar__status-icon" name="shield" />
        <span>Ambiente de Setup Inicial</span>
      </span>
      <span className="tcrm-setup-bottom-bar__divider" aria-hidden="true" />
      <Button aria-label={actionLabel} className="tcrm-setup-bottom-bar__item tcrm-setup-bottom-bar__save" disabled={disabled} onClick={actionHandler} variant="ghost">
        <Icon className="tcrm-setup-bottom-bar__save-icon" name="checkCircle" />
        <span>{statusText}</span>
        <span className="tl-sr-only">Progresso do setup: {progress}%</span>
      </Button>
      <Button className="tcrm-setup-bottom-bar__item tcrm-setup-bottom-bar__warning" disabled={disabled} onClick={onContinue} variant="ghost">
        <Icon className="tcrm-setup-bottom-bar__status-icon" name={state === "ready" || state === "published" ? "checkCircle" : "alert"} />
        <span>{warningText}</span>
      </Button>
      <span className="tcrm-setup-bottom-bar__divider" aria-hidden="true" />
      <IconButton
        className="tcrm-setup-bottom-bar__toggle"
        data-collapsed={collapsed ? "true" : "false"}
        disabled={disabled}
        icon="chevronDown"
        label={collapsed ? "Expandir pendências do setup" : "Recolher pendências do setup"}
        onClick={onToggle}
        size="md"
        variant="default"
      />
    </footer>
  );
}
