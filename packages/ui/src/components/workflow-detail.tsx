import React from "react";
import { cn, type ComponentTone } from "../foundation.js";
import { Button, ButtonGroup, IconButton } from "../primitives/button.js";
import { Chip } from "../primitives/feedback.js";
import { Card, MetaText } from "../primitives/layout.js";
import { List, ListItem } from "./state-list.js";

export type DocumentPreviewState = "preview" | "signed" | "pending" | "error" | "loading";

export interface DocumentPreviewPage {
  id: string;
  label: React.ReactNode;
}

export interface DocumentPreviewHistoryItem {
  id: string;
  label: React.ReactNode;
  time?: React.ReactNode;
}

export interface DocumentPreviewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  client?: React.ReactNode;
  date?: React.ReactNode;
  state?: DocumentPreviewState;
  stateLabel?: React.ReactNode;
  downloadLabel?: React.ReactNode;
  sendLabel?: React.ReactNode;
  pages?: DocumentPreviewPage[];
  selectedPageId?: string;
  history?: DocumentPreviewHistoryItem[];
  onPageSelect?: (pageId: string) => void;
  onDownload?: () => void;
  onSend?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFullscreen?: () => void;
  compact?: boolean;
}

const documentToneByState: Record<DocumentPreviewState, ComponentTone> = {
  preview: "info",
  signed: "success",
  pending: "warning",
  error: "danger",
  loading: "paused"
};

const documentLabelByState: Record<DocumentPreviewState, string> = {
  preview: "Visualizacao",
  signed: "Assinado",
  pending: "Pendente",
  error: "Erro",
  loading: "Carregando"
};

export function DocumentPreview({
  title,
  client,
  date,
  state = "preview",
  stateLabel,
  downloadLabel = "Baixar PDF",
  sendLabel = "Enviar por e-mail",
  pages = [],
  selectedPageId,
  history = [],
  onPageSelect,
  onDownload,
  onSend,
  onZoomIn,
  onZoomOut,
  onFullscreen,
  compact = false,
  className,
  ...props
}: DocumentPreviewProps) {
  const effectivePageId = selectedPageId ?? pages[0]?.id;
  return (
    <Card className={cn("tl-document-preview", `tl-document-preview--${state}`, compact && "tl-document-preview--compact", className)} {...props}>
      <div className="tl-document-preview__rail" aria-label="Paginas">
        {pages.map((page, index) => {
          const pageLabel = typeof page.label === "string" || typeof page.label === "number" ? String(page.label) : String(index + 1);
          return (
            <button
              aria-current={page.id === effectivePageId ? "page" : undefined}
              aria-label={`Pagina ${pageLabel}`}
              className={cn("tl-document-preview__thumb", page.id === effectivePageId && "tl-document-preview__thumb--selected")}
              key={page.id}
              onClick={() => onPageSelect?.(page.id)}
              type="button"
            >
              <span>{page.label}</span>
            </button>
          );
        })}
      </div>
      <section className="tl-document-preview__canvas">
        <strong>{title}</strong>
        {client ? <small>{client}</small> : null}
        {date ? <MetaText>{date}</MetaText> : null}
        <span className="tl-document-preview__line tl-document-preview__line--wide" />
        <span className="tl-document-preview__line" />
        <span className="tl-document-preview__line tl-document-preview__line--short" />
        <footer className="tl-document-preview__toolbar">
          <IconButton icon="minus" label="Reduzir zoom" onClick={onZoomOut} size="sm" variant="ghost" />
          <MetaText>100%</MetaText>
          <IconButton icon="plus" label="Aumentar zoom" onClick={onZoomIn} size="sm" variant="ghost" />
          <IconButton icon="eye" label="Tela cheia" onClick={onFullscreen} size="sm" variant="ghost" />
        </footer>
      </section>
      <aside className="tl-document-preview__meta">
        <Chip tone={documentToneByState[state]}>{stateLabel ?? documentLabelByState[state]}</Chip>
        <ButtonGroup align="start">
          {onDownload ? <Button leadingIcon="download" onClick={onDownload} size="sm" variant="secondary">{downloadLabel}</Button> : null}
          {onSend ? <Button leadingIcon="mail" onClick={onSend} size="sm" variant="secondary">{sendLabel}</Button> : null}
        </ButtonGroup>
        {history.length ? (
          <List dense divided>
            {history.map((item) => (
              <ListItem key={item.id} meta={item.time} title={item.label} />
            ))}
          </List>
        ) : null}
      </aside>
    </Card>
  );
}

export type ExecutionRowStatus = "running" | "success" | "failed" | "pending" | "skipped";

export interface ExecutionRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  step: number;
  title: React.ReactNode;
  tool?: React.ReactNode;
  status?: ExecutionRowStatus;
  duration?: React.ReactNode;
  cost?: React.ReactNode;
  error?: React.ReactNode;
  details?: React.ReactNode;
  statusLabel?: React.ReactNode;
  compact?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  onRetry?: () => void;
  onOpen?: () => void;
}

const executionToneByStatus: Record<ExecutionRowStatus, ComponentTone> = {
  running: "info",
  success: "success",
  failed: "danger",
  pending: "paused",
  skipped: "neutral"
};

export function ExecutionRow({
  step,
  title,
  tool,
  status = "pending",
  duration,
  cost,
  error,
  details,
  statusLabel,
  compact = false,
  expanded = false,
  onToggle,
  onRetry,
  onOpen,
  className,
  ...props
}: ExecutionRowProps) {
  const tone = executionToneByStatus[status];
  return (
    <div className={cn("tl-execution-row", `tl-execution-row--${status}`, compact && "tl-execution-row--compact", expanded && "tl-execution-row--expanded", className)} {...props}>
      <button
        aria-expanded={details ? expanded : undefined}
        className="tl-execution-row__main"
        disabled={!details && !onToggle}
        onClick={onToggle}
        type="button"
      >
        <span className="tl-execution-row__marker" data-step={step}>{step}</span>
        <span className="tl-execution-row__title">
          <strong>{title}</strong>
          {tool ? <small>{tool}</small> : null}
        </span>
        <Chip tone={tone}>{statusLabel ?? status}</Chip>
        {duration ? <MetaText>{duration}</MetaText> : null}
        {cost ? <MetaText>{cost}</MetaText> : null}
        {error ? <MetaText tone="danger">{error}</MetaText> : null}
      </button>
      {(onRetry || onOpen) ? (
        <span className="tl-execution-row__actions">
          {onRetry ? <IconButton icon="refresh" label="Reprocessar" onClick={onRetry} size="sm" variant="ghost" /> : null}
          {onOpen ? <IconButton icon="arrowRight" label="Abrir detalhes" onClick={onOpen} size="sm" variant="ghost" /> : null}
        </span>
      ) : null}
      {expanded && details ? <div className="tl-execution-row__details">{details}</div> : null}
    </div>
  );
}

export type ConfidenceMeterLevel = "low" | "medium" | "high" | "unknown";

export interface ConfidenceMeterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  value?: number;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  level?: ConfidenceMeterLevel;
  segments?: number;
  compact?: boolean;
  loading?: boolean;
}

const confidenceToneByLevel: Record<ConfidenceMeterLevel, ComponentTone> = {
  low: "danger",
  medium: "warning",
  high: "success",
  unknown: "paused"
};

export function ConfidenceMeter({
  value = 0,
  label,
  helperText,
  level,
  segments = 5,
  compact = false,
  loading = false,
  className,
  style,
  ...props
}: ConfidenceMeterProps) {
  const normalizedValue = Math.max(0, Math.min(100, value));
  const segmentCount = Math.max(1, Math.round(segments));
  const effectiveLevel = level ?? (normalizedValue >= 75 ? "high" : normalizedValue >= 45 ? "medium" : normalizedValue > 0 ? "low" : "unknown");
  const activeSegments = loading ? 0 : Math.ceil((normalizedValue / 100) * segmentCount);
  const tone = confidenceToneByLevel[effectiveLevel];

  return (
    <Card
      className={cn("tl-confidence-meter", `tl-confidence-meter--${effectiveLevel}`, compact && "tl-confidence-meter--compact", loading && "tl-confidence-meter--loading", className)}
      style={{ "--tl-confidence-meter-segment-count": segmentCount, ...style } as React.CSSProperties}
      {...props}
    >
      <header className="tl-confidence-meter__header">
        <Chip icon="sparkles" tone={tone}>{label ?? (effectiveLevel === "high" ? "Alta confianca" : effectiveLevel === "medium" ? "Confianca media" : effectiveLevel === "low" ? "Baixa confianca" : "Sem leitura")}</Chip>
      </header>
      <strong className="tl-confidence-meter__value">{loading ? "--" : `${normalizedValue}%`}</strong>
      <div
        aria-label="Confianca"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={loading ? undefined : normalizedValue}
        className="tl-confidence-meter__segments"
        role="progressbar"
      >
        {Array.from({ length: segmentCount }, (_, index) => (
          <span className={index < activeSegments ? "tl-confidence-meter__segment--active" : undefined} key={`segment-${index}`} />
        ))}
      </div>
      {helperText ? <p>{helperText}</p> : null}
    </Card>
  );
}
