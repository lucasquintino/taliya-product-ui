import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import {
  CrmWorklistTable,
  InternalOverviewDashboard,
  InternalSecurityRulesPanel,
  InternalShell,
  InternalWorklistPage,
  PageFilterBar,
  PageQuickFilters,
  SupportTicketDrawer,
  TenantDetailLayout,
  TenantSummaryDrawer,
  internalShellNavItems,
} from "@taliya/crm";
import type { CrmShellNavItem, InternalOverviewDashboardState, PageFilterBarFilter, PageQuickFilterItem, TenantSummaryDrawerAction, TenantSummaryDrawerActivity, TenantSummaryDrawerFact, TenantSummaryDrawerGrantState, TenantSummaryDrawerState } from "@taliya/crm";
import { Avatar, Button, ButtonGroup, Chip, IconButton, InlineGroup, ProgressBar } from "@taliya/ui";
import type { ComponentTone } from "@taliya/ui";

import image79Avatar from "../assets/image79-avatar.png";

const meta = {
  title: "CRM / Image Coverage / Internal",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Familia oficial do backoffice interno da Taliya. As variants cobrem as imagens 48, 49 e 50 com shell, filtros, tabela, detalhe e drawer oficiais; remaining-pages deve apenas apontar para estas variants."
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

function internalNav(activeId: string): CrmShellNavItem[] {
  return internalShellNavItems.map((item) => ({ ...item, active: item.id === activeId }));
}

function InternalTenantFilters({ onAction }: { onAction?: (action: string) => void }) {
  const [query, setQuery] = useState("");
  const [values, setValues] = useState<Record<string, string | string[]>>({});
  const filters: PageFilterBarFilter[] = [
    { id: "status", label: "Status", value: String(values.status ?? ""), options: [{ value: "ativo", label: "Ativo" }, { value: "risco", label: "Em risco" }, { value: "cancelado", label: "Cancelado" }] },
    { id: "plan", label: "Plano", value: String(values.plan ?? ""), options: [{ value: "growth", label: "Growth" }, { value: "base", label: "Base" }, { value: "trial", label: "Trial" }] },
    { id: "risk", label: "Risco", value: String(values.risk ?? ""), options: [{ value: "quota", label: "Cota alta" }, { value: "billing", label: "Billing falhou" }, { value: "incident", label: "Incidente" }] },
    { id: "owner", label: "Responsavel", value: String(values.owner ?? ""), options: [{ value: "marina", label: "Marina" }, { value: "lucas", label: "Lucas" }, { value: "beatriz", label: "Beatriz" }] },
    { id: "billing", label: "Billing", value: String(values.billing ?? ""), options: [{ value: "ok", label: "Em dia" }, { value: "failed", label: "Falhou" }, { value: "trial", label: "Trial" }] },
    { id: "grant", label: "Grant", value: String(values.grant ?? ""), options: [{ value: "active", label: "Ativo" }, { value: "pending", label: "Pendente" }, { value: "none", label: "Nenhum" }] }
  ];

  return (
    <PageFilterBar
      actions={
        <ButtonGroup>
          <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={() => onAction?.("new-tenant")} size="sm" variant="primary">Novo tenant</Button>
          <IconButton icon="download" label="Exportar tenants" onClick={() => onAction?.("export-tenants")} size="sm" variant="default" />
        </ButtonGroup>
      }
      filters={filters}
      onFilterValueChange={(filter, value) => { setValues((current) => ({ ...current, [filter.id]: value })); onAction?.(`Filtro alterado: ${filter.label}`); }}
      onSearchChange={(value) => { setQuery(value); onAction?.(value ? `Busca de tenants: ${value}` : "Busca de tenants limpa"); }}
      onSearchFilter={() => onAction?.("Filtros avancados de tenants abertos")}
      query={query}
      searchFilterLabel="Abrir filtros de tenants"
      searchPlaceholder="Buscar studio, tenant, responsavel ou plano"
    />
  );
}

function InternalTenantQuickFilters({ onAction }: { onAction?: (action: string) => void }) {
  const [selectedId, setSelectedId] = useState("active");
  const items: PageQuickFilterItem[] = [
    { id: "active", label: "Ativos", icon: "user", count: "38", selected: selectedId === "active" },
    { id: "trial", label: "Trial", icon: "sparkles", count: "7", tone: "info", selected: selectedId === "trial" },
    { id: "risk", label: "Em risco", icon: "alert", count: "3", tone: "warning", selected: selectedId === "risk" },
    { id: "billing", label: "Billing falhou", icon: "coins", count: "2", tone: "danger", selected: selectedId === "billing" },
    { id: "grant", label: "Grant ativo", icon: "shieldCheck", count: "2", selected: selectedId === "grant" },
    { id: "incident", label: "Incidente aberto", icon: "bell", count: "4", tone: "danger", selected: selectedId === "incident" },
    { id: "quota", label: "Cota alta", icon: "barChart", count: "5", tone: "warning", selected: selectedId === "quota" },
    { id: "cancelled", label: "Cancelados", icon: "x", count: "6", selected: selectedId === "cancelled" }
  ];

  return <PageQuickFilters heading="Filtros rapidos" items={items} onSelect={(item) => { setSelectedId(item.id); onAction?.(`Filtro rapido selecionado: ${item.label}`); }} />;
}

type InternalTenantRow = { id: string; studio: string; initials: string; status: string; accountState: TenantSummaryDrawerState; statusTone: ComponentTone; plan: string; agents: string; quota: number; tickets: string; ticketsTone: ComponentTone; grantState: TenantSummaryDrawerGrantState; grantTone: ComponentTone; billing: string; billingTone: ComponentTone; owner: string; activity: string };

const internalTenantRows: InternalTenantRow[] = [
  { id: "studio-vila", studio: "Studio Vila Mariana", initials: "VM", status: "Ativo", accountState: "active", statusTone: "success", plan: "Growth", agents: "3/3", quota: 68, tickets: "1 aberto", ticketsTone: "info", grantState: "active", grantTone: "success", billing: "em dia", billingTone: "success", owner: "Marina", activity: "hoje 10:24" },
  { id: "reformer-sul", studio: "Studio Reformer Sul", initials: "RS", status: "Degradado", accountState: "degraded", statusTone: "warning", plan: "Base", agents: "0/0", quota: 12, tickets: "2 abertos", ticketsTone: "danger", grantState: "none", grantTone: "neutral", billing: "pagamento falhou", billingTone: "danger", owner: "Lucas", activity: "hoje 09:18" },
  { id: "ana-pilates", studio: "Studio Ana Pilates", initials: "AP", status: "Ativo", accountState: "active", statusTone: "success", plan: "Growth", agents: "2/3", quota: 90, tickets: "0", ticketsTone: "neutral", grantState: "none", grantTone: "neutral", billing: "em dia", billingTone: "success", owner: "Beatriz", activity: "ontem" },
  { id: "pilates-norte", studio: "Pilates Norte", initials: "PN", status: "Trial", accountState: "active", statusTone: "info", plan: "Trial", agents: "1/1", quota: 34, tickets: "1 aberto", ticketsTone: "info", grantState: "pending", grantTone: "warning", billing: "trial", billingTone: "info", owner: "Rafael", activity: "hoje 08:40" },
  { id: "equilibrio", studio: "Studio Equilibrio", initials: "SE", status: "Bloqueado", accountState: "tenant-blocked", statusTone: "danger", plan: "Pro", agents: "1/3", quota: 100, tickets: "3 abertos", ticketsTone: "danger", grantState: "none", grantTone: "neutral", billing: "inadimplente", billingTone: "danger", owner: "Marina", activity: "2 dias" },
  { id: "corpo-vivo", studio: "Corpo Vivo Pilates", initials: "CP", status: "Cancelado", accountState: "tenant-blocked", statusTone: "neutral", plan: "Base", agents: "0/0", quota: 0, tickets: "0", ticketsTone: "neutral", grantState: "revoked", grantTone: "neutral", billing: "encerrado", billingTone: "neutral", owner: "Sam", activity: "semana passada" }
];

function tenantGrantLabel(state: TenantSummaryDrawerGrantState) {
  if (state === "active") return "Ativo até hoje 18:00";
  if (state === "pending") return "Pendente";
  if (state === "revoked") return "Revogado";
  return "Nenhum";
}

function tenantGrantTableLabel(state: TenantSummaryDrawerGrantState) {
  if (state === "active") return "ativo";
  if (state === "pending") return "pendente";
  if (state === "revoked") return "revogado";
  return "nenhum";
}

function tenantBillingTableLabel(billing: string) {
  return billing === "pagamento falhou" ? "falhou" : billing;
}

function tenantSummaryModel(row: InternalTenantRow, grantState: TenantSummaryDrawerGrantState): { title: string; subtitle: string; state: TenantSummaryDrawerState; facts: TenantSummaryDrawerFact[]; activities: TenantSummaryDrawerActivity[] } {
  return {
    title: row.studio,
    subtitle: row.status === "Ativo" ? "Cliente ativo da Taliya" : `${row.status} na operação interna da Taliya`,
    state: row.accountState,
    facts: [
      { id: "status", label: "Status", value: <Chip tone={row.statusTone}>{row.status}</Chip>, icon: "calendar", tone: row.statusTone },
      { id: "plan", label: "Plano", value: row.plan, icon: "layout" },
      { id: "agents", label: "Agentes", value: `${row.agents.replace("/", " de ")} ativos`, icon: "users" },
      { id: "quota", label: "Cota", value: `${row.quota}% usada`, icon: "clock", tone: row.quota >= 90 ? "danger" : undefined },
      { id: "billing", label: "Billing", value: row.billing, icon: "creditCard", tone: row.billingTone },
      { id: "tickets", label: "Tickets", value: row.tickets, icon: "inbox", tone: row.ticketsTone },
      { id: "grant", label: "Grant", value: tenantGrantLabel(grantState), icon: "shield", tone: grantState === "active" ? "success" : grantState === "pending" ? "warning" : "neutral" },
      { id: "incidents", label: "Incidentes", value: row.status === "Bloqueado" ? "1 critico" : "0 criticos", icon: "alert", tone: row.status === "Bloqueado" ? "danger" : undefined },
      { id: "owner", label: <>Responsavel<br />interno</>, value: `${row.owner} - CS`, icon: "user" },
      { id: "activity", label: "Ultima atividade", value: row.activity, icon: "clock" }
    ],
    activities: [
      { id: "ticket", label: `${row.tickets} no suporte`, time: row.activity },
      { id: "billing", label: `Billing ${row.billing}`, time: "hoje 09:18" },
      { id: "quota", label: `Cota chegou a ${row.quota}%`, time: "ontem 18:20" },
      { id: "plan", label: `Plano ${row.plan} revisado`, time: "12/05" }
    ]
  };
}

function InternalTenantsTable({ onAction, onRowSelect, selectedRowId }: { onAction?: (action: string) => void; onRowSelect?: (id: string) => void; selectedRowId?: string }) {

  return (
    <CrmWorklistTable
      actionColumnWidth="44px"
      ariaLabel="Tabela de tenants internos"
      className="tcrm-internal-tenants-table"
      columns={[
        { key: "studio", header: "Studio", render: (row) => <InlineGroup compact><Avatar name={row.initials.split("").join(" ")} size="xs" />{row.studio}</InlineGroup>, sortable: true, width: "18%" },
        { key: "status", header: "Status", render: (row) => <Chip tone={row.statusTone}>{row.status}</Chip>, sortable: true, width: "9%" },
        { key: "plan", header: "Plano", width: "8%" },
        { key: "agents", header: "Agentes", width: "8%" },
        { key: "quota", header: "Cota", render: (row) => <span className="tcrm-internal-tenants-table__quota"><strong>{row.quota}%</strong><ProgressBar value={row.quota} tone={row.quota >= 90 ? "danger" : row.quota >= 60 ? "success" : "warning"} /></span>, sortable: true, width: "10%" },
        { key: "tickets", header: "Tickets", render: (row) => <Chip showDot={false} tone={row.ticketsTone}>{row.tickets}</Chip>, width: "9%" },
        { key: "grantState", header: "Grant", render: (row) => <Chip showDot={false} tone={row.grantTone}>{tenantGrantTableLabel(row.grantState)}</Chip>, width: "9%" },
        { key: "billing", header: "Billing", render: (row) => <Chip showDot={false} tone={row.billingTone}>{tenantBillingTableLabel(row.billing)}</Chip>, width: "10%" },
        { key: "owner", header: "Responsavel", width: "9%" },
        { key: "activity", header: "Ultima atividade", width: "10%" }
      ]}
      pagination={{ itemsPerPage: "10", label: "1-6 de 6", page: 1, pageCount: 1, previousDisabled: true, nextDisabled: true, onItemsPerPageClick: () => onAction?.("Quantidade por pagina aberta"), onPageChange: (page) => onAction?.(`Pagina selecionada: ${page}`) }}
      minTableWidth="var(--taliya-control-crm-internal-tenants-table-min-width)"
      onRowSelect={(row) => onRowSelect?.(row.id)}
      onSelectionChange={(rowId, selected) => onAction?.(`Selecao ${selected ? "ativada" : "removida"}: ${rowId}`)}
      onSortChange={(sort) => onAction?.(`Ordenacao: ${sort?.key ?? "nenhuma"}`)}
      rowActions={(row) => <IconButton icon="more" label={`Mais acoes de ${row.studio}`} onClick={() => onAction?.(`Menu do tenant aberto: ${row.id}`)} size="sm" variant="ghost" />}
      rows={internalTenantRows}
      selectable
      selectedRowIds={selectedRowId ? [selectedRowId] : []}
      selectedRowId={selectedRowId}
    />
  );
}

function InternalSecurityNotice() {
  return <InternalSecurityRulesPanel />;
}

export function InternalOverviewPage({ initialState = "normal" }: { initialState?: InternalOverviewDashboardState } = {}) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeNavId, setActiveNavId] = useState("overview");
  const [announcement, setAnnouncement] = useState("");
  const [dashboardState, setDashboardState] = useState<InternalOverviewDashboardState>(initialState);
  const announce = (message: string) => setAnnouncement(message);

  return (
    <>
      <InternalShell
        avatarSrc={image79Avatar}
        browserUrl="https://app.taliya.com/internal"
        contentLayout="internal-overview"
        drawer={drawerOpen ? (
          <SupportTicketDrawer
            onAction={(action) => announce(`Acao do ticket interno: ${action}`)}
            onClose={() => { setDrawerOpen(false); announce("Ticket interno fechado"); }}
            state="access active"
            variant="internal"
          />
        ) : null}
        globalActions={{
          onAvatar: () => announce("Perfil da operadora aberto"),
          onMessages: () => announce("Mensagens internas abertas"),
          onNotifications: () => announce("Notificacoes internas abertas"),
          onSearch: () => announce("Busca global aberta")
        }}
        navItems={internalNav(activeNavId)}
        onBack={() => announce("Navegacao de retorno acionada")}
        onNavChange={(id) => { setActiveNavId(id); announce(`Secao interna selecionada: ${id}`); }}
        onSidebarSelect={(item) => announce(`Modulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => announce(`Preferencia selecionada: ${item.label}`)}
        pageHeaderRhythm="internal-overview"
        pageHeaderActions={
          <ButtonGroup>
            <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={() => announce("Criacao de lead aberta")} size="sm" variant="primary">Novo lead</Button>
            <Button leadingIcon="shield" onClick={() => { announce("Ticket interno aberto"); setDrawerOpen(true); }} size="sm" variant="secondary">Abrir ticket interno</Button>
          </ButtonGroup>
        }
        subtitle="Operacao interna de leads, clientes, suporte e plataforma"
        title="Taliya Interno"
      >
        <InternalOverviewDashboard
          fluid
          onActivityAction={() => announce("Atividade interna completa aberta")}
          onCardAction={(card) => {
            if (card.id === "incidents") setDashboardState("critical");
            announce(`Area interna aberta: ${card.id}`);
          }}
          onCopilotAction={() => announce("Recomendacoes do copiloto abertas")}
          onFilterSelect={(filter) => announce(`Filtro interno selecionado: ${filter.label}`)}
          onSearchChange={(value) => announce(value ? `Busca interna: ${value}` : "Busca interna limpa")}
          showHeader={false}
          state={dashboardState}
        />
      </InternalShell>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function InternalTenantsListDetailPage() {
  const [selectedTenantId, setSelectedTenantId] = useState("studio-vila");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeNavId, setActiveNavId] = useState("clients");
  const [announcement, setAnnouncement] = useState("");
  const selectedTenant = internalTenantRows.find((row) => row.id === selectedTenantId) ?? internalTenantRows[0]!;
  const [grantStateOverride, setGrantStateOverride] = useState<TenantSummaryDrawerGrantState>();
  const effectiveGrantState = grantStateOverride ?? selectedTenant.grantState;
  const drawerModel = tenantSummaryModel(selectedTenant, effectiveGrantState);

  function handleTenantAction(action: TenantSummaryDrawerAction) {
    if (action === "grant-access") setGrantStateOverride("active");
    if (action === "revoke-access") setGrantStateOverride("revoked");
    const messages: Record<TenantSummaryDrawerAction, string> = {
      "open-tenant": `Tenant aberto: ${selectedTenant.studio}`,
      support: `Suporte aberto: ${selectedTenant.studio}`,
      grants: `Grants abertos: ${selectedTenant.studio}`,
      billing: `Billing aberto: ${selectedTenant.studio}`,
      "request-grant": `Grant solicitado: ${selectedTenant.studio}`,
      "grant-access": `Acesso concedido: ${selectedTenant.studio}`,
      "revoke-access": `Acesso revogado: ${selectedTenant.studio}`,
      audit: `Auditoria aberta: ${selectedTenant.studio}`,
      note: `Nota interna iniciada: ${selectedTenant.studio}`
    };
    setAnnouncement(messages[action]);
  }

  return (
    <>
      <InternalWorklistPage
        after={<InternalSecurityNotice />}
        avatarSrc={image79Avatar}
        browserUrl="https://app.taliya.com/internal/tenants"
        contentLayout="internal-tenants"
        drawer={drawerOpen ? <TenantSummaryDrawer {...drawerModel} grantState={effectiveGrantState} onAction={handleTenantAction} onClose={() => { setDrawerOpen(false); setAnnouncement("Resumo do tenant fechado"); }} /> : null}
        filterBar={<InternalTenantFilters onAction={setAnnouncement} />}
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens internas abertas"),
          onNotifications: () => setAnnouncement("Notificacoes internas abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        navItems={internalNav(activeNavId)}
        onBack={() => setAnnouncement("Navegacao de retorno acionada")}
        onNavChange={(id) => { setActiveNavId(id); setAnnouncement(`Secao interna selecionada: ${id}`); }}
        onSidebarSelect={(item) => setAnnouncement(`Modulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferencia selecionada: ${item.label}`)}
        pageHeaderRhythm="internal-tenants"
        quickFilters={<InternalTenantQuickFilters onAction={setAnnouncement} />}
        subtitle="Studios clientes, trials, riscos, grants e billing da Taliya"
        title="Clientes"
        worklistLayoutMode="main-priority"
      >
        <InternalTenantsTable
          onAction={setAnnouncement}
          onRowSelect={(tenantId) => {
            const tenant = internalTenantRows.find((row) => row.id === tenantId);
            setSelectedTenantId(tenantId);
            setGrantStateOverride(undefined);
            setDrawerOpen(true);
            setAnnouncement(`Tenant selecionado: ${tenant?.studio ?? tenantId}`);
          }}
          selectedRowId={selectedTenantId}
        />
      </InternalWorklistPage>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export function InternalTenantSecurityPage() {
  const [activeNavId, setActiveNavId] = useState("clients");
  const [announcement, setAnnouncement] = useState("");
  const [securityOpen, setSecurityOpen] = useState(true);

  return (
    <>
      <InternalShell
        avatarSrc={image79Avatar}
        browserUrl="https://app.taliya.com/internal/tenants/tenant_vila_mariana"
        contentLayout="internal-tenant-detail"
        globalActions={{
          onAvatar: () => setAnnouncement("Perfil da operadora aberto"),
          onMessages: () => setAnnouncement("Mensagens internas abertas"),
          onNotifications: () => setAnnouncement("Notificacoes internas abertas"),
          onSearch: () => setAnnouncement("Busca global aberta")
        }}
        navItems={internalNav(activeNavId)}
        onBack={() => setAnnouncement("Navegacao de retorno acionada")}
        onNavChange={(id) => { setActiveNavId(id); setAnnouncement(`Secao interna selecionada: ${id}`); }}
        onSidebarSelect={(item) => setAnnouncement(`Modulo selecionado: ${item.label}`)}
        onSidebarUtilitySelect={(item) => setAnnouncement(`Preferencia selecionada: ${item.label}`)}
        regions={{ pageHeader: false }}
        subtitle="Usuarios, grants e seguranca"
        title="Studio Vila Mariana"
      >
        <TenantDetailLayout
          headingLevel={1}
          onAction={setAnnouncement}
          onSecurityClose={() => { setSecurityOpen(false); setAnnouncement("Seguranca do tenant fechada"); }}
          onSecurityOpen={() => { setSecurityOpen(true); setAnnouncement("Seguranca do tenant aberta"); }}
          securityOpen={securityOpen}
        />
      </InternalShell>
      <span aria-live="polite" className="tl-sr-only" role="status">{announcement}</span>
    </>
  );
}

export const Image48InternalVisaoOperacional: Story = {
  name: "48 internal visao operacional",
  parameters: { sourceImage: "48_round-4.1K_internal_01_visao-operacional.png.png" },
  render: () => <InternalOverviewPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Abrir incidentes" }));
    const dashboards = canvas.getAllByRole("region", { name: "Taliya Interno" });
    const dashboard = dashboards[dashboards.length - 1]!;
    await expect(dashboard).toHaveAttribute("data-state", "critical");
    await expect(within(dashboard).getByText("Incidente crítico em investigação")).toBeInTheDocument();
    await expect(canvas.getByRole("status")).toHaveTextContent("Area interna aberta: incidents");
  }
};

export const Image49InternalTenantsListaDetalhe: Story = {
  name: "49 internal tenants lista detalhe",
  parameters: { sourceImage: "49_round-4.1K_internal_02_tenants-lista-detalhe.png" },
  render: () => <InternalTenantsListDetailPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const drawer = canvas.getByRole("complementary", { name: "Resumo do tenant selecionado" });

    await expect(drawer).toHaveAttribute("data-state", "active");
    await expect(drawer).toHaveAttribute("data-grant-state", "active");
    await userEvent.click(within(drawer).getByRole("button", { name: "Revogar acesso" }));
    await expect(drawer).toHaveAttribute("data-grant-state", "revoked");
    await expect(canvas.getByRole("status")).toHaveTextContent("Acesso revogado: Studio Vila Mariana");
    await userEvent.click(within(drawer).getByRole("button", { name: "Conceder acesso" }));
    await expect(drawer).toHaveAttribute("data-grant-state", "active");

    await userEvent.click(canvas.getByRole("row", { name: /Studio Reformer Sul/ }));
    await expect(drawer).toHaveAttribute("data-state", "degraded");
    await expect(within(drawer).getByText("degradado")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("row", { name: /Studio Equilibrio/ }));
    await expect(drawer).toHaveAttribute("data-state", "tenant-blocked");
    await expect(within(drawer).getByRole("button", { name: "Conceder acesso" })).toBeDisabled();
    await userEvent.click(within(drawer).getByRole("button", { name: "Fechar resumo do tenant" }));
    await expect(canvas.queryByRole("complementary", { name: "Resumo do tenant selecionado" })).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole("row", { name: /Studio Vila Mariana/ }));
    await expect(canvas.getByRole("complementary", { name: "Resumo do tenant selecionado" })).toHaveAttribute("data-state", "active");
    await userEvent.click(canvas.getByRole("button", { name: "Em risco 3" }));
  }
};

export const Image50InternalTenantDetalheUsuariosGrants: Story = {
  name: "50 internal tenant detalhe usuarios grants",
  parameters: { sourceImage: "50_round-4.1K_internal_03_tenant-detalhe-usuarios-grants.png" },
  render: () => <InternalTenantSecurityPage />
};

export const InternalDegradedContract: Story = {
  name: "Internal degraded",
  render: () => <InternalOverviewPage initialState="degraded" />
};

export const InternalCriticalContract: Story = {
  name: "Internal critical",
  render: () => <InternalOverviewPage initialState="critical" />
};

export const InternalEmptyContract: Story = {
  name: "Internal empty",
  render: () => <InternalOverviewPage initialState="empty" />
};

export const InternalLoadingContract: Story = {
  name: "Internal loading",
  render: () => <InternalOverviewPage initialState="loading" />
};

export const InternalInteractionContract: Story = {
  name: "Internal interaction contract",
  render: () => <InternalOverviewPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Abrir incidentes" }));
    const dashboards = canvas.getAllByRole("region", { name: "Taliya Interno" });
    const dashboard = dashboards[dashboards.length - 1]!;
    await expect(dashboard).toHaveAttribute("data-state", "critical");
    await expect(within(dashboard).getByText("Incidente crítico em investigação")).toBeInTheDocument();
    await expect(canvas.getByRole("status")).toHaveTextContent("Area interna aberta: incidents");
  }
};
