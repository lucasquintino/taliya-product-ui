/** Task drawer pattern. */
import React from "react";
import { Avatar, Badge, Button, Icon, PrimitiveButton, cn } from "@taliya/ui";
import { CrmDrawer, sourceTaskDrawerFacts, sourceTaskDrawerChecklist, sourceTaskDrawerComments, sourceTaskDrawerHistory } from "./drawer-core.js";
import type { TaskDrawerProps } from "./drawer-core.js";

export function TaskDrawer({
  open = true,
  state = "open",
  title = "Confirmar reposição da Ana",
  label,
  statusLabel = "Aberta",
  facts = sourceTaskDrawerFacts,
  checklist = sourceTaskDrawerChecklist,
  checklistTitle = "Checklist / subtarefas",
  checklistProgress = "0 / 3",
  showChecklistProgress = true,
  comments = sourceTaskDrawerComments,
  commentsTitle = "Comentários",
  showCommentsLink = true,
  history = sourceTaskDrawerHistory,
  historyTitle = "Histórico",
  activityOrder = "history-comments",
  activityDensity = "compact",
  copilotSuggestion = <>quinta 08h tem vaga e respeita<br />o prazo do crédito.</>,
  footerLayout = "default",
  onClose,
  onOpenConversation,
  onAssume,
  onComplete,
  onDelegate,
  onReschedule,
  onComment,
  onMore,
  onOpenOrigin,
  onChecklistToggle,
  className,
  ...props
}: TaskDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const controlsDisabled = isLoading || isBlocked;
  const historySection = history.length > 0 ? (
    <section className="tcrm-task-drawer__history" aria-label="Histórico">
      <h3>{historyTitle}</h3>
      <ol>
        {history.map((item) => (
          <li key={item.id}>
            <time>{item.time}</time>
            <span>{item.body}</span>
          </li>
        ))}
      </ol>
    </section>
  ) : null;
  const commentsSection = (
    <section className="tcrm-task-drawer__comments" aria-label="Comentários">
      <header className="tcrm-task-drawer__section-header">
        <h3>{commentsTitle}</h3>
        {showCommentsLink ? <Button className="tcrm-task-drawer__section-link" disabled={controlsDisabled} onClick={onComment} size="sm" variant="ghost">Ver todos</Button> : null}
      </header>
      <ul>
        {comments.map((comment) => (
          <li className="tcrm-task-drawer__comment" key={comment.id}>
            <Avatar name={comment.author} size="sm" src={comment.avatarSrc} />
            <span>
              <strong>{comment.author}</strong>
              <p>{comment.body}</p>
            </span>
            <time>{comment.time}</time>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <CrmDrawer
      aria-label="Detalhes da tarefa"
      body={
        <>
        <section className="tcrm-task-drawer__checklist" aria-label="Checklist">
          <header className="tcrm-task-drawer__section-header">
            <h3>{checklistTitle}</h3>
            {showChecklistProgress ? <Badge className="tcrm-task-drawer__count">{checklistProgress}</Badge> : null}
          </header>
          <ul>
            {checklist.map((item, index) => (
              <li key={item.id}>
                <PrimitiveButton
                  aria-pressed={Boolean(item.checked)}
                  className={cn("tcrm-task-drawer__check-row", item.checked && "is-checked")}
                  disabled={controlsDisabled || item.disabled}
                  onClick={() => onChecklistToggle?.(item, !item.checked)}
                  type="button"
                >
                  <span aria-hidden="true" className="tcrm-task-drawer__check-indicator" />
                  <span className="tcrm-task-drawer__check-label"><b>{index + 1}.</b>{item.title}</span>
                </PrimitiveButton>
              </li>
            ))}
          </ul>
        </section>

        <hr className="tcrm-drawer-frame__divider" />

        {activityOrder === "comments-history" ? (
          <>
          {commentsSection}
          {historySection}
          </>
        ) : (
          <>
          {historySection}
          {commentsSection}
          </>
        )}

        {copilotSuggestion ? (
          <section className="tcrm-task-drawer__copilot" aria-label="Sugestão do Copiloto">
            <Icon name="sparkles" />
            <p><strong>Copiloto:</strong> {copilotSuggestion}</p>
          </section>
        ) : null}
        </>
      }
      className={cn(
        "tcrm-task-drawer",
        `tcrm-task-drawer--${state}`,
        activityDensity === "comfortable" && "tcrm-task-drawer--activity-comfortable",
        `tcrm-task-drawer--footer-${footerLayout}`,
        className
      )}
      closeLabel="Fechar tarefa"
      component="TaskDrawer"
      facts={facts.map((fact) => ({
        id: fact.id,
        icon: fact.icon,
        label: fact.label,
        tone: fact.tone,
        showToneIcon: fact.showToneIcon,
        value: fact.value
      }))}
      footer={
        footerLayout === "conversation" ? (
          <>
          <div className="tcrm-drawer-frame__action-row">
            <Button className="tcrm-drawer-frame__action tcrm-drawer-frame__action--conversation-primary" disabled={controlsDisabled} leadingIcon="play" onClick={onOpenConversation ?? onAssume} size="sm" variant="primary">
              Abrir conversa
            </Button>
            <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled || state === "completed"} leadingIcon="check" onClick={onComplete} size="sm" variant="secondary">
              Concluir
            </Button>
            <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} leadingIcon="calendar" onClick={onReschedule} size="sm" variant="secondary">
              Reagendar
            </Button>
            <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} leadingIcon="users" onClick={onDelegate} size="sm" variant="secondary">
              Delegar
            </Button>
          </div>
          <Button className="tcrm-drawer-frame__action tcrm-drawer-frame__action--origin-secondary tcrm-drawer-frame__action--full" disabled={controlsDisabled} leadingIcon="externalLink" onClick={onOpenOrigin} size="sm" variant="secondary">
            Abrir origem
          </Button>
          </>
        ) : (
          <>
          <Button className="tcrm-drawer-frame__action tcrm-drawer-frame__action--origin-primary tcrm-drawer-frame__action--full" disabled={controlsDisabled} onClick={onOpenOrigin} size="sm" variant="primary">
            Abrir origem
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} onClick={onAssume ?? onOpenConversation} size="sm" variant="secondary">
            Assumir
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled || state === "completed"} onClick={onComplete} size="sm" variant="secondary">
            Concluir
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} onClick={onDelegate} size="sm" variant="secondary">
            Delegar
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} onClick={onReschedule} size="sm" variant="secondary">
            Reagendar
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} onClick={onComment} size="sm" variant="secondary">
            Comentar
          </Button>
          <Button className="tcrm-drawer-frame__action" disabled={controlsDisabled} onClick={onMore} size="sm" variant="secondary">
            ...
          </Button>
          </>
        )
      }
      footerLayout={footerLayout}
      eyebrow={label}
      headerOrder="label-title-status"
      loading={isLoading}
      onClose={onClose}
      state={state}
      status={state === "completed" ? "Concluída" : statusLabel}
      title={title}
      {...props}
    />
  );
}
