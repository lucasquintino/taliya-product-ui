/* Generated from the frozen CRM runtime during the modularization transition. */
import React from "react";

import { Avatar, Button, ChartPanelPrimitive, Chip, EmptyState, FilterBar, Icon, IconButton, InlineAlert, Input, LoadingState, MetricTile, Panel, ProgressBar, Tabs, cn } from "@taliya/ui";

import type { ComponentTone, IconName } from "@taliya/ui";

import { CrmSurfaceProps, PageHeader } from "../patterns/shell.js";

import { GrantAccessPanel, SecurityRulePanel, InternalOverviewDashboardProps, defaultInternalShellCards, defaultInternalShellActivityItems, defaultInternalShellFilters, InternalShellDefaultActions, InternalShellCard } from "../domains/students/index.js";

export function stateKey(state?: React.ReactNode): string {
    return String(state ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function toneForState(state?: string): ComponentTone {
    const normalizedState = stateKey(state);
    if (["ok", "ready", "active", "confirmed", "paid", "success", "online", "complete", "accepted", "matched", "resolved"].includes(normalizedState))
        return "success";
    if (["warning", "attention", "review", "pending", "verifying", "saving", "running", "today", "promise", "promised", "ambiguous", "reconciliation"].includes(normalizedState))
        return "warning";
    if (["draft", "mapped", "request-access", "candidate", "assigned", "answered", "access-active", "scheduled", "due", "validation"].includes(normalizedState))
        return "info";
    if (["danger", "failed", "blocked", "error", "expired", "severe", "overdue", "dispute"].includes(normalizedState))
        return "danger";
    if (["paused", "disabled", "read-only"].includes(normalizedState))
        return "paused";
    return "neutral";
}

export function InternalOverviewDashboard({ children, className, title = "Taliya Interno", subtitle = "Operação interna de leads, clientes, suporte e plataforma", actions = <InternalShellDefaultActions />, searchPlaceholder = "Buscar studio, lead, ticket ou incidente", filters = defaultInternalShellFilters, cards = defaultInternalShellCards, activityTitle = "Atividade interna recente", activityItems = defaultInternalShellActivityItems, activityActionLabel = "Ver toda atividade", copilot = {
    title: "Copiloto interno",
    summary: "Priorize o ticket de importação com grant ativo e o incidente S2 de pagamentos.",
    note: "O copiloto interno apenas resume e prioriza. Não concede grant, não altera billing e não bloqueia tenant.",
    actionLabel: "Ver recomendações"
}, state = "normal", fluid = false, showFilters = true, showHeader = true, onSearchChange, onFilterSelect, onCardAction, onActivityAction, onCopilotAction, ...props }: InternalOverviewDashboardProps) {
    const stateNotice = state === "critical"
        ? { title: "Incidente crítico em investigação", description: "Billing e automações exigem acompanhamento imediato.", tone: "danger" as const }
        : state === "degraded"
            ? { title: "Operação degradada", description: "Alguns tenants apresentam falhas de integração ou pagamento.", tone: "warning" as const }
            : null;
    return (<section aria-busy={state === "loading" || undefined} className={cn("tcrm-internal-shell", fluid && "tcrm-internal-shell--fluid", className)} data-state={state} aria-label={String(title)} {...props}>
      {showHeader ? (<PageHeader actions={actions} subtitle={subtitle} title={title}/>) : null}
      {showFilters ? (<FilterBar className="tcrm-internal-shell__filters">
          <Input aria-label="Buscar" leadingIcon="search" onChange={(event) => onSearchChange?.(event.currentTarget.value)} placeholder={searchPlaceholder}/>
          {filters.map((filter) => <Button key={filter.id} onClick={() => onFilterSelect?.(filter)} size="sm" variant="secondary">{filter.label}</Button>)}
        </FilterBar>) : null}
      {state === "loading" ? (<LoadingState title="Carregando operação interna"/>) : state === "empty" ? (<EmptyState description="Leads, tenants, tickets e incidentes aparecem aqui quando houver atividade." icon="clipboard" title="Nenhuma atividade operacional"/>) : children ?? (<>
          {stateNotice ? <InlineAlert tone={stateNotice.tone} title={stateNotice.title}>{stateNotice.description}</InlineAlert> : null}
          <div className="tcrm-internal-shell__cards">
            {cards.map((card) => <InternalShellCard card={card} key={card.id} onCardAction={onCardAction}/>)}
          </div>
          <div className="tcrm-internal-shell__bottom">
            <Panel className="tcrm-internal-shell__activity">
              <h3>{activityTitle}</h3>
              {activityItems.map((item) => (<p key={item.id}><Icon name={item.icon ?? "shield"} size="14px"/>{item.label}<time>{item.time}</time></p>))}
              {activityActionLabel ? <Button onClick={onActivityAction} size="sm" variant="ghost">{activityActionLabel}</Button> : null}
            </Panel>
            <Panel className="tcrm-internal-shell__copilot">
              <h3><Icon name="sparkles" size="20px"/>{copilot.title ?? "Copiloto interno"}</h3>
              <strong>{copilot.summary}</strong>
              <p><Icon name="info" size="15px"/>{copilot.note}</p>
              {copilot.actionLabel ? <Button onClick={onCopilotAction} size="sm" variant="ghost">{copilot.actionLabel}</Button> : null}
            </Panel>
          </div>
        </>)}
    </section>);
}

export interface TenantDetailLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    footerNote?: React.ReactNode;
    headingLevel?: 1 | 2;
    securityOpen?: boolean;
    onAction?: (actionId: string) => void;
    onSecurityClose?: () => void;
    onSecurityOpen?: () => void;
}

function TenantDetailTabPanel({ actionId, actionLabel, description, onAction, title }: {
    actionId: string;
    actionLabel: string;
    description: React.ReactNode;
    onAction?: (actionId: string) => void;
    title: React.ReactNode;
}) {
    return (<Panel className="tcrm-tenant-detail-layout__tab-detail">
      <h3>{title}</h3>
      <p>{description}</p>
      <Button onClick={() => onAction?.(actionId)} size="sm" variant="secondary">{actionLabel}</Button>
    </Panel>);
}

export function TenantDetailLayout({ children, className, footerNote = "Visão interna e segura da Taliya. Acesso e ações sensíveis são auditados. Grants são obrigatórios para diagnóstico em dados operacionais.", headingLevel = 2, securityOpen = true, onAction, onSecurityClose, onSecurityOpen }: TenantDetailLayoutProps) {
    const Heading = headingLevel === 1 ? "h1" : "h2";
    return (<section className={cn("tcrm-tenant-detail-layout", className)} aria-label="Detalhe do tenant">
      <div className="tcrm-tenant-detail-layout__main">
        {children ?? (<>
            <header className="tcrm-tenant-detail-layout__header">
              <Button leadingIcon="arrowLeft" onClick={() => onAction?.("back-clients")} size="sm" variant="secondary">Voltar para clientes</Button>
              <div>
                <Heading>Studio Vila Mariana</Heading>
                <p>Cliente ativo da Taliya · responsável Marina - CS</p>
              </div>
              <span><Chip tone="success">Ativo</Chip><Chip tone="info">Growth</Chip><Chip tone="success">Grant ativo</Chip></span>
              <div className="tcrm-tenant-detail-layout__actions">
                <Button leadingIcon="shield" onClick={() => { onAction?.("request-grant"); onSecurityOpen?.(); }} size="sm" variant="secondary">Solicitar grant</Button>
                <Button leadingIcon="headphones" onClick={() => onAction?.("open-support")} size="sm" variant="secondary">Abrir suporte</Button>
                <Button leadingIcon="fileText" onClick={() => onAction?.("open-audit")} size="sm" variant="secondary">Ver auditoria</Button>
                <IconButton icon="more" label="Mais ações" onClick={() => onAction?.("more-actions")} size="sm" variant="subtle"/>
              </div>
            </header>
            <section className="tcrm-tenant-detail-layout__summary">
              {[
                ["Status", "Ativo", "circle"],
                ["Plano", "Growth", "sliders"],
                ["Agentes", "3 de 3 ativos", "user"],
                ["Cota", "68% usada", "clock"],
                ["Billing", "Em dia", "creditCard"],
                ["Última atividade", "hoje 10:24", "clock"],
                ["Responsável interno", "Marina - CS", "user"]
            ].map(([label, value, icon]) => (<div key={label}><Icon name={icon as IconName} size="15px"/><span>{label}</span><strong>{value}</strong>{label === "Cota" ? <ProgressBar value={68} tone="success"/> : null}</div>))}
            </section>
            <Tabs compact defaultValue="resumo" onValueChange={(value) => onAction?.(`tab:${value}`)} items={[{ value: "resumo", label: "Resumo", content: (<div className="tcrm-tenant-detail-layout__grid">
                <Panel className="tcrm-tenant-detail-layout__health">
                  <h3><span>1.</span> Saúde da conta <Chip tone="success">estável</Chip></h3>
                  <p>Uso regular, billing em dia e suporte ativo em importação.</p>
                  <div><MetricTile label="Tickets abertos" value="1" tone="neutral"/><MetricTile label="Incidentes críticos" value="0" tone="negative"/><MetricTile label="Cota" value="68%" tone="positive"/><MetricTile label="Grants ativos" value="1" tone="neutral"/></div>
                </Panel>
                <Panel className="tcrm-tenant-detail-layout__users">
                  <h3><span>2.</span> Usuários do tenant <Button onClick={() => onAction?.("view-users")} size="sm" variant="ghost">Ver usuários</Button></h3>
                  <div className="tcrm-tenant-detail-layout__user-columns"><span>Usuário</span><span>Perfil</span><span>Status</span><span>Último acesso</span></div>
                  {["Ana Souza", "Marina Lopes", "Sam Frank", "João Silva"].map((name, index) => <div className="tcrm-tenant-detail-layout__user-row" key={name}><Avatar name={name} size="xs"/>{name}<span>{index === 0 ? "Dona" : index === 1 ? "Admin" : index === 2 ? "Recepção" : "Professor"}</span><Chip tone="success">ativo</Chip><time>{index < 2 ? "hoje" : "2 dias"}</time></div>)}
                </Panel>
                <Panel className="tcrm-tenant-detail-layout__entitlements">
                  <h3><span>3.</span> Entitlements e uso <Button onClick={() => onAction?.("view-entitlements")} size="sm" variant="ghost">Ver entitlements</Button></h3>
                  <div className="tcrm-tenant-detail-layout__entitlement-row"><Icon name="clock" size="15px"/>Plano <strong>Growth</strong></div>
                  <div className="tcrm-tenant-detail-layout__entitlement-row"><Icon name="users" size="15px"/>Agentes <strong>3 slots · 3 ativos</strong></div>
                  <div className="tcrm-tenant-detail-layout__entitlement-row"><Icon name="clock" size="15px"/>Cota mensal <strong>68% usada</strong><ProgressBar value={68} tone="success"/></div>
                  <div className="tcrm-tenant-detail-layout__entitlement-row"><Icon name="inbox" size="15px"/>Pacote extra <strong>nenhum</strong></div>
                  <div className="tcrm-tenant-detail-layout__entitlement-row"><Icon name="alert" size="15px"/>Alertas <Chip tone="success">sem bloqueio</Chip></div>
                </Panel>
                <Panel className="tcrm-tenant-detail-layout__support"><h3><span>4.</span> Suporte e tickets <Button onClick={() => onAction?.("open-support")} size="sm" variant="ghost">Abrir suporte</Button></h3><p>Importação duplicou alunos <Chip tone="info">em análise</Chip><span>Marina</span></p><p>Dúvida sobre configuração de Pix <Chip tone="success">respondido</Chip><span>Marina</span></p></Panel>
                <GrantAccessPanel onAction={(actionId) => onAction?.(`grant:${actionId}`)}/>
                <Panel className="tcrm-tenant-detail-layout__incidents"><h3><span>6.</span> Incidentes e integrações <Button onClick={() => onAction?.("view-incidents")} size="sm" variant="ghost">Ver incidentes</Button></h3>{["0 críticos", "WhatsApp operando", "Pagamentos operando", "Importação em análise"].map((item, index) => <p key={item}><Icon name={index === 0 ? "shieldAlert" : index === 3 ? "cloudOff" : "checkCircle"} size="17px"/>{item}</p>)}</Panel>
                <Panel className="tcrm-tenant-detail-layout__audit"><h3><span>7.</span> Auditoria recente <Button onClick={() => onAction?.("open-audit")} size="sm" variant="ghost">Ver auditoria</Button></h3>{["Grant aprovado pelo dono", "Ticket atualizado", "Plano Growth renovado", "Usuário Marina fez login"].map((item, index) => <p key={item}><span />{index === 2 ? "12/05" : "hoje"}<strong>{item}</strong><em>{index === 0 ? "Ana Souza" : index === 3 ? "Marina - Suporte" : "Sistema"}</em></p>)}</Panel>
              </div>) },
                { value: "usuarios", label: "Usuários", content: <TenantDetailTabPanel actionId="view-users" actionLabel="Ver usuários" description="Perfis, status e últimos acessos dos usuários do tenant." onAction={onAction} title="Usuários do tenant"/> },
                { value: "entitlements", label: "Entitlements", content: <TenantDetailTabPanel actionId="view-entitlements" actionLabel="Ver entitlements" description="Plano, agentes, cota mensal, pacotes e alertas contratados." onAction={onAction} title="Entitlements e uso"/> },
                { value: "suporte", label: "Suporte", content: <TenantDetailTabPanel actionId="open-support" actionLabel="Abrir suporte" description="Tickets ativos e histórico de atendimento do studio." onAction={onAction} title="Suporte e tickets"/> },
                { value: "grants", label: "Grants", content: <GrantAccessPanel onAction={(actionId) => onAction?.(`grant:${actionId}`)}/> },
                { value: "incidentes", label: "Incidentes", content: <TenantDetailTabPanel actionId="view-incidents" actionLabel="Ver incidentes" description="Incidentes e estado atual das integrações do tenant." onAction={onAction} title="Incidentes e integrações"/> },
                { value: "auditoria", label: "Auditoria", content: <TenantDetailTabPanel actionId="open-audit" actionLabel="Ver auditoria" description="Ações sensíveis, acessos e mudanças recentes do tenant." onAction={onAction} title="Auditoria recente"/> }]}/>
          </>)}
      </div>
      {securityOpen ? <SecurityRulePanel onAction={(actionId) => { if (actionId === "close")
        onSecurityClose?.();
    else
        onAction?.(`security:${actionId}`); }}/> : null}
      {footerNote ? <footer className="tcrm-tenant-detail-layout__footer"><Icon name="lock" size="12px"/>{footerNote}</footer> : null}
    </section>);
}

export interface ChartPanelStat {
    id: string;
    label: React.ReactNode;
    value: React.ReactNode;
    icon: IconName;
    tone?: ComponentTone;
    detail?: React.ReactNode;
}

export function ChartPanel({ title = "Dinheiro em aberto", state = "ready", source = "Financeiro", period = "Este mês", value = "R$ 8.740", valueSuffix = "em aberto", metricTone = "danger", actionLabel = "Abrir financeiro", impact = "impacta caixa e conciliação", stats, icon = "alert", layout = "metric", onOpen, onStatOpen, className }: CrmSurfaceProps & {
    source?: React.ReactNode;
    period?: React.ReactNode;
    value?: React.ReactNode;
    valueSuffix?: React.ReactNode;
    metricTone?: ComponentTone;
    actionLabel?: React.ReactNode;
    impact?: React.ReactNode;
    stats?: ChartPanelStat[];
    layout?: "metric" | "summary" | "exports" | "recommendation";
    variant?: React.ComponentProps<typeof ChartPanelPrimitive>["variant"];
    onOpen?: () => void;
    onStatOpen?: (stat: ChartPanelStat) => void;
}) {
    const key = stateKey(state) || "ready";
    const metricStats = stats ?? [
        { id: "charges", label: "cobranças", value: "14", icon: "fileText" as const, tone: "danger" as const },
        { id: "failures", label: "falhas", value: "3", icon: "x" as const, tone: "danger" as const },
        { id: "promises", label: "promessas hoje", value: "2", icon: "clock" as const, tone: "warning" as const }
    ];
    return (<Panel className={cn("tcrm-report-card", `tcrm-report-card--metric-${metricTone}`, `tcrm-report-card--layout-${layout}`, className)} data-layout={layout} data-state={key} aria-label={String(title)}>
      <header className="tcrm-report-card__header">
        <Icon name={icon} size="20px" tone={toneForState(key === "ready" ? "warning" : key)}/>
        <h3>{title}</h3>
      </header>
      {layout === "recommendation" ? null : (<div className={cn("tcrm-report-card__meta", layout !== "metric" && "tcrm-report-card__meta--digest")}>
          {layout === "metric" ? <p className="tcrm-report-card__origin">Origem: <strong>{source}</strong></p> : null}
          <span>Período: {period}</span>
        </div>)}
      {key === "loading" || key === "empty" ? (<ChartPanelPrimitive className="tcrm-report-card__primitive" empty={key === "empty"} loading={key === "loading"} title={String(title)} variant="bar"/>) : layout === "summary" || layout === "exports" ? (<div className="tcrm-report-card__digest">
          {metricStats.map((item) => {
                const content = (<>
              <Icon name={item.icon} size="16px" tone={item.tone ?? "current"}/>
              <span>{item.label}</span>
              <b>{item.value}</b>
              {item.detail ? <small>{item.detail}</small> : null}
              </>);
                return layout === "exports" && onStatOpen ? (<Button aria-label={`Abrir ${String(item.label)}`} key={item.id} onClick={() => onStatOpen(item)} size="sm" type="button" variant="ghost">{content}</Button>) : <span key={item.id}>{content}</span>;
            })}
        </div>) : layout === "recommendation" ? (<p className="tcrm-report-card__recommendation">{impact}</p>) : (<>
          <div className="tcrm-report-card__value"><strong>{value}</strong><span>{valueSuffix}</span></div>
          <div className="tcrm-report-card__stats">
            {metricStats.map((item) => (<span key={item.id}>
                <Icon name={item.icon} size="20px" tone={item.tone ?? "current"}/>
                <b>{item.value}</b>
                {item.label}
              </span>))}
          </div>
          <p className="tcrm-report-card__impact"><span />Impacto: <strong>{impact}</strong></p>
        </>)}
      <Button className="tcrm-report-card__action" onClick={() => onOpen?.()} trailingIcon="chevronRight" type="button" variant="ghost">{actionLabel}</Button>
    </Panel>);
}
