/** Setup and studio settings presentation compositions. */
import React from "react";
import {
  Button,
  Checkbox,
  Chip,
  Icon,
  PrimitiveButton,
  cn
} from "@taliya/ui";
import type { IconName } from "@taliya/ui";
import type {
  CrmSurfaceProps
} from "../../patterns/shell.js";


import { SetupShell } from "./setup-shell.js";
import type { SetupShellProps } from "./setup-shell.js";
import { SetupWelcome } from "./setup-welcome-workspaces.js";
import type { SetupWelcomeProps } from "./setup-welcome-workspaces.js";
import { SetupPagePanel } from "./setup-workspace-utilities.js";
export { SetupContentGrid, SetupPagePanel } from "./setup-workspace-utilities.js";
export type { SetupContentGridProps } from "./setup-workspace-utilities.js";
export {
  SetupBlockHeader,
  SetupBottomBar,
  SetupShell,
  SetupStepper,
  setupAgentContexts,
  setupShellSourceSteps
} from "./setup-shell.js";
export type {
  SetupAgentContext,
  SetupAgentContextId,
  SetupAgentQuickReply,
  SetupShellProps
} from "./setup-shell.js";
export {
  SetupChoiceCard,
  SetupConsumptionWorkspace,
  SetupStudioWorkspace,
  SetupWelcome
} from "./setup-welcome-workspaces.js";
export type {
  SetupChoiceCardProps,
  SetupChoiceCardState,
  SetupConsumptionModel,
  SetupConsumptionWorkspaceProps,
  SetupStudioWorkspaceProps,
  SetupWelcomeProps,
  SetupWelcomeState
} from "./setup-welcome-workspaces.js";
export {
  SetupChannelsWorkspace,
  SetupTeamWorkspace
} from "./setup-team-channels.js";
export type {
  SetupChannelsWorkspaceProps,
  SetupTeamWorkspaceProps,
  SetupWhatsAppState
} from "./setup-team-channels.js";
export {
  SetupPaymentWorkspace,
  SetupPlansWorkspace,
  setupPlansDefaultFieldValues
} from "./setup-plans-payment.js";
export type {
  SetupPaymentMethod,
  SetupPlanField,
  SetupPlanId,
  SetupPaymentWorkspaceProps,
  SetupPlansWorkspaceProps
} from "./setup-plans-payment.js";
export {
  SetupAgendaWorkspace,
  SetupClassesWorkspace,
  SetupStudentsWorkspace
} from "./setup-data-workspaces.js";
export type {
  SetupAgendaWorkspaceProps,
  SetupClassSource,
  SetupClassesWorkspaceProps,
  SetupStudentSource,
  SetupStudentsWorkspaceProps
} from "./setup-data-workspaces.js";
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

export function SetupWelcomeMain({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("tcrm-setup-welcome-main", className)} {...props} />;
}

export type SetupWelcomeWorkspaceProps = SetupWelcomeProps;

export function SetupWelcomeWorkspace(props: SetupWelcomeWorkspaceProps) {
  return (
    <SetupWelcomeMain className="tcrm-setup-welcome-workspace" data-component="SetupWelcomeWorkspace">
      <SetupWelcome {...props} />
    </SetupWelcomeMain>
  );
}

export { SetupImportSourceCard } from "./setup-import-source-card.js";
export type {
  SetupImportSourceCardProps,
  SetupImportSourceCardState
} from "./setup-import-source-card.js";

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
            <PrimitiveButton
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
            </PrimitiveButton>
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

export type SetupReviewWorkspaceProps = SetupReviewPanelProps;

export function SetupReviewWorkspace({ className, ...props }: SetupReviewWorkspaceProps) {
  return (
    <SetupPagePanel className="tcrm-setup-review-workspace" data-component="SetupReviewWorkspace">
      <SetupReviewPanel className={className} {...props} headingLevel={1} />
    </SetupPagePanel>
  );
}

export {
  SetupAgentChat,
  SetupHumanHelpCTA
} from "./setup-agent-experience.js";
export type {
  SetupAgentChatProps,
  SetupAgentChatState,
  SetupHumanHelpCTAProps,
  SetupHumanHelpCTAState
} from "./setup-agent-experience.js";

