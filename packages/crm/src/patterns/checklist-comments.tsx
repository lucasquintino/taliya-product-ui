/** Checklist and comment patterns. */
import React from "react";
import { Avatar, Button, ButtonGroup, Card, ChecklistItem, Drawer, DrawerSection, PrimitiveButton, cn } from "@taliya/ui";
import type { CrmSurfaceProps } from "./shell.js";
import type { CrmComponentName } from "../component-registry.js";
import { ActivityFeed } from "./shell.js";
import { componentLabel, CrmSurface } from "./patterns-utilities.js";

export type ChecklistRowState = "complete" | "incomplete" | "warning" | "blocked" | "sensitive";

export interface ChecklistRowProps extends Omit<CrmSurfaceProps, "state" | "onChange" | "onToggle"> {
  id?: string;
  index?: number;
  state?: ChecklistRowState;
  disabled?: boolean;
  onToggle?: (checked: boolean, item: { id: string; index: number; state: ChecklistRowState; title: React.ReactNode }) => void;
}

const checklistRowPrimitiveState: Record<ChecklistRowState, "complete" | "incomplete" | "warning" | "blocked"> = {
  complete: "complete",
  incomplete: "incomplete",
  warning: "warning",
  blocked: "blocked",
  sensitive: "warning"
};

export function ChecklistRow({
  id,
  index = 1,
  title = "Verificar horários disponíveis",
  state = "incomplete",
  disabled = false,
  className,
  onToggle,
  ...props
}: ChecklistRowProps) {
  const itemId = id ?? `checklist-row-${index}`;
  const isDisabled = disabled || state === "blocked";
  const primitiveState = checklistRowPrimitiveState[state];

  return (
    <ChecklistItem
      aria-label={`${index}. ${typeof title === "string" ? title : "Item de checklist"}`}
      className={cn("tcrm-checklist-row", `tcrm-checklist-row--${state}`, className)}
      data-index={index}
      disabled={isDisabled}
      menu={false}
      onToggle={onToggle ? (checked) => onToggle(checked, { id: itemId, index, state, title }) : undefined}
      state={primitiveState}
      title={<><span className="tcrm-checklist-row__index">{index}.</span><span className="tcrm-checklist-row__title">{title}</span></>}
      {...props}
    />
  );
}

export type CommentThreadState = "source" | "empty" | "internal" | "customer-visible" | "failed" | "loading" | "blocked";

export interface CommentThreadComment {
  id: string;
  author: string;
  body: React.ReactNode;
  time: string;
  avatarSrc?: string;
  visibility?: "internal" | "customer-visible";
  state?: "default" | "failed";
}

export interface CommentThreadProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> {
  title?: React.ReactNode;
  viewAllLabel?: string;
  comments?: CommentThreadComment[];
  state?: CommentThreadState;
  onViewAll?: () => void;
  onCommentSelect?: (comment: CommentThreadComment) => void;
  onRetry?: (comment: CommentThreadComment) => void;
}

const defaultCommentThreadComments: CommentThreadComment[] = [
  {
    id: "ana-silva",
    author: "Ana Silva",
    body: "Pedi reposição quinta 08h.",
    time: "Hoje, 09:08",
    visibility: "customer-visible"
  },
  {
    id: "sam-frank",
    author: "Sam Frank",
    body: "Recepção não encontrou vaga ainda.",
    time: "Hoje, 09:14",
    visibility: "internal"
  },
  {
    id: "joao-silva",
    author: "João Silva",
    body: "Copiloto sugeriu opção quinta 08h.",
    time: "Hoje, 09:20",
    visibility: "internal"
  }
];

export function CommentThread({
  title = "Comentários",
  viewAllLabel = "Ver todos",
  comments = defaultCommentThreadComments,
  state = "source",
  className,
  onViewAll,
  onCommentSelect,
  onRetry,
  ...props
}: CommentThreadProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const isEmpty = state === "empty" || comments.length === 0;
  const resolvedComments =
    state === "failed" ? comments.map((comment, index) => (index === 0 ? { ...comment, state: "failed" as const } : comment)) : comments;

  return (
    <Card
      aria-busy={isLoading || undefined}
      aria-label={typeof title === "string" ? title : "Comentários"}
      className={cn("tcrm-comment-thread", `tcrm-comment-thread--${state}`, className)}
      data-component="CommentThread"
      data-state={state}
      role="region"
      {...props}
    >
      <header className="tcrm-comment-thread__header">
        <h3>{title}</h3>
        <Button
          className="tcrm-comment-thread__view-all"
          disabled={isLoading || isBlocked}
          onClick={onViewAll}
          size="sm"
          type="button"
          variant="ghost"
        >
          {viewAllLabel}
        </Button>
      </header>
      {isLoading ? (
        <div className="tcrm-comment-thread__state" role="status" aria-label="Carregando comentários">
          <span />
          <span />
          <span />
        </div>
      ) : isEmpty ? (
        <div className="tcrm-comment-thread__state tcrm-comment-thread__state--empty">Nenhum comentário ainda.</div>
      ) : isBlocked ? (
        <div className="tcrm-comment-thread__state tcrm-comment-thread__state--blocked" role="alert">
          Comentários bloqueados para revisão.
        </div>
      ) : (
        <ul className="tcrm-comment-thread__list" role="list">
          {resolvedComments.map((comment) => {
            const rowFailed = comment.state === "failed";
            return (
              <li className={cn("tcrm-comment-thread__item", rowFailed && "tcrm-comment-thread__item--failed")} key={comment.id}>
                <PrimitiveButton
                  aria-label={`${comment.author}: ${typeof comment.body === "string" ? comment.body : "comentário"} - ${comment.time}`}
                  className="tcrm-comment-thread__row"
                  disabled={!onCommentSelect && !rowFailed}
                  onClick={() => {
                    if (rowFailed) {
                      onRetry?.(comment);
                      return;
                    }
                    onCommentSelect?.(comment);
                  }}
                  type="button"
                >
                  <Avatar className="tcrm-comment-thread__avatar" name={comment.author} size="xs" src={comment.avatarSrc} />
                  <span className="tcrm-comment-thread__content">
                    <strong>{comment.author}</strong>
                    <span>{comment.body}</span>
                  </span>
                  <time className="tcrm-comment-thread__time">{rowFailed ? "Falha" : comment.time}</time>
                </PrimitiveButton>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

function LifecycleDrawer({
  component,
  title,
  state = "open",
  children,
  open = true
}: CrmSurfaceProps & { component: CrmComponentName; open?: boolean }) {
  return (
    <Drawer
      footer={
        <ButtonGroup align="end">
          <Button variant="secondary">Registrar nota</Button>
          <Button variant={state === "sensitive" ? "destructive" : "primary"}>Concluir</Button>
        </ButtonGroup>
      }
      open={open}
      title={title ?? componentLabel(component)}
    >
      <DrawerSection title="Resumo">
        <CrmSurface component={component} family="Operational" state={state}>
          {children ?? "Detalhe operacional padronizado."}
        </CrmSurface>
      </DrawerSection>
      <DrawerSection title="Histórico">
        <ActivityFeed compact />
      </DrawerSection>
    </Drawer>
  );
}

void LifecycleDrawer;
