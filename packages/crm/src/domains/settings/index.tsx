/** Setup and studio settings presentation compositions. */
import React from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  Icon,
  IconButton,
  InlineAlert,
  InlineGroup,
  Input,
  List,
  ListItem,
  MessageBubble,
  Panel,
  ProgressBar,
  SegmentedControl,
  Select,
  StatusDot,
  Stepper,
  TaliyaLogo,
  TimeInput,
  Toggle,
  cn
} from "@taliya/ui";
import type {
  ComponentTone,
  IconName,
  StepperStep
} from "@taliya/ui";
import type {
  CrmSurfaceProps
} from "../../patterns/shell.js";
import {
  CrmWorklistTable
} from "../../internal-crm-runtime.js";
import {
  DashboardGrid
} from "../../patterns/shell.js";
import {
  InviteRow,
  QuickReplyChips,
  RoleCard,
  WeeklyHoursGrid
} from "../../patterns/index.js";
import {
  IntegrationStatusRow
} from "../billing/index.js";
import type {
  InviteRowData,
  InviteRowState,
  QuickReplyChipItem,
  WeeklyHoursGridSlot
} from "../../patterns/index.js";

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

function SettingsWorkspaceControls({ blocked, children }: { blocked: boolean; children: React.ReactNode }) {
  return (
    <fieldset aria-label="Controles da configuração" className="tcrm-settings-workspace-controls" disabled={blocked}>
      {children}
    </fieldset>
  );
}

export const setupShellSourceSteps = [
  "Studio",
  "Equipe",
  "Canais",
  "Planos",
  "Pagamento",
  "Alunos",
  "Turmas",
  "Agenda",
  "Revisão"
];
export interface SetupAgentQuickReply {
  id: string;
  label: string;
}

export interface SetupAgentContext {
  impact: string;
  messages: readonly string[];
  quickReplies: readonly SetupAgentQuickReply[];
  composerPlaceholder?: string;
}

export type SetupAgentContextId =
  | "shellBase"
  | "consumption"
  | "studio"
  | "team"
  | "channels"
  | "plans"
  | "payment"
  | "students"
  | "classes"
  | "agenda"
  | "review";

export const setupAgentContexts: Record<SetupAgentContextId, SetupAgentContext> = {
  shellBase: {
    impact: "Esta etapa afeta agenda, cobrança e comunicação inicial.",
    messages: [
      "Estamos na etapa Dados do studio. Vou te avisar o que é obrigatório e o que pode ficar para depois.",
      "Use a área central para preencher, importar ou revisar dados. Eu acompanho daqui e explico qualquer dúvida."
    ],
    quickReplies: [
      { id: "required", label: "O que é obrigatório?" },
      { id: "later", label: "Posso deixar para depois?" },
      { id: "agenda", label: "Como isso afeta a agenda?" }
    ]
  },
  consumption: {
    impact: "Esta etapa afeta agenda, cobrança e comunicação inicial.",
    messages: [
      "Estamos na etapa Consumo de aulas. Vou te ajudar a configurar apenas o necessário para começar com segurança.",
      "Use a área central para preencher e, se precisar, me pergunte qualquer dúvida ao lado."
    ],
    quickReplies: [
      { id: "replacement-deadline", label: "O que é prazo de reposição?" },
      { id: "balance-expiration", label: "Como funciona a expiração do saldo?" },
      { id: "after-go-live", label: "Posso alterar depois do go-live?" }
    ]
  },
  studio: {
    impact: "Este bloco define a janela em que o studio pode ter aulas.",
    messages: [
      "Vamos começar pela base do studio. Esses horários ainda não criam aulas; eles só ajudam o Taliya a montar turmas e agenda com segurança.",
      "Se alguma turma cair fora desses horários depois, eu vou te avisar antes de publicar."
    ],
    quickReplies: [
      { id: "required", label: "O que é obrigatório?" },
      { id: "change-later", label: "Posso mudar depois?" },
      { id: "creates-agenda", label: "Isso já cria agenda?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  team: {
    impact: "Este bloco prepara quem terá acesso ao Taliya quando o setup for publicado.",
    messages: [
      "Você pode começar só com o dono do studio. Se adicionar equipe agora, eu deixo os convites preparados para o final do setup.",
      "Nenhum convite será enviado enquanto o setup estiver em rascunho."
    ],
    quickReplies: [
      { id: "invite-now", label: "Preciso convidar equipe agora?" },
      { id: "invite-timing", label: "Quando o convite é enviado?" },
      { id: "roles-later", label: "Posso mudar os papéis depois?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  channels: {
    impact: "Este bloco define os canais que o Taliya pode usar para falar com alunos e equipe.",
    messages: [
      "O CRM pode continuar mesmo se o WhatsApp ainda não estiver conectado.",
      "Para agentes responderem alunos no WhatsApp, o número precisa estar no WhatsApp Business e passar pela conexão oficial.",
      "As redes sociais aqui são só referência do studio. Elas não ativam automações neste setup inicial."
    ],
    quickReplies: [
      { id: "connect-now", label: "Preciso conectar agora?" },
      { id: "personal-number", label: "Meu número é pessoal" },
      { id: "lose-whatsapp", label: "Vou perder meu WhatsApp?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  plans: {
    impact: "Este bloco define como o Taliya entende mensalidades, pacotes e aulas dos alunos.",
    messages: [
      "Plano define saldo, recorrência, validade e reposição.",
      "Horário fixo será configurado depois, em Turmas e Agenda.",
      "Pacote de aulas também pode ter horário fixo; a diferença é que o saldo é fechado."
    ],
    quickReplies: [
      { id: "plan-type", label: "Qual tipo escolher?" },
      { id: "fixed-time", label: "Pacote pode ter horário fixo?" },
      { id: "replacement", label: "Como funciona reposição?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  payment: {
    impact: "Este bloco define quais meios o studio aceita no começo da operação.",
    messages: [
      "Você só escolhe os meios aceitos agora. Nenhum detalhe técnico precisa ser configurado neste setup.",
      "O Taliya já consegue registrar cobranças, baixas e liberação de aulas. A automação financeira vem depois."
    ],
    quickReplies: [
      { id: "required", label: "O que é obrigatório?" },
      { id: "settlement", label: "Como funciona a baixa?" },
      { id: "later", label: "O que fica para depois?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  students: {
    impact: "Este bloco cria a base inicial de alunos ativos.",
    messages: [
      "Você pode misturar planilhas, fotos de caderno, listas coladas e cadastros manuais.",
      "Eu transformo tudo em rascunho e marco o que precisa de revisão antes de publicar.",
      "Horários e turmas serão vinculados nos próximos blocos."
    ],
    quickReplies: [
      { id: "required", label: "O que é obrigatório?" },
      { id: "notebook-photo", label: "Posso importar foto de caderno?" },
      { id: "duplicates", label: "E se tiver duplicidade?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  classes: {
    impact: "Este bloco organiza os horários fixos recorrentes do studio.",
    messages: [
      "Turma ainda não é agenda. A agenda será montada no próximo bloco.",
      "Você pode importar planilhas, fotos da grade, listas coladas ou criar turmas manualmente.",
      "Se algum aluno não for encontrado, eu marco como pendência para você revisar."
    ],
    quickReplies: [
      { id: "class-vs-agenda", label: "Turma é diferente de agenda?" },
      { id: "link-students", label: "Preciso vincular alunos agora?" },
      { id: "schedule-image", label: "E se eu só tiver print da grade?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  agenda: {
    impact: "Este bloco revisa a agenda inicial gerada pelo Taliya.",
    messages: [
      "À esquerda está o controle de como cada turma virou agenda. À direita está a semana completa que será publicada.",
      "Se algo estiver errado na origem, volte para Turmas.",
      "Reposições, encaixes e ajustes avançados ficam para depois do go-live."
    ],
    quickReplies: [
      { id: "publication-blockers", label: "O que bloqueia publicação?" },
      { id: "adjust-later", label: "Posso ajustar depois?" },
      { id: "back-to-classes", label: "Por que voltar para turmas?" }
    ],
    composerPlaceholder: "Pergunte sobre este bloco..."
  },
  review: {
    impact: "Esta é a revisão final antes de publicar o setup inicial.",
    messages: [
      "Eu organizei a revisão em três partes: publicado agora, pendências e depois do go-live.",
      "Nada será publicado sem sua confirmação. Você ainda pode voltar em qualquer bloco antes de publicar.",
      "Configurações avançadas ficam para depois, sem bloquear o início da operação."
    ],
    quickReplies: [
      { id: "published", label: "O que será publicado?" },
      { id: "blockers", label: "O que bloqueia?" },
      { id: "later", label: "O que fica para depois?" },
      { id: "after", label: "O que acontece depois?" }
    ],
    composerPlaceholder: "Pergunte sobre a revisão..."
  }
};

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
          <button disabled={disabled || !onQuickReply} key={question.id} onClick={() => onQuickReply?.(question.label)} type="button">{question.label}</button>
        ))}
      </div>
      <form className="tcrm-setup-shell__agent-composer" onSubmit={(event) => { event.preventDefault(); onSend?.(value); }}>
        <label className="tl-sr-only" htmlFor="setup-shell-agent-question">Pergunte sobre esta etapa</label>
        <input disabled={disabled || !onSend} id="setup-shell-agent-question" onChange={(event) => setValue(event.currentTarget.value)} placeholder={context.composerPlaceholder ?? "Pergunte sobre esta etapa..."} value={value} />
        <IconButton disabled={disabled || !onSend} icon="send" label="Enviar pergunta" size="md" type="submit" variant="selected" />
      </form>
      <p className="tcrm-setup-shell__human-help">Precisa de ajuda humana? <button disabled={disabled || !onHumanHelp} onClick={onHumanHelp} type="button">Agendar ajuda</button></p>
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
        <button aria-label="Abrir perfil" className="tcrm-setup-shell__avatar-button" disabled={isDisabled} onClick={onProfile} type="button">
          <Avatar name="Operadora" size="md" src={avatarSrc} />
        </button>
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

export type SetupWelcomeState = "first" | "returning" | "blocked" | "loading";

export interface SetupWelcomeProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  state?: SetupWelcomeState;
  studioName?: string;
  placeholder?: string;
  onStudioNameChange?: (value: string) => void;
  onStart?: () => void;
  disabled?: boolean;
}

export function SetupWelcome({
  state = "first",
  studioName,
  placeholder = "Ex.: Studio Letícia",
  onStudioNameChange,
  onStart,
  disabled = false,
  className,
  ...props
}: SetupWelcomeProps) {
  const [internalStudioName, setInternalStudioName] = React.useState(studioName ?? "");
  const [showNameError, setShowNameError] = React.useState(false);
  const isDisabled = disabled || state === "blocked" || state === "loading";
  const resolvedStudioName = studioName ?? internalStudioName;
  const buttonLabel = state === "returning" ? "Continuar setup guiado" : "Começar setup guiado";

  const handleStudioNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextStudioName = event.currentTarget.value;
    if (studioName === undefined) setInternalStudioName(nextStudioName);
    if (nextStudioName.trim()) setShowNameError(false);
    onStudioNameChange?.(nextStudioName);
  };

  const handleStart = () => {
    if (!resolvedStudioName.trim()) {
      setShowNameError(true);
      return;
    }
    onStart?.();
  };

  return (
    <section
      className={cn("tcrm-setup-welcome", className)}
      data-component="SetupWelcome"
      data-state={state}
      {...props}
    >
      <h1>Bem-vindo à Taliya</h1>
      <p className="tcrm-setup-welcome__subtitle">
        <span>Vamos preparar seu studio passo a passo,</span>
        <span>com ajuda do agente de configuração.</span>
      </p>
      <p className="tcrm-setup-welcome__prompt">Para começar, informe o nome do seu studio.</p>
      <Input
        aria-label="Nome do studio"
        className="tcrm-setup-welcome__input"
        disabled={isDisabled}
        error={showNameError ? "Informe o nome do studio para continuar." : undefined}
        onChange={handleStudioNameChange}
        placeholder={placeholder}
        required
        value={resolvedStudioName}
      />
      <Button
        className="tcrm-setup-welcome__button"
        disabled={isDisabled}
        loading={state === "loading"}
        onClick={handleStart}
        size="lg"
        variant="primary"
      >
        {buttonLabel}
      </Button>
    </section>
  );
}

export type SetupChoiceCardState = "default" | "recommended" | "selected" | "disabled";

export interface SetupChoiceCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  title?: string;
  description?: string;
  state?: SetupChoiceCardState;
  selected?: boolean;
  icon?: IconName;
  onSelect?: () => void;
}

export function SetupChoiceCard({
  title = "Pacote de aulas",
  description = "Pacote com quantidade de aulas por ciclo.",
  state = "default",
  selected = false,
  disabled = false,
  icon = "calendar",
  onSelect,
  className,
  type = "button",
  ...props
}: SetupChoiceCardProps) {
  const isSelected = selected || state === "selected";
  const isDisabled = disabled || state === "disabled";

  return (
    <button
      aria-pressed={isSelected}
      className={cn("tcrm-setup-choice-card", className)}
      data-component="SetupChoiceCard"
      data-state={isDisabled ? "disabled" : isSelected ? "selected" : state}
      disabled={isDisabled}
      onClick={onSelect}
      type={type}
      {...props}
    >
      <span className="tcrm-setup-choice-card__icon" aria-hidden="true">
        {isSelected ? <span className="tcrm-setup-choice-card__selected-dot" /> : <Icon name={icon} />}
      </span>
      <span className="tcrm-setup-choice-card__body">
        <span className="tcrm-setup-choice-card__title">{title}</span>
        <span className="tcrm-setup-choice-card__description">{description}</span>
      </span>
    </button>
  );
}

export type SetupConsumptionModel = "membership" | "class-pack" | "hybrid";

export interface SetupConsumptionWorkspaceProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  model?: SetupConsumptionModel;
  onModelSelect?: (model: SetupConsumptionModel) => void;
  onAction?: (action: "save" | "continue" | "later") => void;
  onSettingChange?: (setting: string, enabled: boolean) => void;
}

export function SetupConsumptionWorkspace({
  model = "class-pack",
  onModelSelect,
  onAction,
  onSettingChange,
  className,
  ...props
}: SetupConsumptionWorkspaceProps) {
  const models: Array<{ id: SetupConsumptionModel; title: string; description: string }> = [
    { id: "membership", title: "Mensalidade", description: "Cobranca recorrente por periodo." },
    { id: "class-pack", title: "Pacote de aulas", description: "Pacote com quantidade de aulas por ciclo." },
    { id: "hybrid", title: "Hibrido", description: "Combina mensalidade e pacotes." }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-consumption-workspace", className)} data-component="SetupConsumptionWorkspace" {...props}>
      <SetupBlockHeader
        badgeLabel="Rascunho"
        description="Defina como mensalidades, pacotes e reposicoes funcionam no setup inicial. Ajustes finos podem ficar para depois do go-live."
        title="Consumo de aulas"
      />

      <Panel className="tcrm-setup-consumption-workspace__models" compact>
        <h3>Modelo principal</h3>
        <SetupContentGrid>
          {models.map((item) => (
            <SetupChoiceCard
              description={item.description}
              key={item.id}
              onSelect={() => onModelSelect?.(item.id)}
              selected={model === item.id}
              title={item.title}
            />
          ))}
        </SetupContentGrid>
      </Panel>

      <div className="tcrm-setup-consumption-workspace__settings">
        <Panel compact>
          <h3>Pacote base</h3>
          <div className="tcrm-setup-consumption-workspace__field-row">
            <Input defaultValue="8" fieldSize="sm" label="Aulas por mes" type="number" />
            <Select fieldSize="sm" label="Validade" options={[{ value: "monthly", label: "Mensal" }]} value="monthly" />
          </div>
          <Toggle compact defaultPressed label="Renova automaticamente" onPressedChange={(checked) => onSettingChange?.("auto-renew", checked)} />
          <Toggle compact defaultPressed label="Saldo expira no fim do ciclo" onPressedChange={(checked) => onSettingChange?.("balance-expires", checked)} />
        </Panel>
        <Panel compact>
          <h3>Reposicoes</h3>
          <Toggle compact defaultPressed label="Permitir reposicao" onPressedChange={(checked) => onSettingChange?.("allow-replacement", checked)} />
          <Input defaultValue="7" fieldSize="sm" label="Prazo para usar reposicao" trailingText="dias" />
          <Select fieldSize="sm" label="Aviso minimo para gerar reposicao" options={[{ value: "12h", label: "12h" }]} value="12h" />
          <Toggle compact defaultPressed label="Reposicao consome vaga da turma" onPressedChange={(checked) => onSettingChange?.("replacement-uses-slot", checked)} />
        </Panel>
        <Panel compact>
          <h3>Excecoes simples</h3>
          <List divided>
            <ListItem action={<Chip tone="warning">Pode ficar para depois</Chip>} leading={<Icon name="calendar" tone="warning" />} title="Feriados" />
            <ListItem action={<Chip tone="warning">Revisar depois</Chip>} leading={<Icon name="calendar" tone="warning" />} title="Contratos antigos" />
            <ListItem action={<Chip tone="neutral">Nao gera reposicao</Chip>} leading={<Icon name="x" />} title="Faltas sem aviso" />
          </List>
        </Panel>
        <InlineAlert className="tcrm-setup-consumption-workspace__validation" tone="info" title="Validacao da configuracao">
          Esta regra base pode ser salva como rascunho. Feriados e contratos antigos podem ficar como pendencia segura.
        </InlineAlert>
      </div>

      <footer className="tcrm-setup-consumption-workspace__footer">
        <div>
          <h3>Acoes da etapa</h3>
          <ButtonGroup>
            <Button leadingIcon="check" onClick={() => onAction?.("save")} size="sm" variant="primary">Salvar rascunho</Button>
            <Button onClick={() => onAction?.("continue")} size="sm" trailingIcon="arrowRight" variant="secondary">Continuar</Button>
            <Button leadingIcon="clock" onClick={() => onAction?.("later")} size="sm" variant="secondary">Configurar depois</Button>
          </ButtonGroup>
        </div>
        <Panel compact>
          <InlineGroup><Icon name="barChart" size="24px" /><strong>Previa de impacto entra aqui</strong></InlineGroup>
          <p>Espaco reservado para a previa de impacto apos salvar as configuracoes.</p>
        </Panel>
      </footer>
    </SetupPagePanel>
  );
}

export interface SetupStudioWorkspaceProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  activeDays?: string[];
  scheduleMode?: "continuous" | "break";
  disabled?: boolean;
  header?: React.ReactNode;
  details?: React.ReactNode;
  footer?: React.ReactNode;
  onActiveDaysChange?: (days: string[]) => void;
  onScheduleModeChange?: (mode: "continuous" | "break") => void;
  onAdjustDay?: () => void;
  onAction?: (action: "save" | "continue") => void;
}

export function SetupStudioWorkspace({
  activeDays = ["Seg", "Ter", "Qua", "Qui", "Sex"],
  scheduleMode = "continuous",
  disabled = false,
  header,
  details,
  footer,
  onActiveDaysChange,
  onScheduleModeChange,
  onAdjustDay,
  onAction,
  className,
  ...props
}: SetupStudioWorkspaceProps) {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
  const toggleDay = (day: string) => {
    const next = activeDays.includes(day) ? activeDays.filter((item) => item !== day) : [...activeDays, day];
    onActiveDaysChange?.(next);
  };

  return (
    <SetupPagePanel className={cn("tcrm-setup-studio-workspace", className)} data-component="SetupStudioWorkspace" {...props}>
      {header ?? <SetupBlockHeader title="Studio" />}
      <SettingsWorkspaceControls blocked={disabled}>
        <div className="tcrm-setup-studio-workspace__grid">
        <Panel className="tcrm-setup-studio-workspace__form" compact>
          {details}
          <section>
            <h3>1. Dias de funcionamento</h3>
            <p>Em quais dias o studio funciona?</p>
            <div className="tcrm-setup-studio-workspace__days">
              {days.map((day) => (
                <Checkbox checked={activeDays.includes(day)} key={day} label={day} onChange={() => toggleDay(day)} />
              ))}
            </div>
          </section>
          <section>
            <h3>2. Horario geral</h3>
            <div className="tcrm-setup-studio-workspace__time-row">
              <TimeInput defaultValue="07:00" fieldSize="sm" label="Abre as" />
              <TimeInput defaultValue="21:00" fieldSize="sm" label="Fecha as" />
            </div>
            <p>O studio fecha em algum intervalo do dia?</p>
            <SegmentedControl
              label="Intervalo do studio"
              onChange={(value) => onScheduleModeChange?.(value as "continuous" | "break")}
              options={[{ value: "continuous", label: "Funciona direto" }, { value: "break", label: "Tem pausa" }]}
              value={scheduleMode}
            />
            <div className="tcrm-setup-studio-workspace__time-row">
              <TimeInput defaultValue="12:00" fieldSize="sm" label="Pausa comeca" />
              <TimeInput defaultValue="13:00" fieldSize="sm" label="Pausa termina" />
            </div>
          </section>
        </Panel>
        <Panel className="tcrm-setup-studio-workspace__preview" compact>
          <WeeklyHoursGrid onAdjustDay={onAdjustDay} />
        </Panel>
        </div>
      </SettingsWorkspaceControls>
      {footer ?? <ButtonGroup className="tcrm-setup-studio-workspace__actions">
        <Button disabled={disabled} leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button disabled={disabled} onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>}
    </SetupPagePanel>
  );
}

export interface SetupTeamWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  ownerAvatarSrc?: string;
  onAddPerson?: () => void;
  onInviteOpen?: (invite: InviteRowData, state: InviteRowState) => void;
  onInviteEdit?: (invite: InviteRowData, state: InviteRowState) => void;
  onInviteRemove?: (invite: InviteRowData, state: InviteRowState) => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupTeamWorkspace({
  ownerAvatarSrc,
  onAddPerson,
  onInviteOpen,
  onInviteEdit,
  onInviteRemove,
  onAction,
  className,
  ...props
}: SetupTeamWorkspaceProps) {
  const invites: Array<{ state: InviteRowState; invite?: Partial<InviteRowData> }> = [
    { state: "prepared" },
    { state: "prepared", invite: { id: "carla-souza", initials: "CS", name: "Carla Souza", role: "Recepcao", email: "carla@studio.com", phone: "(11) 97777-2222" } },
    { state: "incomplete" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-team-workspace", className)} data-component="SetupTeamWorkspace" {...props}>
      <SetupBlockHeader
        description="Adicione as pessoas que vao usar o Taliya no comeco. Os convites serao enviados automaticamente quando o setup for publicado."
        step={2}
        title="Equipe"
      />
      <Panel className="tcrm-setup-team-workspace__content" compact>
        <section>
          <h3>1. Dono do studio</h3>
          <RoleCard avatarSrc={ownerAvatarSrc} roleLabel="Dono" selected />
        </section>
        <section className="tcrm-setup-team-workspace__add-person">
          <h3>2. Adicionar pessoa</h3>
          <div className="tcrm-setup-team-workspace__fields">
            <Input defaultValue="Ana Martins" fieldSize="sm" label="Nome" />
            <Input defaultValue="ana@studio.com" fieldSize="sm" label="E-mail" type="email" />
            <Input defaultValue="(11) 98888-1111" fieldSize="sm" label="WhatsApp" />
            <Select fieldSize="sm" label="Papel" options={[{ value: "teacher", label: "Professor" }, { value: "reception", label: "Recepcao" }, { value: "finance", label: "Financeiro" }]} value="teacher" />
          </div>
          <Button onClick={onAddPerson} variant="secondary">Adicionar pessoa</Button>
        </section>
        <section>
          <h3>3. Equipe preparada</h3>
          <List>
            {invites.map((item) => (
              <InviteRow
                invite={item.invite}
                key={item.invite?.id ?? item.state}
                onEdit={onInviteEdit}
                onOpen={onInviteOpen}
                onRemove={onInviteRemove}
                state={item.state}
              />
            ))}
          </List>
          <InlineAlert tone="info">Os convites ficam preparados agora e serao enviados automaticamente quando o setup inicial for publicado.</InlineAlert>
        </section>
      </Panel>
      <ButtonGroup className="tcrm-setup-team-workspace__actions">
        <Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button onClick={() => onAction?.("later")} variant="secondary">Configurar equipe depois</Button>
        <Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>
    </SetupPagePanel>
  );
}

export type SetupWhatsAppState = "business" | "personal" | "unknown" | "missing";

export interface SetupChannelsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  whatsAppState?: SetupWhatsAppState;
  connectionStatus?: "connected" | "pending" | "disconnected";
  disabled?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onWhatsAppStateChange?: (state: SetupWhatsAppState) => void;
  onConnectWhatsApp?: () => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupChannelsWorkspace({
  whatsAppState = "business",
  connectionStatus = "pending",
  disabled = false,
  header,
  footer,
  onWhatsAppStateChange,
  onConnectWhatsApp,
  onAction,
  className,
  ...props
}: SetupChannelsWorkspaceProps) {
  const connectionLabel = connectionStatus === "connected" ? "Conectado" : connectionStatus === "disconnected" ? "Desconectado" : "Pendente de conexao oficial";
  const connectionTone: ComponentTone = connectionStatus === "connected" ? "success" : connectionStatus === "disconnected" ? "danger" : "warning";
  const whatsAppOptions: Array<{ id: SetupWhatsAppState; title: string }> = [
    { id: "business", title: "Sim, ja esta no WhatsApp Business" },
    { id: "personal", title: "Ainda esta no WhatsApp pessoal" },
    { id: "unknown", title: "Nao sei" },
    { id: "missing", title: "Ainda nao tenho numero do studio" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-channels-workspace", className)} data-component="SetupChannelsWorkspace" {...props}>
      {header ?? <SetupBlockHeader
        description="Informe os canais oficiais do studio. O WhatsApp Business podera ser conectado oficialmente agora ou ficar como pendencia antes de ativar agentes e mensagens."
        step={3}
        title="Canais"
      />}
      <SettingsWorkspaceControls blocked={disabled}>
        <div className="tcrm-setup-channels-workspace__grid">
        <div className="tcrm-setup-channels-workspace__column">
          <Panel className="tcrm-setup-channels-workspace__whatsapp" compact>
            <h3>1. WhatsApp Business</h3>
            <Input defaultValue="(11) 99999-0000" fieldSize="sm" label="WhatsApp Business do studio" />
            <p>Esse numero esta no WhatsApp Business?</p>
            <div className="tcrm-setup-channels-workspace__choices">
              {whatsAppOptions.map((option) => (
                <SetupChoiceCard
                  description=""
                  key={option.id}
                  onSelect={() => onWhatsAppStateChange?.(option.id)}
                  selected={whatsAppState === option.id}
                  title={option.title}
                />
              ))}
            </div>
            <InlineGroup className="tcrm-setup-channels-workspace__connect" justify="between">
              <Chip icon={connectionStatus === "connected" ? "checkCircle" : "link"} tone={connectionTone}>{connectionLabel}</Chip>
              <Button leadingIcon="link" onClick={onConnectWhatsApp} variant="secondary">{connectionStatus === "connected" ? "Testar conexao" : "Conectar WhatsApp Business"}</Button>
            </InlineGroup>
            <p>Voce continuara usando o WhatsApp Business no celular. A conexao oficial libera atendimento pelo CRM e agentes quando tudo for publicado.</p>
          </Panel>
          <Panel className="tcrm-setup-channels-workspace__public" compact>
            <h3>3. Canais publicos opcionais</h3>
            <p>Adicione redes sociais se quiser. Elas ajudam a registrar onde o studio aparece, mas nao ativam automacoes neste setup inicial.</p>
            <div className="tcrm-setup-channels-workspace__public-fields">
              <Input defaultValue="@studioleticia" fieldSize="sm" label="Instagram" />
              <Input defaultValue="facebook.com/studioleticia" fieldSize="sm" label="Facebook" />
              <Input defaultValue="@studioleticia" fieldSize="sm" label="TikTok" />
              <Input defaultValue="@studioleticia" fieldSize="sm" label="X" />
              <Input defaultValue="studioleticia.com.br" fieldSize="sm" label="Site" />
            </div>
          </Panel>
        </div>
        <div className="tcrm-setup-channels-workspace__column">
          <Panel className="tcrm-setup-channels-workspace__email" compact>
            <h3>2. E-mail do studio</h3>
            <Input defaultValue="contato@studioleticia.com" fieldSize="sm" label="E-mail do studio" type="email" />
            <p>Usado para avisos, convites e comunicacao administrativa. Pode ser o e-mail do dono no comeco.</p>
            <Chip icon="checkCircle" tone="success">Pronto</Chip>
          </Panel>
          <Panel className="tcrm-setup-channels-workspace__status" compact>
            <h3>4. Status dos canais</h3>
            <List divided>
              <ListItem action={<StatusDot label={connectionLabel} status={connectionStatus === "connected" ? "success" : connectionStatus === "disconnected" ? "danger" : "warning"} />} title="WhatsApp Business" />
              <ListItem action={<StatusDot label="Pronto" status="success" />} title="E-mail" />
              <ListItem action={<StatusDot label="4 adicionados" status="info" />} title="Canais publicos" />
            </List>
            <InlineAlert tone="info">O CRM pode seguir. Mensagens e agentes pelo WhatsApp so serao ativados apos a conexao oficial.</InlineAlert>
          </Panel>
        </div>
        </div>
      </SettingsWorkspaceControls>
      {footer ?? <ButtonGroup className="tcrm-setup-channels-workspace__actions">
        <Button disabled={disabled} leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button disabled={disabled} onClick={() => onAction?.("later")} variant="secondary">Configurar canais depois</Button>
        <Button disabled={disabled} onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>}
    </SetupPagePanel>
  );
}

export type SetupPlanId = "weekly" | "pack" | "trial";
export type SetupPlanField = "name" | "type" | "value" | "quantity" | "recurrence" | "validity" | "replacement" | "replacementDeadline" | "replacementNotice";

export const setupPlansDefaultFieldValues: Record<SetupPlanField, string> = {
  name: "Pacote 8 aulas",
  type: "pack",
  value: "420,00",
  quantity: "8",
  recurrence: "none",
  validity: "30",
  replacement: "yes",
  replacementDeadline: "7",
  replacementNotice: "12"
};

export interface SetupPlansWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  selectedPlanId?: SetupPlanId;
  disabled?: boolean;
  fieldValues?: Partial<Record<SetupPlanField, string>>;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  planStates?: Partial<Record<SetupPlanId, { label: string; tone: ComponentTone; studentsUsing?: number }>>;
  destructiveAction?: "remove" | "deactivate";
  onPlanSelect?: (planId: SetupPlanId) => void;
  onNewPlan?: () => void;
  onPlanAction?: (planId: SetupPlanId, action: "edit" | "duplicate" | "remove" | "deactivate") => void;
  onFieldChange?: (field: SetupPlanField, value: string) => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupPlansWorkspace({
  selectedPlanId = "pack",
  disabled = false,
  fieldValues = {},
  header,
  footer,
  planStates,
  destructiveAction = "remove",
  onPlanSelect,
  onNewPlan,
  onPlanAction,
  onFieldChange,
  onAction,
  className,
  ...props
}: SetupPlansWorkspaceProps) {
  const fieldValue = (field: SetupPlanField) => fieldValues[field] ?? setupPlansDefaultFieldValues[field];
  const plans: Array<{ id: SetupPlanId; title: string; type: string; value: string; replacement: string; tone: ComponentTone }> = [
    { id: "weekly", title: "Pilates 2x por semana", type: "Mensalidade por frequencia semanal", value: "R$ 360/mes · 2x por semana", replacement: "Permite reposicao", tone: "success" },
    { id: "pack", title: "Pacote 8 aulas", type: "Pacote de aulas", value: "R$ 420 · 8 aulas", replacement: "Permite reposicao", tone: "success" },
    { id: "trial", title: "Aula experimental", type: "Experimental/Avaliacao", value: "R$ 0 · 1 aula", replacement: "Nao gera reposicao", tone: "danger" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-plans-workspace", className)} data-component="SetupPlansWorkspace" {...props}>
      {header ?? <SetupBlockHeader
        description="Cadastre os planos que o studio oferece aos alunos. Voce pode comecar pelos principais e ajustar detalhes depois."
        step={4}
        title="Planos"
      />}
      <SettingsWorkspaceControls blocked={disabled}>
        <div className="tcrm-setup-plans-workspace__grid">
        <Panel className="tcrm-setup-plans-workspace__list" compact>
          <InlineGroup justify="between"><h3>Planos criados</h3><Button leadingIcon="plus" onClick={onNewPlan} size="sm" variant="secondary">Novo plano</Button></InlineGroup>
          {plans.map((plan) => (
            <Panel className={cn("tcrm-setup-plans-workspace__plan", selectedPlanId === plan.id && "tcrm-setup-plans-workspace__plan--selected")} compact key={plan.id}>
              <Button className="tcrm-setup-plans-workspace__plan-select" onClick={() => onPlanSelect?.(plan.id)} variant="ghost">
                <strong>{plan.title}</strong><span>{plan.type}</span><b>{plan.value}</b><Chip icon={plan.tone === "success" ? "checkCircle" : "x"} tone={plan.tone}>{plan.replacement}</Chip>
                {planStates?.[plan.id] ? <Chip tone={planStates[plan.id]?.tone}>{planStates[plan.id]?.label}</Chip> : null}
                {planStates?.[plan.id]?.studentsUsing !== undefined ? <span>{planStates[plan.id]?.studentsUsing} alunos usando</span> : null}
              </Button>
              <ButtonGroup>
                <Button leadingIcon="edit" onClick={() => onPlanAction?.(plan.id, "edit")} size="sm" variant="ghost">Editar</Button>
                <Button leadingIcon="copy" onClick={() => onPlanAction?.(plan.id, "duplicate")} size="sm" variant="ghost">Duplicar</Button>
                <Button leadingIcon={destructiveAction === "deactivate" ? "x" : "trash"} onClick={() => onPlanAction?.(plan.id, destructiveAction)} size="sm" tone="danger" variant="ghost">{destructiveAction === "deactivate" ? "Inativar" : "Remover"}</Button>
              </ButtonGroup>
            </Panel>
          ))}
        </Panel>
        <Panel className="tcrm-setup-plans-workspace__editor" compact>
          <InlineGroup justify="between"><div><h3>Editar plano selecionado</h3><p>Voce pode ajustar este plano depois do go-live.</p></div><Chip>Rascunho</Chip></InlineGroup>
          <Input fieldSize="sm" label="1. Nome do plano" onChange={(event) => onFieldChange?.("name", event.currentTarget.value)} value={fieldValue("name")} />
          <div className="tcrm-setup-plans-workspace__field"><strong>2. Tipo do plano</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--type" compact label="2. Tipo do plano" onChange={(value) => onFieldChange?.("type", value)} options={[{ value: "weekly", label: "Mensalidade por frequencia semanal" }, { value: "quantity", label: "Mensalidade por quantidade mensal" }, { value: "pack", label: "Pacote de aulas" }, { value: "single", label: "Aula avulsa" }, { value: "trial", label: "Experimental/Avaliacao" }, { value: "other", label: "Outro" }]} value={fieldValue("type")} /></div>
          <Input fieldSize="sm" label="3. Valor" leadingText="R$" onChange={(event) => onFieldChange?.("value", event.currentTarget.value)} value={fieldValue("value")} />
          <div className="tcrm-setup-plans-workspace__field"><strong>4. Quantidade de aulas</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--quantity" compact label="4. Quantidade de aulas" onChange={(value) => onFieldChange?.("quantity", value)} options={[{ value: "1", label: "1 aula" }, { value: "5", label: "5 aulas" }, { value: "8", label: "8 aulas" }, { value: "10", label: "10 aulas" }, { value: "12", label: "12 aulas" }, { value: "20", label: "20 aulas" }, { value: "custom", label: "Personalizado" }]} value={fieldValue("quantity")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><strong>5. Recorrencia</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--three" compact label="5. Recorrencia" onChange={(value) => onFieldChange?.("recurrence", value)} options={[{ value: "none", label: "Sem recorrencia" }, { value: "renew", label: "Renova automaticamente" }, { value: "later", label: "Decidir depois" }]} value={fieldValue("recurrence")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><strong>6. Validade</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--validity" compact label="6. Validade" onChange={(value) => onFieldChange?.("validity", value)} options={[{ value: "30", label: "30 dias" }, { value: "60", label: "60 dias" }, { value: "90", label: "90 dias" }, { value: "none", label: "Sem validade" }, { value: "custom", label: "Personalizado" }, { value: "later", label: "Decidir depois" }]} value={fieldValue("validity")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><strong>7. Reposicao</strong><SegmentedControl className="tcrm-setup-plans-workspace__segments--three" compact label="7. Reposicao" onChange={(value) => onFieldChange?.("replacement", value)} options={[{ value: "yes", label: "Sim" }, { value: "no", label: "Nao" }, { value: "later", label: "Decidir depois" }]} value={fieldValue("replacement")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><span>Prazo para usar a reposicao</span><SegmentedControl className="tcrm-setup-plans-workspace__segments--deadline" compact label="Prazo para usar a reposicao" onChange={(value) => onFieldChange?.("replacementDeadline", value)} options={[{ value: "7", label: "7 dias" }, { value: "15", label: "15 dias" }, { value: "30", label: "30 dias" }, { value: "cycle", label: "Ate o fim do ciclo" }, { value: "custom", label: "Personalizado" }]} value={fieldValue("replacementDeadline")} /></div>
          <div className="tcrm-setup-plans-workspace__field"><span>Aviso minimo para gerar reposicao</span><SegmentedControl className="tcrm-setup-plans-workspace__segments--notice" compact label="Aviso minimo para gerar reposicao" onChange={(value) => onFieldChange?.("replacementNotice", value)} options={[{ value: "none", label: "Sem aviso minimo" }, { value: "2", label: "2h antes" }, { value: "6", label: "6h antes" }, { value: "12", label: "12h antes" }, { value: "24", label: "24h antes" }, { value: "custom", label: "Personalizado" }]} value={fieldValue("replacementNotice")} /></div>
          <InlineAlert tone="info">A aula prevista consome saldo normalmente. Quando a regra permitir, o sistema gera uma reposicao para compensar a falta.</InlineAlert>
        </Panel>
        <Panel className="tcrm-setup-plans-workspace__understanding" compact>
          <h3>Como o Taliya vai entender este plano</h3>
          <p>Este e um pacote de 8 aulas por R$ 420. O aluno tem 8 aulas no total, independentemente do tamanho do mes. Se esse aluno tiver horario fixo depois, cada aula prevista continua consumindo saldo do pacote. Reposicoes podem ser geradas quando o aluno avisa com 12h de antecedencia e ficam validas por 7 dias.</p>
          <List divided>
            <ListItem action="8 aulas" title="Saldo" />
            <ListItem action="30 dias" title="Validade" />
            <ListItem action="Sim, com aviso de 12h" title="Reposicao" />
            <ListItem action="Definido depois" title="Horario fixo" />
          </List>
        </Panel>
        </div>
      </SettingsWorkspaceControls>
      {footer ?? <ButtonGroup className="tcrm-setup-plans-workspace__actions">
        <Button disabled={disabled} leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button disabled={disabled} onClick={() => onAction?.("later")} variant="secondary">Configurar planos depois</Button>
        <Button disabled={disabled} onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>}
    </SetupPagePanel>
  );
}

export type SetupPaymentMethod = "pix" | "cash" | "card";

export interface SetupPaymentWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  selectedMethods?: SetupPaymentMethod[];
  onSelectedMethodsChange?: (methods: SetupPaymentMethod[]) => void;
  onLearnMore?: () => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupPaymentWorkspace({
  selectedMethods = ["pix", "cash", "card"],
  onSelectedMethodsChange,
  onLearnMore,
  onAction,
  className,
  ...props
}: SetupPaymentWorkspaceProps) {
  const methods: Array<{ id: SetupPaymentMethod; title: string; description: string; icon: IconName }> = [
    { id: "pix", title: "Pix", description: "Pagamento por Pix", icon: "banknote" },
    { id: "cash", title: "Dinheiro", description: "Recebido presencialmente", icon: "banknote" },
    { id: "card", title: "Cartao", description: "Cartao presencial", icon: "creditCard" }
  ];
  const toggleMethod = (method: SetupPaymentMethod) => {
    const next = selectedMethods.includes(method) ? selectedMethods.filter((item) => item !== method) : [...selectedMethods, method];
    onSelectedMethodsChange?.(next);
  };
  const flow = [
    { icon: "document" as IconName, label: "Plano gera cobranca" },
    { icon: "user" as IconName, label: "Aluno paga por um meio aceito" },
    { icon: "users" as IconName, label: "Equipe registra a baixa no Taliya" },
    { icon: "checkCircle" as IconName, label: "Cobranca fica paga" },
    { icon: "unlock" as IconName, label: "Aulas ou saldo sao liberados" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-payment-workspace", className)} data-component="SetupPaymentWorkspace" {...props}>
      <SetupBlockHeader description="Defina os meios aceitos no inicio e veja como o Taliya vai registrar pagamentos na operacao." step={5} totalSteps={9} title="Pagamento" />
      <Panel className="tcrm-setup-payment-workspace__methods" compact>
        <h3>1. Meios de pagamento</h3>
        <p>Selecione os meios que o studio aceita hoje. Os detalhes tecnicos e automacoes ficam para depois.</p>
        <div className="tcrm-setup-payment-workspace__method-grid">
          {methods.map((method) => (
            <SetupChoiceCard
              description={method.description}
              icon={method.icon}
              key={method.id}
              onSelect={() => toggleMethod(method.id)}
              selected={selectedMethods.includes(method.id)}
              title={method.title}
            />
          ))}
        </div>
      </Panel>
      <Panel className="tcrm-setup-payment-workspace__flow" compact>
        <h3>2. Exemplo da operacao</h3>
        <div className="tcrm-setup-payment-workspace__flow-steps">
          {flow.map((item, index) => (
            <React.Fragment key={item.label}>
              <div><Chip>{index + 1}</Chip><Icon name={item.icon} size="28px" /><strong>{item.label}</strong></div>
              {index < flow.length - 1 ? <Icon name="arrowRight" /> : null}
            </React.Fragment>
          ))}
        </div>
        <p><Icon name="info" /> Funciona para Pix, dinheiro ou cartao. No inicio, a confirmacao e feita pela equipe dentro do Taliya.</p>
      </Panel>
      <Panel className="tcrm-setup-payment-workspace__future" compact>
        <InlineGroup justify="between"><div><h3>3. Pagamentos Taliya</h3><p>Depois que o studio estiver operando, voce podera automatizar cobrancas e confirmacoes sem refazer este setup.</p></div><Chip>Pos-go-live</Chip></InlineGroup>
        <div className="tcrm-setup-payment-workspace__future-grid">
          <IntegrationStatusRow description="Identifica pagamentos e baixa cobrancas" provider="pix" showDivider={false} state="connected" title="Pix automatico" />
          <IntegrationStatusRow description="Permite cobranca digital pelo Taliya" provider="card" showDivider={false} state="connected" title="Cartao online" />
          <IntegrationStatusRow description="Cobra mensalidades recorrentes" provider="recurrence" showDivider={false} state="connected" title="Recorrencia automatica" />
          <IntegrationStatusRow description="Ajuda a conferir pagamentos recebidos" provider="reconciliation" showDivider={false} state="connected" title="Conciliacao" />
        </div>
        <InlineGroup justify="between"><InlineAlert tone="info">Agora: registro e baixa manual no Taliya. Depois: automacao financeira em Pagamentos Taliya.</InlineAlert><Button onClick={onLearnMore} variant="secondary">Entender Pagamentos Taliya</Button></InlineGroup>
      </Panel>
      <ButtonGroup className="tcrm-setup-payment-workspace__actions">
        <Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button>
        <Button onClick={() => onAction?.("later")} variant="secondary">Configurar pagamento depois</Button>
        <Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button>
      </ButtonGroup>
    </SetupPagePanel>
  );
}

export type SetupStudentSource = "files" | "photo" | "paste" | "manual";

export interface SetupStudentsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  onSourceSelect?: (source: SetupStudentSource) => void;
  onStudentSelect?: (studentId: string) => void;
  onStudentAction?: (studentId: string, action: "edit" | "remove" | "view") => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupStudentsWorkspace({ onSourceSelect, onStudentSelect, onStudentAction, onAction, className, ...props }: SetupStudentsWorkspaceProps) {
  const sources: Array<{ id: SetupStudentSource; title: string; description: string; icon: IconName }> = [
    { id: "files", title: "Importar arquivos", description: "Planilhas ou exportacoes", icon: "fileDown" },
    { id: "photo", title: "Enviar foto/anotacao", description: "Caderno, ficha ou print", icon: "camera" },
    { id: "paste", title: "Colar lista", description: "Nomes e telefones", icon: "menu" },
    { id: "manual", title: "Adicionar manualmente", description: "Um aluno por vez", icon: "users" }
  ];
  const students = [
    { id: "ana", name: "Ana Martins", initials: "AM", phone: "(11) 98888-1111", plan: "Pacote 8 aulas", origin: "planilha", status: "Pronto", tone: "success" as ComponentTone },
    { id: "carla", name: "Carla Souza", initials: "CS", phone: "(11) 97777-2222", plan: "Pilates 2x por semana", origin: "manual", status: "Pronto", tone: "success" as ComponentTone },
    { id: "roberto", name: "Roberto Lima", initials: "RL", phone: "Falta telefone", plan: "Plano nao informado", origin: "foto", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "mariana", name: "Mariana Alves", initials: "MA", phone: "Possivel duplicidade", plan: "Pacote 8 aulas", origin: "lista", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "beatriz", name: "Beatriz Nunes", initials: "BN", phone: "(11) 96666-3333", plan: "Sem plano ainda", origin: "planilha", status: "Pode seguir", tone: "info" as ComponentTone }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-students-workspace", className)} data-component="SetupStudentsWorkspace" {...props}>
      <SetupBlockHeader description="Adicione os alunos ativos do studio. Voce pode misturar planilhas, fotos, listas e cadastros manuais." step={6} title="Alunos" totalSteps={9} />
      <div className="tcrm-setup-students-workspace__summary-grid">
        <Panel compact><h3>Adicionar alunos</h3><div className="tcrm-setup-students-workspace__sources">{sources.map((source) => <SetupImportSourceCard description={source.description} icon={source.icon} key={source.id} onSelect={() => onSourceSelect?.(source.id)} title={source.title} />)}</div></Panel>
        <Panel compact><h3>Fontes adicionadas</h3><List divided>
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="fileDown" tone="success" />} meta="42 alunos encontrados · 3 pendencias" title="alunos_maio.xlsx" />
          <ListItem action={<Chip tone="warning">Revisar</Chip>} leading={<Icon name="camera" tone="info" />} meta="8 alunos encontrados · aguardando revisao" title="foto_caderno_01.png" />
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="menu" tone="info" />} meta="5 alunos encontrados" title="lista colada" />
          <ListItem action={<Chip>Rascunho</Chip>} leading={<Icon name="users" />} meta="2 alunos adicionados" title="manual" />
        </List><p>Voce pode adicionar mais fontes antes de continuar.</p></Panel>
        <Panel compact><h3>Resumo da base</h3><List>
          <ListItem leading={<Icon name="clipboard" tone="info" />} title="57 alunos preparados" />
          <ListItem leading={<Icon name="checkCircle" tone="success" />} title="49 prontos" />
          <ListItem leading={<Icon name="alert" tone="warning" />} title="6 precisam revisao" />
          <ListItem leading={<Icon name="users" tone="info" />} title="2 possiveis duplicidades" />
        </List><p>Obrigatorio: nome + WhatsApp/telefone.</p></Panel>
      </div>
      <CrmWorklistTable
        actionColumnWidth="104px"
        ariaLabel="Alunos preparados"
        caption="Para publicar, cada aluno precisa ter nome e WhatsApp/telefone."
        columns={[
          { key: "name", header: "Aluno", render: (row) => <InlineGroup><Avatar name={row.name} size="xs" /><strong>{row.name}</strong></InlineGroup>, width: "18%" },
          { key: "phone", header: "WhatsApp", width: "20%" },
          { key: "plan", header: "Plano", width: "24%" },
          { key: "origin", header: "Origem", render: (row) => <Chip>{row.origin}</Chip>, width: "14%" },
          { key: "status", header: "Status", render: (row) => <Chip tone={row.tone}>{row.status}</Chip>, width: "14%" }
        ]}
        density="compact"
        heading={<InlineGroup><h3>Alunos preparados</h3><Chip tone="info">Todos entram como Ativo</Chip></InlineGroup>}
        onRowSelect={(row) => onStudentSelect?.(row.id)}
        rowActions={(row) => <InlineGroup compact><IconButton icon="edit" label={`Editar ${row.name}`} onClick={() => onStudentAction?.(row.id, "edit")} size="sm" variant="ghost" /><IconButton icon="trash" label={`Remover ${row.name}`} onClick={() => onStudentAction?.(row.id, "remove")} size="sm" variant="ghost" /><IconButton icon="eye" label={`Ver ${row.name}`} onClick={() => onStudentAction?.(row.id, "view")} size="sm" variant="ghost" /></InlineGroup>}
        rows={students}
      />
      <ButtonGroup className="tcrm-setup-students-workspace__actions"><Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button><Button onClick={() => onAction?.("later")} variant="secondary">Configurar alunos depois</Button><Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button></ButtonGroup>
    </SetupPagePanel>
  );
}

export type SetupClassSource = "files" | "photo" | "paste" | "manual" | "later";

export interface SetupClassesWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  onSourceSelect?: (source: SetupClassSource) => void;
  onClassSelect?: (classId: string) => void;
  onClassAction?: (classId: string, action: "edit" | "remove" | "view") => void;
  onAction?: (action: "save" | "later" | "continue") => void;
}

export function SetupClassesWorkspace({ onSourceSelect, onClassSelect, onClassAction, onAction, className, ...props }: SetupClassesWorkspaceProps) {
  const sources: Array<{ id: SetupClassSource; title: string; description: string; icon: IconName }> = [
    { id: "files", title: "Importar arquivos", description: "Planilhas ou exportacoes", icon: "fileDown" },
    { id: "photo", title: "Enviar foto/anotacao", description: "Caderno, grade ou print", icon: "camera" },
    { id: "paste", title: "Colar lista", description: "Dias e horarios", icon: "menu" },
    { id: "manual", title: "Criar manualmente", description: "Uma turma por vez", icon: "users" },
    { id: "later", title: "Nao tenho turmas prontas", description: "Montar a partir da agenda no proximo bloco", icon: "clock" }
  ];
  const classes = [
    { id: "ter-qui-18", name: "Ter/Qui 18h", days: "Ter, Qui", schedule: "18:00-19:00", capacity: "6 vagas", teacher: "Ana Martins", students: "5 alunos", status: "Pronto", tone: "success" as ComponentTone },
    { id: "seg-qua-07", name: "Seg/Qua 07h", days: "Seg, Qua", schedule: "07:00-08:00", capacity: "6 vagas", teacher: "Sem professor", students: "4 alunos", status: "Pode seguir", tone: "info" as ComponentTone },
    { id: "sexta-09", name: "Sexta 09h", days: "Sex", schedule: "09:30-10:00", capacity: "Falta capacidade", teacher: "Carla Souza", students: "2 alunos", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "ter-qui-19", name: "Ter/Qui 19h", days: "Ter, Qui", schedule: "19:00-20:00", capacity: "6 vagas", teacher: "Ana Martins", students: "Aluno nao encontrado", status: "Revisar", tone: "warning" as ComponentTone },
    { id: "sabado-08", name: "Sabado 08h", days: "Sab", schedule: "08:00-09:00", capacity: "4 vagas", teacher: "Sem professor", students: "0 alunos", status: "Pode seguir", tone: "info" as ComponentTone }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-classes-workspace", className)} data-component="SetupClassesWorkspace" {...props}>
      <SetupBlockHeader description="Organize horarios fixos recorrentes, capacidade e vinculos simples com alunos." step={7} title="Turmas" totalSteps={9} />
      <div className="tcrm-setup-classes-workspace__summary-grid">
        <Panel compact><h3>Adicionar turmas</h3><div className="tcrm-setup-classes-workspace__sources">{sources.map((source) => <SetupImportSourceCard description={source.description} icon={source.icon} key={source.id} onSelect={() => onSourceSelect?.(source.id)} title={source.title} />)}</div></Panel>
        <Panel compact><h3>Fontes adicionadas</h3><List divided>
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="fileDown" tone="success" />} meta="8 turmas encontradas · 2 pendencias" title="grade_turmas.xlsx" />
          <ListItem action={<Chip tone="warning">Revisar</Chip>} leading={<Icon name="camera" tone="info" />} meta="3 turmas encontradas" title="foto_grade_horarios.png" />
          <ListItem action={<Chip tone="success">Processado</Chip>} leading={<Icon name="menu" tone="info" />} meta="3 turmas encontradas" title="lista colada" />
        </List><p>Voce pode adicionar mais fontes antes de continuar.</p></Panel>
        <Panel compact><h3>Resumo das turmas</h3><List>
          <ListItem leading={<Icon name="users" tone="info" />} title="10 turmas preparadas" />
          <ListItem leading={<Icon name="checkCircle" tone="success" />} title="8 prontas" />
          <ListItem leading={<Icon name="alert" tone="warning" />} title="2 precisam revisao" />
          <ListItem leading={<Icon name="users" tone="info" />} title="34 alunos vinculados" />
        </List><p>A agenda sera montada no proximo bloco.</p></Panel>
      </div>
      <CrmWorklistTable
        actionColumnWidth="104px"
        ariaLabel="Turmas preparadas"
        caption="Para publicar uma turma, informe dias, horario e capacidade."
        columns={[
          { key: "name", header: "Turma", width: "14%" }, { key: "days", header: "Dias", width: "12%" }, { key: "schedule", header: "Horario", width: "14%" },
          { key: "capacity", header: "Capacidade", width: "14%" }, { key: "teacher", header: "Professor", width: "16%" }, { key: "students", header: "Alunos", width: "16%" },
          { key: "status", header: "Status", render: (row) => <Chip tone={row.tone}>{row.status}</Chip>, width: "14%" }
        ]}
        density="compact"
        heading={<InlineGroup><h3>Turmas preparadas</h3><Chip tone="info">Agenda sera montada depois</Chip></InlineGroup>}
        onRowSelect={(row) => onClassSelect?.(row.id)}
        rowActions={(row) => <InlineGroup compact><IconButton icon="edit" label={`Editar ${row.name}`} onClick={() => onClassAction?.(row.id, "edit")} size="sm" variant="ghost" /><IconButton icon="trash" label={`Remover ${row.name}`} onClick={() => onClassAction?.(row.id, "remove")} size="sm" variant="ghost" /><IconButton icon="eye" label={`Ver ${row.name}`} onClick={() => onClassAction?.(row.id, "view")} size="sm" variant="ghost" /></InlineGroup>}
        rows={classes}
      />
      <ButtonGroup className="tcrm-setup-classes-workspace__actions"><Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button><Button onClick={() => onAction?.("later")} variant="secondary">Configurar turmas depois</Button><Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button></ButtonGroup>
    </SetupPagePanel>
  );
}

export interface SetupAgendaWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  selectedClassId?: string;
  onClassSelect?: (classId: string) => void;
  onSlotSelect?: (slot: WeeklyHoursGridSlot) => void;
  onBackToClasses?: () => void;
  onAction?: (action: "save" | "continue") => void;
}

export function SetupAgendaWorkspace({ selectedClassId = "ter-qui-18", onClassSelect, onSlotSelect, onBackToClasses, onAction, className, ...props }: SetupAgendaWorkspaceProps) {
  const classControls = [
    { id: "ter-qui-18", title: "Ter/Qui 18h", meta: "2 aulas geradas · Ter e Qui", detail: "5 alunos · Pronto", tone: "info" as ComponentTone },
    { id: "seg-qua-07", title: "Seg/Qua 07h", meta: "2 aulas geradas · Seg e Qua", detail: "4 alunos · Pronto", tone: "success" as ComponentTone },
    { id: "sexta-09", title: "Sexta 09h", meta: "1 aula gerada · Sex", detail: "Falta capacidade · Revisar", tone: "warning" as ComponentTone },
    { id: "sabado-08", title: "Sabado 08h", meta: "1 aula gerada · Sab", detail: "Fora da janela · Aviso", tone: "warning" as ComponentTone },
    { id: "ter-qui-19", title: "Ter/Qui 19h", meta: "2 aulas geradas · Ter e Qui", detail: "Aluno pendente · Revisar", tone: "warning" as ComponentTone }
  ];
  const slots: WeeklyHoursGridSlot[] = [
    { id: "Seg-07", day: "Seg", start: "07:00", end: "08:00", label: "Seg/Qua 07h", meta: "4 alunos", tone: "success" },
    { id: "Qua-07", day: "Qua", start: "07:00", end: "08:00", label: "Seg/Qua 07h", meta: "4 alunos", tone: "success" },
    { id: "Sab-08", day: "Sab", start: "08:00", end: "09:00", label: "Sabado 08h", meta: "Fora da janela", tone: "warning" },
    { id: "Sex-09", day: "Sex", start: "09:00", end: "10:00", label: "Sexta 09h", meta: "Revisar capacidade", tone: "warning" },
    { id: "Ter-18", day: "Ter", start: "18:00", end: "19:00", label: "Ter/Qui 18h", meta: "5 alunos", tone: "info" },
    { id: "Qui-18", day: "Qui", start: "18:00", end: "19:00", label: "Ter/Qui 18h", meta: "5 alunos", tone: "info" },
    { id: "Ter-19", day: "Ter", start: "19:00", end: "20:00", label: "Ter/Qui 19h", meta: "Aluno pendente", tone: "warning" },
    { id: "Qui-19", day: "Qui", start: "19:00", end: "20:00", label: "Ter/Qui 19h", meta: "Aluno pendente", tone: "warning" }
  ];

  return (
    <SetupPagePanel className={cn("tcrm-setup-agenda-workspace", className)} data-component="SetupAgendaWorkspace" {...props}>
      <SetupBlockHeader description="Revise a semana base gerada a partir das turmas antes de publicar." step={8} title="Agenda" totalSteps={9} />
      <div className="tcrm-setup-agenda-workspace__summary">
        <Panel compact><Icon name="calendar" tone="success" /><h3>Agenda gerada</h3><strong>24 aulas semanais</strong><span>10 turmas usadas</span><p>Criada a partir das turmas preparadas.</p></Panel>
        <Panel compact><Icon name="barChart" tone="success" /><h3>Cobertura</h3><strong>6 dias com aulas</strong><span>4 horarios principais</span><p>Dentro da janela de funcionamento.</p></Panel>
        <Panel compact><Icon name="alert" tone="warning" /><h3>Revisao</h3><strong>7 turmas prontas</strong><span>3 precisam atencao</span><p>Pendencias aparecem na semana e no controle.</p></Panel>
      </div>
      <div className="tcrm-setup-agenda-workspace__body">
        <Panel className="tcrm-setup-agenda-workspace__control" compact><h3>Controle da semana</h3><p>Veja como cada turma apareceu na agenda.</p><InlineGroup><Chip tone="info">Todas</Chip><Chip tone="warning">Revisar</Chip><Chip tone="warning">Avisos</Chip></InlineGroup><List>
          {classControls.map((item) => <ListItem action={<Icon name="chevronRight" />} key={item.id} meta={<><span>{item.meta}</span><small>{item.detail}</small></>} onClick={() => onClassSelect?.(item.id)} selected={selectedClassId === item.id} title={item.title} warning={item.tone === "warning"} />)}
        </List></Panel>
        <Panel className="tcrm-setup-agenda-workspace__calendar" compact><InlineGroup><h3>Agenda semanal completa</h3><Chip tone="info">Previa antes da publicacao</Chip></InlineGroup><WeeklyHoursGrid axis={["07h", "08h", "09h", "12h", "18h", "19h"]} days={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]} onSlotClick={onSlotSelect} slots={slots} variant="schedule" /><InlineGroup className="tcrm-setup-agenda-workspace__legend"><span><StatusDot status="success" />Pronto</span><span><StatusDot status="info" />Selecionado</span><span><StatusDot status="warning" />Revisar</span><span><StatusDot status="paused" />Aviso</span></InlineGroup></Panel>
      </div>
      <ButtonGroup className="tcrm-setup-agenda-workspace__actions"><Button leadingIcon="check" onClick={() => onAction?.("save")} variant="secondary">Salvar rascunho</Button><Button leadingIcon="arrowLeft" onClick={onBackToClasses} variant="secondary">Voltar para turmas</Button><Button onClick={() => onAction?.("continue")} trailingIcon="arrowRight" variant="primary">Continuar</Button></ButtonGroup>
    </SetupPagePanel>
  );
}

export interface SetupContentGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: React.ComponentProps<typeof DashboardGrid>["columns"];
  density?: React.ComponentProps<typeof DashboardGrid>["density"];
}

export function SetupContentGrid({
  children,
  className,
  columns = 3,
  density = "default",
  ...props
}: SetupContentGridProps) {
  return (
    <DashboardGrid
      className={cn("tcrm-setup-content-grid", className)}
      columns={columns}
      data-component="SetupContentGrid"
      density={density}
      {...props}
    >
      {children}
    </DashboardGrid>
  );
}

export interface SetupPageProps extends Omit<SetupShellProps, "step"> {
  step: number;
  frameVariant?: "default" | "guided" | "guided-block" | "guided-main" | "guided-wide" | "guided-review" | "shell-global";
}

export function SetupPage({ step, className, children, frameVariant = "default", layout = "guided", progress, ...props }: SetupPageProps) {
  return (
    <div className={cn("tcrm-setup-page", `tcrm-setup-page--${layout}`, `tcrm-setup-page--frame-${frameVariant}`)}>
      <SetupShell
        className={cn("tcrm-setup-page__shell", className)}
        layout={layout}
        progress={progress ?? Math.min(96, step * 11)}
        step={step}
        {...props}
      >
        {children}
      </SetupShell>
    </div>
  );
}

export function SetupPagePanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("tcrm-setup-page-panel", className)} {...props} />;
}

export function SetupWelcomeMain({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("tcrm-setup-welcome-main", className)} {...props} />;
}

export interface SetupWelcomeWorkspaceProps extends SetupWelcomeProps {}

export function SetupWelcomeWorkspace(props: SetupWelcomeWorkspaceProps) {
  return (
    <SetupWelcomeMain className="tcrm-setup-welcome-workspace" data-component="SetupWelcomeWorkspace">
      <SetupWelcome {...props} />
    </SetupWelcomeMain>
  );
}

export type SetupImportSourceCardState = "pending" | "selected" | "imported" | "error";

export interface SetupImportSourceCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  state?: SetupImportSourceCardState;
  selected?: boolean;
  icon?: IconName;
  onSelect?: () => void;
}

const setupImportSourceStatusIconByState: Record<Exclude<SetupImportSourceCardState, "pending">, IconName> = {
  selected: "check",
  imported: "check",
  error: "alert"
};

export function SetupImportSourceCard({
  title = "Importar arquivos",
  description = "Planilhas ou exportações",
  state = "pending",
  selected = false,
  disabled = false,
  icon = "fileDown",
  onSelect,
  className,
  type = "button",
  ...props
}: SetupImportSourceCardProps) {
  const resolvedState = selected ? "selected" : state;
  const isDisabled = disabled;
  const statusIcon = resolvedState === "pending" ? null : setupImportSourceStatusIconByState[resolvedState];

  return (
    <button
      aria-pressed={resolvedState === "selected"}
      className={cn("tcrm-setup-import-source-card", className)}
      data-component="SetupImportSourceCard"
      data-state={isDisabled ? "disabled" : resolvedState}
      disabled={isDisabled}
      onClick={onSelect}
      type={type}
      {...props}
    >
      <span className="tcrm-setup-import-source-card__icon" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <span className="tcrm-setup-import-source-card__body">
        <span className="tcrm-setup-import-source-card__title">{title}</span>
        <span className="tcrm-setup-import-source-card__description">{description}</span>
      </span>
      {statusIcon ? (
        <span className="tcrm-setup-import-source-card__status" aria-hidden="true">
          <Icon name={statusIcon} />
        </span>
      ) : null}
    </button>
  );
}

export type SetupReviewPanelState = "ready" | "pending" | "blocked" | "published";

export interface SetupReviewPanelProps extends Omit<CrmSurfaceProps, "state" | "children" | "title" | "description" | "meta" | "statusLabel" | "icon" | "action" | "selected"> {
  state?: SetupReviewPanelState;
  headingLevel?: 1 | 2;
  confirmed?: boolean;
  onBack?: () => void;
  onSaveDraft?: () => void;
  onPublish?: () => void;
  onResolveBlocking?: () => void;
  onReviewWarnings?: () => void;
  onOpenArea?: (area: string) => void;
  onConfirmChange?: (confirmed: boolean) => void;
}

const setupReviewPublishAreas: Array<{
  id: string;
  title: string;
  description: string;
  icon: IconName;
  status: "ready" | "review";
}> = [
  { id: "studio", title: "Studio", description: "Nome e horários gerais", icon: "home", status: "ready" },
  { id: "equipe", title: "Equipe", description: "Dono confirmado e convites preparados", icon: "user", status: "ready" },
  { id: "canais", title: "Canais", description: "WhatsApp Business, e-mail e canais públicos", icon: "message", status: "ready" },
  { id: "planos", title: "Planos", description: "Planos principais e reposição simples", icon: "tag", status: "ready" },
  { id: "pagamento", title: "Pagamento", description: "Pix, dinheiro e cartão para baixa manual", icon: "creditCard", status: "ready" },
  { id: "alunos", title: "Alunos", description: "57 alunos preparados", icon: "graduation", status: "review" },
  { id: "turmas", title: "Turmas", description: "10 turmas recorrentes", icon: "users", status: "ready" },
  { id: "agenda", title: "Agenda", description: "Semana base gerada", icon: "calendar", status: "review" }
];

const setupReviewFutureItems: Array<{ title: string; description: string; icon: IconName }> = [
  { title: "Pagamentos Taliya", description: "Pix automático, cartão online e recorrência automática", icon: "coins" },
  { title: "Fluxos de agentes", description: "Modos manual, copiloto e autônomo", icon: "slidersRound" },
  { title: "Automações avançadas", description: "Mensagens, aprovações e regras por fluxo", icon: "settings" },
  { title: "Control planes", description: "Cotas, logs, auditoria, incidentes e risco", icon: "shield" }
];

export function SetupReviewPanel({
  state = "ready",
  headingLevel = 2,
  confirmed = true,
  onBack,
  onSaveDraft,
  onPublish,
  onResolveBlocking,
  onReviewWarnings,
  onOpenArea,
  onConfirmChange,
  className,
  ...props
}: SetupReviewPanelProps) {
  const isBlocked = state === "blocked";
  const isPublished = state === "published";
  const isBusy = state === "pending";
  const Heading = `h${headingLevel}` as "h1" | "h2";

  return (
    <section
      aria-busy={isBusy || undefined}
      className={cn("tcrm-setup-review-panel", className)}
      data-component="SetupReviewPanel"
      data-state={state}
      {...props}
    >
      <header className="tcrm-setup-review-panel__header">
        <Heading>Revisão</Heading>
        <Chip showDot={false}>Bloco 9 de 9</Chip>
      </header>

      <section className="tcrm-setup-review-panel__section tcrm-setup-review-panel__section--published">
        <h3>1. Publicado agora</h3>
        <p>Estas áreas entram em operação quando o setup inicial for publicado.</p>
        <div className="tcrm-setup-review-panel__publish-grid">
          {setupReviewPublishAreas.map((area) => (
            <button
              className="tcrm-setup-review-card"
              key={area.id}
              onClick={() => onOpenArea?.(area.id)}
              type="button"
            >
              <Icon name={area.icon} />
              <span className="tcrm-setup-review-card__copy">
                <strong>{area.title}</strong>
                <small>{area.description}</small>
              </span>
              <Icon className="tcrm-setup-review-card__chevron" name="chevronRight" />
              <span className={cn("tcrm-setup-review-card__status", `tcrm-setup-review-card__status--${area.status}`)}>
                {area.status === "ready" ? "Pronto" : "Revisar"}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="tcrm-setup-review-panel__section tcrm-setup-review-panel__section--pending">
        <h3>2. Pendências</h3>
        <p>Revise o que bloqueia publicação e o que pode seguir com aviso.</p>
        <div className="tcrm-setup-review-panel__pending-grid">
          <article className="tcrm-setup-review-alert tcrm-setup-review-alert--blocking">
            <Icon name="alertCircle" />
            <div>
              <strong>Bloqueia publicação</strong>
              <ul>
                <li>1 aluno sem nome ou contato</li>
              </ul>
            </div>
            <Button disabled={isBusy} onClick={onResolveBlocking} size="sm" tone="danger" variant="secondary">Resolver</Button>
          </article>
          <article className="tcrm-setup-review-alert tcrm-setup-review-alert--warning">
            <Icon name="alert" />
            <div>
              <strong>Pode publicar com aviso</strong>
              <ul>
                <li>2 alunos sem plano</li>
                <li>1 turma sem professor</li>
                <li>WhatsApp ainda não conectado oficialmente</li>
              </ul>
            </div>
            <Button disabled={isBusy} onClick={onReviewWarnings} size="sm" variant="secondary">Revisar avisos</Button>
          </article>
        </div>
      </section>

      <section className="tcrm-setup-review-panel__section tcrm-setup-review-panel__section--future">
        <h3>3. Depois do go-live</h3>
        <p>Essas configurações avançadas ficam para depois, nas Configurações do CRM.</p>
        <div className="tcrm-setup-review-panel__future-grid">
          {setupReviewFutureItems.map((item) => (
            <article className="tcrm-setup-review-future-card" key={item.title}>
              <Icon name={item.icon} />
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
            </article>
          ))}
        </div>
        <p className="tcrm-setup-review-panel__info"><Icon name="info" /> Esses itens não bloqueiam a publicação do setup inicial.</p>
      </section>

      <section className="tcrm-setup-review-panel__section tcrm-setup-review-panel__section--safe">
        <h3>4. Publicação segura</h3>
        <p>Nada será publicado sem sua confirmação.</p>
        <div className="tcrm-setup-review-panel__safe-row">
          <span><Icon name="checkCircle" /> Dados principais revisados</span>
          <span><Icon name="checkCircle" /> Pendências críticas verificadas</span>
          <span><Icon name="checkCircle" /> Convites da equipe serão enviados ao publicar</span>
          <span><Icon name="checkCircle" /> Ajustes avançados ficam para depois do go-live</span>
        </div>
        <Checkbox
          checked={confirmed}
          className="tcrm-setup-review-panel__confirm"
          disabled={isBusy || isBlocked || isPublished}
          label="Revisei as informações e entendo o que será publicado agora."
          onChange={(event) => onConfirmChange?.(event.currentTarget.checked)}
        />
      </section>

      <footer className="tcrm-setup-review-panel__footer">
        <Button disabled={isBusy} leadingIcon="arrowLeft" onClick={onBack} variant="secondary">Voltar para agenda</Button>
        <Button disabled={isBusy} leadingIcon="fileText" onClick={onSaveDraft} variant="secondary">Salvar rascunho</Button>
        <Button
          disabled={isBlocked || !confirmed || isPublished}
          leadingIcon="rocket"
          loading={isBusy}
          onClick={onPublish}
          variant="primary"
        >
          {isPublished ? "Setup publicado" : "Publicar setup inicial"}
        </Button>
      </footer>
    </section>
  );
}

export interface SetupReviewWorkspaceProps extends SetupReviewPanelProps {}

export function SetupReviewWorkspace({ className, ...props }: SetupReviewWorkspaceProps) {
  return (
    <SetupPagePanel className="tcrm-setup-review-workspace" data-component="SetupReviewWorkspace">
      <SetupReviewPanel className={className} {...props} headingLevel={1} />
    </SetupPagePanel>
  );
}

export type SetupAgentChatState = "guide" | "human-help" | "blocked";

export interface SetupAgentChatProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSubmit"> {
  state?: SetupAgentChatState;
  variant?: "step" | "welcome";
  context?: SetupAgentContext;
  defaultValue?: string;
  onClose?: () => void;
  onMenu?: () => void;
  onQuickReply?: (itemId: string, item: QuickReplyChipItem) => void;
  onSend?: (value: string) => void;
  onHumanHelp?: () => void;
}

export function SetupAgentChat({
  state = "guide",
  variant = "step",
  context,
  defaultValue = "",
  onClose,
  onMenu,
  onQuickReply,
  onSend,
  onHumanHelp,
  className,
  ...props
}: SetupAgentChatProps) {
  const [value, setValue] = React.useState(defaultValue);
  const isBlocked = state === "blocked";
  const isHumanHelp = state === "human-help";
  const isWelcome = variant === "welcome";
  const activeContext = context ?? setupAgentContexts.shellBase;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isBlocked) return;
    onSend?.(value);
  };

  return (
    <section
      aria-label="Agente de configuração"
      className={cn("tcrm-setup-agent-chat", `tcrm-setup-agent-chat--${state}`, `tcrm-setup-agent-chat--${variant}`, className)}
      data-component="SetupAgentChat"
      data-state={state}
      data-variant={variant}
      {...props}
    >
      <header className="tcrm-setup-agent-chat__header">
        <span className="tcrm-setup-agent-chat__mark">
          <TaliyaLogo label="Taliya" variant="mark" />
        </span>
        <span className="tcrm-setup-agent-chat__identity">
          <h2>Agente de configuração</h2>
          <p>Guiando setup <span aria-hidden="true" /></p>
        </span>
        <IconButton className="tcrm-setup-agent-chat__menu" disabled={isBlocked || !onMenu} icon="moreVertical" label="Mais opções do agente" onClick={onMenu} size="sm" variant="ghost" />
        <IconButton className="tcrm-setup-agent-chat__close" disabled={isBlocked || !onClose} icon="x" label="Fechar agente" onClick={onClose} size="sm" variant="ghost" />
      </header>

      <div className="tcrm-setup-agent-chat__rule" />

      {isWelcome ? (
        <MessageBubble className="tcrm-setup-agent-chat__message tcrm-setup-agent-chat__message--welcome" variant="inbound">
          <p>Oi, eu vou te guiar nessa configuração.</p>
          <p>Primeiro vamos identificar seu studio. Depois seguimos juntos pelos dados principais, equipe, canais, planos, alunos, turmas e agenda.</p>
        </MessageBubble>
      ) : (
        <>
          <section className="tcrm-setup-agent-chat__info" aria-label="Impacto desta etapa">
            <Icon name="info" />
            <p>{activeContext.impact}</p>
          </section>

          {activeContext.messages.map((message, index) => (
            <MessageBubble className={cn("tcrm-setup-agent-chat__message", `tcrm-setup-agent-chat__message--${index === 0 ? "one" : index === 1 ? "two" : "extra"}`)} key={message} variant="inbound">
              {message}
            </MessageBubble>
          ))}
        </>
      )}

      {isWelcome ? <p className="tcrm-setup-agent-chat__quick-title">Perguntas rápidas</p> : null}

      <QuickReplyChips
        className="tcrm-setup-agent-chat__quick-replies"
        items={isWelcome ? [
          { id: "configurar", label: "O que vou configurar?", disabled: isBlocked || !onQuickReply },
          { id: "ajuda", label: "Posso pedir ajuda humana?", selected: isHumanHelp, disabled: isBlocked || !onQuickReply },
          { id: "liberacao", label: "Quando o CRM será liberado?", disabled: isBlocked || !onQuickReply }
        ] : activeContext.quickReplies.map((item) => ({ ...item, selected: isHumanHelp && item.id === "later", disabled: isBlocked || !onQuickReply }))}
        onSelect={onQuickReply}
      />

      {!isWelcome ? (
        <form className="tcrm-setup-agent-chat__composer" onSubmit={submit}>
          <Input
            aria-label="Perguntar sobre esta etapa"
            className="tcrm-setup-agent-chat__composer-input"
            disabled={isBlocked}
            fieldSize="sm"
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder={activeContext.composerPlaceholder ?? "Pergunte sobre esta etapa..."}
            value={value}
          />
          <IconButton aria-label="Enviar pergunta" className="tcrm-setup-agent-chat__send" disabled={isBlocked || !onSend} icon="send" label="Enviar pergunta" size="sm" type="submit" variant="selected" />
        </form>
      ) : null}

      <footer className="tcrm-setup-agent-chat__footer">
        {!isWelcome ? <span>Precisa de ajuda humana?</span> : null}
        <Button className="tcrm-setup-agent-chat__help-action" disabled={isBlocked || !onHumanHelp} onClick={onHumanHelp} size="sm" type="button" variant="ghost">Agendar ajuda</Button>
      </footer>
    </section>
  );
}

export type SetupHumanHelpCTAState = "schedule" | "active" | "unavailable";

export interface SetupHumanHelpCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: SetupHumanHelpCTAState;
  label?: string;
  onSchedule?: () => void;
}

export function SetupHumanHelpCTA({
  state = "schedule",
  label,
  onSchedule,
  className,
  ...props
}: SetupHumanHelpCTAProps) {
  const isUnavailable = state === "unavailable";
  const text = label ?? (state === "active" ? "Ajuda agendada" : state === "unavailable" ? "Ajuda indisponível" : "Agendar ajuda");

  return (
    <div
      className={cn("tcrm-setup-human-help-cta", className)}
      data-component="SetupHumanHelpCTA"
      data-state={state}
      {...props}
    >
      <Button disabled={isUnavailable} onClick={onSchedule} variant="ghost">{text}</Button>
    </div>
  );
}

