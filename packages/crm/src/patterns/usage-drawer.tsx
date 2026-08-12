/** Usage drawer pattern. */
import React from "react";
import { Button, Icon, IconButton, Input, TaliyaLogo, cn } from "@taliya/ui";
import { CrmDrawer } from "./drawer-core.js";

export type UsageDrawerState = "ledger" | "overview" | "quota" | "loading" | "blocked";
export type UsageDrawerAction = "close" | "menu" | "select-question" | "send-question" | "open-ticket";

export interface UsageDrawerQuestion {
  id: string;
  label: React.ReactNode;
}

export interface UsageDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSelect"> {
  open?: boolean;
  state?: UsageDrawerState;
  title?: React.ReactNode;
  roleLabel?: React.ReactNode;
  message?: React.ReactNode;
  questions?: UsageDrawerQuestion[];
  placeholder?: string;
  helpLabel?: React.ReactNode;
  helpActionLabel?: React.ReactNode;
  onAction?: (action: UsageDrawerAction, payload?: string) => void;
  onClose?: () => void;
  onQuestionSubmit?: (value: string) => void;
}

const usageDrawerQuestionsByState: Record<Exclude<UsageDrawerState, "loading" | "blocked">, UsageDrawerQuestion[]> = {
  ledger: [
    { id: "quota-consumption", label: "O que consome cota?" },
    { id: "estimated", label: "Por que aparece estimado?" },
    { id: "reprocessed", label: "O que e reprocessado?" },
    { id: "subscription", label: "Onde vejo minha assinatura?" }
  ],
  overview: [
    { id: "quota-consumption", label: "O que consome cota?" },
    { id: "ninety-percent", label: "O que acontece em 90%?" },
    { id: "hundred-percent", label: "O que acontece em 100%?" },
    { id: "buy-package", label: "Onde compro pacote?" }
  ],
  quota: [
    { id: "current-cycle", label: "Como funciona o ciclo atual?" },
    { id: "next-alert", label: "Quando recebo alertas?" },
    { id: "paused-automation", label: "O que pausa em 100%?" },
    { id: "add-ons", label: "Como adiciono pacote?" }
  ]
};

const usageDrawerCopy: Record<UsageDrawerState, { role: React.ReactNode; message: React.ReactNode; placeholder: string; questions: UsageDrawerQuestion[] }> = {
  ledger: {
    role: "Ajudando com uso",
    message: <>Este extrato mostra o que<br />consumiu sua cota Taliya.<br />Plano, faturas e add-ons<br />ficam em Billing.</>,
    placeholder: "Pergunte sobre o extrato...",
    questions: usageDrawerQuestionsByState.ledger
  },
  overview: {
    role: "Ajudando com uso",
    message: <>Uso mostra quanto da sua cota<br />foi consumido. Plano, faturas<br />e pacotes ficam em Billing.</>,
    placeholder: "Pergunte sobre uso e cotas...",
    questions: usageDrawerQuestionsByState.overview
  },
  quota: {
    role: "Ajudando com cotas",
    message: <>A cota mostra mensagens e execucoes<br />consumidas neste ciclo. Alertas avisam<br />antes de pausar automacoes pagas.</>,
    placeholder: "Pergunte sobre cotas...",
    questions: usageDrawerQuestionsByState.quota
  },
  loading: {
    role: "Carregando ajuda",
    message: <>Carregando perguntas e contexto de uso.</>,
    placeholder: "Carregando...",
    questions: usageDrawerQuestionsByState.ledger
  },
  blocked: {
    role: "Ajuda limitada",
    message: <>Este painel esta bloqueado para novas perguntas. Abra um chamado para ajuda humana.</>,
    placeholder: "Perguntas bloqueadas",
    questions: usageDrawerQuestionsByState.ledger
  }
};

function emitUsageDrawerAction(
  action: UsageDrawerAction,
  onAction?: (action: UsageDrawerAction, payload?: string) => void,
  payload?: string,
  handler?: () => void
) {
  handler?.();
  onAction?.(action, payload);
}

export function UsageDrawer({
  open = true,
  state = "ledger",
  title = "Agente de Suporte Taliya",
  roleLabel,
  message,
  questions,
  placeholder,
  helpLabel = "Precisa de ajuda humana?",
  helpActionLabel = "Abrir chamado",
  onAction,
  onClose,
  onQuestionSubmit,
  className,
  ...props
}: UsageDrawerProps) {
  const [draft, setDraft] = React.useState("");

  if (!open) return null;

  const copy = usageDrawerCopy[state];
  const isLoading = state === "loading";
  const isBlocked = state === "blocked" || isLoading;
  const renderedQuestions = questions ?? copy.questions;
  const effectivePlaceholder = placeholder ?? copy.placeholder;
  const effectiveMessage = message ?? copy.message;
  const effectiveRole = roleLabel ?? copy.role;

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value || isBlocked) return;
    onQuestionSubmit?.(value);
    emitUsageDrawerAction("send-question", onAction, value);
    setDraft("");
  };

  const drawerHeader = (
    <header className="tcrm-usage-drawer__header">
      <span className="tcrm-usage-drawer__mark"><TaliyaLogo label="Taliya" variant="mark" /></span>
      <div>
        <h2>{title}</h2>
        <p><span aria-hidden="true" />{effectiveRole}</p>
      </div>
      <IconButton className="tcrm-usage-drawer__menu" disabled={isLoading} icon="moreVertical" label="Mais opcoes do suporte" onClick={() => emitUsageDrawerAction("menu", onAction)} size="sm" variant="ghost" />
      <IconButton className="tcrm-usage-drawer__close" disabled={isLoading} icon="x" label="Fechar suporte" onClick={() => emitUsageDrawerAction("close", onAction, undefined, onClose)} size="sm" variant="ghost" />
    </header>
  );

  const drawerFooter = (
    <div className="tcrm-usage-drawer__footer">
      <span>{helpLabel}</span>
      <Button className="tcrm-usage-drawer__help-action" disabled={isLoading} onClick={() => emitUsageDrawerAction("open-ticket", onAction)} size="sm" type="button" variant="ghost">{helpActionLabel}</Button>
    </div>
  );

  return (
    <CrmDrawer
      aria-busy={isLoading || undefined}
      aria-label="Agente de suporte de uso"
      className={cn("tcrm-usage-drawer", `tcrm-usage-drawer--${state}`, className)}
      component="UsageDrawer"
      footer={drawerFooter}
      header={drawerHeader}
      loading={isLoading}
      state={state}
      title={title}
      {...props}
    >
      <section className="tcrm-usage-drawer__callout" aria-label="Orientacao do suporte">
        <Icon name="info" size="21px" />
        <p>{effectiveMessage}</p>
      </section>

      <nav className="tcrm-usage-drawer__questions" aria-label="Perguntas sugeridas">
        {renderedQuestions.map((question) => (
          <Button
            className="tcrm-usage-drawer__question"
            disabled={isBlocked}
            leadingIcon="help"
            key={question.id}
            onClick={() => emitUsageDrawerAction("select-question", onAction, question.id)}
            trailingIcon="chevronRight"
            type="button"
            variant="ghost"
          >
            <span>{question.label}</span>
          </Button>
        ))}
      </nav>

      <form className="tcrm-usage-drawer__composer" onSubmit={submit}>
        <Input
          aria-label="Pergunta para o suporte"
          className="tcrm-usage-drawer__composer-input"
          disabled={isBlocked}
          fieldSize="sm"
          onChange={(event) => setDraft(event.target.value)}
          placeholder={effectivePlaceholder}
          value={draft}
        />
        <IconButton className="tcrm-usage-drawer__send" disabled={isBlocked || draft.trim().length === 0} icon="send" label="Enviar pergunta" size="sm" type="submit" variant="selected" />
      </form>
    </CrmDrawer>
  );
}

