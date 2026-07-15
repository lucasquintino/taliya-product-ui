import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

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
import type { CrmShellNavItem, PageFilterBarFilter, PageQuickFilterItem } from "@taliya/crm";
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
      onFilterValueChange={(filter, value) => setValues((current) => ({ ...current, [filter.id]: value }))}
      onSearchChange={setQuery}
      onSearchFilter={() => undefined}
      query={query}
      searchFilterLabel="Abrir filtros de tenants"
      searchPlaceholder="Buscar studio, tenant, responsavel ou plano"
    />
  );
}

function InternalTenantQuickFilters() {
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

  return <PageQuickFilters heading="Filtros rapidos" items={items} onSelect={(item) => setSelectedId(item.id)} />;
}

function InternalTenantsTable({ onRowSelect, selectedRowId }: { onRowSelect?: (id: string) => void; selectedRowId?: string }) {
  const rows: Array<{ id: string; studio: string; initials: string; status: string; statusTone: ComponentTone; plan: string; agents: string; quota: number; tickets: string; ticketsTone: ComponentTone; grant: string; grantTone: ComponentTone; billing: string; billingTone: ComponentTone; owner: string; activity: string }> = [
    { id: "studio-vila", studio: "Studio Vila Mariana", initials: "VM", status: "Ativo", statusTone: "success", plan: "Growth", agents: "3/3", quota: 68, tickets: "1 aberto", ticketsTone: "info", grant: "ativo", grantTone: "success", billing: "em dia", billingTone: "success", owner: "Marina", activity: "hoje 10:24" },
    { id: "reformer-sul", studio: "Studio Reformer Sul", initials: "RS", status: "Risco", statusTone: "warning", plan: "Base", agents: "0/0", quota: 12, tickets: "2 abertos", ticketsTone: "danger", grant: "nenhum", grantTone: "neutral", billing: "pagamento falhou", billingTone: "danger", owner: "Lucas", activity: "hoje 09:18" },
    { id: "ana-pilates", studio: "Studio Ana Pilates", initials: "AP", status: "Ativo", statusTone: "success", plan: "Growth", agents: "2/3", quota: 90, tickets: "0", ticketsTone: "neutral", grant: "nenhum", grantTone: "neutral", billing: "em dia", billingTone: "success", owner: "Beatriz", activity: "ontem" },
    { id: "pilates-norte", studio: "Pilates Norte", initials: "PN", status: "Trial", statusTone: "info", plan: "Trial", agents: "1/1", quota: 34, tickets: "1 aberto", ticketsTone: "info", grant: "pendente", grantTone: "warning", billing: "trial", billingTone: "info", owner: "Rafael", activity: "hoje 08:40" },
    { id: "equilibrio", studio: "Studio Equilibrio", initials: "SE", status: "Bloqueado", statusTone: "danger", plan: "Pro", agents: "1/3", quota: 100, tickets: "3 abertos", ticketsTone: "danger", grant: "nenhum", grantTone: "neutral", billing: "inadimplente", billingTone: "danger", owner: "Marina", activity: "2 dias" },
    { id: "corpo-vivo", studio: "Corpo Vivo Pilates", initials: "CP", status: "Cancelado", statusTone: "neutral", plan: "Base", agents: "0/0", quota: 0, tickets: "0", ticketsTone: "neutral", grant: "nenhum", grantTone: "neutral", billing: "encerrado", billingTone: "neutral", owner: "Sam", activity: "semana passada" }
  ];

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
        { key: "grant", header: "Grant", render: (row) => <Chip showDot={false} tone={row.grantTone}>{row.grant}</Chip>, width: "9%" },
        { key: "billing", header: "Billing", render: (row) => <Chip showDot={false} tone={row.billingTone}>{row.billing}</Chip>, width: "10%" },
        { key: "owner", header: "Responsavel", width: "9%" },
        { key: "activity", header: "Ultima atividade", width: "10%" }
      ]}
      pagination={{ itemsPerPage: "10", label: "1-6 de 6", page: 1, pageCount: 1 }}
      onRowSelect={(row) => onRowSelect?.(row.id)}
      rowActions={() => <IconButton icon="more" label="Mais acoes do tenant" size="sm" variant="ghost" />}
      rows={rows}
      selectable
      selectedRowIds={selectedRowId ? [selectedRowId] : []}
      selectedRowId={selectedRowId}
    />
  );
}

function InternalSecurityNotice() {
  return <InternalSecurityRulesPanel />;
}

export function InternalOverviewPage() {
  const [, setAction] = useState("");

  return (
    <InternalShell
      avatarSrc={image79Avatar}
      browserUrl="https://app.taliya.com/internal"
      contentLayout="internal-overview"
      drawer={<SupportTicketDrawer onAction={setAction} onClose={() => setAction("close-ticket")} state="access active" variant="internal" />}
      drawerPlacement="floating"
      navItems={internalNav("overview")}
      pageHeaderRhythm="internal-overview"
      pageHeaderActions={
        <ButtonGroup>
          <Button className="tcrm-page-filter-bar__primary-action" leadingIcon="plus" onClick={() => setAction("new-lead")} size="sm" variant="primary">Novo lead</Button>
          <Button leadingIcon="shield" onClick={() => setAction("open-internal-ticket")} size="sm" variant="secondary">Abrir ticket interno</Button>
        </ButtonGroup>
      }
      subtitle="Operacao interna de leads, clientes, suporte e plataforma"
      title="Taliya Interno"
    >
      <InternalOverviewDashboard
        fluid
        onActivityAction={() => setAction("open-activity")}
        onCardAction={(card) => setAction(`open-card:${card.id}`)}
        onCopilotAction={() => setAction("open-recommendations")}
        onFilterSelect={(filter) => setAction(`filter:${filter.id}`)}
        onSearchChange={() => setAction("search")}
        showHeader={false}
      />
    </InternalShell>
  );
}

export function InternalTenantsListDetailPage() {
  const [selectedTenantId, setSelectedTenantId] = useState("studio-vila");
  const [, setAction] = useState("");

  return (
    <InternalWorklistPage
      after={<InternalSecurityNotice />}
      avatarSrc={image79Avatar}
      browserUrl="https://app.taliya.com/internal/tenants"
      contentLayout="internal-tenants"
      drawer={<TenantSummaryDrawer onAction={setAction} onClose={() => setAction("close-tenant")} />}
      drawerPlacement="floating"
      filterBar={<InternalTenantFilters onAction={setAction} />}
      navItems={internalNav("clients")}
      pageHeaderRhythm="internal-tenants"
      quickFilters={<InternalTenantQuickFilters />}
      subtitle="Studios clientes, trials, riscos, grants e billing da Taliya"
      title="Clientes"
      worklistLayoutMode="main-priority"
    >
      <InternalTenantsTable onRowSelect={setSelectedTenantId} selectedRowId={selectedTenantId} />
    </InternalWorklistPage>
  );
}

export function InternalTenantSecurityPage() {
  return (
    <InternalShell
      avatarSrc={image79Avatar}
      browserUrl="https://app.taliya.com/internal/tenants/tenant_vila_mariana"
      contentLayout="internal-tenant-detail"
      navItems={internalNav("clients")}
      regions={{ pageHeader: false }}
      subtitle="Usuarios, grants e seguranca"
      title="Studio Vila Mariana"
    >
      <TenantDetailLayout />
    </InternalShell>
  );
}

export const Image48InternalVisaoOperacional: Story = {
  name: "48 internal visao operacional",
  parameters: { sourceImage: "48_round-4.1K_internal_01_visao-operacional.png.png" },
  render: () => <InternalOverviewPage />
};

export const Image49InternalTenantsListaDetalhe: Story = {
  name: "49 internal tenants lista detalhe",
  parameters: { sourceImage: "49_round-4.1K_internal_02_tenants-lista-detalhe.png" },
  render: () => <InternalTenantsListDetailPage />
};

export const Image50InternalTenantDetalheUsuariosGrants: Story = {
  name: "50 internal tenant detalhe usuarios grants",
  parameters: { sourceImage: "50_round-4.1K_internal_03_tenant-detalhe-usuarios-grants.png" },
  render: () => <InternalTenantSecurityPage />
};
