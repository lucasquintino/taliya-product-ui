/** Setup import-source card composition. */
import React from "react";
import { Icon, PrimitiveButton, cn } from "@taliya/ui";
import type { IconName } from "@taliya/ui";

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
    <PrimitiveButton
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
    </PrimitiveButton>
  );
}
