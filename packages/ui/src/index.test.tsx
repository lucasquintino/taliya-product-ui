import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  Avatar,
  AvatarStack,
  AuditTable,
  Badge,
  Button,
  Chip,
  CalendarCell,
  CalendarEventBlock,
  ChartPanelPrimitive,
  Checkbox,
  ChecklistItem,
  ComposerInput,
  ConfidenceMeter,
  ConfirmDialog,
  ConnectorLine,
  ContentGrid,
  ConflictCard,
  DataTable,
  DateInput,
  DiffTable,
  DocumentPreview,
  DropdownMenu,
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerSection,
  EmptyState,
  ExecutionRow,
  FieldGroup,
  FieldGrid,
  FieldStack,
  FilterBar,
  FilterChip,
  FilterMultiSelect,
  FilterSelect,
  FlowNode,
  Icon,
  IconButton,
  ImportProgressCard,
  InlineAlert,
  Input,
  KeyValueRow,
  LoadingState,
  MetricTile,
  MoneyInput,
  Modal,
  Panel,
  PanelBody,
  PanelHeader,
  Popover,
  PermissionTable,
  ProgressBar,
  RelationshipCard,
  SearchInput,
  SegmentedControl,
  Select,
  Stack,
  StatePage,
  StatusDot,
  StatusSummaryCard,
  Stepper,
  Tabs,
  TablePagination,
  TaliyaLogo,
  TagInput,
  Textarea,
  TimeInput,
  Timeline,
  Toggle,
  Toolbar,
  Tooltip,
  Toast,
  MessageBubble
} from "./index";

afterEach(() => cleanup());

describe("@taliya/ui primitives", () => {
  it("renders stack with tokenized gap variants", () => {
    render(
      <Stack gap="lg" data-testid="stack">
        <span>Resumo</span>
        <span>Proxima acao</span>
      </Stack>
    );

    expect(screen.getByTestId("stack")).toHaveClass("tl-stack", "tl-stack--lg");
    expect(screen.getByText("Resumo")).toBeInTheDocument();
  });

  it("renders toolbar alignment and wrap variants", () => {
    render(
      <Toolbar align="start" data-testid="toolbar" justify="end" wrap>
        <Chip tone="warning">Mock</Chip>
        <Button size="sm">Acao</Button>
      </Toolbar>
    );

    expect(screen.getByTestId("toolbar")).toHaveClass(
      "tl-toolbar",
      "tl-toolbar--align-start",
      "tl-toolbar--justify-end",
      "tl-toolbar--wrap"
    );
  });

  it("renders field grid column variants", () => {
    render(
      <FieldGrid columns={4} data-testid="field-grid">
        <Input label="Nome" />
        <Input label="Email" />
      </FieldGrid>
    );

    expect(screen.getByTestId("field-grid")).toHaveClass("tl-field-grid", "tl-field-grid--4");
  });

  it("renders content grid column variants", () => {
    render(
      <ContentGrid columns={3} data-testid="content-grid">
        <DrawerSection title="Resumo">Conteudo</DrawerSection>
        <DrawerSection title="Origem">Agenda</DrawerSection>
      </ContentGrid>
    );

    expect(screen.getByTestId("content-grid")).toHaveClass("tl-content-grid", "tl-content-grid--3");
  });

  it("renders key value rows through the official list item anatomy", () => {
    render(<KeyValueRow label="Status" value="Completo" valueTone="success" />);

    expect(screen.getByText("Status").closest("[role='listitem']")).toHaveClass("tl-list-item");
    expect(screen.getByText("Completo")).toHaveClass("tl-meta-text", "tl-meta-text--success");
  });

  it("renders panel header title, metadata and actions", () => {
    const action = vi.fn();

    render(
      <Panel minHeight="md" data-testid="panel">
        <PanelHeader
          action={<Button onClick={action}>Atualizar</Button>}
          description="Resumo operacional"
          meta={<Chip tone="warning">3</Chip>}
          title="Painel de filas"
        />
      </Panel>
    );

    expect(screen.getByRole("heading", { name: "Painel de filas" })).toBeInTheDocument();
    expect(screen.getByTestId("panel")).toHaveClass("tl-panel--min-height-md");
    expect(screen.getByText("Resumo operacional")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Atualizar" }));

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("renders panel body density variants", () => {
    render(
      <Panel>
        <PanelBody compact data-testid="panel-body">
          Conteudo
        </PanelBody>
      </Panel>
    );

    expect(screen.getByTestId("panel-body")).toHaveClass("tl-panel-body", "tl-panel-body--compact");
  });

  it("renders compact textarea density", () => {
    render(<Textarea data-testid="textarea" density="compact" label="Mensagem" />);

    expect(screen.getByTestId("textarea")).toHaveClass("tl-textarea", "tl-textarea--compact");
  });

  it("renders field stack density variants", () => {
    render(
      <FieldStack data-testid="field-stack" gap="md">
        <Input label="Nome" />
      </FieldStack>
    );

    expect(screen.getByTestId("field-stack")).toHaveClass("tl-field-stack", "tl-field-stack--md");
  });

  it("renders tag input with removable items", () => {
    const remove = vi.fn();

    render(
      <TagInput
        items={["Recepção", "Coordenação"]}
        label="Responsáveis"
        onRemove={remove}
        removable
      />
    );

    expect(screen.getByRole("group", { name: "Responsáveis" })).toBeInTheDocument();
    expect(screen.getByText("Recepção")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Remover Recepção" }));

    expect(remove).toHaveBeenCalledWith({ id: "Recepção", label: "Recepção" }, 0);
  });

  it("renders state page with semantic element variants", () => {
    render(
      <StatePage as="main" data-testid="state-page">
        <LoadingState title="Carregando" />
      </StatePage>
    );

    expect(screen.getByTestId("state-page")).toHaveClass("tl-state-page");
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText("Carregando")).toBeInTheDocument();
  });

  it("renders accessible actions with icon-only labels", () => {
    render(
      <div>
        <Button leadingIcon="plus" loading>
          Criar tarefa
        </Button>
        <IconButton icon="search" label="Buscar" />
        <IconButton icon="refresh" label="Atualizando" loading />
      </div>
    );

    expect(screen.getByRole("button", { name: /criar tarefa/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /criar tarefa/i })).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: /buscar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /atualizando/i })).toHaveAttribute("aria-busy", "true");
  });

  it("applies a base CSS size variable to standalone icons", () => {
    render(
      <div>
        <Icon data-testid="standalone-icon" name="chevronRight" size="sm" />
        <Button data-testid="small-button" leadingIcon="plus" size="sm">
          Pequeno
        </Button>
      </div>
    );

    expect(screen.getByTestId("standalone-icon")).toHaveStyle({
      "--tl-icon-size": "var(--taliya-control-icon-size-sm)"
    });
    expect(screen.getByTestId("small-button").querySelector(".tl-icon")).toHaveClass("tl-icon");
  });

  it("renders operational status and progress primitives", () => {
    render(
      <div>
        <Chip tone="warning">Atencao</Chip>
        <StatusDot label="Pendente" status="pending" />
        <ProgressBar value={72} label="Uso do mes" />
      </div>
    );

    expect(screen.getByText("Atencao")).toBeInTheDocument();
    expect(screen.getByText("Pendente")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: /uso do mes/i })).toHaveAttribute(
      "aria-valuenow",
      "72"
    );
  });

  it("renders the canonical Taliya logo variants", () => {
    render(
      <div>
        <TaliyaLogo />
        <TaliyaLogo label="Marca Taliya" variant="mark" />
      </div>
    );

    expect(screen.getByRole("img", { name: "Taliya" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Marca Taliya" })).toBeInTheDocument();
  });

  it("renders form, table, drawer, state, and tabs anatomy", () => {
    render(
      <div>
        <Input label="Nome" defaultValue="Studio Taliya" />
        <DataTable
          columns={[{ key: "student", header: "Aluno" }]}
          rows={[{ id: "1", student: "Ana" }]}
        />
        <Drawer modal={false} open title="Tarefa">
          Conteudo
        </Drawer>
        <EmptyState title="Sem dados" action={<Button>Adicionar</Button>} />
        <Tabs
          items={[
            { value: "resumo", label: "Resumo", content: "Resumo" },
            { value: "historico", label: "Historico", content: "Historico" }
          ]}
        />
      </div>
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: /tarefa/i })).toBeInTheDocument();
    expect(screen.getByText("Sem dados")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /resumo/i })).toBeInTheDocument();
  });

  it("supports accessible tabs keyboard navigation and external panels", () => {
    const change = vi.fn();

    render(
      <Tabs
        aria-label="Perfil"
        items={[
          { value: "resumo", label: "Resumo", content: "Resumo" },
          { value: "agenda", label: "Agenda", content: "Agenda" },
          { value: "historico", label: "Historico", content: "Historico" }
        ]}
        onValueChange={change}
        showPanel={false}
      />
    );

    const tablist = screen.getByRole("tablist", { name: "Perfil" });
    const resumo = within(tablist).getByRole("tab", { name: "Resumo" });
    const agenda = within(tablist).getByRole("tab", { name: "Agenda" });

    expect(screen.queryByRole("tabpanel")).not.toBeInTheDocument();
    resumo.focus();
    fireEvent.keyDown(resumo, { key: "ArrowRight" });

    expect(agenda).toHaveFocus();
    expect(agenda).toHaveAttribute("aria-selected", "true");
    expect(change).toHaveBeenCalledWith("agenda");
  });

  it("supports modal dialog close and controlled open changes", async () => {
    const change = vi.fn();

    render(
      <Modal
        footer={<Button>Salvar</Button>}
        onOpenChange={change}
        open
        title="Novo atendimento"
      >
        <Input label="Nome" defaultValue="Joao Silva" />
      </Modal>
    );

    expect(screen.getByRole("dialog", { name: /novo atendimento/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /fechar modal/i }));

    await waitFor(() => expect(change).toHaveBeenCalledWith(false));
  });

  it("keeps hidden modal titles accessible for source-faithful simple dialogs", () => {
    render(
      <Modal description="Deseja salvar as alteracoes realizadas?" open title="Salvar alteracoes?" titleHidden>
        <Button>Salvar</Button>
      </Modal>
    );

    expect(screen.getByRole("dialog", { name: /salvar alteracoes/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /salvar alteracoes/i })).toHaveClass("tl-sr-only");
  });

  it("supports confirm dialog callbacks and blocked confirmation", () => {
    const cancel = vi.fn();
    const confirm = vi.fn();

    render(
      <ConfirmDialog
        blockedReason="Sem permissao"
        confirmLabel="Excluir"
        destructive
        onCancel={cancel}
        onConfirm={confirm}
        open
        title="Excluir atendimento?"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /excluir/i })).toBeDisabled();
    expect(confirm).not.toHaveBeenCalled();
  });

  it("supports drawer anatomy, close callback, and reusable sections", async () => {
    const change = vi.fn();

    render(
      <Drawer
        footer={<Button variant="primary">Salvar</Button>}
        onOpenChange={change}
        open
        title="Tarefa"
      >
        <DrawerSection title="Detalhes">
          <p>Conteudo</p>
        </DrawerSection>
      </Drawer>
    );

    expect(screen.getByRole("dialog", { name: /tarefa/i })).toBeInTheDocument();
    expect(screen.getByText("Detalhes")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /fechar painel/i }));

    await waitFor(() => expect(change).toHaveBeenCalledWith(false));
  });

  it("renders drawer header and footer as standalone primitives", () => {
    render(
      <div>
        <DrawerHeader title="Resumo" meta="Atualizado agora" onClose={() => undefined} />
        <DrawerFooter layout="grid">
          <Button>Assumir</Button>
          <Button>Delegar</Button>
        </DrawerFooter>
      </div>
    );

    expect(screen.getByText("Resumo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /fechar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delegar/i })).toBeInTheDocument();
  });

  it("opens popover content from a real trigger and closes on Escape", async () => {
    render(
      <Popover trigger={<Button>Mais opcoes</Button>} title="Opcoes">
        <Button leadingIcon="edit">Editar</Button>
      </Popover>
    );

    fireEvent.click(screen.getByRole("button", { name: /mais opcoes/i }));
    expect(await screen.findByText("Opcoes")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByText("Opcoes"), { key: "Escape" });

    await waitFor(() => expect(screen.queryByText("Opcoes")).not.toBeInTheDocument());
  });

  it("opens tooltip on focus with accessible tooltip content", async () => {
    render(
      <Tooltip delayDuration={0} label="Copiar link">
        <IconButton icon="copy" label="Copiar" />
      </Tooltip>
    );

    fireEvent.focus(screen.getByRole("button", { name: /copiar/i }));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Copiar link");
  });

  it("opens disabled-reason tooltip from a focusable wrapper", async () => {
    render(
      <Tooltip delayDuration={0} label="Mais opcoes" variant="disabled">
        <IconButton disabled icon="more" label="Mais opcoes" />
      </Tooltip>
    );

    const disabledButton = screen.getByRole("button", { name: /mais opcoes/i });
    fireEvent.focus(disabledButton.parentElement as HTMLElement);

    expect(await screen.findByRole("tooltip")).toHaveTextContent("Mais opcoes");
  });

  it("opens dropdown actions and closes after selection", () => {
    const select = vi.fn();

    render(<DropdownMenu actions={[{ label: "Editar", icon: "edit", onSelect: select }]} label="Mais" />);

    fireEvent.click(screen.getByRole("button", { name: "Mais" }));
    fireEvent.click(screen.getByRole("menuitem", { name: /editar/i }));

    expect(select).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Mais" })).toHaveAttribute("aria-expanded", "false");
  });

  it("supports dropdown keyboard navigation and returns focus to the trigger", async () => {
    render(
      <DropdownMenu
        actions={[
          { label: "Editar", icon: "edit" },
          { label: "Copiar", icon: "copy" },
          { label: "Excluir", icon: "x", destructive: true }
        ]}
        label="Mais"
      />
    );

    const trigger = screen.getByRole("button", { name: "Mais" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });

    await waitFor(() => expect(screen.getByRole("menuitem", { name: /editar/i })).toHaveFocus());
    fireEvent.keyDown(screen.getByRole("menuitem", { name: /editar/i }), { key: "ArrowDown" });
    expect(screen.getByRole("menuitem", { name: /copiar/i })).toHaveFocus();
    fireEvent.keyDown(screen.getByRole("menuitem", { name: /copiar/i }), { key: "Escape" });
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders feedback primitives with accessible controls", () => {
    const closeToast = vi.fn();
    const dismissAlert = vi.fn();

    render(
      <div>
        <Toast closeLabel="Fechar toast" onClose={closeToast} title="Salvo" tone="success">
          Jornada atualizada
        </Toast>
        <InlineAlert onDismiss={dismissAlert} title="Conflito" tone="danger">
          Ajuste o horario
        </InlineAlert>
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /fechar toast/i }));
    fireEvent.click(screen.getByRole("button", { name: /fechar alerta/i }));

    expect(closeToast).toHaveBeenCalledTimes(1);
    expect(dismissAlert).toHaveBeenCalledTimes(1);
  });

  it("renders avatar primitives with badges and add action", () => {
    const add = vi.fn();

    render(
      <div>
        <Avatar badge={<Badge tone="info">2</Badge>} name="Niki Olson" status="online" />
        <AvatarStack
          onAdd={add}
          showAdd
          people={[
            { id: "1", name: "Ana Paula" },
            { id: "2", name: "Julia Dias" },
            { id: "3", name: "Marcos Lima" },
            { id: "4", name: "Paula Reis" }
          ]}
        />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /adicionar pessoa/i }));

    expect(screen.getByLabelText("Niki Olson")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument();
    expect(add).toHaveBeenCalledTimes(1);
  });

  it("removes filter chips through a separate accessible action", () => {
    const remove = vi.fn();

    render(
      <FilterChip removable onRemove={remove} selected>
        Alta prioridade
      </FilterChip>
    );

    fireEvent.click(screen.getByRole("button", { name: /remover alta prioridade/i }));

    expect(remove).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Alta prioridade" })).toHaveAttribute("aria-pressed", "true");
  });

  it("supports filter select and filter multi select states and behavior", async () => {
    const singleChange = vi.fn();
    const multiChange = vi.fn();

    render(
      <div>
        <FilterSelect
          label="Origem"
          onValueChange={singleChange}
          options={[
            { value: "agenda", label: "Agenda", icon: "calendar" },
            { value: "whatsapp", label: "WhatsApp", icon: "whatsapp" }
          ]}
        />
        <FilterMultiSelect
          defaultValue={["alta"]}
          label="Prioridade"
          onValueChange={multiChange}
          options={[
            { value: "alta", label: "Alta", icon: "alert" },
            { value: "media", label: "Media", icon: "clock" },
            { value: "baixa", label: "Baixa", icon: "minus", disabled: true }
          ]}
        />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "Origem" }));
    fireEvent.click(await screen.findByRole("option", { name: /agenda/i }));
    expect(singleChange).toHaveBeenCalledWith("agenda");

    fireEvent.click(screen.getByRole("button", { name: /prioridade: alta/i }));
    fireEvent.click(await screen.findByRole("option", { name: "Media" }));
    expect(multiChange).toHaveBeenCalledWith(["alta", "media"]);
  });

  it("supports value-only filter select triggers without clear affordance", () => {
    render(
      <FilterSelect
        clearable={false}
        defaultValue="hoje"
        icon="calendar"
        label="Periodo"
        options={[
          { value: "hoje", label: "Hoje" },
          { value: "semana", label: "Esta semana" }
        ]}
        triggerDisplay="value"
      />
    );

    const trigger = screen.getByRole("button", { name: "Periodo: Hoje" });

    expect(trigger).toHaveTextContent("Hoje");
    expect(trigger).not.toHaveTextContent("Periodo");
    expect(trigger.querySelector("[data-filter-clear]")).not.toBeInTheDocument();
  });

  it("falls back to avatar initials when an image fails", () => {
    const { container } = render(<Avatar name="Niki Olson" src="/missing-avatar.png" />);

    fireEvent.error(container.querySelector("img") as HTMLImageElement);

    expect(screen.getByText("NO")).toBeInTheDocument();
  });

  it("supports complete input states and clear action", () => {
    const clear = vi.fn();

    render(
      <div>
        <Input error="Campo obrigatorio" label="Email" placeholder="email@dominio.com" />
        <Input label="Busca" defaultValue="Ana" onClear={clear} />
        <DateInput label="Data" defaultValue="24 / 05 / 2026" />
        <TimeInput label="Horario" defaultValue="18 : 30" />
        <MoneyInput label="Valor" defaultValue="389,00" />
        <Input blockedReason="Sem permissao" label="Bloqueado" defaultValue="Protegido" />
      </div>
    );

    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
    fireEvent.click(screen.getByRole("button", { name: /limpar busca/i }));
    expect(clear).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Data")).toBeInTheDocument();
    expect(screen.getByLabelText("Horario")).toBeInTheDocument();
    expect(screen.getByLabelText("Valor")).toHaveAttribute("inputmode", "decimal");
    expect(screen.getByLabelText("Bloqueado")).toBeDisabled();
  });

  it("renders headless select with open menu and value selection", async () => {
    const change = vi.fn();

    render(
      <Select
        label="Status"
        onValueChange={change}
        options={[
          { value: "todos", label: "Todos" },
          { value: "pendentes", label: "Pendentes" },
          { value: "bloqueado", label: "Bloqueado", disabled: true }
        ]}
        placeholder="Selecionar"
      />
    );

    const trigger = screen.getByRole("combobox", { name: /status/i });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.click(await screen.findByRole("option", { name: /pendentes/i }));

    expect(change).toHaveBeenCalledWith("pendentes");
  });

  it("supports checkbox, toggle, segmented control, search, and filter composition", () => {
    const toggle = vi.fn();
    const segmented = vi.fn();
    const filter = vi.fn();

    render(
      <FieldGroup title="Filtros">
        <Checkbox indeterminate label="Alguns itens" />
        <Toggle label="Ativar" onClick={toggle} pressed />
        <SegmentedControl
          label="Periodo"
          onChange={segmented}
          options={[
            { value: "hoje", label: "Hoje" },
            { value: "semana", label: "Semana" }
          ]}
          value="hoje"
        />
        <FilterBar>
          <SearchInput onFilter={filter} placeholder="Buscar" resultCount="3" />
          <FilterChip selected>Ativos</FilterChip>
        </FilterBar>
      </FieldGroup>
    );

    expect(screen.getByRole("checkbox", { name: /alguns itens/i })).toHaveAttribute("aria-checked", "mixed");
    fireEvent.click(screen.getByRole("switch", { name: /ativar/i }));
    fireEvent.click(screen.getByRole("button", { name: /semana/i }));
    fireEvent.click(screen.getByRole("button", { name: /abrir filtros/i }));

    expect(toggle).toHaveBeenCalledTimes(1);
    expect(segmented).toHaveBeenCalledWith("semana");
    expect(filter).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Ativos" })).toHaveAttribute("aria-pressed", "true");
  });

  it("supports embedded search filter action anatomy", () => {
    const filter = vi.fn();

    render(<SearchInput filterPlacement="embedded" onFilter={filter} placeholder="Buscar tarefas" />);

    const searchRoot = screen.getByRole("searchbox").closest(".tl-search-input");
    expect(searchRoot).toHaveClass("tl-search-input--filter-embedded");

    fireEvent.click(screen.getByRole("button", { name: /abrir filtros/i }));
    expect(filter).toHaveBeenCalledTimes(1);
  });

  it("supports uncontrolled and controlled toggle behavior", () => {
    const controlledChange = vi.fn();

    render(
      <div>
        <Toggle label="Modo automatico" />
        <Toggle label="Modo bloqueado" onPressedChange={controlledChange} pressed />
      </div>
    );

    const uncontrolled = screen.getByRole("switch", { name: /modo automatico/i });
    const controlled = screen.getByRole("switch", { name: /modo bloqueado/i });

    expect(uncontrolled).toHaveAttribute("aria-checked", "false");
    fireEvent.click(uncontrolled);
    expect(uncontrolled).toHaveAttribute("aria-checked", "true");

    fireEvent.click(controlled);
    expect(controlled).toHaveAttribute("aria-checked", "true");
    expect(controlledChange).toHaveBeenCalledWith(false);
  });

  it("supports selectable data tables, numbered pagination, and progress helpers", () => {
    const select = vi.fn();
    const sort = vi.fn();
    const pageChange = vi.fn();
    const pageSize = vi.fn();

    render(
      <div>
        <DataTable
          columns={[
            { key: "subject", header: "Assunto", sortable: true },
            { key: "status", header: "Status" }
          ]}
          onRowSelect={select}
          onSortChange={sort}
          rows={[{ id: "cs-1", subject: "Restricao senha", status: "Em andamento" }]}
          selectable
          selectedRowIds={["cs-1"]}
          sort={{ key: "subject", direction: "ascending" }}
        />
        <TablePagination itemsPerPageValue={10} label="1-10 de 128" onItemsPerPageClick={pageSize} onPageChange={pageChange} page={1} pageCount={13} />
        <ProgressBar helperText="Proximo do limite" label="Uso" tone="danger" value={92} />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /ordenar por assunto/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /selecionar linha cs-1/i }));
    fireEvent.click(screen.getByRole("button", { name: /alterar itens por pagina/i }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));

    expect(screen.getByRole("columnheader", { name: /assunto/i })).toHaveAttribute("aria-sort", "ascending");
    expect(sort).toHaveBeenCalledWith({ key: "subject", direction: "descending" });
    expect(select).toHaveBeenCalledWith("cs-1", false);
    expect(pageSize).toHaveBeenCalledTimes(1);
    expect(pageChange).toHaveBeenCalledWith(2);
    expect(screen.getByRole("progressbar", { name: /uso/i })).toHaveAttribute("aria-valuenow", "92");
    expect(screen.getByText("Proximo do limite")).toBeInTheDocument();
  });

  it("supports batch 8 workflow primitives with real actions", () => {
    const stepSelect = vi.fn();
    const checklistToggle = vi.fn();
    const metricSelect = vi.fn();
    const requestAccess = vi.fn();
    const permissionRowClick = vi.fn();
    const openAudit = vi.fn();
    const auditRowClick = vi.fn();
    const diffRowClick = vi.fn();
    const pageSelect = vi.fn();
    const executionToggle = vi.fn();

    render(
      <div>
        <Stepper
          currentStepId="map"
          onStepSelect={stepSelect}
          progress={60}
          steps={[
            { id: "source", label: "Fonte", state: "complete" },
            { id: "map", label: "Mapeamento", state: "current" },
            { id: "blocked", label: "Duplicidades", state: "blocked" }
          ]}
        />
        <ChecklistItem onToggle={checklistToggle} owner="Sam Frank" state="incomplete" title="Revisar consentimento" />
        <MetricTile data-testid="batch8-metric" label="Casos abertos" onSelect={metricSelect} selected value="128" />
        <StatusSummaryCard state="ok" title="CRM ativo" />
        <DiffTable onRowClick={diffRowClick} rows={[{ id: "plan", label: "Plano", before: "Pro", after: "Enterprise", status: "changed" }]} title="Diff" />
        <PermissionTable onRequestAccess={requestAccess} onRowClick={permissionRowClick} rows={[{ id: "reports", module: "Relatorios", profile: "Gestor", action: "Visualizar", state: "request" }]} />
        <AuditTable onOpenObject={openAudit} onRowClick={auditRowClick} rows={[{ id: "log-1", actor: "Sam", object: "#1", action: "Atualizou", time: "10:24", origin: "Web", status: "success" }]} />
        <ImportProgressCard metrics={[{ label: "Processados", value: "245" }]} state="running" title="Importando alunos.csv" value={78} />
        <RelationshipCard data-testid="batch8-relationship" name="Joao Pedro" onSelect={vi.fn()} selected variant="related" />
        <ConflictCard state="danger" title="Sala indisponivel" />
        <DocumentPreview onPageSelect={pageSelect} pages={[{ id: "1", label: "1" }]} state="signed" title="Contrato" />
        <ExecutionRow expanded onToggle={executionToggle} status="running" step={3} title="Gerar resposta" />
        <ConfidenceMeter segments={5} value={86} />
      </div>
    );

    fireEvent.keyDown(screen.getByRole("button", { name: /abrir alteracao plan/i }), { key: "Enter" });
    fireEvent.keyDown(screen.getByRole("button", { name: /abrir permissao reports/i }), { key: "Enter" });
    fireEvent.keyDown(screen.getByRole("button", { name: /abrir auditoria log-1/i }), { key: " " });
    fireEvent.click(screen.getByRole("button", { name: /mapeamento/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /revisar consentimento/i }));
    fireEvent.click(screen.getByRole("button", { name: /casos abertos/i }));
    fireEvent.click(screen.getByRole("button", { name: /solicitar acesso/i }));
    fireEvent.click(screen.getByRole("button", { name: /abrir log-1/i }));
    fireEvent.click(screen.getByRole("button", { name: /pagina 1/i }));
    fireEvent.click(screen.getByRole("button", { name: /gerar resposta/i }));

    expect(stepSelect).toHaveBeenCalledWith("map");
    expect(checklistToggle).toHaveBeenCalledWith(true);
    expect(metricSelect).toHaveBeenCalledTimes(1);
    expect(diffRowClick).toHaveBeenCalledWith("plan");
    expect(permissionRowClick).toHaveBeenCalledWith("reports");
    expect(requestAccess).toHaveBeenCalledWith("reports");
    expect(auditRowClick).toHaveBeenCalledWith("log-1");
    expect(openAudit).toHaveBeenCalledWith("log-1");
    expect(pageSelect).toHaveBeenCalledWith("1");
    expect(executionToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("batch8-metric")).toBeInTheDocument();
    expect(screen.getByTestId("batch8-relationship")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: /confianca/i })).toHaveAttribute("aria-valuenow", "86");
  });

  it("can render numbered pending step markers for setup shell steppers", () => {
    render(
      <Stepper
        currentStepId="dados"
        markerStyle="number"
        onStepSelect={vi.fn()}
        orientation="vertical"
        steps={[
          { id: "diagnostico", label: "Diagnostico", state: "complete" },
          { id: "dados", label: "Dados", state: "current" },
          { id: "agenda", label: "Agenda", state: "pending" }
        ]}
      />
    );

    expect(screen.getByRole("button", { name: /dados/i })).toHaveTextContent("2");
    expect(screen.getByRole("button", { name: /agenda/i })).toHaveTextContent("3");
  });

  it("renders communication primitives and sends composer values", () => {
    const send = vi.fn();
    const internal = vi.fn();

    render(
      <div>
        <MessageBubble status="read" timestamp="09:16" variant="outbound">
          Posso encaixar quinta 9h.
        </MessageBubble>
        <MessageBubble variant="failed">Falha no envio</MessageBubble>
        <ComposerInput defaultValue="Confirmar horario" internal onInternalChange={internal} onSend={send} />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));
    fireEvent.click(screen.getByRole("switch", { name: /nota interna/i }));

    expect(send).toHaveBeenCalledWith("Confirmar horario", { internal: true });
    expect(internal).toHaveBeenCalledWith(false);
    expect(screen.getByRole("alert")).toHaveTextContent("Falha no envio");
  });

  it("renders calendar, flow, chart, connector, and timeline primitives", () => {
    const selectNode = vi.fn();
    const openMenu = vi.fn();

    render(
      <div>
        <CalendarCell day="21" events={[{ label: "Mat", tone: "info" }]} today />
        <CalendarEventBlock capacity="9/10" meta="Joao Silva" time="08:00" title="Mat Pilates" />
        <ConnectorLine startNode variant="curved" />
        <FlowNode onClick={selectNode} onMenu={openMenu} status={<Chip>Evento</Chip>} title="Gatilho" variant="trigger" />
        <ChartPanelPrimitive title="Grafico de linha" />
        <Timeline items={[{ id: "1", icon: "check", title: "Receber mensagem", tone: "success" }]} variant="execution" />
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: /gatilho/i }));
    fireEvent.click(screen.getByRole("button", { name: /abrir opcoes do no/i }));

    expect(screen.getByRole("button", { name: /21/i })).toHaveAttribute("aria-current", "date");
    expect(screen.getByText("Mat Pilates")).toBeInTheDocument();
    expect(screen.getByText("Grafico de linha")).toBeInTheDocument();
    expect(screen.getByText("Receber mensagem")).toBeInTheDocument();
    expect(selectNode).toHaveBeenCalledTimes(1);
    expect(openMenu).toHaveBeenCalledTimes(1);
  });
});
