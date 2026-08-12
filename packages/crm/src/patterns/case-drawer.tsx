/** Case drawer pattern. */
import React from "react";
import { Button, Chip, Icon, IconButton, cn } from "@taliya/ui";
import { sourceCaseDrawerFacts, sourceCaseDrawerAlternatives, sourceCaseDrawerHistory, sourceCaseDrawerFooterActions, emitCaseDrawerAction } from "./case-drawer-core.js";
import { CrmDrawer } from "./drawer-core.js";
import type { CaseDrawerProps, CaseDrawerFooterAction, CaseDrawerSectionItem, CaseDrawerSectionKind, CaseDrawerSection } from "./case-drawer-core.js";

export function CaseDrawer({
  open = true,
  state = "open",
  title = "Reposição da Ana sem encaixe",
  avatarSrc,
  eyebrowLabel,
  statusLabel = "Bloqueio de agenda",
  facts = sourceCaseDrawerFacts,
  factsLayout = "list",
  alternatives = sourceCaseDrawerAlternatives,
  alternativesTitle = "Alternativas possíveis",
  alternativesVariant = "options",
  numberedSections = false,
  suggestion = "Copiloto: há 2 horários candidatos, mas um depende de confirmação do professor.",
  messageQuotaLabel = "cota disponível",
  showMessageSuggestion = true,
  restrictions = [],
  restrictionsTitle = "Restrições",
  history = sourceCaseDrawerHistory,
  sections,
  footerActions = sourceCaseDrawerFooterActions,
  density = "default",
  onAction,
  onClose,
  className,
  ...props
}: CaseDrawerProps) {
  if (!open) return null;

  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const resolved = state === "resolved";
  const actionDisabled = (action: CaseDrawerFooterAction) =>
    isLoading
    || action.disabled
    || (isBlocked && !["open-origin", "create-task", "correct"].includes(action.id))
    || (resolved && action.id === "resolve");
  const sectionTitle = (label: React.ReactNode, index: number) => {
    if (!numberedSections) return label;
    return `${index}. ${String(label)}`;
  };
  const renderActionButtons = () => (
    <div className="tcrm-case-drawer__body-actions">
      {footerActions.map((action) => (
        <Button
          className={cn(
            "tcrm-case-drawer__action",
            action.variant === "primary" && "tcrm-case-drawer__action--primary",
            action.fullWidth && "tcrm-case-drawer__action--full"
          )}
          disabled={actionDisabled(action)}
          key={action.id}
          leadingIcon={action.leadingIcon}
          onClick={() => emitCaseDrawerAction(action.id, onAction)}
          size="sm"
          trailingIcon={action.trailingIcon}
          variant={action.variant ?? "secondary"}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
  const renderSectionItems = (items: CaseDrawerSectionItem[] | undefined, kind: CaseDrawerSectionKind) => {
    if (kind === "actions") return renderActionButtons();
    if (!items?.length) return null;
    if (kind === "steps") {
      return (
        <ol>
          {items.map((item) => (
            <li className={cn(item.tone && `tcrm-case-drawer__section-item--${item.tone}`)} key={item.id}>
              <span>{item.label}</span>
              {item.meta ? <em>{item.meta}</em> : null}
            </li>
          ))}
        </ol>
      );
    }
    if (kind === "history") {
      return (
        <ul>
          {items.map((item) => (
            <li className={cn(item.tone && `tcrm-case-drawer__section-item--${item.tone}`)} key={item.id}>
              {item.meta ? <em>{item.meta}</em> : null}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul>
        {items.map((item) => (
          <li className={cn(item.tone && `tcrm-case-drawer__section-item--${item.tone}`)} key={item.id}>
            <span>{item.label}</span>
            {item.meta ? <em>{item.meta}</em> : null}
          </li>
        ))}
      </ul>
    );
  };
  const renderCustomSection = (section: CaseDrawerSection, index: number) => {
    const kind = section.kind ?? "list";
    return (
      <section
        aria-label={String(section.title)}
        className={cn("tcrm-case-drawer__section", `tcrm-case-drawer__section--${kind}`, section.tone && `tcrm-case-drawer__section--${section.tone}`)}
        key={section.id}
      >
        <h3>{sectionTitle(section.title, index + 2)}</h3>
        {section.description ? (
          <p>
            {section.icon ? <Icon name={section.icon} size="var(--taliya-space-6)" /> : null}
            <span>{section.description}</span>
          </p>
        ) : null}
        {renderSectionItems(section.items, kind)}
        {section.note ? <small>{section.note}</small> : null}
      </section>
    );
  };

  return (
    <CrmDrawer
      aria-label="Detalhes do caso operacional"
      body={
        <>
        {numberedSections ? <h3 className="tcrm-case-drawer__section-title">{sectionTitle("Resumo", 1)}</h3> : null}
        <dl className={cn("tcrm-case-drawer__facts", factsLayout === "grid" && "tcrm-case-drawer__facts--grid")}>
          {facts.map((fact) => (
            <div className={cn("tcrm-case-drawer__fact", fact.tone === "danger" && "tcrm-case-drawer__fact--danger")} key={fact.id}>
              <Icon name={fact.icon} size="var(--taliya-control-crm-case-drawer-label-line-height)" />
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        {sections?.length ? sections.map(renderCustomSection) : (
        <>
          <section className={cn("tcrm-case-drawer__card tcrm-case-drawer__alternatives", alternativesVariant === "steps" && "tcrm-case-drawer__alternatives--steps")} aria-label={String(alternativesTitle)}>
          <h3>{sectionTitle(alternativesTitle, 2)}</h3>
          {alternativesVariant === "steps" ? (
            <ol>
              {alternatives.map((alternative) => (
                <li key={alternative.id}>{alternative.title}</li>
              ))}
            </ol>
          ) : (
            <ul>
              {alternatives.map((alternative) => (
                <li key={alternative.id}>
                  <strong>{alternative.title}</strong>
                  <span>{alternative.capacity}</span>
                  <em className={cn(alternative.tone && `tcrm-case-drawer__option-status--${alternative.tone}`)}>
                    {alternative.tone ? <span aria-hidden="true" /> : null}
                    {alternative.status}
                  </em>
                </li>
              ))}
            </ul>
          )}
          <div className="tcrm-case-drawer__copilot">
            <Icon name="sparkles" size={31} />
            <p>{suggestion}</p>
          </div>
          </section>

          {restrictions.length > 0 ? (
            <section className="tcrm-case-drawer__restrictions" aria-label={String(restrictionsTitle)}>
              <h3>{sectionTitle(restrictionsTitle, 3)}</h3>
              <ul>
                {restrictions.map((restriction) => (
                  <li key={restriction.id}>{restriction.label}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {showMessageSuggestion ? (
            <section className="tcrm-case-drawer__card tcrm-case-drawer__message" aria-label="Sugestão de mensagem">
              <h3>{sectionTitle("Sugestão de mensagem", 3 + (restrictions.length > 0 ? 1 : 0))} <Chip showDot={false}>{messageQuotaLabel}</Chip><Chip className="tcrm-case-drawer__review-chip" showDot={false}>revisão humana</Chip></h3>
              <p>Mensagens sugeridas pelo sistema com revisão humana.</p>
            </section>
          ) : null}

          <section className="tcrm-case-drawer__history" aria-label="Histórico curto">
            <h3>{sectionTitle("Histórico curto", 3 + (restrictions.length > 0 ? 1 : 0) + (showMessageSuggestion ? 1 : 0))}</h3>
            <ol>
              {history.map((item) => (
                <li className={cn(item.tone && `tcrm-case-drawer__history-item--${item.tone}`)} key={item.id}>
                  <span aria-hidden="true" />
                  <time>{item.time}</time>
                  <p>{item.label}</p>
                </li>
              ))}
            </ol>
          </section>
        </>
        )}
        </>
      }
      className={cn(
        "tcrm-case-drawer",
        `tcrm-case-drawer--${state}`,
        density === "compact" && "tcrm-case-drawer--compact",
        numberedSections && "tcrm-case-drawer--numbered",
        className
      )}
      closeLabel="Fechar caso"
      component="CaseDrawer"
      footer={sections?.some((section) => section.kind === "actions") ? undefined : (
        <>
        {footerActions.map((action) => (
          <Button
            className={cn(
              "tcrm-case-drawer__action",
              action.variant === "primary" && "tcrm-case-drawer__action--primary",
              action.fullWidth && "tcrm-case-drawer__action--full"
            )}
            disabled={actionDisabled(action)}
            key={action.id}
            leadingIcon={action.leadingIcon}
            onClick={() => emitCaseDrawerAction(action.id, onAction)}
            size="sm"
            trailingIcon={action.trailingIcon}
            variant={action.variant ?? "secondary"}
          >
            {action.label}
          </Button>
        ))}
        </>
      )}
      loading={isLoading}
      onClose={() => emitCaseDrawerAction("close", onAction, onClose)}
      state={state}
      status={resolved ? "Resolvido" : statusLabel}
      title={title}
      header={
        avatarSrc ? (
          <header className="tcrm-case-drawer__profile-header">
            <IconButton className="tcrm-drawer-frame__close" disabled={isLoading} icon="x" label="Fechar caso" onClick={() => emitCaseDrawerAction("close", onAction, onClose)} size="sm" type="button" variant="default" />
            <div className="tcrm-case-drawer__profile-meta">
              {eyebrowLabel ? <Chip className="tcrm-drawer-frame__label" showDot={false}>{eyebrowLabel}</Chip> : null}
              <Chip className="tcrm-drawer-frame__status" showDot={false}>{resolved ? "Resolvido" : statusLabel}</Chip>
            </div>
            <div className="tcrm-case-drawer__profile-title">
              <img alt="" src={avatarSrc} />
              <h2>{title}</h2>
            </div>
          </header>
        ) : undefined
      }
      {...props}
    />
  );
}
