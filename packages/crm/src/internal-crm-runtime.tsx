import React from "react";

import {
  Avatar,
  Badge,
  Button,
  Card,
  ChartPanelPrimitive,
  ChecklistItem,
  Chip,
  ConflictCard,
  DataTable,
  Drawer,
  DrawerSection,
  DocumentPreview,
  EmptyState,
  FileUpload,
  FilterBar,
  FilterChip,
  FilterMultiSelect,
  FilterSelect,
  Icon,
  IconButton,
  InlineAlert,
  Input,
  ImportProgressCard,
  List,
  ListItem,
  LoadingState,
  MetricTile,
  MoneyInput,
  Modal,
  Panel,
  PanelHeader,
  Popover,
  ProgressBar,
  Radio,
  SearchInput,
  Select,
  StatusDot,
  Stepper,
  Tabs,
  TablePagination,
  Timeline,
  Toggle,
  cn
} from "@taliya/ui";
import type {
  ButtonVariant,
  ComponentTone,
  IconName,
  StatusDotStatus,
  StepperStep,
  TabItem
} from "@taliya/ui";
import type {
  DataTableColumn,
  DataTableSortState
} from "@taliya/ui";
import {
  RuleRow
} from "./domains/billing/index.js";

import {
  ExportAction
} from "./patterns/index.js";

import {
  crmEmptyShellSidebarItems,
  crmEmptyShellSidebarUtilityItems,
  CrmSurfaceProps,
  PageHeader,
  CrmProductShell,
  WorkListDetailPageState,
  WorkListDetailPageLayoutMode,
  WorkListDetailPageHeightMode,
  WorkListDetailPage,
  ProfileTabs,
  CrmPageFamilyShell
} from "./patterns/shell.js";

import {
  GrantAccessPanel,
  SecurityRulePanel,
  InternalOverviewDashboardProps,
  InternalShellProps,
  internalShellNavItems,
  defaultInternalShellCards,
  defaultInternalShellActivityItems,
  defaultInternalShellFilters,
  InternalShellDefaultActions,
  InternalShellCard
} from "./domains/students/index.js";

/** @deprecated Import MessageBubble from @taliya/ui. */
export { MessageBubble } from "@taliya/ui";
export { standardPageKitManifest } from "./standard-page-kit.js";
export type { StandardPageKitComponent, StandardPageKitManifest } from "./standard-page-kit.js";
export { crmComponentNames, crmComponentRegistry } from "./component-registry.js";
export type { CrmComponentDefinition, CrmComponentName, CrmPriority } from "./component-registry.js";
export * from "./domains/agenda/index.js";
export * from "./domains/settings/index.js";
export * from "./domains/billing/index.js";
export * from "./domains/students/index.js";
export * from "./patterns/index.js";
export * from "./patterns/shell.js";

function stateKey(state?: React.ReactNode): string {
  return String(state ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toneForState(state?: string): ComponentTone {
  const normalizedState = stateKey(state);
  if (["ok", "ready", "active", "confirmed", "paid", "success", "online", "complete", "accepted", "matched", "resolved"].includes(normalizedState)) return "success";
  if (["warning", "attention", "review", "pending", "verifying", "saving", "running", "today", "promise", "promised", "ambiguous", "reconciliation"].includes(normalizedState)) return "warning";
  if (["draft", "mapped", "request-access", "candidate", "assigned", "answered", "access-active", "scheduled", "due", "validation"].includes(normalizedState)) return "info";
  if (["danger", "failed", "blocked", "error", "expired", "severe", "overdue", "dispute"].includes(normalizedState)) return "danger";
  if (["paused", "disabled", "read-only"].includes(normalizedState)) return "paused";
  return "neutral";
}


export function InternalOverviewDashboard({
  children,
  className,
  title = "Taliya Interno",
  subtitle = "Operação interna de leads, clientes, suporte e plataforma",
  actions = <InternalShellDefaultActions />,
  searchPlaceholder = "Buscar studio, lead, ticket ou incidente",
  filters = defaultInternalShellFilters,
  cards = defaultInternalShellCards,
  activityTitle = "Atividade interna recente",
  activityItems = defaultInternalShellActivityItems,
  activityActionLabel = "Ver toda atividade",
  copilot = {
    title: "Copiloto interno",
    summary: "Priorize o ticket de importação com grant ativo e o incidente S2 de pagamentos.",
    note: "O copiloto interno apenas resume e prioriza. Não concede grant, não altera billing e não bloqueia tenant.",
    actionLabel: "Ver recomendações"
  },
  state = "normal",
  fluid = false,
  showFilters = true,
  showHeader = true,
  onSearchChange,
  onFilterSelect,
  onCardAction,
  onActivityAction,
  onCopilotAction,
  ...props
}: InternalOverviewDashboardProps) {
  const stateNotice = state === "critical"
    ? { title: "Incidente crítico em investigação", description: "Billing e automações exigem acompanhamento imediato.", tone: "danger" as const }
    : state === "degraded"
      ? { title: "Operação degradada", description: "Alguns tenants apresentam falhas de integração ou pagamento.", tone: "warning" as const }
      : null;

  return (
    <section aria-busy={state === "loading" || undefined} className={cn("tcrm-internal-shell", fluid && "tcrm-internal-shell--fluid", className)} data-state={state} aria-label={String(title)} {...props}>
      {showHeader ? (
        <PageHeader
          actions={actions}
          subtitle={subtitle}
          title={title}
        />
      ) : null}
      {showFilters ? (
        <FilterBar className="tcrm-internal-shell__filters">
          <Input aria-label="Buscar" leadingIcon="search" onChange={(event) => onSearchChange?.(event.currentTarget.value)} placeholder={searchPlaceholder} />
          {filters.map((filter) => <Button key={filter.id} onClick={() => onFilterSelect?.(filter)} size="sm" variant="secondary">{filter.label}</Button>)}
        </FilterBar>
      ) : null}
      {state === "loading" ? (
        <LoadingState title="Carregando operação interna" />
      ) : state === "empty" ? (
        <EmptyState description="Leads, tenants, tickets e incidentes aparecem aqui quando houver atividade." icon="clipboard" title="Nenhuma atividade operacional" />
      ) : children ?? (
        <>
          {stateNotice ? <InlineAlert tone={stateNotice.tone} title={stateNotice.title}>{stateNotice.description}</InlineAlert> : null}
          <div className="tcrm-internal-shell__cards">
            {cards.map((card) => <InternalShellCard card={card} key={card.id} onCardAction={onCardAction} />)}
          </div>
          <div className="tcrm-internal-shell__bottom">
            <Panel className="tcrm-internal-shell__activity">
              <h3>{activityTitle}</h3>
              {activityItems.map((item) => (
                <p key={item.id}><Icon name={item.icon ?? "shield"} size="14px" />{item.label}<time>{item.time}</time></p>
              ))}
              {activityActionLabel ? <Button onClick={onActivityAction} size="sm" variant="ghost">{activityActionLabel}</Button> : null}
            </Panel>
            <Panel className="tcrm-internal-shell__copilot">
              <h3><Icon name="sparkles" size="20px" />{copilot.title ?? "Copiloto interno"}</h3>
              <strong>{copilot.summary}</strong>
              <p><Icon name="info" size="15px" />{copilot.note}</p>
              {copilot.actionLabel ? <Button onClick={onCopilotAction} size="sm" variant="ghost">{copilot.actionLabel}</Button> : null}
            </Panel>
          </div>
        </>
      )}
    </section>
  );
}

export interface TenantDetailLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  footerNote?: React.ReactNode;
  headingLevel?: 1 | 2;
  securityOpen?: boolean;
  onAction?: (actionId: string) => void;
  onSecurityClose?: () => void;
  onSecurityOpen?: () => void;
}

function TenantDetailTabPanel({ actionId, actionLabel, description, onAction, title }: { actionId: string; actionLabel: string; description: React.ReactNode; onAction?: (actionId: string) => void; title: React.ReactNode }) {
  return (
    <Panel className="tcrm-tenant-detail-layout__tab-detail">
      <h3>{title}</h3>
      <p>{description}</p>
      <Button onClick={() => onAction?.(actionId)} size="sm" variant="secondary">{actionLabel}</Button>
    </Panel>
  );
}

export function TenantDetailLayout({
  children,
  className,
  footerNote = "Visão interna e segura da Taliya. Acesso e ações sensíveis são auditados. Grants são obrigatórios para diagnóstico em dados operacionais.",
  headingLevel = 2,
  securityOpen = true,
  onAction,
  onSecurityClose,
  onSecurityOpen
}: TenantDetailLayoutProps) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  return (
    <section className={cn("tcrm-tenant-detail-layout", className)} aria-label="Detalhe do tenant">
      <div className="tcrm-tenant-detail-layout__main">
        {children ?? (
          <>
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
                <IconButton icon="more" label="Mais ações" onClick={() => onAction?.("more-actions")} size="sm" variant="subtle" />
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
              ].map(([label, value, icon]) => (
                <div key={label}><Icon name={icon as IconName} size="15px" /><span>{label}</span><strong>{value}</strong>{label === "Cota" ? <ProgressBar value={68} tone="success" /> : null}</div>
              ))}
            </section>
            <Tabs compact defaultValue="resumo" onValueChange={(value) => onAction?.(`tab:${value}`)} items={[{ value: "resumo", label: "Resumo", content: (
              <div className="tcrm-tenant-detail-layout__grid">
                <Panel className="tcrm-tenant-detail-layout__health">
                  <h3><span>1.</span> Saúde da conta <Chip tone="success">estável</Chip></h3>
                  <p>Uso regular, billing em dia e suporte ativo em importação.</p>
                  <div><MetricTile label="Tickets abertos" value="1" tone="neutral" /><MetricTile label="Incidentes críticos" value="0" tone="negative" /><MetricTile label="Cota" value="68%" tone="positive" /><MetricTile label="Grants ativos" value="1" tone="neutral" /></div>
                </Panel>
                <Panel className="tcrm-tenant-detail-layout__users">
                  <h3><span>2.</span> Usuários do tenant <Button onClick={() => onAction?.("view-users")} size="sm" variant="ghost">Ver usuários</Button></h3>
                  <div className="tcrm-tenant-detail-layout__user-columns"><span>Usuário</span><span>Perfil</span><span>Status</span><span>Último acesso</span></div>
                  {["Ana Souza", "Marina Lopes", "Sam Frank", "João Silva"].map((name, index) => <div className="tcrm-tenant-detail-layout__user-row" key={name}><Avatar name={name} size="xs" />{name}<span>{index === 0 ? "Dona" : index === 1 ? "Admin" : index === 2 ? "Recepção" : "Professor"}</span><Chip tone="success">ativo</Chip><time>{index < 2 ? "hoje" : "2 dias"}</time></div>)}
                </Panel>
                <Panel className="tcrm-tenant-detail-layout__entitlements">
                  <h3><span>3.</span> Entitlements e uso <Button onClick={() => onAction?.("view-entitlements")} size="sm" variant="ghost">Ver entitlements</Button></h3>
                  <div className="tcrm-tenant-detail-layout__entitlement-row"><Icon name="clock" size="15px" />Plano <strong>Growth</strong></div>
                  <div className="tcrm-tenant-detail-layout__entitlement-row"><Icon name="users" size="15px" />Agentes <strong>3 slots · 3 ativos</strong></div>
                  <div className="tcrm-tenant-detail-layout__entitlement-row"><Icon name="clock" size="15px" />Cota mensal <strong>68% usada</strong><ProgressBar value={68} tone="success" /></div>
                  <div className="tcrm-tenant-detail-layout__entitlement-row"><Icon name="inbox" size="15px" />Pacote extra <strong>nenhum</strong></div>
                  <div className="tcrm-tenant-detail-layout__entitlement-row"><Icon name="alert" size="15px" />Alertas <Chip tone="success">sem bloqueio</Chip></div>
                </Panel>
                <Panel className="tcrm-tenant-detail-layout__support"><h3><span>4.</span> Suporte e tickets <Button onClick={() => onAction?.("open-support")} size="sm" variant="ghost">Abrir suporte</Button></h3><p>Importação duplicou alunos <Chip tone="info">em análise</Chip><span>Marina</span></p><p>Dúvida sobre configuração de Pix <Chip tone="success">respondido</Chip><span>Marina</span></p></Panel>
                <GrantAccessPanel onAction={(actionId) => onAction?.(`grant:${actionId}`)} />
                <Panel className="tcrm-tenant-detail-layout__incidents"><h3><span>6.</span> Incidentes e integrações <Button onClick={() => onAction?.("view-incidents")} size="sm" variant="ghost">Ver incidentes</Button></h3>{["0 críticos", "WhatsApp operando", "Pagamentos operando", "Importação em análise"].map((item, index) => <p key={item}><Icon name={index === 0 ? "shieldAlert" : index === 3 ? "cloudOff" : "checkCircle"} size="17px" />{item}</p>)}</Panel>
                <Panel className="tcrm-tenant-detail-layout__audit"><h3><span>7.</span> Auditoria recente <Button onClick={() => onAction?.("open-audit")} size="sm" variant="ghost">Ver auditoria</Button></h3>{["Grant aprovado pelo dono", "Ticket atualizado", "Plano Growth renovado", "Usuário Marina fez login"].map((item, index) => <p key={item}><span />{index === 2 ? "12/05" : "hoje"}<strong>{item}</strong><em>{index === 0 ? "Ana Souza" : index === 3 ? "Marina - Suporte" : "Sistema"}</em></p>)}</Panel>
              </div>
            ) },
            { value: "usuarios", label: "Usuários", content: <TenantDetailTabPanel actionId="view-users" actionLabel="Ver usuários" description="Perfis, status e últimos acessos dos usuários do tenant." onAction={onAction} title="Usuários do tenant" /> },
            { value: "entitlements", label: "Entitlements", content: <TenantDetailTabPanel actionId="view-entitlements" actionLabel="Ver entitlements" description="Plano, agentes, cota mensal, pacotes e alertas contratados." onAction={onAction} title="Entitlements e uso" /> },
            { value: "suporte", label: "Suporte", content: <TenantDetailTabPanel actionId="open-support" actionLabel="Abrir suporte" description="Tickets ativos e histórico de atendimento do studio." onAction={onAction} title="Suporte e tickets" /> },
            { value: "grants", label: "Grants", content: <GrantAccessPanel onAction={(actionId) => onAction?.(`grant:${actionId}`)} /> },
            { value: "incidentes", label: "Incidentes", content: <TenantDetailTabPanel actionId="view-incidents" actionLabel="Ver incidentes" description="Incidentes e estado atual das integrações do tenant." onAction={onAction} title="Incidentes e integrações" /> },
            { value: "auditoria", label: "Auditoria", content: <TenantDetailTabPanel actionId="open-audit" actionLabel="Ver auditoria" description="Ações sensíveis, acessos e mudanças recentes do tenant." onAction={onAction} title="Auditoria recente" /> }]} />
          </>
        )}
      </div>
      {securityOpen ? <SecurityRulePanel onAction={(actionId) => { if (actionId === "close") onSecurityClose?.(); else onAction?.(`security:${actionId}`); }} /> : null}
      {footerNote ? <footer className="tcrm-tenant-detail-layout__footer"><Icon name="lock" size="12px" />{footerNote}</footer> : null}
    </section>
  );
}

export interface ChartPanelStat {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon: IconName;
  tone?: ComponentTone;
  detail?: React.ReactNode;
}

export function ChartPanel({
  title = "Dinheiro em aberto",
  state = "ready",
  source = "Financeiro",
  period = "Este mês",
  value = "R$ 8.740",
  valueSuffix = "em aberto",
  metricTone = "danger",
  actionLabel = "Abrir financeiro",
  impact = "impacta caixa e conciliação",
  stats,
  icon = "alert",
  layout = "metric",
  onOpen,
  onStatOpen,
  className
}: CrmSurfaceProps & {
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

  return (
    <Panel className={cn("tcrm-report-card", `tcrm-report-card--metric-${metricTone}`, `tcrm-report-card--layout-${layout}`, className)} data-layout={layout} data-state={key} aria-label={String(title)}>
      <header className="tcrm-report-card__header">
        <Icon name={icon} size="20px" tone={toneForState(key === "ready" ? "warning" : key)} />
        <h3>{title}</h3>
      </header>
      {layout === "recommendation" ? null : (
        <div className={cn("tcrm-report-card__meta", layout !== "metric" && "tcrm-report-card__meta--digest")}>
          {layout === "metric" ? <p className="tcrm-report-card__origin">Origem: <strong>{source}</strong></p> : null}
          <span>Período: {period}</span>
        </div>
      )}
      {key === "loading" || key === "empty" ? (
        <ChartPanelPrimitive className="tcrm-report-card__primitive" empty={key === "empty"} loading={key === "loading"} title={String(title)} variant="bar" />
      ) : layout === "summary" || layout === "exports" ? (
        <div className="tcrm-report-card__digest">
          {metricStats.map((item) => {
            const content = (
              <>
              <Icon name={item.icon} size="16px" tone={item.tone ?? "current"} />
              <span>{item.label}</span>
              <b>{item.value}</b>
              {item.detail ? <small>{item.detail}</small> : null}
              </>
            );
            return layout === "exports" && onStatOpen ? (
              <Button aria-label={`Abrir ${String(item.label)}`} key={item.id} onClick={() => onStatOpen(item)} size="sm" type="button" variant="ghost">{content}</Button>
            ) : <span key={item.id}>{content}</span>;
          })}
        </div>
      ) : layout === "recommendation" ? (
        <p className="tcrm-report-card__recommendation">{impact}</p>
      ) : (
        <>
          <div className="tcrm-report-card__value"><strong>{value}</strong><span>{valueSuffix}</span></div>
          <div className="tcrm-report-card__stats">
            {metricStats.map((item) => (
              <span key={item.id}>
                <Icon name={item.icon} size="20px" tone={item.tone ?? "current"} />
                <b>{item.value}</b>
                {item.label}
              </span>
            ))}
          </div>
          <p className="tcrm-report-card__impact"><span />Impacto: <strong>{impact}</strong></p>
        </>
      )}
      <Button className="tcrm-report-card__action" onClick={() => onOpen?.()} trailingIcon="chevronRight" type="button" variant="ghost">{actionLabel}</Button>
    </Panel>
  );
}

export type ReportFilterPeriod = "today" | "week" | "month";

export interface ReportFilterBarProps {
  selectedPeriod?: ReportFilterPeriod;
  unitValue?: string;
  ownerValue?: string;
  onAdvancedFilters?: () => void;
  onExport?: () => void;
  onOwnerChange?: (value: string) => void;
  onPeriodChange?: (period: ReportFilterPeriod) => void;
  onUnitChange?: (value: string) => void;
  className?: string;
}

export function ReportFilterBar({
  selectedPeriod,
  unitValue,
  ownerValue,
  onAdvancedFilters,
  onExport,
  onOwnerChange,
  onPeriodChange,
  onUnitChange,
  className
}: ReportFilterBarProps) {
  const [internalPeriod, setInternalPeriod] = React.useState<ReportFilterPeriod>("month");
  const [internalUnit, setInternalUnit] = React.useState("all");
  const [internalOwner, setInternalOwner] = React.useState("all");
  const effectivePeriod = selectedPeriod ?? internalPeriod;
  const effectiveUnit = unitValue ?? internalUnit;
  const effectiveOwner = ownerValue ?? internalOwner;
  const periods: Array<{ id: ReportFilterPeriod; label: string }> = [
    { id: "today", label: "Hoje" },
    { id: "week", label: "Esta semana" },
    { id: "month", label: "Este mês" }
  ];

  return (
    <FilterBar className={cn("tcrm-report-filter-bar", className)} aria-label="Filtros de relatórios">
      {periods.map((period) => (
        <Button
          aria-pressed={effectivePeriod === period.id}
          className={cn(effectivePeriod === period.id && "is-selected")}
          key={period.id}
          onClick={() => {
            if (selectedPeriod === undefined) setInternalPeriod(period.id);
            onPeriodChange?.(period.id);
          }}
          size="sm"
          variant="secondary"
        >{period.label}</Button>
      ))}
      <Select aria-label="Unidade" fieldSize="sm" onValueChange={(value) => { if (unitValue === undefined) setInternalUnit(value); onUnitChange?.(value); }} options={[{ value: "all", label: "Unidade" }, { value: "vila-mariana", label: "Vila Mariana" }, { value: "pinheiros", label: "Pinheiros" }]} value={effectiveUnit} />
      <Select aria-label="Responsável" fieldSize="sm" onValueChange={(value) => { if (ownerValue === undefined) setInternalOwner(value); onOwnerChange?.(value); }} options={[{ value: "all", label: "Responsável" }, { value: "mariana", label: "Mariana" }, { value: "lucas", label: "Lucas" }]} value={effectiveOwner} />
      <Button onClick={onAdvancedFilters} size="sm" trailingIcon="filter" variant="secondary">Mais filtros</Button>
      <span className="tcrm-report-filter-bar__export-behavior"><ExportAction onExport={onExport} /></span>
    </FilterBar>
  );
}

export interface OpportunityGroupItem {
  id: string;
  name: React.ReactNode;
  subtitle?: React.ReactNode;
  detail: React.ReactNode;
  amount?: React.ReactNode;
  action: React.ReactNode;
  badge?: React.ReactNode;
  badgeTone?: ComponentTone;
  avatarSrc?: string;
}

export interface OpportunityGroupCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  summary?: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
  items?: OpportunityGroupItem[];
  onOpen?: () => void;
  onItemOpen?: (item: OpportunityGroupItem) => void;
}

const defaultOpportunityGroupItems: OpportunityGroupItem[] = [
  { id: "ana", name: "Ana Souza", subtitle: "Matriculas", detail: "Pagamento inicial pendente", amount: "R$ 420", action: "Enviar Pix", badge: "hoje", badgeTone: "danger" },
  { id: "lucas", name: "Lucas Ferreira", subtitle: "Matriculas", detail: "Faltando CPF", action: "Pedir dado", badge: "bloqueada", badgeTone: "danger" }
];

export function OpportunityGroupCard({
  title = "Matriculas travadas",
  summary = "R$ 1.260 possiveis",
  icon = "lock",
  tone = "danger",
  items = defaultOpportunityGroupItems,
  onOpen,
  onItemOpen,
  className,
  ...props
}: OpportunityGroupCardProps) {
  return (
    <Panel className={cn("tcrm-opportunity-group-card", className)} data-component="OpportunityGroupCard" {...props}>
      <List>
        <ListItem
          action={<Button onClick={onOpen} size="sm" trailingIcon="chevronRight" variant="ghost">{summary}</Button>}
          leading={<Icon name={icon} tone={tone} />}
          title={title}
        />
      </List>
      <List divided>
        {items.map((item) => (
          <div className="tcrm-opportunity-group-card__row" key={item.id} role="listitem">
            <Avatar name={String(item.name)} size="sm" src={item.avatarSrc} />
            <span className="tcrm-opportunity-group-card__identity">
              <strong>{item.name}</strong>
              {item.subtitle ? <small>{item.subtitle}</small> : null}
            </span>
            <span className="tcrm-opportunity-group-card__detail">{item.detail}</span>
            <strong className="tcrm-opportunity-group-card__amount">{item.amount}</strong>
            <Button onClick={() => onItemOpen?.(item)} size="sm" variant="ghost">{item.action}</Button>
            {item.badge ? <Chip showDot={false} tone={item.badgeTone ?? "neutral"}>{item.badge}</Chip> : <span />}
          </div>
        ))}
      </List>
    </Panel>
  );
}

export function InternalShell({
  title,
  subtitle,
  brand,
  navItems = internalShellNavItems,
  sidebarItems = crmEmptyShellSidebarItems,
  utilityItems = crmEmptyShellSidebarUtilityItems,
  avatarSrc,
  browserUrl,
  children,
  className,
  contentClassName,
  drawer,
  regions,
  topbarStart,
  topbarCenter,
  topbarEnd,
  pageHeaderActions,
  onBack,
  onNavChange,
  onSidebarSelect,
  onSidebarUtilitySelect,
  ...shellProps
}: InternalShellProps) {
  return (
    <CrmProductShell
      {...shellProps}
      avatarSrc={avatarSrc}
      browserUrl={browserUrl}
      brand={brand}
      className={cn("tcrm-internal-product-shell", className)}
      contentClassName={contentClassName}
      drawer={drawer}
      navItems={navItems}
      onBack={onBack}
      onNavChange={onNavChange}
      onSidebarSelect={onSidebarSelect}
      onSidebarUtilitySelect={onSidebarUtilitySelect}
      pageHeaderActions={pageHeaderActions}
      regions={regions}
      sidebarItems={sidebarItems}
      subtitle={subtitle}
      title={title}
      topbarCenter={topbarCenter}
      topbarEnd={topbarEnd}
      topbarStart={topbarStart}
      utilityItems={utilityItems}
      variant="internal"
    >
      {children}
    </CrmProductShell>
  );
}

export interface InternalWorklistPageProps extends Omit<InternalShellProps, "children"> {
  after?: React.ReactNode;
  children: React.ReactNode;
  filterBar: React.ReactNode;
  filterBarLabel?: string;
  listLabel?: string;
  mainLabel?: string;
  pageLabel?: string;
  quickFilters: React.ReactNode;
  state?: WorkListDetailPageState;
  worklistClassName?: string;
  worklistLayoutMode?: WorkListDetailPageLayoutMode;
  worklistHeightMode?: WorkListDetailPageHeightMode;
}

export function InternalWorklistPage({
  after,
  children,
  navItems = internalShellNavItems,
  sidebarItems = crmEmptyShellSidebarItems,
  utilityItems = crmEmptyShellSidebarUtilityItems,
  filterBar,
  filterBarLabel,
  listLabel,
  mainLabel,
  pageLabel,
  quickFilters,
  state,
  worklistClassName,
  worklistLayoutMode,
  worklistHeightMode,
  ...shellProps
}: InternalWorklistPageProps) {
  return (
    <CrmPageFamilyShell
      {...shellProps}
      className={cn("tcrm-internal-product-shell", shellProps.className)}
      contentClassName={shellProps.contentClassName}
      contentLayout={shellProps.contentLayout ?? "work-list"}
      navItems={navItems}
      sidebarItems={sidebarItems}
      utilityItems={utilityItems}
      variant="internal"
    >
      <WorkListDetailPage
        className={cn("tcrm-worklist-page-frame", worklistClassName)}
        filterBar={filterBar}
        filterBarLabel={filterBarLabel}
        layoutMode={worklistLayoutMode}
        heightMode={worklistHeightMode}
        listLabel={listLabel}
        mainLabel={mainLabel}
        pageLabel={pageLabel}
        after={after}
        quickFilters={quickFilters}
        state={state}
      >
        {children}
      </WorkListDetailPage>
    </CrmPageFamilyShell>
  );
}

export type PageFilterBarState = "source" | "loading" | "disabled" | "blocked";

export interface PageFilterBarFilter {
  id: string;
  label: React.ReactNode;
  kind?: "single" | "multi" | "quick";
  placement?: "primary" | "advanced";
  options?: Array<{ value: string; label: React.ReactNode; icon?: IconName; disabled?: boolean }>;
  value?: string;
  values?: string[];
  selected?: boolean;
  disabled?: boolean;
}

export interface PageFilterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  state?: PageFilterBarState;
  density?: "standard" | "comfortable" | "compact" | "tight";
  layout?: "standard" | "stacked" | "stacked-filters";
  query?: string;
  searchVisible?: boolean;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  searchFilterLabel?: string;
  searchFilterPlacement?: "separate" | "embedded";
  searchResultCount?: React.ReactNode;
  filters?: PageFilterBarFilter[];
  filterGroupLabel?: string;
  advancedFiltersLabel?: string;
  advancedFiltersTitle?: React.ReactNode;
  advancedFiltersDescription?: React.ReactNode;
  advancedFiltersSurface?: "popover" | "modal";
  advancedFiltersTriggerVariant?: "icon" | "button";
  advancedFilterGroupLabel?: string;
  leadingActions?: React.ReactNode;
  actions?: React.ReactNode;
  onSearchChange?: (value: string) => void;
  onSearchFilter?: () => void;
  onFilterSelect?: (filter: PageFilterBarFilter) => void;
  onFilterValueChange?: (filter: PageFilterBarFilter, value: string | string[]) => void;
}

function renderPageFilterBarFilter(
  filter: PageFilterBarFilter,
  controlsDisabled: boolean,
  onFilterSelect?: (filter: PageFilterBarFilter) => void,
  onFilterValueChange?: (filter: PageFilterBarFilter, value: string | string[]) => void
) {
  if (filter.kind === "quick") {
    return (
      <FilterChip
        className="tcrm-page-filter-bar__quick-filter"
        disabled={controlsDisabled || filter.disabled}
        key={filter.id}
        onClick={() => onFilterSelect?.(filter)}
        selected={filter.selected}
      >
        {filter.label}
      </FilterChip>
    );
  }

  if (filter.kind === "multi") {
    return (
      <FilterMultiSelect
        className="tcrm-page-filter-bar__control"
        disabled={controlsDisabled || filter.disabled}
        key={filter.id}
        label={String(filter.label)}
        onValueChange={(value) => onFilterValueChange?.(filter, value)}
        options={filter.options ?? []}
        value={filter.values ?? []}
      />
    );
  }

  return (
    <FilterSelect
      className="tcrm-page-filter-bar__control"
      disabled={controlsDisabled || filter.disabled}
      key={filter.id}
      label={String(filter.label)}
      onValueChange={(value) => onFilterValueChange?.(filter, value)}
      options={filter.options ?? []}
      value={filter.value ?? ""}
    />
  );
}

export function PageFilterBar({
  state = "source",
  density = "standard",
  layout = "standard",
  query = "",
  searchVisible = true,
  searchPlaceholder = "Buscar...",
  searchAriaLabel = "Buscar",
  searchFilterLabel = "Abrir filtros",
  searchFilterPlacement = "separate",
  searchResultCount,
  filters,
  filterGroupLabel = "Filtros rápidos",
  advancedFiltersLabel = "Mais filtros",
  advancedFiltersTitle = "Filtros",
  advancedFiltersDescription,
  advancedFiltersSurface = "popover",
  advancedFiltersTriggerVariant = "icon",
  advancedFilterGroupLabel = "Filtros avançados",
  leadingActions,
  actions,
  onSearchChange,
  onSearchFilter,
  onFilterSelect,
  onFilterValueChange,
  "aria-label": ariaLabel,
  className,
  ...props
}: PageFilterBarProps) {
  const isLoading = state === "loading";
  const controlsDisabled = isLoading || state === "disabled" || state === "blocked";
  const primaryFilters = filters?.filter((filter) => filter.placement !== "advanced") ?? [];
  const advancedFilters = filters?.filter((filter) => filter.placement === "advanced") ?? [];
  const isStacked = layout === "stacked" || layout === "stacked-filters";
  const primaryQuickFilters = layout === "stacked" ? primaryFilters.filter((filter) => filter.kind === "quick") : [];
  const primaryControlFilters = isStacked ? (layout === "stacked-filters" ? primaryFilters : primaryFilters.filter((filter) => filter.kind !== "quick")) : primaryFilters;
  const selectedAdvancedCount = advancedFilters.filter((filter) => filter.selected || filter.value || (filter.values?.length ?? 0) > 0).length;
  const hasAdvancedFilters = advancedFilters.length > 0;
  const advancedFiltersContent = (
    <div className="tcrm-page-filter-bar__advanced-filters" role="group" aria-label={advancedFilterGroupLabel}>
      {advancedFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
    </div>
  );
  const advancedFiltersTrigger =
    advancedFiltersTriggerVariant === "button" ? (
      <Button
        className="tcrm-page-filter-bar__advanced-trigger tcrm-page-filter-bar__advanced-trigger--button"
        disabled={controlsDisabled}
        leadingIcon="sliders"
        size="sm"
        variant="secondary"
      >
        {advancedFiltersLabel}
      </Button>
    ) : (
      <IconButton
        className="tcrm-page-filter-bar__advanced-trigger"
        disabled={controlsDisabled}
        icon="sliders"
        label={advancedFiltersLabel}
        variant={selectedAdvancedCount > 0 ? "selected" : "default"}
      />
    );

  return (
    <FilterBar
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      className={cn(
        "tcrm-page-filter-bar",
        density === "comfortable" && "tcrm-page-filter-bar--comfortable",
        density === "compact" && "tcrm-page-filter-bar--compact",
        density === "tight" && "tcrm-page-filter-bar--tight",
        isStacked && "tcrm-page-filter-bar--stacked",
        !searchVisible && "tcrm-page-filter-bar--without-search",
        className
      )}
      data-component="PageFilterBar"
      data-density={density}
      data-layout={layout}
      data-state={state}
      {...props}
    >
      {isStacked ? (
        <>
          <div className="tcrm-page-filter-bar__row tcrm-page-filter-bar__row--top">
            {leadingActions ? <div className="tcrm-page-filter-bar__leading-actions">{leadingActions}</div> : null}
            {searchVisible ? (
              <SearchInput
                aria-label={searchAriaLabel}
                className="tcrm-page-filter-bar__search"
                disabled={controlsDisabled}
                filterLabel={searchFilterLabel}
                filterPlacement={searchFilterPlacement}
                loading={isLoading}
                onChange={(event) => onSearchChange?.(event.currentTarget.value)}
                onFilter={onSearchFilter}
                placeholder={searchPlaceholder}
                resultCount={searchResultCount}
                value={query}
              />
            ) : null}
            {primaryQuickFilters.length > 0 ? (
              <div className="tcrm-page-filter-bar__filters tcrm-page-filter-bar__filters--quick" role="group" aria-label={filterGroupLabel}>
                {primaryQuickFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
              </div>
            ) : null}
            {actions ? <div className="tcrm-page-filter-bar__actions">{actions}</div> : null}
          </div>
          {primaryControlFilters.length > 0 || hasAdvancedFilters ? (
            <div className="tcrm-page-filter-bar__row tcrm-page-filter-bar__row--bottom">
              <div className="tcrm-page-filter-bar__filters" role="group" aria-label={filterGroupLabel}>
                {primaryControlFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
                {hasAdvancedFilters ? (
                  advancedFiltersSurface === "modal" ? (
                    <Modal
                      bodyClassName="tcrm-page-filter-bar__advanced-modal-body"
                      className="tcrm-page-filter-bar__advanced-modal"
                      description={advancedFiltersDescription}
                      size="md"
                      title={advancedFiltersTitle}
                      trigger={advancedFiltersTrigger}
                    >
                      {advancedFiltersContent}
                    </Modal>
                  ) : (
                    <Popover
                      align="end"
                      className="tcrm-page-filter-bar__advanced-popover"
                      side="bottom"
                      title={advancedFiltersTitle}
                      trigger={advancedFiltersTrigger}
                      width="md"
                    >
                      {advancedFiltersContent}
                    </Popover>
                  )
                ) : null}
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <>
          {leadingActions ? <div className="tcrm-page-filter-bar__leading-actions">{leadingActions}</div> : null}
          {searchVisible ? (
            <SearchInput
              aria-label={searchAriaLabel}
              className="tcrm-page-filter-bar__search"
              disabled={controlsDisabled}
              filterLabel={searchFilterLabel}
              filterPlacement={searchFilterPlacement}
              loading={isLoading}
              onChange={(event) => onSearchChange?.(event.currentTarget.value)}
              onFilter={onSearchFilter}
              placeholder={searchPlaceholder}
              resultCount={searchResultCount}
              value={query}
            />
          ) : null}
          {primaryFilters.length > 0 || hasAdvancedFilters ? (
            <div className="tcrm-page-filter-bar__filters" role="group" aria-label={filterGroupLabel}>
              {primaryFilters.map((filter) => renderPageFilterBarFilter(filter, controlsDisabled, onFilterSelect, onFilterValueChange))}
              {hasAdvancedFilters ? (
                advancedFiltersSurface === "modal" ? (
                  <Modal
                    bodyClassName="tcrm-page-filter-bar__advanced-modal-body"
                    className="tcrm-page-filter-bar__advanced-modal"
                    description={advancedFiltersDescription}
                    size="md"
                    title={advancedFiltersTitle}
                    trigger={advancedFiltersTrigger}
                  >
                    {advancedFiltersContent}
                  </Modal>
                ) : (
                  <Popover
                    align="end"
                    className="tcrm-page-filter-bar__advanced-popover"
                    side="bottom"
                    title={advancedFiltersTitle}
                    trigger={advancedFiltersTrigger}
                    width="md"
                  >
                    {advancedFiltersContent}
                  </Popover>
                )
              ) : null}
            </div>
          ) : null}
          {actions ? <div className="tcrm-page-filter-bar__actions">{actions}</div> : null}
        </>
      )}
    </FilterBar>
  );
}

export type PageQuickFiltersState = "source" | "loading" | "empty" | "disabled" | "blocked";
export type PageQuickFilterTone = "default" | "danger" | "warning" | "info";
export type PageQuickFiltersSelectionTone = "strong" | "soft";

export interface PageQuickFilterItem {
  id: string;
  label: React.ReactNode;
  icon: IconName;
  count?: React.ReactNode;
  tone?: PageQuickFilterTone;
  selected?: boolean;
  disabled?: boolean;
}

export interface PageQuickFiltersProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: PageQuickFiltersState;
  selectionTone?: PageQuickFiltersSelectionTone;
  heading?: React.ReactNode;
  items?: PageQuickFilterItem[];
  groupLabel?: string;
  actions?: React.ReactNode;
  onSelect?: (item: PageQuickFilterItem) => void;
  onItemSelect?: (item: PageQuickFilterItem) => void;
}

const sourcePageQuickFilterItems: PageQuickFilterItem[] = [
  { id: "mine", label: "Minhas pendências", icon: "user", selected: true },
  { id: "unowned", label: "Sem dono", icon: "user" },
  { id: "blocked", label: "Bloqueadas", icon: "lock", tone: "danger" },
  { id: "waiting", label: "Aguardando resposta", icon: "clock", tone: "warning" },
  { id: "quota", label: "Cota / agente", icon: "pieChart", tone: "info" }
];

export function PageQuickFilters({
  state = "source",
  selectionTone = "strong",
  heading = "Filtros rápidos",
  items = sourcePageQuickFilterItems,
  groupLabel = "Lista de filtros rápidos",
  actions,
  onSelect,
  onItemSelect,
  className,
  "aria-label": ariaLabel,
  ...props
}: PageQuickFiltersProps) {
  const isLoading = state === "loading";
  const controlsDisabled = isLoading || state === "disabled" || state === "blocked";
  const rows = state === "empty" ? [] : items;
  const resolvedAriaLabel = ariaLabel ?? (typeof heading === "string" ? heading : "Filtros rápidos");

  return (
    <section
      aria-busy={isLoading || undefined}
      aria-label={resolvedAriaLabel}
      className={cn("tcrm-page-quick-filters", className)}
      data-component="PageQuickFilters"
      data-selection-tone={selectionTone}
      data-state={state}
      {...props}
    >
      <h3>{heading}</h3>
      {state === "blocked" ? (
        <InlineAlert tone="warning" title="Filtros rápidos bloqueados">
          A seleção de filtros rápidos está indisponível.
        </InlineAlert>
      ) : null}
      {isLoading ? (
        <LoadingState title="Carregando filtros rápidos" variant="skeleton" />
      ) : rows.length > 0 ? (
        <div className="tcrm-page-quick-filters__list" role="group" aria-label={groupLabel}>
          {rows.map((item) => {
            const disabled = controlsDisabled || item.disabled;

            return (
              <button
                aria-pressed={item.selected || undefined}
                className={cn(
                  "tcrm-page-quick-filters__item",
                  selectionTone === "soft" && "tcrm-page-quick-filters__item--selection-soft",
                  item.tone && item.tone !== "default" && `tcrm-page-quick-filters__item--${item.tone}`
                )}
                disabled={disabled}
                key={item.id}
                onClick={() => {
                  if (!disabled) {
                    onSelect?.(item);
                    onItemSelect?.(item);
                  }
                }}
                type="button"
              >
                <Icon name={item.icon} size="sm" />
                <span className="tcrm-page-quick-filters__item-label">{item.label}</span>
                {item.count != null ? (
                  <Badge className="tcrm-page-quick-filters__item-count" tone="neutral" variant="count">
                    {item.count}
                  </Badge>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : (
        <EmptyState title="Nenhum filtro rápido" description="Os filtros rápidos aparecem aqui." />
      )}
      {actions ? <div className="tcrm-page-quick-filters__actions">{actions}</div> : null}
    </section>
  );
}

export type TaskQueueListState = "source" | "loading" | "empty" | "blocked";
export type TaskQueueListItemTone = "default" | "danger";

export interface TaskQueueListItem {
  id: string;
  label: React.ReactNode;
  count?: React.ReactNode;
  icon: IconName;
  selected?: boolean;
  disabled?: boolean;
  tone?: TaskQueueListItemTone;
}

const sourceTaskQueueListItems: TaskQueueListItem[] = [
  { id: "my-tasks", label: "Minhas tarefas", count: "12", icon: "user", selected: true },
  { id: "today", label: "Hoje", count: "6", icon: "calendar" },
  { id: "late", label: "Atrasadas", count: "3", icon: "clock", tone: "danger" },
  { id: "unassigned", label: "Sem dono", count: "2", icon: "user" },
  { id: "waiting", label: "Aguardando", count: "8", icon: "tag" },
  { id: "checklists", label: "Checklists", count: "5", icon: "clipboardCheck" },
  { id: "origin", label: "Por origem", icon: "graduation" }
];

export interface TaskQueueListProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect" | "title"> {
  state?: TaskQueueListState;
  heading?: React.ReactNode;
  items?: TaskQueueListItem[];
  onSelect?: (item: TaskQueueListItem) => void;
}

export function TaskQueueList({
  className,
  state = "source",
  heading = "Filas",
  items = sourceTaskQueueListItems,
  onSelect,
  ...props
}: TaskQueueListProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const rows = state === "empty" ? [] : items;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label={typeof heading === "string" ? heading : "Filas de tarefas"}
      className={cn("tcrm-task-queue-list", className)}
      data-component="TaskQueueList"
      data-state={state}
      {...props}
    >
      <h3>{heading}</h3>
      {isBlocked ? <InlineAlert tone="warning" title="Filas bloqueadas">A selecao de filas esta indisponivel.</InlineAlert> : null}
      {isLoading ? (
        <LoadingState title="Carregando filas" variant="skeleton" />
      ) : rows.length > 0 ? (
        <List className="tcrm-task-queue-list__rows" divided>
          {rows.map((item) => {
            const disabled = item.disabled || isBlocked;

            return (
              <FilterChip
                aria-current={item.selected ? "true" : undefined}
                className={cn(
                  "tcrm-task-queue-list__item",
                  item.selected && "is-selected",
                  item.tone === "danger" && "is-danger"
                )}
                count={item.count}
                disabled={disabled}
                key={item.id}
                onClick={() => {
                  if (!disabled) {
                    onSelect?.(item);
                  }
                }}
                selected={item.selected}
              >
                <span className="tcrm-task-queue-list__item-main">
                  <Icon name={item.icon} size="var(--taliya-control-crm-task-queue-list-icon-size)" />
                  <span>{item.label}</span>
                </span>
              </FilterChip>
            );
          })}
        </List>
      ) : (
        <EmptyState title="Nenhuma fila" description="As filas de tarefas aparecem aqui." />
      )}
    </Panel>
  );
}

export type TaskTableState = "source" | "loading" | "empty" | "blocked";
export type TaskTablePriority = "low" | "medium" | "high";
export type TaskTableStatus = "open" | "progress" | "waiting" | "unassigned" | "late" | "done";
export type TaskTableMode = "copilot" | "manual" | "automation" | "none";

export type CrmWorklistTableState = "source" | "loading" | "empty" | "blocked";
export type CrmWorklistTableDensity = "default" | "compact";

export interface CrmWorklistTableColumn<T extends { id: string }> extends DataTableColumn<T> {
  sortValue?: (row: T) => string | number;
}

export interface CrmWorklistTablePagination {
  label: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  page?: number;
  pageCount?: number;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  onPageChange?: (page: number) => void;
}

export interface CrmWorklistTableProps<T extends { id: string }> extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  actionColumnWidth?: React.CSSProperties["width"];
  ariaLabel: string;
  blockedDescription?: React.ReactNode;
  blockedTitle?: string;
  caption?: React.ReactNode;
  columns: Array<CrmWorklistTableColumn<T>>;
  emptyDescription?: string;
  emptyTitle?: string;
  density?: CrmWorklistTableDensity;
  heading?: React.ReactNode;
  headingAction?: React.ReactNode;
  headingDescription?: React.ReactNode;
  loadingTitle?: string;
  minTableWidth?: React.CSSProperties["minWidth"];
  onRowSelect?: (row: T) => void;
  onSelectionChange?: (rowId: string, selected: boolean) => void;
  pageSizeLabel?: string;
  pagination?: CrmWorklistTablePagination;
  rowActions?: (row: T) => React.ReactNode;
  rows: T[];
  selectable?: boolean;
  selectedRowIds?: string[];
  selectedRowId?: string;
  state?: CrmWorklistTableState;
  sort?: DataTableSortState;
  onSortChange?: (sort: DataTableSortState | undefined) => void;
}

function crmWorklistTableSortValue<T extends { id: string }>(row: T, column: CrmWorklistTableColumn<T>) {
  if (column.sortValue) return String(column.sortValue(row));
  const value = row[column.key as keyof T];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

export function CrmWorklistTable<T extends { id: string }>({
  actionColumnWidth,
  ariaLabel,
  blockedDescription = "A lista esta indisponivel.",
  blockedTitle = "Lista bloqueada",
  caption,
  className,
  columns,
  density = "default",
  emptyDescription = "Os registros desta fila aparecem aqui.",
  emptyTitle = "Nenhum registro",
  heading,
  headingAction,
  headingDescription,
  loadingTitle = "Carregando lista",
  minTableWidth = "var(--taliya-control-table-min-width)",
  onRowSelect,
  onSelectionChange,
  pageSizeLabel,
  pagination,
  rowActions,
  rows,
  selectable,
  selectedRowIds,
  selectedRowId,
  sort,
  state = "source",
  onSortChange,
  ...props
}: CrmWorklistTableProps<T>) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [internalSort, setInternalSort] = React.useState<DataTableSortState | undefined>();
  const activeSort = sort ?? internalSort;
  const controlsDisabled = isLoading || isBlocked;
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!activeSort) return sourceRows;
    const sortedColumn = columns.find((column) => String(column.key) === activeSort.key);
    if (!sortedColumn) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const firstValue = crmWorklistTableSortValue(first, sortedColumn);
      const secondValue = crmWorklistTableSortValue(second, sortedColumn);
      const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
      return activeSort.direction === "ascending" ? result : result * -1;
    });
  }, [activeSort, columns, rows, state]);

  const handleSortChange = (nextSort: DataTableSortState) => {
    if (sort === undefined) {
      setInternalSort(nextSort);
    }
    onSortChange?.(nextSort);
  };

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      className={cn("tcrm-worklist-table", density !== "default" && `tcrm-worklist-table--${density}`, className)}
      data-component="CrmWorklistTable"
      data-density={density}
      data-state={state}
      {...props}
    >
      {heading ? <PanelHeader compact action={headingAction} description={headingDescription} title={heading} /> : null}
      {isLoading ? (
        <LoadingState title={loadingTitle} variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            actionColumnWidth={actionColumnWidth}
            className="tcrm-worklist-table__data"
            columns={columns}
            density="dense"
            minWidth={minTableWidth}
            selectable={selectable}
            onRowClick={(row) => {
              if (!controlsDisabled) {
                onRowSelect?.(row);
              }
            }}
            onRowSelect={controlsDisabled ? undefined : onSelectionChange}
            rows={tableRows}
            rowActions={rowActions}
            selectedRowIds={selectedRowIds}
            selectedRowId={selectedRowId}
            sort={activeSort}
            onSortChange={handleSortChange}
          />
          {caption ? <p className="tcrm-worklist-table__caption">{caption}</p> : null}
          {pagination ? (
            <TablePagination
              className="tcrm-worklist-table__pagination"
              itemsPerPageLabel={pageSizeLabel}
              itemsPerPageValue={pagination.itemsPerPage}
              label={String(pagination.label)}
              nextDisabled={controlsDisabled || pagination.nextDisabled}
              onItemsPerPageClick={pagination.onItemsPerPageClick}
              onNext={pagination.onNextPage}
              onPageChange={pagination.onPageChange}
              onPrevious={pagination.onPreviousPage}
              page={pagination.page ?? 1}
              pageCount={pagination.pageCount ?? 1}
              previousDisabled={controlsDisabled || pagination.previousDisabled}
            />
          ) : null}
        </>
      ) : (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}
      {isBlocked ? <InlineAlert tone="warning" title={blockedTitle}>{blockedDescription}</InlineAlert> : null}
    </Panel>
  );
}

export interface TaskTableRow {
  id: string;
  title: React.ReactNode;
  owner: React.ReactNode;
  deadline: React.ReactNode;
  deadlineTone?: "default" | "danger";
  status: TaskTableStatus;
  origin: React.ReactNode;
  priority: TaskTablePriority;
  activity: React.ReactNode;
  mode: TaskTableMode;
  selected?: boolean;
  disabled?: boolean;
}

const taskTableStatusLabel: Record<TaskTableStatus, string> = {
  open: "Aberta",
  progress: "Em andamento",
  waiting: "Aguardando",
  unassigned: "Sem dono",
  late: "Atrasada",
  done: "Concluída"
};

const taskTablePriorityLabel: Record<TaskTablePriority, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta"
};

const taskTableModeLabel: Record<TaskTableMode, React.ReactNode> = {
  copilot: <>copiloto<br />sugeriu</>,
  manual: <>manual<br />disponível</>,
  automation: <>automação<br />bloqueada</>,
  none: "—"
};

function taskTableSortValue(
  row: TaskTableRow,
  key: string,
  priorityOrder: Record<TaskTablePriority, number>
) {
  if (key === "priority") return String(priorityOrder[row.priority]);
  if (key === "status") return taskTableStatusLabel[row.status];
  if (key === "mode") return String(taskTableModeLabel[row.mode]);
  const value = row[key as keyof TaskTableRow];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

const sourceTaskTableRows: TaskTableRow[] = [
  {
    id: "replace-ana",
    title: "Confirmar reposição da Ana",
    owner: "Recepção",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "open",
    origin: <>Agenda /<br />Reposições</>,
    priority: "medium",
    activity: <>Ana pediu reposição<br />por WhatsApp</>,
    mode: "copilot",
    selected: true
  },
  {
    id: "receipt-marina",
    title: <>Validar comprovante da<br />Marina</>,
    owner: "Financeiro",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "progress",
    origin: "Financeiro",
    priority: "high",
    activity: <>Comprovante enviado<br />às 10:12</>,
    mode: "manual"
  },
  {
    id: "phone-responsible",
    title: <>Corrigir telefone do<br />responsável</>,
    owner: "Recepção",
    deadline: "Atrasada",
    deadlineTone: "danger",
    status: "open",
    origin: "Dados",
    priority: "medium",
    activity: <>Contato falhou<br />novamente</>,
    mode: "manual"
  },
  {
    id: "inactive-student",
    title: "Ligar para aluno inativo",
    owner: "Atendimento",
    deadline: "Amanhã",
    status: "waiting",
    origin: "Retenção",
    priority: "medium",
    activity: <>Aguardando janela<br />de contato</>,
    mode: "manual"
  },
  {
    id: "substitute-18h",
    title: "Confirmar substituto aula 18h",
    owner: "Coordenação",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "progress",
    origin: "Agenda",
    priority: "high",
    activity: <>Professor titular<br />indisponível</>,
    mode: "manual"
  },
  {
    id: "duplicate-registration",
    title: "Revisar cadastro duplicado",
    owner: "Sem dono",
    deadline: "—",
    status: "unassigned",
    origin: "Dados",
    priority: "low",
    activity: <>Duplicidade detectada<br />pelo CRM</>,
    mode: "automation"
  },
  {
    id: "call-09h",
    title: <>Completar chamada da<br />aula 09h</>,
    owner: "Instrutores",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "late",
    origin: "Agenda / Aula",
    priority: "high",
    activity: <>Chamada ainda<br />incompleta</>,
    mode: "manual"
  },
  {
    id: "contract-signature",
    title: <>Enviar contrato para<br />assinatura</>,
    owner: "Financeiro",
    deadline: "Sexta, 17/05",
    status: "done",
    origin: "Financeiro",
    priority: "medium",
    activity: <>Contrato enviado<br />para aluno</>,
    mode: "none"
  }
];

export interface TaskTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: TaskTableState;
  rows?: TaskTableRow[];
  pageLabel?: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  onRowSelect?: (row: TaskTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

export function TaskTable({
  className,
  state = "source",
  rows = sourceTaskTableRows,
  pageLabel = "1-8 de 8",
  itemsPerPage = "10",
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  ...props
}: TaskTableProps) {
  const columns = React.useMemo<Array<CrmWorklistTableColumn<TaskTableRow>>>(
    () => [
      {
        key: "title",
        header: "Tarefa",
        sortable: true,
        render: (row) => (
          <span className={cn("tcrm-task-table__title-cell", row.selected && "is-selected")}>
            <strong className="tcrm-task-table__title">{row.title}</strong>
          </span>
        ),
        sortValue: (row) => taskTableSortValue(row, "title", { high: 0, medium: 1, low: 2 })
      },
      { key: "owner", header: "Dono / fila", sortable: true, sortValue: (row) => taskTableSortValue(row, "owner", { high: 0, medium: 1, low: 2 }) },
      {
        key: "deadline",
        header: "Prazo",
        sortable: true,
        render: (row) => <span className={cn("tcrm-task-table__deadline", row.deadlineTone === "danger" && "is-danger")}>{row.deadline}</span>,
        sortValue: (row) => taskTableSortValue(row, "deadline", { high: 0, medium: 1, low: 2 })
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        render: (row) => <Chip className={cn("tcrm-task-table__status", `is-${row.status}`)} showDot={false}>{taskTableStatusLabel[row.status]}</Chip>,
        sortValue: (row) => taskTableSortValue(row, "status", { high: 0, medium: 1, low: 2 })
      },
      { key: "origin", header: "Origem canônica", sortable: true, sortValue: (row) => taskTableSortValue(row, "origin", { high: 0, medium: 1, low: 2 }) },
      {
        key: "priority",
        header: "Prior.",
        sortable: true,
        render: (row) => (
          <span className={cn("tcrm-task-table__priority", `is-${row.priority}`)}>
            <i aria-hidden="true" />
            {taskTablePriorityLabel[row.priority]}
          </span>
        ),
        sortValue: (row) => taskTableSortValue(row, "priority", { high: 0, medium: 1, low: 2 })
      },
      { key: "activity", header: "Última atividade", sortable: true, sortValue: (row) => taskTableSortValue(row, "activity", { high: 0, medium: 1, low: 2 }) },
      {
        key: "mode",
        header: "Modo",
        sortable: true,
        render: (row) => <Chip className={cn("tcrm-task-table__mode", `is-${row.mode}`)} showDot={false}>{taskTableModeLabel[row.mode]}</Chip>,
        sortValue: (row) => taskTableSortValue(row, "mode", { high: 0, medium: 1, low: 2 })
      }
    ],
    []
  );

  return (
    <CrmWorklistTable
      ariaLabel="Tabela de tarefas"
      blockedDescription="A lista de tarefas esta indisponivel."
      blockedTitle="Tabela bloqueada"
      className={cn("tcrm-task-table", className)}
      data-component="TaskTable"
      columns={columns}
      emptyDescription="As tarefas da fila aparecem aqui."
      emptyTitle="Nenhuma tarefa"
      loadingTitle="Carregando tarefas"
      pagination={{
        itemsPerPage,
        label: pageLabel,
        onItemsPerPageClick,
        onNextPage,
        onPreviousPage
      }}
      rows={rows}
      selectedRowId={rows.find((row) => row.selected)?.id}
      state={state}
      onRowSelect={(row) => {
        if (!row.disabled) {
          onRowSelect?.(row);
        }
      }}
      {...props}
    />
  );
}

export type LeadTableState = "source" | "loading" | "empty" | "blocked";
export type LeadTableColumnKey =
  | "lead"
  | "origin"
  | "stage"
  | "fit"
  | "priority"
  | "interest"
  | "quality"
  | "nextAction"
  | "humanMode"
  | "lastActivity"
  | "owner";

export interface LeadTableRow {
  id: string;
  lead: React.ReactNode;
  studio?: React.ReactNode;
  origin: React.ReactNode;
  stage: React.ReactNode;
  fit: React.ReactNode;
  fitTone?: ComponentTone;
  priority: React.ReactNode;
  priorityTone?: ComponentTone;
  interest: React.ReactNode;
  quality: React.ReactNode;
  qualityTone?: ComponentTone;
  nextAction: React.ReactNode;
  nextActionTone?: ComponentTone;
  humanMode: React.ReactNode;
  lastActivity: React.ReactNode;
  owner: React.ReactNode;
  sortValues?: Partial<Record<LeadTableColumnKey, string | number>>;
  selected?: boolean;
  disabled?: boolean;
}

export interface LeadTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: LeadTableState;
  rows?: LeadTableRow[];
  pageLabel?: React.ReactNode;
  page?: number;
  pageCount?: number;
  itemsPerPage?: React.ReactNode;
  totalLabel?: React.ReactNode;
  onRowSelect?: (row: LeadTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
  onPageChange?: (page: number) => void;
}

function leadTableSortValue(row: LeadTableRow, key: string) {
  const columnKey = key as LeadTableColumnKey;
  const explicitValue = row.sortValues?.[columnKey];
  if (explicitValue != null) return String(explicitValue);
  const value = row[columnKey as keyof LeadTableRow];
  if (typeof value === "string" || typeof value === "number") return String(value);
  return "";
}

const sourceLeadTableRows: LeadTableRow[] = [
  {
    id: "lead-ana",
    lead: "Ana Silva",
    studio: "Studio Vila Mariana",
    origin: "WhatsApp",
    stage: "Novo",
    fit: "Alto",
    fitTone: "success",
    priority: "Alta",
    priorityTone: "danger",
    interest: "Busca pilates duas vezes por semana",
    quality: "Aprovado",
    qualityTone: "success",
    nextAction: "Responder hoje",
    nextActionTone: "warning",
    humanMode: "Humano",
    lastActivity: "Hoje, 09:12",
    owner: "Recepcao"
  },
  {
    id: "lead-marina",
    lead: "Marina Costa",
    studio: "Studio Moema",
    origin: "Landing",
    stage: "Experimental",
    fit: "Medio",
    fitTone: "warning",
    priority: "Media",
    priorityTone: "warning",
    interest: "Quer reposicao por dor lombar",
    quality: "Revisar",
    qualityTone: "warning",
    nextAction: "Agendar experimental",
    nextActionTone: "info",
    humanMode: "IA com revisao",
    lastActivity: "Ontem, 17:40",
    owner: "Sam"
  }
];

export function LeadTable({
  className,
  state = "source",
  rows = sourceLeadTableRows,
  pageLabel,
  page = 1,
  pageCount = 1,
  itemsPerPage = "10",
  totalLabel,
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  onPageChange,
  ...props
}: LeadTableProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [sort, setSort] = React.useState<{ key: string; direction: "ascending" | "descending" } | undefined>();
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!sort) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const result = leadTableSortValue(first, sort.key).localeCompare(leadTableSortValue(second, sort.key), "pt-BR", {
        numeric: true,
        sensitivity: "base"
      });
      return sort.direction === "ascending" ? result : result * -1;
    });
  }, [rows, sort, state]);
  const controlsDisabled = isLoading || isBlocked;
  const resolvedPageLabel = pageLabel ?? `${tableRows.length} leads`;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label="Tabela de leads"
      className={cn("tcrm-lead-table", className)}
      data-component="LeadTable"
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoadingState title="Carregando leads" variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            className="tcrm-lead-table__data"
            columns={[
              {
                key: "lead",
                header: "Lead / studio",
                sortable: true,
                render: (row) => (
                  <span className={cn("tcrm-lead-table__lead-cell", row.selected && "is-selected")}>
                    <strong className="tcrm-lead-table__lead">{row.lead}</strong>
                    {row.studio ? <span>{row.studio}</span> : null}
                  </span>
                )
              },
              { key: "origin", header: "Origem", sortable: true },
              { key: "stage", header: "Etapa", sortable: true, render: (row) => <Chip showDot={false}>{row.stage}</Chip> },
              { key: "fit", header: "Fit", sortable: true, render: (row) => <Chip showDot={false} tone={row.fitTone ?? "neutral"}>{row.fit}</Chip> },
              {
                key: "priority",
                header: "Prioridade",
                sortable: true,
                render: (row) => <Chip showDot={false} tone={row.priorityTone ?? "neutral"}>{row.priority}</Chip>
              },
              { key: "interest", header: "Dor / interesse", sortable: true, render: (row) => <span className="tcrm-lead-table__muted-cell">{row.interest}</span> },
              {
                key: "quality",
                header: "Qualidade",
                sortable: true,
                render: (row) => <Chip showDot={false} tone={row.qualityTone ?? "neutral"}>{row.quality}</Chip>
              },
              {
                key: "nextAction",
                header: "Proxima acao",
                sortable: true,
                render: (row) => <Chip showDot={false} tone={row.nextActionTone ?? "neutral"}>{row.nextAction}</Chip>
              },
              { key: "humanMode", header: "IA / humano", sortable: true },
              { key: "lastActivity", header: "Ultima atividade", sortable: true },
              { key: "owner", header: "Dono", sortable: true }
            ]}
            density="dense"
            onRowClick={(row) => {
              if (!controlsDisabled && !row.disabled) {
                onRowSelect?.(row);
              }
            }}
            rows={tableRows}
            selectedRowId={tableRows.find((row) => row.selected)?.id}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePagination
            className="tcrm-lead-table__pagination"
            itemsPerPageValue={itemsPerPage}
            label={String(totalLabel ?? resolvedPageLabel)}
            nextDisabled={controlsDisabled || page >= pageCount}
            onItemsPerPageClick={onItemsPerPageClick}
            onNext={onNextPage}
            onPageChange={onPageChange}
            onPrevious={onPreviousPage}
            page={page}
            pageCount={pageCount}
            previousDisabled={controlsDisabled || page <= 1}
          />
        </>
      ) : (
        <EmptyState title="Nenhum lead" description="Os leads aparecem aqui quando os filtros retornam resultados." />
      )}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de leads esta indisponivel.</InlineAlert> : null}
    </Panel>
  );
}

export type CrmRecordDrawerState = "source" | "loading" | "blocked";

export interface CrmRecordDrawerFact {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: IconName;
  tone?: ComponentTone;
}

export interface CrmRecordDrawerSection {
  id: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  subtle?: boolean;
  compact?: boolean;
}

export interface CrmRecordDrawerAction {
  id: string;
  label: React.ReactNode;
  variant?: ButtonVariant;
  leadingIcon?: IconName;
  disabled?: boolean;
}

export interface CrmRecordDrawerTab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface CrmRecordDrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSelect"> {
  state?: CrmRecordDrawerState;
  open?: boolean;
  title: React.ReactNode;
  meta?: React.ReactNode;
  description?: React.ReactNode;
  status?: React.ReactNode;
  facts?: CrmRecordDrawerFact[];
  sections?: CrmRecordDrawerSection[];
  tabs?: CrmRecordDrawerTab[];
  activeTab?: string;
  defaultTab?: string;
  tabsLabel?: string;
  actions?: CrmRecordDrawerAction[];
  blockedReason?: React.ReactNode;
  onTabChange?: (tabId: string) => void;
  onOpenChange?: (open: boolean) => void;
  onAction?: (action: CrmRecordDrawerAction) => void;
}

export function CrmRecordDrawer({
  state = "source",
  open = true,
  title,
  meta,
  description,
  status,
  facts = [],
  sections = [],
  tabs = [],
  activeTab,
  defaultTab,
  tabsLabel = "Abas do registro",
  actions = [],
  blockedReason,
  onTabChange,
  onOpenChange,
  onAction,
  className,
  children,
  ...props
}: CrmRecordDrawerProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const drawerFooter = actions.length > 0 ? (
    <div className="tcrm-record-drawer__actions">
      {actions.map((action) => (
        <Button
          className="tcrm-record-drawer__action"
          disabled={isBlocked || action.disabled}
          key={action.id}
          leadingIcon={action.leadingIcon}
          onClick={() => onAction?.(action)}
          size="sm"
          variant={action.variant ?? "secondary"}
        >
          {action.label}
        </Button>
      ))}
    </div>
  ) : null;

  return (
    <Drawer
      blockedReason={blockedReason}
      className={cn("tcrm-record-drawer", className)}
      data-component="CrmRecordDrawer"
      data-state={state}
      description={description}
      footer={drawerFooter}
      footerLayout="stack"
      headerStatus={status}
      loading={isLoading}
      onOpenChange={onOpenChange}
      open={open}
      title={title}
      headerMeta={meta}
      {...props}
    >
      {facts.length > 0 ? (
        <div className="tcrm-record-drawer__facts">
          {facts.map((fact) => (
            <div className={cn("tcrm-record-drawer__fact", fact.tone && `tcrm-record-drawer__fact--${fact.tone}`)} key={fact.id}>
              {fact.icon ? <Icon name={fact.icon} size="sm" /> : null}
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      ) : null}
      {sections.map((section) => (
        <DrawerSection compact={section.compact} key={section.id} subtle={section.subtle} title={section.title}>
          {section.content}
        </DrawerSection>
      ))}
      {tabs.length > 0 ? (
        <Tabs
          aria-label={tabsLabel}
          className="tcrm-record-drawer__tabs"
          compact
          defaultValue={defaultTab ?? tabs[0]?.id}
          items={tabs.map((tab) => ({ value: tab.id, label: tab.label, content: tab.content, disabled: tab.disabled }))}
          onValueChange={onTabChange}
          value={activeTab}
        />
      ) : null}
      {children}
    </Drawer>
  );
}

export type ChecklistTableState = "source" | "loading" | "empty" | "blocked";
export type ChecklistTableStatus = "progress" | "blocked" | "pending" | "overdue" | "review" | "done";

export interface ChecklistTableOwner {
  name: React.ReactNode;
  avatarSrc?: string;
  helper?: React.ReactNode;
}

export interface ChecklistTableProgress {
  completed: number;
  total: number;
}

export interface ChecklistTableRow {
  id: string;
  index: number;
  title: React.ReactNode;
  type: React.ReactNode;
  progress: ChecklistTableProgress;
  owner: ChecklistTableOwner;
  deadline: React.ReactNode;
  deadlineTone?: "default" | "danger";
  status: ChecklistTableStatus;
  nextStep: React.ReactNode;
  activity: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

export interface ChecklistTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: ChecklistTableState;
  rows?: ChecklistTableRow[];
  pageLabel?: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  onRowSelect?: (row: ChecklistTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const checklistTableStatusLabel: Record<ChecklistTableStatus, string> = {
  progress: "Em andamento",
  blocked: "Bloqueado",
  pending: "Pendente",
  overdue: "Atrasado",
  review: "Em revisão",
  done: "Concluído"
};

const checklistTableStatusTone: Record<ChecklistTableStatus, ComponentTone> = {
  progress: "info",
  blocked: "danger",
  pending: "warning",
  overdue: "danger",
  review: "paused",
  done: "success"
};

const sourceChecklistTableRows: ChecklistTableRow[] = [
  {
    id: "opening",
    index: 1,
    title: "Abertura do estúdio",
    type: "Abertura",
    progress: { completed: 3, total: 5 },
    owner: { name: "Mariana" },
    deadline: <>Hoje<br />08:00</>,
    deadlineTone: "danger",
    status: "progress",
    nextStep: "Conferir salas",
    activity: "07:42",
    selected: true
  },
  {
    id: "daily-agenda",
    index: 2,
    title: "Revisão diária da agenda",
    type: "Agenda",
    progress: { completed: 4, total: 7 },
    owner: { name: "Lucas" },
    deadline: <>Ontem<br />09:30</>,
    deadlineTone: "danger",
    status: "overdue",
    nextStep: <>Resolver conflito<br />de sala</>,
    activity: "08:15"
  },
  {
    id: "closing",
    index: 3,
    title: "Fechamento do dia",
    type: "Fechamento",
    progress: { completed: 0, total: 6 },
    owner: { name: "Coordenação", helper: "Equipe" },
    deadline: <>Hoje<br />20:00</>,
    deadlineTone: "danger",
    status: "pending",
    nextStep: <>Iniciar<br />conferência</>,
    activity: "—"
  },
  {
    id: "agent-setup",
    index: 4,
    title: "Setup do agente de agenda",
    type: "Agentes",
    progress: { completed: 5, total: 8 },
    owner: { name: "Gestor" },
    deadline: "Amanhã",
    status: "review",
    nextStep: <>Validar fallback<br />manual</>,
    activity: "11:10"
  },
  {
    id: "new-student",
    index: 5,
    title: "Onboarding de novo aluno",
    type: "Alunos",
    progress: { completed: 6, total: 9 },
    owner: { name: "Recepção" },
    deadline: <>Hoje<br />16:00</>,
    deadlineTone: "danger",
    status: "progress",
    nextStep: "Validar contrato",
    activity: "13:20"
  }
];

function checklistTableSortValue(row: ChecklistTableRow, key: string) {
  if (key === "progress") return String(row.progress.completed / Math.max(row.progress.total, 1));
  if (key === "owner") return String(row.owner.name);
  if (key === "status") return checklistTableStatusLabel[row.status];
  const value = row[key as keyof ChecklistTableRow];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function ChecklistTableProgressCell({ progress }: { progress: ChecklistTableProgress }) {
  const normalized = Math.max(0, Math.min(100, Math.round((progress.completed / Math.max(progress.total, 1)) * 100)));
  return (
    <span className="tcrm-checklist-table__progress">
      <span
        aria-label={`${progress.completed} de ${progress.total} passos concluídos`}
        aria-valuemax={progress.total}
        aria-valuemin={0}
        aria-valuenow={progress.completed}
        className="tcrm-checklist-table__progress-ring"
        role="progressbar"
        style={{ "--tcrm-checklist-table-progress": `${normalized}%` } as React.CSSProperties}
      />
      <strong>{progress.completed}/{progress.total}</strong>
    </span>
  );
}

export function ChecklistTable({
  className,
  state = "source",
  rows = sourceChecklistTableRows,
  pageLabel = "1-5 de 12",
  itemsPerPage = "10",
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  ...props
}: ChecklistTableProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [sort, setSort] = React.useState<{ key: string; direction: "ascending" | "descending" } | undefined>();
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!sort) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const firstValue = checklistTableSortValue(first, sort.key);
      const secondValue = checklistTableSortValue(second, sort.key);
      const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
      return sort.direction === "ascending" ? result : result * -1;
    });
  }, [rows, sort, state]);
  const controlsDisabled = isLoading || isBlocked;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label="Tabela de checklists"
      className={cn("tcrm-checklist-table", className)}
      data-component="ChecklistTable"
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoadingState title="Carregando checklists" variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            className="tcrm-checklist-table__data"
            columns={[
              {
                key: "title",
                header: "Checklist",
                sortable: true,
                render: (row) => (
                  <span className={cn("tcrm-checklist-table__title-cell", row.selected && "is-selected")}>
                    <span className="tcrm-checklist-table__index">{row.index}.</span>
                    <strong className="tcrm-checklist-table__title">{row.title}</strong>
                  </span>
                )
              },
              { key: "type", header: "Tipo", sortable: true },
              {
                key: "progress",
                header: "Progresso",
                sortable: true,
                render: (row) => <ChecklistTableProgressCell progress={row.progress} />
              },
              {
                key: "owner",
                header: "Responsável",
                sortable: true,
                render: (row) => (
                  <span className="tcrm-checklist-table__owner">
                    <Avatar name={String(row.owner.name)} size="xs" src={row.owner.avatarSrc} />
                    <span>
                      <strong>{row.owner.name}</strong>
                      {row.owner.helper ? <small>{row.owner.helper}</small> : null}
                    </span>
                  </span>
                )
              },
              {
                key: "deadline",
                header: "Prazo",
                sortable: true,
                render: (row) => <span className={cn("tcrm-checklist-table__deadline", row.deadlineTone === "danger" && "is-danger")}>{row.deadline}</span>
              },
              {
                key: "status",
                header: "Status",
                sortable: true,
                render: (row) => (
                  <Chip className={cn("tcrm-checklist-table__status", `is-${row.status}`)} showDot={false} tone={checklistTableStatusTone[row.status]}>
                    {checklistTableStatusLabel[row.status]}
                  </Chip>
                )
              },
              { key: "nextStep", header: "Próximo passo", sortable: true },
              { key: "activity", header: "Última atividade", sortable: true, align: "right" }
            ]}
            density="dense"
            onRowClick={(row) => {
              if (!controlsDisabled && !row.disabled) {
                onRowSelect?.(row);
              }
            }}
            rows={tableRows}
            selectedRowId={tableRows.find((row) => row.selected)?.id}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePagination
            className="tcrm-checklist-table__pagination"
            itemsPerPageValue={itemsPerPage}
            label={String(pageLabel)}
            nextDisabled={controlsDisabled}
            onItemsPerPageClick={onItemsPerPageClick}
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            page={1}
            pageCount={2}
            previousDisabled={controlsDisabled}
          />
        </>
      ) : (
        <EmptyState title="Nenhum checklist" description="As rotinas operacionais aparecem aqui." />
      )}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de checklists esta indisponivel.</InlineAlert> : null}
    </Panel>
  );
}

export type ApprovalTableState = "source" | "loading" | "empty" | "blocked";
export type ApprovalTableType = "message" | "agenda" | "finance" | "announcement" | "agent" | "data";
export type ApprovalTableRisk = "low" | "medium" | "high";
export type ApprovalTableStatus = "pending" | "review" | "blocked" | "expired" | "approved" | "rejected";

export interface ApprovalTableRequester {
  name: React.ReactNode;
  avatarSrc?: string;
  icon?: IconName;
}

export interface ApprovalTableRow {
  id: string;
  index: number;
  title: React.ReactNode;
  type: ApprovalTableType;
  origin: React.ReactNode;
  requester: ApprovalTableRequester;
  risk: ApprovalTableRisk;
  cost: React.ReactNode;
  deadline: React.ReactNode;
  deadlineTone?: "default" | "danger";
  status: ApprovalTableStatus;
  activity: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

export interface ApprovalTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: ApprovalTableState;
  rows?: ApprovalTableRow[];
  pageLabel?: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  onRowSelect?: (row: ApprovalTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const approvalTableTypeLabel: Record<ApprovalTableType, string> = {
  message: "Mensagem",
  agenda: "Agenda",
  finance: "Financeiro",
  announcement: "Comunicado",
  agent: "Agente",
  data: "Dados"
};

const approvalTableTypeIcon: Record<ApprovalTableType, IconName> = {
  message: "message",
  agenda: "calendar",
  finance: "wallet",
  announcement: "send",
  agent: "user",
  data: "database"
};

const approvalTableRiskLabel: Record<ApprovalTableRisk, string> = {
  low: "Baixo",
  medium: "Médio",
  high: "Alto"
};

const approvalTableStatusLabel: Record<ApprovalTableStatus, React.ReactNode> = {
  pending: "Pendente",
  review: "Em revisão",
  blocked: <>Bloqueada<br />por política</>,
  expired: "Expirada",
  approved: "Aprovada",
  rejected: "Rejeitada"
};

const approvalTableStatusTone: Record<ApprovalTableStatus, ComponentTone> = {
  pending: "warning",
  review: "info",
  blocked: "danger",
  expired: "danger",
  approved: "success",
  rejected: "danger"
};

const sourceApprovalTableRows: ApprovalTableRow[] = [
  {
    id: "ana-message",
    index: 1,
    title: <>Aprovar mensagem<br />para Ana Paula</>,
    type: "message",
    origin: <>WhatsApp /<br />Agente de<br />atendimento</>,
    requester: { name: "Copiloto", icon: "sparkles" },
    risk: "low",
    cost: "1 crédito",
    deadline: <>Hoje<br />09:30</>,
    deadlineTone: "danger",
    status: "pending",
    activity: <>Sugestão gerada<br />às 09:18</>,
    selected: true
  },
  {
    id: "agenda-change",
    index: 2,
    title: <>Aprovar alteração<br />de agenda</>,
    type: "agenda",
    origin: "Reposição",
    requester: { name: "Recepção", icon: "user" },
    risk: "medium",
    cost: <>Impacto<br />4 alunos</>,
    deadline: <>Hoje<br />11:00</>,
    deadlineTone: "danger",
    status: "pending",
    activity: <>Conflito de sala<br />detectado</>
  },
  {
    id: "financial-exception",
    index: 3,
    title: <>Aprovar exceção<br />financeira</>,
    type: "finance",
    origin: <>Desconto<br />manual</>,
    requester: { name: "Mariana" },
    risk: "medium",
    cost: "R$ 120",
    deadline: <>Hoje<br />14:00</>,
    deadlineTone: "danger",
    status: "review",
    activity: <>Caixa solicitou<br />validação</>
  },
  {
    id: "replacement-announcement",
    index: 4,
    title: <>Aprovar comunicado<br />de reposição</>,
    type: "announcement",
    origin: <>Segmento<br />alunos afetados</>,
    requester: { name: <>Agente de<br />comunicação</>, icon: "user" },
    risk: "low",
    cost: "Cota 82%",
    deadline: "Expirou 08:00",
    deadlineTone: "danger",
    status: "expired",
    activity: <>Rascunho pronto<br />para envio</>
  },
  {
    id: "agent-action",
    index: 5,
    title: <>Aprovar ação<br />autônoma bloqueada</>,
    type: "agent",
    origin: <>Fluxo de<br />agenda</>,
    requester: { name: <>Agente de<br />agenda</>, icon: "user" },
    risk: "high",
    cost: "3 créditos",
    deadline: "Hoje",
    deadlineTone: "danger",
    status: "blocked",
    activity: <>Guardrail<br />interrompeu<br />execução</>
  },
  {
    id: "data-correction",
    index: 6,
    title: <>Aprovar correção<br />de cadastro</>,
    type: "data",
    origin: <>Telefone do<br />responsável</>,
    requester: { name: "CRM", icon: "user" },
    risk: "low",
    cost: "—",
    deadline: <>Hoje<br />16:00</>,
    deadlineTone: "danger",
    status: "approved",
    activity: <>Sugestão de<br />normalização</>
  }
];

function approvalTableSortValue(row: ApprovalTableRow, key: string) {
  if (key === "type") return approvalTableTypeLabel[row.type];
  if (key === "requester") return String(row.requester.name);
  if (key === "risk") return String({ high: 0, medium: 1, low: 2 }[row.risk]);
  if (key === "status") return String(approvalTableStatusLabel[row.status]);
  const value = row[key as keyof ApprovalTableRow];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function ApprovalTableRequesterCell({ requester }: { requester: ApprovalTableRequester }) {
  if (requester.avatarSrc) {
    return (
      <span className="tcrm-approval-table__requester">
        <Avatar name={String(requester.name)} size="xs" src={requester.avatarSrc} />
        <span>{requester.name}</span>
      </span>
    );
  }

  return (
    <span className="tcrm-approval-table__requester">
      <Icon name={requester.icon ?? "user"} size={14} />
      <span>{requester.name}</span>
    </span>
  );
}

export function ApprovalTable({
  className,
  state = "source",
  rows = sourceApprovalTableRows,
  pageLabel = "1-6 de 6",
  itemsPerPage = "10",
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  ...props
}: ApprovalTableProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [sort, setSort] = React.useState<{ key: string; direction: "ascending" | "descending" } | undefined>();
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!sort) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const firstValue = approvalTableSortValue(first, sort.key);
      const secondValue = approvalTableSortValue(second, sort.key);
      const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
      return sort.direction === "ascending" ? result : result * -1;
    });
  }, [rows, sort, state]);
  const controlsDisabled = isLoading || isBlocked;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label="Tabela de aprovações"
      className={cn("tcrm-approval-table", className)}
      data-component="ApprovalTable"
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoadingState title="Carregando aprovações" variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            className="tcrm-approval-table__data"
            columns={[
              {
                key: "title",
                header: "Aprovação",
                sortable: true,
                render: (row) => (
                  <span className={cn("tcrm-approval-table__title-cell", row.selected && "is-selected")}>
                    <span className="tcrm-approval-table__index">{row.index}.</span>
                    <strong className="tcrm-approval-table__title">{row.title}</strong>
                  </span>
                )
              },
              {
                key: "type",
                header: "Tipo",
                sortable: true,
                render: (row) => (
                  <span className="tcrm-approval-table__type">
                    <Icon name={approvalTableTypeIcon[row.type]} size={14} />
                    {approvalTableTypeLabel[row.type]}
                  </span>
                )
              },
              { key: "origin", header: "Origem canônica", sortable: true },
              {
                key: "requester",
                header: <>Solicitante /<br />agente</>,
                sortable: true,
                render: (row) => <ApprovalTableRequesterCell requester={row.requester} />
              },
              {
                key: "risk",
                header: "Risco",
                sortable: true,
                render: (row) => (
                  <span className={cn("tcrm-approval-table__risk", `is-${row.risk}`)}>
                    <i aria-hidden="true" />
                    {approvalTableRiskLabel[row.risk]}
                  </span>
                )
              },
              { key: "cost", header: <>Custo /<br />cota</>, sortable: true },
              {
                key: "deadline",
                header: "Prazo",
                sortable: true,
                render: (row) => <span className={cn("tcrm-approval-table__deadline", row.deadlineTone === "danger" && "is-danger")}>{row.deadline}</span>
              },
              {
                key: "status",
                header: "Status",
                sortable: true,
                render: (row) => (
                  <Chip className={cn("tcrm-approval-table__status", `is-${row.status}`)} showDot={false} tone={approvalTableStatusTone[row.status]}>
                    {approvalTableStatusLabel[row.status]}
                  </Chip>
                )
              },
              { key: "activity", header: "Última atividade", sortable: true }
            ]}
            density="dense"
            onRowClick={(row) => {
              if (!controlsDisabled && !row.disabled) {
                onRowSelect?.(row);
              }
            }}
            rows={tableRows}
            selectedRowId={tableRows.find((row) => row.selected)?.id}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePagination
            className="tcrm-approval-table__pagination"
            itemsPerPageValue={itemsPerPage}
            label={String(pageLabel)}
            nextDisabled={controlsDisabled}
            onItemsPerPageClick={onItemsPerPageClick}
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            page={1}
            pageCount={1}
            previousDisabled={controlsDisabled}
          />
        </>
      ) : (
        <EmptyState title="Nenhuma aprovação" description="As decisões que precisam de revisão humana aparecem aqui." />
      )}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de aprovações está indisponível.</InlineAlert> : null}
    </Panel>
  );
}

export type StudentTableState = "source" | "loading" | "empty" | "blocked";
export type StudentTableStatus = "active" | "paused" | "delinquent" | "risk" | "noClass" | "inactive";
export type StudentTableFinance = "ok" | "pending" | "overdue";
export type StudentTableRisk = "low" | "medium" | "high" | "none";

export interface StudentTablePerson {
  name: React.ReactNode;
  avatarSrc?: string;
  initials?: string;
}

export interface StudentTableActivity {
  label: React.ReactNode;
  status?: StatusDotStatus;
}

export interface StudentTableRow {
  id: string;
  student: StudentTablePerson;
  status: StudentTableStatus;
  plan: React.ReactNode;
  currentClass: React.ReactNode;
  owner: React.ReactNode;
  presence: React.ReactNode;
  finance: StudentTableFinance;
  risk: StudentTableRisk;
  activity: StudentTableActivity;
  selected?: boolean;
  disabled?: boolean;
}

export interface StudentTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: StudentTableState;
  density?: "standard" | "compact";
  selectionTone?: "marker" | "soft";
  rows?: StudentTableRow[];
  pageLabel?: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  onRowSelect?: (row: StudentTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const studentTableStatusLabel: Record<StudentTableStatus, string> = {
  active: "Ativa",
  paused: "Pausada",
  delinquent: "Inadimplente",
  risk: "Em risco",
  noClass: "Sem turma",
  inactive: "Inativa"
};

const studentTableStatusTone: Record<StudentTableStatus, ComponentTone> = {
  active: "success",
  paused: "neutral",
  delinquent: "danger",
  risk: "danger",
  noClass: "info",
  inactive: "neutral"
};

const studentTableFinanceLabel: Record<StudentTableFinance, React.ReactNode> = {
  ok: "OK",
  pending: <>pagamento<br />pendente</>,
  overdue: <>em<br />atraso</>
};

const studentTableFinanceAccessibleLabel: Record<StudentTableFinance, string> = {
  ok: "OK",
  pending: "Pagamento pendente",
  overdue: "Em atraso"
};

const studentTableFinanceTone: Record<StudentTableFinance, ComponentTone> = {
  ok: "success",
  pending: "warning",
  overdue: "danger"
};

const studentTableRiskLabel: Record<StudentTableRisk, string> = {
  low: "baixo",
  medium: "médio",
  high: "alto",
  none: "—"
};

const studentTableRiskTone: Record<StudentTableRisk, ComponentTone> = {
  low: "success",
  medium: "warning",
  high: "danger",
  none: "neutral"
};

const sourceStudentTableRows: StudentTableRow[] = [
  {
    id: "ana-paula",
    student: { name: "Ana Paula Martins", initials: "AP" },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Reformer Iniciante",
    owner: "Camila Martins",
    presence: "8/10",
    finance: "ok",
    risk: "low",
    activity: { label: "mensagem hoje", status: "info" },
    selected: true
  },
  {
    id: "joao-pedro",
    student: { name: "João Pedro Silva", initials: "JP" },
    status: "active",
    plan: "Premium",
    currentClass: "Mat Pilates",
    owner: "Nikki Olaw",
    presence: "6/10",
    finance: "pending",
    risk: "medium",
    activity: { label: "contrato atualizado", status: "info" }
  },
  {
    id: "carla-mendes",
    student: { name: "Carla Mendes", initials: "CM" },
    status: "risk",
    plan: "Trimestral",
    currentClass: "Funcional",
    owner: "Bruno Lima",
    presence: "3/10",
    finance: "ok",
    risk: "high",
    activity: { label: "14 dias sem aula", status: "danger" }
  },
  {
    id: "pedro-henrique",
    student: { name: "Pedro Henrique", initials: "PH" },
    status: "noClass",
    plan: "Experimental",
    currentClass: "—",
    owner: "Rafael Torres",
    presence: "—",
    finance: "pending",
    risk: "medium",
    activity: { label: "veio do WhatsApp", status: "info" }
  },
  {
    id: "juliana-rocha",
    student: { name: "Juliana Rocha", initials: "JR" },
    status: "inactive",
    plan: "Plano pausado",
    currentClass: "Pilates Solo",
    owner: "próprio",
    presence: "0/10",
    finance: "ok",
    risk: "low",
    activity: { label: "pausa até 30/05", status: "update" }
  },
  {
    id: "mariana-costa",
    student: { name: "Mariana Costa", initials: "MC" },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Reformer Iniciante",
    owner: "Luana Alves",
    presence: "9/10",
    finance: "ok",
    risk: "low",
    activity: { label: "aula realizada hoje", status: "info" }
  },
  {
    id: "lucas-oliveira",
    student: { name: "Lucas Oliveira", initials: "LO" },
    status: "active",
    plan: "Premium",
    currentClass: "Mat Pilates",
    owner: "Nikki Olaw",
    presence: "7/10",
    finance: "ok",
    risk: "low",
    activity: { label: "check-in hoje", status: "info" }
  },
  {
    id: "fernanda-souza",
    student: { name: "Fernanda Souza", initials: "FS" },
    status: "risk",
    plan: "Trimestral",
    currentClass: "Funcional",
    owner: "Bruno Lima",
    presence: "4/10",
    finance: "pending",
    risk: "high",
    activity: { label: "cobrança enviada", status: "danger" }
  },
  {
    id: "gabriel-santos",
    student: { name: "Gabriel Santos", initials: "GS" },
    status: "active",
    plan: "Plano Mensal",
    currentClass: "Pilates Solo",
    owner: "Camila Martins",
    presence: "8/10",
    finance: "ok",
    risk: "low",
    activity: { label: "aula realizada hoje", status: "info" }
  },
  {
    id: "patricia-lima",
    student: { name: "Patrícia Lima", initials: "PL" },
    status: "active",
    plan: "Premium",
    currentClass: "Reformer Avançado",
    owner: "Luana Alves",
    presence: "10/10",
    finance: "ok",
    risk: "low",
    activity: { label: "feedback registrado", status: "info" }
  }
];

function studentTableSortValue(row: StudentTableRow, key: string) {
  if (key === "student") return String(row.student.name);
  if (key === "status") return studentTableStatusLabel[row.status];
  if (key === "finance") return String(studentTableFinanceLabel[row.finance]);
  if (key === "risk") return String({ high: 0, medium: 1, low: 2, none: 3 }[row.risk]);
  if (key === "activity") return String(row.activity.label);
  const value = row[key as keyof StudentTableRow];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function StudentTablePersonCell({ person }: { person: StudentTablePerson }) {
  return (
    <span className="tcrm-student-table__person">
      <Avatar name={String(person.name)} size="xs" src={person.avatarSrc}>{person.initials}</Avatar>
      <strong>{person.name}</strong>
    </span>
  );
}

export function StudentTable({
  className,
  state = "source",
  density = "standard",
  selectionTone = "marker",
  rows = sourceStudentTableRows,
  pageLabel = "1-10 de 154",
  itemsPerPage = "10",
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  ...props
}: StudentTableProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [sort, setSort] = React.useState<{ key: string; direction: "ascending" | "descending" } | undefined>();
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!sort) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const firstValue = studentTableSortValue(first, sort.key);
      const secondValue = studentTableSortValue(second, sort.key);
      const result = firstValue.localeCompare(secondValue, "pt-BR", { numeric: true, sensitivity: "base" });
      return sort.direction === "ascending" ? result : result * -1;
    });
  }, [rows, sort, state]);
  const controlsDisabled = isLoading || isBlocked;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label="Tabela de alunos"
      className={cn("tcrm-student-table", density === "compact" && "tcrm-student-table--compact", selectionTone === "soft" && "tcrm-student-table--selection-soft", className)}
      data-component="StudentTable"
      data-density={density}
      data-selection-tone={selectionTone}
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoadingState title="Carregando alunos" variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            className="tcrm-student-table__data"
            columns={[
              {
                key: "student",
                header: "Aluno",
                sortable: true,
                render: (row) => <StudentTablePersonCell person={row.student} />
              },
              {
                key: "status",
                header: "Status",
                sortable: true,
                render: (row) => <Chip className={cn("tcrm-student-table__status", `is-${row.status}`)} showDot={false} tone={studentTableStatusTone[row.status]}>{studentTableStatusLabel[row.status]}</Chip>
              },
              { key: "plan", header: "Plano", sortable: true },
              { key: "currentClass", header: "Turma atual", sortable: true },
              { key: "owner", header: "Responsável", sortable: true },
              { key: "presence", header: "Presença", sortable: true },
              {
                key: "finance",
                header: "Financeiro",
                sortable: true,
                render: (row) => <Chip aria-label={studentTableFinanceAccessibleLabel[row.finance]} className={cn("tcrm-student-table__finance", `is-${row.finance}`)} showDot={false} tone={studentTableFinanceTone[row.finance]}>{studentTableFinanceLabel[row.finance]}</Chip>
              },
              {
                key: "risk",
                header: "Risco",
                sortable: true,
                render: (row) => <Chip className={cn("tcrm-student-table__risk", `is-${row.risk}`)} showDot={false} tone={studentTableRiskTone[row.risk]}>{studentTableRiskLabel[row.risk]}</Chip>
              },
              {
                key: "activity",
                header: "Última atividade",
                sortable: true,
                render: (row) => <StatusDot className="tcrm-student-table__activity" status={row.activity.status ?? "neutral"} label={String(row.activity.label)} />
              }
            ]}
            density="dense"
            onRowClick={(row) => {
              if (!controlsDisabled && !row.disabled) {
                onRowSelect?.(row);
              }
            }}
            rows={tableRows}
            selectedRowId={tableRows.find((row) => row.selected)?.id}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePagination
            className="tcrm-student-table__pagination"
            itemsPerPageValue={itemsPerPage}
            label={String(pageLabel)}
            nextDisabled={controlsDisabled}
            onItemsPerPageClick={onItemsPerPageClick}
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            page={1}
            pageCount={16}
            previousDisabled={controlsDisabled}
          />
        </>
      ) : (
        <EmptyState title="Nenhum aluno" description="Os alunos do estúdio aparecem aqui." />
      )}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de alunos está indisponível.</InlineAlert> : null}
    </Panel>
  );
}

export type ReplacementTableState = "source" | "loading" | "empty" | "blocked";
export type ReplacementTableStatus = "found" | "waiting" | "blocked" | "noVacancy" | "conflict" | "expiring" | "expired" | "scheduled" | "pending" | "available";
export type ReplacementTableMode = "copilot" | "manual" | "autonomous" | "blocked";

export interface ReplacementTableStudent {
  name: React.ReactNode;
  avatarSrc?: string;
  initials?: string;
}

export interface ReplacementTableRow {
  id: string;
  student: ReplacementTableStudent;
  originalClass: React.ReactNode;
  reason: React.ReactNode;
  validity: React.ReactNode;
  preference: React.ReactNode;
  status: ReplacementTableStatus;
  nextAction: React.ReactNode;
  mode: ReplacementTableMode;
  selected?: boolean;
  disabled?: boolean;
}

export interface ReplacementTableProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  state?: ReplacementTableState;
  rows?: ReplacementTableRow[];
  pageLabel?: React.ReactNode;
  itemsPerPage?: React.ReactNode;
  onRowSelect?: (row: ReplacementTableRow) => void;
  onItemsPerPageClick?: () => void;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

const replacementTableStatusLabel: Record<ReplacementTableStatus, React.ReactNode> = {
  found: "Opção encontrada",
  waiting: "Aguardando resposta",
  blocked: "Bloqueada por regra",
  noVacancy: "Sem vaga",
  conflict: "Conflito",
  expiring: "Expira amanhã",
  expired: "Vencida",
  scheduled: "Agendada",
  pending: "Pendente",
  available: "Com opção"
};

const replacementTableStatusTone: Record<ReplacementTableStatus, ComponentTone> = {
  found: "success",
  waiting: "warning",
  blocked: "danger",
  noVacancy: "danger",
  conflict: "danger",
  expiring: "warning",
  expired: "danger",
  scheduled: "success",
  pending: "neutral",
  available: "success"
};

const replacementTableModeLabel: Record<ReplacementTableMode, React.ReactNode> = {
  copilot: "copiloto sugeriu",
  manual: "manual",
  autonomous: "autônomo disponível",
  blocked: "autônomo bloqueado"
};

const replacementTableModeTone: Record<ReplacementTableMode, ComponentTone> = {
  copilot: "info",
  manual: "info",
  autonomous: "paused",
  blocked: "danger"
};

const sourceReplacementTableRows: ReplacementTableRow[] = [
  {
    id: "ana-carolina",
    student: { name: "Ana Carolina Souza", initials: "AS" },
    originalClass: <>Terça 17h<br />Reformer Inter.</>,
    reason: "Falta avisada",
    validity: "12/06",
    preference: "Manhã ou quinta",
    status: "found",
    nextAction: "Enviar convite",
    mode: "copilot",
    selected: true
  },
  {
    id: "felipe-andrade",
    student: { name: "Felipe Andrade", initials: "FA" },
    originalClass: <>Quinta 17h<br />Reformer Inter.</>,
    reason: "Falta avisada",
    validity: "20/05",
    preference: "Manhã",
    status: "waiting",
    nextAction: "Cobrar retorno",
    mode: "manual"
  },
  {
    id: "gabriela-martins",
    student: { name: "Gabriela Martins", initials: "GM" },
    originalClass: <>Terça 17h<br />Reformer Inter.</>,
    reason: "No-show",
    validity: "18/05",
    preference: "Noite",
    status: "blocked",
    nextAction: "Revisar política",
    mode: "blocked"
  },
  {
    id: "beatriz-lima",
    student: { name: "Beatriz Lima", initials: "BL" },
    originalClass: <>Quarta 08h<br />Pilates Solo</>,
    reason: <>Crédito vence<br />amanhã</>,
    validity: "14/05",
    preference: "Cedo",
    status: "expiring",
    nextAction: "Buscar horário",
    mode: "manual"
  },
  {
    id: "juliana-costa",
    student: { name: "Juliana Costa", initials: "JC" },
    originalClass: <>Segunda 19h<br />Tower</>,
    reason: <>Reposição<br />aprovada</>,
    validity: "16/05",
    preference: "Quinta 08h",
    status: "scheduled",
    nextAction: <>Confirmar<br />presença</>,
    mode: "autonomous"
  },
  {
    id: "marina-lopes",
    student: { name: "Marina Lopes", initials: "ML" },
    originalClass: <>Sexta 10h<br />Pilates Solo</>,
    reason: <>Encaixe<br />solicitado</>,
    validity: "24/05",
    preference: "Tarde",
    status: "pending",
    nextAction: "Avaliar opções",
    mode: "copilot"
  },
  {
    id: "lucas-peres",
    student: { name: "Lucas Peres", initials: "LP" },
    originalClass: <>Terça 07h<br />Reformer Inter.</>,
    reason: <>Pedido da<br />recepção</>,
    validity: "30/05",
    preference: "Sem preferência",
    status: "pending",
    nextAction: "Verificar vaga",
    mode: "manual"
  },
  {
    id: "camila-rocha",
    student: { name: "Camila Rocha", initials: "CR" },
    originalClass: <>Quarta 14h<br />Pilates Solo</>,
    reason: "Falta avisada",
    validity: "28/05",
    preference: "Quinta ou sexta",
    status: "available",
    nextAction: <>Confirmar<br />horário</>,
    mode: "autonomous"
  }
];

function replacementTableSortValue(row: ReplacementTableRow, key: string) {
  if (key === "student") return String(row.student.name);
  if (key === "status") return String(replacementTableStatusLabel[row.status]);
  if (key === "mode") return String(replacementTableModeLabel[row.mode]);
  const value = row[key as keyof ReplacementTableRow];
  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

function ReplacementTableStudentCell({ selected, student }: { selected?: boolean; student: ReplacementTableStudent }) {
  return (
    <span className={cn("tcrm-replacement-table__student", selected && "is-selected")}>
      <Avatar name={String(student.name)} size="xs" src={student.avatarSrc}>{student.initials}</Avatar>
      <strong>{student.name}</strong>
    </span>
  );
}

export function ReplacementTable({
  className,
  state = "source",
  rows = sourceReplacementTableRows,
  pageLabel = "1-8 de 8",
  itemsPerPage = "10",
  onRowSelect,
  onItemsPerPageClick,
  onPreviousPage,
  onNextPage,
  ...props
}: ReplacementTableProps) {
  const isLoading = state === "loading";
  const isBlocked = state === "blocked";
  const [sort, setSort] = React.useState<{ key: string; direction: "ascending" | "descending" } | undefined>();
  const tableRows = React.useMemo(() => {
    const sourceRows = state === "empty" ? [] : rows;
    if (!sort) return sourceRows;
    return [...sourceRows].sort((first, second) => {
      const result = replacementTableSortValue(first, sort.key).localeCompare(replacementTableSortValue(second, sort.key), "pt-BR", {
        numeric: true,
        sensitivity: "base"
      });
      return sort.direction === "ascending" ? result : result * -1;
    });
  }, [rows, sort, state]);
  const controlsDisabled = isLoading || isBlocked;

  return (
    <Panel
      aria-busy={isLoading || undefined}
      aria-label="Tabela de reposições"
      className={cn("tcrm-replacement-table", className)}
      data-component="ReplacementTable"
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoadingState title="Carregando reposições" variant="skeleton" />
      ) : tableRows.length > 0 ? (
        <>
          <DataTable
            className="tcrm-replacement-table__data"
            columns={[
              {
                key: "student",
                header: "Aluno",
                sortable: true,
                render: (row) => <ReplacementTableStudentCell selected={row.selected} student={row.student} />
              },
              { key: "originalClass", header: "Aula original", sortable: true },
              { key: "reason", header: "Motivo / origem", sortable: true },
              { key: "validity", header: "Validade", sortable: true },
              { key: "preference", header: "Preferência", sortable: true },
              {
                key: "status",
                header: "Status",
                sortable: true,
                render: (row) => <Chip className={cn("tcrm-replacement-table__status", `is-${row.status}`)} showDot={false} tone={replacementTableStatusTone[row.status]}>{replacementTableStatusLabel[row.status]}</Chip>
              },
              { key: "nextAction", header: "Próxima ação", sortable: true },
              {
                key: "mode",
                header: "Modo",
                sortable: true,
                render: (row) => <Chip className={cn("tcrm-replacement-table__mode", `is-${row.mode}`)} showDot={false} tone={replacementTableModeTone[row.mode]}>{replacementTableModeLabel[row.mode]}</Chip>
              }
            ]}
            density="dense"
            onRowClick={(row) => {
              if (!controlsDisabled && !row.disabled) {
                onRowSelect?.(row);
              }
            }}
            rows={tableRows}
            selectedRowId={tableRows.find((row) => row.selected)?.id}
            sort={sort}
            onSortChange={setSort}
          />
          <TablePagination
            className="tcrm-replacement-table__pagination"
            itemsPerPageValue={itemsPerPage}
            label={String(pageLabel)}
            nextDisabled={controlsDisabled}
            onItemsPerPageClick={onItemsPerPageClick}
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            page={1}
            pageCount={1}
            previousDisabled={controlsDisabled}
          />
        </>
      ) : (
        <EmptyState title="Nenhuma reposição" description="Os pedidos de reposição aparecem aqui." />
      )}
      {isBlocked ? <InlineAlert tone="warning" title="Tabela bloqueada">A lista de reposições está indisponível.</InlineAlert> : null}
    </Panel>
  );
}

export interface OpportunityPanelFact {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  icon: IconName;
  tone?: ComponentTone;
  presentation?: "text" | "chip";
}

export interface OpportunityPanelHistoryItem {
  id: string;
  label: React.ReactNode;
  time: React.ReactNode;
}

export type OpportunityPanelState = "open" | "ownerless" | "assigned" | "resolved" | "loading" | "blocked";
export type OpportunityPanelAction = "primary" | "enrollment" | "charge" | "conversation" | "task" | "no-action" | "more";

export interface OpportunityPanelProps extends Omit<CrmSurfaceProps, "state"> {
  state?: OpportunityPanelState;
  description?: React.ReactNode;
  facts?: OpportunityPanelFact[];
  history?: OpportunityPanelHistoryItem[];
  suggestion?: React.ReactNode;
  notice?: React.ReactNode;
  manualNotice?: React.ReactNode;
  primaryActionLabel?: React.ReactNode;
  onClose?: () => void;
  onAction?: (actionId: OpportunityPanelAction) => void;
}

const defaultOpportunityPanelFacts: OpportunityPanelFact[] = [
  { id: "origin", label: "Origem", value: "Matrículas", icon: "folder" },
  { id: "value", label: "Valor estimado", value: "R$ 420", icon: "coins" },
  { id: "impact", label: "Impacto", value: "conversão em aluna", icon: "sparkles" },
  { id: "owner", label: "Dono / fila", value: "Recepção", icon: "user" },
  { id: "deadline", label: "Prazo", value: "hoje", icon: "clock", tone: "danger" },
  { id: "status", label: "Status", value: "pagamento pendente", icon: "checkCircle", tone: "danger", presentation: "chip" },
  { id: "method", label: "Método disponível", value: "Pix", icon: "coins" },
  { id: "blocker", label: "Bloqueio", value: <>Pagamento inicial obrigatório<br />para converter</>, icon: "calendar" }
];

const defaultOpportunityPanelHistory: OpportunityPanelHistoryItem[] = [
  { id: "trial", label: "Compareceu à experimental", time: "hoje 09:20" },
  { id: "plan", label: "Plano 2x/semana escolhido", time: "hoje 09:10" },
  { id: "enrollment", label: "Pré-matrícula iniciada", time: "hoje 09:05" },
  { id: "payment", label: "Pagamento ainda não enviado", time: "hoje 08:58" }
];

export function OpportunityPanel({
  title = "Ana Souza",
  state = "open",
  description = "Pré-matrícula bloqueada por pagamento inicial",
  facts = defaultOpportunityPanelFacts,
  history = defaultOpportunityPanelHistory,
  suggestion = "Copiloto sugere enviar Pix com mensagem curta e abrir matrícula após confirmação.",
  notice = "Financeiro confirma o pagamento. Matrículas só destrava a conversão.",
  manualNotice = "Tudo pode ser feito manualmente. O copiloto apenas sugere. Ações autônomas seguem política do studio.",
  primaryActionLabel = "Enviar Pix",
  onClose,
  onAction,
  className
}: OpportunityPanelProps) {
  const key = stateKey(state) || "open";
  const isDisabled = key === "loading" || key === "blocked" || key === "resolved";
  const stateLabel = key === "resolved" ? "Oportunidade resolvida" : key === "ownerless" ? "Oportunidade sem dono" : key === "assigned" ? "Oportunidade atribuída" : "Oportunidade selecionada";
  const stateTone: ComponentTone = key === "resolved" || key === "assigned" ? "success" : key === "ownerless" ? "warning" : "info";

  return (
    <section aria-busy={key === "loading" || undefined} className={cn("tcrm-opportunity-panel", className)} data-state={key} aria-label={String(title)}>
      <header className="tcrm-opportunity-panel__header">
        <Chip className="tcrm-opportunity-chip tcrm-opportunity-chip--selected" showDot={false} tone={stateTone}>{stateLabel}</Chip>
        <IconButton className="tcrm-opportunity-panel__close" disabled={key === "loading" || key === "blocked"} icon="x" label="Fechar oportunidade" onClick={onClose} size="sm" variant="subtle" />
        <h3>{title}</h3>
        <p>{description}</p>
      </header>
      <dl className="tcrm-opportunity-panel__facts">
        {facts.map((fact) => (
          <div key={fact.id}>
            <Icon name={fact.icon} size="14px" />
            <dt>{fact.label}</dt>
            <dd className={cn(fact.tone === "danger" && fact.presentation !== "chip" && "tcrm-opportunity-panel__danger-value")}>
              {fact.presentation === "chip" ? <Chip className="tcrm-opportunity-chip tcrm-opportunity-chip--pending" showDot={false} tone={fact.tone ?? "neutral"}>{fact.value}</Chip> : fact.value}
            </dd>
          </div>
        ))}
      </dl>
      <section className="tcrm-opportunity-panel__history">
        <h4>Histórico</h4>
        {history.map((item) => (
          <p key={item.id}><span />{item.label}<time>{item.time}</time></p>
        ))}
      </section>
      <section className="tcrm-opportunity-panel__suggestion">
        <Icon name="sparkles" size="24px" tone="info" />
        <strong>{suggestion}</strong>
      </section>
      <section className="tcrm-opportunity-panel__notice">
        <Icon name="info" size="18px" tone="warning" />
        <p>{notice}</p>
      </section>
      <section className="tcrm-opportunity-panel__manual">
        <Icon name="info" size="15px" tone="info" />
        <p>{manualNotice}</p>
      </section>
      <div className="tcrm-opportunity-panel__actions">
        <Button disabled={isDisabled} leadingIcon="sliders" onClick={() => onAction?.("primary")} size="sm" variant="primary">{primaryActionLabel}</Button>
        <Button disabled={isDisabled} leadingIcon="clipboard" onClick={() => onAction?.("enrollment")} size="sm" variant="secondary">Abrir matrícula</Button>
        <Button disabled={isDisabled} leadingIcon="clipboard" onClick={() => onAction?.("charge")} size="sm" variant="secondary">Abrir cobrança</Button>
        <Button disabled={isDisabled} leadingIcon="message" onClick={() => onAction?.("conversation")} size="sm" variant="secondary">Abrir conversa</Button>
        <Button disabled={isDisabled} leadingIcon="checkCircle" onClick={() => onAction?.("task")} size="sm" variant="secondary">Criar tarefa</Button>
        <Button disabled={isDisabled} leadingIcon="x" onClick={() => onAction?.("no-action")} size="sm" variant="secondary">Marcar sem ação</Button>
        <Button disabled={isDisabled} leadingIcon="moreVertical" onClick={() => onAction?.("more")} size="sm" variant="secondary">Mais ações</Button>
      </div>
    </section>
  );
}

export function ImportProgress({
  state = "running",
  onDetails,
  onPause,
  onResume,
  onRetry,
  className
}: {
  state?: React.ComponentProps<typeof ImportProgressCard>["state"] | "mapped" | "conflict";
  onDetails?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onRetry?: () => void;
  className?: string;
}) {
  const primitiveState = state === "mapped" ? "complete" : state === "conflict" ? "duplicate" : state;

  return (
    <Panel className={cn("tcrm-import-progress-panel", className)} data-state={state}>
      <header className="tcrm-import-progress-panel__header">
        <span aria-hidden="true">3</span>
        <h3>Progresso de importação</h3>
      </header>
      <div className="tcrm-import-progress-panel__grid">
        <ImportProgressCard
          className="tcrm-import-progress-panel__main-card"
          helperText={<span className="tcrm-import-progress-panel__helper"><span>Tempo restante estimado</span><span>00:02:18</span></span>}
          metrics={[
            { label: "Registros totais", value: "312" },
            { label: "Processados", value: "245" },
            { label: "Restantes", value: "78" }
          ]}
          onDetails={onDetails}
          onPause={primitiveState === "running" ? onPause : undefined}
          onResume={primitiveState === "paused" ? onResume : undefined}
          onRetry={primitiveState === "error" ? onRetry : undefined}
          state={primitiveState}
          title="Importando alunos.csv"
          value={78}
        />
        <ImportProgressCard
          className="tcrm-import-progress-panel__summary-card"
          fileName="Contatos.csv"
          metrics={[{ label: "Hoje, 14:32", value: "128 registros" }]}
          state="complete"
          summary
          title="Concluído"
        />
        <ImportProgressCard
          className="tcrm-import-progress-panel__summary-card"
          fileName="planos.csv"
          metrics={[{ label: "Hoje, 14:28", value: "2 erros" }]}
          state="error"
          summary
          title="Erros"
        />
        <ImportProgressCard
          className="tcrm-import-progress-panel__summary-card"
          fileName="responsáveis.csv"
          metrics={[{ label: "Hoje, 14:25", value: "8 duplicidades" }]}
          state="duplicate"
          summary
          title="Duplicidades"
        />
        <ImportProgressCard
          className="tcrm-import-progress-panel__summary-card"
          fileName="turmas.csv"
          metrics={[{ label: "Pausado", value: "96 registros" }]}
          state="paused"
          summary
          title="Continuar depois"
        />
      </div>
    </Panel>
  );
}

export interface FieldMappingRow {
  id: string;
  source: React.ReactNode;
  target: string;
  targetValue?: string;
  state: "mapped" | "missing" | "invalid";
  actionLabel?: string;
}

export function FieldMappingTable({
  rows,
  onRowClick,
  onFieldChange,
  onRowAction,
  onAddMapping,
  className
}: {
  rows?: FieldMappingRow[];
  onRowClick?: (rowId: string) => void;
  onFieldChange?: (rowId: string, value: string) => void;
  onRowAction?: (rowId: string) => void;
  onAddMapping?: () => void;
  className?: string;
}) {
  const mappingRows = rows ?? [
    { id: "nome", source: "Nome do aluno", target: "Nome completo", targetValue: "nome-completo", state: "mapped" as const },
    { id: "telefone", source: "Telefone", target: "Telefone celular", targetValue: "telefone-celular", state: "mapped" as const },
    { id: "responsavel", source: "Responsável", target: "Responsável principal", targetValue: "responsavel-principal", state: "mapped" as const },
    { id: "nascimento", source: "Data de nascimento", target: "Data de nascimento", targetValue: "data-nascimento", state: "invalid" as const, actionLabel: "Corrigir" },
    { id: "plano", source: "Plano", target: "Plano contratado", targetValue: "plano-contratado", state: "missing" as const, actionLabel: "Mapear" }
  ];
  const targetOptions = [
    { value: "nome-completo", label: "Nome completo" },
    { value: "telefone-celular", label: "Telefone celular" },
    { value: "responsavel-principal", label: "Responsável principal" },
    { value: "data-nascimento", label: "Data de nascimento" },
    { value: "plano-contratado", label: "Plano contratado" }
  ];
  const statusByState = {
    mapped: { icon: "checkCircle" as IconName, label: "Válido", tone: "success" },
    invalid: { icon: "alert" as IconName, label: "Formato inválido", tone: "warning" },
    missing: { icon: "alertCircle" as IconName, label: "Campo obrigatório", tone: "danger" }
  };

  return (
    <Panel className={cn("tcrm-field-mapping-panel", className)}>
      <header className="tcrm-field-mapping-panel__header">
        <span aria-hidden="true">4</span>
        <h3>Mapeamento de campos</h3>
      </header>
      <DataTable
        className="tcrm-field-mapping-panel__table"
        columns={[
          { key: "source", header: "Coluna importada" },
          {
            key: "target",
            header: "Campo Taliya",
            render: (row) => (
              <Select
                aria-label={`Campo Taliya para ${row.id}`}
                className="tcrm-field-mapping-panel__select"
                fieldSize="sm"
                onValueChange={(value) => onFieldChange?.(row.id, value)}
                options={targetOptions}
                value={row.targetValue}
              />
            )
          },
          {
            key: "state",
            header: "Status",
            render: (row) => {
              const status = statusByState[row.state];
              return (
                <span className={cn("tcrm-field-mapping-panel__status", `tcrm-field-mapping-panel__status--${status.tone}`)}>
                  <Icon name={status.icon} />
                  {status.label}
                </span>
              );
            }
          }
        ]}
        density="dense"
        onRowClick={onRowClick ? (row) => onRowClick(row.id) : undefined}
        rowActions={(row) => row.actionLabel ? (
          <Button className="tcrm-field-mapping-panel__text-action" onClick={() => onRowAction?.(row.id)} size="sm" type="button" variant="ghost">{row.actionLabel}</Button>
        ) : (
          <IconButton className="tcrm-field-mapping-panel__chevron" icon="chevronRight" label={`Abrir mapeamento ${row.id}`} onClick={() => onRowAction?.(row.id)} size="sm" type="button" variant="ghost" />
        )}
        rows={mappingRows}
      />
      <footer className="tcrm-field-mapping-panel__footer">
        <Button leadingIcon="plus" onClick={onAddMapping} size="sm" variant="secondary">Adicionar correspondência</Button>
        <Button className="tcrm-field-mapping-panel__count" trailingIcon="chevronRight" size="sm" type="button" variant="ghost">5 de 7 mapeados</Button>
      </footer>
    </Panel>
  );
}

export function DuplicateResolver({
  state = "candidates",
  onAction,
  avatarSrc,
  className
}: CrmSurfaceProps & {
  onAction?: (actionId: string) => void;
  avatarSrc?: string;
}) {
  return (
    <Panel className={cn("tcrm-duplicate-resolver", className)} data-state={state}>
      <header className="tcrm-duplicate-resolver__header">
        <span aria-hidden="true">5</span>
        <h3>Resolução de duplicidade</h3>
      </header>
      <div className="tcrm-duplicate-resolver__choices" role="radiogroup" aria-label="Escolher registro principal">
        <Radio defaultChecked label="Registro A (sugerido)" name="duplicate-primary" onChange={() => onAction?.("select-a")} />
        <Radio label="Registro B" name="duplicate-primary" onChange={() => onAction?.("select-b")} />
      </div>
      <div className="tcrm-duplicate-resolver__body">
        <Card className="tcrm-duplicate-resolver__record tcrm-duplicate-resolver__record--primary">
          <header>
            <Avatar name="João Pedro Silva" size="sm" src={avatarSrc} status="success" />
            <span><strong>João Pedro Silva</strong><small>ID: 456871</small></span>
          </header>
          <dl>
            <div><dt>CPF</dt><dd>•••.234.567-89</dd></div>
            <div><dt>Telefone</dt><dd>(11) 93456-7890</dd></div>
            <div><dt>Responsável</dt><dd>Nikki Olaw (mãe)</dd></div>
            <div><dt>E-mail</dt><dd>joao.silva@email.com</dd></div>
            <div><dt>Endereço</dt><dd>Rua das Flores, 123</dd></div>
          </dl>
          <Chip showDot={false} tone="info">Premium</Chip>
        </Card>
        <div className="tcrm-duplicate-resolver__match-column" aria-hidden="true">
          <span>=</span>
          <StatusDot status="success" />
          <StatusDot status="success" />
          <Icon name="alert" />
          <Icon name="arrowRight" />
        </div>
        <Card className="tcrm-duplicate-resolver__record tcrm-duplicate-resolver__record--conflict">
          <header>
            <Avatar name="João Pedro Silva" size="sm" src={avatarSrc} status="danger" />
            <span><strong>João Pedro Silva</strong><small>ID: 90214</small></span>
          </header>
          <dl>
            <div><dt>CPF</dt><dd>•••.234.567-89</dd></div>
            <div><dt>Telefone</dt><dd>(11) 93456-7890</dd></div>
            <div><dt>Responsável</dt><dd>Nikki Olaw</dd></div>
            <div className="is-warning"><dt>E-mail</dt><dd>joaopedro@gmail.com</dd></div>
            <div className="is-danger"><dt>Endereço</dt><dd>R. das Flores, 123</dd></div>
          </dl>
          <Chip showDot={false} tone="info">Premium</Chip>
        </Card>
        <Card className="tcrm-duplicate-resolver__actions">
          <strong>Ações</strong>
          <span>Escolher principal</span>
          <Radio defaultChecked label="Registro A" name="duplicate-action-primary" onChange={() => onAction?.("select-a")} />
          <Radio label="Registro B" name="duplicate-action-primary" onChange={() => onAction?.("select-b")} />
          <Button onClick={() => onAction?.("merge-a")} size="sm" variant="primary">Mesclar registros</Button>
          <Button onClick={() => onAction?.("separate")} size="sm" variant="secondary">Manter separados</Button>
        </Card>
      </div>
      <footer className="tcrm-duplicate-resolver__legend">
        <span><Icon name="check" />Corresponde (5)</span>
        <span><Icon name="alert" />Divergente (2)</span>
        <span><Icon name="alertCircle" />Ausente (0)</span>
      </footer>
    </Panel>
  );
}

type AdvancedStateAction = (action: string) => void;

export type PermissionStateVariant = "read-only" | "request-access";

export interface PermissionStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  state?: PermissionStateVariant;
  onAction?: AdvancedStateAction;
}

export function PermissionState({ state = "request-access", onAction, className, ...props }: PermissionStateProps) {
  const requestEnabled = state === "request-access";
  const rows: Array<{
    id: string;
    module: string;
    profile: string;
    action: string;
    status: "allowed" | "blocked" | "request" | "pending";
  }> = [
    { id: "contacts", module: "Contatos", profile: "Analista", action: "Editar", status: "allowed" },
    { id: "finance", module: "Financeiro", profile: "SDR", action: "Excluir", status: "blocked" },
    { id: "reports", module: "Relatórios", profile: "Gestor", action: "Visualizar", status: requestEnabled ? "request" : "pending" },
    { id: "integrations", module: "Integrações", profile: "Admin", action: "Configurar", status: "allowed" }
  ];

  return (
    <Panel compact className={cn("tcrm-permission-state-panel", className)} data-component="PermissionState" {...props}>
      <header className="tcrm-advanced-state-header">
        <h3>5. Permissões e acesso</h3>
        <Icon name="info" />
      </header>
      <div className="tcrm-permission-state-panel__columns" aria-hidden="true">
        <span>Módulo</span>
        <span>Perfil</span>
        <span>Ação</span>
        <span>Status</span>
      </div>
      <div className="tcrm-permission-state-panel__rows" role="table" aria-label="Permissões e acesso">
        {rows.map((row) => (
          <div className="tcrm-permission-state-panel__row" key={row.id} role="row">
            <span role="cell">{row.module}</span>
            <span role="cell">{row.profile}</span>
            <span role="cell">{row.action}</span>
            <span className="tcrm-permission-state-panel__status" role="cell">
              {row.status === "request" ? (
                <Button onClick={() => onAction?.(`request:${row.id}`)} size="sm" variant="secondary">Solicitar acesso</Button>
              ) : row.status === "allowed" ? (
                <Chip icon="check" showDot={false} tone="success">Permitido</Chip>
              ) : row.status === "blocked" ? (
                <Chip icon="alertCircle" showDot={false} tone="danger">Bloqueado</Chip>
              ) : (
                <Chip icon="clock" showDot={false} tone="warning">Pendente</Chip>
              )}
            </span>
          </div>
        ))}
      </div>
      <Button className="tcrm-advanced-state-link" onClick={() => onAction?.("open-permissions")} trailingIcon="arrowRight" type="button" variant="ghost">Ver todas as permissões</Button>
    </Panel>
  );
}

export type PlanBlockedStateVariant = "upgrade" | "manual";

export interface PlanBlockedStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  state?: PlanBlockedStateVariant;
  onAction?: AdvancedStateAction;
}

export function PlanBlockedState({ state = "upgrade", onAction, className, ...props }: PlanBlockedStateProps) {
  const isManual = state === "manual";
  return (
    <Card className={cn("tcrm-plan-blocked-state", isManual && "tcrm-plan-blocked-state--manual", className)} data-component="PlanBlockedState" {...props}>
      <span className="tcrm-plan-blocked-state__icon">
        <Icon name={isManual ? "refresh" : "users"} />
      </span>
      <h3>{isManual ? "Operação manual" : "Mais agentes"}</h3>
      <Chip showDot={false} tone={isManual ? "success" : "warning"}>
        {isManual ? "Manual ativo" : "Plano máximo"}
      </Chip>
      <p>{isManual ? "O CRM continua ativo para a equipe executar manualmente." : "Seu plano já inclui os 7 agentes."}</p>
      <small>{isManual ? "Automação paga pode ficar bloqueada sem impedir a rotina do estúdio." : "Para revisar uma condição especial, fale com suporte."}</small>
      <Button onClick={() => onAction?.(isManual ? "manual" : "support")} size="sm" variant="secondary">
        {isManual ? "Ver alternativa manual" : "Falar com suporte"}
      </Button>
    </Card>
  );
}

export interface QuotaBlockedStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  value?: 70 | 90 | 100;
  onAction?: AdvancedStateAction;
}

export function QuotaBlockedState({ value = 100, onAction, className, ...props }: QuotaBlockedStateProps) {
  return (
    <div className={cn("tcrm-quota-blocked-state", className)} data-component="QuotaBlockedState" data-quota-value={value} {...props}>
      <Panel compact className="tcrm-quota-blocked-state__panel tcrm-quota-blocked-state__panel--alerts">
        <h3>Alertas e economia</h3>
        <div className="tcrm-quota-blocked-state__rows">
          <span className="tcrm-quota-blocked-state__row">
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--success"><Icon name="checkCircle" /></span>
            <span>Nenhum alerta crítico</span>
          </span>
          <span className={cn("tcrm-quota-blocked-state__row", value >= 90 && "is-current")}>
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--info">%</span>
            <span>Economia entra automaticamente em 90%.</span>
          </span>
          <span className={cn("tcrm-quota-blocked-state__row", value === 100 && "is-current")}>
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--info"><Icon name="pause" /></span>
            <span>Automação paga pausa em 100%;<br />CRM manual continua.</span>
          </span>
        </div>
      </Panel>
      <Panel compact className="tcrm-quota-blocked-state__panel tcrm-quota-blocked-state__panel--affected">
        <h3>O que foi afetado</h3>
        <div className="tcrm-quota-blocked-state__rows tcrm-quota-blocked-state__rows--affected">
          <span className="tcrm-quota-blocked-state__row">
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--success"><Icon name="checkCircle" /></span>
            <span>{value === 100 ? "Fluxos pagos pausados por cota" : "Nenhum fluxo pausado por cota"}</span>
          </span>
          <span className="tcrm-quota-blocked-state__row">
            <span className="tcrm-quota-blocked-state__icon tcrm-quota-blocked-state__icon--success"><Icon name="checkCircle" /></span>
            <span>Nenhum downgrade ativo</span>
          </span>
        </div>
        <Button onClick={() => onAction?.("flows")} size="sm" variant="secondary">Ver fluxos</Button>
      </Panel>
    </div>
  );
}

export type IntegrationFailedStateVariant = "retry" | "fallback" | "support";

export interface IntegrationFailedStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  state?: IntegrationFailedStateVariant;
  onAction?: AdvancedStateAction;
}

export function IntegrationFailedState({ state = "retry", onAction, className, ...props }: IntegrationFailedStateProps) {
  const actionLabel = state === "support" ? "Abrir suporte" : state === "fallback" ? "Usar fallback" : "Reconectar";
  return (
    <Panel compact className={cn("tcrm-integration-failed-panel", className)} data-component="IntegrationFailedState" {...props}>
      <header className="tcrm-advanced-state-header">
        <h3>6. Integrações</h3>
        <Icon name="info" />
      </header>
      <div className="tcrm-integration-failed-panel__rows">
        <div className="tcrm-integration-failed-panel__row">
          <span className="tcrm-integration-failed-panel__mark tcrm-integration-failed-panel__mark--stripe">S</span>
          <span className="tcrm-integration-failed-panel__body">
            <strong>Stripe</strong>
            <small>Pagamentos</small>
          </span>
          <span className="tcrm-integration-failed-panel__status">
            <Chip showDot={false} tone="success">Conectado</Chip>
            <small>Conectado em 26/04/2024</small>
          </span>
          <IconButton icon="moreVertical" label="Mais ações Stripe" onClick={() => onAction?.("stripe-menu")} size="sm" variant="ghost" />
        </div>
        <div className="tcrm-integration-failed-panel__row tcrm-integration-failed-panel__row--error">
          <span className="tcrm-integration-failed-panel__mark tcrm-integration-failed-panel__mark--twilio">
            <span aria-hidden="true" className="tcrm-integration-failed-panel__twilio-grid"><i /><i /><i /><i /></span>
          </span>
          <span className="tcrm-integration-failed-panel__body">
            <strong>Twilio</strong>
            <small>SMS</small>
          </span>
          <span className="tcrm-integration-failed-panel__status">
            <Chip showDot={false} tone="danger">Erro</Chip>
            <small>Falha na conexão</small>
          </span>
          <span className="tcrm-integration-failed-panel__actions">
            <Button onClick={() => onAction?.(state)} size="sm" variant="secondary">{actionLabel}</Button>
            <IconButton icon="moreVertical" label="Mais ações Twilio" onClick={() => onAction?.("twilio-menu")} size="sm" variant="ghost" />
          </span>
        </div>
      </div>
      <Button className="tcrm-advanced-state-link" onClick={() => onAction?.("open-integrations")} trailingIcon="arrowRight" type="button" variant="ghost">Ver todas as integrações</Button>
    </Panel>
  );
}

export type GovernanceAction = (action: string) => void;

export interface PlanAgentsPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  baseAgents?: number;
  professionalAgents?: number;
  usedAgents?: number;
  totalAgents?: number;
  onAction?: GovernanceAction;
}

export function PlanAgentsPanel({
  baseAgents = 0,
  professionalAgents = 7,
  usedAgents = 7,
  totalAgents = 20,
  onAction,
  className,
  ...props
}: PlanAgentsPanelProps) {
  const availableAgents = Math.max(0, totalAgents - usedAgents);
  const progress = totalAgents > 0 ? Math.round((usedAgents / totalAgents) * 100) : 0;

  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-plan-agents-panel", className)} data-component="PlanAgentsPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>1. Plano e agentes</h3><Icon name="info" /></header>
      <div className="tcrm-plan-agents-panel__grid">
        <Card className="tcrm-plan-agents-panel__plan">
          <header><strong>Base</strong><Chip showDot={false}>Plano base</Chip></header>
          <span className="tcrm-plan-agents-panel__plan-icon"><Icon name="user" /></span>
          <p><strong>{baseAgents}</strong> agentes</p>
          <small>CRM ativo</small>
          <Chip showDot={false} tone="success">Ativo</Chip>
          <Button onClick={() => onAction?.("view-base")} size="sm" variant="secondary">Ver detalhes</Button>
        </Card>
        <Card className="tcrm-plan-agents-panel__plan">
          <header><strong>Profissional</strong><Chip showDot={false}>CRM Ativo</Chip></header>
          <span className="tcrm-plan-agents-panel__plan-icon"><Icon name="users" /></span>
          <p><strong>{professionalAgents}</strong> agentes</p>
          <small>Incluídos no plano</small>
          <Chip showDot={false} tone="success">Ativo</Chip>
          <Button onClick={() => onAction?.("upgrade")} size="sm" variant="primary">Fazer upgrade</Button>
        </Card>
        <Card className="tcrm-plan-agents-panel__capacity">
          <span>Agentes</span>
          <span aria-label={`${progress}% dos agentes usados`} className="tcrm-plan-agents-panel__ring" role="progressbar" style={{ "--tcrm-plan-agents-progress": `${progress}%` } as React.CSSProperties} aria-valuemax={100} aria-valuemin={0} aria-valuenow={progress}>
            <strong>{usedAgents} / {totalAgents}</strong><small>usados</small>
          </span>
          <strong>{availableAgents} <small>disponíveis</small></strong>
          <Button onClick={() => onAction?.("view-agents")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver agentes</Button>
        </Card>
      </div>
    </Panel>
  );
}

export interface FallbackControlCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  enabled?: boolean;
  defaultEnabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
}

export function FallbackControlCard({ enabled, defaultEnabled = true, onEnabledChange, className, ...props }: FallbackControlCardProps) {
  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-fallback-control", className)} data-component="FallbackControlCard" {...props}>
      <header className="tcrm-governance-panel__header"><h3>4. Fallback manual</h3><Icon name="info" /></header>
      <Card className="tcrm-fallback-control__card">
        <span className="tcrm-fallback-control__icon"><Icon name="refresh" /></span>
        <span className="tcrm-fallback-control__body"><strong>Fallback manual</strong><p>Quando a automação não pode atuar, o CRM continua ativo para que a equipe execute a ação manualmente.</p></span>
        <span className="tcrm-fallback-control__status"><Chip showDot={false} tone="success">Habilitado</Chip><Toggle aria-label="Alternar fallback manual" compact defaultPressed={enabled === undefined ? defaultEnabled : undefined} onPressedChange={onEnabledChange} pressed={enabled} /></span>
      </Card>
    </Panel>
  );
}

export interface BillingGovernancePanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  cardLabel?: React.ReactNode;
  cardEnding?: React.ReactNode;
  cardExpiry?: React.ReactNode;
  nextChargeDate?: React.ReactNode;
  nextChargeAmount?: React.ReactNode;
  invoiceId?: React.ReactNode;
  invoiceDate?: React.ReactNode;
  invoiceAmount?: React.ReactNode;
  onAction?: GovernanceAction;
}

export function BillingGovernancePanel({
  cardLabel = "Visa",
  cardEnding = "•••• 4242",
  cardExpiry = "Vence em 12/2026",
  nextChargeDate = "28/05/2024",
  nextChargeAmount = "R$ 1.890,00",
  invoiceId = "FAT-2024-0452",
  invoiceDate = "28/04/2024",
  invoiceAmount = "R$ 1.890,00",
  onAction,
  className,
  ...props
}: BillingGovernancePanelProps) {
  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-billing-governance", className)} data-component="BillingGovernancePanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>7. Billing e pagamento</h3><Icon name="info" /></header>
      <div className="tcrm-billing-governance__grid">
        <Card><small>Método de pagamento</small><span className="tcrm-billing-governance__payment"><Icon name="creditCard" /><strong>{cardLabel} {cardEnding}</strong></span><span>{cardExpiry}</span><Button onClick={() => onAction?.("update-payment")} size="sm" variant="secondary">Atualizar pagamento</Button></Card>
        <Card><small>Próxima cobrança</small><strong>{nextChargeDate}</strong><span>{nextChargeAmount}</span><small>Em 28 dias</small><Chip showDot={false} tone="success">Pago</Chip></Card>
        <Card><small>Última fatura</small><strong>{invoiceId}</strong><span>{invoiceDate}</span><span>{invoiceAmount}</span><Button onClick={() => onAction?.("view-invoice")} size="sm" trailingIcon="download" variant="secondary">Ver fatura</Button></Card>
      </div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("invoice-history")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver histórico de faturas</Button>
    </Panel>
  );
}

export type GovernanceAuditStatus = "success" | "pending" | "alert";

export interface GovernanceAuditRow {
  id: string;
  action: React.ReactNode;
  user: React.ReactNode;
  dateTime: React.ReactNode;
  origin: React.ReactNode;
  status: GovernanceAuditStatus;
}

const defaultGovernanceAuditRows: GovernanceAuditRow[] = [
  { id: "login", action: "Login realizado", user: "Sam Frank", dateTime: "28/04/2024 10:32", origin: "Web", status: "success" },
  { id: "automation", action: "Regra de automação editada", user: "Nikki Olaw", dateTime: "28/04/2024 09:18", origin: "Web", status: "success" },
  { id: "integration", action: "Integração reconectada", user: "Maria Lopes", dateTime: "27/04/2024 16:41", origin: "API", status: "success" },
  { id: "permission", action: "Permissão solicitada", user: "João Silva", dateTime: "27/04/2024 14:12", origin: "Web", status: "pending" },
  { id: "quota", action: "Cota próxima do limite", user: "Sistema", dateTime: "27/04/2024 11:02", origin: "Sistema", status: "alert" }
];

const governanceAuditTone: Record<GovernanceAuditStatus, ComponentTone> = { success: "success", pending: "info", alert: "warning" };
const governanceAuditLabel: Record<GovernanceAuditStatus, string> = { success: "Sucesso", pending: "Pendente", alert: "Alerta" };

export interface GovernanceAuditPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  rows?: GovernanceAuditRow[];
  onAction?: GovernanceAction;
  onRowClick?: (row: GovernanceAuditRow) => void;
}

export function GovernanceAuditPanel({ rows = defaultGovernanceAuditRows, onAction, onRowClick, className, ...props }: GovernanceAuditPanelProps) {
  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-governance-audit", className)} data-component="GovernanceAuditPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>8. Auditoria e logs</h3><Icon name="info" /></header>
      <div className="tcrm-governance-audit__table-wrap">
        <table><thead><tr><th>Ação</th><th>Usuário</th><th>Data / Hora</th><th>Origem</th><th>Status</th></tr></thead><tbody>{rows.map((row) => <tr className={onRowClick ? "is-interactive" : undefined} key={row.id} onClick={() => onRowClick?.(row)}><td>{row.action}</td><td>{row.user}</td><td>{row.dateTime}</td><td>{row.origin}</td><td><Chip showDot={false} tone={governanceAuditTone[row.status]}>{governanceAuditLabel[row.status]}</Chip></td></tr>)}</tbody></table>
      </div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("view-all-logs")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todos os logs</Button>
    </Panel>
  );
}

export interface GuardrailPolicy {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  icon: IconName;
  enabled: boolean;
}

const defaultGuardrailPolicies: GuardrailPolicy[] = [
  { id: "automatic", title: "Permitir ação automática", description: "Ações podem ser executadas automaticamente pelos agentes", icon: "shield", enabled: true },
  { id: "review", title: "Exigir revisão humana", description: "Ações sensíveis exigem aprovação manual antes da execução", icon: "lock", enabled: true },
  { id: "quota", title: "Limitar uso ao atingir cota", description: "Bloqueia novas execuções quando a cota é atingida", icon: "alert", enabled: true },
  { id: "schedule", title: "Bloquear envio fora do horário", description: "Mensagem não enviada fora do horário comercial", icon: "clock", enabled: false }
];

export interface GuardrailPolicyPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  policies?: GuardrailPolicy[];
  onPolicyChange?: (policyId: string, enabled: boolean) => void;
  onAction?: GovernanceAction;
}

export function GuardrailPolicyPanel({ policies = defaultGuardrailPolicies, onPolicyChange, onAction, className, ...props }: GuardrailPolicyPanelProps) {
  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-guardrail-policy", className)} data-component="GuardrailPolicyPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>9. Política e guardrails</h3><Icon name="info" /></header>
      <div className="tcrm-guardrail-policy__rows">{policies.map((policy) => <RuleRow checked={policy.enabled} control="none" description={policy.description} icon={policy.icon} iconTone="neutral" key={policy.id} onToggle={(enabled) => onPolicyChange?.(policy.id, enabled)} rowId={policy.id} showToggle title={policy.title} />)}</div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("view-all-policies")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as políticas</Button>
    </Panel>
  );
}

export interface GeneralSettingsPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  workspaceName?: string;
  defaultPlan?: string;
  automaticFallback?: string;
  limitNotifications?: string;
  emailAlerts?: boolean;
  onFieldChange?: (field: string, value: string | boolean) => void;
  onAction?: GovernanceAction;
}

export function GeneralSettingsPanel({
  workspaceName = "Taliya CRM",
  defaultPlan = "professional",
  automaticFallback = "manual",
  limitNotifications = "admins",
  emailAlerts = true,
  onFieldChange,
  onAction,
  className,
  ...props
}: GeneralSettingsPanelProps) {
  return (
    <Panel compact className={cn("tcrm-governance-panel", "tcrm-general-settings", className)} data-component="GeneralSettingsPanel" {...props}>
      <header className="tcrm-governance-panel__header"><h3>10. Configurações gerais</h3><Icon name="info" /></header>
      <div className="tcrm-general-settings__rows">
        <label><span>Nome do workspace</span><Input aria-label="Nome do workspace" onChange={(event) => onFieldChange?.("workspaceName", event.currentTarget.value)} value={workspaceName} /></label>
        <label><span>Plano padrão</span><Select aria-label="Plano padrão" onValueChange={(value) => onFieldChange?.("defaultPlan", value)} options={[{ value: "base", label: "Base" }, { value: "professional", label: "Profissional" }]} value={defaultPlan} /></label>
        <label><span>Fallback automático</span><Select aria-label="Fallback automático" onValueChange={(value) => onFieldChange?.("automaticFallback", value)} options={[{ value: "manual", label: "Manual" }, { value: "paused", label: "Pausado" }]} value={automaticFallback} /></label>
        <label><span>Notificações de limite</span><Select aria-label="Notificações de limite" onValueChange={(value) => onFieldChange?.("limitNotifications", value)} options={[{ value: "admins", label: "Administrador e Gestores" }, { value: "owner", label: "Somente owner" }]} value={limitNotifications} /></label>
        <label className="tcrm-general-settings__toggle"><span>Ativar alertas por e-mail</span><Toggle aria-label="Ativar alertas por e-mail" compact onPressedChange={(value) => onFieldChange?.("emailAlerts", value)} pressed={emailAlerts} /></label>
      </div>
      <Button className="tcrm-governance-panel__link" onClick={() => onAction?.("view-all-settings")} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as configurações</Button>
    </Panel>
  );
}

const image13SetupSteps: StepperStep[] = [
  { id: "source", label: "Fonte de dados", description: "Concluído", state: "complete" },
  { id: "import", label: "Importação", description: "Concluído", state: "complete" },
  { id: "mapping", label: "Mapeamento", description: "Em andamento", state: "current" },
  { id: "duplicates", label: "Duplicidades", description: "Bloqueado", state: "blocked" },
  { id: "activation", label: "Ativação", description: "Pendente", state: "pending" }
];

export interface SetupWizardPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  steps?: StepperStep[];
  currentStepId?: string;
  progress?: number;
  onStepSelect?: (stepId: string) => void;
}

export function SetupWizardPanel({
  steps = image13SetupSteps,
  currentStepId = "mapping",
  progress = 60,
  onStepSelect,
  className,
  ...props
}: SetupWizardPanelProps) {
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-setup-wizard-panel", className)} data-component="SetupWizardPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>1</span><h3>Wizard / stepper de setup</h3></header>
      <Stepper compact currentStepId={currentStepId} onStepSelect={onStepSelect} progress={progress} steps={steps} />
    </Panel>
  );
}

export interface ActivationChecklistItem {
  id: string;
  title: React.ReactNode;
  owner: React.ReactNode;
  ownerAvatarSrc?: string;
  actionLabel: string;
  state: "complete" | "incomplete" | "warning" | "blocked";
  disabled?: boolean;
}

const image13ActivationItems: ActivationChecklistItem[] = [
  { id: "source", title: "Conectar fonte de dados", owner: "Sam Frank", actionLabel: "Revisar", state: "complete" },
  { id: "consent", title: "Revisar consentimento", owner: "Nikki Olaw", actionLabel: "Abrir", state: "incomplete" },
  { id: "owners", title: "Validar responsáveis", owner: "João Silva", actionLabel: "Validar", state: "warning" },
  { id: "publish", title: "Publicar perfis", owner: "Sara Alves", actionLabel: "Bloqueado", state: "blocked", disabled: true }
];

export interface ActivationChecklistPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onToggle"> {
  items?: ActivationChecklistItem[];
  onItemAction?: (item: ActivationChecklistItem) => void;
  onItemToggle?: (item: ActivationChecklistItem, checked: boolean) => void;
  onItemMenu?: (item: ActivationChecklistItem) => void;
}

export function ActivationChecklistPanel({
  items = image13ActivationItems,
  onItemAction,
  onItemToggle,
  onItemMenu,
  className,
  ...props
}: ActivationChecklistPanelProps) {
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-activation-checklist", className)} data-component="ActivationChecklistPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>2</span><h3>Checklist de ativação</h3></header>
      <div aria-hidden="true" className="tcrm-activation-checklist__columns"><span>Item</span><span>Responsável</span><span>Ação rápida</span><span /></div>
      <div className="tcrm-activation-checklist__rows" role="list">
        {items.map((item) => (
          <ChecklistItem
            actionDisabled={item.disabled}
            actionLabel={item.actionLabel}
            disabled={item.disabled}
            key={item.id}
            menu={<IconButton icon="more" label={`Abrir opções de ${String(item.title)}`} onClick={() => onItemMenu?.(item)} size="sm" variant="ghost" />}
            onAction={() => onItemAction?.(item)}
            onToggle={(checked) => onItemToggle?.(item, checked)}
            owner={item.owner}
            ownerAvatarSrc={item.ownerAvatarSrc}
            state={item.state}
            title={item.title}
          />
        ))}
      </div>
    </Panel>
  );
}

export interface DataConflictRow {
  id: string;
  severity: "high" | "medium" | "low";
  object: React.ReactNode;
  description: React.ReactNode;
  suggestion: React.ReactNode;
  owner: React.ReactNode;
  ownerAvatarSrc?: string;
}

const image13ConflictRows: DataConflictRow[] = [
  { id: "cpf", severity: "high", object: "Aluno", description: "CPF duplicado em 2 registros", suggestion: "Revisar e mesclar", owner: "Sam Frank" },
  { id: "phone", severity: "medium", object: "Contato", description: "Telefone em formato inválido", suggestion: "Corrigir formato", owner: "Nikki Olaw" },
  { id: "email", severity: "medium", object: "Responsável", description: "E-mail já associado a outro", suggestion: "Confirmar vínculo", owner: "João Silva" },
  { id: "birth", severity: "low", object: "Aluno", description: "Data de nascimento ausente", suggestion: "Complementar", owner: "Sara Alves" }
];

export interface DataConflictQueueProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  rows?: DataConflictRow[];
  onRowSelect?: (row: DataConflictRow) => void;
  onViewAll?: () => void;
}

export function DataConflictQueue({ rows = image13ConflictRows, onRowSelect, onViewAll, className, ...props }: DataConflictQueueProps) {
  const severityLabels = { high: "Alta", medium: "Média", low: "Baixa" } as const;
  const severityTones = { high: "danger", medium: "warning", low: "info" } as const;
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-data-conflict-queue", className)} data-component="DataConflictQueue" {...props}>
      <header className="tcrm-reference-panel__header"><span>6</span><h3>Fila de conflitos de dados</h3></header>
      <DataTable
        compact
        columns={[
          { key: "severity", header: "Severidade", width: "15%", render: (row) => <Chip showDot={false} tone={severityTones[row.severity]}>{severityLabels[row.severity]}</Chip> },
          { key: "object", header: "Objeto", width: "15%" },
          { key: "description", header: "Descrição do conflito", width: "30%" },
          { key: "suggestion", header: "Ação sugerida", width: "23%" },
          { key: "owner", header: "Responsável", width: "17%", render: (row) => <span className="tcrm-data-conflict-queue__owner"><Avatar name={String(row.owner)} size="xs" src={row.ownerAvatarSrc} />{row.owner}</span> }
        ]}
        onRowClick={onRowSelect}
        rows={rows}
      />
      <Button className="tcrm-reference-panel__link" onClick={onViewAll} size="sm" variant="ghost">Ver todos os conflitos</Button>
    </Panel>
  );
}

const image13ProfileTabs: TabItem[] = [
  { value: "summary", label: "Resumo", content: null },
  { value: "agenda", label: "Agenda", content: null },
  { value: "finance", label: "Financeiro", content: null },
  { value: "history", label: "Histórico", content: null },
  { value: "documents", label: <span className="tcrm-profile-tabs-panel__count">Documentos <Badge tone="info">3</Badge></span>, content: null },
  { value: "permissions", label: "Permissões", content: null }
];

export interface ProfileTabsPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  items?: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function ProfileTabsPanel({ items = image13ProfileTabs, value, defaultValue = "summary", onValueChange, className, ...props }: ProfileTabsPanelProps) {
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-profile-tabs-panel", className)} data-component="ProfileTabsPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>8</span><h3>Abas internas de perfil</h3></header>
      <ProfileTabs defaultValue={defaultValue} density="compact" items={items} onValueChange={onValueChange} value={value} />
    </Panel>
  );
}

export interface ConsentHistoryRow {
  id: string;
  date: React.ReactNode;
  consent: React.ReactNode;
  origin: React.ReactNode;
  actor: React.ReactNode;
}

const image13ConsentHistory: ConsentHistoryRow[] = [
  { id: "whatsapp", date: "28/04/2024 14:32", consent: "WhatsApp permitido", origin: "Web", actor: "Sam Frank" },
  { id: "marketing", date: "10/03/2024 09:11", consent: "Opt-out marketing", origin: "App", actor: "Nikki Olaw" },
  { id: "email", date: "05/12/2023 16:45", consent: "E-mail permitido", origin: "Web", actor: "João Silva" }
];

export interface ConsentPreferencesPanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  whatsappAllowed?: boolean;
  marketingAllowed?: boolean;
  preferredChannel?: string;
  preferredTime?: string;
  history?: ConsentHistoryRow[];
  onPreferenceChange?: (field: string, value: string | boolean) => void;
  onViewHistory?: () => void;
}

export function ConsentPreferencesPanel({
  whatsappAllowed = true,
  marketingAllowed = false,
  preferredChannel = "whatsapp",
  preferredTime = "morning",
  history = image13ConsentHistory,
  onPreferenceChange,
  onViewHistory,
  className,
  ...props
}: ConsentPreferencesPanelProps) {
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-consent-preferences", className)} data-component="ConsentPreferencesPanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>10</span><h3>Consentimento e preferências</h3></header>
      <div className="tcrm-consent-preferences__controls">
        <label><span>WhatsApp permitido</span><Toggle aria-label="WhatsApp permitido" compact onPressedChange={(value) => onPreferenceChange?.("whatsappAllowed", value)} pressed={whatsappAllowed} /></label>
        <label><span>Opt-out de marketing</span><Toggle aria-label="Opt-out de marketing" compact onPressedChange={(value) => onPreferenceChange?.("marketingAllowed", value)} pressed={marketingAllowed} /></label>
        <label><span>Canal preferido</span><Select aria-label="Canal preferido" onValueChange={(value) => onPreferenceChange?.("preferredChannel", value)} options={[{ value: "whatsapp", label: "WhatsApp" }, { value: "email", label: "E-mail" }]} value={preferredChannel} /></label>
        <label><span>Preferência de horário</span><Select aria-label="Preferência de horário" onValueChange={(value) => onPreferenceChange?.("preferredTime", value)} options={[{ value: "morning", label: "Manhã (08h–12h)" }, { value: "afternoon", label: "Tarde (12h–18h)" }]} value={preferredTime} /></label>
      </div>
      <div className="tcrm-consent-preferences__history">
        <strong>Histórico de consentimento</strong>
        <DataTable compact columns={[{ key: "date", header: "Data", width: "30%" }, { key: "consent", header: "Consentimento", width: "30%" }, { key: "origin", header: "Origem", width: "15%" }, { key: "actor", header: "Responsável", width: "25%" }]} rows={history} />
      </div>
      <Button className="tcrm-reference-panel__link" onClick={onViewHistory} size="sm" variant="ghost">Ver histórico completo</Button>
    </Panel>
  );
}

export interface SensitiveTimelineEvent {
  id: string;
  group: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  actor?: React.ReactNode;
  icon: IconName;
  tone: ComponentTone;
  actionLabel?: string;
  status?: React.ReactNode;
}

const image13SensitiveEvents: SensitiveTimelineEvent[] = [
  { id: "profile", group: "Hoje, 14:32", title: "Atualização de cadastro", description: "Endereço atualizado", actor: "Sam Frank", icon: "checkCircle", tone: "success" },
  { id: "document", group: "Hoje, 10:15", title: "Documento restrito", description: "Verificação de renda", icon: "lock", tone: "warning", actionLabel: "Pedir acesso" },
  { id: "email", group: "Ontem, 16:40", title: "E-mail mascarado", description: "joao.***@gmail.com", icon: "lock", tone: "neutral" },
  { id: "access", group: "25/04/2024 11:22", title: "Acesso solicitado", description: "Histórico de pagamentos", icon: "info", tone: "info", status: "Pendente" },
  { id: "note", group: "20/04/2024 09:08", title: "Nota interna", description: "Aluno participativo nas aulas", actor: "Nikki Olaw", icon: "clipboard", tone: "success" }
];

export interface SensitiveTimelinePanelProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  events?: SensitiveTimelineEvent[];
  onEventAction?: (event: SensitiveTimelineEvent) => void;
}

export function SensitiveTimelinePanel({ events = image13SensitiveEvents, onEventAction, className, ...props }: SensitiveTimelinePanelProps) {
  return (
    <Panel compact className={cn("tcrm-reference-panel", "tcrm-sensitive-timeline", className)} data-component="SensitiveTimelinePanel" {...props}>
      <header className="tcrm-reference-panel__header"><span>11</span><h3>Timeline sensível</h3></header>
      <Timeline
        compact
        items={events.map((event) => ({
          id: event.id,
          title: event.title,
          time: event.group,
          description: event.description,
          actor: event.actor,
          icon: event.icon,
          tone: event.tone,
          action: event.actionLabel ? <Button onClick={() => onEventAction?.(event)} size="sm" variant="secondary">{event.actionLabel}</Button> : event.status ? <Chip showDot={false}>{event.status}</Chip> : undefined
        }))}
        variant="sensitive"
      />
    </Panel>
  );
}

export interface ClassSummaryCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  status?: React.ReactNode;
  students?: React.ReactNode;
  capacity?: React.ReactNode;
  openings?: React.ReactNode;
  waitlist?: React.ReactNode;
  nextClass?: React.ReactNode;
  teacher?: React.ReactNode;
  onViewDetails?: () => void;
}

export function ClassSummaryCard({
  title = "Reformer Iniciante - R01",
  status = "Ativa",
  students = 8,
  capacity = 8,
  openings = 0,
  waitlist = 3,
  nextClass = "Quarta, 22/05 · 09:00 - 10:00 · Sala 2",
  teacher = "Maria Clara",
  onViewDetails,
  className,
  ...props
}: ClassSummaryCardProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-class-summary-card", className)} data-component="ClassSummaryCard" {...props}>
      <header>
        <span className="tcrm-class-summary-card__icon"><Icon name="book" /></span>
        <strong>{title}</strong>
        <Chip showDot={false} tone="success">{status}</Chip>
      </header>
      <dl className="tcrm-class-summary-card__metrics">
        <div><dt>Alunos</dt><dd>{students}</dd></div>
        <div><dt>Capacidade</dt><dd>{capacity}</dd></div>
        <div><dt>Vagas</dt><dd>{openings}</dd></div>
        <div><dt>Lista de espera</dt><dd className="tcrm-image14-danger">{waitlist}</dd></div>
      </dl>
      <dl className="tcrm-class-summary-card__details">
        <div><dt>Proxima aula</dt><dd>{nextClass}</dd></div>
        <div><dt>Professor</dt><dd>{teacher}</dd></div>
      </dl>
      <Button className="tcrm-image14-panel__link" onClick={onViewDetails} size="sm" trailingIcon="arrowRight" variant="ghost">Ver detalhes</Button>
    </Panel>
  );
}

export interface ReplacementMatcherCandidate {
  id: string;
  name: React.ReactNode;
  initials?: string;
  avatarSrc?: string;
  priority: React.ReactNode;
  schedule: React.ReactNode;
  actionLabel: React.ReactNode;
}

const image14MatcherCandidates: ReplacementMatcherCandidate[] = [
  { id: "ana", name: "Ana Beatriz", initials: "AB", priority: "Alta", schedule: "Qua 29/05 · 09:00", actionLabel: "Convidar" },
  { id: "bruno", name: "Bruno Lima", initials: "BL", priority: "Media", schedule: "Qua 29/05 · 11:00", actionLabel: "Reservar" },
  { id: "carla", name: "Carla Mendes", initials: "CM", priority: "Baixa", schedule: "Qui 30/05 · 10:00", actionLabel: "Convidar" }
];

export interface ReplacementMatcherPanelProps extends React.HTMLAttributes<HTMLElement> {
  candidates?: ReplacementMatcherCandidate[];
  onCandidateAction?: (candidate: ReplacementMatcherCandidate) => void;
  onViewAlternatives?: () => void;
}

export function ReplacementMatcherPanel({ candidates = image14MatcherCandidates, onCandidateAction, onViewAlternatives, className, ...props }: ReplacementMatcherPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-replacement-matcher", className)} data-component="ReplacementMatcherPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>5</span><h3>Matcher de reposicao</h3></header>
      <dl className="tcrm-replacement-matcher__summary">
        <div><dt>Credito disponivel</dt><dd>1 aula</dd><small>Vence em 15/06/2024</small></div>
        <div><dt>Vagas compativeis</dt><dd>3 vagas</dd><small>Prox. 7 dias</small></div>
        <div><dt>Melhor encaixe</dt><dd>Qua, 29/05 · 09:00</dd><small>Reformer · Sala 2</small></div>
      </dl>
      <div className="tcrm-replacement-matcher__table" role="table" aria-label="Candidatos para reposicao">
        <div role="row"><span role="columnheader">Candidato (3)</span><span role="columnheader">Prioridade</span><span role="columnheader">Horario</span><span role="columnheader">Status</span></div>
        {candidates.map((candidate) => (
          <div key={candidate.id} role="row">
            <span role="cell"><Avatar name={candidate.initials ?? String(candidate.name)} size="xs" src={candidate.avatarSrc} /> {candidate.name}</span>
            <span role="cell">{candidate.priority}</span>
            <span role="cell">{candidate.schedule}</span>
            <Button onClick={() => onCandidateAction?.(candidate)} size="sm" variant="ghost">{candidate.actionLabel}</Button>
          </div>
        ))}
      </div>
      <footer><InlineAlert tone="danger">Conflito: Sala 2 indisponivel em 28/05 as 09:00.</InlineAlert><Button onClick={onViewAlternatives} size="sm" variant="secondary">Ver alternativas</Button></footer>
    </Panel>
  );
}

export interface WaitlistRow {
  id: string;
  name: React.ReactNode;
  priority: React.ReactNode;
  availability: React.ReactNode;
  origin: React.ReactNode;
  status: React.ReactNode;
  tone?: ComponentTone;
}

const image14WaitlistRows: WaitlistRow[] = [
  { id: "juliana", name: "Juliana Costa", priority: "Alta", availability: "Ter/Qui 09-11h", origin: "Website", status: "Aguardando", tone: "warning" },
  { id: "rafaela", name: "Rafaela Dias", priority: "Media", availability: "Qua/Sex 08-10h", origin: "Indicacao", status: "Convidado", tone: "info" },
  { id: "lucas", name: "Lucas Martins", priority: "Media", availability: "Seg/Qua 18-20h", origin: "Instagram", status: "Enviado", tone: "success" },
  { id: "patricia", name: "Patricia Nunes", priority: "Baixa", availability: "Sab 08-12h", origin: "Anterior", status: "Nao recebeu", tone: "neutral" },
  { id: "camila", name: "Camila Rocha", priority: "Baixa", availability: "Ter/Sex 17-19h", origin: "Website", status: "Aguardando", tone: "warning" }
];

export interface WaitlistPanelProps extends React.HTMLAttributes<HTMLElement> {
  rows?: WaitlistRow[];
  onRowSelect?: (row: WaitlistRow) => void;
}

export function WaitlistPanel({ rows = image14WaitlistRows, onRowSelect, className, ...props }: WaitlistPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-waitlist-panel", className)} data-component="WaitlistPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>6</span><h3>Lista de espera</h3></header>
      <div className="tcrm-waitlist-panel__table" role="table" aria-label="Lista de espera">
        <div role="row"><span role="columnheader">Interessado</span><span role="columnheader">Prioridade</span><span role="columnheader">Disponibilidade</span><span role="columnheader">Origem</span><span role="columnheader">Status convite</span></div>
        {rows.map((row) => (
          <button key={row.id} onClick={() => onRowSelect?.(row)} role="row" type="button">
            <span role="cell">{row.name}</span><span role="cell"><Chip showDot={false} tone={row.priority === "Alta" ? "warning" : row.priority === "Media" ? "info" : "success"}>{row.priority}</Chip></span><span role="cell">{row.availability}</span><span role="cell">{row.origin}</span><span role="cell"><Chip showDot={false} tone={row.tone}>{row.status}</Chip></span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

export interface ResourceConflictPanelProps extends React.HTMLAttributes<HTMLElement> {
  onApply?: () => void;
  onView?: () => void;
}

export function ResourceConflictPanel({ onApply, onView, className, ...props }: ResourceConflictPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-resource-conflict-panel", className)} data-component="ResourceConflictPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>7</span><h3>Conflito de recurso</h3></header>
      <ConflictCard
        compact
        description="Terca, 21/05 · 13:00 - 14:00"
        facts={[{ label: "Aulas afetadas", value: "2 aulas" }, { label: "Impacto", value: "12 alunos" }, { label: "Recurso", value: "Sala 2" }]}
        onApply={() => onApply?.()}
        onView={() => onView?.()}
        state="danger"
        suggestion="Mover para Sala 3"
        title="Sala ou professor indisponivel"
      />
    </Panel>
  );
}

export interface DocumentViewerPanelProps extends React.HTMLAttributes<HTMLElement> {
  selectedPageId?: string;
  onPageSelect?: (pageId: string) => void;
  onDownload?: () => void;
  onSend?: () => void;
}

export function DocumentViewerPanel({ selectedPageId = "1", onPageSelect, onDownload, onSend, className, ...props }: DocumentViewerPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-document-viewer-panel", className)} data-component="DocumentViewerPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>8</span><h3>Viewer de documento/contrato</h3></header>
      <DocumentPreview
        client="Cliente: Ana Beatriz Souza"
        compact
        date="Data: 15/04/2024"
        history={[{ id: "h1", label: "Assinado por Ana Beatriz", time: "16/04/2024 10:32" }, { id: "h2", label: "Enviado para assinatura", time: "15/04/2024 09:15" }]}
        onDownload={() => onDownload?.()}
        onPageSelect={onPageSelect}
        onSend={() => onSend?.()}
        pages={[{ id: "1", label: "1" }, { id: "2", label: "2" }]}
        selectedPageId={selectedPageId}
        state="signed"
        title="Contrato de Prestacao de Servicos"
      />
    </Panel>
  );
}

export type UploadReceiptState = "attached" | "pending" | "approved" | "error";

export interface UploadReceiptItem {
  id: string;
  title: React.ReactNode;
  meta: React.ReactNode;
  state: UploadReceiptState;
  detail?: React.ReactNode;
}

const image14UploadReceipts: UploadReceiptItem[] = [
  { id: "attached", title: "recibo_abril_2024.pdf", meta: "245 KB · PDF", state: "attached" },
  { id: "pending", title: "comprovante_(1).jpg", meta: "1.2 MB · JPG", state: "pending", detail: "Enviado em 20/05 14:32" },
  { id: "approved", title: "recibo_maio_2024.pdf", meta: "231 KB · PDF", state: "approved", detail: "Aprovado em 21/05 09:10" },
  { id: "error", title: "comprovante_(1).jpg", meta: "1.2 MB · JPG", state: "error", detail: "Falha na conexao" }
];

export interface UploadReceiptPanelProps extends React.HTMLAttributes<HTMLElement> {
  items?: UploadReceiptItem[];
  onUpload?: () => void;
  onItemAction?: (item: UploadReceiptItem) => void;
}

export function UploadReceiptPanel({ items = image14UploadReceipts, onUpload, onItemAction, className, ...props }: UploadReceiptPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-upload-receipt-panel", className)} data-component="UploadReceiptPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>9</span><h3>Upload / anexo / comprovante</h3></header>
      <div className="tcrm-upload-receipt-panel__content">
        <FileUpload actionLabel="Selecionar" className="tcrm-upload-receipt-panel__dropzone" description="PDF, JPG, PNG ate 10MB" onClick={onUpload} title="Arraste o arquivo aqui ou clique para selecionar" />
        {items.map((item) => (
          <article className={cn("tcrm-upload-receipt-panel__item", `tcrm-upload-receipt-panel__item--${item.state}`)} key={item.id}>
            <small>{item.state === "attached" ? "Arquivo anexado" : item.state === "pending" ? "Comprovante pendente" : item.state === "approved" ? "Comprovante aprovado" : "Erro de upload"}</small>
            <div><Icon name={item.state === "error" ? "alertCircle" : "fileText"} /><span><strong>{item.title}</strong><small>{item.meta}</small></span><IconButton icon="moreVertical" label={`Opcoes de ${String(item.title)}`} onClick={() => onItemAction?.(item)} size="sm" variant="ghost" /></div>
            {item.detail ? <footer>{item.detail}</footer> : null}
            {item.state !== "attached" ? <Chip showDot={false} tone={item.state === "approved" ? "success" : item.state === "pending" ? "warning" : "danger"}>{item.state === "approved" ? "Aprovado" : item.state === "pending" ? "Pendente" : "Tentar novamente"}</Chip> : <Icon name="checkCircle" />}
          </article>
        ))}
      </div>
    </Panel>
  );
}

export interface ReconciliationSummaryRow {
  id: string;
  description: React.ReactNode;
  dueDate: React.ReactNode;
  expected: React.ReactNode;
  received: React.ReactNode;
  difference: React.ReactNode;
  status: React.ReactNode;
  tone?: ComponentTone;
}

const image14ReconciliationRows: ReconciliationSummaryRow[] = [
  { id: "mp", description: "Mensalidade · Maio/2024 · MP", dueDate: "10/05/2024", expected: "R$ 320,00", received: "R$ 320,00", difference: "R$ 0,00", status: "Conciliado", tone: "success" },
  { id: "ref", description: "Mensalidade · Maio/2024 · REF", dueDate: "10/05/2024", expected: "R$ 420,00", received: "R$ 400,00", difference: "- R$ 20,00", status: "Pendente", tone: "warning" }
];

export interface ReconciliationSummaryTableProps extends React.HTMLAttributes<HTMLElement> {
  rows?: ReconciliationSummaryRow[];
  onReconcile?: (row: ReconciliationSummaryRow) => void;
}

export function ReconciliationSummaryTable({ rows = image14ReconciliationRows, onReconcile, className, ...props }: ReconciliationSummaryTableProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-reconciliation-summary", className)} data-component="ReconciliationSummaryTable" {...props}>
      <header className="tcrm-image14-panel__header"><span>10</span><h3>Linha de conciliacao</h3></header>
      <div className="tcrm-reconciliation-summary__table" role="table" aria-label="Linha de conciliacao">
        <div role="row"><span role="columnheader">Descricao</span><span role="columnheader">Vencimento</span><span role="columnheader">Pagamento esperado</span><span role="columnheader">Pagamento recebido</span><span role="columnheader">Diferenca</span><span role="columnheader">Status</span><span role="columnheader">Acao</span></div>
        {rows.map((row) => <div key={row.id} role="row"><strong role="cell">{row.description}</strong><span role="cell">{row.dueDate}</span><span role="cell">{row.expected}</span><span role="cell">{row.received}</span><span className={row.id === "ref" ? "tcrm-image14-danger" : undefined} role="cell">{row.difference}</span><span role="cell"><Chip showDot={false} tone={row.tone}>{row.status}</Chip></span><span role="cell"><IconButton icon={row.id === "ref" ? "check" : "link"} label={`Conciliar ${String(row.description)}`} onClick={() => onReconcile?.(row)} size="sm" variant={row.id === "ref" ? "selected" : "ghost"} /></span></div>)}
      </div>
    </Panel>
  );
}

export interface MoneyInputGroupProps extends React.HTMLAttributes<HTMLElement> {
  values?: { value: string; discount: string; fine: string; installment: string; invalid: string };
  onInstallmentChange?: (value: string) => void;
}

export function MoneyInputGroup({ values = { value: "320,00", discount: "32,00", fine: "9,60", installment: "3", invalid: "0,00" }, onInstallmentChange, className, ...props }: MoneyInputGroupProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-money-input-group", className)} data-component="MoneyInputGroup" {...props}>
      <header className="tcrm-image14-panel__header"><span>11</span><h3>Input de valor / moeda</h3></header>
      <div className="tcrm-money-input-group__fields">
        <label><span>Valor</span><MoneyInput aria-label="Valor" defaultValue={values.value} fieldSize="sm" fieldState="success" /></label>
        <label><span>Desconto</span><MoneyInput aria-label="Desconto" defaultValue={values.discount} fieldSize="sm" fieldState="success" /></label>
        <label><span>Multa</span><MoneyInput aria-label="Multa" defaultValue={values.fine} fieldSize="sm" fieldState="success" /></label>
        <label><span>Parcela</span><Select aria-label="Parcela" fieldSize="sm" onValueChange={onInstallmentChange} options={[{ value: "1", label: "1 / 12" }, { value: "2", label: "2 / 12" }, { value: "3", label: "3 / 12" }]} value={values.installment} /></label>
        <label><span className="tcrm-image14-danger">Valor (erro)</span><MoneyInput aria-label="Valor com erro" defaultValue={values.invalid} error="Valor deve ser maior que zero." fieldSize="sm" /></label>
      </div>
    </Panel>
  );
}

export interface FinancialSimulationPanelProps extends React.HTMLAttributes<HTMLElement> {
  onApprove?: () => void;
  onReject?: () => void;
}

export function FinancialSimulationPanel({ onApprove, onReject, className, ...props }: FinancialSimulationPanelProps) {
  return (
    <Panel compact className={cn("tcrm-image14-panel", "tcrm-financial-simulation", className)} data-component="FinancialSimulationPanel" {...props}>
      <header className="tcrm-image14-panel__header"><span>12</span><h3>Simulador financeiro antes/depois</h3></header>
      <div className="tcrm-financial-simulation__body">
        <dl><strong>Situacao atual</strong><div><dt>Plano atual</dt><dd>Plano Mensal · Reformer</dd></div><div><dt>Valor mensal</dt><dd>R$ 420,00</dd></div><div><dt>Vencimento</dt><dd>10 de cada mes</dd></div><div><dt>Prox. cobranca</dt><dd>10/06/2024</dd></div></dl>
        <dl><strong>Alteracao proposta</strong><div><dt>Novo plano</dt><dd>Plano Semestral · Reformer</dd></div><div><dt>Novo mensal</dt><dd>R$ 360,00</dd></div><div><dt>Vencimento</dt><dd>10 de cada mes</dd></div><div><dt>Inicio da mudanca</dt><dd>10/06/2024</dd></div></dl>
        <dl className="tcrm-financial-simulation__impact"><strong>Impacto da mudanca</strong><div><dt>Economia mensal</dt><dd>- R$ 60,00</dd></div><div><dt>Economia total (6 meses)</dt><dd>- R$ 360,00</dd></div><div><dt>Saldo creditos</dt><dd>R$ 20,00</dd></div><div><dt>Valor total no periodo</dt><dd>R$ 2.160,00</dd></div></dl>
        <aside><strong>Risco / atencao</strong><p>Contrato atual nao preve cancelamento antecipado.</p><p>Ha 1 parcela em aberto.</p></aside>
      </div>
      <footer><Button onClick={onReject} size="sm" variant="secondary">Rejeitar</Button><Button onClick={onApprove} size="sm" variant="primary">Aprovar</Button></footer>
    </Panel>
  );
}

function Reference15Header({ number, title }: { number: number; title: React.ReactNode }) {
  return <header className="tcrm-reference15-header"><span>{number}</span><h3>{title}</h3></header>;
}

export interface FlowSimulationPanelProps extends React.HTMLAttributes<HTMLElement> {
  onApprove?: () => void;
}

export function FlowSimulationPanel({ onApprove, className, ...props }: FlowSimulationPanelProps) {
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-flow-simulation-panel", className)} data-component="FlowSimulationPanel" {...props}>
    <Reference15Header number={3} title="Simulador de fluxo" />
    <label>Entrada de teste<Input aria-label="Entrada de teste" defaultValue={'Cliente envia: "Quero saber sobre precos."'} fieldSize="sm" /></label>
    <label>Resultado esperado<Input aria-label="Resultado esperado" defaultValue="Enviar apresentacao de plano e agendar follow-up." fieldSize="sm" /></label>
    <dl><div><dt>Risco</dt><dd><StatusDot status="warning" /> Medio</dd></div><div><dt>Custo/cota estimada</dt><dd>0,024 creditos</dd></div><div><dt>Tempo estimado</dt><dd>8,2 s</dd></div></dl>
    <Button leadingIcon="send" onClick={onApprove} size="sm" variant="primary">Aprovar publicacao</Button>
  </Panel>;
}

export interface PublicationPreflightPanelProps extends React.HTMLAttributes<HTMLElement> {
  onPublish?: () => void;
  onSaveDraft?: () => void;
}

export function PublicationPreflightPanel({ onPublish, onSaveDraft, className, ...props }: PublicationPreflightPanelProps) {
  const rows = [
    ["Dados necessarios", "Concluido", "success"], ["Permissoes", "Concluido", "success"],
    ["Cota disponivel", "Atencao", "warning"], ["Politica", "Concluido", "success"], ["Status geral", "Pronto para revisao", "info"]
  ] as const;
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-publication-preflight", className)} data-component="PublicationPreflightPanel" {...props}>
    <Reference15Header number={4} title="Preflight antes de publicar" />
    <div className="tcrm-publication-preflight__rows">{rows.map(([label, status, tone]) => <div key={label}><Icon name={tone === "warning" ? "alert" : "checkCircle"} size="sm" tone={tone} /><span>{label}</span><Icon name={tone === "warning" ? "alert" : "check"} size="sm" tone={tone} /><Chip tone={tone}>{status}</Chip></div>)}</div>
    <footer><Button leadingIcon="send" onClick={onPublish} size="sm" variant="primary">Publicar</Button><Button onClick={onSaveDraft} size="sm" variant="secondary">Salvar rascunho</Button></footer>
  </Panel>;
}

export interface ExecutionTraceTableProps extends React.HTMLAttributes<HTMLElement> {
  onViewAll?: () => void;
}

export function ExecutionTraceTable({ onViewAll, className, ...props }: ExecutionTraceTableProps) {
  const rows = [
    ["1", "Receber mensagem", "WhatsApp Webhook", "Sucesso", "0,45 s", "0,001", "-"],
    ["2", "Verificar elegibilidade", "Regra de negocio", "Sucesso", "0,32 s", "0,002", "-"],
    ["3", "Buscar dados do cliente", "Taliya CRM API", "Sucesso", "0,78 s", "0,006", "-"],
    ["4", "Gerar resposta (LLM)", "Assistente de texto", "Em andamento", "2,31 s", "0,013", "-"],
    ["5", "Enviar mensagem", "WhatsApp API", "Falhou", "0,21 s", "0,002", "Timeout"],
    ["6", "Registrar interacao", "Taliya CRM API", "Pendente", "-", "-", "-"]
  ];
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-execution-trace", className)} data-component="ExecutionTraceTable" {...props}>
    <Reference15Header number={5} title="Trace de execucao" />
    <div className="tcrm-execution-trace__table" role="table"><div role="row"><span>Etapa executada</span><span>Ferramenta usada</span><span>Status</span><span>Duracao</span><span>Custo</span><span>Erro</span></div>{rows.map((row) => <div key={row[0]} role="row"><span><b>{row[0]}</b> {row[1]}</span><span>{row[2]}</span><span><Chip tone={row[3] === "Falhou" ? "danger" : row[3] === "Em andamento" ? "info" : row[3] === "Pendente" ? "neutral" : "success"}>{row[3]}</Chip></span><span>{row[4]}</span><span>{row[5]}</span><span className={row[6] !== "-" ? "tcrm-reference15-danger" : undefined}>{row[6]}</span></div>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver trace completo</Button>
  </Panel>;
}

export interface AgentIncidentPanelProps extends React.HTMLAttributes<HTMLElement> {
  onReprocess?: () => void;
  onCreateTask?: () => void;
  onViewDetails?: () => void;
}

export function AgentIncidentPanel({ onReprocess, onCreateTask, onViewDetails, className, ...props }: AgentIncidentPanelProps) {
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-agent-incident", className)} data-component="AgentIncidentPanel" {...props}>
    <Reference15Header number={6} title="Incidente de agente" />
    <dl><div><dt>Causa</dt><dd><Chip tone="danger">Falha de execucao</Chip></dd></div><div><dt>Impacto</dt><dd>Cliente nao recebeu resposta.</dd></div><div><dt>Objeto afetado</dt><dd>#CS-1043 · Joao Silva</dd></div><div><dt>Fallback manual</dt><dd className="tcrm-reference15-success"><Icon name="check" size="sm" /> Tarefa criada automaticamente</dd></div></dl>
    <footer><Button leadingIcon="refresh" onClick={onReprocess} size="sm" variant="primary">Reprocessar com seguranca</Button><Button leadingIcon="clipboard" onClick={onCreateTask} size="sm" variant="secondary">Criar tarefa</Button></footer>
    <Button className="tcrm-reference15-link" onClick={onViewDetails} size="sm" trailingIcon="arrowRight" variant="ghost">Ver mais detalhes</Button>
  </Panel>;
}

export interface EvaluationQualityPanelProps extends React.HTMLAttributes<HTMLElement> {
  onViewReport?: () => void;
}

export function EvaluationQualityPanel({ onViewReport, className, ...props }: EvaluationQualityPanelProps) {
  const metrics = [["Taxa de sucesso", "94,2%", "↑ 3,1 pp", "success"], ["Falhas", "5,8%", "↓ 1,2 pp", "danger"], ["Revisao humana", "18,6%", "↓ 2,4 pp", "info"], ["Confianca media", "82%", "↑ 4 pp", "success"], ["Casos problematicos", "128", "↑ 18 hoje", "warning"], ["SLA atendido", "98,7%", "↑ 1,5 pp", "success"]] as const;
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-evaluation-quality", className)} data-component="EvaluationQualityPanel" {...props}>
    <Reference15Header number={7} title="Painel de qualidade / evals" />
    <div>{metrics.map(([label, value, delta, tone]) => <section key={label}><span>{label}</span><strong>{value}</strong><small className={`tcrm-reference15-${tone}`}>{delta}</small></section>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewReport} size="sm" trailingIcon="arrowRight" variant="ghost">Ver relatorio completo</Button>
  </Panel>;
}

export interface PrivacyRequestTableProps extends React.HTMLAttributes<HTMLElement> {
  onOpenRequest?: (requestId: string) => void;
  onViewAll?: () => void;
}

export function PrivacyRequestTable({ onOpenRequest, onViewAll, className, ...props }: PrivacyRequestTableProps) {
  const rows = [["REQ-1287", "Joao Silva", "Concluida", "success"], ["REQ-1286", "Ana Costa", "Em andamento", "info"], ["REQ-1285", "Mariana A.", "Aguardando dados", "warning"], ["REQ-1284", "Pedro L.", "Negada", "danger"]] as const;
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-privacy-request", className)} data-component="PrivacyRequestTable" {...props}>
    <Reference15Header number={10} title="Privacidade / LGPD" />
    <div className="tcrm-privacy-request__table" role="table"><div role="row"><span>Solicitacao</span><span>Validar identidade</span><span>Exportar</span><span>Anonimizar</span><span>Negar</span><span>Status</span></div>{rows.map(([id, person, status, tone]) => <div key={id} role="row" onClick={() => onOpenRequest?.(id)}><span>{id}<small>{person}</small></span><Icon name="check" size="sm" tone="success" /><Icon name="download" size="sm" /><Icon name="lock" size="sm" /><Icon name="x" size="sm" /><Chip tone={tone}>{status}</Chip></div>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as solicitacoes</Button>
  </Panel>;
}

export interface SupportGrantPanelProps extends React.HTMLAttributes<HTMLElement> {
  onTemporaryAccessChange?: (enabled: boolean) => void;
  onRevoke?: () => void;
}

export function SupportGrantPanel({ onTemporaryAccessChange, onRevoke, className, ...props }: SupportGrantPanelProps) {
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-support-grant", className)} data-component="SupportGrantPanel" {...props}>
    <Reference15Header number={11} title="Grant de suporte" />
    <div className="tcrm-support-grant__field"><span>Acesso temporario</span><Toggle aria-label="Acesso temporario" compact defaultPressed onPressedChange={onTemporaryAccessChange} /></div>
    <div className="tcrm-support-grant__field"><span>Expiracao</span><Input aria-label="Expiracao" defaultValue="30/04/2024 18:00" fieldSize="sm" trailingIcon="calendar" /></div>
    <div className="tcrm-support-grant__field"><span>Escopo</span><Select aria-label="Escopo" defaultValue="contas" fieldSize="sm" options={[{ value: "contas", label: "Contas e Casos" }]} /></div>
    <div className="tcrm-support-grant__field"><span>Motivo</span><Input aria-label="Motivo" defaultValue="Suporte a incidente" fieldSize="sm" /></div>
    <Button leadingIcon="trash" onClick={onRevoke} size="sm" variant="destructive">Revogar acesso</Button>
  </Panel>;
}

export interface AdvancedReportsPanelProps extends React.HTMLAttributes<HTMLElement> {
  onViewAll?: () => void;
}

export function AdvancedReportsPanel({ onViewAll, className, ...props }: AdvancedReportsPanelProps) {
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-advanced-reports", className)} data-component="AdvancedReportsPanel" {...props}>
    <Reference15Header number={12} title="Relatorios avancados" />
    <div className="tcrm-advanced-reports__charts">
      <section><strong>Grafico de linha</strong><small>Conversas · Conversoes</small><svg aria-hidden="true" className="tcrm-reference15-line-chart" viewBox="0 0 120 56"><polyline points="0,42 18,33 36,37 54,19 72,29 90,14 108,21 120,8" /><polyline points="0,50 18,44 36,48 54,38 72,42 90,29 108,35 120,24" /></svg></section>
      <section><strong>Grafico de barras</strong><small>Novos clientes</small><div className="tcrm-reference15-bar-chart">{[5,8,6,11,7,13,9,12,6,4].map((height, index) => <i key={index} style={{ height: `${height * 4}px` }} />)}</div></section>
      <section><strong>Funil</strong><div className="tcrm-reference15-funnel"><i>Visitantes 24.890</i><i>Leads 6.152</i><i>Oportunidades 2.489</i><i>Clientes 1.102</i></div></section>
      <section><strong>Ranking de agentes</strong>{["Sam Frank 428", "Nikki Olaw 352", "Maria Lopes 301", "Joao Silva 287", "Carlos Lima 241"].map((row) => <span key={row}>{row}</span>)}</section>
      <section><strong>Heatmap de ocupacao</strong><small>Seg · Ter · Qua · Qui · Sex</small><div className="tcrm-reference15-heatmap">{Array.from({ length: 25 }, (_, index) => <i key={index} style={{ opacity: 0.2 + (index % 5) * 0.15 }} />)}</div></section>
    </div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver painel completo</Button>
  </Panel>;
}

export interface ExportQueuePanelProps extends React.HTMLAttributes<HTMLElement> {
  onAction?: (exportId: string) => void;
  onViewAll?: () => void;
}

export function ExportQueuePanel({ onAction, onViewAll, className, ...props }: ExportQueuePanelProps) {
  const rows = [["conversas", "Relatorio de conversas", "CSV", "Agendada", "-", "info"], ["clientes", "Base de clientes", "XLSX", "Exportando", "62%", "info"], ["financeiro", "Relatorio financeiro", "PDF", "Pronto", "100%", "success"], ["auditoria", "Logs de auditoria", "CSV", "Falhou", "-", "danger"]] as const;
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-export-queue", className)} data-component="ExportQueuePanel" {...props}>
    <Reference15Header number={13} title="Exportacoes" />
    <div className="tcrm-export-queue__table" role="table"><div role="row"><span>Exportacao</span><span>Formato</span><span>Agendada para</span><span>Status</span><span>Progresso</span><span>Acoes</span></div>{rows.map(([id, label, format, status, progress, tone], index) => <div key={id} role="row"><span>{label}</span><span>{format}</span><span>28/04/2024 {10 - index}:0{index}</span><Chip tone={tone}>{status}</Chip><span>{progress}</span><IconButton icon={status === "Pronto" ? "download" : status === "Falhou" ? "refresh" : "more"} label={`Acao de ${label}`} onClick={() => onAction?.(id)} size="sm" variant="ghost" /></div>)}</div>
    <Button className="tcrm-reference15-link" onClick={onViewAll} size="sm" trailingIcon="arrowRight" variant="ghost">Ver todas as exportacoes</Button>
  </Panel>;
}

export interface SegmentCommunicationPanelProps extends React.HTMLAttributes<HTMLElement> {
  onEdit?: () => void;
  onViewAudience?: () => void;
  onApprove?: () => void;
  onSchedule?: () => void;
}

export function SegmentCommunicationPanel({ onEdit, onViewAudience, onApprove, onSchedule, className, ...props }: SegmentCommunicationPanelProps) {
  return <Panel compact className={cn("tcrm-reference15-panel", "tcrm-segment-communication", className)} data-component="SegmentCommunicationPanel" {...props}>
    <Reference15Header number={14} title="Segmentos e comunicados" />
    <div className="tcrm-segment-communication__body"><section><span>Construtor do segmento</span><strong>Clientes inativos &gt; 60 dias</strong><Button onClick={onEdit} size="sm" variant="ghost">Editar</Button><span>Publico elegivel</span><strong>12.843 contatos</strong><Button onClick={onViewAudience} size="sm" variant="ghost">Ver lista</Button><span>Consentimento</span><strong className="tcrm-reference15-success">98,6% com consentimento</strong></section><section><span>Preview da mensagem</span><p>Ola {'{nome}'}, sentimos sua falta! Temos novidades que podem te interessar.</p><footer><span>Custo estimado<br /><strong>0,86 creditos</strong></span><span>Canais<br /><Icon name="whatsapp" size="sm" /> <Icon name="mail" size="sm" /> <Icon name="message" size="sm" /></span></footer></section></div>
    <footer><Button leadingIcon="send" onClick={onApprove} size="sm" variant="primary">Aprovar envio</Button><Button leadingIcon="calendar" onClick={onSchedule} size="sm" variant="secondary">Agendar</Button></footer>
  </Panel>;
}
