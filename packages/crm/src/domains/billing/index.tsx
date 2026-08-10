/** Billing, subscription, usage and governance presentation compositions. */
import React from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Chip,
  ConfirmDialog,
  DataTable,
  DiffTable,
  EmptyState,
  ErrorState,
  FilterBar,
  Icon,
  IconButton,
  InlineAlert,
  InlineGroup,
  Input,
  List,
  ListIcon,
  ListItem,
  LoadingState,
  Modal,
  Panel,
  PasswordInput,
  ProgressBar,
  Select,
  SocialAuthButton,
  StatusSummaryCard,
  Stepper,
  TaliyaLogo,
  Toggle,
  cn
} from "@taliya/ui";
import type {
  ButtonVariant,
  ComponentTone,
  DiffTableRow,
  IconName,
  SelectOption,
  StepperStep
} from "@taliya/ui";
import type {
  CrmSurfaceProps
} from "../../patterns/shell.js";
import {
  CrmBrowserChrome,
  ProductWindowFrame,
  QuotaBadge,
  crmAccessShellBrowserToolbarItems
} from "../../patterns/shell.js";
import {
  StudentSummary
} from "../students/index.js";
import {
  PaymentMethodRow,
  SecurePaymentNotice,
  UsageOriginRow
} from "../../patterns/index.js";
import type {
  RosterStudent
} from "../../domains/agenda/index.js";
import type {
  UsageOriginRowOrigin,
  UsageOriginRowState,
  PaymentMethodRowMethod
} from "../../patterns/index.js";
import type {
  SetupStudioWorkspaceProps,
  SetupChannelsWorkspaceProps,
  SetupPlansWorkspaceProps
} from "../settings/index.js";
import {
  Roster
} from "../agenda/index.js";
import {
  SetupStudioWorkspace,
  SetupChannelsWorkspace,
  SetupPlansWorkspace,
  SetupBlockHeader,
  SetupPagePanel
} from "../settings/index.js";

function stateKey(state?: React.ReactNode): string {
  return String(state ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toneForState(state?: string): ComponentTone {
  const normalizedState = stateKey(state);
  if (["ok", "ready", "active", "confirmed", "paid", "success", "online", "complete", "accepted", "matched", "resolved"].includes(normalizedState)) return "success";
  if (["warning", "attention", "review", "pending", "verifying", "saving", "running", "today", "promise", "promised", "ambiguous", "reconciliation"].includes(normalizedState)) return "warning";
  if (["draft", "mapped", "request-access", "candidate", "assigned", "answered", "access-active", "scheduled", "due", "validation"].includes(normalizedState)) return "info";
  if (["danger", "failed", "blocked", "error", "expired", "severe", "overdue", "dispute"].includes(normalizedState)) return "danger";
  if (["paused", "disabled", "read-only"].includes(normalizedState)) return "paused";
  return "neutral";
}
export function AccessShell({
  children,
  footer,
  context,
  summary,
  help,
  layout = "split",
  onHelp,
  onAccount,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  footer?: React.ReactNode;
  context?: React.ReactNode;
  summary?: React.ReactNode;
  help?: React.ReactNode;
  layout?: "split" | "centered";
  onHelp?: () => void;
  onAccount?: () => void;
}) {
  return (
    <ProductWindowFrame
      bodyClassName="tcrm-access-shell-window__body"
      className={cn("tcrm-access-shell-window", className)}
      chrome={<CrmBrowserChrome className="tcrm-access-shell__browser-chrome" toolbarItems={crmAccessShellBrowserToolbarItems} />}
      {...props}
    >
      <div className={cn("tcrm-access-shell", `tcrm-access-shell--${layout}`)} data-component="AccessShell" data-layout={layout}>
        <header className="tcrm-access-shell__brandbar">
        <TaliyaLogo />
          <span className="tcrm-access-shell__actions">
            <IconButton icon="help" label="Ajuda" onClick={onHelp} />
            <IconButton icon="user" label="Conta" onClick={onAccount} />
          </span>
        </header>
        <main className="tcrm-access-shell__main">
          <section aria-label="Conteudo principal de acesso" className="tcrm-access-shell__content">
            <div className="tcrm-access-shell__content-frame">{children}</div>
          </section>
          {layout === "split" ? (
            <aside aria-label="Contexto de acesso" className="tcrm-access-shell__rail">
              <section className="tcrm-access-shell__rail-card">
                <h3>Contexto</h3>
                <div className="tcrm-access-shell__rail-content">{context}</div>
              </section>
              <section className="tcrm-access-shell__rail-card">
                <h3>Resumo</h3>
                <div className="tcrm-access-shell__rail-content">{summary}</div>
              </section>
              <section className="tcrm-access-shell__rail-card">
                <h3>Ajuda</h3>
                <div className="tcrm-access-shell__rail-content">{help}</div>
              </section>
            </aside>
          ) : null}
        </main>
        {footer ?? <AccessFooterLinks variant="shell" />}
      </div>
    </ProductWindowFrame>
  );
}

export function AuthCard({
  mode = "signup",
  loading = false,
  error,
  onSubmit,
  onGoogle,
  onMicrosoft,
  onForgotPassword,
  onSwitchMode,
  onTerms,
  onPrivacy,
  className
}: {
  mode?: "signup" | "signin";
  loading?: boolean;
  error?: React.ReactNode;
  onSubmit?: () => void;
  onGoogle?: () => void;
  onMicrosoft?: () => void;
  onForgotPassword?: () => void;
  onSwitchMode?: () => void;
  onTerms?: () => void;
  onPrivacy?: () => void;
  className?: string;
}) {
  const isSignup = mode === "signup";

  return (
    <section className={cn("tcrm-auth-card", className)} data-component="AuthCard" data-mode={mode}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.();
        }}
      >
        <header className="tcrm-auth-card__header">
          <h1>{isSignup ? "Crie sua conta Taliya" : "Entrar na Taliya"}</h1>
          <p>{isSignup ? "Continue com sua conta de trabalho ou receba um link por e-mail." : "Acesse sua conta para continuar."}</p>
        </header>
        <div className="tcrm-auth-card__providers">
          <SocialAuthButton disabled={loading} onClick={onGoogle} provider="Google" type="button">Continuar com Google</SocialAuthButton>
          <SocialAuthButton disabled={loading} onClick={onMicrosoft} provider="Microsoft" type="button">Continuar com Microsoft</SocialAuthButton>
        </div>
        <div className="tcrm-auth-card__divider"><span>ou</span></div>
        <div className="tcrm-auth-card__fields">
          {isSignup ? (
            <Input label="E-mail profissional" placeholder="nome@empresa.com" type="email" />
          ) : (
            <>
              <Input leadingIcon="mail" placeholder="E-mail" type="email" />
              <PasswordInput leadingIcon="lock" placeholder="Senha" />
            </>
          )}
        </div>
        {!isSignup ? (
          <div className="tcrm-auth-card__options">
            <Checkbox disabled={loading} label="Manter conectado" />
            <Button className="tcrm-auth-card__text-action" disabled={loading} onClick={onForgotPassword} size="sm" type="button" variant="ghost">Esqueci minha senha</Button>
          </div>
        ) : null}
        {error ? <InlineAlert title="Nao foi possivel continuar" tone="danger">{error}</InlineAlert> : null}
        <Button className="tcrm-auth-card__submit" loading={loading} type="submit" variant="primary">
          {isSignup ? "Continuar com e-mail" : "Entrar"}
        </Button>
        {isSignup ? (
          <>
            <p className="tcrm-auth-card__helper">Enviaremos um link seguro para você continuar e definir sua senha.</p>
            <p className="tcrm-auth-card__legal">
              Ao continuar, você concorda com os{" "}
              <Button className="tcrm-auth-card__legal-action" onClick={onTerms} size="sm" type="button" variant="ghost">Termos</Button>{" "}
              e a{" "}
              <Button className="tcrm-auth-card__legal-action" onClick={onPrivacy} size="sm" type="button" variant="ghost">Política de Privacidade</Button>.
            </p>
          </>
        ) : null}
        <p className="tcrm-auth-card__switch">
          {isSignup ? "Já tem conta?" : "Não tem conta?"}{" "}
          <Button className="tcrm-auth-card__switch-action" onClick={onSwitchMode} size="sm" type="button" variant="ghost">{isSignup ? "Entrar" : "Criar conta"}</Button>
        </p>
      </form>
    </section>
  );
}

export function AccessFooterLinks({
  links = ["Termos", "Privacidade", "Ajuda"],
  variant = "cluster",
  onLinkClick,
  className
}: {
  links?: string[];
  variant?: "cluster" | "shell";
  onLinkClick?: (link: string, index: number, event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}) {
  return (
    <footer className={cn("tcrm-access-footer-links", `tcrm-access-footer-links--${variant}`, className)} data-component="AccessFooterLinks" data-variant={variant}>
      {links.map((link, index) => (
        <React.Fragment key={link}>
          {index > 0 ? <span aria-hidden="true" className="tcrm-access-footer-links__separator">•</span> : null}
          <a href={`#${link.toLowerCase()}`} onClick={(event) => onLinkClick?.(link, index, event)}>
            {link}
          </a>
        </React.Fragment>
      ))}
    </footer>
  );
}

export type CheckoutPaymentCardState = "default" | "coupon-applied" | "coupon-error" | "loading" | "blocked";

export interface CheckoutPaymentCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  state?: CheckoutPaymentCardState;
  title?: React.ReactNode;
  planName?: React.ReactNode;
  planPrice?: React.ReactNode;
  couponLabel?: React.ReactNode;
  couponPlaceholder?: string;
  couponValue?: string;
  couponDefaultValue?: string;
  couponMessage?: React.ReactNode;
  couponError?: React.ReactNode;
  totalLabel?: React.ReactNode;
  total?: React.ReactNode;
  renewalLabel?: React.ReactNode;
  secureLabel?: string;
  secureDescription?: React.ReactNode;
  continueLabel?: React.ReactNode;
  backLabel?: React.ReactNode;
  loading?: boolean;
  blockedReason?: string;
  onCouponChange?: (value: string) => void;
  onApplyCoupon?: (value: string) => void;
  onContinuePayment?: () => void;
  onBackToPlans?: () => void;
}

export function CheckoutPaymentCard({
  state = "default",
  title = "Pagamento",
  planName = "Plano Avance",
  planPrice = "R$ 497,00",
  couponLabel = "Cupom",
  couponPlaceholder = "Código promocional",
  couponValue,
  couponDefaultValue = "",
  couponMessage,
  couponError,
  totalLabel = "Total hoje",
  total,
  renewalLabel = "Renovação mensal",
  secureLabel = "Pagamento seguro",
  secureDescription = "A Taliya não coleta dados de cartão nesta tela.",
  continueLabel,
  backLabel = "Voltar aos planos",
  loading = false,
  blockedReason,
  onCouponChange,
  onApplyCoupon,
  onContinuePayment,
  onBackToPlans,
  className,
  ...props
}: CheckoutPaymentCardProps) {
  const generatedCouponId = React.useId();
  const [internalCouponValue, setInternalCouponValue] = React.useState(couponDefaultValue);
  const isControlled = couponValue !== undefined;
  const resolvedCouponValue = couponValue ?? internalCouponValue;
  const resolvedLoading = loading || state === "loading";
  const resolvedBlockedReason = blockedReason ?? (state === "blocked" ? "Pagamento temporariamente indisponível" : undefined);
  const resolvedCouponError = couponError ?? (state === "coupon-error" ? "Cupom inválido ou expirado." : undefined);
  const resolvedCouponMessage = couponMessage ?? (state === "coupon-applied" ? "Cupom aplicado." : undefined);
  const resolvedTotal = total ?? (state === "coupon-applied" ? "R$ 447,30" : "R$ 497,00");
  const resolvedContinueLabel = continueLabel ?? (resolvedLoading ? "Abrindo pagamento seguro" : "Continuar para pagamento seguro");
  const couponDescriptionId = resolvedCouponError || resolvedCouponMessage ? `${generatedCouponId}-message` : undefined;
  const couponState = resolvedCouponError ? "error" : resolvedCouponMessage ? "success" : "default";
  const controlsDisabled = resolvedLoading || Boolean(resolvedBlockedReason);
  const visualState: CheckoutPaymentCardState = resolvedLoading
    ? "loading"
    : resolvedBlockedReason
      ? "blocked"
      : state;

  const handleCouponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    if (!isControlled) {
      setInternalCouponValue(nextValue);
    }
    onCouponChange?.(nextValue);
  };

  const handleCouponSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApplyCoupon?.(resolvedCouponValue);
  };

  return (
    <Card
      className={cn(
        "tcrm-checkout-payment-card",
        visualState !== "default" && `tcrm-checkout-payment-card--${visualState}`,
        className
      )}
      {...props}
    >
      <h2>{title}</h2>
      <div className="tcrm-checkout-payment-card__plan-row">
        <span>{planName}</span>
        <strong>{planPrice}</strong>
      </div>
      <form className="tcrm-checkout-payment-card__coupon" onSubmit={handleCouponSubmit}>
        <label className="tcrm-checkout-payment-card__coupon-label" htmlFor={generatedCouponId}>
          {couponLabel}
        </label>
        <div className="tcrm-checkout-payment-card__coupon-controls">
          <Input
            aria-describedby={couponDescriptionId}
            aria-label={couponPlaceholder}
            disabled={controlsDisabled}
            fieldState={couponState}
            id={generatedCouponId}
            onChange={handleCouponChange}
            placeholder={couponPlaceholder}
            value={resolvedCouponValue}
          />
          <Button className="tcrm-checkout-payment-card__coupon-action" disabled={controlsDisabled} type="submit" variant="secondary">
            Aplicar
          </Button>
        </div>
        {resolvedCouponError || resolvedCouponMessage ? (
          <p className="tcrm-checkout-payment-card__coupon-message" id={couponDescriptionId} role={resolvedCouponError ? "alert" : "status"}>
            {resolvedCouponError ?? resolvedCouponMessage}
          </p>
        ) : null}
      </form>
      <div className="tcrm-checkout-payment-card__total-row">
        <span>
          <strong>{totalLabel}</strong>
          <small>{renewalLabel}</small>
        </span>
        <strong>{resolvedTotal}</strong>
      </div>
      <div className="tcrm-checkout-payment-card__secure">
        <SecurePaymentNotice compact title={secureLabel}>
          {null}
        </SecurePaymentNotice>
        <p>{secureDescription}</p>
      </div>
      <footer className="tcrm-checkout-payment-card__actions">
        <Button
          blockedReason={resolvedBlockedReason}
          className="tcrm-checkout-payment-card__continue"
          loading={resolvedLoading}
          onClick={onContinuePayment}
          variant="primary"
        >
          {resolvedContinueLabel}
        </Button>
        <Button
          className="tcrm-checkout-payment-card__back"
          disabled={resolvedLoading}
          onClick={onBackToPlans}
          variant="ghost"
        >
          {backLabel}
        </Button>
      </footer>
    </Card>
  );
}

export interface CheckoutReviewPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  planCard?: React.ReactNode;
  paymentCard?: React.ReactNode;
  paymentCardProps?: CheckoutPaymentCardProps;
  loading?: boolean;
  blockedReason?: string;
  couponValue?: string;
  onCouponChange?: (value: string) => void;
  onApplyCoupon?: (value: string) => void;
  onContinuePayment?: () => void;
  onBackToPlans?: () => void;
  onChangePlan?: () => void;
  onFeatureHelp?: (id: string) => void;
}

export function CheckoutReviewPanel({
  className,
  children,
  planCard,
  paymentCard,
  paymentCardProps,
  loading,
  blockedReason,
  couponValue,
  onCouponChange,
  onApplyCoupon,
  onContinuePayment,
  onBackToPlans,
  onChangePlan,
  onFeatureHelp,
  ...props
}: CheckoutReviewPanelProps) {
  return (
    <div className={cn("tcrm-checkout-review-panel", className)} {...props}>
      {children ?? (
        <>
          {planCard ?? <PlanSummaryCard onChangePlan={onChangePlan} onFeatureHelp={onFeatureHelp} state="review" />}
          {paymentCard ?? (
            <CheckoutPaymentCard
              {...paymentCardProps}
              blockedReason={blockedReason ?? paymentCardProps?.blockedReason}
              couponValue={couponValue ?? paymentCardProps?.couponValue}
              loading={loading ?? paymentCardProps?.loading}
              onApplyCoupon={onApplyCoupon ?? paymentCardProps?.onApplyCoupon}
              onBackToPlans={onBackToPlans ?? paymentCardProps?.onBackToPlans}
              onContinuePayment={onContinuePayment ?? paymentCardProps?.onContinuePayment}
              onCouponChange={onCouponChange ?? paymentCardProps?.onCouponChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export interface SubscriptionReviewPageProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  panel?: React.ReactNode;
  panelProps?: CheckoutReviewPanelProps;
}

export function SubscriptionReviewPage({
  title = "Revisar assinatura",
  description = "Confira seu plano antes de ir para o pagamento seguro.",
  panel,
  panelProps,
  children,
  className,
  ...props
}: SubscriptionReviewPageProps) {
  return (
    <section aria-label="Revisar assinatura" className={cn("tcrm-subscription-review-page", className)} {...props}>
      <header className="tcrm-subscription-review-page__header">
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </header>
      {children ?? panel ?? <CheckoutReviewPanel {...panelProps} />}
    </section>
  );
}

export interface ConfirmedSubscriptionPageProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  summary?: React.ReactNode;
  handoff?: React.ReactNode;
  summaryProps?: PlanSummaryCardProps;
  handoffProps?: ConfirmedSetupHandoffProps;
}

export function ConfirmedSubscriptionPage({
  header,
  summary,
  handoff,
  summaryProps,
  handoffProps,
  children,
  className,
  ...props
}: ConfirmedSubscriptionPageProps) {
  return (
    <section aria-label="Assinatura confirmada" className={cn("tcrm-confirmed-subscription-page", className)} {...props}>
      {header ?? <SubscriptionResultHeader />}
      <div className="tcrm-confirmed-subscription-page__content">
        {children ?? (
          <>
            {summary ?? <PlanSummaryCard state="confirmed" {...summaryProps} />}
            {handoff ?? <ConfirmedSetupHandoff {...handoffProps} />}
          </>
        )}
      </div>
    </section>
  );
}

export interface FinanceQueueGridProps extends React.HTMLAttributes<HTMLElement> {
  density?: "default" | "compact";
}

export function FinanceQueueGrid({ className, density = "default", ...props }: FinanceQueueGridProps) {
  return <section aria-label="Filas financeiras" className={cn("tcrm-finance-queue-grid", `tcrm-finance-queue-grid--${density}`, className)} {...props} />;
}

export interface AgentRoutineIntroProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: React.ReactNode;
  description?: React.ReactNode;
}

export function AgentRoutineIntro({
  status = <Chip tone="success">Contratado</Chip>,
  description = "Escolha uma rotina para ajustar, simular ou publicar.",
  children,
  className,
  ...props
}: AgentRoutineIntroProps) {
  return (
    <div className={cn("tcrm-agent-routine-intro", className)} {...props}>
      {children ?? (
        <>
          {status}
          {description ? <p>{description}</p> : null}
        </>
      )}
    </div>
  );
}

export type StudentProfileAction = "open-schedule" | "open-finance" | "open-pending" | "open-notes" | "open-timeline" | "message" | "create-task" | "change-plan" | "pause-student";

export interface StudentProfileCompositionProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: "standard" | "compact";
  onAction?: (action: StudentProfileAction) => void;
}

interface StudentProfileListItemProps extends React.ComponentProps<typeof ListItem> {
  badge: React.ReactNode;
  compact: boolean;
}

function StudentProfileListItem({ badge, compact, ...props }: StudentProfileListItemProps) {
  return <ListItem action={compact ? badge : undefined} {...props}>{compact ? null : badge}</ListItem>;
}

export function StudentProfileOverviewGrid({ children, className, density = "standard", onAction, ...props }: StudentProfileCompositionProps) {
  const compact = density === "compact";
  return (
    <div className={cn("tcrm-student-profile-overview-grid", compact && "tcrm-student-profile-overview-grid--compact", className)} data-density={density} {...props}>
      {children ?? (
        <>
          <StudentSummary />
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="2. Agenda próxima">
            <h3>2. Agenda próxima</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="info">Marcada</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Qui 15/05 · 07:00" title="Reformer Iniciante" />
              <StudentProfileListItem badge={<Chip tone="info">Marcada</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Sex 17/05 · 07:00" title="Reformer Iniciante" />
              <StudentProfileListItem badge={<Chip tone="info">Marcada</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Seg 20/05 · 08:00" title="Pilates Solo" />
              <StudentProfileListItem badge={<Chip tone="warning">Pendente</Chip>} compact={compact} leading={<Icon name="clipboard" tone="warning" />} meta="1 aula disponível" title="Reposição pendente" />
            </List>
            <Button onClick={() => onAction?.("open-schedule")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver agenda</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="3. Plano e financeiro">
            <h3>3. Plano e financeiro</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="success">Ativo</Chip>} compact={compact} leading={<Icon name="creditCard" />} meta="Plano Mensal" title="Plano atual" />
              <ListItem leading={<Icon name="coins" />} meta="10/06/2024 · R$ 199,00" title="Próxima mensalidade" />
              <ListItem leading={<Icon name="coins" />} meta="05/04/2024 · R$ 199,00" title="Último pagamento" />
              <StudentProfileListItem badge={<Chip tone="warning">pagamento pendente</Chip>} compact={compact} leading={<Icon name="alert" tone="warning" />} meta="Pagamento pendente desde 05/04" title="Status financeiro" />
            </List>
            <Button onClick={() => onAction?.("open-finance")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver financeiro</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="4. Pendências">
            <h3>4. Pendências</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="user" />} meta="Dados cadastrais" title="Atualizar contato de emergência" />
              <ListItem leading={<Icon name="calendar" />} meta="Agenda" title="Confirmar disponibilidade para aula extra" />
              <ListItem leading={<Icon name="coins" tone="warning" />} meta="Financeiro" title="Pagamento pendente" />
            </List>
            <Button onClick={() => onAction?.("open-pending")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas pendências</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="5. Notas recentes">
            <h3>5. Notas recentes</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="clipboard" tone="info" />} meta="Sam Frank · 12/05/2024 14:32" title="Aluna pediu opção de reposição para próxima semana." />
              <ListItem leading={<Icon name="message" tone="info" />} meta="Nikki Olaw · 09/05/2024 10:15" title="Relatou leve desconforto no ombro direito." />
            </List>
            <Button onClick={() => onAction?.("open-notes")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas notas</Button>
          </Panel>
          <Panel className="tcrm-student-profile-overview-grid__panel" compact={compact} title="6. Linha do tempo curta">
            <h3>6. Linha do tempo curta</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="whatsapp" tone="success" />} meta="12/05/2024 14:32 · Por Sam Frank" title="Mensagem via WhatsApp">Enviou lembrete da aula de quinta.</ListItem>
              <ListItem leading={<Icon name="checkCircle" tone="info" />} meta="10/05/2024 07:00 · Reformer Iniciante" title="Aula realizada">Presença registrada.</ListItem>
              <ListItem leading={<Icon name="coins" tone="success" />} meta="05/04/2024 10:32 · R$ 199,00" title="Pagamento recebido">Plano Mensal.</ListItem>
            </List>
            <Button onClick={() => onAction?.("open-timeline")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver linha do tempo completa</Button>
          </Panel>
        </>
      )}
    </div>
  );
}

export function StudentProfileActionRail({ children, className, density = "standard", onAction, ...props }: StudentProfileCompositionProps) {
  const compact = density === "compact";
  return (
    <div className={cn("tcrm-student-profile-action-rail", compact && "tcrm-student-profile-action-rail--compact", className)} data-density={density} {...props}>
      {children ?? (
        <>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Próximas ações">
            <h3>Próximas ações</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="info">Reformer Iniciante</Chip>} compact={compact} leading={<Icon name="calendar" tone="info" />} meta="Qui, 15/05 · 07:00" title="Aula marcada" />
              <StudentProfileListItem badge={<Chip tone="warning">Pendente</Chip>} compact={compact} leading={<Icon name="refresh" tone="warning" />} meta="1 aula disponível" title="Repor aula pendente" />
              <StudentProfileListItem badge={<Chip tone="warning">Atenção</Chip>} compact={compact} leading={<Icon name="coins" tone="success" />} meta="R$ 199,00" title="Pagamento pendente" />
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Riscos / alertas">
            <h3>Riscos / alertas</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="warning">Atenção</Chip>} compact={compact} leading={<Icon name="shield" tone="warning" />} meta="Pagamento pendente desde 05/04" title="Financeiro em atraso" />
              <StudentProfileListItem badge={<Chip tone="success">Bom</Chip>} compact={compact} leading={<Icon name="checkCircle" tone="success" />} meta="8 de 10 aulas (80%)" title="Frequência estável" />
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Tarefas abertas">
            <h3>Tarefas abertas</h3>
            <List dense={compact} divided={compact}>
              <StudentProfileListItem badge={<Chip tone="info">Pendente</Chip>} compact={compact} leading={<Icon name="checkCircle" />} meta="Criada por Nikki Olaw · 02/05" title="Confirmar disponibilidade para aula extra" />
              <StudentProfileListItem badge={<Chip tone="info">Pendente</Chip>} compact={compact} leading={<Icon name="checkCircle" />} meta="Criada por Sam Frank · 28/04" title="Atualizar contato de emergência" />
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__section" compact={compact} title="Última conversa">
            <h3>Última conversa</h3>
            <List dense={compact} divided={compact}>
              <ListItem leading={<Icon name="whatsapp" tone="success" />} meta="Você: Oi Ana Paula! Lembrando da sua aula..." title="WhatsApp · 12/05/2024 14:32">Ana Paula: Perfeito, obrigada pelo lembrete!</ListItem>
            </List>
          </Panel>
          <Panel className="tcrm-student-profile-action-rail__quick-actions" compact={compact} title="Ações rápidas">
            <h3>Ações rápidas</h3>
            <ButtonGroup>
              <Button leadingIcon="message" onClick={() => onAction?.("message")} variant="secondary">Enviar mensagem</Button>
              <Button leadingIcon="calendar" onClick={() => onAction?.("create-task")} variant="secondary">Criar tarefa</Button>
              <Button leadingIcon="creditCard" onClick={() => onAction?.("change-plan")} variant="secondary">Alterar plano</Button>
              <Button leadingIcon="pause" onClick={() => onAction?.("pause-student")} variant="secondary">Pausar aluno</Button>
            </ButtonGroup>
          </Panel>
        </>
      )}
    </div>
  );
}

export type ClassOperationalDetailAction = "view-students" | "open-vacancy" | "open-credit" | "open-enrollment" | "edit-notes";

export interface ClassOperationalDetailProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (action: ClassOperationalDetailAction) => void;
  onStudentAction?: (studentId: string) => void;
  students?: Array<RosterStudent | string>;
}

export function ClassOperationalDetail({ children, className, onAction, onStudentAction, students, ...props }: ClassOperationalDetailProps) {
  return (
    <div className={cn("tcrm-class-operational-detail", className)} data-component="ClassOperationalDetail" {...props}>
      {children ?? (
        <>
          <Panel className="tcrm-class-operational-detail__summary" compact>
            <dl>
              <div><Icon name="user" /><dt>Professor da aula</dt><dd>João Silva</dd></div>
              <div><Icon name="calendar" /><dt>Equipamento / recurso</dt><dd>Reformer 2</dd></div>
              <div><Icon name="users" /><dt>Capacidade</dt><dd>5/6</dd></div>
              <div><Icon name="clock" /><dt>Status</dt><dd><Chip tone="warning">Chamada em andamento</Chip></dd></div>
              <div><Icon name="calendar" /><dt>Origem</dt><dd>Agenda</dd></div>
            </dl>
            <p><Icon name="info" tone="info" /> Aula criada pela grade recorrente.</p>
          </Panel>
          <Panel className="tcrm-class-operational-detail__students" compact>
            <ButtonGroup align="between">
              <div><h3>Alunos esperados</h3><p>Clique no aluno para ver detalhes</p></div>
              <Button leadingIcon="eye" onClick={() => onAction?.("view-students")} size="sm" variant="secondary">Ver detalhes</Button>
            </ButtonGroup>
            <Roster onStudentAction={onStudentAction} students={students} variant="expected" />
          </Panel>
          <div className="tcrm-class-operational-detail__side">
            <Panel compact>
              <h3>Reposições e vagas</h3>
              <List divided>
                <ListItem action={<Icon name="chevronRight" />} leading={<Icon name="users" tone="success" />} onClick={() => onAction?.("open-vacancy")} title="1 vaga aberta">Disponível para encaixe</ListItem>
                <ListItem action={<Icon name="chevronRight" />} leading={<Icon name="sparkles" tone="info" />} onClick={() => onAction?.("open-credit")} title="1 crédito compatível">Elegível para uso nesta aula</ListItem>
                <ListItem action={<Icon name="chevronRight" />} leading={<Icon name="user" tone="info" />} onClick={() => onAction?.("open-enrollment")} title="1 aluno encaixado">Entrou por reposição</ListItem>
              </List>
            </Panel>
            <Panel compact>
              <ButtonGroup align="between"><h3>Observações da aula</h3><Button leadingIcon="edit" onClick={() => onAction?.("edit-notes")} size="sm" variant="secondary">Editar</Button></ButtonGroup>
              <p>Gabriela costuma avisar em cima da hora.<br />Verificar encaixe se Ana não vier.</p>
            </Panel>
          </div>
          <Panel className="tcrm-class-operational-detail__history" compact>
            <h3>Histórico da aula</h3>
            <List divided>
              <ListItem action={<Chip tone="neutral">Sistema</Chip>} leading={<Icon name="calendar" tone="info" />} meta="12/05 · 10:12" title="Aula criada pela grade">Recorrência: terça 17h</ListItem>
              <ListItem action={<Chip tone="info">Ana Carolina</Chip>} leading={<Icon name="user" tone="success" />} meta="12/05 · 15:47" title="Ana pediu reposição">Motivo: compromissos pessoais</ListItem>
              <ListItem action={<Chip tone="neutral">Recepção</Chip>} leading={<Icon name="user" tone="warning" />} meta="Hoje · 16:45" title="Chamada iniciada pela recepção">Execução da aula iniciada</ListItem>
            </List>
          </Panel>
        </>
      )}
    </div>
  );
}

export type SubscriptionStatusState = "verifying" | "failed" | "confirmed";
export type SubscriptionProgressState = "initiated" | "verifying" | "released";

export interface SubscriptionStatusDetail {
  icon?: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface SubscriptionStatusCardProps extends Omit<CrmSurfaceProps, "state"> {
  state?: SubscriptionStatusState;
  details?: SubscriptionStatusDetail[];
  onBackToPlans?: () => void;
  onReopenPayment?: () => void;
  onRetry?: () => void;
  onStartSetup?: () => void;
  onSupport?: () => void;
}

const subscriptionStatusCopy: Record<
  SubscriptionStatusState,
  {
    title: string;
    description: string;
    icon: IconName;
    summaryState: "ok" | "attention" | "danger" | "info";
    statusLabel: string;
    callout?: { title: string; body: string };
    secureCopy?: string;
    helper?: string;
    footerNote?: string;
  }
> = {
  verifying: {
    title: "Estamos confirmando sua assinatura",
    description: "Seu pagamento foi iniciado. Assim que a confirmação chegar, você poderá configurar o Taliya para o seu estúdio.",
    icon: "shield",
    summaryState: "info",
    statusLabel: "Verificando confirmação",
    secureCopy: "A Taliya não coleta dados de cartão. A confirmação vem pelo ambiente seguro de pagamento.",
    helper: "A verificação acontece automaticamente. Você não precisa atualizar a página.",
    footerNote: "Pode levar alguns instantes. Você pode voltar a esta página se precisar."
  },
  failed: {
    title: "Não conseguimos confirmar sua assinatura",
    description: "Sua assinatura ainda não foi ativada. Você pode tentar novamente com segurança.",
    icon: "alert",
    summaryState: "danger",
    statusLabel: "Não confirmada",
    callout: {
      title: "O que aconteceu",
      body: "O pagamento pode ter sido cancelado, expirado ou recusado pelo provedor."
    },
    secureCopy: "A Taliya não coleta dados de cartão. A nova tentativa acontece pelo ambiente seguro do provedor.",
    footerNote: "O CRM será liberado assim que a assinatura for confirmada."
  },
  confirmed: {
    title: "Assinatura ativa",
    description: "Recebemos a confirmação com sucesso.",
    icon: "check",
    summaryState: "ok",
    statusLabel: "Confirmada"
  }
};

function defaultSubscriptionDetails(state: SubscriptionStatusState): SubscriptionStatusDetail[] {
  if (state === "confirmed") {
    return [
      { icon: "calendar", label: "Plano", value: "Avance" },
      { icon: "user", label: "Conta", value: "ana@studiolume.com" },
      { icon: "users", label: "Agentes", value: "3 agentes incluídos" },
      { icon: "refresh", label: "Renovação", value: "Mensal" }
    ];
  }

  return [
    { icon: "calendar", label: state === "failed" ? "Plano" : "Plano escolhido", value: "Avance" },
    { icon: "user", label: "Conta", value: "ana@studiolume.com" }
  ];
}

function subscriptionProgressStateFromStep(step?: number): SubscriptionProgressState {
  if (typeof step !== "number") return "verifying";
  if (step <= 1) return "initiated";
  if (step >= 3) return "released";
  return "verifying";
}

export function SubscriptionStatusCard({
  state = "verifying",
  className,
  children,
  action,
  title,
  description,
  icon,
  statusLabel,
  details,
  onBackToPlans,
  onReopenPayment,
  onRetry,
  onStartSetup,
  onSupport,
  ...props
}: SubscriptionStatusCardProps) {
  const copy = subscriptionStatusCopy[state];
  const rows = details ?? defaultSubscriptionDetails(state);
  const resolvedStatusLabel = statusLabel ?? copy.statusLabel;

  return (
    <StatusSummaryCard
      className={cn("tcrm-subscription-status-card", `tcrm-subscription-status-card--${state}`, className)}
      description={description ?? copy.description}
      headingLevel={1}
      icon={icon ?? copy.icon}
      state={copy.summaryState}
      statusLabel={resolvedStatusLabel}
      title={title ?? copy.title}
      {...props}
    >
      {children ?? (
        <div className="tcrm-subscription-status-card__content">
          {copy.callout ? (
            <InlineAlert className="tcrm-subscription-status-card__callout" icon="info" title={copy.callout.title} tone="warning">
              {copy.callout.body}
            </InlineAlert>
          ) : null}
          {state !== "confirmed" ? (
            <div className="tcrm-subscription-status-card__status-row">
              <strong>Status da assinatura</strong>
              <Chip className="tcrm-subscription-status-card__status-chip" tone={toneForState(state)}>
                {resolvedStatusLabel}
              </Chip>
            </div>
          ) : null}
          {state === "verifying" ? <SubscriptionProgressStepper state="verifying" /> : null}
          <div className={cn("tcrm-subscription-status-card__details", state === "failed" && "tcrm-subscription-status-card__details--boxed")}>
            {state === "failed" ? <strong className="tcrm-subscription-status-card__details-title">Sua assinatura</strong> : null}
            {rows.map((row, index) => (
              <div className="tcrm-subscription-status-card__detail-row" key={`${row.label}-${index}`}>
                <span className="tcrm-subscription-status-card__detail-icon">
                  <Icon name={row.icon ?? "clipboard"} />
                </span>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
          {state === "confirmed" ? (
            <div className="tcrm-subscription-status-card__release-note">
              <Icon name="shieldCheck" />
              <span>O CRM será liberado após a configuração inicial.</span>
            </div>
          ) : copy.secureCopy ? (
            <SecurePaymentNotice>{copy.secureCopy}</SecurePaymentNotice>
          ) : null}
          {state === "verifying" ? (
            <>
              {action ?? (
                <Button aria-busy={true} className="tcrm-subscription-status-card__primary-action" disabled variant="primary">
                  <Icon className="tl-spin" name="loader" size="14px" />
                  Verificando...
                </Button>
              )}
              {copy.helper ? <p className="tcrm-subscription-status-card__helper">{copy.helper}</p> : null}
              <div className="tcrm-subscription-status-card__links">
                <Button className="tcrm-subscription-status-card__link" onClick={onReopenPayment} size="sm" variant="ghost">Reabrir pagamento seguro</Button>
                <Button className="tcrm-subscription-status-card__link" onClick={onSupport} size="sm" variant="ghost">Falar com suporte</Button>
              </div>
            </>
          ) : null}
          {state === "failed" ? (
            <>
              {action ?? (
                <Button className="tcrm-subscription-status-card__primary-action" onClick={onRetry} variant="primary">
                  Tentar pagamento novamente
                </Button>
              )}
              <div className="tcrm-subscription-status-card__links">
                <Button className="tcrm-subscription-status-card__link" onClick={onBackToPlans} size="sm" variant="ghost">Voltar aos planos</Button>
                <Button className="tcrm-subscription-status-card__link" onClick={onSupport} size="sm" variant="ghost">Falar com suporte</Button>
              </div>
            </>
          ) : null}
          {state === "confirmed" && action ? (
            <div className="tcrm-subscription-status-card__confirmed-action">
              {action}
            </div>
          ) : state === "confirmed" && onStartSetup ? (
            <Button className="tcrm-subscription-status-card__primary-action" onClick={onStartSetup} variant="primary">Começar setup guiado</Button>
          ) : null}
          {copy.footerNote ? <p className="tcrm-subscription-status-card__footer-note">{copy.footerNote}</p> : null}
        </div>
      )}
    </StatusSummaryCard>
  );
}

export function SubscriptionProgressStepper({
  state,
  step,
  className
}: {
  state?: SubscriptionProgressState;
  step?: number;
  className?: string;
}) {
  const resolvedState = state ?? subscriptionProgressStateFromStep(step);
  const steps: StepperStep[] = [
    {
      id: "payment-started",
      label: "Pagamento iniciado",
      state: resolvedState === "initiated" ? "current" : "complete"
    },
    {
      id: "confirmation",
      label: "Confirmação em andamento",
      state: resolvedState === "initiated" ? "pending" : resolvedState === "verifying" ? "current" : "complete"
    },
    {
      id: "setup-released",
      label: "Configuração liberada",
      state: resolvedState === "released" ? "complete" : "pending"
    }
  ];

  return (
    <Stepper
      aria-label="Progresso da confirmação da assinatura"
      className={cn("tcrm-subscription-progress-stepper", `tcrm-subscription-progress-stepper--${resolvedState}`, className)}
      orientation="horizontal"
      steps={steps}
    />
  );
}

export interface SubscriptionResolutionPanelProps extends Omit<SubscriptionStatusCardProps, "state"> {
  retrying?: boolean;
}

export function SubscriptionResolutionPanel({
  className,
  action,
  onRetry,
  retrying = false,
  ...props
}: SubscriptionResolutionPanelProps) {
  return (
    <SubscriptionStatusCard
      className={cn("tcrm-subscription-resolution-panel", className)}
      action={action ?? (
        <Button
          className="tcrm-subscription-status-card__primary-action"
          loading={retrying}
          onClick={onRetry}
          variant="primary"
        >
          Tentar pagamento novamente
        </Button>
      )}
      onRetry={onRetry}
      state="failed"
      {...props}
    />
  );
}

export interface SubscriptionResultHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  state?: "confirmed";
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export function SubscriptionResultHeader({
  state = "confirmed",
  title = "Assinatura confirmada",
  description = "Tudo certo. Sua assinatura está ativa e o setup guiado já pode começar.",
  className,
  ...props
}: SubscriptionResultHeaderProps) {
  return (
    <header className={cn("tcrm-subscription-result-header", `tcrm-subscription-result-header--${state}`, className)} data-component="SubscriptionResultHeader" data-state={state} {...props}>
      <span className="tcrm-subscription-result-header__icon" aria-hidden="true">
        <Icon name="check" />
      </span>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export interface ConfirmedSetupHandoffStep {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

export interface ConfirmedSetupHandoffProps extends Omit<CrmSurfaceProps, "state" | "icon" | "statusLabel" | "meta"> {
  state?: "ready" | "starting" | "blocked";
  steps?: ConfirmedSetupHandoffStep[];
  onStartSetup?: () => void;
  onScheduleHelp?: () => void;
  secondaryAction?: React.ReactNode;
  loading?: boolean;
  scheduleLoading?: boolean;
  blockedReason?: string;
  scheduleBlockedReason?: string;
}

const confirmedSetupHandoffSteps: ConfirmedSetupHandoffStep[] = [
  {
    id: "studio-data",
    title: "Preparar dados do studio",
    description: "Dados essenciais para iniciar a configuração."
  },
  {
    id: "channels-operation",
    title: "Configurar canais e operação",
    description: "Canais, planos, alunos, turmas e agenda com orientação."
  },
  {
    id: "review-release",
    title: "Revisar e liberar o CRM",
    description: "Tudo é revisado antes do primeiro uso."
  }
];

export function ConfirmedSetupHandoff({
  className,
  action,
  secondaryAction,
  title = "Setup guiado pela Taliya",
  description = "O agente de configuração vai guiar você passo a passo antes do primeiro uso.",
  state = "ready",
  steps = confirmedSetupHandoffSteps,
  onStartSetup,
  onScheduleHelp,
  loading = false,
  scheduleLoading = false,
  blockedReason,
  scheduleBlockedReason,
  ...props
}: ConfirmedSetupHandoffProps) {
  const headingId = React.useId();
  const isStarting = loading || state === "starting";
  const resolvedBlockedReason = state === "blocked" ? (blockedReason ?? "Setup indisponível no momento") : blockedReason;

  return (
    <Card
      className={cn("tcrm-confirmed-setup-handoff", `tcrm-confirmed-setup-handoff--${state}`, className)}
      {...props}
    >
      <header className="tcrm-confirmed-setup-handoff__header">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <section className="tcrm-confirmed-setup-handoff__steps" aria-labelledby={headingId}>
        <h3 id={headingId}>Como funciona</h3>
        <ol>
          {steps.map((step, index) => (
            <li key={step.id}>
              <span aria-hidden="true" className="tcrm-confirmed-setup-handoff__step-number">
                {index + 1}
              </span>
              <span className="tcrm-confirmed-setup-handoff__step-copy">
                <strong>{step.title}</strong>
                <small>{step.description}</small>
              </span>
            </li>
          ))}
        </ol>
      </section>
      <footer className="tcrm-confirmed-setup-handoff__actions">
        {action ?? (
          <Button
            blockedReason={resolvedBlockedReason}
            className="tcrm-confirmed-setup-handoff__primary"
            loading={isStarting}
            onClick={onStartSetup}
            variant="primary"
          >
            Começar setup guiado
          </Button>
        )}
        {secondaryAction ?? (
          <Button
            blockedReason={scheduleBlockedReason}
            className="tcrm-confirmed-setup-handoff__secondary"
            loading={scheduleLoading}
            onClick={onScheduleHelp}
            variant="secondary"
          >
            Agendar ajuda humana
          </Button>
        )}
      </footer>
    </Card>
  );
}

export type PlanSummaryCardState = "active" | "review" | "confirmed" | "failed";

export interface PlanSummaryFeature {
  id: string;
  label: React.ReactNode;
  meta?: React.ReactNode;
  icon: IconName;
  included?: boolean;
  disabled?: boolean;
  help?: boolean;
  separatorBefore?: boolean;
}

export interface PlanSummaryDetail {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon: IconName;
}

export interface PlanSummaryCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  state?: PlanSummaryCardState;
  eyebrow?: React.ReactNode;
  description?: React.ReactNode;
  badgeLabel?: React.ReactNode;
  features?: PlanSummaryFeature[];
  details?: PlanSummaryDetail[];
  accountEmail?: React.ReactNode;
  releaseNote?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  loading?: boolean;
  blockedReason?: string;
  onChangePlan?: () => void;
  onViewDetails?: () => void;
  onFeatureHelp?: (id: string) => void;
}

const activePlanSummaryFeatures: PlanSummaryFeature[] = [
  { id: "operational", label: "CRM operacional", icon: "sliders", included: true },
  { id: "agents", label: "7 agentes inclusos", icon: "users", included: true },
  { id: "quota", label: "Cotas do ciclo", icon: "menu", included: true },
  { id: "support", label: "Suporte Taliya", icon: "help", included: true }
];

const reviewPlanSummaryFeatures: PlanSummaryFeature[] = [
  { id: "panel", label: "Painel Taliya + app", icon: "layout", included: true, help: true },
  { id: "studio", label: "Sistema do studio", icon: "copy", included: true, help: true },
  { id: "whatsapp", label: "WhatsApp Business", icon: "whatsapp", included: true },
  { id: "support", label: "Atendimento", icon: "headphones", included: true },
  { id: "agenda", label: "Agenda", icon: "calendar", included: true },
  { id: "sales", label: "Vendas", icon: "wallet", included: true },
  { id: "finance", label: "Financeiro", icon: "coins", included: false, disabled: true, separatorBefore: true },
  { id: "retention", label: "Retenção", icon: "users", included: false, disabled: true },
  { id: "management", label: "Gestão", icon: "barChart", included: false, disabled: true },
  { id: "history", label: "Histórico/Evolução", icon: "trendingUp", included: false, disabled: true },
  { id: "messages", label: "Mensagens de IA", meta: "5.000 mensagens/mês", icon: "sparkles", included: true, separatorBefore: true }
];

const confirmedPlanSummaryDetails: PlanSummaryDetail[] = [
  { id: "plan", label: "Plano", value: "Avance", icon: "calendar" },
  { id: "account", label: "Conta", value: "ana@studiolume.com", icon: "user" },
  { id: "agents", label: "Agentes", value: "3 agentes incluídos", icon: "users" },
  { id: "renewal", label: "Renovação", value: "Mensal", icon: "refresh" }
];

const failedPlanSummaryDetails: PlanSummaryDetail[] = [
  { id: "plan", label: "Plano", value: "Avance", icon: "calendar" },
  { id: "account", label: "Conta", value: "ana@studiolume.com", icon: "user" }
];

export function PlanSummaryCard({
  title,
  state = "active",
  eyebrow,
  description,
  badgeLabel,
  features,
  details,
  accountEmail = "ana@studiolume.com",
  releaseNote = "O CRM será liberado após a configuração inicial.",
  className,
  children,
  action,
  secondaryAction,
  loading = false,
  blockedReason,
  onChangePlan,
  onViewDetails,
  onFeatureHelp,
  ...props
}: PlanSummaryCardProps) {
  const resolvedTitle =
    title ??
    (state === "review"
      ? "Plano Avance"
      : state === "confirmed"
        ? "Assinatura ativa"
        : state === "failed"
          ? "Sua assinatura"
          : "Plano 7 agentes");

  if (state === "review") {
    const resolvedFeatures = features ?? reviewPlanSummaryFeatures;

    return (
      <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--review", className)} {...props}>
        <header className="tcrm-plan-summary-card__review-header">
          <strong>{resolvedTitle}</strong>
          <Chip className="tcrm-plan-summary-card__review-chip" showDot={false} tone="neutral">
            {badgeLabel ?? "3 agentes incluídos"}
          </Chip>
        </header>
        <section className="tcrm-plan-summary-card__review-section" aria-label="Incluso no plano">
          <h2>Incluso no plano</h2>
          {children ?? (
            <ul className="tcrm-plan-summary-card__review-list">
              {resolvedFeatures.map((feature) => (
                <li
                  className={cn(
                    "tcrm-plan-summary-card__review-row",
                    feature.disabled && "is-disabled",
                    feature.separatorBefore && "has-separator"
                  )}
                  key={feature.id}
                >
                  <Icon className="tcrm-plan-summary-card__review-icon" name={feature.icon} />
                  <span className="tcrm-plan-summary-card__review-copy">
                    <strong>{feature.label}</strong>
                    {feature.meta ? <small>{feature.meta}</small> : null}
                  </span>
                  <span className={cn("tcrm-plan-summary-card__review-status", feature.included === false && "is-muted")} aria-hidden="true">
                    <Icon name={feature.included === false ? "minus" : "check"} />
                  </span>
                  {feature.help ? (
                    <IconButton className="tcrm-plan-summary-card__review-help" icon="help" label={`Ajuda sobre ${feature.label}`} onClick={() => onFeatureHelp?.(feature.id)} size="sm" type="button" variant="ghost" />
                  ) : (
                    <span aria-hidden="true" className="tcrm-plan-summary-card__review-help-spacer" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
        <footer className="tcrm-plan-summary-card__review-footer">
          <span>
            <strong>Conta</strong>
            <small>{accountEmail}</small>
          </span>
          {action ?? (
            <Button className="tcrm-plan-summary-card__review-change" onClick={onChangePlan} size="sm" variant="ghost">
              Trocar
            </Button>
          )}
        </footer>
      </Card>
    );
  }

  if (state === "confirmed") {
    const resolvedDetails = details ?? confirmedPlanSummaryDetails;

    return (
      <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--confirmed", className)} {...props}>
        <header className="tcrm-plan-summary-card__confirmed-header">
          <span className="tcrm-plan-summary-card__confirmed-icon" aria-hidden="true">
            <Icon name="check" />
          </span>
          <strong>{resolvedTitle}</strong>
          <small>{description ?? "Recebemos a confirmação com sucesso."}</small>
        </header>
        <dl className="tcrm-plan-summary-card__detail-list">
          {resolvedDetails.map((detail) => (
            <div className="tcrm-plan-summary-card__detail-row" key={detail.id}>
              <dt><ListIcon icon={detail.icon} tone="neutral" />{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
        <div className="tcrm-plan-summary-card__release-note">
          <ListIcon icon="shieldCheck" tone="success" />
          <span>{releaseNote}</span>
        </div>
      </Card>
    );
  }

  if (state === "failed") {
    const resolvedDetails = details ?? failedPlanSummaryDetails;

    return (
      <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--failed", className)} {...props}>
        <h3>{resolvedTitle}</h3>
        <dl className="tcrm-plan-summary-card__detail-list">
          {resolvedDetails.map((detail) => (
            <div className="tcrm-plan-summary-card__detail-row" key={detail.id}>
              <dt><ListIcon icon={detail.icon} tone="info" />{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    );
  }

  const resolvedFeatures = features ?? activePlanSummaryFeatures;

  return (
    <Card className={cn("tcrm-plan-summary-card", "tcrm-plan-summary-card--active", className)} {...props}>
      <header className="tcrm-plan-summary-card__active-header">
        <small>{eyebrow ?? "Plano atual"}</small>
        <strong>{resolvedTitle}</strong>
        <p>{description ?? "CRM completo com 7 agentes contratados."}</p>
      </header>
      {children ?? (
        <ul className="tcrm-plan-summary-card__active-list">
          {resolvedFeatures.map((feature) => (
            <li className="tcrm-plan-summary-card__active-row" key={feature.id}>
              <ListIcon icon={feature.icon} tone="info" />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      )}
      <footer className="tcrm-plan-summary-card__active-actions">
        {action ?? (
          <Button
            blockedReason={blockedReason}
            className="tcrm-plan-summary-card__primary"
            loading={loading}
            onClick={onChangePlan}
            variant="primary"
          >
            Trocar plano
          </Button>
        )}
        {secondaryAction ?? (
          <Button className="tcrm-plan-summary-card__secondary" onClick={onViewDetails} variant="secondary">
            Ver detalhes do plano
          </Button>
        )}
      </footer>
    </Card>
  );
}

export type InvoiceStatus = "paid" | "pending" | "open" | "failed";

export interface InvoiceRow {
  id: string;
  period?: React.ReactNode;
  invoice?: React.ReactNode;
  dueDate?: React.ReactNode;
  due?: React.ReactNode;
  amount: React.ReactNode;
  status: InvoiceStatus;
  method?: React.ReactNode;
}

export interface InvoiceTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  rows?: InvoiceRow[];
  loading?: boolean;
  error?: React.ReactNode;
  emptyState?: React.ReactNode;
  blockedReason?: string;
  onRowClick?: (row: InvoiceRow) => void;
  onOpen?: (row: InvoiceRow) => void;
  onDownload?: (row: InvoiceRow) => void;
  onRetry?: (row: InvoiceRow) => void;
}

const defaultInvoiceRows: InvoiceRow[] = [
  { id: "jun-2026", period: "Junho/2026", dueDate: "12/06", amount: "R$ 799,00", status: "pending", method: "Cartão 4242" },
  { id: "mai-2026", period: "Maio/2026", dueDate: "12/05", amount: "R$ 799,00", status: "paid", method: "Cartão 4242" },
  { id: "abr-2026", period: "Abril/2026", dueDate: "12/04", amount: "R$ 799,00", status: "paid", method: "Cartão 4242" },
  { id: "mar-2026", period: "Março/2026", dueDate: "12/03", amount: "R$ 799,00", status: "paid", method: "Cartão 4242" }
];

const invoiceStatusLabelByStatus: Record<InvoiceStatus, string> = {
  failed: "Falhou",
  open: "Em aberto",
  paid: "Paga",
  pending: "Em aberto"
};

function invoiceRowPeriod(row: InvoiceRow) {
  return row.period ?? row.invoice ?? row.id;
}

function invoiceRowDue(row: InvoiceRow) {
  return row.dueDate ?? row.due ?? "";
}

function invoiceRowAccessibleName(row: InvoiceRow) {
  const label = invoiceRowPeriod(row);
  return typeof label === "string" || typeof label === "number" ? String(label) : row.id;
}

export function InvoiceTable({
  title = "Histórico de faturas",
  rows = defaultInvoiceRows,
  onRowClick,
  onOpen,
  onDownload,
  onRetry,
  loading = false,
  error,
  emptyState,
  blockedReason,
  className,
  ...props
}: InvoiceTableProps) {
  const titleId = React.useId();

  return (
    <Card aria-labelledby={titleId} className={cn("tcrm-invoice-table-card", className)} {...props}>
      <h2 id={titleId}>{title}</h2>
      <DataTable
        className="tcrm-invoice-table"
        columns={[
          { key: "period", header: "Período", render: invoiceRowPeriod },
          { key: "dueDate", header: "Vencimento", render: invoiceRowDue },
          { key: "amount", header: "Valor" },
          {
            key: "status",
            header: "Status",
            render: (row: InvoiceRow) => (
              <Chip className={cn("tcrm-invoice-table__status", `tcrm-invoice-table__status--${row.status}`)} showDot={false} tone={toneForState(row.status)}>
                {invoiceStatusLabelByStatus[row.status]}
              </Chip>
            )
          },
          { key: "method", header: "Método" },
          {
            key: "actions",
            header: "Ações",
            render: (row: InvoiceRow) => {
              const invoiceName = invoiceRowAccessibleName(row);
              return (
                <ButtonGroup className="tcrm-invoice-table__actions" onClick={(event) => event.stopPropagation()}>
                  <Button
                    aria-label={`Abrir fatura ${invoiceName}`}
                    blockedReason={blockedReason}
                    className="tcrm-invoice-table__action tcrm-invoice-table__action--open"
                    leadingIcon="fileText"
                    onClick={() => onOpen?.(row)}
                    size="sm"
                    variant="secondary"
                  >
                    Abrir
                  </Button>
                  <Button
                    aria-label={`Baixar fatura ${invoiceName}`}
                    blockedReason={blockedReason}
                    className="tcrm-invoice-table__action tcrm-invoice-table__action--download"
                    leadingIcon="download"
                    onClick={() => (row.status === "failed" && onRetry ? onRetry(row) : onDownload?.(row))}
                    size="sm"
                    variant="secondary"
                  >
                    Baixar
                  </Button>
                </ButtonGroup>
              );
            }
          }
        ]}
        density="dense"
        emptyState={emptyState ?? <EmptyState title="Nenhuma fatura encontrada" />}
        error={error}
        loading={loading}
        onRowClick={onRowClick}
        rows={rows}
      />
    </Card>
  );
}

export interface BillingInvoiceEntitlement {
  id: string;
  icon: IconName;
  label: React.ReactNode;
}

export interface BillingInvoicesWorkspaceProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  currentTitle?: React.ReactNode;
  amount?: React.ReactNode;
  statusLabel?: React.ReactNode;
  dueLabel?: React.ReactNode;
  periodLabel?: React.ReactNode;
  methodLabel?: React.ReactNode;
  entitlements?: BillingInvoiceEntitlement[];
  rows?: InvoiceRow[];
  loading?: boolean;
  error?: React.ReactNode;
  blockedReason?: string;
  onPayCurrent?: () => void;
  onOpenCurrent?: () => void;
  onDownloadCurrent?: () => void;
  onRowClick?: (row: InvoiceRow) => void;
  onOpenInvoice?: (row: InvoiceRow) => void;
  onDownloadInvoice?: (row: InvoiceRow) => void;
  onRetryInvoice?: (row: InvoiceRow) => void;
}

const billingInvoiceEntitlements: BillingInvoiceEntitlement[] = [
  { id: "plan", icon: "users", label: "Plano 7 agentes" },
  { id: "messages", icon: "message", label: "15.000 mensagens/mês" },
  { id: "support", icon: "headphones", label: "Suporte Taliya" }
];

export function BillingInvoicesWorkspace({
  currentTitle = "Fatura atual",
  amount = "R$ 799,00",
  statusLabel = "Em aberto",
  dueLabel = "Vence em 12/06",
  periodLabel = "Período: Junho/2026",
  methodLabel = "Método: Cartão final 4242",
  entitlements = billingInvoiceEntitlements,
  rows,
  loading = false,
  error,
  blockedReason,
  onPayCurrent,
  onOpenCurrent,
  onDownloadCurrent,
  onRowClick,
  onOpenInvoice,
  onDownloadInvoice,
  onRetryInvoice,
  className,
  ...props
}: BillingInvoicesWorkspaceProps) {
  return (
    <section className={cn("tcrm-billing-invoices-workspace", className)} data-component="BillingInvoicesWorkspace" {...props}>
      <Card className="tcrm-billing-invoices-workspace__current">
        <header>
          <small>{currentTitle}</small>
          <div><strong>{amount}</strong><Chip showDot={false} tone="warning">{statusLabel}</Chip></div>
        </header>

        <div className="tcrm-billing-invoices-workspace__facts">
          <span><Icon name="calendar" />{dueLabel}</span>
          <span><Icon name="calendar" />{periodLabel}</span>
          <span><Icon name="creditCard" />{methodLabel}</span>
        </div>

        <div className="tcrm-billing-invoices-workspace__entitlements" role="list">
          {entitlements.map((entitlement) => (
            <div key={entitlement.id} role="listitem">
              <ListIcon icon={entitlement.icon} tone="info" />
              <span>{entitlement.label}</span>
            </div>
          ))}
        </div>

        <footer>
          <Button blockedReason={blockedReason} loading={loading} onClick={onPayCurrent} variant="primary">Pagar agora</Button>
          <Button blockedReason={blockedReason} leadingIcon="fileText" onClick={onOpenCurrent} variant="secondary">Abrir fatura</Button>
          <Button blockedReason={blockedReason} leadingIcon="download" onClick={onDownloadCurrent} variant="secondary">Baixar PDF</Button>
        </footer>
      </Card>

      <InvoiceTable
        blockedReason={blockedReason}
        error={error}
        loading={loading}
        onDownload={onDownloadInvoice}
        onOpen={onOpenInvoice}
        onRetry={onRetryInvoice}
        onRowClick={onRowClick}
        rows={rows}
      />
    </section>
  );
}

export type AddOnCardState = "available" | "active" | "plan-max" | "consult" | "unavailable";

interface AddOnCardStateDefaults {
  title: React.ReactNode;
  description: React.ReactNode;
  meta: React.ReactNode;
  statusLabel: React.ReactNode;
  icon: IconName;
  actionLabel: React.ReactNode;
  actionVariant: ButtonVariant;
  statusTone: ComponentTone;
}

export interface AddOnCardProps extends Omit<CrmSurfaceProps, "state" | "action"> {
  state?: AddOnCardState;
  action?: React.ReactNode;
  actionLabel?: React.ReactNode;
  actionVariant?: ButtonVariant;
  loading?: boolean;
  blockedReason?: string;
  onAction?: (state: AddOnCardState) => void;
}

const addOnCardDefaultsByState: Record<AddOnCardState, AddOnCardStateDefaults> = {
  active: {
    title: "Pacote extra de mensagens",
    description: "+5.000 mensagens no ciclo atual.",
    meta: "Pacote ativo na assinatura atual.",
    statusLabel: "Ativo",
    icon: "messageSquareText",
    actionLabel: "Gerenciar pacote",
    actionVariant: "secondary",
    statusTone: "success"
  },
  available: {
    title: "Pacote extra de mensagens",
    description: "+5.000 mensagens no ciclo atual.",
    meta: "Entra após confirmação do billing.",
    statusLabel: "Disponível",
    icon: "messageSquareText",
    actionLabel: "Adicionar pacote",
    actionVariant: "primary",
    statusTone: "success"
  },
  consult: {
    title: "Cota personalizada",
    description: <>Para studios com alto volume<br />ou várias unidades.</>,
    meta: <>A equipe Taliya revisa a necessidade<br />com você.</>,
    statusLabel: "Sob consulta",
    icon: "pieChart",
    actionLabel: "Falar com suporte",
    actionVariant: "secondary",
    statusTone: "info"
  },
  "plan-max": {
    title: "Mais agentes",
    description: "Seu plano já inclui os 7 agentes.",
    meta: <>Para revisar uma condição especial,<br />fale com suporte.</>,
    statusLabel: "Plano máximo",
    icon: "users",
    actionLabel: "Falar com suporte",
    actionVariant: "secondary",
    statusTone: "warning"
  },
  unavailable: {
    title: "Mais agentes",
    description: "Seu plano já inclui os 7 agentes.",
    meta: <>Para revisar uma condição especial,<br />fale com suporte.</>,
    statusLabel: "Plano máximo",
    icon: "users",
    actionLabel: "Falar com suporte",
    actionVariant: "secondary",
    statusTone: "warning"
  }
};

function addOnCardStatusClass(state: AddOnCardState) {
  if (state === "plan-max" || state === "unavailable") return "plan";
  return state;
}

function addOnCardAccessibleText(value: React.ReactNode, fallback: React.ReactNode) {
  const resolved = value ?? fallback;
  return typeof resolved === "string" || typeof resolved === "number" ? String(resolved) : "add-on";
}

export function AddOnCard({
  title,
  description,
  meta,
  statusLabel,
  icon,
  state = "available",
  action,
  actionLabel,
  actionVariant,
  loading = false,
  blockedReason,
  onAction,
  className,
  ...props
}: AddOnCardProps) {
  const defaults = addOnCardDefaultsByState[state];
  const resolvedTitle = title ?? defaults.title;
  const resolvedDescription = description ?? defaults.description;
  const resolvedMeta = meta ?? defaults.meta;
  const resolvedStatusLabel = statusLabel ?? defaults.statusLabel;
  const resolvedIcon = icon ?? defaults.icon;
  const resolvedActionLabel = actionLabel ?? defaults.actionLabel;
  const resolvedActionVariant = actionVariant ?? defaults.actionVariant;
  const titleId = React.useId();
  const accessibleTitle = addOnCardAccessibleText(resolvedTitle, defaults.title);

  return (
    <Card
      aria-labelledby={titleId}
      className={cn("tcrm-addon-card", className)}
      data-component="AddOnCard"
      data-state={state}
      {...props}
    >
      <span className="tcrm-addon-card__icon" aria-hidden="true">
        <Icon name={resolvedIcon} />
      </span>
      <h3 className="tcrm-addon-card__title" id={titleId}>{resolvedTitle}</h3>
      <Chip className={cn("tcrm-addon-card__status", `tcrm-addon-card__status--${addOnCardStatusClass(state)}`)} showDot={false} tone={defaults.statusTone}>
        {resolvedStatusLabel}
      </Chip>
      <p className="tcrm-addon-card__description">{resolvedDescription}</p>
      <small className="tcrm-addon-card__meta">{resolvedMeta}</small>
      {action ?? (
        <Button
          aria-label={`${resolvedActionLabel} - ${accessibleTitle}`}
          blockedReason={blockedReason}
          className={cn("tcrm-addon-card__action", `tcrm-addon-card__action--${resolvedActionVariant}`)}
          loading={loading}
          onClick={() => onAction?.(state)}
          size="sm"
          variant={resolvedActionVariant}
        >
          {resolvedActionLabel}
        </Button>
      )}
    </Card>
  );
}

export interface BillingAddOnOption {
  id: string;
  state: AddOnCardState;
  title?: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  statusLabel?: React.ReactNode;
  icon?: IconName;
  actionLabel?: React.ReactNode;
  actionVariant?: ButtonVariant;
}

export interface BillingAddOnsWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  activeTitle?: React.ReactNode;
  activeEmptyTitle?: React.ReactNode;
  activeEmptyDescription?: React.ReactNode;
  availableTitle?: React.ReactNode;
  activeAddOns?: BillingAddOnOption[];
  availableAddOns?: BillingAddOnOption[];
  loading?: boolean;
  error?: React.ReactNode;
  blockedReason?: string;
  onAddOnAction?: (option: BillingAddOnOption) => void;
}

const billingAvailableAddOns: BillingAddOnOption[] = [
  { id: "messages", state: "available" },
  { id: "agents", state: "plan-max" },
  { id: "quota", state: "consult" }
];

function BillingAddOnGrid({
  addOns,
  blockedReason,
  loading,
  onAddOnAction
}: {
  addOns: BillingAddOnOption[];
  blockedReason?: string;
  loading?: boolean;
  onAddOnAction?: (option: BillingAddOnOption) => void;
}) {
  return (
    <div className="tcrm-billing-addons-workspace__grid">
      {addOns.map((option) => (
        <AddOnCard
          actionLabel={option.actionLabel}
          actionVariant={option.actionVariant}
          blockedReason={blockedReason}
          description={option.description}
          icon={option.icon}
          key={option.id}
          loading={loading}
          meta={option.meta}
          onAction={() => onAddOnAction?.(option)}
          state={option.state}
          statusLabel={option.statusLabel}
          title={option.title}
        />
      ))}
    </div>
  );
}

export function BillingAddOnsWorkspace({
  activeTitle = "Add-ons ativos",
  activeEmptyTitle = "Nenhum add-on ativo",
  activeEmptyDescription = "Quando um pacote extra for contratado, ele aparece aqui.",
  availableTitle = "Disponíveis",
  activeAddOns = [],
  availableAddOns = billingAvailableAddOns,
  loading = false,
  error,
  blockedReason,
  onAddOnAction,
  className,
  ...props
}: BillingAddOnsWorkspaceProps) {
  return (
    <section className={cn("tcrm-billing-addons-workspace", className)} data-component="BillingAddOnsWorkspace" {...props}>
      <Card className="tcrm-billing-addons-workspace__active">
        <h2>{activeTitle}</h2>
        {error ? (
          <ErrorState description={error} title="Não foi possível carregar os add-ons" />
        ) : loading && activeAddOns.length === 0 ? (
          <LoadingState title="Carregando add-ons ativos" />
        ) : activeAddOns.length > 0 ? (
          <BillingAddOnGrid addOns={activeAddOns} blockedReason={blockedReason} loading={loading} onAddOnAction={onAddOnAction} />
        ) : (
          <EmptyState
            className="tcrm-billing-addons-workspace__empty"
            description={activeEmptyDescription}
            icon="package"
            title={String(activeEmptyTitle)}
          />
        )}
      </Card>

      <Card className="tcrm-billing-addons-workspace__available">
        <h2>{availableTitle}</h2>
        <BillingAddOnGrid addOns={availableAddOns} blockedReason={blockedReason} loading={loading} onAddOnAction={onAddOnAction} />
      </Card>
    </section>
  );
}

export type QuotaProgressState = "normal" | 70 | 90 | 100;
export type QuotaProgressAction = "ledger" | "add-ons";

export interface QuotaProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  value?: number;
  state?: QuotaProgressState;
  label?: string;
  title?: React.ReactNode;
  totalLabel?: React.ReactNode;
  unitLabel?: React.ReactNode;
  usedLabel?: React.ReactNode;
  remainingLabel?: React.ReactNode;
  badgeLabel?: string;
  alertLabel?: React.ReactNode;
  ledgerLabel?: React.ReactNode;
  addOnsLabel?: React.ReactNode;
  loading?: boolean | QuotaProgressAction;
  disabled?: boolean;
  blockedReason?: string;
  onAction?: (action: QuotaProgressAction) => void;
  onViewLedger?: () => void;
  onViewAddOns?: () => void;
}

function quotaProgressStateFromValue(value: number): QuotaProgressState {
  if (value >= 100) return 100;
  if (value >= 90) return 90;
  if (value >= 70) return 70;
  return "normal";
}

function quotaProgressTone(state: QuotaProgressState): "info" | "warning" | "danger" {
  if (state === 100) return "danger";
  if (state === 90) return "warning";
  return "info";
}

export function QuotaProgress({
  value = 42,
  state,
  label = "Uso da cota no ciclo",
  title = "Cota do ciclo",
  totalLabel = "15.000",
  unitLabel = "mensagens/mês",
  usedLabel = "6.300 usadas",
  remainingLabel = "8.700 restantes",
  badgeLabel,
  alertLabel = "Próximo alerta em 70%.",
  ledgerLabel = "Ver extrato",
  addOnsLabel = "Ver add-ons",
  loading = false,
  disabled = false,
  blockedReason,
  onAction,
  onViewLedger,
  onViewAddOns,
  className,
  ...props
}: QuotaProgressProps) {
  const normalizedValue = Math.max(0, Math.min(100, Math.round(value)));
  const resolvedState = state ?? quotaProgressStateFromValue(normalizedValue);
  const progressTone = quotaProgressTone(resolvedState);
  const isLedgerLoading = loading === true || loading === "ledger";
  const isAddOnsLoading = loading === true || loading === "add-ons";

  const handleLedger = () => {
    onViewLedger?.();
    onAction?.("ledger");
  };
  const handleAddOns = () => {
    onViewAddOns?.();
    onAction?.("add-ons");
  };

  return (
    <Card
      aria-busy={loading ? true : undefined}
      className={cn("tcrm-quota-progress", className)}
      data-component="QuotaProgress"
      data-state={resolvedState}
      style={{ "--tcrm-quota-progress-value": `${normalizedValue}%` } as React.CSSProperties}
      {...props}
    >
      <h3 className="tcrm-quota-progress__title">{title}</h3>
      <div className="tcrm-quota-progress__headline">
        <strong>{totalLabel}</strong>
        <span>{unitLabel}</span>
      </div>
      <div className="tcrm-quota-progress__usage-labels">
        <span>{usedLabel}</span>
        <span>{remainingLabel}</span>
      </div>
      <div className="tcrm-quota-progress__progress-wrap">
        <ProgressBar className="tcrm-quota-progress__progress" label={label} tone={progressTone} value={normalizedValue} />
        <span aria-hidden="true" className="tcrm-quota-progress__progress-value">{normalizedValue}%</span>
      </div>
      <div className="tcrm-quota-progress__status-row">
        <QuotaBadge className="tcrm-quota-progress__badge" label={badgeLabel} value={resolvedState} />
        <span className="tcrm-quota-progress__helper">{alertLabel}</span>
      </div>
      <span aria-hidden="true" className="tcrm-quota-progress__message-box">
        <span className="tcrm-quota-progress__message-bubble">
          <span />
          <span />
          <span />
        </span>
      </span>
      <div className="tcrm-quota-progress__actions">
        <Button
          blockedReason={blockedReason}
          className="tcrm-quota-progress__action tcrm-quota-progress__action--ledger"
          disabled={disabled}
          loading={isLedgerLoading}
          onClick={handleLedger}
          variant="secondary"
        >
          {ledgerLabel}
        </Button>
        <Button
          blockedReason={blockedReason}
          className="tcrm-quota-progress__action tcrm-quota-progress__action--addons"
          disabled={disabled}
          loading={isAddOnsLoading}
          onClick={handleAddOns}
          variant="primary"
        >
          {addOnsLabel}
        </Button>
      </div>
    </Card>
  );
}

export interface UsageOverviewOrigin {
  id: string;
  origin: UsageOriginRowOrigin;
  title?: React.ReactNode;
  amount?: React.ReactNode;
  percent?: number;
  visualPercent?: number;
  icon?: IconName;
}

export interface UsageOverviewStatusItem {
  id: string;
  title: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
}

export interface UsageOverviewWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  quota?: Omit<QuotaProgressProps, "onAction" | "onViewLedger" | "onViewAddOns">;
  origins?: UsageOverviewOrigin[];
  alerts?: UsageOverviewStatusItem[];
  affected?: UsageOverviewStatusItem[];
  originFooter?: React.ReactNode;
  flowsLabel?: React.ReactNode;
  loading?: boolean;
  error?: string;
  blockedReason?: string;
  onViewLedger?: () => void;
  onViewAddOns?: () => void;
  onOriginSelect?: (origin: UsageOriginRowOrigin, state: UsageOriginRowState) => void;
  onViewFlows?: () => void;
}

const usageOverviewOrigins: UsageOverviewOrigin[] = [
  { id: "attendance", origin: "attendance" },
  { id: "agenda", origin: "agenda" },
  { id: "sales", origin: "sales" },
  { id: "finance", origin: "finance" },
  { id: "other", origin: "other" }
];

const usageOverviewAlerts: UsageOverviewStatusItem[] = [
  { id: "clear", title: "Nenhum alerta crítico", icon: "checkCircle", tone: "success" },
  { id: "economy", title: "Economia entra automaticamente em 90%.", icon: "percent", tone: "info" },
  { id: "pause", title: <>Automação paga pausa em 100%;<br />CRM manual continua.</>, icon: "pause", tone: "info" }
];

const usageOverviewAffected: UsageOverviewStatusItem[] = [
  { id: "flows", title: "Nenhum fluxo pausado por cota", icon: "checkCircle", tone: "success" },
  { id: "downgrade", title: "Nenhum downgrade ativo", icon: "checkCircle", tone: "success" }
];

function UsageOverviewStatusRows({ items }: { items: UsageOverviewStatusItem[] }) {
  return (
    <div className="tcrm-usage-overview-workspace__status-rows" role="list">
      {items.map((item) => (
        <div key={item.id} role="listitem">
          <ListIcon icon={item.icon ?? "checkCircle"} tone={item.tone ?? "info"} />
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export function UsageOverviewWorkspace({
  quota,
  origins = usageOverviewOrigins,
  alerts = usageOverviewAlerts,
  affected = usageOverviewAffected,
  originFooter = "Distribuição do uso no ciclo atual.",
  flowsLabel = "Ver fluxos",
  loading = false,
  error,
  blockedReason,
  onViewLedger,
  onViewAddOns,
  onOriginSelect,
  onViewFlows,
  className,
  ...props
}: UsageOverviewWorkspaceProps) {
  const blocked = Boolean(blockedReason);

  if (error) {
    return (
      <section className={cn("tcrm-usage-overview-workspace", className)} data-component="UsageOverviewWorkspace" {...props}>
        <ErrorState className="tcrm-usage-overview-workspace__state" description={error} title="Não foi possível carregar o uso" />
      </section>
    );
  }

  return (
    <section
      aria-busy={loading || undefined}
      className={cn("tcrm-usage-overview-workspace", className)}
      data-component="UsageOverviewWorkspace"
      data-state={blocked ? "blocked" : loading ? "loading" : "source"}
      {...props}
    >
      <QuotaProgress
        {...quota}
        blockedReason={blockedReason ?? quota?.blockedReason}
        disabled={blocked || quota?.disabled}
        loading={loading ? true : quota?.loading}
        onViewAddOns={onViewAddOns}
        onViewLedger={onViewLedger}
      />

      <div className="tcrm-usage-overview-workspace__lower">
        <Card className="tcrm-usage-overview-workspace__origins">
          <h2>Origem do consumo</h2>
          {loading ? (
            <LoadingState title="Carregando origens" />
          ) : (
            <div className="tcrm-usage-overview-workspace__origin-rows">
              {origins.map((item) => (
                <UsageOriginRow
                  key={item.id}
                  amount={item.amount}
                  icon={item.icon}
                  onSelect={onOriginSelect}
                  origin={item.origin}
                  percent={item.percent}
                  state={blocked ? "blocked" : "source"}
                  title={item.title}
                  visualPercent={item.visualPercent}
                />
              ))}
            </div>
          )}
          <p>{originFooter}</p>
        </Card>

        <div className="tcrm-usage-overview-workspace__status-stack">
          <Card className="tcrm-usage-overview-workspace__alerts">
            <h2>Alertas e economia</h2>
            {loading ? <LoadingState title="Carregando alertas" /> : <UsageOverviewStatusRows items={alerts} />}
          </Card>
          <Card className="tcrm-usage-overview-workspace__affected">
            <h2>O que foi afetado</h2>
            {loading ? <LoadingState title="Carregando impactos" /> : <UsageOverviewStatusRows items={affected} />}
            <Button blockedReason={blockedReason} disabled={blocked || loading} onClick={onViewFlows} variant="secondary">{flowsLabel}</Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

export interface BillingSubscriptionAgent {
  id: string;
  label: React.ReactNode;
  icon: IconName;
}

export type BillingSubscriptionWorkspaceState = "active" | "failed" | "expired" | "loading" | "blocked";

export interface BillingSubscriptionWorkspaceProps extends React.HTMLAttributes<HTMLElement> {
  agents?: BillingSubscriptionAgent[];
  state?: BillingSubscriptionWorkspaceState;
  blockedReason?: string;
  onChangePlan?: () => void;
  onViewPlanDetails?: () => void;
  onOpenAgents?: () => void;
  onViewUsage?: () => void;
  onViewInvoices?: () => void;
  onUpdatePayment?: () => void;
  onViewAddOns?: () => void;
  onSupport?: () => void;
}

const billingSubscriptionAgents: BillingSubscriptionAgent[] = [
  { id: "support", label: "Atendimento", icon: "message" },
  { id: "agenda", label: "Agenda", icon: "calendar" },
  { id: "sales", label: "Vendas", icon: "trendingUp" },
  { id: "finance", label: "Financeiro", icon: "wallet" },
  { id: "retention", label: "Retenção", icon: "shield" },
  { id: "management", label: "Gestão/Governança", icon: "shieldStar" },
  { id: "history", label: "Histórico/Evolução", icon: "book" }
];

export function BillingSubscriptionWorkspace({
  agents = billingSubscriptionAgents,
  state = "active",
  blockedReason,
  onChangePlan,
  onViewPlanDetails,
  onOpenAgents,
  onViewUsage,
  onViewInvoices,
  onUpdatePayment,
  onViewAddOns,
  onSupport,
  className,
  ...props
}: BillingSubscriptionWorkspaceProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const isPaymentIssue = state === "failed" || state === "expired";
  const resolvedBlockedReason = isBlocked ? blockedReason ?? "Assinatura indisponível para esta conta." : undefined;
  const invoiceStatus = state === "failed" ? "Pagamento falhou" : state === "expired" ? "Expirada" : "Em aberto";
  const invoiceTone: ComponentTone = isPaymentIssue ? "danger" : "warning";

  if (isLoading) {
    return (
      <section aria-busy="true" className={cn("tcrm-billing-subscription-workspace", className)} data-component="BillingSubscriptionWorkspace" data-state={state} {...props}>
        <LoadingState title="Carregando assinatura" />
      </section>
    );
  }

  if (isBlocked) {
    return (
      <section className={cn("tcrm-billing-subscription-workspace", className)} data-component="BillingSubscriptionWorkspace" data-state={state} {...props}>
        <ErrorState description={resolvedBlockedReason} title="Assinatura indisponível" />
      </section>
    );
  }

  return (
    <section className={cn("tcrm-billing-subscription-workspace", className)} data-component="BillingSubscriptionWorkspace" data-state={state} {...props}>
      <div className="tcrm-billing-subscription-workspace__main">
        <PlanSummaryCard
          badgeLabel={state === "failed" ? "Pagamento falhou" : state === "expired" ? "Assinatura expirada" : undefined}
          className="tcrm-billing-subscription-workspace__plan"
          onChangePlan={onChangePlan}
          onViewDetails={onViewPlanDetails}
          state={isPaymentIssue ? "failed" : "active"}
          title={state === "failed" ? "Pagamento da assinatura falhou" : state === "expired" ? "Assinatura expirada" : undefined}
        />

        <Card className="tcrm-billing-subscription-workspace__agents">
          <header><small>Agentes inclusos</small><h3>7 de 7 agentes inclusos</h3></header>
          <div role="list">
            {agents.map((agent) => <div key={agent.id} role="listitem"><ListIcon icon={agent.icon} tone="info" /><span>{agent.label}</span></div>)}
          </div>
          <Button disabled={isPaymentIssue} onClick={onOpenAgents} variant="secondary">Abrir Agentes</Button>
        </Card>

        <div className="tcrm-billing-subscription-workspace__billing">
          <QuotaProgress
            addOnsLabel=""
            alertLabel="Uso detalhado fica em Uso e cotas."
            className="tcrm-billing-subscription-workspace__quota"
            ledgerLabel="Ver uso e cotas"
            disabled={isPaymentIssue}
            onViewLedger={onViewUsage}
          />
          <Card className="tcrm-billing-subscription-workspace__invoice">
            <small>Próxima fatura</small>
            <h3>R$ 799,00</h3>
            <div><span>{state === "expired" ? "Venceu em 12/06" : "Vence em 12/06"}</span><Chip showDot={false} tone={invoiceTone}>{invoiceStatus}</Chip></div>
            <p><Icon name="creditCard" /> Cartão final 4242</p>
            <footer><Button onClick={onViewInvoices} size="sm" variant="secondary">Ver faturas</Button><Button onClick={onUpdatePayment} size="sm" variant={isPaymentIssue ? "primary" : "secondary"}>Atualizar pagamento</Button></footer>
          </Card>
        </div>
      </div>

      <Card className="tcrm-billing-subscription-workspace__addons">
        <small>Add-ons ativos</small>
        <div><ListIcon icon="shoppingCart" tone="info" /><span><strong>Nenhum add-on ativo</strong><small>Pacotes extras aparecem aqui quando contratados.</small></span></div>
        <Button disabled={isPaymentIssue} onClick={onViewAddOns} variant="secondary">Ver add-ons</Button>
      </Card>

      <Card className="tcrm-billing-subscription-workspace__actions">
        <Button onClick={onViewInvoices} variant="primary">Ver faturas</Button>
        <Button onClick={onViewUsage} variant="secondary">Ver uso e cotas</Button>
        <Button onClick={onSupport} variant="secondary">Falar com suporte</Button>
      </Card>
    </section>
  );
}

export type UsageLedgerStatus = "consumed" | "estimated" | "reprocessed";
export type UsageLedgerOrigin = "whatsapp" | "ai" | "automation" | "import" | "adjustment";
export type UsageLedgerAction = "row" | "action" | "filter" | "load-more";

export interface UsageLedgerRow {
  id: string;
  when?: React.ReactNode;
  time?: React.ReactNode;
  origin?: UsageLedgerOrigin | React.ReactNode;
  originLabel?: React.ReactNode;
  agentFlow?: React.ReactNode;
  type?: React.ReactNode;
  caseLabel?: React.ReactNode;
  usage?: React.ReactNode;
  amount?: React.ReactNode;
  status?: UsageLedgerStatus;
  statusLabel?: React.ReactNode;
  actionLabel?: React.ReactNode;
  disabled?: boolean;
}

export interface UsageLedgerFilter {
  id: "period" | "agent" | "origin" | "status" | string;
  label: React.ReactNode;
  value: React.ReactNode;
  disabled?: boolean;
}

export interface CrmHeaderSummaryItem {
  id: string;
  icon: IconName;
  label: React.ReactNode;
  tone?: ComponentTone;
}

export interface CrmHeaderSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items?: CrmHeaderSummaryItem[];
  onSelect?: (item: CrmHeaderSummaryItem) => void;
  variant?: "ledger" | "overview" | "billing" | "billing-invoices";
}

const defaultCrmHeaderSummaryItems: CrmHeaderSummaryItem[] = [
  { id: "cycle", icon: "calendar", label: "Ciclo atual" },
  { id: "used", icon: "pieChart", label: "42% usado", tone: "info" },
  { id: "messages", icon: "message", label: "15.000 mensagens/mês" }
];

export function CrmHeaderSummary({ items = defaultCrmHeaderSummaryItems, onSelect, variant = "ledger", className, ...props }: CrmHeaderSummaryProps) {
  return (
    <ButtonGroup
      className={cn("tcrm-header-summary", "tcrm-usage-header-summary", `tcrm-header-summary--${variant}`, `tcrm-usage-header-summary--${variant}`, className)}
      data-component="CrmHeaderSummary"
      {...props}
    >
      {items.map((item) => (
        <Button
          className="tcrm-usage-header-summary__item"
          data-tone={item.tone ?? "neutral"}
          key={item.id}
          leadingIcon={item.icon}
          onClick={() => onSelect?.(item)}
          size="sm"
          type="button"
          variant="secondary"
        >
          {item.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

/** @deprecated Use CrmHeaderSummary. */
export const UsageHeaderSummary = CrmHeaderSummary;
/** @deprecated Use CrmHeaderSummaryItem. */
export type UsageHeaderSummaryItem = CrmHeaderSummaryItem;
/** @deprecated Use CrmHeaderSummaryProps. */
export type UsageHeaderSummaryProps = CrmHeaderSummaryProps;

export interface UsageLedgerTableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSelect"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  rows?: UsageLedgerRow[];
  filters?: UsageLedgerFilter[];
  footerLabel?: React.ReactNode;
  loadMoreLabel?: React.ReactNode;
  loading?: boolean;
  error?: React.ReactNode;
  emptyState?: React.ReactNode;
  disabled?: boolean;
  blockedReason?: string;
  onRowClick?: (row: UsageLedgerRow) => void;
  onAction?: (row: UsageLedgerRow, action: UsageLedgerAction) => void;
  onReprocess?: (row: UsageLedgerRow) => void;
  onFilterClick?: (filter: UsageLedgerFilter) => void;
  onLoadMore?: () => void;
}

const defaultUsageLedgerRows: UsageLedgerRow[] = [
  {
    id: "hoje-1558",
    when: "Hoje 15:58",
    origin: "whatsapp",
    agentFlow: "Agenda · Falta com aviso",
    caseLabel: "Júlia Martins · aula 18h30",
    usage: "1 mensagem",
    status: "consumed",
    statusLabel: "Consumido",
    actionLabel: "Abrir execução"
  },
  {
    id: "hoje-1532",
    when: "Hoje 15:32",
    origin: "ai",
    agentFlow: "Atendimento · Triagem de conversa",
    caseLabel: "Novo lead no WhatsApp",
    usage: "3 mensagens",
    status: "consumed",
    statusLabel: "Consumido",
    actionLabel: "Abrir conversa"
  },
  {
    id: "hoje-1420",
    when: "Hoje 14:20",
    origin: "whatsapp",
    agentFlow: "Vendas · Follow-up experimental",
    caseLabel: "Marina Costa",
    usage: "2 mensagens",
    status: "consumed",
    statusLabel: "Consumido",
    actionLabel: "Abrir caso"
  },
  {
    id: "ontem-1810",
    when: "Ontem 18:10",
    origin: "whatsapp",
    agentFlow: "Financeiro · Lembrete de cobrança",
    caseLabel: "Rafael Lima · mensalidade",
    usage: "1 mensagem",
    status: "consumed",
    statusLabel: "Consumido",
    actionLabel: "Abrir cobrança"
  },
  {
    id: "ontem-1745",
    when: "Ontem 17:45",
    origin: "ai",
    agentFlow: "Agenda · Correção de presença",
    caseLabel: "Aprovação preparada",
    usage: "1 estimada",
    status: "estimated",
    statusLabel: "Estimada",
    actionLabel: "Abrir aprovação"
  },
  {
    id: "ontem-1108",
    when: "Ontem 11:08",
    origin: "whatsapp",
    agentFlow: "Atendimento · Reenvio de mensagem",
    caseLabel: "Falha recuperada",
    usage: "1 mensagem",
    status: "reprocessed",
    statusLabel: "Reprocessado",
    actionLabel: "Abrir execução"
  }
];

const defaultUsageLedgerFilters: UsageLedgerFilter[] = [
  { id: "period", label: "Período", value: "Ciclo atual" },
  { id: "agent", label: "Agente", value: "Todos" },
  { id: "origin", label: "Origem", value: "Todas" },
  { id: "status", label: "Status", value: "Todos" }
];

function usageLedgerOriginKey(row: UsageLedgerRow): UsageLedgerOrigin {
  const raw = typeof row.origin === "string" ? row.origin : row.originLabel;
  const key = stateKey(raw);

  if (key.includes("whatsapp")) return "whatsapp";
  if (key === "ia" || key === "ai" || key.includes("inteligencia")) return "ai";
  if (key.includes("import")) return "import";
  if (key.includes("ajuste")) return "adjustment";
  return "automation";
}

function usageLedgerOriginLabel(row: UsageLedgerRow, key: UsageLedgerOrigin): React.ReactNode {
  if (row.originLabel) return row.originLabel;
  if (typeof row.origin === "string" && !["whatsapp", "ai", "automation", "import", "adjustment"].includes(row.origin)) return row.origin;
  if (key === "whatsapp") return "WhatsApp";
  if (key === "ai") return "IA";
  if (key === "import") return "Importação";
  if (key === "adjustment") return "Ajuste";
  return "Automação";
}

function usageLedgerStatusLabel(row: UsageLedgerRow): React.ReactNode {
  if (row.statusLabel) return row.statusLabel;
  if (row.status === "estimated") return "Estimado";
  if (row.status === "reprocessed") return "Reprocessado";
  return "Consumido";
}

function usageLedgerStatusTone(status?: UsageLedgerStatus): ComponentTone {
  if (status === "estimated") return "info";
  if (status === "reprocessed") return "neutral";
  return "success";
}

function UsageLedgerOriginCell({ row }: { row: UsageLedgerRow }) {
  const key = usageLedgerOriginKey(row);
  const icon = key === "whatsapp" ? "whatsapp" : "sparkles";

  return (
    <span className="tcrm-usage-ledger__origin" data-origin={key}>
      <span className="tcrm-usage-ledger__origin-icon" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <span>{usageLedgerOriginLabel(row, key)}</span>
    </span>
  );
}

export function UsageLedgerTable({
  title = "Lançamentos do ciclo",
  description = "Veja quando a cota foi consumida e qual caso gerou o uso.",
  rows = defaultUsageLedgerRows,
  filters = defaultUsageLedgerFilters,
  footerLabel = "Mostrando lançamentos do ciclo atual.",
  loadMoreLabel = "Carregar mais",
  onRowClick,
  onAction,
  onReprocess,
  onFilterClick,
  onLoadMore,
  loading = false,
  error,
  emptyState,
  disabled = false,
  blockedReason,
  className,
  ...props
}: UsageLedgerTableProps) {
  const controlsDisabled = disabled || Boolean(blockedReason) || loading;
  const hasRows = rows.length > 0;

  const handleRowClick = (row: UsageLedgerRow) => {
    onRowClick?.(row);
    onAction?.(row, "row");
  };

  const handleRowAction = (row: UsageLedgerRow, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAction?.(row, "action");
    onReprocess?.(row);
  };

  return (
    <Card
      aria-busy={loading || undefined}
      className={cn("tcrm-usage-ledger", className)}
      data-component="UsageLedgerTable"
      {...props}
    >
      <h3 className="tcrm-usage-ledger__title">{title}</h3>
      <p className="tcrm-usage-ledger__description">{description}</p>
      <FilterBar className="tcrm-usage-ledger__filters">
        {filters.map((filter, index) => (
          <Button
            aria-label={`Filtrar ${filter.label}: ${filter.value}`}
            blockedReason={blockedReason}
            className="tcrm-usage-ledger__filter"
            data-filter-index={index}
            disabled={disabled || filter.disabled || loading}
            key={filter.id}
            onClick={() => onFilterClick?.(filter)}
            size="sm"
            trailingIcon="chevronDown"
            variant="secondary"
          >
            {filter.label}: {filter.value}
          </Button>
        ))}
      </FilterBar>
      {error ? (
        <div className="tcrm-usage-ledger__state">
          <ErrorState description={error} title="Não foi possível carregar o extrato" />
        </div>
      ) : loading ? (
        <div className="tcrm-usage-ledger__state">
          <LoadingState title="Carregando extrato" variant="skeleton" />
        </div>
      ) : hasRows ? (
        <DataTable
          className="tcrm-usage-ledger__table"
          columns={[
            { key: "when", header: "Quando", render: (row: UsageLedgerRow) => row.when ?? row.time },
            { key: "origin", header: "Origem", render: (row: UsageLedgerRow) => <UsageLedgerOriginCell row={row} /> },
            { key: "agentFlow", header: "Agente / fluxo", render: (row: UsageLedgerRow) => row.agentFlow ?? row.type },
            { key: "caseLabel", header: "Caso" },
            { key: "usage", header: "Uso", render: (row: UsageLedgerRow) => row.usage ?? row.amount },
            {
              key: "status",
              header: "Status",
              render: (row: UsageLedgerRow) => (
                <Chip className={`tcrm-usage-ledger__status tcrm-usage-ledger__status--${row.status ?? "consumed"}`} showDot={false} tone={usageLedgerStatusTone(row.status)}>
                  {usageLedgerStatusLabel(row)}
                </Chip>
              )
            },
            {
              key: "actionLabel",
              header: "Ação",
              render: (row: UsageLedgerRow) => (
                <Button
                  aria-label={`${row.actionLabel ?? "Abrir execução"} - ${row.caseLabel ?? row.id}`}
                  className="tcrm-usage-ledger__action"
                  disabled={controlsDisabled || row.disabled}
                  onClick={(event) => handleRowAction(row, event)}
                  size="sm"
                  variant="ghost"
                >
                  {row.actionLabel ?? "Abrir execução"}
                </Button>
              )
            }
          ]}
          density="dense"
          onRowClick={onRowClick || onAction ? handleRowClick : undefined}
          rows={rows}
        />
      ) : (
        <div className="tcrm-usage-ledger__state">
          {emptyState ?? <EmptyState title="Nenhum lançamento encontrado" description="Os lançamentos do ciclo aparecem aqui quando houver consumo." />}
        </div>
      )}
      <div className="tcrm-usage-ledger__footer">
        <span>{footerLabel}</span>
        <Button
          blockedReason={blockedReason}
          className="tcrm-usage-ledger__load-more"
          disabled={disabled || loading}
          onClick={onLoadMore}
          size="sm"
          variant="secondary"
        >
          {loadMoreLabel}
        </Button>
      </div>
    </Card>
  );
}

export type ApprovalPanelState = "pending" | "approved" | "rejected" | "expired" | "loading" | "blocked";
export type ApprovalPanelAction = "approve" | "edit" | "reject" | "request-data" | "open-origin" | "close";
export type ApprovalPanelLayout = "detail" | "compact";

export interface ApprovalPanelFact {
  id: string;
  icon?: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  valueIcon?: IconName;
  dotTone?: "pending" | "approved" | "rejected" | "expired" | "low" | "medium" | "high";
  valueTone?: "default" | "whatsapp" | "copilot" | "danger";
}

export interface ApprovalPanelSection {
  id: string;
  title: React.ReactNode;
  body: React.ReactNode;
  badge?: React.ReactNode;
  variant?: "text" | "suggestion";
}

export interface ApprovalPanelTimelineItem {
  id: string;
  time: React.ReactNode;
  label: React.ReactNode;
}

export interface ApprovalPanelRecentComment {
  author: React.ReactNode;
  time: React.ReactNode;
  body: React.ReactNode;
  avatarSrc?: string;
}

export interface ApprovalPanelProps extends Omit<CrmSurfaceProps, "state" | "title" | "children"> {
  state?: ApprovalPanelState;
  layout?: ApprovalPanelLayout;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  facts?: ApprovalPanelFact[];
  sections?: ApprovalPanelSection[];
  timeline?: ApprovalPanelTimelineItem[];
  recentComment?: ApprovalPanelRecentComment;
  onAction?: (action: ApprovalPanelAction) => void;
  onApprove?: () => void;
  onEdit?: () => void;
  onReject?: () => void;
  onRequestData?: () => void;
  onOpenOrigin?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  blockedReason?: string;
  proposalLabel?: React.ReactNode;
  proposal?: React.ReactNode;
  channelLabel?: React.ReactNode;
  channel?: React.ReactNode;
  scheduledLabel?: React.ReactNode;
  scheduledFor?: React.ReactNode;
}

const approvalPanelDefaultSections: ApprovalPanelSection[] = [
  {
    id: "context",
    title: "Contexto resumido",
    body: "Ana Paula pediu reagendamento da visita técnica para quinta-feira pela manhã. O agente preparou uma resposta para confirmar o novo horário e coletar o endereço completo."
  },
  {
    id: "proposal",
    title: "Proposta principal",
    badge: "Sugestão do copiloto",
    variant: "suggestion",
    body: "Olá Ana Paula! Consigo reagendar sua visita para quinta-feira às 09h. Pode me confirmar seu endereço completo para registro?"
  },
  {
    id: "before",
    title: "Antes da decisão",
    body: "Visita permanece no horário anterior e a conversa aguarda validação humana."
  },
  {
    id: "after",
    title: "Depois da decisão",
    body: "A mensagem confirma a nova janela e solicita os dados necessários para concluir o reagendamento."
  },
  {
    id: "impact",
    title: "Impacto esperado",
    body: "Libera continuidade do atendimento, mantém SLA da conversa e consome 1 crédito."
  },
  {
    id: "reason",
    title: "Motivo da decisão",
    body: "A alteração atende ao pedido da cliente sem violar a política de confirmação de endereço."
  },
  {
    id: "policy",
    title: "Política / guardrail aplicado",
    body: "Mensagens externas geradas por agente exigem validação humana antes do envio. Agente não aprova sozinho."
  }
];

const approvalPanelDefaultTimeline: ApprovalPanelTimelineItem[] = [
  { id: "requested", time: "09:12", label: "Cliente solicitou reagendamento" },
  { id: "suggested", time: "09:16", label: "Copiloto sugeriu resposta" },
  { id: "created", time: "09:18", label: "Aprovação criada" }
];

const approvalPanelDefaultComment: ApprovalPanelRecentComment = {
  author: "Sam Frank",
  time: "Hoje, 09:20",
  body: "Pode seguir se mantiver o tom cordial e não confirmar sem endereço."
};

function approvalPanelStatus(state: ApprovalPanelState) {
  switch (state) {
    case "approved":
      return { label: "Aprovada", dotTone: "approved" as const, title: "Mensagem aprovada para Ana Paula", primary: "Aprovado" };
    case "rejected":
      return { label: "Rejeitada", dotTone: "rejected" as const, title: "Mensagem rejeitada para Ana Paula", primary: "Aprovar" };
    case "expired":
      return { label: "Expirada", dotTone: "expired" as const, title: "Aprovação expirada para Ana Paula", primary: "Aprovar" };
    case "blocked":
      return { label: "Bloqueada", dotTone: "expired" as const, title: "Aprovar mensagem para Ana Paula", primary: "Aprovar" };
    case "loading":
    case "pending":
    default:
      return { label: "Pendente", dotTone: "pending" as const, title: "Aprovar mensagem para Ana Paula", primary: "Aprovar" };
  }
}

function approvalPanelFacts(state: ApprovalPanelState): ApprovalPanelFact[] {
  const status = approvalPanelStatus(state);
  const deadline = state === "expired" ? (
    <>
      <span className="tcrm-approval-panel__value-danger">Expirou</span>
      <span>09:30</span>
    </>
  ) : (
    <>
      <span className="tcrm-approval-panel__value-danger">Hoje</span>
      <span>09:30</span>
    </>
  );

  return [
    { id: "status", icon: "clipboard", label: "Status", value: status.label, dotTone: status.dotTone },
    { id: "type", icon: "clipboardCheck", label: "Tipo", value: "Mensagem", valueIcon: "message" },
    { id: "origin", icon: "clipboard", label: "Origem canônica", value: "WhatsApp / Agente de atendimento", valueIcon: "whatsapp", valueTone: "whatsapp" },
    { id: "agent", icon: "clipboard", label: "Solicitante / agente", value: "Copiloto de atendimento", valueIcon: "sparkles", valueTone: "copilot" },
    { id: "risk", icon: "clock", label: "Risco", value: "Baixo", dotTone: "low" },
    { id: "quota", icon: "coins", label: "Custo / cota", value: "1 crédito" },
    { id: "deadline", icon: "clock", label: "Prazo", value: deadline }
  ];
}

function emitApprovalAction(action: ApprovalPanelAction, onAction?: (action: ApprovalPanelAction) => void, handler?: () => void) {
  handler?.();
  onAction?.(action);
}

export function ApprovalPanel({
  state = "pending",
  layout = "detail",
  title,
  eyebrow = "Aprovação",
  facts,
  sections = approvalPanelDefaultSections,
  timeline = approvalPanelDefaultTimeline,
  recentComment = approvalPanelDefaultComment,
  onAction,
  onApprove,
  onEdit,
  onReject,
  onRequestData,
  onOpenOrigin,
  onClose,
  blockedReason,
  disabled,
  proposalLabel = "Ação proposta pelo agente",
  proposal = "Enviar mensagem de confirmação de visita técnica para Ana Paula Santos.",
  channelLabel = "Canal:",
  channel = "WhatsApp",
  scheduledLabel = "Programado para:",
  scheduledFor = "Hoje, 09:30",
  className,
  ...props
}: ApprovalPanelProps) {
  const status = approvalPanelStatus(state);
  const approvalFacts = facts ?? approvalPanelFacts(state);
  const locked = disabled || Boolean(blockedReason) || ["approved", "rejected", "expired", "blocked"].includes(state);
  const loading = state === "loading";

  if (layout === "compact") {
    return (
      <Card
        aria-busy={loading || undefined}
        aria-label="Aprovação da ação"
        className={cn("tcrm-approval-panel", "tcrm-approval-panel--compact", `tcrm-approval-panel--${stateKey(state)}`, className)}
        data-component="ApprovalPanel"
        data-layout="compact"
        data-state={state}
        role="region"
        {...props}
      >
        {loading ? (
          <LoadingState className="tcrm-approval-panel__compact-state" title="Carregando aprovação" variant="panel" />
        ) : state === "blocked" ? (
          <InlineAlert className="tcrm-approval-panel__compact-state" tone="warning" title="Aprovação bloqueada">
            {blockedReason ?? "Esta ação exige uma revisão antes da decisão."}
          </InlineAlert>
        ) : (
          <>
            <header className="tcrm-approval-panel__compact-header">
              <Icon name="fingerprint" size="var(--taliya-control-crm-approval-panel-compact-icon-size)" />
              <h2>{proposalLabel}</h2>
            </header>
            <p className="tcrm-approval-panel__compact-proposal">{proposal}</p>
            <dl className="tcrm-approval-panel__compact-facts">
              <div>
                <dt>{channelLabel}</dt>
                <dd>{channel}<Icon name="whatsapp" size="var(--taliya-control-crm-approval-panel-compact-icon-size)" /></dd>
              </div>
              <div>
                <dt>{scheduledLabel}</dt>
                <dd>{scheduledFor}</dd>
              </div>
            </dl>
            <footer className="tcrm-approval-panel__compact-actions">
              <Button disabled={locked} onClick={() => emitApprovalAction("approve", onAction, onApprove)} size="sm" variant="primary">Aprovar</Button>
              <Button disabled={locked} onClick={() => emitApprovalAction("edit", onAction, onEdit)} size="sm" variant="secondary">Editar</Button>
              <Button className="tcrm-approval-panel__compact-reject" disabled={locked} onClick={() => emitApprovalAction("reject", onAction, onReject)} size="sm" variant="secondary">Rejeitar</Button>
            </footer>
          </>
        )}
      </Card>
    );
  }

  return (
    <Card
      aria-busy={loading || undefined}
      aria-label={typeof title === "string" ? title : "Painel de aprovação"}
      className={cn("tcrm-approval-panel", `tcrm-approval-panel--${stateKey(state)}`, className)}
      data-component="ApprovalPanel"
      data-state={state}
      role="region"
      {...props}
    >
      <header className="tcrm-approval-panel__header">
        <Chip className="tcrm-approval-panel__eyebrow" showDot={false}>
          {eyebrow}
        </Chip>
        <IconButton className="tcrm-approval-panel__close" icon="x" label="Fechar aprovação" onClick={() => emitApprovalAction("close", onAction, onClose)} size="sm" variant="default" />
        <h2>{title ?? status.title}</h2>
      </header>

      <dl className="tcrm-approval-panel__facts">
        {approvalFacts.map((fact) => (
          <div className="tcrm-approval-panel__fact" key={fact.id}>
            <Icon className="tcrm-approval-panel__fact-icon" name={fact.icon ?? "circle"} size="var(--taliya-control-crm-approval-panel-fact-icon-size)" />
            <dt>{fact.label}</dt>
            <dd className={cn(fact.valueTone && `tcrm-approval-panel__fact-value--${fact.valueTone}`)}>
              {fact.dotTone ? <span className={cn("tcrm-approval-panel__dot", `tcrm-approval-panel__dot--${fact.dotTone}`)} /> : null}
              {fact.valueIcon ? <Icon name={fact.valueIcon} size="var(--taliya-control-crm-approval-panel-fact-value-icon-size)" /> : null}
              <span>{fact.value}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="tcrm-approval-panel__sections">
        {sections.map((section) => (
          <section className={cn("tcrm-approval-panel__section", section.variant === "suggestion" && "tcrm-approval-panel__section--suggestion")} key={section.id}>
            <div className="tcrm-approval-panel__section-header">
              <h3>{section.title}</h3>
              {section.badge ? (
                <Chip className="tcrm-approval-panel__suggestion-chip" icon="sparkles" showDot={false}>
                  {section.badge}
                </Chip>
              ) : null}
            </div>
            <p>{section.body}</p>
          </section>
        ))}

        <section className="tcrm-approval-panel__section tcrm-approval-panel__history">
          <h3>Histórico</h3>
          <ol>
            {timeline.map((item) => (
              <li key={item.id}>
                <span className="tcrm-approval-panel__history-dot" />
                <time>{item.time}</time>
                <span>{item.label}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="tcrm-approval-panel__section tcrm-approval-panel__comment">
          <h3>Comentário recente</h3>
          <div>
            <Avatar className="tcrm-approval-panel__comment-avatar" name={String(recentComment.author)} size="sm" src={recentComment.avatarSrc} />
            <p>
              <strong>{recentComment.author}</strong>
              <span>· {recentComment.time}</span>
              <small>{recentComment.body}</small>
            </p>
          </div>
        </section>
      </div>

      <footer className="tcrm-approval-panel__footer">
        <Button
          blockedReason={blockedReason}
          className="tcrm-approval-panel__button tcrm-approval-panel__button--primary"
          disabled={locked}
          loading={loading}
          onClick={() => emitApprovalAction("approve", onAction, onApprove)}
          variant="primary"
        >
          {status.primary}
        </Button>
        <div className="tcrm-approval-panel__secondary-actions">
          <Button className="tcrm-approval-panel__button" disabled={locked || loading} onClick={() => emitApprovalAction("edit", onAction, onEdit)} variant="secondary">Editar</Button>
          <Button className="tcrm-approval-panel__button" disabled={locked || loading} onClick={() => emitApprovalAction("reject", onAction, onReject)} variant="secondary">Rejeitar</Button>
          <Button className="tcrm-approval-panel__button" disabled={locked || loading} onClick={() => emitApprovalAction("request-data", onAction, onRequestData)} variant="secondary">Pedir dados</Button>
        </div>
        <Button className="tcrm-approval-panel__button tcrm-approval-panel__button--origin" disabled={disabled || loading} onClick={() => emitApprovalAction("open-origin", onAction, onOpenOrigin)} variant="secondary">Abrir origem</Button>
      </footer>
    </Card>
  );
}

export interface ApprovalDrawerProps extends ApprovalPanelProps {
  open?: boolean;
}

export function ApprovalDrawer({ open = true, className, ...props }: ApprovalDrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <ApprovalPanel
      aria-label="Detalhes da aprovação"
      className={cn("tcrm-approval-drawer", className)}
      data-component="ApprovalDrawer"
      role="complementary"
      {...props}
    />
  );
}

export type ImpactSummaryState = "low" | "medium" | "high" | "loading" | "blocked";

export interface ImpactSummaryItem {
  id: string;
  icon: IconName;
  tone: ComponentTone;
  text: React.ReactNode;
}

export interface ImpactSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  state?: ImpactSummaryState;
  title?: React.ReactNode;
  description?: React.ReactNode;
  items?: ImpactSummaryItem[];
  blockedReason?: React.ReactNode;
}

const impactSummarySourceItems: ImpactSummaryItem[] = [
  { id: "teacher-whatsapp", icon: "user", tone: "info", text: "Professores continuam sem ver WhatsApp dos alunos." },
  { id: "manual-payment", icon: "banknote", tone: "success", text: "Recepção pode registrar baixa manual." },
  { id: "discount-approval", icon: "percent", tone: "warning", text: "Descontos acima de 10% continuam exigindo Dono/Admin." },
  { id: "charge-approval", icon: "shieldCheck", tone: "info", text: "Cancelar cobrança continua exigindo aprovação." }
];

const impactSummaryHighItems: ImpactSummaryItem[] = [
  { id: "high-approval", icon: "shieldAlert", tone: "danger", text: "A alteração exige aprovação antes de publicar." },
  { id: "high-customer", icon: "users", tone: "warning", text: "Alunos podem receber mensagens ou cobranças diferentes." },
  { id: "high-finance", icon: "banknote", tone: "warning", text: "Financeiro precisa revisar limites e baixa manual." },
  { id: "high-audit", icon: "clipboardCheck", tone: "info", text: "Mudança fica registrada na auditoria do CRM." }
];

const impactSummaryLowItems: ImpactSummaryItem[] = [
  { id: "low-scope", icon: "checkCircle", tone: "success", text: "Ajuste restrito ao fluxo selecionado." },
  { id: "low-approval", icon: "shieldCheck", tone: "info", text: "Aprovações sensíveis continuam protegidas." },
  { id: "low-team", icon: "user", tone: "info", text: "Equipe vê a atualização antes de novas ações." },
  { id: "low-audit", icon: "clipboardCheck", tone: "success", text: "Histórico permanece disponível para consulta." }
];

function impactSummaryItemsForState(state: ImpactSummaryState, items?: ImpactSummaryItem[]) {
  if (items) return items;
  if (state === "high") return impactSummaryHighItems;
  if (state === "low") return impactSummaryLowItems;
  return impactSummarySourceItems;
}

export function ImpactSummary({
  state = "medium",
  title = "3. Impacto antes de salvar",
  description = "Resumo do efeito das permissões configuradas.",
  items,
  blockedReason = "Impacto bloqueado até revisar as permissões.",
  className,
  ...props
}: ImpactSummaryProps) {
  const loading = state === "loading";
  const blocked = state === "blocked";
  const resolvedItems = impactSummaryItemsForState(state, items);

  return (
    <Card
      aria-busy={loading || undefined}
      className={cn("tcrm-impact-summary", `tcrm-impact-summary--${state}`, className)}
      data-component="ImpactSummary"
      data-state={state}
      {...props}
    >
      <header className="tcrm-impact-summary__header">
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
      </header>

      {loading ? (
        <LoadingState className="tcrm-impact-summary__state" showTitle={false} title="Carregando impacto" variant="panel" />
      ) : blocked ? (
        <InlineAlert className="tcrm-impact-summary__state" tone="danger" title="Impacto bloqueado">{blockedReason}</InlineAlert>
      ) : (
        <ul className="tcrm-impact-summary__list" role="list">
          {resolvedItems.map((item) => (
            <li className="tcrm-impact-summary__item" key={item.id}>
              <ListIcon className="tcrm-impact-summary__icon" icon={item.icon} tone={item.tone} />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export type BeforeAfterDiffVariant = "text" | "settings" | "policy";
export type BeforeAfterDiffState = "default" | "loading" | "empty" | "error" | "blocked";

export interface BeforeAfterDiffProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: BeforeAfterDiffVariant;
  state?: BeforeAfterDiffState;
  title?: React.ReactNode;
  meta?: React.ReactNode;
  rows?: DiffTableRow[];
  actor?: React.ReactNode;
  actorAvatarSrc?: string;
  actorLabel?: React.ReactNode;
  origin?: React.ReactNode;
  blockedReason?: React.ReactNode;
  error?: React.ReactNode;
  onApprove?: () => void;
  onReject?: () => void;
  onRevert?: () => void;
  onRowClick?: (rowId: string) => void;
}

const beforeAfterDiffSourceRows: DiffTableRow[] = [
  { id: "plan", label: "Plano", before: "Profissional", after: "Enterprise", status: "changed" },
  { id: "status", label: "Status", before: "Ativo", after: "Ativo", status: "approved" },
  { id: "limit", label: "Limite de usuários", before: "10", after: "25", status: "added" },
  { id: "renewal", label: "Data de renovação", before: "31/05/2024", after: "31/05/2025", status: "changed" },
  { id: "discount", label: "Desconto (%)", before: "10%", after: "15%", status: "changed" }
];

const beforeAfterDiffTextRows: DiffTableRow[] = [
  { id: "tone", label: "Tom", before: "Neutro", after: "Consultivo", status: "changed" },
  { id: "cta", label: "CTA", before: "Enviar link", after: "Agendar conversa", status: "changed" },
  { id: "guardrail", label: "Regra", before: "Opcional", after: "Obrigatória", status: "added" }
];

const beforeAfterDiffPolicyRows: DiffTableRow[] = [
  { id: "role", label: "Perfil", before: "Recepção", after: "Dono/Admin", status: "changed" },
  { id: "approval", label: "Aprovação", before: "Não exige", after: "Exige aprovação", status: "added" },
  { id: "audit", label: "Auditoria", before: "Parcial", after: "Completa", status: "changed" }
];

function beforeAfterDiffRowsForVariant(variant: BeforeAfterDiffVariant, rows?: DiffTableRow[]) {
  if (rows) return rows;
  if (variant === "text") return beforeAfterDiffTextRows;
  if (variant === "policy") return beforeAfterDiffPolicyRows;
  return beforeAfterDiffSourceRows;
}

export function BeforeAfterDiff({
  variant = "settings",
  state = "default",
  title = "8. Diff antes / depois",
  meta,
  rows,
  actor = "Sam Frank",
  actorAvatarSrc,
  actorLabel = "Ator",
  origin = "Origem API",
  blockedReason = "Diff bloqueado até revisar a política de aprovação.",
  error = "Não foi possível carregar o diff.",
  onApprove,
  onReject,
  onRevert,
  onRowClick,
  className,
  ...props
}: BeforeAfterDiffProps) {
  const resolvedRows = beforeAfterDiffRowsForVariant(variant, rows);

  if (state === "loading") {
    return (
      <Card aria-busy className={cn("tcrm-before-after-diff tcrm-before-after-diff--state", className)} data-component="BeforeAfterDiff" {...props}>
        <LoadingState className="tcrm-before-after-diff__state" showTitle={false} title="Carregando diff" variant="table" />
      </Card>
    );
  }

  if (state === "empty") {
    return (
      <Card className={cn("tcrm-before-after-diff tcrm-before-after-diff--state", className)} data-component="BeforeAfterDiff" {...props}>
        <EmptyState className="tcrm-before-after-diff__state" title="Nenhuma alteração encontrada" />
      </Card>
    );
  }

  if (state === "error") {
    return (
      <Card className={cn("tcrm-before-after-diff tcrm-before-after-diff--state", className)} data-component="BeforeAfterDiff" {...props}>
        <ErrorState className="tcrm-before-after-diff__state" title="Erro ao carregar diff" description={error} />
      </Card>
    );
  }

  if (state === "blocked") {
    return (
      <Card className={cn("tcrm-before-after-diff tcrm-before-after-diff--state", className)} data-component="BeforeAfterDiff" {...props}>
        <InlineAlert className="tcrm-before-after-diff__state" tone="warning" title="Diff bloqueado">{blockedReason}</InlineAlert>
      </Card>
    );
  }

  return (
    <DiffTable
      actor={actor}
      actorAvatarSrc={actorAvatarSrc}
      actorLabel={actorLabel}
      className={cn("tcrm-before-after-diff", className)}
      compact
      data-component="BeforeAfterDiff"
      fieldHeader=""
      meta={meta}
      onApprove={onApprove}
      onReject={onReject}
      onRevert={onRevert}
      onRowClick={onRowClick}
      origin={origin}
      rows={resolvedRows}
      title={title}
      {...props}
    />
  );
}

export type SettingsSectionState = "source" | "saved" | "dirty" | "blocked" | "loading";
export type SettingsSectionRowControl = "button" | "toggle" | "static";

export interface SettingsSectionRow {
  id: string;
  icon: IconName;
  iconTone?: ComponentTone | "neutral";
  label: React.ReactNode;
  value: React.ReactNode;
  control?: SettingsSectionRowControl;
  checked?: boolean;
  disabled?: boolean;
  actionLabel?: string;
}

export interface SettingsSectionProps extends Omit<CrmSurfaceProps, "action" | "icon" | "state" | "statusLabel"> {
  state?: SettingsSectionState;
  rows?: SettingsSectionRow[];
  statusLabel?: React.ReactNode;
  action?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  blockedReason?: React.ReactNode;
  onRowAction?: (row: SettingsSectionRow) => void;
  onToggleChange?: (row: SettingsSectionRow, checked: boolean) => void;
}

const defaultSettingsSectionRows: SettingsSectionRow[] = [
  { id: "due-date", icon: "calendar", iconTone: "info", label: "Vencimento padrão", value: "Dia 10" },
  { id: "late-tolerance", icon: "clock", iconTone: "warning", label: "Tolerância de atraso", value: "3 dias" },
  { id: "delinquent-after-tolerance", icon: "alert", iconTone: "warning", label: "Marcar inadimplente", value: "Após tolerância" },
  { id: "manual-settlement", icon: "tag", iconTone: "info", label: "Baixa manual", value: "Permitida", control: "toggle", checked: true },
  { id: "simple-discount", icon: "percent", iconTone: "success", label: "Desconto simples", value: "Até 10%" },
  { id: "cancel-charge", icon: "x", iconTone: "danger", label: "Cancelar cobrança", value: "Exige aprovação" }
];

const settingsSectionStatusByState: Partial<Record<SettingsSectionState, { label: string; tone: ComponentTone }>> = {
  saved: { label: "Salvo", tone: "success" },
  dirty: { label: "Alterado", tone: "warning" },
  blocked: { label: "Bloqueado", tone: "blocked" },
  loading: { label: "Salvando", tone: "info" }
};

function settingsSectionActionLabel(row: SettingsSectionRow) {
  return row.actionLabel ?? `Alterar ${typeof row.label === "string" ? row.label : row.id}`;
}

function splitSettingsRows(rows: SettingsSectionRow[]) {
  const midpoint = Math.ceil(rows.length / 2);
  return [rows.slice(0, midpoint), rows.slice(midpoint)] as const;
}

export function SettingsSection({
  title = "2. Regras financeiras simples",
  description = "Limites básicos para cobrança e atraso.",
  rows = defaultSettingsSectionRows,
  state = "source",
  statusLabel,
  action,
  disabled = false,
  loading = false,
  blockedReason,
  onRowAction,
  onToggleChange,
  children,
  className,
  ...props
}: SettingsSectionProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const resolvedLoading = loading || state === "loading";
  const resolvedBlocked = state === "blocked" || Boolean(blockedReason);
  const controlsDisabled = disabled || resolvedLoading || resolvedBlocked;
  const status = statusLabel ?? settingsSectionStatusByState[state]?.label;
  const statusTone = settingsSectionStatusByState[state]?.tone ?? "neutral";
  const columns = splitSettingsRows(rows);

  const renderRow = (row: SettingsSectionRow) => {
    const rowDisabled = controlsDisabled || row.disabled;
    const control = row.control ?? "button";
    const labelText = typeof row.label === "string" ? row.label : row.id;

    return (
      <div className="tcrm-settings-section__row" data-row-id={row.id} key={row.id} role="row">
        <span className="tcrm-settings-section__icon" data-icon={row.icon} data-tone={row.iconTone ?? "neutral"} aria-hidden="true">
          <Icon name={row.icon} size="var(--taliya-control-crm-settings-section-icon-size)" />
        </span>
        <span className="tcrm-settings-section__label" role="cell">{row.label}</span>
        <span className="tcrm-settings-section__value" role="cell">{row.value}</span>
        <span className="tcrm-settings-section__control" role="cell">
          {control === "toggle" ? (
            <Toggle
              aria-label={row.actionLabel ?? `Alternar ${labelText}`}
              className="tcrm-settings-section__toggle"
              compact
              disabled={rowDisabled}
              onPressedChange={(checked) => onToggleChange?.(row, checked)}
              pressed={row.checked}
            />
          ) : control === "button" ? (
            <Button
              aria-label={settingsSectionActionLabel(row)}
              className="tcrm-settings-section__action"
              disabled={rowDisabled}
              onClick={() => onRowAction?.(row)}
              size="sm"
              trailingIcon="chevronDown"
              variant="secondary"
            >
              {settingsSectionActionLabel(row)}
            </Button>
          ) : null}
        </span>
      </div>
    );
  };

  const renderContent = () => {
    if (resolvedLoading) {
      return <LoadingState className="tcrm-settings-section__state" showTitle={false} title="Carregando seção de configurações" variant="panel" />;
    }

    if (children) {
      return <div className="tcrm-settings-section__custom">{children}</div>;
    }

    return (
      <div aria-label="Regras financeiras simples" className="tcrm-settings-section__grid" role="table">
        {columns.map((columnRows, index) => (
          <div aria-label={index === 0 ? "Regras de vencimento" : "Regras de cobrança"} className="tcrm-settings-section__group" key={index} role="rowgroup">
            {columnRows.map(renderRow)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card
      aria-busy={resolvedLoading || undefined}
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={cn("tcrm-settings-section", `tcrm-settings-section--${state}`, className)}
      data-component="SettingsSection"
      data-state={state}
      {...props}
    >
      <header className="tcrm-settings-section__header">
        <span className="tcrm-settings-section__heading">
          <h3 id={titleId}>{title}</h3>
          {description ? <p id={descriptionId}>{description}</p> : null}
        </span>
        {status ? <Chip className="tcrm-settings-section__status" tone={statusTone}>{status}</Chip> : null}
        {action ? <span className="tcrm-settings-section__header-action">{action}</span> : null}
      </header>
      {renderContent()}
      {resolvedBlocked ? (
        <InlineAlert className="tcrm-settings-section__blocked" tone="warning" title="Configuração bloqueada">
          {blockedReason ?? "Somente Dono/Admin pode alterar estas regras."}
        </InlineAlert>
      ) : null}
    </Card>
  );
}

export type PermissionMatrixState = "source" | "dirty" | "read-only" | "blocked" | "loading" | "empty" | "error";

export interface PermissionMatrixSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type PermissionMatrixRow =
  | {
      id: string;
      indexLabel?: React.ReactNode;
      permission: React.ReactNode;
      currentValue: React.ReactNode;
      control: "toggle";
      checked: boolean;
      dirty?: boolean;
      disabled?: boolean;
      controlLabel?: string;
    }
  | {
      id: string;
      indexLabel?: React.ReactNode;
      permission: React.ReactNode;
      currentValue: React.ReactNode;
      control: "select";
      value: string;
      options: PermissionMatrixSelectOption[];
      dirty?: boolean;
      disabled?: boolean;
      controlLabel?: string;
    };

export interface PermissionMatrixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  rows?: PermissionMatrixRow[];
  state?: PermissionMatrixState;
  loading?: boolean;
  readOnly?: boolean;
  blockedReason?: string;
  error?: string;
  onToggleChange?: (rowId: string, checked: boolean, row: PermissionMatrixRow) => void;
  onSelectChange?: (rowId: string, value: string, row: PermissionMatrixRow) => void;
}

const permissionMatrixDefaultRows: PermissionMatrixRow[] = [
  {
    id: "teacher-phone",
    permission: "Professor pode ver telefone/WhatsApp do aluno",
    currentValue: "Desligado",
    control: "toggle",
    checked: false
  },
  {
    id: "teacher-note",
    permission: "Professor pode adicionar observação",
    currentValue: "Ligado",
    control: "toggle",
    checked: true
  },
  {
    id: "frontdesk-payment",
    permission: "Recepção pode registrar pagamento",
    currentValue: "Ligado",
    control: "toggle",
    checked: true
  },
  {
    id: "frontdesk-plan-edit",
    permission: "Recepção pode editar plano do aluno",
    currentValue: "Desligado",
    control: "toggle",
    checked: false
  },
  {
    id: "frontdesk-discount",
    permission: "Recepção pode aplicar desconto simples",
    currentValue: "Até 10%",
    control: "select",
    value: "10",
    options: [
      { value: "0", label: "Sem desconto" },
      { value: "10", label: "Até 10%" },
      { value: "20", label: "Até 20%" }
    ]
  },
  {
    id: "frontdesk-cancel-charge",
    permission: "Recepção pode cancelar cobrança",
    currentValue: "Exige aprovação",
    control: "select",
    value: "approval",
    options: [
      { value: "approval", label: "Exige aprovação" },
      { value: "owner", label: "Somente Dono/Admin" },
      { value: "never", label: "Não permitido" }
    ]
  }
];

export const settingsPermissionsDefaultRows: PermissionMatrixRow[] = permissionMatrixDefaultRows;

export function PermissionMatrix({
  title = "2. Ajustes sensíveis",
  description = "Defina limites importantes para proteger dados e processos.",
  rows = permissionMatrixDefaultRows,
  state = "source",
  loading = false,
  readOnly = false,
  blockedReason,
  error = "Não foi possível carregar permissões.",
  onToggleChange,
  onSelectChange,
  className,
  ...props
}: PermissionMatrixProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const resolvedLoading = loading || state === "loading";
  const resolvedBlocked = state === "blocked" || Boolean(blockedReason);
  const resolvedReadOnly = readOnly || state === "read-only";
  const resolvedEmpty = state === "empty" || rows.length === 0;
  const resolvedError = state === "error";
  const controlsDisabled = resolvedReadOnly || resolvedBlocked;

  const renderState = () => {
    if (resolvedLoading) {
      return <LoadingState className="tcrm-permission-matrix__state" showTitle={false} title="Carregando permissões" variant="panel" />;
    }

    if (resolvedError) {
      return <ErrorState className="tcrm-permission-matrix__state" title="Erro ao carregar permissões" description={error} />;
    }

    if (resolvedBlocked) {
      return (
        <InlineAlert className="tcrm-permission-matrix__state" tone="warning" title="Permissões bloqueadas">
          {blockedReason ?? "Este perfil não pode alterar permissões sensíveis."}
        </InlineAlert>
      );
    }

    if (resolvedEmpty) {
      return <EmptyState className="tcrm-permission-matrix__state" title="Nenhuma permissão configurada" />;
    }

    return (
      <div aria-label="Ajustes sensíveis de permissões" className="tcrm-permission-matrix__table" role="table">
        <div className="tcrm-permission-matrix__head" role="rowgroup">
          <div className="tcrm-permission-matrix__head-row" role="row">
            <span role="columnheader">Permissão</span>
            <span role="columnheader">Valor atual</span>
            <span role="columnheader">Controle</span>
          </div>
        </div>
        <div className="tcrm-permission-matrix__body" role="rowgroup">
          {rows.map((row, index) => {
            const rowDisabled = controlsDisabled || row.disabled;
            const controlLabel = row.controlLabel ?? `Alterar permissão ${row.permission?.toString() ?? row.id}`;
            return (
              <div className={cn("tcrm-permission-matrix__row", row.dirty && "tcrm-permission-matrix__row--dirty")} data-row-id={row.id} key={row.id} role="row">
                <span className="tcrm-permission-matrix__index-cell" role="cell">
                  <span className="tcrm-permission-matrix__index">{row.indexLabel ?? index + 1}</span>
                </span>
                <span className="tcrm-permission-matrix__permission" role="cell">{row.permission}</span>
                <span className="tcrm-permission-matrix__current" role="cell">{row.currentValue}</span>
                <span className="tcrm-permission-matrix__control" role="cell">
                  {row.control === "toggle" ? (
                    <Toggle
                      aria-label={controlLabel}
                      blockedReason={resolvedBlocked ? blockedReason ?? "Permissão bloqueada" : undefined}
                      className="tcrm-permission-matrix__toggle"
                      compact
                      disabled={rowDisabled && !resolvedBlocked}
                      onPressedChange={(checked) => onToggleChange?.(row.id, checked, row)}
                      pressed={row.checked}
                    />
                  ) : (
                    <Select
                      aria-label={controlLabel}
                      blockedReason={resolvedBlocked ? blockedReason ?? "Permissão bloqueada" : undefined}
                      className="tcrm-permission-matrix__select"
                      disabled={rowDisabled && !resolvedBlocked}
                      fieldSize="sm"
                      onValueChange={(value) => onSelectChange?.(row.id, value, row)}
                      options={row.options}
                      value={row.value}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card
      aria-busy={resolvedLoading || undefined}
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={cn("tcrm-permission-matrix", `tcrm-permission-matrix--${state}`, className)}
      data-component="PermissionMatrix"
      data-state={state}
      {...props}
    >
      <header className="tcrm-permission-matrix__header">
        <h3 id={titleId}>{title}</h3>
        {description ? <p id={descriptionId}>{description}</p> : null}
      </header>
      {renderState()}
    </Card>
  );
}

export type RuleRowState = "enabled" | "disabled" | "blocked" | "loading";
export type RuleRowControl = "select" | "value" | "action" | "none";

export interface RuleRowProps extends Omit<CrmSurfaceProps, "action" | "onToggle" | "state"> {
  rowId?: string;
  state?: RuleRowState;
  iconTone?: ComponentTone | "neutral";
  control?: RuleRowControl;
  action?: React.ReactNode;
  value?: React.ReactNode;
  selectOptions?: SelectOption[];
  selectValue?: string;
  defaultSelectValue?: string;
  onSelectChange?: (value: string, rowId?: string) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  onToggle?: (enabled: boolean, rowId?: string) => void;
  showToggle?: boolean;
  disabled?: boolean;
  loading?: boolean;
  blockedReason?: string;
}

const defaultRuleRowSelectOptions: SelectOption[] = [
  { value: "immediate", label: "Imediato" },
  { value: "daily", label: "Diário" },
  { value: "weekly", label: "Semanal" },
  { value: "silent-after-hours", label: "Silenciado fora do horário" }
];

function ruleRowStatusLabel(state: RuleRowState, checked: boolean | undefined, loading?: boolean, statusLabel?: React.ReactNode) {
  if (statusLabel !== undefined) return statusLabel;
  if (loading || state === "loading") return "Salvando";
  if (state === "blocked") return "Bloqueado";
  return checked === false || state === "disabled" ? "Desligado" : "Ligado";
}

export function RuleRow({
  rowId,
  title = "Crítico",
  description,
  state = "enabled",
  statusLabel,
  icon = "alert",
  iconTone = "danger",
  control,
  value,
  selectOptions = defaultRuleRowSelectOptions,
  selectValue,
  defaultSelectValue = "immediate",
  onSelectChange,
  checked,
  defaultChecked,
  onToggle,
  showToggle = true,
  action,
  disabled = false,
  loading = false,
  blockedReason,
  className,
  ...props
}: RuleRowProps) {
  const isBlocked = state === "blocked";
  const isDisabled = disabled || isBlocked || state === "disabled" || loading || state === "loading";
  const resolvedChecked = checked ?? (state === "disabled" ? false : undefined);
  const defaultToggleChecked = defaultChecked ?? state === "enabled";
  const resolvedControl: RuleRowControl = control ?? (action ? "action" : value !== undefined ? "value" : "select");
  const labelText = typeof title === "string" ? title : "regra";
  const statusText = ruleRowStatusLabel(state, resolvedChecked ?? defaultToggleChecked, loading, statusLabel);

  const handleToggle = (nextChecked: boolean) => {
    onToggle?.(nextChecked, rowId);
  };

  const handleSelectChange = (nextValue: string) => {
    onSelectChange?.(nextValue, rowId);
  };

  const renderedControl =
    resolvedControl === "select" ? (
      <Select
        aria-label={`Selecionar valor de ${labelText}`}
        className="tcrm-rule-row__select"
        defaultValue={selectValue === undefined ? defaultSelectValue : undefined}
        disabled={isDisabled}
        fieldSize="sm"
        onValueChange={handleSelectChange}
        options={selectOptions}
        value={selectValue}
      />
    ) : resolvedControl === "action" ? (
      <span className="tcrm-rule-row__action">{action}</span>
    ) : resolvedControl === "value" ? (
      <span className="tcrm-rule-row__value">{value}</span>
    ) : null;

  return (
    <div
      className={cn("tcrm-rule-row", `tcrm-rule-row--${state}`, className)}
      data-component="RuleRow"
      data-state={state}
      {...props}
    >
      <span className="tcrm-rule-row__icon" data-tone={iconTone} aria-hidden="true">
        <Icon name={icon} size="var(--taliya-control-crm-rule-row-icon-size)" />
      </span>
      <span className="tcrm-rule-row__body">
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      <span className="tcrm-rule-row__control">{renderedControl}</span>
      <span className="tcrm-rule-row__status">
        {showToggle ? (
          <Toggle
            aria-label={`Alternar ${labelText}`}
            blockedReason={isBlocked ? blockedReason ?? "Regra bloqueada" : undefined}
            compact
            defaultPressed={resolvedChecked === undefined ? defaultToggleChecked : undefined}
            disabled={disabled || loading || state === "loading" || state === "disabled"}
            onPressedChange={handleToggle}
            pressed={resolvedChecked}
          />
        ) : null}
        <span>{statusText}</span>
      </span>
    </div>
  );
}

export type SettingsHubCardState =
  | "ready"
  | "invite-pending"
  | "review"
  | "connected"
  | "pending"
  | "read-only"
  | "entitlement-blocked"
  | "error"
  | "blocked"
  | "loading";

export interface SettingsHubCardProps extends Omit<CrmSurfaceProps, "action" | "state" | "statusLabel"> {
  state?: SettingsHubCardState;
  statusLabel?: React.ReactNode;
  action?: React.ReactNode;
  actionLabel?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onOpen?: () => void;
}

const settingsHubCardStatusByState: Record<SettingsHubCardState, string> = {
  ready: "Pronto",
  "invite-pending": "1 convite pendente",
  review: "Revisar",
  connected: "WhatsApp conectado",
  pending: "Pendente",
  "read-only": "Somente leitura",
  "entitlement-blocked": "Não contratado",
  error: "Falha ao carregar",
  blocked: "Bloqueado",
  loading: "Carregando"
};

const settingsHubCardToneByState: Record<SettingsHubCardState, ComponentTone> = {
  ready: "success",
  "invite-pending": "warning",
  review: "warning",
  connected: "success",
  pending: "warning",
  "read-only": "info",
  "entitlement-blocked": "warning",
  error: "danger",
  blocked: "paused",
  loading: "info"
};

export function SettingsHubCard({
  title = "Studio",
  description = "Dados, unidades e horarios.",
  state = "ready",
  statusLabel,
  icon = "slidersRound",
  action,
  actionLabel = "Abrir",
  disabled = false,
  loading = false,
  onOpen,
  className,
  ...props
}: SettingsHubCardProps) {
  const isBlocked = state === "blocked";
  const isDisabled = disabled || isBlocked;
  const resolvedActionLabel = actionLabel === "Abrir"
    ? state === "read-only"
      ? "Abrir em leitura"
      : state === "entitlement-blocked"
        ? "Ver plano"
        : state === "error"
          ? "Tentar novamente"
          : actionLabel
    : actionLabel;

  return (
    <Card className={cn("tcrm-settings-hub-card", className)} data-component="SettingsHubCard" data-state={state} disabled={isDisabled} {...props}>
      <span className="tcrm-settings-hub-card__icon">
        <Icon name={icon} size="var(--taliya-control-crm-settings-hub-card-icon-glyph)" strokeWidth="var(--taliya-control-crm-settings-hub-card-icon-stroke)" />
      </span>
      <strong className="tcrm-settings-hub-card__title">{title}</strong>
      {description ? <p className="tcrm-settings-hub-card__description">{description}</p> : null}
      <Chip className="tcrm-settings-hub-card__status" data-state={state} showDot={false} tone={settingsHubCardToneByState[state]}>
        {statusLabel ?? settingsHubCardStatusByState[state]}
      </Chip>
      {action ?? (
        <Button
          blockedReason={isBlocked ? "Configuração bloqueada" : undefined}
          className="tcrm-settings-hub-card__action"
          disabled={disabled}
          loading={loading || state === "loading"}
          onClick={onOpen}
          variant="secondary"
        >
          {resolvedActionLabel}
        </Button>
      )}
    </Card>
  );
}

export type IntegrationStatusRowState = "connected" | "pending" | "failed" | "blocked" | "loading";
export type IntegrationProvider = "pix" | "card" | "recurrence" | "reconciliation" | "custom";

const integrationStatusDefaults: Record<IntegrationStatusRowState, { helper: string; icon: IconName; label: string }> = {
  connected: { helper: "Ativo", icon: "checkCircle", label: "Conectado" },
  pending: { helper: "Pendente", icon: "clock", label: "Pendente" },
  failed: { helper: "Falha técnica", icon: "alertCircle", label: "Falha técnica" },
  blocked: { helper: "Bloqueado até ativar", icon: "lock", label: "Bloqueado" },
  loading: { helper: "Sincronizando", icon: "loader", label: "Sincronizando" }
};

const integrationProviderIcons: Partial<Record<IntegrationProvider, IconName>> = {
  card: "creditCard",
  recurrence: "refresh",
  reconciliation: "barChart"
};

export interface IntegrationStatusRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onClick"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  state?: IntegrationStatusRowState;
  provider?: IntegrationProvider;
  providerIcon?: IconName;
  providerLabel?: string;
  statusIcon?: IconName;
  statusLabel?: string;
  showDivider?: boolean;
  disabled?: boolean;
  onAction?: (provider: IntegrationProvider, state: IntegrationStatusRowState) => void;
}

function renderIntegrationProviderMark(provider: IntegrationProvider, providerIcon?: IconName) {
  if (provider === "pix") {
    return (
      <span className="tcrm-integration-status-row__pix-grid" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
    );
  }

  const icon = providerIcon ?? integrationProviderIcons[provider] ?? "link";
  return <Icon name={icon} size="var(--taliya-control-crm-integration-status-row-icon-glyph)" strokeWidth={1.85} />;
}

export function IntegrationStatusRow({
  title = "Pix Taliya",
  description,
  state = "blocked",
  provider = "pix",
  providerIcon,
  providerLabel,
  statusIcon,
  statusLabel,
  showDivider = true,
  disabled = false,
  onAction,
  className,
  ...props
}: IntegrationStatusRowProps) {
  const resolved = integrationStatusDefaults[state];
  const helper = description ?? resolved.helper;
  const interactive = Boolean(onAction);
  const content = (
    <>
      <span className={cn("tcrm-integration-status-row__provider", `tcrm-integration-status-row__provider--${provider}`)}>
        {renderIntegrationProviderMark(provider, providerIcon)}
      </span>
      <span className="tcrm-integration-status-row__body">
        <strong>{title}</strong>
        <span className="tcrm-integration-status-row__status">
          <Icon name={statusIcon ?? resolved.icon} size="var(--taliya-control-crm-integration-status-row-status-icon-size)" strokeWidth={2} />
          <span>{helper}</span>
        </span>
      </span>
    </>
  );
  const ariaLabel = providerLabel ?? `${String(title)} - ${statusLabel ?? resolved.label}`;
  const classes = cn("tcrm-integration-status-row", showDivider && "tcrm-integration-status-row--divider", className);

  if (interactive) {
    return (
      <button
        aria-busy={state === "loading" || undefined}
        aria-label={ariaLabel}
        className={classes}
        data-component="IntegrationStatusRow"
        data-provider={provider}
        data-state={state}
        disabled={disabled || state === "loading"}
        onClick={() => onAction?.(provider, state)}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <div
      aria-busy={state === "loading" || undefined}
      aria-label={ariaLabel}
      className={classes}
      data-component="IntegrationStatusRow"
      data-provider={provider}
      data-state={state}
      role="group"
      {...props}
    >
      {content}
    </div>
  );
}

export type UnsavedChangesBarState = "dirty" | "saving" | "saved" | "blocked" | "error";

const unsavedChangesStatusLabel: Record<UnsavedChangesBarState, string> = {
  dirty: "Alterações não salvas",
  saving: "Salvando alterações",
  saved: "Alterações salvas",
  blocked: "Salvamento bloqueado",
  error: "Falha ao salvar"
};

export interface UnsavedChangesBarProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: UnsavedChangesBarState;
  cancelLabel?: React.ReactNode;
  saveLabel?: React.ReactNode;
  savingLabel?: React.ReactNode;
  savedLabel?: React.ReactNode;
  blockedLabel?: React.ReactNode;
  errorLabel?: React.ReactNode;
  statusLabel?: React.ReactNode;
  disabled?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export function UnsavedChangesBar({
  state = "dirty",
  cancelLabel = "Cancelar",
  saveLabel = "Salvar alterações",
  savingLabel = "Salvando...",
  savedLabel = "Salvo",
  blockedLabel = "Bloqueado",
  errorLabel = "Tentar novamente",
  statusLabel,
  disabled = false,
  onSave,
  onCancel,
  className,
  ...props
}: UnsavedChangesBarProps) {
  const saving = state === "saving";
  const saved = state === "saved";
  const blocked = state === "blocked";
  const failed = state === "error";
  const saveButtonLabel = saving ? savingLabel : saved ? savedLabel : blocked ? blockedLabel : failed ? errorLabel : saveLabel;
  const statusText = statusLabel ?? unsavedChangesStatusLabel[state];
  return (
    <div
      aria-busy={saving || undefined}
      aria-label={String(statusText)}
      className={cn("tcrm-unsaved-changes-bar", className)}
      data-component="UnsavedChangesBar"
      data-state={state}
      role="region"
      {...props}
    >
      <Button
        className="tcrm-unsaved-changes-bar__cancel"
        disabled={disabled || saving || blocked}
        onClick={onCancel}
        variant="secondary"
      >
        {cancelLabel}
      </Button>
      <span aria-live="polite" className="tl-sr-only">{statusText}</span>
      <Button
        className="tcrm-unsaved-changes-bar__save"
        disabled={disabled || saved || blocked}
        loading={saving}
        onClick={onSave}
        variant="primary"
      >
        {saveButtonLabel}
      </Button>
    </div>
  );
}

export interface SettingsWorkspaceSaveProps {
  saveState?: UnsavedChangesBarState;
  onSave?: () => void;
  onCancel?: () => void;
}

export interface SettingsWorkspaceOperationalProps {
  blockedReason?: string;
  validationError?: React.ReactNode;
  systemError?: React.ReactNode;
  onRequestAccess?: () => void;
  onRetry?: () => void;
}

function resolveSettingsWorkspaceSaveState(
  saveState: UnsavedChangesBarState,
  { blockedReason, validationError, systemError }: Pick<SettingsWorkspaceOperationalProps, "blockedReason" | "validationError" | "systemError">
): UnsavedChangesBarState {
  if (systemError) return "error";
  if (blockedReason || validationError) return "blocked";
  return saveState;
}

function SettingsWorkspaceControls({
  blocked,
  children
}: {
  blocked: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset aria-label="Controles da configuração" className="tcrm-settings-workspace-controls" disabled={blocked}>
      {children}
    </fieldset>
  );
}

function SettingsWorkspaceFeedback({
  blockedReason,
  validationError,
  systemError,
  onRequestAccess
}: SettingsWorkspaceOperationalProps) {
  return (
    <>
      {blockedReason ? (
        <InlineAlert tone="warning" title="Acesso somente leitura">
          <span>{blockedReason}</span>
          {onRequestAccess ? <Button onClick={onRequestAccess} size="sm" variant="secondary">Pedir acesso</Button> : null}
        </InlineAlert>
      ) : null}
      {validationError ? <InlineAlert tone="danger" title="Corrija antes de salvar">{validationError}</InlineAlert> : null}
      {systemError ? <InlineAlert tone="danger" title="Não foi possível salvar">{systemError}</InlineAlert> : null}
    </>
  );
}

export type SettingsStudioField =
  | "studioName"
  | "publicName"
  | "mainUnit"
  | "address"
  | "addressLine2"
  | "neighborhood"
  | "city"
  | "state"
  | "postalCode"
  | "timezone";

export interface SettingsStudioWorkspaceProps extends Omit<SetupStudioWorkspaceProps, "header" | "details" | "footer" | "onAction" | "disabled">, SettingsWorkspaceSaveProps, SettingsWorkspaceOperationalProps {
  values?: Partial<Record<SettingsStudioField, string>>;
  onFieldChange?: (field: SettingsStudioField, value: string) => void;
}

export function SettingsStudioWorkspace({
  values = {},
  onFieldChange,
  saveState = "saved",
  blockedReason,
  validationError,
  systemError,
  onRequestAccess,
  onRetry,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsStudioWorkspaceProps) {
  const field = (name: SettingsStudioField, fallback: string) => values[name] ?? fallback;
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <SetupStudioWorkspace
      className={cn("tcrm-settings-inherited-workspace", "tcrm-settings-studio-workspace", className)}
      data-component="SettingsStudioWorkspace"
      disabled={Boolean(blockedReason)}
      details={(
        <section className="tcrm-settings-studio-workspace__identity">
          <h3>Identidade e unidade principal</h3>
          <div className="tcrm-settings-studio-workspace__fields">
            <Input label="Nome do studio" onChange={(event) => onFieldChange?.("studioName", event.currentTarget.value)} value={field("studioName", "Studio Leticia")} />
            <Input label="Nome publico" onChange={(event) => onFieldChange?.("publicName", event.currentTarget.value)} value={field("publicName", "Studio Leticia")} />
            <Input label="Unidade principal" onChange={(event) => onFieldChange?.("mainUnit", event.currentTarget.value)} value={field("mainUnit", "Unidade Centro")} />
            <Input className="tcrm-settings-studio-workspace__field--wide" label="Endereco" onChange={(event) => onFieldChange?.("address", event.currentTarget.value)} value={field("address", "Rua das Flores, 120")} />
            <Input label="Complemento" onChange={(event) => onFieldChange?.("addressLine2", event.currentTarget.value)} value={field("addressLine2", "")} />
            <Input label="Bairro" onChange={(event) => onFieldChange?.("neighborhood", event.currentTarget.value)} value={field("neighborhood", "Centro")} />
            <Input label="Cidade" onChange={(event) => onFieldChange?.("city", event.currentTarget.value)} value={field("city", "Sao Paulo")} />
            <Select label="Estado" onValueChange={(value) => onFieldChange?.("state", value)} options={[{ value: "SP", label: "SP" }, { value: "RJ", label: "RJ" }, { value: "MG", label: "MG" }]} value={field("state", "SP")} />
            <Input label="CEP" onChange={(event) => onFieldChange?.("postalCode", event.currentTarget.value)} value={field("postalCode", "01001-000")} />
            <Select
              label="Fuso horario"
              onValueChange={(value) => onFieldChange?.("timezone", value)}
              options={[
                { value: "America/Sao_Paulo", label: "Brasilia (GMT-3)" },
                { value: "America/Manaus", label: "Manaus (GMT-4)" },
                { value: "America/Rio_Branco", label: "Rio Branco (GMT-5)" }
              ]}
              value={field("timezone", "America/Sao_Paulo")}
            />
          </div>
        </section>
      )}
      footer={<>
        <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
        <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
      </>}
      header={<SetupBlockHeader description="Edite a identidade do studio e a janela institucional de funcionamento." showBadge={false} title="Studio" />}
      {...props}
    />
  );
}

export type SettingsTeamMemberStatus = "active" | "inactive" | "invitePending";

export interface SettingsTeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: SettingsTeamMemberStatus;
  lastAccess: string;
  avatarSrc?: string;
  isLastAdmin?: boolean;
}

export type SettingsTeamMemberAction = "edit" | "deactivate" | "reactivate" | "resend";

const defaultSettingsTeamMembers: SettingsTeamMember[] = [
  { id: "leticia", name: "Leticia Ramos", email: "leticia@studio.com", role: "Dono/Admin", status: "active", lastAccess: "Hoje, 09:42" },
  { id: "carla", name: "Carla Souza", email: "carla@studio.com", role: "Recepcao", status: "active", lastAccess: "Ontem, 18:15" },
  { id: "ana", name: "Ana Martins", email: "ana@studio.com", role: "Professor", status: "invitePending", lastAccess: "Convite enviado hoje" }
];

export interface SettingsTeamWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceSaveProps, SettingsWorkspaceOperationalProps {
  members?: SettingsTeamMember[];
  confirmSensitiveActions?: boolean;
  roleOptions?: SelectOption[];
  onInvite?: () => void;
  onOpenPermissions?: () => void;
  onMemberAction?: (member: SettingsTeamMember, action: SettingsTeamMemberAction) => void;
  onRoleChange?: (member: SettingsTeamMember, nextRole: string) => void;
}

export function SettingsTeamWorkspace({
  members = defaultSettingsTeamMembers,
  confirmSensitiveActions = true,
  roleOptions = [
    { value: "Dono/Admin", label: "Dono/Admin" },
    { value: "Recepcao", label: "Recepcao" },
    { value: "Professor", label: "Professor" }
  ],
  saveState = "saved",
  blockedReason,
  validationError,
  systemError,
  onRequestAccess,
  onRetry,
  onInvite,
  onOpenPermissions,
  onMemberAction,
  onRoleChange,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsTeamWorkspaceProps) {
  const [pendingAction, setPendingAction] = React.useState<{ member: SettingsTeamMember; action: "deactivate" | "reactivate" } | null>(null);
  const [roleEditorMember, setRoleEditorMember] = React.useState<SettingsTeamMember | null>(null);
  const [nextRole, setNextRole] = React.useState("");
  const [pendingRoleChange, setPendingRoleChange] = React.useState<{ member: SettingsTeamMember; nextRole: string } | null>(null);
  const statusContract: Record<SettingsTeamMemberStatus, { label: string; tone: ComponentTone }> = {
    active: { label: "Ativo", tone: "success" },
    inactive: { label: "Inativo", tone: "neutral" },
    invitePending: { label: "Convite pendente", tone: "warning" }
  };
  const requestMemberAction = (member: SettingsTeamMember, action: SettingsTeamMemberAction) => {
    if (action === "edit" && onRoleChange) {
      setNextRole(member.role);
      setRoleEditorMember(member);
      return;
    }
    if (confirmSensitiveActions && (action === "deactivate" || action === "reactivate")) {
      setPendingAction({ member, action });
      return;
    }
    onMemberAction?.(member, action);
  };
  const pendingIsBlocked = pendingAction?.action === "deactivate" && pendingAction.member.isLastAdmin;
  const isOwnerTransfer = pendingRoleChange?.nextRole === "Dono/Admin" && pendingRoleChange.member.role !== "Dono/Admin";
  const roleChangeIsBlocked = Boolean(pendingRoleChange?.member.isLastAdmin && pendingRoleChange.nextRole !== "Dono/Admin");
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <SetupPagePanel className={cn("tcrm-settings-team-workspace", className)} data-component="SettingsTeamWorkspace" {...props}>
      <SetupBlockHeader description="Gerencie as pessoas que acessam o CRM, seus papeis e o estado dos convites." showBadge={false} title="Equipe" />
      <SettingsWorkspaceControls blocked={Boolean(blockedReason)}>
        <Panel className="tcrm-settings-team-workspace__panel" compact>
        <InlineGroup justify="between">
          <div><h3>Usuarios do CRM</h3><p>Papeis detalhados continuam em Permissoes.</p></div>
          <Button leadingIcon="plus" onClick={onInvite} variant="secondary">Convidar pessoa</Button>
        </InlineGroup>
        <List divided>
          {members.map((member) => {
            const status = statusContract[member.status];
            const statusAction = member.status === "invitePending" ? "resend" : member.status === "inactive" ? "reactivate" : "deactivate";
            const statusActionLabel = member.status === "invitePending" ? "Reenviar convite" : member.status === "inactive" ? "Reativar" : "Desativar";
            return (
              <ListItem
                action={(
                  <InlineGroup>
                    <Chip tone={status.tone}>{status.label}</Chip>
                    <Button onClick={() => requestMemberAction(member, "edit")} size="sm" variant="ghost">Editar</Button>
                    <Button onClick={() => requestMemberAction(member, statusAction)} size="sm" variant="secondary">{statusActionLabel}</Button>
                  </InlineGroup>
                )}
                key={member.id}
                leading={<Avatar name={member.name} size="md" src={member.avatarSrc} />}
                meta={<>{member.email} · Ultimo acesso: {member.lastAccess}</>}
                title={<>{member.name} · {member.role}</>}
              />
            );
          })}
        </List>
        <Button leadingIcon="shield" onClick={onOpenPermissions} variant="ghost">Abrir Permissoes</Button>
        </Panel>
      </SettingsWorkspaceControls>
      <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
      <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
      <Modal
        description="Escolha o novo papel principal. Permissoes finas continuam na pagina Permissoes."
        footer={(
          <ButtonGroup align="end">
            <Button onClick={() => setRoleEditorMember(null)} size="sm" variant="secondary">Cancelar</Button>
            <Button
              disabled={!roleEditorMember || nextRole === roleEditorMember.role}
              onClick={() => {
                if (!roleEditorMember || nextRole === roleEditorMember.role) return;
                setPendingRoleChange({ member: roleEditorMember, nextRole });
                setRoleEditorMember(null);
              }}
              size="sm"
            >
              Revisar alteracao
            </Button>
          </ButtonGroup>
        )}
        onOpenChange={(open) => { if (!open) setRoleEditorMember(null); }}
        open={Boolean(roleEditorMember)}
        title={roleEditorMember ? `Alterar papel de ${roleEditorMember.name}` : "Alterar papel"}
        variant="simple"
      >
        <Select aria-label="Novo papel" onValueChange={setNextRole} options={roleOptions} value={nextRole} />
      </Modal>
      <ConfirmDialog
        blockedReason={pendingIsBlocked ? "O ultimo Dono/Admin nao pode ser desativado." : undefined}
        cancelLabel="Manter acesso"
        confirmLabel={pendingAction?.action === "reactivate" ? "Confirmar reativacao" : "Confirmar desativacao"}
        destructive={pendingAction?.action === "deactivate"}
        description={pendingIsBlocked
          ? "O ultimo Dono/Admin nao pode ser desativado. Transfira a administracao antes de remover este acesso."
          : pendingAction
            ? `${pendingAction.member.name} ${pendingAction.action === "reactivate" ? "voltara a acessar" : "perdera o acesso ao"} CRM. O historico operacional sera preservado.`
            : undefined}
        onCancel={() => setPendingAction(null)}
        onConfirm={() => {
          if (!pendingAction || pendingIsBlocked) return;
          onMemberAction?.(pendingAction.member, pendingAction.action);
          setPendingAction(null);
        }}
        onOpenChange={(open) => { if (!open) setPendingAction(null); }}
        open={Boolean(pendingAction)}
        summary={pendingAction ? <strong>{pendingAction.member.name} · {pendingAction.member.role}</strong> : undefined}
        title={pendingIsBlocked ? "Mantenha um Dono/Admin ativo" : pendingAction?.action === "reactivate" ? "Reativar acesso?" : "Desativar acesso?"}
        tone={pendingIsBlocked ? "sensitive" : undefined}
      />
      <ConfirmDialog
        blockedReason={roleChangeIsBlocked ? "Transfira a administracao antes de alterar o papel do ultimo Dono/Admin." : undefined}
        cancelLabel="Revisar papel"
        confirmLabel={isOwnerTransfer ? "Confirmar transferencia" : "Confirmar alteracao"}
        description={pendingRoleChange
          ? isOwnerTransfer
            ? `${pendingRoleChange.member.name} passara a ser Dono/Admin do studio. Esta transferencia altera o responsavel principal e ficara registrada na auditoria.`
            : `${pendingRoleChange.member.name} mudara de ${pendingRoleChange.member.role} para ${pendingRoleChange.nextRole}. O novo acesso sera aplicado imediatamente.`
          : undefined}
        onCancel={() => {
          if (pendingRoleChange) {
            setNextRole(pendingRoleChange.nextRole);
            setRoleEditorMember(pendingRoleChange.member);
          }
          setPendingRoleChange(null);
        }}
        onConfirm={() => {
          if (!pendingRoleChange || roleChangeIsBlocked) return;
          onRoleChange?.(pendingRoleChange.member, pendingRoleChange.nextRole);
          setPendingRoleChange(null);
        }}
        onOpenChange={(open) => { if (!open) setPendingRoleChange(null); }}
        open={Boolean(pendingRoleChange)}
        summary={pendingRoleChange ? <strong>{pendingRoleChange.member.name} · {pendingRoleChange.member.role} → {pendingRoleChange.nextRole}</strong> : undefined}
        title={roleChangeIsBlocked ? "Mantenha um Dono/Admin ativo" : isOwnerTransfer ? "Transferir Dono/Admin?" : "Confirmar alteracao de papel?"}
        tone="sensitive"
      />
    </SetupPagePanel>
  );
}

export interface SettingsChannelsWorkspaceProps extends Omit<SetupChannelsWorkspaceProps, "header" | "footer" | "onAction" | "disabled">, SettingsWorkspaceSaveProps, SettingsWorkspaceOperationalProps {}

export function SettingsChannelsWorkspace({ saveState = "saved", blockedReason, validationError, systemError, onRequestAccess, onRetry, onSave, onCancel, className, ...props }: SettingsChannelsWorkspaceProps) {
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <SetupChannelsWorkspace
      className={cn("tcrm-settings-inherited-workspace", className)}
      data-component="SettingsChannelsWorkspace"
      disabled={Boolean(blockedReason)}
      footer={<>
        <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
        <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
      </>}
      header={<SetupBlockHeader description="Defina os canais oficiais e acompanhe a conexao tecnica sem configurar mensagens ou automacoes." showBadge={false} title="Canais" />}
      {...props}
    />
  );
}

export interface SettingsPlansWorkspaceProps extends Omit<SetupPlansWorkspaceProps, "header" | "footer" | "onAction" | "destructiveAction" | "disabled">, SettingsWorkspaceSaveProps, SettingsWorkspaceOperationalProps {}

const defaultSettingsPlanStates: NonNullable<SetupPlansWorkspaceProps["planStates"]> = {
  weekly: { label: "Ativo", tone: "success", studentsUsing: 18 },
  pack: { label: "Ativo", tone: "success", studentsUsing: 7 },
  trial: { label: "Inativo", tone: "neutral", studentsUsing: 0 }
};

export function SettingsPlansWorkspace({ planStates = defaultSettingsPlanStates, saveState = "saved", blockedReason, validationError, systemError, onRequestAccess, onRetry, onSave, onCancel, className, ...props }: SettingsPlansWorkspaceProps) {
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <SetupPlansWorkspace
      className={cn("tcrm-settings-inherited-workspace", className)}
      data-component="SettingsPlansWorkspace"
      destructiveAction="deactivate"
      disabled={Boolean(blockedReason)}
      footer={<>
        <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
        <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
      </>}
      header={<SetupBlockHeader description="Configure o que o aluno compra, o consumo de aulas e as regras simples de reposicao." showBadge={false} title="Planos e modelos" />}
      planStates={planStates}
      {...props}
    />
  );
}

export interface ConfigImpactPreviewProps extends ImpactSummaryProps {}

export function ConfigImpactPreview({
  state = "medium",
  className,
  ...props
}: ConfigImpactPreviewProps) {
  return (
    <ImpactSummary
      className={cn("tcrm-config-impact-preview", className)}
      data-component="ConfigImpactPreview"
      data-state={state}
      state={state}
      {...props}
    />
  );
}

export type PermissionRoleCardTone = "success" | "warning" | "info";

export interface PermissionRoleCardData {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  icon: IconName;
  status: React.ReactNode;
  tone?: PermissionRoleCardTone;
  permissions: React.ReactNode[];
}

export interface PermissionRoleCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "onSelect" | "title">, PermissionRoleCardData {
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (roleId: string) => void;
}

export function PermissionRoleCard({
  id,
  title,
  description,
  icon,
  status,
  tone = "info",
  permissions,
  selected = false,
  disabled = false,
  onSelect,
  className,
  ...props
}: PermissionRoleCardProps) {
  return (
    <Card
      className={cn("tcrm-permission-role-card", selected && "tcrm-permission-role-card--selected", className)}
      data-component="PermissionRoleCard"
      data-role-id={id}
      data-state={selected ? "selected" : "source"}
      data-tone={tone}
      {...props}
    >
      <button aria-pressed={selected} className="tcrm-permission-role-card__select" disabled={disabled} onClick={() => onSelect?.(id)} type="button">
        <span className="tcrm-permission-role-card__icon"><Icon name={icon} /></span>
        <span className="tcrm-permission-role-card__copy">
          <strong>{title}</strong>
          <small>{description}</small>
          <Chip tone={tone === "success" ? "success" : tone === "warning" ? "warning" : "info"}>{status}</Chip>
        </span>
        <span className="tcrm-permission-role-card__permissions">
          {permissions.map((permission, index) => <span key={index}><Icon name="check" />{permission}</span>)}
        </span>
      </button>
    </Card>
  );
}

const settingsPermissionsDefaultRoles: PermissionRoleCardData[] = [
  {
    id: "owner",
    title: "Dono/Admin",
    description: "Acesso completo ao CRM.",
    icon: "shieldCheck",
    status: "Completo",
    tone: "success",
    permissions: ["Configurações", "Financeiro", "Equipe", "Agentes e fluxos"]
  },
  {
    id: "frontdesk",
    title: "Recepção",
    description: "Operação diária, alunos, agenda e cobranças permitidas.",
    icon: "user",
    status: "Revisar",
    tone: "warning",
    permissions: ["Agenda completa", "Cadastro de alunos", "Presença e faltas", "Baixa manual, se permitido"]
  },
  {
    id: "teacher",
    title: "Professor",
    description: "Aulas, turmas vinculadas e alunos das próprias turmas.",
    icon: "graduation",
    status: "Pronto",
    tone: "info",
    permissions: ["Própria agenda", "Turmas vinculadas", "Chamada", "Observações permitidas"]
  }
];

export interface SettingsPermissionsWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceOperationalProps {
  roles?: PermissionRoleCardData[];
  selectedRoleId?: string;
  permissionRows?: PermissionMatrixRow[];
  saveState?: UnsavedChangesBarState;
  requiresApproval?: boolean;
  onRoleSelect?: (roleId: string) => void;
  onPermissionToggle?: PermissionMatrixProps["onToggleChange"];
  onPermissionSelect?: PermissionMatrixProps["onSelectChange"];
  onSave?: () => void;
  onCancel?: () => void;
}

export function SettingsPermissionsWorkspace({
  roles = settingsPermissionsDefaultRoles,
  selectedRoleId,
  permissionRows,
  saveState = "dirty",
  blockedReason,
  validationError,
  systemError,
  requiresApproval = false,
  onRequestAccess,
  onRetry,
  onRoleSelect,
  onPermissionToggle,
  onPermissionSelect,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsPermissionsWorkspaceProps) {
  const [approvalOpen, setApprovalOpen] = React.useState(false);
  const saveBlocked = Boolean(blockedReason || validationError);
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  const requestSave = () => {
    if (saveBlocked) return;
    if (systemError) {
      (onRetry ?? onSave)?.();
      return;
    }
    if (requiresApproval) {
      setApprovalOpen(true);
      return;
    }
    onSave?.();
  };
  return (
    <section className={cn("tcrm-settings-permissions-workspace", className)} data-component="SettingsPermissionsWorkspace" {...props}>
      <section className="tcrm-settings-permissions-workspace__roles">
        <header>
          <h3>1. Papéis do CRM</h3>
          <p>Escolha o papel para entender o nível de acesso.</p>
        </header>
        <div className="tcrm-settings-permissions-workspace__role-grid">
          {roles.map((role) => (
            <PermissionRoleCard
              {...role}
              disabled={Boolean(blockedReason)}
              key={role.id}
              onSelect={onRoleSelect}
              selected={role.id === selectedRoleId}
            />
          ))}
        </div>
      </section>
      <PermissionMatrix blockedReason={blockedReason} onSelectChange={onPermissionSelect} onToggleChange={onPermissionToggle} rows={permissionRows} state={blockedReason ? "blocked" : "source"} />
      {blockedReason && onRequestAccess ? <Button onClick={onRequestAccess} size="sm" variant="secondary">Pedir acesso</Button> : null}
      <SettingsWorkspaceFeedback onRetry={onRetry} systemError={systemError} validationError={validationError} />
      {requiresApproval ? <InlineAlert tone="warning" title="Aprovação necessária">Um Dono/Admin precisa confirmar o aumento de permissão sensível.</InlineAlert> : null}
      <ConfigImpactPreview />
      <UnsavedChangesBar onCancel={onCancel} onSave={requestSave} state={resolvedSaveState} />
      <ConfirmDialog
        cancelLabel="Revisar ajuste"
        confirmLabel="Confirmar como Dono/Admin"
        description="Esta mudança amplia acesso a dados ou ações sensíveis e ficará registrada na auditoria."
        onCancel={() => setApprovalOpen(false)}
        onConfirm={() => { onSave?.(); setApprovalOpen(false); }}
        onOpenChange={setApprovalOpen}
        open={approvalOpen}
        summary={<strong>Permissões sensíveis da equipe</strong>}
        title="Confirmar aumento de permissão?"
        tone="sensitive"
      />
    </section>
  );
}

export interface SettingsPaymentsWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceOperationalProps {
  enabledMethods?: PaymentMethodRowMethod[];
  taliyaPaymentsState?: SettingsTaliyaPaymentsState;
  saveState?: UnsavedChangesBarState;
  ruleRows?: SettingsSectionRow[];
  onMethodSelect?: (method: PaymentMethodRowMethod) => void;
  onRuleAction?: (row: SettingsSectionRow) => void;
  onRuleToggle?: (row: SettingsSectionRow, checked: boolean) => void;
  onActivate?: () => void;
  onTechnicalIntegration?: () => void;
  onViewPlan?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export type SettingsTaliyaPaymentsState = "pending" | "active" | "blocked" | "error";

const settingsPaymentMethods: Array<{
  method: PaymentMethodRowMethod;
  title: string;
  description: string;
}> = [
  { method: "pix", title: "Pix manual", description: "Baixa pela equipe ou comprovante." },
  { method: "cash", title: "Dinheiro", description: "Recebido presencialmente." },
  { method: "card", title: "Cartão presencial", description: "Registrado pela equipe." }
];

const settingsPaymentIntegrations: Array<{
  provider: IntegrationProvider;
  title: string;
}> = [
  { provider: "pix", title: "Pix Taliya" },
  { provider: "card", title: "Cartão online" },
  { provider: "recurrence", title: "Recorrência online" },
  { provider: "reconciliation", title: "Baixa automática e conciliação" }
];

export function SettingsPaymentsWorkspace({
  enabledMethods = ["pix", "cash", "card"],
  taliyaPaymentsState = "pending",
  saveState = "dirty",
  blockedReason,
  validationError,
  systemError,
  onRequestAccess,
  onRetry,
  ruleRows,
  onMethodSelect,
  onRuleAction,
  onRuleToggle,
  onActivate,
  onTechnicalIntegration,
  onViewPlan,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsPaymentsWorkspaceProps) {
  const taliyaPaymentsContract: Record<SettingsTaliyaPaymentsState, {
    status: string;
    tone: ComponentTone;
    integrationState: IntegrationStatusRowState;
    actionLabel?: string;
  }> = {
    pending: { status: "Aguardando ativação", tone: "warning", integrationState: "blocked", actionLabel: "Ativar Pagamentos Taliya" },
    active: { status: "Ativo", tone: "success", integrationState: "connected" },
    blocked: { status: "Plano necessário", tone: "danger", integrationState: "blocked", actionLabel: "Ver plano" },
    error: { status: "Falha técnica", tone: "danger", integrationState: "failed", actionLabel: "Revisar ativação" }
  };
  const paymentsContract = taliyaPaymentsContract[taliyaPaymentsState];
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <section className={cn("tcrm-settings-payments-workspace", className)} data-component="SettingsPaymentsWorkspace" {...props}>
      <SettingsWorkspaceControls blocked={Boolean(blockedReason)}>
        <Card className="tcrm-settings-payments-workspace__methods">
        <header>
          <h3>1. Meios e baixa manual</h3>
          <p>Meios que a equipe pode registrar no Taliya.</p>
        </header>
        <div className="tcrm-settings-payments-workspace__method-grid">
          {settingsPaymentMethods.map((method) => (
            <PaymentMethodRow
              description={method.description}
              key={method.method}
              method={method.method}
              onSelect={(selectedMethod) => onMethodSelect?.(selectedMethod)}
              selected={enabledMethods.includes(method.method)}
              state="connected"
              title={method.title}
            />
          ))}
        </div>
        </Card>

        <SettingsSection onRowAction={onRuleAction} onToggleChange={onRuleToggle} rows={ruleRows} />

        <Card className="tcrm-settings-payments-workspace__taliya">
        <header>
          <span>
            <h3>3. Pagamentos Taliya</h3>
            <p>Ative pagamentos online quando quiser automatizar baixa e recorrência.</p>
          </span>
          <Chip tone={paymentsContract.tone}>{paymentsContract.status}</Chip>
        </header>
        <div className="tcrm-settings-payments-workspace__integration-grid">
          {settingsPaymentIntegrations.map((integration, index) => (
            <IntegrationStatusRow
              key={integration.provider}
              provider={integration.provider}
              showDivider={index < settingsPaymentIntegrations.length - 1}
              state={paymentsContract.integrationState}
              title={integration.title}
            />
          ))}
        </div>
        <footer>
          {paymentsContract.actionLabel ? (
            <Button onClick={taliyaPaymentsState === "blocked" ? onViewPlan : onActivate} variant="primary">{paymentsContract.actionLabel}</Button>
          ) : <span />}
          <p>Dados legais e bancários são preenchidos no provedor seguro, fora da Taliya.</p>
          <Button onClick={onTechnicalIntegration} trailingIcon="externalLink" variant="ghost">Ver integração técnica</Button>
        </footer>
        </Card>
      </SettingsWorkspaceControls>

      <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
      <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
    </section>
  );
}

export interface SettingsAgendaRow {
  id: string;
  title: React.ReactNode;
  schedule: React.ReactNode;
  scope?: React.ReactNode;
  status: React.ReactNode;
  statusTone?: ComponentTone;
}

export interface SettingsAgendaWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceOperationalProps {
  closedDays?: SettingsAgendaRow[];
  temporaryBlocks?: SettingsAgendaRow[];
  ruleValues?: Partial<SettingsAgendaRuleValues>;
  saveState?: UnsavedChangesBarState;
  onAddException?: () => void;
  onAddBlock?: () => void;
  onRowAction?: (rowId: string, action: "edit" | "open") => void;
  onRuleChange?: (ruleId: string, value: string | boolean) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export interface SettingsAgendaRuleValues {
  waitlist: boolean;
  fitIns: string;
  callTolerance: string;
}

const settingsAgendaClosedDays: SettingsAgendaRow[] = [
  { id: "christmas", title: "Natal", schedule: "25/12", scope: "Todas as unidades", status: "Fechado", statusTone: "danger" },
  { id: "year-break", title: "Recesso de fim de ano", schedule: "23/12 a 02/01", scope: "Unidade Jardins", status: "Revisar aulas futuras", statusTone: "warning" },
  { id: "special-saturday", title: "Sábado especial", schedule: "Sábados até 12h", scope: "Horário reduzido", status: "Horário reduzido", statusTone: "info" }
];

const settingsAgendaTemporaryBlocks: SettingsAgendaRow[] = [
  { id: "room-maintenance", title: "Manutenção Sala 2", schedule: "28/05, 14h às 18h", status: "Afeta 3 aulas", statusTone: "warning" },
  { id: "internal-workshop", title: "Workshop interno", schedule: "01/06, manhã", status: "Bloqueia novas marcações", statusTone: "info" }
];

export function SettingsAgendaWorkspace({
  closedDays = settingsAgendaClosedDays,
  temporaryBlocks = settingsAgendaTemporaryBlocks,
  ruleValues = {},
  saveState = "dirty",
  blockedReason,
  validationError,
  systemError,
  onRequestAccess,
  onRetry,
  onAddException,
  onAddBlock,
  onRowAction,
  onRuleChange,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsAgendaWorkspaceProps) {
  const resolvedRuleValues: SettingsAgendaRuleValues = { waitlist: true, fitIns: "approval", callTolerance: "10", ...ruleValues };
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  const renderRows = (rows: SettingsAgendaRow[], icon: IconName) => (
    <div className="tcrm-settings-agenda-workspace__rows" role="list">
      {rows.map((row) => (
        <div className="tcrm-settings-agenda-workspace__row" key={row.id} role="listitem">
          <Icon name={icon} />
          <strong>{row.title}</strong>
          <span>{row.schedule}</span>
          {row.scope ? <span>{row.scope}</span> : <span />}
          <Chip tone={row.statusTone ?? "neutral"}>{row.status}</Chip>
          <IconButton icon="edit" label={`Editar ${String(row.title)}`} onClick={() => onRowAction?.(row.id, "edit")} size="sm" variant="ghost" />
          <IconButton icon="chevronRight" label={`Abrir ${String(row.title)}`} onClick={() => onRowAction?.(row.id, "open")} size="sm" variant="ghost" />
        </div>
      ))}
    </div>
  );

  return (
    <section className={cn("tcrm-settings-agenda-workspace", className)} data-component="SettingsAgendaWorkspace" {...props}>
      <SettingsWorkspaceControls blocked={Boolean(blockedReason)}>
        <Card className="tcrm-settings-agenda-workspace__section">
        <header>
          <span><h3>1. Dias fechados e exceções</h3><p>Defina feriados, recessos e horários especiais sem mudar a agenda fixa do studio.</p></span>
          <Button onClick={onAddException} trailingIcon="plus" variant="secondary">Adicionar exceção</Button>
        </header>
        {renderRows(closedDays, "calendar")}
        </Card>

        <Card className="tcrm-settings-agenda-workspace__section">
        <header>
          <span><h3>2. Bloqueios temporários</h3><p>Bloqueie sala, turma ou período quando algo não puder receber marcações.</p></span>
          <Button onClick={onAddBlock} trailingIcon="plus" variant="secondary">Adicionar bloqueio</Button>
        </header>
        {renderRows(temporaryBlocks, "lock")}
        </Card>

        <Card className="tcrm-settings-agenda-workspace__section tcrm-settings-agenda-workspace__rules">
        <header><span><h3>3. Regras simples da agenda</h3><p>Ajustes globais que mudam como a agenda aceita vagas e encaixes.</p></span></header>
        <div>
          <RuleRow checked={resolvedRuleValues.waitlist} control="none" icon="users" onToggle={(checked) => onRuleChange?.("waitlist", checked)} statusLabel={resolvedRuleValues.waitlist ? "Ligada" : "Desligada"} title="Lista de espera" />
          <RuleRow
            icon="slidersRound"
            onSelectChange={(value) => onRuleChange?.("fit-ins", value)}
            selectOptions={[{ value: "approval", label: "Exigem aprovação" }, { value: "free", label: "Livres" }]}
            selectValue={resolvedRuleValues.fitIns}
            showToggle={false}
            statusLabel={null}
            title="Encaixes"
          />
          <RuleRow
            icon="clock"
            onSelectChange={(value) => onRuleChange?.("call-tolerance", value)}
            selectOptions={[{ value: "10", label: "10 min" }, { value: "15", label: "15 min" }]}
            selectValue={resolvedRuleValues.callTolerance}
            showToggle={false}
            statusLabel={null}
            title="Tolerância de chamada"
          />
        </div>
        </Card>
      </SettingsWorkspaceControls>

      <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
      <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
    </section>
  );
}

export interface SettingsNotificationAlert {
  id: string;
  label: React.ReactNode;
  icon: IconName;
}

export interface SettingsNotificationRole {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  icon: IconName;
  tone: "danger" | "info" | "success";
  alerts: SettingsNotificationAlert[];
}

export interface SettingsNotificationsWorkspaceProps extends React.HTMLAttributes<HTMLElement>, SettingsWorkspaceOperationalProps {
  roles?: SettingsNotificationRole[];
  enabledAlertTypesByRole?: Partial<Record<string, string[]>>;
  reviewAlertIdsByRole?: Partial<Record<string, string[]>>;
  unavailableChannelReasons?: Partial<Record<SettingsNotificationChannelId, string>>;
  frequencyRules?: Partial<Record<SettingsNotificationFrequencyId, SettingsNotificationRuleValue>>;
  channelRules?: Partial<Record<SettingsNotificationChannelId, SettingsNotificationRuleValue>>;
  saveState?: UnsavedChangesBarState;
  selectedRoleId?: string;
  onRoleSelect?: (roleId: string) => void;
  onAlertToggle?: (roleId: string, alertId: string, enabled: boolean) => void;
  onFrequencyChange?: (alertId: string, value: string | boolean) => void;
  onChannelChange?: (channelId: string, value: string | boolean) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export type SettingsNotificationFrequencyId = "critical" | "operational" | "informative" | "non-critical";
export type SettingsNotificationChannelId = "taliya" | "email" | "whatsapp" | "after-hours";

export interface SettingsNotificationRuleValue {
  value: string;
  enabled: boolean;
}

const defaultSettingsNotificationFrequencyRules: Record<SettingsNotificationFrequencyId, SettingsNotificationRuleValue> = {
  critical: { value: "immediate", enabled: true },
  operational: { value: "daily", enabled: true },
  informative: { value: "weekly", enabled: true },
  "non-critical": { value: "silent-after-hours", enabled: true }
};

const defaultSettingsNotificationChannelRules: Record<SettingsNotificationChannelId, SettingsNotificationRuleValue> = {
  taliya: { value: "enabled", enabled: true },
  email: { value: "owner", enabled: true },
  whatsapp: { value: "critical", enabled: true },
  "after-hours": { value: "critical", enabled: true }
};

const settingsNotificationRoles: SettingsNotificationRole[] = [
  {
    id: "owner", title: "Dono/Admin", description: "Falhas críticas, aprovações sensíveis e financeiro.", icon: "shieldStar", tone: "danger",
    alerts: [
      { id: "integration-failure", label: "Integração com falha", icon: "alert" },
      { id: "critical-payment", label: "Pagamento crítico", icon: "play" },
      { id: "pending-approval", label: "Aprovação pendente", icon: "shield" },
      { id: "config-pending", label: "Pendência de configuração", icon: "alertCircle" }
    ]
  },
  {
    id: "frontdesk", title: "Recepção", description: "Operação diária, agenda, alunos e cobranças manuais.", icon: "user", tone: "info",
    alerts: [
      { id: "class-problem", label: "Aula com problema", icon: "inbox" },
      { id: "student-no-contact", label: "Aluno sem contato", icon: "users" },
      { id: "manual-charge", label: "Cobrança manual", icon: "coins" },
      { id: "pending-invite", label: "Convite pendente", icon: "fileText" }
    ]
  },
  {
    id: "teacher", title: "Professor", description: "Aulas, turmas vinculadas e pendências das próprias turmas.", icon: "graduation", tone: "success",
    alerts: [
      { id: "own-class", label: "Aula da própria turma", icon: "calendar" },
      { id: "pending-roll-call", label: "Chamada pendente", icon: "alertCircle" },
      { id: "student-no-contact", label: "Aluno sem contato", icon: "user" },
      { id: "important-note", label: "Observação importante", icon: "graduation" }
    ]
  }
];

export function SettingsNotificationsWorkspace({
  roles = settingsNotificationRoles,
  enabledAlertTypesByRole = {},
  reviewAlertIdsByRole = {},
  unavailableChannelReasons = {},
  frequencyRules = {},
  channelRules = {},
  saveState = "dirty",
  blockedReason,
  validationError,
  systemError,
  onRequestAccess,
  onRetry,
  selectedRoleId,
  onRoleSelect,
  onAlertToggle,
  onFrequencyChange,
  onChannelChange,
  onSave,
  onCancel,
  className,
  ...props
}: SettingsNotificationsWorkspaceProps) {
  const frequency = { ...defaultSettingsNotificationFrequencyRules, ...frequencyRules };
  const channels = { ...defaultSettingsNotificationChannelRules, ...channelRules };
  const resolvedSaveState = resolveSettingsWorkspaceSaveState(saveState, { blockedReason, validationError, systemError });
  return (
    <section className={cn("tcrm-settings-notifications-workspace", className)} data-component="SettingsNotificationsWorkspace" {...props}>
      <SettingsWorkspaceControls blocked={Boolean(blockedReason)}>
        <Card className="tcrm-settings-notifications-workspace__section tcrm-settings-notifications-workspace__roles">
        <header><h3>1. Alertas por papel</h3><p>Escolha quais alertas cada papel da equipe deve receber.</p></header>
        <div className="tcrm-settings-notifications-workspace__role-grid">
          {roles.map((role) => {
            const enabledAlerts = enabledAlertTypesByRole[role.id] ?? role.alerts.map((alert) => alert.id);
            const reviewAlerts = reviewAlertIdsByRole[role.id] ?? [];
            return (
              <Card
                className={cn("tcrm-settings-notifications-workspace__role", role.id === selectedRoleId && "tcrm-settings-notifications-workspace__role--selected")}
                data-role-id={role.id}
                key={role.id}
              >
                <Button
                  aria-label={`Selecionar papel ${String(role.title)}`}
                  aria-pressed={role.id === selectedRoleId}
                  className="tcrm-settings-notifications-workspace__role-select"
                  onClick={() => onRoleSelect?.(role.id)}
                  variant="ghost"
                >
                  <span className="tcrm-settings-notifications-workspace__role-icon" data-tone={role.tone}><Icon name={role.icon} /></span>
                  <span className="tcrm-settings-notifications-workspace__role-copy"><strong>{role.title}</strong><small>{role.description}</small></span>
                </Button>
                <span className="tcrm-settings-notifications-workspace__alerts">
                  {role.alerts.map((alert) => {
                    const enabled = enabledAlerts.includes(alert.id);
                    const needsReview = reviewAlerts.includes(alert.id);
                    return (
                      <Button
                        aria-label={`Alternar ${String(alert.label)} para ${String(role.title)}`}
                        aria-pressed={enabled}
                        className={cn("tcrm-settings-notifications-workspace__alert", needsReview && "tcrm-settings-notifications-workspace__alert--review")}
                        key={alert.id}
                        onClick={() => onAlertToggle?.(role.id, alert.id, !enabled)}
                        variant="ghost"
                      >
                        <Chip icon={alert.icon} showDot={false} tone={enabled ? role.tone : "neutral"}>{alert.label}</Chip>
                        {needsReview ? <Chip icon="alert" showDot={false} tone="warning">Revisar</Chip> : null}
                      </Button>
                    );
                  })}
                </span>
              </Card>
            );
          })}
        </div>
        </Card>

        <Card className="tcrm-settings-notifications-workspace__section tcrm-settings-notifications-workspace__rules">
        <header><h3>2. Frequência dos alertas</h3><p>Defina quando o Taliya avisa a equipe.</p></header>
        <div className="tcrm-settings-notifications-workspace__rule-head"><span>Nível de alerta</span><span>Frequência</span><span>Status</span></div>
        <RuleRow checked={frequency.critical.enabled} icon="alert" iconTone="danger" onSelectChange={(value) => onFrequencyChange?.("critical", value)} onToggle={(value) => onFrequencyChange?.("critical", value)} rowId="critical" selectValue={frequency.critical.value} title="Crítico" />
        <RuleRow checked={frequency.operational.enabled} icon="alertCircle" iconTone="warning" onSelectChange={(value) => onFrequencyChange?.("operational", value)} onToggle={(value) => onFrequencyChange?.("operational", value)} rowId="operational" selectValue={frequency.operational.value} title="Operacional" />
        <RuleRow checked={frequency.informative.enabled} icon="info" iconTone="info" onSelectChange={(value) => onFrequencyChange?.("informative", value)} onToggle={(value) => onFrequencyChange?.("informative", value)} rowId="informative" selectValue={frequency.informative.value} title="Informativo" />
        <RuleRow checked={frequency["non-critical"].enabled} icon="minus" onSelectChange={(value) => onFrequencyChange?.("non-critical", value)} onToggle={(value) => onFrequencyChange?.("non-critical", value)} rowId="non-critical" selectValue={frequency["non-critical"].value} title="Não crítico" />
        </Card>

        <Card className="tcrm-settings-notifications-workspace__section tcrm-settings-notifications-workspace__channels">
        <header><h3>3. Canais internos</h3><p>Escolha onde a equipe recebe avisos internos do CRM.</p></header>
        <RuleRow blockedReason={unavailableChannelReasons.taliya} checked={channels.taliya.enabled} control="none" description={unavailableChannelReasons.taliya} icon="layout" onToggle={(value) => onChannelChange?.("taliya", value)} rowId="taliya" state={unavailableChannelReasons.taliya ? "blocked" : "enabled"} title="Dentro do Taliya" />
        <RuleRow blockedReason={unavailableChannelReasons.email} description={unavailableChannelReasons.email} icon="mail" onSelectChange={(value) => onChannelChange?.("email", value)} rowId="email" selectOptions={[{ value: "owner", label: "Ligado para Dono/Admin" }, { value: "all", label: "Ligado para todos" }]} selectValue={channels.email.value} showToggle={false} state={unavailableChannelReasons.email ? "blocked" : "enabled"} statusLabel={null} title="E-mail interno" />
        <RuleRow blockedReason={unavailableChannelReasons.whatsapp} description={unavailableChannelReasons.whatsapp} icon="whatsapp" iconTone="success" onSelectChange={(value) => onChannelChange?.("whatsapp", value)} rowId="whatsapp" selectOptions={[{ value: "critical", label: "Ligado para alertas críticos" }, { value: "all", label: "Ligado para todos" }]} selectValue={channels.whatsapp.value} showToggle={false} state={unavailableChannelReasons.whatsapp ? "blocked" : "enabled"} statusLabel={null} title="WhatsApp interno" />
        <RuleRow blockedReason={unavailableChannelReasons["after-hours"]} description={unavailableChannelReasons["after-hours"]} icon="clock" onSelectChange={(value) => onChannelChange?.("after-hours", value)} rowId="after-hours" selectOptions={[{ value: "critical", label: "Somente crítico" }, { value: "silent", label: "Silenciado" }]} selectValue={channels["after-hours"].value} showToggle={false} state={unavailableChannelReasons["after-hours"] ? "blocked" : "enabled"} statusLabel={null} title="Fora do horário" />
        </Card>
      </SettingsWorkspaceControls>

      <SettingsWorkspaceFeedback blockedReason={blockedReason} onRequestAccess={onRequestAccess} onRetry={onRetry} systemError={systemError} validationError={validationError} />
      <UnsavedChangesBar onCancel={onCancel} onSave={systemError ? onRetry ?? onSave : onSave} state={resolvedSaveState} />
    </section>
  );
}

export type ConversationListState = "source" | "loading" | "empty" | "blocked";
