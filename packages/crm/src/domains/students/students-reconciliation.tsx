/** Finance reconciliation row composition. */
import React from "react";
import { Avatar, Chip, IconButton, cn } from "@taliya/ui";
import type { CrmSurfaceProps } from "../../patterns/shell.js";
import { stateKey, toneForState } from "./students-utilities.js";

const reconciliationDefaults = {
  matched: {
    name: "Juliana Rocha",
    type: "Pagamento recebido",
    status: "Pago",
    amount: "R$ 420,00",
    due: "-",
    plan: "Plano Mensal",
    method: "Pix",
    origin: "WhatsApp",
    responsible: "Mariana",
    lastActivity: "pago hoje 09:12"
  },
  ambiguous: {
    name: "Ana Paula Martins",
    type: "Conciliacao pendente",
    status: "Pendente",
    amount: "R$ 420,00",
    due: "-",
    plan: "Plano Mensal",
    method: "Pix",
    origin: "Importacao",
    responsible: "Financeiro",
    lastActivity: "comprovante enviado 09:45"
  },
  dispute: {
    name: "Gabriel Lima",
    type: "Cobranca atrasada",
    status: "Em atraso",
    amount: "R$ 420,00",
    due: "12/05",
    plan: "Plano Mensal",
    method: "Cartao",
    origin: "Sistema",
    responsible: "Financeiro",
    lastActivity: "lembrete ontem"
  }
} satisfies Record<string, Record<string, React.ReactNode>>;

export function ReconciliationRow({
  title,
  name,
  typeLabel,
  statusLabel,
  amount,
  due,
  plan,
  method,
  origin,
  responsible,
  lastActivity,
  avatarSrc,
  state = "ambiguous",
  onAction,
  className
}: CrmSurfaceProps & {
  name?: React.ReactNode;
  typeLabel?: React.ReactNode;
  statusLabel?: React.ReactNode;
  amount?: React.ReactNode;
  due?: React.ReactNode;
  plan?: React.ReactNode;
  method?: React.ReactNode;
  origin?: React.ReactNode;
  responsible?: React.ReactNode;
  lastActivity?: React.ReactNode;
  avatarSrc?: string;
  onAction?: () => void;
}) {
  const key = stateKey(state) || "ambiguous";
  const defaults = reconciliationDefaults[key as keyof typeof reconciliationDefaults] ?? reconciliationDefaults.ambiguous;
  const displayName = name ?? title ?? defaults.name;
  const displayType = typeLabel ?? defaults.type;
  const displayStatus = statusLabel ?? defaults.status;
  const paymentMethod = method ?? defaults.method;

  return (
    <div className={cn("tcrm-reconciliation-row", `tcrm-reconciliation-row--${key}`, className)}>
      <Avatar name={String(displayName)} size="sm" src={avatarSrc} />
      <strong>{displayName}</strong>
      <Chip className="tcrm-reconciliation-row__type" showDot={false} tone={key === "dispute" ? "danger" : key === "matched" ? "success" : "info"}>{displayType}</Chip>
      <Chip className="tcrm-reconciliation-row__status" showDot={false} tone={toneForState(state)}>{displayStatus}</Chip>
      <span>{amount ?? defaults.amount}</span>
      <span>{due ?? defaults.due}</span>
      <span>{plan ?? defaults.plan}</span>
      <span className="tcrm-reconciliation-row__method">
        <span className={cn("tcrm-reconciliation-row__method-mark", `tcrm-reconciliation-row__method-mark--${stateKey(paymentMethod)}`)} aria-hidden="true" />
        {paymentMethod}
      </span>
      <span>{origin ?? defaults.origin}</span>
      <span>{responsible ?? defaults.responsible}</span>
      <span className="tcrm-reconciliation-row__activity">{lastActivity ?? defaults.lastActivity}</span>
      <IconButton icon="more" label={`Mais acoes de ${String(displayName)}`} onClick={() => onAction?.()} size="sm" variant="ghost" />
    </div>
  );
}
