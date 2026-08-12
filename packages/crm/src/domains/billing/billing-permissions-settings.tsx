/** Permission matrix and rule surfaces. */
import React from "react";
import { Card, EmptyState, ErrorState, Icon, InlineAlert, LoadingState, Select, Toggle, cn } from "@taliya/ui";
import type { ComponentTone, SelectOption } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";


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


export * from "./billing-settings-hub.js";


export * from "./billing-settings-hub.js";
