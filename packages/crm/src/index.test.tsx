import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as crm from "./index";
import { CrmProductShell, DashboardGrid, ListDetailLayout, SetupShell, ThreePaneLayout, WorkListDetailPage, crmComponentNames } from "./index";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

afterEach(() => {
  cleanup();
});

function crmComponentsFromMatrix() {
  const matrix = readFileSync(resolve(rootDir, "specs/001-product-ui-foundation/component-matrix.md"), "utf8");

  return matrix
    .split(/\r?\n/)
    .filter((line) => line.startsWith("|") && !line.startsWith("| ---") && !line.startsWith("| Family"))
    .map((line) => line.split("|").map((cell) => cell.trim().replaceAll("`", "")))
    .filter((cells) => cells.length > 4 && cells[3] === "crm")
    .map((cells) => cells[2])
    .filter((name): name is string => Boolean(name));
}

describe("@taliya/crm component coverage", () => {
  it("exports every crm component declared in the official matrix", () => {
    const expectedNames = crmComponentsFromMatrix();
    expect(new Set(crmComponentNames).size).toBe(crmComponentNames.length);

    const registryNameSet = new Set<string>(crmComponentNames);
    const missingFromRegistry = expectedNames.filter((name) => !registryNameSet.has(name));
    const missingExports = expectedNames.filter((name) => !(name in crm));
    const missingRegistryExports = crmComponentNames.filter((name) => !(name in crm));

    expect(missingFromRegistry).toEqual([]);
    expect(missingExports).toEqual([]);
    expect(missingRegistryExports).toEqual([]);
  });

  it("supports compact finance queues for drawer-reserved dashboards", () => {
    render(
      <crm.FinanceQueueGrid density="compact">
        <crm.PaymentCaseCard />
      </crm.FinanceQueueGrid>
    );

    expect(screen.getByRole("region", { name: "Filas financeiras" })).toHaveClass("tcrm-finance-queue-grid--compact");
  });

  it("supports kanban column metadata and menu actions", () => {
    const onMenu = vi.fn();
    render(<crm.KanbanColumn count={12} meta="R$ 6.730,00" onMenu={onMenu} title="A vencer" />);

    expect(screen.getByText("R$ 6.730,00")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Abrir opcoes de A vencer" }));
    expect(onMenu).toHaveBeenCalledOnce();
  });

  it("supports commercial-width kanban lanes", () => {
    render(<crm.KanbanBoard aria-label="Pipeline" laneWidth="commercial"><crm.KanbanColumn title="Novo" /></crm.KanbanBoard>);
    expect(screen.getByRole("list", { name: "Pipeline" })).toHaveClass("tcrm-kanban-board--commercial-lanes");
  });

  it("renders core shell and layout anatomy", () => {
    render(
      <CrmProductShell title="Hoje" subtitle="Opera??o do studio">
        <DashboardGrid>
          <crm.MetricCard label="Tarefas" value="12" />
          <crm.AgentPanel />
        </DashboardGrid>
        <DashboardGrid aria-label="Grid Hoje" columns="today">
          <crm.MetricCard label="Checklist" value="4" />
          <crm.MetricCard label="Agora" value="3" />
        </DashboardGrid>
        <DashboardGrid aria-label="Grid Hoje critico" columns="todayCritical">
          <crm.MetricCard label="Bloqueios" value="3" />
        </DashboardGrid>
        <DashboardGrid aria-label="Grid compacto" columns={4} density="compact">
          <crm.MetricCard label="Leads" value="8" />
        </DashboardGrid>
      </CrmProductShell>
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Hoje" })).toBeInTheDocument();
    expect(screen.getAllByText("Tarefas").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Agente Taliya")).toBeInTheDocument();
    expect(screen.getByLabelText("Grid Hoje")).toHaveClass("tcrm-dashboard-grid--today");
    expect(screen.getByLabelText("Grid Hoje critico")).toHaveClass("tcrm-dashboard-grid--todayCritical");
    expect(screen.getByLabelText("Grid compacto")).toHaveClass("tcrm-dashboard-grid--4", "tcrm-dashboard-grid--compact");
  });

  it("renders page header metadata below stacked shell copy", () => {
    render(
      <CrmProductShell
        pageHeaderBreadcrumb={<nav aria-label="Breadcrumb">Agentes / Agenda</nav>}
        pageHeaderMeta={<span>Status do fluxo</span>}
        pageHeaderRhythm="stacked"
        title="Falta com aviso"
        subtitle="Quando o aluno avisa"
      >
        <div>Fluxo</div>
      </CrmProductShell>
    );

    const shell = screen.getByText("Fluxo").closest("[data-component='CrmProductShell']");
    expect(shell).toHaveClass("tcrm-product-shell-stage--page-header-stacked", "tcrm-product-shell-stage--page-header-breadcrumb", "tcrm-product-shell-stage--page-header-meta");
    expect(screen.getByRole("navigation", { name: "Breadcrumb" }).closest(".tcrm-product-shell-page-header__breadcrumb")).toBeInTheDocument();
    expect(screen.getByText("Status do fluxo").closest(".tcrm-product-shell-page-header__meta")).toBeInTheDocument();
  });

  it("can preserve global shell actions when a source drawer is open", () => {
    render(
      <CrmProductShell drawer={<crm.ApprovalDrawer />} showGlobalActionsWithDrawer title="Aprovações">
        <span>Fila de aprovações</span>
      </CrmProductShell>
    );

    const shell = screen.getByText("Fila de aprovações").closest("[data-component='CrmProductShell']");
    expect(shell).toHaveClass("tcrm-product-shell-stage--drawer-global-actions");
    expect(shell?.querySelector(".tcrm-product-shell-window")).toHaveClass("tcrm-product-shell-window--drawer-global-actions");
    expect(screen.getByRole("group", { name: "Ações globais" })).toBeInTheDocument();
  });

  it("renders setup and tri-pane compositions", () => {
    render(
      <div>
        <SetupShell step={3} />
        <ThreePaneLayout
          left={<crm.ConversationList />}
          center={<crm.ConversationThread />}
          right={<crm.ContextPanel title="Aluno" />}
        />
      </div>
    );

    expect(screen.getByText("Agenda")).toBeInTheDocument();
    expect(screen.getByLabelText("Painel esquerdo de conversas")).toBeInTheDocument();
    expect(screen.getByLabelText("Painel central da conversa").closest("[data-component='ThreePaneLayout']")).toHaveAttribute("data-state", "conversation");
    expect(screen.getByLabelText("Painel direito de contexto")).toBeInTheDocument();
    expect(screen.getAllByText("Ana Silva").length).toBeGreaterThan(0);
    expect(screen.getByText("Aluno")).toBeInTheDocument();
  });

  it("scopes setup frame geometry without changing default or welcome layouts", () => {
    render(
      <div>
        <crm.SetupPage frameVariant="shell-global" step={2}><span>Global shell workspace</span></crm.SetupPage>
        <crm.SetupPage frameVariant="guided" step={2}><span>Guided source workspace</span></crm.SetupPage>
        <crm.SetupPage frameVariant="guided-block" step={2}><span>Guided block workspace</span></crm.SetupPage>
        <crm.SetupPage frameVariant="guided-main" step={4}><span>Guided main workspace</span></crm.SetupPage>
        <crm.SetupPage frameVariant="guided-wide" step={7}><span>Guided wide workspace</span></crm.SetupPage>
        <crm.SetupPage frameVariant="guided-review" step={9}><span>Guided review workspace</span></crm.SetupPage>
        <crm.SetupPage step={2}><span>Guided workspace</span></crm.SetupPage>
        <crm.SetupPage layout="welcome" step={1}><span>Welcome workspace</span></crm.SetupPage>
      </div>
    );

    expect(screen.getByText("Global shell workspace").closest(".tcrm-setup-page")).toHaveClass("tcrm-setup-page--guided", "tcrm-setup-page--frame-shell-global");
    expect(screen.getByText("Guided source workspace").closest(".tcrm-setup-page")).toHaveClass("tcrm-setup-page--guided", "tcrm-setup-page--frame-guided");
    expect(screen.getByText("Guided block workspace").closest(".tcrm-setup-page")).toHaveClass("tcrm-setup-page--guided", "tcrm-setup-page--frame-guided-block");
    expect(screen.getByText("Guided main workspace").closest(".tcrm-setup-page")).toHaveClass("tcrm-setup-page--guided", "tcrm-setup-page--frame-guided-main");
    expect(screen.getByText("Guided wide workspace").closest(".tcrm-setup-page")).toHaveClass("tcrm-setup-page--guided", "tcrm-setup-page--frame-guided-wide");
    expect(screen.getByText("Guided review workspace").closest(".tcrm-setup-page")).toHaveClass("tcrm-setup-page--guided", "tcrm-setup-page--frame-guided-review");
    expect(screen.getByText("Guided workspace").closest(".tcrm-setup-page")).toHaveClass("tcrm-setup-page--guided", "tcrm-setup-page--frame-default");
    expect(screen.getByText("Welcome workspace").closest(".tcrm-setup-page")).toHaveClass("tcrm-setup-page--welcome", "tcrm-setup-page--frame-default");
  });

  it("marks operational rows for reusable consumer QA", () => {
    render(
      <crm.CrmOperationalRow
        row={{
          id: "row-1",
          title: "Lead quente",
          meta: "Studio Vila Mariana",
          icon: "user"
        }}
      />
    );

    expect(screen.getByRole("button", { name: "Abrir Lead quente" })).toHaveAttribute("data-component", "CrmOperationalRow");
  });

  it("renders a semantic completed checklist row", () => {
    render(
      <crm.CrmOperationalRow
        kind="checklist"
        row={{ completed: true, id: "open", title: "Abrir o estudio" }}
      />
    );

    const row = screen.getByRole("button", { name: "Abrir Abrir o estudio" });
    expect(row).toHaveClass("is-complete");
    expect(row).toHaveAttribute("data-completed", "true");
    expect(within(row).getByLabelText("Concluido")).toBeInTheDocument();
  });

  it("renders ListDetailLayout source states with accessible regions", () => {
    const { rerender } = render(
      <ListDetailLayout
        detail={<div>Detalhe selecionado</div>}
        detailLabel="Detalhe da tarefa"
        list={<button type="button">Confirmar reposicao</button>}
        listLabel="Filas"
        mainLabel="Tabela de tarefas"
      >
        <div>Tarefas abertas</div>
      </ListDetailLayout>
    );

    const layout = screen.getByText("Tarefas abertas").closest("[data-component='ListDetailLayout']");
    expect(layout).toHaveAttribute("data-state", "selected");
    expect(screen.getByLabelText("Filas")).toBeInTheDocument();
    expect(screen.getByLabelText("Tabela de tarefas")).toBeInTheDocument();
    expect(screen.getByLabelText("Detalhe da tarefa")).toBeInTheDocument();

    rerender(
      <ListDetailLayout
        detail={<div>Detalhe selecionado</div>}
        list={<button type="button">Confirmar reposicao</button>}
        state="closed"
      >
        <div>Tarefas abertas</div>
      </ListDetailLayout>
    );

    expect(screen.getByText("Tarefas abertas").closest("[data-component='ListDetailLayout']")).toHaveAttribute("data-state", "closed");
    expect(screen.queryByText("Detalhe selecionado")).not.toBeInTheDocument();
  });

  it("renders WorkListDetailPage as the reusable filter, rail, and list template", () => {
    const { rerender } = render(
      <WorkListDetailPage
        detail={<div>Detalhe selecionado</div>}
        detailLabel="Detalhe da tarefa"
        detailState="selected"
        filterBar={<button type="button">Buscar tarefas</button>}
        filterBarLabel="Filtros de tarefas"
        listLabel="Filas"
        mainLabel="Tabela de tarefas"
        pageLabel="Página de tarefas"
        quickFilters={<button type="button">Minhas tarefas</button>}
      >
        <div>Tabela oficial</div>
      </WorkListDetailPage>
    );

    const page = screen.getByText("Tabela oficial").closest("[data-component='WorkListDetailPage']");
    expect(page).toHaveAttribute("data-state", "source");
    expect(screen.getByLabelText("Página de tarefas")).toBeInTheDocument();
    expect(screen.getByLabelText("Filtros de tarefas")).toBeInTheDocument();
    expect(screen.getByLabelText("Filas")).toBeInTheDocument();
    expect(screen.getByLabelText("Tabela de tarefas")).toBeInTheDocument();
    expect(screen.getByLabelText("Detalhe da tarefa")).toBeInTheDocument();
    expect(screen.getByText("Tabela oficial").closest("[data-component='ListDetailLayout']")).toHaveAttribute("data-state", "selected");

    rerender(
      <WorkListDetailPage
        detail={<div>Detalhe selecionado</div>}
        detailState="closed"
        filterBar={<button type="button">Buscar tarefas</button>}
        quickFilters={<button type="button">Minhas tarefas</button>}
        state="loading"
      >
        <div>Tabela oficial</div>
      </WorkListDetailPage>
    );

    expect(screen.getByText("Tabela oficial").closest("[data-component='WorkListDetailPage']")).toHaveAttribute("data-state", "loading");
    expect(screen.getByText("Tabela oficial").closest("[data-component='WorkListDetailPage']")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Tabela oficial").closest("[data-component='ListDetailLayout']")).toHaveAttribute("data-state", "closed");
    expect(screen.queryByText("Detalhe selecionado")).not.toBeInTheDocument();

    rerender(
      <WorkListDetailPage
        filterBar={<button type="button">Buscar tarefas</button>}
        quickFilters={<button type="button">Minhas tarefas</button>}
        state="empty"
      >
        <div>Tabela vazia</div>
      </WorkListDetailPage>
    );

    expect(screen.getByText("Tabela vazia").closest("[data-component='WorkListDetailPage']")).toHaveAttribute("data-state", "empty");
    expect(screen.getByText("Tabela vazia").closest("[data-component='WorkListDetailPage']")).not.toHaveAttribute("aria-busy");

    rerender(
      <WorkListDetailPage
        filterBar={<button type="button">Buscar tarefas</button>}
        quickFilters={<button type="button">Minhas tarefas</button>}
        state="blocked"
      >
        <div>Tabela bloqueada</div>
      </WorkListDetailPage>
    );

    expect(screen.getByText("Tabela bloqueada").closest("[data-component='WorkListDetailPage']")).toHaveAttribute("data-state", "blocked");
  });

  it("exposes the WorkListDetailPage main-priority layout mode", () => {
    render(
      <WorkListDetailPage
        filterBar={<button type="button">Buscar checklists</button>}
        layoutMode="main-priority"
        quickFilters={<button type="button">Hoje</button>}
      >
        <div>Tabela de checklists</div>
      </WorkListDetailPage>
    );

    const page = screen.getByText("Tabela de checklists").closest("[data-component='WorkListDetailPage']");
    expect(page).toHaveAttribute("data-layout-mode", "main-priority");
    expect(page).toHaveClass("tcrm-work-list-detail-page--main-priority");
  });

  it("exposes spacious filter rhythm through the official worklist page", () => {
    render(
      <crm.CrmWorklistPage
        filterBar={<span>Filtros empilhados</span>}
        quickFilters={<span>Filas</span>}
        title="Vendas"
        worklistFilterRhythm="spacious"
      >
        <span>Tabela</span>
      </crm.CrmWorklistPage>
    );

    const page = screen.getByText("Tabela").closest("[data-component='WorkListDetailPage']");
    expect(page).toHaveClass("tcrm-work-list-detail-page--filter-spacious");
    expect(page).toHaveAttribute("data-filter-rhythm", "spacious");
  });

  it("exposes the WorkListDetailPage wide-rail layout mode", () => {
    render(
      <WorkListDetailPage
        filterBar={<button type="button">Buscar casos</button>}
        layoutMode="wide-rail"
        quickFilters={<button type="button">Todos os segmentos</button>}
      >
        <div>Tabela de retencao</div>
      </WorkListDetailPage>
    );

    const page = screen.getByText("Tabela de retencao").closest("[data-component='WorkListDetailPage']");
    expect(page).toHaveAttribute("data-layout-mode", "wide-rail");
    expect(page).toHaveClass("tcrm-work-list-detail-page--wide-rail");
  });

  it("exposes the WorkListDetailPage balanced-rail layout mode", () => {
    render(
      <crm.WorkListDetailPage
        filterBar={<div>Filtros</div>}
        layoutMode="balanced-rail"
        quickFilters={<div>Filas</div>}
      >
        <div>Tabela</div>
      </crm.WorkListDetailPage>
    );

    const page = screen.getByText("Tabela").closest("[data-component='WorkListDetailPage']");
    expect(page).toHaveAttribute("data-layout-mode", "balanced-rail");
    expect(page).toHaveClass("tcrm-work-list-detail-page--balanced-rail");
  });

  it("exposes the WorkListDetailPage compact-rail layout mode", () => {
    render(
      <WorkListDetailPage
        filterBar={<button type="button">Buscar matriculas</button>}
        heightMode="tall"
        layoutMode="compact-rail"
        quickFilters={<button type="button">Em conversao</button>}
      >
        <div>Tabela de matriculas</div>
      </WorkListDetailPage>
    );

    const page = screen.getByText("Tabela de matriculas").closest("[data-component='WorkListDetailPage']");
    expect(page).toHaveAttribute("data-layout-mode", "compact-rail");
    expect(page).toHaveAttribute("data-height-mode", "tall");
    expect(page).toHaveClass("tcrm-work-list-detail-page--compact-rail");
    expect(page).toHaveClass("tcrm-work-list-detail-page--height-tall");
  });

  it("exposes the WorkListDetailPage wide-main layout mode", () => {
    render(
      <WorkListDetailPage
        filterBar={<button type="button">Buscar movimentacoes</button>}
        layoutMode="wide-main"
        quickFilters={<button type="button">A vencer</button>}
      >
        <div>Tabela financeira densa</div>
      </WorkListDetailPage>
    );

    const page = screen.getByText("Tabela financeira densa").closest("[data-component='WorkListDetailPage']");
    expect(page).toHaveAttribute("data-layout-mode", "wide-main");
    expect(page).toHaveClass("tcrm-work-list-detail-page--wide-main");
  });

  it("renders reusable page-family compositions over the official shell and layouts", () => {
    const navItems = [
      { id: "lista", label: "Lista" },
      { id: "kanban", label: "Kanban" }
    ];
    const sidebarItems: crm.CrmShellSidebarItem[] = [{ id: "home", label: "Hoje", icon: "home" }];

    const { rerender } = render(
      <crm.CrmWorklistPage
        activeNavId="lista"
        activeSidebarId="home"
        after={<div>Regras abaixo da lista</div>}
        filterBar={<button type="button">Buscar</button>}
        navItems={navItems}
        quickFilters={<button type="button">Minhas filas</button>}
        sidebarItems={sidebarItems}
        subtitle="Lista oficial"
        title="Vendas"
      >
        <div>Tabela de vendas</div>
      </crm.CrmWorklistPage>
    );

    expect(screen.getByText("Tabela de vendas").closest("[data-component='CrmProductShell']")).toHaveAttribute("data-shell-variant", "crm");
    expect(screen.getByText("Tabela de vendas").closest("[data-component='WorkListDetailPage']")).toBeInTheDocument();
    expect(screen.getByText("Regras abaixo da lista").closest(".tcrm-work-list-detail-page__after")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Lista" })).toHaveAttribute("aria-pressed", "true");

    rerender(
      <crm.CrmKanbanPage
        activeNavId="kanban"
        navItems={navItems}
        quickFilters={<button type="button">Pendências</button>}
        subtitle="Kanban oficial"
        title="Operação"
      >
        <crm.KanbanColumn count={1} title="Novo">
          <crm.KanbanCard title="Reposição" />
        </crm.KanbanColumn>
      </crm.CrmKanbanPage>
    );

    expect(screen.getByText("Reposição").closest("[data-component='KanbanBoard']")).toBeInTheDocument();

    rerender(
      <crm.CrmDashboardPage before={<button type="button">Filtrar dashboard</button>} columns={2} layoutVariant="opportunity" subtitle="Dashboard oficial" title="Hoje">
        <div>Card operacional</div>
      </crm.CrmDashboardPage>
    );

    expect(screen.getByRole("button", { name: "Filtrar dashboard" })).toBeInTheDocument();
    expect(screen.getByText("Card operacional").closest("[data-component='DashboardGrid']")).toHaveClass("tcrm-dashboard-grid--2");
    expect(screen.getByText("Card operacional").closest(".tcrm-dashboard-page-stack")).toContainElement(
      screen.getByRole("button", { name: "Filtrar dashboard" })
    );
    expect(screen.getByText("Card operacional").closest(".tcrm-dashboard-page-stack")).toHaveClass("tcrm-dashboard-page-stack--opportunity");
    expect(screen.getByText("Card operacional").closest(".tcrm-product-shell-stage")).toHaveClass("tcrm-product-shell-stage--content-opportunity");

    rerender(
      <crm.CrmDashboardPage columns="support" layoutVariant="support" pageHeaderRhythm="support" subtitle="Atendimento" title="Suporte">
        <div>Rail de status</div>
        <div>Workspace de suporte</div>
      </crm.CrmDashboardPage>
    );

    expect(screen.getByText("Rail de status").closest("[data-component='DashboardGrid']")).toHaveClass("tcrm-dashboard-grid--support");
    expect(screen.getByText("Workspace de suporte").closest(".tcrm-product-shell-stage")).toHaveClass("tcrm-product-shell-stage--content-support", "tcrm-product-shell-stage--page-header-support");

    rerender(
      <crm.CrmDashboardPage columns={4} layoutVariant="settings-hub" pageHeaderRhythm="settings-hub" title="Configurações">
        <div>Card de configuração</div>
      </crm.CrmDashboardPage>
    );

    expect(screen.getByText("Card de configuração").closest(".tcrm-product-shell-stage")).toHaveClass(
      "tcrm-product-shell-stage--content-settings-hub",
      "tcrm-product-shell-stage--page-header-settings-hub"
    );

    rerender(
      <crm.CrmDashboardPage before={<button type="button">Filtrar financeiro</button>} layoutVariant="finance-overview" title="Financeiro">
        <div>Filas financeiras</div>
      </crm.CrmDashboardPage>
    );

    expect(screen.getByText("Filas financeiras").closest(".tcrm-dashboard-page-stack")).toHaveClass("tcrm-dashboard-page-stack--finance-overview");
    expect(screen.getByText("Filas financeiras").closest(".tcrm-product-shell-stage")).toHaveClass("tcrm-product-shell-stage--content-finance-overview");

    rerender(
      <crm.CrmThreePanePage center={<div>Thread</div>} filterBar={<button type="button">Filtrar inbox</button>} left={<div>Conversas</div>} right={<div>Contexto</div>} subtitle="Inbox oficial" title="Inbox" />
    );

    const threePaneLayout = screen.getByText("Thread").closest("[data-component='ThreePaneLayout']");
    expect(threePaneLayout).toHaveClass("tcrm-three-pane-page-layout");
    expect(threePaneLayout?.closest(".tcrm-three-pane-page-stack")).toHaveClass("tcrm-page-family-stack");
    expect(threePaneLayout?.closest(".tcrm-product-shell-stage")).toHaveClass("tcrm-product-shell-stage--content-three-pane");
    expect(screen.getByRole("button", { name: "Filtrar inbox" })).toBeInTheDocument();

    rerender(
      <crm.CrmRightPanelPage main={<div>Formulário</div>} panel={<div>Agente</div>} rightPanelVariant="simulation" subtitle="Config oficial" title="Configuração" />
    );

    expect(screen.getByText("Formulário").closest("[data-component='RightPanelLayout']")).toHaveClass("tcrm-right-panel-layout--simulation");

    rerender(
      <crm.CrmRightPanelPage main={<div>Teste do fluxo</div>} panel={<div>Agente do teste</div>} rightPanelVariant="agent-test" subtitle="Teste seguro" title="Testar Falta com aviso" />
    );

    expect(screen.getByText("Teste do fluxo").closest("[data-component='RightPanelLayout']")).toHaveClass("tcrm-right-panel-layout--agent-test");
    expect(screen.getByText("Teste do fluxo").closest(".tcrm-product-shell-stage")).toHaveClass("tcrm-product-shell-stage--content-agent-test");

    rerender(
      <crm.CrmRightPanelPage
        main={<div>Publicação da rotina</div>}
        pageHeaderRhythm="agents-publish"
        panel={<div>Agente publicador</div>}
        rightPanelVariant="agent-publish"
        title="Publicar Presença e faltas"
      />
    );

    expect(screen.getByText("Publicação da rotina").closest("[data-component='RightPanelLayout']")).toHaveClass("tcrm-right-panel-layout--agent-publish");
    expect(screen.getByText("Publicação da rotina").closest(".tcrm-product-shell-stage")).toHaveClass(
      "tcrm-product-shell-stage--content-agent-publish",
      "tcrm-product-shell-stage--page-header-agents-publish"
    );

    rerender(
      <crm.CrmRightPanelPage
        main={<div>Recibo da execução</div>}
        panel={<div>Agente da execução</div>}
        panelPlacement="drawer"
        rightPanelVariant="agent-execution"
        title="Execução: Falta com aviso"
      />
    );

    expect(screen.getByText("Recibo da execução").closest("[data-component='RightPanelLayout']")).toHaveClass(
      "tcrm-right-panel-layout--drawer-panel",
      "tcrm-right-panel-layout--agent-execution"
    );

    rerender(
      <crm.CrmRightPanelPage
        main={<div>Permissões do CRM</div>}
        panel={<div>Agente de configuração</div>}
        rightPanelVariant="settings-permissions"
        title="Permissões"
        topNavSelection="none"
      />
    );

    expect(screen.getByText("Permissões do CRM").closest("[data-component='RightPanelLayout']")).toHaveClass(
      "tcrm-right-panel-layout--settings-permissions"
    );
    expect(screen.getByText("Permissões do CRM").closest(".tcrm-product-shell-stage")).toHaveClass(
      "tcrm-product-shell-stage--content-settings-permissions"
    );

    rerender(
      <crm.CrmRightPanelPage
        main={<div>Pagamentos oficiais</div>}
        panel={<div>Agente de pagamentos</div>}
        rightPanelVariant="settings-payments"
        title="Pagamentos e financeiro"
        topNavSelection="none"
      />
    );

    expect(screen.getByText("Pagamentos oficiais").closest("[data-component='RightPanelLayout']")).toHaveClass(
      "tcrm-right-panel-layout--settings-payments"
    );
    expect(screen.getByText("Pagamentos oficiais").closest(".tcrm-product-shell-stage")).toHaveClass(
      "tcrm-product-shell-stage--content-settings-payments"
    );

    rerender(
      <crm.CrmRightPanelPage
        main={<div>Agenda oficial</div>}
        panel={<div>Agente de agenda</div>}
        rightPanelVariant="settings-agenda"
        title="Agenda"
        topNavSelection="none"
      />
    );

    expect(screen.getByText("Agenda oficial").closest("[data-component='RightPanelLayout']")).toHaveClass(
      "tcrm-right-panel-layout--settings-agenda"
    );
    expect(screen.getByText("Agenda oficial").closest(".tcrm-product-shell-stage")).toHaveClass(
      "tcrm-product-shell-stage--content-settings-agenda"
    );

    rerender(
      <crm.CrmRightPanelPage
        main={<div>Notificações oficiais</div>}
        panel={<div>Agente de notificações</div>}
        rightPanelVariant="settings-notifications"
        title="Notificações"
        topNavSelection="none"
      />
    );

    expect(screen.getByText("Notificações oficiais").closest("[data-component='RightPanelLayout']")).toHaveClass(
      "tcrm-right-panel-layout--settings-notifications"
    );
    expect(screen.getByText("Notificações oficiais").closest(".tcrm-product-shell-stage")).toHaveClass(
      "tcrm-product-shell-stage--content-settings-notifications"
    );

    rerender(
      <crm.CrmRightPanelPage
        main={<div>Assinatura oficial</div>}
        panel={<div>Agente de billing</div>}
        rightPanelVariant="billing-subscription"
        title="Assinatura Taliya"
        topNavSelection="none"
      />
    );

    expect(screen.getByText("Assinatura oficial").closest("[data-component='RightPanelLayout']")).toHaveClass(
      "tcrm-right-panel-layout--billing-subscription"
    );
    expect(screen.getByText("Assinatura oficial").closest(".tcrm-product-shell-stage")).toHaveClass(
      "tcrm-product-shell-stage--content-billing-subscription"
    );

    rerender(
      <crm.CrmRightPanelPage
        main={<div>Rotina oficial</div>}
        pageHeaderRhythm="agents-routine-detail"
        panel={<div>Agente da rotina</div>}
        rightPanelVariant="agent-routine"
        title="Presença e faltas"
      />
    );

    expect(screen.getByText("Rotina oficial").closest("[data-component='RightPanelLayout']")).toHaveClass("tcrm-right-panel-layout--agent-routine");
    expect(screen.getByText("Rotina oficial").closest(".tcrm-product-shell-stage")).toHaveClass(
      "tcrm-product-shell-stage--content-agent-routine",
      "tcrm-product-shell-stage--page-header-agents-routine-detail"
    );

    rerender(
      <crm.CrmRightPanelPage
        main={<div>Fluxo oficial</div>}
        pageHeaderRhythm="agents-flow-detail"
        panel={<div>Agente do fluxo</div>}
        rightPanelVariant="agent-flow"
        title="Falta com aviso"
      />
    );

    expect(screen.getByText("Fluxo oficial").closest("[data-component='RightPanelLayout']")).toHaveClass("tcrm-right-panel-layout--agent-flow");
    expect(screen.getByText("Fluxo oficial").closest(".tcrm-product-shell-stage")).toHaveClass(
      "tcrm-product-shell-stage--content-agent-flow",
      "tcrm-product-shell-stage--page-header-agents-flow-detail"
    );

    rerender(
      <crm.CrmRightPanelPage
        contentHeader={<div>Identificação do aluno</div>}
        contentHeaderLabel="Cabeçalho do perfil"
        main={<div>Perfil</div>}
        panel={<div>Ações do aluno</div>}
        regions={{ pageHeader: false }}
        rightPanelVariant="student-profile"
        title="Ana Paula Martins"
      />
    );

    expect(screen.getByText("Perfil").closest("[data-component='RightPanelLayout']")).toHaveClass("tcrm-right-panel-layout--student-profile");
    expect(screen.getByText("Identificação do aluno").closest("[data-region='content-header']")).toHaveAttribute("aria-label", "Cabeçalho do perfil");
    expect(screen.getByText("Identificação do aluno").closest("[data-region='content-header']")).toHaveClass("tcrm-right-panel-layout__content-header");
    expect(screen.getByText("Perfil").closest(".tcrm-product-shell-stage")).toHaveClass("tcrm-product-shell-stage--content-student-profile");
    expect(screen.queryByRole("heading", { name: "Ana Paula Martins", level: 1 })).not.toBeInTheDocument();

    rerender(
      <crm.CrmRightPanelPage main={<div>Detalhe da aula</div>} panel={<div>Chamada</div>} rightPanelVariant="class-operation" title="Terça 17h" />
    );

    expect(screen.getByText("Detalhe da aula").closest("[data-component='RightPanelLayout']")).toHaveClass("tcrm-right-panel-layout--class-operation");
    expect(screen.getByText("Detalhe da aula").closest(".tcrm-product-shell-stage")).toHaveClass("tcrm-product-shell-stage--content-class-operation");

    rerender(
      <crm.CrmRightPanelPage main={<div>Extrato oficial</div>} pageHeaderRhythm="usage" panel={<div>Suporte de uso</div>} rightPanelVariant="usage-ledger" title="Extrato de uso" />
    );

    expect(screen.getByText("Extrato oficial").closest("[data-component='RightPanelLayout']")).toHaveClass("tcrm-right-panel-layout--usage-ledger");
    expect(screen.getByText("Extrato oficial").closest(".tcrm-product-shell-stage")).toHaveClass("tcrm-product-shell-stage--page-header-usage");
  });

  it("renders the official Usage header summary and forwards item selection", () => {
    const onSelect = vi.fn();

    render(<crm.CrmHeaderSummary onSelect={onSelect} variant="overview" />);

    expect(screen.getByText("Ciclo atual").closest("[data-component='CrmHeaderSummary']")).toHaveClass(
      "tcrm-usage-header-summary--overview"
    );
    fireEvent.click(screen.getByRole("button", { name: "42% usado" }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "used", icon: "pieChart", tone: "info" }));
    expect(crm.UsageHeaderSummary).toBe(crm.CrmHeaderSummary);

    render(
      <crm.CrmHeaderSummary
        items={[{ id: "subscription", icon: "checkCircle", label: "Assinatura ativa", tone: "success" }]}
        variant="billing-invoices"
      />
    );
    expect(screen.getByRole("button", { name: "Assinatura ativa" })).toHaveAttribute("data-tone", "success");
  });

  it("allows source states without a selected top navigation item", () => {
    render(<crm.CrmShellTopNav items={[{ id: "today", label: "Hoje" }, { id: "tasks", label: "Tarefas" }]} selectionMode="none" />);

    expect(screen.getByRole("button", { name: "Hoje" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("button", { name: "Tarefas" })).not.toHaveAttribute("aria-current");
  });

  it("keeps WorkListDetailPage quick filters stretched to the table height", () => {
    const styles = readFileSync(resolve(rootDir, "packages/crm/src/styles.css"), "utf8");

    expect(styles).toContain(".tcrm-work-list-detail-page__layout {\n  align-items: stretch;");
    expect(styles).toContain(".tcrm-work-list-detail-page__rail > .tcrm-page-quick-filters {\n  height: 100%;");
    expect(styles).toContain(".tcrm-work-list-detail-page--compact-rail .tcrm-page-quick-filters__item-label,\n.tcrm-work-list-detail-page--main-priority .tcrm-page-quick-filters__item-label {\n  overflow: visible;");
    expect(styles).toContain(".tcrm-work-list-detail-page--compact-rail .tcrm-work-list-detail-page__layout {");
    expect(styles).toContain(".tcrm-work-list-detail-page--balanced-rail .tcrm-work-list-detail-page__layout {");
    expect(styles).toContain(".tcrm-work-list-detail-page--wide-main .tcrm-work-list-detail-page__layout {");
    expect(styles).toContain(".tcrm-work-list-detail-page--wide-rail .tcrm-work-list-detail-page__layout {");
    expect(styles).toContain("--taliya-layout-crm-list-detail-list-width: var(--taliya-layout-crm-page-quick-filters-width);");
    expect(styles).toContain("overflow-wrap: anywhere;");
    expect(styles).toContain("white-space: normal;");
    expect(styles).toContain(".tcrm-worklist-table__data.tl-table-wrap {");
    expect(styles).toContain("overflow-x: auto;\n  overflow-y: hidden;");
    expect(styles).toMatch(
      /@media \(max-width: 760px\) \{[\s\S]*?\.tcrm-worklist-table__data \.tl-table \{[\s\S]*?min-width: var\(--taliya-control-table-min-width\);/,
    );
  });

  it("keeps the official three-pane family usable on narrow viewports", () => {
    const styles = readFileSync(resolve(rootDir, "packages/crm/src/styles.css"), "utf8");

    expect(styles).toMatch(
      /@media \(max-width: 980px\) \{[\s\S]*?\.tcrm-three-pane-layout \{[\s\S]*?height: auto;[\s\S]*?overflow: visible;[\s\S]*?width: 100%;/,
    );
    expect(styles).toContain(".tcrm-three-pane-layout .tcrm-conversation-list,\n  .tcrm-three-pane-layout .tcrm-conversation-thread,\n  .tcrm-three-pane-layout .tcrm-context-panel {");
    expect(styles).toContain(".tcrm-three-pane-layout .tcrm-conversation-list__subject {\n    display: none;");
  });

  it("keeps ApprovalDrawer opaque and actionable above a scrollable mobile worklist", () => {
    const styles = readFileSync(resolve(rootDir, "packages/crm/src/styles.css"), "utf8");

    expect(styles).toContain(".tcrm-product-shell-stage.tcrm-product-shell-stage--drawer > .tcrm-approval-drawer {");
    expect(styles).toContain(".tcrm-product-shell-stage > .tcrm-approval-drawer .tcrm-approval-panel__sections {\n    flex: 1 1 auto;\n    min-height: 0;\n    overflow-y: auto;");
    expect(styles).toContain(".tcrm-approval-table__data.tl-table-wrap {\n    overflow-x: auto;");
    expect(styles).toContain(".tcrm-approval-table__data .tl-table {\n    min-width: var(--taliya-control-table-min-width);");
  });

  it("keeps ChecklistTable selected rows as dot-only selection without the task-table rail", () => {
    const styles = readFileSync(resolve(rootDir, "packages/crm/src/styles.css"), "utf8");

    expect(styles).toContain(".tcrm-checklist-table__data .tl-table__row--selected {\n  box-shadow: var(--taliya-shadow-crm-checklist-table-row-selected);");
    expect(styles).toContain(".tcrm-checklist-table__data .tl-table__row--selected:hover {\n  background: var(--taliya-color-crm-checklist-row-bg-selected);");
    expect(styles).toContain(".tcrm-checklist-table__title-cell.is-selected::before");
  });

  it("keeps ReplacementTable selected rows as dot-only selection without the task-table rail", () => {
    const styles = readFileSync(resolve(rootDir, "packages/crm/src/styles.css"), "utf8");

    expect(styles).toContain(".tcrm-replacement-table__data .tl-table__row--selected {\n  box-shadow: var(--taliya-shadow-crm-checklist-table-row-selected);");
    expect(styles).toContain(".tcrm-replacement-table__student.is-selected::before");
    expect(styles).toContain(".tcrm-replacement-table__data.tl-table-wrap {\n  background: transparent;\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n  flex: 1 1 auto;\n  min-height: 0;\n  overflow-x: auto;");
    expect(styles).toContain(".tcrm-replacement-table__data .tl-table {\n  border-collapse: separate;\n  border-spacing: 0;\n  font-size: var(--taliya-control-crm-task-table-text-size);\n  min-width: var(--taliya-control-table-min-width);");
    expect(styles).not.toContain(".tcrm-replacement-table__data .tl-table__row--selected {\n  box-shadow: var(--taliya-shadow-crm-task-table-row-selected);");
  });

  it("keeps ChecklistDrawer step content on a real text track inside Button", () => {
    const styles = readFileSync(resolve(rootDir, "packages/crm/src/styles.css"), "utf8");

    expect(styles).toMatch(
      /\.tcrm-checklist-drawer__step-button > span \{[\s\S]*?display: grid;[\s\S]*?grid-column: 1 \/ -1;[\s\S]*?grid-template-columns: var\(--taliya-control-crm-task-drawer-check-size\) minmax\(0, 1fr\);/,
    );
    expect(styles).toContain(".tcrm-checklist-drawer__step-copy {\n  display: grid;");
  });

  it("keeps ReplacementDrawer footer contained with a scrollable body track", () => {
    const styles = readFileSync(resolve(rootDir, "packages/crm/src/styles.css"), "utf8");

    expect(styles).toMatch(
      /\.tcrm-replacement-drawer\.tcrm-drawer-frame \{[\s\S]*?display: grid;[\s\S]*?grid-template-rows: auto minmax\(0, 1fr\) auto;/,
    );
    expect(styles).toMatch(
      /\.tcrm-replacement-drawer\.tcrm-drawer-frame \.tcrm-drawer-frame__body \{[\s\S]*?padding:/,
    );
    expect(styles).toMatch(
      /\.tcrm-replacement-drawer__body \{[\s\S]*?min-height: 0;[\s\S]*?overflow-x: hidden;[\s\S]*?overflow-y: auto;/,
    );
    expect(styles).toMatch(
      /\.tcrm-replacement-drawer__fact \{[\s\S]*?grid-template-rows: min-content min-content;/,
    );
    expect(styles).toContain(".tcrm-replacement-drawer__footer {\n  display: grid;");
  });

  it("renders ProfileTabs as the source-shaped student profile tab bar", () => {
    const onValueChange = vi.fn();

    const { rerender } = render(<crm.ProfileTabs density="compact" onValueChange={onValueChange} />);

    const tablist = screen.getByRole("tablist", { name: "Abas do perfil do aluno" });
    const tabs = within(tablist).getAllByRole("tab");
    expect(tablist.closest(".tcrm-profile-tabs")).toHaveClass("tcrm-profile-tabs--compact");
    expect(tabs.map((tab) => tab.textContent)).toEqual(["Resumo", "Agenda", "Financeiro", "Documentos", "Hist\u00f3rico", "Tarefas"]);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();

    fireEvent.click(within(tablist).getByRole("tab", { name: "Agenda" }));
    expect(onValueChange).toHaveBeenCalledWith("agenda");

    rerender(<crm.ProfileTabs state="loading" />);
    expect(screen.getByRole("tab", { name: "Resumo" })).toBeDisabled();

    rerender(<crm.ProfileTabs state="blocked" />);
    expect(screen.getByRole("tab", { name: "Resumo" }).closest(".tcrm-profile-tabs")).toHaveClass("tcrm-profile-tabs--blocked");
  });

  it("renders official student profile overview and action-rail defaults with callbacks", () => {
    const onOverviewAction = vi.fn();
    const onRailAction = vi.fn();

    render(
      <div>
        <crm.StudentProfileOverviewGrid density="compact" onAction={onOverviewAction} />
        <crm.StudentProfileActionRail density="compact" onAction={onRailAction} />
      </div>
    );

    expect(screen.getByRole("heading", { name: "1. Estado operacional" })).toBeInTheDocument();
    expect(screen.getByText("2. Agenda próxima")).toBeInTheDocument();
    expect(screen.getByText("Próximas ações")).toBeInTheDocument();
    expect(screen.getByText("Última conversa")).toBeInTheDocument();
    expect(document.querySelector(".tcrm-student-profile-overview-grid--compact")).toHaveAttribute("data-density", "compact");
    expect(document.querySelector(".tcrm-student-profile-action-rail--compact")).toHaveAttribute("data-density", "compact");
    expect(document.querySelectorAll(".tcrm-student-profile-action-rail__section")).toHaveLength(4);
    expect(document.querySelector(".tcrm-student-profile-action-rail__quick-actions")).toBeTruthy();
    expect(document.querySelector(".tcrm-student-profile-overview-grid .tl-list--dense")).toBeTruthy();
    const compactRail = document.querySelector(".tcrm-student-profile-action-rail--compact") as HTMLElement;
    expect(within(compactRail).getByText("Reformer Iniciante").closest(".tl-list-item__action")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Ver agenda" }));
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(onOverviewAction).toHaveBeenCalledWith("open-schedule");
    expect(onRailAction).toHaveBeenCalledWith("message");
  });

  it("renders the official class operational detail with domain actions", () => {
    const onAction = vi.fn();
    const onStudentAction = vi.fn();
    render(
      <crm.ClassOperationalDetail
        onAction={onAction}
        onStudentAction={onStudentAction}
        students={[{ id: "felipe", name: "Felipe Andrade", avatarSrc: "/felipe-source.png", status: "warned" }]}
      />
    );

    expect(screen.getByText("Professor da aula")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Alunos esperados" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Reposições e vagas" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Histórico da aula" })).toBeInTheDocument();
    expect(document.querySelector("img[src='/felipe-source.png']")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Ver detalhes" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir opções de Felipe Andrade" }));
    fireEvent.click(screen.getByText("1 vaga aberta"));

    expect(onAction).toHaveBeenCalledWith("view-students");
    expect(onAction).toHaveBeenCalledWith("open-vacancy");
    expect(onStudentAction).toHaveBeenCalledWith("felipe");
  });

  it("renders ActivityFeed as the source-shaped history panel with real controls", () => {
    const onDateFilter = vi.fn();
    const onTypeFilter = vi.fn();
    const onExport = vi.fn();
    const onItemOpen = vi.fn();

    const { rerender } = render(
      <crm.ActivityFeed
        onDateFilter={onDateFilter}
        onExport={onExport}
        onItemOpen={onItemOpen}
        onTypeFilter={onTypeFilter}
      />
    );

    const feed = screen.getByLabelText("Histórico de hoje");
    expect(feed).toHaveAttribute("data-component", "ActivityFeed");
    expect(feed).toHaveAttribute("data-state", "source");
    expect(screen.getByRole("heading", { name: "Histórico de hoje" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reposição confirmada/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Bloqueio resolvido/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Hoje/ }));
    fireEvent.click(screen.getByRole("option", { name: "Hoje" }));
    fireEvent.click(screen.getByRole("button", { name: /Todos os tipos/ }));
    fireEvent.click(screen.getByRole("option", { name: "Todos os tipos" }));
    fireEvent.click(screen.getByRole("button", { name: "Exportar histórico" }));
    fireEvent.click(screen.getByRole("button", { name: /Comprovante validado/ }));

    expect(onDateFilter).toHaveBeenCalledTimes(1);
    expect(onTypeFilter).toHaveBeenCalledTimes(1);
    expect(onExport).toHaveBeenCalledTimes(1);
    expect(onItemOpen).toHaveBeenCalledWith(expect.objectContaining({ id: "receipt-validated" }));

    rerender(<crm.ActivityFeed state="loading" />);
    expect(screen.getByLabelText("Histórico de hoje")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Carregando histórico")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Hoje/ })).toBeDisabled();

    rerender(<crm.ActivityFeed state="empty" />);
    expect(screen.getByText("Nenhum histórico hoje")).toBeInTheDocument();

    rerender(<crm.ActivityFeed state="blocked" />);
    expect(screen.getByText("Histórico bloqueado")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Todos os tipos/ })).toBeDisabled();
  });

  it("renders ActivityFeed panel as an official tabbed activity list", () => {
    const onPanelFilter = vi.fn();
    const onPanelTabChange = vi.fn();
    const onItemOpen = vi.fn();

    const { rerender } = render(
      <crm.ActivityFeed
        onItemOpen={onItemOpen}
        onPanelFilter={onPanelFilter}
        onPanelTabChange={onPanelTabChange}
        variant="panel"
      />
    );

    const feed = screen.getByLabelText("Histórico de hoje");
    expect(feed).toHaveAttribute("data-component", "ActivityFeed");
    expect(feed).toHaveAttribute("data-variant", "panel");
    expect(screen.getByRole("group", { name: "Filtrar atividades" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Casos" }));
    fireEvent.click(screen.getByRole("button", { name: "Filtrar painel de atividade" }));
    fireEvent.click(screen.getByRole("button", { name: /Abrir atividade Comprovante validado/ }));

    expect(onPanelTabChange).toHaveBeenCalledWith("cases");
    expect(onPanelFilter).toHaveBeenCalledTimes(1);
    expect(onItemOpen).toHaveBeenCalledWith(expect.objectContaining({ id: "receipt-validated" }));

    rerender(<crm.ActivityFeed state="loading" variant="panel" />);
    expect(screen.getByText("Carregando atividades")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Todas" })).toBeDisabled();
  });

  it("renders official compact kanban and calendar contracts with callbacks", () => {
    const onCardOpen = vi.fn();
    const onColumnAdd = vi.fn();
    const onPreviousMonth = vi.fn();
    const onViewChange = vi.fn();
    const onSelect = vi.fn();
    const onEventOpen = vi.fn();
    const onCreate = vi.fn();

    render(
      <div>
        <crm.KanbanBoard aria-label="Kanban compacto" density="compact">
          <crm.KanbanColumn footer={<button onClick={onColumnAdd} type="button">Adicionar caso</button>} title="Entrada">
            <crm.KanbanCard footer="Atualizado hoje" layout="compact" meta="Conta · Prioridade alta" onSelect={onCardOpen} title="Revisar contrato" />
          </crm.KanbanColumn>
        </crm.KanbanBoard>
        <crm.CompactCalendar
          onCreate={onCreate}
          onEventOpen={onEventOpen}
          onPreviousMonth={onPreviousMonth}
          onSelect={onSelect}
          onViewChange={onViewChange}
        />
      </div>
    );

    expect(screen.getByLabelText("Kanban compacto")).toHaveAttribute("data-density", "compact");
    expect(screen.getByText("Atualizado hoje")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Revisar contrato/ }));
    fireEvent.click(screen.getByRole("button", { name: "Adicionar caso" }));
    expect(onCardOpen).toHaveBeenCalledTimes(1);
    expect(onColumnAdd).toHaveBeenCalledTimes(1);

    expect(screen.getByLabelText("Calendario compacto")).toHaveAttribute("data-component", "CompactCalendar");
    fireEvent.click(screen.getByRole("button", { name: "Mes anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Semana" }));
    fireEvent.click(screen.getByRole("button", { name: "9" }));
    fireEvent.click(screen.getByRole("button", { name: /Abrir Restricao de conta/ }));
    fireEvent.click(screen.getByRole("button", { name: "Novo compromisso" }));

    expect(onPreviousMonth).toHaveBeenCalledTimes(1);
    expect(onViewChange).toHaveBeenCalledWith("week");
    expect(onSelect).toHaveBeenCalledWith("9");
    expect(onEventOpen).toHaveBeenCalledWith(expect.objectContaining({ id: "restriction" }));
    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it("renders official Image 11 channel and composer panels with callbacks", () => {
    const onQueueSelect = vi.fn();
    const onStatusSelect = vi.fn();
    const onComposerAction = vi.fn();

    const { rerender } = render(
      <div>
        <crm.ChannelStatusPanel onQueueSelect={onQueueSelect} onStatusSelect={onStatusSelect} />
        <crm.ComposerPanel onAction={onComposerAction} />
      </div>
    );

    expect(screen.getByText("Status WhatsApp").closest("[data-component='ChannelStatusPanel']")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Fila media: 12" }));
    fireEvent.click(screen.getByRole("button", { name: "Conectado" }));
    expect(onQueueSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "medium" }));
    expect(onStatusSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "connected" }));

    const composerActions = within(screen.getByRole("group", { name: "Acoes do composer" }));
    fireEvent.click(composerActions.getByRole("button", { name: "Anexar arquivo" }));
    expect(onComposerAction).toHaveBeenCalledWith(expect.objectContaining({ id: "attach" }));

    rerender(
      <div>
        <crm.ChannelStatusPanel disabled />
        <crm.ComposerPanel disabled />
      </div>
    );
    expect(screen.getByRole("button", { name: "Fila media: 12" })).toBeDisabled();
    expect(within(screen.getByRole("group", { name: "Acoes do composer" })).getByRole("button", { name: "Anexar arquivo" })).toBeDisabled();
  });

  it("renders the official compact Image 11 conversation list with consumer callbacks", () => {
    const onSearchChange = vi.fn();
    const onSearchFilter = vi.fn();
    const onFilterChange = vi.fn();
    const onConversationSelect = vi.fn();
    const onNextPage = vi.fn();

    render(
      <crm.ConversationList
        layout="compact"
        onConversationSelect={onConversationSelect}
        onFilterChange={onFilterChange}
        onNextPage={onNextPage}
        onSearchChange={onSearchChange}
        onSearchFilter={onSearchFilter}
      />
    );

    const list = screen.getByLabelText("Lista de conversas");
    expect(list).toHaveAttribute("data-layout", "compact");
    expect(screen.getAllByRole("button", { name: /Abrir conversa de/ })).toHaveLength(6);
    fireEvent.change(screen.getByRole("searchbox", { name: "Buscar conversas" }), { target: { value: "Ana" } });
    fireEvent.click(screen.getByRole("button", { name: "Abrir filtros" }));
    fireEvent.click(screen.getByRole("button", { name: /WhatsApp/ }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir conversa de Ana Paula Santos" }));
    fireEvent.click(screen.getByRole("button", { name: "Próxima página" }));

    expect(onSearchChange).toHaveBeenCalledWith("Ana");
    expect(onSearchFilter).toHaveBeenCalledTimes(1);
    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({ id: "whatsapp" }));
    expect(onConversationSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "ana-paula" }));
    expect(onNextPage).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Exibindo 6 de 24 conversas")).toBeInTheDocument();
  });

  it("renders the official compact Image 11 conversation thread and preserves message variants", () => {
    const onAction = vi.fn();
    const onAttach = vi.fn();
    const onChannelClick = vi.fn();
    const onDocument = vi.fn();
    const onSend = vi.fn();
    const onSendOptions = vi.fn();
    const onStatusClick = vi.fn();
    const onTemplateOpen = vi.fn();
    const onUseSuggestion = vi.fn();

    render(
      <crm.ConversationThread
        layout="compact"
        onAction={onAction}
        onAttach={onAttach}
        onChannelClick={onChannelClick}
        onDocument={onDocument}
        onSend={onSend}
        onSendOptions={onSendOptions}
        onStatusClick={onStatusClick}
        onTemplateOpen={onTemplateOpen}
        onUseSuggestion={onUseSuggestion}
      />
    );

    const thread = screen.getByLabelText("Conversa selecionada");
    expect(thread).toHaveAttribute("data-component", "ConversationThread");
    expect(thread).toHaveAttribute("data-layout", "compact");
    expect(screen.getByText(/Claro, Ana Paula/).closest(".tl-message-bubble")).toHaveClass("tl-message-bubble--outbound");
    expect(screen.getByText(/Cliente prefere periodo/).closest(".tl-message-bubble")).toHaveClass("tl-message-bubble--internal");

    fireEvent.click(screen.getByRole("button", { name: "WhatsApp" }));
    fireEvent.click(screen.getByRole("button", { name: "Em atendimento" }));
    fireEvent.click(screen.getByRole("button", { name: "Buscar na conversa" }));
    fireEvent.click(screen.getByRole("button", { name: "Usar sugestao" }));
    fireEvent.click(screen.getByRole("button", { name: "Anexar arquivo" }));
    fireEvent.click(screen.getByRole("button", { name: "Inserir documento" }));
    fireEvent.click(screen.getByRole("button", { name: "Templates" }));
    fireEvent.click(screen.getByRole("button", { name: "Mais opcoes de envio" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Responder pelo WhatsApp" }), { target: { value: "Mensagem de teste" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));

    expect(onChannelClick).toHaveBeenCalledTimes(1);
    expect(onStatusClick).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith("search");
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(onDocument).toHaveBeenCalledTimes(1);
    expect(onSend).toHaveBeenCalledWith("Mensagem de teste");
    expect(onSendOptions).toHaveBeenCalledTimes(1);
    expect(onTemplateOpen).toHaveBeenCalledTimes(1);
    expect(onUseSuggestion).toHaveBeenCalledTimes(1);
  });

  it("renders the official Image 11 copilot panel with consumer-controlled commands", () => {
    const onCopy = vi.fn();
    const onCreateTask = vi.fn();
    const onInsert = vi.fn();
    const onInsertMenu = vi.fn();

    const { rerender } = render(
      <crm.CopilotPanel onCopyTarget={onCopy} onCreateTask={onCreateTask} onInsert={onInsert} onInsertMenu={onInsertMenu} />
    );

    const panel = screen.getByLabelText("Painel de copiloto");
    expect(panel).toHaveAttribute("data-component", "CopilotPanel");
    expect(screen.getByText("Resumo da conversa")).toBeInTheDocument();
    expect(screen.getByText("Proxima melhor acao")).toBeInTheDocument();
    expect(screen.getByText("Sugestao do agente")).toBeInTheDocument();
    expect(screen.queryByText("suggestion")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Copiar resumo" }));
    fireEvent.click(screen.getByRole("button", { name: "Copiar proxima acao" }));
    fireEvent.click(screen.getByRole("button", { name: "Copiar sugestao" }));
    fireEvent.click(screen.getByRole("button", { name: "Criar tarefa" }));
    fireEvent.click(screen.getByRole("button", { name: "Inserir mensagem" }));
    fireEvent.click(screen.getByRole("button", { name: "Mais opcoes de insercao" }));

    expect(onCopy.mock.calls.map(([target]) => target)).toEqual(["summary", "next-action", "suggestion"]);
    expect(onCreateTask).toHaveBeenCalledTimes(1);
    expect(onInsert).toHaveBeenCalledTimes(1);
    expect(onInsertMenu).toHaveBeenCalledTimes(1);

    rerender(<crm.CopilotPanel disabled />);
    expect(screen.getByRole("button", { name: "Copiar resumo" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Inserir mensagem" })).toBeDisabled();
  });

  it("renders OperationActivityTable as the source-shaped operation activity table", () => {
    const onRowOpen = vi.fn();
    const onViewAll = vi.fn();

    const { rerender } = render(<crm.OperationActivityTable onRowOpen={onRowOpen} onViewAll={onViewAll} selectedId="marina-proof" />);

    const table = screen.getByLabelText("Atividade recente");
    expect(table).toHaveAttribute("data-component", "OperationActivityTable");
    expect(table).toHaveAttribute("data-state", "source");
    expect(screen.getByRole("heading", { name: "Atividade recente" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Comprovante da Marina/ })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: /Comprovante da Marina/ }));
    fireEvent.click(screen.getByRole("button", { name: /Ver hist/ }));
    expect(onRowOpen).toHaveBeenCalledWith(expect.objectContaining({ id: "marina-proof" }));
    expect(onViewAll).toHaveBeenCalledTimes(1);

    rerender(<crm.OperationActivityTable state="loading" />);
    expect(screen.getByLabelText("Atividade recente")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Carregando atividade")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ver hist/ })).toBeDisabled();

    rerender(<crm.OperationActivityTable state="empty" />);
    expect(screen.getByText("Nenhuma atividade recente")).toBeInTheDocument();

    rerender(<crm.OperationActivityTable state="blocked" />);
    expect(screen.getByText("Atividade bloqueada")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ver hist/ })).toBeDisabled();
  });

  it("renders PageQuickFilters as source-shaped interactive rail filters", () => {
    const onSelect = vi.fn();
    const onItemSelect = vi.fn();
    const onCreateFilter = vi.fn();

    const { rerender } = render(
      <crm.PageQuickFilters
        actions={<button onClick={onCreateFilter} type="button">Novo filtro</button>}
        aria-label="Filtros rápidos"
        items={[
          { id: "mine", icon: "user", label: "Minhas pendências", count: "12", selected: true },
          { id: "blocked", icon: "lock", label: "Bloqueadas", tone: "danger" }
        ]}
        onItemSelect={onItemSelect}
        onSelect={onSelect}
      />
    );

    const filters = screen.getByLabelText("Filtros rápidos");
    expect(filters).toHaveAttribute("data-component", "PageQuickFilters");
    expect(filters).toHaveAttribute("data-selection-tone", "strong");
    expect(filters).toHaveAttribute("data-state", "source");
    expect(screen.getByRole("button", { name: /Minhas pendências/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("12")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Bloqueadas/ }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "blocked", tone: "danger" }));
    expect(onItemSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "blocked", tone: "danger" }));
    fireEvent.click(screen.getByRole("button", { name: "Novo filtro" }));
    expect(onCreateFilter).toHaveBeenCalledTimes(1);

    rerender(<crm.PageQuickFilters aria-label="Filtros rápidos" state="loading" />);
    expect(screen.getByLabelText("Filtros rápidos")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Carregando filtros rápidos")).toBeInTheDocument();

    rerender(<crm.PageQuickFilters aria-label="Filtros rápidos" items={[]} state="empty" />);
    expect(screen.getByText("Nenhum filtro rápido")).toBeInTheDocument();

    rerender(
      <crm.PageQuickFilters
        aria-label="Filas"
        items={[{ id: "today", icon: "calendar", label: "Hoje", count: "12", selected: true }]}
        selectionTone="soft"
      />
    );
    expect(screen.getByLabelText("Filas")).toHaveAttribute("data-selection-tone", "soft");
    expect(screen.getByRole("button", { name: /Hoje/ })).toHaveClass("tcrm-page-quick-filters__item--selection-soft");

    rerender(
      <crm.PageQuickFilters
        aria-label="Filtros rápidos"
        items={[{ id: "mine", icon: "user", label: "Minhas pendências" }]}
        state="blocked"
      />
    );
    expect(screen.getByText("Filtros rápidos bloqueados")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Minhas pendências/ })).toBeDisabled();
  });

  it("renders KanbanBoard lanes inside one shared surface next to the quick-filter rail", () => {
    const { container } = render(
      <crm.KanbanBoard rail={<crm.PageQuickFilters aria-label="Filtros rápidos" items={[]} />}>
        <crm.KanbanColumn count={1} title="Novo">
          <crm.KanbanCard title="Pendência nova" />
        </crm.KanbanColumn>
        <crm.KanbanColumn count={0} title="Resolvido" />
      </crm.KanbanBoard>
    );

    const board = container.querySelector(".tcrm-kanban-board");
    const rail = container.querySelector(".tcrm-kanban-board__rail");
    const lanes = container.querySelector(".tcrm-kanban-board__lanes");

    expect(board).toBeInTheDocument();
    expect(rail).toBeInTheDocument();
    expect(lanes).toBeInTheDocument();
    expect(lanes?.querySelectorAll(".tcrm-kanban-column")).toHaveLength(2);
    expect(rail?.querySelector(".tcrm-page-quick-filters")).toBeInTheDocument();
  });

  it("renders PageFilterBar as source-shaped interactive page filters", () => {
    const onSearchChange = vi.fn();
    const onFilterSelect = vi.fn();
    const onFilterValueChange = vi.fn();
    const onAdvancedFilters = vi.fn();
    const onCreateTask = vi.fn();

    const { rerender } = render(
      <crm.PageFilterBar
        actions={<button onClick={onCreateTask} type="button">Criar tarefa</button>}
        aria-label="Filtros da página"
        leadingActions={<button type="button">Semana anterior</button>}
        filters={[
          {
            id: "owner",
            kind: "multi",
            label: "Dono",
            options: [
              { value: "recepcao", label: "Recepção", icon: "user" },
              { value: "financeiro", label: "Financeiro", icon: "coins" }
            ]
          }
        ]}
        onFilterSelect={onFilterSelect}
        onFilterValueChange={onFilterValueChange}
        onSearchChange={onSearchChange}
        onSearchFilter={onAdvancedFilters}
        query=""
        searchAriaLabel="Buscar tarefas"
        searchFilterLabel="Abrir filtros avançados"
        searchPlaceholder="Buscar tarefas..."
      />
    );

    const bar = screen.getByLabelText("Filtros da página");
    expect(bar).toHaveAttribute("data-component", "PageFilterBar");
    expect(bar).toHaveAttribute("data-state", "source");
    expect(within(bar).getByRole("button", { name: "Semana anterior" }).closest(".tcrm-page-filter-bar__leading-actions")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Ana" } });
    fireEvent.click(within(bar).getByRole("button", { name: "Abrir filtros avançados" }));
    fireEvent.click(within(bar).getByRole("button", { name: /Dono/ }));
    fireEvent.click(screen.getByRole("option", { name: /Recep/ }));
    fireEvent.click(within(bar).getByRole("button", { name: "Criar tarefa" }));

    expect(onSearchChange).toHaveBeenCalledWith("Ana");
    expect(onAdvancedFilters).toHaveBeenCalledTimes(1);
    expect(onFilterValueChange).toHaveBeenCalledWith(expect.objectContaining({ id: "owner" }), ["recepcao"]);
    expect(onCreateTask).toHaveBeenCalledTimes(1);

    rerender(<crm.PageFilterBar aria-label="Filtros da página" state="loading" />);
    expect(screen.getByLabelText("Filtros da página")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("searchbox")).toBeDisabled();
  });

  it("renders PageFilterBar without search for overview pages while keeping filters and actions interactive", () => {
    const onFilterValueChange = vi.fn();
    const onCreateCharge = vi.fn();

    render(
      <crm.PageFilterBar
        actions={<button onClick={onCreateCharge} type="button">Nova cobrança</button>}
        aria-label="Filtros financeiros"
        filters={[
          {
            id: "period",
            kind: "quick",
            label: "Hoje",
            selected: true
          },
          {
            id: "unit",
            label: "Unidade",
            options: [
              { value: "matriz", label: "Matriz", icon: "building" },
              { value: "pinheiros", label: "Pinheiros", icon: "building" }
            ]
          }
        ]}
        onFilterValueChange={onFilterValueChange}
        searchVisible={false}
      />
    );

    const bar = screen.getByLabelText("Filtros financeiros");
    expect(bar).toHaveAttribute("data-component", "PageFilterBar");
    expect(bar).toHaveClass("tcrm-page-filter-bar--without-search");
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();

    fireEvent.click(within(bar).getByRole("button", { name: /Unidade/ }));
    fireEvent.click(screen.getByRole("option", { name: "Matriz" }));
    fireEvent.click(within(bar).getByRole("button", { name: "Nova cobrança" }));

    expect(onFilterValueChange).toHaveBeenCalledWith(expect.objectContaining({ id: "unit" }), "matriz");
    expect(onCreateCharge).toHaveBeenCalledTimes(1);
  });

  it("renders PageFilterBar advanced filters in the official modal surface", () => {
    const onFilterValueChange = vi.fn();

    render(
      <crm.PageFilterBar
        advancedFiltersDescription="Use para filtros adicionais da pagina."
        advancedFiltersLabel="Mais filtros"
        advancedFiltersSurface="modal"
        advancedFiltersTitle="Filtros avancados"
        aria-label="Filtros da pagina"
        filters={[
          {
            id: "stage",
            label: "Etapa",
            options: [
              { value: "novo", label: "Novo", icon: "user" },
              { value: "qualificado", label: "Qualificado", icon: "check" }
            ],
            value: "novo"
          },
          {
            id: "origin",
            label: "Origem",
            options: [
              { value: "whatsapp", label: "WhatsApp", icon: "user" },
              { value: "landing", label: "Landing", icon: "calendar" }
            ],
            placement: "advanced"
          },
          {
            id: "quality",
            kind: "multi",
            label: "Qualidade",
            options: [
              { value: "bom-fit", label: "Bom fit", icon: "check" },
              { value: "fora-perfil", label: "Fora de perfil", icon: "alert" }
            ],
            placement: "advanced",
            values: ["bom-fit"]
          }
        ]}
        onFilterValueChange={onFilterValueChange}
        searchAriaLabel="Buscar lead"
        searchPlaceholder="Buscar leads..."
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Mais filtros" }));
    const dialog = screen.getByRole("dialog", { name: "Filtros avancados" });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass("tcrm-page-filter-bar__advanced-modal");
    expect(within(dialog).getByText("Use para filtros adicionais da pagina.")).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole("button", { name: /Origem/ }));
    fireEvent.click(screen.getByRole("option", { name: /WhatsApp/ }));

    expect(onFilterValueChange).toHaveBeenCalledWith(expect.objectContaining({ id: "origin" }), "whatsapp");
  });

  it("renders PageFilterBar stacked layout for source pages with quick filters and a second filter row", () => {
    const onFilterSelect = vi.fn();
    const onFilterValueChange = vi.fn();

    render(
      <crm.PageFilterBar
        actions={<button type="button">Exportar</button>}
        advancedFiltersLabel="Mais filtros"
        advancedFiltersSurface="modal"
        aria-label="Filtros de movimentacoes"
        filters={[
          { id: "today", kind: "quick", label: "Hoje", selected: true },
          { id: "week", kind: "quick", label: "Esta semana" },
          { id: "type", label: "Tipo", options: [{ value: "mensalidade", label: "Mensalidade" }] },
          { id: "status", label: "Status", options: [{ value: "a-vencer", label: "A vencer" }] },
          { id: "origin", label: "Origem", placement: "advanced", options: [{ value: "whatsapp", label: "WhatsApp" }] }
        ]}
        layout="stacked"
        onFilterSelect={onFilterSelect}
        onFilterValueChange={onFilterValueChange}
        searchPlaceholder="Buscar movimentacao..."
      />
    );

    const bar = screen.getByLabelText("Filtros de movimentacoes");
    expect(bar).toHaveAttribute("data-layout", "stacked");
    expect(bar).toHaveClass("tcrm-page-filter-bar--stacked");
    expect(bar.querySelector(".tcrm-page-filter-bar__row--top")).toBeInTheDocument();
    expect(bar.querySelector(".tcrm-page-filter-bar__row--bottom")).toBeInTheDocument();

    fireEvent.click(within(bar).getByRole("button", { name: "Hoje" }));
    fireEvent.click(within(bar).getByRole("button", { name: /Status/ }));
    fireEvent.click(screen.getByRole("option", { name: "A vencer" }));
    fireEvent.click(within(bar).getByRole("button", { name: "Mais filtros" }));

    expect(onFilterSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "today" }));
    expect(onFilterValueChange).toHaveBeenCalledWith(expect.objectContaining({ id: "status" }), "a-vencer");
    expect(screen.getByRole("dialog", { name: "Filtros" })).toBeInTheDocument();
  });

  it("renders PageFilterBar stacked-filters layout with every filter in the bottom row", () => {
    render(
      <crm.PageFilterBar
        aria-label="Filtros de oportunidades"
        filters={[
          { id: "today", kind: "quick", label: "Hoje" },
          { id: "origin", label: "Origem" },
          { id: "status", label: "Status", placement: "advanced" }
        ]}
        layout="stacked-filters"
      />
    );

    const bar = screen.getByLabelText("Filtros de oportunidades");
    const top = bar.querySelector(".tcrm-page-filter-bar__row--top");
    const bottom = bar.querySelector(".tcrm-page-filter-bar__row--bottom");
    expect(top).not.toContainElement(within(bar).getByRole("button", { name: "Hoje" }));
    expect(bottom).toContainElement(within(bar).getByRole("button", { name: "Hoje" }));
    expect(bottom).toContainElement(within(bar).getByRole("button", { name: /Origem/ }));
  });

  it("renders PageFilterBar compact density for source pages with many short filters", () => {
    render(
      <crm.PageFilterBar
        aria-label="Filtros compactos"
        density="compact"
        filters={[
          { id: "type", label: "Tipo" },
          { id: "risk", label: "Risco" },
          { id: "origin", label: "Origem" },
          { id: "status", label: "Status" },
          { id: "owner", label: "Responsável" }
        ]}
        searchPlaceholder="Buscar aprovações..."
      />
    );

    const bar = screen.getByLabelText("Filtros compactos");
    expect(bar).toHaveAttribute("data-density", "compact");
    expect(bar).toHaveClass("tcrm-page-filter-bar--compact");
    expect(within(bar).getByRole("button", { name: /Status/ })).toBeInTheDocument();
    expect(within(bar).getByRole("button", { name: /Responsável/ })).toBeInTheDocument();
  });

  it("renders PageFilterBar comfortable density for spacious stacked source filters", () => {
    render(
      <crm.PageFilterBar
        aria-label="Filtros confortaveis"
        density="comfortable"
        filters={[{ id: "today", kind: "quick", label: "Hoje" }, { id: "status", label: "Status" }]}
        layout="stacked"
      />
    );

    const bar = screen.getByLabelText("Filtros confortaveis");
    expect(bar).toHaveAttribute("data-density", "comfortable");
    expect(bar).toHaveClass("tcrm-page-filter-bar--comfortable", "tcrm-page-filter-bar--stacked");
  });

  it("renders PageFilterBar tight density for inline source pages that prioritize search width", () => {
    render(
      <crm.PageFilterBar
        aria-label="Filtros densos"
        density="tight"
        actions={<button className="tcrm-page-filter-bar__primary-action" type="button">Novo pedido</button>}
        filters={[
          { id: "status", label: "Status" },
          { id: "validity", label: "Validade" },
          { id: "class", label: "Turma/horário" },
          { id: "origin", label: "Origem" },
          { id: "owner", label: "Responsável" }
        ]}
        searchPlaceholder="Buscar aluno ou reposição..."
      />
    );

    const bar = screen.getByLabelText("Filtros densos");
    expect(bar).toHaveAttribute("data-density", "tight");
    expect(bar).toHaveClass("tcrm-page-filter-bar--tight");
    expect(within(bar).getByRole("searchbox", { name: /Buscar/ })).toHaveAttribute("placeholder", "Buscar aluno ou reposição...");
    expect(within(bar).getByRole("button", { name: /Novo pedido/ })).toBeInTheDocument();
  });

  it("renders PageFilterBar with embedded search filter action for source search shells", () => {
    const onAdvancedFilters = vi.fn();

    render(
      <crm.PageFilterBar
        aria-label="Filtros de tarefas"
        onSearchFilter={onAdvancedFilters}
        searchFilterPlacement="embedded"
        searchPlaceholder="Buscar tarefas..."
      />
    );

    const bar = screen.getByLabelText("Filtros de tarefas");
    const searchRoot = within(bar).getByRole("searchbox").closest(".tl-search-input");
    expect(searchRoot).toHaveClass("tl-search-input--filter-embedded");

    fireEvent.click(within(bar).getByRole("button", { name: /Abrir filtros/ }));
    expect(onAdvancedFilters).toHaveBeenCalledTimes(1);
  });

  it("composes CrmKanbanPage with official stack spacing and compact rail density", () => {
    render(
      <crm.CrmKanbanPage
        filterBar={<div>Filtros</div>}
        kanbanDensity="comfortable"
        laneSurface="separate"
        quickFilters={<div>Atalhos</div>}
        railDensity="compact"
        title="Operação"
      >
        <crm.KanbanColumn title="Novo" />
      </crm.CrmKanbanPage>
    );

    expect(screen.getByText("Filtros").closest(".tcrm-kanban-page-stack")).toHaveClass("tcrm-page-family-stack");
    expect(screen.getByRole("list")).toHaveClass("tcrm-kanban-board--compact-rail");
    expect(screen.getByRole("list")).toHaveClass("tcrm-kanban-board--comfortable", "tcrm-kanban-board--separate-lanes");
    expect(screen.getByRole("list")).toHaveAttribute("data-lane-surface", "separate");
    expect(screen.getByRole("list")).toHaveAttribute("data-rail-density", "compact");
  });

  it("exposes the operation page-header rhythm through CrmKanbanPage", () => {
    render(
      <crm.CrmKanbanPage pageHeaderRhythm="operation" title="Operação">
        <crm.KanbanColumn title="Novo" />
      </crm.CrmKanbanPage>
    );

    expect(screen.getByRole("heading", { name: "Operação" }).closest(".tcrm-product-shell-stage")).toHaveClass("tcrm-product-shell-stage--page-header-operation");
  });

  it("exposes the official finance kanban geometry", () => {
    render(
      <crm.CrmKanbanPage layoutVariant="finance" title="Financeiro">
        <crm.KanbanColumn title="A vencer" />
      </crm.CrmKanbanPage>
    );

    expect(screen.getByRole("list")).toHaveClass("tcrm-kanban-board--finance-lanes");
    expect(screen.getByRole("list").closest(".tcrm-kanban-page-stack")).toHaveClass("tcrm-kanban-page-stack--finance");
    expect(screen.getByRole("list")).toHaveAttribute("data-lane-width", "finance");
  });

  it("owns the commercial kanban inset, separate lanes, and wide tracks", () => {
    render(
      <crm.CrmKanbanPage layoutVariant="commercial" title="Vendas">
        <crm.KanbanColumn title="Novo"><span>Lead</span></crm.KanbanColumn>
      </crm.CrmKanbanPage>
    );

    const board = screen.getByRole("list");
    expect(board.closest(".tcrm-kanban-page-stack")).toHaveClass("tcrm-kanban-page-stack--commercial");
    expect(board).toHaveAttribute("data-lane-surface", "separate");
    expect(board).toHaveAttribute("data-lane-width", "commercial");
  });

  it("removes the commercial kanban inset on mobile viewports", () => {
    const styles = readFileSync(resolve(rootDir, "packages/crm/src/styles.css"), "utf8");

    expect(styles).toMatch(
      /@media \(max-width: 760px\) \{[\s\S]*?\.tcrm-kanban-page-stack--commercial \{[\s\S]*?padding-inline: 0;/,
    );
  });

  it("renders LeadTable as a DataTable-backed interactive lead table", () => {
    const onRowSelect = vi.fn();
    const onItemsPerPageClick = vi.fn();
    const onPreviousPage = vi.fn();
    const onNextPage = vi.fn();
    const rows: crm.LeadTableRow[] = [
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
        interest: "Busca avaliacao para dor lombar",
        quality: "Revisar",
        qualityTone: "warning",
        nextAction: "Agendar experimental",
        nextActionTone: "info",
        humanMode: "IA com revisao",
        lastActivity: "Ontem, 17:40",
        owner: "Sam"
      },
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
        interest: "Quer pilates duas vezes por semana",
        quality: "Aprovado",
        qualityTone: "success",
        nextAction: "Responder hoje",
        nextActionTone: "warning",
        humanMode: "Humano",
        lastActivity: "Hoje, 09:12",
        owner: "Recepcao",
        selected: true
      },
      {
        id: "lead-pedro",
        lead: "Pedro Lima",
        studio: "Studio Pinheiros",
        origin: "Indicacao",
        stage: "Matricula",
        fit: "Alto",
        fitTone: "success",
        priority: "Alta",
        priorityTone: "danger",
        interest: "Plano anual para casal",
        quality: "Aprovado",
        qualityTone: "success",
        nextAction: "Enviar contrato",
        nextActionTone: "success",
        humanMode: "Copiloto",
        lastActivity: "Hoje, 10:24",
        owner: "Comercial",
        disabled: true
      }
    ];

    const { container, rerender } = render(
      <crm.LeadTable
        onItemsPerPageClick={onItemsPerPageClick}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowSelect={onRowSelect}
        page={2}
        pageCount={3}
        rows={rows}
        totalLabel="11-13 de 30 leads"
      />
    );

    const table = screen.getByLabelText("Tabela de leads");
    expect(table).toHaveAttribute("data-component", "LeadTable");
    expect(table).toHaveAttribute("data-state", "source");
    expect(table.querySelector(".tl-table__row--selected")).toHaveTextContent("Ana Silva");

    fireEvent.click(screen.getByText("Marina Costa").closest("tr") as HTMLTableRowElement);
    fireEvent.click(screen.getByText("Pedro Lima").closest("tr") as HTMLTableRowElement);
    fireEvent.click(screen.getByRole("button", { name: "Alterar itens por pagina" }));
    fireEvent.click(screen.getByRole("button", { name: "Pagina anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Proxima pagina" }));

    expect(onRowSelect).toHaveBeenCalledTimes(1);
    expect(onRowSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "lead-marina" }));
    expect(onItemsPerPageClick).toHaveBeenCalledTimes(1);
    expect(onPreviousPage).toHaveBeenCalledTimes(1);
    expect(onNextPage).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Ordenar por Lead / studio" }));
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Ana Silva");

    rerender(<crm.LeadTable rows={[]} state="empty" />);
    expect(screen.getByText("Nenhum lead")).toBeInTheDocument();

    rerender(<crm.LeadTable state="loading" />);
    expect(screen.getByLabelText("Tabela de leads")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Carregando leads")).toBeInTheDocument();

    rerender(<crm.LeadTable rows={rows} state="blocked" />);
    expect(screen.getByText("Tabela bloqueada")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Marina Costa").closest("tr") as HTMLTableRowElement);
    expect(onRowSelect).toHaveBeenCalledTimes(1);
    expect(container.querySelector(".tcrm-lead-table__pagination")).toBeInTheDocument();
  });

  it("renders CrmRecordDrawer as the reusable operational drawer contract", () => {
    const onAction = vi.fn();
    const onOpenChange = vi.fn();
    const onTabChange = vi.fn();
    const actions: crm.CrmRecordDrawerAction[] = [
      { id: "open", label: "Abrir conversa", variant: "primary", leadingIcon: "message" },
      { id: "assign", label: "Assumir", leadingIcon: "user" }
    ];

    const { rerender } = render(
      <crm.CrmRecordDrawer
        actions={actions}
        description="Lead quente aguardando resposta humana."
        facts={[
          { id: "origin", label: "Origem", value: "WhatsApp", icon: "inbox" },
          { id: "owner", label: "Dono", value: "Recepcao", icon: "user" }
        ]}
        meta="Studio Vila Mariana"
        onAction={onAction}
        onOpenChange={onOpenChange}
        onTabChange={onTabChange}
        sections={[{ id: "summary", title: "Resumo", content: "Mensagem inicial pediu horario no fim da tarde." }]}
        status="Novo"
        tabs={[
          { id: "resumo", label: "Resumo", content: <p>Resumo do lead</p> },
          { id: "auditoria", label: "Auditoria", content: <p>Auditoria do lead</p> }
        ]}
        activeTab="resumo"
        title="Ana Silva"
      >
        <section>Conteudo especifico do consumidor</section>
      </crm.CrmRecordDrawer>
    );

    const dialog = screen.getByRole("dialog", { name: "Ana Silva" });
    expect(dialog).toHaveAttribute("data-component", "CrmRecordDrawer");
    expect(dialog).toHaveAttribute("data-state", "source");
    expect(screen.getByText("Studio Vila Mariana")).toBeInTheDocument();
    expect(screen.getByText("Origem")).toBeInTheDocument();
    expect(screen.getAllByText("Resumo").length).toBeGreaterThan(0);
    expect(screen.getByRole("tab", { name: "Resumo" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Resumo do lead")).toBeInTheDocument();
    expect(screen.getByText("Conteudo especifico do consumidor")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "Auditoria" }));
    expect(onTabChange).toHaveBeenCalledWith("auditoria");
    fireEvent.click(screen.getByRole("button", { name: "Abrir conversa" }));
    expect(onAction).toHaveBeenCalledWith(expect.objectContaining({ id: "open" }));

    fireEvent.click(screen.getByRole("button", { name: "Fechar painel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    rerender(<crm.CrmRecordDrawer actions={actions} description="Acesso restrito ao registro." state="blocked" title="Lead bloqueado" />);
    expect(screen.getByRole("dialog", { name: "Lead bloqueado" })).toHaveAttribute("data-state", "blocked");
    expect(screen.getByRole("button", { name: "Abrir conversa" })).toBeDisabled();

    rerender(<crm.CrmRecordDrawer description="Carregando detalhes do lead." state="loading" title="Carregando lead" />);
    expect(screen.getByRole("dialog", { name: "Carregando lead" })).toHaveAttribute("data-state", "loading");
    expect(screen.getByText("Carregando dados")).toBeInTheDocument();
  });

  it("renders CrmRecordDrawer inline for shell-embedded consumer routes", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <crm.CrmRecordDrawer
        facts={[{ id: "owner", label: "Dono", value: "Mariana", icon: "user" }]}
        inline
        onOpenChange={onOpenChange}
        open
        title="Ana Silva"
      />
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "false");
    expect(dialog).toHaveAttribute("data-component", "CrmRecordDrawer");
    expect(dialog).toHaveClass("tl-drawer--inline");
    expect(screen.getByRole("heading", { name: "Ana Silva" })).toBeInTheDocument();
    expect(screen.getByText("Mariana")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Fechar painel" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);

    rerender(<crm.CrmRecordDrawer inline open={false} title="Ana Silva" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders TaskQueueList as source-shaped interactive queue buttons", () => {
    const onSelect = vi.fn();

    const { rerender } = render(<crm.TaskQueueList onSelect={onSelect} />);

    const list = screen.getByLabelText("Filas");
    expect(list).toHaveAttribute("data-component", "TaskQueueList");
    expect(list).toHaveAttribute("data-state", "source");
    expect(screen.getByRole("button", { name: /Minhas tarefas/ })).toHaveAttribute("aria-current", "true");

    fireEvent.click(screen.getByRole("button", { name: /Hoje/ }));
    fireEvent.click(screen.getByRole("button", { name: /Atrasadas/ }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "today" }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "late", tone: "danger" }));

    rerender(
      <crm.TaskQueueList
        items={[
          { id: "my-tasks", label: "Minhas tarefas", count: "12", icon: "user", selected: true },
          { id: "today", label: "Hoje", count: "6", icon: "calendar", disabled: true }
        ]}
        onSelect={onSelect}
      />
    );
    expect(screen.getByRole("button", { name: /Hoje/ })).toBeDisabled();

    rerender(<crm.TaskQueueList state="loading" />);
    expect(screen.getByLabelText("Filas")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Carregando filas")).toBeInTheDocument();

    rerender(<crm.TaskQueueList state="empty" />);
    expect(screen.getByText("Nenhuma fila")).toBeInTheDocument();

    rerender(<crm.TaskQueueList state="blocked" />);
    expect(screen.getByText("Filas bloqueadas")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Minhas tarefas/ })).toBeDisabled();
  });

  it("renders TaskTable as a DataTable-backed interactive task table", () => {
    const onRowSelect = vi.fn();
    const onItemsPerPageClick = vi.fn();
    const onPreviousPage = vi.fn();
    const onNextPage = vi.fn();

    const { rerender } = render(
      <crm.TaskTable
        onItemsPerPageClick={onItemsPerPageClick}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowSelect={onRowSelect}
      />
    );

    const table = screen.getByLabelText("Tabela de tarefas");
    expect(table).toHaveAttribute("data-component", "TaskTable");
    expect(table).toHaveAttribute("data-state", "source");
    expect(screen.getByRole("row", { name: /Confirmar reposição da Ana/ })).toHaveClass("tl-table__row--selected");

    fireEvent.click(screen.getByRole("row", { name: /Validar comprovante/ }));
    fireEvent.click(screen.getByRole("button", { name: "Alterar itens por pagina" }));
    fireEvent.click(screen.getByRole("button", { name: "Pagina anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Proxima pagina" }));

    expect(onRowSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "receipt-marina" }));
    expect(onItemsPerPageClick).toHaveBeenCalledTimes(1);
    expect(onPreviousPage).toHaveBeenCalledTimes(1);
    expect(onNextPage).toHaveBeenCalledTimes(1);

    rerender(<crm.TaskTable state="loading" />);
    expect(screen.getByLabelText("Tabela de tarefas")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Carregando tarefas")).toBeInTheDocument();

    rerender(<crm.TaskTable state="empty" />);
    expect(screen.getByText("Nenhuma tarefa")).toBeInTheDocument();

    rerender(<crm.TaskTable state="blocked" />);
    expect(screen.getByText("Tabela bloqueada")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("row", { name: /Confirmar reposição da Ana/ }));
    expect(onRowSelect).toHaveBeenCalledTimes(1);
  });

  it("renders CrmWorklistTable as the configurable worklist table standard", () => {
    const onRowSelect = vi.fn();
    const onItemsPerPageClick = vi.fn();
    const onPreviousPage = vi.fn();
    const onNextPage = vi.fn();
    const onRowAction = vi.fn();
    const onSelectionChange = vi.fn();
    const rows = [
      { id: "ana", name: "Ana", owner: "Recepcao", status: "Aberta" },
      { id: "marina", name: "Marina", owner: "Financeiro", status: "Em andamento" }
    ];

    const { rerender } = render(
      <crm.CrmWorklistTable
        ariaLabel="Tabela padrao"
        caption="Legenda operacional"
        columns={[
          { key: "name", header: "Nome", sortable: true, render: (row) => <strong>{row.name}</strong> },
          { key: "owner", header: "Dono", sortable: true },
          { key: "status", header: "Status" }
        ]}
        density="compact"
        heading="Fila padrao"
        minTableWidth="760px"
        pagination={{
          itemsPerPage: "10",
          label: "1-2 de 2",
          onItemsPerPageClick,
          onNextPage,
          onPreviousPage
        }}
        rows={rows}
        rowActions={(row) => <button type="button" onClick={() => onRowAction(row.id)}>Abrir {row.name}</button>}
        selectable
        selectedRowIds={["ana"]}
        selectedRowId="ana"
        onSelectionChange={onSelectionChange}
        onRowSelect={onRowSelect}
      />
    );

    const table = screen.getByLabelText("Tabela padrao");
    expect(table).toHaveAttribute("data-component", "CrmWorklistTable");
    expect(table).toHaveAttribute("data-density", "compact");
    expect(table).toHaveClass("tcrm-worklist-table--compact");
    expect(table).toHaveAttribute("data-state", "source");
    expect(screen.getByRole("heading", { name: "Fila padrao" })).toBeInTheDocument();
    expect(screen.getByText("Legenda operacional")).toHaveClass("tcrm-worklist-table__caption");
    expect(screen.getByRole("row", { name: /Ana/ })).toHaveClass("tl-table__row--selected");
    expect(screen.getByRole("table")).toHaveStyle({ minWidth: "760px" });

    fireEvent.click(screen.getByRole("row", { name: /Marina/ }));
    fireEvent.click(screen.getByRole("button", { name: "Alterar itens por pagina" }));
    fireEvent.click(screen.getByRole("button", { name: "Pagina anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Proxima pagina" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir Ana" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Selecionar linha marina" }));

    expect(onRowSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "marina" }));
    expect(onRowAction).toHaveBeenCalledWith("ana");
    expect(onSelectionChange).toHaveBeenCalledWith("marina", true);
    expect(onItemsPerPageClick).toHaveBeenCalledTimes(1);
    expect(onPreviousPage).toHaveBeenCalledTimes(1);
    expect(onNextPage).toHaveBeenCalledTimes(1);

    rerender(<crm.CrmWorklistTable ariaLabel="Tabela padrao" columns={[{ key: "name", header: "Nome" }]} rows={rows} state="loading" />);
    expect(screen.getByLabelText("Tabela padrao")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Carregando lista")).toBeInTheDocument();

    rerender(<crm.CrmWorklistTable ariaLabel="Tabela padrao" columns={[{ key: "name", header: "Nome" }]} rows={rows} state="empty" />);
    expect(screen.getByText("Nenhum registro")).toBeInTheDocument();

    rerender(<crm.CrmWorklistTable ariaLabel="Tabela padrao" columns={[{ key: "name", header: "Nome" }]} rows={rows} state="blocked" />);
    expect(screen.getByText("Lista bloqueada")).toBeInTheDocument();
  });

  it("renders CrmDrawer as the reusable drawer frame", () => {
    const onClose = vi.fn();

    const { rerender } = render(
      <crm.CrmDrawer
        actions={[
          { id: "open", label: "Abrir origem", variant: "primary", fullWidth: true },
          { id: "assume", label: "Assumir" }
        ]}
        aria-label="Detalhe do registro"
        closeLabel="Fechar detalhe"
        eyebrow="Tarefa"
        facts={[
          { id: "origin", icon: "calendar", label: "Origem", value: "Agenda" },
          { id: "owner", icon: "user", label: "Dono", value: "Recepcao" }
        ]}
        headerOrder="label-title-status"
        onClose={onClose}
        placement="overlay"
        sections={[
          { id: "summary", title: "Resumo", variant: "card", content: <p>Secao dinamica</p> }
        ]}
        status="Aberta"
        title="Confirmar reposicao"
      >
        <p>Conteudo dinamico</p>
      </crm.CrmDrawer>
    );

    const drawer = screen.getByRole("complementary", { name: "Detalhe do registro" });
    expect(drawer).toHaveAttribute("data-component", "CrmDrawer");
    expect(drawer).toHaveAttribute("data-state", "open");
    expect(drawer).toHaveClass("tcrm-drawer-frame--overlay");
    expect(screen.getByText("Tarefa")).toBeInTheDocument();
    expect(screen.getByText("Aberta")).toBeInTheDocument();
    expect(screen.getByText("Origem")).toBeInTheDocument();
    expect(screen.getByText("Agenda")).toBeInTheDocument();
    expect(screen.getByText("Resumo")).toBeInTheDocument();
    expect(screen.getByText("Conteudo dinamico")).toBeInTheDocument();
    expect(screen.getByText("Abrir origem")).toBeInTheDocument();
    expect(screen.getByText("Assumir")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Fechar detalhe" }));
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(
      <crm.CrmDrawer aria-label="Detalhe carregando" loading title="Carregando">
        <p>Corpo</p>
      </crm.CrmDrawer>
    );
    expect(screen.getByRole("complementary", { name: "Detalhe carregando" })).toHaveAttribute("aria-busy", "true");

    rerender(
      <crm.CrmDrawer
        aria-label="Detalhe com cabecalho customizado"
        header={<header className="custom-drawer-header"><h2>Cabecalho customizado</h2></header>}
        title="Titulo estrutural"
      >
        <p>Corpo customizado</p>
      </crm.CrmDrawer>
    );
    expect(screen.getByRole("complementary", { name: "Detalhe com cabecalho customizado" })).toHaveClass("tcrm-drawer-frame");
    expect(screen.getByText("Cabecalho customizado")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Fechar painel" })).not.toBeInTheDocument();
  });

  it("renders InternalSecurityRulesPanel as the compact internal rules panel", () => {
    render(
      <crm.InternalSecurityRulesPanel
        primaryRules={["Regra primaria"]}
        secondaryRules={["Regra secundaria"]}
        title="Regras internas"
      />
    );

    expect(screen.getByText("Regras internas")).toBeInTheDocument();
    expect(screen.getByText("Regra primaria")).toBeInTheDocument();
    expect(screen.getByText("Regra secundaria")).toBeInTheDocument();
  });

  it("renders StudentTable as a DataTable-backed interactive student table", () => {
    const onRowSelect = vi.fn();
    const onItemsPerPageClick = vi.fn();
    const onPreviousPage = vi.fn();
    const onNextPage = vi.fn();

    const { rerender } = render(
      <crm.StudentTable
        density="compact"
        selectionTone="soft"
        onItemsPerPageClick={onItemsPerPageClick}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowSelect={onRowSelect}
      />
    );

    const table = screen.getByLabelText("Tabela de alunos");
    expect(table).toHaveAttribute("data-component", "StudentTable");
    expect(table).toHaveAttribute("data-density", "compact");
    expect(table).toHaveAttribute("data-selection-tone", "soft");
    expect(table).toHaveClass("tcrm-student-table--compact");
    expect(table).toHaveClass("tcrm-student-table--selection-soft");
    expect(table).toHaveAttribute("data-state", "source");
    expect(screen.getByRole("row", { name: /Ana Paula Martins/ })).toHaveClass("tl-table__row--selected");
    expect(table.querySelector(".tcrm-student-table__activity.tl-status-dot--info")).toBeTruthy();
    expect(table.querySelector(".tcrm-student-table__activity.tl-status-dot--danger")).toBeTruthy();

    fireEvent.click(screen.getByRole("row", { name: /João Pedro Silva/ }));
    fireEvent.click(screen.getByRole("button", { name: "Alterar itens por pagina" }));
    fireEvent.click(screen.getByRole("button", { name: "Pagina anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Proxima pagina" }));

    expect(onRowSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "joao-pedro" }));
    expect(onItemsPerPageClick).toHaveBeenCalledTimes(1);
    expect(onPreviousPage).toHaveBeenCalledTimes(1);
    expect(onNextPage).toHaveBeenCalledTimes(1);

    rerender(<crm.StudentTable state="loading" />);
    expect(screen.getByLabelText("Tabela de alunos")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Carregando alunos")).toBeInTheDocument();

    rerender(<crm.StudentTable state="empty" />);
    expect(screen.getByText("Nenhum aluno")).toBeInTheDocument();

    rerender(<crm.StudentTable state="blocked" />);
    expect(screen.getByText("Tabela bloqueada")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("row", { name: /Ana Paula Martins/ }));
    expect(onRowSelect).toHaveBeenCalledTimes(1);
  });

  it("renders ReplacementTable as a DataTable-backed interactive replacement table", () => {
    const onRowSelect = vi.fn();
    const onItemsPerPageClick = vi.fn();
    const onPreviousPage = vi.fn();
    const onNextPage = vi.fn();

    const { rerender } = render(
      <crm.ReplacementTable
        onItemsPerPageClick={onItemsPerPageClick}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onRowSelect={onRowSelect}
      />
    );

    const table = screen.getByLabelText("Tabela de reposições");
    expect(table).toHaveAttribute("data-component", "ReplacementTable");
    expect(table).toHaveAttribute("data-state", "source");
    expect(screen.getByRole("row", { name: /Ana Carolina Souza/ })).toHaveClass("tl-table__row--selected");

    fireEvent.click(screen.getByRole("row", { name: /Felipe Andrade/ }));
    fireEvent.click(screen.getByRole("button", { name: "Alterar itens por pagina" }));
    fireEvent.click(screen.getByRole("button", { name: "Pagina anterior" }));
    fireEvent.click(screen.getByRole("button", { name: "Proxima pagina" }));

    expect(onRowSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "felipe-andrade" }));
    expect(onItemsPerPageClick).toHaveBeenCalledTimes(1);
    expect(onPreviousPage).toHaveBeenCalledTimes(1);
    expect(onNextPage).toHaveBeenCalledTimes(1);

    rerender(<crm.ReplacementTable state="loading" />);
    expect(screen.getByLabelText("Tabela de reposições")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Carregando reposições")).toBeInTheDocument();

    rerender(<crm.ReplacementTable state="empty" />);
    expect(screen.getByText("Nenhuma reposição")).toBeInTheDocument();

    rerender(<crm.ReplacementTable state="blocked" />);
    expect(screen.getByText("Tabela bloqueada")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("row", { name: /Ana Carolina Souza/ }));
    expect(onRowSelect).toHaveBeenCalledTimes(1);
  });

  it("renders QuickReplyChips as accessible source-derived buttons with disabled and selected states", () => {
    const onSelect = vi.fn();

    render(
      <crm.QuickReplyChips
        onSelect={onSelect}
        items={[
          { id: "obrigatorio", label: "O que é obrigatório?" },
          { id: "depois", label: "Posso deixar para depois?", selected: true },
          { id: "bloqueado", label: "Bloqueado", disabled: true }
        ]}
      />
    );

    const group = screen.getByRole("group", { name: "Respostas rápidas" });
    const first = within(group).getByRole("button", { name: "O que é obrigatório?" });
    const selected = within(group).getByRole("button", { name: "Posso deixar para depois?" });
    const disabled = within(group).getByRole("button", { name: "Bloqueado" });

    expect(first).toHaveClass("tcrm-quick-reply-chip");
    expect(selected).toHaveAttribute("aria-pressed", "true");
    expect(disabled).toBeDisabled();

    fireEvent.click(first);
    fireEvent.click(disabled);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith("obrigatorio", expect.objectContaining({ label: "O que é obrigatório?" }));
  });

  it("renders ChecklistRow as the source-derived semantic checklist line", () => {
    const onToggle = vi.fn();

    render(
      <div role="list" aria-label="Checklist / subtarefas">
        <crm.ChecklistRow id="horarios" index={1} onToggle={onToggle} title="Verificar horarios disponiveis" />
        <crm.ChecklistRow id="bloqueado" index={2} onToggle={onToggle} state="blocked" title="Revisar bloqueio" />
      </div>
    );

    const row = screen.getByRole("listitem", { name: "1. Verificar horarios disponiveis" });
    const checkbox = within(row).getByRole("checkbox", { name: "Marcar item" });
    const blocked = screen.getByRole("listitem", { name: "2. Revisar bloqueio" });

    expect(row).toHaveClass("tcrm-checklist-row");
    expect(within(row).getByText("1.")).toBeInTheDocument();
    expect(blocked).toHaveAttribute("aria-disabled", "true");

    fireEvent.click(checkbox);
    fireEvent.click(within(blocked).getByRole("checkbox", { name: "Marcar item" }));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(true, expect.objectContaining({ id: "horarios", index: 1, state: "incomplete" }));
  });

  it("renders CommentThread as the source-derived comment card with real actions", () => {
    const viewAll = vi.fn();
    const select = vi.fn();
    const retry = vi.fn();

    render(<crm.CommentThread onCommentSelect={select} onRetry={retry} onViewAll={viewAll} />);

    const thread = screen.getByRole("region", { name: "Comentários" });
    expect(thread).toHaveAttribute("data-component", "CommentThread");
    expect(thread).toHaveAttribute("data-state", "source");
    expect(within(thread).getByRole("heading", { name: "Comentários" })).toBeInTheDocument();

    fireEvent.click(within(thread).getByRole("button", { name: "Ver todos" }));
    fireEvent.click(within(thread).getByRole("button", { name: /Ana Silva: Pedi reposição quinta 08h./ }));

    expect(viewAll).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenCalledWith(expect.objectContaining({ id: "ana-silva", author: "Ana Silva" }));

    cleanup();

    render(<crm.CommentThread onRetry={retry} state="failed" />);
    fireEvent.click(screen.getByRole("button", { name: /Ana Silva: Pedi reposição quinta 08h./ }));
    expect(retry).toHaveBeenCalledWith(expect.objectContaining({ id: "ana-silva", state: "failed" }));

    cleanup();

    render(<crm.CommentThread state="loading" />);
    expect(screen.getByRole("region", { name: "Comentários" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status", { name: "Carregando comentários" })).toBeInTheDocument();

    cleanup();

    render(<crm.CommentThread state="blocked" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Comentários bloqueados para revisão.");
    expect(screen.getByRole("button", { name: "Ver todos" })).toBeDisabled();
  });

  it("renders the image 79 empty CRM shell from reusable subcomponents", () => {
    render(<crm.CrmEmptyShell />);

    expect(screen.getByLabelText("https://app.taliya.com")).toBeInTheDocument();
    expect(screen.getByLabelText("Taliya")).toBeInTheDocument();
    expect(screen.getByLabelText(/CRM/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/globais/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Jornadas" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("navigation", { name: "Seções" }).querySelector(".tl-segmented")).toBeNull();
    expect(screen.getByRole("button", { name: "Jornadas" })).toHaveClass("tl-nav-pill", "tl-nav-pill--shell");
    expect(screen.getByRole("heading", { name: "Jornadas" })).toBeInTheDocument();
    expect(screen.getByLabelText(/conte.*vazia/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Modo noite" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Modo dia" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Configura/ })).not.toBeInTheDocument();
  });

  it("keeps image 79 primitive controls interactive and reusable", () => {
    const sidebarClick = vi.fn();
    const topbarClick = vi.fn();
    const navClick = vi.fn();

    render(
      <div>
        <crm.CrmSidebarFloatingButton icon="calendar" label="Agenda" onClick={sidebarClick} />
        <crm.CrmTopbarActionButton alert icon="bell" label="Notificações" onClick={topbarClick} />
        <crm.CrmTopbarNavChip item={{ id: "jornadas", label: "Jornadas", active: true }} onClick={navClick} />
        <crm.CrmShellAvatar name="Operadora" />
      </div>
    );

    const sidebarButton = screen.getByRole("button", { name: "Agenda" });
    const topbarButton = screen.getByRole("button", { name: /Notifica/ });
    const navChip = screen.getByRole("button", { name: "Jornadas" });
    const avatarButton = screen.getByRole("button", { name: "Operadora" });

    fireEvent.click(sidebarButton);
    fireEvent.click(screen.getByRole("button", { name: "Notificações" }));
    fireEvent.click(navChip);

    expect(sidebarClick).toHaveBeenCalledTimes(1);
    expect(topbarClick).toHaveBeenCalledTimes(1);
    expect(navClick).toHaveBeenCalledTimes(1);
    expect(sidebarButton).toHaveClass("tl-icon-button");
    expect(topbarButton).toHaveClass("tl-icon-button");
    expect(navChip).toHaveClass("tl-nav-pill");
    expect(navChip).not.toHaveClass("tcrm-empty-shell-nav__item");
    expect(navChip).toHaveAttribute("aria-current", "page");
    expect(avatarButton.querySelector(".tl-avatar")).toBeInTheDocument();
  });

  it("renders the canonical CRM sidebar taxonomy from the navigation contract", () => {
    render(<crm.Sidebar />);

    const expectedLabels = [
      "Hoje",
      "Inbox",
      "Alunos",
      "Agenda",
      "Vendas",
      "Financeiro",
      "Retenção",
      "Operação",
      "Agentes",
      "Uso e cotas",
      "Relatórios",
      "Configurações"
    ];

    expectedLabels.forEach((label) => {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: "Hoje" })).toHaveAttribute("aria-current", "page");
  });

  it("keeps canonical shell components interactive while honoring disabled states", () => {
    const activeClick = vi.fn();
    const disabledClick = vi.fn();

    render(
      <div>
        <crm.CrmProductShell
          navItems={[
            { id: "jornadas", label: "Jornadas", active: true },
            { id: "tarefas", label: "Tarefas", disabled: true }
          ]}
          title="Jornadas"
        >
          <span>Canvas</span>
        </crm.CrmProductShell>
        <div data-testid="isolated-sidebar-items">
          <crm.SidebarItem icon="calendar" id="agenda" label="Agenda" onClick={activeClick} />
          <crm.SidebarItem disabled icon="settings" id="config" label="Configurações" onClick={disabledClick} />
        </div>
      </div>
    );

    expect(screen.getByLabelText("https://app.taliya.com")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Jornadas" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Jornadas" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Tarefas" })).toBeDisabled();

    const isolatedItems = within(screen.getByTestId("isolated-sidebar-items"));
    fireEvent.click(isolatedItems.getByRole("button", { name: "Agenda" }));
    fireEvent.click(isolatedItems.getByRole("button", { name: "Configurações" }));

    expect(activeClick).toHaveBeenCalledTimes(1);
    expect(disabledClick).not.toHaveBeenCalled();
  });

  it("keeps batch 9 CRM patterns prop-driven and interactive", () => {
    const selectKanban = vi.fn();
    const menuKanban = vi.fn();
    const selectDay = vi.fn();
    const selectEvent = vi.fn();
    const submitAuth = vi.fn();
    const publishSetup = vi.fn();
    const toggleRule = vi.fn();
    const quickReply = vi.fn();
    const saveChanges = vi.fn();
    const cancelChanges = vi.fn();
    const openInvoice = vi.fn();
    const downloadInvoice = vi.fn();
    const retryInvoice = vi.fn();
    const addOnAction = vi.fn();
    const settingsHubOpen = vi.fn();
    const quotaLedger = vi.fn();
    const quotaAddOns = vi.fn();
    const reprocessUsage = vi.fn();
    const exportReport = vi.fn();
    const rosterAction = vi.fn();
    const approveDiff = vi.fn();
    const rejectDiff = vi.fn();
    const revertDiff = vi.fn();
    const openDiffRow = vi.fn();
    const openAuditObject = vi.fn();
    const openAuditRow = vi.fn();
    const viewAudit = vi.fn();

    render(
      <div>
        <crm.KanbanCard onMenu={menuKanban} onSelect={selectKanban} selected title="Caso operacional" />
        <crm.MiniCalendar onSelect={selectDay} selected="18" />
        <crm.WeeklyCalendar onEventSelect={selectEvent} selectedEventId="0-0" />
        <crm.AuthCard onSubmit={submitAuth} />
        <crm.SetupBottomBar onPublish={publishSetup} progress={100} state="ready" />
        <crm.RuleRow onToggle={toggleRule} />
        <crm.QuickReplyChips onSelect={quickReply} />
        <div data-testid="unsaved-changes">
          <crm.UnsavedChangesBar onCancel={cancelChanges} onSave={saveChanges} />
        </div>
        <crm.InvoiceTable
          onDownload={downloadInvoice}
          onOpen={openInvoice}
          onRetry={retryInvoice}
          rows={[
            { id: "jun-2026", period: "Junho/2026", dueDate: "12/06", amount: "R$ 799,00", status: "pending", method: "Cartão 4242" },
            { id: "jul-2026", period: "Julho/2026", dueDate: "12/07", amount: "R$ 799,00", status: "failed", method: "Cartão 4242" }
          ]}
        />
        <crm.AddOnCard onAction={addOnAction} state="available" />
        <crm.AddOnCard onAction={addOnAction} state="consult" />
        <div data-testid="settings-hub-card">
          <crm.SettingsHubCard onOpen={settingsHubOpen} />
        </div>
        <crm.QuotaProgress onViewAddOns={quotaAddOns} onViewLedger={quotaLedger} value={42} />
        <crm.UsageLedgerTable onReprocess={reprocessUsage} />
        <crm.ExportAction onExport={exportReport} />
        <crm.Roster onStudentAction={rosterAction} />
        <div data-testid="before-after-diff">
          <crm.BeforeAfterDiff onApprove={approveDiff} onReject={rejectDiff} onRevert={revertDiff} onRowClick={openDiffRow} />
        </div>
        <div data-testid="audit-trail">
          <crm.AuditTrail onOpenObject={openAuditObject} onRowClick={openAuditRow} onViewAll={viewAudit} />
        </div>
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "Caso operacional" }));
    fireEvent.click(screen.getByRole("button", { name: /Abrir opcoes de Caso operacional/ }));
    fireEvent.click(screen.getByRole("button", { name: "20" }));
    fireEvent.click(screen.getAllByRole("button", { name: /Pilates Solo|Reformer Intermediario|Tower|Alongamento/ })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Continuar com e-mail" }));
    fireEvent.click(screen.getByRole("button", { name: "Publicar" }));
    fireEvent.click(screen.getByRole("switch"));
    fireEvent.click(screen.getByRole("button", { name: "O que é obrigatório?" }));
    const unsavedChanges = within(screen.getByTestId("unsaved-changes"));
    fireEvent.click(unsavedChanges.getByRole("button", { name: "Salvar alterações" }));
    fireEvent.click(unsavedChanges.getByRole("button", { name: "Cancelar" }));
    fireEvent.click(screen.getByRole("button", { name: /Abrir fatura Junho/ }));
    fireEvent.click(screen.getByRole("button", { name: /Baixar fatura Junho/ }));
    fireEvent.click(screen.getByRole("button", { name: /Baixar fatura Julho/ }));
    fireEvent.click(screen.getByRole("button", { name: /Adicionar pacote - Pacote extra de mensagens/ }));
    fireEvent.click(screen.getByRole("button", { name: /Falar com suporte - Cota personalizada/ }));
    fireEvent.click(within(screen.getByTestId("settings-hub-card")).getByRole("button", { name: "Abrir" }));
    fireEvent.click(screen.getByRole("button", { name: "Ver extrato" }));
    fireEvent.click(screen.getByRole("button", { name: "Ver add-ons" }));
    fireEvent.click(screen.getAllByRole("button", { name: /Abrir execução/ })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Exportar" }));
    fireEvent.click(screen.getByRole("button", { name: "Alterar presença de Ana Carolina Souza" }));
    const beforeAfterDiff = within(screen.getByTestId("before-after-diff"));
    fireEvent.click(beforeAfterDiff.getByRole("button", { name: /Abrir alteracao plan/ }));
    fireEvent.click(beforeAfterDiff.getByRole("button", { name: "Reverter" }));
    fireEvent.click(beforeAfterDiff.getByRole("button", { name: "Rejeitar" }));
    fireEvent.click(beforeAfterDiff.getByRole("button", { name: "Aprovar" }));
    const auditTrail = within(screen.getByTestId("audit-trail"));
    fireEvent.click(auditTrail.getByRole("button", { name: /Abrir auditoria cs-1043/ }));
    fireEvent.click(auditTrail.getByRole("button", { name: /Abrir cs-1043/ }));
    fireEvent.click(auditTrail.getByRole("button", { name: "Ver auditoria completa" }));

    expect(selectKanban).toHaveBeenCalledTimes(1);
    expect(menuKanban).toHaveBeenCalledTimes(1);
    expect(selectDay).toHaveBeenCalledWith("20");
    expect(selectEvent).toHaveBeenCalledTimes(1);
    expect(submitAuth).toHaveBeenCalledTimes(1);
    expect(publishSetup).toHaveBeenCalledTimes(1);
    expect(toggleRule).toHaveBeenCalledWith(false, undefined);
    expect(quickReply).toHaveBeenCalledWith("obrigatorio", expect.objectContaining({ label: "O que é obrigatório?" }));
    expect(saveChanges).toHaveBeenCalledTimes(1);
    expect(cancelChanges).toHaveBeenCalledTimes(1);
    expect(openInvoice).toHaveBeenCalledTimes(1);
    expect(downloadInvoice).toHaveBeenCalledTimes(1);
    expect(retryInvoice).toHaveBeenCalledTimes(1);
    expect(addOnAction).toHaveBeenCalledWith("available");
    expect(addOnAction).toHaveBeenCalledWith("consult");
    expect(settingsHubOpen).toHaveBeenCalledTimes(1);
    expect(quotaLedger).toHaveBeenCalledTimes(1);
    expect(quotaAddOns).toHaveBeenCalledTimes(1);
    expect(reprocessUsage).toHaveBeenCalledTimes(1);
    expect(exportReport).toHaveBeenCalledTimes(1);
    expect(rosterAction).toHaveBeenCalledWith("ana");
    expect(openDiffRow).toHaveBeenCalledWith("plan");
    expect(revertDiff).toHaveBeenCalledTimes(1);
    expect(rejectDiff).toHaveBeenCalledTimes(1);
    expect(approveDiff).toHaveBeenCalledTimes(1);
    expect(openAuditRow).toHaveBeenCalledWith(expect.objectContaining({ id: "cs-1043" }));
    expect(openAuditObject).toHaveBeenCalledWith(expect.objectContaining({ id: "cs-1043" }));
    expect(viewAudit).toHaveBeenCalledTimes(1);
  }, 60000);

  it("renders image 64 RuleRow with real select and toggle behavior", async () => {
    const toggleChange = vi.fn();
    const selectChange = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();

    const options = [
      { value: "immediate", label: "Imediato" },
      { value: "daily", label: "Diário" },
      { value: "weekly", label: "Semanal" },
      { value: "silent-after-hours", label: "Silenciado fora do horário" }
    ];

    render(
      <crm.RuleRow
        checked
        icon="alert"
        iconTone="danger"
        onSelectChange={selectChange}
        onToggle={toggleChange}
        rowId="critical"
        selectOptions={options}
        selectValue="immediate"
        title="Crítico"
      />
    );

    const row = screen.getByText("Crítico").closest('[data-component="RuleRow"]');
    expect(row).not.toBeNull();
    expect(row).toHaveAttribute("data-state", "enabled");

    const scopedRow = within(row as HTMLElement);
    const switchControl = scopedRow.getByRole("switch", { name: "Alternar Crítico" });
    expect(switchControl).toHaveAttribute("aria-checked", "true");
    expect(scopedRow.getByRole("combobox", { name: "Selecionar valor de Crítico" })).toHaveTextContent("Imediato");
    expect(scopedRow.getByText("Ligado")).toBeInTheDocument();

    fireEvent.click(switchControl);
    expect(toggleChange).toHaveBeenCalledWith(false, "critical");

    const select = scopedRow.getByRole("combobox", { name: "Selecionar valor de Crítico" });
    fireEvent.keyDown(select, { key: "ArrowDown" });
    fireEvent.click(await screen.findByRole("option", { name: "Diário" }));
    expect(selectChange).toHaveBeenCalledWith("daily", "critical");

    cleanup();

    render(<crm.RuleRow blockedReason="Plano bloqueado" rowId="blocked" selectValue="daily" state="blocked" title="Regra bloqueada" />);

    expect(screen.getByRole("switch", { name: "Alternar Regra bloqueada" })).toBeDisabled();
    expect(screen.getByRole("combobox", { name: "Selecionar valor de Regra bloqueada" })).toBeDisabled();
    expect(screen.getByText("Bloqueado")).toBeInTheDocument();
  }, 60000);

  it("renders image 62 SettingsSection with real row actions and toggle behavior", () => {
    const rowAction = vi.fn();
    const toggleChange = vi.fn();

    render(<crm.SettingsSection onRowAction={rowAction} onToggleChange={toggleChange} />);

    const section = screen.getByRole("heading", { name: "2. Regras financeiras simples" }).closest('[data-component="SettingsSection"]');
    expect(section).not.toBeNull();
    expect(section).toHaveAttribute("data-state", "source");
    expect(within(section as HTMLElement).getByText("Limites básicos para cobrança e atraso.")).toBeInTheDocument();
    expect(within(section as HTMLElement).getAllByRole("row")).toHaveLength(6);
    expect(within(section as HTMLElement).getByText("Vencimento padrão")).toBeInTheDocument();
    expect(within(section as HTMLElement).getByText("Dia 10")).toBeInTheDocument();
    expect(within(section as HTMLElement).getByText("Cancelar cobrança")).toBeInTheDocument();

    fireEvent.click(within(section as HTMLElement).getByRole("button", { name: "Alterar Vencimento padrão" }));
    expect(rowAction).toHaveBeenCalledWith(expect.objectContaining({ id: "due-date", value: "Dia 10" }));

    const manualToggle = within(section as HTMLElement).getByRole("switch", { name: "Alternar Baixa manual" });
    expect(manualToggle).toHaveAttribute("aria-checked", "true");
    fireEvent.click(manualToggle);
    expect(toggleChange).toHaveBeenCalledWith(expect.objectContaining({ id: "manual-settlement" }), false);

    cleanup();

    render(<crm.SettingsSection state="loading" />);
    expect(document.querySelector('[data-component="SettingsSection"]')).toHaveAttribute("aria-busy", "true");

    cleanup();

    render(<crm.SettingsSection blockedReason="Somente Dono/Admin pode alterar regras financeiras." state="blocked" />);
    expect(screen.getByRole("button", { name: "Alterar Vencimento padrão" })).toBeDisabled();
    expect(screen.getByRole("switch", { name: "Alternar Baixa manual" })).toBeDisabled();
    expect(screen.getByText("Configuração bloqueada")).toBeInTheDocument();
  });

  it("renders long schedule blocks through the official weekly calendar event contract", () => {
    const { container } = render(
      <crm.WeeklyCalendar
        days={["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]}
        events={[
          {
            id: "holiday",
            dayIndex: 4,
            top: 344,
            height: 296,
            time: "",
            title: "Bloqueio - Feriado municipal",
            teacher: "",
            capacity: "14:00 - 18:00",
            status: "schedule-block",
            statusLabel: ""
          }
        ]}
      />
    );

    expect(screen.getByText("Bloqueio - Feriado municipal").closest(".tcrm-class-card")).toHaveClass("tcrm-class-card--schedule-block");
    expect(screen.getByText("14:00 - 18:00")).toBeInTheDocument();
    expect(container.querySelector(".tcrm-weekly-calendar__event")).toHaveStyle("--tcrm-weekly-event-height: 296px");
  });

  it("renders image 24 ConversationList with filters, rows, pagination and real selection behavior", () => {
    const filterChange = vi.fn();
    const selectConversation = vi.fn();
    const pageSize = vi.fn();
    const previousPage = vi.fn();
    const nextPage = vi.fn();

    render(
      <crm.ConversationList
        onConversationSelect={selectConversation}
        onFilterChange={filterChange}
        onNextPage={nextPage}
        onPageSizeClick={pageSize}
        onPreviousPage={previousPage}
      />
    );

    const list = screen.getByLabelText("Lista de conversas");
    expect(list).toHaveAttribute("data-component", "ConversationList");
    expect(list).toHaveAttribute("data-state", "source");
    expect(within(list).getByRole("button", { name: "Todas" })).toHaveAttribute("aria-pressed", "true");
    expect(within(list).getAllByRole("button", { name: /Abrir conversa de/ })).toHaveLength(5);
    expect(within(list).getByRole("button", { name: "Abrir conversa de Ana Silva" })).toHaveAttribute("aria-pressed", "true");
    expect(within(list).getByText("Oi, perdi a aula de ontem. Consigo repor quinta?")).toBeInTheDocument();
    expect(within(list).getAllByText("Aguardando humano").length).toBeGreaterThanOrEqual(2);
    expect(within(list).getByText("Falha de envio")).toBeInTheDocument();
    expect(within(list).getByText(/1.5 de 5/)).toBeInTheDocument();

    fireEvent.click(within(list).getByRole("button", { name: "WhatsApp" }));
    fireEvent.click(within(list).getByRole("button", { name: "Abrir conversa de Marina Lopes" }));
    fireEvent.click(within(list).getByRole("button", { name: "10" }));
    fireEvent.click(within(list).getByRole("button", { name: "Página anterior" }));
    fireEvent.click(within(list).getByRole("button", { name: "Próxima página" }));

    expect(filterChange).toHaveBeenCalledWith(expect.objectContaining({ id: "whatsapp" }));
    expect(selectConversation).toHaveBeenCalledWith(expect.objectContaining({ id: "marina-lopes" }));
    expect(pageSize).toHaveBeenCalledTimes(1);
    expect(previousPage).toHaveBeenCalledTimes(1);
    expect(nextPage).toHaveBeenCalledTimes(1);

    cleanup();

    render(<crm.ConversationList state="loading" />);
    expect(screen.getByLabelText("Lista de conversas")).toHaveAttribute("aria-busy", "true");

    cleanup();

    render(<crm.ConversationList state="empty" />);
    expect(screen.getByText("Sem conversas")).toBeInTheDocument();

    cleanup();

    render(<crm.ConversationList state="blocked" />);
    expect(screen.getByRole("button", { name: "Abrir conversa de Ana Silva" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByText("Lista bloqueada")).toBeInTheDocument();
  });

  it("renders image 62 IntegrationStatusRow with real action behavior", () => {
    const action = vi.fn();

    render(<crm.IntegrationStatusRow onAction={action} />);

    const row = screen.getByRole("button", { name: "Pix Taliya - Bloqueado" });
    expect(row).toHaveAttribute("data-component", "IntegrationStatusRow");
    expect(row).toHaveAttribute("data-provider", "pix");
    expect(row).toHaveAttribute("data-state", "blocked");
    expect(within(row).getByText("Pix Taliya")).toBeInTheDocument();
    expect(within(row).getByText("Bloqueado até ativar")).toBeInTheDocument();

    fireEvent.click(row);
    expect(action).toHaveBeenCalledWith("pix", "blocked");

    cleanup();

    render(
      <div>
        <crm.IntegrationStatusRow onAction={action} provider="card" state="connected" title="Cartao online" />
        <crm.IntegrationStatusRow onAction={action} provider="recurrence" state="pending" title="Recorrencia online" />
        <crm.IntegrationStatusRow onAction={action} provider="reconciliation" state="failed" title="Baixa automatica" />
        <crm.IntegrationStatusRow onAction={action} provider="card" state="loading" title="Cartao online" />
        <crm.IntegrationStatusRow provider="pix" showDivider={false} title="Pix Taliya" />
      </div>
    );

    expect(screen.getByRole("button", { name: "Cartao online - Conectado" })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "Recorrencia online - Pendente" })).toHaveAttribute("data-state", "pending");
    expect(screen.getByRole("button", { name: "Baixa automatica - Falha técnica" })).toHaveAttribute("data-provider", "reconciliation");
    expect(screen.getByRole("button", { name: "Cartao online - Sincronizando" })).toBeDisabled();
    expect(screen.getByRole("group", { name: "Pix Taliya - Bloqueado" })).not.toHaveClass("tcrm-integration-status-row--divider");
  });

  it("renders config UnsavedChangesBar footer with real save and cancel actions", () => {
    const save = vi.fn();
    const cancel = vi.fn();

    render(<crm.UnsavedChangesBar onCancel={cancel} onSave={save} />);

    const bar = screen.getByRole("region", { name: "Alterações não salvas" });
    expect(bar).toHaveAttribute("data-component", "UnsavedChangesBar");
    expect(bar).toHaveAttribute("data-state", "dirty");

    fireEvent.click(within(bar).getByRole("button", { name: "Salvar alterações" }));
    fireEvent.click(within(bar).getByRole("button", { name: "Cancelar" }));

    expect(save).toHaveBeenCalledTimes(1);
    expect(cancel).toHaveBeenCalledTimes(1);

    cleanup();

    render(
      <div>
        <crm.UnsavedChangesBar state="saving" />
        <crm.UnsavedChangesBar state="saved" />
        <crm.UnsavedChangesBar state="blocked" />
      </div>
    );

    expect(screen.getByRole("region", { name: "Salvando alterações" })).toHaveAttribute("aria-busy", "true");
    expect(within(screen.getByRole("region", { name: "Salvando alterações" })).getByRole("button", { name: /Salvando/ })).toBeDisabled();
    expect(within(screen.getByRole("region", { name: "Alterações salvas" })).getByRole("button", { name: "Salvo" })).toBeDisabled();
    expect(within(screen.getByRole("region", { name: "Salvamento bloqueado" })).getByRole("button", { name: "Bloqueado" })).toBeDisabled();
  });

  it("renders ConfigImpactPreview from the approved ImpactSummary anatomy", () => {
    const { container } = render(<crm.ConfigImpactPreview />);

    const preview = container.querySelector('[data-component="ConfigImpactPreview"]');
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveAttribute("data-state", "medium");
    expect(preview).toHaveClass("tcrm-impact-summary");
    expect(preview).toHaveClass("tcrm-config-impact-preview");
    expect(screen.getByRole("heading", { name: "3. Impacto antes de salvar" })).toBeInTheDocument();
    expect(screen.getByText("Professores continuam sem ver WhatsApp dos alunos.")).toBeInTheDocument();

    cleanup();

    const loadingRender = render(<crm.ConfigImpactPreview state="loading" />);
    expect(loadingRender.container.querySelector('[data-component="ConfigImpactPreview"]')).toHaveAttribute("aria-busy", "true");
    expect(screen.getByLabelText("Carregando impacto")).toBeInTheDocument();

    cleanup();

    render(<crm.ConfigImpactPreview state="blocked" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Impacto bloqueado");
  });

  it("renders image 61 PermissionMatrix with real toggles and selects", async () => {
    const toggleChange = vi.fn();
    const selectChange = vi.fn();
    Element.prototype.scrollIntoView = vi.fn();

    render(<crm.PermissionMatrix onSelectChange={selectChange} onToggleChange={toggleChange} />);

    expect(screen.getByRole("heading", { name: "2. Ajustes sensíveis" })).toBeInTheDocument();
    expect(screen.getByText("Defina limites importantes para proteger dados e processos.")).toBeInTheDocument();

    const matrix = screen.getByRole("table", { name: /Ajustes sensíveis de permissões/i });
    const switches = within(matrix).getAllByRole("switch");

    expect(switches).toHaveLength(4);
    expect(switches[0]).toHaveAttribute("aria-checked", "false");
    expect(switches[1]).toHaveAttribute("aria-checked", "true");
    expect(within(matrix).getByText("Professor pode ver telefone/WhatsApp do aluno")).toBeInTheDocument();
    expect(within(matrix).getByText("Recepção pode cancelar cobrança")).toBeInTheDocument();

    fireEvent.click(switches[0]);

    expect(toggleChange).toHaveBeenCalledWith("teacher-phone", true, expect.objectContaining({ id: "teacher-phone" }));

    const discountSelect = within(matrix).getByRole("combobox", { name: /desconto simples/i });
    fireEvent.keyDown(discountSelect, { key: "ArrowDown" });
    fireEvent.click(await screen.findByRole("option", { name: /Até 20%/i }));

    expect(selectChange).toHaveBeenCalledWith("frontdesk-discount", "20", expect.objectContaining({ id: "frontdesk-discount" }));

    cleanup();

    render(<crm.PermissionMatrix state="read-only" />);

    screen.getAllByRole("switch").forEach((toggle) => {
      expect(toggle).toBeDisabled();
    });
    screen.getAllByRole("combobox").forEach((select) => {
      expect(select).toHaveAttribute("data-disabled");
    });
  });

  it("keeps subscription resolution and setup handoff composed and interactive", () => {
    const retry = vi.fn();
    const startSetup = vi.fn();
    const scheduleHelp = vi.fn();

    render(
      <div>
        <div data-testid="subscription-resolution">
          <crm.SubscriptionResolutionPanel onRetry={retry} />
        </div>
        <div data-testid="confirmed-handoff">
          <crm.ConfirmedSetupHandoff onScheduleHelp={scheduleHelp} onStartSetup={startSetup} />
        </div>
      </div>
    );

    fireEvent.click(within(screen.getByTestId("subscription-resolution")).getByRole("button", { name: /Tentar pagamento/i }));
    fireEvent.click(within(screen.getByTestId("confirmed-handoff")).getByRole("button", { name: /Come.*setup guiado/i }));
    fireEvent.click(within(screen.getByTestId("confirmed-handoff")).getByRole("button", { name: /Agendar ajuda humana/i }));

    expect(within(screen.getByTestId("subscription-resolution")).getByText(/Status da assinatura/i)).toBeInTheDocument();
    expect(within(screen.getByTestId("confirmed-handoff")).getByRole("heading", { name: "Setup guiado pela Taliya" })).toBeInTheDocument();
    expect(within(screen.getByTestId("confirmed-handoff")).getByText("Como funciona")).toBeInTheDocument();
    expect(retry).toHaveBeenCalledTimes(1);
    expect(startSetup).toHaveBeenCalledTimes(1);
    expect(scheduleHelp).toHaveBeenCalledTimes(1);
  });

  it("keeps plan summary variants composed and interactive", () => {
    const changePlan = vi.fn();
    const viewDetails = vi.fn();
    const featureHelp = vi.fn();

    render(
      <div>
        <div data-testid="plan-active">
          <crm.PlanSummaryCard onChangePlan={changePlan} onViewDetails={viewDetails} />
        </div>
        <div data-testid="plan-review">
          <crm.PlanSummaryCard onChangePlan={changePlan} onFeatureHelp={featureHelp} state="review" />
        </div>
        <div data-testid="plan-confirmed">
          <crm.PlanSummaryCard state="confirmed" />
        </div>
        <div data-testid="plan-failed">
          <crm.PlanSummaryCard state="failed" />
        </div>
      </div>
    );

    fireEvent.click(within(screen.getByTestId("plan-active")).getByRole("button", { name: "Trocar plano" }));
    fireEvent.click(within(screen.getByTestId("plan-active")).getByRole("button", { name: "Ver detalhes do plano" }));
    fireEvent.click(within(screen.getByTestId("plan-review")).getByRole("button", { name: "Ajuda sobre Painel Taliya + app" }));
    fireEvent.click(within(screen.getByTestId("plan-review")).getByRole("button", { name: "Trocar" }));

    expect(within(screen.getByTestId("plan-active")).getByText("CRM operacional")).toBeInTheDocument();
    expect(within(screen.getByTestId("plan-review")).getByText("Plano Avance")).toBeInTheDocument();
    expect(within(screen.getByTestId("plan-confirmed")).getByText("Assinatura ativa")).toBeInTheDocument();
    expect(within(screen.getByTestId("plan-failed")).getByText("Sua assinatura")).toBeInTheDocument();
    expect(changePlan).toHaveBeenCalledTimes(2);
    expect(viewDetails).toHaveBeenCalledTimes(1);
    expect(featureHelp).toHaveBeenCalledWith("panel");
  });

  it("owns the billing subscription workspace anatomy and navigation", () => {
    const onChangePlan = vi.fn();
    const onOpenAgents = vi.fn();
    const onSupport = vi.fn();
    const onUpdatePayment = vi.fn();
    const onViewAddOns = vi.fn();
    const onViewInvoices = vi.fn();
    const onViewPlanDetails = vi.fn();
    const onViewUsage = vi.fn();

    render(
      <crm.BillingSubscriptionWorkspace
        onChangePlan={onChangePlan}
        onOpenAgents={onOpenAgents}
        onSupport={onSupport}
        onUpdatePayment={onUpdatePayment}
        onViewAddOns={onViewAddOns}
        onViewInvoices={onViewInvoices}
        onViewPlanDetails={onViewPlanDetails}
        onViewUsage={onViewUsage}
      />
    );

    expect(screen.getByText("7 de 7 agentes inclusos")).toBeInTheDocument();
    expect(screen.getByText("Próxima fatura")).toBeInTheDocument();
    expect(screen.getByText("Nenhum add-on ativo")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Trocar plano" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir Agentes" }));
    fireEvent.click(screen.getByRole("button", { name: "Atualizar pagamento" }));
    fireEvent.click(screen.getByRole("button", { name: "Ver add-ons" }));
    fireEvent.click(screen.getByRole("button", { name: "Falar com suporte" }));

    expect(onChangePlan).toHaveBeenCalledOnce();
    expect(onOpenAgents).toHaveBeenCalledOnce();
    expect(onUpdatePayment).toHaveBeenCalledOnce();
    expect(onViewAddOns).toHaveBeenCalledOnce();
    expect(onSupport).toHaveBeenCalledOnce();
  });

  it("owns the billing invoices workspace anatomy and invoice actions", () => {
    const onDownloadCurrent = vi.fn();
    const onDownloadInvoice = vi.fn();
    const onOpenCurrent = vi.fn();
    const onOpenInvoice = vi.fn();
    const onPayCurrent = vi.fn();
    const onRowClick = vi.fn();

    render(
      <crm.BillingInvoicesWorkspace
        onDownloadCurrent={onDownloadCurrent}
        onDownloadInvoice={onDownloadInvoice}
        onOpenCurrent={onOpenCurrent}
        onOpenInvoice={onOpenInvoice}
        onPayCurrent={onPayCurrent}
        onRowClick={onRowClick}
      />
    );

    expect(screen.getByText("Fatura atual")).toBeInTheDocument();
    expect(screen.getByText("Plano 7 agentes")).toBeInTheDocument();
    expect(screen.getByText("15.000 mensagens/mês")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Histórico de faturas" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Pagar agora" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir fatura" }));
    fireEvent.click(screen.getByRole("button", { name: "Baixar PDF" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir fatura Junho/2026" }));
    fireEvent.click(screen.getByRole("button", { name: "Baixar fatura Junho/2026" }));
    fireEvent.click(screen.getByText("Maio/2026"));

    expect(onPayCurrent).toHaveBeenCalledOnce();
    expect(onOpenCurrent).toHaveBeenCalledOnce();
    expect(onDownloadCurrent).toHaveBeenCalledOnce();
    expect(onOpenInvoice).toHaveBeenCalledOnce();
    expect(onDownloadInvoice).toHaveBeenCalledOnce();
    expect(onRowClick).toHaveBeenCalledOnce();
  });

  it("owns the billing add-ons workspace anatomy and option actions", () => {
    const onAddOnAction = vi.fn();

    render(<crm.BillingAddOnsWorkspace onAddOnAction={onAddOnAction} />);

    expect(screen.getByRole("heading", { name: "Add-ons ativos" })).toBeInTheDocument();
    expect(screen.getByText("Nenhum add-on ativo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Disponíveis" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pacote extra de mensagens" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mais agentes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cota personalizada" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Adicionar pacote - Pacote extra de mensagens" }));
    fireEvent.click(screen.getByRole("button", { name: "Falar com suporte - Mais agentes" }));

    expect(onAddOnAction).toHaveBeenNthCalledWith(1, expect.objectContaining({ id: "messages", state: "available" }));
    expect(onAddOnAction).toHaveBeenNthCalledWith(2, expect.objectContaining({ id: "agents", state: "plan-max" }));
  });

  it("keeps the operational case drawer cloned, prop-driven, and interactive", () => {
    const action = vi.fn();
    const close = vi.fn();

    render(<crm.CaseDrawer onAction={action} onClose={close} />);

    const drawer = screen.getByRole("complementary", { name: "Detalhes do caso operacional" });

    expect(drawer).toHaveAttribute("data-component", "CaseDrawer");
    expect(within(drawer).getByRole("heading", { name: "Reposição da Ana sem encaixe" })).toBeInTheDocument();
    expect(within(drawer).getByText("Bloqueio de agenda")).toBeInTheDocument();
    expect(within(drawer).getByText("Turma terça 17h")).toBeInTheDocument();
    expect(within(drawer).getByText("depende de confirmação")).toBeInTheDocument();
    expect(within(drawer).getByText(/há 2 horários candidatos/)).toBeInTheDocument();
    expect(within(drawer).getByText("Ana pediu reposição pelo WhatsApp")).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: "Fechar caso" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Abrir origem" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Assumir" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Mover status" }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith("close");
    expect(action).toHaveBeenCalledWith("open-origin");
    expect(action).toHaveBeenCalledWith("assume");
    expect(action).toHaveBeenCalledWith("move-status");

    cleanup();

    render(<crm.CaseDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Detalhes do caso operacional" })).not.toBeInTheDocument();
  });

  it("renders CaseDrawer operational sections with reusable case grammar", () => {
    const action = vi.fn();
    render(
      <crm.CaseDrawer
        density="compact"
        footerActions={[
          { id: "message", label: "Enviar mensagem", variant: "primary" },
          { id: "create-task", label: "Criar tarefa" }
        ]}
        onAction={action}
        sections={[
          { id: "reason", title: "Motivo declarado", kind: "text", description: "Aluna aguardando retorno." },
          { id: "impact", title: "Impacto", kind: "list", items: [{ id: "risk", label: "Risco de cancelamento", tone: "danger" }] },
          { id: "pause", title: "Automacao pausada", kind: "alert", icon: "alert", description: "Acoes autonomas pausadas." },
          { id: "plan", title: "Plano de resolucao", kind: "checklist", items: [{ id: "reply", label: "Responder com pedido de desculpas", tone: "success" }] },
          { id: "copilot", title: "Sugestao do copiloto", kind: "copilot", icon: "sparkles", description: "Enviar resposta humana." },
          { id: "actions", title: "Proxima acao", kind: "actions" },
          { id: "history", title: "Historico curto", kind: "history", items: [{ id: "opened", label: "Caso aberto", tone: "success" }] },
          { id: "opportunity", title: "Oportunidade", kind: "facts", items: [{ id: "slot", label: "Vaga aberta", meta: "Quinta, 09:00", tone: "success" }] }
        ]}
        numberedSections
        widthVariant="wide"
      />
    );

    const drawer = screen.getByRole("complementary", { name: "Detalhes do caso operacional" });
    expect(drawer).toHaveAttribute("data-width-variant", "wide");
    expect(drawer).toHaveClass("tcrm-case-drawer--wide");
    expect(within(drawer).getByRole("heading", { name: "2. Motivo declarado" })).toBeInTheDocument();
    expect(within(drawer).getByText("Aluna aguardando retorno.")).toBeInTheDocument();
    expect(within(drawer).getByRole("heading", { name: "4. Automacao pausada" })).toBeInTheDocument();
    expect(within(drawer).getByText("Responder com pedido de desculpas")).toBeInTheDocument();
    expect(within(drawer).getByRole("region", { name: "Oportunidade" })).toHaveClass("tcrm-case-drawer__section--facts");
    expect(within(drawer).getByText("Quinta, 09:00")).toBeInTheDocument();
    expect(within(drawer).queryByText("Alternativas possíveis")).not.toBeInTheDocument();
    expect(within(drawer).getByRole("heading", { name: "7. Proxima acao" })).toBeInTheDocument();
    expect(drawer).toHaveClass("tcrm-case-drawer--compact");
    expect(drawer.querySelector(".tcrm-drawer-frame__footer")).toBeNull();
    fireEvent.click(within(drawer).getByRole("button", { name: "Enviar mensagem" }));
    expect(action).toHaveBeenCalledWith("message");
  });

  it("keeps the student drawer cloned, prop-driven, and interactive", () => {
    const action = vi.fn();
    const close = vi.fn();

    render(<crm.StudentDrawer onAction={action} onClose={close} />);

    const drawer = screen.getByRole("complementary", { name: "Resumo do aluno" });

    expect(drawer).toHaveAttribute("data-component", "StudentDrawer");
    expect(drawer).toHaveClass("tcrm-drawer-frame");
    expect(drawer.querySelector(".tcrm-drawer-frame__body")).toBeTruthy();
    expect(drawer.querySelector(".tcrm-drawer-frame__footer")).toBeTruthy();
    expect(within(drawer).getByRole("heading", { name: "Ana Paula Martins" })).toBeInTheDocument();
    expect(within(drawer).getByText("Plano Mensal")).toBeInTheDocument();
    expect(within(drawer).getAllByText("Reformer Iniciante")).toHaveLength(3);
    expect(within(drawer).getByText("8 de 10 aulas")).toBeInTheDocument();
    expect(within(drawer).getByText("Atualizar contato de emergência")).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: "Fechar aluno" }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Abrir perfil/ }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Enviar mensagem" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Atualizar dados" }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith("close");
    expect(action).toHaveBeenCalledWith("open-profile");
    expect(action).toHaveBeenCalledWith("message");
    expect(action).toHaveBeenCalledWith("update-data");

    cleanup();

    render(<crm.StudentDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Resumo do aluno" })).not.toBeInTheDocument();
  });

  it("keeps the class drawer cloned, prop-driven, and interactive", () => {
    const action = vi.fn();
    const close = vi.fn();
    const studentStatus = vi.fn();

    render(<crm.ClassDrawer onAction={action} onClose={close} onStudentStatus={studentStatus} />);

    const drawer = screen.getByRole("complementary", { name: "Chamada da aula" });

    expect(drawer).toHaveAttribute("data-component", "ClassDrawer");
    expect(drawer).toHaveClass("tcrm-drawer-frame");
    expect(drawer.querySelector(".tcrm-drawer-frame__body")).toBeTruthy();
    expect(drawer.querySelector(".tcrm-drawer-frame__footer")).toBeTruthy();
    expect(within(drawer).getByRole("heading", { name: "Chamada" })).toBeInTheDocument();
    expect(within(drawer).getByText("Terça 17h · Reformer Intermediário")).toBeInTheDocument();
    expect(within(drawer).getByText("1 falta avisada")).toBeInTheDocument();
    expect(within(drawer).getByText("Ana Carolina Souza")).toBeInTheDocument();
    expect(within(drawer).getByText("Felipe Andrade")).toBeInTheDocument();
    expect(within(drawer).getByText("Crédito pode ser gerado.")).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: "Fechar chamada" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Salvar chamada" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Criar tarefa" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Alterar presença de Felipe Andrade" }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith("close");
    expect(action).toHaveBeenCalledWith("save-call");
    expect(action).toHaveBeenCalledWith("create-task");
    expect(studentStatus).toHaveBeenCalledWith(expect.objectContaining({ id: "felipe", status: "warned" }));

    cleanup();

    render(<crm.ClassDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Chamada da aula" })).not.toBeInTheDocument();
  });

  it("renders ClassDrawer class-detail anatomy for the turma worklist drawer", () => {
    render(
      <crm.ClassDrawer
        ariaLabel="Turma selecionada"
        availabilityNotice="1 vaga fixa disponivel"
        facts={[
          { id: "schedule", icon: "calendar", label: "Dia/horario recorrente", value: "Terca 17h" },
          { id: "capacity", icon: "users", label: "Capacidade", value: "5/6" }
        ]}
        historyItems={[{ id: "moved", label: "Aluno movido", meta: "Hoje 10:12", tone: "success" }]}
        rosterHeading="Alunos fixos (5)"
        students={[
          { id: "ana", initials: "AS", name: "Ana Carolina Souza", status: "pending" },
          { id: "beatriz", initials: "BL", name: "Beatriz Lima", status: "present" }
        ]}
        title="Terca 17h - Reformer Intermediario"
        upcomingClasses={[{ id: "today", label: "Hoje 17h" }]}
        variant="class-detail"
        warning="Alteracoes nesta turma podem afetar 3 aulas futuras."
      />
    );

    const drawer = screen.getByRole("complementary", { name: "Turma selecionada" });
    expect(drawer).toHaveClass("tcrm-class-drawer--class-detail");
    expect(within(drawer).getByText("Dia/horario recorrente")).toBeInTheDocument();
    expect(within(drawer).getByText("Alunos fixos (5)")).toBeInTheDocument();
    expect(within(drawer).getByText("1 vaga fixa disponivel")).toBeInTheDocument();
    expect(within(drawer).getByText("Proximas aulas")).toBeInTheDocument();
    expect(within(drawer).getByText("Historico recente")).toBeInTheDocument();
    expect(within(drawer).getByText("Alteracoes nesta turma podem afetar 3 aulas futuras.")).toBeInTheDocument();
    expect(within(drawer).getByText("Ana Carolina Souza").closest("li")).toHaveAttribute("data-attendance", "pending");
    expect(within(drawer).getByText("Beatriz Lima").closest("li")).toHaveAttribute("data-attendance", "present");
  });

  it("renders prepared roster statuses and class-detail actions in content", () => {
    render(
      <crm.ClassDrawer
        actionPlacement="content"
        actionHeading="Próximas ações"
        ariaLabel="Aula selecionada"
        availabilityNotice="Há uma vaga compatível."
        availabilityTone="warning"
        rosterHeading="Alunos previstos (2)"
        rosterStatus={{ label: "Pendente", tone: "warning" }}
        showStudentStatus
        students={[
          { id: "ana", initials: "1", name: "Ana Carolina Souza", status: "pending" },
          { id: "beatriz", initials: "2", name: "Beatriz Lima", status: "present" }
        ]}
        variant="class-detail"
      />
    );

    const drawer = screen.getByRole("complementary", { name: "Aula selecionada" });
    const body = drawer.querySelector(".tcrm-drawer-frame__body");
    expect(body).toBeTruthy();
    expect(drawer.querySelector(".tcrm-drawer-frame__footer")).toBeNull();
    expect(within(drawer).getAllByText("Pendente")).toHaveLength(2);
    expect(within(drawer).getByText("Presente")).toBeInTheDocument();
    expect(within(drawer).getByRole("heading", { name: "Próximas ações" })).toBeInTheDocument();
    expect(within(drawer).getByText("Há uma vaga compatível.")).toHaveClass("tcrm-class-drawer__availability--warning");
    expect(body).toContainElement(within(drawer).getByRole("button", { name: "Salvar chamada" }));
    expect(within(drawer).getByText("Ana Carolina Souza").closest("ul")).toHaveClass("tcrm-class-drawer__fixed-students--with-status");
  });

  it("renders recurring block facts, impact, notice, and actions", () => {
    const action = vi.fn();
    render(
      <crm.ClassDrawer
        blockNotice={{ title: "Bloqueio de agenda", types: "Tipos seguros", description: "Mostra aulas afetadas", actionLabel: "Criar bloqueio" }}
        facts={[{ id: "capacity", icon: "users", label: "Capacidade padrão", value: "6" }]}
        impactItems={[{ id: "schedule", icon: "users", label: "alterar horário afeta 5 alunos" }]}
        onAction={action}
        upcomingClasses={[{ id: "today", label: "hoje" }]}
        variant="recurring-block"
      />
    );

    const drawer = screen.getByRole("complementary", { name: "Chamada da aula" });
    expect(drawer).toHaveClass("tcrm-class-drawer--recurring-block");
    expect(within(drawer).getByRole("heading", { name: "Próximas aulas geradas" })).toBeInTheDocument();
    expect(within(drawer).getByRole("heading", { name: "Impacto de alteração" })).toBeInTheDocument();
    expect(within(drawer).getByRole("heading", { name: "Bloqueio de agenda" })).toBeInTheDocument();
    fireEvent.click(within(drawer).getByRole("button", { name: "Criar bloqueio" }));
    expect(action).toHaveBeenCalledWith("create-task");
  });

  it("keeps the payment drawer cloned, prop-driven, and interactive", () => {
    const action = vi.fn();
    const close = vi.fn();

    render(<crm.PaymentDrawer onAction={action} onClose={close} />);

    const drawer = screen.getByRole("complementary", { name: "Detalhes da cobrança" });

    expect(drawer).toHaveAttribute("data-component", "PaymentDrawer");
    expect(within(drawer).getByRole("heading", { name: "Gabriela Lima" })).toBeInTheDocument();
    expect(within(drawer).getByText("R$ 420,00")).toBeInTheDocument();
    expect(within(drawer).getAllByText("Em atraso")).toHaveLength(2);
    expect(within(drawer).getByText("Mensalidade recorrente vencida há 2 dias.")).toBeInTheDocument();
    expect(within(drawer).getByText("Cobrança gerada automaticamente")).toBeInTheDocument();
    expect(within(drawer).getByText(/Posso te lembrar o link de pagamento/)).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: "Fechar cobrança" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Enviar lembrete" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Abrir cobrança" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Registrar promessa" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Marcar como pago" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Criar tarefa" }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Abrir aluno/ }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith("close");
    expect(action).toHaveBeenCalledWith("send-reminder");
    expect(action).toHaveBeenCalledWith("open-charge");
    expect(action).toHaveBeenCalledWith("register-promise");
    expect(action).toHaveBeenCalledWith("mark-paid");
    expect(action).toHaveBeenCalledWith("create-task");
    expect(action).toHaveBeenCalledWith("open-student");

    cleanup();

    render(<crm.PaymentDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Detalhes da cobrança" })).not.toBeInTheDocument();
  });

  it("renders movement-specific payment actions and due state", () => {
    const action = vi.fn();
    render(<crm.PaymentDrawer eyebrow="Ajuste manual" markPaidDisabled onAction={action} state="due" statusLabel="A vencer" variant="movement" />);

    const drawer = screen.getByRole("complementary", { name: "Detalhes da cobrança" });
    expect(drawer.querySelector(".tcrm-drawer-frame__label")).toHaveTextContent("Ajuste manual");
    expect(within(drawer).getByText("A vencer")).toHaveClass("tcrm-payment-drawer__status-label--due");
    expect(within(drawer).getByRole("heading", { name: "Ações" })).toBeInTheDocument();
    expect(within(drawer).queryByRole("heading", { name: "Ação secundária" })).not.toBeInTheDocument();
    expect(within(drawer).getByRole("button", { name: "Marcar como pago" })).toBeDisabled();

    fireEvent.click(within(drawer).getByRole("button", { name: "Copiar link Pix" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Abrir conversa" }));
    expect(action).toHaveBeenCalledWith("copy-pix-link");
    expect(action).toHaveBeenCalledWith("open-conversation");
  });

  it("keeps the replacement drawer cloned, prop-driven, and interactive", () => {
    const action = vi.fn();
    const close = vi.fn();
    const optionSelect = vi.fn();

    render(<crm.ReplacementDrawer onAction={action} onClose={close} onOptionSelect={optionSelect} />);

    const drawer = screen.getByRole("complementary", { name: "Detalhes da reposição" });
    const header = drawer.querySelector(".tcrm-drawer-frame__header");
    const frameBody = drawer.querySelector(".tcrm-drawer-frame__body");
    const body = drawer.querySelector(".tcrm-replacement-drawer__body");
    const frameFooter = drawer.querySelector(".tcrm-drawer-frame__footer");
    const footer = drawer.querySelector(".tcrm-replacement-drawer__footer");

    expect(drawer).toHaveAttribute("data-component", "ReplacementDrawer");
    expect(header).not.toBeNull();
    expect(frameBody).not.toBeNull();
    expect(body).not.toBeNull();
    expect(frameFooter).not.toBeNull();
    expect(footer).not.toBeNull();
    expect(Array.from(drawer.children).map((child) => child.className)).toEqual([
      "tcrm-drawer-frame__header tcrm-replacement-drawer__header",
      "tcrm-drawer-frame__body",
      "tcrm-drawer-frame__footer"
    ]);
    expect(within(drawer).getByRole("heading", { name: "Ana Carolina Souza" })).toBeInTheDocument();
    expect(within(drawer).getByText(/Terça 17h/)).toBeInTheDocument();
    expect(within(drawer).getByText("Opção encontrada")).toBeInTheDocument();
    expect(within(drawer).getByText(/Quinta 08h/)).toBeInTheDocument();
    expect(within(drawer).getByText(/Posso reservar/)).toBeInTheDocument();
    expect(within(drawer).getByText(/Autônomo disponível/)).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: /Quinta 08h/ }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Fechar reposição" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Reservar vaga" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Enviar convite" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Criar tarefa" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Abrir conversa" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Abrir aula original" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Copiar sugestão" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Marcar como cancelada" }));

    expect(optionSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "thu-08" }));
    expect(close).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith("close");
    expect(action).toHaveBeenCalledWith("reserve-slot");
    expect(action).toHaveBeenCalledWith("send-invite");
    expect(action).toHaveBeenCalledWith("create-task");
    expect(action).toHaveBeenCalledWith("open-conversation");
    expect(action).toHaveBeenCalledWith("open-original-class");
    expect(action).toHaveBeenCalledWith("copy-suggestion");
    expect(action).toHaveBeenCalledWith("cancel");

    cleanup();

    render(<crm.ReplacementDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Detalhes da reposição" })).not.toBeInTheDocument();
  });

  it("keeps the lead drawer cloned, prop-driven, and interactive", () => {
    const action = vi.fn();
    const close = vi.fn();

    render(<crm.LeadDrawer onAction={action} onClose={close} />);

    const drawer = screen.getByRole("complementary", { name: "Detalhes do interessado" });

    expect(drawer).toHaveAttribute("data-component", "LeadDrawer");
    expect(within(drawer).getByRole("heading", { name: "Ana Souza" })).toBeInTheDocument();
    expect(within(drawer).getByText("Interessado selecionado")).toBeInTheDocument();
    expect(within(drawer).getByText("Qualificada")).toBeInTheDocument();
    expect(within(drawer).getByText("WhatsApp permitido")).toBeInTheDocument();
    expect(within(drawer).getByText("Responder preço hoje")).toBeInTheDocument();
    expect(within(drawer).getByText("Contato via WhatsApp")).toBeInTheDocument();
    expect(within(drawer).getByText(/Ana demonstrou interesse/)).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: "Fechar interessado" }));
    fireEvent.click(within(drawer).getAllByRole("button", { name: "Ver todos" })[0]);
    fireEvent.click(within(drawer).getByRole("button", { name: "Ação sugerida: Responder preço hoje" }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Abrir conversa/ }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Agendar experimental/ }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Criar follow-up/ }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Mover etapa/ }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Iniciar matrícula/ }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Marcar perdido/ }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Mais ações/ }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith("close");
    expect(action).toHaveBeenCalledWith("more-actions");
    expect(action).toHaveBeenCalledWith("open-conversation");
    expect(action).toHaveBeenCalledWith("schedule-trial");
    expect(action).toHaveBeenCalledWith("create-follow-up");
    expect(action).toHaveBeenCalledWith("move-stage");
    expect(action).toHaveBeenCalledWith("start-enrollment");
    expect(action).toHaveBeenCalledWith("mark-lost");

    cleanup();

    render(<crm.LeadDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Detalhes do interessado" })).not.toBeInTheDocument();
  });

  it("keeps the agent flow drawer cloned, contextual, and interactive", () => {
    const action = vi.fn();
    const close = vi.fn();
    const submit = vi.fn();

    const { rerender } = render(<crm.AgentFlowDrawer onAction={action} onClose={close} onQuestionSubmit={submit} />);

    const drawer = screen.getByRole("complementary", { name: "Agente de configuração do fluxo" });
    expect(drawer).toHaveAttribute("data-component", "AgentFlowDrawer");
    expect(drawer).toHaveAttribute("data-state", "flow");
    expect(drawer).toHaveClass("tcrm-drawer-frame");
    expect(drawer.querySelector(".tcrm-drawer-frame__body")).toBeTruthy();
    expect(drawer.querySelector(".tcrm-drawer-frame__footer")).toBeTruthy();
    expect(within(drawer).getByRole("heading", { name: "Agente de Configuração" })).toBeInTheDocument();
    expect(within(drawer).getByText(/Autônomo com exceções/)).toBeInTheDocument();
    expect(within(drawer).getByText("O que muda no Copiloto?")).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: "Mais opções do agente" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Fechar agente" }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Quando a equipe/ }));
    fireEvent.change(within(drawer).getByLabelText("Pergunta para o agente"), { target: { value: "Pode testar agora?" } });
    fireEvent.click(within(drawer).getByRole("button", { name: "Enviar pergunta" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Agendar ajuda" }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith("menu", undefined);
    expect(action).toHaveBeenCalledWith("close", undefined);
    expect(action).toHaveBeenCalledWith("select-question", "team-called");
    expect(action).toHaveBeenCalledWith("send-question", "Pode testar agora?");
    expect(action).toHaveBeenCalledWith("schedule-help", undefined);
    expect(submit).toHaveBeenCalledWith("Pode testar agora?");

    rerender(<crm.AgentFlowDrawer state="execution" />);
    expect(screen.getByRole("complementary", { name: "Agente de configuração do fluxo" })).toHaveAttribute("data-state", "execution");
    expect(screen.getByText(/caso real/)).toBeInTheDocument();

    rerender(<crm.AgentFlowDrawer state="routine" />);
    expect(screen.getByRole("complementary", { name: "Agente de configuração do fluxo" })).toHaveAttribute("data-state", "routine");
    expect(screen.getByLabelText("Orientação do agente")).toHaveTextContent("Essa rotina está em Mais autônomo.");
    expect(screen.getByText("Simular falta com aviso")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Pergunte sobre esta rotina...")).toBeInTheDocument();

    rerender(<crm.AgentFlowDrawer state="test" />);
    expect(screen.getByRole("complementary", { name: "Agente de configuração do fluxo" })).toHaveAttribute("data-state", "test");
    expect(screen.queryByRole("button", { name: "Mais opções do agente" })).not.toBeInTheDocument();

    rerender(<crm.AgentFlowDrawer state="test" showMenu />);
    expect(screen.getByRole("button", { name: "Mais opções do agente" })).toBeInTheDocument();

    rerender(<crm.AgentFlowDrawer state="loading" />);
    expect(screen.getByRole("complementary", { name: "Agente de configuração do fluxo" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Enviar pergunta" })).toBeDisabled();

    rerender(<crm.AgentFlowDrawer state="blocked" />);
    expect(screen.getByRole("button", { name: /O que muda no Copiloto/ })).toBeDisabled();

    rerender(<crm.AgentFlowDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Agente de configuração do fluxo" })).not.toBeInTheDocument();
  });

  it("keeps the usage drawer cloned, contextual, and interactive", () => {
    const action = vi.fn();
    const close = vi.fn();
    const submit = vi.fn();

    const { rerender } = render(<crm.UsageDrawer onAction={action} onClose={close} onQuestionSubmit={submit} />);

    const drawer = screen.getByRole("complementary", { name: "Agente de suporte de uso" });
    expect(drawer).toHaveAttribute("data-component", "UsageDrawer");
    expect(drawer).toHaveAttribute("data-state", "ledger");
    expect(drawer).toHaveClass("tcrm-drawer-frame");
    expect(drawer.querySelector(".tcrm-drawer-frame__body")).toBeTruthy();
    expect(drawer.querySelector(".tcrm-drawer-frame__footer")).toBeTruthy();
    expect(within(drawer).getByRole("heading", { name: "Agente de Suporte Taliya" })).toBeInTheDocument();
    expect(within(drawer).getByText(/Este extrato mostra/)).toBeInTheDocument();
    expect(within(drawer).getByText("O que consome cota?")).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: "Mais opcoes do suporte" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Fechar suporte" }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Por que aparece estimado/ }));
    fireEvent.change(within(drawer).getByLabelText("Pergunta para o suporte"), { target: { value: "Onde vejo meu pacote?" } });
    fireEvent.click(within(drawer).getByRole("button", { name: "Enviar pergunta" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Abrir chamado" }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith("menu", undefined);
    expect(action).toHaveBeenCalledWith("close", undefined);
    expect(action).toHaveBeenCalledWith("select-question", "estimated");
    expect(action).toHaveBeenCalledWith("send-question", "Onde vejo meu pacote?");
    expect(action).toHaveBeenCalledWith("open-ticket", undefined);
    expect(submit).toHaveBeenCalledWith("Onde vejo meu pacote?");

    rerender(<crm.UsageDrawer state="overview" />);
    expect(screen.getByRole("complementary", { name: "Agente de suporte de uso" })).toHaveAttribute("data-state", "overview");
    expect(screen.getByText("O que acontece em 90%?")).toBeInTheDocument();

    rerender(<crm.UsageDrawer state="loading" />);
    expect(screen.getByRole("complementary", { name: "Agente de suporte de uso" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Enviar pergunta" })).toBeDisabled();

    rerender(<crm.UsageDrawer state="blocked" />);
    expect(screen.getByRole("button", { name: /O que consome cota/ })).toBeDisabled();

    rerender(<crm.UsageDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Agente de suporte de uso" })).not.toBeInTheDocument();
  });

  it("renders official support status and agent surfaces with callbacks", () => {
    const action = vi.fn();
    const viewAll = vi.fn();
    render(<><crm.SupportStatusSidebar onViewAll={viewAll} /><crm.SupportCentralWorkspace agent={<crm.SupportAgentPanel onAction={action} />} tickets={<div>Tickets recentes</div>} /></>);

    expect(screen.getByText("Status dos serviços").closest("[data-component='SupportStatusSidebar']")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Agente de suporte 24/7" }).closest("[data-component='SupportAgentPanel']")).toBeInTheDocument();
    expect(screen.getByText("Tickets recentes").closest("[data-component='SupportCentralWorkspace']")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Ver todos os status" }));
    fireEvent.click(screen.getByRole("button", { name: "Erro na importação" }));
    expect(viewAll).toHaveBeenCalledOnce();
    expect(action).toHaveBeenCalledWith("question:Erro na importação");
  });

  it("keeps the support ticket drawer composed from the certified support panel", () => {
    const action = vi.fn();
    const close = vi.fn();

    const { rerender } = render(<crm.SupportTicketDrawer onAction={action} onClose={close} />);

    const drawer = screen.getByRole("complementary", { name: "Detalhes do ticket de suporte" });
    expect(drawer).toHaveAttribute("data-component", "SupportTicketDrawer");
    expect(drawer).toHaveAttribute("data-state", "open");
    expect(within(drawer).getByRole("heading", { name: "Importação duplicou alunos" })).toBeInTheDocument();
    expect(within(drawer).getByText("Ticket selecionado")).toBeInTheDocument();
    expect(within(drawer).getByText((content) => content.includes("agente identificou"))).toBeInTheDocument();
    expect(within(drawer).getByText("Conversa do ticket")).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: "Fechar ticket" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Responder" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Anexar arquivo" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Marcar resolvido" }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith("reply");
    expect(action).toHaveBeenCalledWith("attach");
    expect(action).toHaveBeenCalledWith("resolve");

    rerender(
      <crm.SupportTicketDrawer
        facts={[{ id: "type", label: "Tipo", value: "Integracao", icon: "link" }]}
        messages={[{ id: "studio", icon: "user", text: "Studio: WhatsApp desconectou." }]}
        subtitle="Canal principal perdeu a conexao"
        summary="Reconexao segura preparada."
        title="WhatsApp desconectou"
      />
    );
    expect(screen.getByRole("heading", { name: "WhatsApp desconectou" })).toBeInTheDocument();
    expect(screen.getByText("Canal principal perdeu a conexao")).toBeInTheDocument();
    expect(screen.getByText("Integracao")).toBeInTheDocument();
    expect(screen.getByText("Reconexao segura preparada.")).toBeInTheDocument();
    expect(screen.getByText("Studio: WhatsApp desconectou.")).toBeInTheDocument();

    rerender(<crm.SupportTicketDrawer variant="internal" />);
    expect(screen.getByRole("complementary", { name: "Detalhes do ticket de suporte" })).toHaveClass("tcrm-support-ticket-drawer--internal");
    expect(screen.getByText("Ticket interno selecionado")).toBeInTheDocument();

    rerender(<crm.SupportTicketDrawer state="loading" />);
    expect(screen.getByRole("complementary", { name: "Detalhes do ticket de suporte" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Responder" })).toBeDisabled();

    rerender(<crm.SupportTicketDrawer state="blocked" />);
    expect(screen.getByRole("button", { name: "Responder" })).toBeDisabled();

    rerender(<crm.SupportTicketDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Detalhes do ticket de suporte" })).not.toBeInTheDocument();
  });

  it("keeps checkout review composed from plan and payment components", () => {
    const couponChange = vi.fn();
    const applyCoupon = vi.fn();
    const continuePayment = vi.fn();
    const backToPlans = vi.fn();
    const changePlan = vi.fn();
    const featureHelp = vi.fn();

    render(
      <div data-testid="checkout-review">
        <crm.CheckoutReviewPanel
          onApplyCoupon={applyCoupon}
          onBackToPlans={backToPlans}
          onChangePlan={changePlan}
          onContinuePayment={continuePayment}
          onCouponChange={couponChange}
          onFeatureHelp={featureHelp}
        />
      </div>
    );

    const checkout = within(screen.getByTestId("checkout-review"));
    fireEvent.change(checkout.getByLabelText("Código promocional"), { target: { value: "LUME10" } });
    fireEvent.click(checkout.getByRole("button", { name: "Aplicar" }));
    fireEvent.click(checkout.getByRole("button", { name: "Continuar para pagamento seguro" }));
    fireEvent.click(checkout.getByRole("button", { name: "Voltar aos planos" }));
    fireEvent.click(checkout.getByRole("button", { name: "Trocar" }));
    fireEvent.click(checkout.getByRole("button", { name: "Ajuda sobre Painel Taliya + app" }));

    expect(checkout.getAllByText("Plano Avance")).toHaveLength(2);
    expect(checkout.getByRole("heading", { name: "Pagamento" })).toBeInTheDocument();
    expect(checkout.getByText("A Taliya não coleta dados de cartão nesta tela.")).toBeInTheDocument();
    expect(couponChange).toHaveBeenCalledWith("LUME10");
    expect(applyCoupon).toHaveBeenCalledWith("LUME10");
    expect(continuePayment).toHaveBeenCalledTimes(1);
    expect(backToPlans).toHaveBeenCalledTimes(1);
    expect(changePlan).toHaveBeenCalledTimes(1);
    expect(featureHelp).toHaveBeenCalledWith("panel");
  });

  it("keeps batch 10 agent and execution components prop-driven and interactive", () => {
    const agentOpen = vi.fn();
    const routineOpen = vi.fn();
    const modeChange = vi.fn();
    const stepOpen = vi.fn();
    const stepMenu = vi.fn();
    const preflightAction = vi.fn();
    const preflightToggle = vi.fn();
    const scenarioSelect = vi.fn();
    const runSimulation = vi.fn();
    const runnerAction = vi.fn();
    const runnerScenario = vi.fn();
    const timelineOpen = vi.fn();
    const timelineRetry = vi.fn();
    const receiptAction = vi.fn();

    render(
      <div>
        <div data-testid="agent-catalog"><crm.AgentCatalog onAgentOpen={agentOpen} /></div>
        <div data-testid="agent-routine-card"><crm.AgentRoutineCard id="presenca" onOpen={routineOpen} selected state="simulated" title="Presenca e faltas" /></div>
        <div data-testid="mode-selector"><crm.ModeSelector onChange={modeChange} /></div>
        <div data-testid="flow-builder"><crm.FlowBuilder onStepMenu={stepMenu} onStepOpen={stepOpen} /></div>
        <div data-testid="flow-builder-compact"><crm.FlowBuilder density="compact" /></div>
        <div data-testid="flow-section-compact">
          <crm.AgentFlowSectionPanel density="compact" kind="mode" title="Como este fluxo deve trabalhar?">
            <crm.ModeSelector />
          </crm.AgentFlowSectionPanel>
        </div>
        <crm.AgentFlowSettingsPanel data-testid="flow-settings-panel">
          <span>Ajuste</span>
        </crm.AgentFlowSettingsPanel>
        <crm.AgentFlowActionBar data-testid="flow-action-bar">
          <button type="button">Testar este fluxo</button>
          <button type="button">Salvar ajuste</button>
          <button type="button">Voltar para rotina</button>
        </crm.AgentFlowActionBar>
        <div data-testid="preflight"><crm.PreflightChecklist onItemAction={preflightAction} onToggle={preflightToggle} /></div>
        <div data-testid="scenario-list"><crm.ScenarioList onSelect={scenarioSelect} /></div>
        <div data-testid="phone-preview"><crm.PhonePreview state="blocked" /></div>
        <div data-testid="timeline"><crm.ExecutionTimeline onOpen={timelineOpen} onRetry={timelineRetry} /></div>
        <div data-testid="simulation"><crm.SimulationRunner onAction={runnerAction} onRun={runSimulation} onScenarioSelect={runnerScenario} selectedScenarioId="credito" /></div>
        <div data-testid="receipt"><crm.ExecutionReceipt onAction={receiptAction} /></div>
      </div>
    );

    fireEvent.click(within(screen.getByTestId("agent-catalog")).getByRole("button", { name: /Abrir Agenda/ }));
    fireEvent.click(within(screen.getByTestId("agent-routine-card")).getByRole("button", { name: "Abrir rotina" }));
    fireEvent.click(within(screen.getByTestId("mode-selector")).getByRole("button", { name: /Manual/ }));
    fireEvent.click(within(screen.getByTestId("flow-builder")).getByRole("button", { name: "Início" }));
    fireEvent.click(within(screen.getByTestId("flow-builder")).getAllByRole("button", { name: /Abrir opções do nó/ })[0]);
    fireEvent.click(within(screen.getByTestId("preflight")).getByRole("checkbox", { name: /WhatsApp conectado/ }));
    fireEvent.click(within(screen.getByTestId("preflight")).getAllByRole("button", { name: "Revisar" })[0]);
    fireEvent.click(within(screen.getByTestId("scenario-list")).getByText("WhatsApp falha"));
    fireEvent.click(within(screen.getByTestId("timeline")).getAllByRole("button", { name: "Abrir detalhes" })[0]);
    fireEvent.click(within(screen.getByTestId("timeline")).getAllByRole("button", { name: "Reprocessar" })[0]);
    fireEvent.click(within(screen.getByTestId("simulation")).getByRole("button", { name: "Rodar teste novamente" }));
    fireEvent.click(within(screen.getByTestId("simulation")).getByText("Aviso fora do prazo"));
    fireEvent.click(within(screen.getByTestId("simulation")).getByRole("button", { name: "Trocar cenário" }));
    fireEvent.click(within(screen.getByTestId("simulation")).getByRole("button", { name: "Voltar ao fluxo" }));
    fireEvent.click(within(screen.getByTestId("receipt")).getByRole("button", { name: "Abrir tarefa" }));

    expect(agentOpen).toHaveBeenCalledWith("agenda");
    expect(routineOpen).toHaveBeenCalledWith("presenca");
    expect(modeChange).toHaveBeenCalledWith("manual");
    expect(stepOpen).toHaveBeenCalledWith("entrada");
    expect(stepMenu).toHaveBeenCalledWith("entrada");
    expect(preflightToggle).toHaveBeenCalledWith("whatsapp", false);
    expect(preflightAction).toHaveBeenCalledWith("whatsapp");
    expect(scenarioSelect).toHaveBeenCalledWith("whatsapp");
    expect(timelineOpen).toHaveBeenCalledWith("inicio");
    expect(timelineRetry).toHaveBeenCalledWith("inicio");
    expect(runSimulation).toHaveBeenCalledTimes(1);
    expect(runnerScenario).toHaveBeenCalledWith("fora-prazo");
    expect(runnerAction.mock.calls.map(([action]) => action)).toEqual(["run", "change-scenario", "back"]);
    expect(within(screen.getByTestId("simulation")).getByText("Aluno pede crédito").closest("button")).toHaveAttribute("aria-current", "true");
    expect(receiptAction).toHaveBeenCalledWith("task");
    expect(within(screen.getByTestId("phone-preview")).getByText(/revisar antes de enviar/i)).toBeInTheDocument();
    expect(screen.getByTestId("flow-builder-compact").querySelector(".tcrm-flow-builder--compact")).toBeInTheDocument();
    expect(screen.getByTestId("flow-builder-compact").querySelector(".tcrm-flow-step-card__item--neutral .tl-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("flow-section-compact").querySelector(".tcrm-agent-flow-section-panel--compact")).toBeInTheDocument();
    expect(screen.getByTestId("flow-settings-panel")).toHaveClass("tcrm-agent-flow-settings-panel");
    expect(screen.getByTestId("flow-action-bar")).toHaveClass("tcrm-agent-flow-action-bar");
  });

  it("keeps batch 10 student, finance, sales, and retention cards interactive", () => {
    const action = vi.fn();
    const open = vi.fn();
    const menu = vi.fn();
    const select = vi.fn();

    render(
      <div>
        <div data-testid="student-header"><crm.StudentHeader onAction={action} /></div>
        <div data-testid="student-summary"><crm.StudentSummary onAction={action} showRows /></div>
        <div data-testid="finance-priority"><crm.FinancePriorityPanel onSelect={(item) => action(item.id)} selectedId="overdue" /></div>
        <div data-testid="payment-card"><crm.PaymentCaseCard onMenu={menu} onOpen={open} /></div>
        <div data-testid="finance-kanban"><crm.FinanceKanbanCard onMenu={menu} onSelect={select} /></div>
        <div data-testid="reconciliation"><crm.ReconciliationRow onAction={action} /></div>
        <div data-testid="pipeline"><crm.PipelineCard onMenu={menu} onSelect={select} source="Instagram" sourceIcon="camera" /></div>
        <div data-testid="lead"><crm.LeadSummary onOpen={open} /></div>
        <div data-testid="trial"><crm.TrialClassCard onSelect={select} /></div>
        <div data-testid="enrollment"><crm.EnrollmentChecklist onAction={action} /></div>
        <div data-testid="risk"><crm.RiskCard onOpen={open} /></div>
        <div data-testid="relationship"><crm.RelationshipList /></div>
      </div>
    );

    fireEvent.click(within(screen.getByTestId("student-header")).getByRole("button", { name: "Enviar mensagem" }));
    fireEvent.click(within(screen.getByTestId("student-summary")).getByRole("button", { name: "Ver agenda" }));
    fireEvent.click(within(screen.getByTestId("student-summary")).getByRole("button", { name: "Ver tarefas" }));
    fireEvent.click(within(screen.getByTestId("finance-priority")).getByRole("button", { name: /9 cobrancas atrasadas/ }));
    fireEvent.click(within(screen.getByTestId("payment-card")).getByRole("button", { name: /Mais acoes da fila/ }));
    fireEvent.click(within(screen.getByTestId("payment-card")).getByRole("button", { name: /Abrir cobranca de Fernanda Lima/ }));
    fireEvent.click(within(screen.getByTestId("finance-kanban")).getAllByRole("button", { name: /Fernanda Lima/ })[0]);
    fireEvent.click(within(screen.getByTestId("finance-kanban")).getByRole("button", { name: /Abrir opcoes de Fernanda Lima/ }));
    fireEvent.click(within(screen.getByTestId("reconciliation")).getByRole("button", { name: /Mais acoes de Ana Paula Martins/ }));
    fireEvent.click(within(screen.getByTestId("pipeline")).getAllByRole("button", { name: /Ana Souza/ })[0]);
    fireEvent.click(within(screen.getByTestId("pipeline")).getByRole("button", { name: /Abrir opcoes de Ana Souza/ }));
    expect(screen.getByTestId("pipeline").querySelector(".lucide-camera")).toBeInTheDocument();
    fireEvent.click(within(screen.getByTestId("lead")).getByRole("button", { name: "Abrir conversa" }));
    fireEvent.click(within(screen.getByTestId("trial")).getByRole("button", { name: /Ana Souza/ }));
    fireEvent.click(within(screen.getByTestId("enrollment")).getAllByRole("button", { name: "Abrir" })[0]);
    fireEvent.click(within(screen.getByTestId("risk")).getByRole("button", { name: "Abrir risco" }));

    expect(action).toHaveBeenCalledWith("message");
    expect(action).toHaveBeenCalledWith("agenda");
    expect(action).toHaveBeenCalledWith("tarefas");
    expect(action).toHaveBeenCalledWith("overdue");
    expect(action).toHaveBeenCalledWith("dados");
    expect(action).toHaveBeenCalledWith();
    expect(action).toHaveBeenCalledTimes(6);
    expect(open).toHaveBeenCalledTimes(3);
    expect(menu).toHaveBeenCalledTimes(3);
    expect(select).toHaveBeenCalledTimes(3);
    expect(within(screen.getByTestId("relationship")).getByText("Debito")).toBeInTheDocument();
    expect(within(screen.getByTestId("relationship")).getByText("Plano Premium")).toBeInTheDocument();
  });

  it("renders FinancePriorityPanel states and row callbacks", () => {
    const onSelect = vi.fn();
    const { rerender } = render(<crm.FinancePriorityPanel onSelect={onSelect} selectedId="reconciliation" />);

    const panel = screen.getByText("Prioridades financeiras").closest("[data-component='FinancePriorityPanel']");
    expect(panel).toHaveAttribute("data-state", "source");
    expect(screen.getByRole("button", { name: /5 comprovantes aguardando conciliacao/ })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: /3 excecoes financeiras precisam revisao/ }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "exceptions" }));

    rerender(<crm.FinancePriorityPanel state="loading" />);
    expect(screen.getByText("Prioridades financeiras").closest("[data-component='FinancePriorityPanel']")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: /9 cobrancas atrasadas/ })).toBeDisabled();

    rerender(<crm.FinancePriorityPanel state="empty" />);
    expect(screen.getByText("Sem prioridades")).toBeInTheDocument();
  });

  it("lets CrmProductShell disable regions and render custom internal slots", () => {
    render(
      <crm.CrmProductShell
        pageHeaderActions={<button type="button">Acao global</button>}
        regions={{ backButton: false, browserChrome: false, globalActions: false, sidebar: false }}
        title="Taliya Internal"
        topbarEnd={<span>local</span>}
        variant="internal"
      >
        <p>Painel interno</p>
      </crm.CrmProductShell>
    );

    const shell = screen.getByText("Painel interno").closest(".tcrm-product-shell-stage");
    expect(shell).toHaveAttribute("data-shell-variant", "internal");
    expect(shell).toHaveClass("tcrm-product-shell-stage--no-sidebar");
    expect(shell).toHaveClass("tcrm-product-shell-stage--no-browser-chrome");
    expect(screen.queryByRole("button", { name: "Voltar" })).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Ações globais")).not.toBeInTheDocument();
    expect(screen.getByText("local")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Acao global" })).toBeInTheDocument();
  });

  it("forwards every CrmProductShell global action callback", () => {
    const onSearch = vi.fn();
    const onMessages = vi.fn();
    const onNotifications = vi.fn();
    const onAvatar = vi.fn();

    render(
      <crm.CrmProductShell globalActions={{ onAvatar, onMessages, onNotifications, onSearch }} title="Hoje">
        <p>Conteudo operacional</p>
      </crm.CrmProductShell>
    );

    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));
    fireEvent.click(screen.getByRole("button", { name: "Mensagens" }));
    fireEvent.click(screen.getByRole("button", { name: "Notificações" }));
    fireEvent.click(screen.getByRole("button", { name: "Operadora" }));

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onMessages).toHaveBeenCalledTimes(1);
    expect(onNotifications).toHaveBeenCalledTimes(1);
    expect(onAvatar).toHaveBeenCalledTimes(1);
  });

  it("forwards global action callbacks through CrmDashboardPage", () => {
    const onSearch = vi.fn();

    render(
      <crm.CrmDashboardPage globalActions={{ onSearch }} title="Hoje">
        <p>Conteudo do dashboard</p>
      </crm.CrmDashboardPage>
    );

    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("lets CrmProductShell render inside the official window frame", () => {
    const { rerender } = render(
      <crm.CrmProductShell frame="window" title="Agentes">
        <p>Rotinas em janela</p>
      </crm.CrmProductShell>
    );

    const shell = screen.getByText("Rotinas em janela").closest(".tcrm-product-shell-stage");
    const window = screen.getByText("Rotinas em janela").closest(".tcrm-product-shell-window");
    expect(shell).toHaveClass("tcrm-product-shell-stage--frame-window");
    expect(window).toHaveClass("tcrm-product-shell-window--frame-window");

    rerender(
      <crm.CrmProductShell frame="window-inset" title="Agentes">
        <p>Catalogo em janela inset</p>
      </crm.CrmProductShell>
    );

    const insetShell = screen.getByText("Catalogo em janela inset").closest(".tcrm-product-shell-stage");
    const insetWindow = screen.getByText("Catalogo em janela inset").closest(".tcrm-product-shell-window");
    expect(insetShell).toHaveClass("tcrm-product-shell-stage--frame-window-inset");
    expect(insetWindow).toHaveClass("tcrm-product-shell-window--frame-window-inset");
  });

  it("lets CrmProductShell opt drawers into content-height placement", () => {
    const { rerender } = render(
      <crm.CrmProductShell
        drawer={<crm.ChecklistDrawer />}
        drawerPlacement="content"
        drawerSize="compact"
        subtitle="Rotinas operacionais do estudio"
        title="Checklists"
      >
        <p>Tabela de checklists</p>
      </crm.CrmProductShell>
    );

    const shell = screen.getByText("Tabela de checklists").closest(".tcrm-product-shell-stage");
    const window = screen.getByText("Tabela de checklists").closest(".tcrm-product-shell-window");
    expect(shell).toHaveClass("tcrm-product-shell-stage--drawer-content");
    expect(shell).toHaveClass("tcrm-product-shell-stage--drawer-compact");
    expect(window).toHaveClass("tcrm-product-shell-window--drawer-content");
    expect(window).toHaveClass("tcrm-product-shell-window--drawer-compact");
    expect(screen.getByRole("complementary", { name: "Detalhes do checklist" })).toHaveAttribute("data-component", "ChecklistDrawer");

    rerender(
      <crm.CrmProductShell
        drawer={<crm.ApprovalDrawer />}
        drawerPlacement="floating"
        pageHeaderRhythm="spacious"
        subtitle="Decisoes aguardando revisao humana"
        title="Aprovacoes"
      >
        <p>Tabela de aprovacoes</p>
      </crm.CrmProductShell>
    );

    const approvalShell = screen.getByText("Tabela de aprovacoes").closest(".tcrm-product-shell-stage");
    const approvalWindow = screen.getByText("Tabela de aprovacoes").closest(".tcrm-product-shell-window");
    expect(approvalShell).toHaveClass("tcrm-product-shell-stage--drawer-floating");
    expect(approvalShell).toHaveClass("tcrm-product-shell-stage--page-header-spacious");
    expect(approvalWindow).toHaveClass("tcrm-product-shell-window--drawer-floating");

    rerender(
      <crm.CrmProductShell
        drawer={<crm.CaseDrawer />}
        drawerPlacement="chrome"
        subtitle="Pedidos em acompanhamento"
        title="Cancelamentos"
      >
        <p>Fila com drawer abaixo do chrome</p>
      </crm.CrmProductShell>
    );

    const chromeShell = screen.getByText("Fila com drawer abaixo do chrome").closest(".tcrm-product-shell-stage");
    const chromeWindow = screen.getByText("Fila com drawer abaixo do chrome").closest(".tcrm-product-shell-window");
    expect(chromeShell).toHaveClass("tcrm-product-shell-stage--drawer-chrome");
    expect(chromeWindow).toHaveClass("tcrm-product-shell-window--drawer-chrome");

    rerender(
      <crm.CrmProductShell
        drawer={<crm.TaskDrawer />}
        drawerPlacement="viewport"
        pageHeaderRhythm="dashboard"
        subtitle="Studio Vila Mariana"
        title="Hoje"
      >
        <p>Dashboard Hoje com tarefa</p>
      </crm.CrmProductShell>
    );

    const viewportShell = screen.getByText("Dashboard Hoje com tarefa").closest(".tcrm-product-shell-stage");
    const viewportWindow = screen.getByText("Dashboard Hoje com tarefa").closest(".tcrm-product-shell-window");
    expect(viewportShell).toHaveClass("tcrm-product-shell-stage--drawer-viewport");
    expect(viewportWindow).toHaveClass("tcrm-product-shell-window--drawer-viewport");

    rerender(
      <crm.CrmProductShell
        pageHeaderRhythm="dashboard"
        subtitle="Studio Vila Mariana"
        title="Hoje"
      >
        <p>Dashboard Hoje</p>
      </crm.CrmProductShell>
    );

    const dashboardShell = screen.getByText("Dashboard Hoje").closest(".tcrm-product-shell-stage");
    expect(dashboardShell).toHaveClass("tcrm-product-shell-stage--page-header-dashboard");

    rerender(
      <crm.CrmProductShell
        pageHeaderRhythm="reports"
        subtitle="Gestao e decisoes acionaveis"
        title="Relatorios"
      >
        <p>Dashboard de relatorios</p>
      </crm.CrmProductShell>
    );

    const reportsShell = screen.getByText("Dashboard de relatorios").closest(".tcrm-product-shell-stage");
    expect(reportsShell).toHaveClass("tcrm-product-shell-stage--page-header-reports");

    rerender(
      <crm.CrmProductShell
        pageHeaderActions={<button type="button">Nova cobranca</button>}
        pageHeaderRhythm="stacked"
        subtitle="Rotinas operacionais do estudio"
        title="Checklists"
      >
        <p>Tabela de checklists empilhada</p>
      </crm.CrmProductShell>
    );

    const stackedShell = screen.getByText("Tabela de checklists empilhada").closest(".tcrm-product-shell-stage");
    expect(stackedShell).toHaveClass("tcrm-product-shell-stage--page-header-stacked");
    expect(screen.getByRole("button", { name: "Nova cobranca" }).closest(".tcrm-product-shell-page-header__actions")).toBeInTheDocument();

    rerender(
      <crm.CrmProductShell pageHeaderRhythm="agents" subtitle="Areas automatizadas do CRM" title="Agentes">
        <p>Catalogo de agentes</p>
      </crm.CrmProductShell>
    );

    const agentsShell = screen.getByText("Catalogo de agentes").closest(".tcrm-product-shell-stage");
    expect(agentsShell).toHaveClass("tcrm-product-shell-stage--page-header-agents");

    rerender(
      <crm.CrmProductShell pageHeaderRhythm="agents-routines" subtitle="Presenca e faltas" title="Agente Agenda">
        <p>Catalogo de rotinas</p>
      </crm.CrmProductShell>
    );

    const agentRoutinesShell = screen.getByText("Catalogo de rotinas").closest(".tcrm-product-shell-stage");
    expect(agentRoutinesShell).toHaveClass("tcrm-product-shell-stage--page-header-agents-routines");

    rerender(
      <crm.CrmProductShell
        pageHeaderRhythm="compact-stacked"
        subtitle="Reposicao de aulas e encaixes"
        title="Reposicoes"
      >
        <p>Tabela de reposicoes compacta</p>
      </crm.CrmProductShell>
    );

    const compactStackedShell = screen.getByText("Tabela de reposicoes compacta").closest(".tcrm-product-shell-stage");
    expect(compactStackedShell).toHaveClass("tcrm-product-shell-stage--page-header-compact-stacked");

    rerender(
      <crm.CrmProductShell pageHeaderRhythm="inbox" subtitle="Atendimento e conversas" title="Inbox">
        <p>Inbox em três painéis</p>
      </crm.CrmProductShell>
    );

    const inboxShell = screen.getByText("Inbox em três painéis").closest(".tcrm-product-shell-stage");
    expect(inboxShell).toHaveClass("tcrm-product-shell-stage--page-header-inbox");

    rerender(
      <crm.CrmProductShell
        contentLayout="main-priority"
        pageHeaderActions={<button type="button">Exportar</button>}
        pageHeaderRhythm="overview"
        subtitle="Filas financeiras e pendencias do estudio"
        title="Financeiro"
      >
        <p>Financeiro overview</p>
      </crm.CrmProductShell>
    );

    const overviewShell = screen.getByText("Financeiro overview").closest(".tcrm-product-shell-stage");
    expect(overviewShell).toHaveClass("tcrm-product-shell-stage--page-header-overview");
    expect(overviewShell).toHaveClass("tcrm-product-shell-stage--content-main-priority");
    expect(screen.getByRole("button", { name: "Exportar" }).closest(".tcrm-product-shell-page-header__actions")).toBeInTheDocument();

    rerender(
      <crm.CrmProductShell pageHeaderRhythm="usage-overview" subtitle="Consumo neste ciclo" title="Uso e cotas">
        <p>Visao geral de uso</p>
      </crm.CrmProductShell>
    );

    expect(screen.getByText("Visao geral de uso").closest(".tcrm-product-shell-stage")).toHaveClass(
      "tcrm-product-shell-stage--page-header-usage-overview"
    );

    rerender(
      <crm.CrmProductShell
        contentLayout="work-list"
        subtitle="Quem precisa fazer o que"
        title="Tarefas"
      >
        <p>Tarefas com rail padrao</p>
      </crm.CrmProductShell>
    );

    const workListShell = screen.getByText("Tarefas com rail padrao").closest(".tcrm-product-shell-stage");
    expect(workListShell).toHaveClass("tcrm-product-shell-stage--content-work-list");

    rerender(
      <crm.CrmProductShell
        contentLayout="work-list-compact"
        subtitle="Conversao de interessados"
        title="Vendas"
      >
        <p>Vendas com rail compacto</p>
      </crm.CrmProductShell>
    );

    const compactWorkListShell = screen.getByText("Vendas com rail compacto").closest(".tcrm-product-shell-stage");
    expect(compactWorkListShell).toHaveClass("tcrm-product-shell-stage--content-work-list-compact");

    rerender(
      <crm.CrmProductShell
        contentLayout="work-list-wide"
        subtitle="Movimentacoes financeiras"
        title="Financeiro"
      >
        <p>Financeiro com worklist larga</p>
      </crm.CrmProductShell>
    );

    const wideWorkListShell = screen.getByText("Financeiro com worklist larga").closest(".tcrm-product-shell-stage");
    expect(wideWorkListShell).toHaveClass("tcrm-product-shell-stage--content-work-list-wide");

    rerender(
      <crm.CrmProductShell
        contentLayout="kanban"
        subtitle="Pendencias em acompanhamento"
        title="Operacao"
      >
        <p>Kanban operacional</p>
      </crm.CrmProductShell>
    );

    const kanbanShell = screen.getByText("Kanban operacional").closest(".tcrm-product-shell-stage");
    expect(kanbanShell).toHaveClass("tcrm-product-shell-stage--content-kanban");
  });

  it("lets InternalOverviewDashboard consume prepared internal data and callbacks", () => {
    const filterSelect = vi.fn();
    const cardAction = vi.fn();
    const activityAction = vi.fn();
    const copilotAction = vi.fn();
    const searchChange = vi.fn();

    const cards: crm.InternalOverviewDashboardCard[] = [
      {
        id: "leads",
        title: "Leads novos",
        value: "8",
        label: "entraram hoje",
        secondary: "3 pediram demo",
        actionLabel: "Abrir leads",
        icon: "user",
        rows: [
          { label: "Studio Corpo Vivo", value: "quente", tone: "grant" },
          { label: "Studio Equilibrio", value: "revisar", tone: "risk" }
        ]
      }
    ];

    render(
      <crm.CrmProductShell navItems={crm.internalShellNavItems} subtitle="Operacao interna de leads" title="Taliya Internal" variant="internal">
        <crm.InternalOverviewDashboard
          actions={<button type="button">Acao externa</button>}
          activityItems={[{ id: "note", label: "Lucas adicionou nota", time: "10:12", icon: "fileText" }]}
          cards={cards}
          copilot={{
            summary: "Priorize leads sem dono.",
            note: "Mock/no-cost sem envio de mensagem.",
            actionLabel: "Abrir sugestoes"
          }}
          filters={[{ id: "owner", label: "Dono" }]}
          onActivityAction={activityAction}
          onCardAction={cardAction}
          onCopilotAction={copilotAction}
          onFilterSelect={filterSelect}
          onSearchChange={searchChange}
          searchPlaceholder="Buscar lead"
          subtitle="Operacao interna de leads"
          title="Taliya Internal"
        />
      </crm.CrmProductShell>
    );

    expect(screen.getAllByRole("heading", { name: "Taliya Internal" }).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Operacao interna de leads").length).toBeGreaterThan(0);
    expect(screen.getByText("Leads novos")).toBeInTheDocument();
    expect(screen.getByText("Studio Corpo Vivo")).toBeInTheDocument();
    expect(screen.getByText("Lucas adicionou nota")).toBeInTheDocument();
    expect(screen.getByText("Priorize leads sem dono.")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Buscar lead"), { target: { value: "corpo" } });
    fireEvent.click(screen.getByRole("button", { name: "Dono" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir leads" }));
    fireEvent.click(screen.getByRole("button", { name: "Ver toda atividade" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir sugestoes" }));

    expect(searchChange).toHaveBeenCalledWith("corpo");
    expect(filterSelect).toHaveBeenCalledWith({ id: "owner", label: "Dono" });
    expect(cardAction).toHaveBeenCalledWith(cards[0]);
    expect(activityAction).toHaveBeenCalledTimes(1);
    expect(copilotAction).toHaveBeenCalledTimes(1);
  });

  it("lets InternalOverviewDashboard render as a fluid consumer container", () => {
    render(
      <crm.InternalOverviewDashboard fluid showFilters={false} showHeader={false} title="Hoje">
        <button type="button">Abrir fila quente</button>
      </crm.InternalOverviewDashboard>
    );

    const dashboard = screen.getByLabelText("Hoje");
    expect(dashboard).toHaveClass("tcrm-internal-shell");
    expect(dashboard).toHaveClass("tcrm-internal-shell--fluid");
    expect(screen.queryByPlaceholderText("Buscar studio, lead, ticket ou incidente")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Hoje" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir fila quente" })).toBeInTheDocument();
  });

  it("forwards the internal overview shell contract to CrmProductShell", () => {
    render(
      <crm.InternalShell
        browserUrl="https://app.taliya.com/internal"
        contentLayout="internal-overview"
        drawer={<crm.SupportTicketDrawer variant="internal" />}
        drawerPlacement="floating"
        pageHeaderRhythm="internal-overview"
        title="Taliya Interno"
      >
        <div>Conteudo operacional</div>
      </crm.InternalShell>
    );

    const shell = screen.getByText("Conteudo operacional").closest("[data-component='CrmProductShell']");
    expect(shell).toHaveAttribute("data-shell-variant", "internal");
    expect(shell).toHaveClass("tcrm-product-shell-stage--content-internal-overview");
    expect(shell).toHaveClass("tcrm-product-shell-stage--drawer-floating");
    expect(shell).toHaveClass("tcrm-product-shell-stage--page-header-internal-overview");
    expect(screen.getByLabelText("https://app.taliya.com/internal")).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Detalhes do ticket de suporte" })).toHaveClass("tcrm-support-ticket-drawer--internal");
  });

  it("renders the official internal tenant detail shell and security note", () => {
    render(
      <crm.InternalShell
        browserUrl="https://app.taliya.com/internal/tenants/tenant_vila_mariana"
        contentLayout="internal-tenant-detail"
        regions={{ pageHeader: false }}
        title="Studio Vila Mariana"
      >
        <crm.TenantDetailLayout />
      </crm.InternalShell>
    );

    const shell = screen.getByLabelText("Detalhe do tenant").closest("[data-component='CrmProductShell']");
    expect(shell).toHaveClass("tcrm-product-shell-stage--content-internal-tenant-detail");
    expect(screen.getByLabelText("https://app.taliya.com/internal/tenants/tenant_vila_mariana")).toBeInTheDocument();
    expect(screen.getByText(/Visão interna e segura da Taliya/)).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Segurança do tenant" })).toBeInTheDocument();
  });

  it("keeps TenantDetailLayout actions, tabs, and security controls interactive", () => {
    const action = vi.fn();
    const securityClose = vi.fn();
    const securityOpen = vi.fn();
    const { rerender } = render(
      <crm.TenantDetailLayout
        onAction={action}
        onSecurityClose={securityClose}
        onSecurityOpen={securityOpen}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Voltar para clientes" }));
    fireEvent.click(screen.getByRole("button", { name: "Solicitar grant" }));
    fireEvent.click(screen.getAllByRole("button", { name: "Abrir suporte" })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "Ver auditoria" })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Mais ações" }));

    expect(action).toHaveBeenCalledWith("back-clients");
    expect(action).toHaveBeenCalledWith("request-grant");
    expect(action).toHaveBeenCalledWith("open-support");
    expect(action).toHaveBeenCalledWith("open-audit");
    expect(action).toHaveBeenCalledWith("more-actions");
    expect(securityOpen).toHaveBeenCalledOnce();

    fireEvent.click(screen.getByRole("tab", { name: "Usuários" }));
    expect(screen.getByRole("heading", { name: "Usuários do tenant" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Ver usuários" }));
    expect(action).toHaveBeenCalledWith("tab:usuarios");
    expect(action).toHaveBeenCalledWith("view-users");

    fireEvent.click(screen.getByRole("tab", { name: "Grants" }));
    expect(screen.getByText("Acesso temporário, escopado, e auditado.")).toBeInTheDocument();
    expect(action).toHaveBeenCalledWith("tab:grants");

    const securityPanel = screen.getByRole("complementary", { name: "Segurança do tenant" });
    fireEvent.click(within(securityPanel).getByRole("button", { name: "Usar grant" }));
    fireEvent.click(within(securityPanel).getByRole("button", { name: "Fechar segurança" }));
    expect(action).toHaveBeenCalledWith("security:use");
    expect(securityClose).toHaveBeenCalledOnce();

    rerender(
      <crm.TenantDetailLayout
        onAction={action}
        onSecurityClose={securityClose}
        onSecurityOpen={securityOpen}
        securityOpen={false}
      />
    );
    expect(screen.queryByRole("complementary", { name: "Segurança do tenant" })).not.toBeInTheDocument();
  });

  it("keeps TenantSecurityDrawer composed, interactive, and stateful", () => {
    const action = vi.fn();
    const close = vi.fn();

    const { rerender } = render(<crm.TenantSecurityDrawer onAction={action} onClose={close} />);
    const drawer = screen.getByRole("complementary", { name: "Drawer de segurança do tenant" });

    expect(drawer).toHaveAttribute("data-component", "TenantSecurityDrawer");
    expect(drawer).toHaveAttribute("data-state", "security-review");
    expect(within(drawer).getByText("Grant ativo")).toBeInTheDocument();
    expect(within(drawer).getByText("Copiloto interno")).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: "Ver auditoria" }));
    fireEvent.click(within(drawer).getByRole("button", { name: /Fechar/ }));
    expect(action).toHaveBeenCalledWith("audit");
    expect(close).toHaveBeenCalledTimes(1);

    rerender(<crm.TenantSecurityDrawer onAction={action} state="revoked" />);
    expect(screen.getByRole("button", { name: "Usar grant" })).toBeDisabled();
    expect(screen.getByText("Grant negado")).toBeInTheDocument();

    rerender(<crm.TenantSecurityDrawer onAction={action} state="loading" />);
    const loadingDrawer = screen.getByRole("complementary", { name: "Drawer de segurança do tenant" });
    expect(loadingDrawer).toHaveAttribute("aria-busy", "true");
    expect(within(loadingDrawer).getByRole("button", { name: "Ver auditoria" })).toBeDisabled();

    rerender(<crm.TenantSecurityDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Drawer de segurança do tenant" })).not.toBeInTheDocument();
  });

  it("renders the official tenant summary drawer with governed actions and states", () => {
    const action = vi.fn();
    const close = vi.fn();
    const { rerender } = render(<crm.TenantSummaryDrawer onAction={action} onClose={close} />);

    const drawer = screen.getByRole("complementary", { name: "Resumo do tenant selecionado" });
    expect(drawer).toHaveAttribute("data-component", "TenantSummaryDrawer");
    expect(within(drawer).getByRole("heading", { name: "Studio Vila Mariana" })).toBeInTheDocument();
    expect(within(drawer).getByText("Saúde da conta")).toBeInTheDocument();
    expect(within(drawer).getByText("Atividade recente")).toBeInTheDocument();
    expect(within(drawer).getByText("Copiloto interno")).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole("button", { name: "Abrir tenant" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Ver grants" }));
    fireEvent.click(within(drawer).getByRole("button", { name: "Fechar resumo do tenant" }));
    expect(action).toHaveBeenCalledWith("open-tenant");
    expect(action).toHaveBeenCalledWith("grants");
    expect(close).toHaveBeenCalledOnce();

    rerender(<crm.TenantSummaryDrawer state="risk" />);
    expect(screen.getByText("requer atenção")).toBeInTheDocument();
    expect(screen.getByText(/Há sinais de risco/)).toBeInTheDocument();
    expect(screen.getByText(/priorizar a revisão dos sinais de risco/)).toBeInTheDocument();

    rerender(<crm.TenantSummaryDrawer state="loading" />);
    expect(screen.getByRole("complementary", { name: "Resumo do tenant selecionado" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Abrir tenant" })).toBeDisabled();

    rerender(<crm.TenantSummaryDrawer state="closed" />);
    expect(screen.queryByRole("complementary", { name: "Resumo do tenant selecionado" })).not.toBeInTheDocument();
  });

  it("keeps WeeklyHoursGrid source-shaped and interactive", () => {
    const adjust = vi.fn();
    const slotClick = vi.fn();

    const { rerender } = render(<crm.WeeklyHoursGrid onAdjustDay={adjust} onSlotClick={slotClick} />);
    const grid = screen.getByLabelText(/grade semanal/i);

    expect(grid).toHaveAttribute("data-component", "WeeklyHoursGrid");
    expect(grid).toHaveAttribute("data-state", "editable");
    expect(screen.getByRole("button", { name: /Ajustar/ })).toBeInTheDocument();
    expect(screen.getByRole("gridcell", { name: /Seg.*07:00.*12:00/ })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: /Ajustar/ }));
    fireEvent.click(screen.getByRole("gridcell", { name: /Seg.*07:00.*12:00/ }));
    expect(adjust).toHaveBeenCalledTimes(1);
    expect(slotClick).toHaveBeenCalledWith(expect.objectContaining({ day: "Seg", start: "07:00", end: "12:00" }));

    rerender(<crm.WeeklyHoursGrid state="readonly" onSlotClick={slotClick} />);
    expect(screen.getByRole("gridcell", { name: /Seg.*07:00.*12:00/ })).toBeDisabled();

    rerender(<crm.WeeklyHoursGrid state="conflict" />);
    expect(screen.getByText("Conflito")).toBeInTheDocument();

    rerender(<crm.WeeklyHoursGrid state="loading" />);
    expect(screen.getByLabelText(/grade semanal/i)).toHaveAttribute("aria-busy", "true");

    rerender(
      <crm.WeeklyHoursGrid
        axis={["07h", "18h"]}
        days={["Seg", "Ter"]}
        onSlotClick={slotClick}
        slots={[{ id: "Seg-07", day: "Seg", start: "07:00", end: "08:00", label: "Turma cedo", meta: "4 alunos", tone: "success" }]}
        variant="schedule"
      />
    );
    expect(screen.getByLabelText(/grade semanal/i)).toHaveAttribute("data-variant", "schedule");
    expect(screen.queryByRole("button", { name: /Ajustar/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("gridcell", { name: /Seg.*07:00.*08:00.*Turma cedo/ }));
    expect(slotClick).toHaveBeenCalledWith(expect.objectContaining({ id: "Seg-07", meta: "4 alunos", tone: "success" }));
  });

  it("keeps RoleCard source-shaped and interactive", () => {
    const select = vi.fn();
    const open = vi.fn();

    const { rerender } = render(<crm.RoleCard onOpen={open} onSelect={select} />);
    const card = screen.getByRole("button", { name: /Letícia Ramos/i });

    expect(card).toHaveAttribute("data-component", "RoleCard");
    expect(card).toHaveAttribute("data-state", "owner");
    expect(screen.getByText("Dono/Admin")).toBeInTheDocument();
    expect(screen.getByText("leticia@studio.com")).toBeInTheDocument();
    expect(screen.getByText("(11) 99999-0000")).toBeInTheDocument();
    expect(screen.getByText("Confirmado")).toBeInTheDocument();

    fireEvent.click(card);
    expect(select).toHaveBeenCalledWith("owner");
    expect(open).toHaveBeenCalledTimes(1);

    rerender(<crm.RoleCard onSelect={select} state="staff" />);
    expect(screen.getByRole("button", { name: /Ana Martins/i })).toHaveAttribute("data-state", "staff");
    expect(screen.getByText("Convite preparado")).toBeInTheDocument();

    rerender(<crm.RoleCard onSelect={select} state="loading" />);
    expect(screen.getByRole("button", { name: /Carregando/i })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: /Carregando/i })).toBeDisabled();

    rerender(<crm.RoleCard onSelect={select} state="blocked" />);
    expect(screen.getByRole("button", { name: /Letícia Ramos/i })).toBeDisabled();
    expect(screen.getByText("Bloqueado")).toBeInTheDocument();
  });

  it("keeps InviteRow source-shaped and interactive", () => {
    const open = vi.fn();
    const edit = vi.fn();
    const remove = vi.fn();

    const { rerender } = render(<crm.InviteRow onEdit={edit} onOpen={open} onRemove={remove} />);
    const row = screen.getByRole("button", { name: /Ana Martins.*Professor.*Convite preparado/i });

    expect(row).toHaveAttribute("data-component", "InviteRow");
    expect(row).toHaveAttribute("data-state", "prepared");
    expect(screen.getByText("AM")).toBeInTheDocument();
    expect(screen.getByText("ana@studio.com")).toBeInTheDocument();
    expect(screen.getByText("(11) 98888-1111")).toBeInTheDocument();

    fireEvent.click(row);
    fireEvent.keyDown(row, { key: "Enter" });
    fireEvent.click(screen.getByRole("button", { name: "Editar Ana Martins" }));
    fireEvent.click(screen.getByRole("button", { name: "Remover Ana Martins" }));
    expect(open).toHaveBeenCalledTimes(2);
    expect(edit).toHaveBeenCalledWith(expect.objectContaining({ id: "ana-martins" }), "prepared");
    expect(remove).toHaveBeenCalledWith(expect.objectContaining({ id: "ana-martins" }), "prepared");

    rerender(<crm.InviteRow onEdit={edit} onOpen={open} onRemove={remove} state="incomplete" />);
    expect(screen.getByRole("button", { name: /Roberto Lima.*Dados incompletos/i })).toHaveAttribute("data-state", "incomplete");
    expect(screen.getByText("RL")).toBeInTheDocument();
    expect(screen.getByText("Dados incompletos")).toBeInTheDocument();

    rerender(<crm.InviteRow onEdit={edit} onOpen={open} onRemove={remove} state="loading" />);
    expect(screen.getByRole("button", { name: /Carregando equipe.*Atualizando/i })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Editar Carregando equipe" })).toBeDisabled();

    rerender(<crm.InviteRow onEdit={edit} onOpen={open} onRemove={remove} state="blocked" />);
    expect(screen.getByRole("button", { name: /Acesso bloqueado.*Bloqueado/i })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "Remover Acesso bloqueado" })).toBeDisabled();
  });

  it("keeps PaymentMethodRow source-shaped and interactive", () => {
    const select = vi.fn();

    const { rerender } = render(<crm.PaymentMethodRow onSelect={select} />);
    const pix = screen.getByRole("button", { name: /Pix.*Pagamento por Pix/i });

    expect(pix).toHaveAttribute("data-component", "PaymentMethodRow");
    expect(pix).toHaveAttribute("data-method", "pix");
    expect(pix).toHaveAttribute("data-state", "selected");
    expect(pix).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(pix);
    expect(select).toHaveBeenCalledWith("pix", "selected");

    rerender(<crm.PaymentMethodRow method="cash" onSelect={select} />);
    expect(screen.getByRole("button", { name: /Dinheiro.*Recebido presencialmente/i })).toHaveAttribute("data-method", "cash");

    rerender(<crm.PaymentMethodRow method="card" onSelect={select} state="failed" />);
    expect(screen.getByRole("button", { name: /Cartão.*Precisa revisar/i })).toHaveAttribute("data-state", "failed");

    rerender(<crm.PaymentMethodRow method="pix" onSelect={select} state="loading" />);
    expect(screen.getByRole("button", { name: /Pix.*Pagamento por Pix/i })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: /Pix.*Pagamento por Pix/i })).toBeDisabled();

    rerender(<crm.PaymentMethodRow method="pix" onSelect={select} state="disabled" />);
    expect(screen.getByRole("button", { name: /Pix.*Pagamento por Pix/i })).toBeDisabled();
  });

  it("keeps UsageOriginRow source-shaped and interactive", () => {
    const select = vi.fn();

    const { rerender } = render(<crm.UsageOriginRow onSelect={select} origin="attendance" />);
    const attendance = screen.getByRole("button", { name: /Atendimento.*2\.400.*38%/i });

    expect(attendance).toHaveAttribute("data-component", "UsageOriginRow");
    expect(attendance).toHaveAttribute("data-origin", "attendance");
    expect(attendance).toHaveAttribute("data-state", "source");

    fireEvent.click(attendance);
    expect(select).toHaveBeenCalledWith("attendance", "source");

    rerender(<crm.UsageOriginRow onSelect={select} origin="agenda" state="selected" />);
    expect(screen.getByRole("button", { name: /Agenda.*1\.600.*25%/i })).toHaveAttribute("aria-pressed", "true");

    rerender(<crm.UsageOriginRow onSelect={select} state="automation" />);
    expect(screen.getByRole("button", { name: /Automacao.*900.*14%/i })).toHaveAttribute("data-origin", "automation");

    rerender(<crm.UsageOriginRow onSelect={select} origin="sales" state="loading" />);
    expect(screen.getByRole("button", { name: /Vendas.*1\.200.*19%/i })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: /Vendas.*1\.200.*19%/i })).toBeDisabled();

    rerender(<crm.UsageOriginRow onSelect={select} origin="finance" state="disabled" />);
    expect(screen.getByRole("button", { name: /Financeiro.*700.*11%/i })).toBeDisabled();

    rerender(<crm.UsageOriginRow onSelect={select} origin="other" state="blocked" />);
    expect(screen.getByRole("button", { name: /Outros.*400.*7%/i })).toBeDisabled();
  });

  it("owns the usage overview source anatomy, states, and actions", () => {
    const viewLedger = vi.fn();
    const viewAddOns = vi.fn();
    const viewFlows = vi.fn();
    const selectOrigin = vi.fn();

    const { container, rerender } = render(
      <crm.UsageOverviewWorkspace
        onOriginSelect={selectOrigin}
        onViewAddOns={viewAddOns}
        onViewFlows={viewFlows}
        onViewLedger={viewLedger}
      />
    );

    const workspace = container.querySelector('[data-component="UsageOverviewWorkspace"]');
    expect(workspace).toHaveAttribute("data-state", "source");
    expect(within(workspace as HTMLElement).getByText("Origem do consumo")).toBeInTheDocument();
    expect(within(workspace as HTMLElement).getByText("Alertas e economia")).toBeInTheDocument();
    expect(within(workspace as HTMLElement).getByText("O que foi afetado")).toBeInTheDocument();
    expect(within(workspace as HTMLElement).getAllByRole("button")).toHaveLength(8);

    fireEvent.click(screen.getByRole("button", { name: "Ver extrato" }));
    fireEvent.click(screen.getByRole("button", { name: "Ver add-ons" }));
    fireEvent.click(screen.getByRole("button", { name: /Atendimento.*2\.400.*38%/i }));
    fireEvent.click(screen.getByRole("button", { name: "Ver fluxos" }));
    expect(viewLedger).toHaveBeenCalledTimes(1);
    expect(viewAddOns).toHaveBeenCalledTimes(1);
    expect(selectOrigin).toHaveBeenCalledWith("attendance", "source");
    expect(viewFlows).toHaveBeenCalledTimes(1);

    rerender(<crm.UsageOverviewWorkspace blockedReason="Acesso bloqueado" />);
    expect(container.querySelector('[data-component="UsageOverviewWorkspace"]')).toHaveAttribute("data-state", "blocked");
    screen.getAllByRole("button").forEach((button) => expect(button).toBeDisabled());

    rerender(<crm.UsageOverviewWorkspace loading />);
    expect(container.querySelector('[data-component="UsageOverviewWorkspace"]')).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Carregando origens")).toBeInTheDocument();

    rerender(<crm.UsageOverviewWorkspace error="Falha no ciclo" />);
    expect(screen.getByText("Não foi possível carregar o uso")).toBeInTheDocument();
    expect(screen.getByText("Falha no ciclo")).toBeInTheDocument();
  });

  it("keeps ExportAction source-shaped and interactive", () => {
    const exportReport = vi.fn();
    const selectAction = vi.fn();
    const openChange = vi.fn();

    const { rerender } = render(<crm.ExportAction onExport={exportReport} />);
    const exportButton = screen.getByRole("button", { name: "Exportar" });

    expect(exportButton.closest('[data-component="ExportAction"]')).toHaveAttribute("data-state", "default");
    fireEvent.click(exportButton);
    expect(exportReport).toHaveBeenCalledTimes(1);

    rerender(<crm.ExportAction loading onExport={exportReport} />);
    expect(screen.getByRole("button", { name: "Exportar" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Exportar" })).toBeDisabled();

    rerender(<crm.ExportAction disabled onExport={exportReport} />);
    expect(screen.getByRole("button", { name: "Exportar" })).toBeDisabled();

    rerender(
      <crm.ExportAction
        actions={[
          { label: "CSV", icon: "download" },
          { label: "PDF", icon: "fileText" }
        ]}
        onActionSelect={selectAction}
        onOpenChange={openChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Exportar" }));
    expect(openChange).toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByRole("menuitem", { name: "CSV" }));
    expect(selectAction).toHaveBeenCalledWith(expect.objectContaining({ label: "CSV" }));
    expect(openChange).toHaveBeenLastCalledWith(false);
  });

  it("keeps batch 10 support, internal, reports, data quality, and blocked states interactive", () => {
    const action = vi.fn();
    const open = vi.fn();
    const opportunityGroupOpen = vi.fn();
    const opportunityItemOpen = vi.fn();
    const exportReport = vi.fn();
    const reportAdvanced = vi.fn();
    const reportOwner = vi.fn();
    const reportPeriod = vi.fn();
    const reportUnit = vi.fn();
    const reportStatOpen = vi.fn();
    const pauseImport = vi.fn();
    const detailsImport = vi.fn();
    const rowClick = vi.fn();
    const confirm = vi.fn();
    const cancel = vi.fn();

    render(
      <div>
        <div data-testid="cancellation"><crm.CancellationCase onAction={action} /></div>
        <div data-testid="reactivation"><crm.ReactivationCard onAction={action} /></div>
        <div data-testid="complaint"><crm.ComplaintPanel onAction={action} /></div>
        <div data-testid="support"><crm.SupportTicketPanel onAction={action} /></div>
        <div data-testid="grant"><crm.GrantAccessPanel onAction={action} /></div>
        <div data-testid="tenant"><crm.TenantCard onOpen={open} /></div>
        <div data-testid="security"><crm.SecurityRulePanel onAction={action} /></div>
        <div data-testid="chart"><crm.ChartPanel onOpen={open} /></div>
        <div data-testid="chart-summary"><crm.ChartPanel layout="summary" stats={[{ id: "cash", label: "Recebimentos", value: "+8%", icon: "arrowRight" }]} /></div>
        <div data-testid="chart-exports"><crm.ChartPanel layout="exports" onStatOpen={reportStatOpen} stats={[{ id: "file", label: "Financeiro mensal", value: "pronto", detail: "Hoje 08:12", icon: "fileText" }]} /></div>
        <div data-testid="chart-recommendation"><crm.ChartPanel impact="Priorize o caixa" layout="recommendation" /></div>
        <div data-testid="filters"><crm.ReportFilterBar onAdvancedFilters={reportAdvanced} onExport={exportReport} onOwnerChange={reportOwner} onPeriodChange={reportPeriod} onUnitChange={reportUnit} /></div>
        <div data-testid="opportunity-group"><crm.OpportunityGroupCard onItemOpen={opportunityItemOpen} onOpen={opportunityGroupOpen} /></div>
        <div data-testid="opportunity">
          <crm.OpportunityPanel
            description="Compareceu hoje"
            facts={[{ id: "origin", label: "Origem", value: "Experimental", icon: "folder" }]}
            history={[{ id: "visit", label: "Aula concluida", time: "hoje 09:20" }]}
            onAction={action}
            primaryActionLabel="Fazer pos-aula"
            title="Julia Ramos"
          />
        </div>
        <div data-testid="import"><crm.ImportProgress onDetails={detailsImport} onPause={pauseImport} /></div>
        <div data-testid="mapping"><crm.FieldMappingTable onRowClick={rowClick} /></div>
        <div data-testid="duplicate"><crm.DuplicateResolver onAction={action} /></div>
        <div data-testid="permission"><crm.PermissionState onAction={open} /></div>
        <div data-testid="plan"><crm.PlanBlockedState onAction={open} /></div>
        <div data-testid="quota"><crm.QuotaBlockedState onAction={open} /></div>
        <div data-testid="integration"><crm.IntegrationFailedState onAction={open} /></div>
        <crm.SensitiveActionDialog inline onCancel={cancel} onConfirm={confirm} />
      </div>
    );

    fireEvent.click(within(screen.getByTestId("cancellation")).getByRole("button", { name: "Enviar mensagem" }));
    fireEvent.click(within(screen.getByTestId("reactivation")).getByRole("button", { name: "Reservar vaga" }));
    fireEvent.click(within(screen.getByTestId("complaint")).getByRole("button", { name: "Escalar" }));
    fireEvent.click(within(screen.getByTestId("support")).getByRole("button", { name: "Autorizar acesso" }));
    fireEvent.click(within(screen.getByTestId("grant")).getByRole("button", { name: "Encerrar grant" }));
    fireEvent.click(within(screen.getByTestId("tenant")).getByRole("button", { name: "Abrir tenant" }));
    fireEvent.click(within(screen.getByTestId("security")).getByRole("button", { name: "Ver auditoria" }));
    fireEvent.click(within(screen.getByTestId("chart")).getByRole("button", { name: "Abrir financeiro" }));
    expect(within(screen.getByTestId("chart-summary")).getByText("Recebimentos").closest("[data-layout='summary']")).toBeInTheDocument();
    expect(within(screen.getByTestId("chart-exports")).getByText("Hoje 08:12")).toBeInTheDocument();
    fireEvent.click(within(screen.getByTestId("chart-exports")).getByRole("button", { name: "Abrir Financeiro mensal" }));
    expect(within(screen.getByTestId("chart-recommendation")).getByText("Priorize o caixa")).toBeInTheDocument();
    const reportFilters = within(screen.getByTestId("filters"));
    fireEvent.click(reportFilters.getByRole("button", { name: "Hoje" }));
    fireEvent.click(reportFilters.getByRole("combobox", { name: "Unidade" }));
    fireEvent.click(screen.getByRole("option", { name: "Vila Mariana" }));
    fireEvent.click(reportFilters.getByRole("combobox", { name: /Respons/ }));
    fireEvent.click(screen.getByRole("option", { name: "Mariana" }));
    fireEvent.click(reportFilters.getByRole("button", { name: "Mais filtros" }));
    fireEvent.click(reportFilters.getByRole("button", { name: "Exportar" }));
    fireEvent.click(within(screen.getByTestId("opportunity-group")).getByRole("button", { name: /R\$ 1\.260/ }));
    fireEvent.click(within(screen.getByTestId("opportunity-group")).getByRole("button", { name: "Enviar Pix" }));
    expect(within(screen.getByTestId("opportunity")).getByRole("heading", { name: "Julia Ramos" })).toBeInTheDocument();
    expect(within(screen.getByTestId("opportunity")).getByText("Experimental")).toBeInTheDocument();
    expect(within(screen.getByTestId("opportunity")).getByText("Aula concluida")).toBeInTheDocument();
    fireEvent.click(within(screen.getByTestId("opportunity")).getByRole("button", { name: "Fazer pos-aula" }));
    fireEvent.click(within(screen.getByTestId("opportunity")).getByRole("button", { name: "Criar tarefa" }));
    fireEvent.click(within(screen.getByTestId("import")).getByRole("button", { name: "Pausar" }));
    fireEvent.click(within(screen.getByTestId("import")).getByRole("button", { name: "Ver detalhes" }));
    fireEvent.click(within(screen.getByTestId("mapping")).getByText("Nome do aluno"));
    fireEvent.click(within(screen.getByTestId("duplicate")).getByRole("button", { name: "Mesclar registros" }));
    fireEvent.click(within(screen.getByTestId("permission")).getByRole("button", { name: "Solicitar acesso" }));
    fireEvent.click(within(screen.getByTestId("plan")).getByRole("button", { name: "Falar com suporte" }));
    fireEvent.click(within(screen.getByTestId("quota")).getByRole("button", { name: "Ver fluxos" }));
    fireEvent.click(within(screen.getByTestId("integration")).getByRole("button", { name: "Reconectar" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    fireEvent.click(screen.getByRole("button", { name: /Confirmar a.*sens/i }));

    expect(action).toHaveBeenCalledWith("message");
    expect(action).toHaveBeenCalledWith("reserve");
    expect(action).toHaveBeenCalledWith("escalate");
    expect(action).toHaveBeenCalledWith("access");
    expect(action).toHaveBeenCalledWith("revoke");
    expect(action).toHaveBeenCalledWith("audit");
    expect(action).toHaveBeenCalledWith("primary");
    expect(action).toHaveBeenCalledWith("task");
    expect(action).toHaveBeenCalledWith("merge-a");
    expect(open).toHaveBeenCalledTimes(6);
    expect(opportunityGroupOpen).toHaveBeenCalledTimes(1);
    expect(opportunityItemOpen).toHaveBeenCalledWith(expect.objectContaining({ id: "ana" }));
    expect(exportReport).toHaveBeenCalledTimes(1);
    expect(reportAdvanced).toHaveBeenCalledTimes(1);
    expect(reportOwner).toHaveBeenCalledWith("mariana");
    expect(reportPeriod).toHaveBeenCalledWith("today");
    expect(reportStatOpen).toHaveBeenCalledWith(expect.objectContaining({ id: "file" }));
    expect(reportUnit).toHaveBeenCalledWith("vila-mariana");
    expect(pauseImport).toHaveBeenCalledTimes(1);
    expect(detailsImport).toHaveBeenCalledTimes(1);
    expect(rowClick).toHaveBeenCalledWith("nome");
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(confirm).toHaveBeenCalledTimes(1);
  });

  it("renders TaskDrawer as the source-derived task panel with real actions", () => {
    const close = vi.fn();
    const assume = vi.fn();
    const complete = vi.fn();
    const delegate = vi.fn();
    const reschedule = vi.fn();
    const comment = vi.fn();
    const more = vi.fn();
    const origin = vi.fn();
    const checklist = vi.fn();

    const { rerender } = render(
      <crm.TaskDrawer
        onChecklistToggle={checklist}
        onClose={close}
        onComplete={complete}
        onAssume={assume}
        onComment={comment}
        onDelegate={delegate}
        onMore={more}
        onOpenOrigin={origin}
        onReschedule={reschedule}
      />
    );

    const drawer = screen.getByRole("complementary", { name: "Detalhes da tarefa" });
    expect(drawer).toHaveAttribute("data-component", "TaskDrawer");
    expect(drawer).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("heading", { name: "Confirmar reposição da Ana" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Checklist / subtarefas" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Comentários" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Histórico" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Fechar tarefa" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir origem" }));
    fireEvent.click(screen.getByRole("button", { name: "Assumir" }));
    fireEvent.click(screen.getByRole("button", { name: /Concluir/ }));
    fireEvent.click(screen.getByRole("button", { name: "Delegar" }));
    fireEvent.click(screen.getByRole("button", { name: "Reagendar" }));
    fireEvent.click(screen.getByRole("button", { name: "Comentar" }));
    fireEvent.click(screen.getByRole("button", { name: "..." }));
    fireEvent.click(screen.getByRole("button", { name: /Verificar horários disponíveis/ }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(assume).toHaveBeenCalledTimes(1);
    expect(complete).toHaveBeenCalledTimes(1);
    expect(delegate).toHaveBeenCalledTimes(1);
    expect(reschedule).toHaveBeenCalledTimes(1);
    expect(comment).toHaveBeenCalledTimes(1);
    expect(more).toHaveBeenCalledTimes(1);
    expect(origin).toHaveBeenCalledTimes(1);
    expect(checklist).toHaveBeenCalledWith(expect.objectContaining({ id: "verify-times" }), true);

    rerender(<crm.TaskDrawer state="loading" />);
    expect(screen.getByRole("complementary", { name: "Detalhes da tarefa" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Abrir origem" })).toBeDisabled();

    rerender(<crm.TaskDrawer state="blocked" />);
    expect(screen.getByRole("button", { name: "Abrir origem" })).toBeDisabled();

    rerender(
      <crm.TaskDrawer
        checklistTitle="Checklist"
        commentsTitle="Comentário recente"
        copilotSuggestion={null}
        footerLayout="conversation"
        historyTitle="Última atividade"
        label="Tarefa"
        showChecklistProgress={false}
        showCommentsLink={false}
        size="compact"
        statusLabel="Pendente"
        title="Confirmar reposição com Ana Paula"
      />
    );
    expect(screen.getByRole("complementary", { name: "Detalhes da tarefa" })).toHaveClass("tcrm-task-drawer--compact");
    expect(screen.getByRole("heading", { name: "Confirmar reposição com Ana Paula" })).toBeInTheDocument();
    expect(screen.getByText("Tarefa")).toBeInTheDocument();
    expect(screen.getByText("Pendente")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Checklist" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Comentário recente" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Última atividade" }).compareDocumentPosition(screen.getByRole("heading", { name: "Comentário recente" })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("button", { name: "Abrir origem" })).toHaveClass("tcrm-drawer-frame__action--origin-secondary");
    expect(screen.getByRole("button", { name: "Abrir origem" })).not.toHaveClass("tcrm-drawer-frame__action--origin-primary");
    expect(screen.queryByRole("heading", { name: "Sugestão do Copiloto" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Abrir conversa/ }));

    rerender(<crm.TaskDrawer activityOrder="comments-history" />);
    expect(screen.getByRole("heading", { name: "Comentários" }).compareDocumentPosition(screen.getByRole("heading", { name: "Histórico" })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    rerender(
      <crm.TaskDrawer
        activityDensity="comfortable"
        facts={[{ id: "deadline", icon: "calendar", label: "Prazo", value: "Hoje", tone: "danger", showToneIcon: false }]}
        size="compact"
      />
    );
    expect(screen.getByRole("heading", { name: "Confirmar reposição da Ana" }).closest("header")).toHaveClass("tcrm-drawer-frame__header--without-label");
    expect(screen.getByRole("complementary", { name: "Detalhes da tarefa" })).toHaveClass("tcrm-task-drawer--activity-comfortable");
    expect(screen.getByText("Hoje").closest("dd")?.querySelector("svg")).toBeNull();

    rerender(<crm.TaskDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Detalhes da tarefa" })).not.toBeInTheDocument();
  });

  it("renders ChecklistDrawer as the source-derived checklist execution panel with real actions", () => {
    const close = vi.fn();
    const stepToggle = vi.fn();
    const continueAction = vi.fn();
    const createTask = vi.fn();
    const complete = vi.fn();
    const origin = vi.fn();

    const { rerender } = render(
      <crm.ChecklistDrawer
        facts={[
          { id: "status", icon: "calendar", label: "Status", value: "Em andamento" },
          { id: "owner", icon: "user", label: "Responsável", value: "Mariana", avatarSrc: "/mariana.png" },
          { id: "deadline", icon: "calendar", label: "Prazo", value: "Hoje 08:00", tone: "danger" },
          { id: "progress", icon: "clock", label: "Progresso", value: "3/5" }
        ]}
        onClose={close}
        onStepToggle={stepToggle}
        onContinue={continueAction}
        onCreateTask={createTask}
        onComplete={complete}
        onOpenOrigin={origin}
      />
    );

    const drawer = screen.getByRole("complementary", { name: "Detalhes do checklist" });
    expect(drawer).toHaveAttribute("data-component", "ChecklistDrawer");
    expect(drawer).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("heading", { name: "Abertura do estúdio" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Passos" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Última atividade" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Comentário recente" })).toBeInTheDocument();
    expect(screen.getAllByLabelText("Mariana").some((avatar) => avatar.querySelector("img")?.getAttribute("src") === "/mariana.png")).toBe(true);
    expect(screen.getByRole("progressbar", { name: "Progresso do checklist" })).toHaveAttribute("aria-valuenow", "60");

    fireEvent.click(screen.getByRole("button", { name: "Fechar checklist" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));
    fireEvent.click(screen.getByRole("button", { name: "Criar tarefa" }));
    fireEvent.click(screen.getByRole("button", { name: "Concluir" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir origem" }));
    fireEvent.click(screen.getByRole("button", { name: /Validar professores confirmados/ }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(continueAction).toHaveBeenCalledTimes(1);
    expect(createTask).toHaveBeenCalledTimes(1);
    expect(complete).toHaveBeenCalledTimes(1);
    expect(origin).toHaveBeenCalledTimes(1);
    expect(stepToggle).toHaveBeenCalledWith(expect.objectContaining({ id: "validate-teachers" }), true);

    rerender(<crm.ChecklistDrawer state="loading" />);
    expect(screen.getByRole("complementary", { name: "Detalhes do checklist" })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Continuar" })).toBeDisabled();

    rerender(<crm.ChecklistDrawer state="blocked" />);
    expect(screen.getByRole("button", { name: "Continuar" })).toBeDisabled();

    rerender(<crm.ChecklistDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: "Detalhes do checklist" })).not.toBeInTheDocument();
  });

  it("renders ApprovalDrawer by composing the certified ApprovalPanel with real drawer behavior", () => {
    const action = vi.fn();
    const close = vi.fn();
    const approve = vi.fn();
    const edit = vi.fn();
    const reject = vi.fn();
    const requestData = vi.fn();
    const origin = vi.fn();

    const { rerender } = render(
      <crm.ApprovalDrawer
        onAction={action}
        onApprove={approve}
        onClose={close}
        onEdit={edit}
        onOpenOrigin={origin}
        onReject={reject}
        onRequestData={requestData}
      />
    );

    const drawer = screen.getByRole("complementary", { name: /Detalhes da aprova/ });
    expect(drawer).toHaveAttribute("data-component", "ApprovalDrawer");
    expect(drawer).toHaveAttribute("data-state", "pending");
    expect(screen.getByRole("heading", { name: /Aprovar mensagem para Ana Paula/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Fechar aprova/ }));
    fireEvent.click(screen.getByRole("button", { name: "Aprovar" }));
    fireEvent.click(screen.getByRole("button", { name: "Editar" }));
    fireEvent.click(screen.getByRole("button", { name: "Rejeitar" }));
    fireEvent.click(screen.getByRole("button", { name: "Pedir dados" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir origem" }));

    expect(close).toHaveBeenCalledTimes(1);
    expect(approve).toHaveBeenCalledTimes(1);
    expect(edit).toHaveBeenCalledTimes(1);
    expect(reject).toHaveBeenCalledTimes(1);
    expect(requestData).toHaveBeenCalledTimes(1);
    expect(origin).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith("close");
    expect(action).toHaveBeenCalledWith("approve");
    expect(action).toHaveBeenCalledWith("edit");
    expect(action).toHaveBeenCalledWith("reject");
    expect(action).toHaveBeenCalledWith("request-data");
    expect(action).toHaveBeenCalledWith("open-origin");

    rerender(<crm.ApprovalDrawer state="loading" />);
    expect(screen.getByRole("complementary", { name: /Detalhes da aprova/ })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Aprovar" })).toBeDisabled();

    rerender(<crm.ApprovalDrawer blockedReason="Aprovação bloqueada por política" state="blocked" />);
    expect(screen.getByRole("button", { name: "Editar" })).toBeDisabled();

    rerender(<crm.ApprovalDrawer open={false} />);
    expect(screen.queryByRole("complementary", { name: /Detalhes da aprova/ })).not.toBeInTheDocument();
  });

  it("renders the Image 11 compact ApprovalPanel with consumer-controlled decisions", () => {
    const action = vi.fn();
    const approve = vi.fn();
    const edit = vi.fn();
    const reject = vi.fn();

    const { rerender } = render(
      <crm.ApprovalPanel layout="compact" onAction={action} onApprove={approve} onEdit={edit} onReject={reject} />
    );

    const panel = screen.getByRole("region", { name: "Aprovação da ação" });
    expect(panel).toHaveAttribute("data-component", "ApprovalPanel");
    expect(panel).toHaveAttribute("data-layout", "compact");
    expect(screen.getByRole("heading", { name: "Ação proposta pelo agente" })).toBeInTheDocument();
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Hoje, 09:30")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Aprovar" }));
    fireEvent.click(screen.getByRole("button", { name: "Editar" }));
    fireEvent.click(screen.getByRole("button", { name: "Rejeitar" }));

    expect(approve).toHaveBeenCalledTimes(1);
    expect(edit).toHaveBeenCalledTimes(1);
    expect(reject).toHaveBeenCalledTimes(1);
    expect(action.mock.calls.map(([value]) => value)).toEqual(["approve", "edit", "reject"]);

    rerender(<crm.ApprovalPanel layout="compact" state="approved" />);
    expect(screen.getByRole("button", { name: "Aprovar" })).toBeDisabled();
  });

  it("renders the Image 11 compact success and failure ExecutionReceipt states", () => {
    const { rerender } = render(<crm.ExecutionReceipt layout="compact" />);

    const success = screen.getByRole("region", { name: "Ação executada com sucesso" });
    expect(success).toHaveAttribute("data-component", "ExecutionReceipt");
    expect(success).toHaveAttribute("data-layout", "compact");
    expect(success).toHaveAttribute("data-state", "success");
    expect(screen.getByText("Mensagem de confirmação enviada para Ana Paula Santos.")).toBeInTheDocument();
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Concluído")).toBeInTheDocument();

    rerender(<crm.ExecutionReceipt layout="compact" state="failed" />);
    const failed = screen.getByRole("region", { name: "Ação falhou" });
    expect(failed).toHaveAttribute("data-state", "failed");
    expect(screen.getByText("Número não ativo no WhatsApp.")).toBeInTheDocument();
    expect(screen.getByText("Falha")).toBeInTheDocument();
  });

  it("renders the Image 11 compact HandoffBanner ownership card", () => {
    render(<crm.HandoffBanner layout="compact" ownerAvatarSrc="/sam-frank.png" />);

    const handoff = screen.getByRole("status", { name: "Transferência para agente humano" });
    expect(handoff).toHaveAttribute("data-component", "HandoffBanner");
    expect(handoff).toHaveAttribute("data-layout", "compact");
    expect(handoff).toHaveAttribute("data-state", "human active");
    expect(screen.getByText("Conversa transferida para atendimento humano.")).toBeInTheDocument();
    expect(screen.getByText("Sam Frank")).toBeInTheDocument();
    expect(screen.getByText("Hoje, 09:32")).toBeInTheDocument();
    expect(screen.getByText("Em atendimento humano")).toBeInTheDocument();
    expect(screen.getByLabelText("Sam Frank").querySelector("img")).toHaveAttribute("src", "/sam-frank.png");
  });

  it("owns the setup consumption workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onModelSelect = vi.fn();
    const onSettingChange = vi.fn();

    render(
      <crm.SetupConsumptionWorkspace
        onAction={onAction}
        onModelSelect={onModelSelect}
        onSettingChange={onSettingChange}
      />
    );

    expect(screen.getByRole("heading", { name: "Consumo de aulas" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Mensalidade/ }));
    fireEvent.click(screen.getByRole("switch", { name: "Renova automaticamente" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar rascunho" }));

    expect(onModelSelect).toHaveBeenCalledWith("membership");
    expect(onSettingChange).toHaveBeenCalledWith("auto-renew", false);
    expect(onAction).toHaveBeenCalledWith("save");
  });

  it("owns the setup Studio workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onActiveDaysChange = vi.fn();
    const onAdjustDay = vi.fn();
    const onScheduleModeChange = vi.fn();

    render(
      <crm.SetupStudioWorkspace
        onAction={onAction}
        onActiveDaysChange={onActiveDaysChange}
        onAdjustDay={onAdjustDay}
        onScheduleModeChange={onScheduleModeChange}
      />
    );

    expect(screen.getByRole("heading", { name: "Studio" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: "Seg" }));
    fireEvent.click(screen.getByRole("button", { name: "Tem pausa" }));
    fireEvent.click(screen.getByRole("button", { name: /Ajustar hor.rios por dia/i }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar rascunho" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onActiveDaysChange).toHaveBeenCalledWith(["Ter", "Qua", "Qui", "Sex"]);
    expect(onScheduleModeChange).toHaveBeenCalledWith("break");
    expect(onAdjustDay).toHaveBeenCalledOnce();
    expect(onAction).toHaveBeenCalledWith("save");
    expect(onAction).toHaveBeenCalledWith("continue");
  });

  it("owns the setup team workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onAddPerson = vi.fn();
    const onInviteEdit = vi.fn();
    const onInviteRemove = vi.fn();

    render(
      <crm.SetupTeamWorkspace
        onAction={onAction}
        onAddPerson={onAddPerson}
        onInviteEdit={onInviteEdit}
        onInviteRemove={onInviteRemove}
      />
    );

    expect(screen.getByRole("heading", { name: "Equipe" })).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toHaveValue("Ana Martins");
    fireEvent.click(screen.getByRole("button", { name: "Adicionar pessoa" }));
    fireEvent.click(screen.getByRole("button", { name: /Editar Ana Martins/i }));
    fireEvent.click(screen.getByRole("button", { name: /Remover Roberto Lima/i }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar rascunho" }));
    fireEvent.click(screen.getByRole("button", { name: "Configurar equipe depois" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onAddPerson).toHaveBeenCalledOnce();
    expect(onInviteEdit).toHaveBeenCalledWith(expect.objectContaining({ id: "ana-martins" }), "prepared");
    expect(onInviteRemove).toHaveBeenCalledWith(expect.objectContaining({ id: "roberto-lima" }), "incomplete");
    expect(onAction.mock.calls.map(([action]) => action)).toEqual(["save", "later", "continue"]);
  });

  it("owns the setup channels workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onConnectWhatsApp = vi.fn();
    const onWhatsAppStateChange = vi.fn();

    render(
      <crm.SetupChannelsWorkspace
        onAction={onAction}
        onConnectWhatsApp={onConnectWhatsApp}
        onWhatsAppStateChange={onWhatsAppStateChange}
      />
    );

    expect(screen.getByRole("heading", { name: "Canais" })).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail do studio")).toHaveValue("contato@studioleticia.com");
    fireEvent.click(screen.getByRole("button", { name: /Ainda esta no WhatsApp pessoal/i }));
    fireEvent.click(screen.getByRole("button", { name: "Conectar WhatsApp Business" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar rascunho" }));
    fireEvent.click(screen.getByRole("button", { name: "Configurar canais depois" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onWhatsAppStateChange).toHaveBeenCalledWith("personal");
    expect(onConnectWhatsApp).toHaveBeenCalledOnce();
    expect(onAction.mock.calls.map(([action]) => action)).toEqual(["save", "later", "continue"]);
  });

  it("owns the setup plans workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onNewPlan = vi.fn();
    const onPlanAction = vi.fn();
    const onPlanSelect = vi.fn();

    render(
      <crm.SetupPlansWorkspace
        onAction={onAction}
        onNewPlan={onNewPlan}
        onPlanAction={onPlanAction}
        onPlanSelect={onPlanSelect}
      />
    );

    expect(screen.getByRole("heading", { name: "Planos" })).toBeInTheDocument();
    expect(screen.getByLabelText("1. Nome do plano")).toHaveValue("Pacote 8 aulas");
    fireEvent.click(screen.getByRole("button", { name: /Aula experimental/ }));
    fireEvent.click(screen.getByRole("button", { name: "Novo plano" }));
    fireEvent.click(screen.getAllByRole("button", { name: "Editar" })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Salvar rascunho" }));
    fireEvent.click(screen.getByRole("button", { name: "Configurar planos depois" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onPlanSelect).toHaveBeenCalledWith("trial");
    expect(onNewPlan).toHaveBeenCalledOnce();
    expect(onPlanAction).toHaveBeenCalledWith("weekly", "edit");
    expect(onAction.mock.calls.map(([action]) => action)).toEqual(["save", "later", "continue"]);
  });

  it("owns the setup payment workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onLearnMore = vi.fn();
    const onSelectedMethodsChange = vi.fn();

    render(
      <crm.SetupPaymentWorkspace
        onAction={onAction}
        onLearnMore={onLearnMore}
        onSelectedMethodsChange={onSelectedMethodsChange}
      />
    );

    expect(screen.getByRole("heading", { name: "Pagamento" })).toBeInTheDocument();
    expect(screen.getByText("Plano gera cobranca")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /PixPagamento por Pix/i }));
    fireEvent.click(screen.getByRole("button", { name: "Entender Pagamentos Taliya" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar rascunho" }));
    fireEvent.click(screen.getByRole("button", { name: "Configurar pagamento depois" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onSelectedMethodsChange).toHaveBeenCalledWith(["cash", "card"]);
    expect(onLearnMore).toHaveBeenCalledOnce();
    expect(onAction.mock.calls.map(([action]) => action)).toEqual(["save", "later", "continue"]);
  });

  it("owns the setup students workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onSourceSelect = vi.fn();
    const onStudentAction = vi.fn();

    render(<crm.SetupStudentsWorkspace onAction={onAction} onSourceSelect={onSourceSelect} onStudentAction={onStudentAction} />);

    expect(screen.getByRole("heading", { name: "Alunos" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Alunos preparados" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Enviar foto\/anotacao/i }));
    fireEvent.click(screen.getByRole("button", { name: "Editar Ana Martins" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar rascunho" }));
    fireEvent.click(screen.getByRole("button", { name: "Configurar alunos depois" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onSourceSelect).toHaveBeenCalledWith("photo");
    expect(onStudentAction).toHaveBeenCalledWith("ana", "edit");
    expect(onAction.mock.calls.map(([action]) => action)).toEqual(["save", "later", "continue"]);
  });

  it("owns the setup classes workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onClassAction = vi.fn();
    const onSourceSelect = vi.fn();

    render(<crm.SetupClassesWorkspace onAction={onAction} onClassAction={onClassAction} onSourceSelect={onSourceSelect} />);

    expect(screen.getByRole("heading", { name: "Turmas" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Turmas preparadas" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Nao tenho turmas prontas/i }));
    fireEvent.click(screen.getByRole("button", { name: "Editar Ter/Qui 18h" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar rascunho" }));
    fireEvent.click(screen.getByRole("button", { name: "Configurar turmas depois" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onSourceSelect).toHaveBeenCalledWith("later");
    expect(onClassAction).toHaveBeenCalledWith("ter-qui-18", "edit");
    expect(onAction.mock.calls.map(([action]) => action)).toEqual(["save", "later", "continue"]);
  });

  it("owns the setup agenda workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onBackToClasses = vi.fn();
    const onClassSelect = vi.fn();
    const onSlotSelect = vi.fn();

    render(<crm.SetupAgendaWorkspace onAction={onAction} onBackToClasses={onBackToClasses} onClassSelect={onClassSelect} onSlotSelect={onSlotSelect} />);

    expect(screen.getByRole("heading", { name: "Agenda" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /grade semanal/i })).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("Sexta 09h")[0]);
    fireEvent.click(screen.getByRole("gridcell", { name: /Ter das 18:00/i }));
    fireEvent.click(screen.getByRole("button", { name: "Voltar para turmas" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar rascunho" }));
    fireEvent.click(screen.getByRole("button", { name: "Continuar" }));

    expect(onClassSelect).toHaveBeenCalledWith("sexta-09");
    expect(onSlotSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "Ter-18", meta: "5 alunos", tone: "info" }));
    expect(onBackToClasses).toHaveBeenCalledOnce();
    expect(onAction.mock.calls.map(([action]) => action)).toEqual(["save", "continue"]);
  });

  it("owns the setup review workspace anatomy and behavior", () => {
    const onBack = vi.fn();
    const onConfirmChange = vi.fn();
    const onOpenArea = vi.fn();
    const onPublish = vi.fn();
    const onResolveBlocking = vi.fn();
    const onReviewWarnings = vi.fn();
    const onSaveDraft = vi.fn();

    render(<crm.SetupReviewWorkspace confirmed onBack={onBack} onConfirmChange={onConfirmChange} onOpenArea={onOpenArea} onPublish={onPublish} onResolveBlocking={onResolveBlocking} onReviewWarnings={onReviewWarnings} onSaveDraft={onSaveDraft} />);

    expect(screen.getByRole("heading", { name: "Revisão" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /StudioNome e horários gerais/i }));
    fireEvent.click(screen.getByRole("button", { name: "Resolver" }));
    fireEvent.click(screen.getByRole("button", { name: "Revisar avisos" }));
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Voltar para agenda" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar rascunho" }));
    fireEvent.click(screen.getByRole("button", { name: "Publicar setup inicial" }));

    expect(onOpenArea).toHaveBeenCalledWith("studio");
    expect(onResolveBlocking).toHaveBeenCalledOnce();
    expect(onReviewWarnings).toHaveBeenCalledOnce();
    expect(onConfirmChange).toHaveBeenCalledWith(false);
    expect(onBack).toHaveBeenCalledOnce();
    expect(onSaveDraft).toHaveBeenCalledOnce();
    expect(onPublish).toHaveBeenCalledOnce();
  });

  it("owns the setup welcome workspace anatomy and behavior", () => {
    const onStart = vi.fn();
    const onStudioNameChange = vi.fn();

    render(<crm.SetupWelcomeWorkspace onStart={onStart} onStudioNameChange={onStudioNameChange} />);

    expect(screen.getByRole("heading", { name: "Bem-vindo à Taliya" })).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox", { name: "Nome do studio" }), { target: { value: "Studio Aurora" } });
    fireEvent.click(screen.getByRole("button", { name: "Começar setup guiado" }));

    expect(onStudioNameChange).toHaveBeenCalledWith("Studio Aurora");
    expect(onStart).toHaveBeenCalledOnce();
  });

  it("requires a studio name before starting setup", () => {
    const onStart = vi.fn();

    render(<crm.SetupWelcomeWorkspace onStart={onStart} />);

    fireEvent.click(screen.getByRole("button", { name: "Começar setup guiado" }));

    expect(onStart).not.toHaveBeenCalled();
    expect(screen.getByText("Informe o nome do studio para continuar.")).toBeInTheDocument();
  });

  it("uses the current nine-block setup contract by default", () => {
    render(<crm.SetupPage step={5}><span>Pagamento workspace</span></crm.SetupPage>);

    expect(crm.defaultSetupSteps).toEqual([
      "Studio",
      "Equipe",
      "Canais",
      "Planos",
      "Pagamento",
      "Alunos",
      "Turmas",
      "Agenda",
      "Revisão"
    ]);
    expect(screen.getByText("Pagamento workspace")).toBeInTheDocument();
    expect(screen.getByText("Pagamento")).toBeInTheDocument();
    expect(screen.getByText("Revisão")).toBeInTheDocument();
  });

  it("renders the source-backed setup welcome agent variant", () => {
    const onHumanHelp = vi.fn();
    const onQuickReply = vi.fn();

    render(<crm.SetupAgentChat onHumanHelp={onHumanHelp} onQuickReply={onQuickReply} variant="welcome" />);

    const agent = screen.getByRole("region", { name: "Agente de configuração" });
    expect(agent).toHaveAttribute("data-variant", "welcome");
    expect(screen.getByText("Oi, eu vou te guiar nessa configuração.")).toBeInTheDocument();
    expect(screen.queryByLabelText("Impacto desta etapa")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: "Perguntar sobre esta etapa" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "O que vou configurar?" }));
    fireEvent.click(screen.getByRole("button", { name: "Agendar ajuda" }));

    expect(onQuickReply).toHaveBeenCalledWith("configurar", expect.objectContaining({ label: "O que vou configurar?" }));
    expect(onHumanHelp).toHaveBeenCalledOnce();
  });

  it("owns the agent routine workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onFlowOpen = vi.fn();
    const onModeChange = vi.fn();

    render(<crm.AgentRoutineWorkspace onAction={onAction} onFlowOpen={onFlowOpen} onModeChange={onModeChange} />);

    expect(screen.getByRole("heading", { name: "Como essa rotina deve trabalhar?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fluxos desta rotina" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Equilibrado/i }));
    fireEvent.click(screen.getAllByRole("button", { name: "Ver e ajustar" })[1]);
    fireEvent.click(screen.getByRole("button", { name: "Simular rotina" }));
    fireEvent.click(screen.getByRole("button", { name: "Ajustar fluxos" }));
    fireEvent.click(screen.getByRole("button", { name: "Revisar para publicar" }));

    expect(onModeChange).toHaveBeenCalledWith("equilibrado");
    expect(onFlowOpen).toHaveBeenCalledWith("falta-aviso");
    expect(onAction.mock.calls.map(([action]) => action)).toEqual(["simulate", "adjust-flows", "prepare-publication"]);
  });

  it("owns the agent flow workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onModeChange = vi.fn();
    const onSettingChange = vi.fn();
    const onStepMenu = vi.fn();
    const onStepOpen = vi.fn();

    render(
      <crm.AgentFlowWorkspace
        onAction={onAction}
        onModeChange={onModeChange}
        onSettingChange={onSettingChange}
        onStepMenu={onStepMenu}
        onStepOpen={onStepOpen}
      />
    );

    expect(screen.getByRole("heading", { name: "Como este fluxo deve trabalhar?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Como funciona neste modo" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ajustes deste fluxo" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Copiloto/i }));
    fireEvent.click(screen.getByRole("button", { name: "Início" }));
    fireEvent.click(screen.getAllByRole("button", { name: "Abrir opções do nó" })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Remover Recepção" }));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Mensagem atualizada" } });
    fireEvent.click(screen.getByRole("button", { name: "Testar este fluxo" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar ajuste" }));
    fireEvent.click(screen.getByRole("button", { name: "Voltar para rotina" }));

    expect(onModeChange).toHaveBeenCalledWith("copiloto");
    expect(onStepOpen).toHaveBeenCalledWith("entrada");
    expect(onStepMenu).toHaveBeenCalledWith("entrada");
    expect(onSettingChange).toHaveBeenCalledWith("exceptionOwners", ["Coordenadora", "Dono/admin"]);
    expect(onSettingChange).toHaveBeenCalledWith("messageTemplate", "Mensagem atualizada");
    expect(onAction.mock.calls.map(([action]) => action)).toEqual(["test", "save", "back"]);
  });

  it("owns the agent publish routine workspace anatomy and behavior", () => {
    const onAction = vi.fn();
    const onChecklistReview = vi.fn();
    const onChecklistToggle = vi.fn();
    const onFlowAction = vi.fn();

    render(
      <crm.AgentPublishRoutineWorkspace
        onAction={onAction}
        onChecklistReview={onChecklistReview}
        onChecklistToggle={onChecklistToggle}
        onFlowAction={onFlowAction}
      />
    );

    expect(screen.getByRole("heading", { name: "Pronta para publicar" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fluxos que serão publicados" })).toBeInTheDocument();
    expect(screen.getAllByText("Falta com aviso").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("checkbox", { name: /WhatsApp conectado/ }));
    fireEvent.click(screen.getAllByRole("button", { name: "Revisar" })[0]);
    fireEvent.click(screen.getAllByRole("button", { name: "Ver fluxo" })[1]);
    fireEvent.click(screen.getAllByRole("button", { name: "Simular" })[1]);
    fireEvent.click(screen.getByRole("button", { name: "Publicar rotina" }));
    fireEvent.click(screen.getByRole("button", { name: "Simular novamente" }));
    fireEvent.click(screen.getByRole("button", { name: "Voltar para ajustes" }));

    expect(onChecklistToggle).toHaveBeenCalledWith("whatsapp", false);
    expect(onChecklistReview).toHaveBeenCalledWith("whatsapp");
    expect(onFlowAction.mock.calls).toEqual([["falta-aviso", "view"], ["falta-aviso", "simulate"]]);
    expect(onAction.mock.calls.map(([action]) => action)).toEqual(["publish", "simulate-again", "back"]);
  });

  it("owns the post-live studio workspace anatomy and behavior", () => {
    const onActiveDaysChange = vi.fn();
    const onCancel = vi.fn();
    const onFieldChange = vi.fn();
    const onSave = vi.fn();

    render(
      <crm.SettingsStudioWorkspace
        onActiveDaysChange={onActiveDaysChange}
        onCancel={onCancel}
        onFieldChange={onFieldChange}
        onSave={onSave}
        saveState="dirty"
        values={{ studioName: "Studio Aurora" }}
      />
    );

    expect(screen.getByRole("heading", { name: "Identidade e unidade principal" })).toBeInTheDocument();
    expect(screen.queryByText("Bloco 1 de 8")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Nome do studio" })).toHaveValue("Studio Aurora");
    fireEvent.change(screen.getByRole("textbox", { name: "Nome do studio" }), { target: { value: "Studio Solar" } });
    fireEvent.click(screen.getByRole("checkbox", { name: "Sab" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar alterações" }));

    expect(onFieldChange).toHaveBeenCalledWith("studioName", "Studio Solar");
    expect(onActiveDaysChange).toHaveBeenCalledWith(["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]);
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("owns the post-live team workspace anatomy and behavior", () => {
    const onInvite = vi.fn();
    const onMemberAction = vi.fn();
    const onOpenPermissions = vi.fn();

    render(<crm.SettingsTeamWorkspace onInvite={onInvite} onMemberAction={onMemberAction} onOpenPermissions={onOpenPermissions} />);

    expect(screen.getByRole("heading", { name: "Usuarios do CRM" })).toBeInTheDocument();
    expect(screen.getByText("Convite pendente")).toBeInTheDocument();
    expect(screen.getByText(/Ultimo acesso: Hoje, 09:42/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Convidar pessoa" }));
    fireEvent.click(screen.getAllByRole("button", { name: "Editar" })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Reenviar convite" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir Permissoes" }));

    expect(onInvite).toHaveBeenCalledOnce();
    expect(onMemberAction).toHaveBeenCalledWith(expect.objectContaining({ id: "leticia" }), "edit");
    expect(onMemberAction).toHaveBeenCalledWith(expect.objectContaining({ id: "ana" }), "resend");
    expect(onOpenPermissions).toHaveBeenCalledOnce();
  });

  it("renders controlled post-live team status and exposes the matching action", () => {
    const onMemberAction = vi.fn();
    const inactiveMember: crm.SettingsTeamMember = {
      id: "carla",
      name: "Carla Souza",
      email: "carla@studio.com",
      role: "Recepcao",
      status: "inactive",
      lastAccess: "Ontem, 18:15"
    };

    render(<crm.SettingsTeamWorkspace members={[inactiveMember]} onMemberAction={onMemberAction} />);

    expect(screen.getByText("Inativo")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reativar" }));
    expect(onMemberAction).toHaveBeenCalledWith(inactiveMember, "reactivate");
  });

  it("owns the post-live channels workspace anatomy and behavior", () => {
    const onCancel = vi.fn();
    const onConnectWhatsApp = vi.fn();
    const onSave = vi.fn();
    const onWhatsAppStateChange = vi.fn();

    render(
      <crm.SettingsChannelsWorkspace
        connectionStatus="connected"
        onCancel={onCancel}
        onConnectWhatsApp={onConnectWhatsApp}
        onSave={onSave}
        onWhatsAppStateChange={onWhatsAppStateChange}
        saveState="dirty"
      />
    );

    expect(screen.getAllByText("Conectado").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "Testar conexao" }));
    fireEvent.click(screen.getByRole("button", { name: /Ainda esta no WhatsApp pessoal/ }));
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar alterações" }));

    expect(onConnectWhatsApp).toHaveBeenCalledOnce();
    expect(onWhatsAppStateChange).toHaveBeenCalledWith("personal");
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("owns the post-live plans workspace anatomy and behavior", () => {
    const onCancel = vi.fn();
    const onFieldChange = vi.fn();
    const onPlanAction = vi.fn();
    const onSave = vi.fn();

    render(<crm.SettingsPlansWorkspace fieldValues={{ name: "Plano Aurora", quantity: "12" }} onCancel={onCancel} onFieldChange={onFieldChange} onPlanAction={onPlanAction} onSave={onSave} saveState="dirty" />);

    expect(screen.getByRole("heading", { name: "Planos e modelos" })).toBeInTheDocument();
    expect(screen.getByText("18 alunos usando")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "1. Nome do plano" })).toHaveValue("Plano Aurora");
    expect(screen.getByRole("button", { name: "12 aulas" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.change(screen.getByRole("textbox", { name: "1. Nome do plano" }), { target: { value: "Plano Solar" } });
    fireEvent.click(screen.getAllByRole("button", { name: "Inativar" })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar alterações" }));

    expect(onPlanAction).toHaveBeenCalledWith("weekly", "deactivate");
    expect(onFieldChange).toHaveBeenCalledWith("name", "Plano Solar");
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("owns the settings permissions workspace anatomy and behavior", () => {
    const onCancel = vi.fn();
    const onPermissionToggle = vi.fn();
    const onRoleSelect = vi.fn();
    const onSave = vi.fn();

    render(
      <crm.SettingsPermissionsWorkspace
        onCancel={onCancel}
        onPermissionToggle={onPermissionToggle}
        onRoleSelect={onRoleSelect}
        onSave={onSave}
        selectedRoleId="owner"
      />
    );

    expect(screen.getByRole("heading", { name: "1. Papéis do CRM" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2. Ajustes sensíveis" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "3. Impacto antes de salvar" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Recepção/ }));
    fireEvent.click(screen.getByRole("switch", { name: "Alterar permissão Professor pode adicionar observação" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar alterações" }));

    expect(onRoleSelect).toHaveBeenCalledWith("frontdesk");
    expect(onPermissionToggle).toHaveBeenCalledWith("teacher-note", false, expect.objectContaining({ id: "teacher-note" }));
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("owns the settings payments workspace anatomy and behavior", () => {
    const onActivate = vi.fn();
    const onCancel = vi.fn();
    const onMethodSelect = vi.fn();
    const onRuleAction = vi.fn();
    const onSave = vi.fn();
    const onTechnicalIntegration = vi.fn();

    render(
      <crm.SettingsPaymentsWorkspace
        onActivate={onActivate}
        onCancel={onCancel}
        onMethodSelect={onMethodSelect}
        onRuleAction={onRuleAction}
        onSave={onSave}
        onTechnicalIntegration={onTechnicalIntegration}
      />
    );

    expect(screen.getByRole("heading", { name: "1. Meios e baixa manual" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2. Regras financeiras simples" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "3. Pagamentos Taliya" })).toBeInTheDocument();
    expect(screen.getAllByText("Ativo")).toHaveLength(3);
    expect(screen.getByRole("button", { name: /Pix manual/ })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getAllByText("Bloqueado até ativar")).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: /Pix manual/ }));
    fireEvent.click(screen.getByRole("button", { name: "Alterar Vencimento padrão" }));
    fireEvent.click(screen.getByRole("button", { name: "Ativar Pagamentos Taliya" }));
    fireEvent.click(screen.getByRole("button", { name: "Ver integração técnica" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar alterações" }));

    expect(onMethodSelect).toHaveBeenCalledWith("pix");
    expect(onRuleAction).toHaveBeenCalledWith(expect.objectContaining({ id: "due-date" }));
    expect(onActivate).toHaveBeenCalledOnce();
    expect(onTechnicalIntegration).toHaveBeenCalledOnce();
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("owns the settings agenda workspace anatomy and behavior", () => {
    const onAddBlock = vi.fn();
    const onAddException = vi.fn();
    const onCancel = vi.fn();
    const onRowAction = vi.fn();
    const onRuleChange = vi.fn();
    const onSave = vi.fn();

    render(
      <crm.SettingsAgendaWorkspace
        onAddBlock={onAddBlock}
        onAddException={onAddException}
        onCancel={onCancel}
        onRowAction={onRowAction}
        onRuleChange={onRuleChange}
        onSave={onSave}
      />
    );

    expect(screen.getByRole("heading", { name: "1. Dias fechados e exceções" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2. Bloqueios temporários" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "3. Regras simples da agenda" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Adicionar exceção" }));
    fireEvent.click(screen.getByRole("button", { name: "Adicionar bloqueio" }));
    fireEvent.click(screen.getByRole("button", { name: "Editar Natal" }));
    fireEvent.click(screen.getByRole("switch", { name: "Alternar Lista de espera" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar alterações" }));

    expect(onAddException).toHaveBeenCalledOnce();
    expect(onAddBlock).toHaveBeenCalledOnce();
    expect(onRowAction).toHaveBeenCalledWith("christmas", "edit");
    expect(onRuleChange).toHaveBeenCalledWith("waitlist", false);
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("owns the settings notifications workspace anatomy and behavior", () => {
    const onCancel = vi.fn();
    const onChannelChange = vi.fn();
    const onFrequencyChange = vi.fn();
    const onRoleSelect = vi.fn();
    const onSave = vi.fn();

    render(
      <crm.SettingsNotificationsWorkspace
        onCancel={onCancel}
        onChannelChange={onChannelChange}
        onFrequencyChange={onFrequencyChange}
        onRoleSelect={onRoleSelect}
        onSave={onSave}
      />
    );

    expect(screen.getByRole("heading", { name: "1. Alertas por papel" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2. Frequência dos alertas" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "3. Canais internos" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Recepção/ }));
    fireEvent.click(screen.getByRole("switch", { name: "Alternar Crítico" }));
    fireEvent.click(screen.getByRole("switch", { name: "Alternar Dentro do Taliya" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    fireEvent.click(screen.getByRole("button", { name: "Salvar alterações" }));

    expect(onRoleSelect).toHaveBeenCalledWith("frontdesk");
    expect(onFrequencyChange).toHaveBeenCalledWith("critical", false);
    expect(onChannelChange).toHaveBeenCalledWith("taliya", false);
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onSave).toHaveBeenCalledOnce();
  });

  it("owns the settings agent panel questions, composer, and human help", () => {
    const onHelp = vi.fn();
    const onQuestionSelect = vi.fn();
    const onSend = vi.fn();

    render(<crm.SettingsAgentPanel onHelp={onHelp} onQuestionSelect={onQuestionSelect} onSend={onSend} />);

    fireEvent.click(screen.getByRole("button", { name: /O que a Recepção pode fazer/ }));
    fireEvent.change(screen.getByRole("textbox", { name: "Pergunte ao agente de configuração" }), { target: { value: "Quem pode aprovar?" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    fireEvent.click(screen.getByRole("button", { name: "Agendar ajuda" }));

    expect(onQuestionSelect).toHaveBeenCalledWith("O que a Recepção pode fazer?");
    expect(onSend).toHaveBeenCalledWith("Quem pode aprovar?");
    expect(onHelp).toHaveBeenCalledOnce();
  });

  it("owns image 12 governance panels and delegates prepared-data actions", () => {
    const action = vi.fn();
    const fieldChange = vi.fn();
    const fallbackChange = vi.fn();
    const policyChange = vi.fn();
    const rowClick = vi.fn();

    render(
      <div>
        <crm.PlanAgentsPanel onAction={action} />
        <crm.FallbackControlCard onEnabledChange={fallbackChange} />
        <crm.BillingGovernancePanel onAction={action} />
        <crm.GovernanceAuditPanel onAction={action} onRowClick={rowClick} />
        <crm.GuardrailPolicyPanel onAction={action} onPolicyChange={policyChange} />
        <crm.GeneralSettingsPanel onAction={action} onFieldChange={fieldChange} />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "Fazer upgrade" }));
    fireEvent.click(screen.getByRole("switch", { name: "Alternar fallback manual" }));
    fireEvent.click(screen.getByRole("button", { name: "Atualizar pagamento" }));
    fireEvent.click(screen.getByText("Login realizado"));
    fireEvent.click(screen.getByRole("switch", { name: "Alternar Permitir ação automática" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Nome do workspace" }), { target: { value: "Taliya Operações" } });
    fireEvent.click(screen.getByRole("button", { name: "Ver todas as configurações" }));

    expect(action).toHaveBeenCalledWith("upgrade");
    expect(action).toHaveBeenCalledWith("update-payment");
    expect(action).toHaveBeenCalledWith("view-all-settings");
    expect(fallbackChange).toHaveBeenCalledWith(false);
    expect(policyChange).toHaveBeenCalledWith("automatic", false);
    expect(fieldChange).toHaveBeenCalledWith("workspaceName", "Taliya Operações");
    expect(rowClick).toHaveBeenCalledWith(expect.objectContaining({ id: "login" }));
  });

  it("owns image 13 setup, data-quality, and profile reference contracts", () => {
    const checklistAction = vi.fn();
    const checklistMenu = vi.fn();
    const checklistToggle = vi.fn();
    const conflictSelect = vi.fn();
    const nextAction = vi.fn();
    const preferenceChange = vi.fn();
    const sensitiveAction = vi.fn();
    const stepSelect = vi.fn();
    const tabChange = vi.fn();
    const viewAll = vi.fn();
    const viewHistory = vi.fn();

    render(
      <div>
        <crm.SetupWizardPanel onStepSelect={stepSelect} />
        <crm.ActivationChecklistPanel onItemAction={checklistAction} onItemMenu={checklistMenu} onItemToggle={checklistToggle} />
        <crm.DataConflictQueue onRowSelect={conflictSelect} onViewAll={viewAll} />
        <crm.StudentHeader onNextAction={nextAction} variant="reference" />
        <crm.ProfileTabsPanel onValueChange={tabChange} />
        <crm.ConsentPreferencesPanel onPreferenceChange={preferenceChange} onViewHistory={viewHistory} />
        <crm.SensitiveTimelinePanel onEventAction={sensitiveAction} />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /Ativação/ }));
    fireEvent.click(screen.getByRole("button", { name: "Revisar" }));
    fireEvent.click(screen.getByRole("button", { name: "Abrir opções de Conectar fonte de dados" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Marcar Revisar consentimento" }));
    fireEvent.click(screen.getByText("CPF duplicado em 2 registros"));
    fireEvent.click(screen.getByRole("button", { name: "Ver todos os conflitos" }));
    fireEvent.click(screen.getByRole("button", { name: /Confirmar documentos/ }));
    fireEvent.click(screen.getByRole("tab", { name: "Agenda" }));
    fireEvent.click(screen.getByRole("switch", { name: "WhatsApp permitido" }));
    fireEvent.click(screen.getByRole("button", { name: "Ver histórico completo" }));
    fireEvent.click(screen.getByRole("button", { name: "Pedir acesso" }));

    expect(stepSelect).toHaveBeenCalledWith("activation");
    expect(checklistAction).toHaveBeenCalledWith(expect.objectContaining({ id: "source" }));
    expect(checklistMenu).toHaveBeenCalledWith(expect.objectContaining({ id: "source" }));
    expect(checklistToggle).toHaveBeenCalledWith(expect.objectContaining({ id: "consent" }), true);
    expect(conflictSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "cpf" }));
    expect(viewAll).toHaveBeenCalledOnce();
    expect(nextAction).toHaveBeenCalledOnce();
    expect(tabChange).toHaveBeenCalledWith("agenda");
    expect(preferenceChange).toHaveBeenCalledWith("whatsappAllowed", false);
    expect(viewHistory).toHaveBeenCalledOnce();
    expect(sensitiveAction).toHaveBeenCalledWith(expect.objectContaining({ id: "document" }));
  });

  it("owns image 14 agenda, document, and finance reference contracts", () => {
    const action = vi.fn();
    const candidateAction = vi.fn();
    const rosterStatus = vi.fn();
    const rowSelect = vi.fn();

    render(
      <div>
        <section data-testid="calendar"><crm.WeeklyCalendar onToday={action} variant="reference" /></section>
        <section data-testid="class-card"><crm.ClassCard onReserve={action} openSlot time="11:00" title="Mat Pilates" variant="reference" /></section>
        <section data-testid="summary"><crm.ClassSummaryCard onViewDetails={action} /></section>
        <section data-testid="roster"><crm.Roster onStudentStatus={rosterStatus} students={[{ id: "ana", name: "Ana Beatriz", status: "pending" }]} variant="reference" /></section>
        <section data-testid="matcher"><crm.ReplacementMatcherPanel onCandidateAction={candidateAction} /></section>
        <section data-testid="waitlist"><crm.WaitlistPanel onRowSelect={rowSelect} /></section>
        <section data-testid="conflict"><crm.ResourceConflictPanel onApply={action} /></section>
        <section data-testid="document"><crm.DocumentViewerPanel onDownload={action} /></section>
        <section data-testid="upload"><crm.UploadReceiptPanel onUpload={action} /></section>
        <section data-testid="reconciliation"><crm.ReconciliationSummaryTable onReconcile={rowSelect} /></section>
        <section data-testid="money"><crm.MoneyInputGroup /></section>
        <section data-testid="simulation"><crm.FinancialSimulationPanel onApprove={action} /></section>
      </div>
    );

    fireEvent.click(within(screen.getByTestId("calendar")).getByRole("button", { name: "Hoje" }));
    fireEvent.click(within(screen.getByTestId("class-card")).getByRole("button", { name: "Reservar aula" }));
    fireEvent.click(within(screen.getByTestId("summary")).getByRole("button", { name: "Ver detalhes" }));
    fireEvent.click(within(screen.getByTestId("roster")).getByRole("checkbox", { name: "Ana Beatriz: esperado" }));
    fireEvent.click(within(screen.getByTestId("matcher")).getAllByRole("button", { name: "Convidar" })[0]!);
    fireEvent.click(within(screen.getByTestId("waitlist")).getByRole("row", { name: /Juliana Costa/ }));
    fireEvent.click(within(screen.getByTestId("conflict")).getByRole("button", { name: "Aplicar sugestao" }));
    fireEvent.click(within(screen.getByTestId("document")).getByRole("button", { name: "Baixar PDF" }));
    fireEvent.click(within(screen.getByTestId("upload")).getByText("Arraste o arquivo aqui ou clique para selecionar"));
    fireEvent.click(within(screen.getByTestId("reconciliation")).getByRole("button", { name: /Conciliar Mensalidade · Maio\/2024 · REF/ }));
    fireEvent.click(within(screen.getByTestId("simulation")).getByRole("button", { name: "Aprovar" }));

    expect(action).toHaveBeenCalledTimes(7);
    expect(candidateAction).toHaveBeenCalledWith(expect.objectContaining({ id: "ana" }));
    expect(rosterStatus).toHaveBeenCalledWith(expect.objectContaining({ id: "ana" }));
    expect(rowSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "juliana" }));
    expect(rowSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "ref" }));
    expect(within(screen.getByTestId("money")).getByLabelText("Valor com erro")).toHaveValue("0,00");
  });

  it("owns image 15 agent, governance, and reporting reference contracts", () => {
    const action = vi.fn();
    const modeChange = vi.fn();
    const requestOpen = vi.fn();
    const exportAction = vi.fn();
    const temporaryAccessChange = vi.fn();

    render(<div>
      <section data-testid="flow"><crm.FlowBuilder onStepOpen={action} variant="reference" /></section>
      <section data-testid="mode"><crm.ModeSelector onChange={modeChange} value="copiloto" variant="reference" /></section>
      <section data-testid="simulator"><crm.FlowSimulationPanel onApprove={action} /></section>
      <section data-testid="preflight"><crm.PublicationPreflightPanel onPublish={action} /></section>
      <section data-testid="trace"><crm.ExecutionTraceTable onViewAll={action} /></section>
      <section data-testid="incident"><crm.AgentIncidentPanel onReprocess={action} /></section>
      <section data-testid="quality"><crm.EvaluationQualityPanel onViewReport={action} /></section>
      <section data-testid="diff"><crm.BeforeAfterDiff onApprove={action} /></section>
      <section data-testid="audit"><crm.AuditTrail onViewAll={action} /></section>
      <section data-testid="privacy"><crm.PrivacyRequestTable onOpenRequest={requestOpen} /></section>
      <section data-testid="grant"><crm.SupportGrantPanel onRevoke={action} onTemporaryAccessChange={temporaryAccessChange} /></section>
      <section data-testid="reports"><crm.AdvancedReportsPanel onViewAll={action} /></section>
      <section data-testid="exports"><crm.ExportQueuePanel onAction={exportAction} /></section>
      <section data-testid="segment"><crm.SegmentCommunicationPanel onApprove={action} /></section>
    </div>);

    fireEvent.click(within(screen.getByTestId("flow")).getByText("Nova mensagem em WhatsApp"));
    fireEvent.click(within(screen.getByTestId("mode")).getByRole("button", { name: /AutonomoExecuta end-to-end/ }));
    fireEvent.click(within(screen.getByTestId("simulator")).getByRole("button", { name: "Aprovar publicacao" }));
    fireEvent.click(within(screen.getByTestId("preflight")).getByRole("button", { name: "Publicar" }));
    fireEvent.click(within(screen.getByTestId("trace")).getByRole("button", { name: "Ver trace completo" }));
    fireEvent.click(within(screen.getByTestId("incident")).getByRole("button", { name: "Reprocessar com seguranca" }));
    fireEvent.click(within(screen.getByTestId("quality")).getByRole("button", { name: "Ver relatorio completo" }));
    fireEvent.click(within(screen.getByTestId("diff")).getByRole("button", { name: "Aprovar" }));
    fireEvent.click(within(screen.getByTestId("audit")).getByRole("button", { name: "Ver auditoria completa" }));
    fireEvent.click(within(screen.getByTestId("privacy")).getByRole("row", { name: /REQ-1287/ }));
    fireEvent.click(within(screen.getByTestId("grant")).getByRole("switch", { name: "Acesso temporario" }));
    fireEvent.click(within(screen.getByTestId("grant")).getByRole("button", { name: "Revogar acesso" }));
    fireEvent.click(within(screen.getByTestId("reports")).getByRole("button", { name: "Ver painel completo" }));
    fireEvent.click(within(screen.getByTestId("exports")).getByRole("button", { name: "Acao de Relatorio financeiro" }));
    fireEvent.click(within(screen.getByTestId("segment")).getByRole("button", { name: "Aprovar envio" }));

    expect(action).toHaveBeenCalledTimes(11);
    expect(modeChange).toHaveBeenCalledWith("autonomo");
    expect(requestOpen).toHaveBeenCalledWith("REQ-1287");
    expect(exportAction).toHaveBeenCalledWith("financeiro");
    expect(temporaryAccessChange).toHaveBeenCalledWith(false);
  });

  it("owns the image 16 shell composition without duplicating CrmProductShell", () => {
    const action = vi.fn();
    const { container } = render(
      <crm.CrmProductShell frame="reference" title="Jornadas">
        <crm.JourneyShellCanvas onAction={action} />
      </crm.CrmProductShell>
    );

    expect(container.querySelector(".tcrm-product-shell-stage--frame-reference")).toBeTruthy();
    expect(container.querySelectorAll('[data-component="CrmProductShell"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-component="JourneyShellCanvas"]')).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Area principal" })).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Adicionar" })[0]!);
    fireEvent.click(screen.getAllByRole("button", { name: "Compartilhar" })[1]!);
    fireEvent.click(screen.getAllByRole("button", { name: "Abrir calendario" })[2]!);

    expect(action).toHaveBeenCalledWith("primary", "add");
    expect(action).toHaveBeenCalledWith("secondary-left", "share");
    expect(action).toHaveBeenCalledWith("secondary-right", "calendar");
  });
});
