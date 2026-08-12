/** Impact, diff, and settings-section surfaces. */
import React from "react";
import { Button, Card, Chip, DiffTable, EmptyState, ErrorState, Icon, InlineAlert, ListIcon, LoadingState, Toggle, cn } from "@taliya/ui";
import type { ComponentTone, DiffTableRow, IconName } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";

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
          <div aria-label={index === 0 ? "Regras de vencimento" : "Regras de cobrança"} className="tcrm-settings-section__group" key={columnRows.map((row) => row.id).join("|")} role="rowgroup">
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
