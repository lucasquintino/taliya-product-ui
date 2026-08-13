/** Shared task and CRM drawer contracts. */
import React from "react";
import { Button, Chip, Icon, IconButton, cn } from "@taliya/ui";
import type { ButtonVariant, IconName } from "@taliya/ui";

export type TaskDrawerState = "open" | "blocked" | "completed" | "sensitive" | "loading";
export type TaskDrawerActivityOrder = "history-comments" | "comments-history";
export type TaskDrawerActivityDensity = "compact" | "comfortable";

export interface TaskDrawerFact {
  id: string;
  icon: IconName;
  label: string;
  value: React.ReactNode;
  tone?: "default" | "danger";
  showToneIcon?: boolean;
}

export interface TaskDrawerChecklistItem {
  id: string;
  title: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface TaskDrawerComment {
  id: string;
  author: string;
  body: React.ReactNode;
  time: React.ReactNode;
  avatarSrc?: string;
}

export interface TaskDrawerHistoryItem {
  id: string;
  time: React.ReactNode;
  body: React.ReactNode;
}

export interface TaskDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange"> {
  open?: boolean;
  state?: TaskDrawerState;
  title?: React.ReactNode;
  label?: string;
  statusLabel?: string;
  facts?: TaskDrawerFact[];
  checklist?: TaskDrawerChecklistItem[];
  checklistTitle?: React.ReactNode;
  checklistProgress?: React.ReactNode;
  showChecklistProgress?: boolean;
  comments?: TaskDrawerComment[];
  commentsTitle?: React.ReactNode;
  showCommentsLink?: boolean;
  history?: TaskDrawerHistoryItem[];
  historyTitle?: React.ReactNode;
  activityOrder?: TaskDrawerActivityOrder;
  activityDensity?: TaskDrawerActivityDensity;
  copilotSuggestion?: React.ReactNode | null;
  footerLayout?: "default" | "conversation";
  onClose?: () => void;
  onOpenConversation?: () => void;
  onAssume?: () => void;
  onComplete?: () => void;
  onDelegate?: () => void;
  onReschedule?: () => void;
  onComment?: () => void;
  onMore?: () => void;
  onOpenOrigin?: () => void;
  onChecklistToggle?: (item: TaskDrawerChecklistItem, checked: boolean) => void;
}

export const sourceTaskDrawerFacts: TaskDrawerFact[] = [
  { id: "origin", icon: "calendar", label: "Origem canônica", value: "Agenda / Reposições" },
  { id: "owner", icon: "user", label: "Dono / fila", value: "Recepção" },
  { id: "deadline", icon: "calendar", label: "Prazo", value: "Hoje", tone: "danger" },
  { id: "priority", icon: "clock", label: "Prioridade", value: <><span className="tcrm-task-drawer__priority-dot" aria-hidden="true" />Média</> },
  { id: "reason", icon: "clock", label: "Motivo", value: "Ana pediu reposição e precisa confirmar horário" }
];

export const sourceTaskDrawerChecklist: TaskDrawerChecklistItem[] = [
  { id: "verify-times", title: "Verificar horários disponíveis" },
  { id: "confirm-ana", title: "Confirmar com Ana" },
  { id: "update-calendar", title: "Atualizar reposição na agenda" }
];

export const sourceTaskDrawerComments: TaskDrawerComment[] = [
  { id: "ana", author: "Ana Silva", body: "Pedi reposição quinta 08h.", time: "Hoje, 09:08" },
  { id: "sam", author: "Sam Frank", body: "Recepção não encontrou vaga ainda.", time: "Hoje, 09:14" },
  { id: "joao", author: "João Silva", body: "Copiloto sugeriu opção quinta 08h.", time: "Hoje, 09:20" }
];

export const sourceTaskDrawerHistory: TaskDrawerHistoryItem[] = [
  { id: "whatsapp", time: "09:10", body: "Ana pediu reposição pelo WhatsApp" },
  { id: "no-slot", time: "09:14", body: "sistema não encontrou vaga na turma atual" },
  { id: "assumed", time: "09:20", body: "recepção assumiu a pendência" }
];

export type CrmDrawerHeaderOrder = "meta-title" | "label-title-status";
export type CrmDrawerFooterLayout = "default" | "conversation";

export interface CrmDrawerFact {
  id: string;
  icon?: IconName;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: "default" | "danger" | "warning" | "success" | "info";
  showToneIcon?: boolean;
}

export interface CrmDrawerSection {
  id: string;
  content: React.ReactNode;
  title?: React.ReactNode;
  trailing?: React.ReactNode;
  ariaLabel?: string;
  variant?: "plain" | "card" | "callout";
}

export interface CrmDrawerAction {
  id: string;
  label: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: IconName;
  onClick?: () => void;
  variant?: ButtonVariant;
}

export interface CrmDrawerProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  actions?: CrmDrawerAction[];
  body?: React.ReactNode;
  children?: React.ReactNode;
  closeLabel?: string;
  component?: string;
  eyebrow?: React.ReactNode;
  facts?: CrmDrawerFact[];
  footer?: React.ReactNode;
  footerLayout?: CrmDrawerFooterLayout;
  header?: React.ReactNode;
  headerClassName?: string;
  headerOrder?: CrmDrawerHeaderOrder;
  loading?: boolean;
  onClose?: () => void;
  sections?: CrmDrawerSection[];
  state?: string;
  status?: React.ReactNode;
  title: React.ReactNode;
}

function renderCrmDrawerAction(action: CrmDrawerAction) {
  return (
    <Button
      className={cn("tcrm-drawer-frame__action", action.fullWidth && "tcrm-drawer-frame__action--full")}
      disabled={action.disabled}
      key={action.id}
      leadingIcon={action.icon}
      onClick={action.onClick}
      size="sm"
      type="button"
      variant={action.variant ?? "secondary"}
    >
      {action.label}
    </Button>
  );
}

export function CrmDrawer({
  actions,
  body,
  children,
  className,
  closeLabel = "Fechar painel",
  component = "CrmDrawer",
  eyebrow,
  facts,
  footer,
  footerLayout = "default",
  header,
  headerClassName,
  headerOrder = "meta-title",
  loading,
  onClose,
  sections,
  state = "open",
  status,
  title,
  ...props
}: CrmDrawerProps) {
  const drawerBody = body ?? children;
  const hasStructuredBody = Boolean(facts?.length || sections?.length || drawerBody);
  const drawerFooter = footer ?? (actions?.length ? actions.map(renderCrmDrawerAction) : null);

  return (
    <aside
      aria-busy={loading || undefined}
      className={cn(
        "tcrm-drawer tcrm-drawer-frame",
        footerLayout === "conversation" && "tcrm-drawer-frame--footer-conversation",
        className
      )}
      data-component={component}
      data-state={state}
      role="complementary"
      {...props}
    >
      {header ?? (
        <header className={cn(
          "tcrm-drawer-frame__header",
          headerOrder === "label-title-status" && "tcrm-drawer-frame__header--label-title-status",
          headerOrder === "label-title-status" && !eyebrow && "tcrm-drawer-frame__header--without-label",
          headerClassName
        )}>
          <IconButton className="tcrm-drawer-frame__close" disabled={loading} icon="x" label={closeLabel} onClick={onClose} size="sm" type="button" variant="default" />
          {headerOrder === "label-title-status" ? (
            <>
              {eyebrow ? <div className="tcrm-drawer-frame__meta tcrm-drawer-frame__meta--label"><Chip className="tcrm-drawer-frame__label" showDot={false}>{eyebrow}</Chip></div> : null}
              <h2>{title}</h2>
              {status ? <div className="tcrm-drawer-frame__meta tcrm-drawer-frame__meta--status"><Chip className="tcrm-drawer-frame__status" showDot={false}>{status}</Chip></div> : null}
            </>
          ) : (
            <>
              <div className="tcrm-drawer-frame__meta">
                {eyebrow ? <Chip className="tcrm-drawer-frame__label" showDot={false}>{eyebrow}</Chip> : null}
                {status ? <Chip className="tcrm-drawer-frame__status" showDot={false}>{status}</Chip> : null}
              </div>
              <h2>{title}</h2>
            </>
          )}
        </header>
      )}
      <div className="tcrm-drawer-frame__body" tabIndex={0}>
        {hasStructuredBody ? (
          <>
            {facts?.length ? (
              <>
                <dl className="tcrm-drawer-frame__facts">
                  {facts.map((fact) => (
                    <div className={cn("tcrm-drawer-frame__fact", fact.tone && fact.tone !== "default" && `tcrm-drawer-frame__fact--${fact.tone}`)} key={fact.id}>
                      {fact.icon ? <Icon name={fact.icon} size="sm" /> : <span aria-hidden="true" />}
                      <dt>{fact.label}</dt>
                      <dd>{fact.tone === "danger" && fact.showToneIcon !== false ? <Icon name="alert" size={13} /> : null}{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                {(sections?.length || drawerBody) ? <hr className="tcrm-drawer-frame__divider" /> : null}
              </>
            ) : null}
            {drawerBody}
            {sections?.map((section, index) => (
              <React.Fragment key={section.id}>
                {(index > 0 || drawerBody) ? <hr className="tcrm-drawer-frame__divider" /> : null}
                <section
                  aria-label={section.ariaLabel}
                  className={cn("tcrm-drawer-frame__section", section.variant && `tcrm-drawer-frame__section--${section.variant}`)}
                >
                  {section.title || section.trailing ? (
                    <header className="tcrm-drawer-frame__section-header">
                      {section.title ? <h3>{section.title}</h3> : <span />}
                      {section.trailing}
                    </header>
                  ) : null}
                  {section.content}
                </section>
              </React.Fragment>
            ))}
          </>
        ) : null}
      </div>
      {drawerFooter ? <footer className="tcrm-drawer-frame__footer">{drawerFooter}</footer> : null}
    </aside>
  );
}
