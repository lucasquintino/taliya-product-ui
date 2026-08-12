/** Settings save-state and workspace foundation. */
import React from "react";
import { Button, InlineAlert, cn } from "@taliya/ui";


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

export function resolveSettingsWorkspaceSaveState(
  saveState: UnsavedChangesBarState,
  { blockedReason, validationError, systemError }: Pick<SettingsWorkspaceOperationalProps, "blockedReason" | "validationError" | "systemError">
): UnsavedChangesBarState {
  if (systemError) return "error";
  if (blockedReason || validationError) return "blocked";
  return saveState;
}

export function SettingsWorkspaceControls({
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

export function SettingsWorkspaceFeedback({
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
